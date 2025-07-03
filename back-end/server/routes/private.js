import express from 'express';
import QRCode from 'qrcode';
import connection from '../../db/connection.js';

const router = express.Router();

// Rota para obter usuário por matrícula (GET /usuario/:matricula)
router.get("/usuario/:matricula", (req, res) => {
  const { matricula } = req.params;

  const consulta = "SELECT nome, matricula, campus FROM usuarios WHERE matricula = ?";
  connection.query(consulta, [matricula], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar usuario:", erro);
      return res.status(500).json({ erro: "Erro ao buscar usuario" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const usuario = resultados[0];
    return res.status(200).json({ usuario });
  });
});

// Rota para criar pedido (POST /pedido)
router.post("/pedido", (req, res) => {
  const { matricula } = req.body;

  if (!matricula) {
    return res.status(400).json({ erro: "Matrícula é obrigatória" });
  }

  // Busca dados do usuário
  const consulta = "SELECT id_usuario, subsidio FROM usuarios WHERE matricula = ?";
  connection.query(consulta, [matricula], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar usuario:", erro);
      return res.status(500).json({ erro: "Erro ao buscar usuario" });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ erro: "Usuario não encontrado" });
    }

    const usuario = resultados[0];
    const valor = usuario.subsidio ? 2.00 : 14.00;

    // Salvar pedido
    const salvar = "INSERT INTO pedidos (id_usuario_FK, valor, matricula) VALUES (?, ?, ?)";
    connection.query(salvar, [usuario.id_usuario, valor, matricula], (erro) => {
      if (erro) {
        console.error("Erro ao salvar pedido:", erro);
        return res.status(500).json({ erro: "Erro ao salvar pedido" });
      }

      // Gerar payload fictício de PIX 
      const payloadPix = `Pagamento Marmita RU - R$ ${valor.toFixed(2)}`;

      // Gera QR code a partir do payload
      QRCode.toDataURL(payloadPix, (err, url) => {
        if (err) {
          console.error("Erro ao gerar QR Code:", err);
          return res.status(500).json({ erro: "Erro ao gerar QR Code" });
        }

        return res.status(201).json({
          mensagem: "Pedido registrado com sucesso",
          valor,
          qr_code: url
        });
      });
    });
  });
});

// Rota para listar pedidos com filtro (GET /pedidos)
router.get("/pedidos", (req, res) => {
  const { filtro } = req.query;

  let condicao = "";
  if (filtro === "ultimos30") {
    condicao = "WHERE p.data_pedido >= NOW() - INTERVAL 30 DAY";
  } else if (filtro === "ultimos1") {
    condicao = "WHERE p.data_pedido >= NOW() - INTERVAL 1 DAY";
  }

  const consulta = `
    SELECT 
      p.id_pedido, 
      p.valor, 
      p.data_pedido,
      u.nome, 
      u.matricula, 
      u.campus
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario_FK = u.id_usuario
    ${condicao}
    ORDER BY p.data_pedido DESC
  `;

  connection.query(consulta, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar pedidos:", erro);
      return res.status(500).json({ erro: "Erro ao buscar pedidos" });
    }

    return res.status(200).json({ pedidos: resultados });
  });
});

export default router;
