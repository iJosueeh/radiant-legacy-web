import React from 'react'

const Footer = () => {
    return (
        <footer className="footer-section mt-5">
            <div className="container">
                <div className="row gy-4">

                    <div className="col-12 col-md-4 text-center text-md-start">
                        <h5 className="footer-logo mb-3">Radiant Legacy</h5>
                        <p className="footer-desc mb-3">
                            La joyería que hace brillar cada momento. Síguenos en redes para descubrir nuestras últimas colecciones.
                        </p>
                        <div className="footer-socials d-flex justify-content-center justify-content-md-start gap-3">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                        </div>
                    </div>

                    <div className="col-6 col-md-2">
                        <h6 className="footer-title mb-3">Enlaces</h6>
                        <ul className="footer-links list-unstyled">
                            <li><a href="#sobre-nosotros">Sobre nosotros</a></li>
                            <li><a href="#colecciones">Colecciones</a></li>
                            <li><a href="#sedes">Sedes</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="col-6 col-md-3">
                        <h6 className="footer-title mb-3">Contacto</h6>
                        <ul className="footer-contact list-unstyled">
                            <li><i className="bi bi-geo-alt-fill me-2"></i> Av. Principal 123, Lima</li>
                            <li><i className="bi bi-telephone-fill me-2"></i> +51 999 888 777</li>
                            <li><i className="bi bi-envelope-fill me-2"></i> contacto@radiantlegacy.com</li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <h6 className="footer-title mb-3">Mapa</h6>
                        <div className="footer-map-container rounded overflow-hidden shadow-sm">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=..."
                                width="100%"
                                height="150"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="mapa-footer"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom mt-4 pt-3 border-top text-center">
                    © {new Date().getFullYear()} Radiant Legacy. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}

export default Footer
