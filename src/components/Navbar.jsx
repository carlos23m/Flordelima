import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'

export default function Navbar({ brand, links, brandHref = '/', cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartBump, setCartBump] = useState(false)
  const prevCountRef = useRef(cartCount)

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setCartBump(true)
      const t = setTimeout(() => setCartBump(false), 400)
      return () => clearTimeout(t)
    }
    prevCountRef.current = cartCount
  }, [cartCount])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  const showCart = typeof cartCount === 'number'

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="container navbar__inner">
        <a href={brandHref} className="navbar__brand" onClick={handleLinkClick}>
          <img src="/logo.png" alt={brand} className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">{brand}</span>
            <span className="navbar__brand-tagline">Productos Artesanales</span>
          </div>
        </a>

        <nav className="navbar__links" aria-label="Navegación principal">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="navbar__link" onClick={handleLinkClick}>
              {label}
            </a>
          ))}
          {showCart ? (
            <button className={`navbar__cart-btn${cartBump ? ' navbar__cart-btn--bump' : ''}`} onClick={onCartOpen} aria-label="Abrir carrito">
              <FaShoppingCart />
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </button>
          ) : (
            <a
              href="https://wa.me/50688438492"
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir Ahora
            </a>
          )}
        </nav>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className="navbar__mobile-overlay"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav className="navbar__mobile-nav" aria-label="Menú móvil" aria-hidden={!menuOpen}>
        <div className="navbar__mobile-nav-header">
          <img src="/logo.png" alt={brand} className="navbar__mobile-nav-logo" />
          <span className="navbar__mobile-nav-title">{brand}</span>
        </div>
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="navbar__mobile-link" onClick={handleLinkClick}>
            {label}
          </a>
        ))}
        {showCart ? (
          <button
            className="navbar__mobile-cta"
            onClick={() => { handleLinkClick(); onCartOpen?.() }}
          >
            <FaShoppingCart style={{ marginRight: 8 }} />
            Ver carrito {cartCount > 0 && `(${cartCount})`}
          </button>
        ) : (
          <a
            href="https://wa.me/50688438492"
            className="navbar__mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Pedir por WhatsApp
          </a>
        )}
      </nav>
    </header>
  )
}
