defmodule Bloomchain.Content.Article do
  alias Bloomchain.Content.Post
  alias Bloomchain.Repo

  import Ecto.Query

  def paginate(type) do
    from(
      p in Post,
      where: p.type == ^type and p.status == "published",
      preload: [:cover],
      order_by: [desc: p.published_at, desc: p.id]
    )
    |> Repo.paginate(cursor_fields: [:published_at, :id], sort_direction: :desc, limit: 6)
  end

  def paginate(type, scroll) do
    from(
      p in Post,
      where: p.type == ^type and p.status == "published",
      preload: [:cover],
      order_by: [desc: p.published_at, desc: p.id]
    )
    |> Repo.paginate(
      after: scroll,
      cursor_fields: [:published_at, :id],
      sort_direction: :desc,
      limit: 6
    )
  end

  def get_posts_list(type, status) do
    Repo.all(
      from(
        p in Post,
        where: p.type == ^type and p.status == ^status,
        preload: [:tags],
        order_by: [desc: :inserted_at]
      )
    )
  end

  def get_published_posts(type, limit: limit) do
    Repo.all(
      from(
        p in Post,
        where: p.type == ^type and p.status == "published",
        preload: [:cover],
        order_by: [desc: :published_at],
        limit: ^limit
      )
    )
  end

  def get(id) do
    Repo.get(Post, id)
    |> Repo.preload([:tags, :cover])
  end

  def get(slug, type: type) do
    Repo.get_by(Post, slug: slug, type: type)
    |> Repo.preload([:tags, :cover])
  end

  def create(%{} = params) do
    changeset = Post.create_changeset(%Post{}, params)

    case changeset.valid? do
      true -> Repo.insert(changeset)
      false -> {:error, changeset}
    end
  end

  def update(%Post{} = post, %{} = params) do
    changeset = Post.common_changeset(post, params)

    case changeset.valid? do
      true -> Repo.update(changeset)
      false -> {:error, changeset}
    end
  end
end
