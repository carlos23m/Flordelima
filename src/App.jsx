import './App.css'

function App() {
  // Spanish content for Finca Florlima website
  const text = {
    brand: 'Finca Florlima',    
    navProducts: 'Productos',
    navStory: 'Historia',
    navContact: 'Contacto',
    navLocation: 'Ubicación',
    heroEyebrow: 'Productos Premium de la Finca',
    heroTitle: 'Limón mecino, leche y queso artesanal de Finca Florlima',
    heroText:
      'Bienvenido a Finca Florlima, una finca familiar con más de tres décadas de experiencia en la producción de alimentos de la más alta calidad. Ubicada en el corazón de Guacimo, Limón, nos especializamos en cultivar Limón Mexicano premium, así como producir leche y queso artesanal de vaca y cabra. Cada producto es elaborado con pasión, respeto por la naturaleza y el compromiso de llevar lo mejor de nuestra tierra a tu mesa.',
    viewMilk: 'Conocer Productos',
    meetRanch: 'Ver Historia',
    freshOfferings: 'Nuestros Productos Premium',
    chooseMilk: 'Descubre nuestra selección curada de productos artesanales frescos',
    wholeMilk: 'Leche de Vaca',
    wholeMilkDesc: 'Leche fresca pasteurizada de nuestras vacas alimentadas naturalmente. Rica en nutrientes, cremosa y con un sabor incomparable. Ideal para café, cocina diaria y toda la familia.',
    lowFatMilk: 'Queso de Vaca',
    lowFatMilkDesc: 'Queso artesanal elaborado con técnicas tradicionales usando nuestra leche de vaca premium. De textura suave y sabor profundo, perfecto para degustar o usar en cocina.',
    lactoseFreeMilk: 'Limón Mexicano',
    lactoseFreeMilkDesc: 'Limones frescos y jugosos de nuestro huerto. Cosechados en el punto justo de maduración, son perfectos para bebidas refrescantes, cocina gourmet y postres. Citrus acido con aroma cautivador.',
    product4: 'Leche de Cabra',
    product4Desc: 'Leche delicada y nutritiva de nuestras cabras criadas con amor. Más digerible que la leche de vaca, rica en proteínas y con un sabor suave y característico.',
    product5: 'Queso de Cabra',
    product5Desc: 'Queso cremoso y refinado producido artesanalmente. Su sabor único y textura sedosa lo hacen ideal como tabla de quesos, acompañamiento o para deleitar el paladar más exigente.',
    ranchStory: 'Nuestra Historia',
    storyTitle: 'Tres generaciones de dedicación a la excelencia agrícola.',
    storyText:
      'Finca Florlima es el resultado de más de treinta años de pasión dedicados a la agricultura y ganadería sostenible. Desde nuestros inicios, la familia que corre esta finca ha mantenido un compromiso inquebrantable con la calidad y la sostenibilidad. Cultivamos Limón Mexicano en condiciones naturales, criamos nuestras vacas y cabras con respeto y cuidado, y procesamos todos nuestros productos en el lugar con métodos tradicionales que honran la artesanía. Cada generación ha aportado innovación responsable, transformando Florlima en un referente de confianza para familias que valoran la calidad verdadera y la procedencia de lo que consumen.',
    pastureFirst: 'Animales con Bienestar',
    pastureFirstDesc:
      'Nuestras vacas y cabras pastan libremente en pasturas naturales y ecológicas. Un ambiente tranquilo, alimento de calidad y trato humano resultan en productos de sabor excepcional.',
    localCraft: 'Elaboración Artesanal',
    localCraftDesc: 'Cada producto es elaborado en nuestras instalaciones usando recetas tradicionales y técnicas que preservan la esencia genuina de nuestros ingredientes.',
    simpleIngredients: 'Pureza Garantizada',
    simpleIngredientsDesc: 'Cero aditivos sintéticos, cero conservantes innecesarios. Solo lo natural, lo honesto y lo delicioso que viene directamente de Finca Florlima a tu hogar.',
    contactPrompt: '¿Listo para llevar lo mejor de Finca Florlima a tu mesa?',
    contactCTA: 'Contactanos hoy para conocer nuestros productos, realizar pedidos especiales o visitar la finca. Marlen y su familia te recibirán con gusto para compartir la experiencia Florlima.',
    contactButton: 'Contactar Ahora',
    locationTitle: 'Visita Finca Florlima',
    locationSubtitle: 'Nos ubicamos en Guacimo, Limón - el corazón verde de Costa Rica',
    locationAddress: 'Guacimo, Limón, Costa Rica',
    locationHours: 'Abierto por cita previa',
    locationPhone: '(+506) 8843-8492',
    galleryFarm: 'Finca Florlima',
    galleryFarmDesc:
      'Nuestra granja es donde todo crece—praderas verdes, huertos frescos y cuidado del corazón.',
    galleryCows: 'Vacas Saludables',
    galleryCowsDesc: 'Nuestras vacas prosperan en campos verdes y trato gentil.',
    galleryGoats: 'Cabras Gentiles',
    galleryGoatsDesc: 'Nuestras cabras producen la mejor leche y queso.',
    // Statistics section
    statsTitle: 'Más de 30 años de experiencia produciendo los mejores limones, leche y queso artesanal de Costa Rica',
    stat1Title: '3 Generaciones',
    stat1Desc: 'De legado familiar y compromiso inquebrantable',
    stat2Title: '50+ Hectáreas',
    stat2Desc: 'De tierras cultivadas y pasturas naturales',
    stat3Title: '100% Natural',
    stat3Desc: 'Sin químicos sintéticos ni aditivos innecesarios',
    stat4Title: '5 Productos',
    stat4Desc: 'De excelencia artesanal verificada',
    // Values section
    valuesTitle: 'Lo Que Nos Define',
    familyValue: 'Tradición Familiar',
    familyDesc: 'Treinta años de historia, tres generaciones de pasión por entregar lo mejor a nuestros clientes.',
    qualityValue: 'Excelencia Artesanal',
    qualityDesc: 'Métodos probados, recetas tradicionales y atención al detalle en cada paso de la producción.',
    sustainValue: 'Sostenibilidad Real',
    sustainDesc: 'Respeto genuino por el ambiente, bienestar animal y prácticas responsables con la tierra.',
    // Social media section
    socialTitle: 'Síguenos en Redes Sociales',
    socialSubtitle: 'Entérate de nuestras novedades, comparte momentos de la finca y conecta con la comunidad Florlima',
    facebook: 'Facebook',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    youtube: 'YouTube',
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

      <section className="stats-section">
        <h2>{text.statsTitle}</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{text.stat1Title}</div>
            <p>{text.stat1Desc}</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">{text.stat2Title}</div>
            <p>{text.stat2Desc}</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">{text.stat3Title}</div>
            <p>{text.stat3Desc}</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">{text.stat4Title}</div>
            <p>{text.stat4Desc}</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>{text.valuesTitle}</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>{text.familyValue}</h3>
            <p>{text.familyDesc}</p>
          </div>
          <div className="value-card">
            <h3>{text.qualityValue}</h3>
            <p>{text.qualityDesc}</p>
          </div>
          <div className="value-card">
            <h3>{text.sustainValue}</h3>
            <p>{text.sustainDesc}</p>
          </div>
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
                <p>Limón, Costa Rica</p>
              </div>
              <div className="detail-item">
                <h3>🕐 {text.locationHours}</h3>
                <p>Contáctanos para agendar una visita</p>
              </div>
              <div className="detail-item">
                <h3>📞 {text.locationPhone}</h3>
                <p>88438492</p>
              </div>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.5!2d-82.7667!3d10.3167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa7f5f5f5f5f5f5%3A0x0!2sGuacimo%2C%20Lim%C3%B3n%2C%20Costa%20Rica!5e0!3m2!1ses!2scr!4v1"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de Finca Florlima"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="social-section">
        <div className="social-container">
          <h2>{text.socialTitle}</h2>
          <p className="social-subtitle">{text.socialSubtitle}</p>
          <div className="social-grid">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer" title={text.facebook}>
              <span className="social-icon">👍</span>
              <span className="social-label">{text.facebook}</span>
            </a>
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer" title={text.instagram}>
              <span className="social-icon">📸</span>
              <span className="social-label">{text.instagram}</span>
            </a>
            <a href="https://wa.me/50688438492" className="social-link" target="_blank" rel="noopener noreferrer" title={text.whatsapp}>
              <span className="social-icon">💬</span>
              <span className="social-label">{text.whatsapp}</span>
            </a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer" title={text.youtube}>
              <span className="social-icon">🎥</span>
              <span className="social-label">{text.youtube}</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="footer-cta">
        <div>
          <p>{text.contactPrompt}</p>
          <strong>{text.contactCTA}</strong>
          <div className="contact-details">
            <p><strong>Marlen Navarro</strong></p>
            <p>Teléfono: 8843-8492</p>
            <p>SINPE Móvil: 8843-8492</p>
          </div>
        </div>
        <a className="button button-primary" href="tel:88438492">
          {text.contactButton}
        </a>
      </section>
    </div>
  )
}

export default App
