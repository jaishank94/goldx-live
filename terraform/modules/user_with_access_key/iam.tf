resource "aws_iam_user" "user" {
  name = var.user_name
  path = "/system/"
}

resource "aws_iam_access_key" "user_access_key" {
  user = aws_iam_user.user.name
}

resource "aws_iam_user_policy" "user_policy" {
  name   = "${var.user_name}-policy"
  user   = aws_iam_user.user.name
  policy = var.policy
}
