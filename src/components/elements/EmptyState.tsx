import type { ReactNode } from "react";
import Button from "@/components/elements/Button";

/**
 * Props for the {@link EmptyState} component.
 *
 * @property icon        - Optional icon shown in a circle.
 * @property title       - The headline.
 * @property description - Supporting text.
 * @property action      - Optional action node (e.g. a button).
 * @property dashed      - Use a dashed border container.
 * @property className   - Extra classes on the wrapper.
 */
export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  dashed?: boolean;
  className?: string;
}

/**
 * EmptyState
 * ----------
 * A centered placeholder for "no data / no results" screens — icon, title,
 * description and an optional action. Custom Tailwind, no dependencies.
 *
 * @example
 * ```tsx
 * import EmptyState from "@/components/elements/EmptyState";
 *
 * <EmptyState title="No projects" description="Create one to get started." />
 * ```
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  dashed = false,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl px-6 py-12 text-center ${
        dashed
          ? "border-2 border-dashed border-zinc-300 dark:border-zinc-700"
          : ""
      } ${className}`}
    >
      {icon && (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

const InboxIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M3 13h4l1.5 3h7L17 13h4M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
    />
  </svg>
);

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m21 21-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
  </svg>
);

const PlusIcon = (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
    <path d="M10 5a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 10 5Z" />
  </svg>
);

/** Playground entry. */
export const emptyStateElement = {
  name: "Empty state",
  variants: [
    {
      name: "Basic",
      description: "An icon, title and description.",
      demo: (
        <EmptyState
          icon={InboxIcon}
          title="No messages"
          description="Your inbox is empty. New messages will appear here."
        />
      ),
      code: `import EmptyState from "@/components/elements/EmptyState";

<EmptyState
  icon={<InboxIcon />}
  title="No messages"
  description="Your inbox is empty."
/>`,
    },
    {
      name: "With action",
      description: "Add a call-to-action.",
      demo: (
        <EmptyState
          icon={PlusIcon}
          title="No projects yet"
          description="Get started by creating your first project."
          action={
            <Button color="primary">
              {PlusIcon}
              New project
            </Button>
          }
        />
      ),
      code: `import EmptyState from "@/components/elements/EmptyState";
import Button from "@/components/elements/Button";

<EmptyState
  icon={<PlusIcon />}
  title="No projects yet"
  description="Get started by creating your first project."
  action={<Button color="primary">New project</Button>}
/>`,
    },
    {
      name: "Dashed (no results)",
      description: "A dashed container — e.g. an empty search result.",
      demo: (
        <EmptyState
          dashed
          icon={SearchIcon}
          title="No results found"
          description="Try adjusting your search or filters."
        />
      ),
      code: `<EmptyState
  dashed
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search or filters."
/>`,
    },
  ],
};
