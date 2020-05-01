use Mix.Config

config :bloomchain, Bloomchain.Scheduler,
  jobs: [
    # Every minute
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.publish_post"]}},
    # Every 15 minutes
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_price"]}},
    # {"*/15 * * * *", {Mix.Task, :rerun, ["bloomchain.index", [Bloomchain.Service.Index.Bitcoin]]}},
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.index", [Bloomchain.Service.Index.Top10]]}},
    # Every day at 00:00 UTC
    {"0 0 * * *", {Mix.Task, :rerun, ["bloomchain.update_coin_list"]}}
  ]
