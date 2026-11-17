import { Fragment, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Copy,
  MapPin,
  Menu,
  Music2,
  Pause,
  Flower,
  Sparkles,
  X,
} from "lucide-react";
import Lenis from "lenis";

import coupleImage from "@/assets/couple-illustration.png";
import templeImage from "@/assets/temple-gopuram.png";
import garlandsImage from "@/assets/hanging-garlands.png";
import lotusCorner from "@/assets/lotus-corner.png";
import gallerySaree from "@/assets/gallery-saree.jpg";
import galleryMandap from "@/assets/gallery-mandap.jpg";
import galleryJewellery from "@/assets/gallery-jewellery.jpg";
import camVenueImage from "@/assets/cam-convention-center.png";

import { Button } from "@/components/ui/button";

const ceremonyDate = new Date("2026-12-03T10:30:00+05:30");
const venueMaps = "https://www.google.com/maps/search/?api=1&query=CAM+Convention+Center+Moonnamkutty+Kattachira+Kayamkulam";
const venueAddress = "CAM Convention Center, Moonnamkutty, Kattachira, Kayamkulam";

/* ---------------------------------- atoms --------------------------------- */

function Ornament({ label }: { label?: string }) {
  return (
    <div className="ornament" aria-hidden={label ? undefined : true}>
      <span />
      <span className="ornament-lotus">✦</span>
      <span />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

function useCountdown(target: Date) {
  const calculate = () => {
    const difference = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(difference / 86_400_000),
      hours: Math.floor((difference / 3_600_000) % 24),
      minutes: Math.floor((difference / 60_000) % 60),
      seconds: Math.floor((difference / 1_000) % 60),
      passed: difference === 0,
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(calculate()), 1000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
}

function RollingDigit({ value }: { value: number }) {
  return (
    <span key={value} className="rolling-digit inline-block">
      {String(value).padStart(2, "0")}
    </span>
  );
}

function Countdown() {
  const time = useCountdown(ceremonyDate);
  if (time.passed) {
    return <p className="countdown-passed">The celebrations have begun! 🎉</p>;
  }
  const units = ["days", "hours", "minutes", "seconds"] as const;
  return (
    <div className="countdown" aria-label="Countdown to the wedding ceremony">
      {units.map((label, index) => (
        <Fragment key={label}>
          {index > 0 && (
            <span className="countdown-separator" aria-hidden="true">
              :
            </span>
          )}
          <div className="countdown-item">
            <strong className="countdown-number">
              <RollingDigit value={time[label]} />
            </strong>
            <span className="countdown-label">{label}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function Petals() {
  const petals = Array.from({ length: 10 }).map((_, i) => {
    const size = 7 + Math.random() * 9;
    return {
      id: i,
      left: `${(i * 11 + Math.random() * 8) % 100}%`,
      duration: `${12 + Math.random() * 14}s`,
      delay: `-${Math.random() * 22}s`,
      size,
      tone: i % 3,
    };
  });
  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal petal-${p.tone}`}
          style={{ left: p.left, width: p.size, height: p.size * 1.4, "--duration": p.duration, "--delay": p.delay } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* -------------------------------- navigation ------------------------------ */

const NAV_LINKS: [string, string][] = [
  ["Home", "#home"],
  ["Invitation", "#invitation"],
  ["Couple", "#couple"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["Venue", "#venue"],
];

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      setOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`floating-nav ${scrolled ? "nav-scrolled" : ""}`} aria-label="Wedding navigation">
      <a href="#home" className="nav-monogram" aria-label="Sai Nath and Dr. Nakshathra home" onClick={(e) => handleScroll(e, "#home")}>
        S <Flower className="nav-flower" aria-hidden /> N
      </a>
      <div className="desktop-links">
        {NAV_LINKS.map(([name, href]) => <a key={href} href={href} onClick={(e) => handleScroll(e, href)}>{name}</a>)}
      </div>
      <Button variant="ghost" size="icon" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <div className="mobile-links">
          {NAV_LINKS.map(([name, href]) => <a key={href} href={href} onClick={(e) => handleScroll(e, href)}>{name}</a>)}
        </div>
      )}
    </nav>
  );
}

/* ----------------------------------- hero --------------------------------- */

function Hero() {
  return (
    <header id="home" className="hero">
      <Petals />
      <img src={garlandsImage} alt="" className="hero-garland hero-garland-left" />
      <img src={garlandsImage} alt="" className="hero-garland hero-garland-right" />
      <img src={lotusCorner} alt="" className="hero-lotus hero-lotus-left" />
      <img src={lotusCorner} alt="" className="hero-lotus hero-lotus-right" />
      <div className="hero-copy">
        <p className="sanskrit reveal" lang="sa">॥ श्री गणेशाय नमः ॥</p>
        <Ornament />
        <p className="eyebrow reveal">Together with their families</p>
        <h1 className="reveal-group">
          <span className="split-word reveal-child">Sai Nath</span>
          <small className="reveal-child">&amp;</small>
          <span className="split-word reveal-child">Dr. Nakshathra</span>
        </h1>
        <p className="hero-sub reveal">invite you to celebrate their beautiful beginning</p>
        <p className="hero-date reveal">Thursday · 03 December 2026</p>
        <div className="hero-actions reveal">
          <Button asChild size="lg" className="gold-button">
            <a href="#invitation">Open the Invitation <ChevronDown /></a>
          </Button>
        </div>
      </div>
      <img src={coupleImage} width={1024} height={1408} alt="Illustration of the groom in a champagne-gold kurta and the bride in a crimson silk saree with gold zari" className="hero-couple" />
      <a href="#invitation" className="hero-scroll" aria-label="Scroll to the invitation">
        <span className="hero-scroll-track"><span className="hero-scroll-dot" /></span>
        scroll
      </a>
    </header>
  );
}

/* ------------------------------- section heading --------------------------- */

function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="reveal-group">
        {typeof children === "string" ? (
          children.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-2">
              <span className="split-word reveal-child">{word}</span>
            </span>
          ))
        ) : (
          children
        )}
      </h2>
      <Ornament />
    </div>
  );
}

/* ------------------------------ invitation card ---------------------------- */

function InvitationSection() {
  return (
    <section id="invitation" className="section invitation-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <div className="section-inner">
        <div className="invite-card reveal-scale">
          <p className="sanskrit" lang="sa">॥ श्री गणेशाय नमः ॥</p>
          <p className="invite-line">Together with their families</p>
          <h2 className="invite-names">Sai Nath</h2>
          <p className="invite-amp">&amp;</p>
          <h2 className="invite-names">Dr. Nakshathra</h2>
          <p className="invite-line invite-request">
            cordially invite you and your family to join the
            occasion of their joyous wedding festivities on
          </p>
          <p className="invite-month">December</p>
          <p className="invite-date-line">Thursday <span>|</span> 03 <span>|</span> 2026</p>
          <div className="invite-venue">
            <p>CAM<br />Convention Center<br />Moonnamkutty<br />Kattachira, Kayamkulam</p>
          </div>
          <div className="invite-temple">
            <div className="invite-time invite-time-left">
              <h3>Wedding</h3>
              <p>10:30 AM to 10:45 AM</p>
            </div>
            <img src={templeImage} alt="Illustrated South Indian temple gopuram rising above lotus blossoms" loading="lazy" width={1024} height={1536} />
            <div className="invite-time invite-time-right">
              <h3>Reception</h3>
              <p>6 PM Onwards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- couple section ---------------------------- */

function CoupleSection() {
  return (
    <section id="couple" className="section couple-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <div className="section-inner couple-grid reveal-group">
        <figure className="couple-portrait reveal-child">
          <img src={coupleImage} alt="Sai Nath and Dr. Nakshathra in their wedding attire" loading="lazy" width={1024} height={1408} />
        </figure>
        <div className="couple-text">
          <SectionHeading eyebrow="The happy couple">Two Hearts, One Journey</SectionHeading>
          <article className="couple-card reveal-child">
            <span className="eyebrow">The Groom</span>
            <h3>Sai Nath</h3>
            <p className="couple-relation">
              <span className="relation-label">S/o</span>{" "}
              <span className="parents-name">Mr. Viswanathan &amp; Mrs. Manju Viswanath</span>
            </p>
            <p className="couple-address">
              Koyickleth<br />
              Muthukulam South P.O., Alappuzha
            </p>
          </article>
          <article className="couple-card reveal-child">
            <span className="eyebrow">The Bride</span>
            <h3>Dr. Nakshathra</h3>
            <p className="couple-relation">
              <span className="relation-label">D/o</span>{" "}
              <span className="parents-name">Mr. Reghunathan &amp; Mrs. Sobha R Nath</span>
            </p>
            <p className="couple-address">
              Nakshtralayam, Cherukunnam<br />
              Thekkekkara P.O., Mavelikara, Alappuzha
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- events section ---------------------------- */

function EventsSection() {
  return (
    <section id="events" className="section events-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <div className="section-inner">
        <SectionHeading eyebrow="Save the dates">Wedding Events</SectionHeading>
        <div className="events-grid">
          <article className="event-card ceremony reveal">
            <h3>Wedding Ceremony</h3>
            <Ornament />
            <p className="event-date">Thursday, 3 December 2026</p>
            <div className="event-time-wrapper">
              <p className="event-time">
                <Clock3 aria-hidden /> 10:30 AM – 10:45 AM
              </p>
              <span className="event-muhurtham-badge">✦ Muhurtham ✦</span>
            </div>
            <p className="event-venue">CAM Convention Center</p>
            <p className="event-address">Moonnamkutty, Kattachira, Kayamkulam</p>
            <Button asChild size="lg" className="gold-button">
              <a href={venueMaps} target="_blank" rel="noreferrer"><MapPin /> Get Directions</a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ gallery section ---------------------------- */

const gallery = [
  { src: gallerySaree, alt: "Folded crimson Kanjivaram silk saree with gold zari, jasmine flowers and a gold pendant", width: 928, height: 1152 },
  { src: galleryMandap, alt: "Wedding mandap with marigold garlands, jasmine strings and glowing brass oil lamps", width: 1152, height: 928 },
  { src: galleryJewellery, alt: "Traditional South Indian gold bridal jewellery on crimson silk", width: 928, height: 1152 },
];

function TiltCard({ image, onClick }: { image: (typeof gallery)[number]; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };
  return (
    <button
      ref={ref}
      type="button"
      className="gallery-card reveal-child"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Enlarge ${image.alt}`}
    >
      <img src={image.src} alt={image.alt} loading="lazy" width={image.width} height={image.height} />
    </button>
  );
}

function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected((s) => (s === null ? s : (s + 1) % gallery.length));
      if (e.key === "ArrowLeft") setSelected((s) => (s === null ? s : (s - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0]?.clientX ?? null; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchX = e.changedTouches[0]?.clientX;
    if (touchX === undefined) return;
    const delta = touchX - touchStart.current;
    if (Math.abs(delta) > 60) {
      setSelected((s) => {
        if (s === null) return s;
        return delta < 0 ? (s + 1) % gallery.length : (s - 1 + gallery.length) % gallery.length;
      });
    }
    touchStart.current = null;
  };

  const current: (typeof gallery)[number] | null =
    selected === null || !gallery[selected] ? null : gallery[selected]!;

  return (
    <section id="gallery" className="section gallery-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <div className="section-inner">
        <SectionHeading eyebrow="A glimpse of what awaits">Moments of Love</SectionHeading>
        <div className="gallery-grid reveal-group">
          {gallery.map((image, index) => (
            <TiltCard key={image.src} image={image} onClick={() => setSelected(index)} />
          ))}
        </div>
      </div>
      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged gallery image" onClick={() => setSelected(null)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <Button variant="ghost" size="icon" onClick={() => setSelected(null)} aria-label="Close gallery"><X /></Button>
          <img src={current.src} alt={current.alt} />
          <button type="button" className="lightbox-arrow lightbox-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setSelected((s) => (s === null ? s : (s - 1 + gallery.length) % gallery.length)); }}>‹</button>
          <button type="button" className="lightbox-arrow lightbox-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); setSelected((s) => (s === null ? s : (s + 1) % gallery.length)); }}>›</button>
        </div>
      )}
    </section>
  );
}

/* -------------------------------- venue section ---------------------------- */

function VenueSection() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venueAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="venue" className="section venue-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <div className="section-inner">
        <SectionHeading eyebrow="Find your way">The Venue</SectionHeading>
        <div className="venue-card reveal-scale">
          <div className="venue-photo">
            <img src={camVenueImage} alt="CAN Business Center / CAM Convention Center building" loading="lazy" width={1536} height={1024} />
          </div>
          <div className="venue-details">
            <h3>CAM Convention Center</h3>
            <p>Moonnamkutty, Kattachira,<br />Kayamkulam, Kerala</p>
            <div className="venue-times">
              <span><strong>Muhurtham</strong> 10:30 AM – 10:45 AM</span>
              <span><strong>Reception</strong> 6:00 PM onwards</span>
            </div>
            <div className="venue-actions">
              <Button asChild size="lg" className="gold-button">
                <a href={venueMaps} target="_blank" rel="noreferrer"><MapPin /> Get Directions</a>
              </Button>
              <Button variant="outline" size="lg" className="outline-button" onClick={copyAddress}>
                {copied ? <><Copy /> Address Copied</> : <><Copy /> Copy Address</>}
              </Button>
            </div>
          </div>
        </div>
        <div className="venue-map reveal">
          <iframe
            title="Map of CAM Convention Center, Kayamkulam"
            loading="lazy"
            src="https://www.google.com/maps?q=CAM%20Convention%20Center%20Moonnamkutty%20Kattachira%20Kayamkulam&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- countdown ------------------------------- */

function CountdownSection() {
  return (
    <section id="countdown" className="section countdown-section">
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-left" />
      <img src={lotusCorner} alt="" loading="lazy" className="section-floral section-floral-right" />
      <Petals />
      <div className="section-inner narrow">
        <SectionHeading eyebrow="Counting every moment">Until We Say Yes</SectionHeading>
        <p className="countdown-date reveal">Thursday · 03 · 12 · 2026</p>
        <Countdown />
      </div>
    </section>
  );
}



/* ------------------------------- music player ------------------------------ */

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; oscillators: OscillatorNode[] } | null>(null);
  const toggle = () => {
    if (audioRef.current) {
      audioRef.current.oscillators.forEach((oscillator) => oscillator.stop());
      void audioRef.current.context.close();
      audioRef.current = null;
      setPlaying(false);
      return;
    }
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.value = 0.018;
    gain.connect(context.destination);
    const oscillators = [261.63, 329.63, 392].map((frequency) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, oscillators };
    setPlaying(true);
  };
  useEffect(() => () => {
    audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
    void audioRef.current?.context.close();
  }, []);
  return (
    <Button size="icon" onClick={toggle} className={`music-button ${playing ? "playing" : ""}`} aria-label={playing ? "Pause ambient music" : "Play ambient music"}>
      {playing ? <Pause /> : <Music2 />}
    </Button>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer>
      <Ornament />
      <p>With love,</p>
      <h2>Sai Nath &amp; Dr. Nakshathra</h2>
      <time>Thursday, 03 December 2026</time>
      <p className="footer-venue">CAM Convention Center · Kayamkulam</p>
    </footer>
  );
}

/* ---------------------------------- cursor --------------------------------- */

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animationFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest("textarea")) {
        cursorRef.current?.classList.add("cursor-hover");
      } else {
        cursorRef.current?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ------------------------------- orchestrator ------------------------------ */

export function WeddingInvitation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          const children = Array.from(entry.target.querySelectorAll(".reveal-child"));
          children.forEach((child, index) => {
            (child as HTMLElement).style.transitionDelay = `${index * 120}ms`;
            child.classList.add("revealed");
          });
        } else {
          entry.target.classList.remove("revealed");
          const children = Array.from(entry.target.querySelectorAll(".reveal-child"));
          children.forEach((child) => {
            (child as HTMLElement).style.transitionDelay = "0ms";
            child.classList.remove("revealed");
          });
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    const nodes = document.querySelectorAll(".reveal, .reveal-group, .reveal-scale");
    nodes.forEach((node) => observer.observe(node));

    const lenis = new Lenis({ autoRaf: true });

    lenis.on("scroll", (e: any) => {
      const scrollY = e.animatedScroll;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);
      document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="invitation-open">
      <Cursor />
      <Hero />
      <InvitationSection />
      <CoupleSection />
      <CountdownSection />
      <EventsSection />
      <GallerySection />
      <VenueSection />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
