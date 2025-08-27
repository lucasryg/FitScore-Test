"use client";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

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

  return user ? (
    <div className="flex justify-center sm:justify-start w-full sm:w-auto">
      <p className="flex justify-center items-center border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30 px-3 py-2 text-sm">
        Olá,&nbsp;
        <code className="font-mono font-bold">
          {user.user_metadata.full_name || "usuário"}!
        </code>
      </p>
    </div>
  ) : (
    <div className="flex justify-center sm:justify-start w-full sm:w-auto">
      <p className="flex justify-center items-center border border-gray-300 text-white from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30 px-3 py-2 text-sm">
        Olá, visitante!
      </p>
    </div>
  );
};

export default UserGreetText;