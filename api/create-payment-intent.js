export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, description } = req.body
  console.log('[create-payment-intent] body:', { amount, description })
  console.log('[create-payment-intent] ONVO_SECRET_KEY set:', !!process.env.ONVO_SECRET_KEY)

  if (!amount || amount <= 0) {
    console.log('[create-payment-intent] invalid amount:', amount)
    return res.status(400).json({ error: 'Monto inválido' })
  }

  const payload = {
    currency: 'CRC',
    amount: Math.round(amount * 100),
    description: description || 'Pedido Flor de Lima',
  }
  console.log('[create-payment-intent] sending to Onvo:', payload)

  try {
    const response = await fetch('https://api.onvopay.com/v1/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ONVO_SECRET_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    console.log('[create-payment-intent] Onvo response status:', response.status)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      console.error('[create-payment-intent] Onvo error body:', data)
      return res.status(response.status).json({ error: data.message || 'Error al crear el pago' })
    }

    const data = await response.json()
    console.log('[create-payment-intent] success, paymentIntentId:', data.id)
    return res.status(200).json({ id: data.id })
  } catch (err) {
    console.error('[create-payment-intent] fetch threw:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
