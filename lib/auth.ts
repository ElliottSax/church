import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user || user.role !== 'admin') {
    throw new Error('Unauthorized - Admin access required');
  }
  return user;
}
