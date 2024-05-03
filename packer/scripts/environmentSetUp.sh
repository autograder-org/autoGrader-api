#!/bin/sh
#environmentSetUp.sh

echo "Installing node js"

# Install Node.js 20.2.0
# Since Node.js 20.2.0 might not be directly available via dnf, use NVM for installation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 20.2.0

# echo "Installing unzip nc and lsof"

# installing required libraries for use later
# echo "Installing unzip"
# sudo dnf install unzip  -y 
# echo "Installing nc"
# sudo dnf install nc -y 
# echo "Installing lsof"
# sudo dnf install lsof
 

echo "Completed exiting"
exit 0
