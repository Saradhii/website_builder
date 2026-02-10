"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  fetchModels,
  streamChat,
  type ModelInfo,
} from "@/lib/api-client";
import { ArrowUp, ChevronDown, ExternalLink, Paperclip, X } from "lucide-react";
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
  templateHtml?: string;
}

interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const PORTFOLIO_TEMPLATE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Alex Carter - Portfolio</title>
  <style>
    :root {
      --bg: #0f172a;
      --surface: #111827;
      --card: #1f2937;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --accent: #22d3ee;
      --accent-2: #38bdf8;
      --border: #334155;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background: radial-gradient(circle at 20% 0%, #1e293b, var(--bg) 45%);
      color: var(--text);
      line-height: 1.5;
    }

    .container {
      width: min(1100px, 92%);
      margin: 0 auto;
    }

    header {
      padding: 1.25rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      position: sticky;
      top: 0;
      backdrop-filter: blur(8px);
      background: rgba(15, 23, 42, 0.7);
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      font-weight: 700;
      letter-spacing: 0.04em;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      font-size: 0.95rem;
    }

    .nav-links a {
      color: var(--muted);
      text-decoration: none;
    }

    .hero {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 2rem;
      padding: 5rem 0 3rem;
      align-items: center;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3.3rem);
      line-height: 1.1;
    }

    .hero p {
      color: var(--muted);
      margin-top: 1rem;
      font-size: 1.05rem;
    }

    .cta-row {
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .btn {
      border: 1px solid transparent;
      padding: 0.7rem 1rem;
      border-radius: 999px;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
    }

    .btn.primary {
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      color: #00131a;
    }

    .btn.ghost {
      border-color: var(--border);
      color: var(--text);
    }

    .hero-card {
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 1.25rem;
      background: linear-gradient(180deg, rgba(56, 189, 248, 0.08), rgba(15, 23, 42, 0.4));
    }

    section {
      padding: 1.8rem 0;
    }

    .section-title {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    .projects {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }

    .project {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.85rem;
      padding: 1rem;
    }

    .project h3 {
      margin: 0;
      font-size: 1rem;
    }

    .project p {
      margin: 0.65rem 0 0;
      color: var(--muted);
      font-size: 0.9rem;
    }

    .skills {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .skill {
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 0.35rem 0.8rem;
      color: var(--muted);
      font-size: 0.86rem;
    }

    .contact {
      border: 1px solid var(--border);
      border-radius: 0.9rem;
      padding: 1rem;
      background: rgba(17, 24, 39, 0.7);
    }

    .contact p {
      margin: 0;
      color: var(--muted);
    }

    footer {
      padding: 2rem 0 3rem;
      color: var(--muted);
      font-size: 0.9rem;
      text-align: center;
    }

    @media (max-width: 920px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .projects {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .projects {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <div class="brand">Alex Carter</div>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" id="about">
      <div>
        <h1>Frontend Engineer Building Fast, Elegant Web Experiences</h1>
        <p>
          I design and build modern digital products with a strong focus on usability,
          accessibility, and performance.
        </p>
        <div class="cta-row">
          <a class="btn primary" href="#projects">View Projects</a>
          <a class="btn ghost" href="#contact">Contact Me</a>
        </div>
      </div>
      <div class="hero-card">
        <strong>Currently:</strong>
        <p>Creating interactive web apps and AI-assisted product prototypes for startups.</p>
        <div class="skills">
          <span class="skill">React</span>
          <span class="skill">TypeScript</span>
          <span class="skill">Next.js</span>
          <span class="skill">UI Engineering</span>
        </div>
      </div>
    </section>

    <section id="projects">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects">
        <article class="project">
          <h3>Website Builder AI</h3>
          <p>Prompt-based website generation tool with live preview and instant editing loop.</p>
        </article>
        <article class="project">
          <h3>Analytics Dashboard</h3>
          <p>Data-heavy admin dashboard with interactive charts and role-based access.</p>
        </article>
        <article class="project">
          <h3>Design System Kit</h3>
          <p>Reusable component library with tokens, accessibility checks, and docs site.</p>
        </article>
      </div>
    </section>

    <section id="contact" class="contact">
      <h2 class="section-title">Let's Work Together</h2>
      <p>Email: hello@alexcarter.dev</p>
      <p>LinkedIn: linkedin.com/in/alexcarter</p>
    </section>
  </main>

  <footer>
    © 2026 Alex Carter. Built with HTML and CSS.
  </footer>
</body>
</html>`;

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
    label: "Portfolio Template",
    icon: Briefcase,
    templateHtml: PORTFOLIO_TEMPLATE_HTML,
    prompt:
      "Use the starter portfolio template and upgrade it with a stronger hero section, better project cards, and improved typography while keeping it single-file HTML and CSS.",
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

function buildWebsitePrompt(userPrompt: string, currentHtml?: string) {
  if (!currentHtml) {
    return `${WEBSITE_SYSTEM_INSTRUCTIONS}\n\nUser request:\n${userPrompt}`;
  }

  return `${WEBSITE_SYSTEM_INSTRUCTIONS}\n\nUpdate the existing website based on the user request.\n\nCurrent HTML:\n\`\`\`html\n${currentHtml}\n\`\`\`\n\nUser request:\n${userPrompt}`;
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
  const [inputValue, setInputValue] = useState("");
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [modelsStatus, setModelsStatus] = useState<"idle" | "loading" | "error">("idle");
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewExternalUrl, setPreviewExternalUrl] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [showTopBlur, setShowTopBlur] = useState(false);
  const [showBottomBlur, setShowBottomBlur] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
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
    async (prompt: string, starterHtml?: string, templateName?: string) => {
      const trimmedPrompt = prompt.trim();
      if (!trimmedPrompt || !selectedModel || isStreaming) return;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const requestId = ++requestIdRef.current;

      const currentHtml = starterHtml ?? previewHtml;
      if (starterHtml) {
        setPreviewHtml(starterHtml);
        setActiveTemplate(templateName ?? "Template");
      }

      setRequestError(null);
      setIsStreaming(true);
      setStreamingText("");
      setConversation((prev) => [
        ...prev,
        createConversationMessage("user", trimmedPrompt),
      ]);

      let assistantOutput = "";

      try {
        await streamChat(
          {
            model: selectedModel,
            input: buildWebsitePrompt(trimmedPrompt, currentHtml),
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

  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      if (isStreaming) return;

      if (suggestion.templateHtml) {
        void sendPrompt(suggestion.prompt, suggestion.templateHtml, suggestion.label);
        return;
      }

      setInputValue(suggestion.prompt);
      textareaRef.current?.focus();
    },
    [isStreaming, sendPrompt]
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
  const showWorkspace =
    Boolean(previewHtml) || conversation.length > 0 || isStreaming || Boolean(requestError);
  const firstRowSuggestions = SUGGESTIONS.slice(0, 5);
  const secondRowSuggestions = SUGGESTIONS.slice(5);
  const updateChatScrollState = useCallback(() => {
    const container = chatScrollRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const canScroll = scrollHeight > clientHeight + 1;

    if (!canScroll) {
      setShowTopBlur(false);
      setShowBottomBlur(false);
      return;
    }

    setShowTopBlur(scrollTop > 6);
    setShowBottomBlur(scrollTop + clientHeight < scrollHeight - 6);
  }, []);

  useEffect(() => {
    const container = chatScrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
    updateChatScrollState();
  }, [conversation, isStreaming, streamingText, requestError, updateChatScrollState]);

  useEffect(() => {
    if (!previewHtml) {
      setPreviewExternalUrl(null);
      return;
    }

    const blob = new Blob([previewHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setPreviewExternalUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [previewHtml]);

  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 py-6",
        showWorkspace ? "self-start pt-8 sm:pt-10" : "self-center"
      )}
    >
      {!showWorkspace && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-6 sm:mb-8">
          Build what&apos;s on your mind.
        </h1>
      )}

      {showWorkspace && (
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-2xl border border-input bg-background/90 overflow-hidden">
            <div className="flex items-center justify-between border-b border-input px-4 py-2">
              <span className="text-sm font-medium">Live Website Preview</span>
              <div className="flex items-center gap-2">
                {activeTemplate && (
                  <span className="text-xs text-muted-foreground">{activeTemplate}</span>
                )}
                {previewExternalUrl && (
                  <Button asChild variant="outline" size="xs" className="h-6">
                    <a
                      href={previewExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in New Tab
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            {previewHtml ? (
              <iframe
                title="Website preview"
                srcDoc={previewHtml}
                className="w-full h-[430px] bg-white"
                sandbox="allow-scripts allow-forms"
              />
            ) : (
              <div className="h-[430px] grid place-items-center text-sm text-muted-foreground">
                Preview will appear after generation.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-input bg-background/90 overflow-hidden">
            <div className="flex items-center justify-between border-b border-input px-4 py-2">
              <span className="text-sm font-medium">Builder Chat</span>
              {isStreaming && (
                <span className="text-xs text-muted-foreground">Streaming...</span>
              )}
            </div>
            <div className="relative h-[430px]">
              <div
                ref={chatScrollRef}
                onScroll={updateChatScrollState}
                className="h-full overflow-y-auto p-3 space-y-3"
              >
                {conversation.length === 0 && !isStreaming && !requestError && (
                  <p className="text-sm text-muted-foreground">
                    Pick a suggestion or describe your website to start building.
                  </p>
                )}

                {conversation.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "max-w-[95%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap",
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "mr-auto bg-muted text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                ))}

                {isStreaming && (
                  <div className="max-w-[95%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap mr-auto bg-muted text-foreground">
                    {streamingText || "Generating website..."}
                  </div>
                )}

                {requestError && (
                  <div className="max-w-[95%] rounded-xl px-3 py-2 text-sm mr-auto bg-destructive/10 text-destructive border border-destructive/30">
                    {requestError}
                  </div>
                )}
              </div>
              {showTopBlur && (
                <ProgressiveBlur position="top" height="18%" />
              )}
              {showBottomBlur && (
                <ProgressiveBlur position="bottom" height="18%" />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto">
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
                    <span className="text-xs sm:text-sm truncate max-w-[110px] sm:max-w-none">
                      {selectedModelData?.name ??
                        (modelsStatus === "loading"
                          ? "Loading models..."
                          : "Select a model")}
                    </span>
                    <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground flex-shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52 sm:w-56 p-2" align="start">
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
                    {modelsStatus !== "loading" &&
                      models.length === 0 &&
                      modelsStatus !== "error" && (
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
      </div>

      <div className="w-full mt-4 sm:mt-6 px-2 md:mx-auto md:max-w-4xl md:px-0">
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
    </div>
  );
}
