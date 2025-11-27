import app from "./app";
import db from "./config/database";
import bcrypt from "bcryptjs";
import { ResultSetHeader } from "mysql2";

const PORT = 4000;

// 🔥 SUA ROTA AQUI, ACIMA DO LISTEN!
app.put("/clientes/redefinir-senha", async (req, res) => {
  console.log("🔥 ROTA CHAMADA!");
  console.log("BODY:", req.body);

  const { email, novaSenha } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE clientes SET senha = ? WHERE email = ?",
      [senhaHash, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Email não encontrado." });
    }

    return res.json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// 🔥 LISTEN SEMPRE NO FINAL
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
