// Server-side product catalog — single source of truth for pricing.
// Prices here are authoritative; the client-side catalog is display-only.
// The underscore prefix tells Vercel not to expose this file as an API endpoint.
export const PRODUCTS = {
  1: { title: 'Leche de Vaca',           priceNum: 1200 },
  2: { title: 'Queso Artesanal de Vaca', priceNum: 4500 },
  3: { title: 'Limón Mecino',            priceNum: 100  },
  4: { title: 'Leche de Cabra',          priceNum: 3000 },
  5: { title: 'Queso Artesanal de Cabra', priceNum: 5500 },
  6: { title: 'Jabón Artesanal',         priceNum: 4500 },
}
