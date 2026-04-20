import { useRef, useEffect } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'
import {
  FaSeedling, FaIndustry, FaShieldAlt,
  FaUsers, FaMedal, FaTree,
  FaMapMarkerAlt, FaPhone, FaClock,
  FaFacebook, FaWhatsapp,
} from 'react-icons/fa'

function StatItem({ number, label, desc }) {
  return (
    <div className="stat-item">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      <p>{desc}</p>
    </div>
  )
}

function ValueCard({ icon: Icon, title, desc, delay }) {
  return (
    <article className={`value-card reveal reveal-delay-${delay}`}>
      <div className="value-card-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  )
}

function App() {
  const text = {
    brand: 'Finca Flordelima',
    navProducts: 'Productos',
    navStory: 'Historia',
    navContact: 'Contacto',
    navLocation: 'Ubicación',
    heroEyebrow: 'Productos Premium de la Finca',
    heroTitle: 'Limón mecino, leche y queso artesanal de Finca Flordelima',
    heroText:
      'Bienvenido a Flor de Lima, una finca artesanal donde la tradición, la naturaleza y el cuidado por los detalles se unen para crear productos auténticos y de alta calidad. En nuestra finca trabajamos con dedicación y respeto por el entorno para producir leche fresca y quesos artesanales de vaca y cabra, elaborados de manera natural, preservando el sabor puro del campo.',
    viewMilk: 'Conocer Productos',
    meetRanch: 'Ver Historia',
    freshOfferings: 'Nuestros Productos Premium',
    chooseMilk: 'Descubre nuestra selección de productos artesanales frescos',
    wholeMilk: 'Leche de Vaca',
    wholeMilkDesc: 'Leche fresca pasteurizada de nuestras vacas alimentadas naturalmente. Rica en nutrientes, cremosa y con un sabor incomparable. Ideal para café, cocina diaria y toda la familia.',
    lowFatMilk: 'Queso de Vaca',
    lowFatMilkDesc: 'Queso artesanal elaborado con técnicas tradicionales usando nuestra leche de vaca premium. De textura suave y sabor profundo, perfecto para degustar o usar en cocina.',
    lactoseFreeMilk: 'Limón Mecino',
    lactoseFreeMilkDesc: 'Limones frescos y jugosos de nuestro huerto. Cosechados en el punto justo de maduración, son perfectos para bebidas refrescantes, cocina gourmet y postres.',
    product4: 'Leche de Cabra',
    product4Desc: 'Leche delicada y nutritiva de nuestras cabras criadas con amor. Más digerible que la leche de vaca, rica en proteínas y con un sabor suave y característico.',
    product5: 'Queso de Cabra',
    product5Desc: 'Queso cremoso y refinado producido artesanalmente. Su sabor único y textura sedosa lo hacen ideal como tabla de quesos, acompañamiento o para deleitar el paladar más exigente.',
    ranchStory: 'Nuestra Historia',
    storyTitle: 'Tres generaciones de dedicación a la excelencia agrícola.',
    storyText:
      'Finca Flordelima es el resultado de más de treinta años de pasión dedicados a la agricultura y ganadería sostenible. Desde nuestros inicios, la familia que corre esta finca ha mantenido un compromiso inquebrantable con la calidad y la sostenibilidad. Cultivamos Limón Mecino en condiciones naturales, criamos nuestras vacas y cabras con respeto y cuidado, y procesamos todos nuestros productos en el lugar con métodos tradicionales que honran la artesanía.',
    pastureFirst: 'Animales con Bienestar',
    pastureFirstDesc: 'Nuestras vacas y cabras pastan libremente en pasturas naturales y ecológicas. Un ambiente tranquilo, alimento de calidad y trato humano resultan en productos de sabor excepcional.',
    localCraft: 'Elaboración Artesanal',
    localCraftDesc: 'Cada producto es elaborado en nuestras instalaciones usando recetas tradicionales y técnicas que preservan la esencia genuina de nuestros ingredientes.',
    simpleIngredients: 'Pureza Garantizada',
    simpleIngredientsDesc: 'Cero aditivos sintéticos, cero conservantes innecesarios. Solo lo natural, lo honesto y lo delicioso que viene directamente de Finca Flordelima a tu hogar.',
    contactPrompt: '¿Listo para llevar lo mejor de Finca Flordelima a tu mesa?',
    contactCTA: 'Contáctanos hoy para conocer nuestros productos, realizar pedidos especiales o visitar la finca. Marlen y su familia te recibirán con gusto para compartir la experiencia Flordelima.',
    contactButton: 'Llamar Ahora',
    locationTitle: 'Visita Finca Flordelima',
    locationSubtitle: 'Nos ubicamos en Guacimo, Limón — el corazón verde de Costa Rica',
    locationAddress: 'Guacimo, Limón, Costa Rica',
    locationHours: 'Abierto por cita previa',
    locationPhone: '(+506) 8843-8492',
    statsTitle: 'Más de 30 años produciendo los mejores limones, leche y queso artesanal de Costa Rica',
    stat1Title: '3 Generaciones',
    stat1Desc: 'De legado familiar y compromiso inquebrantable',
    stat2Title: '50+ Hectáreas',
    stat2Desc: 'De tierras cultivadas y pasturas naturales',
    stat3Title: '100% Natural',
    stat3Desc: 'Sin químicos sintéticos ni aditivos innecesarios',
    stat4Title: '6 Productos',
    stat4Desc: 'De excelencia artesanal verificada',
    valuesTitle: 'Lo Que Nos Define',
    familyValue: 'Tradición Familiar',
    familyDesc: 'Treinta años de historia, tres generaciones de pasión por entregar lo mejor a nuestros clientes.',
    qualityValue: 'Excelencia Artesanal',
    qualityDesc: 'Métodos probados, recetas tradicionales y atención al detalle en cada paso de la producción.',
    sustainValue: 'Sostenibilidad Real',
    sustainDesc: 'Respeto genuino por el ambiente, bienestar animal y prácticas responsables con la tierra.',
    socialTitle: 'Síguenos en Redes Sociales',
    socialSubtitle: 'Entérate de nuestras novedades, comparte momentos de la finca y conecta con la comunidad Flordelima',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
  }

  const products = [
    {
      title: 'Leche de Vaca',
      description: text.wholeMilkDesc,
      price: '₡1,200 / litro',
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Queso Artesanal de Vaca',
      description: text.lowFatMilkDesc,
      price: '₡4,500 / 500g',
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a318?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Limón Mecino',
      description: text.lactoseFreeMilkDesc,
      price: '₡800 / kg',
      category: 'citrus',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Leche de Cabra',
      description: text.product4Desc,
      price: '₡1,800 / litro',
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Queso Artesanal de Cabra',
      description: text.product5Desc,
      price: '₡5,500 / 250g',
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Jabón Artesanal de Leche',
      description: 'Jabón natural elaborado con leche de cabra de nuestra finca. Rico en vitaminas y minerales, hidrata y suaviza la piel profundamente. Sin parabenos ni sulfatos. Un lujo artesanal de Finca Flordelima.',
      price: '₡3,500 / unidad',
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
    },
  ]

  const navLinks = [
    { href: '#products', label: text.navProducts },
    { href: '#story',    label: text.navStory },
    { href: '#location', label: text.navLocation },
    { href: '#contact',  label: text.navContact },
  ]

  const productGridRef = useRef(null)
  useEffect(() => {
    const grid = productGridRef.current
    if (!grid) return
    if (!('IntersectionObserver' in window)) {
      grid.querySelectorAll('.reveal-scale').forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.querySelectorAll('.reveal-scale').forEach(el => el.classList.add('is-visible'))
          observer.unobserve(grid)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  const heroRef     = useScrollReveal({ threshold: 0.05 })
  const productsRef = useScrollReveal({ threshold: 0.05 })
  const storyRef    = useScrollReveal({ threshold: 0.08 })
  const statsRef    = useScrollReveal({ threshold: 0.1 })
  const valuesRef   = useScrollReveal({ threshold: 0.08 })
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
                  <a href="#products" className="btn btn-primary">{text.viewMilk}</a>
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

        {/* ── Products ── */}
        <section id="products" className="products-section">
          <div className="container">
            <div ref={productsRef} className="section-head reveal">
              <span className="section-eyebrow">{text.freshOfferings}</span>
              <h2>{text.chooseMilk}</h2>
            </div>
            <div className="product-grid" ref={productGridRef}>
              {products.map((product, i) => (
                <div key={product.title} className={`reveal-scale reveal-delay-${i + 1}`}>
                  <ProductCard {...product} />
                </div>
              ))}
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
              <div className="story-values">
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

        {/* ── Values ── */}
        <section className="values-section">
          <div className="container">
            <h2 ref={valuesRef} className="section-title reveal">{text.valuesTitle}</h2>
            <div className="values-grid">
              <ValueCard icon={FaUsers} title={text.familyValue} desc={text.familyDesc} delay={1} />
              <ValueCard icon={FaMedal} title={text.qualityValue} desc={text.qualityDesc} delay={2} />
              <ValueCard icon={FaTree} title={text.sustainValue} desc={text.sustainDesc} delay={3} />
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
                  <strong>Marlen Navarro</strong>
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
        location={text.locationAddress}
        contact="Marlen Navarro"
      />
    </>
  )
}

export default App
