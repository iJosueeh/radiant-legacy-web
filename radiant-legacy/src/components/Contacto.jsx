import React from 'react'

const Contacto = () => {
    return (
        <section id="contacto" className="contact-section py-5" style={{ background: "#f8f8f8" }}>
            <div className="container">
                <h2 className="text-center mb-4">Contáctanos</h2>
                <p className="text-center text-muted mb-5">¿Tienes preguntas o quieres más información? Estamos para ayudarte.</p>

                <div className="row g-5">
                    <div className="col-12 col-md-6">
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Nombre" required />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Correo electrónico" required />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" placeholder="Mensaje" rows={4} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-warning w-100">Enviar</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6 p-4 bg-light rounded shadow-sm">
                        <h5 className="mb-3 fw-bold text-dark">Información de contacto</h5>
                        <ul className="list-unstyled mb-4 text-muted">
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-geo-alt-fill me-2 text-primary"></i> Av. Principal 123, Lima
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-telephone-fill me-2 text-primary"></i> +51 999 888 777
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-envelope-fill me-2 text-primary"></i> contacto@radiantlegacy.com
                            </li>
                            <li className="mb-2 d-flex align-items-center">
                                <i className="bi bi-clock-fill me-2 text-primary"></i> Lun-Sáb: 9am-7pm
                            </li>
                        </ul>

                        <div className="d-flex gap-3 mb-4">
                            <a href="#" className="text-dark hover:text-primary transition"><i className="bi bi-facebook fs-3"></i></a>
                            <a href="#" className="text-dark hover:text-primary transition"><i className="bi bi-instagram fs-3"></i></a>
                            <a href="#" className="text-dark hover:text-primary transition"><i className="bi bi-twitter fs-3"></i></a>
                        </div>

                        <div className="map-container rounded overflow-hidden shadow-sm" style={{ height: '200px' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=..."
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="mapa"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacto
