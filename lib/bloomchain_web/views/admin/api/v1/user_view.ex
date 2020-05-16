defmodule BloomchainWeb.Admin.Api.V1.UserView do
  use BloomchainWeb, :view

  def render("index.json", %{users: users, meta: meta}) do
    %{
      data: Enum.map(users, &user_json/1),
      meta: meta
    }
  end

  def render("show.json", %{user: user}) do
    user_json(user)
  end

  def user_json(user) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      job: user.job,
      phone: user.phone,
      deletable:
        !(Ecto.assoc_loaded?(user.author) && user.author &&
            Enum.any?(user.author.post_ids)),
      inserted_at: user.inserted_at |> Timex.local(),
      updated_at: user.updated_at |> Timex.local()
    }
  end
end
