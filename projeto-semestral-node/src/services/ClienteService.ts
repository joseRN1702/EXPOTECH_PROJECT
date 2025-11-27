import { ClienteRepository } from "../repositories/ClienteRepository";
import bcrypt from 'bcryptjs';
import db from '../config/database';
import { ResultSetHeader } from "mysql2";


export class ClienteService {
    constructor(private repo = new ClienteRepository()) {}

    async redefinirSenha(email: string, novaSenha: string): Promise<boolean> {
        const senhaHash = novaSenha;

        const [result] = await db.query<ResultSetHeader>(
            "UPDATE clientes SET senha = ? WHERE email = ?",
            [senhaHash, email]
        );

        return result.affectedRows > 0;
    }

    createCliente(data: any) {
        return this.repo.create(data);
    }

    getAll() {
        return this.repo.findAll();
    }

    getById(id: number) {
        return this.repo.findById(id);
    }

    update(id: number, data: any) {
        return this.repo.update(id, data);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
