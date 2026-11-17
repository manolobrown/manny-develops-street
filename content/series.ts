// Series + frames. Pixel dimensions and blur placeholders come from
// content/photos.generated.json (see scripts/build-photos.mjs) — this file
// holds only the editorial layer.
//
// Frame catalogue numbers come from the filename (`after-dark-4.jpg` → 04,
// `after-dark.jpg` → 01) so they stay stable when the sequence is reordered.
// Array order = the order the series is shown in.
//
// TODO(manny): fill in `place` and `year` per frame (the source JPGs carry no
// EXIF), and real `started` years per series. Anything left undefined is
// simply hidden in the UI.

export type FrameInput = {
  file: string;
  alt: string;
  caption?: string;
  place?: string;
  year?: string;
};

export type Series = {
  slug: string;
  number: string;
  /** Short catalogue prefix shown on every frame: TTG·07 */
  code: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  /** Filename (within the series folder) used as the cover. */
  cover: string;
  status: string;
  edit?: string;
  started?: string;
  frames: FrameInput[];
};

export const SERIES: Series[] = [
  {
    slug: "through-the-glass",
    number: "01",
    code: "TTG",
    title: "Through the Glass",
    category: "Ongoing · Daily · Subway",
    description:
      "Two years of subway windows. The reflections, the framing, the lives passing through. The series that opens the brand — and the first zine.",
    longDescription:
      "Started as a commute habit and turned into a discipline: one frame for every weekday ride, same camera, no editing on the train. The 38-photograph edit going into Vol. 01 was pulled from roughly 250 keepers across 14 months.",
    cover: "through-the-glass-7.jpg",
    status: "Shooting",
    edit: "Pulling for Vol. 01",
    frames: [
      { file: "through-the-glass-7.jpg", alt: "A man in a dark coat stands behind the scratched glass doors of an uptown subway entrance at night." },
      { file: "through-the-glass.jpg", alt: "A man in a fedora and overcoat seen through the window of a vintage subway car." },
      { file: "through-the-glass-2.jpg", alt: "A woman in silhouette holds a cigarette behind a fogged, graffiti-scrawled window." },
      { file: "through-the-glass-3.jpg", alt: "A child in a rainbow scarf presses against the window of a riveted green train car while an adult films beside him." },
      { file: "through-the-glass-4.jpg", alt: "A woman in a dark dress, hand on hip, framed by the open door of a vintage subway car." },
      { file: "through-the-glass-5.jpg", alt: "A rider on the phone seen through the small rounded window of a subway car door." },
      { file: "through-the-glass-6.jpg", alt: "A woman looks out from a car window as the city skyline reflects across the glass." },
      { file: "through-the-glass-8.jpg", alt: "A lone diner at a white tablecloth, seen through a tall dark window frame." },
    ],
  },
  {
    slug: "after-dark",
    number: "02",
    code: "ADK",
    title: "After Dark",
    category: "Ongoing · Nights · Manhattan",
    description:
      "Manhattan after 10 PM, weeknights only. Less about neon — more about what's left of a block when the foot traffic clears.",
    longDescription:
      "Started after a year of avoiding Manhattan at night and realizing the avoidance was the interesting part. Hard rules: 10 PM to 1 AM, weeknights only — weekends cover too easily — and roughly one frame in four survives the cull.",
    cover: "after-dark-6.jpg",
    status: "Active",
    frames: [
      { file: "after-dark-6.jpg", alt: "A cherry-red 1950s Chevrolet parked under streetlights, passengers lit inside." },
      { file: "after-dark.jpg", alt: "Two riders on a scooter wait at a green light beneath the Manhattan Bridge at dusk." },
      { file: "after-dark-2.jpg", alt: "A man in a cap silhouetted against a glowing red neon leather-shop sign." },
      { file: "after-dark-3.jpg", alt: "String lights over a quiet downtown street at blue hour, a lone pedestrian on the corner." },
      { file: "after-dark-4.jpg", alt: "A cyclist rides down a dark tree-lined street toward green traffic lights." },
      { file: "after-dark-5.jpg", alt: "A man in a suit stands in a lit doorway beside a red door on a dark block." },
      { file: "after-dark-7.jpg", alt: "A woman in a pleated mustard skirt crosses a wet crosswalk, taillights blurred behind her." },
      { file: "after-dark-8.jpg", alt: "Warm light through textured glass panes, a figure barely visible inside." },
      { file: "after-dark-9.jpg", alt: "A man waits beside a shuttered food cart under a red and green LED sign." },
    ],
  },
  {
    slug: "steam-city",
    number: "03",
    code: "STM",
    title: "Steam City",
    category: "Winter mornings · Midtown",
    description:
      "Steam vents between 28th and 42nd, January & February only. Industrial atmosphere, soft highlights, the city exhaling.",
    longDescription:
      "A series that only exists from January 15 to February 28. Con Ed vents read cleanest below 25°F with no wind, so I scout from 6 AM most mornings and shoot whatever the air gives me between 28th and 42nd. Two winters in, the keeper rate has been steady at about one frame per outing.",
    cover: "steam-city-2.jpg",
    status: "Seasonal",
    frames: [
      { file: "steam-city-2.jpg", alt: "A truck's flashing lights glow orange through a cloud of street steam." },
      { file: "steam-city.jpg", alt: "A red traffic light hangs in a sky filled with billowing steam." },
      { file: "steam-city-3.jpg", alt: "Commuters in winter coats cross a manhole cover as steam rises around their legs." },
      { file: "steam-city-4.jpg", alt: "Low view of pedestrians striding through vent steam on a Midtown sidewalk." },
      { file: "steam-city-5.jpg", alt: "Three people in heavy coats walk out of a dense wall of steam under city lights." },
      { file: "steam-city-6.jpg", alt: "A man stands on a bench in a plaza as steam pours from an orange-striped vent stack." },
      { file: "steam-city-7.jpg", alt: "Steam drifts past a traffic light and street sign against a bright blue sky." },
      { file: "steam-city-8.jpg", alt: "A silhouetted man crosses a zebra crosswalk through a column of white steam." },
      { file: "steam-city-9.jpg", alt: "Only the legs of a walker show beneath a thick cloud of steam on an empty corner." },
    ],
  },
  {
    slug: "shadow-play",
    number: "04",
    code: "SHP",
    title: "Shadow Play",
    category: "Hard light · Tribeca / Chambers",
    description:
      "Geometry, when the angle of the sun does most of the work. The series I shoot when I want to think less and look more.",
    longDescription:
      "Self-imposed rules keep the series honest: no people unless they pass through the frame the way a shadow would, no color editing past white balance, nothing that requires waiting more than ninety seconds for the light to do its thing. Two and a half years in, the keeper-to-final ratio sits around 4:1.",
    cover: "shadow-play-8.jpg",
    status: "Active",
    frames: [
      { file: "shadow-play-8.jpg", alt: "Three silhouetted dancers with red fans perform on a fog-bound waterfront promenade." },
      { file: "shadow-play.jpg", alt: "A man in a dark coat walks along a shadowed wall, a sliver of sunlight at his feet." },
      { file: "shadow-play-2.jpg", alt: "A figure stands in deep shadow beneath a staircase striped with red and pink light." },
      { file: "shadow-play-3.jpg", alt: "Two silhouettes beneath a cluster of orange balloons against a glass tower." },
      { file: "shadow-play-4.jpg", alt: "A traffic officer in silhouette stands before a hot-pink building in hard light." },
      { file: "shadow-play-5.jpg", alt: "Shoppers silhouetted behind a foggy plastic curtain at a fish market." },
      { file: "shadow-play-6.jpg", alt: "A thin band of late sun cuts across a dark street, catching a single pedestrian." },
      { file: "shadow-play-7.jpg", alt: "Two warm pendant lamps glow inside a dim shopfront window, a figure seated beneath." },
      { file: "shadow-play-9.jpg", alt: "A woman photographing with a phone steps through a diagonal of sun across a parking garage door." },
    ],
  },
  {
    slug: "reflections",
    number: "05",
    code: "RFL",
    title: "Reflections",
    category: "After rain · 14th St.",
    description:
      "A standing invitation to be out the door within forty minutes of a spring rainstorm ending. The puddles are the studio.",
    longDescription:
      "Forty-minute window after a spring rain stops, bag packed by the door from March through May. The forecast has produced more false alarms than actual outings — but 14th Street's bus lanes hold water better than anywhere else I've found in Manhattan, so most of the keepers are within four blocks of Union Square.",
    cover: "reflections-5.jpg",
    status: "Weather-gated",
    frames: [
      { file: "reflections-5.jpg", alt: "Two small figures in a long white arched corridor, mirrored down a glass seam." },
      { file: "reflections.jpg", alt: "A walker on a waterfront railing doubled in a puddle beneath the Brooklyn Bridge." },
      { file: "reflections-2.jpg", alt: "A brass manhole cover glowing gold in a rain-soaked street." },
      { file: "reflections-3.jpg", alt: "Two pedestrians mirrored in a storefront window on a sunny street corner." },
      { file: "reflections-4.jpg", alt: "A man in a green jacket reflected in a scooter mirror over wet asphalt." },
      { file: "reflections-6.jpg", alt: "A brick building with fire escapes reflected upside down in a rooftop puddle." },
      { file: "reflections-7.jpg", alt: "A man walks past a mural of a girl with a red balloon, both mirrored in a puddle." },
      { file: "reflections-8.jpg", alt: "Long striped shadows of pedestrians on a sunlit walkway, doubled in a glass wall." },
    ],
  },
  {
    slug: "white-out",
    number: "06",
    code: "WHO",
    title: "White Out",
    category: "Snow days · All boroughs",
    description:
      "One frame for every snowfall over two inches, in the same six locations, for as many winters as it takes. A project measured in seasons, not weeks.",
    longDescription:
      "Three in Manhattan, two in Brooklyn, one in the Bronx. The constraint is the point — same locations, same intent, only the weather changes — which makes the project read as a longitudinal study rather than a portfolio. Three winters in, the average is six frames per year and another decade before it's anything I'd want to print as a book.",
    cover: "white-out-5.jpg",
    status: "Multi-year",
    frames: [
      { file: "white-out-5.jpg", alt: "A cyclist rides past a red-painted brick building in falling snow." },
      { file: "white-out.jpg", alt: "A road worker holding a SLOW sign talks with an older man in a snowstorm." },
      { file: "white-out-2.jpg", alt: "A parent and child in red cross a snow-covered avenue lined with brownstones." },
      { file: "white-out-3.jpg", alt: "A street vendor in a white apron stands by his cart in heavy snow." },
      { file: "white-out-4.jpg", alt: "Looking down on a snowy intersection, a lone pedestrian beneath yellow traffic lights." },
      { file: "white-out-6.jpg", alt: "Two hooded walkers mirrored in a glass facade on a snowy morning." },
      { file: "white-out-7.jpg", alt: "Blowing snow across a wide empty avenue, a single figure in the distance." },
      { file: "white-out-8.jpg", alt: "Steam rises past the vertical New Yorker hotel sign on a winter day." },
      { file: "white-out-9.jpg", alt: "Dozens of pigeons gathered on cold stone steps." },
    ],
  },
];

export function findSeries(slug: string): Series | undefined {
  return SERIES.find((s) => s.slug === slug);
}
