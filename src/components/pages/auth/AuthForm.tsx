'use client'

import { useState } from 'react'
import { loginUser } from '../../../api/authApi' // Ajusta la ruta de importación
import { Mail, Lock } from 'lucide-react'
import './AuthForm.css'
import Footer from '../../ui/footer/Footer'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate() 

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await loginUser(email, password)
      const { token, rol } = response.data

      // Guarda el token y el rol en localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('rol', rol)

      console.log('Inicio de sesión exitoso')
      // mostramos en consola el token y el rol
      console.log('Token:', token)
      console.log('Rol:', rol)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      setErrorMessage('Inicio de sesión fallido. Por favor, revisa tus credenciales.')
    }
  }

  return (
    <>
    <Helmet>
        <title>Inicio de Sesión</title>
      </Helmet>
    <div className="auth-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">TRAMUSAC</h1>
          <p className="card-description">Sistema de emisión de certificados</p>
        </div>

        <div className="tabs">
          <div className="tabs-list">
          <h4>Iniciar Sesión</h4>
          </div>
            <form onSubmit={handleLogin} className="tabs-content">
              <div className="form-group">
                <label htmlFor="login-email">Correo:</label>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Contraseña:</label>
                <div className="password-container">
                  <Lock className="input-icon" />
                  <input
                    id="login-password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                  >
                    👁️
                  </button>
                </div>
              </div>
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              <button type="submit" className="button-main">Iniciar Sesión</button>
            </form>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}