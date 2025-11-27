import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const items = [
    {
      id: 0,
      title: "Último requerimento",
      device: "Redmi 12",
      date: "20/10/2025",
      eta: "31/10/2025",
      context: "Tela quebrada",
      price: "R$99,99",
    },
    {
      id: 1,
      title: "IPHONE 13",
      device: "iPhone 13",
      date: "17/10/2025",
      context: "Bateria viciada",
      price: "R$25,99",
    },
    {
      id: 2,
      title: "IPHONE 15",
      device: "iPhone 15",
      date: "15/10/2025",
      context: "Sistema operacional inoperante",
      price: "R$999,99",
    },
  ];

  return (
    <main style={{ width: "100%", maxWidth: 480, margin: "0 auto", minWidth: 5 }}>
      <div style={{ width: "100%", padding: "0 12px" }}>
        <header className="profile-header">
          <div className="avatar">👤</div>
          <div className="profile-name">Perfil</div>
        </header>

        <section className="requirements-card">
          <h3>REQUERIMENTOS</h3>

          <div className="req-list">
            {items.map((it) => (
              // wrap each requirement in a Link; pass the item via state
              <Link
                key={it.id}
                to={`/requirement/${it.id}`}
                state={{ item: it }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="req-item">
                  <div className="req-left">
                    <div className="req-title">{it.title ?? it.device}</div>

                    <div className="req-meta">
                      {/* always show device (unless title already is the device) */}
                      {it.device && it.title !== it.device && (
                        <div>
                          <strong>Dispositivo</strong>
                          <div className="meta-small">{it.device}</div>
                        </div>
                      )}

                      {/* context should always be shown if present */}
                      {it.context && (
                        <div style={{ marginTop: 6 }}>
                          <strong>Contexto</strong>
                          <div className="meta-small">{it.context}</div>
                        </div>
                      )}

                      {/* dates */}
                      {it.date && (
                        <div style={{ marginTop: 6 }}>
                          <strong>Data da requisição</strong>
                          <div className="meta-small">{it.date}</div>
                        </div>
                      )}
                      {it.eta && (
                        <div style={{ marginTop: 6 }}>
                          <strong>Previsão de entrega</strong>
                          <div className="meta-small">{it.eta}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="req-price">{it.price}</div>
                </article>
              </Link>
            ))}
          </div>

          <button className="new-order-btn" onClick={() => window.location.replace("/chat")}>
            <span className="plus">+</span> NOVO PEDIDO
          </button>
        </section>
      </div>
    </main>
  );
}
