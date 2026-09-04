import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AUTH_SCREENS, AUTH_SLUGS } from "@/web/auth";

interface AuthPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return AUTH_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AuthPageProps): Promise<Metadata> {
  const { slug } = await params;
  const screen = AUTH_SCREENS[slug];

  if (!screen) return { title: "Page not found" };

  return {
    title: screen.title,
    description: screen.description,
    robots: { index: false, follow: false },
  };
}

export default async function AuthPage({ params }: AuthPageProps) {
  const { slug } = await params;
  const screen = AUTH_SCREENS[slug];

  if (!screen) notFound();

  const { Screen } = screen;
  return <Screen />;
}
