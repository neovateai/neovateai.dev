#!/usr/bin/env bun

import { $ } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

console.log("Starting build process...");

try {
  // Step 1: Remove dist directory
  console.log("Removing dist directory...");
  await $`rm -rf dist`;

  // Step 2: Build with Bun
  console.log("Building with Bun...");
  await $`bun build src/index.ts --production --target=node --outfile dist/dist/index.mjs`;

  // Step 3: Copy public directory
  console.log("Copying public directory...");
  await $`cp -r public ./dist/public`;

  // Step 4: Copy package.json without devDependencies
  console.log("Copying package.json without devDependencies...");
  const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
  delete packageJson.devDependencies;
  writeFileSync(
    join("dist", "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Step 5: Print done
  console.log("✅ Build completed successfully!");
  console.log("Done");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}