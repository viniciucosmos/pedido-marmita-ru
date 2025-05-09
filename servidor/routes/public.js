import express from 'express'

//só é necessario importar a parte de rotas aqui
const router = express.Router()

//cadastro
router.get('/cadastro', (req, res) =>  {
    res.send("Olá mundo");
})

//exportar pra depois chamar no server
export default router