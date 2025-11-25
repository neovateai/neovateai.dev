# Homepage Dark Parallax Background

**Date:** 2025-11-21  
**Status:** Implemented  
**Component:** `app/[lang]/page.tsx`

## Overview

Implemented a dark-mode-only homepage with animated parallax background using two layered images that move at different speeds on scroll.

## Design Decisions

### 1. Force Dark Mode
- Added `className="dark"` wrapper to the root div of the homepage
- Overrides global theme selection for this page only
- Other pages still respect user's theme preference
- Background color: `#0a0a14` for deep dark effect

### 2. Parallax Background Architecture

**Two-layer system:**
- **Layer 1 (Back):** `https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*ZV4OTrrh120AAAAATtAAAAgAeobkAQ/original`
  - Scroll speed: 0.5x (slower, creates depth)
  - z-index: -2
  
- **Layer 2 (Front):** `https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*hpceRa2rOpYAAAAAWbAAAAgAeobkAQ/original`
  - Scroll speed: 0.3x (even slower, foreground layer)
  - z-index: -1

### 3. Implementation Approach

**Component Structure:**
```
HomePage (Client Component)
├── ParallaxBackground
│   ├── Background Layer 1 (fixed position)
│   └── Background Layer 2 (fixed position)
└── Content (z-10, relative)
```

**Scroll Handler:**
- Uses `requestAnimationFrame` for 60fps smooth animations
- Passive scroll event listener for better performance
- Updates transform translateY based on scroll position
- Cleanup on unmount to prevent memory leaks

### 4. Mobile Optimization

**Responsive behavior:**
- Desktop (≥768px): Full parallax (0.5x and 0.3x multipliers)
- Mobile (<768px): Reduced parallax (0.1x and 0.05x multipliers)
- Prevents performance issues on mobile devices
- Resize listener to dynamically adjust

### 5. Client-Side Rendering

**Converted to Client Component:**
- Added `'use client'` directive
- Required for scroll event listeners and state management
- Dictionary fetching moved to `useEffect` hook
- Loading state handled with null return during fetch

## Technical Details

### Performance Optimizations
1. `requestAnimationFrame` for smooth animations
2. Passive scroll listeners
3. Try-catch error handling in scroll handler
4. Proper cleanup of event listeners

### Cross-Browser Compatibility
- Uses standard CSS transforms (translateY)
- Fixed positioning with inset-0
- Background-size: cover for responsive images
- No vendor prefixes needed

### Accessibility
- `pointer-events: none` on background layers
- Maintains content readability with z-index layering
- Dark theme forced but content remains accessible

## Files Modified

1. **app/[lang]/page.tsx**
   - Converted to client component
   - Added ParallaxBackground component
   - Implemented scroll tracking logic
   - Added dark mode wrapper

## Testing Checklist

- [x] Visual: Both background images load and layer correctly
- [x] Scroll: Parallax effect works with different speeds
- [x] Theme: Other pages still respect theme toggle
- [x] Mobile: Reduced parallax on mobile devices
- [x] Performance: No frame drops during scroll
- [x] Cleanup: Event listeners removed on unmount

## Future Enhancements

- Add fade-in animation on page load
- Consider adding IntersectionObserver for performance
- Explore CSS-only fallback for no-JS scenarios
- Add preload hints for background images
