// fa icons — general social / contact icons from Font Awesome
// SiTiktok comes from Simple Icons (si) because Font Awesome doesn't include TikTok
import { FaLeaf, FaFacebook, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa'
import { SiTiktok } from 'react-icons/si'

// Footer props:
//   brand     — farm name displayed in the logo area and the copyright line
//   phone     — formatted phone string (e.g. "8843-8492"); used for display and the tel: link
//   whatsapp  — full wa.me URL used as the WhatsApp social icon link
//   facebook  — URL to the Facebook page
//   instagram — URL to the Instagram profile
//   tiktok    — URL to the TikTok profile
//   location  — plain-text address shown in the contact column
//   contact   — name or role of the person to contact (shown next to the WhatsApp icon)
export default function Footer({ brand, phone, whatsapp, facebook, instagram, tiktok, location, contact }) {

  // Computed once at render time so the copyright year is always current automatically
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">

      {/* ── Three-column grid inside a centred container ── */}
      <div className="container footer__inner">

        {/* ── Column 1: Brand logo, tagline, and social icon row ── */}
        <div className="footer__brand-col">

          {/* Logo image + brand name displayed side by side */}
          <div className="footer__brand">
            <img src="/logo2.png" alt={brand} className="footer__leaf" />
            <span>{brand}</span>
          </div>

          {/* Short brand description shown below the logo */}
          <p className="footer__tagline">
            Tradición artesanal desde hace tres generaciones en el corazón de Guacimo, Limón.
          </p>

          {/* ── Social media icon links ── */}
          {/* Each link opens in a new tab:
              - rel="noopener" prevents the new tab from accessing this window via window.opener
              - rel="noreferrer" hides the referrer header so the destination can't see which page sent the user
              - aria-label gives screen readers a text description since the links contain only icons */}
          <div className="footer__social">

            {/* Facebook */}
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer__social-link footer__social-link--fb"
            >
              <FaFacebook />
            </a>

            {/* WhatsApp — href is the full wa.me URL which opens the WhatsApp chat directly */}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer__social-link footer__social-link--wa"
            >
              <FaWhatsapp />
            </a>

            {/* Instagram */}
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer__social-link footer__social-link--ig"
            >
              <FaInstagram />
            </a>

            {/* TikTok */}
            <a
              href={tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="footer__social-link footer__social-link--tt"
            >
              <SiTiktok />
            </a>

          </div>
        </div>

        {/* ── Column 2: Contact details ── */}
        <div className="footer__contact-col">
          <h4 className="footer__col-title">Contacto</h4>
          <div className="footer__contact-items">

            {/* Physical address row with map pin icon */}
            {/* aria-hidden on each icon prevents screen readers from announcing the icon name —
                the text beside it already conveys the same information */}
            <div className="footer__contact-item">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{location}</span>
            </div>

            {/* Clickable phone number — dashes are stripped from the href because the tel:
                protocol only accepts digits; the display string still shows dashes for readability */}
            <div className="footer__contact-item">
              <FaPhone aria-hidden="true" />
              <a href={`tel:${phone.replace(/-/g, '')}`} className="footer__phone-link">
                {phone}
              </a>
            </div>

            {/* Contact person name/role shown next to the WhatsApp icon */}
            <div className="footer__contact-item">
              <FaWhatsapp aria-hidden="true" />
              <span>{contact}</span>
            </div>

          </div>
        </div>

        {/* ── Column 3: Quick links to product sections ── */}
        {/* All items point to #products on the landing page so the user can jump
            to the relevant section without having to navigate through the store */}
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

      {/* ── Bottom bar: copyright notice and "Made in Costa Rica" tag ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">

          {/* currentYear is computed dynamically so this never needs a manual update */}
          <p>© {currentYear} {brand}. Todos los derechos reservados.</p>

          {/* Decorative leaf icon — aria-hidden stops screen readers from reading "leaf" aloud */}
          <p className="footer__bottom-right">
            Hecho con <FaLeaf style={{ color: '#c8a96e', display: 'inline', verticalAlign: 'middle', margin: '0 3px' }} aria-hidden="true" /> en Costa Rica
          </p>

        </div>
      </div>

    </footer>
  )
}
