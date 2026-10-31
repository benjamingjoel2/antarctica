"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldErrors, type UseFormRegisterReturn } from "react-hook-form";
import { PillButton } from "@/components/ui/Pill";
import { SplitWords } from "@/components/ui/SplitWords";
import { routes } from "@/data/routes";
import { cn } from "@/lib/cn";
import { useCurrency } from "@/lib/currency";
import { durationLabel } from "@/lib/data";
import {
  activityOptions,
  budgetBands,
  cabinTypes,
  contactMethods,
  plannerMonths,
  plannerSchema,
  seasickOptions,
  shipSizes,
  stepFields,
  tripLengths,
  type PlannerData,
  type PlannerInput,
} from "@/lib/planner-schema";
import { clearStore, readStore, writeStore } from "@/lib/storage";

const STORE = "sc-planner-v1";

const steps = [
  { key: "when", label: "When", title: ["when", "to go"] },
  { key: "journey", label: "Journey", title: ["which", "journey"] },
  { key: "comfort", label: "Ship & comfort", title: ["ship &", "comfort"] },
  { key: "who", label: "Who", title: ["who's", "coming"] },
  { key: "contact", label: "Contact", title: ["stay in", "touch"] },
];

/** Display labels: the option values stay English for the API. */
const tripLengthLabels: Record<(typeof tripLengths)[number], string> = {
  "6–8 days": "6–8 days", "9–12 days": "9–12 days", "13–17 days": "13–17 days", "18–23 days": "18–23 days", "24+ days": "24+ days",
};
const contactLabels: Record<(typeof contactMethods)[number], string> = { Email: "Email", Telephone: "Telephone" };

const monthNames: Record<(typeof plannerMonths)[number], string> = {
  Oct: "October", Nov: "November", Dec: "December", Jan: "January", Feb: "February", Mar: "March",
};
const shipLabels: Record<(typeof shipSizes)[number], [string, string]> = {
  small: ["Small & intimate", "Under ~150 guests: more time ashore"],
  mid: ["Mid-size", "~150–200 guests: more facilities"],
  luxury: ["Luxury", "Suites, fine dining, extra space"],
  "no-preference": ["No preference", "Advise me"],
};
const cabinLabels: Record<(typeof cabinTypes)[number], string> = { shared: "Shared (triple/quad)", standard: "Standard", balcony: "Balcony", suite: "Suite" };
const activityLabels: Record<(typeof activityOptions)[number], string> = {
  kayaking: "Sea kayaking", camping: "Camping on the ice", photography: "Photography", "antarctic-circle": "Antarctic Circle",
};
const seasickLabels: Record<(typeof seasickOptions)[number], [string, string]> = {
  "happy-to-sail": ["Happy to sail the Drake", "Two days each way, part of the journey"],
  "prefer-to-fly": ["I'd rather fly the Drake", "Fly Punta Arenas → King George Island"],
  "not-sure": ["Not sure yet", "Talk me through it"],
};

const defaults: Partial<PlannerInput> = {
  months: [],
  routes: [],
  activities: [],
  contact: [contactMethods[0]],
  adults: 2,
  children: 0,
  phoneCode: "+1",
};

/* ------------------------------------------------------------------ */
/* Small form atoms                                                    */
/* ------------------------------------------------------------------ */

function Choice({ type, reg, value, children, sub }: { type: "radio" | "checkbox"; reg: UseFormRegisterReturn; value: string; children: ReactNode; sub?: string }) {
  return (
    <label className="relative cursor-pointer">
      <input type={type} value={value} {...reg} className="peer sr-only" />
      <span
        className={cn(
          "flex min-h-[2.4rem] flex-col justify-center border border-ink/25 px-[0.6rem] py-[0.45rem] transition",
          "hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ice",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange",
        )}
      >
        <span className="t-mono">{children}</span>
        {sub && <span className="mt-[0.2rem] text-[0.75rem] opacity-70">{sub}</span>}
      </span>
    </label>
  );
}

function Group({ legend, error, children, hint }: { legend: string; error?: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <fieldset className="mt-[2.2rem] first:mt-0" aria-invalid={!!error}>
      <legend className="t-mono mb-[0.9rem] opacity-60">{legend}</legend>
      <div className="flex flex-wrap gap-[0.5rem]">{children}</div>
      {hint && <div className="mt-[0.7rem] text-[0.82rem] opacity-70">{hint}</div>}
      {error && <p role="alert" className="mt-[0.6rem] text-[0.85rem] font-medium text-orange">{error}</p>}
    </fieldset>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="t-mono mb-[0.5rem] block opacity-60">{label}</span>
      {children}
      {error && <span role="alert" className="mt-[0.4rem] block text-[0.85rem] font-medium text-orange">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full border border-ink/30 bg-transparent px-[1rem] py-[0.8rem] text-[1rem] outline-none transition focus:border-ink";

const err = (e: FieldErrors<PlannerInput>, k: keyof PlannerInput) => e[k]?.message as string | undefined;

/* ------------------------------------------------------------------ */

export function Planner({ initialRoute, variant = "page", onClose }: { initialRoute?: string; variant?: "page" | "modal"; onClose?: () => void }) {
  const { format, currency } = useCurrency();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState("");
  const top = useRef<HTMLDivElement>(null);
  const restored = useRef(false);

  const form = useForm<PlannerInput, unknown, PlannerData>({
    resolver: zodResolver(plannerSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { register, handleSubmit, trigger, watch, reset, formState } = form;
  const errors = formState.errors;

  // Restore saved progress, then apply ?route= prefill.
  useEffect(() => {
    const saved = readStore<{ step: number; values: Partial<PlannerInput> } | null>(STORE, null);
    const values: Partial<PlannerInput> = { ...defaults, ...(saved?.values ?? {}) };
    if (initialRoute && routes.some((r) => r.slug === initialRoute)) {
      values.routes = Array.from(new Set([...(values.routes ?? []), initialRoute]));
    }
    reset(values as PlannerInput);
    if (saved?.step) setStep(Math.min(saved.step, steps.length - 1));
    restored.current = true;
  }, [initialRoute, reset]);

  // Persist on every change.
  useEffect(() => {
    const sub = watch((values) => {
      if (restored.current && status !== "done") writeStore(STORE, { step, values });
    });
    return () => sub.unsubscribe();
  }, [watch, step, status]);

  useEffect(() => {
    if (restored.current && status !== "done") writeStore(STORE, { step, values: form.getValues() });
  }, [step, status, form]);

  const scrollTop = () => top.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = async () => {
    const ok = await trigger(stepFields[step], { shouldFocus: true });
    if (!ok) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
    scrollTop();
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  };

  const onSubmit = async (data: PlannerData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/plan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error();
      setReference(json.reference);
      setStatus("done");
      clearStore(STORE);
      scrollTop();
    } catch {
      setStatus("error");
    }
  };

  // If a later-step error appears on submit, jump to that step.
  const onInvalid = (e: FieldErrors<PlannerInput>) => {
    const idx = stepFields.findIndex((fields) => fields.some((f) => e[f]));
    if (idx >= 0 && idx !== step) setStep(idx);
  };

  const children = Number(watch("children") ?? 0);
  const selectedRoutes = watch("routes") ?? [];
  const values = watch();

  if (status === "done") {
    return (
      <div ref={top} className="py-[2rem]">
        <SplitWords as="h2" onMount className="t-giant" lines={["thank you"]} />
        <div className="mt-[2.5rem] grid gap-[2rem] md:grid-cols-2">
          <p className="t-h2" role="status">
            Your polar specialist will be in touch within one working day{values.name ? `, ${String(values.name).split(" ")[0]}` : ""}.
          </p>
          <div className="space-y-[1rem] opacity-70">
            <p>
              Reference <span className="t-mono">{reference}</span>. We&apos;ll compare departures across our
              IAATO-member partners and come back with two or three voyages we&apos;d genuinely choose for you.
            </p>
            <p>In the meantime, read up on the crossing.</p>
            <div className="flex flex-wrap gap-[0.5rem]">
              <Link href="/journal/crossing-the-drake-vs-flying" className="t-mono bg-ink px-[0.3rem] py-[0.15rem] text-ice hover:bg-orange hover:text-ink">
                Drake vs flying
              </Link>
              {variant === "modal" ? (
                <button type="button" onClick={onClose} className="t-mono cursor-pointer px-[0.3rem] py-[0.15rem] ring-1 ring-ink/30">
                  Close
                </button>
              ) : (
                <Link href="/" className="t-mono px-[0.3rem] py-[0.15rem] ring-1 ring-ink/30">
                  Back to home
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-[6rem]">
      {/* Progress */}
      <ol className="grid grid-cols-5 gap-[0.4rem]" aria-label="Planner progress">
        {steps.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              onClick={() => i < step && (setDir(-1), setStep(i))}
              disabled={i >= step}
              className="group w-full cursor-pointer text-left disabled:cursor-default"
              aria-current={i === step ? "step" : undefined}
            >
              <span className="block h-[0.3rem] overflow-hidden rounded-full bg-ink/15">
                <motion.span
                  className="block h-full bg-orange"
                  initial={false}
                  animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                />
              </span>
              <span className={cn("t-mono mt-[0.5rem] hidden text-[0.95rem] md:block", i === step ? "opacity-100" : "opacity-50")}>
                {String(i + 1).padStart(2, "0")} {s.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {steps.length}: {steps[step].label}
      </p>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="mt-[2.5rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitWords as="h2" onMount className="t-giant mb-[2.5rem] !text-[clamp(3rem,9vw,7.5rem)]" lines={[steps[step].title[0], { text: steps[step].title[1], className: "md:pl-[14%]" }]} />

            {step === 0 && (
              <>
                <Group legend="Preferred month(s)" error={err(errors, "months")} hint="The season runs roughly November to March; emperor voyages start in late October.">
                  {plannerMonths.map((m) => (
                    <Choice key={m} type="checkbox" reg={register("months")} value={m}>{monthNames[m]}</Choice>
                  ))}
                </Group>
                <Group legend="Are your dates flexible?" error={err(errors, "flexible")}>
                  <Choice type="radio" reg={register("flexible")} value="yes">Yes, flexible</Choice>
                  <Choice type="radio" reg={register("flexible")} value="no">No, fixed dates</Choice>
                </Group>
                <Group legend="Trip length" error={err(errors, "tripLength")}>
                  {tripLengths.map((t) => (
                    <Choice key={t} type="radio" reg={register("tripLength")} value={t}>{tripLengthLabels[t]}</Choice>
                  ))}
                </Group>
              </>
            )}

            {step === 1 && (
              <Group legend="Choose one or more journeys" error={err(errors, "routes")}>
                <div className="grid w-full grid-cols-1 gap-[0.7rem] sm:grid-cols-2 lg:grid-cols-4">
                  {routes.map((r) => (
                    <label key={r.slug} className="group relative block cursor-pointer">
                      <input type="checkbox" value={r.slug} {...register("routes")} className="peer sr-only" />
                      <span className="relative block aspect-[4/5] overflow-hidden rounded-[0.3rem] ring-2 ring-transparent transition peer-checked:ring-orange peer-focus-visible:ring-orange">
                        <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                        <span className="absolute inset-x-0 bottom-0 p-[1rem] text-ice">
                          <span className="t-h3 block">{r.name}</span>
                          <span className="t-mono mt-[0.4rem] block text-[0.95rem] opacity-80">
                            {durationLabel(r.durationDays)} · from {r.embarkation}
                          </span>
                        </span>
                      </span>
                      <span className={cn("absolute right-[0.7rem] top-[0.7rem] grid h-[1.8rem] w-[1.8rem] place-items-center rounded-full text-[0.9rem] transition", selectedRoutes.includes(r.slug) ? "bg-orange text-ink" : "bg-white/70 text-transparent")} aria-hidden>
                        ✓
                      </span>
                    </label>
                  ))}
                  <label className="relative block cursor-pointer">
                    <input type="checkbox" value="help-me-choose" {...register("routes")} className="peer sr-only" />
                    <span className="flex aspect-[4/5] flex-col justify-between rounded-[0.3rem] border border-dashed border-ink/40 p-[1rem] transition peer-checked:border-orange peer-checked:bg-berg/25 peer-focus-visible:border-orange">
                      <span className="t-mono opacity-60">Not sure?</span>
                      <span className="t-h2">help me choose</span>
                      <span className="text-[0.85rem] opacity-70">Tell us what matters and your specialist will shortlist routes.</span>
                    </span>
                  </label>
                </div>
              </Group>
            )}

            {step === 2 && (
              <>
                <Group legend="Ship size" error={err(errors, "shipSize")} hint="Smaller ships usually mean more time ashore: IAATO limits how many guests can land at once. (Verify with partner operators.)">
                  {shipSizes.map((s) => (
                    <Choice key={s} type="radio" reg={register("shipSize")} value={s} sub={shipLabels[s][1]}>{shipLabels[s][0]}</Choice>
                  ))}
                </Group>
                <Group legend="Cabin type" error={err(errors, "cabin")}>
                  {cabinTypes.map((c) => (
                    <Choice key={c} type="radio" reg={register("cabin")} value={c}>{cabinLabels[c]}</Choice>
                  ))}
                </Group>
                <Group legend="Must-have activities (optional)">
                  {activityOptions.map((a) => (
                    <Choice key={a} type="checkbox" reg={register("activities")} value={a}>{activityLabels[a]}</Choice>
                  ))}
                </Group>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-[1.2rem] sm:grid-cols-2">
                  <Field label="Adults" error={err(errors, "adults")}>
                    <input type="number" min={1} max={20} inputMode="numeric" {...register("adults")} className={inputCls} />
                  </Field>
                  <Field label="Children" error={err(errors, "children")}>
                    <input type="number" min={0} max={10} inputMode="numeric" {...register("children")} className={inputCls} />
                  </Field>
                  {children > 0 && (
                    <Field label="Children's ages" error={err(errors, "childAges")} className="sm:col-span-2">
                      <input type="text" placeholder="e.g. 9, 13" {...register("childAges")} className={inputCls} />
                      <span className="mt-[0.4rem] block text-[0.82rem] opacity-70">Minimum age rules vary by operator, often 8–12 years. (Verify with partner operators.)</span>
                    </Field>
                  )}
                  <Field label="Mobility or medical needs (optional)" className="sm:col-span-2">
                    <textarea rows={3} {...register("mobility")} className={inputCls} placeholder="Zodiac transfers need some agility. Tell us anything that helps us choose the right ship." />
                  </Field>
                </div>
                <Group legend="Seasickness & the Drake Passage" error={err(errors, "seasickness")}>
                  {seasickOptions.map((s) => (
                    <Choice key={s} type="radio" reg={register("seasickness")} value={s} sub={seasickLabels[s][1]}>{seasickLabels[s][0]}</Choice>
                  ))}
                </Group>
                <Group legend={`Budget per person (${currency})`} error={err(errors, "budget")}>
                  {budgetBands.map((b) => (
                    <Choice key={b.id} type="radio" reg={register("budget")} value={b.id}>
                      {b.max === null ? `${format(b.min)}+` : b.min === 0 ? `Under ${format(b.max)}` : `${format(b.min)}–${format(b.max)}`}
                    </Choice>
                  ))}
                </Group>
              </>
            )}

            {step === 4 && (
              <>
                <div className="grid gap-[1.2rem] sm:grid-cols-2">
                  <Field label="Full name" error={err(errors, "name")}>
                    <input type="text" autoComplete="name" {...register("name")} className={inputCls} />
                  </Field>
                  <Field label="Email" error={err(errors, "email")}>
                    <input type="email" autoComplete="email" {...register("email")} className={inputCls} />
                  </Field>
                  <div className="grid grid-cols-[6rem_1fr] gap-[0.6rem] sm:col-span-2">
                    <Field label="Code" error={err(errors, "phoneCode")}>
                      <input type="text" inputMode="tel" autoComplete="tel-country-code" placeholder="+44" {...register("phoneCode")} className={inputCls} />
                    </Field>
                    <Field label="Phone" error={err(errors, "phone")}>
                      <input type="tel" autoComplete="tel-national" {...register("phone")} className={inputCls} />
                    </Field>
                  </div>
                </div>
                <Group legend="How should we contact you?" error={err(errors, "contact")}>
                  {contactMethods.map((c) => (
                    <Choice key={c} type="checkbox" reg={register("contact")} value={c}>{contactLabels[c]}</Choice>
                  ))}
                </Group>
                <Field label="Anything else? (optional)" className="mt-[2rem]">
                  <textarea rows={4} {...register("notes")} className={inputCls} placeholder="Celebrations, dream sightings, photography gear, dietary needs…" />
                </Field>
                <label className="mt-[1.5rem] flex cursor-pointer items-start gap-[0.8rem]">
                  <input type="checkbox" {...register("consent")} className="mt-[0.2rem] h-[1.1rem] w-[1.1rem] shrink-0 cursor-pointer border border-ink checked:bg-ink" />
                  <span className="text-[0.9rem]">
                    I agree that Seventh Continent may contact me about this enquiry, as described in the{" "}
                    <Link href="/privacy" className="underline">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.consent && <p role="alert" className="mt-[0.4rem] text-[0.85rem] font-medium text-orange">{errors.consent.message as string}</p>}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="mt-[1.5rem] text-orange">Something went wrong sending your plan. Your answers are saved: please try again.</p>
        )}

        <div className="mt-[3rem] flex items-center justify-between gap-[1rem] border-t border-ink/20 pt-[1.5rem]">
          <PillButton onClick={back} disabled={step === 0} variant="dark">
            ← Back
          </PillButton>
          <span className="t-mono opacity-60">
            {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </span>
          {step < steps.length - 1 ? (
            <PillButton variant="dark" onClick={next}>
              Next →
            </PillButton>
          ) : (
            <PillButton variant="accent" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send my plan"}
            </PillButton>
          )}
        </div>
        <p className="mt-[1rem] text-[0.78rem] opacity-70">Progress is saved on this device, so you can come back later.</p>
      </form>
    </div>
  );
}
