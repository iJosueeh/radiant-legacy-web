import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardAdminSidebar = () => {
  return (
    <div>
      <h5 className="fw-bold mb-4 text-dark">
        <i className="bi bi-speedometer2 me-2"></i> Admin
      </h5>
      <ul className="nav flex-column gap-3">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-house-door"></i> Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-people"></i> Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-box-seam"></i> Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/pedidos"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-truck"></i> Pedidos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/citas"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-calendar-check"></i> Citas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/resenas"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
            }
          >
            <i className="bi bi-chat-dots"></i> Reseñas
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardAdminSidebar;