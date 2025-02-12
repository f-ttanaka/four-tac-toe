import { createFileRoute } from "@tanstack/react-router";
import GameBoard from "@/components/game/board";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GameBoard />;
}
