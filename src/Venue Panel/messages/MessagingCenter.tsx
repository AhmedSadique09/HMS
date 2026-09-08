"use client";

import { useState } from "react";
import { DashboardShell } from "../dashboard/DashboardShell";
import { ChatThread } from "./ChatThread";
import { ConversationList } from "./ConversationList";
import { CONVERSATIONS } from "./messagesData";

/** "Messages" — conversation list on the left, selected thread on the right. */
export function MessagingCenter() {
  const [activeId, setActiveId] = useState<string | null>(CONVERSATIONS[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredConversations = query
    ? CONVERSATIONS.filter((conversation) => conversation.customerName.toLowerCase().includes(query))
    : CONVERSATIONS;

  const activeConversation = CONVERSATIONS.find((conversation) => conversation.id === activeId) ?? null;

  return (
    <DashboardShell fullHeight>
      <div className="flex h-full min-h-0 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
        <ConversationList
          conversations={filteredConversations}
          activeId={activeId}
          onSelect={setActiveId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ChatThread conversation={activeConversation} />
      </div>
    </DashboardShell>
  );
}
