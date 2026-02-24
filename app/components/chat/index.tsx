"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MonacoEditor } from "@/components/ui/monaco-editor";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/animate-ui/components/headless/dialog";
import { Checkbox } from "@/components/animate-ui/components/headless/checkbox";
import { useBuilderWorkspace } from "@/app/components/builder-workspace/context";
import { cn } from "@/lib/utils";
import {
  fetchModels,
  streamChat,
  type ModelInfo,
} from "@/lib/api-client";
import { deployWebsite } from "@/lib/deploy-client";
import {
  AlertTriangle,
  ArrowUp,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Eye,
  ExternalLink,
  Loader2,
  MessageSquare,
  Paperclip,
  Rocket,
  X,
} from "lucide-react";
import {
  Article,
  Briefcase,
  Envelope,
  FileText,
  Gift,
  Globe,
} from "@phosphor-icons/react";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

interface Suggestion {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type WorkspaceView = "preview" | "code";
type LeftPanelView = "chat" | "code";

const MOCK_CONVERSATION: ConversationMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Create a modern portfolio website for a software developer",
  },
  {
    id: "2",
    role: "assistant",
    content: "I've created a modern, dark-themed portfolio website with a hero section, about section, skills, projects showcase, and contact form. The design features a sleek gradient background and smooth animations.",
  },
  {
    id: "3",
    role: "user",
    content: "Add a testimonials section below the projects",
  },
  {
    id: "4",
    role: "assistant",
    content: "Done! I've added a testimonials section with client quotes, star ratings, and profile images. It blends seamlessly with the existing design.",
  },
];

const SUGGESTIONS: Suggestion[] = [
  {
    id: "invitation",
    label: "Invitation",
    icon: Envelope,
    prompt:
      "Create an elegant event invitation page with a hero title, date and time section, venue details, RSVP button, and a refined color palette.",
  },
  {
    id: "celebration",
    label: "Celebration",
    icon: Gift,
    prompt:
      "Design a festive celebration page with confetti-like accents, hero section, photo gallery, guest messages, and a share section.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: Briefcase,
    prompt:
      "Create a modern portfolio website for a software developer with strong hero copy, polished project cards, and clear contact details.",
  },
  {
    id: "resume",
    label: "Resume",
    icon: FileText,
    prompt:
      "Create a single-page professional resume with a clear hierarchy for summary, experience, education, and technical skills.",
  },
  {
    id: "blog",
    label: "Blog",
    icon: Article,
    prompt:
      "Build a clean blog landing page with featured article section, recent posts grid, author info block, and newsletter form.",
  },
  {
    id: "landing",
    label: "Landing Page",
    icon: Globe,
    prompt:
      "Create a product landing page with sticky header, hero CTA, feature cards, testimonials, pricing table, and closing CTA.",
  },
  {
    id: "agency",
    label: "Agency",
    icon: Globe,
    prompt:
      "Build a modern digital agency website with a bold hero section, services grid, case studies, client logos, team section, and contact CTA.",
  },
];

const WEBSITE_SYSTEM_INSTRUCTIONS =
  "You are a senior web builder assistant. Return exactly one complete HTML document with inline CSS (and inline JS only if needed). Do not include markdown explanations.";

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

function createConversationMessage(
  role: ConversationMessage["role"],
  content: string
): ConversationMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

function createWebsiteId() {
  const timestamp = Date.now().toString(36);
  const suffix = Math.random().toString(36).slice(2, 8);
  return `site-${timestamp}-${suffix}`;
}

function extractHtmlDocument(response: string): string | null {
  const fencedMatch = response.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const trimmed = response.trim();
  const lower = trimmed.toLowerCase();

  const doctypeIndex = lower.indexOf("<!doctype");
  if (doctypeIndex >= 0) {
    return trimmed.slice(doctypeIndex).trim();
  }

  const htmlIndex = lower.indexOf("<html");
  if (htmlIndex >= 0) {
    return trimmed.slice(htmlIndex).trim();
  }

  if (trimmed.startsWith("<") && trimmed.includes("</")) {
    return trimmed;
  }

  return null;
}

function injectIframePointerBridge(html: string): string {
  const pointerBridge = `
<style id="magicui-iframe-pointer-style">
  html[data-magicui-pointer="enabled"],
  html[data-magicui-pointer="enabled"] body,
  html[data-magicui-pointer="enabled"] body *,
  html[data-magicui-pointer="enabled"] body *::before,
  html[data-magicui-pointer="enabled"] body *::after {
    cursor: none !important;
  }
</style>
<script>
  (function () {
    var MOVE = "magicui:iframe-pointer-move";
    var LEAVE = "magicui:iframe-pointer-leave";
    var root = document.documentElement;
    root.setAttribute("data-magicui-pointer", "enabled");

    var post = function (payload) {
      try {
        window.parent.postMessage(payload, "*");
      } catch (_error) {}
    };
    var moveEvent = window.PointerEvent ? "pointermove" : "mousemove";
    var leaveEvent = window.PointerEvent ? "pointerleave" : "mouseleave";

    window.addEventListener(
      moveEvent,
      function (event) {
        post({ type: MOVE, x: event.clientX, y: event.clientY });
      },
      { passive: true }
    );

    window.addEventListener(
      leaveEvent,
      function () {
        post({ type: LEAVE });
      },
      { passive: true }
    );

    window.addEventListener("blur", function () {
      post({ type: LEAVE });
    });
  })();
</script>
`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${pointerBridge}</body>`);
  }

  if (/<\/html>/i.test(html)) {
    return html.replace(/<\/html>/i, `${pointerBridge}</html>`);
  }

  return `${html}${pointerBridge}`;
}

function buildWebsitePrompt(userPrompt: string, currentHtml?: string) {
  if (!currentHtml) {
    return `${WEBSITE_SYSTEM_INSTRUCTIONS}\n\nUser request:\n${userPrompt}`;
  }

  return `${WEBSITE_SYSTEM_INSTRUCTIONS}\n\nUpdate the existing website based on the user request.\n\nCurrent HTML:\n\`\`\`html\n${currentHtml}\n\`\`\`\n\nUser request:\n${userPrompt}`;
}

function formatRequestError(message: string) {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  if (
    trimmed === "429" ||
    lower.includes("429") ||
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    lower.includes("rate-limited")
  ) {
    return {
      title: "Traffic is high right now",
      description:
        "The model provider is temporarily rate-limited. We already tried available fallbacks, so please retry in 20-30 seconds.",
    };
  }

  if (lower.includes("temporarily unavailable") || lower.includes("provider")) {
    return {
      title: "Model service is temporarily unavailable",
      description:
        "Please retry shortly. If this keeps happening, switch models and try again.",
    };
  }

  if (lower.includes("network") || lower.includes("unable to reach")) {
    return {
      title: "Connection issue",
      description:
        "The app could not reach the AI service. Check your connection and try again.",
    };
  }

  return {
    title: "Request failed",
    description: trimmed || "Something went wrong while generating this response.",
  };
}

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
  const searchParams = useSearchParams();
  const isMockMode = searchParams.get('mock') === 'true';

  const {
    setHasWorkspace,
    setHasPreview,
    setDeployAction,
  } = useBuilderWorkspace();

  const [isMockReady, setIsMockReady] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [modelsStatus, setModelsStatus] = useState<"idle" | "loading" | "error">("idle");
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false);
  const [pendingModelSelection, setPendingModelSelection] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [websiteId] = useState(() => createWebsiteId());
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState("");
  const [deployError, setDeployError] = useState<string | null>(null);
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [isDeployLinkCopied, setIsDeployLinkCopied] = useState(false);
  const [leftPanelView, setLeftPanelView] = useState<LeftPanelView>("chat");
  const [workspaceView, setWorkspaceView] = useState<WorkspaceView>("code");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (isMockMode && !isMockReady) {
      setIsMockReady(true);
      setConversation(MOCK_CONVERSATION);
      setHasWorkspace(true);
    }
  }, [isMockMode, isMockReady, setHasWorkspace]);

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

  useEffect(() => {
    if (isModelDialogOpen) {
      setPendingModelSelection(selectedModel);
    }
  }, [isModelDialogOpen, selectedModel]);

  const selectedModelData = models.find((m: ModelInfo) => m.id === selectedModel);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("File type not supported. Please upload an image file.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File too large. Maximum size is 10MB.");
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFileUpload(e.dataTransfer.files);
    },
    [handleFileUpload]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
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
    },
    [handleFileUpload]
  );

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  const sendPrompt = useCallback(
    async (prompt: string) => {
      const trimmedPrompt = prompt.trim();
      if (!trimmedPrompt || !selectedModel || isStreaming) return;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const requestId = ++requestIdRef.current;

      setRequestError(null);
      setIsStreaming(true);
      setStreamingText("");
      setWorkspaceView("code");
      setConversation((prev) => [
        ...prev,
        createConversationMessage("user", trimmedPrompt),
      ]);

      let assistantOutput = "";

      try {
        await streamChat(
          {
            model: selectedModel,
            input: buildWebsitePrompt(trimmedPrompt, previewHtml),
            stream: true,
          },
          {
            onToken: (token) => {
              if (!token) return;
              if (requestIdRef.current !== requestId) return;
              assistantOutput += token;
              setStreamingText((prev) => prev + token);
            },
            onError: (message) => {
              if (requestIdRef.current !== requestId) return;
              setRequestError(message);
            },
          },
          controller.signal
        );

        if (requestIdRef.current !== requestId) return;

        const html = extractHtmlDocument(assistantOutput);
        if (html) {
          setPreviewHtml(html);
          setWorkspaceView("preview");
          setConversation((prev) => [
            ...prev,
            createConversationMessage(
              "assistant",
              "Applied changes to the live HTML/CSS preview. Describe next edits and I will update it."
            ),
          ]);
          return;
        }

        setConversation((prev) => [
          ...prev,
          createConversationMessage(
            "assistant",
            assistantOutput.trim() || "No response received from the model."
          ),
        ]);
      } catch (error) {
        if (controller.signal.aborted) return;
        if (requestIdRef.current !== requestId) return;
        setRequestError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        if (requestIdRef.current === requestId) {
          setIsStreaming(false);
          setStreamingText("");
        }
      }
    },
    [isStreaming, previewHtml, selectedModel]
  );

  const handleSubmit = useCallback(() => {
    const prompt = inputValue.trim();
    if (!prompt) return;
    setInputValue("");
    void sendPrompt(prompt);
  }, [inputValue, sendPrompt]);

  const handleApplyModelSelection = useCallback(() => {
    if (!pendingModelSelection) return;
    setSelectedModel(pendingModelSelection);
    setIsModelDialogOpen(false);
  }, [pendingModelSelection]);

  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      if (isStreaming) return;
      setInputValue(suggestion.prompt);
      textareaRef.current?.focus();
    },
    [isStreaming]
  );

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
  const hasPreview = Boolean(previewHtml);
  const hasStreamingText = Boolean(streamingText.trim());
  const previewFrameSrcDoc = hasPreview
    ? injectIframePointerBridge(previewHtml)
    : "";
  const renderGracefulState = ({
    title,
    description,
    pending = false,
  }: {
    title: string;
    description: string;
    pending?: boolean;
  }) => (
    <div className="h-full grid place-items-center px-5">
      <div className="max-w-sm rounded-xl border border-dashed border-input/70 bg-background/45 px-4 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          {pending && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
          <p className="text-sm font-medium text-foreground/90">{title}</p>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
  const renderCodeOutput = () => {
    if (isStreaming) {
      if (!hasStreamingText && !hasPreview) {
        return renderGracefulState({
          title: "Code is still generating",
          description: "Give it a moment. Fresh output will appear here automatically.",
          pending: true,
        });
      }

      return (
        <MonacoEditor
          value={extractHtmlDocument(streamingText) || streamingText || previewHtml}
          language="html"
          className="h-full"
          autoScroll
        />
      );
    }

    if (hasPreview) {
      return (
        <MonacoEditor
          value={previewHtml}
          onChange={setPreviewHtml}
          language="html"
          className="h-full"
        />
      );
    }

    return (
      renderGracefulState({
        title: "No code yet",
        description: "Start with a prompt to generate HTML and see code output.",
      })
    );
  };
  const hasWorkspace =
    hasPreview || conversation.length > 0 || isStreaming || Boolean(requestError);
  const requestErrorView = requestError ? formatRequestError(requestError) : null;
  const isInitialState =
    !isMockMode &&
    conversation.length === 0 &&
    !isStreaming &&
    !requestError &&
    !hasPreview;
  const showStarterSuggestions =
    !isMockMode &&
    !hasPreview &&
    conversation.length === 0 &&
    !isStreaming &&
    !requestError;
  const firstRowSuggestions = SUGGESTIONS.slice(0, 5);
  const secondRowSuggestions = SUGGESTIONS.slice(5);
  const handleDeployClick = useCallback(() => {
    if (!previewHtml || isDeploying) return;

    setIsDeploying(true);
    setDeployError(null);
    setIsDeployLinkCopied(false);

    const websiteName = "website";

    void deployWebsite({
      id: websiteId,
      html: previewHtml,
      name: websiteName,
    })
      .then((response) => {
        setDeployUrl(response.url);
        setIsDeployDialogOpen(true);
      })
      .catch((error) => {
        setDeployUrl("");
        setDeployError(
          error instanceof Error ? error.message : "Failed to deploy website."
        );
        setIsDeployDialogOpen(true);
      })
      .finally(() => {
        setIsDeploying(false);
      });
  }, [isDeploying, previewHtml, websiteId]);

  const handleCopyDeployLink = useCallback(() => {
    if (!deployUrl) return;

    const copyWithFallback = async () => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(deployUrl);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = deployUrl;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!copied) {
        throw new Error("Unable to copy link.");
      }
    };

    void copyWithFallback()
      .then(() => {
        setIsDeployLinkCopied(true);
      })
      .catch((error) => {
        setDeployError(
          error instanceof Error ? error.message : "Unable to copy deploy link."
        );
      });
  }, [deployUrl]);

  const handleOpenDeployedSite = useCallback(() => {
    if (!deployUrl) return;
    window.open(deployUrl, "_blank", "noopener,noreferrer");
  }, [deployUrl]);

  const handleCloseDeployDialog = useCallback(() => {
    setIsDeployDialogOpen(false);
  }, []);

  const handleOpenFullPreview = useCallback(() => {
    if (!previewHtml) return;

    const blob = new Blob([previewHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const previewWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (!previewWindow) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    }

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60_000);
  }, [previewHtml]);

  useEffect(() => {
    setHasWorkspace(hasWorkspace);
  }, [hasWorkspace, setHasWorkspace]);

  useEffect(() => {
    return () => {
      setHasWorkspace(false);
    };
  }, [setHasWorkspace]);

  useEffect(() => {
    setHasPreview(hasPreview);
  }, [hasPreview, setHasPreview]);

  useEffect(() => {
    return () => {
      setHasPreview(false);
    };
  }, [setHasPreview]);

  useEffect(() => {
    setDeployAction(hasPreview ? handleDeployClick : null);
  }, [hasPreview, handleDeployClick, setDeployAction]);

  useEffect(() => {
    return () => {
      setDeployAction(null);
    };
  }, [setDeployAction]);

  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [
    leftPanelView,
    conversation,
    isStreaming,
    streamingText,
    requestError,
  ]);

  useEffect(() => {
    if (!isDeployLinkCopied) return;
    const timeoutId = window.setTimeout(() => {
      setIsDeployLinkCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isDeployLinkCopied]);

  const renderInputSection = () => (
    <div className="pointer-events-auto w-full max-w-3xl">
      <div
        ref={containerRef}
        className={cn(
          "border-input bg-background/90 cursor-text rounded-3xl border p-2 sm:p-3 transition-colors",
          isDragging && "border-primary bg-primary/5"
        )}
        onClick={() => textareaRef.current?.focus()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2 px-3 sm:px-4">
            {uploadedImages.map((image) => (
              <div
                key={image.id}
                className="relative group w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-input"
              >
                <Image
                  src={image.preview}
                  alt="Preview"
                  fill
                  unoptimized
                  className="object-cover"
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

        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder={isDragging ? "Drop images here..." : "Describe your website or ask for a modification..."}
          className="min-h-[44px] w-full resize-none border-0 bg-transparent text-sm sm:text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none px-3 sm:px-4 pt-2 sm:pt-3 pb-1"
          rows={1}
        />

        <div className="flex items-center justify-between mt-2 px-1 sm:px-2 pb-1">
          <div className="flex items-center gap-1 sm:gap-2">
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

            <Button
              variant="outline"
              onClick={() => setIsModelDialogOpen(true)}
              className="h-8 sm:h-9 rounded-full border border-input bg-background px-2 sm:px-3 gap-1.5 sm:gap-2 hover:bg-accent"
            >
              {selectedModelData && (
                <ModelIcon
                  provider={selectedModelData.provider}
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                />
              )}
              <span className="text-xs sm:text-sm truncate max-w-[110px] sm:max-w-none">
                {selectedModelData?.name ??
                  (modelsStatus === "loading"
                    ? "Loading models..."
                    : "Select a model")}
              </span>
              <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
            </Button>
            <Dialog open={isModelDialogOpen} onClose={setIsModelDialogOpen}>
              <DialogPanel from="bottom" className="p-0 sm:max-w-md">
                <DialogHeader className="px-4 pt-4 pb-2">
                  <DialogTitle className="text-sm">Select model</DialogTitle>
                  <DialogDescription className="text-xs">
                    Choose one model for website generation.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto p-3">
                  {modelsStatus === "loading" && (
                    <span className="block px-2 py-1 text-xs text-muted-foreground">
                      Loading models...
                    </span>
                  )}
                  {modelsStatus === "error" && (
                    <span className="block px-2 py-1 text-xs text-destructive">
                      {modelsError ?? "Failed to load models."}
                    </span>
                  )}
                  {modelsStatus !== "loading" &&
                    models.length === 0 &&
                    modelsStatus !== "error" && (
                      <span className="block px-2 py-1 text-xs text-muted-foreground">
                        No models available.
                      </span>
                    )}
                  <div className="flex flex-col gap-1.5">
                    {models.map((model: ModelInfo) => {
                      const isSelected = pendingModelSelection === model.id;
                      return (
                        <div
                          key={model.id}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSelected}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left transition-colors",
                            isSelected
                              ? "border-primary/30 bg-accent"
                              : "border-transparent hover:bg-accent/60"
                          )}
                          onClick={() => setPendingModelSelection(model.id)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setPendingModelSelection(model.id);
                            }
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={(checked) => {
                              if (Boolean(checked)) {
                                setPendingModelSelection(model.id);
                              }
                            }}
                            variant="accent"
                            size="sm"
                            className="pointer-events-none"
                            tabIndex={-1}
                            aria-hidden="true"
                          />
                          <ModelIcon provider={model.provider} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">{model.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DialogFooter className="border-t border-input px-3 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-md text-xs"
                    onClick={() => setIsModelDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 rounded-md text-xs"
                    onClick={handleApplyModelSelection}
                    disabled={!pendingModelSelection}
                  >
                    Apply Selection
                  </Button>
                </DialogFooter>
              </DialogPanel>
            </Dialog>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {inputValue.trim() && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setInputValue("")}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-input bg-background hover:bg-accent"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            )}
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

      {showStarterSuggestions && (
        <div className="w-full mt-3 px-2 md:px-0">
          <div className="flex flex-wrap justify-center gap-2 md:flex-nowrap">
            {firstRowSuggestions.map((suggestion) => {
              const IconComponent = suggestion.icon;
              return (
                <Button
                  key={suggestion.id}
                  variant="outline"
                  className="h-8 sm:h-9 rounded-full border border-input bg-background px-3 sm:px-4 hover:bg-accent text-xs sm:text-sm gap-1.5 sm:gap-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">{suggestion.label}</span>
                </Button>
              );
            })}
          </div>
          {secondRowSuggestions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {secondRowSuggestions.map((suggestion) => {
                const IconComponent = suggestion.icon;
                return (
                  <Button
                    key={suggestion.id}
                    variant="outline"
                    className="h-8 sm:h-9 rounded-full border border-input bg-background px-3 sm:px-4 hover:bg-accent text-xs sm:text-sm gap-1.5 sm:gap-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="whitespace-nowrap">{suggestion.label}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isInitialState) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center px-3 sm:px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Build what&apos;s on your mind
        </h1>
        {renderInputSection()}
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 h-full w-full p-4">
        <div className="w-1/2 flex flex-col rounded-2xl border border-input bg-background/90 overflow-hidden">
          <Tabs
            value={leftPanelView}
            onValueChange={(value) => setLeftPanelView(value as LeftPanelView)}
            className="flex-1 min-h-0 gap-0"
          >
            <div className="flex-shrink-0 border-b border-input p-4">
              <TabsList className="h-8 rounded-lg bg-muted/80 p-0.5">
                <TabsTrigger
                  value="chat"
                  className="h-full rounded-md px-2.5 text-xs font-semibold"
                >
                  <MessageSquare className="size-3.5" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-full rounded-md px-2.5 text-xs font-semibold"
                >
                  <Code2 className="size-3.5" />
                  Code
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContents mode="layout" className="flex-1 min-h-0">
              <TabsContent value="chat" className="h-full">
                <div
                  ref={chatScrollRef}
                  className="h-full overflow-y-auto p-4 space-y-3"
                >
                  {conversation.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "relative max-w-[95%] rounded-3xl px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap shadow-sm",
                        message.role === "user"
                          ? "ml-auto bg-primary text-primary-foreground rounded-br-md"
                          : "mr-auto bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {message.content}
                    </div>
                  ))}

                  {isStreaming && (
                    <div className="relative max-w-[95%] rounded-3xl rounded-bl-md px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap mr-auto bg-muted text-foreground shadow-sm">
                      Generating website...
                    </div>
                  )}

                  {requestErrorView && (
                    <div className="mr-auto max-w-[95%] rounded-2xl border border-destructive/25 bg-destructive/5 px-3.5 py-3 shadow-sm">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span>{requestErrorView.title}</span>
                      </div>
                      <p className="mt-1 pl-6 text-xs leading-5 text-muted-foreground">
                        {requestErrorView.description}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="code" className="h-full p-4">
                {renderCodeOutput()}
              </TabsContent>
            </TabsContents>
          </Tabs>
          <div className="p-3 border-t border-input">
            {renderInputSection()}
          </div>
        </div>

        <div className="w-1/2 rounded-2xl border border-input bg-background/90 overflow-hidden p-4">
          <Tabs
            value={workspaceView}
            onValueChange={(value) => setWorkspaceView(value as WorkspaceView)}
            className="h-full gap-4"
          >
            <div className="flex-shrink-0 border-b border-input pb-4 flex items-center justify-between gap-2">
              <TabsList className="h-8 rounded-lg bg-muted/80 p-0.5">
                <TabsTrigger
                  value="preview"
                  className="h-full rounded-md px-2.5 text-xs font-semibold"
                >
                  <Eye className="size-3.5" />
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-full rounded-md px-2.5 text-xs font-semibold"
                >
                  <Code2 className="size-3.5" />
                  Code
                </TabsTrigger>
              </TabsList>
              {hasPreview && (
                <div className="flex items-center gap-2">
                  <span className="hidden lg:inline-flex rounded-md border border-input bg-muted/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    {websiteId}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeployClick}
                    disabled={isDeploying}
                    className="h-8 rounded-md text-xs"
                  >
                    {isDeploying ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Rocket className="size-3.5" />
                    )}
                    {isDeploying ? "Deploying..." : "Deploy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenFullPreview}
                    className="h-8 rounded-md text-xs"
                  >
                    <ExternalLink className="size-3.5" />
                    Full Preview
                  </Button>
                </div>
              )}
            </div>

            <TabsContents mode="layout" className="flex-1 min-h-0">
              <TabsContent value="preview" className="h-full">
                {isStreaming ? (
                  renderGracefulState({
                    title: "Preview will appear here",
                    description: "Generation is in progress. You can follow code updates while we finish.",
                    pending: true,
                  })
                ) : hasPreview ? (
                  <iframe
                    title="Website preview"
                    srcDoc={previewFrameSrcDoc}
                    className="h-full w-full rounded-xl border border-input bg-white cursor-none"
                    sandbox="allow-scripts allow-forms allow-modals allow-popups"
                  />
                ) : (
                  renderGracefulState({
                    title: "No preview yet",
                    description: "Generate a website first, then preview will appear here.",
                  })
                )}
              </TabsContent>

              <TabsContent value="code" className="h-full">
                {renderCodeOutput()}
              </TabsContent>
            </TabsContents>
          </Tabs>
        </div>
      </div>

      {isDeployDialogOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/75 backdrop-blur-sm p-4"
          onClick={handleCloseDeployDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-2xl border border-input bg-background p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {deployError ? "Deploy failed" : "Website deployed"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {deployError ? "Unable to publish this version." : `Website ID: ${websiteId}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCloseDeployDialog}
                className="rounded-full"
              >
                <X className="size-4" />
              </Button>
            </div>

            {deployError ? (
              <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {deployError}
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-muted-foreground">
                  Share this URL with anyone to open your deployed website. It may take a few seconds to become globally available.
                </p>
                <div className="rounded-lg border border-input bg-muted/30 px-3 py-2 font-mono text-xs break-all">
                  {deployUrl}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyDeployLink}
                    className="h-8 rounded-md text-xs"
                  >
                    {isDeployLinkCopied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    {isDeployLinkCopied ? "Copied" : "Copy URL"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleOpenDeployedSite}
                    className="h-8 rounded-md text-xs"
                  >
                    <ExternalLink className="size-3.5" />
                    Open Site
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
