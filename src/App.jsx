import './styles/App.css'
import { ProductCard } from './components'

function App() {
  // Spanish content for Finca Florlima website
  const text = {
    brand: 'Finca Florlima',
    dairy: '',
    navProducts: 'Productos',
    navStory: 'Historia',
    navContact: 'Contacto',
    navLocation: 'Ubicación',
    heroEyebrow: 'Productos Premium de la Finca',
    heroTitle: 'Limón mecino, leche y queso artesanal de Finca Florlima',
    heroText:
      'Bienvenido a Finca Florlima, una finca familiar con más de tres décadas de experiencia en la producción de alimentos de la más alta calidad. Ubicada en el corazón de Guacimo, Limón, nos especializamos en cultivar Limón mecino premium, así como producir leche y queso artesanal de vaca y cabra. Cada producto es elaborado con pasión, respeto por la naturaleza y el compromiso de llevar lo mejor de nuestra tierra a tu mesa.',
    viewMilk: 'Conocer Productos',
    meetRanch: 'Ver Historia',
    freshOfferings: 'Nuestros Productos Premium',
    chooseMilk: 'Descubre nuestra selección curada de productos artesanales frescos',
    wholeMilk: 'Leche de Vaca',
    wholeMilkDesc: 'Leche fresca pasteurizada de nuestras vacas alimentadas naturalmente. Rica en nutrientes, cremosa y con un sabor incomparable. Ideal para café, cocina diaria y toda la familia.',
    wholeMilkIcon: '🥛',
    wholeMilkCategory: 'Lácteos de Vaca',
    lowFatMilk: 'Queso de Vaca',
    lowFatMilkDesc: 'Queso artesanal elaborado con técnicas tradicionales usando nuestra leche de vaca premium. De textura suave y sabor profundo, perfecto para degustar o usar en cocina.',
    lowFatMilkIcon: '🧀',
    lowFatMilkCategory: 'Lácteos de Vaca',
    lactoseFreeMilk: 'Limón Mecino',
    lactoseFreeMilkDesc: 'Limones frescos y jugosos de nuestro huerto. Cosechados en el punto justo de maduración, son perfectos para bebidas refrescantes, cocina gourmet y postres. Citrus acido con aroma cautivador.',
    lactoseFreeMilkIcon: '🍋',
    lactoseFreeMilkCategory: 'Cítricos Frescos',
    product4: 'Leche de Cabra',
    product4Desc: 'Leche delicada y nutritiva de nuestras cabras criadas con amor. Más digerible que la leche de vaca, rica en proteínas y con un sabor suave y característico.',
    product4Icon: '🐐',
    product4Category: 'Lácteos de Cabra',
    product5: 'Queso de Cabra',
    product5Desc: 'Queso cremoso y refinado producido artesanalmente. Su sabor único y textura sedosa lo hacen ideal como tabla de quesos, acompañamiento o para deleitar el paladar más exigente.',
    product5Icon: '✨',
    product5Category: 'Lácteos de Cabra',
    ranchStory: 'Nuestra Historia',
    storyTitle: 'Tres generaciones de dedicación a la excelencia agrícola.',
    storyText:
      'Finca Florlima es el resultado de más de treinta años de pasión dedicados a la agricultura y ganadería sostenible. Desde nuestros inicios, la familia que corre esta finca ha mantenido un compromiso inquebrantable con la calidad y la sostenibilidad. Cultivamos Limón mecino en condiciones naturales, criamos nuestras vacas y cabras con respeto y cuidado, y procesamos todos nuestros productos en el lugar con métodos tradicionales que honran la artesanía. Cada generación ha aportado innovación responsable, transformando Florlima en un referente de confianza para familias que valoran la calidad verdadera y la procedencia de lo que consumen.',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100">
      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🌿</div>
              <div>
                <div className="font-bold text-lg bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  {text.brand}
                </div>
              </div>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <a href="#products" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors relative group">
                {text.navProducts}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#story" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors relative group">
                {text.navStory}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#location" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors relative group">
                {text.navLocation}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium text-sm transition-colors relative group">
                {text.navContact}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-600 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50">
                  ✨ {text.heroEyebrow}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-green-800 to-emerald-700 bg-clip-text text-transparent">
                  {text.heroTitle}
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                {text.heroText}
              </p>
              
              <div className="flex gap-4 pt-4">
                <a href="#products" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-1 transition-all duration-300">
                  <span>{text.viewMilk}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#story" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green-600 text-green-700 font-bold rounded-xl hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300">
                  <span>📖</span>
                  <span>{text.meetRanch}</span>
                </a>
              </div>
            </div>
            
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-300/10 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative p-8 rounded-3xl border border-white/30 backdrop-blur-xl bg-white/40 shadow-2xl">
                <div className="text-7xl text-center">🌾🥛🧀🍋</div>
                <p className="text-center text-sm text-gray-600 mt-6 font-medium">
                  Productos 100% artesanales de Finca Florlima
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50">
              🌻 {text.freshOfferings}
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                {text.chooseMilk}
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              icon={text.wholeMilkIcon}
              title={text.wholeMilk}
              description={text.wholeMilkDesc}
              category={text.wholeMilkCategory}
            />
            <ProductCard
              icon={text.lowFatMilkIcon}
              title={text.lowFatMilk}
              description={text.lowFatMilkDesc}
              category={text.lowFatMilkCategory}
            />
            <ProductCard
              icon={text.lactoseFreeMilkIcon}
              title={text.lactoseFreeMilk}
              description={text.lactoseFreeMilkDesc}
              category={text.lactoseFreeMilkCategory}
            />
            <ProductCard
              icon={text.product4Icon}
              title={text.product4}
              description={text.product4Desc}
              category={text.product4Category}
            />
            <ProductCard
              icon={text.product5Icon}
              title={text.product5}
              description={text.product5Desc}
              category={text.product5Category}
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-green-200/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50">
                📚 {text.ranchStory}
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                  {text.storyTitle}
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {text.storyText}
              </p>
              
              <div className="flex gap-6 pt-4">
                <a href="#contact" className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-1 transition-all duration-300">
                  Conocer más
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: '🐄', title: text.pastureFirst, desc: text.pastureFirstDesc },
                { icon: '🎨', title: text.localCraft, desc: text.localCraftDesc },
                { icon: '🍃', title: text.simpleIngredients, desc: text.simpleIngredientsDesc }
              ].map((item, idx) => (
                <div key={idx} className="group p-6 rounded-2xl border border-white/40 backdrop-blur-xl bg-white/50 hover:bg-white/80 hover:border-green-200/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-700/5 via-emerald-700/5 to-green-700/5 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-300/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-300/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
              {text.statsTitle}
            </span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: text.stat1Title, desc: text.stat1Desc, icon: '👨‍👩‍👧‍👦' },
              { title: text.stat2Title, desc: text.stat2Desc, icon: '🌱' },
              { title: text.stat3Title, desc: text.stat3Desc, icon: '♻️' },
              { title: text.stat4Title, desc: text.stat4Desc, icon: '⭐' }
            ].map((stat, idx) => (
              <div key={idx} className="group p-8 rounded-2xl border border-white/60 backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/40 hover:from-white to-white/70 hover:border-green-300/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform origin-left">{stat.icon}</div>
                <div className="text-2xl font-black text-green-700 mb-2">{stat.title}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50">
              💎 Lo Que Nos Define
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                {text.valuesTitle}
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '👨‍🌾', title: text.familyValue, desc: text.familyDesc },
              { icon: '🎖️', title: text.qualityValue, desc: text.qualityDesc },
              { icon: '🌍', title: text.sustainValue, desc: text.sustainDesc }
            ].map((value, idx) => (
              <div key={idx} className="group p-8 rounded-2xl border border-white/50 backdrop-blur-lg bg-gradient-to-br from-white/60 to-white/30 hover:from-white/80 to-white/50 hover:border-green-300/60 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-3">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 right-10 w-96 h-96 bg-gradient-to-br from-green-200/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50">
                📍 Ubicación
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                  {text.locationTitle}
                </span>
              </h2>
              
              <p className="text-xl font-semibold text-gray-700">{text.locationSubtitle}</p>
              
              <div className="space-y-4">
                {[
                  { icon: '📍', label: 'Ubicación', value: text.locationAddress },
                  { icon: '🕐', label: 'Horario', value: text.locationHours },
                  { icon: '📞', label: 'Teléfono', value: text.locationPhone }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/40 backdrop-blur-lg bg-white/50 hover:bg-white/70 hover:border-green-200/60 transition-all">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs uppercase font-bold text-green-700 tracking-wider">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-white/50 shadow-2xl">
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
        </div>
      </section>

      {/* Social Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {text.socialTitle}
          </h2>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            {text.socialSubtitle}
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '👍', label: text.facebook, url: 'https://facebook.com' },
              { icon: '📸', label: text.instagram, url: 'https://instagram.com' },
              { icon: '💬', label: text.whatsapp, url: 'https://wa.me/50688438492' },
              { icon: '🎥', label: text.youtube, url: 'https://youtube.com' }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-white/30 backdrop-blur-lg bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{social.icon}</div>
                <p className="text-white font-bold">{social.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA & Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-transparent rounded-full blur-3xl -translate-x-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl border border-white/50 backdrop-blur-xl bg-gradient-to-br from-white/70 to-white/40 shadow-2xl">
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                  {text.contactPrompt}
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {text.contactCTA}
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 space-y-3 text-left inline-block">
                <p className="text-xl font-bold text-gray-900">👤 Marlen Navarro</p>
                <p className="text-green-700 font-semibold">📞 Teléfono: 8843-8492</p>
                <p className="text-green-700 font-semibold">💳 SINPE Móvil: 8843-8492</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a href="tel:88438492" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/40 transform hover:-translate-y-1 transition-all duration-300">
                  <span>📞</span>
                  <span>{text.contactButton}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="https://wa.me/50688438492" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-green-600 text-green-700 font-bold rounded-xl hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/20 bg-gradient-to-b from-white/50 to-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p className="font-medium">© 2024 Finca Florlima. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-500 mt-2">Productos artesanales 100% naturales de Guacimo, Limón, Costa Rica</p>
        </div>
      </footer>
    </div>
  )
}

export default App
