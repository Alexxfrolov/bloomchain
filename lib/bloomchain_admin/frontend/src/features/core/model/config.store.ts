import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { Router } from "router5"
import { router5Middleware } from "redux-router5"

import { createRootReducer } from "./core.model"

type ConfigureStoreOptions = {
  router: Router
  initialState?: {}
}

export function configureStore({ router, initialState = {} }: ConfigureStoreOptions) {
  const middlewares = [thunkMiddleware, router5Middleware(router)]

  const rootReducer = createRootReducer()

  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  if (module.hot) {
    module.hot.accept("./core.model", async () => {
      const next = await import("./core.model")

      store.replaceReducer(next.createRootReducer())
    })
  }

  return store
}
