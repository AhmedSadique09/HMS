"use client";

import { Bell, CheckCheck, ChevronLeft, ChevronRight, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATIONS, type NotificationDatum } from "./dashboardData";

const PAGE_SIZE = 4;

/** The "..." overflow menu inside the panel header — Mark All as Read / Clear All. */
function OverflowMenu({
  onMarkAllRead,
  onClearAll,
  disabled,
}: {
  onMarkAllRead: () => void;
  onClearAll: () => void;
  disabled: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={disabled}
        aria-label="Notification options"
        className="flex size-7 items-center justify-center rounded-full text-ink/40 transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MoreVertical className="size-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-44 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onMarkAllRead();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/5"
          >
            <CheckCheck className="size-4 text-brand" />
            Mark All as Read
          </button>
          <button
            type="button"
            onClick={() => {
              onClearAll();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <Trash2 className="size-4" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

/** Header bell: unread-count badge + a dropdown panel with a paginated notification list. */
export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationDatum[]>(NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const totalPages = Math.max(1, Math.ceil(notifications.length / PAGE_SIZE));
  const pageItems = notifications.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const togglePanel = () => {
    setIsOpen((v) => !v);
    setPage(1);
  };

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  const clearAll = () => {
    setNotifications([]);
    setPage(1);
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={togglePanel}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5"
      >
        <Bell className="size-5" strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-80 rounded-2xl border border-ink/10 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-ink/10 p-4">
            <h3 className="font-semibold text-ink">Notifications</h3>
            <OverflowMenu onMarkAllRead={markAllRead} onClearAll={clearAll} disabled={notifications.length === 0} />
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {pageItems.length === 0 ? (
              <p className="p-4 text-center text-sm text-ink/40">No notifications</p>
            ) : (
              <div className="space-y-2">
                {pageItems.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg p-3 ${notification.isUnread ? "bg-brand/5" : "bg-ink/5"}`}
                  >
                    <p className="text-sm font-medium text-ink">{notification.title}</p>
                    <p className="mt-1 text-xs text-ink/50">{notification.description}</p>
                    <p className="mt-1 text-xs text-ink/35">{notification.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center justify-between border-t border-ink/10 p-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-ink/60 transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              <span className="text-xs text-ink/40">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-ink/60 transition hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
