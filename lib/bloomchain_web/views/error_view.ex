defmodule BloomchainWeb.ErrorView do
  use BloomchainWeb, :view

  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end

  def render("404.html", assigns) do
    render("not_found.html")
  end

  def render("404.json", _assigns) do
    %{errors: %{detail: "Not found"}}
  end

  def render("422.json", %{changeset: changeset}) do
    %{errors: translate_errors(changeset)}
  end

  def render("422.json", %{reason: %{changeset: changeset}}) do
    %{errors: translate_errors(changeset)}
  end

  def render("422.json", _assigns) do
    %{errors: %{detail: "Unprocessable entity"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{detail: "Internal server error"}}
  end

  defp translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end
end
