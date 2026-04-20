import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function formatCRC(amount) {
  return amount.toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })
}

function buildEmailHtml({ client, items, total, paymentIntentId }) {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4dc;color:#2d3a2e;font-family:Georgia,serif;">${item.title}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4dc;text-align:center;color:#5a6353;">×${item.qty}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e4dc;text-align:right;color:#2d3a2e;font-weight:600;">${formatCRC(item.priceNum * item.qty)}</td>
    </tr>
  `).join('')

  const addressParts = [client.direccion, client.canton, client.provincia].filter(Boolean)
  const addressLine = addressParts.length > 0
    ? `<tr><td style="color:#888;padding:2px 0;">Dirección</td><td style="color:#2d3a2e;padding:2px 0;">${addressParts.join(', ')}</td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(45,106,79,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2d6a4f,#40916c);padding:32px 36px;text-align:center;">
            <p style="margin:0 0 4px;color:#d4edda;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;">Recibo de compra</p>
            <h1 style="margin:0;color:#ffffff;font-family:Georgia,serif;font-size:1.6rem;font-weight:700;">Finca Flordelima</h1>
            <p style="margin:6px 0 0;color:#b7dfc8;font-size:0.8rem;">Productos Artesanales · Guácimo, Limón</p>
          </td>
        </tr>

        <!-- Success badge -->
        <tr>
          <td style="padding:24px 36px 0;text-align:center;">
            <span style="display:inline-block;background:#d4edda;color:#2d6a4f;padding:6px 18px;border-radius:20px;font-size:0.85rem;font-weight:600;">✓ Pago confirmado</span>
          </td>
        </tr>

        <!-- Client info -->
        <tr>
          <td style="padding:24px 36px 0;">
            <p style="margin:0 0 10px;font-size:0.7rem;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.1em;">Datos del cliente</p>
            <table width="100%" cellpadding="0" cellspacing="4">
              <tr><td style="color:#888;padding:2px 0;width:90px;">Nombre</td><td style="color:#2d3a2e;padding:2px 0;">${client.nombre}</td></tr>
              <tr><td style="color:#888;padding:2px 0;">Email</td><td style="color:#2d3a2e;padding:2px 0;">${client.email}</td></tr>
              <tr><td style="color:#888;padding:2px 0;">Teléfono</td><td style="color:#2d3a2e;padding:2px 0;">${client.telefono}</td></tr>
              ${client.cedula ? `<tr><td style="color:#888;padding:2px 0;">Cédula</td><td style="color:#2d3a2e;padding:2px 0;">${client.cedula}</td></tr>` : ''}
              ${addressLine}
              ${client.notas ? `<tr><td style="color:#888;padding:2px 0;">Notas</td><td style="color:#2d3a2e;padding:2px 0;">${client.notas}</td></tr>` : ''}
            </table>
          </td>
        </tr>

        <!-- Products -->
        <tr>
          <td style="padding:24px 36px 0;">
            <p style="margin:0 0 10px;font-size:0.7rem;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.1em;">Productos</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <th style="text-align:left;padding-bottom:6px;font-size:0.75rem;color:#888;font-weight:600;border-bottom:2px solid #e8e4dc;">Producto</th>
                <th style="text-align:center;padding-bottom:6px;font-size:0.75rem;color:#888;font-weight:600;border-bottom:2px solid #e8e4dc;">Cant.</th>
                <th style="text-align:right;padding-bottom:6px;font-size:0.75rem;color:#888;font-weight:600;border-bottom:2px solid #e8e4dc;">Subtotal</th>
              </tr>
              ${itemRows}
              <tr>
                <td colspan="2" style="padding:12px 0 0;font-weight:700;color:#2d3a2e;font-size:1rem;">Total</td>
                <td style="padding:12px 0 0;text-align:right;font-weight:700;color:#2d6a4f;font-size:1.1rem;font-family:Georgia,serif;">${formatCRC(total)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Reference -->
        <tr>
          <td style="padding:20px 36px 0;">
            <p style="margin:0;font-size:0.72rem;color:#aaa;">Referencia de pago: <span style="font-family:monospace;color:#888;">${paymentIntentId}</span></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 36px;text-align:center;border-top:1px solid #e8e4dc;margin-top:24px;">
            <p style="margin:0;font-size:0.8rem;color:#888;">Gracias por tu compra, <strong style="color:#2d3a2e;">${client.nombre.split(' ')[0]}</strong>.</p>
            <p style="margin:6px 0 0;font-size:0.75rem;color:#aaa;">¿Tienes alguna duda? Escríbenos a <a href="https://wa.me/50688438492" style="color:#40916c;text-decoration:none;">WhatsApp</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { client, items, total, paymentIntentId } = req.body

  if (!client?.email) return res.status(400).json({ error: 'Email requerido' })
  if (!items?.length || !total || !paymentIntentId)
    return res.status(400).json({ error: 'Datos incompletos' })

  try {
    await resend.emails.send({
      from: 'Finca Flordelima <recibos@flordelima.com>',
      to: client.email,
      subject: '¡Tu pedido fue confirmado! – Finca Flordelima',
      html: buildEmailHtml({ client, items, total, paymentIntentId }),
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-receipt error:', err)
    return res.status(500).json({ error: 'Error al enviar el correo' })
  }
}
