import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '33ddu386',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch functions
export async function getEvents() {
  return client.fetch(`
    *[_type == "event"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      endDate,
      location,
      category,
      description,
      image,
      maxCapacity,
      requiresRsvp,
      featured
    }
  `);
}

export async function getSermons() {
  return client.fetch(`
    *[_type == "sermon"] | order(date desc) {
      _id,
      title,
      slug,
      speaker,
      date,
      scripture,
      series,
      description,
      audioUrl,
      videoUrl,
      tags,
      featured
    }
  `);
}

export async function getNews() {
  return client.fetch(`
    *[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      author,
      category,
      excerpt,
      mainImage,
      featured
    }
  `);
}

export async function getPrayerRequests() {
  return client.fetch(`
    *[_type == "prayerRequest" && isPublic == true && approved == true] | order(submittedAt desc) {
      _id,
      name,
      request,
      submittedAt,
      prayerCount
    }
  `);
}

export async function getVolunteerOpportunities() {
  return client.fetch(`
    *[_type == "volunteer" && active == true] | order(featured desc) {
      _id,
      title,
      slug,
      category,
      description,
      commitment,
      contactPerson,
      contactEmail,
      featured
    }
  `);
}
