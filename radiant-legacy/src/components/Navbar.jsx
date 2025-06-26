import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoadingOverlay }) => {
    const navbarRef = useRef(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLoginClick = () => {
        setIsLoading(true);
        setIsLoadingOverlay(true);
        setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
            setIsLoadingOverlay(false); 
        }, 1000);
    };

    return (
        <nav
            id="navbar"
            ref={navbarRef}
            className="navbar navbar-expand-lg fixed-top navbar-dark px-4 py-3"
        >
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    💎 Radiant Legacy
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 me-4 gap-3">
                        <li className="nav-item"><Link className="nav-link" to="/#about-us">Sobre Nosotros</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#catalogo">Colecciones</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#sedes">Sedes</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#contacto">Contacto</Link></li>
                    </ul>

                    <button
                        className={`btn btn-warning btn-login d-flex align-items-center px-3 ${isLoading ? "opacity-75 disabled" : ""
                            }`}
                        onClick={handleLoginClick}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Cargando…
                            </>
                        ) : (
                            <>
                                <i className="bi bi-person-circle me-2"></i> Iniciar sesión
                            </>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;