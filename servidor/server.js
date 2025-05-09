import express from 'express'
import public_Routes from './routes/public.js'


const app = express()

app.listen(3000, () => console.log("Servidor Rodando! "))