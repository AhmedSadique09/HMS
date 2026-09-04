import { Icon, ICONS, StepTag } from "@/web/common/Primitives";
import { ContactForm } from "./ContactForm";
import { ContactWidget } from "./ContactWidget";

const DIRECT_CONTACTS = ["hello@bandhan.pk", "+92 42 111-226-334"] as const;

/**
 * Enquiry section — the invitation card sits beside the form, with the direct
 * email and phone line closing it out.
 */
export function GetInTouch() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6">
        <div className="flex w-full flex-col items-start justify-between gap-16 lg:flex-row">
          <div className="w-full shrink-0 lg:max-w-md">
            <ContactWidget />
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
              {DIRECT_CONTACTS.map((contact) => (
                <span key={contact} className="flex items-center gap-2">
                  <Icon path={ICONS.arrow} className="size-4 shrink-0 text-[#d73853]" />
                  {contact}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
