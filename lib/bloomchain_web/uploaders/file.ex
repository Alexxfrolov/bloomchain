defmodule BloomchainWeb.Uploaders.File do
  use Arc.Definition
  use Arc.Ecto.Definition

  # @versions [:original]

  def validate({file, %{type: "image"}}) do
    ~w(.jpg .jpeg .png) |> Enum.member?(Path.extname(file.file_name))
  end

  def validate({file, %{type: "pdf"}}) do
    ~w(.pdf) |> Enum.member?(Path.extname(file.file_name))
  end

  def validate({file, %{type: "video"}}) do
    ~w(.mp4 .avi) |> Enum.member?(Path.extname(file.file_name))
  end

  def storage_dir(_, {_, scope}) do
    "uploads/#{scope.type}/#{scope.uuid}"
  end
end
