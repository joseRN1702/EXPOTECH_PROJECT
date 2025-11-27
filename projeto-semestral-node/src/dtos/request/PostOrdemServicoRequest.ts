export class PostOrdemServicoRequest {
    clienteId: string;
    tipoServicoId: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;

    constructor(clienteId: string, tipoServicoId: string, descricao: string, dataInicio: Date, dataFim: Date) {
        this.clienteId = clienteId;
        this.tipoServicoId = tipoServicoId;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}