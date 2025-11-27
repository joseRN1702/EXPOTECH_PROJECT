export class PostClienteRequest {
    nome: string;
    email: string;
    endereco: string;

    constructor(nome: string, email: string, telefone: string, endereco: string) {
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
    }
}