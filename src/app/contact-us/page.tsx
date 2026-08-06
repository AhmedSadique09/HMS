import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { InnerBanner } from "@/components/common/InnerBanner";
import { ContactForm } from "@/components/contact/ContactForm";
import { OurLocations } from "@/components/contact/OurLocations";
import { Icon, ICONS, StepTag } from "@/components/about/AboutPrimitives";

export const metadata: Metadata = {
  title: "Contact Bandhan — Talk to Our Wedding Team",
  description:
    "Planning a wedding or listing your business? Reach the Bandhan team in Lahore, Karachi, Islamabad or Faisalabad — we reply within one working day.",
};

const WIDGET_IMAGE =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80";

/** Photo card with a brand wash carrying the invitation copy. */
function Widget() {
  return (
    <figure className="relative w-full overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <InnerBanner
        title="Contact Us"
        description="We're Here to Help — Every Step of the Way"
        image="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80"
      />

      <main className="grow">
        <section className="w-full py-20">
          <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
            <div className="flex w-full flex-col items-start justify-between gap-16 lg:flex-row">
              <div className="w-full shrink-0 lg:max-w-md">
                <Widget />
              </div>

              <div className="grow">
                <div className="mb-12">
                  <StepTag icon={ICONS.heart} className="mb-4 bg-gray-100">
                    Start the conversation
                  </StepTag>

                  <h2 className="mb-3 text-h2 font-semibold leading-tight text-[#132743]">
                    We&rsquo;ll get back to you soon.
                  </h2>

                  <p className="text-base leading-[1.35] text-zinc-600">
                    <strong className="text-[#132743]">Prefer to reach out directly?</strong> Leave
                    your details below and our team will call you back.
                  </p>
                </div>

                <ContactForm />

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-zinc-200 pt-6 text-base text-[#132743]">
                  <span className="flex items-center gap-2">
                    <Icon path={ICONS.arrow} className="size-4 shrink-0 text-[#d73853]" />
                    hello@bandhan.pk
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon path={ICONS.arrow} className="size-4 shrink-0 text-[#d73853]" />
                    +92 42 111-226-334
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OurLocations />
      </main>

      <Footer />
    </div>
  );
}
