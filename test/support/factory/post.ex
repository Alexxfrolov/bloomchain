defmodule Bloomchain.Factory.Post do
  def valid_attrs do
    %{
      title: "The Best Post",
      lead: nil,
      type: "newsfeed",
      body: "123",
      status: "draft",
      published_at: nil,
      time: nil,
      cover_id: nil,
      tags: [],
      authors: [],
      seo_settings: %{}
    }
  end

  def invalid_attrs do
    [
      %{
        title: nil,
        lead: nil,
        type: "newsfeed",
        body: "123",
        status: "draft",
        published_at: nil,
        time: nil,
        cover_id: nil,
        tags: [],
        authors: [],
        seo_settings: %{}
      },
      %{
        title: "The Best Post",
        lead: nil,
        type: nil,
        body: "123",
        status: "draft",
        published_at: nil,
        time: nil,
        cover_id: nil,
        tags: [],
        authors: [],
        seo_settings: %{}
      }
    ]
  end
end
