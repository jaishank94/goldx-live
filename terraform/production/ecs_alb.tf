# Global certificate
data "aws_acm_certificate" "global" {
  domain      = module.globals.hosted_zone
  statuses    = ["ISSUED"]
  most_recent = true
}

module "ecs_alb" {
  source               = "../modules/ecs_alb"
  cluster_name         = "${module.globals.project_name}-cluster"
  environment          = var.environment
  use_cloudfront       = true
  route53_create       = false
  route53_hosting_zone = module.globals.hosted_zone
  aws_vpc              = module.vpc.vpc_id
  aws_vpc_cidr         = module.vpc.vpc_cidr_block
  aws_subnet_public    = module.vpc.public_subnets
  aws_subnet_private   = module.vpc.public_subnets # NAT in use, add private subnets
  certificate_arn      = data.aws_acm_certificate.global.arn
  us_east_certificate  = data.aws_acm_certificate.global.arn
  target_value_cpu     = 65.0
  target_value_ram     = 65.0
  autoscaling_max      = 2
  autoscaling_min      = 1
  scale_in_time        = 60
  scale_out_time       = 300
  deployment_maximum   = 200 #change it to 200, to have a blue/green deployment
  deployment_minimum   = 100 #change it to 100, to have a blue/green deployment

  services = {
    app = {
      app_name             = "${module.globals.project_name}-app"
      task_definition_name = "${var.environment}-${module.globals.project_name}-app"
      root_domain_name     = "www.${module.globals.hosted_zone}"
      app_port             = 3000
      app_count            = 1
      path_pattern         = "/*"
      fargate_cpu          = "512"
      fargate_memory       = "1024"
      health_check = {
        healthy_threshold   = 2,
        interval            = 20,
        path                = "/api/healtz",
        timeout             = 15,
        unhealthy_threshold = 3
        status_code         = "200"
        port                = 3000
      }
    }
  }
}
