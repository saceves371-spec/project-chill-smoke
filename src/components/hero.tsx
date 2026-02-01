import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
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
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-black/60" />
      <div className="relative z-10 flex flex-col items-center gap-6 p-4 text-primary-foreground">
        <Logo />
        <h1 className="font-headline text-4xl font-bold uppercase tracking-wider text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
          Sabor que pega distinto
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Explora nuestro catálogo y haz tu pedido. La noche es tuya.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90"
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
