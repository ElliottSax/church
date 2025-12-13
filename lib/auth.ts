// Auth is disabled for static deployment
// These functions are stubs to prevent build errors

export async function getCurrentUser() {
  // Auth disabled for static deployment
  return null;
}

export async function requireAuth() {
  // Auth disabled for static deployment
  throw new Error('Authentication not available in static deployment');
}

export async function requireAdmin() {
  // Auth disabled for static deployment
  throw new Error('Authentication not available in static deployment');
}
