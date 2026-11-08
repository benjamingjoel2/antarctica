import Link from "next/link";
import { getPhotoCredits } from "@/data/photo-credits";
import { localHref } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Photo credits",
  description: "Who took the photographs and films on this site, and the licences they are shared under.",
  path: "/photo-credits",
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** One list of every photo and film on the site, generated from the photo data. Credits live here, never on the photos. */
export default function PhotoCreditsPage() {
  const credits = getPhotoCredits();
  return (
    <section className="bg-ice pb-[8rem] pt-[8rem] text-ink">
      <div className="container-site">
        <div className="grid-site mb-[4rem]">
          <div className="col-span-12 lg:col-span-9 lg:col-start-3">
            <h1 className="t-h2">Photo credits</h1>
            <p className="t-small mt-[1.2rem] max-w-[40rem] opacity-70">
              Every photograph and film on this site was taken in Antarctica, South Georgia or the Drake Passage. They come from Wikimedia Commons and are used under the licences listed below, with thanks to the photographers.
            </p>
          </div>
        </div>
        <ol>
          {credits.map((c, i) => (
            <li key={c.file} className="grid-site border-t border-ink/20 py-[1.6rem]">
              <p className="col-span-2 t-small lg:col-span-1 lg:col-start-3">{i + 1}</p>
              <div className="col-span-10 lg:col-span-7">
                <h2 className="t-small font-medium">{c.shows}</h2>
                <dl className="t-small mt-[0.7rem] grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-[1rem] gap-y-[0.25rem] [overflow-wrap:anywhere]">
                  <dt className="opacity-60">Photographer</dt>
                  <dd>{c.author}</dd>
                  <dt className="opacity-60">Licence</dt>
                  <dd>
                    {c.licenceUrl ? (
                      <a href={c.licenceUrl} {...ext} className="underline underline-offset-[0.15em] hover:opacity-60">{c.licence}</a>
                    ) : (
                      c.licence
                    )}
                  </dd>
                  <dt className="opacity-60">Source</dt>
                  <dd>
                    <a href={c.source} {...ext} className="underline underline-offset-[0.15em] hover:opacity-60">Wikimedia Commons</a>
                  </dd>
                  <dt className="opacity-60">Changes</dt>
                  <dd>{c.changes}</dd>
                  <dt className="opacity-60">Used on</dt>
                  <dd>
                    {c.uses.map((u, j) => (
                      <span key={u.label}>
                        {j > 0 && ", "}
                        {u.href ? <Link href={localHref(u.href)} className="underline underline-offset-[0.15em] hover:opacity-60">{u.label}</Link> : u.label}
                      </span>
                    ))}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
