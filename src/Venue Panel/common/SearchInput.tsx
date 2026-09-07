"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
};

/** The rounded search box used across Venue Panel toolbars (Bookings, Venues/Halls, ...). */
export function SearchInput({ value, onChange, placeholder, className = "" }: Props) {
  return (
    <div className={`relative w-full max-w-xs ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </div>
  );
}
