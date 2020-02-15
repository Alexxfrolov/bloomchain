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
    get("/publications", Admin.HomeController, :index)
    get("/publications/:id", Admin.HomeController, :index)
    get("/dictionaries", Admin.HomeController, :index)
    get("/dictionaries/:id", Admin.HomeController, :index)
    get("/management", Admin.HomeController, :index)
    get("/management/:id", Admin.HomeController, :index)
  end

  scope "/", BloomchainWeb do
    pipe_through(:browser)
    resources("/session", SessionController, only: [:create, :new, :delete])

    get("/", PageController, :index)

    # get("/newsfeed", PageController, :newsfeed)
    # get("/detailed", PageController, :detailed)
    # get("/analysis", PageController, :analysis)
    # get("/people", PageController, :people)
    # get("/in-russia", PageController, :in_russia)
    # get("/calendar", PageController, :calendar)
    # get("/research", PageController, :research)

    resources("/newsfeed", NewsfeedController, only: [:index, :show])
    resources("/detailed", DetailedController, only: [:index, :show])
    resources("/analysis", AnalysisController, only: [:index, :show])
    resources("/people", PersonController, only: [:index, :show])
    resources("/in-russia", InRussiaController, only: [:index, :show])
    resources("/calendar", CalendarController, only: [:index, :show])
    resources("/research", ResearchController, only: [:index, :show])
  end
end
