import { Route } from "router5"

export const routes: Route[] = [
  {
    name: "admin",
    path: "/admin",
    children: [
      {
        name: "articles",
        path: "/articles",
        children: [
          {
            name: "draft",
            path: "/draft",
          },
          {
            name: "ready",
            path: "/ready",
          },
          {
            name: "published",
            path: "/published",
          },
          {
            name: "archive",
            path: "/archive",
          },
          {
            name: "edit",
            path: "/edit/:id",
          },
        ],
      },
      {
        name: "users",
        path: "/users",
      },
      {
        name: "subscribers",
        path: "/subscribers",
      },
      {
        name: "tags",
        path: "/tags",
        children: [
          {
            name: "create",
            path: "/create",
          },
          {
            name: "edit",
            path: "/edit",
          },
        ],
      },
      {
        name: "media",
        path: "/media",
      },
      {
        name: "archives",
        path: "/archives",
      },
      {
        name: "account",
        path: "/account",
      },
    ],
  },
]
