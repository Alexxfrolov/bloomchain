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

  pipeline :admin do
    plug(Plug.Authentication)
    plug(Plug.EnsureAuthentication)
    plug(Plug.ShowSidebar)
    plug(:put_layout, {BloomchainWeb.LayoutView, :admin})
  end

  scope "/admin", BloomchainWeb, as: :admin do
    pipe_through([:browser, :admin])

    get("/", Admin.HomeController, :index)
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
