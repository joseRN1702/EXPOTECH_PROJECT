import { Cliente } from "../models/Cliente";
import db from "../config/database";

export class ClienteRepository {

    async updatePasswordByEmail(email: string, novaSenha: string): Promise<boolean> {
        const query = `UPDATE clientes SET senha = ? WHERE email = ?`;

        try {
            const [result] = await db.execute(query, [novaSenha, email]);
            const affectedRows = (result as any).affectedRows;
            return affectedRows > 0;
        } catch (err) {
            console.error('ClienteRepository.updatePasswordByEmail - db execute error:', err);
            throw err;
        }
    }

    // Cria um novo cliente no banco
    async create(data: Partial<Cliente>) {
        const nome = data.nome ?? null;
        const email = data.email ?? null;
        const senha = data.senha ?? null;

        const query = `INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)`;

        try {
            const [result] = await db.execute(query, [nome, email, senha]);
            return { id: (result as any).insertId, nome, email, senha };
        } catch (err) {
            console.error('ClienteRepository.create - db execute error:', err);
            throw err;
        }
    }

    // Retorna todos os clientes
    async findAll(): Promise<Cliente[]> {
        const [rows] = await db.execute(`SELECT * FROM clientes`);
        console.log('Rows:', rows);
        return rows as Cliente[];
    }


    // Busca um cliente pelo ID
    async findById(id: number): Promise<Cliente | null> {
        const [rows] = await db.execute(`SELECT * FROM clientes WHERE id = ?`, [id]);
        const cliente = (rows as Cliente[])[0];
        return cliente || null;
    }

    // Atualiza um cliente
    async update(id: number, data: Partial<Cliente>): Promise<Cliente | null> {
        const cliente = await this.findById(id);
        if (!cliente) return null;

        const nome = data.nome ?? cliente.nome;
        const email = data.email ?? cliente.email;
        const senha = data.senha ?? cliente.senha;

        const query = `UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE id = ?`;

        try {
            await db.execute(query, [nome, email, senha, id]);
            return { id, nome, email, senha };
        } catch (err) {
            console.error('ClienteRepository.update - db execute error:', err);
            throw err;
        }
    }

    // Deleta um cliente
    async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM clientes WHERE id = ?`;

        try {
            const [result] = await db.execute(query, [id]);
            const affectedRows = (result as any).affectedRows;
            return affectedRows > 0;
        } catch (err) {
            console.error('ClienteRepository.delete - db execute error:', err);
            throw err;
        }
    }
}
