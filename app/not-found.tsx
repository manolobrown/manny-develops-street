import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { NotFound } from "@/components/ui/NotFound";

// Any unknown address, outside the (site) group, still gets the site's nav and footer.
export default function RootNotFound() {
  return (
    <>
      <Nav />
      <main>
        <NotFound
          what="Manuel Peña"
          title="That page isn't here."
          body="The address may be from the old site, or it may have moved. The work, journal and shop are all a click away."
          href="/work"
          cta="See the work"
        />
      </main>
      <Footer />
    </>
  );
}
