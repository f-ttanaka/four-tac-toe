import GameBoard from "@/components/game/board";
import useGameState from "@/hooks/game/websocket";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

const WaitingScreen = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">対戦待機中...</h1>
      <p className="text-lg mb-2">{name} が参加しました</p>
      <p className="text-lg mb-4">対戦相手を待っています...</p>
      <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
    </div>
  );
};

export const Route = createFileRoute("/waiting")({
  component: Waiting,
});

function Waiting() {
  const { status } = useGameState();

  return status === "Game Start!" ? (
    <GameBoard />
  ) : (
    <WaitingScreen name="Player" />
  );
}
