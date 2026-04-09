import { useState } from 'react'

export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg'
  }

  // Color variants
  const variantStyles = {
    primary: {
      default: 'linear-gradient(135deg, #3d9970 0%, #52b385 100%)',
      hover: 'linear-gradient(135deg, #2d6a59 0%, #3d9970 100%)',
      shadow: '0 8px 16px rgba(61, 153, 112, 0.25)',
      shadowHover: '0 12px 24px rgba(61, 153, 112, 0.35)'
    },
    secondary: {
      default: 'linear-gradient(135deg, rgba(61, 153, 112, 0.1) 0%, rgba(61, 153, 112, 0.05) 100%)',
      hover: 'linear-gradient(135deg, rgba(61, 153, 112, 0.2) 0%, rgba(61, 153, 112, 0.1) 100%)',
      shadow: '0 4px 12px rgba(61, 153, 112, 0.1)',
      shadowHover: '0 8px 16px rgba(61, 153, 112, 0.15)'
    },
    outline: {
      default: 'linear-gradient(135deg, transparent 0%, transparent 100%)',
      hover: 'linear-gradient(135deg, rgba(61, 153, 112, 0.05) 0%, rgba(61, 153, 112, 0.02) 100%)',
      shadow: 'none',
      shadowHover: '0 4px 12px rgba(61, 153, 112, 0.1)'
    },
    danger: {
      default: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      hover: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      shadow: '0 8px 16px rgba(239, 68, 68, 0.25)',
      shadowHover: '0 12px 24px rgba(239, 68, 68, 0.35)'
    }
  }

  const currentStyle = variantStyles[variant] || variantStyles.primary
  
  // Text color based on variant
  const textColor = {
    primary: 'text-white',
    secondary: 'text-florlima-green',
    outline: 'text-florlima-green border-2 border-florlima-green/30',
    danger: 'text-white'
  }

  const baseClasses = `${sizeClasses[size]} font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden relative ${textColor[variant]} ${className}`

  const TAG = href ? 'a' : 'button'

  return (
    <TAG
      href={href}
      onClick={onClick}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? currentStyle.hover : currentStyle.default,
        boxShadow: isHovered ? currentStyle.shadowHover : currentStyle.shadow,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      {...props}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </TAG>
  )
}
