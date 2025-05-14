import express from "express";
import connection from '../../db/connection.js';

import dotenv from 'dotenv';
dotenv.config();


//só é necessario importar a função de rotas aqui
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
  const { matricula, senha } = req.body;

  const userTeste = {
    matricula: "2021",
    senha: "123",
  };
});

//exportar pra depois chamar no server
export default router;
