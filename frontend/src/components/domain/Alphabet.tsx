import "./Alphabet.css";

interface AlphabetProps {
  onLetterClick?: (letter: string) => void;
}

export default function Alphabet({ onLetterClick }: AlphabetProps) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <nav className="alphabet-nav">
      {letters.map((letter) => (
        <button
          key={letter}
          className="alphabet-letter"
          onClick={() => onLetterClick?.(letter)}
        >
          {letter}
        </button>
      ))}
      <button
        className="alphabet-letter alphabet-all"
        onClick={() => onLetterClick?.("#")}
      >
        # TODOS
      </button>
    </nav>
  );
}
