import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ContentList from "./ContentList";
import ProjectPage from "./ProjectPage";

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">Environmental Projects</div>

        <h1 className="hero-title">
          Discover impactful environmental initiatives on campus.
        </h1>

        <p className="hero-text">
          Explore curated projects that focus on sustainability, energy, waste
          reduction and community impact.
        </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View projects
          </button>
          <button className="btn-ghost">Learn more about EcoJourney</button>
        </div>

        <div className="hero-highlights">
          <div className="hero-highlight">
            <div className="hero-highlight-label">Focus Areas</div>
            <div className="hero-highlight-value">Energy, Waste, ESG</div>
          </div>
          <div className="hero-highlight">
            <div className="hero-highlight-label">Powered By</div>
            <div className="hero-highlight-value">Strapi + React</div>
          </div>
          <div className="hero-highlight">
            <div className="hero-highlight-label">Content Owners</div>
            <div className="hero-highlight-value">Hidayat</div>
          </div>
          <div className="hero-highlight">
            <div className="hero-highlight-label">Built For</div>
            <div className="hero-highlight-value">Republic Polytechnic</div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main id="projects" className="content-section">
        <div className="content-section-header">
          <h2 className="content-section-title">Environmental Projects</h2>
          <p className="content-section-subtitle">
            Browse all projects.
          </p>
        </div>

        <ContentList />
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} RP EcoJourney. All rights reserved.</span>
      <span>Built with React & Strapi for FYP.</span>
    </footer>
  );
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-logo">
          <span>RP</span> ECOJOURNEY
        </div>
        <nav className="site-nav">
          <a href="/">Home</a>
          <a href="#projects">Projects</a>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:documentId" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
