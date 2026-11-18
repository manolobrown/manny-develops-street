import { NotFound } from "@/components/ui/NotFound";

export default function JournalPostNotFound() {
  return (
    <NotFound
      what="Journal"
      title="That entry isn't here."
      body="The address doesn't match a letter or essay in the journal. It may have been renamed, or never published."
      href="/journal"
      cta="Browse the journal"
    />
  );
}
