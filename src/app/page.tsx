import { Hero } from '@/components/hero';
import { FlavorRecommender } from '@/components/flavor-recommender';
import { ProductCatalog } from '@/components/product-catalog';
import { FloatingCTA } from '@/components/floating-cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center">
        <main className="w-full">
          <Hero />
          <FlavorRecommender />
          <ProductCatalog />
        </main>
        <Footer />
      </div>
      <FloatingCTA />
    </>
  );
}
