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
            nasc DATE
        )
    `)

    await db.run(
        `INSERT INTO usuarios (nome, email, senha, genero, nasc) VALUES (?, ?, ?, ?, ?)`,
        [nome, email, senha, genero, nasc]
    )
}