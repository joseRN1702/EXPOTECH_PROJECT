import db from "../config/database";

export class OrdemServicoRepository {

    async create(data: any) {
        const [result]: any = await db.query(
            `INSERT INTO ordens_servico 
                (cliente_id, funcionario_id, descricao, data_inicio, data_fim, status) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.cliente_id,
                data.funcionario_id,
                data.descricao,
                data.data_inicio,
                data.data_fim,
                data.status,
            ]
        );

        return {
            id: result.insertId,
            ...data
        };
    }

    async findAll() {
        const [rows]: any = await db.query("SELECT * FROM ordens_servico");
        return rows;
    }

    async findById(id: number) {
        const [rows]: any = await db.query(
            "SELECT * FROM ordens_servico WHERE id = ?",
            [id]
        );
        return rows[0];
    }

    async update(id: number, data: any) {
        await db.query(
            `UPDATE ordens_servico SET 
                cliente_id = ?, 
                funcionario_id = ?, 
                descricao = ?,
                data_inicio = ?, 
                data_fim = ?, 
                status = ?
            WHERE id = ?`,
            [
                data.cliente_id,
                data.funcionario_id,
                data.descricao,
                data.data_inicio,
                data.data_fim,
                data.status,
                id
            ]
        );

        return this.findById(id);
    }

    async getByCliente(clienteId: number) {
        const [rows]: any = await db.query(
            "SELECT * FROM ordens_servico WHERE cliente_id = ?",
            [clienteId]
        );
        return rows;
    }

    async delete(id: number) {
        const [result]: any = await db.query(
            "DELETE FROM ordens_servico WHERE id = ?",
            [id]
        );

        return result.affectedRows > 0;
    }
}
