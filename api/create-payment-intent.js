export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, description } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Monto inválido' })
  }

  try {
    const response = await fetch('https://api.onvopay.com/v1/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ONVO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        currency: 'CRC',
        amount: Math.round(amount * 100),
        description: description || 'Pedido Flor de Lima',
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      return res.status(response.status).json({ error: data.message || 'Error al crear el pago' })
    }

    const data = await response.json()
    return res.status(200).json({ id: data.id })
  } catch (err) {
    console.error('create-payment-intent error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
