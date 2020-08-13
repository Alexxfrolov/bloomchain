export class Metrics {
  constructor(selector) {
    this.selector = selector
    this.apiURL = "/api/events"
    this.viewsState = []
  }

  setViewsState = (data) => {
    this.viewsState = [].concat(data, this.viewsState)
  }

  clearViewsState = () => {
    this.viewsState = []
  }

  getElements = () => {
    return document.querySelectorAll(this.selector)
  }

  getOptions = (element) => {
    const { bannerId: banner_id, targetUrl: target_url } = element.dataset
    return { banner_id, target_url }
  }

  bannerObserver = (entries, _imgObserver) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.tagName === "IMG" &&
        entry.target.classList.contains("js-banner")
      ) {
        const { banner_id, target_url } = this.getOptions(entry.target)
        const hasViewEvent = this.viewsState.find(
          (item) =>
            item.banner_id === banner_id &&
            item.target_url === target_url &&
            item.trigger_page_url === window.location.pathname,
        )
        if (hasViewEvent) {
          return
        }
        this.request({ banner_id, type: "view" }, target_url)
        this.setViewsState({
          banner_id,
          target_url,
          trigger_page_url: window.location.pathname,
        })
        return
      }
    })
  }

  async request(data) {
    fetch(this.apiURL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok && response.status === 201) {
        return response
      }

      throw new Error(response.json())
    })
  }

  view = (element) => {
    const imageObserver = new IntersectionObserver(this.bannerObserver)
    imageObserver.observe(element)
  }

  click = (event) => {
    const { banner_id, target_url } = this.getOptions(event.target)
    this.request({ banner_id, type: "click" }).then(() => {
      setTimeout(() => {
        this.clearViewsState()
        window.location.href = target_url
      }, 200)
    })
  }

  init() {
    const elements = this.getElements()
    Array.from(elements).forEach((element) => this.view(element))
    Array.from(elements).forEach((element) =>
      element.addEventListener("click", this.click),
    )
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const metrics = new Metrics(".js-banner")
  metrics.init()
})
