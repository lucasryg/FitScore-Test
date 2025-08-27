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
    <div className="relative w-full min-h-screen bg-black overflow-hidden">

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

      <div className="relative z-10 flex flex-col items-center min-h-screen text-center px-4 py-8 md:p-6">

     
        <div className="absolute top-6 left-0 right-0 z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between font-mono text-sm px-4 gap-4">
          <UserGreetText />
          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <LoginButton />
          </div>
        </div>

      
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-amber-50 tracking-tight">
            Bem-vindo ao <span className="text-blue-400">FitScore</span>
          </h1>
          
          <p className="mb-6 md:mb-8 text-base md:text-lg text-gray-300 max-w-xl px-4">
            Transforme avaliações de candidatos em <span className="text-blue-400">insights claros</span>.<br />
            Crie testes rápidos e acompanhe resultados em tempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 md:mb-10 text-gray-300">
            <div className="flex flex-col items-center">
              <ClipboardCheck className="h-8 w-8 md:h-10 md:w-10 text-blue-400 mb-2" />
              <span className="text-xs md:text-sm">Formulário simples</span>
            </div>
            
            <div className="flex flex-col items-center">
              <BarChart3 className="h-8 w-8 md:h-10 md:w-10 text-blue-400 mb-2" />
              {user ? (
                <a href="/dashboard" className="text-xs md:text-sm hover:underline">Dashboard intuitivo</a>
              ) : (
                <span className="text-xs md:text-sm">Dashboard intuitivo</span>
              )}
            </div>
          </div>

         
          <div className="flex gap-4">
            {user ? (
              <a
                href="/resultados"
                className="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-semibold rounded-xl shadow-lg transition text-sm md:text-base"
              >
                🚀 Faça o teste!
              </a>
            ) : (
              <button
                disabled
                className="px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl shadow-lg cursor-not-allowed text-sm md:text-base opacity-80"
              >
                🔒 Faça login para continuar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}