### ECS
resource "aws_ecs_cluster" "main" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "task_definition" {
  for_each = { for service in var.services : service.app_name => service }

  family                   = each.value.task_definition_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = each.value.fargate_cpu
  memory                   = each.value.fargate_memory

  container_definitions = <<DEFINITION
[
  {
    "image": "${var.app_image}",
    "name": "${each.value.task_definition_name}",
    "cpu": ${each.value.fargate_cpu},
    "memory": ${each.value.fargate_memory},
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": ${each.value.app_port},
        "hostPort": ${each.value.app_port}
      }
    ],
    "environment": [
      {
        "name": "PORT",
        "value": "${each.value.app_port}"
      }
    ]
  }
]
DEFINITION

  lifecycle {
    ignore_changes = [
      container_definitions
    ]
  }
}

resource "aws_ecr_repository" "ecr_repository" {
  for_each = { for service in var.services : service.app_name => service }

  name                 = "${var.environment}-${each.value.app_name}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "ecr_policy" {
  for_each = { for service in var.services : service.app_name => service }

  repository = aws_ecr_repository.ecr_repository[each.key].name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 20 images",
        "selection": {
          "tagStatus": "any",
          "countType": "imageCountMoreThan",
          "countNumber": 20
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
  EOF
}

resource "aws_ecs_service" "ecs_service" {
  for_each = { for service in var.services : service.app_name => service }

  name                               = "${var.environment}-${each.value.app_name}-service"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.task_definition[each.key].arn
  desired_count                      = each.value.app_count
  launch_type                        = "FARGATE"
  health_check_grace_period_seconds  = 5
  deployment_maximum_percent         = var.deployment_maximum
  deployment_minimum_healthy_percent = var.deployment_minimum

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks_sg[each.key].id]
    subnets          = var.aws_subnet_private
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.ecs_target_group[each.key].id
    container_name   = each.value.task_definition_name
    container_port   = each.value.app_port
  }

  depends_on = [
    aws_alb_listener.main,
  ]

  lifecycle {
    ignore_changes = [
      # Ignore changes to tags, e.g. because a management agent
      # updates these based on some ruleset managed elsewhere.
      task_definition,
    ]
  }
}

resource "aws_cloudwatch_log_group" "ecs_service_log_group" {
  for_each = { for service in var.services : service.app_name => service }

  name = "/ecs/${var.environment}/${var.cluster_name}/${each.value.app_name}"

  retention_in_days = 180

}
