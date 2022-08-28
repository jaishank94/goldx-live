data "aws_route53_zone" "main" {
  count        = var.route53_create ? 1 : 0
  name         = var.route53_hosting_zone
  private_zone = false
}

resource "aws_route53_record" "alias_route53_record" {
  for_each = tomap({
    for service in var.services : service.app_name => service if var.route53_create
  })

  zone_id = data.aws_route53_zone.main[0].zone_id
  name    = each.value.root_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.alb_distribution[0].domain_name
    zone_id                = aws_cloudfront_distribution.alb_distribution[0].hosted_zone_id
    evaluate_target_health = true
  }

  depends_on = [
    aws_alb.main, aws_cloudfront_distribution.alb_distribution
  ]
}
