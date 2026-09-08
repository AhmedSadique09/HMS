"use client";

import { Check, CheckCheck, MessageSquare, Paperclip, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { Conversation } from "./messagesData";

function MessageStatusIcon({ status }: { status?: "sent" | "delivered" | "read" }) {
  if (!status) return null;
  if (status === "sent") return <Check className="size-3.5 text-white/60" />;
  return <CheckCheck className={`size-3.5 ${status === "read" ? "text-white" : "text-white/60"}`} />;
}

/** Right column — selected conversation's header, message bubbles, and composer. */
export function ChatThread({ conversation }: { conversation: Conversation | null }) {
  const [draft, setDraft] = useState("");

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <MessageSquare className="size-10 text-ink/20" strokeWidth={1.5} />
        <p className="mt-3 text-sm text-ink/40">Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={conversation.customerPhoto}
            alt={conversation.customerName}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-ink">{conversation.customerName}</p>
            <p className={`text-xs ${conversation.isOnline ? "text-emerald-600" : "text-ink/40"}`}>
              {conversation.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Call customer"
          className="flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
        >
          <Phone className="size-4.5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {conversation.messages.map((message) => {
          const isAdmin = message.sender === "admin";

          return (
            <div key={message.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                  isAdmin ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-ink/5 text-ink"
                }`}
              >
                <p>{message.text}</p>
                <div
                  className={`mt-1 flex items-center justify-end gap-1 text-[11px] ${
                    isAdmin ? "text-white/70" : "text-ink/40"
                  }`}
                >
                  {message.time}
                  {isAdmin && <MessageStatusIcon status={message.status} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="flex items-center gap-2 border-t border-ink/10 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          setDraft("");
        }}
      >
        <button
          type="button"
          aria-label="Attach a file"
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink/45 transition hover:bg-ink/5"
        >
          <Paperclip className="size-4.5" strokeWidth={1.75} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-xl border border-ink/10 bg-ink/2 px-4 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!draft.trim()}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
