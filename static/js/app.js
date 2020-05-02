function debounce(e, t, n) {
    var i;
    return function() {
        var o = this,
            r = arguments,
            s = function() {
                i = null, n || e.apply(o, r)
            },
            a = n && !i;
        clearTimeout(i), i = setTimeout(s, t), a && e.apply(o, r)
    }
}! function(e, t) {
    function n(e) {
        var t = e.length,
            n = de.type(e);
        return de.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e) {
        var t = Se[e] = {};
        return de.each(e.match(pe) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function o(e, n, i, o) {
        if (de.acceptData(e)) {
            var r, s, a = de.expando,
                l = e.nodeType,
                c = l ? de.cache : e,
                d = l ? e[a] : e[a] && a;
            if (d && c[d] && (o || c[d].data) || i !== t || "string" != typeof n) return d || (d = l ? e[a] = te.pop() || de.guid++ : a), c[d] || (c[d] = l ? {} : {
                toJSON: de.noop
            }), ("object" == typeof n || "function" == typeof n) && (o ? c[d] = de.extend(c[d], n) : c[d].data = de.extend(c[d].data, n)), s = c[d], o || (s.data || (s.data = {}), s = s.data), i !== t && (s[de.camelCase(n)] = i), "string" == typeof n ? (r = s[n], null == r && (r = s[de.camelCase(n)])) : r = s, r
        }
    }

    function r(e, t, n) {
        if (de.acceptData(e)) {
            var i, o, r = e.nodeType,
                s = r ? de.cache : e,
                l = r ? e[de.expando] : de.expando;
            if (s[l]) {
                if (t && (i = n ? s[l] : s[l].data)) {
                    de.isArray(t) ? t = t.concat(de.map(t, de.camelCase)) : t in i ? t = [t] : (t = de.camelCase(t), t = t in i ? [t] : t.split(" ")), o = t.length;
                    for (; o--;) delete i[t[o]];
                    if (n ? !a(i) : !de.isEmptyObject(i)) return
                }(n || (delete s[l].data, a(s[l]))) && (r ? de.cleanData([e], !0) : de.support.deleteExpando || s != s.window ? delete s[l] : s[l] = null)
            }
        }
    }

    function s(e, n, i) {
        if (i === t && 1 === e.nodeType) {
            var o = "data-" + n.replace(Ee, "-$1").toLowerCase();
            if (i = e.getAttribute(o), "string" == typeof i) {
                try {
                    i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : $e.test(i) ? de.parseJSON(i) : i
                } catch (r) {}
                de.data(e, n, i)
            } else i = t
        }
        return i
    }

    function a(e) {
        var t;
        for (t in e)
            if (("data" !== t || !de.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function d() {
        try {
            return V.activeElement
        } catch (e) {}
    }

    function u(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function p(e, t, n) {
        if (de.isFunction(t)) return de.grep(e, function(e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType) return de.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (We.test(t)) return de.filter(t, e, n);
            t = de.filter(t, e)
        }
        return de.grep(e, function(e) {
            return de.inArray(e, t) >= 0 !== n
        })
    }

    function f(e) {
        var t = Xe.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;) n.createElement(t.pop());
        return n
    }

    function h(e, t) {
        return de.nodeName(e, "table") && de.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function m(e) {
        return e.type = (null !== de.find.attr(e, "type")) + "/" + e.type, e
    }

    function g(e) {
        var t = ot.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function v(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) de._data(n, "globalEval", !t || de._data(t[i], "globalEval"))
    }

    function y(e, t) {
        if (1 === t.nodeType && de.hasData(e)) {
            var n, i, o, r = de._data(e),
                s = de._data(t, r),
                a = r.events;
            if (a) {
                delete s.handle, s.events = {};
                for (n in a)
                    for (i = 0, o = a[n].length; o > i; i++) de.event.add(t, n, a[n][i])
            }
            s.data && (s.data = de.extend({}, s.data))
        }
    }

    function b(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !de.support.noCloneEvent && t[de.expando]) {
                o = de._data(t);
                for (i in o.events) de.removeEvent(t, i, o.handle);
                t.removeAttribute(de.expando)
            }
            "script" === n && t.text !== e.text ? (m(t).text = e.text, g(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), de.support.html5Clone && e.innerHTML && !de.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function w(e, n) {
        var i, o, r = 0,
            s = typeof e.getElementsByTagName !== U ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== U ? e.querySelectorAll(n || "*") : t;
        if (!s)
            for (s = [], i = e.childNodes || e; null != (o = i[r]); r++) !n || de.nodeName(o, n) ? s.push(o) : de.merge(s, w(o, n));
        return n === t || n && de.nodeName(e, n) ? de.merge([e], s) : s
    }

    function k(e) {
        tt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function x(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = Ct.length; o--;)
            if (t = Ct[o] + n, t in e) return t;
        return i
    }

    function T(e, t) {
        return e = t || e, "none" === de.css(e, "display") || !de.contains(e.ownerDocument, e)
    }

    function C(e, t) {
        for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i = e[s], i.style && (r[s] = de._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && T(i) && (r[s] = de._data(i, "olddisplay", O(i.nodeName)))) : r[s] || (o = T(i), (n && "none" !== n || !o) && de._data(i, "olddisplay", o ? n : de.css(i, "display"))));
        for (s = 0; a > s; s++) i = e[s], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
        return e
    }

    function S(e, t, n) {
        var i = vt.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }

    function $(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += de.css(e, n + Tt[r], !0, o)), i ? ("content" === n && (s -= de.css(e, "padding" + Tt[r], !0, o)), "margin" !== n && (s -= de.css(e, "border" + Tt[r] + "Width", !0, o))) : (s += de.css(e, "padding" + Tt[r], !0, o), "padding" !== n && (s += de.css(e, "border" + Tt[r] + "Width", !0, o)));
        return s
    }

    function E(e, t, n) {
        var i = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            r = dt(e),
            s = de.support.boxSizing && "border-box" === de.css(e, "boxSizing", !1, r);
        if (0 >= o || null == o) {
            if (o = ut(e, t, r), (0 > o || null == o) && (o = e.style[t]), yt.test(o)) return o;
            i = s && (de.support.boxSizingReliable || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + $(e, t, n || (s ? "border" : "content"), i, r) + "px"
    }

    function O(e) {
        var t = V,
            n = wt[e];
        return n || (n = A(e, t), "none" !== n && n || (ct = (ct || de("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (ct[0].contentWindow || ct[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = A(e, t), ct.detach()), wt[e] = n), n
    }

    function A(e, t) {
        var n = de(t.createElement(e)).appendTo(t.body),
            i = de.css(n[0], "display");
        return n.remove(), i
    }

    function N(e, t, n, i) {
        var o;
        if (de.isArray(t)) de.each(t, function(t, o) {
            n || $t.test(e) ? i(e, o) : N(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i)
        });
        else if (n || "object" !== de.type(t)) i(e, t);
        else
            for (o in t) N(e + "[" + o + "]", t[o], n, i)
    }

    function D(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
                r = t.toLowerCase().match(pe) || [];
            if (de.isFunction(n))
                for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function P(e, n, i, o) {
        function r(l) {
            var c;
            return s[l] = !0, de.each(e[l] || [], function(e, l) {
                var d = l(n, i, o);
                return "string" != typeof d || a || s[d] ? a ? !(c = d) : t : (n.dataTypes.unshift(d), r(d), !1)
            }), c
        }
        var s = {},
            a = e === Bt;
        return r(n.dataTypes[0]) || !s["*"] && r("*")
    }

    function M(e, n) {
        var i, o, r = de.ajaxSettings.flatOptions || {};
        for (o in n) n[o] !== t && ((r[o] ? e : i || (i = {}))[o] = n[o]);
        return i && de.extend(!0, e, i), e
    }

    function j(e, n, i) {
        for (var o, r, s, a, l = e.contents, c = e.dataTypes;
            "*" === c[0];) c.shift(), r === t && (r = e.mimeType || n.getResponseHeader("Content-Type"));
        if (r)
            for (a in l)
                if (l[a] && l[a].test(r)) {
                    c.unshift(a);
                    break
                }
        if (c[0] in i) s = c[0];
        else {
            for (a in i) {
                if (!c[0] || e.converters[a + " " + c[0]]) {
                    s = a;
                    break
                }
                o || (o = a)
            }
            s = s || o
        }
        return s ? (s !== c[0] && c.unshift(s), i[s]) : t
    }

    function H(e, t, n, i) {
        var o, r, s, a, l, c = {},
            d = e.dataTypes.slice();
        if (d[1])
            for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
        for (r = d.shift(); r;)
            if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
            if (s = c[l + " " + r] || c["* " + r], !s)
                for (o in c)
                    if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                        s === !0 ? s = c[o] : c[o] !== !0 && (r = a[0], d.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (u) {
                    return {
                        state: "parsererror",
                        error: s ? u : "No conversion from " + l + " to " + r
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function L() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function I() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function _() {
        return setTimeout(function() {
            Kt = t
        }), Kt = de.now()
    }

    function F(e, t, n) {
        for (var i, o = (rn[t] || []).concat(rn["*"]), r = 0, s = o.length; s > r; r++)
            if (i = o[r].call(n, t, e)) return i
    }

    function z(e, t, n) {
        var i, o, r = 0,
            s = on.length,
            a = de.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var t = Kt || _(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
                return a.notifyWith(e, [c, r, n]), 1 > r && l ? n : (a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: de.extend({}, t),
                opts: de.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Kt || _(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var i = de.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i > n; n++) c.tweens[n].run(1);
                    return t ? a.resolveWith(e, [c, t]) : a.rejectWith(e, [c, t]), this
                }
            }),
            d = c.props;
        for (q(d, c.opts.specialEasing); s > r; r++)
            if (i = on[r].call(c, e, d, c.opts)) return i;
        return de.map(d, F, c), de.isFunction(c.opts.start) && c.opts.start.call(e, c), de.fx.timer(de.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function q(e, t) {
        var n, i, o, r, s;
        for (n in e)
            if (i = de.camelCase(n), o = t[i], r = e[n], de.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), s = de.cssHooks[i], s && "expand" in s) {
                r = s.expand(r), delete e[i];
                for (n in r) n in e || (e[n] = r[n], t[n] = o)
            } else t[i] = o
    }

    function W(e, t, n) {
        var i, o, r, s, a, l, c = this,
            d = {},
            u = e.style,
            p = e.nodeType && T(e),
            f = de._data(e, "fxshow");
        n.queue || (a = de._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, c.always(function() {
            c.always(function() {
                a.unqueued--, de.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [u.overflow, u.overflowX, u.overflowY], "inline" === de.css(e, "display") && "none" === de.css(e, "float") && (de.support.inlineBlockNeedsLayout && "inline" !== O(e.nodeName) ? u.zoom = 1 : u.display = "inline-block")), n.overflow && (u.overflow = "hidden", de.support.shrinkWrapBlocks || c.always(function() {
            u.overflow = n.overflow[0], u.overflowX = n.overflow[1], u.overflowY = n.overflow[2]
        }));
        for (i in t)
            if (o = t[i], en.exec(o)) {
                if (delete t[i], r = r || "toggle" === o, o === (p ? "hide" : "show")) continue;
                d[i] = f && f[i] || de.style(e, i)
            }
        if (!de.isEmptyObject(d)) {
            f ? "hidden" in f && (p = f.hidden) : f = de._data(e, "fxshow", {}), r && (f.hidden = !p), p ? de(e).show() : c.done(function() {
                de(e).hide()
            }), c.done(function() {
                var t;
                de._removeData(e, "fxshow");
                for (t in d) de.style(e, t, d[t])
            });
            for (i in d) s = F(p ? f[i] : 0, i, c), i in f || (f[i] = s.start, p && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function B(e, t, n, i, o) {
        return new B.prototype.init(e, t, n, i, o)
    }

    function R(e, t) {
        var n, i = {
                height: e
            },
            o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = Tt[o], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function G(e) {
        return de.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var X, Y, U = typeof t,
        J = e.location,
        V = e.document,
        Q = V.documentElement,
        K = e.jQuery,
        Z = e.$,
        ee = {},
        te = [],
        ne = "1.10.1",
        ie = te.concat,
        oe = te.push,
        re = te.slice,
        se = te.indexOf,
        ae = ee.toString,
        le = ee.hasOwnProperty,
        ce = ne.trim,
        de = function(e, t) {
            return new de.fn.init(e, t, Y)
        },
        ue = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        pe = /\S+/g,
        fe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        me = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ge = /^[\],:{}\s]*$/,
        ve = /(?:^|:|,)(?:\s*\[)+/g,
        ye = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        be = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        we = /^-ms-/,
        ke = /-([\da-z])/gi,
        xe = function(e, t) {
            return t.toUpperCase()
        },
        Te = function(e) {
            (V.addEventListener || "load" === e.type || "complete" === V.readyState) && (Ce(), de.ready())
        },
        Ce = function() {
            V.addEventListener ? (V.removeEventListener("DOMContentLoaded", Te, !1), e.removeEventListener("load", Te, !1)) : (V.detachEvent("onreadystatechange", Te), e.detachEvent("onload", Te))
        };
    de.fn = de.prototype = {
            jquery: ne,
            constructor: de,
            init: function(e, n, i) {
                var o, r;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (o = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e), !o || !o[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
                    if (o[1]) {
                        if (n = n instanceof de ? n[0] : n, de.merge(this, de.parseHTML(o[1], n && n.nodeType ? n.ownerDocument || n : V, !0)), me.test(o[1]) && de.isPlainObject(n))
                            for (o in n) de.isFunction(this[o]) ? this[o](n[o]) : this.attr(o, n[o]);
                        return this
                    }
                    if (r = V.getElementById(o[2]), r && r.parentNode) {
                        if (r.id !== o[2]) return i.find(e);
                        this.length = 1, this[0] = r
                    }
                    return this.context = V, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : de.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), de.makeArray(e, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return re.call(this)
            },
            get: function(e) {
                return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
            },
            pushStack: function(e) {
                var t = de.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return de.each(this, e, t)
            },
            ready: function(e) {
                return de.ready.promise().done(e), this
            },
            slice: function() {
                return this.pushStack(re.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            map: function(e) {
                return this.pushStack(de.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: oe,
            sort: [].sort,
            splice: [].splice
        }, de.fn.init.prototype = de.fn, de.extend = de.fn.extend = function() {
            var e, n, i, o, r, s, a = arguments[0] || {},
                l = 1,
                c = arguments.length,
                d = !1;
            for ("boolean" == typeof a && (d = a, a = arguments[1] || {}, l = 2), "object" == typeof a || de.isFunction(a) || (a = {}), c === l && (a = this, --l); c > l; l++)
                if (null != (r = arguments[l]))
                    for (o in r) e = a[o], i = r[o], a !== i && (d && i && (de.isPlainObject(i) || (n = de.isArray(i))) ? (n ? (n = !1, s = e && de.isArray(e) ? e : []) : s = e && de.isPlainObject(e) ? e : {}, a[o] = de.extend(d, s, i)) : i !== t && (a[o] = i));
            return a
        }, de.extend({
            expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
            noConflict: function(t) {
                return e.$ === de && (e.$ = Z), t && e.jQuery === de && (e.jQuery = K), de
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? de.readyWait++ : de.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? !--de.readyWait : !de.isReady) {
                    if (!V.body) return setTimeout(de.ready);
                    de.isReady = !0, e !== !0 && --de.readyWait > 0 || (X.resolveWith(V, [de]), de.fn.trigger && de(V).trigger("ready").off("ready"))
                }
            },
            isFunction: function(e) {
                return "function" === de.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === de.type(e)
            },
            isWindow: function(e) {
                return null != e && e == e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[ae.call(e)] || "object" : typeof e
            },
            isPlainObject: function(e) {
                var n;
                if (!e || "object" !== de.type(e) || e.nodeType || de.isWindow(e)) return !1;
                try {
                    if (e.constructor && !le.call(e, "constructor") && !le.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (i) {
                    return !1
                }
                if (de.support.ownLast)
                    for (n in e) return le.call(e, n);
                for (n in e);
                return n === t || le.call(e, n)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            error: function(e) {
                throw Error(e)
            },
            parseHTML: function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || V;
                var i = me.exec(e),
                    o = !n && [];
                return i ? [t.createElement(i[1])] : (i = de.buildFragment([e], t, o), o && de(o).remove(), de.merge([], i.childNodes))
            },
            parseJSON: function(n) {
                return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = de.trim(n), n && ge.test(n.replace(ye, "@").replace(be, "]").replace(ve, ""))) ? Function("return " + n)() : (de.error("Invalid JSON: " + n), t)
            },
            parseXML: function(n) {
                var i, o;
                if (!n || "string" != typeof n) return null;
                try {
                    e.DOMParser ? (o = new DOMParser, i = o.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                } catch (r) {
                    i = t
                }
                return i && i.documentElement && !i.getElementsByTagName("parsererror").length || de.error("Invalid XML: " + n), i
            },
            noop: function() {},
            globalEval: function(t) {
                t && de.trim(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(we, "ms-").replace(ke, xe)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, i) {
                var o, r = 0,
                    s = e.length,
                    a = n(e);
                if (i) {
                    if (a)
                        for (; s > r && (o = t.apply(e[r], i), o !== !1); r++);
                    else
                        for (r in e)
                            if (o = t.apply(e[r], i), o === !1) break
                } else if (a)
                    for (; s > r && (o = t.call(e[r], r, e[r]), o !== !1); r++);
                else
                    for (r in e)
                        if (o = t.call(e[r], r, e[r]), o === !1) break; return e
            },
            trim: ce && !ce.call("\ufeff ") ? function(e) {
                return null == e ? "" : ce.call(e)
            } : function(e) {
                return null == e ? "" : (e + "").replace(fe, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? de.merge(i, "string" == typeof e ? [e] : e) : oe.call(i, e)), i
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (se) return se.call(t, e, n);
                    for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                        if (n in t && t[n] === e) return n
                }
                return -1
            },
            merge: function(e, n) {
                var i = n.length,
                    o = e.length,
                    r = 0;
                if ("number" == typeof i)
                    for (; i > r; r++) e[o++] = n[r];
                else
                    for (; n[r] !== t;) e[o++] = n[r++];
                return e.length = o, e
            },
            grep: function(e, t, n) {
                var i, o = [],
                    r = 0,
                    s = e.length;
                for (n = !!n; s > r; r++) i = !!t(e[r], r), n !== i && o.push(e[r]);
                return o
            },
            map: function(e, t, i) {
                var o, r = 0,
                    s = e.length,
                    a = n(e),
                    l = [];
                if (a)
                    for (; s > r; r++) o = t(e[r], r, i), null != o && (l[l.length] = o);
                else
                    for (r in e) o = t(e[r], r, i), null != o && (l[l.length] = o);
                return ie.apply([], l)
            },
            guid: 1,
            proxy: function(e, n) {
                var i, o, r;
                return "string" == typeof n && (r = e[n], n = e, e = r), de.isFunction(e) ? (i = re.call(arguments, 2), o = function() {
                    return e.apply(n || this, i.concat(re.call(arguments)))
                }, o.guid = e.guid = e.guid || de.guid++, o) : t
            },
            access: function(e, n, i, o, r, s, a) {
                var l = 0,
                    c = e.length,
                    d = null == i;
                if ("object" === de.type(i)) {
                    r = !0;
                    for (l in i) de.access(e, n, l, i[l], !0, s, a)
                } else if (o !== t && (r = !0, de.isFunction(o) || (a = !0), d && (a ? (n.call(e, o), n = null) : (d = n, n = function(e, t, n) {
                        return d.call(de(e), n)
                    })), n))
                    for (; c > l; l++) n(e[l], i, a ? o : o.call(e[l], l, n(e[l], i)));
                return r ? e : d ? n.call(e) : c ? n(e[0], i) : s
            },
            now: function() {
                return (new Date).getTime()
            },
            swap: function(e, t, n, i) {
                var o, r, s = {};
                for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                o = n.apply(e, i || []);
                for (r in t) e.style[r] = s[r];
                return o
            }
        }), de.ready.promise = function(t) {
            if (!X)
                if (X = de.Deferred(), "complete" === V.readyState) setTimeout(de.ready);
                else if (V.addEventListener) V.addEventListener("DOMContentLoaded", Te, !1), e.addEventListener("load", Te, !1);
            else {
                V.attachEvent("onreadystatechange", Te), e.attachEvent("onload", Te);
                var n = !1;
                try {
                    n = null == e.frameElement && V.documentElement
                } catch (i) {}
                n && n.doScroll && function o() {
                    if (!de.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(o, 50)
                        }
                        Ce(), de.ready()
                    }
                }()
            }
            return X.promise(t)
        }, de.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            ee["[object " + t + "]"] = t.toLowerCase()
        }), Y = de(V),
        function(e, t) {
            function n(e, t, n, i) {
                var o, r, s, a, l, c, d, u, p, f;
                if ((t ? t.ownerDocument || t : R) !== L && H(t), t = t || L, n = n || [], !e || "string" != typeof e) return n;
                if (1 !== (a = t.nodeType) && 9 !== a) return [];
                if (_ && !i) {
                    if (o = Te.exec(e))
                        if (s = o[1]) {
                            if (9 === a) {
                                if (r = t.getElementById(s), !r || !r.parentNode) return n;
                                if (r.id === s) return n.push(r), n
                            } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && W(t, r) && r.id === s) return n.push(r), n
                        } else {
                            if (o[2]) return oe.apply(n, t.getElementsByTagName(e)), n;
                            if ((s = o[3]) && E.getElementsByClassName && t.getElementsByClassName) return oe.apply(n, t.getElementsByClassName(s)), n
                        }
                    if (E.qsa && (!F || !F.test(e))) {
                        if (u = d = B, p = t, f = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                            for (c = m(e), (d = t.getAttribute("id")) ? u = d.replace($e, "\\$&") : t.setAttribute("id", u), u = "[id='" + u + "'] ", l = c.length; l--;) c[l] = u + g(c[l]);
                            p = ve.test(e) && t.parentNode || t, f = c.join(",")
                        }
                        if (f) try {
                            return oe.apply(n, p.querySelectorAll(f)), n
                        } catch (h) {} finally {
                            d || t.removeAttribute("id")
                        }
                    }
                }
                return C(e.replace(he, "$1"), t, n, i)
            }

            function i(e) {
                return xe.test(e + "")
            }

            function o() {
                function e(n, i) {
                    return t.push(n += " ") > A.cacheLength && delete e[t.shift()], e[n] = i
                }
                var t = [];
                return e
            }

            function r(e) {
                return e[B] = !0, e
            }

            function s(e) {
                var t = L.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function a(e, t, n) {
                e = e.split("|");
                for (var i, o = e.length, r = n ? null : t; o--;)(i = A.attrHandle[e[o]]) && i !== t || (A.attrHandle[e[o]] = r)
            }

            function l(e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : e[t] === !0 ? t.toLowerCase() : null
            }

            function c(e, t) {
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }

            function d(e) {
                return "input" === e.nodeName.toLowerCase() ? e.defaultValue : t
            }

            function u(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Z) - (~e.sourceIndex || Z);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function p(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function f(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function h(e) {
                return r(function(t) {
                    return t = +t, r(function(n, i) {
                        for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                    })
                })
            }

            function m(e, t) {
                var i, o, r, s, a, l, c, d = U[e + " "];
                if (d) return t ? 0 : d.slice(0);
                for (a = e, l = [], c = A.preFilter; a;) {
                    (!i || (o = me.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = ge.exec(a)) && (i = o.shift(), r.push({
                        value: i,
                        type: o[0].replace(he, " ")
                    }), a = a.slice(i.length));
                    for (s in A.filter) !(o = ke[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
                        value: i,
                        type: s,
                        matches: o
                    }), a = a.slice(i.length));
                    if (!i) break
                }
                return t ? a.length : a ? n.error(e) : U(e, l).slice(0)
            }

            function g(e) {
                for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                return i
            }

            function v(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    r = X++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function(t, n, s) {
                    var a, l, c, d = G + " " + r;
                    if (s) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || o) && e(t, n, s)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || o)
                                if (c = t[B] || (t[B] = {}), (l = c[i]) && l[0] === d) {
                                    if ((a = l[1]) === !0 || a === O) return a === !0
                                } else if (l = c[i] = [d], l[1] = e(t, n, s) || O, l[1] === !0) return !0
                }
            }

            function y(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var o = e.length; o--;)
                        if (!e[o](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function b(e, t, n, i, o) {
                for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (!n || n(r, i, o)) && (s.push(r), c && t.push(a));
                return s
            }

            function w(e, t, n, i, o, s) {
                return i && !i[B] && (i = w(i)), o && !o[B] && (o = w(o, s)), r(function(r, s, a, l) {
                    var c, d, u, p = [],
                        f = [],
                        h = s.length,
                        m = r || T(t || "*", a.nodeType ? [a] : a, []),
                        g = !e || !r && t ? m : b(m, p, e, a, l),
                        v = n ? o || (r ? e : h || i) ? [] : s : g;
                    if (n && n(g, v, a, l), i)
                        for (c = b(v, f), i(c, [], a, l), d = c.length; d--;)(u = c[d]) && (v[f[d]] = !(g[f[d]] = u));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (c = [], d = v.length; d--;)(u = v[d]) && c.push(g[d] = u);
                                o(null, v = [], c, l)
                            }
                            for (d = v.length; d--;)(u = v[d]) && (c = o ? se.call(r, u) : p[d]) > -1 && (r[c] = !(s[c] = u))
                        }
                    } else v = b(v === s ? v.splice(h, v.length) : v), o ? o(null, s, v, l) : oe.apply(s, v)
                })
            }

            function k(e) {
                for (var t, n, i, o = e.length, r = A.relative[e[0].type], s = r || A.relative[" "], a = r ? 1 : 0, l = v(function(e) {
                        return e === t
                    }, s, !0), c = v(function(e) {
                        return se.call(t, e) > -1
                    }, s, !0), d = [function(e, n, i) {
                        return !r && (i || n !== M) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i))
                    }]; o > a; a++)
                    if (n = A.relative[e[a].type]) d = [v(y(d), n)];
                    else {
                        if (n = A.filter[e[a].type].apply(null, e[a].matches), n[B]) {
                            for (i = ++a; o > i && !A.relative[e[i].type]; i++);
                            return w(a > 1 && y(d), a > 1 && g(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(he, "$1"), n, i > a && k(e.slice(a, i)), o > i && k(e = e.slice(i)), o > i && g(e))
                        }
                        d.push(n)
                    }
                return y(d)
            }

            function x(e, t) {
                var i = 0,
                    o = t.length > 0,
                    s = e.length > 0,
                    a = function(r, a, l, c, d) {
                        var u, p, f, h = [],
                            m = 0,
                            g = "0",
                            v = r && [],
                            y = null != d,
                            w = M,
                            k = r || s && A.find.TAG("*", d && a.parentNode || a),
                            x = G += null == w ? 1 : Math.random() || .1;
                        for (y && (M = a !== L && a, O = i); null != (u = k[g]); g++) {
                            if (s && u) {
                                for (p = 0; f = e[p++];)
                                    if (f(u, a, l)) {
                                        c.push(u);
                                        break
                                    }
                                y && (G = x, O = ++i)
                            }
                            o && ((u = !f && u) && m--, r && v.push(u))
                        }
                        if (m += g, o && g !== m) {
                            for (p = 0; f = t[p++];) f(v, h, a, l);
                            if (r) {
                                if (m > 0)
                                    for (; g--;) v[g] || h[g] || (h[g] = ne.call(c));
                                h = b(h)
                            }
                            oe.apply(c, h), y && !r && h.length > 0 && m + t.length > 1 && n.uniqueSort(c)
                        }
                        return y && (G = x, M = w), v
                    };
                return o ? r(a) : a
            }

            function T(e, t, i) {
                for (var o = 0, r = t.length; r > o; o++) n(e, t[o], i);
                return i
            }

            function C(e, t, n, i) {
                var o, r, s, a, l, c = m(e);
                if (!i && 1 === c.length) {
                    if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && E.getById && 9 === t.nodeType && _ && A.relative[r[1].type]) {
                        if (t = (A.find.ID(s.matches[0].replace(Ee, Oe), t) || [])[0], !t) return n;
                        e = e.slice(r.shift().value.length)
                    }
                    for (o = ke.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !A.relative[a = s.type]);)
                        if ((l = A.find[a]) && (i = l(s.matches[0].replace(Ee, Oe), ve.test(r[0].type) && t.parentNode || t))) {
                            if (r.splice(o, 1), e = i.length && g(r), !e) return oe.apply(n, i), n;
                            break
                        }
                }
                return P(e, c)(i, t, !_, n, ve.test(e)), n
            }

            function S() {}
            var $, E, O, A, N, D, P, M, j, H, L, I, _, F, z, q, W, B = "sizzle" + -new Date,
                R = e.document,
                G = 0,
                X = 0,
                Y = o(),
                U = o(),
                J = o(),
                V = !1,
                Q = function() {
                    return 0
                },
                K = typeof t,
                Z = 1 << 31,
                ee = {}.hasOwnProperty,
                te = [],
                ne = te.pop,
                ie = te.push,
                oe = te.push,
                re = te.slice,
                se = te.indexOf || function(e) {
                    for (var t = 0, n = this.length; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                ae = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                le = "[\\x20\\t\\r\\n\\f]",
                ce = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ue = ce.replace("w", "w#"),
                pe = "\\[" + le + "*(" + ce + ")" + le + "*(?:([*^$|!~]?=)" + le + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ue + ")|)|)" + le + "*\\]",
                fe = ":(" + ce + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + pe.replace(3, 8) + ")*)|.*)\\)|)",
                he = RegExp("^" + le + "+|((?:^|[^\\\\])(?:\\\\.)*)" + le + "+$", "g"),
                me = RegExp("^" + le + "*," + le + "*"),
                ge = RegExp("^" + le + "*([>+~]|" + le + ")" + le + "*"),
                ve = RegExp(le + "*[+~]"),
                ye = RegExp("=" + le + "*([^\\]'\"]*)" + le + "*\\]", "g"),
                be = RegExp(fe),
                we = RegExp("^" + ue + "$"),
                ke = {
                    ID: RegExp("^#(" + ce + ")"),
                    CLASS: RegExp("^\\.(" + ce + ")"),
                    TAG: RegExp("^(" + ce.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + pe),
                    PSEUDO: RegExp("^" + fe),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + le + "*(even|odd|(([+-]|)(\\d*)n|)" + le + "*(?:([+-]|)" + le + "*(\\d+)|))" + le + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + ae + ")$", "i"),
                    needsContext: RegExp("^" + le + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + le + "*((?:-\\d)?\\d*)" + le + "*\\)|)(?=[^-]|$)", "i")
                },
                xe = /^[^{]+\{\s*\[native \w/,
                Te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Ce = /^(?:input|select|textarea|button)$/i,
                Se = /^h\d$/i,
                $e = /'|\\/g,
                Ee = RegExp("\\\\([\\da-f]{1,6}" + le + "?|(" + le + ")|.)", "ig"),
                Oe = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
                };
            try {
                oe.apply(te = re.call(R.childNodes), R.childNodes), te[R.childNodes.length].nodeType
            } catch (Ae) {
                oe = {
                    apply: te.length ? function(e, t) {
                        ie.apply(e, re.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            D = n.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, E = n.support = {}, H = n.setDocument = function(e) {
                var n = e ? e.ownerDocument || e : R,
                    o = n.parentWindow;
                return n !== L && 9 === n.nodeType && n.documentElement ? (L = n, I = n.documentElement, _ = !D(n), o && o.frameElement && o.attachEvent("onbeforeunload", function() {
                    H()
                }), E.attributes = s(function(e) {
                    return e.innerHTML = "<a href='#'></a>", a("type|href|height|width", c, "#" === e.firstChild.getAttribute("href")), a(ae, l, null == e.getAttribute("disabled")), e.className = "i", !e.getAttribute("className")
                }), E.input = s(function(e) {
                    return e.innerHTML = "<input>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
                }), a("value", d, E.attributes && E.input), E.getElementsByTagName = s(function(e) {
                    return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
                }), E.getElementsByClassName = s(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), E.getById = s(function(e) {
                    return I.appendChild(e).id = B, !n.getElementsByName || !n.getElementsByName(B).length
                }), E.getById ? (A.find.ID = function(e, t) {
                    if (typeof t.getElementById !== K && _) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, A.filter.ID = function(e) {
                    var t = e.replace(Ee, Oe);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete A.find.ID, A.filter.ID = function(e) {
                    var t = e.replace(Ee, Oe);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== K && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), A.find.TAG = E.getElementsByTagName ? function(e, n) {
                    return typeof n.getElementsByTagName !== K ? n.getElementsByTagName(e) : t
                } : function(e, t) {
                    var n, i = [],
                        o = 0,
                        r = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, A.find.CLASS = E.getElementsByClassName && function(e, n) {
                    return typeof n.getElementsByClassName !== K && _ ? n.getElementsByClassName(e) : t
                }, z = [], F = [], (E.qsa = i(n.querySelectorAll)) && (s(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || F.push("\\[" + le + "*(?:value|" + ae + ")"), e.querySelectorAll(":checked").length || F.push(":checked")
                }), s(function(e) {
                    var t = n.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && F.push("[*^$]=" + le + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
                })), (E.matchesSelector = i(q = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && s(function(e) {
                    E.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), z.push("!=", fe)
                }), F = F.length && RegExp(F.join("|")), z = z.length && RegExp(z.join("|")), W = i(I.contains) || I.compareDocumentPosition ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, E.sortDetached = s(function(e) {
                    return 1 & e.compareDocumentPosition(n.createElement("div"))
                }), Q = I.compareDocumentPosition ? function(e, t) {
                    if (e === t) return V = !0, 0;
                    var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                    return i ? 1 & i || !E.sortDetached && t.compareDocumentPosition(e) === i ? e === n || W(R, e) ? -1 : t === n || W(R, t) ? 1 : j ? se.call(j, e) - se.call(j, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function(e, t) {
                    var i, o = 0,
                        r = e.parentNode,
                        s = t.parentNode,
                        a = [e],
                        l = [t];
                    if (e === t) return V = !0, 0;
                    if (!r || !s) return e === n ? -1 : t === n ? 1 : r ? -1 : s ? 1 : j ? se.call(j, e) - se.call(j, t) : 0;
                    if (r === s) return u(e, t);
                    for (i = e; i = i.parentNode;) a.unshift(i);
                    for (i = t; i = i.parentNode;) l.unshift(i);
                    for (; a[o] === l[o];) o++;
                    return o ? u(a[o], l[o]) : a[o] === R ? -1 : l[o] === R ? 1 : 0
                }, n) : L
            }, n.matches = function(e, t) {
                return n(e, null, null, t)
            }, n.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== L && H(e), t = t.replace(ye, "='$1']"), !(!E.matchesSelector || !_ || z && z.test(t) || F && F.test(t))) try {
                    var i = q.call(e, t);
                    if (i || E.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (o) {}
                return n(t, L, null, [e]).length > 0
            }, n.contains = function(e, t) {
                return (e.ownerDocument || e) !== L && H(e), W(e, t)
            }, n.attr = function(e, n) {
                (e.ownerDocument || e) !== L && H(e);
                var i = A.attrHandle[n.toLowerCase()],
                    o = i && ee.call(A.attrHandle, n.toLowerCase()) ? i(e, n, !_) : t;
                return o === t ? E.attributes || !_ ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
            }, n.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, n.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    o = 0;
                if (V = !E.detectDuplicates, j = !E.sortStable && e.slice(0), e.sort(Q), V) {
                    for (; t = e[o++];) t === e[o] && (i = n.push(o));
                    for (; i--;) e.splice(n[i], 1)
                }
                return e
            }, N = n.getText = function(e) {
                var t, n = "",
                    i = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += N(e)
                    } else if (3 === o || 4 === o) return e.nodeValue
                } else
                    for (; t = e[i]; i++) n += N(t);
                return n
            }, A = n.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: ke,
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
                    ATTR: function(e) {
                        return e[1] = e[1].replace(Ee, Oe), e[3] = (e[4] || e[5] || "").replace(Ee, Oe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var n, i = !e[5] && e[2];
                        return ke.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && be.test(i) && (n = m(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), e[2] = i.slice(0, n)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(Ee, Oe).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = Y[e + " "];
                        return t || (t = RegExp("(^|" + le + ")" + e + "(" + le + "|$)")) && Y(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== K && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, i) {
                        return function(o) {
                            var r = n.attr(o, e);
                            return null == r ? "!=" === t : t ? (r += "", "=" === t ? r === i : "!=" === t ? r !== i : "^=" === t ? i && 0 === r.indexOf(i) : "*=" === t ? i && r.indexOf(i) > -1 : "$=" === t ? i && r.slice(-i.length) === i : "~=" === t ? (" " + r + " ").indexOf(i) > -1 : "|=" === t ? r === i || r.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, i, o) {
                        var r = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === i && 0 === o ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var c, d, u, p, f, h, m = r !== s ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                y = !l && !a;
                            if (g) {
                                if (r) {
                                    for (; m;) {
                                        for (u = t; u = u[m];)
                                            if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [s ? g.firstChild : g.lastChild], s && y) {
                                    for (d = g[B] || (g[B] = {}), c = d[e] || [], f = c[0] === G && c[1], p = c[0] === G && c[2], u = f && g.childNodes[f]; u = ++f && u && u[m] || (p = f = 0) || h.pop();)
                                        if (1 === u.nodeType && ++p && u === t) {
                                            d[e] = [G, f, p];
                                            break
                                        }
                                } else if (y && (c = (t[B] || (t[B] = {}))[e]) && c[0] === G) p = c[1];
                                else
                                    for (;
                                        (u = ++f && u && u[m] || (p = f = 0) || h.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (y && ((u[B] || (u[B] = {}))[e] = [G, p]), u !== t)););
                                return p -= o, p === i || 0 === p % i && p / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var i, o = A.pseudos[e] || A.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                        return o[B] ? o(t) : o.length > 1 ? (i = [e, e, "", t], A.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, n) {
                            for (var i, r = o(e, t), s = r.length; s--;) i = se.call(e, r[s]), e[i] = !(n[i] = r[s])
                        }) : function(e) {
                            return o(e, 0, i)
                        }) : o
                    }
                },
                pseudos: {
                    not: r(function(e) {
                        var t = [],
                            n = [],
                            i = P(e.replace(he, "$1"));
                        return i[B] ? r(function(e, t, n, o) {
                            for (var r, s = i(e, null, o, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                        }) : function(e, o, r) {
                            return t[0] = e, i(t, null, r, n), !n.pop()
                        }
                    }),
                    has: r(function(e) {
                        return function(t) {
                            return n(e, t).length > 0
                        }
                    }),
                    contains: r(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || N(t)).indexOf(e) > -1
                        }
                    }),
                    lang: r(function(e) {
                        return we.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Ee, Oe).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === I
                    },
                    focus: function(e) {
                        return e === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !A.pseudos.empty(e)
                    },
                    header: function(e) {
                        return Se.test(e.nodeName)
                    },
                    input: function(e) {
                        return Ce.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    },
                    first: h(function() {
                        return [0]
                    }),
                    last: h(function(e, t) {
                        return [t - 1]
                    }),
                    eq: h(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: h(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: h(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: h(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                        return e
                    }),
                    gt: h(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; t > ++i;) e.push(i);
                        return e
                    })
                }
            };
            for ($ in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) A.pseudos[$] = p($);
            for ($ in {
                    submit: !0,
                    reset: !0
                }) A.pseudos[$] = f($);
            P = n.compile = function(e, t) {
                var n, i = [],
                    o = [],
                    r = J[e + " "];
                if (!r) {
                    for (t || (t = m(e)), n = t.length; n--;) r = k(t[n]), r[B] ? i.push(r) : o.push(r);
                    r = J(e, x(o, i))
                }
                return r
            }, A.pseudos.nth = A.pseudos.eq, S.prototype = A.filters = A.pseudos, A.setFilters = new S, E.sortStable = B.split("").sort(Q).join("") === B, H(), [0, 0].sort(Q), E.detectDuplicates = V, de.find = n, de.expr = n.selectors, de.expr[":"] = de.expr.pseudos, de.unique = n.uniqueSort, de.text = n.getText, de.isXMLDoc = n.isXML, de.contains = n.contains
        }(e);
    var Se = {};
    de.Callbacks = function(e) {
        e = "string" == typeof e ? Se[e] || i(e) : de.extend({}, e);
        var n, o, r, s, a, l, c = [],
            d = !e.once && [],
            u = function(t) {
                for (o = e.memory && t, r = !0, a = l || 0, l = 0, s = c.length, n = !0; c && s > a; a++)
                    if (c[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        o = !1;
                        break
                    }
                n = !1, c && (d ? d.length && u(d.shift()) : o ? c = [] : p.disable())
            },
            p = {
                add: function() {
                    if (c) {
                        var t = c.length;
                        ! function i(t) {
                            de.each(t, function(t, n) {
                                var o = de.type(n);
                                "function" === o ? e.unique && p.has(n) || c.push(n) : n && n.length && "string" !== o && i(n)
                            })
                        }(arguments), n ? s = c.length : o && (l = t, u(o))
                    }
                    return this
                },
                remove: function() {
                    return c && de.each(arguments, function(e, t) {
                        for (var i;
                            (i = de.inArray(t, c, i)) > -1;) c.splice(i, 1), n && (s >= i && s--, a >= i && a--)
                    }), this
                },
                has: function(e) {
                    return e ? de.inArray(e, c) > -1 : !(!c || !c.length)
                },
                empty: function() {
                    return c = [], s = 0, this
                },
                disable: function() {
                    return c = d = o = t, this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return d = t, o || p.disable(), this
                },
                locked: function() {
                    return !d
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], !c || r && !d || (n ? d.push(t) : u(t)), this
                },
                fire: function() {
                    return p.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return p
    }, de.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", de.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", de.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", de.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return de.Deferred(function(n) {
                            de.each(t, function(t, r) {
                                var s = r[0],
                                    a = de.isFunction(e[t]) && e[t];
                                o[r[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && de.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? de.extend(e, i) : i
                    }
                },
                o = {};
            return i.pipe = i.then, de.each(t, function(e, r) {
                var s = r[2],
                    a = r[3];
                i[r[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i : this, arguments), this
                }, o[r[0] + "With"] = s.fireWith
            }), i.promise(o), e && e.call(o, o), o
        },
        when: function(e) {
            var t, n, i, o = 0,
                r = re.call(arguments),
                s = r.length,
                a = 1 !== s || e && de.isFunction(e.promise) ? s : 0,
                l = 1 === a ? e : de.Deferred(),
                c = function(e, n, i) {
                    return function(o) {
                        n[e] = this, i[e] = arguments.length > 1 ? re.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                };
            if (s > 1)
                for (t = Array(s), n = Array(s), i = Array(s); s > o; o++) r[o] && de.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --a;
            return a || l.resolveWith(i, r), l.promise()
        }
    }), de.support = function(t) {
        var n, i, o, r, s, a, l, c, d, u = V.createElement("div");
        if (u.setAttribute("className", "t"), u.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = u.getElementsByTagName("*") || [], i = u.getElementsByTagName("a")[0], !i || !i.style || !n.length) return t;
        r = V.createElement("select"), a = r.appendChild(V.createElement("option")), o = u.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== u.className, t.leadingWhitespace = 3 === u.firstChild.nodeType, t.tbody = !u.getElementsByTagName("tbody").length, t.htmlSerialize = !!u.getElementsByTagName("link").length, t.style = /top/.test(i.getAttribute("style")), t.hrefNormalized = "/a" === i.getAttribute("href"), t.opacity = /^0.5/.test(i.style.opacity), t.cssFloat = !!i.style.cssFloat, t.checkOn = !!o.value, t.optSelected = a.selected, t.enctype = !!V.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, r.disabled = !0, t.optDisabled = !a.disabled;
        try {
            delete u.test
        } catch (p) {
            t.deleteExpando = !1
        }
        o = V.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), s = V.createDocumentFragment(), s.appendChild(o), t.appendChecked = o.checked, t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, u.attachEvent && (u.attachEvent("onclick", function() {
            t.noCloneEvent = !1
        }), u.cloneNode(!0).click());
        for (d in {
                submit: !0,
                change: !0,
                focusin: !0
            }) u.setAttribute(l = "on" + d, "t"), t[d + "Bubbles"] = l in e || u.attributes[l].expando === !1;
        u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === u.style.backgroundClip;
        for (d in de(t)) break;
        return t.ownLast = "0" !== d, de(function() {
            var n, i, o, r = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                s = V.getElementsByTagName("body")[0];
            s && (n = V.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(n).appendChild(u), u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = u.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = c && 0 === o[0].offsetHeight, u.innerHTML = "", u.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", de.swap(s, null != s.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === u.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(u, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(u, null) || {
                width: "4px"
            }).width, i = u.appendChild(V.createElement("div")), i.style.cssText = u.style.cssText = r, i.style.marginRight = i.style.width = "0", u.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof u.style.zoom !== U && (u.innerHTML = "", u.style.cssText = r + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === u.offsetWidth, u.style.display = "block", u.innerHTML = "<div></div>", u.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== u.offsetWidth, t.inlineBlockNeedsLayout && (s.style.zoom = 1)), s.removeChild(n), n = u = o = i = null)
        }), n = r = s = a = i = o = null, t
    }({});
    var $e = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Ee = /([A-Z])/g;
    de.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? de.cache[e[de.expando]] : e[de.expando], !!e && !a(e)
        },
        data: function(e, t, n) {
            return o(e, t, n)
        },
        removeData: function(e, t) {
            return r(e, t)
        },
        _data: function(e, t, n) {
            return o(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return r(e, t, !0)
        },
        acceptData: function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && de.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), de.fn.extend({
        data: function(e, n) {
            var i, o, r = null,
                a = 0,
                l = this[0];
            if (e === t) {
                if (this.length && (r = de.data(l), 1 === l.nodeType && !de._data(l, "parsedAttrs"))) {
                    for (i = l.attributes; i.length > a; a++) o = i[a].name, 0 === o.indexOf("data-") && (o = de.camelCase(o.slice(5)), s(l, o, r[o]));
                    de._data(l, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof e ? this.each(function() {
                de.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                de.data(this, e, n)
            }) : l ? s(l, e, de.data(l, e)) : null
        },
        removeData: function(e) {
            return this.each(function() {
                de.removeData(this, e)
            })
        }
    }), de.extend({
        queue: function(e, n, i) {
            var o;
            return e ? (n = (n || "fx") + "queue", o = de._data(e, n), i && (!o || de.isArray(i) ? o = de._data(e, n, de.makeArray(i)) : o.push(i)), o || []) : t
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = de.queue(e, t),
                i = n.length,
                o = n.shift(),
                r = de._queueHooks(e, t),
                s = function() {
                    de.dequeue(e, t)
                };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return de._data(e, n) || de._data(e, n, {
                empty: de.Callbacks("once memory").add(function() {
                    de._removeData(e, t + "queue"), de._removeData(e, n)
                })
            })
        }
    }), de.fn.extend({
        queue: function(e, n) {
            var i = 2;
            return "string" != typeof e && (n = e, e = "fx", i--), i > arguments.length ? de.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = de.queue(this, e, n);
                de._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && de.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                de.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = de.fx ? de.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var i = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var i, o = 1,
                r = de.Deferred(),
                s = this,
                a = this.length,
                l = function() {
                    --o || r.resolveWith(s, [s])
                };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--;) i = de._data(s[a], e + "queueHooks"), i && i.empty && (o++, i.empty.add(l));
            return l(), r.promise(n)
        }
    });
    var Oe, Ae, Ne = /[\t\r\n\f]/g,
        De = /\r/g,
        Pe = /^(?:input|select|textarea|button|object)$/i,
        Me = /^(?:a|area)$/i,
        je = /^(?:checked|selected)$/i,
        He = de.support.getSetAttribute,
        Le = de.support.input;
    de.fn.extend({
        attr: function(e, t) {
            return de.access(this, de.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                de.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return de.access(this, de.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = de.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, i, o, r, s = 0,
                a = this.length,
                l = "string" == typeof e && e;
            if (de.isFunction(e)) return this.each(function(t) {
                de(this).addClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(pe) || []; a > s; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ne, " ") : " ")) {
                        for (r = 0; o = t[r++];) 0 > i.indexOf(" " + o + " ") && (i += o + " ");
                        n.className = de.trim(i)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s = 0,
                a = this.length,
                l = 0 === arguments.length || "string" == typeof e && e;
            if (de.isFunction(e)) return this.each(function(t) {
                de(this).removeClass(e.call(this, t, this.className))
            });
            if (l)
                for (t = (e || "").match(pe) || []; a > s; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ne, " ") : "")) {
                        for (r = 0; o = t[r++];)
                            for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
                        n.className = e ? de.trim(i) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                i = "boolean" == typeof t;
            return this.each(de.isFunction(e) ? function(n) {
                de(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n)
                    for (var o, r = 0, s = de(this), a = t, l = e.match(pe) || []; o = l[r++];) a = i ? a : !s.hasClass(o), s[a ? "addClass" : "removeClass"](o);
                else(n === U || "boolean" === n) && (this.className && de._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : de._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ne, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, i, o, r = this[0];
            return arguments.length ? (o = de.isFunction(e), this.each(function(n) {
                var r;
                1 === this.nodeType && (r = o ? e.call(this, n, de(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : de.isArray(r) && (r = de.map(r, function(e) {
                    return null == e ? "" : e + ""
                })), i = de.valHooks[this.type] || de.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, r, "value") !== t || (this.value = r))
            })) : r ? (i = de.valHooks[r.type] || de.valHooks[r.nodeName.toLowerCase()], i && "get" in i && (n = i.get(r, "value")) !== t ? n : (n = r.value, "string" == typeof n ? n.replace(De, "") : null == n ? "" : n)) : void 0
        }
    }), de.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = de.find.attr(e, "value");
                    return null != t ? t : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
                        if (n = i[l], !(!n.selected && l !== o || (de.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && de.nodeName(n.parentNode, "optgroup"))) {
                            if (t = de(n).val(), r) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, i, o = e.options, r = de.makeArray(t), s = o.length; s--;) i = o[s], (i.selected = de.inArray(de(i).val(), r) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), r
                }
            }
        },
        attr: function(e, n, i) {
            var o, r, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? typeof e.getAttribute === U ? de.prop(e, n, i) : (1 === s && de.isXMLDoc(e) || (n = n.toLowerCase(), o = de.attrHooks[n] || (de.expr.match.bool.test(n) ? Ae : Oe)), i === t ? o && "get" in o && null !== (r = o.get(e, n)) ? r : (r = de.find.attr(e, n), null == r ? t : r) : null !== i ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : (e.setAttribute(n, i + ""), i) : (de.removeAttr(e, n), t)) : void 0
        },
        removeAttr: function(e, t) {
            var n, i, o = 0,
                r = t && t.match(pe);
            if (r && 1 === e.nodeType)
                for (; n = r[o++];) i = de.propFix[n] || n, de.expr.match.bool.test(n) ? Le && He || !je.test(n) ? e[i] = !1 : e[de.camelCase("default-" + n)] = e[i] = !1 : de.attr(e, n, ""), e.removeAttribute(He ? n : i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!de.support.radioValue && "radio" === t && de.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, n, i) {
            var o, r, s, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? (s = 1 !== a || !de.isXMLDoc(e), s && (n = de.propFix[n] || n, r = de.propHooks[n]), i !== t ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o : e[n] = i : r && "get" in r && null !== (o = r.get(e, n)) ? o : e[n]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = de.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Pe.test(e.nodeName) || Me.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), Ae = {
        set: function(e, t, n) {
            return t === !1 ? de.removeAttr(e, n) : Le && He || !je.test(n) ? e.setAttribute(!He && de.propFix[n] || n, n) : e[de.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, de.each(de.expr.match.bool.source.match(/\w+/g), function(e, n) {
        var i = de.expr.attrHandle[n] || de.find.attr;
        de.expr.attrHandle[n] = Le && He || !je.test(n) ? function(e, n, o) {
            var r = de.expr.attrHandle[n],
                s = o ? t : (de.expr.attrHandle[n] = t) != i(e, n, o) ? n.toLowerCase() : null;
            return de.expr.attrHandle[n] = r, s
        } : function(e, n, i) {
            return i ? t : e[de.camelCase("default-" + n)] ? n.toLowerCase() : null
        }
    }), Le && He || (de.attrHooks.value = {
        set: function(e, n, i) {
            return de.nodeName(e, "input") ? (e.defaultValue = n, t) : Oe && Oe.set(e, n, i)
        }
    }), He || (Oe = {
        set: function(e, n, i) {
            var o = e.getAttributeNode(i);
            return o || e.setAttributeNode(o = e.ownerDocument.createAttribute(i)), o.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
        }
    }, de.expr.attrHandle.id = de.expr.attrHandle.name = de.expr.attrHandle.coords = function(e, n, i) {
        var o;
        return i ? t : (o = e.getAttributeNode(n)) && "" !== o.value ? o.value : null
    }, de.valHooks.button = {
        get: function(e, n) {
            var i = e.getAttributeNode(n);
            return i && i.specified ? i.value : t
        },
        set: Oe.set
    }, de.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Oe.set(e, "" === t ? !1 : t, n)
        }
    }, de.each(["width", "height"], function(e, n) {
        de.attrHooks[n] = {
            set: function(e, i) {
                return "" === i ? (e.setAttribute(n, "auto"), i) : t
            }
        }
    })), de.support.hrefNormalized || de.each(["href", "src"], function(e, t) {
        de.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), de.support.style || (de.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }), de.support.optSelected || (de.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), de.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        de.propFix[this.toLowerCase()] = this
    }), de.support.enctype || (de.propFix.enctype = "encoding"), de.each(["radio", "checkbox"], function() {
        de.valHooks[this] = {
            set: function(e, n) {
                return de.isArray(n) ? e.checked = de.inArray(de(e).val(), n) >= 0 : t
            }
        }, de.support.checkOn || (de.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Ie = /^(?:input|select|textarea)$/i,
        _e = /^key/,
        Fe = /^(?:mouse|contextmenu)|click/,
        ze = /^(?:focusinfocus|focusoutblur)$/,
        qe = /^([^.]*)(?:\.(.+)|)$/;
    de.event = {
        global: {},
        add: function(e, n, i, o, r) {
            var s, a, l, c, d, u, p, f, h, m, g, v = de._data(e);
            if (v) {
                for (i.handler && (c = i, i = c.handler, r = c.selector), i.guid || (i.guid = de.guid++), (a = v.events) || (a = v.events = {}), (u = v.handle) || (u = v.handle = function(e) {
                        return typeof de === U || e && de.event.triggered === e.type ? t : de.event.dispatch.apply(u.elem, arguments)
                    }, u.elem = e), n = (n || "").match(pe) || [""], l = n.length; l--;) s = qe.exec(n[l]) || [], h = g = s[1], m = (s[2] || "").split(".").sort(), h && (d = de.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, d = de.event.special[h] || {}, p = de.extend({
                    type: h,
                    origType: g,
                    data: o,
                    handler: i,
                    guid: i.guid,
                    selector: r,
                    needsContext: r && de.expr.match.needsContext.test(r),
                    namespace: m.join(".")
                }, c), (f = a[h]) || (f = a[h] = [], f.delegateCount = 0, d.setup && d.setup.call(e, o, m, u) !== !1 || (e.addEventListener ? e.addEventListener(h, u, !1) : e.attachEvent && e.attachEvent("on" + h, u))), d.add && (d.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), r ? f.splice(f.delegateCount++, 0, p) : f.push(p), de.event.global[h] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, d, u, p, f, h, m, g = de.hasData(e) && de._data(e);
            if (g && (d = g.events)) {
                for (t = (t || "").match(pe) || [""], c = t.length; c--;)
                    if (a = qe.exec(t[c]) || [], f = m = a[1], h = (a[2] || "").split(".").sort(), f) {
                        for (u = de.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, p = d[f] || [], a = a[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !o && m !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, u.remove && u.remove.call(e, s));
                        l && !p.length && (u.teardown && u.teardown.call(e, h, g.handle) !== !1 || de.removeEvent(e, f, g.handle), delete d[f])
                    } else
                        for (f in d) de.event.remove(e, f + t[c], n, i, !0);
                de.isEmptyObject(d) && (delete g.handle, de._removeData(e, "events"))
            }
        },
        trigger: function(n, i, o, r) {
            var s, a, l, c, d, u, p, f = [o || V],
                h = le.call(n, "type") ? n.type : n,
                m = le.call(n, "namespace") ? n.namespace.split(".") : [];
            if (l = u = o = o || V, 3 !== o.nodeType && 8 !== o.nodeType && !ze.test(h + de.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), a = 0 > h.indexOf(":") && "on" + h, n = n[de.expando] ? n : new de.Event(h, "object" == typeof n && n), n.isTrigger = r ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = o), i = null == i ? [n] : de.makeArray(i, [n]), d = de.event.special[h] || {}, r || !d.trigger || d.trigger.apply(o, i) !== !1)) {
                if (!r && !d.noBubble && !de.isWindow(o)) {
                    for (c = d.delegateType || h, ze.test(c + h) || (l = l.parentNode); l; l = l.parentNode) f.push(l), u = l;
                    u === (o.ownerDocument || V) && f.push(u.defaultView || u.parentWindow || e)
                }
                for (p = 0;
                    (l = f[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? c : d.bindType || h, s = (de._data(l, "events") || {})[n.type] && de._data(l, "handle"), s && s.apply(l, i), s = a && l[a], s && de.acceptData(l) && s.apply && s.apply(l, i) === !1 && n.preventDefault();
                if (n.type = h, !r && !n.isDefaultPrevented() && (!d._default || d._default.apply(f.pop(), i) === !1) && de.acceptData(o) && a && o[h] && !de.isWindow(o)) {
                    u = o[a], u && (o[a] = null), de.event.triggered = h;
                    try {
                        o[h]()
                    } catch (g) {}
                    de.event.triggered = t, u && (o[a] = u)
                }
                return n.result
            }
        },
        dispatch: function(e) {
            e = de.event.fix(e);
            var n, i, o, r, s, a = [],
                l = re.call(arguments),
                c = (de._data(this, "events") || {})[e.type] || [],
                d = de.event.special[e.type] || {};
            if (l[0] = e, e.delegateTarget = this, !d.preDispatch || d.preDispatch.call(this, e) !== !1) {
                for (a = de.event.handlers.call(this, e, c), n = 0;
                    (r = a[n++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = r.elem, s = 0;
                        (o = r.handlers[s++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, i = ((de.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, l), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, n) {
            var i, o, r, s, a = [],
                l = n.delegateCount,
                c = e.target;
            if (l && c.nodeType && (!e.button || "click" !== e.type))
                for (; c != this; c = c.parentNode || this)
                    if (1 === c.nodeType && (c.disabled !== !0 || "click" !== e.type)) {
                        for (r = [], s = 0; l > s; s++) o = n[s], i = o.selector + " ", r[i] === t && (r[i] = o.needsContext ? de(i, this).index(c) >= 0 : de.find(i, this, null, [c]).length), r[i] && r.push(o);
                        r.length && a.push({
                            elem: c,
                            handlers: r
                        })
                    }
            return n.length > l && a.push({
                elem: this,
                handlers: n.slice(l)
            }), a
        },
        fix: function(e) {
            if (e[de.expando]) return e;
            var t, n, i, o = e.type,
                r = e,
                s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Fe.test(o) ? this.mouseHooks : _e.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new de.Event(r), t = i.length; t--;) n = i[t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || V), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var i, o, r, s = n.button,
                    a = n.fromElement;
                return null == e.pageX && null != n.clientX && (o = e.target.ownerDocument || V, r = o.documentElement, i = o.body, e.pageX = n.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== d() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === d() && this.blur ? (this.blur(), !1) : t
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return de.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
                },
                _default: function(e) {
                    return de.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, i) {
            var o = de.extend(new de.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? de.event.trigger(o, null, t) : de.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault()
        }
    }, de.removeEvent = V.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && (typeof e[i] === U && (e[i] = null), e.detachEvent(i, n))
    }, de.Event = function(e, n) {
        return this instanceof de.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l : c) : this.type = e, n && de.extend(this, n), this.timeStamp = e && e.timeStamp || de.now(), this[de.expando] = !0, t) : new de.Event(e, n)
    }, de.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = l, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = l, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = l, this.stopPropagation()
        }
    }, de.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        de.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                    o = e.relatedTarget,
                    r = e.handleObj;
                return (!o || o !== i && !de.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), de.support.submitBubbles || (de.event.special.submit = {
        setup: function() {
            return de.nodeName(this, "form") ? !1 : (de.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target,
                    i = de.nodeName(n, "input") || de.nodeName(n, "button") ? n.form : t;
                i && !de._data(i, "submitBubbles") && (de.event.add(i, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), de._data(i, "submitBubbles", !0))
            }), t)
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && de.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return de.nodeName(this, "form") ? !1 : (de.event.remove(this, "._submit"), t)
        }
    }), de.support.changeBubbles || (de.event.special.change = {
        setup: function() {
            return Ie.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (de.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), de.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), de.event.simulate("change", this, e, !0)
            })), !1) : (de.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ie.test(t.nodeName) && !de._data(t, "changeBubbles") && (de.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || de.event.simulate("change", this.parentNode, e, !0)
                }), de._data(t, "changeBubbles", !0))
            }), t)
        },
        handle: function(e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
        },
        teardown: function() {
            return de.event.remove(this, "._change"), !Ie.test(this.nodeName)
        }
    }), de.support.focusinBubbles || de.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            i = function(e) {
                de.event.simulate(t, e.target, de.event.fix(e), !0)
            };
        de.event.special[t] = {
            setup: function() {
                0 === n++ && V.addEventListener(e, i, !0)
            },
            teardown: function() {
                0 === --n && V.removeEventListener(e, i, !0)
            }
        }
    }), de.fn.extend({
        on: function(e, n, i, o, r) {
            var s, a;
            if ("object" == typeof e) {
                "string" != typeof n && (i = i || n, n = t);
                for (s in e) this.on(s, n, i, e[s], r);
                return this
            }
            if (null == i && null == o ? (o = n, i = n = t) : null == o && ("string" == typeof n ? (o = i, i = t) : (o = i, i = n, n = t)), o === !1) o = c;
            else if (!o) return this;
            return 1 === r && (a = o, o = function(e) {
                return de().off(e), a.apply(this, arguments)
            }, o.guid = a.guid || (a.guid = de.guid++)), this.each(function() {
                de.event.add(this, e, o, i, n)
            })
        },
        one: function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        },
        off: function(e, n, i) {
            var o, r;
            if (e && e.preventDefault && e.handleObj) return o = e.handleObj, de(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
            if ("object" == typeof e) {
                for (r in e) this.off(r, n, e[r]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = c), this.each(function() {
                de.event.remove(this, e, i, n)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                de.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, n) {
            var i = this[0];
            return i ? de.event.trigger(e, n, i, !0) : t
        }
    });
    var We = /^.[^:#\[\.,]*$/,
        Be = /^(?:parents|prev(?:Until|All))/,
        Re = de.expr.match.needsContext,
        Ge = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    de.fn.extend({
        find: function(e) {
            var t, n = [],
                i = this,
                o = i.length;
            if ("string" != typeof e) return this.pushStack(de(e).filter(function() {
                for (t = 0; o > t; t++)
                    if (de.contains(i[t], this)) return !0
            }));
            for (t = 0; o > t; t++) de.find(e, i[t], n);
            return n = this.pushStack(o > 1 ? de.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function(e) {
            var t, n = de(e, this),
                i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++)
                    if (de.contains(this, n[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(p(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(p(this, e || [], !1))
        },
        is: function(e) {
            return !!p(this, "string" == typeof e && Re.test(e) ? de(e) : e || [], !1).length
        },
        closest: function(e, t) {
            for (var n, i = 0, o = this.length, r = [], s = Re.test(e) || "string" != typeof e ? de(e, t || this.context) : 0; o > i; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                    if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && de.find.matchesSelector(n, e))) {
                        n = r.push(n);
                        break
                    }
            return this.pushStack(r.length > 1 ? de.unique(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? de.inArray(this[0], de(e)) : de.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? de(e, t) : de.makeArray(e && e.nodeType ? [e] : e),
                i = de.merge(this.get(), n);
            return this.pushStack(de.unique(i))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), de.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return de.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return de.dir(e, "parentNode", n)
        },
        next: function(e) {
            return u(e, "nextSibling")
        },
        prev: function(e) {
            return u(e, "previousSibling")
        },
        nextAll: function(e) {
            return de.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return de.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return de.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return de.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return de.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return de.sibling(e.firstChild)
        },
        contents: function(e) {
            return de.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : de.merge([], e.childNodes)
        }
    }, function(e, t) {
        de.fn[e] = function(n, i) {
            var o = de.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = de.filter(i, o)), this.length > 1 && (Ge[e] || (o = de.unique(o)), Be.test(e) && (o = o.reverse())), this.pushStack(o)
        }
    }), de.extend({
        filter: function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? de.find.matchesSelector(i, e) ? [i] : [] : de.find.matches(e, de.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, n, i) {
            for (var o = [], r = e[n]; r && 9 !== r.nodeType && (i === t || 1 !== r.nodeType || !de(r).is(i));) 1 === r.nodeType && o.push(r), r = r[n];
            return o
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Xe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ye = / jQuery\d+="(?:null|\d+)"/g,
        Ue = RegExp("<(?:" + Xe + ")[\\>]", "i"),
        Je = /^\s+/,
        Ve = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Qe = /<([\w:]+)/,
        Ke = /<tbody/i,
        Ze = /<|&#?\w+;/,
        et = /<(?:script|style|link)/i,
        tt = /^(?:checkbox|radio)$/i,
        nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        it = /^$|\/(?:java|ecma)script/i,
        ot = /^true\/(.*)/,
        rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        st = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: de.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        at = f(V),
        lt = at.appendChild(V.createElement("div"));
    st.optgroup = st.option, st.tbody = st.tfoot = st.colgroup = st.caption = st.thead, st.th = st.td, de.fn.extend({
        text: function(e) {
            return de.access(this, function(e) {
                return e === t ? de.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, i = e ? de.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || de.cleanData(w(n)), n.parentNode && (t && de.contains(n.ownerDocument, n) && v(w(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && de.cleanData(w(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && de.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return de.clone(this, e, t)
            })
        },
        html: function(e) {
            return de.access(this, function(e) {
                var n = this[0] || {},
                    i = 0,
                    o = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Ye, "") : t;
                if (!("string" != typeof e || et.test(e) || !de.support.htmlSerialize && Ue.test(e) || !de.support.leadingWhitespace && Je.test(e) || st[(Qe.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Ve, "<$1></$2>");
                    try {
                        for (; o > i; i++) n = this[i] || {}, 1 === n.nodeType && (de.cleanData(w(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch (r) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = de.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var i = e[t++],
                    o = e[t++];
                o && (i && i.parentNode !== o && (i = this.nextSibling), de(this).remove(), o.insertBefore(n, i))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = ie.apply([], e);
            var i, o, r, s, a, l, c = 0,
                d = this.length,
                u = this,
                p = d - 1,
                f = e[0],
                h = de.isFunction(f);
            if (h || !(1 >= d || "string" != typeof f || de.support.checkClone) && nt.test(f)) return this.each(function(i) {
                var o = u.eq(i);
                h && (e[0] = f.call(this, i, o.html())), o.domManip(e, t, n)
            });
            if (d && (l = de.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
                for (s = de.map(w(l, "script"), m), r = s.length; d > c; c++) o = l, c !== p && (o = de.clone(o, !0, !0), r && de.merge(s, w(o, "script"))), t.call(this[c], o, c);
                if (r)
                    for (a = s[s.length - 1].ownerDocument, de.map(s, g), c = 0; r > c; c++) o = s[c], it.test(o.type || "") && !de._data(o, "globalEval") && de.contains(a, o) && (o.src ? de._evalUrl(o.src) : de.globalEval((o.text || o.textContent || o.innerHTML || "").replace(rt, "")));
                l = i = null
            }
            return this
        }
    }), de.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        de.fn[e] = function(e) {
            for (var n, i = 0, o = [], r = de(e), s = r.length - 1; s >= i; i++) n = i === s ? this : this.clone(!0), de(r[i])[t](n), oe.apply(o, n.get());
            return this.pushStack(o)
        }
    }), de.extend({
        clone: function(e, t, n) {
            var i, o, r, s, a, l = de.contains(e.ownerDocument, e);
            if (de.support.html5Clone || de.isXMLDoc(e) || !Ue.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (lt.innerHTML = e.outerHTML, lt.removeChild(r = lt.firstChild)), !(de.support.noCloneEvent && de.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || de.isXMLDoc(e)))
                for (i = w(r), a = w(e), s = 0; null != (o = a[s]); ++s) i[s] && b(o, i[s]);
            if (t)
                if (n)
                    for (a = a || w(e), i = i || w(r), s = 0; null != (o = a[s]); s++) y(o, i[s]);
                else y(e, r);
            return i = w(r, "script"), i.length > 0 && v(i, !l && w(e, "script")), i = a = o = null, r
        },
        buildFragment: function(e, t, n, i) {
            for (var o, r, s, a, l, c, d, u = e.length, p = f(t), h = [], m = 0; u > m; m++)
                if (r = e[m], r || 0 === r)
                    if ("object" === de.type(r)) de.merge(h, r.nodeType ? [r] : r);
                    else if (Ze.test(r)) {
                for (a = a || p.appendChild(t.createElement("div")), l = (Qe.exec(r) || ["", ""])[1].toLowerCase(), d = st[l] || st._default, a.innerHTML = d[1] + r.replace(Ve, "<$1></$2>") + d[2], o = d[0]; o--;) a = a.lastChild;
                if (!de.support.leadingWhitespace && Je.test(r) && h.push(t.createTextNode(Je.exec(r)[0])), !de.support.tbody)
                    for (r = "table" !== l || Ke.test(r) ? "<table>" !== d[1] || Ke.test(r) ? 0 : a : a.firstChild, o = r && r.childNodes.length; o--;) de.nodeName(c = r.childNodes[o], "tbody") && !c.childNodes.length && r.removeChild(c);
                for (de.merge(h, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                a = p.lastChild
            } else h.push(t.createTextNode(r));
            for (a && p.removeChild(a), de.support.appendChecked || de.grep(w(h, "input"), k), m = 0; r = h[m++];)
                if ((!i || -1 === de.inArray(r, i)) && (s = de.contains(r.ownerDocument, r), a = w(p.appendChild(r), "script"), s && v(a), n))
                    for (o = 0; r = a[o++];) it.test(r.type || "") && n.push(r);
            return a = null, p
        },
        cleanData: function(e, t) {
            for (var n, i, o, r, s = 0, a = de.expando, l = de.cache, c = de.support.deleteExpando, d = de.event.special; null != (n = e[s]); s++)
                if ((t || de.acceptData(n)) && (o = n[a], r = o && l[o])) {
                    if (r.events)
                        for (i in r.events) d[i] ? de.event.remove(n, i) : de.removeEvent(n, i, r.handle);
                    l[o] && (delete l[o], c ? delete n[a] : typeof n.removeAttribute !== U ? n.removeAttribute(a) : n[a] = null, te.push(o))
                }
        },
        _evalUrl: function(e) {
            return de.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), de.fn.extend({
        wrapAll: function(e) {
            if (de.isFunction(e)) return this.each(function(t) {
                de(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = de(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(de.isFunction(e) ? function(t) {
                de(this).wrapInner(e.call(this, t))
            } : function() {
                var t = de(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = de.isFunction(e);
            return this.each(function(n) {
                de(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                de.nodeName(this, "body") || de(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var ct, dt, ut, pt = /alpha\([^)]*\)/i,
        ft = /opacity\s*=\s*([^)]*)/,
        ht = /^(top|right|bottom|left)$/,
        mt = /^(none|table(?!-c[ea]).+)/,
        gt = /^margin/,
        vt = RegExp("^(" + ue + ")(.*)$", "i"),
        yt = RegExp("^(" + ue + ")(?!px)[a-z%]+$", "i"),
        bt = RegExp("^([+-])=(" + ue + ")", "i"),
        wt = {
            BODY: "block"
        },
        kt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        xt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Tt = ["Top", "Right", "Bottom", "Left"],
        Ct = ["Webkit", "O", "Moz", "ms"];
    de.fn.extend({
        css: function(e, n) {
            return de.access(this, function(e, n, i) {
                var o, r, s = {},
                    a = 0;
                if (de.isArray(n)) {
                    for (r = dt(e), o = n.length; o > a; a++) s[n[a]] = de.css(e, n[a], !1, r);
                    return s
                }
                return i !== t ? de.style(e, n, i) : de.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return C(this, !0)
        },
        hide: function() {
            return C(this)
        },
        toggle: function(e) {
            var t = "boolean" == typeof e;
            return this.each(function() {
                (t ? e : T(this)) ? de(this).show(): de(this).hide()
            })
        }
    }), de.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ut(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": de.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, i, o) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var r, s, a, l = de.camelCase(n),
                    c = e.style;
                if (n = de.cssProps[l] || (de.cssProps[l] = x(c, l)), a = de.cssHooks[n] || de.cssHooks[l], i === t) return a && "get" in a && (r = a.get(e, !1, o)) !== t ? r : c[n];
                if (s = typeof i, "string" === s && (r = bt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(de.css(e, n)), s = "number"), !(null == i || "number" === s && isNaN(i) || ("number" !== s || de.cssNumber[l] || (i += "px"), de.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (c[n] = "inherit"), a && "set" in a && (i = a.set(e, i, o)) === t))) try {
                    c[n] = i
                } catch (d) {}
            }
        },
        css: function(e, n, i, o) {
            var r, s, a, l = de.camelCase(n);
            return n = de.cssProps[l] || (de.cssProps[l] = x(e.style, l)), a = de.cssHooks[n] || de.cssHooks[l], a && "get" in a && (s = a.get(e, !0, i)), s === t && (s = ut(e, n, o)), "normal" === s && n in xt && (s = xt[n]), "" === i || i ? (r = parseFloat(s), i === !0 || de.isNumeric(r) ? r || 0 : s) : s
        }
    }), e.getComputedStyle ? (dt = function(t) {
        return e.getComputedStyle(t, null)
    }, ut = function(e, n, i) {
        var o, r, s, a = i || dt(e),
            l = a ? a.getPropertyValue(n) || a[n] : t,
            c = e.style;
        return a && ("" !== l || de.contains(e.ownerDocument, e) || (l = de.style(e, n)), yt.test(l) && gt.test(n) && (o = c.width, r = c.minWidth, s = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = a.width, c.width = o, c.minWidth = r, c.maxWidth = s)), l
    }) : V.documentElement.currentStyle && (dt = function(e) {
        return e.currentStyle
    }, ut = function(e, n, i) {
        var o, r, s, a = i || dt(e),
            l = a ? a[n] : t,
            c = e.style;
        return null == l && c && c[n] && (l = c[n]), yt.test(l) && !ht.test(n) && (o = c.left, r = e.runtimeStyle, s = r && r.left, s && (r.left = e.currentStyle.left), c.left = "fontSize" === n ? "1em" : l, l = c.pixelLeft + "px", c.left = o, s && (r.left = s)), "" === l ? "auto" : l
    }), de.each(["height", "width"], function(e, n) {
        de.cssHooks[n] = {
            get: function(e, i, o) {
                return i ? 0 === e.offsetWidth && mt.test(de.css(e, "display")) ? de.swap(e, kt, function() {
                    return E(e, n, o)
                }) : E(e, n, o) : t
            },
            set: function(e, t, i) {
                var o = i && dt(e);
                return S(e, t, i ? $(e, n, i, de.support.boxSizing && "border-box" === de.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }), de.support.opacity || (de.cssHooks.opacity = {
        get: function(e, t) {
            return ft.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                i = e.currentStyle,
                o = de.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                r = i && i.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === de.trim(r.replace(pt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = pt.test(r) ? r.replace(pt, o) : r + " " + o)
        }
    }), de(function() {
        de.support.reliableMarginRight || (de.cssHooks.marginRight = {
            get: function(e, n) {
                return n ? de.swap(e, {
                    display: "inline-block"
                }, ut, [e, "marginRight"]) : t
            }
        }), !de.support.pixelPosition && de.fn.position && de.each(["top", "left"], function(e, n) {
            de.cssHooks[n] = {
                get: function(e, i) {
                    return i ? (i = ut(e, n), yt.test(i) ? de(e).position()[n] + "px" : i) : t
                }
            }
        })
    }), de.expr && de.expr.filters && (de.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !de.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || de.css(e, "display"))
    }, de.expr.filters.visible = function(e) {
        return !de.expr.filters.hidden(e)
    }), de.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        de.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + Tt[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        }, gt.test(e) || (de.cssHooks[e + t].set = S)
    });
    var St = /%20/g,
        $t = /\[\]$/,
        Et = /\r?\n/g,
        Ot = /^(?:submit|button|image|reset|file)$/i,
        At = /^(?:input|select|textarea|keygen)/i;
    de.fn.extend({
        serialize: function() {
            return de.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = de.prop(this, "elements");
                return e ? de.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !de(this).is(":disabled") && At.test(this.nodeName) && !Ot.test(e) && (this.checked || !tt.test(e))
            }).map(function(e, t) {
                var n = de(this).val();
                return null == n ? null : de.isArray(n) ? de.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Et, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Et, "\r\n")
                }
            }).get()
        }
    }), de.param = function(e, n) {
        var i, o = [],
            r = function(e, t) {
                t = de.isFunction(t) ? t() : null == t ? "" : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t && (n = de.ajaxSettings && de.ajaxSettings.traditional), de.isArray(e) || e.jquery && !de.isPlainObject(e)) de.each(e, function() {
            r(this.name, this.value)
        });
        else
            for (i in e) N(i, e[i], n, r);
        return o.join("&").replace(St, "+")
    }, de.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        de.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), de.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Nt, Dt, Pt = de.now(),
        Mt = /\?/,
        jt = /#.*$/,
        Ht = /([?&])_=[^&]*/,
        Lt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        It = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        _t = /^(?:GET|HEAD)$/,
        Ft = /^\/\//,
        zt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        qt = de.fn.load,
        Wt = {},
        Bt = {},
        Rt = "*/".concat("*");
    try {
        Dt = J.href
    } catch (Gt) {
        Dt = V.createElement("a"), Dt.href = "", Dt = Dt.href
    }
    Nt = zt.exec(Dt.toLowerCase()) || [], de.fn.load = function(e, n, i) {
        if ("string" != typeof e && qt) return qt.apply(this, arguments);
        var o, r, s, a = this,
            l = e.indexOf(" ");
        return l >= 0 && (o = e.slice(l, e.length), e = e.slice(0, l)), de.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (s = "POST"), a.length > 0 && de.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n
        }).done(function(e) {
            r = arguments, a.html(o ? de("<div>").append(de.parseHTML(e)).find(o) : e)
        }).complete(i && function(e, t) {
            a.each(i, r || [e.responseText, t, e])
        }), this
    }, de.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        de.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), de.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Dt,
            type: "GET",
            isLocal: It.test(Nt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Rt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": de.parseJSON,
                "text xml": de.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? M(M(e, de.ajaxSettings), t) : M(de.ajaxSettings, e)
        },
        ajaxPrefilter: D(Wt),
        ajaxTransport: D(Bt),
        ajax: function(e, n) {
            function i(e, n, i, o) {
                var r, u, y, b, k, T = n;
                2 !== w && (w = 2, l && clearTimeout(l), d = t, a = o || "", x.readyState = e > 0 ? 4 : 0, r = e >= 200 && 300 > e || 304 === e, i && (b = j(p, x, i)), b = H(p, b, x, r), r ? (p.ifModified && (k = x.getResponseHeader("Last-Modified"), k && (de.lastModified[s] = k), k = x.getResponseHeader("etag"), k && (de.etag[s] = k)), 204 === e || "HEAD" === p.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state, u = b.data, y = b.error, r = !y)) : (y = T, (e || !T) && (T = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (n || T) + "", r ? m.resolveWith(f, [u, T, x]) : m.rejectWith(f, [x, T, y]), x.statusCode(v), v = t, c && h.trigger(r ? "ajaxSuccess" : "ajaxError", [x, p, r ? u : y]), g.fireWith(f, [x, T]), c && (h.trigger("ajaxComplete", [x, p]), --de.active || de.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e, e = t), n = n || {};
            var o, r, s, a, l, c, d, u, p = de.ajaxSetup({}, n),
                f = p.context || p,
                h = p.context && (f.nodeType || f.jquery) ? de(f) : de.event,
                m = de.Deferred(),
                g = de.Callbacks("once memory"),
                v = p.statusCode || {},
                y = {},
                b = {},
                w = 0,
                k = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!u)
                                for (u = {}; t = Lt.exec(a);) u[t[1].toLowerCase()] = t[2];
                            t = u[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return w || (e = b[n] = b[n] || e, y[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > w)
                                for (t in e) v[t] = [v[t], e[t]];
                            else x.always(e[x.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || k;
                        return d && d.abort(t), i(0, t), this
                    }
                };
            if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, p.url = ((e || p.url || Dt) + "").replace(jt, "").replace(Ft, Nt[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = de.trim(p.dataType || "*").toLowerCase().match(pe) || [""], null == p.crossDomain && (o = zt.exec(p.url.toLowerCase()), p.crossDomain = !(!o || o[1] === Nt[1] && o[2] === Nt[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (Nt[3] || ("http:" === Nt[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = de.param(p.data, p.traditional)), P(Wt, p, n, x), 2 === w) return x;
            c = p.global, c && 0 === de.active++ && de.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !_t.test(p.type), s = p.url, p.hasContent || (p.data && (s = p.url += (Mt.test(s) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Ht.test(s) ? s.replace(Ht, "$1_=" + Pt++) : s + (Mt.test(s) ? "&" : "?") + "_=" + Pt++)), p.ifModified && (de.lastModified[s] && x.setRequestHeader("If-Modified-Since", de.lastModified[s]), de.etag[s] && x.setRequestHeader("If-None-Match", de.etag[s])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", p.contentType), x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : p.accepts["*"]);
            for (r in p.headers) x.setRequestHeader(r, p.headers[r]);
            if (p.beforeSend && (p.beforeSend.call(f, x, p) === !1 || 2 === w)) return x.abort();
            k = "abort";
            for (r in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[r](p[r]);
            if (d = P(Bt, p, n, x)) {
                x.readyState = 1, c && h.trigger("ajaxSend", [x, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                    x.abort("timeout")
                }, p.timeout));
                try {
                    w = 1, d.send(y, i)
                } catch (T) {
                    if (!(2 > w)) throw T;
                    i(-1, T)
                }
            } else i(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return de.get(e, t, n, "json")
        },
        getScript: function(e, n) {
            return de.get(e, t, n, "script")
        }
    }), de.each(["get", "post"], function(e, n) {
        de[n] = function(e, i, o, r) {
            return de.isFunction(i) && (r = r || o, o = i, i = t), de.ajax({
                url: e,
                type: n,
                dataType: r,
                data: i,
                success: o
            })
        }
    }), de.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return de.globalEval(e), e
            }
        }
    }), de.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), de.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, i = V.head || de("head")[0] || V.documentElement;
            return {
                send: function(t, o) {
                    n = V.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || o(200, "success"))
                    }, i.insertBefore(n, i.firstChild)
                },
                abort: function() {
                    n && n.onload(t, !0)
                }
            }
        }
    });
    var Xt = [],
        Yt = /(=)\?(?=&|$)|\?\?/;
    de.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Xt.pop() || de.expando + "_" + Pt++;
            return this[e] = !0, e
        }
    }), de.ajaxPrefilter("json jsonp", function(n, i, o) {
        var r, s, a, l = n.jsonp !== !1 && (Yt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(n.data) && "data");
        return l || "jsonp" === n.dataTypes[0] ? (r = n.jsonpCallback = de.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Yt, "$1" + r) : n.jsonp !== !1 && (n.url += (Mt.test(n.url) ? "&" : "?") + n.jsonp + "=" + r), n.converters["script json"] = function() {
            return a || de.error(r + " was not called"), a[0]
        }, n.dataTypes[0] = "json", s = e[r], e[r] = function() {
            a = arguments
        }, o.always(function() {
            e[r] = s, n[r] && (n.jsonpCallback = i.jsonpCallback, Xt.push(r)), a && de.isFunction(s) && s(a[0]), a = s = t
        }), "script") : t
    });
    var Ut, Jt, Vt = 0,
        Qt = e.ActiveXObject && function() {
            var e;
            for (e in Ut) Ut[e](t, !0)
        };
    de.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && L() || I()
    } : L, Jt = de.ajaxSettings.xhr(), de.support.cors = !!Jt && "withCredentials" in Jt, Jt = de.support.ajax = !!Jt, Jt && de.ajaxTransport(function(n) {
        if (!n.crossDomain || de.support.cors) {
            var i;
            return {
                send: function(o, r) {
                    var s, a, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                        for (a in n.xhrFields) l[a] = n.xhrFields[a];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (a in o) l.setRequestHeader(a, o[a])
                    } catch (c) {}
                    l.send(n.hasContent && n.data || null), i = function(e, o) {
                        var a, c, d, u;
                        try {
                            if (i && (o || 4 === l.readyState))
                                if (i = t, s && (l.onreadystatechange = de.noop, Qt && delete Ut[s]), o) 4 !== l.readyState && l.abort();
                                else {
                                    u = {}, a = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (u.text = l.responseText);
                                    try {
                                        d = l.statusText
                                    } catch (p) {
                                        d = ""
                                    }
                                    a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = u.text ? 200 : 404
                                }
                        } catch (f) {
                            o || r(-1, f)
                        }
                        u && r(a, d, u, c)
                    }, n.async ? 4 === l.readyState ? setTimeout(i) : (s = ++Vt, Qt && (Ut || (Ut = {}, de(e).unload(Qt)), Ut[s] = i), l.onreadystatechange = i) : i()
                },
                abort: function() {
                    i && i(t, !0)
                }
            }
        }
    });
    var Kt, Zt, en = /^(?:toggle|show|hide)$/,
        tn = RegExp("^(?:([+-])=|)(" + ue + ")([a-z%]*)$", "i"),
        nn = /queueHooks$/,
        on = [W],
        rn = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    i = n.cur(),
                    o = tn.exec(t),
                    r = o && o[3] || (de.cssNumber[e] ? "" : "px"),
                    s = (de.cssNumber[e] || "px" !== r && +i) && tn.exec(de.css(n.elem, e)),
                    a = 1,
                    l = 20;
                if (s && s[3] !== r) {
                    r = r || s[3], o = o || [], s = +i || 1;
                    do a = a || ".5", s /= a, de.style(n.elem, e, s + r); while (a !== (a = n.cur() / i) && 1 !== a && --l)
                }
                return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]), n
            }]
        };
    de.Animation = de.extend(z, {
        tweener: function(e, t) {
            de.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, i = 0, o = e.length; o > i; i++) n = e[i], rn[n] = rn[n] || [], rn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? on.unshift(e) : on.push(e)
        }
    }), de.Tween = B, B.prototype = {
        constructor: B,
        init: function(e, t, n, i, o, r) {
            this.elem = e, this.prop = n, this.easing = o || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (de.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = B.propHooks[this.prop];
            return e && e.get ? e.get(this) : B.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = B.propHooks[this.prop];
            return this.pos = t = this.options.duration ? de.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : B.propHooks._default.set(this), this
        }
    }, B.prototype.init.prototype = B.prototype, B.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = de.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                de.fx.step[e.prop] ? de.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[de.cssProps[e.prop]] || de.cssHooks[e.prop]) ? de.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, B.propHooks.scrollTop = B.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, de.each(["toggle", "show", "hide"], function(e, t) {
        var n = de.fn[t];
        de.fn[t] = function(e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, i, o)
        }
    }), de.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(T).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, i)
        },
        animate: function(e, t, n, i) {
            var o = de.isEmptyObject(e),
                r = de.speed(t, n, i),
                s = function() {
                    var t = z(this, de.extend({}, e), r);
                    (o || de._data(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(e, n, i) {
            var o = function(e) {
                var t = e.stop;
                delete e.stop, t(i)
            };
            return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    r = de.timers,
                    s = de._data(this);
                if (n) s[n] && s[n].stop && o(s[n]);
                else
                    for (n in s) s[n] && s[n].stop && nn.test(n) && o(s[n]);
                for (n = r.length; n--;) r[n].elem !== this || null != e && r[n].queue !== e || (r[n].anim.stop(i), t = !1, r.splice(n, 1));
                (t || !i) && de.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = de._data(this),
                    i = n[e + "queue"],
                    o = n[e + "queueHooks"],
                    r = de.timers,
                    s = i ? i.length : 0;
                for (n.finish = !0, de.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), de.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        de.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), de.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? de.extend({}, e) : {
            complete: n || !n && t || de.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !de.isFunction(t) && t
        };
        return i.duration = de.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in de.fx.speeds ? de.fx.speeds[i.duration] : de.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
            de.isFunction(i.old) && i.old.call(this), i.queue && de.dequeue(this, i.queue)
        }, i
    }, de.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, de.timers = [], de.fx = B.prototype.init, de.fx.tick = function() {
        var e, n = de.timers,
            i = 0;
        for (Kt = de.now(); n.length > i; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
        n.length || de.fx.stop(), Kt = t
    }, de.fx.timer = function(e) {
        e() && de.timers.push(e) && de.fx.start()
    }, de.fx.interval = 13, de.fx.start = function() {
        Zt || (Zt = setInterval(de.fx.tick, de.fx.interval))
    }, de.fx.stop = function() {
        clearInterval(Zt), Zt = null
    }, de.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, de.fx.step = {}, de.expr && de.expr.filters && (de.expr.filters.animated = function(e) {
        return de.grep(de.timers, function(t) {
            return e === t.elem
        }).length
    }), de.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            de.offset.setOffset(this, e, t)
        });
        var n, i, o = {
                top: 0,
                left: 0
            },
            r = this[0],
            s = r && r.ownerDocument;
        return s ? (n = s.documentElement, de.contains(n, r) ? (typeof r.getBoundingClientRect !== U && (o = r.getBoundingClientRect()), i = G(s), {
            top: o.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: o.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : o) : void 0
    }, de.offset = {
        setOffset: function(e, t, n) {
            var i = de.css(e, "position");
            "static" === i && (e.style.position = "relative");
            var o, r, s = de(e),
                a = s.offset(),
                l = de.css(e, "top"),
                c = de.css(e, "left"),
                d = ("absolute" === i || "fixed" === i) && de.inArray("auto", [l, c]) > -1,
                u = {},
                p = {};
            d ? (p = s.position(), o = p.top, r = p.left) : (o = parseFloat(l) || 0, r = parseFloat(c) || 0), de.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (u.top = t.top - a.top + o), null != t.left && (u.left = t.left - a.left + r), "using" in t ? t.using.call(e, u) : s.css(u)
        }
    }, de.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = {
                        top: 0,
                        left: 0
                    },
                    i = this[0];
                return "fixed" === de.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), de.nodeName(e[0], "html") || (n = e.offset()), n.top += de.css(e[0], "borderTopWidth", !0), n.left += de.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - de.css(i, "marginTop", !0),
                    left: t.left - n.left - de.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Q; e && !de.nodeName(e, "html") && "static" === de.css(e, "position");) e = e.offsetParent;
                return e || Q
            })
        }
    }), de.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var i = /Y/.test(n);
        de.fn[e] = function(o) {
            return de.access(this, function(e, o, r) {
                var s = G(e);
                return r === t ? s ? n in s ? s[n] : s.document.documentElement[o] : e[o] : (s ? s.scrollTo(i ? de(s).scrollLeft() : r, i ? r : de(s).scrollTop()) : e[o] = r, t)
            }, e, o, arguments.length, null)
        }
    }), de.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        de.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(i, o) {
            de.fn[o] = function(o, r) {
                var s = arguments.length && (i || "boolean" != typeof o),
                    a = i || (o === !0 || r === !0 ? "margin" : "border");
                return de.access(this, function(n, i, o) {
                    var r;
                    return de.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (r = n.documentElement, Math.max(n.body["scroll" + e], r["scroll" + e], n.body["offset" + e], r["offset" + e], r["client" + e])) : o === t ? de.css(n, i, a) : de.style(n, i, o, a)
                }, n, s ? o : t, s, null)
            }
        })
    }), de.fn.size = function() {
        return this.length
    }, de.fn.andSelf = de.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = de : (e.jQuery = e.$ = de, "function" == typeof define && define.amd && define("jquery", [], function() {
        return de
    }))
}(window),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, i) {
            var o, r, s, a = this;
            if (a.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="previous">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="next">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, t) {
                        return '<button type="button" data-role="none">' + (t + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
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
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0
                }, a.initials = {
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
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                }, e.extend(a, a.initials), a.activeBreakpoint = null, a.animType = null, a.animProp = null, a.breakpoints = [], a.breakpointSettings = [], a.cssTransitions = !1, a.hidden = "hidden", a.paused = !1, a.positionProp = null, a.respondTo = null, a.rowCount = 1, a.shouldClick = !0, a.$slider = e(t), a.$slidesCache = null, a.transformType = null, a.transitionType = null, a.visibilityChange = "visibilitychange", a.windowWidth = 0, a.windowTimer = null, o = e(t).data("slick") || {}, a.options = e.extend({}, a.defaults, o, i), a.currentSlide = a.options.initialSlide, a.originalSettings = a.options, r = a.options.responsive || null, r && r.length > -1) {
                a.respondTo = a.options.respondTo || "window";
                for (s in r) r.hasOwnProperty(s) && (a.breakpoints.push(r[s].breakpoint), a.breakpointSettings[r[s].breakpoint] = r[s].settings);
                a.breakpoints.sort(function(e, t) {
                    return a.options.mobileFirst === !0 ? e - t : t - e
                })
            }
            "undefined" != typeof document.mozHidden ? (a.hidden = "mozHidden", a.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (a.hidden = "msHidden", a.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (a.hidden = "webkitHidden", a.visibilityChange = "webkitvisibilitychange"), a.autoPlay = e.proxy(a.autoPlay, a), a.autoPlayClear = e.proxy(a.autoPlayClear, a), a.changeSlide = e.proxy(a.changeSlide, a), a.clickHandler = e.proxy(a.clickHandler, a), a.selectHandler = e.proxy(a.selectHandler, a), a.setPosition = e.proxy(a.setPosition, a), a.swipeHandler = e.proxy(a.swipeHandler, a), a.dragHandler = e.proxy(a.dragHandler, a), a.keyHandler = e.proxy(a.keyHandler, a), a.autoPlayIterator = e.proxy(a.autoPlayIterator, a), a.instanceUid = n++, a.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, a.init(), a.checkResponsive(!0)
        }
        var n = 0;
        return t
    }(), t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
        var o = this;
        if ("boolean" == typeof n) i = n, n = null;
        else if (0 > n || n >= o.slideCount) return !1;
        o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : i === !0 ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, n) {
        var i = {},
            o = this;
        o.animateHeight(), o.options.rtl === !0 && o.options.vertical === !1 && (t = -t), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate({
            left: t
        }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
            top: t
        }, o.options.speed, o.options.easing, n) : o.cssTransitions === !1 ? (o.options.rtl === !0 && (o.currentLeft = -o.currentLeft), e({
            animStart: o.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(e) {
                e = Math.ceil(e), o.options.vertical === !1 ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
            },
            complete: function() {
                n && n.call()
            }
        })) : (o.applyTransition(), t = Math.ceil(t), i[o.animType] = o.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
            o.disableTransition(), n.call()
        }, o.options.speed))
    }, t.prototype.asNavFor = function(t) {
        var n = this,
            i = null !== n.options.asNavFor ? e(n.options.asNavFor).slick("getSlick") : null;
        null !== i && i.slideHandler(t, !0)
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this;
        e.options.infinite === !1 ? 1 === e.direction ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide - 1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
    }, t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow = e(t.options.prevArrow), t.$nextArrow = e(t.options.nextArrow), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.appendTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled"))
    }, t.prototype.buildDots = function() {
        var t, n, i = this;
        if (i.options.dots === !0 && i.slideCount > i.options.slidesToShow) {
            for (n = '<ul class="' + i.options.dotsClass + '">', t = 0; t <= i.getDotCount(); t += 1) n += "<li>" + i.options.customPaging.call(this, i, t) + "</li>";
            n += "</ul>", i.$dots = e(n).appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
            e(n).attr("data-slick-index", t)
        }), t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.options.accessibility === !0 && t.$list.prop("tabIndex", 0), t.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, n, i, o, r, s, a = this;
        if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
            for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; o > e; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (n = 0; n < a.options.slidesPerRow; n++) {
                        var d = e * s + (t * a.options.slidesPerRow + n);
                        r.get(d) && c.appendChild(r.get(d))
                    }
                    l.appendChild(c)
                }
                i.appendChild(l)
            }
            a.$slider.html(i), a.$slider.children().children().children().width(100 / a.options.slidesPerRow + "%").css({
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t) {
        var n, i, o, r = this,
            s = r.$slider.width(),
            a = window.innerWidth || e(window).width();
        if ("window" === r.respondTo ? o = a : "slider" === r.respondTo ? o = s : "min" === r.respondTo && (o = Math.min(a, s)), r.originalSettings.responsive && r.originalSettings.responsive.length > -1 && null !== r.originalSettings.responsive) {
            i = null;
            for (n in r.breakpoints) r.breakpoints.hasOwnProperty(n) && (r.originalSettings.mobileFirst === !1 ? o < r.breakpoints[n] && (i = r.breakpoints[n]) : o > r.breakpoints[n] && (i = r.breakpoints[n]));
            null !== i ? null !== r.activeBreakpoint ? i !== r.activeBreakpoint && (r.activeBreakpoint = i, "unslick" === r.breakpointSettings[i] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[i]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())) : (r.activeBreakpoint = i, "unslick" === r.breakpointSettings[i] ? r.unslick() : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[i]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh())
        }
    }, t.prototype.changeSlide = function(t, n) {
        var i, o, r, s = this,
            a = e(t.target);
        switch (a.is("a") && t.preventDefault(), r = s.slideCount % s.options.slidesToScroll !== 0, i = r ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
            case "previous":
                o = 0 === i ? s.options.slidesToScroll : s.options.slidesToShow - i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, n);
                break;
            case "next":
                o = 0 === i ? s.options.slidesToScroll : i, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, n);
                break;
            case "index":
                var l = 0 === t.data.index ? 0 : t.data.index || e(t.target).parent().index() * s.options.slidesToScroll;
                s.slideHandler(s.checkNavigable(l), !1, n);
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, n, i = this;
        if (t = i.getNavigableIndexes(), n = 0, e > t[t.length - 1]) e = t[t.length - 1];
        else
            for (var o in t) {
                if (e < t[o]) {
                    e = n;
                    break
                }
                n = t[o]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).off("click.slick", t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).off("mouseenter.slick", t.setPaused.bind(t, !0)).off("mouseleave.slick", t.setPaused.bind(t, !1)), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), t.options.autoplay === !0 && e(document).off(t.visibilityChange, t.visibility), t.$list.off("mouseenter.slick", t.setPaused.bind(t, !0)), t.$list.off("mouseleave.slick", t.setPaused.bind(t, !1)), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.html(e))
    }, t.prototype.clickHandler = function(e) {
        var t = this;
        t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function() {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible").attr("aria-hidden", "true").removeAttr("data-slick-index").css({
            position: "",
            left: "",
            top: "",
            zIndex: "",
            opacity: "",
            width: ""
        }), t.$slider.html(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized")
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            n = {};
        n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
    }, t.prototype.fadeSlide = function(e, t) {
        var n = this;
        n.cssTransitions === !1 ? (n.$slides.eq(e).css({
            zIndex: 1e3
        }), n.$slides.eq(e).animate({
            opacity: 1
        }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
            opacity: 1,
            zIndex: 1e3
        }), t && setTimeout(function() {
            n.disableTransition(e), t.call()
        }, n.options.speed))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var e = this;
        return e.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            n = 0,
            i = 0;
        if (e.options.infinite === !0) i = Math.ceil(e.slideCount / e.options.slidesToScroll);
        else if (e.options.centerMode === !0) i = e.slideCount;
        else
            for (; t < e.slideCount;) ++i, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return i - 1
    }, t.prototype.getLeft = function(e) {
        var t, n, i, o = this,
            r = 0;
        return o.slideOffset = 0, n = o.$slides.first().outerHeight(), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = n * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && e + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (e > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (e - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (e - o.slideCount)) * n * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * n * -1))) : e + o.options.slidesToShow > o.slideCount && (o.slideOffset = (e + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (e + o.options.slidesToShow - o.slideCount) * n), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), t = o.options.vertical === !1 ? e * o.slideWidth * -1 + o.slideOffset : e * n * -1 + r, o.options.variableWidth === !0 && (i = o.$slideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? e : e + o.options.slidesToShow), t = i[0] ? -1 * i[0].offsetLeft : 0, o.options.centerMode === !0 && (i = o.$slideTrack.children(".slick-slide").eq(o.options.infinite === !1 ? e : e + o.options.slidesToShow + 1), t = i[0] ? -1 * i[0].offsetLeft : 0, t += (o.$list.width() - i.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        var t = this;
        return t.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            n = 0,
            i = 0,
            o = [];
        for (t.options.infinite === !1 ? (e = t.slideCount - t.options.slidesToShow + 1, t.options.centerMode === !0 && (e = t.slideCount)) : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); e > n;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, n, i, o = this;
        return i = o.options.centerMode === !0 ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, o.options.swipeToSlide === !0 ? (o.$slideTrack.find(".slick-slide").each(function(t, r) {
            return r.offsetLeft - i + e(r).outerWidth() / 2 > -1 * o.swipeLeft ? (n = r, !1) : void 0
        }), t = Math.abs(e(n).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        var n = this;
        n.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function() {
        var t = this;
        e(t.$slider).hasClass("slick-initialized") || (e(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots()), t.$slider.trigger("init", [t])
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.on("click.slick", {
            message: "next"
        }, e.changeSlide))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).on("mouseenter.slick", t.setPaused.bind(t, !0)).on("mouseleave.slick", t.setPaused.bind(t, !1))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), t.options.autoplay === !0 && e(document).on(t.visibilityChange, t.visibility.bind(t)), t.$list.on("mouseenter.slick", t.setPaused.bind(t, !0)), t.$list.on("mouseleave.slick", t.setPaused.bind(t, !1)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange.bind(t)), e(window).on("resize.slick.slick-" + t.instanceUid, t.resize.bind(t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    n = e(this).attr("data-lazy"),
                    i = document.createElement("img");
                i.onload = function() {
                    t.animate({
                        opacity: 1
                    }, 200)
                }, i.src = n, t.css({
                    opacity: 0
                }).attr("src", n).removeAttr("data-lazy").removeClass("slick-loading")
            })
        }
        var n, i, o, r, s = this;
        s.options.centerMode === !0 ? s.options.infinite === !0 ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1), r = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = o + s.options.slidesToShow, s.options.fade === !0 && (o > 0 && o--, r <= s.slideCount && r++)), n = s.$slider.find(".slick-slide").slice(o, r), t(n), s.slideCount <= s.options.slidesToShow ? (i = s.$slider.find(".slick-slide"), t(i)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (i = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), t(i)) : 0 === s.currentSlide && (i = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow), t(i))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.paused = !1, e.autoPlay()
    }, t.prototype.postSlide = function(e) {
        var t = this;
        t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay()
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        var e = this;
        e.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function() {
        var t, n, i = this;
        t = e("img[data-lazy]", i.$slider).length, t > 0 && (n = e("img[data-lazy]", i.$slider).first(), n.attr("src", n.attr("data-lazy")).removeClass("slick-loading").load(function() {
            n.removeAttr("data-lazy"), i.progressiveLazyLoad(), i.options.adaptiveHeight === !0 && i.setPosition()
        }).error(function() {
            n.removeAttr("data-lazy"), i.progressiveLazyLoad()
        }))
    }, t.prototype.refresh = function() {
        var t = this,
            n = t.currentSlide;
        t.destroy(), e.extend(t, t.initials), t.init(), t.changeSlide({
            data: {
                message: "index",
                index: n
            }
        }, !1)
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(0), t.setPosition(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
        var i = this;
        return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : i.slideCount - 1) : e = t === !0 ? --e : e, i.slideCount < 1 || 0 > e || e > i.slideCount - 1 ? !1 : (i.unload(), n === !0 ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
    }, t.prototype.setCSS = function(e) {
        var t, n, i = this,
            o = {};
        i.options.rtl === !0 && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, i.transformsEnabled === !1 ? i.$slideTrack.css(o) : (o = {}, i.cssTransitions === !1 ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, n = this;
        n.$slides.each(function(i, o) {
            t = n.slideWidth * i * -1, e(o).css(n.options.rtl === !0 ? {
                position: "relative",
                right: t,
                top: 0,
                zIndex: 800,
                opacity: 0
            } : {
                position: "relative",
                left: t,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        }), n.$slides.eq(n.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function(e, t, n) {
        var i = this;
        i.options[e] = t, n === !0 && (i.unload(), i.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && e.options.useCSS === !0 && (e.cssTransitions = !0), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = null !== e.animType && e.animType !== !1
    }, t.prototype.setSlideClasses = function(e) {
        var t, n, i, o, r = this;
        r.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true").removeClass("slick-center"), n = r.$slider.find(".slick-slide"), r.options.centerMode === !0 ? (t = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = r.options.infinite === !0 ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, n, i, o = this;
        if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (n = null, o.slideCount > o.options.slidesToShow)) {
            for (i = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (t = 0; i > t; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.setPaused = function(e) {
        var t = this;
        t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (t.paused = e, t.autoPlayClear())
    }, t.prototype.selectHandler = function(t) {
        var n = this,
            i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            o = parseInt(i.attr("data-slick-index"));
        return o || (o = 0), n.slideCount <= n.options.slidesToShow ? (n.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true"), n.$slides.eq(o).addClass("slick-active").attr("aria-hidden", "false"), n.options.centerMode === !0 && (n.$slider.find(".slick-slide").removeClass("slick-center"), n.$slides.eq(o).addClass("slick-center")), void n.asNavFor(o)) : void n.slideHandler(o)
    }, t.prototype.slideHandler = function(e, t, n) {
        var i, o, r, s, a = null,
            l = this;
        return t = t || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === e || l.slideCount <= l.options.slidesToShow ? void 0 : (t === !1 && l.asNavFor(e), i = e, a = l.getLeft(i), s = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > e || e > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
            l.postSlide(i)
        }) : l.postSlide(i))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > e || e > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (i = l.currentSlide, n !== !0 ? l.animateSlide(s, function() {
            l.postSlide(i)
        }) : l.postSlide(i))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > i ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + i : i >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : i - l.slideCount : i, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, o]), r = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (n !== !0 ? l.fadeSlide(o, function() {
            l.postSlide(o)
        }) : l.postSlide(o), void l.animateHeight()) : void(n !== !0 ? l.animateSlide(a, function() {
            l.postSlide(o)
        }) : l.postSlide(o))))
    }, t.prototype.startLoad = function() {
        var e = this;
        e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, n, i, o = this;
        return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), i = Math.round(180 * n / Math.PI), 0 > i && (i = 360 - Math.abs(i)), 45 >= i && i >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= i && i >= 315 ? o.options.rtl === !1 ? "left" : "right" : i >= 135 && 225 >= i ? o.options.rtl === !1 ? "right" : "left" : o.options.verticalSwiping === !0 ? i >= 35 && 135 >= i ? "left" : "right" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, n = this;
        if (n.dragging = !1, n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0, void 0 === n.touchObject.curX) return !1;
        if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) switch (n.swipeDirection()) {
            case "left":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.slideHandler(t), n.currentDirection = 0, n.touchObject = {}, n.$slider.trigger("swipe", [n, "left"]);
                break;
            case "right":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.slideHandler(t), n.currentDirection = 1, n.touchObject = {}, n.$slider.trigger("swipe", [n, "right"])
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, n, i, o, r, s = this;
        return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !s.dragging || r && 1 !== r.length ? !1 : (t = s.getLeft(s.currentSlide), s.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, s.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curX - s.touchObject.startX, 2))), s.options.verticalSwiping === !0 && (s.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(s.touchObject.curY - s.touchObject.startY, 2)))), n = s.swipeDirection(), "vertical" !== n ? (void 0 !== e.originalEvent && s.touchObject.swipeLength > 4 && e.preventDefault(), o = (s.options.rtl === !1 ? 1 : -1) * (s.touchObject.curX > s.touchObject.startX ? 1 : -1), s.options.verticalSwiping === !0 && (o = s.touchObject.curY > s.touchObject.startY ? 1 : -1), i = s.touchObject.swipeLength, s.touchObject.edgeHit = !1, s.options.infinite === !1 && (0 === s.currentSlide && "right" === n || s.currentSlide >= s.getDotCount() && "left" === n) && (i = s.touchObject.swipeLength * s.options.edgeFriction, s.touchObject.edgeHit = !0), s.swipeLeft = s.options.vertical === !1 ? t + i * o : t + i * (s.$list.height() / s.listWidth) * o, s.options.verticalSwiping === !0 && (s.swipeLeft = t + i * o), s.options.fade === !0 || s.options.touchMove === !1 ? !1 : s.animating === !0 ? (s.swipeLeft = null, !1) : void s.setCSS(s.swipeLeft)) : void 0)
    }, t.prototype.swipeStart = function(e) {
        var t, n = this;
        return 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(n.dragging = !0))
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && "object" != typeof t.options.prevArrow && t.$prevArrow.remove(), t.$nextArrow && "object" != typeof t.options.nextArrow && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function() {
        var e = this;
        e.destroy()
    }, t.prototype.updateArrows = function() {
        var e, t = this;
        e = Math.floor(t.options.slidesToShow / 2), t.options.arrows === !0 && t.options.infinite !== !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.removeClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled"), t.$nextArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && t.options.centerMode === !1 ? (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")) : t.currentSlide >= t.slideCount - 1 && t.options.centerMode === !0 && (t.$nextArrow.addClass("slick-disabled"), t.$prevArrow.removeClass("slick-disabled")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, t.prototype.visibility = function() {
        var e = this;
        document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : (e.paused = !1, e.autoPlay())
    }, e.fn.slick = function() {
        var e, n = this,
            i = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            r = n.length,
            s = 0;
        for (s; r > s; s++)
            if ("object" == typeof i || "undefined" == typeof i ? n[s].slick = new t(n[s], i) : e = n[s].slick[i].apply(n[s].slick, o), "undefined" != typeof e) return e;
        return n
    }
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, n, i, o, r, s, a = "Close",
        l = "BeforeClose",
        c = "AfterClose",
        d = "BeforeAppend",
        u = "MarkupParse",
        p = "Open",
        f = "Change",
        h = "mfp",
        m = "." + h,
        g = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        b = function() {},
        w = !!window.jQuery,
        k = e(window),
        x = function(e, n) {
            t.ev.on(h + e + m, n)
        },
        T = function(t, n, i, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), o ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        C = function(n, i) {
            t.ev.triggerHandler(h + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        S = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        $ = function() {
            e.magnificPopup.instance || (t = new b, t.init(), e.magnificPopup.instance = t)
        },
        E = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    b.prototype = {
        constructor: b,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = E(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var o;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var s, a = n.items;
                for (o = 0; o < a.length; o++)
                    if (s = a[o], s.parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = o;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], r = "", t.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) : i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = T("bg").on("click" + m, function() {
                t.close()
            }), t.wrap = T("wrap").attr("tabindex", -1).on("click" + m, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = T("container", t.wrap)), t.contentContainer = T("content"), t.st.preloader && (t.preloader = T("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (o = 0; o < l.length; o++) {
                var c = l[o];
                c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
            }
            C("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (x(u, function(e, t, n, i) {
                n.close_replaceWith = S(i.type)
            }), r += " mfp-close-btn-in") : t.wrap.append(S())), t.st.alignTop && (r += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            } : {
                top: k.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && i.on("keyup" + m, function(e) {
                27 === e.keyCode && t.close()
            }), k.on("resize" + m, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
            var d = t.wH = k.height(),
                f = {};
            if (t.fixedContentPos && t._hasScrollBar(d)) {
                var h = t._getScrollbarSize();
                h && (f.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
            var v = t.st.mainClass;
            return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), C("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(g), t._setFocus()) : t.bgOverlay.addClass(g), i.on("focusin" + m, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(d), C(p), n
        },
        close: function() {
            t.isOpen && (C(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            C(a);
            var n = v + " " + g + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            i.off("keyup" + m + " focusin" + m), t.ev.off(m), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), t.st.showCloseBtn && (!t.st.closeBtnInside || t.currTemplate[t.currItem.type] === !0) && t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, C(c)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || k.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), C("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (C("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var r = t.st[i] ? t.st[i].markup : !1;
                C("FirstMarkupParse", r), t.currTemplate[i] = r ? e(r) : !0
            }
            o && o !== n.type && t.container.removeClass("mfp-" + o + "-holder");
            var s = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(s, i), n.preloaded = !0, C(f, n), o = n.type, t.container.prepend(t.contentContainer), C("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(S()) : t.content = e : t.content = "", C(d), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, o = t.items[n];
            if (o.tagName ? o = {
                    el: e(o)
                } : (i = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = t.types, s = 0; s < r.length; s++)
                    if (o.el.hasClass("mfp-" + r[s])) {
                        i = r[s];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = i || t.st.type || "inline", o.index = n, o.parsed = !0, t.items[n] = o, C("ElementParse", o), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var o = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(o).on(o, i)) : (n.isObj = !1, n.delegate ? e.off(o).on(o, n.delegate, i) : (n.items = e, e.off(o).on(o, i)))
        },
        _openClick: function(n, i, o) {
            var r = void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var s = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (s)
                    if (e.isFunction(s)) {
                        if (!s.call(t)) return !0
                    } else if (k.width() < s) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), o.el = e(n.mfpEl), o.delegate && (o.items = i.find(o.delegate)), t.open(o)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), !i && "loading" === e && (i = t.st.tLoading);
                var o = {
                    status: e,
                    text: i
                };
                C("UpdateStatus", o), e = o.status, i = o.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (i && o) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (o && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || k.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var o;
            i.data && (n = e.extend(i.data, n)), C(u, [t, n, i]), e.each(n, function(e, n) {
                if (void 0 === n || n === !1) return !0;
                if (o = e.split("_"), o.length > 1) {
                    var i = t.find(m + "-" + o[0]);
                    if (i.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? i[0] !== n[0] && i.replaceWith(n) : "img" === r ? i.is("img") ? i.attr("src", n) : i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') : i.attr(o[1], n)
                    }
                } else t.find(m + "-" + e).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function(t, n) {
            return $(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(n) {
        $();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var o, r = w ? i.data("magnificPopup") : i[0].magnificPopup,
                    s = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[s] : (o = i, r.delegate && (o = o.find(r.delegate)), o = o.eq(s)), t._openClick({
                    mfpEl: o
                }, i, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), w ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var O, A = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = t.st.image,
                    i = ".image";
                t.types.push("image"), x(p + i, function() {
                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
                }), x(a + i, function() {
                    n.cursor && e(document.body).removeClass(n.cursor), k.off("resize" + m)
                }), x("Resize" + i, t.resizeImage), t.isLowIE && x("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, O && clearInterval(O), e.isCheckingImgSize = !1, C("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    o = function(r) {
                        O && clearInterval(O), O = setInterval(function() {
                            return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(O), n++, 3 === n ? o(10) : 40 === n ? o(50) : 100 === n && o(500), void 0)
                        }, r)
                    };
                o(1)
            },
            getImage: function(n, i) {
                var o = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, C("ImageLoadComplete")) : (o++, 200 > o ? setTimeout(r, 100) : s()))
                    },
                    s = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", a.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    a = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", r).on("error.mfploader", s), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: A(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (O && clearInterval(O), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", a.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var N, D = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var o, r, s = n.duration,
                        c = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = i, t.css(o), t
                        },
                        d = function() {
                            t.content.css("visibility", "visible")
                        };
                    x("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void d();
                            r = c(e), r.css(t._getOffset()), t.wrap.append(r), o = setTimeout(function() {
                                r.css(t._getOffset(!0)), o = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), e = r = null, C("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }), x(l + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(o), t.st.removalDelay = s, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = c(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), x(a + i, function() {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function(n) {
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var o = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    s = parseInt(i.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - r;
                var a = {
                    width: i.width(),
                    height: (w ? i.innerHeight() : i[0].offsetHeight) - s - r
                };
                return D() ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left, a.top = o.top), a
            }
        }
    }), $()
}),
function(e) {
    "function" == typeof define && define.amd ? define("picker", ["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : this.Picker = e(jQuery)
}(function(e) {
    function t(r, s, l, p) {
        function f() {
            return t._.node("div", t._.node("div", t._.node("div", t._.node("div", E.component.nodes(x.open), C.box), C.wrap), C.frame), C.holder, 'tabindex="-1"')
        }

        function h() {
            S.data(s, E).addClass(C.input).val(S.data("value") ? E.get("select", T.format) : r.value), T.editable || S.on("focus." + x.id + " click." + x.id, function(e) {
                e.preventDefault(), E.open()
            }).on("keydown." + x.id, w), o(r, {
                haspopup: !0,
                expanded: !1,
                readonly: !1,
                owns: r.id + "_root"
            })
        }

        function m() {
            o(E.$root[0], "hidden", !0)
        }

        function g() {
            E.$holder.on({
                keydown: w,
                "focus.toOpen": b,
                blur: function() {
                    S.removeClass(C.target)
                },
                focusin: function(e) {
                    E.$root.removeClass(C.focused), e.stopPropagation()
                },
                "mousedown click": function(t) {
                    var n = t.target;
                    n != E.$holder[0] && (t.stopPropagation(), "mousedown" != t.type || e(n).is("input, select, textarea, button, option") || (t.preventDefault(), E.$holder[0].focus()))
                }
            }).on("click", "[data-pick], [data-nav], [data-clear], [data-close]", function() {
                var t = e(this),
                    n = t.data(),
                    i = t.hasClass(C.navDisabled) || t.hasClass(C.disabled),
                    o = a();
                o = o && (o.type || o.href), (i || o && !e.contains(E.$root[0], o)) && E.$holder[0].focus(), !i && n.nav ? E.set("highlight", E.component.item.highlight, {
                    nav: n.nav
                }) : !i && "pick" in n ? (E.set("select", n.pick), T.closeOnSelect && E.close(!0)) : n.clear ? (E.clear(), T.closeOnClear && E.close(!0)) : n.close && E.close(!0)
            })
        }

        function v() {
            var t;
            T.hiddenName === !0 ? (t = r.name, r.name = "") : (t = ["string" == typeof T.hiddenPrefix ? T.hiddenPrefix : "", "string" == typeof T.hiddenSuffix ? T.hiddenSuffix : "_submit"], t = t[0] + r.name + t[1]), E._hidden = e('<input type=hidden name="' + t + '"' + (S.data("value") || r.value ? ' value="' + E.get("select", T.formatSubmit) + '"' : "") + ">")[0], S.on("change." + x.id, function() {
                E._hidden.value = r.value ? E.get("select", T.formatSubmit) : ""
            })
        }

        function y() {
            k && u ? E.$holder.find("." + C.frame).one("transitionend", function() {
                E.$holder[0].focus()
            }) : E.$holder[0].focus()
        }

        function b(e) {
            e.stopPropagation(), S.addClass(C.target), E.$root.addClass(C.focused), E.open()
        }

        function w(e) {
            var t = e.keyCode,
                n = /^(8|46)$/.test(t);
            return 27 == t ? (E.close(!0), !1) : void((32 == t || n || !x.open && E.component.key[t]) && (e.preventDefault(), e.stopPropagation(), n ? E.clear().close() : E.open()))
        }
        if (!r) return t;
        var k = !1,
            x = {
                id: r.id || "P" + Math.abs(~~(Math.random() * new Date))
            },
            T = l ? e.extend(!0, {}, l.defaults, p) : p || {},
            C = e.extend({}, t.klasses(), T.klass),
            S = e(r),
            $ = function() {
                return this.start()
            },
            E = $.prototype = {
                constructor: $,
                $node: S,
                start: function() {
                    return x && x.start ? E : (x.methods = {}, x.start = !0, x.open = !1, x.type = r.type, r.autofocus = r == a(), r.readOnly = !T.editable, r.id = r.id || x.id, "text" != r.type && (r.type = "text"), E.component = new l(E, T), E.$root = e('<div class="' + C.picker + '" id="' + r.id + '_root" />'), m(), E.$holder = e(f()).appendTo(E.$root), g(), T.formatSubmit && v(), h(), T.containerHidden ? e(T.containerHidden).append(E._hidden) : S.after(E._hidden), T.container ? e(T.container).append(E.$root) : S.after(E.$root), E.on({
                        start: E.component.onStart,
                        render: E.component.onRender,
                        stop: E.component.onStop,
                        open: E.component.onOpen,
                        close: E.component.onClose,
                        set: E.component.onSet
                    }).on({
                        start: T.onStart,
                        render: T.onRender,
                        stop: T.onStop,
                        open: T.onOpen,
                        close: T.onClose,
                        set: T.onSet
                    }), k = n(E.$holder[0]), r.autofocus && E.open(), E.trigger("start").trigger("render"))
                },
                render: function(t) {
                    return t ? (E.$holder = e(f()), g(), E.$root.html(E.$holder)) : E.$root.find("." + C.box).html(E.component.nodes(x.open)), E.trigger("render")
                },
                stop: function() {
                    return x.start ? (E.close(), E._hidden && E._hidden.parentNode.removeChild(E._hidden), E.$root.remove(), S.removeClass(C.input).removeData(s), setTimeout(function() {
                        S.off("." + x.id)
                    }, 0), r.type = x.type, r.readOnly = !1, E.trigger("stop"), x.methods = {}, x.start = !1, E) : E
                },
                open: function(n) {
                    return x.open ? E : (S.addClass(C.active), o(r, "expanded", !0), setTimeout(function() {
                        E.$root.addClass(C.opened), o(E.$root[0], "hidden", !1)
                    }, 0), n !== !1 && (x.open = !0, k && d.css("overflow", "hidden").css("padding-right", "+=" + i()), y(), c.on("click." + x.id + " focusin." + x.id, function(e) {
                        var t = e.target;
                        t != r && t != document && 3 != e.which && E.close(t === E.$holder[0])
                    }).on("keydown." + x.id, function(n) {
                        var i = n.keyCode,
                            o = E.component.key[i],
                            r = n.target;
                        27 == i ? E.close(!0) : r != E.$holder[0] || !o && 13 != i ? e.contains(E.$root[0], r) && 13 == i && (n.preventDefault(), r.click()) : (n.preventDefault(), o ? t._.trigger(E.component.key.go, E, [t._.trigger(o)]) : E.$root.find("." + C.highlighted).hasClass(C.disabled) || (E.set("select", E.component.item.highlight), T.closeOnSelect && E.close(!0)))
                    })), E.trigger("open"))
                },
                close: function(e) {
                    return e && (T.editable ? r.focus() : (E.$holder.off("focus.toOpen").focus(), setTimeout(function() {
                        E.$holder.on("focus.toOpen", b)
                    }, 0))), S.removeClass(C.active), o(r, "expanded", !1), setTimeout(function() {
                        E.$root.removeClass(C.opened + " " + C.focused), o(E.$root[0], "hidden", !0)
                    }, 0), x.open ? (x.open = !1, k && d.css("overflow", "").css("padding-right", "-=" + i()), c.off("." + x.id), E.trigger("close")) : E
                },
                clear: function(e) {
                    return E.set("clear", null, e)
                },
                set: function(t, n, i) {
                    var o, r, s = e.isPlainObject(t),
                        a = s ? t : {};
                    if (i = s && e.isPlainObject(n) ? n : i || {}, t) {
                        s || (a[t] = n);
                        for (o in a) r = a[o], o in E.component.item && (void 0 === r && (r = null), E.component.set(o, r, i)), ("select" == o || "clear" == o) && S.val("clear" == o ? "" : E.get(o, T.format)).trigger("change");
                        E.render()
                    }
                    return i.muted ? E : E.trigger("set", a)
                },
                get: function(e, n) {
                    if (e = e || "value", null != x[e]) return x[e];
                    if ("valueSubmit" == e) {
                        if (E._hidden) return E._hidden.value;
                        e = "value"
                    }
                    if ("value" == e) return r.value;
                    if (e in E.component.item) {
                        if ("string" == typeof n) {
                            var i = E.component.get(e);
                            return i ? t._.trigger(E.component.formats.toString, E.component, [n, i]) : ""
                        }
                        return E.component.get(e)
                    }
                },
                on: function(t, n, i) {
                    var o, r, s = e.isPlainObject(t),
                        a = s ? t : {};
                    if (t) {
                        s || (a[t] = n);
                        for (o in a) r = a[o], i && (o = "_" + o), x.methods[o] = x.methods[o] || [], x.methods[o].push(r)
                    }
                    return E
                },
                off: function() {
                    var e, t, n = arguments;
                    for (e = 0, namesCount = n.length; e < namesCount; e += 1) t = n[e], t in x.methods && delete x.methods[t];
                    return E
                },
                trigger: function(e, n) {
                    var i = function(e) {
                        var i = x.methods[e];
                        i && i.map(function(e) {
                            t._.trigger(e, E, [n])
                        })
                    };
                    return i("_" + e), i(e), E
                }
            };
        return new $
    }

    function n(e) {
        var t, n = "position";
        return e.currentStyle ? t = e.currentStyle[n] : window.getComputedStyle && (t = getComputedStyle(e)[n]), "fixed" == t
    }

    function i() {
        if (d.height() <= l.height()) return 0;
        var t = e('<div style="visibility:hidden;width:100px" />').appendTo("body"),
            n = t[0].offsetWidth;
        t.css("overflow", "scroll");
        var i = e('<div style="width:100%" />').appendTo(t),
            o = i[0].offsetWidth;
        return t.remove(), n - o
    }

    function o(t, n, i) {
        if (e.isPlainObject(n))
            for (var o in n) r(t, o, n[o]);
        else r(t, n, i)
    }

    function r(e, t, n) {
        e.setAttribute(("role" == t ? "" : "aria-") + t, n)
    }

    function s(t, n) {
        e.isPlainObject(t) || (t = {
            attribute: n
        }), n = "";
        for (var i in t) {
            var o = ("role" == i ? "" : "aria-") + i,
                r = t[i];
            n += null == r ? "" : o + '="' + t[i] + '"'
        }
        return n
    }

    function a() {
        try {
            return document.activeElement
        } catch (e) {}
    }
    var l = e(window),
        c = e(document),
        d = e(document.documentElement),
        u = null != document.documentElement.style.transition;
    return t.klasses = function(e) {
        return e = e || "picker", {
            picker: e,
            opened: e + "--opened",
            focused: e + "--focused",
            input: e + "__input",
            active: e + "__input--active",
            target: e + "__input--target",
            holder: e + "__holder",
            frame: e + "__frame",
            wrap: e + "__wrap",
            box: e + "__box"
        }
    }, t._ = {
        group: function(e) {
            for (var n, i = "", o = t._.trigger(e.min, e); o <= t._.trigger(e.max, e, [o]); o += e.i) n = t._.trigger(e.item, e, [o]), i += t._.node(e.node, n[0], n[1], n[2]);
            return i
        },
        node: function(t, n, i, o) {
            return n ? (n = e.isArray(n) ? n.join("") : n, i = i ? ' class="' + i + '"' : "", o = o ? " " + o : "", "<" + t + i + o + ">" + n + "</" + t + ">") : ""
        },
        lead: function(e) {
            return (10 > e ? "0" : "") + e
        },
        trigger: function(e, t, n) {
            return "function" == typeof e ? e.apply(t, n || []) : e
        },
        digits: function(e) {
            return /\d/.test(e[1]) ? 2 : 1
        },
        isDate: function(e) {
            return {}.toString.call(e).indexOf("Date") > -1 && this.isInteger(e.getDate())
        },
        isInteger: function(e) {
            return {}.toString.call(e).indexOf("Number") > -1 && e % 1 === 0
        },
        ariaAttr: s
    }, t.extend = function(n, i) {
        e.fn[n] = function(o, r) {
            var s = this.data(n);
            return "picker" == o ? s : s && "string" == typeof o ? t._.trigger(s[o], s, [r]) : this.each(function() {
                var r = e(this);
                r.data(n) || new t(this, n, i, o)
            })
        }, e.fn[n].defaults = i.defaults
    }, t
}),
function(e) {
    "function" == typeof define && define.amd ? define(["picker", "jquery"], e) : "object" == typeof exports ? module.exports = e(require("./picker.js"), require("jquery")) : e(Picker, jQuery)
}(function(e, t) {
    function n(e, t) {
        var n = this,
            i = e.$node[0],
            o = i.value,
            r = e.$node.data("value"),
            s = r || o,
            a = r ? t.formatSubmit : t.format,
            l = function() {
                return i.currentStyle ? "rtl" == i.currentStyle.direction : "rtl" == getComputedStyle(e.$root[0]).direction
            };
        n.settings = t, n.$node = e.$node, n.queue = {
            min: "measure create",
            max: "measure create",
            now: "now create",
            select: "parse create validate",
            highlight: "parse navigate create validate",
            view: "parse create validate viewset",
            disable: "deactivate",
            enable: "activate"
        }, n.item = {}, n.item.clear = null, n.item.disable = (t.disable || []).slice(0), n.item.enable = - function(e) {
            return e[0] === !0 ? e.shift() : -1
        }(n.item.disable), n.set("min", t.min).set("max", t.max).set("now"), s ? n.set("select", s, {
            format: a,
            defaultValue: !0
        }) : n.set("select", null).set("highlight", n.item.now), n.key = {
            40: 7,
            38: -7,
            39: function() {
                return l() ? -1 : 1
            },
            37: function() {
                return l() ? 1 : -1
            },
            go: function(e) {
                var t = n.item.highlight,
                    i = new Date(t.year, t.month, t.date + e);
                n.set("highlight", i, {
                    interval: e
                }), this.render()
            }
        }, e.on("render", function() {
            e.$root.find("." + t.klass.selectMonth).on("change", function() {
                var n = this.value;
                n && (e.set("highlight", [e.get("view").year, n, e.get("highlight").date]), e.$root.find("." + t.klass.selectMonth).trigger("focus"))
            }), e.$root.find("." + t.klass.selectYear).on("change", function() {
                var n = this.value;
                n && (e.set("highlight", [n, e.get("view").month, e.get("highlight").date]), e.$root.find("." + t.klass.selectYear).trigger("focus"))
            })
        }, 1).on("open", function() {
            var i = "";
            n.disabled(n.get("now")) && (i = ":not(." + t.klass.buttonToday + ")"), e.$root.find("button" + i + ", select").attr("disabled", !1)
        }, 1).on("close", function() {
            e.$root.find("button, select").attr("disabled", !0)
        }, 1)
    }
    var i = 7,
        o = 6,
        r = e._;
    n.prototype.set = function(e, t, n) {
        var i = this,
            o = i.item;
        return null === t ? ("clear" == e && (e = "select"), o[e] = t, i) : (o["enable" == e ? "disable" : "flip" == e ? "enable" : e] = i.queue[e].split(" ").map(function(o) {
            return t = i[o](e, t, n)
        }).pop(), "select" == e ? i.set("highlight", o.select, n) : "highlight" == e ? i.set("view", o.highlight, n) : e.match(/^(flip|min|max|disable|enable)$/) && (o.select && i.disabled(o.select) && i.set("select", o.select, n), o.highlight && i.disabled(o.highlight) && i.set("highlight", o.highlight, n)), i)
    }, n.prototype.get = function(e) {
        return this.item[e]
    }, n.prototype.create = function(e, n, i) {
        var o, s = this;
        return n = void 0 === n ? e : n, n == -(1 / 0) || n == 1 / 0 ? o = n : t.isPlainObject(n) && r.isInteger(n.pick) ? n = n.obj : t.isArray(n) ? (n = new Date(n[0], n[1], n[2]), n = r.isDate(n) ? n : s.create().obj) : n = r.isInteger(n) || r.isDate(n) ? s.normalize(new Date(n), i) : s.now(e, n, i), {
            year: o || n.getFullYear(),
            month: o || n.getMonth(),
            date: o || n.getDate(),
            day: o || n.getDay(),
            obj: o || n,
            pick: o || n.getTime()
        }
    }, n.prototype.createRange = function(e, n) {
        var i = this,
            o = function(e) {
                return e === !0 || t.isArray(e) || r.isDate(e) ? i.create(e) : e
            };
        return r.isInteger(e) || (e = o(e)), r.isInteger(n) || (n = o(n)), r.isInteger(e) && t.isPlainObject(n) ? e = [n.year, n.month, n.date + e] : r.isInteger(n) && t.isPlainObject(e) && (n = [e.year, e.month, e.date + n]), {
            from: o(e),
            to: o(n)
        }
    }, n.prototype.withinRange = function(e, t) {
        return e = this.createRange(e.from, e.to), t.pick >= e.from.pick && t.pick <= e.to.pick
    }, n.prototype.overlapRanges = function(e, t) {
        var n = this;
        return e = n.createRange(e.from, e.to), t = n.createRange(t.from, t.to), n.withinRange(e, t.from) || n.withinRange(e, t.to) || n.withinRange(t, e.from) || n.withinRange(t, e.to)
    }, n.prototype.now = function(e, t, n) {
        return t = new Date, n && n.rel && t.setDate(t.getDate() + n.rel), this.normalize(t, n)
    }, n.prototype.navigate = function(e, n, i) {
        var o, r, s, a, l = t.isArray(n),
            c = t.isPlainObject(n),
            d = this.item.view;
        if (l || c) {
            for (c ? (r = n.year, s = n.month, a = n.date) : (r = +n[0], s = +n[1], a = +n[2]), i && i.nav && d && d.month !== s && (r = d.year, s = d.month), o = new Date(r, s + (i && i.nav ? i.nav : 0), 1), r = o.getFullYear(), s = o.getMonth(); new Date(r, s, a).getMonth() !== s;) a -= 1;
            n = [r, s, a]
        }
        return n
    }, n.prototype.normalize = function(e) {
        return e.setHours(0, 0, 0, 0), e
    }, n.prototype.measure = function(e, t) {
        var n = this;
        return t ? "string" == typeof t ? t = n.parse(e, t) : r.isInteger(t) && (t = n.now(e, t, {
            rel: t
        })) : t = "min" == e ? -(1 / 0) : 1 / 0, t
    }, n.prototype.viewset = function(e, t) {
        return this.create([t.year, t.month, 1])
    }, n.prototype.validate = function(e, n, i) {
        var o, s, a, l, c = this,
            d = n,
            u = i && i.interval ? i.interval : 1,
            p = -1 === c.item.enable,
            f = c.item.min,
            h = c.item.max,
            m = p && c.item.disable.filter(function(e) {
                if (t.isArray(e)) {
                    var i = c.create(e).pick;
                    i < n.pick ? o = !0 : i > n.pick && (s = !0)
                }
                return r.isInteger(e)
            }).length;
        if ((!i || !i.nav && !i.defaultValue) && (!p && c.disabled(n) || p && c.disabled(n) && (m || o || s) || !p && (n.pick <= f.pick || n.pick >= h.pick)))
            for (p && !m && (!s && u > 0 || !o && 0 > u) && (u *= -1); c.disabled(n) && (Math.abs(u) > 1 && (n.month < d.month || n.month > d.month) && (n = d, u = u > 0 ? 1 : -1), n.pick <= f.pick ? (a = !0, u = 1, n = c.create([f.year, f.month, f.date + (n.pick === f.pick ? 0 : -1)])) : n.pick >= h.pick && (l = !0, u = -1, n = c.create([h.year, h.month, h.date + (n.pick === h.pick ? 0 : 1)])), !a || !l);) n = c.create([n.year, n.month, n.date + u]);
        return n
    }, n.prototype.disabled = function(e) {
        var n = this,
            i = n.item.disable.filter(function(i) {
                return r.isInteger(i) ? e.day === (n.settings.firstDay ? i : i - 1) % 7 : t.isArray(i) || r.isDate(i) ? e.pick === n.create(i).pick : t.isPlainObject(i) ? n.withinRange(i, e) : void 0
            });
        return i = i.length && !i.filter(function(e) {
            return t.isArray(e) && "inverted" == e[3] || t.isPlainObject(e) && e.inverted
        }).length, -1 === n.item.enable ? !i : i || e.pick < n.item.min.pick || e.pick > n.item.max.pick
    }, n.prototype.parse = function(e, t, n) {
        var i = this,
            o = {};
        return t && "string" == typeof t ? (n && n.format || (n = n || {}, n.format = i.settings.format), i.formats.toArray(n.format).map(function(e) {
            var n = i.formats[e],
                s = n ? r.trigger(n, i, [t, o]) : e.replace(/^!/, "").length;
            n && (o[e] = t.substr(0, s)), t = t.substr(s)
        }), [o.yyyy || o.yy, +(o.mm || o.m) - 1, o.dd || o.d]) : t
    }, n.prototype.formats = function() {
        function e(e, t, n) {
            var i = e.match(/[^\x00-\x7F]+|\w+/)[0];
            return n.mm || n.m || (n.m = t.indexOf(i) + 1), i.length
        }

        function t(e) {
            return e.match(/\w+/)[0].length
        }
        return {
            d: function(e, t) {
                return e ? r.digits(e) : t.date
            },
            dd: function(e, t) {
                return e ? 2 : r.lead(t.date)
            },
            ddd: function(e, n) {
                return e ? t(e) : this.settings.weekdaysShort[n.day]
            },
            dddd: function(e, n) {
                return e ? t(e) : this.settings.weekdaysFull[n.day]
            },
            m: function(e, t) {
                return e ? r.digits(e) : t.month + 1
            },
            mm: function(e, t) {
                return e ? 2 : r.lead(t.month + 1)
            },
            mmm: function(t, n) {
                var i = this.settings.monthsShort;
                return t ? e(t, i, n) : i[n.month]
            },
            mmmm: function(t, n) {
                var i = this.settings.monthsFull;
                return t ? e(t, i, n) : i[n.month]
            },
            yy: function(e, t) {
                return e ? 2 : ("" + t.year).slice(2)
            },
            yyyy: function(e, t) {
                return e ? 4 : t.year
            },
            toArray: function(e) {
                return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)
            },
            toString: function(e, t) {
                var n = this;
                return n.formats.toArray(e).map(function(e) {
                    return r.trigger(n.formats[e], n, [0, t]) || e.replace(/^!/, "")
                }).join("")
            }
        }
    }(), n.prototype.isDateExact = function(e, n) {
        var i = this;
        return r.isInteger(e) && r.isInteger(n) || "boolean" == typeof e && "boolean" == typeof n ? e === n : (r.isDate(e) || t.isArray(e)) && (r.isDate(n) || t.isArray(n)) ? i.create(e).pick === i.create(n).pick : t.isPlainObject(e) && t.isPlainObject(n) ? i.isDateExact(e.from, n.from) && i.isDateExact(e.to, n.to) : !1
    }, n.prototype.isDateOverlap = function(e, n) {
        var i = this,
            o = i.settings.firstDay ? 1 : 0;
        return r.isInteger(e) && (r.isDate(n) || t.isArray(n)) ? (e = e % 7 + o, e === i.create(n).day + 1) : r.isInteger(n) && (r.isDate(e) || t.isArray(e)) ? (n = n % 7 + o, n === i.create(e).day + 1) : t.isPlainObject(e) && t.isPlainObject(n) ? i.overlapRanges(e, n) : !1
    }, n.prototype.flipEnable = function(e) {
        var t = this.item;
        t.enable = e || (-1 == t.enable ? 1 : -1)
    }, n.prototype.deactivate = function(e, n) {
        var i = this,
            o = i.item.disable.slice(0);
        return "flip" == n ? i.flipEnable() : n === !1 ? (i.flipEnable(1), o = []) : n === !0 ? (i.flipEnable(-1), o = []) : n.map(function(e) {
            for (var n, s = 0; s < o.length; s += 1)
                if (i.isDateExact(e, o[s])) {
                    n = !0;
                    break
                }
            n || (r.isInteger(e) || r.isDate(e) || t.isArray(e) || t.isPlainObject(e) && e.from && e.to) && o.push(e)
        }), o
    }, n.prototype.activate = function(e, n) {
        var i = this,
            o = i.item.disable,
            s = o.length;
        return "flip" == n ? i.flipEnable() : n === !0 ? (i.flipEnable(1), o = []) : n === !1 ? (i.flipEnable(-1), o = []) : n.map(function(e) {
            var n, a, l, c;
            for (l = 0; s > l; l += 1) {
                if (a = o[l], i.isDateExact(a, e)) {
                    n = o[l] = null, c = !0;
                    break
                }
                if (i.isDateOverlap(a, e)) {
                    t.isPlainObject(e) ? (e.inverted = !0, n = e) : t.isArray(e) ? (n = e, n[3] || n.push("inverted")) : r.isDate(e) && (n = [e.getFullYear(), e.getMonth(), e.getDate(), "inverted"]);
                    break
                }
            }
            if (n)
                for (l = 0; s > l; l += 1)
                    if (i.isDateExact(o[l], e)) {
                        o[l] = null;
                        break
                    }
            if (c)
                for (l = 0; s > l; l += 1)
                    if (i.isDateOverlap(o[l], e)) {
                        o[l] = null;
                        break
                    }
            n && o.push(n)
        }), o.filter(function(e) {
            return null != e
        })
    }, n.prototype.nodes = function(e) {
        var t = this,
            n = t.settings,
            s = t.item,
            a = s.now,
            l = s.select,
            c = s.highlight,
            d = s.view,
            u = s.disable,
            p = s.min,
            f = s.max,
            h = function(e, t) {
                return n.firstDay && (e.push(e.shift()), t.push(t.shift())), r.node("thead", r.node("tr", r.group({
                    min: 0,
                    max: i - 1,
                    i: 1,
                    node: "th",
                    item: function(i) {
                        return [e[i], n.klass.weekdays, 'scope=col title="' + t[i] + '"']
                    }
                })))
            }((n.showWeekdaysFull ? n.weekdaysFull : n.weekdaysShort).slice(0), n.weekdaysFull.slice(0)),
            m = function(e) {
                return r.node("div", " ", n.klass["nav" + (e ? "Next" : "Prev")] + (e && d.year >= f.year && d.month >= f.month || !e && d.year <= p.year && d.month <= p.month ? " " + n.klass.navDisabled : ""), "data-nav=" + (e || -1) + " " + r.ariaAttr({
                    role: "button",
                    controls: t.$node[0].id + "_table"
                }) + ' title="' + (e ? n.labelMonthNext : n.labelMonthPrev) + '"')
            },
            g = function() {
                var i = n.showMonthsShort ? n.monthsShort : n.monthsFull;
                return n.selectMonths ? r.node("select", r.group({
                    min: 0,
                    max: 11,
                    i: 1,
                    node: "option",
                    item: function(e) {
                        return [i[e], 0, "value=" + e + (d.month == e ? " selected" : "") + (d.year == p.year && e < p.month || d.year == f.year && e > f.month ? " disabled" : "")]
                    }
                }), n.klass.selectMonth, (e ? "" : "disabled") + " " + r.ariaAttr({
                    controls: t.$node[0].id + "_table"
                }) + ' title="' + n.labelMonthSelect + '"') : r.node("div", i[d.month], n.klass.month)
            },
            v = function() {
                var i = d.year,
                    o = n.selectYears === !0 ? 5 : ~~(n.selectYears / 2);
                if (o) {
                    var s = p.year,
                        a = f.year,
                        l = i - o,
                        c = i + o;
                    if (s > l && (c += s - l, l = s), c > a) {
                        var u = l - s,
                            h = c - a;
                        l -= u > h ? h : u, c = a
                    }
                    return r.node("select", r.group({
                        min: l,
                        max: c,
                        i: 1,
                        node: "option",
                        item: function(e) {
                            return [e, 0, "value=" + e + (i == e ? " selected" : "")]
                        }
                    }), n.klass.selectYear, (e ? "" : "disabled") + " " + r.ariaAttr({
                        controls: t.$node[0].id + "_table"
                    }) + ' title="' + n.labelYearSelect + '"')
                }
                return r.node("div", i, n.klass.year)
            };
        return r.node("div", (n.selectYears ? v() + g() : g() + v()) + m() + m(1), n.klass.header) + r.node("table", h + r.node("tbody", r.group({
            min: 0,
            max: o - 1,
            i: 1,
            node: "tr",
            item: function(e) {
                var o = n.firstDay && 0 === t.create([d.year, d.month, 1]).day ? -7 : 0;
                return [r.group({
                    min: i * e - d.day + o + 1,
                    max: function() {
                        return this.min + i - 1
                    },
                    i: 1,
                    node: "td",
                    item: function(e) {
                        e = t.create([d.year, d.month, e + (n.firstDay ? 1 : 0)]);
                        var i = l && l.pick == e.pick,
                            o = c && c.pick == e.pick,
                            s = u && t.disabled(e) || e.pick < p.pick || e.pick > f.pick,
                            h = r.trigger(t.formats.toString, t, [n.format, e]);
                        return [r.node("div", e.date, function(t) {
                            return t.push(d.month == e.month ? n.klass.infocus : n.klass.outfocus), a.pick == e.pick && t.push(n.klass.now), i && t.push(n.klass.selected), o && t.push(n.klass.highlighted), s && t.push(n.klass.disabled), t.join(" ")
                        }([n.klass.day]), "data-pick=" + e.pick + " " + r.ariaAttr({
                            role: "gridcell",
                            label: h,
                            selected: i && t.$node.val() === h ? !0 : null,
                            activedescendant: o ? !0 : null,
                            disabled: s ? !0 : null
                        })), "", r.ariaAttr({
                            role: "presentation"
                        })]
                    }
                })]
            }
        })), n.klass.table, 'id="' + t.$node[0].id + '_table" ' + r.ariaAttr({
            role: "grid",
            controls: t.$node[0].id,
            readonly: !0
        })) + r.node("div", r.node("button", n.today, n.klass.buttonToday, "type=button data-pick=" + a.pick + (e && !t.disabled(a) ? "" : " disabled") + " " + r.ariaAttr({
            controls: t.$node[0].id
        })) + r.node("button", n.clear, n.klass.buttonClear, "type=button data-clear=1" + (e ? "" : " disabled") + " " + r.ariaAttr({
            controls: t.$node[0].id
        })) + r.node("button", n.close, n.klass.buttonClose, "type=button data-close=true " + (e ? "" : " disabled") + " " + r.ariaAttr({
            controls: t.$node[0].id
        })), n.klass.footer)
    }, n.defaults = function(e) {
        return {
            labelMonthNext: "Next month",
            labelMonthPrev: "Previous month",
            labelMonthSelect: "Select a month",
            labelYearSelect: "Select a year",
            monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            today: "Today",
            clear: "Clear",
            close: "Close",
            closeOnSelect: !0,
            closeOnClear: !0,
            format: "d mmmm, yyyy",
            klass: {
                table: e + "table",
                header: e + "header",
                navPrev: e + "nav--prev",
                navNext: e + "nav--next",
                navDisabled: e + "nav--disabled",
                month: e + "month",
                year: e + "year",
                selectMonth: e + "select--month",
                selectYear: e + "select--year",
                weekdays: e + "weekday",
                day: e + "day",
                disabled: e + "day--disabled",
                selected: e + "day--selected",
                highlighted: e + "day--highlighted",
                now: e + "day--today",
                infocus: e + "day--infocus",
                outfocus: e + "day--outfocus",
                footer: e + "footer",
                buttonClear: e + "button--clear",
                buttonToday: e + "button--today",
                buttonClose: e + "button--close"
            }
        }
    }(e.klasses().picker + "__"), e.extend("pickadate", n)
}), ! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(n) {
        return t(e, n)
    }) : "object" == typeof exports ? t(e, require("jquery")) : t(e, e.jQuery || e.Zepto)
}(this, function(e, t) {
    "use strict";

    function n(e) {
        if (x && "none" === e.css("animation-name") && "none" === e.css("-webkit-animation-name") && "none" === e.css("-moz-animation-name") && "none" === e.css("-o-animation-name") && "none" === e.css("-ms-animation-name")) return 0;
        var t, n, i, o, r = e.css("animation-duration") || e.css("-webkit-animation-duration") || e.css("-moz-animation-duration") || e.css("-o-animation-duration") || e.css("-ms-animation-duration") || "0s",
            s = e.css("animation-delay") || e.css("-webkit-animation-delay") || e.css("-moz-animation-delay") || e.css("-o-animation-delay") || e.css("-ms-animation-delay") || "0s",
            a = e.css("animation-iteration-count") || e.css("-webkit-animation-iteration-count") || e.css("-moz-animation-iteration-count") || e.css("-o-animation-iteration-count") || e.css("-ms-animation-iteration-count") || "1";
        for (r = r.split(", "), s = s.split(", "), a = a.split(", "), o = 0, n = r.length, t = Number.NEGATIVE_INFINITY; n > o; o++) i = parseFloat(r[o]) * parseInt(a[o], 10) + parseFloat(s[o]), i > t && (t = i);
        return i
    }

    function i() {
        if (t(document.body).height() <= t(window).height()) return 0;
        var e, n, i = document.createElement("div"),
            o = document.createElement("div");
        return i.style.visibility = "hidden", i.style.width = "100px", document.body.appendChild(i), e = i.offsetWidth, i.style.overflow = "scroll", o.style.width = "100%", i.appendChild(o), n = o.offsetWidth, i.parentNode.removeChild(i), e - n
    }

    function o() {
        var e, n, o = t("html"),
            r = d("is-locked");
        o.hasClass(r) || (n = t(document.body), e = parseInt(n.css("padding-right"), 10) + i(), n.css("padding-right", e + "px"), o.addClass(r))
    }

    function r() {
        var e, n, o = t("html"),
            r = d("is-locked");
        o.hasClass(r) && (n = t(document.body), e = parseInt(n.css("padding-right"), 10) - i(), n.css("padding-right", e + "px"), o.removeClass(r))
    }

    function s(e, t, n, i) {
        var o = d("is", t),
            r = [d("is", w.CLOSING), d("is", w.OPENING), d("is", w.CLOSED), d("is", w.OPENED)].join(" ");
        e.$bg.removeClass(r).addClass(o), e.$overlay.removeClass(r).addClass(o), e.$wrapper.removeClass(r).addClass(o), e.$modal.removeClass(r).addClass(o), e.state = t, !n && e.$modal.trigger({
            type: t,
            reason: i
        }, [{
            reason: i
        }])
    }

    function a(e, i, o) {
        var r = 0,
            s = function(e) {
                e.target === this && r++
            },
            a = function(e) {
                e.target === this && 0 === --r && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, t) {
                    o[t].off(v + " " + y)
                }), i())
            };
        t.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, t) {
            o[t].on(v, s).on(y, a)
        }), e(), 0 === n(o.$bg) && 0 === n(o.$overlay) && 0 === n(o.$wrapper) && 0 === n(o.$modal) && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function(e, t) {
            o[t].off(v + " " + y)
        }), i())
    }

    function l(e) {
        e.state !== w.CLOSED && (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function(t, n) {
            e[n].off(v + " " + y)
        }), e.$bg.removeClass(e.settings.modifier), e.$overlay.removeClass(e.settings.modifier).hide(), e.$wrapper.hide(), r(), s(e, w.CLOSED, !0))
    }

    function c(e) {
        var t, n, i, o, r = {};
        for (e = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), t = e.split(","), o = 0, n = t.length; n > o; o++) t[o] = t[o].split(":"), i = t[o][1], ("string" == typeof i || i instanceof String) && (i = "true" === i || ("false" === i ? !1 : i)), ("string" == typeof i || i instanceof String) && (i = isNaN(i) ? i : +i), r[t[o][0]] = i;
        return r
    }

    function d() {
        for (var e = g, t = 0; t < arguments.length; ++t) e += "-" + arguments[t];
        return e
    }

    function u() {
        var e, n, i = location.hash.replace("#", "");
        if (i) {
            try {
                n = t("[data-" + m + "-id=" + i.replace(new RegExp("/", "g"), "\\/") + "]")
            } catch (o) {}
            n && n.length && (e = t[m].lookup[n.data(m)], e && e.settings.hashTracking && e.open())
        } else f && f.state === w.OPENED && f.settings.hashTracking && f.close()
    }

    function p(e, n) {
        var i = t(document.body),
            o = this;
        o.settings = t.extend({}, b, n), o.index = t[m].lookup.push(o) - 1, o.state = w.CLOSED, o.$overlay = t("." + d("overlay")), o.$overlay.length || (o.$overlay = t("<div>").addClass(d("overlay") + " " + d("is", w.CLOSED)).hide(), i.append(o.$overlay)), o.$bg = t("." + d("bg")).addClass(d("is", w.CLOSED)), o.$modal = e, o.$modal.addClass(g + " " + d("is-initialized") + " " + o.settings.modifier + " " + d("is", w.CLOSED)), o.$wrapper = t("<div>").addClass(d("wrapper") + " " + o.settings.modifier + " " + d("is", w.CLOSED)).hide().append(o.$modal), i.append(o.$wrapper), o.$wrapper.on("click." + g, "[data-" + m + '-action="close"]', function(e) {
            e.preventDefault(), o.close()
        }), o.$wrapper.on("click." + g, "[data-" + m + '-action="cancel"]', function(e) {
            e.preventDefault(), o.$modal.trigger(k.CANCELLATION), o.settings.closeOnCancel && o.close(k.CANCELLATION)
        }), o.$wrapper.on("click." + g, "[data-" + m + '-action="confirm"]', function(e) {
            e.preventDefault(), o.$modal.trigger(k.CONFIRMATION), o.settings.closeOnConfirm && o.close(k.CONFIRMATION)
        }), o.$wrapper.on("click." + g, function(e) {
            var n = t(e.target);
            n.hasClass(d("wrapper")) && o.settings.closeOnOutsideClick && o.close()
        })
    }
    var f, h, m = "remodal",
        g = e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.NAMESPACE || m,
        v = t.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function(e) {
            return e + "." + g
        }).join(" "),
        y = t.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function(e) {
            return e + "." + g
        }).join(" "),
        b = t.extend({
            hashTracking: !0,
            closeOnConfirm: !0,
            closeOnCancel: !0,
            closeOnEscape: !0,
            closeOnOutsideClick: !0,
            modifier: ""
        }, e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.DEFAULTS),
        w = {
            CLOSING: "closing",
            CLOSED: "closed",
            OPENING: "opening",
            OPENED: "opened"
        },
        k = {
            CONFIRMATION: "confirmation",
            CANCELLATION: "cancellation"
        },
        x = function() {
            var e = document.createElement("div").style;
            return void 0 !== e.animationName || void 0 !== e.WebkitAnimationName || void 0 !== e.MozAnimationName || void 0 !== e.msAnimationName || void 0 !== e.OAnimationName
        }();
    p.prototype.open = function() {
        var e, n = this;
        n.state !== w.OPENING && n.state !== w.CLOSING && (e = n.$modal.attr("data-" + m + "-id"), e && n.settings.hashTracking && (h = t(window).scrollTop(), location.hash = e), f && f !== n && l(f), f = n, o(), n.$bg.addClass(n.settings.modifier), n.$overlay.addClass(n.settings.modifier).show(), n.$wrapper.show().scrollTop(0), a(function() {
            s(n, w.OPENING)
        }, function() {
            s(n, w.OPENED)
        }, n))
    }, p.prototype.close = function(e) {
        var n = this;
        n.state !== w.OPENING && n.state !== w.CLOSING && (n.settings.hashTracking && n.$modal.attr("data-" + m + "-id") === location.hash.substr(1) && (location.hash = "", t(window).scrollTop(h)), a(function() {
            s(n, w.CLOSING, !1, e)
        }, function() {
            n.$bg.removeClass(n.settings.modifier), n.$overlay.removeClass(n.settings.modifier).hide(), n.$wrapper.hide(), r(), s(n, w.CLOSED, !1, e)
        }, n))
    }, p.prototype.getState = function() {
        return this.state
    }, p.prototype.destroy = function() {
        var e, n = t[m].lookup;
        l(this), this.$wrapper.remove(), delete n[this.index], e = t.grep(n, function(e) {
            return !!e
        }).length, 0 === e && (this.$overlay.remove(), this.$bg.removeClass(d("is", w.CLOSING) + " " + d("is", w.OPENING) + " " + d("is", w.CLOSED) + " " + d("is", w.OPENED)))
    }, t[m] = {
        lookup: []
    }, t.fn[m] = function(e) {
        var n, i;
        return this.each(function(o, r) {
            i = t(r), null == i.data(m) ? (n = new p(i, e), i.data(m, n.index), n.settings.hashTracking && i.attr("data-" + m + "-id") === location.hash.substr(1) && n.open()) : n = t[m].lookup[i.data(m)]
        }), n
    }, t(document).ready(function() {
        t(document).on("click", "[data-" + m + "-target]", function(e) {
            e.preventDefault();
            var n = e.currentTarget,
                i = n.getAttribute("data-" + m + "-target"),
                o = t("[data-" + m + "-id=" + i + "]");
            t[m].lookup[o.data(m)].open()
        }), t(document).find("." + g).each(function(e, n) {
            var i = t(n),
                o = i.data(m + "-options");
            o ? ("string" == typeof o || o instanceof String) && (o = c(o)) : o = {}, i[m](o)
        }), t(document).on("keyup." + g, function(e) {
            f && f.settings.closeOnEscape && f.state === w.OPENED && 27 === e.keyCode && f.close()
        }), t(window).on("hashchange." + g, u)
    })
}), window.GM = {
        modules: {}
    }, GM.keycodes = {
        enter: 13,
        space: 32,
        escape: 29
    }, GM.modules.toggler = function(e) {
        this.$el = e, this.active = !1, this.config = this.$el.data(), this.$el = this.$el.add(this.config.otherels), this.$targets = $(this.config.targets).add(this.$el), this.$focusTarget = $(this.config.focustarget), this.focusDelay = this.config.focusdelay ? parseInt(this.config.focusdelay, 10) : 0, this.bindEvents()
    }, GM.modules.toggler.prototype = {
        bindEvents: function() {
            this.$el.on("click", this.toggle.bind(this)), this.config.canceltargets && (this.$el.on("click focusin", function(e) {
                e.stopPropagation()
            }), this.$cancelTargets = $(this.config.canceltargets), this.$cancelTargets.on("click focusin", this.toggle.bind(this, !1)))
        },
        toggle: function(e) {
            e.preventDefault && e.preventDefault();
            var t = "object" != typeof e && "undefined" != typeof e;
            this.active = t ? !1 : !this.active, this.$targets.toggleClass(this.config.activeclass, this.active), this.$el.trigger("GM-relayout"), !t && this.config.focustarget && setTimeout(this.manageFocus.bind(this), this.focusDelay)
        },
        manageFocus: function() {
            this.active ? this.$focusTarget.focus() : this.$el.focus()
        }
    }, GM.modules.hidelabel = function(e) {
        this.$el = e, this.$input = e.find("input"), this.$label = e.find("label"), this.$input.on({
            focus: this.toggle.bind(this, !0),
            blur: this.toggle.bind(this, !1)
        })
    }, GM.modules.hidelabel.prototype = {
        toggle: function(e) {
            (e || "" === this.$input.val()) && this.$label.toggleClass("-focused", e)
        }
    }, GM.modules.customselect = function(e) {
        this.$el = e, this.$current = e.find("p"), this.$select = e.find("select"), this.prefix = e.data("prefix") || "", this.$select.on("change", function() {
            var e = this.$select.val(),
                t = this.$select.find('option[value="' + e + '"]').text();
            this.$current.text(this.prefix + t)
        }.bind(this))
    }, GM.modules.submitonchange = function(e) {
        this.$el = e, this.$select = e.find("select"), this.$select.on("change", function() {
            console.log(this.$el), this.$el.submit()
        }.bind(this))
    }, GM.modules.carousel = function(e) {
        this.$el = e, this.config = this.$el.data(), this.$photos = this.$el.find(this.config.photos), this.$next = this.$el.find(this.config.next), this.$prev = this.$el.find(this.config.prev), this.$zoom = this.$el.find(this.config.zoom), this.zoomedImages = $.map(this.$photos.children(), function(e) {
            return $(e).data("zoom")
        }), this.$photos.slick(), this.$next.on("click", function() {
            this.$photos.slick("slickNext")
        }.bind(this)), this.$prev.on("click", function() {
            this.$photos.slick("slickPrev")
        }.bind(this)), this.$zoom.on("click", function() {
            var e = this.$photos.slick("slickCurrentSlide");
            $.magnificPopup.open({
                items: {
                    src: this.zoomedImages[e]
                },
                type: "image"
            })
        }.bind(this))
    }, GM.modules.addclassonfocus = function(e) {
        this.$el = e, this.$el.on("focusin", this.toggle.bind(this, !0)), this.$el.on("focusout", this.toggle.bind(this, !1))
    }, GM.modules.addclassonfocus.prototype = {
        toggle: function(e) {
            this.$el.toggleClass("-focused", e)
        }
    }, GM.modules.datepicker = function(e) {
        this.format = "m/d/yy", this.$el = e, this.$input = e.find("input"), this.$button = e.find("button"), this.$input.pickadate({
            onSet: this.setDate.bind(this)
        }), this.picker = this.$input.pickadate("picker"), this.disableDates(), this.$button.on("click", this.open.bind(this))
    }, GM.modules.datepicker.prototype = {
        disableDates: function() {
            /*this.picker.set("disable", westCoastFlag ? [1, 2, 7] : (nationwideFlag ? [1, 2, 3, 4, 7] : ((grubBoxId == "10" || grubBoxId == "11" || grubBoxId == "12" || grubBoxId == "13") ? [1] : []))), this.picker.set("min", 3), this.picker.set("disable", [
                [2016, 10, 24],
                [2016, 10, 25],
                [2016, 11, 24],
                [2016, 11, 25],
                [2016, 11, 26],
                [2016, 12, 1],
                [2016, 12, 2]
            ])*/
            if (westCoastFlag) {

                this.picker.set("disable", [1, 2, 7]), this.picker.set("min", 10), this.picker.set("disable", [
                [2016, 10, 24],
                [2016, 10, 25],
                [2016, 11, 24],
                [2016, 11, 25],
                [2016, 11, 26],
                [2016, 12, 1],
                [2016, 12, 2]
            ])

            } else if (nationwideFlag) {

                this.picker.set("disable", [1, 2, 3, 4, 7]), this.picker.set("min", 3), this.picker.set("disable", [
                [2016, 10, 24],
                [2016, 10, 25],
                [2016, 11, 24],
                [2016, 11, 25],
                [2016, 11, 26],
                [2016, 12, 1],
                [2016, 12, 2]
            ])


            } else {
                this.picker.set("disable", [1, 7]), this.picker.set("min", 10), this.picker.set("disable", [
                [2016, 10, 24],
                [2016, 10, 25],
                [2016, 11, 24],
                [2016, 11, 25],
                [2016, 11, 26],
                [2016, 12, 1],
                [2016, 12, 2],
            ])
            }

        },
        open: function(e) {
            e.stopPropagation(), this.picker.open()
        },
        setDate: function(e) {
            if (e.select) {
                var t = this.picker.get("select", this.format);
                this.$button.text("First delivery: " + t), this.$input.val(t)
            }
        }
    }, GM.modules.follow = function(e) {
        this.$el = e, this.$parent = e.parent(), this.$wrapper = $(".wrapper"), this.$window = $(window), this.initialPosition = this.$parent.offset().top, this.parentOffset = this.$el.offset().top - this.initialPosition, this.startat = e.data("startat"), this.$window.on("orientationchange", this.updatePosition.bind(this)), this.$wrapper.on("scroll resize", debounce(this.updatePosition.bind(this), 150)), this.$el.on("GM-relayout", this.updatePosition.bind(this))
    }, GM.modules.follow.prototype = {
        measure: function() {
            return {
                height: this.$el.outerHeight(),
                windowHeight: this.$window.height(),
                parentHeight: this.$parent.outerHeight(),
                scrollTop: this.$wrapper.scrollTop()
            }
        },
        updatePosition: function() {
            this.isWideEnough() ? (this.measurements = this.measure(), this.isScrolledDown() ? this.move() : this.reset()) : this.reset()
        },
        isWideEnough: function() {
            return this.$window.width() >= this.startat
        },
        isScrolledDown: function(e) {
            return this.measurements.scrollTop > this.initialPosition
        },
        move: function() {
            var e = this.$wrapper.scrollTop() - this.initialPosition,
                t = e + this.measurements.height > this.measurements.parentHeight,
                n = this.measurements.height + this.initialPosition > this.measurements.windowHeight,
                i = t ? this.measurements.parentHeight - this.measurements.height : e;
            this.transform(i), n && this.setHeight()
        },
        transform: function(e) {
            this.styled = !0, this.$el.css("transform", "translate(0, " + e + "px)")
        },
        setHeight: function() {
            this.styled = !0, this.scrollable = !0, this.$el.addClass("-scrollable"), this.$el.css("height", this.measurements.windowHeight - this.parentOffset)
        },
        reset: function() {
            this.styled && this.$el.removeAttr("style"), this.scrollable && (this.$el.removeClass("-scrollable"), this.scrollable = !1)
        }
    }, GM.modules.elementquery = function(e) {
        this.$el = e, this.update(), this.$el.addClass("-elementquery-active"), $(window).on("GM-relayout orientationchange resize", debounce(this.update.bind(this), 500)).on("GM-relayout", this.update.bind(this))
    }, GM.modules.elementquery.prototype = {
        widths: [400, 600, 800, 1e3, 1200, 1400, 1600],
        update: function() {
            var e = this.$el.outerWidth(),
                t = [];
            this.widths.forEach(function(n) {
                e >= n && t.push(n)
            }), this.$el.attr("data-minwidth", t.join(" "))
        }
    }, GM.modules.dismissable = function(e) {
        this.$el = e, this.$parent = $(e.data("parent")), this.$el.find("button").click("click", function() {
            this.$el.addClass("-dismissed"), 0 === this.$parent.find('[data-module="dismissable"]:not(".-dismissed")').length && this.$parent.addClass("-empty")
        }.bind(this))
    }, GM.modules.editable = function(e) {
        this.$el = e, this.$button = e.find("button"), this.$input = e.find("input"), this.$value = e.find("p"), this.$button.on("click", function() {
            this.$value.hide(), this.$input.show().focus()
        }.bind(this)), this.$input.on("blur", function() {
            this.$value.show(), this.$input.hide()
        }.bind(this)), this.$input.on("keydown", function(e) {
            e.keyCode === GM.keycode.enter || e.keyCode === GM.keycode.space ? (this.$value.show(), this.$input.hide()) : e.keyCode === GM.keycode.escape && (this.$value.hide(), this.$input.show())
        }.bind(this))
    }, GM.modules.editable.prototype = {
        bindEvents: function() {}
    }, GM.modules.modal = function(e) {
        this.$el = e, this.$close = e.find(".modal__close"), this.$wrapper = $(".wrapper"), this.$target = $("[data-modal-name=" + e.data("target") + "]"), this.modalInstance = this.$target.remodal({
            hashTracking: !1
        }), this.bindEvents()
    }, GM.modules.modal.prototype = {
        bindEvents: function() {
            this.$el.on("click", this.open.bind(this)), this.$target.on("click", ".modal__close", this.triggerClose.bind(this)), this.$target.on("focusin", this.cancelBubble), this.$wrapper.on("focusin", this.returnFocusIfOpen.bind(this))
        },
        open: function(e) {
            e.preventDefault && e.preventDefault(), this.modalInstance.open(), this.focusTarget(), this.$wrapper.attr("aria-hidden", !0)
        },
        triggerClose: function() {
            this.modalInstance.close()
        },
        focusTarget: function() {
            this.$wrapper.removeAttr("aria-hidden"), this.$target.attr("tabindex", -1), this.$target.focus()
        },
        cancelBubble: function(e) {
            e.stopPropagation()
        },
        returnFocusIfOpen: function() {
            this.modalInstance && "opened" === this.modalInstance.state && this.$target.focus()
        }
    }, GM.modules.tabgroup = function(e) {
        this.$el = e, this.config = e.data(), this.$tabs = e.find(this.config.tabs).find("a, button"), this.$pages = e.find(this.config.pages).children(), this.tabs = [], this.$tabs.each(function(e, t) {
            var n = new GM.modules.tabgroup.Tab(this, $(t), this.$pages.eq(e));
            this.tabs.push(n)
        }.bind(this)), this.tabs[0].activate()
    }, GM.modules.tabgroup.prototype = {
        reset: function() {
            this.tabs.forEach(function(e) {
                e.deactivate()
            })
        }
    }, GM.modules.tabgroup.Tab = function(e, t, n) {
        this.active = !1, this.parent = e, this.$el = t, this.$page = n, this.$el.on("click", this.activate.bind(this))
    }, GM.modules.tabgroup.Tab.prototype = {
        activate: function(e) {
            e && e.preventDefault(), this.active || (this.parent.reset(), this.toggle(!0))
        },
        deactivate: function() {
            this.active && this.toggle(!1)
        },
        toggle: function(e) {
            this.active = e, this.$el.toggleClass("-selected", e), this.$page.toggleClass("shown", e).toggleClass("hidden", !e)
        }
    },
    function() {
        GM.initModules = function(e) {
            e.find("[data-module]").each(function() {
                var e = $(this),
                    t = new(GM.modules[e.attr("data-module")])(e);
                e.data("instance", t)
            })
        }, GM.initModules($("body")), "ontouchstart" in document.documentElement && $("body").addClass("-touch")
    }();
//# sourceMappingURL=maps/app.min.js.map