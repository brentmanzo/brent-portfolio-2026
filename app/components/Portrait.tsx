"use client";

import Image from "next/image";
import { useState } from "react";
import type { Profile } from "../../lib/portfolio-content";

export default function Portrait({ profile }: { profile: Profile }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="hero-portrait">
      {profile.portraitImage && !imageFailed ? (
        <Image
          src={profile.portraitImage}
          alt={profile.portraitAlt ?? ""}
          width={240}
          height={240}
          unoptimized
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="portrait-placeholder">
          Portrait image
        </span>
      )}
    </div>
  );
}
