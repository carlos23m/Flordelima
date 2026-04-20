import { FaLeaf, FaFacebook, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer({ brand, phone, whatsapp, facebook, location, contact }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">

        <div className="footer__brand-col">
          <div className="footer__brand">
            <FaLeaf className="footer__leaf" aria-hidden="true" />
            <span>{brand}</span>
          </div>
          <p className="footer__tagline">
            Tradición artesanal desde hace tres generaciones en el corazón de Guacimo, Limón.
          </p>
          <div className="footer__social">
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer__social-link footer__social-link--fb"
            >
              <FaFacebook />
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer__social-link footer__social-link--wa"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer__contact-col">
          <h4 className="footer__col-title">Contacto</h4>
          <div className="footer__contact-items">
            <div className="footer__contact-item">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{location}</span>
            </div>
            <div className="footer__contact-item">
              <FaPhone aria-hidden="true" />
              <a href={`tel:${phone.replace(/-/g, '')}`} className="footer__phone-link">
                {phone}
              </a>
            </div>
            <div className="footer__contact-item">
              <FaWhatsapp aria-hidden="true" />
              <span>{contact}</span>
            </div>
          </div>
        </div>

        <div className="footer__products-col">
          <h4 className="footer__col-title">Productos</h4>
          <ul className="footer__product-list">
            <li><a href="#products">Leche de Vaca</a></li>
            <li><a href="#products">Queso de Vaca</a></li>
            <li><a href="#products">Limón Mecino</a></li>
            <li><a href="#products">Leche de Cabra</a></li>
            <li><a href="#products">Queso de Cabra</a></li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {currentYear} {brand}. Todos los derechos reservados.</p>
          <p className="footer__bottom-right">
            Hecho con <FaLeaf style={{ color: '#c8a96e', display: 'inline', verticalAlign: 'middle', margin: '0 3px' }} aria-hidden="true" /> en Costa Rica
          </p>
        </div>
      </div>
    </footer>
  )
}
