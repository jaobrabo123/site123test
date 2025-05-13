import express from 'express'
import { criarEPopularTabelaUsuarios } from './app.js'

const app = express()
app.use(express.static('public'))
app.use(express.json())

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, genero, nasc } = req.body
    try {
        await criarEPopularTabelaUsuarios(nome, email, senha, genero, nasc)
        res.status(200).send('Usuário inserido com sucesso!')
    } catch (error) {
        res.status(500).send('Erro ao inserir usuário: ' + error.message)
    }
})

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'))