import React, { useEffect, useRef, useState } from 'react';
import './Pedidos.css';
import { Link } from 'react-router-dom';
import menuIcon from './../../assets/navbar-verde.png';
import Logo from './../../assets/logo.png';
import LogoNome from './../../assets/logo-nome-verde.png';
import api from '../../../services/api';

function Pedidos() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [tipoMarmita, setTipoMarmita] = useState("comum");
  const [mensagem, setMensagem] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [valor, setValor] = useState(null);

  const avisosRef = useRef(null);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  const irParaAvisos = () => {
    toggleMenu();
    avisosRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const matricula = sessionStorage.getItem("matricula");

  useEffect(() => {
    async function buscarUsuario() {
      if (!matricula) return;
      try {
        const res = await api.get(`/private/usuario/${matricula}`);
        setUsuario(res.data.usuario);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    }

    buscarUsuario();
  }, [matricula]);

  const handlePedido = async () => {
    try {
      const res = await api.post("/private/pedido", { matricula });
      setMensagem(res.data.mensagem);
      setQrCodeUrl(res.data.qr_code);
      setValor(res.data.valor);
    } catch (err) {
      console.error("Erro ao fazer pedido:", err);
      setMensagem(err.response?.data?.erro || "Erro ao registrar pedido.");
    }
  };

  return (
    <div className="Pedidos">
      <div className='header'>
        <button className="botao-menu" onClick={toggleMenu}>
          <img src={menuIcon} alt="Abrir menu" className="icone-menu" />
        </button>
        <img src={LogoNome} alt="Logo topo" className="logo-topo-pedidos" />
      </div>

      <div className={`sidebar ${menuAberto ? 'aberto' : ''}`}>
        <img src={Logo} alt="Logo Sidebar" className="logo-sidebar" />
        <button onClick={toggleMenu} className="fechar">×</button>
        <ul>
          <li><Link to='/home'>Início</Link></li>
          <li><a href="#perfil">Perfil</a></li>
          <li><button onClick={irParaAvisos}>Avisos</button></li>
          <li><a href="#regrassubsidio">Regras de Subsídio</a></li>
          <li><a href="#ajuda">Ajuda</a></li>
          <li><a href="#painel">Painel de Controle</a></li>
        </ul>
      </div>

      <main className='main-pedidos'>
        <h1 className="pedidos-titulo">FAZER PEDIDO</h1>

        {usuario ? (
          <div className="info-usuario">
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Matrícula:</strong> {usuario.matricula}</p>
            <p><strong>Campus:</strong> {usuario.campus}</p>
          </div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}

        <label className="label-pedidos">Tipo de marmita</label>
        <select
          value={tipoMarmita}
          onChange={(e) => setTipoMarmita(e.target.value)}
          className="select-marmita"
        >
          <option value="comum">Comum</option>
          <option value="vegetariana">Vegetariana</option>
        </select>

        <button className='botao-pedidos' onClick={handlePedido}>Fazer Pedido</button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
        {valor && <p className="valor">Valor: R$ {valor.toFixed(2)}</p>}
        {qrCodeUrl && (
          <div className="qr-container">
            <p>Use o QR Code para pagamento:</p>
            <img src={qrCodeUrl} alt="QR Code do PIX" className="qr-code" />
            <p><strong>CNPJ:</strong> 12.345.678/0001-99</p>
            <p><strong>Restaurante:</strong> Restaurante Universitário Central</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Pedidos;
