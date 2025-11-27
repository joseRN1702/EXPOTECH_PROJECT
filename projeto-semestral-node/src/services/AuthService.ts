import { ClienteService } from "./ClienteService";

export class AuthService {
  private clienteService = new ClienteService();

  async login(email: string, senha: string) {
    const clientes = await this.clienteService.getAll();
    const user = clientes.find(c => c.email.toLowerCase().trim() === email.toLowerCase().trim());

    if (!user || user.senha !== senha) {
      throw new Error("Email ou senha inválidos");
    }

    return user;
  }
}
