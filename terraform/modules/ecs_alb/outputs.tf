output "alb_hostname" {
  value       = aws_alb.main.dns_name
  description = "Hostname of ALB ingress"
}

output "alb_arn" {
  value       = aws_alb.main.arn
  description = "ALB ARN"
}

output "ecs_service_name" {
  value = {
    for k, v in aws_ecs_service.ecs_service : k => v.name
  }
  description = "ECS Service name"
}

output "security_group_of_tasks" {
  value = {
    for k, v in aws_security_group.ecs_tasks_sg : k => v.id
  }
  description = "Security group output"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "ECS Cluster name"
}

output "ecs_cluster_arn" {
  value       = aws_ecs_cluster.main.arn
  description = "ECS Cluster ARN"
}

output "alb_arn_suffix" {
  value = aws_alb.main.arn_suffix
}

output "ecr_arn" {
  value = {
    for k, v in aws_ecr_repository.ecr_repository : k => v.arn
  }

  description = "ECS Service name"
}

output "ecs_service_arn" {
  value = {
    for k, v in aws_ecs_service.ecs_service : k => v.id
  }
  description = "ECS Service ARN"
}

output "cloudfront_id" {
  description = "CloudFront distribution id"
  value       = aws_cloudfront_distribution.alb_distribution[0].id
}

output "cloudfront_endpoint" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.alb_distribution[0].domain_name
}

output "cloudfront_arn" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.alb_distribution[0].arn
}
