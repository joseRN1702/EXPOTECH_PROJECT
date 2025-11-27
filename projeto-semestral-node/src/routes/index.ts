import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import { OrdemServicoController } from "../controllers/OrdemServicoController";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import db from "../config/database";
import { jwtDecode } from "jwt-decode";

const router = Router();
const clienteController = new ClienteController();

// CLIENTE
router.post("/clientes", clienteController.create);
router.get("/clientes", clienteController.getAll);
router.get("/clientes/:id", clienteController.getById);
router.put("/clientes/:id", clienteController.update);
router.delete("/clientes/:id", clienteController.delete);

const ordemServicoController = new OrdemServicoController();

// ORDEM DE SERVIÇO
router.post("/ordens_servico", ordemServicoController.create);
router.get("/ordens_servico", ordemServicoController.getAll);
router.get("/ordens_servico/:id", ordemServicoController.getById);
router.put("/ordens_servico/:id", ordemServicoController.update);
router.delete("/ordens_servico/:id", ordemServicoController.delete);

router.get("/ordens_servico/cliente/:clienteId", ordemServicoController.getByCliente);

const funcionarioController = new FuncionarioController();

// FUNCIONARIO
router.post("/funcionarios", funcionarioController.create);
router.get("/funcionarios", funcionarioController.getAll);
router.get("/funcionarios/:id", funcionarioController.getById);
router.put("/funcionarios/:id", funcionarioController.update);
router.delete("/funcionarios/:id", funcionarioController.delete);

const authController = new AuthController();
const authService = new AuthService();
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const user = await authService.login(email, senha);
    res.json({ message: "Login bem-sucedido", user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.post("/login", authController.login);

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, nome AS name FROM funcionarios");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar funcionários" });
  }
});


router.post("/clientes/redefinir-senha", clienteController.redefinirSenha);



export default router;
