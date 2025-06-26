import React from 'react'

function stringToColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`;
}

const testimonialsData = [
    {
        name: "Ana María",
        text: "Excelente calidad y servicio, superó mis expectativas.",
    },
    {
        name: "Carlos Pérez",
        text: "Diseños únicos y entrega puntual. Muy recomendable.",
    },
    {
        name: "Lucía Fernández",
        text: "La joya es hermosa y el trato increíble. ¡Volveré a comprar!",
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section py-5 bg-light">
            <div className="container text-center">
                <h2 className="mb-4 section-title">Testimonios</h2>
                <div className="row justify-content-center g-4">
                    {testimonialsData.map((testimonial, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="testimonial-card p-4 shadow-sm h-100">
                                <div
                                    className="testimonial-initial mb-3"
                                    style={{ backgroundColor: stringToColor(testimonial.name) }}
                                >
                                    {testimonial.name.charAt(0)}
                                </div>
                                <p className="testimonial-text fst-italic">"{testimonial.text}"</p>
                                <h5 className="mt-3 testimonial-name">{testimonial.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
