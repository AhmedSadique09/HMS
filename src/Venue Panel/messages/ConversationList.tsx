import { SearchInput } from "../common/SearchInput";
import type { Conversation } from "./messagesData";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

/** Left column — searchable list of customer conversations. */
export function ConversationList({ conversations, activeId, onSelect, searchQuery, onSearchChange }: Props) {
  return (
    <div className="flex h-full min-h-0 w-full max-w-sm shrink-0 flex-col border-r border-ink/10">
      <div className="border-b border-ink/10 p-4">
        <h2 className="font-serif text-lg font-semibold text-ink">Messages</h2>
        <div className="mt-3">
          <SearchInput value={searchQuery} onChange={onSearchChange} placeholder="Search conversations..." />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <li className="p-6 text-center text-sm text-ink/40">No conversations found.</li>
        ) : (
          conversations.map((conversation) => {
            const isActive = conversation.id === activeId;
            const lastMessage = conversation.messages[conversation.messages.length - 1];

            return (
              <li key={conversation.id}>
                <button
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${
                    isActive ? "bg-brand/5" : "hover:bg-ink/5"
                  }`}
                >
                  <span className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={conversation.customerPhoto}
                      alt={conversation.customerName}
                      className="size-11 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white ${
                        conversation.isOnline ? "bg-emerald-500" : "bg-ink/25"
                      }`}
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-ink">{conversation.customerName}</p>
                      <span className="shrink-0 text-xs text-ink/40">{conversation.lastMessageTime}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-ink/50">{lastMessage?.text}</p>
                      {conversation.unreadCount > 0 && (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
