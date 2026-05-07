// =====================================================
// DASHBOARD — student area: my courses, progress, materials
// =====================================================

const DashboardPage = ({ lang, t, setPage, enrolled }) => {
  const { isMobile } = useResponsive();
  const myCourses = enrolled.length > 0
    ? enrolled.map(id => COURSES.find(c => c.id === id)).filter(Boolean)
    : [COURSES[0], COURSES[2], COURSES[5]]; // demo data
  const myWebinars = WEBINARS.slice(0, 3);
  const [tab, setTab] = useState('courses');

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      {/* Header */}
      <div className="card" style={{ padding: isMobile ? '28px 20px' : '40px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Spheres count={3} seed={4} />
        </div>
        <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, position: 'relative' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 50, overflow: 'hidden',
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'Archivo', fontWeight: 900, fontSize: 32, color: '#fff',
          }}>MR</div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: 6 }}>
              ── {lang==='it'?'BENTORNATO':'WELCOME BACK'}
            </div>
            <h1 className="display" style={{ fontSize: isMobile ? 32 : 48, margin: 0, lineHeight: 1 }}>
              {lang==='it'?'Ciao, Mario':'Hello, Mario'}<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
            <div style={{ marginTop: 8, fontSize: 14, color: 'var(--muted)' }}>
              {lang==='it'?'Hai 2 lezioni in sospeso · prossimo webinar tra 7 giorni':'2 lessons pending · next webinar in 7 days'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-light"><Icon name="bell" size={14} /></button>
            <button className="btn btn-light"><Icon name="settings" size={14} /></button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-2" style={{ marginTop: isMobile ? 20 : 32, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { l: t.my_courses, v: myCourses.length, sub: lang==='it'?'iscritti':'enrolled' },
            { l: lang==='it'?'Ore studiate':'Hours studied', v: '47h', sub: lang==='it'?'questo mese':'this month' },
            { l: lang==='it'?'Streak':'Streak', v: '12', sub: lang==='it'?'giorni di fila':'day streak' },
            { l: lang==='it'?'Webinar':'Webinars', v: myWebinars.length, sub: lang==='it'?'prenotati':'booked' },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--bg)', borderRadius: 16, padding: 18 }}>
              <div className="display" style={{ fontSize: 32, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', fontWeight: 600, marginTop: 4 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{ marginTop: 16, padding: '8px', display: 'flex', gap: 4 }}>
        {[
          { k: 'courses', l: t.my_courses, i: 'book' },
          { k: 'webinars', l: t.nav.webinar, i: 'radio' },
          { k: 'downloads', l: lang==='it'?'Download':'Downloads', i: 'download' },
          { k: 'materials', l: t.materials, i: 'file' },
        ].map(tb => (
          <button key={tb.k} onClick={() => setTab(tb.k)}
            style={{
              flex: 1, background: tab===tb.k ? 'var(--ink)' : 'transparent',
              color: tab===tb.k ? '#fff' : 'var(--ink-2)',
              border: 'none', cursor: 'pointer',
              padding: '14px 18px', borderRadius: 18,
              fontSize: 14, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <Icon name={tb.i} size={14} stroke={tab===tb.k?'#fff':'var(--ink-2)'} />
            {tb.l}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'courses' && (
        <div className="card" style={{ marginTop: 16, padding: 36 }}>
          <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>{t.my_courses}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myCourses.map((c, i) => {
              const progress = [62, 28, 89][i] || Math.floor(Math.random()*80);
              const subj = SUBJECTS.find(s => s.id === c.subject);
              return (
                <div key={c.id} style={{
                  display: 'flex', gap: 20, padding: 18,
                  background: 'var(--bg)', borderRadius: 18, alignItems: 'center',
                }}>
                  <div style={{
                    width: 100, height: 100, borderRadius: 14, flexShrink: 0,
                    background: `${subj.color}15`,
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                    fontSize: 56, color: subj.color, position: 'relative', overflow: 'hidden',
                  }}>{subj.glyph}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'JetBrains Mono', letterSpacing: '0.05em' }}>
                      {subj[lang].toUpperCase()}
                    </div>
                    <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 20, margin: '4px 0 8px' }}>
                      {c['title_'+lang]}
                    </h3>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                      {t.next_lesson}: <span style={{ color: 'var(--ink)', fontWeight: 600 }}>03 — Limiti notevoli</span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 6, background: '#fff', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', minWidth: 40 }}>{progress}%</span>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => setPage({ name: 'player', id: c.id })}>
                    <Icon name="play" size={12} stroke="#fff" />
                    {t.continue}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'webinars' && (
        <div className="card" style={{ marginTop: 16, padding: 36 }}>
          <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>{lang==='it'?'I miei webinar':'My webinars'}</h2>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? 10 : 12 }}>
            {myWebinars.map((w, i) => {
              const subj = SUBJECTS.find(s => s.id === w.subject);
              const isPast = i === 2;
              return (
                <div key={w.id} style={{
                  background: 'var(--bg)', borderRadius: 18, padding: 24,
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      padding: '5px 10px', borderRadius: 999,
                      background: isPast ? '#fff' : `${subj.color}15`,
                      color: isPast ? 'var(--muted)' : subj.color,
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>{isPast ? (lang==='it'?'REGISTRATO':'RECORDED') : t.badge_live}</span>
                    <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 28, color: subj.color }}>{subj.glyph}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.25 }}>{w['title_'+lang]}</h3>
                  <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12 }}>
                    <span><Icon name="calendar" size={11} /> {fmtDate(w.date, lang)}</span>
                    <span><Icon name="clock" size={11} /> {w.duration}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    {isPast ? (
                      <>
                        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <Icon name="play" size={12} stroke="#fff" /> {t.watch_now}
                        </button>
                        <button className="btn btn-light"><Icon name="download" size={14} /></button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-dark" style={{ flex: 1, justifyContent: 'center' }}>
                          <Icon name="radio" size={12} stroke="#fff" /> {lang==='it'?'Entra in aula':'Join room'}
                        </button>
                        <button className="btn btn-light"><Icon name="calendar" size={14} /></button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'downloads' && (
        <div className="card" style={{ marginTop: 16, padding: 36 }}>
          <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>{lang==='it'?'Webinar scaricabili':'Downloadable webinars'}</h2>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
            {lang==='it'?'Tutti i webinar a cui hai partecipato sono disponibili in MP4. Guarda quando vuoi, anche offline.':'All webinars you joined are available as MP4. Watch anytime, even offline.'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { t_it:'Maxwell in 90 minuti', t_en:'Maxwell in 90 minutes', size:'1.2 GB', dur:'90:14', date:'14 Apr 2026', subj:'em' },
              { t_it:'Integrali impropri — guida definitiva', t_en:'Improper integrals — guide', size:'960 MB', dur:'72:30', date:'02 Apr 2026', subj:'analisi' },
              { t_it:'Sessione 1-1 · Esame Analisi 1', t_en:'1-1 · Calc 1 exam', size:'520 MB', dur:'60:00', date:'28 Mar 2026', subj:'analisi' },
              { t_it:'Quantistica — atomo H', t_en:'Quantum — H atom', size:'1.4 GB', dur:'95:42', date:'15 Mar 2026', subj:'qm' },
            ].map((d, i) => {
              const subj = SUBJECTS.find(s => s.id === d.subj);
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                  background: 'var(--bg)', borderRadius: 14,
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                    background: `${subj.color}15`,
                    display: 'grid', placeItems: 'center', position: 'relative',
                  }}>
                    <Icon name="play_circle" size={26} stroke={subj.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{d['t_'+lang]}.mp4</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {d.date} · {d.dur} · {d.size}
                    </div>
                  </div>
                  <button className="btn btn-light"><Icon name="play" size={12} /> {t.watch_now}</button>
                  <button className="btn btn-dark"><Icon name="download" size={14} stroke="#fff" /> MP4</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'materials' && (
        <div className="card" style={{ marginTop: 16, padding: 36 }}>
          <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>{t.materials}</h2>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 10 : 12 }}>
            {[
              {n:'Dispense Analisi 1', t:'PDF', size:'12 MB'},
              {n:'Esercizi svolti — Limiti', t:'PDF', size:'4 MB'},
              {n:'Formulario Fisica 1', t:'PDF', size:'2 MB'},
              {n:'Slides Maxwell', t:'PDF', size:'8 MB'},
              {n:'Simulazione Maturità 2025', t:'PDF', size:'6 MB'},
              {n:'Tracce TOLC-I 2024', t:'ZIP', size:'24 MB'},
            ].map((m,i) => (
              <div key={i} style={{
                background: 'var(--bg)', borderRadius: 16, padding: 20,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  width: 40, height: 50, borderRadius: 6, background: '#fff',
                  display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                  color: 'var(--accent)', boxShadow: 'var(--shadow-soft)',
                }}>{m.t}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.n}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.size}</div>
                <button className="btn btn-light" style={{ marginTop: 'auto' }}>
                  <Icon name="download" size={12} /> {t.download.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { DashboardPage });
