import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import aboutUsImage from '../assets/images/aboutUs-image.webp'

const AboutUs = () => {
    return (
        <section id="about-us" className="about-section">
            <div className="container">
                <div className="row align-items-center about-text-container">
                    <motion.div
                        className="col-md-6 mb-4 mb-md-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="about-title">Sobre Nosotros</h2>
                        <p className="about-text">
                            En <span className="highlight">Radiant Legacy</span> creemos que cada joya cuenta una historia. Desde 1990, hemos creado piezas que combinan elegancia, calidad y compromiso, logrando que cada cliente viva una experiencia especial y duradera.
                        </p>
                        <p className="about-text mt-2">
                            Nuestros diseños, elaborados por manos expertas, resaltan la belleza natural de cada material, asegurando que cada producto sea único y atemporal.
                        </p>
                        <a href="#colecciones" className="about-button mt-3">Ver Colecciones</a>
                    </motion.div>

                    <motion.div
                        className="col-md-6 text-center"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src={aboutUsImage}
                            alt="Sobre nosotros"
                            className="about-image"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
