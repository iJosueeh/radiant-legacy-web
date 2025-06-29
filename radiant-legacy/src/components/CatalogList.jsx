import CatalogCard from './CatalogCard';
import JoyasImage from '../assets/images/catalogo/joyas-img.webp'
import CollaresImage from '../assets/images/catalogo/collares-img.webp';
import PulserasImage from '../assets/images/catalogo/pulseras-img.webp';

const catalogItems = [
    {
        id: 1,
        title: 'Anillos',
        description: 'Exclusivos anillos para cada ocasión',
        image: JoyasImage
    },
    {
        id: 2,
        title: 'Collares',
        description: 'Descubre nuestra colección',
        image: CollaresImage,
    },
    {
        id: 3,
        title: 'Pulseras',
        description: 'Pulseras de oro, plata y más',
        image: PulserasImage,
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
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                isCategoria={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalogList;