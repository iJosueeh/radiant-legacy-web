import React from 'react'
import heroImage from '../assets/images/hero-image.webp'

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
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                }}
            />

            <div className="position-relative container px-3 px-md-5">
                <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">
                    Radiant Legacy
                </h1>
                <p className="lead mb-4 fs-5 fs-md-4 opacity-90 animate__animated animate__fadeInUp">
                    La joyería que hace brillar cada momento
                </p>
                <a href="#colecciones" className="btn btn-warning btn-lg px-4 py-2 shadow-sm">
                    Ver Colecciones
                </a>
            </div>
        </section>
    )
}

export default Hero
