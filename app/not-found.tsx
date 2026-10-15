import { Pill } from "@/components/ui/Pill";
import { PenguinSvg } from "@/components/penguin/PenguinSvg";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-ice py-[8rem] text-ink">
      <div className="container-site grid-site items-center gap-y-[2rem]">
        <div className="col-span-6 col-start-4 md:col-span-2 md:col-start-4">
          <PenguinSvg pose="wave" title="A lost penguin" className="w-full max-w-[10rem] origin-bottom animate-[waddle_1.2s_ease-in-out_infinite]" />
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="t-mono opacity-60">404 · 90° S</p>
          <h1 className="t-h2 mt-[0.6rem]">The page you are looking for has drifted off the ice.</h1>
          <div className="mt-[1.6rem]">
            <Pill href="/" variant="dark">Back to homepage</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
