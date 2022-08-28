variable "aws_region" {
  description = "The AWS region to create things in."
  default     = "us-east-1"
}

variable "app_image" {
  description = "Default image that ECS services uses"
  default     = "vadymvorobel/hostname-docker:latest"
}


variable "route53_hosting_zone" {
  description = "AWS Route53 hosring zone"
}

variable "environment" {
  description = "environmentironment name (staging, production)"
}

variable "cluster_name" {
  description = "Cluster name"
}

variable "aws_subnet_public" {
  description = "Public VPC subnet for ALB"
}

variable "aws_subnet_private" {
  description = "Private VPC subnet for ECS services"
}

variable "aws_vpc" {
  description = "AWS VPC"
}

variable "aws_vpc_cidr" {
  description = "AWS VPC CIDR"
}

variable "route53_create" {
  description = "Variable if route53 needs to be created"
  default     = true
}

variable "services" {
  type = map(object({
    app_name             = string,
    task_definition_name = string,
    app_port             = number,
    app_count            = number,
    path_pattern         = string,
    fargate_cpu          = string,
    fargate_memory       = string,
    root_domain_name     = string,

    health_check = object({
      healthy_threshold   = number,
      interval            = number,
      path                = string,
      timeout             = number,
      unhealthy_threshold = number,
      status_code         = string,
      port                = string,
    })
  }))
  description = "ECS services and health checks for ALB"
}

variable "certificate_arn" {
  description = "ARN of ACM certificate"
}


variable "us_east_certificate" {
  description = "Certificate ARN for cloudfront"
}

variable "use_cloudfront" {
  default = true
}

variable "autoscaling_max" {
  default     = 1
  description = "Max number of autoscaling Fargate instances"
}

variable "autoscaling_min" {
  default     = 1
  description = "Minimum number of autoscaling Fargate instances"
}

variable "scale_in_time" {
  description = "Fargate scale in cooldown"
  default     = 120
}

variable "scale_out_time" {
  description = "Fargate scale out cooldown"
  default     = 300
}

variable "deployment_maximum" {
  description = "Deployment maximum percent - 200 for blue/green deployment"
  default     = 200
}

variable "deployment_minimum" {
  description = "Deployment minimum percent - 100 for blue/green deployment"
  default     = 100
}

variable "target_value_ram" {
  description = "Percentage of RAM on which fargate containers needs to scale"
}

variable "target_value_cpu" {
  description = "Percentage of CPU on which fargate containers needs to scale"
}
