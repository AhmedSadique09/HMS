"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Props for the {@link FileUpload} component.
 *
 * @property multiple  - Allow selecting more than one file.
 * @property accept    - Native `accept` filter (e.g. "image/*").
 * @property hint      - Helper text under the prompt.
 * @property onFiles   - Called with the current file list whenever it changes.
 * @property className  - Extra classes on the wrapper.
 */
export interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  hint?: ReactNode;
  onFiles?: (files: File[]) => void;
  className?: string;
}

const UploadIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
    />
  </svg>
);

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * FileUpload
 * ----------
 * A drag-and-drop dropzone with click-to-browse and a removable file list —
 * custom Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import FileUpload from "@/components/elements/FileUpload";
 *
 * <FileUpload multiple accept="image/*" onFiles={setFiles} />
 * ```
 */
export default function FileUpload({
  multiple = false,
  accept,
  hint,
  onFiles,
  className = "",
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const apply = (next: File[]) => {
    setFiles(next);
    onFiles?.(next);
  };

  const add = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const arr = Array.from(list);
    apply(multiple ? [...files, ...arr] : arr.slice(0, 1));
  };

  const remove = (i: number) => apply(files.filter((_, idx) => idx !== i));

  return (
    <div className={className}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-50/60 dark:bg-blue-500/10"
            : "border-zinc-300 hover:border-blue-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
        }`}
      >
        <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          {UploadIcon}
        </span>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          <span className="text-blue-600 dark:text-blue-400">Click to upload</span>{" "}
          or drag and drop
        </span>
        {hint && (
          <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {hint}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={(e) => add(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex min-w-0 items-center gap-2">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4 shrink-0 text-zinc-400"
                >
                  <path d="M4 4a2 2 0 0 1 2-2h5.586A2 2 0 0 1 13 2.586L16.414 6A2 2 0 0 1 17 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
                </svg>
                <span className="truncate text-zinc-700 dark:text-zinc-200">
                  {f.name}
                </span>
                <span className="shrink-0 text-xs text-zinc-400">
                  {formatSize(f.size)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove file"
                className="ml-3 shrink-0 text-zinc-400 transition-colors hover:text-red-500"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Playground entry. */
export const fileUploadElement = {
  name: "File upload",
  variants: [
    {
      name: "Basic",
      description: "A single-file dropzone — drag & drop or click to browse.",
      demo: (
        <div className="max-w-md">
          <FileUpload hint="PNG, JPG or PDF up to 10MB" />
        </div>
      ),
      code: `import FileUpload from "@/components/elements/FileUpload";

<FileUpload hint="PNG, JPG or PDF up to 10MB" onFiles={setFiles} />`,
    },
    {
      name: "Multiple files",
      description:
        "Accept several files — pass `multiple`. Selected files list below with remove.",
      demo: (
        <div className="max-w-md">
          <FileUpload multiple accept="image/*" hint="Add as many images as you like" />
        </div>
      ),
      code: `<FileUpload multiple accept="image/*" hint="Add as many images as you like" />`,
    },
  ],
};
