data "aws_ecr_authorization_token" "ecr_token" {}

resource "kubernetes_config_map" "backend-config" {
  metadata {
		name = "backend-config"
		namespace = "calc"
	}
	data = {
		FRONTEND_URL = var.frontend_url
	}
}

resource "kubernetes_secret" "aws_ecr_cred" {
  metadata {
    name      = "aws-ecr-cred"
    namespace = "calc"
  }
  type = "kubernetes.io/dockerconfigjson"
  data = {
	".dockerconfigjson" = jsonencode({
		auths = {
			"${data.aws_ecr_authorization_token.ecr_token.proxy_endpoint}" = {
				"username" = data.aws_ecr_authorization_token.ecr_token.user_name
				"password" = data.aws_ecr_authorization_token.ecr_token.password
				"auth"	   = data.aws_ecr_authorization_token.ecr_token.authorization_token
			}
		}
	})
  }
}

resource "kubernetes_deployment" "backend" {
	metadata {
		name = "backend"
		namespace = "calc"
	}
	spec {
		selector {
			match_labels = {
				run = "calc-backend"
			}
		}
		replicas = 1
		template{
			metadata {
				labels = {
					run = "calc-backend"
				}
			}
			spec {
				image_pull_secrets {
					name = "aws-ecr-cred"
				}
				container {
					name = "backend"
					image = var.container_image_be
					image_pull_policy = "Always"
					env_from {
						config_map_ref {
							name = "backend-config"
						}
					}
				}
			}
		}
	}
}

resource "kubernetes_service" "backend" {
	metadata {
		name = "backend"
		namespace = "calc"
	}
	spec {
		type = "NodePort"
		selector = {
			run = "calc-backend"
		}
		port {
			port = 3031
			node_port = 30031
		}
	}
}
