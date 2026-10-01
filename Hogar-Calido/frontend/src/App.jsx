import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import  Home  from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Logo } from './components/Logo';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      {/* Logo personalizado y enlace a inicio */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
        <Logo size={42} />
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.5px' }}>Hogar Cálido</h1>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Confort & Diseño para tu espacio</span>
        </div>
      </Link>

      {/* Botones de navegación y sesión dinámicos */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {user.role === 'ROLE_ADMIN' && (
              <Link to="/admin" style={{ padding: '8px 16px', background: '#38bdf8', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
                Panel Admin
              </Link>
            )}
            <span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>Hola, {user.name || user.email}</span>
            <button onClick={logout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/register" style={{ padding: '9px 18px', border: '1.5px solid #cbd5e1', borderRadius: '8px', color: '#334155', textDecoration: 'none', fontWeight: '600', background: 'white', fontSize: '14px' }}>
              Crear cuenta
            </Link>
            <Link to="/login" style={{ padding: '9px 18px', background: '#0f172a', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;