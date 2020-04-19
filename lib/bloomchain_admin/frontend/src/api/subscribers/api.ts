import axois, { AxiosPromise } from "axios"
import { httpConfig } from "@features/core"

import { Subscriber } from "./types"

function get(): AxiosPromise<{ data: Subscriber[] }> {
  return axois.get(`${httpConfig.baseUrl}/subscribers`)
}

export const subscribersAPI = {
  get,
}
