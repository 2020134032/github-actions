terraform {
  backend "s3" {
    bucket         = "cas3135-2025-tfstates"
    key            = "cas3135-2020134032/calc-k8s"
    dynamodb_table = "cas3135-terraform-locks"
    region         = "ap-northeast-2"
    encrypt        = true
  }

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.29"
    }
  }

  required_version = ">= 1.5.0"
}

provider "kubernetes" {
  config_path = var.kubernetes_config_path
}

provider "aws" {
  region = "ap-northeast-2"
}

resource "kubernetes_namespace" "ns" {
  metadata {
    name = "calc"
  }
}