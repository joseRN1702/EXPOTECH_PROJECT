import { Request, Response } from "express";
import { FuncionarioService } from "../services/FuncionarioService";

export class FuncionarioController {
    private service = new FuncionarioService();

    create = (req: Request, res: Response) => {
        // aguardar a criação no repositório (retorna Promise)
        return this.service.createFuncionario(req.body)
            .then(funcionario => res.status(201).json(funcionario))
            .catch(err => {
                console.error('Erro ao criar funcionario:', err);
                return res.status(500).json({ message: 'Erro ao criar funcionario' });
            });
    };


    getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getAll();
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar dados' });
        }
    };

    getById = (req: Request, res: Response) => {
        const funcionario = this.service.getById(Number(req.params.id));
        if (!funcionario) return res.status(404).json({ message: "Funcionario not found" });
        return res.json(funcionario);
    };

    update = (req: Request, res: Response) => {
        const updated = this.service.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: "Funcionario not found" });
        return res.json(updated);
    };

    delete = (req: Request, res: Response) => {
        const deleted = this.service.delete(Number(req.params.id));
        if (!deleted) return res.status(404).json({ message: "Funcionario not found" });
        return res.status(204).send();
    };
}