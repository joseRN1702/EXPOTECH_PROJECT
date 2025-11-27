import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // <-- import useNavigate

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // <-- hook para navegar

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== senha2) {
      setMessage("As senhas não conferem!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/clientes", {
        nome,
        email,
        senha,
      });

      setMessage("Usuário criado com sucesso!");

      // Limpa os campos
      setNome("");
      setEmail("");
      setSenha("");
      setSenha2("");

      // Redireciona para a página de login após 1s
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erro ao criar usuário");
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <header className="profile-header" style={{ position: "absolute", top: 6, left: 16 }}>
          <Link to="/login" style={{ textDecoration: "none", color: "#fff", marginRight: 8 }}>
            <button className="return">← VOLTAR</button>
          </Link>
        </header>

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
