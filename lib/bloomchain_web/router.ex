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

  pipeline :customer do
    plug(BloomchainWeb.Plug.Redirect)
    plug(BloomchainWeb.Plug.SetSectionData)
  end

  pipeline :admin do
    plug(BloomchainWeb.Plug.Authentication)
    plug(BloomchainWeb.Plug.EnsureAuthentication)
    plug(:put_layout, {BloomchainWeb.LayoutView, :admin})
  end

  pipeline :sign_in do
    plug(:put_layout, {BloomchainWeb.LayoutView, :sign_in})
  end

  pipeline :api do
    plug(:accepts, ["json", "multipart/form-data"])
  end

  pipeline :xml do
    plug(:accepts, ["xml"])
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
      resources("/sections", Admin.Api.V1.SectionController)
      resources("/redirects", Admin.Api.V1.RedirectController)
      resources("/banners", Admin.Api.V1.BannerController)
    end

    scope "/preview" do
      pipe_through [:customer]

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

  scope "/api", BloomchainWeb do
    pipe_through [:api]

    resources("/index", Api.IndexController, only: [:index])
    resources("/subscription", Api.SubscriptionController, only: [:create])
    resources("/events", Api.EventController, only: [:create])
  end

  scope "/", BloomchainWeb do
    pipe_through([:xml])

    get("/feed", FeedController, :index)
    get("/:type/feed", FeedController, :show)
  end

  scope "/", BloomchainWeb do
    pipe_through([:browser, :customer])

    get("/", PageController, :index)

    get("/search", SearchController, :index)
    get("/tag/:slug", TagController, :show)

    get("/:type/:slug", ArticleController, :show)
    get("/:type", SectionController, :index)
  end
end
