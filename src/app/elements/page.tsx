import ElementsPlayground from "./ElementsPlayground";

export const metadata = {
  title: "Elements Playground",
  description: "Test reusable UI elements alongside their code.",
};

/**
 * Elements playground page.
 *
 * The interactive sidebar + demo/code panel lives in <ElementsPlayground>.
 * Register new elements inside that component's ELEMENTS array.
 */
export default function ElementsPage() {
  return <ElementsPlayground />;
}
