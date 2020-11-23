import Ecto.Query

alias Bloomchain.Repo
alias Bloomchain.Content.{Post, Article}
alias Bloomchain.ElasticsearchCluster, as: ES

from(p in Post, where: p.type == "analisys")
|> Repo.all()
|> Enum.each(fn post ->
  post
  |> Post.changeset(%{type: "analysis"})
  |> Repo.update!()
  |> Repo.preload([:tags, :cover, :authors], force: true)
  |> ES.reindex()
end)

from(p in Post,
  where:
    p.type == "analysis" and
      p.slug == "kriptovalyuty-prinosyat-ubytok-tether-dogonyaet-xrp-obemy-ico-padayut"
)
|> Repo.all()
|> Enum.each(&Article.update(&1, %{type: "research"}))
