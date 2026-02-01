import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const logoImage = PlaceHolderImages.find((p) => p.id === 'hero-logo');
  return (
    <section className="mb-32 flex h-[70vh] min-h-[500px] w-full flex-col items-center justify-start pt-28 text-center md:h-[80vh]">
      <div className="flex flex-col items-center gap-0 p-4 overflow-visible">
        {logoImage && (
          <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            width={300}
            height={300}
            data-ai-hint={logoImage.imageHint}
            className="mb-4"
            priority
          />
        )}

        <p className="mt-0 text-xl text-muted-foreground opacity-80">
          Sabor que pega distinto
        </p>

        <Button
          asChild
          size="lg"
          className="mt-6 rounded-full bg-gradient-to-r from-destructive to-accent px-8 text-accent-foreground shadow-[0_0_15px_hsl(var(--accent)/0.5)] transition-all hover:scale-105 hover:shadow-[0_0_25px_hsl(var(--accent)/0.7)]"
        >
          <Link href="https://www.instagram.com/chillsmokegdl/" target="_blank">
            <Instagram className="mr-2 h-5 w-5" />
            Pedir por Instagram
          </Link>
        </Button>
      </div>
    </section>
  );
}
