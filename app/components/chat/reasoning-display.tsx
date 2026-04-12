"use client";

import React, { useState, useRef, useEffect } from "react";
import { Collapsible } from "radix-ui";
import { motion, AnimatePresence } from "motion/react";
import { Brain, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReasoningDisplayProps {
  reasoning: string;
  isStreaming: boolean;
  className?: string;
}

function ThinkingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block size-1 rounded-full bg-muted-foreground/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export function ReasoningDisplay({
  reasoning,
  isStreaming,
  className,
}: ReasoningDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [reasoning, isStreaming]);

  if (!reasoning) return null;

  if (isStreaming) {
    return (
      <div
        className={cn(
          "mr-auto max-w-[95%] rounded-2xl border border-input/40 bg-muted/50 px-3.5 py-2.5 shadow-sm",
          className
        )}
      >
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="size-3.5" />
          </motion.div>
          <span>Thinking</span>
          <ThinkingDots />
        </div>
        <div
          ref={contentRef}
          className="mt-2 max-h-32 overflow-y-auto text-xs leading-5 text-muted-foreground/80 whitespace-pre-wrap"
        >
          {reasoning}
        </div>
      </div>
    );
  }

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "mr-auto max-w-[95%] rounded-2xl border border-input/40 bg-muted/30 shadow-sm overflow-hidden",
        className
      )}
    >
      <Collapsible.Trigger asChild>
        <button className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Brain className="size-3.5" />
          <span>Reasoning</span>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <ChevronRight className="size-3" />
          </motion.div>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-3.5 pb-2.5 max-h-48 overflow-y-auto text-xs leading-5 text-muted-foreground/80 whitespace-pre-wrap border-t border-input/30 pt-2">
                {reasoning}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
