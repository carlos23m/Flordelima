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

function loadOnvoScript() {
  return new Promise((resolve, reject) => {
    if (window.onvo) { resolve(window.onvo); return }
    const existing = document.querySelector('script[data-onvo]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.onvo))
      existing.addEventListener('error', () => reject(new Error('No se pudo cargar el sistema de pago')))
      return
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/logeek-io/onvo-pay-js@main/dist/onvo.min.js'
    script.setAttribute('data-onvo', '')
    script.onload = () => resolve(window.onvo)
    script.onerror = () => reject(new Error('No se pudo cargar el sistema de pago'))
    document.head.appendChild(script)
  })
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

function CartDrawer({ open, items, total, onClose, onAdd, onRemove, onClear, onOnvoPay }) {
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
            <button className="cart-onvo-btn" onClick={onOnvoPay}>
              <FaCreditCard style={{ fontSize: '1.1rem' }} />
              Pagar con tarjeta
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

// ── Onvopay modal ────────────────────────────────────────────────────────────

function OnvoPayModal({ open, status, error, containerRef, onClose, onSuccessClose }) {
  if (!open) return null
  return (
    <>
      <div
        className="cart-overlay cart-overlay--open"
        onClick={status === 'success' ? onSuccessClose : onClose}
        aria-hidden="true"
      />
      <div className="onvo-modal" role="dialog" aria-modal="true" aria-label="Pago seguro">
        <div className="onvo-modal__header">
          <h2>
            <FaCreditCard style={{ marginRight: 10, fontSize: '1rem' }} />
            Pago Seguro
          </h2>
          <button
            className="cart-drawer__close"
            onClick={status === 'success' ? onSuccessClose : onClose}
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>
        <div className="onvo-modal__body">
          {status === 'loading' && (
            <div className="onvo-loading">
              <div className="onvo-spinner" />
              <p>Preparando tu pago de forma segura...</p>
            </div>
          )}
          <div
            ref={containerRef}
            id="onvo-payment-container"
            style={{ display: status === 'form' ? 'block' : 'none' }}
          />
          {status === 'success' && (
            <div className="onvo-success">
              <FaCheckCircle className="onvo-success__icon" />
              <h3>¡Pago realizado con éxito!</h3>
              <p>Gracias por tu pedido. Marlen te contactará pronto para coordinar la entrega.</p>
              <button className="btn btn-primary" onClick={onSuccessClose}>
                Cerrar
              </button>
            </div>
          )}
          {status === 'error' && (
            <div className="onvo-error">
              <p>{error}</p>
              <button className="btn btn-secondary" onClick={onClose}>
                Volver al carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Market page ──────────────────────────────────────────────────────────────

export default function MarketPage() {
  const [cart, setCart] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)

  const [onvoOpen, setOnvoOpen]     = useState(false)
  const [onvoStatus, setOnvoStatus] = useState('idle')
  const [onvoError, setOnvoError]   = useState(null)
  const [paymentIntentId, setPaymentIntentId] = useState(null)
  const onvoContainerRef = useRef(null)

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

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, { qty }) => s + qty, 0)
  const cartTotal = cartItems.reduce((s, { product, qty }) => s + product.priceNum * qty, 0)

  useEffect(() => {
    if (!paymentIntentId || !onvoContainerRef.current) return
    let cancelled = false

    loadOnvoScript()
      .then(sdk => {
        if (cancelled || !onvoContainerRef.current) return
        sdk.pay({
          publicKey: ONVO_PUBLIC_KEY,
          paymentIntentId,
          paymentType: 'one_time',
          onSuccess: () => { if (!cancelled) setOnvoStatus('success') },
          onError: (err) => {
            if (cancelled) return
            setOnvoStatus('error')
            setOnvoError(err?.message || 'Ocurrió un error con el pago. Intenta nuevamente.')
          },
        }).render(onvoContainerRef.current)
        if (!cancelled) setOnvoStatus('form')
      })
      .catch(err => {
        if (!cancelled) {
          setOnvoStatus('error')
          setOnvoError(err.message || 'No se pudo cargar el sistema de pago')
        }
      })

    return () => { cancelled = true }
  }, [paymentIntentId])

  const handleOnvoPay = async () => {
    setCartOpen(false)
    setOnvoOpen(true)
    setOnvoStatus('loading')
    setOnvoError(null)
    setPaymentIntentId(null)

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          description: cartItems
            .map(({ product, qty }) => `${qty}x ${product.title}`)
            .join(', '),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'No se pudo iniciar el pago')
      }

      const { id } = await res.json()
      setPaymentIntentId(id)
    } catch (err) {
      setOnvoStatus('error')
      setOnvoError(err.message || 'No se pudo conectar con el sistema de pago')
    }
  }

  const handleOnvoClose = () => {
    setOnvoOpen(false)
    setOnvoStatus('idle')
    setOnvoError(null)
    setPaymentIntentId(null)
  }

  const handleOnvoSuccessClose = () => {
    handleOnvoClose()
    clearCart()
  }

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

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
        onOnvoPay={handleOnvoPay}
      />

      <OnvoPayModal
        open={onvoOpen}
        status={onvoStatus}
        error={onvoError}
        containerRef={onvoContainerRef}
        onClose={handleOnvoClose}
        onSuccessClose={handleOnvoSuccessClose}
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
