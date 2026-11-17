import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/photos";

type Props = {
  photo: Pick<PhotoData, "src" | "width" | "height" | "blurDataURL" | "alt">;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Override alt, e.g. "" when the surrounding link already names the photo. */
  alt?: string;
};

/**
 * Every photograph on the site goes through this: real intrinsic dimensions
 * (no cropping, no layout shift) and a blurred placeholder while it loads.
 * Constrain size from the outside — width via the parent, height via
 * `max-h-*` + `w-auto` on className.
 */
export function Photo({ photo, sizes, priority = false, className = "", alt }: Props) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      className={`h-auto bg-bg-2 ${className}`}
    />
  );
}
