import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function criarEPopularTabelaUsuarios(nome, email, senha, genero, nasc) {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    await db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT,
            genero TEXT,
            nasc DATE,
            tipo_usua INTEGER DEFAULT 1
        )
    `)

    await db.run(
        `INSERT INTO usuarios (nome, email, senha, genero, nasc) VALUES (?, ?, ?, ?, ?)`,
        [nome, email, senha, genero, nasc]
    )
}

export async function criarEPopularTabelaInfoExtra(idusuario) {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    await db.run(`
        CREATE TABLE IF NOT EXISTS info_extra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            foto_perfil TEXT DEFAULT '/imgs/iconeperfil.png',
            descricao TEXT DEFAULT 'sua descricao',
            pontuacao_xadrez INT DEFAULT 0,
            pontuacao_damas INT DEFAULT 0,
            pontuacao_tictactoe INT DEFAULT 0,
            pontuacao_sudoku INT DEFAULT 0,
            pontuacao_minado INT DEFAULT 0,
            id_usua INTEGER UNIQUE,
            FOREIGN KEY (id_usua) REFERENCES usuarios(id)
        )
    `)
    const existente = await db.get(`SELECT * FROM info_extra WHERE id_usua = ?`, [idusuario]);

    if (!existente) {
        await db.run(`INSERT INTO info_extra (id_usua) VALUES (?)`, [idusuario]);
    }
}