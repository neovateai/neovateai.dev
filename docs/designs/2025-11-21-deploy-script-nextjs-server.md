# Deploy Script Update: Next.js Server Mode

**Date:** 2025-11-21

## Context
The current deployment script (`scripts/deploy.ts`) is configured to deploy a static export (`dist` directory) to a remote server. The requirement is to update it to deploy a Next.js server build (`.next` directory) instead, based on the pattern from a reference deployment script (`sorrycc.com.2025.06/scripts/deploy.sh`). The deployed application will run as a Next.js server using `npm start` and managed by pm2.

## Discussion

### Key Questions and Decisions:

1. **Deployment Mode**: Confirmed to run Next.js as a server with `npm start` (not static serving)

2. **Files to Include**: Decided on minimal deployment package:
   - `.next` (Next.js server build)
   - `public` (static assets)
   - `package.json` (dependencies manifest)
   - `pnpm-lock.yaml` (dependency lock file)
   - Dependencies will be installed on remote server (not bundled)

3. **Build Strategy**: Clean build approach - always remove `.next` directory before building to avoid incremental build issues

4. **Implementation Approach**: Three options were explored:
   - **Approach A (Selected)**: Minimal changes - update file lists, add clean build, fix symlink paths
   - Approach B: Port bash script 1:1 to TypeScript
   - Approach C: Hybrid with all reference features

   Selected Approach A for simplicity while meeting all requirements.

## Approach

Update the existing TypeScript deployment script with minimal changes:
1. Add clean build step (remove `.next` before building)
2. Update files to deploy (`.next`, `public`, `package.json`, `pnpm-lock.yaml`)
3. Fix remote symlink to point to deployment directory root (not `/dist` subdirectory)
4. Enable dependency installation on remote server
5. Update backup logic to check for `.next` instead of `dist`

## Architecture

### Build Process
```typescript
// Clean build to avoid incremental build issues
await $`rm -rf .next`;
await $`npm run build`;
```

### Deployment Package
```typescript
const LOCAL_FILES = [".next", "public", "package.json", "pnpm-lock.yaml"];
```

### Remote Directory Structure
```
/opt/1panel/www/neovateai.dev/
├── 20251121_143022/          # Timestamped deployment
│   ├── .next/
│   ├── public/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── node_modules/         # Installed on remote
├── current -> 20251121_143022/  # Symlink to active deployment
```

### Remote Deployment Steps
1. Create timestamped directory on remote server
2. Transfer zip archive
3. Backup existing `.next` and `public` directories if present
4. Extract new files
5. Run `npm install --omit=dev` to install production dependencies
6. Update `current` symlink to point to new deployment directory
7. Restart pm2 with `npm start` to run Next.js server
8. Cleanup zip file

### Key Changes from Current Script
- `LOCAL_FILES`: Change from `["dist"]` to `[".next", "public", "package.json", "pnpm-lock.yaml"]`
- Build: Add `rm -rf .next` before `npm run build`
- Backup condition: Change from checking `dist` to `.next`
- Symlink: Change from `ln -sfn ${DATE_DIR}/dist current` to `ln -sfn ${DATE_DIR} current`
- Dependencies: Uncomment the `npm install --omit=dev` block in remote script
- pm2: Already configured correctly to run `npm start`
