import Link from "next/link";

type Column = { heading: string; items: Array<{ label: string; href?: string }> };

const COLUMNS: Column[] = [
  {
    heading: "Practice",
    items: [
      { label: "Personal work", href: "/work" },
      { label: "Zine & letter", href: "/#newsletter" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "Portraits", href: "/portraits" },
      { label: "Book a session", href: "/contact" },
      { label: "Press & credits", href: "/about" },
    ],
  },
  {
    heading: "Connect",
    items: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Sunday letter", href: "/#newsletter" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
  {
    heading: "Office",
    items: [
      { label: "New York, NY" },
      { label: "hi@mannydevelops.com" },
      { label: "Tue – Sat" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft px-pad pt-14 pb-8">
      <div className="flex items-center gap-5 border-b border-line-hair pb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line font-mono text-[14px] font-semibold">
          M·P
        </div>
        <div className="font-serif text-[22px] font-normal leading-[1.2]">
          Manuel Peña
          <br />
          <em className="text-[14px] font-light text-ink-2 not-italic [font-style:italic]">
            Photographer · NYC
          </em>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-9 border-b border-line-hair py-9 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-3">
              {col.heading}
            </h4>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {col.items.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-serif text-[16px] font-light text-ink transition-colors duration-[260ms] ease-editorial hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label} className="font-serif text-[16px] font-light text-ink">
                    {item.label}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
        <span>© {new Date().getFullYear()} Manuel Peña</span>
        <span>One eye. Two practices. One brand.</span>
        <span>v1.0 · Hybrid edition</span>
      </div>
    </footer>
  );
}
