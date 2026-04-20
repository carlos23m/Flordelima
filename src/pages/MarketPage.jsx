import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, Box, Typography, Button } from '@mui/material'
import {
  FaShoppingCart, FaTimes, FaPlus, FaMinus, FaWhatsapp,
  FaLeaf, FaTrash, FaCreditCard, FaCheckCircle,
} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const WHATSAPP_NUMBER = '50688438492'
const ONVO_PUBLIC_KEY = import.meta.env.VITE_ONVO_PUBLIC_KEY
const PROVINCIAS_CR = ['San José','Alajuela','Cartago','Heredia','Guanacaste','Puntarenas','Limón']

function loadOnvoScript() {
  return new Promise((resolve, reject) => {
    if (window.onvo?.pay) { resolve(); return }
    const existing = document.getElementById('onvo-sdk')
    if (existing) { existing.addEventListener('load', resolve); existing.addEventListener('error', reject); return }
    const s = document.createElement('script')
    s.id = 'onvo-sdk'
    s.src = 'https://sdk.onvopay.com/sdk.js'
    s.onload = resolve
    s.onerror = () => reject(new Error('No se pudo cargar el módulo de pago'))
    document.head.appendChild(s)
  })
}

const PRODUCTS = [
  {
    id: 1,
    title: 'Leche de Vaca',
    description: 'Recogida cada mañana y pasteurizada en la finca. Cremosa, pura y llena del sabor que solo da la leche de vacas que pastan en libertad.',
    priceLabel: '₡1,200 / litro',
    priceNum: 1200,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Queso Artesanal de Vaca',
    description: 'Elaborado en pequeños lotes con leche fresca de nuestra finca. Textura suave, sabor profundo y un proceso completamente artesanal, sin apuros.',
    priceLabel: '₡4,500 / 500g',
    priceNum: 4500,
    category: 'dairy',
    image: 'https://i.pinimg.com/736x/7e/da/bd/7edabd212cd93ea6a37a299f864f9d3f.jpg',
  },
  {
    id: 3,
    title: 'Limón Mexicano',
    description: 'Cosechados en plena madurez bajo el sol de Guácimo. Abundante jugo, aroma vibrante y ese frescor natural que eleva cualquier receta.',
    priceLabel: '₡100 / cada uno',
    priceNum: 100,
    category: 'citrus',
    image: 'https://i.pinimg.com/1200x/78/50/96/7850969af6fb06260934cebf95030bda.jpg',
  },
  {
    id: 4,
    title: 'Leche de Cabra',
    description: 'Más digestible y rica en nutrientes. Proviene de nuestras cabras criadas al aire libre, con alimento natural y el cuidado diario de nuestra familia.',
    priceLabel: '₡3,000 / litro',
    priceNum: 3000,
    category: 'dairy',
    image: 'https://i.pinimg.com/1200x/ea/5e/9d/ea5e9dd947880973977a1af126b29d6d.jpg',
  },
  {
    id: 5,
    title: 'Queso Artesanal de Cabra',
    description: 'De carácter único y sabor inconfundible. Elaborado artesanalmente con leche de cabra fresca, ideal para tablas gourmet y maridajes especiales.',
    priceLabel: '₡5,500 / 250g',
    priceNum: 5500,
    category: 'dairy',
    image: 'https://i.pinimg.com/736x/49/af/a9/49afa92a6b2415973544d308e4ee76fd.jpg',
  },
  {
    id: 6,
    title: 'Jabón Artesanal de Leche',
    description: 'Formulado con leche de cabra y aceites naturales de la finca. Nutre, hidrata y cuida la piel sin químicos agresivos. Un lujo sencillo y auténtico.',
    priceLabel: '₡4,500 / unidad',
    priceNum: 4500,
    category: 'artisanal',
    image: 'https://i.pinimg.com/736x/f3/69/db/f369dbe53d10e315a26b5671898f5ca6.jpg',
  },
]

const CATEGORIES = [
  { id: 'all',       label: 'Todos' },
  { id: 'dairy',     label: 'Lácteos' },
  { id: 'citrus',    label: 'Cítricos' },
  { id: 'artisanal', label: 'Artesanales' },
]


// ── Client info form ─────────────────────────────────────────────────────────

function ClientInfoForm({ open, initialData, onSubmit, onClose }) {
  const [form, setForm] = useState({
    nombre: '', email: '', telefono: '', cedula: '',
    provincia: '', canton: '', direccion: '', notas: '',
    ...initialData,
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim())   errs.nombre   = 'El nombre es obligatorio'
    if (!form.email.trim())    errs.email    = 'El correo es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Correo inválido'
    if (!form.telefono.trim()) errs.telefono = 'El teléfono es obligatorio'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit(form)
  }

  if (!open) return null

  return (
    <div className="client-form-overlay" onClick={onClose}>
      <div className="client-form-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="client-form-title">
        <div className="onvo-modal__header">
          <h2 id="client-form-title">
            <FaCreditCard style={{ marginRight: 10, color: '#40916c' }} />
            Datos de contacto
          </h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Cerrar"><FaTimes /></button>
        </div>
        <form className="client-form__body" onSubmit={handleSubmit} noValidate>
          <div className="client-form__section-label">Información requerida</div>

          <div className="client-form__field">
            <label htmlFor="cf-nombre">Nombre completo *</label>
            <input id="cf-nombre" type="text" value={form.nombre} onChange={set('nombre')}
              autoComplete="name" placeholder="Ej: María Rodríguez"
              className={errors.nombre ? 'client-form__input--error' : ''} />
            {errors.nombre && <span className="client-form__error">{errors.nombre}</span>}
          </div>

          <div className="client-form__field">
            <label htmlFor="cf-email">Correo electrónico *</label>
            <input id="cf-email" type="email" value={form.email} onChange={set('email')}
              autoComplete="email" placeholder="Ej: maria@email.com"
              className={errors.email ? 'client-form__input--error' : ''} />
            {errors.email && <span className="client-form__error">{errors.email}</span>}
          </div>

          <div className="client-form__field">
            <label htmlFor="cf-telefono">Teléfono *</label>
            <input id="cf-telefono" type="tel" value={form.telefono} onChange={set('telefono')}
              autoComplete="tel" placeholder="Ej: 8888-8888"
              className={errors.telefono ? 'client-form__input--error' : ''} />
            {errors.telefono && <span className="client-form__error">{errors.telefono}</span>}
          </div>

          <div className="client-form__field">
            <label htmlFor="cf-cedula">Cédula <span className="client-form__optional">(opcional)</span></label>
            <input id="cf-cedula" type="text" value={form.cedula} onChange={set('cedula')} placeholder="Ej: 1-1234-5678" />
          </div>

          <div className="client-form__section-label" style={{ marginTop: 6 }}>
            Dirección de entrega <span className="client-form__optional">(opcional)</span>
          </div>

          <div className="client-form__row">
            <div className="client-form__field">
              <label htmlFor="cf-provincia">Provincia</label>
              <select id="cf-provincia" value={form.provincia} onChange={set('provincia')}>
                <option value="">Seleccionar...</option>
                {PROVINCIAS_CR.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="client-form__field">
              <label htmlFor="cf-canton">Cantón</label>
              <input id="cf-canton" type="text" value={form.canton} onChange={set('canton')} placeholder="Ej: Guácimo" />
            </div>
          </div>

          <div className="client-form__field">
            <label htmlFor="cf-direccion">Dirección</label>
            <input id="cf-direccion" type="text" value={form.direccion} onChange={set('direccion')} placeholder="Ej: 200m norte del parque central" />
          </div>

          <div className="client-form__field">
            <label htmlFor="cf-notas">Notas / instrucciones</label>
            <textarea id="cf-notas" value={form.notas} onChange={set('notas')} rows={3}
              placeholder="Ej: Llamar antes de llegar, entregar en portón azul..." />
          </div>

          <button type="submit" className="cart-onvo-btn" style={{ marginTop: 4 }}>
            <FaCreditCard style={{ fontSize: '1.1rem' }} />
            Continuar al pago
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Transaction summary modal ────────────────────────────────────────────────

function TransactionSummary({ open, status, client, items, total, onClose }) {
  if (!open) return null
  const succeeded = status === 'succeeded'
  return (
    <div className="onvo-modal-overlay">
      <div className={`onvo-modal tx-summary${succeeded ? ' onvo-modal--success' : ' onvo-modal--error'}`}>
        <div className="tx-summary__header">
          {succeeded
            ? <FaCheckCircle style={{ fontSize: '2.2rem', color: '#40916c' }} />
            : <FaTimes style={{ fontSize: '2rem', color: '#c0392b' }} />
          }
          <h3>{succeeded ? '¡Pago exitoso!' : status === 'declined' ? 'Pago rechazado' : 'Error de pago'}</h3>
          <p className="tx-summary__subtitle">
            {succeeded ? 'Tu pedido ha sido confirmado.' : 'Tu carrito sigue guardado para que puedas intentarlo de nuevo.'}
          </p>
        </div>

        {client && (
          <div className="tx-summary__section">
            <p className="tx-summary__section-label">Datos del cliente</p>
            <div className="tx-summary__grid">
              <span className="tx-summary__key">Nombre</span><span>{client.nombre}</span>
              <span className="tx-summary__key">Email</span><span>{client.email}</span>
              <span className="tx-summary__key">Teléfono</span><span>{client.telefono}</span>
              {client.cedula    && <><span className="tx-summary__key">Cédula</span><span>{client.cedula}</span></>}
              {client.provincia && <><span className="tx-summary__key">Provincia</span><span>{client.provincia}</span></>}
              {client.canton    && <><span className="tx-summary__key">Cantón</span><span>{client.canton}</span></>}
              {client.direccion && <><span className="tx-summary__key">Dirección</span><span>{client.direccion}</span></>}
              {client.notas     && <><span className="tx-summary__key">Notas</span><span>{client.notas}</span></>}
            </div>
          </div>
        )}

        {items?.length > 0 && (
          <div className="tx-summary__section">
            <p className="tx-summary__section-label">Productos</p>
            <ul className="tx-summary__items">
              {items.map((item, i) => (
                <li key={i} className="tx-summary__item">
                  <span className="tx-summary__item-name">{item.title}</span>
                  <span className="tx-summary__item-qty">×{item.qty}</span>
                  <span className="tx-summary__item-price">
                    {(item.priceNum * item.qty).toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })}
                  </span>
                </li>
              ))}
            </ul>
            <div className="tx-summary__total">
              <span>Total</span>
              <span>{total.toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        )}

        <button className="cart-onvo-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

// ── Market product card ──────────────────────────────────────────────────────

function MarketCard({ product, qty, onAdd, onRemove }) {
  const accentColor = product.category === 'citrus' ? '#c8a96e' : '#40916c'
  const accentDark  = product.category === 'citrus' ? '#a0854e' : '#2d6a4f'
  const bgGradient  = product.category === 'citrus'
    ? 'linear-gradient(135deg, #fdf6e8 0%, #faf9f6 100%)'
    : 'linear-gradient(135deg, #f0faf3 0%, #faf9f6 100%)'

  return (
    <Card sx={{
      width: '100%',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(45,106,79,0.10)',
      background: '#ffffff',
      border: '1px solid #e0ddd6',
      overflow: 'hidden',
      transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 48px rgba(45,106,79,0.14)' },
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <Box sx={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${product.category === 'citrus' ? '#e8d5a3' : '#52b788'})`, flexShrink: 0 }} />
      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bgGradient, overflow: 'hidden', flexShrink: 0 }}>
        {product.image ? (
          <Box component="img" src={product.image} alt={product.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <FaLeaf style={{ fontSize: '4rem', color: accentColor, opacity: 0.35 }} />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2.5, sm: 3 }, pb: '20px !important' }}>
        <Typography component="h3" sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' }, color: '#0f1a0e', mb: 1, lineHeight: 1.25 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#5a6353', lineHeight: 1.75, fontSize: '0.87rem', flexGrow: 1, mb: 2 }}>
          {product.description}
        </Typography>
        <Box sx={{ pt: 1.5, mb: 2, borderTop: '1px solid #e8e4dc' }}>
          <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.4rem', color: accentColor, lineHeight: 1 }}>
            {product.priceLabel}
          </Typography>
        </Box>
        {qty === 0 ? (
          <Button
            variant="contained"
            fullWidth
            startIcon={<FaPlus style={{ fontSize: '0.8rem' }} />}
            onClick={onAdd}
            sx={{
              borderRadius: '8px', fontWeight: 700, textTransform: 'none', fontSize: '0.9rem',
              background: accentColor, color: '#fff', py: 1.2, fontFamily: "'Inter', sans-serif",
              boxShadow: 'none',
              '&:hover': { background: accentDark, boxShadow: `0 4px 16px ${accentColor}55` },
            }}
          >
            Agregar al carrito
          </Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button onClick={onRemove} variant="outlined" sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderRadius: '8px', borderColor: '#e0ddd6', color: '#2d6a4f', '&:hover': { borderColor: accentColor, background: '#f0faf3' } }}>
              <FaMinus style={{ fontSize: '0.75rem' }} />
            </Button>
            <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#0f1a0e', fontFamily: "'Playfair Display', serif" }}>
              {qty}
            </Typography>
            <Button onClick={onAdd} variant="contained" sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderRadius: '8px', background: accentColor, color: '#fff', boxShadow: 'none', '&:hover': { background: accentDark } }}>
              <FaPlus style={{ fontSize: '0.75rem' }} />
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// ── Cart drawer ──────────────────────────────────────────────────────────────

// ── Onvo Pay modal ───────────────────────────────────────────────────────────

function OnvoPayModal({ paymentIntentId, onClose, onResult, onError }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!paymentIntentId || !containerRef.current) return
    const instance = window.onvo.pay({
      paymentIntentId,
      publicKey: ONVO_PUBLIC_KEY,
      paymentType: 'one_time',
      onSuccess: (r) => onResult(r),
      onError: (err) => onError(err),
      onClose: () => onClose(),
    })
    instance.render(containerRef.current)
      .catch(e => console.error('Onvo render error:', e))
  }, [paymentIntentId, onClose, onResult, onError])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}

// ── Cart drawer ──────────────────────────────────────────────────────────────

function CartDrawer({ open, items, total, onClose, onAdd, onRemove, onClear, onOnvoPay, onvoLoading }) {
  const waMessage = () => {
    if (items.length === 0) return '#'
    const lines = items.map(({ product, qty }) =>
      `• ${qty}x ${product.title} — ₡${(product.priceNum * qty).toLocaleString('es-CR')}`
    ).join('\n')
    const msg = `Hola Marlen! Le hago el siguiente pedido desde la tienda de Flor de Lima 🌿\n\n📦 *Pedido:*\n${lines}\n\n💰 *Total: ₡${total.toLocaleString('es-CR')}*\n\n¡Muchas gracias!`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  return (
    <>
      <div className={`cart-overlay${open ? ' cart-overlay--open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`cart-drawer${open ? ' cart-drawer--open' : ''}`} aria-label="Carrito de compras">
        <div className="cart-drawer__header">
          <h2><FaShoppingCart style={{ marginRight: 10, fontSize: '1.1rem' }} />Tu Carrito</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Cerrar carrito"><FaTimes /></button>
        </div>
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingCart className="cart-empty__icon" />
              <p>Tu carrito está vacío</p>
              <span>Agrega productos para hacer tu pedido</span>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} className="cart-item__img" />
                <div className="cart-item__info">
                  <strong>{product.title}</strong>
                  <span>{product.priceLabel}</span>
                  <span className="cart-item__subtotal">
                    Subtotal: ₡{(product.priceNum * qty).toLocaleString('es-CR')}
                  </span>
                </div>
                <div className="cart-item__controls">
                  <button onClick={() => onRemove(product.id)} aria-label="Quitar uno"><FaMinus /></button>
                  <span>{qty}</span>
                  <button onClick={() => onAdd(product)} aria-label="Agregar uno"><FaPlus /></button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>₡{total.toLocaleString('es-CR')}</strong>
            </div>
            <button className="cart-onvo-btn" onClick={onOnvoPay} disabled={onvoLoading}>
              <FaCreditCard style={{ fontSize: '1.1rem' }} />
              {onvoLoading ? 'Procesando…' : 'Pagar con Tarjeta'}
            </button>
            <a
              href={waMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-wa-btn"
            >
              <FaWhatsapp style={{ fontSize: '1.2rem' }} />
              Ordenar por WhatsApp
            </a>
            <button className="cart-clear-btn" onClick={onClear}>
              <FaTrash style={{ fontSize: '0.8rem', marginRight: 6 }} />
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

// ── Market page ──────────────────────────────────────────────────────────────

export default function MarketPage() {
  const [cart, setCart] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)
  const [clientFormOpen, setClientFormOpen] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [clientInfo, setClientInfo] = useState(null)
  const [pendingCartItems, setPendingCartItems] = useState([])
  const [pendingTotal, setPendingTotal] = useState(0)
  const [pendingPaymentIntentId, setPendingPaymentIntentId] = useState(null)
  const [paymentIntentId, setPaymentIntentId] = useState(null)
  const [onvoOpen, setOnvoOpen] = useState(false)
  const [onvoStatus, setOnvoStatus] = useState('idle') // idle | loading | success | declined | error

  const addToCart = (product) =>
    setCart(prev => ({
      ...prev,
      [product.id]: { product, qty: (prev[product.id]?.qty || 0) + 1 },
    }))

  const removeFromCart = (id) =>
    setCart(prev => {
      const current = prev[id]
      if (!current) return prev
      if (current.qty <= 1) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { ...current, qty: current.qty - 1 } }
    })

  const clearCart = () => setCart({})

  const handleOnvoPay = () => {
    setPendingCartItems(cartItems)
    setPendingTotal(cartTotal)
    setCartOpen(false)
    setClientFormOpen(true)
  }

  const handleClientFormSubmit = async (formData) => {
    setClientInfo(formData)
    setClientFormOpen(false)
    setOnvoStatus('loading')
    try {
      await loadOnvoScript()
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal, description: 'Pedido Flor de Lima' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear el pago')
      setPendingPaymentIntentId(data.id)
      setPaymentIntentId(data.id)
      setOnvoOpen(true)
      setOnvoStatus('idle')
    } catch {
      setOnvoStatus('error')
      setSummaryOpen(true)
    }
  }

  const persistTransaction = async (status, onvoResult) => {
    if (!clientInfo || !pendingPaymentIntentId) return
    try {
      await fetch('/api/save-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: clientInfo,
          paymentIntentId: pendingPaymentIntentId,
          amount: pendingTotal,
          status,
          onvoResult: onvoResult ?? null,
          items: pendingCartItems.map(({ product, qty }) => ({
            id: product.id, title: product.title,
            priceNum: product.priceNum, priceLabel: product.priceLabel,
            category: product.category, qty,
          })),
        }),
      })
    } catch (err) {
      console.error('Failed to persist transaction:', err)
    }
  }

  const handleOnvoResult = (result) => {
    if (result?.status === 'succeeded') {
      setOnvoStatus('success')
      persistTransaction('succeeded', result)
      setCart({})
    } else {
      setOnvoStatus('declined')
      persistTransaction('declined', result)
    }
    setOnvoOpen(false)
    setSummaryOpen(true)
  }

  const handleOnvoError = (err) => {
    setOnvoStatus('error')
    persistTransaction('failed', err)
    setOnvoOpen(false)
    setSummaryOpen(true)
  }

  const resetOnvo = () => {
    setOnvoOpen(false)
    setSummaryOpen(false)
    setPaymentIntentId(null)
    setPendingPaymentIntentId(null)
    setOnvoStatus('idle')
  }

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, { qty }) => s + qty, 0)
  const cartTotal = cartItems.reduce((s, { product, qty }) => s + product.priceNum * qty, 0)

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  const navLinks = [
    { href: '/',         label: 'Inicio' },
    { href: '/#products', label: 'Productos' },
    { href: '/#story',   label: 'Historia' },
    { href: '/#contact', label: 'Contacto' },
  ]

  return (
    <>
      <Navbar
        brand="Flor de Lima"
        links={navLinks}
        brandHref="/"
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="site-main market-page">
        <section className="market-hero">
          <div className="container market-hero__inner">
            <div className="market-hero__copy">
              <span className="section-eyebrow">Tienda en Línea</span>
              <h1>Del campo<br />a tu puerta</h1>
              <p>Elige tus productos, arma tu pedido y paga con tarjeta o coordina la entrega directamente con Marlen por WhatsApp.</p>
            </div>
            <div className="market-hero__badge">
              <FaLeaf style={{ fontSize: '2.5rem', color: '#c8a96e' }} />
              <span>100% Artesanal</span>
            </div>
          </div>
        </section>

        <div className="market-filters">
          <div className="container market-filters__inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn${activeCategory === cat.id ? ' filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
                <span className="filter-btn__count">
                  {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <section className="market-grid-section">
          <div className="container">
            {filtered.length === 0 ? (
              <p className="market-empty">No hay productos en esta categoría.</p>
            ) : (
              <div className="market-grid">
                {filtered.map(product => (
                  <MarketCard
                    key={product.id}
                    product={product}
                    qty={cart[product.id]?.qty || 0}
                    onAdd={() => addToCart(product)}
                    onRemove={() => removeFromCart(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="market-info-strip">
          <div className="container market-info-strip__inner">
            <div className="market-info-item">
              <span className="market-info-item__icon">🌱</span>
              <strong>Cosechado en la finca</strong>
              <p>De nuestras manos directamente a las tuyas</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">💳</span>
              <strong>Pago con tarjeta</strong>
              <p>Procesado de forma segura con Onvopay</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">💬</span>
              <strong>Pedido por WhatsApp</strong>
              <p>Coordina tu entrega directo con Marlen</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">🌿</span>
              <strong>Sin Artificios</strong>
              <p>Ingredientes naturales, procesos honestos</p>
            </div>
          </div>
        </section>
      </main>

      {cartCount > 0 && (
        <button className="cart-fab" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">
          <FaShoppingCart />
          <span className="cart-fab__badge">{cartCount}</span>
        </button>
      )}

      <ClientInfoForm
        open={clientFormOpen}
        initialData={clientInfo}
        onSubmit={handleClientFormSubmit}
        onClose={() => setClientFormOpen(false)}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
        onOnvoPay={handleOnvoPay}
        onvoLoading={onvoStatus === 'loading'}
      />

      {onvoOpen && paymentIntentId && (
        <OnvoPayModal
          paymentIntentId={paymentIntentId}
          onClose={() => { if (onvoStatus === 'idle' || onvoStatus === 'loading') resetOnvo() }}
          onResult={handleOnvoResult}
          onError={handleOnvoError}
        />
      )}

      <TransactionSummary
        open={summaryOpen}
        status={onvoStatus}
        client={clientInfo}
        items={pendingCartItems.map(({ product, qty }) => ({ ...product, qty }))}
        total={pendingTotal}
        onClose={resetOnvo}
      />

      <Footer
        brand="Flor de Lima"
        phone="8843-8492"
        whatsapp="https://wa.me/50688438492"
        facebook="https://facebook.com"
        instagram="https://instagram.com"
        tiktok="https://tiktok.com"
        location="Guacimo, Limón, Costa Rica"
        contact="Marlen Navarro"
      />
    </>
  )
}
