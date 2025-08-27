"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signout(router:any) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();

  const { data: { user } } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  console.log("usuario depois do logour>:", user)
  redirect("/");

}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
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

// export async function SalvarCandidato(formData: FormData) {
//   const supabase = await createClient();



//   const data = {
//     nome: Users.user_metadata.full_name,
//     email: formData.get("email") as string,
//     performance: formData.get("performance") as string,
//     energia: formData.get("energia") as string,
//     cultura: formData.get("cultura") as string,
//     score_final: formData.get("score_final") as string,
//   };
//   const { error } = await supabase.from("candidatos").insert([data]);

//   if (error) {
//     console.log(error);
//     redirect("/error");
//   }

// }

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
    // qualquer erro inesperado (não "not found")
    console.error("Erro ao verificar respostas:", error);
    throw error;
  }

  return !!data; // true se já respondeu, false se não
}

