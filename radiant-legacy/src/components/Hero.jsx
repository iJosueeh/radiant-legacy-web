import React from 'react';
import heroImage from '../assets/images/hero-image.webp';

const Hero = () => {
    return (
        <section
            className="hero d-flex align-items-center justify-content-center text-center text-white position-relative"
            style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                width: '100%',
                minHeight: '100vh',
            }}
        >
            {/* Overlay oscuro */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                }}
            />

            <div className="position-relative container px-3 px-md-5">
                {/* Imagen oculta solo para mejorar LCP */}
                <img
                    src={heroImage}
                    alt="Fondo joyería Radiant Legacy"
                    width="1200"
                    height="auto"
                    loading="eager"
                    className="position-absolute opacity-0"
                    style={{ width: 1, height: 1, pointerEvents: 'none' }}
                    aria-hidden="true"
                />

                <h1 className="display-3 fw-bold mb-3">
                    Radiant Legacy
                </h1>
                <p className="lead mb-4 fs-5 opacity-90">
                    La joyería que hace brillar cada momento
                </p>
                <a href="#catalogo" className="btn btn-warning btn-lg px-4 py-2 shadow-sm">
                    Ver Colecciones
                </a>
            </div>
        </section>
    );
};

export default Hero;