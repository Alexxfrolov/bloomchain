defmodule BloomchainWeb.Router do
  use BloomchainWeb, :router

  use Plug.ErrorHandler
  use Sentry.Plug


  pipeline :browser do
    plug(:accepts, ["html"])
    plug :fetch_session
    plug(:fetch_flash)
    # plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :admin do
    plug(Bloomchain.Plug.Authentication)
    plug(Bloomchain.Plug.EnsureAuthentication)
    plug(:put_layout, {BloomchainWeb.LayoutView, :admin})
  end

  pipeline :sign_in do
    plug(:put_layout, {BloomchainWeb.LayoutView, :sign_in})
  end

  pipeline :api do
    plug(:accepts, ["json", "multipart/form-data"])
  end

  pipeline :xml do
    plug(:accepts, ["text/xml"])
    plug(:put_layout, false)
  end

  scope "/admin", BloomchainWeb, as: :admin do
    pipe_through([:browser, :admin])

    get("/", Admin.HomeController, :index)

    scope "/api/v1" do
      pipe_through [:api]

      get("/articles/search", Admin.Api.V1.ArticleController, :search)
      resources("/articles", Admin.Api.V1.ArticleController)

      get "/users/current", Admin.Api.V1.UserController, :current
      resources("/users", Admin.Api.V1.UserController)

      resources("/tags", Admin.Api.V1.TagController)
      resources("/media", Admin.Api.V1.MediaController)
      resources("/subscribers", Admin.Api.V1.SubscriberController, only: [:index])
      resources("/archives", Admin.Api.V1.ArchiveController)
      resources("/authors", Admin.Api.V1.AuthorController)
    end

    scope "/preview" do
      get "/articles/:type/:slug", Admin.Preview.ArticleController, :show
    end

    get("/*path", Admin.HomeController, :index)
  end

  scope "/session", BloomchainWeb do
    pipe_through([:browser, :sign_in])

    delete("/", SessionController, :delete)
    resources("/", SessionController, only: [:create, :new])
  end

  get("/sitemap.xml", BloomchainWeb.SitemapController, :index)

  scope "/sitemap", BloomchainWeb do
    pipe_through([:xml])

    resources("/", SitemapController, only: [:show], param: "property")
  end

  scope "/", BloomchainWeb do
    pipe_through(:browser)

    get("/", PageController, :index)
    post("/subscribe", PageController, :create)

    resources("/newsfeed", NewsfeedController, only: [:index, :show], param: "slug")
    resources("/detailed", DetailedController, only: [:index, :show], param: "slug")
    resources("/analysis", AnalysisController, only: [:index, :show], param: "slug")
    resources("/people", PersonController, only: [:index, :show], param: "slug")
    resources("/in-russia", InRussiaController, only: [:index, :show], param: "slug")
    resources("/calendar", CalendarController, only: [:index, :show], param: "slug")
    resources("/research", ResearchController, only: [:index, :show], param: "slug")
    resources("/research-archive", ArchiveController, only: [:index], param: "slug")
    resources("/search", SearchController, only: [:index, :create])
    resources("/tag", TagController, only: [:show], param: "tag")

    scope "/api" do
      pipe_through [:api]

      resources("/index", Api.IndexController, only: [:index])
    end
  end
end
