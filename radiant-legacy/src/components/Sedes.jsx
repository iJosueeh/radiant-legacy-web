import React from 'react'

const sedesData = [
    {
        id: 1,
        nombre: 'Sede Lima',
        direccion: 'Av. Principal 123, Lima',
        imagen: 'https://via.placeholder.com/400x250',
    },
    {
        id: 2,
        nombre: 'Sede Arequipa',
        direccion: 'Calle Arequipa 456, Arequipa',
        imagen: 'https://via.placeholder.com/400x250',
    },
    {
        id: 3,
        nombre: 'Sede Cusco',
        direccion: 'Jr. Inca 789, Cusco',
        imagen: 'https://via.placeholder.com/400x250',
    },
];

const Sedes = () => {
    return (
        <section id="sedes" className="py-5 sedes-section">
            <div className="container text-center mb-4">
                <h2 className="display-5 fw-bold text-white">Nuestras Sedes</h2>
                <p className="text-light">Conoce dónde encontrarnos en todo el país.</p>
            </div>

            <div className="container">
                <div className="row g-4">
                    {sedesData.map((sede) => (
                        <div className="col-md-4" key={sede.id}>
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                <img
                                    src={sede.imagen}
                                    alt={sede.nombre}
                                    className="card-img-top img-fluid"
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-light">
                                    <h5 className="card-title fw-semibold">{sede.nombre}</h5>
                                    <p className="text-muted mb-3">{sede.direccion}</p>
                                    <a href="#mapa" className="btn btn-outline-warning btn-sm w-100">
                                        Ver en mapa
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sedes;
