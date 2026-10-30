import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacy } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: privacy.title, description: privacy.description, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalDocument doc={privacy} />;
}
