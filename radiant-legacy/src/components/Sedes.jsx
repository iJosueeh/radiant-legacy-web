import React from 'react'
import LimaCity from '../assets/images/sedes/lima-img.webp';
import ArequipaCity from '../assets/images/sedes/arequipa-img.webp';
import CuscoCity from '../assets/images/sedes/cusco-img.webp';

const sedesData = [
    {
        id: 1,
        nombre: 'Sede Lima',
        direccion: 'Av. Principal 123, Lima',
        imagen: LimaCity,
    },
    {
        id: 2,
        nombre: 'Sede Arequipa',
        direccion: 'Calle Arequipa 456, Arequipa',
        imagen: ArequipaCity,
    },
    {
        id: 3,
        nombre: 'Sede Cusco',
        direccion: 'Jr. Inca 789, Cusco',
        imagen: CuscoCity,
    },
];

const Sedes = () => {
    return (
        <section id="sedes" className="py-5 sedes-section" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="container text-center mb-5">
                <h2 className="display-5 fw-bold">Nuestras Sedes</h2>
                <p className="text-muted">Conoce dónde encontrarnos en todo el país.</p>
            </div>

            <div className="container">
                <div className="row g-4">
                    {sedesData.map((sede) => (
                        <div className="col-md-4" key={sede.id}>
                            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden d-flex flex-column">
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img
                                        src={sede.imagen}
                                        alt={sede.nombre}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column flex-grow-1 bg-white">
                                    <h5 className="card-title fw-semibold mb-2">{sede.nombre}</h5>
                                    <p className="text-muted flex-grow-1">{sede.direccion}</p>
                                    <a
                                        href="#mapa"
                                        className="btn btn-outline-warning btn-sm w-100 mt-auto"
                                    >
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
