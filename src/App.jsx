
import { useEffect, useState } from "react";
import "./App.css";

const works = [
  {
    number: "01",
    type: "LITERATURE / 1887",
    title: "Noli Me Tangere",
    subtitle: "The awakening",
    description:
      "Rizal exposed the injustices and abuses of colonial society through a novel that challenged Filipinos to question the world around them.",
    cover: "NOLI ME TANGERE",
    className: "cover-one",
    link : "https://www.gutenberg.org/cache/epub/20228/pg20228-images.html",
    image: "/src/assets/Nolime.png"
  },
  {
    number: "02",
    type: "LITERATURE / 1891",
    title: "El Filibusterismo",
    subtitle: "The consequences",
    description:
      "His second novel explored corruption, oppression, revenge, and the difficult choices faced by a society struggling for change.",
    cover: "EL FILIBUSTERISMO",
    className: "cover-two",
    link : "https://www.gutenberg.org/cache/epub/10676/pg10676-images.html",
    image: "/src/assets/elfili.png"
  },
  {
    number: "03",
    type: "REFORM / 1889–1895",
    title: "La Solidaridad",
    subtitle: "The power of ideas",
    description:
      "Rizal and fellow reformists used writing and public debate to call for representation, equality, and political reform.",
    cover: "LA SOLIDARIDAD",
    className: "cover-three",
    link : "https://en.wikipedia.org/wiki/La_Solidaridad",
    image: "/src/assets/lasoli.png"
  },
  {
    number: "04",
    type: "CIVIC LIFE / 1892",
    title: "La Liga Filipina",
    subtitle: "A united people",
    description:
      "Rizal founded an organization that promoted unity, mutual support, education, and peaceful improvement in Filipino society.",
    cover: "LA LIGA FILIPINA",
    className: "cover-four",
    link : "https://tl.wikipedia.org/wiki/La_Liga_Filipina",
    image: "/src/assets/lalega.png"
  },
];

const lessons = [
  {
    number: "01",
    title: "Think independently.",
    description:
      "Question what you see, examine evidence, and develop your own informed judgment.",
  },
  {
    number: "02",
    title: "Make knowledge matter.",
    description:
      "Use education and technology to solve real problems and help people.",
  },
  {
    number: "03",
    title: "Choose integrity.",
    description:
      "Stand against injustice and make decisions guided by honesty and responsibility.",
  },
  {
    number: "04",
    title: "Build something meaningful.",
    description:
      "Contribute to your community instead of measuring success only through personal achievement.",
  },
];

const references = [
  {
    title: "Noli Me Tangere",
    detail: "José Rizal · 1887",
    url: "https://www.gutenberg.org/ebooks/20228",
  },
  {
    title: "El Filibusterismo",
    detail: "José Rizal · 1891",
    url: "https://www.gutenberg.org/ebooks/10676",
  },
  {
    title: "Official Gazette of the Philippines",
    detail: "Official historical and national information",
    url: "https://www.officialgazette.gov.ph/",
  },
  {
    title: "National Historical Commission of the Philippines",
    detail: "Philippine history and historical resources",
    url: "https://nhcp.gov.ph/",
  },
];

function Arrow({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M7 7h10v10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let frame;

    const animateProgress = (now) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => setLoading(false), 180);
      }
    };

    frame = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const elements = document.querySelectorAll(".reveal");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loading]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {loading && (
        <div className="preloader" aria-label="Loading website">
          <div className="loader-noise" />
          <div className="loader-center">
            <span className="loader-kicker">A WEBSITE ABOUT LIFE AND WORK OF RIZAL</span>
            <div className="loader-logo">
              R<span>.</span>
            </div>
            <div className="loader-title">RIZAL</div>
            <div className="loader-track">
              <div
                className="loader-progress"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="loader-meta">
              <span>INITIALIZING EXPERIENCE</span>
              <span>{String(progress).padStart(3, "0")}%</span>
            </div>
          </div>
          <span className="loader-corner loader-corner-left">RR / 001</span>
          <span className="loader-corner loader-corner-right">PHILIPPINES</span>
        </div>
      )}

      <header className="site-header">
        <nav className="navbar container" aria-label="Main navigation">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span className="brand-symbol">R</span>
            <span className="brand-label">
              RIZAL
            </span>
          </a>


          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
          </button>

          <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#about" onClick={closeMenu}>ABOUT</a>
            <a href="#works" onClick={closeMenu}>THE WORKS</a>
            <a href="#perspective" onClick={closeMenu}>PERSPECTIVE</a>
            <a href="#reflection" onClick={closeMenu}>REFLECTION</a>
            <a className="nav-source" href="#sources" onClick={closeMenu}>
              SOURCES <Arrow diagonal />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />


          <div className="container hero-layout">
            <div className="hero-copy">

              <h1 className="hero-title">
                <span className="title-line title-line-one">The Man</span>
                <span className="title-line title-line-two">
                  <span>Who Awakened</span> <em>a Nation</em>
                </span>
              </h1>

              <p className="hero-description intro-reveal">
                A nation is not built by those who remain silent, but by those who dare to awaken its people.
              </p>

              <div className="hero-actions intro-reveal">
                <a className="button button-accent" href="#about">
                  ENTER THE STORY <Arrow />
                </a>
              </div>
            </div>

            <div className="hero-portrait intro-reveal">
              <div className="portrait-orbit" />
              <div className="portrait-image" role="img" aria-label="Historical portrait of José Rizal" />
              <div className="portrait-overlay" />
              <div className="portrait-scanline" />
              <div className="portrait-frame-top">
                <span>GE206</span>
              </div>
              <div className="portrait-vertical">JOSÉ PROTASIO RIZAL</div>
              <div className="portrait-bottom">
                <div>
                  <span className="portrait-label">PAMBANSANG BAYANI</span>
                  <strong>José Rizal</strong>
                </div>
                <span className="portrait-date">1861—1896</span>
              </div>
              <div className="portrait-crosshair crosshair-one">+</div>
              <div className="portrait-crosshair crosshair-two">+</div>
            </div>
          </div>

          <div className="hero-bottom container">
            <span>MADE BY</span>
          </div>
        </section>

      <div className="ticker" aria-label="Themes">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            
            <div className="ticker-group" key={i} aria-hidden={i === 1}>
              <span>TROPA NI RIZAL: </span>
              


              <img
                src="./src/assets/pans.png"
                alt="José Rizal"
                width="150"
                height="150"
              /><span>PANON, JOHN DAVE</span>

              <img
                src="./src/assets/mercs.png"
                alt="José Rizal"
                width="150"
                height="150"
              /><span>MERCADAL, SAM OLIVER</span>
              <img
                src="./src/assets/ayon.png"
                alt="José Rizal"
                width="150"
                height="150"
              /><span>AYON, JOHN WREIN</span>
              <img
                src="/src/assets/Abdul.png"
                alt="José Rizal"
                width="150"
                height="150"
              /><span>ABDUL, Alim</span>
              <img
                src="./src/assets/Danz.png"
                alt="DANIEL"
                width="150"
                height="150"
              /><span>SIQUIOCO, DANIEL</span>
            </div>
          ))}
        </div>
      </div>

        <section className="about-section section-pad" id="about">
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>THE INTRODUCTION</span>
              </div>
            </div>

            <div className="about-grid">
              <h2 className="giant-heading reveal">
                NOT ALL
                <br />
                <span>HERO</span> WEAR A CAPE
              </h2>

              <div className="about-copy reveal">
                <span className="micro-label">THE MAN IN THE 1 PESOS</span>
                <p className="about-lead">
                  What happens when one person's ideas outlive their time?
                </p>
                <p className="body-copy">
                  José Rizal was a Filipino writer, physician, and reformist
                  whose works challenged injustices under Spanish colonial
                  rule. His novels and essays helped shape discussions about
                  education, equality, identity, and the future of the
                  Philippines.
                </p>
                <p className="body-copy">
                  But his story is more than a list of achievements. It is an
                  invitation to examine the role of ideas, the power of
                  education, and the responsibility each generation carries.
                </p>
                <a className="text-link" href="#works">
                  EXPLORE THE BODY OF WORK <Arrow />
                </a>
              </div>
            </div>

            <div className="stat-strip reveal">
              <div className="stat-item">
                <span className="stat-number">1861<span>.</span></span>
                <span className="stat-label">BORN IN CALAMBA</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2<span>.</span></span>
                <span className="stat-label">LANDMARK NOVELS</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">35<span>.</span></span>
                <span className="stat-label">YEARS OF LIFE</span>
              </div>
              <div className="stat-item stat-last">
                <span className="stat-number">∞</span>
                <span className="stat-label">QUESTIONS LEFT BEHIND</span>
              </div>
            </div>
          </div>
        </section>

        <section className="works-section section-pad" id="works">
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>THE ARCHIVE</span>
              </div>
            </div>

            <div className="works-heading reveal">
              <h2 className="display-heading">
                WORDS THAT
                <br />
                <em>moved history.</em>
              </h2>
            </div>

            <div className="works-grid">
              {works.map((work, index) => (
                <a
                  href={work.link}
                  className="work-link"
                  key={work.number}
                >
                  <article
                    className="work-card reveal"
                    style={{ "--delay": `${index * 100}ms` }}
                  >
                    <div className="work-meta">
                      <span>{work.number} / 04</span>
                      <span>{work.type}</span>
                    </div>

                    <div className="book-art">
                      <img
                        src={work.image}
                        alt={`Cover representing ${work.title}`}
                        className="book-image"
                        loading="lazy"
                      />

                      <div className="book-overlay">
                        <span>JOSÉ RIZAL</span>
                        <strong>{work.cover}</strong>
                        <i>✳</i>
                        <small>{work.number} — ORIGINAL WORKS</small>
                      </div>

                      <span className="book-side-text">ARCHIVE / PH</span>
                    </div>

                    <div className="work-info">
                      <span className="micro-label">{work.subtitle}</span>
                      <h3>{work.title}</h3>
                      <p>{work.description}</p>

                      <div className="work-footer">
                        <span>EXPLORE THE IDEA</span>
                        <span className="work-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="perspective-section section-pad" id="perspective">
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>THE CRITICAL LOOK </span>
              </div>
            </div>

            <div className="perspective-grid">
              <div className="perspective-art reveal">
                <span className="perspective-stamp">THINK<br />DEEPER.</span>
                <span></span>
                <div className="perspective-words">
                  <span>QUESTION</span>
                  <em>EVERYTHING.</em>
                </div>
                <div className="perspective-lines" />
              </div>

              <div className="perspective-copy reveal">
                <span className="micro-label">HEROISM IS NOT THE END OF THE DISCUSSION</span>
                <h2 className="display-heading">
                  Admiration
                  <br />
                  is only the
                  <br />
                  <em>beginning.</em>
                </h2>
                <p className="body-copy">
                  Understanding Rizal also means examining the historical
                  context surrounding his ideas. He emphasized peaceful
                  reform, education, and reason, while other Filipinos
                  believed armed revolution was necessary to end colonial
                  rule.
                </p>
                <p className="body-copy">
                  These different approaches remind us that history is shaped
                  by many people, difficult choices, and competing visions of
                  freedom. Critical thinking allows us to appreciate Rizal
                  without overlooking the wider struggle for independence.
                </p>

                <div className="principle-list">
                  <div>
                    <span>01</span>
                    <p><strong>Read beyond the summary.</strong> Explore primary sources and their context.</p>
                  </div>
                  <div>
                    <span>02</span>
                    <p><strong>Recognize other perspectives.</strong> History includes more than one voice.</p>
                  </div>
                  <div>
                    <span>03</span>
                    <p><strong>Make evidence matter.</strong> Build conclusions through research and reflection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="today-section section-pad" id="today">
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>THE PRESENT </span>
              </div>
              <span className="section-side-label">KABATAAN ANG PAG ASA NG BAYAN</span>
            </div>

            <div className="today-heading reveal">
              <h2 className="display-heading">
                OLD IDEAS.
                <br />
                <em>New responsibilities.</em>
              </h2>
            </div>

            <div className="lesson-list">
              {lessons.map((lesson, index) => (
                <article
                  className="lesson-row reveal"
                  key={lesson.number}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span className="lesson-num">{lesson.number}</span>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <span className="lesson-icon"><Arrow diagonal /></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reflection-section section-pad" id="reflection">
          <div className="reflection-glow" />
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>OUR REFLECTION</span>
              </div>
            </div>

            <div className="reflection-grid">
              <div className="reflection-title reveal">
                <span className="micro-label">THE NEXT CHAPTER IS OURS</span>
                <h2>
                  THE FUTURE
                  <br />
                  IS <em>OURS.</em>
                </h2>
              </div>

              <div className="reflection-copy reveal">
                <p className="reflection-lead">
                 Rizals legacy teaches us that remembering him is not enough. We must also apply his values in our daily lives.
                </p>
                <p className="body-copy">
                As students and future IT professionals, 
                we can do this by continuing to learn, thinking independently
                and using technology responsibly. 
                For example, when creating software, 
                we should not only ask, “Does it work?” but also, 
                “Is it safe, fair, and helpful to others?”
                </p>
                <p className="body-copy">
                  We may not face the same struggles as Rizal, 
                  but we can still make a difference through our own actions.
                  By using our knowledge and skills to solve real problems and help our communities 
                  we can make our education truly meaningful.
                </p>

                <div className="reflection-commitment">
                  <span className="commitment-mark">✳</span>
                  <div>
                    <span className="micro-label">OUR COMMITMENT</span>
                    <p>
                      Learn with purpose. Think with courage. Build with
                      responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="finale-section">
          <div className="finale-grid" />
          <div className="finale-glow" />
          <div className="container finale-content reveal">
            <h2>
              HISTORY
              <br />
              DOESN'T
              <br />
              <em>END HERE.</em>
            </h2>
            <p>
              The past inspires us, but the future depends on what we do today.
            </p>
            <a className="button button-accent" href="#sources">
              EXPLORE THE SOURCES <Arrow />
            </a>
            <div className="finale-watermark">R.</div>
          </div>
        </section>

        <section className="sources-section section-pad" id="sources">
          <div className="container">
            <div className="section-heading reveal">
              <div className="section-index">
                <span>THE RESEARCH </span>
              </div>
            </div>

            <div className="sources-heading reveal">
              <h2 className="display-heading">
                KNOW THE
                <br />
                <em>evidence.</em>
              </h2>
            </div>

            <div className="source-list">
              {references.map((reference, index) => (
                <a
                  className="source-row reveal"
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  key={reference.title}
                  style={{ "--delay": `${index * 70}ms` }}
                >
                  <span className="source-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="source-info">
                    <strong>{reference.title}</strong>
                    <span>{reference.detail}</span>
                  </span>
                  <span className="source-arrow"><Arrow diagonal /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
