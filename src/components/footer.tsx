import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { Logo } from '@/components/icons';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/20 bg-transparent py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="opacity-80">
          <Logo />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Chill Smoke. Todos los derechos reservados.</p>
          <p className="mt-1 font-bold text-primary">Solo para mayores de 18 años.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
