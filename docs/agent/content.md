# Content & Internationalization

## Content Structure

Documentation lives in `content/` with mirrored structure for each locale:

```
content/
├── en/
│   ├── _meta.ts          # Top-level navigation
│   ├── docs/
│   │   ├── _meta.tsx     # Sidebar sections
│   │   └── *.mdx         # Documentation pages
│   └── blog/             # Blog posts
└── zh-CN/                # Chinese (identical structure)
```

## Documentation Sections

Defined in `content/*/docs/_meta.tsx`:

| Section | Pages |
|---------|-------|
| **Getting Started** | overview, installation, quickstart, common-workflows, features |
| **Configuration** | rules, settings, models, providers |
| **Features** | interactive-mode, headless, slash-commands, subagents, skills, spec-driven, sdk, mcp, output-style, ai-commit, shell-command-generator, session-log-viewer |
| **Guides** | create-your-own-code-agent |
| **Reference** | cli, plugins |
| **Support** | troubleshooting |
| **Resources** | milestone |

## Adding Documentation

1. Create MDX file in both `content/en/docs/` and `content/zh-CN/docs/`
2. Add entry to `_meta.tsx` in both locales
3. Run `bun scripts/generate-llms-txt.ts` to update LLM files

## Internationalization

### Supported Locales
- `en` (English) - default
- `zh-CN` (Simplified Chinese)

### Dictionary System

Translations in `app/_dictionaries/`:

```typescript
// app/_dictionaries/en.ts
export default {
  hero: { title: "...", subtitle: "..." },
  features: { ... },
  footer: { ... }
}
```

Usage:
```typescript
import { getDictionary } from '@app/_dictionaries/get-dictionary'
const dict = await getDictionary(lang)
```

### Configuration

`app/_dictionaries/i18n-config.ts`:
```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'zh-CN']
}
```

## Raw Markdown API

Endpoint: `/api/raw/[lang]/[...path]`

Serves raw MDX content as plain text. URLs like `/en/docs/overview.md` are rewritten to this API via middleware.

## Custom Neovate Commands

`.neovate/commands/update-docs.md` - Command for updating documentation based on commits/PRs from the neovate-code repository.
