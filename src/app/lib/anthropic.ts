// AI-POWERED
// Direct browser calls to the Anthropic Claude API.
// Requires VITE_ANTHROPIC_API_KEY in .env.local

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
export const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

interface CallOptions {
  model?: string;
  maxTokens?: number;
  system?: string;
}

interface StreamOptions extends CallOptions {
  onChunk: (text: string) => void;
  onDone: () => void;
  onError: (err: Error) => void;
}

function headers(): Record<string, string> {
  return {
    "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY as string,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true",
    "content-type": "application/json",
  };
}

/** One-shot Claude call — returns the full response text. */
export async function callClaude(
  messages: ClaudeMessage[],
  options: CallOptions = {}
): Promise<string> {
  const { model = DEFAULT_MODEL, maxTokens = 1024, system } = options;

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages,
    }),
  });

  if (!res.ok) {
    throw new Error(`Claude API ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data.content[0].text as string;
}

/** Streaming Claude call — fires onChunk for each text delta. */
export async function streamClaude(
  messages: ClaudeMessage[],
  options: StreamOptions
): Promise<void> {
  const { model = DEFAULT_MODEL, maxTokens = 512, system, onChunk, onDone, onError } = options;

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        ...(system ? { system } : {}),
        messages,
        stream: true,
      }),
    });

    if (!res.ok) {
      throw new Error(`Claude API ${res.status}: ${res.statusText}`);
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(payload);
          if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
            onChunk(parsed.delta.text);
          }
        } catch { /* skip invalid SSE frames */ }
      }
    }
    onDone();
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
