import React, { useState } from "react";
import axios from "axios";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Digite um email válido!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/clientes/redefinir-senha", {
        email,
        novaSenha: newPassword,
      });

      console.log("RESPOSTA DO BACKEND:", response.data); // <= AQUI


      alert(response.data.message);
      setIsModalOpen(false);
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <>
      <main>
        <div className="login-container">
          <h2>REDEFINIR SENHA</h2>
          <p style={{ textAlign: "left", opacity: 0.9, marginTop: 6 }}>
            Insira o e-mail cadastrado para redefinir sua senha.
          </p>

          <form onSubmit={handleSendCode}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar código</button>
          </form>

          <div className="links">
            <p>Lembrou-se da senha? <a href="/login">Faça Login</a></p>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="login-container modal-content">
            <h2>CRIAR NOVA SENHA</h2>

            <form onSubmit={handleResetPassword}>
              <label htmlFor="newPassword">Nova senha</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Digite a nova senha"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label htmlFor="confirmPassword">Confirme a nova senha</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirme a senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div style={{ display: "flex", gap: ".75rem" }}>
                <button type="submit">Redefinir senha</button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          width: 90%;
          max-width: 420px;
        }
        .secondary {
          background: gray !important;
        }
      `}</style>
    </>
  );
}
