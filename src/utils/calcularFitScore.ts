export type Scores = {
    performance: number[];
    energia: number[];
    cultura: number[];
}

export function calcularFitScore(scores: Scores): number {

    const normalizar = (arr: number[]) => {
        const soma = arr.reduce((acc, val) => acc + val, 0);
        const max = arr.length * 5;
        return (soma / max) * 100;
    };

    const perf = normalizar(scores.performance);
    const ener = normalizar(scores.energia);
    const cult = normalizar(scores.cultura);

    let scoreFinal = (perf * 0.4) + (ener * 0.3) + (cult * 0.3);

    const responstas = [...scores.performance, ...scores.energia, ...scores.cultura];

    const respostasNeutras = responstas.filter(r => r === 3).length;

    if (respostasNeutras > 4) {
        scoreFinal -= 10;
    }

    return Math.max(0, Math.round(scoreFinal));
}