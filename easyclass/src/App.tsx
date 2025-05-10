import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

interface Agendamento {
  aluno: string;
  horario: string;
}

function Home({ agendamentos, adicionarAgendamento }: {
  agendamentos: Agendamento[];
  adicionarAgendamento: (agendamento: Agendamento) => void;
}) {
  const [aluno, setAluno] = useState('');
  const [horario, setHorario] = useState('');

  const agendar = () => {
    if (aluno && horario) {
      adicionarAgendamento({ aluno, horario });
      setAluno('');
      setHorario('');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">EasyClass - Agendamento de Aulas</h1>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Nome do Aluno:</label>
        <input
          className="w-full p-2 border rounded"
          value={aluno}
          onChange={(e) => setAluno(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Horário Desejado:</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
      </div>

      <button
        onClick={agendar}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agendar Aula
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">Aulas Agendadas:</h2>
        {agendamentos.length === 0 ? (
          <p className="text-gray-500">Nenhum horário agendado ainda.</p>
        ) : (
          <ul className="list-disc ml-6">
            {agendamentos.map((ag, index) => (
              <li key={index}>
                {ag.aluno} - {new Date(ag.horario).toLocaleString('pt-BR')}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <Link to="/professor" className="text-blue-600 hover:underline">
          Acessar área do professor
        </Link>
      </div>
    </div>
  );
}

function Professor({ agendamentos }: { agendamentos: Agendamento[] }) {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Área do Professor</h1>
      <h2 className="text-lg font-semibold text-green-600 mb-2">Aulas Agendadas:</h2>
      {agendamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum horário agendado ainda.</p>
      ) : (
        <ul className="list-disc ml-6">
          {agendamentos.map((ag, index) => (
            <li key={index}>
              {ag.aluno} - {new Date(ag.horario).toLocaleString('pt-BR')}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link to="/" className="text-green-600 hover:underline">
          Voltar para página inicial
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const adicionarAgendamento = async (agendamento: Agendamento) => {
    try {
      await addDoc(collection(db, 'agendamentos'), agendamento);
    } catch (error) {
      console.error("Erro ao adicionar agendamento:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'agendamentos'), (snapshot) => {
      const agendamentosData = snapshot.docs.map((doc) => doc.data() as Agendamento);
      setAgendamentos(agendamentosData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home agendamentos={agendamentos} adicionarAgendamento={adicionarAgendamento} />}
        />
        <Route
          path="/professor"
          element={<Professor agendamentos={agendamentos} />}
        />
      </Routes>
    </Router>
  );
}
