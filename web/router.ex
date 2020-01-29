defmodule Bloomchain.Router do
  use Bloomchain.Web, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", Bloomchain do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
    get("/newsfeed", PageController, :newsfeed)
    get("/detailed", PageController, :detailed)
    get("/analysis", PageController, :analysis)
    get("/people", PageController, :people)
    get("/in-russia", PageController, :in_russia)
    get("/calendar", PageController, :calendar)
    get("/research", PageController, :research)
  end

  # Other scopes may use custom stacks.
  # scope "/api", Bloomchain do
  #   pipe_through :api
  # end
end
