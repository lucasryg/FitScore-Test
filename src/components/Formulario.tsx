"use client";

import { useEffect, useState } from "react";
import { calcularFitScore } from "@/utils/calcularFitScore";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Head from "next/head";
import { classificarFitScore } from "@/utils/classificarFitScore";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export type Scores = {
    performance: number[];
    energia: number[];
    cultura: number[];
};

type Pergunta = {
    categoria: keyof Scores;
    texto: string;
};

const perguntas: Pergunta[] = [
    { categoria: "performance", texto: "Qual é o seu nível de experiência em desenvolvimento de software?" },
    { categoria: "performance", texto: "Quão bem você lida com prazos apertados e situações de pressão?" },
    { categoria: "performance", texto: "Qual seu nível de domínio em trabalhar com times multidisciplinares?" },
    { categoria: "energia", texto: "Como você avalia sua capacidade de manter o foco em tarefas longas?" },
    { categoria: "energia", texto: "Quantas horas semanais você tem disponível para se dedicar ao trabalho?" },
    { categoria: "energia", texto: "Como você classifica sua organização pessoal para cumprir prazos?" },
    { categoria: "cultura", texto: "Quão aberto você é para receber e aplicar feedbacks construtivos?" },
    { categoria: "cultura", texto: "Com que frequência você compartilha conhecimentos com colegas?" },
    { categoria: "cultura", texto: "O quanto você se adapta às mudanças de prioridade em um projeto?" },
    { categoria: "cultura", texto: "Você se identifica com valores de colaboração e respeito no ambiente de trabalho?" },
];

export default function FitScoreForm() {
    const [user, setUser] = useState<any>(null);
    const [fase, setFase] = useState<"" | "perguntas" | "resultado">("perguntas");
    const [respostas, setRespostas] = useState<Scores>({
        performance: [],
        energia: [],
        cultura: [],
    });

    const [atual, setAtual] = useState(0);
    const [scoreFinal, setScoreFinal] = useState<number | null>(null);
    const [classificacao, setClassificacao] = useState("");

    const handleResponder = (valor: number) => {
        const pergunta = perguntas[atual];
        const novasRespostas = { ...respostas };
        novasRespostas[pergunta.categoria] = [
            ...novasRespostas[pergunta.categoria],
            valor,
        ];
        setRespostas(novasRespostas);

        if (atual < perguntas.length - 1) {
            setAtual(atual + 1);
        } else {
            const resultado = calcularFitScore(novasRespostas);
            setClassificacao(classificarFitScore(resultado))

            setScoreFinal(resultado);

            setFase("resultado");
        }
    };

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    const handleSubmit = async () => {
        if (!user) {
            alert("Você precisa estar logado com Google!");
            return;
        }

        const candidato = {
            nome: user.user_metadata.full_name,
            email: user.email,
            score: scoreFinal,
            classificacao: classificacao,
            created_at: new Date().toISOString()
        };

        const { error } = await supabase.from("candidatos").insert(candidato);

        if (error) console.error(error);
        else alert("Respostas salvas com sucesso!");
        redirect("/");
    };


    if (fase === "perguntas") {
        const progresso = Math.round(((atual) / perguntas.length) * 100);
        const perguntaAtual = perguntas[atual];

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <header className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            FITSCORE
                        </h1>
                        <p className="text-blue-200">Questionário de Avaliação</p>
                    </header>


                    <div className="mb-6 md:mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-blue-300">Progresso</span>
                            <span className="text-sm text-blue-300">{progresso}% concluído</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progresso}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-xl mb-6">
                        <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-xl mb-6 transition-all duration-500">
                            <div className="absolute -inset-4 bg-purple-500/10 rounded-2xl blur-xl"></div>
                            <div className="relative text-center">
                                <span className="inline-block px-3 py-1 text-xs bg-blue-800/40 text-blue-300 rounded-full mb-4">
                                    Pergunta {atual + 1} de {perguntas.length} • {perguntaAtual.categoria}
                                </span>

                                <h2 className="text-lg md:text-xl font-bold mb-4">{perguntaAtual.texto}</h2>
                                <p className="text-gray-400 text-sm mb-6">Selecione de 1 a 5:</p>

                                <div className="flex justify-between mb-6 md:mb-8">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleResponder(value)}
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300
            ${respostas[perguntaAtual.categoria].includes(value)
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110"
                                                    : "bg-gray-800 hover:bg-gray-700 hover:scale-110"
                                                }`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-center text-sm text-gray-400 mb-2">
                                <p>1 = Muito Insatisfeito | 5 = Muito Satisfeito</p>
                            </div>

                        <div className="grid grid-cols-5 gap-2 text-center text-xs text-gray-400 mb-6">
                            <div>Mínimo</div>
                            <div>Baixo</div>
                            <div>Neutro</div>
                            <div>Alto</div>
                            <div>Máximo</div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-blue-300">
                    <p>Esta avaliação nos ajuda a entender melhor suas habilidades e experiência.</p>
                    <p>Seja honesto em suas respostas - não há respostas certas ou erradas.</p>
                </div>
            </div>
            </div >
        );
    }

    if (fase === "resultado" && scoreFinal !== null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md">

                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            FITSCORE
                        </h1>
                        <p className="text-blue-200">Resultado da Avaliação</p>
                    </header>


                    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-xl">
                        <div className="absolute -inset-4 bg-purple-500/10 rounded-2xl blur-xl"></div>
                        <div className="relative text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold mb-4">Avaliação Concluída! 🎉</h2>
                            <p className="text-lg mb-2">Obrigado, <span className="text-blue-300">{user.user_metadata.full_name}</span>!</p>

                            <div className="my-6">
                                <p className="text-sm text-gray-400 mb-2">Seu FitScore é:</p>
                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                                    {scoreFinal}
                                </div>
                                <p className="text-xs text-gray-400 mt-2">de 100 pontos possíveis</p>
                            </div>

                            <div className="my-6">
                                <p className="text-sm text-gray-400 mb-2">Sua Classificação é:</p>
                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                                    {classificacao}
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm mb-6">
                                Em breve você receberá um relatório detalhado no e-mail <span className="text-blue-300">{user.email}</span>
                            </p>

                            <button
                                onClick={() => {
                                    handleSubmit();
                                    setAtual(0);
                                    setRespostas({ performance: [], energia: [], cultura: [] });
                                    setScoreFinal(null);
                                }}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-white transition-all duration-200"
                            >
                                Voltar para o início;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

