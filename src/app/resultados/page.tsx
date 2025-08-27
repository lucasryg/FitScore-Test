"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Resposta = {
    id: string;
    email: string;
    nome: string;
    score: number;
    classificacao: string;
    respostas: Record<string, number>;
};

export default function ResultadosPage() {
    const [resposta, setResposta] = useState<Resposta | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        const fetchResultados = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                window.location.href = "/";
                return;
            }

            const { data, error } = await supabase
                .from("candidatos")
                .select("*")
                .eq("email", user.email)
                .maybeSingle();

            if (error) {
                console.error("Erro ao buscar resultados:", error);
                setLoading(false);
                return;
            }

            setResposta(data as Resposta);
            setLoading(false);
        };

        fetchResultados();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-gray-600 text-lg">Carregando resultados...</p>
            </div>
        );
    }

    if (!resposta) {
        redirect("/formulario");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8">
            <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Resultado do FitScore
                </h1>

                <p className="text-xl font-semibold text-center mb-1">
                    Você so consegue fazer a avaliação uma vez.
                </p>

                <p className="text-xl font-semibold text-center mb-4">
                    Olá, {resposta.nome}! 🎉
                </p>

                <div className=" flex flex-col items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-md mb-6">
                    <p className="text-lg">Seu FitScore é:</p>
                    <div className="flex text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                        {resposta.score}
                    </div>

                    <div className="flex text-1xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                        {resposta.classificacao}
                    </div>
                    <button
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        className=" px-6 py-2 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-white transition-all duration-200"
                    >
                        Voltar para o início;
                    </button>
                </div>

            </div>
        </div>
    );
}
