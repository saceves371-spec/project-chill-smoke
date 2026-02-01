import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Instagram } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <section className="relative flex h-[70vh] min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background text-center md:h-[80vh]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex flex-col items-center gap-2 p-4">
        <h1 className="font-headline font-bold uppercase leading-none tracking-tighter drop-shadow-lg">
          <span className="text-8xl bg-gradient-to-r from-accent to-destructive bg-clip-text text-transparent md:text-9xl">
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
          className="mt-6 rounded-full bg-accent px-8 text-accent-foreground shadow-lg shadow-accent/40 transition-all hover:scale-105 hover:bg-accent/90 hover:shadow-accent/60"
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
