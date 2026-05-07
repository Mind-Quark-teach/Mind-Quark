// =====================================================
// PLAYER — video lesson player with playlist + chat + materials
// =====================================================

const PlayerPage = ({ lang, t, setPage, page }) => {
  const course = COURSES.find(c => c.id === page.id) || COURSES[0];
  const subj = SUBJECTS.find(s => s.id === course.subject);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(34);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [tab, setTab] = useState('lessons');

  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => setProgress(p => Math.min(100, p + 0.3)), 1000);
    return () => clearInterval(i);
  }, [playing]);

  const current = PLAYER_LESSONS.find(l => l.current) || PLAYER_LESSONS[2];

  return (
    <div className="page-enter" style={{ maxWidth: 1320, margin: '24px auto 0', padding: '0 16px' }}>
      <button onClick={() => setPage({ name: 'dashboard' })}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)',
          fontSize: 13, padding: '8px 0', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Icon name="arrow_left" size={14} /> {lang==='it'?'Torna all\'area studente':'Back to student area'}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>
        {/* LEFT — video + info */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden', background: '#0d1220' }}>
            {/* Video stage */}
            <div style={{
              aspectRatio: '16/9', position: 'relative',
              background: `radial-gradient(circle at 50% 40%, ${subj.color}30 0%, #0d1220 70%)`,
              display: 'grid', placeItems: 'center', overflow: 'hidden',
            }}>
              {/* fake math content */}
              <div style={{
                fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                fontSize: 120, color: '#fff', opacity: 0.95, textAlign: 'center', lineHeight: 1.1,
                textShadow: '0 4px 30px rgba(0,0,0,0.4)',
              }}>
                lim<sub style={{fontSize:38}}>x→0</sub><br/>
                <span style={{ fontSize: 64 }}>sin(x) / x = 1</span>
              </div>
              <div style={{
                position: 'absolute', top: 16, left: 16,
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: 999,
                color: '#fff', fontSize: 11, fontWeight: 600, backdropFilter: 'blur(8px)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: '#22c55e' }} />
                {course['title_'+lang]} · {current.n}
              </div>

              {/* Center play overlay (clickable area) */}
              <div onClick={() => setPlaying(p => !p)}
                style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />
              {!playing && (
                <div style={{
                  position: 'absolute', width: 80, height: 80, borderRadius: 50,
                  background: 'rgba(255,255,255,0.95)', display: 'grid', placeItems: 'center',
                  pointerEvents: 'none',
                }}>
                  <Icon name="play" size={32} stroke="var(--ink)" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ padding: '14px 18px', background: '#0d1220', color: '#fff' }}>
              <div style={{
                height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 12,
                position: 'relative', cursor: 'pointer',
              }}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - r.left) / r.width) * 100);
                }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                <div style={{
                  position: 'absolute', left: `${progress}%`, top: '50%', transform: 'translate(-50%, -50%)',
                  width: 12, height: 12, borderRadius: 50, background: '#fff',
                }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button onClick={() => setPlaying(p => !p)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff',
                  width: 36, height: 36, borderRadius: 50, display: 'grid', placeItems: 'center',
                }}>
                  <Icon name={playing ? 'pause' : 'play'} size={18} stroke="#fff" />
                </button>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                  {String(Math.floor(progress * 0.22 / 60)).padStart(2,'0')}:{String(Math.floor(progress * 0.22) % 60).padStart(2,'0')} / {current.dur}
                </span>
                <div style={{ flex: 1 }} />
                <select value={speed} onChange={e=>setSpeed(parseFloat(e.target.value))} style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none',
                  padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>
                  {[0.75, 1, 1.25, 1.5, 1.75, 2].map(s => <option key={s} value={s} style={{color:'#000'}}>{s}×</option>)}
                </select>
                <Icon name="volume" size={16} stroke="#fff" />
                <input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(e.target.value)}
                  style={{ width: 80 }} />
                <Icon name="settings" size={16} stroke="#fff" />
                <Icon name="fullscreen" size={16} stroke="#fff" />
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div className="card" style={{ marginTop: 16, padding: 28 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', color: subj.color, marginBottom: 8 }}>
              {subj[lang].toUpperCase()} · {current.n}
            </div>
            <h2 className="display" style={{ fontSize: 32, margin: '0 0 12px' }}>{current['t_'+lang]}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {lang==='it'
                ? 'In questa lezione vediamo i limiti notevoli più importanti dell\'analisi: il limite fondamentale di sin(x)/x, il limite di Eulero (1+1/n)ⁿ e quello di (1-cos(x))/x². Ogni dimostrazione è seguita da esempi numerici.'
                : 'In this lesson we cover the most important notable limits in calculus: the fundamental limit of sin(x)/x, the Euler limit (1+1/n)ⁿ, and (1-cos(x))/x². Each proof is followed by numerical examples.'}
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-light"><Icon name="file" size={14} /> {lang==='it'?'Dispensa PDF':'PDF notes'}</button>
              <button className="btn btn-light"><Icon name="download" size={14} /> {lang==='it'?'Esercizi':'Exercises'}</button>
              <button className="btn btn-light" onClick={() => setShowNotes(s => !s)}>
                <Icon name="chat" size={14} /> {lang==='it'?'Chiedi al docente':'Ask the teacher'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — playlist tabs */}
        <div style={{ position: 'sticky', top: 100, alignSelf: 'flex-start', maxHeight: 'calc(100vh - 120px)' }}>
          <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', padding: 8, gap: 4, borderBottom: '1px solid var(--line)' }}>
              {[
                { k: 'lessons', l: t.lessons },
                { k: 'materials', l: t.materials },
                { k: 'chat', l: t.chat_live },
              ].map(tb => (
                <button key={tb.k} onClick={() => setTab(tb.k)}
                  style={{
                    flex: 1, background: tab===tb.k ? 'var(--bg)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    padding: '10px', borderRadius: 12,
                    fontSize: 13, fontWeight: 600,
                    color: tab===tb.k ? 'var(--ink)' : 'var(--muted)',
                  }}>{tb.l}</button>
              ))}
            </div>

            {tab === 'lessons' && (
              <div style={{ padding: 14, overflowY: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
                {PLAYER_LESSONS.map(l => (
                  <div key={l.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: 12,
                    borderRadius: 12, cursor: 'pointer',
                    background: l.current ? 'var(--accent-soft)' : 'transparent',
                  }}
                    onMouseOver={e => { if (!l.current) e.currentTarget.style.background = 'var(--bg)'; }}
                    onMouseOut={e => { if (!l.current) e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 50, flexShrink: 0,
                      background: l.done ? 'var(--accent)' : '#fff',
                      display: 'grid', placeItems: 'center',
                      boxShadow: l.done ? 'none' : 'inset 0 0 0 1px var(--line)',
                    }}>
                      {l.done ? <Icon name="check" size={14} stroke="#fff" /> :
                        l.current ? <Icon name="play" size={10} stroke="var(--accent)" /> :
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{l.n}</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: l.current ? 700 : 500, color: l.current ? 'var(--accent)' : 'var(--ink)' }}>
                        {l['t_'+lang]}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{l.dur}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'materials' && (
              <div style={{ padding: 16 }}>
                {['Dispensa - Limiti notevoli.pdf','Esercizi svolti.pdf','Formulario.pdf'].map((m,i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: 12,
                    background: 'var(--bg)', borderRadius: 12, marginBottom: 8,
                  }}>
                    <div style={{ width: 32, height: 40, borderRadius: 6, background: '#fff',
                      display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: 'var(--accent)' }}>PDF</div>
                    <div style={{ flex: 1, fontSize: 12, fontWeight: 500 }}>{m}</div>
                    <Icon name="download" size={14} stroke="var(--muted)" />
                  </div>
                ))}
              </div>
            )}

            {tab === 'chat' && (
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10, height: 480 }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { who: 'fc', n: 'Francesco', t_it: 'Ciao! Domande sulla lezione?', t_en: 'Hey! Any questions on the lesson?' },
                    { who: 'me', n: 'Tu', t_it: 'Non ho capito perché sin(x)/x → 1', t_en: 'I don\'t get why sin(x)/x → 1' },
                    { who: 'fc', n: 'Francesco', t_it: 'È un limite "fondamentale". Si dimostra geometricamente con il teorema del confronto. Ti mando lo screenshot al min 04:32 ✏️', t_en: 'It\'s a fundamental limit. Proven via squeeze theorem geometrically. Check min 04:32 ✏️' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.who==='me'?'flex-end':'flex-start' }}>
                      <div style={{
                        maxWidth: '80%', padding: '10px 14px', borderRadius: 16,
                        background: m.who==='me' ? 'var(--accent)' : 'var(--bg)',
                        color: m.who==='me' ? '#fff' : 'var(--ink)',
                        fontSize: 13, lineHeight: 1.4,
                      }}>
                        {m.who!=='me' && <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4, color: 'var(--accent)' }}>{m.n}</div>}
                        {m['t_'+lang]}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input placeholder={t.type_message} style={{
                    flex: 1, padding: '12px 16px', borderRadius: 999,
                    border: '1px solid var(--line)', fontSize: 13, fontFamily: 'Inter', outline: 'none',
                  }} />
                  <button className="btn btn-primary" style={{ padding: '12px 16px' }}>
                    <Icon name="arrow" size={14} stroke="#fff" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PlayerPage });
