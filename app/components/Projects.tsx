import type { Project } from "../../lib/portfolio-content";
import ProjectPreview from "./ProjectPreview";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      className="content-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Featured work</p>
          <h2 id="projects-title">
            Projects<span aria-hidden="true">.</span>
          </h2>
          <p>A few things I have built and explored.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <ProjectPreview project={project} />
              <p className="project-index">0{index + 1} / 03</p>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.name} on GitHub (opens in a new tab)`}
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                )}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View the live ${project.name} project (opens in a new tab)`}
                >
                  Live project <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
