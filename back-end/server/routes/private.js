import express from 'express';
import QRCode from 'qrcode';
import connection from '../../db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Rota de pedido
router.post("/pedido", (req, res) => {
  const { matricula } = req.body;

  if (!matricula) {
    return res.status(400).json({ erro: "Matrícula é obrigatória" });
  }

  // Busca dados do usuario
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
    const valor = usuario.subsido ? 2.00 : 14.00;


    // (Opcional) salvar pedido
    const salvar = "INSERT INTO pedidos (id_usuario_FK, valor) VALUES (?, ?)";
    connection.query(salvar, [usuario.id_usuario, valor], (erro) => {
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

export default router;

