// The @modal slot renders the photo viewer over the series page when a frame
// is opened from the gallery (intercepted route). Direct visits to
// /work/[slug]/[frame] render the full-page viewer instead.
export default function SeriesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
