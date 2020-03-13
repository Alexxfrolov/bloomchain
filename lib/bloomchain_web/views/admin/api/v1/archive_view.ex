defmodule BloomchainWeb.Admin.Api.V1.ArchiveView do
  use BloomchainWeb, :view
  import BloomchainWeb.Admin.Api.V1.MediaView, only: [media_json: 1]

  def render("index.json", %{archives: archives}) do
    %{
      data: Enum.map(archives, &archive_json/1)
    }
  end

  def render("show.json", %{archive: archive}) do
    archive_json(archive)
  end

  def archive_json(archive) do
    %{
      id: archive.id,
      cover: media_json(archive.cover),
      pdf: media_json(archive.pdf),
      created_at: archive.inserted_at |> Timex.local(),
      updated_at: archive.updated_a |> Timex.local()
    }
  end
end
