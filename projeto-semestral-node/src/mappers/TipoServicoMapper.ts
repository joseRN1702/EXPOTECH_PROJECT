export class TipoServicoMapper {
    static toDto(entity: any): any {
        return {
            id: entity.id,
            nome: entity.nome,
            descricao: entity.descricao,
        };
    }

    static toEntity(dto: any): any {
        return {
            id: dto.id,
            nome: dto.nome,
            descricao: dto.descricao,
        };
    }
}