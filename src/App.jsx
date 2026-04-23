import { useRef, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'
import {
  FaSeedling, FaIndustry, FaShieldAlt,
  FaMapMarkerAlt, FaPhone, FaClock,
  FaFacebook, FaWhatsapp, FaInstagram,
} from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'

function StatItem({ number, label, desc }) {
  return (
    <div className="stat-item">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      <p>{desc}</p>
    </div>
  )
}

function App() {
  const text = {
    brand: 'Finca Flordelima',
    navProducts: 'Productos',
    navStory: 'Historia',
    navContact: 'Contacto',
    navLocation: 'Ubicación',
    heroEyebrow: 'Desde el campo a tu mesa',
    heroTitle: 'Sabores auténticos, elaborados con amor en el corazón de Costa Rica',
    heroText:
      'En Flordelima cultivamos la paciencia, el respeto por la tierra y la pasión por los sabores genuinos. Cada producto nace de manos que conocen el campo, de animales criados con cuidado y de una familia que lleva más de tres décadas comprometida con la excelencia artesanal.',
    viewProducts: 'Explorar Tienda',
    meetRanch: 'Nuestra Historia',
    storeEyebrow: 'Nuestra Tienda',
    storeTitle: 'Todos nuestros productos, a un clic de distancia',
    storeDesc: 'Explora nuestra selección de lácteos frescos, cítricos de temporada y productos artesanales. Haz tu pedido directamente por WhatsApp y recíbelo con el sabor genuino de la finca.',
    storeCta: 'Ir a la Tienda',
    storeCat1: 'Lácteos',
    storeCat1Desc: 'Leche fresca y quesos artesanales de vaca y cabra.',
    storeCat2: 'Cítricos',
    storeCat2Desc: 'Limones cosechados en plena madurez bajo el sol de Guácimo.',
    storeCat3: 'Artesanales',
    storeCat3Desc: 'Jabones naturales elaborados con leche de cabra y aceites de la finca.',
    ranchStory: 'Nuestra Historia',
    storyTitle: 'Más de tres décadas cultivando la tierra con respeto, amor y propósito.',
    storyText:
      'Flordelima nació de un sueño familiar: vivir en armonía con la naturaleza y compartir sus frutos con quienes los valoran. Desde entonces, hemos cultivado cada hectárea con conciencia, criado a nuestros animales con afecto y elaborado cada producto con el mismo cuidado que pondríamos en algo destinado a nuestra propia mesa. Hoy, tres generaciones comparten ese mismo compromiso — entregar lo mejor del campo, con honestidad y orgullo costarricense.',
    pastureFirst: 'Bienestar Animal',
    pastureFirstDesc: 'Nuestras vacas y cabras crecen en pasturas abiertas, con libertad para moverse y vivir con dignidad. Animales bien cuidados producen leche de calidad superior — y eso se siente en cada sorbo.',
    localCraft: 'Elaboración Artesanal',
    localCraftDesc: 'Cada producto pasa por nuestras manos antes de llegar a las tuyas. Usamos recetas y técnicas tradicionales que preservan el carácter genuino de cada ingrediente, sin acelerar lo que merece su tiempo.',
    simpleIngredients: 'Sin Artificios',
    simpleIngredientsDesc: 'Nada que no reconocerías en tu propia despensa. Nuestros productos se elaboran solo con ingredientes naturales, sin conservantes, colorantes ni aditivos innecesarios. Así de simple, así de honesto.',
    contactPrompt: '¿Lista para probar la diferencia de lo auténtico?',
    contactCTA: 'Escríbenos para hacer un pedido, coordinar una visita a la finca o simplemente saber más sobre nuestros productos. Los encargados responsables estarán encantados de atenderte con el mismo cariño que ponemos en cada elaboración.',
    contactButton: 'Llamar Ahora',
    locationTitle: 'Visítanos en la finca',
    locationSubtitle: 'Estamos en Guácimo, Limón — en el verde corazón de Costa Rica',
    locationAddress: 'Guácimo, Limón, Costa Rica',
    locationHours: 'Con cita previa',
    locationPhone: '(+506) 8843-8492',
    statsTitle: 'Tres décadas de trabajo honesto — productos que hablan por sí solos',
    stat1Title: '30+ Años',
    stat1Desc: 'De historia familiar ininterrumpida',
    stat2Title: '10+ Hectáreas',
    stat2Desc: 'De tierra fértil cultivada con conciencia',
    stat3Title: '100% Natural',
    stat3Desc: 'Ingredientes puros, procesos transparentes',
    stat4Title: '6 Productos',
    stat4Desc: 'Artesanales, frescos y elaborados a diario',
    socialTitle: 'La finca, de cerca',
    socialSubtitle: 'Síguenos y sé parte de nuestra comunidad. Compartimos el día a día de la finca, novedades de temporada y el proceso detrás de cada producto.',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    tiktok: 'TikTok',
  }

  const navLinks = [
    { href: '#products', label: text.navProducts },
    { href: '#story',    label: text.navStory },
    { href: '#location', label: text.navLocation },
    { href: '#contact',  label: text.navContact },
    { href: '/tienda',   label: 'Tienda' },
  ]

  // Separate observer for the value cards so all three receive is-visible on the same
  // tick, keeping the CSS stagger delays (reveal-delay-1/2/3) in sync.
  // useScrollReveal observes each element individually, which would break the coordinated entrance.
  const storyValuesRef = useRef(null)
  useEffect(() => {
    const container = storyValuesRef.current
    if (!container) return
    // Browsers that don't support IntersectionObserver would leave the cards permanently
    // hidden behind the reveal class, so we show them immediately as a fallback.
    if (!('IntersectionObserver' in window)) {
      container.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))
          // Unobserve after first trigger so scrolling back up doesn't reset the stagger.
          observer.unobserve(container)
        }
      },
      // rootMargin bottom offset fires the animation just before the section fully enters
      // the viewport, giving the transition a head start so it feels snappy.
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const heroRef     = useScrollReveal({ threshold: 0.05 })
  const productsRef = useScrollReveal({ threshold: 0.05 })
  const storyRef    = useScrollReveal({ threshold: 0.08 })
  const statsRef    = useScrollReveal({ threshold: 0.1 })
  const locationRef = useScrollReveal({ threshold: 0.08 })
  const socialRef   = useScrollReveal({ threshold: 0.1 })
  const ctaRef      = useScrollReveal({ threshold: 0.1 })

  return (
    <>
      <Navbar brand={text.brand} links={navLinks} />

      <main className="site-main">
        {/* ── Hero ── */}
        <section className="hero-section">
          <div className="container">
            <div ref={heroRef} className="hero-inner reveal">
              <div className="hero-copy">
                <span className="hero-eyebrow">{text.heroEyebrow}</span>
                <h1>{text.heroTitle}</h1>
                <p className="hero-body">{text.heroText}</p>
                <div className="hero-actions">
                  <a href="#products" className="btn btn-primary">{text.viewProducts}</a>
                  <a href="#story" className="btn btn-secondary">{text.meetRanch}</a>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="hero-badge">
                  <FaSeedling className="hero-badge-icon" />
                  <span>100% Natural</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── Store Promo ── */}
        <section id="products" className="store-promo-section">
          <div className="container">
            <div ref={productsRef} className="store-promo-inner reveal">
              <div className="store-promo-copy">
                <span className="section-eyebrow">{text.storeEyebrow}</span>
                <h2>{text.storeTitle}</h2>
                <p>{text.storeDesc}</p>
                <a href="/tienda" className="btn btn-primary btn-large">{text.storeCta}</a>
              </div>
              <div className="store-promo-categories">
                <div className="store-cat-card">
                  <div className="store-cat-icon"><FaIndustry /></div>
                  <h3>{text.storeCat1}</h3>
                  <p>{text.storeCat1Desc}</p>
                </div>
                <div className="store-cat-card">
                  <div className="store-cat-icon"><FaSeedling /></div>
                  <h3>{text.storeCat2}</h3>
                  <p>{text.storeCat2Desc}</p>
                </div>
                <div className="store-cat-card">
                  <div className="store-cat-icon"><FaShieldAlt /></div>
                  <h3>{text.storeCat3}</h3>
                  <p>{text.storeCat3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── Story ── */}
        <section id="story" className="story-section">
          <div className="container">
            <div ref={storyRef} className="story-inner reveal">
              <div className="story-copy">
                <span className="section-eyebrow">{text.ranchStory}</span>
                <h2>{text.storyTitle}</h2>
                <p>{text.storyText}</p>
              </div>
              <div className="story-values" ref={storyValuesRef}>
                <article className="story-value-card reveal reveal-delay-1">
                  <FaSeedling className="story-value-icon" aria-hidden="true" />
                  <h3>{text.pastureFirst}</h3>
                  <p>{text.pastureFirstDesc}</p>
                </article>
                <article className="story-value-card reveal reveal-delay-2">
                  <FaIndustry className="story-value-icon" aria-hidden="true" />
                  <h3>{text.localCraft}</h3>
                  <p>{text.localCraftDesc}</p>
                </article>
                <article className="story-value-card reveal reveal-delay-3">
                  <FaShieldAlt className="story-value-icon" aria-hidden="true" />
                  <h3>{text.simpleIngredients}</h3>
                  <p>{text.simpleIngredientsDesc}</p>
                </article>
              </div>
            </div>
          </div>
        </section>
        {/* ── Stats ── */}
        <section className="stats-section">
          <div className="container">
            <h2 ref={statsRef} className="stats-title reveal">{text.statsTitle}</h2>
            <div className="stats-grid">
              <StatItem number="30+" label={text.stat1Title} desc={text.stat1Desc} />
              <StatItem number="50+" label={text.stat2Title} desc={text.stat2Desc} />
              <StatItem number="100%" label={text.stat3Title} desc={text.stat3Desc} />
              <StatItem number="5" label={text.stat4Title} desc={text.stat4Desc} />
            </div>
          </div>
        </section>
        {/* ── Location ── */}
        <section id="location" className="location-section">
          <div className="container">
            <div ref={locationRef} className="location-inner reveal">
              <div className="location-info">
                <h2>{text.locationTitle}</h2>
                <p className="location-subtitle">{text.locationSubtitle}</p>
                <div className="location-details">
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" aria-hidden="true" />
                    <div>
                      <strong>{text.locationAddress}</strong>
                      <p>Limón, Costa Rica</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaClock className="detail-icon" aria-hidden="true" />
                    <div>
                      <strong>{text.locationHours}</strong>
                      <p>Contáctanos para agendar una visita</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaPhone className="detail-icon" aria-hidden="true" />
                    <div>
                      <strong>{text.locationPhone}</strong>
                      <p>SINPE Móvil disponible</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.5!2d-82.7667!3d10.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa7f5f5f5f5f5f5%3A0x0!2sGuacimo%2C%20Lim%C3%B3n%2C%20Costa%20Rica!5e0!3m2!1ses!2scr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  // allow-top-navigation is intentionally absent: prevents the iframe
                  // from redirecting the parent page if the Maps CDN were compromised.
                  sandbox="allow-scripts allow-same-origin"
                  title="Mapa de ubicación de Finca Flordelima"
                />
              </div>
            </div>
          </div>
        </section>
        {/* ── Social ── */}
        <section ref={socialRef} className="social-section reveal">
          <div className="container social-container">
            <h2>{text.socialTitle}</h2>
            <p>{text.socialSubtitle}</p>
            <div className="social-grid">
              <a
                href="https://facebook.com"
                className="social-link social-link--fb"
                target="_blank"
                rel="noopener noreferrer"
                title={text.facebook}
              >
                <FaFacebook className="social-icon" aria-hidden="true" />
                <span className="social-label">{text.facebook}</span>
              </a>
              <a
                href="https://wa.me/50688438492"
                className="social-link social-link--wa"
                target="_blank"
                rel="noopener noreferrer"
                title={text.whatsapp}
              >
                <FaWhatsapp className="social-icon" aria-hidden="true" />
                <span className="social-label">{text.whatsapp}</span>
              </a>
              <a
                href="https://instagram.com"
                className="social-link social-link--ig"
                target="_blank"
                rel="noopener noreferrer"
                title={text.instagram}
              >
                <FaInstagram className="social-icon" aria-hidden="true" />
                <span className="social-label">{text.instagram}</span>
              </a>
              <a
                href="https://tiktok.com"
                className="social-link social-link--tt"
                target="_blank"
                rel="noopener noreferrer"
                title={text.tiktok}
              >
                <SiTiktok className="social-icon" aria-hidden="true" />
                <span className="social-label">{text.tiktok}</span>
              </a>
            </div>
          </div>
        </section>
        {/* ── Contact CTA ── */}
        <section id="contact" className="cta-section">
          <div className="container">
            <div ref={ctaRef} className="cta-inner reveal">
              <div className="cta-copy">
                <p className="cta-prompt">{text.contactPrompt}</p>
                <p className="cta-sub">{text.contactCTA}</p>
                <div className="cta-contact-details">
                  <strong>Whatsapp</strong>
                  <p>Teléfono: 8843-8492</p>
                  <p>SINPE Móvil: 8843-8492</p>
                </div>
              </div>
              <a className="btn btn-primary btn-large" href="tel:88438492">
                {text.contactButton}
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer
        brand={text.brand}
        phone="8843-8492"
        whatsapp="https://wa.me/50688438492"
        facebook="https://facebook.com"
        instagram="https://instagram.com"
        tiktok="https://tiktok.com"
        location={text.locationAddress}
        contact="Encargado responsable"
      />
    </>
  )
}

export default App
