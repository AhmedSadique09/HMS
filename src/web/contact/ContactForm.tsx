"use client";

import { type ChangeEvent, useState } from "react";
import { Icon, ICONS } from "@/web/common/Primitives";

type Field = "name" | "email" | "phone" | "subject" | "message";

const INITIAL_FORM: Record<Field, string> = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const FIELD_CLASS =
  "w-full rounded-lg border-0 bg-[#f1f5f9] px-4 py-4 text-base font-semibold text-[#62748e] placeholder:font-normal placeholder:text-[#8a97ab] focus:outline-none focus:ring-2 focus:ring-[#d73853]/40";

/**
 * Enquiry form — two-up grid for the short fields, full-width subject and
 * message, and a right-aligned send action.
 */
export function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  const updateField =
    (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <form className="flex flex-col gap-6">
      <fieldset className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <input
          required
          name="name"
          type="text"
          value={form.name}
          onChange={updateField("name")}
          placeholder="Full name"
          aria-label="Full name"
          autoComplete="name"
          className={`${FIELD_CLASS} sm:col-span-2`}
        />
        <input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={updateField("email")}
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          className={FIELD_CLASS}
        />
        <input
          required
          name="phone"
          type="tel"
          value={form.phone}
          onChange={updateField("phone")}
          placeholder="Phone"
          aria-label="Phone"
          autoComplete="tel"
          className={FIELD_CLASS}
        />
        <input
          required
          name="subject"
          type="text"
          value={form.subject}
          onChange={updateField("subject")}
          placeholder="Subject"
          aria-label="Subject"
          className={`${FIELD_CLASS} sm:col-span-2`}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={updateField("message")}
          placeholder="Start your message here!"
          aria-label="Message"
          className={`${FIELD_CLASS} min-h-[166px] resize-none sm:col-span-2`}
        />
      </fieldset>

      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-lg bg-[#d73853] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#c02f48]"
        >
          <span>Send</span>
          <Icon path={ICONS.arrow} className="size-4 shrink-0" />
        </button>
      </div>
    </form>
  );
}
