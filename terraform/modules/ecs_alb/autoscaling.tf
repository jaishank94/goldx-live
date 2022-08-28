resource "aws_appautoscaling_target" "ecs_target" {
  for_each = { for service in var.services : service.app_name => service }

  max_capacity       = var.autoscaling_max
  min_capacity       = var.autoscaling_min
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.ecs_service[each.key].name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "cpu_autoscaling_policy" {
  for_each = { for service in var.services : service.app_name => service }

  name                   = "cpu-autoscaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = aws_appautoscaling_target.ecs_target[each.key].resource_id
  scalable_dimension     = aws_appautoscaling_target.ecs_target[each.key].scalable_dimension
  service_namespace      = aws_appautoscaling_target.ecs_target[each.key].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value = var.target_value_cpu
    scale_in_cooldown  = var.scale_in_time
    scale_out_cooldown = var.scale_out_time
  }
}

resource "aws_appautoscaling_policy" "memory_autoscaling_policy" {
  for_each = { for service in var.services : service.app_name => service }
  
  name                   = "memory-autoscaling-policy"
  policy_type            = "TargetTrackingScaling"
  resource_id            = aws_appautoscaling_target.ecs_target[each.key].resource_id
  scalable_dimension     = aws_appautoscaling_target.ecs_target[each.key].scalable_dimension
  service_namespace      = aws_appautoscaling_target.ecs_target[each.key].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value = var.target_value_ram
    scale_in_cooldown  = var.scale_in_time
    scale_out_cooldown = var.scale_out_time
  }
}
