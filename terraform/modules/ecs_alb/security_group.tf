resource "aws_security_group" "lb" {
  name        = "${var.environment}-${var.cluster_name}-ecs-alb"
  description = "controls access to the ALB"
  vpc_id      = var.aws_vpc

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_tasks_sg" {
  for_each = { for service in var.services : service.app_name => service }

  name        = "${var.environment}-${each.value.app_name}-ecs-task"
  description = "Allow inbound access from the ALB only"
  vpc_id      = var.aws_vpc

  ingress {
    protocol        = "tcp"
    from_port       = each.value.app_port
    to_port         = each.value.app_port
    security_groups = [aws_security_group.lb.id]
  }

  ingress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["${var.aws_vpc_cidr}"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    ignore_changes = [
      ingress,
    ]
  }
}
