defmodule Bloomchain.Factory.User do
  def valid_attrs do
    %{
      first_name: "Алексей",
      last_name: "Фролов",
      email: "admin@app.com",
      password: "admin123"
    }
  end

  def invalid_attrs do
    [
      %{
        first_name: "Алексей",
        last_name: "Фролов",
        email: "admin@app.com",
        password: "1",
        role: "admin"
      },
      %{
        first_name: "Алексей",
        last_name: "Фролов",
        email: nil,
        password: "admin123",
        role: "admin"
      }
    ]
  end
end
