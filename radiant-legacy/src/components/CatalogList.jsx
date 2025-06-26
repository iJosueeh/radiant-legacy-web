import CatalogCard from './CatalogCard';

const catalogItems = [
    {
        title: 'Anillos',
        description: 'Exclusivos anillos para cada ocasión',
        image: 'https://via.placeholder.com/400x300?text=Anillos',
    },
    {
        title: 'Collares',
        description: 'Descubre nuestra colección',
        image: null,
    },
    {
        title: 'Pulseras',
        description: 'Pulseras de oro, plata y más',
        image: 'https://via.placeholder.com/400x300?text=Pulseras',
    },
];

const CatalogList = () => {
    return (
        <section id="catalogo" className="catalog-section py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title fw-bold mb-2">Nuestro Catálogo</h2>
                    <p className="section-subtitle text-muted">
                        Joyas hechas para destacar tu esencia
                    </p>
                </div>

                <div className="row g-4">
                    {catalogItems.map((item, index) => (
                        <div className="col-12 col-md-4" key={index}>
                            <CatalogCard
                                title={item.title}
                                description={item.description}
                                image={item.image}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalogList;