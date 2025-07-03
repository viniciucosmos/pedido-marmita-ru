import './PainelControle.css';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from './../../assets/navbar.svg';
import Logo from './../../assets/logo.png';
import LogoTopo from './../../assets/logo-amarelo.png';
import IconPerfil from './../../assets/perfil-amarelo.png';
import IconPedido from './../../assets/pedido.png'
import IconCardapio from './../../assets/cardapio.png'
import IconAvisos from './../../assets/iconavisos.png'
import IconAlunos from './../../assets/alunos.png'
import IconSub from './../../assets/subsidio.png'

function PainelControle() {
const [menuAberto, setMenuAberto] = useState(false);
    const avisosRef = useRef(null);
  
    const toggleMenu = () => {
      setMenuAberto(!menuAberto);
    };
  
     const irParaAvisos = () => {
      toggleMenu(); // fecha o menu
      avisosRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
   <div className="PainelControle">
      <div className='header-painel'>

      <button className="botao-menu-painel" onClick={toggleMenu}>
        <img src={menuIcon} alt="Abrir menu" className="icone-menu" /> 
      </button>

      <img src={LogoTopo} alt="Logo topo" className="logo-topo" />

      <img src={IconPerfil} alt="Icon Perfil" className="icon-perfil" />


      </div>

      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to= '/home-admin'>Início</Link></li>
          <li><a href="#perfil">Perfil</a></li>
          <li><button onClick={irParaAvisos}>Avisos</button></li>
          <li><a href="#regrassubsidio">Regras de Subsídio</a></li>
          <li><a href="#ajuda">Ajuda</a></li>
          <li><a href="#painel">Painel de Controle</a></li>
        </ul>
      </div>
      



      <main className='main-painel'>

        <h1 className='painel-titulo'>PAINEL DE CONTROLE</h1>
        <h2 className='painel-subtitulo'>Gerencie cardápios, acompanhe os pedidos
e mantenha os avisos atualizados com facilidade.</h2>
        
       
        <Link to="/listar-pedidos" style={{ textDecoration: 'none' }}>
         <button className="botao1">
            <p>Pedidos</p>
            <img src={IconPedido} alt="icon pedido" className="icone-pedido" />
        </button>
        </Link>
        <button className="botao1">
            <p>Cardápio</p>
            <img src={IconCardapio} alt="icon cardapio" className="icone-card" />
        </button>

        <Link to="/Avisos" style={{ textDecoration: 'none' }}>
        <button className="botao1">
            <p>Avisos</p>
            <img src={IconAvisos} alt="icon avisos" className="icone-avisos" />
        </button>
        </Link>
     
        <button className="botao1">
            <p>Alunos</p>
            <img src={IconAlunos} alt="icon alunos" className="icone-alunos" />
        </button>
        <button className="botao1">
            <p>Subsídios</p>
            <img src={IconSub} alt="icon subsidio" className="icone-sub" />
        </button>
                

       
        
      </main>
      
      
    </div>
  );
}

export default PainelControle;