#FitScore - MVP

🎯 Objetivo
Criar um MVP do FitScore para testar os meus conhecimentos e participar do processo seletivo da empresa.

🛠️ Tecnologias Utilizadas
Next.js - Framework React para aplicações web

Tailwind CSS - Framework CSS para estilização

Supabase - Plataforma backend como serviço (BaaS)

✨ Funcionalidades Principais

🔐 Autenticação com Google
Integração com OAuth do Google para login simplificado

📊 Sistema de Avaliação

Questionário com 10 perguntas divididas em três categorias:

Performance (3 perguntas)

Energia (3 perguntas)

Cultura (4 perguntas)

🧮 Cálculo do FitScore

Pesos de Cada Bloco:

Performance = 30%

Energia = 30%

Cultura = 40%

Fórmula - Ponderada por Blocos:
text
FitScore = (PerformancePoints × 0.3) + (EnergiaPoints × 0.3) + (CulturaPoints × 0.4)
Detalhamento do Cálculo:
Cada resposta é avaliada em uma escala de 1 a 5 pontos

As pontuações de cada bloco são somadas e normalizadas para uma escala de 100 pontos

Aplica-se a ponderação de cada bloco conforme os pesos definidos

O resultado final é um score entre 0-100 que representa o fit do candidato

🚀 Como Executar
Clone o repositório

bash
git clone [url-do-repositorio]
cd fitscore-mvp
Instale as dependências

bash
npm install
Configure as variáveis de ambiente

bash
cp .env.local.example .env.local
Edite o arquivo .env.local com suas configurações do Supabase e Google OAuth.

Execute o servidor de desenvolvimento

bash
npm run dev
Acesse a aplicação
Abra http://localhost:3000 no seu navegador.

📊 Fluxo de Uso
Usuário faz login com sua conta Google

Acessa o formulário de avaliação

Responde 10 perguntas divididas em três categorias

Sistema calcula o FitScore com base nas respostas

Resultado é exibido no dashboard com análise detalhada

Dados são armazenados no Supabase para consultas na tela de dashboard.

