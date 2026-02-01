import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { catalogData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ProductCatalog() {
  return (
    <section id="catalog" className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center font-headline text-4xl font-bold uppercase text-primary md:text-5xl">
          Nuestro Catálogo
        </h2>
        <Accordion type="single" collapsible className="mx-auto w-full max-w-4xl space-y-4">
          {catalogData.map((brand) => {
            const brandImage = PlaceHolderImages.find((p) => p.id === brand.imageId);
            return (
              <div
                key={brand.name}
                className="group relative overflow-hidden rounded-lg border border-border/20 shadow-lg"
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
                <div className="absolute inset-0 bg-black/80 transition-colors group-data-[state=open]:bg-black/90" />
                <AccordionItem value={brand.name} className="relative border-b-0">
                  <AccordionTrigger className="p-6 text-3xl font-bold text-primary-foreground hover:no-underline md:p-8 md:text-4xl [&[data-state=open]>svg]:text-primary-foreground">
                    {brand.name}
                  </AccordionTrigger>
                  <AccordionContent className="bg-background/90 p-6 pt-0 backdrop-blur-sm">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Tipos de Hits</h3>
                    <Accordion type="multiple" className="w-full">
                      {brand.hits.map((hit) => (
                        <AccordionItem
                          value={`${brand.name}-${hit.type}`}
                          key={`${brand.name}-${hit.type}`}
                          className="rounded-md px-4 data-[state=open]:bg-black/20"
                        >
                          <AccordionTrigger>{hit.type}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="grid list-disc grid-cols-2 gap-x-8 gap-y-2 py-2 pl-8 md:grid-cols-3">
                              {hit.flavors.map((flavor) => (
                                <li key={flavor} className="text-muted-foreground">
                                  {flavor}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
