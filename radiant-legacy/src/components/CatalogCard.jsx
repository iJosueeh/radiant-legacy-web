import { Link } from "react-router-dom";
import { BiImageAdd } from 'react-icons/bi';

const CatalogCard = ({ id, title, description, image, isCategoria = false }) => {
    const ruta = isCategoria ? `/catalogo/${id}` : `/producto/${id}`;

    return (
        <div className="catalog-card border rounded shadow-sm h-100 d-flex flex-column">
            <div className="catalog-card-img-container" style={{ height: '200px' }}>
                {image ? (
                    <img src={image} alt={title} className="img-fluid w-100 h-100 object-fit-cover" />
                ) : (
                    <div className="no-image-placeholder d-flex align-items-center justify-content-center h-100 bg-light">
                        <BiImageAdd size={48} color="#ccc" />
                    </div>
                )}
            </div>

            <div className="p-3 d-flex flex-column flex-grow-1">
                <h5 className="fw-bold mb-2">{title}</h5>
                <p className="text-muted small flex-grow-1">{description}</p>
                <Link to={ruta} className="btn btn-outline-dark btn-sm mt-auto align-self-start">
                    Ver más
                </Link>
            </div>
        </div>
    );
};

export default CatalogCard;