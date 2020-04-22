import { request } from "@features/core"

const getSettings = () => request("GET", "/users/current")

export const accountApi = {
  getSettings,
}
