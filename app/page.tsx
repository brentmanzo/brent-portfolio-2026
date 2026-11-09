import Certifications from "./components/Certifications";
import ContactForm from "./components/ContactForm";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import { portfolioContent } from "../lib/portfolio-content";

export default function Home() {
  return (
    <main id="main-content">
      <Hero profile={portfolioContent.profile} />
      <Projects projects={portfolioContent.projects} />
      <Experience records={portfolioContent.experience} />
      <Certifications records={portfolioContent.certifications} />
      <ContactForm ownerEmail={portfolioContent.contact.email} />
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {portfolioContent.profile.name}</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </main>
  );
}
