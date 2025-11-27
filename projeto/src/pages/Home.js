import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pegando o ID do cliente salvo na memória (localStorage)
  const clienteId = localStorage.getItem("cliente_id");
  console.log("Cliente ID do localStorage:", clienteId);

  useEffect(() => {
    if (!clienteId) {
      console.warn("Nenhum cliente_id encontrado no localStorage!");
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const response = await axios.get(
          `http://localhost:4000/ordens_servico/cliente/${clienteId}`
        );

        console.log("Ordens recebidas:", response.data);

        // EXTRA: transformar as OS em algo parecido com o seu layout antigo
        const formatted = response.data.map((os, index) => {
          const dataInicio = new Date(os.data_inicio);
          const dataFormatada = dataInicio.toISOString().split("T")[0];

          const dataFim = os.data_fim ? new Date(os.data_fim).toISOString().split("T")[0] : null;

          return {
            id: os.id,
            number: index + 1,
            date: dataFormatada,
            eta: dataFim,
            context: os.descricao,
          };
        });

        


        setItems(formatted);
      } catch (error) {
        console.error("Erro ao buscar ordens:", error);
      }

      setLoading(false);
    }

    fetchOrders();
  }, [clienteId]);

  return (
    <main style={{ width: "100%", maxWidth: 480, margin: "0 auto", minWidth: 5 }}>
      <div style={{ width: "100%", padding: "0 12px" }}>
        <header className="profile-header">
          <div className="avatar">👤</div>
          <div className="profile-name">Perfil</div>
        </header>

        <section className="requirements-card">
          <h3>REQUERIMENTOS</h3>

          {/* LOADING */}
          {loading && <p>Carregando...</p>}

          {/* SE NÃO TEM OS */}
          {!loading && items.length === 0 && (
            <p style={{ textAlign: "center", marginTop: 20, opacity: 0.7 }}>
              Nenhuma ordem de serviço encontrada.
            </p>
          )}

          {/* LISTA */}
          <div className="req-list">
            {items.map((it) => (
              <Link
                key={it.id}
                to={`/requirement/${it.id}`}
                state={{ item: it }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article className="req-item">
                  <div className="req-left">
                    <div className="req-title">
                      Requisição #{it.number} – {it.date}
                    </div>

                    <div className="req-meta">
                      <div>
                        <strong>Dispositivo</strong>
                        <div className="meta-small">{it.device}</div>
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <strong>Contexto</strong>
                        <div className="meta-small">{it.context}</div>
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <strong>Data da requisição</strong>
                        <div className="meta-small">{it.date}</div>
                      </div>

                      <div style={{ marginTop: 6 }}>
                        <strong>Previsão de entrega</strong>
                        <div className="meta-small">{it.eta}</div>
                      </div>
                    </div>
                  </div>

                  <div className="req-price">{it.price}</div>
                </article>
              </Link>
            ))}
          </div>

          <button
            className="new-order-btn"
            onClick={() => window.location.replace("/chat")}
          >
            <span className="plus">+</span> NOVO PEDIDO
          </button>
        </section>
      </div>
    </main>
  );
}
