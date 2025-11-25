# Root-Level Locale Detection Without Redirect

**Date:** 2025-11-21

## Context

The current implementation redirects users from `/` to `/en` or `/zh-CN` based on their locale. This creates a visible URL change that the user wanted to eliminate. The goal is to serve localized content directly at `/` based on browser language detection, while keeping the URL as `/`. Once users navigate to other pages (like docs or blog), those pages should display the locale in the URL (e.g., `/en/docs`, `/zh-CN/docs`).

## Discussion

### Key Decisions

**Locale Detection Strategy:**
- Browser language detection was chosen to automatically serve the appropriate content
- Detection happens server-side using the `Accept-Language` header

**Scope of No-Redirect Behavior:**
- Applied only to the homepage `/`
- Other routes continue to use `/en/...` or `/zh-CN/...` format
- This creates a clean entry point while maintaining explicit locales in deep links

**Navigation from Root:**
- Links from `/` navigate to the detected locale's paths
- Example: If browser is Chinese, clicking "Docs" goes to `/zh-CN/docs`

### Explored Approaches

Three approaches were considered:

1. **Root-level page with detection + middleware bypass** (Selected)
   - New `app/page.tsx` at root level
   - Detect browser language in component
   - Update middleware to skip `/` 
   - Low-medium complexity, clean separation

2. **Middleware rewrite instead of redirect**
   - Use `NextResponse.rewrite()` to serve locale content at `/`
   - Keep all pages in `[lang]` structure
   - Medium complexity, more complex middleware

3. **Custom middleware + root layout wrapper**
   - Cookie-based locale storage
   - Hybrid middleware and component logic
   - Medium-high complexity, more moving parts

## Approach

Implement a dedicated root-level homepage that detects the user's browser language and serves the appropriate localized content without redirecting. The existing `app/[lang]/` structure remains intact for all other pages.

**Key principles:**
- Server-side locale detection using `Accept-Language` header
- Reuse existing `HomePage` component and dictionary system
- Minimal changes to middleware (just exclude `/` from Nextra's redirect logic)
- No visible redirect for the root path

## Architecture

### Components

**1. Root Page Component (`app/page.tsx`)**
- Server component accessing request headers
- Detects locale from `Accept-Language` header
- Matches against supported locales (`en`, `zh-CN`)
- Falls back to `en` if no match
- Loads dictionary via existing `getDictionary()` function
- Renders shared `HomePage` component with detected locale and dictionary

**2. Locale Detection Logic**
- Parses `Accept-Language` header format: `en-US,en;q=0.9,zh-CN;q=0.8`
- Extracts language codes and quality scores
- Matches against supported locales array
- Returns best match or default
- Can be inline in `app/page.tsx` or extracted to `app/_dictionaries/detect-locale.ts`

**3. Middleware Modification (`middleware.ts`)**
- Exclude `/` from Nextra locale middleware
- Options:
  - Update matcher pattern to exclude root path
  - Add early return for `pathname === '/'`
- Prevents automatic redirect from `/` to `/en`

**4. Existing Components**
- `HomePage` component: No changes needed, already accepts `lang` and `dictionary` props
- Navigation links use `lang` prop to construct locale-specific URLs
- Dictionary loading: Existing `getDictionary()` function reused

### Data Flow

1. Browser requests `/` with `Accept-Language: zh-CN,zh;q=0.9,en;q=0.8`
2. Middleware allows request through (no redirect)
3. `app/page.tsx` server component reads headers via Next.js `headers()` API
4. Locale detection parses header, returns `zh-CN`
5. `getDictionary('zh-CN')` loads Chinese translations
6. `HomePage` renders with `lang="zh-CN"` and Chinese dictionary
7. User sees Chinese content at `/`
8. Navigation links point to `/zh-CN/docs`, `/zh-CN/blog`, etc.

### Edge Cases

- **No Accept-Language header**: Falls back to `en`
- **Unsupported locale** (e.g., `fr-FR`): Falls back to `en`
- **Multiple locales with equal priority**: Takes first match from supported list
- **Dictionary loading fails**: Try-catch with fallback to English dictionary
- **Invalid header parsing**: Error handling with default to `en`
- **SEO**: Crawlers index `/` with default content; explicit locale URLs remain for hreflang

### Caching Considerations

- `/` requires `Vary: Accept-Language` header for proper CDN/browser caching
- Dynamic rendering needed for `/` (server-side detection)
- Alternative: Static generation with client-side detection (trade-off: potential flash of wrong language)

### Implementation Checklist

1. Create `app/page.tsx` (new file)
2. Modify `middleware.ts` (update matcher or add early return)
3. Optional: Create `app/_dictionaries/detect-locale.ts` utility
4. Add type safety: ensure detected locale is typed as `Locale`

### Testing

**Manual Testing:**
- Test `/` with English browser language → English content
- Test `/` with Chinese browser language → Chinese content
- Test `/` with unsupported language → English content (fallback)
- Click navigation links from `/` → Navigate to correct locale paths
- Verify `/en` and `/zh-CN` still work as before

**Automated Testing (optional):**
- Unit test locale detection with various header formats
- Integration test with mocked headers verifying correct dictionary loads
