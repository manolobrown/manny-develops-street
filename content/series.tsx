export type SeriesFrame = {
  src: string;
  alt: string;
  caption?: string;
};

export type Series = {
  slug: string;
  number: string;
  title: React.ReactNode;
  titleText: string;
  category: string;
  description: string;
  longDescription?: string;
  image: string;
  alt: string;
  frames: string;
  edit: string;
  status: React.ReactNode;
  started: string;
  locations?: string[];
  years?: string;
  galleryFrames?: SeriesFrame[];
};

export const SERIES: Series[] = [
  {
    slug: "through-the-glass",
    number: "01",
    title: <>Through the <em>Glass</em></>,
    titleText: "Through the Glass",
    category: "Ongoing · Daily · Subway",
    description:
      "Two years of subway windows. The reflections, the framing, the lives passing through. The series that opens the brand — and the first zine, going to press in June 2026.",
    longDescription:
      "Started as a commute habit and turned into a discipline: one frame for every weekday ride, same camera, no editing on the train. The 38-photograph edit going into Vol. 01 was pulled from roughly 250 keepers across 14 months.",
    image: "/images/work/through-the-glass/through-the-glass-7.jpg",
    alt: "Through the Glass",
    frames: "Scoping",
    edit: "Pulling for Vol. 01",
    status: <em>Shooting</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/through-the-glass/through-the-glass.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-2.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-3.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-4.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-5.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-6.jpg", alt: "Through the Glass" },
      { src: "/images/work/through-the-glass/through-the-glass-8.jpg", alt: "Through the Glass" },
    ],
  },
  {
    slug: "after-dark",
    number: "02",
    title: <>After <em>Dark</em></>,
    titleText: "After Dark",
    category: "Ongoing · Nights · Manhattan",
    description:
      "Manhattan after 10 PM, weeknights only. Less about neon — more about what's left of a block when the foot traffic clears.",
    longDescription:
      "Started after a year of avoiding Manhattan at night and realizing the avoidance was the interesting part. Hard rules: 10 PM to 1 AM, weeknights only — weekends cover too easily — and roughly one frame in four survives the cull.",
    image: "/images/work/after-dark/after-dark-6.jpg",
    alt: "After Dark",
    frames: "Scoping",
    edit: "—",
    status: <em>Scoping</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/after-dark/after-dark.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-2.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-3.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-4.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-5.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-7.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-8.jpg", alt: "After Dark" },
      { src: "/images/work/after-dark/after-dark-9.jpg", alt: "After Dark" },
    ],
  },
  {
    slug: "steam-city",
    number: "03",
    title: <>Steam <em>City</em></>,
    titleText: "Steam City",
    category: "Winter mornings · Midtown",
    description:
      "Steam vents between 28th and 42nd, January & February only. Industrial atmosphere, soft highlights, the city exhaling.",
    longDescription:
      "A series that only exists from January 15 to February 28. Con Ed vents read cleanest below 25°F with no wind, so I scout from 6 AM most mornings and shoot whatever the air gives me between 28th and 42nd. Two winters in, the keeper rate has been steady at about one frame per outing.",
    image: "/images/work/steam-city/steam-city-2.jpg",
    alt: "Steam City",
    frames: "Scoping",
    edit: "—",
    status: <em>Scoping</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/steam-city/steam-city.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-3.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-4.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-5.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-6.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-7.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-8.jpg", alt: "Steam City" },
      { src: "/images/work/steam-city/steam-city-9.jpg", alt: "Steam City" },
    ],
  },
  {
    slug: "shadow-play",
    number: "04",
    title: <>Shadow <em>Play</em></>,
    titleText: "Shadow Play",
    category: "Hard light · Tribeca / Chambers",
    description:
      "Geometry, when the angle of the sun does most of the work. The series I shoot when I want to think less and look more.",
    longDescription:
      "Self-imposed rules keep the series honest: no people unless they pass through the frame the way a shadow would, no color editing past white balance, nothing that requires waiting more than ninety seconds for the light to do its thing. Two and a half years in, the keeper-to-final ratio sits around 4:1.",
    image: "/images/work/shadow-play/shadow-play-8.jpg",
    alt: "Shadow Play",
    frames: "Scoping",
    edit: "—",
    status: <em>Scoping</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/shadow-play/shadow-play.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-2.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-3.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-4.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-5.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-6.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-7.jpg", alt: "Shadow Play" },
      { src: "/images/work/shadow-play/shadow-play-9.jpg", alt: "Shadow Play" },
    ],
  },
  {
    slug: "reflections",
    number: "05",
    title: <em>Reflections</em>,
    titleText: "Reflections",
    category: "After rain · 14th St.",
    description:
      "A standing invitation to be out the door within forty minutes of a spring rainstorm ending. The puddles are the studio.",
    longDescription:
      "Forty-minute window after a spring rain stops, bag packed by the door from March through May. The forecast has produced more false alarms than actual outings — but 14th Street's bus lanes hold water better than anywhere else I've found in Manhattan, so most of the keepers are within four blocks of Union Square.",
    image: "/images/work/reflections/reflections-5.jpg",
    alt: "Reflections",
    frames: "Scoping",
    edit: "—",
    status: <em>Scoping</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/reflections/reflections.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-2.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-3.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-4.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-6.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-7.jpg", alt: "Reflections" },
      { src: "/images/work/reflections/reflections-8.jpg", alt: "Reflections" },
    ],
  },
  {
    slug: "white-out",
    number: "06",
    title: <>White <em>Out</em></>,
    titleText: "White Out",
    category: "Snow days · All boroughs",
    description:
      "One frame for every snowfall over two inches, in the same six locations, for as many winters as it takes. A project measured in seasons, not weeks.",
    longDescription:
      "Three in Manhattan, two in Brooklyn, one in the Bronx. The constraint is the point — same locations, same intent, only the weather changes — which makes the project read as a longitudinal study rather than a portfolio. Three winters in, the average is six frames per year and another decade before it's anything I'd want to print as a book.",
    image: "/images/work/white-out/white-out-5.jpg",
    alt: "White Out",
    frames: "Scoping",
    edit: "—",
    status: <em>Scoping</em>,
    started: "—",
    galleryFrames: [
      { src: "/images/work/white-out/white-out.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-2.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-3.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-4.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-6.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-7.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-8.jpg", alt: "White Out" },
      { src: "/images/work/white-out/white-out-9.jpg", alt: "White Out" },
    ],
  },
];

export function findSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
