import axios, { AxiosPromise } from 'axios'
import { httpConfig } from "@features/core"

const getSettings = (): AxiosPromise => axios.get(`${httpConfig.baseUrl}/users/current`)

export const accountApi = {
  getSettings,
}
