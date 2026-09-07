"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Profile avatar button in the topbar — opens Settings / Logout on click. */
export function ProfileMenu() {
  const router = useRouter();
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

  const handleLogout = () => {
    localStorage.removeItem("bandhan_auth");
    setIsOpen(false);
    router.push("/auth/signin");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={isOpen}
        className="flex size-9 items-center justify-center rounded-full bg-ink/10 text-sm font-semibold text-ink transition hover:bg-ink/15"
      >
        PC
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-44 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-lg">
          <Link
            href="/manage-venue/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/5"
          >
            <Settings className="size-4" />
            Settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
