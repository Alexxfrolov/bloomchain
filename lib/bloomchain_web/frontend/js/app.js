$('.js-marquee').marquee({
  duration: 4e4,
  gap: 0,
  delayBeforeStart: 0,
  direction: "left",
  duplicated: !0
});

$('body').delegate('.js-scroll-button', 'click', function (event) {
  const {
    scroll,
    date
  } = event.currentTarget.dataset

  if (!!scroll) {
    const path = `${location.pathname}?scroll=${scroll}&last_date=${date}`

    $.get(path, function (response) {
      const $main = $('.js-main')
      const $button = $('.container.px-0.pb-5')
      html = $.parseHTML(response)
      $button.remove()
      $main.append(html)
    })
  }
})

const $currencyConverterInputField = $('.js-currency-converter-input')
const $currencyConverterOutputField = $('.js-currency-converter-output')
const $cryptoCurrencySelect = $('.js-crypto-currency-select')
const $financeCurrencySelect = $('.js-finance-currency-select')

$currencyConverterInputField.ready(function () {
  setCurrency($currencyConverterInputField.val())
})

$currencyConverterInputField.on('blur', function (event) {
  setCurrency(event.target.value)
})

function setCurrency(cryptoValue) {
  const fsym = $cryptoCurrencySelect.val()
  const tsyms = $financeCurrencySelect.val()
  $.get(`https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsyms}`, function (data) {
    const currency = data[tsyms]
    const value = (cryptoValue * currency).toFixed(2)
    $currencyConverterOutputField.text(value)
  })
}