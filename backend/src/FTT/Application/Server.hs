module FTT.Application.Server (runServer) where

import FTT.Application.Rest
import FTT.Application.WebSocket
import FTT.Prelude
import Network.Wai.Handler.Warp (run)
import Network.Wai.Handler.WebSockets (websocketsOr)
import Network.WebSockets hiding (runServer)

-- サーバー起動
runServer :: IO ()
runServer = do
  playerState <- newTVarIO ([], 0)
  putStrLn "Server running on http://localhost:8080"
  run 8080 $ websocketsOr defaultConnectionOptions (wsApp playerState) apiApp
