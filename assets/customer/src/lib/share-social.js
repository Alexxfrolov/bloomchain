export const Sharer = function (el) {
  this.el = el
}

Sharer.init = function () {
  const selectors = document.querySelectorAll("[data-social-share]")
  const length = selectors.length

  for (let i = 0; i < length; i++) {
    selectors[i].addEventListener("click", Sharer.add)
    if (selectors[i].tagName === "A") {
      selectors[i].setAttribute("target", "_blank")
    }
  }
}

Sharer.add = function (el) {
  var target = el.currentTarget || el.srcElement
  var sharer = new Sharer(target)
  sharer.share()
}

Sharer.prototype = {
  constructor: Sharer,

  getValue: function (attr) {
    var val = this.el.getAttribute("data-" + attr)
    if (val && attr === "hashtag") {
      if (!val.startsWith("#")) {
        val = "#" + val
      }
    }
    return val
  },

  share: function () {
    const sharer = this.getValue("social-share").toLowerCase()
    const sharers = {
      facebook: {
        url: "https://www.facebook.com/sharer/sharer.php",
        params: {
          u: this.getValue("url") || location.href,
          hashtag: this.getValue("hashtag"),
        },
        isLink: true,
      },
      twitter: {
        url: "https://twitter.com/intent/tweet/",
        params: {
          text: this.getValue("title"),
          url: this.getValue("url") || location.href,
          hashtags: this.getValue("hashtags"),
          via: this.getValue("via"),
        },
        isLink: true,
      },
      telegram: {
        url:
          this.getValue("web") !== null
            ? "https://telegram.me/share"
            : "tg://msg_url",
        params: {
          text: this.getValue("title"),
          url: this.getValue("url") || location.href,
          to: this.getValue("to"),
        },
        isLink: true,
      },
      vk: {
        url: "http://vk.com/share.php",
        params: {
          url: this.getValue("url") || location.href,
          title: this.getValue("title"),
          description: this.getValue("caption"),
          image: this.getValue("image"),
        },
        isLink: true,
      },
    }
    const social = sharers[sharer]

    if (social) {
      social.width = this.getValue("width")
      social.height = this.getValue("height")
    }

    return social !== undefined ? this.urlSharer(social) : false
  },

  urlSharer: function (sharer) {
    const p = sharer.params || {}
    const keys = Object.keys(p)
    let str = keys.length > 0 ? "?" : ""

    for (let i = 0; i < keys.length; i++) {
      if (str !== "?") {
        str += "&"
      }
      if (p[keys[i]]) {
        str += keys[i] + "=" + encodeURIComponent(p[keys[i]])
      }
    }
    sharer.url += str

    if (!sharer.isLink) {
      var popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams =
          "scrollbars=no, width=" +
          popWidth +
          ", height=" +
          popHeight +
          ", top=" +
          top +
          ", left=" +
          left,
        newWindow = window.open(sharer.url, "", popParams)

      if (window.focus) {
        newWindow.focus()
      }
    } else {
      window.open(sharer.url)
    }
  },
}
