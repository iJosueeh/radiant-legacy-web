import React, { useEffect, useRef, useState, useContext } from "react";
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useCarritoCount } from "../hooks/useCarritoCount";
import Collapse from "bootstrap/js/dist/collapse";

const Navbar = ({ setIsLoadingOverlay }) => {
    const navbarRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { count } = useCarritoCount();

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
        if (setIsLoadingOverlay) {
            setIsLoadingOverlay(true);
        }
        setIsLoading(true);
        setIsLoadingOverlay(true);
        setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
            setIsLoadingOverlay(false);
        }, 1000);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Tu sesión actual se cerrará.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "rounded-4 shadow",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                setDropdownOpen(false);
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "Has salido exitosamente.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/");
            }
        });
    };

    const toggleNavbar = () => {
        const navbarCollapse = document.getElementById("navbarContent");
        if (navbarCollapse) {
            const bsCollapse = Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.toggle();
        }
    };

    const closeNavbar = () => {
        const navbarCollapse = document.getElementById("navbarContent");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse = Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    };

    return (
        <nav
            id="navbar"
            ref={navbarRef}
            className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark px-3 py-3 w-100"
        >
            <div className="container-fluid px-0">
                <Link className="navbar-brand fw-bold fs-4" to="/" onClick={closeNavbar}>
                    💎 Radiant Legacy
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 me-4 gap-3">
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#about-us" onClick={closeNavbar}>
                                Sobre Nosotros
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#catalogo" onClick={closeNavbar}>
                                Colecciones
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#sedes" onClick={closeNavbar}>
                                Sedes
                            </HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink smooth className="nav-link" to="/#contacto" onClick={closeNavbar}>
                                Contacto
                            </HashLink>
                        </li>
                    </ul>
                    <Link
                        to="/carrito"
                        onClick={closeNavbar}
                        className="btn btn-outline-light position-relative me-3"
                    >
                        <i className="bi bi-cart3 fs-5"></i>
                        {count > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {count}
                            </span>
                        )}
                    </Link>
                    {!user ? (
                        <button
                            className={`btn btn-warning btn-login d-flex align-items-center px-3 ${isLoading ? "opacity-75 disabled" : ""}`}
                            onClick={handleLoginClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Cargando…
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-person-circle me-2"></i> Iniciar sesión
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light dropdown-toggle px-3"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                            >
                                Bienvenido, {user?.nombreCompleto?.split(" ")[0] || "Usuario"} 👋
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end shadow ${dropdownOpen ? "show" : ""}`} style={{ zIndex: 1050 }}>
                                <li>
                                    <Link className="dropdown-item" to="/perfil" onClick={() => setDropdownOpen(false)}>
                                        Tu Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/pedidos" onClick={() => setDropdownOpen(false)}>
                                        Tus Pedidos
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/resenas" onClick={() => setDropdownOpen(false)}>
                                        Tus Reseñas
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/historial" onClick={() => setDropdownOpen(false)}>
                                        Tu Historial
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger logout-btn" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;