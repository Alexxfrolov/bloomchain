defmodule Bloomchain.Content.Article do
  alias Bloomchain.Content.Post
  alias Bloomchain.Content.Tag
  alias Bloomchain.Repo

  import Ecto.Query

  def get_posts_list(type, status) do
    Repo.all(
      from(
        p in Post,
        where: p.type == ^type and p.status == ^status,
        preload: [:tags]
      )
    )
  end

  def get_published_posts(type, limit: limit) do
    Repo.all(
      from(
        p in Post,
        where: p.type == ^type and p.status == "published",
        limit: ^limit
      )
    )
  end

  def get(id) do
    Repo.get(Post, id)
    |> Repo.preload([:tags])
  end

  def get(slug, type: type) do
    Repo.get_by(Post, slug: slug, type: type)
    |> Repo.preload([:tags])
  end

  def create(%{} = params, tags \\ []) do
    tags = Repo.all(from(t in Tag, where: t.id in ^tags))
    changeset = Post.create_changeset(%Post{}, params, tags)

    case changeset.valid? do
      true -> Repo.insert(changeset)
      false -> {:error, changeset}
    end
  end

  def update(post, params) do
    changeset = Post.common_changeset(post, params)

    case changeset.valid? do
      true -> Repo.update(changeset)
      false -> {:error, changeset}
    end
  end

  def publish(post) do
    Post.common_changeset(post, %{published: not post.published})
    |> Repo.update()
  end
end
