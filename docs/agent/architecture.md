# Architecture

## Project Structure

```
neovateai.dev/
├── app/                    # Next.js App Router
│   ├── [lang]/             # Dynamic locale routing (en, zh-CN)
│   │   ├── [...mdxPath]/   # Catch-all for MDX pages
│   │   ├── layout.tsx      # Root layout with Nextra
│   │   └── page.tsx        # Locale homepage
│   ├── _components/        # Shared React components
│   ├── _dictionaries/      # i18n translation files
│   ├── _icons/             # SVG icons as React components
│   └── api/raw/            # Raw MDX content API endpoint
├── content/                # MDX documentation content
│   ├── en/docs/            # English documentation
│   └── zh-CN/docs/         # Chinese documentation (mirror)
├── scripts/
│   ├── deploy.ts           # Bun-based deployment
│   └── generate-llms-txt.ts # LLM doc generation
└── public/
    ├── llms*.txt           # LLM-friendly documentation
    └── _pagefind/          # Search index (generated)
```

## Key Patterns

### Routing
- **App Router** with dynamic `[lang]` segment for i18n
- **Catch-all** `[...mdxPath]` routes MDX content
- **Middleware** handles locale detection and `.md` URL rewriting

### Components
- Server components by default
- Client components suffixed with `-client.tsx` (e.g., `footer-client.tsx`)
- Icons in `_icons/` exported via barrel file

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js + Nextra config, i18n, SVG handling |
| `middleware.ts` | Locale handling and .md URL rewriting |
| `mdx-components.ts` | Custom MDX component mappings |
| `tsconfig.json` | TypeScript with `@app/*` path alias |

### Build Configuration

- **Standalone output** for containerized deployment
- **Turbopack** enabled for development
- **ESLint disabled** during builds
- **Bundle analyzer** via `ANALYZE=true`

## Dependencies

### Core
- `next` - React framework (v15)
- `nextra` + `nextra-theme-docs-neovate` - Documentation engine
- `react` / `react-dom` - React (v19)

### Styling
- `tailwindcss` - Utility CSS (v4)
- `@tailwindcss/postcss` - PostCSS integration

### Build Tools
- `@svgr/webpack` - SVG to React components
- `@next/bundle-analyzer` - Bundle size analysis
- `pagefind` - Static site search
