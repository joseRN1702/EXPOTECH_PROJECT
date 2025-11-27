import { request, response } from "express";
import { OrdemServicoService } from "../services/OrdemServicoService";

export class OrdemServicoController {
    private service = new OrdemServicoService();

    create = async (req: typeof request, res: typeof response) => {
        try {
            const ordemServico = await this.service.create(req.body);
            return res.status(201).json(ordemServico);
        } catch (error: any) {
            console.error("Erro ao criar Ordem de Serviço:", error);
            console.error("SQL ERROR:", error?.sqlMessage);
            console.error("SQL:", error?.sql);
            return res.status(500).json({ message: "Erro interno do servidor ao criar Ordem de Serviço." });
        }
    };

    getAll = async (req: typeof request, res: typeof response) => {
        return res.json(await this.service.getAll());
    };

    getById = async (req: typeof request, res: typeof response) => {
        const ordemServico = await this.service.getById(Number(req.params.id));
        if (!ordemServico) return res.status(404).json({ message: "Ordem de Serviço not found" });
        return res.json(ordemServico);
    };

    update = async (req: typeof request, res: typeof response) => {
        const updated = await this.service.update(Number(req.params.id), req.body);
        if (!updated) return res.status(404).json({ message: "Ordem de Serviço not found" });
        return res.json(updated);
    };

    delete = async (req: typeof request, res: typeof response) => {
        const deleted = await this.service.delete(Number(req.params.id));
        if (!deleted) return res.status(404).json({ message: "Ordem de Serviço not found" });
        return res.status(204).send();
    };

    getByCliente = async (req: typeof request, res: typeof response) => {
        const { clienteId } = req.params;

        try {
            const ordens = await this.service.getByCliente(Number(clienteId));
            return res.json(ordens);
        } catch (error) {
            console.error("Erro ao buscar OS:", error);
            return res.status(500).json({ message: "Erro ao buscar ordens de serviço" });
        }
    };
}
