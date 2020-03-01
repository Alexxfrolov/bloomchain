defmodule BloomchainWeb.Admin.Api.V1.UserView do
  use BloomchainWeb, :view

  def render("index.json", %{users: users}) do
    %{
      data: Enum.map(users, &user_json/1)
    }
  end

  def render("show.json", %{user: user}) do
    user_json(user)
  end

  def user_json(user) do
    %{
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      job: user.job,
      phone: user.phone,
      created_at: user.inserted_at,
      updated_at: user.updated_at
    }
  end
end
