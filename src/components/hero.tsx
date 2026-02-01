import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export function Hero() {
  return (
    <section className="flex h-[70vh] min-h-[500px] w-full flex-col items-center justify-center overflow-hidden text-center md:h-[80vh]">
      <div className="flex flex-col items-center gap-2 p-4">
        <h1 className="font-headline font-bold uppercase leading-none drop-shadow-lg">
          <span className="text-8xl bg-gradient-to-r from-destructive to-accent bg-clip-text text-transparent md:text-9xl">
            Chill
          </span>
          <span className="block text-8xl text-white md:text-9xl">
            Smoke
          </span>
        </h1>

        <p className="text-xl text-muted-foreground opacity-80">
          Sabor que pega distinto
        </p>

        <Button
          asChild
          size="lg"
          className="mt-6 rounded-full bg-gradient-to-r from-destructive to-accent px-8 text-accent-foreground shadow-[0_0_15px_hsl(var(--accent)/0.5)] transition-all hover:scale-105 hover:shadow-[0_0_25px_hsl(var(--accent)/0.7)]"
        >
          <Link href="https://www.instagram.com" target="_blank">
            <Instagram className="mr-2 h-5 w-5" />
            Pedir por Instagram
          </Link>
        </Button>
      </div>
    </section>
  );
}
