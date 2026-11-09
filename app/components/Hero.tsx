import type { Profile } from "../../lib/portfolio-content";
import Portrait from "./Portrait";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <Portrait profile={profile} />
        <p className="eyebrow">{profile.tagline}</p>
        <h1 id="hero-title">
          {profile.name}
          <span aria-hidden="true">.</span>
        </h1>
        <p className="hero-bio">{profile.bio}</p>
        <a className="hero-link" href="#projects">
          Explore featured work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
