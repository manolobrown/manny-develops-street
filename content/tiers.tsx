export type Tier = {
  letter: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    letter: "A.",
    name: "Essentials",
    description: "For the LinkedIn refresh that lasts three years.",
    price: "1,495",
    features: [
      "90-minute session",
      "One location, your call",
      "One outfit, one mood",
      "12 edited frames",
      "Light retouching",
      "10-day turnaround",
    ],
    cta: { label: "Book Essentials", href: "/contact?tier=essentials" },
  },
  {
    letter: "B.",
    name: "Signature",
    description: "For the founder profile, the speaker bio, the book jacket.",
    price: "2,995",
    features: [
      "Half-day session",
      "Two locations",
      "Three outfits, three moods",
      "30 edited frames",
      "Full retouching",
      "Hair & makeup partner referral",
      "10-day turnaround",
    ],
    cta: { label: "Book Signature", href: "/contact?tier=signature" },
    featured: true,
  },
  {
    letter: "C.",
    name: "Executive",
    description: "For the annual report, the team page, the press kit at scale.",
    price: "5,500",
    features: [
      "Full day, on or off location",
      "Up to 6 sitters · team coverage",
      "Stylist + MUA included",
      "60 edited frames",
      "Full retouching · b/w & color",
      "Licensing for editorial & web",
      "10-day turnaround",
    ],
    cta: { label: "Book Executive", href: "/contact?tier=executive" },
  },
];

export type ProcessStep = {
  letter: string;
  title: React.ReactNode;
  description: string;
  when: string;
};

export const PROCESS: ProcessStep[] = [
  {
    letter: "A · 01",
    title: <>Sales <em>call</em></>,
    description:
      "Thirty minutes, coffee, in person if you're in the city. No camera, no contract — just enough to know whether we should make pictures together.",
    when: "30 min · Free",
  },
  {
    letter: "B · 02",
    title: <>Pre-<em>shoot</em></>,
    description:
      "I scout the location, you pick the outfits, we agree on the brief. A one-pager goes out by email two days before the session.",
    when: "Week of · ~3 hrs",
  },
  {
    letter: "C · 03",
    title: <em>Session</em>,
    description:
      "On location — your office, a rooftop, a coffee shop, a walk between meetings. One light, one camera, room to breathe. You see frames as we go.",
    when: "90 min — full day",
  },
  {
    letter: "D · 04",
    title: <em>Delivery</em>,
    description:
      "Edited frames in a private gallery within 10 working days. You pick favorites, I do the final retouch, files in your inbox.",
    when: "10 working days",
  },
];

export type Faq = { q: string; a: React.ReactNode };

export const FAQS: Faq[] = [
  {
    q: "Why does a street photographer take portrait clients?",
    a: "Because the eye is the same eye. The street work trains me to see real moments fast; the portrait clients hire me because they want portraits that feel like real moments. Two outputs, one practice.",
  },
  {
    q: "Will you do my LinkedIn headshot in front of a grey backdrop?",
    a: "I will not. Essentials still gets you a sharp, professional, modern headshot — but shot on location, with natural light and the city in the background. If you want the grey backdrop, I'll happily refer you.",
  },
  {
    q: "How far ahead do I need to book?",
    a: "Essentials & Signature: 3–5 weeks out. Executive: 6–8 weeks, especially if you want a stylist & MUA secured. Editorial rush rates available — ask.",
  },
  {
    q: "Do you shoot teams, or just individuals?",
    a: "Both. The Executive tier covers up to 6 sitters in one day, on location. For larger team days (8+ sitters) we'll build a custom quote — usually $7,500 – $12,000 depending on locations and travel.",
  },
  {
    q: "Can my company pay through invoicing?",
    a: "Yes. I'm an LLC, fully insured, and invoice through Honeybook with net-15 terms. W-9 on request before booking.",
  },
  {
    q: "Where do you actually shoot?",
    a: "Most often: your office (if there's good window light), the West Side piers, Tribeca rooftops, Chinatown side streets, the Brooklyn Bridge approach. We pick during the sales call.",
  },
];

export const PORTRAITS_SAMPLES = [
  "/images/photos/wedding-5.jpg",
  "/images/photos/wedding-9.jpg",
  "/images/photos/wedding-11.jpg",
  "/images/photos/wedding-7.jpg",
  "/images/photos/wedding-4.jpg",
  "/images/photos/wedding-13.jpg",
  "/images/photos/wedding-8.jpg",
  "/images/photos/wedding-15.jpg",
  "/images/photos/wedding-12.jpg",
];
