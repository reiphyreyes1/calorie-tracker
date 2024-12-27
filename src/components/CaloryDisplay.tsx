
interface Props {
    calories: number
    text: string
    color: string
}

export default function CaloryDisplay({ calories, text, color }: Props) {

    return (
        <p className="font-bold text-white rounded-full grid grid-cols-1 gap-3 text-center">
            <span className={`font-black text-6xl ${color}`}>{calories}</span>
            {text}
        </p>
    )
}
