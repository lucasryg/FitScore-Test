"use client";
import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "@/components/UserGreetText";
import { ClipboardCheck, BarChart3 } from "lucide-react";
import LightRays from "../../ReactBits/LightRays/LightRays";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Home() {

  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3609EC"
          raysSpeed={0.4}
          lightSpread={5.0}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">

        <div className="z-10 w-full max-w-7xl flex items-center justify-between font-mono text-sm">
          <UserGreetText />
          <LoginButton />
        </div>


        <h1 className="text-5xl font-extrabold mb-6 text-amber-50 tracking-tight">
          Bem-vindo ao <span className="text-blue-400">FitScore</span>
        </h1>
        <p className="mb-8 text-lg text-gray-300 max-w-xl">
          Transforme avaliações de candidatos em <span className="text-blue-400">insights claros</span>.<br />
          Crie testes rápidos e acompanhe resultados em tempo real.
        </p>


        <div className="flex gap-8 mb-10 text-gray-300">
          <div className="flex flex-col items-center">
            <ClipboardCheck className="h-10 w-10 text-blue-400 mb-2" />
            <span className="text-sm">Formulário simples</span>
          </div>
          {user ? (
            <div className="flex flex-col items-center">
              <BarChart3 className="h-10 w-10 text-purple-400 mb-2" />
              <a href="/dashboard" className="text-sm">Dashboard intuitivo</a>
            </div>
          )
            : (
              <div className="flex flex-col items-center">
                <BarChart3 className="h-10 w-10 text-purple-400 mb-2" />
                <span className="text-sm">Dashboard intuitivo</span>
              </div>
            )}

        </div>


        <div className="flex gap-4">
          {user ? (
            <a
              href="/resultados"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-semibold rounded-xl shadow-lg transition"
            >
              🚀 Faça o teste!
            </a>
          ) : (
            <button
              disabled
              className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-xl shadow-lg cursor-not-allowed"
            >
              🔒 Faça login para continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
