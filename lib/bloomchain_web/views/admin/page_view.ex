defmodule BloomchainWeb.Admin.PageView do
  use BloomchainWeb, :view

  def published_status(post) do
    case post.published do
      true -> "Yes"
      false -> "No"
    end
  end

end
