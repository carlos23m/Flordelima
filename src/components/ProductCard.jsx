import { useState } from 'react'
import Button from './Button'

export default function ProductCard({ icon, title, description, category }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = () => {
    setIsPressed(true)
  }

  const handleTouchEnd = () => {
    setIsPressed(false)
  }

  return (
    <div 
      className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 md:hover:-translate-y-4 active:-translate-y-2 touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background card with responsive shadow */}
      <div className={`absolute inset-0 bg-white rounded-3xl transition-all duration-500 ${
        isHovered || isPressed
          ? 'shadow-2xl' 
          : 'shadow-xl'
      }`} />

      {/* Animated gradient border - responsive opacity */}
      <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
        isHovered || isPressed ? 'opacity-100' : 'opacity-0'
      }`}
        style={{
          background: 'linear-gradient(135deg, rgba(61, 153, 112, 0.2) 0%, rgba(61, 153, 112, 0.05) 100%)',
          boxShadow: (isHovered || isPressed)
            ? '0 0 40px rgba(61, 153, 112, 0.2)' 
            : 'none'
        }}
      />

      {/* Content container */}
      <div className="relative h-full flex flex-col">
        
        {/* Header section - responsive padding */}
        <div className={`px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 border-b transition-all duration-500 ${
          isHovered || isPressed
            ? 'border-florlima-green/30 bg-gradient-to-br from-florlima-green/15 to-transparent' 
            : 'border-florlima-green/10 bg-gradient-to-br from-florlima-green/8 to-transparent'
        }`}>
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            {/* Icon - responsive sizing */}
            <div className={`text-4xl sm:text-5xl md:text-6xl transition-transform duration-500 flex-shrink-0 ${
              isHovered || isPressed ? 'scale-110 drop-shadow-lg' : 'scale-100'
            }`}>
              {icon}
            </div>

            {/* Category badge - responsive sizing and padding */}
            <div className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
              isHovered || isPressed
                ? 'bg-gradient-to-r from-florlima-green to-florlima-green/70 text-white shadow-lg scale-105'
                : 'bg-florlima-green/10 text-florlima-green shadow-sm scale-100'
            }`}
              style={{
                transformOrigin: 'right center'
              }}>
              {category}
            </div>
          </div>
        </div>

        {/* Body section - responsive padding and text sizes */}
        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 overflow-hidden">
          {/* Title - responsive sizing */}
          <h3 className={`text-xl sm:text-2xl md:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300 leading-tight ${
            isHovered || isPressed
              ? 'text-florlima-dark translate-x-1' 
              : 'text-florlima-dark'
          }`}>
            {title}
          </h3>

          {/* Animated underline - responsive width */}
          <div className={`h-1 rounded-full mb-4 sm:mb-5 transition-all duration-500 bg-gradient-to-r from-florlima-green to-florlima-green/40 ${
            isHovered || isPressed ? 'w-16 sm:w-20' : 'w-10 sm:w-12'
          }`} />

          {/* Description - responsive sizing and line height */}
          <p className={`text-sm sm:text-sm leading-relaxed sm:leading-relaxed transition-all duration-300 ${
            isHovered || isPressed
              ? 'text-florlima-text/90 font-medium' 
              : 'text-florlima-text/70'
          }`}>
            {description}
          </p>
        </div>

        {/* Footer section - responsive padding */}
        <div className={`px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 border-t transition-all duration-500 ${
          isHovered || isPressed
            ? 'border-florlima-green/30 bg-gradient-to-t from-florlima-green/10 to-transparent' 
            : 'border-florlima-green/10 bg-gradient-to-t from-florlima-green/5 to-transparent'
        }`}>
          {/* Enhanced Button with better responsive sizing */}
          <Button 
            size="md"
            fullWidth={true}
            className="w-full sm:text-base"
            onClick={(e) => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span className="hidden sm:inline">Solicitar Ahora</span>
            <span className="inline sm:hidden">Solicitar</span>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>

          {/* Hover hint - responsive text size and spacing */}
          <div className={`text-center mt-2 sm:mt-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${
            isHovered || isPressed
              ? 'opacity-100 text-florlima-green' 
              : 'opacity-0 pointer-events-none'
          }`}>
            ✨ {isPressed ? 'Abriendo...' : 'Contacta con nosotros'}
          </div>
        </div>
      </div>
    </div>
  )
}
