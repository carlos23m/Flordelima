import { useState } from 'react'

export default function ProductCard({ icon, title, description, category }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background card */}
      <div className={`absolute inset-0 bg-white rounded-3xl transition-all duration-500 ${
        isHovered 
          ? 'shadow-2xl' 
          : 'shadow-xl'
      }`} />

      {/* Animated gradient border */}
      <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}
        style={{
          background: 'linear-gradient(135deg, rgba(61, 153, 112, 0.2) 0%, rgba(61, 153, 112, 0.05) 100%)',
          boxShadow: isHovered 
            ? '0 0 40px rgba(61, 153, 112, 0.2)' 
            : 'none'
        }}
      />

      {/* Content container */}
      <div className="relative h-full flex flex-col">
        
        {/* Header section */}
        <div className={`px-8 pt-8 pb-4 border-b transition-all duration-500 ${
          isHovered 
            ? 'border-florlima-green/30 bg-gradient-to-br from-florlima-green/15 to-transparent' 
            : 'border-florlima-green/10 bg-gradient-to-br from-florlima-green/8 to-transparent'
        }`}>
          <div className="flex items-start justify-between gap-4">
            {/* Icon */}
            <div className={`text-6xl transition-transform duration-500 ${
              isHovered ? 'scale-110 drop-shadow-lg' : 'scale-100'
            }`}>
              {icon}
            </div>

            {/* Category badge */}
            <div className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
              isHovered
                ? 'bg-gradient-to-r from-florlima-green to-florlima-green/70 text-white shadow-lg'
                : 'bg-florlima-green/10 text-florlima-green shadow-sm'
            }`}>
              {category}
            </div>
          </div>
        </div>

        {/* Body section */}
        <div className="flex-1 px-8 py-8">
          {/* Title */}
          <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 leading-tight ${
            isHovered 
              ? 'text-florlima-dark translate-x-1' 
              : 'text-florlima-dark'
          }`}>
            {title}
          </h3>

          {/* Animated underline */}
          <div className={`h-1 rounded-full mb-5 transition-all duration-500 bg-gradient-to-r from-florlima-green to-florlima-green/40 ${
            isHovered ? 'w-16' : 'w-10'
          }`} />

          {/* Description */}
          <p className={`text-sm leading-relaxed transition-all duration-300 ${
            isHovered 
              ? 'text-florlima-text/90 font-medium' 
              : 'text-florlima-text/70'
          }`}>
            {description}
          </p>
        </div>

        {/* Footer section */}
        <div className={`px-8 pb-8 border-t transition-all duration-500 ${
          isHovered 
            ? 'border-florlima-green/30 bg-gradient-to-t from-florlima-green/10 to-transparent' 
            : 'border-florlima-green/10 bg-gradient-to-t from-florlima-green/5 to-transparent'
        }`}>
          <button 
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative ${
              isHovered
                ? 'text-white shadow-lg'
                : 'text-white shadow-md'
            }`}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #2d6a59 0%, #3d9970 100%)'
                : 'linear-gradient(135deg, #3d9970 0%, #52b385 100%)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative flex items-center gap-2">
              Solicitar Ahora
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          {/* Hover hint */}
          <div className={`text-center mt-3 text-xs font-semibold transition-all duration-300 ${
            isHovered 
              ? 'opacity-100 text-florlima-green' 
              : 'opacity-0 pointer-events-none'
          }`}>
            ✨ Contacta con nosotros
          </div>
        </div>
      </div>
    </div>
  )
}
