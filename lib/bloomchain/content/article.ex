defmodule Bloomchain.Content.Article do
  alias Bloomchain.Content.Post
  alias Bloomchain.Auth.User
  alias Bloomchain.Repo

  import Ecto.Query

  def get_posts_list() do
    Repo.all(
      from(
        p in Post,
        preload: :user
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

  def get(slug, type: type) do
    Repo.get_by(Post, slug: slug, type: type)
    |> Repo.preload([:user])
    |> Repo.preload([:tags])
  end

  def create(post, %User{} = user, tags) do
    post =
      post
      |> Map.put(:user_id, user.id)

    changeset = Post.create_changeset(%Post{}, post, tags)

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
