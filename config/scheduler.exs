use Mix.Config

config :bloomchain, Bloomchain.Scheduler,
  jobs: [
    # Every minute
    # {"* * * * *", {Mix.Task, :rerun, ["bloomchain.publish_post"]}},
    # Every 15 minutes
    {"* * * * *",
     fn ->
       Mix.Task.rerun("bloomchain.update_coin_price")
       Mix.Task.rerun("bloomchain.update_index", [Bloomchain.Service.Index.Top10])
     end}
    # {"*/15 * * * *", {Mix.Task, :rerun, ["bloomchain.update_index", [Bloomchain.Service.Index.Bitcoin]]}},
    # Every day at 00:00 UTC
    # {"0 0 * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_list"]}}
  ]
