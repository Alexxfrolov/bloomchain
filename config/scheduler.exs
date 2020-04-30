use Mix.Config

config :bloomchain, Bloomchain.Scheduler,
  jobs: [
    # Every minute
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.publish_post"]}},
    # Every 15 minutes
    {"*/15 * * * *",
     {Mix.Task, :rerun, ["bloomchain.index", [Bloomchain.Service.Index.Bitcoin]]}},
    # Every day at 00:00 UTC
    {"0 0 * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_list"]}},
    # Every 15 minutes
    {"*/15 * * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_price"]}}
  ]
