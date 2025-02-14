import { createFileRoute } from "@tanstack/react-router";
import GameBoard from "@/components/game/board";
import useGameState from "@/hooks/game/websocket";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Start,
});

function Start() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-700">
      <motion.div
        className="text-center bg-white p-10 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tic-Tac-Toe</h1>
        <p className="text-gray-600 mb-6">友達とオンラインで対戦しよう！</p>
        <motion.button
          onClick={() => navigate({ to: "/waiting" })}
          className="px-6 py-3 text-lg hover:cursor-pointer font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ゲームを始める
        </motion.button>
      </motion.div>
    </div>
  );
}

// function Game() {
//   const { status, socket, handleSendMessage } = useGameState();
//   return (
//     <div>
//       <h1>WebSocket Client</h1>
//       <p>Status: {status}</p>
//       <button
//         onClick={handleSendMessage}
//         disabled={socket?.readyState !== WebSocket.OPEN}
//       >
//         Send Ready Signal
//       </button>
//     </div>
//   );
//   // <WaitingScreen />;
//   // <GameBoard />;
// }
