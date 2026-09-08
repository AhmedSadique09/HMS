"use client";

import { useState } from "react";
import { BrandButton } from "@/components/elements/BrandButton";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
const LABEL = "mb-1.5 block text-sm font-medium text-ink";

/** "Profile Information" tab — avatar, contact details, and Save Changes. */
export function ProfileInformationCard() {
  const [fullName, setFullName] = useState("Hall Manager");

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Profile Information</h2>

      <div className="mt-5 flex items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand/70 text-2xl font-bold text-white">
          {fullName.charAt(0).toUpperCase() || "H"}
        </span>
        <button
          type="button"
          className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5"
        >
          Change Photo
        </button>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={LABEL}>Full Name</label>
            <input
              id="fullName"
              className={FIELD}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className={LABEL}>Email</label>
            <input
              id="email"
              type="email"
              className={FIELD}
              defaultValue=""
              placeholder="admin@demo.com"
              disabled
            />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL}>Phone</label>
            <input id="phone" type="tel" className={FIELD} defaultValue="+92-42-35761234" />
          </div>
          <div>
            <label htmlFor="whatsapp" className={LABEL}>WhatsApp</label>
            <input id="whatsapp" type="tel" className={FIELD} defaultValue="+923001234567" />
          </div>
        </div>

        <BrandButton type="submit">Save Changes</BrandButton>
      </form>
    </div>
  );
}
