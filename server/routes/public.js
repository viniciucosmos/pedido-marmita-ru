import express from 'express'

//só é necessario importar a função de rotas aqui
const router = express.Router()

//cadastro
router.post('/cadastro', (req, res) =>  {
   const user = req.body

   res.status(201).json(user)

})

//login
router.post('/login', (req, res)=> {
    const {matricula, senha} = req.body

    const userTeste = {
        "matricula":"2021",
        "senha":"123"
    }

    if(matricula === userTeste.matricula && senha ===userTeste.senha){
        return res.status(201).json({mensagem: "Login bem sucedido"})
    } else {
        return res.status(401).json({erro: "Login ou Senha Incorretos! Tente novamente" })
    }
})



//exportar pra depois chamar no server
export default router