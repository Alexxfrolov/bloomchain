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

  pipeline :sign_in do
    plug(:put_layout, {BloomchainWeb.LayoutView, :sign_in})
  end

  pipeline :api do
    plug(:accepts, ["json", "multipart/form-data"])
  end

  scope "/admin", BloomchainWeb, as: :admin do
    pipe_through([:browser, :admin])

    get("/", Admin.HomeController, :index)
    get("/*path", Admin.HomeController, :index)
  end

  scope "/session", BloomchainWeb do
    pipe_through([:browser, :sign_in])

    resources("/", SessionController, only: [:create, :new, :delete])
  end

  scope "/", BloomchainWeb do
    pipe_through(:browser)

    get("/", PageController, :index)

    resources("/newsfeed", NewsfeedController, only: [:index, :show])
    resources("/detailed", DetailedController, only: [:index, :show])
    resources("/analysis", AnalysisController, only: [:index, :show])
    resources("/people", PersonController, only: [:index, :show])
    resources("/in-russia", InRussiaController, only: [:index, :show])
    resources("/calendar", CalendarController, only: [:index, :show])
    resources("/research", ResearchController, only: [:index, :show])
  end

  scope "/api/v1", BloomchainWeb, as: :api do
    pipe_through [:api]

    resources("/article", Api.V1.ArticleController)
  end
end
