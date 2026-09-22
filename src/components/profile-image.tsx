import { useState } from "react";

type ProfileImageProps = {
  src: string;
  alt: string;
};

const LOVABLE_ASSET_ORIGIN = "https://id-preview--73ce6d0b-ad71-437c-9d4a-3aca9576b80c.lovable.app";

export function ProfileImage({ src, alt }: ProfileImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageUrl = src.startsWith("http") ? src : `${LOVABLE_ASSET_ORIGIN}${src}`;

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