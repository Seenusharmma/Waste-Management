#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Installing Dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
echo "Dependencies Installed Successfully"
