#!/bin/bash

echo "Checking for wget and installing if not present..."
if ! command -v wget &> /dev/null; then
    echo "wget could not be found. Installing wget..."
    sudo yum install -y wget
fi

echo "Setting up node and other dependencies"

# Define Node.js version and directory variables
NODE_VERSION=v20.2.0
NODE_DIST=node-$NODE_VERSION-linux-x64
INSTALL_DIR=/usr/local/lib/nodejs

echo "Downloading Node.js version $NODE_VERSION..."
if wget https://nodejs.org/dist/$NODE_VERSION/$NODE_DIST.tar.xz; then
    echo "Installing Node.js version $NODE_VERSION..."

    # Create the target directory and extract the Node.js tarball
    sudo mkdir -p $INSTALL_DIR
    sudo tar -xJf $NODE_DIST.tar.xz -C $INSTALL_DIR

    # Set up the environment variables
    echo "Setting up environment variables..."
    ENV_FILE=/etc/profile.d/nodejs.sh
    sudo tee $ENV_FILE <<EOF
export PATH=$INSTALL_DIR/$NODE_DIST/bin:\$PATH
EOF

    # Apply the environment variables for this session
    source $ENV_FILE

    # Verify the installation
    echo "Node.js version:"
    node -v
    echo "npm version:"
    npm -v

    echo "Node.js $NODE_VERSION installation completed."
else
    echo "Failed to download Node.js $NODE_VERSION"
fi
