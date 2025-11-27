import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { OrdemServicoService } from "../services/OrdemServicoService";

const ordemServicoService = new OrdemServicoService();


export class ClienteController {
    private service = new ClienteService();

    
    redefinirSenha = async (req: Request, res: Response) => {
        console.log("🔥 ROTA CHAMADA!");
        console.log("BODY:", req.body);

        const { email, novaSenha } = req.body;
        if (!email || !novaSenha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        try {
            const result = await this.service.redefinirSenha(email, novaSenha);
            if (!result) {
                return res.status(404).json({ message: "Email não encontrado." });
            }
            return res.json({ message: "Senha redefinida com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    };

    create = (req: Request, res: Response) => {
        // aguardar a criação no repositório (retorna Promise)
        return this.service.createCliente(req.body)
            .then(cliente => res.status(201).json(cliente))
            .catch(err => {
                console.error('Erro ao criar cliente:', err);
                return res.status(500).json({ message: 'Erro ao criar cliente' });
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
        const cliente = this.service.getById(Number(req.params.id));
        if (!cliente) return res.status(404).json({ message: "Cliente not found" });
        return res.json(cliente);
    };

    update = (req: Request, res: Response) => {
        const updated = this.service.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: "Cliente not found" });
        return res.json(updated);
    };

    delete = (req: Request, res: Response) => {
        const deleted = this.service.delete(Number(req.params.id));
        if (!deleted) return res.status(404).json({ message: "Cliente not found" });
        return res.status(204).send();
    };
}
