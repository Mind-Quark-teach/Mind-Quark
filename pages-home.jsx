// =====================================================
// HOME page — Hero + Subjects + Courses + Webinars + How + Testimonials + About + CTA
// =====================================================

const HomeHero = ({ lang, t, setPage }) => {
  const { isMobile } = useResponsive();
  const next = WEBINARS[0];
  const [tu, setTu] = useState(timeUntil(next.date));
  useEffect(() => {
    const i = setInterval(() => setTu(timeUntil(next.date)), 1000);
    return () => clearInterval(i);
  }, [next.date]);

  return (
    <section style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      <div className="card hero-padding" style={{ padding: '64px 56px 40px', position: 'relative', overflow: 'hidden', minHeight: isMobile ? 'auto' : 620 }}>

        {/* Geometric decoration — concentric arcs + grid + formulas */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(13,18,32,0.04)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="hero-fade" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,1)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="700" fill="url(#hero-grid)"/>
          <rect width="1200" height="700" fill="url(#hero-fade)"/>
          {/* concentric arcs around portrait */}
          <g transform="translate(820 360)" stroke="var(--accent)" fill="none" opacity="0.18">
            <circle r="260" strokeWidth="1" strokeDasharray="2 6"/>
            <circle r="320" strokeWidth="1"/>
            <circle r="380" strokeWidth="1" strokeDasharray="4 4" opacity="0.6"/>
          </g>
          {/* sine wave */}
          <path d="M 60 580 Q 140 520, 220 580 T 380 580 T 540 580"
            fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.35"/>
          {/* axis ticks bottom-left */}
          <g stroke="rgba(13,18,32,0.15)" strokeWidth="1">
            <line x1="60" y1="600" x2="540" y2="600"/>
            <line x1="60" y1="600" x2="60" y2="540"/>
            {[100,160,220,280,340,400,460].map(x => <line key={x} x1={x} y1="600" x2={x} y2="606"/>)}
          </g>
          {/* corner crosshair */}
          <g transform="translate(80 100)" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" fill="none">
            <circle r="6"/>
            <line x1="-14" y1="0" x2="-8" y2="0"/><line x1="14" y1="0" x2="8" y2="0"/>
            <line x1="0" y1="-14" x2="0" y2="-8"/><line x1="0" y1="14" x2="0" y2="8"/>
          </g>
          <g transform="translate(1140 80)" stroke="var(--ink)" strokeWidth="1" opacity="0.3" fill="none">
            <circle r="4"/>
          </g>
        </svg>
        {/* Subtle formulas as serif italics */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', top: '6%', left: '52%', fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(13,18,32,0.35)', letterSpacing: '0.05em' }}>
            ∫ƒ(x)dx = F(x) + C
          </span>
          <span style={{ position: 'absolute', bottom: '8%', left: '6%', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(13,18,32,0.4)', letterSpacing: '0.1em' }}>
            01 — HELLO
          </span>
          <span style={{ position: 'absolute', top: '8%', right: '8%', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(13,18,32,0.4)', letterSpacing: '0.1em' }}>
            MQ.IO / MATH·PHYS
          </span>
        </div>

        {/* Top right dot grid */}
        <div style={{ position: 'absolute', top: 28, right: 28 }}>
          <DotGrid />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr', gap: isMobile ? 24 : 40, alignItems: 'center', position: 'relative' }}>

          {/* LEFT */}
          <div className="anim-fade-up">
            <div style={{
              fontFamily: 'Archivo', fontWeight: 700, fontSize: 13,
              color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 18,
            }}>
              {t.hero_kicker}
            </div>
            <h1 className="display fs-hero" style={{
              fontSize: isMobile ? 48 : 108, lineHeight: 0.92, margin: 0, letterSpacing: '-0.04em',
            }}>
              FRANCESCO<br/>
              <span style={{ color: 'var(--accent)' }}>COCCIMIGLIO</span><span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
            <div style={{
              marginTop: 18, fontFamily: 'JetBrains Mono', fontSize: isMobile ? 11 : 12,
              color: 'var(--muted)', letterSpacing: '0.05em',
            }}>
              ── {t.hero_role}
            </div>
            <p style={{
              marginTop: 22, fontSize: isMobile ? 14 : 15, lineHeight: 1.6, color: 'var(--ink-2)',
              maxWidth: 460,
            }}>
              {t.hero_sub}
            </p>

            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => setPage({ name: 'courses' })}>
                {t.cta_browse}
                <Icon name="arrow" size={14} stroke="#fff" />
              </button>
              <button className="btn btn-light" onClick={() => setPage({ name: 'webinar' })}>
                <Icon name="radio" size={14} />
                {t.nav.webinar}
              </button>
            </div>

            {/* Stat row */}
            <div style={{
              marginTop: 48, display: 'flex', gap: isMobile ? 20 : 36,
              paddingTop: 28, borderTop: '1px solid var(--line)',
            }}>
              {[
                { n: '74+', l: lang==='it'?'Esami superati':'Exams passed' },
                { n: '92%', l: lang==='it'?'Promossi al 1° tentativo':'1st-try pass rate' },
                { n: '4.9/5', l: lang==='it'?'Recensioni studenti':'Student reviews' },
              ].map(s => (
                <div key={s.l}>
                  <div className="display" style={{ fontSize: isMobile ? 24 : 32, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, maxWidth: 110, lineHeight: 1.3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — portrait with geometric backdrop + side cards */}
          {!isMobile && <div style={{ position: 'relative', height: 600 }}>
            {/* Geometric backdrop behind portrait */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 460, height: 460, borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.02) 60%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '52%',
              transform: 'translate(-50%, -50%)',
              width: 360, height: 360, borderRadius: '50%',
              border: '1px solid rgba(37,99,235,0.18)',
            }} />
            <div style={{
              position: 'absolute', left: '50%', top: '52%',
              transform: 'translate(-50%, -50%)',
              width: 440, height: 440, borderRadius: '50%',
              border: '1px dashed rgba(37,99,235,0.12)',
            }} />

            {/* Portrait — arch shape, no overlap with cards */}
            <div style={{
              position: 'absolute', left: '50%', top: 0,
              transform: 'translateX(-50%)',
              width: 340, height: 560,
              borderRadius: '170px 170px 24px 24px',
              background: 'linear-gradient(180deg, #eef1f5 0%, #dde2ea 100%)',
              overflow: 'hidden',
              boxShadow: 'inset 0 -40px 80px rgba(13,18,32,0.06), 0 20px 60px rgba(13,18,32,0.08)',
            }}>
              <img src="assets/francesco-cutout.png" alt="Francesco Coccimiglio"
                style={{ width: '110%', height: '100%', objectFit: 'cover', objectPosition: 'center top', marginLeft: '-5%' }} />
              {/* arch frame line */}
              <div style={{
                position: 'absolute', inset: 8,
                borderRadius: '162px 162px 18px 18px',
                border: '1px solid rgba(255,255,255,0.5)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Tiny corner badges around portrait (decorative) */}
            <div style={{ position: 'absolute', top: 24, left: 50, fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.15em' }}>
              FIG.01 ─ DOCENTE
            </div>
            <div style={{ position: 'absolute', bottom: 24, right: 40, fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.15em' }}>
              ψ — PHD CANDIDATE
            </div>

            {/* Floating card 1 — Webinar live (top, away from face) */}
            <div className="anim-float" style={{
              position: 'absolute', top: -8, right: -40,
              background: '#fff', borderRadius: 18, padding: 14,
              boxShadow: 'var(--shadow-card)', width: 210,
              animation: 'float-y 5s ease-in-out infinite',
              zIndex: 2,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ position: 'relative', width: 8, height: 8 }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: 50, background: '#dc2626' }} />
                  <span className="anim-pulse" style={{ position: 'absolute', inset: 0, borderRadius: 50, background: '#dc2626' }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: '#dc2626', textTransform: 'uppercase' }}>{t.badge_live}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted)' }}>+47</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, color: 'var(--ink)' }}>
                {next['title_'+lang]}
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 6, fontSize: 10 }}>
                {[tu.d, tu.h, tu.m, tu.s].map((v, i) => (
                  <div key={i} style={{
                    flex: 1, background: 'var(--bg)', borderRadius: 6,
                    padding: '6px 4px', textAlign: 'center',
                  }}>
                    <div className="display" style={{ fontSize: 14, color: 'var(--ink)' }}>{String(v).padStart(2,'0')}</div>
                    <div style={{ fontSize: 9, color: 'var(--muted)' }}>{[t.days, t.hours, t.minutes, t.seconds][i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card 2 — On-demand (bottom right, below portrait) */}
            <div style={{
              position: 'absolute', bottom: -10, right: -30,
              background: '#fff', borderRadius: 18, padding: 12,
              boxShadow: 'var(--shadow-card)', width: 180,
              animation: 'float-y 6s ease-in-out 1s infinite',
              zIndex: 2,
            }}>
              <div style={{
                height: 80, borderRadius: 12,
                background: 'linear-gradient(135deg, #dbe7ff 0%, #ffffff 100%)',
                display: 'grid', placeItems: 'center', position: 'relative',
              }}>
                <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 56, color: 'var(--accent)' }}>∫</span>
                <div style={{
                  position: 'absolute', bottom: 8, left: 8,
                  width: 30, height: 30, borderRadius: 50,
                  background: 'var(--accent)', display: 'grid', placeItems: 'center',
                }}>
                  <Icon name="play" size={12} stroke="#fff" />
                </div>
              </div>
              <div style={{ marginTop: 10, fontWeight: 700, fontSize: 12, color: 'var(--ink)' }}>Analisi 1</div>
              <div style={{ marginTop: 4, fontSize: 10, color: 'var(--muted)' }}>{t.badge_ondemand} · 38h · 42 {t.lessons.toLowerCase()}</div>
            </div>

            {/* Floating card 3 — One to one (left side, mid height) */}
            <div style={{
              position: 'absolute', top: 280, left: -30,
              background: '#fff', borderRadius: 18, padding: 12,
              boxShadow: 'var(--shadow-card)', width: 170,
              animation: 'float-y 5.5s ease-in-out 0.5s infinite',
              zIndex: 2,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 50, background: 'linear-gradient(135deg,#7C3AED,#2563EB)' }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>1-1 {lang==='it'?'sessione':'session'}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{t.badge_one2one} · 60min</div>
                </div>
              </div>
              <div style={{ marginTop: 10, height: 36, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                {[12,18,8,22,14,30,18,24,16,28,20,12].map((h,i)=>(
                  <div key={i} style={{ flex:1, height:h, background:'var(--accent-soft)', borderRadius: 2 }}/>
                ))}
              </div>
            </div>

            {/* Floating card 4 — Download (bottom left, below portrait) */}
            <div style={{
              position: 'absolute', bottom: -16, left: -10,
              background: 'var(--ink)', borderRadius: 14, padding: '10px 14px',
              boxShadow: 'var(--shadow-card)',
              animation: 'float-y 6.5s ease-in-out 1.5s infinite',
              display: 'flex', alignItems: 'center', gap: 10,
              zIndex: 2,
            }}>
              <Icon name="download" size={14} stroke="#fff" />
              <div>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>webinar-maxwell.mp4</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>1.2 GB · {lang==='it'?'pronto':'ready'}</div>
              </div>
            </div>
          </div>}
        </div>

        {/* Bottom marquee — subjects */}
        <div style={{
          marginTop: isMobile ? 24 : 48, paddingTop: 24, borderTop: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 40,
          overflowX: 'auto', flexWrap: isMobile ? 'nowrap' : 'nowrap',
        }}>
          <span style={{ fontSize: 11, fontFamily: 'Archivo', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
            {lang==='it'?'CHE COSA INSEGNO':'WHAT I TEACH'}
          </span>
          <div style={{ display: 'flex', gap: 36, alignItems: 'center', flex: 1 }}>
            {SUBJECTS.slice(0,7).map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 22, color: s.color }}>{s.glyph}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}>{s[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Subjects grid ----------
const SubjectsGrid = ({ lang, t, setPage }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: '40px auto 0', padding: '0 var(--page-pad)' }}>
    <div className="card card-padding" style={{ padding: isMobile ? '40px 20px' : '72px 56px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Spheres count={isMobile ? 2 : 3} seed={2} />
      </div>
      <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
      <div style={{ position: 'relative' }}>
        <SectionHeader
          kicker={lang==='it'?'AREE DI STUDIO':'SUBJECT AREAS'}
          title={t.section_subjects}
          subtitle={t.section_subjects_sub}
        />
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 10 : 16 }}>
          {SUBJECTS.map((s, i) => (
            <div key={s.id} className="anim-fade-up" style={{
              animationDelay: `${i*0.04}s`,
              background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: 28,
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex', alignItems: 'center', gap: 18,
            }}
              onClick={() => setPage({ name: 'courses', subject: s.id })}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.background = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--bg)'; }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                background: `${s.color}15`,
                display: 'grid', placeItems: 'center',
                fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                fontSize: 36, color: s.color, fontWeight: 400,
              }}>{s.glyph}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{s[lang]}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                  {s.courses} {lang==='it'?'corsi disponibili':'courses available'}
                </div>
              </div>
              <Icon name="arrow" size={18} stroke="var(--muted-2)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

// ---------- Courses preview ----------
const CoursesPreview = ({ lang, t, setPage, addToCart }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }}>
    <div className="card card-padding" style={{ padding: isMobile ? '40px 20px' : '72px 56px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: isMobile ? 24 : 40, flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: 8 }}>
            ── 02 / {t.section_courses}
          </div>
          <h2 className="display fs-section" style={{ fontSize: isMobile ? 36 : 56, margin: 0, lineHeight: 0.95 }}>
            {t.section_courses}<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>
          <p style={{ marginTop: 12, color: 'var(--muted)', maxWidth: 480, fontSize: isMobile ? 14 : 15 }}>
            {t.section_courses_sub}
          </p>
        </div>
        <button className="btn btn-light" onClick={() => setPage({ name: 'courses' })}>
          {lang==='it'?'Tutti i corsi':'All courses'}
          <Icon name="arrow" size={14} />
        </button>
      </div>

      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
        {COURSES.slice(0, 6).map((c, i) => (
          <CourseCard key={c.id} course={c} lang={lang} t={t} setPage={setPage} addToCart={addToCart} idx={i} />
        ))}
      </div>
    </div>
  </section>
);
};

const CourseCard = ({ course, lang, t, setPage, addToCart, idx = 0 }) => (
  <div className="anim-fade-up" style={{
    animationDelay: `${idx*0.05}s`,
    background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: 14,
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex', flexDirection: 'column',
  }}
    onClick={() => setPage({ name: 'course-detail', id: course.id })}
    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.background = '#fff'; }}
    onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--bg)'; }}
  >
    <div style={{ position: 'relative' }}>
      <CourseThumb subjectId={course.subject} height={180} />
      {course.bestseller && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'var(--ink)', color: '#fff',
          padding: '5px 10px', borderRadius: 999,
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>★ Bestseller</div>
      )}
    </div>
    <div style={{ padding: '16px 8px 8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.05em' }}>
        {course['level_'+lang]}
      </div>
      <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 19, lineHeight: 1.2, margin: '8px 0 10px', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
        {course['title_'+lang]}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.5, flex: 1 }}>
        {course['short_'+lang]}
      </p>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Stars value={course.rating} size={12} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{course.rating} · {course.students.toLocaleString()}</span>
        </div>
        <div className="display" style={{ fontSize: 22, color: 'var(--ink)' }}>
          €{course.price}
        </div>
      </div>
    </div>
  </div>
  );

// ---------- Webinar preview ----------
const WebinarPreview = ({ lang, t, setPage }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }}>
    <div className="card card-padding" style={{
      padding: isMobile ? '40px 20px' : '72px 56px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0d1220 0%, #1a2238 100%)',
      color: '#fff',
    }}>
      <div style={{ position: 'absolute', top: 28, right: 28, opacity: 0.6 }}><DotGrid /></div>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <MathDeco items={[
        { s: '∇×B', top: '12%', left: '5%', size: 64 },
        { s: 'iℏ∂ψ/∂t', top: '78%', left: '78%', size: 28 },
      ]} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 24 : 40, position: 'relative', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 8 }}>
            ── 03 / {t.section_webinar}
          </div>
          <h2 className="display" style={{ fontSize: isMobile ? 36 : 56, margin: 0, lineHeight: 0.95, color: '#fff' }}>
            {t.section_webinar}<span style={{ color: '#60A5FA' }}>.</span>
          </h2>
          <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.65)', maxWidth: 480, fontSize: isMobile ? 14 : 15 }}>
            {t.section_webinar_sub}
          </p>
        </div>
        <button className="btn" style={{ background: '#fff', color: 'var(--ink)' }}
          onClick={() => setPage({ name: 'webinar' })}>
          {lang==='it'?'Vedi calendario':'See calendar'}
          <Icon name="arrow" size={14} />
        </button>
      </div>

      <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 12 : 16, position: 'relative' }}>
        {WEBINARS.slice(0,3).map((w, i) => (
          <WebinarMini key={w.id} w={w} lang={lang} t={t} setPage={setPage} idx={i} />
        ))}
      </div>
    </div>
  </section>
);
};

const WebinarMini = ({ w, lang, t, setPage, idx }) => {
  const [tu, setTu] = useState(timeUntil(w.date));
  useEffect(() => {
    const i = setInterval(() => setTu(timeUntil(w.date)), 1000);
    return () => clearInterval(i);
  }, [w.date]);
  const subj = SUBJECTS.find(s => s.id === w.subject);
  return (
    <div className="anim-fade-up" style={{
      animationDelay: `${idx*0.06}s`,
      background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)',
      padding: 22, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
      transition: 'background 0.2s, transform 0.2s',
    }}
      onClick={() => setPage({ name: 'webinar', focus: w.id })}
      onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{
          padding: '5px 10px', borderRadius: 999,
          background: w.mode === 'one2one' ? 'rgba(124,58,237,0.2)' : 'rgba(37,99,235,0.2)',
          color: w.mode === 'one2one' ? '#A78BFA' : '#60A5FA',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {w.mode === 'one2one' ? t.badge_one2one : t.badge_group}
        </span>
        <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 28, color: subj.color, opacity: 0.9 }}>{subj.glyph}</span>
      </div>
      <div style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 18, lineHeight: 1.25, color: '#fff', minHeight: 50 }}>
        {w['title_'+lang]}
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Icon name="calendar" size={12} stroke="rgba(255,255,255,0.6)" /> {fmtDate(w.date, lang)}</span>
        <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Icon name="clock" size={12} stroke="rgba(255,255,255,0.6)" /> {w.duration}</span>
      </div>
      {!tu.done && (
        <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
          {[
            {v: tu.d, l: t.days},{v: tu.h, l: t.hours},{v: tu.m, l: t.minutes},{v: tu.s, l: t.seconds}
          ].map((x,i)=>(
            <div key={i} style={{
              flex:1, background:'rgba(255,255,255,0.08)', borderRadius:8, padding:'8px 4px', textAlign:'center',
            }}>
              <div className="display" style={{ fontSize: 18, color: '#fff' }}>{String(x.v).padStart(2,'0')}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{x.l}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, color: w.seats_left === 0 ? '#F87171' : 'rgba(255,255,255,0.7)' }}>
          {w.seats_left === 0 ? t.sold_out : `${w.seats_left} ${t.seats_left}`}
        </div>
        <div className="display" style={{ fontSize: 18, color: '#fff' }}>
          {w.price === 0 ? (lang==='it'?'GRATIS':'FREE') : `€${w.price}`}
        </div>
      </div>
    </div>
  );
};

// ---------- How it works ----------
const HowItWorks = ({ lang, t }) => {
  const { isMobile } = useResponsive();
  const steps = [
    {
      n: '01', glyph: '∫',
      t_it: 'Scegli il corso', t_en: 'Pick the course',
      d_it: 'Sfoglia per materia o livello. On-demand con accesso illimitato.',
      d_en: 'Browse by subject or level. On-demand with unlimited access.',
      tag_it: 'ON-DEMAND', tag_en: 'ON-DEMAND',
    },
    {
      n: '02', glyph: '◯',
      t_it: 'Partecipa ai webinar', t_en: 'Join webinars',
      d_it: 'Sessioni live di gruppo o 1-1. Posti limitati, calendario aperto.',
      d_en: 'Live group or 1-1 sessions. Limited seats, open calendar.',
      tag_it: 'LIVE', tag_en: 'LIVE',
    },
    {
      n: '03', glyph: '↓',
      t_it: 'Scarica e rivedi', t_en: 'Download & revisit',
      d_it: 'Ogni webinar è registrato e scaricabile in MP4. Studia offline quando vuoi.',
      d_en: 'Every webinar is recorded and downloadable as MP4. Study offline anytime.',
      tag_it: 'OFFLINE', tag_en: 'OFFLINE',
    },
  ];
  return (
    <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }}>
      <div className="card card-padding" style={{ padding: isMobile ? '40px 20px' : '72px 56px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
        <SectionHeader
          kicker={lang==='it'?'IL METODO':'THE METHOD'}
          title={t.section_how}
          subtitle={t.section_how_sub}
        />
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: 36,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: -20,
                fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                fontSize: 180, color: 'rgba(37,99,235,0.07)', lineHeight: 1, fontWeight: 400,
              }}>{s.glyph}</div>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontWeight: 600,
                marginBottom: 36,
              }}>STEP / {s.n}</div>
              <h3 className="display" style={{ fontSize: 28, margin: 0, lineHeight: 1.1, position: 'relative' }}>{s['t_'+lang]}</h3>
              <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, position: 'relative' }}>
                {s['d_'+lang]}
              </p>
              <div style={{
                marginTop: 24, display: 'inline-block',
                background: 'var(--ink)', color: '#fff',
                padding: '6px 12px', borderRadius: 999,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                position: 'relative',
              }}>{s['tag_'+lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Testimonials ----------
const Testimonials = ({ lang, t }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }}>
    <div className="card card-padding" style={{ padding: isMobile ? '40px 20px' : '72px 56px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
      <SectionHeader
        kicker={lang==='it'?'STUDENTI':'STUDENTS'}
        title={t.section_testimonials}
        subtitle={t.section_testimonials_sub}
      />
      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? 12 : 16 }}>
        {TESTIMONIALS.map((tt, i) => (
          <div key={i} style={{
            background: i%2===0 ? 'var(--bg)' : 'var(--ink)',
            color: i%2===0 ? 'var(--ink)' : '#fff',
            borderRadius: 'var(--radius-lg)', padding: 32,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Stars value={tt.stars} size={14} />
              <div style={{
                background: i%2===0 ? '#fff' : 'rgba(255,255,255,0.1)',
                color: i%2===0 ? 'var(--accent)' : '#60A5FA',
                padding: '6px 12px', borderRadius: 999,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
              }}>{tt.exam} · {tt.grade}</div>
            </div>
            <p className="display" style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em' }}>
              "{tt['text_'+lang]}"
            </p>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${i%2===0 ? 'var(--line)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 50, background: 'linear-gradient(135deg,#7C3AED,#2563EB)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{tt.name}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{tt['role_'+lang]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

// ---------- About ----------
const About = ({ lang, t, setPage }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }} id="about">
    <div className="card" style={{ padding: '0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', minHeight: isMobile ? 'auto' : 540 }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#e6e9ef' }}>
          <img src="assets/francesco-ambient.png" alt="Francesco"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: 24, left: 24,
            background: '#fff', padding: '14px 18px', borderRadius: 18,
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 50, background: '#22c55e' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{lang==='it'?'Disponibile per nuovi studenti':'Open for new students'}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{lang==='it'?'Risposta entro 24h':'Reply within 24h'}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: isMobile ? '32px 20px' : '64px 56px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: 14 }}>
            ── 06 / {t.section_about}
          </div>
          <h2 className="display" style={{ fontSize: isMobile ? 36 : 56, margin: 0, lineHeight: 0.95 }}>
            {t.section_about}<span style={{ color: 'var(--accent)' }}>.</span>
          </h2>
          <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            {lang==='it'
              ? 'Sono Francesco, dottorando in Fisica Teorica e tutor da 4 anni. Ho aiutato oltre 70 studenti a superare esami di matematica e fisica — dal liceo al post-laurea. Il mio metodo: capire prima, calcolare dopo. Nessuna formula imparata a memoria, solo intuizione + rigore.'
              : 'I\'m Francesco, a Theoretical Physics PhD candidate and tutor for 4 years. I\'ve helped 70+ students pass math and physics exams — from high-school to graduate level. My method: understand first, calculate after. No memorized formulas, just intuition + rigor.'}
          </p>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
                {lang==='it'?'FORMAZIONE':'EDUCATION'}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>
                PhD Fisica Teorica<br/>
                Sapienza Università di Roma<br/>
                <span style={{ color: 'var(--muted)', fontWeight: 400 }}>2020 — {lang==='it'?'in corso':'ongoing'}</span>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 8 }}>
                {lang==='it'?'ESPERIENZA':'EXPERIENCE'}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>
                {lang==='it'?'Tutor':'Tutor'} · 4 {lang==='it'?'anni':'years'}<br/>
                70+ {lang==='it'?'studenti':'students'}<br/>
                <span style={{ color: 'var(--muted)', fontWeight: 400 }}>2022 — {lang==='it'?'oggi':'present'}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
            <button className="btn btn-primary">
              <Icon name="mail" size={14} stroke="#fff" />
              {t.cta_book}
            </button>
            <button className="btn btn-light" onClick={() => setPage({ name: 'courses' })}>
              {t.cta_browse}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

// ---------- Final CTA ----------
const FinalCTA = ({ lang, t }) => {
  const { isMobile } = useResponsive();
  return (
  <section style={{ maxWidth: 'var(--page-max)', margin: isMobile ? '16px auto 0' : '32px auto 0', padding: '0 var(--page-pad)' }}>
    <div className="card" style={{
      padding: isMobile ? '48px 20px' : '80px 56px', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #2563EB 0%, #1d4ed8 60%, #1e40af 100%)',
      color: '#fff', textAlign: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <MathDeco items={[
        { s: '∫', top: '20%', left: '12%', size: 96 },
        { s: 'Σ', top: '60%', left: '85%', size: 72 },
        { s: '∂', top: '70%', left: '14%', size: 56 },
      ]} />
      <div style={{ position: 'relative' }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: '0.2em', opacity: 0.7, marginBottom: 18 }}>
          ── {lang==='it'?'INIZIA OGGI':'START TODAY'}
        </div>
        <h2 className="display fs-cta" style={{ fontSize: isMobile ? 48 : 96, margin: 0, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
          {t.section_cta}
        </h2>
        <p style={{ marginTop: 20, fontSize: 17, opacity: 0.85, maxWidth: 540, margin: '20px auto 0' }}>
          {t.section_cta_sub}
        </p>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn" style={{ background: '#fff', color: 'var(--ink)', padding: '16px 28px' }}>
            <Icon name="mail" size={14} />
            {t.free_call}
          </button>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '16px 28px', backdropFilter: 'blur(8px)' }}>
            {lang==='it'?'WhatsApp diretto':'WhatsApp direct'}
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

// ---------- Home page composer ----------
const HomePage = (props) => (
  <div className="page-enter">
    <HomeHero {...props} />
    <SubjectsGrid {...props} />
    <CoursesPreview {...props} />
    <WebinarPreview {...props} />
    <HowItWorks {...props} />
    <Testimonials {...props} />
    <About {...props} />
    <FinalCTA {...props} />
  </div>
);

Object.assign(window, { HomePage, CourseCard });
