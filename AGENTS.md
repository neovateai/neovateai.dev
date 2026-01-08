# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## WHY: Purpose and Goals

Documentation website for Neovate Code, an open-source AI coding agent. Built with Next.js and Nextra to provide bilingual (English/Chinese) documentation with search, theming, and LLM-friendly output.

## WHAT: Technical Stack

- **Runtime:** Node.js with Bun for scripts
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Docs Engine:** Nextra 4 with custom theme
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5.9 (strict mode)
- **i18n:** English (`en`) and Chinese (`zh-CN`)

## HOW: Core Development Workflow

```bash
npm i                       # Install dependencies
npm run dev                 # Start dev server (Turbopack)
npm run types:check         # TypeScript type checking
npm run build               # Production build
npm run deploy              # Deploy to remote server (requires Bun)
bun scripts/generate-llms-txt.ts  # Regenerate LLM files after docs changes
```

## Progressive Disclosure

For detailed information, consult these documents as needed:

- `docs/agent/development_commands.md` - All build, test, lint, release commands
- `docs/agent/architecture.md` - Module structure and architectural patterns
- `docs/agent/content.md` - MDX content and i18n patterns

**When working on a task, first determine which documentation is relevant, then read only those files.**

## Content Rules

- Hooks in `plugins.mdx` must be sorted alphabetically
- Settings in `settings.mdx` must be sorted alphabetically
