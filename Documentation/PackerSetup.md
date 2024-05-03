# Packer Build Process for GCP Custom Image

[<- go back](../README.md)

This document outlines the process of creating a custom Google Cloud Platform (GCP) disk image using Packer. It covers the steps taken, commands used, issues encountered, and their resolutions.

## Overview

The goal was to create a custom disk image in GCP with specific configurations and software for deployment purposes. This process involved using Packer to automate the creation of the disk image.

## Prerequisites

- Google Cloud Platform account
- Packer installed on the local machine

## Process

### 1. Setting Up Packer

A Packer template `my_image.pkr.hcl` was created to define the source image, provisioners, and post-processors for the build.

```shell
packer init .
packer validate -var-file=./variables.auto.pkvars.hcl .
packer build -var-file=./variables.auto.pkvars.hcl .
```

### 2. Troubleshooting and Fixes

#### Service Account Permission Issue

```shell
Error: Script exited with non-zero exit status: 1. Allowed exit codes are: [0]
```

**Fix:** Ensured I created a new service account for this project that has editor access.
**Better Way**: Do not have editor access but give only minimal access

#### Source Image Not Found

```shell
Error: Error creating instance: googleapi: Error 404: The resource 'projects/cloud-dev-project-414700/zones/us-east1-a' was not found, notFound
```

```shell
# to find out available images
gcloud compute images list --project centos-cloud --no-standard-image

# check available zones
gcloud compute zones list
```

**Fix:** Updated the Packer template to use an available CentOS image family, `centos-stream-8`, and ensured the correct zone was specified.

#### Script Execution Failure

Encountered issues running database setup scripts through Packer.

**Fix:** Used `sudo -u postgres` to execute PostgreSQL commands without switching to the `postgres` user. This allowed non-interactive execution of the script.

### 3. Successful Build

After resolving the issues, the build completed successfully, creating a custom disk image named `web-app-image-20240218220053`.

## Conclusion

This process documented the creation of a GCP custom disk image using Packer, including troubleshooting steps and solutions for encountered issues. The resulting image is now ready for deployment and further testing.

## Future Work

- Automate deployments using the custom image with CI/CD pipelines.
- Implement infrastructure as code for instance deployment using Terraform.
- Regularly update the image with security patches and software updates.
