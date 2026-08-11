import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">CAMPUS LOST & FOUND ✦</p>

          <h1>
            Lost something?
            <br />
            <span>Let's find it.</span>
          </h1>

          <p className="hero-description">
            Find what you've lost. Return what you've found.
            <br />
            One friendly place for your campus community.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard" className="btn-primary">
              Find an Item
            </Link>

            <Link to="/report" className="btn-secondary">
              Report Something
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>

          <div className="floating-card card-main">
            <span className="card-icon">✦</span>
            <strong>Lost & Found</strong>
            <small>Campus community</small>
          </div>

          <div className="floating-note note-one">
            Lost something? 👀
          </div>

          <div className="floating-note note-two">
            Someone found it! ♡
          </div>
        </div>
      </section>

      <section className="how-section">
        <p className="section-kicker">HOW IT WORKS</p>

        <h2>
          From lost
          <br />
          <span>to found.</span>
        </h2>

        <div className="steps">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">🔎</div>
            <h3>Search</h3>
            <p>
              Browse lost and found items around your campus.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">📦</div>
            <h3>Report</h3>
            <p>
              Lost something? Found something? Tell the campus.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">💬</div>
            <h3>Reconnect</h3>
            <p>
              Contact the person and get belongings back safely.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;