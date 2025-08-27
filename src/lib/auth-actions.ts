"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}

export async function salvarResultado(fitScore: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("candidatos").insert({
    user_id: user.id,
    email: user.email,
    nome: user.user_metadata.full_name,
    score: fitScore,
  });

  if (error) console.error(error);
}

export async function verificarSeJaRespondeu(email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("respostas")
    .select("id")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Erro ao verificar respostas:", error);
    throw error;
  }

  return !!data;
}

