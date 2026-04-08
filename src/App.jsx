import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

function App() {
  // Spanish content for Finca Florlima website
  const text = {
    brand: 'Finca Florlima',
    dairy: '',
    navProducts: 'Productos',
    navStory: 'Historia',
    navContact: 'Contacto',
    navLocation: 'Ubicación',
    heroEyebrow: 'Productos Frescos',
    heroTitle: 'Limón premium, leche y queso de la Finca Florlima.',
    heroText:
      'Finca Florlima es una finca familiar ubicada en la provincia de Limón, Costa Rica, dedicada a la producción agrícola y ganadera de alta calidad. Nuestro compromiso es ofrecer productos frescos, naturales y saludables, cultivados y producidos con prácticas responsables que respetan la naturaleza y el bienestar animal.',
    viewMilk: 'Ver productos',
    meetRanch: 'Conoce la granja',
    freshOfferings: 'Nuestros Productos',
    chooseMilk: 'Elige lo que mejor va para tu familia.',
    wholeMilk: 'Leche de Vaca',
    wholeMilkDesc: 'Leche fresca y cremosa de nuestras vacas saludables, perfecta para café, cocina y uso diario.',
    lowFatMilk: 'Queso de Vaca',
    lowFatMilkDesc: 'Queso artesanal hecho de nuestra leche de vaca premium con sabores naturales.',
    lactoseFreeMilk: 'Limón fresco',
    lactoseFreeMilkDesc: 'Limones brillantes y jugosos recién cosechados de nuestro huerto. Perfectos para cocinar y bebidas.',
    product4: 'Leche de Cabra',
    product4Desc: 'Leche de cabra suave y nutritiva de nuestro rebaño gentil.',
    product5: 'Queso de Cabra',
    product5Desc: 'Queso cremoso y delicioso elaborado con leche de cabra fresca.',
    ranchStory: 'Nuestra Historia',
    storyTitle: 'Tres generaciones de cuidado, calidad y tradición.',
    storyText:
      'Durante tres generaciones la familia Finca Florlima ha criado vacas y cabras con respeto y cuidado. Cultivamos limones frescos en nuestro huerto y producimos todos nuestros lácteos en el lugar. Cada producto se hace con la misma pasión—preservando el sabor auténtico de la granja.',
    pastureFirst: 'Animales Saludables',
    pastureFirstDesc:
      'Nuestras vacas y cabras pastan en verdes praderas, resultando en los mejores sabores naturales.',
    localCraft: 'Producción Artesanal',
    localCraftDesc: 'Todos nuestros productos se procesan en el lugar utilizando métodos tradicionales.',
    simpleIngredients: 'Pureza y Calidad',
    simpleIngredientsDesc: 'Sin aditivos, sin atajos — solo productos de granja reales y honestos.',
    contactPrompt: '¿Necesitas productos frescos para entrega o recogida?',
    contactCTA: 'Contacta y te ayudaremos a elegir los productos ideales para tu familia.',
    contactButton: 'Contactar Finca Florlima',
    locationTitle: 'Visita Finca Florlima',
    locationSubtitle: 'Encuentranos en el corazón de Limón, Costa Rica',
    locationAddress: 'Provincia de Limón, Costa Rica',
    locationHours: 'Abierto por cita previa',
    locationPhone: '(+506) 88438492',
    galleryFarm: 'Finca Florlima',
    galleryFarmDesc:
      'Nuestra granja es donde todo crece—praderas verdes, huertos frescos y cuidado del corazón.',
    galleryCows: 'Vacas Saludables',
    galleryCowsDesc: 'Nuestras vacas prosperan en campos verdes y trato gentil.',
    galleryGoats: 'Cabras Gentiles',
    galleryGoatsDesc: 'Nuestras cabras producen la mejor leche y queso.',
  }

  return (
    <div className="ranch-home">
      <header className="topbar">
        <div className="brand">
          <span>{text.brand}</span>
          <strong>{text.dairy}</strong>
        </div>
        <nav className="nav-links">
          <a href="#products">{text.navProducts}</a>
          <a href="#story">{text.navStory}</a>
          <a href="#location">{text.navLocation}</a>
          <a href="#contact">{text.navContact}</a>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="hero-eyebrow">{text.heroEyebrow}</span>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroText}</p>
          <div className="hero-actions">
            <a href="#products" className="button button-primary">
              {text.viewMilk}
            </a>
            <a href="#story" className="button button-secondary">
              {text.meetRanch}
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="section-block">
        <div className="section-head">
          <p>{text.freshOfferings}</p>
          <h2>{text.chooseMilk}</h2>
        </div>
        <div className="product-grid">
          <article className="product-card">
            <h3>{text.wholeMilk}</h3>
            <p>{text.wholeMilkDesc}</p>
          </article>
          <article className="product-card">
            <h3>{text.lowFatMilk}</h3>
            <p>{text.lowFatMilkDesc}</p>
          </article>
          <article className="product-card">
            <h3>{text.lactoseFreeMilk}</h3>
            <p>{text.lactoseFreeMilkDesc}</p>
          </article>
          <article className="product-card">
            <h3>{text.product4}</h3>
            <p>{text.product4Desc}</p>
          </article>
          <article className="product-card">
            <h3>{text.product5}</h3>
            <p>{text.product5Desc}</p>
          </article>
        </div>
      </section>

      <section id="story" className="section-block story-block">
        <div className="story-copy">
          <span className="section-label">{text.ranchStory}</span>
          <h2>{text.storyTitle}</h2>
          <p>{text.storyText}</p>
        </div>
        <div className="value-grid">
          <article>
            <h3>{text.pastureFirst}</h3>
            <p>{text.pastureFirstDesc}</p>
          </article>
          <article>
            <h3>{text.localCraft}</h3>
            <p>{text.localCraftDesc}</p>
          </article>
          <article>
            <h3>{text.simpleIngredients}</h3>
            <p>{text.simpleIngredientsDesc}</p>
          </article>
        </div>
      </section>

      <section id="location" className="location-section">
        <div className="location-content">
          <div className="location-info">
            <h2>{text.locationTitle}</h2>
            <p className="location-subtitle">{text.locationSubtitle}</p>
            <div className="location-details">
              <div className="detail-item">
                <h3>📍 {text.locationAddress}</h3>
                <p>Limón Province, Costa Rica</p>
              </div>
              <div className="detail-item">
                <h3>🕐 {text.locationHours}</h3>
                <p>Contact us to schedule a visit</p>
              </div>
              <div className="detail-item">
                <h3>📞 {text.locationPhone}</h3>
                <p>88438492</p>
              </div>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.4563029821127!2d-82.4381!3d10.2631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa80b0d0d0d0d0d%3A0x0!2sLim%C3%B3n%2C%20Costa%20Rica!5e0!3m2!1sen!2scr!4v1"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="contact" className="footer-cta">
        <div>
          <p>{text.contactPrompt}</p>
          <strong>{text.contactCTA}</strong>
          <div className="contact-details">
            <p><strong>Marlen Navarro Saenz</strong></p>
            <p>Phone: 88438492</p>
            <p>Sinpe Móvil: 88438492</p>
          </div>
        </div>
        <a className="button button-primary" href="mailto:hello@sunnyridgedairy.com">
          {text.contactButton}
        </a>
      </section>
    </div>
  )
}

export default App
