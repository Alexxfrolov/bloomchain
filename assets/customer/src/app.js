import { Subscription } from "./subscription"
import { Sharer } from "./lib/share-social"
import { parseHTML, throwback_by_history } from "./lib/dom"

import "./app.css"
import { doc } from "prettier"

const subscription = new Subscription()

document.addEventListener("DOMContentLoaded", () => {
  subscription.init()

  const throwback_buttons = document.querySelectorAll(".js-throwback")
  Array.from(throwback_buttons).forEach((button) =>
    button.addEventListener("click", throwback_by_history),
  )

  const $main = document.querySelector(".js-article-list")
  const $scrollButtonContainer = document.querySelector(
    ".js-scroll-button-container",
  )
  const $scrollButton = document.querySelector(".js-scroll-button")

  $scrollButton && $scrollButton.addEventListener("click", pagination)

  function pagination(event) {
    const { scroll, date, query } = event.currentTarget.dataset

    const url = `${location.pathname}?scroll=${scroll}&last_date=${date}&query=${query}`
    const $button = document.querySelector(".container.px-0.pb-5")

    fetch(url)
      .then((response) => {
        if (response.ok) {
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
        }

        throw new Error(response.json())
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

if (document.readyState === "complete" || document.readyState !== "loading") {
  Sharer.init()
} else {
  document.addEventListener("DOMContentLoaded", Sharer.init)
}

document.addEventListener("DOMContentLoaded", () => {
  const search_button_open = document.querySelector(".js-open-search-button")
  const header_nav = document.querySelector(".bc-header__nav")
  const search_form = document.querySelector(".js-search-form")
  const search_field_input = search_form.querySelector('input[type="search"]')

  const mobile_search_form = document.querySelector(".js-mobile-search-form")
  const mobile_menu_button = document.querySelector(".js-mobile-menu-button")
  const mobile_search_icon = document.querySelector(".js-mobile-search-icon")

  Array.from(document.getElementsByClassName("js-open-search-button")).forEach(
    (element) =>
      element.addEventListener("click", function (event) {
        element.style.display = "none"
        header_nav.style.display = "none"
        Array.from(
          document.getElementsByClassName("js-search-container"),
        ).forEach((element) => {
          ;[("w-auto", "w-100")].forEach((cssClass) =>
            element.classList.toggle(cssClass),
          )
        })
        ;["d-none", "d-inline-flex"].forEach((cssClass) =>
          search_form.classList.toggle(cssClass),
        )
        ;["pr-0", "px-0"].forEach((cssClass) =>
          element.classList.toggle(cssClass),
        )
        search_field_input.focus()

        if (
          event.currentTarget.classList.contains("js-mobile-open-search-button")
        ) {
          ;["d-none", "d-inline-flex"].forEach((cssClass) =>
            mobile_search_form.classList.toggle(cssClass),
          )
          mobile_search_form.querySelector('input[type="search"]').focus()
          mobile_menu_button.style.display = "none"

          const mobile_search_container = event.currentTarget.parentNode
          ;["pr-0", "px-0"].forEach((cssClass) =>
            mobile_search_icon.classList.toggle(cssClass),
          )

          Array.from(mobile_search_container.parentNode.children).forEach(
            (el) => {
              if (el !== mobile_search_container) {
                el.style.display = "none"
              }
            },
          )
        }
      }),
  )

  Array.from(document.getElementsByClassName("js-close-search-button")).forEach(
    (element) =>
      element.addEventListener("click", function (event) {
        search_button_open.style.display = ""
        header_nav.style.display = ""
        Array.from(
          document.getElementsByClassName("js-search-container"),
        ).forEach((element) => {
          ;[("w-auto", "w-100")].forEach((cssClass) =>
            element.classList.toggle(cssClass),
          )
        })
        ;["d-none", "d-inline-flex"].forEach((cssClass) =>
          search_form.classList.toggle(cssClass),
        )
        ;["pr-0", "px-0"].forEach((cssClass) =>
          search_button_open.classList.toggle(cssClass),
        )

        if (
          event.currentTarget.classList.contains("js-mobile-open-search-button")
        ) {
          ;["d-none", "d-inline-flex"].forEach((cssClass) =>
            mobile_search_form.classList.toggle(cssClass),
          )
          mobile_menu_button.style.display = ""

          const mobile_search_container = mobile_search_form.parentNode
          ;["pr-0", "px-0"].forEach((cssClass) =>
            mobile_search_icon.classList.toggle(cssClass),
          )

          Array.from(mobile_search_container.parentNode.children).forEach(
            (el) => {
              if (el !== mobile_search_container) {
                el.style.display = ""
              }
            },
          )
        }
      }),
  )

  mobile_menu_button.addEventListener("click", function (event) {
    const { target } = event.currentTarget.dataset
    const menu = document.querySelector(target)
    event.currentTarget.classList.toggle("collapsed")
    if (menu.classList.contains("show")) {
      event.currentTarget.setAttribute("aria-expanded", false)
    } else {
      event.currentTarget.setAttribute("aria-expanded", true)
    }
    menu.classList.toggle("show")
  })
})
