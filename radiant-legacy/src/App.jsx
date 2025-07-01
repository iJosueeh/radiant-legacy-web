import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatisticsSection from './components/StatisticsSection.jsx'
import AboutUs from './components/AboutUs.jsx'
import Testimonials from './components/Testimonials.jsx'
import CatalogList from './components/CatalogList.jsx'
import Sedes from './components/Sedes.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import LoadingOverlay from './components/LoadingOverlay.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Perfil from './pages/Perfil.jsx'
import CatalogoPage from './pages/CatalogoPage.jsx'
import ProductoPage from './pages/ProductoPage.jsx'
import CarritoPage from './components/CarritoPage.jsx'
import ResenasPage from './pages/Resenas.jsx'
import HistorialPage from './pages/Historial.jsx'

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

function App() {
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <LoadingOverlay show={isLoadingOverlay} />
        <Navbar setIsLoadingOverlay={setIsLoadingOverlay} />
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <StatisticsSection />
                  <AboutUs />
                  <Testimonials />
                  <CatalogList />
                  <Sedes />
                  <Contacto />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/catalogo/:id" element={<CatalogoPage />} />
            <Route path="/producto/:id" element={<ProductoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/resenas" element={<ResenasPage />} />
            <Route path="/historial" element={<HistorialPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App