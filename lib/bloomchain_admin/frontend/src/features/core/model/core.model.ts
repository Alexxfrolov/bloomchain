import { router5Reducer } from "redux-router5"
import { combineReducers } from "redux"

import { AppModel } from "../core.types"

export const createRootReducer = (): AppModel =>
  combineReducers({
    router: router5Reducer,
  })
