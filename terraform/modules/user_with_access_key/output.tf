output "access_key_id" {
  value = aws_iam_access_key.user_access_key.id
}

output "secret_access_key" {
  value = aws_iam_access_key.user_access_key.secret
}

output "arn" {
  value = aws_iam_user.user.arn
}

output "name" {
  value = aws_iam_user.user.name
}
