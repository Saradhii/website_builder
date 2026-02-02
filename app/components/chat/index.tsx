"use client";

import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowUp, ChevronDown, Paperclip } from "lucide-react";
import {
  BookOpenText,
  Brain,
  Code,
  Lightbulb,
  Notepad,
  PaintBrush,
  Sparkle,
} from "@phosphor-icons/react";

// Model type definition
interface Model {
  id: string;
  name: string;
  provider: string;
}

// Dummy models data
const DUMMY_MODELS: Model[] = [
  { id: "gpt-4", name: "GPT-4.1 Nano", provider: "openai" },
  { id: "claude", name: "Claude 3.5 Sonnet", provider: "anthropic" },
];

// Suggestions data with icons from Zola
const SUGGESTIONS = [
  { id: "summary", label: "Summary", icon: Notepad },
  { id: "code", label: "Code", icon: Code },
  { id: "design", label: "Design", icon: PaintBrush },
  { id: "research", label: "Research", icon: BookOpenText },
  { id: "inspired", label: "Get Inspired", icon: Sparkle },
  { id: "deeply", label: "Think Deeply", icon: Brain },
  { id: "gently", label: "Learn Gently", icon: Lightbulb },
];

// Model Icon Component using LobeHub
function ModelIcon({ provider, className }: { provider: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    openai: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
    anthropic: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.304 3.541h-3.672l6.696 16.918h3.672zm-10.608 0L0 20.459h3.744l1.368-3.6h6.624l1.368 3.6h3.744L10.224 3.541zm-.264 10.656l1.944-5.184 1.944 5.184z" />
      </svg>
    ),
    google: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4z" />
      </svg>
    ),
  };

  return icons[provider] || null;
}

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputValue]);

  const selectedModelData = DUMMY_MODELS.find((m) => m.id === selectedModel);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
        What&apos;s on your mind?
      </h1>

      {/* Main Input Container - No border, just shadow */}
      <div className="w-full">
        <div
          className="border-input bg-background cursor-text rounded-3xl border p-2"
          onClick={() => textareaRef.current?.focus()}
        >
          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your website..."
            className="min-h-[44px] w-full resize-none border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-4 pt-3 pb-1"
            rows={1}
          />

          {/* Actions Row - Inside the container */}
          <div className="flex items-center justify-between mt-2 px-2 pb-1">
            {/* Left Actions */}
            <div className="flex items-center gap-2">
              {/* File Upload Button */}
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border border-input bg-background hover:bg-accent"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              {/* Model Selector */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 rounded-full border border-input bg-background px-3 gap-2 hover:bg-accent"
                  >
                    {selectedModelData && (
                      <ModelIcon
                        provider={selectedModelData.provider}
                        className="h-4 w-4"
                      />
                    )}
                    <span className="text-sm">{selectedModelData?.name}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="flex flex-col gap-1">
                    {DUMMY_MODELS.map((model) => (
                      <Button
                        key={model.id}
                        variant="ghost"
                        className={cn(
                          "justify-start gap-2 h-9",
                          selectedModel === model.id && "bg-accent"
                        )}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setIsPopoverOpen(false);
                        }}
                      >
                        <ModelIcon provider={model.provider} className="h-4 w-4" />
                        <span className="text-sm">{model.name}</span>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Right Action - Send Button */}
            <Button
              size="icon"
              disabled={!inputValue.trim()}
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggestion Pills - Horizontal scroll on mobile, wrapped on desktop (Zola style) */}
      <div 
        className="flex w-full max-w-full flex-nowrap justify-start gap-2 overflow-x-auto px-2 mt-6 md:mx-auto md:max-w-2xl md:flex-wrap md:justify-center md:pl-0"
        style={{ scrollbarWidth: "none" }}
      >
        {SUGGESTIONS.map((suggestion) => {
          const IconComponent = suggestion.icon;
          return (
            <Button
              key={suggestion.id}
              variant="outline"
              className="h-9 rounded-full border border-input bg-background px-4 hover:bg-accent text-sm gap-2 flex-shrink-0"
            >
              <IconComponent className="h-4 w-4" />
              {suggestion.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
