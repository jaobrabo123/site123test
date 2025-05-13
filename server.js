import express from 'express'
import { criarEPopularTabelaUsuarios } from './app.js'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rota para inserir usuário (POST)
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, genero, nasc } = req.body
    try {
        await criarEPopularTabelaUsuarios(nome, email, senha, genero, nasc)
        res.status(200).send('Usuário inserido com sucesso!')
    } catch (error) {
        res.status(500).send('Erro ao inserir usuário: ' + error.message)
    }
})

// 🔍 Rota para listar usuários (GET)
app.get('/usuarios', async (req, res) => {
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        })

        const usuarios = await db.all('SELECT * FROM usuarios')
        res.json(usuarios)
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários: ' + error.message)
    }
})

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
