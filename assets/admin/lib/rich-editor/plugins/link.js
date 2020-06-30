!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("froala-editor"))
    : "function" == typeof define && define.amd
    ? define(["froala-editor"], t)
    : t(e.FroalaEditor)
})(this, function (y) {
  "use strict"
  ;(y = y && y.hasOwnProperty("default") ? y["default"] : y),
    Object.assign(y.POPUP_TEMPLATES, {
      "link.edit": "[_BUTTONS_]",
      "link.insert": "[_BUTTONS_][_INPUT_LAYER_]",
    }),
    Object.assign(y.DEFAULTS, {
      linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
      linkInsertButtons: ["linkBack", "|", "linkList"],
      linkAttributes: { rel: "nofollow" },
      linkAutoPrefix: "http://",
      linkStyles: {
        "fr-green": "Green",
        "fr-strong": "Thick",
      },
      linkMultipleStyles: !0,
      linkConvertEmailAddress: !0,
      linkAlwaysBlank: !1,
      linkAlwaysNoFollow: !1,
      linkNoOpener: !0,
      linkNoReferrer: !0,
      linkList: [
        {
          text: "Froala",
          href: "https://froala.com",
          target: "_blank",
        },
        {
          text: "Google",
          href: "https://google.com",
          target: "_blank",
        },
        {
          displayText: "Facebook",
          href: "https://facebook.com",
        },
      ],
      linkText: !0,
    }),
    (y.PLUGINS.link = function (u) {
      var k = u.$

      function g() {
        var e = u.image ? u.image.get() : null
        if (e || !u.$wp)
          return "A" == u.el.tagName
            ? u.el
            : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName
            ? e.get(0).parentNode
            : void 0
        var t = u.selection.ranges(0).commonAncestorContainer
        try {
          t &&
            ((t.contains && t.contains(u.el)) ||
              !u.el.contains(t) ||
              u.el == t) &&
            (t = null)
        } catch (r) {
          t = null
        }
        if (t && "A" === t.tagName) return t
        var n = u.selection.element(),
          i = u.selection.endElement()
        "A" == n.tagName ||
          u.node.isElement(n) ||
          (n = k(n).parentsUntil(u.$el, "a").first().get(0)),
          "A" == i.tagName ||
            u.node.isElement(i) ||
            (i = k(i).parentsUntil(u.$el, "a").first().get(0))
        try {
          i &&
            ((i.contains && i.contains(u.el)) ||
              !u.el.contains(i) ||
              u.el == i) &&
            (i = null)
        } catch (r) {
          i = null
        }
        try {
          n &&
            ((n.contains && n.contains(u.el)) ||
              !u.el.contains(n) ||
              u.el == n) &&
            (n = null)
        } catch (r) {
          n = null
        }
        return i && i == n && "A" == i.tagName
          ? (u.browser.msie || u.helpers.isMobile()) &&
            (u.selection.info(n).atEnd || u.selection.info(n).atStart)
            ? null
            : n
          : null
      }
      function h() {
        var e,
          t,
          n,
          i,
          r = u.image ? u.image.get() : null,
          a = []
        if (r) "A" == r.get(0).parentNode.tagName && a.push(r.get(0).parentNode)
        else if (u.win.getSelection) {
          var l = u.win.getSelection()
          if (l.getRangeAt && l.rangeCount) {
            i = u.doc.createRange()
            for (var s = 0; s < l.rangeCount; ++s)
              if (
                ((t = (e = l.getRangeAt(s)).commonAncestorContainer) &&
                  1 != t.nodeType &&
                  (t = t.parentNode),
                t && "a" == t.nodeName.toLowerCase())
              )
                a.push(t)
              else {
                n = t.getElementsByTagName("a")
                for (var o = 0; o < n.length; ++o)
                  i.selectNodeContents(n[o]),
                    i.compareBoundaryPoints(e.END_TO_START, e) < 1 &&
                      -1 < i.compareBoundaryPoints(e.START_TO_END, e) &&
                      a.push(n[o])
              }
          }
        } else if (u.doc.selection && "Control" != u.doc.selection.type)
          if (
            "a" ==
            (t = (e = u.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()
          )
            a.push(t)
          else {
            ;(n = t.getElementsByTagName("a")),
              (i = u.doc.body.createTextRange())
            for (var p = 0; p < n.length; ++p)
              i.moveToElementText(n[p]),
                -1 < i.compareEndPoints("StartToEnd", e) &&
                  i.compareEndPoints("EndToStart", e) < 1 &&
                  a.push(n[p])
          }
        return a
      }
      function m(r) {
        if (u.core.hasFocus()) {
          if (
            (a(),
            r && "keyup" === r.type && (r.altKey || r.which == y.KEYCODE.ALT))
          )
            return !0
          setTimeout(
            function () {
              if (!r || (r && (1 == r.which || "mouseup" != r.type))) {
                var e = g(),
                  t = u.image ? u.image.get() : null
                if (e && !t) {
                  if (u.image) {
                    var n = u.node.contents(e)
                    if (1 == n.length && "IMG" == n[0].tagName) {
                      var i = u.selection.ranges(0)
                      return (
                        0 === i.startOffset && 0 === i.endOffset
                          ? k(e).before(y.MARKERS)
                          : k(e).after(y.MARKERS),
                        u.selection.restore(),
                        !1
                      )
                    }
                  }
                  r && r.stopPropagation(), l(e)
                }
              }
            },
            u.helpers.isIOS() ? 100 : 0,
          )
        }
      }
      function l(e) {
        var t = u.popups.get("link.edit")
        t ||
          (t = (function a() {
            var e = ""
            1 <= u.opts.linkEditButtons.length &&
              ("A" == u.el.tagName &&
                0 <= u.opts.linkEditButtons.indexOf("linkRemove") &&
                u.opts.linkEditButtons.splice(
                  u.opts.linkEditButtons.indexOf("linkRemove"),
                  1,
                ),
              (e = '<div class="fr-buttons">'.concat(
                u.button.buildList(u.opts.linkEditButtons),
                "</div>",
              )))
            var t = {
                buttons: e,
              },
              n = u.popups.create("link.edit", t)
            u.$wp &&
              u.events.$on(u.$wp, "scroll.link-edit", function () {
                g() && u.popups.isVisible("link.edit") && l(g())
              })
            return n
          })())
        var n = k(e)
        u.popups.isVisible("link.edit") || u.popups.refresh("link.edit"),
          u.popups.setContainer("link.edit", u.$sc)
        var i = n.offset().left + n.outerWidth() / 2,
          r = n.offset().top + n.outerHeight()
        u.popups.show("link.edit", i, r, n.outerHeight(), !0)
      }
      function a() {
        u.popups.hide("link.edit")
      }
      function o() {
        var e = u.popups.get("link.insert"),
          t = g()
        if (t) {
          var n,
            i,
            r = k(t),
            a = e.find('input.fr-link-attr[type="text"]'),
            l = e.find('input.fr-link-attr[type="checkbox"]')
          for (n = 0; n < a.length; n++)
            (i = k(a[n])).val(r.attr(i.attr("name") || ""))
          for (l.attr("checked", !1), n = 0; n < l.length; n++)
            (i = k(l[n])),
              r.attr(i.attr("name")) == i.data("checked") &&
                i.attr("checked", !0)
          e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text())
        } else
          e.find('input.fr-link-attr[type="text"]').val(""),
            e.find('input.fr-link-attr[type="checkbox"]').attr("checked", !1),
            e
              .find('input.fr-link-attr[type="text"][name="text"]')
              .val(u.selection.text())
        e.find("input.fr-link-attr").trigger("change"),
          (u.image ? u.image.get() : null)
            ? e.find('.fr-link-attr[name="text"]').parent().hide()
            : e.find('.fr-link-attr[name="text"]').parent().show()
      }
      function s(e) {
        if (e) return u.popups.onRefresh("link.insert", o), !0
        var t = ""
        1 <= u.opts.linkInsertButtons.length &&
          (t = '<div class="fr-buttons fr-tabs">'.concat(
            u.button.buildList(u.opts.linkInsertButtons),
            "</div>",
          ))
        var n = "",
          i = 0
        for (var r in ((n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'.concat(
          u.id,
          '">',
        )),
        (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-'
          .concat(
            u.id,
            '" name="href" type="text" class="fr-link-attr" placeholder="',
          )
          .concat(u.language.translate("URL"), '" tabIndex="')
          .concat(++i, '"></div>')),
        u.opts.linkText &&
          (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-'
            .concat(
              u.id,
              '" name="text" type="text" class="fr-link-attr" placeholder="',
            )
            .concat(u.language.translate("Text"), '" tabIndex="')
            .concat(++i, '"></div>')),
        u.opts.linkAttributes))
          if (u.opts.linkAttributes.hasOwnProperty(r)) {
            console.log(r)
            var a = u.opts.linkAttributes[r]
            n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="rel" class="fr-link-attr" data-checked="nofollow" type="checkbox" id="fr-link-target-'
              .concat(u.id, '" tabIndex="')
              .concat(++i, '"><span>')
              .concat(
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>',
                '</span></span><label id="fr-label-target-',
              )
              .concat(u.id, '">')
              .concat(u.language.translate("Nofollow"), "</label></div>")
          }
        u.opts.linkAlwaysBlank ||
          (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'
            .concat(u.id, '" tabIndex="')
            .concat(++i, '"><span>')
            .concat(
              '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>',
              '</span></span><label id="fr-label-target-',
            )
            .concat(u.id, '">')
            .concat(u.language.translate("Open in new tab"), "</label></div>"))
        var l = {
            buttons: t,
            input_layer: (n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="'
              .concat(++i, '" type="button">')
              .concat(u.language.translate("Insert"), "</button></div></div>")),
          },
          s = u.popups.create("link.insert", l)
        return (
          u.$wp &&
            u.events.$on(u.$wp, "scroll.link-insert", function () {
              ;(u.image ? u.image.get() : null) &&
                u.popups.isVisible("link.insert") &&
                f(),
                u.popups.isVisible("link.insert") && c()
            }),
          s
        )
      }
      function p(e, t, n) {
        if (
          (void 0 === n && (n = {}),
          !1 === u.events.trigger("link.beforeInsert", [e, t, n]))
        )
          return !1
        var i = u.image ? u.image.get() : null
        i || "A" == u.el.tagName
          ? "A" == u.el.tagName && u.$el.focus()
          : (u.selection.restore(), u.popups.hide("link.insert"))
        var r = e
        u.opts.linkConvertEmailAddress &&
          u.helpers.isEmail(e) &&
          !/^mailto:.*/i.test(e) &&
          (e = "mailto:".concat(e))
        if (
          ("" === u.opts.linkAutoPrefix ||
            new RegExp("^(" + y.LinkProtocols.join("|") + "):.", "i").test(e) ||
            /^data:image.*/i.test(e) ||
            /^(https?:|ftps?:|file:|)\/\//i.test(e) ||
            /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(
              e,
            ) ||
            (["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 &&
              (e = u.opts.linkAutoPrefix + u.helpers.sanitizeURL(e))),
          (e = u.helpers.sanitizeURL(e)),
          u.opts.linkAlwaysBlank && (n.target = "_blank"),
          u.opts.linkAlwaysNoFollow && (n.rel = "nofollow"),
          u.helpers.isEmail(r) && ((n.target = null), (n.rel = null)),
          "_blank" == n.target
            ? (u.opts.linkNoOpener &&
                (n.rel ? (n.rel += " noopener") : (n.rel = "noopener")),
              u.opts.linkNoReferrer &&
                (n.rel ? (n.rel += " noreferrer") : (n.rel = "noreferrer")))
            : null == n.target &&
              (n.rel
                ? (n.rel = n.rel
                    .replace(/noopener/, "")
                    .replace(/noreferrer/, ""))
                : (n.rel = null)),
          (t = t || ""),
          e === u.opts.linkAutoPrefix)
        )
          return (
            u.popups
              .get("link.insert")
              .find('input[name="href"]')
              .addClass("fr-error"),
            u.events.trigger("link.bad", [r]),
            !1
          )
        var a,
          l = g()
        if (l) {
          if (
            ((a = k(l)).attr("href", e), 0 < t.length && a.text() != t && !i)
          ) {
            for (
              var s = a.get(0);
              1 === s.childNodes.length &&
              s.childNodes[0].nodeType == Node.ELEMENT_NODE;

            )
              s = s.childNodes[0]
            k(s).text(t)
          }
          for (var o in (i || a.prepend(y.START_MARKER).append(y.END_MARKER),
          n))
            n[o] ? a.attr(o, n[o]) : a.removeAttr(o)
          i || u.selection.restore()
        } else {
          i
            ? (i.wrap('<a href="'.concat(e, '"></a>')),
              u.image.hasCaption() &&
                i
                  .parent()
                  .append(i.parents(".fr-img-caption").find(".fr-inner")))
            : (u.format.remove("a"),
              u.selection.isCollapsed()
                ? ((t = 0 === t.length ? r : t),
                  u.html.insert(
                    '<a href="'
                      .concat(e, '">')
                      .concat(y.START_MARKER)
                      .concat(
                        t
                          .replace(/&/g, "&amp;")
                          .replace(/</, "&lt;", ">", "&gt;"),
                      )
                      .concat(y.END_MARKER, "</a>"),
                  ),
                  u.selection.restore())
                : 0 < t.length && t != u.selection.text().replace(/\n/g, "")
                ? (u.selection.remove(),
                  u.html.insert(
                    '<a href="'
                      .concat(e, '">')
                      .concat(y.START_MARKER)
                      .concat(t.replace(/&/g, "&amp;"))
                      .concat(y.END_MARKER, "</a>"),
                  ),
                  u.selection.restore())
                : (!(function d() {
                    if (!u.selection.isCollapsed()) {
                      u.selection.save()
                      for (
                        var e = u.$el
                          .find(".fr-marker")
                          .addClass("fr-unprocessed")
                          .toArray();
                        e.length;

                      ) {
                        var t = k(e.pop())
                        t.removeClass("fr-unprocessed")
                        var n = u.node.deepestParent(t.get(0))
                        if (n) {
                          for (
                            var i = t.get(0), r = "", a = "";
                            (i = i.parentNode),
                              u.node.isBlock(i) ||
                                ((r += u.node.closeTagString(i)),
                                (a = u.node.openTagString(i) + a)),
                              i != n;

                          );
                          var l =
                            u.node.openTagString(t.get(0)) +
                            t.html() +
                            u.node.closeTagString(t.get(0))
                          t.replaceWith('<span id="fr-break"></span>')
                          var s = n.outerHTML
                          ;(s = (s = s.replace(
                            /<span id="fr-break"><\/span>/g,
                            r + l + a,
                          )).replace(a + r, "")),
                            (n.outerHTML = s)
                        }
                        e = u.$el.find(".fr-marker.fr-unprocessed").toArray()
                      }
                      u.html.cleanEmptyTags(), u.selection.restore()
                    }
                  })(),
                  u.format.apply("a", {
                    href: e,
                  })))
          for (var p = h(), c = 0; c < p.length; c++)
            (a = k(p[c])).attr(n), a.removeAttr("_moz_dirty")
          1 == p.length &&
            u.$wp &&
            !i &&
            (k(p[0]).prepend(y.START_MARKER).append(y.END_MARKER),
            u.selection.restore())
        }
        if (i) {
          var f = u.popups.get("link.insert")
          f && f.find("input:focus").blur(), u.image.edit(i)
        } else m()
      }
      function c() {
        a()
        var e = g()
        if (e) {
          var t = u.popups.get("link.insert")
          t || (t = s()),
            u.popups.isVisible("link.insert") ||
              (u.popups.refresh("link.insert"),
              u.selection.save(),
              u.helpers.isMobile() &&
                (u.events.disableBlur(), u.$el.blur(), u.events.enableBlur())),
            u.popups.setContainer("link.insert", u.$sc)
          var n = (u.image ? u.image.get() : null) || k(e),
            i = n.offset().left + n.outerWidth() / 2,
            r = n.offset().top + n.outerHeight()
          u.popups.show("link.insert", i, r, n.outerHeight(), !0)
        }
      }
      function f() {
        var e = u.image ? u.image.getEl() : null
        if (e) {
          var t = u.popups.get("link.insert")
          u.image.hasCaption() && (e = e.find(".fr-img-wrap")),
            t || (t = s()),
            o(),
            u.popups.setContainer("link.insert", u.$sc)
          var n = e.offset().left + e.outerWidth() / 2,
            i = e.offset().top + e.outerHeight()
          u.popups.show("link.insert", n, i, e.outerHeight(), !0)
        }
      }
      return {
        _init: function e() {
          u.events.on("keyup", function (e) {
            e.which != y.KEYCODE.ESC && m(e)
          }),
            u.events.on("window.mouseup", m),
            u.events.$on(u.$el, "click", "a", function (e) {
              u.edit.isDisabled() && e.preventDefault()
            }),
            u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", m),
            s(!0),
            "A" == u.el.tagName && u.$el.addClass("fr-view"),
            u.events.on(
              "toolbar.esc",
              function () {
                if (u.popups.isVisible("link.edit"))
                  return u.events.disableBlur(), u.events.focus(), !1
              },
              !0,
            )
        },
        remove: function n() {
          var e = g(),
            t = u.image ? u.image.get() : null
          if (!1 === u.events.trigger("link.beforeRemove", [e])) return !1
          t && e
            ? (t.unwrap(), u.image.edit(t))
            : e &&
              (u.selection.save(),
              k(e).replaceWith(k(e).html()),
              u.selection.restore(),
              a())
        },
        showInsertPopup: function d() {
          var e = u.$tb.find('.fr-command[data-cmd="insertLink"]'),
            t = u.popups.get("link.insert")
          if ((t || (t = s()), !t.hasClass("fr-active")))
            if (
              (u.popups.refresh("link.insert"),
              u.popups.setContainer("link.insert", u.$tb || u.$sc),
              e.isVisible())
            ) {
              var n = u.button.getPosition(e),
                i = n.left,
                r = n.top
              u.popups.show("link.insert", i, r, e.outerHeight())
            } else u.position.forSelection(t), u.popups.show("link.insert")
        },
        usePredefined: function v(e) {
          var t,
            n,
            i = u.opts.linkList[e],
            r = u.popups.get("link.insert"),
            a = r.find('input.fr-link-attr[type="text"]'),
            l = r.find('input.fr-link-attr[type="checkbox"]')
          for (i.rel && (r.rel = i.rel), n = 0; n < a.length; n++)
            i[(t = k(a[n])).attr("name")]
              ? (t.val(i[t.attr("name")]), t.toggleClass("fr-not-empty", !0))
              : "text" != t.attr("name") && t.val("")
          for (n = 0; n < l.length; n++)
            (t = k(l[n])).attr(
              "checked",
              t.data("checked") == i[t.attr("name")],
            )
          u.accessibility.focusPopup(r)
        },
        insertCallback: function b() {
          var e,
            t,
            n = u.popups.get("link.insert"),
            i = n.find('input.fr-link-attr[type="text"]'),
            r = n.find('input.fr-link-attr[type="checkbox"]'),
            a = (i.filter('[name="href"]').val() || "").trim(),
            l = i.filter('[name="text"]').val(),
            s = {}
          for (t = 0; t < i.length; t++)
            (e = k(i[t])),
              ["href", "text"].indexOf(e.attr("name")) < 0 &&
                (s[e.attr("name")] = e.val())
          for (t = 0; t < r.length; t++)
            (e = k(r[t])).is(":checked")
              ? (s[e.attr("name")] = e.data("checked"))
              : (s[e.attr("name")] = e.data("unchecked") || null)
          n.rel && (s.rel = n.rel)
          var o = u.helpers.scrollTop()
          p(a, l, s), k(u.o_win).scrollTop(o)
        },
        insert: p,
        update: c,
        get: g,
        allSelected: h,
        back: function t() {
          u.image && u.image.get()
            ? u.image.back()
            : (u.events.disableBlur(),
              u.selection.restore(),
              u.events.enableBlur(),
              g() && u.$wp
                ? (u.selection.restore(), a(), m())
                : "A" == u.el.tagName
                ? (u.$el.focus(), m())
                : (u.popups.hide("link.insert"), u.toolbar.showInline()))
        },
        imageLink: f,
        applyStyle: function E(e, t, n) {
          void 0 === n && (n = u.opts.linkMultipleStyles),
            void 0 === t && (t = u.opts.linkStyles)
          var i = g()
          if (!i) return !1
          if (!n) {
            var r = Object.keys(t)
            r.splice(r.indexOf(e), 1), k(i).removeClass(r.join(" "))
          }
          k(i).toggleClass(e), m()
        },
      }
    }),
    y.DefineIcon("insertLink", {
      NAME: "link",
      SVG_KEY: "insertLink",
    }),
    y.RegisterShortcut(y.KEYCODE.K, "insertLink", null, "K"),
    y.RegisterCommand("insertLink", {
      title: "Insert Link",
      undo: !1,
      focus: !0,
      refreshOnCallback: !1,
      popup: !0,
      callback: function () {
        this.popups.isVisible("link.insert")
          ? (this.$el.find(".fr-marker").length &&
              (this.events.disableBlur(), this.selection.restore()),
            this.popups.hide("link.insert"))
          : this.link.showInsertPopup()
      },
      plugin: "link",
    }),
    y.DefineIcon("linkOpen", {
      NAME: "external-link",
      FA5NAME: "external-link-alt",
      SVG_KEY: "openLink",
    }),
    y.RegisterCommand("linkOpen", {
      title: "Open Link",
      undo: !1,
      refresh: function (e) {
        this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
      },
      callback: function () {
        var e = this.link.get()
        e &&
          (-1 !== e.href.indexOf("mailto:")
            ? this.o_win.open(e.href).close()
            : (e.target || (e.target = "_self"),
              this.browser.msie || this.browser.edge
                ? this.o_win.open(e.href, e.target)
                : this.o_win.open(e.href, e.target, "noopener")),
          this.popups.hide("link.edit"))
      },
      plugin: "link",
    }),
    y.DefineIcon("linkEdit", {
      NAME: "edit",
      SVG_KEY: "edit",
    }),
    y.RegisterCommand("linkEdit", {
      title: "Edit Link",
      undo: !1,
      refreshAfterCallback: !1,
      popup: !0,
      callback: function () {
        this.link.update()
      },
      refresh: function (e) {
        this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
      },
      plugin: "link",
    }),
    y.DefineIcon("linkRemove", {
      NAME: "unlink",
      SVG_KEY: "unlink",
    }),
    y.RegisterCommand("linkRemove", {
      title: "Unlink",
      callback: function () {
        this.link.remove()
      },
      refresh: function (e) {
        this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
      },
      plugin: "link",
    }),
    y.DefineIcon("linkBack", {
      NAME: "arrow-left",
      SVG_KEY: "back",
    }),
    y.RegisterCommand("linkBack", {
      title: "Back",
      undo: !1,
      focus: !1,
      back: !0,
      refreshAfterCallback: !1,
      callback: function () {
        this.link.back()
      },
      refresh: function (e) {
        var t = this.link.get() && this.doc.hasFocus()
        ;(this.image ? this.image.get() : null) || t || this.opts.toolbarInline
          ? (e.removeClass("fr-hidden"),
            e.next(".fr-separator").removeClass("fr-hidden"))
          : (e.addClass("fr-hidden"),
            e.next(".fr-separator").addClass("fr-hidden"))
      },
      plugin: "link",
    }),
    y.DefineIcon("linkList", {
      NAME: "search",
      SVG_KEY: "search",
    }),
    y.RegisterCommand("linkList", {
      title: "Choose Link",
      type: "dropdown",
      focus: !1,
      undo: !1,
      refreshAfterCallback: !1,
      html: function () {
        for (
          var e = '<ul class="fr-dropdown-list" role="presentation">',
            t = this.opts.linkList,
            n = 0;
          n < t.length;
          n++
        )
          e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="'
            .concat(n, '">')
            .concat(t[n].displayText || t[n].text, "</a></li>")
        return (e += "</ul>")
      },
      callback: function (e, t) {
        this.link.usePredefined(t)
      },
      plugin: "link",
    }),
    y.RegisterCommand("linkInsert", {
      focus: !1,
      refreshAfterCallback: !1,
      callback: function () {
        this.link.insertCallback()
      },
      refresh: function (e) {
        this.link.get()
          ? e.text(this.language.translate("Update"))
          : e.text(this.language.translate("Insert"))
      },
      plugin: "link",
    }),
    y.DefineIcon("imageLink", {
      NAME: "link",
      SVG_KEY: "insertLink",
    }),
    y.RegisterCommand("imageLink", {
      title: "Insert Link",
      undo: !1,
      focus: !1,
      popup: !0,
      callback: function () {
        this.link.imageLink()
      },
      refresh: function (e) {
        var t
        this.link.get()
          ? ((t = e.prev()).hasClass("fr-separator") &&
              t.removeClass("fr-hidden"),
            e.addClass("fr-hidden"))
          : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"),
            e.removeClass("fr-hidden"))
      },
      plugin: "link",
    }),
    y.DefineIcon("linkStyle", {
      NAME: "magic",
      SVG_KEY: "linkStyles",
    }),
    y.RegisterCommand("linkStyle", {
      title: "Style",
      type: "dropdown",
      html: function () {
        var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.linkStyles
        for (var n in t)
          t.hasOwnProperty(n) &&
            (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="'
              .concat(n, '">')
              .concat(this.language.translate(t[n]), "</a></li>"))
        return (e += "</ul>")
      },
      callback: function (e, t) {
        this.link.applyStyle(t)
      },
      refreshOnShow: function (e, t) {
        var n = this.$,
          i = this.link.get()
        if (i) {
          var r = n(i)
          t.find(".fr-command").each(function () {
            var e = n(this).data("param1"),
              t = r.hasClass(e)
            n(this).toggleClass("fr-active", t).attr("aria-selected", t)
          })
        }
      },
      refresh: function (e) {
        this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
      },
      plugin: "link",
    })
})
