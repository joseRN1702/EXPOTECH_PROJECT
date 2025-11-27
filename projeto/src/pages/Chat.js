import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TechnicalSupportFAQ({ clienteID }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [deviceType, setDeviceType] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [availableDates, setAvailableDates] = useState([
    "2025-11-25",
    "2025-11-26",
    "2025-11-27",
  ]);
  const [selectedDate, setSelectedDate] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(true);
  const [erroFuncionarios, setErroFuncionarios] = useState(null);

  const totalSteps = 4;

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/funcionarios");
        console.log("Funcionários recebidos:", response.data);
        setFuncionarios(response.data.data || response.data); // adapta ao formato da API
        setLoadingFuncionarios(false);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        setErroFuncionarios("Erro ao carregar funcionários.");
        setLoadingFuncionarios(false);
      }
    };

    fetchFuncionarios();
  }, []);

  const handleNext = () => setStep((prev) => prev + 1);

  const handleSubmit = async () => {
  // Verificações básicas
  if (!deviceType || !problemDescription || !selectedDate || !selectedFuncionario) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  // Datas
  const dataInicio = new Date(selectedDate);
  const dataFim = new Date(dataInicio);
  dataFim.setDate(dataFim.getDate() + 5); // exemplo de duração de serviço

const clienteID = Number(localStorage.getItem("clienteId"));

const ordemServico = {
  cliente_id: clienteID,
  funcionario_id: Number(selectedFuncionario),
  descricao: problemDescription,
  data_inicio: dataInicio.toISOString().split("T")[0] + " 00:00:00",
  data_fim: dataFim.toISOString().split("T")[0] + " 23:59:59",
  status: "em andamento"
};

  try {
    await axios.post("http://localhost:4000/ordens_servico", ordemServico);
    alert("Ordem de serviço criada com sucesso!");


    navigate("/home");

  } catch (error) {
    console.error(error);
    alert("Erro ao criar a ordem de serviço.");
  }
};


  const renderProgress = () => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 14, marginBottom: 4 }}>
        Passo {step + 1} de {totalSteps}
      </div>
      <div style={{ background: "#d1d5db", height: 8, borderRadius: 6 }}>
        <div
          style={{
            width: `${((step + 1) / totalSteps) * 100}%`,
            height: "100%",
            background: "#6c63ff",
            borderRadius: 6,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );

  return (
    <main>
      <div className="login-container" style={{ maxWidth: 500 }}>
        {renderProgress()}

        {step === 0 && (
          <div className="requirements-card">
            <h3>Qual tipo de dispositivo precisa de ajuda?</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {["Celular", "Computador", "Tablet"].map((type) => (
                <button
                  key={type}
                  className="new-order-btn"
                  onClick={() => { setDeviceType(type); handleNext(); }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="requirements-card">
            <h3>Qual é o problema do seu {deviceType}?</h3>
            <textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 6, marginTop: 8 }}
              rows={4}
            />
            <button
              className="new-order-btn"
              onClick={handleNext}
              disabled={!problemDescription}
              style={{ marginTop: 12 }}
            >
              Próximo
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="requirements-card">
            <h3>Selecione uma data para o atendimento:</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {availableDates.map((date) => (
                <button
                  key={date}
                  className="new-order-btn"
                  onClick={() => { setSelectedDate(date); handleNext(); }}
                >
                  {new Date(date).toLocaleDateString("pt-BR")}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="requirements-card">
            <h3>Qual funcionário você prefere que te atenda?</h3>
            {loadingFuncionarios && <p>Carregando funcionários...</p>}
            {erroFuncionarios && <p>{erroFuncionarios}</p>}
            {!loadingFuncionarios && !erroFuncionarios && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {funcionarios.map((emp) => (
                  <button
                    key={emp.id}
                    className="new-order-btn"
                    onClick={() => { setSelectedFuncionario(emp.id); handleNext(); }}
                  >
                    {emp.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="requirements-card">
            <h3>Confirme seu pedido de atendimento</h3>
            <p><strong>Dispositivo:</strong> {deviceType}</p>
            <p><strong>Problema:</strong> {problemDescription}</p>
            <p><strong>Data:</strong> {selectedDate}</p>
            <p><strong>Funcionário:</strong> {funcionarios.find((e) => e.id === selectedFuncionario)?.nome}</p>
            <button className="new-order-btn" onClick={handleSubmit} style={{ marginTop: 12 }}>
              Enviar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
