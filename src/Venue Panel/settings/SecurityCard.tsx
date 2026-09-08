"use client";

import { BrandButton } from "@/components/elements/BrandButton";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
const LABEL = "mb-1.5 block text-sm font-medium text-ink";

/** "Security" tab — change the account password. */
export function SecurityCard() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Security</h2>

      <form
        className="mt-5 max-w-md space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="currentPassword" className={LABEL}>Current Password</label>
          <input id="currentPassword" type="password" autoComplete="current-password" className={FIELD} />
        </div>
        <div>
          <label htmlFor="newPassword" className={LABEL}>New Password</label>
          <input id="newPassword" type="password" autoComplete="new-password" className={FIELD} />
        </div>

        <BrandButton type="submit">Update Password</BrandButton>
      </form>
    </div>
  );
}
