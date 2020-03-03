$('.js-marquee').marquee({
  duration: 4e4,
  gap: 0,
  delayBeforeStart: 0,
  direction: 'left',
  duplicated: !0
});

$('body').delegate('.js-scroll-button', 'click', function(event) {
  const { scroll } = event.currentTarget.dataset

  if (!!scroll) {
    const path = `${location.pathname}?scroll=${scroll}`

    $.get(path, function(response) {
      const $main = $('.js-main')
      const $button = $('.js-scroll-button-container')
      html = $.parseHTML(response)
      $button.remove()
      $main.append(html)
    })
  }
})
