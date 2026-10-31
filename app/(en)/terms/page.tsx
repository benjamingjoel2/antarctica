import { LegalDocument } from "@/components/sections/LegalDocument";
import { terms } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: terms.title, description: terms.description, path: "/terms" });

export default function TermsPage() {
  return <LegalDocument doc={terms} />;
}
