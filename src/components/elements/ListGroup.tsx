import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import Badge from "@/components/elements/Badge";

/** Contextual colours for {@link ListGroupItem}, mirroring Bootstrap. */
export type ListGroupColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

const CONTEXT_COLORS: Record<ListGroupColor, string> = {
  primary: "bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300",
  secondary: "bg-zinc-100 text-zinc-700 dark:bg-zinc-500/10 dark:text-zinc-300",
  success: "bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-300",
  danger: "bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-300",
  warning: "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300",
  info: "bg-cyan-50 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300",
};

/**
 * Props for {@link ListGroup}.
 *
 * @property flush      - Remove the outer border and rounding (edge-to-edge).
 * @property numbered   - Prefix each item with its number.
 * @property horizontal - Lay items out in a row instead of a column.
 * @property children   - {@link ListGroupItem} children.
 * @property className  - Extra classes merged onto the container.
 */
export interface ListGroupProps {
  flush?: boolean;
  numbered?: boolean;
  horizontal?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * ListGroup
 * ---------
 * A flexible list of content — the Tailwind equivalent of Bootstrap's
 * `.list-group`. Compose it with {@link ListGroupItem}.
 *
 * @example
 * ```tsx
 * import { ListGroup, ListGroupItem } from "@/components/elements/ListGroup";
 *
 * <ListGroup>
 *   <ListGroupItem>An item</ListGroupItem>
 *   <ListGroupItem active>A second item</ListGroupItem>
 * </ListGroup>
 * ```
 */
export function ListGroup({
  flush = false,
  numbered = false,
  horizontal = false,
  children,
  className = "",
}: ListGroupProps) {
  const divide = horizontal
    ? "flex divide-x divide-zinc-200 dark:divide-zinc-700"
    : "divide-y divide-zinc-200 dark:divide-zinc-700";
  const border = flush
    ? "border-y border-zinc-200 dark:border-zinc-700"
    : "overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700";

  const items = numbered
    ? Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<ListGroupItemProps>, {
              _number: i + 1,
            })
          : child,
      )
    : children;

  return <div className={`${divide} ${border} ${className}`}>{items}</div>;
}

/**
 * Props for {@link ListGroupItem}.
 *
 * @property active    - Highlight as the current item.
 * @property disabled  - Non-interactive, faded.
 * @property action    - Add hover/cursor styles (for links and buttons).
 * @property color     - A contextual background colour.
 * @property href      - Render as a link.
 * @property onClick   - Render as a button.
 * @property children  - The item content.
 * @property className - Extra classes merged onto the item.
 */
export interface ListGroupItemProps {
  active?: boolean;
  disabled?: boolean;
  action?: boolean;
  color?: ListGroupColor;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  /** Injected by a numbered ListGroup — not set directly. */
  _number?: number;
}

/** A single row inside a {@link ListGroup} (Bootstrap's `.list-group-item`). */
export function ListGroupItem({
  active = false,
  disabled = false,
  action = false,
  color,
  href,
  onClick,
  children,
  className = "",
  _number,
}: ListGroupItemProps) {
  const state = active
    ? "bg-blue-600 text-white"
    : color
      ? CONTEXT_COLORS[color]
      : "bg-white text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200";
  const hover =
    action && !disabled && !active
      ? "cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
      : "";
  const disabledCls = disabled ? "pointer-events-none opacity-50" : "";
  const cls = `block w-full px-4 py-3 text-left text-sm ${state} ${hover} ${disabledCls} ${className}`;

  const inner = _number ? (
    <span className="flex items-baseline gap-2">
      <span className="font-medium text-zinc-400">{_number}.</span>
      <span className="flex-1">{children}</span>
    </span>
  ) : (
    children
  );

  if (href) {
    return (
      <a href={href} className={cls} aria-current={active || undefined}>
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cls}
        aria-current={active || undefined}
      >
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("List group") and renders each variant's demo + code.
 */
export const listGroupElement = {
  name: "List group",
  variants: [
    {
      name: "Basic",
      description: "A simple list of items.",
      demo: (
        <div className="max-w-sm">
          <ListGroup>
            <ListGroupItem>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `import { ListGroup, ListGroupItem } from "@/components/elements/ListGroup";

<ListGroup>
  <ListGroupItem>An item</ListGroupItem>
  <ListGroupItem>A second item</ListGroupItem>
  <ListGroupItem>A third item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Active & disabled",
      description: "Highlight the current item with `active`; fade one with `disabled`.",
      demo: (
        <div className="max-w-sm">
          <ListGroup>
            <ListGroupItem active>Active item</ListGroupItem>
            <ListGroupItem>A normal item</ListGroupItem>
            <ListGroupItem disabled>A disabled item</ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `<ListGroup>
  <ListGroupItem active>Active item</ListGroupItem>
  <ListGroupItem>A normal item</ListGroupItem>
  <ListGroupItem disabled>A disabled item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Links & buttons",
      description:
        "Actionable items with hover states — pass `action` plus `href` or `onClick`.",
      demo: (
        <div className="max-w-sm">
          <ListGroup>
            <ListGroupItem action href="#" active>
              Current link item
            </ListGroupItem>
            <ListGroupItem action href="#">
              A link item
            </ListGroupItem>
            <ListGroupItem action onClick={() => {}}>
              A button item
            </ListGroupItem>
            <ListGroupItem action disabled href="#">
              A disabled link
            </ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `<ListGroup>
  <ListGroupItem action href="#" active>Current link item</ListGroupItem>
  <ListGroupItem action href="#">A link item</ListGroupItem>
  <ListGroupItem action onClick={handle}>A button item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Flush",
      description: "No outer border or rounding — pass `flush`.",
      demo: (
        <div className="max-w-sm">
          <ListGroup flush>
            <ListGroupItem>An item</ListGroupItem>
            <ListGroupItem>A second item</ListGroupItem>
            <ListGroupItem>A third item</ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `<ListGroup flush>
  <ListGroupItem>An item</ListGroupItem>
  <ListGroupItem>A second item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Numbered",
      description: "Prefix each item with its number — pass `numbered`.",
      demo: (
        <div className="max-w-sm">
          <ListGroup numbered>
            <ListGroupItem>A list item</ListGroupItem>
            <ListGroupItem>A list item</ListGroupItem>
            <ListGroupItem>A list item</ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `<ListGroup numbered>
  <ListGroupItem>A list item</ListGroupItem>
  <ListGroupItem>A list item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Horizontal",
      description: "Lay the items out in a row — pass `horizontal`.",
      demo: (
        <ListGroup horizontal>
          <ListGroupItem>First</ListGroupItem>
          <ListGroupItem>Second</ListGroupItem>
          <ListGroupItem>Third</ListGroupItem>
        </ListGroup>
      ),
      code: `<ListGroup horizontal>
  <ListGroupItem>First</ListGroupItem>
  <ListGroupItem>Second</ListGroupItem>
  <ListGroupItem>Third</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Contextual colors",
      description: "Colour items by context — pass `color` (Bootstrap convention).",
      demo: (
        <div className="max-w-sm">
          <ListGroup>
            <ListGroupItem>Default item</ListGroupItem>
            <ListGroupItem color="primary">Primary item</ListGroupItem>
            <ListGroupItem color="success">Success item</ListGroupItem>
            <ListGroupItem color="danger">Danger item</ListGroupItem>
            <ListGroupItem color="warning">Warning item</ListGroupItem>
            <ListGroupItem color="info">Info item</ListGroupItem>
          </ListGroup>
        </div>
      ),
      code: `<ListGroup>
  <ListGroupItem color="primary">Primary item</ListGroupItem>
  <ListGroupItem color="success">Success item</ListGroupItem>
  <ListGroupItem color="danger">Danger item</ListGroupItem>
</ListGroup>`,
    },
    {
      name: "With badges",
      description: "An item with a badge on the right — for counts and labels.",
      demo: (
        <div className="max-w-sm">
          <ListGroup>
            {[
              ["Inbox", 14],
              ["Drafts", 2],
              ["Archive", 8],
            ].map(([label, count]) => (
              <ListGroupItem key={label as string}>
                <span className="flex items-center justify-between">
                  {label}
                  <Badge color="primary" pill>
                    {count}
                  </Badge>
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ),
      code: `import { ListGroup, ListGroupItem } from "@/components/elements/ListGroup";
import Badge from "@/components/elements/Badge";

<ListGroup>
  <ListGroupItem>
    <span className="flex items-center justify-between">
      Inbox <Badge color="primary" pill>14</Badge>
    </span>
  </ListGroupItem>
</ListGroup>`,
    },
    {
      name: "Custom content",
      description: "Items with a heading, meta line and body text.",
      demo: (
        <div className="max-w-md">
          <ListGroup>
            {[
              { title: "List group item heading", time: "3 days ago", active: true },
              { title: "Another heading", time: "1 week ago", active: false },
            ].map((it) => (
              <ListGroupItem key={it.title} action href="#" active={it.active}>
                <span className="flex w-full items-center justify-between">
                  <span className="font-semibold">{it.title}</span>
                  <span
                    className={`text-xs ${
                      it.active ? "text-white/80" : "text-zinc-400"
                    }`}
                  >
                    {it.time}
                  </span>
                </span>
                <span className="mt-1 block">
                  Some placeholder content in a paragraph.
                </span>
                <span
                  className={`mt-1 block text-xs ${
                    it.active ? "text-white/80" : "text-zinc-400"
                  }`}
                >
                  And some small print.
                </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ),
      code: `<ListGroup>
  <ListGroupItem action href="#" active>
    <span className="flex items-center justify-between">
      <span className="font-semibold">List group item heading</span>
      <span className="text-xs">3 days ago</span>
    </span>
    <span className="mt-1 block">Some placeholder content.</span>
    <span className="mt-1 block text-xs">And some small print.</span>
  </ListGroupItem>
</ListGroup>`,
    },
  ],
};
