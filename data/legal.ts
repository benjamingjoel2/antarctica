/** Privacy policy, booking terms and cookie policy (English source; translations in i18n/). Plain text; [text](/path) becomes a link. A lawyer should review these before launch. */
export type LegalDoc = { title: string; description: string; sections: { h: string; p: string[] }[] };

export const legalUpdated = "30 October 2026";

export const privacy: LegalDoc = {
  "title": "Privacy policy",
  "description": "How Seventh Continent collects, uses and protects the personal details you send us.",
  "sections": [
    {
      "h": "Who we are",
      "p": [
        "This website is run by Seventh Continent, Avenida Coronel Niceto Vega 4736, Palermo, Buenos Aires, Argentina. In this policy \"we\", \"us\" and \"our\" mean Seventh Continent.",
        "For anything about your personal data, email seventhcontinent@tourground.com."
      ]
    },
    {
      "h": "What we collect",
      "p": [
        "Only what you choose to send us: through the enquiry form, through the expedition planner, your name, email address, phone number, how you prefer to be contacted, travel dates, the size of your party, your interests, budget and notes; through the newsletter form, your email address. If you write to us by email, we keep that correspondence.",
        "If you book, we also collect what is needed to arrange the trip, such as the names of everyone travelling, dates of birth and passport details where suppliers require them, dietary and access needs, and emergency contacts.",
        "Please do not send payment card details or detailed health information by email or through the form."
      ]
    },
    {
      "h": "Why we use it",
      "p": [
        "To answer your enquiry, plan a trip with you and, if you go ahead, book and run it. The legal basis is the steps you ask us to take before entering into a contract, the performance of that contract, your consent where we ask for it, and our legitimate interest in replying to people who contact us.",
        "We do not sell your details, and we only send you news or offers if you ask us to."
      ]
    },
    {
      "h": "Who we share it with",
      "p": [
        "Your enquiry reaches us through our own website server (hosted by Vercel Inc., United States), which forwards it to our inbox.",
        "If you book, we share only what is needed with the hotels, lodges, transport companies, guides and local partners in Antarctica and its gateway countries (usually Argentina or Chile) who deliver your trip, and with your travel insurer if you ask us to. Some of them are outside your own country; where that is the case, we share the minimum needed to deliver the service you have asked for.",
        "We may also disclose information where the law requires it."
      ]
    },
    {
      "h": "Cookies and local storage",
      "p": [
        "We do not run analytics, personalisation or marketing cookies. If we add any in future, they will only load after you allow them in the cookie settings. See the [cookie policy](/cookies/) for what the site stores in your browser."
      ]
    },
    {
      "h": "How long we keep it",
      "p": [
        "We keep enquiries that do not become a booking for 24 months from our last contact, then delete them. Booking records are kept for as long as accounting and consumer law require, usually six years after the trip."
      ]
    },
    {
      "h": "How we protect it",
      "p": [
        "Your details are kept in password-protected email and file storage that only the people planning your trip can reach. The website is served over an encrypted connection (HTTPS)."
      ]
    },
    {
      "h": "Your rights",
      "p": [
        "You can ask to see the personal data we hold about you, to correct or delete it, to restrict or object to how we use it, to receive a copy in a portable format, or to withdraw your consent at any time. Email seventhcontinent@tourground.com and we will reply within one month.",
        "If you are unhappy with how we handle your data, please tell us first so that we can put it right. You also have the right to complain to the data-protection authority in the country where you live."
      ]
    },
    {
      "h": "Changes to this policy",
      "p": [
        "We will update this page if the way we use personal data changes. Last updated 30 October 2026."
      ]
    }
  ]
};

export const terms: LegalDoc = {
  "title": "Booking terms",
  "description": "The terms that apply when you enquire about, and book, a tailor-made trip with Seventh Continent.",
  "sections": [
    {
      "h": "About these terms",
      "p": [
        "These terms apply to every trip planned by Seventh Continent, Avenida Coronel Niceto Vega 4736, Palermo, Buenos Aires, Argentina. Please read them before you book. Your written quote and booking confirmation form part of the contract, together with these terms.",
        "Everything on this website, including itineraries, timings, seasons and experiences, describes the kind of trip we plan. It is not an offer you can accept."
      ]
    },
    {
      "h": "Enquiries and quotes",
      "p": [
        "Sending an enquiry is free and creates no obligation for you or for us.",
        "We reply with ideas and questions, then shape the trip with you. When it is right, we send a written quote. A quote is valid for the period stated on it. Prices for flights, accommodation and services can change until the trip is confirmed, and we will tell you before you commit if they do."
      ]
    },
    {
      "h": "Booking and payment",
      "p": [
        "Your booking is confirmed when you accept the quote in writing, pay the deposit stated on it, and we send you a written confirmation. The person who makes the booking accepts these terms for everyone travelling and must be 18 or over.",
        "The balance is due by the date shown on your quote and confirmation. If it is not paid on time, we may treat the booking as cancelled by you, and the cancellation charges below apply."
      ]
    },
    {
      "h": "Changes by you",
      "p": [
        "If you want to change your trip after it is confirmed, tell us in writing. We will do our best to help. Changes are not always possible, and any extra costs charged by suppliers, plus a reasonable fee for our time, will be passed on to you."
      ]
    },
    {
      "h": "Cancellation by you",
      "p": [
        "You can cancel at any time by telling us in writing. The deposit is non-refundable. The closer to departure you cancel, the higher the charge, up to the full cost of the trip, because accommodation, transport and other services are reserved and paid for on your behalf. The charges that apply to your trip are set out on your quote and confirmation.",
        "Travel insurance may cover cancellation charges in some circumstances."
      ]
    },
    {
      "h": "Changes and cancellation by us",
      "p": [
        "We plan carefully, but sometimes we have to change part of a trip, for example because of weather, road or route closures, or a supplier that cannot honour a booking. We will tell you as soon as possible and offer a comparable alternative.",
        "If we have to make a significant change or cancel your trip, you can accept the change, take a comparable alternative if one is available, or cancel and receive a full refund of the money you have paid us."
      ]
    },
    {
      "h": "Events beyond anyone's control",
      "p": [
        "We are not liable for changes, delays or cancellations caused by events beyond our reasonable control, such as war or threat of war, civil unrest, natural disaster, epidemics, government action, airport or border closures, or severe weather. Where such an event affects your trip, we will help you make other arrangements and pass on any refunds we receive from suppliers."
      ]
    },
    {
      "h": "Travel insurance",
      "p": [
        "Comprehensive travel insurance is a condition of booking. It must cover medical treatment, repatriation and cancellation, and any activities in your trip. Please send us your policy details before you travel."
      ]
    },
    {
      "h": "Passports, visas and health",
      "p": [
        "You are responsible for holding a valid passport, any visas or travel authorisations, and any vaccinations or health documents required for Antarctica and its gateway countries (usually Argentina or Chile) and for any country you pass through. Entry rules change, so check them with the relevant embassy and your government's travel advice before you book and again before you travel.",
        "Please tell us before booking about any medical condition or mobility need that could affect your trip, so that we can plan around it."
      ]
    },
    {
      "h": "Your responsibilities",
      "p": [
        "Please follow local laws and customs, the instructions of guides, drivers, crews and other suppliers, and the safety advice we give you. We may end the trip of anyone whose behaviour puts others at risk or causes serious disruption, without refund."
      ]
    },
    {
      "h": "Our liability",
      "p": [
        "We take reasonable care in planning and arranging your trip. We are not liable for loss, injury or damage caused by you, by someone not connected with the trip, or by events beyond our reasonable control.",
        "Where airlines, hotels and other transport companies are concerned, our liability is limited in the same way as theirs is under the international conventions that apply to them. Nothing in these terms limits our liability for death or personal injury caused by our negligence, or any liability that cannot be limited by law."
      ]
    },
    {
      "h": "Complaints",
      "p": [
        "If something is not right during your trip, tell us straight away so that we can try to fix it on the spot. If it cannot be resolved, please write to seventhcontinent@tourground.com within 28 days of your return and we will reply promptly."
      ]
    },
    {
      "h": "Governing law",
      "p": [
        "These terms are governed by the law that applies to the contract you make with us, as set out in your booking confirmation. You may also have the protection of the consumer law of the country where you live."
      ]
    }
  ]
};

export const cookies: LegalDoc = {
  "title": "Cookie policy",
  "description": "Which cookies and similar storage the Seventh Continent website uses, and how to control them.",
  "sections": [
    {
      "h": "Short version",
      "p": [
        "We do not run analytics, personalisation or marketing cookies. If we add any in future, they will only load after you allow them in the cookie settings. The only cookies this website sets itself are the strictly necessary ones listed below."
      ]
    },
    {
      "h": "What the site stores in your browser",
      "p": [
        "Your cookie choices are saved in local storage under sc-consent-v1 and mirrored in a first-party cookie, sc_consent, for 180 days, so we do not ask again. If you change the display currency, your choice is saved in local storage under sc-currency. If you start the [expedition planner](/plan-my-expedition), your answers are saved in local storage under sc-planner-v1 so you can come back to them. They stay on your device until you submit the planner, and are cleared when you do. If you switch on penguin mode, that choice is saved in local storage under sc-penguin.",
        "Fonts are served from this website. Photos load from our image delivery provider, which receives your browser's IP address in order to deliver them."
      ]
    },
    {
      "h": "Consent",
      "p": [
        "Anything listed above is strictly necessary for a feature you choose to use, so it does not need your consent. We will not add analytics or advertising cookies without asking you first."
      ]
    },
    {
      "h": "How to remove it or change your mind",
      "p": [
        "You can clear this site's stored data at any time in your browser's settings (usually under Privacy, then Cookies and site data)."
      ]
    },
    {
      "h": "Contact",
      "p": [
        "Questions about this policy: email seventhcontinent@tourground.com."
      ]
    }
  ]
};

