# Development Guide

## Getting Started

### First Time Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development Workflow

### File Structure

- **`/app`** - Next.js App Router pages and layouts
  - Each folder becomes a route
  - `page.tsx` is the page component
  - `layout.tsx` wraps child pages

- **`/components`** - Reusable React components
  - `/home` - Home page sections
  - `/layout` - Site-wide layout components

- **`/public`** - Static assets (images, manifest, etc.)

### Adding New Pages

1. Create a new folder in `/app`
2. Add a `page.tsx` file
3. Export default component
4. Add metadata export for SEO

Example:
```typescript
// app/new-page/page.tsx
export const metadata = {
  title: "Page Title | Minneapolis Community of Christ",
  description: "Page description for SEO",
};

export default function NewPage() {
  return (
    <div>
      {/* Your content */}
    </div>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Color palette:
  - Primary: `primary-{50-950}` (blue)
  - Secondary: `secondary-{50-950}` (gray)
- Responsive: Use `md:` and `lg:` breakpoints
- Animations: Use Framer Motion for interactive elements

### Components Best Practices

1. **"use client"** for interactive components
   - Components with state, effects, or event handlers need this directive

2. **Server Components by default**
   - Pages and static components don't need "use client"

3. **Accessibility**
   - Always include ARIA labels
   - Test keyboard navigation
   - Use semantic HTML

### Common Tasks

#### Adding a New Event
Edit `app/connect/events/page.tsx` and add to the events array.

#### Updating Navigation
Edit `components/layout/Navigation.tsx` to modify menu items.

#### Changing Contact Info
Update `components/layout/Footer.tsx` and environment variables.

#### Adding Blog Posts/News
Edit `components/home/NewsStories.tsx` (will be CMS-powered in future).

## Testing

### Manual Testing Checklist

- [ ] Test on mobile devices
- [ ] Test all navigation links
- [ ] Test form submissions
- [ ] Test chatbot functionality
- [ ] Test accessibility with screen reader
- [ ] Test keyboard navigation
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)

### Accessibility Testing

```bash
# Install lighthouse
npm install -g lighthouse

# Run accessibility audit
lighthouse http://localhost:3000 --only-categories=accessibility
```

## Building for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm start
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically on push

### Other Platforms

The site can be deployed to any Node.js hosting platform:
- Netlify
- AWS Amplify
- Google Cloud Run
- Digital Ocean App Platform

## Performance Optimization

- Images: Use Next.js `<Image>` component for automatic optimization
- Fonts: Already optimized with next/font
- Code splitting: Automatic with Next.js App Router
- Caching: Configure in `next.config.js`

## Troubleshooting

### Build Errors

**TypeScript errors**: Run `npm run lint` to find issues

**Missing dependencies**: Run `npm install`

**Port in use**: Change port with `npm run dev -- -p 3001`

### Common Issues

**Framer Motion animations not working**:
- Ensure component has "use client" directive

**Tailwind styles not applying**:
- Check class names are in Tailwind format
- Verify `tailwind.config.ts` content paths

**Environment variables not loading**:
- Prefix public vars with `NEXT_PUBLIC_`
- Restart dev server after changes

## Future Enhancements

### Priority 1 (Next Phase)
- [ ] Headless CMS integration (Sanity.io)
- [ ] Member authentication portal
- [ ] Online giving integration
- [ ] Email automation

### Priority 2
- [ ] Advanced analytics
- [ ] Social media feed integration
- [ ] Photo gallery with admin upload
- [ ] Volunteer scheduling system

### Priority 3
- [ ] Mobile app (React Native)
- [ ] Advanced sermon search (AI-powered)
- [ ] Virtual tour
- [ ] Multi-language support

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Community of Christ](https://cofchrist.org)

## Support

For questions or issues during development:
- Check existing issues in project
- Consult Next.js documentation
- Contact web ministry team

---

Happy coding! 🚀
