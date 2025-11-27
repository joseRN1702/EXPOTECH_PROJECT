export class OrdemServico {
    constructor(
        public id: number,
        public cliente_id: number,
        public funcionario_id: number,
        public data_inicio: Date,
        public data_fim: Date,
        public status: string
    ) {}
}
