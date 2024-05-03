variable "project_id" {
  type        = string
  description = "The GCP project ID"
}

variable "zone" {
  type        = string
  description = "The GCP zone where the instance will be created"
}

variable "image_name" {
  type        = string
  description = "The name of the created custom image"
}

variable "source_image_family" {
  type        = string
  description = "The family of the source image"
}
