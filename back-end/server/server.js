import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors()) 
app.use('/public', publicRoutes)
app.use('/private', privateRoutes)


app.listen(3000, () => console.log("Servidor Rodando! ")) 