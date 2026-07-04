import type { ReactNode } from "react";
import Badge from "@/components/elements/Badge";
import Button from "@/components/elements/Button";

/** A column definition for {@link Table}. */
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
}

/**
 * Props for the {@link Table} component.
 *
 * @property columns   - Column definitions.
 * @property data      - Row objects.
 * @property striped   - Zebra-stripe alternate rows.
 * @property hoverable - Highlight rows on hover.
 * @property compact   - Tighter row padding.
 * @property className - Extra classes on the wrapper.
 */
export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Table
 * -----
 * A styled data table — custom Tailwind, no dependencies. Define `columns`
 * (with optional `render`) and pass `data`.
 *
 * @example
 * ```tsx
 * import Table from "@/components/elements/Table";
 *
 * <Table
 *   columns={[{ key: "name", header: "Name" }, { key: "email", header: "Email" }]}
 *   data={users}
 * />
 * ```
 */
export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  striped = false,
  hoverable = false,
  compact = false,
  className = "",
}: TableProps<T>) {
  const cell = compact ? "px-3 py-2" : "px-4 py-3";
  const alignCls = (a?: string) =>
    a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

  return (
    <div
      className={`overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 ${className}`}
    >
      <table className="w-full text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`${cell} ${alignCls(c.align)} text-xs font-semibold uppercase tracking-wider`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 text-zinc-700 dark:divide-zinc-800 dark:text-zinc-200">
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${
                striped && i % 2 === 1 ? "bg-zinc-50/70 dark:bg-zinc-900/40" : ""
              } ${
                hoverable ? "transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50" : ""
              }`}
            >
              {columns.map((c) => (
                <td key={c.key} className={`${cell} ${alignCls(c.align)}`}>
                  {c.render ? c.render(row) : String(row[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface User extends Record<string, unknown> {
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
}

const USERS: User[] = [
  { name: "Usman Khan", email: "usman@acme.io", role: "Admin", status: "active" },
  { name: "Ali Raza", email: "ali@acme.io", role: "Developer", status: "active" },
  { name: "Sara Khan", email: "sara@acme.io", role: "Designer", status: "invited" },
  { name: "John Doe", email: "john@acme.io", role: "Viewer", status: "suspended" },
];

const BASE_COLS: TableColumn<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
];

const STATUS_COLOR = {
  active: "success",
  invited: "secondary",
  suspended: "danger",
} as const;

/** Playground entry. */
export const tableElement = {
  name: "Table",
  variants: [
    {
      name: "Basic",
      description: "A simple bordered table from columns + data.",
      demo: <Table columns={BASE_COLS} data={USERS} />,
      code: `import Table from "@/components/elements/Table";

<Table
  columns={[
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ]}
  data={users}
/>`,
    },
    {
      name: "Striped & hoverable",
      description: "Zebra stripes and row hover — pass `striped` and `hoverable`.",
      demo: <Table columns={BASE_COLS} data={USERS} striped hoverable />,
      code: `<Table columns={cols} data={users} striped hoverable />`,
    },
    {
      name: "Custom cells",
      description:
        "Use `render` to put any JSX in a cell — badges, actions, etc.",
      demo: (
        <Table
          columns={[
            { key: "name", header: "Name" },
            { key: "role", header: "Role" },
            {
              key: "status",
              header: "Status",
              render: (u) => (
                <Badge color={STATUS_COLOR[u.status]} pill dot>
                  {u.status}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              render: () => (
                <Button color="secondary" variant="link" size="sm">
                  Edit
                </Button>
              ),
            },
          ]}
          data={USERS}
          hoverable
        />
      ),
      code: `<Table
  columns={[
    { key: "name", header: "Name" },
    {
      key: "status", header: "Status",
      render: (u) => <Badge color={statusColor[u.status]} pill dot>{u.status}</Badge>,
    },
    {
      key: "actions", header: "", align: "right",
      render: (u) => <Button variant="link" size="sm">Edit</Button>,
    },
  ]}
  data={users}
  hoverable
/>`,
    },
    {
      name: "Compact",
      description: "Tighter rows — pass `compact`.",
      demo: <Table columns={BASE_COLS} data={USERS} compact striped />,
      code: `<Table columns={cols} data={users} compact />`,
    },
  ],
};
