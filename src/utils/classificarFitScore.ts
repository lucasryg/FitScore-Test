export function classificarFitScore(score: number): string {
  if (score >= 80) return "Fit Altíssimo";
  if (score >= 60) return "Fit Aprovado";
  if (score >= 40) return "Fit Questionável";
  return "Fora de Perfil";
}