import { Route } from "router5"

//TODO: add canActive for the admin routes
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
        name: "authors",
        path: "/authors",
      },
      {
        name: "tags",
        path: "/tags",
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
