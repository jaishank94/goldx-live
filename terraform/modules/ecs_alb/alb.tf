### ALB
resource "aws_alb" "main" {
  name            = "${var.cluster_name}-alb"
  subnets         = var.aws_subnet_public
  security_groups = [aws_security_group.lb.id]
}

resource "aws_alb_target_group" "ecs_target_group" {
  for_each = { for service in var.services : service.app_name => service }

  name        = "${var.environment}-${each.value.app_name}-target"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.aws_vpc
  target_type = "ip"

  health_check {
    healthy_threshold   = each.value.health_check.healthy_threshold
    interval            = each.value.health_check.interval
    path                = each.value.health_check.path
    timeout             = each.value.health_check.timeout
    unhealthy_threshold = each.value.health_check.unhealthy_threshold
    matcher             = each.value.health_check.status_code
    port                = each.value.health_check.port
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "main" {
  load_balancer_arn = aws_alb.main.id
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = var.certificate_arn

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Provide the right path and hostname to service"
      status_code  = "503"
    }
  }
}

resource "aws_lb_listener_rule" "forward_rule" {
  for_each = { for service in var.services : service.app_name => service }

  listener_arn = aws_alb_listener.main.arn

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group[each.key].arn
  }

  condition {
    path_pattern {
      values = [each.value.path_pattern]
    }
  }

  # condition {
  #   host_header {
  #     values = [each.value.root_domain_name]
  #   }
  # }
}
