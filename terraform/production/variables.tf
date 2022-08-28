variable "environment" {
  description = "Name of a current environment"
  type        = string
  default     = "production"
}

variable "vpc_cidr" {
  description = "CIDR for a VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zone names"
  type        = list(string)
}
