// =====================================================
// UI primitives shared across pages
// =====================================================

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

// ---------- Icons (inline SVG, stroke-based) ----------
const Icon = ({ name, size = 18, stroke = 'currentColor', strokeWidth = 1.8 }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    play: <polygon points="6 4 20 12 6 20 6 4" fill={stroke} stroke="none" />,
    pause: <><rect x="6" y="4" width="4" height="16" fill={stroke} stroke="none" /><rect x="14" y="4" width="4" height="16" fill={stroke} stroke="none" /></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    arrow_left: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={stroke} stroke="none" />,
    check: <polyline points="20 6 9 17 4 12" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    minus: <line x1="5" y1="12" x2="19" y2="12" />,
    cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></>,
    search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
    play_circle: <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill={stroke} stroke="none" /></>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    menu: <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    radio: <><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></>,
    volume: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>,
    fullscreen: <><polyline points="4 14 4 20 10 20" /><polyline points="20 10 20 4 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
    home: <><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" /></>,
    grad: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>
  };
  return <svg {...props}>{paths[name]}</svg>;
};

// ---------- Decorative floating spheres ----------
const Spheres = ({ count = 5, seed = 0 }) => {
  const positions = useMemo(() => {
    const rng = (i) => Math.sin((seed + 1) * 137 + i * 41) * 10000 % 1;
    return Array.from({ length: count }).map((_, i) => ({
      top: `${Math.abs(rng(i) * 100)}%`,
      left: `${Math.abs(rng(i + 7) * 100)}%`,
      size: 18 + Math.abs(rng(i + 13) * 36),
      delay: rng(i + 5) * 4,
      dur: 4 + Math.abs(rng(i + 9)) * 4
    }));
  }, [count, seed]);
  return (
    <>
      {positions.map((p, i) =>
      <div key={i} className="sphere"
      style={{
        top: p.top, left: p.left,
        width: p.size, height: p.size,
        animation: `float-y ${p.dur}s ease-in-out ${p.delay}s infinite`
      }} />
      )}
    </>);

};

// ---------- Math symbols floating decoration ----------
const MathDeco = ({ items }) =>
<>
    {items.map((it, i) =>
  <span key={i} className="math-deco anim-float-slow"
  style={{ top: it.top, left: it.left, fontSize: it.size, animationDelay: `${i * 0.4}s` }}>
        {it.s}
      </span>
  )}
  </>;


// ---------- Logo ----------
const Logo = ({ size = 26, dark = false }) =>
<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
    width: size, height: size, borderRadius: 8,
    background: dark ? '#fff' : 'var(--ink)',
    display: 'grid', placeItems: 'center',
    fontFamily: 'Archivo', fontWeight: 900, fontSize: size * 0.55,
    color: dark ? 'var(--ink)' : '#fff',
    letterSpacing: '-0.05em'
  }}>ψ</div>
    <span style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: size * 0.7, letterSpacing: '-0.02em', color: dark ? '#fff' : 'var(--ink)' }}>
      MindQuark<span style={{ color: 'var(--accent)' }}>.</span>
    </span>
  </div>;


// ---------- Top Navigation ----------
const Nav = ({ page, setPage, lang, setLang, cart, t }) => {
  const items = [
  { k: 'home', label: t.nav.home },
  { k: 'courses', label: t.nav.courses },
  { k: 'webinar', label: t.nav.webinar },
  { k: 'about', label: t.nav.about }];

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px', gap: 24,
      background: '#fff', borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-card)',
      position: 'sticky', top: 16, zIndex: 50,
      maxWidth: 1320, margin: '16px auto 0'
    }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setPage({ name: 'home' })}>
        <Logo size={28} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {items.map((it) =>
        <button key={it.k} onClick={() => setPage({ name: it.k })}
        style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          padding: '10px 16px', borderRadius: 999,
          fontFamily: 'Inter', fontWeight: 500, fontSize: 14,
          color: page.name === it.k ? 'var(--accent)' : 'var(--ink-2)',
          transition: 'color 0.2s, background 0.2s'
        }}
        onMouseOver={(e) => {if (page.name !== it.k) e.target.style.background = 'rgba(13,18,32,0.04)';}}
        onMouseOut={(e) => {e.target.style.background = 'transparent';}}>
          
            {it.label}
            {page.name === it.k &&
          <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 50, background: 'var(--accent)', marginLeft: 6, verticalAlign: 'middle' }} />
          }
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Lang switch */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg)', borderRadius: 999, padding: 3 }}>
          {['it', 'en'].map((l) =>
          <button key={l} onClick={() => setLang(l)}
          style={{
            background: lang === l ? '#fff' : 'transparent', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 999,
            fontFamily: 'Inter', fontWeight: 600, fontSize: 12,
            color: lang === l ? 'var(--ink)' : 'var(--muted)',
            boxShadow: lang === l ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
              {l}
            </button>
          )}
        </div>
        {/* Cart */}
        <button onClick={() => setPage({ name: 'checkout' })}
        style={{
          position: 'relative', background: 'var(--bg)', border: 'none', cursor: 'pointer',
          width: 40, height: 40, borderRadius: 999, display: 'grid', placeItems: 'center'
        }}>
          <Icon name="cart" size={18} />
          {cart.length > 0 &&
          <span style={{
            position: 'absolute', top: -2, right: -2,
            minWidth: 18, height: 18, borderRadius: 50, padding: '0 4px',
            background: 'var(--accent)', color: '#fff',
            fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center'
          }}>{cart.length}</span>
          }
        </button>
        {/* Login / Dashboard */}
        <button className="btn btn-dark" onClick={() => setPage({ name: 'dashboard' })}>
          <Icon name="user" size={14} stroke="#fff" />
          {t.nav.dashboard}
        </button>
      </div>
    </nav>);

};

// ---------- Section header (kicker with sparkles like reference) ----------
const SectionHeader = ({ title, subtitle, kicker, align = 'center' }) =>
<div style={{ textAlign: align, marginBottom: 48, position: 'relative' }}>
    <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 14,
    fontFamily: 'Archivo', fontWeight: 900, fontSize: 12, letterSpacing: '0.2em',
    color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 14
  }}>
      <span style={{ width: 24, height: 1, background: 'var(--muted-2)' }} />
      {kicker}
      <span style={{ width: 24, height: 1, background: 'var(--muted-2)' }} />
    </div>
    <h2 className="display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95, color: 'var(--ink)' }}>
      <span style={{ color: 'var(--accent)' }}>✦</span> {title} <span style={{ color: 'var(--accent)' }}>✦</span>
    </h2>
    {subtitle &&
  <p style={{ fontSize: 16, color: 'var(--muted)', margin: '20px auto 0', maxWidth: 560, lineHeight: 1.5 }}>
        {subtitle}
      </p>
  }
  </div>;


// ---------- Course thumbnail (synthetic gradient + glyph mockup) ----------
const CourseThumb = ({ subjectId, height = 200, glyph, color }) => {
  const subj = SUBJECTS.find((s) => s.id === subjectId) || { color: color || '#2563EB', glyph: glyph || '∫' };
  const c = subj.color;
  return (
    <div style={{
      height,
      borderRadius: 'var(--radius-lg)',
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${c}11 0%, ${c}22 50%, ${c}08 100%)`,
      border: `1px solid ${c}22`,
      display: 'grid',
      placeItems: 'center'
    }}>
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${c}10 1px, transparent 1px), linear-gradient(90deg, ${c}10 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        opacity: 0.6
      }} />
      {/* big glyph */}
      <div style={{
        fontFamily: 'Times New Roman, serif',
        fontStyle: 'italic',
        fontSize: height * 0.7,
        color: c,
        opacity: 0.85,
        lineHeight: 1,
        fontWeight: 400
      }}>
        {subj.glyph}
      </div>
      {/* sphere accent */}
      <div className="sphere" style={{
        width: 28, height: 28,
        top: 14, right: 14,
        position: 'absolute'
      }} />
      {/* tag */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12,
        background: '#fff', padding: '6px 10px', borderRadius: 999,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
        color: c, boxShadow: 'var(--shadow-soft)'
      }}>{subj.tag}</div>
    </div>);

};

// ---------- Footer ----------
const Footer = ({ lang, t, setPage }) =>
<footer style={{ maxWidth: 1320, margin: '40px auto 24px', padding: '0 16px' }}>
    <div className="card" style={{ padding: 56, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Spheres count={4} seed={3} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, position: 'relative' }}>
        <div>
          <Logo size={30} />
          <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
            {t.footer_tag}
          </p>
          <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
            {['IG', 'YT', 'TT', 'LI'].map((s) =>
          <div key={s} style={{
            width: 36, height: 36, borderRadius: 999, background: 'var(--bg)',
            display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink-2)',
            cursor: 'pointer'
          }}>{s}</div>
          )}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--ink)' }}>{t.nav.courses}</div>
          {SUBJECTS.slice(0, 5).map((s) =>
        <div key={s.id} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8, cursor: 'pointer' }}
        onClick={() => setPage({ name: 'courses', subject: s.id })}>
              {s[lang]}
            </div>
        )}
        </div>
        <div>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--ink)' }}>{lang === 'it' ? 'Risorse' : 'Resources'}</div>
          {[t.nav.webinar, t.nav.about, t.nav.dashboard, t.cta_book].map((x) =>
        <div key={x} style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{x}</div>
        )}
        </div>
        <div>
          <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, color: 'var(--ink)' }}>{lang === 'it' ? 'Contatti' : 'Contact'}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>francesco@mindquark.io</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>+49 393 482 17 09</div>
          <button className="btn btn-primary" style={{ padding: '12px 18px', fontSize: 13 }}>
            <Icon name="mail" size={14} stroke="#fff" />
            {t.cta_book}
          </button>
        </div>
      </div>
      <div style={{
      marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontSize: 12, color: 'var(--muted)'
    }}>
        <div>© 2026 MindQuark.io · Francesco Coccimiglio · P.IVA 04829137009</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <span>{t.cookies}</span><span>{t.privacy}</span><span>{t.terms}</span>
        </div>
      </div>
    </div>
  </footer>;


// ---------- Sparkle decoration ----------
const Sparkle = ({ size = 16, color = 'var(--accent)' }) =>
<span style={{ color, fontSize: size, fontFamily: 'Archivo', fontWeight: 900 }}>✦</span>;


// ---------- Window chrome / dot grid (top-right of cards in reference) ----------
const DotGrid = () =>
<div className="dot-grid">
    {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
  </div>;


// ---------- Toast ----------
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: '#fff',
      padding: '14px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500,
      boxShadow: 'var(--shadow-pop)', zIndex: 200,
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'fade-in-up 0.3s ease-out'
    }}>
      <Icon name="check" size={16} stroke="#22c55e" />
      {message}
    </div>);

};

// ---------- Stars ----------
const Stars = ({ value, size = 14 }) =>
<div style={{ display: 'inline-flex', gap: 2 }}>
    {Array.from({ length: 5 }).map((_, i) =>
  <Icon key={i} name="star" size={size}
  stroke={i < Math.round(value) ? '#F59E0B' : '#E5E7EB'} />
  )}
  </div>;


Object.assign(window, {
  Icon, Spheres, MathDeco, Logo, Nav, SectionHeader, CourseThumb, Footer,
  Sparkle, DotGrid, Toast, Stars
});