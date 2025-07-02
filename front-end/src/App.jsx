import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Cadastro from './page/Cadastro/Cadastro';
import PainelControle from './page/PainelControle/PainelControle';
import Pedidos from './page/Pedidos/Pedidos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/painel-de-controle" element={<PainelControle/>} />
        <Route path="/fazer-pedido" element={<Pedidos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
