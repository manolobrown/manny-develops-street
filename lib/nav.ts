export type NavItem = { label: string; href: string };

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Journal", href: "/journal" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SECTION_NUMBERS: Record<string, string> = {
  "/": "01",
  "/work": "02",
  "/journal": "03",
  "/shop": "04",
  "/about": "05",
  "/contact": "06",
};
