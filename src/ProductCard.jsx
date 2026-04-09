export default function ProductCard({ icon, title, description, category }) {
  return (
    <article className="modern-product-card">
      <div className="product-card-header">
        <div className="product-icon">{icon}</div>
        <span className="product-category">{category}</span>
      </div>
      <div className="product-card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="product-card-footer">
        <a href="#contact" className="product-cta">
          Solicitar
        </a>
      </div>
    </article>
  )
}
