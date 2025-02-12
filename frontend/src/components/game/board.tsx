import { useState } from "react";

type Player = "O" | "X";

type SquareProps = {
  value: Player | null;
  onClick: () => void;
};

function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="w-24 h-24 flex justify-center items-center text-4xl font-bold border border-gray-700 cursor-pointer transition-all hover:bg-gray-200"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function GameBoard() {
  const [squares, setSquares] = useState<(Player | null)[]>(
    Array(9).fill(null)
  );
  const [player, setPlayer] = useState<Player>("O");

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => {
              setSquares((prev) =>
                prev.map((p, j) => (j == i && p == null ? player : p))
              );
              // set next player
              setPlayer(player == "O" ? "X" : "O");
            }}
          />
        ))}
      </div>
      <div className="mt-4 text-lg">Next player: {player}</div>
    </div>
  );
}
