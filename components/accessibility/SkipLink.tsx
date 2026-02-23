/**
 * Skip to Main Content Link
 * Allows keyboard users to skip navigation and go directly to main content
 * Meets WCAG 2.1 AA guideline 2.4.1 (Bypass Blocks)
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
    >
      Skip to main content
    </a>
  );
}
