const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
// Arquivo onde contem funções utilitárias
const isBcryptHash = require('./utils')
// Arquivo que conecta o banco de dados
const db = require('./db')

// Middleware para receber o corpo de uma requisição
app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    try {
        const { Nome, Email ,SenhaHash } = req.body
        if(!isBcryptHash(SenhaHash)) {
            return res.status(400).json({
                message: "Formato de senha inválido"
            })
        }

       const users = await db.oneOrNone(
        'SELECT COUNT(*) AS count FROM users'
       )

       let cargo = 'User'

       if(users.count == 0) {
        cargo = 'Admin'
       } 

       const adicionarUsuario = await db.one(
            'INSERT INTO users(nome, email, senha, cargo) VALUES($1, $2, $3, $4) RETURNING *', [Nome, Email, SenhaHash, cargo]
        )
        if(!adicionarUsuario) {
            return res.status(500).json({message: "Erro ao adicionar usuário"})
        }
        res.status(201).json(adicionarUsuario)
    } catch (error) {
        console.log('Erro interno do servidor', error.message)
        res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
})

// Não roda o server qunado estiver fazendo testes
if(process.env.NODE_ENV !== 'test') {
    app.listen(7777, () => console.log('Servidor rodando na porta 7777'))
}