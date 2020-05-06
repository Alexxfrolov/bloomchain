import axios, { AxiosRequestConfig } from "axios"

type HtppMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"

export function request<T>(
  method: HtppMethod,
  url: string,
  options?: AxiosRequestConfig,
) {
  const baseUrl = "/admin/api/v1"

  return axios.request<T>({
    method,
    url,
    baseURL: options?.baseURL ?? baseUrl,
    ...options,
  })
}
