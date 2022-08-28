<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_alb.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/alb) | resource |
| [aws_alb_listener.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/alb_listener) | resource |
| [aws_alb_target_group.ecs_target_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/alb_target_group) | resource |
| [aws_appautoscaling_policy.cpu_autoscaling_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_policy) | resource |
| [aws_appautoscaling_policy.memory_autoscaling_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_policy) | resource |
| [aws_appautoscaling_target.ecs_target](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_target) | resource |
| [aws_cloudfront_distribution.alb_distribution](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution) | resource |
| [aws_cloudwatch_log_group.ecs_service_log_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group) | resource |
| [aws_ecr_lifecycle_policy.ecr_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_lifecycle_policy) | resource |
| [aws_ecr_repository.ecr_repository](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository) | resource |
| [aws_ecs_cluster.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster) | resource |
| [aws_ecs_service.ecs_service](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service) | resource |
| [aws_ecs_task_definition.task_definition](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition) | resource |
| [aws_lb_listener_rule.forward_rule](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener_rule) | resource |
| [aws_route53_record.alias_route53_record](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record) | resource |
| [aws_security_group.ecs_tasks_sg](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group) | resource |
| [aws_security_group.lb](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group) | resource |
| [aws_cloudfront_cache_policy.caching_disabled](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/cloudfront_cache_policy) | data source |
| [aws_cloudfront_cache_policy.caching_optimized](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/cloudfront_cache_policy) | data source |
| [aws_cloudfront_origin_request_policy.all_viewer](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/cloudfront_origin_request_policy) | data source |
| [aws_route53_zone.main](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/route53_zone) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_app_image"></a> [app\_image](#input\_app\_image) | Default image that ECS services uses | `string` | `"adongy/hostname-docker:latest"` | no |
| <a name="input_autoscaling_max"></a> [autoscaling\_max](#input\_autoscaling\_max) | Max number of autoscaling Fargate instances | `number` | `1` | no |
| <a name="input_autoscaling_min"></a> [autoscaling\_min](#input\_autoscaling\_min) | Minimum number of autoscaling Fargate instances | `number` | `1` | no |
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region) | The AWS region to create things in. | `string` | `"us-east-1"` | no |
| <a name="input_aws_subnet_private"></a> [aws\_subnet\_private](#input\_aws\_subnet\_private) | Private VPC subnet for ECS services | `any` | n/a | yes |
| <a name="input_aws_subnet_public"></a> [aws\_subnet\_public](#input\_aws\_subnet\_public) | Public VPC subnet for ALB | `any` | n/a | yes |
| <a name="input_aws_vpc"></a> [aws\_vpc](#input\_aws\_vpc) | AWS VPC | `any` | n/a | yes |
| <a name="input_aws_vpc_cidr"></a> [aws\_vpc\_cidr](#input\_aws\_vpc\_cidr) | AWS VPC CIDR | `any` | n/a | yes |
| <a name="input_certificate_arn"></a> [certificate\_arn](#input\_certificate\_arn) | ARN of ACM certificate | `any` | n/a | yes |
| <a name="input_cluster_name"></a> [cluster\_name](#input\_cluster\_name) | Cluster name | `any` | n/a | yes |
| <a name="input_deployment_maximum"></a> [deployment\_maximum](#input\_deployment\_maximum) | Deployment maximum percent - 200 for blue/green deployment | `number` | `200` | no |
| <a name="input_deployment_minimum"></a> [deployment\_minimum](#input\_deployment\_minimum) | Deployment minimum percent - 100 for blue/green deployment | `number` | `100` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | environmentironment name (staging, production) | `any` | n/a | yes |
| <a name="input_route53_create"></a> [route53\_create](#input\_route53\_create) | Variable if route53 needs to be created | `bool` | `true` | no |
| <a name="input_route53_hosting_zone"></a> [route53\_hosting\_zone](#input\_route53\_hosting\_zone) | AWS Route53 hosring zone | `any` | n/a | yes |
| <a name="input_scale_in_time"></a> [scale\_in\_time](#input\_scale\_in\_time) | Fargate scale in cooldown | `number` | `120` | no |
| <a name="input_scale_out_time"></a> [scale\_out\_time](#input\_scale\_out\_time) | Fargate scale out cooldown | `number` | `300` | no |
| <a name="input_services"></a> [services](#input\_services) | ECS services and health checks for ALB | <pre>map(object({<br>    app_name             = string,<br>    task_definition_name = string,<br>    app_port             = number,<br>    app_count            = number,<br>    path_pattern         = string,<br>    fargate_cpu          = string,<br>    fargate_memory       = string,<br>    root_domain_name     = string,<br><br>    health_check = object({<br>      healthy_threshold   = number,<br>      interval            = number,<br>      path                = string,<br>      timeout             = number,<br>      unhealthy_threshold = number,<br>      status_code         = string,<br>      port                = string,<br>    })<br>  }))</pre> | n/a | yes |
| <a name="input_target_value_cpu"></a> [target\_value\_cpu](#input\_target\_value\_cpu) | Percentage of CPU on which fargate containers needs to scale | `any` | n/a | yes |
| <a name="input_target_value_ram"></a> [target\_value\_ram](#input\_target\_value\_ram) | Percentage of RAM on which fargate containers needs to scale | `any` | n/a | yes |
| <a name="input_us_east_certificate"></a> [us\_east\_certificate](#input\_us\_east\_certificate) | Certificate ARN for cloudfront | `any` | n/a | yes |
| <a name="input_use_cloudfront"></a> [use\_cloudfront](#input\_use\_cloudfront) | n/a | `bool` | `true` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_alb_arn"></a> [alb\_arn](#output\_alb\_arn) | ALB ARN |
| <a name="output_alb_hostname"></a> [alb\_hostname](#output\_alb\_hostname) | Hostname of ALB ingress |
| <a name="output_ecs_cluster_arn"></a> [ecs\_cluster\_arn](#output\_ecs\_cluster\_arn) | ECS Cluster ARN |
| <a name="output_ecs_service_name"></a> [ecs\_service\_name](#output\_ecs\_service\_name) | ECS Service name |
| <a name="output_security_group_of_tasks"></a> [security\_group\_of\_tasks](#output\_security\_group\_of\_tasks) | Security group output |
<!-- END_TF_DOCS -->