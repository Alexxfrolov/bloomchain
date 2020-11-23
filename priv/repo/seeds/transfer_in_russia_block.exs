import Ecto.Query

alias Bloomchain.Repo
alias Bloomchain.Content.{Post, Article}

from(p in Post, where: p.type == "in-russia")
|> Repo.all()
|> Enum.each(&Article.update(&1, %{type: "newsfeed"}))
