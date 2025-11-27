import React, { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

export default function RequirementDetail() {
  const { id } = useParams();
  const location = useLocation();
  const item = location.state?.item;
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const availableDates = [
    "2025-11-18",
    "2025-11-20",
    "2025-11-23",
    "2025-11-25"
  ];
  const reagenda = () => {
  console.log(`Nova data escolhida para ${id}:`, selectedDate);
  setShowModal(false);
  alert(`Reagendado para: ${selectedDate}`);
  };


  if (!item) {
    return (
      <main style={{ width: "100%", maxWidth: "1280px", minWidth: "360px" }}>
        <div className="login-container">
          <h2>Requerimento</h2>
          <p>Detalhes não disponíveis — volte à lista.</p>
          <Link to="/home"><button>Voltar</button></Link>
        </div>
      </main>
    );
  }

  const handleReschedule = () => {
    console.log(`Nova data para o requerimento ${id}:`, newDate);
    setShowModal(false);
    alert(`Data remarcada para ${newDate}`);
  };

  return (
    <main>
      <header className="profile-header" style={{ position: "absolute", top: 6, left: 16 }}>
              <Link to="/home" style={{ textDecoration: "none", color: "#fff", marginRight: 8 }}>
                <button className="return">
                  ← VOLTAR
                </button>
              </Link>
              <div style={{ marginLeft: 8 }} />
            </header>
      <div style={{ width: "100vw", maxWidth: 480, margin: "0 auto", minWidth: 5 }}>
        <section className="requirements-card" style={{borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", padding: 16 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>DETALHES DO REQUERIMENTO</h3>

          <div style={{ padding: 12 }}>
            <div className="req-title" style={{ fontSize: 18, marginBottom: 8 }}>{item.title || item.device}</div>

            <div className="req-meta">
              <div><strong>Dispositivo</strong><div className="meta-small">{item.device}</div></div>
              {item.date && <div style={{ marginTop: 8 }}><strong>Data da requisição</strong><div className="meta-small">{item.date}</div></div>}
              {item.eta && <div style={{ marginTop: 8 }}><strong>Previsão de entrega</strong><div className="meta-small">{item.eta}</div></div>}
              <div style={{ marginTop: 8 }}><strong>Contexto</strong><div className="meta-small">{item.context}</div></div>
              <div style={{ marginTop: 12, fontWeight: 800, fontSize: 38, textAlign: "right"}}>{item.price}</div>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
              <button onClick={() => setShowModal(true)} className="return"> Remarcar </button>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", color: "#fffafe",
          background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "rgba(57, 50, 72, 1)", padding: 24, borderRadius: 12, width: "90%", maxWidth: 400,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <h3 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Escolher nova data</h3>

            <label style={{ display: "block", marginBottom: 8 }}>Datas disponíveis:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #d1d5db",
                borderRadius: 6,
                marginBottom: 20
              }}
            >
              <option value="">Selecione uma data</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("pt-BR")}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#e5e7eb",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  color: "#393248"
                }}
              >
                Cancelar
              </button>

              <button
                disabled={!selectedDate}
                onClick={handleReschedule}
                style={{
                  background: selectedDate ? "#635EB6" : "#9ca3af",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  cursor: selectedDate ? "pointer" : "not-allowed"
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
