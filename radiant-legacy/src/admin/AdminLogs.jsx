import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Table, Spinner, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/logs/paginado?page=${page}&size=10`);
      setLogs(res.data.contenido);
      setTotalPages(res.data.totalPaginas);
    } catch (error) {
      console.error("Error al cargar logs:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const verHistorialReciente = async () => {
    try {
      const res = await axiosInstance.get('/admin/logs/pila');

      if (!res.data.length) {
        Swal.fire('Sin acciones', 'No hay acciones recientes registradas.', 'info');
        return;
      }

      const tabla = `
        <div style="max-height:300px; overflow-y:auto;">
          <p style="font-size: 0.9rem; color: gray; margin-bottom: 6px;">* Mostrando de la más reciente a la más antigua</p>
          <table style="width:100%; text-align:left;">
            <thead>
              <tr><th>Fecha</th><th>Acción</th><th>Tipo</th></tr>
            </thead>
            <tbody>
              ${res.data.map(log => `
                <tr>
                  <td>${new Date(log.fecha).toLocaleString()}</td>
                  <td>${log.accion}</td>
                  <td>${log.tipo}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      Swal.fire({
        title: 'Últimas acciones registradas',
        html: tabla,
        width: '600px',
        showCloseButton: true,
      });

    } catch (error) {
      console.error("Error al obtener historial:", error);
      Swal.fire('Error', 'No se pudo cargar el historial.', 'error');
    }
  };

  const deshacerUltimaAccion = async () => {
    const confirm = await Swal.fire({
      title: '¿Deshacer la última acción?',
      text: 'Se eliminará el último registro realizado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deshacer',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosInstance.post('/admin/logs/deshacer-ultima');
      Swal.fire({
        title: 'Acción deshecha',
        html: `
          <p><strong>Acción:</strong> ${res.data.accion}</p>
          <p><strong>Descripción:</strong> ${res.data.descripcion}</p>
        `,
        icon: 'success',
      });
      fetchLogs();
    } catch {
      Swal.fire('Error', 'No se pudo deshacer la acción o no hay acciones recientes.', 'error');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Registro de Acciones del Administrador</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={verHistorialReciente}>
            <i className="bi bi-clock-history me-1"></i> Ver historial reciente
          </Button>
          <Button variant="danger" onClick={deshacerUltimaAccion}>
            <i className="bi bi-arrow-counterclockwise me-1"></i> Deshacer última acción
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
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
              {Array.isArray(logs) && logs.length > 0 ? (
                logs.map((log, idx) => (
                  <tr key={idx}>
                    <td>{new Date(log.fecha).toLocaleString()}</td>
                    <td>{log.accion}</td>
                    <td>{log.descripcion}</td>
                    <td>{log.tipo}</td>
                    <td>{log.nombreAdmin || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No hay registros</td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button variant="secondary" disabled={page === 0} onClick={() => setPage(prev => prev - 1)}>
              ← Anterior
            </Button>
            <span className="fw-medium">Página {page + 1} de {totalPages}</span>
            <Button variant="secondary" disabled={page >= totalPages - 1} onClick={() => setPage(prev => prev + 1)}>
              Siguiente →
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogs;