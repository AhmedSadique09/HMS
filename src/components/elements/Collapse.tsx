"use client";

import { useState, type ReactNode } from "react";
import Button from "@/components/elements/Button";
import Card, { CardBody } from "@/components/elements/Card";

/**
 * Props for the {@link Collapse} component.
 *
 * @property open       - Whether the content is shown (controlled).
 * @property horizontal - Animate width instead of height (Bootstrap's
 *                        `.collapse-horizontal`).
 * @property children   - The content to reveal / hide.
 * @property className  - Extra classes merged onto the wrapper.
 */
export interface CollapseProps {
  open: boolean;
  horizontal?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Collapse
 * --------
 * A controlled show/hide container — the Tailwind equivalent of Bootstrap's
 * `.collapse`. Toggle it with any trigger by flipping the `open` prop. Uses the
 * CSS grid `0fr → 1fr` trick to animate height (or width, when `horizontal`)
 * smoothly without hard-coding a size.
 *
 * @example
 * ```tsx
 * import Collapse from "@/components/elements/Collapse";
 *
 * const [open, setOpen] = useState(false);
 *
 * <button onClick={() => setOpen((o) => !o)}>Toggle</button>
 * <Collapse open={open}>
 *   <div>Hidden content</div>
 * </Collapse>
 * ```
 */
export default function Collapse({
  open,
  horizontal = false,
  children,
  className = "",
}: CollapseProps) {
  if (horizontal) {
    return (
      <div
        className={`inline-grid transition-all duration-300 ease-in-out ${
          open ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
        } ${className}`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    );
  }
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      } ${className}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* ----------------------------- Playground demos ---------------------------- */

function VerticalDemo() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" onClick={toggle} aria-expanded={open}>
          Link with href
        </Button>
        <Button color="primary" onClick={toggle} aria-expanded={open}>
          Button with target
        </Button>
      </div>
      <Collapse open={open} className="mt-3">
        <Card>
          <CardBody>
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

function HorizontalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        color="primary"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Toggle width collapse
      </Button>
      <div className="mt-3 min-h-[120px]">
        <Collapse open={open} horizontal>
          <Card className="w-[300px]">
            <CardBody>
              This is some placeholder content for a horizontal collapse. It’s
              hidden by default and shown when triggered.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
}

function MultiDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const toggleBoth = () => {
    const next = !(a && b);
    setA(next);
    setB(next);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button color="primary" onClick={() => setA((o) => !o)} aria-expanded={a}>
          Toggle first element
        </Button>
        <Button color="primary" onClick={() => setB((o) => !o)} aria-expanded={b}>
          Toggle second element
        </Button>
        <Button color="primary" onClick={toggleBoth}>
          Toggle both elements
        </Button>
      </div>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <Collapse open={a}>
          <Card>
            <CardBody>
              Some placeholder content for the first collapse component of this
              multi-collapse example.
            </CardBody>
          </Card>
        </Collapse>
        <Collapse open={b}>
          <Card>
            <CardBody>
              Some placeholder content for the second collapse component of this
              multi-collapse example.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
}

/**
 * Playground entry for this element. The `/elements` page shows one sidebar
 * item ("Collapse") and renders each variant's demo + code.
 */
export const collapseElement = {
  name: "Collapse",
  variants: [
    {
      name: "Vertical",
      description:
        "Toggle a panel's height. Any trigger works — just flip the `open` prop.",
      demo: <VerticalDemo />,
      code: `import Collapse from "@/components/elements/Collapse";
import Button from "@/components/elements/Button";

const [open, setOpen] = useState(false);
const toggle = () => setOpen((o) => !o);

<Button color="primary" onClick={toggle} aria-expanded={open}>Toggle</Button>
<Collapse open={open} className="mt-3">
  <Card><CardBody>Hidden content…</CardBody></Card>
</Collapse>`,
    },
    {
      name: "Horizontal",
      description:
        "Animate width instead of height — pass `horizontal` (Bootstrap's collapse-horizontal).",
      demo: <HorizontalDemo />,
      code: `import Collapse from "@/components/elements/Collapse";

const [open, setOpen] = useState(false);

<Button color="primary" onClick={() => setOpen((o) => !o)}>
  Toggle width collapse
</Button>
<Collapse open={open} horizontal>
  <Card className="w-[300px]"><CardBody>Horizontal content…</CardBody></Card>
</Collapse>`,
    },
    {
      name: "Multiple toggles & targets",
      description:
        "Several triggers controlling one or many panels — toggle first, second, or both.",
      demo: <MultiDemo />,
      code: `import Collapse from "@/components/elements/Collapse";

const [a, setA] = useState(false);
const [b, setB] = useState(false);

<Button onClick={() => setA((o) => !o)}>Toggle first</Button>
<Button onClick={() => setB((o) => !o)}>Toggle second</Button>
<Button onClick={() => { const n = !(a && b); setA(n); setB(n); }}>
  Toggle both
</Button>

<Collapse open={a}>…</Collapse>
<Collapse open={b}>…</Collapse>`,
    },
  ],
};
