// Server-side product catalog — prices here are the source of truth
import { PRODUCTS } from './_products.js'

// Vercel serverless handler — called when the frontend POSTs to /api/create-payment-intent.
// Its only job is to create a payment intent in Onvo and return the intent ID to the client.
// The client then passes that ID to the Onvo SDK to render the payment form.
export default async function handler(req, res) {

  // Reject any HTTP method other than POST — this endpoint only accepts order submissions
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Pull the cart items and an optional order description from the request body.
  // Note: the client never sends an amount — the server computes it from the catalog.
  const { items, description } = req.body

  // Validate that items is a non-empty array before trying to iterate over it
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items requeridos' })
  }

  // Compute the order total server-side using the trusted catalog.
  // Accepting an amount from the client would allow anyone to tamper with the price
  // by calling this endpoint directly with a lower value (e.g. ₡1 for a ₡50,000 order).
  let amount = 0
  for (const { id, qty } of items) {
    // Reject any product ID that doesn't exist in the server-side catalog
    const product = PRODUCTS[id]
    if (!product) return res.status(400).json({ error: `Producto inválido: ${id}` })

    // qty must be a whole number between 1 and 99 — floats or extreme values are rejected
    if (!Number.isInteger(qty) || qty < 1 || qty > 99)
      return res.status(400).json({ error: 'Cantidad inválida' })

    // Accumulate the subtotal for this line item
    amount += product.priceNum * qty
  }

  // Final guard — amount should always be positive after the loop, but checked explicitly
  if (amount <= 0) {
    return res.status(400).json({ error: 'Monto inválido' })
  }

  try {
    // Call the Onvo API to create a payment intent with the computed total.
    // The secret key is read from an environment variable — never from the client.
    const response = await fetch('https://api.onvopay.com/v1/payment-intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Bearer token authenticates this server with Onvo
        Authorization: `Bearer ${process.env.ONVO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        currency: 'CRC',                              // Costa Rican colón
        amount: Math.round(amount * 100),             // Onvo expects the amount in cents
        description: description || 'Pedido Flor de Lima', // Shown on the Onvo receipt
      }),
    })

    // If Onvo returns an error status, forward it to the client with Onvo's own message
    if (!response.ok) {
      // .catch(() => ({})) prevents a JSON parse error from masking the original HTTP error
      const data = await response.json().catch(() => ({}))
      return res.status(response.status).json({ error: data.message || 'Error al crear el pago' })
    }

    // On success, return only the payment intent ID to the client.
    // The client passes this ID to the Onvo SDK to render the card form.
    const data = await response.json()
    return res.status(200).json({ id: data.id })

  } catch (err) {
    // Network failure or unexpected error reaching the Onvo API
    console.error('create-payment-intent error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
