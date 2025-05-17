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

export async function criarEPopularTabelaInfoExtra(campo, valor) {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    await db.run(`
        CREATE TABLE IF NOT EXISTS info_extra (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            foto_perfil TEXT,
            descricao TEXT,
            pontuacao_geral INT,
            pontuacao_xadrez INT,
            pontuacao_damas INT,
            pontuacao_tictactoe INT,
            pontuacao_sudoku INT,
            pontuacao_minado INT,
            id_usua INTEGER,
            FOREIGN KEY (id_usua) REFERENCES usuarios(id)
        )
    `)

    await db.run(
        `INSERT INTO info_extra (${campo}) VALUES (?)`,
        [valor]
    )
}