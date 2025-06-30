import { useEffect } from 'react';
import './Login.css';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from './../../assets/navbar-verde.png';
import Logo from './../../assets/logo.png';
import LogoNome from './../../assets/logo-nome-verde.png';
import api from '../../../services/api.js';


function Login() {

  const inputMatricula = useRef()
  const inputSenha = useRef()

  async function loginUsers() {
    const matricula = inputMatricula.current.value
    const senha = inputSenha.current.value
  

  // Monta objeto com os dados
    const loginUsuario = {
      matricula,
      senha,
    }

    try {
      const res = await api.post('/login', loginUsuario)
      alert(res.data.mensagem || "Login realizado com sucesso!")
    } catch (err) {
      console.error("Erro ao realizar:", err)
      alert(err.response?.data?.erro || "Erro ao realizar login.")
    }

  }

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
   <div className="Login">
      <div className='header'>

      <button className="botao-menu" onClick={toggleMenu}>
        <img src={menuIcon} alt="Abrir menu" className="icone-menu" /> 
      </button>

      <img src={LogoNome} alt="Logo topo" className="logo-topo-login" />


      </div>

      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to= '/'>Início</Link></li>
          <li><a href="#perfil">Perfil</a></li>
          <li><button onClick={irParaAvisos}>Avisos</button></li>
          <li><a href="#regrassubsidio">Regras de Subsídio</a></li>
          <li><a href="#ajuda">Ajuda</a></li>
          <li><a href="#painel">Paine de Controle</a></li>
        </ul>
      </div>
      

      <main>
        <h1 className="login-titulo">LOGIN</h1>
        <label className="label-login">Matrícula</label>
        <input type="number" placeholder="  Digite sua matrícula" ref={inputMatricula}/>

        <label className="label-login">Senha</label>
        <input type="password" placeholder="  Digite sua Senha" ref={inputSenha}/>

        <p className='redCadastro'>
         Ainda não é cadastrado? <a className="linkcad" href="/cadastro">Clique aqui e cadastre-se!</a>
        </p>
        
        
        <button className='botao-login'  onClick={loginUsers} >Fazer Login</button>
      </main>
      
      
    </div>
  );
}

export default Login;
