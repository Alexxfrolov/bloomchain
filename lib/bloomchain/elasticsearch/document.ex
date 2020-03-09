defimpl Elasticsearch.Document, for: Bloomchain.Content.Post do
  def id(post), do: post.id
  def routing(_), do: false

  def encode(post) do
    %{
      title: post.title,
      author: post.author
    }
  end
end
