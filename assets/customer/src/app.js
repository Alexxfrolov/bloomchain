import { Subscription } from "./subscription"
import { Sharer } from "./lib/share-social"
import { Metrics } from "./lib/metrics"
import { parseHTML, throwback_by_history } from "./lib/dom"

import "./app.css"

const subscription = new Subscription()

if (document.readyState === "complete" || document.readyState !== "loading") {
  Sharer.init()

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

  const search_button_open = document.querySelectorAll(".js-open-search-button")
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
        search_button_open.forEach((node) => (node.style.display = ""))
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
          search_button_open.forEach((node) => node.classList.toggle(cssClass)),
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

  const imageObserver = new IntersectionObserver(imageLazyLoad)
  const images = document.querySelectorAll(".js-lazy")
  images.forEach((image) => {
    imageObserver.observe(image)
  })

  const callback = function (mutationsList, _observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const nodes = mutation.addedNodes
        Array.from(nodes).forEach(function (node) {
          const images = node.querySelectorAll(".js-lazy")
          images.forEach((image) => {
            imageObserver.observe(image)
          })
        })
      }
    }
  }
  const pagination_container = document.querySelector(
    ".js-pagination-container",
  )
  if (pagination_container) {
    const config = {
      attributes: false,
      childList: true,
      subtree: true,
    }
    const observer = new MutationObserver(callback)
    observer.observe(pagination_container, config)
  }
} else {
  document.addEventListener("DOMContentLoaded", Sharer.init)
}

const metrics = new Metrics(".js-banner")
metrics.init()

function imageLazyLoad(entries, _imgObserver) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.tagName === "IMG") {
      const lazyImage = entry.target
      lazyImage.src = lazyImage.dataset.src
      return
    }

    if (entry.isIntersecting && entry.target.tagName === "PICTURE") {
      const lazyPicture = entry.target
      const sources = lazyPicture.querySelectorAll("source")
      sources.forEach((source) => {
        source.srcset = source.dataset.srcset
      })
    }
  })
}
