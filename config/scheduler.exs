use Mix.Config

config :bloomchain, Bloomchain.Scheduler,
  jobs: [
    # Every minute
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.publish_post"]}},
    # # Every 15 minutes
    {"*/15 * * * *",
     fn ->
       # При первом запуске обязательно надо иметь 2 значание монеты из-за неверной логики в алгоритме
       # иначе график улетает в космос так как биткоин и все топ 10 монет считаются новыми
       # поэтому "bloomchain.update_coin_price" запускается 2 раза при первом запуске
       # нужно менять логику для новых монет

       # раскоментировать при первом запуске
       # Mix.Task.run("bloomchain.update_coin_price")
       Mix.Task.rerun("bloomchain.update_coin_price")
       # Mix.Task.rerun("bloomchain.update_index", [Bloomchain.Service.Index.Top10])
     end},
    {"*/15 * * * *",
     {Mix.Task, :rerun, ["bloomchain.update_index", [Bloomchain.Service.Index.Bitcoin]]}},
    # # Every day at 00:00 UTC
    {"0 0 * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_list"]}}
  ]
