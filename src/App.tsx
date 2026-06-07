import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Prices from './pages/Prices'
import RoutePlanner from './pages/RoutePlanner'
import Hubs from './pages/Hubs'
import Vehicles from './pages/Vehicles'
import Reviews from './pages/Reviews'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/routes" element={<RoutePlanner />} />
            <Route path="/hubs" element={<Hubs />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App