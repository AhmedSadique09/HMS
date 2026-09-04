"use client";

import { Fancybox } from "@fancyapps/ui";
import type { OptionsType } from "@fancyapps/ui/types/Fancybox/options";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";

export interface FancyboxGalleryProps extends ComponentPropsWithoutRef<"div"> {
  /** Fancybox options (Toolbar, Thumbs, …). */
  options?: Partial<OptionsType>;
}

/**
 * Binds Fancybox to every `[data-fancybox]` child inside it. Children sharing
 * the same `data-fancybox` value are grouped into one gallery, so the lightbox
 * can page between them.
 *
 * @example
 * <FancyboxGallery className="grid grid-cols-4 gap-4">
 *   {images.map((image) => (
 *     <a key={image.src} href={image.src} data-fancybox="gallery" data-caption={image.caption}>
 *       <img src={image.src} alt={image.caption} />
 *     </a>
 *   ))}
 * </FancyboxGallery>
 */
export function FancyboxGallery({ options, children, ...rest }: FancyboxGalleryProps) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!root) return;

    Fancybox.bind(root, "[data-fancybox]", options ?? {});
    return () => Fancybox.unbind(root);
  }, [root, options]);

  return (
    <div ref={setRoot} {...rest}>
      {children}
    </div>
  );
}
