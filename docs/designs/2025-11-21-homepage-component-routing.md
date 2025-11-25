# Homepage Component Routing

**Date:** 2025-11-21

## Context

The project currently uses MDX files (`content/en/index.mdx` and `content/zh-CN/index.mdx`) for the homepage, rendered through a dynamic catch-all route `[[...mdxPath]]/page.tsx`. The goal is to replace the MDX-based homepage with a TSX component that will contain a Hero section with CTA buttons, while keeping the component as a TODO placeholder for later implementation.

## Discussion

### Routing Strategy
Three routing approaches were explored:

1. **Replace dynamic route entirely** - Homepage uses different page component, other pages continue using MDX
2. **Conditional rendering** - Keep dynamic route but conditionally render when `mdxPath` is empty
3. **Specific route** - Create `/[lang]/page.tsx` that takes precedence

**Decision:** Approach 1 was selected.

### Catch-All Route Handling
When replacing the dynamic route, three options were considered for the catch-all behavior:

1. Move catch-all to more specific path like `docs/[...mdxPath]/page.tsx`
2. Add root `/[lang]/page.tsx` that takes precedence
3. Keep catch-all but exclude root path with guard logic + separate root page

**Decision:** Option 3 - Keep the catch-all at `[[...mdxPath]]/page.tsx` but add logic to exclude the root path, and create a separate `/[lang]/page.tsx`.

### Component Structure
Three implementation approaches were considered:

1. **Single-File Simple** - Create `/app/[lang]/page.tsx` with TODO Hero component inline
2. **Component Extraction** - Separate hero component in `app/_components/hero.tsx`
3. **Hybrid MDX Wrapper** - Keep index.mdx files but import TSX Hero component

**Decision:** Approach 1 - Single-file with inline TODO placeholders for simplicity and clarity that it's a placeholder.

## Approach

Create a dedicated homepage route at `/app/[lang]/page.tsx` with inline Hero component containing TODO placeholders. Modify the catch-all route to reject empty `mdxPath` using `notFound()`, which causes Next.js to fall back to the root page handler.

The existing `index.mdx` files will be deprecated but not deleted, serving as content reference for future implementation.

## Architecture

### File Structure

```
app/[lang]/
  ├── page.tsx          [NEW - Homepage with Hero]
  ├── [[...mdxPath]]/
  │   └── page.tsx      [MODIFIED - Add empty path guard]
  └── layout.tsx        [UNCHANGED]

content/
  ├── en/index.mdx      [DEPRECATED - No longer rendered]
  └── zh-CN/index.mdx   [DEPRECATED - No longer rendered]
```

### Homepage Component (`/app/[lang]/page.tsx`)

**Structure:**
- Async component receiving `lang` parameter from Next.js routing
- Inline Hero JSX with clear TODO sections
- TypeScript type safety with `PageProps` type

**Hero TODO Sections:**
- Hero header section (main headline)
- Subtitle/description section
- CTA buttons section
- Optional features/benefits preview section

**Type Definition:**
```typescript
type PageProps = {
  params: Promise<{ lang: string }>
}
```

### Catch-All Route Guard (`[[...mdxPath]]/page.tsx`)

Add guard logic at the start of the component:
```typescript
if (!params.mdxPath || params.mdxPath.length === 0) {
  notFound()
}
```

This ensures requests to `/en` or `/zh-CN` skip the catch-all and serve the root page instead.

### Styling & Internationalization

**Styling:**
- Use Tailwind CSS classes (consistent with existing components)
- Follow dark mode patterns from existing codebase
- Include responsive design placeholders

**Internationalization:**
- `lang` param flows automatically from route
- Can use existing dictionary system (`app/_dictionaries/`) for future implementation
- Placeholder text can be English with TODO comments for i18n

### Error Handling

- Standard Next.js error handling applies
- `notFound()` call in catch-all handles routing rejection
- Existing 404 handler manages non-existent paths

### Implementation Checklist

1. Create `/app/[lang]/page.tsx` with TODO Hero sections
2. Add empty path guard to `[[...mdxPath]]/page.tsx`
3. Test routes: `/en`, `/zh-CN`, `/en/docs/overview` all work correctly
4. Later: Implement actual Hero component with CTAs, styling, and i18n

### Migration Notes

- Old `content/*/index.mdx` files remain as content reference
- No breaking changes to existing docs/blog pages
- Features component and imports in old index.mdx won't affect other pages
