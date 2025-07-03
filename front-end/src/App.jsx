import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Cadastro from './page/Cadastro/Cadastro';
import PainelControle from './page/PainelControle/PainelControle';
import Pedidos from './page/Pedidos/Pedidos'
import ListarPedidos from './page/ListarPedidos/ListarPedidos';
import HomeAdmin from './page/HomeAdmin/HomeAdmin';
import Avisos from './page/Avisos/Avisos';

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
        <Route path="/listar-pedidos" element={<ListarPedidos/>} />
        <Route path="/home-admin" element={<HomeAdmin/>} />
        <Route path="/avisos" element={<Avisos/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
