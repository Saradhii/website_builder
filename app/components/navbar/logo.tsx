import Image from "next/image";

export const Logo = () => (
  <div className="flex items-center gap-3">
    <Image
      src="/logo.png"
      alt="Website Builder"
      width={124}
      height={32}
      priority
      className="h-8 w-auto"
    />
    <span className="font-bold text-lg tracking-tight text-foreground">
      WEBSITE BUILDER
    </span>
  </div>
);
