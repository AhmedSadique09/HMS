/* eslint-disable @next/next/no-img-element */

const WIDGET_IMAGE =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80";

/** Photo card with a brand wash carrying the invitation copy. */
export function ContactWidget() {
  return (
    <figure className="relative w-full overflow-hidden rounded-2xl">
      <img src={WIDGET_IMAGE} alt="" className="block h-auto w-full" />
      <figcaption className="absolute bottom-0 left-0 z-[2] flex w-full flex-col bg-[linear-gradient(to_bottom,rgba(215,56,83,0)_0%,rgba(215,56,83,1)_60%)] p-6 pt-24">
        <h2 className="mb-4 text-h3 font-semibold leading-tight text-white">Get in Touch</h2>
        <p className="mb-0 text-lg leading-snug text-white">
          Whether you&rsquo;re a couple planning your big day or a vendor looking to join, we&rsquo;d
          love to hear from you. Our team replies within one working day.
        </p>
      </figcaption>
    </figure>
  );
}
