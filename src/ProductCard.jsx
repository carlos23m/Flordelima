import { useState } from 'react'

export default function ProductCard({ icon, title, description, category }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div 
      className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer group ${
        isHovered 
          ? '-translate-y-3 shadow-2xl' 
          : 'shadow-lg hover:shadow-xl'
      }`}
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, #ffffff 0%, #f8faf7 100%)'
          : '#ffffff',
        boxShadow: isHovered
          ? '0 30px 60px rgba(61, 153, 112, 0.15), 0 0 1px rgba(61, 153, 112, 0.1)'
          : '0 10px 30px rgba(0, 0, 0, 0.08)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(61, 153, 112, 0.1), transparent)',
          borderRadius: '1rem'
        }}
      />

      {/* Premium header with icon container */}
      <div className={`relative bg-gradient-to-br from-florlima-green/12 via-florlima-green/5 to-transparent p-8 pb-6 border-b border-florlima-green/10 transition-all duration-500 ${
        isHovered ? 'bg-gradient-to-br from-florlima-green/15 via-florlima-green/8' : ''
      }`}>
        
        {/* Icon background circle with glow effect */}
        <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full transition-all duration-500 ${
          isHovered 
            ? 'bg-gradient-to-br from-florlima-green/20 to-florlima-green/5 blur-2xl scale-125' 
            : 'bg-gradient-to-br from-florlima-green/10 to-florlima-green/2 blur-xl'
        }`} />

        <div className="relative flex justify-between items-start gap-4">
          {/* Icon with scale animation */}
          <div className={`text-6xl transition-transform duration-500 drop-shadow-sm ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            {icon}
          </div>
          
          {/* Premium badge */}
          <span className="bg-gradient-to-r from-florlima-green to-florlima-green/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap shadow-md shadow-florlima-green/30 hover:shadow-lg transition-all">
            {category}
          </span>
        </div>
      </div>

      {/* Premium body with refined typography */}
      <div className="relative p-8 flex-1 flex flex-col justify-between">
        {/* Title with premium styling */}
        <div>
          <h3 className={`text-2xl font-bold bg-gradient-to-r from-florlima-dark to-florlima-dark/80 bg-clip-text text-transparent mb-3 leading-tight transition-all duration-300 ${
            isHovered ? 'scale-105 origin-left' : 'scale-100'
          }`}
            style={{ transformOrigin: 'left' }}
          >
            {title}
          </h3>
          
          {/* Subtle divider line */}
          <div className="w-12 h-1 bg-gradient-to-r from-florlima-green to-florlima-green/40 rounded-full mb-4 transition-all duration-300"
            style={{
              width: isHovered ? '48px' : '32px'
            }}
          />
          
          {/* Premium description text */}
          <p className="text-sm leading-relaxed text-florlima-text/85 font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Premium footer with enhanced button */}
      <div className="relative p-8 pt-6 border-t border-florlima-green/10 bg-gradient-to-t from-florlima-green/2 to-transparent">
        <a 
          href="#contact" 
          className={`relative block w-full px-6 py-4 font-bold text-sm text-center uppercase tracking-wider transition-all duration-300 rounded-xl overflow-hidden group/btn ${
            isButtonHovered
              ? 'text-white'
              : 'text-white'
          }`}
          style={{
            background: isButtonHovered
              ? 'linear-gradient(135deg, #2d6a59 0%, #3d9970 100%)'
              : 'linear-gradient(135deg, #3d9970 0%, #52b385 100%)',
            boxShadow: isButtonHovered
              ? '0 12px 24px rgba(61, 153, 112, 0.35), 0 0 1px rgba(61, 153, 112, 0.2)'
              : '0 8px 16px rgba(61, 153, 112, 0.25)',
            transform: isButtonHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)'
          }}
          onMouseEnter={(e) => {
            setIsButtonHovered(true)
          }}
          onMouseLeave={(e) => {
            setIsButtonHovered(false)
          }}
        >
          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
          
          <span className="relative flex items-center justify-center gap-2">
            Solicitar Ahora
            <svg className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>

        {/* Micro interaction hint */}
        <div className={`text-center mt-3 text-xs font-medium transition-all duration-300 ${
          isHovered ? 'opacity-100 text-florlima-green' : 'opacity-0 text-florlima-text/50'
        }`}>
          ✨ Haz clic para más información
        </div>
      </div>

      {/* Corner accent glow */}
      <div className={`absolute top-0 right-0 w-px h-px bg-florlima-green rounded-full transition-all duration-300 ${
        isHovered ? 'w-2 h-2 blur-md' : 'w-px h-px'
      }`} />
    </div>
  )
}
