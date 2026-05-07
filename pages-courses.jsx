// =====================================================
// COURSES catalog + DETAIL pages
// =====================================================

const CoursesPage = ({ lang, t, setPage, addToCart, cart, page }) => {
  const { isMobile } = useResponsive();
  const [filter, setFilter] = useState(page.subject || 'all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    let r = COURSES.filter(c => filter === 'all' || c.subject === filter);
    if (search) r = r.filter(c => c['title_'+lang].toLowerCase().includes(search.toLowerCase()));
    if (sort === 'popular') r.sort((a,b) => b.students - a.students);
    if (sort === 'rating') r.sort((a,b) => b.rating - a.rating);
    if (sort === 'price-low') r.sort((a,b) => a.price - b.price);
    if (sort === 'price-high') r.sort((a,b) => b.price - a.price);
    return r;
  }, [filter, search, sort, lang]);

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      {/* Hero strip */}
      <div className="card card-padding" style={{ padding: isMobile ? '40px 20px' : '56px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Spheres count={4} seed={5} />
          <MathDeco items={[
            { s: '∫', top: '20%', left: '8%', size: 80 },
            { s: 'd/dx', top: '70%', left: '85%', size: 28 },
          ]} />
        </div>
        <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: 10 }}>
              ── {t.nav.courses.toUpperCase()}
            </div>
            <h1 className="display" style={{ fontSize: isMobile ? 48 : 96, margin: 0, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
              {lang==='it' ? 'CATALOGO' : 'CATALOG'}<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 16, color: 'var(--muted)', maxWidth: 520 }}>
              {lang==='it'
                ? `${COURSES.length} corsi on-demand. Lezioni registrate, dispense PDF ed esercizi corretti. Accesso illimitato.`
                : `${COURSES.length} on-demand courses. Recorded lessons, PDF notes and corrected exercises. Unlimited access.`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              background: 'var(--bg)', borderRadius: 999, padding: '10px 18px',
              display: 'flex', alignItems: 'center', gap: 10, minWidth: isMobile ? 160 : 280,
            }}>
              <Icon name="search" size={16} stroke="var(--muted)" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder={lang==='it'?'Cerca corso…':'Search course…'}
                style={{ background:'transparent', border:'none', outline:'none', flex:1, fontSize: 14, fontFamily: 'Inter' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '20px 28px', marginTop: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          <FilterChip active={filter==='all'} onClick={() => setFilter('all')} label={lang==='it'?'Tutti':'All'} count={COURSES.length} />
          {SUBJECTS.map(s => {
            const n = COURSES.filter(c => c.subject === s.id).length;
            if (n === 0) return null;
            return <FilterChip key={s.id} active={filter===s.id} onClick={() => setFilter(s.id)}
              label={s[lang]} count={n} color={s.color} glyph={s.glyph} />;
          })}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{
            background: 'var(--bg)', border: 'none', padding: '10px 14px',
            borderRadius: 999, fontSize: 13, fontFamily: 'Inter', fontWeight: 500,
            cursor: 'pointer', outline: 'none',
          }}>
          <option value="popular">{lang==='it'?'Più popolari':'Most popular'}</option>
          <option value="rating">{lang==='it'?'Miglior voto':'Top rated'}</option>
          <option value="price-low">{lang==='it'?'Prezzo crescente':'Price ↑'}</option>
          <option value="price-high">{lang==='it'?'Prezzo decrescente':'Price ↓'}</option>
        </select>
      </div>

      {/* Grid */}
      <div className="card" style={{ padding: '36px', marginTop: 16 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
            {lang==='it'?'Nessun corso trovato':'No courses found'}
          </div>
        ) : (
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 12 : 20 }}>
            {filtered.map((c, i) => (
              <CourseCard key={c.id} course={c} lang={lang} t={t} setPage={setPage} addToCart={addToCart} idx={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FilterChip = ({ active, onClick, label, count, color, glyph }) => (
  <button onClick={onClick} style={{
    background: active ? 'var(--ink)' : 'var(--bg)',
    color: active ? '#fff' : 'var(--ink-2)',
    border: 'none', cursor: 'pointer',
    padding: '10px 14px', borderRadius: 999,
    fontSize: 13, fontFamily: 'Inter', fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'background 0.15s',
  }}>
    {glyph && <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', color: active ? '#fff' : color }}>{glyph}</span>}
    {label}
    <span style={{
      fontSize: 11, padding: '2px 8px', borderRadius: 999,
      background: active ? 'rgba(255,255,255,0.15)' : '#fff', color: active ? '#fff' : 'var(--muted)',
    }}>{count}</span>
  </button>
);

// ---------- Course detail ----------
const CourseDetailPage = ({ lang, t, setPage, addToCart, cart, page }) => {
  const { isMobile } = useResponsive();
  const course = COURSES.find(c => c.id === page.id) || COURSES[0];
  const subj = SUBJECTS.find(s => s.id === course.subject);
  const inCart = cart.includes(course.id);
  const [tab, setTab] = useState('syllabus');
  const syllabus = course.syllabus_it || COURSES[0].syllabus_it;

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      {/* Back */}
      <button onClick={() => setPage({ name: 'courses' })}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--muted)', fontSize: 13, padding: '8px 0', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Icon name="arrow_left" size={14} /> {lang==='it'?'Torna al catalogo':'Back to catalog'}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: 16 }}>
        {/* LEFT */}
        <div className="card" style={{ padding: isMobile ? '28px' : '48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 28, right: 28 }}><DotGrid /></div>

          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.15em', color: subj.color, marginBottom: 14 }}>
            ── {subj[lang].toUpperCase()} · {course['level_'+lang].toUpperCase()}
          </div>
          <h1 className="display" style={{ fontSize: 56, margin: 0, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {course['title_'+lang]}
          </h1>
          <p style={{ marginTop: 20, fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 640 }}>
            {course['short_'+lang]}
          </p>

          {/* Stats row */}
          <div style={{ marginTop: 32, display: 'flex', gap: 32, paddingTop: 24, borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
            {[
              { l: t.duration, v: course.duration, i: 'clock' },
              { l: t.lessons, v: course.lessons, i: 'play_circle' },
              { l: t.students, v: course.students.toLocaleString(), i: 'users' },
              { l: t.rating, v: `${course.rating}/5`, i: 'star' },
            ].map(s => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--bg)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={s.i} size={16} />
                </div>
                <div>
                  <div className="display" style={{ fontSize: 18, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 40, display: 'flex', gap: 4, borderBottom: '1px solid var(--line)' }}>
            {[
              { k: 'syllabus', l: t.syllabus },
              { k: 'includes', l: t.includes },
              { k: 'reviews', l: t.reviews },
            ].map(tb => (
              <button key={tb.k} onClick={() => setTab(tb.k)}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '14px 18px', fontSize: 14, fontWeight: 600,
                  color: tab === tb.k ? 'var(--ink)' : 'var(--muted)',
                  borderBottom: tab === tb.k ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1,
                }}>{tb.l}</button>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            {tab === 'syllabus' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {syllabus.map((ch, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 18px', background: 'var(--bg)', borderRadius: 14,
                  }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{ch.ch}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{ch.t}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{ch.m}</span>
                    <Icon name="play_circle" size={18} stroke="var(--accent)" />
                  </div>
                ))}
              </div>
            )}
            {tab === 'includes' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  lang==='it' ? `${course.lessons} lezioni video HD` : `${course.lessons} HD video lessons`,
                  lang==='it' ? 'Dispense PDF stampabili' : 'Printable PDF notes',
                  lang==='it' ? '200+ esercizi con soluzione' : '200+ solved exercises',
                  lang==='it' ? 'Simulazioni d\'esame' : 'Mock exams',
                  lang==='it' ? 'Accesso illimitato a vita' : 'Lifetime access',
                  lang==='it' ? 'Aggiornamenti gratuiti' : 'Free updates',
                  lang==='it' ? 'Chat di supporto privata' : 'Private support chat',
                  lang==='it' ? 'Certificato di completamento' : 'Completion certificate',
                ].map((it, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 50, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
                      <Icon name="check" size={12} stroke="var(--accent)" />
                    </div>
                    <span style={{ fontSize: 14 }}>{it}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TESTIMONIALS.slice(0,3).map((tt,i)=>(
                  <div key={i} style={{ background: 'var(--bg)', padding: 20, borderRadius: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{tt.name} <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 12 }}>· {tt['role_'+lang]}</span></div>
                      <Stars value={tt.stars} />
                    </div>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>"{tt['text_'+lang]}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — buy box */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <CourseThumb subjectId={course.subject} height={220} />
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <span className="display" style={{ fontSize: 44, lineHeight: 1, color: 'var(--ink)' }}>€{course.price}</span>
                <span style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'line-through' }}>€{course.price + 50}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--good)', fontWeight: 600, marginBottom: 20 }}>
                ✦ {lang==='it'?'Pagamento sicuro · Garanzia 14 giorni':'Secure payment · 14-day refund'}
              </div>

              <button onClick={() => { if (!inCart) addToCart(course.id); setPage({ name: 'checkout' }); }}
                className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 22px', fontSize: 15 }}>
                {t.buy_now}
                <Icon name="arrow" size={14} stroke="#fff" />
              </button>
              <button onClick={() => addToCart(course.id)} disabled={inCart}
                className="btn" style={{
                  width: '100%', justifyContent: 'center', marginTop: 10,
                  background: inCart ? 'var(--bg)' : '#fff',
                  color: inCart ? 'var(--muted)' : 'var(--ink)',
                  boxShadow: inCart ? 'none' : 'inset 0 0 0 1px var(--line)',
                  cursor: inCart ? 'default' : 'pointer',
                }}>
                {inCart ? <><Icon name="check" size={14} /> {t.in_cart}</> : <><Icon name="cart" size={14} /> {t.add_cart}</>}
              </button>

              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 10 }}>
                  {t.instructor.toUpperCase()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 50, overflow: 'hidden', background: 'var(--bg)' }}>
                    <img src="assets/francesco-cutout.png" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Francesco Coccimiglio</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>PhD Fisica Teorica · 4 {lang==='it'?'anni di tutoring':'years tutoring'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="card" style={{ padding: 24, marginTop: 16 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 14 }}>
              {lang==='it'?'POTREBBE INTERESSARTI':'YOU MIGHT LIKE'}
            </div>
            {COURSES.filter(c => c.id !== course.id).slice(0,3).map(c => (
              <div key={c.id} onClick={() => setPage({ name: 'course-detail', id: c.id })}
                style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: '1px solid var(--line)', cursor: 'pointer' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                  background: `${SUBJECTS.find(s=>s.id===c.subject).color}15`,
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                  fontSize: 28, color: SUBJECTS.find(s=>s.id===c.subject).color,
                }}>{SUBJECTS.find(s=>s.id===c.subject).glyph}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{c['title_'+lang]}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>€{c.price} · {c.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { CoursesPage, CourseDetailPage });
