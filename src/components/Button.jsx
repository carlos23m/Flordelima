import { useState } from 'react'

export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Size variants - responsive and accessible
  const sizeClasses = {
    sm: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-xs',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-sm',
    lg: 'px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base',
    xl: 'px-6 sm:px-10 py-3.5 sm:py-5 text-base sm:text-lg'
  }

  // Color variants with enhanced effects
  const variantStyles = {
    primary: {
      default: 'linear-gradient(135deg, #3d9970 0%, #52b385 100%)',
      hover: 'linear-gradient(135deg, #2d6a59 0%, #3d9970 100%)',
      active: 'linear-gradient(135deg, #1f5a47 0%, #2d6a59 100%)',
      shadow: '0 4px 12px rgba(61, 153, 112, 0.2)',
      shadowHover: '0 12px 28px rgba(61, 153, 112, 0.3)',
      shadowActive: '0 2px 8px rgba(61, 153, 112, 0.15)'
    },
    secondary: {
      default: 'linear-gradient(135deg, rgba(61, 153, 112, 0.1) 0%, rgba(61, 153, 112, 0.05) 100%)',
      hover: 'linear-gradient(135deg, rgba(61, 153, 112, 0.15) 0%, rgba(61, 153, 112, 0.1) 100%)',
      active: 'linear-gradient(135deg, rgba(61, 153, 112, 0.2) 0%, rgba(61, 153, 112, 0.15) 100%)',
      shadow: '0 2px 8px rgba(61, 153, 112, 0.08)',
      shadowHover: '0 8px 16px rgba(61, 153, 112, 0.12)',
      shadowActive: '0 1px 4px rgba(61, 153, 112, 0.06)'
    },
    outline: {
      default: 'linear-gradient(135deg, transparent 0%, transparent 100%)',
      hover: 'linear-gradient(135deg, rgba(61, 153, 112, 0.05) 0%, rgba(61, 153, 112, 0.02) 100%)',
      active: 'linear-gradient(135deg, rgba(61, 153, 112, 0.1) 0%, rgba(61, 153, 112, 0.05) 100%)',
      shadow: '0 2px 6px rgba(61, 153, 112, 0.06)',
      shadowHover: '0 6px 14px rgba(61, 153, 112, 0.1)',
      shadowActive: '0 1px 3px rgba(61, 153, 112, 0.04)'
    },
    danger: {
      default: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      hover: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      active: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
      shadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
      shadowHover: '0 12px 28px rgba(239, 68, 68, 0.3)',
      shadowActive: '0 2px 8px rgba(239, 68, 68, 0.15)'
    }
  }

  const currentStyle = variantStyles[variant] || variantStyles.primary
  
  // Text colors with better contrast
  const textColor = {
    primary: 'text-white',
    secondary: 'text-florlima-green hover:text-florlima-dark',
    outline: 'text-florlima-green hover:text-florlima-dark border-2 border-florlima-green/30 hover:border-florlima-green/50',
    danger: 'text-white'
  }

  // Determine background color based on state
  let backgroundStyle = currentStyle.default
  let boxShadowStyle = currentStyle.shadow
  
  if (isActive || isPressed) {
    backgroundStyle = currentStyle.active
    boxShadowStyle = currentStyle.shadowActive
  } else if (isHovered) {
    backgroundStyle = currentStyle.hover
    boxShadowStyle = currentStyle.shadowHover
  }

  const baseClasses = `
    ${sizeClasses[size]} 
    font-bold uppercase tracking-widest rounded-2xl 
    transition-all duration-300 ease-out
    flex items-center justify-center gap-2 
    group overflow-hidden relative
    ${textColor[variant]} 
    ${fullWidth ? 'w-full' : 'w-fit'}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    focus:outline-none focus:ring-2 focus:ring-florlima-green/40 focus:ring-offset-2
    active:scale-95
    sm:hover:scale-105
    transition-all duration-300
    ${className}
  `

  const TAG = href ? 'a' : 'button'

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsActive(false)
  }

  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleTouchStart = () => {
    if (!disabled) {
      setIsActive(true)
    }
  }

  const handleTouchEnd = () => {
    setIsActive(false)
  }

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) onClick(e)
  }

  // Props for anchor tags should not include disabled
  const anchorProps = href ? { href } : { type: 'button' }

  return (
    <TAG
      {...anchorProps}
      onClick={handleClick}
      {...(TAG === 'button' && { disabled })}
      role={href ? 'link' : 'button'}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: backgroundStyle,
        boxShadow: boxShadowStyle,
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-disabled={disabled}
      aria-busy={loading}
      {...props}
    >
      {/* Premium shine effect - enhanced */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" 
        style={{
          animation: isHovered ? 'none' : undefined,
        }}
      />

      {/* Ripple effect on click */}
      {isPressed && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            animation: 'ripple 0.6s ease-out',
          }}
        />
      )}
      
      {/* Content wrapper with icon support */}
      <span className="relative flex items-center justify-center gap-2 min-h-[1em]">
        {Icon && iconPosition === 'left' && (
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        )}
        
        {loading ? (
          <span className="inline-block">
            <svg 
              className="animate-spin w-4 h-4 sm:w-5 sm:h-5" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : (
          children
        )}
        
        {Icon && iconPosition === 'right' && (
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isHovered ? '-translate-x-1' : ''}`} />
        )}
      </span>
    </TAG>
  )
}
