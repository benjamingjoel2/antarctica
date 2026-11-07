import { Pill } from "@/components/ui/Pill";
import Image from "next/image";
import { img } from "@/data/images";

export default function NotFound() {
  return (
    <section className="grid min-h-[100svh] place-items-center bg-ice py-[8rem] text-ink">
      <div className="container-site grid-site items-center gap-y-[2rem]">
        <div className="col-span-6 col-start-4 md:col-span-2 md:col-start-4">
          <span className="relative block aspect-[4/5] w-full max-w-[12rem] overflow-hidden rounded-[0.3rem]">
            <Image src={img.gentooRock} alt="A gentoo penguin on rock" fill sizes="12rem" className="object-cover" />
          </span>
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
