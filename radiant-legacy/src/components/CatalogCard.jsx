import React from 'react'
import { BiImageAdd } from 'react-icons/bi';

const CatalogCard = ({ title, description, image }) => {
    return (
        <div
            className="catalog-card shadow-sm border-0 rounded overflow-hidden d-flex flex-column h-100"
            style={{ minHeight: '360px' }}
        >
            <div
                className="catalog-card-img-container"
                style={{ height: '200px', backgroundColor: '#f8f9fa' }}
            >
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="img-fluid w-100 h-100 object-fit-cover"
                    />
                ) : (
                    <div className="no-image-placeholder d-flex align-items-center justify-content-center h-100">
                        <BiImageAdd size={48} color="#ccc" />
                    </div>
                )}
            </div>

            <div className="p-3 d-flex flex-column flex-grow-1">
                <h5 className="fw-bold mb-2">{title}</h5>
                <p className="text-muted small flex-grow-1">{description}</p>
                <button className="btn btn-outline-dark btn-sm mt-auto align-self-start">Ver más</button>
            </div>
        </div>
    );
};

export default CatalogCard
