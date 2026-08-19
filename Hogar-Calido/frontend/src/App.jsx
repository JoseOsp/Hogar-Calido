import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProductDetail } from './pages/ProductDetail';

// Un componente rápido de Home para listar productos
const Home = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1>Bienvenidos a Hogar Cálido</h1>
    <p>Selecciona un producto para ver sus detalles y características.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;