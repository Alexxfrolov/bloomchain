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
        ],
      },
      {
        name: "management",
        path: "/management",
        children: [
          {
            name: "users",
            path: "/users",
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
        ],
      },
      {
        name: "dictionaries",
        path: "/dictionaries",
        children: [
          {
            name: "authors",
            path: "/authors",
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
        ],
      },
      {
        name: "account",
        path: "/account",
      },
    ],
  },
]
