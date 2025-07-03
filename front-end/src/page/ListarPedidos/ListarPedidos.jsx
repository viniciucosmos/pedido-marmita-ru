import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api.js';
import Logo from './../../assets/logo.png';
import LogoNome from './../../assets/logo-nome-verde.png';
import menuIcon from './../../assets/navbar-verde.png';
import './ListarPedidos.css';

function ListarPedidos() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [pedidos, setPedidos] = useState([]);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  async function listarPedidos() {
    try {
      const res = await api.get(`/private/pedidos?filtro=${filtro}`);
      setPedidos(res.data.pedidos);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      alert("Erro ao listar pedidos.");
    }
  }

  return (
    <div className="ListarPedidos">
      {/* HEADER */}
      <div className='header'>
        <button className="botao-menu" onClick={toggleMenu}>
          <img src={menuIcon} alt="Abrir menu" className="icone-menu" />
        </button>
        <img src={LogoNome} alt="Logo topo" className="logo-topo-listar" />
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to='/home-admin'>Início</Link></li>
          <li><a href="#perfil">Perfil</a></li>
          <li><a href="#avisos">Avisos</a></li>
          <li><a href="#regrassubsidio">Regras de Subsídio</a></li>
          <li><a href="#ajuda">Ajuda</a></li>
          <li><Link to='/painel-de-controle'>Painel de Controle</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <main className='main-listar'>
        <h1 className="listar-titulo">Listar Pedidos</h1>

        <label className="label-listar">Filtrar por:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ width: "75%", padding: "8px", borderRadius: "10px", marginBottom: "10px" }}
        >
          <option value="todos">Todos</option>
          <option value="ultimos30">Último mês</option>
          <option value="ultimos1">Último dia</option>
        </select>

        <button className='botao-listar' onClick={listarPedidos}>
          Buscar Pedidos
        </button>

        {pedidos.length > 0 && (
         <div className="tabela-container">
    <table>
      <thead>
        <tr style={{ backgroundColor: "#16492F", color: "#fff" }}>
          <th>Pedido</th>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Campus</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((p, i) => (
          <tr key={p.id_pedido} style={{ backgroundColor: i % 2 === 0 ? "#f1f1f1" : "#fff" }}>
            <td>{p.id_pedido}</td>
            <td>{p.nome}</td>
            <td>{p.matricula}</td>
            <td>{p.campus}</td>
            <td>R$ {parseFloat(p.valor).toFixed(2)}</td>
            <td>{new Date(p.data_pedido).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        )}
      </main>
    </div>
  );
}

export default ListarPedidos;
