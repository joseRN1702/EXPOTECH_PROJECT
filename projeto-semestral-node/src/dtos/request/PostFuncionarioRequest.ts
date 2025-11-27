export class PostFuncionarioRequest {
    nome: string;
    cpf: string;
    email: string;
    senha: string;

    constructor(nome: string, cpf: string, email: string, telefone: string, senha: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}