defmodule BloomchainWeb.Admin.Api.V1.MediaController do
  use BloomchainWeb, :controller

  alias Bloomchain.{Repo, Content.Media}
  alias BloomchainWeb.ErrorView

  def index(conn, %{"type" => type}) do
    media = Media.list_all(type)

    render(conn, "index.json", media: media)
  end

  def index(conn, _params) do
    media = Repo.all(Media)

    render(conn, "index.json", media: media)
  end

  def create(conn, %{"image" => %Plug.Upload{content_type: _, filename: _, path: _}} = params) do
    Media.create_changeset(
      %Media{},
      Map.merge(params, %{"file" => params["image"], "type" => "image"})
    )
    |> do_create(conn)
  end

  def create(conn, %{"pdf" => %Plug.Upload{content_type: _, filename: _, path: _}} = params) do
    Media.create_changeset(
      %Media{},
      Map.merge(params, %{"file" => params["pdf"], "type" => "pdf"})
    )
    |> do_create(conn)
  end

  def delete(conn, %{"id" => id}) do
    with media = %Media{} <- Repo.get(Media, id) do
      Repo.delete!(media)

      conn
      |> send_resp(:no_content, "")
    else
      nil ->
        conn
        |> put_status(404)
        |> render(ErrorView, "404.json", error: "Not found")
    end
  end

  defp do_create(changeset, conn) do
    with {:ok, media} <- Repo.insert(changeset) do
      conn
      |> put_status(201)
      |> render("show.json", media: media)
    else
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(ErrorView, "422.json", %{changeset: changeset})
    end
  end
end
