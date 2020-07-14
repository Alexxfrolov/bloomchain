defmodule BloomchainWeb.Uploaders.File do
  use Waffle.Definition
  use Waffle.Ecto.Definition

  @versions [:original, :"380", :"540", :"800", :"380_2x", :"540_2x", :"800_2x"]
  @acl :public_read_write

  def validate({file, %{type: "image"}}) do
    ~w(.jpg .jpeg .png) |> Enum.member?(String.downcase(Path.extname(file.file_name)))
  end

  def validate({file, %{type: "pdf"}}) do
    ~w(.pdf) |> Enum.member?(String.downcase(Path.extname(file.file_name)))
  end

  def validate({file, %{type: "video"}}) do
    ~w(.mp4 .avi) |> Enum.member?(String.downcase(Path.extname(file.file_name)))
  end

  def filename(version, _) do
    version
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

  def transform(:"380", _) do
    {:convert, "-resize 50% -geometry 380 -sampling-factor 4:2:0 -quality 70 -interlace JPEG"}
  end

  def transform(:"540", _) do
    {:convert, "-resize 50% -geometry 540 -sampling-factor 4:2:0 -quality 70 -interlace JPEG"}
  end

  def transform(:"800", _) do
    {:convert, "-resize 50% -geometry 800 -sampling-factor 4:2:0 -quality 70 -interlace JPEG"}
  end

  def transform(:"380_2x", _) do
    {:convert, "-geometry 380 -sampling-factor 4:2:0 -quality 85 -interlace JPEG"}
  end

  def transform(:"540_2x", _) do
    {:convert, "-geometry 540 -sampling-factor 4:2:0 -quality 85 -interlace JPEG"}
  end

  def transform(:"800_2x", _) do
    {:convert, "-geometry 800 -sampling-factor 4:2:0 -quality 85 -interlace JPEG"}
  end
end
