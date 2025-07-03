import React, { useState, useRef, useEffect } from 'react'; // ⬅ Adiciona useEffect
import { Link } from 'react-router-dom';
import './Home.css';
import menuIcon from './../../assets/navbar.svg';
import LogoNome from './../../assets/logo-nome.png';
import ImgCardapio from './../../assets/card.png';
import Avisos from './../../assets/Avisos.png';
import Logo from './../../assets/logo.png';

function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [textoAviso, setTextoAviso] = useState(''); // ⬅ Estado para o aviso
  const avisosRef = useRef(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const irParaAvisos = () => {
    toggleMenu();
    avisosRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ⬇ Pega o aviso salvo no localStorage ao carregar a página
  useEffect(() => {
    const avisoSalvo = localStorage.getItem('textoAviso');
    if (avisoSalvo) {
      setTextoAviso(avisoSalvo);
    } else {
      setTextoAviso("Nenhum aviso disponível no momento.");
    }
  }, []);

  return (
    <div className="Home">
      <button className="botao-menu" onClick={toggleMenu}>
        <img src={menuIcon} alt="Abrir menu" className="icone-menu" />
      </button>

      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to='/home'>Início</Link></li>
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
        <img src={Avisos} alt="Título aviso" className="titulo-aviso" />
        <p className="avisos-texto">{textoAviso}</p>
      </section>
    </div>
  );
}

export default Home;

