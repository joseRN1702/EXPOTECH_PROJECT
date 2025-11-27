import { Funcionario } from "../models/Funcionario";
import db from "../config/database";

export class FuncionarioRepository {
    // Cria um novo funcionario no banco
    async create(data: Partial<Funcionario>) {
        const nome = data.nome ?? null;
        const email = data.email ?? null;
        const senha = data.senha ?? null;

        const query = `INSERT INTO funcionarios (nome, email, senha) VALUES (?, ?, ?)`;

        try {
            const [result] = await db.execute(query, [nome, email, senha]);
            return { id: (result as any).insertId, nome, email, senha };
        } catch (err) {
            console.error('FuncionarioRepository.create - db execute error:', err);
            throw err;
        }
    }

    // Retorna todos os funcionarios
    async findAll(): Promise<Funcionario[]> {
        const [rows] = await db.execute(`SELECT * FROM funcionarios`);
        return rows as Funcionario[];
    }

    // Busca um funcionario pelo ID
    async findById(id: number): Promise<Funcionario | null> {
        const [rows] = await db.execute(`SELECT * FROM funcionarios WHERE id = ?`, [id]);
        const funcionario = (rows as Funcionario[])[0];
        return funcionario || null;
    }

    // Atualiza um funcionario
    async update(id: number, data: Partial<Funcionario>): Promise<Funcionario | null> {
        const funcionario = await this.findById(id);
        if (!funcionario) return null;

        const nome = data.nome ?? funcionario.nome;
        const email = data.email ?? funcionario.email;
        const senha = data.senha ?? funcionario.senha;

        const query = `UPDATE funcionarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;

        try {
            await db.execute(query, [nome, email, senha, id]);
            return { id, nome, email, senha };
        } catch (err) {
            console.error('FuncionarioRepository.update - db execute error:', err);
            throw err;
        }
    }

    // Deleta um funcionario
    async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM funcionarios WHERE id = ?`;

        try {
            const [result] = await db.execute(query, [id]);
            const affectedRows = (result as any).affectedRows;
            return affectedRows > 0;
        } catch (err) {
            console.error('FuncionarioRepository.delete - db execute error:', err);
            throw err;
        }
    }
}
