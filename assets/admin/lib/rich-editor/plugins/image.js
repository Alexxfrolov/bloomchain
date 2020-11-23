/*!
 * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2020 Froala Labs
 */

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("froala-editor"))
    : "function" == typeof define && define.amd
    ? define(["froala-editor"], t)
    : t(e.FroalaEditor)
})(this, function (_e) {
  function Le(e) {
    return (Le =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e
          })(e)
  }
  ;(_e = _e && _e.hasOwnProperty("default") ? _e["default"] : _e),
    Object.assign(_e.POPUP_TEMPLATES, {
      "image.insert":
        "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
      "image.edit": "[_BUTTONS_]",
      "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
      "image.size": "[_BUTTONS_][_SIZE_LAYER_]",
    }),
    Object.assign(_e.DEFAULTS, {
      imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
      imageEditButtons: [
        "imageReplace",
        "imageAlign",
        "imageCaption",
        "imageRemove",
        "imageLink",
        "linkOpen",
        "linkEdit",
        "linkRemove",
        "-",
        "imageDisplay",
        "imageStyle",
        "imageAlt",
        "imageSize",
      ],
      imageAltButtons: ["imageBack", "|"],
      imageSizeButtons: ["imageBack", "|"],
      imageUpload: !0,
      imageUploadURL: null,
      imageCORSProxy: "https://cors-anywhere.froala.com",
      imageUploadRemoteUrls: !0,
      imageUploadParam: "file",
      imageUploadParams: {},
      imageUploadToS3: !1,
      imageUploadMethod: "POST",
      imageMaxSize: 10485760,
      imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
      imageResize: !0,
      imageResizeWithPercent: !1,
      imageRoundPercent: !1,
      imageDefaultWidth: 300,
      imageDefaultAlign: "center",
      imageDefaultDisplay: "block",
      imageSplitHTML: !1,
      imageStyles: {
        "fr-rounded": "Rounded",
        "fr-bordered": "Bordered",
        "fr-shadow": "Shadow",
      },
      imageMove: !0,
      imageMultipleStyles: !0,
      imageTextNear: !0,
      imagePaste: !0,
      imagePasteProcess: !1,
      imageMinWidth: 16,
      imageOutputSize: !1,
      imageDefaultMargin: 5,
      imageAddNewLine: !1,
    }),
    (_e.PLUGINS.image = function (g) {
      let c,
        l,
        f,
        p,
        o,
        a,
        d = g.$,
        s = "https://i.froala.com/upload",
        t = !1,
        i = 1,
        m = 2,
        u = 3,
        h = 4,
        v = 5,
        b = 6,
        n = {}
      function y() {
        let e = g.popups
          .get("image.insert")
          .find(".fr-image-by-url-layer input")
        e.val(""), c && e.val(c.attr("src")), e.trigger("change")
      }
      function r() {
        let e = g.popups.get("image.edit")
        if ((e || (e = P()), e)) {
          let t = we()
          Ce() && (t = t.find(".fr-img-wrap")),
            g.popups.setContainer("image.edit", g.$sc),
            g.popups.refresh("image.edit")
          let a = t.offset().left + t.outerWidth() / 2,
            i = t.offset().top + t.outerHeight()
          c.hasClass("fr-uploading")
            ? O()
            : g.popups.show("image.edit", a, i, t.outerHeight(), !0)
        }
      }
      function w() {
        k()
      }
      function C(e) {
        0 < e.parents(".fr-img-caption").length &&
          (e = e.parents(".fr-img-caption").first())
        let t = e.hasClass("fr-dib")
            ? "block"
            : e.hasClass("fr-dii")
            ? "inline"
            : null,
          a = e.hasClass("fr-fil")
            ? "left"
            : e.hasClass("fr-fir")
            ? "right"
            : ue(e)
        me(e, t, a), e.removeClass("fr-dib fr-dii fr-fir fr-fil")
      }
      function A() {
        for (
          var e,
            t = "IMG" == g.el.tagName ? [g.el] : g.el.querySelectorAll("img"),
            a = 0;
          a < t.length;
          a++
        ) {
          let i = d(t[a])
          !g.opts.htmlUntouched && g.opts.useClasses
            ? ((g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) &&
                (0 < (e = i).parents(".fr-img-caption").length &&
                  (e = e.parents(".fr-img-caption").first()),
                e.hasClass("fr-dii") ||
                  e.hasClass("fr-dib") ||
                  (e.addClass("fr-fi".concat(ue(e)[0])),
                  e.addClass("fr-di".concat(he(e)[0])),
                  e.css("margin", ""),
                  e.css("float", ""),
                  e.css("display", ""),
                  e.css("z-index", ""),
                  e.css("position", ""),
                  e.css("overflow", ""),
                  e.css("vertical-align", ""))),
              g.opts.imageTextNear ||
                (0 < i.parents(".fr-img-caption").length
                  ? i
                      .parents(".fr-img-caption")
                      .first()
                      .removeClass("fr-dii")
                      .addClass("fr-dib")
                  : i.removeClass("fr-dii").addClass("fr-dib")))
            : g.opts.htmlUntouched ||
              g.opts.useClasses ||
              ((g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) &&
                C(i)),
            g.opts.iframe && i.on("load", g.size.syncIframe)
        }
      }
      function E(e) {
        void 0 === e && (e = !0)
        let t,
          a = Array.prototype.slice.call(g.el.querySelectorAll("img")),
          i = []
        for (t = 0; t < a.length; t++)
          if (
            (i.push(a[t].getAttribute("src")),
            d(a[t]).toggleClass("fr-draggable", g.opts.imageMove),
            "" === a[t].getAttribute("class") && a[t].removeAttribute("class"),
            "" === a[t].getAttribute("style") && a[t].removeAttribute("style"),
            a[t].parentNode &&
              a[t].parentNode.parentNode &&
              g.node.hasClass(a[t].parentNode.parentNode, "fr-img-caption"))
          ) {
            let n = a[t].parentNode.parentNode
            g.browser.mozilla || n.setAttribute("contenteditable", !1),
              n.setAttribute("draggable", !1),
              n.classList.add("fr-draggable")
            let r = a[t].nextSibling
            r && !g.browser.mozilla && r.setAttribute("contenteditable", !0)
          }
        if (o)
          for (t = 0; t < o.length; t++)
            i.indexOf(o[t].getAttribute("src")) < 0 &&
              g.events.trigger("image.removed", [d(o[t])])
        if (o && e) {
          let s = []
          for (t = 0; t < o.length; t++) s.push(o[t].getAttribute("src"))
          for (t = 0; t < a.length; t++)
            s.indexOf(a[t].getAttribute("src")) < 0 &&
              g.events.trigger("image.loaded", [d(a[t])])
        }
        o = a
      }
      function S() {
        if (
          (l ||
            (function s() {
              let e
              g.shared.$image_resizer
                ? ((l = g.shared.$image_resizer),
                  (p = g.shared.$img_overlay),
                  g.events.on(
                    "destroy",
                    function () {
                      d("body").first().append(l.removeClass("fr-active"))
                    },
                    !0,
                  ))
                : ((g.shared.$image_resizer = d(
                    document.createElement("div"),
                  ).attr("class", "fr-image-resizer")),
                  (l = g.shared.$image_resizer),
                  g.events.$on(
                    l,
                    "mousedown",
                    function (e) {
                      e.stopPropagation()
                    },
                    !0,
                  ),
                  g.opts.imageResize &&
                    (l.append(R("nw") + R("ne") + R("sw") + R("se")),
                    (g.shared.$img_overlay = d(
                      document.createElement("div"),
                    ).attr("class", "fr-image-overlay")),
                    (p = g.shared.$img_overlay),
                    (e = l.get(0).ownerDocument),
                    d(e).find("body").first().append(p)))
              g.events.on(
                "shared.destroy",
                function () {
                  l.html("").removeData().remove(),
                    (l = null),
                    g.opts.imageResize && (p.remove(), (p = null))
                },
                !0,
              ),
                g.helpers.isMobile() ||
                  g.events.$on(d(g.o_win), "resize", function () {
                    c && !c.hasClass("fr-uploading")
                      ? pe(!0)
                      : c && (S(), ve(), O(!1))
                  })
              if (g.opts.imageResize) {
                ;(e = l.get(0).ownerDocument),
                  g.events.$on(l, g._mousedown, ".fr-handler", x),
                  g.events.$on(d(e), g._mousemove, $),
                  g.events.$on(
                    d(e.defaultView || e.parentWindow),
                    g._mouseup,
                    U,
                  ),
                  g.events.$on(p, "mouseleave", U)
                let i = 1,
                  n = null,
                  r = 0
                g.events.on(
                  "keydown",
                  function (e) {
                    if (c) {
                      let t =
                          -1 != navigator.userAgent.indexOf("Mac OS X")
                            ? e.metaKey
                            : e.ctrlKey,
                        a = e.which
                      ;(a !== n || 200 < e.timeStamp - r) && (i = 1),
                        (a == _e.KEYCODE.EQUALS ||
                          (g.browser.mozilla && a == _e.KEYCODE.FF_EQUALS)) &&
                        t &&
                        !e.altKey
                          ? (i = ee.call(this, e, 1, 1, i))
                          : (a == _e.KEYCODE.HYPHEN ||
                              (g.browser.mozilla &&
                                a == _e.KEYCODE.FF_HYPHEN)) &&
                            t &&
                            !e.altKey
                          ? (i = ee.call(this, e, 2, -1, i))
                          : g.keys.ctrlKey(e) ||
                            a != _e.KEYCODE.ENTER ||
                            (c.before("<br>"), T(c)),
                        (n = a),
                        (r = e.timeStamp)
                    }
                  },
                  !0,
                ),
                  g.events.on("keyup", function () {
                    i = 1
                  })
              }
            })(),
          !c)
        )
          return !1
        let e = g.$wp || g.$sc
        e.append(l), l.data("instance", g)
        let t =
            e.scrollTop() -
            ("static" != e.css("position") ? e.offset().top : 0),
          a =
            e.scrollLeft() -
            ("static" != e.css("position") ? e.offset().left : 0)
        ;(a -= g.helpers.getPX(e.css("border-left-width"))),
          (t -= g.helpers.getPX(e.css("border-top-width"))),
          g.$el.is("img") && g.$sc.is("body") && (a = t = 0)
        let i = we()
        Ce() && (i = i.find(".fr-img-wrap"))
        let n = 0,
          r = 0
        g.opts.iframe &&
          ((n = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-top"))),
          (r = g.helpers.getPX(g.$wp.find(".fr-iframe").css("padding-left")))),
          l
            .css(
              "top",
              (g.opts.iframe ? i.offset().top + n : i.offset().top + t) - 1,
            )
            .css(
              "left",
              (g.opts.iframe ? i.offset().left + r : i.offset().left + a) - 1,
            )
            .css("width", i.get(0).getBoundingClientRect().width)
            .css("height", i.get(0).getBoundingClientRect().height)
            .addClass("fr-active")
      }
      function R(e) {
        return '<div class="fr-handler fr-h'.concat(e, '"></div>')
      }
      function D(e) {
        Ce() ? c.parents(".fr-img-caption").css("width", e) : c.css("width", e)
      }
      function x(e) {
        if (!g.core.sameInstance(l)) return !0
        if (
          (e.preventDefault(),
          e.stopPropagation(),
          g.$el.find("img.fr-error").left)
        )
          return !1
        g.undo.canDo() || g.undo.saveStep()
        let t = e.pageX || e.originalEvent.touches[0].pageX
        if ("mousedown" == e.type) {
          let a = g.$oel.get(0).ownerDocument,
            i = a.defaultView || a.parentWindow,
            n = !1
          try {
            n = i.location != i.parent.location && !(i.$ && i.$.FE)
          } catch (o) {}
          n &&
            i.frameElement &&
            (t +=
              g.helpers.getPX(d(i.frameElement).offset().left) +
              i.frameElement.clientLeft)
        }
        ;(f = d(this)).data("start-x", t),
          f.data("start-width", c.width()),
          f.data("start-height", c.height())
        let r = c.width()
        if (g.opts.imageResizeWithPercent) {
          let s = c.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el
          r = ((r / d(s).outerWidth()) * 100).toFixed(2) + "%"
        }
        D(r), p.show(), g.popups.hideAll(), de()
      }
      function $(e) {
        if (!g.core.sameInstance(l)) return !0
        let t
        if (f && c) {
          if ((e.preventDefault(), g.$el.find("img.fr-error").left)) return !1
          let a =
            e.pageX ||
            (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null)
          if (!a) return !1
          let i = a - f.data("start-x"),
            n = f.data("start-width")
          if (
            ((f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (i = 0 - i),
            g.opts.imageResizeWithPercent)
          ) {
            let r =
              c.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el
            ;(n = (((n + i) / d(r).outerWidth()) * 100).toFixed(2)),
              g.opts.imageRoundPercent && (n = Math.round(n)),
              D("".concat(n, "%")),
              (t = Ce()
                ? (
                    (g.helpers.getPX(
                      c.parents(".fr-img-caption").css("width"),
                    ) /
                      d(r).outerWidth()) *
                    100
                  ).toFixed(2)
                : (
                    (g.helpers.getPX(c.css("width")) / d(r).outerWidth()) *
                    100
                  ).toFixed(2)) === n ||
                g.opts.imageRoundPercent ||
                D("".concat(t, "%")),
              c.css("height", "").removeAttr("height")
          } else
            n + i >= g.opts.imageMinWidth &&
              (D(n + i),
              (t = Ce()
                ? g.helpers.getPX(c.parents(".fr-img-caption").css("width"))
                : g.helpers.getPX(c.css("width")))),
              t !== n + i && D(t),
              ((c.attr("style") || "").match(/(^height:)|(; *height:)/) ||
                c.attr("height")) &&
                (c.css(
                  "height",
                  (f.data("start-height") * c.width()) / f.data("start-width"),
                ),
                c.removeAttr("height"))
          S(), g.events.trigger("image.resize", [ye()])
        }
      }
      function U(e) {
        if (!g.core.sameInstance(l)) return !0
        if (f && c) {
          if ((e && e.stopPropagation(), g.$el.find("img.fr-error").left))
            return !1
          ;(f = null),
            p.hide(),
            S(),
            r(),
            g.undo.saveStep(),
            g.events.trigger("image.resizeEnd", [ye()])
        } else l.removeClass("fr-active")
      }
      function I(e, t, a) {
        g.edit.on(),
          c && c.addClass("fr-error"),
          n[e]
            ? B(g.language.translate(n[e]))
            : B(
                g.language.translate("Something went wrong. Please try again."),
              ),
          !c && a && te(a),
          g.events.trigger("image.error", [{ code: e, message: n[e] }, t, a])
      }
      function P(e) {
        if (e)
          return (
            g.$wp &&
              g.events.$on(g.$wp, "scroll.image-edit", function () {
                c &&
                  g.popups.isVisible("image.edit") &&
                  (g.events.disableBlur(), r())
              }),
            !0
          )
        let t = ""
        if (0 < g.opts.imageEditButtons.length) {
          let a = {
            buttons: (t += '<div class="fr-buttons"> \n        '.concat(
              g.button.buildList(g.opts.imageEditButtons),
              "\n        </div>",
            )),
          }
          return g.popups.create("image.edit", a)
        }
        return !1
      }
      function O(e) {
        let t = g.popups.get("image.insert")
        if (
          (t || (t = X()),
          t
            .find(".fr-layer.fr-active")
            .removeClass("fr-active")
            .addClass("fr-pactive"),
          t.find(".fr-image-progress-bar-layer").addClass("fr-active"),
          t.find(".fr-buttons").hide(),
          c)
        ) {
          let a = we()
          g.popups.setContainer("image.insert", g.$sc)
          let i = a.offset().left,
            n = a.offset().top + a.height()
          g.popups.show("image.insert", i, n, a.outerHeight())
        }
        void 0 === e && N(g.language.translate("Uploading"), 0)
      }
      function k(e) {
        let t = g.popups.get("image.insert")
        if (
          t &&
          (t
            .find(".fr-layer.fr-pactive")
            .addClass("fr-active")
            .removeClass("fr-pactive"),
          t.find(".fr-image-progress-bar-layer").removeClass("fr-active"),
          t.find(".fr-buttons").show(),
          e || g.$el.find("img.fr-error").length)
        ) {
          if (
            (g.events.focus(),
            g.$el.find("img.fr-error").length &&
              (g.$el.find("img.fr-error").remove(),
              g.undo.saveStep(),
              g.undo.run(),
              g.undo.dropRedo()),
            !g.$wp && c)
          ) {
            let a = c
            pe(!0), g.selection.setAfter(a.get(0)), g.selection.restore()
          }
          g.popups.hide("image.insert")
        }
      }
      function N(e, t) {
        let a = g.popups.get("image.insert")
        if (a) {
          let i = a.find(".fr-image-progress-bar-layer")
          i.find("h3").text(e + (t ? " ".concat(t, "%") : "")),
            i.removeClass("fr-error"),
            t
              ? (i.find("div").removeClass("fr-indeterminate"),
                i.find("div > span").css("width", "".concat(t, "%")))
              : i.find("div").addClass("fr-indeterminate")
        }
      }
      function B(e) {
        O()
        let t = g.popups
          .get("image.insert")
          .find(".fr-image-progress-bar-layer")
        t.addClass("fr-error")
        let a = t.find("h3")
        a.text(e), g.events.disableBlur(), a.focus()
      }
      function T(e) {
        fe.call(e.get(0))
      }
      function _() {
        let e = d(this)
        g.popups.hide("image.insert"),
          e.removeClass("fr-uploading"),
          e.next().is("br") && e.next().remove(),
          T(e),
          g.events.trigger("image.loaded", [e])
      }
      function L(s, e, o, l, f) {
        l && "string" == typeof l && (l = g.$(l)),
          g.edit.off(),
          N(g.language.translate("Loading image")),
          e && (s = g.helpers.sanitizeURL(s))
        let t = new Image()
        ;(t.onload = function () {
          let e, t
          if (l) {
            g.undo.canDo() || l.hasClass("fr-uploading") || g.undo.saveStep()
            let a = l.data("fr-old-src")
            l.data("fr-image-pasted") && (a = null),
              g.$wp
                ? ((e = l
                    .clone()
                    .removeData("fr-old-src")
                    .removeClass("fr-uploading")
                    .removeAttr("data-fr-image-pasted")).off("load"),
                  a && l.attr("src", a),
                  l.replaceWith(e))
                : (e = l)
            for (let i = e.get(0).attributes, n = 0; n < i.length; n++) {
              let r = i[n]
              0 === r.nodeName.indexOf("data-") && e.removeAttr(r.nodeName)
            }
            if (void 0 !== o)
              for (t in o)
                o.hasOwnProperty(t) &&
                  "link" != t &&
                  e.attr("data-".concat(t), o[t])
            e.on("load", _),
              e.attr("src", s),
              e.attr("sizes", "100vw"),
              e.attr("srcset", f),
              g.edit.on(),
              E(!1),
              g.undo.saveStep(),
              g.events.disableBlur(),
              g.$el.blur(),
              g.events.trigger(a ? "image.replaced" : "image.inserted", [e, f])
          } else {
            ;(e = Y(s, o, _)),
              E(!1),
              g.undo.saveStep(),
              g.events.disableBlur(),
              g.$el.blur(),
              g.events.trigger("image.inserted", [e, f])
          }
        }),
          (t.onerror = function () {
            I(i)
          }),
          O(g.language.translate("Loading image")),
          (t.src = s)
      }
      function M(e) {
        N(g.language.translate("Loading image"))
        let t = this.status,
          a = this.response,
          i = this.responseXML,
          n = this.responseText
        try {
          if (g.opts.imageUploadToS3)
            if (201 == t) {
              let r = (function o(e) {
                try {
                  let t = d(e).find("Location").text(),
                    a = d(e).find("Key").text()
                  return !1 ===
                    g.events.trigger("image.uploadedToS3", [t, a, e], !0)
                    ? (g.edit.on(), !1)
                    : t
                } catch (i) {
                  return I(h, e), !1
                }
              })(i)
              r && L(r, !1, [], e, a || i)
            } else I(h, a || i, e)
          else if (200 <= t && t < 300) {
            let s = (function l(e) {
              try {
                if (!1 === g.events.trigger("image.uploaded", [e], !0))
                  return g.edit.on(), !1
                let t = JSON.parse(e)
                return t.link ? t : (I(m, e), !1)
              } catch (a) {
                return I(h, e), !1
              }
            })(n)
            s && L(s.link, !1, s, e, a || n)
          } else I(u, a || n, e)
        } catch (f) {
          I(h, a || n, e)
        }
      }
      function z() {
        I(h, this.response || this.responseText || this.responseXML)
      }
      function K(e) {
        if (e.lengthComputable) {
          let t = ((e.loaded / e.total) * 100) | 0
          N(g.language.translate("Uploading"), t)
        }
      }
      function Y(e, t, a) {
        let i,
          n = d(document.createElement("img")).attr("src", e)
        if (t && void 0 !== t)
          for (i in t)
            t.hasOwnProperty(i) &&
              "link" != i &&
              (" data-".concat(i, '="').concat(t[i], '"'),
              n.attr("data-str".concat(i), t[i]))
        let r = g.opts.imageDefaultWidth
        r &&
          "auto" != r &&
          (r = g.opts.imageResizeWithPercent ? "100%" : "".concat(r, "px")),
          n.attr("style", r ? "width: ".concat(r, ";") : ""),
          me(n, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign),
          n.on("load", a),
          n.on("error", a),
          g.edit.on(),
          g.events.focus(!0),
          g.selection.restore(),
          g.undo.saveStep(),
          g.opts.imageSplitHTML ? g.markers.split() : g.markers.insert(),
          g.html.wrap()
        let s = g.$el.find(".fr-marker")
        return (
          s.length
            ? (s.parent().is("hr") && s.parent().after(s),
              g.node.isLastSibling(s) &&
                s.parent().hasClass("fr-deletable") &&
                s.insertAfter(s.parent()),
              s.replaceWith(n))
            : g.$el.append(n),
          g.selection.clear(),
          n
        )
      }
      function W() {
        g.edit.on(), k(!0)
      }
      function G(e, t) {
        if (void 0 !== e && 0 < e.length) {
          if (!1 === g.events.trigger("image.beforeUpload", [e, t])) return !1
          let a,
            i = e[0]
          if (
            (null === g.opts.imageUploadURL || g.opts.imageUploadURL == s) &&
            !g.opts.imageUploadToS3
          )
            return (
              (function o(n, r) {
                let s = new FileReader()
                ;(s.onload = function () {
                  let e = s.result
                  if (s.result.indexOf("svg+xml") < 0) {
                    for (
                      var t = atob(s.result.split(",")[1]), a = [], i = 0;
                      i < t.length;
                      i++
                    )
                      a.push(t.charCodeAt(i))
                    ;(e = window.URL.createObjectURL(
                      new Blob([new Uint8Array(a)], { type: n.type }),
                    )),
                      g.image.insert(e, !1, null, r)
                  }
                }),
                  O(),
                  s.readAsDataURL(n)
              })(i, t || c),
              !1
            )
          if (
            (i.name ||
              (i.name =
                new Date().getTime() +
                "." +
                (i.type || "image/jpeg").replace(/image\//g, "")),
            i.size > g.opts.imageMaxSize)
          )
            return I(v), !1
          if (
            g.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, "")) < 0
          )
            return I(b), !1
          if (
            (g.drag_support.formdata &&
              (a = g.drag_support.formdata ? new FormData() : null),
            a)
          ) {
            let n
            if (!1 !== g.opts.imageUploadToS3)
              for (n in (a.append(
                "key",
                g.opts.imageUploadToS3.keyStart +
                  new Date().getTime() +
                  "-" +
                  (i.name || "untitled"),
              ),
              a.append("success_action_status", "201"),
              a.append("X-Requested-With", "xhr"),
              a.append("Content-Type", i.type),
              g.opts.imageUploadToS3.params))
                g.opts.imageUploadToS3.params.hasOwnProperty(n) &&
                  a.append(n, g.opts.imageUploadToS3.params[n])
            for (n in g.opts.imageUploadParams)
              g.opts.imageUploadParams.hasOwnProperty(n) &&
                a.append(n, g.opts.imageUploadParams[n])
            a.append(g.opts.imageUploadParam, i, i.name)
            let r = g.opts.imageUploadURL
            g.opts.imageUploadToS3 &&
              (r = g.opts.imageUploadToS3.uploadURL
                ? g.opts.imageUploadToS3.uploadURL
                : "https://"
                    .concat(g.opts.imageUploadToS3.region, ".amazonaws.com/")
                    .concat(g.opts.imageUploadToS3.bucket)),
              (function l(t, a, e, n) {
                function r() {
                  let e = d(this)
                  e.off("load"),
                    e.addClass("fr-uploading"),
                    e.next().is("br") && e.next().remove(),
                    g.placeholder.refresh(),
                    T(e),
                    S(),
                    O(),
                    g.edit.off(),
                    (t.onload = function () {
                      M.call(t, e)
                    }),
                    (t.onerror = z),
                    (t.upload.onprogress = K),
                    (t.onabort = W),
                    d(e.off("abortUpload")).on("abortUpload", function () {
                      4 != t.readyState &&
                        (t.abort(),
                        n
                          ? (n.attr("src", n.data("fr-old-src")),
                            n.removeClass("fr-uploading"))
                          : e.remove(),
                        pe(!0))
                    }),
                    t.send(a)
                }
                let s = new FileReader()
                ;(s.onload = function () {
                  let e = s.result
                  if (s.result.indexOf("svg+xml") < 0) {
                    for (
                      var t = atob(s.result.split(",")[1]), a = [], i = 0;
                      i < t.length;
                      i++
                    )
                      a.push(t.charCodeAt(i))
                    e = window.URL.createObjectURL(
                      new Blob([new Uint8Array(a)], { type: "image/jpeg" }),
                    )
                  }
                  n
                    ? (n.on("load", r),
                      n.on("error", function () {
                        r(), d(this).off("error")
                      }),
                      g.edit.on(),
                      g.undo.saveStep(),
                      n.data("fr-old-src", n.attr("src")),
                      n.attr("src", e))
                    : Y(e, null, r)
                }),
                  s.readAsDataURL(e)
              })(g.core.getXHR(r, g.opts.imageUploadMethod), a, i, t || c)
          }
        }
      }
      function H(e) {
        if (e.is("img") && 0 < e.parents(".fr-img-caption").length)
          return e.parents(".fr-img-caption")
      }
      function V(e) {
        let t = e.originalEvent.dataTransfer
        if (t && t.files && t.files.length) {
          let a = t.files[0]
          if (
            a &&
            a.type &&
            -1 !== a.type.indexOf("image") &&
            0 <=
              g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, ""))
          ) {
            if (!g.opts.imageUpload)
              return e.preventDefault(), e.stopPropagation(), !1
            g.markers.remove(),
              g.markers.insertAtPoint(e.originalEvent),
              g.$el.find(".fr-marker").replaceWith(_e.MARKERS),
              0 === g.$el.find(".fr-marker").length &&
                g.selection.setAtEnd(g.el),
              g.popups.hideAll()
            let i = g.popups.get("image.insert")
            i || (i = X()), g.popups.setContainer("image.insert", g.$sc)
            let n = e.originalEvent.pageX,
              r = e.originalEvent.pageY
            if (g.opts.iframe) {
              let s = g.helpers.getPX(
                  g.$wp.find(".fr-iframe").css("padding-top"),
                ),
                o = g.helpers.getPX(
                  g.$wp.find(".fr-iframe").css("padding-left"),
                )
              ;(r += g.$iframe.offset().top + s),
                (n += g.$iframe.offset().left + o)
            }
            return (
              g.popups.show("image.insert", n, r),
              O(),
              0 <=
              g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, ""))
                ? (pe(!0), G(t.files))
                : I(b),
              e.preventDefault(),
              e.stopPropagation(),
              !1
            )
          }
        }
      }
      function X(e) {
        if (e)
          return (
            g.popups.onRefresh("image.insert", y),
            g.popups.onHide("image.insert", w),
            !0
          )
        let t,
          a,
          i = ""
        g.opts.imageUpload ||
          -1 === g.opts.imageInsertButtons.indexOf("imageUpload") ||
          g.opts.imageInsertButtons.splice(
            g.opts.imageInsertButtons.indexOf("imageUpload"),
            1,
          )
        let n = g.button.buildList(g.opts.imageInsertButtons)
        "" !== n && (i = '<div class="fr-buttons fr-tabs">'.concat(n, "</div>"))
        let r = g.opts.imageInsertButtons.indexOf("imageUpload"),
          s = g.opts.imageInsertButtons.indexOf("imageByURL"),
          o = ""
        0 <= r &&
          ((t = " fr-active"),
          0 <= s && s < r && (t = ""),
          (o = '<div class="fr-image-upload-layer'
            .concat(t, ' fr-layer" id="fr-image-upload-layer-')
            .concat(g.id, '"><strong>')
            .concat(g.language.translate("Drop image"), "</strong><br>(")
            .concat(
              g.language.translate("or click"),
              ')<div class="fr-form"><input type="file" accept="image/',
            )
            .concat(
              g.opts.imageAllowedTypes.join(", image/").toLowerCase(),
              '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-',
            )
            .concat(g.id, '" role="button"></div></div>')))
        let l = ""
        0 <= s &&
          ((t = " fr-active"),
          0 <= r && r < s && (t = ""),
          (l = '<div class="fr-image-by-url-layer'
            .concat(t, ' fr-layer" id="fr-image-by-url-layer-')
            .concat(
              g.id,
              '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-',
            )
            .concat(
              g.id,
              '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">',
            )
            .concat(g.language.translate("Insert"), "</button></div></div>")))
        let f = {
          buttons: i,
          upload_layer: o,
          by_url_layer: l,
          progress_bar:
            '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>',
        }
        return (
          1 <= g.opts.imageInsertButtons.length &&
            (a = g.popups.create("image.insert", f)),
          g.$wp &&
            g.events.$on(g.$wp, "scroll", function () {
              c && g.popups.isVisible("image.insert") && ve()
            }),
          (function p(i) {
            g.events.$on(
              i,
              "dragover dragenter",
              ".fr-image-upload-layer",
              function (e) {
                return (
                  d(this).addClass("fr-drop"),
                  (g.browser.msie || g.browser.edge) && e.preventDefault(),
                  !1
                )
              },
              !0,
            ),
              g.events.$on(
                i,
                "dragleave dragend",
                ".fr-image-upload-layer",
                function (e) {
                  return (
                    d(this).removeClass("fr-drop"),
                    (g.browser.msie || g.browser.edge) && e.preventDefault(),
                    !1
                  )
                },
                !0,
              ),
              g.events.$on(
                i,
                "drop",
                ".fr-image-upload-layer",
                function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    d(this).removeClass("fr-drop")
                  let t = e.originalEvent.dataTransfer
                  if (t && t.files) {
                    let a = i.data("instance") || g
                    a.events.disableBlur(),
                      a.image.upload(t.files),
                      a.events.enableBlur()
                  }
                },
                !0,
              ),
              g.helpers.isIOS() &&
                g.events.$on(
                  i,
                  "touchstart",
                  '.fr-image-upload-layer input[type="file"]',
                  function () {
                    d(this).trigger("click")
                  },
                  !0,
                ),
              g.events.$on(
                i,
                "change",
                '.fr-image-upload-layer input[type="file"]',
                function () {
                  if (this.files) {
                    let e = i.data("instance") || g
                    e.events.disableBlur(),
                      i.find("input:focus").blur(),
                      e.events.enableBlur(),
                      e.image.upload(this.files, c)
                  }
                  d(this).val("")
                },
                !0,
              )
          })(a),
          a
        )
      }
      function F() {
        c &&
          g.popups
            .get("image.alt")
            .find("input")
            .val(c.attr("alt") || "")
            .trigger("change")
      }
      function j() {
        let e = g.popups.get("image.alt")
        e || (e = q()),
          k(),
          g.popups.refresh("image.alt"),
          g.popups.setContainer("image.alt", g.$sc)
        let t = we()
        Ce() && (t = t.find(".fr-img-wrap"))
        let a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight()
        g.popups.show("image.alt", a, i, t.outerHeight(), !0)
      }
      function q(e) {
        if (e) return g.popups.onRefresh("image.alt", F), !0
        let t = {
            buttons: '<div class="fr-buttons fr-tabs">'.concat(
              g.button.buildList(g.opts.imageAltButtons),
              "</div>",
            ),
            alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'
              .concat(
                g.id,
                '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-',
              )
              .concat(g.id, '" type="text" placeholder="')
              .concat(
                g.language.translate("Alternative Text"),
                '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">',
              )
              .concat(g.language.translate("Update"), "</button></div></div>"),
          },
          a = g.popups.create("image.alt", t)
        return (
          g.$wp &&
            g.events.$on(g.$wp, "scroll.image-alt", function () {
              c && g.popups.isVisible("image.alt") && j()
            }),
          a
        )
      }
      function Q() {
        let e = g.popups.get("image.size")
        if (c)
          if (Ce()) {
            let t = c.parent()
            t.get(0).style.width || (t = c.parent().parent()),
              e
                .find('input[name="width"]')
                .val(t.get(0).style.width)
                .trigger("change"),
              e
                .find('input[name="height"]')
                .val(t.get(0).style.height)
                .trigger("change")
          } else
            e
              .find('input[name="width"]')
              .val(c.get(0).style.width)
              .trigger("change"),
              e
                .find('input[name="height"]')
                .val(c.get(0).style.height)
                .trigger("change")
      }
      function J() {
        let e = g.popups.get("image.size")
        e || (e = Z()),
          k(),
          g.popups.refresh("image.size"),
          g.popups.setContainer("image.size", g.$sc)
        let t = we()
        Ce() && (t = t.find(".fr-img-wrap"))
        let a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight()
        g.popups.show("image.size", a, i, t.outerHeight(), !0)
      }
      function Z(e) {
        if (e) return g.popups.onRefresh("image.size", Q), !0
        let t = {
            buttons: '<div class="fr-buttons fr-tabs">'.concat(
              g.button.buildList(g.opts.imageSizeButtons),
              "</div>",
            ),
            size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'
              .concat(
                g.id,
                '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-\'',
              )
              .concat(g.id, '" type="text" name="width" placeholder="')
              .concat(
                g.language.translate("Width"),
                '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height',
              )
              .concat(g.id, '" type="text" name="height" placeholder="')
              .concat(
                g.language.translate("Height"),
                '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">',
              )
              .concat(g.language.translate("Update"), "</button></div></div>"),
          },
          a = g.popups.create("image.size", t)
        return (
          g.$wp &&
            g.events.$on(g.$wp, "scroll.image-size", function () {
              c && g.popups.isVisible("image.size") && J()
            }),
          a
        )
      }
      function ee(e, t, a, i) {
        return (
          (e.pageX = t),
          x.call(this, e),
          (e.pageX = e.pageX + a * Math.floor(Math.pow(1.1, i))),
          $.call(this, e),
          U.call(this, e),
          ++i
        )
      }
      function te(e) {
        ;(e = e || we()) &&
          !1 !== g.events.trigger("image.beforeRemove", [e]) &&
          (g.popups.hideAll(),
          be(),
          pe(!0),
          g.undo.canDo() || g.undo.saveStep(),
          e.get(0) == g.el
            ? e.removeAttr("src")
            : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName
                ? (g.selection.setBefore(e.get(0).parentNode) ||
                    g.selection.setAfter(e.get(0).parentNode) ||
                    e.parent().after(_e.MARKERS),
                  d(e.get(0).parentNode).remove())
                : (g.selection.setBefore(e.get(0)) ||
                    g.selection.setAfter(e.get(0)) ||
                    e.after(_e.MARKERS),
                  e.remove()),
              g.html.fillEmptyBlocks(),
              g.selection.restore()),
          g.undo.saveStep())
      }
      function ae(e) {
        let t = e.which
        if (c && (t == _e.KEYCODE.BACKSPACE || t == _e.KEYCODE.DELETE))
          return e.preventDefault(), e.stopPropagation(), te(), !1
        if (c && t == _e.KEYCODE.ESC) {
          let a = c
          return (
            pe(!0),
            g.selection.setAfter(a.get(0)),
            g.selection.restore(),
            e.preventDefault(),
            !1
          )
        }
        if (!c || (t != _e.KEYCODE.ARROW_LEFT && t != _e.KEYCODE.ARROW_RIGHT))
          return c && t === _e.KEYCODE.TAB
            ? (e.preventDefault(), e.stopPropagation(), pe(!0), !1)
            : c && t != _e.KEYCODE.F10 && !g.keys.isBrowserAction(e)
            ? (e.preventDefault(), e.stopPropagation(), !1)
            : void 0
        let i = c.get(0)
        return (
          pe(!0),
          t == _e.KEYCODE.ARROW_LEFT
            ? g.selection.setBefore(i)
            : g.selection.setAfter(i),
          g.selection.restore(),
          e.preventDefault(),
          !1
        )
      }
      function ie(e) {
        if (e && "IMG" == e.tagName) {
          if (
            (g.node.hasClass(e, "fr-uploading") ||
            g.node.hasClass(e, "fr-error")
              ? e.parentNode.removeChild(e)
              : g.node.hasClass(e, "fr-draggable") &&
                e.classList.remove("fr-draggable"),
            e.parentNode &&
              e.parentNode.parentNode &&
              g.node.hasClass(e.parentNode.parentNode, "fr-img-caption"))
          ) {
            let t = e.parentNode.parentNode
            t.removeAttribute("contenteditable"),
              t.removeAttribute("draggable"),
              t.classList.remove("fr-draggable")
            let a = e.nextSibling
            a && a.removeAttribute("contenteditable")
          }
        } else if (e && e.nodeType == Node.ELEMENT_NODE)
          for (
            let i = e.querySelectorAll(
                "img.fr-uploading, img.fr-error, img.fr-draggable",
              ),
              n = 0;
            n < i.length;
            n++
          )
            ie(i[n])
      }
      function ne(e) {
        if (!1 === g.events.trigger("image.beforePasteUpload", [e])) return !1
        ;(c = d(e)),
          S(),
          r(),
          ve(),
          O(),
          c.on("load", function () {
            let t = []
            S(),
              d(g.popups.get("image.insert").get(0)).find(
                "div.fr-active.fr-error",
              ).length < 1 && O(),
              d(this)
                .data("events")
                .find(function (e) {
                  "load" === e[0] && t.push(e)
                }),
              t.length <= 1 && d(this).off("load")
          })
        for (
          var t = d(e).attr("src").split(","), a = atob(t[1]), i = [], n = 0;
          n < a.length;
          n++
        )
          i.push(a.charCodeAt(n))
        G(
          [
            new Blob([new Uint8Array(i)], {
              type: t[0].replace(/data\:/g, "").replace(/;base64/g, ""),
            }),
          ],
          c,
        )
      }
      function re() {
        g.opts.imagePaste
          ? g.$el.find("img[data-fr-image-pasted]").each(function (e, i) {
              if (g.opts.imagePasteProcess) {
                let t = g.opts.imageDefaultWidth
                t &&
                  "auto" != t &&
                  (t += g.opts.imageResizeWithPercent ? "%" : "px"),
                  d(i)
                    .css("width", t)
                    .removeClass("fr-dii fr-dib fr-fir fr-fil"),
                  me(d(i), g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign)
              }
              if (0 === i.src.indexOf("data:")) ne(i)
              else if (
                0 === i.src.indexOf("blob:") ||
                (0 === i.src.indexOf("http") &&
                  g.opts.imageUploadRemoteUrls &&
                  g.opts.imageCORSProxy)
              ) {
                let a = new Image()
                ;(a.crossOrigin = "Anonymous"),
                  (a.onload = function () {
                    let e,
                      t = g.o_doc.createElement("CANVAS"),
                      a = t.getContext("2d")
                    ;(t.height = this.naturalHeight),
                      (t.width = this.naturalWidth),
                      a.drawImage(this, 0, 0),
                      setTimeout(function () {
                        ne(i)
                      }, 0),
                      (e =
                        2e3 < this.naturalWidth || 1500 < this.naturalHeight
                          ? "jpeg"
                          : "png"),
                      (i.src = t.toDataURL("image/".concat(e)))
                  }),
                  (a.src =
                    (0 === i.src.indexOf("blob:")
                      ? ""
                      : "".concat(g.opts.imageCORSProxy, "/")) + i.src)
              } else
                0 !== i.src.indexOf("http") ||
                0 === i.src.indexOf("https://mail.google.com/mail")
                  ? (g.selection.save(), d(i).remove(), g.selection.restore())
                  : d(i).removeAttr("data-fr-image-pasted")
            })
          : g.$el.find("img[data-fr-image-pasted]").remove()
      }
      function se(e) {
        let t = e.target.result,
          a = g.opts.imageDefaultWidth
        a && "auto" != a && (a += g.opts.imageResizeWithPercent ? "%" : "px"),
          g.undo.saveStep(),
          g.html.insert(
            '<img data-fr-image-pasted="true" src="'
              .concat(t, '"')
              .concat(a ? ' style="width: '.concat(a, ';"') : "", ">"),
          )
        let i = g.$el.find('img[data-fr-image-pasted="true"]')
        i && me(i, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign),
          g.events.trigger("paste.after")
      }
      function oe(e) {
        if (e && e.clipboardData && e.clipboardData.items) {
          let t = null
          if (
            (e.clipboardData.types &&
              -1 != [].indexOf.call(e.clipboardData.types, "text/rtf")) ||
            e.clipboardData.getData("text/rtf")
          )
            t = e.clipboardData.items[0].getAsFile()
          else
            for (
              let a = 0;
              a < e.clipboardData.items.length &&
              !(t = e.clipboardData.items[a].getAsFile());
              a++
            );
          if (t)
            return (
              (function i(e) {
                let t = new FileReader()
                ;(t.onload = se), t.readAsDataURL(e)
              })(t),
              !1
            )
        }
      }
      function le(e) {
        return (e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" '))
      }
      function fe(e) {
        if (
          "false" ==
          d(this)
            .parents("[contenteditable]")
            .not(".fr-element")
            .not(".fr-img-caption")
            .not("body")
            .first()
            .attr("contenteditable")
        )
          return !0
        if (e && "touchend" == e.type && a) return !0
        if (e && g.edit.isDisabled())
          return e.stopPropagation(), e.preventDefault(), !1
        for (let t = 0; t < _e.INSTANCES.length; t++)
          _e.INSTANCES[t] != g &&
            _e.INSTANCES[t].events.trigger("image.hideResizer")
        g.toolbar.disable(),
          e && (e.stopPropagation(), e.preventDefault()),
          g.helpers.isMobile() &&
            (g.events.disableBlur(), g.$el.blur(), g.events.enableBlur()),
          g.opts.iframe && g.size.syncIframe(),
          (c = d(this)),
          be(),
          S(),
          r(),
          g.browser.msie
            ? (g.popups.areVisible() && g.events.disableBlur(),
              g.win.getSelection &&
                (g.win.getSelection().removeAllRanges(),
                g.win.getSelection().addRange(g.doc.createRange())))
            : g.selection.clear(),
          g.helpers.isIOS() && (g.events.disableBlur(), g.$el.blur()),
          g.button.bulkRefresh(),
          g.events.trigger("video.hideResizer")
      }
      function pe(e) {
        c &&
          ((function t() {
            return ge
          })() ||
            !0 === e) &&
          (g.toolbar.enable(),
          l.removeClass("fr-active"),
          g.popups.hide("image.edit"),
          (c = null),
          de(),
          (f = null),
          p && p.hide())
      }
      ;(n[i] = "Image cannot be loaded from the passed link."),
        (n[m] = "No link in upload response."),
        (n[u] = "Error during file upload."),
        (n[h] = "Parsing response failed."),
        (n[v] = "File is too large."),
        (n[b] = "Image file type is invalid."),
        (n[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.")
      var ge = !(n[8] = "Image file is corrupted.")
      function ce() {
        ge = !0
      }
      function de() {
        ge = !1
      }
      function me(e, t, a) {
        !g.opts.htmlUntouched && g.opts.useClasses
          ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"),
            a && e.addClass("fr-fi".concat(a[0])),
            t && e.addClass("fr-di".concat(t[0])))
          : "inline" == t
          ? (e.css({
              display: "inline-block",
              verticalAlign: "bottom",
              margin: g.opts.imageDefaultMargin,
            }),
            "center" == a
              ? e.css({
                  float: "none",
                  marginBottom: "",
                  marginTop: "",
                  maxWidth: "calc(100% - ".concat(
                    2 * g.opts.imageDefaultMargin,
                    "px)",
                  ),
                  textAlign: "center",
                })
              : "left" == a
              ? e.css({
                  float: "left",
                  marginLeft: 0,
                  maxWidth: "calc(100% - ".concat(
                    g.opts.imageDefaultMargin,
                    "px)",
                  ),
                  textAlign: "left",
                })
              : e.css({
                  float: "right",
                  marginRight: 0,
                  maxWidth: "calc(100% - ".concat(
                    g.opts.imageDefaultMargin,
                    "px)",
                  ),
                  textAlign: "right",
                }))
          : "block" == t &&
            (e.css({
              display: "block",
              float: "none",
              verticalAlign: "top",
              margin: "".concat(g.opts.imageDefaultMargin, "px auto"),
              textAlign: "center",
            }),
            "left" == a
              ? e.css({ marginLeft: 0, textAlign: "left" })
              : "right" == a && e.css({ marginRight: 0, textAlign: "right" }))
      }
      function ue(e) {
        if ((void 0 === e && (e = we()), e)) {
          if (e.hasClass("fr-fil")) return "left"
          if (e.hasClass("fr-fir")) return "right"
          if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center"
          let t = e.css("float")
          if ((e.css("float", "none"), "block" == e.css("display"))) {
            if (
              (e.css("float", ""),
              e.css("float") != t && e.css("float", t),
              0 === parseInt(e.css("margin-left"), 10))
            )
              return "left"
            if (0 === parseInt(e.css("margin-right"), 10)) return "right"
          } else {
            if (
              (e.css("float", ""),
              e.css("float") != t && e.css("float", t),
              "left" == e.css("float"))
            )
              return "left"
            if ("right" == e.css("float")) return "right"
          }
        }
        return "center"
      }
      function he(e) {
        void 0 === e && (e = we())
        let t = e.css("float")
        return (
          e.css("float", "none"),
          "block" == e.css("display")
            ? (e.css("float", ""),
              e.css("float") != t && e.css("float", t),
              "block")
            : (e.css("float", ""),
              e.css("float") != t && e.css("float", t),
              "inline")
        )
      }
      function ve() {
        let e = g.popups.get("image.insert")
        e || (e = X()),
          g.popups.isVisible("image.insert") ||
            (k(),
            g.popups.refresh("image.insert"),
            g.popups.setContainer("image.insert", g.$sc))
        let t = we()
        Ce() && (t = t.find(".fr-img-wrap"))
        let a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight()
        g.popups.show("image.insert", a, i, t.outerHeight(!0), !0)
      }
      function be() {
        if (c) {
          g.events.disableBlur(), g.selection.clear()
          let e = g.doc.createRange()
          e.selectNode(c.get(0)),
            g.browser.msie && e.collapse(!0),
            g.selection.get().addRange(e),
            g.events.enableBlur()
        }
      }
      function ye() {
        return c
      }
      function we() {
        return Ce() ? c.parents(".fr-img-caption").first() : c
      }
      function Ce() {
        return !!c && 0 < c.parents(".fr-img-caption").length
      }
      return {
        _init: function Ae() {
          let i
          ;(function e() {
            g.events.$on(
              g.$el,
              g._mousedown,
              "IMG" == g.el.tagName
                ? null
                : 'img:not([contenteditable="false"])',
              function (e) {
                if (
                  "false" ==
                  d(this)
                    .parents("contenteditable")
                    .not(".fr-element")
                    .not(".fr-img-caption")
                    .not("body")
                    .first()
                    .attr("contenteditable")
                )
                  return !0
                g.helpers.isMobile() || g.selection.clear(),
                  (t = !0),
                  g.popups.areVisible() && g.events.disableBlur(),
                  g.browser.msie &&
                    (g.events.disableBlur(), g.$el.attr("contenteditable", !1)),
                  g.draggable || "touchstart" == e.type || e.preventDefault(),
                  e.stopPropagation()
              },
            ),
              g.events.$on(
                g.$el,
                g._mousedown,
                ".fr-img-caption .fr-inner",
                function (e) {
                  g.core.hasFocus() || g.events.focus(), e.stopPropagation()
                },
              ),
              g.events.$on(
                g.$el,
                "paste",
                ".fr-img-caption .fr-inner",
                function (e) {
                  g.toolbar.hide(), e.stopPropagation()
                },
              ),
              g.events.$on(
                g.$el,
                g._mouseup,
                "IMG" == g.el.tagName
                  ? null
                  : 'img:not([contenteditable="false"])',
                function (e) {
                  if (
                    "false" ==
                    d(this)
                      .parents("contenteditable")
                      .not(".fr-element")
                      .not(".fr-img-caption")
                      .not("body")
                      .first()
                      .attr("contenteditable")
                  )
                    return !0
                  t &&
                    ((t = !1),
                    e.stopPropagation(),
                    g.browser.msie &&
                      (g.$el.attr("contenteditable", !0),
                      g.events.enableBlur()))
                },
              ),
              g.events.on(
                "keyup",
                function (e) {
                  if (
                    e.shiftKey &&
                    "" === g.selection.text().replace(/\n/g, "") &&
                    g.keys.isArrow(e.which)
                  ) {
                    let t = g.selection.element(),
                      a = g.selection.endElement()
                    t && "IMG" == t.tagName
                      ? T(d(t))
                      : a && "IMG" == a.tagName && T(d(a))
                  }
                },
                !0,
              ),
              g.events.on("drop", V),
              g.events.on("element.beforeDrop", H),
              g.events.on("window.mousedown", ce),
              g.events.on("window.touchmove", de),
              g.events.on("mouseup window.mouseup", function () {
                if (c) return pe(), !1
                de()
              }),
              g.events.on("commands.mousedown", function (e) {
                0 < e.parents(".fr-toolbar").length && pe()
              }),
              g.events.on("image.resizeEnd", function () {
                g.opts.iframe && g.size.syncIframe()
              }),
              g.events.on(
                "blur image.hideResizer commands.undo commands.redo element.dropped",
                function () {
                  pe(!(t = !1))
                },
              ),
              g.events.on("modals.hide", function () {
                c && (be(), g.selection.clear())
              }),
              g.events.on("image.resizeEnd", function () {
                g.win.getSelection && T(c)
              }),
              g.opts.imageAddNewLine &&
                g.events.on("image.inserted", function (e) {
                  let t = e.get(0)
                  for (
                    t.nextSibling &&
                    "BR" === t.nextSibling.tagName &&
                    (t = t.nextSibling);
                    t && !g.node.isElement(t);

                  )
                    t = g.node.isLastSibling(t) ? t.parentNode : null
                  g.node.isElement(t) &&
                    (g.opts.enter === _e.ENTER_BR
                      ? e.after("<br>")
                      : d(g.node.blockParent(e.get(0))).after(
                          "<"
                            .concat(g.html.defaultTag(), "><br></")
                            .concat(g.html.defaultTag(), ">"),
                        ))
                })
          })(),
            "IMG" == g.el.tagName && g.$el.addClass("fr-view"),
            g.events.$on(
              g.$el,
              g.helpers.isMobile() && !g.helpers.isWindowsPhone()
                ? "touchend"
                : "click",
              "IMG" == g.el.tagName
                ? null
                : 'img:not([contenteditable="false"])',
              fe,
            ),
            g.helpers.isMobile() &&
              (g.events.$on(
                g.$el,
                "touchstart",
                "IMG" == g.el.tagName
                  ? null
                  : 'img:not([contenteditable="false"])',
                function () {
                  a = !1
                },
              ),
              g.events.$on(g.$el, "touchmove", function () {
                a = !0
              })),
            g.$wp
              ? (g.events.on("window.keydown keydown", ae, !0),
                g.events.on(
                  "keyup",
                  function (e) {
                    if (c && e.which == _e.KEYCODE.ENTER) return !1
                  },
                  !0,
                ),
                g.events.$on(g.$el, "keydown", function () {
                  let e = g.selection.element()
                  ;(e.nodeType === Node.TEXT_NODE ||
                    ("BR" == e.tagName && g.node.isLastSibling(e))) &&
                    (e = e.parentNode),
                    g.node.hasClass(e, "fr-inner") ||
                      (g.node.hasClass(e, "fr-img-caption") ||
                        (e = d(e).parents(".fr-img-caption").get(0)),
                      g.node.hasClass(e, "fr-img-caption") &&
                        (d(e).after(_e.INVISIBLE_SPACE + _e.MARKERS),
                        g.selection.restore()))
                }))
              : g.events.$on(g.$win, "keydown", ae),
            g.events.on(
              "toolbar.esc",
              function () {
                if (c) {
                  if (g.$wp) g.events.disableBlur(), g.events.focus()
                  else {
                    let e = c
                    pe(!0),
                      g.selection.setAfter(e.get(0)),
                      g.selection.restore()
                  }
                  return !1
                }
              },
              !0,
            ),
            g.events.on(
              "toolbar.focusEditor",
              function () {
                if (c) return !1
              },
              !0,
            ),
            g.events.on(
              "window.cut window.copy",
              function (e) {
                if (
                  c &&
                  g.popups.isVisible("image.edit") &&
                  !g.popups.get("image.edit").find(":focus").length
                ) {
                  let t = we()
                  Ce()
                    ? (t.before(_e.START_MARKER),
                      t.after(_e.END_MARKER),
                      g.selection.restore(),
                      g.paste.saveCopiedText(t.get(0).outerHTML, t.text()))
                    : (be(),
                      g.paste.saveCopiedText(
                        c.get(0).outerHTML,
                        c.attr("alt"),
                      )),
                    "copy" == e.type
                      ? setTimeout(function () {
                          T(c)
                        })
                      : (pe(!0),
                        g.undo.saveStep(),
                        setTimeout(function () {
                          g.undo.saveStep()
                        }, 0))
                }
              },
              !0,
            ),
            g.browser.msie &&
              g.events.on("keydown", function (e) {
                if (!g.selection.isCollapsed() || !c) return !0
                let t = e.which
                t == _e.KEYCODE.C && g.keys.ctrlKey(e)
                  ? g.events.trigger("window.copy")
                  : t == _e.KEYCODE.X &&
                    g.keys.ctrlKey(e) &&
                    g.events.trigger("window.cut")
              }),
            g.events.$on(d(g.o_win), "keydown", function (e) {
              let t = e.which
              if (c && t == _e.KEYCODE.BACKSPACE) return e.preventDefault(), !1
            }),
            g.events.$on(g.$win, "keydown", function (e) {
              let t = e.which
              c &&
                c.hasClass("fr-uploading") &&
                t == _e.KEYCODE.ESC &&
                c.trigger("abortUpload")
            }),
            g.events.on("destroy", function () {
              c && c.hasClass("fr-uploading") && c.trigger("abortUpload")
            }),
            g.events.on("paste.before", oe),
            g.events.on("paste.beforeCleanup", le),
            g.events.on("paste.after", re),
            g.events.on("html.set", A),
            g.events.on("html.inserted", A),
            A(),
            g.events.on("destroy", function () {
              o = []
            }),
            g.events.on("html.processGet", ie),
            g.opts.imageOutputSize &&
              g.events.on("html.beforeGet", function () {
                i = g.el.querySelectorAll("img")
                for (let e = 0; e < i.length; e++) {
                  let t = i[e].style.width || d(i[e]).width(),
                    a = i[e].style.height || d(i[e]).height()
                  t &&
                    i[e].setAttribute("width", "".concat(t).replace(/px/, "")),
                    a &&
                      i[e].setAttribute(
                        "height",
                        "".concat(a).replace(/px/, ""),
                      )
                }
              }),
            g.opts.iframe && g.events.on("image.loaded", g.size.syncIframe),
            g.$wp && (E(), g.events.on("contentChanged", E)),
            g.events.$on(d(g.o_win), "orientationchange.image", function () {
              setTimeout(function () {
                c && T(c)
              }, 100)
            }),
            P(!0),
            X(!0),
            Z(!0),
            q(!0),
            g.events.on("node.remove", function (e) {
              if ("IMG" == e.get(0).tagName) return te(e), !1
            })
        },
        showInsertPopup: function Ee() {
          let e = g.$tb.find('.fr-command[data-cmd="insertImage"]'),
            t = g.popups.get("image.insert")
          if ((t || (t = X()), k(), !t.hasClass("fr-active")))
            if (
              (g.popups.refresh("image.insert"),
              g.popups.setContainer("image.insert", g.$tb),
              e.isVisible())
            ) {
              let a = g.button.getPosition(e),
                i = a.left,
                n = a.top
              g.popups.show("image.insert", i, n, e.outerHeight())
            } else g.position.forSelection(t), g.popups.show("image.insert")
        },
        showLayer: function Se(e) {
          let t,
            a,
            i = g.popups.get("image.insert")
          if (c || g.opts.toolbarInline) {
            if (c) {
              let n = we()
              Ce() && (n = n.find(".fr-img-wrap")),
                (a = n.offset().top + n.outerHeight()),
                (t = n.offset().left)
            }
          } else {
            let r = g.$tb.find('.fr-command[data-cmd="insertImage"]')
            ;(t = r.offset().left),
              (a =
                r.offset().top +
                (g.opts.toolbarBottom ? 10 : r.outerHeight() - 10))
          }
          !c &&
            g.opts.toolbarInline &&
            ((a = i.offset().top - g.helpers.getPX(i.css("margin-top"))),
            i.hasClass("fr-above") && (a += i.outerHeight())),
            i.find(".fr-layer").removeClass("fr-active"),
            i.find(".fr-".concat(e, "-layer")).addClass("fr-active"),
            g.popups.show("image.insert", t, a, c ? c.outerHeight() : 0),
            g.accessibility.focusPopup(i)
        },
        refreshUploadButton: function Re(e) {
          let t = g.popups.get("image.insert")
          t &&
            t.find(".fr-image-upload-layer").hasClass("fr-active") &&
            e.addClass("fr-active").attr("aria-pressed", !0)
        },
        refreshByURLButton: function De(e) {
          let t = g.popups.get("image.insert")
          t &&
            t.find(".fr-image-by-url-layer").hasClass("fr-active") &&
            e.addClass("fr-active").attr("aria-pressed", !0)
        },
        upload: G,
        insertByURL: function xe() {
          let e = g.popups
            .get("image.insert")
            .find(".fr-image-by-url-layer input")
          if (0 < e.val().length) {
            O(), N(g.language.translate("Loading image"))
            let t = e.val().trim()
            if (
              g.opts.imageUploadRemoteUrls &&
              g.opts.imageCORSProxy &&
              g.opts.imageUpload
            ) {
              let a = new XMLHttpRequest()
              ;(a.onload = function () {
                200 == this.status
                  ? G(
                      [
                        new Blob([this.response], {
                          type: this.response.type || "image/png",
                        }),
                      ],
                      c,
                    )
                  : I(i)
              }),
                (a.onerror = function () {
                  L(t, !0, [], c)
                }),
                a.open(
                  "GET",
                  "".concat(g.opts.imageCORSProxy, "/").concat(t),
                  !0,
                ),
                (a.responseType = "blob"),
                a.send()
            } else L(t, !0, [], c)
            e.val(""), e.blur()
          }
        },
        align: function $e(e) {
          let t = we()
          t.removeClass("fr-fir fr-fil"),
            !g.opts.htmlUntouched && g.opts.useClasses
              ? "left" == e
                ? t.addClass("fr-fil")
                : "right" == e && t.addClass("fr-fir")
              : me(t, he(), e),
            be(),
            S(),
            r(),
            g.selection.clear()
        },
        refreshAlign: function Ue(e) {
          c &&
            e
              .find("> *")
              .first()
              .replaceWith(g.icon.create("image-align-".concat(ue())))
        },
        refreshAlignOnShow: function Ie(e, t) {
          c &&
            t
              .find('.fr-command[data-param1="'.concat(ue(), '"]'))
              .addClass("fr-active")
              .attr("aria-selected", !0)
        },
        display: function Pe(e) {
          let t = we()
          t.removeClass("fr-dii fr-dib"),
            !g.opts.htmlUntouched && g.opts.useClasses
              ? "inline" == e
                ? t.addClass("fr-dii")
                : "block" == e && t.addClass("fr-dib")
              : me(t, e, ue()),
            be(),
            S(),
            r(),
            g.selection.clear()
        },
        refreshDisplayOnShow: function Oe(e, t) {
          c &&
            t
              .find('.fr-command[data-param1="'.concat(he(), '"]'))
              .addClass("fr-active")
              .attr("aria-selected", !0)
        },
        replace: ve,
        back: function e() {
          c
            ? (g.events.disableBlur(), d(".fr-popup input:focus").blur(), T(c))
            : (g.events.disableBlur(),
              g.selection.restore(),
              g.events.enableBlur(),
              g.popups.hide("image.insert"),
              g.toolbar.showInline())
        },
        get: ye,
        getEl: we,
        insert: L,
        showProgressBar: O,
        remove: te,
        hideProgressBar: k,
        applyStyle: function ke(e, t, a) {
          if (
            (void 0 === t && (t = g.opts.imageStyles),
            void 0 === a && (a = g.opts.imageMultipleStyles),
            !c)
          )
            return !1
          let i = we()
          if (!a) {
            let n = Object.keys(t)
            n.splice(n.indexOf(e), 1), i.removeClass(n.join(" "))
          }
          "object" == Le(t[e])
            ? (i.removeAttr("style"), i.css(t[e].style))
            : i.toggleClass(e),
            T(c)
        },
        showAltPopup: j,
        showSizePopup: J,
        setAlt: function Ne(e) {
          if (c) {
            let t = g.popups.get("image.alt")
            c.attr("alt", e || t.find("input").val() || ""),
              t.find("input:focus").blur(),
              T(c)
          }
        },
        setSize: function Be(e, t) {
          if (c) {
            let a = g.popups.get("image.size")
            ;(e = e || a.find('input[name="width"]').val() || ""),
              (t = t || a.find('input[name="height"]').val() || "")
            let i = /^[\d]+((px)|%)*$/g
            c.removeAttr("width").removeAttr("height"),
              e.match(i) ? c.css("width", e) : c.css("width", ""),
              t.match(i) ? c.css("height", t) : c.css("height", ""),
              Ce() &&
                (c
                  .parents(".fr-img-caption")
                  .removeAttr("width")
                  .removeAttr("height"),
                e.match(i)
                  ? c.parents(".fr-img-caption").css("width", e)
                  : c.parents(".fr-img-caption").css("width", ""),
                t.match(i)
                  ? c.parents(".fr-img-caption").css("height", t)
                  : c.parents(".fr-img-caption").css("height", "")),
              a && a.find("input:focus").blur(),
              T(c)
          }
        },
        toggleCaption: function Te() {
          let e
          if (c && !Ce()) {
            ;(e = c).parent().is("a") && (e = c.parent())
            let t,
              a,
              i =
                c.parents("ul") && 0 < c.parents("ul").length
                  ? c.parents("ul")
                  : c.parents("ol") && 0 < c.parents("ol").length
                  ? c.parents("ol")
                  : []
            if (0 < i.length) {
              let n = i.find("li").length,
                r = c.parents("li"),
                s = document.createElement("li")
              n - 1 === r.index() && (i.append(s), (s.innerHTML = "&nbsp;"))
            }
            e.attr("style") &&
              (a =
                -1 < (t = e.attr("style").split(":")).indexOf("width")
                  ? t[t.indexOf("width") + 1].replace(";", "")
                  : "")
            let o = g.opts.imageResizeWithPercent
              ? (-1 < a.indexOf("px") ? null : a) || "100%"
              : c.width() + "px"
            e.wrap(
              '<div class="fr-img-space-wrap"><span ' +
                (g.browser.mozilla ? "" : 'contenteditable="false"') +
                'class="fr-img-caption ' +
                c.attr("class") +
                '" style="' +
                (g.opts.useClasses ? "" : e.attr("style")) +
                '" draggable="false"></span></div>',
            ),
              e.wrap('<span class="fr-img-wrap"></span>'),
              c.after(
                '<span class="fr-inner"'
                  .concat(
                    g.browser.mozilla ? "" : ' contenteditable="true"',
                    ">",
                  )
                  .concat(_e.START_MARKER)
                  .concat(g.language.translate("Image Caption"))
                  .concat(_e.END_MARKER, "</span>"),
              ),
              c.removeAttr("class").removeAttr("style").removeAttr("width"),
              c.parents(".fr-img-caption").css("width", o),
              pe(!0),
              g.selection.restore()
          } else
            (e = we()),
              c.insertAfter(e),
              c
                .attr("class", e.attr("class").replace("fr-img-caption", ""))
                .attr("style", e.attr("style")),
              e.remove(),
              T(c)
        },
        hasCaption: Ce,
        exitEdit: pe,
        edit: T,
      }
    }),
    _e.DefineIcon("insertImage", { NAME: "image", SVG_KEY: "insertImage" }),
    _e.RegisterShortcut(_e.KEYCODE.P, "insertImage", null, "P"),
    _e.RegisterCommand("insertImage", {
      title: "Insert Image",
      undo: !1,
      focus: !0,
      refreshAfterCallback: !1,
      popup: !0,
      callback: function () {
        this.popups.isVisible("image.insert")
          ? (this.$el.find(".fr-marker").length &&
              (this.events.disableBlur(), this.selection.restore()),
            this.popups.hide("image.insert"))
          : this.image.showInsertPopup()
      },
      plugin: "image",
    }),
    _e.DefineIcon("imageUpload", { NAME: "upload", SVG_KEY: "upload" }),
    _e.RegisterCommand("imageUpload", {
      title: "Upload Image",
      undo: !1,
      focus: !1,
      toggle: !0,
      callback: function () {
        this.image.showLayer("image-upload")
      },
      refresh: function (e) {
        this.image.refreshUploadButton(e)
      },
    }),
    _e.DefineIcon("imageByURL", { NAME: "link", SVG_KEY: "insertLink" }),
    _e.RegisterCommand("imageByURL", {
      title: "By URL",
      undo: !1,
      focus: !1,
      toggle: !0,
      callback: function () {
        this.image.showLayer("image-by-url")
      },
      refresh: function (e) {
        this.image.refreshByURLButton(e)
      },
    }),
    _e.RegisterCommand("imageInsertByURL", {
      title: "Insert Image",
      undo: !0,
      refreshAfterCallback: !1,
      callback: function () {
        this.image.insertByURL()
      },
      refresh: function (e) {
        this.image.get()
          ? e.text(this.language.translate("Replace"))
          : e.text(this.language.translate("Insert"))
      },
    }),
    _e.DefineIcon("imageDisplay", { NAME: "star", SVG_KEY: "imageDisplay" }),
    _e.RegisterCommand("imageDisplay", {
      title: "Display",
      type: "dropdown",
      options: { inline: "Inline", block: "Break Text" },
      callback: function (e, t) {
        this.image.display(t)
      },
      refresh: function (e) {
        this.opts.imageTextNear || e.addClass("fr-hidden")
      },
      refreshOnShow: function (e, t) {
        this.image.refreshDisplayOnShow(e, t)
      },
    }),
    _e.DefineIcon("image-align", { NAME: "align-left", SVG_KEY: "alignLeft" }),
    _e.DefineIcon("image-align-left", {
      NAME: "align-left",
      SVG_KEY: "alignLeft",
    }),
    _e.DefineIcon("image-align-right", {
      NAME: "align-right",
      SVG_KEY: "alignRight",
    }),
    _e.DefineIcon("image-align-center", {
      NAME: "align-justify",
      SVG_KEY: "alignCenter",
    }),
    _e.DefineIcon("imageAlign", {
      NAME: "align-justify",
      SVG_KEY: "alignJustify",
    }),
    _e.RegisterCommand("imageAlign", {
      type: "dropdown",
      title: "Align",
      options: { left: "Align Left", center: "None", right: "Align Right" },
      html: function () {
        let e = '<ul class="fr-dropdown-list" role="presentation">',
          t = _e.COMMANDS.imageAlign.options
        for (let a in t)
          t.hasOwnProperty(a) &&
            (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="'
              .concat(a, '" title="')
              .concat(this.language.translate(t[a]), '">')
              .concat(
                this.icon.create("image-align-".concat(a)),
                '<span class="fr-sr-only">',
              )
              .concat(this.language.translate(t[a]), "</span></a></li>"))
        return (e += "</ul>")
      },
      callback: function (e, t) {
        this.image.align(t)
      },
      refresh: function (e) {
        this.image.refreshAlign(e)
      },
      refreshOnShow: function (e, t) {
        this.image.refreshAlignOnShow(e, t)
      },
    }),
    _e.DefineIcon("imageReplace", {
      NAME: "exchange",
      FA5NAME: "exchange-alt",
      SVG_KEY: "replaceImage",
    }),
    _e.RegisterCommand("imageReplace", {
      title: "Replace",
      undo: !1,
      focus: !1,
      popup: !0,
      refreshAfterCallback: !1,
      callback: function () {
        this.image.replace()
      },
    }),
    _e.DefineIcon("imageRemove", { NAME: "trash", SVG_KEY: "remove" }),
    _e.RegisterCommand("imageRemove", {
      title: "Remove",
      callback: function () {
        this.image.remove()
      },
    }),
    _e.DefineIcon("imageBack", { NAME: "arrow-left", SVG_KEY: "back" }),
    _e.RegisterCommand("imageBack", {
      title: "Back",
      undo: !1,
      focus: !1,
      back: !0,
      callback: function () {
        this.image.back()
      },
      refresh: function (e) {
        this.$
        this.image.get() || this.opts.toolbarInline
          ? (e.removeClass("fr-hidden"),
            e.next(".fr-separator").removeClass("fr-hidden"))
          : (e.addClass("fr-hidden"),
            e.next(".fr-separator").addClass("fr-hidden"))
      },
    }),
    _e.RegisterCommand("imageDismissError", {
      title: "OK",
      undo: !1,
      callback: function () {
        this.image.hideProgressBar(!0)
      },
    }),
    _e.DefineIcon("imageStyle", { NAME: "magic", SVG_KEY: "imageClass" }),
    _e.RegisterCommand("imageStyle", {
      title: "Style",
      type: "dropdown",
      html: function () {
        let e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.imageStyles
        for (let a in t)
          if (t.hasOwnProperty(a)) {
            let i = t[a]
            "object" == Le(i) && (i = i.title),
              (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="'
                .concat(a, '">')
                .concat(this.language.translate(i), "</a></li>"))
          }
        return (e += "</ul>")
      },
      callback: function (e, t) {
        this.image.applyStyle(t)
      },
      refreshOnShow: function (e, t) {
        let a = this.$,
          i = this.image.getEl()
        i &&
          t.find(".fr-command").each(function () {
            let e = a(this).data("param1"),
              t = i.hasClass(e)
            a(this).toggleClass("fr-active", t).attr("aria-selected", t)
          })
      },
    }),
    _e.DefineIcon("imageAlt", { NAME: "info", SVG_KEY: "imageAltText" }),
    _e.RegisterCommand("imageAlt", {
      undo: !1,
      focus: !1,
      popup: !0,
      title: "Alternative Text",
      callback: function () {
        this.image.showAltPopup()
      },
    }),
    _e.RegisterCommand("imageSetAlt", {
      undo: !0,
      focus: !1,
      title: "Update",
      refreshAfterCallback: !1,
      callback: function () {
        this.image.setAlt()
      },
    }),
    _e.DefineIcon("imageSize", { NAME: "arrows-alt", SVG_KEY: "imageSize" }),
    _e.RegisterCommand("imageSize", {
      undo: !1,
      focus: !1,
      popup: !0,
      title: "Change Size",
      callback: function () {
        this.image.showSizePopup()
      },
    }),
    _e.RegisterCommand("imageSetSize", {
      undo: !0,
      focus: !1,
      title: "Update",
      refreshAfterCallback: !1,
      callback: function () {
        this.image.setSize()
      },
    }),
    _e.DefineIcon("imageCaption", {
      NAME: "commenting",
      FA5NAME: "comment-alt",
      SVG_KEY: "imageCaption",
    }),
    _e.RegisterCommand("imageCaption", {
      undo: !0,
      focus: !1,
      title: "Image Caption",
      refreshAfterCallback: !0,
      callback: function () {
        this.image.toggleCaption()
      },
      refresh: function (e) {
        this.image.get() && e.toggleClass("fr-active", this.image.hasCaption())
      },
    })
})
