import { useState } from "react";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState("");
  const [agendamentos, setAgendamentos] = useState<string[]>([]);

  const horariosDisponiveis = [
    "Segunda - 10:00",
    "Terça - 14:00",
    "Quarta - 16:00",
    "Quinta - 09:00",
    "Sexta - 11:30",
  ];

  const agendarAula = () => {
    if (nome && email && horario) {
      setAgendamentos([...agendamentos, horario]);
      setHorario("");
      alert("Aula agendada com sucesso!");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const removerHorario = (index: number) => {
    const novos = [...agendamentos];
    novos.splice(index, 1);
    setAgendamentos(novos);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-blue-100">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          EasyClass - Agendamento de Aulas
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um horário</option>
            {horariosDisponiveis.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <button
            onClick={agendarAula}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Agendar Aula
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Aulas Agendadas:</h2>
          {agendamentos.length === 0 ? (
            <p className="text-gray-500">Nenhum horário agendado ainda.</p>
          ) : (
            <ul className="space-y-2">
              {agendamentos.map((hora, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-blue-100 rounded-lg px-4 py-2 animate-fade-in"
                >
                  <span>{hora}</span>
                  <button
                    onClick={() => removerHorario(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
