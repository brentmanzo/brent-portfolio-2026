"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "../../lib/portfolio-content";

export default function ProjectPreview({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      className="project-preview"
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`View the live ${project.name} project (opens in a new tab)`}
    >
      {project.previewImage && !imageFailed ? (
        <Image
          src={project.previewImage}
          alt={project.previewAlt ?? ""}
          width={640}
          height={400}
          unoptimized
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="image-placeholder">Project preview coming soon</span>
      )}
    </a>
  );
}
