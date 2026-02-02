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
        <h2 className="mb-4 text-center font-headline text-5xl font-bold uppercase md:text-6xl">
          <span className="bg-gradient-to-r from-accent to-destructive bg-clip-text text-transparent">
            Catálogo
          </span>
        </h2>
        <p className="mb-10 text-center text-muted-foreground">
          Toca una marca para ver los sabores
        </p>

        <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl space-y-6">
          {catalogData.map((brand) => {
            const brandImage = PlaceHolderImages.find((p) => p.id === brand.imageId);
            return (
              <AccordionItem
                key={brand.name}
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
                {brand.name === 'IPLAY BOX' && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{
                      backgroundImage: `url('https://pngimg.com/uploads/smoke/smoke_PNG55196.png')`,
                    }}
                  />
                )}
                <AccordionTrigger className="relative p-6 text-4xl font-bold uppercase text-white hover:no-underline md:p-8 md:text-5xl [&>svg]:h-8 [&>svg]:w-8 [&>svg]:text-accent">
                  {brand.name}
                </AccordionTrigger>
                <AccordionContent className="relative bg-background/95 p-6 pt-0 backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-semibold text-primary">Tipos de Hits</h3>
                  <Accordion type="multiple" className="w-full space-y-2">
                    {brand.hits.map((hit) => (
                      <AccordionItem
                        value={`${brand.name}-${hit.type}`}
                        key={`${brand.name}-${hit.type}`}
                        className="rounded-lg border border-border/20 bg-foreground/5 data-[state=open]:bg-foreground/10"
                      >
                        <AccordionTrigger className="px-6 py-4 text-base font-medium text-foreground hover:no-underline">
                          {hit.type}
                        </AccordionTrigger>
                        <AccordionContent className="px-6">
                          <ul className="grid list-disc grid-cols-2 gap-x-8 gap-y-2 py-2 pl-6 md:grid-cols-3">
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
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
