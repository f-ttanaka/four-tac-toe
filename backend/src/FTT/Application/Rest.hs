{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}

module FTT.Application.Rest (apiApp) where

import FTT.Prelude
import Servant

type API = "hello" :> Get '[PlainText] String

apiServer :: Server API
apiServer = return "Hello, world!"

apiRoutes :: Proxy API
apiRoutes = Proxy

apiApp :: Application
apiApp = serve apiRoutes apiServer
