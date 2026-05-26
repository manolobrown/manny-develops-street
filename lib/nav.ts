export type NavItem = { label: string; href: string };

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Portraits", href: "/portraits" },
  // { label: "Workshops", href: "/workshops" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SECTION_NUMBERS: Record<string, string> = {
  "/": "01",
  "/work": "02",
  "/portraits": "03",
  "/workshops": "04",
  "/shop": "04",
  "/about": "05",
  "/contact": "06",
};
