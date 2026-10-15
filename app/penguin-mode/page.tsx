import { PenguinScene } from "@/components/penguin/PenguinScene";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Penguin mode", path: "/penguin-mode" }), robots: { index: false } };

export default function PenguinModePage() {
  return (
    <>
      <h1 className="sr-only">Penguin mode</h1>
      <PenguinScene compact />
    </>
  );
}
