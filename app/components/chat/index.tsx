"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { fetchModels, streamChat, type ModelInfo } from "@/lib/api-client";
import { ArrowUp, ChevronDown, Paperclip, X } from "lucide-react";
import {
  BookOpenText,
  Brain,
  Code,
  Lightbulb,
  Notepad,
  PaintBrush,
  Sparkle,
} from "@phosphor-icons/react";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

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

// Accepted image MIME types
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
];

// Max file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Model Icon Component using inline SVGs from Lobehub
function ModelIcon({ provider, className }: { provider: string; className?: string }) {
  switch (provider) {
    case "openai":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
        </svg>
      );
    case "zai":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.105 2L9.927 4.953H.653L2.83 2h9.276zM23.254 19.048L21.078 22h-9.242l2.174-2.952h9.244zM24 2L9.264 22H0L14.736 2H24z" />
        </svg>
      );
    case "gemma":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gemma-gradient" x1="24.419%" x2="75.194%" y1="75.581%" y2="25.194%">
              <stop offset="0%" stopColor="#446EFF" />
              <stop offset="36.661%" stopColor="#2E96FF" />
              <stop offset="83.221%" stopColor="#B1C5FF" />
            </linearGradient>
          </defs>
          <path fill="url(#gemma-gradient)" fillRule="evenodd" clipRule="evenodd" d="M12.34 5.953a8.233 8.233 0 01-.247-1.125V3.72a8.25 8.25 0 015.562 2.232H12.34zm-.69 0c.113-.373.199-.755.257-1.145V3.72a8.25 8.25 0 00-5.562 2.232h5.304zm-5.433.187h5.373a7.98 7.98 0 01-.267.696 8.41 8.41 0 01-1.76 2.65L6.216 6.14zm-.264-.187H2.977v.187h2.915a8.436 8.436 0 00-2.357 5.767H0v.186h3.535a8.436 8.436 0 002.357 5.767H2.977v.186h2.976v2.977h.187v-2.915a8.436 8.436 0 005.767 2.357V24h.186v-3.535a8.436 8.436 0 005.767-2.357v2.915h.186v-2.977h2.977v-.186h-2.915a8.436 8.436 0 002.357-5.767H24v-.186h-3.535a8.436 8.436 0 00-2.357-5.767h2.915v-.187h-2.977V2.977h-.186v2.915a8.436 8.436 0 00-5.767-2.357V0h-.186v3.535A8.436 8.436 0 006.14 5.892V2.977h-.187v2.976zm6.14 14.326a8.25 8.25 0 005.562-2.233H12.34c-.108.367-.19.743-.247 1.126v1.107zm-.186-1.087a8.015 8.015 0 00-.258-1.146H6.345a8.25 8.25 0 005.562 2.233v-1.087zm-8.186-7.285h1.107a8.23 8.23 0 001.125-.247V6.345a8.25 8.25 0 00-2.232 5.562zm1.087.186H3.72a8.25 8.25 0 002.232 5.562v-5.304a8.012 8.012 0 00-1.145-.258zm15.47-.186a8.25 8.25 0 00-2.232-5.562v5.315c.367.108.743.19 1.126.247h1.107zm-1.086.186c-.39.058-.772.144-1.146.258v5.304a8.25 8.25 0 002.233-5.562h-1.087zm-1.332 5.69V12.41a7.97 7.97 0 00-.696.267 8.409 8.409 0 00-2.65 1.76l3.346 3.346zm0-6.18v-5.45l-.012-.013h-5.451c.076.235.162.468.26.696a8.698 8.698 0 001.819 2.688 8.698 8.698 0 002.688 1.82c.228.097.46.183.696.259zM6.14 17.848V12.41c.235.078.468.167.696.267a8.403 8.403 0 012.688 1.799 8.404 8.404 0 011.799 2.688c.1.228.19.46.267.696H6.152l-.012-.012zm0-6.245V6.326l3.29 3.29a8.716 8.716 0 01-2.594 1.728 8.14 8.14 0 01-.696.259zm6.257 6.257h5.277l-3.29-3.29a8.716 8.716 0 00-1.728 2.594 8.135 8.135 0 00-.259.696zm-2.347-7.81a9.435 9.435 0 01-2.88 1.96 9.14 9.14 0 012.88 1.94 9.14 9.14 0 011.94 2.88 9.435 9.435 0 011.96-2.88 9.14 9.14 0 012.88-1.94 9.435 9.435 0 01-2.88-1.96 9.434 9.434 0 01-1.96-2.88 9.14 9.14 0 01-1.94 2.88z" />
        </svg>
      );
    default:
      return null;
  }
}

export function ChatInterface() {
  const [inputValue, setInputValue] = useState("");
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [modelsStatus, setModelsStatus] = useState<"idle" | "loading" | "error">("idle");
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

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

  // Cleanup image previews on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [uploadedImages]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setModelsStatus("loading");
    setModelsError(null);

    fetchModels(controller.signal)
      .then((data) => {
        if (!active) return;
        setModels(data);
        setSelectedModel((prev) => {
          if (prev && data.some((model) => model.id === prev)) return prev;
          return data[0]?.id ?? "";
        });
        setModelsStatus("idle");
      })
      .catch((error) => {
        if (!active || controller.signal.aborted) return;
        setModelsStatus("error");
        setModelsError(
          error instanceof Error ? error.message : "Failed to load models."
        );
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const selectedModelData = models.find((m: ModelInfo) => m.id === selectedModel);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert(`File type not supported. Please upload an image file.`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`File too large. Maximum size is 10MB.`);
      return false;
    }
    return true;
  };

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        const preview = URL.createObjectURL(file);
        newImages.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview,
        });
      }
    });

    if (newImages.length > 0) {
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const imageFiles: File[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) imageFiles.push(file);
      }
    }

    if (imageFiles.length > 0) {
      const dataTransfer = new DataTransfer();
      imageFiles.forEach((file) => dataTransfer.items.add(file));
      handleFileUpload(dataTransfer.files);
    }
  }, [handleFileUpload]);

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = useCallback(async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || !selectedModel || isStreaming) return;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const requestId = ++requestIdRef.current;

    setHasSubmitted(true);
    setIsStreaming(true);
    setRequestError(null);
    setResponseText("");
    setInputValue("");

    try {
      await streamChat(
        {
          model: selectedModel,
          input: trimmedInput,
          stream: true,
        },
        {
          onToken: (token) => {
            if (!token) return;
            if (requestIdRef.current !== requestId) return;
            setResponseText((prev) => prev + token);
          },
          onError: (message) => {
            if (requestIdRef.current !== requestId) return;
            setRequestError(message);
          },
        },
        controller.signal
      );
    } catch (error) {
      if (controller.signal.aborted) return;
      if (requestIdRef.current !== requestId) return;
      setRequestError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      if (requestIdRef.current === requestId) {
        setIsStreaming(false);
      }
    }
  }, [inputValue, isStreaming, selectedModel]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const canSubmit = Boolean(inputValue.trim()) && Boolean(selectedModel) && !isStreaming;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-4 sm:px-6">
      {/* Heading - Responsive sizing */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6 sm:mb-8">
        What&apos;s on your mind?
      </h1>

      {/* Main Input Container */}
      <div className="w-full">
        <div
          ref={containerRef}
          className={cn(
            "border-input bg-background cursor-text rounded-3xl border p-2 sm:p-3 transition-colors",
            isDragging && "border-primary bg-primary/5"
          )}
          onClick={() => textareaRef.current?.focus()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 px-3 sm:px-4">
              {uploadedImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-input"
                >
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-background/90 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            placeholder={isDragging ? "Drop images here..." : "Describe your website..."}
            className="min-h-[44px] w-full resize-none border-0 bg-transparent text-sm sm:text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-3 sm:px-4 pt-2 sm:pt-3 pb-1"
            rows={1}
          />

          {/* Actions Row - Inside the container */}
          <div className="flex items-center justify-between mt-2 px-1 sm:px-2 pb-1">
            {/* Left Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* File Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handlePaperclipClick}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-input bg-background hover:bg-accent"
              >
                <Paperclip className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>

              {/* Model Selector */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 sm:h-9 rounded-full border border-input bg-background px-2 sm:px-3 gap-1.5 sm:gap-2 hover:bg-accent"
                  >
                    {selectedModelData && (
                      <ModelIcon
                        provider={selectedModelData.provider}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      />
                    )}
                    <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
                      {selectedModelData?.name ??
                        (modelsStatus === "loading"
                          ? "Loading models..."
                          : "Select a model")}
                    </span>
                    <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 sm:w-56 p-2" align="start">
                  <div className="flex flex-col gap-1">
                    {modelsStatus === "loading" && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        Loading models...
                      </span>
                    )}
                    {modelsStatus === "error" && (
                      <span className="px-2 py-1 text-xs text-destructive">
                        {modelsError ?? "Failed to load models."}
                      </span>
                    )}
                    {modelsStatus !== "loading" && models.length === 0 && modelsStatus !== "error" && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        No models available.
                      </span>
                    )}
                    {models.map((model: ModelInfo) => (
                      <Button
                        key={model.id}
                        variant="ghost"
                        className={cn(
                          "justify-start gap-2 h-8 sm:h-9",
                          selectedModel === model.id && "bg-accent"
                        )}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setIsPopoverOpen(false);
                        }}
                      >
                        <ModelIcon provider={model.provider} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{model.name}</span>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Right Action - Send Button */}
            <Button
              size="icon"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>

      {hasSubmitted && (
        <div className="w-full mt-4 rounded-2xl border border-input bg-background/80 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Response
            </span>
            {isStreaming && (
              <span className="text-xs text-muted-foreground">Streaming...</span>
            )}
          </div>
          {requestError ? (
            <p className="text-sm text-destructive">{requestError}</p>
          ) : responseText ? (
            <p className="whitespace-pre-wrap text-sm sm:text-base text-foreground">
              {responseText}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isStreaming ? "Thinking..." : "No response yet."}
            </p>
          )}
        </div>
      )}

      {/* Suggestion Pills - Horizontal scroll on mobile, wrapped on desktop (Zola style) */}
      <div 
        className="flex w-full max-w-full flex-nowrap justify-start gap-2 overflow-x-auto px-2 mt-4 sm:mt-6 md:mx-auto md:max-w-2xl md:flex-wrap md:justify-center md:pl-0"
        style={{ scrollbarWidth: "none" }}
      >
        {SUGGESTIONS.map((suggestion) => {
          const IconComponent = suggestion.icon;
          return (
            <Button
              key={suggestion.id}
              variant="outline"
              className="h-8 sm:h-9 rounded-full border border-input bg-background px-3 sm:px-4 hover:bg-accent text-xs sm:text-sm gap-1.5 sm:gap-2 flex-shrink-0"
            >
              <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">{suggestion.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
