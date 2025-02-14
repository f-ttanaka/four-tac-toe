module FTT.Application.WebSocket (wsApp) where

import Control.Concurrent
import Control.Exception
import FTT.Prelude
import Network.WebSockets

type PlayerState = TVar ([(Connection, Int)], Int)

wsApp :: PlayerState -> ServerApp
wsApp ps pending = do
  conn <- acceptRequest pending -- クライアントを受け入れる
  liftIO $ putStrLn "Player connected"
  -- Atomically TVar を更新
  pId <- joinGame conn ps
  flip finally (disconnect pId) $ do
    msg <- receiveData conn :: IO Text
    print msg
  where
    disconnect :: Int -> IO ()
    disconnect i = do
      atomically $ modifyTVar' ps (first $ filter (\(_, j) -> j /= i))
      putStrLn $ "disconnected: " ++ show i

joinGame :: Connection -> PlayerState -> IO Int
joinGame conn playerState = do
  (players, pId) <- atomically $ do
    (conns, i) <- readTVar playerState
    let newConns = (conn, i) : conns
    writeTVar playerState (newConns, i + 1)
    return (newConns, i)
  case length players of
    1 -> do
      putStrLn "Waiting for another player..."
      sendTextData conn ("Waiting for another player..." :: Text)
    2 -> do
      putStrLn "Game Start!"
      forM_ [p | (p, _) <- players] (`sendTextData` ("Game Start!" :: Text))
    _ -> do
      putStrLn "More than 2 players connected (ignoring additional players)"
      sendTextData conn ("Room full" :: Text)
  putStrLn $ "current num: " ++ show pId
  return pId
