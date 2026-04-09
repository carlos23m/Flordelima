export default function ProductCard({ icon, title, description, category }) {
  return (
    <div className="chakra-product-card">
      <div className="chakra-card-header">
        <div className="chakra-icon">{icon}</div>
        <span className="chakra-badge">{category}</span>
      </div>
      <div className="chakra-card-body">
        <h3 className="chakra-title">{title}</h3>
        <p className="chakra-desc">{description}</p>
      </div>
      <div className="chakra-card-footer">
        <a href="#contact" className="chakra-btn">
          Solicitar Ahora
        </a>
      </div>
    </div>
  )
}
