'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Boxes } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-transparent py-16">
      <div className="container mx-auto flex max-w-3xl flex-col items-center gap-12 px-4">
        <Card className="w-full rounded-2xl border-white/10 bg-black/30 p-8 text-center backdrop-blur-sm md:p-12">
            <CardContent className="flex flex-col items-center gap-6 p-0">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-3xl font-medium text-primary">
                    Sobre Chill Smoke
                    </h3>
                    <p className="max-w-xl text-lg text-muted-foreground">
                    Tu punto de referencia para los mejores vapes de la ciudad. Calidad premium, sabores únicos y atención personalizada. Todo lo que necesitas, a un mensaje de distancia.
                    </p>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex flex-col items-center gap-3">
                    <Boxes className="h-8 w-8 text-accent" />
                    <h4 className="text-2xl font-medium text-primary">
                        ¡Vendemos al Mayoreo!
                    </h4>
                    <p className="max-w-xl text-lg text-muted-foreground">
                        ¿Interesado en distribuir? A partir de 10 piezas, contáctanos por Instagram para conocer nuestros precios especiales.
                    </p>
                </div>

                <div className="mt-4 rounded-full border border-primary/50 bg-secondary px-5 py-2 text-sm font-semibold text-primary">
                    +18 únicamente
                </div>
            </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-4 text-center">
          <Link
            href="https://www.instagram.com/chillsmokegdl/"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-semibold">@chillsmokegdl</span>
          </Link>
          <p className="text-xs text-muted-foreground/70">
            © {year} Chill Smoke. Uso responsable +18.
          </p>
        </div>
      </div>
    </footer>
  );
}
