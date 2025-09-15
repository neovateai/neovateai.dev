# NeovateAI Documentation

This is the documentation site for NeovateAI built with [Nextra](https://nextra.site/).

## Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Build

Build the documentation for production:

```bash
pnpm build
```

## Start Production Server

After building, start the production server:

```bash
pnpm start
```

## Project Structure

- `pages/` - Documentation content (MDX files)
- `public/` - Static assets
- `theme.config.tsx` - Nextra theme configuration
- `next.config.mjs` - Next.js configuration

## Writing Documentation

Add new documentation pages in the `pages/` directory as `.mdx` files. Update `pages/_meta.json` to configure navigation.