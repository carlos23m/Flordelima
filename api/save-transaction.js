import { createClient } from '@supabase/supabase-js'

// Initialise the Supabase client once at module load time so it is reused
// across warm serverless invocations instead of being recreated on every request.
// The service key has full database access — it is never exposed to the client.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Vercel serverless handler — called after the Onvo payment form closes.
// Saves the client's details and the transaction result to the database.
export default async function handler(req, res) {

  // Only POST requests are accepted — all other methods are rejected immediately
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Destructure all expected fields from the request body
  const { client, paymentIntentId, amount, status, onvoResult, items } = req.body

  // ── Step 1: Validate required client fields ──────────────────────────────────
  // email, nombre, and telefono are the minimum needed to identify and contact the customer
  if (!client?.email || !client?.nombre || !client?.telefono)
    return res.status(400).json({ error: 'Datos del cliente incompletos' })

  // ── Step 2: Enforce field length limits ──────────────────────────────────────
  // Limits match common database column sizes and prevent oversized strings
  // from being stored in Supabase or forwarded to the email service
  const MAX = { nombre: 120, email: 254, telefono: 30, cedula: 20, canton: 80, direccion: 250, notas: 500 }
  if (
    client.nombre?.length    > MAX.nombre    ||
    client.email?.length     > MAX.email     ||    // 254 is the RFC 5321 maximum for email addresses
    client.telefono?.length  > MAX.telefono  ||
    client.cedula?.length    > MAX.cedula    ||
    client.canton?.length    > MAX.canton    ||
    client.direccion?.length > MAX.direccion ||
    client.notas?.length     > MAX.notas
  ) return res.status(400).json({ error: 'Campo demasiado largo' })

  // ── Step 3: Validate transaction fields ──────────────────────────────────────
  // All four fields are required to record a meaningful transaction row
  if (!paymentIntentId || !amount || !status || !items)
    return res.status(400).json({ error: 'Datos de transacción incompletos' })

  // Only these three statuses are accepted — anything else is rejected to prevent
  // unexpected values from being written to the database
  if (!['succeeded', 'declined', 'failed'].includes(status))
    return res.status(400).json({ error: 'Estado de transacción inválido' })

  // ── Step 4: Verify the payment with Onvo before trusting a "succeeded" status ─
  // Without this check, anyone could POST directly to this endpoint with
  // status: "succeeded" and a fake paymentIntentId to log a fraudulent order.
  // Failed/declined transactions are not verified because we always trust bad news —
  // only success claims need to be confirmed by the payment processor.
  if (status === 'succeeded') {
    try {
      // Fetch the payment intent from Onvo using its ID
      const verify = await fetch(`https://api.onvopay.com/v1/payment-intents/${paymentIntentId}`, {
        headers: { Authorization: `Bearer ${process.env.ONVO_SECRET_KEY}` },
      })

      // If Onvo itself returns an error, refuse to record the transaction
      if (!verify.ok) return res.status(400).json({ error: 'No se pudo verificar el pago' })

      const onvoData = await verify.json()

      // Onvo's status must also say "succeeded" — a mismatch means the client lied
      if (onvoData.status !== 'succeeded')
        return res.status(400).json({ error: 'El pago no fue confirmado por el procesador' })

    } catch {
      // Network failure reaching Onvo — fail closed rather than letting an unverified
      // transaction through (502 Bad Gateway signals an upstream dependency error)
      return res.status(502).json({ error: 'Error al verificar el pago con Onvo' })
    }
  }

  // ── Step 5: Save the client record to Supabase ───────────────────────────────
  try {
    const { data: clientRow, error: clientError } = await supabase
      .from('clients')
      .upsert(
        {
          // Normalise email to lowercase so the same address isn't stored twice
          email:     client.email.trim().toLowerCase(),
          nombre:    client.nombre.trim(),
          telefono:  client.telefono.trim(),
          // Optional fields default to null when blank so columns stay clean
          cedula:    client.cedula?.trim()    || null,
          provincia: client.provincia?.trim() || null,
          canton:    client.canton?.trim()    || null,
          direccion: client.direccion?.trim() || null,
          notas:     client.notas?.trim()     || null,
        },
        // onConflict: 'email' means if this email already exists, update the row instead
        // of inserting a duplicate. ignoreDuplicates: false ensures the row is updated
        // with the latest contact details each time the customer places an order.
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')  // Return the row's ID so we can link the transaction to this client
      .single()      // Expects exactly one row back — throws if none or many are returned

    if (clientError) {
      console.error('Supabase client upsert error:', clientError)
      return res.status(500).json({ error: 'Error al guardar cliente' })
    }

    // ── Step 6: Insert the transaction record ──────────────────────────────────
    // Linked to the client row via client_id (foreign key)
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        client_id:         clientRow.id,       // Foreign key to the clients table
        payment_intent_id: paymentIntentId,    // Onvo's ID — useful for support lookups
        amount:            Math.round(amount), // Stored in whole colones (no decimals)
        status,                                // 'succeeded' | 'declined' | 'failed'
        onvo_result:       onvoResult ?? null, // Full Onvo response object for audit purposes
        items,                                 // Snapshot of the cart at purchase time
      })

    if (txError) {
      console.error('Supabase transaction insert error:', txError)
      return res.status(500).json({ error: 'Error al guardar transacción' })
    }

    // Both writes succeeded — respond with a simple OK
    return res.status(200).json({ ok: true })

  } catch (err) {
    // Unexpected error (e.g. Supabase unreachable, malformed response)
    console.error('save-transaction error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
