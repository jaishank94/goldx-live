locals {
  // Change the local variable to match the git repo name
  terraform-git-repo = "pulsechainprojects"
}

module "globals" {
  source = "../globals/"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "terraform-pulsechainprojects"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = {
      project      = module.globals.project_name
      author       = module.globals.author
      author_email = module.globals.author_email
      environment  = var.environment
      created_by   = "terraform"
    }
  }
}
