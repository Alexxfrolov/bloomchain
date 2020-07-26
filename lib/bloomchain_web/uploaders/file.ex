defmodule BloomchainWeb.Uploaders.File do
  use Waffle.Definition
  use Waffle.Ecto.Definition

  @versions [
    :original,
    :"380",
    :"540",
    :"800",
    :"380_webp",
    :"540_webp",
    :"800_webp",
    :"380_jp2",
    :"540_jp2",
    :"800_jp2"
  ]
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

  def filename(version, {_file, _scope}) do
    version
  end

  def storage_dir(_version, {_file, scope}) do
    "uploads/#{scope.type}/#{scope.uuid}"
  end

  def s3_object_headers(_version, {file, _scope}) do
    [
      content_type: MIME.from_path(file.file_name),
      content_disposition: "inline; filename=\"#{file.file_name}\"",
      cache_control: "max-age=31536000, immutable"
    ]
  end

  def transform(:"380", {_, %{type: "image"}}) do
    {:convert, "-geometry 380 -sampling-factor 4:2:0 -quality 70 -depth 8"}
  end

  def transform(:"540", {_, %{type: "image"}}) do
    {:convert, "-geometry 540 -sampling-factor 4:2:0 -quality 70 -depth 8"}
  end

  def transform(:"800", {_, %{type: "image"}}) do
    {:convert, "-geometry 800 -sampling-factor 4:2:0 -quality 70 -depth 8"}
  end

  def transform(:"380_webp", {_, %{type: "image"}}) do
    {:convert, "-quality 50 -geometry 380", :webp}
  end

  def transform(:"540_webp", {_, %{type: "image"}}) do
    {:convert, "-quality 50 -geometry 540", :webp}
  end

  def transform(:"800_webp", {_, %{type: "image"}}) do
    {:convert, "-quality 50 -geometry 800", :webp}
  end

  def transform(:"380_jp2", {_, %{type: "image"}}) do
    {:convert, "-geometry 380 -define jp2:quality=50", :jp2}
  end

  def transform(:"540_jp2", {_, %{type: "image"}}) do
    {:convert, "-geometry 540 -define jp2:quality=50", :jp2}
  end

  def transform(:"800_jp2", {_, %{type: "image"}}) do
    {:convert, "-geometry 800 -define jp2:quality=50", :jp2}
  end

  def transform(:original, {_, %{type: "image"}}) do
    {:convert, "-sampling-factor 4:2:0 -quality 85"}
  end

  def transform(:original, {_, %{type: "pdf"}}), do: :noaction

  def transform(_version, {_, %{type: "pdf"}}), do: :skip
end
