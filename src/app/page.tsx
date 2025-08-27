import LightRays from "../../ReactBits/LightRays/LightRays";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Fundo com efeito */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3609EC"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-amber-50">Bem-vindo ao FitScore</h1>
        <p className="mb-6 text-gray-400 max-w-lg">
          Avalie candidatos através de um formulário simples e veja os resultados no dashboard.
        </p>
        <div className="flex gap-4">
          <a
            href="/formulario"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
          >
            Formulário
          </a>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
