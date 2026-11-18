import { NotFound } from "@/components/ui/NotFound";

export default function SeriesNotFound() {
  return (
    <NotFound
      what="Work"
      title="That series isn't here."
      body="The address doesn't match any of the six series. It may have been renamed."
      href="/work"
      cta="See all six series"
    />
  );
}
