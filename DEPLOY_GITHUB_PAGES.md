# Deploying to GitHub Pages

This Next.js application has been configured for deployment to GitHub Pages. Follow these steps to deploy your church website:

## Prerequisites
- A GitHub account
- Your code pushed to a GitHub repository

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

3. **The site will automatically deploy** when you push to the main branch
   - The GitHub Action workflow will run automatically
   - Check the "Actions" tab to see the deployment progress
   - Your site will be available at: `https://[username].github.io/[repository-name]/`

### Option 2: Manual Deployment

1. **Build the static site locally**:
   ```bash
   npm run build:static
   ```

2. **Deploy using gh-pages** (install if needed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "gh-pages -d out"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## Configuration for Custom Domain or Subdirectory

### If your repository is NOT `[username].github.io`:

1. **Update `next.config.js`**:
   ```js
   const nextConfig = {
     // ... other config
     basePath: '/your-repo-name',
     assetPrefix: '/your-repo-name/',
   };
   ```

2. **Rebuild and redeploy**:
   ```bash
   npm run build:static
   git add .
   git commit -m "Update base path"
   git push origin main
   ```

### For custom domain:

1. **Add a CNAME file** in the `public` directory with your domain:
   ```
   your-church-domain.com
   ```

2. **Configure DNS** at your domain registrar:
   - Add A records pointing to GitHub Pages IPs
   - Or add a CNAME record pointing to `[username].github.io`

## Testing Locally

To test the static build locally:

```bash
npm run build:static
npm run serve:static
```

Then open `http://localhost:3000` in your browser.

## Important Notes

1. **API Routes**: Static export doesn't support Next.js API routes. The mock APIs in `/app/api/` will not work in production. You'll need to:
   - Set up a separate backend service
   - Use serverless functions (Vercel, Netlify)
   - Or use a BaaS like Supabase/Firebase

2. **Dynamic Routes**: All dynamic routes must be pre-generated at build time using `generateStaticParams`.

3. **Authentication**: NextAuth requires a server. For static sites, consider:
   - Auth0
   - Firebase Auth
   - Supabase Auth

4. **Image Optimization**: Next.js Image optimization is disabled for static export. Images are served as-is.

## Troubleshooting

- **404 on refresh**: Make sure `trailingSlash: true` is set in `next.config.js`
- **Missing styles**: Check that the `basePath` matches your repository name
- **Build failures**: Review the Actions tab in GitHub for error details

## Live URL

Once deployed, your site will be available at:
- **Default**: `https://[your-github-username].github.io/[repository-name]/`
- **Custom domain**: `https://your-domain.com` (after DNS configuration)

## Support

For issues specific to this church website, check the documentation in `/docs/`.
For Next.js static export issues, see: https://nextjs.org/docs/app/building-your-application/deploying/static-exports