# Live Photo Implementation Guide

## Overview
The Live Photo feature supports native Apple iPhone Live Photos on your portfolio website. When visitors view your about page, your portrait will automatically play a short video before settling on the still image, creating an engaging and personal experience.

## Native iPhone Live Photo Support
The implementation now supports native iPhone Live Photo files directly. iPhone Live Photos consist of:
- A HEIC still image (or JPEG if you've changed your camera settings)
- A MOV video file containing ~3 seconds of video (1.5 seconds before and after the photo)

## File Requirements

### Option A: Using Native iPhone Files
1. **Still Image (HEIC/JPEG)**
   - **Original format**: HEIC (iPhone default) or JPEG
   - **Converted format**: JPEG for web compatibility
   - **File location**: `/public/images/tyler-portrait.jpg`
   - **Note**: You'll need to convert HEIC to JPEG for web use

2. **Video File (MOV)**
   - **Original format**: MOV from iPhone
   - **File location**: `/public/images/tyler-live-photo.mov`
   - **Optional MP4**: Convert to MP4 for better browser compatibility
   - **Duration**: ~3 seconds (iPhone default)

### Option B: Custom Live Photo
1. **Still Image (JPEG/PNG)**
   - **Recommended size**: 800x1000px (or similar portrait aspect ratio)
   - **Format**: JPEG for photos, PNG if you need transparency
   - **File location**: `/public/images/tyler-portrait.jpg`
   - **Optimization**: Use high quality (90) but keep file size under 200KB

2. **Video File (MP4)**
   - **Recommended size**: Same dimensions as the still image
   - **Format**: MP4 (H.264 codec for best compatibility)
   - **Duration**: 2-3 seconds
   - **File location**: `/public/images/tyler-live-photo.mp4`
   - **Optimization**: Keep file size under 1MB

## Exporting iPhone Live Photos

### Method 1: Export Original Files (Recommended)
1. **On Mac**:
   - Open Photos app
   - Select your Live Photo
   - File → Export → Export Unmodified Original
   - This exports both the HEIC/JPEG and MOV files

2. **File naming**:
   - You'll get two files: `IMG_XXXX.HEIC` (or `.JPG`) and `IMG_XXXX.MOV`
   - Rename them to match your project:
     - `tyler-portrait.heic` → Convert to `tyler-portrait.jpg`
     - `IMG_XXXX.MOV` → `tyler-live-photo.mov`

### Method 2: Using iPhone/Mac Export Options
1. **On iPhone**: 
   - Open the Live Photo in Photos app
   - Tap the Share button
   - Select "Save as Video"
   - AirDrop to your Mac

2. **On Mac**:
   - Open the Live Photo in Photos app
   - File → Export → Export 1 Photo
   - Kind: JPEG for still image
   - File → Export → Export 1 Video for the video

### Method 3: Using Third-Party Tools
1. **LivePix** (iOS App):
   - Import your Live Photo
   - Export as video (MP4)
   - Export key frame as JPEG

2. **Online Converters**:
   - Use services like `live.photos` or `lively`
   - Upload HEIC file
   - Download video and still separately

## Converting Files for Web

### Convert HEIC to JPEG
```bash
# Using ImageMagick
convert tyler-portrait.heic tyler-portrait.jpg

# Using sips (built into macOS)
sips -s format jpeg tyler-portrait.heic --out tyler-portrait.jpg

# Using Preview app
# Open HEIC in Preview → File → Export → Format: JPEG
```

### Convert MOV to MP4 (Optional but recommended)
```bash
# Basic conversion
ffmpeg -i tyler-live-photo.mov -c:v libx264 -crf 23 -preset fast tyler-live-photo.mp4

# Optimized for web with no audio
ffmpeg -i tyler-live-photo.mov -an -c:v libx264 -crf 28 -preset fast -movflags +faststart tyler-live-photo.mp4

# Extract still frame at key moment (1.5 seconds)
ffmpeg -i tyler-live-photo.mov -ss 00:00:01.500 -frames:v 1 tyler-portrait-extracted.jpg
```

## Implementation Options

### Option 1: Native iPhone Live Photo
```tsx
<PortraitImage
  src="/images/tyler-portrait.jpg"  // Converted from HEIC
  alt="Tyler Schmidt - Product Designer"
  variant="creative"
  className="md:w-1/3"
  isAppleLivePhoto={true}
  movSrc="/images/tyler-live-photo.mov"  // Original iPhone MOV
  mp4Src="/images/tyler-live-photo.mp4"  // Optional: pre-converted
/>
```

### Option 2: Custom Live Photo
```tsx
<PortraitImage
  src="/images/tyler-portrait.jpg"
  alt="Tyler Schmidt - Product Designer"
  variant="creative"
  className="md:w-1/3"
  isLivePhoto={true}
  videoSrc="/images/tyler-live-photo.mp4"
/>
```

### Option 3: Direct Apple Live Photo Component
```tsx
<AppleLivePhoto
  jpgSrc="/images/tyler-portrait.jpg"    // Converted from HEIC
  movSrc="/images/tyler-live-photo.mov"  // Original iPhone file
  mp4Src="/images/tyler-live-photo.mp4"  // Optional converted version
  alt="Tyler Schmidt - Product Designer"
  className="rounded-2xl shadow-2xl"
  autoPlay={true}          // Play automatically on load
  playOnInView={true}      // Play when scrolled into view
  playOnHover={true}       // Replay on hover
  onPlayComplete={() => {
    console.log("Live photo finished playing")
  }}
/>
```

## Best Practices

### 1. Performance Optimization
- **Preload the video**: The component automatically sets `preload="auto"`
- **Compress videos**: Aim for under 1MB total file size
- **Use CDN**: Consider using a CDN for video delivery on production
- **Provide MP4 fallback**: Better browser compatibility than MOV

### 2. Accessibility
- Always include descriptive `alt` text
- The video plays muted by default (required for autoplay)
- Users can replay by clicking the image

### 3. Design Considerations
- The "LIVE" indicator appears during playback (Apple-style)
- Concentric circle animation mimics iPhone behavior
- The transition between video and still is smooth (300ms fade)

### 4. Fallback Strategy
- If video fails to load, the component gracefully falls back to the still image
- Always provide both MOV and MP4 for maximum compatibility
- Consider having a non-Live Photo version for users with slower connections

## Testing Your Implementation

1. **Local Testing**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/about
   ```

2. **Check Performance**:
   - Open DevTools Network tab
   - Ensure video loads quickly (< 2 seconds)
   - Verify smooth playback

3. **Test on Different Devices**:
   - Desktop: Chrome, Firefox, Safari
   - Mobile: iOS Safari, Chrome
   - Tablet: iPadOS Safari

## Troubleshooting

### Video Won't Play
- Check file paths are correct
- MOV files may not play in all browsers - provide MP4 fallback
- Ensure video codec is supported (H.264 for MP4, H.265/HEVC for newer MOV)
- Verify file permissions in public folder
- Check browser console for errors
- Some browsers don't support MOV format - Chrome/Firefox prefer MP4

### Performance Issues
- Reduce video quality/bitrate
- Shorten video duration
- Use smaller dimensions
- Enable lazy loading for below-fold content
- Convert MOV to MP4 for smaller file sizes

### Layout Issues
- Ensure aspect ratios match between video and image
- Check responsive breakpoints
- Verify CSS shape-outside support in target browsers

## Alternative Implementations

### Hover-Only Version
Set `autoPlay={false}` and `playOnHover={true}` for a more subtle effect

### Gallery Version
Create multiple Live Photos in a grid layout for a dynamic team page

### Background Version
Use the Live Photo as a full-screen background with overlay text

## Browser Compatibility

### MOV Support
- **Safari**: ✅ Full support (Mac/iOS)
- **Chrome**: ⚠️ Limited support (may require MP4 fallback)
- **Firefox**: ❌ No support (requires MP4 fallback)
- **Edge**: ⚠️ Limited support

### Recommendations
1. Always provide both MOV and MP4 versions for maximum compatibility
2. The component automatically falls back to still image if video fails
3. Test on target browsers before deployment
4. Consider using feature detection to serve appropriate format