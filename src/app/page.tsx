import { Hero } from '@/components/hero';
import { FlavorRecommender } from '@/components/flavor-recommender';
import { ProductCatalog } from '@/components/product-catalog';
import { FloatingCTA } from '@/components/floating-cta';
import { Footer } from '@/components/footer';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-background">
        <main className="w-full">
          <Hero />
          <FlavorRecommender />
          <div className="container my-8 max-w-4xl">
            <Separator className="bg-border/20" />
          </div>
          <ProductCatalog />
        </main>
        <Footer />
      </div>
      <FloatingCTA />
    </>
  );
}
