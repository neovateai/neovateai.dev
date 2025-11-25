# Footer Component with i18n Support

**Date:** 2025-11-21

## Context

The goal is to add a Footer component to the website under `app/_components/`. The footer should:
- Display a multi-column layout with sections: Products, Resources, Company, and Social
- Include a logo at the top-left (served from Alipay CDN)
- Support internationalization (English and Chinese) consistent with existing site components
- Be mobile-friendly and responsive
- Use hardcoded text with placeholder links (`href="#"`) that will be filled in later
- Follow existing codebase patterns and use Tailwind CSS for styling

## Discussion

### Key Decisions Made:

**Column Structure:**
- Selected Approach A: Use exact columns from the design mockup - "Products", "Resources", "Company", "Social"
- Maintains consistency with the provided design specification

**Internationalization:**
- Chosen Approach A: Support i18n (English + Chinese) from the start
- Aligns with existing site architecture where components like `features.tsx` use the dictionary pattern

**Styling Approach:**
- Selected Approach A: Pure Tailwind classes (inline)
- Consistent with `features.tsx` and other existing components
- Component location: `app/_components/footer.tsx` alongside other shared components

**Component Architecture:**
- Selected Approach A: Server Component with Dictionary (Consistent with Features)
- Async server component that fetches i18n dictionary
- Footer data structure defined inline within component
- Follows the exact pattern established by `features.tsx`
- Trade-off: Footer data mixed with rendering logic, but gains consistency and simplicity

### Alternatives Explored:

**Architecture alternatives considered but not chosen:**
- Separate data file approach: Would add cleaner separation but introduce extra file complexity
- Client component with context: Would enable easier future interactivity but doesn't match current patterns and increases bundle size

## Approach

The Footer will be implemented as an async server component following the established pattern from `features.tsx`. It will:

1. Accept a `lang: Locale` prop from parent layout/page
2. Fetch translations using `getDictionary(lang)`
3. Render a 4-column responsive grid layout with hardcoded structure
4. Use dictionary values for all visible text (column titles and link labels)
5. Include placeholder hrefs (`#`) that can be easily updated later
6. Display the logo image from the provided CDN URL

This approach maintains architectural consistency, supports full i18n from day one, and keeps the implementation simple and maintainable.

## Architecture

### Component Structure

**File Location:** `app/_components/footer.tsx`

**Type Definition:**
- Export: `export const Footer: FC<{ lang: Locale }>`
- Async server component pattern
- Uses existing `Locale` type from `i18n-config`

**Data Flow:**
1. Parent passes `lang` prop to Footer
2. Component calls `getDictionary(lang)` to fetch translations
3. Maps over hardcoded column/link structure using dictionary values
4. Renders semantic HTML with Tailwind styling

### Layout & Responsive Design

**Desktop Layout:**
- Container with max-width and horizontal padding
- Logo positioned at top with bottom margin
- 4-column grid: `grid grid-cols-4 gap-8`
- Each column: bold title + list of links below
- Hover states on links

**Mobile Layout:**
- Responsive grid: `grid-cols-1 md:grid-cols-4`
- Columns stack vertically on mobile
- Logo remains at top, full-width
- Touch-friendly link sizing
- Consistent vertical spacing

**Visual Styling:**
- Background color (footer-appropriate gray/dark tone)
- Text colors: Muted for links, higher contrast for titles
- Logo sized appropriately (e.g., ~40px height)
- Spacing follows existing design system

### Dictionary Updates

**Files to Update:**
- `app/_dictionaries/en.ts`
- `app/_dictionaries/zh-CN.ts`

**New Keys Structure:**
```typescript
footer: {
  logoAlt: "Company Logo",
  products: "Products",
  resources: "Resources",
  company: "Company",
  social: "Social",
  // Individual link text for each column
  productLink1: "Product 1",
  productLink2: "Product 2",
  // ... etc for all links across all columns
}
```

### Accessibility Considerations

- Semantic `<footer>` element wrapper
- Logo with proper `alt` text from dictionary
- Proper `<a>` tags for all links
- Column titles use heading tags (`<h3>` or `<h4>`)
- Color contrast ratios meet WCAG standards
- Screen reader friendly structure

### Implementation Notes

- **Logo URL:** `https://mdn.alipayobjects.com/huamei_h9478t/afts/img/q7dZTLOigq4AAAAAQCAAAAgADhqBAQFr/original`
- **Placeholder hrefs:** All links use `href="#"` for now
- **No external dependencies:** Uses only existing project dependencies
- **No separate CSS file:** Pure Tailwind inline classes
- **Future-ready:** Easy to update hrefs, add/remove links, or extend with additional footer elements (newsletter, etc.)
