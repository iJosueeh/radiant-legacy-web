import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, Spinner } from 'react-bootstrap';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/admin/logs/ultimas')
      .then(res => setLogs(res.data))
      .catch(() => alert("Error al cargar logs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Registro de Acciones del Administrador</h2>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Acción</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td>{new Date(log.fecha).toLocaleString()}</td>
                <td>{log.accion}</td>
                <td>{log.descripcion}</td>
                <td>{log.tipo}</td>
                <td>{log.admin?.nombreCompleto || '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminLogs;
