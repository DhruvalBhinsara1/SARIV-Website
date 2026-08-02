"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, ArrowUp, Square, ThumbsUp, ThumbsDown } from "lucide-react";
import { Mark } from "@/components/Mark";
import { buttonVariants } from "@/components/ui/Button";
import { SmoothTextarea } from "@/components/ui/SmoothTextarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** The user question this reply answers — only set on assistant messages, needed to submit feedback. */
  question?: string;
  feedback?: "up" | "down";
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Hi — I'm the SARIV assistant. Ask me about our work, process, or products.",
};

const ERROR_REPLY =
  "Something went wrong on my end. Please try again, or reach out through the Contact page.";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const conversationIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reduceMotion = useReducedMotion();

  // Auto-grow the textarea with the message instead of scrolling text sideways.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || launcherRef.current?.contains(target)) return;
      setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isTyping || streamingId) return;

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: conversationIdRef.current ?? undefined, message: text }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) throw new Error("chat request failed");

      const newConversationId = res.headers.get("X-Conversation-Id");
      if (newConversationId) conversationIdRef.current = newConversationId;

      const assistantId = crypto.randomUUID();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let receivedAny = false;

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!receivedAny) {
          receivedAny = true;
          setIsTyping(false);
          setStreamingId(assistantId);
          setMessages((m) => [...m, { id: assistantId, role: "assistant", text: chunk, question: text }]);
        } else {
          setMessages((m) =>
            m.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg))
          );
        }
      }

      if (!receivedAny) throw new Error("empty stream");
    } catch (err) {
      // A deliberate stop shouldn't erase whatever partial reply already streamed in.
      if ((err as Error).name !== "AbortError") {
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", text: ERROR_REPLY }]);
      }
    } finally {
      setIsTyping(false);
      setStreamingId(null);
      abortRef.current = null;
    }
  }

  function stopGenerating() {
    abortRef.current?.abort();
  }

  // Fire-and-forget: feedback is a nice-to-have signal for reviewing/tuning
  // the assistant later, not something a failed request should surface to the visitor.
  function submitFeedback(message: ChatMessage, rating: "up" | "down") {
    if (message.feedback || !message.question) return;
    setMessages((m) => m.map((msg) => (msg.id === message.id ? { ...msg, feedback: rating } : msg)));
    fetch("/api/chat/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: conversationIdRef.current ?? undefined,
        question: message.question,
        answer: message.text,
        rating,
      }),
    }).catch((err) => console.error("Error submitting chat feedback", err));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <>
      <button
        ref={launcherRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat with the SARIV assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-8 right-8 z-[9998] flex items-center justify-center w-14 h-14 rounded-full bg-primary text-surface shadow-elevation transition-transform duration-500 ease-out hover:-translate-y-1"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="flex"
          >
            {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="SARIV assistant"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[104px] right-8 z-[9998] w-[min(380px,calc(100vw-2.5rem))] max-h-[min(600px,calc(100vh-140px))] flex flex-col rounded-2xl border border-border bg-surface shadow-elevation overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Mark className="w-4 h-4 text-surface" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-primary leading-tight">
                  SARIV Assistant
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-primary hover:bg-surface-elevated transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 min-h-[280px]">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex flex-col gap-1.5", m.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed font-body",
                      m.role === "user"
                        ? "bg-primary text-surface rounded-br-md"
                        : "bg-surface-elevated text-primary rounded-bl-md"
                    )}
                  >
                    {m.text}
                  </div>
                  {m.role === "assistant" && m.question && m.id !== streamingId && (
                    <div className="flex items-center gap-1 px-1">
                      <button
                        type="button"
                        onClick={() => submitFeedback(m, "up")}
                        aria-label="Good reply"
                        aria-pressed={m.feedback === "up"}
                        disabled={!!m.feedback}
                        className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-full transition-colors",
                          m.feedback === "up" ? "text-primary" : "text-muted hover:text-primary disabled:hover:text-muted"
                        )}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => submitFeedback(m, "down")}
                        aria-label="Poor reply"
                        aria-pressed={m.feedback === "down"}
                        disabled={!!m.feedback}
                        className={cn(
                          "flex items-center justify-center w-6 h-6 rounded-full transition-colors",
                          m.feedback === "down" ? "text-primary" : "text-muted hover:text-primary disabled:hover:text-muted"
                        )}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="self-start flex items-center gap-1.5 bg-surface-elevated rounded-2xl rounded-bl-md px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-end gap-2 px-4 py-4 border-t border-border shrink-0">
              <SmoothTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Message"
                rows={1}
                className="min-h-[44px] max-h-[120px] text-sm resize-none py-2.5"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              {isTyping || streamingId ? (
                <button
                  type="button"
                  onClick={stopGenerating}
                  aria-label="Stop generating"
                  className={cn(buttonVariants({ variant: "primary" }), "h-10 w-10 p-0 shrink-0")}
                >
                  <Square className="w-3 h-3" fill="currentColor" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className={cn(buttonVariants({ variant: "primary" }), "h-10 w-10 p-0 shrink-0")}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
