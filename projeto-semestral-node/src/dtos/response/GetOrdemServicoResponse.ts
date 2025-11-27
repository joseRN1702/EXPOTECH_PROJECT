export class GetOrdemServicoResponse {
    id: number;
    clienteId: number;
    tipoServicoId: number;
    data: Date;
    status: string;

    constructor(id: number, clienteId: number, tipoServicoId: number, data: Date, status: string) {
        this.id = id;
        this.clienteId = clienteId;
        this.tipoServicoId = tipoServicoId;
        this.data = data;
        this.status = status;
    }
}