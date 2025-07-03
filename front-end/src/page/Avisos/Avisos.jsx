import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import LogoNome from './../../assets/logo-nome-verde.png';
import menuIcon from './../../assets/navbar-verde.png';
import './Avisos.css'; // crie este CSS baseado no ListarPedidos.css se quiser

function Avisos() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [textoAviso, setTextoAviso] = useState('');

  const toggleMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    const textoSalvo = localStorage.getItem('textoAviso');
    if (textoSalvo) setTextoAviso(textoSalvo);
  }, []);

  const salvarAviso = () => {
    localStorage.setItem('textoAviso', textoAviso);
    alert('Aviso salvo com sucesso!');
  };

  return (
    <div className="EditarAvisos">
      {/* HEADER */}
      <div className='header'>
        <button className="botao-menu-avisos" onClick={toggleMenu}>
          <img src={menuIcon} alt="Abrir menu" className="icone-menu" />
        </button>
        <img src={LogoNome} alt="Logo topo" className="logo-topo-avisos" />
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
      <main className='main-avisos'>
        <h1 className="avisos-titulo">Editar Avisos</h1>

        <textarea
          value={textoAviso}
          onChange={(e) => setTextoAviso(e.target.value)}
          rows={10}
          style={{
            width: "90%",
            padding: "10px",
            borderRadius: "10px",
            fontSize: "16px",
            marginBottom: "10px",
            resize: "vertical"
          }}
        />

        <button className='botao-avisos' onClick={salvarAviso}>
          Salvar Aviso
        </button>
      </main>
    </div>
  );
}

export default Avisos;
