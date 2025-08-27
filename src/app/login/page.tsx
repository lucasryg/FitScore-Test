import Head from 'next/head';
import { login, signup } from './actions'
import { useState } from 'react';
export default function LoginPage() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <Head>
                <title>Identificação - FitScore</title>
                <meta name="description" content="Identifique-se para acessar o formulário FitScore" />
            </Head>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <header className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        FITSCORE
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
                        Copiloto de Contratação e People Analytics com IA
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10">
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-xl"></div>
                            <div className="relative bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-blue-500/30">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-700/40 mb-4 md:mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Por que se identificar?</h2>
                                    <p className="text-blue-200 mb-4 text-sm md:text-base">
                                        Sua identificação nos ajuda a personalizar a experiência e garantir que seus dados sejam salvos corretamente.
                                    </p>
                                    <ul className="text-left text-blue-200 space-y-2 text-sm md:text-base">
                                        <li className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Seus dados são mantidos em total confidencialidade</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Receba relatórios personalizados com seus resultados</span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Volte a qualquer momento para revisar suas respostas</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center w-full">
                        <div className="w-full max-w-md">
                            <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/30 shadow-xl">
                                <div className="absolute -inset-4 bg-purple-500/10 rounded-2xl blur-xl"></div>
                                <div className="relative">
                                    <div className="text-center mb-6 md:mb-8">
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">Para continuar, identifique-se</h2>
                                        <p className="text-gray-400 text-sm md:text-base">Preencha seus dados para acessar o formulário</p>
                                    </div>

                                    <form action={login} className="space-y-4 md:space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                Digite seu nome
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={nome}
                                                    onChange={(e) => setNome(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 md:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 text-sm md:text-base"
                                                    placeholder="Seu nome completo"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                Digite seu e-mail
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2 md:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 text-sm md:text-base"
                                                    placeholder="seu.email@exemplo.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2 md:pt-4">
                                            <button
                                                type="submit"
                                                className="w-full py-2 md:py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 shadow-lg hover:shadow-blue-500/20 text-sm md:text-base"
                                            >
                                                Continuar
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-4 md:mt-6 text-center">
                                        <p className="text-xs md:text-sm text-gray-500">
                                            Seus dados estão protegidos e serão utilizados apenas para personalizar sua experiência. 
                                       </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // <form>
    //   <label htmlFor="email">Email:</label>
    //   <input id="email" name="email" type="email" required />
    //   <label htmlFor="password">Password:</label>
    //   <input id="password" name="password" type="password" required />
    //   <button formAction={login}>Log in</button>
    //   <button formAction={signup}>Sign up</button>
    // 
}