defmodule BloomchainWeb.Uploaders.File do
  use Arc.Definition
  use Arc.Ecto.Definition

  # @versions [:original]

  def validate({file, _}) do
    ~w(.jpg .jpeg .png) |> Enum.member?(Path.extname(file.file_name))
  end

  # def filename(version, {file, _scope}) do
  #   file_name = String.replace(file.file_name, ~r/\..../, "")
  #   "#{file_name}_#{:os.system_time()}"
  # end

  # def filename(version, _) do
  #   version
  # end

  def storage_dir(version, {file, scope}) do
    "uploads/#{scope.type}/#{file.file_name}/#{version}"
  end
end
