import { useState } from 'react'

export default function ProductCard({ icon, title, description, category }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`flex flex-col h-full rounded-xl overflow-hidden border border-florlima-border bg-white transition-all duration-300 cursor-pointer ${
        isHovered 
          ? 'shadow-florlima-hover -translate-y-2' 
          : 'shadow-florlima'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-florlima-green/8 to-florlima-green/2 border-b border-florlima-border p-6 flex justify-between items-start">
        <div className="text-5xl">
          {icon}
        </div>
        <span className="bg-florlima-green text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          {category}
        </span>
      </div>

      {/* Body with title and description */}
      <div className="p-6 flex-1 flex flex-col justify-start">
        <h3 className="text-lg font-semibold text-florlima-dark mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-florlima-text">
          {description}
        </p>
      </div>

      {/* Footer with button */}
      <div className="border-t border-florlima-border p-6 text-center">
        <a 
          href="#contact" 
          className={`inline-block w-full bg-florlima-green text-white px-6 py-3 rounded-full font-semibold text-sm text-center no-underline transition-all duration-300 ${
            isHovered
              ? 'bg-florlima-green hover:bg-opacity-90 shadow-lg scale-102'
              : 'hover:bg-opacity-95'
          }`}
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(61, 153, 112, 0.3)'
            e.currentTarget.style.backgroundColor = '#2d6a59'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.backgroundColor = '#3d9970'
          }}
        >
          Solicitar Ahora
        </a>
      </div>
    </div>
  )
}
