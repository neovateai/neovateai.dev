# Development Commands

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next --turbopack` | Start development server with Turbopack |
| `build` | `next build` | Build production bundle |
| `postbuild` | `pagefind --site .next/server/app --output-path public/_pagefind` | Generate search index after build |
| `start` | `next start -p 9996` | Start production server on port 9996 |
| `analyze` | `ANALYZE=true npm run build` | Build with bundle analyzer enabled |
| `debug` | `NODE_OPTIONS='--inspect' next dev` | Start dev server with Node.js inspector |
| `deploy` | `bun run scripts/deploy.ts` | Full deployment to remote server |
| `types:check` | `tsc --noEmit` | TypeScript type checking |

## Development Workflow

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Type check before committing
npm run types:check

# Production build and test
npm run build && npm run start
```

## LLM Documentation Generation

Generate LLM-friendly documentation files:

```bash
bun scripts/generate-llms-txt.ts
```

This creates:
- `public/llms.txt` - Index with links to all docs
- `public/llms-full.txt` - Complete content of all documentation
- `public/llms-map.txt` - Structured map with nested headers

## Deployment

The deploy script (`scripts/deploy.ts`) requires Bun and performs:
1. Clean `.next` directory
2. Generate `llms.txt` files
3. Build in standalone mode
4. Copy static files
5. Transfer to remote server via SSH/SCP
6. Restart via PM2

Remote configuration:
- **Host:** `bwg` (SSH alias)
- **Base path:** `/opt/1panel/www/neovateai.dev`
- **Port:** 9996
- **Process manager:** PM2

## Bundle Analysis

```bash
npm run analyze
```

Opens bundle analyzer to visualize dependency sizes.
