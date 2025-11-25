# Experience Hero Component

**Date:** 2025-11-21

## Context

Create a hero section component based on a provided design mockup featuring the Neovate branding with a dark background and prominent pink CTA button. The component needs to be mobile-friendly, support internationalization (i18n), and include a distinctive glow effect in the bottom left that intensifies on hover.

The design includes:
- "Neovate" branding as the main title
- Chinese subtitle "先一步全新体验"
- Pink CTA button with bilingual text "开始体验 new experience"
- Dark background with subtle reddish glow
- Small disclaimer text at bottom right

## Discussion

### Purpose & Functionality
- Confirmed as a hero section for the homepage
- CTA button navigates to `/docs/overview` using Next.js Link
- Component follows existing naming conventions in `app/_components/`

### Internationalization Strategy
- Translate: subtitle, button text, and disclaimer
- Keep "Neovate" brand name untranslated
- Dictionary keys: `hero.subtitle`, `hero.buttonText`, `hero.disclaimer`
- Support for both English and Chinese (zh-CN)

### Glow Effect Behavior
- Radial gradient glow positioned at bottom left
- Intensifies when hovering over the entire component (not just button)
- Implemented as a component-level hover state

### Mobile Responsiveness
- Stack vertically: title/subtitle on top, button below
- Maintain full-width or near-full-width button on mobile
- Reduce font sizes and padding appropriately
- Center-align or adjust alignment for better mobile UX

### Implementation Approach
Three approaches were explored:
1. **Pure Tailwind + CSS Gradients** (Selected) - No extra dependencies, straightforward implementation
2. CSS Custom Properties + Keyframes - More customizable but requires custom styles
3. Framer Motion - Most polished but adds dependency

Selected Approach A for simplicity and performance without additional dependencies.

## Approach

Build a pure React component using Tailwind CSS utilities and CSS pseudo-elements for the glow effect. The component will be presentational, receiving translated strings via props from the parent page's dictionary system.

**Key decisions:**
- Component name: `experience.tsx` 
- No external animation libraries needed
- Glow via `::before` pseudo-element with blur filter
- Responsive design using Tailwind breakpoints
- Semantic HTML with accessibility in mind

## Architecture

### Component Structure

**File:** `app/_components/experience.tsx`

**Props Interface:**
```typescript
{
  subtitle: string,
  buttonText: string,
  disclaimer: string
}
```

**HTML Hierarchy:**
```
<section> (relative, dark background, glow effect container)
  └─ ::before (pseudo-element for glow effect)
  └─ <div> (content wrapper - flex container)
      ├─ <div> (left: title + subtitle)
      │   ├─ <h1> "Neovate"
      │   └─ <p> {subtitle}
      └─ <Link> (right: CTA button)
          └─ {buttonText}
  └─ <p> (disclaimer - absolute positioned)
```

### Styling Details

**Container:**
- Dark background: `bg-black` or `bg-gray-950`
- Full-width section with vertical padding: `py-16` (desktop), `py-12` (mobile)
- Relative positioning for glow pseudo-element
- Group hover state for glow effect

**Glow Effect Implementation:**
- `::before` pseudo-element with absolute positioning
- Position: bottom-left (`left: 0, bottom: 0`)
- Radial gradient: `radial-gradient(circle at bottom left, rgba(255, 50, 100, 0.4), transparent 50%)`
- Large size: 600-800px for diffused effect
- Blur filter: `blur(80px)` for soft glow
- Pointer events disabled: `pointer-events: none`
- Initial opacity: 0.5-0.6
- Hover opacity: 0.9-1.0
- Smooth transition: 300-500ms ease

**Desktop Layout (≥768px):**
- Flexbox row with `justify-between`
- Left: Title (large, white) + subtitle (gray, smaller)
- Right: Pink button, vertically centered
- Disclaimer: absolute positioned bottom-right

**Mobile Layout (<768px):**
- Flexbox column, centered
- Stack vertically: title → subtitle → button
- Full-width or near-full-width button
- Disclaimer centered or left-aligned at bottom
- Reduced font sizes and padding

**Button Styling:**
- Background: `bg-pink-500` or custom pink
- Rounded corners: `rounded-lg` or `rounded-xl`
- Generous padding for touch targets (min 44px height)
- Hover: subtle scale (`scale-105`) or brightness increase
- Typography: bilingual text on same line

### Navigation & Integration

**Link Component:**
- Uses `next/link` with `href="/docs/overview"`
- Locale prefix handled by Next.js middleware automatically
- Button rendered as Link child for proper semantics

**Dictionary Integration:**
- Parent page fetches dictionary using `getDictionary(lang)`
- Passes relevant keys to component
- Required dictionary entries in `en.ts` and `zh-CN.ts`:
  - `hero.subtitle`
  - `hero.buttonText`
  - `hero.disclaimer`

### Accessibility

- Semantic HTML: `<section>`, `<h1>` for title
- Sufficient color contrast (pink on dark meets WCAG AA)
- Keyboard navigation via Link component
- Touch target sizes meet minimum requirements (44px)
- ARIA labels if needed for disclaimer text

### Testing Considerations

- Visual regression testing for glow effect
- Responsive breakpoint testing (mobile/tablet/desktop)
- Hover state verification on desktop
- i18n verification for both locales
- Link navigation test to `/docs/overview`
- Browser compatibility: Chrome, Safari, Firefox

### Browser Compatibility

- CSS backdrop-filter/blur widely supported
- Fallback: gradient without blur for older browsers
- Flexbox and CSS transitions fully supported
- No JavaScript required for core functionality
