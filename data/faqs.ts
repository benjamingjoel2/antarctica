import type { Faq } from "./types";

const V = " (Verify with partner operators and IAATO before launch.)";

export const faqs: Faq[] = [
  {
    q: "How do I get to Ushuaia or Punta Arenas?",
    a: "Most travellers fly via Buenos Aires to Ushuaia, Argentina, or via Santiago to Punta Arenas, Chile. Domestic connections can be disrupted by weather, so we strongly recommend arriving at least a day before embarkation — many operators require it." + V,
    category: "getting-there",
    verify: true,
  },
  {
    q: "What are the entry requirements for Argentina and Chile?",
    a: "Requirements depend on your nationality. Many passport holders can visit visa-free for short stays, but rules change and some nationalities need a visa or electronic authorisation. Your passport should usually be valid for at least six months beyond your travel dates." + V,
    category: "getting-there",
    verify: true,
  },
  {
    q: "How rough is the Drake Passage, and will I get seasick?",
    a: "The Drake can be anything from a glassy 'Drake Lake' to a properly rough 'Drake Shake'. Modern stabilised ships help, and most people adapt within a day. Speak to your doctor about seasickness medication before you travel, and start it before you feel unwell.",
    category: "on-board",
    verify: true,
  },
  {
    q: "Should I fly over the Drake or sail across it?",
    a: "Flying from Punta Arenas to King George Island saves around four days at sea and avoids the crossing, but flights depend on weather and can be delayed. Sailing is the classic experience, usually less expensive and gives you time to watch seabirds and adjust to ship life. We'll help you weigh the trade-offs.",
    category: "planning",
    verify: true,
  },
  {
    q: "Does ship size affect how often I can land?",
    a: "Yes. Under IAATO guidelines, ships carrying more than 500 passengers cannot make landings, no more than 100 visitors may be ashore at a site at one time, and only one ship may visit a landing site at a time. Smaller ships cycle guests ashore faster, which usually means more time on land." + V,
    category: "planning",
    verify: true,
  },
  {
    q: "What are the IAATO landing rules?",
    a: "IAATO members follow site-specific guidelines covering visitor numbers, guide ratios, approach distances and where you may walk. Typically there is at least one guide for every 20 guests ashore, and you'll be briefed on the rules for each site before landing." + V,
    category: "environment",
    verify: true,
  },
  {
    q: "What's included in the price of an expedition?",
    a: "Usually your cabin, all meals on board, zodiac landings and cruises, the expedition team's guiding and lectures, and often a polar parka to keep and boots on loan. Flights to the embarkation port, hotel nights, insurance, gratuities and optional activities such as kayaking are typically extra." + V,
    category: "planning",
    verify: true,
  },
  {
    q: "What cabin types are available?",
    a: "Most ships offer shared cabins (triple or quad), standard twin cabins with a window or porthole, balcony staterooms and suites. Luxury ships are often all-suite. Cabin choice doesn't change your time ashore — everyone lands together in rotations.",
    category: "on-board",
    verify: true,
  },
  {
    q: "How fit do I need to be, and is there an age limit?",
    a: "You should be able to walk on uneven, slippery ground and step in and out of a zodiac with help from the crew. Minimum ages vary by operator, and some activities such as kayaking or camping carry their own age limits. Many operators have no upper age limit but may require a medical declaration." + V,
    category: "health",
    verify: true,
  },
  {
    q: "Are there medical requirements?",
    a: "Most operators require a medical form completed and signed by your doctor before departure, because ships are far from hospitals and evacuation is difficult. Ships carry a doctor and a small medical centre, but treatment options are limited." + V,
    category: "health",
    verify: true,
  },
  {
    q: "Do I need special travel insurance?",
    a: "Yes. Operators typically make comprehensive travel, medical and emergency evacuation insurance mandatory. Required coverage amounts vary, but evacuation cover of US$200,000 or more is common. Check that your policy explicitly covers travel to Antarctica." + V,
    category: "health",
    verify: true,
  },
  {
    q: "What should I pack, and what gear is provided?",
    a: "Pack layers: thermal base layers, fleece or down mid-layers, waterproof over-trousers, warm gloves, a hat, a buff and sunglasses. Many operators provide a polar parka and lend waterproof boots, but check what your ship includes." + V,
    category: "planning",
    verify: true,
  },
  {
    q: "Any photography tips for Antarctica?",
    a: "Bring more storage and batteries than you think you'll need, and keep spares warm in an inside pocket. Snow fools camera meters, so expose slightly brighter than your camera suggests. A dry bag protects gear in the zodiacs. Drones are generally restricted and usually need advance permission." + V,
    category: "on-board",
    verify: true,
  },
  {
    q: "What environmental rules will I need to follow?",
    a: "Before every landing, boots, clothing and bags are cleaned and checked to prevent introducing non-native species. Ashore, keep at least 5 m (15 ft) from wildlife — more for seals and for animals that react to you — never feed animals, take nothing away and leave nothing behind." + V,
    category: "environment",
    verify: true,
  },
];
