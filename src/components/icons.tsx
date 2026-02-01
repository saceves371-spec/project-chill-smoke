import { Flame } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Flame className="h-8 w-8 text-primary" />
      <span className="font-headline text-3xl font-bold tracking-wide text-primary-foreground">
        Chill Smoke
      </span>
    </div>
  );
}
