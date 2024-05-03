#!/bin/bash

# In this script we are just going to create the base 64 representations of the various env files

# create a folder called env-base64s if not present and cd
mkdir -p env-base64s && cd env-base64s || exit

# generate the base 64 files of the three env files
base64 -i ../.env.development -o .env.development.base64
base64 -i ../.env.production -o .env.production.base64 
base64 -i ../.env.integration -o .env.integration.base64
