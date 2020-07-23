defmodule Bloomchain.Mixfile do
  use Mix.Project

  def project do
    [
      app: :bloomchain,
      version: "0.0.1",
      elixir: "~> 1.10",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Bloomchain.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.4"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 4.1"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:plug_cowboy, "~> 2.0"},
      {:better_params, "~> 0.5.0"},

      # json serializer
      {:jason, "~> 1.1"},
      {:poison, "~> 3.1"},

      # http requests
      {:httpoison, "~> 1.6"},

      # scheduler for cronjobs
      {:quantum, "~> 3.0"},

      # User authentication
      {:guardian, "~> 2.0"},
      {:comeonin, "~> 5.0"},
      {:bcrypt_elixir, "~> 2.0"},

      # Post engine deps
      {:timex, "~> 3.3.0"},
      {:elixir_uuid, "~> 1.2"},

      # Cursor pagation
      {:paginator, "~> 0.6"},

      # File attachment deps
      {:waffle, "~> 1.1.0"},
      {:waffle_ecto, "~> 0.0.9"},

      # If using Amazon S3:
      {:ex_aws, "~> 2.0"},
      {:ex_aws_s3, "~> 2.0"},
      {:hackney, "~> 1.6"},
      {:sweet_xml, "~> 0.6"},

      # ES search
      {:elasticsearch, "~> 1.0"},
      {:sigaws, "~> 0.7"},
      {:sentry, "~> 7.0"},

      # HTML parser to get text
      {:floki, "~> 0.26.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": [
        "ecto.create",
        "ecto.migrate",
        # "elasticsearch.build posts --cluster Bloomchain.ElasticsearchCluster",
        "run priv/repo/seeds.exs"
      ],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
