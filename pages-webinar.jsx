// =====================================================
// WEBINAR page — calendar + countdown + booking + about
// =====================================================

const WebinarPage = ({ lang, t, setPage, page }) => {
  const focusId = page.focus;
  const featured = WEBINARS.find(w => w.id === focusId) || WEBINARS[0];
  const [tu, setTu] = useState(timeUntil(featured.date));
  const [filter, setFilter] = useState('all');
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    const i = setInterval(() => setTu(timeUntil(featured.date)), 1000);
    return () => clearInterval(i);
  }, [featured.date]);

  const filtered = filter === 'all' ? WEBINARS : WEBINARS.filter(w => w.mode === filter);
  const subj = SUBJECTS.find(s => s.id === featured.subject);

  const toggleBook = (id) => {
    setBooked(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);
  };

  return (
    <div className="page-enter" style={{ maxWidth: 1320, margin: '24px auto 0', padding: '0 16px' }}>
      {/* Featured next webinar */}
      <div className="card" style={{
        padding: 0, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1220 0%, #1a2238 60%, #1e3a8a 100%)',
        color: '#fff',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <MathDeco items={[
          { s: '∫', top: '15%', left: '6%', size: 100 },
          { s: '∇·E = ρ/ε₀', top: '70%', left: '8%', size: 24 },
          { s: 'ψ', top: '20%', left: '85%', size: 80 },
          { s: 'iℏ∂/∂t', top: '78%', left: '78%', size: 24 },
        ]} />
        <div style={{ position: 'absolute', top: 28, right: 28, opacity: 0.6 }}><DotGrid /></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, padding: '64px 56px', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
              borderRadius: 999, background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.4)',
              color: '#FCA5A5', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20,
            }}>
              <span style={{ position: 'relative', width: 8, height: 8 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: 50, background: '#dc2626' }} />
                <span className="anim-pulse" style={{ position: 'absolute', inset: 0, borderRadius: 50, background: '#dc2626' }} />
              </span>
              {lang==='it'?'PROSSIMO WEBINAR':'NEXT WEBINAR'}
            </div>
            <h1 className="display" style={{ fontSize: 64, margin: 0, lineHeight: 0.95, color: '#fff', letterSpacing: '-0.03em' }}>
              {featured['title_'+lang]}
            </h1>
            <p style={{ marginTop: 16, fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.6 }}>
              {featured['short_'+lang]}
            </p>

            <div style={{ marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                <Icon name="calendar" size={14} stroke="rgba(255,255,255,0.85)" /> {fmtDate(featured.date, lang)}
              </span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                <Icon name="clock" size={14} stroke="rgba(255,255,255,0.85)" /> {featured.duration}
              </span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                <Icon name="users" size={14} stroke="rgba(255,255,255,0.85)" /> {featured.seats_left}/{featured.seats_total} {t.seats_left}
              </span>
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn" style={{ background: '#fff', color: 'var(--ink)', padding: '16px 26px' }}
                onClick={() => toggleBook(featured.id)}>
                {booked.includes(featured.id) ? (
                  <><Icon name="check" size={14} stroke="var(--good)" /> {lang==='it'?'Posto prenotato':'Seat booked'}</>
                ) : (
                  <>{t.book_seat} · {featured.price === 0 ? (lang==='it'?'GRATIS':'FREE') : `€${featured.price}`} <Icon name="arrow" size={14} /></>
                )}
              </button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '16px 22px', backdropFilter: 'blur(8px)' }}>
                <Icon name="calendar" size={14} stroke="#fff" /> {t.add_calendar}
              </button>
            </div>
          </div>

          {/* Big countdown */}
          <div>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.15em', marginBottom: 14, textAlign: 'center',
            }}>── {t.starts_in}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                {v: tu.d, l: t.days},{v: tu.h, l: t.hours},{v: tu.m, l: t.minutes},{v: tu.s, l: t.seconds}
              ].map((x,i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px 14px', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  <div className="display" style={{ fontSize: 56, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {String(x.v).padStart(2,'0')}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 8 }}>
                    {[lang==='it'?'giorni':'days', lang==='it'?'ore':'hours', lang==='it'?'minuti':'mins', lang==='it'?'secondi':'secs'][i]}
                  </div>
                </div>
              ))}
            </div>

            {/* Seats progress */}
            <div style={{ marginTop: 20, padding: 18, background: 'rgba(255,255,255,0.06)', borderRadius: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                <span>{lang==='it'?'Posti disponibili':'Seats available'}</span>
                <span><strong style={{ color: '#fff' }}>{featured.seats_left}</strong> / {featured.seats_total}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${(featured.seats_left/featured.seats_total)*100}%`,
                  height: '100%', background: '#60A5FA', borderRadius: 3,
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar / list */}
      <div className="card" style={{ marginTop: 16, padding: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: 8 }}>
              ── {lang==='it'?'CALENDARIO COMPLETO':'FULL CALENDAR'}
            </div>
            <h2 className="display" style={{ fontSize: 48, margin: 0, lineHeight: 0.95 }}>
              {lang==='it'?'Tutti i webinar':'All webinars'}<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              {k:'all', l: lang==='it'?'Tutti':'All'},
              {k:'group', l: t.badge_group},
              {k:'one2one', l: t.badge_one2one},
            ].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)}
                style={{
                  background: filter===f.k ? 'var(--ink)' : 'var(--bg)',
                  color: filter===f.k ? '#fff' : 'var(--ink-2)',
                  border: 'none', cursor: 'pointer',
                  padding: '10px 16px', borderRadius: 999,
                  fontSize: 13, fontWeight: 600,
                }}>{f.l}</button>
            ))}
          </div>
        </div>

        {/* Webinar list (timeline-style) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((w, i) => {
            const wsubj = SUBJECTS.find(s => s.id === w.subject);
            const d = new Date(w.date);
            const isFull = w.seats_left === 0;
            const isBooked = booked.includes(w.id);
            const months_it = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];
            const months_en = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
            const m = lang==='it'?months_it[d.getMonth()]:months_en[d.getMonth()];

            return (
              <div key={w.id} style={{
                display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 24,
                padding: 22, background: 'var(--bg)', borderRadius: 18, alignItems: 'center',
              }}>
                {/* Date block */}
                <div style={{ textAlign: 'center', borderRight: '1px solid var(--line)', paddingRight: 24 }}>
                  <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em' }}>{m}</div>
                  <div className="display" style={{ fontSize: 40, lineHeight: 1, margin: '4px 0' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {String(d.getHours()).padStart(2,'0')}:{String(d.getMinutes()).padStart(2,'0')}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: 18, color: wsubj.color }}>{wsubj.glyph}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {wsubj[lang]}
                    </span>
                    <span style={{
                      padding: '3px 8px', borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                      background: w.mode==='one2one' ? '#7C3AED15' : '#2563EB15',
                      color: w.mode==='one2one' ? '#7C3AED' : '#2563EB',
                    }}>{w.mode==='one2one' ? t.badge_one2one : t.badge_group}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 20, margin: 0, lineHeight: 1.2 }}>
                    {w['title_'+lang]}
                  </h3>
                  <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, maxWidth: 600 }}>
                    {w['short_'+lang]}
                  </p>
                  <div style={{ marginTop: 10, display: 'flex', gap: 14, fontSize: 12, color: 'var(--muted)' }}>
                    <span><Icon name="clock" size={11} /> {w.duration}</span>
                    <span style={{ color: isFull ? 'var(--bad)' : 'var(--good)', fontWeight: 600 }}>
                      {isFull ? t.sold_out : `${w.seats_left} ${t.seats_left}`}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <div className="display" style={{ fontSize: 24, color: 'var(--ink)' }}>
                    {w.price === 0 ? (lang==='it'?'GRATIS':'FREE') : `€${w.price}`}
                  </div>
                  {isFull ? (
                    <button className="btn" disabled style={{ background: 'var(--bg)', color: 'var(--muted)', cursor: 'not-allowed', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
                      {t.sold_out}
                    </button>
                  ) : isBooked ? (
                    <button className="btn" style={{ background: 'var(--good)', color: '#fff' }} onClick={() => toggleBook(w.id)}>
                      <Icon name="check" size={14} stroke="#fff" /> {lang==='it'?'Prenotato':'Booked'}
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => toggleBook(w.id)}>
                      {t.book_seat} <Icon name="arrow" size={14} stroke="#fff" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info card */}
      <div className="card" style={{ marginTop: 16, padding: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { i: 'radio', t_it: 'Live e interattivo', t_en: 'Live & interactive', d_it: 'Webinar via Zoom. Microfono aperto, lavagna condivisa, domande in diretta.', d_en: 'Webinars via Zoom. Open mic, shared whiteboard, live Q&A.' },
            { i: 'download', t_it: 'Sempre scaricabile', t_en: 'Always downloadable', d_it: 'Ogni sessione è registrata in MP4 e disponibile nella tua area entro 24h.', d_en: 'Every session is recorded as MP4 and available in your area within 24h.' },
            { i: 'users', t_it: '1-1 o di gruppo', t_en: '1-1 or group', d_it: 'Sessioni private a tua scelta o aperte. Posti limitati per garantire qualità.', d_en: 'Private sessions or open seats. Limited seats to keep quality high.' },
          ].map((c, i) => (
            <div key={i}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)',
                display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                <Icon name={c.i} size={20} stroke="var(--accent)" />
              </div>
              <h3 style={{ fontFamily: 'Archivo', fontWeight: 800, fontSize: 22, margin: '0 0 8px' }}>{c['t_'+lang]}</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{c['d_'+lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WebinarPage });
