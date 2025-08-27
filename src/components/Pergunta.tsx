type PerguntaProps = {
    pergunta: string;
    value: number;
    onChange: (val: number) => void;
}

export default function Pergunta({ pergunta, value, onChange }: PerguntaProps) {
    return (
        <div className="mb-4">
            <p className="mb-2 font-medium">{pergunta}</p>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((opt) => (
                    <button
                        key={opt}
                        className={`px-3 py-1 rounded-lg border
                        ${value === opt} ? "bg-blue-500 text-white: bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => onChange(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}