import { useEffect } from 'react';
import './Login.css';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from './../../assets/navbar-verde.png';
import Logo from './../../assets/logo.png';
import LogoNome from './../../assets/logo-nome-verde.png';
import api from '../../../services/api.js';
import { useNavigate } from 'react-router-dom'



function Login() {

  const inputMatricula = useRef()
  const inputSenha = useRef()

  const navigate = useNavigate() //faz a nevegação entre as paginas
  

  async function loginUsers() {
    const matricula = inputMatricula.current.value
    const senha = inputSenha.current.value
  

  // Monta objeto com os dados
    const loginUsuario = {
      matricula,
      senha,
    }

    try {
      const res = await api.post('/public/login', loginUsuario)
      alert(res.data.mensagem || "Login realizado com sucesso!")
      sessionStorage.setItem("matricula", matricula);
      // Redireciona diferente dependendo do usuário
if (matricula === "admin") {
  navigate('/home-admin'); // página especial para esse usuário
} else {
  navigate('/home'); // página padrão
}
    } catch (err) {
      console.error("Erro ao realizar:", err)
      alert(err.response?.data?.erro || "Erro ao realizar login.")
    }

  }


  return (
   <div className="Login">
      <div className='header'>


      <img src={LogoNome} alt="Logo topo" className="logo-topo-login" />


      </div>

      

      <main>
        <h1 className="login-titulo">LOGIN</h1>
        <label className="label-login">Usuário (Matrícula)</label>
        <input type="text" placeholder="  Digite seu usuário" ref={inputMatricula}/>

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
