import { ManageCookiesButton } from "@/components/layout/ManageCookiesButton";
import { NumberedClauses } from "@/components/sections/NumberedClauses";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Legal notice & privacy", path: "/legals" });

export default function LegalsPage() {
  return (
    <section className="bg-ice pb-[8rem] pt-[8rem] text-ink">
      <div className="container-site">
        <div className="grid-site mb-[5rem]">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3">
            <h1 className="t-h2">Legal Notice</h1>
            <p className="t-small mt-[0.6rem] opacity-60">Last updated: October 2026 · Draft — to be reviewed by counsel before launch</p>
          </div>
        </div>
        <NumberedClauses
          items={[
            { id: "owner", title: "Owner", body: <><p>{site.name} (company name, registration number and registered office to be completed).</p><p>{site.contact.email}</p></> },
            { id: "hosting", title: "Hosting provider", body: <p>This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p> },
            { id: "role", title: "Our role", body: <p>{site.name} is an independent travel specialist. We do not operate ships. Voyages are operated by partner expedition companies that are members of IAATO, and are subject to the operator&apos;s booking terms and conditions, which we will provide before you book.</p> },
            { id: "ip", title: "Intellectual property", body: <p>Texts, graphics, illustrations and the {site.name} logo are our property unless stated otherwise. Placeholder photography is used under the Unsplash licence and will be replaced before launch.</p> },
            { id: "privacy", title: "Privacy policy", body: <><p>We use the personal data you share (for example through the expedition planner or newsletter) only to answer your enquiry, plan your journey and, if you opt in, send news. We share data with partner operators only when needed to hold or book a voyage.</p><p>You can request access, correction or deletion at any time by emailing {site.contact.email}. Full GDPR/UK GDPR wording to be completed.</p></> },
            { id: "cookies", title: "Cookies", body: <><p>Essential storage keeps the site working (your consent choice, currency and saved planner progress). Analytics, personalisation and marketing cookies are only set with your consent.</p><div className="pt-[0.4rem]"><ManageCookiesButton /></div></> },
            { id: "liability", title: "Limitation of liability", body: <p>Information on this site, including itineraries, prices, durations, rules and requirements, is provided for guidance and may change. Details are placeholders until verified with partner operators and IAATO.</p> },
            { id: "links", title: "Links to third-party sites", body: <p>We are not responsible for the content of external sites we link to, including operator and IAATO pages.</p> },
            { id: "changes", title: "Modifications", body: <p>We may update this notice at any time. Please check this page periodically.</p> },
          ]}
        />
      </div>
    </section>
  );
}
