import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import Register from './pages/register.jsx'
import Perfil from './pages/Perfil.jsx'
import CatalogoPage from './pages/CatalogoPage';
import ProductoPage from './pages/ProductoPage.jsx'

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function App() {
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);

  return (
    <Router>
      <ScrollToHash />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
