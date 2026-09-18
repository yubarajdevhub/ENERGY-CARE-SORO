import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Check, ChevronDown, CircleCheck, Leaf, Menu, Phone, ShieldCheck, Sun, X, Zap } from 'lucide-react';
import './styles.css';

const products = [
  { icon: '☀', title: 'Solar water heaters', text: 'Reliable hot water, powered by the sun. Built for homes, hotels and institutions.' },
  { icon: '✦', title: 'Smart street lighting', text: 'Efficient, autonomous lighting solutions that make every road safer after dark.' },
  { icon: '◒', title: 'Rooftop solar systems', text: 'Turn your unused roof into a clean, dependable power source for years to come.' },
  { icon: '⌁', title: 'Solar water pumps', text: 'Move water further with less energy for farms, communities and industry.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Request failed');
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSent(true);
    }
  };

  return (
    <div>
      <div className="announcement"><span>Energy that cares for tomorrow.</span><a href="#contact">Book a free consultation <ArrowUpRight size={14} /></a></div>
      <nav className="nav">
        <a className="logo" href="#top"><span className="logo-mark"><Sun size={20} /></span><span>energy<span className="logo-accent">care</span></span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</a><a href="#about" onClick={() => setMenuOpen(false)}>Our story</a><a href="#impact" onClick={() => setMenuOpen(false)}>Our impact</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-cta" href="#contact">Get a quote <ArrowUpRight size={16} /></a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> Clean power. Clear future.</div>
            <h1>Powering a <em>brighter</em> everyday.</h1>
            <p className="hero-lead">Practical solar solutions for homes, businesses and communities. Designed with care, built for the long run.</p>
            <div className="hero-actions"><a className="button button-dark" href="#contact">Start your solar journey <ArrowUpRight size={18} /></a><a className="text-link" href="#solutions">Explore solutions <ArrowUpRight size={16} /></a></div>
            <div className="hero-proof"><div className="avatars"><span>AK</span><span>RM</span><span>PS</span></div><div><strong>Trusted by 500+ customers</strong><small>Across homes, farms & businesses</small></div></div>
          </div>
          <div className="hero-art"><div className="sun-orb" /><div className="hero-card"><span className="card-icon"><Zap size={18} /></span><strong>74.8 kW</strong><small>clean energy generated today</small><div className="energy-bar"><i /></div></div><div className="hero-caption">Sunlight is our<br /><b>most reliable resource.</b></div></div>
        </section>

        <section className="trust-strip"><span>TRUSTED ENERGY PARTNER</span><div><b>URJA</b><b>green<span>grid</span></b><b>odisha<span>solar</span></b><b>◈ eco<span>works</span></b></div></section>

        <section className="section solutions" id="solutions">
          <div className="section-heading"><div><div className="eyebrow">What we do</div><h2>Good energy starts<br /><em>with a good plan.</em></h2></div><p>From first sketch to final switch-on, we make going solar feel simple. No jargon, no guesswork — just honest advice and quality work.</p></div>
          <div className="product-grid">{products.map((product) => <article className="product-card" key={product.title}><div className="product-icon">{product.icon}</div><h3>{product.title}</h3><p>{product.text}</p><a href="#contact">Learn more <ArrowUpRight size={15} /></a></article>)}</div>
        </section>

        <section className="story section" id="about"><div className="story-image"><div className="image-note"><Leaf size={17} /><span>Built for our<br /><b>shared home.</b></span></div></div><div className="story-copy"><div className="eyebrow">A little about us</div><h2>We believe energy<br /><em>should feel good.</em></h2><p>Energy Care began in 2017 with one simple idea: clean energy should be accessible, dependable and designed around real people.</p><p>Today, our team brings together thoughtful design, quality engineering and local know-how to create solar systems that keep giving back.</p><a className="text-link" href="#contact">Meet the team <ArrowUpRight size={16} /></a><div className="signature">Rajesh Meher <span>Founder, Energy Care</span></div></div></section>

        <section className="impact section" id="impact"><div className="impact-intro"><div className="eyebrow">The difference we make</div><h2>Small switches.<br /><em>Big impact.</em></h2><p>Every panel installed is a step toward a cleaner, more resilient India.</p></div><div className="stats"><div><strong>8<span>+</span></strong><small>Years of experience</small></div><div><strong>500<span>+</span></strong><small>Happy customers</small></div><div><strong>1.2<span>k</span></strong><small>Tonnes CO₂ avoided</small></div><div><strong>12<span>+</span></strong><small>Districts reached</small></div></div></section>

        <section className="contact section" id="contact"><div className="contact-copy"><div className="eyebrow">Let’s talk energy</div><h2>Have a roof?<br /><em>Let’s make it work.</em></h2><p>Tell us a little about your project. Our energy advisors will get back to you within one business day.</p><div className="contact-detail"><Phone size={18} /><span>+91 98765 43210<br /><small>Mon–Sat, 9am–6pm</small></span></div></div><form className="contact-form" onSubmit={submit}><label>Your name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="How should we call you?" /></label><label>Email address<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></label><label>Phone number<input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91" /></label><label>Tell us about your project<textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Home, business, water heating..."></textarea></label><button className="button button-dark" type="submit">{sent ? <><CircleCheck size={18} /> Thanks — we’ll be in touch</> : <>Send enquiry <ArrowUpRight size={18} /></>}</button></form></section>
      </main>
      <footer><a className="logo" href="#top"><span className="logo-mark"><Sun size={20} /></span><span>energy<span className="logo-accent">care</span></span></a><span>© 2025 Energy Care Company</span><span>Bhubaneswar, Odisha · India</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
