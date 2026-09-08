"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import type { VenueInformationData } from "./onboardingData";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-ink/[0.02] px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";
const LABEL = "mb-1.5 block text-sm font-medium text-ink/70";

type Props = {
  value: VenueInformationData;
  onChange: (next: VenueInformationData) => void;
};

function ImageDropzone({
  label,
  file,
  onFile,
  className = "",
}: {
  label: string;
  file: File | null;
  onFile: (file: File | null) => void;
  className?: string;
}) {
  return (
    <label
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-ink/15 bg-ink/[0.02] text-center transition hover:border-brand hover:bg-brand/5 ${className}`}
    >
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={URL.createObjectURL(file)}
          alt={`${label} preview`}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <>
          <ImagePlus className="size-6 text-ink/40 group-hover:text-brand" />
          <span className="text-xs font-medium text-ink/50 group-hover:text-brand">{label}</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

/**
 * Circular logo uploader — a dashed preview circle with a remove button once
 * a file is set, plus a separate "Choose File" trigger and helper text.
 */
function LogoUploader({ file, onFile }: { file: File | null; onFile: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <figure className="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-ink/20 bg-ink/[0.02]">
          {file ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={URL.createObjectURL(file)} alt="Venue logo preview" className="size-full object-cover" />
          ) : (
            <ImagePlus className="size-7 text-ink/25" />
          )}
        </figure>
        {file && (
          <button
            type="button"
            onClick={() => onFile(null)}
            aria-label="Remove logo"
            className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm transition hover:bg-rose-600"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5"
        >
          Choose File
        </button>
        <p className="mt-1.5 text-xs text-ink/40">JPG or PNG, up to 5MB</p>
      </div>
    </div>
  );
}

/**
 * Onboarding step 1 — basic venue information: cover + profile image,
 * name, description, address fields, map link, and contact numbers.
 */
export function StepVenueInformation({ value, onChange }: Props) {
  const set = <K extends keyof VenueInformationData>(key: K, fieldValue: VenueInformationData[K]) =>
    onChange({ ...value, [key]: fieldValue });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <span className={LABEL}>Cover Photo</span>
          <ImageDropzone
            label="Upload cover photo"
            file={value.coverImage}
            onFile={(file) => set("coverImage", file)}
            className="h-40 w-full"
          />
        </div>
        <div>
          <span className={LABEL}>Venue Logo</span>
          <LogoUploader file={value.profileImage} onFile={(file) => set("profileImage", file)} />
        </div>
      </div>

      <div>
        <label htmlFor="venueName" className={LABEL}>Venue name</label>
        <input
          id="venueName"
          className={FIELD}
          value={value.venueName}
          onChange={(e) => set("venueName", e.target.value)}
          placeholder="e.g. Pearl Continental Banquets"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className={LABEL}>Description</label>
        <textarea
          id="description"
          rows={4}
          className={FIELD}
          value={value.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Tell couples what makes your venue special."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="state" className={LABEL}>State</label>
          <input
            id="state"
            className={FIELD}
            value={value.state}
            onChange={(e) => set("state", e.target.value)}
            placeholder="Punjab"
          />
        </div>
        <div>
          <label htmlFor="city" className={LABEL}>City</label>
          <input
            id="city"
            className={FIELD}
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Lahore"
          />
        </div>
        <div>
          <label htmlFor="area" className={LABEL}>Area</label>
          <input
            id="area"
            className={FIELD}
            value={value.area}
            onChange={(e) => set("area", e.target.value)}
            placeholder="Gulberg III"
          />
        </div>
      </div>

      <div>
        <label htmlFor="googleMapLink" className={LABEL}>Google Maps link</label>
        <input
          id="googleMapLink"
          type="url"
          className={FIELD}
          value={value.googleMapLink}
          onChange={(e) => set("googleMapLink", e.target.value)}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={LABEL}>Phone number</label>
          <input
            id="phone"
            type="tel"
            className={FIELD}
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+92 300 1234567"
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className={LABEL}>WhatsApp number</label>
          <input
            id="whatsapp"
            type="tel"
            className={FIELD}
            value={value.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder="+92 300 1234567"
          />
        </div>
      </div>
    </div>
  );
}
