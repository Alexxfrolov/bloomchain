export class Metrics {
  constructor(selector) {
    this.selector = selector
    this.apiURL = "/api/events"
    this.viewsState = []
  }

  setViewsState = (data) => {
    this.viewsState = [].concat(data, this.viewsState)
  }

  getElements = () => {
    return document.querySelectorAll(this.selector)
  }

  getOptions = (element) => {
    const { bannerId: banner_id, targetUrl: target_url } = element.dataset
    return { banner_id, target_url }
  }

  bannerObserver = (entries, imgObserver) => {
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

  async request(data, target_url) {
    fetch(this.apiURL, {
      method: "POST",
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

  view = (event) => {
    const imageObserver = new IntersectionObserver(this.bannerObserver)
    imageObserver.observe(event.target)
  }

  click = async (event) => {
    const { banner_id, target_url } = this.getOptions(event.target)
    this.request({ banner_id, type: "click" }, target_url).then(
      () => (window.location.href = target_url),
    )
  }

  init() {
    const elements = this.getElements()
    Array.from(elements).forEach((element) =>
      element.addEventListener("load", this.view),
    )
    Array.from(elements).forEach((element) =>
      element.addEventListener("click", this.click),
    )
  }
}
