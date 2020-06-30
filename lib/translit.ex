defmodule Translit do
  @moduledoc """
  The main intent of this module is to be used in slug generation for URLs.
  Supports russian transliteration.
  """

  @char_mappings %{
    "а" => "a",
    "б" => "b",
    "в" => "v",
    "г" => "g",
    "д" => "d",
    "е" => "e",
    "ё" => "e",
    "ж" => "j",
    "з" => "z",
    "и" => "i",
    "й" => "i",
    "к" => "k",
    "л" => "l",
    "м" => "m",
    "н" => "n",
    "о" => "o",
    "п" => "p",
    "р" => "r",
    "с" => "s",
    "т" => "t",
    "у" => "u",
    "ф" => "f",
    "х" => "h",
    "ц" => "ts",
    "ч" => "ch",
    "ш" => "sh",
    "щ" => "sch",
    "ъ" => "",
    "ы" => "y",
    "ь" => "",
    "э" => "je",
    "ю" => "ju",
    "я" => "ja"
  }

  @doc """
  Use this method to tranform any string to a url friendly slug. Usage example:
    Translit.to_slug("Hello из Беларуси!!!") #=> "hello-iz-belarysi"
  """

  def to_slug(text) do
    text
    |> String.downcase()
    |> String.replace(~r/\W+/u, "-")
    |> transliterate
    # Remove trailing dashes
    |> String.replace(~r/^-+|-+$/u, "")
  end

  def transliterate(text) do
    Regex.replace(~r/[^-a-zA-Z0-9 ]/u, text, fn ch -> Map.get(@char_mappings, ch, "") end)
  end
end
