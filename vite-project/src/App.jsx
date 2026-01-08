import './App.css'
import Header from './numbertwo.jsx'
// Import from 'react-router' instead of 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard.jsx';
import Materias from './pages/Materias.jsx';
import Calendario from './pages/Calendario.jsx';
import Gastos from './pages/Gastos.jsx';
import Humor from './pages/Humor.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='container'>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/humor" element={<Humor />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;