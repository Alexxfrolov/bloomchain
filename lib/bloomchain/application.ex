defmodule Bloomchain.Application do
  use Application

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Bloomchain.Repo, []),

      # Start the endpoint when the application starts
      supervisor(BloomchainWeb.Endpoint, []),

      # Start the ES when the application starts
      supervisor(Bloomchain.ElasticsearchCluster, []),

      # Start scheduler for cron jobs
      Bloomchain.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Bloomchain.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    BloomchainWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
