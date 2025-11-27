import { FuncionarioRepository } from "../repositories/FuncionarioRepository";
export class FuncionarioService {
    constructor(private repo = new FuncionarioRepository()) {}

    createFuncionario(data: any) {
        return this.repo.create(data);
    }

    getAll() {
        return this.repo.findAll();
    }

    getById(id: number) {
        return this.repo.findById(id)
    }

    update(id: number, data: any) {
        return this.repo.update(id, data);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}