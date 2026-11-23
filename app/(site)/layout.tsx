import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { StickyOptin } from "@/components/nav/StickyOptin";
import { OriginTracker } from "@/components/photo/OriginTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <StickyOptin />
      <OriginTracker />
    </>
  );
}
