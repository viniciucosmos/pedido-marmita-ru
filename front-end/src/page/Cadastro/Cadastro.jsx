import './Cadastro.css';
import React, {  useState, useRef } from 'react';
import LogoNome from './../../assets/logo-nome-verde.png';
import api from '../../../services/api.js';

import { useNavigate } from 'react-router-dom'


function Cadastro() {

  const inputName = useRef()
  const inputCPF = useRef()
  const inputMatricula = useRef()
  const inputSenha = useRef()
  const inputCelular = useRef()
  const inputEmail = useRef()
  const inputCampus = useRef()

  const navigate = useNavigate()

 
  async function createUsers() {
    const nome = inputName.current.value
    const cpf = inputCPF.current.value
    const matricula = inputMatricula.current.value
    const senha = inputSenha.current.value
    const celular = inputCelular.current.value
    const email = inputEmail.current.value
    const campus = inputCampus.current.value   
  

    // Data atual formatada (dd/mm/aaaa)
    const hoje = new Date()
    const data_criacao = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`

    // Monta objeto com os dados
    const novoUsuario = {
      nome,
      cpf,
      matricula,
      senha,
      celular,
      email,
      campus,
      data_criacao
    }

    try {
      const res = await api.post('/private/cadastro', novoUsuario)
      alert(res.data.mensagem || "Cadastro realizado com sucesso!")
      navigate('/login') //indo pra tela de login
    } catch (err) {
      console.error("Erro ao cadastrar:", err.response?.data || err)
      alert(err.response?.data?.erro || "Erro ao cadastrar usuário.")

    }

  }
   

  
  return (
   <div className="Cadastro">
      <div className='header'>


      <img src={LogoNome} alt="Logo topo" className="logo-topo" />

      </div>

    
      
      <main>
        <h1 className="cadastro-titulo">CADASTRO</h1>

        <label className="label-cadastro">Nome Completo</label>
        <input type="text" placeholder="  Digite seu nome completo" ref={inputName}/>

        <label className="label-cadastro">CPF</label>
        <input type="number" placeholder="  Digite seu CPF" ref={inputCPF}/>

        <label className="label-cadastro">Matrícula</label>
        <input type="number" placeholder="  Digite sua matrícula" ref={inputMatricula}/>

        <label className="label-cadastro">Senha</label>
        <input type="password" placeholder="  Crie sua Senha" ref={inputSenha}/>

        <label className="label-cadastro">Campus</label>
        <input type="number" placeholder="  Digite seu Campus de entrega (1 ou 2)" ref={inputCampus}/>

        <label className="label-cadastro">  E-mail</label>
        <input type="email" placeholder="  Digite seu E-mail Institucional" ref={inputEmail}/>

        <label className="label-cadastro">Celular</label>
        <input type="number" placeholder="  Digite seu Celular" ref={inputCelular}/>
        
        <p className='redLogin'>
         Já é cadastrado? <a className="linklogin" href="/login">Clique aqui e faça o login!</a>
        </p>

        <button className='botao-cadastro' onClick={createUsers} >Finalizar Cadastro</button>
      </main>
      
      
    </div>
  );
}

export default Cadastro;

