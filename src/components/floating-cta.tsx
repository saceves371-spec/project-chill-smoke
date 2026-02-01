'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function FloatingCTA() {
  return (
    <Link
      href="https://www.instagram.com"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Haz tu pedido en Instagram"
    >
      <Instagram className="h-8 w-8" />
    </Link>
  );
}
