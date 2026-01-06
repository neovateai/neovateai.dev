# Design: Generate llms-map.txt with Header Structure

## Overview

Update `scripts/generate-llms-txt.ts` to also generate `llms-map.txt` - a structured map of documentation with nested headers.

## Output Format

```markdown
## Getting Started

### [Overview](https://neovateai.dev/en/docs/overview.md)

* Why Neovate Code?
* Interactive Mode
* Headless Mode
* Sessions

### [Installation](https://neovateai.dev/en/docs/installation.md)

* Prerequisites
* Install via npm
  * Global installation
  * Local installation
* Verify installation
```

## Implementation

### New Function: `extractHeaders`

```typescript
interface Header {
  level: number;  // 2-6
  text: string;
}

function extractHeaders(content: string): Header[] {
  // Skip code blocks
  // Match /^(#{2,6})\s+(.+)$/gm
  // Return array of {level, text}
}
```

### New Function: `generateLlmsMapTxt`

```typescript
async function generateLlmsMapTxt(sections: Section[]): Promise<string> {
  // For each section:
  //   Output: ## {category}
  //   For each doc:
  //     Output: ### [{title}]({url})
  //     For each header (H2+):
  //       indent = (level - 2) * 2 spaces
  //       Output: {indent}* {text}
}
```

### Changes to `main()`

1. Call `generateLlmsMapTxt(sections)`
2. Write to `public/llms-map.txt`
3. Update help text and console output

## Files Changed

- `scripts/generate-llms-txt.ts` - Add header extraction and map generation
- `public/llms-map.txt` - New output file (generated)
