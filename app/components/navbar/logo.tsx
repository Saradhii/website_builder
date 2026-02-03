import { Bailian } from '@lobehub/icons';

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Bailian.Color className="w-5 h-5 sm:w-7 sm:h-7" />
    <span className="font-bold text-sm sm:text-base tracking-tight text-foreground">
      BLDR
    </span>
  </div>
);
