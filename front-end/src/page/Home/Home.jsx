import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import menuIcon from './../../assets/navbar.svg';
import LogoNome from './../../assets/logo-nome.png';
import ImgCardapio from './../../assets/card.png';
import Avisos from './../../assets/Avisos.png';
import Logo from './../../assets/logo.png';

function Home() {
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
    <div className="Home">
    
     <button className="botao-menu" onClick={toggleMenu}>
        <img src={menuIcon} alt="Abrir menu" className="icone-menu" />
      </button>

      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to= '/home'>Início</Link></li>
          <li><a href="#perfil">Perfil</a></li>
          <li><button onClick={irParaAvisos}>Avisos</button></li>
          <li><a href="#regrassubsidio">Regras de Subsídio</a></li>
          <li><a href="#ajuda">Ajuda</a></li>
        </ul>
      </div>
      

      <main className='main-home'>
        <img src={LogoNome} alt="Logo Nome" className="logo-central" />
        <h2 className='cardapio'>Cardápio Semanal</h2>
        <img src={ImgCardapio} alt="Imagem Cardapio" className="img-cardapio" /> 
        <Link to="/fazer-pedido">
        <button className='botao-pedido'>Realizar Pedido</button>
      </Link>
        
        <label className="diapedido">Para dia xx/xx</label>

      
      </main>

      <section ref={avisosRef} className="avisos">
        <img src={Avisos} alt="titulo aviso" className="titulo-aviso" />
        <p className="avisos-texto">
         Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.
        </p>
      </section>
    </div>
  );
}

export default Home;
