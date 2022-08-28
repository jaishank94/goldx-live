output "iam_workflow_user_access_key_id" {
  value     = module.iam_workflow_user.access_key_id
  sensitive = true
}

output "iam_workflow_user_secret_access_key" {
  value     = module.iam_workflow_user.secret_access_key
  sensitive = true
}

output "cloudfront_id" {
  description = "CloudFront distribution id"
  value       = module.ecs_alb.cloudfront_id
}

output "cloudfront_endpoint" {
  description = "CloudFront distribution domain name"
  value       = module.ecs_alb.cloudfront_endpoint
}
