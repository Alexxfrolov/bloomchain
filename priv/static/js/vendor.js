(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  [function (t, e, i) {
    var n;
    /*!
     * jQuery JavaScript Library v3.3.1
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2018-01-20T17:24Z
     */
    /*!
     * jQuery JavaScript Library v3.3.1
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2018-01-20T17:24Z
     */
    ! function (e, i) {
      "use strict";
      "object" == typeof t && "object" == typeof t.exports ? t.exports = e.document ? i(e, !0) : function (t) {
          if (!t.document)
            throw new Error("jQuery requires a window with a document");
          return i(t)
        } :
        i(e)
    }("undefined" != typeof window ? window : this, function (i, o) {
      "use strict";
      var s = [],
        r = i.document,
        a = Object.getPrototypeOf,
        l = s.slice,
        h = s.concat,
        c = s.push,
        d = s.indexOf,
        u = {},
        p = u.toString,
        f = u.hasOwnProperty,
        g = f.toString,
        m = g.call(Object),
        v = {},
        y = function (t) {
          return "function" == typeof t && "number" != typeof t.nodeType
        },
        x = function (t) {
          return null != t && t === t.window
        },
        b = {
          type: !0,
          src: !0,
          noModule: !0
        };

      function w(t, e, i) {
        var n, o = (e = e || r).createElement("script");
        if (o.text = t,
          i)
          for (n in b)
            i[n] && (o[n] = i[n]);
        e.head.appendChild(o).parentNode.removeChild(o)
      }

      function k(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? u[p.call(t)] || "object" : typeof t
      }
      var T = function (t, e) {
          return new T.fn.init(t, e)
        },
        S = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

      function C(t) {
        var e = !!t && "length" in t && t.length,
          i = k(t);
        return !y(t) && !x(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
      }
      T.fn = T.prototype = {
          jquery: "3.3.1",
          constructor: T,
          length: 0,
          toArray: function () {
            return l.call(this)
          },
          get: function (t) {
            return null == t ? l.call(this) : t < 0 ? this[t + this.length] : this[t]
          },
          pushStack: function (t) {
            var e = T.merge(this.constructor(), t);
            return e.prevObject = this,
              e
          },
          each: function (t) {
            return T.each(this, t)
          },
          map: function (t) {
            return this.pushStack(T.map(this, function (e, i) {
              return t.call(e, i, e)
            }))
          },
          slice: function () {
            return this.pushStack(l.apply(this, arguments))
          },
          first: function () {
            return this.eq(0)
          },
          last: function () {
            return this.eq(-1)
          },
          eq: function (t) {
            var e = this.length,
              i = +t + (t < 0 ? e : 0);
            return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
          },
          end: function () {
            return this.prevObject || this.constructor()
          },
          push: c,
          sort: s.sort,
          splice: s.splice
        },
        T.extend = T.fn.extend = function () {
          var t, e, i, n, o, s, r = arguments[0] || {},
            a = 1,
            l = arguments.length,
            h = !1;
          for ("boolean" == typeof r && (h = r,
              r = arguments[a] || {},
              a++),
            "object" == typeof r || y(r) || (r = {}),
            a === l && (r = this,
              a--); a < l; a++)
            if (null != (t = arguments[a]))
              for (e in t)
                i = r[e],
                r !== (n = t[e]) && (h && n && (T.isPlainObject(n) || (o = Array.isArray(n))) ? (o ? (o = !1,
                    s = i && Array.isArray(i) ? i : []) : s = i && T.isPlainObject(i) ? i : {},
                  r[e] = T.extend(h, s, n)) : void 0 !== n && (r[e] = n));
          return r
        },
        T.extend({
          expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
          isReady: !0,
          error: function (t) {
            throw new Error(t)
          },
          noop: function () {},
          isPlainObject: function (t) {
            var e, i;
            return !(!t || "[object Object]" !== p.call(t)) && (!(e = a(t)) || "function" == typeof (i = f.call(e, "constructor") && e.constructor) && g.call(i) === m)
          },
          isEmptyObject: function (t) {
            var e;
            for (e in t)
              return !1;
            return !0
          },
          globalEval: function (t) {
            w(t)
          },
          each: function (t, e) {
            var i, n = 0;
            if (C(t))
              for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++)
            ;
            else
              for (n in t)
                if (!1 === e.call(t[n], n, t[n]))
                  break;
            return t
          },
          trim: function (t) {
            return null == t ? "" : (t + "").replace(S, "")
          },
          makeArray: function (t, e) {
            var i = e || [];
            return null != t && (C(Object(t)) ? T.merge(i, "string" == typeof t ? [t] : t) : c.call(i, t)),
              i
          },
          inArray: function (t, e, i) {
            return null == e ? -1 : d.call(e, t, i)
          },
          merge: function (t, e) {
            for (var i = +e.length, n = 0, o = t.length; n < i; n++)
              t[o++] = e[n];
            return t.length = o,
              t
          },
          grep: function (t, e, i) {
            for (var n = [], o = 0, s = t.length, r = !i; o < s; o++)
              !e(t[o], o) !== r && n.push(t[o]);
            return n
          },
          map: function (t, e, i) {
            var n, o, s = 0,
              r = [];
            if (C(t))
              for (n = t.length; s < n; s++)
                null != (o = e(t[s], s, i)) && r.push(o);
            else
              for (s in t)
                null != (o = e(t[s], s, i)) && r.push(o);
            return h.apply([], r)
          },
          guid: 1,
          support: v
        }),
        "function" == typeof Symbol && (T.fn[Symbol.iterator] = s[Symbol.iterator]),
        T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
          u["[object " + e + "]"] = e.toLowerCase()
        });
      var A =
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        function (t) {
          var e, i, n, o, s, r, a, l, h, c, d, u, p, f, g, m, v, y, x, b = "sizzle" + 1 * new Date,
            w = t.document,
            k = 0,
            T = 0,
            S = rt(),
            C = rt(),
            A = rt(),
            M = function (t, e) {
              return t === e && (d = !0),
                0
            },
            E = {}.hasOwnProperty,
            D = [],
            O = D.pop,
            P = D.push,
            I = D.push,
            _ = D.slice,
            L = function (t, e) {
              for (var i = 0, n = t.length; i < n; i++)
                if (t[i] === e)
                  return i;
              return -1
            },
            N = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            B = "\\[" + H + "*(" + R + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + H + "*\\]",
            W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + B + ")*)|.*)\\)|)",
            z = new RegExp(H + "+", "g"),
            F = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
            j = new RegExp("^" + H + "*," + H + "*"),
            $ = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
            G = new RegExp("=" + H + "*([^\\]'\"]*?)" + H + "*\\]", "g"),
            X = new RegExp(W),
            Y = new RegExp("^" + R + "$"),
            V = {
              ID: new RegExp("^#(" + R + ")"),
              CLASS: new RegExp("^\\.(" + R + ")"),
              TAG: new RegExp("^(" + R + "|[*])"),
              ATTR: new RegExp("^" + B),
              PSEUDO: new RegExp("^" + W),
              CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"),
              bool: new RegExp("^(?:" + N + ")$", "i"),
              needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i")
            },
            U = /^(?:input|select|textarea|button)$/i,
            q = /^h\d$/i,
            K = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Q = /[+~]/,
            J = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
            tt = function (t, e, i) {
              var n = "0x" + e - 65536;
              return n != n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
            },
            et = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            it = function (t, e) {
              return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            },
            nt = function () {
              u()
            },
            ot = yt(function (t) {
              return !0 === t.disabled && ("form" in t || "label" in t)
            }, {
              dir: "parentNode",
              next: "legend"
            });
          try {
            I.apply(D = _.call(w.childNodes), w.childNodes),
              D[w.childNodes.length].nodeType
          } catch (t) {
            I = {
              apply: D.length ? function (t, e) {
                P.apply(t, _.call(e))
              } : function (t, e) {
                for (var i = t.length, n = 0; t[i++] = e[n++];)
                ;
                t.length = i - 1
              }
            }
          }

          function st(t, e, n, o) {
            var s, a, h, c, d, f, v, y = e && e.ownerDocument,
              k = e ? e.nodeType : 9;
            if (n = n || [],
              "string" != typeof t || !t || 1 !== k && 9 !== k && 11 !== k)
              return n;
            if (!o && ((e ? e.ownerDocument || e : w) !== p && u(e),
                e = e || p,
                g)) {
              if (11 !== k && (d = Z.exec(t)))
                if (s = d[1]) {
                  if (9 === k) {
                    if (!(h = e.getElementById(s)))
                      return n;
                    if (h.id === s)
                      return n.push(h),
                        n
                  } else if (y && (h = y.getElementById(s)) && x(e, h) && h.id === s)
                    return n.push(h),
                      n
                } else {
                  if (d[2])
                    return I.apply(n, e.getElementsByTagName(t)),
                      n;
                  if ((s = d[3]) && i.getElementsByClassName && e.getElementsByClassName)
                    return I.apply(n, e.getElementsByClassName(s)),
                      n
                }
              if (i.qsa && !A[t + " "] && (!m || !m.test(t))) {
                if (1 !== k)
                  y = e,
                  v = t;
                else if ("object" !== e.nodeName.toLowerCase()) {
                  for ((c = e.getAttribute("id")) ? c = c.replace(et, it) : e.setAttribute("id", c = b),
                    a = (f = r(t)).length; a--;)
                    f[a] = "#" + c + " " + vt(f[a]);
                  v = f.join(","),
                    y = Q.test(t) && gt(e.parentNode) || e
                }
                if (v)
                  try {
                    return I.apply(n, y.querySelectorAll(v)),
                      n
                  } catch (t) {} finally {
                    c === b && e.removeAttribute("id")
                  }
              }
            }
            return l(t.replace(F, "$1"), e, n, o)
          }

          function rt() {
            var t = [];
            return function e(i, o) {
              return t.push(i + " ") > n.cacheLength && delete e[t.shift()],
                e[i + " "] = o
            }
          }

          function at(t) {
            return t[b] = !0,
              t
          }

          function lt(t) {
            var e = p.createElement("fieldset");
            try {
              return !!t(e)
            } catch (t) {
              return !1
            } finally {
              e.parentNode && e.parentNode.removeChild(e),
                e = null
            }
          }

          function ht(t, e) {
            for (var i = t.split("|"), o = i.length; o--;)
              n.attrHandle[i[o]] = e
          }

          function ct(t, e) {
            var i = e && t,
              n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (n)
              return n;
            if (i)
              for (; i = i.nextSibling;)
                if (i === e)
                  return -1;
            return t ? 1 : -1
          }

          function dt(t) {
            return function (e) {
              return "input" === e.nodeName.toLowerCase() && e.type === t
            }
          }

          function ut(t) {
            return function (e) {
              var i = e.nodeName.toLowerCase();
              return ("input" === i || "button" === i) && e.type === t
            }
          }

          function pt(t) {
            return function (e) {
              return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ot(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
          }

          function ft(t) {
            return at(function (e) {
              return e = +e,
                at(function (i, n) {
                  for (var o, s = t([], i.length, e), r = s.length; r--;)
                    i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                })
            })
          }

          function gt(t) {
            return t && void 0 !== t.getElementsByTagName && t
          }
          for (e in i = st.support = {},
            s = st.isXML = function (t) {
              var e = t && (t.ownerDocument || t).documentElement;
              return !!e && "HTML" !== e.nodeName
            },
            u = st.setDocument = function (t) {
              var e, o, r = t ? t.ownerDocument || t : w;
              return r !== p && 9 === r.nodeType && r.documentElement ? (f = (p = r).documentElement,
                g = !s(p),
                w !== p && (o = p.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", nt, !1) : o.attachEvent && o.attachEvent("onunload", nt)),
                i.attributes = lt(function (t) {
                  return t.className = "i",
                    !t.getAttribute("className")
                }),
                i.getElementsByTagName = lt(function (t) {
                  return t.appendChild(p.createComment("")),
                    !t.getElementsByTagName("*").length
                }),
                i.getElementsByClassName = K.test(p.getElementsByClassName),
                i.getById = lt(function (t) {
                  return f.appendChild(t).id = b,
                    !p.getElementsByName || !p.getElementsByName(b).length
                }),
                i.getById ? (n.filter.ID = function (t) {
                    var e = t.replace(J, tt);
                    return function (t) {
                      return t.getAttribute("id") === e
                    }
                  },
                  n.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && g) {
                      var i = e.getElementById(t);
                      return i ? [i] : []
                    }
                  }
                ) : (n.filter.ID = function (t) {
                    var e = t.replace(J, tt);
                    return function (t) {
                      var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                      return i && i.value === e
                    }
                  },
                  n.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && g) {
                      var i, n, o, s = e.getElementById(t);
                      if (s) {
                        if ((i = s.getAttributeNode("id")) && i.value === t)
                          return [s];
                        for (o = e.getElementsByName(t),
                          n = 0; s = o[n++];)
                          if ((i = s.getAttributeNode("id")) && i.value === t)
                            return [s]
                      }
                      return []
                    }
                  }
                ),
                n.find.TAG = i.getElementsByTagName ? function (t, e) {
                  return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : i.qsa ? e.querySelectorAll(t) : void 0
                } :
                function (t, e) {
                  var i, n = [],
                    o = 0,
                    s = e.getElementsByTagName(t);
                  if ("*" === t) {
                    for (; i = s[o++];)
                      1 === i.nodeType && n.push(i);
                    return n
                  }
                  return s
                },
                n.find.CLASS = i.getElementsByClassName && function (t, e) {
                  if (void 0 !== e.getElementsByClassName && g)
                    return e.getElementsByClassName(t)
                },
                v = [],
                m = [],
                (i.qsa = K.test(p.querySelectorAll)) && (lt(function (t) {
                    f.appendChild(t).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                      t.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + H + "*(?:''|\"\")"),
                      t.querySelectorAll("[selected]").length || m.push("\\[" + H + "*(?:value|" + N + ")"),
                      t.querySelectorAll("[id~=" + b + "-]").length || m.push("~="),
                      t.querySelectorAll(":checked").length || m.push(":checked"),
                      t.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]")
                  }),
                  lt(function (t) {
                    t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var e = p.createElement("input");
                    e.setAttribute("type", "hidden"),
                      t.appendChild(e).setAttribute("name", "D"),
                      t.querySelectorAll("[name=d]").length && m.push("name" + H + "*[*^$|!~]?="),
                      2 !== t.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"),
                      f.appendChild(t).disabled = !0,
                      2 !== t.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"),
                      t.querySelectorAll("*,:x"),
                      m.push(",.*:")
                  })),
                (i.matchesSelector = K.test(y = f.matches || f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && lt(function (t) {
                  i.disconnectedMatch = y.call(t, "*"),
                    y.call(t, "[s!='']:x"),
                    v.push("!=", W)
                }),
                m = m.length && new RegExp(m.join("|")),
                v = v.length && new RegExp(v.join("|")),
                e = K.test(f.compareDocumentPosition),
                x = e || K.test(f.contains) ? function (t, e) {
                  var i = 9 === t.nodeType ? t.documentElement : t,
                    n = e && e.parentNode;
                  return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                } :
                function (t, e) {
                  if (e)
                    for (; e = e.parentNode;)
                      if (e === t)
                        return !0;
                  return !1
                },
                M = e ? function (t, e) {
                  if (t === e)
                    return d = !0,
                      0;
                  var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                  return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !i.sortDetached && e.compareDocumentPosition(t) === n ? t === p || t.ownerDocument === w && x(w, t) ? -1 : e === p || e.ownerDocument === w && x(w, e) ? 1 : c ? L(c, t) - L(c, e) : 0 : 4 & n ? -1 : 1)
                } :
                function (t, e) {
                  if (t === e)
                    return d = !0,
                      0;
                  var i, n = 0,
                    o = t.parentNode,
                    s = e.parentNode,
                    r = [t],
                    a = [e];
                  if (!o || !s)
                    return t === p ? -1 : e === p ? 1 : o ? -1 : s ? 1 : c ? L(c, t) - L(c, e) : 0;
                  if (o === s)
                    return ct(t, e);
                  for (i = t; i = i.parentNode;)
                    r.unshift(i);
                  for (i = e; i = i.parentNode;)
                    a.unshift(i);
                  for (; r[n] === a[n];)
                    n++;
                  return n ? ct(r[n], a[n]) : r[n] === w ? -1 : a[n] === w ? 1 : 0
                },
                p) : p
            },
            st.matches = function (t, e) {
              return st(t, null, null, e)
            },
            st.matchesSelector = function (t, e) {
              if ((t.ownerDocument || t) !== p && u(t),
                e = e.replace(G, "='$1']"),
                i.matchesSelector && g && !A[e + " "] && (!v || !v.test(e)) && (!m || !m.test(e)))
                try {
                  var n = y.call(t, e);
                  if (n || i.disconnectedMatch || t.document && 11 !== t.document.nodeType)
                    return n
                } catch (t) {}
              return st(e, p, null, [t]).length > 0
            },
            st.contains = function (t, e) {
              return (t.ownerDocument || t) !== p && u(t),
                x(t, e)
            },
            st.attr = function (t, e) {
              (t.ownerDocument || t) !== p && u(t);
              var o = n.attrHandle[e.toLowerCase()],
                s = o && E.call(n.attrHandle, e.toLowerCase()) ? o(t, e, !g) : void 0;
              return void 0 !== s ? s : i.attributes || !g ? t.getAttribute(e) : (s = t.getAttributeNode(e)) && s.specified ? s.value : null
            },
            st.escape = function (t) {
              return (t + "").replace(et, it)
            },
            st.error = function (t) {
              throw new Error("Syntax error, unrecognized expression: " + t)
            },
            st.uniqueSort = function (t) {
              var e, n = [],
                o = 0,
                s = 0;
              if (d = !i.detectDuplicates,
                c = !i.sortStable && t.slice(0),
                t.sort(M),
                d) {
                for (; e = t[s++];)
                  e === t[s] && (o = n.push(s));
                for (; o--;)
                  t.splice(n[o], 1)
              }
              return c = null,
                t
            },
            o = st.getText = function (t) {
              var e, i = "",
                n = 0,
                s = t.nodeType;
              if (s) {
                if (1 === s || 9 === s || 11 === s) {
                  if ("string" == typeof t.textContent)
                    return t.textContent;
                  for (t = t.firstChild; t; t = t.nextSibling)
                    i += o(t)
                } else if (3 === s || 4 === s)
                  return t.nodeValue
              } else
                for (; e = t[n++];)
                  i += o(e);
              return i
            },
            (n = st.selectors = {
              cacheLength: 50,
              createPseudo: at,
              match: V,
              attrHandle: {},
              find: {},
              relative: {
                ">": {
                  dir: "parentNode",
                  first: !0
                },
                " ": {
                  dir: "parentNode"
                },
                "+": {
                  dir: "previousSibling",
                  first: !0
                },
                "~": {
                  dir: "previousSibling"
                }
              },
              preFilter: {
                ATTR: function (t) {
                  return t[1] = t[1].replace(J, tt),
                    t[3] = (t[3] || t[4] || t[5] || "").replace(J, tt),
                    "~=" === t[2] && (t[3] = " " + t[3] + " "),
                    t.slice(0, 4)
                },
                CHILD: function (t) {
                  return t[1] = t[1].toLowerCase(),
                    "nth" === t[1].slice(0, 3) ? (t[3] || st.error(t[0]),
                      t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])),
                      t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && st.error(t[0]),
                    t
                },
                PSEUDO: function (t) {
                  var e, i = !t[6] && t[2];
                  return V.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && X.test(i) && (e = r(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e),
                      t[2] = i.slice(0, e)),
                    t.slice(0, 3))
                }
              },
              filter: {
                TAG: function (t) {
                  var e = t.replace(J, tt).toLowerCase();
                  return "*" === t ? function () {
                      return !0
                    } :
                    function (t) {
                      return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function (t) {
                  var e = S[t + " "];
                  return e || (e = new RegExp("(^|" + H + ")" + t + "(" + H + "|$)")) && S(t, function (t) {
                    return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                  })
                },
                ATTR: function (t, e, i) {
                  return function (n) {
                    var o = st.attr(n, t);
                    return null == o ? "!=" === e : !e || (o += "",
                      "=" === e ? o === i : "!=" === e ? o !== i : "^=" === e ? i && 0 === o.indexOf(i) : "*=" === e ? i && o.indexOf(i) > -1 : "$=" === e ? i && o.slice(-i.length) === i : "~=" === e ? (" " + o.replace(z, " ") + " ").indexOf(i) > -1 : "|=" === e && (o === i || o.slice(0, i.length + 1) === i + "-"))
                  }
                },
                CHILD: function (t, e, i, n, o) {
                  var s = "nth" !== t.slice(0, 3),
                    r = "last" !== t.slice(-4),
                    a = "of-type" === e;
                  return 1 === n && 0 === o ? function (t) {
                      return !!t.parentNode
                    } :
                    function (e, i, l) {
                      var h, c, d, u, p, f, g = s !== r ? "nextSibling" : "previousSibling",
                        m = e.parentNode,
                        v = a && e.nodeName.toLowerCase(),
                        y = !l && !a,
                        x = !1;
                      if (m) {
                        if (s) {
                          for (; g;) {
                            for (u = e; u = u[g];)
                              if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType)
                                return !1;
                            f = g = "only" === t && !f && "nextSibling"
                          }
                          return !0
                        }
                        if (f = [r ? m.firstChild : m.lastChild],
                          r && y) {
                          for (x = (p = (h = (c = (d = (u = m)[b] || (u[b] = {}))[u.uniqueID] || (d[u.uniqueID] = {}))[t] || [])[0] === k && h[1]) && h[2],
                            u = p && m.childNodes[p]; u = ++p && u && u[g] || (x = p = 0) || f.pop();)
                            if (1 === u.nodeType && ++x && u === e) {
                              c[t] = [k, p, x];
                              break
                            }
                        } else if (y && (x = p = (h = (c = (d = (u = e)[b] || (u[b] = {}))[u.uniqueID] || (d[u.uniqueID] = {}))[t] || [])[0] === k && h[1]),
                          !1 === x)
                          for (;
                            (u = ++p && u && u[g] || (x = p = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++x || (y && ((c = (d = u[b] || (u[b] = {}))[u.uniqueID] || (d[u.uniqueID] = {}))[t] = [k, x]),
                              u !== e));)
                        ;
                        return (x -= o) === n || x % n == 0 && x / n >= 0
                      }
                    }
                },
                PSEUDO: function (t, e) {
                  var i, o = n.pseudos[t] || n.setFilters[t.toLowerCase()] || st.error("unsupported pseudo: " + t);
                  return o[b] ? o(e) : o.length > 1 ? (i = [t, t, "", e],
                    n.setFilters.hasOwnProperty(t.toLowerCase()) ? at(function (t, i) {
                      for (var n, s = o(t, e), r = s.length; r--;)
                        t[n = L(t, s[r])] = !(i[n] = s[r])
                    }) : function (t) {
                      return o(t, 0, i)
                    }
                  ) : o
                }
              },
              pseudos: {
                not: at(function (t) {
                  var e = [],
                    i = [],
                    n = a(t.replace(F, "$1"));
                  return n[b] ? at(function (t, e, i, o) {
                    for (var s, r = n(t, null, o, []), a = t.length; a--;)
                      (s = r[a]) && (t[a] = !(e[a] = s))
                  }) : function (t, o, s) {
                    return e[0] = t,
                      n(e, null, s, i),
                      e[0] = null,
                      !i.pop()
                  }
                }),
                has: at(function (t) {
                  return function (e) {
                    return st(t, e).length > 0
                  }
                }),
                contains: at(function (t) {
                  return t = t.replace(J, tt),
                    function (e) {
                      return (e.textContent || e.innerText || o(e)).indexOf(t) > -1
                    }
                }),
                lang: at(function (t) {
                  return Y.test(t || "") || st.error("unsupported lang: " + t),
                    t = t.replace(J, tt).toLowerCase(),
                    function (e) {
                      var i;
                      do {
                        if (i = g ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                          return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                      } while ((e = e.parentNode) && 1 === e.nodeType);
                      return !1
                    }
                }),
                target: function (e) {
                  var i = t.location && t.location.hash;
                  return i && i.slice(1) === e.id
                },
                root: function (t) {
                  return t === f
                },
                focus: function (t) {
                  return t === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: pt(!1),
                disabled: pt(!0),
                checked: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function (t) {
                  return t.parentNode && t.parentNode.selectedIndex,
                    !0 === t.selected
                },
                empty: function (t) {
                  for (t = t.firstChild; t; t = t.nextSibling)
                    if (t.nodeType < 6)
                      return !1;
                  return !0
                },
                parent: function (t) {
                  return !n.pseudos.empty(t)
                },
                header: function (t) {
                  return q.test(t.nodeName)
                },
                input: function (t) {
                  return U.test(t.nodeName)
                },
                button: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return "input" === e && "button" === t.type || "button" === e
                },
                text: function (t) {
                  var e;
                  return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: ft(function () {
                  return [0]
                }),
                last: ft(function (t, e) {
                  return [e - 1]
                }),
                eq: ft(function (t, e, i) {
                  return [i < 0 ? i + e : i]
                }),
                even: ft(function (t, e) {
                  for (var i = 0; i < e; i += 2)
                    t.push(i);
                  return t
                }),
                odd: ft(function (t, e) {
                  for (var i = 1; i < e; i += 2)
                    t.push(i);
                  return t
                }),
                lt: ft(function (t, e, i) {
                  for (var n = i < 0 ? i + e : i; --n >= 0;)
                    t.push(n);
                  return t
                }),
                gt: ft(function (t, e, i) {
                  for (var n = i < 0 ? i + e : i; ++n < e;)
                    t.push(n);
                  return t
                })
              }
            }).pseudos.nth = n.pseudos.eq, {
              radio: !0,
              checkbox: !0,
              file: !0,
              password: !0,
              image: !0
            })
            n.pseudos[e] = dt(e);
          for (e in {
              submit: !0,
              reset: !0
            })
            n.pseudos[e] = ut(e);

          function mt() {}

          function vt(t) {
            for (var e = 0, i = t.length, n = ""; e < i; e++)
              n += t[e].value;
            return n
          }

          function yt(t, e, i) {
            var n = e.dir,
              o = e.next,
              s = o || n,
              r = i && "parentNode" === s,
              a = T++;
            return e.first ? function (e, i, o) {
                for (; e = e[n];)
                  if (1 === e.nodeType || r)
                    return t(e, i, o);
                return !1
              } :
              function (e, i, l) {
                var h, c, d, u = [k, a];
                if (l) {
                  for (; e = e[n];)
                    if ((1 === e.nodeType || r) && t(e, i, l))
                      return !0
                } else
                  for (; e = e[n];)
                    if (1 === e.nodeType || r)
                      if (c = (d = e[b] || (e[b] = {}))[e.uniqueID] || (d[e.uniqueID] = {}),
                        o && o === e.nodeName.toLowerCase())
                        e = e[n] || e;
                      else {
                        if ((h = c[s]) && h[0] === k && h[1] === a)
                          return u[2] = h[2];
                        if (c[s] = u,
                          u[2] = t(e, i, l))
                          return !0
                      }
                return !1
              }
          }

          function xt(t) {
            return t.length > 1 ? function (e, i, n) {
                for (var o = t.length; o--;)
                  if (!t[o](e, i, n))
                    return !1;
                return !0
              } :
              t[0]
          }

          function bt(t, e, i, n, o) {
            for (var s, r = [], a = 0, l = t.length, h = null != e; a < l; a++)
              (s = t[a]) && (i && !i(s, n, o) || (r.push(s),
                h && e.push(a)));
            return r
          }

          function wt(t, e, i, n, o, s) {
            return n && !n[b] && (n = wt(n)),
              o && !o[b] && (o = wt(o, s)),
              at(function (s, r, a, l) {
                var h, c, d, u = [],
                  p = [],
                  f = r.length,
                  g = s || function (t, e, i) {
                    for (var n = 0, o = e.length; n < o; n++)
                      st(t, e[n], i);
                    return i
                  }(e || "*", a.nodeType ? [a] : a, []),
                  m = !t || !s && e ? g : bt(g, u, t, a, l),
                  v = i ? o || (s ? t : f || n) ? [] : r : m;
                if (i && i(m, v, a, l),
                  n)
                  for (h = bt(v, p),
                    n(h, [], a, l),
                    c = h.length; c--;)
                    (d = h[c]) && (v[p[c]] = !(m[p[c]] = d));
                if (s) {
                  if (o || t) {
                    if (o) {
                      for (h = [],
                        c = v.length; c--;)
                        (d = v[c]) && h.push(m[c] = d);
                      o(null, v = [], h, l)
                    }
                    for (c = v.length; c--;)
                      (d = v[c]) && (h = o ? L(s, d) : u[c]) > -1 && (s[h] = !(r[h] = d))
                  }
                } else
                  v = bt(v === r ? v.splice(f, v.length) : v),
                  o ? o(null, r, v, l) : I.apply(r, v)
              })
          }

          function kt(t) {
            for (var e, i, o, s = t.length, r = n.relative[t[0].type], a = r || n.relative[" "], l = r ? 1 : 0, c = yt(function (t) {
                return t === e
              }, a, !0), d = yt(function (t) {
                return L(e, t) > -1
              }, a, !0), u = [function (t, i, n) {
                var o = !r && (n || i !== h) || ((e = i).nodeType ? c(t, i, n) : d(t, i, n));
                return e = null,
                  o
              }]; l < s; l++)
              if (i = n.relative[t[l].type])
                u = [yt(xt(u), i)];
              else {
                if ((i = n.filter[t[l].type].apply(null, t[l].matches))[b]) {
                  for (o = ++l; o < s && !n.relative[t[o].type]; o++)
                  ;
                  return wt(l > 1 && xt(u), l > 1 && vt(t.slice(0, l - 1).concat({
                    value: " " === t[l - 2].type ? "*" : ""
                  })).replace(F, "$1"), i, l < o && kt(t.slice(l, o)), o < s && kt(t = t.slice(o)), o < s && vt(t))
                }
                u.push(i)
              }
            return xt(u)
          }
          return mt.prototype = n.filters = n.pseudos,
            n.setFilters = new mt,
            r = st.tokenize = function (t, e) {
              var i, o, s, r, a, l, h, c = C[t + " "];
              if (c)
                return e ? 0 : c.slice(0);
              for (a = t,
                l = [],
                h = n.preFilter; a;) {
                for (r in i && !(o = j.exec(a)) || (o && (a = a.slice(o[0].length) || a),
                    l.push(s = [])),
                  i = !1,
                  (o = $.exec(a)) && (i = o.shift(),
                    s.push({
                      value: i,
                      type: o[0].replace(F, " ")
                    }),
                    a = a.slice(i.length)),
                  n.filter)
                  !(o = V[r].exec(a)) || h[r] && !(o = h[r](o)) || (i = o.shift(),
                    s.push({
                      value: i,
                      type: r,
                      matches: o
                    }),
                    a = a.slice(i.length));
                if (!i)
                  break
              }
              return e ? a.length : a ? st.error(t) : C(t, l).slice(0)
            },
            a = st.compile = function (t, e) {
              var i, o = [],
                s = [],
                a = A[t + " "];
              if (!a) {
                for (e || (e = r(t)),
                  i = e.length; i--;)
                  (a = kt(e[i]))[b] ? o.push(a) : s.push(a);
                (a = A(t, function (t, e) {
                  var i = e.length > 0,
                    o = t.length > 0,
                    s = function (s, r, a, l, c) {
                      var d, f, m, v = 0,
                        y = "0",
                        x = s && [],
                        b = [],
                        w = h,
                        T = s || o && n.find.TAG("*", c),
                        S = k += null == w ? 1 : Math.random() || .1,
                        C = T.length;
                      for (c && (h = r === p || r || c); y !== C && null != (d = T[y]); y++) {
                        if (o && d) {
                          for (f = 0,
                            r || d.ownerDocument === p || (u(d),
                              a = !g); m = t[f++];)
                            if (m(d, r || p, a)) {
                              l.push(d);
                              break
                            }
                          c && (k = S)
                        }
                        i && ((d = !m && d) && v--,
                          s && x.push(d))
                      }
                      if (v += y,
                        i && y !== v) {
                        for (f = 0; m = e[f++];)
                          m(x, b, r, a);
                        if (s) {
                          if (v > 0)
                            for (; y--;)
                              x[y] || b[y] || (b[y] = O.call(l));
                          b = bt(b)
                        }
                        I.apply(l, b),
                          c && !s && b.length > 0 && v + e.length > 1 && st.uniqueSort(l)
                      }
                      return c && (k = S,
                          h = w),
                        x
                    };
                  return i ? at(s) : s
                }(s, o))).selector = t
              }
              return a
            },
            l = st.select = function (t, e, i, o) {
              var s, l, h, c, d, u = "function" == typeof t && t,
                p = !o && r(t = u.selector || t);
              if (i = i || [],
                1 === p.length) {
                if ((l = p[0] = p[0].slice(0)).length > 2 && "ID" === (h = l[0]).type && 9 === e.nodeType && g && n.relative[l[1].type]) {
                  if (!(e = (n.find.ID(h.matches[0].replace(J, tt), e) || [])[0]))
                    return i;
                  u && (e = e.parentNode),
                    t = t.slice(l.shift().value.length)
                }
                for (s = V.needsContext.test(t) ? 0 : l.length; s-- && (h = l[s],
                    !n.relative[c = h.type]);)
                  if ((d = n.find[c]) && (o = d(h.matches[0].replace(J, tt), Q.test(l[0].type) && gt(e.parentNode) || e))) {
                    if (l.splice(s, 1),
                      !(t = o.length && vt(l)))
                      return I.apply(i, o),
                        i;
                    break
                  }
              }
              return (u || a(t, p))(o, e, !g, i, !e || Q.test(t) && gt(e.parentNode) || e),
                i
            },
            i.sortStable = b.split("").sort(M).join("") === b,
            i.detectDuplicates = !!d,
            u(),
            i.sortDetached = lt(function (t) {
              return 1 & t.compareDocumentPosition(p.createElement("fieldset"))
            }),
            lt(function (t) {
              return t.innerHTML = "<a href='#'></a>",
                "#" === t.firstChild.getAttribute("href")
            }) || ht("type|href|height|width", function (t, e, i) {
              if (!i)
                return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }),
            i.attributes && lt(function (t) {
              return t.innerHTML = "<input/>",
                t.firstChild.setAttribute("value", ""),
                "" === t.firstChild.getAttribute("value")
            }) || ht("value", function (t, e, i) {
              if (!i && "input" === t.nodeName.toLowerCase())
                return t.defaultValue
            }),
            lt(function (t) {
              return null == t.getAttribute("disabled")
            }) || ht(N, function (t, e, i) {
              var n;
              if (!i)
                return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }),
            st
        }(i);
      T.find = A,
        T.expr = A.selectors,
        T.expr[":"] = T.expr.pseudos,
        T.uniqueSort = T.unique = A.uniqueSort,
        T.text = A.getText,
        T.isXMLDoc = A.isXML,
        T.contains = A.contains,
        T.escapeSelector = A.escape;
      var M = function (t, e, i) {
          for (var n = [], o = void 0 !== i;
            (t = t[e]) && 9 !== t.nodeType;)
            if (1 === t.nodeType) {
              if (o && T(t).is(i))
                break;
              n.push(t)
            }
          return n
        },
        E = function (t, e) {
          for (var i = []; t; t = t.nextSibling)
            1 === t.nodeType && t !== e && i.push(t);
          return i
        },
        D = T.expr.match.needsContext;

      function O(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
      }
      var P = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

      function I(t, e, i) {
        return y(e) ? T.grep(t, function (t, n) {
          return !!e.call(t, n, t) !== i
        }) : e.nodeType ? T.grep(t, function (t) {
          return t === e !== i
        }) : "string" != typeof e ? T.grep(t, function (t) {
          return d.call(e, t) > -1 !== i
        }) : T.filter(e, t, i)
      }
      T.filter = function (t, e, i) {
          var n = e[0];
          return i && (t = ":not(" + t + ")"),
            1 === e.length && 1 === n.nodeType ? T.find.matchesSelector(n, t) ? [n] : [] : T.find.matches(t, T.grep(e, function (t) {
              return 1 === t.nodeType
            }))
        },
        T.fn.extend({
          find: function (t) {
            var e, i, n = this.length,
              o = this;
            if ("string" != typeof t)
              return this.pushStack(T(t).filter(function () {
                for (e = 0; e < n; e++)
                  if (T.contains(o[e], this))
                    return !0
              }));
            for (i = this.pushStack([]),
              e = 0; e < n; e++)
              T.find(t, o[e], i);
            return n > 1 ? T.uniqueSort(i) : i
          },
          filter: function (t) {
            return this.pushStack(I(this, t || [], !1))
          },
          not: function (t) {
            return this.pushStack(I(this, t || [], !0))
          },
          is: function (t) {
            return !!I(this, "string" == typeof t && D.test(t) ? T(t) : t || [], !1).length
          }
        });
      var _, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
      (T.fn.init = function (t, e, i) {
        var n, o;
        if (!t)
          return this;
        if (i = i || _,
          "string" == typeof t) {
          if (!(n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : L.exec(t)) || !n[1] && e)
            return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
          if (n[1]) {
            if (e = e instanceof T ? e[0] : e,
              T.merge(this, T.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : r, !0)),
              P.test(n[1]) && T.isPlainObject(e))
              for (n in e)
                y(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
            return this
          }
          return (o = r.getElementById(n[2])) && (this[0] = o,
              this.length = 1),
            this
        }
        return t.nodeType ? (this[0] = t,
          this.length = 1,
          this) : y(t) ? void 0 !== i.ready ? i.ready(t) : t(T) : T.makeArray(t, this)
      }).prototype = T.fn,
        _ = T(r);
      var N = /^(?:parents|prev(?:Until|All))/,
        H = {
          children: !0,
          contents: !0,
          next: !0,
          prev: !0
        };

      function R(t, e) {
        for (;
          (t = t[e]) && 1 !== t.nodeType;)
        ;
        return t
      }
      T.fn.extend({
          has: function (t) {
            var e = T(t, this),
              i = e.length;
            return this.filter(function () {
              for (var t = 0; t < i; t++)
                if (T.contains(this, e[t]))
                  return !0
            })
          },
          closest: function (t, e) {
            var i, n = 0,
              o = this.length,
              s = [],
              r = "string" != typeof t && T(t);
            if (!D.test(t))
              for (; n < o; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                  if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && T.find.matchesSelector(i, t))) {
                    s.push(i);
                    break
                  }
            return this.pushStack(s.length > 1 ? T.uniqueSort(s) : s)
          },
          index: function (t) {
            return t ? "string" == typeof t ? d.call(T(t), this[0]) : d.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
          },
          add: function (t, e) {
            return this.pushStack(T.uniqueSort(T.merge(this.get(), T(t, e))))
          },
          addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
          }
        }),
        T.each({
          parent: function (t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
          },
          parents: function (t) {
            return M(t, "parentNode")
          },
          parentsUntil: function (t, e, i) {
            return M(t, "parentNode", i)
          },
          next: function (t) {
            return R(t, "nextSibling")
          },
          prev: function (t) {
            return R(t, "previousSibling")
          },
          nextAll: function (t) {
            return M(t, "nextSibling")
          },
          prevAll: function (t) {
            return M(t, "previousSibling")
          },
          nextUntil: function (t, e, i) {
            return M(t, "nextSibling", i)
          },
          prevUntil: function (t, e, i) {
            return M(t, "previousSibling", i)
          },
          siblings: function (t) {
            return E((t.parentNode || {}).firstChild, t)
          },
          children: function (t) {
            return E(t.firstChild)
          },
          contents: function (t) {
            return O(t, "iframe") ? t.contentDocument : (O(t, "template") && (t = t.content || t),
              T.merge([], t.childNodes))
          }
        }, function (t, e) {
          T.fn[t] = function (i, n) {
            var o = T.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i),
              n && "string" == typeof n && (o = T.filter(n, o)),
              this.length > 1 && (H[t] || T.uniqueSort(o),
                N.test(t) && o.reverse()),
              this.pushStack(o)
          }
        });
      var B = /[^\x20\t\r\n\f]+/g;

      function W(t) {
        return t
      }

      function z(t) {
        throw t
      }

      function F(t, e, i, n) {
        var o;
        try {
          t && y(o = t.promise) ? o.call(t).done(e).fail(i) : t && y(o = t.then) ? o.call(t, e, i) : e.apply(void 0, [t].slice(n))
        } catch (t) {
          i.apply(void 0, [t])
        }
      }
      T.Callbacks = function (t) {
          t = "string" == typeof t ? function (t) {
            var e = {};
            return T.each(t.match(B) || [], function (t, i) {
                e[i] = !0
              }),
              e
          }(t) : T.extend({}, t);
          var e, i, n, o, s = [],
            r = [],
            a = -1,
            l = function () {
              for (o = o || t.once,
                n = e = !0; r.length; a = -1)
                for (i = r.shift(); ++a < s.length;)
                  !1 === s[a].apply(i[0], i[1]) && t.stopOnFalse && (a = s.length,
                    i = !1);
              t.memory || (i = !1),
                e = !1,
                o && (s = i ? [] : "")
            },
            h = {
              add: function () {
                return s && (i && !e && (a = s.length - 1,
                      r.push(i)),
                    function e(i) {
                      T.each(i, function (i, n) {
                        y(n) ? t.unique && h.has(n) || s.push(n) : n && n.length && "string" !== k(n) && e(n)
                      })
                    }(arguments),
                    i && !e && l()),
                  this
              },
              remove: function () {
                return T.each(arguments, function (t, e) {
                    for (var i;
                      (i = T.inArray(e, s, i)) > -1;)
                      s.splice(i, 1),
                      i <= a && a--
                  }),
                  this
              },
              has: function (t) {
                return t ? T.inArray(t, s) > -1 : s.length > 0
              },
              empty: function () {
                return s && (s = []),
                  this
              },
              disable: function () {
                return o = r = [],
                  s = i = "",
                  this
              },
              disabled: function () {
                return !s
              },
              lock: function () {
                return o = r = [],
                  i || e || (s = i = ""),
                  this
              },
              locked: function () {
                return !!o
              },
              fireWith: function (t, i) {
                return o || (i = [t, (i = i || []).slice ? i.slice() : i],
                    r.push(i),
                    e || l()),
                  this
              },
              fire: function () {
                return h.fireWith(this, arguments),
                  this
              },
              fired: function () {
                return !!n
              }
            };
          return h
        },
        T.extend({
          Deferred: function (t) {
            var e = [
                ["notify", "progress", T.Callbacks("memory"), T.Callbacks("memory"), 2],
                ["resolve", "done", T.Callbacks("once memory"), T.Callbacks("once memory"), 0, "resolved"],
                ["reject", "fail", T.Callbacks("once memory"), T.Callbacks("once memory"), 1, "rejected"]
              ],
              n = "pending",
              o = {
                state: function () {
                  return n
                },
                always: function () {
                  return s.done(arguments).fail(arguments),
                    this
                },
                catch: function (t) {
                  return o.then(null, t)
                },
                pipe: function () {
                  var t = arguments;
                  return T.Deferred(function (i) {
                    T.each(e, function (e, n) {
                        var o = y(t[n[4]]) && t[n[4]];
                        s[n[1]](function () {
                          var t = o && o.apply(this, arguments);
                          t && y(t.promise) ? t.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[n[0] + "With"](this, o ? [t] : arguments)
                        })
                      }),
                      t = null
                  }).promise()
                },
                then: function (t, n, o) {
                  var s = 0;

                  function r(t, e, n, o) {
                    return function () {
                      var a = this,
                        l = arguments,
                        h = function () {
                          var i, h;
                          if (!(t < s)) {
                            if ((i = n.apply(a, l)) === e.promise())
                              throw new TypeError("Thenable self-resolution");
                            h = i && ("object" == typeof i || "function" == typeof i) && i.then,
                              y(h) ? o ? h.call(i, r(s, e, W, o), r(s, e, z, o)) : (s++,
                                h.call(i, r(s, e, W, o), r(s, e, z, o), r(s, e, W, e.notifyWith))) : (n !== W && (a = void 0,
                                  l = [i]),
                                (o || e.resolveWith)(a, l))
                          }
                        },
                        c = o ? h : function () {
                          try {
                            h()
                          } catch (i) {
                            T.Deferred.exceptionHook && T.Deferred.exceptionHook(i, c.stackTrace),
                              t + 1 >= s && (n !== z && (a = void 0,
                                  l = [i]),
                                e.rejectWith(a, l))
                          }
                        };
                      t ? c() : (T.Deferred.getStackHook && (c.stackTrace = T.Deferred.getStackHook()),
                        i.setTimeout(c))
                    }
                  }
                  return T.Deferred(function (i) {
                    e[0][3].add(r(0, i, y(o) ? o : W, i.notifyWith)),
                      e[1][3].add(r(0, i, y(t) ? t : W)),
                      e[2][3].add(r(0, i, y(n) ? n : z))
                  }).promise()
                },
                promise: function (t) {
                  return null != t ? T.extend(t, o) : o
                }
              },
              s = {};
            return T.each(e, function (t, i) {
                var r = i[2],
                  a = i[5];
                o[i[1]] = r.add,
                  a && r.add(function () {
                    n = a
                  }, e[3 - t][2].disable, e[3 - t][3].disable, e[0][2].lock, e[0][3].lock),
                  r.add(i[3].fire),
                  s[i[0]] = function () {
                    return s[i[0] + "With"](this === s ? void 0 : this, arguments),
                      this
                  },
                  s[i[0] + "With"] = r.fireWith
              }),
              o.promise(s),
              t && t.call(s, s),
              s
          },
          when: function (t) {
            var e = arguments.length,
              i = e,
              n = Array(i),
              o = l.call(arguments),
              s = T.Deferred(),
              r = function (t) {
                return function (i) {
                  n[t] = this,
                    o[t] = arguments.length > 1 ? l.call(arguments) : i,
                    --e || s.resolveWith(n, o)
                }
              };
            if (e <= 1 && (F(t, s.done(r(i)).resolve, s.reject, !e),
                "pending" === s.state() || y(o[i] && o[i].then)))
              return s.then();
            for (; i--;)
              F(o[i], r(i), s.reject);
            return s.promise()
          }
        });
      var j = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      T.Deferred.exceptionHook = function (t, e) {
          i.console && i.console.warn && t && j.test(t.name) && i.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e)
        },
        T.readyException = function (t) {
          i.setTimeout(function () {
            throw t
          })
        };
      var $ = T.Deferred();

      function G() {
        r.removeEventListener("DOMContentLoaded", G),
          i.removeEventListener("load", G),
          T.ready()
      }
      T.fn.ready = function (t) {
          return $.then(t).catch(function (t) {
              T.readyException(t)
            }),
            this
        },
        T.extend({
          isReady: !1,
          readyWait: 1,
          ready: function (t) {
            (!0 === t ? --T.readyWait : T.isReady) || (T.isReady = !0,
              !0 !== t && --T.readyWait > 0 || $.resolveWith(r, [T]))
          }
        }),
        T.ready.then = $.then,
        "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? i.setTimeout(T.ready) : (r.addEventListener("DOMContentLoaded", G),
          i.addEventListener("load", G));
      var X = function (t, e, i, n, o, s, r) {
          var a = 0,
            l = t.length,
            h = null == i;
          if ("object" === k(i))
            for (a in o = !0,
              i)
              X(t, e, a, i[a], !0, s, r);
          else if (void 0 !== n && (o = !0,
              y(n) || (r = !0),
              h && (r ? (e.call(t, n),
                e = null) : (h = e,
                e = function (t, e, i) {
                  return h.call(T(t), i)
                }
              )),
              e))
            for (; a < l; a++)
              e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
          return o ? t : h ? e.call(t) : l ? e(t[0], i) : s
        },
        Y = /^-ms-/,
        V = /-([a-z])/g;

      function U(t, e) {
        return e.toUpperCase()
      }

      function q(t) {
        return t.replace(Y, "ms-").replace(V, U)
      }
      var K = function (t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
      };

      function Z() {
        this.expando = T.expando + Z.uid++
      }
      Z.uid = 1,
        Z.prototype = {
          cache: function (t) {
            var e = t[this.expando];
            return e || (e = {},
                K(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                  value: e,
                  configurable: !0
                }))),
              e
          },
          set: function (t, e, i) {
            var n, o = this.cache(t);
            if ("string" == typeof e)
              o[q(e)] = i;
            else
              for (n in e)
                o[q(n)] = e[n];
            return o
          },
          get: function (t, e) {
            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][q(e)]
          },
          access: function (t, e, i) {
            return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i),
              void 0 !== i ? i : e)
          },
          remove: function (t, e) {
            var i, n = t[this.expando];
            if (void 0 !== n) {
              if (void 0 !== e) {
                i = (e = Array.isArray(e) ? e.map(q) : (e = q(e)) in n ? [e] : e.match(B) || []).length;
                for (; i--;)
                  delete n[e[i]]
              }
              (void 0 === e || T.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
            }
          },
          hasData: function (t) {
            var e = t[this.expando];
            return void 0 !== e && !T.isEmptyObject(e)
          }
        };
      var Q = new Z,
        J = new Z,
        tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        et = /[A-Z]/g;

      function it(t, e, i) {
        var n;
        if (void 0 === i && 1 === t.nodeType)
          if (n = "data-" + e.replace(et, "-$&").toLowerCase(),
            "string" == typeof (i = t.getAttribute(n))) {
            try {
              i = function (t) {
                return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : tt.test(t) ? JSON.parse(t) : t)
              }(i)
            } catch (t) {}
            J.set(t, e, i)
          } else
            i = void 0;
        return i
      }
      T.extend({
          hasData: function (t) {
            return J.hasData(t) || Q.hasData(t)
          },
          data: function (t, e, i) {
            return J.access(t, e, i)
          },
          removeData: function (t, e) {
            J.remove(t, e)
          },
          _data: function (t, e, i) {
            return Q.access(t, e, i)
          },
          _removeData: function (t, e) {
            Q.remove(t, e)
          }
        }),
        T.fn.extend({
          data: function (t, e) {
            var i, n, o, s = this[0],
              r = s && s.attributes;
            if (void 0 === t) {
              if (this.length && (o = J.get(s),
                  1 === s.nodeType && !Q.get(s, "hasDataAttrs"))) {
                for (i = r.length; i--;)
                  r[i] && 0 === (n = r[i].name).indexOf("data-") && (n = q(n.slice(5)),
                    it(s, n, o[n]));
                Q.set(s, "hasDataAttrs", !0)
              }
              return o
            }
            return "object" == typeof t ? this.each(function () {
              J.set(this, t)
            }) : X(this, function (e) {
              var i;
              if (s && void 0 === e)
                return void 0 !== (i = J.get(s, t)) ? i : void 0 !== (i = it(s, t)) ? i : void 0;
              this.each(function () {
                J.set(this, t, e)
              })
            }, null, e, arguments.length > 1, null, !0)
          },
          removeData: function (t) {
            return this.each(function () {
              J.remove(this, t)
            })
          }
        }),
        T.extend({
          queue: function (t, e, i) {
            var n;
            if (t)
              return e = (e || "fx") + "queue",
                n = Q.get(t, e),
                i && (!n || Array.isArray(i) ? n = Q.access(t, e, T.makeArray(i)) : n.push(i)),
                n || []
          },
          dequeue: function (t, e) {
            e = e || "fx";
            var i = T.queue(t, e),
              n = i.length,
              o = i.shift(),
              s = T._queueHooks(t, e);
            "inprogress" === o && (o = i.shift(),
                n--),
              o && ("fx" === e && i.unshift("inprogress"),
                delete s.stop,
                o.call(t, function () {
                  T.dequeue(t, e)
                }, s)),
              !n && s && s.empty.fire()
          },
          _queueHooks: function (t, e) {
            var i = e + "queueHooks";
            return Q.get(t, i) || Q.access(t, i, {
              empty: T.Callbacks("once memory").add(function () {
                Q.remove(t, [e + "queue", i])
              })
            })
          }
        }),
        T.fn.extend({
          queue: function (t, e) {
            var i = 2;
            return "string" != typeof t && (e = t,
                t = "fx",
                i--),
              arguments.length < i ? T.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                var i = T.queue(this, t, e);
                T._queueHooks(this, t),
                  "fx" === t && "inprogress" !== i[0] && T.dequeue(this, t)
              })
          },
          dequeue: function (t) {
            return this.each(function () {
              T.dequeue(this, t)
            })
          },
          clearQueue: function (t) {
            return this.queue(t || "fx", [])
          },
          promise: function (t, e) {
            var i, n = 1,
              o = T.Deferred(),
              s = this,
              r = this.length,
              a = function () {
                --n || o.resolveWith(s, [s])
              };
            for ("string" != typeof t && (e = t,
                t = void 0),
              t = t || "fx"; r--;)
              (i = Q.get(s[r], t + "queueHooks")) && i.empty && (n++,
                i.empty.add(a));
            return a(),
              o.promise(e)
          }
        });
      var nt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ot = new RegExp("^(?:([+-])=|)(" + nt + ")([a-z%]*)$", "i"),
        st = ["Top", "Right", "Bottom", "Left"],
        rt = function (t, e) {
          return "none" === (t = e || t).style.display || "" === t.style.display && T.contains(t.ownerDocument, t) && "none" === T.css(t, "display")
        },
        at = function (t, e, i, n) {
          var o, s, r = {};
          for (s in e)
            r[s] = t.style[s],
            t.style[s] = e[s];
          for (s in o = i.apply(t, n || []),
            e)
            t.style[s] = r[s];
          return o
        };

      function lt(t, e, i, n) {
        var o, s, r = 20,
          a = n ? function () {
            return n.cur()
          } :
          function () {
            return T.css(t, e, "")
          },
          l = a(),
          h = i && i[3] || (T.cssNumber[e] ? "" : "px"),
          c = (T.cssNumber[e] || "px" !== h && +l) && ot.exec(T.css(t, e));
        if (c && c[3] !== h) {
          for (l /= 2,
            h = h || c[3],
            c = +l || 1; r--;)
            T.style(t, e, c + h),
            (1 - s) * (1 - (s = a() / l || .5)) <= 0 && (r = 0),
            c /= s;
          c *= 2,
            T.style(t, e, c + h),
            i = i || []
        }
        return i && (c = +c || +l || 0,
            o = i[1] ? c + (i[1] + 1) * i[2] : +i[2],
            n && (n.unit = h,
              n.start = c,
              n.end = o)),
          o
      }
      var ht = {};

      function ct(t) {
        var e, i = t.ownerDocument,
          n = t.nodeName,
          o = ht[n];
        return o || (e = i.body.appendChild(i.createElement(n)),
          o = T.css(e, "display"),
          e.parentNode.removeChild(e),
          "none" === o && (o = "block"),
          ht[n] = o,
          o)
      }

      function dt(t, e) {
        for (var i, n, o = [], s = 0, r = t.length; s < r; s++)
          (n = t[s]).style && (i = n.style.display,
            e ? ("none" === i && (o[s] = Q.get(n, "display") || null,
                o[s] || (n.style.display = "")),
              "" === n.style.display && rt(n) && (o[s] = ct(n))) : "none" !== i && (o[s] = "none",
              Q.set(n, "display", i)));
        for (s = 0; s < r; s++)
          null != o[s] && (t[s].style.display = o[s]);
        return t
      }
      T.fn.extend({
        show: function () {
          return dt(this, !0)
        },
        hide: function () {
          return dt(this)
        },
        toggle: function (t) {
          return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
            rt(this) ? T(this).show() : T(this).hide()
          })
        }
      });
      var ut = /^(?:checkbox|radio)$/i,
        pt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        ft = /^$|^module$|\/(?:java|ecma)script/i,
        gt = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };

      function mt(t, e) {
        var i;
        return i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [],
          void 0 === e || e && O(t, e) ? T.merge([t], i) : i
      }

      function vt(t, e) {
        for (var i = 0, n = t.length; i < n; i++)
          Q.set(t[i], "globalEval", !e || Q.get(e[i], "globalEval"))
      }
      gt.optgroup = gt.option,
        gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead,
        gt.th = gt.td;
      var yt, xt, bt = /<|&#?\w+;/;

      function wt(t, e, i, n, o) {
        for (var s, r, a, l, h, c, d = e.createDocumentFragment(), u = [], p = 0, f = t.length; p < f; p++)
          if ((s = t[p]) || 0 === s)
            if ("object" === k(s))
              T.merge(u, s.nodeType ? [s] : s);
            else if (bt.test(s)) {
          for (r = r || d.appendChild(e.createElement("div")),
            a = (pt.exec(s) || ["", ""])[1].toLowerCase(),
            l = gt[a] || gt._default,
            r.innerHTML = l[1] + T.htmlPrefilter(s) + l[2],
            c = l[0]; c--;)
            r = r.lastChild;
          T.merge(u, r.childNodes),
            (r = d.firstChild).textContent = ""
        } else
          u.push(e.createTextNode(s));
        for (d.textContent = "",
          p = 0; s = u[p++];)
          if (n && T.inArray(s, n) > -1)
            o && o.push(s);
          else if (h = T.contains(s.ownerDocument, s),
          r = mt(d.appendChild(s), "script"),
          h && vt(r),
          i)
          for (c = 0; s = r[c++];)
            ft.test(s.type || "") && i.push(s);
        return d
      }
      yt = r.createDocumentFragment().appendChild(r.createElement("div")),
        (xt = r.createElement("input")).setAttribute("type", "radio"),
        xt.setAttribute("checked", "checked"),
        xt.setAttribute("name", "t"),
        yt.appendChild(xt),
        v.checkClone = yt.cloneNode(!0).cloneNode(!0).lastChild.checked,
        yt.innerHTML = "<textarea>x</textarea>",
        v.noCloneChecked = !!yt.cloneNode(!0).lastChild.defaultValue;
      var kt = r.documentElement,
        Tt = /^key/,
        St = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ct = /^([^.]*)(?:\.(.+)|)/;

      function At() {
        return !0
      }

      function Mt() {
        return !1
      }

      function Et() {
        try {
          return r.activeElement
        } catch (t) {}
      }

      function Dt(t, e, i, n, o, s) {
        var r, a;
        if ("object" == typeof e) {
          for (a in "string" != typeof i && (n = n || i,
              i = void 0),
            e)
            Dt(t, a, i, n, e[a], s);
          return t
        }
        if (null == n && null == o ? (o = i,
            n = i = void 0) : null == o && ("string" == typeof i ? (o = n,
            n = void 0) : (o = n,
            n = i,
            i = void 0)),
          !1 === o)
          o = Mt;
        else if (!o)
          return t;
        return 1 === s && (r = o,
            (o = function (t) {
              return T().off(t),
                r.apply(this, arguments)
            }).guid = r.guid || (r.guid = T.guid++)),
          t.each(function () {
            T.event.add(this, e, o, n, i)
          })
      }
      T.event = {
          global: {},
          add: function (t, e, i, n, o) {
            var s, r, a, l, h, c, d, u, p, f, g, m = Q.get(t);
            if (m)
              for (i.handler && (i = (s = i).handler,
                  o = s.selector),
                o && T.find.matchesSelector(kt, o),
                i.guid || (i.guid = T.guid++),
                (l = m.events) || (l = m.events = {}),
                (r = m.handle) || (r = m.handle = function (e) {
                  return void 0 !== T && T.event.triggered !== e.type ? T.event.dispatch.apply(t, arguments) : void 0
                }),
                h = (e = (e || "").match(B) || [""]).length; h--;)
                p = g = (a = Ct.exec(e[h]) || [])[1],
                f = (a[2] || "").split(".").sort(),
                p && (d = T.event.special[p] || {},
                  p = (o ? d.delegateType : d.bindType) || p,
                  d = T.event.special[p] || {},
                  c = T.extend({
                    type: p,
                    origType: g,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && T.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                  }, s),
                  (u = l[p]) || ((u = l[p] = []).delegateCount = 0,
                    d.setup && !1 !== d.setup.call(t, n, f, r) || t.addEventListener && t.addEventListener(p, r)),
                  d.add && (d.add.call(t, c),
                    c.handler.guid || (c.handler.guid = i.guid)),
                  o ? u.splice(u.delegateCount++, 0, c) : u.push(c),
                  T.event.global[p] = !0)
          },
          remove: function (t, e, i, n, o) {
            var s, r, a, l, h, c, d, u, p, f, g, m = Q.hasData(t) && Q.get(t);
            if (m && (l = m.events)) {
              for (h = (e = (e || "").match(B) || [""]).length; h--;)
                if (p = g = (a = Ct.exec(e[h]) || [])[1],
                  f = (a[2] || "").split(".").sort(),
                  p) {
                  for (d = T.event.special[p] || {},
                    u = l[p = (n ? d.delegateType : d.bindType) || p] || [],
                    a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                    r = s = u.length; s--;)
                    c = u[s],
                    !o && g !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (u.splice(s, 1),
                      c.selector && u.delegateCount--,
                      d.remove && d.remove.call(t, c));
                  r && !u.length && (d.teardown && !1 !== d.teardown.call(t, f, m.handle) || T.removeEvent(t, p, m.handle),
                    delete l[p])
                } else
                  for (p in l)
                    T.event.remove(t, p + e[h], i, n, !0);
              T.isEmptyObject(l) && Q.remove(t, "handle events")
            }
          },
          dispatch: function (t) {
            var e, i, n, o, s, r, a = T.event.fix(t),
              l = new Array(arguments.length),
              h = (Q.get(this, "events") || {})[a.type] || [],
              c = T.event.special[a.type] || {};
            for (l[0] = a,
              e = 1; e < arguments.length; e++)
              l[e] = arguments[e];
            if (a.delegateTarget = this,
              !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
              for (r = T.event.handlers.call(this, a, h),
                e = 0;
                (o = r[e++]) && !a.isPropagationStopped();)
                for (a.currentTarget = o.elem,
                  i = 0;
                  (s = o.handlers[i++]) && !a.isImmediatePropagationStopped();)
                  a.rnamespace && !a.rnamespace.test(s.namespace) || (a.handleObj = s,
                    a.data = s.data,
                    void 0 !== (n = ((T.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(),
                      a.stopPropagation()));
              return c.postDispatch && c.postDispatch.call(this, a),
                a.result
            }
          },
          handlers: function (t, e) {
            var i, n, o, s, r, a = [],
              l = e.delegateCount,
              h = t.target;
            if (l && h.nodeType && !("click" === t.type && t.button >= 1))
              for (; h !== this; h = h.parentNode || this)
                if (1 === h.nodeType && ("click" !== t.type || !0 !== h.disabled)) {
                  for (s = [],
                    r = {},
                    i = 0; i < l; i++)
                    void 0 === r[o = (n = e[i]).selector + " "] && (r[o] = n.needsContext ? T(o, this).index(h) > -1 : T.find(o, this, null, [h]).length),
                    r[o] && s.push(n);
                  s.length && a.push({
                    elem: h,
                    handlers: s
                  })
                }
            return h = this,
              l < e.length && a.push({
                elem: h,
                handlers: e.slice(l)
              }),
              a
          },
          addProp: function (t, e) {
            Object.defineProperty(T.Event.prototype, t, {
              enumerable: !0,
              configurable: !0,
              get: y(e) ? function () {
                if (this.originalEvent)
                  return e(this.originalEvent)
              } : function () {
                if (this.originalEvent)
                  return this.originalEvent[t]
              },
              set: function (e) {
                Object.defineProperty(this, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: e
                })
              }
            })
          },
          fix: function (t) {
            return t[T.expando] ? t : new T.Event(t)
          },
          special: {
            load: {
              noBubble: !0
            },
            focus: {
              trigger: function () {
                if (this !== Et() && this.focus)
                  return this.focus(),
                    !1
              },
              delegateType: "focusin"
            },
            blur: {
              trigger: function () {
                if (this === Et() && this.blur)
                  return this.blur(),
                    !1
              },
              delegateType: "focusout"
            },
            click: {
              trigger: function () {
                if ("checkbox" === this.type && this.click && O(this, "input"))
                  return this.click(),
                    !1
              },
              _default: function (t) {
                return O(t.target, "a")
              }
            },
            beforeunload: {
              postDispatch: function (t) {
                void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
              }
            }
          }
        },
        T.removeEvent = function (t, e, i) {
          t.removeEventListener && t.removeEventListener(e, i)
        },
        T.Event = function (t, e) {
          if (!(this instanceof T.Event))
            return new T.Event(t, e);
          t && t.type ? (this.originalEvent = t,
              this.type = t.type,
              this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? At : Mt,
              this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target,
              this.currentTarget = t.currentTarget,
              this.relatedTarget = t.relatedTarget) : this.type = t,
            e && T.extend(this, e),
            this.timeStamp = t && t.timeStamp || Date.now(),
            this[T.expando] = !0
        },
        T.Event.prototype = {
          constructor: T.Event,
          isDefaultPrevented: Mt,
          isPropagationStopped: Mt,
          isImmediatePropagationStopped: Mt,
          isSimulated: !1,
          preventDefault: function () {
            var t = this.originalEvent;
            this.isDefaultPrevented = At,
              t && !this.isSimulated && t.preventDefault()
          },
          stopPropagation: function () {
            var t = this.originalEvent;
            this.isPropagationStopped = At,
              t && !this.isSimulated && t.stopPropagation()
          },
          stopImmediatePropagation: function () {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = At,
              t && !this.isSimulated && t.stopImmediatePropagation(),
              this.stopPropagation()
          }
        },
        T.each({
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (t) {
            var e = t.button;
            return null == t.which && Tt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && St.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
          }
        }, T.event.addProp),
        T.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function (t, e) {
          T.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function (t) {
              var i, n = t.relatedTarget,
                o = t.handleObj;
              return n && (n === this || T.contains(this, n)) || (t.type = o.origType,
                  i = o.handler.apply(this, arguments),
                  t.type = e),
                i
            }
          }
        }),
        T.fn.extend({
          on: function (t, e, i, n) {
            return Dt(this, t, e, i, n)
          },
          one: function (t, e, i, n) {
            return Dt(this, t, e, i, n, 1)
          },
          off: function (t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj)
              return n = t.handleObj,
                T(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler),
                this;
            if ("object" == typeof t) {
              for (o in t)
                this.off(o, e, t[o]);
              return this
            }
            return !1 !== e && "function" != typeof e || (i = e,
                e = void 0),
              !1 === i && (i = Mt),
              this.each(function () {
                T.event.remove(this, t, i, e)
              })
          }
        });
      var Ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Pt = /<script|<style|<link/i,
        It = /checked\s*(?:[^=]|=\s*.checked.)/i,
        _t = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

      function Lt(t, e) {
        return O(t, "table") && O(11 !== e.nodeType ? e : e.firstChild, "tr") && T(t).children("tbody")[0] || t
      }

      function Nt(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type,
          t
      }

      function Ht(t) {
        return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"),
          t
      }

      function Rt(t, e) {
        var i, n, o, s, r, a, l, h;
        if (1 === e.nodeType) {
          if (Q.hasData(t) && (s = Q.access(t),
              r = Q.set(e, s),
              h = s.events))
            for (o in delete r.handle,
              r.events = {},
              h)
              for (i = 0,
                n = h[o].length; i < n; i++)
                T.event.add(e, o, h[o][i]);
          J.hasData(t) && (a = J.access(t),
            l = T.extend({}, a),
            J.set(e, l))
        }
      }

      function Bt(t, e, i, n) {
        e = h.apply([], e);
        var o, s, r, a, l, c, d = 0,
          u = t.length,
          p = u - 1,
          f = e[0],
          g = y(f);
        if (g || u > 1 && "string" == typeof f && !v.checkClone && It.test(f))
          return t.each(function (o) {
            var s = t.eq(o);
            g && (e[0] = f.call(this, o, s.html())),
              Bt(s, e, i, n)
          });
        if (u && (s = (o = wt(e, t[0].ownerDocument, !1, t, n)).firstChild,
            1 === o.childNodes.length && (o = s),
            s || n)) {
          for (a = (r = T.map(mt(o, "script"), Nt)).length; d < u; d++)
            l = o,
            d !== p && (l = T.clone(l, !0, !0),
              a && T.merge(r, mt(l, "script"))),
            i.call(t[d], l, d);
          if (a)
            for (c = r[r.length - 1].ownerDocument,
              T.map(r, Ht),
              d = 0; d < a; d++)
              l = r[d],
              ft.test(l.type || "") && !Q.access(l, "globalEval") && T.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? T._evalUrl && T._evalUrl(l.src) : w(l.textContent.replace(_t, ""), c, l))
        }
        return t
      }

      function Wt(t, e, i) {
        for (var n, o = e ? T.filter(e, t) : t, s = 0; null != (n = o[s]); s++)
          i || 1 !== n.nodeType || T.cleanData(mt(n)),
          n.parentNode && (i && T.contains(n.ownerDocument, n) && vt(mt(n, "script")),
            n.parentNode.removeChild(n));
        return t
      }
      T.extend({
          htmlPrefilter: function (t) {
            return t.replace(Ot, "<$1></$2>")
          },
          clone: function (t, e, i) {
            var n, o, s, r, a, l, h, c = t.cloneNode(!0),
              d = T.contains(t.ownerDocument, t);
            if (!(v.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || T.isXMLDoc(t)))
              for (r = mt(c),
                n = 0,
                o = (s = mt(t)).length; n < o; n++)
                a = s[n],
                l = r[n],
                void 0,
                "input" === (h = l.nodeName.toLowerCase()) && ut.test(a.type) ? l.checked = a.checked : "input" !== h && "textarea" !== h || (l.defaultValue = a.defaultValue);
            if (e)
              if (i)
                for (s = s || mt(t),
                  r = r || mt(c),
                  n = 0,
                  o = s.length; n < o; n++)
                  Rt(s[n], r[n]);
              else
                Rt(t, c);
            return (r = mt(c, "script")).length > 0 && vt(r, !d && mt(t, "script")),
              c
          },
          cleanData: function (t) {
            for (var e, i, n, o = T.event.special, s = 0; void 0 !== (i = t[s]); s++)
              if (K(i)) {
                if (e = i[Q.expando]) {
                  if (e.events)
                    for (n in e.events)
                      o[n] ? T.event.remove(i, n) : T.removeEvent(i, n, e.handle);
                  i[Q.expando] = void 0
                }
                i[J.expando] && (i[J.expando] = void 0)
              }
          }
        }),
        T.fn.extend({
          detach: function (t) {
            return Wt(this, t, !0)
          },
          remove: function (t) {
            return Wt(this, t)
          },
          text: function (t) {
            return X(this, function (t) {
              return void 0 === t ? T.text(this) : this.empty().each(function () {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
              })
            }, null, t, arguments.length)
          },
          append: function () {
            return Bt(this, arguments, function (t) {
              1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Lt(this, t).appendChild(t)
            })
          },
          prepend: function () {
            return Bt(this, arguments, function (t) {
              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var e = Lt(this, t);
                e.insertBefore(t, e.firstChild)
              }
            })
          },
          before: function () {
            return Bt(this, arguments, function (t) {
              this.parentNode && this.parentNode.insertBefore(t, this)
            })
          },
          after: function () {
            return Bt(this, arguments, function (t) {
              this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
          },
          empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++)
              1 === t.nodeType && (T.cleanData(mt(t, !1)),
                t.textContent = "");
            return this
          },
          clone: function (t, e) {
            return t = null != t && t,
              e = null == e ? t : e,
              this.map(function () {
                return T.clone(this, t, e)
              })
          },
          html: function (t) {
            return X(this, function (t) {
              var e = this[0] || {},
                i = 0,
                n = this.length;
              if (void 0 === t && 1 === e.nodeType)
                return e.innerHTML;
              if ("string" == typeof t && !Pt.test(t) && !gt[(pt.exec(t) || ["", ""])[1].toLowerCase()]) {
                t = T.htmlPrefilter(t);
                try {
                  for (; i < n; i++)
                    1 === (e = this[i] || {}).nodeType && (T.cleanData(mt(e, !1)),
                      e.innerHTML = t);
                  e = 0
                } catch (t) {}
              }
              e && this.empty().append(t)
            }, null, t, arguments.length)
          },
          replaceWith: function () {
            var t = [];
            return Bt(this, arguments, function (e) {
              var i = this.parentNode;
              T.inArray(this, t) < 0 && (T.cleanData(mt(this)),
                i && i.replaceChild(e, this))
            }, t)
          }
        }),
        T.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function (t, e) {
          T.fn[t] = function (t) {
            for (var i, n = [], o = T(t), s = o.length - 1, r = 0; r <= s; r++)
              i = r === s ? this : this.clone(!0),
              T(o[r])[e](i),
              c.apply(n, i.get());
            return this.pushStack(n)
          }
        });
      var zt = new RegExp("^(" + nt + ")(?!px)[a-z%]+$", "i"),
        Ft = function (t) {
          var e = t.ownerDocument.defaultView;
          return e && e.opener || (e = i),
            e.getComputedStyle(t)
        },
        jt = new RegExp(st.join("|"), "i");

      function $t(t, e, i) {
        var n, o, s, r, a = t.style;
        return (i = i || Ft(t)) && ("" !== (r = i.getPropertyValue(e) || i[e]) || T.contains(t.ownerDocument, t) || (r = T.style(t, e)),
            !v.pixelBoxStyles() && zt.test(r) && jt.test(e) && (n = a.width,
              o = a.minWidth,
              s = a.maxWidth,
              a.minWidth = a.maxWidth = a.width = r,
              r = i.width,
              a.width = n,
              a.minWidth = o,
              a.maxWidth = s)),
          void 0 !== r ? r + "" : r
      }

      function Gt(t, e) {
        return {
          get: function () {
            if (!t())
              return (this.get = e).apply(this, arguments);
            delete this.get
          }
        }
      }! function () {
        function t() {
          if (c) {
            h.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
              c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
              kt.appendChild(h).appendChild(c);
            var t = i.getComputedStyle(c);
            n = "1%" !== t.top,
              l = 12 === e(t.marginLeft),
              c.style.right = "60%",
              a = 36 === e(t.right),
              o = 36 === e(t.width),
              c.style.position = "absolute",
              s = 36 === c.offsetWidth || "absolute",
              kt.removeChild(h),
              c = null
          }
        }

        function e(t) {
          return Math.round(parseFloat(t))
        }
        var n, o, s, a, l, h = r.createElement("div"),
          c = r.createElement("div");
        c.style && (c.style.backgroundClip = "content-box",
          c.cloneNode(!0).style.backgroundClip = "",
          v.clearCloneStyle = "content-box" === c.style.backgroundClip,
          T.extend(v, {
            boxSizingReliable: function () {
              return t(),
                o
            },
            pixelBoxStyles: function () {
              return t(),
                a
            },
            pixelPosition: function () {
              return t(),
                n
            },
            reliableMarginLeft: function () {
              return t(),
                l
            },
            scrollboxSize: function () {
              return t(),
                s
            }
          }))
      }();
      var Xt = /^(none|table(?!-c[ea]).+)/,
        Yt = /^--/,
        Vt = {
          position: "absolute",
          visibility: "hidden",
          display: "block"
        },
        Ut = {
          letterSpacing: "0",
          fontWeight: "400"
        },
        qt = ["Webkit", "Moz", "ms"],
        Kt = r.createElement("div").style;

      function Zt(t) {
        var e = T.cssProps[t];
        return e || (e = T.cssProps[t] = function (t) {
            if (t in Kt)
              return t;
            for (var e = t[0].toUpperCase() + t.slice(1), i = qt.length; i--;)
              if ((t = qt[i] + e) in Kt)
                return t
          }(t) || t),
          e
      }

      function Qt(t, e, i) {
        var n = ot.exec(e);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
      }

      function Jt(t, e, i, n, o, s) {
        var r = "width" === e ? 1 : 0,
          a = 0,
          l = 0;
        if (i === (n ? "border" : "content"))
          return 0;
        for (; r < 4; r += 2)
          "margin" === i && (l += T.css(t, i + st[r], !0, o)),
          n ? ("content" === i && (l -= T.css(t, "padding" + st[r], !0, o)),
            "margin" !== i && (l -= T.css(t, "border" + st[r] + "Width", !0, o))) : (l += T.css(t, "padding" + st[r], !0, o),
            "padding" !== i ? l += T.css(t, "border" + st[r] + "Width", !0, o) : a += T.css(t, "border" + st[r] + "Width", !0, o));
        return !n && s >= 0 && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - s - l - a - .5))),
          l
      }

      function te(t, e, i) {
        var n = Ft(t),
          o = $t(t, e, n),
          s = "border-box" === T.css(t, "boxSizing", !1, n),
          r = s;
        if (zt.test(o)) {
          if (!i)
            return o;
          o = "auto"
        }
        return r = r && (v.boxSizingReliable() || o === t.style[e]),
          ("auto" === o || !parseFloat(o) && "inline" === T.css(t, "display", !1, n)) && (o = t["offset" + e[0].toUpperCase() + e.slice(1)],
            r = !0),
          (o = parseFloat(o) || 0) + Jt(t, e, i || (s ? "border" : "content"), r, n, o) + "px"
      }

      function ee(t, e, i, n, o) {
        return new ee.prototype.init(t, e, i, n, o)
      }
      T.extend({
          cssHooks: {
            opacity: {
              get: function (t, e) {
                if (e) {
                  var i = $t(t, "opacity");
                  return "" === i ? "1" : i
                }
              }
            }
          },
          cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
          },
          cssProps: {},
          style: function (t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
              var o, s, r, a = q(e),
                l = Yt.test(e),
                h = t.style;
              if (l || (e = Zt(a)),
                r = T.cssHooks[e] || T.cssHooks[a],
                void 0 === i)
                return r && "get" in r && void 0 !== (o = r.get(t, !1, n)) ? o : h[e];
              "string" === (s = typeof i) && (o = ot.exec(i)) && o[1] && (i = lt(t, e, o),
                  s = "number"),
                null != i && i == i && ("number" === s && (i += o && o[3] || (T.cssNumber[a] ? "" : "px")),
                  v.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (h[e] = "inherit"),
                  r && "set" in r && void 0 === (i = r.set(t, i, n)) || (l ? h.setProperty(e, i) : h[e] = i))
            }
          },
          css: function (t, e, i, n) {
            var o, s, r, a = q(e);
            return Yt.test(e) || (e = Zt(a)),
              (r = T.cssHooks[e] || T.cssHooks[a]) && "get" in r && (o = r.get(t, !0, i)),
              void 0 === o && (o = $t(t, e, n)),
              "normal" === o && e in Ut && (o = Ut[e]),
              "" === i || i ? (s = parseFloat(o),
                !0 === i || isFinite(s) ? s || 0 : o) : o
          }
        }),
        T.each(["height", "width"], function (t, e) {
          T.cssHooks[e] = {
            get: function (t, i, n) {
              if (i)
                return !Xt.test(T.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? te(t, e, n) : at(t, Vt, function () {
                  return te(t, e, n)
                })
            },
            set: function (t, i, n) {
              var o, s = Ft(t),
                r = "border-box" === T.css(t, "boxSizing", !1, s),
                a = n && Jt(t, e, n, r, s);
              return r && v.scrollboxSize() === s.position && (a -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(s[e]) - Jt(t, e, "border", !1, s) - .5)),
                a && (o = ot.exec(i)) && "px" !== (o[3] || "px") && (t.style[e] = i,
                  i = T.css(t, e)),
                Qt(0, i, a)
            }
          }
        }),
        T.cssHooks.marginLeft = Gt(v.reliableMarginLeft, function (t, e) {
          if (e)
            return (parseFloat($t(t, "marginLeft")) || t.getBoundingClientRect().left - at(t, {
              marginLeft: 0
            }, function () {
              return t.getBoundingClientRect().left
            })) + "px"
        }),
        T.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function (t, e) {
          T.cssHooks[t + e] = {
              expand: function (i) {
                for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++)
                  o[t + st[n] + e] = s[n] || s[n - 2] || s[0];
                return o
              }
            },
            "margin" !== t && (T.cssHooks[t + e].set = Qt)
        }),
        T.fn.extend({
          css: function (t, e) {
            return X(this, function (t, e, i) {
              var n, o, s = {},
                r = 0;
              if (Array.isArray(e)) {
                for (n = Ft(t),
                  o = e.length; r < o; r++)
                  s[e[r]] = T.css(t, e[r], !1, n);
                return s
              }
              return void 0 !== i ? T.style(t, e, i) : T.css(t, e)
            }, t, e, arguments.length > 1)
          }
        }),
        T.Tween = ee,
        ee.prototype = {
          constructor: ee,
          init: function (t, e, i, n, o, s) {
            this.elem = t,
              this.prop = i,
              this.easing = o || T.easing._default,
              this.options = e,
              this.start = this.now = this.cur(),
              this.end = n,
              this.unit = s || (T.cssNumber[i] ? "" : "px")
          },
          cur: function () {
            var t = ee.propHooks[this.prop];
            return t && t.get ? t.get(this) : ee.propHooks._default.get(this)
          },
          run: function (t) {
            var e, i = ee.propHooks[this.prop];
            return this.options.duration ? this.pos = e = T.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t,
              this.now = (this.end - this.start) * e + this.start,
              this.options.step && this.options.step.call(this.elem, this.now, this),
              i && i.set ? i.set(this) : ee.propHooks._default.set(this),
              this
          }
        },
        ee.prototype.init.prototype = ee.prototype,
        ee.propHooks = {
          _default: {
            get: function (t) {
              var e;
              return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = T.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
            },
            set: function (t) {
              T.fx.step[t.prop] ? T.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[T.cssProps[t.prop]] && !T.cssHooks[t.prop] ? t.elem[t.prop] = t.now : T.style(t.elem, t.prop, t.now + t.unit)
            }
          }
        },
        ee.propHooks.scrollTop = ee.propHooks.scrollLeft = {
          set: function (t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
          }
        },
        T.easing = {
          linear: function (t) {
            return t
          },
          swing: function (t) {
            return .5 - Math.cos(t * Math.PI) / 2
          },
          _default: "swing"
        },
        T.fx = ee.prototype.init,
        T.fx.step = {};
      var ie, ne, oe = /^(?:toggle|show|hide)$/,
        se = /queueHooks$/;

      function re() {
        ne && (!1 === r.hidden && i.requestAnimationFrame ? i.requestAnimationFrame(re) : i.setTimeout(re, T.fx.interval),
          T.fx.tick())
      }

      function ae() {
        return i.setTimeout(function () {
            ie = void 0
          }),
          ie = Date.now()
      }

      function le(t, e) {
        var i, n = 0,
          o = {
            height: t
          };
        for (e = e ? 1 : 0; n < 4; n += 2 - e)
          o["margin" + (i = st[n])] = o["padding" + i] = t;
        return e && (o.opacity = o.width = t),
          o
      }

      function he(t, e, i) {
        for (var n, o = (ce.tweeners[e] || []).concat(ce.tweeners["*"]), s = 0, r = o.length; s < r; s++)
          if (n = o[s].call(i, e, t))
            return n
      }

      function ce(t, e, i) {
        var n, o, s = 0,
          r = ce.prefilters.length,
          a = T.Deferred().always(function () {
            delete l.elem
          }),
          l = function () {
            if (o)
              return !1;
            for (var e = ie || ae(), i = Math.max(0, h.startTime + h.duration - e), n = 1 - (i / h.duration || 0), s = 0, r = h.tweens.length; s < r; s++)
              h.tweens[s].run(n);
            return a.notifyWith(t, [h, n, i]),
              n < 1 && r ? i : (r || a.notifyWith(t, [h, 1, 0]),
                a.resolveWith(t, [h]),
                !1)
          },
          h = a.promise({
            elem: t,
            props: T.extend({}, e),
            opts: T.extend(!0, {
              specialEasing: {},
              easing: T.easing._default
            }, i),
            originalProperties: e,
            originalOptions: i,
            startTime: ie || ae(),
            duration: i.duration,
            tweens: [],
            createTween: function (e, i) {
              var n = T.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
              return h.tweens.push(n),
                n
            },
            stop: function (e) {
              var i = 0,
                n = e ? h.tweens.length : 0;
              if (o)
                return this;
              for (o = !0; i < n; i++)
                h.tweens[i].run(1);
              return e ? (a.notifyWith(t, [h, 1, 0]),
                  a.resolveWith(t, [h, e])) : a.rejectWith(t, [h, e]),
                this
            }
          }),
          c = h.props;
        for (! function (t, e) {
            var i, n, o, s, r;
            for (i in t)
              if (o = e[n = q(i)],
                s = t[i],
                Array.isArray(s) && (o = s[1],
                  s = t[i] = s[0]),
                i !== n && (t[n] = s,
                  delete t[i]),
                (r = T.cssHooks[n]) && "expand" in r)
                for (i in s = r.expand(s),
                  delete t[n],
                  s)
                  i in t || (t[i] = s[i],
                    e[i] = o);
              else
                e[n] = o
          }(c, h.opts.specialEasing); s < r; s++)
          if (n = ce.prefilters[s].call(h, t, c, h.opts))
            return y(n.stop) && (T._queueHooks(h.elem, h.opts.queue).stop = n.stop.bind(n)),
              n;
        return T.map(c, he, h),
          y(h.opts.start) && h.opts.start.call(t, h),
          h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always),
          T.fx.timer(T.extend(l, {
            elem: t,
            anim: h,
            queue: h.opts.queue
          })),
          h
      }
      T.Animation = T.extend(ce, {
          tweeners: {
            "*": [function (t, e) {
              var i = this.createTween(t, e);
              return lt(i.elem, t, ot.exec(e), i),
                i
            }]
          },
          tweener: function (t, e) {
            y(t) ? (e = t,
              t = ["*"]) : t = t.match(B);
            for (var i, n = 0, o = t.length; n < o; n++)
              i = t[n],
              ce.tweeners[i] = ce.tweeners[i] || [],
              ce.tweeners[i].unshift(e)
          },
          prefilters: [function (t, e, i) {
            var n, o, s, r, a, l, h, c, d = "width" in e || "height" in e,
              u = this,
              p = {},
              f = t.style,
              g = t.nodeType && rt(t),
              m = Q.get(t, "fxshow");
            for (n in i.queue || (null == (r = T._queueHooks(t, "fx")).unqueued && (r.unqueued = 0,
                  a = r.empty.fire,
                  r.empty.fire = function () {
                    r.unqueued || a()
                  }
                ),
                r.unqueued++,
                u.always(function () {
                  u.always(function () {
                    r.unqueued--,
                      T.queue(t, "fx").length || r.empty.fire()
                  })
                })),
              e)
              if (o = e[n],
                oe.test(o)) {
                if (delete e[n],
                  s = s || "toggle" === o,
                  o === (g ? "hide" : "show")) {
                  if ("show" !== o || !m || void 0 === m[n])
                    continue;
                  g = !0
                }
                p[n] = m && m[n] || T.style(t, n)
              }
            if ((l = !T.isEmptyObject(e)) || !T.isEmptyObject(p))
              for (n in d && 1 === t.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY],
                  null == (h = m && m.display) && (h = Q.get(t, "display")),
                  "none" === (c = T.css(t, "display")) && (h ? c = h : (dt([t], !0),
                    h = t.style.display || h,
                    c = T.css(t, "display"),
                    dt([t]))),
                  ("inline" === c || "inline-block" === c && null != h) && "none" === T.css(t, "float") && (l || (u.done(function () {
                        f.display = h
                      }),
                      null == h && (c = f.display,
                        h = "none" === c ? "" : c)),
                    f.display = "inline-block")),
                i.overflow && (f.overflow = "hidden",
                  u.always(function () {
                    f.overflow = i.overflow[0],
                      f.overflowX = i.overflow[1],
                      f.overflowY = i.overflow[2]
                  })),
                l = !1,
                p)
                l || (m ? "hidden" in m && (g = m.hidden) : m = Q.access(t, "fxshow", {
                    display: h
                  }),
                  s && (m.hidden = !g),
                  g && dt([t], !0),
                  u.done(function () {
                    for (n in g || dt([t]),
                      Q.remove(t, "fxshow"),
                      p)
                      T.style(t, n, p[n])
                  })),
                l = he(g ? m[n] : 0, n, u),
                n in m || (m[n] = l.start,
                  g && (l.end = l.start,
                    l.start = 0))
          }],
          prefilter: function (t, e) {
            e ? ce.prefilters.unshift(t) : ce.prefilters.push(t)
          }
        }),
        T.speed = function (t, e, i) {
          var n = t && "object" == typeof t ? T.extend({}, t) : {
            complete: i || !i && e || y(t) && t,
            duration: t,
            easing: i && e || e && !y(e) && e
          };
          return T.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in T.fx.speeds ? n.duration = T.fx.speeds[n.duration] : n.duration = T.fx.speeds._default),
            null != n.queue && !0 !== n.queue || (n.queue = "fx"),
            n.old = n.complete,
            n.complete = function () {
              y(n.old) && n.old.call(this),
                n.queue && T.dequeue(this, n.queue)
            },
            n
        },
        T.fn.extend({
          fadeTo: function (t, e, i, n) {
            return this.filter(rt).css("opacity", 0).show().end().animate({
              opacity: e
            }, t, i, n)
          },
          animate: function (t, e, i, n) {
            var o = T.isEmptyObject(t),
              s = T.speed(e, i, n),
              r = function () {
                var e = ce(this, T.extend({}, t), s);
                (o || Q.get(this, "finish")) && e.stop(!0)
              };
            return r.finish = r,
              o || !1 === s.queue ? this.each(r) : this.queue(s.queue, r)
          },
          stop: function (t, e, i) {
            var n = function (t) {
              var e = t.stop;
              delete t.stop,
                e(i)
            };
            return "string" != typeof t && (i = e,
                e = t,
                t = void 0),
              e && !1 !== t && this.queue(t || "fx", []),
              this.each(function () {
                var e = !0,
                  o = null != t && t + "queueHooks",
                  s = T.timers,
                  r = Q.get(this);
                if (o)
                  r[o] && r[o].stop && n(r[o]);
                else
                  for (o in r)
                    r[o] && r[o].stop && se.test(o) && n(r[o]);
                for (o = s.length; o--;)
                  s[o].elem !== this || null != t && s[o].queue !== t || (s[o].anim.stop(i),
                    e = !1,
                    s.splice(o, 1));
                !e && i || T.dequeue(this, t)
              })
          },
          finish: function (t) {
            return !1 !== t && (t = t || "fx"),
              this.each(function () {
                var e, i = Q.get(this),
                  n = i[t + "queue"],
                  o = i[t + "queueHooks"],
                  s = T.timers,
                  r = n ? n.length : 0;
                for (i.finish = !0,
                  T.queue(this, t, []),
                  o && o.stop && o.stop.call(this, !0),
                  e = s.length; e--;)
                  s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0),
                    s.splice(e, 1));
                for (e = 0; e < r; e++)
                  n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
              })
          }
        }),
        T.each(["toggle", "show", "hide"], function (t, e) {
          var i = T.fn[e];
          T.fn[e] = function (t, n, o) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(le(e, !0), t, n, o)
          }
        }),
        T.each({
          slideDown: le("show"),
          slideUp: le("hide"),
          slideToggle: le("toggle"),
          fadeIn: {
            opacity: "show"
          },
          fadeOut: {
            opacity: "hide"
          },
          fadeToggle: {
            opacity: "toggle"
          }
        }, function (t, e) {
          T.fn[t] = function (t, i, n) {
            return this.animate(e, t, i, n)
          }
        }),
        T.timers = [],
        T.fx.tick = function () {
          var t, e = 0,
            i = T.timers;
          for (ie = Date.now(); e < i.length; e++)
            (t = i[e])() || i[e] !== t || i.splice(e--, 1);
          i.length || T.fx.stop(),
            ie = void 0
        },
        T.fx.timer = function (t) {
          T.timers.push(t),
            T.fx.start()
        },
        T.fx.interval = 13,
        T.fx.start = function () {
          ne || (ne = !0,
            re())
        },
        T.fx.stop = function () {
          ne = null
        },
        T.fx.speeds = {
          slow: 600,
          fast: 200,
          _default: 400
        },
        T.fn.delay = function (t, e) {
          return t = T.fx && T.fx.speeds[t] || t,
            e = e || "fx",
            this.queue(e, function (e, n) {
              var o = i.setTimeout(e, t);
              n.stop = function () {
                i.clearTimeout(o)
              }
            })
        },
        function () {
          var t = r.createElement("input"),
            e = r.createElement("select").appendChild(r.createElement("option"));
          t.type = "checkbox",
            v.checkOn = "" !== t.value,
            v.optSelected = e.selected,
            (t = r.createElement("input")).value = "t",
            t.type = "radio",
            v.radioValue = "t" === t.value
        }();
      var de, ue = T.expr.attrHandle;
      T.fn.extend({
          attr: function (t, e) {
            return X(this, T.attr, t, e, arguments.length > 1)
          },
          removeAttr: function (t) {
            return this.each(function () {
              T.removeAttr(this, t)
            })
          }
        }),
        T.extend({
          attr: function (t, e, i) {
            var n, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)
              return void 0 === t.getAttribute ? T.prop(t, e, i) : (1 === s && T.isXMLDoc(t) || (o = T.attrHooks[e.toLowerCase()] || (T.expr.match.bool.test(e) ? de : void 0)),
                void 0 !== i ? null === i ? void T.removeAttr(t, e) : o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : (t.setAttribute(e, i + ""),
                  i) : o && "get" in o && null !== (n = o.get(t, e)) ? n : null == (n = T.find.attr(t, e)) ? void 0 : n)
          },
          attrHooks: {
            type: {
              set: function (t, e) {
                if (!v.radioValue && "radio" === e && O(t, "input")) {
                  var i = t.value;
                  return t.setAttribute("type", e),
                    i && (t.value = i),
                    e
                }
              }
            }
          },
          removeAttr: function (t, e) {
            var i, n = 0,
              o = e && e.match(B);
            if (o && 1 === t.nodeType)
              for (; i = o[n++];)
                t.removeAttribute(i)
          }
        }),
        de = {
          set: function (t, e, i) {
            return !1 === e ? T.removeAttr(t, i) : t.setAttribute(i, i),
              i
          }
        },
        T.each(T.expr.match.bool.source.match(/\w+/g), function (t, e) {
          var i = ue[e] || T.find.attr;
          ue[e] = function (t, e, n) {
            var o, s, r = e.toLowerCase();
            return n || (s = ue[r],
                ue[r] = o,
                o = null != i(t, e, n) ? r : null,
                ue[r] = s),
              o
          }
        });
      var pe = /^(?:input|select|textarea|button)$/i,
        fe = /^(?:a|area)$/i;

      function ge(t) {
        return (t.match(B) || []).join(" ")
      }

      function me(t) {
        return t.getAttribute && t.getAttribute("class") || ""
      }

      function ve(t) {
        return Array.isArray(t) ? t : "string" == typeof t && t.match(B) || []
      }
      T.fn.extend({
          prop: function (t, e) {
            return X(this, T.prop, t, e, arguments.length > 1)
          },
          removeProp: function (t) {
            return this.each(function () {
              delete this[T.propFix[t] || t]
            })
          }
        }),
        T.extend({
          prop: function (t, e, i) {
            var n, o, s = t.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)
              return 1 === s && T.isXMLDoc(t) || (e = T.propFix[e] || e,
                  o = T.propHooks[e]),
                void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]
          },
          propHooks: {
            tabIndex: {
              get: function (t) {
                var e = T.find.attr(t, "tabindex");
                return e ? parseInt(e, 10) : pe.test(t.nodeName) || fe.test(t.nodeName) && t.href ? 0 : -1
              }
            }
          },
          propFix: {
            for: "htmlFor",
            class: "className"
          }
        }),
        v.optSelected || (T.propHooks.selected = {
          get: function (t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex,
              null
          },
          set: function (t) {
            var e = t.parentNode;
            e && (e.selectedIndex,
              e.parentNode && e.parentNode.selectedIndex)
          }
        }),
        T.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
          T.propFix[this.toLowerCase()] = this
        }),
        T.fn.extend({
          addClass: function (t) {
            var e, i, n, o, s, r, a, l = 0;
            if (y(t))
              return this.each(function (e) {
                T(this).addClass(t.call(this, e, me(this)))
              });
            if ((e = ve(t)).length)
              for (; i = this[l++];)
                if (o = me(i),
                  n = 1 === i.nodeType && " " + ge(o) + " ") {
                  for (r = 0; s = e[r++];)
                    n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                  o !== (a = ge(n)) && i.setAttribute("class", a)
                }
            return this
          },
          removeClass: function (t) {
            var e, i, n, o, s, r, a, l = 0;
            if (y(t))
              return this.each(function (e) {
                T(this).removeClass(t.call(this, e, me(this)))
              });
            if (!arguments.length)
              return this.attr("class", "");
            if ((e = ve(t)).length)
              for (; i = this[l++];)
                if (o = me(i),
                  n = 1 === i.nodeType && " " + ge(o) + " ") {
                  for (r = 0; s = e[r++];)
                    for (; n.indexOf(" " + s + " ") > -1;)
                      n = n.replace(" " + s + " ", " ");
                  o !== (a = ge(n)) && i.setAttribute("class", a)
                }
            return this
          },
          toggleClass: function (t, e) {
            var i = typeof t,
              n = "string" === i || Array.isArray(t);
            return "boolean" == typeof e && n ? e ? this.addClass(t) : this.removeClass(t) : y(t) ? this.each(function (i) {
              T(this).toggleClass(t.call(this, i, me(this), e), e)
            }) : this.each(function () {
              var e, o, s, r;
              if (n)
                for (o = 0,
                  s = T(this),
                  r = ve(t); e = r[o++];)
                  s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
              else
                void 0 !== t && "boolean" !== i || ((e = me(this)) && Q.set(this, "__className__", e),
                  this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : Q.get(this, "__className__") || ""))
            })
          },
          hasClass: function (t) {
            var e, i, n = 0;
            for (e = " " + t + " "; i = this[n++];)
              if (1 === i.nodeType && (" " + ge(me(i)) + " ").indexOf(e) > -1)
                return !0;
            return !1
          }
        });
      var ye = /\r/g;
      T.fn.extend({
          val: function (t) {
            var e, i, n, o = this[0];
            return arguments.length ? (n = y(t),
              this.each(function (i) {
                var o;
                1 === this.nodeType && (null == (o = n ? t.call(this, i, T(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = T.map(o, function (t) {
                    return null == t ? "" : t + ""
                  })),
                  (e = T.valHooks[this.type] || T.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
              })) : o ? (e = T.valHooks[o.type] || T.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (i = e.get(o, "value")) ? i : "string" == typeof (i = o.value) ? i.replace(ye, "") : null == i ? "" : i : void 0
          }
        }),
        T.extend({
          valHooks: {
            option: {
              get: function (t) {
                var e = T.find.attr(t, "value");
                return null != e ? e : ge(T.text(t))
              }
            },
            select: {
              get: function (t) {
                var e, i, n, o = t.options,
                  s = t.selectedIndex,
                  r = "select-one" === t.type,
                  a = r ? null : [],
                  l = r ? s + 1 : o.length;
                for (n = s < 0 ? l : r ? s : 0; n < l; n++)
                  if (((i = o[n]).selected || n === s) && !i.disabled && (!i.parentNode.disabled || !O(i.parentNode, "optgroup"))) {
                    if (e = T(i).val(),
                      r)
                      return e;
                    a.push(e)
                  }
                return a
              },
              set: function (t, e) {
                for (var i, n, o = t.options, s = T.makeArray(e), r = o.length; r--;)
                  ((n = o[r]).selected = T.inArray(T.valHooks.option.get(n), s) > -1) && (i = !0);
                return i || (t.selectedIndex = -1),
                  s
              }
            }
          }
        }),
        T.each(["radio", "checkbox"], function () {
          T.valHooks[this] = {
              set: function (t, e) {
                if (Array.isArray(e))
                  return t.checked = T.inArray(T(t).val(), e) > -1
              }
            },
            v.checkOn || (T.valHooks[this].get = function (t) {
              return null === t.getAttribute("value") ? "on" : t.value
            })
        }),
        v.focusin = "onfocusin" in i;
      var xe = /^(?:focusinfocus|focusoutblur)$/,
        be = function (t) {
          t.stopPropagation()
        };
      T.extend(T.event, {
          trigger: function (t, e, n, o) {
            var s, a, l, h, c, d, u, p, g = [n || r],
              m = f.call(t, "type") ? t.type : t,
              v = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = p = l = n = n || r,
              3 !== n.nodeType && 8 !== n.nodeType && !xe.test(m + T.event.triggered) && (m.indexOf(".") > -1 && (m = (v = m.split(".")).shift(),
                  v.sort()),
                c = m.indexOf(":") < 0 && "on" + m,
                (t = t[T.expando] ? t : new T.Event(m, "object" == typeof t && t)).isTrigger = o ? 2 : 3,
                t.namespace = v.join("."),
                t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                t.result = void 0,
                t.target || (t.target = n),
                e = null == e ? [t] : T.makeArray(e, [t]),
                u = T.event.special[m] || {},
                o || !u.trigger || !1 !== u.trigger.apply(n, e))) {
              if (!o && !u.noBubble && !x(n)) {
                for (h = u.delegateType || m,
                  xe.test(h + m) || (a = a.parentNode); a; a = a.parentNode)
                  g.push(a),
                  l = a;
                l === (n.ownerDocument || r) && g.push(l.defaultView || l.parentWindow || i)
              }
              for (s = 0;
                (a = g[s++]) && !t.isPropagationStopped();)
                p = a,
                t.type = s > 1 ? h : u.bindType || m,
                (d = (Q.get(a, "events") || {})[t.type] && Q.get(a, "handle")) && d.apply(a, e),
                (d = c && a[c]) && d.apply && K(a) && (t.result = d.apply(a, e),
                  !1 === t.result && t.preventDefault());
              return t.type = m,
                o || t.isDefaultPrevented() || u._default && !1 !== u._default.apply(g.pop(), e) || !K(n) || c && y(n[m]) && !x(n) && ((l = n[c]) && (n[c] = null),
                  T.event.triggered = m,
                  t.isPropagationStopped() && p.addEventListener(m, be),
                  n[m](),
                  t.isPropagationStopped() && p.removeEventListener(m, be),
                  T.event.triggered = void 0,
                  l && (n[c] = l)),
                t.result
            }
          },
          simulate: function (t, e, i) {
            var n = T.extend(new T.Event, i, {
              type: t,
              isSimulated: !0
            });
            T.event.trigger(n, null, e)
          }
        }),
        T.fn.extend({
          trigger: function (t, e) {
            return this.each(function () {
              T.event.trigger(t, e, this)
            })
          },
          triggerHandler: function (t, e) {
            var i = this[0];
            if (i)
              return T.event.trigger(t, e, i, !0)
          }
        }),
        v.focusin || T.each({
          focus: "focusin",
          blur: "focusout"
        }, function (t, e) {
          var i = function (t) {
            T.event.simulate(e, t.target, T.event.fix(t))
          };
          T.event.special[e] = {
            setup: function () {
              var n = this.ownerDocument || this,
                o = Q.access(n, e);
              o || n.addEventListener(t, i, !0),
                Q.access(n, e, (o || 0) + 1)
            },
            teardown: function () {
              var n = this.ownerDocument || this,
                o = Q.access(n, e) - 1;
              o ? Q.access(n, e, o) : (n.removeEventListener(t, i, !0),
                Q.remove(n, e))
            }
          }
        });
      var we = i.location,
        ke = Date.now(),
        Te = /\?/;
      T.parseXML = function (t) {
        var e;
        if (!t || "string" != typeof t)
          return null;
        try {
          e = (new i.DOMParser).parseFromString(t, "text/xml")
        } catch (t) {
          e = void 0
        }
        return e && !e.getElementsByTagName("parsererror").length || T.error("Invalid XML: " + t),
          e
      };
      var Se = /\[\]$/,
        Ce = /\r?\n/g,
        Ae = /^(?:submit|button|image|reset|file)$/i,
        Me = /^(?:input|select|textarea|keygen)/i;

      function Ee(t, e, i, n) {
        var o;
        if (Array.isArray(e))
          T.each(e, function (e, o) {
            i || Se.test(t) ? n(t, o) : Ee(t + "[" + ("object" == typeof o && null != o ? e : "") + "]", o, i, n)
          });
        else if (i || "object" !== k(e))
          n(t, e);
        else
          for (o in e)
            Ee(t + "[" + o + "]", e[o], i, n)
      }
      T.param = function (t, e) {
          var i, n = [],
            o = function (t, e) {
              var i = y(e) ? e() : e;
              n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
            };
          if (Array.isArray(t) || t.jquery && !T.isPlainObject(t))
            T.each(t, function () {
              o(this.name, this.value)
            });
          else
            for (i in t)
              Ee(i, t[i], e, o);
          return n.join("&")
        },
        T.fn.extend({
          serialize: function () {
            return T.param(this.serializeArray())
          },
          serializeArray: function () {
            return this.map(function () {
              var t = T.prop(this, "elements");
              return t ? T.makeArray(t) : this
            }).filter(function () {
              var t = this.type;
              return this.name && !T(this).is(":disabled") && Me.test(this.nodeName) && !Ae.test(t) && (this.checked || !ut.test(t))
            }).map(function (t, e) {
              var i = T(this).val();
              return null == i ? null : Array.isArray(i) ? T.map(i, function (t) {
                return {
                  name: e.name,
                  value: t.replace(Ce, "\r\n")
                }
              }) : {
                name: e.name,
                value: i.replace(Ce, "\r\n")
              }
            }).get()
          }
        });
      var De = /%20/g,
        Oe = /#.*$/,
        Pe = /([?&])_=[^&]*/,
        Ie = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        _e = /^(?:GET|HEAD)$/,
        Le = /^\/\//,
        Ne = {},
        He = {},
        Re = "*/".concat("*"),
        Be = r.createElement("a");

      function We(t) {
        return function (e, i) {
          "string" != typeof e && (i = e,
            e = "*");
          var n, o = 0,
            s = e.toLowerCase().match(B) || [];
          if (y(i))
            for (; n = s[o++];)
              "+" === n[0] ? (n = n.slice(1) || "*",
                (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
      }

      function ze(t, e, i, n) {
        var o = {},
          s = t === He;

        function r(a) {
          var l;
          return o[a] = !0,
            T.each(t[a] || [], function (t, a) {
              var h = a(e, i, n);
              return "string" != typeof h || s || o[h] ? s ? !(l = h) : void 0 : (e.dataTypes.unshift(h),
                r(h),
                !1)
            }),
            l
        }
        return r(e.dataTypes[0]) || !o["*"] && r("*")
      }

      function Fe(t, e) {
        var i, n, o = T.ajaxSettings.flatOptions || {};
        for (i in e)
          void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && T.extend(!0, t, n),
          t
      }
      Be.href = we.href,
        T.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: we.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(we.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
              "*": Re,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            converters: {
              "* text": String,
              "text html": !0,
              "text json": JSON.parse,
              "text xml": T.parseXML
            },
            flatOptions: {
              url: !0,
              context: !0
            }
          },
          ajaxSetup: function (t, e) {
            return e ? Fe(Fe(t, T.ajaxSettings), e) : Fe(T.ajaxSettings, t)
          },
          ajaxPrefilter: We(Ne),
          ajaxTransport: We(He),
          ajax: function (t, e) {
            "object" == typeof t && (e = t,
                t = void 0),
              e = e || {};
            var n, o, s, a, l, h, c, d, u, p, f = T.ajaxSetup({}, e),
              g = f.context || f,
              m = f.context && (g.nodeType || g.jquery) ? T(g) : T.event,
              v = T.Deferred(),
              y = T.Callbacks("once memory"),
              x = f.statusCode || {},
              b = {},
              w = {},
              k = "canceled",
              S = {
                readyState: 0,
                getResponseHeader: function (t) {
                  var e;
                  if (c) {
                    if (!a)
                      for (a = {}; e = Ie.exec(s);)
                        a[e[1].toLowerCase()] = e[2];
                    e = a[t.toLowerCase()]
                  }
                  return null == e ? null : e
                },
                getAllResponseHeaders: function () {
                  return c ? s : null
                },
                setRequestHeader: function (t, e) {
                  return null == c && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t,
                      b[t] = e),
                    this
                },
                overrideMimeType: function (t) {
                  return null == c && (f.mimeType = t),
                    this
                },
                statusCode: function (t) {
                  var e;
                  if (t)
                    if (c)
                      S.always(t[S.status]);
                    else
                      for (e in t)
                        x[e] = [x[e], t[e]];
                  return this
                },
                abort: function (t) {
                  var e = t || k;
                  return n && n.abort(e),
                    C(0, e),
                    this
                }
              };
            if (v.promise(S),
              f.url = ((t || f.url || we.href) + "").replace(Le, we.protocol + "//"),
              f.type = e.method || e.type || f.method || f.type,
              f.dataTypes = (f.dataType || "*").toLowerCase().match(B) || [""],
              null == f.crossDomain) {
              h = r.createElement("a");
              try {
                h.href = f.url,
                  h.href = h.href,
                  f.crossDomain = Be.protocol + "//" + Be.host != h.protocol + "//" + h.host
              } catch (t) {
                f.crossDomain = !0
              }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = T.param(f.data, f.traditional)),
              ze(Ne, f, e, S),
              c)
              return S;
            for (u in (d = T.event && f.global) && 0 == T.active++ && T.event.trigger("ajaxStart"),
              f.type = f.type.toUpperCase(),
              f.hasContent = !_e.test(f.type),
              o = f.url.replace(Oe, ""),
              f.hasContent ? f.data && f.processData && 0 === (f.contentType || "").indexOf("application/x-www-form-urlencoded") && (f.data = f.data.replace(De, "+")) : (p = f.url.slice(o.length),
                f.data && (f.processData || "string" == typeof f.data) && (o += (Te.test(o) ? "&" : "?") + f.data,
                  delete f.data),
                !1 === f.cache && (o = o.replace(Pe, "$1"),
                  p = (Te.test(o) ? "&" : "?") + "_=" + ke++ + p),
                f.url = o + p),
              f.ifModified && (T.lastModified[o] && S.setRequestHeader("If-Modified-Since", T.lastModified[o]),
                T.etag[o] && S.setRequestHeader("If-None-Match", T.etag[o])),
              (f.data && f.hasContent && !1 !== f.contentType || e.contentType) && S.setRequestHeader("Content-Type", f.contentType),
              S.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Re + "; q=0.01" : "") : f.accepts["*"]),
              f.headers)
              S.setRequestHeader(u, f.headers[u]);
            if (f.beforeSend && (!1 === f.beforeSend.call(g, S, f) || c))
              return S.abort();
            if (k = "abort",
              y.add(f.complete),
              S.done(f.success),
              S.fail(f.error),
              n = ze(He, f, e, S)) {
              if (S.readyState = 1,
                d && m.trigger("ajaxSend", [S, f]),
                c)
                return S;
              f.async && f.timeout > 0 && (l = i.setTimeout(function () {
                S.abort("timeout")
              }, f.timeout));
              try {
                c = !1,
                  n.send(b, C)
              } catch (t) {
                if (c)
                  throw t;
                C(-1, t)
              }
            } else
              C(-1, "No Transport");

            function C(t, e, r, a) {
              var h, u, p, b, w, k = e;
              c || (c = !0,
                l && i.clearTimeout(l),
                n = void 0,
                s = a || "",
                S.readyState = t > 0 ? 4 : 0,
                h = t >= 200 && t < 300 || 304 === t,
                r && (b = function (t, e, i) {
                  for (var n, o, s, r, a = t.contents, l = t.dataTypes;
                    "*" === l[0];)
                    l.shift(),
                    void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
                  if (n)
                    for (o in a)
                      if (a[o] && a[o].test(n)) {
                        l.unshift(o);
                        break
                      }
                  if (l[0] in i)
                    s = l[0];
                  else {
                    for (o in i) {
                      if (!l[0] || t.converters[o + " " + l[0]]) {
                        s = o;
                        break
                      }
                      r || (r = o)
                    }
                    s = s || r
                  }
                  if (s)
                    return s !== l[0] && l.unshift(s),
                      i[s]
                }(f, S, r)),
                b = function (t, e, i, n) {
                  var o, s, r, a, l, h = {},
                    c = t.dataTypes.slice();
                  if (c[1])
                    for (r in t.converters)
                      h[r.toLowerCase()] = t.converters[r];
                  for (s = c.shift(); s;)
                    if (t.responseFields[s] && (i[t.responseFields[s]] = e),
                      !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                      l = s,
                      s = c.shift())
                      if ("*" === s)
                        s = l;
                      else if ("*" !== l && l !== s) {
                    if (!(r = h[l + " " + s] || h["* " + s]))
                      for (o in h)
                        if ((a = o.split(" "))[1] === s && (r = h[l + " " + a[0]] || h["* " + a[0]])) {
                          !0 === r ? r = h[o] : !0 !== h[o] && (s = a[0],
                            c.unshift(a[1]));
                          break
                        }
                    if (!0 !== r)
                      if (r && t.throws)
                        e = r(e);
                      else
                        try {
                          e = r(e)
                        } catch (t) {
                          return {
                            state: "parsererror",
                            error: r ? t : "No conversion from " + l + " to " + s
                          }
                        }
                  }
                  return {
                    state: "success",
                    data: e
                  }
                }(f, b, S, h),
                h ? (f.ifModified && ((w = S.getResponseHeader("Last-Modified")) && (T.lastModified[o] = w),
                    (w = S.getResponseHeader("etag")) && (T.etag[o] = w)),
                  204 === t || "HEAD" === f.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state,
                    u = b.data,
                    h = !(p = b.error))) : (p = k,
                  !t && k || (k = "error",
                    t < 0 && (t = 0))),
                S.status = t,
                S.statusText = (e || k) + "",
                h ? v.resolveWith(g, [u, k, S]) : v.rejectWith(g, [S, k, p]),
                S.statusCode(x),
                x = void 0,
                d && m.trigger(h ? "ajaxSuccess" : "ajaxError", [S, f, h ? u : p]),
                y.fireWith(g, [S, k]),
                d && (m.trigger("ajaxComplete", [S, f]),
                  --T.active || T.event.trigger("ajaxStop")))
            }
            return S
          },
          getJSON: function (t, e, i) {
            return T.get(t, e, i, "json")
          },
          getScript: function (t, e) {
            return T.get(t, void 0, e, "script")
          }
        }),
        T.each(["get", "post"], function (t, e) {
          T[e] = function (t, i, n, o) {
            return y(i) && (o = o || n,
                n = i,
                i = void 0),
              T.ajax(T.extend({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
              }, T.isPlainObject(t) && t))
          }
        }),
        T._evalUrl = function (t) {
          return T.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
          })
        },
        T.fn.extend({
          wrapAll: function (t) {
            var e;
            return this[0] && (y(t) && (t = t.call(this[0])),
                e = T(t, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && e.insertBefore(this[0]),
                e.map(function () {
                  for (var t = this; t.firstElementChild;)
                    t = t.firstElementChild;
                  return t
                }).append(this)),
              this
          },
          wrapInner: function (t) {
            return y(t) ? this.each(function (e) {
              T(this).wrapInner(t.call(this, e))
            }) : this.each(function () {
              var e = T(this),
                i = e.contents();
              i.length ? i.wrapAll(t) : e.append(t)
            })
          },
          wrap: function (t) {
            var e = y(t);
            return this.each(function (i) {
              T(this).wrapAll(e ? t.call(this, i) : t)
            })
          },
          unwrap: function (t) {
            return this.parent(t).not("body").each(function () {
                T(this).replaceWith(this.childNodes)
              }),
              this
          }
        }),
        T.expr.pseudos.hidden = function (t) {
          return !T.expr.pseudos.visible(t)
        },
        T.expr.pseudos.visible = function (t) {
          return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        },
        T.ajaxSettings.xhr = function () {
          try {
            return new i.XMLHttpRequest
          } catch (t) {}
        };
      var je = {
          0: 200,
          1223: 204
        },
        $e = T.ajaxSettings.xhr();
      v.cors = !!$e && "withCredentials" in $e,
        v.ajax = $e = !!$e,
        T.ajaxTransport(function (t) {
          var e, n;
          if (v.cors || $e && !t.crossDomain)
            return {
              send: function (o, s) {
                var r, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password),
                  t.xhrFields)
                  for (r in t.xhrFields)
                    a[r] = t.xhrFields[r];
                for (r in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                  t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"),
                  o)
                  a.setRequestHeader(r, o[r]);
                e = function (t) {
                    return function () {
                      e && (e = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null,
                        "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(je[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                          binary: a.response
                        } : {
                          text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                  },
                  a.onload = e(),
                  n = a.onerror = a.ontimeout = e("error"),
                  void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function () {
                    4 === a.readyState && i.setTimeout(function () {
                      e && n()
                    })
                  },
                  e = e("abort");
                try {
                  a.send(t.hasContent && t.data || null)
                } catch (t) {
                  if (e)
                    throw t
                }
              },
              abort: function () {
                e && e()
              }
            }
        }),
        T.ajaxPrefilter(function (t) {
          t.crossDomain && (t.contents.script = !1)
        }),
        T.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function (t) {
              return T.globalEval(t),
                t
            }
          }
        }),
        T.ajaxPrefilter("script", function (t) {
          void 0 === t.cache && (t.cache = !1),
            t.crossDomain && (t.type = "GET")
        }),
        T.ajaxTransport("script", function (t) {
          var e, i;
          if (t.crossDomain)
            return {
              send: function (n, o) {
                e = T("<script>").prop({
                    charset: t.scriptCharset,
                    src: t.url
                  }).on("load error", i = function (t) {
                    e.remove(),
                      i = null,
                      t && o("error" === t.type ? 404 : 200, t.type)
                  }),
                  r.head.appendChild(e[0])
              },
              abort: function () {
                i && i()
              }
            }
        });
      var Ge, Xe = [],
        Ye = /(=)\?(?=&|$)|\?\?/;
      T.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
            var t = Xe.pop() || T.expando + "_" + ke++;
            return this[t] = !0,
              t
          }
        }),
        T.ajaxPrefilter("json jsonp", function (t, e, n) {
          var o, s, r, a = !1 !== t.jsonp && (Ye.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ye.test(t.data) && "data");
          if (a || "jsonp" === t.dataTypes[0])
            return o = t.jsonpCallback = y(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
              a ? t[a] = t[a].replace(Ye, "$1" + o) : !1 !== t.jsonp && (t.url += (Te.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
              t.converters["script json"] = function () {
                return r || T.error(o + " was not called"),
                  r[0]
              },
              t.dataTypes[0] = "json",
              s = i[o],
              i[o] = function () {
                r = arguments
              },
              n.always(function () {
                void 0 === s ? T(i).removeProp(o) : i[o] = s,
                  t[o] && (t.jsonpCallback = e.jsonpCallback,
                    Xe.push(o)),
                  r && y(s) && s(r[0]),
                  r = s = void 0
              }),
              "script"
        }),
        v.createHTMLDocument = ((Ge = r.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
          2 === Ge.childNodes.length),
        T.parseHTML = function (t, e, i) {
          return "string" != typeof t ? [] : ("boolean" == typeof e && (i = e,
              e = !1),
            e || (v.createHTMLDocument ? ((n = (e = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href,
              e.head.appendChild(n)) : e = r),
            o = P.exec(t),
            s = !i && [],
            o ? [e.createElement(o[1])] : (o = wt([t], e, s),
              s && s.length && T(s).remove(),
              T.merge([], o.childNodes)));
          var n, o, s
        },
        T.fn.load = function (t, e, i) {
          var n, o, s, r = this,
            a = t.indexOf(" ");
          return a > -1 && (n = ge(t.slice(a)),
              t = t.slice(0, a)),
            y(e) ? (i = e,
              e = void 0) : e && "object" == typeof e && (o = "POST"),
            r.length > 0 && T.ajax({
              url: t,
              type: o || "GET",
              dataType: "html",
              data: e
            }).done(function (t) {
              s = arguments,
                r.html(n ? T("<div>").append(T.parseHTML(t)).find(n) : t)
            }).always(i && function (t, e) {
              r.each(function () {
                i.apply(this, s || [t.responseText, e, t])
              })
            }),
            this
        },
        T.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
          T.fn[e] = function (t) {
            return this.on(e, t)
          }
        }),
        T.expr.pseudos.animated = function (t) {
          return T.grep(T.timers, function (e) {
            return t === e.elem
          }).length
        },
        T.offset = {
          setOffset: function (t, e, i) {
            var n, o, s, r, a, l, h = T.css(t, "position"),
              c = T(t),
              d = {};
            "static" === h && (t.style.position = "relative"),
              a = c.offset(),
              s = T.css(t, "top"),
              l = T.css(t, "left"),
              ("absolute" === h || "fixed" === h) && (s + l).indexOf("auto") > -1 ? (r = (n = c.position()).top,
                o = n.left) : (r = parseFloat(s) || 0,
                o = parseFloat(l) || 0),
              y(e) && (e = e.call(t, i, T.extend({}, a))),
              null != e.top && (d.top = e.top - a.top + r),
              null != e.left && (d.left = e.left - a.left + o),
              "using" in e ? e.using.call(t, d) : c.css(d)
          }
        },
        T.fn.extend({
          offset: function (t) {
            if (arguments.length)
              return void 0 === t ? this : this.each(function (e) {
                T.offset.setOffset(this, t, e)
              });
            var e, i, n = this[0];
            return n ? n.getClientRects().length ? (e = n.getBoundingClientRect(),
              i = n.ownerDocument.defaultView, {
                top: e.top + i.pageYOffset,
                left: e.left + i.pageXOffset
              }) : {
              top: 0,
              left: 0
            } : void 0
          },
          position: function () {
            if (this[0]) {
              var t, e, i, n = this[0],
                o = {
                  top: 0,
                  left: 0
                };
              if ("fixed" === T.css(n, "position"))
                e = n.getBoundingClientRect();
              else {
                for (e = this.offset(),
                  i = n.ownerDocument,
                  t = n.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && "static" === T.css(t, "position");)
                  t = t.parentNode;
                t && t !== n && 1 === t.nodeType && ((o = T(t).offset()).top += T.css(t, "borderTopWidth", !0),
                  o.left += T.css(t, "borderLeftWidth", !0))
              }
              return {
                top: e.top - o.top - T.css(n, "marginTop", !0),
                left: e.left - o.left - T.css(n, "marginLeft", !0)
              }
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (var t = this.offsetParent; t && "static" === T.css(t, "position");)
                t = t.offsetParent;
              return t || kt
            })
          }
        }),
        T.each({
          scrollLeft: "pageXOffset",
          scrollTop: "pageYOffset"
        }, function (t, e) {
          var i = "pageYOffset" === e;
          T.fn[t] = function (n) {
            return X(this, function (t, n, o) {
              var s;
              if (x(t) ? s = t : 9 === t.nodeType && (s = t.defaultView),
                void 0 === o)
                return s ? s[e] : t[n];
              s ? s.scrollTo(i ? s.pageXOffset : o, i ? o : s.pageYOffset) : t[n] = o
            }, t, n, arguments.length)
          }
        }),
        T.each(["top", "left"], function (t, e) {
          T.cssHooks[e] = Gt(v.pixelPosition, function (t, i) {
            if (i)
              return i = $t(t, e),
                zt.test(i) ? T(t).position()[e] + "px" : i
          })
        }),
        T.each({
          Height: "height",
          Width: "width"
        }, function (t, e) {
          T.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
          }, function (i, n) {
            T.fn[n] = function (o, s) {
              var r = arguments.length && (i || "boolean" != typeof o),
                a = i || (!0 === o || !0 === s ? "margin" : "border");
              return X(this, function (e, i, o) {
                var s;
                return x(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement,
                  Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === o ? T.css(e, i, a) : T.style(e, i, o, a)
              }, e, r ? o : void 0, r)
            }
          })
        }),
        T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
          T.fn[e] = function (t, i) {
            return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
          }
        }),
        T.fn.extend({
          hover: function (t, e) {
            return this.mouseenter(t).mouseleave(e || t)
          }
        }),
        T.fn.extend({
          bind: function (t, e, i) {
            return this.on(t, null, e, i)
          },
          unbind: function (t, e) {
            return this.off(t, null, e)
          },
          delegate: function (t, e, i, n) {
            return this.on(e, t, i, n)
          },
          undelegate: function (t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
          }
        }),
        T.proxy = function (t, e) {
          var i, n, o;
          if ("string" == typeof e && (i = t[e],
              e = t,
              t = i),
            y(t))
            return n = l.call(arguments, 2),
              (o = function () {
                return t.apply(e || this, n.concat(l.call(arguments)))
              }).guid = t.guid = t.guid || T.guid++,
              o
        },
        T.holdReady = function (t) {
          t ? T.readyWait++ : T.ready(!0)
        },
        T.isArray = Array.isArray,
        T.parseJSON = JSON.parse,
        T.nodeName = O,
        T.isFunction = y,
        T.isWindow = x,
        T.camelCase = q,
        T.type = k,
        T.now = Date.now,
        T.isNumeric = function (t) {
          var e = T.type(t);
          return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
        },
        void 0 === (n = function () {
            return T
          }
          .apply(e, [])) || (t.exports = n);
      var Ve = i.jQuery,
        Ue = i.$;
      return T.noConflict = function (t) {
          return i.$ === T && (i.$ = Ue),
            t && i.jQuery === T && (i.jQuery = Ve),
            T
        },
        o || (i.jQuery = i.$ = T),
        T
    })
  }, function (t, e) {
    var i, n;
    i = "undefined" != typeof window ? window : this,
      n = function (t) {
        var e, i, n, o, s, r, a, l, h = (e = void 0 === t ? window : t,
          i = e.document,
          n = e.navigator && e.navigator.userAgent || "",
          o = i && i.createElementNS && !!i.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
          s = /(edge|msie|trident)/i.test(n) && !e.opera,
          r = -1 !== n.indexOf("Firefox"),
          a = -1 !== n.indexOf("Chrome"),
          l = r && 4 > parseInt(n.split("Firefox/")[1], 10),
          e.Highcharts ? e.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "6.1.0",
            deg2rad: 2 * Math.PI / 360,
            doc: i,
            hasBidiBug: l,
            hasTouch: i && void 0 !== i.documentElement.ontouchstart,
            isMS: s,
            isWebKit: -1 !== n.indexOf("AppleWebKit"),
            isFirefox: r,
            isChrome: a,
            isSafari: !a && -1 !== n.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(n),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: o,
            win: e,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: []
          });
        ! function (t) {
          t.timers = [];
          var e = t.charts,
            i = t.doc,
            n = t.win;
          t.error = function (e, i) {
              if (e = t.isNumber(e) ? "Highcharts error #" + e + ": www.highcharts.com/errors/" + e : e,
                i)
                throw Error(e);
              n.console && console.log(e)
            },
            t.Fx = function (t, e, i) {
              this.options = e,
                this.elem = t,
                this.prop = i
            },
            t.Fx.prototype = {
              dSetter: function () {
                var t, e = this.paths[0],
                  i = this.paths[1],
                  n = [],
                  o = this.now,
                  s = e.length;
                if (1 === o)
                  n = this.toD;
                else if (s === i.length && 1 > o)
                  for (; s--;)
                    t = parseFloat(e[s]),
                    n[s] = isNaN(t) ? i[s] : o * parseFloat(i[s] - t) + t;
                else
                  n = i;
                this.elem.attr("d", n, null, !0)
              },
              update: function () {
                var t = this.elem,
                  e = this.prop,
                  i = this.now,
                  n = this.options.step;
                this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit,
                  n && n.call(t, i, this)
              },
              run: function (e, i, o) {
                var s = this,
                  r = s.options,
                  a = function (t) {
                    return !a.stopped && s.step(t)
                  },
                  l = n.requestAnimationFrame || function (t) {
                    setTimeout(t, 13)
                  },
                  h = function () {
                    for (var e = 0; e < t.timers.length; e++)
                      t.timers[e]() || t.timers.splice(e--, 1);
                    t.timers.length && l(h)
                  };
                e !== i || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date,
                  this.start = e,
                  this.end = i,
                  this.unit = o,
                  this.now = this.start,
                  this.pos = 0,
                  a.elem = this.elem,
                  a.prop = this.prop,
                  a() && 1 === t.timers.push(a) && l(h)) : (delete r.curAnim[this.prop],
                  r.complete && 0 === t.keys(r.curAnim).length && r.complete.call(this.elem))
              },
              step: function (e) {
                var i, n = +new Date,
                  o = this.options,
                  s = this.elem,
                  r = o.complete,
                  a = o.duration,
                  l = o.curAnim;
                return s.attr && !s.element ? e = !1 : e || n >= a + this.startTime ? (this.now = this.end,
                    this.pos = 1,
                    this.update(),
                    i = l[this.prop] = !0,
                    t.objectEach(l, function (t) {
                      !0 !== t && (i = !1)
                    }),
                    i && r && r.call(s),
                    e = !1) : (this.pos = o.easing((n - this.startTime) / a),
                    this.now = this.start + (this.end - this.start) * this.pos,
                    this.update(),
                    e = !0),
                  e
              },
              initPath: function (e, i, n) {
                function o(t) {
                  var e, i;
                  for (c = t.length; c--;)
                    e = "M" === t[c] || "L" === t[c],
                    i = /[a-zA-Z]/.test(t[c + 3]),
                    e && i && t.splice(c + 1, 0, t[c + 1], t[c + 2], t[c + 1], t[c + 2])
                }

                function s(t, e) {
                  for (; t.length < l;) {
                    t[0] = e[l - t.length];
                    var i = t.slice(0, f);
                    [].splice.apply(t, [0, 0].concat(i)),
                      m && (i = t.slice(t.length - f),
                        [].splice.apply(t, [t.length, 0].concat(i)),
                        c--)
                  }
                  t[0] = "M"
                }

                function r(t, e) {
                  for (var i = (l - t.length) / f; 0 < i && i--;)
                    (h = t.slice().splice(t.length / v - f, f * v))[0] = e[l - f - i * f],
                    p && (h[f - 6] = h[f - 2],
                      h[f - 5] = h[f - 1]),
                    [].splice.apply(t, [t.length / v, 0].concat(h)),
                    m && i--
                }
                i = i || "";
                var a, l, h, c, d = e.startX,
                  u = e.endX,
                  p = -1 < i.indexOf("C"),
                  f = p ? 7 : 3;
                i = i.split(" "),
                  n = n.slice();
                var g, m = e.isArea,
                  v = m ? 2 : 1;
                if (p && (o(i),
                    o(n)),
                  d && u) {
                  for (c = 0; c < d.length; c++) {
                    if (d[c] === u[0]) {
                      a = c;
                      break
                    }
                    if (d[0] === u[u.length - d.length + c]) {
                      a = c,
                        g = !0;
                      break
                    }
                  }
                  void 0 === a && (i = [])
                }
                return i.length && t.isNumber(a) && (l = n.length + a * v * f,
                    g ? (s(i, n),
                      r(n, i)) : (s(n, i),
                      r(i, n))),
                  [i, n]
              }
            },
            t.Fx.prototype.fillSetter = t.Fx.prototype.strokeSetter = function () {
              this.elem.attr(this.prop, t.color(this.start).tweenTo(t.color(this.end), this.pos), null, !0)
            },
            t.merge = function () {
              var e, i, n = arguments,
                o = {},
                s = function (e, i) {
                  return "object" != typeof e && (e = {}),
                    t.objectEach(i, function (n, o) {
                      !t.isObject(n, !0) || t.isClass(n) || t.isDOMElement(n) ? e[o] = i[o] : e[o] = s(e[o] || {}, n)
                    }),
                    e
                };
              for (!0 === n[0] && (o = n[1],
                  n = Array.prototype.slice.call(n, 2)),
                i = n.length,
                e = 0; e < i; e++)
                o = s(o, n[e]);
              return o
            },
            t.pInt = function (t, e) {
              return parseInt(t, e || 10)
            },
            t.isString = function (t) {
              return "string" == typeof t
            },
            t.isArray = function (t) {
              return "[object Array]" === (t = Object.prototype.toString.call(t)) || "[object Array Iterator]" === t
            },
            t.isObject = function (e, i) {
              return !(!e || "object" != typeof e || i && t.isArray(e))
            },
            t.isDOMElement = function (e) {
              return t.isObject(e) && "number" == typeof e.nodeType
            },
            t.isClass = function (e) {
              var i = e && e.constructor;
              return !(!t.isObject(e, !0) || t.isDOMElement(e) || !i || !i.name || "Object" === i.name)
            },
            t.isNumber = function (t) {
              return "number" == typeof t && !isNaN(t) && 1 / 0 > t && -1 / 0 < t
            },
            t.erase = function (t, e) {
              for (var i = t.length; i--;)
                if (t[i] === e) {
                  t.splice(i, 1);
                  break
                }
            },
            t.defined = function (t) {
              return void 0 !== t && null !== t
            },
            t.attr = function (e, i, n) {
              var o;
              return t.isString(i) ? t.defined(n) ? e.setAttribute(i, n) : e && e.getAttribute && ((o = e.getAttribute(i)) || "class" !== i || (o = e.getAttribute(i + "Name"))) : t.defined(i) && t.isObject(i) && t.objectEach(i, function (t, i) {
                  e.setAttribute(i, t)
                }),
                o
            },
            t.splat = function (e) {
              return t.isArray(e) ? e : [e]
            },
            t.syncTimeout = function (t, e, i) {
              if (e)
                return setTimeout(t, e, i);
              t.call(0, i)
            },
            t.clearTimeout = function (e) {
              t.defined(e) && clearTimeout(e)
            },
            t.extend = function (t, e) {
              var i;
              for (i in t || (t = {}),
                e)
                t[i] = e[i];
              return t
            },
            t.pick = function () {
              var t, e, i = arguments,
                n = i.length;
              for (t = 0; t < n; t++)
                if (void 0 !== (e = i[t]) && null !== e)
                  return e
            },
            t.css = function (e, i) {
              t.isMS && !t.svg && i && void 0 !== i.opacity && (i.filter = "alpha(opacity=" + 100 * i.opacity + ")"),
                t.extend(e.style, i)
            },
            t.createElement = function (e, n, o, s, r) {
              e = i.createElement(e);
              var a = t.css;
              return n && t.extend(e, n),
                r && a(e, {
                  padding: 0,
                  border: "none",
                  margin: 0
                }),
                o && a(e, o),
                s && s.appendChild(e),
                e
            },
            t.extendClass = function (e, i) {
              var n = function () {};
              return n.prototype = new e,
                t.extend(n.prototype, i),
                n
            },
            t.pad = function (t, e, i) {
              return Array((e || 2) + 1 - String(t).replace("-", "").length).join(i || 0) + t
            },
            t.relativeLength = function (t, e, i) {
              return /%$/.test(t) ? e * parseFloat(t) / 100 + (i || 0) : parseFloat(t)
            },
            t.wrap = function (t, e, i) {
              var n = t[e];
              t[e] = function () {
                var t = Array.prototype.slice.call(arguments),
                  e = arguments,
                  o = this;
                return o.proceed = function () {
                    n.apply(o, arguments.length ? arguments : e)
                  },
                  t.unshift(n),
                  t = i.apply(this, t),
                  o.proceed = null,
                  t
              }
            },
            t.formatSingle = function (e, i, n) {
              var o = t.defaultOptions.lang;
              return /f$/.test(e) ? (n = (n = e.match(/\.([0-9])/)) ? n[1] : -1,
                  null !== i && (i = t.numberFormat(i, n, o.decimalPoint, -1 < e.indexOf(",") ? o.thousandsSep : ""))) : i = (n || t.time).dateFormat(e, i),
                i
            },
            t.format = function (e, i, n) {
              for (var o, s, r, a, l, h = "{", c = !1, d = []; e && -1 !== (h = e.indexOf(h));) {
                if (o = e.slice(0, h),
                  c) {
                  for (a = (s = (o = o.split(":")).shift().split(".")).length,
                    l = i,
                    r = 0; r < a; r++)
                    l && (l = l[s[r]]);
                  o.length && (l = t.formatSingle(o.join(":"), l, n)),
                    d.push(l)
                } else
                  d.push(o);
                e = e.slice(h + 1),
                  h = (c = !c) ? "}" : "{"
              }
              return d.push(e),
                d.join("")
            },
            t.getMagnitude = function (t) {
              return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
            },
            t.normalizeTickInterval = function (e, i, n, o, s) {
              var r, a = e;
              for (r = e / (n = t.pick(n, 1)),
                i || (i = s ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10],
                  !1 === o && (1 === n ? i = t.grep(i, function (t) {
                    return 0 == t % 1
                  }) : .1 >= n && (i = [1 / n]))),
                o = 0; o < i.length && (a = i[o],
                  !(s && a * n >= e || !s && r <= (i[o] + (i[o + 1] || i[o])) / 2)); o++)
              ;
              return t.correctFloat(a * n, -Math.round(Math.log(.001) / Math.LN10))
            },
            t.stableSort = function (t, e) {
              var i, n, o = t.length;
              for (n = 0; n < o; n++)
                t[n].safeI = n;
              for (t.sort(function (t, n) {
                  return 0 === (i = e(t, n)) ? t.safeI - n.safeI : i
                }),
                n = 0; n < o; n++)
                delete t[n].safeI
            },
            t.arrayMin = function (t) {
              for (var e = t.length, i = t[0]; e--;)
                t[e] < i && (i = t[e]);
              return i
            },
            t.arrayMax = function (t) {
              for (var e = t.length, i = t[0]; e--;)
                t[e] > i && (i = t[e]);
              return i
            },
            t.destroyObjectProperties = function (e, i) {
              t.objectEach(e, function (t, n) {
                t && t !== i && t.destroy && t.destroy(),
                  delete e[n]
              })
            },
            t.discardElement = function (e) {
              var i = t.garbageBin;
              i || (i = t.createElement("div")),
                e && i.appendChild(e),
                i.innerHTML = ""
            },
            t.correctFloat = function (t, e) {
              return parseFloat(t.toPrecision(e || 14))
            },
            t.setAnimation = function (e, i) {
              i.renderer.globalAnimation = t.pick(e, i.options.chart.animation, !0)
            },
            t.animObject = function (e) {
              return t.isObject(e) ? t.merge(e) : {
                duration: e ? 500 : 0
              }
            },
            t.timeUnits = {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
              month: 24192e5,
              year: 314496e5
            },
            t.numberFormat = function (e, i, n, o) {
              e = +e || 0,
                i = +i;
              var s, r, a = t.defaultOptions.lang,
                l = (e.toString().split(".")[1] || "").split("e")[0].length,
                h = e.toString().split("e");
              return -1 === i ? i = Math.min(l, 20) : t.isNumber(i) ? i && h[1] && 0 > h[1] && (0 <= (s = i + +h[1]) ? (h[0] = (+h[0]).toExponential(s).split("e")[0],
                  i = s) : (h[0] = h[0].split(".")[0] || 0,
                  e = 20 > i ? (h[0] * Math.pow(10, h[1])).toFixed(i) : 0,
                  h[1] = 0)) : i = 2,
                r = (Math.abs(h[1] ? h[0] : e) + Math.pow(10, -Math.max(i, l) - 1)).toFixed(i),
                s = 3 < (l = String(t.pInt(r))).length ? l.length % 3 : 0,
                n = t.pick(n, a.decimalPoint),
                o = t.pick(o, a.thousandsSep),
                e = (0 > e ? "-" : "") + (s ? l.substr(0, s) + o : ""),
                e += l.substr(s).replace(/(\d{3})(?=\d)/g, "$1" + o),
                i && (e += n + r.slice(-i)),
                h[1] && 0 != +e && (e += "e" + h[1]),
                e
            },
            Math.easeInOutSine = function (t) {
              return -.5 * (Math.cos(Math.PI * t) - 1)
            },
            t.getStyle = function (e, i, o) {
              return "width" === i ? Math.min(e.offsetWidth, e.scrollWidth) - t.getStyle(e, "padding-left") - t.getStyle(e, "padding-right") : "height" === i ? Math.min(e.offsetHeight, e.scrollHeight) - t.getStyle(e, "padding-top") - t.getStyle(e, "padding-bottom") : (n.getComputedStyle || t.error(27, !0),
                (e = n.getComputedStyle(e, void 0)) && (e = e.getPropertyValue(i),
                  t.pick(o, "opacity" !== i) && (e = t.pInt(e))),
                e)
            },
            t.inArray = function (e, i, n) {
              return (t.indexOfPolyfill || Array.prototype.indexOf).call(i, e, n)
            },
            t.grep = function (e, i) {
              return (t.filterPolyfill || Array.prototype.filter).call(e, i)
            },
            t.find = Array.prototype.find ? function (t, e) {
              return t.find(e)
            } :
            function (t, e) {
              var i, n = t.length;
              for (i = 0; i < n; i++)
                if (e(t[i], i))
                  return t[i]
            },
            t.some = function (e, i, n) {
              return (t.somePolyfill || Array.prototype.some).call(e, i, n)
            },
            t.map = function (t, e) {
              for (var i = [], n = 0, o = t.length; n < o; n++)
                i[n] = e.call(t[n], t[n], n, t);
              return i
            },
            t.keys = function (e) {
              return (t.keysPolyfill || Object.keys).call(void 0, e)
            },
            t.reduce = function (e, i, n) {
              return (t.reducePolyfill || Array.prototype.reduce).call(e, i, n)
            },
            t.offset = function (t) {
              var e = i.documentElement;
              return {
                top: (t = t.parentElement ? t.getBoundingClientRect() : {
                  top: 0,
                  left: 0
                }).top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: t.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
              }
            },
            t.stop = function (e, i) {
              for (var n = t.timers.length; n--;)
                t.timers[n].elem !== e || i && i !== t.timers[n].prop || (t.timers[n].stopped = !0)
            },
            t.each = function (e, i, n) {
              return (t.forEachPolyfill || Array.prototype.forEach).call(e, i, n)
            },
            t.objectEach = function (t, e, i) {
              for (var n in t)
                t.hasOwnProperty(n) && e.call(i || t[n], t[n], n, t)
            },
            t.addEvent = function (e, i, n) {
              var o, s = e.addEventListener || t.addEventListenerPolyfill;
              return o = "function" == typeof e && e.prototype ? e.prototype.protoEvents = e.prototype.protoEvents || {} : e.hcEvents = e.hcEvents || {},
                s && s.call(e, i, n, !1),
                o[i] || (o[i] = []),
                o[i].push(n),
                function () {
                  t.removeEvent(e, i, n)
                }
            },
            t.removeEvent = function (e, i, n) {
              function o(i, n) {
                var o = e.removeEventListener || t.removeEventListenerPolyfill;
                o && o.call(e, i, n, !1)
              }

              function s(n) {
                var s, r;
                e.nodeName && (i ? (s = {})[i] = !0 : s = n,
                  t.objectEach(s, function (t, e) {
                    if (n[e])
                      for (r = n[e].length; r--;)
                        o(e, n[e][r])
                  }))
              }
              var r, a;
              t.each(["protoEvents", "hcEvents"], function (l) {
                var h = e[l];
                h && (i ? (r = h[i] || [],
                  n ? (-1 < (a = t.inArray(n, r)) && (r.splice(a, 1),
                      h[i] = r),
                    o(i, n)) : (s(h),
                    h[i] = [])) : (s(h),
                  e[l] = {}))
              })
            },
            t.fireEvent = function (e, n, o, s) {
              var r, a, l, h, c;
              o = o || {},
                i.createEvent && (e.dispatchEvent || e.fireEvent) ? ((r = i.createEvent("Events")).initEvent(n, !0, !0),
                  t.extend(r, o),
                  e.dispatchEvent ? e.dispatchEvent(r) : e.fireEvent(n, r)) : t.each(["protoEvents", "hcEvents"], function (i) {
                  if (e[i])
                    for (a = e[i][n] || [],
                      l = a.length,
                      o.target || t.extend(o, {
                        preventDefault: function () {
                          o.defaultPrevented = !0
                        },
                        target: e,
                        type: n
                      }),
                      h = 0; h < l; h++)
                      (c = a[h]) && !1 === c.call(e, o) && o.preventDefault()
                }),
                s && !o.defaultPrevented && s.call(e, o)
            },
            t.animate = function (e, i, n) {
              var o, s, r, a, l = "";
              t.isObject(n) || (n = {
                  duration: (a = arguments)[2],
                  easing: a[3],
                  complete: a[4]
                }),
                t.isNumber(n.duration) || (n.duration = 400),
                n.easing = "function" == typeof n.easing ? n.easing : Math[n.easing] || Math.easeInOutSine,
                n.curAnim = t.merge(i),
                t.objectEach(i, function (a, h) {
                  t.stop(e, h),
                    r = new t.Fx(e, n, h),
                    s = null,
                    "d" === h ? (r.paths = r.initPath(e, e.d, i.d),
                      r.toD = i.d,
                      o = 0,
                      s = 1) : e.attr ? o = e.attr(h) : (o = parseFloat(t.getStyle(e, h)) || 0,
                      "opacity" !== h && (l = "px")),
                    s || (s = a),
                    s && s.match && s.match("px") && (s = s.replace(/px/g, "")),
                    r.run(o, s, l)
                })
            },
            t.seriesType = function (e, i, n, o, s) {
              var r = t.getOptions(),
                a = t.seriesTypes;
              return r.plotOptions[e] = t.merge(r.plotOptions[i], n),
                a[e] = t.extendClass(a[i] || function () {}, o),
                a[e].prototype.type = e,
                s && (a[e].prototype.pointClass = t.extendClass(t.Point, s)),
                a[e]
            },
            t.uniqueKey = function () {
              var t = Math.random().toString(36).substring(2, 9),
                e = 0;
              return function () {
                return "highcharts-" + t + "-" + e++
              }
            }(),
            n.jQuery && (n.jQuery.fn.highcharts = function () {
              var i = [].slice.call(arguments);
              if (this[0])
                return i[0] ? (new(t[t.isString(i[0]) ? i.shift() : "Chart"])(this[0], i[0], i[1]),
                  this) : e[t.attr(this[0], "data-highcharts-chart")]
            })
        }(h),
        function (t) {
          var e = t.each,
            i = t.isNumber,
            n = t.map,
            o = t.merge,
            s = t.pInt;
          t.Color = function (e) {
              if (!(this instanceof t.Color))
                return new t.Color(e);
              this.init(e)
            },
            t.Color.prototype = {
              parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (t) {
                  return [s(t[1]), s(t[2]), s(t[3]), parseFloat(t[4], 10)]
                }
              }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (t) {
                  return [s(t[1]), s(t[2]), s(t[3]), 1]
                }
              }],
              names: {
                none: "rgba(255,255,255,0)",
                white: "#ffffff",
                black: "#000000"
              },
              init: function (e) {
                var i, o, s, r;
                if ((this.input = e = this.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops)
                  this.stops = n(e.stops, function (e) {
                    return new t.Color(e[1])
                  });
                else if (e && e.charAt && "#" === e.charAt() && (i = e.length,
                    e = parseInt(e.substr(1), 16),
                    7 === i ? o = [(16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 1] : 4 === i && (o = [(3840 & e) >> 4 | (3840 & e) >> 8, (240 & e) >> 4 | 240 & e, (15 & e) << 4 | 15 & e, 1])),
                  !o)
                  for (s = this.parsers.length; s-- && !o;)
                    (i = (r = this.parsers[s]).regex.exec(e)) && (o = r.parse(i));
                this.rgba = o || []
              },
              get: function (t) {
                var n, s = this.input,
                  r = this.rgba;
                return this.stops ? ((n = o(s)).stops = [].concat(n.stops),
                    e(this.stops, function (e, i) {
                      n.stops[i] = [n.stops[i][0], e.get(t)]
                    })) : n = r && i(r[0]) ? "rgb" === t || !t && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === t ? r[3] : "rgba(" + r.join(",") + ")" : s,
                  n
              },
              brighten: function (t) {
                var n, o = this.rgba;
                if (this.stops)
                  e(this.stops, function (e) {
                    e.brighten(t)
                  });
                else if (i(t) && 0 !== t)
                  for (n = 0; 3 > n; n++)
                    o[n] += s(255 * t),
                    0 > o[n] && (o[n] = 0),
                    255 < o[n] && (o[n] = 255);
                return this
              },
              setOpacity: function (t) {
                return this.rgba[3] = t,
                  this
              },
              tweenTo: function (t, e) {
                var i = this.rgba,
                  n = t.rgba;
                return n.length && i && i.length ? e = ((t = 1 !== n[3] || 1 !== i[3]) ? "rgba(" : "rgb(") + Math.round(n[0] + (i[0] - n[0]) * (1 - e)) + "," + Math.round(n[1] + (i[1] - n[1]) * (1 - e)) + "," + Math.round(n[2] + (i[2] - n[2]) * (1 - e)) + (t ? "," + (n[3] + (i[3] - n[3]) * (1 - e)) : "") + ")" : e = t.input || "none",
                  e
              }
            },
            t.color = function (e) {
              return new t.Color(e)
            }
        }(h),
        function (t) {
          var e, i, n = t.addEvent,
            o = t.animate,
            s = t.attr,
            r = t.charts,
            a = t.color,
            l = t.css,
            h = t.createElement,
            c = t.defined,
            d = t.deg2rad,
            u = t.destroyObjectProperties,
            p = t.doc,
            f = t.each,
            g = t.extend,
            m = t.erase,
            v = t.grep,
            y = t.hasTouch,
            x = t.inArray,
            b = t.isArray,
            w = t.isFirefox,
            k = t.isMS,
            T = t.isObject,
            S = t.isString,
            C = t.isWebKit,
            A = t.merge,
            M = t.noop,
            E = t.objectEach,
            D = t.pick,
            O = t.pInt,
            P = t.removeEvent,
            I = t.stop,
            _ = t.svg,
            L = t.SVG_NS,
            N = t.symbolSizes,
            H = t.win;
          e = t.SVGElement = function () {
              return this
            },
            g(e.prototype, {
              opacity: 1,
              SVG_NS: L,
              textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
              init: function (t, e) {
                this.element = "span" === e ? h(e) : p.createElementNS(this.SVG_NS, e),
                  this.renderer = t
              },
              animate: function (e, i, n) {
                return 0 !== (i = t.animObject(D(i, this.renderer.globalAnimation, !0))).duration ? (n && (i.complete = n),
                    o(this, e, i)) : (this.attr(e, null, n),
                    i.step && i.step.call(this)),
                  this
              },
              complexColor: function (e, i, n) {
                var o, s, r, a, l, h, d, u, p, g, m, v, y = this.renderer,
                  x = [];
                t.fireEvent(this.renderer, "complexColor", {
                  args: arguments
                }, function () {
                  e.radialGradient ? s = "radialGradient" : e.linearGradient && (s = "linearGradient"),
                    s && (r = e[s],
                      l = y.gradients,
                      d = e.stops,
                      g = n.radialReference,
                      b(r) && (e[s] = r = {
                        x1: r[0],
                        y1: r[1],
                        x2: r[2],
                        y2: r[3],
                        gradientUnits: "userSpaceOnUse"
                      }),
                      "radialGradient" === s && g && !c(r.gradientUnits) && (a = r,
                        r = A(r, y.getRadialAttr(g, a), {
                          gradientUnits: "userSpaceOnUse"
                        })),
                      E(r, function (t, e) {
                        "id" !== e && x.push(e, t)
                      }),
                      E(d, function (t) {
                        x.push(t)
                      }),
                      x = x.join(","),
                      l[x] ? m = l[x].attr("id") : (r.id = m = t.uniqueKey(),
                        l[x] = h = y.createElement(s).attr(r).add(y.defs),
                        h.radAttr = a,
                        h.stops = [],
                        f(d, function (e) {
                          0 === e[1].indexOf("rgba") ? (o = t.color(e[1]),
                              u = o.get("rgb"),
                              p = o.get("a")) : (u = e[1],
                              p = 1),
                            e = y.createElement("stop").attr({
                              offset: e[0],
                              "stop-color": u,
                              "stop-opacity": p
                            }).add(h),
                            h.stops.push(e)
                        })),
                      v = "url(" + y.url + "#" + m + ")",
                      n.setAttribute(i, v),
                      n.gradient = x,
                      e.toString = function () {
                        return v
                      }
                    )
                })
              },
              applyTextOutline: function (e) {
                var i, n, o, r, a, l = this.element;
                if (-1 !== e.indexOf("contrast") && (e = e.replace(/contrast/g, this.renderer.getContrast(l.style.fill))),
                  e = e.split(" "),
                  n = e[e.length - 1],
                  (o = e[0]) && "none" !== o && t.svg) {
                  for (this.fakeTS = !0,
                    e = [].slice.call(l.getElementsByTagName("tspan")),
                    this.ySetter = this.xSetter,
                    o = o.replace(/(^[\d\.]+)(.*?)$/g, function (t, e, i) {
                      return 2 * e + i
                    }),
                    a = e.length; a--;)
                    "highcharts-text-outline" === (i = e[a]).getAttribute("class") && m(e, l.removeChild(i));
                  r = l.firstChild,
                    f(e, function (t, e) {
                      0 === e && (t.setAttribute("x", l.getAttribute("x")),
                          e = l.getAttribute("y"),
                          t.setAttribute("y", e || 0),
                          null === e && l.setAttribute("y", 0)),
                        t = t.cloneNode(1),
                        s(t, {
                          class: "highcharts-text-outline",
                          fill: n,
                          stroke: n,
                          "stroke-width": o,
                          "stroke-linejoin": "round"
                        }),
                        l.insertBefore(t, r)
                    })
                }
              },
              attr: function (t, e, i, n) {
                var o, s, r, a, l = this.element,
                  h = this;
                return "string" == typeof t && void 0 !== e && (o = t,
                    (t = {})[o] = e),
                  "string" == typeof t ? h = (this[t + "Getter"] || this._defaultGetter).call(this, t, l) : (E(t, function (e, i) {
                      r = !1,
                        n || I(this, i),
                        this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(i) && (s || (this.symbolAttr(t),
                            s = !0),
                          r = !0),
                        !this.rotation || "x" !== i && "y" !== i || (this.doTransform = !0),
                        r || ((a = this[i + "Setter"] || this._defaultSetter).call(this, e, i, l),
                          this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(i) && this.updateShadows(i, e, a))
                    }, this),
                    this.afterSetters()),
                  i && i.call(this),
                  h
              },
              afterSetters: function () {
                this.doTransform && (this.updateTransform(),
                  this.doTransform = !1)
              },
              updateShadows: function (t, e, i) {
                for (var n = this.shadows, o = n.length; o--;)
                  i.call(n[o], "height" === t ? Math.max(e - (n[o].cutHeight || 0), 0) : "d" === t ? this.d : e, t, n[o])
              },
              addClass: function (t, e) {
                var i = this.attr("class") || "";
                return -1 === i.indexOf(t) && (e || (t = (i + (i ? " " : "") + t).replace("  ", " ")),
                    this.attr("class", t)),
                  this
              },
              hasClass: function (t) {
                return -1 !== x(t, (this.attr("class") || "").split(" "))
              },
              removeClass: function (t) {
                return this.attr("class", (this.attr("class") || "").replace(t, ""))
              },
              symbolAttr: function (t) {
                var e = this;
                f("x y r start end width height innerR anchorX anchorY".split(" "), function (i) {
                    e[i] = D(t[i], e[i])
                  }),
                  e.attr({
                    d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                  })
              },
              clip: function (t) {
                return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
              },
              crisp: function (t, e) {
                var i;
                return e = e || t.strokeWidth || 0,
                  i = Math.round(e) % 2 / 2,
                  t.x = Math.floor(t.x || this.x || 0) + i,
                  t.y = Math.floor(t.y || this.y || 0) + i,
                  t.width = Math.floor((t.width || this.width || 0) - 2 * i),
                  t.height = Math.floor((t.height || this.height || 0) - 2 * i),
                  c(t.strokeWidth) && (t.strokeWidth = e),
                  t
              },
              css: function (t) {
                var e, i, n = this.styles,
                  o = {},
                  r = this.element,
                  a = "",
                  h = !n,
                  c = ["textOutline", "textOverflow", "width"];
                return t && t.color && (t.fill = t.color),
                  n && E(t, function (t, e) {
                    t !== n[e] && (o[e] = t,
                      h = !0)
                  }),
                  h && (n && (t = g(n, o)),
                    e = this.textWidth = t && t.width && "auto" !== t.width && "text" === r.nodeName.toLowerCase() && O(t.width),
                    this.styles = t,
                    e && !_ && this.renderer.forExport && delete t.width,
                    r.namespaceURI === this.SVG_NS ? (i = function (t, e) {
                        return "-" + e.toLowerCase()
                      },
                      E(t, function (t, e) {
                        -1 === x(e, c) && (a += e.replace(/([A-Z])/g, i) + ":" + t + ";")
                      }),
                      a && s(r, "style", a)) : l(r, t),
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                      t && t.textOutline && this.applyTextOutline(t.textOutline))),
                  this
              },
              strokeWidth: function () {
                return this["stroke-width"] || 0
              },
              on: function (t, e) {
                var i = this,
                  n = i.element;
                return y && "click" === t ? (n.ontouchstart = function (t) {
                      i.touchEventFired = Date.now(),
                        t.preventDefault(),
                        e.call(n, t)
                    },
                    n.onclick = function (t) {
                      (-1 === H.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (i.touchEventFired || 0)) && e.call(n, t)
                    }
                  ) : n["on" + t] = e,
                  this
              },
              setRadialReference: function (t) {
                var e = this.renderer.gradients[this.element.gradient];
                return this.element.radialReference = t,
                  e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)),
                  this
              },
              translate: function (t, e) {
                return this.attr({
                  translateX: t,
                  translateY: e
                })
              },
              invert: function (t) {
                return this.inverted = t,
                  this.updateTransform(),
                  this
              },
              updateTransform: function () {
                var t = this.translateX || 0,
                  e = this.translateY || 0,
                  i = this.scaleX,
                  n = this.scaleY,
                  o = this.inverted,
                  s = this.rotation,
                  r = this.matrix,
                  a = this.element;
                o && (t += this.width,
                    e += this.height),
                  t = ["translate(" + t + "," + e + ")"],
                  c(r) && t.push("matrix(" + r.join(",") + ")"),
                  o ? t.push("rotate(90) scale(-1,1)") : s && t.push("rotate(" + s + " " + D(this.rotationOriginX, a.getAttribute("x"), 0) + " " + D(this.rotationOriginY, a.getAttribute("y") || 0) + ")"),
                  (c(i) || c(n)) && t.push("scale(" + D(i, 1) + " " + D(n, 1) + ")"),
                  t.length && a.setAttribute("transform", t.join(" "))
              },
              toFront: function () {
                var t = this.element;
                return t.parentNode.appendChild(t),
                  this
              },
              align: function (t, e, i) {
                var n, o, s, r, a, l, h = {};
                return s = (o = this.renderer).alignedObjects,
                  t ? (this.alignOptions = t,
                    this.alignByTranslate = e,
                    (!i || S(i)) && (this.alignTo = n = i || "renderer",
                      m(s, this),
                      s.push(this),
                      i = null)) : (t = this.alignOptions,
                    e = this.alignByTranslate,
                    n = this.alignTo),
                  i = D(i, o[n], o),
                  n = t.align,
                  o = t.verticalAlign,
                  s = (i.x || 0) + (t.x || 0),
                  r = (i.y || 0) + (t.y || 0),
                  "right" === n ? a = 1 : "center" === n && (a = 2),
                  a && (s += (i.width - (t.width || 0)) / a),
                  h[e ? "translateX" : "x"] = Math.round(s),
                  "bottom" === o ? l = 1 : "middle" === o && (l = 2),
                  l && (r += (i.height - (t.height || 0)) / l),
                  h[e ? "translateY" : "y"] = Math.round(r),
                  this[this.placed ? "animate" : "attr"](h),
                  this.placed = !0,
                  this.alignAttr = h,
                  this
              },
              getBBox: function (t, e) {
                var i, n, o, s, r, a = this.renderer,
                  l = this.element,
                  h = this.styles,
                  u = this.textStr,
                  p = a.cache,
                  m = a.cacheKeys;
                if (n = (e = D(e, this.rotation)) * d,
                  o = h && h.fontSize,
                  c(u) && (-1 === (r = u.toString()).indexOf("<") && (r = r.replace(/[0-9]/g, "0")),
                    r += ["", e || 0, o, this.textWidth, h && h.textOverflow].join()),
                  r && !t && (i = p[r]),
                  !i) {
                  if (l.namespaceURI === this.SVG_NS || a.forExport) {
                    try {
                      (s = this.fakeTS && function (t) {
                        f(l.querySelectorAll(".highcharts-text-outline"), function (e) {
                          e.style.display = t
                        })
                      }) && s("none"),
                        i = l.getBBox ? g({}, l.getBBox()) : {
                          width: l.offsetWidth,
                          height: l.offsetHeight
                        },
                        s && s("")
                    } catch (t) {}
                    (!i || 0 > i.width) && (i = {
                      width: 0,
                      height: 0
                    })
                  } else
                    i = this.htmlGetBBox();
                  if (a.isSVG && (t = i.width,
                      a = i.height,
                      h && "11px" === h.fontSize && 17 === Math.round(a) && (i.height = a = 14),
                      e && (i.width = Math.abs(a * Math.sin(n)) + Math.abs(t * Math.cos(n)),
                        i.height = Math.abs(a * Math.cos(n)) + Math.abs(t * Math.sin(n)))),
                    r && 0 < i.height) {
                    for (; 250 < m.length;)
                      delete p[m.shift()];
                    p[r] || m.push(r),
                      p[r] = i
                  }
                }
                return i
              },
              show: function (t) {
                return this.attr({
                  visibility: t ? "inherit" : "visible"
                })
              },
              hide: function () {
                return this.attr({
                  visibility: "hidden"
                })
              },
              fadeOut: function (t) {
                var e = this;
                e.animate({
                  opacity: 0
                }, {
                  duration: t || 150,
                  complete: function () {
                    e.attr({
                      y: -9999
                    })
                  }
                })
              },
              add: function (t) {
                var e, i = this.renderer,
                  n = this.element;
                return t && (this.parentGroup = t),
                  this.parentInverted = t && t.inverted,
                  void 0 !== this.textStr && i.buildText(this),
                  this.added = !0,
                  (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()),
                  e || (t ? t.element : i.box).appendChild(n),
                  this.onAdd && this.onAdd(),
                  this
              },
              safeRemoveChild: function (t) {
                var e = t.parentNode;
                e && e.removeChild(t)
              },
              destroy: function () {
                var t = this,
                  e = t.element || {},
                  i = t.renderer.isSVG && "SPAN" === e.nodeName && t.parentGroup,
                  n = e.ownerSVGElement,
                  o = t.clipPath;
                if (e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null,
                  I(t),
                  o && n && (f(n.querySelectorAll("[clip-path],[CLIP-PATH]"), function (t) {
                      var e = t.getAttribute("clip-path"),
                        i = o.element.id;
                      (-1 < e.indexOf("(#" + i + ")") || -1 < e.indexOf('("#' + i + '")')) && t.removeAttribute("clip-path")
                    }),
                    t.clipPath = o.destroy()),
                  t.stops) {
                  for (n = 0; n < t.stops.length; n++)
                    t.stops[n] = t.stops[n].destroy();
                  t.stops = null
                }
                for (t.safeRemoveChild(e),
                  t.destroyShadows(); i && i.div && 0 === i.div.childNodes.length;)
                  e = i.parentGroup,
                  t.safeRemoveChild(i.div),
                  delete i.div,
                  i = e;
                return t.alignTo && m(t.renderer.alignedObjects, t),
                  E(t, function (e, i) {
                    delete t[i]
                  }),
                  null
              },
              shadow: function (t, e, i) {
                var n, o, r, a, l, h, c = [],
                  d = this.element;
                if (t) {
                  if (!this.shadows) {
                    for (a = D(t.width, 3),
                      l = (t.opacity || .15) / a,
                      h = this.parentInverted ? "(-1,-1)" : "(" + D(t.offsetX, 1) + ", " + D(t.offsetY, 1) + ")",
                      n = 1; n <= a; n++)
                      o = d.cloneNode(0),
                      r = 2 * a + 1 - 2 * n,
                      s(o, {
                        isShadow: "true",
                        stroke: t.color || "#000000",
                        "stroke-opacity": l * n,
                        "stroke-width": r,
                        transform: "translate" + h,
                        fill: "none"
                      }),
                      i && (s(o, "height", Math.max(s(o, "height") - r, 0)),
                        o.cutHeight = r),
                      e ? e.element.appendChild(o) : d.parentNode && d.parentNode.insertBefore(o, d),
                      c.push(o);
                    this.shadows = c
                  }
                } else
                  this.destroyShadows();
                return this
              },
              destroyShadows: function () {
                f(this.shadows || [], function (t) {
                    this.safeRemoveChild(t)
                  }, this),
                  this.shadows = void 0
              },
              xGetter: function (t) {
                return "circle" === this.element.nodeName && ("x" === t ? t = "cx" : "y" === t && (t = "cy")),
                  this._defaultGetter(t)
              },
              _defaultGetter: function (t) {
                return t = D(this[t + "Value"], this[t], this.element ? this.element.getAttribute(t) : null, 0),
                  /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)),
                  t
              },
              dSetter: function (t, e, i) {
                t && t.join && (t = t.join(" ")),
                  /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"),
                  this[e] !== t && (i.setAttribute(e, t),
                    this[e] = t)
              },
              dashstyleSetter: function (t) {
                var e, i = this["stroke-width"];
                if ("inherit" === i && (i = 1),
                  t = t && t.toLowerCase()) {
                  for (e = (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",")).length; e--;)
                    t[e] = O(t[e]) * i;
                  t = t.join(",").replace(/NaN/g, "none"),
                    this.element.setAttribute("stroke-dasharray", t)
                }
              },
              alignSetter: function (t) {
                this.alignValue = t,
                  this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                  } [t])
              },
              opacitySetter: function (t, e, i) {
                this[e] = t,
                  i.setAttribute(e, t)
              },
              titleSetter: function (t) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = p.createElementNS(this.SVG_NS, "title"),
                    this.element.appendChild(e)),
                  e.firstChild && e.removeChild(e.firstChild),
                  e.appendChild(p.createTextNode(String(D(t), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
              },
              textSetter: function (t) {
                t !== this.textStr && (delete this.bBox,
                  this.textStr = t,
                  this.added && this.renderer.buildText(this))
              },
              fillSetter: function (t, e, i) {
                "string" == typeof t ? i.setAttribute(e, t) : t && this.complexColor(t, e, i)
              },
              visibilitySetter: function (t, e, i) {
                "inherit" === t ? i.removeAttribute(e) : this[e] !== t && i.setAttribute(e, t),
                  this[e] = t
              },
              zIndexSetter: function (t, e) {
                var i, n, o, s, r = this.renderer,
                  a = this.parentGroup,
                  l = (a || r).element || r.box,
                  h = this.element;
                r = l === r.box;
                if (i = this.added,
                  c(t) && (h.zIndex = t,
                    t = +t,
                    this[e] === t && (i = !1),
                    this[e] = t),
                  i) {
                  for ((t = this.zIndex) && a && (a.handleZ = !0),
                    s = (e = l.childNodes).length - 1; 0 <= s && !n; s--)
                    i = (a = e[s]).zIndex,
                    o = !c(i),
                    a !== h && (0 > t && o && !r && !s ? (l.insertBefore(h, e[s]),
                      n = !0) : (O(i) <= t || o && (!c(t) || 0 <= t)) && (l.insertBefore(h, e[s + 1] || null),
                      n = !0));
                  n || (l.insertBefore(h, e[r ? 3 : 0] || null),
                    n = !0)
                }
                return n
              },
              _defaultSetter: function (t, e, i) {
                i.setAttribute(e, t)
              }
            }),
            e.prototype.yGetter = e.prototype.xGetter,
            e.prototype.translateXSetter = e.prototype.translateYSetter = e.prototype.rotationSetter = e.prototype.verticalAlignSetter = e.prototype.rotationOriginXSetter = e.prototype.rotationOriginYSetter = e.prototype.scaleXSetter = e.prototype.scaleYSetter = e.prototype.matrixSetter = function (t, e) {
              this[e] = t,
                this.doTransform = !0
            },
            e.prototype["stroke-widthSetter"] = e.prototype.strokeSetter = function (t, i, n) {
              this[i] = t,
                this.stroke && this["stroke-width"] ? (e.prototype.fillSetter.call(this, this.stroke, "stroke", n),
                  n.setAttribute("stroke-width", this["stroke-width"]),
                  this.hasStroke = !0) : "stroke-width" === i && 0 === t && this.hasStroke && (n.removeAttribute("stroke"),
                  this.hasStroke = !1)
            },
            i = t.SVGRenderer = function () {
              this.init.apply(this, arguments)
            },
            g(i.prototype, {
              Element: e,
              SVG_NS: L,
              init: function (t, e, i, o, r, a) {
                var h, c;
                h = (o = this.createElement("svg").attr({
                    version: "1.1",
                    class: "highcharts-root"
                  }).css(this.getStyle(o))).element,
                  t.appendChild(h),
                  s(t, "dir", "ltr"),
                  -1 === t.innerHTML.indexOf("xmlns") && s(h, "xmlns", this.SVG_NS),
                  this.isSVG = !0,
                  this.box = h,
                  this.boxWrapper = o,
                  this.alignedObjects = [],
                  this.url = (w || C) && p.getElementsByTagName("base").length ? H.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "",
                  this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highstock 6.1.0")),
                  this.defs = this.createElement("defs").add(),
                  this.allowHTML = a,
                  this.forExport = r,
                  this.gradients = {},
                  this.cache = {},
                  this.cacheKeys = [],
                  this.imgCount = 0,
                  this.setSize(e, i, !1),
                  w && t.getBoundingClientRect && ((e = function () {
                      l(t, {
                          left: 0,
                          top: 0
                        }),
                        c = t.getBoundingClientRect(),
                        l(t, {
                          left: Math.ceil(c.left) - c.left + "px",
                          top: Math.ceil(c.top) - c.top + "px"
                        })
                    })(),
                    this.unSubPixelFix = n(H, "resize", e))
              },
              getStyle: function (t) {
                return this.style = g({
                  fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                  fontSize: "12px"
                }, t)
              },
              setStyle: function (t) {
                this.boxWrapper.css(this.getStyle(t))
              },
              isHidden: function () {
                return !this.boxWrapper.getBBox().width
              },
              destroy: function () {
                var t = this.defs;
                return this.box = null,
                  this.boxWrapper = this.boxWrapper.destroy(),
                  u(this.gradients || {}),
                  this.gradients = null,
                  t && (this.defs = t.destroy()),
                  this.unSubPixelFix && this.unSubPixelFix(),
                  this.alignedObjects = null
              },
              createElement: function (t) {
                var e = new this.Element;
                return e.init(this, t),
                  e
              },
              draw: M,
              getRadialAttr: function (t, e) {
                return {
                  cx: t[0] - t[2] / 2 + e.cx * t[2],
                  cy: t[1] - t[2] / 2 + e.cy * t[2],
                  r: e.r * t[2]
                }
              },
              getSpanWidth: function (t) {
                return t.getBBox(!0).width
              },
              applyEllipsis: function (t, e, i, n) {
                var o, s, r = t.rotation,
                  a = i,
                  l = 0,
                  h = i.length,
                  c = function (t) {
                    e.removeChild(e.firstChild),
                      t && e.appendChild(p.createTextNode(t))
                  };
                if (t.rotation = 0,
                  s = (a = this.getSpanWidth(t, e)) > n) {
                  for (; l <= h;)
                    o = Math.ceil((l + h) / 2),
                    c(a = i.substring(0, o) + "…"),
                    a = this.getSpanWidth(t, e),
                    l === h ? l = h + 1 : a > n ? h = o - 1 : l = o;
                  0 === h && c("")
                }
                return t.rotation = r,
                  s
              },
              escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
              },
              buildText: function (t) {
                var e, i, n, o = t.element,
                  r = this,
                  a = r.forExport,
                  h = D(t.textStr, "").toString(),
                  c = -1 !== h.indexOf("<"),
                  d = o.childNodes,
                  u = s(o, "x"),
                  g = t.styles,
                  m = t.textWidth,
                  y = g && g.lineHeight,
                  b = g && g.textOutline,
                  w = g && "ellipsis" === g.textOverflow,
                  k = g && "nowrap" === g.whiteSpace,
                  T = g && g.fontSize,
                  S = d.length,
                  C = (g = m && !t.added && this.box,
                    function (t) {
                      var e;
                      return e = /(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : T || r.style.fontSize || 12,
                        y ? O(y) : r.fontMetrics(e, t.getAttribute("style") ? t : o).h
                    }
                  ),
                  A = function (t, e) {
                    return E(r.escapes, function (i, n) {
                        e && -1 !== x(i, e) || (t = t.toString().replace(new RegExp(i, "g"), n))
                      }),
                      t
                  },
                  M = function (t, e) {
                    var i;
                    if (i = t.indexOf("<"),
                      -1 !== (i = (t = t.substring(i, t.indexOf(">") - i)).indexOf(e + "=")) && (i = i + e.length + 1,
                        '"' === (e = t.charAt(i)) || "'" === e))
                      return (t = t.substring(i + 1)).substring(0, t.indexOf(e))
                  };
                if ((i = [h, w, k, y, b, T, m].join()) !== t.textCache) {
                  for (t.textCache = i; S--;)
                    o.removeChild(d[S]);
                  c || b || w || m || -1 !== h.indexOf(" ") ? (g && g.appendChild(o),
                    h = c ? h.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [h],
                    h = v(h, function (t) {
                      return "" !== t
                    }),
                    f(h, function (i, h) {
                      var c, d = 0;
                      i = i.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"),
                        c = i.split("|||"),
                        f(c, function (i) {
                          if ("" !== i || 1 === c.length) {
                            var f, g, v = {},
                              y = p.createElementNS(r.SVG_NS, "tspan");
                            if ((f = M(i, "class")) && s(y, "class", f),
                              (f = M(i, "style")) && (f = f.replace(/(;| |^)color([ :])/, "$1fill$2"),
                                s(y, "style", f)),
                              (g = M(i, "href")) && !a && (s(y, "onclick", 'location.href="' + g + '"'),
                                s(y, "class", "highcharts-anchor"),
                                l(y, {
                                  cursor: "pointer"
                                })),
                              " " !== (i = A(i.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "))) {
                              if (y.appendChild(p.createTextNode(i)),
                                d ? v.dx = 0 : h && null !== u && (v.x = u),
                                s(y, v),
                                o.appendChild(y),
                                !d && n && (!_ && a && l(y, {
                                    display: "block"
                                  }),
                                  s(y, "dy", C(y))),
                                m) {
                                v = i.replace(/([^\^])-/g, "$1- ").split(" "),
                                  g = 1 < c.length || h || 1 < v.length && !k;
                                var x, b = [],
                                  T = C(y),
                                  S = t.rotation;
                                for (w && (e = r.applyEllipsis(t, y, i, m)); !w && g && (v.length || b.length);)
                                  t.rotation = 0,
                                  i = (x = r.getSpanWidth(t, y)) > m,
                                  void 0 === e && (e = i),
                                  i && 1 !== v.length ? (y.removeChild(y.firstChild),
                                    b.unshift(v.pop())) : (v = b,
                                    b = [],
                                    v.length && !k && (y = p.createElementNS(L, "tspan"),
                                      s(y, {
                                        dy: T,
                                        x: u
                                      }),
                                      f && s(y, "style", f),
                                      o.appendChild(y)),
                                    x > m && (m = x)),
                                  v.length && y.appendChild(p.createTextNode(v.join(" ").replace(/- /g, "-")));
                                t.rotation = S
                              }
                              d++
                            }
                          }
                        }),
                        n = n || o.childNodes.length
                    }),
                    e && t.attr("title", A(t.textStr, ["&lt;", "&gt;"])),
                    g && g.removeChild(o),
                    b && t.applyTextOutline && t.applyTextOutline(b)) : o.appendChild(p.createTextNode(A(h)))
                }
              },
              getContrast: function (t) {
                return 510 < (t = a(t).rgba)[0] + t[1] + t[2] ? "#000000" : "#FFFFFF"
              },
              button: function (t, e, i, o, s, r, a, l, h) {
                var c, d, u, p, f = this.label(t, e, i, h, null, null, null, null, "button"),
                  m = 0;
                return f.attr(A({
                    padding: 8,
                    r: 2
                  }, s)),
                  s = A({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                      color: "#333333",
                      cursor: "pointer",
                      fontWeight: "normal"
                    }
                  }, s),
                  c = s.style,
                  delete s.style,
                  r = A(s, {
                    fill: "#e6e6e6"
                  }, r),
                  d = r.style,
                  delete r.style,
                  a = A(s, {
                    fill: "#e6ebf5",
                    style: {
                      color: "#000000",
                      fontWeight: "bold"
                    }
                  }, a),
                  u = a.style,
                  delete a.style,
                  l = A(s, {
                    style: {
                      color: "#cccccc"
                    }
                  }, l),
                  p = l.style,
                  delete l.style,
                  n(f.element, k ? "mouseover" : "mouseenter", function () {
                    3 !== m && f.setState(1)
                  }),
                  n(f.element, k ? "mouseout" : "mouseleave", function () {
                    3 !== m && f.setState(m)
                  }),
                  f.setState = function (t) {
                    1 !== t && (f.state = m = t),
                      f.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t || 0]),
                      f.attr([s, r, a, l][t || 0]).css([c, d, u, p][t || 0])
                  },
                  f.attr(s).css(g({
                    cursor: "default"
                  }, c)),
                  f.on("click", function (t) {
                    3 !== m && o.call(f, t)
                  })
              },
              crispLine: function (t, e) {
                return t[1] === t[4] && (t[1] = t[4] = Math.round(t[1]) - e % 2 / 2),
                  t[2] === t[5] && (t[2] = t[5] = Math.round(t[2]) + e % 2 / 2),
                  t
              },
              path: function (t) {
                var e = {
                  fill: "none"
                };
                return b(t) ? e.d = t : T(t) && g(e, t),
                  this.createElement("path").attr(e)
              },
              circle: function (t, e, i) {
                return t = T(t) ? t : {
                    x: t,
                    y: e,
                    r: i
                  },
                  (e = this.createElement("circle")).xSetter = e.ySetter = function (t, e, i) {
                    i.setAttribute("c" + e, t)
                  },
                  e.attr(t)
              },
              arc: function (t, e, i, n, o, s) {
                return T(t) ? (e = (n = t).y,
                    i = n.r,
                    t = n.x) : n = {
                    innerR: n,
                    start: o,
                    end: s
                  },
                  (t = this.symbol("arc", t, e, i, i, n)).r = i,
                  t
              },
              rect: function (t, e, i, n, o, r) {
                o = T(t) ? t.r : o;
                var a = this.createElement("rect");
                return t = T(t) ? t : void 0 === t ? {} : {
                    x: t,
                    y: e,
                    width: Math.max(i, 0),
                    height: Math.max(n, 0)
                  },
                  void 0 !== r && (t.strokeWidth = r,
                    t = a.crisp(t)),
                  t.fill = "none",
                  o && (t.r = o),
                  a.rSetter = function (t, e, i) {
                    s(i, {
                      rx: t,
                      ry: t
                    })
                  },
                  a.attr(t)
              },
              setSize: function (t, e, i) {
                var n = this.alignedObjects,
                  o = n.length;
                for (this.width = t,
                  this.height = e,
                  this.boxWrapper.animate({
                    width: t,
                    height: e
                  }, {
                    step: function () {
                      this.attr({
                        viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                      })
                    },
                    duration: D(i, !0) ? void 0 : 0
                  }); o--;)
                  n[o].align()
              },
              g: function (t) {
                var e = this.createElement("g");
                return t ? e.attr({
                  class: "highcharts-" + t
                }) : e
              },
              image: function (t, e, i, o, s, r) {
                var a, l = {
                    preserveAspectRatio: "none"
                  },
                  h = function (t, e) {
                    t.setAttributeNS ? t.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : t.setAttribute("hc-svg-href", e)
                  };
                return 1 < arguments.length && g(l, {
                    x: e,
                    y: i,
                    width: o,
                    height: s
                  }),
                  a = this.createElement("image").attr(l),
                  r ? (h(a.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    l = new H.Image,
                    n(l, "load", function (e) {
                      h(a.element, t),
                        r.call(a, e)
                    }),
                    l.src = t) : h(a.element, t),
                  a
              },
              symbol: function (t, e, i, n, o, s) {
                var a, d, u, m = this,
                  v = /^url\((.*?)\)$/,
                  y = v.test(t),
                  x = !y && (this.symbols[t] ? t : "circle"),
                  b = x && this.symbols[x],
                  w = c(e) && b && b.call(this.symbols, Math.round(e), Math.round(i), n, o, s);
                return b ? ((a = this.path(w)).attr("fill", "none"),
                    g(a, {
                      symbolName: x,
                      x: e,
                      y: i,
                      width: n,
                      height: o
                    }),
                    s && g(a, s)) : y && (d = t.match(v)[1],
                    (a = this.image(d)).imgwidth = D(N[d] && N[d].width, s && s.width),
                    a.imgheight = D(N[d] && N[d].height, s && s.height),
                    u = function () {
                      a.attr({
                        width: a.width,
                        height: a.height
                      })
                    },
                    f(["width", "height"], function (t) {
                      a[t + "Setter"] = function (t, e) {
                        var i = {},
                          n = this["img" + e],
                          o = "width" === e ? "translateX" : "translateY";
                        this[e] = t,
                          c(n) && (this.element && this.element.setAttribute(e, n),
                            this.alignByTranslate || (i[o] = ((this[e] || 0) - n) / 2,
                              this.attr(i)))
                      }
                    }),
                    c(e) && a.attr({
                      x: e,
                      y: i
                    }),
                    a.isImg = !0,
                    c(a.imgwidth) && c(a.imgheight) ? u() : (a.attr({
                        width: 0,
                        height: 0
                      }),
                      h("img", {
                        onload: function () {
                          var t = r[m.chartIndex];
                          0 === this.width && (l(this, {
                                position: "absolute",
                                top: "-999em"
                              }),
                              p.body.appendChild(this)),
                            N[d] = {
                              width: this.width,
                              height: this.height
                            },
                            a.imgwidth = this.width,
                            a.imgheight = this.height,
                            a.element && u(),
                            this.parentNode && this.parentNode.removeChild(this),
                            m.imgCount--,
                            !m.imgCount && t && t.onload && t.onload()
                        },
                        src: d
                      }),
                      this.imgCount++)),
                  a
              },
              symbols: {
                circle: function (t, e, i, n) {
                  return this.arc(t + i / 2, e + n / 2, i / 2, n / 2, {
                    start: 0,
                    end: 2 * Math.PI,
                    open: !1
                  })
                },
                square: function (t, e, i, n) {
                  return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
                },
                triangle: function (t, e, i, n) {
                  return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
                },
                "triangle-down": function (t, e, i, n) {
                  return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
                },
                diamond: function (t, e, i, n) {
                  return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
                },
                arc: function (t, e, i, n, o) {
                  var s = o.start,
                    r = o.r || i,
                    a = o.r || n || i,
                    l = o.end - .001;
                  i = o.innerR,
                    n = D(o.open, .001 > Math.abs(o.end - o.start - 2 * Math.PI));
                  var h = Math.cos(s),
                    d = Math.sin(s),
                    u = Math.cos(l);
                  l = Math.sin(l);
                  return r = ["M", t + r * h, e + a * d, "A", r, a, 0, o = .001 > o.end - s - Math.PI ? 0 : 1, 1, t + r * u, e + a * l],
                    c(i) && r.push(n ? "M" : "L", t + i * u, e + i * l, "A", i, i, 0, o, 0, t + i * h, e + i * d),
                    r.push(n ? "" : "Z"),
                    r
                },
                callout: function (t, e, i, n, o) {
                  var s, r = Math.min(o && o.r || 0, i, n),
                    a = r + 6,
                    l = o && o.anchorX;
                  return o = o && o.anchorY,
                    s = ["M", t + r, e, "L", t + i - r, e, "C", t + i, e, t + i, e, t + i, e + r, "L", t + i, e + n - r, "C", t + i, e + n, t + i, e + n, t + i - r, e + n, "L", t + r, e + n, "C", t, e + n, t, e + n, t, e + n - r, "L", t, e + r, "C", t, e, t, e, t + r, e],
                    l && l > i ? o > e + a && o < e + n - a ? s.splice(13, 3, "L", t + i, o - 6, t + i + 6, o, t + i, o + 6, t + i, e + n - r) : s.splice(13, 3, "L", t + i, n / 2, l, o, t + i, n / 2, t + i, e + n - r) : l && 0 > l ? o > e + a && o < e + n - a ? s.splice(33, 3, "L", t, o + 6, t - 6, o, t, o - 6, t, e + r) : s.splice(33, 3, "L", t, n / 2, l, o, t, n / 2, t, e + r) : o && o > n && l > t + a && l < t + i - a ? s.splice(23, 3, "L", l + 6, e + n, l, e + n + 6, l - 6, e + n, t + r, e + n) : o && 0 > o && l > t + a && l < t + i - a && s.splice(3, 3, "L", l - 6, e, l, e - 6, l + 6, e, i - r, e),
                    s
                }
              },
              clipRect: function (e, i, n, o) {
                var s = t.uniqueKey(),
                  r = this.createElement("clipPath").attr({
                    id: s
                  }).add(this.defs);
                return (e = this.rect(e, i, n, o, 0).add(r)).id = s,
                  e.clipPath = r,
                  e.count = 0,
                  e
              },
              text: function (t, e, i, n) {
                var o = {};
                return !n || !this.allowHTML && this.forExport ? (o.x = Math.round(e || 0),
                  i && (o.y = Math.round(i)),
                  (t || 0 === t) && (o.text = t),
                  t = this.createElement("text").attr(o),
                  n || (t.xSetter = function (t, e, i) {
                    var n, o, s = i.getElementsByTagName("tspan"),
                      r = i.getAttribute(e);
                    for (o = 0; o < s.length; o++)
                      (n = s[o]).getAttribute(e) === r && n.setAttribute(e, t);
                    i.setAttribute(e, t)
                  }),
                  t) : this.html(t, e, i)
              },
              fontMetrics: function (t, e) {
                return t = t || e && e.style && e.style.fontSize || this.style && this.style.fontSize, {
                  h: e = 24 > (t = /px/.test(t) ? O(t) : /em/.test(t) ? parseFloat(t) * (e ? this.fontMetrics(null, e.parentNode).f : 16) : 12) ? t + 3 : Math.round(1.2 * t),
                  b: Math.round(.8 * e),
                  f: t
                }
              },
              rotCorr: function (t, e, i) {
                var n = t;
                return e && i && (n = Math.max(n * Math.cos(e * d), 4)), {
                  x: -t / 3 * Math.sin(e * d),
                  y: n
                }
              },
              label: function (i, n, o, s, r, a, l, h, d) {
                var u, p, m, v, y, x, b, w, k, T, S, C, M, E = this,
                  D = E.g("button" !== d && "label"),
                  O = D.text = E.text("", 0, 0, l).attr({
                    zIndex: 1
                  }),
                  I = 0,
                  _ = 3,
                  L = 0,
                  N = {},
                  H = /^url\((.*?)\)$/.test(s),
                  R = H;
                d && D.addClass("highcharts-" + d),
                  R = H,
                  T = function () {
                    return (w || 0) % 2 / 2
                  },
                  S = function () {
                    var t = O.element.style,
                      e = {};
                    p = (void 0 === m || void 0 === v || b) && c(O.textStr) && O.getBBox(),
                      D.width = (m || p.width || 0) + 2 * _ + L,
                      D.height = (v || p.height || 0) + 2 * _,
                      k = _ + E.fontMetrics(t && t.fontSize, O).b,
                      R && (u || (D.box = u = E.symbols[s] || H ? E.symbol(s) : E.rect(),
                          u.addClass(("button" === d ? "" : "highcharts-label-box") + (d ? " highcharts-" + d + "-box" : "")),
                          u.add(D),
                          t = T(),
                          e.x = t,
                          e.y = (h ? -k : 0) + t),
                        e.width = Math.round(D.width),
                        e.height = Math.round(D.height),
                        u.attr(g(e, N)),
                        N = {})
                  },
                  C = function () {
                    var t, e = L + _;
                    t = h ? 0 : k,
                      c(m) && p && ("center" === b || "right" === b) && (e += {
                        center: .5,
                        right: 1
                      } [b] * (m - p.width)),
                      e === O.x && t === O.y || (O.attr("x", e),
                        void 0 !== t && O.attr("y", t)),
                      O.x = e,
                      O.y = t
                  },
                  M = function (t, e) {
                    u ? u.attr(t, e) : N[t] = e
                  },
                  D.onAdd = function () {
                    O.add(D),
                      D.attr({
                        text: i || 0 === i ? i : "",
                        x: n,
                        y: o
                      }),
                      u && c(r) && D.attr({
                        anchorX: r,
                        anchorY: a
                      })
                  },
                  D.widthSetter = function (e) {
                    m = t.isNumber(e) ? e : null
                  },
                  D.heightSetter = function (t) {
                    v = t
                  },
                  D["text-alignSetter"] = function (t) {
                    b = t
                  },
                  D.paddingSetter = function (t) {
                    c(t) && t !== _ && (_ = D.padding = t,
                      C())
                  },
                  D.paddingLeftSetter = function (t) {
                    c(t) && t !== L && (L = t,
                      C())
                  },
                  D.alignSetter = function (t) {
                    (t = {
                      left: 0,
                      center: .5,
                      right: 1
                    } [t]) !== I && (I = t,
                      p && D.attr({
                        x: y
                      }))
                  },
                  D.textSetter = function (t) {
                    void 0 !== t && O.textSetter(t),
                      S(),
                      C()
                  },
                  D["stroke-widthSetter"] = function (t, e) {
                    t && (R = !0),
                      w = this["stroke-width"] = t,
                      M(e, t)
                  },
                  D.strokeSetter = D.fillSetter = D.rSetter = function (t, e) {
                    "r" !== e && ("fill" === e && t && (R = !0),
                        D[e] = t),
                      M(e, t)
                  },
                  D.anchorXSetter = function (t, e) {
                    r = D.anchorX = t,
                      M(e, Math.round(t) - T() - y)
                  },
                  D.anchorYSetter = function (t, e) {
                    a = D.anchorY = t,
                      M(e, t - x)
                  },
                  D.xSetter = function (t) {
                    D.x = t,
                      I && (t -= I * ((m || p.width) + 2 * _),
                        D["forceAnimate:x"] = !0),
                      y = Math.round(t),
                      D.attr("translateX", y)
                  },
                  D.ySetter = function (t) {
                    x = D.y = Math.round(t),
                      D.attr("translateY", x)
                  };
                var B = D.css;
                return g(D, {
                  css: function (t) {
                    if (t) {
                      var e = {};
                      t = A(t),
                        f(D.textProps, function (i) {
                          void 0 !== t[i] && (e[i] = t[i],
                            delete t[i])
                        }),
                        O.css(e),
                        "width" in e && S()
                    }
                    return B.call(D, t)
                  },
                  getBBox: function () {
                    return {
                      width: p.width + 2 * _,
                      height: p.height + 2 * _,
                      x: p.x - _,
                      y: p.y - _
                    }
                  },
                  shadow: function (t) {
                    return t && (S(),
                        u && u.shadow(t)),
                      D
                  },
                  destroy: function () {
                    P(D.element, "mouseenter"),
                      P(D.element, "mouseleave"),
                      O && (O = O.destroy()),
                      u && (u = u.destroy()),
                      e.prototype.destroy.call(D),
                      D = E = S = C = M = null
                  }
                })
              }
            }),
            t.Renderer = i
        }(h),
        function (t) {
          var e = t.attr,
            i = t.createElement,
            n = t.css,
            o = t.defined,
            s = t.each,
            r = t.extend,
            a = t.isFirefox,
            l = t.isMS,
            h = t.isWebKit,
            c = t.pick,
            d = t.pInt,
            u = t.SVGRenderer,
            p = t.win,
            f = t.wrap;
          r(t.SVGElement.prototype, {
              htmlCss: function (t) {
                var e = this.element;
                return (e = t && "SPAN" === e.tagName && t.width) && (delete t.width,
                    this.textWidth = e,
                    this.htmlUpdateTransform()),
                  t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap",
                    t.overflow = "hidden"),
                  this.styles = r(this.styles, t),
                  n(this.element, t),
                  this
              },
              htmlGetBBox: function () {
                var t = this.element;
                return {
                  x: t.offsetLeft,
                  y: t.offsetTop,
                  width: t.offsetWidth,
                  height: t.offsetHeight
                }
              },
              htmlUpdateTransform: function () {
                if (this.added) {
                  var t = this.renderer,
                    e = this.element,
                    i = this.translateX || 0,
                    r = this.translateY || 0,
                    a = this.x || 0,
                    l = this.y || 0,
                    h = this.textAlign || "left",
                    c = {
                      left: 0,
                      center: .5,
                      right: 1
                    } [h],
                    u = (f = this.styles) && f.whiteSpace;
                  if (n(e, {
                      marginLeft: i,
                      marginTop: r
                    }),
                    this.shadows && s(this.shadows, function (t) {
                      n(t, {
                        marginLeft: i + 1,
                        marginTop: r + 1
                      })
                    }),
                    this.inverted && s(e.childNodes, function (i) {
                      t.invertChild(i, e)
                    }),
                    "SPAN" === e.tagName) {
                    var p, f = this.rotation,
                      g = this.textWidth && d(this.textWidth),
                      m = [f, h, e.innerHTML, this.textWidth, this.textAlign].join();
                    (p = g !== this.oldTextWidth) && !(p = g > this.oldTextWidth) && ((p = this.textPxLength) || (n(e, {
                          width: "",
                          whiteSpace: u || "nowrap"
                        }),
                        p = e.offsetWidth),
                      p = p > g),
                    p && /[ \-]/.test(e.textContent || e.innerText) && (n(e, {
                          width: g + "px",
                          display: "block",
                          whiteSpace: u || "normal"
                        }),
                        this.oldTextWidth = g),
                      m !== this.cTT && (u = t.fontMetrics(e.style.fontSize).b,
                        o(f) && f !== (this.oldRotation || 0) && this.setSpanRotation(f, c, u),
                        this.getSpanCorrection(!o(f) && this.textPxLength || e.offsetWidth, u, c, f, h)),
                      n(e, {
                        left: a + (this.xCorr || 0) + "px",
                        top: l + (this.yCorr || 0) + "px"
                      }),
                      this.cTT = m,
                      this.oldRotation = f
                  }
                } else
                  this.alignOnAdd = !0
              },
              setSpanRotation: function (t, e, i) {
                var o = {},
                  s = this.renderer.getTransformKey();
                o[s] = o.transform = "rotate(" + t + "deg)",
                  o[s + (a ? "Origin" : "-origin")] = o.transformOrigin = 100 * e + "% " + i + "px",
                  n(this.element, o)
              },
              getSpanCorrection: function (t, e, i) {
                this.xCorr = -t * i,
                  this.yCorr = -e
              }
            }),
            r(u.prototype, {
              getTransformKey: function () {
                return l && !/Edge/.test(p.navigator.userAgent) ? "-ms-transform" : h ? "-webkit-transform" : a ? "MozTransform" : p.opera ? "-o-transform" : ""
              },
              html: function (t, n, o) {
                var a = this.createElement("span"),
                  l = a.element,
                  h = a.renderer,
                  d = h.isSVG,
                  u = function (t, e) {
                    s(["opacity", "visibility"], function (i) {
                        f(t, i + "Setter", function (t, i, n, o) {
                          t.call(this, i, n, o),
                            e[n] = i
                        })
                      }),
                      t.addedSetters = !0
                  };
                return a.textSetter = function (t) {
                    t !== l.innerHTML && delete this.bBox,
                      this.textStr = t,
                      l.innerHTML = c(t, ""),
                      a.doTransform = !0
                  },
                  d && u(a, a.element.style),
                  a.xSetter = a.ySetter = a.alignSetter = a.rotationSetter = function (t, e) {
                    "align" === e && (e = "textAlign"),
                      a[e] = t,
                      a.doTransform = !0
                  },
                  a.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(),
                      this.doTransform = !1)
                  },
                  a.attr({
                    text: t,
                    x: Math.round(n),
                    y: Math.round(o)
                  }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                  }),
                  l.style.whiteSpace = "nowrap",
                  a.css = a.htmlCss,
                  d && (a.add = function (t) {
                    var n, o = h.box.parentNode,
                      c = [];
                    if (this.parentGroup = t) {
                      if (!(n = t.div)) {
                        for (; t;)
                          c.push(t),
                          t = t.parentGroup;
                        s(c.reverse(), function (t) {
                          function s(e, i) {
                            t[i] = e,
                              "translateX" === i ? l.left = e + "px" : l.top = e + "px",
                              t.doTransform = !0
                          }
                          var l, h = e(t.element, "class");
                          h && (h = {
                              className: h
                            }),
                            n = t.div = t.div || i("div", h, {
                              position: "absolute",
                              left: (t.translateX || 0) + "px",
                              top: (t.translateY || 0) + "px",
                              display: t.display,
                              opacity: t.opacity,
                              pointerEvents: t.styles && t.styles.pointerEvents
                            }, n || o),
                            l = n.style,
                            r(t, {
                              classSetter: function (t) {
                                return function (e) {
                                  this.element.setAttribute("class", e),
                                    t.className = e
                                }
                              }(n),
                              on: function () {
                                return c[0].div && a.on.apply({
                                    element: c[0].div
                                  }, arguments),
                                  t
                              },
                              translateXSetter: s,
                              translateYSetter: s
                            }),
                            t.addedSetters || u(t, l)
                        })
                      }
                    } else
                      n = o;
                    return n.appendChild(l),
                      a.added = !0,
                      a.alignOnAdd && a.htmlUpdateTransform(),
                      a
                  }),
                  a
              }
            })
        }(h),
        function (t) {
          var e = t.defined,
            i = t.each,
            n = t.extend,
            o = t.merge,
            s = t.pick,
            r = t.timeUnits,
            a = t.win;
          t.Time = function (t) {
              this.update(t, !1)
            },
            t.Time.prototype = {
              defaultOptions: {},
              update: function (e) {
                var i = s(e && e.useUTC, !0),
                  n = this;
                this.options = e = o(!0, this.options || {}, e),
                  this.Date = e.Date || a.Date,
                  this.timezoneOffset = (this.useUTC = i) && e.timezoneOffset,
                  this.getTimezoneOffset = this.timezoneOffsetFunction(),
                  (this.variableTimezone = !(i && !e.getTimezoneOffset && !e.timezone)) || this.timezoneOffset ? (this.get = function (t, e) {
                      var i = e.getTime(),
                        o = i - n.getTimezoneOffset(e);
                      return e.setTime(o),
                        t = e["getUTC" + t](),
                        e.setTime(i),
                        t
                    },
                    this.set = function (e, i, o) {
                      var s; -
                      1 !== t.inArray(e, ["Milliseconds", "Seconds", "Minutes"]) ? i["set" + e](o) : (s = n.getTimezoneOffset(i),
                        s = i.getTime() - s,
                        i.setTime(s),
                        i["setUTC" + e](o),
                        e = n.getTimezoneOffset(i),
                        s = i.getTime() + e,
                        i.setTime(s))
                    }
                  ) : i ? (this.get = function (t, e) {
                      return e["getUTC" + t]()
                    },
                    this.set = function (t, e, i) {
                      return e["setUTC" + t](i)
                    }
                  ) : (this.get = function (t, e) {
                      return e["get" + t]()
                    },
                    this.set = function (t, e, i) {
                      return e["set" + t](i)
                    }
                  )
              },
              makeTime: function (e, i, n, o, r, a) {
                var l, h, c;
                return this.useUTC ? (l = this.Date.UTC.apply(0, arguments),
                    l += h = this.getTimezoneOffset(l),
                    h !== (c = this.getTimezoneOffset(l)) ? l += c - h : h - 36e5 !== this.getTimezoneOffset(l - 36e5) || t.isSafari || (l -= 36e5)) : l = new this.Date(e, i, s(n, 1), s(o, 0), s(r, 0), s(a, 0)).getTime(),
                  l
              },
              timezoneOffsetFunction: function () {
                var e = this,
                  i = this.options,
                  n = a.moment;
                if (!this.useUTC)
                  return function (t) {
                    return 6e4 * new Date(t).getTimezoneOffset()
                  };
                if (i.timezone) {
                  if (n)
                    return function (t) {
                      return 6e4 * -n.tz(t, i.timezone).utcOffset()
                    };
                  t.error(25)
                }
                return this.useUTC && i.getTimezoneOffset ? function (t) {
                    return 6e4 * i.getTimezoneOffset(t)
                  } :
                  function () {
                    return 6e4 * (e.timezoneOffset || 0)
                  }
              },
              dateFormat: function (e, i, n) {
                if (!t.defined(i) || isNaN(i))
                  return t.defaultOptions.lang.invalidDate || "";
                e = t.pick(e, "%Y-%m-%d %H:%M:%S");
                var o = this,
                  s = new this.Date(i),
                  r = this.get("Hours", s),
                  a = this.get("Day", s),
                  l = this.get("Date", s),
                  h = this.get("Month", s),
                  c = this.get("FullYear", s),
                  d = t.defaultOptions.lang,
                  u = d.weekdays,
                  p = d.shortWeekdays,
                  f = t.pad;
                s = t.extend({
                  a: p ? p[a] : u[a].substr(0, 3),
                  A: u[a],
                  d: f(l),
                  e: f(l, 2, " "),
                  w: a,
                  b: d.shortMonths[h],
                  B: d.months[h],
                  m: f(h + 1),
                  y: c.toString().substr(2, 2),
                  Y: c,
                  H: f(r),
                  k: r,
                  I: f(r % 12 || 12),
                  l: r % 12 || 12,
                  M: f(o.get("Minutes", s)),
                  p: 12 > r ? "AM" : "PM",
                  P: 12 > r ? "am" : "pm",
                  S: f(s.getSeconds()),
                  L: f(Math.round(i % 1e3), 3)
                }, t.dateFormats);
                return t.objectEach(s, function (t, n) {
                    for (; - 1 !== e.indexOf("%" + n);)
                      e = e.replace("%" + n, "function" == typeof t ? t.call(o, i) : t)
                  }),
                  n ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
              },
              getTimeTicks: function (t, o, a, l) {
                var h, c, d = this,
                  u = [],
                  p = {},
                  f = new d.Date(o),
                  g = t.unitRange,
                  m = t.count || 1;
                if (e(o)) {
                  d.set("Milliseconds", f, g >= r.second ? 0 : m * Math.floor(d.get("Milliseconds", f) / m)),
                    g >= r.second && d.set("Seconds", f, g >= r.minute ? 0 : m * Math.floor(d.get("Seconds", f) / m)),
                    g >= r.minute && d.set("Minutes", f, g >= r.hour ? 0 : m * Math.floor(d.get("Minutes", f) / m)),
                    g >= r.hour && d.set("Hours", f, g >= r.day ? 0 : m * Math.floor(d.get("Hours", f) / m)),
                    g >= r.day && d.set("Date", f, g >= r.month ? 1 : m * Math.floor(d.get("Date", f) / m)),
                    g >= r.month && (d.set("Month", f, g >= r.year ? 0 : m * Math.floor(d.get("Month", f) / m)),
                      h = d.get("FullYear", f)),
                    g >= r.year && d.set("FullYear", f, h - h % m),
                    g === r.week && d.set("Date", f, d.get("Date", f) - d.get("Day", f) + s(l, 1)),
                    h = d.get("FullYear", f),
                    l = d.get("Month", f);
                  var v = d.get("Date", f),
                    y = d.get("Hours", f);
                  for (o = f.getTime(),
                    d.variableTimezone && (c = a - o > 4 * r.month || d.getTimezoneOffset(o) !== d.getTimezoneOffset(a)),
                    f = f.getTime(),
                    o = 1; f < a;)
                    u.push(f),
                    f = g === r.year ? d.makeTime(h + o * m, 0) : g === r.month ? d.makeTime(h, l + o * m) : !c || g !== r.day && g !== r.week ? c && g === r.hour && 1 < m ? d.makeTime(h, l, v, y + o * m) : f + g * m : d.makeTime(h, l, v + o * m * (g === r.day ? 1 : 7)),
                    o++;
                  u.push(f),
                    g <= r.hour && 1e4 > u.length && i(u, function (t) {
                      0 == t % 18e5 && "000000000" === d.dateFormat("%H%M%S%L", t) && (p[t] = "day")
                    })
                }
                return u.info = n(t, {
                    higherRanks: p,
                    totalRange: g * m
                  }),
                  u
              }
            }
        }(h),
        function (t) {
          var e = t.color,
            i = t.merge;
          t.defaultOptions = {
              colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
              symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
              lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
              },
              global: {},
              time: t.Time.prototype.defaultOptions,
              chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                  theme: {
                    zIndex: 6
                  },
                  position: {
                    align: "right",
                    x: -10,
                    y: 10
                  }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
              },
              title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
              },
              subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
              },
              plotOptions: {},
              labels: {
                style: {
                  position: "absolute",
                  color: "#333333"
                }
              },
              legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                  return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                  activeColor: "#003399",
                  inactiveColor: "#cccccc"
                },
                itemStyle: {
                  color: "#333333",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                  color: "#000000"
                },
                itemHiddenStyle: {
                  color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                  position: "absolute",
                  width: "13px",
                  height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                  style: {
                    fontWeight: "bold"
                  }
                }
              },
              loading: {
                labelStyle: {
                  fontWeight: "bold",
                  position: "relative",
                  top: "45%"
                },
                style: {
                  position: "absolute",
                  backgroundColor: "#ffffff",
                  opacity: .5,
                  textAlign: "center"
                }
              },
              tooltip: {
                enabled: !0,
                animation: t.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                  millisecond: "%A, %b %e, %H:%M:%S.%L",
                  second: "%A, %b %e, %H:%M:%S",
                  minute: "%A, %b %e, %H:%M",
                  hour: "%A, %b %e, %H:%M",
                  day: "%A, %b %e, %Y",
                  week: "Week from %A, %b %e, %Y",
                  month: "%B %Y",
                  year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: t.isTouchDevice ? 25 : 10,
                backgroundColor: e("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                  color: "#333333",
                  cursor: "default",
                  fontSize: "12px",
                  pointerEvents: "none",
                  whiteSpace: "nowrap"
                }
              },
              credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                  align: "right",
                  x: -10,
                  verticalAlign: "bottom",
                  y: -5
                },
                style: {
                  cursor: "pointer",
                  color: "#999999",
                  fontSize: "9px"
                },
                text: "Highcharts.com"
              }
            },
            t.setOptions = function (e) {
              return t.defaultOptions = i(!0, t.defaultOptions, e),
                t.time.update(i(t.defaultOptions.global, t.defaultOptions.time), !1),
                t.defaultOptions
            },
            t.getOptions = function () {
              return t.defaultOptions
            },
            t.defaultPlotOptions = t.defaultOptions.plotOptions,
            t.time = new t.Time(i(t.defaultOptions.global, t.defaultOptions.time)),
            t.dateFormat = function (e, i, n) {
              return t.time.dateFormat(e, i, n)
            }
        }(h),
        function (t) {
          var e = t.correctFloat,
            i = t.defined,
            n = t.destroyObjectProperties,
            o = t.fireEvent,
            s = t.isNumber,
            r = t.merge,
            a = t.pick,
            l = t.deg2rad;
          t.Tick = function (t, e, i, n) {
              this.axis = t,
                this.pos = e,
                this.type = i || "",
                this.isNewLabel = this.isNew = !0,
                i || n || this.addLabel()
            },
            t.Tick.prototype = {
              addLabel: function () {
                var t, n = this.axis,
                  o = n.options,
                  s = n.chart,
                  l = n.categories,
                  h = n.names,
                  c = this.pos,
                  d = o.labels,
                  u = c === (f = n.tickPositions)[0],
                  p = c === f[f.length - 1],
                  f = (h = l ? a(l[c], h[c], c) : c,
                    l = this.label,
                    f.info);
                n.isDatetimeAxis && f && (t = o.dateTimeLabelFormats[f.higherRanks[c] || f.unitName]),
                  this.isFirst = u,
                  this.isLast = p,
                  o = n.labelFormatter.call({
                    axis: n,
                    chart: s,
                    isFirst: u,
                    isLast: p,
                    dateTimeLabelFormat: t,
                    value: n.isLog ? e(n.lin2log(h)) : h,
                    pos: c
                  }),
                  i(l) ? l && l.attr({
                    text: o
                  }) : ((this.label = l = i(o) && d.enabled ? s.renderer.text(o, 0, 0, d.useHTML).css(r(d.style)).add(n.labelGroup) : null) && (l.textPxLength = l.getBBox().width),
                    this.rotation = 0)
              },
              getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
              },
              handleOverflow: function (t) {
                var e, i = this.axis,
                  n = i.options.labels,
                  o = t.x,
                  s = i.chart.chartWidth,
                  r = i.chart.spacing,
                  h = a(i.labelLeft, Math.min(i.pos, r[3])),
                  c = (r = a(i.labelRight, Math.max(i.isRadial ? 0 : i.pos + i.len, s - r[1])),
                    this.label),
                  d = this.rotation,
                  u = {
                    left: 0,
                    center: .5,
                    right: 1
                  } [i.labelAlign || c.attr("align")],
                  p = c.getBBox().width,
                  f = i.getSlotWidth(),
                  g = f,
                  m = 1,
                  v = {};
                d || !1 === n.overflow ? 0 > d && o - u * p < h ? e = Math.round(o / Math.cos(d * l) - h) : 0 < d && o + u * p > r && (e = Math.round((s - o) / Math.cos(d * l))) : (s = o + (1 - u) * p,
                    o - u * p < h ? g = t.x + g * (1 - u) - h : s > r && (g = r - t.x + g * u,
                      m = -1),
                    (g = Math.min(f, g)) < f && "center" === i.labelAlign && (t.x += m * (f - g - u * (f - Math.min(p, g)))),
                    (p > g || i.autoRotation && (c.styles || {}).width) && (e = g)),
                  e && (v.width = e,
                    (n.style || {}).textOverflow || (v.textOverflow = "ellipsis"),
                    c.css(v))
              },
              getPosition: function (e, i, n, s) {
                var r = this.axis,
                  a = r.chart,
                  l = s && a.oldChartHeight || a.chartHeight;
                return e = {
                    x: e ? t.correctFloat(r.translate(i + n, null, null, s) + r.transB) : r.left + r.offset + (r.opposite ? (s && a.oldChartWidth || a.chartWidth) - r.right - r.left : 0),
                    y: e ? l - r.bottom + r.offset - (r.opposite ? r.height : 0) : t.correctFloat(l - r.translate(i + n, null, null, s) - r.transB)
                  },
                  o(this, "afterGetPosition", {
                    pos: e
                  }),
                  e
              },
              getLabelPosition: function (t, e, n, s, r, a, h, c) {
                var d = this.axis,
                  u = d.transA,
                  p = d.reversed,
                  f = d.staggerLines,
                  g = d.tickRotCorr || {
                    x: 0,
                    y: 0
                  },
                  m = r.y,
                  v = s || d.reserveSpaceDefault ? 0 : -d.labelOffset * ("center" === d.labelAlign ? .5 : 1),
                  y = {};
                return i(m) || (m = 0 === d.side ? n.rotation ? -8 : -n.getBBox().height : 2 === d.side ? g.y + 8 : Math.cos(n.rotation * l) * (g.y - n.getBBox(!1, 0).height / 2)),
                  t = t + r.x + v + g.x - (a && s ? a * u * (p ? -1 : 1) : 0),
                  e = e + m - (a && !s ? a * u * (p ? 1 : -1) : 0),
                  f && (n = h / (c || 1) % f,
                    d.opposite && (n = f - n - 1),
                    e += d.labelOffset / f * n),
                  y.x = t,
                  y.y = Math.round(e),
                  o(this, "afterGetLabelPosition", {
                    pos: y
                  }),
                  y
              },
              getMarkPath: function (t, e, i, n, o, s) {
                return s.crispLine(["M", t, e, "L", t + (o ? 0 : -i), e + (o ? i : 0)], n)
              },
              renderGridLine: function (t, e, i) {
                var n = this.axis,
                  o = n.options,
                  s = this.gridLine,
                  r = {},
                  a = this.pos,
                  l = this.type,
                  h = n.tickmarkOffset,
                  c = n.chart.renderer,
                  d = l ? l + "Grid" : "grid",
                  u = o[d + "LineWidth"],
                  p = o[d + "LineColor"];
                o = o[d + "LineDashStyle"];
                s || (r.stroke = p,
                    r["stroke-width"] = u,
                    o && (r.dashstyle = o),
                    l || (r.zIndex = 1),
                    t && (r.opacity = 0),
                    this.gridLine = s = c.path().attr(r).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(n.gridGroup)),
                  !t && s && (t = n.getPlotLinePath(a + h, s.strokeWidth() * i, t, !0)) && s[this.isNew ? "attr" : "animate"]({
                    d: t,
                    opacity: e
                  })
              },
              renderMark: function (t, e, i) {
                var n = this.axis,
                  o = n.options,
                  s = n.chart.renderer,
                  r = this.type,
                  l = r ? r + "Tick" : "tick",
                  h = n.tickSize(l),
                  c = this.mark,
                  d = !c,
                  u = t.x;
                t = t.y;
                var p = a(o[l + "Width"], !r && n.isXAxis ? 1 : 0);
                o = o[l + "Color"];
                h && (n.opposite && (h[0] = -h[0]),
                  d && (this.mark = c = s.path().addClass("highcharts-" + (r ? r + "-" : "") + "tick").add(n.axisGroup),
                    c.attr({
                      stroke: o,
                      "stroke-width": p
                    })),
                  c[d ? "attr" : "animate"]({
                    d: this.getMarkPath(u, t, h[0], c.strokeWidth() * i, n.horiz, s),
                    opacity: e
                  }))
              },
              renderLabel: function (t, e, i, n) {
                var o = (d = this.axis).horiz,
                  r = d.options,
                  l = this.label,
                  h = r.labels,
                  c = h.step,
                  d = d.tickmarkOffset,
                  u = !0,
                  p = t.x;
                t = t.y,
                  l && s(p) && (l.xy = t = this.getLabelPosition(p, t, l, o, h, d, n, c),
                    this.isFirst && !this.isLast && !a(r.showFirstLabel, 1) || this.isLast && !this.isFirst && !a(r.showLastLabel, 1) ? u = !1 : !o || h.step || h.rotation || e || 0 === i || this.handleOverflow(t),
                    c && n % c && (u = !1),
                    u && s(t.y) ? (t.opacity = i,
                      l[this.isNewLabel ? "attr" : "animate"](t),
                      this.isNewLabel = !1) : (l.attr("y", -9999),
                      this.isNewLabel = !0))
              },
              render: function (e, i, n) {
                var o = (h = this.axis).horiz,
                  s = this.getPosition(o, this.pos, h.tickmarkOffset, i),
                  r = s.x,
                  l = s.y,
                  h = o && r === h.pos + h.len || !o && l === h.pos ? -1 : 1;
                n = a(n, 1),
                  this.isActive = !0,
                  this.renderGridLine(i, n, h),
                  this.renderMark(s, n, h),
                  this.renderLabel(s, i, n, e),
                  this.isNew = !1,
                  t.fireEvent(this, "afterRender")
              },
              destroy: function () {
                n(this, this.axis)
              }
            }
        }(h);
        var c = function (t) {
          var e = t.addEvent,
            i = t.animObject,
            n = t.arrayMax,
            o = t.arrayMin,
            s = t.color,
            r = t.correctFloat,
            a = t.defaultOptions,
            l = t.defined,
            h = t.deg2rad,
            c = t.destroyObjectProperties,
            d = t.each,
            u = t.extend,
            p = t.fireEvent,
            f = t.format,
            g = t.getMagnitude,
            m = t.grep,
            v = t.inArray,
            y = t.isArray,
            x = t.isNumber,
            b = t.isString,
            w = t.merge,
            k = t.normalizeTickInterval,
            T = t.objectEach,
            S = t.pick,
            C = t.removeEvent,
            A = t.splat,
            M = t.syncTimeout,
            E = t.Tick,
            D = function () {
              this.init.apply(this, arguments)
            };
          return t.extend(D.prototype, {
              defaultOptions: {
                dateTimeLabelFormats: {
                  millisecond: "%H:%M:%S.%L",
                  second: "%H:%M:%S",
                  minute: "%H:%M",
                  hour: "%H:%M",
                  day: "%e. %b",
                  week: "%e. %b",
                  month: "%b '%y",
                  year: "%Y"
                },
                endOnTick: !1,
                labels: {
                  enabled: !0,
                  style: {
                    color: "#666666",
                    cursor: "default",
                    fontSize: "11px"
                  },
                  x: 0
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                  align: "middle",
                  style: {
                    color: "#666666"
                  }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
              },
              defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                  x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                  rotation: 270,
                  text: "Values"
                },
                stackLabels: {
                  allowOverlap: !1,
                  enabled: !1,
                  formatter: function () {
                    return t.numberFormat(this.total, -1)
                  },
                  style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#000000",
                    textOutline: "1px contrast"
                  }
                },
                gridLineWidth: 1,
                lineWidth: 0
              },
              defaultLeftAxisOptions: {
                labels: {
                  x: -15
                },
                title: {
                  rotation: 270
                }
              },
              defaultRightAxisOptions: {
                labels: {
                  x: 15
                },
                title: {
                  rotation: 90
                }
              },
              defaultBottomAxisOptions: {
                labels: {
                  autoRotation: [-45],
                  x: 0
                },
                title: {
                  rotation: 0
                }
              },
              defaultTopAxisOptions: {
                labels: {
                  autoRotation: [-45],
                  x: 0
                },
                title: {
                  rotation: 0
                }
              },
              init: function (t, i) {
                var n = i.isX,
                  o = this;
                o.chart = t,
                  o.horiz = t.inverted && !o.isZAxis ? !n : n,
                  o.isXAxis = n,
                  o.coll = o.coll || (n ? "xAxis" : "yAxis"),
                  p(this, "init", {
                    userOptions: i
                  }),
                  o.opposite = i.opposite,
                  o.side = i.side || (o.horiz ? o.opposite ? 0 : 2 : o.opposite ? 1 : 3),
                  o.setOptions(i);
                var s = this.options,
                  r = s.type;
                o.labelFormatter = s.labels.formatter || o.defaultLabelFormatter,
                  o.userOptions = i,
                  o.minPixelPadding = 0,
                  o.reversed = s.reversed,
                  o.visible = !1 !== s.visible,
                  o.zoomEnabled = !1 !== s.zoomEnabled,
                  o.hasNames = "category" === r || !0 === s.categories,
                  o.categories = s.categories || o.hasNames,
                  o.names || (o.names = [],
                    o.names.keys = {}),
                  o.plotLinesAndBandsGroups = {},
                  o.isLog = "logarithmic" === r,
                  o.isDatetimeAxis = "datetime" === r,
                  o.positiveValuesOnly = o.isLog && !o.allowNegativeLog,
                  o.isLinked = l(s.linkedTo),
                  o.ticks = {},
                  o.labelEdge = [],
                  o.minorTicks = {},
                  o.plotLinesAndBands = [],
                  o.alternateBands = {},
                  o.len = 0,
                  o.minRange = o.userMinRange = s.minRange || s.maxZoom,
                  o.range = s.range,
                  o.offset = s.offset || 0,
                  o.stacks = {},
                  o.oldStacks = {},
                  o.stacksTouched = 0,
                  o.max = null,
                  o.min = null,
                  o.crosshair = S(s.crosshair, A(t.options.tooltip.crosshairs)[n ? 0 : 1], !1),
                  i = o.options.events,
                  -1 === v(o, t.axes) && (n ? t.axes.splice(t.xAxis.length, 0, o) : t.axes.push(o),
                    t[o.coll].push(o)),
                  o.series = o.series || [],
                  t.inverted && !o.isZAxis && n && void 0 === o.reversed && (o.reversed = !0),
                  T(i, function (t, i) {
                    e(o, i, t)
                  }),
                  o.lin2log = s.linearToLogConverter || o.lin2log,
                  o.isLog && (o.val2lin = o.log2lin,
                    o.lin2val = o.lin2log),
                  p(this, "afterInit")
              },
              setOptions: function (t) {
                this.options = w(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(a[this.coll], t)),
                  p(this, "afterSetOptions", {
                    userOptions: t
                  })
              },
              defaultLabelFormatter: function () {
                var e, i = this.axis,
                  n = this.value,
                  o = i.chart.time,
                  s = i.categories,
                  r = this.dateTimeLabelFormat,
                  l = (h = a.lang).numericSymbols,
                  h = h.numericSymbolMagnitude || 1e3,
                  c = l && l.length,
                  d = i.options.labels.format;
                i = i.isLog ? Math.abs(n) : i.tickInterval;
                if (d)
                  e = f(d, this, o);
                else if (s)
                  e = n;
                else if (r)
                  e = o.dateFormat(r, n);
                else if (c && 1e3 <= i)
                  for (; c-- && void 0 === e;)
                    i >= (o = Math.pow(h, c + 1)) && 0 == 10 * n % o && null !== l[c] && 0 !== n && (e = t.numberFormat(n / o, -1) + l[c]);
                return void 0 === e && (e = 1e4 <= Math.abs(n) ? t.numberFormat(n, -1) : t.numberFormat(n, -1, void 0, "")),
                  e
              },
              getSeriesExtremes: function () {
                var t = this,
                  e = t.chart;
                p(this, "getSeriesExtremes", null, function () {
                    t.hasVisibleSeries = !1,
                      t.dataMin = t.dataMax = t.threshold = null,
                      t.softThreshold = !t.isXAxis,
                      t.buildStacks && t.buildStacks(),
                      d(t.series, function (i) {
                        if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                          var s, r = i.options,
                            a = r.threshold;
                          t.hasVisibleSeries = !0,
                            t.positiveValuesOnly && 0 >= a && (a = null),
                            t.isXAxis ? (r = i.xData).length && (i = o(r),
                              s = n(r),
                              x(i) || i instanceof Date || (r = m(r, x),
                                i = o(r),
                                s = n(r)),
                              r.length && (t.dataMin = Math.min(S(t.dataMin, r[0], i), i),
                                t.dataMax = Math.max(S(t.dataMax, r[0], s), s))) : (i.getExtremes(),
                              s = i.dataMax,
                              i = i.dataMin,
                              l(i) && l(s) && (t.dataMin = Math.min(S(t.dataMin, i), i),
                                t.dataMax = Math.max(S(t.dataMax, s), s)),
                              l(a) && (t.threshold = a),
                              (!r.softThreshold || t.positiveValuesOnly) && (t.softThreshold = !1))
                        }
                      })
                  }),
                  p(this, "afterGetSeriesExtremes")
              },
              translate: function (t, e, i, n, o, s) {
                var r = this.linkedParent || this,
                  a = 1,
                  l = 0,
                  h = n ? r.oldTransA : r.transA;
                n = n ? r.oldMin : r.min;
                var c = r.minPixelPadding;
                return o = (r.isOrdinal || r.isBroken || r.isLog && o) && r.lin2val,
                  h || (h = r.transA),
                  i && (a *= -1,
                    l = r.len),
                  r.reversed && (l -= (a *= -1) * (r.sector || r.len)),
                  e ? (t = (t * a + l - c) / h + n,
                    o && (t = r.lin2val(t))) : (o && (t = r.val2lin(t)),
                    t = x(n) ? a * (t - n) * h + l + a * c + (x(s) ? h * s : 0) : void 0),
                  t
              },
              toPixels: function (t, e) {
                return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
              },
              toValue: function (t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
              },
              getPlotLinePath: function (t, e, i, n, o) {
                var s, r, a, l = this.chart,
                  h = this.left,
                  c = this.top,
                  d = i && l.oldChartHeight || l.chartHeight,
                  u = i && l.oldChartWidth || l.chartWidth;
                s = this.transB;
                var p = function (t, e, i) {
                  return (t < e || t > i) && (n ? t = Math.min(Math.max(e, t), i) : a = !0),
                    t
                };
                return o = S(o, this.translate(t, null, null, i)),
                  o = Math.min(Math.max(-1e5, o), 1e5),
                  t = i = Math.round(o + s),
                  s = r = Math.round(d - o - s),
                  x(o) ? this.horiz ? (s = c,
                    r = d - this.bottom,
                    t = i = p(t, h, h + this.width)) : (t = h,
                    i = u - this.right,
                    s = r = p(s, c, c + this.height)) : (a = !0,
                    n = !1),
                  a && !n ? null : l.renderer.crispLine(["M", t, s, "L", i, r], e || 1)
              },
              getLinearTickPositions: function (t, e, i) {
                var n, o = r(Math.floor(e / t) * t);
                i = r(Math.ceil(i / t) * t);
                var s, a = [];
                if (r(o + t) === o && (s = 20),
                  this.single)
                  return [e];
                for (e = o; e <= i && (a.push(e),
                    (e = r(e + t, s)) !== n);)
                  n = e;
                return a
              },
              getMinorTickInterval: function () {
                var t = this.options;
                return !0 === t.minorTicks ? S(t.minorTickInterval, "auto") : !1 === t.minorTicks ? null : t.minorTickInterval
              },
              getMinorTickPositions: function () {
                var t = this,
                  e = t.options,
                  i = t.tickPositions,
                  n = t.minorTickInterval,
                  o = [],
                  s = t.pointRangePadding || 0,
                  r = t.min - s,
                  a = (s = t.max + s) - r;
                if (a && a / n < t.len / 3)
                  if (t.isLog)
                    d(this.paddedTicks, function (e, i, s) {
                      i && o.push.apply(o, t.getLogTickPositions(n, s[i - 1], s[i], !0))
                    });
                  else if (t.isDatetimeAxis && "auto" === this.getMinorTickInterval())
                  o = o.concat(t.getTimeTicks(t.normalizeTimeTickInterval(n), r, s, e.startOfWeek));
                else
                  for (e = r + (i[0] - r) % n; e <= s && e !== o[0]; e += n)
                    o.push(e);
                return 0 !== o.length && t.trimTicks(o),
                  o
              },
              adjustForMinRange: function () {
                var t, e, i, s, r, a, h, c = this.options,
                  u = this.min,
                  p = this.max;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (l(c.min) || l(c.max) ? this.minRange = null : (d(this.series, function (t) {
                      for (a = t.xData,
                        s = t.xIncrement ? 1 : a.length - 1; 0 < s; s--)
                        r = a[s] - a[s - 1],
                        (void 0 === i || r < i) && (i = r)
                    }),
                    this.minRange = Math.min(5 * i, this.dataMax - this.dataMin))),
                  p - u < this.minRange && (e = this.dataMax - this.dataMin >= this.minRange,
                    t = [u - (t = ((h = this.minRange) - p + u) / 2), S(c.min, u - t)],
                    e && (t[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin),
                    p = [(u = n(t)) + h, S(c.max, u + h)],
                    e && (p[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
                    (p = o(p)) - u < h && (t[0] = p - h,
                      t[1] = S(c.min, p - h),
                      u = n(t))),
                  this.min = u,
                  this.max = p
              },
              getClosest: function () {
                var t;
                return this.categories ? t = 1 : d(this.series, function (e) {
                    var i = e.closestPointRange,
                      n = e.visible || !e.chart.options.chart.ignoreHiddenSeries;
                    !e.noSharedTooltip && l(i) && n && (t = l(t) ? Math.min(t, i) : i)
                  }),
                  t
              },
              nameToX: function (t) {
                var e, i = y(this.categories),
                  n = i ? this.categories : this.names,
                  o = t.options.x;
                return t.series.requireSorting = !1,
                  l(o) || (o = !1 === this.options.uniqueNames ? t.series.autoIncrement() : i ? v(t.name, n) : S(n.keys[t.name], -1)),
                  -1 === o ? i || (e = n.length) : e = o,
                  void 0 !== e && (this.names[e] = t.name,
                    this.names.keys[t.name] = e),
                  e
              },
              updateNames: function () {
                var e = this,
                  i = this.names;
                0 < i.length && (d(t.keys(i.keys), function (t) {
                    delete i.keys[t]
                  }),
                  i.length = 0,
                  this.minRange = this.userMinRange,
                  d(this.series || [], function (t) {
                    t.xIncrement = null,
                      t.points && !t.isDirtyData || (t.processData(),
                        t.generatePoints()),
                      d(t.points, function (i, n) {
                        var o;
                        i.options && (void 0 !== (o = e.nameToX(i)) && o !== i.x && (i.x = o,
                          t.xData[n] = o))
                      })
                  }))
              },
              setAxisTranslation: function (t) {
                var e, i = this,
                  n = i.max - i.min,
                  o = i.axisPointRange || 0,
                  s = 0,
                  r = 0,
                  a = i.linkedParent,
                  l = !!i.categories,
                  h = i.transA,
                  c = i.isXAxis;
                (c || l || o) && (e = i.getClosest(),
                  a ? (s = a.minPointOffset,
                    r = a.pointRangePadding) : d(i.series, function (t) {
                    var n = l ? 1 : c ? S(t.options.pointRange, e, 0) : i.axisPointRange || 0;
                    t = t.options.pointPlacement,
                      o = Math.max(o, n),
                      i.single || (s = Math.max(s, b(t) ? 0 : n / 2),
                        r = Math.max(r, "on" === t ? 0 : n))
                  }),
                  a = i.ordinalSlope && e ? i.ordinalSlope / e : 1,
                  i.minPointOffset = s *= a,
                  i.pointRangePadding = r *= a,
                  i.pointRange = Math.min(o, n),
                  c && (i.closestPointRange = e)),
                t && (i.oldTransA = h),
                  i.translationSlope = i.transA = h = i.options.staticScale || i.len / (n + r || 1),
                  i.transB = i.horiz ? i.left : i.bottom,
                  i.minPixelPadding = h * s,
                  p(this, "afterSetAxisTranslation")
              },
              minFromRange: function () {
                return this.max - this.range
              },
              setTickInterval: function (e) {
                var i, n, o, s, a = this,
                  h = a.chart,
                  c = a.options,
                  u = a.isLog,
                  f = a.isDatetimeAxis,
                  m = a.isXAxis,
                  v = a.isLinked,
                  y = c.maxPadding,
                  b = c.minPadding,
                  w = c.tickInterval,
                  T = c.tickPixelInterval,
                  C = a.categories,
                  A = x(a.threshold) ? a.threshold : null,
                  M = a.softThreshold;
                f || C || v || this.getTickAmount(),
                  o = S(a.userMin, c.min),
                  s = S(a.userMax, c.max),
                  v ? (a.linkedParent = h[a.coll][c.linkedTo],
                    h = a.linkedParent.getExtremes(),
                    a.min = S(h.min, h.dataMin),
                    a.max = S(h.max, h.dataMax),
                    c.type !== a.linkedParent.options.type && t.error(11, 1)) : (!M && l(A) && (a.dataMin >= A ? (i = A,
                      b = 0) : a.dataMax <= A && (n = A,
                      y = 0)),
                    a.min = S(o, i, a.dataMin),
                    a.max = S(s, n, a.dataMax)),
                  u && (a.positiveValuesOnly && !e && 0 >= Math.min(a.min, S(a.dataMin, a.min)) && t.error(10, 1),
                    a.min = r(a.log2lin(a.min), 15),
                    a.max = r(a.log2lin(a.max), 15)),
                  a.range && l(a.max) && (a.userMin = a.min = o = Math.max(a.dataMin, a.minFromRange()),
                    a.userMax = s = a.max,
                    a.range = null),
                  p(a, "foundExtremes"),
                  a.beforePadding && a.beforePadding(),
                  a.adjustForMinRange(),
                  !(C || a.axisPointRange || a.usePercentage || v) && l(a.min) && l(a.max) && (h = a.max - a.min) && (!l(o) && b && (a.min -= h * b),
                    !l(s) && y && (a.max += h * y)),
                  x(c.softMin) && !x(a.userMin) && (a.min = Math.min(a.min, c.softMin)),
                  x(c.softMax) && !x(a.userMax) && (a.max = Math.max(a.max, c.softMax)),
                  x(c.floor) && (a.min = Math.max(a.min, c.floor)),
                  x(c.ceiling) && (a.max = Math.min(a.max, c.ceiling)),
                  M && l(a.dataMin) && (A = A || 0,
                    !l(o) && a.min < A && a.dataMin >= A ? a.min = A : !l(s) && a.max > A && a.dataMax <= A && (a.max = A)),
                  a.tickInterval = a.min === a.max || void 0 === a.min || void 0 === a.max ? 1 : v && !w && T === a.linkedParent.options.tickPixelInterval ? w = a.linkedParent.tickInterval : S(w, this.tickAmount ? (a.max - a.min) / Math.max(this.tickAmount - 1, 1) : void 0, C ? 1 : (a.max - a.min) * T / Math.max(a.len, T)),
                  m && !e && d(a.series, function (t) {
                    t.processData(a.min !== a.oldMin || a.max !== a.oldMax)
                  }),
                  a.setAxisTranslation(!0),
                  a.beforeSetTickPositions && a.beforeSetTickPositions(),
                  a.postProcessTickInterval && (a.tickInterval = a.postProcessTickInterval(a.tickInterval)),
                  a.pointRange && !w && (a.tickInterval = Math.max(a.pointRange, a.tickInterval)),
                  e = S(c.minTickInterval, a.isDatetimeAxis && a.closestPointRange),
                  !w && a.tickInterval < e && (a.tickInterval = e),
                  f || u || w || (a.tickInterval = k(a.tickInterval, null, g(a.tickInterval), S(c.allowDecimals, !(.5 < a.tickInterval && 5 > a.tickInterval && 1e3 < a.max && 9999 > a.max)), !!this.tickAmount)),
                  this.tickAmount || (a.tickInterval = a.unsquish()),
                  this.setTickPositions()
              },
              setTickPositions: function () {
                var t, e = this.options,
                  i = e.tickPositions;
                t = this.getMinorTickInterval();
                var n = e.tickPositioner,
                  o = e.startOnTick,
                  s = e.endOnTick;
                this.tickmarkOffset = this.categories && "between" === e.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0,
                  this.minorTickInterval = "auto" === t && this.tickInterval ? this.tickInterval / 5 : t,
                  this.single = this.min === this.max && l(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== e.allowDecimals),
                  this.tickPositions = t = i && i.slice(),
                  !t && ((t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, e.units), this.min, this.max, e.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max)).length > this.len && ((t = [t[0], t.pop()])[0] === t[1] && (t.length = 1)),
                    this.tickPositions = t,
                    n && (n = n.apply(this, [this.min, this.max]))) && (this.tickPositions = t = n),
                  this.paddedTicks = t.slice(0),
                  this.trimTicks(t, o, s),
                  this.isLinked || (this.single && 2 > t.length && (this.min -= .5,
                      this.max += .5),
                    i || n || this.adjustTickAmount()),
                  p(this, "afterSetTickPositions")
              },
              trimTicks: function (t, e, i) {
                var n = t[0],
                  o = t[t.length - 1],
                  s = this.minPointOffset || 0;
                if (!this.isLinked) {
                  if (e && -1 / 0 !== n)
                    this.min = n;
                  else
                    for (; this.min - s > t[0];)
                      t.shift();
                  if (i)
                    this.max = o;
                  else
                    for (; this.max + s < t[t.length - 1];)
                      t.pop();
                  0 === t.length && l(n) && !this.options.tickPositions && t.push((o + n) / 2)
                }
              },
              alignToOthers: function () {
                var t, e = {},
                  i = this.options;
                return !1 === this.chart.options.chart.alignTicks || !1 === i.alignTicks || !1 === i.startOnTick || !1 === i.endOnTick || this.isLog || d(this.chart[this.coll], function (i) {
                    var n = i.options;
                    n = [i.horiz ? n.left : n.top, n.width, n.height, n.pane].join();
                    i.series.length && (e[n] ? t = !0 : e[n] = 1)
                  }),
                  t
              },
              getTickAmount: function () {
                var t = this.options,
                  e = t.tickAmount,
                  i = t.tickPixelInterval;
                !l(t.tickInterval) && this.len < i && !this.isRadial && !this.isLog && t.startOnTick && t.endOnTick && (e = 2),
                  !e && this.alignToOthers() && (e = Math.ceil(this.len / i) + 1),
                  4 > e && (this.finalTickAmt = e,
                    e = 5),
                  this.tickAmount = e
              },
              adjustTickAmount: function () {
                var t = this.tickInterval,
                  e = this.tickPositions,
                  i = this.tickAmount,
                  n = this.finalTickAmt,
                  o = e && e.length,
                  s = S(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                  if (o < i) {
                    for (; e.length < i;)
                      e.length % 2 || this.min === s ? e.push(r(e[e.length - 1] + t)) : e.unshift(r(e[0] - t));
                    this.transA *= (o - 1) / (i - 1),
                      this.min = e[0],
                      this.max = e[e.length - 1]
                  } else
                    o > i && (this.tickInterval *= 2,
                      this.setTickPositions());
                  if (l(n)) {
                    for (t = i = e.length; t--;)
                      (3 === n && 1 == t % 2 || 2 >= n && 0 < t && t < i - 1) && e.splice(t, 1);
                    this.finalTickAmt = void 0
                  }
                }
              },
              setScale: function () {
                var t, e;
                this.oldMin = this.min,
                  this.oldMax = this.max,
                  this.oldAxisLength = this.len,
                  this.setAxisSize(),
                  e = this.len !== this.oldAxisLength,
                  d(this.series, function (e) {
                    (e.isDirtyData || e.isDirty || e.xAxis.isDirty) && (t = !0)
                  }),
                  e || t || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(),
                    this.forceRedraw = !1,
                    this.getSeriesExtremes(),
                    this.setTickInterval(),
                    this.oldUserMin = this.userMin,
                    this.oldUserMax = this.userMax,
                    this.isDirty || (this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(),
                  p(this, "afterSetScale")
              },
              setExtremes: function (t, e, i, n, o) {
                var s = this,
                  r = s.chart;
                i = S(i, !0),
                  d(s.series, function (t) {
                    delete t.kdTree
                  }),
                  o = u(o, {
                    min: t,
                    max: e
                  }),
                  p(s, "setExtremes", o, function () {
                    s.userMin = t,
                      s.userMax = e,
                      s.eventArgs = o,
                      i && r.redraw(n)
                  })
              },
              zoom: function (t, e) {
                var i = this.dataMin,
                  n = this.dataMax,
                  o = this.options,
                  s = Math.min(i, S(o.min, i));
                o = Math.max(n, S(o.max, n));
                return t === this.min && e === this.max || (this.allowZoomOutside || (l(i) && (t < s && (t = s),
                        t > o && (t = o)),
                      l(n) && (e < s && (e = s),
                        e > o && (e = o))),
                    this.displayBtn = void 0 !== t || void 0 !== e,
                    this.setExtremes(t, e, !1, void 0, {
                      trigger: "zoom"
                    })),
                  !0
              },
              setAxisSize: function () {
                var e = this.chart,
                  i = (a = this.options).offsets || [0, 0, 0, 0],
                  n = this.horiz,
                  o = this.width = Math.round(t.relativeLength(S(a.width, e.plotWidth - i[3] + i[1]), e.plotWidth)),
                  s = this.height = Math.round(t.relativeLength(S(a.height, e.plotHeight - i[0] + i[2]), e.plotHeight)),
                  r = this.top = Math.round(t.relativeLength(S(a.top, e.plotTop + i[0]), e.plotHeight, e.plotTop)),
                  a = this.left = Math.round(t.relativeLength(S(a.left, e.plotLeft + i[3]), e.plotWidth, e.plotLeft));
                this.bottom = e.chartHeight - s - r,
                  this.right = e.chartWidth - o - a,
                  this.len = Math.max(n ? o : s, 0),
                  this.pos = n ? a : r
              },
              getExtremes: function () {
                var t = this.isLog;
                return {
                  min: t ? r(this.lin2log(this.min)) : this.min,
                  max: t ? r(this.lin2log(this.max)) : this.max,
                  dataMin: this.dataMin,
                  dataMax: this.dataMax,
                  userMin: this.userMin,
                  userMax: this.userMax
                }
              },
              getThreshold: function (t) {
                var e = (i = this.isLog) ? this.lin2log(this.min) : this.min,
                  i = i ? this.lin2log(this.max) : this.max;
                return null === t || -1 / 0 === t ? t = e : 1 / 0 === t ? t = i : e > t ? t = e : i < t && (t = i),
                  this.translate(t, 0, 1, 0, 1)
              },
              autoLabelAlign: function (t) {
                return 15 < (t = (S(t, 0) - 90 * this.side + 720) % 360) && 165 > t ? "right" : 195 < t && 345 > t ? "left" : "center"
              },
              tickSize: function (t) {
                var e = this.options,
                  i = e[t + "Length"],
                  n = S(e[t + "Width"], "tick" === t && this.isXAxis ? 1 : 0);
                if (n && i)
                  return "inside" === e[t + "Position"] && (i = -i),
                    [i, n]
              },
              labelMetrics: function () {
                var t = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[t] && this.ticks[t].label)
              },
              unsquish: function () {
                var t, e, i, n = this.options.labels,
                  o = this.horiz,
                  s = this.tickInterval,
                  a = s,
                  c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / s),
                  u = n.rotation,
                  p = this.labelMetrics(),
                  f = Number.MAX_VALUE,
                  g = function (t) {
                    return t = 1 < (t /= c || 1) ? Math.ceil(t) : 1,
                      r(t * s)
                  };
                return o ? (i = !n.staggerLines && !n.step && (l(u) ? [u] : c < S(n.autoRotationLimit, 80) && n.autoRotation)) && d(i, function (i) {
                    var n;
                    (i === u || i && -90 <= i && 90 >= i) && ((n = (e = g(Math.abs(p.h / Math.sin(h * i)))) + Math.abs(i / 360)) < f && (f = n,
                      t = i,
                      a = e))
                  }) : n.step || (a = g(p.h)),
                  this.autoRotation = i,
                  this.labelRotation = S(t, u),
                  a
              },
              getSlotWidth: function () {
                var t = this.chart,
                  e = this.horiz,
                  i = this.options.labels,
                  n = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                  o = t.margin[3];
                return e && 2 > (i.step || 0) && !i.rotation && (this.staggerLines || 1) * this.len / n || !e && (i.style && parseInt(i.style.width, 10) || o && o - t.spacing[3] || .33 * t.chartWidth)
              },
              renderUnsquish: function () {
                var t, e, i, n = this.chart,
                  o = n.renderer,
                  s = this.tickPositions,
                  r = this.ticks,
                  a = this.options.labels,
                  l = this.horiz,
                  h = this.getSlotWidth(),
                  c = Math.max(1, Math.round(h - 2 * (a.padding || 5))),
                  u = {},
                  p = this.labelMetrics(),
                  f = a.style && a.style.textOverflow,
                  g = 0;
                if (b(a.rotation) || (u.rotation = a.rotation || 0),
                  d(s, function (t) {
                    (t = r[t]) && t.label && t.label.textPxLength > g && (g = t.label.textPxLength)
                  }),
                  this.maxLabelLength = g,
                  this.autoRotation)
                  g > c && g > p.h ? u.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (t = c,
                    !f))
                  for (e = "clip",
                    c = s.length; !l && c--;)
                    i = s[c],
                    (i = r[i].label) && (i.styles && "ellipsis" === i.styles.textOverflow ? i.css({
                        textOverflow: "clip"
                      }) : i.textPxLength > h && i.css({
                        width: h + "px"
                      }),
                      i.getBBox().height > this.len / s.length - (p.h - p.f) && (i.specificTextOverflow = "ellipsis"));
                u.rotation && (t = g > .5 * n.chartHeight ? .33 * n.chartHeight : n.chartHeight,
                    f || (e = "ellipsis")),
                  (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation)) && (u.align = this.labelAlign),
                  d(s, function (i) {
                    var n = (i = r[i]) && i.label,
                      o = {};
                    n && (n.attr(u),
                      !t || a.style && a.style.width || !(t < n.textPxLength || "SPAN" === n.element.tagName) || (o.width = t,
                        f || (o.textOverflow = n.specificTextOverflow || e),
                        n.css(o)),
                      delete n.specificTextOverflow,
                      i.rotation = u.rotation)
                  }),
                  this.tickRotCorr = o.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
              },
              hasData: function () {
                return this.hasVisibleSeries || l(this.min) && l(this.max) && this.tickPositions && 0 < this.tickPositions.length
              },
              addTitle: function (t) {
                var e, i = this.chart.renderer,
                  n = this.horiz,
                  o = this.opposite,
                  s = this.options.title;
                this.axisTitle || ((e = s.textAlign) || (e = (n ? {
                      low: "left",
                      middle: "center",
                      high: "right"
                    } : {
                      low: o ? "right" : "left",
                      middle: "center",
                      high: o ? "left" : "right"
                    })[s.align]),
                    this.axisTitle = i.text(s.text, 0, 0, s.useHTML).attr({
                      zIndex: 7,
                      rotation: s.rotation || 0,
                      align: e
                    }).addClass("highcharts-axis-title").css(w(s.style)).add(this.axisGroup),
                    this.axisTitle.isNew = !0),
                  s.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                  }),
                  this.axisTitle[t ? "show" : "hide"](!0)
              },
              generateTick: function (t) {
                var e = this.ticks;
                e[t] ? e[t].addLabel() : e[t] = new E(this, t)
              },
              getOffset: function () {
                var t, e, i, n = this,
                  o = (x = n.chart).renderer,
                  s = n.options,
                  r = n.tickPositions,
                  a = n.ticks,
                  h = n.horiz,
                  c = n.side,
                  u = x.inverted && !n.isZAxis ? [1, 0, 3, 2][c] : c,
                  p = 0,
                  f = 0,
                  g = s.title,
                  m = s.labels,
                  v = 0,
                  y = x.axisOffset,
                  x = x.clipOffset,
                  b = [-1, 1, 1, -1][c],
                  w = s.className,
                  k = n.axisParent,
                  C = this.tickSize("tick");
                t = n.hasData(),
                  n.showAxis = e = t || S(s.showEmpty, !0),
                  n.staggerLines = n.horiz && m.staggerLines,
                  n.axisGroup || (n.gridGroup = o.g("grid").attr({
                      zIndex: s.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (w || "")).add(k),
                    n.axisGroup = o.g("axis").attr({
                      zIndex: s.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (w || "")).add(k),
                    n.labelGroup = o.g("axis-labels").attr({
                      zIndex: m.zIndex || 7
                    }).addClass("highcharts-" + n.coll.toLowerCase() + "-labels " + (w || "")).add(k)),
                  t || n.isLinked ? (d(r, function (t, e) {
                      n.generateTick(t, e)
                    }),
                    n.renderUnsquish(),
                    n.reserveSpaceDefault = 0 === c || 2 === c || {
                      1: "left",
                      3: "right"
                    } [c] === n.labelAlign,
                    S(m.reserveSpace, "center" === n.labelAlign || null, n.reserveSpaceDefault) && d(r, function (t) {
                      v = Math.max(a[t].getLabelSize(), v)
                    }),
                    n.staggerLines && (v *= n.staggerLines),
                    n.labelOffset = v * (n.opposite ? -1 : 1)) : T(a, function (t, e) {
                    t.destroy(),
                      delete a[e]
                  }),
                  g && g.text && !1 !== g.enabled && (n.addTitle(e),
                    e && !1 !== g.reserveSpace && (n.titleOffset = p = n.axisTitle.getBBox()[h ? "height" : "width"],
                      i = g.offset,
                      f = l(i) ? 0 : S(g.margin, h ? 5 : 10))),
                  n.renderLine(),
                  n.offset = b * S(s.offset, y[c]),
                  n.tickRotCorr = n.tickRotCorr || {
                    x: 0,
                    y: 0
                  },
                  o = 0 === c ? -n.labelMetrics().h : 2 === c ? n.tickRotCorr.y : 0,
                  f = Math.abs(v) + f,
                  v && (f = f - o + b * (h ? S(m.y, n.tickRotCorr.y + 8 * b) : m.x)),
                  n.axisTitleMargin = S(i, f),
                  y[c] = Math.max(y[c], n.axisTitleMargin + p + b * n.offset, f, t && r.length && C ? C[0] + b * n.offset : 0),
                  s = s.offset ? 0 : 2 * Math.floor(n.axisLine.strokeWidth() / 2),
                  x[u] = Math.max(x[u], s)
              },
              getLinePath: function (t) {
                var e = this.chart,
                  i = this.opposite,
                  n = this.offset,
                  o = this.horiz,
                  s = this.left + (i ? this.width : 0) + n;
                n = e.chartHeight - this.bottom - (i ? this.height : 0) + n;
                return i && (t *= -1),
                  e.renderer.crispLine(["M", o ? this.left : s, o ? n : this.top, "L", o ? e.chartWidth - this.right : s, o ? n : e.chartHeight - this.bottom], t)
              },
              renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                  this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                  }))
              },
              getTitlePosition: function () {
                var t = this.horiz,
                  e = this.left,
                  i = this.top,
                  n = this.len,
                  o = this.options.title,
                  s = t ? e : i,
                  r = this.opposite,
                  a = this.offset,
                  l = o.x || 0,
                  h = o.y || 0,
                  c = this.axisTitle,
                  d = this.chart.renderer.fontMetrics(o.style && o.style.fontSize, c);
                c = Math.max(c.getBBox(null, 0).height - d.h - 1, 0),
                  n = {
                    low: s + (t ? 0 : n),
                    middle: s + n / 2,
                    high: s + (t ? n : 0)
                  } [o.align],
                  e = (t ? i + this.height : e) + (t ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + [-c, c, d.f, -c][this.side];
                return {
                  x: t ? n + l : e + (r ? this.width : 0) + a + l,
                  y: t ? e + h - (r ? this.height : 0) + a : n + h
                }
              },
              renderMinorTick: function (t) {
                var e = this.chart.hasRendered && x(this.oldMin),
                  i = this.minorTicks;
                i[t] || (i[t] = new E(this, t, "minor")),
                  e && i[t].isNew && i[t].render(null, !0),
                  i[t].render(null, !1, 1)
              },
              renderTick: function (t, e) {
                var i = this.isLinked,
                  n = this.ticks,
                  o = this.chart.hasRendered && x(this.oldMin);
                (!i || t >= this.min && t <= this.max) && (n[t] || (n[t] = new E(this, t)),
                  o && n[t].isNew && n[t].render(e, !0, .1),
                  n[t].render(e))
              },
              render: function () {
                var e, n, o = this,
                  s = o.chart,
                  r = o.options,
                  a = o.isLog,
                  l = o.isLinked,
                  h = o.tickPositions,
                  c = o.axisTitle,
                  u = o.ticks,
                  f = o.minorTicks,
                  g = o.alternateBands,
                  m = r.stackLabels,
                  v = r.alternateGridColor,
                  y = o.tickmarkOffset,
                  b = o.axisLine,
                  w = o.showAxis,
                  k = i(s.renderer.globalAnimation);
                o.labelEdge.length = 0,
                  o.overlap = !1,
                  d([u, f, g], function (t) {
                    T(t, function (t) {
                      t.isActive = !1
                    })
                  }),
                  (o.hasData() || l) && (o.minorTickInterval && !o.categories && d(o.getMinorTickPositions(), function (t) {
                      o.renderMinorTick(t)
                    }),
                    h.length && (d(h, function (t, e) {
                        o.renderTick(t, e)
                      }),
                      y && (0 === o.min || o.single) && (u[-1] || (u[-1] = new E(o, -1, null, !0)),
                        u[-1].render(-1))),
                    v && d(h, function (i, r) {
                      n = void 0 !== h[r + 1] ? h[r + 1] + y : o.max - y,
                        0 == r % 2 && i < o.max && n <= o.max + (s.polar ? -y : y) && (g[i] || (g[i] = new t.PlotLineOrBand(o)),
                          e = i + y,
                          g[i].options = {
                            from: a ? o.lin2log(e) : e,
                            to: a ? o.lin2log(n) : n,
                            color: v
                          },
                          g[i].render(),
                          g[i].isActive = !0)
                    }),
                    o._addedPlotLB || (d((r.plotLines || []).concat(r.plotBands || []), function (t) {
                        o.addPlotBandOrLine(t)
                      }),
                      o._addedPlotLB = !0)),
                  d([u, f, g], function (t) {
                    var e, i = [],
                      n = k.duration;
                    T(t, function (t, e) {
                        t.isActive || (t.render(e, !1, 0),
                          t.isActive = !1,
                          i.push(e))
                      }),
                      M(function () {
                        for (e = i.length; e--;)
                          t[i[e]] && !t[i[e]].isActive && (t[i[e]].destroy(),
                            delete t[i[e]])
                      }, t !== g && s.hasRendered && n ? n : 0)
                  }),
                  b && (b[b.isPlaced ? "animate" : "attr"]({
                      d: this.getLinePath(b.strokeWidth())
                    }),
                    b.isPlaced = !0,
                    b[w ? "show" : "hide"](!0)),
                  c && w && (r = o.getTitlePosition(),
                    x(r.y) ? (c[c.isNew ? "attr" : "animate"](r),
                      c.isNew = !1) : (c.attr("y", -9999),
                      c.isNew = !0)),
                  m && m.enabled && o.renderStackTotals(),
                  o.isDirty = !1,
                  p(this, "afterRender")
              },
              redraw: function () {
                this.visible && (this.render(),
                    d(this.plotLinesAndBands, function (t) {
                      t.render()
                    })),
                  d(this.series, function (t) {
                    t.isDirty = !0
                  })
              },
              keepProps: "extKey hcEvents names series userMax userMin".split(" "),
              destroy: function (t) {
                var e, i = this,
                  n = i.stacks,
                  o = i.plotLinesAndBands;
                if (p(this, "destroy", {
                    keepEvents: t
                  }),
                  t || C(i),
                  T(n, function (t, e) {
                    c(t),
                      n[e] = null
                  }),
                  d([i.ticks, i.minorTicks, i.alternateBands], function (t) {
                    c(t)
                  }),
                  o)
                  for (t = o.length; t--;)
                    o[t].destroy();
                for (e in d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (t) {
                    i[t] && (i[t] = i[t].destroy())
                  }),
                  i.plotLinesAndBandsGroups)
                  i.plotLinesAndBandsGroups[e] = i.plotLinesAndBandsGroups[e].destroy();
                T(i, function (t, e) {
                  -1 === v(e, i.keepProps) && delete i[e]
                })
              },
              drawCrosshair: function (t, e) {
                var i, n, o = this.crosshair,
                  r = S(o.snap, !0),
                  a = this.cross;
                if (p(this, "drawCrosshair", {
                    e: t,
                    point: e
                  }),
                  t || (t = this.cross && this.cross.e),
                  this.crosshair && !1 !== (l(e) || !r)) {
                  if (r ? l(e) && (n = S(e.crosshairPos, this.isXAxis ? e.plotX : this.len - e.plotY)) : n = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos),
                    l(n) && (i = this.getPlotLinePath(e && (this.isXAxis ? e.x : S(e.stackY, e.y)), null, null, null, n) || null),
                    !l(i))
                    return void this.hideCrosshair();
                  r = this.categories && !this.isRadial,
                    a || (this.cross = a = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (r ? "category " : "thin ") + o.className).attr({
                        zIndex: S(o.zIndex, 2)
                      }).add(),
                      a.attr({
                        stroke: o.color || (r ? s("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": S(o.width, 1)
                      }).css({
                        "pointer-events": "none"
                      }),
                      o.dashStyle && a.attr({
                        dashstyle: o.dashStyle
                      })),
                    a.show().attr({
                      d: i
                    }),
                    r && !o.width && a.attr({
                      "stroke-width": this.transA
                    }),
                    this.cross.e = t
                } else
                  this.hideCrosshair();
                p(this, "afterDrawCrosshair", {
                  e: t,
                  point: e
                })
              },
              hideCrosshair: function () {
                this.cross && this.cross.hide()
              }
            }),
            t.Axis = D
        }(h);
        return function (t) {
            var e = t.Axis,
              i = t.getMagnitude,
              n = t.normalizeTickInterval,
              o = t.timeUnits;
            e.prototype.getTimeTicks = function () {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
              },
              e.prototype.normalizeTimeTickInterval = function (t, e) {
                var s = e || [
                  ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                  ["second", [1, 2, 5, 10, 15, 30]],
                  ["minute", [1, 2, 5, 10, 15, 30]],
                  ["hour", [1, 2, 3, 4, 6, 8, 12]],
                  ["day", [1, 2]],
                  ["week", [1, 2]],
                  ["month", [1, 2, 3, 4, 6]],
                  ["year", null]
                ];
                e = s[s.length - 1];
                var r, a = o[e[0]],
                  l = e[1];
                for (r = 0; r < s.length && (e = s[r],
                    a = o[e[0]],
                    l = e[1],
                    !(s[r + 1] && t <= (a * l[l.length - 1] + o[s[r + 1][0]]) / 2)); r++)
                ;
                return a === o.year && t < 5 * a && (l = [1, 2, 5]), {
                  unitRange: a,
                  count: t = n(t / a, l, "year" === e[0] ? Math.max(i(t / a), 1) : 1),
                  unitName: e[0]
                }
              }
          }(h),
          function (t) {
            var e = t.Axis,
              i = t.getMagnitude,
              n = t.map,
              o = t.normalizeTickInterval,
              s = t.pick;
            e.prototype.getLogTickPositions = function (t, e, r, a) {
                var l = this.options,
                  h = this.len,
                  c = [];
                if (a || (this._minorAutoInterval = null),
                  .5 <= t)
                  t = Math.round(t),
                  c = this.getLinearTickPositions(t, e, r);
                else if (.08 <= t) {
                  var d, u, p, f, g;
                  for (h = Math.floor(e),
                    l = .3 < t ? [1, 2, 4] : .15 < t ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h < r + 1 && !g; h++)
                    for (u = l.length,
                      d = 0; d < u && !g; d++)
                      (p = this.log2lin(this.lin2log(h) * l[d])) > e && (!a || f <= r) && void 0 !== f && c.push(f),
                      f > r && (g = !0),
                      f = p
                } else
                  e = this.lin2log(e),
                  r = this.lin2log(r),
                  t = a ? this.getMinorTickInterval() : l.tickInterval,
                  t = s("auto" === t ? null : t, this._minorAutoInterval, l.tickPixelInterval / (a ? 5 : 1) * (r - e) / ((a ? h / this.tickPositions.length : h) || 1)),
                  t = o(t, null, i(t)),
                  c = n(this.getLinearTickPositions(t, e, r), this.log2lin),
                  a || (this._minorAutoInterval = t / 5);
                return a || (this.tickInterval = t),
                  c
              },
              e.prototype.log2lin = function (t) {
                return Math.log(t) / Math.LN10
              },
              e.prototype.lin2log = function (t) {
                return Math.pow(10, t)
              }
          }(h),
          function (t, e) {
            var i = t.arrayMax,
              n = t.arrayMin,
              o = t.defined,
              s = t.destroyObjectProperties,
              r = t.each,
              a = t.erase,
              l = t.merge,
              h = t.pick;
            t.PlotLineOrBand = function (t, e) {
                this.axis = t,
                  e && (this.options = e,
                    this.id = e.id)
              },
              t.PlotLineOrBand.prototype = {
                render: function () {
                  var e = this,
                    i = e.axis,
                    n = i.horiz,
                    s = e.options,
                    r = s.label,
                    a = e.label,
                    c = s.to,
                    d = s.from,
                    u = s.value,
                    p = o(d) && o(c),
                    f = o(u),
                    g = e.svgElem,
                    m = !g,
                    v = [],
                    y = s.color,
                    x = h(s.zIndex, 0),
                    b = s.events,
                    w = (v = {
                      class: "highcharts-plot-" + (p ? "band " : "line ") + (s.className || "")
                    }, {}),
                    k = i.chart.renderer,
                    T = p ? "bands" : "lines";
                  if (i.isLog && (d = i.log2lin(d),
                      c = i.log2lin(c),
                      u = i.log2lin(u)),
                    f ? (v = {
                        stroke: y,
                        "stroke-width": s.width
                      },
                      s.dashStyle && (v.dashstyle = s.dashStyle)) : p && (y && (v.fill = y),
                      s.borderWidth && (v.stroke = s.borderColor,
                        v["stroke-width"] = s.borderWidth)),
                    w.zIndex = x,
                    T += "-" + x,
                    (y = i.plotLinesAndBandsGroups[T]) || (i.plotLinesAndBandsGroups[T] = y = k.g("plot-" + T).attr(w).add()),
                    m && (e.svgElem = g = k.path().attr(v).add(y)),
                    f)
                    v = i.getPlotLinePath(u, g.strokeWidth());
                  else {
                    if (!p)
                      return;
                    v = i.getPlotBandPath(d, c, s)
                  }
                  return m && v && v.length ? (g.attr({
                        d: v
                      }),
                      b && t.objectEach(b, function (t, i) {
                        g.on(i, function (t) {
                          b[i].apply(e, [t])
                        })
                      })) : g && (v ? (g.show(),
                      g.animate({
                        d: v
                      })) : (g.hide(),
                      a && (e.label = a = a.destroy()))),
                    r && o(r.text) && v && v.length && 0 < i.width && 0 < i.height && !v.flat ? (r = l({
                        align: n && p && "center",
                        x: n ? !p && 4 : 10,
                        verticalAlign: !n && p && "middle",
                        y: n ? p ? 16 : 10 : p ? 6 : -4,
                        rotation: n && !p && 90
                      }, r),
                      this.renderLabel(r, v, p, x)) : a && a.hide(),
                    e
                },
                renderLabel: function (t, e, o, s) {
                  var r = this.label,
                    a = this.axis.chart.renderer;
                  r || ((r = {
                        align: t.textAlign || t.align,
                        rotation: t.rotation,
                        class: "highcharts-plot-" + (o ? "band" : "line") + "-label " + (t.className || "")
                      }).zIndex = s,
                      this.label = r = a.text(t.text, 0, 0, t.useHTML).attr(r).add(),
                      r.css(t.style)),
                    s = e.xBounds || [e[1], e[4], o ? e[6] : e[1]],
                    e = e.yBounds || [e[2], e[5], o ? e[7] : e[2]],
                    o = n(s),
                    a = n(e),
                    r.align(t, !1, {
                      x: o,
                      y: a,
                      width: i(s) - o,
                      height: i(e) - a
                    }),
                    r.show()
                },
                destroy: function () {
                  a(this.axis.plotLinesAndBands, this),
                    delete this.axis,
                    s(this)
                }
              },
              t.extend(e.prototype, {
                getPlotBandPath: function (t, e) {
                  var i, n = this.getPlotLinePath(e, null, null, !0),
                    o = this.getPlotLinePath(t, null, null, !0),
                    s = [],
                    r = this.horiz,
                    a = 1;
                  if (t = t < this.min && e < this.min || t > this.max && e > this.max,
                    o && n)
                    for (t && (i = o.toString() === n.toString(),
                        a = 0),
                      t = 0; t < o.length; t += 6)
                      r && n[t + 1] === o[t + 1] ? (n[t + 1] += a,
                        n[t + 4] += a) : r || n[t + 2] !== o[t + 2] || (n[t + 2] += a,
                        n[t + 5] += a),
                      s.push("M", o[t + 1], o[t + 2], "L", o[t + 4], o[t + 5], n[t + 4], n[t + 5], n[t + 1], n[t + 2], "z"),
                      s.flat = i;
                  return s
                },
                addPlotBand: function (t) {
                  return this.addPlotBandOrLine(t, "plotBands")
                },
                addPlotLine: function (t) {
                  return this.addPlotBandOrLine(t, "plotLines")
                },
                addPlotBandOrLine: function (e, i) {
                  var n = new t.PlotLineOrBand(this, e).render(),
                    o = this.userOptions;
                  return n && (i && (o[i] = o[i] || [],
                        o[i].push(e)),
                      this.plotLinesAndBands.push(n)),
                    n
                },
                removePlotBandOrLine: function (t) {
                  for (var e = this.plotLinesAndBands, i = this.options, n = this.userOptions, o = e.length; o--;)
                    e[o].id === t && e[o].destroy();
                  r([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], function (e) {
                    for (o = e.length; o--;)
                      e[o].id === t && a(e, e[o])
                  })
                },
                removePlotBand: function (t) {
                  this.removePlotBandOrLine(t)
                },
                removePlotLine: function (t) {
                  this.removePlotBandOrLine(t)
                }
              })
          }(h, c),
          function (t) {
            var e = t.each,
              i = t.extend,
              n = t.format,
              o = t.isNumber,
              s = t.map,
              r = t.merge,
              a = t.pick,
              l = t.splat,
              h = t.syncTimeout,
              c = t.timeUnits;
            t.Tooltip = function () {
                this.init.apply(this, arguments)
              },
              t.Tooltip.prototype = {
                init: function (t, e) {
                  this.chart = t,
                    this.options = e,
                    this.crosshairs = [],
                    this.now = {
                      x: 0,
                      y: 0
                    },
                    this.isHidden = !0,
                    this.split = e.split && !t.inverted,
                    this.shared = e.shared || this.split
                },
                cleanSplit: function (t) {
                  e(this.chart.series, function (e) {
                    var i = e && e.tt;
                    i && (!i.isActive || t ? e.tt = i.destroy() : i.isActive = !1)
                  })
                },
                getLabel: function () {
                  var t = this.chart.renderer,
                    e = this.options;
                  return this.label || (this.split ? this.label = t.g("tooltip") : (this.label = t.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                          padding: e.padding,
                          r: e.borderRadius
                        }),
                        this.label.attr({
                          fill: e.backgroundColor,
                          "stroke-width": e.borderWidth
                        }).css(e.style).shadow(e.shadow)),
                      this.label.attr({
                        zIndex: 8
                      }).add()),
                    this.label
                },
                update: function (t) {
                  this.destroy(),
                    r(!0, this.chart.options.tooltip.userOptions, t),
                    this.init(this.chart, r(!0, this.options, t))
                },
                destroy: function () {
                  this.label && (this.label = this.label.destroy()),
                    this.split && this.tt && (this.cleanSplit(this.chart, !0),
                      this.tt = this.tt.destroy()),
                    t.clearTimeout(this.hideTimer),
                    t.clearTimeout(this.tooltipTimeout)
                },
                move: function (e, n, o, s) {
                  var r = this,
                    a = r.now,
                    l = !1 !== r.options.animation && !r.isHidden && (1 < Math.abs(e - a.x) || 1 < Math.abs(n - a.y)),
                    h = r.followPointer || 1 < r.len;
                  i(a, {
                      x: l ? (2 * a.x + e) / 3 : e,
                      y: l ? (a.y + n) / 2 : n,
                      anchorX: h ? void 0 : l ? (2 * a.anchorX + o) / 3 : o,
                      anchorY: h ? void 0 : l ? (a.anchorY + s) / 2 : s
                    }),
                    r.getLabel().attr(a),
                    l && (t.clearTimeout(this.tooltipTimeout),
                      this.tooltipTimeout = setTimeout(function () {
                        r && r.move(e, n, o, s)
                      }, 32))
                },
                hide: function (e) {
                  var i = this;
                  t.clearTimeout(this.hideTimer),
                    e = a(e, this.options.hideDelay, 500),
                    this.isHidden || (this.hideTimer = h(function () {
                      i.getLabel()[e ? "fadeOut" : "hide"](),
                        i.isHidden = !0
                    }, e))
                },
                getAnchor: function (t, i) {
                  var n, o, r, a = this.chart,
                    h = a.inverted,
                    c = a.plotTop,
                    d = a.plotLeft,
                    u = 0,
                    p = 0;
                  return n = (t = l(t))[0].tooltipPos,
                    this.followPointer && i && (void 0 === i.chartX && (i = a.pointer.normalize(i)),
                      n = [i.chartX - a.plotLeft, i.chartY - c]),
                    n || (e(t, function (t) {
                        o = t.series.yAxis,
                          r = t.series.xAxis,
                          u += t.plotX + (!h && r ? r.left - d : 0),
                          p += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!h && o ? o.top - c : 0)
                      }),
                      u /= t.length,
                      p /= t.length,
                      n = [h ? a.plotWidth - p : u, this.shared && !h && 1 < t.length && i ? i.chartY - c : h ? a.plotHeight - u : p]),
                    s(n, Math.round)
                },
                getPosition: function (t, e, i) {
                  var n, o = this.chart,
                    s = this.distance,
                    r = {},
                    l = o.inverted && i.h || 0,
                    h = ["y", o.chartHeight, e, i.plotY + o.plotTop, o.plotTop, o.plotTop + o.plotHeight],
                    c = ["x", o.chartWidth, t, i.plotX + o.plotLeft, o.plotLeft, o.plotLeft + o.plotWidth],
                    d = !this.followPointer && a(i.ttBelow, !o.inverted == !!i.negative),
                    u = function (t) {
                      var e = h;
                      h = c,
                        c = e,
                        n = t
                    },
                    p = function () {
                      !1 !== function (t, e, i, n, o, a) {
                          var h = i < n - s,
                            c = n + s + i < e,
                            u = n - s - i;
                          if (n += s,
                            d && c)
                            r[t] = n;
                          else if (!d && h)
                            r[t] = u;
                          else if (h)
                            r[t] = Math.min(a - i, 0 > u - l ? u : u - l);
                          else {
                            if (!c)
                              return !1;
                            r[t] = Math.max(o, n + l + i > e ? n : n + l)
                          }
                        }
                        .apply(0, h) ? !1 !== function (t, e, i, n) {
                          var o;
                          return n < s || n > e - s ? o = !1 : r[t] = n < i / 2 ? 1 : n > e - i / 2 ? e - i - 2 : n - i / 2,
                            o
                        }
                        .apply(0, c) || n || (u(!0),
                          p()) : n ? r.x = r.y = 0 : (u(!0),
                          p())
                    };
                  return (o.inverted || 1 < this.len) && u(),
                    p(),
                    r
                },
                defaultFormatter: function (t) {
                  var e, i = this.points || l(this);
                  return (e = (e = [t.tooltipFooterHeaderFormatter(i[0])]).concat(t.bodyFormatter(i))).push(t.tooltipFooterHeaderFormatter(i[0], !0)),
                    e
                },
                refresh: function (i, n) {
                  var o, s, r, h = this.options,
                    c = i,
                    d = {},
                    u = [];
                  o = h.formatter || this.defaultFormatter;
                  var p;
                  d = this.shared;
                  h.enabled && (t.clearTimeout(this.hideTimer),
                    this.followPointer = l(c)[0].series.tooltipOptions.followPointer,
                    n = (r = this.getAnchor(c, n))[0],
                    s = r[1],
                    !d || c.series && c.series.noSharedTooltip ? d = c.getLabelConfig() : (e(c, function (t) {
                        t.setState("hover"),
                          u.push(t.getLabelConfig())
                      }),
                      (d = {
                        x: c[0].category,
                        y: c[0].y
                      }).points = u,
                      c = c[0]),
                    this.len = u.length,
                    d = o.call(d, this),
                    p = c.series,
                    this.distance = a(p.tooltipOptions.distance, 16),
                    !1 === d ? this.hide() : (o = this.getLabel(),
                      this.isHidden && o.attr({
                        opacity: 1
                      }).show(),
                      this.split ? this.renderSplit(d, l(i)) : (h.style.width || o.css({
                          width: this.chart.spacingBox.width
                        }),
                        o.attr({
                          text: d && d.join ? d.join("") : d
                        }),
                        o.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + a(c.colorIndex, p.colorIndex)),
                        o.attr({
                          stroke: h.borderColor || c.color || p.color || "#666666"
                        }),
                        this.updatePosition({
                          plotX: n,
                          plotY: s,
                          negative: c.negative,
                          ttBelow: c.ttBelow,
                          h: r[2] || 0
                        })),
                      this.isHidden = !1))
                },
                renderSplit: function (i, n) {
                  var o = this,
                    s = [],
                    r = this.chart,
                    l = r.renderer,
                    h = !0,
                    c = this.options,
                    d = 0,
                    u = this.getLabel();
                  t.isString(i) && (i = [!1, i]),
                    e(i.slice(0, n.length + 1), function (t, e) {
                      if (!1 !== t) {
                        var i = (e = n[e - 1] || {
                            isHeader: !0,
                            plotX: n[0].plotX
                          }).series || o,
                          p = i.tt,
                          f = e.series || {},
                          g = "highcharts-color-" + a(e.colorIndex, f.colorIndex, "none");
                        p || (i.tt = p = l.label(null, null, null, "callout", null, null, c.useHTML).addClass("highcharts-tooltip-box " + g).attr({
                            padding: c.padding,
                            r: c.borderRadius,
                            fill: c.backgroundColor,
                            stroke: c.borderColor || e.color || f.color || "#333333",
                            "stroke-width": c.borderWidth
                          }).add(u)),
                          p.isActive = !0,
                          p.attr({
                            text: t
                          }),
                          p.css(c.style).shadow(c.shadow),
                          f = (t = p.getBBox()).width + p.strokeWidth(),
                          e.isHeader ? (d = t.height,
                            f = Math.max(0, Math.min(e.plotX + r.plotLeft - f / 2, r.chartWidth - f))) : f = e.plotX + r.plotLeft - a(c.distance, 16) - f,
                          0 > f && (h = !1),
                          t = (e.series && e.series.yAxis && e.series.yAxis.pos) + (e.plotY || 0),
                          t -= r.plotTop,
                          s.push({
                            target: e.isHeader ? r.plotHeight + d : t,
                            rank: e.isHeader ? 1 : 0,
                            size: i.tt.getBBox().height + 1,
                            point: e,
                            x: f,
                            tt: p
                          })
                      }
                    }),
                    this.cleanSplit(),
                    t.distribute(s, r.plotHeight + d),
                    e(s, function (t) {
                      var e = t.point,
                        i = e.series;
                      t.tt.attr({
                        visibility: void 0 === t.pos ? "hidden" : "inherit",
                        x: h || e.isHeader ? t.x : e.plotX + r.plotLeft + a(c.distance, 16),
                        y: t.pos + r.plotTop,
                        anchorX: e.isHeader ? e.plotX + r.plotLeft : e.plotX + i.xAxis.pos,
                        anchorY: e.isHeader ? t.pos + r.plotTop - 15 : e.plotY + i.yAxis.pos
                      })
                    })
                },
                updatePosition: function (t) {
                  var e = this.chart,
                    i = this.getLabel();
                  i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
                  this.move(Math.round(i.x), Math.round(i.y || 0), t.plotX + e.plotLeft, t.plotY + e.plotTop)
                },
                getDateFormat: function (t, e, i, n) {
                  var o, s, r = this.chart.time,
                    a = r.dateFormat("%m-%d %H:%M:%S.%L", e),
                    l = {
                      millisecond: 15,
                      second: 12,
                      minute: 9,
                      hour: 6,
                      day: 3
                    },
                    h = "millisecond";
                  for (s in c) {
                    if (t === c.week && +r.dateFormat("%w", e) === i && "00:00:00.000" === a.substr(6)) {
                      s = "week";
                      break
                    }
                    if (c[s] > t) {
                      s = h;
                      break
                    }
                    if (l[s] && a.substr(l[s]) !== "01-01 00:00:00.000".substr(l[s]))
                      break;
                    "week" !== s && (h = s)
                  }
                  return s && (o = n[s]),
                    o
                },
                getXDateFormat: function (t, e, i) {
                  e = e.dateTimeLabelFormats;
                  var n = i && i.closestPointRange;
                  return (n ? this.getDateFormat(n, t.x, i.options.startOfWeek, e) : e.day) || e.year
                },
                tooltipFooterHeaderFormatter: function (t, i) {
                  i = i ? "footer" : "header";
                  var s = t.series,
                    r = s.tooltipOptions,
                    a = r.xDateFormat,
                    l = s.xAxis,
                    h = l && "datetime" === l.options.type && o(t.key),
                    c = r[i + "Format"];
                  return h && !a && (a = this.getXDateFormat(t, r, l)),
                    h && a && e(t.point && t.point.tooltipDateKeys || ["key"], function (t) {
                      c = c.replace("{point." + t + "}", "{point." + t + ":" + a + "}")
                    }),
                    n(c, {
                      point: t,
                      series: s
                    }, this.chart.time)
                },
                bodyFormatter: function (t) {
                  return s(t, function (t) {
                    var e = t.series.tooltipOptions;
                    return (e[(t.point.formatPrefix || "point") + "Formatter"] || t.point.tooltipFormatter).call(t.point, e[(t.point.formatPrefix || "point") + "Format"])
                  })
                }
              }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.attr,
              n = t.charts,
              o = t.color,
              s = t.css,
              r = t.defined,
              a = t.each,
              l = t.extend,
              h = t.find,
              c = t.fireEvent,
              d = t.isNumber,
              u = t.isObject,
              p = t.offset,
              f = t.pick,
              g = t.splat,
              m = t.Tooltip;
            t.Pointer = function (t, e) {
                this.init(t, e)
              },
              t.Pointer.prototype = {
                init: function (t, e) {
                  this.options = e,
                    this.chart = t,
                    this.runChartClick = e.chart.events && !!e.chart.events.click,
                    this.pinchDown = [],
                    this.lastValidTouch = {},
                    m && (t.tooltip = new m(t, e.tooltip),
                      this.followTouchMove = f(e.tooltip.followTouchMove, !0)),
                    this.setDOMEvents()
                },
                zoomOption: function (t) {
                  var e = (n = this.chart).options.chart,
                    i = e.zoomType || "",
                    n = n.inverted;
                  /touch/.test(t.type) && (i = f(e.pinchType, i)),
                    this.zoomX = t = /x/.test(i),
                    this.zoomY = i = /y/.test(i),
                    this.zoomHor = t && !n || i && n,
                    this.zoomVert = i && !n || t && n,
                    this.hasZoom = t || i
                },
                normalize: function (t, e) {
                  var i;
                  return i = t.touches ? t.touches.length ? t.touches.item(0) : t.changedTouches[0] : t,
                    e || (this.chartPosition = e = p(this.chart.container)),
                    l(t, {
                      chartX: Math.round(i.pageX - e.left),
                      chartY: Math.round(i.pageY - e.top)
                    })
                },
                getCoordinates: function (t) {
                  var e = {
                    xAxis: [],
                    yAxis: []
                  };
                  return a(this.chart.axes, function (i) {
                      e[i.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: i,
                        value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                      })
                    }),
                    e
                },
                findNearestKDPoint: function (t, e, i) {
                  var n;
                  return a(t, function (t) {
                      var o = !(t.noSharedTooltip && e) && 0 > t.options.findNearestPointBy.indexOf("y");
                      if (t = t.searchPoint(i, o),
                        (o = u(t, !0)) && !(o = !u(n, !0))) {
                        o = n.distX - t.distX;
                        var s = n.dist - t.dist,
                          r = (t.series.group && t.series.group.zIndex) - (n.series.group && n.series.group.zIndex);
                        o = 0 < (0 !== o && e ? o : 0 !== s ? s : 0 !== r ? r : n.series.index > t.series.index ? -1 : 1)
                      }
                      o && (n = t)
                    }),
                    n
                },
                getPointFromEvent: function (t) {
                  t = t.target;
                  for (var e; t && !e;)
                    e = t.point,
                    t = t.parentNode;
                  return e
                },
                getChartCoordinatesFromPoint: function (t, e) {
                  var i = (n = t.series).xAxis,
                    n = n.yAxis,
                    o = f(t.clientX, t.plotX),
                    s = t.shapeArgs;
                  return i && n ? e ? {
                    chartX: i.len + i.pos - o,
                    chartY: n.len + n.pos - t.plotY
                  } : {
                    chartX: o + i.pos,
                    chartY: t.plotY + n.pos
                  } : s && s.x && s.y ? {
                    chartX: s.x,
                    chartY: s.y
                  } : void 0
                },
                getHoverData: function (e, i, n, o, s, r, l) {
                  var c, d = [],
                    p = l && l.isBoosting;
                  return o = !(!o || !e),
                    l = i && !i.stickyTracking ? [i] : t.grep(n, function (t) {
                      return t.visible && !(!s && t.directTouch) && f(t.options.enableMouseTracking, !0) && t.stickyTracking
                    }),
                    i = (c = o ? e : this.findNearestKDPoint(l, s, r)) && c.series,
                    c && (s && !i.noSharedTooltip ? (l = t.grep(n, function (t) {
                        return t.visible && !(!s && t.directTouch) && f(t.options.enableMouseTracking, !0) && !t.noSharedTooltip
                      }),
                      a(l, function (t) {
                        var e = h(t.points, function (t) {
                          return t.x === c.x && !t.isNull
                        });
                        u(e) && (p && (e = t.getPoint(e)),
                          d.push(e))
                      })) : d.push(c)), {
                      hoverPoint: c,
                      hoverSeries: i,
                      hoverPoints: d
                    }
                },
                runPointActions: function (i, o) {
                  var s, r = this.chart,
                    l = r.tooltip && r.tooltip.options.enabled ? r.tooltip : void 0,
                    h = !!l && l.shared,
                    c = (d = o || r.hoverPoint) && d.series || r.hoverSeries,
                    d = (c = this.getHoverData(d, c, r.series, !!o || c && c.directTouch && this.isDirectTouch, h, i, {
                      isBoosting: r.isBoosting
                    })).hoverPoint;
                  if (s = c.hoverPoints,
                    o = (c = c.hoverSeries) && c.tooltipOptions.followPointer,
                    h = h && c && !c.noSharedTooltip,
                    d && (d !== r.hoverPoint || l && l.isHidden)) {
                    if (a(r.hoverPoints || [], function (e) {
                        -1 === t.inArray(e, s) && e.setState()
                      }),
                      a(s || [], function (t) {
                        t.setState("hover")
                      }),
                      r.hoverSeries !== c && c.onMouseOver(),
                      r.hoverPoint && r.hoverPoint.firePointEvent("mouseOut"),
                      !d.series)
                      return;
                    d.firePointEvent("mouseOver"),
                      r.hoverPoints = s,
                      r.hoverPoint = d,
                      l && l.refresh(h ? s : d, i)
                  } else
                    o && l && !l.isHidden && (d = l.getAnchor([{}], i),
                      l.updatePosition({
                        plotX: d[0],
                        plotY: d[1]
                      }));
                  this.unDocMouseMove || (this.unDocMouseMove = e(r.container.ownerDocument, "mousemove", function (e) {
                      var i = n[t.hoverChartIndex];
                      i && i.pointer.onDocumentMouseMove(e)
                    })),
                    a(r.axes, function (e) {
                      var n = f(e.crosshair.snap, !0),
                        o = n ? t.find(s, function (t) {
                          return t.series[e.coll] === e
                        }) : void 0;
                      o || !n ? e.drawCrosshair(i, o) : e.hideCrosshair()
                    })
                },
                reset: function (t, e) {
                  var i = this.chart,
                    n = i.hoverSeries,
                    o = i.hoverPoint,
                    s = i.hoverPoints,
                    r = i.tooltip,
                    l = r && r.shared ? s : o;
                  t && l && a(g(l), function (e) {
                      e.series.isCartesian && void 0 === e.plotX && (t = !1)
                    }),
                    t ? r && l && (r.refresh(l),
                      o && (o.setState(o.state, !0),
                        a(i.axes, function (t) {
                          t.crosshair && t.drawCrosshair(null, o)
                        }))) : (o && o.onMouseOut(),
                      s && a(s, function (t) {
                        t.setState()
                      }),
                      n && n.onMouseOut(),
                      r && r.hide(e),
                      this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()),
                      a(i.axes, function (t) {
                        t.hideCrosshair()
                      }),
                      this.hoverX = i.hoverPoints = i.hoverPoint = null)
                },
                scaleGroups: function (t, e) {
                  var i, n = this.chart;
                  a(n.series, function (o) {
                      i = t || o.getPlotBox(),
                        o.xAxis && o.xAxis.zoomEnabled && o.group && (o.group.attr(i),
                          o.markerGroup && (o.markerGroup.attr(i),
                            o.markerGroup.clip(e ? n.clipRect : null)),
                          o.dataLabelsGroup && o.dataLabelsGroup.attr(i))
                    }),
                    n.clipRect.attr(e || n.clipBox)
                },
                dragStart: function (t) {
                  var e = this.chart;
                  e.mouseIsDown = t.type,
                    e.cancelClick = !1,
                    e.mouseDownX = this.mouseDownX = t.chartX,
                    e.mouseDownY = this.mouseDownY = t.chartY
                },
                drag: function (t) {
                  var e, i = this.chart,
                    n = i.options.chart,
                    s = t.chartX,
                    r = t.chartY,
                    a = this.zoomHor,
                    l = this.zoomVert,
                    h = i.plotLeft,
                    c = i.plotTop,
                    d = i.plotWidth,
                    u = i.plotHeight,
                    p = this.selectionMarker,
                    f = this.mouseDownX,
                    g = this.mouseDownY,
                    m = n.panKey && t[n.panKey + "Key"];
                  p && p.touch || (s < h ? s = h : s > h + d && (s = h + d),
                    r < c ? r = c : r > c + u && (r = c + u),
                    this.hasDragged = Math.sqrt(Math.pow(f - s, 2) + Math.pow(g - r, 2)),
                    10 < this.hasDragged && (e = i.isInsidePlot(f - h, g - c),
                      i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !m && !p && (this.selectionMarker = p = i.renderer.rect(h, c, a ? 1 : d, l ? 1 : u, 0).attr({
                        fill: n.selectionMarkerFill || o("#335cad").setOpacity(.25).get(),
                        class: "highcharts-selection-marker",
                        zIndex: 7
                      }).add()),
                      p && a && (s -= f,
                        p.attr({
                          width: Math.abs(s),
                          x: (0 < s ? 0 : s) + f
                        })),
                      p && l && (s = r - g,
                        p.attr({
                          height: Math.abs(s),
                          y: (0 < s ? 0 : s) + g
                        })),
                      e && !p && n.panning && i.pan(t, n.panning)))
                },
                drop: function (t) {
                  var e = this,
                    i = this.chart,
                    n = this.hasPinched;
                  if (this.selectionMarker) {
                    var o, h = {
                        originalEvent: t,
                        xAxis: [],
                        yAxis: []
                      },
                      u = this.selectionMarker,
                      p = u.attr ? u.attr("x") : u.x,
                      f = u.attr ? u.attr("y") : u.y,
                      g = u.attr ? u.attr("width") : u.width,
                      m = u.attr ? u.attr("height") : u.height;
                    (this.hasDragged || n) && (a(i.axes, function (i) {
                        if (i.zoomEnabled && r(i.min) && (n || e[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                          } [i.coll]])) {
                          var s = i.horiz,
                            a = "touchend" === t.type ? i.minPixelPadding : 0,
                            l = i.toValue((s ? p : f) + a);
                          s = i.toValue((s ? p + g : f + m) - a);
                          h[i.coll].push({
                              axis: i,
                              min: Math.min(l, s),
                              max: Math.max(l, s)
                            }),
                            o = !0
                        }
                      }),
                      o && c(i, "selection", h, function (t) {
                        i.zoom(l(t, n ? {
                          animation: !1
                        } : null))
                      })),
                    d(i.index) && (this.selectionMarker = this.selectionMarker.destroy()),
                      n && this.scaleGroups()
                  }
                  i && d(i.index) && (s(i.container, {
                      cursor: i._cursor
                    }),
                    i.cancelClick = 10 < this.hasDragged,
                    i.mouseIsDown = this.hasDragged = this.hasPinched = !1,
                    this.pinchDown = [])
                },
                onContainerMouseDown: function (t) {
                  2 !== (t = this.normalize(t)).button && (this.zoomOption(t),
                    t.preventDefault && t.preventDefault(),
                    this.dragStart(t))
                },
                onDocumentMouseUp: function (e) {
                  n[t.hoverChartIndex] && n[t.hoverChartIndex].pointer.drop(e)
                },
                onDocumentMouseMove: function (t) {
                  var e = this.chart,
                    i = this.chartPosition;
                  t = this.normalize(t, i),
                    !i || this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || this.reset()
                },
                onContainerMouseLeave: function (e) {
                  var i = n[t.hoverChartIndex];
                  i && (e.relatedTarget || e.toElement) && (i.pointer.reset(),
                    i.pointer.chartPosition = null)
                },
                onContainerMouseMove: function (e) {
                  var i = this.chart;
                  r(t.hoverChartIndex) && n[t.hoverChartIndex] && n[t.hoverChartIndex].mouseIsDown || (t.hoverChartIndex = i.index),
                    (e = this.normalize(e)).returnValue = !1,
                    "mousedown" === i.mouseIsDown && this.drag(e),
                    !this.inClass(e.target, "highcharts-tracker") && !i.isInsidePlot(e.chartX - i.plotLeft, e.chartY - i.plotTop) || i.openMenu || this.runPointActions(e)
                },
                inClass: function (t, e) {
                  for (var n; t;) {
                    if (n = i(t, "class")) {
                      if (-1 !== n.indexOf(e))
                        return !0;
                      if (-1 !== n.indexOf("highcharts-container"))
                        return !1
                    }
                    t = t.parentNode
                  }
                },
                onTrackerMouseOut: function (t) {
                  var e = this.chart.hoverSeries;
                  t = t.relatedTarget || t.toElement,
                    this.isDirectTouch = !1,
                    !e || !t || e.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) && this.inClass(t, "highcharts-tracker") || e.onMouseOut()
                },
                onContainerClick: function (t) {
                  var e = this.chart,
                    i = e.hoverPoint,
                    n = e.plotLeft,
                    o = e.plotTop;
                  t = this.normalize(t),
                    e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (c(i.series, "click", l(t, {
                        point: i
                      })),
                      e.hoverPoint && i.firePointEvent("click", t)) : (l(t, this.getCoordinates(t)),
                      e.isInsidePlot(t.chartX - n, t.chartY - o) && c(e, "click", t)))
                },
                setDOMEvents: function () {
                  var i = this,
                    n = i.chart.container,
                    o = n.ownerDocument;
                  n.onmousedown = function (t) {
                      i.onContainerMouseDown(t)
                    },
                    n.onmousemove = function (t) {
                      i.onContainerMouseMove(t)
                    },
                    n.onclick = function (t) {
                      i.onContainerClick(t)
                    },
                    this.unbindContainerMouseLeave = e(n, "mouseleave", i.onContainerMouseLeave),
                    t.unbindDocumentMouseUp || (t.unbindDocumentMouseUp = e(o, "mouseup", i.onDocumentMouseUp)),
                    t.hasTouch && (n.ontouchstart = function (t) {
                        i.onContainerTouchStart(t)
                      },
                      n.ontouchmove = function (t) {
                        i.onContainerTouchMove(t)
                      },
                      t.unbindDocumentTouchEnd || (t.unbindDocumentTouchEnd = e(o, "touchend", i.onDocumentTouchEnd)))
                },
                destroy: function () {
                  var e = this;
                  e.unDocMouseMove && e.unDocMouseMove(),
                    this.unbindContainerMouseLeave(),
                    t.chartCount || (t.unbindDocumentMouseUp && (t.unbindDocumentMouseUp = t.unbindDocumentMouseUp()),
                      t.unbindDocumentTouchEnd && (t.unbindDocumentTouchEnd = t.unbindDocumentTouchEnd())),
                    clearInterval(e.tooltipTimeout),
                    t.objectEach(e, function (t, i) {
                      e[i] = null
                    })
                }
              }
          }(h),
          function (t) {
            var e = t.charts,
              i = t.each,
              n = t.extend,
              o = t.map,
              s = t.noop,
              r = t.pick;
            n(t.Pointer.prototype, {
              pinchTranslate: function (t, e, i, n, o, s) {
                this.zoomHor && this.pinchTranslateDirection(!0, t, e, i, n, o, s),
                  this.zoomVert && this.pinchTranslateDirection(!1, t, e, i, n, o, s)
              },
              pinchTranslateDirection: function (t, e, i, n, o, s, r, a) {
                var l, h, c, d = this.chart,
                  u = t ? "x" : "y",
                  p = t ? "X" : "Y",
                  f = "chart" + p,
                  g = t ? "width" : "height",
                  m = d["plot" + (t ? "Left" : "Top")],
                  v = a || 1,
                  y = d.inverted,
                  x = d.bounds[t ? "h" : "v"],
                  b = 1 === e.length,
                  w = e[0][f],
                  k = i[0][f],
                  T = !b && e[1][f],
                  S = !b && i[1][f];
                (i = function () {
                  !b && 20 < Math.abs(w - T) && (v = a || Math.abs(k - S) / Math.abs(w - T)),
                    h = (m - k) / v + w,
                    l = d["plot" + (t ? "Width" : "Height")] / v
                })(),
                (e = h) < x.min ? (e = x.min,
                    c = !0) : e + l > x.max && (e = x.max - l,
                    c = !0),
                  c ? (k -= .8 * (k - r[u][0]),
                    b || (S -= .8 * (S - r[u][1])),
                    i()) : r[u] = [k, S],
                  y || (s[u] = h - m,
                    s[g] = l),
                  s = y ? 1 / v : v,
                  o[g] = l,
                  o[u] = e,
                  n[y ? t ? "scaleY" : "scaleX" : "scale" + p] = v,
                  n["translate" + p] = s * m + (k - s * w)
              },
              pinch: function (t) {
                var e = this,
                  a = e.chart,
                  l = e.pinchDown,
                  h = t.touches,
                  c = h.length,
                  d = e.lastValidTouch,
                  u = e.hasZoom,
                  p = e.selectionMarker,
                  f = {},
                  g = 1 === c && (e.inClass(t.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick),
                  m = {};
                1 < c && (e.initiated = !0),
                  u && e.initiated && !g && t.preventDefault(),
                  o(h, function (t) {
                    return e.normalize(t)
                  }),
                  "touchstart" === t.type ? (i(h, function (t, e) {
                      l[e] = {
                        chartX: t.chartX,
                        chartY: t.chartY
                      }
                    }),
                    d.x = [l[0].chartX, l[1] && l[1].chartX],
                    d.y = [l[0].chartY, l[1] && l[1].chartY],
                    i(a.axes, function (t) {
                      if (t.zoomEnabled) {
                        var e = a.bounds[t.horiz ? "h" : "v"],
                          i = t.minPixelPadding,
                          n = t.toPixels(r(t.options.min, t.dataMin)),
                          o = t.toPixels(r(t.options.max, t.dataMax)),
                          s = Math.max(n, o);
                        e.min = Math.min(t.pos, Math.min(n, o) - i),
                          e.max = Math.max(t.pos + t.len, s + i)
                      }
                    }),
                    e.res = !0) : e.followTouchMove && 1 === c ? this.runPointActions(e.normalize(t)) : l.length && (p || (e.selectionMarker = p = n({
                      destroy: s,
                      touch: !0
                    }, a.plotBox)),
                    e.pinchTranslate(l, h, f, p, m, d),
                    e.hasPinched = u,
                    e.scaleGroups(f, m),
                    e.res && (e.res = !1,
                      this.reset(!1, 0)))
              },
              touch: function (e, i) {
                var n, o = this.chart;
                o.index !== t.hoverChartIndex && this.onContainerMouseLeave({
                    relatedTarget: !0
                  }),
                  t.hoverChartIndex = o.index,
                  1 === e.touches.length ? (e = this.normalize(e),
                    o.isInsidePlot(e.chartX - o.plotLeft, e.chartY - o.plotTop) && !o.openMenu ? (i && this.runPointActions(e),
                      "touchmove" === e.type && (n = !!(i = this.pinchDown)[0] && 4 <= Math.sqrt(Math.pow(i[0].chartX - e.chartX, 2) + Math.pow(i[0].chartY - e.chartY, 2))),
                      r(n, !0) && this.pinch(e)) : i && this.reset()) : 2 === e.touches.length && this.pinch(e)
              },
              onContainerTouchStart: function (t) {
                this.zoomOption(t),
                  this.touch(t, !0)
              },
              onContainerTouchMove: function (t) {
                this.touch(t)
              },
              onDocumentTouchEnd: function (i) {
                e[t.hoverChartIndex] && e[t.hoverChartIndex].pointer.drop(i)
              }
            })
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.charts,
              n = t.css,
              o = t.doc,
              s = t.extend,
              r = t.noop,
              a = t.Pointer,
              l = t.removeEvent,
              h = t.win,
              c = t.wrap;
            if (!t.hasTouch && (h.PointerEvent || h.MSPointerEvent)) {
              var d = {},
                u = !!h.PointerEvent,
                p = function (e, n, o, s) {
                  "touch" !== e.pointerType && e.pointerType !== e.MSPOINTER_TYPE_TOUCH || !i[t.hoverChartIndex] || (s(e),
                    (s = i[t.hoverChartIndex].pointer)[n]({
                      type: o,
                      target: e.currentTarget,
                      preventDefault: r,
                      touches: function () {
                        var e = [];
                        return e.item = function (t) {
                            return this[t]
                          },
                          t.objectEach(d, function (t) {
                            e.push({
                              pageX: t.pageX,
                              pageY: t.pageY,
                              target: t.target
                            })
                          }),
                          e
                      }()
                    }))
                };
              s(a.prototype, {
                  onContainerPointerDown: function (t) {
                    p(t, "onContainerTouchStart", "touchstart", function (t) {
                      d[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.currentTarget
                      }
                    })
                  },
                  onContainerPointerMove: function (t) {
                    p(t, "onContainerTouchMove", "touchmove", function (t) {
                      d[t.pointerId] = {
                          pageX: t.pageX,
                          pageY: t.pageY
                        },
                        d[t.pointerId].target || (d[t.pointerId].target = t.currentTarget)
                    })
                  },
                  onDocumentPointerUp: function (t) {
                    p(t, "onDocumentTouchEnd", "touchend", function (t) {
                      delete d[t.pointerId]
                    })
                  },
                  batchMSEvents: function (t) {
                    t(this.chart.container, u ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown),
                      t(this.chart.container, u ? "pointermove" : "MSPointerMove", this.onContainerPointerMove),
                      t(o, u ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                  }
                }),
                c(a.prototype, "init", function (t, e, i) {
                  t.call(this, e, i),
                    this.hasZoom && n(e.container, {
                      "-ms-touch-action": "none",
                      "touch-action": "none"
                    })
                }),
                c(a.prototype, "setDOMEvents", function (t) {
                  t.apply(this),
                    (this.hasZoom || this.followTouchMove) && this.batchMSEvents(e)
                }),
                c(a.prototype, "destroy", function (t) {
                  this.batchMSEvents(l),
                    t.call(this)
                })
            }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.css,
              n = t.discardElement,
              o = t.defined,
              s = t.each,
              r = t.fireEvent,
              a = t.isFirefox,
              l = t.marginNames,
              h = t.merge,
              c = t.pick,
              d = t.setAnimation,
              u = t.stableSort,
              p = t.win,
              f = t.wrap;
            t.Legend = function (t, e) {
                this.init(t, e)
              },
              t.Legend.prototype = {
                init: function (t, i) {
                  this.chart = t,
                    this.setOptions(i),
                    i.enabled && (this.render(),
                      e(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                      }))
                },
                setOptions: function (t) {
                  var e = c(t.padding, 8);
                  this.options = t,
                    this.itemStyle = t.itemStyle,
                    this.itemHiddenStyle = h(this.itemStyle, t.itemHiddenStyle),
                    this.itemMarginTop = t.itemMarginTop || 0,
                    this.padding = e,
                    this.initialItemY = e - 5,
                    this.symbolWidth = c(t.symbolWidth, 16),
                    this.pages = []
                },
                update: function (t, e) {
                  var i = this.chart;
                  this.setOptions(h(!0, this.options, t)),
                    this.destroy(),
                    i.isDirtyLegend = i.isDirtyBox = !0,
                    c(e, !0) && i.redraw(),
                    r(this, "afterUpdate")
                },
                colorizeItem: function (t, e) {
                  t.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                  var i = this.options,
                    n = t.legendItem,
                    o = t.legendLine,
                    s = t.legendSymbol,
                    a = this.itemHiddenStyle.color,
                    l = (i = e ? i.itemStyle.color : a,
                      e && t.color || a),
                    h = t.options && t.options.marker,
                    c = {
                      fill: l
                    };
                  n && n.css({
                      fill: i,
                      color: i
                    }),
                    o && o.attr({
                      stroke: l
                    }),
                    s && (h && s.isMarker && (c = t.pointAttribs(),
                        e || (c.stroke = c.fill = a)),
                      s.attr(c)),
                    r(this, "afterColorizeItem", {
                      item: t,
                      visible: e
                    })
                },
                positionItem: function (t) {
                  var e = (i = this.options).symbolPadding,
                    i = !i.rtl,
                    n = (o = t._legendItemPos)[0],
                    o = o[1],
                    s = t.checkbox;
                  (t = t.legendGroup) && t.element && t.translate(i ? n : this.legendWidth - n - 2 * e - 4, o),
                    s && (s.x = n,
                      s.y = o)
                },
                destroyItem: function (t) {
                  var e = t.checkbox;
                  s(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (e) {
                      t[e] && (t[e] = t[e].destroy())
                    }),
                    e && n(t.checkbox)
                },
                destroy: function () {
                  function t(t) {
                    this[t] && (this[t] = this[t].destroy())
                  }
                  s(this.getAllItems(), function (e) {
                      s(["legendItem", "legendGroup"], t, e)
                    }),
                    s("clipRect up down pager nav box title group".split(" "), t, this),
                    this.display = null
                },
                positionCheckboxes: function () {
                  var t, e = this.group && this.group.alignAttr,
                    n = this.clipHeight || this.legendHeight,
                    o = this.titleHeight;
                  e && (t = e.translateY,
                    s(this.allItems, function (s) {
                      var r, a = s.checkbox;
                      a && (r = t + o + a.y + (this.scrollOffset || 0) + 3,
                        i(a, {
                          left: e.translateX + s.checkboxOffset + a.x - 20 + "px",
                          top: r + "px",
                          display: r > t - 6 && r < t + n - 6 ? "" : "none"
                        }))
                    }, this))
                },
                renderTitle: function () {
                  var t = this.options,
                    e = this.padding,
                    i = t.title,
                    n = 0;
                  i.text && (this.title || (this.title = this.chart.renderer.label(i.text, e - 3, e - 4, null, null, null, t.useHTML, null, "legend-title").attr({
                        zIndex: 1
                      }).css(i.style).add(this.group)),
                      n = (t = this.title.getBBox()).height,
                      this.offsetWidth = t.width,
                      this.contentGroup.attr({
                        translateY: n
                      })),
                    this.titleHeight = n
                },
                setText: function (e) {
                  var i = this.options;
                  e.legendItem.attr({
                    text: i.labelFormat ? t.format(i.labelFormat, e, this.chart.time) : i.labelFormatter.call(e)
                  })
                },
                renderItem: function (t) {
                  var e = this.chart,
                    i = e.renderer,
                    n = this.options,
                    o = this.symbolWidth,
                    s = n.symbolPadding,
                    r = this.itemStyle,
                    a = this.itemHiddenStyle,
                    l = "horizontal" === n.layout ? c(n.itemDistance, 20) : 0,
                    d = !n.rtl,
                    u = t.legendItem,
                    p = !t.series,
                    f = !p && t.series.drawLegendSymbol ? t.series : t,
                    g = f.options,
                    m = (l = o + s + l + ((g = this.createCheckboxForItem && g && g.showCheckbox) ? 20 : 0),
                      n.useHTML),
                    v = t.options.className;
                  u || (t.legendGroup = i.g("legend-item").addClass("highcharts-" + f.type + "-series highcharts-color-" + t.colorIndex + (v ? " " + v : "") + (p ? " highcharts-series-" + t.index : "")).attr({
                        zIndex: 1
                      }).add(this.scrollGroup),
                      t.legendItem = u = i.text("", d ? o + s : -s, this.baseline || 0, m).css(h(t.visible ? r : a)).attr({
                        align: d ? "left" : "right",
                        zIndex: 2
                      }).add(t.legendGroup),
                      this.baseline || (o = r.fontSize,
                        this.fontMetrics = i.fontMetrics(o, u),
                        this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop,
                        u.attr("y", this.baseline)),
                      this.symbolHeight = n.symbolHeight || this.fontMetrics.f,
                      f.drawLegendSymbol(this, t),
                      this.setItemEvents && this.setItemEvents(t, u, m),
                      g && this.createCheckboxForItem(t)),
                    this.colorizeItem(t, t.visible),
                    r.width || u.css({
                      width: (n.itemWidth || n.width || e.spacingBox.width) - l
                    }),
                    this.setText(t),
                    e = u.getBBox(),
                    t.itemWidth = t.checkboxOffset = n.itemWidth || t.legendItemWidth || e.width + l,
                    this.maxItemWidth = Math.max(this.maxItemWidth, t.itemWidth),
                    this.totalItemWidth += t.itemWidth,
                    this.itemHeight = t.itemHeight = Math.round(t.legendItemHeight || e.height || this.symbolHeight)
                },
                layoutItem: function (t) {
                  var e = this.options,
                    i = this.padding,
                    n = "horizontal" === e.layout,
                    o = t.itemHeight,
                    s = e.itemMarginBottom || 0,
                    r = this.itemMarginTop,
                    a = n ? c(e.itemDistance, 20) : 0,
                    l = e.width,
                    h = l || this.chart.spacingBox.width - 2 * i - e.x;
                  e = e.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : t.itemWidth;
                  n && this.itemX - i + e > h && (this.itemX = i,
                      this.itemY += r + this.lastLineHeight + s,
                      this.lastLineHeight = 0),
                    this.lastItemY = r + this.itemY + s,
                    this.lastLineHeight = Math.max(o, this.lastLineHeight),
                    t._legendItemPos = [this.itemX, this.itemY],
                    n ? this.itemX += e : (this.itemY += r + o + s,
                      this.lastLineHeight = o),
                    this.offsetWidth = l || Math.max((n ? this.itemX - i - (t.checkbox ? 0 : a) : e) + i, this.offsetWidth)
                },
                getAllItems: function () {
                  var t = [];
                  return s(this.chart.series, function (e) {
                      var i = e && e.options;
                      e && c(i.showInLegend, !o(i.linkedTo) && void 0, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
                    }),
                    r(this, "afterGetAllItems", {
                      allItems: t
                    }),
                    t
                },
                getAlignment: function () {
                  var t = this.options;
                  return t.floating ? "" : t.align.charAt(0) + t.verticalAlign.charAt(0) + t.layout.charAt(0)
                },
                adjustMargins: function (t, e) {
                  var i = this.chart,
                    n = this.options,
                    r = this.getAlignment();
                  r && s([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (s, a) {
                    s.test(r) && !o(t[a]) && (i[l[a]] = Math.max(i[l[a]], i.legend[(a + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][a] * n[a % 2 ? "x" : "y"] + c(n.margin, 12) + e[a] + (0 === a && void 0 !== i.options.title.margin ? i.titleOffset + i.options.title.margin : 0)))
                  })
                },
                render: function () {
                  var t, e, i, n, o = this.chart,
                    r = o.renderer,
                    a = this.group,
                    l = this.box,
                    c = this.options,
                    d = this.padding;
                  this.itemX = d,
                    this.itemY = this.initialItemY,
                    this.lastItemY = this.offsetWidth = 0,
                    a || (this.group = a = r.g("legend").attr({
                        zIndex: 7
                      }).add(),
                      this.contentGroup = r.g().attr({
                        zIndex: 1
                      }).add(a),
                      this.scrollGroup = r.g().add(this.contentGroup)),
                    this.renderTitle(),
                    t = this.getAllItems(),
                    u(t, function (t, e) {
                      return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                    }),
                    c.reversed && t.reverse(),
                    this.allItems = t,
                    this.display = e = !!t.length,
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0,
                    s(t, this.renderItem, this),
                    s(t, this.layoutItem, this),
                    i = (c.width || this.offsetWidth) + d,
                    n = this.lastItemY + this.lastLineHeight + this.titleHeight,
                    n = this.handleOverflow(n),
                    n += d,
                    l || (this.box = l = r.rect().addClass("highcharts-legend-box").attr({
                        r: c.borderRadius
                      }).add(a),
                      l.isNew = !0),
                    l.attr({
                      stroke: c.borderColor,
                      "stroke-width": c.borderWidth || 0,
                      fill: c.backgroundColor || "none"
                    }).shadow(c.shadow),
                    0 < i && 0 < n && (l[l.isNew ? "attr" : "animate"](l.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: i,
                        height: n
                      }, l.strokeWidth())),
                      l.isNew = !1),
                    l[e ? "show" : "hide"](),
                    this.legendWidth = i,
                    this.legendHeight = n,
                    s(t, this.positionItem, this),
                    e && (r = o.spacingBox,
                      /(lth|ct|rth)/.test(this.getAlignment()) && (r = h(r, {
                        y: r.y + o.titleOffset + o.options.title.margin
                      })),
                      a.align(h(c, {
                        width: i,
                        height: n
                      }), !0, r)),
                    o.isResizing || this.positionCheckboxes()
                },
                handleOverflow: function (t) {
                  var e, i, n = this,
                    o = (h = this.chart).renderer,
                    r = this.options,
                    a = r.y,
                    l = this.padding,
                    h = h.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - l,
                    d = (a = r.maxHeight,
                      this.clipRect),
                    u = r.navigation,
                    p = c(u.animation, !0),
                    f = u.arrowSize || 12,
                    g = this.nav,
                    m = this.pages,
                    v = this.allItems,
                    y = function (t) {
                      "number" == typeof t ? d.attr({
                          height: t
                        }) : d && (n.clipRect = d.destroy(),
                          n.contentGroup.clip()),
                        n.contentGroup.div && (n.contentGroup.div.style.clip = t ? "rect(" + l + "px,9999px," + (l + t) + "px,0)" : "auto")
                    };
                  return "horizontal" !== r.layout || "middle" === r.verticalAlign || r.floating || (h /= 2),
                    a && (h = Math.min(h, a)),
                    m.length = 0,
                    t > h && !1 !== u.enabled ? (this.clipHeight = e = Math.max(h - 20 - this.titleHeight - l, 0),
                      this.currentPage = c(this.currentPage, 1),
                      this.fullHeight = t,
                      s(v, function (t, n) {
                        var o = t._legendItemPos[1],
                          s = Math.round(t.legendItem.getBBox().height),
                          r = m.length;
                        (!r || o - m[r - 1] > e && (i || o) !== m[r - 1]) && (m.push(i || o),
                          r++),
                        t.pageIx = r - 1,
                          i && (v[n - 1].pageIx = r - 1),
                          n === v.length - 1 && o + s - m[r - 1] > e && (m.push(o),
                            t.pageIx = r),
                          o !== i && (i = o)
                      }),
                      d || (d = n.clipRect = o.clipRect(0, l, 9999, 0),
                        n.contentGroup.clip(d)),
                      y(e),
                      g || (this.nav = g = o.g().attr({
                          zIndex: 1
                        }).add(this.group),
                        this.up = o.symbol("triangle", 0, 0, f, f).on("click", function () {
                          n.scroll(-1, p)
                        }).add(g),
                        this.pager = o.text("", 15, 10).addClass("highcharts-legend-navigation").css(u.style).add(g),
                        this.down = o.symbol("triangle-down", 0, 0, f, f).on("click", function () {
                          n.scroll(1, p)
                        }).add(g)),
                      n.scroll(0),
                      t = h) : g && (y(),
                      this.nav = g.destroy(),
                      this.scrollGroup.attr({
                        translateY: 1
                      }),
                      this.clipHeight = 0),
                    t
                },
                scroll: function (t, e) {
                  var i = this.pages,
                    n = i.length;
                  t = this.currentPage + t;
                  var o = this.clipHeight,
                    s = this.options.navigation,
                    r = this.pager,
                    a = this.padding;
                  t > n && (t = n),
                    0 < t && (void 0 !== e && d(e, this.chart),
                      this.nav.attr({
                        translateX: a,
                        translateY: o + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                      }),
                      this.up.attr({
                        class: 1 === t ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                      }),
                      r.attr({
                        text: t + "/" + n
                      }),
                      this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        class: t === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                      }),
                      this.up.attr({
                        fill: 1 === t ? s.inactiveColor : s.activeColor
                      }).css({
                        cursor: 1 === t ? "default" : "pointer"
                      }),
                      this.down.attr({
                        fill: t === n ? s.inactiveColor : s.activeColor
                      }).css({
                        cursor: t === n ? "default" : "pointer"
                      }),
                      this.scrollOffset = -i[t - 1] + this.initialItemY,
                      this.scrollGroup.animate({
                        translateY: this.scrollOffset
                      }),
                      this.currentPage = t,
                      this.positionCheckboxes())
                }
              },
              t.LegendSymbolMixin = {
                drawRectangle: function (t, e) {
                  var i = t.symbolHeight,
                    n = t.options.squareSymbol;
                  e.legendSymbol = this.chart.renderer.rect(n ? (t.symbolWidth - i) / 2 : 0, t.baseline - i + 1, n ? i : t.symbolWidth, i, c(t.options.symbolRadius, i / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                  }).add(e.legendGroup)
                },
                drawLineMarker: function (t) {
                  var e, i = this.options,
                    n = i.marker,
                    o = t.symbolWidth,
                    s = t.symbolHeight,
                    r = s / 2,
                    a = this.chart.renderer,
                    l = this.legendGroup;
                  t = t.baseline - Math.round(.3 * t.fontMetrics.b),
                    e = {
                      "stroke-width": i.lineWidth || 0
                    },
                    i.dashStyle && (e.dashstyle = i.dashStyle),
                    this.legendLine = a.path(["M", 0, t, "L", o, t]).addClass("highcharts-graph").attr(e).add(l),
                    n && !1 !== n.enabled && (i = Math.min(c(n.radius, r), r),
                      0 === this.symbol.indexOf("url") && (n = h(n, {
                          width: s,
                          height: s
                        }),
                        i = 0),
                      this.legendSymbol = n = a.symbol(this.symbol, o / 2 - i, t - i, 2 * i, 2 * i, n).addClass("highcharts-point").add(l),
                      n.isMarker = !0)
                }
              },
              (/Trident\/7\.0/.test(p.navigator.userAgent) || a) && f(t.Legend.prototype, "positionItem", function (t, e) {
                var i = this,
                  n = function () {
                    e._legendItemPos && t.call(i, e)
                  };
                n(),
                  setTimeout(n)
              })
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.animate,
              n = t.animObject,
              o = t.attr,
              s = t.doc,
              r = t.Axis,
              a = t.createElement,
              l = t.defaultOptions,
              h = t.discardElement,
              c = t.charts,
              d = t.css,
              u = t.defined,
              p = t.each,
              f = t.extend,
              g = t.find,
              m = t.fireEvent,
              v = t.grep,
              y = t.isNumber,
              x = t.isObject,
              b = t.isString,
              w = t.Legend,
              k = t.marginNames,
              T = t.merge,
              S = t.objectEach,
              C = t.Pointer,
              A = t.pick,
              M = t.pInt,
              E = t.removeEvent,
              D = t.seriesTypes,
              O = t.splat,
              P = t.syncTimeout,
              I = t.win,
              _ = t.Chart = function () {
                this.getArgs.apply(this, arguments)
              };
            t.chart = function (t, e, i) {
                return new _(t, e, i)
              },
              f(_.prototype, {
                callbacks: [],
                getArgs: function () {
                  var t = [].slice.call(arguments);
                  (b(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()),
                  this.init(t[0], t[1])
                },
                init: function (i, n) {
                  var o, s, r = i.series,
                    a = i.plotOptions || {};
                  m(this, "init", {
                    args: arguments
                  }, function () {
                    for (s in i.series = null,
                      (o = T(l, i)).plotOptions)
                      o.plotOptions[s].tooltip = a[s] && T(a[s].tooltip) || void 0;
                    o.tooltip.userOptions = i.chart && i.chart.forExport && i.tooltip.userOptions || i.tooltip,
                      o.series = i.series = r,
                      this.userOptions = i;
                    var h = o.chart,
                      d = h.events;
                    this.margin = [],
                      this.spacing = [],
                      this.bounds = {
                        h: {},
                        v: {}
                      },
                      this.labelCollectors = [],
                      this.callback = n,
                      this.isResizing = 0,
                      this.options = o,
                      this.axes = [],
                      this.series = [],
                      this.time = i.time && t.keys(i.time).length ? new t.Time(i.time) : t.time,
                      this.hasCartesianSeries = h.showAxes;
                    var u = this;
                    u.index = c.length,
                      c.push(u),
                      t.chartCount++,
                      d && S(d, function (t, i) {
                        e(u, i, t)
                      }),
                      u.xAxis = [],
                      u.yAxis = [],
                      u.pointCount = u.colorCounter = u.symbolCounter = 0,
                      m(u, "afterInit"),
                      u.firstRender()
                  })
                },
                initSeries: function (e) {
                  var i = this.options.chart;
                  return (i = D[e.type || i.type || i.defaultSeriesType]) || t.error(17, !0),
                    (i = new i).init(this, e),
                    i
                },
                orderSeries: function (t) {
                  var e = this.series;
                  for (t = t || 0; t < e.length; t++)
                    e[t] && (e[t].index = t,
                      e[t].name = e[t].getName())
                },
                isInsidePlot: function (t, e, i) {
                  var n = i ? e : t;
                  return t = i ? t : e,
                    0 <= n && n <= this.plotWidth && 0 <= t && t <= this.plotHeight
                },
                redraw: function (e) {
                  m(this, "beforeRedraw");
                  var i, n, o, s = this.axes,
                    r = this.series,
                    a = this.pointer,
                    l = this.legend,
                    h = this.isDirtyLegend,
                    c = this.hasCartesianSeries,
                    d = this.isDirtyBox,
                    u = this.renderer,
                    g = u.isHidden(),
                    v = [];
                  for (this.setResponsive && this.setResponsive(!1),
                    t.setAnimation(e, this),
                    g && this.temporaryDisplay(),
                    this.layOutTitles(),
                    e = r.length; e--;)
                    if ((o = r[e]).options.stacking && (i = !0,
                        o.isDirty)) {
                      n = !0;
                      break
                    }
                  if (n)
                    for (e = r.length; e--;)
                      (o = r[e]).options.stacking && (o.isDirty = !0);
                  p(r, function (t) {
                      t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(),
                          h = !0),
                        t.isDirtyData && m(t, "updatedData")
                    }),
                    h && l.options.enabled && (l.render(),
                      this.isDirtyLegend = !1),
                    i && this.getStacks(),
                    c && p(s, function (t) {
                      t.updateNames(),
                        t.setScale()
                    }),
                    this.getMargins(),
                    c && (p(s, function (t) {
                        t.isDirty && (d = !0)
                      }),
                      p(s, function (t) {
                        var e = t.min + "," + t.max;
                        t.extKey !== e && (t.extKey = e,
                            v.push(function () {
                              m(t, "afterSetExtremes", f(t.eventArgs, t.getExtremes())),
                                delete t.eventArgs
                            })),
                          (d || i) && t.redraw()
                      })),
                    d && this.drawChartBox(),
                    m(this, "predraw"),
                    p(r, function (t) {
                      (d || t.isDirty) && t.visible && t.redraw(),
                        t.isDirtyData = !1
                    }),
                    a && a.reset(!0),
                    u.draw(),
                    m(this, "redraw"),
                    m(this, "render"),
                    g && this.temporaryDisplay(!0),
                    p(v, function (t) {
                      t.call()
                    })
                },
                get: function (t) {
                  function e(e) {
                    return e.id === t || e.options && e.options.id === t
                  }
                  var i, n, o = this.series;
                  for (i = g(this.axes, e) || g(this.series, e),
                    n = 0; !i && n < o.length; n++)
                    i = g(o[n].points || [], e);
                  return i
                },
                getAxes: function () {
                  var t = this,
                    e = (i = this.options).xAxis = O(i.xAxis || {}),
                    i = i.yAxis = O(i.yAxis || {});
                  m(this, "getAxes"),
                    p(e, function (t, e) {
                      t.index = e,
                        t.isX = !0
                    }),
                    p(i, function (t, e) {
                      t.index = e
                    }),
                    e = e.concat(i),
                    p(e, function (e) {
                      new r(t, e)
                    }),
                    m(this, "afterGetAxes")
                },
                getSelectedPoints: function () {
                  var t = [];
                  return p(this.series, function (e) {
                      t = t.concat(v(e.data || [], function (t) {
                        return t.selected
                      }))
                    }),
                    t
                },
                getSelectedSeries: function () {
                  return v(this.series, function (t) {
                    return t.selected
                  })
                },
                setTitle: function (t, e, i) {
                  var n, o = this,
                    s = o.options;
                  n = s.title = T({
                      style: {
                        color: "#333333",
                        fontSize: s.isStock ? "16px" : "18px"
                      }
                    }, s.title, t),
                    s = s.subtitle = T({
                      style: {
                        color: "#666666"
                      }
                    }, s.subtitle, e),
                    p([
                      ["title", t, n],
                      ["subtitle", e, s]
                    ], function (t, e) {
                      var i = t[0],
                        n = o[i],
                        s = t[1];
                      t = t[2],
                        n && s && (o[i] = n = n.destroy()),
                        t && !n && (o[i] = o.renderer.text(t.text, 0, 0, t.useHTML).attr({
                            align: t.align,
                            class: "highcharts-" + i,
                            zIndex: t.zIndex || 4
                          }).add(),
                          o[i].update = function (t) {
                            o.setTitle(!e && t, e && t)
                          },
                          o[i].css(t.style))
                    }),
                    o.layOutTitles(i)
                },
                layOutTitles: function (t) {
                  var e, i = 0,
                    n = this.renderer,
                    o = this.spacingBox;
                  p(["title", "subtitle"], function (t) {
                      var e, s = this[t],
                        r = this.options[t];
                      t = "title" === t ? -3 : r.verticalAlign ? 0 : i + 2,
                        s && (e = r.style.fontSize,
                          e = n.fontMetrics(e, s).b,
                          s.css({
                            width: (r.width || o.width + r.widthAdjust) + "px"
                          }).align(f({
                            y: t + e
                          }, r), !1, "spacingBox"),
                          r.floating || r.verticalAlign || (i = Math.ceil(i + s.getBBox(r.useHTML).height)))
                    }, this),
                    e = this.titleOffset !== i,
                    this.titleOffset = i,
                    !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e,
                      this.hasRendered && A(t, !0) && this.isDirtyBox && this.redraw())
                },
                getChartSize: function () {
                  var e = (i = this.options.chart).width,
                    i = i.height,
                    n = this.renderTo;
                  u(e) || (this.containerWidth = t.getStyle(n, "width")),
                    u(i) || (this.containerHeight = t.getStyle(n, "height")),
                    this.chartWidth = Math.max(0, e || this.containerWidth || 600),
                    this.chartHeight = Math.max(0, t.relativeLength(i, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                },
                temporaryDisplay: function (e) {
                  var i = this.renderTo;
                  if (e)
                    for (; i && i.style;)
                      i.hcOrigStyle && (t.css(i, i.hcOrigStyle),
                        delete i.hcOrigStyle),
                      i.hcOrigDetached && (s.body.removeChild(i),
                        i.hcOrigDetached = !1),
                      i = i.parentNode;
                  else
                    for (; i && i.style && (s.body.contains(i) || i.parentNode || (i.hcOrigDetached = !0,
                          s.body.appendChild(i)),
                        ("none" === t.getStyle(i, "display", !1) || i.hcOricDetached) && (i.hcOrigStyle = {
                            display: i.style.display,
                            height: i.style.height,
                            overflow: i.style.overflow
                          },
                          e = {
                            display: "block",
                            overflow: "hidden"
                          },
                          i !== this.renderTo && (e.height = 0),
                          t.css(i, e),
                          i.offsetWidth || i.style.setProperty("display", "block", "important")),
                        (i = i.parentNode) !== s.body);)
                  ;
                },
                setClassName: function (t) {
                  this.container.className = "highcharts-container " + (t || "")
                },
                getContainer: function () {
                  var e, i, n, r = this.options,
                    l = r.chart;
                  e = this.renderTo;
                  var h, d = t.uniqueKey();
                  e || (this.renderTo = e = l.renderTo),
                    b(e) && (this.renderTo = e = s.getElementById(e)),
                    e || t.error(13, !0),
                    i = M(o(e, "data-highcharts-chart")),
                    y(i) && c[i] && c[i].hasRendered && c[i].destroy(),
                    o(e, "data-highcharts-chart", this.index),
                    e.innerHTML = "",
                    l.skipClone || e.offsetWidth || this.temporaryDisplay(),
                    this.getChartSize(),
                    i = this.chartWidth,
                    n = this.chartHeight,
                    h = f({
                      position: "relative",
                      overflow: "hidden",
                      width: i + "px",
                      height: n + "px",
                      textAlign: "left",
                      lineHeight: "normal",
                      zIndex: 0,
                      "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    }, l.style),
                    this.container = e = a("div", {
                      id: d
                    }, h, e),
                    this._cursor = e.style.cursor,
                    this.renderer = new(t[l.renderer] || t.Renderer)(e, i, n, null, l.forExport, r.exporting && r.exporting.allowHTML),
                    this.setClassName(l.className),
                    this.renderer.setStyle(l.style),
                    this.renderer.chartIndex = this.index,
                    m(this, "afterGetContainer")
                },
                getMargins: function (t) {
                  var e = this.spacing,
                    i = this.margin,
                    n = this.titleOffset;
                  this.resetMargins(),
                    n && !u(i[0]) && (this.plotTop = Math.max(this.plotTop, n + this.options.title.margin + e[0])),
                    this.legend && this.legend.display && this.legend.adjustMargins(i, e),
                    this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value),
                    this.adjustPlotArea && this.adjustPlotArea(),
                    t || this.getAxisMargins()
                },
                getAxisMargins: function () {
                  var t = this,
                    e = t.axisOffset = [0, 0, 0, 0],
                    i = t.margin;
                  t.hasCartesianSeries && p(t.axes, function (t) {
                      t.visible && t.getOffset()
                    }),
                    p(k, function (n, o) {
                      u(i[o]) || (t[n] += e[o])
                    }),
                    t.setChartSize()
                },
                reflow: function (e) {
                  var i = this,
                    n = i.options.chart,
                    o = i.renderTo,
                    r = u(n.width) && u(n.height),
                    a = n.width || t.getStyle(o, "width");
                  n = n.height || t.getStyle(o, "height"),
                    o = e ? e.target : I;
                  r || i.isPrinting || !a || !n || o !== I && o !== s || (a === i.containerWidth && n === i.containerHeight || (t.clearTimeout(i.reflowTimeout),
                      i.reflowTimeout = P(function () {
                        i.container && i.setSize(void 0, void 0, !1)
                      }, e ? 100 : 0)),
                    i.containerWidth = a,
                    i.containerHeight = n)
                },
                setReflow: function (t) {
                  var i = this;
                  !1 === t || this.unbindReflow ? !1 === t && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = e(I, "resize", function (t) {
                      i.reflow(t)
                    }),
                    e(this, "destroy", this.unbindReflow))
                },
                setSize: function (e, o, s) {
                  var r = this,
                    a = r.renderer;
                  r.isResizing += 1,
                    t.setAnimation(s, r),
                    r.oldChartHeight = r.chartHeight,
                    r.oldChartWidth = r.chartWidth,
                    void 0 !== e && (r.options.chart.width = e),
                    void 0 !== o && (r.options.chart.height = o),
                    r.getChartSize(),
                    ((e = a.globalAnimation) ? i : d)(r.container, {
                      width: r.chartWidth + "px",
                      height: r.chartHeight + "px"
                    }, e),
                    r.setChartSize(!0),
                    a.setSize(r.chartWidth, r.chartHeight, s),
                    p(r.axes, function (t) {
                      t.isDirty = !0,
                        t.setScale()
                    }),
                    r.isDirtyLegend = !0,
                    r.isDirtyBox = !0,
                    r.layOutTitles(),
                    r.getMargins(),
                    r.redraw(s),
                    r.oldChartHeight = null,
                    m(r, "resize"),
                    P(function () {
                      r && m(r, "endResize", null, function () {
                        --r.isResizing
                      })
                    }, n(e).duration)
                },
                setChartSize: function (t) {
                  var e, i, n, o, s = this.inverted,
                    r = this.renderer,
                    a = this.chartWidth,
                    l = this.chartHeight,
                    h = this.options.chart,
                    c = this.spacing,
                    d = this.clipOffset;
                  this.plotLeft = e = Math.round(this.plotLeft),
                    this.plotTop = i = Math.round(this.plotTop),
                    this.plotWidth = n = Math.max(0, Math.round(a - e - this.marginRight)),
                    this.plotHeight = o = Math.max(0, Math.round(l - i - this.marginBottom)),
                    this.plotSizeX = s ? o : n,
                    this.plotSizeY = s ? n : o,
                    this.plotBorderWidth = h.plotBorderWidth || 0,
                    this.spacingBox = r.spacingBox = {
                      x: c[3],
                      y: c[0],
                      width: a - c[3] - c[1],
                      height: l - c[0] - c[2]
                    },
                    this.plotBox = r.plotBox = {
                      x: e,
                      y: i,
                      width: n,
                      height: o
                    },
                    a = 2 * Math.floor(this.plotBorderWidth / 2),
                    s = Math.ceil(Math.max(a, d[3]) / 2),
                    r = Math.ceil(Math.max(a, d[0]) / 2),
                    this.clipBox = {
                      x: s,
                      y: r,
                      width: Math.floor(this.plotSizeX - Math.max(a, d[1]) / 2 - s),
                      height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, d[2]) / 2 - r))
                    },
                    t || p(this.axes, function (t) {
                      t.setAxisSize(),
                        t.setAxisTranslation()
                    }),
                    m(this, "afterSetChartSize", {
                      skipAxes: t
                    })
                },
                resetMargins: function () {
                  var t = this,
                    e = t.options.chart;
                  p(["margin", "spacing"], function (i) {
                      var n = e[i],
                        o = x(n) ? n : [n, n, n, n];
                      p(["Top", "Right", "Bottom", "Left"], function (n, s) {
                        t[i][s] = A(e[i + n], o[s])
                      })
                    }),
                    p(k, function (e, i) {
                      t[e] = A(t.margin[i], t.spacing[i])
                    }),
                    t.axisOffset = [0, 0, 0, 0],
                    t.clipOffset = [0, 0, 0, 0]
                },
                drawChartBox: function () {
                  var t, e, i = this.options.chart,
                    n = this.renderer,
                    o = this.chartWidth,
                    s = this.chartHeight,
                    r = this.chartBackground,
                    a = this.plotBackground,
                    l = this.plotBorder,
                    h = this.plotBGImage,
                    c = i.backgroundColor,
                    d = i.plotBackgroundColor,
                    u = i.plotBackgroundImage,
                    p = this.plotLeft,
                    f = this.plotTop,
                    g = this.plotWidth,
                    v = this.plotHeight,
                    y = this.plotBox,
                    x = this.clipRect,
                    b = this.clipBox,
                    w = "animate";
                  r || (this.chartBackground = r = n.rect().addClass("highcharts-background").add(),
                      w = "attr"),
                    e = (t = i.borderWidth || 0) + (i.shadow ? 8 : 0),
                    c = {
                      fill: c || "none"
                    },
                    (t || r["stroke-width"]) && (c.stroke = i.borderColor,
                      c["stroke-width"] = t),
                    r.attr(c).shadow(i.shadow),
                    r[w]({
                      x: e / 2,
                      y: e / 2,
                      width: o - e - t % 2,
                      height: s - e - t % 2,
                      r: i.borderRadius
                    }),
                    w = "animate",
                    a || (w = "attr",
                      this.plotBackground = a = n.rect().addClass("highcharts-plot-background").add()),
                    a[w](y),
                    a.attr({
                      fill: d || "none"
                    }).shadow(i.plotShadow),
                    u && (h ? h.animate(y) : this.plotBGImage = n.image(u, p, f, g, v).add()),
                    x ? x.animate({
                      width: b.width,
                      height: b.height
                    }) : this.clipRect = n.clipRect(b),
                    w = "animate",
                    l || (w = "attr",
                      this.plotBorder = l = n.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                      }).add()),
                    l.attr({
                      stroke: i.plotBorderColor,
                      "stroke-width": i.plotBorderWidth || 0,
                      fill: "none"
                    }),
                    l[w](l.crisp({
                      x: p,
                      y: f,
                      width: g,
                      height: v
                    }, -l.strokeWidth())),
                    this.isDirtyBox = !1,
                    m(this, "afterDrawChartBox")
                },
                propFromSeries: function () {
                  var t, e, i, n = this,
                    o = n.options.chart,
                    s = n.options.series;
                  p(["inverted", "angular", "polar"], function (r) {
                    for (t = D[o.type || o.defaultSeriesType],
                      i = o[r] || t && t.prototype[r],
                      e = s && s.length; !i && e--;)
                      (t = D[s[e].type]) && t.prototype[r] && (i = !0);
                    n[r] = i
                  })
                },
                linkSeries: function () {
                  var t = this,
                    e = t.series;
                  p(e, function (t) {
                      t.linkedSeries.length = 0
                    }),
                    p(e, function (e) {
                      var i = e.options.linkedTo;
                      b(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && i.linkedParent !== e && (i.linkedSeries.push(e),
                        e.linkedParent = i,
                        e.visible = A(e.options.visible, i.options.visible, e.visible))
                    }),
                    m(this, "afterLinkSeries")
                },
                renderSeries: function () {
                  p(this.series, function (t) {
                    t.translate(),
                      t.render()
                  })
                },
                renderLabels: function () {
                  var t = this,
                    e = t.options.labels;
                  e.items && p(e.items, function (i) {
                    var n = f(e.style, i.style),
                      o = M(n.left) + t.plotLeft,
                      s = M(n.top) + t.plotTop + 12;
                    delete n.left,
                      delete n.top,
                      t.renderer.text(i.html, o, s).attr({
                        zIndex: 2
                      }).css(n).add()
                  })
                },
                render: function () {
                  var t, e, i, n = this.axes,
                    o = this.renderer,
                    s = this.options;
                  this.setTitle(),
                    this.legend = new w(this, s.legend),
                    this.getStacks && this.getStacks(),
                    this.getMargins(!0),
                    this.setChartSize(),
                    s = this.plotWidth,
                    t = this.plotHeight = Math.max(this.plotHeight - 21, 0),
                    p(n, function (t) {
                      t.setScale()
                    }),
                    this.getAxisMargins(),
                    e = 1.1 < s / this.plotWidth,
                    i = 1.05 < t / this.plotHeight,
                    (e || i) && (p(n, function (t) {
                        (t.horiz && e || !t.horiz && i) && t.setTickInterval(!0)
                      }),
                      this.getMargins()),
                    this.drawChartBox(),
                    this.hasCartesianSeries && p(n, function (t) {
                      t.visible && t.render()
                    }),
                    this.seriesGroup || (this.seriesGroup = o.g("series-group").attr({
                      zIndex: 3
                    }).add()),
                    this.renderSeries(),
                    this.renderLabels(),
                    this.addCredits(),
                    this.setResponsive && this.setResponsive(),
                    this.hasRendered = !0
                },
                addCredits: function (t) {
                  var e = this;
                  (t = T(!0, this.options.credits, t)).enabled && !this.credits && (this.credits = this.renderer.text(t.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                      t.href && (I.location.href = t.href)
                    }).attr({
                      align: t.position.align,
                      zIndex: 8
                    }).css(t.style).add().align(t.position),
                    this.credits.update = function (t) {
                      e.credits = e.credits.destroy(),
                        e.addCredits(t)
                    }
                  )
                },
                destroy: function () {
                  var e, i = this,
                    n = i.axes,
                    o = i.series,
                    s = i.container,
                    r = s && s.parentNode;
                  for (m(i, "destroy"),
                    i.renderer.forExport ? t.erase(c, i) : c[i.index] = void 0,
                    t.chartCount--,
                    i.renderTo.removeAttribute("data-highcharts-chart"),
                    E(i),
                    e = n.length; e--;)
                    n[e] = n[e].destroy();
                  for (this.scroller && this.scroller.destroy && this.scroller.destroy(),
                    e = o.length; e--;)
                    o[e] = o[e].destroy();
                  p("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (t) {
                      var e = i[t];
                      e && e.destroy && (i[t] = e.destroy())
                    }),
                    s && (s.innerHTML = "",
                      E(s),
                      r && h(s)),
                    S(i, function (t, e) {
                      delete i[e]
                    })
                },
                firstRender: function () {
                  var t = this,
                    e = t.options;
                  t.isReadyToRender && !t.isReadyToRender() || (t.getContainer(),
                    t.resetMargins(),
                    t.setChartSize(),
                    t.propFromSeries(),
                    t.getAxes(),
                    p(e.series || [], function (e) {
                      t.initSeries(e)
                    }),
                    t.linkSeries(),
                    m(t, "beforeRender"),
                    C && (t.pointer = new C(t, e)),
                    t.render(),
                    !t.renderer.imgCount && t.onload && t.onload(),
                    t.temporaryDisplay(!0))
                },
                onload: function () {
                  p([this.callback].concat(this.callbacks), function (t) {
                      t && void 0 !== this.index && t.apply(this, [this])
                    }, this),
                    m(this, "load"),
                    m(this, "render"),
                    u(this.index) && this.setReflow(this.options.chart.reflow),
                    this.onload = null
                }
              })
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.Chart,
              n = t.each;
            e(i, "afterSetChartSize", function (e) {
                var i = this.options.chart.scrollablePlotArea;
                (i = i && i.minWidth) && (this.scrollablePixels = i = Math.max(0, i - this.chartWidth)) && (this.plotWidth += i,
                  this.clipBox.width += i,
                  e.skipAxes || n(this.axes, function (e) {
                    1 === e.side ? e.getPlotLinePath = function () {
                        var i, n = this.right;
                        return this.right = n - e.chart.scrollablePixels,
                          i = t.Axis.prototype.getPlotLinePath.apply(this, arguments),
                          this.right = n,
                          i
                      } :
                      (e.setAxisSize(),
                        e.setAxisTranslation())
                  }))
              }),
              e(i, "render", function () {
                this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(),
                  this.applyFixed()) : this.fixedDiv && this.applyFixed()
              }),
              i.prototype.setUpScrolling = function () {
                this.scrollingContainer = t.createElement("div", {
                    className: "highcharts-scrolling"
                  }, {
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch"
                  }, this.renderTo),
                  this.innerContainer = t.createElement("div", {
                    className: "highcharts-inner-container"
                  }, null, this.scrollingContainer),
                  this.innerContainer.appendChild(this.container),
                  this.setUpScrolling = null
              },
              i.prototype.applyFixed = function () {
                var e, i, n = this.container;
                this.fixedDiv || (this.fixedDiv = t.createElement("div", {
                      className: "highcharts-fixed"
                    }, {
                      position: "absolute",
                      overflow: "hidden",
                      pointerEvents: "none",
                      zIndex: 2
                    }, null, !0),
                    this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild),
                    this.fixedRenderer = e = new t.Renderer(this.fixedDiv, 0, 0),
                    this.scrollableMask = e.path().attr({
                      fill: t.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                      zIndex: -1
                    }).addClass("highcharts-scrollable-mask").add(),
                    t.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title"], function (i) {
                      t.each(n.querySelectorAll(i), function (t) {
                        e.box.appendChild(t),
                          t.style.pointerEvents = "auto"
                      })
                    })),
                  this.fixedRenderer.setSize(this.chartWidth, this.chartHeight),
                  i = this.chartWidth + this.scrollablePixels,
                  this.container.style.width = i + "px",
                  this.renderer.boxWrapper.attr({
                    width: i,
                    height: this.chartHeight,
                    viewBox: [0, 0, i, this.chartHeight].join(" ")
                  }),
                  (i = this.options.chart.scrollablePlotArea).scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * i.scrollPositionX);
                var o = this.axisOffset;
                i = this.plotTop - o[0] - 1;
                o = this.plotTop + this.plotHeight + o[2];
                var s = this.plotLeft + this.plotWidth - this.scrollablePixels;
                this.scrollableMask.attr({
                  d: this.scrollablePixels ? ["M", 0, i, "L", this.plotLeft - 1, i, "L", this.plotLeft - 1, o, "L", 0, o, "Z", "M", s, i, "L", this.chartWidth, i, "L", this.chartWidth, o, "L", s, o, "Z"] : ["M", 0, 0]
                })
              }
          }(h),
          function (t) {
            var e, i = t.each,
              n = t.extend,
              o = t.erase,
              s = t.fireEvent,
              r = t.format,
              a = t.isArray,
              l = t.isNumber,
              h = t.pick,
              c = t.removeEvent;
            t.Point = e = function () {},
              t.Point.prototype = {
                init: function (t, e, i) {
                  return this.series = t,
                    this.color = t.color,
                    this.applyOptions(e, i),
                    t.options.colorByPoint ? (e = t.options.colors || t.chart.options.colors,
                      this.color = this.color || e[t.colorCounter],
                      e = e.length,
                      i = t.colorCounter,
                      t.colorCounter++,
                      t.colorCounter === e && (t.colorCounter = 0)) : i = t.colorIndex,
                    this.colorIndex = h(this.colorIndex, i),
                    t.chart.pointCount++,
                    s(this, "afterInit"),
                    this
                },
                applyOptions: function (t, i) {
                  var o = this.series,
                    s = o.options.pointValKey || o.pointValKey;
                  return t = e.prototype.optionsToObject.call(this, t),
                    n(this, t),
                    this.options = this.options ? n(this.options, t) : t,
                    t.group && delete this.group,
                    s && (this.y = this[s]),
                    this.isNull = h(this.isValid && !this.isValid(), null === this.x || !l(this.y, !0)),
                    this.selected && (this.state = "select"),
                    "name" in this && void 0 === i && o.xAxis && o.xAxis.hasNames && (this.x = o.xAxis.nameToX(this)),
                    void 0 === this.x && o && (this.x = void 0 === i ? o.autoIncrement(this) : i),
                    this
                },
                setNestedProperty: function (e, i, n) {
                  return n = n.split("."),
                    t.reduce(n, function (e, n, o, s) {
                      return e[n] = s.length - 1 === o ? i : t.isObject(e[n], !0) ? e[n] : {},
                        e[n]
                    }, e),
                    e
                },
                optionsToObject: function (e) {
                  var i = {},
                    n = this.series,
                    o = n.options.keys,
                    s = o || n.pointArrayMap || ["y"],
                    r = s.length,
                    h = 0,
                    c = 0;
                  if (l(e) || null === e)
                    i[s[0]] = e;
                  else if (a(e))
                    for (!o && e.length > r && ("string" === (n = typeof e[0]) ? i.name = e[0] : "number" === n && (i.x = e[0]),
                        h++); c < r;)
                      o && void 0 === e[h] || (0 < s[c].indexOf(".") ? t.Point.prototype.setNestedProperty(i, e[h], s[c]) : i[s[c]] = e[h]),
                      h++,
                      c++;
                  else
                    "object" == typeof e && (i = e,
                      e.dataLabels && (n._hasPointLabels = !0),
                      e.marker && (n._hasPointMarkers = !0));
                  return i
                },
                getClassName: function () {
                  return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                },
                getZone: function () {
                  var t, e = (i = this.series).zones,
                    i = i.zoneAxis || "y",
                    n = 0;
                  for (t = e[n]; this[i] >= t.value;)
                    t = e[++n];
                  return this.nonZonedColor || (this.nonZonedColor = this.color),
                    this.color = t && t.color && !this.options.color ? t.color : this.nonZonedColor,
                    t
                },
                destroy: function () {
                  var t, e = this.series.chart,
                    i = e.hoverPoints;
                  for (t in e.pointCount--,
                    i && (this.setState(),
                      o(i, this),
                      i.length || (e.hoverPoints = null)),
                    this === e.hoverPoint && this.onMouseOut(),
                    (this.graphic || this.dataLabel) && (c(this),
                      this.destroyElements()),
                    this.legendItem && e.legend.destroyItem(this),
                    this)
                    this[t] = null
                },
                destroyElements: function () {
                  for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--;)
                    this[t = e[i]] && (this[t] = this[t].destroy())
                },
                getLabelConfig: function () {
                  return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                  }
                },
                tooltipFormatter: function (t) {
                  var e = this.series,
                    n = e.tooltipOptions,
                    o = h(n.valueDecimals, ""),
                    s = n.valuePrefix || "",
                    a = n.valueSuffix || "";
                  return i(e.pointArrayMap || ["y"], function (e) {
                      e = "{point." + e,
                        (s || a) && (t = t.replace(RegExp(e + "}", "g"), s + e + "}" + a)),
                        t = t.replace(RegExp(e + "}", "g"), e + ":,." + o + "f}")
                    }),
                    r(t, {
                      point: this,
                      series: this.series
                    }, e.chart.time)
                },
                firePointEvent: function (t, e, i) {
                  var n = this,
                    o = this.series.options;
                  (o.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(),
                    "click" === t && o.allowPointSelect && (i = function (t) {
                      n.select && n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                    }),
                    s(this, t, e, i)
                },
                visible: !0
              }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.animObject,
              n = t.arrayMax,
              o = t.arrayMin,
              s = t.correctFloat,
              r = t.defaultOptions,
              a = t.defaultPlotOptions,
              l = t.defined,
              h = t.each,
              c = t.erase,
              d = t.extend,
              u = t.fireEvent,
              p = t.grep,
              f = t.isArray,
              g = t.isNumber,
              m = t.isString,
              v = t.merge,
              y = t.objectEach,
              x = t.pick,
              b = t.removeEvent,
              w = t.splat,
              k = t.SVGElement,
              T = t.syncTimeout,
              S = t.win;
            t.Series = t.seriesType("line", null, {
              lineWidth: 2,
              allowPointSelect: !1,
              showCheckbox: !1,
              animation: {
                duration: 1e3
              },
              events: {},
              marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                  normal: {
                    animation: !0
                  },
                  hover: {
                    animation: {
                      duration: 50
                    },
                    enabled: !0,
                    radiusPlus: 2,
                    lineWidthPlus: 1
                  },
                  select: {
                    fillColor: "#cccccc",
                    lineColor: "#000000",
                    lineWidth: 2
                  }
                }
              },
              point: {
                events: {}
              },
              dataLabels: {
                align: "center",
                formatter: function () {
                  return null === this.y ? "" : t.numberFormat(this.y, -1)
                },
                style: {
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "contrast",
                  textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
              },
              cropThreshold: 300,
              pointRange: 0,
              softThreshold: !0,
              states: {
                normal: {
                  animation: !0
                },
                hover: {
                  animation: {
                    duration: 50
                  },
                  lineWidthPlus: 1,
                  marker: {},
                  halo: {
                    size: 10,
                    opacity: .25
                  }
                },
                select: {
                  marker: {}
                }
              },
              stickyTracking: !0,
              turboThreshold: 1e3,
              findNearestPointBy: "x"
            }, {
              isCartesian: !0,
              pointClass: t.Point,
              sorted: !0,
              requireSorting: !0,
              directTouch: !1,
              axisTypes: ["xAxis", "yAxis"],
              colorCounter: 0,
              parallelArrays: ["x", "y"],
              coll: "series",
              init: function (t, i) {
                var n, o, s = this,
                  r = t.series;
                s.chart = t,
                  s.options = i = s.setOptions(i),
                  s.linkedSeries = [],
                  s.bindAxes(),
                  d(s, {
                    name: i.name,
                    state: "",
                    visible: !1 !== i.visible,
                    selected: !0 === i.selected
                  }),
                  n = i.events,
                  y(n, function (t, i) {
                    e(s, i, t)
                  }),
                  (n && n.click || i.point && i.point.events && i.point.events.click || i.allowPointSelect) && (t.runTrackerClick = !0),
                  s.getColor(),
                  s.getSymbol(),
                  h(s.parallelArrays, function (t) {
                    s[t + "Data"] = []
                  }),
                  s.setData(i.data, !1),
                  s.isCartesian && (t.hasCartesianSeries = !0),
                  r.length && (o = r[r.length - 1]),
                  s._i = x(o && o._i, -1) + 1,
                  t.orderSeries(this.insert(r)),
                  u(this, "afterInit")
              },
              insert: function (t) {
                var e, i = this.options.index;
                if (g(i)) {
                  for (e = t.length; e--;)
                    if (i >= x(t[e].options.index, t[e]._i)) {
                      t.splice(e + 1, 0, this);
                      break
                    } - 1 === e && t.unshift(this),
                    e += 1
                } else
                  t.push(this);
                return x(e, t.length - 1)
              },
              bindAxes: function () {
                var e, i = this,
                  n = i.options,
                  o = i.chart;
                h(i.axisTypes || [], function (s) {
                  h(o[s], function (t) {
                      e = t.options,
                        (n[s] === e.index || void 0 !== n[s] && n[s] === e.id || void 0 === n[s] && 0 === e.index) && (i.insert(t.series),
                          i[s] = t,
                          t.isDirty = !0)
                    }),
                    i[s] || i.optionalAxis === s || t.error(18, !0)
                })
              },
              updateParallelArrays: function (t, e) {
                var i = t.series,
                  n = arguments,
                  o = g(e) ? function (n) {
                    var o = "y" === n && i.toYData ? i.toYData(t) : t[n];
                    i[n + "Data"][e] = o
                  } :
                  function (t) {
                    Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(n, 2))
                  };
                h(i.parallelArrays, o)
              },
              autoIncrement: function () {
                var t, e = this.options,
                  i = this.xIncrement,
                  n = e.pointIntervalUnit,
                  o = this.chart.time;
                i = x(i, e.pointStart, 0);
                return this.pointInterval = t = x(this.pointInterval, e.pointInterval, 1),
                  n && (e = new o.Date(i),
                    "day" === n ? o.set("Date", e, o.get("Date", e) + t) : "month" === n ? o.set("Month", e, o.get("Month", e) + t) : "year" === n && o.set("FullYear", e, o.get("FullYear", e) + t),
                    t = e.getTime() - i),
                  this.xIncrement = i + t,
                  i
              },
              setOptions: function (t) {
                var e = this.chart,
                  i = e.options,
                  n = i.plotOptions,
                  o = (e.userOptions || {}).plotOptions || {},
                  s = n[this.type];
                return this.userOptions = t,
                  e = v(s, n.series, t),
                  this.tooltipOptions = v(r.tooltip, r.plotOptions.series && r.plotOptions.series.tooltip, r.plotOptions[this.type].tooltip, i.tooltip.userOptions, n.series && n.series.tooltip, n[this.type].tooltip, t.tooltip),
                  this.stickyTracking = x(t.stickyTracking, o[this.type] && o[this.type].stickyTracking, o.series && o.series.stickyTracking, !(!this.tooltipOptions.shared || this.noSharedTooltip) || e.stickyTracking),
                  null === s.marker && delete e.marker,
                  this.zoneAxis = e.zoneAxis,
                  t = this.zones = (e.zones || []).slice(),
                  !e.negativeColor && !e.negativeFillColor || e.zones || t.push({
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative",
                    color: e.negativeColor,
                    fillColor: e.negativeFillColor
                  }),
                  t.length && l(t[t.length - 1].value) && t.push({
                    color: this.color,
                    fillColor: this.fillColor
                  }),
                  u(this, "afterSetOptions", {
                    options: e
                  }),
                  e
              },
              getName: function () {
                return this.name || "Series " + (this.index + 1)
              },
              getCyclic: function (t, e, i) {
                var n, o = this.chart,
                  s = this.userOptions,
                  r = t + "Index",
                  a = t + "Counter",
                  h = i ? i.length : x(o.options.chart[t + "Count"], o[t + "Count"]);
                e || (n = x(s[r], s["_" + r]),
                    l(n) || (o.series.length || (o[a] = 0),
                      s["_" + r] = n = o[a] % h,
                      o[a] += 1),
                    i && (e = i[n])),
                  void 0 !== n && (this[r] = n),
                  this[t] = e
              },
              getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || a[this.type].color, this.chart.options.colors)
              },
              getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
              },
              drawLegendSymbol: t.LegendSymbolMixin.drawLineMarker,
              updateData: function (e) {
                var i, n, o, s = this.options,
                  r = this.points,
                  a = [],
                  l = this.requireSorting;
                if (h(e, function (e) {
                    var n;
                    n = t.defined(e) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                      }, e).x,
                      g(n) && (-1 === (n = t.inArray(n, this.xData, o)) ? a.push(e) : e !== s.data[n] ? (r[n].update(e, !1, null, !1),
                          r[n].touched = !0,
                          l && (o = n)) : r[n] && (r[n].touched = !0),
                        i = !0)
                  }, this),
                  i)
                  for (e = r.length; e--;)
                    (n = r[e]).touched || n.remove(!1),
                    n.touched = !1;
                else {
                  if (e.length !== r.length)
                    return !1;
                  h(e, function (t, e) {
                    r[e].update && t !== s.data[e] && r[e].update(t, !1, null, !1)
                  })
                }
                return h(a, function (t) {
                    this.addPoint(t, !1)
                  }, this),
                  !0
              },
              setData: function (e, i, n, o) {
                var s, r, a = this,
                  l = a.points,
                  c = l && l.length || 0,
                  d = a.options,
                  u = a.chart,
                  p = null,
                  v = a.xAxis,
                  y = d.turboThreshold,
                  b = this.xData,
                  w = this.yData,
                  k = (s = a.pointArrayMap) && s.length;
                if (s = (e = e || []).length,
                  i = x(i, !0),
                  !1 !== o && s && c && !a.cropped && !a.hasGroupedData && a.visible && (r = this.updateData(e)),
                  !r) {
                  if (a.xIncrement = null,
                    a.colorCounter = 0,
                    h(this.parallelArrays, function (t) {
                      a[t + "Data"].length = 0
                    }),
                    y && s > y) {
                    for (n = 0; null === p && n < s;)
                      p = e[n],
                      n++;
                    if (g(p))
                      for (n = 0; n < s; n++)
                        b[n] = this.autoIncrement(),
                        w[n] = e[n];
                    else if (f(p))
                      if (k)
                        for (n = 0; n < s; n++)
                          p = e[n],
                          b[n] = p[0],
                          w[n] = p.slice(1, k + 1);
                      else
                        for (n = 0; n < s; n++)
                          p = e[n],
                          b[n] = p[0],
                          w[n] = p[1];
                    else
                      t.error(12)
                  } else
                    for (n = 0; n < s; n++)
                      void 0 !== e[n] && (p = {
                          series: a
                        },
                        a.pointClass.prototype.applyOptions.apply(p, [e[n]]),
                        a.updateParallelArrays(p, n));
                  for (w && m(w[0]) && t.error(14, !0),
                    a.data = [],
                    a.options.data = a.userOptions.data = e,
                    n = c; n--;)
                    l[n] && l[n].destroy && l[n].destroy();
                  v && (v.minRange = v.userMinRange),
                    a.isDirty = u.isDirtyBox = !0,
                    a.isDirtyData = !!l,
                    n = !1
                }
                "point" === d.legendType && (this.processData(),
                    this.generatePoints()),
                  i && u.redraw(n)
              },
              processData: function (e) {
                var i, n = this.xData,
                  o = this.yData,
                  s = n.length;
                i = 0;
                var r, a, l, h = this.xAxis;
                l = (f = this.options).cropThreshold;
                var c, d, u = this.getExtremesFromAll || f.getExtremesFromAll,
                  p = this.isCartesian,
                  f = h && h.val2lin,
                  g = h && h.isLog,
                  m = this.requireSorting;
                if (p && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !e)
                  return !1;
                for (h && (c = (e = h.getExtremes()).min,
                    d = e.max),
                  p && this.sorted && !u && (!l || s > l || this.forceCrop) && (n[s - 1] < c || n[0] > d ? (n = [],
                    o = []) : (n[0] < c || n[s - 1] > d) && (n = (i = this.cropData(this.xData, this.yData, c, d)).xData,
                    o = i.yData,
                    i = i.start,
                    r = !0)),
                  l = n.length || 1; --l;)
                  0 < (s = g ? f(n[l]) - f(n[l - 1]) : n[l] - n[l - 1]) && (void 0 === a || s < a) ? a = s : 0 > s && m && (t.error(15),
                    m = !1);
                this.cropped = r,
                  this.cropStart = i,
                  this.processedXData = n,
                  this.processedYData = o,
                  this.closestPointRange = a
              },
              cropData: function (t, e, i, n, o) {
                var s, r = t.length,
                  a = 0,
                  l = r;
                for (o = x(o, this.cropShoulder, 1),
                  s = 0; s < r; s++)
                  if (t[s] >= i) {
                    a = Math.max(0, s - o);
                    break
                  }
                for (i = s; i < r; i++)
                  if (t[i] > n) {
                    l = i + o;
                    break
                  }
                return {
                  xData: t.slice(a, l),
                  yData: e.slice(a, l),
                  start: a,
                  end: l
                }
              },
              generatePoints: function () {
                var t, e, i, n, o = (u = this.options).data,
                  s = this.data,
                  r = this.processedXData,
                  a = this.processedYData,
                  l = this.pointClass,
                  h = r.length,
                  c = this.cropStart || 0,
                  d = this.hasGroupedData,
                  u = u.keys,
                  p = [];
                for (s || d || ((s = []).length = o.length,
                    s = this.data = s),
                  u && d && (this.options.keys = !1),
                  n = 0; n < h; n++)
                  e = c + n,
                  d ? (i = (new l).init(this, [r[n]].concat(w(a[n])))).dataGroup = this.groupMap[n] : (i = s[e]) || void 0 === o[e] || (s[e] = i = (new l).init(this, o[e], r[n])),
                  i && (i.index = e,
                    p[n] = i);
                if (this.options.keys = u,
                  s && (h !== (t = s.length) || d))
                  for (n = 0; n < t; n++)
                    n !== c || d || (n += h),
                    s[n] && (s[n].destroyElements(),
                      s[n].plotX = void 0);
                this.data = s,
                  this.points = p
              },
              getExtremes: function (t) {
                var e, i, s, r, a, l = this.yAxis,
                  h = this.processedXData,
                  c = [],
                  d = 0,
                  u = (e = this.xAxis.getExtremes()).min,
                  p = e.max,
                  m = this.requireSorting ? 1 : 0;
                for (e = (t = t || this.stackedYData || this.processedYData || []).length,
                  a = 0; a < e; a++)
                  if (s = h[a],
                    r = t[a],
                    i = (g(r, !0) || f(r)) && (!l.positiveValuesOnly || r.length || 0 < r),
                    s = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (h[a + m] || s) >= u && (h[a - m] || s) <= p,
                    i && s)
                    if (i = r.length)
                      for (; i--;)
                        "number" == typeof r[i] && (c[d++] = r[i]);
                    else
                      c[d++] = r;
                this.dataMin = o(c),
                  this.dataMax = n(c)
              },
              translate: function () {
                this.processedXData || this.processData(),
                  this.generatePoints();
                var t, e, i, n, o = this.options,
                  r = o.stacking,
                  a = this.xAxis,
                  h = a.categories,
                  c = this.yAxis,
                  d = this.points,
                  p = d.length,
                  f = !!this.modifyValue,
                  m = o.pointPlacement,
                  v = "between" === m || g(m),
                  y = o.threshold,
                  b = o.startFromThreshold ? y : 0,
                  w = Number.MAX_VALUE;
                for ("between" === m && (m = .5),
                  g(m) && (m *= x(o.pointRange || a.pointRange)),
                  o = 0; o < p; o++) {
                  var k = d[o],
                    T = k.x,
                    S = k.y;
                  e = k.low;
                  var C, A = r && c.stacks[(this.negStacks && S < (b ? 0 : y) ? "-" : "") + this.stackKey];
                  c.positiveValuesOnly && null !== S && 0 >= S && (k.isNull = !0),
                    k.plotX = t = s(Math.min(Math.max(-1e5, a.translate(T, 0, 0, 0, 1, m, "flags" === this.type)), 1e5)),
                    r && this.visible && !k.isNull && A && A[T] && (n = this.getStackIndicator(n, T, this.index),
                      e = (S = (C = A[T]).points[n.key])[0],
                      S = S[1],
                      e === b && n.key === A[T].base && (e = x(g(y) && y, c.min)),
                      c.positiveValuesOnly && 0 >= e && (e = null),
                      k.total = k.stackTotal = C.total,
                      k.percentage = C.total && k.y / C.total * 100,
                      k.stackY = S,
                      C.setOffset(this.pointXOffset || 0, this.barW || 0)),
                    k.yBottom = l(e) ? Math.min(Math.max(-1e5, c.translate(e, 0, 1, 0, 1)), 1e5) : null,
                    f && (S = this.modifyValue(S, k)),
                    k.plotY = e = "number" == typeof S && 1 / 0 !== S ? Math.min(Math.max(-1e5, c.translate(S, 0, 1, 0, 1)), 1e5) : void 0,
                    k.isInside = void 0 !== e && 0 <= e && e <= c.len && 0 <= t && t <= a.len,
                    k.clientX = v ? s(a.translate(T, 0, 0, 0, 1, m)) : t,
                    k.negative = k.y < (y || 0),
                    k.category = h && void 0 !== h[k.x] ? h[k.x] : k.x,
                    k.isNull || (void 0 !== i && (w = Math.min(w, Math.abs(t - i))),
                      i = t),
                    k.zone = this.zones.length && k.getZone()
                }
                this.closestPointRangePx = w,
                  u(this, "afterTranslate")
              },
              getValidPoints: function (t, e) {
                var i = this.chart;
                return p(t || this.points || [], function (t) {
                  return !(e && !i.isInsidePlot(t.plotX, t.plotY, i.inverted)) && !t.isNull
                })
              },
              setClip: function (t) {
                var e = this.chart,
                  i = this.options,
                  n = e.renderer,
                  o = e.inverted,
                  s = this.clipBox,
                  r = s || e.clipBox,
                  a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, r.height, i.xAxis, i.yAxis].join(),
                  l = e[a],
                  h = e[a + "m"];
                l || (t && (r.width = 0,
                      o && (r.x = e.plotSizeX),
                      e[a + "m"] = h = n.clipRect(o ? e.plotSizeX + 99 : -99, o ? -e.plotLeft : -e.plotTop, 99, o ? e.chartWidth : e.chartHeight)),
                    e[a] = l = n.clipRect(r),
                    l.count = {
                      length: 0
                    }),
                  t && !l.count[this.index] && (l.count[this.index] = !0,
                    l.count.length += 1),
                  !1 !== i.clip && (this.group.clip(t || s ? l : e.clipRect),
                    this.markerGroup.clip(h),
                    this.sharedClipKey = a),
                  t || (l.count[this.index] && (delete l.count[this.index],
                      --l.count.length),
                    0 === l.count.length && a && e[a] && (s || (e[a] = e[a].destroy()),
                      e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
              },
              animate: function (t) {
                var e, n = this.chart,
                  o = i(this.options.animation);
                t ? this.setClip(o) : ((t = n[e = this.sharedClipKey]) && t.animate({
                    width: n.plotSizeX,
                    x: 0
                  }, o),
                  n[e + "m"] && n[e + "m"].animate({
                    width: n.plotSizeX + 99,
                    x: 0
                  }, o),
                  this.animate = null)
              },
              afterAnimate: function () {
                this.setClip(),
                  u(this, "afterAnimate"),
                  this.finishedAnimating = !0
              },
              drawPoints: function () {
                var t, e, i, n, o, s, r, a, l = this.points,
                  h = this.chart,
                  c = this.options.marker,
                  d = this[this.specialGroup] || this.markerGroup,
                  u = x(c.enabled, !!this.xAxis.isRadial || null, this.closestPointRangePx >= c.enabledThreshold * c.radius);
                if (!1 !== c.enabled || this._hasPointMarkers)
                  for (t = 0; t < l.length; t++)
                    n = (e = l[t]).graphic,
                    o = e.marker || {},
                    s = !!e.marker,
                    i = u && void 0 === o.enabled || o.enabled,
                    r = e.isInside,
                    i && !e.isNull ? (i = x(o.symbol, this.symbol),
                      a = this.markerAttribs(e, e.selected && "select"),
                      n ? n[r ? "show" : "hide"](!0).animate(a) : r && (0 < a.width || e.hasImage) && (e.graphic = n = h.renderer.symbol(i, a.x, a.y, a.width, a.height, s ? o : c).add(d)),
                      n && n.attr(this.pointAttribs(e, e.selected && "select")),
                      n && n.addClass(e.getClassName(), !0)) : n && (e.graphic = n.destroy())
              },
              markerAttribs: function (t, e) {
                var i = this.options.marker,
                  n = t.marker || {},
                  o = n.symbol || i.symbol,
                  s = x(n.radius, i.radius);
                return e && (i = i.states[e],
                    e = n.states && n.states[e],
                    s = x(e && e.radius, i && i.radius, s + (i && i.radiusPlus || 0))),
                  t.hasImage = o && 0 === o.indexOf("url"),
                  t.hasImage && (s = 0),
                  t = {
                    x: Math.floor(t.plotX) - s,
                    y: t.plotY - s
                  },
                  s && (t.width = t.height = 2 * s),
                  t
              },
              pointAttribs: function (t, e) {
                var i = this.options.marker,
                  n = (a = t && t.options) && a.marker || {},
                  o = this.color,
                  s = a && a.color,
                  r = t && t.color,
                  a = x(n.lineWidth, i.lineWidth);
                return t = t && t.zone && t.zone.color,
                  o = s || t || r || o,
                  t = n.fillColor || i.fillColor || o,
                  o = n.lineColor || i.lineColor || o,
                  e && (i = i.states[e],
                    e = n.states && n.states[e] || {},
                    a = x(e.lineWidth, i.lineWidth, a + x(e.lineWidthPlus, i.lineWidthPlus, 0)),
                    t = e.fillColor || i.fillColor || t,
                    o = e.lineColor || i.lineColor || o), {
                    stroke: o,
                    "stroke-width": a,
                    fill: t
                  }
              },
              destroy: function () {
                var e, i, n, o = this,
                  s = o.chart,
                  r = /AppleWebKit\/533/.test(S.navigator.userAgent),
                  a = o.data || [];
                for (u(o, "destroy"),
                  b(o),
                  h(o.axisTypes || [], function (t) {
                    (n = o[t]) && n.series && (c(n.series, o),
                      n.isDirty = n.forceRedraw = !0)
                  }),
                  o.legendItem && o.chart.legend.destroyItem(o),
                  e = a.length; e--;)
                  (i = a[e]) && i.destroy && i.destroy();
                o.points = null,
                  t.clearTimeout(o.animationTimeout),
                  y(o, function (t, e) {
                    t instanceof k && !t.survive && t[r && "group" === e ? "hide" : "destroy"]()
                  }),
                  s.hoverSeries === o && (s.hoverSeries = null),
                  c(s.series, o),
                  s.orderSeries(),
                  y(o, function (t, e) {
                    delete o[e]
                  })
              },
              getGraphPath: function (t, e, i) {
                var n, o, s = this,
                  r = s.options,
                  a = r.step,
                  c = [],
                  d = [];
                return (n = (t = t || s.points).reversed) && t.reverse(),
                  (a = {
                    right: 1,
                    center: 2
                  } [a] || a && 3) && n && (a = 4 - a),
                  !r.connectNulls || e || i || (t = this.getValidPoints(t)),
                  h(t, function (n, h) {
                    var u = n.plotX,
                      p = n.plotY,
                      f = t[h - 1];
                    (n.leftCliff || f && f.rightCliff) && !i && (o = !0),
                      n.isNull && !l(e) && 0 < h ? o = !r.connectNulls : n.isNull && !e ? o = !0 : (0 === h || o ? h = ["M", n.plotX, n.plotY] : s.getPointSpline ? h = s.getPointSpline(t, n, h) : a ? (h = 1 === a ? ["L", f.plotX, p] : 2 === a ? ["L", (f.plotX + u) / 2, f.plotY, "L", (f.plotX + u) / 2, p] : ["L", u, f.plotY]).push("L", u, p) : h = ["L", u, p],
                        d.push(n.x),
                        a && (d.push(n.x),
                          2 === a && d.push(n.x)),
                        c.push.apply(c, h),
                        o = !1)
                  }),
                  c.xMap = d,
                  s.graphPath = c
              },
              drawGraph: function () {
                var t = this,
                  e = this.options,
                  i = (this.gappedPath || this.getGraphPath).call(this),
                  n = [
                    ["graph", "highcharts-graph", e.lineColor || this.color, e.dashStyle]
                  ];
                n = t.getZonesGraphs(n);
                h(n, function (n, o) {
                  var s = n[0],
                    r = t[s];
                  r ? (r.endX = t.preventGraphAnimation ? null : i.xMap,
                      r.animate({
                        d: i
                      })) : i.length && (t[s] = t.chart.renderer.path(i).addClass(n[1]).attr({
                        zIndex: 1
                      }).add(t.group),
                      r = {
                        stroke: n[2],
                        "stroke-width": e.lineWidth,
                        fill: t.fillGraph && t.color || "none"
                      },
                      n[3] ? r.dashstyle = n[3] : "square" !== e.linecap && (r["stroke-linecap"] = r["stroke-linejoin"] = "round"),
                      r = t[s].attr(r).shadow(2 > o && e.shadow)),
                    r && (r.startX = i.xMap,
                      r.isArea = i.isArea)
                })
              },
              getZonesGraphs: function (t) {
                return h(this.zones, function (e, i) {
                    t.push(["zone-graph-" + i, "highcharts-graph highcharts-zone-graph-" + i + " " + (e.className || ""), e.color || this.color, e.dashStyle || this.options.dashStyle])
                  }, this),
                  t
              },
              applyZones: function () {
                var t, e, i, n, o, s, r, a, l, c = this,
                  d = this.chart,
                  u = d.renderer,
                  p = this.zones,
                  f = this.clips || [],
                  g = this.graph,
                  m = this.area,
                  v = Math.max(d.chartWidth, d.chartHeight),
                  y = this[(this.zoneAxis || "y") + "Axis"],
                  b = d.inverted,
                  w = !1;
                p.length && (g || m) && y && void 0 !== y.min && (o = y.reversed,
                  s = y.horiz,
                  g && !this.showLine && g.hide(),
                  m && m.hide(),
                  n = y.getExtremes(),
                  h(p, function (h, p) {
                    t = o ? s ? d.plotWidth : 0 : s ? 0 : y.toPixels(n.min),
                      t = Math.min(Math.max(x(e, t), 0), v),
                      e = Math.min(Math.max(Math.round(y.toPixels(x(h.value, n.max), !0)), 0), v),
                      w && (t = e = y.toPixels(n.max)),
                      r = Math.abs(t - e),
                      a = Math.min(t, e),
                      l = Math.max(t, e),
                      y.isXAxis ? (i = {
                          x: b ? l : a,
                          y: 0,
                          width: r,
                          height: v
                        },
                        s || (i.x = d.plotHeight - i.x)) : (i = {
                          x: 0,
                          y: b ? l : a,
                          width: v,
                          height: r
                        },
                        s && (i.y = d.plotWidth - i.y)),
                      b && u.isVML && (i = y.isXAxis ? {
                        x: 0,
                        y: o ? a : l,
                        height: i.width,
                        width: d.chartWidth
                      } : {
                        x: i.y - d.plotLeft - d.spacingBox.x,
                        y: 0,
                        width: i.height,
                        height: d.chartHeight
                      }),
                      f[p] ? f[p].animate(i) : (f[p] = u.clipRect(i),
                        g && c["zone-graph-" + p].clip(f[p]),
                        m && c["zone-area-" + p].clip(f[p])),
                      w = h.value > n.max,
                      c.resetZones && 0 === e && (e = void 0)
                  }),
                  this.clips = f)
              },
              invertGroups: function (t) {
                function i() {
                  h(["group", "markerGroup"], function (e) {
                    o[e] && (s.renderer.isVML && o[e].attr({
                        width: o.yAxis.len,
                        height: o.xAxis.len
                      }),
                      o[e].width = o.yAxis.len,
                      o[e].height = o.xAxis.len,
                      o[e].invert(t))
                  })
                }
                var n, o = this,
                  s = o.chart;
                o.xAxis && (n = e(s, "resize", i),
                  e(o, "destroy", n),
                  i(),
                  o.invertGroups = i)
              },
              plotGroup: function (t, e, i, n, o) {
                var s = this[t],
                  r = !s;
                return r && (this[t] = s = this.chart.renderer.g().attr({
                    zIndex: n || .1
                  }).add(o)),
                  s.addClass("highcharts-" + e + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (l(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (s.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0),
                  s.attr({
                    visibility: i
                  })[r ? "attr" : "animate"](this.getPlotBox()),
                  s
              },
              getPlotBox: function () {
                var t = this.chart,
                  e = this.xAxis,
                  i = this.yAxis;
                return t.inverted && (e = i,
                  i = this.xAxis), {
                  translateX: e ? e.left : t.plotLeft,
                  translateY: i ? i.top : t.plotTop,
                  scaleX: 1,
                  scaleY: 1
                }
              },
              render: function () {
                var t, e = this,
                  n = e.chart,
                  o = e.options,
                  s = !!e.animate && n.renderer.isSVG && i(o.animation).duration,
                  r = e.visible ? "inherit" : "hidden",
                  a = o.zIndex,
                  l = e.hasRendered,
                  h = n.seriesGroup,
                  c = n.inverted;
                t = e.plotGroup("group", "series", r, a, h),
                  e.markerGroup = e.plotGroup("markerGroup", "markers", r, a, h),
                  s && e.animate(!0),
                  t.inverted = !!e.isCartesian && c,
                  e.drawGraph && (e.drawGraph(),
                    e.applyZones()),
                  e.drawDataLabels && e.drawDataLabels(),
                  e.visible && e.drawPoints(),
                  e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(),
                  e.invertGroups(c),
                  !1 === o.clip || e.sharedClipKey || l || t.clip(n.clipRect),
                  s && e.animate(),
                  l || (e.animationTimeout = T(function () {
                    e.afterAnimate()
                  }, s)),
                  e.isDirty = !1,
                  e.hasRendered = !0,
                  u(e, "afterRender")
              },
              redraw: function () {
                var t = this.chart,
                  e = this.isDirty || this.isDirtyData,
                  i = this.group,
                  n = this.xAxis,
                  o = this.yAxis;
                i && (t.inverted && i.attr({
                      width: t.plotWidth,
                      height: t.plotHeight
                    }),
                    i.animate({
                      translateX: x(n && n.left, t.plotLeft),
                      translateY: x(o && o.top, t.plotTop)
                    })),
                  this.translate(),
                  this.render(),
                  e && delete this.kdTree
              },
              kdAxisArray: ["clientX", "plotY"],
              searchPoint: function (t, e) {
                var i = this.xAxis,
                  n = this.yAxis,
                  o = this.chart.inverted;
                return this.searchKDTree({
                  clientX: o ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                  plotY: o ? n.len - t.chartX + n.pos : t.chartY - n.pos
                }, e)
              },
              buildKDTree: function () {
                this.buildingKdTree = !0;
                var t = this,
                  e = -1 < t.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete t.kdTree,
                  T(function () {
                    t.kdTree = function e(i, n, o) {
                        var s, r;
                        if (r = i && i.length)
                          return s = t.kdAxisArray[n % o],
                            i.sort(function (t, e) {
                              return t[s] - e[s]
                            }), {
                              point: i[r = Math.floor(r / 2)],
                              left: e(i.slice(0, r), n + 1, o),
                              right: e(i.slice(r + 1), n + 1, o)
                            }
                      }(t.getValidPoints(null, !t.directTouch), e, e),
                      t.buildingKdTree = !1
                  }, t.options.kdNow ? 0 : 1)
              },
              searchKDTree: function (t, e) {
                var i = this,
                  n = this.kdAxisArray[0],
                  o = this.kdAxisArray[1],
                  s = e ? "distX" : "dist";
                if (e = -1 < i.options.findNearestPointBy.indexOf("y") ? 2 : 1,
                  this.kdTree || this.buildingKdTree || this.buildKDTree(),
                  this.kdTree)
                  return function t(e, r, a, h) {
                    var c, d, u = r.point,
                      p = i.kdAxisArray[a % h],
                      f = u;
                    return d = l(e[n]) && l(u[n]) ? Math.pow(e[n] - u[n], 2) : null,
                      c = l(e[o]) && l(u[o]) ? Math.pow(e[o] - u[o], 2) : null,
                      c = (d || 0) + (c || 0),
                      u.dist = l(c) ? Math.sqrt(c) : Number.MAX_VALUE,
                      u.distX = l(d) ? Math.sqrt(d) : Number.MAX_VALUE,
                      c = 0 > (p = e[p] - u[p]) ? "left" : "right",
                      d = 0 > p ? "right" : "left",
                      r[c] && (f = (c = t(e, r[c], a + 1, h))[s] < f[s] ? c : u),
                      r[d] && Math.sqrt(p * p) < f[s] && (f = (e = t(e, r[d], a + 1, h))[s] < f[s] ? e : f),
                      f
                  }(t, this.kdTree, e, e)
              }
            })
          }(h),
          function (t) {
            var e = t.Axis,
              i = t.Chart,
              n = t.correctFloat,
              o = t.defined,
              s = t.destroyObjectProperties,
              r = t.each,
              a = t.format,
              l = t.objectEach,
              h = t.pick,
              c = t.Series;
            t.StackItem = function (t, e, i, n, o) {
                var s = t.chart.inverted;
                this.axis = t,
                  this.isNegative = i,
                  this.options = e,
                  this.x = n,
                  this.total = null,
                  this.points = {},
                  this.stack = o,
                  this.rightCliff = this.leftCliff = 0,
                  this.alignOptions = {
                    align: e.align || (s ? i ? "left" : "right" : "center"),
                    verticalAlign: e.verticalAlign || (s ? "middle" : i ? "bottom" : "top"),
                    y: h(e.y, s ? 4 : i ? 14 : -6),
                    x: h(e.x, s ? i ? -6 : 6 : 0)
                  },
                  this.textAlign = e.textAlign || (s ? i ? "right" : "left" : "center")
              },
              t.StackItem.prototype = {
                destroy: function () {
                  s(this, this.axis)
                },
                render: function (t) {
                  var e = this.axis.chart,
                    i = this.options,
                    n = (n = i.format) ? a(n, this, e.time) : i.formatter.call(this);
                  this.label ? this.label.attr({
                    text: n,
                    visibility: "hidden"
                  }) : this.label = e.renderer.text(n, null, null, i.useHTML).css(i.style).attr({
                    align: this.textAlign,
                    rotation: i.rotation,
                    visibility: "hidden"
                  }).add(t)
                },
                setOffset: function (t, e) {
                  var i = this.axis,
                    n = i.chart,
                    o = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    s = i.translate(0);
                  s = Math.abs(o - s);
                  t = n.xAxis[0].translate(this.x) + t,
                    i = this.getStackBox(n, this, t, o, e, s, i),
                    (e = this.label) && (e.align(this.alignOptions, null, i),
                      i = e.alignAttr,
                      e[!1 === this.options.crop || n.isInsidePlot(i.x, i.y) ? "show" : "hide"](!0))
                },
                getStackBox: function (t, e, i, n, o, s, r) {
                  var a = e.axis.reversed,
                    l = t.inverted;
                  return t = r.height + r.pos - t.plotTop,
                    e = e.isNegative && !a || !e.isNegative && a, {
                      x: l ? e ? n : n - s : i,
                      y: l ? t - i - o : e ? t - n - s : t - n,
                      width: l ? s : o,
                      height: l ? o : s
                    }
                }
              },
              i.prototype.getStacks = function () {
                var t = this;
                r(t.yAxis, function (t) {
                    t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
                  }),
                  r(t.series, function (e) {
                    !e.options.stacking || !0 !== e.visible && !1 !== t.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + h(e.options.stack, ""))
                  })
              },
              e.prototype.buildStacks = function () {
                var t, e = this.series,
                  i = h(this.options.reversedStacks, !0),
                  n = e.length;
                if (!this.isXAxis) {
                  for (this.usePercentage = !1,
                    t = n; t--;)
                    e[i ? t : n - t - 1].setStackedPoints();
                  for (t = 0; t < n; t++)
                    e[t].modifyStacks()
                }
              },
              e.prototype.renderStackTotals = function () {
                var t = this.chart,
                  e = t.renderer,
                  i = this.stacks,
                  n = this.stackTotalGroup;
                n || (this.stackTotalGroup = n = e.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6
                  }).add()),
                  n.translate(t.plotLeft, t.plotTop),
                  l(i, function (t) {
                    l(t, function (t) {
                      t.render(n)
                    })
                  })
              },
              e.prototype.resetStacks = function () {
                var t = this,
                  e = t.stacks;
                t.isXAxis || l(e, function (e) {
                  l(e, function (i, n) {
                    i.touched < t.stacksTouched ? (i.destroy(),
                      delete e[n]) : (i.total = null,
                      i.cumulative = null)
                  })
                })
              },
              e.prototype.cleanStacks = function () {
                var t;
                this.isXAxis || (this.oldStacks && (t = this.stacks = this.oldStacks),
                  l(t, function (t) {
                    l(t, function (t) {
                      t.cumulative = t.total
                    })
                  }))
              },
              c.prototype.setStackedPoints = function () {
                if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                  var e, i, s, r, a, l, c, d = this.processedXData,
                    u = this.processedYData,
                    p = [],
                    f = u.length,
                    g = (y = this.options).threshold,
                    m = h(y.startFromThreshold && g, 0),
                    v = y.stack,
                    y = y.stacking,
                    x = this.stackKey,
                    b = "-" + x,
                    w = this.negStacks,
                    k = this.yAxis,
                    T = k.stacks,
                    S = k.oldStacks;
                  for (k.stacksTouched += 1,
                    a = 0; a < f; a++)
                    l = d[a],
                    c = u[a],
                    r = (e = this.getStackIndicator(e, l, this.index)).key,
                    T[s = (i = w && c < (m ? 0 : g)) ? b : x] || (T[s] = {}),
                    T[s][l] || (S[s] && S[s][l] ? (T[s][l] = S[s][l],
                      T[s][l].total = null) : T[s][l] = new t.StackItem(k, k.options.stackLabels, i, l, v)),
                    s = T[s][l],
                    null !== c ? (s.points[r] = s.points[this.index] = [h(s.cumulative, m)],
                      o(s.cumulative) || (s.base = r),
                      s.touched = k.stacksTouched,
                      0 < e.index && !1 === this.singleStacks && (s.points[r][0] = s.points[this.index + "," + l + ",0"][0])) : s.points[r] = s.points[this.index] = null,
                    "percent" === y ? (i = i ? x : b,
                      w && T[i] && T[i][l] ? (i = T[i][l],
                        s.total = i.total = Math.max(i.total, s.total) + Math.abs(c) || 0) : s.total = n(s.total + (Math.abs(c) || 0))) : s.total = n(s.total + (c || 0)),
                    s.cumulative = h(s.cumulative, m) + (c || 0),
                    null !== c && (s.points[r].push(s.cumulative),
                      p[a] = s.cumulative);
                  "percent" === y && (k.usePercentage = !0),
                    this.stackedYData = p,
                    k.oldStacks = {}
                }
              },
              c.prototype.modifyStacks = function () {
                var t, e = this,
                  i = e.stackKey,
                  n = e.yAxis.stacks,
                  o = e.processedXData,
                  s = e.options.stacking;
                e[s + "Stacker"] && r([i, "-" + i], function (i) {
                  for (var r, a, l = o.length; l--;)
                    r = o[l],
                    t = e.getStackIndicator(t, r, e.index, i),
                    (a = (r = n[i] && n[i][r]) && r.points[t.key]) && e[s + "Stacker"](a, r, l)
                })
              },
              c.prototype.percentStacker = function (t, e, i) {
                e = e.total ? 100 / e.total : 0,
                  t[0] = n(t[0] * e),
                  t[1] = n(t[1] * e),
                  this.stackedYData[i] = t[1]
              },
              c.prototype.getStackIndicator = function (t, e, i, n) {
                return !o(t) || t.x !== e || n && t.key !== n ? t = {
                    x: e,
                    index: 0,
                    key: n
                  } : t.index++,
                  t.key = [i, e, t.index].join(),
                  t
              }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.animate,
              n = t.Axis,
              o = t.createElement,
              s = t.css,
              r = t.defined,
              a = t.each,
              l = t.erase,
              h = t.extend,
              c = t.fireEvent,
              d = t.inArray,
              u = t.isNumber,
              p = t.isObject,
              f = t.isArray,
              g = t.merge,
              m = t.objectEach,
              v = t.pick,
              y = t.Point,
              x = t.Series,
              b = t.seriesTypes,
              w = t.setAnimation,
              k = t.splat;
            h(t.Chart.prototype, {
                addSeries: function (t, e, i) {
                  var n, o = this;
                  return t && (e = v(e, !0),
                      c(o, "addSeries", {
                        options: t
                      }, function () {
                        n = o.initSeries(t),
                          o.isDirtyLegend = !0,
                          o.linkSeries(),
                          c(o, "afterAddSeries"),
                          e && o.redraw(i)
                      })),
                    n
                },
                addAxis: function (t, e, i, o) {
                  var s = e ? "xAxis" : "yAxis",
                    r = this.options;
                  return t = g(t, {
                      index: this[s].length,
                      isX: e
                    }),
                    e = new n(this, t),
                    r[s] = k(r[s] || {}),
                    r[s].push(t),
                    v(i, !0) && this.redraw(o),
                    e
                },
                showLoading: function (t) {
                  var n = this,
                    r = n.options,
                    a = n.loadingDiv,
                    l = r.loading,
                    c = function () {
                      a && s(a, {
                        left: n.plotLeft + "px",
                        top: n.plotTop + "px",
                        width: n.plotWidth + "px",
                        height: n.plotHeight + "px"
                      })
                    };
                  a || (n.loadingDiv = a = o("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                      }, null, n.container),
                      n.loadingSpan = o("span", {
                        className: "highcharts-loading-inner"
                      }, null, a),
                      e(n, "redraw", c)),
                    a.className = "highcharts-loading",
                    n.loadingSpan.innerHTML = t || r.lang.loading,
                    s(a, h(l.style, {
                      zIndex: 10
                    })),
                    s(n.loadingSpan, l.labelStyle),
                    n.loadingShown || (s(a, {
                        opacity: 0,
                        display: ""
                      }),
                      i(a, {
                        opacity: l.style.opacity || .5
                      }, {
                        duration: l.showDuration || 0
                      })),
                    n.loadingShown = !0,
                    c()
                },
                hideLoading: function () {
                  var t = this.options,
                    e = this.loadingDiv;
                  e && (e.className = "highcharts-loading highcharts-loading-hidden",
                      i(e, {
                        opacity: 0
                      }, {
                        duration: t.loading.hideDuration || 100,
                        complete: function () {
                          s(e, {
                            display: "none"
                          })
                        }
                      })),
                    this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                update: function (t, e, i, n) {
                  var o, s, l = this,
                    h = {
                      credits: "addCredits",
                      title: "setTitle",
                      subtitle: "setSubtitle"
                    },
                    p = t.chart,
                    f = [];
                  c(l, "update", {
                      options: t
                    }),
                    p && (g(!0, l.options.chart, p),
                      "className" in p && l.setClassName(p.className),
                      "reflow" in p && l.setReflow(p.reflow),
                      ("inverted" in p || "polar" in p) && (l.propFromSeries(),
                        o = !0),
                      "alignTicks" in p && (o = !0),
                      m(p, function (t, e) {
                        -1 !== d("chart." + e, l.propsRequireUpdateSeries) && (s = !0),
                          -1 !== d(e, l.propsRequireDirtyBox) && (l.isDirtyBox = !0)
                      }),
                      "style" in p && l.renderer.setStyle(p.style)),
                    t.colors && (this.options.colors = t.colors),
                    t.plotOptions && g(!0, this.options.plotOptions, t.plotOptions),
                    m(t, function (t, e) {
                      l[e] && "function" == typeof l[e].update ? l[e].update(t, !1) : "function" == typeof l[h[e]] && l[h[e]](t),
                        "chart" !== e && -1 !== d(e, l.propsRequireUpdateSeries) && (s = !0)
                    }),
                    a("xAxis yAxis zAxis series colorAxis pane".split(" "), function (e) {
                      t[e] && (a(k(t[e]), function (t, n) {
                          (n = r(t.id) && l.get(t.id) || l[e][n]) && n.coll === e && (n.update(t, !1),
                              i && (n.touched = !0)),
                            !n && i && ("series" === e ? l.addSeries(t, !1).touched = !0 : "xAxis" !== e && "yAxis" !== e || (l.addAxis(t, "xAxis" === e, !1).touched = !0))
                        }),
                        i && a(l[e], function (t) {
                          t.touched ? delete t.touched : f.push(t)
                        }))
                    }),
                    a(f, function (t) {
                      t.remove(!1)
                    }),
                    o && a(l.axes, function (t) {
                      t.update({}, !1)
                    }),
                    s && a(l.series, function (t) {
                      t.update({}, !1)
                    }),
                    t.loading && g(!0, l.options.loading, t.loading),
                    o = p && p.width,
                    p = p && p.height,
                    u(o) && o !== l.chartWidth || u(p) && p !== l.chartHeight ? l.setSize(o, p, n) : v(e, !0) && l.redraw(n)
                },
                setSubtitle: function (t) {
                  this.setTitle(void 0, t)
                }
              }),
              h(y.prototype, {
                update: function (t, e, i, n) {
                  function o() {
                    r.applyOptions(t),
                      null === r.y && l && (r.graphic = l.destroy()),
                      p(t, !0) && (l && l.element && t && t.marker && void 0 !== t.marker.symbol && (r.graphic = l.destroy()),
                        t && t.dataLabels && r.dataLabel && (r.dataLabel = r.dataLabel.destroy()),
                        r.connector && (r.connector = r.connector.destroy())),
                      s = r.index,
                      a.updateParallelArrays(r, s),
                      c.data[s] = p(c.data[s], !0) || p(t, !0) ? r.options : v(t, c.data[s]),
                      a.isDirty = a.isDirtyData = !0,
                      !a.fixedBox && a.hasCartesianSeries && (h.isDirtyBox = !0),
                      "point" === c.legendType && (h.isDirtyLegend = !0),
                      e && h.redraw(i)
                  }
                  var s, r = this,
                    a = r.series,
                    l = r.graphic,
                    h = a.chart,
                    c = a.options;
                  e = v(e, !0),
                    !1 === n ? o() : r.firePointEvent("update", {
                      options: t
                    }, o)
                },
                remove: function (t, e) {
                  this.series.removePoint(d(this, this.series.data), t, e)
                }
              }),
              h(x.prototype, {
                addPoint: function (t, e, i, n) {
                  var o, s, r, a, l = this.options,
                    h = this.data,
                    c = this.chart,
                    d = (d = this.xAxis) && d.hasNames && d.names,
                    u = l.data,
                    p = this.xData;
                  if (e = v(e, !0),
                    o = {
                      series: this
                    },
                    this.pointClass.prototype.applyOptions.apply(o, [t]),
                    a = o.x,
                    r = p.length,
                    this.requireSorting && a < p[r - 1])
                    for (s = !0; r && p[r - 1] > a;)
                      r--;
                  this.updateParallelArrays(o, "splice", r, 0, 0),
                    this.updateParallelArrays(o, r),
                    d && o.name && (d[a] = o.name),
                    u.splice(r, 0, t),
                    s && (this.data.splice(r, 0, null),
                      this.processData()),
                    "point" === l.legendType && this.generatePoints(),
                    i && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(),
                      this.updateParallelArrays(o, "shift"),
                      u.shift())),
                    this.isDirtyData = this.isDirty = !0,
                    e && c.redraw(n)
                },
                removePoint: function (t, e, i) {
                  var n = this,
                    o = n.data,
                    s = o[t],
                    r = n.points,
                    a = n.chart,
                    l = function () {
                      r && r.length === o.length && r.splice(t, 1),
                        o.splice(t, 1),
                        n.options.data.splice(t, 1),
                        n.updateParallelArrays(s || {
                          series: n
                        }, "splice", t, 1),
                        s && s.destroy(),
                        n.isDirty = !0,
                        n.isDirtyData = !0,
                        e && a.redraw()
                    };
                  w(i, a),
                    e = v(e, !0),
                    s ? s.firePointEvent("remove", null, l) : l()
                },
                remove: function (t, e, i) {
                  function n() {
                    o.destroy(),
                      s.isDirtyLegend = s.isDirtyBox = !0,
                      s.linkSeries(),
                      v(t, !0) && s.redraw(e)
                  }
                  var o = this,
                    s = o.chart;
                  !1 !== i ? c(o, "remove", null, n) : n()
                },
                update: function (e, i) {
                  var n, o = this,
                    s = o.chart,
                    r = o.userOptions,
                    l = o.oldType || o.type,
                    u = e.type || r.type || s.options.chart.type,
                    p = b[l].prototype,
                    f = ["group", "markerGroup", "dataLabelsGroup"],
                    m = ["navigatorSeries", "baseSeries"],
                    y = o.finishedAnimating && {
                      animation: !1
                    },
                    x = ["data", "name", "turboThreshold"],
                    w = t.keys(e),
                    k = 0 < w.length;
                  if (a(w, function (t) {
                      -1 === d(t, x) && (k = !1)
                    }),
                    k)
                    e.data && this.setData(e.data, !1),
                    e.name && this.setName(e.name, !1);
                  else {
                    for (n in m = f.concat(m),
                      a(m, function (t) {
                        m[t] = o[t],
                          delete o[t]
                      }),
                      e = g(r, y, {
                        index: o.index,
                        pointStart: v(r.pointStart, o.xData[0])
                      }, {
                        data: o.options.data
                      }, e),
                      o.remove(!1, null, !1),
                      p)
                      o[n] = void 0;
                    b[u || l] ? h(o, b[u || l].prototype) : t.error(17, !0),
                      a(m, function (t) {
                        o[t] = m[t]
                      }),
                      o.init(s, e),
                      e.zIndex !== r.zIndex && a(f, function (t) {
                        o[t] && o[t].attr({
                          zIndex: e.zIndex
                        })
                      }),
                      o.oldType = l,
                      s.linkSeries()
                  }
                  c(this, "afterUpdate"),
                    v(i, !0) && s.redraw(!1)
                },
                setName: function (t) {
                  this.name = this.options.name = this.userOptions.name = t,
                    this.chart.isDirtyLegend = !0
                }
              }),
              h(n.prototype, {
                update: function (t, e) {
                  var i = this.chart;
                  t = g(this.userOptions, t),
                    i.options[this.coll].indexOf && (i.options[this.coll][i.options[this.coll].indexOf(this.userOptions)] = t),
                    this.destroy(!0),
                    this.init(i, h(t, {
                      events: void 0
                    })),
                    i.isDirtyBox = !0,
                    v(e, !0) && i.redraw()
                },
                remove: function (t) {
                  for (var e = this.chart, i = this.coll, n = this.series, o = n.length; o--;)
                    n[o] && n[o].remove(!1);
                  l(e.axes, this),
                    l(e[i], this),
                    f(e.options[i]) ? e.options[i].splice(this.options.index, 1) : delete e.options[i],
                    a(e[i], function (t, e) {
                      t.options.index = t.userOptions.index = e
                    }),
                    this.destroy(),
                    e.isDirtyBox = !0,
                    v(t, !0) && e.redraw()
                },
                setTitle: function (t, e) {
                  this.update({
                    title: t
                  }, e)
                },
                setCategories: function (t, e) {
                  this.update({
                    categories: t
                  }, e)
                }
              })
          }(h),
          function (t) {
            var e = t.color,
              i = t.each,
              n = t.map,
              o = t.pick,
              s = t.Series;
            (0,
              t.seriesType)("area", "line", {
              softThreshold: !1,
              threshold: 0
            }, {
              singleStacks: !1,
              getStackPoints: function (e) {
                var s, r, a = [],
                  l = [],
                  h = this.xAxis,
                  c = this.yAxis,
                  d = c.stacks[this.stackKey],
                  u = {},
                  p = this.index,
                  f = c.series,
                  g = f.length,
                  m = o(c.options.reversedStacks, !0) ? 1 : -1;
                if (e = e || this.points,
                  this.options.stacking) {
                  for (r = 0; r < e.length; r++)
                    e[r].leftNull = e[r].rightNull = null,
                    u[e[r].x] = e[r];
                  t.objectEach(d, function (t, e) {
                      null !== t.total && l.push(e)
                    }),
                    l.sort(function (t, e) {
                      return t - e
                    }),
                    s = n(f, function () {
                      return this.visible
                    }),
                    i(l, function (t, e) {
                      var n, o, f = 0;
                      if (u[t] && !u[t].isNull)
                        a.push(u[t]),
                        i([-1, 1], function (i) {
                          var a = 1 === i ? "rightNull" : "leftNull",
                            h = 0,
                            c = d[l[e + i]];
                          if (c)
                            for (r = p; 0 <= r && r < g;)
                              (n = c.points[r]) || (r === p ? u[t][a] = !0 : s[r] && (o = d[t].points[r]) && (h -= o[1] - o[0])),
                              r += m;
                          u[t][1 === i ? "rightCliff" : "leftCliff"] = h
                        });
                      else {
                        for (r = p; 0 <= r && r < g;) {
                          if (n = d[t].points[r]) {
                            f = n[1];
                            break
                          }
                          r += m
                        }
                        f = c.translate(f, 0, 1, 0, 1),
                          a.push({
                            isNull: !0,
                            plotX: h.translate(t, 0, 0, 0, 1),
                            x: t,
                            plotY: f,
                            yBottom: f
                          })
                      }
                    })
                }
                return a
              },
              getGraphPath: function (t) {
                var e, i, n, r, a = s.prototype.getGraphPath,
                  l = (m = this.options).stacking,
                  h = this.yAxis,
                  c = [],
                  d = [],
                  u = this.index,
                  p = h.stacks[this.stackKey],
                  f = m.threshold,
                  g = h.getThreshold(m.threshold),
                  m = m.connectNulls || "percent" === l,
                  v = function (e, i, o) {
                    var s = t[e];
                    e = l && p[s.x].points[u];
                    var r = s[o + "Null"] || 0;
                    o = s[o + "Cliff"] || 0;
                    var a, m;
                    s = !0;
                    o || r ? (a = (r ? e[0] : e[1]) + o,
                        m = e[0] + o,
                        s = !!r) : !l && t[i] && t[i].isNull && (a = m = f),
                      void 0 !== a && (d.push({
                          plotX: n,
                          plotY: null === a ? g : h.getThreshold(a),
                          isNull: s,
                          isCliff: !0
                        }),
                        c.push({
                          plotX: n,
                          plotY: null === m ? g : h.getThreshold(m),
                          doCurve: !1
                        }))
                  };
                for (t = t || this.points,
                  l && (t = this.getStackPoints(t)),
                  e = 0; e < t.length; e++)
                  i = t[e].isNull,
                  n = o(t[e].rectPlotX, t[e].plotX),
                  r = o(t[e].yBottom, g),
                  (!i || m) && (m || v(e, e - 1, "left"),
                    i && !l && m || (d.push(t[e]),
                      c.push({
                        x: e,
                        plotX: n,
                        plotY: r
                      })),
                    m || v(e, e + 1, "right"));
                return e = a.call(this, d, !0, !0),
                  c.reversed = !0,
                  (i = a.call(this, c, !0, !0)).length && (i[0] = "L"),
                  i = e.concat(i),
                  a = a.call(this, d, !1, m),
                  i.xMap = e.xMap,
                  this.areaPath = i,
                  a
              },
              drawGraph: function () {
                this.areaPath = [],
                  s.prototype.drawGraph.apply(this);
                var t = this,
                  n = this.areaPath,
                  r = this.options,
                  a = [
                    ["area", "highcharts-area", this.color, r.fillColor]
                  ];
                i(this.zones, function (e, i) {
                    a.push(["zone-area-" + i, "highcharts-area highcharts-zone-area-" + i + " " + e.className, e.color || t.color, e.fillColor || r.fillColor])
                  }),
                  i(a, function (i) {
                    var s = i[0],
                      a = t[s];
                    a ? (a.endX = t.preventGraphAnimation ? null : n.xMap,
                        a.animate({
                          d: n
                        })) : (a = t[s] = t.chart.renderer.path(n).addClass(i[1]).attr({
                        fill: o(i[3], e(i[2]).setOpacity(o(r.fillOpacity, .75)).get()),
                        zIndex: 0
                      }).add(t.group)).isArea = !0,
                      a.startX = n.xMap,
                      a.shiftUnit = r.step ? 2 : 1
                  })
              },
              drawLegendSymbol: t.LegendSymbolMixin.drawRectangle
            })
          }(h),
          function (t) {
            var e = t.pick;
            (t = t.seriesType)("spline", "line", {}, {
              getPointSpline: function (t, i, n) {
                var o, s, r, a, l = i.plotX,
                  h = i.plotY,
                  c = t[n - 1];
                if (n = t[n + 1],
                  c && !c.isNull && !1 !== c.doCurve && !i.isCliff && n && !n.isNull && !1 !== n.doCurve && !i.isCliff) {
                  t = c.plotY,
                    r = n.plotX;
                  var d = 0;
                  s = (1.5 * h + t) / 2.5,
                    a = (1.5 * h + (n = n.plotY)) / 2.5,
                    (r = (1.5 * l + r) / 2.5) !== (o = (1.5 * l + c.plotX) / 2.5) && (d = (a - s) * (r - l) / (r - o) + h - a),
                    a += d,
                    (s += d) > t && s > h ? a = 2 * h - (s = Math.max(t, h)) : s < t && s < h && (a = 2 * h - (s = Math.min(t, h))),
                    a > n && a > h ? s = 2 * h - (a = Math.max(n, h)) : a < n && a < h && (s = 2 * h - (a = Math.min(n, h))),
                    i.rightContX = r,
                    i.rightContY = a
                }
                return i = ["C", e(c.rightContX, c.plotX), e(c.rightContY, c.plotY), e(o, l), e(s, h), l, h],
                  c.rightContX = c.rightContY = null,
                  i
              }
            })
          }(h),
          function (t) {
            var e = t.seriesTypes.area.prototype;
            (0,
              t.seriesType)("areaspline", "spline", t.defaultPlotOptions.area, {
              getStackPoints: e.getStackPoints,
              getGraphPath: e.getGraphPath,
              drawGraph: e.drawGraph,
              drawLegendSymbol: t.LegendSymbolMixin.drawRectangle
            })
          }(h),
          function (t) {
            var e = t.animObject,
              i = t.color,
              n = t.each,
              o = t.extend,
              s = t.isNumber,
              r = t.merge,
              a = t.pick,
              l = t.Series,
              h = t.seriesType,
              c = t.svg;
            h("column", "line", {
              borderRadius: 0,
              crisp: !0,
              groupPadding: .2,
              marker: null,
              pointPadding: .1,
              minPointLength: 0,
              cropThreshold: 50,
              pointRange: null,
              states: {
                hover: {
                  halo: !1,
                  brightness: .1
                },
                select: {
                  color: "#cccccc",
                  borderColor: "#000000"
                }
              },
              dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
              },
              softThreshold: !1,
              startFromThreshold: !0,
              stickyTracking: !1,
              tooltip: {
                distance: 6
              },
              threshold: 0,
              borderColor: "#ffffff"
            }, {
              cropShoulder: 0,
              directTouch: !0,
              trackerGroups: ["group", "dataLabelsGroup"],
              negStacks: !0,
              init: function () {
                l.prototype.init.apply(this, arguments);
                var t = this,
                  e = t.chart;
                e.hasRendered && n(e.series, function (e) {
                  e.type === t.type && (e.isDirty = !0)
                })
              },
              getColumnMetrics: function () {
                var t, e = this,
                  i = e.options,
                  o = e.xAxis,
                  s = e.yAxis,
                  r = o.reversed,
                  l = {},
                  h = 0;
                !1 === i.grouping ? h = 1 : n(e.chart.series, function (i) {
                  var n, o = i.options,
                    r = i.yAxis;
                  i.type !== e.type || !i.visible && e.chart.options.chart.ignoreHiddenSeries || s.len !== r.len || s.pos !== r.pos || (o.stacking ? (t = i.stackKey,
                      void 0 === l[t] && (l[t] = h++),
                      n = l[t]) : !1 !== o.grouping && (n = h++),
                    i.columnIndex = n)
                });
                var c = Math.min(Math.abs(o.transA) * (o.ordinalSlope || i.pointRange || o.closestPointRange || o.tickInterval || 1), o.len),
                  d = c * i.groupPadding,
                  u = (c - 2 * d) / (h || 1);
                i = Math.min(i.maxPointWidth || o.len, a(i.pointWidth, u * (1 - 2 * i.pointPadding)));
                return e.columnMetrics = {
                    width: i,
                    offset: (u - i) / 2 + (d + ((e.columnIndex || 0) + (r ? 1 : 0)) * u - c / 2) * (r ? -1 : 1)
                  },
                  e.columnMetrics
              },
              crispCol: function (t, e, i, n) {
                var o = this.chart,
                  s = -((r = this.borderWidth) % 2 ? .5 : 0),
                  r = r % 2 ? .5 : 1;
                return o.inverted && o.renderer.isVML && (r += 1),
                  this.options.crisp && (i = Math.round(t + i) + s,
                    i -= t = Math.round(t) + s),
                  n = Math.round(e + n) + r,
                  s = .5 >= Math.abs(e) && .5 < n,
                  n -= e = Math.round(e) + r,
                  s && n && (--e,
                    n += 1), {
                    x: t,
                    y: e,
                    width: i,
                    height: n
                  }
              },
              translate: function () {
                var t = this,
                  e = t.chart,
                  i = t.options,
                  o = t.dense = 2 > t.closestPointRange * t.xAxis.transA,
                  s = (o = t.borderWidth = a(i.borderWidth, o ? 0 : 1),
                    t.yAxis),
                  r = i.threshold,
                  h = t.translatedThreshold = s.getThreshold(r),
                  c = a(i.minPointLength, 5),
                  d = t.getColumnMetrics(),
                  u = d.width,
                  p = t.barW = Math.max(u, 1 + 2 * o),
                  f = t.pointXOffset = d.offset;
                e.inverted && (h -= .5),
                  i.pointPadding && (p = Math.ceil(p)),
                  l.prototype.translate.apply(t),
                  n(t.points, function (i) {
                    var n, o = a(i.yBottom, h),
                      l = 999 + Math.abs(o),
                      d = (l = Math.min(Math.max(-l, i.plotY), s.len + l),
                        i.plotX + f),
                      g = p,
                      m = Math.min(l, o),
                      v = Math.max(l, o) - m;
                    c && Math.abs(v) < c && (v = c,
                        n = !s.reversed && !i.negative || s.reversed && i.negative,
                        i.y === r && t.dataMax <= r && s.min < r && (n = !n),
                        m = Math.abs(m - h) > c ? o - c : h - (n ? c : 0)),
                      i.barX = d,
                      i.pointWidth = u,
                      i.tooltipPos = e.inverted ? [s.len + s.pos - e.plotLeft - l, t.xAxis.len - d - g / 2, v] : [d + g / 2, l + s.pos - e.plotTop, v],
                      i.shapeType = "rect",
                      i.shapeArgs = t.crispCol.apply(t, i.isNull ? [d, h, g, 0] : [d, m, g, v])
                  })
              },
              getSymbol: t.noop,
              drawLegendSymbol: t.LegendSymbolMixin.drawRectangle,
              drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
              },
              pointAttribs: function (t, e) {
                var n, o = this.options;
                n = (c = this.pointAttrToOptions || {}).stroke || "borderColor";
                var s = c["stroke-width"] || "borderWidth",
                  a = t && t.color || this.color,
                  l = t && t[n] || o[n] || this.color || a,
                  h = t && t[s] || o[s] || this[s] || 0,
                  c = o.dashStyle;
                return t && this.zones.length && (a = t.getZone(),
                    a = t.options.color || a && a.color || this.color),
                  e && (e = (t = r(o.states[e], t.options.states && t.options.states[e] || {})).brightness,
                    a = t.color || void 0 !== e && i(a).brighten(t.brightness).get() || a,
                    l = t[n] || l,
                    h = t[s] || h,
                    c = t.dashStyle || c),
                  n = {
                    fill: a,
                    stroke: l,
                    "stroke-width": h
                  },
                  c && (n.dashstyle = c),
                  n
              },
              drawPoints: function () {
                var t, e = this,
                  i = this.chart,
                  o = e.options,
                  a = i.renderer,
                  l = o.animationLimit || 250;
                n(e.points, function (n) {
                  var h = n.graphic,
                    c = h && i.pointCount < l ? "animate" : "attr";
                  s(n.plotY) && null !== n.y ? (t = n.shapeArgs,
                    h ? h[c](r(t)) : n.graphic = h = a[n.shapeType](t).add(n.group || e.group),
                    o.borderRadius && h.attr({
                      r: o.borderRadius
                    }),
                    h[c](e.pointAttribs(n, n.selected && "select")).shadow(o.shadow, null, o.stacking && !o.borderRadius),
                    h.addClass(n.getClassName(), !0)) : h && (n.graphic = h.destroy())
                })
              },
              animate: function (t) {
                var i, n = this,
                  s = this.yAxis,
                  r = n.options,
                  a = this.chart.inverted,
                  l = {},
                  h = a ? "translateX" : "translateY";
                c && (t ? (l.scaleY = .001,
                  t = Math.min(s.pos + s.len, Math.max(s.pos, s.toPixels(r.threshold))),
                  a ? l.translateX = t - s.len : l.translateY = t,
                  n.group.attr(l)) : (i = n.group.attr(h),
                  n.group.animate({
                    scaleY: 1
                  }, o(e(n.options.animation), {
                    step: function (t, e) {
                      l[h] = i + e.pos * (s.pos - i),
                        n.group.attr(l)
                    }
                  })),
                  n.animate = null))
              },
              remove: function () {
                var t = this,
                  e = t.chart;
                e.hasRendered && n(e.series, function (e) {
                    e.type === t.type && (e.isDirty = !0)
                  }),
                  l.prototype.remove.apply(t, arguments)
              }
            })
          }(h),
          function (t) {
            (t = t.seriesType)("bar", "column", null, {
              inverted: !0
            })
          }(h),
          function (t) {
            var e = t.Series;
            (t = t.seriesType)("scatter", "line", {
              lineWidth: 0,
              findNearestPointBy: "xy",
              marker: {
                enabled: !0
              },
              tooltip: {
                headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
              }
            }, {
              sorted: !1,
              requireSorting: !1,
              noSharedTooltip: !0,
              trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
              takeOrdinalPosition: !1,
              drawGraph: function () {
                this.options.lineWidth && e.prototype.drawGraph.call(this)
              }
            })
          }(h),
          function (t) {
            var e = t.deg2rad,
              i = t.isNumber,
              n = t.pick,
              o = t.relativeLength;
            t.CenteredSeriesMixin = {
              getCenter: function () {
                var t, e, i = this.options,
                  s = this.chart,
                  r = 2 * (i.slicedOffset || 0),
                  a = s.plotWidth - 2 * r,
                  l = (s = s.plotHeight - 2 * r,
                    i.center),
                  h = (l = [n(l[0], "50%"), n(l[1], "50%"), i.size || "100%", i.innerSize || 0],
                    Math.min(a, s));
                for (t = 0; 4 > t; ++t)
                  e = l[t],
                  i = 2 > t || 2 === t && /%$/.test(e),
                  l[t] = o(e, [a, s, h, l[2]][t]) + (i ? r : 0);
                return l[3] > l[2] && (l[3] = l[2]),
                  l
              },
              getStartAndEndRadians: function (t, n) {
                return t = i(t) ? t : 0,
                  n = i(n) && n > t && 360 > n - t ? n : t + 360, {
                    start: e * (t + -90),
                    end: e * (n + -90)
                  }
              }
            }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.CenteredSeriesMixin,
              n = t.defined,
              o = t.each,
              s = t.extend,
              r = i.getStartAndEndRadians,
              a = t.inArray,
              l = t.noop,
              h = t.pick,
              c = t.Point,
              d = t.Series,
              u = t.seriesType,
              p = t.setAnimation;
            u("pie", "line", {
              center: [null, null],
              clip: !1,
              colorByPoint: !0,
              dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                  return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
              },
              ignoreHiddenPoint: !0,
              legendType: "point",
              marker: null,
              size: null,
              showInLegend: !1,
              slicedOffset: 10,
              stickyTracking: !1,
              tooltip: {
                followPointer: !0
              },
              borderColor: "#ffffff",
              borderWidth: 1,
              states: {
                hover: {
                  brightness: .1
                }
              }
            }, {
              isCartesian: !1,
              requireSorting: !1,
              directTouch: !0,
              noSharedTooltip: !0,
              trackerGroups: ["group", "dataLabelsGroup"],
              axisTypes: [],
              pointAttribs: t.seriesTypes.column.prototype.pointAttribs,
              animate: function (t) {
                var e = this,
                  i = e.points,
                  n = e.startAngleRad;
                t || (o(i, function (t) {
                    var i = t.graphic,
                      o = t.shapeArgs;
                    i && (i.attr({
                        r: t.startR || e.center[3] / 2,
                        start: n,
                        end: n
                      }),
                      i.animate({
                        r: o.r,
                        start: o.start,
                        end: o.end
                      }, e.options.animation))
                  }),
                  e.animate = null)
              },
              updateTotals: function () {
                var t, e, i = 0,
                  n = this.points,
                  o = n.length,
                  s = this.options.ignoreHiddenPoint;
                for (t = 0; t < o; t++)
                  e = n[t],
                  i += s && !e.visible ? 0 : e.isNull ? 0 : e.y;
                for (this.total = i,
                  t = 0; t < o; t++)
                  (e = n[t]).percentage = 0 < i && (e.visible || !s) ? e.y / i * 100 : 0,
                  e.total = i
              },
              generatePoints: function () {
                d.prototype.generatePoints.call(this),
                  this.updateTotals()
              },
              translate: function (t) {
                this.generatePoints();
                var e, i, n, o, s, a, l = 0,
                  c = (m = this.options).slicedOffset,
                  d = c + (m.borderWidth || 0),
                  u = r(m.startAngle, m.endAngle),
                  p = this.startAngleRad = u.start,
                  f = (u = (this.endAngleRad = u.end) - p,
                    this.points),
                  g = m.dataLabels.distance,
                  m = m.ignoreHiddenPoint,
                  v = f.length;
                for (t || (this.center = t = this.getCenter()),
                  this.getX = function (e, i, o) {
                    return n = Math.asin(Math.min((e - t[1]) / (t[2] / 2 + o.labelDistance), 1)),
                      t[0] + (i ? -1 : 1) * Math.cos(n) * (t[2] / 2 + o.labelDistance)
                  },
                  s = 0; s < v; s++)
                  (a = f[s]).labelDistance = h(a.options.dataLabels && a.options.dataLabels.distance, g),
                  this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, a.labelDistance),
                  e = p + l * u,
                  m && !a.visible || (l += a.percentage / 100),
                  i = p + l * u,
                  a.shapeType = "arc",
                  a.shapeArgs = {
                    x: t[0],
                    y: t[1],
                    r: t[2] / 2,
                    innerR: t[3] / 2,
                    start: Math.round(1e3 * e) / 1e3,
                    end: Math.round(1e3 * i) / 1e3
                  },
                  (n = (i + e) / 2) > 1.5 * Math.PI ? n -= 2 * Math.PI : n < -Math.PI / 2 && (n += 2 * Math.PI),
                  a.slicedTranslation = {
                    translateX: Math.round(Math.cos(n) * c),
                    translateY: Math.round(Math.sin(n) * c)
                  },
                  i = Math.cos(n) * t[2] / 2,
                  o = Math.sin(n) * t[2] / 2,
                  a.tooltipPos = [t[0] + .7 * i, t[1] + .7 * o],
                  a.half = n < -Math.PI / 2 || n > Math.PI / 2 ? 1 : 0,
                  a.angle = n,
                  e = Math.min(d, a.labelDistance / 5),
                  a.labelPos = [t[0] + i + Math.cos(n) * a.labelDistance, t[1] + o + Math.sin(n) * a.labelDistance, t[0] + i + Math.cos(n) * e, t[1] + o + Math.sin(n) * e, t[0] + i, t[1] + o, 0 > a.labelDistance ? "center" : a.half ? "right" : "left", n]
              },
              drawGraph: null,
              drawPoints: function () {
                var t, e, i, n, r = this,
                  a = r.chart.renderer,
                  l = r.options.shadow;
                l && !r.shadowGroup && (r.shadowGroup = a.g("shadow").add(r.group)),
                  o(r.points, function (o) {
                    if (e = o.graphic,
                      o.isNull)
                      e && (o.graphic = e.destroy());
                    else {
                      n = o.shapeArgs,
                        t = o.getTranslate();
                      var h = o.shadowGroup;
                      l && !h && (h = o.shadowGroup = a.g("shadow").add(r.shadowGroup)),
                        h && h.attr(t),
                        i = r.pointAttribs(o, o.selected && "select"),
                        e ? e.setRadialReference(r.center).attr(i).animate(s(n, t)) : (o.graphic = e = a[o.shapeType](n).setRadialReference(r.center).attr(t).add(r.group),
                          o.visible || e.attr({
                            visibility: "hidden"
                          }),
                          e.attr(i).attr({
                            "stroke-linejoin": "round"
                          }).shadow(l, h)),
                        e.addClass(o.getClassName())
                    }
                  })
              },
              searchPoint: l,
              sortByAngle: function (t, e) {
                t.sort(function (t, i) {
                  return void 0 !== t.angle && (i.angle - t.angle) * e
                })
              },
              drawLegendSymbol: t.LegendSymbolMixin.drawRectangle,
              getCenter: i.getCenter,
              getSymbol: l
            }, {
              init: function () {
                c.prototype.init.apply(this, arguments);
                var t, i = this;
                return i.name = h(i.name, "Slice"),
                  e(i, "select", t = function (t) {
                    i.slice("select" === t.type)
                  }),
                  e(i, "unselect", t),
                  i
              },
              isValid: function () {
                return t.isNumber(this.y, !0) && 0 <= this.y
              },
              setVisible: function (t, e) {
                var i = this,
                  n = i.series,
                  s = n.chart,
                  r = n.options.ignoreHiddenPoint;
                e = h(e, r),
                  t !== i.visible && (i.visible = i.options.visible = t = void 0 === t ? !i.visible : t,
                    n.options.data[a(i, n.data)] = i.options,
                    o(["graphic", "dataLabel", "connector", "shadowGroup"], function (e) {
                      i[e] && i[e][t ? "show" : "hide"](!0)
                    }),
                    i.legendItem && s.legend.colorizeItem(i, t),
                    t || "hover" !== i.state || i.setState(""),
                    r && (n.isDirty = !0),
                    e && s.redraw())
              },
              slice: function (t, e, i) {
                var o = this.series;
                p(i, o.chart),
                  h(e, !0),
                  this.sliced = this.options.sliced = n(t) ? t : !this.sliced,
                  o.options.data[a(this, o.data)] = this.options,
                  this.graphic.animate(this.getTranslate()),
                  this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
              },
              getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                  translateX: 0,
                  translateY: 0
                }
              },
              haloPath: function (t) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, {
                  innerR: this.shapeArgs.r - 1,
                  start: e.start,
                  end: e.end
                })
              }
            })
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.arrayMax,
              n = t.defined,
              o = t.each,
              s = t.extend,
              r = t.format,
              a = t.map,
              l = t.merge,
              h = t.noop,
              c = t.pick,
              d = t.relativeLength,
              u = t.Series,
              p = t.seriesTypes,
              f = t.some,
              g = t.stableSort;
            t.distribute = function (e, i, n) {
                function s(t, e) {
                  return t.target - e.target
                }
                var r, l, h = !0,
                  d = e,
                  u = [];
                l = 0;
                var p = d.reducedLen || i;
                for (r = e.length; r--;)
                  l += e[r].size;
                if (l > p) {
                  for (g(e, function (t, e) {
                      return (e.rank || 0) - (t.rank || 0)
                    }),
                    l = r = 0; l <= p;)
                    l += e[r].size,
                    r++;
                  u = e.splice(r - 1, e.length)
                }
                for (g(e, s),
                  e = a(e, function (t) {
                    return {
                      size: t.size,
                      targets: [t.target],
                      align: c(t.align, .5)
                    }
                  }); h;) {
                  for (r = e.length; r--;)
                    h = e[r],
                    l = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2,
                    h.pos = Math.min(Math.max(0, l - h.size * h.align), i - h.size);
                  for (r = e.length,
                    h = !1; r--;)
                    0 < r && e[r - 1].pos + e[r - 1].size > e[r].pos && (e[r - 1].size += e[r].size,
                      e[r - 1].targets = e[r - 1].targets.concat(e[r].targets),
                      e[r - 1].align = .5,
                      e[r - 1].pos + e[r - 1].size > i && (e[r - 1].pos = i - e[r - 1].size),
                      e.splice(r, 1),
                      h = !0)
                }
                d.push.apply(d, u),
                  r = 0,
                  f(e, function (e) {
                    var s = 0;
                    if (f(e.targets, function () {
                        if (d[r].pos = e.pos + s,
                          Math.abs(d[r].pos - d[r].target) > n)
                          return o(d.slice(0, r + 1), function (t) {
                              delete t.pos
                            }),
                            d.reducedLen = (d.reducedLen || i) - .1 * i,
                            d.reducedLen > .1 * i && t.distribute(d, i, n),
                            !0;
                        s += d[r].size,
                          r++
                      }))
                      return !0
                  }),
                  g(d, s)
              },
              u.prototype.drawDataLabels = function () {
                var i, s, a, h, d = this,
                  u = d.chart,
                  p = d.options,
                  f = p.dataLabels,
                  g = d.points,
                  m = d.hasRendered || 0,
                  v = c(f.defer, !!p.animation),
                  y = u.renderer;
                (f.enabled || d._hasPointLabels) && (d.dlProcessOptions && d.dlProcessOptions(f),
                  h = d.plotGroup("dataLabelsGroup", "data-labels", v && !m ? "hidden" : "visible", f.zIndex || 6),
                  v && (h.attr({
                      opacity: +m
                    }),
                    m || e(d, "afterAnimate", function () {
                      d.visible && h.show(!0),
                        h[p.animation ? "animate" : "attr"]({
                          opacity: 1
                        }, {
                          duration: 200
                        })
                    })),
                  s = f,
                  o(g, function (e) {
                    var o, g, m, v, x = e.dataLabel,
                      b = e.connector,
                      w = !x;
                    i = e.dlOptions || e.options && e.options.dataLabels,
                      (o = c(i && i.enabled, s.enabled) && !e.isNull) && (o = !0 === function (t, e) {
                        var i = e.filter;
                        return !i || (e = i.operator,
                          t = t[i.property],
                          i = i.value,
                          ">" === e && t > i || "<" === e && t < i || ">=" === e && t >= i || "<=" === e && t <= i || "==" === e && t == i || "===" === e && t === i)
                      }(e, i || f)),
                      o && (f = l(s, i),
                        g = e.getLabelConfig(),
                        v = f[e.formatPrefix + "Format"] || f.format,
                        a = n(v) ? r(v, g, u.time) : (f[e.formatPrefix + "Formatter"] || f.formatter).call(g, f),
                        v = f.style,
                        g = f.rotation,
                        v.color = c(f.color, v.color, d.color, "#000000"),
                        "contrast" === v.color && (e.contrastColor = y.getContrast(e.color || d.color),
                          v.color = f.inside || 0 > c(e.labelDistance, f.distance) || p.stacking ? e.contrastColor : "#000000"),
                        p.cursor && (v.cursor = p.cursor),
                        m = {
                          fill: f.backgroundColor,
                          stroke: f.borderColor,
                          "stroke-width": f.borderWidth,
                          r: f.borderRadius || 0,
                          rotation: g,
                          padding: f.padding,
                          zIndex: 1
                        },
                        t.objectEach(m, function (t, e) {
                          void 0 === t && delete m[e]
                        })),
                      !x || o && n(a) ? o && n(a) && (x ? m.text = a : (x = e.dataLabel = g ? y.text(a, 0, -9999).addClass("highcharts-data-label") : y.label(a, 0, -9999, f.shape, null, null, f.useHTML, null, "data-label")).addClass(" highcharts-data-label-color-" + e.colorIndex + " " + (f.className || "") + (f.useHTML ? "highcharts-tracker" : "")),
                        x.attr(m),
                        x.css(v).shadow(f.shadow),
                        x.added || x.add(h),
                        d.alignDataLabel(e, x, f, null, w)) : (e.dataLabel = x = x.destroy(),
                        b && (e.connector = b.destroy()))
                  })),
                t.fireEvent(this, "afterDrawDataLabels")
              },
              u.prototype.alignDataLabel = function (t, e, i, n, o) {
                var r, a = this.chart,
                  l = a.inverted,
                  h = c(t.dlBox && t.dlBox.centerX, t.plotX, -9999),
                  d = c(t.plotY, -9999),
                  u = e.getBBox(),
                  p = i.rotation,
                  f = i.align,
                  g = this.visible && (t.series.forceDL || a.isInsidePlot(h, Math.round(d), l) || n && a.isInsidePlot(h, l ? n.x + 1 : n.y + n.height - 1, l)),
                  m = "justify" === c(i.overflow, "justify");
                g && (r = i.style.fontSize,
                    r = a.renderer.fontMetrics(r, e).b,
                    n = s({
                      x: l ? this.yAxis.len - d : h,
                      y: Math.round(l ? this.xAxis.len - h : d),
                      width: 0,
                      height: 0
                    }, n),
                    s(i, {
                      width: u.width,
                      height: u.height
                    }),
                    p ? (m = !1,
                      h = a.renderer.rotCorr(r, p),
                      h = {
                        x: n.x + i.x + n.width / 2 + h.x,
                        y: n.y + i.y + {
                          top: 0,
                          middle: .5,
                          bottom: 1
                        } [i.verticalAlign] * n.height
                      },
                      e[o ? "attr" : "animate"](h).attr({
                        align: f
                      }),
                      d = 180 < (d = (p + 720) % 360) && 360 > d,
                      "left" === f ? h.y -= d ? u.height : 0 : "center" === f ? (h.x -= u.width / 2,
                        h.y -= u.height / 2) : "right" === f && (h.x -= u.width,
                        h.y -= d ? 0 : u.height),
                      e.placed = !0,
                      e.alignAttr = h) : (e.align(i, null, n),
                      h = e.alignAttr),
                    m ? t.isLabelJustified = this.justifyDataLabel(e, i, h, u, n, o) : c(i.crop, !0) && (g = a.isInsidePlot(h.x, h.y) && a.isInsidePlot(h.x + u.width, h.y + u.height)),
                    i.shape && !p) && e[o ? "attr" : "animate"]({
                    anchorX: l ? a.plotWidth - t.plotY : t.plotX,
                    anchorY: l ? a.plotHeight - t.plotX : t.plotY
                  }),
                  g || (e.attr({
                      y: -9999
                    }),
                    e.placed = !1)
              },
              u.prototype.justifyDataLabel = function (t, e, i, n, o, s) {
                var r, a, l = this.chart,
                  h = e.align,
                  c = e.verticalAlign,
                  d = t.box ? 0 : t.padding || 0;
                return 0 > (r = i.x + d) && ("right" === h ? e.align = "left" : e.x = -r,
                    a = !0),
                  (r = i.x + n.width - d) > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - r,
                    a = !0),
                  0 > (r = i.y + d) && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r,
                    a = !0),
                  (r = i.y + n.height - d) > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r,
                    a = !0),
                  a && (t.placed = !s,
                    t.align(e, null, o)),
                  a
              },
              p.pie && (p.pie.prototype.drawDataLabels = function () {
                  var e, s, r, a, l, h, d, p, f, g, m = this,
                    v = m.data,
                    y = m.chart,
                    x = m.options.dataLabels,
                    b = c(x.connectorPadding, 10),
                    w = c(x.connectorWidth, 1),
                    k = y.plotWidth,
                    T = y.plotHeight,
                    S = Math.round(y.chartWidth / 3),
                    C = m.center,
                    A = C[2] / 2,
                    M = C[1],
                    E = [
                      [],
                      []
                    ],
                    D = [0, 0, 0, 0];
                  m.visible && (x.enabled || m._hasPointLabels) && (o(v, function (t) {
                      t.dataLabel && t.visible && t.dataLabel.shortened && (t.dataLabel.attr({
                          width: "auto"
                        }).css({
                          width: "auto",
                          textOverflow: "clip"
                        }),
                        t.dataLabel.shortened = !1)
                    }),
                    u.prototype.drawDataLabels.apply(m),
                    o(v, function (t) {
                      t.dataLabel && t.visible && (E[t.half].push(t),
                        t.dataLabel._pos = null,
                        !n(x.style.width) && !n(t.options.dataLabels && t.options.dataLabels.style && t.options.dataLabels.style.width) && t.dataLabel.getBBox().width > S && (t.dataLabel.css({
                            width: .7 * S
                          }),
                          t.dataLabel.shortened = !0))
                    }),
                    o(E, function (i, s) {
                      var u, v, w, S = i.length,
                        E = [];
                      if (S)
                        for (m.sortByAngle(i, s - .5),
                          0 < m.maxLabelDistance && (u = Math.max(0, M - A - m.maxLabelDistance),
                            v = Math.min(M + A + m.maxLabelDistance, y.plotHeight),
                            o(i, function (t) {
                              0 < t.labelDistance && t.dataLabel && (t.top = Math.max(0, M - A - t.labelDistance),
                                t.bottom = Math.min(M + A + t.labelDistance, y.plotHeight),
                                w = t.dataLabel.getBBox().height || 21,
                                t.positionsIndex = E.push({
                                  target: t.labelPos[1] - t.top + w / 2,
                                  size: w,
                                  rank: t.y
                                }) - 1)
                            }),
                            u = v + w - u,
                            t.distribute(E, u, u / 5)),
                          g = 0; g < S; g++)
                          v = (e = i[g]).positionsIndex,
                          l = e.labelPos,
                          r = e.dataLabel,
                          f = !1 === e.visible ? "hidden" : "inherit",
                          p = u = l[1],
                          E && n(E[v]) && (void 0 === E[v].pos ? f = "hidden" : (h = E[v].size,
                            p = e.top + E[v].pos)),
                          delete e.positionIndex,
                          d = x.justify ? C[0] + (s ? -1 : 1) * (A + e.labelDistance) : m.getX(p < e.top + 2 || p > e.bottom - 2 ? u : p, s, e),
                          r._attr = {
                            visibility: f,
                            align: l[6]
                          },
                          r._pos = {
                            x: d + x.x + ({
                              left: b,
                              right: -b
                            } [l[6]] || 0),
                            y: p + x.y - 10
                          },
                          l.x = d,
                          l.y = p,
                          c(x.crop, !0) && (a = r.getBBox().width,
                            u = null,
                            d - a < b && 1 === s ? (u = Math.round(a - d + b),
                              D[3] = Math.max(u, D[3])) : d + a > k - b && 0 === s && (u = Math.round(d + a - k + b),
                              D[1] = Math.max(u, D[1])),
                            0 > p - h / 2 ? D[0] = Math.max(Math.round(h / 2 - p), D[0]) : p + h / 2 > T && (D[2] = Math.max(Math.round(p + h / 2 - T), D[2])),
                            r.sideOverflow = u)
                    }),
                    0 === i(D) || this.verifyDataLabelOverflow(D)) && (this.placeDataLabels(),
                    w && o(this.points, function (t) {
                      var e;
                      s = t.connector,
                        (r = t.dataLabel) && r._pos && t.visible && 0 < t.labelDistance ? (f = r._attr.visibility,
                          (e = !s) && (t.connector = s = y.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + t.colorIndex + (t.className ? " " + t.className : "")).add(m.dataLabelsGroup),
                            s.attr({
                              "stroke-width": w,
                              stroke: x.connectorColor || t.color || "#666666"
                            })),
                          s[e ? "attr" : "animate"]({
                            d: m.connectorPath(t.labelPos)
                          }),
                          s.attr("visibility", f)) : s && (t.connector = s.destroy())
                    }))
                },
                p.pie.prototype.connectorPath = function (t) {
                  var e = t.x,
                    i = t.y;
                  return c(this.options.dataLabels.softConnector, !0) ? ["M", e + ("left" === t[6] ? 5 : -5), i, "C", e, i, 2 * t[2] - t[4], 2 * t[3] - t[5], t[2], t[3], "L", t[4], t[5]] : ["M", e + ("left" === t[6] ? 5 : -5), i, "L", t[2], t[3], "L", t[4], t[5]]
                },
                p.pie.prototype.placeDataLabels = function () {
                  o(this.points, function (t) {
                    var e = t.dataLabel;
                    e && t.visible && ((t = e._pos) ? (e.sideOverflow && (e._attr.width = e.getBBox().width - e.sideOverflow,
                        e.css({
                          width: e._attr.width + "px",
                          textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis"
                        }),
                        e.shortened = !0),
                      e.attr(e._attr),
                      e[e.moved ? "animate" : "attr"](t),
                      e.moved = !0) : e && e.attr({
                      y: -9999
                    }))
                  }, this)
                },
                p.pie.prototype.alignDataLabel = h,
                p.pie.prototype.verifyDataLabelOverflow = function (t) {
                  var e, i = this.center,
                    n = this.options,
                    o = n.center,
                    s = n.minSize || 80,
                    r = null !== n.size;
                  return r || (null !== o[0] ? e = Math.max(i[2] - Math.max(t[1], t[3]), s) : (e = Math.max(i[2] - t[1] - t[3], s),
                        i[0] += (t[3] - t[1]) / 2),
                      null !== o[1] ? e = Math.max(Math.min(e, i[2] - Math.max(t[0], t[2])), s) : (e = Math.max(Math.min(e, i[2] - t[0] - t[2]), s),
                        i[1] += (t[0] - t[2]) / 2),
                      e < i[2] ? (i[2] = e,
                        i[3] = Math.min(d(n.innerSize || 0, e), e),
                        this.translate(i),
                        this.drawDataLabels && this.drawDataLabels()) : r = !0),
                    r
                }
              ),
              p.column && (p.column.prototype.alignDataLabel = function (t, e, i, n, o) {
                var s = this.chart.inverted,
                  r = t.series,
                  a = t.dlBox || t.shapeArgs,
                  h = c(t.below, t.plotY > c(this.translatedThreshold, r.yAxis.len)),
                  d = c(i.inside, !!this.options.stacking);
                a && (0 > (n = l(a)).y && (n.height += n.y,
                      n.y = 0),
                    0 < (a = n.y + n.height - r.yAxis.len) && (n.height -= a),
                    s && (n = {
                      x: r.yAxis.len - n.y - n.height,
                      y: r.xAxis.len - n.x - n.width,
                      width: n.height,
                      height: n.width
                    }),
                    d || (s ? (n.x += h ? 0 : n.width,
                      n.width = 0) : (n.y += h ? n.height : 0,
                      n.height = 0))),
                  i.align = c(i.align, !s || d ? "center" : h ? "right" : "left"),
                  i.verticalAlign = c(i.verticalAlign, s || d ? "middle" : h ? "top" : "bottom"),
                  u.prototype.alignDataLabel.call(this, t, e, i, n, o),
                  t.isLabelJustified && t.contrastColor && t.dataLabel.css({
                    color: t.contrastColor
                  })
              })
          }(h),
          function (t) {
            var e = t.Chart,
              i = t.each,
              n = t.objectEach,
              o = t.pick;
            (t = t.addEvent)(e, "render", function () {
              var t = [];
              i(this.labelCollectors || [], function (e) {
                  t = t.concat(e())
                }),
                i(this.yAxis || [], function (e) {
                  e.options.stackLabels && !e.options.stackLabels.allowOverlap && n(e.stacks, function (e) {
                    n(e, function (e) {
                      t.push(e.label)
                    })
                  })
                }),
                i(this.series || [], function (e) {
                  var n = e.options.dataLabels,
                    s = e.dataLabelCollections || ["dataLabel"];
                  (n.enabled || e._hasPointLabels) && !n.allowOverlap && e.visible && i(s, function (n) {
                    i(e.points, function (e) {
                      e[n] && (e[n].labelrank = o(e.labelrank, e.shapeArgs && e.shapeArgs.height),
                        t.push(e[n]))
                    })
                  })
                }),
                this.hideOverlappingLabels(t)
            }),
            e.prototype.hideOverlappingLabels = function (t) {
              var e, n, o, s, r, a, l, h, c, d = t.length,
                u = function (t, e, i, n, o, s, r, a) {
                  return !(o > t + i || o + r < t || s > e + n || s + a < e)
                };
              for (n = 0; n < d; n++)
                (e = t[n]) && (e.oldOpacity = e.opacity,
                  e.newOpacity = 1,
                  e.width || (o = e.getBBox(),
                    e.width = o.width,
                    e.height = o.height));
              for (t.sort(function (t, e) {
                  return (e.labelrank || 0) - (t.labelrank || 0)
                }),
                n = 0; n < d; n++)
                for (o = t[n],
                  e = n + 1; e < d; ++e)
                  s = t[e],
                  o && s && o !== s && o.placed && s.placed && 0 !== o.newOpacity && 0 !== s.newOpacity && (r = o.alignAttr,
                    a = s.alignAttr,
                    l = o.parentGroup,
                    h = s.parentGroup,
                    c = 2 * (o.box ? 0 : o.padding || 0),
                    r = u(r.x + l.translateX, r.y + l.translateY, o.width - c, o.height - c, a.x + h.translateX, a.y + h.translateY, s.width - c, s.height - c)) && ((o.labelrank < s.labelrank ? o : s).newOpacity = 0);
              i(t, function (t) {
                var e, i;
                t && (i = t.newOpacity,
                  t.oldOpacity !== i && t.placed && (i ? t.show(!0) : e = function () {
                      t.hide()
                    },
                    t.alignAttr.opacity = i,
                    t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e)),
                  t.isOld = !0)
              })
            }
          }(h),
          function (t) {
            var e, i = t.addEvent,
              n = t.Chart,
              o = t.createElement,
              s = t.css,
              r = t.defaultOptions,
              a = t.defaultPlotOptions,
              l = t.each,
              h = t.extend,
              c = t.fireEvent,
              d = t.hasTouch,
              u = t.inArray,
              p = t.isObject,
              f = t.Legend,
              g = t.merge,
              m = t.pick,
              v = t.Point,
              y = t.Series,
              x = t.seriesTypes,
              b = t.svg;
            e = t.TrackerMixin = {
                drawTrackerPoint: function () {
                  var t = this,
                    e = t.chart.pointer,
                    i = function (t) {
                      var i = e.getPointFromEvent(t);
                      void 0 !== i && (e.isDirectTouch = !0,
                        i.onMouseOver(t))
                    };
                  l(t.points, function (t) {
                      t.graphic && (t.graphic.element.point = t),
                        t.dataLabel && (t.dataLabel.div ? t.dataLabel.div.point = t : t.dataLabel.element.point = t)
                    }),
                    t._hasTracking || (l(t.trackerGroups, function (n) {
                        t[n] && (t[n].addClass("highcharts-tracker").on("mouseover", i).on("mouseout", function (t) {
                            e.onTrackerMouseOut(t)
                          }),
                          d && t[n].on("touchstart", i),
                          t.options.cursor && t[n].css(s).css({
                            cursor: t.options.cursor
                          }))
                      }),
                      t._hasTracking = !0),
                    c(this, "afterDrawTracker")
                },
                drawTrackerGraph: function () {
                  var t, e = this,
                    i = e.options,
                    n = i.trackByArea,
                    o = [].concat(n ? e.areaPath : e.graphPath),
                    s = o.length,
                    r = e.chart,
                    a = r.pointer,
                    h = r.renderer,
                    u = r.options.tooltip.snap,
                    p = e.tracker,
                    f = function () {
                      r.hoverSeries !== e && e.onMouseOver()
                    },
                    g = "rgba(192,192,192," + (b ? 1e-4 : .002) + ")";
                  if (s && !n)
                    for (t = s + 1; t--;)
                      "M" === o[t] && o.splice(t + 1, 0, o[t + 1] - u, o[t + 2], "L"),
                      (t && "M" === o[t] || t === s) && o.splice(t, 0, "L", o[t - 2] + u, o[t - 1]);
                  p ? p.attr({
                      d: o
                    }) : e.graph && (e.tracker = h.path(o).attr({
                        "stroke-linejoin": "round",
                        visibility: e.visible ? "visible" : "hidden",
                        stroke: g,
                        fill: n ? g : "none",
                        "stroke-width": e.graph.strokeWidth() + (n ? 0 : 2 * u),
                        zIndex: 2
                      }).add(e.group),
                      l([e.tracker, e.markerGroup], function (t) {
                        t.addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (t) {
                            a.onTrackerMouseOut(t)
                          }),
                          i.cursor && t.css({
                            cursor: i.cursor
                          }),
                          d && t.on("touchstart", f)
                      })),
                    c(this, "afterDrawTracker")
                }
              },
              x.column && (x.column.prototype.drawTracker = e.drawTrackerPoint),
              x.pie && (x.pie.prototype.drawTracker = e.drawTrackerPoint),
              x.scatter && (x.scatter.prototype.drawTracker = e.drawTrackerPoint),
              h(f.prototype, {
                setItemEvents: function (t, e, i) {
                  var n = this,
                    o = n.chart.renderer.boxWrapper,
                    s = "highcharts-legend-" + (t instanceof v ? "point" : "series") + "-active";
                  (i ? e : t.legendGroup).on("mouseover", function () {
                    t.setState("hover"),
                      o.addClass(s),
                      e.css(n.options.itemHoverStyle)
                  }).on("mouseout", function () {
                    e.css(g(t.visible ? n.itemStyle : n.itemHiddenStyle)),
                      o.removeClass(s),
                      t.setState()
                  }).on("click", function (e) {
                    var i = function () {
                      t.setVisible && t.setVisible()
                    };
                    o.removeClass(s),
                      e = {
                        browserEvent: e
                      },
                      t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : c(t, "legendItemClick", e, i)
                  })
                },
                createCheckboxForItem: function (t) {
                  t.checkbox = o("input", {
                      type: "checkbox",
                      checked: t.selected,
                      defaultChecked: t.selected
                    }, this.options.itemCheckboxStyle, this.chart.container),
                    i(t.checkbox, "click", function (e) {
                      c(t.series || t, "checkboxClick", {
                        checked: e.target.checked,
                        item: t
                      }, function () {
                        t.select()
                      })
                    })
                }
              }),
              r.legend.itemStyle.cursor = "pointer",
              h(n.prototype, {
                showResetZoom: function () {
                  function t() {
                    e.zoomOut()
                  }
                  var e = this,
                    i = r.lang,
                    n = e.options.chart.resetZoomButton,
                    o = n.theme,
                    s = o.states,
                    a = "chart" === n.relativeTo ? null : "plotBox";
                  c(this, "beforeShowResetZoom", null, function () {
                    e.resetZoomButton = e.renderer.button(i.resetZoom, null, null, t, o, s && s.hover).attr({
                      align: n.position.align,
                      title: i.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(n.position, !1, a)
                  })
                },
                zoomOut: function () {
                  c(this, "selection", {
                    resetSelection: !0
                  }, this.zoom)
                },
                zoom: function (t) {
                  var e, i, n = this.pointer,
                    o = !1;
                  !t || t.resetSelection ? (l(this.axes, function (t) {
                        e = t.zoom()
                      }),
                      n.initiated = !1) : l(t.xAxis.concat(t.yAxis), function (t) {
                      var i = t.axis;
                      n[i.isXAxis ? "zoomX" : "zoomY"] && (e = i.zoom(t.min, t.max),
                        i.displayBtn && (o = !0))
                    }),
                    i = this.resetZoomButton,
                    o && !i ? this.showResetZoom() : !o && p(i) && (this.resetZoomButton = i.destroy()),
                    e && this.redraw(m(this.options.chart.animation, t && t.animation, 100 > this.pointCount))
                },
                pan: function (t, e) {
                  var i, n = this,
                    o = n.hoverPoints;
                  o && l(o, function (t) {
                      t.setState()
                    }),
                    l("xy" === e ? [1, 0] : [1], function (e) {
                      var o, s = (e = n[e ? "xAxis" : "yAxis"][0]).horiz,
                        r = t[s ? "chartX" : "chartY"],
                        a = n[s = s ? "mouseDownX" : "mouseDownY"],
                        l = (e.pointRange || 0) / 2,
                        h = e.reversed && !n.inverted || !e.reversed && n.inverted ? -1 : 1,
                        c = e.getExtremes(),
                        d = e.toValue(a - r, !0) + l * h;
                      a = (o = (h = e.toValue(a + e.len - r, !0) - l * h) < d) ? h : d,
                        d = o ? d : h,
                        h = Math.min(c.dataMin, l ? c.min : e.toValue(e.toPixels(c.min) - e.minPixelPadding)),
                        l = Math.max(c.dataMax, l ? c.max : e.toValue(e.toPixels(c.max) + e.minPixelPadding));
                      0 < (o = h - a) && (d += o,
                          a = h),
                        0 < (o = d - l) && (d = l,
                          a -= o),
                        e.series.length && a !== c.min && d !== c.max && (e.setExtremes(a, d, !1, !1, {
                            trigger: "pan"
                          }),
                          i = !0),
                        n[s] = r
                    }),
                    i && n.redraw(!1),
                    s(n.container, {
                      cursor: "move"
                    })
                }
              }),
              h(v.prototype, {
                select: function (t, e) {
                  var i = this,
                    n = i.series,
                    o = n.chart;
                  t = m(t, !i.selected),
                    i.firePointEvent(t ? "select" : "unselect", {
                      accumulate: e
                    }, function () {
                      i.selected = i.options.selected = t,
                        n.options.data[u(i, n.data)] = i.options,
                        i.setState(t && "select"),
                        e || l(o.getSelectedPoints(), function (t) {
                          t.selected && t !== i && (t.selected = t.options.selected = !1,
                            n.options.data[u(t, n.data)] = t.options,
                            t.setState(""),
                            t.firePointEvent("unselect"))
                        })
                    })
                },
                onMouseOver: function (t) {
                  var e = this.series.chart,
                    i = e.pointer;
                  t = t ? i.normalize(t) : i.getChartCoordinatesFromPoint(this, e.inverted),
                    i.runPointActions(t, this)
                },
                onMouseOut: function () {
                  var t = this.series.chart;
                  this.firePointEvent("mouseOut"),
                    l(t.hoverPoints || [], function (t) {
                      t.setState()
                    }),
                    t.hoverPoints = t.hoverPoint = null
                },
                importEvents: function () {
                  if (!this.hasImportedEvents) {
                    var e = this,
                      n = g(e.series.options.point, e.options).events;
                    e.events = n,
                      t.objectEach(n, function (t, n) {
                        i(e, n, t)
                      }),
                      this.hasImportedEvents = !0
                  }
                },
                setState: function (t, e) {
                  var i, n = Math.floor(this.plotX),
                    o = this.plotY,
                    s = this.series,
                    r = s.options.states[t || "normal"] || {},
                    l = a[s.type].marker && s.options.marker,
                    d = l && !1 === l.enabled,
                    u = l && l.states && l.states[t || "normal"] || {},
                    p = !1 === u.enabled,
                    f = s.stateMarkerGraphic,
                    g = this.marker || {},
                    v = s.chart,
                    y = s.halo,
                    x = l && s.markerAttribs;
                  (t = t || "") === this.state && !e || this.selected && "select" !== t || !1 === r.enabled || t && (p || d && !1 === u.enabled) || t && g.states && g.states[t] && !1 === g.states[t].enabled || (x && (i = s.markerAttribs(this, t)),
                    this.graphic ? (this.state && this.graphic.removeClass("highcharts-point-" + this.state),
                      t && this.graphic.addClass("highcharts-point-" + t),
                      this.graphic.animate(s.pointAttribs(this, t), m(v.options.chart.animation, r.animation)),
                      i && this.graphic.animate(i, m(v.options.chart.animation, u.animation, l.animation)),
                      f && f.hide()) : (t && u && (l = g.symbol || s.symbol,
                        f && f.currentSymbol !== l && (f = f.destroy()),
                        f ? f[e ? "animate" : "attr"]({
                          x: i.x,
                          y: i.y
                        }) : l && (s.stateMarkerGraphic = f = v.renderer.symbol(l, i.x, i.y, i.width, i.height).add(s.markerGroup),
                          f.currentSymbol = l),
                        f && f.attr(s.pointAttribs(this, t))),
                      f && (f[t && v.isInsidePlot(n, o, v.inverted) ? "show" : "hide"](),
                        f.element.point = this)),
                    (n = r.halo) && n.size ? (y || (s.halo = y = v.renderer.path().add((this.graphic || f).parentGroup)),
                      y.show()[e ? "animate" : "attr"]({
                        d: this.haloPath(n.size)
                      }),
                      y.attr({
                        class: "highcharts-halo highcharts-color-" + m(this.colorIndex, s.colorIndex) + (this.className ? " " + this.className : "")
                      }),
                      y.point = this,
                      y.attr(h({
                        fill: this.color || s.color,
                        "fill-opacity": n.opacity,
                        zIndex: -1
                      }, n.attributes))) : y && y.point && y.point.haloPath && y.animate({
                      d: y.point.haloPath(0)
                    }, null, y.hide),
                    this.state = t,
                    c(this, "afterSetState"))
                },
                haloPath: function (t) {
                  return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - t, this.plotY - t, 2 * t, 2 * t)
                }
              }),
              h(y.prototype, {
                onMouseOver: function () {
                  var t = this.chart,
                    e = t.hoverSeries;
                  e && e !== this && e.onMouseOut(),
                    this.options.events.mouseOver && c(this, "mouseOver"),
                    this.setState("hover"),
                    t.hoverSeries = this
                },
                onMouseOut: function () {
                  var t = this.options,
                    e = this.chart,
                    i = e.tooltip,
                    n = e.hoverPoint;
                  e.hoverSeries = null,
                    n && n.onMouseOut(),
                    this && t.events.mouseOut && c(this, "mouseOut"),
                    !i || this.stickyTracking || i.shared && !this.noSharedTooltip || i.hide(),
                    this.setState()
                },
                setState: function (t) {
                  var e = this,
                    i = e.options,
                    n = e.graph,
                    o = i.states,
                    s = i.lineWidth;
                  i = 0;
                  if (t = t || "",
                    e.state !== t && (l([e.group, e.markerGroup, e.dataLabelsGroup], function (i) {
                        i && (e.state && i.removeClass("highcharts-series-" + e.state),
                          t && i.addClass("highcharts-series-" + t))
                      }),
                      e.state = t,
                      !o[t] || !1 !== o[t].enabled) && (t && (s = o[t].lineWidth || s + (o[t].lineWidthPlus || 0)),
                      n && !n.dashstyle))
                    for (s = {
                        "stroke-width": s
                      },
                      n.animate(s, m(o[t || "normal"] && o[t || "normal"].animation, e.chart.options.chart.animation)); e["zone-graph-" + i];)
                      e["zone-graph-" + i].attr(s),
                      i += 1
                },
                setVisible: function (t, e) {
                  var i, n = this,
                    o = n.chart,
                    s = n.legendItem,
                    r = o.options.chart.ignoreHiddenSeries,
                    a = n.visible;
                  i = (n.visible = t = n.options.visible = n.userOptions.visible = void 0 === t ? !a : t) ? "show" : "hide",
                    l(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (t) {
                      n[t] && n[t][i]()
                    }),
                    o.hoverSeries !== n && (o.hoverPoint && o.hoverPoint.series) !== n || n.onMouseOut(),
                    s && o.legend.colorizeItem(n, t),
                    n.isDirty = !0,
                    n.options.stacking && l(o.series, function (t) {
                      t.options.stacking && t.visible && (t.isDirty = !0)
                    }),
                    l(n.linkedSeries, function (e) {
                      e.setVisible(t, !1)
                    }),
                    r && (o.isDirtyBox = !0),
                    !1 !== e && o.redraw(),
                    c(n, i)
                },
                show: function () {
                  this.setVisible(!0)
                },
                hide: function () {
                  this.setVisible(!1)
                },
                select: function (t) {
                  this.selected = t = void 0 === t ? !this.selected : t,
                    this.checkbox && (this.checkbox.checked = t),
                    c(this, t ? "select" : "unselect")
                },
                drawTracker: e.drawTrackerGraph
              })
          }(h),
          function (t) {
            var e = t.Chart,
              i = t.each,
              n = t.inArray,
              o = t.isArray,
              s = t.isObject,
              r = t.pick,
              a = t.splat;
            e.prototype.setResponsive = function (e) {
                var n = this.options.responsive,
                  o = [],
                  s = this.currentResponsive;
                n && n.rules && i(n.rules, function (i) {
                  void 0 === i._id && (i._id = t.uniqueKey()),
                    this.matchResponsiveRule(i, o, e)
                }, this);
                var r = t.merge.apply(0, t.map(o, function (e) {
                  return t.find(n.rules, function (t) {
                    return t._id === e
                  }).chartOptions
                }));
                (o = o.toString() || void 0) !== (s && s.ruleIds) && (s && this.update(s.undoOptions, e),
                  o ? (this.currentResponsive = {
                      ruleIds: o,
                      mergedOptions: r,
                      undoOptions: this.currentOptions(r)
                    },
                    this.update(r, e)) : this.currentResponsive = void 0)
              },
              e.prototype.matchResponsiveRule = function (t, e) {
                var i = t.condition;
                (i.callback || function () {
                  return this.chartWidth <= r(i.maxWidth, Number.MAX_VALUE) && this.chartHeight <= r(i.maxHeight, Number.MAX_VALUE) && this.chartWidth >= r(i.minWidth, 0) && this.chartHeight >= r(i.minHeight, 0)
                }).call(this) && e.push(t._id)
              },
              e.prototype.currentOptions = function (e) {
                var i = {};
                return function e(i, r, l, h) {
                    var c;
                    t.objectEach(i, function (t, i) {
                      if (!h && -1 < n(i, ["series", "xAxis", "yAxis"]))
                        for (t = a(t),
                          l[i] = [],
                          c = 0; c < t.length; c++)
                          r[i][c] && (l[i][c] = {},
                            e(t[c], r[i][c], l[i][c], h + 1));
                      else
                        s(t) ? (l[i] = o(t) ? [] : {},
                          e(t, r[i] || {}, l[i], h + 1)) : l[i] = r[i] || null
                    })
                  }(e, this.options, i, 0),
                  i
              }
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.Axis,
              n = t.Chart,
              o = t.css,
              s = t.defined,
              r = t.each,
              a = t.extend,
              l = t.noop,
              h = t.pick,
              c = t.timeUnits,
              d = t.wrap;
            d(t.Series.prototype, "init", function (t) {
                var i;
                t.apply(this, Array.prototype.slice.call(arguments, 1)),
                  (i = this.xAxis) && i.options.ordinal && e(this, "updatedData", function () {
                    delete i.ordinalIndex
                  })
              }),
              d(i.prototype, "getTimeTicks", function (t, e, i, n, o, r, a, l) {
                var h, d, u, p, f, g = 0,
                  m = {},
                  v = [],
                  y = -Number.MAX_VALUE,
                  x = this.options.tickPixelInterval,
                  b = this.chart.time;
                if (!this.options.ordinal && !this.options.breaks || !r || 3 > r.length || void 0 === i)
                  return t.call(this, e, i, n, o);
                for (p = r.length,
                  h = 0; h < p; h++) {
                  if (f = h && r[h - 1] > n,
                    r[h] < i && (g = h),
                    h === p - 1 || r[h + 1] - r[h] > 5 * a || f) {
                    if (r[h] > y) {
                      for (d = t.call(this, e, r[g], r[h], o); d.length && d[0] <= y;)
                        d.shift();
                      d.length && (y = d[d.length - 1]),
                        v = v.concat(d)
                    }
                    g = h + 1
                  }
                  if (f)
                    break
                }
                if (t = d.info,
                  l && t.unitRange <= c.hour) {
                  for (h = v.length - 1,
                    g = 1; g < h; g++)
                    b.dateFormat("%d", v[g]) !== b.dateFormat("%d", v[g - 1]) && (m[v[g]] = "day",
                      u = !0);
                  u && (m[v[0]] = "day"),
                    t.higherRanks = m
                }
                if (v.info = t,
                  l && s(x)) {
                  var w;
                  for (l = b = v.length,
                    h = [],
                    u = []; l--;)
                    g = this.translate(v[l]),
                    w && (u[l] = w - g),
                    h[l] = w = g;
                  for (u.sort(),
                    (u = u[Math.floor(u.length / 2)]) < .6 * x && (u = null),
                    l = v[b - 1] > n ? b - 1 : b,
                    w = void 0; l--;)
                    g = h[l],
                    n = Math.abs(w - g),
                    w && n < .8 * x && (null === u || n < .8 * u) ? (m[v[l]] && !m[v[l + 1]] ? (n = l + 1,
                        w = g) : n = l,
                      v.splice(n, 1)) : w = g
                }
                return v
              }),
              a(i.prototype, {
                beforeSetTickPositions: function () {
                  var t, e, i, n = [],
                    o = !1,
                    a = (d = this.getExtremes()).min,
                    l = d.max,
                    c = this.isXAxis && !!this.options.breaks,
                    d = this.options.ordinal,
                    u = Number.MAX_VALUE,
                    p = this.chart.options.chart.ignoreHiddenSeries;
                  if (e = "highcharts-navigator-xaxis" === this.options.className,
                    !this.options.overscroll || this.max !== this.dataMax || this.chart.mouseIsDown && !e || this.eventArgs && (!this.eventArgs || "navigator" === this.eventArgs.trigger) || (this.max += this.options.overscroll,
                      !e && s(this.userMin) && (this.min += this.options.overscroll)),
                    d || c) {
                    if (r(this.series, function (e, i) {
                        if (!(p && !1 === e.visible || !1 === e.takeOrdinalPosition && !c) && (n = n.concat(e.processedXData),
                            t = n.length,
                            n.sort(function (t, e) {
                              return t - e
                            }),
                            u = Math.min(u, h(e.closestPointRange, u)),
                            t))
                          for (i = t - 1; i--;)
                            n[i] === n[i + 1] && n.splice(i, 1)
                      }),
                      2 < (t = n.length)) {
                      for (e = n[1] - n[0],
                        i = t - 1; i-- && !o;)
                        n[i + 1] - n[i] !== e && (o = !0);
                      !this.options.keepOrdinalPadding && (n[0] - a > e || l - n[n.length - 1] > e) && (o = !0)
                    } else
                      this.options.overscroll && (2 === t ? u = n[1] - n[0] : 1 === t ? (u = this.options.overscroll,
                        n = [n[0], n[0] + u]) : u = this.overscrollPointsRange);
                    o ? (this.options.overscroll && (this.overscrollPointsRange = u,
                        n = n.concat(this.getOverscrollPositions())),
                      this.ordinalPositions = n,
                      e = this.ordinal2lin(Math.max(a, n[0]), !0),
                      i = Math.max(this.ordinal2lin(Math.min(l, n[n.length - 1]), !0), 1),
                      this.ordinalSlope = l = (l - a) / (i - e),
                      this.ordinalOffset = a - e * l) : (this.overscrollPointsRange = h(this.closestPointRange, this.overscrollPointsRange),
                      this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                  }
                  this.isOrdinal = d && o,
                    this.groupIntervalFactor = null
                },
                val2lin: function (t, e) {
                  var i = this.ordinalPositions;
                  if (i) {
                    var n, o, s = i.length;
                    for (n = s; n--;)
                      if (i[n] === t) {
                        o = n;
                        break
                      }
                    for (n = s - 1; n--;)
                      if (t > i[n] || 0 === n) {
                        o = n + (t = (t - i[n]) / (i[n + 1] - i[n]));
                        break
                      }
                    e = e ? o : this.ordinalSlope * (o || 0) + this.ordinalOffset
                  } else
                    e = t;
                  return e
                },
                lin2val: function (t, e) {
                  var i = this.ordinalPositions;
                  if (i) {
                    var n, o = this.ordinalSlope,
                      s = this.ordinalOffset,
                      r = i.length - 1;
                    if (e)
                      0 > t ? t = i[0] : t > r ? t = i[r] : n = t - (r = Math.floor(t));
                    else
                      for (; r--;)
                        if (t >= (e = o * r + s)) {
                          n = (t - e) / ((o = o * (r + 1) + s) - e);
                          break
                        }
                    return void 0 !== n && void 0 !== i[r] ? i[r] + (n ? n * (i[r + 1] - i[r]) : 0) : t
                  }
                  return t
                },
                getExtendedPositions: function () {
                  var t, e, n = this,
                    o = n.chart,
                    s = n.series[0].currentDataGrouping,
                    a = n.ordinalIndex,
                    h = s ? s.count + s.unitName : "raw",
                    c = n.options.overscroll,
                    d = n.getExtremes();
                  return a || (a = n.ordinalIndex = {}),
                    a[h] || (t = {
                        series: [],
                        chart: o,
                        getExtremes: function () {
                          return {
                            min: d.dataMin,
                            max: d.dataMax + c
                          }
                        },
                        options: {
                          ordinal: !0
                        },
                        val2lin: i.prototype.val2lin,
                        ordinal2lin: i.prototype.ordinal2lin
                      },
                      r(n.series, function (i) {
                        (e = {
                          xAxis: t,
                          xData: i.xData.slice(),
                          chart: o,
                          destroyGroupedData: l
                        }).xData = e.xData.concat(n.getOverscrollPositions()),
                          e.options = {
                            dataGrouping: s ? {
                              enabled: !0,
                              forced: !0,
                              approximation: "open",
                              units: [
                                [s.unitName, [s.count]]
                              ]
                            } : {
                              enabled: !1
                            }
                          },
                          i.processData.apply(e),
                          t.series.push(e)
                      }),
                      n.beforeSetTickPositions.apply(t),
                      a[h] = t.ordinalPositions),
                    a[h]
                },
                getOverscrollPositions: function () {
                  var e = this.options.overscroll,
                    i = this.overscrollPointsRange,
                    n = [],
                    o = this.dataMax;
                  if (t.defined(i))
                    for (n.push(o); o <= this.dataMax + e;)
                      o += i,
                      n.push(o);
                  return n
                },
                getGroupIntervalFactor: function (t, e, i) {
                  var n, o = (i = i.processedXData).length,
                    s = [];
                  if (!(n = this.groupIntervalFactor)) {
                    for (n = 0; n < o - 1; n++)
                      s[n] = i[n + 1] - i[n];
                    s.sort(function (t, e) {
                        return t - e
                      }),
                      s = s[Math.floor(o / 2)],
                      t = Math.max(t, i[0]),
                      e = Math.min(e, i[o - 1]),
                      this.groupIntervalFactor = n = o * s / (e - t)
                  }
                  return n
                },
                postProcessTickInterval: function (t) {
                  var e = this.ordinalSlope;
                  return e ? this.options.breaks ? this.closestPointRange || t : t / (e / this.closestPointRange) : t
                }
              }),
              i.prototype.ordinal2lin = i.prototype.val2lin,
              d(n.prototype, "pan", function (t, e) {
                var i = this.xAxis[0],
                  n = i.options.overscroll,
                  s = e.chartX,
                  a = !1;
                if (i.options.ordinal && i.series.length) {
                  var l, h = this.mouseDownX,
                    c = i.getExtremes(),
                    d = c.dataMax,
                    u = c.min,
                    p = c.max,
                    f = this.hoverPoints,
                    g = i.closestPointRange || i.overscrollPointsRange,
                    m = (h = (h - s) / (i.translationSlope * (i.ordinalSlope || g)), {
                      ordinalPositions: i.getExtendedPositions()
                    }),
                    v = (g = i.lin2val,
                      i.val2lin);
                  m.ordinalPositions ? 1 < Math.abs(h) && (f && r(f, function (t) {
                      t.setState()
                    }),
                    0 > h ? (f = m,
                      l = i.ordinalPositions ? i : m) : (f = i.ordinalPositions ? i : m,
                      l = m),
                    d > (m = l.ordinalPositions)[m.length - 1] && m.push(d),
                    this.fixedRange = p - u,
                    (h = i.toFixedRange(null, null, g.apply(f, [v.apply(f, [u, !0]) + h, !0]), g.apply(l, [v.apply(l, [p, !0]) + h, !0]))).min >= Math.min(c.dataMin, u) && h.max <= Math.max(d, p) + n && i.setExtremes(h.min, h.max, !0, !1, {
                      trigger: "pan"
                    }),
                    this.mouseDownX = s,
                    o(this.container, {
                      cursor: "move"
                    })) : a = !0
                } else
                  a = !0;
                a && (n && (i.max = i.dataMax + n),
                  t.apply(this, Array.prototype.slice.call(arguments, 1)))
              })
          }(h),
          function (t) {
            function e(t) {
              t.apply(this),
                this.drawBreaks(this.xAxis, ["x"]),
                this.drawBreaks(this.yAxis, n(this.pointArrayMap, ["y"]))
            }
            var i = t.addEvent,
              n = t.pick,
              o = t.wrap,
              s = t.each,
              r = t.extend,
              a = t.isArray,
              l = t.fireEvent,
              h = t.Axis,
              c = t.Series;
            r(h.prototype, {
                isInBreak: function (t, e) {
                  var i = t.repeat || 1 / 0,
                    n = t.from,
                    o = t.to - t.from;
                  return e = e >= n ? (e - n) % i : i - (n - e) % i,
                    t.inclusive ? e <= o : e < o && 0 !== e
                },
                isInAnyBreak: function (t, e) {
                  var i, o, s, r = this.options.breaks,
                    a = r && r.length;
                  if (a) {
                    for (; a--;)
                      this.isInBreak(r[a], t) && (i = !0,
                        o || (o = n(r[a].showPoints, !this.isXAxis)));
                    s = i && e ? i && !o : i
                  }
                  return s
                }
              }),
              i(h, "afterSetTickPositions", function () {
                if (this.options.breaks) {
                  var t, e = this.tickPositions,
                    i = this.tickPositions.info,
                    n = [];
                  for (t = 0; t < e.length; t++)
                    this.isInAnyBreak(e[t]) || n.push(e[t]);
                  this.tickPositions = n,
                    this.tickPositions.info = i
                }
              }),
              i(h, "afterSetOptions", function () {
                this.options.breaks && this.options.breaks.length && (this.options.ordinal = !1)
              }),
              i(h, "afterInit", function () {
                var t, e = this;
                t = this.options.breaks,
                  e.isBroken = a(t) && !!t.length,
                  e.isBroken && (e.val2lin = function (t) {
                      var i, n, o = t;
                      for (n = 0; n < e.breakArray.length; n++)
                        if ((i = e.breakArray[n]).to <= t)
                          o -= i.len;
                        else {
                          if (i.from >= t)
                            break;
                          if (e.isInBreak(i, t)) {
                            o -= t - i.from;
                            break
                          }
                        }
                      return o
                    },
                    e.lin2val = function (t) {
                      var i, n;
                      for (n = 0; n < e.breakArray.length && !((i = e.breakArray[n]).from >= t); n++)
                        i.to < t ? t += i.len : e.isInBreak(i, t) && (t += i.len);
                      return t
                    },
                    e.setExtremes = function (t, e, i, n, o) {
                      for (; this.isInAnyBreak(t);)
                        t -= this.closestPointRange;
                      for (; this.isInAnyBreak(e);)
                        e -= this.closestPointRange;
                      h.prototype.setExtremes.call(this, t, e, i, n, o)
                    },
                    e.setAxisTranslation = function (t) {
                      h.prototype.setAxisTranslation.call(this, t),
                        t = e.options.breaks;
                      var i, o, r, a, c = [],
                        d = [],
                        u = 0,
                        p = e.userMin || e.min,
                        f = e.userMax || e.max,
                        g = n(e.pointRangePadding, 0);
                      s(t, function (t) {
                          o = t.repeat || 1 / 0,
                            e.isInBreak(t, p) && (p += t.to % o - p % o),
                            e.isInBreak(t, f) && (f -= f % o - t.from % o)
                        }),
                        s(t, function (t) {
                          for (r = t.from,
                            o = t.repeat || 1 / 0; r - o > p;)
                            r -= o;
                          for (; r < p;)
                            r += o;
                          for (a = r; a < f; a += o)
                            c.push({
                              value: a,
                              move: "in"
                            }),
                            c.push({
                              value: a + (t.to - t.from),
                              move: "out",
                              size: t.breakSize
                            })
                        }),
                        c.sort(function (t, e) {
                          return t.value === e.value ? ("in" === t.move ? 0 : 1) - ("in" === e.move ? 0 : 1) : t.value - e.value
                        }),
                        i = 0,
                        r = p,
                        s(c, function (t) {
                          1 === (i += "in" === t.move ? 1 : -1) && "in" === t.move && (r = t.value),
                            0 === i && (d.push({
                                from: r,
                                to: t.value,
                                len: t.value - r - (t.size || 0)
                              }),
                              u += t.value - r - (t.size || 0))
                        }),
                        e.breakArray = d,
                        e.unitLength = f - p - u + g,
                        l(e, "afterBreaks"),
                        e.options.staticScale ? e.transA = e.options.staticScale : e.unitLength && (e.transA *= (f - e.min + g) / e.unitLength),
                        g && (e.minPixelPadding = e.transA * e.minPointOffset),
                        e.min = p,
                        e.max = f
                    }
                  )
              }),
              o(c.prototype, "generatePoints", function (t) {
                t.apply(this, function () {
                  return Array.prototype.slice.call(arguments, 1)
                }(arguments));
                var e, i = this.xAxis,
                  n = this.yAxis,
                  o = this.points,
                  s = o.length,
                  r = this.options.connectNulls;
                if (i && n && (i.options.breaks || n.options.breaks))
                  for (; s--;)
                    null === (e = o[s]).y && !1 === r || !i.isInAnyBreak(e.x, !0) && !n.isInAnyBreak(e.y, !0) || (o.splice(s, 1),
                      this.data[s] && this.data[s].destroyElements())
              }),
              t.Series.prototype.drawBreaks = function (t, e) {
                var i, o, r, a, h = this,
                  c = h.points;
                t && s(e, function (e) {
                  i = t.breakArray || [],
                    o = t.isXAxis ? t.min : n(h.options.threshold, t.min),
                    s(c, function (h) {
                      a = n(h["stack" + e.toUpperCase()], h[e]),
                        s(i, function (e) {
                          r = !1,
                            o < e.from && a > e.to || o > e.from && a < e.from ? r = "pointBreak" : (o < e.from && a > e.from && a < e.to || o > e.from && a > e.to && a < e.from) && (r = "pointInBreak"),
                            r && l(t, r, {
                              point: h,
                              brk: e
                            })
                        })
                    })
                })
              },
              t.Series.prototype.gappedPath = function () {
                var e = (i = this.currentDataGrouping) && i.totalRange,
                  i = this.options.gapSize,
                  n = this.points.slice(),
                  o = n.length - 1,
                  s = this.yAxis;
                if (i && 0 < o)
                  for ("value" !== this.options.gapUnit && (i *= this.closestPointRange),
                    e && e > i && (i = e); o--;)
                    n[o + 1].x - n[o].x > i && (e = (n[o].x + n[o + 1].x) / 2,
                      n.splice(o + 1, 0, {
                        isNull: !0,
                        x: e
                      }),
                      this.options.stacking && ((e = s.stacks[this.stackKey][e] = new t.StackItem(s, s.options.stackLabels, !1, e, this.stack)).total = 0));
                return this.getGraphPath(n)
              },
              o(t.seriesTypes.column.prototype, "drawPoints", e),
              o(t.Series.prototype, "drawPoints", e)
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.arrayMax,
              n = t.arrayMin,
              o = t.Axis,
              s = t.defaultPlotOptions,
              r = t.defined,
              a = t.each,
              l = t.extend,
              h = t.format,
              c = t.isNumber,
              d = t.merge,
              u = t.pick,
              p = t.Point,
              f = t.Series,
              g = t.Tooltip,
              m = t.wrap,
              v = f.prototype,
              y = v.processData,
              x = v.generatePoints,
              b = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                  millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                  second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                  minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                  hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                  day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                  week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                  month: ["%B %Y", "%B", "-%B %Y"],
                  year: ["%Y", "%Y", "-%Y"]
                }
              },
              w = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                  approximation: "sum",
                  groupPixelWidth: 10
                },
                arearange: {
                  approximation: "range"
                },
                areasplinerange: {
                  approximation: "range"
                },
                columnrange: {
                  approximation: "range",
                  groupPixelWidth: 10
                },
                candlestick: {
                  approximation: "ohlc",
                  groupPixelWidth: 10
                },
                ohlc: {
                  approximation: "ohlc",
                  groupPixelWidth: 5
                }
              },
              k = t.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
              ],
              T = t.approximations = {
                sum: function (t) {
                  var e, i = t.length;
                  if (!i && t.hasNulls)
                    e = null;
                  else if (i)
                    for (e = 0; i--;)
                      e += t[i];
                  return e
                },
                average: function (t) {
                  var e = t.length;
                  return t = T.sum(t),
                    c(t) && e && (t /= e),
                    t
                },
                averages: function () {
                  var t = [];
                  return a(arguments, function (e) {
                      t.push(T.average(e))
                    }),
                    void 0 === t[0] ? void 0 : t
                },
                open: function (t) {
                  return t.length ? t[0] : t.hasNulls ? null : void 0
                },
                high: function (t) {
                  return t.length ? i(t) : t.hasNulls ? null : void 0
                },
                low: function (t) {
                  return t.length ? n(t) : t.hasNulls ? null : void 0
                },
                close: function (t) {
                  return t.length ? t[t.length - 1] : t.hasNulls ? null : void 0
                },
                ohlc: function (t, e, i, n) {
                  if (t = T.open(t),
                    e = T.high(e),
                    i = T.low(i),
                    n = T.close(n),
                    c(t) || c(e) || c(i) || c(n))
                    return [t, e, i, n]
                },
                range: function (t, e) {
                  return t = T.low(t),
                    e = T.high(e),
                    c(t) || c(e) ? [t, e] : null === t && null === e ? null : void 0
                }
              };
            v.groupData = function (t, e, i, n) {
                var o, s, r = this.data,
                  l = this.options.data,
                  h = [],
                  d = [],
                  u = [],
                  p = t.length,
                  f = !!e,
                  g = [];
                n = "function" == typeof n ? n : T[n] || w[this.type] && T[w[this.type].approximation] || T[b.approximation];
                var m, v, y = this.pointArrayMap,
                  x = y && y.length,
                  k = 0;
                for (s = 0,
                  x ? a(y, function () {
                    g.push([])
                  }) : g.push([]),
                  m = x || 1,
                  v = 0; v <= p && !(t[v] >= i[0]); v++)
                ;
                for (; v <= p; v++) {
                  for (; void 0 !== i[k + 1] && t[v] >= i[k + 1] || v === p;) {
                    for (o = i[k],
                      this.dataGroupInfo = {
                        start: s,
                        length: g[0].length
                      },
                      void 0 !== (s = n.apply(this, g)) && (h.push(o),
                        d.push(s),
                        u.push(this.dataGroupInfo)),
                      s = v,
                      o = 0; o < m; o++)
                      g[o].length = 0,
                      g[o].hasNulls = !1;
                    if (k += 1,
                      v === p)
                      break
                  }
                  if (v === p)
                    break;
                  if (y) {
                    o = this.cropStart + v;
                    var S, C = r && r[o] || this.pointClass.prototype.applyOptions.apply({
                      series: this
                    }, [l[o]]);
                    for (o = 0; o < x; o++)
                      S = C[y[o]],
                      c(S) ? g[o].push(S) : null === S && (g[o].hasNulls = !0)
                  } else
                    o = f ? e[v] : null,
                    c(o) ? g[0].push(o) : null === o && (g[0].hasNulls = !0)
                }
                return [h, d, u]
              },
              v.processData = function () {
                var t, e, i = this.chart,
                  n = this.options.dataGrouping,
                  o = !1 !== this.allowDG && n && u(n.enabled, i.options.isStock),
                  s = this.visible || !i.options.chart.ignoreHiddenSeries,
                  a = this.currentDataGrouping;
                if (this.forceCrop = o,
                  this.groupPixelWidth = null,
                  this.hasProcessed = !0,
                  !1 !== y.apply(this, arguments) && o) {
                  this.destroyGroupedData();
                  var l, h = n.groupAll ? this.xData : this.processedXData,
                    c = n.groupAll ? this.yData : this.processedYData,
                    d = i.plotSizeX,
                    p = (i = this.xAxis).options.ordinal,
                    f = this.groupPixelWidth = i.getGroupPixelWidth && i.getGroupPixelWidth();
                  if (f) {
                    if (this.isDirty = t = !0,
                      this.points = null,
                      e = (o = i.getExtremes()).min,
                      f = f * ((o = o.max) - e) / d * (p = p && i.getGroupIntervalFactor(e, o, this) || 1),
                      d = i.getTimeTicks(i.normalizeTimeTickInterval(f, n.units || k), Math.min(e, h[0]), Math.max(o, h[h.length - 1]), i.options.startOfWeek, h, this.closestPointRange),
                      h = (c = v.groupData.apply(this, [h, c, d, n.approximation]))[0],
                      p = c[1],
                      n.smoothed && h.length) {
                      for (h[l = h.length - 1] = Math.min(h[l], o); l-- && 0 < l;)
                        h[l] += f / 2;
                      h[0] = Math.max(h[0], e)
                    }
                    e = d.info,
                      this.closestPointRange = d.info.totalRange,
                      this.groupMap = c[2],
                      r(h[0]) && h[0] < i.dataMin && s && (i.min <= i.dataMin && (i.min = h[0]),
                        i.dataMin = h[0]),
                      n.groupAll && (h = (n = this.cropData(h, p, i.min, i.max, 1)).xData,
                        p = n.yData),
                      this.processedXData = h,
                      this.processedYData = p
                  } else
                    this.groupMap = null;
                  this.hasGroupedData = t,
                    this.currentDataGrouping = e,
                    this.preventGraphAnimation = (a && a.totalRange) !== (e && e.totalRange)
                }
              },
              v.destroyGroupedData = function () {
                var t = this.groupedData;
                a(t || [], function (e, i) {
                    e && (t[i] = e.destroy ? e.destroy() : null)
                  }),
                  this.groupedData = null
              },
              v.generatePoints = function () {
                x.apply(this),
                  this.destroyGroupedData(),
                  this.groupedData = this.hasGroupedData ? this.points : null
              },
              e(p, "update", function () {
                if (this.dataGroup)
                  return t.error(24),
                    !1
              }),
              m(g.prototype, "tooltipFooterHeaderFormatter", function (t, e, i) {
                var n, o = this.chart.time,
                  s = e.series,
                  r = s.tooltipOptions,
                  a = s.options.dataGrouping,
                  d = r.xDateFormat,
                  u = s.xAxis;
                return u && "datetime" === u.options.type && a && c(e.key) ? (t = s.currentDataGrouping,
                  a = a.dateTimeLabelFormats,
                  t ? (u = a[t.unitName],
                    1 === t.count ? d = u[0] : (d = u[1],
                      n = u[2])) : !d && a && (d = this.getXDateFormat(e, r, u)),
                  d = o.dateFormat(d, e.key),
                  n && (d += o.dateFormat(n, e.key + t.totalRange - 1)),
                  h(r[(i ? "footer" : "header") + "Format"], {
                    point: l(e.point, {
                      key: d
                    }),
                    series: s
                  }, o)) : t.call(this, e, i)
              }),
              e(f, "destroy", v.destroyGroupedData),
              e(f, "afterSetOptions", function (t) {
                t = t.options;
                var e = this.type,
                  i = this.chart.options.plotOptions,
                  n = s[e].dataGrouping,
                  o = this.useCommonDataGrouping && b;
                (w[e] || o) && (n || (n = d(b, w[e])),
                  t.dataGrouping = d(o, n, i.series && i.series.dataGrouping, i[e].dataGrouping, this.userOptions.dataGrouping)),
                this.chart.options.isStock && (this.requireSorting = !0)
              }),
              e(o, "afterSetScale", function () {
                a(this.series, function (t) {
                  t.hasProcessed = !1
                })
              }),
              o.prototype.getGroupPixelWidth = function () {
                var t, e, i = this.series,
                  n = i.length,
                  o = 0,
                  s = !1;
                for (t = n; t--;)
                  (e = i[t].options.dataGrouping) && (o = Math.max(o, e.groupPixelWidth));
                for (t = n; t--;)
                  (e = i[t].options.dataGrouping) && i[t].hasProcessed && (n = (i[t].processedXData || i[t].data).length,
                    i[t].groupPixelWidth || n > this.chart.plotSizeX / o || n && e.forced) && (s = !0);
                return s ? o : 0
              },
              o.prototype.setDataGrouping = function (t, e) {
                var i;
                if (e = u(e, !0),
                  t || (t = {
                    forced: !1,
                    units: null
                  }),
                  this instanceof o)
                  for (i = this.series.length; i--;)
                    this.series[i].update({
                      dataGrouping: t
                    }, !1);
                else
                  a(this.chart.options.series, function (e) {
                    e.dataGrouping = t
                  }, !1);
                this.ordinalSlope = null,
                  e && this.chart.redraw()
              }
          }(h),
          function (t) {
            var e = t.each,
              i = t.Point,
              n = t.seriesType,
              o = t.seriesTypes;
            n("ohlc", "column", {
              lineWidth: 1,
              tooltip: {
                pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
              },
              threshold: null,
              states: {
                hover: {
                  lineWidth: 3
                }
              },
              stickyTracking: !0
            }, {
              directTouch: !1,
              pointArrayMap: ["open", "high", "low", "close"],
              toYData: function (t) {
                return [t.open, t.high, t.low, t.close]
              },
              pointValKey: "close",
              pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
              },
              pointAttribs: function (t, e) {
                e = o.column.prototype.pointAttribs.call(this, t, e);
                var i = this.options;
                return delete e.fill,
                  !t.options.color && i.upColor && t.open < t.close && (e.stroke = i.upColor),
                  e
              },
              translate: function () {
                var t = this,
                  i = t.yAxis,
                  n = !!t.modifyValue,
                  s = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                o.column.prototype.translate.apply(t),
                  e(t.points, function (o) {
                    e([o.open, o.high, o.low, o.close, o.low], function (e, r) {
                        null !== e && (n && (e = t.modifyValue(e)),
                          o[s[r]] = i.toPixels(e, !0))
                      }),
                      o.tooltipPos[1] = o.plotHigh + i.pos - t.chart.plotTop
                  })
              },
              drawPoints: function () {
                var t = this,
                  i = t.chart;
                e(t.points, function (e) {
                  var n, o, s, r, a, l = e.graphic,
                    h = !l;
                  void 0 !== e.plotY && (l || (e.graphic = l = i.renderer.path().add(t.group)),
                    l.attr(t.pointAttribs(e, e.selected && "select")),
                    o = l.strokeWidth() % 2 / 2,
                    a = Math.round(e.plotX) - o,
                    s = Math.round(e.shapeArgs.width / 2),
                    r = ["M", a, Math.round(e.yBottom), "L", a, Math.round(e.plotHigh)],
                    null !== e.open && (n = Math.round(e.plotOpen) + o,
                      r.push("M", a, n, "L", a - s, n)),
                    null !== e.close && (n = Math.round(e.plotClose) + o,
                      r.push("M", a, n, "L", a + s, n)),
                    l[h ? "attr" : "animate"]({
                      d: r
                    }).addClass(e.getClassName(), !0))
                })
              },
              animate: null
            }, {
              getClassName: function () {
                return i.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
              }
            })
          }(h),
          function (t) {
            var e = t.defaultPlotOptions,
              i = t.each,
              n = t.merge,
              o = t.seriesType,
              s = t.seriesTypes;
            o("candlestick", "ohlc", n(e.column, {
              states: {
                hover: {
                  lineWidth: 2
                }
              },
              tooltip: e.ohlc.tooltip,
              threshold: null,
              lineColor: "#000000",
              lineWidth: 1,
              upColor: "#ffffff",
              stickyTracking: !0
            }), {
              pointAttribs: function (t, e) {
                var i = s.column.prototype.pointAttribs.call(this, t, e),
                  n = this.options,
                  o = t.open < t.close,
                  r = n.lineColor || this.color;
                return i["stroke-width"] = n.lineWidth,
                  i.fill = t.options.color || o && n.upColor || this.color,
                  i.stroke = t.lineColor || o && n.upLineColor || r,
                  e && (t = n.states[e],
                    i.fill = t.color || i.fill,
                    i.stroke = t.lineColor || i.stroke,
                    i["stroke-width"] = t.lineWidth || i["stroke-width"]),
                  i
              },
              drawPoints: function () {
                var t = this,
                  e = t.chart;
                i(t.points, function (i) {
                  var n, o, s, r, a, l, h, c = i.graphic,
                    d = !c;
                  void 0 !== i.plotY && (c || (i.graphic = c = e.renderer.path().add(t.group)),
                    c.attr(t.pointAttribs(i, i.selected && "select")).shadow(t.options.shadow),
                    a = c.strokeWidth() % 2 / 2,
                    l = Math.round(i.plotX) - a,
                    n = i.plotOpen,
                    o = i.plotClose,
                    s = Math.min(n, o),
                    n = Math.max(n, o),
                    h = Math.round(i.shapeArgs.width / 2),
                    o = Math.round(s) !== Math.round(i.plotHigh),
                    r = n !== i.yBottom,
                    s = Math.round(s) + a,
                    n = Math.round(n) + a,
                    (a = []).push("M", l - h, n, "L", l - h, s, "L", l + h, s, "L", l + h, n, "Z", "M", l, s, "L", l, o ? Math.round(i.plotHigh) : s, "M", l, n, "L", l, r ? Math.round(i.yBottom) : n),
                    c[d ? "attr" : "animate"]({
                      d: a
                    }).addClass(i.getClassName(), !0))
                })
              }
            })
          }(h),
          function (t, e) {
            function i(t) {
              d[t + "pin"] = function (e, i, n, o, s) {
                var r = s && s.anchorX;
                return s = s && s.anchorY,
                  "circle" === t && o > n && (e -= Math.round((o - n) / 2),
                    n = o),
                  e = d[t](e, i, n, o),
                  r && s && (e.push("M", "circle" === t ? e[1] - e[4] : e[1] + e[4] / 2, i > s ? i : i + o, "L", r, s),
                    e = e.concat(d.circle(r - 1, s - 1, 2, 2))),
                  e
              }
            }
            var n = t.addEvent,
              o = t.each,
              s = t.merge,
              r = t.noop,
              a = t.Renderer,
              l = t.seriesType,
              h = t.TrackerMixin,
              c = t.VMLRenderer,
              d = t.SVGRenderer.prototype.symbols;
            l("flags", "column", {
                pointRange: 0,
                allowOverlapX: !1,
                shape: "flag",
                stackDistance: 12,
                textAlign: "center",
                tooltip: {
                  pointFormat: "{point.text}<br/>"
                },
                threshold: null,
                y: -30,
                fillColor: "#ffffff",
                lineWidth: 1,
                states: {
                  hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                  }
                },
                style: {
                  fontSize: "11px",
                  fontWeight: "bold"
                }
              }, {
                sorted: !1,
                noSharedTooltip: !0,
                allowDG: !1,
                takeOrdinalPosition: !1,
                trackerGroups: ["markerGroup"],
                forceCrop: !0,
                init: t.Series.prototype.init,
                pointAttribs: function (t, e) {
                  var i = this.options,
                    n = t && t.color || this.color,
                    o = i.lineColor,
                    s = t && t.lineWidth;
                  return t = t && t.fillColor || i.fillColor,
                    e && (t = i.states[e].fillColor,
                      o = i.states[e].lineColor,
                      s = i.states[e].lineWidth), {
                      fill: t || n,
                      stroke: o || n,
                      "stroke-width": s || i.lineWidth || 0
                    }
                },
                translate: e.translate,
                getPlotBox: e.getPlotBox,
                drawPoints: function () {
                  var e, i, n, r, a, l, h, c, d = this.points,
                    u = this.chart,
                    p = u.renderer,
                    f = u.inverted,
                    g = this.options,
                    m = g.y,
                    v = this.yAxis,
                    y = {},
                    x = [];
                  for (r = d.length; r--;)
                    a = d[r],
                    c = (f ? a.plotY : a.plotX) > this.xAxis.len,
                    e = a.plotX,
                    l = a.stackIndex,
                    n = a.options.shape || g.shape,
                    void 0 !== (i = a.plotY) && (i = a.plotY + m - (void 0 !== l && l * g.stackDistance)),
                    a.anchorX = l ? void 0 : a.plotX,
                    h = l ? void 0 : a.plotY,
                    l = a.graphic,
                    void 0 !== i && 0 <= e && !c ? (l || (l = a.graphic = p.label("", null, null, n, null, null, g.useHTML).attr(this.pointAttribs(a)).css(s(g.style, a.style)).attr({
                          align: "flag" === n ? "left" : "center",
                          width: g.width,
                          height: g.height,
                          "text-align": g.textAlign
                        }).addClass("highcharts-point").add(this.markerGroup),
                        a.graphic.div && (a.graphic.div.point = a),
                        l.shadow(g.shadow),
                        l.isNew = !0),
                      0 < e && (e -= l.strokeWidth() % 2),
                      n = {
                        y: i,
                        anchorY: h
                      },
                      g.allowOverlapX && (n.x = e,
                        n.anchorX = a.anchorX),
                      l.attr({
                        text: a.options.title || g.title || "A"
                      })[l.isNew ? "attr" : "animate"](n),
                      g.allowOverlapX || (y[a.plotX] ? y[a.plotX].size = Math.max(y[a.plotX].size, l.width) : y[a.plotX] = {
                        align: 0,
                        size: l.width,
                        target: e,
                        anchorX: e
                      }),
                      a.tooltipPos = [e, i + v.pos - u.plotTop]) : l && (a.graphic = l.destroy());
                  g.allowOverlapX || (t.objectEach(y, function (t) {
                        t.plotX = t.anchorX,
                          x.push(t)
                      }),
                      t.distribute(x, f ? v.len : this.xAxis.len, 100),
                      o(d, function (t) {
                        var e = t.graphic && y[t.plotX];
                        e && (t.graphic[t.graphic.isNew ? "attr" : "animate"]({
                            x: e.pos,
                            anchorX: t.anchorX
                          }),
                          t.graphic.isNew = !1)
                      })),
                    g.useHTML && t.wrap(this.markerGroup, "on", function (e) {
                      return t.SVGElement.prototype.on.apply(e.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                    })
                },
                drawTracker: function () {
                  var t = this.points;
                  h.drawTrackerPoint.apply(this),
                    o(t, function (e) {
                      var i = e.graphic;
                      i && n(i.element, "mouseover", function () {
                        0 < e.stackIndex && !e.raised && (e._y = i.y,
                            i.attr({
                              y: e._y - 8
                            }),
                            e.raised = !0),
                          o(t, function (t) {
                            t !== e && t.raised && t.graphic && (t.graphic.attr({
                                y: t._y
                              }),
                              t.raised = !1)
                          })
                      })
                    })
                },
                animate: r,
                buildKDTree: r,
                setClip: r,
                invertGroups: r
              }),
              d.flag = function (t, e, i, n, o) {
                var s = o && o.anchorX || t;
                return o = o && o.anchorY || e,
                  d.circle(s - 1, o - 1, 2, 2).concat(["M", s, o, "L", t, e + n, t, e, t + i, e, t + i, e + n, t, e + n, "Z"])
              },
              i("circle"),
              i("square"),
              a === c && o(["flag", "circlepin", "squarepin"], function (t) {
                c.prototype.symbols[t] = d[t]
              })
          }(h, c = function (t) {
            var e = t.each,
              i = t.defined,
              n = t.seriesTypes,
              o = t.stableSort;
            return {
              getPlotBox: function () {
                return t.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
              },
              translate: function () {
                n.column.prototype.translate.apply(this);
                var t, s, r, a, l, h, c = this.options,
                  d = this.chart,
                  u = this.points,
                  p = u.length - 1,
                  f = (f = c.onSeries) && d.get(f),
                  g = (c = c.onKey || "y",
                    f && f.options.step),
                  m = f && f.points,
                  v = m && m.length,
                  y = d.inverted,
                  x = this.xAxis,
                  b = this.yAxis,
                  w = 0;
                if (f && f.visible && v)
                  for (w = (f.pointXOffset || 0) + (f.barW || 0) / 2,
                    t = f.currentDataGrouping,
                    a = m[v - 1].x + (t ? t.totalRange : 0),
                    o(u, function (t, e) {
                      return t.x - e.x
                    }),
                    c = "plot" + c[0].toUpperCase() + c.substr(1); v-- && u[p] && (r = m[v],
                      (t = u[p]).y = r.y,
                      !(r.x <= t.x && void 0 !== r[c] && (t.x <= a && (t.plotY = r[c],
                          r.x < t.x && !g && (l = m[v + 1]) && void 0 !== l[c] && (h = (t.x - r.x) / (l.x - r.x),
                            t.plotY += h * (l[c] - r[c]),
                            t.y += h * (l.y - r.y))),
                        p--,
                        v++,
                        0 > p)));)
                ;
                e(u, function (t, e) {
                    var n;
                    t.plotX += w,
                      (void 0 === t.plotY || y) && (0 <= t.plotX && t.plotX <= x.len ? y ? (t.plotY = x.translate(t.x, 0, 1, 0, 1),
                        t.plotX = i(t.y) ? b.translate(t.y, 0, 0, 0, 1) : 0) : t.plotY = d.chartHeight - x.bottom - (x.opposite ? x.height : 0) + x.offset - b.top : t.shapeArgs = {}),
                      (s = u[e - 1]) && s.plotX === t.plotX && (void 0 === s.stackIndex && (s.stackIndex = 0),
                        n = s.stackIndex + 1),
                      t.stackIndex = n
                  }),
                  this.onSeries = f
              }
            }
          }(h)),
          function (t) {
            function e(t, e, i) {
              this.init(t, e, i)
            }
            var i, n = t.addEvent,
              o = t.Axis,
              s = t.correctFloat,
              r = t.defaultOptions,
              a = t.defined,
              l = t.destroyObjectProperties,
              h = t.each,
              c = t.fireEvent,
              d = t.hasTouch,
              u = t.isTouchDevice,
              p = t.merge,
              f = t.pick,
              g = t.removeEvent,
              m = t.wrap,
              v = {
                height: u ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: t.svg && !u,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
              };
            r.scrollbar = p(!0, v, r.scrollbar),
              t.swapXY = i = function (t, e) {
                var i, n = t.length;
                if (e)
                  for (e = 0; e < n; e += 3)
                    i = t[e + 1],
                    t[e + 1] = t[e + 2],
                    t[e + 2] = i;
                return t
              },
              e.prototype = {
                init: function (t, e, i) {
                  this.scrollbarButtons = [],
                    this.renderer = t,
                    this.userOptions = e,
                    this.options = p(v, e),
                    this.chart = i,
                    this.size = f(this.options.size, this.options.height),
                    e.enabled && (this.render(),
                      this.initEvents(),
                      this.addEvents())
                },
                render: function () {
                  var t, e = this.renderer,
                    n = this.options,
                    o = this.size;
                  this.group = t = e.g("scrollbar").attr({
                      zIndex: n.zIndex,
                      translateY: -99999
                    }).add(),
                    this.track = e.rect().addClass("highcharts-scrollbar-track").attr({
                      x: 0,
                      r: n.trackBorderRadius || 0,
                      height: o,
                      width: o
                    }).add(t),
                    this.track.attr({
                      fill: n.trackBackgroundColor,
                      stroke: n.trackBorderColor,
                      "stroke-width": n.trackBorderWidth
                    }),
                    this.trackBorderWidth = this.track.strokeWidth(),
                    this.track.attr({
                      y: -this.trackBorderWidth % 2 / 2
                    }),
                    this.scrollbarGroup = e.g().add(t),
                    this.scrollbar = e.rect().addClass("highcharts-scrollbar-thumb").attr({
                      height: o,
                      width: o,
                      r: n.barBorderRadius || 0
                    }).add(this.scrollbarGroup),
                    this.scrollbarRifles = e.path(i(["M", -3, o / 4, "L", -3, 2 * o / 3, "M", 0, o / 4, "L", 0, 2 * o / 3, "M", 3, o / 4, "L", 3, 2 * o / 3], n.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup),
                    this.scrollbar.attr({
                      fill: n.barBackgroundColor,
                      stroke: n.barBorderColor,
                      "stroke-width": n.barBorderWidth
                    }),
                    this.scrollbarRifles.attr({
                      stroke: n.rifleColor,
                      "stroke-width": 1
                    }),
                    this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(),
                    this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2),
                    this.drawScrollbarButton(0),
                    this.drawScrollbarButton(1)
                },
                position: function (t, e, i, n) {
                  var o = this.options.vertical,
                    s = 0,
                    r = this.rendered ? "animate" : "attr";
                  this.x = t,
                    this.y = e + this.trackBorderWidth,
                    this.width = i,
                    this.xOffset = this.height = n,
                    this.yOffset = s,
                    o ? (this.width = this.yOffset = i = s = this.size,
                      this.xOffset = e = 0,
                      this.barWidth = n - 2 * i,
                      this.x = t += this.options.margin) : (this.height = this.xOffset = n = e = this.size,
                      this.barWidth = i - 2 * n,
                      this.y += this.options.margin),
                    this.group[r]({
                      translateX: t,
                      translateY: this.y
                    }),
                    this.track[r]({
                      width: i,
                      height: n
                    }),
                    this.scrollbarButtons[1][r]({
                      translateX: o ? 0 : i - e,
                      translateY: o ? n - s : 0
                    })
                },
                drawScrollbarButton: function (t) {
                  var e, n = this.renderer,
                    o = this.scrollbarButtons,
                    s = this.options,
                    r = this.size;
                  e = n.g().add(this.group),
                    o.push(e),
                    (e = n.rect().addClass("highcharts-scrollbar-button").add(e)).attr({
                      stroke: s.buttonBorderColor,
                      "stroke-width": s.buttonBorderWidth,
                      fill: s.buttonBackgroundColor
                    }),
                    e.attr(e.crisp({
                      x: -.5,
                      y: -.5,
                      width: r + 1,
                      height: r + 1,
                      r: s.buttonBorderRadius
                    }, e.strokeWidth())),
                    (e = n.path(i(["M", r / 2 + (t ? -1 : 1), r / 2 - 3, "L", r / 2 + (t ? -1 : 1), r / 2 + 3, "L", r / 2 + (t ? 2 : -2), r / 2], s.vertical)).addClass("highcharts-scrollbar-arrow").add(o[t])).attr({
                      fill: s.buttonArrowColor
                    })
                },
                setRange: function (t, e) {
                  var i, n, o = this.options,
                    r = o.vertical,
                    l = o.minWidth,
                    h = this.barWidth,
                    c = this.rendered && !this.hasDragged ? "animate" : "attr";
                  a(h) && (t = Math.max(t, 0),
                    i = Math.ceil(h * t),
                    this.calculatedWidth = n = s(h * Math.min(e, 1) - i),
                    n < l && (i = (h - l + n) * t,
                      n = l),
                    l = Math.floor(i + this.xOffset + this.yOffset),
                    h = n / 2 - .5,
                    this.from = t,
                    this.to = e,
                    r ? (this.scrollbarGroup[c]({
                        translateY: l
                      }),
                      this.scrollbar[c]({
                        height: n
                      }),
                      this.scrollbarRifles[c]({
                        translateY: h
                      }),
                      this.scrollbarTop = l,
                      this.scrollbarLeft = 0) : (this.scrollbarGroup[c]({
                        translateX: l
                      }),
                      this.scrollbar[c]({
                        width: n
                      }),
                      this.scrollbarRifles[c]({
                        translateX: h
                      }),
                      this.scrollbarLeft = l,
                      this.scrollbarTop = 0),
                    12 >= n ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0),
                    !1 === o.showFull && (0 >= t && 1 <= e ? this.group.hide() : this.group.show()),
                    this.rendered = !0)
                },
                initEvents: function () {
                  var t = this;
                  t.mouseMoveHandler = function (e) {
                      var i = t.chart.pointer.normalize(e),
                        n = t.options.vertical ? "chartY" : "chartX",
                        o = t.initPositions;
                      !t.grabbedCenter || e.touches && 0 === e.touches[0][n] || (n = (i = t.cursorToScrollbarPosition(i)[n]) - (n = t[n]),
                        t.hasDragged = !0,
                        t.updatePosition(o[0] + n, o[1] + n),
                        t.hasDragged && c(t, "changed", {
                          from: t.from,
                          to: t.to,
                          trigger: "scrollbar",
                          DOMType: e.type,
                          DOMEvent: e
                        }))
                    },
                    t.mouseUpHandler = function (e) {
                      t.hasDragged && c(t, "changed", {
                          from: t.from,
                          to: t.to,
                          trigger: "scrollbar",
                          DOMType: e.type,
                          DOMEvent: e
                        }),
                        t.grabbedCenter = t.hasDragged = t.chartX = t.chartY = null
                    },
                    t.mouseDownHandler = function (e) {
                      e = t.chart.pointer.normalize(e),
                        e = t.cursorToScrollbarPosition(e),
                        t.chartX = e.chartX,
                        t.chartY = e.chartY,
                        t.initPositions = [t.from, t.to],
                        t.grabbedCenter = !0
                    },
                    t.buttonToMinClick = function (e) {
                      var i = s(t.to - t.from) * t.options.step;
                      t.updatePosition(s(t.from - i), s(t.to - i)),
                        c(t, "changed", {
                          from: t.from,
                          to: t.to,
                          trigger: "scrollbar",
                          DOMEvent: e
                        })
                    },
                    t.buttonToMaxClick = function (e) {
                      var i = (t.to - t.from) * t.options.step;
                      t.updatePosition(t.from + i, t.to + i),
                        c(t, "changed", {
                          from: t.from,
                          to: t.to,
                          trigger: "scrollbar",
                          DOMEvent: e
                        })
                    },
                    t.trackClick = function (e) {
                      var i = t.chart.pointer.normalize(e),
                        n = t.to - t.from,
                        o = t.y + t.scrollbarTop,
                        s = t.x + t.scrollbarLeft;
                      t.options.vertical && i.chartY > o || !t.options.vertical && i.chartX > s ? t.updatePosition(t.from + n, t.to + n) : t.updatePosition(t.from - n, t.to - n),
                        c(t, "changed", {
                          from: t.from,
                          to: t.to,
                          trigger: "scrollbar",
                          DOMEvent: e
                        })
                    }
                },
                cursorToScrollbarPosition: function (t) {
                  var e = (e = this.options).minWidth > this.calculatedWidth ? e.minWidth : 0;
                  return {
                    chartX: (t.chartX - this.x - this.xOffset) / (this.barWidth - e),
                    chartY: (t.chartY - this.y - this.yOffset) / (this.barWidth - e)
                  }
                },
                updatePosition: function (t, e) {
                  1 < e && (t = s(1 - s(e - t)),
                      e = 1),
                    0 > t && (e = s(e - t),
                      t = 0),
                    this.from = t,
                    this.to = e
                },
                update: function (t) {
                  this.destroy(),
                    this.init(this.chart.renderer, p(!0, this.options, t), this.chart)
                },
                addEvents: function () {
                  var t = this.options.inverted ? [1, 0] : [0, 1],
                    e = this.scrollbarButtons,
                    i = this.scrollbarGroup.element,
                    o = this.mouseDownHandler,
                    s = this.mouseMoveHandler,
                    r = this.mouseUpHandler;
                  t = [
                    [e[t[0]].element, "click", this.buttonToMinClick],
                    [e[t[1]].element, "click", this.buttonToMaxClick],
                    [this.track.element, "click", this.trackClick],
                    [i, "mousedown", o],
                    [i.ownerDocument, "mousemove", s],
                    [i.ownerDocument, "mouseup", r]
                  ];
                  d && t.push([i, "touchstart", o], [i.ownerDocument, "touchmove", s], [i.ownerDocument, "touchend", r]),
                    h(t, function (t) {
                      n.apply(null, t)
                    }),
                    this._events = t
                },
                removeEvents: function () {
                  h(this._events, function (t) {
                      g.apply(null, t)
                    }),
                    this._events.length = 0
                },
                destroy: function () {
                  var t = this.chart.scroller;
                  this.removeEvents(),
                    h(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function (t) {
                      this[t] && this[t].destroy && (this[t] = this[t].destroy())
                    }, this),
                    t && this === t.scrollbar && (t.scrollbar = null,
                      l(t.scrollbarButtons))
                }
              },
              m(o.prototype, "init", function (t) {
                var i = this;
                t.apply(i, Array.prototype.slice.call(arguments, 1)),
                  i.options.scrollbar && i.options.scrollbar.enabled && (i.options.scrollbar.vertical = !i.horiz,
                    i.options.startOnTick = i.options.endOnTick = !1,
                    i.scrollbar = new e(i.chart.renderer, i.options.scrollbar, i.chart),
                    n(i.scrollbar, "changed", function (t) {
                      var e, n = Math.min(f(i.options.min, i.min), i.min, i.dataMin),
                        o = Math.max(f(i.options.max, i.max), i.max, i.dataMax) - n;
                      i.horiz && !i.reversed || !i.horiz && i.reversed ? (e = n + o * this.to,
                          n += o * this.from) : (e = n + o * (1 - this.from),
                          n += o * (1 - this.to)),
                        i.setExtremes(n, e, !0, !1, t)
                    }))
              }),
              m(o.prototype, "render", function (t) {
                var e = Math.min(f(this.options.min, this.min), this.min, f(this.dataMin, this.min)),
                  i = Math.max(f(this.options.max, this.max), this.max, f(this.dataMax, this.max)),
                  n = this.scrollbar,
                  o = this.titleOffset || 0;
                t.apply(this, Array.prototype.slice.call(arguments, 1)),
                  n && (this.horiz ? (n.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : o + this.axisTitleMargin + this.offset), this.width, this.height),
                      o = 1) : (n.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? o + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height),
                      o = 0),
                    (!this.opposite && !this.horiz || this.opposite && this.horiz) && (this.chart.scrollbarsOffsets[o] += this.scrollbar.size + this.scrollbar.options.margin),
                    isNaN(e) || isNaN(i) || !a(this.min) || !a(this.max) ? n.setRange(0, 0) : (o = (this.min - e) / (i - e),
                      e = (this.max - e) / (i - e),
                      this.horiz && !this.reversed || !this.horiz && this.reversed ? n.setRange(o, e) : n.setRange(1 - e, 1 - o)))
              }),
              m(o.prototype, "getOffset", function (t) {
                var e = this.horiz ? 2 : 1,
                  i = this.scrollbar;
                t.apply(this, Array.prototype.slice.call(arguments, 1)),
                  i && (this.chart.scrollbarsOffsets = [0, 0],
                    this.chart.axisOffset[e] += i.size + i.options.margin)
              }),
              m(o.prototype, "destroy", function (t) {
                this.scrollbar && (this.scrollbar = this.scrollbar.destroy()),
                  t.apply(this, Array.prototype.slice.call(arguments, 1))
              }),
              t.Scrollbar = e
          }(h),
          function (t) {
            function e(t) {
              this.init(t)
            }
            var i = t.addEvent,
              n = t.Axis,
              o = t.Chart,
              s = t.color,
              r = t.defaultOptions,
              a = t.defined,
              l = t.destroyObjectProperties,
              h = t.each,
              c = t.erase,
              d = t.error,
              u = t.extend,
              p = t.grep,
              f = t.hasTouch,
              g = t.isArray,
              m = t.isNumber,
              v = t.isObject,
              y = t.merge,
              x = t.pick,
              b = t.removeEvent,
              w = t.Scrollbar,
              k = t.Series,
              T = t.seriesTypes,
              S = t.wrap,
              C = [].concat(t.defaultDataGroupingUnits),
              A = function (t) {
                var e = p(arguments, m);
                if (e.length)
                  return Math[t].apply(0, e)
              };
            C[4] = ["day", [1, 2, 3, 4]],
              C[5] = ["week", [1, 2, 3]],
              T = void 0 === T.areaspline ? "line" : "areaspline",
              u(r, {
                navigator: {
                  height: 40,
                  margin: 25,
                  maskInside: !0,
                  handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                  },
                  maskFill: s("#6685c2").setOpacity(.3).get(),
                  outlineColor: "#cccccc",
                  outlineWidth: 1,
                  series: {
                    type: T,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                      approximation: "average",
                      enabled: !0,
                      groupPixelWidth: 2,
                      smoothed: !0,
                      units: C
                    },
                    dataLabels: {
                      enabled: !1,
                      zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                      enabled: !1
                    },
                    pointRange: 0,
                    threshold: null
                  },
                  xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                      align: "left",
                      style: {
                        color: "#999999"
                      },
                      x: 3,
                      y: -4
                    },
                    crosshair: !1
                  },
                  yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                      enabled: !1
                    },
                    crosshair: !1,
                    title: {
                      text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                  }
                }
              }),
              t.Renderer.prototype.symbols["navigator-handle"] = function (t, e, i, n, o) {
                return t = o.width / 2,
                  e = Math.round(t / 3) + .5,
                  ["M", -t - 1, .5, "L", t, .5, "L", t, (o = o.height) + .5, "L", -t - 1, o + .5, "L", -t - 1, .5, "M", -e, 4, "L", -e, o - 3, "M", e - 1, 4, "L", e - 1, o - 3]
              },
              e.prototype = {
                drawHandle: function (t, e, i, n) {
                  var o = this.navigatorOptions.handles.height;
                  this.handles[e][n](i ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(t, 10) + .5 - o)
                  } : {
                    translateX: Math.round(this.left + parseInt(t, 10)),
                    translateY: Math.round(this.top + this.height / 2 - o / 2 - 1)
                  })
                },
                drawOutline: function (t, e, i, n) {
                  var o = this.navigatorOptions.maskInside,
                    s = (r = this.outline.strokeWidth()) / 2,
                    r = r % 2 / 2,
                    a = this.outlineHeight,
                    l = this.scrollbarHeight,
                    h = this.size,
                    c = this.left - l,
                    d = this.top;
                  i ? t = ["M", (c -= s) + a, d - l - r, "L", c + a, i = d + e + r, "L", c, i, "L", c, e = d + t + r, "L", c + a, e, "L", c + a, d + h + l].concat(o ? ["M", c + a, i - s, "L", c + a, e + s] : []) : t = ["M", c, d += s, "L", t += c + l - r, d, "L", t, d + a, "L", e += c + l - r, d + a, "L", e, d, "L", c + h + 2 * l, d].concat(o ? ["M", t - s, d, "L", e + s, d] : []),
                    this.outline[n]({
                      d: t
                    })
                },
                drawMasks: function (t, e, i, n) {
                  var o, s, r, a, l = this.left,
                    c = this.top,
                    d = this.height;
                  i ? (r = [l, l, l],
                      a = [c, c + t, c + e],
                      s = [d, d, d],
                      o = [t, e - t, this.size - e]) : (r = [l, l + t, l + e],
                      a = [c, c, c],
                      s = [t, e - t, this.size - e],
                      o = [d, d, d]),
                    h(this.shades, function (t, e) {
                      t[n]({
                        x: r[e],
                        y: a[e],
                        width: s[e],
                        height: o[e]
                      })
                    })
                },
                renderElements: function () {
                  var t, e = this,
                    i = e.navigatorOptions,
                    n = i.maskInside,
                    o = e.chart,
                    s = o.inverted,
                    r = o.renderer;
                  e.navigatorGroup = t = r.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                  }).add();
                  var a = {
                    cursor: s ? "ns-resize" : "ew-resize"
                  };
                  h([!n, n, !n], function (n, o) {
                      e.shades[o] = r.rect().addClass("highcharts-navigator-mask" + (1 === o ? "-inside" : "-outside")).attr({
                        fill: n ? i.maskFill : "rgba(0,0,0,0)"
                      }).css(1 === o && a).add(t)
                    }),
                    e.outline = r.path().addClass("highcharts-navigator-outline").attr({
                      "stroke-width": i.outlineWidth,
                      stroke: i.outlineColor
                    }).add(t),
                    i.handles.enabled && h([0, 1], function (n) {
                      i.handles.inverted = o.inverted,
                        e.handles[n] = r.symbol(i.handles.symbols[n], -i.handles.width / 2 - 1, 0, i.handles.width, i.handles.height, i.handles),
                        e.handles[n].attr({
                          zIndex: 7 - n
                        }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][n]).add(t);
                      var s = i.handles;
                      e.handles[n].attr({
                        fill: s.backgroundColor,
                        stroke: s.borderColor,
                        "stroke-width": s.lineWidth
                      }).css(a)
                    })
                },
                update: function (t) {
                  h(this.series || [], function (t) {
                      t.baseSeries && delete t.baseSeries.navigatorSeries
                    }),
                    this.destroy(),
                    y(!0, this.chart.options.navigator, this.options, t),
                    this.init(this.chart)
                },
                render: function (e, i, n, o) {
                  var s, r, l, h = this.chart,
                    c = this.scrollbarHeight,
                    d = this.xAxis;
                  s = d.fake ? h.xAxis[0] : d;
                  var u, p = this.navigatorEnabled,
                    f = this.rendered;
                  r = h.inverted;
                  var g, v = h.xAxis[0].minRange,
                    y = h.xAxis[0].options.maxRange;
                  if (!this.hasDragged || a(n)) {
                    if (!m(e) || !m(i)) {
                      if (!f)
                        return;
                      n = 0,
                        o = x(d.width, s.width)
                    }
                    this.left = x(d.left, h.plotLeft + c + (r ? h.plotWidth : 0)),
                      this.size = u = l = x(d.len, (r ? h.plotHeight : h.plotWidth) - 2 * c),
                      h = r ? c : l + 2 * c,
                      n = x(n, d.toPixels(e, !0)),
                      o = x(o, d.toPixels(i, !0)),
                      m(n) && 1 / 0 !== Math.abs(n) || (n = 0,
                        o = h),
                      e = d.toValue(n, !0),
                      i = d.toValue(o, !0),
                      (g = Math.abs(t.correctFloat(i - e))) < v ? this.grabbedLeft ? n = d.toPixels(i - v, !0) : this.grabbedRight && (o = d.toPixels(e + v, !0)) : a(y) && g > y && (this.grabbedLeft ? n = d.toPixels(i - y, !0) : this.grabbedRight && (o = d.toPixels(e + y, !0))),
                      this.zoomedMax = Math.min(Math.max(n, o, 0), u),
                      this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(n, o), 0), u),
                      this.range = this.zoomedMax - this.zoomedMin,
                      u = Math.round(this.zoomedMax),
                      n = Math.round(this.zoomedMin),
                      p && (this.navigatorGroup.attr({
                          visibility: "visible"
                        }),
                        f = f && !this.hasDragged ? "animate" : "attr",
                        this.drawMasks(n, u, r, f),
                        this.drawOutline(n, u, r, f),
                        this.navigatorOptions.handles.enabled && (this.drawHandle(n, 0, r, f),
                          this.drawHandle(u, 1, r, f))),
                      this.scrollbar && (r ? (r = this.top - c,
                          s = this.left - c + (p || !s.opposite ? 0 : (s.titleOffset || 0) + s.axisTitleMargin),
                          c = l + 2 * c) : (r = this.top + (p ? this.height : -c),
                          s = this.left - c),
                        this.scrollbar.position(s, r, h, c),
                        this.scrollbar.setRange(this.zoomedMin / l, this.zoomedMax / l)),
                      this.rendered = !0
                  }
                },
                addMouseEvents: function () {
                  var t, e, n = this,
                    o = n.chart,
                    s = o.container,
                    r = [];
                  n.mouseMoveHandler = t = function (t) {
                      n.onMouseMove(t)
                    },
                    n.mouseUpHandler = e = function (t) {
                      n.onMouseUp(t)
                    },
                    (r = n.getPartsEvents("mousedown")).push(i(s, "mousemove", t), i(s.ownerDocument, "mouseup", e)),
                    f && (r.push(i(s, "touchmove", t), i(s.ownerDocument, "touchend", e)),
                      r.concat(n.getPartsEvents("touchstart"))),
                    n.eventsToUnbind = r,
                    n.series && n.series[0] && r.push(i(n.series[0].xAxis, "foundExtremes", function () {
                      o.navigator.modifyNavigatorAxisExtremes()
                    }))
                },
                getPartsEvents: function (t) {
                  var e = this,
                    n = [];
                  return h(["shades", "handles"], function (o) {
                      h(e[o], function (s, r) {
                        n.push(i(s.element, t, function (t) {
                          e[o + "Mousedown"](t, r)
                        }))
                      })
                    }),
                    n
                },
                shadesMousedown: function (t, e) {
                  t = this.chart.pointer.normalize(t);
                  var i, n, o = this.chart,
                    s = this.xAxis,
                    r = this.zoomedMin,
                    l = this.left,
                    h = this.size,
                    c = this.range,
                    d = t.chartX;
                  o.inverted && (d = t.chartY,
                      l = this.top),
                    1 === e ? (this.grabbedCenter = d,
                      this.fixedWidth = c,
                      this.dragOffset = d - r) : (t = d - l - c / 2,
                      0 === e ? t = Math.max(0, t) : 2 === e && t + c >= h && (t = h - c,
                        s.reversed ? (t -= c,
                          n = this.getUnionExtremes().dataMin) : i = this.getUnionExtremes().dataMax),
                      t !== r && (this.fixedWidth = c,
                        e = s.toFixedRange(t, t + c, n, i),
                        a(e.min) && o.xAxis[0].setExtremes(Math.min(e.min, e.max), Math.max(e.min, e.max), !0, null, {
                          trigger: "navigator"
                        })))
                },
                handlesMousedown: function (t, e) {
                  this.chart.pointer.normalize(t);
                  var i = (t = this.chart).xAxis[0],
                    n = t.inverted && !i.reversed || !t.inverted && i.reversed;
                  0 === e ? (this.grabbedLeft = !0,
                      this.otherHandlePos = this.zoomedMax,
                      this.fixedExtreme = n ? i.min : i.max) : (this.grabbedRight = !0,
                      this.otherHandlePos = this.zoomedMin,
                      this.fixedExtreme = n ? i.max : i.min),
                    t.fixedRange = null
                },
                onMouseMove: function (t) {
                  var e = this,
                    i = e.chart,
                    n = e.left,
                    o = e.navigatorSize,
                    s = e.range,
                    r = e.dragOffset,
                    a = i.inverted;
                  t.touches && 0 === t.touches[0].pageX || (i = (t = i.pointer.normalize(t)).chartX,
                    a && (n = e.top,
                      i = t.chartY),
                    e.grabbedLeft ? (e.hasDragged = !0,
                      e.render(0, 0, i - n, e.otherHandlePos)) : e.grabbedRight ? (e.hasDragged = !0,
                      e.render(0, 0, e.otherHandlePos, i - n)) : e.grabbedCenter && (e.hasDragged = !0,
                      i < r ? i = r : i > o + r - s && (i = o + r - s),
                      e.render(0, 0, i - r, i - r + s)),
                    e.hasDragged && e.scrollbar && e.scrollbar.options.liveRedraw && (t.DOMType = t.type,
                      setTimeout(function () {
                        e.onMouseUp(t)
                      }, 0)))
                },
                onMouseUp: function (t) {
                  var e, i, n = this.chart,
                    o = this.xAxis,
                    s = o && o.reversed,
                    r = this.scrollbar,
                    l = t.DOMEvent || t;
                  (!this.hasDragged || r && r.hasDragged) && "scrollbar" !== t.trigger || (r = this.getUnionExtremes(),
                      this.zoomedMin === this.otherHandlePos ? e = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (i = this.fixedExtreme),
                      this.zoomedMax === this.size && (i = s ? r.dataMin : r.dataMax),
                      0 === this.zoomedMin && (e = s ? r.dataMax : r.dataMin),
                      o = o.toFixedRange(this.zoomedMin, this.zoomedMax, e, i),
                      a(o.min) && n.xAxis[0].setExtremes(Math.min(o.min, o.max), Math.max(o.min, o.max), !0, !this.hasDragged && null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: l
                      })),
                    "mousemove" !== t.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
                },
                removeEvents: function () {
                  this.eventsToUnbind && (h(this.eventsToUnbind, function (t) {
                        t()
                      }),
                      this.eventsToUnbind = void 0),
                    this.removeBaseSeriesEvents()
                },
                removeBaseSeriesEvents: function () {
                  var t = this.baseSeries || [];
                  this.navigatorEnabled && t[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && h(t, function (t) {
                      b(t, "updatedData", this.updatedDataHandler)
                    }, this),
                    t[0].xAxis && b(t[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
                },
                init: function (t) {
                  var e = (r = t.options).navigator,
                    o = e.enabled,
                    s = (h = r.scrollbar).enabled,
                    r = o ? e.height : 0,
                    a = s ? h.height : 0;
                  this.handles = [],
                    this.shades = [],
                    this.chart = t,
                    this.setBaseSeries(),
                    this.height = r,
                    this.scrollbarHeight = a,
                    this.scrollbarEnabled = s,
                    this.navigatorEnabled = o,
                    this.navigatorOptions = e,
                    this.scrollbarOptions = h,
                    this.outlineHeight = r + a,
                    this.opposite = x(e.opposite, !o && t.inverted);
                  var l = this,
                    h = l.baseSeries,
                    c = (s = t.xAxis.length,
                      t.yAxis.length),
                    d = h && h[0] && h[0].xAxis || t.xAxis[0] || {
                      options: {}
                    };
                  t.extraMargin = {
                      type: l.opposite ? "plotTop" : "marginBottom",
                      value: (o || !t.inverted ? l.outlineHeight : 0) + e.margin
                    },
                    t.inverted && (t.extraMargin.type = l.opposite ? "marginRight" : "plotLeft"),
                    t.isDirtyBox = !0,
                    l.navigatorEnabled ? (l.xAxis = new n(t, y({
                        breaks: d.options.breaks,
                        ordinal: d.options.ordinal
                      }, e.xAxis, {
                        id: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        isX: !0,
                        type: "datetime",
                        index: s,
                        offset: 0,
                        keepOrdinalPadding: !0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: !1
                      }, t.inverted ? {
                        offsets: [a, 0, -a, 0],
                        width: r
                      } : {
                        offsets: [0, -a, 0, a],
                        height: r
                      })),
                      l.yAxis = new n(t, y(e.yAxis, {
                        id: "navigator-y-axis",
                        alignTicks: !1,
                        offset: 0,
                        index: c,
                        zoomEnabled: !1
                      }, t.inverted ? {
                        width: r
                      } : {
                        height: r
                      })),
                      h || e.series.data ? l.updateNavigatorSeries(!1) : 0 === t.series.length && (l.unbindRedraw = i(t, "beforeRedraw", function () {
                        0 < t.series.length && !l.series && (l.setBaseSeries(),
                          l.unbindRedraw())
                      })),
                      l.renderElements(),
                      l.addMouseEvents()) : l.xAxis = {
                      translate: function (e, i) {
                        var n = (r = t.xAxis[0]).getExtremes(),
                          o = r.len - 2 * a,
                          s = A("min", r.options.min, n.dataMin),
                          r = A("max", r.options.max, n.dataMax) - s;
                        return i ? e * r / o + s : o * (e - s) / r
                      },
                      toPixels: function (t) {
                        return this.translate(t)
                      },
                      toValue: function (t) {
                        return this.translate(t, !0)
                      },
                      toFixedRange: n.prototype.toFixedRange,
                      fake: !0
                    },
                    t.options.scrollbar.enabled && (t.scrollbar = l.scrollbar = new w(t.renderer, y(t.options.scrollbar, {
                        margin: l.navigatorEnabled ? 0 : 10,
                        vertical: t.inverted
                      }), t),
                      i(l.scrollbar, "changed", function (e) {
                        var i = (n = l.size) * this.to,
                          n = n * this.from;
                        l.hasDragged = l.scrollbar.hasDragged,
                          l.render(0, 0, n, i),
                          (t.options.scrollbar.liveRedraw || "mousemove" !== e.DOMType && "touchmove" !== e.DOMType) && setTimeout(function () {
                            l.onMouseUp(e)
                          })
                      })),
                    l.addBaseSeriesEvents(),
                    l.addChartEvents()
                },
                getUnionExtremes: function (t) {
                  var e, i = this.chart.xAxis[0],
                    n = this.xAxis,
                    o = n.options,
                    s = i.options;
                  return t && null === i.dataMin || (e = {
                      dataMin: x(o && o.min, A("min", s.min, i.dataMin, n.dataMin, n.min)),
                      dataMax: x(o && o.max, A("max", s.max, i.dataMax, n.dataMax, n.max))
                    }),
                    e
                },
                setBaseSeries: function (t, e) {
                  var i = this.chart,
                    n = this.baseSeries = [];
                  t = t || i.options && i.options.navigator.baseSeries || 0,
                    h(i.series || [], function (e, i) {
                      e.options.isInternal || !e.options.showInNavigator && (i !== t && e.options.id !== t || !1 === e.options.showInNavigator) || n.push(e)
                    }),
                    this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, e)
                },
                updateNavigatorSeries: function (e, i) {
                  var n, o, s, a = this,
                    l = a.chart,
                    c = a.baseSeries,
                    d = a.navigatorOptions.series,
                    p = {
                      enableMouseTracking: !1,
                      index: null,
                      linkedTo: null,
                      group: "nav",
                      padXAxis: !1,
                      xAxis: "navigator-x-axis",
                      yAxis: "navigator-y-axis",
                      showInLegend: !1,
                      stacking: !1,
                      isInternal: !0,
                      visible: !0
                    },
                    f = a.series = t.grep(a.series || [], function (e) {
                      var i = e.baseSeries;
                      return !(0 > t.inArray(i, c)) || (i && (b(i, "updatedData", a.updatedDataHandler),
                          delete i.navigatorSeries),
                        e.destroy(),
                        !1)
                    });
                  c && c.length && h(c, function (t) {
                      var e = t.navigatorSeries,
                        h = u({
                          color: t.color
                        }, g(d) ? r.navigator.series : d);
                      e && !1 === a.navigatorOptions.adaptToUpdatedData || (p.name = "Navigator " + c.length,
                        n = t.options || {},
                        s = n.navigatorOptions || {},
                        o = y(n, p, h, s),
                        h = s.data || h.data,
                        a.hasNavigatorData = a.hasNavigatorData || !!h,
                        o.data = h || n.data && n.data.slice(0),
                        e && e.options ? e.update(o, i) : (t.navigatorSeries = l.initSeries(o),
                          t.navigatorSeries.baseSeries = t,
                          f.push(t.navigatorSeries)))
                    }),
                    (!d.data || c && c.length) && !g(d) || (a.hasNavigatorData = !1,
                      d = t.splat(d),
                      h(d, function (t, e) {
                        p.name = "Navigator " + (f.length + 1),
                          (o = y(r.navigator.series, {
                            color: l.series[e] && !l.series[e].options.isInternal && l.series[e].color || l.options.colors[e] || l.options.colors[0]
                          }, p, t)).data = t.data,
                          o.data && (a.hasNavigatorData = !0,
                            f.push(l.initSeries(o)))
                      })),
                    e && this.addBaseSeriesEvents()
                },
                addBaseSeriesEvents: function () {
                  var t = this,
                    e = t.baseSeries || [];
                  e[0] && e[0].xAxis && i(e[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes),
                    h(e, function (e) {
                      i(e, "show", function () {
                          this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                        }),
                        i(e, "hide", function () {
                          this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                        }),
                        !1 !== this.navigatorOptions.adaptToUpdatedData && e.xAxis && i(e, "updatedData", this.updatedDataHandler),
                        i(e, "remove", function () {
                          this.navigatorSeries && (c(t.series, this.navigatorSeries),
                            a(this.navigatorSeries.options) && this.navigatorSeries.remove(!1),
                            delete this.navigatorSeries)
                        })
                    }, this)
                },
                modifyNavigatorAxisExtremes: function () {
                  var t, e = this.xAxis;
                  e.getExtremes && (!(t = this.getUnionExtremes(!0)) || t.dataMin === e.min && t.dataMax === e.max || (e.min = t.dataMin,
                    e.max = t.dataMax))
                },
                modifyBaseAxisExtremes: function () {
                  var t, e, i = this.chart.navigator,
                    n = (s = this.getExtremes()).dataMin,
                    o = s.dataMax,
                    s = s.max - s.min,
                    r = i.stickToMin,
                    a = i.stickToMax,
                    l = x(this.options.overscroll, 0),
                    h = i.series && i.series[0],
                    c = !!this.setExtremes;
                  this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (r && (t = (e = n) + s),
                      a && (t = o + l,
                        r || (e = Math.max(t - s, h && h.xData ? h.xData[0] : -Number.MAX_VALUE))),
                      c && (r || a) && m(e) && (this.min = this.userMin = e,
                        this.max = this.userMax = t)),
                    i.stickToMin = i.stickToMax = null
                },
                updatedDataHandler: function () {
                  var t = this.chart.navigator,
                    e = this.navigatorSeries;
                  t.stickToMax = t.xAxis.reversed ? 0 === Math.round(t.zoomedMin) : Math.round(t.zoomedMax) >= Math.round(t.size),
                    t.stickToMin = m(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !t.stickToMax),
                    e && !t.hasNavigatorData && (e.options.pointStart = this.xData[0],
                      e.setData(this.options.data, !1, null, !1))
                },
                addChartEvents: function () {
                  i(this.chart, "redraw", function () {
                    var t = this.navigator,
                      e = t && (t.baseSeries && t.baseSeries[0] && t.baseSeries[0].xAxis || t.scrollbar && this.xAxis[0]);
                    e && t.render(e.min, e.max)
                  })
                },
                destroy: function () {
                  this.removeEvents(),
                    this.xAxis && (c(this.chart.xAxis, this.xAxis),
                      c(this.chart.axes, this.xAxis)),
                    this.yAxis && (c(this.chart.yAxis, this.yAxis),
                      c(this.chart.axes, this.yAxis)),
                    h(this.series || [], function (t) {
                      t.destroy && t.destroy()
                    }),
                    h("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function (t) {
                      this[t] && this[t].destroy && this[t].destroy(),
                        this[t] = null
                    }, this),
                    h([this.handles], function (t) {
                      l(t)
                    }, this)
                }
              },
              t.Navigator = e,
              S(n.prototype, "zoom", function (t, e, i) {
                var n, o = this.chart,
                  s = (h = o.options).chart.zoomType,
                  r = h.chart.pinchType,
                  l = h.navigator,
                  h = h.rangeSelector;
                return this.isXAxis && (l && l.enabled || h && h.enabled) && ("x" === s || "x" === r ? o.resetZoomButton = "blocked" : "y" === s ? n = !1 : "xy" !== s && "xy" !== r || !this.options.range || (o = this.previousZoom,
                    a(e) ? this.previousZoom = [this.min, this.max] : o && (e = o[0],
                      i = o[1],
                      delete this.previousZoom))),
                  void 0 !== n ? n : t.call(this, e, i)
              }),
              i(o, "beforeRender", function () {
                var t = this.options;
                (t.navigator.enabled || t.scrollbar.enabled) && (this.scroller = this.navigator = new e(this))
              }),
              i(o, "afterSetChartSize", function () {
                var t, e, i, n, o = this.legend,
                  s = this.navigator;
                s && (e = o && o.options,
                  i = s.xAxis,
                  n = s.yAxis,
                  t = s.scrollbarHeight,
                  this.inverted ? (s.left = s.opposite ? this.chartWidth - t - s.height : this.spacing[3] + t,
                    s.top = this.plotTop + t) : (s.left = this.plotLeft + t,
                    s.top = s.navigatorOptions.top || this.chartHeight - s.height - t - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? o.legendHeight + x(e.margin, 10) : 0)),
                  i && n && (this.inverted ? i.options.left = n.options.left = s.left : i.options.top = n.options.top = s.top,
                    i.setAxisSize(),
                    n.setAxisSize()))
              }),
              S(k.prototype, "addPoint", function (t, e, i, n, o) {
                var s = this.options.turboThreshold;
                s && this.xData.length > s && v(e, !0) && this.chart.navigator && d(20, !0),
                  t.call(this, e, i, n, o)
              }),
              i(o, "afterAddSeries", function () {
                this.navigator && this.navigator.setBaseSeries(null, !1)
              }),
              i(k, "afterUpdate", function () {
                this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
              }),
              o.prototype.callbacks.push(function (t) {
                var e = t.navigator;
                e && t.xAxis[0] && (t = t.xAxis[0].getExtremes(),
                  e.render(t.min, t.max))
              })
          }(h),
          function (t) {
            function e(t) {
              this.init(t)
            }
            var i = t.addEvent,
              n = t.Axis,
              o = t.Chart,
              s = t.css,
              r = t.createElement,
              a = t.defaultOptions,
              l = t.defined,
              h = t.destroyObjectProperties,
              c = t.discardElement,
              d = t.each,
              u = t.extend,
              p = t.fireEvent,
              f = t.isNumber,
              g = t.merge,
              m = t.pick,
              v = t.pInt,
              y = t.splat,
              x = t.wrap;
            u(a, {
                rangeSelector: {
                  verticalAlign: "top",
                  buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                  },
                  floating: !1,
                  x: 0,
                  y: 0,
                  height: void 0,
                  inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                  },
                  buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                  },
                  labelStyle: {
                    color: "#666666"
                  }
                }
              }),
              a.lang = g(a.lang, {
                rangeSelectorZoom: "Zoom",
                rangeSelectorFrom: "From",
                rangeSelectorTo: "To"
              }),
              e.prototype = {
                clickButton: function (t, e) {
                  var o, s, r, a, l, h = this,
                    c = h.chart,
                    u = h.buttonOptions[t],
                    p = c.xAxis[0],
                    g = (w = c.scroller && c.scroller.getUnionExtremes() || p || {}).dataMin,
                    v = w.dataMax,
                    x = p && Math.round(Math.min(p.max, m(v, p.max))),
                    b = u.type,
                    w = u._range,
                    k = u.dataGrouping;
                  if (null !== g && null !== v) {
                    if (c.fixedRange = w,
                      k && (this.forcedDataGrouping = !0,
                        n.prototype.setDataGrouping.call(p || {
                          chart: this.chart
                        }, k, !1)),
                      "month" === b || "year" === b)
                      p ? (b = {
                          range: u,
                          max: x,
                          chart: c,
                          dataMin: g,
                          dataMax: v
                        },
                        o = p.minFromRange.call(b),
                        f(b.newMax) && (x = b.newMax)) : w = u;
                    else if (w)
                      o = Math.max(x - w, g),
                      x = Math.min(o + w, v);
                    else if ("ytd" === b) {
                      if (!p)
                        return void i(c, "beforeRender", function () {
                          h.clickButton(t)
                        });
                      void 0 === v && (g = Number.MAX_VALUE,
                          v = Number.MIN_VALUE,
                          d(c.series, function (t) {
                            t = t.xData,
                              g = Math.min(t[0], g),
                              v = Math.max(t[t.length - 1], v)
                          }),
                          e = !1),
                        o = r = (x = h.getYTDExtremes(v, g, c.time.useUTC)).min,
                        x = x.max
                    } else
                      "all" === b && p && (o = g,
                        x = v);
                    o += u._offsetMin,
                      x += u._offsetMax,
                      h.setSelected(t),
                      p ? p.setExtremes(o, x, m(e, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: u
                      }) : (s = y(c.options.xAxis)[0],
                        l = s.range,
                        s.range = w,
                        a = s.min,
                        s.min = r,
                        i(c, "load", function () {
                          s.range = l,
                            s.min = a
                        }))
                  }
                },
                setSelected: function (t) {
                  this.selected = this.options.selected = t
                },
                defaultButtons: [{
                  type: "month",
                  count: 1,
                  text: "1m"
                }, {
                  type: "month",
                  count: 3,
                  text: "3m"
                }, {
                  type: "month",
                  count: 6,
                  text: "6m"
                }, {
                  type: "ytd",
                  text: "YTD"
                }, {
                  type: "year",
                  count: 1,
                  text: "1y"
                }, {
                  type: "all",
                  text: "All"
                }],
                init: function (t) {
                  var e = this,
                    n = t.options.rangeSelector,
                    o = n.buttons || [].concat(e.defaultButtons),
                    s = n.selected,
                    r = function () {
                      var t = e.minInput,
                        i = e.maxInput;
                      t && t.blur && p(t, "blur"),
                        i && i.blur && p(i, "blur")
                    };
                  e.chart = t,
                    e.options = n,
                    e.buttons = [],
                    t.extraTopMargin = n.height,
                    e.buttonOptions = o,
                    this.unMouseDown = i(t.container, "mousedown", r),
                    this.unResize = i(t, "resize", r),
                    d(o, e.computeButtonRange),
                    void 0 !== s && o[s] && this.clickButton(s, !1),
                    i(t, "load", function () {
                      t.xAxis && t.xAxis[0] && i(t.xAxis[0], "setExtremes", function (i) {
                        this.max - this.min !== t.fixedRange && "rangeSelectorButton" !== i.trigger && "updatedData" !== i.trigger && e.forcedDataGrouping && this.setDataGrouping(!1, !1)
                      })
                    })
                },
                updateButtonStates: function () {
                  var t, e = (t = this.chart).xAxis[0],
                    i = Math.round(e.max - e.min),
                    n = !e.hasVisibleSeries,
                    o = t.scroller && t.scroller.getUnionExtremes() || e,
                    s = o.dataMin,
                    r = o.dataMax,
                    a = (t = this.getYTDExtremes(r, s, t.time.useUTC)).min,
                    l = t.max,
                    h = this.selected,
                    c = f(h),
                    u = this.options.allButtonsEnabled,
                    p = this.buttons;
                  d(this.buttonOptions, function (t, o) {
                    var d = t._range,
                      f = t.type,
                      g = t.count || 1,
                      m = p[o],
                      v = 0;
                    t = t._offsetMax - t._offsetMin,
                      o = o === h;
                    var y = d > r - s,
                      x = d < e.minRange,
                      b = !1,
                      w = !1;
                    d = d === i;
                    ("month" === f || "year" === f) && i + 36e5 >= 864e5 * {
                        month: 28,
                        year: 365
                      } [f] * g - t && i - 36e5 <= 864e5 * {
                        month: 31,
                        year: 366
                      } [f] * g + t ? d = !0 : "ytd" === f ? (d = l - a + t === i,
                        b = !o) : "all" === f && (d = e.max - e.min >= r - s,
                        w = !o && c && d),
                      f = !u && (y || x || w || n),
                      g = o && d || d && !c && !b,
                      f ? v = 3 : g && (c = !0,
                        v = 2),
                      m.state !== v && m.setState(v)
                  })
                },
                computeButtonRange: function (t) {
                  var e = t.type,
                    i = t.count || 1,
                    n = {
                      millisecond: 1,
                      second: 1e3,
                      minute: 6e4,
                      hour: 36e5,
                      day: 864e5,
                      week: 6048e5
                    };
                  n[e] ? t._range = n[e] * i : "month" !== e && "year" !== e || (t._range = 864e5 * {
                      month: 30,
                      year: 365
                    } [e] * i),
                    t._offsetMin = m(t.offsetMin, 0),
                    t._offsetMax = m(t.offsetMax, 0),
                    t._range += t._offsetMax - t._offsetMin
                },
                setInputValue: function (t, e) {
                  var i = this.chart.options.rangeSelector,
                    n = this.chart.time,
                    o = this[t + "Input"];
                  l(e) && (o.previousValue = o.HCTime,
                      o.HCTime = e),
                    o.value = n.dateFormat(i.inputEditDateFormat || "%Y-%m-%d", o.HCTime),
                    this[t + "DateBox"].attr({
                      text: n.dateFormat(i.inputDateFormat || "%b %e, %Y", o.HCTime)
                    })
                },
                showInput: function (t) {
                  var e = this.inputGroup,
                    i = this[t + "DateBox"];
                  s(this[t + "Input"], {
                    left: e.translateX + i.x + "px",
                    top: e.translateY + "px",
                    width: i.width - 2 + "px",
                    height: i.height - 2 + "px",
                    border: "2px solid silver"
                  })
                },
                hideInput: function (t) {
                  s(this[t + "Input"], {
                      border: 0,
                      width: "1px",
                      height: "1px"
                    }),
                    this.setInputValue(t)
                },
                drawInput: function (t) {
                  function e() {
                    var t = i.value,
                      e = (d.inputDateParser || Date.parse)(t),
                      n = l.xAxis[0],
                      s = (r = l.scroller && l.scroller.xAxis ? l.scroller.xAxis : n).dataMin,
                      r = r.dataMax;
                    e !== i.previousValue && (i.previousValue = e,
                      f(e) || (e = t.split("-"),
                        e = Date.UTC(v(e[0]), v(e[1]) - 1, v(e[2]))),
                      f(e) && (l.time.useUTC || (e += 6e4 * (new Date).getTimezoneOffset()),
                        m ? e > o.maxInput.HCTime ? e = void 0 : e < s && (e = s) : e < o.minInput.HCTime ? e = void 0 : e > r && (e = r),
                        void 0 !== e && n.setExtremes(m ? e : n.min, m ? n.max : e, void 0, void 0, {
                          trigger: "rangeSelectorInput"
                        })))
                  }
                  var i, n, o = this,
                    l = o.chart,
                    h = l.renderer.style || {},
                    c = l.renderer,
                    d = l.options.rangeSelector,
                    p = o.div,
                    m = "min" === t,
                    y = this.inputGroup;
                  this[t + "Label"] = n = c.label(a.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                      padding: 2
                    }).add(y),
                    y.offset += n.width + 5,
                    this[t + "DateBox"] = c = c.label("", y.offset).addClass("highcharts-range-input").attr({
                      padding: 2,
                      width: d.inputBoxWidth || 90,
                      height: d.inputBoxHeight || 17,
                      stroke: d.inputBoxBorderColor || "#cccccc",
                      "stroke-width": 1,
                      "text-align": "center"
                    }).on("click", function () {
                      o.showInput(t),
                        o[t + "Input"].focus()
                    }).add(y),
                    y.offset += c.width + (m ? 10 : 0),
                    this[t + "Input"] = i = r("input", {
                      name: t,
                      className: "highcharts-range-selector",
                      type: "text"
                    }, {
                      top: l.plotTop + "px"
                    }, p),
                    n.css(g(h, d.labelStyle)),
                    c.css(g({
                      color: "#333333"
                    }, h, d.inputStyle)),
                    s(i, u({
                      position: "absolute",
                      border: 0,
                      width: "1px",
                      height: "1px",
                      padding: 0,
                      textAlign: "center",
                      fontSize: h.fontSize,
                      fontFamily: h.fontFamily,
                      top: "-9999em"
                    }, d.inputStyle)),
                    i.onfocus = function () {
                      o.showInput(t)
                    },
                    i.onblur = function () {
                      o.hideInput(t)
                    },
                    i.onchange = e,
                    i.onkeypress = function (t) {
                      13 === t.keyCode && e()
                    }
                },
                getPosition: function () {
                  var t, e = (t = this.chart).options.rangeSelector;
                  return {
                    buttonTop: (t = "top" === e.verticalAlign ? t.plotTop - t.axisOffset[0] : 0) + e.buttonPosition.y,
                    inputTop: t + e.inputPosition.y - 10
                  }
                },
                getYTDExtremes: function (t, e, i) {
                  var n = this.chart.time,
                    o = new n.Date(t),
                    s = n.get("FullYear", o);
                  return i = i ? n.Date.UTC(s, 0, 1) : +new n.Date(s, 0, 1),
                    e = Math.max(e || 0, i),
                    o = o.getTime(), {
                      max: Math.min(t || o, o),
                      min: e
                    }
                },
                render: function (t, e) {
                  var i, n, o = this,
                    s = o.chart,
                    l = s.renderer,
                    h = s.container,
                    c = (g = s.options).exporting && !1 !== g.exporting.enabled && g.navigation && g.navigation.buttonOptions,
                    u = a.lang,
                    p = o.div,
                    f = g.rangeSelector,
                    g = f.floating,
                    v = o.buttons,
                    y = (p = o.inputGroup,
                      f.buttonTheme),
                    x = f.buttonPosition,
                    b = f.inputPosition,
                    w = f.inputEnabled,
                    k = y && y.states,
                    T = s.plotLeft,
                    S = o.buttonGroup;
                  n = o.rendered;
                  var C, A = o.options.verticalAlign,
                    M = s.legend,
                    E = M && M.options,
                    D = x.y,
                    O = b.y,
                    P = n || !1,
                    I = 0,
                    _ = 0;
                  !1 !== f.enabled && (n || (o.group = n = l.g("range-selector-group").attr({
                        zIndex: 7
                      }).add(),
                      o.buttonGroup = S = l.g("range-selector-buttons").add(n),
                      o.zoomText = l.text(u.rangeSelectorZoom, m(T + x.x, T), 15).css(f.labelStyle).add(S),
                      i = m(T + x.x, T) + o.zoomText.getBBox().width + 5,
                      d(o.buttonOptions, function (t, e) {
                        v[e] = l.button(t.text, i, 0, function () {
                            var i, n = t.events && t.events.click;
                            n && (i = n.call(t)),
                              !1 !== i && o.clickButton(e),
                              o.isActive = !0
                          }, y, k && k.hover, k && k.select, k && k.disabled).attr({
                            "text-align": "center"
                          }).add(S),
                          i += v[e].width + m(f.buttonSpacing, 5)
                      }),
                      !1 !== w && (o.div = p = r("div", null, {
                          position: "relative",
                          height: 0,
                          zIndex: 1
                        }),
                        h.parentNode.insertBefore(p, h),
                        o.inputGroup = p = l.g("input-group").add(n),
                        p.offset = 0,
                        o.drawInput("min"),
                        o.drawInput("max"))),
                    T = s.plotLeft - s.spacing[3],
                    o.updateButtonStates(),
                    c && this.titleCollision(s) && "top" === A && "right" === x.align && x.y + S.getBBox().height - 12 < (c.y || 0) + c.height && (I = -40),
                    "left" === x.align ? C = x.x - s.spacing[3] : "right" === x.align && (C = x.x + I - s.spacing[1]),
                    S.align({
                      y: x.y,
                      width: S.getBBox().width,
                      align: x.align,
                      x: C
                    }, !0, s.spacingBox),
                    o.group.placed = P,
                    o.buttonGroup.placed = P,
                    !1 !== w && (I = c && this.titleCollision(s) && "top" === A && "right" === b.align && b.y - p.getBBox().height - 12 < (c.y || 0) + c.height + s.spacing[0] ? -40 : 0,
                      "left" === b.align ? C = T : "right" === b.align && (C = -Math.max(s.axisOffset[1], -I)),
                      p.align({
                        y: b.y,
                        width: p.getBBox().width,
                        align: b.align,
                        x: b.x + C - 2
                      }, !0, s.spacingBox),
                      h = p.alignAttr.translateX + p.alignOptions.x - I + p.getBBox().x + 2,
                      c = p.alignOptions.width,
                      u = S.alignAttr.translateX + S.getBBox().x,
                      C = S.getBBox().width + 20,
                      (b.align === x.align || u + C > h && h + c > u && D < O + p.getBBox().height) && p.attr({
                        translateX: p.alignAttr.translateX + (s.axisOffset[1] >= -I ? 0 : -I),
                        translateY: p.alignAttr.translateY + S.getBBox().height + 10
                      }),
                      o.setInputValue("min", t),
                      o.setInputValue("max", e),
                      o.inputGroup.placed = P),
                    o.group.align({
                      verticalAlign: A
                    }, !0, s.spacingBox),
                    t = o.group.getBBox().height + 20,
                    e = o.group.alignAttr.translateY,
                    "bottom" === A && (_ = e - (t = t + (M = E && "bottom" === E.verticalAlign && E.enabled && !E.floating ? M.legendHeight + m(E.margin, 10) : 0) - 20) - (g ? 0 : f.y) - 10),
                    "top" === A ? (g && (_ = 0),
                      s.titleOffset && (_ = s.titleOffset + s.options.title.margin),
                      _ += s.margin[0] - s.spacing[0] || 0) : "middle" === A && (O === D ? _ = 0 > O ? e + void 0 : e : (O || D) && (_ = 0 > O || 0 > D ? _ - Math.min(O, D) : e - t + NaN)),
                    o.group.translate(f.x, f.y + Math.floor(_)),
                    !1 !== w && (o.minInput.style.marginTop = o.group.translateY + "px",
                      o.maxInput.style.marginTop = o.group.translateY + "px"),
                    o.rendered = !0)
                },
                getHeight: function () {
                  var t = this.options,
                    e = this.group,
                    i = t.y,
                    n = t.buttonPosition.y;
                  t = t.inputPosition.y,
                    e = e ? e.getBBox(!0).height + 13 + i : 0,
                    i = Math.min(t, n);
                  return (0 > t && 0 > n || 0 < t && 0 < n) && (e += Math.abs(i)),
                    e
                },
                titleCollision: function (t) {
                  return !(t.options.title.text || t.options.subtitle.text)
                },
                update: function (t) {
                  var e = this.chart;
                  g(!0, e.options.rangeSelector, t),
                    this.destroy(),
                    this.init(e),
                    e.rangeSelector.render()
                },
                destroy: function () {
                  var i = this,
                    n = i.minInput,
                    o = i.maxInput;
                  i.unMouseDown(),
                    i.unResize(),
                    h(i.buttons),
                    n && (n.onfocus = n.onblur = n.onchange = null),
                    o && (o.onfocus = o.onblur = o.onchange = null),
                    t.objectEach(i, function (t, n) {
                      t && "chart" !== n && (t.destroy ? t.destroy() : t.nodeType && c(this[n])),
                        t !== e.prototype[n] && (i[n] = null)
                    }, this)
                }
              },
              n.prototype.toFixedRange = function (t, e, i, n) {
                var o = this.chart && this.chart.fixedRange;
                return t = m(i, this.translate(t, !0, !this.horiz)),
                  e = m(n, this.translate(e, !0, !this.horiz)),
                  .7 < (i = o && (e - t) / o) && 1.3 > i && (n ? t = e - o : e = t + o),
                  f(t) && f(e) || (t = e = void 0), {
                    min: t,
                    max: e
                  }
              },
              n.prototype.minFromRange = function () {
                var t, e, i, n = this.range,
                  o = {
                    month: "Month",
                    year: "FullYear"
                  } [n.type],
                  s = this.max,
                  r = function (t, e) {
                    var i = new Date(t),
                      n = i["get" + o]();
                    return i["set" + o](n + e),
                      n === i["get" + o]() && i.setDate(0),
                      i.getTime() - t
                  };
                return f(n) ? (t = s - n,
                    i = n) : (t = s + r(s, -n.count),
                    this.chart && (this.chart.fixedRange = s - t)),
                  e = m(this.dataMin, Number.MIN_VALUE),
                  f(t) || (t = e),
                  t <= e && (t = e,
                    void 0 === i && (i = r(t, n.count)),
                    this.newMax = Math.min(t + i, this.dataMax)),
                  f(s) || (t = void 0),
                  t
              },
              i(o, "afterGetContainer", function () {
                this.options.rangeSelector.enabled && (this.rangeSelector = new e(this))
              }),
              x(o.prototype, "render", function (t, e, i) {
                var n = this.axes,
                  o = this.rangeSelector;
                o && (d(n, function (t) {
                      t.updateNames(),
                        t.setScale()
                    }),
                    this.getAxisMargins(),
                    o.render(),
                    n = o.options.verticalAlign,
                    o.options.floating || ("bottom" === n ? this.extraBottomMargin = !0 : "middle" !== n && (this.extraTopMargin = !0))),
                  t.call(this, e, i)
              }),
              i(o, "update", function (t) {
                var e = t.options;
                t = this.rangeSelector,
                  this.extraTopMargin = this.extraBottomMargin = !1,
                  this.isDirtyBox = !0,
                  t && (t.render(),
                    e = e.rangeSelector && e.rangeSelector.verticalAlign || t.options && t.options.verticalAlign,
                    t.options.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)))
              }),
              x(o.prototype, "redraw", function (t, e, i) {
                var n = this.rangeSelector;
                n && !n.options.floating && (n.render(),
                    "bottom" === (n = n.options.verticalAlign) ? this.extraBottomMargin = !0 : "middle" !== n && (this.extraTopMargin = !0)),
                  t.call(this, e, i)
              }),
              o.prototype.adjustPlotArea = function () {
                var t = this.rangeSelector;
                this.rangeSelector && (t = t.getHeight(),
                  this.extraTopMargin && (this.plotTop += t),
                  this.extraBottomMargin && (this.marginBottom += t))
              },
              o.prototype.callbacks.push(function (t) {
                function e() {
                  n = t.xAxis[0].getExtremes(),
                    f(n.min) && r.render(n.min, n.max)
                }
                var n, o, s, r = t.rangeSelector;
                r && (s = i(t.xAxis[0], "afterSetExtremes", function (t) {
                      r.render(t.min, t.max)
                    }),
                    o = i(t, "redraw", e),
                    e()),
                  i(t, "destroy", function () {
                    r && (o(),
                      s())
                  })
              }),
              t.RangeSelector = e
          }(h),
          function (t) {
            var e = t.addEvent,
              i = t.arrayMax,
              n = t.arrayMin,
              o = t.Axis,
              s = t.Chart,
              r = t.defined,
              a = t.each,
              l = t.extend,
              h = t.format,
              c = t.grep,
              d = t.inArray,
              u = t.isNumber,
              p = t.isString,
              f = t.map,
              g = t.merge,
              m = t.pick,
              v = t.Point,
              y = t.Renderer,
              x = t.Series,
              b = t.splat,
              w = t.SVGRenderer,
              k = t.VMLRenderer,
              T = t.wrap,
              S = x.prototype,
              C = S.init,
              A = S.processData,
              M = v.prototype.tooltipFormatter;
            t.StockChart = t.stockChart = function (e, i, n) {
                var o, r = p(e) || e.nodeName,
                  a = arguments[r ? 1 : 0],
                  l = a.series,
                  h = t.getOptions(),
                  c = m(a.navigator && a.navigator.enabled, h.navigator.enabled, !0),
                  d = c ? {
                    startOnTick: !1,
                    endOnTick: !1
                  } : null,
                  u = {
                    marker: {
                      enabled: !1,
                      radius: 2
                    }
                  },
                  v = {
                    shadow: !1,
                    borderWidth: 0
                  };
                return a.xAxis = f(b(a.xAxis || {}), function (t, e) {
                    return g({
                      minPadding: 0,
                      maxPadding: 0,
                      overscroll: 0,
                      ordinal: !0,
                      title: {
                        text: null
                      },
                      labels: {
                        overflow: "justify"
                      },
                      showLastLabel: !0
                    }, h.xAxis, h.xAxis && h.xAxis[e], t, {
                      type: "datetime",
                      categories: null
                    }, d)
                  }),
                  a.yAxis = f(b(a.yAxis || {}), function (t, e) {
                    return o = m(t.opposite, !0),
                      g({
                        labels: {
                          y: -2
                        },
                        opposite: o,
                        showLastLabel: !(!t.categories && "category" !== t.type),
                        title: {
                          text: null
                        }
                      }, h.yAxis, h.yAxis && h.yAxis[e], t)
                  }),
                  a.series = null,
                  (a = g({
                    chart: {
                      panning: !0,
                      pinchType: "x"
                    },
                    navigator: {
                      enabled: c
                    },
                    scrollbar: {
                      enabled: m(h.scrollbar.enabled, !0)
                    },
                    rangeSelector: {
                      enabled: m(h.rangeSelector.enabled, !0)
                    },
                    title: {
                      text: null
                    },
                    tooltip: {
                      split: m(h.tooltip.split, !0),
                      crosshairs: !0
                    },
                    legend: {
                      enabled: !1
                    },
                    plotOptions: {
                      line: u,
                      spline: u,
                      area: u,
                      areaspline: u,
                      arearange: u,
                      areasplinerange: u,
                      column: v,
                      columnrange: v,
                      candlestick: v,
                      ohlc: v
                    }
                  }, a, {
                    isStock: !0
                  })).series = l,
                  r ? new s(e, a, n) : new s(a, i)
              },
              T(o.prototype, "autoLabelAlign", function (t) {
                var e = this.chart,
                  i = this.options,
                  n = (e = e._labelPanes = e._labelPanes || {},
                    this.options.labels);
                return this.chart.options.isStock && "yAxis" === this.coll && (!e[i = i.top + "," + i.height] && n.enabled) ? (15 === n.x && (n.x = 0),
                  void 0 === n.align && (n.align = "right"),
                  e[i] = this,
                  "right") : t.apply(this, [].slice.call(arguments, 1))
              }),
              e(o, "destroy", function () {
                var t = this.chart,
                  e = this.options && this.options.top + "," + this.options.height;
                e && t._labelPanes && t._labelPanes[e] === this && delete t._labelPanes[e]
              }),
              T(o.prototype, "getPlotLinePath", function (e, i, n, o, s, l) {
                var h, c, g, v, y, x, b = this,
                  w = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                  k = b.chart,
                  T = k.renderer,
                  S = b.left,
                  C = b.top,
                  A = [],
                  M = [];
                return "xAxis" !== b.coll && "yAxis" !== b.coll ? e.apply(this, [].slice.call(arguments, 1)) : (M = function (t) {
                    var e = "xAxis" === t ? "yAxis" : "xAxis";
                    return t = b.options[e],
                      u(t) ? [k[e][t]] : p(t) ? [k.get(t)] : f(w, function (t) {
                        return t[e]
                      })
                  }(b.coll),
                  a(b.isXAxis ? k.yAxis : k.xAxis, function (t) {
                    if (!r(t.options.id) || -1 === t.options.id.indexOf("navigator")) {
                      var e = t.isXAxis ? "yAxis" : "xAxis";
                      e = r(t.options[e]) ? k[e][t.options[e]] : k[e][0];
                      b === e && M.push(t)
                    }
                  }),
                  y = M.length ? [] : [b.isXAxis ? k.yAxis[0] : k.xAxis[0]],
                  a(M, function (e) {
                    -1 !== d(e, y) || t.find(y, function (t) {
                      return t.pos === e.pos && t.len && e.len
                    }) || y.push(e)
                  }),
                  x = m(l, b.translate(i, null, null, o)),
                  u(x) && (b.horiz ? a(y, function (t) {
                    var e;
                    c = t.pos,
                      v = c + t.len,
                      ((h = g = Math.round(x + b.transB)) < S || h > S + b.width) && (s ? h = g = Math.min(Math.max(S, h), S + b.width) : e = !0),
                      e || A.push("M", h, c, "L", g, v)
                  }) : a(y, function (t) {
                    var e;
                    h = t.pos,
                      g = h + t.len,
                      ((c = v = Math.round(C + b.height - x)) < C || c > C + b.height) && (s ? c = v = Math.min(Math.max(C, c), b.top + b.height) : e = !0),
                      e || A.push("M", h, c, "L", g, v)
                  })),
                  0 < A.length ? T.crispPolyLine(A, n || 1) : null)
              }),
              w.prototype.crispPolyLine = function (t, e) {
                var i;
                for (i = 0; i < t.length; i += 6)
                  t[i + 1] === t[i + 4] && (t[i + 1] = t[i + 4] = Math.round(t[i + 1]) - e % 2 / 2),
                  t[i + 2] === t[i + 5] && (t[i + 2] = t[i + 5] = Math.round(t[i + 2]) + e % 2 / 2);
                return t
              },
              y === k && (k.prototype.crispPolyLine = w.prototype.crispPolyLine),
              T(o.prototype, "hideCrosshair", function (t, e) {
                t.call(this, e),
                  this.crossLabel && (this.crossLabel = this.crossLabel.hide())
              }),
              e(o, "afterDrawCrosshair", function (t) {
                var e, i;
                if (r(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                  var n = this.chart,
                    o = this.options.crosshair.label,
                    s = this.horiz;
                  e = this.opposite,
                    i = this.left;
                  var a = this.top,
                    c = this.crossLabel,
                    d = o.format,
                    u = "",
                    p = "inside" === this.options.tickPosition,
                    f = !1 !== this.crosshair.snap,
                    g = 0,
                    v = t.e || this.cross && this.cross.e,
                    y = t.point;
                  t = s ? "center" : e ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center",
                    c || (c = this.crossLabel = n.renderer.label(null, null, null, o.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                      align: o.align || t,
                      padding: m(o.padding, 8),
                      r: m(o.borderRadius, 3),
                      zIndex: 2
                    }).add(this.labelGroup)).attr({
                      fill: o.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                      stroke: o.borderColor || "",
                      "stroke-width": o.borderWidth || 0
                    }).css(l({
                      color: "#ffffff",
                      fontWeight: "normal",
                      fontSize: "11px",
                      textAlign: "center"
                    }, o.style)),
                    s ? (t = f ? y.plotX + i : v.chartX,
                      a += e ? 0 : this.height) : (t = e ? this.width + i : 0,
                      a = f ? y.plotY + a : v.chartY),
                    d || o.formatter || (this.isDatetimeAxis && (u = "%b %d, %Y"),
                      d = "{value" + (u ? ":" + u : "") + "}"),
                    u = f ? y[this.isXAxis ? "x" : "y"] : this.toValue(s ? v.chartX : v.chartY),
                    c.attr({
                      text: d ? h(d, {
                        value: u
                      }, n.time) : o.formatter.call(this, u),
                      x: t,
                      y: a,
                      visibility: u < this.min || u > this.max ? "hidden" : "visible"
                    }),
                    o = c.getBBox(),
                    s ? (p && !e || !p && e) && (a = c.y - o.height) : a = c.y - o.height / 2,
                    s ? (e = i - o.x,
                      i = i + this.width - o.x) : (e = "left" === this.labelAlign ? i : 0,
                      i = "right" === this.labelAlign ? i + this.width : n.chartWidth),
                    c.translateX < e && (g = e - c.translateX),
                    c.translateX + o.width >= i && (g = -(c.translateX + o.width - i)),
                    c.attr({
                      x: t + g,
                      y: a,
                      anchorX: s ? t : this.opposite ? 0 : n.chartWidth,
                      anchorY: s ? this.opposite ? n.chartHeight : 0 : a + o.height / 2
                    })
                }
              }),
              S.init = function () {
                C.apply(this, arguments),
                  this.setCompare(this.options.compare)
              },
              S.setCompare = function (t) {
                this.modifyValue = "value" === t || "percent" === t ? function (e, i) {
                    var n = this.compareValue;
                    if (void 0 !== e && void 0 !== n)
                      return e = "value" === t ? e - n : e / n * 100 - (100 === this.options.compareBase ? 0 : 100),
                        i && (i.change = e),
                        e
                  } :
                  null,
                  this.userOptions.compare = t,
                  this.chart.hasRendered && (this.isDirty = !0)
              },
              S.processData = function () {
                var t, e, i, n, o, s = -1,
                  r = !0 === this.options.compareStart ? 0 : 1;
                if (A.apply(this, arguments),
                  this.xAxis && this.processedYData)
                  for (e = this.processedXData,
                    n = (i = this.processedYData).length,
                    this.pointArrayMap && (-1 === (s = d("close", this.pointArrayMap)) && (s = d(this.pointValKey || "y", this.pointArrayMap))),
                    t = 0; t < n - r; t++)
                    if (o = i[t] && -1 < s ? i[t][s] : i[t],
                      u(o) && e[t + r] >= this.xAxis.min && 0 !== o) {
                      this.compareValue = o;
                      break
                    }
              },
              T(S, "getExtremes", function (t) {
                var e;
                t.apply(this, [].slice.call(arguments, 1)),
                  this.modifyValue && (e = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)],
                    this.dataMin = n(e),
                    this.dataMax = i(e))
              }),
              o.prototype.setCompare = function (t, e) {
                this.isXAxis || (a(this.series, function (e) {
                    e.setCompare(t)
                  }),
                  m(e, !0) && this.chart.redraw())
              },
              v.prototype.tooltipFormatter = function (e) {
                return e = e.replace("{point.change}", (0 < this.change ? "+" : "") + t.numberFormat(this.change, m(this.series.tooltipOptions.changeDecimals, 2))),
                  M.apply(this, [e])
              },
              T(x.prototype, "render", function (t) {
                this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = g(this.chart.clipBox),
                    this.clipBox.width = this.xAxis.len,
                    this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
                    width: this.xAxis.len,
                    height: this.yAxis.len
                  }) : this.clipBox && (this.clipBox.width = this.xAxis.len,
                    this.clipBox.height = this.yAxis.len)),
                  t.call(this)
              }),
              T(s.prototype, "getSelectedPoints", function (t) {
                var e = t.call(this);
                return a(this.series, function (t) {
                    t.hasGroupedData && (e = e.concat(c(t.points || [], function (t) {
                      return t.selected
                    })))
                  }),
                  e
              }),
              e(s, "update", function (t) {
                "scrollbar" in (t = t.options) && this.navigator && (g(!0, this.options.scrollbar, t.scrollbar),
                  this.navigator.update({}, !1),
                  delete t.scrollbar)
              })
          }(h),
          h
      },
      "object" == typeof t && t.exports ? t.exports = i.document ? n(i) : n : i.Highcharts = n(i)
  }, , function (t, e, i) {
    var n, o, s;
    ! function (r) {
      "use strict";
      o = [i(0)],
        void 0 === (s = "function" == typeof (n = function (t) {
          var e = window.Slick || {};
          (e = function () {
            var e = 0;
            return function (i, n) {
              var o, s = this;
              s.defaults = {
                  accessibility: !0,
                  adaptiveHeight: !1,
                  appendArrows: t(i),
                  appendDots: t(i),
                  arrows: !0,
                  asNavFor: null,
                  prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                  nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                  autoplay: !1,
                  autoplaySpeed: 3e3,
                  centerMode: !1,
                  centerPadding: "50px",
                  cssEase: "ease",
                  customPaging: function (e, i) {
                    return t('<button type="button" />').text(i + 1)
                  },
                  dots: !1,
                  dotsClass: "slick-dots",
                  draggable: !0,
                  easing: "linear",
                  edgeFriction: .35,
                  fade: !1,
                  focusOnSelect: !1,
                  focusOnChange: !1,
                  infinite: !0,
                  initialSlide: 0,
                  lazyLoad: "ondemand",
                  mobileFirst: !1,
                  pauseOnHover: !0,
                  pauseOnFocus: !0,
                  pauseOnDotsHover: !1,
                  respondTo: "window",
                  responsive: null,
                  rows: 1,
                  rtl: !1,
                  slide: "",
                  slidesPerRow: 1,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: 500,
                  swipe: !0,
                  swipeToSlide: !1,
                  touchMove: !0,
                  touchThreshold: 5,
                  useCSS: !0,
                  useTransform: !0,
                  variableWidth: !1,
                  vertical: !1,
                  verticalSwiping: !1,
                  waitForAnimate: !0,
                  zIndex: 1e3
                },
                s.initials = {
                  animating: !1,
                  dragging: !1,
                  autoPlayTimer: null,
                  currentDirection: 0,
                  currentLeft: null,
                  currentSlide: 0,
                  direction: 1,
                  $dots: null,
                  listWidth: null,
                  listHeight: null,
                  loadIndex: 0,
                  $nextArrow: null,
                  $prevArrow: null,
                  scrolling: !1,
                  slideCount: null,
                  slideWidth: null,
                  $slideTrack: null,
                  $slides: null,
                  sliding: !1,
                  slideOffset: 0,
                  swipeLeft: null,
                  swiping: !1,
                  $list: null,
                  touchObject: {},
                  transformsEnabled: !1,
                  unslicked: !1
                },
                t.extend(s, s.initials),
                s.activeBreakpoint = null,
                s.animType = null,
                s.animProp = null,
                s.breakpoints = [],
                s.breakpointSettings = [],
                s.cssTransitions = !1,
                s.focussed = !1,
                s.interrupted = !1,
                s.hidden = "hidden",
                s.paused = !0,
                s.positionProp = null,
                s.respondTo = null,
                s.rowCount = 1,
                s.shouldClick = !0,
                s.$slider = t(i),
                s.$slidesCache = null,
                s.transformType = null,
                s.transitionType = null,
                s.visibilityChange = "visibilitychange",
                s.windowWidth = 0,
                s.windowTimer = null,
                o = t(i).data("slick") || {},
                s.options = t.extend({}, s.defaults, n, o),
                s.currentSlide = s.options.initialSlide,
                s.originalSettings = s.options,
                void 0 !== document.mozHidden ? (s.hidden = "mozHidden",
                  s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden",
                  s.visibilityChange = "webkitvisibilitychange");
              s.autoPlay = t.proxy(s.autoPlay, s),
                s.autoPlayClear = t.proxy(s.autoPlayClear, s),
                s.autoPlayIterator = t.proxy(s.autoPlayIterator, s),
                s.changeSlide = t.proxy(s.changeSlide, s),
                s.clickHandler = t.proxy(s.clickHandler, s),
                s.selectHandler = t.proxy(s.selectHandler, s),
                s.setPosition = t.proxy(s.setPosition, s),
                s.swipeHandler = t.proxy(s.swipeHandler, s),
                s.dragHandler = t.proxy(s.dragHandler, s),
                s.keyHandler = t.proxy(s.keyHandler, s),
                s.instanceUid = e++,
                s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
                s.registerBreakpoints(),
                s.init(!0)
            }
          }()).prototype.activateADA = function () {
              this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
              }).find("a, input, button, select").attr({
                tabindex: "0"
              })
            },
            e.prototype.addSlide = e.prototype.slickAdd = function (e, i, n) {
              var o = this;
              if ("boolean" == typeof i)
                n = i,
                i = null;
              else if (i < 0 || i >= o.slideCount)
                return !1;
              o.unload(),
                "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : !0 === n ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack),
                o.$slides = o.$slideTrack.children(this.options.slide),
                o.$slideTrack.children(this.options.slide).detach(),
                o.$slideTrack.append(o.$slides),
                o.$slides.each(function (e, i) {
                  t(i).attr("data-slick-index", e)
                }),
                o.$slidesCache = o.$slides,
                o.reinit()
            },
            e.prototype.animateHeight = function () {
              var t = this;
              if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                  height: e
                }, t.options.speed)
              }
            },
            e.prototype.animateSlide = function (e, i) {
              var n = {},
                o = this;
              o.animateHeight(),
                !0 === o.options.rtl && !1 === o.options.vertical && (e = -e),
                !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                  left: e
                }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
                  top: e
                }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
                  t({
                    animStart: o.currentLeft
                  }).animate({
                    animStart: e
                  }, {
                    duration: o.options.speed,
                    easing: o.options.easing,
                    step: function (t) {
                      t = Math.ceil(t),
                        !1 === o.options.vertical ? (n[o.animType] = "translate(" + t + "px, 0px)",
                          o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)",
                          o.$slideTrack.css(n))
                    },
                    complete: function () {
                      i && i.call()
                    }
                  })) : (o.applyTransition(),
                  e = Math.ceil(e),
                  !1 === o.options.vertical ? n[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + e + "px, 0px)",
                  o.$slideTrack.css(n),
                  i && setTimeout(function () {
                    o.disableTransition(),
                      i.call()
                  }, o.options.speed))
            },
            e.prototype.getNavTarget = function () {
              var e = this.options.asNavFor;
              return e && null !== e && (e = t(e).not(this.$slider)),
                e
            },
            e.prototype.asNavFor = function (e) {
              var i = this.getNavTarget();
              null !== i && "object" == typeof i && i.each(function () {
                var i = t(this).slick("getSlick");
                i.unslicked || i.slideHandler(e, !0)
              })
            },
            e.prototype.applyTransition = function (t) {
              var e = this,
                i = {};
              !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
                !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
            },
            e.prototype.autoPlay = function () {
              var t = this;
              t.autoPlayClear(),
                t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
            },
            e.prototype.autoPlayClear = function () {
              this.autoPlayTimer && clearInterval(this.autoPlayTimer)
            },
            e.prototype.autoPlayIterator = function () {
              var t = this,
                e = t.currentSlide + t.options.slidesToScroll;
              t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll,
                  t.currentSlide - 1 == 0 && (t.direction = 1))),
                t.slideHandler(e))
            },
            e.prototype.buildArrows = function () {
              var e = this;
              !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"),
                e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"),
                e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                  e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                  e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                  e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                  !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                  "aria-disabled": "true",
                  tabindex: "-1"
                }))
            },
            e.prototype.buildDots = function () {
              var e, i, n = this;
              if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
                for (n.$slider.addClass("slick-dotted"),
                  i = t("<ul />").addClass(n.options.dotsClass),
                  e = 0; e <= n.getDotCount(); e += 1)
                  i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
                n.$dots = i.appendTo(n.options.appendDots),
                  n.$dots.find("li").first().addClass("slick-active")
              }
            },
            e.prototype.buildOut = function () {
              var e = this;
              e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.$slides.each(function (e, i) {
                  t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
                }),
                e.$slider.addClass("slick-slider"),
                e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
                e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
                e.$slideTrack.css("opacity", 0),
                !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
                t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                !0 === e.options.draggable && e.$list.addClass("draggable")
            },
            e.prototype.buildRows = function () {
              var t, e, i, n, o, s, r, a = this;
              if (n = document.createDocumentFragment(),
                s = a.$slider.children(),
                a.options.rows > 0) {
                for (r = a.options.slidesPerRow * a.options.rows,
                  o = Math.ceil(s.length / r),
                  t = 0; t < o; t++) {
                  var l = document.createElement("div");
                  for (e = 0; e < a.options.rows; e++) {
                    var h = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                      var c = t * r + (e * a.options.slidesPerRow + i);
                      s.get(c) && h.appendChild(s.get(c))
                    }
                    l.appendChild(h)
                  }
                  n.appendChild(l)
                }
                a.$slider.empty().append(n),
                  a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                  })
              }
            },
            e.prototype.checkResponsive = function (e, i) {
              var n, o, s, r = this,
                a = !1,
                l = r.$slider.width(),
                h = window.innerWidth || t(window).width();
              if ("window" === r.respondTo ? s = h : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(h, l)),
                r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                for (n in o = null,
                  r.breakpoints)
                  r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? s < r.breakpoints[n] && (o = r.breakpoints[n]) : s > r.breakpoints[n] && (o = r.breakpoints[n]));
                null !== o ? null !== r.activeBreakpoint ? (o !== r.activeBreakpoint || i) && (r.activeBreakpoint = o,
                    "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e)),
                    a = o) : (r.activeBreakpoint = o,
                    "unslick" === r.breakpointSettings[o] ? r.unslick(o) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[o]),
                      !0 === e && (r.currentSlide = r.options.initialSlide),
                      r.refresh(e)),
                    a = o) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
                    r.options = r.originalSettings,
                    !0 === e && (r.currentSlide = r.options.initialSlide),
                    r.refresh(e),
                    a = o),
                  e || !1 === a || r.$slider.trigger("breakpoint", [r, a])
              }
            },
            e.prototype.changeSlide = function (e, i) {
              var n, o, s, r = this,
                a = t(e.currentTarget);
              switch (a.is("a") && e.preventDefault(),
                a.is("li") || (a = a.closest("li")),
                s = r.slideCount % r.options.slidesToScroll != 0,
                n = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
                e.data.message) {
                case "previous":
                  o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n,
                    r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                  break;
                case "next":
                  o = 0 === n ? r.options.slidesToScroll : n,
                    r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                  break;
                case "index":
                  var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                  r.slideHandler(r.checkNavigable(l), !1, i),
                    a.children().trigger("focus");
                  break;
                default:
                  return
              }
            },
            e.prototype.checkNavigable = function (t) {
              var e, i;
              if (e = this.getNavigableIndexes(),
                i = 0,
                t > e[e.length - 1])
                t = e[e.length - 1];
              else
                for (var n in e) {
                  if (t < e[n]) {
                    t = i;
                    break
                  }
                  i = e[n]
                }
              return t
            },
            e.prototype.cleanUpEvents = function () {
              var e = this;
              e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)),
                  !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                  e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                  !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
                    e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                t(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler),
                t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                t(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
            },
            e.prototype.cleanUpSlideEvents = function () {
              var e = this;
              e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
                e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
            },
            e.prototype.cleanUpRows = function () {
              var t, e = this;
              e.options.rows > 0 && ((t = e.$slides.children().children()).removeAttr("style"),
                e.$slider.empty().append(t))
            },
            e.prototype.clickHandler = function (t) {
              !1 === this.shouldClick && (t.stopImmediatePropagation(),
                t.stopPropagation(),
                t.preventDefault())
            },
            e.prototype.destroy = function (e) {
              var i = this;
              i.autoPlayClear(),
                i.touchObject = {},
                i.cleanUpEvents(),
                t(".slick-cloned", i.$slider).detach(),
                i.$dots && i.$dots.remove(),
                i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                  i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
                i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                  i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
                i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                    t(this).attr("style", t(this).data("originalStyling"))
                  }),
                  i.$slideTrack.children(this.options.slide).detach(),
                  i.$slideTrack.detach(),
                  i.$list.detach(),
                  i.$slider.append(i.$slides)),
                i.cleanUpRows(),
                i.$slider.removeClass("slick-slider"),
                i.$slider.removeClass("slick-initialized"),
                i.$slider.removeClass("slick-dotted"),
                i.unslicked = !0,
                e || i.$slider.trigger("destroy", [i])
            },
            e.prototype.disableTransition = function (t) {
              var e = this,
                i = {};
              i[e.transitionType] = "",
                !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
            },
            e.prototype.fadeSlide = function (t, e) {
              var i = this;
              !1 === i.cssTransitions ? (i.$slides.eq(t).css({
                  zIndex: i.options.zIndex
                }),
                i.$slides.eq(t).animate({
                  opacity: 1
                }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t),
                i.$slides.eq(t).css({
                  opacity: 1,
                  zIndex: i.options.zIndex
                }),
                e && setTimeout(function () {
                  i.disableTransition(t),
                    e.call()
                }, i.options.speed))
            },
            e.prototype.fadeSlideOut = function (t) {
              var e = this;
              !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
              }, e.options.speed, e.options.easing) : (e.applyTransition(t),
                e.$slides.eq(t).css({
                  opacity: 0,
                  zIndex: e.options.zIndex - 2
                }))
            },
            e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
              var e = this;
              null !== t && (e.$slidesCache = e.$slides,
                e.unload(),
                e.$slideTrack.children(this.options.slide).detach(),
                e.$slidesCache.filter(t).appendTo(e.$slideTrack),
                e.reinit())
            },
            e.prototype.focusHandler = function () {
              var e = this;
              e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (i) {
                i.stopImmediatePropagation();
                var n = t(this);
                setTimeout(function () {
                  e.options.pauseOnFocus && (e.focussed = n.is(":focus"),
                    e.autoPlay())
                }, 0)
              })
            },
            e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
              return this.currentSlide
            },
            e.prototype.getDotCount = function () {
              var t = this,
                e = 0,
                i = 0,
                n = 0;
              if (!0 === t.options.infinite)
                if (t.slideCount <= t.options.slidesToShow)
                  ++n;
                else
                  for (; e < t.slideCount;)
                    ++n,
                    e = i + t.options.slidesToScroll,
                    i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
              else if (!0 === t.options.centerMode)
                n = t.slideCount;
              else if (t.options.asNavFor)
                for (; e < t.slideCount;)
                  ++n,
                  e = i + t.options.slidesToScroll,
                  i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
              else
                n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
              return n - 1
            },
            e.prototype.getLeft = function (t) {
              var e, i, n, o, s = this,
                r = 0;
              return s.slideOffset = 0,
                i = s.$slides.first().outerHeight(!0),
                !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1,
                    o = -1,
                    !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? o = -1.5 : 1 === s.options.slidesToShow && (o = -2)),
                    r = i * s.options.slidesToShow * o),
                  s.slideCount % s.options.slidesToScroll != 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1,
                    r = (s.options.slidesToShow - (t - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1,
                    r = s.slideCount % s.options.slidesToScroll * i * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth,
                  r = (t + s.options.slidesToShow - s.slideCount) * i),
                s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0,
                  r = 0),
                !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0,
                  s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)),
                e = !1 === s.options.vertical ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + r,
                !0 === s.options.variableWidth && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow),
                  e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
                  !0 === s.options.centerMode && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1),
                    e = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
                    e += (s.$list.width() - n.outerWidth()) / 2)),
                e
            },
            e.prototype.getOption = e.prototype.slickGetOption = function (t) {
              return this.options[t]
            },
            e.prototype.getNavigableIndexes = function () {
              var t, e = this,
                i = 0,
                n = 0,
                o = [];
              for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll,
                  n = -1 * e.options.slidesToScroll,
                  t = 2 * e.slideCount); i < t;)
                o.push(i),
                i = n + e.options.slidesToScroll,
                n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
              return o
            },
            e.prototype.getSlick = function () {
              return this
            },
            e.prototype.getSlideCount = function () {
              var e, i, n = this;
              return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0,
                !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function (o, s) {
                    if (s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * n.swipeLeft)
                      return e = s,
                        !1
                  }),
                  Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
            },
            e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
              this.changeSlide({
                data: {
                  message: "index",
                  index: parseInt(t)
                }
              }, e)
            },
            e.prototype.init = function (e) {
              var i = this;
              t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"),
                  i.buildRows(),
                  i.buildOut(),
                  i.setProps(),
                  i.startLoad(),
                  i.loadSlider(),
                  i.initializeEvents(),
                  i.updateArrows(),
                  i.updateDots(),
                  i.checkResponsive(!0),
                  i.focusHandler()),
                e && i.$slider.trigger("init", [i]),
                !0 === i.options.accessibility && i.initADA(),
                i.options.autoplay && (i.paused = !1,
                  i.autoPlay())
            },
            e.prototype.initADA = function () {
              var e = this,
                i = Math.ceil(e.slideCount / e.options.slidesToShow),
                n = e.getNavigableIndexes().filter(function (t) {
                  return t >= 0 && t < e.slideCount
                });
              e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                  "aria-hidden": "true",
                  tabindex: "-1"
                }).find("a, input, button, select").attr({
                  tabindex: "-1"
                }),
                null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
                    var o = n.indexOf(i);
                    if (t(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + i,
                        tabindex: -1
                      }),
                      -1 !== o) {
                      var s = "slick-slide-control" + e.instanceUid + o;
                      t("#" + s).length && t(this).attr({
                        "aria-describedby": s
                      })
                    }
                  }),
                  e.$dots.attr("role", "tablist").find("li").each(function (o) {
                    var s = n[o];
                    t(this).attr({
                        role: "presentation"
                      }),
                      t(this).find("button").first().attr({
                        role: "tab",
                        id: "slick-slide-control" + e.instanceUid + o,
                        "aria-controls": "slick-slide" + e.instanceUid + s,
                        "aria-label": o + 1 + " of " + i,
                        "aria-selected": null,
                        tabindex: "-1"
                      })
                  }).eq(e.currentSlide).find("button").attr({
                    "aria-selected": "true",
                    tabindex: "0"
                  }).end());
              for (var o = e.currentSlide, s = o + e.options.slidesToShow; o < s; o++)
                e.options.focusOnChange ? e.$slides.eq(o).attr({
                  tabindex: "0"
                }) : e.$slides.eq(o).removeAttr("tabindex");
              e.activateADA()
            },
            e.prototype.initArrowEvents = function () {
              var t = this;
              !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                  message: "previous"
                }, t.changeSlide),
                t.$nextArrow.off("click.slick").on("click.slick", {
                  message: "next"
                }, t.changeSlide),
                !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler),
                  t.$nextArrow.on("keydown.slick", t.keyHandler)))
            },
            e.prototype.initDotEvents = function () {
              var e = this;
              !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (t("li", e.$dots).on("click.slick", {
                    message: "index"
                  }, e.changeSlide),
                  !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
            },
            e.prototype.initSlideEvents = function () {
              var e = this;
              e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
                e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
            },
            e.prototype.initializeEvents = function () {
              var e = this;
              e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", {
                  action: "start"
                }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", {
                  action: "move"
                }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", {
                  action: "end"
                }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", {
                  action: "end"
                }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                t(document).on(e.visibilityChange, t.proxy(e.visibility, e)),
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)),
                t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)),
                t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                t(e.setPosition)
            },
            e.prototype.initUI = function () {
              var t = this;
              !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(),
                  t.$nextArrow.show()),
                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
            },
            e.prototype.keyHandler = function (t) {
              var e = this;
              t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                data: {
                  message: !0 === e.options.rtl ? "next" : "previous"
                }
              }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                data: {
                  message: !0 === e.options.rtl ? "previous" : "next"
                }
              }))
            },
            e.prototype.lazyLoad = function () {
              var e, i, n, o = this;

              function s(e) {
                t("img[data-lazy]", e).each(function () {
                  var e = t(this),
                    i = t(this).attr("data-lazy"),
                    n = t(this).attr("data-srcset"),
                    s = t(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                  r.onload = function () {
                      e.animate({
                        opacity: 0
                      }, 100, function () {
                        n && (e.attr("srcset", n),
                            s && e.attr("sizes", s)),
                          e.attr("src", i).animate({
                            opacity: 1
                          }, 200, function () {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                          }),
                          o.$slider.trigger("lazyLoaded", [o, e, i])
                      })
                    },
                    r.onerror = function () {
                      e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                        o.$slider.trigger("lazyLoadError", [o, e, i])
                    },
                    r.src = i
                })
              }
              if (!0 === o.options.centerMode ? !0 === o.options.infinite ? (i = o.currentSlide + (o.options.slidesToShow / 2 + 1),
                  n = i + o.options.slidesToShow + 2) : (i = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)),
                  n = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (i = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide,
                  n = Math.ceil(i + o.options.slidesToShow),
                  !0 === o.options.fade && (i > 0 && i--,
                    n <= o.slideCount && n++)),
                e = o.$slider.find(".slick-slide").slice(i, n),
                "anticipated" === o.options.lazyLoad)
                for (var r = i - 1, a = n, l = o.$slider.find(".slick-slide"), h = 0; h < o.options.slidesToScroll; h++)
                  r < 0 && (r = o.slideCount - 1),
                  e = (e = e.add(l.eq(r))).add(l.eq(a)),
                  r--,
                  a++;
              s(e),
                o.slideCount <= o.options.slidesToShow ? s(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? s(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && s(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
            },
            e.prototype.loadSlider = function () {
              var t = this;
              t.setPosition(),
                t.$slideTrack.css({
                  opacity: 1
                }),
                t.$slider.removeClass("slick-loading"),
                t.initUI(),
                "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
            },
            e.prototype.next = e.prototype.slickNext = function () {
              this.changeSlide({
                data: {
                  message: "next"
                }
              })
            },
            e.prototype.orientationChange = function () {
              this.checkResponsive(),
                this.setPosition()
            },
            e.prototype.pause = e.prototype.slickPause = function () {
              this.autoPlayClear(),
                this.paused = !0
            },
            e.prototype.play = e.prototype.slickPlay = function () {
              var t = this;
              t.autoPlay(),
                t.options.autoplay = !0,
                t.paused = !1,
                t.focussed = !1,
                t.interrupted = !1
            },
            e.prototype.postSlide = function (e) {
              var i = this;
              if (!i.unslicked && (i.$slider.trigger("afterChange", [i, e]),
                  i.animating = !1,
                  i.slideCount > i.options.slidesToShow && i.setPosition(),
                  i.swipeLeft = null,
                  i.options.autoplay && i.autoPlay(),
                  !0 === i.options.accessibility && (i.initADA(),
                    i.options.focusOnChange))) {
                var n = t(i.$slides.get(i.currentSlide));
                n.attr("tabindex", 0).focus()
              }
            },
            e.prototype.prev = e.prototype.slickPrev = function () {
              this.changeSlide({
                data: {
                  message: "previous"
                }
              })
            },
            e.prototype.preventDefault = function (t) {
              t.preventDefault()
            },
            e.prototype.progressiveLazyLoad = function (e) {
              e = e || 1;
              var i, n, o, s, r, a = this,
                l = t("img[data-lazy]", a.$slider);
              l.length ? (i = l.first(),
                n = i.attr("data-lazy"),
                o = i.attr("data-srcset"),
                s = i.attr("data-sizes") || a.$slider.attr("data-sizes"),
                (r = document.createElement("img")).onload = function () {
                  o && (i.attr("srcset", o),
                      s && i.attr("sizes", s)),
                    i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                    !0 === a.options.adaptiveHeight && a.setPosition(),
                    a.$slider.trigger("lazyLoaded", [a, i, n]),
                    a.progressiveLazyLoad()
                },
                r.onerror = function () {
                  e < 3 ? setTimeout(function () {
                    a.progressiveLazyLoad(e + 1)
                  }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    a.$slider.trigger("lazyLoadError", [a, i, n]),
                    a.progressiveLazyLoad())
                },
                r.src = n) : a.$slider.trigger("allImagesLoaded", [a])
            },
            e.prototype.refresh = function (e) {
              var i, n, o = this;
              n = o.slideCount - o.options.slidesToShow,
                !o.options.infinite && o.currentSlide > n && (o.currentSlide = n),
                o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
                i = o.currentSlide,
                o.destroy(!0),
                t.extend(o, o.initials, {
                  currentSlide: i
                }),
                o.init(),
                e || o.changeSlide({
                  data: {
                    message: "index",
                    index: i
                  }
                }, !1)
            },
            e.prototype.registerBreakpoints = function () {
              var e, i, n, o = this,
                s = o.options.responsive || null;
              if ("array" === t.type(s) && s.length) {
                for (e in o.respondTo = o.options.respondTo || "window",
                  s)
                  if (n = o.breakpoints.length - 1,
                    s.hasOwnProperty(e)) {
                    for (i = s[e].breakpoint; n >= 0;)
                      o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1),
                      n--;
                    o.breakpoints.push(i),
                      o.breakpointSettings[i] = s[e].settings
                  }
                o.breakpoints.sort(function (t, e) {
                  return o.options.mobileFirst ? t - e : e - t
                })
              }
            },
            e.prototype.reinit = function () {
              var e = this;
              e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                e.paused = !e.options.autoplay,
                e.autoPlay(),
                e.$slider.trigger("reInit", [e])
            },
            e.prototype.resize = function () {
              var e = this;
              t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
                e.windowDelay = window.setTimeout(function () {
                  e.windowWidth = t(window).width(),
                    e.checkResponsive(),
                    e.unslicked || e.setPosition()
                }, 50))
            },
            e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
              var n = this;
              if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : n.slideCount - 1 : !0 === e ? --t : t,
                n.slideCount < 1 || t < 0 || t > n.slideCount - 1)
                return !1;
              n.unload(),
                !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(),
                n.$slides = n.$slideTrack.children(this.options.slide),
                n.$slideTrack.children(this.options.slide).detach(),
                n.$slideTrack.append(n.$slides),
                n.$slidesCache = n.$slides,
                n.reinit()
            },
            e.prototype.setCSS = function (t) {
              var e, i, n = this,
                o = {};
              !0 === n.options.rtl && (t = -t),
                e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px",
                i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px",
                o[n.positionProp] = t,
                !1 === n.transformsEnabled ? n.$slideTrack.css(o) : (o = {},
                  !1 === n.cssTransitions ? (o[n.animType] = "translate(" + e + ", " + i + ")",
                    n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)",
                    n.$slideTrack.css(o)))
            },
            e.prototype.setDimensions = function () {
              var t = this;
              !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                  padding: "0px " + t.options.centerPadding
                }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow),
                  !0 === t.options.centerMode && t.$list.css({
                    padding: t.options.centerPadding + " 0px"
                  })),
                t.listWidth = t.$list.width(),
                t.listHeight = t.$list.height(),
                !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow),
                  t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth),
                  t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
              var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
              !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
            },
            e.prototype.setFade = function () {
              var e, i = this;
              i.$slides.each(function (n, o) {
                  e = i.slideWidth * n * -1,
                    !0 === i.options.rtl ? t(o).css({
                      position: "relative",
                      right: e,
                      top: 0,
                      zIndex: i.options.zIndex - 2,
                      opacity: 0
                    }) : t(o).css({
                      position: "relative",
                      left: e,
                      top: 0,
                      zIndex: i.options.zIndex - 2,
                      opacity: 0
                    })
                }),
                i.$slides.eq(i.currentSlide).css({
                  zIndex: i.options.zIndex - 1,
                  opacity: 1
                })
            },
            e.prototype.setHeight = function () {
              var t = this;
              if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e)
              }
            },
            e.prototype.setOption = e.prototype.slickSetOption = function () {
              var e, i, n, o, s, r = this,
                a = !1;
              if ("object" === t.type(arguments[0]) ? (n = arguments[0],
                  a = arguments[1],
                  s = "multiple") : "string" === t.type(arguments[0]) && (n = arguments[0],
                  o = arguments[1],
                  a = arguments[2],
                  "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")),
                "single" === s)
                r.options[n] = o;
              else if ("multiple" === s)
                t.each(n, function (t, e) {
                  r.options[t] = e
                });
              else if ("responsive" === s)
                for (i in o)
                  if ("array" !== t.type(r.options.responsive))
                    r.options.responsive = [o[i]];
                  else {
                    for (e = r.options.responsive.length - 1; e >= 0;)
                      r.options.responsive[e].breakpoint === o[i].breakpoint && r.options.responsive.splice(e, 1),
                      e--;
                    r.options.responsive.push(o[i])
                  }
              a && (r.unload(),
                r.reinit())
            },
            e.prototype.setPosition = function () {
              var t = this;
              t.setDimensions(),
                t.setHeight(),
                !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(),
                t.$slider.trigger("setPosition", [t])
            },
            e.prototype.setProps = function () {
              var t = this,
                e = document.body.style;
              t.positionProp = !0 === t.options.vertical ? "top" : "left",
                "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
                void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0),
                t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex),
                void 0 !== e.OTransform && (t.animType = "OTransform",
                  t.transformType = "-o-transform",
                  t.transitionType = "OTransition",
                  void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                void 0 !== e.MozTransform && (t.animType = "MozTransform",
                  t.transformType = "-moz-transform",
                  t.transitionType = "MozTransition",
                  void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                void 0 !== e.webkitTransform && (t.animType = "webkitTransform",
                  t.transformType = "-webkit-transform",
                  t.transitionType = "webkitTransition",
                  void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                void 0 !== e.msTransform && (t.animType = "msTransform",
                  t.transformType = "-ms-transform",
                  t.transitionType = "msTransition",
                  void 0 === e.msTransform && (t.animType = !1)),
                void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform",
                  t.transformType = "transform",
                  t.transitionType = "transition"),
                t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
            },
            e.prototype.setSlideClasses = function (t) {
              var e, i, n, o, s = this;
              if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
                s.$slides.eq(t).addClass("slick-current"),
                !0 === s.options.centerMode) {
                var r = s.options.slidesToShow % 2 == 0 ? 1 : 0;
                e = Math.floor(s.options.slidesToShow / 2),
                  !0 === s.options.infinite && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e + r, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + t,
                      i.slice(n - e + 1 + r, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
                    0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")),
                  s.$slides.eq(t).addClass("slick-center")
              } else
                t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow,
                  n = !0 === s.options.infinite ? s.options.slidesToShow + t : t,
                  s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
              "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
            },
            e.prototype.setupInfinite = function () {
              var e, i, n, o = this;
              if (!0 === o.options.fade && (o.options.centerMode = !1),
                !0 === o.options.infinite && !1 === o.options.fade && (i = null,
                  o.slideCount > o.options.slidesToShow)) {
                for (n = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow,
                  e = o.slideCount; e > o.slideCount - n; e -= 1)
                  i = e - 1,
                  t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < n + o.slideCount; e += 1)
                  i = e,
                  t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                  t(this).attr("id", "")
                })
              }
            },
            e.prototype.interrupt = function (t) {
              t || this.autoPlay(),
                this.interrupted = t
            },
            e.prototype.selectHandler = function (e) {
              var i = this,
                n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                o = parseInt(n.attr("data-slick-index"));
              o || (o = 0),
                i.slideCount <= i.options.slidesToShow ? i.slideHandler(o, !1, !0) : i.slideHandler(o)
            },
            e.prototype.slideHandler = function (t, e, i) {
              var n, o, s, r, a, l = null,
                h = this;
              if (e = e || !1,
                !(!0 === h.animating && !0 === h.options.waitForAnimate || !0 === h.options.fade && h.currentSlide === t))
                if (!1 === e && h.asNavFor(t),
                  n = t,
                  l = h.getLeft(n),
                  r = h.getLeft(h.currentSlide),
                  h.currentLeft = null === h.swipeLeft ? r : h.swipeLeft,
                  !1 === h.options.infinite && !1 === h.options.centerMode && (t < 0 || t > h.getDotCount() * h.options.slidesToScroll))
                  !1 === h.options.fade && (n = h.currentSlide,
                    !0 !== i && h.slideCount > h.options.slidesToShow ? h.animateSlide(r, function () {
                      h.postSlide(n)
                    }) : h.postSlide(n));
                else if (!1 === h.options.infinite && !0 === h.options.centerMode && (t < 0 || t > h.slideCount - h.options.slidesToScroll))
                !1 === h.options.fade && (n = h.currentSlide,
                  !0 !== i && h.slideCount > h.options.slidesToShow ? h.animateSlide(r, function () {
                    h.postSlide(n)
                  }) : h.postSlide(n));
              else {
                if (h.options.autoplay && clearInterval(h.autoPlayTimer),
                  o = n < 0 ? h.slideCount % h.options.slidesToScroll != 0 ? h.slideCount - h.slideCount % h.options.slidesToScroll : h.slideCount + n : n >= h.slideCount ? h.slideCount % h.options.slidesToScroll != 0 ? 0 : n - h.slideCount : n,
                  h.animating = !0,
                  h.$slider.trigger("beforeChange", [h, h.currentSlide, o]),
                  s = h.currentSlide,
                  h.currentSlide = o,
                  h.setSlideClasses(h.currentSlide),
                  h.options.asNavFor && (a = (a = h.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(h.currentSlide),
                  h.updateDots(),
                  h.updateArrows(),
                  !0 === h.options.fade)
                  return !0 !== i ? (h.fadeSlideOut(s),
                      h.fadeSlide(o, function () {
                        h.postSlide(o)
                      })) : h.postSlide(o),
                    void h.animateHeight();
                !0 !== i && h.slideCount > h.options.slidesToShow ? h.animateSlide(l, function () {
                  h.postSlide(o)
                }) : h.postSlide(o)
              }
            },
            e.prototype.startLoad = function () {
              var t = this;
              !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(),
                  t.$nextArrow.hide()),
                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                t.$slider.addClass("slick-loading")
            },
            e.prototype.swipeDirection = function () {
              var t, e, i, n, o = this;
              return t = o.touchObject.startX - o.touchObject.curX,
                e = o.touchObject.startY - o.touchObject.curY,
                i = Math.atan2(e, t),
                (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)),
                n <= 45 && n >= 0 ? !1 === o.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === o.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
            },
            e.prototype.swipeEnd = function (t) {
              var e, i, n = this;
              if (n.dragging = !1,
                n.swiping = !1,
                n.scrolling)
                return n.scrolling = !1,
                  !1;
              if (n.interrupted = !1,
                n.shouldClick = !(n.touchObject.swipeLength > 10),
                void 0 === n.touchObject.curX)
                return !1;
              if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]),
                n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                switch (i = n.swipeDirection()) {
                  case "left":
                  case "down":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                      n.currentDirection = 0;
                    break;
                  case "right":
                  case "up":
                    e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                      n.currentDirection = 1
                }
                "vertical" != i && (n.slideHandler(e),
                  n.touchObject = {},
                  n.$slider.trigger("swipe", [n, i]))
              } else
                n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide),
                  n.touchObject = {})
            },
            e.prototype.swipeHandler = function (t) {
              var e = this;
              if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse")))
                switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1,
                  e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
                  !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                  t.data.action) {
                  case "start":
                    e.swipeStart(t);
                    break;
                  case "move":
                    e.swipeMove(t);
                    break;
                  case "end":
                    e.swipeEnd(t)
                }
            },
            e.prototype.swipeMove = function (t) {
              var e, i, n, o, s, r, a = this;
              return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null,
                !(!a.dragging || a.scrolling || s && 1 !== s.length) && (e = a.getLeft(a.currentSlide),
                  a.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX,
                  a.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY,
                  a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))),
                  r = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))),
                  !a.options.verticalSwiping && !a.swiping && r > 4 ? (a.scrolling = !0,
                    !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = r),
                    i = a.swipeDirection(),
                    void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0,
                      t.preventDefault()),
                    o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1),
                    !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
                    n = a.touchObject.swipeLength,
                    a.touchObject.edgeHit = !1,
                    !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction,
                      a.touchObject.edgeHit = !0),
                    !1 === a.options.vertical ? a.swipeLeft = e + n * o : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * o,
                    !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * o),
                    !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null,
                      !1) : void a.setCSS(a.swipeLeft))))
            },
            e.prototype.swipeStart = function (t) {
              var e, i = this;
              if (i.interrupted = !0,
                1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)
                return i.touchObject = {},
                  !1;
              void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
                i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX,
                i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY,
                i.dragging = !0
            },
            e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
              var t = this;
              null !== t.$slidesCache && (t.unload(),
                t.$slideTrack.children(this.options.slide).detach(),
                t.$slidesCache.appendTo(t.$slideTrack),
                t.reinit())
            },
            e.prototype.unload = function () {
              var e = this;
              t(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
            },
            e.prototype.unslick = function (t) {
              var e = this;
              e.$slider.trigger("unslick", [e, t]),
                e.destroy()
            },
            e.prototype.updateArrows = function () {
              var t = this;
              Math.floor(t.options.slidesToShow / 2),
                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                  t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                  0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                    t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                    t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                    t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
            },
            e.prototype.updateDots = function () {
              var t = this;
              null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(),
                t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
            },
            e.prototype.visibility = function () {
              var t = this;
              t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
            },
            t.fn.slick = function () {
              var t, i, n = this,
                o = arguments[0],
                s = Array.prototype.slice.call(arguments, 1),
                r = n.length;
              for (t = 0; t < r; t++)
                if ("object" == typeof o || void 0 === o ? n[t].slick = new e(n[t], o) : i = n[t].slick[o].apply(n[t].slick, s),
                  void 0 !== i)
                  return i;
              return n
            }
        }) ? n.apply(e, o) : n) || (t.exports = s)
    }()
  }, function (t, e, i) {
    "use strict";
    var n = i(0),
      o = i.n(n),
      s = {
        autoShow: !1,
        autoHide: !1,
        autoPick: !1,
        inline: !1,
        container: null,
        trigger: null,
        language: "",
        format: "mm/dd/yyyy",
        date: null,
        startDate: null,
        endDate: null,
        startView: 0,
        weekStart: 0,
        yearFirst: !1,
        yearSuffix: "",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        itemTag: "li",
        mutedClass: "muted",
        pickedClass: "picked",
        disabledClass: "disabled",
        highlightedClass: "highlighted",
        template: '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
        offset: 10,
        zIndex: 1e3,
        filter: null,
        show: null,
        hide: null,
        pick: null
      },
      r = "undefined" != typeof window ? window : {},
      a = "datepicker",
      l = "click.datepicker",
      h = "datepicker-hide",
      c = {},
      d = 0,
      u = 1,
      p = 2,
      f = Object.prototype.toString;

    function g(t) {
      return "string" == typeof t
    }
    var m = Number.isNaN || r.isNaN;

    function v(t) {
      return "number" == typeof t && !m(t)
    }

    function y(t) {
      return void 0 === t
    }

    function x(t) {
      return "date" === (e = t,
        f.call(e).slice(8, -1).toLowerCase());
      var e
    }

    function b(t, e) {
      for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++)
        n[o - 2] = arguments[o];
      return function () {
        for (var i = arguments.length, o = Array(i), s = 0; s < i; s++)
          o[s] = arguments[s];
        return t.apply(e, n.concat(o))
      }
    }

    function w(t) {
      return '[data-view="' + t + '"]'
    }

    function k(t, e) {
      return [31, function (t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
      }(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
    }

    function T(t, e, i) {
      return Math.min(i, k(t, e))
    }
    var S = /(y|m|d)+/g;
    var C = /\d+/g,
      A = {
        show: function () {
          this.built || this.build(),
            this.shown || this.trigger("show.datepicker").isDefaultPrevented() || (this.shown = !0,
              this.$picker.removeClass(h).on(l, o.a.proxy(this.click, this)),
              this.showView(this.options.startView),
              this.inline || (o()(window).on("resize.datepicker", this.onResize = b(this.place, this)),
                o()(document).on(l, this.onGlobalClick = b(this.globalClick, this)),
                o()(document).on("keyup.datepicker", this.onGlobalKeyup = b(this.globalKeyup, this)),
                this.place()))
        },
        hide: function () {
          this.shown && (this.trigger("hide.datepicker").isDefaultPrevented() || (this.shown = !1,
            this.$picker.addClass(h).off(l, this.click),
            this.inline || (o()(window).off("resize.datepicker", this.onResize),
              o()(document).off(l, this.onGlobalClick),
              o()(document).off("keyup.datepicker", this.onGlobalKeyup))))
        },
        toggle: function () {
          this.shown ? this.hide() : this.show()
        },
        update: function () {
          var t = this.getValue();
          t !== this.oldValue && (this.setDate(t, !0),
            this.oldValue = t)
        },
        pick: function (t) {
          var e = this.$element,
            i = this.date;
          this.trigger("pick.datepicker", {
            view: t || "",
            date: i
          }).isDefaultPrevented() || (i = this.formatDate(this.date),
            this.setValue(i),
            this.isInput && (e.trigger("input"),
              e.trigger("change")))
        },
        reset: function () {
          this.setDate(this.initialDate, !0),
            this.setValue(this.initialValue),
            this.shown && this.showView(this.options.startView)
        },
        getMonthName: function (t, e) {
          var i = this.options,
            n = i.monthsShort,
            s = i.months;
          return o.a.isNumeric(t) ? t = Number(t) : y(e) && (e = t),
            !0 === e && (s = n),
            s[v(t) ? t : this.date.getMonth()]
        },
        getDayName: function (t, e, i) {
          var n = this.options,
            s = n.days;
          return o.a.isNumeric(t) ? t = Number(t) : (y(i) && (i = e),
              y(e) && (e = t)),
            i ? s = n.daysMin : e && (s = n.daysShort),
            s[v(t) ? t : this.date.getDay()]
        },
        getDate: function (t) {
          var e = this.date;
          return t ? this.formatDate(e) : new Date(e)
        },
        setDate: function (t, e) {
          var i = this.options.filter;
          if (x(t) || g(t)) {
            if (t = this.parseDate(t),
              o.a.isFunction(i) && !1 === i.call(this.$element, t))
              return;
            this.date = t,
              this.viewDate = new Date(t),
              e || this.pick(),
              this.built && this.render()
          }
        },
        setStartDate: function (t) {
          (x(t) || g(t)) && (this.startDate = this.parseDate(t),
            this.built && this.render())
        },
        setEndDate: function (t) {
          (x(t) || g(t)) && (this.endDate = this.parseDate(t),
            this.built && this.render())
        },
        parseDate: function (t) {
          var e = this.format,
            i = [];
          if (x(t))
            return new Date(t.getFullYear(), t.getMonth(), t.getDate());
          g(t) && (i = t.match(C) || []),
            t = new Date;
          var n = e.parts.length,
            s = t.getFullYear(),
            r = t.getDate(),
            a = t.getMonth();
          return i.length === n && o.a.each(i, function (t, i) {
              var n = parseInt(i, 10) || 1;
              switch (e.parts[t]) {
                case "dd":
                case "d":
                  r = n;
                  break;
                case "mm":
                case "m":
                  a = n - 1;
                  break;
                case "yy":
                  s = 2e3 + n;
                  break;
                case "yyyy":
                  s = n
              }
            }),
            new Date(s, a, r)
        },
        formatDate: function (t) {
          var e = this.format,
            i = "";
          if (x(t)) {
            var n = t.getFullYear(),
              s = {
                d: t.getDate(),
                m: t.getMonth() + 1,
                yy: n.toString().substring(2),
                yyyy: n
              };
            s.dd = (s.d < 10 ? "0" : "") + s.d,
              s.mm = (s.m < 10 ? "0" : "") + s.m,
              i = e.source,
              o.a.each(e.parts, function (t, e) {
                i = i.replace(e, s[e])
              })
          }
          return i
        },
        destroy: function () {
          this.unbind(),
            this.unbuild(),
            this.$element.removeData(a)
        }
      },
      M = {
        click: function (t) {
          var e = o()(t.target),
            i = this.options,
            n = this.viewDate,
            s = this.format;
          if (t.stopPropagation(),
            t.preventDefault(),
            !e.hasClass("disabled")) {
            var r = e.data("view"),
              a = n.getFullYear(),
              l = n.getMonth(),
              h = n.getDate();
            switch (r) {
              case "years prev":
              case "years next":
                a = "years prev" === r ? a - 10 : a + 10,
                  this.viewDate = new Date(a, l, T(a, l, h)),
                  this.renderYears();
                break;
              case "year prev":
              case "year next":
                a = "year prev" === r ? a - 1 : a + 1,
                  this.viewDate = new Date(a, l, T(a, l, h)),
                  this.renderMonths();
                break;
              case "year current":
                s.hasYear && this.showView(p);
                break;
              case "year picked":
                s.hasMonth ? this.showView(u) : (e.addClass(i.pickedClass).siblings().removeClass(i.pickedClass),
                    this.hideView()),
                  this.pick("year");
                break;
              case "year":
                a = parseInt(e.text(), 10),
                  this.date = new Date(a, l, T(a, l, h)),
                  s.hasMonth ? (this.viewDate = new Date(this.date),
                    this.showView(u)) : (e.addClass(i.pickedClass).siblings().removeClass(i.pickedClass),
                    this.hideView()),
                  this.pick("year");
                break;
              case "month prev":
              case "month next":
                (l = "month prev" === r ? l - 1 : l + 1) < 0 ? (a -= 1,
                    l += 12) : l > 11 && (a += 1,
                    l -= 12),
                  this.viewDate = new Date(a, l, T(a, l, h)),
                  this.renderDays();
                break;
              case "month current":
                s.hasMonth && this.showView(u);
                break;
              case "month picked":
                s.hasDay ? this.showView(d) : (e.addClass(i.pickedClass).siblings().removeClass(i.pickedClass),
                    this.hideView()),
                  this.pick("month");
                break;
              case "month":
                l = o.a.inArray(e.text(), i.monthsShort),
                  this.date = new Date(a, l, T(a, l, h)),
                  s.hasDay ? (this.viewDate = new Date(a, l, T(a, l, h)),
                    this.showView(d)) : (e.addClass(i.pickedClass).siblings().removeClass(i.pickedClass),
                    this.hideView()),
                  this.pick("month");
                break;
              case "day prev":
              case "day next":
              case "day":
                "day prev" === r ? l -= 1 : "day next" === r && (l += 1),
                  h = parseInt(e.text(), 10),
                  this.date = new Date(a, l, h),
                  this.viewDate = new Date(a, l, h),
                  this.renderDays(),
                  "day" === r && this.hideView(),
                  this.pick("day");
                break;
              case "day picked":
                this.hideView(),
                  this.pick("day")
            }
          }
        },
        globalClick: function (t) {
          for (var e = t.target, i = this.element, n = this.$trigger[0], o = !0; e !== document;) {
            if (e === n || e === i) {
              o = !1;
              break
            }
            e = e.parentNode
          }
          o && this.hide()
        },
        keyup: function () {
          this.update()
        },
        globalKeyup: function (t) {
          var e = t.target,
            i = t.key,
            n = t.keyCode;
          this.isInput && e !== this.element && this.shown && ("Tab" === i || 9 === n) && this.hide()
        }
      },
      E = {
        render: function () {
          this.renderYears(),
            this.renderMonths(),
            this.renderDays()
        },
        renderWeek: function () {
          var t = this,
            e = [],
            i = this.options,
            n = i.weekStart,
            s = i.daysMin;
          n = parseInt(n, 10) % 7,
            s = s.slice(n).concat(s.slice(0, n)),
            o.a.each(s, function (i, n) {
              e.push(t.createItem({
                text: n
              }))
            }),
            this.$week.html(e.join(""))
        },
        renderYears: function () {
          var t = this.options,
            e = this.startDate,
            i = this.endDate,
            n = t.disabledClass,
            o = t.filter,
            s = t.yearSuffix,
            r = this.viewDate.getFullYear(),
            a = (new Date).getFullYear(),
            l = this.date.getFullYear(),
            h = [],
            c = !1,
            d = !1,
            u = void 0;
          for (u = -5; u <= 6; u += 1) {
            var p = new Date(r + u, 1, 1),
              f = !1;
            e && (f = p.getFullYear() < e.getFullYear(),
                -5 === u && (c = f)),
              !f && i && (f = p.getFullYear() > i.getFullYear(),
                6 === u && (d = f)),
              !f && o && (f = !1 === o.call(this.$element, p));
            var g = r + u === l,
              m = g ? "year picked" : "year";
            h.push(this.createItem({
              picked: g,
              disabled: f,
              text: r + u,
              view: f ? "year disabled" : m,
              highlighted: p.getFullYear() === a
            }))
          }
          this.$yearsPrev.toggleClass(n, c),
            this.$yearsNext.toggleClass(n, d),
            this.$yearsCurrent.toggleClass(n, !0).html(r + -5 + s + " - " + (r + 6) + s),
            this.$years.html(h.join(""))
        },
        renderMonths: function () {
          var t = this.options,
            e = this.startDate,
            i = this.endDate,
            n = this.viewDate,
            s = t.disabledClass || "",
            r = t.monthsShort,
            a = o.a.isFunction(t.filter) && t.filter,
            l = n.getFullYear(),
            h = new Date,
            c = h.getFullYear(),
            d = h.getMonth(),
            u = this.date.getFullYear(),
            p = this.date.getMonth(),
            f = [],
            g = !1,
            m = !1,
            v = void 0;
          for (v = 0; v <= 11; v += 1) {
            var y = new Date(l, v, 1),
              x = !1;
            e && (x = (g = y.getFullYear() === e.getFullYear()) && y.getMonth() < e.getMonth()),
              !x && i && (x = (m = y.getFullYear() === i.getFullYear()) && y.getMonth() > i.getMonth()),
              !x && a && (x = !1 === a.call(this.$element, y));
            var b = l === u && v === p,
              w = b ? "month picked" : "month";
            f.push(this.createItem({
              disabled: x,
              picked: b,
              highlighted: l === c && y.getMonth() === d,
              index: v,
              text: r[v],
              view: x ? "month disabled" : w
            }))
          }
          this.$yearPrev.toggleClass(s, g),
            this.$yearNext.toggleClass(s, m),
            this.$yearCurrent.toggleClass(s, g && m).html(l + t.yearSuffix || ""),
            this.$months.html(f.join(""))
        },
        renderDays: function () {
          var t = this.$element,
            e = this.options,
            i = this.startDate,
            n = this.endDate,
            o = this.viewDate,
            s = this.date,
            r = e.disabledClass,
            a = e.filter,
            l = e.monthsShort,
            h = e.weekStart,
            c = e.yearSuffix,
            d = o.getFullYear(),
            u = o.getMonth(),
            p = new Date,
            f = p.getFullYear(),
            g = p.getMonth(),
            m = p.getDate(),
            v = s.getFullYear(),
            y = s.getMonth(),
            x = s.getDate(),
            b = void 0,
            w = void 0,
            T = void 0,
            S = [],
            C = d,
            A = u,
            M = !1;
          0 === u ? (C -= 1,
              A = 11) : A -= 1,
            b = k(C, A);
          var E = new Date(d, u, 1);
          for ((T = E.getDay() - parseInt(h, 10) % 7) <= 0 && (T += 7),
            i && (M = E.getTime() <= i.getTime()),
            w = b - (T - 1); w <= b; w += 1) {
            var D = new Date(C, A, w),
              O = !1;
            i && (O = D.getTime() < i.getTime()),
              !O && a && (O = !1 === a.call(t, D)),
              S.push(this.createItem({
                disabled: O,
                highlighted: C === f && A === g && D.getDate() === m,
                muted: !0,
                picked: C === v && A === y && w === x,
                text: w,
                view: "day prev"
              }))
          }
          var P = [],
            I = d,
            _ = u,
            L = !1;
          11 === u ? (I += 1,
              _ = 0) : _ += 1,
            b = k(d, u),
            T = 42 - (S.length + b);
          var N = new Date(d, u, b);
          for (n && (L = N.getTime() >= n.getTime()),
            w = 1; w <= T; w += 1) {
            var H = new Date(I, _, w),
              R = I === v && _ === y && w === x,
              B = !1;
            n && (B = H.getTime() > n.getTime()),
              !B && a && (B = !1 === a.call(t, H)),
              P.push(this.createItem({
                disabled: B,
                picked: R,
                highlighted: I === f && _ === g && H.getDate() === m,
                muted: !0,
                text: w,
                view: "day next"
              }))
          }
          var W = [];
          for (w = 1; w <= b; w += 1) {
            var z = new Date(d, u, w),
              F = !1;
            i && (F = z.getTime() < i.getTime()),
              !F && n && (F = z.getTime() > n.getTime()),
              !F && a && (F = !1 === a.call(t, z));
            var j = d === v && u === y && w === x,
              $ = j ? "day picked" : "day";
            W.push(this.createItem({
              disabled: F,
              picked: j,
              highlighted: d === f && u === g && z.getDate() === m,
              text: w,
              view: F ? "day disabled" : $
            }))
          }
          this.$monthPrev.toggleClass(r, M),
            this.$monthNext.toggleClass(r, L),
            this.$monthCurrent.toggleClass(r, M && L).html(e.yearFirst ? d + c + " " + l[u] : l[u] + " " + d + c),
            this.$days.html(S.join("") + W.join("") + P.join(""))
        }
      },
      D = function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
              n.configurable = !0,
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n)
          }
        }
        return function (e, i, n) {
          return i && t(e.prototype, i),
            n && t(e, n),
            e
        }
      }();
    var O = "datepicker-top-left",
      P = "datepicker-bottom-left",
      I = [O, "datepicker-top-right", P, "datepicker-bottom-right"].join(" "),
      _ = function () {
        function t(e) {
          var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          ! function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          }(this, t),
          this.$element = o()(e),
            this.element = e,
            this.options = o.a.extend({}, s, c[i.language], i),
            this.built = !1,
            this.shown = !1,
            this.isInput = !1,
            this.inline = !1,
            this.initialValue = "",
            this.initialDate = null,
            this.startDate = null,
            this.endDate = null,
            this.init()
        }
        return D(t, [{
            key: "init",
            value: function () {
              var t = this.$element,
                e = this.options,
                i = e.startDate,
                n = e.endDate,
                s = e.date;
              this.$trigger = o()(e.trigger),
                this.isInput = t.is("input") || t.is("textarea"),
                this.inline = e.inline && (e.container || !this.isInput),
                this.format = function (t) {
                  var e = String(t).toLowerCase(),
                    i = e.match(S);
                  if (!i || 0 === i.length)
                    throw new Error("Invalid date format.");
                  return t = {
                      source: e,
                      parts: i
                    },
                    o.a.each(i, function (e, i) {
                      switch (i) {
                        case "dd":
                        case "d":
                          t.hasDay = !0;
                          break;
                        case "mm":
                        case "m":
                          t.hasMonth = !0;
                          break;
                        case "yyyy":
                        case "yy":
                          t.hasYear = !0
                      }
                    }),
                    t
                }(e.format);
              var r = this.getValue();
              this.initialValue = r,
                this.oldValue = r,
                s = this.parseDate(s || r),
                i && (i = this.parseDate(i),
                  s.getTime() < i.getTime() && (s = new Date(i)),
                  this.startDate = i),
                n && (n = this.parseDate(n),
                  i && n.getTime() < i.getTime() && (n = new Date(i)),
                  s.getTime() > n.getTime() && (s = new Date(n)),
                  this.endDate = n),
                this.date = s,
                this.viewDate = new Date(s),
                this.initialDate = new Date(this.date),
                this.bind(),
                (e.autoShow || this.inline) && this.show(),
                e.autoPick && this.pick()
            }
          }, {
            key: "build",
            value: function () {
              if (!this.built) {
                this.built = !0;
                var t = this.$element,
                  e = this.options,
                  i = o()(e.template);
                this.$picker = i,
                  this.$week = i.find(w("week")),
                  this.$yearsPicker = i.find(w("years picker")),
                  this.$yearsPrev = i.find(w("years prev")),
                  this.$yearsNext = i.find(w("years next")),
                  this.$yearsCurrent = i.find(w("years current")),
                  this.$years = i.find(w("years")),
                  this.$monthsPicker = i.find(w("months picker")),
                  this.$yearPrev = i.find(w("year prev")),
                  this.$yearNext = i.find(w("year next")),
                  this.$yearCurrent = i.find(w("year current")),
                  this.$months = i.find(w("months")),
                  this.$daysPicker = i.find(w("days picker")),
                  this.$monthPrev = i.find(w("month prev")),
                  this.$monthNext = i.find(w("month next")),
                  this.$monthCurrent = i.find(w("month current")),
                  this.$days = i.find(w("days")),
                  this.inline ? o()(e.container || t).append(i.addClass("datepicker-inline")) : (o()(document.body).append(i.addClass("datepicker-dropdown")),
                    i.addClass(h)),
                  this.renderWeek()
              }
            }
          }, {
            key: "unbuild",
            value: function () {
              this.built && (this.built = !1,
                this.$picker.remove())
            }
          }, {
            key: "bind",
            value: function () {
              var t = this.options,
                e = this.$element;
              o.a.isFunction(t.show) && e.on("show.datepicker", t.show),
                o.a.isFunction(t.hide) && e.on("hide.datepicker", t.hide),
                o.a.isFunction(t.pick) && e.on("pick.datepicker", t.pick),
                this.isInput && e.on("keyup.datepicker", o.a.proxy(this.keyup, this)),
                this.inline || (t.trigger ? this.$trigger.on(l, o.a.proxy(this.toggle, this)) : this.isInput ? e.on("focus.datepicker", o.a.proxy(this.show, this)) : e.on(l, o.a.proxy(this.show, this)))
            }
          }, {
            key: "unbind",
            value: function () {
              var t = this.$element,
                e = this.options;
              o.a.isFunction(e.show) && t.off("show.datepicker", e.show),
                o.a.isFunction(e.hide) && t.off("hide.datepicker", e.hide),
                o.a.isFunction(e.pick) && t.off("pick.datepicker", e.pick),
                this.isInput && t.off("keyup.datepicker", this.keyup),
                this.inline || (e.trigger ? this.$trigger.off(l, this.toggle) : this.isInput ? t.off("focus.datepicker", this.show) : t.off(l, this.show))
            }
          }, {
            key: "showView",
            value: function (t) {
              var e = this.$yearsPicker,
                i = this.$monthsPicker,
                n = this.$daysPicker,
                o = this.format;
              if (o.hasYear || o.hasMonth || o.hasDay)
                switch (Number(t)) {
                  case p:
                    i.addClass(h),
                      n.addClass(h),
                      o.hasYear ? (this.renderYears(),
                        e.removeClass(h),
                        this.place()) : this.showView(d);
                    break;
                  case u:
                    e.addClass(h),
                      n.addClass(h),
                      o.hasMonth ? (this.renderMonths(),
                        i.removeClass(h),
                        this.place()) : this.showView(p);
                    break;
                  default:
                    e.addClass(h),
                      i.addClass(h),
                      o.hasDay ? (this.renderDays(),
                        n.removeClass(h),
                        this.place()) : this.showView(u)
                }
            }
          }, {
            key: "hideView",
            value: function () {
              !this.inline && this.options.autoHide && this.hide()
            }
          }, {
            key: "place",
            value: function () {
              if (!this.inline) {
                var t = this.$element,
                  e = this.options,
                  i = this.$picker,
                  n = o()(document).outerWidth(),
                  s = o()(document).outerHeight(),
                  r = t.outerWidth(),
                  a = t.outerHeight(),
                  l = i.width(),
                  h = i.height(),
                  c = t.offset(),
                  d = c.left,
                  u = c.top,
                  p = parseFloat(e.offset),
                  f = O;
                m(p) && (p = 10),
                  u > h && u + a + h > s ? (u -= h + p,
                    f = P) : u += a + p,
                  d + l > n && (d += r - l,
                    f = f.replace("left", "right")),
                  i.removeClass(I).addClass(f).css({
                    top: u,
                    left: d,
                    zIndex: parseInt(e.zIndex, 10)
                  })
              }
            }
          }, {
            key: "trigger",
            value: function (t, e) {
              var i = o.a.Event(t, e);
              return this.$element.trigger(i),
                i
            }
          }, {
            key: "createItem",
            value: function (t) {
              var e = this.options,
                i = e.itemTag,
                n = {
                  text: "",
                  view: "",
                  muted: !1,
                  picked: !1,
                  disabled: !1,
                  highlighted: !1
                },
                s = [];
              return o.a.extend(n, t),
                n.muted && s.push(e.mutedClass),
                n.highlighted && s.push(e.highlightedClass),
                n.picked && s.push(e.pickedClass),
                n.disabled && s.push(e.disabledClass),
                "<" + i + ' class="' + s.join(" ") + '" data-view="' + n.view + '">' + n.text + "</" + i + ">"
            }
          }, {
            key: "getValue",
            value: function () {
              var t = this.$element;
              return this.isInput ? t.val() : t.text()
            }
          }, {
            key: "setValue",
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                e = this.$element;
              this.isInput ? e.val(t) : e.text(t)
            }
          }], [{
            key: "setDefaults",
            value: function () {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              o.a.extend(s, c[t.language], t)
            }
          }]),
          t
      }();
    if (o.a.extend && o.a.extend(_.prototype, E, M, A),
      o.a.fn) {
      var L = o.a.fn.datepicker;
      o.a.fn.datepicker = function (t) {
          for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
            i[n - 1] = arguments[n];
          var s = void 0;
          return this.each(function (e, n) {
              var r = o()(n),
                l = "destroy" === t,
                h = r.data(a);
              if (!h) {
                if (l)
                  return;
                var c = o.a.extend({}, r.data(), o.a.isPlainObject(t) && t);
                h = new _(n, c),
                  r.data(a, h)
              }
              if (g(t)) {
                var d = h[t];
                o.a.isFunction(d) && (s = d.apply(h, i),
                  l && r.removeData(a))
              }
            }),
            y(s) ? this : s
        },
        o.a.fn.datepicker.Constructor = _,
        o.a.fn.datepicker.languages = c,
        o.a.fn.datepicker.setDefaults = _.setDefaults,
        o.a.fn.datepicker.noConflict = function () {
          return o.a.fn.datepicker = L,
            this
        }
    }
  }, function (t, e) {
    var i;
    i = function () {
      return this
    }();
    try {
      i = i || Function("return this")() || (0,
        eval)("this")
    } catch (t) {
      "object" == typeof window && (i = window)
    }
    t.exports = i
  }, function (t, e, i) {
    "use strict";
    i.r(e),
      function (t) {
        for (
          /**!
           * @fileOverview Kickass library to create and place poppers near their reference elements.
           * @version 1.14.3
           * @license
           * Copyright (c) 2016 Federico Zivolo and contributors
           *
           * Permission is hereby granted, free of charge, to any person obtaining a copy
           * of this software and associated documentation files (the "Software"), to deal
           * in the Software without restriction, including without limitation the rights
           * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
           * copies of the Software, and to permit persons to whom the Software is
           * furnished to do so, subject to the following conditions:
           *
           * The above copyright notice and this permission notice shall be included in all
           * copies or substantial portions of the Software.
           *
           * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
           * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
           * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
           * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
           * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
           * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
           * SOFTWARE.
           */
          var i = "undefined" != typeof window && "undefined" != typeof document, n = ["Edge", "Trident", "Firefox"], o = 0, s = 0; s < n.length; s += 1)
          if (i && navigator.userAgent.indexOf(n[s]) >= 0) {
            o = 1;
            break
          }
        var r = i && window.Promise ? function (t) {
            var e = !1;
            return function () {
              e || (e = !0,
                window.Promise.resolve().then(function () {
                  e = !1,
                    t()
                }))
            }
          } :
          function (t) {
            var e = !1;
            return function () {
              e || (e = !0,
                setTimeout(function () {
                  e = !1,
                    t()
                }, o))
            }
          };

        function a(t) {
          return t && "[object Function]" === {}.toString.call(t)
        }

        function l(t, e) {
          if (1 !== t.nodeType)
            return [];
          var i = getComputedStyle(t, null);
          return e ? i[e] : i
        }

        function h(t) {
          return "HTML" === t.nodeName ? t : t.parentNode || t.host
        }

        function c(t) {
          if (!t)
            return document.body;
          switch (t.nodeName) {
            case "HTML":
            case "BODY":
              return t.ownerDocument.body;
            case "#document":
              return t.body
          }
          var e = l(t),
            i = e.overflow,
            n = e.overflowX,
            o = e.overflowY;
          return /(auto|scroll|overlay)/.test(i + o + n) ? t : c(h(t))
        }
        var d = i && !(!window.MSInputMethodContext || !document.documentMode),
          u = i && /MSIE 10/.test(navigator.userAgent);

        function p(t) {
          return 11 === t ? d : 10 === t ? u : d || u
        }

        function f(t) {
          if (!t)
            return document.documentElement;
          for (var e = p(10) ? document.body : null, i = t.offsetParent; i === e && t.nextElementSibling;)
            i = (t = t.nextElementSibling).offsetParent;
          var n = i && i.nodeName;
          return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(i.nodeName) && "static" === l(i, "position") ? f(i) : i : t ? t.ownerDocument.documentElement : document.documentElement
        }

        function g(t) {
          return null !== t.parentNode ? g(t.parentNode) : t
        }

        function m(t, e) {
          if (!(t && t.nodeType && e && e.nodeType))
            return document.documentElement;
          var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = i ? t : e,
            o = i ? e : t,
            s = document.createRange();
          s.setStart(n, 0),
            s.setEnd(o, 0);
          var r, a, l = s.commonAncestorContainer;
          if (t !== l && e !== l || n.contains(o))
            return "BODY" === (a = (r = l).nodeName) || "HTML" !== a && f(r.firstElementChild) !== r ? f(l) : l;
          var h = g(t);
          return h.host ? m(h.host, e) : m(t, g(e).host)
        }

        function v(t) {
          var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            i = t.nodeName;
          if ("BODY" === i || "HTML" === i) {
            var n = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || n)[e]
          }
          return t[e]
        }

        function y(t, e) {
          var i = "x" === e ? "Left" : "Top",
            n = "Left" === i ? "Right" : "Bottom";
          return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10)
        }

        function x(t, e, i, n) {
          return Math.max(e["offset" + t], e["scroll" + t], i["client" + t], i["offset" + t], i["scroll" + t], p(10) ? i["offset" + t] + n["margin" + ("Height" === t ? "Top" : "Left")] + n["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
        }

        function b() {
          var t = document.body,
            e = document.documentElement,
            i = p(10) && getComputedStyle(e);
          return {
            height: x("Height", t, e, i),
            width: x("Width", t, e, i)
          }
        }
        var w = function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function")
          },
          k = function () {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                  n.configurable = !0,
                  "value" in n && (n.writable = !0),
                  Object.defineProperty(t, n.key, n)
              }
            }
            return function (e, i, n) {
              return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
          }(),
          T = function (t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : t[e] = i,
              t
          },
          S = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = arguments[e];
              for (var n in i)
                Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
            }
            return t
          };

        function C(t) {
          return S({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
          })
        }

        function A(t) {
          var e = {};
          try {
            if (p(10)) {
              e = t.getBoundingClientRect();
              var i = v(t, "top"),
                n = v(t, "left");
              e.top += i,
                e.left += n,
                e.bottom += i,
                e.right += n
            } else
              e = t.getBoundingClientRect()
          } catch (t) {}
          var o = {
              left: e.left,
              top: e.top,
              width: e.right - e.left,
              height: e.bottom - e.top
            },
            s = "HTML" === t.nodeName ? b() : {},
            r = s.width || t.clientWidth || o.right - o.left,
            a = s.height || t.clientHeight || o.bottom - o.top,
            h = t.offsetWidth - r,
            c = t.offsetHeight - a;
          if (h || c) {
            var d = l(t);
            h -= y(d, "x"),
              c -= y(d, "y"),
              o.width -= h,
              o.height -= c
          }
          return C(o)
        }

        function M(t, e) {
          var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = p(10),
            o = "HTML" === e.nodeName,
            s = A(t),
            r = A(e),
            a = c(t),
            h = l(e),
            d = parseFloat(h.borderTopWidth, 10),
            u = parseFloat(h.borderLeftWidth, 10);
          i && "HTML" === e.nodeName && (r.top = Math.max(r.top, 0),
            r.left = Math.max(r.left, 0));
          var f = C({
            top: s.top - r.top - d,
            left: s.left - r.left - u,
            width: s.width,
            height: s.height
          });
          if (f.marginTop = 0,
            f.marginLeft = 0,
            !n && o) {
            var g = parseFloat(h.marginTop, 10),
              m = parseFloat(h.marginLeft, 10);
            f.top -= d - g,
              f.bottom -= d - g,
              f.left -= u - m,
              f.right -= u - m,
              f.marginTop = g,
              f.marginLeft = m
          }
          return (n && !i ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (f = function (t, e) {
              var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                n = v(e, "top"),
                o = v(e, "left"),
                s = i ? -1 : 1;
              return t.top += n * s,
                t.bottom += n * s,
                t.left += o * s,
                t.right += o * s,
                t
            }(f, e)),
            f
        }

        function E(t) {
          if (!t || !t.parentElement || p())
            return document.documentElement;
          for (var e = t.parentElement; e && "none" === l(e, "transform");)
            e = e.parentElement;
          return e || document.documentElement
        }

        function D(t, e, i, n) {
          var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = {
              top: 0,
              left: 0
            },
            r = o ? E(t) : m(t, e);
          if ("viewport" === n)
            s = function (t) {
              var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                i = t.ownerDocument.documentElement,
                n = M(t, i),
                o = Math.max(i.clientWidth, window.innerWidth || 0),
                s = Math.max(i.clientHeight, window.innerHeight || 0),
                r = e ? 0 : v(i),
                a = e ? 0 : v(i, "left");
              return C({
                top: r - n.top + n.marginTop,
                left: a - n.left + n.marginLeft,
                width: o,
                height: s
              })
            }(r, o);
          else {
            var a = void 0;
            "scrollParent" === n ? "BODY" === (a = c(h(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === n ? t.ownerDocument.documentElement : n;
            var d = M(a, r, o);
            if ("HTML" !== a.nodeName || function t(e) {
                var i = e.nodeName;
                return "BODY" !== i && "HTML" !== i && ("fixed" === l(e, "position") || t(h(e)))
              }(r))
              s = d;
            else {
              var u = b(),
                p = u.height,
                f = u.width;
              s.top += d.top - d.marginTop,
                s.bottom = p + d.top,
                s.left += d.left - d.marginLeft,
                s.right = f + d.left
            }
          }
          return s.left += i,
            s.top += i,
            s.right -= i,
            s.bottom -= i,
            s
        }

        function O(t, e, i, n, o) {
          var s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
          if (-1 === t.indexOf("auto"))
            return t;
          var r = D(i, n, s, o),
            a = {
              top: {
                width: r.width,
                height: e.top - r.top
              },
              right: {
                width: r.right - e.right,
                height: r.height
              },
              bottom: {
                width: r.width,
                height: r.bottom - e.bottom
              },
              left: {
                width: e.left - r.left,
                height: r.height
              }
            },
            l = Object.keys(a).map(function (t) {
              return S({
                key: t
              }, a[t], {
                area: (e = a[t],
                  e.width * e.height)
              });
              var e
            }).sort(function (t, e) {
              return e.area - t.area
            }),
            h = l.filter(function (t) {
              var e = t.width,
                n = t.height;
              return e >= i.clientWidth && n >= i.clientHeight
            }),
            c = h.length > 0 ? h[0].key : l[0].key,
            d = t.split("-")[1];
          return c + (d ? "-" + d : "")
        }

        function P(t, e, i) {
          var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
          return M(i, n ? E(e) : m(e, i), n)
        }

        function I(t) {
          var e = getComputedStyle(t),
            i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
          return {
            width: t.offsetWidth + n,
            height: t.offsetHeight + i
          }
        }

        function _(t) {
          var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
          };
          return t.replace(/left|right|bottom|top/g, function (t) {
            return e[t]
          })
        }

        function L(t, e, i) {
          i = i.split("-")[0];
          var n = I(t),
            o = {
              width: n.width,
              height: n.height
            },
            s = -1 !== ["right", "left"].indexOf(i),
            r = s ? "top" : "left",
            a = s ? "left" : "top",
            l = s ? "height" : "width",
            h = s ? "width" : "height";
          return o[r] = e[r] + e[l] / 2 - n[l] / 2,
            o[a] = i === a ? e[a] - n[h] : e[_(a)],
            o
        }

        function N(t, e) {
          return Array.prototype.find ? t.find(e) : t.filter(e)[0]
        }

        function H(t, e, i) {
          return (void 0 === i ? t : t.slice(0, function (t, e, i) {
              if (Array.prototype.findIndex)
                return t.findIndex(function (t) {
                  return t[e] === i
                });
              var n = N(t, function (t) {
                return t[e] === i
              });
              return t.indexOf(n)
            }(t, "name", i))).forEach(function (t) {
              t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
              var i = t.function || t.fn;
              t.enabled && a(i) && (e.offsets.popper = C(e.offsets.popper),
                e.offsets.reference = C(e.offsets.reference),
                e = i(e, t))
            }),
            e
        }

        function R(t, e) {
          return t.some(function (t) {
            var i = t.name;
            return t.enabled && i === e
          })
        }

        function B(t) {
          for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length; n++) {
            var o = e[n],
              s = o ? "" + o + i : t;
            if (void 0 !== document.body.style[s])
              return s
          }
          return null
        }

        function W(t) {
          var e = t.ownerDocument;
          return e ? e.defaultView : window
        }

        function z(t, e, i, n) {
          i.updateBound = n,
            W(t).addEventListener("resize", i.updateBound, {
              passive: !0
            });
          var o = c(t);
          return function t(e, i, n, o) {
              var s = "BODY" === e.nodeName,
                r = s ? e.ownerDocument.defaultView : e;
              r.addEventListener(i, n, {
                  passive: !0
                }),
                s || t(c(r.parentNode), i, n, o),
                o.push(r)
            }(o, "scroll", i.updateBound, i.scrollParents),
            i.scrollElement = o,
            i.eventsEnabled = !0,
            i
        }

        function F() {
          var t, e;
          this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
            this.state = (t = this.reference,
              e = this.state,
              W(t).removeEventListener("resize", e.updateBound),
              e.scrollParents.forEach(function (t) {
                t.removeEventListener("scroll", e.updateBound)
              }),
              e.updateBound = null,
              e.scrollParents = [],
              e.scrollElement = null,
              e.eventsEnabled = !1,
              e))
        }

        function j(t) {
          return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
        }

        function $(t, e) {
          Object.keys(e).forEach(function (i) {
            var n = ""; -
            1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && j(e[i]) && (n = "px"),
              t.style[i] = e[i] + n
          })
        }

        function G(t, e, i) {
          var n = N(t, function (t) {
              return t.name === e
            }),
            o = !!n && t.some(function (t) {
              return t.name === i && t.enabled && t.order < n.order
            });
          if (!o) {
            var s = "`" + e + "`",
              r = "`" + i + "`";
            console.warn(r + " modifier is required by " + s + " modifier in order to work, be sure to include it before " + s + "!")
          }
          return o
        }
        var X = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
          Y = X.slice(3);

        function V(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = Y.indexOf(t),
            n = Y.slice(i + 1).concat(Y.slice(0, i));
          return e ? n.reverse() : n
        }
        var U = {
          FLIP: "flip",
          CLOCKWISE: "clockwise",
          COUNTERCLOCKWISE: "counterclockwise"
        };

        function q(t, e, i, n) {
          var o = [0, 0],
            s = -1 !== ["right", "left"].indexOf(n),
            r = t.split(/(\+|\-)/).map(function (t) {
              return t.trim()
            }),
            a = r.indexOf(N(r, function (t) {
              return -1 !== t.search(/,|\s/)
            }));
          r[a] && -1 === r[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
          var l = /\s*,\s*|\s+/,
            h = -1 !== a ? [r.slice(0, a).concat([r[a].split(l)[0]]), [r[a].split(l)[1]].concat(r.slice(a + 1))] : [r];
          return (h = h.map(function (t, n) {
              var o = (1 === n ? !s : s) ? "height" : "width",
                r = !1;
              return t.reduce(function (t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e,
                  r = !0,
                  t) : r ? (t[t.length - 1] += e,
                  r = !1,
                  t) : t.concat(e)
              }, []).map(function (t) {
                return function (t, e, i, n) {
                  var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                    s = +o[1],
                    r = o[2];
                  if (!s)
                    return t;
                  if (0 === r.indexOf("%")) {
                    var a = void 0;
                    switch (r) {
                      case "%p":
                        a = i;
                        break;
                      case "%":
                      case "%r":
                      default:
                        a = n
                    }
                    return C(a)[e] / 100 * s
                  }
                  if ("vh" === r || "vw" === r)
                    return ("vh" === r ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s;
                  return s
                }(t, o, e, i)
              })
            })).forEach(function (t, e) {
              t.forEach(function (i, n) {
                j(i) && (o[e] += i * ("-" === t[n - 1] ? -1 : 1))
              })
            }),
            o
        }
        var K = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
              shift: {
                order: 100,
                enabled: !0,
                fn: function (t) {
                  var e = t.placement,
                    i = e.split("-")[0],
                    n = e.split("-")[1];
                  if (n) {
                    var o = t.offsets,
                      s = o.reference,
                      r = o.popper,
                      a = -1 !== ["bottom", "top"].indexOf(i),
                      l = a ? "left" : "top",
                      h = a ? "width" : "height",
                      c = {
                        start: T({}, l, s[l]),
                        end: T({}, l, s[l] + s[h] - r[h])
                      };
                    t.offsets.popper = S({}, r, c[n])
                  }
                  return t
                }
              },
              offset: {
                order: 200,
                enabled: !0,
                fn: function (t, e) {
                  var i = e.offset,
                    n = t.placement,
                    o = t.offsets,
                    s = o.popper,
                    r = o.reference,
                    a = n.split("-")[0],
                    l = void 0;
                  return l = j(+i) ? [+i, 0] : q(i, s, r, a),
                    "left" === a ? (s.top += l[0],
                      s.left -= l[1]) : "right" === a ? (s.top += l[0],
                      s.left += l[1]) : "top" === a ? (s.left += l[0],
                      s.top -= l[1]) : "bottom" === a && (s.left += l[0],
                      s.top += l[1]),
                    t.popper = s,
                    t
                },
                offset: 0
              },
              preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function (t, e) {
                  var i = e.boundariesElement || f(t.instance.popper);
                  t.instance.reference === i && (i = f(i));
                  var n = B("transform"),
                    o = t.instance.popper.style,
                    s = o.top,
                    r = o.left,
                    a = o[n];
                  o.top = "",
                    o.left = "",
                    o[n] = "";
                  var l = D(t.instance.popper, t.instance.reference, e.padding, i, t.positionFixed);
                  o.top = s,
                    o.left = r,
                    o[n] = a,
                    e.boundaries = l;
                  var h = e.priority,
                    c = t.offsets.popper,
                    d = {
                      primary: function (t) {
                        var i = c[t];
                        return c[t] < l[t] && !e.escapeWithReference && (i = Math.max(c[t], l[t])),
                          T({}, t, i)
                      },
                      secondary: function (t) {
                        var i = "right" === t ? "left" : "top",
                          n = c[i];
                        return c[t] > l[t] && !e.escapeWithReference && (n = Math.min(c[i], l[t] - ("right" === t ? c.width : c.height))),
                          T({}, i, n)
                      }
                    };
                  return h.forEach(function (t) {
                      var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                      c = S({}, c, d[e](t))
                    }),
                    t.offsets.popper = c,
                    t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
              },
              keepTogether: {
                order: 400,
                enabled: !0,
                fn: function (t) {
                  var e = t.offsets,
                    i = e.popper,
                    n = e.reference,
                    o = t.placement.split("-")[0],
                    s = Math.floor,
                    r = -1 !== ["top", "bottom"].indexOf(o),
                    a = r ? "right" : "bottom",
                    l = r ? "left" : "top",
                    h = r ? "width" : "height";
                  return i[a] < s(n[l]) && (t.offsets.popper[l] = s(n[l]) - i[h]),
                    i[l] > s(n[a]) && (t.offsets.popper[l] = s(n[a])),
                    t
                }
              },
              arrow: {
                order: 500,
                enabled: !0,
                fn: function (t, e) {
                  var i;
                  if (!G(t.instance.modifiers, "arrow", "keepTogether"))
                    return t;
                  var n = e.element;
                  if ("string" == typeof n) {
                    if (!(n = t.instance.popper.querySelector(n)))
                      return t
                  } else if (!t.instance.popper.contains(n))
                    return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                      t;
                  var o = t.placement.split("-")[0],
                    s = t.offsets,
                    r = s.popper,
                    a = s.reference,
                    h = -1 !== ["left", "right"].indexOf(o),
                    c = h ? "height" : "width",
                    d = h ? "Top" : "Left",
                    u = d.toLowerCase(),
                    p = h ? "left" : "top",
                    f = h ? "bottom" : "right",
                    g = I(n)[c];
                  a[f] - g < r[u] && (t.offsets.popper[u] -= r[u] - (a[f] - g)),
                    a[u] + g > r[f] && (t.offsets.popper[u] += a[u] + g - r[f]),
                    t.offsets.popper = C(t.offsets.popper);
                  var m = a[u] + a[c] / 2 - g / 2,
                    v = l(t.instance.popper),
                    y = parseFloat(v["margin" + d], 10),
                    x = parseFloat(v["border" + d + "Width"], 10),
                    b = m - t.offsets.popper[u] - y - x;
                  return b = Math.max(Math.min(r[c] - g, b), 0),
                    t.arrowElement = n,
                    t.offsets.arrow = (T(i = {}, u, Math.round(b)),
                      T(i, p, ""),
                      i),
                    t
                },
                element: "[x-arrow]"
              },
              flip: {
                order: 600,
                enabled: !0,
                fn: function (t, e) {
                  if (R(t.instance.modifiers, "inner"))
                    return t;
                  if (t.flipped && t.placement === t.originalPlacement)
                    return t;
                  var i = D(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement, t.positionFixed),
                    n = t.placement.split("-")[0],
                    o = _(n),
                    s = t.placement.split("-")[1] || "",
                    r = [];
                  switch (e.behavior) {
                    case U.FLIP:
                      r = [n, o];
                      break;
                    case U.CLOCKWISE:
                      r = V(n);
                      break;
                    case U.COUNTERCLOCKWISE:
                      r = V(n, !0);
                      break;
                    default:
                      r = e.behavior
                  }
                  return r.forEach(function (a, l) {
                      if (n !== a || r.length === l + 1)
                        return t;
                      n = t.placement.split("-")[0],
                        o = _(n);
                      var h = t.offsets.popper,
                        c = t.offsets.reference,
                        d = Math.floor,
                        u = "left" === n && d(h.right) > d(c.left) || "right" === n && d(h.left) < d(c.right) || "top" === n && d(h.bottom) > d(c.top) || "bottom" === n && d(h.top) < d(c.bottom),
                        p = d(h.left) < d(i.left),
                        f = d(h.right) > d(i.right),
                        g = d(h.top) < d(i.top),
                        m = d(h.bottom) > d(i.bottom),
                        v = "left" === n && p || "right" === n && f || "top" === n && g || "bottom" === n && m,
                        y = -1 !== ["top", "bottom"].indexOf(n),
                        x = !!e.flipVariations && (y && "start" === s && p || y && "end" === s && f || !y && "start" === s && g || !y && "end" === s && m);
                      (u || v || x) && (t.flipped = !0,
                        (u || v) && (n = r[l + 1]),
                        x && (s = function (t) {
                          return "end" === t ? "start" : "start" === t ? "end" : t
                        }(s)),
                        t.placement = n + (s ? "-" + s : ""),
                        t.offsets.popper = S({}, t.offsets.popper, L(t.instance.popper, t.offsets.reference, t.placement)),
                        t = H(t.instance.modifiers, t, "flip"))
                    }),
                    t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
              },
              inner: {
                order: 700,
                enabled: !1,
                fn: function (t) {
                  var e = t.placement,
                    i = e.split("-")[0],
                    n = t.offsets,
                    o = n.popper,
                    s = n.reference,
                    r = -1 !== ["left", "right"].indexOf(i),
                    a = -1 === ["top", "left"].indexOf(i);
                  return o[r ? "left" : "top"] = s[i] - (a ? o[r ? "width" : "height"] : 0),
                    t.placement = _(e),
                    t.offsets.popper = C(o),
                    t
                }
              },
              hide: {
                order: 800,
                enabled: !0,
                fn: function (t) {
                  if (!G(t.instance.modifiers, "hide", "preventOverflow"))
                    return t;
                  var e = t.offsets.reference,
                    i = N(t.instance.modifiers, function (t) {
                      return "preventOverflow" === t.name
                    }).boundaries;
                  if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                    if (!0 === t.hide)
                      return t;
                    t.hide = !0,
                      t.attributes["x-out-of-boundaries"] = ""
                  } else {
                    if (!1 === t.hide)
                      return t;
                    t.hide = !1,
                      t.attributes["x-out-of-boundaries"] = !1
                  }
                  return t
                }
              },
              computeStyle: {
                order: 850,
                enabled: !0,
                fn: function (t, e) {
                  var i = e.x,
                    n = e.y,
                    o = t.offsets.popper,
                    s = N(t.instance.modifiers, function (t) {
                      return "applyStyle" === t.name
                    }).gpuAcceleration;
                  void 0 !== s && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                  var r = void 0 !== s ? s : e.gpuAcceleration,
                    a = A(f(t.instance.popper)),
                    l = {
                      position: o.position
                    },
                    h = {
                      left: Math.floor(o.left),
                      top: Math.round(o.top),
                      bottom: Math.round(o.bottom),
                      right: Math.floor(o.right)
                    },
                    c = "bottom" === i ? "top" : "bottom",
                    d = "right" === n ? "left" : "right",
                    u = B("transform"),
                    p = void 0,
                    g = void 0;
                  if (g = "bottom" === c ? -a.height + h.bottom : h.top,
                    p = "right" === d ? -a.width + h.right : h.left,
                    r && u)
                    l[u] = "translate3d(" + p + "px, " + g + "px, 0)",
                    l[c] = 0,
                    l[d] = 0,
                    l.willChange = "transform";
                  else {
                    var m = "bottom" === c ? -1 : 1,
                      v = "right" === d ? -1 : 1;
                    l[c] = g * m,
                      l[d] = p * v,
                      l.willChange = c + ", " + d
                  }
                  var y = {
                    "x-placement": t.placement
                  };
                  return t.attributes = S({}, y, t.attributes),
                    t.styles = S({}, l, t.styles),
                    t.arrowStyles = S({}, t.offsets.arrow, t.arrowStyles),
                    t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
              },
              applyStyle: {
                order: 900,
                enabled: !0,
                fn: function (t) {
                  var e, i;
                  return $(t.instance.popper, t.styles),
                    e = t.instance.popper,
                    i = t.attributes,
                    Object.keys(i).forEach(function (t) {
                      !1 !== i[t] ? e.setAttribute(t, i[t]) : e.removeAttribute(t)
                    }),
                    t.arrowElement && Object.keys(t.arrowStyles).length && $(t.arrowElement, t.arrowStyles),
                    t
                },
                onLoad: function (t, e, i, n, o) {
                  var s = P(o, e, t, i.positionFixed),
                    r = O(i.placement, s, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                  return e.setAttribute("x-placement", r),
                    $(e, {
                      position: i.positionFixed ? "fixed" : "absolute"
                    }),
                    i
                },
                gpuAcceleration: void 0
              }
            }
          },
          Z = function () {
            function t(e, i) {
              var n = this,
                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              w(this, t),
                this.scheduleUpdate = function () {
                  return requestAnimationFrame(n.update)
                },
                this.update = r(this.update.bind(this)),
                this.options = S({}, t.Defaults, o),
                this.state = {
                  isDestroyed: !1,
                  isCreated: !1,
                  scrollParents: []
                },
                this.reference = e && e.jquery ? e[0] : e,
                this.popper = i && i.jquery ? i[0] : i,
                this.options.modifiers = {},
                Object.keys(S({}, t.Defaults.modifiers, o.modifiers)).forEach(function (e) {
                  n.options.modifiers[e] = S({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                }),
                this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
                  return S({
                    name: t
                  }, n.options.modifiers[t])
                }).sort(function (t, e) {
                  return t.order - e.order
                }),
                this.modifiers.forEach(function (t) {
                  t.enabled && a(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                }),
                this.update();
              var s = this.options.eventsEnabled;
              s && this.enableEventListeners(),
                this.state.eventsEnabled = s
            }
            return k(t, [{
                key: "update",
                value: function () {
                  return function () {
                      if (!this.state.isDestroyed) {
                        var t = {
                          instance: this,
                          styles: {},
                          arrowStyles: {},
                          attributes: {},
                          flipped: !1,
                          offsets: {}
                        };
                        t.offsets.reference = P(this.state, this.popper, this.reference, this.options.positionFixed),
                          t.placement = O(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                          t.originalPlacement = t.placement,
                          t.positionFixed = this.options.positionFixed,
                          t.offsets.popper = L(this.popper, t.offsets.reference, t.placement),
                          t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute",
                          t = H(this.modifiers, t),
                          this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0,
                            this.options.onCreate(t))
                      }
                    }
                    .call(this)
                }
              }, {
                key: "destroy",
                value: function () {
                  return function () {
                      return this.state.isDestroyed = !0,
                        R(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                          this.popper.style.position = "",
                          this.popper.style.top = "",
                          this.popper.style.left = "",
                          this.popper.style.right = "",
                          this.popper.style.bottom = "",
                          this.popper.style.willChange = "",
                          this.popper.style[B("transform")] = ""),
                        this.disableEventListeners(),
                        this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                        this
                    }
                    .call(this)
                }
              }, {
                key: "enableEventListeners",
                value: function () {
                  return function () {
                      this.state.eventsEnabled || (this.state = z(this.reference, this.options, this.state, this.scheduleUpdate))
                    }
                    .call(this)
                }
              }, {
                key: "disableEventListeners",
                value: function () {
                  return F.call(this)
                }
              }]),
              t
          }();
        Z.Utils = ("undefined" != typeof window ? window : t).PopperUtils,
          Z.placements = X,
          Z.Defaults = K,
          e.default = Z
      }
      .call(this, i(5))
  }, function (t, e, i) {
    /*!
     * Bootstrap v4.1.0 (https://getbootstrap.com/)
     * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */
    ! function (t, e, i) {
      "use strict";

      function n(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
      }

      function o(t, e, i) {
        return e && n(t.prototype, e),
          i && n(t, i),
          t
      }

      function s(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : t[e] = i,
          t
      }

      function r(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {},
            n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function (t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
            }))),
            n.forEach(function (e) {
              s(t, e, i[e])
            })
        }
        return t
      }
      e = e && e.hasOwnProperty("default") ? e.default : e,
        i = i && i.hasOwnProperty("default") ? i.default : i;
      var a = function (t) {
          var e = "transitionend";

          function i(e) {
            var i = this,
              o = !1;
            return t(this).one(n.TRANSITION_END, function () {
                o = !0
              }),
              setTimeout(function () {
                o || n.triggerTransitionEnd(i)
              }, e),
              this
          }
          var n = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function (t) {
              do {
                t += ~~(1e6 * Math.random())
              } while (document.getElementById(t));
              return t
            },
            getSelectorFromElement: function (e) {
              var i = e.getAttribute("data-target");
              i && "#" !== i || (i = e.getAttribute("href") || "");
              try {
                var n = t(document).find(i);
                return n.length > 0 ? i : null
              } catch (t) {
                return null
              }
            },
            getTransitionDurationFromElement: function (e) {
              if (!e)
                return 0;
              var i = t(e).css("transition-duration"),
                n = parseFloat(i);
              return n ? (i = i.split(",")[0],
                1e3 * parseFloat(i)) : 0
            },
            reflow: function (t) {
              return t.offsetHeight
            },
            triggerTransitionEnd: function (i) {
              t(i).trigger(e)
            },
            supportsTransitionEnd: function () {
              return Boolean(e)
            },
            isElement: function (t) {
              return (t[0] || t).nodeType
            },
            typeCheckConfig: function (t, e, i) {
              for (var o in i)
                if (Object.prototype.hasOwnProperty.call(i, o)) {
                  var s = i[o],
                    r = e[o],
                    a = r && n.isElement(r) ? "element" : (l = r, {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
                  if (!new RegExp(s).test(a))
                    throw new Error(t.toUpperCase() + ': Option "' + o + '" provided type "' + a + '" but expected type "' + s + '".')
                }
              var l
            }
          };
          return t.fn.emulateTransitionEnd = i,
            t.event.special[n.TRANSITION_END] = {
              bindType: e,
              delegateType: e,
              handle: function (e) {
                if (t(e.target).is(this))
                  return e.handleObj.handler.apply(this, arguments)
              }
            },
            n
        }(e),
        l = function (t) {
          var e = t.fn.alert,
            i = {
              CLOSE: "close.bs.alert",
              CLOSED: "closed.bs.alert",
              CLICK_DATA_API: "click.bs.alert.data-api"
            },
            n = {
              ALERT: "alert",
              FADE: "fade",
              SHOW: "show"
            },
            s = function () {
              function e(t) {
                this._element = t
              }
              var s = e.prototype;
              return s.close = function (t) {
                  t = t || this._element;
                  var e = this._getRootElement(t),
                    i = this._triggerCloseEvent(e);
                  i.isDefaultPrevented() || this._removeElement(e)
                },
                s.dispose = function () {
                  t.removeData(this._element, "bs.alert"),
                    this._element = null
                },
                s._getRootElement = function (e) {
                  var i = a.getSelectorFromElement(e),
                    o = !1;
                  return i && (o = t(i)[0]),
                    o || (o = t(e).closest("." + n.ALERT)[0]),
                    o
                },
                s._triggerCloseEvent = function (e) {
                  var n = t.Event(i.CLOSE);
                  return t(e).trigger(n),
                    n
                },
                s._removeElement = function (e) {
                  var i = this;
                  if (t(e).removeClass(n.SHOW),
                    t(e).hasClass(n.FADE)) {
                    var o = a.getTransitionDurationFromElement(e);
                    t(e).one(a.TRANSITION_END, function (t) {
                      return i._destroyElement(e, t)
                    }).emulateTransitionEnd(o)
                  } else
                    this._destroyElement(e)
                },
                s._destroyElement = function (e) {
                  t(e).detach().trigger(i.CLOSED).remove()
                },
                e._jQueryInterface = function (i) {
                  return this.each(function () {
                    var n = t(this),
                      o = n.data("bs.alert");
                    o || (o = new e(this),
                        n.data("bs.alert", o)),
                      "close" === i && o[i](this)
                  })
                },
                e._handleDismiss = function (t) {
                  return function (e) {
                    e && e.preventDefault(),
                      t.close(this)
                  }
                },
                o(e, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }]),
                e
            }();
          return t(document).on(i.CLICK_DATA_API, '[data-dismiss="alert"]', s._handleDismiss(new s)),
            t.fn.alert = s._jQueryInterface,
            t.fn.alert.Constructor = s,
            t.fn.alert.noConflict = function () {
              return t.fn.alert = e,
                s._jQueryInterface
            },
            s
        }(e),
        h = function (t) {
          var e = "button",
            i = t.fn[e],
            n = {
              ACTIVE: "active",
              BUTTON: "btn",
              FOCUS: "focus"
            },
            s = {
              DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
              DATA_TOGGLE: '[data-toggle="buttons"]',
              INPUT: "input",
              ACTIVE: ".active",
              BUTTON: ".btn"
            },
            r = {
              CLICK_DATA_API: "click.bs.button.data-api",
              FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
            },
            a = function () {
              function e(t) {
                this._element = t
              }
              var i = e.prototype;
              return i.toggle = function () {
                  var e = !0,
                    i = !0,
                    o = t(this._element).closest(s.DATA_TOGGLE)[0];
                  if (o) {
                    var r = t(this._element).find(s.INPUT)[0];
                    if (r) {
                      if ("radio" === r.type)
                        if (r.checked && t(this._element).hasClass(n.ACTIVE))
                          e = !1;
                        else {
                          var a = t(o).find(s.ACTIVE)[0];
                          a && t(a).removeClass(n.ACTIVE)
                        }
                      if (e) {
                        if (r.hasAttribute("disabled") || o.hasAttribute("disabled") || r.classList.contains("disabled") || o.classList.contains("disabled"))
                          return;
                        r.checked = !t(this._element).hasClass(n.ACTIVE),
                          t(r).trigger("change")
                      }
                      r.focus(),
                        i = !1
                    }
                  }
                  i && this._element.setAttribute("aria-pressed", !t(this._element).hasClass(n.ACTIVE)),
                    e && t(this._element).toggleClass(n.ACTIVE)
                },
                i.dispose = function () {
                  t.removeData(this._element, "bs.button"),
                    this._element = null
                },
                e._jQueryInterface = function (i) {
                  return this.each(function () {
                    var n = t(this).data("bs.button");
                    n || (n = new e(this),
                        t(this).data("bs.button", n)),
                      "toggle" === i && n[i]()
                  })
                },
                o(e, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }]),
                e
            }();
          return t(document).on(r.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function (e) {
              e.preventDefault();
              var i = e.target;
              t(i).hasClass(n.BUTTON) || (i = t(i).closest(s.BUTTON)),
                a._jQueryInterface.call(t(i), "toggle")
            }).on(r.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function (e) {
              var i = t(e.target).closest(s.BUTTON)[0];
              t(i).toggleClass(n.FOCUS, /^focus(in)?$/.test(e.type))
            }),
            t.fn[e] = a._jQueryInterface,
            t.fn[e].Constructor = a,
            t.fn[e].noConflict = function () {
              return t.fn[e] = i,
                a._jQueryInterface
            },
            a
        }(e),
        c = function (t) {
          var e = "carousel",
            i = "bs.carousel",
            n = "." + i,
            s = t.fn[e],
            l = {
              interval: 5e3,
              keyboard: !0,
              slide: !1,
              pause: "hover",
              wrap: !0
            },
            h = {
              interval: "(number|boolean)",
              keyboard: "boolean",
              slide: "(boolean|string)",
              pause: "(string|boolean)",
              wrap: "boolean"
            },
            c = {
              NEXT: "next",
              PREV: "prev",
              LEFT: "left",
              RIGHT: "right"
            },
            d = {
              SLIDE: "slide" + n,
              SLID: "slid" + n,
              KEYDOWN: "keydown" + n,
              MOUSEENTER: "mouseenter" + n,
              MOUSELEAVE: "mouseleave" + n,
              TOUCHEND: "touchend" + n,
              LOAD_DATA_API: "load.bs.carousel.data-api",
              CLICK_DATA_API: "click.bs.carousel.data-api"
            },
            u = {
              CAROUSEL: "carousel",
              ACTIVE: "active",
              SLIDE: "slide",
              RIGHT: "carousel-item-right",
              LEFT: "carousel-item-left",
              NEXT: "carousel-item-next",
              PREV: "carousel-item-prev",
              ITEM: "carousel-item"
            },
            p = {
              ACTIVE: ".active",
              ACTIVE_ITEM: ".active.carousel-item",
              ITEM: ".carousel-item",
              NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
              INDICATORS: ".carousel-indicators",
              DATA_SLIDE: "[data-slide], [data-slide-to]",
              DATA_RIDE: '[data-ride="carousel"]'
            },
            f = function () {
              function s(e, i) {
                this._items = null,
                  this._interval = null,
                  this._activeElement = null,
                  this._isPaused = !1,
                  this._isSliding = !1,
                  this.touchTimeout = null,
                  this._config = this._getConfig(i),
                  this._element = t(e)[0],
                  this._indicatorsElement = t(this._element).find(p.INDICATORS)[0],
                  this._addEventListeners()
              }
              var f = s.prototype;
              return f.next = function () {
                  this._isSliding || this._slide(c.NEXT)
                },
                f.nextWhenVisible = function () {
                  !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                },
                f.prev = function () {
                  this._isSliding || this._slide(c.PREV)
                },
                f.pause = function (e) {
                  e || (this._isPaused = !0),
                    t(this._element).find(p.NEXT_PREV)[0] && (a.triggerTransitionEnd(this._element),
                      this.cycle(!0)),
                    clearInterval(this._interval),
                    this._interval = null
                },
                f.cycle = function (t) {
                  t || (this._isPaused = !1),
                    this._interval && (clearInterval(this._interval),
                      this._interval = null),
                    this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                },
                f.to = function (e) {
                  var i = this;
                  this._activeElement = t(this._element).find(p.ACTIVE_ITEM)[0];
                  var n = this._getItemIndex(this._activeElement);
                  if (!(e > this._items.length - 1 || e < 0))
                    if (this._isSliding)
                      t(this._element).one(d.SLID, function () {
                        return i.to(e)
                      });
                    else {
                      if (n === e)
                        return this.pause(),
                          void this.cycle();
                      var o = e > n ? c.NEXT : c.PREV;
                      this._slide(o, this._items[e])
                    }
                },
                f.dispose = function () {
                  t(this._element).off(n),
                    t.removeData(this._element, i),
                    this._items = null,
                    this._config = null,
                    this._element = null,
                    this._interval = null,
                    this._isPaused = null,
                    this._isSliding = null,
                    this._activeElement = null,
                    this._indicatorsElement = null
                },
                f._getConfig = function (t) {
                  return t = r({}, l, t),
                    a.typeCheckConfig(e, t, h),
                    t
                },
                f._addEventListeners = function () {
                  var e = this;
                  this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
                      return e._keydown(t)
                    }),
                    "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
                        return e.pause(t)
                      }).on(d.MOUSELEAVE, function (t) {
                        return e.cycle(t)
                      }),
                      "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
                        e.pause(),
                          e.touchTimeout && clearTimeout(e.touchTimeout),
                          e.touchTimeout = setTimeout(function (t) {
                            return e.cycle(t)
                          }, 500 + e._config.interval)
                      }))
                },
                f._keydown = function (t) {
                  if (!/input|textarea/i.test(t.target.tagName))
                    switch (t.which) {
                      case 37:
                        t.preventDefault(),
                          this.prev();
                        break;
                      case 39:
                        t.preventDefault(),
                          this.next()
                    }
                },
                f._getItemIndex = function (e) {
                  return this._items = t.makeArray(t(e).parent().find(p.ITEM)),
                    this._items.indexOf(e)
                },
                f._getItemByDirection = function (t, e) {
                  var i = t === c.NEXT,
                    n = t === c.PREV,
                    o = this._getItemIndex(e),
                    s = this._items.length - 1,
                    r = n && 0 === o || i && o === s;
                  if (r && !this._config.wrap)
                    return e;
                  var a = t === c.PREV ? -1 : 1,
                    l = (o + a) % this._items.length;
                  return -1 === l ? this._items[this._items.length - 1] : this._items[l]
                },
                f._triggerSlideEvent = function (e, i) {
                  var n = this._getItemIndex(e),
                    o = this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),
                    s = t.Event(d.SLIDE, {
                      relatedTarget: e,
                      direction: i,
                      from: o,
                      to: n
                    });
                  return t(this._element).trigger(s),
                    s
                },
                f._setActiveIndicatorElement = function (e) {
                  if (this._indicatorsElement) {
                    t(this._indicatorsElement).find(p.ACTIVE).removeClass(u.ACTIVE);
                    var i = this._indicatorsElement.children[this._getItemIndex(e)];
                    i && t(i).addClass(u.ACTIVE)
                  }
                },
                f._slide = function (e, i) {
                  var n, o, s, r = this,
                    l = t(this._element).find(p.ACTIVE_ITEM)[0],
                    h = this._getItemIndex(l),
                    f = i || l && this._getItemByDirection(e, l),
                    g = this._getItemIndex(f),
                    m = Boolean(this._interval);
                  if (e === c.NEXT ? (n = u.LEFT,
                      o = u.NEXT,
                      s = c.LEFT) : (n = u.RIGHT,
                      o = u.PREV,
                      s = c.RIGHT),
                    f && t(f).hasClass(u.ACTIVE))
                    this._isSliding = !1;
                  else {
                    var v = this._triggerSlideEvent(f, s);
                    if (!v.isDefaultPrevented() && l && f) {
                      this._isSliding = !0,
                        m && this.pause(),
                        this._setActiveIndicatorElement(f);
                      var y = t.Event(d.SLID, {
                        relatedTarget: f,
                        direction: s,
                        from: h,
                        to: g
                      });
                      if (t(this._element).hasClass(u.SLIDE)) {
                        t(f).addClass(o),
                          a.reflow(f),
                          t(l).addClass(n),
                          t(f).addClass(n);
                        var x = a.getTransitionDurationFromElement(l);
                        t(l).one(a.TRANSITION_END, function () {
                          t(f).removeClass(n + " " + o).addClass(u.ACTIVE),
                            t(l).removeClass(u.ACTIVE + " " + o + " " + n),
                            r._isSliding = !1,
                            setTimeout(function () {
                              return t(r._element).trigger(y)
                            }, 0)
                        }).emulateTransitionEnd(x)
                      } else
                        t(l).removeClass(u.ACTIVE),
                        t(f).addClass(u.ACTIVE),
                        this._isSliding = !1,
                        t(this._element).trigger(y);
                      m && this.cycle()
                    }
                  }
                },
                s._jQueryInterface = function (e) {
                  return this.each(function () {
                    var n = t(this).data(i),
                      o = r({}, l, t(this).data());
                    "object" == typeof e && (o = r({}, o, e));
                    var a = "string" == typeof e ? e : o.slide;
                    if (n || (n = new s(this, o),
                        t(this).data(i, n)),
                      "number" == typeof e)
                      n.to(e);
                    else if ("string" == typeof a) {
                      if (void 0 === n[a])
                        throw new TypeError('No method named "' + a + '"');
                      n[a]()
                    } else
                      o.interval && (n.pause(),
                        n.cycle())
                  })
                },
                s._dataApiClickHandler = function (e) {
                  var n = a.getSelectorFromElement(this);
                  if (n) {
                    var o = t(n)[0];
                    if (o && t(o).hasClass(u.CAROUSEL)) {
                      var l = r({}, t(o).data(), t(this).data()),
                        h = this.getAttribute("data-slide-to");
                      h && (l.interval = !1),
                        s._jQueryInterface.call(t(o), l),
                        h && t(o).data(i).to(h),
                        e.preventDefault()
                    }
                  }
                },
                o(s, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return l
                  }
                }]),
                s
            }();
          return t(document).on(d.CLICK_DATA_API, p.DATA_SLIDE, f._dataApiClickHandler),
            t(window).on(d.LOAD_DATA_API, function () {
              t(p.DATA_RIDE).each(function () {
                var e = t(this);
                f._jQueryInterface.call(e, e.data())
              })
            }),
            t.fn[e] = f._jQueryInterface,
            t.fn[e].Constructor = f,
            t.fn[e].noConflict = function () {
              return t.fn[e] = s,
                f._jQueryInterface
            },
            f
        }(e),
        d = function (t) {
          var e = "collapse",
            i = "bs.collapse",
            n = t.fn[e],
            s = {
              toggle: !0,
              parent: ""
            },
            l = {
              toggle: "boolean",
              parent: "(string|element)"
            },
            h = {
              SHOW: "show.bs.collapse",
              SHOWN: "shown.bs.collapse",
              HIDE: "hide.bs.collapse",
              HIDDEN: "hidden.bs.collapse",
              CLICK_DATA_API: "click.bs.collapse.data-api"
            },
            c = {
              SHOW: "show",
              COLLAPSE: "collapse",
              COLLAPSING: "collapsing",
              COLLAPSED: "collapsed"
            },
            d = {
              WIDTH: "width",
              HEIGHT: "height"
            },
            u = {
              ACTIVES: ".show, .collapsing",
              DATA_TOGGLE: '[data-toggle="collapse"]'
            },
            p = function () {
              function n(e, i) {
                this._isTransitioning = !1,
                  this._element = e,
                  this._config = this._getConfig(i),
                  this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = t(u.DATA_TOGGLE), o = 0; o < n.length; o++) {
                  var s = n[o],
                    r = a.getSelectorFromElement(s);
                  null !== r && t(r).filter(e).length > 0 && (this._selector = r,
                    this._triggerArray.push(s))
                }
                this._parent = this._config.parent ? this._getParent() : null,
                  this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                  this._config.toggle && this.toggle()
              }
              var p = n.prototype;
              return p.toggle = function () {
                  t(this._element).hasClass(c.SHOW) ? this.hide() : this.show()
                },
                p.show = function () {
                  var e, o, s = this;
                  if (!(this._isTransitioning || t(this._element).hasClass(c.SHOW) || (this._parent && 0 === (e = t.makeArray(t(this._parent).find(u.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null),
                      e && (o = t(e).not(this._selector).data(i)) && o._isTransitioning))) {
                    var r = t.Event(h.SHOW);
                    if (t(this._element).trigger(r),
                      !r.isDefaultPrevented()) {
                      e && (n._jQueryInterface.call(t(e).not(this._selector), "hide"),
                        o || t(e).data(i, null));
                      var l = this._getDimension();
                      t(this._element).removeClass(c.COLLAPSE).addClass(c.COLLAPSING),
                        this._element.style[l] = 0,
                        this._triggerArray.length > 0 && t(this._triggerArray).removeClass(c.COLLAPSED).attr("aria-expanded", !0),
                        this.setTransitioning(!0);
                      var d = l[0].toUpperCase() + l.slice(1),
                        p = "scroll" + d,
                        f = a.getTransitionDurationFromElement(this._element);
                      t(this._element).one(a.TRANSITION_END, function () {
                          t(s._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).addClass(c.SHOW),
                            s._element.style[l] = "",
                            s.setTransitioning(!1),
                            t(s._element).trigger(h.SHOWN)
                        }).emulateTransitionEnd(f),
                        this._element.style[l] = this._element[p] + "px"
                    }
                  }
                },
                p.hide = function () {
                  var e = this;
                  if (!this._isTransitioning && t(this._element).hasClass(c.SHOW)) {
                    var i = t.Event(h.HIDE);
                    if (t(this._element).trigger(i),
                      !i.isDefaultPrevented()) {
                      var n = this._getDimension();
                      if (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px",
                        a.reflow(this._element),
                        t(this._element).addClass(c.COLLAPSING).removeClass(c.COLLAPSE).removeClass(c.SHOW),
                        this._triggerArray.length > 0)
                        for (var o = 0; o < this._triggerArray.length; o++) {
                          var s = this._triggerArray[o],
                            r = a.getSelectorFromElement(s);
                          if (null !== r) {
                            var l = t(r);
                            l.hasClass(c.SHOW) || t(s).addClass(c.COLLAPSED).attr("aria-expanded", !1)
                          }
                        }
                      this.setTransitioning(!0),
                        this._element.style[n] = "";
                      var d = a.getTransitionDurationFromElement(this._element);
                      t(this._element).one(a.TRANSITION_END, function () {
                        e.setTransitioning(!1),
                          t(e._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).trigger(h.HIDDEN)
                      }).emulateTransitionEnd(d)
                    }
                  }
                },
                p.setTransitioning = function (t) {
                  this._isTransitioning = t
                },
                p.dispose = function () {
                  t.removeData(this._element, i),
                    this._config = null,
                    this._parent = null,
                    this._element = null,
                    this._triggerArray = null,
                    this._isTransitioning = null
                },
                p._getConfig = function (t) {
                  return (t = r({}, s, t)).toggle = Boolean(t.toggle),
                    a.typeCheckConfig(e, t, l),
                    t
                },
                p._getDimension = function () {
                  var e = t(this._element).hasClass(d.WIDTH);
                  return e ? d.WIDTH : d.HEIGHT
                },
                p._getParent = function () {
                  var e = this,
                    i = null;
                  a.isElement(this._config.parent) ? (i = this._config.parent,
                    void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = t(this._config.parent)[0];
                  var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                  return t(i).find(o).each(function (t, i) {
                      e._addAriaAndCollapsedClass(n._getTargetFromElement(i), [i])
                    }),
                    i
                },
                p._addAriaAndCollapsedClass = function (e, i) {
                  if (e) {
                    var n = t(e).hasClass(c.SHOW);
                    i.length > 0 && t(i).toggleClass(c.COLLAPSED, !n).attr("aria-expanded", n)
                  }
                },
                n._getTargetFromElement = function (e) {
                  var i = a.getSelectorFromElement(e);
                  return i ? t(i)[0] : null
                },
                n._jQueryInterface = function (e) {
                  return this.each(function () {
                    var o = t(this),
                      a = o.data(i),
                      l = r({}, s, o.data(), "object" == typeof e && e);
                    if (!a && l.toggle && /show|hide/.test(e) && (l.toggle = !1),
                      a || (a = new n(this, l),
                        o.data(i, a)),
                      "string" == typeof e) {
                      if (void 0 === a[e])
                        throw new TypeError('No method named "' + e + '"');
                      a[e]()
                    }
                  })
                },
                o(n, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return s
                  }
                }]),
                n
            }();
          return t(document).on(h.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
              "A" === e.currentTarget.tagName && e.preventDefault();
              var n = t(this),
                o = a.getSelectorFromElement(this);
              t(o).each(function () {
                var e = t(this),
                  o = e.data(i),
                  s = o ? "toggle" : n.data();
                p._jQueryInterface.call(e, s)
              })
            }),
            t.fn[e] = p._jQueryInterface,
            t.fn[e].Constructor = p,
            t.fn[e].noConflict = function () {
              return t.fn[e] = n,
                p._jQueryInterface
            },
            p
        }(e),
        u = function (t) {
          var e = "dropdown",
            n = "bs.dropdown",
            s = "." + n,
            l = t.fn[e],
            h = new RegExp("38|40|27"),
            c = {
              HIDE: "hide" + s,
              HIDDEN: "hidden" + s,
              SHOW: "show" + s,
              SHOWN: "shown" + s,
              CLICK: "click" + s,
              CLICK_DATA_API: "click.bs.dropdown.data-api",
              KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
              KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
            },
            d = {
              DISABLED: "disabled",
              SHOW: "show",
              DROPUP: "dropup",
              DROPRIGHT: "dropright",
              DROPLEFT: "dropleft",
              MENURIGHT: "dropdown-menu-right",
              MENULEFT: "dropdown-menu-left",
              POSITION_STATIC: "position-static"
            },
            u = {
              DATA_TOGGLE: '[data-toggle="dropdown"]',
              FORM_CHILD: ".dropdown form",
              MENU: ".dropdown-menu",
              NAVBAR_NAV: ".navbar-nav",
              VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
            },
            p = {
              TOP: "top-start",
              TOPEND: "top-end",
              BOTTOM: "bottom-start",
              BOTTOMEND: "bottom-end",
              RIGHT: "right-start",
              RIGHTEND: "right-end",
              LEFT: "left-start",
              LEFTEND: "left-end"
            },
            f = {
              offset: 0,
              flip: !0,
              boundary: "scrollParent",
              reference: "toggle",
              display: "dynamic"
            },
            g = {
              offset: "(number|string|function)",
              flip: "boolean",
              boundary: "(string|element)",
              reference: "(string|element)",
              display: "string"
            },
            m = function () {
              function l(t, e) {
                this._element = t,
                  this._popper = null,
                  this._config = this._getConfig(e),
                  this._menu = this._getMenuElement(),
                  this._inNavbar = this._detectNavbar(),
                  this._addEventListeners()
              }
              var m = l.prototype;
              return m.toggle = function () {
                  if (!this._element.disabled && !t(this._element).hasClass(d.DISABLED)) {
                    var e = l._getParentFromElement(this._element),
                      n = t(this._menu).hasClass(d.SHOW);
                    if (l._clearMenus(),
                      !n) {
                      var o = {
                          relatedTarget: this._element
                        },
                        s = t.Event(c.SHOW, o);
                      if (t(e).trigger(s),
                        !s.isDefaultPrevented()) {
                        if (!this._inNavbar) {
                          if (void 0 === i)
                            throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                          var r = this._element;
                          "parent" === this._config.reference ? r = e : a.isElement(this._config.reference) && (r = this._config.reference,
                              void 0 !== this._config.reference.jquery && (r = this._config.reference[0])),
                            "scrollParent" !== this._config.boundary && t(e).addClass(d.POSITION_STATIC),
                            this._popper = new i(r, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === t(e).closest(u.NAVBAR_NAV).length && t(document.body).children().on("mouseover", null, t.noop),
                          this._element.focus(),
                          this._element.setAttribute("aria-expanded", !0),
                          t(this._menu).toggleClass(d.SHOW),
                          t(e).toggleClass(d.SHOW).trigger(t.Event(c.SHOWN, o))
                      }
                    }
                  }
                },
                m.dispose = function () {
                  t.removeData(this._element, n),
                    t(this._element).off(s),
                    this._element = null,
                    this._menu = null,
                    null !== this._popper && (this._popper.destroy(),
                      this._popper = null)
                },
                m.update = function () {
                  this._inNavbar = this._detectNavbar(),
                    null !== this._popper && this._popper.scheduleUpdate()
                },
                m._addEventListeners = function () {
                  var e = this;
                  t(this._element).on(c.CLICK, function (t) {
                    t.preventDefault(),
                      t.stopPropagation(),
                      e.toggle()
                  })
                },
                m._getConfig = function (i) {
                  return i = r({}, this.constructor.Default, t(this._element).data(), i),
                    a.typeCheckConfig(e, i, this.constructor.DefaultType),
                    i
                },
                m._getMenuElement = function () {
                  if (!this._menu) {
                    var e = l._getParentFromElement(this._element);
                    this._menu = t(e).find(u.MENU)[0]
                  }
                  return this._menu
                },
                m._getPlacement = function () {
                  var e = t(this._element).parent(),
                    i = p.BOTTOM;
                  return e.hasClass(d.DROPUP) ? (i = p.TOP,
                      t(this._menu).hasClass(d.MENURIGHT) && (i = p.TOPEND)) : e.hasClass(d.DROPRIGHT) ? i = p.RIGHT : e.hasClass(d.DROPLEFT) ? i = p.LEFT : t(this._menu).hasClass(d.MENURIGHT) && (i = p.BOTTOMEND),
                    i
                },
                m._detectNavbar = function () {
                  return t(this._element).closest(".navbar").length > 0
                },
                m._getPopperConfig = function () {
                  var t = this,
                    e = {};
                  "function" == typeof this._config.offset ? e.fn = function (e) {
                      return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}),
                        e
                    } :
                    e.offset = this._config.offset;
                  var i = {
                    placement: this._getPlacement(),
                    modifiers: {
                      offset: e,
                      flip: {
                        enabled: this._config.flip
                      },
                      preventOverflow: {
                        boundariesElement: this._config.boundary
                      }
                    }
                  };
                  return "static" === this._config.display && (i.modifiers.applyStyle = {
                      enabled: !1
                    }),
                    i
                },
                l._jQueryInterface = function (e) {
                  return this.each(function () {
                    var i = t(this).data(n),
                      o = "object" == typeof e ? e : null;
                    if (i || (i = new l(this, o),
                        t(this).data(n, i)),
                      "string" == typeof e) {
                      if (void 0 === i[e])
                        throw new TypeError('No method named "' + e + '"');
                      i[e]()
                    }
                  })
                },
                l._clearMenus = function (e) {
                  if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                    for (var i = t.makeArray(t(u.DATA_TOGGLE)), o = 0; o < i.length; o++) {
                      var s = l._getParentFromElement(i[o]),
                        r = t(i[o]).data(n),
                        a = {
                          relatedTarget: i[o]
                        };
                      if (r) {
                        var h = r._menu;
                        if (t(s).hasClass(d.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(s, e.target))) {
                          var p = t.Event(c.HIDE, a);
                          t(s).trigger(p),
                            p.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop),
                              i[o].setAttribute("aria-expanded", "false"),
                              t(h).removeClass(d.SHOW),
                              t(s).removeClass(d.SHOW).trigger(t.Event(c.HIDDEN, a)))
                        }
                      }
                    }
                },
                l._getParentFromElement = function (e) {
                  var i, n = a.getSelectorFromElement(e);
                  return n && (i = t(n)[0]),
                    i || e.parentNode
                },
                l._dataApiKeydownHandler = function (e) {
                  if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(u.MENU).length)) : h.test(e.which)) && (e.preventDefault(),
                      e.stopPropagation(),
                      !this.disabled && !t(this).hasClass(d.DISABLED))) {
                    var i = l._getParentFromElement(this),
                      n = t(i).hasClass(d.SHOW);
                    if ((n || 27 === e.which && 32 === e.which) && (!n || 27 !== e.which && 32 !== e.which)) {
                      var o = t(i).find(u.VISIBLE_ITEMS).get();
                      if (0 !== o.length) {
                        var s = o.indexOf(e.target);
                        38 === e.which && s > 0 && s--,
                          40 === e.which && s < o.length - 1 && s++,
                          s < 0 && (s = 0),
                          o[s].focus()
                      }
                    } else {
                      if (27 === e.which) {
                        var r = t(i).find(u.DATA_TOGGLE)[0];
                        t(r).trigger("focus")
                      }
                      t(this).trigger("click")
                    }
                  }
                },
                o(l, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return f
                  }
                }, {
                  key: "DefaultType",
                  get: function () {
                    return g
                  }
                }]),
                l
            }();
          return t(document).on(c.KEYDOWN_DATA_API, u.DATA_TOGGLE, m._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, u.MENU, m._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, m._clearMenus).on(c.CLICK_DATA_API, u.DATA_TOGGLE, function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                m._jQueryInterface.call(t(this), "toggle")
            }).on(c.CLICK_DATA_API, u.FORM_CHILD, function (t) {
              t.stopPropagation()
            }),
            t.fn[e] = m._jQueryInterface,
            t.fn[e].Constructor = m,
            t.fn[e].noConflict = function () {
              return t.fn[e] = l,
                m._jQueryInterface
            },
            m
        }(e),
        p = function (t) {
          var e = "modal",
            i = ".bs.modal",
            n = t.fn.modal,
            s = {
              backdrop: !0,
              keyboard: !0,
              focus: !0,
              show: !0
            },
            l = {
              backdrop: "(boolean|string)",
              keyboard: "boolean",
              focus: "boolean",
              show: "boolean"
            },
            h = {
              HIDE: "hide.bs.modal",
              HIDDEN: "hidden.bs.modal",
              SHOW: "show.bs.modal",
              SHOWN: "shown.bs.modal",
              FOCUSIN: "focusin.bs.modal",
              RESIZE: "resize.bs.modal",
              CLICK_DISMISS: "click.dismiss.bs.modal",
              KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
              MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
              MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
              CLICK_DATA_API: "click.bs.modal.data-api"
            },
            c = {
              SCROLLBAR_MEASURER: "modal-scrollbar-measure",
              BACKDROP: "modal-backdrop",
              OPEN: "modal-open",
              FADE: "fade",
              SHOW: "show"
            },
            d = {
              DIALOG: ".modal-dialog",
              DATA_TOGGLE: '[data-toggle="modal"]',
              DATA_DISMISS: '[data-dismiss="modal"]',
              FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
              STICKY_CONTENT: ".sticky-top",
              NAVBAR_TOGGLER: ".navbar-toggler"
            },
            u = function () {
              function n(e, i) {
                this._config = this._getConfig(i),
                  this._element = e,
                  this._dialog = t(e).find(d.DIALOG)[0],
                  this._backdrop = null,
                  this._isShown = !1,
                  this._isBodyOverflowing = !1,
                  this._ignoreBackdropClick = !1,
                  this._scrollbarWidth = 0
              }
              var u = n.prototype;
              return u.toggle = function (t) {
                  return this._isShown ? this.hide() : this.show(t)
                },
                u.show = function (e) {
                  var i = this;
                  if (!this._isTransitioning && !this._isShown) {
                    t(this._element).hasClass(c.FADE) && (this._isTransitioning = !0);
                    var n = t.Event(h.SHOW, {
                      relatedTarget: e
                    });
                    t(this._element).trigger(n),
                      this._isShown || n.isDefaultPrevented() || (this._isShown = !0,
                        this._checkScrollbar(),
                        this._setScrollbar(),
                        this._adjustDialog(),
                        t(document.body).addClass(c.OPEN),
                        this._setEscapeEvent(),
                        this._setResizeEvent(),
                        t(this._element).on(h.CLICK_DISMISS, d.DATA_DISMISS, function (t) {
                          return i.hide(t)
                        }),
                        t(this._dialog).on(h.MOUSEDOWN_DISMISS, function () {
                          t(i._element).one(h.MOUSEUP_DISMISS, function (e) {
                            t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                          })
                        }),
                        this._showBackdrop(function () {
                          return i._showElement(e)
                        }))
                  }
                },
                u.hide = function (e) {
                  var i = this;
                  if (e && e.preventDefault(),
                    !this._isTransitioning && this._isShown) {
                    var n = t.Event(h.HIDE);
                    if (t(this._element).trigger(n),
                      this._isShown && !n.isDefaultPrevented()) {
                      this._isShown = !1;
                      var o = t(this._element).hasClass(c.FADE);
                      if (o && (this._isTransitioning = !0),
                        this._setEscapeEvent(),
                        this._setResizeEvent(),
                        t(document).off(h.FOCUSIN),
                        t(this._element).removeClass(c.SHOW),
                        t(this._element).off(h.CLICK_DISMISS),
                        t(this._dialog).off(h.MOUSEDOWN_DISMISS),
                        o) {
                        var s = a.getTransitionDurationFromElement(this._element);
                        t(this._element).one(a.TRANSITION_END, function (t) {
                          return i._hideModal(t)
                        }).emulateTransitionEnd(s)
                      } else
                        this._hideModal()
                    }
                  }
                },
                u.dispose = function () {
                  t.removeData(this._element, "bs.modal"),
                    t(window, document, this._element, this._backdrop).off(i),
                    this._config = null,
                    this._element = null,
                    this._dialog = null,
                    this._backdrop = null,
                    this._isShown = null,
                    this._isBodyOverflowing = null,
                    this._ignoreBackdropClick = null,
                    this._scrollbarWidth = null
                },
                u.handleUpdate = function () {
                  this._adjustDialog()
                },
                u._getConfig = function (t) {
                  return t = r({}, s, t),
                    a.typeCheckConfig(e, t, l),
                    t
                },
                u._showElement = function (e) {
                  var i = this,
                    n = t(this._element).hasClass(c.FADE);
                  this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element),
                    this._element.style.display = "block",
                    this._element.removeAttribute("aria-hidden"),
                    this._element.scrollTop = 0,
                    n && a.reflow(this._element),
                    t(this._element).addClass(c.SHOW),
                    this._config.focus && this._enforceFocus();
                  var o = t.Event(h.SHOWN, {
                      relatedTarget: e
                    }),
                    s = function () {
                      i._config.focus && i._element.focus(),
                        i._isTransitioning = !1,
                        t(i._element).trigger(o)
                    };
                  if (n) {
                    var r = a.getTransitionDurationFromElement(this._element);
                    t(this._dialog).one(a.TRANSITION_END, s).emulateTransitionEnd(r)
                  } else
                    s()
                },
                u._enforceFocus = function () {
                  var e = this;
                  t(document).off(h.FOCUSIN).on(h.FOCUSIN, function (i) {
                    document !== i.target && e._element !== i.target && 0 === t(e._element).has(i.target).length && e._element.focus()
                  })
                },
                u._setEscapeEvent = function () {
                  var e = this;
                  this._isShown && this._config.keyboard ? t(this._element).on(h.KEYDOWN_DISMISS, function (t) {
                    27 === t.which && (t.preventDefault(),
                      e.hide())
                  }) : this._isShown || t(this._element).off(h.KEYDOWN_DISMISS)
                },
                u._setResizeEvent = function () {
                  var e = this;
                  this._isShown ? t(window).on(h.RESIZE, function (t) {
                    return e.handleUpdate(t)
                  }) : t(window).off(h.RESIZE)
                },
                u._hideModal = function () {
                  var e = this;
                  this._element.style.display = "none",
                    this._element.setAttribute("aria-hidden", !0),
                    this._isTransitioning = !1,
                    this._showBackdrop(function () {
                      t(document.body).removeClass(c.OPEN),
                        e._resetAdjustments(),
                        e._resetScrollbar(),
                        t(e._element).trigger(h.HIDDEN)
                    })
                },
                u._removeBackdrop = function () {
                  this._backdrop && (t(this._backdrop).remove(),
                    this._backdrop = null)
                },
                u._showBackdrop = function (e) {
                  var i = this,
                    n = t(this._element).hasClass(c.FADE) ? c.FADE : "";
                  if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"),
                      this._backdrop.className = c.BACKDROP,
                      n && t(this._backdrop).addClass(n),
                      t(this._backdrop).appendTo(document.body),
                      t(this._element).on(h.CLICK_DISMISS, function (t) {
                        i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                      }),
                      n && a.reflow(this._backdrop),
                      t(this._backdrop).addClass(c.SHOW),
                      !e)
                      return;
                    if (!n)
                      return void e();
                    var o = a.getTransitionDurationFromElement(this._backdrop);
                    t(this._backdrop).one(a.TRANSITION_END, e).emulateTransitionEnd(o)
                  } else if (!this._isShown && this._backdrop) {
                    t(this._backdrop).removeClass(c.SHOW);
                    var s = function () {
                      i._removeBackdrop(),
                        e && e()
                    };
                    if (t(this._element).hasClass(c.FADE)) {
                      var r = a.getTransitionDurationFromElement(this._backdrop);
                      t(this._backdrop).one(a.TRANSITION_END, s).emulateTransitionEnd(r)
                    } else
                      s()
                  } else
                    e && e()
                },
                u._adjustDialog = function () {
                  var t = this._element.scrollHeight > document.documentElement.clientHeight;
                  !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                    this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                },
                u._resetAdjustments = function () {
                  this._element.style.paddingLeft = "",
                    this._element.style.paddingRight = ""
                },
                u._checkScrollbar = function () {
                  var t = document.body.getBoundingClientRect();
                  this._isBodyOverflowing = t.left + t.right < window.innerWidth,
                    this._scrollbarWidth = this._getScrollbarWidth()
                },
                u._setScrollbar = function () {
                  var e = this;
                  if (this._isBodyOverflowing) {
                    t(d.FIXED_CONTENT).each(function (i, n) {
                        var o = t(n)[0].style.paddingRight,
                          s = t(n).css("padding-right");
                        t(n).data("padding-right", o).css("padding-right", parseFloat(s) + e._scrollbarWidth + "px")
                      }),
                      t(d.STICKY_CONTENT).each(function (i, n) {
                        var o = t(n)[0].style.marginRight,
                          s = t(n).css("margin-right");
                        t(n).data("margin-right", o).css("margin-right", parseFloat(s) - e._scrollbarWidth + "px")
                      }),
                      t(d.NAVBAR_TOGGLER).each(function (i, n) {
                        var o = t(n)[0].style.marginRight,
                          s = t(n).css("margin-right");
                        t(n).data("margin-right", o).css("margin-right", parseFloat(s) + e._scrollbarWidth + "px")
                      });
                    var i = document.body.style.paddingRight,
                      n = t(document.body).css("padding-right");
                    t(document.body).data("padding-right", i).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")
                  }
                },
                u._resetScrollbar = function () {
                  t(d.FIXED_CONTENT).each(function (e, i) {
                      var n = t(i).data("padding-right");
                      void 0 !== n && t(i).css("padding-right", n).removeData("padding-right")
                    }),
                    t(d.STICKY_CONTENT + ", " + d.NAVBAR_TOGGLER).each(function (e, i) {
                      var n = t(i).data("margin-right");
                      void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
                    });
                  var e = t(document.body).data("padding-right");
                  void 0 !== e && t(document.body).css("padding-right", e).removeData("padding-right")
                },
                u._getScrollbarWidth = function () {
                  var t = document.createElement("div");
                  t.className = c.SCROLLBAR_MEASURER,
                    document.body.appendChild(t);
                  var e = t.getBoundingClientRect().width - t.clientWidth;
                  return document.body.removeChild(t),
                    e
                },
                n._jQueryInterface = function (e, i) {
                  return this.each(function () {
                    var o = t(this).data("bs.modal"),
                      s = r({}, n.Default, t(this).data(), "object" == typeof e && e);
                    if (o || (o = new n(this, s),
                        t(this).data("bs.modal", o)),
                      "string" == typeof e) {
                      if (void 0 === o[e])
                        throw new TypeError('No method named "' + e + '"');
                      o[e](i)
                    } else
                      s.show && o.show(i)
                  })
                },
                o(n, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return s
                  }
                }]),
                n
            }();
          return t(document).on(h.CLICK_DATA_API, d.DATA_TOGGLE, function (e) {
              var i, n = this,
                o = a.getSelectorFromElement(this);
              o && (i = t(o)[0]);
              var s = t(i).data("bs.modal") ? "toggle" : r({}, t(i).data(), t(this).data());
              "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
              var l = t(i).one(h.SHOW, function (e) {
                e.isDefaultPrevented() || l.one(h.HIDDEN, function () {
                  t(n).is(":visible") && n.focus()
                })
              });
              u._jQueryInterface.call(t(i), s, this)
            }),
            t.fn.modal = u._jQueryInterface,
            t.fn.modal.Constructor = u,
            t.fn.modal.noConflict = function () {
              return t.fn.modal = n,
                u._jQueryInterface
            },
            u
        }(e),
        f = function (t) {
          var e = "tooltip",
            n = ".bs.tooltip",
            s = t.fn[e],
            l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
            h = {
              animation: "boolean",
              template: "string",
              title: "(string|element|function)",
              trigger: "string",
              delay: "(number|object)",
              html: "boolean",
              selector: "(string|boolean)",
              placement: "(string|function)",
              offset: "(number|string)",
              container: "(string|element|boolean)",
              fallbackPlacement: "(string|array)",
              boundary: "(string|element)"
            },
            c = {
              AUTO: "auto",
              TOP: "top",
              RIGHT: "right",
              BOTTOM: "bottom",
              LEFT: "left"
            },
            d = {
              animation: !0,
              template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
              trigger: "hover focus",
              title: "",
              delay: 0,
              html: !1,
              selector: !1,
              placement: "top",
              offset: 0,
              container: !1,
              fallbackPlacement: "flip",
              boundary: "scrollParent"
            },
            u = {
              SHOW: "show",
              OUT: "out"
            },
            p = {
              HIDE: "hide" + n,
              HIDDEN: "hidden" + n,
              SHOW: "show" + n,
              SHOWN: "shown" + n,
              INSERTED: "inserted" + n,
              CLICK: "click" + n,
              FOCUSIN: "focusin" + n,
              FOCUSOUT: "focusout" + n,
              MOUSEENTER: "mouseenter" + n,
              MOUSELEAVE: "mouseleave" + n
            },
            f = {
              FADE: "fade",
              SHOW: "show"
            },
            g = {
              TOOLTIP: ".tooltip",
              TOOLTIP_INNER: ".tooltip-inner",
              ARROW: ".arrow"
            },
            m = {
              HOVER: "hover",
              FOCUS: "focus",
              CLICK: "click",
              MANUAL: "manual"
            },
            v = function () {
              function s(t, e) {
                if (void 0 === i)
                  throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0,
                  this._timeout = 0,
                  this._hoverState = "",
                  this._activeTrigger = {},
                  this._popper = null,
                  this.element = t,
                  this.config = this._getConfig(e),
                  this.tip = null,
                  this._setListeners()
              }
              var v = s.prototype;
              return v.enable = function () {
                  this._isEnabled = !0
                },
                v.disable = function () {
                  this._isEnabled = !1
                },
                v.toggleEnabled = function () {
                  this._isEnabled = !this._isEnabled
                },
                v.toggle = function (e) {
                  if (this._isEnabled)
                    if (e) {
                      var i = this.constructor.DATA_KEY,
                        n = t(e.currentTarget).data(i);
                      n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()),
                          t(e.currentTarget).data(i, n)),
                        n._activeTrigger.click = !n._activeTrigger.click,
                        n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                      if (t(this.getTipElement()).hasClass(f.SHOW))
                        return void this._leave(null, this);
                      this._enter(null, this)
                    }
                },
                v.dispose = function () {
                  clearTimeout(this._timeout),
                    t.removeData(this.element, this.constructor.DATA_KEY),
                    t(this.element).off(this.constructor.EVENT_KEY),
                    t(this.element).closest(".modal").off("hide.bs.modal"),
                    this.tip && t(this.tip).remove(),
                    this._isEnabled = null,
                    this._timeout = null,
                    this._hoverState = null,
                    this._activeTrigger = null,
                    null !== this._popper && this._popper.destroy(),
                    this._popper = null,
                    this.element = null,
                    this.config = null,
                    this.tip = null
                },
                v.show = function () {
                  var e = this;
                  if ("none" === t(this.element).css("display"))
                    throw new Error("Please use show on visible elements");
                  var n = t.Event(this.constructor.Event.SHOW);
                  if (this.isWithContent() && this._isEnabled) {
                    t(this.element).trigger(n);
                    var o = t.contains(this.element.ownerDocument.documentElement, this.element);
                    if (n.isDefaultPrevented() || !o)
                      return;
                    var s = this.getTipElement(),
                      r = a.getUID(this.constructor.NAME);
                    s.setAttribute("id", r),
                      this.element.setAttribute("aria-describedby", r),
                      this.setContent(),
                      this.config.animation && t(s).addClass(f.FADE);
                    var l = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                      h = this._getAttachment(l);
                    this.addAttachmentClass(h);
                    var c = !1 === this.config.container ? document.body : t(this.config.container);
                    t(s).data(this.constructor.DATA_KEY, this),
                      t.contains(this.element.ownerDocument.documentElement, this.tip) || t(s).appendTo(c),
                      t(this.element).trigger(this.constructor.Event.INSERTED),
                      this._popper = new i(this.element, s, {
                        placement: h,
                        modifiers: {
                          offset: {
                            offset: this.config.offset
                          },
                          flip: {
                            behavior: this.config.fallbackPlacement
                          },
                          arrow: {
                            element: g.ARROW
                          },
                          preventOverflow: {
                            boundariesElement: this.config.boundary
                          }
                        },
                        onCreate: function (t) {
                          t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function (t) {
                          e._handlePopperPlacementChange(t)
                        }
                      }),
                      t(s).addClass(f.SHOW),
                      "ontouchstart" in document.documentElement && t(document.body).children().on("mouseover", null, t.noop);
                    var d = function () {
                      e.config.animation && e._fixTransition();
                      var i = e._hoverState;
                      e._hoverState = null,
                        t(e.element).trigger(e.constructor.Event.SHOWN),
                        i === u.OUT && e._leave(null, e)
                    };
                    if (t(this.tip).hasClass(f.FADE)) {
                      var p = a.getTransitionDurationFromElement(this.tip);
                      t(this.tip).one(a.TRANSITION_END, d).emulateTransitionEnd(p)
                    } else
                      d()
                  }
                },
                v.hide = function (e) {
                  var i = this,
                    n = this.getTipElement(),
                    o = t.Event(this.constructor.Event.HIDE),
                    s = function () {
                      i._hoverState !== u.SHOW && n.parentNode && n.parentNode.removeChild(n),
                        i._cleanTipClass(),
                        i.element.removeAttribute("aria-describedby"),
                        t(i.element).trigger(i.constructor.Event.HIDDEN),
                        null !== i._popper && i._popper.destroy(),
                        e && e()
                    };
                  if (t(this.element).trigger(o),
                    !o.isDefaultPrevented()) {
                    if (t(n).removeClass(f.SHOW),
                      "ontouchstart" in document.documentElement && t(document.body).children().off("mouseover", null, t.noop),
                      this._activeTrigger[m.CLICK] = !1,
                      this._activeTrigger[m.FOCUS] = !1,
                      this._activeTrigger[m.HOVER] = !1,
                      t(this.tip).hasClass(f.FADE)) {
                      var r = a.getTransitionDurationFromElement(n);
                      t(n).one(a.TRANSITION_END, s).emulateTransitionEnd(r)
                    } else
                      s();
                    this._hoverState = ""
                  }
                },
                v.update = function () {
                  null !== this._popper && this._popper.scheduleUpdate()
                },
                v.isWithContent = function () {
                  return Boolean(this.getTitle())
                },
                v.addAttachmentClass = function (e) {
                  t(this.getTipElement()).addClass("bs-tooltip-" + e)
                },
                v.getTipElement = function () {
                  return this.tip = this.tip || t(this.config.template)[0],
                    this.tip
                },
                v.setContent = function () {
                  var e = t(this.getTipElement());
                  this.setElementContent(e.find(g.TOOLTIP_INNER), this.getTitle()),
                    e.removeClass(f.FADE + " " + f.SHOW)
                },
                v.setElementContent = function (e, i) {
                  var n = this.config.html;
                  "object" == typeof i && (i.nodeType || i.jquery) ? n ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text()) : e[n ? "html" : "text"](i)
                },
                v.getTitle = function () {
                  var t = this.element.getAttribute("data-original-title");
                  return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title),
                    t
                },
                v._getAttachment = function (t) {
                  return c[t.toUpperCase()]
                },
                v._setListeners = function () {
                  var e = this,
                    i = this.config.trigger.split(" ");
                  i.forEach(function (i) {
                      if ("click" === i)
                        t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
                          return e.toggle(t)
                        });
                      else if (i !== m.MANUAL) {
                        var n = i === m.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                          o = i === m.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                        t(e.element).on(n, e.config.selector, function (t) {
                          return e._enter(t)
                        }).on(o, e.config.selector, function (t) {
                          return e._leave(t)
                        })
                      }
                      t(e.element).closest(".modal").on("hide.bs.modal", function () {
                        return e.hide()
                      })
                    }),
                    this.config.selector ? this.config = r({}, this.config, {
                      trigger: "manual",
                      selector: ""
                    }) : this._fixTitle()
                },
                v._fixTitle = function () {
                  var t = typeof this.element.getAttribute("data-original-title");
                  (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""),
                    this.element.setAttribute("title", ""))
                },
                v._enter = function (e, i) {
                  var n = this.constructor.DATA_KEY;
                  (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()),
                    t(e.currentTarget).data(n, i)),
                  e && (i._activeTrigger["focusin" === e.type ? m.FOCUS : m.HOVER] = !0),
                    t(i.getTipElement()).hasClass(f.SHOW) || i._hoverState === u.SHOW ? i._hoverState = u.SHOW : (clearTimeout(i._timeout),
                      i._hoverState = u.SHOW,
                      i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function () {
                        i._hoverState === u.SHOW && i.show()
                      }, i.config.delay.show) : i.show())
                },
                v._leave = function (e, i) {
                  var n = this.constructor.DATA_KEY;
                  (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()),
                    t(e.currentTarget).data(n, i)),
                  e && (i._activeTrigger["focusout" === e.type ? m.FOCUS : m.HOVER] = !1),
                    i._isWithActiveTrigger() || (clearTimeout(i._timeout),
                      i._hoverState = u.OUT,
                      i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function () {
                        i._hoverState === u.OUT && i.hide()
                      }, i.config.delay.hide) : i.hide())
                },
                v._isWithActiveTrigger = function () {
                  for (var t in this._activeTrigger)
                    if (this._activeTrigger[t])
                      return !0;
                  return !1
                },
                v._getConfig = function (i) {
                  return "number" == typeof (i = r({}, this.constructor.Default, t(this.element).data(), i)).delay && (i.delay = {
                      show: i.delay,
                      hide: i.delay
                    }),
                    "number" == typeof i.title && (i.title = i.title.toString()),
                    "number" == typeof i.content && (i.content = i.content.toString()),
                    a.typeCheckConfig(e, i, this.constructor.DefaultType),
                    i
                },
                v._getDelegateConfig = function () {
                  var t = {};
                  if (this.config)
                    for (var e in this.config)
                      this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                  return t
                },
                v._cleanTipClass = function () {
                  var e = t(this.getTipElement()),
                    i = e.attr("class").match(l);
                  null !== i && i.length > 0 && e.removeClass(i.join(""))
                },
                v._handlePopperPlacementChange = function (t) {
                  this._cleanTipClass(),
                    this.addAttachmentClass(this._getAttachment(t.placement))
                },
                v._fixTransition = function () {
                  var e = this.getTipElement(),
                    i = this.config.animation;
                  null === e.getAttribute("x-placement") && (t(e).removeClass(f.FADE),
                    this.config.animation = !1,
                    this.hide(),
                    this.show(),
                    this.config.animation = i)
                },
                s._jQueryInterface = function (e) {
                  return this.each(function () {
                    var i = t(this).data("bs.tooltip"),
                      n = "object" == typeof e && e;
                    if ((i || !/dispose|hide/.test(e)) && (i || (i = new s(this, n),
                          t(this).data("bs.tooltip", i)),
                        "string" == typeof e)) {
                      if (void 0 === i[e])
                        throw new TypeError('No method named "' + e + '"');
                      i[e]()
                    }
                  })
                },
                o(s, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return d
                  }
                }, {
                  key: "NAME",
                  get: function () {
                    return e
                  }
                }, {
                  key: "DATA_KEY",
                  get: function () {
                    return "bs.tooltip"
                  }
                }, {
                  key: "Event",
                  get: function () {
                    return p
                  }
                }, {
                  key: "EVENT_KEY",
                  get: function () {
                    return n
                  }
                }, {
                  key: "DefaultType",
                  get: function () {
                    return h
                  }
                }]),
                s
            }();
          return t.fn[e] = v._jQueryInterface,
            t.fn[e].Constructor = v,
            t.fn[e].noConflict = function () {
              return t.fn[e] = s,
                v._jQueryInterface
            },
            v
        }(e),
        g = function (t) {
          var e = "popover",
            i = ".bs.popover",
            n = t.fn[e],
            s = new RegExp("(^|\\s)bs-popover\\S+", "g"),
            a = r({}, f.Default, {
              placement: "right",
              trigger: "click",
              content: "",
              template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            }),
            l = r({}, f.DefaultType, {
              content: "(string|element|function)"
            }),
            h = {
              FADE: "fade",
              SHOW: "show"
            },
            c = {
              TITLE: ".popover-header",
              CONTENT: ".popover-body"
            },
            d = {
              HIDE: "hide" + i,
              HIDDEN: "hidden" + i,
              SHOW: "show" + i,
              SHOWN: "shown" + i,
              INSERTED: "inserted" + i,
              CLICK: "click" + i,
              FOCUSIN: "focusin" + i,
              FOCUSOUT: "focusout" + i,
              MOUSEENTER: "mouseenter" + i,
              MOUSELEAVE: "mouseleave" + i
            },
            u = function (n) {
              var r, u;

              function p() {
                return n.apply(this, arguments) || this
              }
              u = n,
                (r = p).prototype = Object.create(u.prototype),
                r.prototype.constructor = r,
                r.__proto__ = u;
              var f = p.prototype;
              return f.isWithContent = function () {
                  return this.getTitle() || this._getContent()
                },
                f.addAttachmentClass = function (e) {
                  t(this.getTipElement()).addClass("bs-popover-" + e)
                },
                f.getTipElement = function () {
                  return this.tip = this.tip || t(this.config.template)[0],
                    this.tip
                },
                f.setContent = function () {
                  var e = t(this.getTipElement());
                  this.setElementContent(e.find(c.TITLE), this.getTitle());
                  var i = this._getContent();
                  "function" == typeof i && (i = i.call(this.element)),
                    this.setElementContent(e.find(c.CONTENT), i),
                    e.removeClass(h.FADE + " " + h.SHOW)
                },
                f._getContent = function () {
                  return this.element.getAttribute("data-content") || this.config.content
                },
                f._cleanTipClass = function () {
                  var e = t(this.getTipElement()),
                    i = e.attr("class").match(s);
                  null !== i && i.length > 0 && e.removeClass(i.join(""))
                },
                p._jQueryInterface = function (e) {
                  return this.each(function () {
                    var i = t(this).data("bs.popover"),
                      n = "object" == typeof e ? e : null;
                    if ((i || !/destroy|hide/.test(e)) && (i || (i = new p(this, n),
                          t(this).data("bs.popover", i)),
                        "string" == typeof e)) {
                      if (void 0 === i[e])
                        throw new TypeError('No method named "' + e + '"');
                      i[e]()
                    }
                  })
                },
                o(p, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return a
                  }
                }, {
                  key: "NAME",
                  get: function () {
                    return e
                  }
                }, {
                  key: "DATA_KEY",
                  get: function () {
                    return "bs.popover"
                  }
                }, {
                  key: "Event",
                  get: function () {
                    return d
                  }
                }, {
                  key: "EVENT_KEY",
                  get: function () {
                    return i
                  }
                }, {
                  key: "DefaultType",
                  get: function () {
                    return l
                  }
                }]),
                p
            }(f);
          return t.fn[e] = u._jQueryInterface,
            t.fn[e].Constructor = u,
            t.fn[e].noConflict = function () {
              return t.fn[e] = n,
                u._jQueryInterface
            },
            u
        }(e),
        m = function (t) {
          var e = "scrollspy",
            i = t.fn[e],
            n = {
              offset: 10,
              method: "auto",
              target: ""
            },
            s = {
              offset: "number",
              method: "string",
              target: "(string|element)"
            },
            l = {
              ACTIVATE: "activate.bs.scrollspy",
              SCROLL: "scroll.bs.scrollspy",
              LOAD_DATA_API: "load.bs.scrollspy.data-api"
            },
            h = {
              DROPDOWN_ITEM: "dropdown-item",
              DROPDOWN_MENU: "dropdown-menu",
              ACTIVE: "active"
            },
            c = {
              DATA_SPY: '[data-spy="scroll"]',
              ACTIVE: ".active",
              NAV_LIST_GROUP: ".nav, .list-group",
              NAV_LINKS: ".nav-link",
              NAV_ITEMS: ".nav-item",
              LIST_ITEMS: ".list-group-item",
              DROPDOWN: ".dropdown",
              DROPDOWN_ITEMS: ".dropdown-item",
              DROPDOWN_TOGGLE: ".dropdown-toggle"
            },
            d = {
              OFFSET: "offset",
              POSITION: "position"
            },
            u = function () {
              function i(e, i) {
                var n = this;
                this._element = e,
                  this._scrollElement = "BODY" === e.tagName ? window : e,
                  this._config = this._getConfig(i),
                  this._selector = this._config.target + " " + c.NAV_LINKS + "," + this._config.target + " " + c.LIST_ITEMS + "," + this._config.target + " " + c.DROPDOWN_ITEMS,
                  this._offsets = [],
                  this._targets = [],
                  this._activeTarget = null,
                  this._scrollHeight = 0,
                  t(this._scrollElement).on(l.SCROLL, function (t) {
                    return n._process(t)
                  }),
                  this.refresh(),
                  this._process()
              }
              var u = i.prototype;
              return u.refresh = function () {
                  var e = this,
                    i = this._scrollElement === this._scrollElement.window ? d.OFFSET : d.POSITION,
                    n = "auto" === this._config.method ? i : this._config.method,
                    o = n === d.POSITION ? this._getScrollTop() : 0;
                  this._offsets = [],
                    this._targets = [],
                    this._scrollHeight = this._getScrollHeight();
                  var s = t.makeArray(t(this._selector));
                  s.map(function (e) {
                    var i, s = a.getSelectorFromElement(e);
                    if (s && (i = t(s)[0]),
                      i) {
                      var r = i.getBoundingClientRect();
                      if (r.width || r.height)
                        return [t(i)[n]().top + o, s]
                    }
                    return null
                  }).filter(function (t) {
                    return t
                  }).sort(function (t, e) {
                    return t[0] - e[0]
                  }).forEach(function (t) {
                    e._offsets.push(t[0]),
                      e._targets.push(t[1])
                  })
                },
                u.dispose = function () {
                  t.removeData(this._element, "bs.scrollspy"),
                    t(this._scrollElement).off(".bs.scrollspy"),
                    this._element = null,
                    this._scrollElement = null,
                    this._config = null,
                    this._selector = null,
                    this._offsets = null,
                    this._targets = null,
                    this._activeTarget = null,
                    this._scrollHeight = null
                },
                u._getConfig = function (i) {
                  if ("string" != typeof (i = r({}, n, i)).target) {
                    var o = t(i.target).attr("id");
                    o || (o = a.getUID(e),
                        t(i.target).attr("id", o)),
                      i.target = "#" + o
                  }
                  return a.typeCheckConfig(e, i, s),
                    i
                },
                u._getScrollTop = function () {
                  return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                },
                u._getScrollHeight = function () {
                  return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                },
                u._getOffsetHeight = function () {
                  return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                },
                u._process = function () {
                  var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    i = this._config.offset + e - this._getOffsetHeight();
                  if (this._scrollHeight !== e && this.refresh(),
                    t >= i) {
                    var n = this._targets[this._targets.length - 1];
                    this._activeTarget !== n && this._activate(n)
                  } else {
                    if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
                      return this._activeTarget = null,
                        void this._clear();
                    for (var o = this._offsets.length; o--;) {
                      var s = this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]);
                      s && this._activate(this._targets[o])
                    }
                  }
                },
                u._activate = function (e) {
                  this._activeTarget = e,
                    this._clear();
                  var i = this._selector.split(",");
                  i = i.map(function (t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                  });
                  var n = t(i.join(","));
                  n.hasClass(h.DROPDOWN_ITEM) ? (n.closest(c.DROPDOWN).find(c.DROPDOWN_TOGGLE).addClass(h.ACTIVE),
                      n.addClass(h.ACTIVE)) : (n.addClass(h.ACTIVE),
                      n.parents(c.NAV_LIST_GROUP).prev(c.NAV_LINKS + ", " + c.LIST_ITEMS).addClass(h.ACTIVE),
                      n.parents(c.NAV_LIST_GROUP).prev(c.NAV_ITEMS).children(c.NAV_LINKS).addClass(h.ACTIVE)),
                    t(this._scrollElement).trigger(l.ACTIVATE, {
                      relatedTarget: e
                    })
                },
                u._clear = function () {
                  t(this._selector).filter(c.ACTIVE).removeClass(h.ACTIVE)
                },
                i._jQueryInterface = function (e) {
                  return this.each(function () {
                    var n = t(this).data("bs.scrollspy"),
                      o = "object" == typeof e && e;
                    if (n || (n = new i(this, o),
                        t(this).data("bs.scrollspy", n)),
                      "string" == typeof e) {
                      if (void 0 === n[e])
                        throw new TypeError('No method named "' + e + '"');
                      n[e]()
                    }
                  })
                },
                o(i, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }, {
                  key: "Default",
                  get: function () {
                    return n
                  }
                }]),
                i
            }();
          return t(window).on(l.LOAD_DATA_API, function () {
              for (var e = t.makeArray(t(c.DATA_SPY)), i = e.length; i--;) {
                var n = t(e[i]);
                u._jQueryInterface.call(n, n.data())
              }
            }),
            t.fn[e] = u._jQueryInterface,
            t.fn[e].Constructor = u,
            t.fn[e].noConflict = function () {
              return t.fn[e] = i,
                u._jQueryInterface
            },
            u
        }(e),
        v = function (t) {
          var e = t.fn.tab,
            i = {
              HIDE: "hide.bs.tab",
              HIDDEN: "hidden.bs.tab",
              SHOW: "show.bs.tab",
              SHOWN: "shown.bs.tab",
              CLICK_DATA_API: "click.bs.tab.data-api"
            },
            n = {
              DROPDOWN_MENU: "dropdown-menu",
              ACTIVE: "active",
              DISABLED: "disabled",
              FADE: "fade",
              SHOW: "show"
            },
            s = {
              DROPDOWN: ".dropdown",
              NAV_LIST_GROUP: ".nav, .list-group",
              ACTIVE: ".active",
              ACTIVE_UL: "> li > .active",
              DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
              DROPDOWN_TOGGLE: ".dropdown-toggle",
              DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
            },
            r = function () {
              function e(t) {
                this._element = t
              }
              var r = e.prototype;
              return r.show = function () {
                  var e = this;
                  if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(n.ACTIVE) || t(this._element).hasClass(n.DISABLED))) {
                    var o, r, l = t(this._element).closest(s.NAV_LIST_GROUP)[0],
                      h = a.getSelectorFromElement(this._element);
                    if (l) {
                      var c = "UL" === l.nodeName ? s.ACTIVE_UL : s.ACTIVE;
                      r = (r = t.makeArray(t(l).find(c)))[r.length - 1]
                    }
                    var d = t.Event(i.HIDE, {
                        relatedTarget: this._element
                      }),
                      u = t.Event(i.SHOW, {
                        relatedTarget: r
                      });
                    if (r && t(r).trigger(d),
                      t(this._element).trigger(u),
                      !u.isDefaultPrevented() && !d.isDefaultPrevented()) {
                      h && (o = t(h)[0]),
                        this._activate(this._element, l);
                      var p = function () {
                        var n = t.Event(i.HIDDEN, {
                            relatedTarget: e._element
                          }),
                          o = t.Event(i.SHOWN, {
                            relatedTarget: r
                          });
                        t(r).trigger(n),
                          t(e._element).trigger(o)
                      };
                      o ? this._activate(o, o.parentNode, p) : p()
                    }
                  }
                },
                r.dispose = function () {
                  t.removeData(this._element, "bs.tab"),
                    this._element = null
                },
                r._activate = function (e, i, o) {
                  var r = this,
                    l = ("UL" === i.nodeName ? t(i).find(s.ACTIVE_UL) : t(i).children(s.ACTIVE))[0],
                    h = o && l && t(l).hasClass(n.FADE),
                    c = function () {
                      return r._transitionComplete(e, l, o)
                    };
                  if (l && h) {
                    var d = a.getTransitionDurationFromElement(l);
                    t(l).one(a.TRANSITION_END, c).emulateTransitionEnd(d)
                  } else
                    c()
                },
                r._transitionComplete = function (e, i, o) {
                  if (i) {
                    t(i).removeClass(n.SHOW + " " + n.ACTIVE);
                    var r = t(i.parentNode).find(s.DROPDOWN_ACTIVE_CHILD)[0];
                    r && t(r).removeClass(n.ACTIVE),
                      "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
                  }
                  if (t(e).addClass(n.ACTIVE),
                    "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0),
                    a.reflow(e),
                    t(e).addClass(n.SHOW),
                    e.parentNode && t(e.parentNode).hasClass(n.DROPDOWN_MENU)) {
                    var l = t(e).closest(s.DROPDOWN)[0];
                    l && t(l).find(s.DROPDOWN_TOGGLE).addClass(n.ACTIVE),
                      e.setAttribute("aria-expanded", !0)
                  }
                  o && o()
                },
                e._jQueryInterface = function (i) {
                  return this.each(function () {
                    var n = t(this),
                      o = n.data("bs.tab");
                    if (o || (o = new e(this),
                        n.data("bs.tab", o)),
                      "string" == typeof i) {
                      if (void 0 === o[i])
                        throw new TypeError('No method named "' + i + '"');
                      o[i]()
                    }
                  })
                },
                o(e, null, [{
                  key: "VERSION",
                  get: function () {
                    return "4.1.0"
                  }
                }]),
                e
            }();
          return t(document).on(i.CLICK_DATA_API, s.DATA_TOGGLE, function (e) {
              e.preventDefault(),
                r._jQueryInterface.call(t(this), "show")
            }),
            t.fn.tab = r._jQueryInterface,
            t.fn.tab.Constructor = r,
            t.fn.tab.noConflict = function () {
              return t.fn.tab = e,
                r._jQueryInterface
            },
            r
        }(e);
      (function (t) {
        if (void 0 === t)
          throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4)
          throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
      })(e),
      t.Util = a,
        t.Alert = l,
        t.Button = h,
        t.Carousel = c,
        t.Collapse = d,
        t.Dropdown = u,
        t.Modal = p,
        t.Popover = g,
        t.Scrollspy = m,
        t.Tab = v,
        t.Tooltip = f,
        Object.defineProperty(t, "__esModule", {
          value: !0
        })
    }(e, i(0), i(6))
  }, function (t, e, i) {
    (function (t) {
      var e;
      (e = t).fn.marquee = function (t) {
          return this.each(function () {
            var i, n, o = e.extend({}, e.fn.marquee.defaults, t),
              s = e(this),
              r = 3,
              a = "animation-play-state",
              l = !1,
              h = function (t, e, i) {
                for (var n = ["webkit", "moz", "MS", "o", ""], o = 0; o < n.length; o++)
                  n[o] || (e = e.toLowerCase()),
                  t.addEventListener(n[o] + e, i, !1)
              },
              c = {
                pause: function () {
                  l && o.allowCss3Support ? i.css(a, "paused") : e.fn.pause && i.pause(),
                    s.data("runningStatus", "paused"),
                    s.trigger("paused")
                },
                resume: function () {
                  l && o.allowCss3Support ? i.css(a, "running") : e.fn.resume && i.resume(),
                    s.data("runningStatus", "resumed"),
                    s.trigger("resumed")
                },
                toggle: function () {
                  c["resumed" == s.data("runningStatus") ? "pause" : "resume"]()
                },
                destroy: function () {
                  clearTimeout(s.timer),
                    s.find("*").addBack().unbind(),
                    s.html(s.find(".js-marquee:first").html())
                }
              };
            if ("string" == typeof t)
              e.isFunction(c[t]) && (i || (i = s.find(".js-marquee-wrapper")),
                !0 === s.data("css3AnimationIsSupported") && (l = !0),
                c[t]());
            else {
              var d;
              e.each(o, function (t, e) {
                  if (void 0 !== (d = s.attr("data-" + t))) {
                    switch (d) {
                      case "true":
                        d = !0;
                        break;
                      case "false":
                        d = !1
                    }
                    o[t] = d
                  }
                }),
                o.speed && (o.duration = parseInt(s.width(), 10) / o.speed * 1e3);
              var u = "up" == o.direction || "down" == o.direction;
              o.gap = o.duplicated ? parseInt(o.gap) : 0,
                s.wrapInner('<div class="js-marquee"></div>');
              var p = s.find(".js-marquee").css({
                "margin-right": o.gap,
                float: "left"
              });
              if (o.duplicated && p.clone(!0).appendTo(s),
                s.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),
                i = s.find(".js-marquee-wrapper"),
                u) {
                var f = s.height();
                i.removeAttr("style"),
                  s.height(f),
                  s.find(".js-marquee").css({
                    float: "none",
                    "margin-bottom": o.gap,
                    "margin-right": 0
                  }),
                  o.duplicated && s.find(".js-marquee:last").css({
                    "margin-bottom": 0
                  });
                var g = s.find(".js-marquee:first").height() + o.gap;
                o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(g, 10) + parseInt(f, 10)) / parseInt(f, 10) * o.duration,
                  o.duration *= parseInt(g, 10) / parseInt(f, 10)) : o.duration *= (parseInt(g, 10) + parseInt(f, 10)) / parseInt(f, 10)
              } else {
                var m = s.find(".js-marquee:first").width() + o.gap,
                  v = s.width();
                o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(m, 10) + parseInt(v, 10)) / parseInt(v, 10) * o.duration,
                  o.duration *= parseInt(m, 10) / parseInt(v, 10)) : o.duration *= (parseInt(m, 10) + parseInt(v, 10)) / parseInt(v, 10)
              }
              if (o.duplicated && (o.duration /= 2),
                o.allowCss3Support) {
                p = document.body || document.createElement("div");
                var y = "marqueeAnimation-" + Math.floor(1e7 * Math.random()),
                  x = ["Webkit", "Moz", "O", "ms", "Khtml"],
                  b = "animation",
                  w = "",
                  k = "";
                if (p.style.animation && (k = "@keyframes " + y + " ",
                    l = !0),
                  !1 === l)
                  for (var T = 0; T < x.length; T++)
                    if (void 0 !== p.style[x[T] + "AnimationName"]) {
                      p = "-" + x[T].toLowerCase() + "-",
                        b = p + b,
                        a = p + a,
                        k = "@" + p + "keyframes " + y + " ",
                        l = !0;
                      break
                    }
                l && (w = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing,
                  s.data("css3AnimationIsSupported", !0))
              }
              var S = function () {
                  i.css("transform", "translateY(" + ("up" == o.direction ? f + "px" : "-" + g + "px") + ")")
                },
                C = function () {
                  i.css("transform", "translateX(" + ("left" == o.direction ? v + "px" : "-" + m + "px") + ")")
                };
              o.duplicated ? (u ? o.startVisible ? i.css("transform", "translateY(0)") : i.css("transform", "translateY(" + ("up" == o.direction ? f + "px" : "-" + (2 * g - o.gap) + "px") + ")") : o.startVisible ? i.css("transform", "translateX(0)") : i.css("transform", "translateX(" + ("left" == o.direction ? v + "px" : "-" + (2 * m - o.gap) + "px") + ")"),
                o.startVisible || (r = 1)) : o.startVisible ? r = 2 : u ? S() : C();
              var A = function () {
                if (o.duplicated && (1 === r ? (o._originalDuration = o.duration,
                    o.duration = u ? "up" == o.direction ? o.duration + f / (g / o.duration) : 2 * o.duration : "left" == o.direction ? o.duration + v / (m / o.duration) : 2 * o.duration,
                    w && (w = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    r++) : 2 === r && (o.duration = o._originalDuration,
                    w && (y += "0",
                      k = e.trim(k) + "0 ",
                      w = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    r++)),
                  u ? o.duplicated ? (2 < r && i.css("transform", "translateY(" + ("up" == o.direction ? 0 : "-" + g + "px") + ")"),
                    n = {
                      transform: "translateY(" + ("up" == o.direction ? "-" + g + "px" : 0) + ")"
                    }) : o.startVisible ? 2 === r ? (w && (w = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                      transform: "translateY(" + ("up" == o.direction ? "-" + g + "px" : f + "px") + ")"
                    },
                    r++) : 3 === r && (o.duration = o._completeDuration,
                    w && (y += "0",
                      k = e.trim(k) + "0 ",
                      w = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    S()) : (S(),
                    n = {
                      transform: "translateY(" + ("up" == o.direction ? "-" + i.height() + "px" : f + "px") + ")"
                    }) : o.duplicated ? (2 < r && i.css("transform", "translateX(" + ("left" == o.direction ? 0 : "-" + m + "px") + ")"),
                    n = {
                      transform: "translateX(" + ("left" == o.direction ? "-" + m + "px" : 0) + ")"
                    }) : o.startVisible ? 2 === r ? (w && (w = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                      transform: "translateX(" + ("left" == o.direction ? "-" + m + "px" : v + "px") + ")"
                    },
                    r++) : 3 === r && (o.duration = o._completeDuration,
                    w && (y += "0",
                      k = e.trim(k) + "0 ",
                      w = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    C()) : (C(),
                    n = {
                      transform: "translateX(" + ("left" == o.direction ? "-" + m + "px" : v + "px") + ")"
                    }),
                  s.trigger("beforeStarting"),
                  l) {
                  i.css(b, w);
                  var t = k + " { 100%  " + function (t) {
                      var e, i = [];
                      for (e in t)
                        t.hasOwnProperty(e) && i.push(e + ":" + t[e]);
                      return i.push(),
                        "{" + i.join(",") + "}"
                    }(n) + "}",
                    a = i.find("style");
                  0 !== a.length ? a.filter(":last").html(t) : e("head").append("<style>" + t + "</style>"),
                    h(i[0], "AnimationIteration", function () {
                      s.trigger("finished")
                    }),
                    h(i[0], "AnimationEnd", function () {
                      A(),
                        s.trigger("finished")
                    })
                } else
                  i.animate(n, o.duration, o.easing, function () {
                    s.trigger("finished"),
                      o.pauseOnCycle ? s.timer = setTimeout(A, o.delayBeforeStart) : A()
                  });
                s.data("runningStatus", "resumed")
              };
              s.bind("pause", c.pause),
                s.bind("resume", c.resume),
                o.pauseOnHover && (s.bind("mouseenter", c.pause),
                  s.bind("mouseleave", c.resume)),
                l && o.allowCss3Support ? A() : s.timer = setTimeout(A, o.delayBeforeStart)
            }
          })
        },
        e.fn.marquee.defaults = {
          allowCss3Support: !0,
          css3easing: "linear",
          easing: "linear",
          delayBeforeStart: 1e3,
          direction: "left",
          duplicated: !1,
          duration: 5e3,
          gap: 20,
          pauseOnCycle: !1,
          pauseOnHover: !1,
          startVisible: !1
        }
    }).call(this, i(0))
  }]
]);