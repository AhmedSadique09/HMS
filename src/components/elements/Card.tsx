import type { ReactNode } from "react";
import Button from "@/components/elements/Button";
import Badge from "@/components/elements/Badge";

/**
 * Card
 * ----
 * A content container — the Tailwind equivalent of Bootstrap's `.card`. Compose
 * it with {@link CardImage}, {@link CardHeader}, {@link CardBody},
 * {@link CardFooter}, {@link CardTitle} and {@link CardText}.
 *
 * @example
 * ```tsx
 * import Card, { CardBody, CardTitle, CardText } from "@/components/elements/Card";
 *
 * <Card>
 *   <CardBody>
 *     <CardTitle>Card title</CardTitle>
 *     <CardText>Some quick example text.</CardText>
 *   </CardBody>
 * </Card>
 * ```
 */
export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * CardImage — a top image (Bootstrap's `.card-img-top`). Renders the given
 * `src`, or a gradient placeholder when none is provided.
 */
export function CardImage({
  src,
  alt = "",
  className = "",
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`h-40 w-full bg-linear-to-br from-blue-400 to-purple-500 ${className}`}
        aria-hidden="true"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`h-40 w-full object-cover ${className}`}
    />
  );
}

/** CardHeader — a top section with a bottom border (Bootstrap `.card-header`). */
export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-b border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200 ${className}`}
    >
      {children}
    </div>
  );
}

/** CardBody — the padded content area (Bootstrap `.card-body`). */
export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

/** CardFooter — a bottom section with a top border (Bootstrap `.card-footer`). */
export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-t border-zinc-200 px-5 py-3 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 ${className}`}
    >
      {children}
    </div>
  );
}

/** CardTitle — the card heading (Bootstrap `.card-title`). */
export function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-lg font-semibold text-zinc-900 dark:text-zinc-50 ${className}`}
    >
      {children}
    </h3>
  );
}

/** CardText — body copy (Bootstrap `.card-text`). */
export function CardText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-1 text-sm text-zinc-600 dark:text-zinc-400 ${className}`}>
      {children}
    </p>
  );
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Card") and renders each variant's demo + code.
 */
export const cardElement = {
  name: "Card",
  variants: [
    {
      name: "Basic",
      description:
        "Title, text and an action — the simplest card (Bootstrap's basic card).",
      demo: (
        <div className="max-w-sm">
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </CardText>
              <Button color="primary" size="sm" className="mt-4">
                Go somewhere
              </Button>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardBody, CardTitle, CardText } from "@/components/elements/Card";
import Button from "@/components/elements/Button";

<Card>
  <CardBody>
    <CardTitle>Card title</CardTitle>
    <CardText>Some quick example text.</CardText>
    <Button color="primary" size="sm" className="mt-4">Go somewhere</Button>
  </CardBody>
</Card>`,
    },
    {
      name: "Header & footer",
      description: "A card with a header and footer section.",
      demo: (
        <div className="max-w-sm">
          <Card>
            <CardHeader>Featured</CardHeader>
            <CardBody>
              <CardTitle>Special title treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in.</CardText>
            </CardBody>
            <CardFooter>Last updated 3 mins ago</CardFooter>
          </Card>
        </div>
      ),
      code: `import Card, { CardHeader, CardBody, CardTitle, CardText, CardFooter } from "@/components/elements/Card";

<Card>
  <CardHeader>Featured</CardHeader>
  <CardBody>
    <CardTitle>Special title treatment</CardTitle>
    <CardText>With supporting text below.</CardText>
  </CardBody>
  <CardFooter>Last updated 3 mins ago</CardFooter>
</Card>`,
    },
    {
      name: "With image",
      description:
        "An image cap on top of the card (Bootstrap's card-img-top). Pass `src` to CardImage.",
      demo: (
        <div className="max-w-sm">
          <Card>
            <CardImage />
            <CardBody>
              <CardTitle>Card with image</CardTitle>
              <CardText>
                A short description that sits below the image cap.
              </CardText>
              <Button color="primary" size="sm" className="mt-4">
                View
              </Button>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardImage, CardBody, CardTitle, CardText } from "@/components/elements/Card";

<Card>
  <CardImage src="/cover.jpg" alt="Cover" />
  <CardBody>
    <CardTitle>Card with image</CardTitle>
    <CardText>A short description below the image.</CardText>
  </CardBody>
</Card>`,
    },
    {
      name: "Horizontal",
      description: "Image on the left, content on the right (Bootstrap's horizontal card).",
      demo: (
        <div className="max-w-lg">
          <Card>
            <div className="flex">
              <CardImage className="h-auto w-1/3" />
              <CardBody className="flex-1">
                <CardTitle>Horizontal card</CardTitle>
                <CardText>
                  The image sits beside the content instead of on top. Great for
                  list rows and previews.
                </CardText>
              </CardBody>
            </div>
          </Card>
        </div>
      ),
      code: `import Card, { CardImage, CardBody, CardTitle, CardText } from "@/components/elements/Card";

<Card>
  <div className="flex">
    <CardImage className="h-auto w-1/3" />
    <CardBody className="flex-1">
      <CardTitle>Horizontal card</CardTitle>
      <CardText>The image sits beside the content.</CardText>
    </CardBody>
  </div>
</Card>`,
    },
    {
      name: "Stats",
      description:
        "Metric cards with a label, value and trend — the staple of dashboards.",
      demo: (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total revenue", value: "$48.2k", change: "+12%", up: true },
            { label: "New users", value: "2,310", change: "+8.1%", up: true },
            { label: "Churn", value: "1.2%", change: "-0.4%", up: false },
          ].map((s) => (
            <Card key={s.label}>
              <CardBody>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {s.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {s.value}
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    s.up
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {s.change} vs last month
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      ),
      code: `import Card, { CardBody } from "@/components/elements/Card";

<Card>
  <CardBody>
    <p className="text-sm text-zinc-500">Total revenue</p>
    <p className="mt-2 text-3xl font-semibold">$48.2k</p>
    <p className="mt-1 text-sm font-medium text-green-600">+12% vs last month</p>
  </CardBody>
</Card>`,
    },
    {
      name: "Profile",
      description: "An avatar, name, role and action — for user/team cards.",
      demo: (
        <div className="max-w-xs">
          <Card>
            <CardBody className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xl font-semibold text-white">
                UK
              </div>
              <CardTitle className="mt-3">Usman Khan</CardTitle>
              <CardText className="mt-0">Frontend Developer</CardText>
              <div className="mt-4 flex gap-2">
                <Button color="primary" size="sm">
                  Follow
                </Button>
                <Button color="secondary" variant="outline" size="sm">
                  Message
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardBody, CardTitle, CardText } from "@/components/elements/Card";
import Button from "@/components/elements/Button";

<Card>
  <CardBody className="flex flex-col items-center text-center">
    <div className="flex size-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xl font-semibold text-white">
      UK
    </div>
    <CardTitle className="mt-3">Usman Khan</CardTitle>
    <CardText className="mt-0">Frontend Developer</CardText>
    <Button color="primary" size="sm" className="mt-4">Follow</Button>
  </CardBody>
</Card>`,
    },
    {
      name: "Pricing",
      description: "A plan name, price, feature list and call-to-action.",
      demo: (
        <div className="max-w-xs">
          <Card>
            <CardBody>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Pro
              </p>
              <p className="mt-2">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                  $29
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  /month
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {["Unlimited projects", "Priority support", "Custom domains"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4 text-green-500"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <Button color="primary" fullWidth className="mt-6">
                Get started
              </Button>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardBody } from "@/components/elements/Card";
import Button from "@/components/elements/Button";

<Card>
  <CardBody>
    <p className="text-sm font-medium text-blue-600">Pro</p>
    <p className="mt-2">
      <span className="text-4xl font-bold">$29</span>
      <span className="text-sm text-zinc-500">/month</span>
    </p>
    <ul className="mt-4 space-y-2 text-sm">
      <li>✓ Unlimited projects</li>
      <li>✓ Priority support</li>
    </ul>
    <Button color="primary" fullWidth className="mt-6">Get started</Button>
  </CardBody>
</Card>`,
    },
    {
      name: "With badge",
      description: "A status badge in the card header — for tasks, orders, tickets.",
      demo: (
        <div className="max-w-sm">
          <Card>
            <CardBody>
              <div className="flex items-start justify-between gap-3">
                <CardTitle>Order #1024</CardTitle>
                <Badge color="success" pill dot>
                  Paid
                </Badge>
              </div>
              <CardText>
                2 items · $84.00 · placed on Jun 6, 2026. Shipping to Lahore.
              </CardText>
              <Button color="secondary" variant="outline" size="sm" className="mt-4">
                View order
              </Button>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardBody, CardTitle, CardText } from "@/components/elements/Card";
import Badge from "@/components/elements/Badge";

<Card>
  <CardBody>
    <div className="flex items-start justify-between gap-3">
      <CardTitle>Order #1024</CardTitle>
      <Badge color="success" pill dot>Paid</Badge>
    </div>
    <CardText>2 items · $84.00</CardText>
  </CardBody>
</Card>`,
    },
    {
      name: "Notification",
      description: "An icon, message and timestamp with a dismiss button.",
      demo: (
        <div className="max-w-sm">
          <Card>
            <CardBody className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="M10 2a6 6 0 0 0-6 6v2.586l-.707.707A1 1 0 0 0 4 13h12a1 1 0 0 0 .707-1.707L16 10.586V8a6 6 0 0 0-6-6ZM7.5 15a2.5 2.5 0 0 0 5 0h-5Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  New comment on your post
                </p>
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Ali replied: “Looks great, ship it!”
                </p>
                <p className="mt-1 text-xs text-zinc-400">2 minutes ago</p>
              </div>
              <Button
                color="secondary"
                variant="link"
                size="sm"
                aria-label="Dismiss"
                className="-mt-1"
              >
                ✕
              </Button>
            </CardBody>
          </Card>
        </div>
      ),
      code: `import Card, { CardBody } from "@/components/elements/Card";

<Card>
  <CardBody className="flex gap-3">
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      {/* icon */}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">New comment on your post</p>
      <p className="mt-0.5 text-sm text-zinc-500">Ali replied…</p>
      <p className="mt-1 text-xs text-zinc-400">2 minutes ago</p>
    </div>
  </CardBody>
</Card>`,
    },
    {
      name: "Clickable",
      description:
        "The whole card is a link with a hover lift — for navigation tiles and previews.",
      demo: (
        <div className="max-w-sm">
          <a
            href="#"
            className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <CardTitle>Documentation</CardTitle>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <CardText>
                Learn how to use every component with live examples and code.
              </CardText>
            </div>
          </a>
        </div>
      ),
      code: `import { CardTitle, CardText } from "@/components/elements/Card";

<a
  href="/docs"
  className="group block rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
>
  <div className="p-5">
    <CardTitle>Documentation</CardTitle>
    <CardText>Learn how to use every component.</CardText>
  </div>
</a>`,
    },
  ],
};
