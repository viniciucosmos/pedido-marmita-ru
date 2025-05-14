import express from "express";
import connection from '../../db/connection.js';

import dotenv from 'dotenv';
dotenv.config();

//só precisa importar a função de rotas aqui
const router = express.Router();

//cadastro inicio
router.post("/cadastro", (req, res) => {
  const { nome_aluno, matricula, cpf,  email_aluno, senha_aluno, campus, subsidio, celular , data_criacao} = req.body;

  if (!nome_aluno || !matricula || !cpf ||  !senha_aluno || !email_aluno || !campus || !subsidio || !celular || !data_criacao) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

   // Converter data para formato YYYY-MM-DD
   const [dia, mes, ano] = data_criacao.split('/');
   const dataFormatada = `${ano}-${mes}-${dia}`;

  // verifica se a matrícula já tá cadastrada
  const verificar = "SELECT * FROM alunos WHERE matricula = ?";
  connection.query(verificar, [matricula], (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: "Erro ao verificar matrícula" });
    }

    if (resultados.length > 0) {
      return res.status(409).json({ erro: "Matrícula já cadastrada" });
    }

    const inserir =
      "INSERT INTO alunos (nome_aluno, matricula, cpf,  senha_aluno, email_aluno, campus, subsidio, celular, data_criacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      inserir,
      [nome_aluno, matricula, cpf,  senha_aluno, email_aluno, campus, subsidio, celular, dataFormatada],
      (erro) => {
        if (erro) {
          console.error("Erro no INSERT:", erro); 
          return res.status(500).json({ erro: "Erro ao cadastrar aluno" });
        }

        return res
          .status(201)
          .json({ mensagem: "Cadastro realizado com sucesso" });
      }
    );
  });   
});
 
//cadastro fim


//res.status(201).json(user);

//login
router.post("/login", (req, res) => {
  const { matricula, senha_aluno } = req.body;

  if (!matricula || !senha_aluno) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórias" });
  }

  const consulta = "SELECT * FROM alunos WHERE matricula = ?";

  connection.query(consulta, [matricula], (erro, resultados) => {
    if (erro) {
      console.error("Erro ao consultar aluno:", erro);
      return res.status(500).json({ erro: "Erro ao verificar login" });
    }

    if (resultados.length === 0) {
      return res.status(401).json({ erro: "Matrícula não encontrada" });
    }

    const aluno = resultados[0];

    if (aluno.senha_aluno !== senha_aluno) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }
 
    return res.status(200).json({ mensagem: "Login realizado com sucesso", aluno });
  });
}); 


//exportar pra depois chamar no server
export default router;
