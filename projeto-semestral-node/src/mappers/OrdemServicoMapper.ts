export class OrdemServicoMapper {
    static toDTO(ordemServico: any): any {
        return {
            id: ordemServico.id,
            clienteId: ordemServico.clienteId,
            tipoServicoId: ordemServico.tipoServicoId,
            data: ordemServico.data,
            status: ordemServico.status,
            // Add other fields as necessary
        };
    }

    static fromDTO(dto: any): any {
        return {
            id: dto.id,
            clienteId: dto.clienteId,
            tipoServicoId: dto.tipoServicoId,
            data: dto.data,
            status: dto.status,
            // Add other fields as necessary
        };
    }
}