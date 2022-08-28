module "iam_workflow_user" {
  source    = "../modules/user_with_access_key/"
  user_name = "${var.environment}-${module.globals.project_name}-pipelines-user"

  policy = templatefile("../_policies/iam_workflow_user.json.tpl",
    {
      task_execution_role_arns = jsonencode("${aws_iam_role.ecs_task_execution_role.arn}")
      ecs_arns                 = jsonencode("${module.ecs_alb.ecs_cluster_arn}")
      ecr_arns                 = jsonencode([for v in values(module.ecs_alb.ecr_arn) : "${v}"])
      ecs_service_arns         = jsonencode([for v in values(module.ecs_alb.ecs_service_arn) : "${v}"])

      cloudfront_distribution_arns = jsonencode([
        "${module.ecs_alb.cloudfront_arn}",
      ])
    }
  )
}
