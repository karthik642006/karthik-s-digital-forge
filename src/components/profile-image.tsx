import { useEffect, useRef, useState } from "react";

type ProfileImageProps = {
  src: string;
  alt: string;
};

const DEFAULT_PROFILE_IMAGE = "https://github.com/karthik642006.png";

export function ProfileImage({ src, alt }: ProfileImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageUrl = src.startsWith("http") && !src.includes("lovable.app") ? src : DEFAULT_PROFILE_IMAGE;

  useEffect(() => {
    const image = imageRef.current;
    if (!image?.complete) return;
    if (image.naturalWidth > 0) setLoaded(true);
    else setFailed(true);
  }, [imageUrl]);

  return (
    <div className="relative h-full w-full bg-surface-strong" aria-busy={!loaded && !failed}>
      {!loaded && !failed ? (
        <div className="absolute inset-0 animate-pulse bg-secondary" aria-hidden="true" />
      ) : null}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-surface-strong">
          <div className="grid size-24 place-items-center rounded-full border border-primary/40 bg-accent font-mono text-3xl text-primary">
            KK
          </div>
        </div>
      ) : (
        <img
          ref={imageRef}
          src={imageUrl}
          alt={alt}
          width={900}
          height={1125}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}