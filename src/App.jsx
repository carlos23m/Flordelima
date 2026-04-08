import { useState } from 'react'

import './App.css'

function App() {
  const [locale, setLocale] = useState('es')

  const text = {
    en: {
      brand: 'Finca Florlima',
      dairy: 'Farm',
      navProducts: 'Products',
      navStory: 'Story',
      navContact: 'Contact',
      heroEyebrow: 'Fresh Farm Products',
      heroTitle: 'Premium limes, milk and cheese from Finca Florlima.',
      heroText:
        'Finca Florlima brings natural, premium products directly from our family farm to your home. Fresh limes, delicious cow milk and cheese, and artisanal goat milk and cheese. Simple, clean, and ready for your kitchen.',
      viewMilk: 'View products',
      meetRanch: 'Meet the farm',
      freshOfferings: 'Our Products',
      chooseMilk: 'Choose what fits your family.',
      wholeMilk: 'Cow Milk',
      wholeMilkDesc: 'Fresh, creamy milk from our healthy cows, perfect for coffee, cooking, and daily use.',
      lowFatMilk: 'Cow Cheese',
      lowFatMilkDesc: 'Artisanal cheese made from our premium cow milk with natural flavors.',
      lactoseFreeMilk: 'Fresh Limes',
      lactoseFreeMilkDesc: 'Bright, juicy limes freshly picked from our orchard. Perfect for cooking and beverages.',
      product4: 'Goat Milk',
      product4Desc: 'Smooth, nutritious goat milk from our gentle herd.',
      product5: 'Goat Cheese',
      product5Desc: 'Creamy, delicious cheese crafted from fresh goat milk.',
      ranchStory: 'Our Farm Story',
      storyTitle: 'Three generations of care, quality, and tradition.',
      storyText:
        'For three generations the Finca Florlima family has raised cows and goats with respect and care. We grow fresh limes in our orchard and produce all our dairy products on-site. Every product is made with the same passion—preserving the authentic flavor of the farm.',
      pastureFirst: 'Healthy Animals',
      pastureFirstDesc:
        'Our cows and goats graze on rich grasslands, resulting in the best natural flavors.',
      localCraft: 'Artisanal Production',
      localCraftDesc: 'All our products are processed on-site using traditional methods.',
      simpleIngredients: 'Pure Quality',
      simpleIngredientsDesc: 'No additives, no shortcuts — just real, honest farm products.',
      contactPrompt: 'Need fresh products for delivery or pickup?',
      contactCTA: 'Contact us and we will help you choose the right products for your family.',
      contactButton: 'Contact Finca Florlima',
      galleryFarm: 'Finca Florlima',
      galleryFarmDesc:
        'Our farm is where everything grows—rolling pastures, fresh orchards, and heartfelt care.',
      galleryCows: 'Healthy Cows',
      galleryCowsDesc: 'Our cows thrive on green fields and gentle handling.',
      galleryGoats: 'Gentle Goats',
      galleryGoatsDesc: 'Our goats produce the finest milk and cheese.',
    },
    es: {
      brand: 'Finca Florlima',
      dairy: '',
      navProducts: 'Productos',
      navStory: 'Historia',
      navContact: 'Contacto',
      heroEyebrow: 'Productos Frescos',
      heroTitle: 'Limon mecino premium, leche y queso de la Finca Florlima.',
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
      lactoseFreeMilk: 'Limon mecino fresco',
      lactoseFreeMilkDesc: 'Limon mecino brillantes y jugosas recién cosechadas de nuestro huerto. Perfectas para cocinar y bebidas.',
      product4: 'Leche de Cabra',
      product4Desc: 'Leche de cabra suave y nutritiva de nuestro rebaño gentil.',
      product5: 'Queso de Cabra',
      product5Desc: 'Queso cremoso y delicioso elaborado con leche de cabra fresca.',
      ranchStory: 'Nuestra Historia',
      storyTitle: 'Tres generaciones de cuidado, calidad y tradición.',
      storyText:
        'Durante tres generaciones la familia Finca Florlima ha criado vacas y cabras con respeto y cuidado. Cultivamos limas frescas en nuestro huerto y producimos todos nuestros lácteos en el lugar. Cada producto se hace con la misma pasión—preservando el sabor auténtico de la granja.',
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
      galleryFarm: 'Finca Florlima',
      galleryFarmDesc:
        'Nuestra granja es donde todo crece—praderas verdes, huertos frescos y cuidado del corazón.',
      galleryCows: 'Vacas Saludables',
      galleryCowsDesc: 'Nuestras vacas prosperan en campos verdes y trato gentil.',
      galleryGoats: 'Cabras Gentiles',
      galleryGoatsDesc: 'Nuestras cabras producen la mejor leche y queso.',
    },
  }[locale]

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
          <a href="#contact">{text.navContact}</a>
        </nav>
        <div className="language-switch">
          <button
            className="lang-button"
            onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
            aria-label={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
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
