"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/animate-ui/components/radix/switch";
import { useTheme } from "@/app/components/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Label className="flex items-center gap-x-3 cursor-pointer">
        <Switch checked={false} />
      </Label>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <Label className="flex items-center gap-x-3 cursor-pointer">
      <Switch checked={isDark} onCheckedChange={handleToggle} />
    </Label>
  );
}
