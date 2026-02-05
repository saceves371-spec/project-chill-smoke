'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { catalogData, plumasData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProductCatalog() {
  const plumasImage = PlaceHolderImages.find((p) => p.id === plumasData.imageId);
  const smokeOverlayImage = PlaceHolderImages.find((p) => p.id === 'smoke-overlay');

  return (
    <section id="catalog" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center font-headline text-5xl font-bold uppercase md:text-6xl">
          <span className="bg-gradient-to-r from-accent to-destructive bg-clip-text text-transparent">
            Catálogo
          </span>
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          Toca una marca para ver los sabores
        </p>

        <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl space-y-6">
          {catalogData.map((brand, brandIndex) => {
            const brandImage = PlaceHolderImages.find((p) => p.id === brand.imageId);
            return (
              <AccordionItem
                key={`brand-${brandIndex}`}
                value={brand.name}
                className="group relative overflow-hidden rounded-2xl border border-border/10 shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20"
              >
                {brandImage && (
                  <Image
                    src={brandImage.imageUrl}
                    alt={`Background for ${brand.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={brandImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300" />
                {brand.name === 'IPLAY BOX' && smokeOverlayImage && (
                  <Image
                    src={smokeOverlayImage.imageUrl}
                    alt={smokeOverlayImage.description}
                    fill
                    className="object-cover opacity-40"
                    data-ai-hint={smokeOverlayImage.imageHint}
                  />
                )}
                <AccordionTrigger className="relative p-6 text-4xl font-bold uppercase text-white hover:no-underline md:p-8 md:text-5xl [&>svg]:h-8 [&>svg]:w-8 [&>svg]:text-accent">
                  {brand.name}
                </AccordionTrigger>
                <AccordionContent className="relative bg-background/95 p-6 pt-0 backdrop-blur-sm">
                  {brand.hits.map((hit, hitIndex) => (
                    <div key={`hit-${brandIndex}-${hitIndex}`} className="mb-6 last:mb-0">
                      <h4 className="mb-3 text-lg font-semibold text-primary">{hit.type}</h4>
                      <ul className="grid list-disc grid-cols-2 gap-x-8 gap-y-2 py-2 pl-6 md:grid-cols-3">
                        {hit.flavors.map((flavor, flavorIndex) => (
                          <li key={`flavor-${brandIndex}-${hitIndex}-${flavorIndex}`} className="text-muted-foreground">
                            {flavor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="mt-4 text-center text-sm font-semibold italic text-muted-foreground">
                    *SUJETO A DISPONIBILIDAD*
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}

          {/* Plumas section */}
          <AccordionItem
            key={plumasData.name}
            value={plumasData.name}
            className="group relative overflow-hidden rounded-2xl border border-border/10 shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20"
          >
            {plumasImage && (
              <Image
                src={plumasImage.imageUrl}
                alt={`Background for ${plumasData.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={plumasImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300" />
            {smokeOverlayImage && (
               <Image
                src={smokeOverlayImage.imageUrl}
                alt={smokeOverlayImage.description}
                fill
                className="object-cover opacity-40"
                data-ai-hint={smokeOverlayImage.imageHint}
              />
            )}
            <AccordionTrigger className="relative p-6 text-4xl font-bold uppercase text-white hover:no-underline md:p-8 md:text-5xl [&>svg]:h-8 [&>svg]:w-8 [&>svg]:text-accent">
              {plumasData.name}
            </AccordionTrigger>
            <AccordionContent className="relative bg-background/95 p-6 pt-0 backdrop-blur-sm">
                {plumasData.items.map((item, itemIndex) => (
                    <div key={`pluma-item-${itemIndex}`} className="mb-6 last:mb-0">
                        <h4 className="mb-2 text-lg font-semibold text-primary">{item.name}</h4>
                        <p className="pb-2 text-sm text-muted-foreground">{item.description}</p>
                        <ul className="grid list-disc grid-cols-2 gap-x-8 gap-y-2 py-2 pl-6 md:grid-cols-3">
                            {item.brands.map((brand, brandIndex) => (
                            <li key={`pluma-brand-${itemIndex}-${brandIndex}`} className="text-muted-foreground">
                                {brand}
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
              <p className="mt-4 text-center text-sm font-semibold italic text-muted-foreground">
                *SUJETO A DISPONIBILIDAD*
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
