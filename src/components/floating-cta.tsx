'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FloatingCTA() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110 hover:bg-accent/90 md:h-auto md:w-auto md:px-6 md:py-3"
      aria-label="Haz tu pedido en Instagram"
    >
      <Link href="https://www.instagram.com" target="_blank" className="flex items-center gap-2">
        <Instagram className="h-6 w-6" />
        <span className="hidden font-bold md:inline">Haz tu pedido en Instagram</span>
      </Link>
    </Button>
  );
}
