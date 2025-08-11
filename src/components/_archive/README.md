# Archived Components

This folder contains components that are not currently used in production but may be useful in the future.

## Components

### mesh-gradient.tsx
- **Description**: Canvas-based animated mesh gradient with Felipe Pantone-inspired neon colors
- **Features**: 
  - Mouse-interactive gradient points
  - Smooth color transitions
  - Performance optimized with requestAnimationFrame
- **Use Case**: Vibrant, dynamic backgrounds for experimental sections

### webgl-mesh-gradient.tsx
- **Description**: WebGL-powered mesh gradient for high-performance rendering
- **Features**:
  - GPU-accelerated rendering
  - Smooth vertex color interpolation
  - Mouse-reactive animations
  - Lower CPU usage than canvas version
- **Use Case**: Hero backgrounds, loading screens, or artistic sections

## How to Restore

To use these components again:

1. Move the desired component back to `src/components/ui/`
2. Import and use in your pages:

```tsx
import { MeshGradient } from '@/components/ui/mesh-gradient'
// or
import { WebGLMeshGradient } from '@/components/ui/webgl-mesh-gradient'

// In your component
<div className="relative h-screen">
  <MeshGradient />
  {/* Your content */}
</div>
```

## Notes

These components were part of the original "Digital Dazzle" theme and create vibrant, animated backgrounds. They're fully functional and tested, just not aligned with the current "Precision Bold" minimalist aesthetic.
