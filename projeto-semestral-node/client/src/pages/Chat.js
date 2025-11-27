import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 0, from: "bot", text: "Olá. Como posso ajudar ?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(null); // null | 1(device) | 2(context) | 3(date) | 4(confirm)
  const [draft, setDraft] = useState({});
  const boxRef = useRef(null);
  const navigate = useNavigate();
  const nextId = useRef(1);

  useEffect(() => {
    // scroll to bottom on new message
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushMessage(from, text) {
    setMessages((m) => [...m, { id: nextId.current++, from, text }]);
  }

  function botReply(text, afterMs = 400) {
    setTimeout(() => pushMessage("bot", text), afterMs);
  }

  function startScheduling() {
    setStep(1);
    botReply("Claro — vamos agendar um requerimento. Qual é o dispositivo (ex: iPhone 12)?");
  }

  function handleUserText(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    pushMessage("user", trimmed);
    setInput("");

    // if not in scheduling flow, detect intent
    if (!step) {
      const lower = trimmed.toLowerCase();
      if (lower.includes("agend") || lower.includes("requer") || lower.includes("marcar")) {
        startScheduling();
        return;
      }
      // otherwise ask if user wants to schedule
      botReply("Posso ajudar a agendar um pedido. Deseja agendar um requerimento? (sim / não)");
      setStep("confirm_start");
      return;
    }

    // handle confirm start
    if (step === "confirm_start") {
      if (trimmed.toLowerCase().startsWith("s")) {
        startScheduling();
      } else {
        botReply("Tudo bem. Diga-me como posso ajudar.");
        setStep(null);
      }
      return;
    }

    // scheduling steps
    if (step === 1) {
      setDraft((d) => ({ ...d, device: trimmed }));
      setStep(2);
      botReply("Entendido. Qual o problema/contexto do aparelho?");
      return;
    }

    if (step === 2) {
      setDraft((d) => ({ ...d, context: trimmed }));
      setStep(3);
      botReply("Perfeito. Qual a data preferida para atendimento/entrega? (dd/mm/aaaa)");
      return;
    }

    if (step === 3) {
      setDraft((d) => ({ ...d, date: trimmed }));
      setStep(4);
      const summary = `Resumo:\nDispositivo: ${draft.device || "—"}\nContexto: ${draft.context || "—"}\nData: ${trimmed}\nConfirmar agendamento? (sim / não)`;
      botReply(summary, 300);
      return;
    }

    if (step === 4) {
      if (trimmed.toLowerCase().startsWith("s")) {
        // persist requirement and navigate to detail
        const id = Date.now();
        const item = {
          id,
          title: draft.device ? "Requerimento" : "Requerimento",
          device: draft.device || "Desconhecido",
          context: draft.context || "",
          date: draft.date || "",
          price: "R$0,00",
        };
        const stored = JSON.parse(localStorage.getItem("requirements") || "[]");
        stored.unshift(item);
        localStorage.setItem("requirements", JSON.stringify(stored));

        botReply("Agendado com sucesso. Redirecionando para o requerimento...", 300);
        // short delay so user sees confirmation
        setTimeout(() => {
          navigate(`/requirement/${id}`, { state: { item } });
        }, 1000);
      } else {
        botReply("Ok — agendamento cancelado. Posso ajudar em outra coisa?");
      }
      setStep(null);
      setDraft({});
      return;
    }

    // fallback
    botReply("Desculpe, não entendi. Pode reformular?");
  }

  function handleSubmit(e) {
    e?.preventDefault();
    handleUserText(input);
  }

  return (
    <div style={{ width: "100%", maxWidth: 380, padding: "12px" }}>
      <header className="profile-header" style={{ position: "absolute", top: 6, left: 16 }}>
        <Link to="/home" style={{ textDecoration: "none", color: "#fff", marginRight: 8 }}>
          <button className="return">
            ← VOLTAR
          </button>
        </Link>
        <div style={{ marginLeft: 8 }} />
      </header>
      <div className="requirements-card" style={{ padding: 0,}}>
        <div style={{ padding: 10, background: "rgba(122,100,255,0.15)" }}>
          <div style={{ borderRadius: 8, background: "linear-gradient(90deg,#7a64ff,#5e4cff)", color: "#fff", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              🤖
            </div>
            <strong>Assistente IA</strong>
          </div>
        </div>

        <div ref={boxRef} className="chat-box" style={{ height: 360, overflowY: "auto", padding: 12, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.08))" }}>
          {messages.map((m) => (
            <div key={m.id} className={`message ${m.from}`} style={{ display: "flex", marginBottom: 10, justifyContent: m.from === "bot" ? "flex-start" : "flex-end" }}>
              <div style={{
                maxWidth: "75%",
                padding: "8px 12px",
                borderRadius: 10,
                background: m.from === "bot" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.95)",
                color: m.from === "bot" ? "#fff" : "#111",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                whiteSpace: "pre-wrap",
                fontSize: 14
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: 12, alignItems: "center", background: "transparent" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite aqui..."
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              outline: "none"
            }}
          />
          <button type="submit" className="new-order-btn" style={{ padding: "8px 12px", minWidth: 40 }}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
