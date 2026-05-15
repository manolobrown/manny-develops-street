export type Workshop = {
  date: string;
  weekday: string;
  time: string;
  title: React.ReactNode;
  seats: string;
  price: string;
  state: "open" | "full" | "intensive";
  href: string;
};

export const WORKSHOPS: Workshop[] = [
  { date: "May 23", weekday: "Sat", time: "9:00 AM", title: "Doyers & the bend · Chinatown after light rain", seats: "6 / 8 seats", price: "$200", state: "open", href: "/contact?type=workshop&date=may-23" },
  { date: "Jun 06", weekday: "Sat", time: "9:00 AM", title: "Steam & shadow · 28th to 42nd, the long way", seats: "3 / 8 seats", price: "$200", state: "open", href: "/contact?type=workshop&date=jun-06" },
  { date: "Jun 20", weekday: "Sat", time: "9:00 AM", title: "Soho on a Saturday · the geometry of glass", seats: "Waitlist", price: "$200", state: "full", href: "/contact?type=workshop&date=jun-20" },
  { date: "Jul 11", weekday: "Sat", time: "9:00 AM", title: "Reflections workshop · 14th St., after a storm", seats: "8 / 8 seats", price: "$200", state: "open", href: "/contact?type=workshop&date=jul-11" },
  { date: "Jul 25", weekday: "Sat", time: "10 — 6", title: "Full day · One project, one neighborhood, from sunrise edit to dusk", seats: "5 seats", price: "$400", state: "intensive", href: "/contact?type=workshop&date=jul-25" },
  { date: "Aug 08", weekday: "Sat", time: "9:00 AM", title: "After Dark intro · Manhattan at sunset into night", seats: "8 / 8 seats", price: "$200", state: "open", href: "/contact?type=workshop&date=aug-08" },
  { date: "Aug 22", weekday: "Sat", time: "9:00 AM", title: "Reflections · pt. 2 — light rain forecast permitting", seats: "8 / 8 seats", price: "$200", state: "open", href: "/contact?type=workshop&date=aug-22" },
];
