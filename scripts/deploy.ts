#!/usr/bin/env bun

import { $ } from "bun";

// Set variables
const ZIP_NAME = "deploy.zip";
const REMOTE_HOST = "bwg";
const REMOTE_BASE_PATH = "/opt/1panel/www/neovateai.dev";
const DATE_DIR = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15).replace(/(\d{8})(\d{6})/, "$1_$2");
const REMOTE_PATH = `${REMOTE_BASE_PATH}/${DATE_DIR}/`;
const CURRENT_PATH = `${REMOTE_BASE_PATH}/current/`;

// Create timestamp for backup
const TIMESTAMP = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15).replace(/(\d{8})(\d{6})/, "$1_$2");

console.log("Starting deployment process...");

try {
  // Step 0: Build steps
  console.log("Cleaning .next directory...");
  await $`rm -rf .next`;
  console.log("Generating llms.txt...");
  await $`bun scripts/generate-llms-txt.ts`;
  console.log("Building...");
  await $`npm run build`;
  console.log("Build completed successfully.");

  await delay(1000);
  
  // Step 1: Create zip archive
  console.log("Creating zip archive...");
  await $`zip -r ${ZIP_NAME} .next public package.json pnpm-lock.yaml`;
  console.log("Zip archive created successfully.");

  // Step 2: Ensure remote directory exists and transfer to remote server
  console.log("Setting up remote directory and transferring files...");
  await $`ssh ${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}"`;

  console.log("Transferring to remote server...");
  await $`scp ${ZIP_NAME} ${REMOTE_HOST}:${REMOTE_PATH}`;
  console.log("File transferred successfully.");

  // Step 3: Connect to remote server and extract files
  console.log("Connecting to remote server and extracting files...");
  
  const remoteScript = `
    cd ${REMOTE_PATH}
    
    # Backup existing files
    echo "Creating backup of existing files..."
    if [ -d ".next" ]; then
      mkdir -p backups
      zip -r backups/backup_${TIMESTAMP}.zip package.json pnpm-lock.yaml .next public 2>/dev/null
      echo "Backup created at backups/backup_${TIMESTAMP}.zip"
    fi
    
    # Extract new files
    echo "Extracting new files..."
    unzip -o ${ZIP_NAME}
    if [ $? -ne 0 ]; then
      echo "Error: Failed to extract files on remote server"
      exit 1
    fi
    
    # Remove devDependencies from package.json
    echo "Removing devDependencies from package.json..."
    node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); delete pkg.devDependencies; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"
    
    # Install dependencies
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
      echo "Error: Failed to install dependencies"
      exit 1
    fi

    # Create/Update symlink to latest deployment
    cd ${REMOTE_BASE_PATH}
    ln -sfn ${DATE_DIR} current
    
    # pm2 restart
    echo "Restarting pm2..."
    cd ${CURRENT_PATH}
    pm2 stop neovateai.dev
    pm2 delete neovateai.dev
    pm2 start npm --name "neovateai.dev" -- start
    if [ $? -ne 0 ]; then
      echo "Error: Failed to restart pm2"
      exit 1
    fi
    
    # Clean up
    echo "Cleaning up..."
    rm ${ZIP_NAME}
    echo "Deployment completed successfully!"
  `;

  await $`ssh ${REMOTE_HOST} bash -c ${remoteScript}`;

  // Clean up local zip file
  console.log("Cleaning up local files...");
  await $`rm ${ZIP_NAME}`;

  console.log("Deployment process completed!");
} catch (error) {
  console.error("Deployment failed:", error);
  process.exit(1);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
