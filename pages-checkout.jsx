// =====================================================
// CHECKOUT — cart → payment → success
// =====================================================

const CheckoutPage = ({ lang, t, setPage, cart, removeFromCart, clearCart, setEnrolled }) => {
  const { isMobile } = useResponsive();
  const [step, setStep] = useState('cart'); // cart | pay | done
  const [form, setForm] = useState({ name: '', email: '', card: '', exp: '', cvc: '' });
  const items = cart.map(id => COURSES.find(c => c.id === id)).filter(Boolean);
  const subtotal = items.reduce((s, c) => s + c.price, 0);
  const discount = subtotal > 200 ? 30 : 0;
  const vat = Math.round((subtotal - discount) * 0.22);
  const total = subtotal - discount + vat;

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="page-enter" style={{ maxWidth: 'var(--page-max)', margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
        <div className="card" style={{ padding: isMobile ? '60px 20px' : '120px 56px', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 72, opacity: 0.2, marginBottom: 20 }}>🛒</div>
          <h2 className="display" style={{ fontSize: 48, margin: 0 }}>
            {lang==='it'?'Carrello vuoto':'Empty cart'}
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 12 }}>
            {lang==='it'?'Aggiungi un corso per iniziare':'Add a course to get started'}
          </p>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setPage({ name: 'courses' })}>
            {t.cta_browse}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: isMobile ? '100%' : 1100, margin: '24px auto 0', padding: '0 var(--page-pad)' }}>
      {/* Progress */}
      <div className="card" style={{ padding: isMobile ? 16 : 22, marginBottom: 16, display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { k: 'cart', l: lang==='it'?'Carrello':'Cart' },
          { k: 'pay', l: t.payment },
          { k: 'done', l: lang==='it'?'Conferma':'Confirm' },
        ].map((s, i, arr) => (
          <React.Fragment key={s.k}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 50,
                background: ['cart','pay','done'].indexOf(step) >= i ? 'var(--ink)' : 'var(--bg)',
                color: ['cart','pay','done'].indexOf(step) >= i ? '#fff' : 'var(--muted)',
                display: 'grid', placeItems: 'center',
                fontSize: 12, fontWeight: 700,
              }}>{i+1}</div>
              <span style={{
                fontSize: 13, fontWeight: 600,
                color: step === s.k ? 'var(--ink)' : 'var(--muted)',
              }}>{s.l}</span>
            </div>
            {i < arr.length - 1 && <div style={{ width: 40, height: 1, background: 'var(--line)' }} />}
          </React.Fragment>
        ))}
      </div>

      {step === 'cart' && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.6fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 32 }}>
            <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>
              {lang==='it'?'Il tuo carrello':'Your cart'} <span style={{ color: 'var(--muted)', fontSize: 16, fontWeight: 400 }}>· {items.length}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(c => (
                <div key={c.id} style={{
                  display: 'flex', gap: 16, padding: 16,
                  background: 'var(--bg)', borderRadius: 16,
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                    background: `${SUBJECTS.find(s=>s.id===c.subject).color}15`,
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'Times New Roman, serif', fontStyle: 'italic',
                    fontSize: 40, color: SUBJECTS.find(s=>s.id===c.subject).color,
                  }}>{SUBJECTS.find(s=>s.id===c.subject).glyph}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{c['title_'+lang]}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{c['level_'+lang]} · {c.duration} · {c.lessons} {t.lessons.toLowerCase()}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: 'var(--good)', fontWeight: 600 }}>
                      ✓ {lang==='it'?'Accesso a vita':'Lifetime access'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <button onClick={() => removeFromCart(c.id)} style={{
                      background: '#fff', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: 50,
                      display: 'grid', placeItems: 'center',
                    }}><Icon name="x" size={14} /></button>
                    <div className="display" style={{ fontSize: 22 }}>€{c.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ alignSelf: 'flex-start', position: 'sticky', top: 100 }}>
            <div className="card" style={{ padding: 28 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 14 }}>
                {lang==='it'?'RIEPILOGO ORDINE':'ORDER SUMMARY'}
              </div>
              <SummaryRow l={lang==='it'?'Subtotale':'Subtotal'} v={`€${subtotal}`} />
              {discount > 0 && <SummaryRow l={lang==='it'?'Sconto bundle':'Bundle discount'} v={`-€${discount}`} good />}
              <SummaryRow l="IVA 22%" v={`€${vat}`} />
              <div style={{ height: 1, background: 'var(--line)', margin: '14px 0' }} />
              <SummaryRow l={t.total} v={`€${total}`} big />
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20, padding: '16px 22px' }}
                onClick={() => setStep('pay')}>
                {t.proceed} <Icon name="arrow" size={14} stroke="#fff" />
              </button>
              <div style={{ marginTop: 16, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
                🔒 {lang==='it'?'Pagamento sicuro · Stripe':'Secure payment · Stripe'}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'pay' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 32 }}>
            <h2 className="display" style={{ fontSize: 32, margin: '0 0 20px' }}>{t.payment}</h2>

            <Field label={lang==='it'?'Nome e cognome':'Full name'} value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Mario Rossi" />
            <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="mario@email.it" />

            <div style={{ marginTop: 20, marginBottom: 12, fontSize: 13, fontWeight: 600 }}>
              {lang==='it'?'Metodo di pagamento':'Payment method'}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[{k:'card',l:'Carta'},{k:'paypal',l:'PayPal'},{k:'sepa',l:'SEPA'}].map(m => (
                <div key={m.k} style={{
                  flex:1, padding:14, background: m.k==='card'?'var(--ink)':'var(--bg)', color: m.k==='card'?'#fff':'var(--ink)',
                  borderRadius:12, textAlign:'center', fontSize:13, fontWeight:600, cursor:'pointer',
                }}>{m.l}</div>
              ))}
            </div>

            <Field label={lang==='it'?'Numero carta':'Card number'} value={form.card} onChange={v => setForm({...form, card: v})} placeholder="4242 4242 4242 4242" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label={lang==='it'?'Scadenza':'Expiry'} value={form.exp} onChange={v => setForm({...form, exp: v})} placeholder="MM/YY" />
              <Field label="CVC" value={form.cvc} onChange={v => setForm({...form, cvc: v})} placeholder="123" />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button className="btn btn-light" onClick={() => setStep('cart')}>
                <Icon name="arrow_left" size={14} /> {lang==='it'?'Indietro':'Back'}
              </button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  setEnrolled(prev => [...new Set([...prev, ...cart])]);
                  setStep('done');
                }}>
                {t.confirm_pay} · €{total}
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: 28, alignSelf: 'flex-start' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 14 }}>
              {lang==='it'?'RIEPILOGO':'SUMMARY'}
            </div>
            {items.map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ flex: 1, marginRight: 8 }}>{c['title_'+lang]}</span>
                <span style={{ fontWeight: 600 }}>€{c.price}</span>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <SummaryRow l={lang==='it'?'Subtotale':'Subtotal'} v={`€${subtotal}`} />
              {discount > 0 && <SummaryRow l={lang==='it'?'Sconto':'Discount'} v={`-€${discount}`} good />}
              <SummaryRow l="IVA 22%" v={`€${vat}`} />
              <div style={{ height: 1, background: 'var(--line)', margin: '12px 0' }} />
              <SummaryRow l={t.total} v={`€${total}`} big />
            </div>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="card" style={{ padding: '80px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Spheres count={5} seed={9} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 80, height: 80, margin: '0 auto 24px', borderRadius: 50,
              background: 'var(--accent)', display: 'grid', placeItems: 'center',
            }}>
              <Icon name="check" size={36} stroke="#fff" strokeWidth={2.4} />
            </div>
            <h2 className="display" style={{ fontSize: 64, margin: 0, lineHeight: 1 }}>{t.order_complete}</h2>
            <p style={{ marginTop: 14, color: 'var(--muted)', fontSize: 16 }}>{t.order_complete_sub}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => { clearCart(); setPage({ name: 'dashboard' }); }}>
                {t.go_dashboard} <Icon name="arrow" size={14} stroke="#fff" />
              </button>
              <button className="btn btn-light" onClick={() => { clearCart(); setPage({ name: 'home' }); }}>
                {lang==='it'?'Torna alla home':'Back to home'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryRow = ({ l, v, big, good }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', fontSize: big ? 16 : 13 }}>
    <span style={{ color: big ? 'var(--ink)' : 'var(--muted)', fontWeight: big ? 700 : 400 }}>{l}</span>
    <span className={big ? 'display' : ''} style={{
      fontSize: big ? 28 : 14,
      fontWeight: big ? 900 : 600,
      color: good ? 'var(--good)' : 'var(--ink)',
    }}>{v}</span>
  </div>
);

const Field = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginTop: 14 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: '100%', padding: '14px 16px', borderRadius: 12,
        border: '1px solid var(--line)', background: '#fff',
        fontSize: 14, fontFamily: 'Inter', outline: 'none',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
      onBlur={e => e.target.style.borderColor = 'var(--line)'} />
  </div>
);

Object.assign(window, { CheckoutPage });
