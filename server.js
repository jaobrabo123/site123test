import express from 'express';
import { criarEPopularTabelaUsuarios } from './app.js';
import { criarEPopularTabelaInfoExtra } from './app.js'
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = 'seu-segredo-super-seguro';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para autenticar o token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user; // Adiciona o usuário decodificado à requisição
        next();
    });
}

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        const usuario = await db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

        if (usuario) {
            const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1d' });
            res.json({ token });
        } else {
            res.status(401).send('Email ou senha inválidos.');
        }
    } catch (error) {
        res.status(500).send('Erro ao fazer login: ' + error.message);
    }
});

// Rota para cadastro de usuários
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha, genero, nasc } = req.body;
    try {
        await criarEPopularTabelaUsuarios(nome, email, senha, genero, nasc);
        res.status(200).send('Usuário inserido com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao inserir usuário: ' + error.message);
    }
});

// Rota protegida para buscar dados do usuário autenticado
app.get('/usuarios', authenticateToken, async (req, res) => {
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        // Busca o usuário baseado no ID contido no token JWT
        const usuario = await db.get('SELECT * FROM usuarios WHERE id = ?', [req.user.id]);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário: ' + error.message);
    }
});

// Inicia o servidor
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));

// Rota para buscar todos os usuários
app.get('/todos-usuarios', authenticateToken, async (req, res) => {
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });

        // Busca todos os usuários
        const usuarios = await db.all('SELECT id, nome, email, senha, genero, nasc, tipo_usua FROM usuarios');

        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado' });
        }

        res.json(usuarios);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuários: ' + error.message);
    }
});
