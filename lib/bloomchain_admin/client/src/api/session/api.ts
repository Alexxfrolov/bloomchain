import { request } from "@features/core"

const drop = () =>
  request("DELETE", "/session", {
    baseURL: "/",
  })

export const sessionApi = {
  drop,
}
