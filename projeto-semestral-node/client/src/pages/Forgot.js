import React from "react";

export default function Forgot() {
  return (
    <div>
      <main>
        <div className="login-container">
          <h2>REDEFINIR SENHA</h2>

          <p style={{ textAlign: "left", opacity: 0.9, marginTop: 6 }}>
            Insira o e-mail cadastrado para redefinir sua senha.
          </p>

          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insira seu email"
              required
            />

            <button type="submit" style={{ marginTop: 14 }}>
              Enviar código
            </button>
          </form>

          <div className="links">
            <p style={{ marginTop: 12 }}>
              Lembrou-se da senha? <a href="/login">Faça Login</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
