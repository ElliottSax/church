import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const DONATION_AMOUNTS = [
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 250, label: '$250' },
  { value: 500, label: '$500' },
];

export const GIVING_CATEGORIES = [
  { id: 'general', name: 'General Fund', description: 'Support overall church operations' },
  { id: 'missions', name: 'Missions', description: 'Support global mission work' },
  { id: 'youth', name: 'Youth Ministry', description: 'Support youth programs and activities' },
  { id: 'building', name: 'Building Fund', description: 'Facility maintenance and improvements' },
  { id: 'benevolence', name: 'Benevolence', description: 'Help those in need' },
];
