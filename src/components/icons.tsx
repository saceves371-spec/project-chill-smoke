import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Logo() {
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  return (
    <div className="flex items-center justify-center">
      {logoImage && (
        <Image
          src={logoImage.imageUrl}
          alt={logoImage.description}
          width={300}
          height={232}
          data-ai-hint={logoImage.imageHint}
        />
      )}
    </div>
  );
}
