use Mix.Config

config :bloomchain, Bloomchain.Scheduler,
  jobs: [
    # Every minute
    {"* * * * *", {Mix.Task, :rerun, ["bloomchain.publish_post"]}},
    # Every 15 minutes
    {"*/15 * * * *", {Mix.Task, :rerun, ["bloomchain.index", [Bloomchain.Index.Bitcoin]]}}
  ]
