import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { anton, inter } from '@/app/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Chill Smoke Catalog',
  description: 'Sabor que pega distinto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <html
      lang="es"
      className={cn('dark', inter.variable, anton.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="font-body antialiased relative">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            fill
            className="object-cover -z-10"
            data-ai-hint={bgImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/70 -z-10" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
