import { Card, CardContent, Button, Stack, Typography, Box } from '@mui/material'
import { FaLeaf, FaWhatsapp, FaEye } from 'react-icons/fa'

const WHATSAPP_BASE = 'https://wa.me/50688438492'

export default function ProductCard({
  title,
  description,
  image,
  whatsappMsg,
  category = 'dairy',
  onViewDetails,
}) {
  const defaultMsg = encodeURIComponent(`Hola Marlen, me interesa el producto: ${title}`)
  const waLink = `${WHATSAPP_BASE}?text=${whatsappMsg || defaultMsg}`

  const accentColor = category === 'citrus' ? '#c8a96e' : '#40916c'
  const accentColorDark = category === 'citrus' ? '#a0854e' : '#2d6a4f'

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(45, 106, 79, 0.10)',
        background: '#ffffff',
        border: '1px solid #e0ddd6',
        overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
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
      {/* Accent stripe */}
      <Box sx={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentColorDark === '#2d6a4f' ? '#52b788' : '#e8d5a3'})`, flexShrink: 0 }} />

      {/* Image or placeholder */}
      <Box sx={{
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: category === 'citrus'
          ? 'linear-gradient(135deg, #fdf6e8 0%, #faf9f6 100%)'
          : 'linear-gradient(135deg, #f0faf3 0%, #faf9f6 100%)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {image ? (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <FaLeaf
            style={{ fontSize: '4rem', color: accentColor, opacity: 0.35 }}
            aria-hidden="true"
          />
        )}
      </Box>

      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2.5, sm: 3 },
        pt: { xs: 2, sm: 2.5 },
        pb: '20px !important',
      }}>
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

        <Typography
          variant="body2"
          sx={{
            color: '#5a6353',
            lineHeight: 1.75,
            fontSize: '0.88rem',
            flexGrow: 1,
            mb: 3,
          }}
        >
          {description}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
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

          <Button
            variant="contained"
            startIcon={<FaWhatsapp style={{ fontSize: '1rem' }} />}
            fullWidth
            component="a"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              borderRadius: '8px',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.85rem',
              background: '#25D366',
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
