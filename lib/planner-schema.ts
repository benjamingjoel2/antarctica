import { z } from "zod";

export const plannerMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"] as const;
export const tripLengths = ["6–8 days", "9–12 days", "13–17 days", "18–23 days", "24+ days"] as const;
export const shipSizes = ["small", "mid", "luxury", "no-preference"] as const;
export const cabinTypes = ["shared", "standard", "balcony", "suite"] as const;
export const activityOptions = ["kayaking", "camping", "photography", "antarctic-circle"] as const;
export const seasickOptions = ["happy-to-sail", "prefer-to-fly", "not-sure"] as const;
/** Budget bands per person in base USD; labels are converted on screen. */
export const budgetBands = [
  { id: "lt10", min: 0, max: 10000 },
  { id: "10-15", min: 10000, max: 15000 },
  { id: "15-25", min: 15000, max: 25000 },
  { id: "25-40", min: 25000, max: 40000 },
  { id: "40plus", min: 40000, max: null },
] as const;
export const contactMethods = ["Email", "WhatsApp", "Telephone"] as const;

export const plannerSchema = z
  .object({
    // 1 · When
    months: z.array(z.enum(plannerMonths)).min(1, "Pick at least one month (or all of them)."),
    flexible: z.enum(["yes", "no"], { message: "Let us know if your dates are flexible." }),
    tripLength: z.enum(tripLengths, { message: "Choose a trip length." }),
    // 2 · Journey
    routes: z.array(z.string()).min(1, "Choose at least one journey, or “Help me choose”."),
    // 3 · Ship & comfort
    shipSize: z.enum(shipSizes, { message: "Choose a ship size." }),
    cabin: z.enum(cabinTypes, { message: "Choose a cabin type." }),
    activities: z.array(z.enum(activityOptions)),
    // 4 · Who
    adults: z.coerce.number().int().min(1, "At least one adult.").max(20),
    children: z.coerce.number().int().min(0).max(10),
    childAges: z.string().max(100).optional(),
    mobility: z.string().max(500).optional(),
    seasickness: z.enum(seasickOptions, { message: "Tell us how you feel about the Drake." }),
    budget: z.enum(budgetBands.map((b) => b.id) as [string, ...string[]], { message: "Choose a budget band." }),
    // 5 · Contact
    name: z.string().trim().min(2, "Please tell us your name."),
    email: z.string().trim().email("Please enter a valid email."),
    phoneCode: z.string().trim().regex(/^\+\d{1,4}$/, "Use a code like +44."),
    phone: z.string().trim().regex(/^[\d\s()-]{6,20}$/, "Please enter a valid phone number."),
    contact: z.array(z.enum(contactMethods)).min(1, "Choose at least one way to reach you."),
    notes: z.string().max(2000).optional(),
    consent: z.literal(true, { message: "Please agree so we can contact you." }),
  })
  .refine((d) => d.children === 0 || (d.childAges ?? "").trim().length > 0, {
    message: "Please add the children's ages.",
    path: ["childAges"],
  });

export type PlannerInput = z.input<typeof plannerSchema>;
export type PlannerData = z.output<typeof plannerSchema>;

export const stepFields: (keyof PlannerInput)[][] = [
  ["months", "flexible", "tripLength"],
  ["routes"],
  ["shipSize", "cabin", "activities"],
  ["adults", "children", "childAges", "mobility", "seasickness", "budget"],
  ["name", "email", "phoneCode", "phone", "contact", "notes", "consent"],
];
