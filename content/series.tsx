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
    image: "/images/photos/window.jpg",
    alt: "Through the Glass",
    frames: "250+",
    edit: "38 final",
    status: <em>Zine pending</em>,
    started: "Feb 2024",
  },
  {
    slug: "after-dark",
    number: "02",
    title: <>After <em>Dark</em></>,
    titleText: "After Dark",
    category: "Ongoing · Nights · Manhattan",
    description:
      "Manhattan after 10 PM, weeknights only. Less about neon — more about what's left of a block when the foot traffic clears.",
    image: "/images/photos/night.jpg",
    alt: "After Dark",
    frames: "86",
    edit: "22 final",
    status: <em>Active</em>,
    started: "Nov 2023",
  },
  {
    slug: "steam-city",
    number: "03",
    title: <>Steam <em>City</em></>,
    titleText: "Steam City",
    category: "Winter mornings · Midtown",
    description:
      "Steam vents between 28th and 42nd, January & February only. Industrial atmosphere, soft highlights, the city exhaling.",
    image: "/images/photos/steam.jpg",
    alt: "Steam City",
    frames: "72",
    edit: "18 final",
    status: <em>Seasonal</em>,
    started: "Jan 2024",
  },
  {
    slug: "shadow-play",
    number: "04",
    title: <>Shadow <em>Play</em></>,
    titleText: "Shadow Play",
    category: "Hard light · Tribeca / Chambers",
    description:
      "Geometry, when the angle of the sun does most of the work. The series I shoot when I want to think less and look more.",
    image: "/images/photos/shadow.jpg",
    alt: "Shadow Play",
    frames: "109",
    edit: "26 final",
    status: <em>Active</em>,
    started: "Apr 2023",
  },
  {
    slug: "reflections",
    number: "05",
    title: <em>Reflections</em>,
    titleText: "Reflections",
    category: "After rain · 14th St.",
    description:
      "A standing invitation to be out the door within forty minutes of a spring rainstorm ending. The puddles are the studio.",
    image: "/images/photos/reflection.jpg",
    alt: "Reflections",
    frames: "53",
    edit: "14 final",
    status: <em>Weather-gated</em>,
    started: "Apr 2024",
  },
  {
    slug: "white-out",
    number: "06",
    title: <>White <em>Out</em></>,
    titleText: "White Out",
    category: "Snow days · All boroughs",
    description:
      "One frame for every snowfall over two inches, in the same six locations, for as many winters as it takes. A project measured in seasons, not weeks.",
    image: "/images/photos/snow.jpg",
    alt: "White Out",
    frames: "29",
    edit: "11 final",
    status: <em>Multi-year</em>,
    started: "Jan 2023",
  },
];

export function findSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
