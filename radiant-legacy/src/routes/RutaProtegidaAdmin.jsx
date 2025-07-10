import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RutaProtegidaAdmin = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return null 

  if (!user || user.rol !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}

export default RutaProtegidaAdmin