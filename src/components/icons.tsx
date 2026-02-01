import { Flame } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Flame className="h-12 w-12 text-red-500 drop-shadow-[0px_0px_5px_#ef4444]" />
      <span className="font-logo text-6xl text-red-500 [text-shadow:0px_0px_7px_#ef4444]">
        Chill Smoke
      </span>
    </div>
  );
}
