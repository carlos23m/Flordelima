import { Routes, Route } from 'react-router-dom'
import App from './App'
import MarketPage from './pages/MarketPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tienda" element={<MarketPage />} />
    </Routes>
  )
}
