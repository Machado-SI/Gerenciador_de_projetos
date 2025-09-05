const express = require('express')
const app = express()
require('dotenv').config()

// Middleware para receber o corpo de uma requisição
app.use(express.json())

// Não roda o server qunado estiver fazendo testes
if(process.env.NODE_ENV !== 'test') {
    app.listen(7777, () => console.log('Servidor rodando na porta 7777'))
}