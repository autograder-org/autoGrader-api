#!/bin/bash
export PKR_VAR_image_name="web-app-image-$(date +%Y%m%d%H%M%S)"
export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"

packer build -var-file=./variables.auto.pkvars.hcl .
