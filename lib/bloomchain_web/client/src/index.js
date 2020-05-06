import { StockChart } from "./chart"
import { Sharer } from "./share-social"
import { parseHTML } from "./lib/dom"

document.addEventListener("DOMContentLoaded", () => {
  const bitcoin_chart_container = document.getElementById("js-chart-bitcoin")
  const top10_cryptocurrency_chart_container = document.getElementById(
    "js-chart-top10-cryptocurrency",
  )

  if (bitcoin_chart_container) {
    const options = {
      title: {
        text: "BloomChain Bitcoin Price Index (BCBTC Index)",
      },
      yAxis: {
        offset: 40,
      },
      series: [
        {
          name: "BCBTC",
          type: "line",
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    }
    const bitcoin_chart = new StockChart(
      bitcoin_chart_container,
      "bitcoin",
      options,
    )
    bitcoin_chart.init()
  }

  if (top10_cryptocurrency_chart_container) {
    const options = {
      title: {
        text: "BloomChain Top 10 Cryptocurrency Index (BC10 Index)",
      },
      yAxis: {
        offset: 25,
      },
      series: [
        {
          name: "BC10",
          type: "line",
          line: {
            color: "red",
          },
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    }
    const top10_cryptocurrency_chart = new StockChart(
      top10_cryptocurrency_chart_container,
      "top_10",
      options,
    )
    top10_cryptocurrency_chart.init()
  }
})

if (document.readyState === "complete" || document.readyState !== "loading") {
  Sharer.init()
} else {
  document.addEventListener("DOMContentLoaded", Sharer.init)
}

document.addEventListener("DOMContentLoaded", function () {
  $(".bc-header__nav .dropdown").on("shown.bs.dropdown", (e) => {
    window.innerWidth < 540 && $(e.target).prevAll().hide()
  })
  $(".bc-header__nav .dropdown").on("hidden.bs.dropdown", (e) => {
    window.innerWidth < 540 && $(e.target).prevAll().show()
  })
  $(".bc-header__search__icon").bind("click", function (e) {
    $(this).hide()
    $(".bc-header__nav").hide(),
      $(".bc-header__search").removeClass("w-auto").addClass("w-100"),
      $(".bc-header__search__box")
        .removeClass("d-none")
        .addClass("d-inline-flex"),
      $(".bc-header__search__icon").removeClass("pr-0").addClass("px-0"),
      $(".bc-header__search__box input").focus(),
      $(e.delegateTarget).hasClass("bc-header__search__icon_mobile") &&
        ($(e.delegateTarget).parent().prevAll().hide(),
        $(e.delegateTarget).nextAll().hide(),
        $(e.delegateTarget).parent().addClass("w-100"))
  })
  $(".bc-header__search__close").bind("click", (e) => {
    $(".bc-header__search__icon").show(),
      $(".bc-header__nav").show(),
      $(".bc-header__search").removeClass("w-100").addClass("w-auto"),
      $(".bc-header__search__box")
        .removeClass("d-inline-flex")
        .addClass("d-none"),
      $(".bc-header__search__icon").removeClass("px-0").addClass("pr-0"),
      $(e.delegateTarget).hasClass("bc-header__search__close_mobile") &&
        ($(e.delegateTarget).parent().parent().prevAll().show(),
        $(e.delegateTarget).parent().nextAll().show(),
        $(e.delegateTarget).parent().parent().removeClass("w-100")),
      $(void 0).hide()
  })

  $(".js-marquee").marquee({
    duration: 4e4,
    gap: 0,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: !0,
  })

  const $main = document.querySelector(".js-article-list")
  const $scrollButtonContainer = document.querySelector(
    ".js-scroll-button-container",
  )
  const $scrollButton = document.querySelector(".js-scroll-button")

  $scrollButton && $scrollButton.addEventListener("click", pagination)

  function pagination(event) {
    const { scroll, date } = event.currentTarget.dataset

    const url = `${location.pathname}?scroll=${scroll}&last_date=${date}`
    const $button = document.querySelector(".container.px-0.pb-5")

    fetch(url)
      .then((response) => {
        const scroll = response.headers.get("x-pagination-scroll")
        const date = response.headers.get("x-last-date")
        if (!!scroll) {
          $scrollButton.setAttribute("data-scroll", scroll)
          $scrollButton.setAttribute("data-date", date)
        } else {
          $scrollButton.removeEventListener("click", pagination)
          $scrollButtonContainer.remove()
        }
        return response.text()
      })
      .then((textHTML) => {
        const html = parseHTML(textHTML)
        Array.from(html).forEach((node) => $main.append(node))
      })
  }

  const $currencyConverterInputField = document.querySelector(
    ".js-currency-converter-input",
  )
  const $currencyConverterOutputField = document.querySelector(
    ".js-currency-converter-output",
  )
  const $cryptoCurrencySelect = document.querySelector(
    ".js-crypto-currency-select",
  )
  const $financeCurrencySelect = document.querySelector(
    ".js-finance-currency-select",
  )

  if (
    $cryptoCurrencySelect &&
    $financeCurrencySelect &&
    $currencyConverterOutputField &&
    $currencyConverterInputField
  ) {
    setCurrency($currencyConverterInputField.value)

    Array.from([$cryptoCurrencySelect, $financeCurrencySelect]).forEach(
      (select) =>
        select.addEventListener("change", function () {
          setCurrency()
        }),
    )

    $currencyConverterInputField.addEventListener("input", function () {
      setCurrency()
    })

    function setCurrency() {
      const cryptoValue = $currencyConverterInputField.value
      const cryptoCurrencyName = $cryptoCurrencySelect.value
      const financeCurrencyName = $financeCurrencySelect.value
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${cryptoCurrencyName}&tsyms=${financeCurrencyName}`,
      )
        .then((response) => response.json())
        .then((json) => {
          const currency = json[financeCurrencyName]
          const value = (cryptoValue * currency).toFixed(2)
          $currencyConverterOutputField.value = value
        })
    }
  }
})
