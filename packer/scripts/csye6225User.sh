#!/bin/bash

# Creating the csye6225 group
sudo groupadd csye6225

# Creating the csye6225 user with /usr/sbin/nologin shell
sudo useradd -r -m -g csye6225 -s /usr/sbin/nologin csye6225

# Set up sudo for csye6225 user if necessary
echo "csye6225  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/csye6225

echo "csye6225 user and group setup completed"
