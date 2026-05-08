// =====================================================
// ONBOARDING — registration / signup flow
// =====================================================

const OnboardingPage = ({ lang, t, setPage, enrolled, setEnrolled }) => {
  const { isMobile } = useResponsive();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [level, setLevel] = useState('');
  const [interests, setInterests] = useState([]);
  const [terms, setTerms] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const totalSteps = 4;

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!name.trim()) { setError(lang === 'it' ? 'Inserisci il nome' : 'Enter your name'); return; }
      if (!email.trim() || !email.includes('@')) { setError(lang === 'it' ? 'Email non valida' : 'Invalid email'); return; }
      if (password.length < 8) { setError(lang === 'it' ? 'Password minima 8 caratteri' : 'Password min 8 characters'); return; }
      if (password !== confirmPw) { setError(lang === 'it' ? 'Le password non coincidono' : 'Passwords do not match'); return; }
    }
    if (step === 2) {
      if (!level) { setError(lang === 'it' ? 'Seleziona il tuo livello' : 'Select your level'); return; }
    }
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      setEnrolled((prev) => [...prev, ...interests.map((id) => ({ id, name }))]);
    }
  };

  const handleSkip = () => {
    setStep((s) => s + 1);
  };

  const inputStyle = {
    width: '100%', padding: '16px 18px', borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--line)', background: 'var(--bg)',
    fontFamily: 'Inter', fontSize: 15, color: 'var(--ink)',
    outline: 'none', transition: 'border-color 0.2s',
  };

  const levels = [
    { id: 'high', icon: 'book' },
    { id: 'uni', icon: 'grad' },
    { id: 'adult', icon: 'user' },
  ];

  const levelLabels = {
    high: t.onboarding_level_high,
    uni: t.onboarding_level_uni,
    adult: t.onboarding_level_adult,
  };

  if (done) {
    return (
      <div className="page-enter" style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
        <div className="card" style={{ padding: isMobile ? 40 : 72, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Spheres count={isMobile ? 2 : 4} seed={7} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="ok-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="1200" height="600" fill="url(#ok-grid)"/>
            </svg>
          </div>

          <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%', background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 28px'
            }}>
              <Icon name="check" size={40} stroke="var(--accent)" strokeWidth={2.5} />
            </div>
            <h2 className="display" style={{ fontSize: isMobile ? 32 : 42, margin: '0 0 12px', lineHeight: 1.1 }}>
              {t.onboarding_success}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 32px' }}>
              {t.onboarding_success_sub}
            </p>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '16px 32px' }}
              onClick={() => setPage({ name: 'dashboard' })}>
              <Icon name="arrow" size={16} stroke="#fff" />
              {t.onboarding_go_dashboard}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: 660, margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      {/* Progress steps */}
      <div className="card" style={{ padding: isMobile ? 24 : 32, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {[t.onboarding_step_1, t.onboarding_step_2, t.onboarding_step_3, t.onboarding_terms].map((label, i) => {
            const idx = i + 1;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10,
                flex: 1
              }}>
                <div style={{
                  width: isMobile ? 28 : 34, height: isMobile ? 28 : 34, borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  background: done ? 'var(--accent)' : active ? 'var(--accent)' : 'var(--bg)',
                  color: done || active ? '#fff' : 'var(--muted)',
                  fontSize: isMobile ? 11 : 13, fontWeight: 700, fontFamily: 'Inter',
                  transition: 'all 0.3s',
                  boxShadow: active ? '0 0 0 4px var(--accent-soft)' : 'none'
                }}>
                  {done ? <Icon name="check" size={isMobile ? 12 : 14} stroke="#fff" /> : idx}
                </div>
                {!isMobile && (
                  <span style={{
                    fontSize: 12, fontWeight: active || done ? 600 : 400,
                    color: done ? 'var(--accent)' : active ? 'var(--ink)' : 'var(--muted)',
                    whiteSpace: 'nowrap'
                  }}>{label}</span>
                )}
                {i < 3 && <div style={{
                  flex: 1, height: 1,
                  background: done ? 'var(--accent)' : 'var(--line)',
                  margin: '0 4px', transition: 'background 0.3s'
                }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="card" style={{ padding: isMobile ? 28 : 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Spheres count={2} seed={step} />
        </div>

        <div style={{ position: 'relative' }}>
          {/* Error */}
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)',
              padding: '12px 16px', marginBottom: 24, fontSize: 14, fontWeight: 500,
              color: '#DC2626', display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Icon name="x" size={16} stroke="#DC2626" />
              {error}
            </div>
          )}

          {/* Step 1 — personal details */}
          {step === 1 && (
            <div className="anim-fade-up">
              <h2 className="display" style={{ fontSize: isMobile ? 24 : 30, margin: '0 0 6px', lineHeight: 1.1 }}>
                {t.onboarding_title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {t.onboarding_sub}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, display: 'block' }}>
                    {t.onboarding_name}
                  </label>
                  <input style={inputStyle} type="text" placeholder={t.onboarding_placeholder_name}
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, display: 'block' }}>
                    {t.onboarding_email}
                  </label>
                  <input style={inputStyle} type="email" placeholder={t.onboarding_placeholder_email}
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, display: 'block' }}>
                      {t.onboarding_password}
                    </label>
                    <input style={inputStyle} type="password" placeholder="••••••••"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div style={{ fontSize: 11, color: password.length >= 8 ? 'var(--good)' : 'var(--muted)', marginTop: 4 }}>
                      {t.onboarding_password_note}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6, display: 'block' }}>
                      {t.onboarding_confirm}
                    </label>
                    <input style={inputStyle} type="password" placeholder="••••••••"
                      value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — level */}
          {step === 2 && (
            <div className="anim-fade-up">
              <h2 className="display" style={{ fontSize: isMobile ? 24 : 30, margin: '0 0 6px', lineHeight: 1.1 }}>
                {t.onboarding_level}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {t.onboarding_level_sub}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {levels.map((l) => (
                  <button key={l.id} onClick={() => setLevel(l.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: isMobile ? 16 : 20, borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${level === l.id ? 'var(--accent)' : 'var(--line)'}`,
                      background: level === l.id ? 'var(--accent-soft)' : 'var(--card)',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s', fontFamily: 'Inter', fontSize: 15,
                      color: level === l.id ? 'var(--accent)' : 'var(--ink-2)',
                      fontWeight: level === l.id ? 600 : 500,
                    }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 'var(--radius-sm)',
                      background: level === l.id ? 'var(--accent)' : 'var(--bg)',
                      display: 'grid', placeItems: 'center',
                      transition: 'background 0.2s'
                    }}>
                      <Icon name={l.icon} size={18} stroke={level === l.id ? '#fff' : 'var(--muted)'} />
                    </div>
                    <span>{levelLabels[l.id]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — interests */}
          {step === 3 && (
            <div className="anim-fade-up">
              <h2 className="display" style={{ fontSize: isMobile ? 24 : 30, margin: '0 0 6px', lineHeight: 1.1 }}>
                {t.onboarding_interests}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {t.onboarding_interests_sub}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {SUBJECTS.map((s) => {
                  const sel = interests.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleInterest(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: isMobile ? 12 : 16, borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${sel ? s.color : 'var(--line)'}`,
                        background: sel ? `${s.color}11` : 'var(--card)',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s', fontFamily: 'Inter', fontSize: 13,
                        color: sel ? s.color : 'var(--ink-2)',
                        fontWeight: sel ? 600 : 500,
                      }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                        background: sel ? s.color : 'var(--bg)',
                        display: 'grid', placeItems: 'center',
                        fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                        fontSize: 18, color: sel ? '#fff' : 'var(--muted)',
                        transition: 'all 0.2s'
                      }}>
                        {s.glyph}
                      </div>
                      <span>{s[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4 — terms & submit */}
          {step === 4 && (
            <div className="anim-fade-up">
              <h2 className="display" style={{ fontSize: isMobile ? 24 : 30, margin: '0 0 6px', lineHeight: 1.1 }}>
                {t.onboarding_terms.split(' ')[0]}…
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 28px', lineHeight: 1.5 }}>
                {t.onboarding_sub}
              </p>

              <div style={{
                background: 'var(--bg)', borderRadius: 'var(--radius-md)',
                padding: isMobile ? 16 : 24, marginBottom: 24
              }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                  <div style={{ marginBottom: 12, fontWeight: 600, color: 'var(--ink-2)' }}>{name}</div>
                  <div style={{ marginBottom: 4 }}>{email}</div>
                  <div style={{ marginBottom: 12, fontSize: 12, color: 'var(--muted-2)' }}>
                    {levelLabels[level] || level}
                  </div>
                  {interests.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {SUBJECTS.filter((s) => interests.includes(s.id)).map((s) => (
                        <span key={s.id} style={{
                          background: s.color + '22', color: s.color,
                          padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600
                        }}>{s[lang]}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <label style={{
                display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                fontSize: 13, color: 'var(--ink-2)', fontWeight: 500
              }}>
                <div onClick={() => setTerms((t) => !t)} style={{
                  width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${terms ? 'var(--accent)' : 'var(--line)'}`,
                  background: terms ? 'var(--accent)' : 'transparent',
                  display: 'grid', placeItems: 'center', cursor: 'pointer',
                  transition: 'all 0.2s', flexShrink: 0
                }}>
                  {terms && <Icon name="check" size={12} stroke="#fff" strokeWidth={3} />}
                </div>
                {t.onboarding_terms}
              </label>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 32,
            borderTop: '1px solid var(--line)', paddingTop: 24
          }}>
            <div>
              {step > 1 && (
                <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
                  <Icon name="arrow_left" size={14} />
                  {t.onboarding_prev}
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {step < totalSteps && (
                <button className="btn btn-ghost" onClick={handleSkip}
                  style={{ color: 'var(--muted)' }}>
                  {t.onboarding_skip}
                </button>
              )}
              {step < totalSteps ? (
                <button className="btn btn-primary" onClick={handleNext}>
                  {step === totalSteps ? t.onboarding_submit : t.onboarding_next}
                  <Icon name="arrow" size={14} stroke="#fff" />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleNext}
                  disabled={!terms}
                  style={{ opacity: terms ? 1 : 0.5, cursor: terms ? 'pointer' : 'not-allowed' }}>
                  <Icon name="check" size={14} stroke="#fff" />
                  {t.onboarding_submit}
                </button>
              )}
            </div>
          </div>

          {/* Login link */}
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--muted)' }}>
            {t.onboarding_login}{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setPage({ name: 'dashboard' })}>
              {t.onboarding_login_link}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OnboardingPage });
