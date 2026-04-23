// MUI components used for layout and styled elements
import { Card, CardContent, Button, Stack, Typography, Box } from '@mui/material'
// FaLeaf = fallback icon when no product image is provided
// FaWhatsapp = WhatsApp button icon
// FaEye = "Ver Detalles" button icon
import { FaLeaf, FaWhatsapp, FaEye } from 'react-icons/fa'

// Base WhatsApp deep-link — the pre-filled message is appended as a query parameter
const WHATSAPP_BASE = 'https://wa.me/50688438492'

// ProductCard props:
//   title        — product name shown as the card heading
//   description  — short paragraph describing the product
//   image        — URL of the product photo; if missing a leaf icon is shown instead
//   price        — formatted price string (e.g. "₡1,200 / litro"); hidden if not provided
//   whatsappMsg  — optional pre-encoded WhatsApp message; falls back to a generic one
//   category     — 'dairy' | 'citrus' | 'artisanal'; controls accent colours
//   onViewDetails — optional click handler for the "Ver Detalles" button;
//                   if not provided the button scrolls to the #contact section
export default function ProductCard({
  title,
  description,
  image,
  price,
  whatsappMsg,
  category = 'dairy',
  onViewDetails,
}) {
  // Build the default WhatsApp message using the product title.
  // encodeURIComponent ensures special characters (accents, spaces) are URL-safe.
  const defaultMsg = encodeURIComponent(`Hola Marlen, me interesa el producto: ${title}`)

  // Use the caller-supplied message if provided, otherwise fall back to the default
  const waLink = `${WHATSAPP_BASE}?text=${whatsappMsg || defaultMsg}`

  // Citrus products use a warm gold palette; everything else uses the farm green
  const accentColor     = category === 'citrus' ? '#c8a96e' : '#40916c'
  const accentColorDark = category === 'citrus' ? '#a0854e' : '#2d6a4f'

  return (
    // Full-height flex card so all cards in a grid row stretch to the same height
    <Card
      sx={{
        width: '100%',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(45, 106, 79, 0.10)',
        background: '#ffffff',
        border: '1px solid #e0ddd6',
        overflow: 'hidden',
        // Smooth lift animation on hover
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        // Hint to the browser to promote this element to its own GPU layer for smoother animation
        willChange: 'transform',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 48px rgba(45, 106, 79, 0.16)',
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      aria-label={title}
    >
      {/* ── Thin colour stripe at the top of the card ── */}
      {/* The gradient end colour differs between dairy (light green) and citrus (warm beige) */}
      <Box sx={{
        height: '4px',
        background: `linear-gradient(90deg, ${accentColor}, ${accentColorDark === '#2d6a4f' ? '#52b788' : '#e8d5a3'})`,
        flexShrink: 0,
      }} />

      {/* ── Product image area ── */}
      {/* flexShrink: 0 prevents this area from shrinking when the card content is taller */}
      <Box sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Tinted background visible behind transparent images or as the placeholder bg
        background: category === 'citrus'
          ? 'linear-gradient(135deg, #fdf6e8 0%, #faf9f6 100%)'
          : 'linear-gradient(135deg, #f0faf3 0%, #faf9f6 100%)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {image ? (
          // Real product photo — objectFit: cover fills the box without distortion
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          // Fallback icon shown when no image URL is supplied
          // aria-hidden keeps screen readers from announcing a decorative icon
          <FaLeaf
            style={{ fontSize: '4rem', color: accentColor, opacity: 0.35 }}
            aria-hidden="true"
          />
        )}
      </Box>

      {/* ── Card body: title, description, price, and action buttons ── */}
      {/* flexGrow: 1 makes this section fill whatever space is left so buttons stay at the bottom */}
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.5, sm: 3 },
        pt: { xs: 2, sm: 2.5 },
        // !important overrides MUI's built-in last-child padding-bottom rule
        pb: '20px !important',
      }}>

        {/* Product name — rendered as an h3 for correct heading hierarchy in the page */}
        <Typography
          component="h3"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: { xs: '1.15rem', sm: '1.3rem' },
            color: '#0f1a0e',
            mb: 1,
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>

        {/* Short product description — flexGrow pushes the price and buttons downward */}
        <Typography
          variant="body2"
          sx={{
            color: '#5a6353',
            lineHeight: 1.75,
            fontSize: '0.88rem',
            flexGrow: 1,
            // Increase bottom margin when there is no price row so buttons don't crowd the text
            mb: price ? 2 : 3,
          }}
        >
          {description}
        </Typography>

        {/* ── Price row — only rendered when a price string is provided ── */}
        {price && (
          <Box sx={{
            pt: 2,
            mb: 2.5,
            borderTop: '1px solid #e8e4dc',
            display: 'flex',
            alignItems: 'baseline',
            gap: '6px',
          }}>
            <Typography sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              color: accentColor,
              lineHeight: 1,
            }}>
              {price}
            </Typography>
          </Box>
        )}

        {/* ── Action buttons ── */}
        {/* Stack switches from column layout on mobile to side-by-side on small screens and up */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>

          {/* "Ver Detalles" — outlined secondary action */}
          {/* Falls back to smooth-scrolling to #contact if no custom handler is given */}
          <Button
            variant="outlined"
            startIcon={<FaEye style={{ fontSize: '0.9rem' }} />}
            fullWidth
            sx={{
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.85rem',
              borderColor: '#40916c',
              color: '#2d6a4f',
              py: 1.1,
              fontFamily: "'Inter', sans-serif",
              '&:hover': {
                borderColor: '#2d6a4f',
                background: '#f0faf3',
              },
            }}
            onClick={onViewDetails || (() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            })}
          >
            Ver Detalles
          </Button>

          {/* "Pedir por WhatsApp" — primary action, opens WhatsApp with pre-filled message */}
          {/* component="a" makes MUI render a real <a> tag so href and target work correctly */}
          <Button
            variant="contained"
            startIcon={<FaWhatsapp style={{ fontSize: '1rem' }} />}
            fullWidth
            component="a"
            href={waLink}
            target="_blank"
            // noopener prevents the new tab from accessing this window via window.opener
            // noreferrer hides the referrer header so the destination can't see which page sent the user
            rel="noopener noreferrer"
            sx={{
              borderRadius: '8px',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.85rem',
              background: '#25D366',   // Official WhatsApp brand green
              color: '#fff',
              py: 1.1,
              fontFamily: "'Inter', sans-serif",
              boxShadow: 'none',
              '&:hover': {
                background: '#1fbe5a',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.30)',
              },
            }}
          >
            Pedir por WhatsApp
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
