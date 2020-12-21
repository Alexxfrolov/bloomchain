defmodule BloomchainWeb.Admin.Api.V1.SubscriberView do
  use BloomchainWeb, :view

  def render("index.json", %{subscribers: subscribers, meta: meta}) do
    %{
      data: Enum.map(subscribers, &subscriber_json/1),
      meta: meta
    }
  end

  def subscriber_json(subscriber) do
    %{
      id: subscriber.id,
      email: subscriber.email,
      inserted_at: subscriber.inserted_at,
      updated_at: subscriber.updated_at
    }
  end
end
