defmodule BloomchainWeb.Router do
  use BloomchainWeb, :router

  alias Bloomchain.Plug

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :authenticated do
    plug(Plug.Authentication)
    plug(Plug.EnsureAuthentication)
    plug(Plug.ShowSidebar)
  end

  scope "/admin", BloomchainWeb, as: :admin do
    pipe_through([:browser, :authenticated])
    get("/", Admin.HomeController, :index)

    resources("/post", Admin.PostController) do
      get("/publish", Admin.PostController, :publish, as: :publish)
    end
  end

  scope "/", BloomchainWeb do
    pipe_through(:browser)
    resources("/session", SessionController, only: [:create, :new, :delete])

    get("/", PageController, :index)
    get("/newsfeed", PageController, :newsfeed)
    get("/detailed", PageController, :detailed)
    get("/analysis", PageController, :analysis)
    get("/people", PageController, :people)
    get("/in-russia", PageController, :in_russia)
    get("/calendar", PageController, :calendar)
    get("/research", PageController, :research)

    resources("/newsfeed", NewsfeedController, only: [:show])
  end
end
