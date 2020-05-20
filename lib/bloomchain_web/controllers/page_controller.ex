defmodule BloomchainWeb.PageController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Subscriber, Content.Article}

  def index(conn, _params) do
    context = %{
      detailed: Article.get_published_posts("detailed", limit: 3),
      newsfeed: Article.get_published_posts("newsfeed", limit: 7),
      analysis: Article.get_published_posts("analysis", limit: 3),
      in_russia: Article.get_published_posts("in-russia", limit: 3),
      calendar: Article.get_published_posts("calendar", limit: 3),
      research: Article.get_published_posts("research", limit: 3)
    }

    render(conn, "index.html", context: context)
  end

  def create(conn, params) do
    changeset = Subscriber.changeset(%Subscriber{}, params)

    with {:ok, _} <- Repo.insert(changeset) do
      conn
      |> put_flash(
        :subscription_success,
        "Вы успешно подписались на рассылку. Спасибо, что читаете Bloomchain!"
      )
      |> redirect(to: redirect_back(conn))
    else
      {:error, _} ->
        conn
        |> put_flash(
          :subscription_error,
          "Ваш адрес был зарегистрирован ранее. Спасибо, что читаете Bloomchain!"
        )
        |> put_flash(:subscription_email, params[:email])
        |> redirect(to: redirect_back(conn))
    end
  end

  def redirect_back(conn, alternative \\ "/") do
    path =
      conn
      |> get_req_header("referer")
      |> referrer

    path || alternative
  end

  defp referrer([]), do: nil
  defp referrer([h | _]), do: h |> String.replace(BloomchainWeb.Endpoint.url(), "")
end
