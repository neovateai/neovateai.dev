# GlowBox Component Design

**Date:** 2025-11-21  
**Status:** Approved  
**Location:** `app/_components/glow-box.tsx`, `app/_components/mouse-tracker.tsx`, `app/_components/glow-box.css`

## Overview

A flexible React container component that displays a gray border by default and shows a purple glow effect when the mouse approaches. Optimized for performance with many instances (10+) and mobile-friendly.

## Requirements

1. Gray border by default (1px solid #d1d5db)
2. Purple glow effect on mouse proximity (~100-150px range)
3. Accepts any React children (flexible container)
4. Performance-optimized for 10+ instances on a page
5. Mobile-friendly (no effect on touch devices)

## Architecture

### Approach: Intersection Observer + Hover Fallback

**Components:**
- `GlowBox.tsx` - Main wrapper component
- `MouseTracker.tsx` - Context provider for global mouse tracking
- `glow-box.css` - Styling and glow effects

**Key Design Decisions:**
- **Single mousemove listener** on MouseTracker provider (not per box)
- **Intersection Observer** to track only visible boxes
- Only visible boxes perform proximity calculations
- **Zero JavaScript on mobile** (disabled via media query detection)
- **RequestAnimationFrame throttling** for smooth 60fps updates

### Performance Guarantees

- O(1) event listener (single global listener)
- O(n) calculations where n = visible boxes only (not total boxes)
- RAF throttling prevents excessive renders
- No JavaScript overhead on mobile/touch devices
- Automatic cleanup via IntersectionObserver and useEffect unmount

## Component API

### GlowBox Props

```typescript
interface GlowBoxProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // default: purple gradient
  glowIntensity?: number; // multiplier 0.5-2, default: 1
  proximityRange?: number; // default: 150px
  borderWidth?: string; // default: "1px"
  borderRadius?: string; // default: "8px"
}
```

### MouseTracker Context

```typescript
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerContextValue {
  mousePos: MousePosition | null;
  registerBox: (id: string, element: HTMLElement) => void;
  unregisterBox: (id: string) => void;
  isDesktop: boolean;
}
```

## Data Flow

1. **MouseTracker Provider** wraps page/section containing GlowBoxes
2. Detects desktop vs mobile: `window.matchMedia('(hover: hover) and (pointer: fine)')`
3. On desktop: Attaches single `mousemove` listener to container
4. Each GlowBox:
   - Generates unique ID via `useId()`
   - Uses IntersectionObserver to detect viewport visibility
   - Registers/unregisters with MouseTracker on visibility change
5. On mouse move (RAF throttled):
   - MouseTracker updates context state: `{ x, y }`
   - Visible GlowBoxes calculate distance to mouse
   - Update CSS variable `--glow-intensity` on element
6. CSS reads `--glow-intensity` and renders glow via pseudo-element

## Implementation Details

### Distance Calculation

```typescript
const distance = Math.sqrt(
  Math.pow(mouseX - boxCenterX, 2) + 
  Math.pow(mouseY - boxCenterY, 2)
);

const intensity = Math.max(0, Math.min(1, 1 - distance / proximityRange));
```

### CSS Structure

```css
.glow-box {
  position: relative;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.glow-box::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, 
    rgba(147, 51, 234, var(--glow-intensity, 0)),  /* purple-600 */
    rgba(168, 85, 247, var(--glow-intensity, 0))   /* purple-500 */
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: var(--glow-intensity, 0);
}
```

### Mobile Behavior

- Detection: `window.matchMedia('(hover: hover) and (pointer: fine)')`
- If mobile/touch: No mouse tracking, glow effect disabled
- Shows only gray border (default state)

### IntersectionObserver Configuration

```typescript
{
  threshold: 0.1, // Trigger when 10% visible
  rootMargin: '50px' // Start tracking slightly before entering viewport
}
```

## Error Handling & Edge Cases

### Graceful Degradation
- IntersectionObserver not supported → fallback to CSS hover
- SSR safety: Check for `window` existence
- Invalid prop values → use sensible defaults

### Edge Cases Handled
- **Window resize**: Debounced listener updates box positions
- **Dynamic boxes**: Auto-cleanup via useEffect unmount
- **Mouse leaves window**: Set `mousePos = null`, glows fade to 0
- **Scroll performance**: IntersectionObserver handles natively
- **Multiple providers**: Isolated context scopes (support multiple glow sections)
- **Box removed from DOM**: IntersectionObserver auto-cleanup

### Performance Monitoring
- Console warning if >20 boxes visible simultaneously
- Optional debug mode prop to visualize tracking zones

## Testing Strategy

### Unit Tests
- Distance calculation accuracy
- Intensity clamping (0-1 range)
- Prop validation and defaults

### Integration Tests
- IntersectionObserver registration/cleanup
- Context provider state updates
- RAF throttling behavior

### Visual Tests
- Snapshot tests: default state, glowing state
- Visual regression tests for glow gradient

### Manual Testing
- Performance test with 50+ boxes in grid
- Mobile device testing (iOS Safari, Chrome Android)
- Cross-browser testing (Chrome, Firefox, Safari)

## File Structure

```
app/_components/
  ├── glow-box.tsx          # Main component + useProximityGlow hook
  ├── mouse-tracker.tsx     # Context provider
  └── glow-box.css          # Styles
```

## Usage Example

```tsx
import { MouseTracker } from '@/app/_components/mouse-tracker';
import { GlowBox } from '@/app/_components/glow-box';

export default function Page() {
  return (
    <MouseTracker>
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <GlowBox key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </GlowBox>
        ))}
      </div>
    </MouseTracker>
  );
}
```

## Future Enhancements (Not in MVP)

- Customizable glow colors per box
- Alternative glow patterns (radial, directional)
- Animation easing curves as prop
- Virtual scrolling integration for 100+ boxes
- Touch gesture support (glow follows touch on mobile)

## Dependencies

- React 19.1.0 (already in project)
- No additional dependencies required
- Uses native browser APIs: IntersectionObserver, requestAnimationFrame, matchMedia

## Browser Support

- Modern browsers with IntersectionObserver support (95%+ global coverage)
- Fallback to CSS hover for older browsers
- Mobile: iOS Safari 12.2+, Chrome Android 80+
