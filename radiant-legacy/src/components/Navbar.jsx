import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ setIsLoadingOverlay }) => {
    const navbarRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                popup: "rounded-4 shadow"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                setDropdownOpen(false);
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "Has salido exitosamente.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate("/");
            }
        });
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
                            >
                                Bienvenido, {user?.nombreCompleto?.split(" ")[0] || "Usuario"} 👋
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end shadow ${dropdownOpen ? "show" : ""}`}>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/perfil"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Tu Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/pedidos"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Tus Pedidos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/reseñas"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Tus Reseñas
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button
                                        className="dropdown-item text-danger logout-btn"
                                        onClick={handleLogout}
                                    >
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
