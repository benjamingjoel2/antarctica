import { ManageCookiesButton } from "@/components/layout/ManageCookiesButton";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { cookies } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: cookies.title, description: cookies.description, path: "/cookies" });

export default function CookiesPage() {
  return (
    <LegalDocument
      doc={cookies}
      after={
        <div className="grid-site border-t border-ink/20 pt-[2rem]">
          <div className="col-span-10 col-start-3 lg:col-span-6 lg:col-start-4">
            <ManageCookiesButton />
          </div>
        </div>
      }
    />
  );
}
