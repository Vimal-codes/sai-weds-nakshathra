import { Fragment, useEffect, useRef, useState } from "react";
import { Calendar, CalendarDays, ChevronDown, Clock3, Copy, MapPin, Music2, X } from "lucide-react";
import Lenis from "lenis";

import photo1 from "@/assets/photo/optimized/photo-1.jpg";
import photo2 from "@/assets/photo/optimized/photo-2.jpg";
import photo3 from "@/assets/photo/optimized/photo-3.jpg";

import camVenueImage from "@/assets/cam-convention-center1.png";

import { Button } from "@/components/ui/button";

const ceremonyDate = new Date("2026-12-03T10:30:00+05:30");
const venueMaps =
  "https://www.google.com/maps/search/?api=1&query=CAM+Convention+Center+Moonnamkutty+Kattachira+Kayamkulam";
const venueAddress = "CAM Convention Center, Moonnamkutty, Kattachira, Kayamkulam, Kerala";
const icsFileUrl = `${import.meta.env.BASE_URL}sai-weds-nakshathra.ics`;

function handleAddToCalendar(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  const isIOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  if (isIOS) {
    // Native Apple Calendar trigger on iOS Safari
    window.location.href = icsFileUrl;
    return;
  }

  // Generate downloadable Blob with text/calendar MIME for Android & desktop
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sai Nath & Dr. Nakshathra//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Sai Nath & Dr. Nakshathra Wedding",
    "X-WR-TIMEZONE:Asia/Kolkata",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Kolkata",
    "X-LIC-LOCATION:Asia/Kolkata",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "DTSTART:19700101T000000",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "UID:sai-weds-nakshathra-20261203T103000@vimal-codes.github.io",
    "DTSTAMP:20261123T000000Z",
    "DTSTART;TZID=Asia/Kolkata:20261203T103000",
    "DTEND;TZID=Asia/Kolkata:20261203T112000",
    "SUMMARY:Wedding Ceremony: Sai Nath & Dr. Nakshathra",
    "DESCRIPTION:We joyfully invite you to celebrate the auspicious wedding ceremony of Sai Nath & Dr. Nakshathra.\\n\\n✦ Auspicious Muhurtham: 10:30 AM – 11:20 AM (Dhanu Lagna)\\n✦ Venue: CAM Convention Center, Moonnamkutty, Kayamkulam, Kerala",
    "LOCATION:CAM Convention Center, Moonnamkutty, Kattachira, Kayamkulam, Kerala",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Wedding Ceremony: Sai Nath & Dr. Nakshathra (Muhurtham 10:30 AM)",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsLines], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "sai-weds-nakshathra.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(url), 2000);
}

function getGoogleCalendarUrl() {
  const title = encodeURIComponent("Wedding Ceremony: Sai Nath & Dr. Nakshathra");
  const details = encodeURIComponent(
    "We invite you to celebrate the wedding ceremony of Sai Nath & Dr. Nakshathra.\n\n" +
      "✦ Auspicious Muhurtham: 10:30 AM – 11:20 AM (Dhanu Lagna)\n" +
      "✦ Venue: CAM Convention Center, Moonnamkutty, Kayamkulam, Kerala",
  );
  const location = encodeURIComponent(venueAddress);
  // 10:30 AM IST = 05:00 UTC, 11:20 AM IST = 05:50 UTC
  const dates = "20261203T050000Z/20261203T055000Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/* ---------------------------------- motifs --------------------------------- */

function TraditionalMotif({ className = "" }: { className?: string }) {
  return (
    <div className={`traditional-motif ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 100 24"
        className="motif-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12h38m24 0h38M50 3c2.5 4 4.5 6 9 9-4.5 3-6.5 5-9 9-2.5-4-4.5-6-9-9 4.5-3 6.5-5 9-9z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="50" cy="12" r="2" fill="currentColor" />
        <circle cx="38" cy="12" r="1.3" fill="currentColor" />
        <circle cx="62" cy="12" r="1.3" fill="currentColor" />
      </svg>
    </div>
  );
}

function ArchFlourish({ className = "" }: { className?: string }) {
  return (
    <div className={`arch-flourish ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 35 C 30 10, 90 10, 110 35 M30 35 C 45 20, 75 20, 90 35 M60 5 L 60 18"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="60" cy="5" r="1.8" fill="currentColor" />
      </svg>
    </div>
  );
}

/* -------------------------------- countdown -------------------------------- */

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
    return <p className="countdown-passed">The auspicious wedding ceremony has begun. ✨</p>;
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
  const petals = Array.from({ length: 12 }).map((_, i) => {
    const size = 5 + Math.random() * 7;
    return {
      id: i,
      left: `${(i * 9 + Math.random() * 8) % 100}%`,
      duration: `${15 + Math.random() * 12}s`,
      delay: `-${Math.random() * 18}s`,
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
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.5,
              "--duration": p.duration,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------- section heading --------------------------- */

function SectionHeading({
  eyebrow,
  children,
  sanskrit,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  sanskrit?: string;
}) {
  return (
    <div className="section-heading reveal">
      {sanskrit && (
        <p className="sanskrit-heading" lang="sa">
          {sanskrit}
        </p>
      )}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="reveal-group">
        {typeof children === "string"
          ? children.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-2">
                <span className="split-word reveal-child">{word}</span>
              </span>
            ))
          : children}
      </h2>
      <TraditionalMotif className="mt-3" />
    </div>
  );
}

/* ----------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <header id="home" className="hero">
      <Petals />
      <div className="hero-grid section-inner">
        <div className="hero-content">
          <p className="sanskrit reveal" lang="sa">
            ॥ श्री गणेशाय नमः ॥
          </p>
          <div className="hero-badge reveal">
            <span className="hero-badge-dot" />
            <span>Wedding Celebration · 03 December 2026</span>
          </div>

          <p className="eyebrow reveal mt-4">Together with their families</p>

          <h1 className="reveal-group hero-title">
            <span className="split-word reveal-child">Sai Nath</span>
            <span className="hero-amp reveal-child">&amp;</span>
            <span className="split-word reveal-child">Dr. Nakshathra</span>
          </h1>

          <p className="hero-sub reveal">
            cordially invite you to join them in celebrating their sacred bond of marriage
          </p>

          <div className="hero-meta reveal">
            <div className="hero-meta-item">
              <CalendarDays className="hero-meta-icon" aria-hidden />
              <span>Thursday, 03 December 2026</span>
            </div>
            <span className="hero-meta-divider" aria-hidden="true">
              /
            </span>
            <div className="hero-meta-item">
              <Clock3 className="hero-meta-icon" aria-hidden />
              <span>Muhurtham 10:30 AM – 11:20 AM</span>
            </div>
          </div>

          <div className="hero-actions reveal">
            <Button asChild size="lg" className="rosegold-button">
              <a href="#invitation">
                Open Invitation <ChevronDown className="ml-1 w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rosegold-outline-button">
              <a href={icsFileUrl} download="sai-weds-nakshathra.ics" onClick={handleAddToCalendar}>
                <Calendar className="mr-1.5 w-4 h-4" /> Add to Calendar
              </a>
            </Button>
          </div>
        </div>

        {/* Feature Photo 3: Ethereal Backlit Beach Portrait */}
        <div className="hero-portrait-wrapper reveal-scale">
          <div className="arch-frame">
            <div className="arch-frame-inner">
              <img
                src={photo3}
                alt="Sai Nath & Dr. Nakshathra embracing tenderly against the ocean horizon with sunflowers"
                width={900}
                height={1200}
                className="hero-image"
                loading="eager"
              />
              <div className="frame-overlay-gradient" />
            </div>
            <div className="frame-corner frame-corner-tl" />
            <div className="frame-corner frame-corner-tr" />
            <div className="frame-corner frame-corner-bl" />
            <div className="frame-corner frame-corner-br" />
          </div>
          <div className="hero-caption-card">
            <span className="caption-tag">A Beautiful Beginning</span>
            <p className="caption-quote">
              &ldquo;Where two souls meet, eternity finds its quiet beginning.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <a href="#invitation" className="hero-scroll" aria-label="Scroll to the invitation">
        <span className="hero-scroll-track">
          <span className="hero-scroll-dot" />
        </span>
        <span className="hero-scroll-text">scroll</span>
      </a>
    </header>
  );
}

/* ------------------------------ invitation card ---------------------------- */

function InvitationSection() {
  return (
    <section id="invitation" className="section invitation-section">
      <div className="section-inner">
        <SectionHeading
          sanskrit="॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥"
          eyebrow="The Sacred Invitation"
        >
          Ceremony of Union
        </SectionHeading>

        <div className="invite-split-card reveal-scale">
          {/* Left: Traditional Letterpress Invitation Text */}
          <div className="invite-text-col">
            <div className="invite-header-motif">
              <ArchFlourish />
            </div>

            <p className="sanskrit invite-shloka" lang="sa">
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
              <br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>

            <p className="invite-line">
              Together with our families, we invite you to share our joy and bless our new journey
              as we unite in holy matrimony
            </p>

            <div className="invite-names-box">
              <h2 className="invite-name">Sai Nath</h2>
              <span className="invite-ampersand">&amp;</span>
              <h2 className="invite-name">Dr. Nakshathra</h2>
            </div>

            <p className="invite-ceremony-text">on the auspicious day of</p>

            <div className="invite-date-banner">
              <div className="date-block">
                <span className="date-day">Thursday</span>
                <span className="date-number">03</span>
                <span className="date-year">December 2026</span>
              </div>
            </div>

            <div className="invite-schedules">
              <div className="schedule-item">
                <span className="schedule-label">Auspicious Muhurtham</span>
                <span className="schedule-time">10:30 AM – 11:20 AM</span>
                <span className="schedule-sub">Dhanu Lagna · Wedding Ceremony</span>
              </div>
            </div>

            <div className="invite-location">
              <MapPin className="invite-pin" aria-hidden />
              <div>
                <strong>CAM Convention Center</strong>
                <p>Moonnamkutty, Kattachira, Kayamkulam, Kerala</p>
              </div>
            </div>

            <div className="invite-action-row">
              <Button asChild size="default" className="rosegold-button">
                <a href={venueMaps} target="_blank" rel="noreferrer">
                  <MapPin className="mr-1.5 w-3.5 h-3.5" /> View Map
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="rosegold-outline-button">
                <a
                  href={icsFileUrl}
                  download="sai-weds-nakshathra.ics"
                  onClick={handleAddToCalendar}
                >
                  <Calendar className="mr-1.5 w-3.5 h-3.5" /> Save Date
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Feature Photo 1 - Holding Hands */}
          <div className="invite-photo-col">
            <div className="photo-card-matted">
              <div className="matted-image-wrapper">
                <img
                  src={photo1}
                  alt="Sai Nath & Dr. Nakshathra walking hand in hand along the shoreline with sunflowers"
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="matted-photo"
                />
              </div>
              <div className="matted-caption">
                <span className="matted-sanskrit" lang="sa">
                  ॥ पाणिग्रहणम् ॥
                </span>
                <p className="matted-english">
                  &ldquo;I hold thy hand for good fortune, that thou mayst reach old age with me,
                  thy companion.&rdquo;
                </p>
                <span className="matted-cite">— Rigveda 10.85.36</span>
              </div>
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
      <div className="section-inner">
        <SectionHeading sanskrit="॥ समञ्जन्त्विति हृदयानि नौ ॥" eyebrow="The Couple">
          Two Souls, One Heart
        </SectionHeading>

        <div className="couple-triptych reveal-group">
          {/* Groom Card */}
          <article className="family-card groom-card reveal-child">
            <span className="family-role-badge">The Groom</span>
            <h3 className="family-member-name">Sai Nath</h3>
            <TraditionalMotif className="my-3" />
            <div className="family-info">
              <p className="relation-line">
                <span className="relation-tag">Son of</span>
                <strong className="parent-names">Mr. Viswanathan &amp; Mrs. Manju Viswanath</strong>
              </p>
              <div className="residence-block">
                <span className="residence-title">Family Residence</span>
                <address className="not-italic">
                  Koyickleth
                  <br />
                  Muthukulam South P.O., Alappuzha
                </address>
              </div>
            </div>
          </article>

          {/* Center Portrait - Feature Photo 2: Intimate Close-Up Portrait */}
          <div className="couple-centerpiece reveal-child">
            <div className="portrait-frame">
              <img
                src={photo2}
                alt="Close-up intimate romantic portrait of Sai Nath & Dr. Nakshathra smiling with shared tenderness"
                width={900}
                height={1200}
                loading="lazy"
                className="portrait-image"
              />
              <div className="portrait-overlay">
                <span className="portrait-monogram">S · N</span>
                <span className="portrait-date">03.12.2026</span>
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <article className="family-card bride-card reveal-child">
            <span className="family-role-badge">The Bride</span>
            <h3 className="family-member-name">Dr. Nakshathra</h3>
            <TraditionalMotif className="my-3" />
            <div className="family-info">
              <p className="relation-line">
                <span className="relation-tag">Daughter of</span>
                <strong className="parent-names">Mr. Reghunathan &amp; Mrs. Sobha R Nath</strong>
              </p>
              <div className="residence-block">
                <span className="residence-title">Family Residence</span>
                <address className="not-italic">
                  Nakshtralayam, Cherukunnam
                  <br />
                  Thekkekkara P.O., Mavelikara, Alappuzha
                </address>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- countdown ------------------------------- */

function CountdownSection() {
  return (
    <section id="countdown" className="section countdown-section">
      <Petals />
      <div className="section-inner narrow">
        <SectionHeading sanskrit="॥ शुभ मुहूर्ते सावधान ॥" eyebrow="Counting Every Moment">
          Until We Say Yes
        </SectionHeading>
        <p className="countdown-date reveal">Thursday · 03 · 12 · 2026</p>
        <Countdown />
        <div className="countdown-cta reveal mt-8 text-center">
          <Button asChild size="lg" className="rosegold-button">
            <a href={icsFileUrl} download="sai-weds-nakshathra.ics" onClick={handleAddToCalendar}>
              <Calendar className="mr-2 w-4 h-4" /> Save the Date to Calendar
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- events section ---------------------------- */

function EventsSection() {
  return (
    <section id="events" className="section events-section">
      <div className="section-inner">
        <SectionHeading
          sanskrit="॥ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ॥"
          eyebrow="Auspicious Day"
        >
          Wedding Ceremony
        </SectionHeading>

        <div className="events-single-wrapper reveal-group">
          {/* Ceremony Sole Card */}
          <article className="event-card ceremony reveal-child">
            <div className="event-badge">Sacred Rite</div>
            <h3>Wedding Ceremony</h3>
            <TraditionalMotif className="my-3" />
            <p className="event-date">Thursday, 3 December 2026</p>
            <div className="event-time-wrapper">
              <p className="event-time">
                <Clock3 aria-hidden /> 10:30 AM – 11:20 AM
              </p>
              <span className="event-muhurtham-badge">✦ Auspicious Muhurtham · Dhanu Lagna ✦</span>
            </div>
            <p className="event-venue">CAM Convention Center</p>
            <p className="event-address">Moonnamkutty, Kattachira, Kayamkulam, Kerala</p>
            <div className="event-buttons">
              <Button asChild size="default" className="rosegold-button">
                <a href={venueMaps} target="_blank" rel="noreferrer">
                  <MapPin className="mr-1.5 w-3.5 h-3.5" /> Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="rosegold-outline-button">
                <a
                  href={icsFileUrl}
                  download="sai-weds-nakshathra.ics"
                  onClick={handleAddToCalendar}
                >
                  <Calendar className="mr-1.5 w-3.5 h-3.5" /> Add to Calendar
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ gallery section ---------------------------- */

/* Keep only the 3 reference images in requested order */
const galleryItems = [
  {
    src: photo2,
    title: "Two Souls, One Smile",
    subtitle: "Tender gaze & cherished promises",
    width: 900,
    height: 1200,
  },
  {
    src: photo1,
    title: "Hand in Hand",
    subtitle: "Pani-grahana · Walking together through time",
    width: 900,
    height: 1200,
  },
  {
    src: photo3,
    title: "A Beautiful Beginning",
    subtitle: "Golden hour glow & sunflowers by the coast",
    width: 900,
    height: 1200,
  },
];

function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((s) => (s === null ? s : (s + 1) % galleryItems.length));
      if (e.key === "ArrowLeft")
        setSelected((s) => (s === null ? s : (s - 1 + galleryItems.length) % galleryItems.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const current = selected === null || !galleryItems[selected] ? null : galleryItems[selected];

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-inner">
        <SectionHeading
          sanskrit="॥ रूपं देहि जयं देहि यशो देहि द्विषो जहि ॥"
          eyebrow="Visual Showcase"
        >
          Moments of Love
        </SectionHeading>

        <div className="gallery-curated-grid reveal-group">
          {galleryItems.map((item, index) => (
            <div
              key={item.title}
              className="gallery-showcase-card reveal-child"
              onClick={() => setSelected(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(index);
              }}
              aria-label={`View ${item.title}`}
            >
              <div className="gallery-showcase-image-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                  className="gallery-showcase-img"
                />
                <div className="gallery-showcase-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-index">0{index + 1}</span>
                    <h3 className="gallery-title">{item.title}</h3>
                    <p className="gallery-sub">{item.subtitle}</p>
                    <span className="gallery-zoom-pill">Tap to view</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged wedding photograph"
          onClick={() => setSelected(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelected(null)}
            aria-label="Close photo view"
            className="lightbox-close"
          >
            <X />
          </Button>

          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.title} />
            <div className="lightbox-caption-bar">
              <div>
                <h4>{current.title}</h4>
                <p>{current.subtitle}</p>
              </div>
              <span className="lightbox-counter">
                {(selected ?? 0) + 1} / {galleryItems.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((s) =>
                s === null ? s : (s - 1 + galleryItems.length) % galleryItems.length,
              );
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-arrow lightbox-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((s) => (s === null ? s : (s + 1) % galleryItems.length));
            }}
          >
            ›
          </button>
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
      <div className="section-inner">
        <SectionHeading sanskrit="॥ शुभ स्थानम् ॥" eyebrow="Location & Directions">
          The Wedding Venue
        </SectionHeading>

        <div className="venue-card-split reveal-scale">
          <div className="venue-photo-col">
            <img
              src={camVenueImage}
              alt="CAM Convention Center building in Kayamkulam"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="venue-tag-overlay">
              <span>Grand Convention Hall</span>
            </div>
          </div>

          <div className="venue-details-col">
            <div className="venue-header-box">
              <span className="venue-eyebrow">Auspicious Destination</span>
              <h3>CAM Convention Center</h3>
              <p className="venue-address-text">
                Moonnamkutty, Kattachira,
                <br />
                Kayamkulam, Alappuzha, Kerala
              </p>
            </div>

            <div className="venue-times-box">
              <div className="venue-time-badge">
                <strong>Muhurtham:</strong> 10:30 AM – 11:20 AM
              </div>
            </div>

            <div className="venue-actions-row">
              <Button asChild size="lg" className="rosegold-button">
                <a href={venueMaps} target="_blank" rel="noreferrer">
                  <MapPin className="mr-2 w-4 h-4" /> Open in Google Maps
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rosegold-outline-button"
                onClick={copyAddress}
              >
                {copied ? (
                  <>
                    <Copy className="mr-2 w-4 h-4 text-emerald-400" /> Address Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" /> Copy Address
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="venue-map reveal mt-8">
          <iframe
            title="Map location of CAM Convention Center, Kayamkulam"
            loading="lazy"
            src="https://www.google.com/maps?q=CAM%20Convention%20Center%20Moonnamkutty%20Kattachira%20Kayamkulam&output=embed"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- music player ------------------------------ */

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const stopMusic = () => {
    if (masterGainRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      setTimeout(() => {
        if (audioContextRef.current && audioContextRef.current.state === "running") {
          void audioContextRef.current.suspend();
        }
      }, 350);
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPlayingRef.current = false;
    setPlaying(false);
  };

  const startMusic = async () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Master output gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Warm tanpura harmonic drone (Sa = 130.81Hz, Pa = 196Hz, Sa' = 261.63Hz)
        const droneFrequencies = [
          { f: 130.81, type: "sine" as OscillatorType, vol: 0.16 },
          { f: 196.0, type: "sine" as OscillatorType, vol: 0.12 },
          { f: 261.63, type: "triangle" as OscillatorType, vol: 0.1 },
          { f: 392.0, type: "sine" as OscillatorType, vol: 0.06 },
        ];

        droneFrequencies.forEach(({ f, type, vol }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(vol, ctx.currentTime);

          // Subtle LFO vibrato for natural organic Indian classical acoustic feel
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
        });
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Smooth fade-in to audible comfortable volume (0.2)
      if (masterGainRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(
          masterGainRef.current.gain.value,
          ctx.currentTime,
        );
        masterGainRef.current.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.8);
      }

      // Auspicious pentatonic melody phrasing (Raga Mohanam / Bhupali: Sa, Ri, Ga, Pa, Dha)
      const ragaNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
      let noteIndex = 0;

      const playMelodyNote = () => {
        if (!audioContextRef.current || !isPlayingRef.current) return;
        const c = audioContextRef.current;
        if (c.state !== "running") return;

        const noteFreq = ragaNotes[noteIndex % ragaNotes.length];
        noteIndex = (noteIndex + 1) % ragaNotes.length;

        const noteOsc = c.createOscillator();
        const noteGain = c.createGain();
        const filter = c.createBiquadFilter();

        // Warm flute / shehnai timbre
        noteOsc.type = "triangle";
        noteOsc.frequency.setValueAtTime(noteFreq, c.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, c.currentTime);

        // Gentle envelope (attack -> sustain -> release)
        const now = c.currentTime;
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(0.09, now + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        noteOsc.connect(filter);
        filter.connect(noteGain);
        if (masterGainRef.current) {
          noteGain.connect(masterGainRef.current);
        }

        noteOsc.start(now);
        noteOsc.stop(now + 2.3);
      };

      // Play melody note periodically
      playMelodyNote();
      intervalRef.current = window.setInterval(playMelodyNote, 2400);

      isPlayingRef.current = true;
      setPlaying(true);
    } catch (err) {
      console.warn("Unable to start audio playback:", err);
      setPlaying(false);
    }
  };

  const toggle = () => {
    if (playing) {
      stopMusic();
    } else {
      void startMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        void audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="music-player-container">
      <Button
        size="icon"
        onClick={toggle}
        className={`music-button ${playing ? "playing" : ""}`}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause background music" : "Play background music"}
      >
        {playing ? (
          <div className="music-playing-indicator" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </div>
        ) : (
          <Music2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="footer-rosegold">
      <div className="section-inner narrow text-center">
        <TraditionalMotif className="mb-4" />
        <p className="footer-sanskrit" lang="sa">
          ॥ ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ॥
        </p>
        <p className="footer-intro">With love, prayers &amp; blessings from both families,</p>
        <h2 className="footer-names">Sai Nath &amp; Dr. Nakshathra</h2>
        <p className="footer-families">
          Viswanathan &amp; Manju Viswanath · Reghunathan &amp; Sobha R Nath
        </p>
        <time className="footer-date">Thursday, 03 December 2026</time>
        <p className="footer-venue">CAM Convention Center · Kayamkulam, Kerala</p>
        <div className="footer-bottom-line">
          <span>Wedding Celebration · 2026</span>
        </div>
      </div>
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
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".gallery-showcase-card") ||
        target.closest(".vow-row")
      ) {
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            const children = Array.from(entry.target.querySelectorAll(".reveal-child"));
            children.forEach((child, index) => {
              (child as HTMLElement).style.transitionDelay = `${index * 100}ms`;
              child.classList.add("revealed");
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const nodes = document.querySelectorAll(".reveal, .reveal-group, .reveal-scale");
    nodes.forEach((node) => observer.observe(node));

    const lenis = new Lenis({ autoRaf: true });

    lenis.on("scroll", (e: { animatedScroll: number }) => {
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
