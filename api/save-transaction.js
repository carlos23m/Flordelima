import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { client, paymentIntentId, amount, status, onvoResult, items } = req.body

  if (!client?.email || !client?.nombre || !client?.telefono)
    return res.status(400).json({ error: 'Datos del cliente incompletos' })

  const MAX = { nombre: 120, email: 254, telefono: 30, cedula: 20, canton: 80, direccion: 250, notas: 500 }
  if (
    client.nombre?.length    > MAX.nombre    ||
    client.email?.length     > MAX.email     ||
    client.telefono?.length  > MAX.telefono  ||
    client.cedula?.length    > MAX.cedula    ||
    client.canton?.length    > MAX.canton    ||
    client.direccion?.length > MAX.direccion ||
    client.notas?.length     > MAX.notas
  ) return res.status(400).json({ error: 'Campo demasiado largo' })
  if (!paymentIntentId || !amount || !status || !items)
    return res.status(400).json({ error: 'Datos de transacción incompletos' })
  if (!['succeeded', 'declined', 'failed'].includes(status))
    return res.status(400).json({ error: 'Estado de transacción inválido' })

  // Verify payment status directly with Onvo before recording a succeeded transaction.
  // Prevents attackers from forging success by calling this endpoint with a fake status.
  if (status === 'succeeded') {
    try {
      const verify = await fetch(`https://api.onvopay.com/v1/payment-intents/${paymentIntentId}`, {
        headers: { Authorization: `Bearer ${process.env.ONVO_SECRET_KEY}` },
      })
      if (!verify.ok) return res.status(400).json({ error: 'No se pudo verificar el pago' })
      const onvoData = await verify.json()
      if (onvoData.status !== 'succeeded')
        return res.status(400).json({ error: 'El pago no fue confirmado por el procesador' })
    } catch {
      return res.status(502).json({ error: 'Error al verificar el pago con Onvo' })
    }
  }

  try {
    const { data: clientRow, error: clientError } = await supabase
      .from('clients')
      .upsert(
        {
          email:     client.email.trim().toLowerCase(),
          nombre:    client.nombre.trim(),
          telefono:  client.telefono.trim(),
          cedula:    client.cedula?.trim()    || null,
          provincia: client.provincia?.trim() || null,
          canton:    client.canton?.trim()    || null,
          direccion: client.direccion?.trim() || null,
          notas:     client.notas?.trim()     || null,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (clientError) {
      console.error('Supabase client upsert error:', clientError)
      return res.status(500).json({ error: 'Error al guardar cliente' })
    }

    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        client_id:         clientRow.id,
        payment_intent_id: paymentIntentId,
        amount:            Math.round(amount),
        status,
        onvo_result:       onvoResult ?? null,
        items,
      })

    if (txError) {
      console.error('Supabase transaction insert error:', txError)
      return res.status(500).json({ error: 'Error al guardar transacción' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('save-transaction error:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
