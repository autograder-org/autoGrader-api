#!/bin/bash

echo "In user setup step"

# Setup sudo to allow no-password sudo for "hashicorp" group and adding "terraform" user
sudo groupadd -r hashicorp
# sudo useradd -m -s /bin/bash centos
# sudo usermod -a -G hashicorp centos
sudo cp /etc/sudoers /etc/sudoers.orig
echo "centos  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/centos

echo "Installing SSH key"
# Installing SSH key
sudo mkdir -p /home/centos/.ssh
sudo chmod 700 /home/centos/.ssh
sudo cp /tmp/tf-packer.pub /home/centos/.ssh/authorized_keys
sudo chmod 600 /home/centos/.ssh/authorized_keys
sudo chown -R centos /home/centos/.ssh
# sudo usermod --shell /bin/bash centos

echo "End of setup step"

exit 0
