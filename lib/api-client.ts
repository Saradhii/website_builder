export type ModelInfo = {
  id: string;
  name: string;
  provider: string;
};

export type ModelsResponse = {
  models: ModelInfo[];
};

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
};

export type ChatRequest = {
  model: string;
  input?: string;
  messages?: ChatMessage[];
  stream?: boolean;
  [key: string]: unknown;
};

export type StreamCallbacks = {
  onToken: (token: string) => void;
  onEvent?: (payload: unknown) => void;
  onError?: (message: string) => void;
  onDone?: () => void;
};

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8788";

function buildUrl(path: string) {
  const base = DEFAULT_BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

async function readErrorMessage(res: Response) {
  try {
    const data = (await res.json()) as { error?: string };
    if (data && typeof data.error === "string") {
      return data.error;
    }
  } catch {
    // Ignore JSON parse errors and fall back to status text.
  }
  return `${res.status} ${res.statusText}`.trim();
}

export async function fetchModels(signal?: AbortSignal) {
  const res = await fetch(buildUrl("/api/ai/models"), { signal });
  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }
  const data = (await res.json()) as ModelsResponse;
  if (!data || !Array.isArray(data.models)) {
    throw new Error("Invalid models response.");
  }
  return data.models;
}

export async function createChat(request: ChatRequest, signal?: AbortSignal) {
  const res = await fetch(buildUrl("/api/ai/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: false }),
    signal,
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return res.json();
}

type SseParseResult = {
  events: string[];
  rest: string;
};

function extractSseEvents(buffer: string): SseParseResult {
  const events: string[] = [];
  let remaining = buffer.replace(/\r\n/g, "\n");

  while (true) {
    const boundaryIndex = remaining.indexOf("\n\n");
    if (boundaryIndex === -1) break;

    const rawEvent = remaining.slice(0, boundaryIndex).trim();
    remaining = remaining.slice(boundaryIndex + 2);

    if (!rawEvent) continue;

    const dataLines = rawEvent
      .split("\n")
      .filter((line) => line.startsWith("data:"));

    if (dataLines.length === 0) continue;

    const data = dataLines
      .map((line) => line.replace(/^data:\s?/, ""))
      .join("\n");

    events.push(data);
  }

  return { events, rest: remaining };
}

function extractToken(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const choice = (payload as { choices?: Array<Record<string, any>> }).choices?.[0];
  if (!choice) return null;

  if (typeof choice.delta?.content === "string") return choice.delta.content;
  if (typeof choice.delta?.text === "string") return choice.delta.text;
  if (typeof choice.message?.content === "string") return choice.message.content;
  if (typeof choice.text === "string") return choice.text;

  return null;
}

export async function streamChat(
  request: ChatRequest,
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  const res = await fetch(buildUrl("/api/ai/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...request, stream: true }),
    signal,
  });

  if (!res.ok) {
    const message = await readErrorMessage(res);
    callbacks.onError?.(message);
    throw new Error(message);
  }

  const reader = res.body?.getReader();
  if (!reader) {
    const message = "Response body is empty.";
    callbacks.onError?.(message);
    throw new Error(message);
  }

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const { events, rest } = extractSseEvents(buffer);
    buffer = rest;

    for (const data of events) {
      if (!data) continue;

      if (data === "[DONE]") {
        callbacks.onDone?.();
        return;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(data);
      } catch {
        callbacks.onToken(data);
        continue;
      }

      const token = extractToken(parsed);
      if (token) callbacks.onToken(token);

      callbacks.onEvent?.(parsed);
    }
  }

  callbacks.onDone?.();
}
