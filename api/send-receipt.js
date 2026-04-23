import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function formatCRC(amount) {
  return amount.toLocaleString('es-CR', { style: 'currency', currency: 'CRC', maximumFractionDigits: 0 })
}

function buildEmailHtml({ client, items, total, paymentIntentId }) {
  const itemRows = items.map((item, i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#fafaf8'};">
      <td style="padding:13px 16px;color:#1a2e1a;font-size:0.92rem;">${escapeHtml(item.title)}</td>
      <td style="padding:13px 16px;text-align:center;color:#6b7c6b;font-size:0.88rem;">×${escapeHtml(item.qty)}</td>
      <td style="padding:13px 16px;text-align:right;color:#1a2e1a;font-weight:600;font-size:0.92rem;white-space:nowrap;">${formatCRC(item.priceNum * item.qty)}</td>
    </tr>
  `).join('')

  const addressParts = [client.direccion, client.canton, client.provincia].filter(Boolean)

  const clientFields = [
    ['Nombre',   client.nombre],
    ['Correo',   client.email],
    ['Teléfono', client.telefono],
    client.cedula    ? ['Cédula',    client.cedula]    : null,
    addressParts.length ? ['Dirección', addressParts.join(', ')] : null,
    client.notas     ? ['Notas',     client.notas]     : null,
  ].filter(Boolean)

  const clientRows = clientFields.map(([label, value]) => `
    <tr>
      <td style="padding:7px 0;color:#8a9e8a;font-size:0.82rem;width:90px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:7px 0;color:#1a2e1a;font-size:0.88rem;">${escapeHtml(value)}</td>
    </tr>
  `).join('')

  const now = new Date().toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Recibo – Finca Flordelima</title>
</head>
<body style="margin:0;padding:0;background:#edecea;font-family:'Helvetica Neue',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#edecea;padding:40px 16px 48px;">
  <tr><td align="center">

    <table width="100%" style="max-width:580px;" cellpadding="0" cellspacing="0">

      <!-- ─── TOP LABEL ─── -->
      <tr>
        <td style="text-align:center;padding-bottom:20px;">
          <span style="font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:#7a8c7a;font-weight:600;">Recibo de compra · ${now}</span>
        </td>
      </tr>

      <!-- ─── CARD ─── -->
      <tr>
        <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(30,60,30,0.12);">
        <table width="100%" cellpadding="0" cellspacing="0">

          <!-- Header band -->
          <tr>
            <td style="background:#1a3a28;padding:36px 40px 32px;text-align:center;">
              <p style="margin:0 0 10px;font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:#7db896;">Finca Flordelima</p>
              <p style="margin:0 0 6px;font-size:2rem;font-family:Georgia,'Times New Roman',serif;font-weight:700;color:#ffffff;line-height:1.1;">Confirmación<br>de pedido</p>
              <p style="margin:0;font-size:0.78rem;color:#7db896;letter-spacing:0.06em;">Productos Artesanales · Guácimo, Limón · Costa Rica</p>
            </td>
          </tr>

          <!-- Green accent bar -->
          <tr>
            <td style="background:linear-gradient(90deg,#2d6a4f,#52b788,#c8a96e);height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Success pill -->
          <tr>
            <td style="padding:28px 40px 0;text-align:center;">
              <span style="display:inline-block;background:#e8f5ee;border:1px solid #a8d5b5;color:#1a6640;padding:8px 24px;border-radius:30px;font-size:0.82rem;font-weight:700;letter-spacing:0.04em;">✓&nbsp;&nbsp;Pago exitoso</span>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:22px 40px 0;text-align:center;">
              <p style="margin:0;font-size:1.05rem;color:#2a3d2a;font-family:Georgia,serif;">Gracias por tu compra, <strong>${escapeHtml(client.nombre.split(' ')[0])}</strong>.</p>
              <p style="margin:6px 0 0;font-size:0.82rem;color:#8a9e8a;">Aquí tienes el resumen de tu pedido para tus registros.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:#ede9e3;"></div></td></tr>

          <!-- Client info -->
          <tr>
            <td style="padding:22px 40px 0;">
              <p style="margin:0 0 12px;font-size:0.68rem;font-weight:700;color:#8a9e8a;text-transform:uppercase;letter-spacing:0.14em;">Datos del cliente</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${clientRows}
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:22px 40px 0;"><div style="height:1px;background:#ede9e3;"></div></td></tr>

          <!-- Products -->
          <tr>
            <td style="padding:22px 40px 0;">
              <p style="margin:0 0 12px;font-size:0.68rem;font-weight:700;color:#8a9e8a;text-transform:uppercase;letter-spacing:0.14em;">Productos</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e4dc;">
                <tr style="background:#f5f2ee;">
                  <th style="padding:9px 16px;text-align:left;font-size:0.7rem;color:#8a9e8a;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #e8e4dc;">Producto</th>
                  <th style="padding:9px 16px;text-align:center;font-size:0.7rem;color:#8a9e8a;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #e8e4dc;">Cant.</th>
                  <th style="padding:9px 16px;text-align:right;font-size:0.7rem;color:#8a9e8a;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;border-bottom:1px solid #e8e4dc;">Subtotal</th>
                </tr>
                ${itemRows}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:0 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a3a28;border-radius:0 0 8px 8px;">
                <tr>
                  <td style="padding:14px 16px;color:#7db896;font-size:0.82rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Total pagado</td>
                  <td style="padding:14px 16px;text-align:right;color:#ffffff;font-size:1.15rem;font-family:Georgia,serif;font-weight:700;">${formatCRC(total)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Transaction ID -->
          <tr>
            <td style="padding:24px 40px 0;">
              <div style="background:#f8f6f2;border:1px solid #e0dbd2;border-radius:8px;padding:14px 18px;">
                <p style="margin:0 0 5px;font-size:0.65rem;font-weight:700;color:#8a9e8a;text-transform:uppercase;letter-spacing:0.14em;">ID de transacción</p>
                <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:0.85rem;color:#2a3d2a;word-break:break-all;letter-spacing:0.02em;">${escapeHtml(paymentIntentId)}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 36px;text-align:center;">
              <div style="height:1px;background:#ede9e3;margin-bottom:24px;"></div>
              <p style="margin:0 0 6px;font-size:0.8rem;color:#8a9e8a;">¿Tienes alguna duda con tu pedido?</p>
              <a href="https://wa.me/50688438492" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:24px;font-size:0.82rem;font-weight:700;letter-spacing:0.04em;">Contáctanos por WhatsApp</a>
              <p style="margin:20px 0 0;font-size:0.72rem;color:#b0bdb0;">© Finca Flordelima · Guácimo, Limón, Costa Rica</p>
            </td>
          </tr>

        </table>
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

  // Confirm the transaction actually succeeded before sending the receipt.
  // Prevents the endpoint from being used to send arbitrary emails.
  const { data: tx } = await supabase
    .from('transactions')
    .select('id')
    .eq('payment_intent_id', paymentIntentId)
    .eq('status', 'succeeded')
    .maybeSingle()

  if (!tx) return res.status(403).json({ error: 'Transacción no autorizada' })

  try {
    await resend.emails.send({
      from: 'Finca Flordelima <onboarding@resend.dev>',
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
