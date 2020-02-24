import decamelize from "decamelize"
import { httpConfig } from "@features/core"

function get(page?: number): Promise<{ data: import("./types").Tag[] }> {
  // return fetch(`${httpConfig.baseUrl}/tags?page=${page}`, {
  //   method: "GET",
  //   mode: "cors",
  //   cache: "no-cache",
  //   credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  return Promise.resolve({
    data: [
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "рынок",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "биткоин",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "фыв",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "21313",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "аа",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
      {
        updatedAt: "2020-02-23T10:14:51.077699",
        slug: "kripto",
        name: "криптовалюта",
        createdAt: "2020-02-23T10:14:51.071026",
        id: 1,
      },
    ],
  })
}

function create(tag: import("./types").Tag) {
  const formData = new FormData()
  Object.keys(tag).forEach((key) => formData.append(decamelize(key), tag[key]))

  return fetch(`${httpConfig.baseUrl}/tags`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })
}

function update(id: number) {
  return fetch(`${httpConfig.baseUrl}/tags/${id}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const tagsAPI = {
  get,
  create,
  update,
}
