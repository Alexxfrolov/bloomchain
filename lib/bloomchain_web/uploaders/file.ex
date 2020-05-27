defmodule BloomchainWeb.Uploaders.File do
  use Arc.Definition
  use Arc.Ecto.Definition

  # @versions [:original]
  @acl :public_read_write

  def validate({file, %{type: "image"}}) do
    ~w(.jpg .jpeg .png) |> Enum.member?(Path.extname(file.file_name))
  end

  def validate({file, %{type: "pdf"}}) do
    ~w(.pdf) |> Enum.member?(Path.extname(file.file_name))
  end

  def validate({file, %{type: "video"}}) do
    ~w(.mp4 .avi) |> Enum.member?(Path.extname(file.file_name))
  end

  def storage_dir(_version, {_file, scope}) do
    "uploads/#{scope.type}/#{scope.uuid}"
  end

  def s3_object_headers(_version, {file, _scope}) do
    [
      content_type: MIME.from_path(file.file_name),
      content_disposition: "inline; filename=\"#{file.file_name}\"",
      cache_control: "public, max-age=86400"
    ]
  end
end
