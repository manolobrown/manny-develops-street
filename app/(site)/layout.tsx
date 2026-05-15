import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { StickyOptin } from "@/components/nav/StickyOptin";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <StickyOptin />
    </>
  );
}
