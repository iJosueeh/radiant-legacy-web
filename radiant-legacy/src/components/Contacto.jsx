import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { enviarCita } from "../services/citaService";
import Swal from "sweetalert2";

const Contacto = () => {
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({
        motivo: "",
        descripcion: "",
        telefono: "",
        modoCita: "PRESENCIAL",
        tipoContacto: "EMAIL",
        fecha_cita: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            Swal.fire({
                icon: "warning",
                title: "Inicia sesión",
                text: "Debes iniciar sesión para solicitar una cita.",
            });
            return;
        }

        const fechaSeleccionada = new Date(form.fecha_cita);
        const ahora = new Date();

        if (fechaSeleccionada <= ahora) {
            Swal.fire({
                icon: "error",
                title: "Fecha inválida",
                text: "Selecciona una fecha futura para la cita.",
            });
            return;
        }

        try {
            const cita = {
                ...form,
                fecha_cita: fechaSeleccionada.toISOString(),
                idUsuario: user.id,
            };

            await enviarCita(cita);

            Swal.fire({
                icon: "success",
                title: "¡Cita registrada!",
                text: "Tu solicitud fue enviada correctamente.",
            });

            setForm({
                motivo: "",
                descripcion: "",
                telefono: "",
                modoCita: "PRESENCIAL",
                tipoContacto: "EMAIL",
                fecha_cita: "",
            });
        } catch (error) {
            console.error("Error al enviar cita:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data || "Hubo un problema al registrar la cita.",
            });
        }
    };

    return (
        <section id="contacto" className="contact-section py-5" style={{ background: "#f8f8f8" }}>
            <div className="container">
                <h2 className="text-center mb-4">Contáctanos</h2>
                <p className="text-center text-muted mb-5">
                    ¿Tienes preguntas o quieres más información? Estamos para ayudarte.
                </p>

                <div className="row g-5">
                    <div className="col-12 col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="motivo"
                                    placeholder="Motivo de la cita"
                                    required
                                    value={form.motivo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    name="descripcion"
                                    placeholder="Descripción del motivo"
                                    rows={3}
                                    required
                                    value={form.descripcion}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="telefono"
                                    placeholder="Teléfono de contacto"
                                    required
                                    value={form.telefono}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Modo de la cita</label>
                                <select
                                    className="form-select"
                                    name="modoCita"
                                    value={form.modoCita}
                                    onChange={handleChange}
                                >
                                    <option value="PRESENCIAL">Presencial</option>
                                    <option value="VIRTUAL">Virtual</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tipo de contacto preferido</label>
                                <select
                                    className="form-select"
                                    name="tipoContacto"
                                    value={form.tipoContacto}
                                    onChange={handleChange}
                                >
                                    <option value="WHATSAPP">WhatsApp</option>
                                    <option value="EMAIL">Email</option>
                                    <option value="TELEFONO">Teléfono</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Fecha de la cita</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="fecha_cita"
                                    required
                                    value={form.fecha_cita}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-warning w-100">
                                Enviar solicitud
                            </button>
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
                            <a href="#" className="text-dark"><i className="bi bi-facebook fs-3"></i></a>
                            <a href="#" className="text-dark"><i className="bi bi-instagram fs-3"></i></a>
                            <a href="#" className="text-dark"><i className="bi bi-twitter fs-3"></i></a>
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
    );
};

export default Contacto;