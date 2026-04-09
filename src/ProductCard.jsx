export default function ProductCard({ icon, title, description, category }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(61, 153, 112, 0.1)',
      border: '1px solid #e5e5e0',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 16px 48px rgba(61, 153, 112, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(61, 153, 112, 0.1)';
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(61, 153, 112, 0.08), rgba(61, 153, 112, 0.02))',
        borderBottom: '2px solid #e5e5e0',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ fontSize: '3.5rem' }}>{icon}</div>
        <span style={{
          background: '#3d9970',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          {category}
        </span>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        <h3 style={{
          color: '#0d0d0c',
          fontSize: '1.1rem',
          fontWeight: 600,
          marginTop: 0,
          marginBottom: '12px'
        }}>
          {title}
        </h3>
        <p style={{
          color: '#6b7066',
          fontSize: '0.95rem',
          lineHeight: '1.7',
          margin: 0
        }}>
          {description}
        </p>
      </div>

      <div style={{
        borderTop: '1px solid #e5e5e0',
        padding: '24px',
        textAlign: 'center'
      }}>
        <a href="#contact" style={{
          display: 'inline-block',
          width: '100%',
          background: '#3d9970',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '20px',
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#2d6a59';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(61, 153, 112, 0.3)';
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#3d9970';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'scale(1)';
        }}>
          Solicitar Ahora
        </a>
      </div>
    </div>
  )
}
