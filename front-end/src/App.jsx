import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Cadastro from './page/Cadastro/Cadastro';
import PainelControle from './page/PainelControle/PainelControle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/painel-de-controle" element={<PainelControle/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
