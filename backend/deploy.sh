#!/bin/bash
# Deployment script for Hostinger
echo "Installing dependencies..."
npm install --production

echo "Starting application..."
npm start