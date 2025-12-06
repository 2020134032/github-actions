variable "kubernetes_config_path" {
  default = "~/.kube/config"
}

variable "container_image_be" {
  type = string
}

variable "container_image_fe" {
	type = string
}

variable "backend_url" {
  type = string
}

variable "frontend_url" {
  type = string
}
