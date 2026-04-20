import { useState } from 'react'
import { Card, CardContent, Box, Typography, Button } from '@mui/material'
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaWhatsapp, FaLeaf, FaTrash } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const WHATSAPP_NUMBER = '50688438492'

const PRODUCTS = [
  {
    id: 1,
    title: 'Leche de Vaca',
    description: 'Leche fresca pasteurizada de nuestras vacas alimentadas naturalmente. Rica en nutrientes, cremosa y con un sabor incomparable.',
    priceLabel: '₡1,200 / litro',
    priceNum: 1200,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Queso Artesanal de Vaca',
    description: 'Queso artesanal elaborado con técnicas tradicionales usando nuestra leche de vaca premium. Textura suave y sabor profundo.',
    priceLabel: '₡4,500 / 500g',
    priceNum: 4500,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Limón Mexicano',
    description: 'Limones frescos y jugosos cosechados en el punto exacto de maduración. Perfectos para bebidas, cocina gourmet y repostería.',
    priceLabel: '₡800 / kg',
    priceNum: 800,
    category: 'citrus',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Leche de Cabra',
    description: 'Leche delicada y nutritiva de nuestras cabras criadas con amor. Más digerible que la leche de vaca, con un sabor suave y característico.',
    priceLabel: '₡1,800 / litro',
    priceNum: 1800,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Queso Artesanal de Cabra',
    description: 'Queso cremoso y refinado producido artesanalmente. Su sabor único y textura sedosa lo hacen ideal para tablas de quesos y maridajes.',
    priceLabel: '₡5,500 / 250g',
    priceNum: 5500,
    category: 'dairy',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Jabón Artesanal de Leche',
    description: 'Jabón natural elaborado con leche de cabra de nuestra finca. Rico en vitaminas y minerales, hidrata y suaviza la piel. Sin parabenos ni sulfatos.',
    priceLabel: '₡3,500 / unidad',
    priceNum: 3500,
    category: 'artisanal',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
  },
]

const CATEGORIES = [
  { id: 'all',       label: 'Todos' },
  { id: 'dairy',     label: 'Lácteos' },
  { id: 'citrus',    label: 'Cítricos' },
  { id: 'artisanal', label: 'Artesanales' },
]

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
      {/* accent stripe */}
      <Box sx={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${product.category === 'citrus' ? '#e8d5a3' : '#52b788'})`, flexShrink: 0 }} />

      {/* image */}
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

        {/* price */}
        <Box sx={{ pt: 1.5, mb: 2, borderTop: '1px solid #e8e4dc' }}>
          <Typography sx={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.4rem', color: accentColor, lineHeight: 1 }}>
            {product.priceLabel}
          </Typography>
        </Box>

        {/* add / qty controls */}
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

function CartDrawer({ open, items, total, onClose, onAdd, onRemove, onClear }) {
  const waMessage = () => {
    if (items.length === 0) return '#'
    const lines = items.map(({ product, qty }) =>
      `• ${qty}x ${product.title} — ₡${(product.priceNum * qty).toLocaleString('es-CR')}`
    ).join('\n')
    const msg = `Hola Marlen! Le hago el siguiente pedido desde la tienda de Finca Flordelima 🌿\n\n📦 *Pedido:*\n${lines}\n\n💰 *Total: ₡${total.toLocaleString('es-CR')}*\n\n¡Muchas gracias!`
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

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#products', label: 'Productos' },
    { href: '/#story', label: 'Historia' },
    { href: '/#contact', label: 'Contacto' },
  ]

  return (
    <>
      <Navbar
        brand="Finca Flordelima"
        links={navLinks}
        brandHref="/"
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="site-main market-page">

        {/* hero */}
        <section className="market-hero">
          <div className="container market-hero__inner">
            <div className="market-hero__copy">
              <span className="section-eyebrow">Tienda en Línea</span>
              <h1>Productos Frescos<br />de la Finca</h1>
              <p>Elige tus productos, agrégalos al carrito y haz tu pedido directamente por WhatsApp. Entrega coordinada con Marlen.</p>
            </div>
            <div className="market-hero__badge">
              <FaLeaf style={{ fontSize: '2.5rem', color: '#c8a96e' }} />
              <span>100% Artesanal</span>
            </div>
          </div>
        </section>

        {/* filters */}
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

        {/* grid */}
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

        {/* info strip */}
        <section className="market-info-strip">
          <div className="container market-info-strip__inner">
            <div className="market-info-item">
              <span className="market-info-item__icon">🚜</span>
              <strong>Producto fresco</strong>
              <p>Directo de la finca a tu puerta</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">💬</span>
              <strong>Pedido por WhatsApp</strong>
              <p>Coordina entrega con Marlen</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">🌿</span>
              <strong>100% Natural</strong>
              <p>Sin aditivos ni conservantes</p>
            </div>
            <div className="market-info-item">
              <span className="market-info-item__icon">💳</span>
              <strong>SINPE Móvil</strong>
              <p>Pago fácil y seguro</p>
            </div>
          </div>
        </section>

      </main>

      {/* floating cart button (mobile) */}
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
      />

      <Footer
        brand="Finca Flordelima"
        phone="8843-8492"
        whatsapp="https://wa.me/50688438492"
        facebook="https://facebook.com"
        location="Guacimo, Limón, Costa Rica"
        contact="Marlen Navarro"
      />
    </>
  )
}
