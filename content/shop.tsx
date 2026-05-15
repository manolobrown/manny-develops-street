export type Print = {
  id: string;
  image: string;
  alt: string;
  collection: string;
  collectionLabel: string;
  title: string;
  edition: string;
  sizes: string[];
  price: string;
};

export const PRINTS: Print[] = [
  { id: "P-001", image: "/images/photos/window.jpg", alt: "Through the Glass · Vol. 01", collection: "glass", collectionLabel: "Through the Glass", title: "Through the Glass · Vol. 01.", edition: "Open edition", sizes: ["8×10", "11×14", "16×20"], price: "$95" },
  { id: "P-002", image: "/images/photos/shadow.jpg", alt: "Shadow Play · Chambers", collection: "shadow", collectionLabel: "Shadow Play", title: "Shadow Play · Chambers.", edition: "Open edition", sizes: ["8×10", "11×14", "16×20"], price: "$95" },
  { id: "P-003", image: "/images/photos/steam.jpg", alt: "Steam, 5th & 28th", collection: "steam", collectionLabel: "Steam City", title: "Steam, 5th & 28th.", edition: "Open edition", sizes: ["11×14", "16×20", "24×36"], price: "$110" },
  { id: "P-004", image: "/images/photos/subway.jpg", alt: "Subway, 8:47 AM", collection: "glass", collectionLabel: "Through the Glass", title: "Subway, 8:47 AM.", edition: "Open edition", sizes: ["8×10", "11×14", "16×20"], price: "$95" },
  { id: "P-005", image: "/images/photos/night-4.jpg", alt: "Chevy, Mount Sinai", collection: "afterdark", collectionLabel: "After Dark", title: "Chevy, Mount Sinai.", edition: "Limited / 25", sizes: ["11×14", "16×20"], price: "$165" },
  { id: "P-006", image: "/images/photos/reflection.jpg", alt: "Reflections · 14th St.", collection: "reflections", collectionLabel: "Reflections", title: "Reflections · 14th St.", edition: "Limited / 25", sizes: ["11×14", "16×20"], price: "$165" },
  { id: "P-007", image: "/images/photos/night.jpg", alt: "Doyers St., after dark", collection: "afterdark", collectionLabel: "After Dark", title: "Doyers St., after dark.", edition: "Limited / 25", sizes: ["11×14", "16×20", "24×36"], price: "$165" },
  { id: "P-008", image: "/images/photos/snow.jpg", alt: "White Out, January", collection: "whiteout", collectionLabel: "White Out", title: "White Out, January.", edition: "Seasonal / 30", sizes: ["8×10", "11×14", "16×20"], price: "$125" },
  { id: "P-009", image: "/images/photos/red.jpg", alt: "Red, July", collection: "red", collectionLabel: "Red", title: "Red, July.", edition: "Limited / 15", sizes: ["11×14", "16×20"], price: "$195" },
];

export const PRINT_FILTERS = [
  { key: "all", label: "All" },
  { key: "glass", label: "Through the Glass" },
  { key: "afterdark", label: "After Dark" },
  { key: "shadow", label: "Shadow Play" },
  { key: "steam", label: "Steam City" },
  { key: "reflections", label: "Reflections" },
  { key: "red", label: "Red" },
  { key: "whiteout", label: "White Out" },
] as const;

export type Preset = {
  number: string;
  name: string;
  source: string;
  description: string;
  image: string;
  accent: string;
};

export const PRESETS: Preset[] = [
  { number: "01", name: "Street Classic", source: "Built from 340 best-photos captures.", description: "Your signature look — moody highlights, lifted shadows, classic NYC.", image: "/images/presets/01_Street_Classic.png", accent: "#E0CFA8" },
  { number: "02", name: "Shadow Play", source: "Built from 88 shadow captures.", description: "Deep blacks and drama — pairs with alleys, fire escapes, hard light.", image: "/images/presets/02_Shadow_Play.png", accent: "#B5A47C" },
  { number: "03", name: "NYC Golden", source: "Built from 286 golden-hour captures.", description: "Warm afternoon light, tuned to 5 – 7pm captures.", image: "/images/presets/03_NYC_Golden.png", accent: "#E4B767" },
  { number: "04", name: "Subway Moody", source: "Built from 96 subway captures.", description: "Extra clarity and dehaze, built for fluorescent + tungsten underground.", image: "/images/presets/04_Subway_Moody.png", accent: "#5E6B7A" },
  { number: "05", name: "Rainy Day", source: "Built from 37 umbrella captures.", description: "Cool mood and reflections — for wet streets and overcast light.", image: "/images/presets/05_Rainy_Day.png", accent: "#7A98B4" },
  { number: "06", name: "Neon Nights", source: "Built from 148 night captures.", description: "Saturated, dehazed, vibrant — for after-dark city color.", image: "/images/presets/06_Neon_Nights.png", accent: "#C7456F" },
  { number: "07", name: "Steam City", source: "Built from 57 steam captures.", description: "Industrial atmosphere — soft highlights, grain, gentle haze.", image: "/images/presets/07_Steam_City.png", accent: "#A8A39A" },
  { number: "08", name: "Red Pop", source: "Built from 23 red-accent captures.", description: "Selective color punch — desaturates everything except reds.", image: "/images/presets/08_Red_Pop.png", accent: "#D7322C" },
  { number: "09", name: "Snow Day", source: "Built from 21 snow captures.", description: "Bright and clean cold — built for winter and overcast captures.", image: "/images/presets/09_Snow_Day.png", accent: "#C7D1DC" },
  { number: "10", name: "Film Fade", source: "Built from 101 LFI gallery captures.", description: "Muted analog tones with heavier grain — inspired by my Leica gallery.", image: "/images/presets/10_Film_Fade.png", accent: "#BFA487" },
];
