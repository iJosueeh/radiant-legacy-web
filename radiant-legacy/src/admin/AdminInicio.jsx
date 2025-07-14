import React from 'react';
import { Card, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminInicio = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Panel de Administración</h2>

      <p className="mb-4">Bienvenido/a al panel de administrador. Desde aquí puedes gestionar usuarios, reseñas, citas y más funcionalidades del sistema.</p>

      <div className="row g-4">
        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Gestión de Usuarios</h5>
              <p className="text-muted">Visualiza y administra los usuarios registrados en la plataforma.</p>
              <Link to="/admin/usuarios" className="btn btn-outline-primary w-100">Ir a usuarios</Link>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Gestión de Citas</h5>
              <p className="text-muted">Revisa y gestiona todas las citas agendadas por los usuarios.</p>
              <Link to="/admin/citas" className="btn btn-outline-warning w-100">Ir a citas</Link>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Gestión de Reseñas</h5>
              <p className="text-muted">Modera las reseñas enviadas por los clientes sobre los productos.</p>
              <Link to="/admin/resenas" className="btn btn-outline-success w-100">Ir a reseñas</Link>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Gestión de Reseñas</h5>
              <p className="text-muted">Modera las reseñas enviadas por los clientes sobre los productos.</p>
              <Link to="/admin/resenas" className="btn btn-outline-success w-100">Ir a reseñas</Link>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Gestión de Citas</h5>
              <p className="text-muted">Revisa y gestiona todas las citas agendadas por los usuarios.</p>
              <Link to="/admin/citas" className="btn btn-outline-warning w-100">Ir a citas</Link>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm border-0">
            <CardBody>
              <h5 className="fw-bold">Registro de Acciones</h5>
              <p className="text-muted">Visualiza las últimas acciones realizadas por los administradores.</p>
              <Link to="/admin/logs" className="btn btn-outline-dark w-100">Ir a registros</Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminInicio;
