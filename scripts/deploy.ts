#!/usr/bin/env bun

import { $ } from "bun";

const ZIP_NAME = "deploy.zip";
const REMOTE_HOST = "bwg";
const REMOTE_BASE_PATH = "/opt/1panel/www/neovateai.dev";
const DATE_DIR = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 15).replace(/(\d{8})(\d{6})/, "$1_$2");
const REMOTE_PATH = `${REMOTE_BASE_PATH}/${DATE_DIR}/`;
const CURRENT_PATH = `${REMOTE_BASE_PATH}/current/`;
const PORT = 9996;

interface StepTiming {
  name: string;
  duration: number;
}

const timings: StepTiming[] = [];

async function runStep<T>(name: string, fn: () => Promise<T>): Promise<T> {
  console.log(`${name}...`);
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  timings.push({ name, duration });
  return result;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function printSummary() {
  console.log("\n========== Deployment Summary ==========");
  const maxLen = Math.max(...timings.map(t => t.name.length));
  for (const { name, duration } of timings) {
    console.log(`${name.padEnd(maxLen)}  ${formatDuration(duration)}`);
  }
  console.log("-".repeat(maxLen + 12));
  const total = timings.reduce((sum, t) => sum + t.duration, 0);
  console.log(`${"Total".padEnd(maxLen)}  ${formatDuration(total)}`);
  console.log("=========================================\n");
}

console.log("Starting deployment process...");

try {
  await runStep("Cleaning .next directory", async () => {
    await $`rm -rf .next`;
  });

  await runStep("Generating llms.txt", async () => {
    await $`bun scripts/generate-llms-txt.ts`;
  });

  await runStep("Building (standalone mode)", async () => {
    await $`npm run build`;
  });

  await runStep("Preparing standalone directory", async () => {
    await $`cp -r .next/static .next/standalone/.next/static`;
    await $`cp -r public .next/standalone/public`;
  });

  await runStep("Creating zip archive", async () => {
    await $`cd .next && zip -r ../${ZIP_NAME} standalone`;
  });

  await runStep("Setting up remote directory", async () => {
    await $`ssh ${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}"`;
  });

  await runStep("Transferring to remote server", async () => {
    await $`scp ${ZIP_NAME} ${REMOTE_HOST}:${REMOTE_PATH}`;
  });

  await runStep("Extracting and restarting on remote server", async () => {
    const remoteScript = `
    cd ${REMOTE_PATH}
    
    echo "Extracting files..."
    unzip -o ${ZIP_NAME}
    if [ $? -ne 0 ]; then
      echo "Error: Failed to extract files"
      exit 1
    fi
    
    cd ${REMOTE_BASE_PATH}
    ln -sfn ${DATE_DIR} current
    
    echo "Restarting pm2..."
    cd ${CURRENT_PATH}/standalone
    pm2 stop neovateai.dev 2>/dev/null || true
    pm2 delete neovateai.dev 2>/dev/null || true
    PORT=${PORT} HOSTNAME=0.0.0.0 pm2 start server.js --name "neovateai.dev"
    if [ $? -ne 0 ]; then
      echo "Error: Failed to restart pm2"
      exit 1
    fi
    
    echo "Cleaning up..."
    rm ${REMOTE_PATH}/${ZIP_NAME}
    echo "Deployment completed successfully!"
  `;

    await $`ssh ${REMOTE_HOST} bash -c ${remoteScript}`;
  });

  await runStep("Cleaning up local files", async () => {
    await $`rm ${ZIP_NAME}`;
  });

  console.log("Deployment process completed!");
  printSummary();
} catch (error) {
  console.error("Deployment failed:", error);
  printSummary();
  process.exit(1);
}
