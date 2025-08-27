"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence, motion } from "motion/react";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(Boolean);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  
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


  if (user) {
    return (
      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          setUser(null); // força o estado local
          router.push("/"); // redireciona pra home
        }}
      >
        Log out
      </Button>
    );
  }


  return (

    <div >
    
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Login
      </Button>

      
      <AnimatePresence>
        {isOpen && (
          <>
        
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

         
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed z-50 w-[90%] max-w-md rounded-2xl p-8 shadow-2xl
                        bg-white/10 backdrop-blur-xl border border-white/20
                        text-white"
            >
          
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-300 hover:text-white text-lg"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">Acesse sua conta</h2>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/90 hover:bg-white rounded-lg font-medium text-black transition-all duration-200" >
                Faça login com Google <img src="/google-logo.png" alt="Google Logo" className="w-5 h-5" />
              </button>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>

  );
};

export default LoginButton;
