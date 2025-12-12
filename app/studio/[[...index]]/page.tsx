'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

// For static export, we need to specify which paths to generate
export function generateStaticParams() {
  // Only generate the base studio page
  return [{ index: [] }];
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
