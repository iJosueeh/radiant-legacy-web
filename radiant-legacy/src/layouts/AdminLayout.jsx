import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardAdminSidebar from '../components/DashboardAdminSidebar';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-white border-end p-3" style={{ width: '250px' }}>
        <DashboardAdminSidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="m-0 text-dark">
            <i className="bi bi-person-gear me-2"></i> Panel Admin
          </h5>
          <button onClick={handleLogout} className="btn btn-sm btn-outline-danger">
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
          </button>
        </header>

        {/* Contenido dinámico */}
        <main className="p-4 bg-body-tertiary flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;