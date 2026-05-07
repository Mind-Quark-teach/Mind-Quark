// =====================================================
// APP root — state, routing, tweaks
// =====================================================

const { useState: uS, useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2563EB",
  "displayFont": "Archivo",
  "density": "comfy",
  "showSpheres": true
}/*EDITMODE-END*/;

const FONT_OPTIONS = {
  'Archivo': "'Archivo', sans-serif",
  'Space Grotesk': "'Space Grotesk', sans-serif",
  'Anton': "'Anton', sans-serif",
};

const App = () => {
  const [page, setPage] = uS({ name: 'home' });
  const [lang, setLang] = uS('it');
  const [cart, setCart] = uS([]);
  const [enrolled, setEnrolled] = uS([]);
  const [toast, setToast] = uS('');
  const [tweaksOn, setTweaksOn] = uS(false);
  const [tweaks, setTweaksState] = uS(TWEAK_DEFAULTS);

  // scroll to top on page change
  uE(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  // Apply accent
  uE(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    // derive accent-2 (darker)
    const darker = {
      '#2563EB': '#1d4ed8',
      '#0d1220': '#000000',
      '#7C3AED': '#5b21b6',
      '#DC2626': '#991b1b',
      '#059669': '#065f46',
    }[tweaks.accent] || tweaks.accent;
    document.documentElement.style.setProperty('--accent-2', darker);
    // accent soft
    document.documentElement.style.setProperty('--accent-soft', tweaks.accent + '22');
  }, [tweaks.accent]);

  uE(() => {
    document.documentElement.style.setProperty('--display-font', FONT_OPTIONS[tweaks.displayFont] || FONT_OPTIONS.Archivo);
    document.querySelectorAll('.display').forEach(el => {
      el.style.fontFamily = FONT_OPTIONS[tweaks.displayFont] || FONT_OPTIONS.Archivo;
    });
  }, [tweaks.displayFont, page]);

  // Tweaks protocol
  uE(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (k, v) => {
    const edits = typeof k === 'object' ? k : { [k]: v };
    setTweaksState(t => ({ ...t, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  const t = I18N[lang];

  const addToCart = (id) => {
    if (cart.includes(id)) return;
    setCart(c => [...c, id]);
    setToast(lang==='it' ? 'Aggiunto al carrello' : 'Added to cart');
  };
  const removeFromCart = (id) => setCart(c => c.filter(x => x !== id));
  const clearCart = () => setCart([]);

  const navProps = { page, setPage, lang, setLang, cart, t };
  const pageProps = { lang, t, setPage, addToCart, removeFromCart, clearCart, cart, enrolled, setEnrolled, page };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 24 }}>
      <Nav {...navProps} />
      {page.name === 'home' && <HomePage {...pageProps} />}
      {page.name === 'courses' && <CoursesPage {...pageProps} />}
      {page.name === 'course-detail' && <CourseDetailPage {...pageProps} />}
      {page.name === 'checkout' && <CheckoutPage {...pageProps} />}
      {page.name === 'dashboard' && <DashboardPage {...pageProps} />}
      {page.name === 'player' && <PlayerPage {...pageProps} />}
      {page.name === 'webinar' && <WebinarPage {...pageProps} />}
      {page.name === 'about' && (
        <div className="page-enter" style={{ maxWidth: 1320, margin: '24px auto 0', padding: '0 16px' }}>
          <About {...pageProps} />
          <Testimonials {...pageProps} />
          <FinalCTA {...pageProps} />
        </div>
      )}
      <Footer {...pageProps} />
      <Toast message={toast} onClose={() => setToast('')} />

      {tweaksOn && (
        <TweaksPanel onClose={() => setTweaksOn(false)}>
          <TweakSection title={lang==='it'?'Colore':'Color'}>
            <TweakColor
              label={lang==='it'?'Accento':'Accent'}
              value={tweaks.accent}
              options={['#2563EB', '#0d1220', '#7C3AED', '#DC2626', '#059669']}
              onChange={v => setTweak('accent', v)} />
          </TweakSection>
          <TweakSection title={lang==='it'?'Tipografia':'Typography'}>
            <TweakRadio
              label="Display"
              value={tweaks.displayFont}
              options={['Archivo', 'Space Grotesk', 'Anton']}
              onChange={v => setTweak('displayFont', v)} />
          </TweakSection>
          <TweakSection title={lang==='it'?'Decorazioni':'Decorations'}>
            <TweakToggle
              label={lang==='it'?'Sfere fluttuanti':'Floating spheres'}
              value={tweaks.showSpheres}
              onChange={v => setTweak('showSpheres', v)} />
          </TweakSection>
          <TweakSection title={lang==='it'?'Naviga':'Navigate'}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {[
                {k:'home', l:'Home'},
                {k:'courses', l:t.nav.courses},
                {k:'webinar', l:t.nav.webinar},
                {k:'dashboard', l:t.nav.dashboard},
                {k:'player', l:'Player'},
                {k:'checkout', l:'Checkout'},
              ].map(b => (
                <button key={b.k} onClick={() => setPage({ name: b.k })}
                  style={{
                    background: 'var(--bg)', border: 'none', cursor: 'pointer',
                    padding: '8px 10px', borderRadius: 10, fontSize: 12, fontWeight: 500,
                  }}>{b.l}</button>
              ))}
            </div>
          </TweakSection>
        </TweaksPanel>
      )}

      {/* Load extra fonts for tweaks */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Anton&display=swap" />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
