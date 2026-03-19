import { redirect } from 'next/navigation';

// The middleware handles locale detection and redirects automatically.
// This file is a safety fallback.
export default function RootPage() {
  redirect('/');
}
