import axois, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Subscriber } from "./types"

function getLatest(): AxiosPromise<{ data: Subscriber[] }> {
  return axois.get(`${httpConfig.baseUrl}/subscribers`)
}

export const subscribersAPI = {
  getLatest,
}
