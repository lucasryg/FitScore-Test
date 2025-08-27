"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type Candidato = {
  id: number;
  nome: string;
  email: string;
  score: number;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);


  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from("candidatos").select("*");

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCandidatos(data as Candidato[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchCandidates();
  }, [user]);

  type Classification = {
    label: string;
    color: string;
    group: string;
  };

  const getClassification = (score: number): Classification => {
    if (score >= 80) {
      return { label: "Fit Altíssimo", color: "bg-green-100 text-green-700", group: "A" };
    } else if (score >= 60) {
      return { label: "Fit Aprovado", color: "bg-purple-100 text-purple-700", group: "A" };
    } else if (score >= 40) {
      return { label: "Fit Questionável", color: "bg-yellow-100 text-yellow-700", group: "B" };
    } else {
      return { label: "Fora do Perfil", color: "bg-red-100 text-red-700", group: "C" };
    }
  };

  const candidatosFiltrados = candidatos.filter((c) => {
    const classification = getClassification(c.score);
    return filter === "" || classification.group === filter;
  });

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-5xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📊 Dashboard de Candidatos
        </h1>

        {/* Filtros e ações */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <label className="font-semibold mr-2">Filtrar por classificação:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-3 py-2 rounded-md"
            >
              <option value="">Todas</option>
              <option value="A">Classificação A (Altíssimo + Aprovado)</option>
              <option value="B">Classificação B (Questionável)</option>
              <option value="C">Classificação C (Fora do Perfil)</option>
            </select>
          </div>
          <button
            onClick={fetchCandidates}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition"
          >
            🔄 Recarregar
          </button>
        </div>

        {/* Estados */}
        {loading && <p className="text-center text-gray-500">⏳ Carregando candidatos...</p>}
        {error && <p className="text-center text-red-500">❌ {error}</p>}
        {!loading && candidatos.length === 0 && (
          <p className="text-center text-gray-400">Nenhum candidato encontrado.</p>
        )}

        {/* Lista */}
        {candidatosFiltrados.length > 0 && (
          <div className="overflow-x-auto rounded-lg border shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">FitScore</th>
                  <th className="px-4 py-3 text-left">Classificação</th>
                </tr>
              </thead>
              <tbody>
                {candidatosFiltrados.map((c, idx) => {
                  const classification = getClassification(c.score);
                  return (
                    <tr
                      key={c.id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100 transition`}
                    >
                      <td className="px-4 py-2">{c.nome}</td>
                      <td className="px-4 py-2">{c.email}</td>
                      <td className="px-4 py-2 font-medium">{c.score}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-xl text-sm font-semibold ${classification.color}`}
                        >
                          {classification.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        )}
      </div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className=" px-6 mt-10 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-white transition-all duration-200"
      >
        Voltar para o início;
      </button>
    </div >

  );
}
