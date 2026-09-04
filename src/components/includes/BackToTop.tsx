"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Reveal the button once the user is ~60% of a viewport down the page. */
const REVEAL_VIEWPORT_FRACTION = 0.6;

/** Floating "back to top" control — appears mid-page, returns the user to the top. */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const readScroll = () => {
      frame = 0;
      setIsVisible(window.scrollY > window.innerHeight * REVEAL_VIEWPORT_FRACTION);
    };

    // rAF-gate the scroll handler so we read layout at most once per frame.
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(readScroll);
    };

    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
      className={`group fixed right-6 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-linear-to-b from-[#e2495f] to-[#c22b45] text-white ring-1 ring-white/25 shadow-[0_10px_24px_-6px_rgba(215,56,83,0.55)] outline-offset-2 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(215,56,83,0.65)] focus-visible:outline-2 focus-visible:outline-[#132743] active:scale-95 motion-reduce:transition-none ${
        isVisible
          ? "scale-100 translate-y-0 opacity-100"
          : "pointer-events-none scale-90 translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp
        aria-hidden
        className="size-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
        strokeWidth={2.25}
      />
    </button>
  );
}
