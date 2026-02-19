"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { useTheme } from "@/app/components/theme-provider";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { Orbit } from "@/components/animate-ui/icons/orbit";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <AnimateIcon animateOnHover asChild>
        <Label className="flex items-center gap-x-2 cursor-pointer">
          <Orbit size={16} className="text-muted-foreground" />
          <Switch checked={false} />
        </Label>
      </AnimateIcon>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <AnimateIcon animateOnHover asChild>
      <Label className="flex items-center gap-x-2 cursor-pointer">
        <Orbit size={16} className="text-muted-foreground" />
        <Switch checked={isDark} onCheckedChange={handleToggle} />
      </Label>
    </AnimateIcon>
  );
}
