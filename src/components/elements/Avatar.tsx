import type { ReactNode } from "react";

const SIZES = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
} as const;

const STATUS = {
  online: "bg-green-500",
  busy: "bg-red-500",
  away: "bg-amber-500",
  offline: "bg-zinc-400",
} as const;

/**
 * Props for the {@link Avatar} component.
 *
 * @property src      - Image URL. Falls back to initials, then a placeholder.
 * @property alt      - Image alt text.
 * @property initials - Letters shown when there's no image.
 * @property size     - `xs`, `sm`, `md` (default), `lg` or `xl`.
 * @property status   - Optional presence dot.
 * @property rounded  - `"full"` (default) circle or `"md"` squircle.
 * @property className - Extra classes.
 */
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: keyof typeof SIZES;
  status?: keyof typeof STATUS;
  rounded?: "full" | "md";
  className?: string;
}

/**
 * Avatar
 * ------
 * A user image, initials, or placeholder — with optional sizes and a presence
 * dot. Pure Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import Avatar from "@/components/elements/Avatar";
 *
 * <Avatar src="/me.jpg" alt="Me" />
 * <Avatar initials="UK" status="online" />
 * ```
 */
export default function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  status,
  rounded = "full",
  className = "",
}: AvatarProps) {
  const r = rounded === "full" ? "rounded-full" : "rounded-md";
  const box = `relative inline-flex shrink-0 items-center justify-center overflow-hidden ${SIZES[size]} ${r} ${className}`;

  return (
    <span className={box}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : initials ? (
        <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-500 to-purple-600 font-semibold text-white">
          {initials}
        </span>
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-400 dark:bg-zinc-700">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3/5">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.91-8 6.5 0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5 0-3.59-3.582-6.5-8-6.5Z" />
          </svg>
        </span>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block size-1/4 rounded-full ring-2 ring-white dark:ring-zinc-900 ${STATUS[status]}`}
        />
      )}
    </span>
  );
}

/** A horizontal stack of overlapping avatars. */
export function AvatarGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex -space-x-2 [&>*]:ring-2 [&>*]:ring-white dark:[&>*]:ring-zinc-900 ${className}`}
    >
      {children}
    </div>
  );
}

/** Playground entry. */
export const avatarElement = {
  name: "Avatar",
  variants: [
    {
      name: "Image, initials & placeholder",
      description: "Shows an image, falls back to initials, then a placeholder.",
      demo: (
        <div className="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/80?img=12" alt="User" />
          <Avatar initials="UK" />
          <Avatar />
          <Avatar initials="AB" rounded="md" />
        </div>
      ),
      code: `import Avatar from "@/components/elements/Avatar";

<Avatar src="/me.jpg" alt="Me" />
<Avatar initials="UK" />
<Avatar />                       {/* placeholder */}
<Avatar initials="AB" rounded="md" />`,
    },
    {
      name: "Sizes",
      description: "Five sizes — xs, sm, md (default), lg, xl.",
      demo: (
        <div className="flex items-center gap-3">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Avatar key={s} initials="UK" size={s} />
          ))}
        </div>
      ),
      code: `<Avatar initials="UK" size="xs" />
<Avatar initials="UK" size="lg" />`,
    },
    {
      name: "With status",
      description: "A presence dot — online, busy, away or offline.",
      demo: (
        <div className="flex items-center gap-4">
          <Avatar initials="UK" status="online" />
          <Avatar initials="AB" status="busy" />
          <Avatar initials="CD" status="away" />
          <Avatar initials="EF" status="offline" />
        </div>
      ),
      code: `<Avatar initials="UK" status="online" />
<Avatar initials="AB" status="busy" />`,
    },
    {
      name: "Group",
      description: "Overlapping avatars with AvatarGroup.",
      demo: (
        <AvatarGroup>
          <Avatar initials="UK" />
          <Avatar initials="AB" />
          <Avatar initials="CD" />
          <Avatar initials="+5" />
        </AvatarGroup>
      ),
      code: `import Avatar, { AvatarGroup } from "@/components/elements/Avatar";

<AvatarGroup>
  <Avatar initials="UK" />
  <Avatar initials="AB" />
  <Avatar initials="+5" />
</AvatarGroup>`,
    },
  ],
};
