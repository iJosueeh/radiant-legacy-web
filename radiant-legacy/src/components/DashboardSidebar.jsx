import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
    return (
        <div className="dashboard-glass shadow rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-4 text-dark"><i className="bi bi-person-fill me-2"></i> Mi Cuenta</h5>
            <ul className="nav flex-column gap-3">
                <li>
                    <NavLink
                        to="/perfil"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-2 sidebar-link ${isActive ? 'active-link' : ''}`
                        }
                    >
                        <i className="bi bi-person-circle"></i> Perfil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/pedidos"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-2 sidebar-link ${isActive ? 'active-link' : ''}`
                        }
                    >
                        <i className="bi bi-box-seam"></i> Pedidos
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/resenas"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-2 sidebar-link ${isActive ? 'active-link' : ''}`
                        }
                    >
                        <i className="bi bi-chat-left-text"></i> Reseñas
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/historial"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-2 sidebar-link ${isActive ? 'active-link' : ''}`
                        }
                    >
                        <i className="bi bi-clock-history"></i> Historial
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSidebar;