# Public Assets Guide

## Required Assets

### PWA Icons
Create the following icon files for the Progressive Web App:

1. **icon-192.png** (192x192px)
   - Standard PWA icon
   - Use church logo or cross symbol
   - PNG format with transparency

2. **icon-512.png** (512x512px)
   - High-resolution PWA icon
   - Same design as 192px version
   - PNG format with transparency

### Recommended Images

1. **hero-pattern.svg**
   - Background pattern for hero sections
   - Subtle geometric or cross pattern
   - SVG format for crisp rendering

2. **news-1.jpg, news-2.jpg, news-3.jpg**
   - News article images
   - Recommended size: 800x600px
   - High quality photos of congregation events

### Tools for Creating Icons

**Free Tools:**
- [Canva](https://canva.com) - Easy icon design
- [Figma](https://figma.com) - Professional design tool
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Generate all sizes

**AI Image Generators:**
- [DALL-E](https://openai.com/dall-e)
- [Midjourney](https://midjourney.com)

### Icon Design Guidelines

- **Colors**: Use primary blue (#3b82f6) and white
- **Symbol**: Cross, church building, or "CoC" letters
- **Style**: Clean, modern, recognizable at small sizes
- **Background**: Solid color or subtle gradient

## Temporary Solution

Until you have custom icons, you can:
1. Use a solid color placeholder
2. Download free church icons from [Flaticon](https://flaticon.com)
3. Use emoji as temporary icon (⛪ or ✝️)

## Adding Images

Place all images in the `/public` directory:
```
/public
  /images
    hero-pattern.svg
    news-1.jpg
    news-2.jpg
    news-3.jpg
  icon-192.png
  icon-512.png
  favicon.ico
```

Then reference in code:
```jsx
<img src="/images/news-1.jpg" alt="Description" />
```

Or with Next.js Image component:
```jsx
import Image from 'next/image'

<Image
  src="/images/news-1.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## Next Steps

1. Create or source church logo
2. Generate PWA icons in required sizes
3. Add photos of congregation, events, building
4. Optimize all images before upload
5. Update image alt text for accessibility

---

**Need help?** Contact your web ministry team or a graphic designer.
