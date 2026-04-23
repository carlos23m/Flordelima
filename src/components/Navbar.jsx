import { useState, useEffect, useRef } from 'react'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'

// Navbar receives:
//   brand      — display name shown in the logo area
//   links      — array of { href, label } for navigation items
//   brandHref  — where the logo/brand name links to (defaults to home "/")
//   cartCount  — number of items in cart; if undefined the cart button is hidden
//   onCartOpen — callback to open the cart drawer
export default function Navbar({ brand, links, brandHref = '/', cartCount, onCartOpen }) {

  // True when the user has scrolled more than 60px — triggers the solid background style
  const [scrolled, setScrolled] = useState(false)

  // Controls whether the mobile slide-in menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  // Triggers a CSS "bump" animation on the cart icon whenever an item is added
  const [cartBump, setCartBump] = useState(false)

  // Stores the previous cart count so we can detect increases without re-running the effect
  const prevCountRef = useRef(cartCount)

  // Cart bump animation: fires only when count goes UP (item added), not on removal.
  // Both setState calls are inside timers to avoid calling setState synchronously
  // in an effect body, which React flags as a cascading-render risk.
  useEffect(() => {
    if (cartCount <= prevCountRef.current) {
      prevCountRef.current = cartCount
      return
    }
    prevCountRef.current = cartCount
    const on  = setTimeout(() => setCartBump(true),  0)
    // Remove the bump class after 400ms so the animation can re-trigger next time
    const off = setTimeout(() => setCartBump(false), 400)
    return () => { clearTimeout(on); clearTimeout(off) }
  }, [cartCount])

  // Scroll listener: marks the navbar as scrolled when the page is 60px+ down.
  // { passive: true } tells the browser this handler never calls preventDefault,
  // allowing it to optimise scrolling performance.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Remove the listener when the component unmounts to avoid memory leaks
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open so the page can't scroll behind it.
  // The cleanup resets overflow in case the component unmounts while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Closes the mobile menu when any nav link is clicked
  const handleLinkClick = () => setMenuOpen(false)

  // The cart button is only shown on pages that pass a numeric cartCount (i.e. the store page).
  // On the main landing page cartCount is undefined, so a WhatsApp CTA is shown instead.
  const showCart = typeof cartCount === 'number'

  return (
    // navbar--scrolled adds a solid background; navbar--open keeps it visible while the menu is open
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="container navbar__inner">

        {/* ── Logo / Brand ── */}
        <a href={brandHref} className="navbar__brand" onClick={handleLinkClick}>
          <img src="/logo2.png" alt={brand} className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">{brand}</span>
            <span className="navbar__brand-tagline">Productos Artesanales</span>
          </div>
        </a>

        {/* ── Desktop navigation links ── */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="navbar__link" onClick={handleLinkClick}>
              {label}
            </a>
          ))}

          {/* Show cart button on the store page, WhatsApp CTA on the landing page */}
          {showCart ? (
            // navbar__cart-btn--bump applies a quick scale animation when an item is added
            <button className={`navbar__cart-btn${cartBump ? ' navbar__cart-btn--bump' : ''}`} onClick={onCartOpen} aria-label="Abrir carrito">
              <FaShoppingCart />
              {/* Badge is hidden when the cart is empty */}
              {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
            </button>
          ) : (
            // Opens WhatsApp in a new tab; noopener noreferrer prevents the new tab
            // from accessing this window via window.opener
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

        {/* ── Hamburger button (mobile only) ── */}
        {/* aria-expanded tells screen readers whether the menu is currently open */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {/* Swap icon depending on open/closed state */}
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ── Dark overlay behind the mobile menu — clicking it closes the menu ── */}
      {/* aria-hidden hides it from screen readers since it's decorative */}
      <div
        className="navbar__mobile-overlay"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in navigation panel ── */}
      {/* aria-hidden keeps screen readers from reading it while the menu is closed */}
      <nav className="navbar__mobile-nav" aria-label="Menú móvil" aria-hidden={!menuOpen}>

        {/* Logo repeated inside the panel for context when the header is hidden behind the overlay */}
        <div className="navbar__mobile-nav-header">
          <img src="/logo2.png" alt={brand} className="navbar__mobile-nav-logo" />
          <span className="navbar__mobile-nav-title">{brand}</span>
        </div>

        {/* Same links as desktop — each click closes the menu */}
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="navbar__mobile-link" onClick={handleLinkClick}>
            {label}
          </a>
        ))}

        {/* Cart / WhatsApp CTA — mirrors the desktop logic */}
        {showCart ? (
          <button
            className="navbar__mobile-cta"
            // Close the menu first, then open the cart drawer
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
