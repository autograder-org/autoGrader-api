#!/bin/bash


# In this script, we run the build command, zip the required artifacts and pass it into the packer directory for running the packer build command
# Delete any exisitng zip file in the packer dir

[ -e ./packer/imageBuilding/dist.tar.gz ] && rm ./packer/imageBuilding/dist.tar.gz


# Running the build command
npm run build

# Packaging the required artifacts
tar -czvf dist.tar.gz dist/src/* package*

# Moving this to the packer directory
mv dist.tar.gz ./packer/imageBuilding/.


# run the packer build command
cd ./packer/imageBuilding || exit
sh packerBuild.sh 
