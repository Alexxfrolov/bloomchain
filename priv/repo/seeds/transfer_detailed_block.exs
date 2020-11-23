import Ecto.Query

alias Bloomchain.Repo
alias Bloomchain.Content.{Post, Article}

slugs = ~w(
  bez-kupyur-kak-menyalsya-rossijskij-rynok-onlajn-platezhej-i-operatsij-s-kartami
  kriptovalyuty-uhodyat-na-dno-ico-ne-polzuyutsya-sprosom-rynok-defi-sokrashhaetsya
  kriptovalyuty-v-krasnoj-zone-rynok-defi-nabiraet-silu-bitcoin-obygryvaet-zoloto
  finansovye-tehnologii-v-rossii-klyuchevye-igroki-tsifry-perspektivy
  rost-kapitalizatsii-populyarnost-ieo-i-drugie-trendy-kriptorynka-vo-vtorom-kvartale
  kriptovalyutnyj-rynok-v-chetvertom-kvartale-2018-goda-issledovanie-bloomchain
  kriptovalyutnyj-rynok-v-tretem-kvartale-2018-goda-issledovanie-bloomchain
  kriptovalyutnyj-rynok-vo-vtorom-kvartale-2018-goda-issledovanie-bloomchain
  kriptovalyutnyj-rynok-v-pervom-kvartale-2018-goda-issledovanie-bloomchain
  rossijskij-finteh-v-2018-godu-issledovanie-bloomchain
  vzryvnoi-rost-defi-vzlet-polkadot-rezkoe-udorojanie-komissii-v-ethereum-issledovanie-bloomchain
  kriptovaljuty-v-zelenoi-zone-smena-lidera-na-rynke-defi-novye-antirekordy-ico
  kriptovalyuty-uhodyat-na-dno-ico-ne-polzuyutsya-sprosom-rynok-defi-sokrashhaetsya
)

# from(p in Post, where: p.type == "analisys")
# |> Repo.all()
# |> Enum.each(&Article.update(&1, %{type: "analysis"}))

from(p in Post, where: p.type == "detailed" and p.slug in ^slugs)
|> Repo.all()
|> Enum.each(&Article.update(&1, %{type: "research"}))

# from(p in Post,
#   where:
#     p.type == "analysis" and
#       p.slug == "kriptovalyuty-prinosyat-ubytok-tether-dogonyaet-xrp-obemy-ico-padayut"
# )
# |> Repo.all()
# |> Enum.each(&Article.update(&1, %{type: "research"}))
