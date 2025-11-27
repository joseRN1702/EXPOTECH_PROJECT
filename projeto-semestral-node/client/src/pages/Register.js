import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault(); // previne o reload da página

  if (senha !== senha2) {
    setMessage("As senhas não conferem!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/clientes", {
      nome,
      email,
      senha,
    });

    setMessage("Usuário criado com sucesso!");
    setNome("");
    setEmail("");
    setSenha("");
  } catch (error) {
    // Trata erros de forma segura
    setMessage(error.response?.data?.message || "Erro ao criar usuário");
  }
};


  return (
    <div>
      <main>
        <div className="login-container" style={{ maxWidth: 420 }}>
          <h2>REGISTRO</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />

            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Escolha uma senha"
              required
            />

            <label htmlFor="senha2">Confirmar senha:</label>
            <input
              type="password"
              id="senha2"
              value={senha2}
              onChange={(e) => setSenha2(e.target.value)}
              placeholder="Repita a senha"
              required
            />

            <button type="submit">REGISTRAR</button>
          </form>

          {message && <p>{message}</p>}
        </div>
      </main>
    </div>
  );
}
