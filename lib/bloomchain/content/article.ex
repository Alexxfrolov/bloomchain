defmodule Bloomchain.Content.Article do
  import Ecto.Query

  alias Ecto.Multi
  alias Bloomchain.Repo
  alias Bloomchain.Content.{Post, Redirect}
  alias Bloomchain.ElasticsearchCluster, as: ES

  def published_posts(type) do
    from(
      p in Post,
      where: p.type == ^type and p.status == "published",
      preload: [:cover, :authors],
      order_by: [desc: p.published_at, desc: p.id]
    )
  end

  def get!(id) do
    Repo.get!(Post, id)
    |> Repo.preload([:tags, :cover, :authors])
  end

  def get(slug, type: type) do
    Repo.get_by!(Post, slug: slug, type: type, status: "published")
    |> Repo.preload([:tags, :cover, :authors])
  end

  def create(%{} = params) do
    with {:ok, post} <- %Post{} |> Post.changeset(params) |> Repo.insert() do
      Task.async(fn -> ES.reindex(post) end)
      {:ok, post}
    else
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def update(%Post{status: "published", type: old_type} = struct, %{type: new_type} = params)
      when old_type != new_type do
    update_post_and_redirect =
      Multi.new()
      |> Multi.update(:post, Post.changeset(struct, params))
      |> Multi.insert(:redirect, Redirect.changeset(struct, params))

    case Repo.transaction(update_post_and_redirect) do
      {:ok, %{post: post, redirect: _redirect}} ->
        post = post |> Repo.preload([:tags, :cover, :authors], force: true)
        Task.async(fn -> ES.reindex(post) end)
        {:ok, post}

      {:error, :post, changeset, _} ->
        {:error, changeset}

      {:error, :redirect, changeset, _} ->
        {:error, changeset}
    end
  end

  def update(%Post{} = struct, %{} = params) do
    with {:ok, post} <- struct |> Post.changeset(params) |> Repo.update() do
      post = post |> Repo.preload([:tags, :cover, :authors], force: true)

      Task.async(fn -> ES.reindex(post) end)
      {:ok, post}
    else
      {:error, changeset} ->
        {:error, changeset}
    end
  end

  def delete!(id) do
    post = Repo.get!(Post, id)

    Repo.delete!(post)

    Task.async(fn -> ES.delete(post) end)
  end

  def inc_total_views(%Post{} = post) do
    Task.async(fn ->
      {1, [%Post{total_views: total_views}]} =
        from(p in Post, where: p.id == ^post.id, select: [:total_views])
        |> Repo.update_all(inc: [total_views: 1])

      ES.update(post, %{total_views: total_views})
    end)

    post
  end
end
