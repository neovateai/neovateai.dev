# Standalone Deploy Optimization

**Date:** 2025-01-06  
**Status:** Proposed  
**Problem:** Deploy process is too slow due to large package size (~200MB+) and npm install on remote server

## Summary

Migrate to Next.js standalone output mode to reduce deploy package size by ~70% and eliminate npm install on the remote server.

## Current State

### Deploy Flow
1. Clean `.next` directory
2. Generate `llms.txt`
3. Build (`next build`)
4. Zip: `.next`, `public`, `content`, `package.json`, `pnpm-lock.yaml`
5. SCP to remote server
6. Extract files
7. Strip devDependencies from package.json
8. Run `npm install`
9. Restart PM2 with `npm start`

### Pain Points
- **Large package size:** Full `.next` directory is ~200MB+
- **Slow npm install:** Running on every deploy, even though dependencies rarely change
- **Unnecessary files:** Build cache, source maps, and other artifacts included

## Proposed Solution

### 1. Enable Standalone Mode

Add to `next.config.ts`:

```ts
const nextConfig = {
  output: 'standalone',
  // ... existing config
}
```

This creates a minimal self-contained build at `.next/standalone/` that includes:
- `server.js` - Node.js server entry point
- All required dependencies bundled (no node_modules needed)
- Application code

### 2. Update Deploy Script

**New flow:**

```
1. Build (with standalone output)
2. Prepare standalone directory:
   - Copy .next/static → .next/standalone/.next/static
   - Copy public → .next/standalone/public
3. Zip only .next/standalone
4. SCP to remote
5. Extract
6. Restart PM2 with `node server.js`
```

**Key changes:**

```ts
// Prepare standalone with static assets
await $`cp -r .next/static .next/standalone/.next/static`;
await $`cp -r public .next/standalone/public`;

// Zip only standalone directory
await $`zip -r ${ZIP_NAME} .next/standalone`;
```

**Remote script simplification:**
- Remove `npm install` step entirely
- Remove devDependencies stripping logic
- Change PM2 command from `npm start` to `node server.js`

### 3. PM2 Configuration

```bash
# Before
pm2 start npm --name "neovateai.dev" -- start

# After
PORT=9996 pm2 start server.js --name "neovateai.dev"
```

Or set `PORT` in ecosystem config:

```js
module.exports = {
  apps: [{
    name: 'neovateai.dev',
    script: 'server.js',
    env: {
      PORT: 9996
    }
  }]
}
```

## Expected Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Package size | ~200MB+ | ~50-80MB | ~60-70% smaller |
| npm install | Yes | No | Eliminated |
| Transfer time | ~30-60s | ~10-20s | ~60% faster |
| Total deploy time | ~3-5min | ~1-2min | ~60% faster |

## Files to Modify

1. `next.config.ts` - Add `output: 'standalone'`
2. `scripts/deploy.ts` - Update build and zip logic, simplify remote script

## Considerations

### Static Assets
The standalone build does NOT include `.next/static` or `public` directories by default. These must be copied manually before deployment.

### Environment Variables
Standalone reads `PORT` from environment. Ensure PM2 or shell sets `PORT=9996`.

### Hostname/Port
For production, you may need to set `HOSTNAME` as well:
```bash
HOSTNAME=0.0.0.0 PORT=9996 node server.js
```

## Rollback Plan

If issues arise:
1. Remove `output: 'standalone'` from `next.config.ts`
2. Revert `scripts/deploy.ts` to previous version
3. Redeploy using original flow

## References

- [Next.js Standalone Output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [Self-hosting Next.js](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)
