"use client";

import RetroGrid from "@/components/magicui/retro-grid";
import SparklesText from "./magicui/sparkles-text";

export const RetroGridDemo = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden border bg-background p-20 md:shadow-xl">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
      <SparklesText text="generating..."></SparklesText>
      </span>
      <RetroGrid />
    </div>
  );
};
