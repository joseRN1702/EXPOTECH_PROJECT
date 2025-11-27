import { OrdemServicoRepository } from "../repositories/OrdemServicoRepository";

export class OrdemServicoService {
    private repo = new OrdemServicoRepository();

    async create(data: any) {
        return this.repo.create(data);
    }

    async getByCliente(clienteId: number) {
        return this.repo.getByCliente(clienteId);
    }

    async getAll() {
        return this.repo.findAll();
    }

    async getById(id: number) {
        return this.repo.findById(id);
    }

    async update(id: number, data: any) {
        return this.repo.update(id, data);
    }

    async delete(id: number) {
        return this.repo.delete(id);
    }
}
