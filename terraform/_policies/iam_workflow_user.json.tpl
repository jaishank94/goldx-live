{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "ecr:*",
      "Effect": "Allow",
      "Resource": ${ecr_arns}
    },
    {
      "Action": "ecr:GetAuthorizationToken",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": "ecs:*",
      "Effect": "Allow",
      "Resource": ${ecs_arns}
    },
    {
      "Action": "ecs:DescribeServices",
      "Effect": "Allow",
      "Resource": ${ecs_service_arns}
    },
    {
      "Action": "ecs:UpdateService",
      "Effect": "Allow",
      "Resource": ${ecs_service_arns}
    },
    {
      "Action": "ecs:RegisterTaskDefinition",
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Action": [
        "iam:PassRole"
      ],
      "Effect": "Allow",
      "Resource": ${task_execution_role_arns}
    },
    {
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Effect": "Allow",
      "Resource": ${cloudfront_distribution_arns}
    }
  ]
}
