import { useEffect, useState } from "react";
import {
  ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Instagram,
  Mail, MapPin, Menu, Moon, Phone, Scissors, Star, Sun, Users, X
} from "lucide-react";
import { supabase } from "./lib/supabase";

const services = [
  { name: "Signature Haircut", price: 35, duration: 45, icon: "✦", description: "Precision cut, styling and a clean finish." },
  { name: "Beard Sculpt", price: 25, duration: 30, icon: "◆", description: "Shape, line-up and conditioning." },
  { name: "Hot Towel Shave", price: 30, duration: 35, icon: "◈", description: "Classic straight-razor experience." },
  { name: "Kids Cut", price: 25, duration: 30, icon: "✧", description: "A sharp, comfortable cut for young gentlemen." },
  { name: "Color & Tone", price: 55, duration: 60, icon: "◇", description: "Professional color and natural-looking tone." },
  { name: "Royal Combo", price: 65, duration: 75, icon: "♛", description: "Haircut, beard sculpt and hot towel finish." }
];

const gallery = [
  ["Classic Fade", "Fades", "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=82"],
  ["The Gentleman", "Classic Cuts", "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=82"],
  ["Sharp Beard", "Beards", "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=82"],
  ["Kingston Fade", "Fades", "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=82"],
  ["Old School", "Classic Cuts", "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=82"],
  ["Precision Beard", "Beards", "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=82"]
];

const barbers = [
  ["Abdullah Jutt", "Master Barber", "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=82"],
  ["Alasska", "Fade Specialist", "https://www.pinterest.com/pin/818247826086618753/"],
  ["Daniel Cole", "Classic Cuts", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=82"]
];

const testimonials = [
  ["The cleanest fade I've had in Kingston. The whole experience feels premium.", "Marcus T.", "5"],
  ["They actually listen. Walked out feeling like a sharper version of myself.", "Daniel R.", "5"],
  ["The Royal Combo is worth every dollar. Attention to detail is unreal.", "James K.", "5"]
];

function App() {
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [testimonial, setTestimonial] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", barber: "", appointment_date: "", appointment_time: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTestimonial((v) => (v + 1) % testimonials.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  const filteredGallery = galleryFilter === "All" ? gallery : gallery.filter((x) => x[1] === galleryFilter);

  function openBooking(serviceName = "") {
    setForm((v) => ({ ...v, service: serviceName }));
    setBookingDone(false);
    setBookingOpen(true);
  }

  async function submitBooking(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.appointment_date || !form.appointment_time) return;
    if (supabase) {
      const { error } = await supabase.from("appointments").insert([form]);
      if (error) {
        console.error(error);
        alert("We couldn't save your appointment. Please verify your Supabase environment variables and database table.");
        return;
      }
    } else {
      console.warn("Supabase is not configured; preview submission:", form);
    }
    setBookingDone(true);
  }

  return (
    <div className={light ? "app light" : "app"}>
      <header className={scrolled ? "navbar scrolled" : "navbar"}>
        <a href="#home" className="brand" onClick={() => setMobileOpen(false)}>
          <span className="brand-icon"><Scissors size={18} /></span>
          <span>ELITE <b>KINGSTON</b></span>
        </a>
        <nav className={mobileOpen ? "nav-links mobile-open" : "nav-links"}>
          {["Services", "Gallery", "Team", "Reviews", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{item}</a>
          ))}
          <button className="nav-book" onClick={() => { openBooking(); setMobileOpen(false); }}>Book Appointment</button>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" aria-label="Toggle light and dark mode" onClick={() => setLight((v) => !v)}>
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-content reveal is-visible">
            <div className="eyebrow"><span /> KINGSTON'S PREMIUM BARBERSHOP</div>
            <h1>THE ART OF<br /><em>THE PERFECT CUT.</em></h1>
            <p>Classic craftsmanship. Modern precision. An elevated grooming experience for those who expect more.</p>
            <div className="hero-buttons">
              <button className="gold-btn magnetic" onClick={() => openBooking()}>Book Appointment <ArrowUpRight size={18} /></button>
              <a className="outline-btn" href="#services">Explore Services</a>
            </div>
          </div>
          <div className="hero-scissors" aria-hidden="true"><Scissors /></div>
          <a className="scroll-indicator" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section id="about" className="section about">
          <div className="about-image reveal">
            <img loading="lazy" src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=85" alt="Barber working in a premium shop" />
            <div className="experience-badge"><strong>10+</strong><span>Years<br />of craft</span></div>
          </div>
          <div className="about-copy reveal">
            <div className="eyebrow"><span /> OUR STORY</div>
            <h2>Where tradition<br />meets <em>precision.</em></h2>
            <p>Elite Kingston was built on a simple idea: a great haircut should feel like a ritual. We combine old-school barbering with contemporary technique, creating a space where craftsmanship, conversation and confidence come together.</p>
            <p>Every chair, every tool and every detail has one purpose — to make your time with us exceptional.</p>
            <div className="stats">
              <div><strong>10+</strong><span>Years Experience</span></div>
              <div><strong>25K</strong><span>Clients Served</span></div>
              <div><strong>06</strong><span>Expert Barbers</span></div>
              <div><strong>18</strong><span>Awards</span></div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading reveal">
            <div><div className="eyebrow"><span /> OUR SERVICES</div><h2>Crafted for your <em>signature.</em></h2></div>
            <p>From classic cuts to modern fades, every service is delivered with patience, precision and pride.</p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <article className="service-card reveal" style={{ "--delay": `${i * 70}ms` }} key={s.name}>
                <div className="service-top"><span className="service-icon">{s.icon}</span><span>0{i + 1}</span></div>
                <h3>{s.name}</h3><p>{s.description}</p>
                <div className="service-bottom"><strong>${s.price}</strong><span><Clock3 size={14} /> {s.duration} min</span></div>
                <button onClick={() => openBooking(s.name)}>Book service <ArrowUpRight size={16} /></button>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="section-heading reveal">
            <div><div className="eyebrow"><span /> THE PORTFOLIO</div><h2>Work that <em>speaks.</em></h2></div>
            <div className="filters">{["All", "Fades", "Beards", "Classic Cuts"].map((f) => <button className={galleryFilter === f ? "active" : ""} onClick={() => setGalleryFilter(f)} key={f}>{f}</button>)}</div>
          </div>
          <div className="gallery-grid">
            {filteredGallery.map(([title, category, src], i) => (
              <figure className="gallery-item reveal" key={`${title}-${i}`}>
                <img loading="lazy" src={src} alt={title} />
                <figcaption><span>{category}</span><strong>{title}</strong></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="team" className="section team">
          <div className="center-heading reveal"><div className="eyebrow"><span /> THE CRAFTSMEN</div><h2>Meet the <em>barbers.</em></h2><p>Skilled hands. Individual style. A shared obsession with the details.</p></div>
          <div className="team-grid">
            {barbers.map(([name, role, src]) => (
              <article className="barber-card reveal" key={name}>
                <div className="barber-photo"><img loading="lazy" src={src} alt={name} /><div className="barber-social"><Instagram size={17} /></div></div>
                <h3>{name}</h3><p>{role}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="reviews" className="section testimonials">
          <div className="testimonial-wrap reveal">
            <div className="eyebrow"><span /> CLIENT NOTES</div>
            <div className="stars">★★★★★</div>
            <blockquote key={testimonial}>{testimonials[testimonial][0]}</blockquote>
            <div className="client">{testimonials[testimonial][1]}</div>
            <div className="slider-dots">{testimonials.map((_, i) => <button aria-label={`Testimonial ${i + 1}`} className={i === testimonial ? "active" : ""} onClick={() => setTestimonial(i)} key={i} />)}</div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-copy reveal">
            <div className="eyebrow"><span /> FIND YOUR CHAIR</div>
            <h2>Let's make your<br /><em>next cut count.</em></h2>
            <div className="contact-list">
              <a href="tel:+10000000000"><Phone /> +1 (000) 000-0000</a>
              <a href="mailto:hello@elitekingston.com"><Mail /> hello@elitekingston.com</a>
              <span><MapPin /> Kingston, Ontario</span>
            </div>
            <div className="hours"><h3>Business Hours</h3><div><span>Mon – Fri</span><b>9:00 AM – 8:00 PM</b></div><div><span>Saturday</span><b>9:00 AM – 6:00 PM</b></div><div><span>Sunday</span><b>10:00 AM – 4:00 PM</b></div></div>
          </div>
          <form className="booking-card reveal" onSubmit={submitBooking}>
            <div className="eyebrow"><span /> BOOK ONLINE</div>
            <h3>Reserve your chair</h3>
            <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
            <div className="two"><label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" /></label><label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" /></label></div>
            <div className="two"><label>Service<select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}><option value="">Choose service</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select></label><label>Barber<select value={form.barber} onChange={(e) => setForm({ ...form, barber: e.target.value })}><option value="">Any barber</option>{barbers.map(b => <option key={b[0]}>{b[0]}</option>)}</select></label></div>
            <div className="two"><label>Date<input required type="date" value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })} /></label><label>Time<input required type="time" value={form.appointment_time} onChange={(e) => setForm({ ...form, appointment_time: e.target.value })} /></label></div>
            <button className="gold-btn full" type="submit">{bookingDone ? <><Check size={18} /> Appointment requested</> : <>Reserve appointment <ArrowUpRight size={18} /></>}</button>
            {bookingDone && <p className="success">Your request has been saved. We'll confirm your appointment shortly.</p>}
          </form>
        </section>
      </main>

      <footer>
        <div><a className="brand" href="#home"><span className="brand-icon"><Scissors size={18} /></span><span>ELITE <b>KINGSTON</b></span></a><p>Premium grooming. Kingston craftsmanship.</p></div>
        <div className="footer-nav"><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#team">Barbers</a><a href="#contact">Contact</a></div>
        <div className="newsletter"><p>Stay in the loop</p><div><input placeholder="Your email" type="email" /><button aria-label="Subscribe"><ArrowUpRight /></button></div></div>
      </footer>
      <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUpRight size={18} /></button>

      {bookingOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setBookingOpen(false)}>
          <div className="modal">
            <button className="modal-close" aria-label="Close booking form" onClick={() => setBookingOpen(false)}><X /></button>
            {bookingDone ? <div className="modal-success"><Check /><h3>You're on the list.</h3><p>Your appointment request has been saved.</p><button className="gold-btn" onClick={() => setBookingOpen(false)}>Done</button></div> :
              <form onSubmit={(e) => { submitBooking(e); }}>
                <div className="eyebrow"><span /> BOOK APPOINTMENT</div><h2>Reserve your chair.</h2>
                <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
                <label>Service<select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}><option value="">Choose service</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select></label>
                <div className="two"><label>Date<input required type="date" value={form.appointment_date} onChange={(e) => setForm({ ...form, appointment_date: e.target.value })} /></label><label>Time<input required type="time" value={form.appointment_time} onChange={(e) => setForm({ ...form, appointment_time: e.target.value })} /></label></div>
                <button className="gold-btn full">Confirm request <ArrowUpRight size={18} /></button>
              </form>}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
