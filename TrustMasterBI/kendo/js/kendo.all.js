/*
* Kendo UI Complete v2012.3.1315 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
(function ($, undefined) {
	function Class() {
	}
	function compilePart(e, t) {
		if (t)
			return "'" + e.split("'").join("\\'").split('\\"').join('\\\\\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") + "'";
		var n = e.charAt(0), i = e.substring(1);
		return "=" === n ? "+(" + i + ")+" : ":" === n ? "+e(" + i + ")+" : ";" + e + ";o+="
	}
	function pad(e, t, n) {
		return e += "", t = t || 2, n = t - e.length, n ? zeros[t].substring(0, n) + e : e
	}
	function wrap(e) {
		var t, n = support.browser, i = "rtl" == e.css("direction");
		if (e.parent().hasClass("k-animation-container")) {
			var r = e.parent(".k-animation-container"), o = r[0].style;
			r.is(":hidden") && r.show(), t = percentRegExp.test(o.width) || percentRegExp.test(o.height), t || r.css({ width: e.outerWidth(), height: e.outerHeight() })
		}
		else {
			var a = e.css(kendo.support.transitions.css + "box-shadow") || e.css("box-shadow"), s = a ? a.match(boxShadowRegExp) || [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0], l = math.max(+s[3], +(s[4] || 0)), d = -s[1] + l, c = +s[1] + l, u = +s[2] + l, p = e[0].style.width, f = e[0].style.height, h = percentRegExp.test(p), m = percentRegExp.test(f);
			n.opera && (d = c = u = 5), t = h || m, h || (p = e.outerWidth()), m || (f = e.outerHeight()), e.wrap($("<div/>").addClass("k-animation-container").css({ width: p, height: f, marginLeft: d * (i ? 1 : -1), paddingLeft: d, paddingRight: c, paddingBottom: u })), t && e.css({ width: "100%", height: "100%", boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box" })
		}
		return n.msie && 7 >= math.floor(n.version) && e.css({ zoom: 1 }), e.parent()
	}
	function deepExtend(e) {
		var t = 1, n = arguments.length;
		for (t = 1; n > t; t++)
			deepExtendOne(e, arguments[t]);
		return e
	}
	function deepExtendOne(e, t) {
		var n, i, r, o, a = kendo.data.ObservableArray;
		for (n in t)
			i = t[n], r = typeof i, r === OBJECT && null !== i && i.constructor !== Array && i.constructor !== a ? i instanceof Date ? e[n] = new Date(i.getTime()) : (o = e[n], e[n] = typeof o === OBJECT ? o || {} : {}, deepExtendOne(e[n], i)) : r !== UNDEFINED && (e[n] = i);
		return e
	}
	function testRx(e, t, n) {
		for (var i in t)
			if (t.hasOwnProperty(i) && t[i].test(e))
				return i;
		return n !== undefined ? n : e
	}
	function getComputedStyles(e, t) {
		var n, i = {};
		return document.defaultView && document.defaultView.getComputedStyle ? (n = document.defaultView.getComputedStyle(e, ""), t && $.each(t, function (e, t) {
			i[t] = n.getPropertyValue(t)
		})) : (n = e.currentStyle, t && $.each(t, function (e, t) {
			i[t] = n[t.replace(/\-(\w)/g, function (e, t) {
				return t.toUpperCase()
			})]
		})), kendo.size(i) || (i = n), i
	}
	function size(e) {
		var t, n = 0;
		for (t in e)
			e.hasOwnProperty(t) && "toJSON" != t && n++;
		return n
	}
	function isNodeEmpty(e) {
		return "" === $.trim($(e).contents().filter(function () {
			return 8 != this.nodeType
		}).html())
	}
	function getOffset(e, t) {
		t || (t = "offset");
		var n = e[t](), i = support.mobileOS;
		if (support.touch && i.ios && 410 > i.flatVersion) {
			var r = "offset" == t ? n : e.offset(), o = n.left == r.left && n.top == r.top;
			if (o)
				return { top: n.top - window.scrollY, left: n.left - window.scrollX}
		}
		return n
	}
	function parseEffects(e) {
		var t = {};
		return each("string" == typeof e ? e.split(" ") : e, function (e) {
			t[e] = this
		}), t
	}
	function fx(e) {
		return new kendo.fx.Element(e)
	}
	function prepareAnimationOptions(e, t, n, i) {
		return typeof e === STRING && (isFunction(t) && (i = t, t = 400, n = !1), isFunction(n) && (i = n, n = !1), typeof t === BOOLEAN && (n = t, t = 400), e = { effects: e, duration: t, reverse: n, complete: i }), extend({ effects: {}, duration: 400, reverse: !1, init: noop, teardown: noop, hide: !1 }, e, { completeCallback: e.complete, complete: noop })
	}
	function animate(e, t, n, i, r) {
		for (var o, a = 0, s = e.length; s > a; a++)
			o = $(e[a]), o.queue(function () {
				fx.promise(o, prepareAnimationOptions(t, n, i, r))
			});
		return e
	}
	function animateTo(e, t, n, i, r, o) {
		return fx.transitionPromise(e, t, prepareAnimationOptions(n, i, r, o))
	}
	function toggleClass(e, t, n, i) {
		return t && (t = t.split(" "), each(t, function (t, n) {
			e.toggleClass(n, i)
		})), e
	}
	function htmlEncode(e) {
		return ("" + e).replace(ampRegExp, "&amp;").replace(ltRegExp, "&lt;").replace(gtRegExp, "&gt;")
	}
	function parseOption(element, option) {
		var value;
		return 0 === option.indexOf("data") && (option = option.substring(4), option = option.charAt(0).toLowerCase() + option.substring(1)), option = option.replace(dashRegExp, "-$1"), value = element.getAttribute("data-" + kendo.ns + option), null === value ? value = undefined : "null" === value ? value = null : "true" === value ? value = !0 : "false" === value ? value = !1 : isNaN(parseFloat(value)) ? jsonRegExp.test(value) && !jsonFormatRegExp.test(value) && (value = eval("(" + value + ")")) : value = parseFloat(value), value
	}
	function parseOptions(e, t) {
		var n, i, r = {};
		for (n in t)
			i = parseOption(e, n), i !== undefined && (templateRegExp.test(n) && (i = kendo.template($("#" + i).html())), r[n] = i);
		return r
	}
	function focusable(e, t) {
		var n = e.nodeName.toLowerCase();
		return (/input|select|textarea|button|object/.test(n) ? !e.disabled : "a" === n ? e.href || t : t) && visible(e)
	}
	function visible(e) {
		return !$(e).parents().andSelf().filter(function () {
			return "hidden" === $.css(this, "visibility") || $.expr.filters.hidden(this)
		}).length
	}
	function applyEventMap(e) {
		return eventMap[e] || e
	}
	function kendoJQuery(e, t) {
		return new kendoJQuery.fn.init(e, t)
	}
	var kendo = window.kendo = window.kendo || {}, extend = $.extend, each = $.each, proxy = $.proxy, isArray = $.isArray, noop = $.noop, isFunction = $.isFunction, math = Math, Template, JSON = window.JSON || {}, support = {}, percentRegExp = /%/, formatRegExp = /\{(\d+)(:[^\}]+)?\}/g, boxShadowRegExp = /(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i, FUNCTION = "function", STRING = "string", NUMBER = "number", OBJECT = "object", NULL = "null", BOOLEAN = "boolean", UNDEFINED = "undefined", getterCache = {}, setterCache = {}, slice = [].slice, globalize = window.Globalize;
	Class.extend = function (e) {
		var t, n, i = function () {
		}, r = this, o = e && e.init ? e.init : function () {
			r.apply(this, arguments)
		};
		i.prototype = r.prototype, n = o.fn = o.prototype = new i;
		for (t in e)
			n[t] = typeof e[t] !== OBJECT || e[t] instanceof Array || null === e[t] ? e[t] : extend(!0, {}, i.prototype[t], e[t]);
		return n.constructor = o, o.extend = r.extend, o
	};
	var Observable = Class.extend({ init: function () {
		this._events = {}
	}, bind: function (e, t, n) {
		var i, r, o, a, s, l = this, d = typeof e === STRING ? [e] : e, c = typeof t === FUNCTION;
		for (i = 0, r = d.length; r > i; i++)
			e = d[i], a = c ? t : t[e], a && (n && (o = a, a = function () {
				l.unbind(e, a), o.apply(l, arguments)
			}), s = l._events[e] = l._events[e] || [], s.push(a));
		return l
	}, one: function (e, t) {
		return this.bind(e, t, !0)
	}, first: function (e, t) {
		var n, i, r, o, a = this, s = typeof e === STRING ? [e] : e, l = typeof t === FUNCTION;
		for (n = 0, i = s.length; i > n; n++)
			e = s[n], r = l ? t : t[e], r && (o = a._events[e] = a._events[e] || [], o.unshift(r));
		return a
	}, trigger: function (e, t) {
		var n, i, r = this, o = r._events[e], a = !1;
		if (o)
			for (t = t || {}, t.sender = r, t.preventDefault = function () {
				a = !0
			}, t.isDefaultPrevented = function () {
				return a
			}, o = o.slice(), n = 0, i = o.length; i > n; n++)
				o[n].call(r, t);
		return a
	}, unbind: function (e, t) {
		var n, i, r = this, o = r._events[e];
		if (e === undefined)
			r._events = {};
		else if (o)
			if (t)
				for (n = 0, i = o.length; i > n; n++)
					o[n] === t && o.splice(n, 1);
			else
				r._events[e] = [];
		return r
	} }), argumentNameRegExp = /^\w+/, encodeRegExp = /\$\{([^}]*)\}/g, escapedCurlyRegExp = /\\\}/g, curlyRegExp = /__CURLY__/g, escapedSharpRegExp = /\\#/g, sharpRegExp = /__SHARP__/g, zeros = ["", "0", "00", "000", "0000"];
	Template = { paramName: "data", useWithBlock: !0, render: function (e, t) {
		var n, i, r = "";
		for (n = 0, i = t.length; i > n; n++)
			r += e(t[n]);
		return r
	}, compile: function (e, t) {
		var n, i, r = extend({}, this, t), o = r.paramName, a = o.match(argumentNameRegExp)[0], s = r.useWithBlock, l = "var o,e=kendo.htmlEncode;";
		if (isFunction(e))
			return 2 === e.length ? function (t) {
				return e($, { data: t }).join("")
			} : e;
		for (l += s ? "with(" + o + "){" : "", l += "o=", n = e.replace(escapedCurlyRegExp, "__CURLY__").replace(encodeRegExp, "#=e($1)#").replace(curlyRegExp, "}").replace(escapedSharpRegExp, "__SHARP__").split("#"), i = 0; n.length > i; i++)
			l += compilePart(n[i], 0 === i % 2);
		l += s ? ";}" : ";", l += "return o;", l = l.replace(sharpRegExp, "#");
		try {
			return Function(a, l)
		}
		catch (d) {
			throw Error(kendo.format("Invalid template:'{0}' Generated code:'{1}'", e, l))
		}
	} }, function () {
		function e(e) {
			return o.lastIndex = 0, o.test(e) ? '"' + e.replace(o, function (e) {
				var t = a[e];
				return typeof t === STRING ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + e + '"'
		}
		function t(o, a) {
			var l, d, c, u, p, f, h = n, m = a[o];
			if (m && typeof m === OBJECT && typeof m.toJSON === FUNCTION && (m = m.toJSON(o)), typeof r === FUNCTION && (m = r.call(a, o, m)), f = typeof m, f === STRING)
				return e(m);
			if (f === NUMBER)
				return isFinite(m) ? m + "" : NULL;
			if (f === BOOLEAN || f === NULL)
				return m + "";
			if (f === OBJECT) {
				if (!m)
					return NULL;
				if (n += i, p = [], "[object Array]" === s.apply(m)) {
					for (u = m.length, l = 0; u > l; l++)
						p[l] = t(l, m) || NULL;
					return c = 0 === p.length ? "[]" : n ? "[\n" + n + p.join(",\n" + n) + "\n" + h + "]" : "[" + p.join(",") + "]", n = h, c
				}
				if (r && typeof r === OBJECT)
					for (u = r.length, l = 0; u > l; l++)
						typeof r[l] === STRING && (d = r[l], c = t(d, m), c && p.push(e(d) + (n ? ": " : ":") + c));
				else
					for (d in m)
						Object.hasOwnProperty.call(m, d) && (c = t(d, m), c && p.push(e(d) + (n ? ": " : ":") + c));
				return c = 0 === p.length ? "{}" : n ? "{\n" + n + p.join(",\n" + n) + "\n" + h + "}" : "{" + p.join(",") + "}", n = h, c
			}
		}
		var n, i, r, o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, a = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, s = {}.toString;
		typeof Date.prototype.toJSON !== FUNCTION && (Date.prototype.toJSON = function () {
			var e = this;
			return isFinite(e.valueOf()) ? pad(e.getUTCFullYear(), 4) + "-" + pad(e.getUTCMonth() + 1) + "-" + pad(e.getUTCDate()) + "T" + pad(e.getUTCHours()) + ":" + pad(e.getUTCMinutes()) + ":" + pad(e.getUTCSeconds()) + "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
			return this.valueOf()
		}), typeof JSON.stringify !== FUNCTION && (JSON.stringify = function (e, o, a) {
			var s;
			if (n = "", i = "", typeof a === NUMBER)
				for (s = 0; a > s; s += 1)
					i += " ";
			else
				typeof a === STRING && (i = a);
			if (r = o, o && typeof o !== FUNCTION && (typeof o !== OBJECT || typeof o.length !== NUMBER))
				throw Error("JSON.stringify");
			return t("", { "": e })
		})
	}(), function () {
		function e(e) {
			if (e) {
				if (e.numberFormat)
					return e;
				if (typeof e === STRING) {
					var t = kendo.cultures;
					return t[e] || t[e.split("-")[0]] || null
				}
				return null
			}
			return null
		}
		function t(t) {
			return t && (t = e(t)), t || kendo.cultures.current
		}
		function n(e, n, i) {
			i = t(i);
			var o = i.calendars.standard, a = o.days, s = o.months;
			return n = o.patterns[n] || n, n.replace(r, function (t) {
				var n;
				return "d" === t ? n = e.getDate() : "dd" === t ? n = pad(e.getDate()) : "ddd" === t ? n = a.namesAbbr[e.getDay()] : "dddd" === t ? n = a.names[e.getDay()] : "M" === t ? n = e.getMonth() + 1 : "MM" === t ? n = pad(e.getMonth() + 1) : "MMM" === t ? n = s.namesAbbr[e.getMonth()] : "MMMM" === t ? n = s.names[e.getMonth()] : "yy" === t ? n = pad(e.getFullYear() % 100) : "yyyy" === t ? n = pad(e.getFullYear(), 4) : "h" === t ? n = e.getHours() % 12 || 12 : "hh" === t ? n = pad(e.getHours() % 12 || 12) : "H" === t ? n = e.getHours() : "HH" === t ? n = pad(e.getHours()) : "m" === t ? n = e.getMinutes() : "mm" === t ? n = pad(e.getMinutes()) : "s" === t ? n = e.getSeconds() : "ss" === t ? n = pad(e.getSeconds()) : "f" === t ? n = math.floor(e.getMilliseconds() / 100) : "ff" === t ? n = math.floor(e.getMilliseconds() / 10) : "fff" === t ? n = e.getMilliseconds() : "tt" === t && (n = 12 > e.getHours() ? o.AM[0] : o.PM[0]), n !== undefined ? n : t.slice(1, t.length - 1)
			})
		}
		function i(e, n, i) {
			i = t(i);
			var r, h, m, g, v, b, _, x, k, w, y, C, T, S, A, D, E, F, I, P, z, R = i.numberFormat, N = R.groupSize[0], O = R[c], M = R[d], H = R.decimals, B = R.pattern[0], L = [], V = 0 > e, U = l, j = l, W = -1;
			if (e === undefined)
				return l;
			if (!isFinite(e))
				return e;
			if (!n)
				return i.name.length ? e.toLocaleString() : "" + e;
			if (v = o.exec(n)) {
				if (n = v[1].toLowerCase(), h = "c" === n, m = "p" === n, (h || m) && (R = h ? R.currency : R.percent, N = R.groupSize[0], O = R[c], M = R[d], H = R.decimals, r = R.symbol, B = R.pattern[V ? 0 : 1]), g = v[2], g && (H = +g), "e" === n)
					return g ? e.toExponential(H) : e.toExponential();
				if (m && (e *= 100), e = e.toFixed(H), e = e.split(d), b = e[0], _ = e[1], V && (b = b.substring(1)), j = b, x = b.length, x >= N)
					for (j = l, w = 0; x > w; w++)
						w > 0 && 0 === (x - w) % N && (j += O), j += b.charAt(w);
				if (_ && (j += M + _), "n" === n && !V)
					return j;
				for (e = l, w = 0, y = B.length; y > w; w++)
					C = B.charAt(w), e += "n" === C ? j : "$" === C || "%" === C ? r : C;
				return e
			}
			if (V && (e = -e), n = n.split(";"), V && n[1])
				n = n[1], S = !0;
			else if (0 === e) {
				if (n = n[2] || n[0], -1 == n.indexOf(u) && -1 == n.indexOf(p))
					return n
			}
			else
				n = n[0];
			if ((n.indexOf("'") > -1 || n.indexOf('"') > -1) && (n = n.replace(a, function (e) {
				return L.push(e), f
			})), F = n.indexOf("%"), I = n.indexOf("$"), m = -1 != F, h = -1 != I, m && ("\\" !== n[F - 1] ? e *= 100 : n = n.split("\\").join("")), h && "\\" === n[I - 1] && (n = n.split("\\").join(""), h = !1), (h || m) && (R = h ? R.currency : R.percent, N = R.groupSize[0], O = R[c], M = R[d], H = R.decimals, r = R.symbol), T = n.indexOf(c) > -1, T && (n = n.replace(s, l)), A = n.indexOf(d), y = n.length, -1 != A ? (E = n.lastIndexOf(p), D = n.lastIndexOf(u), _ = ("" + e).split(d)[1] || l, D > E && _.length > D - E ? w = D : -1 != E && E >= A && (w = E), w && (e = e.toFixed(w - A))) : e = e.toFixed(0), D = n.indexOf(u), P = E = n.indexOf(p), W = -1 == D && -1 != E ? E : -1 != D && -1 == E ? D : D > E ? E : D, D = n.lastIndexOf(u), E = n.lastIndexOf(p), z = -1 == D && -1 != E ? E : -1 != D && -1 == E ? D : D > E ? D : E, W == y && (z = W), -1 != W) {
				if (j = ("" + e).split(d), b = j[0], _ = j[1] || l, x = b.length, k = _.length, T)
					if (x === N && A - P > x)
						b = O + b;
					else if (x > N) {
						for (j = l, w = 0; x > w; w++)
							w > 0 && 0 === (x - w) % N && (j += O), j += b.charAt(w);
						b = j
					}
				for (e = n.substring(0, W), V && !S && (e += "-"), w = W; y > w; w++) {
					if (C = n.charAt(w), -1 == A) {
						if (x > z - w) {
							e += b;
							break
						}
					}
					else if (-1 != E && w > E && (U = l), x >= A - w && A - w > -1 && (e += b, w = A), A === w) {
						e += (_ ? M : l) + _, w += z - A + 1;
						continue
					}
					C === p ? (e += C, U = C) : C === u && (e += U)
				}
				if (z >= W && (e += n.substring(z + 1)), h || m) {
					for (j = l, w = 0, y = e.length; y > w; w++)
						C = e.charAt(w), j += "$" === C || "%" === C ? r : C;
					e = j
				}
				if (L[0])
					for (y = L.length, w = 0; y > w; w++)
						e = e.replace(f, L[w])
			}
			return e
		}
		var r = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g, o = /^(n|c|p|e)(\d*)$/i, a = /["'].*?["']/g, s = /\,/g, l = "", d = ".", c = ",", u = "#", p = "0", f = "??", h = "en-US";
		kendo.cultures = { "en-US": { name: h, numberFormat: { pattern: ["-n"], decimals: 2, ",": ",", ".": ".", groupSize: [3], percent: { pattern: ["-n %", "n %"], decimals: 2, ",": ",", ".": ".", groupSize: [3], symbol: "%" }, currency: { pattern: ["($n)", "$n"], decimals: 2, ",": ",", ".": ".", groupSize: [3], symbol: "$"} }, calendars: { standard: { days: { names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] }, months: { names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] }, AM: ["AM", "am", "AM"], PM: ["PM", "pm", "PM"], patterns: { d: "M/d/yyyy", D: "dddd, MMMM dd, yyyy", F: "dddd, MMMM dd, yyyy h:mm:ss tt", g: "M/d/yyyy h:mm tt", G: "M/d/yyyy h:mm:ss tt", m: "MMMM dd", M: "MMMM dd", s: "yyyy'-'MM'-'ddTHH':'mm':'ss", t: "h:mm tt", T: "h:mm:ss tt", u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", y: "MMMM, yyyy", Y: "MMMM, yyyy" }, "/": "/", ":": ":", firstDay: 0}}} }, kendo.culture = function (t) {
			var n, i = kendo.cultures;
			return t === undefined ? i.current : (n = e(t) || i[h], n.calendar = n.calendars.standard, i.current = n, undefined)
		}, kendo.findCulture = e, kendo.getCulture = t, kendo.culture(h);
		var m = function (e, t, r) {
			if (t) {
				if (e instanceof Date)
					return n(e, t, r);
				if (typeof e === NUMBER)
					return i(e, t, r)
			}
			return e !== undefined ? e : ""
		};
		globalize && (m = proxy(globalize.format, globalize)), kendo.format = function (e) {
			var t = arguments;
			return e.replace(formatRegExp, function (e, n, i) {
				var r = t[parseInt(n, 10) + 1];
				return m(r, i ? i.substring(1) : "")
			})
		}, kendo._extractFormat = function (e) {
			return "{0:" === e.slice(0, 3) && (e = e.slice(3, e.length - 1)), e
		}, kendo.toString = m
	}(), function () {
		function e(e, t, n) {
			return !(e >= t && n >= e)
		}
		function t(e) {
			return e.charAt(0)
		}
		function n(e) {
			return $.map(e, t)
		}
		function i(e, t) {
			t || 23 !== e.getHours() || e.setHours(e.getHours() + 2)
		}
		function r(t, r, o) {
			if (!t)
				return null;
			var a, d, c, p, f, h, m, g, v, b, _, x, k, w = function (e) {
				for (var t = 0; r[R] === e;)
					t++, R++;
				return t > 0 && (R -= 1), t
			}, y = function (e) {
				var n = u[e] || RegExp("^\\d{1," + e + "}"), i = t.substr(N, e).match(n);
				return i ? (i = i[0], N += i.length, parseInt(i, 10)) : null
			}, C = function (e) {
				for (var n, i, r = 0, o = e.length; o > r; r++)
					if (n = e[r], i = n.length, t.substr(N, i) == n)
						return N += i, r + 1;
				return null
			}, T = function () {
				var e = !1;
				return t.charAt(N) === r[R] && (N++, e = !0), e
			}, S = o.calendars.standard, A = null, D = null, E = null, F = null, I = null, P = null, z = null, R = 0, N = 0, O = !1, M = new Date, H = 30, B = M.getFullYear();
			for (r || (r = "d"), p = S.patterns[r], p && (r = p), r = r.split(""), c = r.length; c > R; R++)
				if (a = r[R], O)
					"'" === a ? O = !1 : T();
				else if ("d" === a) {
					if (d = w("d"), E = 3 > d ? y(2) : C(S.days[3 == d ? "namesAbbr" : "names"]), null === E || e(E, 1, 31))
						return null
				}
				else if ("M" === a) {
					if (d = w("M"), D = 3 > d ? y(2) : C(S.months[3 == d ? "namesAbbr" : "names"]), null === D || e(D, 1, 12))
						return null;
					D -= 1
				}
				else if ("y" === a) {
					if (d = w("y"), A = y(d), null === A)
						return null;
					2 == d && (k = B - B % 100, A > H && (k -= 100), A = k + A)
				}
				else if ("h" === a) {
					if (w("h"), F = y(2), 12 == F && (F = 0), null === F || e(F, 0, 11))
						return null
				}
				else if ("H" === a) {
					if (w("H"), F = y(2), null === F || e(F, 0, 23))
						return null
				}
				else if ("m" === a) {
					if (w("m"), I = y(2), null === I || e(I, 0, 59))
						return null
				}
				else if ("s" === a) {
					if (w("s"), P = y(2), null === P || e(P, 0, 59))
						return null
				}
				else if ("f" === a) {
					if (d = w("f"), z = y(d), null !== z && d > 3 && (z = parseInt(("" + z).substring(0, 3), 10)), null === z || e(z, 0, 999))
						return null
				}
				else if ("t" === a) {
					if (d = w("t"), v = S.AM, b = S.PM, 1 === d && (v = n(v), b = n(b)), f = C(b), !f && !C(v))
						return null
				}
				else if ("z" === a) {
					if (h = !0, d = w("z"), "Z" === t.substr(N, 1)) {
						if (!m)
							return null;
						T();
						continue
					}
					if (g = t.substr(N, 6).match(d > 2 ? l : s), !g)
						return null;
					if (g = g[0], N = g.length, g = g.split(":"), _ = parseInt(g[0], 10), e(_, -12, 13))
						return null;
					if (d > 2 && (x = parseInt(g[1], 10), isNaN(x) || e(x, 0, 59)))
						return null
				}
				else if ("T" === a)
					m = T();
				else if ("'" === a)
					O = !0, T();
				else if (!T())
					return null;
			return null === A && (A = B), f && 12 > F && (F += 12), null === E && (E = 1), h ? (_ && (F += -_), x && (I += -x), t = new Date(Date.UTC(A, D, E, F, I, P, z))) : (t = new Date(A, D, E, F, I, P, z), i(t, F)), 100 > A && t.setFullYear(A), t.getDate() !== E ? null : t
		}
		var o = /\u00A0/g, a = /[eE][\-+]?[0-9]+/, s = /[+|\-]\d{1,2}/, l = /[+|\-]\d{1,2}:\d{2}/, d = /^\/Date\((.*?)\)\/$/, c = ["G", "g", "d", "F", "D", "y", "m", "T", "t"], u = { 2: /^\d{1,2}/, 4: /^\d{4}/ };
		kendo._adjustDate = i, kendo.parseDate = function (e, t, n) {
			if (e instanceof Date)
				return e;
			var i, o, a = 0, s = null;
			if (e && 0 === e.indexOf("/D") && (s = d.exec(e)))
				return new Date(parseInt(s[1], 10));
			if (n = kendo.getCulture(n), !t) {
				for (t = [], o = n.calendar.patterns, i = c.length; i > a; a++)
					t[a] = o[c[a]];
				t[a] = "ddd MMM dd yyyy HH:mm:ss", t[++a] = "yyyy-MM-ddTHH:mm:ss.fffffffzzz", t[++a] = "yyyy-MM-ddTHH:mm:ss.fffzzz", t[++a] = "yyyy-MM-ddTHH:mm:sszzz", t[++a] = "yyyy-MM-ddTHH:mmzzz", t[++a] = "yyyy-MM-ddTHH:mmzz", t[++a] = "yyyy-MM-dd", a = 0
			}
			for (t = isArray(t) ? t : [t], i = t.length; i > a; a++)
				if (s = r(e, t[a], n))
					return s;
			return s
		}, kendo.parseInt = function (e, t) {
			var n = kendo.parseFloat(e, t);
			return n && (n = 0 | n), n
		}, kendo.parseFloat = function (e, t, n) {
			if (!e && 0 !== e)
				return null;
			if (typeof e === NUMBER)
				return e;
			e = "" + e, t = kendo.getCulture(t);
			var i, r, s = t.numberFormat, l = s.percent, d = s.currency, c = d.symbol, u = l.symbol, p = e.indexOf("-") > -1;
			return a.test(e) ? (e = parseFloat(e), isNaN(e) && (e = null), e) : (e.indexOf(c) > -1 || n && n.toLowerCase().indexOf("c") > -1 ? (s = d, i = s.pattern[0].replace("$", c).split("n"), e.indexOf(i[0]) > -1 && e.indexOf(i[1]) > -1 && (e = e.replace(i[0], "").replace(i[1], ""), p = !0)) : e.indexOf(u) > -1 && (r = !0, s = l, c = u), e = e.replace("-", "").replace(c, "").replace(o, " ").split(s[","].replace(o, " ")).join("").replace(s["."], "."), e = parseFloat(e), isNaN(e) ? e = null : p && (e *= -1), e && r && (e /= 100), e)
		}, globalize && (kendo.parseDate = function (e, t, n) {
			return e instanceof Date ? e : globalize.parseDate(e, t, n)
		}, kendo.parseFloat = function (e, t) {
			return typeof e === NUMBER ? e : e === undefined ? null : globalize.parseFloat(e, t)
		})
	}(), function () {
		function e(e) {
			var t = !1, n = [], i = { webkit: /(chrome)[ \/]([\w.]+)/i, safari: /(webkit)[ \/]([\w.]+)/i, opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i, msie: /(msie) ([\w.]+)/i, mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i };
			for (var r in i)
				if (i.hasOwnProperty(r) && (n = e.match(i[r]))) {
					t = {}, t[r] = !0, t[n[1].toLowerCase()] = !0, t.version = n[2];
					break
				}
			return t
		}
		support.scrollbar = function () {
			var e, t = document.createElement("div");
			return t.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both", t.innerHTML = "&nbsp;", document.body.appendChild(t), e = t.offsetWidth - t.scrollWidth, document.body.removeChild(t), e
		}, support.isRtl = function (e) {
			return $(e).closest(".k-rtl").length > 0
		};
		var t = document.createElement("table");
		try {
			t.innerHTML = "<tr><td></td></tr>", support.tbodyInnerHtml = !0
		}
		catch (n) {
			support.tbodyInnerHtml = !1
		}
		support.touch = "ontouchstart" in window, support.pointers = navigator.msPointerEnabled;
		var i = support.transitions = !1, r = support.transforms = !1, o = "HTMLElement" in window ? HTMLElement.prototype : [];
		support.hasHW3D = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix || "MozPerspective" in document.documentElement.style || "msPerspective" in document.documentElement.style, support.hasNativeScrolling = "string" == typeof document.documentElement.style.webkitOverflowScrolling, each(["Moz", "webkit", "O", "ms"], function () {
			var e = "" + this, n = typeof t.style[e + "Transition"] === STRING;
			if (n || typeof t.style[e + "Transform"] === STRING) {
				var o = e.toLowerCase();
				return r = { css: "-" + o + "-", prefix: e, event: "o" === o || "webkit" === o ? o : "ms" === o ? "MS" : "" }, n && (i = r, i.event = i.event ? i.event + "TransitionEnd" : "transitionend"), !1
			}
		}), support.transforms = r, support.transitions = i, support.devicePixelRatio = window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio, support.screenWidth = window.outerWidth || window.screen ? window.screen.availWidth : window.innerWidth, support.screenHeight = window.outerHeight || window.screen ? window.screen.availHeight : window.innerHeight, support.detectOS = function (e) {
			var t, n = !1, i = [], r = !/mobile safari/i.test(e), o = { fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/, android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/, iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/, ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/, meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/, webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/, blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/, playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/, winphone: /(IEMobile)\/(\d+)\.(\d+(\.\d+)?)/, windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/ }, a = { ios: /^i(phone|pad|pod)$/i, android: /^android|fire$/i, blackberry: /^blackberry|playbook/i, windows: /windows|winphone/ }, s = { tablet: /playbook|ipad|fire/i }, l = { omini: /Opera\sMini/i, omobile: /Opera\sMobi/i, firefox: /Firefox|Fennec/i, mobilesafari: /version\/.*safari/i, chrome: /chrome/i, webkit: /webkit/i, ie: /MSIE|Windows\sPhone/i };
			for (var d in o)
				if (o.hasOwnProperty(d) && (i = e.match(o[d]))) {
					if ("windows" == d && "plugins" in navigator)
						return !1;
					n = {}, n.device = d, n.tablet = testRx(d, s, !1), n.browser = testRx(e, l, "default"), n.name = testRx(d, a), n[n.name] = !0, n.majorVersion = i[2], n.minorVersion = i[3].replace("_", "."), t = n.minorVersion.replace(".", "").substr(0, 2), n.flatVersion = n.majorVersion + t + Array(3 - (3 > t.length ? t.length : 2)).join("0"), n.appMode = window.navigator.standalone || /file|local/.test(window.location.protocol) || typeof window.PhoneGap !== UNDEFINED || typeof window.cordova !== UNDEFINED, n.android && (1.5 > support.devicePixelRatio && 400 > n.flatVersion || r) && (support.screenWidth > 800 || support.screenHeight > 800) && (n.tablet = d);
					break
				}
			return n
		}, support.mobileOS = support.detectOS(navigator.userAgent), support.kineticScrollNeeded = support.mobileOS && support.touch, support.browser = e(navigator.userAgent), function (e) {
			var t, n = "" + e.version, i = n.substring(0, n.indexOf("."));
			e.msie ? t = "ie" : e.mozilla ? t = "ff" : e.safari ? t = "safari" : e.webkit ? t = "webkit" : e.opera && (t = "opera"), t && $(document.documentElement).addClass("k-" + t + " k-" + t + i)
		}(support.browser), support.zoomLevel = function () {
			return support.touch ? document.documentElement.clientWidth / window.innerWidth : 1
		}, support.eventCapture = document.documentElement.addEventListener, support.placeholder = "placeholder" in document.createElement("input"), support.stableSort = function () {
			var e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(function () {
				return 0
			});
			return 0 === e[0] && 1 === e[1] && 2 === e[2] && 3 === e[3] && 4 === e[4] && 5 === e[5] && 6 === e[6] && 7 === e[7] && 8 === e[8] && 9 === e[9] && 10 === e[10] && 11 === e[11] && 12 === e[12]
		}(), support.matchesSelector = o.webkitMatchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.matchesSelector || function (e) {
			for (var t = document.querySelectorAll ? (this.parentNode || document).querySelectorAll(e) || [] : $(e), n = t.length; n--;)
				if (t[n] == this)
					return !0;
			return !1
		}
	}();
	var directions = { left: { reverse: "right" }, right: { reverse: "left" }, down: { reverse: "up" }, up: { reverse: "down" }, top: { reverse: "bottom" }, bottom: { reverse: "top" }, "in": { reverse: "out" }, out: { reverse: "in"} };
	$.extend(fx, { Element: function (e) {
		this.element = $(e)
	}, promise: function (e, t) {
		e.is(":visible") || e.css({ display: e.data("olddisplay") || "block" }).css("display"), t.hide && e.data("olddisplay", e.css("display")).hide(), t.init && t.init(), t.completeCallback && t.completeCallback(e), e.dequeue()
	}, transitionPromise: function (e, t, n) {
		var i = kendo.wrap(e);
		return i.append(t), e.hide(), t.show(), n.completeCallback && n.completeCallback(e), e
	} }), "kendoAnimate" in $.fn || extend($.fn, { kendoStop: function (e, t) {
		return this.stop(e, t)
	}, kendoAnimate: function (e, t, n, i) {
		return animate(this, e, t, n, i)
	}, kendoAnimateTo: function (e, t, n, i, r) {
		return animateTo(this, e, t, n, i, r)
	}, kendoAddClass: function (e, t) {
		return kendo.toggleClass(this, e, t, !0)
	}, kendoRemoveClass: function (e, t) {
		return kendo.toggleClass(this, e, t, !1)
	}, kendoToggleClass: function (e, t, n) {
		return kendo.toggleClass(this, e, t, n)
	} });
	var ampRegExp = /&/g, ltRegExp = /</g, gtRegExp = />/g, touchLocation = function (e) {
		var t = typeof e.pageX == UNDEFINED ? e.originalEvent : e;
		return { idx: support.pointers ? t.pointerId : 0, x: t.pageX, y: t.pageY}
	}, eventTarget = function (e) {
		return e.target
	};
	if (support.touch) {
		var mobileChrome = "chrome" == support.mobileOS.browser && !support.mobileOS.ios;
		touchLocation = function (e, t) {
			var n = e.changedTouches || e.originalEvent.changedTouches;
			if (t) {
				var i = null;
				return each(n, function (e, n) {
					t == n.identifier && (i = { idx: n.identifier, x: n.pageX, y: n.pageY })
				}), i
			}
			return { idx: n[0].identifier, x: n[0].pageX, y: n[0].pageY}
		}, eventTarget = function (e) {
			var t = "originalEvent" in e ? e.originalEvent.changedTouches : "changedTouches" in e ? e.changedTouches : null, n = mobileChrome ? "screen" : "client";
			return t ? document.elementFromPoint(t[0][n + "X"], t[0][n + "Y"]) : e.target
		}, each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function (e, t) {
			$.fn[t] = function (e) {
				return this.bind(t, e)
			}
		})
	}
	support.touch ? support.mobileOS ? (support.mousedown = "touchstart", support.mouseup = "touchend", support.mousemove = "touchmove", support.mousecancel = "touchcancel", support.click = "touchend", support.resize = "orientationchange") : (support.mousedown = "mousedown touchstart", support.mouseup = "mouseup touchend", support.mousemove = "mousemove touchmove", support.mousecancel = "mouseleave touchcancel", support.click = "click", support.resize = "resize") : support.pointers ? (support.mousemove = "MSPointerMove", support.mousedown = "MSPointerDown", support.mouseup = "MSPointerUp", support.mousecancel = "MSPointerCancel", support.click = "MSPointerUp", support.resize = "orientationchange resize") : (support.mousemove = "mousemove", support.mousedown = "mousedown", support.mouseup = "mouseup", support.mousecancel = "mouseleave", support.click = "click", support.resize = "resize");
	var wrapExpression = function (e) {
		var t, n, i, r, o = "d", a = 1;
		for (n = 0, i = e.length; i > n; n++)
			r = e[n], "" !== r && (t = r.indexOf("["), 0 !== t && (-1 == t ? r = "." + r : (a++, r = "." + r.substring(0, t) + " || {})" + r.substring(t))), a++, o += r + (i - 1 > n ? " || {})" : ")"));
		return Array(a).join("(") + o
	}, localUrlRe = /^([a-z]+:)?\/\//i;
	extend(kendo, { ui: kendo.ui || {}, fx: kendo.fx || fx, mobile: kendo.mobile || {}, data: kendo.data || {}, dataviz: kendo.dataviz || { ui: { roles: {}} }, keys: { INSERT: 45, DELETE: 46, BACKSPACE: 8, TAB: 9, ENTER: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, END: 35, HOME: 36, SPACEBAR: 32, PAGEUP: 33, PAGEDOWN: 34, F2: 113, F10: 121, F12: 123 }, support: kendo.support || support, animate: kendo.animate || animate, ns: "", attr: function (e) {
		return "data-" + kendo.ns + e
	}, wrap: wrap, deepExtend: deepExtend, getComputedStyles: getComputedStyles, size: size, isNodeEmpty: isNodeEmpty, getOffset: kendo.getOffset || getOffset, parseEffects: kendo.parseEffects || parseEffects, toggleClass: kendo.toggleClass || toggleClass, directions: kendo.directions || directions, Observable: Observable, Class: Class, Template: Template, template: proxy(Template.compile, Template), render: proxy(Template.render, Template), stringify: proxy(JSON.stringify, JSON), touchLocation: touchLocation, eventTarget: eventTarget, htmlEncode: htmlEncode, isLocalUrl: function (e) {
		return e && !localUrlRe.test(e)
	}, expr: function (e, t) {
		return e = e || "", e && "[" !== e.charAt(0) && (e = "." + e), e = t ? wrapExpression(e.split(".")) : "d" + e
	}, getter: function (e, t) {
		return getterCache[e] = getterCache[e] || Function("d", "return " + kendo.expr(e, t))
	}, setter: function (e) {
		return setterCache[e] = setterCache[e] || Function("d,value", "d." + e + "=value")
	}, accessor: function (e) {
		return { get: kendo.getter(e), set: kendo.setter(e)}
	}, guid: function () {
		var e, t, n = "";
		for (e = 0; 32 > e; e++)
			t = 0 | 16 * math.random(), (8 == e || 12 == e || 16 == e || 20 == e) && (n += "-"), n += (12 == e ? 4 : 16 == e ? 8 | 3 & t : t).toString(16);
		return n
	}, roleSelector: function (e) {
		return e.replace(/(\S+)/g, "[" + kendo.attr("role") + "=$1],").slice(0, -1)
	}, logToConsole: function (e) {
		var t = window.console;
		t !== undefined && t.log && t.log(e)
	} });
	var Widget = Observable.extend({ init: function (e, t) {
		var n = this;
		n.element = kendo.jQuery(e).handler(n), Observable.fn.init.call(n), t = n.options = extend(!0, {}, n.options, t), n.element.attr(kendo.attr("role")) || n.element.attr(kendo.attr("role"), (t.name || "").toLowerCase()), n.element.data("kendo" + t.prefix + t.name, n), n.bind(n.events, t)
	}, events: [], options: { prefix: "" }, _tabindex: function (e) {
		e = e || this.wrapper;
		var t = this.element, n = "tabindex", i = e.attr(n) || t.attr(n);
		t.removeAttr(n), e.attr(n, isNaN(i) ? 0 : i)
	}, setOptions: function (e) {
		for (var t, n = this, i = 0, r = n.events.length; r > i; i++)
			t = n.events[i], n.options[t] && e[t] && n.unbind(t, n.options[t]);
		$.extend(n.options, e), n.bind(n.events, e)
	}, destroy: function () {
		var e = this;
		e.element.removeData("kendo" + e.options.prefix + e.options.name), e.unbind()
	} });
	kendo.notify = noop;
	var templateRegExp = /template$/i, jsonRegExp = /^\s*(?:\{(?:.|\n)*\}|\[(?:.|\n)*\])\s*$/, jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}/, dashRegExp = /([A-Z])/g;
	kendo.initWidget = function (e, t, n) {
		var i, r, o, a, s, l, d, c;
		if (n ? n.roles && (n = n.roles) : n = kendo.ui.roles, e = e.nodeType ? e : e[0], l = e.getAttribute("data-" + kendo.ns + "role"), l && (o = -1 === l.indexOf(".") ? n[l] : kendo.getter(l)(window))) {
			for (c = parseOption(e, "dataSource"), t = $.extend({}, parseOptions(e, o.fn.options), t), c && (t.dataSource = typeof c === STRING ? kendo.getter(c)(window) : c), a = 0, s = o.fn.events.length; s > a; a++)
				r = o.fn.events[a], d = parseOption(e, r), d !== undefined && (t[r] = kendo.getter(d)(window));
			return i = $(e).data("kendo" + o.fn.options.prefix + o.fn.options.name), i ? i.setOptions(t) : i = new o(e, t), i
		}
	}, kendo.rolesFromNamespaces = function (e) {
		var t, n, i = [];
		for (e[0] || (e = [kendo.ui, kendo.dataviz.ui]), t = 0, n = e.length; n > t; t++)
			i[t] = e[t].roles;
		return extend.apply(null, [{}].concat(i.reverse()))
	}, kendo.init = function (e) {
		var t = kendo.rolesFromNamespaces(slice.call(arguments, 1));
		$(e).find("[data-" + kendo.ns + "role]").andSelf().each(function () {
			kendo.initWidget(this, {}, t)
		})
	}, kendo.destroy = function (e) {
		$(e).find("[data-" + kendo.ns + "role]").andSelf().each(function () {
			var e = $(this), t = kendo.widgetInstance(e, kendo.ui) || kendo.widgetInstance(e, kendo.mobile.ui) || kendo.widgetInstance(e, kendo.dataviz.ui);
			t && t.destroy()
		})
	}, kendo.parseOptions = parseOptions, extend(kendo.ui, { Widget: Widget, roles: {}, progress: function (e, t) {
		var n = e.find(".k-loading-mask");
		t ? n.length || (n = $("<div class='k-loading-mask'><span class='k-loading-text'>Loading...</span><div class='k-loading-image'/><div class='k-loading-color'/></div>").width("100%").height("100%").prependTo(e).css({ top: e.scrollTop(), left: e.scrollLeft() })) : n && n.remove()
	}, plugin: function (e, t, n) {
		var i, r = e.fn.options.name;
		t = t || kendo.ui, n = n || "", t[r] = e, t.roles[r.toLowerCase()] = e, i = "getKendo" + n + r, r = "kendo" + n + r, $.fn[r] = function (t) {
			var n, i = this;
			return typeof t === STRING ? (n = slice.call(arguments, 1), this.each(function () {
				var e, o, a = $.data(this, r);
				if (!a)
					throw Error(kendo.format("Cannot call method '{0}' of {1} before it is initialized", t, r));
				if (e = a[t], typeof e !== FUNCTION)
					throw Error(kendo.format("Cannot find method '{0}' of {1}", t, r));
				return o = e.apply(a, n), o !== undefined ? (i = o, !1) : undefined
			})) : this.each(function () {
				new e(this, t)
			}), i
		}, $.fn[i] = function () {
			return this.data(r)
		}
	} });
	var ContainerNullObject = { bind: $.noop }, MobileWidget = Widget.extend({ init: function (e, t) {
		Widget.fn.init.call(this, e, t), this.element.autoApplyNS(), this.wrapper = this.element
	}, destroy: function () {
		Widget.fn.destroy.call(this), this.element.kendoDestroy()
	}, options: { prefix: "Mobile" }, events: [], view: function () {
		var e = this.element.closest(kendo.roleSelector("view splitview"));
		return e.data("kendoMobileView") || e.data("kendoMobileSplitView")
	}, container: function () {
		var e = this.element.closest(kendo.roleSelector("view layout modalview"));
		return kendo.widgetInstance(e, kendo.mobile.ui) || ContainerNullObject
	} });
	extend(kendo.mobile, { init: function (e) {
		kendo.init(e, kendo.mobile.ui, kendo.ui, kendo.dataviz.ui)
	}, ui: { Widget: MobileWidget, roles: {}, plugin: function (e) {
		kendo.ui.plugin(e, kendo.mobile.ui, "Mobile")
	} } }), kendo.touchScroller = function (e, t) {
		return $(e).map(function (e, n) {
			return n = $(n), support.kineticScrollNeeded && kendo.mobile.ui.Scroller && !n.data("kendoMobileScroller") ? (n.kendoMobileScroller(t), n.data("kendoMobileScroller")) : !1
		})[0]
	}, kendo.preventDefault = function (e) {
		e.preventDefault()
	}, kendo.widgetInstance = function (e, t) {
		var n = t.roles[e.data(kendo.ns + "role")];
		return n ? e.data("kendo" + n.fn.options.prefix + n.fn.options.name) : undefined
	}, kendo.onResize = function (e) {
		var t = e;
		support.mobileOS.android && (t = function () {
			setTimeout(e, 200)
		}), $(window).on(support.resize, t)
	}, kendo.attrValue = function (e, t) {
		return e.data(kendo.ns + t)
	}, kendo.days = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }, $.extend($.expr[":"], { focusable: function (e) {
		var t = $.attr(e, "tabindex");
		return focusable(e, !isNaN(t) && t > -1)
	} });
	var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"], EXCLUDE_BUST_CLICK_SELECTOR = "label, input, [data-rel=external]", MouseEventNormalizer = { setupMouseMute: function () {
		var e = 0, t = MOUSE_EVENTS.length, n = document.documentElement;
		if (!MouseEventNormalizer.mouseTrap && support.eventCapture) {
			MouseEventNormalizer.mouseTrap = !0, MouseEventNormalizer.bustClick = !1, MouseEventNormalizer.captureMouse = !1;
			for (var i = function (e) {
				MouseEventNormalizer.captureMouse && ("click" === e.type ? MouseEventNormalizer.bustClick && !$(e.target).is(EXCLUDE_BUST_CLICK_SELECTOR) && (e.preventDefault(), e.stopPropagation()) : e.stopPropagation())
			}; t > e; e++)
				n.addEventListener(MOUSE_EVENTS[e], i, !0)
		}
	}, muteMouse: function (e) {
		MouseEventNormalizer.captureMouse = !0, e.data.bustClick && (MouseEventNormalizer.bustClick = !0), clearTimeout(MouseEventNormalizer.mouseTrapTimeoutID)
	}, unMuteMouse: function () {
		clearTimeout(MouseEventNormalizer.mouseTrapTimeoutID), MouseEventNormalizer.mouseTrapTimeoutID = setTimeout(function () {
			MouseEventNormalizer.captureMouse = !1, MouseEventNormalizer.bustClick = !1
		}, 400)
	} }, eventMap = { down: "touchstart mousedown", move: "mousemove touchmove", up: "mouseup touchend touchcancel", cancel: "mouseleave touchcancel" };
	support.pointers && (eventMap = { down: "MSPointerDown", move: "MSPointerMove", up: "MSPointerUp", cancel: "MSPointerCancel" });
	var on = $.fn.on;
	extend(!0, kendoJQuery, $), kendoJQuery.fn = kendoJQuery.prototype = new $, kendoJQuery.fn.constructor = kendoJQuery, kendoJQuery.fn.init = function (e, t) {
		return t && t instanceof $ && !(t instanceof kendoJQuery) && (t = kendoJQuery(t)), $.fn.init.call(this, e, t, rootjQuery)
	}, kendoJQuery.fn.init.prototype = kendoJQuery.fn;
	var rootjQuery = kendoJQuery(document);
	extend(kendoJQuery.fn, { handler: function (e) {
		return this.data("handler", e), this
	}, autoApplyNS: function (e) {
		return e = e || kendo.guid(), this.data("kendoNS", "." + e), this
	}, on: function () {
		var e = this, t = e.data("kendoNS");
		if (1 === arguments.length)
			return on.call(e, arguments[0]);
		var n = e, i = slice.call(arguments);
		typeof i[i.length - 1] === UNDEFINED && i.pop();
		var r = i[i.length - 1], o = i[0].replace(/([^ ]+)/g, applyEventMap);
		if (t && (o = o.replace(/( |$)/g, t + " ")), support.touch && o.search(/mouse|click/) > -1 && this[0] !== document.documentElement) {
			MouseEventNormalizer.setupMouseMute();
			var a = 2 === i.length ? null : i[1], s = o.indexOf("click") > -1 && o.indexOf("touchend") > -1;
			on.call(this, { touchstart: MouseEventNormalizer.muteMouse, touchend: MouseEventNormalizer.unMuteMouse }, a, { bustClick: s })
		}
		return typeof r === STRING && (n = e.data("handler"), r = n[r], i[i.length - 1] = function (e) {
			r.call(n, e)
		}), i[0] = o, on.apply(e, i), e
	}, kendoDestroy: function (e) {
		return e = e ? "." + e : this.data("kendoNS"), e && this.off(e), this
	} }), kendo.jQuery = kendoJQuery, kendo.eventMap = eventMap
})(jQuery), function (e, t) {
	function n(e) {
		return parseInt(e, 10)
	}
	function i(e, t) {
		return n(e.css(t))
	}
	function r(e) {
		var t = e.effects;
		return "zoom" === t && (t = "zoom:in fade:in"), "fade" === t && (t = "fade:in"), "slide" === t && (t = "tile:left"), /^slide:(.+)$/.test(t) && (t = "tile:" + RegExp.$1), "overlay" === t && (t = "slideIn:left"), /^overlay:(.+)$/.test(t) && (t = "slideIn:" + RegExp.$1), e.effects = h.parseEffects(t), e
	}
	function o(e) {
		var t = [];
		for (var n in e)
			t.push(n);
		return t
	}
	function a(e) {
		for (var t in e)
			-1 != P.indexOf(t) && -1 == z.indexOf(t) && delete e[t];
		return e
	}
	function s(e, t) {
		var n, i, r, o, a = [], s = {};
		for (i in t)
			n = i.toLowerCase(), o = k && -1 != P.indexOf(n), !_.hasHW3D && o && -1 == z.indexOf(n) ? delete t[i] : (r = t[i], o ? a.push(i + "(" + r + ")") : s[i] = r);
		return a.length && (s[X] = a.join(" ")), s
	}
	function l(e, t) {
		if (k) {
			var i = e.css(X);
			if (i == L)
				return "scale" == t ? 1 : 0;
			var r = i.match(RegExp(t + "\\s*\\(([\\d\\w\\.]+)")), o = 0;
			return r ? o = n(r[1]) : (r = i.match(S) || [0, 0, 0, 0, 0], t = t.toLowerCase(), D.test(t) ? o = parseFloat(r[3] / r[2]) : "translatey" == t ? o = parseFloat(r[4] / r[2]) : "scale" == t ? o = parseFloat(r[2]) : "rotate" == t && (o = parseFloat(Math.atan2(r[2], r[1])))), o
		}
		return parseFloat(e.css(t))
	}
	function d(e) {
		return e.toUpperCase()
	}
	function c(e) {
		return e.replace(/^./, d)
	}
	function u(e, t) {
		var n = it.extend(t), i = n.prototype.directions;
		O[e] = n, m.Element.prototype[e] = function (e, t, i, r) {
			return new n(this.element, e, t, i, r)
		}, g(i, function (t, i) {
			m.Element.prototype[e + c(i)] = function (e, t, r) {
				return new n(this.element, i, e, t, r)
			}
		})
	}
	function p(e, t, n) {
		u(e, { directions: ot, restore: [t], startValue: function (e) {
			return this._startValue = e, this
		}, endValue: function (e) {
			return this._endValue = e, this
		}, shouldHide: function () {
			return "out" === this._direction && this._end() === n ? !this._reverse : this._reverse
		}, _end: function () {
			return this._endValue || n
		}, _start: function () {
			return this._startValue || 1
		}, prepare: function (e, n) {
			var i = this, r = i.element.data(t), o = i.shouldHide(), a = isNaN(r) || "" === r ? i._start() : r;
			e[t] = n[t] = i._end(), o ? e[t] = a : n[t] = a
		} })
	}
	function f(e, t) {
		var n = h.directions[t].vertical, i = e[n ? j : U]() / 2 + "px";
		return st[t].replace("$size", i)
	}
	var h = window.kendo, m = h.fx, g = e.each, v = e.extend, b = e.proxy, _ = h.support, x = _.browser, k = _.transforms, w = _.transitions, y = { scale: 0, scalex: 0, scaley: 0, scale3d: 0 }, C = { translate: 0, translatex: 0, translatey: 0, translate3d: 0 }, T = document.documentElement.style.zoom !== t && !k, S = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i, A = /^(-?[\d\.\-]+)?[\w\s]*,?\s*(-?[\d\.\-]+)?[\w\s]*/i, D = /translatex?$/i, E = /(zoom|fade|expand)(\w+)/, F = /(zoom|fade|expand)/, I = /[xy]$/i, P = ["perspective", "rotate", "rotatex", "rotatey", "rotatez", "rotate3d", "scale", "scalex", "scaley", "scalez", "scale3d", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "translatez", "translate3d", "matrix", "matrix3d"], z = ["rotate", "scale", "scalex", "scaley", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "matrix"], R = { rotate: "deg", scale: "", skew: "px", translate: "px" }, N = k.css, O = {}, M = Math.round, H = "", B = "px", L = "none", V = "auto", U = "width", j = "height", W = "hidden", q = "origin", G = "abortId", $ = "overflow", Y = "translate", Q = "completeCallback", K = N + "transition", X = N + "transform", J = N + "perspective", Z = N + "backface-visibility", et = { left: { reverse: "right", property: "left", transition: "translatex", vertical: !1, modifier: -1 }, right: { reverse: "left", property: "left", transition: "translatex", vertical: !1, modifier: 1 }, down: { reverse: "up", property: "top", transition: "translatey", vertical: !0, modifier: 1 }, up: { reverse: "down", property: "top", transition: "translatey", vertical: !0, modifier: -1 }, top: { reverse: "bottom" }, bottom: { reverse: "top" }, "in": { reverse: "out", modifier: -1 }, out: { reverse: "in", modifier: 1 }, vertical: { reverse: "vertical" }, horizontal: { reverse: "horizontal"} };
	if (h.directions = et, v(e.fn, { kendoStop: function (e, t) {
		return w ? h.fx.stopQueue(this, e || !1, t || !1) : this.stop(e, t)
	} }), k && !w) {
		g(z, function (n, i) {
			e.fn[i] = function (n) {
				if (n === t)
					return l(this, i);
				var r = e(this)[0], o = i + "(" + n + R[i.replace(I, "")] + ")";
				return -1 == r.style.cssText.indexOf(X) ? e(this).css(X, o) : r.style.cssText = r.style.cssText.replace(RegExp(i + "\\(.*?\\)", "i"), o), this
			}, e.fx.step[i] = function (t) {
				e(t.elem)[i](t.now)
			}
		});
		var tt = e.fx.prototype.cur;
		e.fx.prototype.cur = function () {
			return -1 != z.indexOf(this.prop) ? parseFloat(e(this.elem)[this.prop]()) : tt.apply(this, arguments)
		}
	}
	h.toggleClass = function (e, t, n, i) {
		return t && (t = t.split(" "), w && (n = v({ exclusive: "all", duration: 400, ease: "ease-out" }, n), e.css(K, n.exclusive + " " + n.duration + "ms " + n.ease), setTimeout(function () {
			e.css(K, "").css(j)
		}, n.duration)), g(t, function (t, n) {
			e.toggleClass(n, i)
		})), e
	}, h.parseEffects = function (e, t) {
		var n = {};
		return "string" == typeof e ? g(e.split(" "), function (e, i) {
			var r = !F.test(i), o = i.replace(E, function (e, t, n) {
				return t + ":" + n.toLowerCase()
			}), a = o.split(":"), s = a[1], l = {};
			a.length > 1 && (l.direction = t && r ? et[s].reverse : s), n[a[0]] = l
		}) : g(e, function (e) {
			var i = this.direction;
			i && t && !F.test(e) && (this.direction = et[i].reverse), n[e] = this
		}), n
	}, w && v(h.fx, { transition: function (t, n, i) {
		var r, a, l = 0, d = t.data("keys") || [];
		i = v({ duration: 200, ease: "ease-out", complete: null, exclusive: "all" }, i);
		var c = function () {
			a && (clearTimeout(a), a = null, t.removeData(G).dequeue().css(K, "").css(K), i.complete.call(t))
		};
		i.duration = e.fx ? e.fx.speeds[i.duration] || i.duration : i.duration, r = s(t, n), e.merge(d, o(r)), t.data("keys", e.unique(d)).height(), t.css(K, i.exclusive + " " + i.duration + "ms " + i.ease).css(K), t.css(r).css(X), x.mozilla && (t.one(w.event, c), l = 50), a = setTimeout(c, i.duration + l), t.data(G, a), t.data(Q, c)
	}, stopQueue: function (e, t, n) {
		var i, r = e.data("keys"), o = n === !1 && r, a = e.data(Q);
		return o && (i = h.getComputedStyles(e[0], r)), a && a(), o && e.css(i), e.removeData("keys"), e.stop(t), e
	} });
	var nt = h.Class.extend({ init: function (e, t) {
		var n = this;
		n.element = e, n.effects = [], n.options = t, n.restore = []
	}, run: function (t) {
		var n, i, r, o, l, d, c = this, u = t.length, p = c.element, f = c.options, m = e.Deferred(), g = {}, b = {};
		for (c.effects = t, m.then(e.proxy(c, "complete")), p.data("animating", !0), i = 0; u > i; i++)
			for (n = t[i], n.setReverse(f.reverse), n.setOptions(f), c.addRestoreProperties(n.restore), n.prepare(g, b), l = n.children(), r = 0, d = l.length; d > r; r++)
				l[r].duration(f.duration).run();
		for (var _ in f.effects)
			v(b, f.effects[_].properties);
		for (p.is(":visible") || v(g, { display: p.data("olddisplay") || "block" }), k && !f.reset && (o = p.data("targetTransform"), o && (g = v(o, g))), g = s(p, g), k && !w && (g = a(g)), p.css(g).css(X), i = 0; u > i; i++)
			t[i].setup();
		return f.init && f.init(), p.data("targetTransform", b), h.fx.animate(p, b, v({}, f, { complete: m.resolve })), m.promise()
	}, stop: function () {
		e(this.element).kendoStop()
	}, addRestoreProperties: function (e) {
		for (var t, n = this.element, i = 0, r = e.length; r > i; i++)
			t = e[i], this.restore.push(t), n.data(t) || n.data(t, n.css(t))
	}, restoreCallback: function () {
		for (var e = this.element, t = 0, n = this.restore.length; n > t; t++) {
			var i = this.restore[t];
			e.css(i, e.data(i))
		}
	}, complete: function () {
		var t = this, n = 0, i = t.element, r = t.options, o = t.effects, a = o.length;
		for (i.removeData("animating").dequeue(), r.hide && i.data("olddisplay", i.css("display")).hide(), this.restoreCallback(), T && !k && setTimeout(e.proxy(this, "restoreCallback"), 0); a > n; n++)
			o[n].teardown();
		r.completeCallback && r.completeCallback(i)
	} });
	h.fx.promise = function (e, t) {
		var n, i, r = [], o = new nt(e, t), a = h.parseEffects(t.effects);
		t.effects = a;
		for (var s in a)
			n = O[s], n && (i = new n(e, a[s].direction), r.push(i));
		r[0] ? o.run(r) : (e.is(":visible") || e.css({ display: e.data("olddisplay") || "block" }).css("display"), t.init && t.init(), e.dequeue(), o.complete())
	}, h.fx.transitionPromise = function (e, t, n) {
		return h.fx.animateTo(e, t, n), e
	}, v(h.fx, { animate: function (n, r, o) {
		var s = o.transition !== !1;
		delete o.transition, w && "transition" in m && s ? m.transition(n, r, o) : k ? n.animate(a(r), { queue: !1, show: !1, hide: !1, duration: o.duration, complete: o.complete }) : n.each(function () {
			var n = e(this), a = {};
			g(P, function (e, o) {
				var s, l = r ? r[o] + " " : null;
				if (l) {
					var d = r;
					if (o in y && r[o] !== t)
						s = l.match(A), k && v(d, { scale: +s[0] });
					else if (o in C && r[o] !== t) {
						var c = n.css("position"), u = "absolute" == c || "fixed" == c;
						n.data(Y) || (u ? n.data(Y, { top: i(n, "top") || 0, left: i(n, "left") || 0, bottom: i(n, "bottom"), right: i(n, "right") }) : n.data(Y, { top: i(n, "marginTop") || 0, left: i(n, "marginLeft") || 0 }));
						var p = n.data(Y);
						if (s = l.match(A)) {
							var f = o == Y + "y" ? 0 : +s[1], h = o == Y + "y" ? +s[1] : +s[2];
							u ? (isNaN(p.right) ? isNaN(f) || v(d, { left: p.left + f }) : isNaN(f) || v(d, { right: p.right - f }), isNaN(p.bottom) ? isNaN(h) || v(d, { top: p.top + h }) : isNaN(h) || v(d, { bottom: p.bottom - h })) : (isNaN(f) || v(d, { marginLeft: p.left + f }), isNaN(h) || v(d, { marginTop: p.top + h }))
						}
					}
					!k && "scale" != o && o in d && delete d[o], d && v(a, d)
				}
			}), x.msie && delete a.scale, n.animate(a, { queue: !1, show: !1, hide: !1, duration: o.duration, complete: o.complete })
		})
	}, animateTo: function (t, n, i) {
		function o(e) {
			n[0].style.cssText = "", t[0].style.cssText = "", _.mobileOS.android || l.css($, s), i.completeCallback && i.completeCallback.call(t, e)
		}
		var a, s, l = t.parents().filter(n.parents()).first();
		i = r(i), _.mobileOS.android || (s = l.css($), l.css($, "hidden")), e.each(i.effects, function (e, t) {
			a = a || t.direction
		}), i.complete = x.msie ? function () {
			setTimeout(o, 0)
		} : o, i.previous = i.reverse ? n : t, i.reset = !0, (i.reverse ? t : n).each(function () {
			e(this).kendoAnimate(v(!0, {}, i)), i.complete = null, i.previous = null
		})
	} });
	var it = h.Class.extend({ init: function (e, t) {
		var n = this;
		n.element = e, n._direction = t, n.options = {}, n._additionalEffects = [], n.restore || (n.restore = [])
	}, reverse: function () {
		return this._reverse = !0, this.run()
	}, play: function () {
		return this._reverse = !1, this.run()
	}, add: function (e) {
		return this._additionalEffects.push(e), this
	}, direction: function (e) {
		return this._direction = e, this
	}, duration: function (e) {
		return this._duration = e, this
	}, compositeRun: function () {
		var e = this, t = new nt(e.element, { reverse: e._reverse, duration: e._duration }), n = e._additionalEffects.concat([e]);
		return t.run(n)
	}, run: function () {
		if (this._additionalEffects && this._additionalEffects[0])
			return this.compositeRun();
		var t, n, i = this, r = i.element, o = 0, l = i.restore, d = l.length, c = e.Deferred(), u = {}, p = {}, f = i.children(), m = f.length;
		for (c.then(e.proxy(i, "_complete")), r.data("animating", !0), o = 0; d > o; o++)
			t = l[o], r.data(t) || r.data(t, r.css(t));
		for (o = 0; m > o; o++)
			f[o].duration(i._duration).run();
		return i.prepare(u, p), r.is(":visible") || v(u, { display: r.data("olddisplay") || "block" }), k && (n = r.data("targetTransform"), n && (u = v(n, u))), u = s(r, u), k && !w && (u = a(u)), r.css(u).css(X), i.setup(), r.data("targetTransform", p), h.fx.animate(r, p, { duration: i._duration, complete: c.resolve }), c.promise()
	}, stop: function () {
		var t = 0, n = this.children(), i = n.length;
		for (t = 0; i > t; t++)
			n[t].stop();
		return e(this.element).kendoStop(), this
	}, restoreCallback: function () {
		for (var e = this.element, t = 0, n = this.restore.length; n > t; t++) {
			var i = this.restore[t];
			e.css(i, e.data(i))
		}
	}, _complete: function () {
		var t = this, n = t.element;
		n.removeData("animating").dequeue(), t.restoreCallback(), t.shouldHide() && n.data("olddisplay", n.css("display")).hide(), T && !k && setTimeout(e.proxy(t, "restoreCallback"), 0), t.teardown()
	}, setOptions: function (e) {
		v(!0, this.options, e)
	}, children: function () {
		return []
	}, shouldHide: e.noop, setup: e.noop, prepare: e.noop, teardown: e.noop, directions: [], setReverse: function (e) {
		return this._reverse = e, this
	} }), rt = ["left", "right", "up", "down"], ot = ["in", "out"];
	u("slideIn", { directions: rt, prepare: function (e, t) {
		var n, i = this, r = i.element, o = et[i._direction], a = -o.modifier * (o.vertical ? r.outerHeight() : r.outerWidth()), s = a / (i.options && i.options.divisor || 1) + B, l = "0px";
		i._reverse && (n = e, e = t, t = n), k ? (e[o.transition] = s, t[o.transition] = l) : (e[o.property] = s, t[o.property] = l)
	} }), u("tile", { directions: rt, init: function (e, t, n) {
		it.prototype.init.call(this, e, t), this.options = { previous: n}
	}, children: function () {
		var e = this, t = e._reverse, n = e.options.previous, i = e._direction, r = [m(e.element).slideIn(i).setReverse(t)];
		return n && r.push(m(n).slideIn(et[i].reverse).setReverse(!t)), r
	} }), p("fade", "opacity", 0), p("zoom", "scale", .01), u("slideMargin", { prepare: function (e, t) {
		var n, i = this, r = i.element, o = i.options, a = r.data(q), s = o.offset, l = i._reverse;
		l || null !== a || r.data(q, parseFloat(r.css("margin-" + o.axis))), n = r.data(q) || 0, t["margin-" + o.axis] = l ? n : n + s
	} }), u("slideTo", { prepare: function (e, t) {
		var n = this, i = n.element, r = n.options, o = r.offset.split(","), a = n._reverse;
		k ? (t.translatex = a ? 0 : o[0], t.translatey = a ? 0 : o[1]) : (t.left = a ? 0 : o[0], t.top = a ? 0 : o[1]), i.css("left")
	} }), u("expand", { directions: ["horizontal", "vertical"], restore: [$], prepare: function (e, n) {
		var i = this, r = i.element, o = i.options, a = i._reverse, s = "vertical" === i._direction ? j : U, l = r[0].style[s], d = r.data(s), c = parseFloat(d || l), u = M(r.css(s, V)[s]());
		e.overflow = W, c = o && o.reset ? u || c : c || u, n[s] = (a ? 0 : c) + B, e[s] = (a ? c : 0) + B, d === t && r.data(s, l)
	}, shouldHide: function () {
		return this._reverse
	}, teardown: function () {
		var e = this, t = e.element, n = "vertical" === e._direction ? j : U, i = t.data(n);
		(i == V || i === H) && setTimeout(function () {
			t.css(n, V).css(n)
		}, 0)
	} });
	var at = { position: "absolute", marginLeft: 0, marginTop: 0, scale: 1 };
	u("transfer", { init: function (e, t) {
		this.element = e, this.options = { target: t }, this.restore = []
	}, setup: function () {
		this.element.appendTo(document.body)
	}, prepare: function (e, t) {
		var n, i = this, r = i.element, o = i.options, a = i._reverse, s = o.target, d = l(r, "scale"), c = s.offset(), u = s.outerHeight() / r.outerHeight();
		v(e, at), t.scale = 1, r.css(X, "scale(1)").css(X), n = r.offset(), r.css(X, "scale(" + d + ")");
		var p = 0, f = 0, h = c.left - n.left, m = c.top - n.top, g = p + r.outerWidth(), b = f, _ = h + s.outerWidth(), x = m, k = (m - f) / (h - p), w = (x - b) / (_ - g), y = (f - b - k * p + w * g) / (w - k), C = f + k * (y - p);
		e.top = n.top, e.left = n.left, e.transformOrigin = y + B + " " + C + B, a ? e.scale = u : t.scale = u
	} });
	var st = { top: "rect(auto auto $size auto)", bottom: "rect($size auto auto auto)", left: "rect(auto $size auto auto)", right: "rect(auto auto auto $size)" }, lt = { top: { start: "rotatex(0deg)", end: "rotatex(180deg)" }, bottom: { start: "rotatex(-180deg)", end: "rotatex(0deg)" }, left: { start: "rotatey(0deg)", end: "rotatey(-180deg)" }, right: { start: "rotatey(180deg)", end: "rotatey(0deg)"} };
	u("turningPage", { directions: rt, init: function (e, t, n) {
		it.prototype.init.call(this, e, t), this._container = n
	}, prepare: function (e, t) {
		var n = this, i = n._reverse, r = i ? et[n._direction].reverse : n._direction, o = lt[r];
		e.zIndex = 1, n._clipInHalf && (e.clip = f(n._container, h.directions[r].reverse)), e[Z] = W, t[X] = i ? o.start : o.end, e[X] = i ? o.end : o.start
	}, setup: function () {
		this._container.append(this.element)
	}, face: function (e) {
		return this._face = e, this
	}, shouldHide: function () {
		var e = this, t = e._reverse, n = e._face;
		return t && !n || !t && n
	}, clipInHalf: function (e) {
		return this._clipInHalf = e, this
	}, temporary: function (e) {
		return this._temporary = e, this
	}, teardown: function () {
		this._temporary && this.element.remove()
	} }), u("staticPage", { directions: rt, init: function (e, t, n) {
		it.prototype.init.call(this, e, t), this._container = n
	}, restore: ["clip"], prepare: function (e) {
		var t = this, n = t._reverse ? et[t._direction].reverse : t._direction;
		e.clip = f(t._container, n)
	}, shouldHide: function () {
		var e = this, t = e._reverse, n = e._face;
		return t && !n || !t && n
	}, face: function (e) {
		return this._face = e, this
	} }), u("pageturn", { directions: ["horizontal", "vertical"], init: function (e, t, n, i) {
		it.prototype.init.call(this, e, t), this.options = {}, this.options.face = n, this.options.back = i
	}, children: function () {
		var e, t = this, n = t.options, i = "horizontal" === t._direction ? "left" : "top", r = h.directions[i].reverse, o = t._reverse, a = n.face.clone(!0).removeAttr("id"), s = n.back.clone(!0).removeAttr("id"), l = t.element;
		return o && (e = i, i = r, r = e), [m(n.face).staticPage(i, l).face(!0).setReverse(o), m(n.back).staticPage(r, l).setReverse(o), m(a).turningPage(i, l).face(!0).clipInHalf(!0).temporary(!0).setReverse(o), m(s).turningPage(r, l).clipInHalf(!0).temporary(!0).setReverse(o)]
	}, prepare: function (e) {
		e[J] = 1e3, e.transformStyle = "preserve-3d"
	}, teardown: function () {
		this.element.find(".temp-pages").remove()
	} }), u("flip", { directions: ["horizontal", "vertical"], init: function (e, t, n, i) {
		it.prototype.init.call(this, e, t), this.options = {}, this.options.face = n, this.options.back = i
	}, children: function () {
		var e, t = this, n = t.options, i = "horizontal" === t._direction ? "left" : "top", r = h.directions[i].reverse, o = t._reverse, a = t.element;
		return o && (e = i, i = r, r = e), [m(n.face).turningPage(i, a).face(!0).setReverse(o), m(n.back).turningPage(r, a).setReverse(o)]
	}, prepare: function (e) {
		e[J] = 1e3, e.transformStyle = "preserve-3d"
	} });
	var dt = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
		setTimeout(e, 1e3 / 60)
	}, ct = h.Class.extend({ init: function () {
		var e = this;
		e._tickProxy = b(e._tick, e), e._started = !1
	}, tick: e.noop, done: e.noop, onEnd: e.noop, onCancel: e.noop, start: function () {
		this.done() || (this._started = !0, dt(this._tickProxy))
	}, cancel: function () {
		this._started = !1, this.onCancel()
	}, _tick: function () {
		var e = this;
		e._started && (e.tick(), e.done() ? (e._started = !1, e.onEnd()) : dt(e._tickProxy))
	} }), ut = ct.extend({ init: function (e) {
		var t = this;
		v(t, e), ct.fn.init.call(t)
	}, done: function () {
		return this.timePassed() >= this.duration
	}, timePassed: function () {
		return Math.min(this.duration, +new Date - this.startDate)
	}, moveTo: function (e) {
		var t = this, n = t.movable;
		t.initial = n[t.axis], t.delta = e.location - t.initial, t.duration = e.duration || 300, t.tick = t._easeProxy(e.ease), t.startDate = +new Date, t.start()
	}, _easeProxy: function (e) {
		var t = this;
		return function () {
			t.movable.moveAxis(t.axis, e(t.timePassed(), t.initial, t.delta, t.duration))
		}
	} });
	v(ut, { easeOutExpo: function (e, t, n, i) {
		return e == i ? t + n : n * (-Math.pow(2, -10 * e / i) + 1) + t
	}, easeOutBack: function (e, t, n, i, r) {
		return r = 1.70158, n * ((e = e / i - 1) * e * ((r + 1) * e + r) + 1) + t
	} }), m.Animation = ct, m.Transition = ut, m.createEffect = u, m.Effects = O
}(window.kendo.jQuery), function (e, t) {
	function n(r) {
		var a, s, l, d, c, u, p, f, h = [], m = r.logic || "and", g = r.filters;
		for (a = 0, s = g.length; s > a; a++)
			r = g[a], l = r.field, p = r.value, u = r.operator, r.filters ? r = n(r) : (f = r.ignoreCase, l = l.replace(/\./g, "/"), r = o[u], r && p !== t && (d = e.type(p), "string" === d ? (c = "'{1}'", p = p.replace(/'/g, "''"), f === !0 && (l = "tolower(" + l + ")")) : c = "date" === d ? "datetime'{1:yyyy-MM-ddTHH:mm:ss}'" : "{1}", c = r.length > 3 ? "substringof" !== r ? "{0}({2}," + c + ")" : "{0}(" + c + ",{2})" : "{2} {0} " + c, r = i.format(c, r, p, l))), h.push(r);
		return r = h.join(" " + m + " "), h.length > 1 && (r = "(" + r + ")"), r
	}
	var i = window.kendo, r = e.extend, o = { eq: "eq", neq: "ne", gt: "gt", gte: "ge", lt: "lt", lte: "le", contains: "substringof", endswith: "endswith", startswith: "startswith" }, a = { pageSize: e.noop, page: e.noop, filter: function (e, t) {
		t && (e.$filter = n(t))
	}, sort: function (t, n) {
		var i = e.map(n, function (e) {
			var t = e.field.replace(/\./g, "/");
			return "desc" === e.dir && (t += " desc"), t
		}).join(",");
		i && (t.$orderby = i)
	}, skip: function (e, t) {
		t && (e.$skip = t)
	}, take: function (e, t) {
		t && (e.$top = t)
	} }, s = { read: { dataType: "jsonp"} };
	r(!0, i.data, { schemas: { odata: { type: "json", data: function (e) {
		return e.d.results || [e.d]
	}, total: "d.__count"} }, transports: { odata: { read: { cache: !0, dataType: "jsonp", jsonp: "$callback" }, update: { cache: !0, dataType: "json", contentType: "application/json", type: "PUT" }, create: { cache: !0, dataType: "json", contentType: "application/json", type: "POST" }, destroy: { cache: !0, dataType: "json", type: "DELETE" }, parameterMap: function (e, t) {
		var n, r, o, l;
		if (e = e || {}, t = t || "read", l = (this.options || s)[t], l = l ? l.dataType : "json", "read" === t) {
			n = { $inlinecount: "allpages" }, "json" != l && (n.$format = "json");
			for (o in e)
				a[o] ? a[o](n, e[o]) : n[o] = e[o]
		}
		else {
			if ("json" !== l)
				throw Error("Only json dataType can be used for " + t + " operation.");
			if ("destroy" !== t) {
				for (o in e)
					r = e[o], "number" == typeof r && (e[o] = r + "");
				n = i.stringify(e)
			}
		}
		return n
	} }} })
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = e.isArray, r = e.isPlainObject, o = e.map, a = e.each, s = e.extend, l = n.getter, d = n.Class, c = d.extend({ init: function (e) {
		var t = this, l = e.total, d = e.model, c = e.parse, u = e.data;
		if (d) {
			if (r(d)) {
				d.fields && a(d.fields, function (e, n) {
					n = r(n) && n.field ? s(n, { field: t.getter(n.field) }) : { field: t.getter(n) }, d.fields[e] = n
				});
				var p = d.id;
				if (p) {
					var f = {};
					f[t.xpathToMember(p, !0)] = { field: t.getter(p) }, d.fields = s(f, d.fields), d.id = t.xpathToMember(p)
				}
				d = n.data.Model.define(d)
			}
			t.model = d
		}
		if (l && ("string" == typeof l ? (l = t.getter(l), t.total = function (e) {
			return parseInt(l(e), 10)
		}) : "function" == typeof l && (t.total = l)), u && ("string" == typeof u ? (u = t.xpathToMember(u), t.data = function (e) {
			var n, r = t.evaluate(e, u);
			return r = i(r) ? r : [r], t.model && d.fields ? (n = new t.model, o(r, function (e) {
				if (e) {
					var t, i = {};
					for (t in d.fields)
						i[t] = n._parse(t, d.fields[t].field(e));
					return i
				}
			})) : r
		}) : "function" == typeof u && (t.data = u)), "function" == typeof c) {
			var h = t.parse;
			t.parse = function (e) {
				var n = c.call(t, e);
				return h.call(t, n)
			}
		}
	}, total: function (e) {
		return this.data(e).length
	}, errors: function (e) {
		return e ? e.errors : null
	}, parseDOM: function (e) {
		var n, r, o, a, s, l, d, c = {}, u = e.attributes, p = u.length;
		for (d = 0; p > d; d++)
			l = u[d], c["@" + l.nodeName] = l.nodeValue;
		for (r = e.firstChild; r; r = r.nextSibling)
			o = r.nodeType, 3 === o || 4 === o ? c["#text"] = r.nodeValue : 1 === o && (n = this.parseDOM(r), a = r.nodeName, s = c[a], i(s) ? s.push(n) : s = s !== t ? [s, n] : n, c[a] = s);
		return c
	}, evaluate: function (e, t) {
		for (var n, r, o, a, s, l = t.split("."); n = l.shift();)
			if (e = e[n], i(e)) {
				for (r = [], t = l.join("."), s = 0, o = e.length; o > s; s++)
					a = this.evaluate(e[s], t), a = i(a) ? a : [a], r.push.apply(r, a);
				return r
			}
		return e
	}, parse: function (t) {
		var n, i, r = {};
		return n = t.documentElement || e.parseXML(t).documentElement, i = this.parseDOM(n), r[n.nodeName] = i, r
	}, xpathToMember: function (e, t) {
		return e ? (e = e.replace(/^\//, "").replace(/\//g, "."), e.indexOf("@") >= 0 ? e.replace(/\.?(@.*)/, t ? "$1" : '["$1"]') : e.indexOf("text()") >= 0 ? e.replace(/(\.?text\(\))/, t ? "#text" : '["#text"]') : e) : ""
	}, getter: function (e) {
		return l(this.xpathToMember(e), !0)
	} });
	e.extend(!0, n.data, { XmlDataReader: c, readers: { xml: c} })
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n, i) {
		return function (r) {
			var o, a = {};
			for (o in r)
				a[o] = r[o];
			a.field = i ? n + "." + r.field : n, e.trigger(t, a)
		}
	}
	function i(t, n) {
		if (t === n)
			return !0;
		var r, o = e.type(t), a = e.type(n);
		if (o !== a)
			return !1;
		if ("date" === o)
			return t.getTime() === n.getTime();
		if ("object" !== o && "array" !== o)
			return !1;
		for (r in t)
			if (!i(t[r], n[r]))
				return !1;
		return !0
	}
	function r(e, t) {
		var n, i;
		for (i in e) {
			if (n = e[i], R(n) && n.field && n.field === t)
				return n;
			if (n === t)
				return n
		}
		return null
	}
	function o(e) {
		this.data = e || []
	}
	function a(e, n) {
		if (e) {
			var i = typeof e === W ? { field: e, dir: n} : e, r = O(i) ? i : i !== t ? [i] : [];
			return M(r, function (e) {
				return !!e.dir
			})
		}
	}
	function s(e) {
		var t, n, i, r, o = e.filters;
		if (o)
			for (t = 0, n = o.length; n > t; t++)
				i = o[t], r = i.operator, r && typeof r === W && (i.operator = Dt[r.toLowerCase()] || r), s(i)
	}
	function l(e) {
		return e && !N(e) ? ((O(e) || !e.filters) && (e = { logic: "and", filters: O(e) ? e : [e] }), s(e), e) : t
	}
	function d(e) {
		return O(e) ? e : [e]
	}
	function c(e, n) {
		var i = typeof e === W ? { field: e, dir: n} : e, r = O(i) ? i : i !== t ? [i] : [];
		return F(r, function (e) {
			return { field: e.field, dir: e.dir || "asc", aggregates: e.aggregates}
		})
	}
	function u(e, t) {
		return e && e.getTime && t && t.getTime ? e.getTime() === t.getTime() : e === t
	}
	function p(e, t, n, i, r) {
		t = t || [];
		var o, a, s, l = t.length;
		for (o = 0; l > o; o++) {
			a = t[o], s = a.aggregate;
			var d = a.field;
			e[d] = e[d] || {}, e[d][s] = Et[s.toLowerCase()](e[d][s], n, V.accessor(d), i, r)
		}
	}
	function f(e) {
		var t, n = e.length, i = Array(n);
		for (t = 0; n > t; t++)
			i[t] = e[t].toJSON();
		return i
	}
	function h(e, n) {
		n = n || {};
		var i, r = new o(e), s = n.group, l = c(s || []).concat(a(n.sort || [])), d = n.filter, u = n.skip, p = n.take;
		return d && (r = r.filter(d), i = r.toArray().length), l && (r = r.sort(l), s && (e = r.toArray())), u !== t && p !== t && (r = r.range(u, p)), s && (r = r.group(s, e)), { total: i, data: r.toArray()}
	}
	function m(e, t) {
		t = t || {};
		var n = new o(e), i = t.aggregate, r = t.filter;
		return r && (n = n.filter(r)), n.aggregate(i)
	}
	function g(e, t, n) {
		var i, r, o, a;
		for (o = 0, a = e.length; a > o; o++) {
			i = e[o];
			for (r in t)
				i[r] = n._parse(r, t[r](i))
		}
	}
	function v(e, t, n) {
		var i, r, o;
		for (r = 0, o = e.length; o > r; r++)
			i = e[r], i.value = n._parse(i.field, i.value), i.hasSubgroups ? v(i.items, t, n) : g(i.items, t, n)
	}
	function b(e, t, n, i) {
		return function (r) {
			return r = e(r), r && !N(i) && ("[object Array]" === mt.call(r) || r instanceof xt || (r = [r]), n(r, i, new t)), r || []
		}
	}
	function _(e) {
		var t, n, i = [];
		for (t = 0, n = e.length; n > t; t++)
			i = e[t].hasSubgroups ? i.concat(_(e[t].items)) : i.concat(e[t].items.slice());
		return i
	}
	function x(e, t) {
		var n, i, r, o;
		if (t)
			for (n = 0, i = e.length; i > n; n++)
				r = e[n], o = r.items, r.hasSubgroups ? x(o, t) : !o.length || o[0] instanceof t || (o.type = t, o.wrapAll(o, o))
	}
	function k(e, t) {
		var n, i;
		for (n = 0, i = e.length; i > n; n++)
			if (e[n].hasSubgroups) {
				if (k(e[n].items, t))
					return !0
			}
			else if (t(e[n].items, e[n]))
				return !0
	}
	function w(e, t) {
		var n, i;
		for (n = 0, i = e.length; i > n; n++)
			if (e[n].uid == t.uid)
				return t = e[n], e.splice(n, 1), t
	}
	function y(e, t) {
		var n, i, r, o;
		for (r = e.length - 1, o = 0; r >= o; r--)
			i = e[r], n = { value: t.get(i.field), field: i.field, items: n ? [n] : [t], hasSubgroups: !!n, aggregates: {} };
		return n
	}
	function C(e, t) {
		return t ? S(e, function (e) {
			return e[t.idField] === t.id
		}) : -1
	}
	function T(e, t) {
		return t ? S(e, function (e) {
			return e.uid == t.uid
		}) : -1
	}
	function S(e, t) {
		var n, i;
		for (n = 0, i = e.length; i > n; n++)
			if (t(e[n]))
				return n;
		return -1
	}
	function A(t, n) {
		var i, r, o, a, s, l = e(t)[0].children, d = [], c = n[0], u = n[1];
		for (i = 0, r = l.length; r > i; i++)
			o = {}, s = l[i], o[c.field] = s.text, a = s.attributes.value, a = a && a.specified ? s.value : s.text, o[u.field] = a, d.push(o);
		return d
	}
	function D(t, n) {
		var i, r, o, a, s, l, d, c = e(t)[0].tBodies[0], u = c ? c.rows : [], p = n.length, f = [];
		for (i = 0, r = u.length; r > i; i++) {
			for (s = {}, d = !0, a = u[i].cells, o = 0; p > o; o++)
				l = a[o], "th" !== l.nodeName.toLowerCase() && (d = !1, s[n[o].field] = l.innerHTML);
			d || f.push(s)
		}
		return f
	}
	function E(t, n) {
		var i, r, o, a, s, l, d, c, u = e(t).children(), p = [], f = n[0].field, h = n[1] && n[1].field, m = n[2] && n[2].field, g = n[3] && n[3].field;
		for (i = 0, r = u.length; r > i; i++)
			o = {}, a = u.eq(i), l = a[0].firstChild, c = a.children(), t = c.filter("ul"), c = c.filter(":not(ul)"), s = a.attr("data-id"), s && (o.id = s), l && (o[f] = 3 == l.nodeType ? l.nodeValue : c.text()), h && (o[h] = c.find("a").attr("href")), g && (o[g] = c.find("img").attr("src")), m && (d = c.find(".k-sprite").prop("className"), o[m] = d && e.trim(d.replace("k-sprite", ""))), t.length && (o.items = E(t.eq(0), n)), "true" == a.attr("data-hasChildren") && (o.hasChildren = !0), p.push(o);
		return p
	}
	var F, I = e.extend, P = e.proxy, z = e.isFunction, R = e.isPlainObject, N = e.isEmptyObject, O = e.isArray, M = e.grep, H = e.ajax, B = e.each, L = e.noop, V = window.kendo, U = V.Observable, j = V.Class, W = "string", q = "function", G = "create", $ = "read", Y = "update", Q = "destroy", K = "change", X = "sync", J = "get", Z = "error", et = "requestStart", tt = "progress", nt = "requestEnd", it = [G, $, Y, Q], rt = function (e) {
		return e
	}, ot = V.getter, at = V.stringify, st = Math, lt = [].push, dt = [].join, ct = [].pop, ut = [].splice, pt = [].shift, ft = [].slice, ht = [].unshift, mt = {}.toString, gt = V.support.stableSort, vt = /^\/Date\((.*?)\)\/$/, bt = /(\r+|\n+)/g, _t = /(?=['\\])/g, xt = U.extend({ init: function (e, t) {
		var n = this;
		n.type = t || kt, U.fn.init.call(n), n.length = e.length, n.wrapAll(e, n)
	}, toJSON: function () {
		var e, t, n = this.length, i = Array(n);
		for (e = 0; n > e; e++)
			t = this[e], t instanceof kt && (t = t.toJSON()), i[e] = t;
		return i
	}, parent: L, wrapAll: function (e, t) {
		var n, i, r = this, o = function () {
			return r
		};
		for (t = t || [], n = 0, i = e.length; i > n; n++)
			t[n] = r.wrap(e[n], o);
		return t
	}, wrap: function (e, t) {
		var n, i = this;
		return null !== e && "[object Object]" === mt.call(e) && (n = e instanceof i.type || e instanceof Ct, n || (e = e instanceof kt ? e.toJSON() : e, e = new i.type(e)), e.parent = t, e.bind(K, function (e) {
			i.trigger(K, { field: e.field, node: e.node, index: e.index, items: e.items || [this], action: e.node ? e.action || "itemchange" : "itemchange" })
		})), e
	}, push: function () {
		var e, t = this.length, n = this.wrapAll(arguments);
		return e = lt.apply(this, n), this.trigger(K, { action: "add", index: t, items: n }), e
	}, slice: ft, join: dt, pop: function () {
		var e = this.length, t = ct.apply(this);
		return e && this.trigger(K, { action: "remove", index: e - 1, items: [t] }), t
	}, splice: function (e, t, n) {
		var i, r, o, a = this.wrapAll(ft.call(arguments, 2));
		if (i = ut.apply(this, [e, t].concat(a)), i.length)
			for (this.trigger(K, { action: "remove", index: e, items: i }), r = 0, o = i.length; o > r; r++)
				i[r].children && i[r].unbind(K);
		return n && this.trigger(K, { action: "add", index: e, items: a }), i
	}, shift: function () {
		var e = this.length, t = pt.apply(this);
		return e && this.trigger(K, { action: "remove", index: 0, items: [t] }), t
	}, unshift: function () {
		var e, t = this.wrapAll(arguments);
		return e = ht.apply(this, t), this.trigger(K, { action: "add", index: 0, items: t }), e
	}, indexOf: function (e) {
		var t, n, i = this;
		for (t = 0, n = i.length; n > t; t++)
			if (i[t] === e)
				return t;
		return -1
	} }), kt = U.extend({ init: function (e) {
		var t, n, i, r = this, o = function () {
			return r
		};
		U.fn.init.call(this);
		for (n in e)
			t = e[n], "_" != n.charAt(0) && (i = mt.call(t), t = r.wrap(t, n, o)), r[n] = t;
		r.uid = V.guid()
	}, shouldSerialize: function (e) {
		return this.hasOwnProperty(e) && "_events" !== e && typeof this[e] !== q && "uid" !== e
	}, toJSON: function () {
		var e, t, n = {};
		for (t in this)
			this.shouldSerialize(t) && (e = this[t], (e instanceof kt || e instanceof xt) && (e = e.toJSON()), n[t] = e);
		return n
	}, get: function (e) {
		var t, n = this;
		return n.trigger(J, { field: e }), t = "this" === e ? n : V.getter(e, !0)(n)
	}, _set: function (e, n) {
		var i = this;
		if (e.indexOf("."))
			for (var r = e.split("."), o = ""; r.length > 1;) {
				o += r.shift();
				var a = V.getter(o, !0)(i);
				if (a instanceof kt)
					return a.set(r.join("."), n), t;
				o += "."
			}
		V.setter(e)(i, n)
	}, set: function (e, t) {
		var n = this, i = V.getter(e, !0)(n), r = function () {
			return n
		};
		i !== t && (n.trigger("set", { field: e, value: t }) || (n._set(e, n.wrap(t, e, r)), n.trigger(K, { field: e })))
	}, parent: L, wrap: function (e, i, r) {
		var o = this, a = mt.call(e), s = e instanceof xt;
		return null === e || e === t || "[object Object]" !== a || e instanceof Rt || s ? null === e || "[object Array]" !== a && !s ? null !== e && e instanceof Rt && (e._parent = r) : (s || (e = new xt(e)), e.parent() != r() && (e.parent = r, e.bind(K, n(o, K, i, !1)))) : (e instanceof kt || (e = new kt(e)), e.parent() != r() && (e.parent = r, e.bind(J, n(o, J, i, !0)), e.bind(K, n(o, K, i, !0)))), e
	} }), wt = { number: function (e) {
		return V.parseFloat(e)
	}, date: function (e) {
		return V.parseDate(e)
	}, "boolean": function (e) {
		return typeof e === W ? "true" === e.toLowerCase() : null != e ? !!e : e
	}, string: function (e) {
		return null != e ? e + "" : e
	}, "default": function (e) {
		return e
	} }, yt = { string: "", number: 0, date: new Date, "boolean": !1, "default": "" }, Ct = kt.extend({
		init: function (n) {
			var i = this;
			(!n || e.isEmptyObject(n)) && (n = e.extend({}, i.defaults, n)), kt.fn.init.call(i, n), i.dirty = !1, i.idField && (i.id = i.get(i.idField), i.id === t && (i.id = i._defaultId))
		}, shouldSerialize: function (e) {
			return kt.fn.shouldSerialize.call(this, e) && "uid" !== e && !("id" !== this.idField && "id" === e) && "dirty" !== e && "_accessors" !== e
		}, _parse: function (e, t) {
			var n, i = this, o = e, a = i.fields || {};
			return e = a[e], e || (e = r(a, o)), e && (n = e.parse, !n && e.type && (n = wt[e.type.toLowerCase()])), n ? n(t) : t
		}, editable: function (e) {
			return e = (this.fields || {})[e], e ? e.editable !== !1 : !0
		}, set: function (e, t, n) {
			var r = this;
			r.editable(e) && (t = r._parse(e, t), i(t, r.get(e)) || (r.dirty = !0, kt.fn.set.call(r, e, t, n)))
		}, accept: function (e) {
			var t, n = this, i = function () {
				return n
			};
			for (t in e)
				n._set(t, n.wrap(e[t], t, i));
			n.idField && (n.id = n.get(n.idField)), n.dirty = !1
		}, isNew: function () {
			return this.id === this._defaultId
		}
	});
	Ct.define = function (e, n) {
		n === t && (n = e, e = Ct);
		var i, r, o, a, s, l = I({ defaults: {} }, n), d = l.id;
		d && (l.idField = d), l.id && delete l.id, d && (l.defaults[d] = l._defaultId = "");
		for (r in l.fields)
			o = l.fields[r], a = o.type || "default", s = null, r = typeof o.field === W ? o.field : r, o.nullable || (s = l.defaults[r] = o.defaultValue !== t ? o.defaultValue : yt[a.toLowerCase()]), n.id === r && (l._defaultId = s), l.defaults[r] = s, o.parse = o.parse || wt[a];
		return i = e.extend(l), i.define = function (e) {
			return Ct.define(i, e)
		}, l.fields && (i.fields = l.fields, i.idField = l.idField), i
	};
	var Tt = { selector: function (e) {
		return z(e) ? e : ot(e)
	}, asc: function (e) {
		var t = this.selector(e);
		return function (e, n) {
			return e = t(e), n = t(n), null == e && null == n ? 0 : e && !n && e > 0 || null == n ? 1 : n && !e && n > 0 ? -1 : e > n ? 1 : n > e ? -1 : 0
		}
	}, desc: function (e) {
		var t = this.selector(e);
		return function (e, n) {
			return e = t(e), n = t(n), null == e && null == n ? 0 : e && !n && e > 0 || null == n ? -1 : n && !e && n > 0 || null == e ? 1 : n > e ? 1 : e > n ? -1 : 0
		}
	}, create: function (e) {
		return this[e.dir.toLowerCase()](e.field)
	}, combine: function (e) {
		return function (t, n) {
			var i, r, o = e[0](t, n);
			for (i = 1, r = e.length; r > i; i++)
				o = o || e[i](t, n);
			return o
		}
	} }, St = I({}, Tt, { asc: function (e) {
		var t = this.selector(e);
		return function (e, n) {
			var i = t(e), r = t(n);
			return i && i.getTime && r && r.getTime && (i = i.getTime(), r = r.getTime()), i === r ? e.__position - n.__position : null == r ? 1 : i > r ? 1 : r > i ? -1 : 0
		}
	}, desc: function (e) {
		var t = this.selector(e);
		return function (e, n) {
			var i = t(e), r = t(n);
			return i && i.getTime && r && r.getTime && (i = i.getTime(), r = r.getTime()), i === r ? e.__position - n.__position : r > i ? 1 : i > r ? -1 : 0
		}
	} });
	F = function (e, t) {
		var n, i = e.length, r = Array(i);
		for (n = 0; i > n; n++)
			r[n] = t(e[n], n, e);
		return r
	};
	var At = function () {
		function e(e) {
			return e.replace(_t, "\\").replace(bt, "")
		}
		function t(t, n, i, r) {
			var o;
			return null != i && (typeof i === W && (i = e(i), o = vt.exec(i), o ? i = new Date(+o[1]) : r ? (i = "'" + i.toLowerCase() + "'", n = "(" + n + " || '').toLowerCase()") : i = "'" + i + "'"), i.getTime && (n = "(" + n + "?" + n + ".getTime():" + n + ")", i = i.getTime())), n + " " + t + " " + i
		}
		return { eq: function (e, n, i) {
			return t("==", e, n, i)
		}, neq: function (e, n, i) {
			return t("!=", e, n, i)
		}, gt: function (e, n, i) {
			return t(">", e, n, i)
		}, gte: function (e, n, i) {
			return t(">=", e, n, i)
		}, lt: function (e, n, i) {
			return t("<", e, n, i)
		}, lte: function (e, n, i) {
			return t("<=", e, n, i)
		}, startswith: function (t, n, i) {
			return i && (t += ".toLowerCase()", n && (n = n.toLowerCase())), n && (n = e(n)), t + ".lastIndexOf('" + n + "', 0) == 0"
		}, endswith: function (t, n, i) {
			return i && (t += ".toLowerCase()", n && (n = n.toLowerCase())), n && (n = e(n)), t + ".indexOf('" + n + "', " + t + ".length - " + (n || "").length + ") >= 0"
		}, contains: function (t, n, i) {
			return i && (t = "(" + t + " || '').toLowerCase()", n && (n = n.toLowerCase())), n && (n = e(n)), t + ".indexOf('" + n + "') >= 0"
		}, doesnotcontain: function (t, n, i) {
			return i && (t = "(" + t + " || '').toLowerCase()", n && (n = n.toLowerCase())), n && (n = e(n)), t + ".indexOf('" + n + "') == -1"
		} }
	}();
	o.filterExpr = function (e) {
		var n, i, r, a, s, l, d = [], c = { and: " && ", or: " || " }, u = [], p = [], f = e.filters;
		for (n = 0, i = f.length; i > n; n++)
			r = f[n], s = r.field, l = r.operator, r.filters ? (a = o.filterExpr(r), r = a.expression.replace(/__o\[(\d+)\]/g, function (e, t) {
				return t = +t, "__o[" + (p.length + t) + "]"
			}).replace(/__f\[(\d+)\]/g, function (e, t) {
				return t = +t, "__f[" + (u.length + t) + "]"
			}), p.push.apply(p, a.operators), u.push.apply(u, a.fields)) : (typeof s === q ? (a = "__f[" + u.length + "](d)", u.push(s)) : a = V.expr(s), typeof l === q ? (r = "__o[" + p.length + "](" + a + ", " + r.value + ")", p.push(l)) : r = At[(l || "eq").toLowerCase()](a, r.value, r.ignoreCase !== t ? r.ignoreCase : !0)), d.push(r);
		return { expression: "(" + d.join(c[e.logic]) + ")", fields: u, operators: p}
	};
	var Dt = { "==": "eq", equals: "eq", isequalto: "eq", equalto: "eq", equal: "eq", "!=": "neq", ne: "neq", notequals: "neq", isnotequalto: "neq", notequalto: "neq", notequal: "neq", "<": "lt", islessthan: "lt", lessthan: "lt", less: "lt", "<=": "lte", le: "lte", islessthanorequalto: "lte", lessthanequal: "lte", ">": "gt", isgreaterthan: "gt", greaterthan: "gt", greater: "gt", ">=": "gte", isgreaterthanorequalto: "gte", greaterthanequal: "gte", ge: "gte", notsubstringof: "doesnotcontain" };
	o.normalizeFilter = l, o.prototype = { toArray: function () {
		return this.data
	}, range: function (e, t) {
		return new o(this.data.slice(e, e + t))
	}, skip: function (e) {
		return new o(this.data.slice(e))
	}, take: function (e) {
		return new o(this.data.slice(0, e))
	}, select: function (e) {
		return new o(F(this.data, e))
	}, orderBy: function (e) {
		var t = this.data.slice(0), n = z(e) || !e ? Tt.asc(e) : e.compare;
		return new o(t.sort(n))
	}, orderByDescending: function (e) {
		return new o(this.data.slice(0).sort(Tt.desc(e)))
	}, sort: function (e, t, n) {
		var i, r, o = a(e, t), s = [];
		if (n = n || Tt, o.length) {
			for (i = 0, r = o.length; r > i; i++)
				s.push(n.create(o[i]));
			return this.orderBy({ compare: n.combine(s) })
		}
		return this
	}, filter: function (e) {
		var t, n, i, r, a, s, d, c, u = this.data, p = [];
		if (e = l(e), !e || 0 === e.filters.length)
			return this;
		for (r = o.filterExpr(e), s = r.fields, d = r.operators, a = c = Function("d, __f, __o", "return " + r.expression), (s.length || d.length) && (c = function (e) {
			return a(e, s, d)
		}), t = 0, i = u.length; i > t; t++)
			n = u[t], c(n) && p.push(n);
		return new o(p)
	}, group: function (e, t) {
		e = c(e || []), t = t || this.data;
		var n, i = this, r = new o(i.data);
		return e.length > 0 && (n = e[0], r = r.groupBy(n).select(function (i) {
			var r = new o(t).filter([{ field: i.field, operator: "eq", value: i.value}]);
			return { field: i.field, value: i.value, items: e.length > 1 ? new o(i.items).group(e.slice(1), r.toArray()).toArray() : i.items, hasSubgroups: e.length > 1, aggregates: r.aggregate(n.aggregates)}
		})), r
	}, groupBy: function (e) {
		if (N(e) || !this.data.length)
			return new o([]);
		var t, n, i, r, a = e.field, s = this._sortForGrouping(a, e.dir || "asc"), l = V.accessor(a), d = l.get(s[0], a), c = { field: a, value: d, items: [] }, p = [c];
		for (i = 0, r = s.length; r > i; i++)
			t = s[i], n = l.get(t, a), u(d, n) || (d = n, c = { field: a, value: d, items: [] }, p.push(c)), c.items.push(t);
		return new o(p)
	}, _sortForGrouping: function (e, t) {
		var n, i, r = this.data;
		if (!gt) {
			for (n = 0, i = r.length; i > n; n++)
				r[n].__position = n;
			for (r = new o(r).sort(e, t, St).toArray(), n = 0, i = r.length; i > n; n++)
				delete r[n].__position;
			return r
		}
		return this.sort(e, t).toArray()
	}, aggregate: function (e) {
		var t, n, i = {};
		if (e && e.length)
			for (t = 0, n = this.data.length; n > t; t++)
				p(i, e, this.data[t], t, n);
		return i
	} };
	var Et = { sum: function (e, t, n) {
		return (e || 0) + n.get(t)
	}, count: function (e) {
		return (e || 0) + 1
	}, average: function (e, t, n, i, r) {
		return e = (e || 0) + n.get(t), i == r - 1 && (e /= r), e
	}, max: function (e, t, n) {
		var i = n.get(t);
		return e = e || 0, i > e && (e = i), e
	}, min: function (e, t, n) {
		var i = n.get(t);
		return e = e || i, e > i && (e = i), e
	} }, Ft = j.extend({ init: function (e) {
		this.data = e.data
	}, read: function (e) {
		e.success(this.data)
	}, update: function (e) {
		e.success(e.data)
	}, create: function (e) {
		e.success(e.data)
	}, destroy: function (e) {
		e.success(e.data)
	} }), It = j.extend({ init: function (e) {
		var t, n = this;
		e = n.options = I({}, n.options, e), B(it, function (t, n) {
			typeof e[n] === W && (e[n] = { url: e[n] })
		}), n.cache = e.cache ? Pt.create(e.cache) : { find: L, add: L }, t = e.parameterMap, n.parameterMap = z(t) ? t : function (e) {
			var n = {};
			return B(e, function (e, i) {
				e in t && (e = t[e], R(e) && (i = e.value(i), e = e.key)), n[e] = i
			}), n
		}
	}, options: { parameterMap: rt }, create: function (e) {
		return H(this.setup(e, G))
	}, read: function (n) {
		var i, r, o, a = this, s = a.cache;
		n = a.setup(n, $), i = n.success || L, r = n.error || L, o = s.find(n.data), o !== t ? i(o) : (n.success = function (e) {
			s.add(n.data, e), i(e)
		}, e.ajax(n))
	}, update: function (e) {
		return H(this.setup(e, Y))
	}, destroy: function (e) {
		return H(this.setup(e, Q))
	}, setup: function (e, t) {
		e = e || {};
		var n, i = this, r = i.options[t], o = z(r.data) ? r.data(e.data) : r.data;
		return e = I(!0, {}, r, e), n = I(!0, {}, o, e.data), e.data = i.parameterMap(n, t), z(e.url) && (e.url = e.url(n)), e
	} }), Pt = j.extend({ init: function () {
		this._store = {}
	}, add: function (e, n) {
		e !== t && (this._store[at(e)] = n)
	}, find: function (e) {
		return this._store[at(e)]
	}, clear: function () {
		this._store = {}
	}, remove: function (e) {
		delete this._store[at(e)]
	} });
	Pt.create = function (e) {
		var t = { inmemory: function () {
			return new Pt
		} };
		return R(e) && z(e.find) ? e : e === !0 ? new Pt : t[e]()
	};
	var zt = j.extend({ init: function (e) {
		var t, n, i, r, o = this;
		e = e || {};
		for (t in e)
			n = e[t], o[t] = typeof n === W ? ot(n) : n;
		if (r = e.modelBase || Ct, R(o.model) && (o.model = i = r.define(o.model)), o.model) {
			var a = P(o.data, o), s = P(o.groups, o), l = {};
			i = o.model, i.fields && B(i.fields, function (e, t) {
				R(t) && t.field ? l[t.field] = ot(t.field) : l[e] = ot(e)
			}), o.data = b(a, i, g, l), o.groups = b(s, i, v, l)
		}
	}, errors: function (e) {
		return e ? e.errors : null
	}, parse: rt, data: rt, total: function (e) {
		return e.length
	}, groups: rt, status: function (e) {
		return e.status
	}, aggregates: function () {
		return {}
	} }), Rt = U.extend({ init: function (e) {
		var n, i, r, o = this;
		e && (r = e.data), e = o.options = I({}, o.options, e), I(o, { _map: {}, _prefetch: {}, _data: [], _ranges: [], _view: [], _pristine: [], _destroyed: [], _pageSize: e.pageSize, _page: e.page || (e.pageSize ? 1 : t), _sort: a(e.sort), _filter: l(e.filter), _group: c(e.group), _aggregate: e.aggregate, _total: e.total }), U.fn.init.call(o), i = e.transport, i ? (i.read = typeof i.read === W ? { url: i.read} : i.read, e.type && (V.data.transports[e.type] && !R(V.data.transports[e.type]) ? o.transport = new V.data.transports[e.type](I(i, { data: r })) : i = I(!0, {}, V.data.transports[e.type], i), e.schema = I(!0, {}, V.data.schemas[e.type], e.schema)), o.transport || (o.transport = z(i.read) ? i : new It(i))) : o.transport = new Ft({ data: e.data }), o.reader = new V.data.readers[e.schema.type || "json"](e.schema), n = o.reader.model || {}, o._data = o._observe(o._data), o.bind([Z, K, et, X, nt, tt], e)
	}, options: { data: [], schema: { modelBase: Ct }, serverSorting: !1, serverPaging: !1, serverFiltering: !1, serverGrouping: !1, serverAggregates: !1, sendAllFields: !0, batch: !1 }, _flatData: function (e) {
		return this.options.serverGrouping && this.group().length ? _(e) : e
	}, get: function (e) {
		var t, n, i = this._flatData(this._data);
		for (t = 0, n = i.length; n > t; t++)
			if (i[t].id == e)
				return i[t]
	}, getByUid: function (e) {
		var t, n, i = this._flatData(this._data);
		if (i)
			for (t = 0, n = i.length; n > t; t++)
				if (i[t].uid == e)
					return i[t]
	}, sync: function () {
		var t, n, i = this, r = [], o = [], a = i._destroyed, s = i._flatData(i._data);
		if (i.reader.model) {
			for (t = 0, n = s.length; n > t; t++)
				s[t].isNew() ? r.push(s[t]) : s[t].dirty && o.push(s[t]);
			var l = i._send("create", r);
			l.push.apply(l, i._send("update", o)), l.push.apply(l, i._send("destroy", a)), e.when.apply(null, l).then(function () {
				var e, t;
				for (e = 0, t = arguments.length; t > e; e++)
					i._accept(arguments[e]);
				i._change({ action: "sync" }), i.trigger(X)
			})
		}
	}, hasChanges: function () {
		var e, t, n = this._data;
		if (this._destroyed.length)
			return !0;
		for (e = 0, t = n.length; t > e; e++)
			if (n[e].isNew() || n[e].dirty)
				return !0;
		return !1
	}, _accept: function (t) {
		var n, i = this, r = t.models, o = t.response, a = 0, s = i.options.serverGrouping && i.group() && i.group().length, l = i.reader.data(i._pristine), d = t.type;
		if (i.trigger(nt, { response: o, type: d }), o) {
			if (o = i.reader.parse(o), i._handleCustomErrors(o))
				return;
			o = i.reader.data(o), e.isArray(o) || (o = [o])
		}
		else
			o = e.map(r, function (e) {
				return e.toJSON()
			});
		for ("destroy" === d && (i._destroyed = []), a = 0, n = r.length; n > a; a++)
			"destroy" !== d ? (r[a].accept(o[a]), "create" === d ? l.push(s ? y(i.group(), r[a]) : o[a]) : "update" === d && (s ? i._updatePristineGroupModel(r[a], o[a]) : I(l[i._pristineIndex(r[a])], o[a]))) : s ? i._removePristineGroupModel(r[a]) : l.splice(i._pristineIndex(r[a]), 1)
	}, _pristineIndex: function (e) {
		var t, n, i = this, r = i.reader.data(i._pristine);
		for (t = 0, n = r.length; n > t; t++)
			if (r[t][e.idField] === e.id)
				return t;
		return -1
	}, _updatePristineGroupModel: function (e, n) {
		var i, r = this.reader.groups(this._pristine);
		k(r, function (r) {
			return i = C(r, e), i > -1 ? (I(!0, r[i], n), !0) : t
		})
	}, _removePristineGroupModel: function (e) {
		var n, i = this.reader.groups(this._pristine);
		k(i, function (i) {
			return n = C(i, e), n > -1 ? (i.splice(n, 1), !0) : t
		})
	}, _promise: function (t, n, i) {
		var r = this, o = r.transport;
		return e.Deferred(function (e) {
			o[i].call(o, I({ success: function (t) {
				e.resolve({ response: t, models: n, type: i })
			}, error: function (t, n, i) {
				e.reject(t), r.error(t, n, i)
			} }, t))
		}).promise()
	}, _send: function (e, t) {
		var n, i, r = this, o = [];
		if (r.options.batch)
			t.length && o.push(r._promise({ data: { models: f(t)} }, t, e));
		else
			for (n = 0, i = t.length; i > n; n++)
				o.push(r._promise({ data: t[n].toJSON() }, [t[n]], e));
		return o
	}, add: function (e) {
		return this.insert(this._data.length, e)
	}, insert: function (e, t) {
		return t || (t = e, e = 0), t instanceof Ct || (t = this.reader.model ? new this.reader.model(t) : new kt(t)), this.options.serverGrouping && this.group() && this.group().length ? this._data.splice(e, 0, y(this.group(), t)) : this._data.splice(e, 0, t), t
	}, cancelChanges: function (e) {
		var t, n, i = this, r = i.options.serverGrouping && i.group() && i.group().length, o = r ? i.reader.groups : i.reader.data, a = o(i._pristine);
		e instanceof V.data.Model ? r ? i._cancelGroupModel(e) : (n = i.indexOf(e), t = i._pristineIndex(e), -1 != n && (-1 == t || e.isNew() ? i._data.splice(n, 1) : i._data[n].accept(a[t]))) : (i._destroyed = [], i._data = i._observe(a), i._change())
	}, read: function (e) {
		var t = this, n = t._params(e);
		t._queueRequest(n, function () {
			t.trigger(et) ? t._dequeueRequest() : (t.trigger(tt), t._ranges = [], t.transport.read({ data: n, success: P(t.success, t), error: P(t.error, t) }))
		})
	}, _cancelGroupModel: function (e) {
		var n, i, r = this.reader.groups(this._pristine);
		k(r, function (r) {
			return i = C(r, e), i > -1 ? (n = r[i], !0) : t
		}), i > -1 && k(this._data, function (t) {
			i = T(t, e), i > -1 && (e.isNew() ? t.splice(i, 1) : I(!0, t[i], n))
		})
	}, indexOf: function (e) {
		return T(this._data, e)
	}, _params: function (e) {
		var t = this, n = I({ take: t.take(), skip: t.skip(), page: t.page(), pageSize: t.pageSize(), sort: t._sort, filter: t._filter, group: t._group, aggregate: t._aggregate }, e);
		return t.options.serverPaging || (delete n.take, delete n.skip, delete n.page, delete n.pageSize), t.options.serverGrouping || delete n.group, t.options.serverFiltering || delete n.filter, t.options.serverSorting || delete n.sort, t.options.serverAggregates || delete n.aggregate, n
	}, _queueRequest: function (e, n) {
		var i = this;
		i._requestInProgress ? i._pending = { callback: P(n, i), options: e} : (i._requestInProgress = !0, i._pending = t, n())
	}, _dequeueRequest: function () {
		var e = this;
		e._requestInProgress = !1, e._pending && e._queueRequest(e._pending.options, e._pending.callback)
	}, remove: function (e) {
		var t = this._data;
		return this.options.serverGrouping && this.group() && this.group().length ? this._removeGroupItem(t, e) : w(t, e)
	}, _removeGroupItem: function (e, n) {
		var i, r = this;
		return k(e, function (e) {
			return i = w(e, n), i ? (i.isNew && i.isNew() || r._destroyed.push(i), !0) : t
		}), n
	}, error: function (e, t, n) {
		this._dequeueRequest(), this.trigger(nt, {}), this.trigger(Z, { xhr: e, status: t, errorThrown: n })
	}, _handleCustomErrors: function (e) {
		if (this.reader.errors) {
			var t = this.reader.errors(e);
			if (t)
				return this.trigger(Z, { xhr: null, status: "customerror", errorThrown: "custom error", errors: t }), !0
		}
		return !1
	}, _parent: L, success: function (n) {
		var i = this, r = i.options, o = r.serverGrouping === !0 && i._group && i._group.length > 0;
		return i.trigger(nt, { response: n, type: "read" }), n = i.reader.parse(n), i._handleCustomErrors(n) ? (i._dequeueRequest(), t) : (i._pristine = R(n) ? e.extend(!0, {}, n) : n.slice ? n.slice(0) : n, i._total = i.reader.total(n), i._aggregate && r.serverAggregates && (i._aggregateResult = i.reader.aggregates(n)), n = o ? i.reader.groups(n) : i.reader.data(n), i._data = i._observe(n), i._addRange(i._data), i._dequeueRequest(), i._process(i._data), t)
	}, _addRange: function (e) {
		var t = this, n = t._skip || 0, i = n + e.length;
		t._ranges.push({ start: n, end: i, data: e }), t._ranges.sort(function (e, t) {
			return e.start - t.start
		})
	}, _observe: function (e) {
		var t = this, n = t.reader.model, i = !1;
		return n && e.length && (i = !(e[0] instanceof n)), e instanceof xt ? i && (e.type = t.reader.model, e.wrapAll(e, e)) : (e = new xt(e, t.reader.model), e.parent = function () {
			return t._parent()
		}), t.group() && t.group().length && t.options.serverGrouping && x(e, n), e.bind(K, P(t._change, t))
	}, _change: function (e) {
		var t, n, i = this, r = e ? e.action : "";
		if ("remove" === r)
			for (t = 0, n = e.items.length; n > t; t++)
				e.items[t].isNew && e.items[t].isNew() || i._destroyed.push(e.items[t]);
		if (!i.options.autoSync || "add" !== r && "remove" !== r && "itemchange" !== r) {
			var o = i._total || i.reader.total(i._pristine);
			"add" === r ? o++ : "remove" === r ? o-- : "itemchange" === r || i.options.serverPaging || (o = i.reader.total(i._pristine)), i._total = o, i._process(i._data, e)
		}
		else
			i.sync()
	}, _process: function (e, n) {
		var i, r = this, o = {};
		r.options.serverPaging !== !0 && (o.skip = r._skip, o.take = r._take || r._pageSize, o.skip === t && r._page !== t && r._pageSize !== t && (o.skip = (r._page - 1) * r._pageSize)), r.options.serverSorting !== !0 && (o.sort = r._sort), r.options.serverFiltering !== !0 && (o.filter = r._filter), r.options.serverGrouping !== !0 && (o.group = r._group), r.options.serverAggregates !== !0 && (o.aggregate = r._aggregate, r._aggregateResult = m(e, o)), i = h(e, o), r._view = i.data, i.total === t || r.options.serverFiltering || (r._total = i.total), n = n || {}, n.items = n.items || r._view, r.trigger(K, n)
	}, at: function (e) {
		return this._data[e]
	}, data: function (e) {
		var n = this;
		return e === t ? n._data : (n._data = this._observe(e), n._ranges = [], n._addRange(n._data), n._total = n._data.length, n._process(n._data), t)
	}, view: function () {
		return this._view
	}, _mergeState: function (e) {
		var n = this;
		return e !== t && (n._pageSize = e.pageSize, n._page = e.page, n._sort = e.sort, n._filter = e.filter, n._group = e.group, n._aggregate = e.aggregate, n._skip = e.skip, n._take = e.take, n._skip === t && (n._skip = n.skip(), e.skip = n.skip()), n._take === t && n._pageSize !== t && (n._take = n._pageSize, e.take = n._take), e.sort && (n._sort = e.sort = a(e.sort)), e.filter && (n._filter = e.filter = l(e.filter)), e.group && (n._group = e.group = c(e.group)), e.aggregate && (n._aggregate = e.aggregate = d(e.aggregate))), e
	}, query: function (e) {
		var n, i = this, r = i.options.serverSorting || i.options.serverPaging || i.options.serverFiltering || i.options.serverGrouping || i.options.serverAggregates;
		r || i._data === t || 0 === i._data.length ? i.read(i._mergeState(e)) : i.trigger(et) || (i.trigger(tt), n = h(i._data, i._mergeState(e)), i.options.serverFiltering || (i._total = n.total !== t ? n.total : i._data.length), i._view = n.data, i._aggregateResult = m(i._data, e), i.trigger(nt, {}), i.trigger(K, { items: n.data }))
	}, fetch: function (e) {
		var t = this;
		e && z(e) && t.one(K, e), t._query()
	}, _query: function (e) {
		var t = this;
		t.query(I({}, { page: t.page(), pageSize: t.pageSize(), sort: t.sort(), filter: t.filter(), group: t.group(), aggregate: t.aggregate() }, e))
	}, next: function (e) {
		var n = this, i = n.page(), r = n.total();
		return e = e || {}, !i || r && i + 1 > n.totalPages() ? t : (n._skip = i * n.take(), i += 1, e.page = i, n._query(e), i)
	}, prev: function (e) {
		var n = this, i = n.page();
		return e = e || {}, i && 1 !== i ? (n._skip = n._skip - n.take(), i -= 1, e.page = i, n._query(e), i) : t
	}, page: function (e) {
		var n, i = this;
		return e !== t ? (e = st.max(st.min(st.max(e, 1), i.totalPages()), 1), i._query({ page: e }), t) : (n = i.skip(), n !== t ? st.round((n || 0) / (i.take() || 1)) + 1 : t)
	}, pageSize: function (e) {
		var n = this;
		return e !== t ? (n._query({ pageSize: e, page: 1 }), t) : n.take()
	}, sort: function (e) {
		var n = this;
		return e !== t ? (n._query({ sort: e }), t) : n._sort
	}, filter: function (e) {
		var n = this;
		return e === t ? n._filter : (n._query({ filter: e, page: 1 }), t)
	}, group: function (e) {
		var n = this;
		return e !== t ? (n._query({ group: e }), t) : n._group
	}, total: function () {
		return this._total || 0
	}, aggregate: function (e) {
		var n = this;
		return e !== t ? (n._query({ aggregate: e }), t) : n._aggregate
	}, aggregates: function () {
		return this._aggregateResult
	}, totalPages: function () {
		var e = this, t = e.pageSize() || e.total();
		return st.ceil((e.total() || 0) / t)
	}, inRange: function (e, t) {
		var n = this, i = st.min(e + t, n.total());
		return !n.options.serverPaging && n.data.length > 0 ? !0 : n._findRange(e, i).length > 0
	}, range: function (e, n) {
		e = st.min(e || 0, this.total());
		var i, r = this, o = st.max(st.floor(e / n), 0) * n, a = st.min(o + n, r.total());
		if (i = r._findRange(e, st.min(e + n, r.total())), i.length) {
			r._skip = e > r.skip() ? st.min(a, (r.totalPages() - 1) * r.take()) : o, r._take = n;
			var s = r.options.serverPaging, l = r.options.serverSorting, d = r.options.serverFiltering;
			try {
				r.options.serverPaging = !0, r.options.serverSorting = !0, r.options.serverFiltering = !0, s && (r._data = i = r._observe(i)), r._process(i)
			}
			finally {
				r.options.serverPaging = s, r.options.serverSorting = l, r.options.serverFiltering = d
			}
		}
		else
			n !== t && (r._rangeExists(o, a) ? e > o && r.prefetch(a, n, function () {
				r.range(e, n)
			}) : r.prefetch(o, n, function () {
				e > o && r.total() > a && !r._rangeExists(a, st.min(a + n, r.total())) ? r.prefetch(a, n, function () {
					r.range(e, n)
				}) : r.range(e, n)
			}))
	}, _findRange: function (e, n) {
		var i, r, o, a, s, l, d, c, u, p = this, f = p._ranges, m = [], g = p.options, v = g.serverSorting || g.serverPaging || g.serverFiltering || g.serverGrouping || g.serverAggregates;
		for (r = 0, u = f.length; u > r; r++)
			if (i = f[r], e >= i.start && i.end >= e) {
				var b = 0;
				for (o = r; u > o; o++)
					if (i = f[o], i.data.length && e + b >= i.start && (l = i.data, d = i.end, v || (c = h(i.data, { sort: p.sort(), filter: p.filter() }), l = c.data, c.total !== t && (d = c.total)), a = 0, e + b > i.start && (a = e + b - i.start), s = l.length, d > n && (s -= d - n), b += s - a, m = m.concat(l.slice(a, s)), i.end >= n && b == n - e))
						return m;
				break
			}
		return []
	}, skip: function () {
		var e = this;
		return e._skip === t ? e._page !== t ? (e._page - 1) * (e.take() || 1) : t : e._skip
	}, take: function () {
		var e = this;
		return e._take || e._pageSize
	}, prefetch: function (e, t, n) {
		var i = this, r = st.min(e + t, i.total()), o = { start: e, end: r, data: [] }, a = { take: t, skip: e, page: e / t + 1, pageSize: t, sort: i._sort, filter: i._filter, group: i._group, aggregate: i._aggregate };
		i._rangeExists(e, r) ? n && n() : (clearTimeout(i._timeout), i._timeout = setTimeout(function () {
			i._queueRequest(a, function () {
				i.transport.read({ data: a, success: function (t) {
					i._dequeueRequest();
					for (var r = !1, a = 0, s = i._ranges.length; s > a; a++)
						if (i._ranges[a].start === e) {
							r = !0, o = i._ranges[a];
							break
						}
					r || i._ranges.push(o), t = i.reader.parse(t), o.data = i._observe(i.reader.data(t)), o.end = o.start + o.data.length, i._ranges.sort(function (e, t) {
						return e.start - t.start
					}), i._total = i.reader.total(t), n && n()
				} })
			})
		}, 100))
	}, _rangeExists: function (e, t) {
		var n, i, r = this, o = r._ranges;
		for (n = 0, i = o.length; i > n; n++)
			if (e >= o[n].start && o[n].end >= t)
				return !0;
		return !1
	} });
	Rt.create = function (e) {
		e = e && e.push ? { data: e} : e;
		var t, n, i, r = e || {}, o = r.data, a = r.fields, s = r.table, l = r.select, d = {};
		if (o || !a || r.transport || (s ? o = D(s, a) : l && (o = A(l, a))), V.data.Model && a && (!r.schema || !r.schema.model)) {
			for (t = 0, n = a.length; n > t; t++)
				i = a[t], i.type && (d[i.field] = i);
			N(d) || (r.schema = I(!0, r.schema, { model: { fields: d} }))
		}
		return r.data = o, r instanceof Rt ? r : new Rt(r)
	};
	var Nt = Ct.define({ init: function (e) {
		var t = this, n = t.hasChildren || e && e.hasChildren, i = "items", r = {};
		V.data.Model.fn.init.call(t, e), typeof t.children === W && (i = t.children), r = { schema: { data: i, model: { hasChildren: n, id: t.idField}} }, typeof t.children !== W && I(r, t.children), r.data = e, n || (n = r.schema.data), typeof n === W && (n = V.getter(n)), z(n) && (t.hasChildren = !!n.call(t, t)), t._childrenOptions = r, t.hasChildren && t._initChildren(), t._loaded = !(!e || !e[i])
	}, _initChildren: function () {
		var e = this;
		e.children instanceof Ot || (e.children = new Ot(e._childrenOptions), e.children._parent = function () {
			return e
		}, e.children.bind(K, function (t) {
			t.node = t.node || e, e.trigger(K, t)
		}), e._updateChildrenField())
	}, append: function (e) {
		this._initChildren(), this.loaded(!0), this.children.add(e)
	}, hasChildren: !1, level: function () {
		for (var e = this.parentNode(), t = 0; e && e.parentNode;)
			t++, e = e.parentNode ? e.parentNode() : null;
		return t
	}, _updateChildrenField: function () {
		var e = this._childrenOptions.schema.data;
		this[e || "items"] = this.children.data()
	}, load: function () {
		var e = this, n = {};
		e._initChildren(), (!e._loaded || e.hasChildren) && (n[e.idField || "id"] = e.id, e._loaded || (e.children._data = t), e.children.one(K, function () {
			e._loaded = !0, e._updateChildrenField()
		})._query(n))
	}, parentNode: function () {
		var e = this.parent();
		return e.parent()
	}, loaded: function (e) {
		return e === t ? this._loaded : (this._loaded = e, t)
	}, shouldSerialize: function (e) {
		return Ct.fn.shouldSerialize.call(this, e) && "children" !== e && "_loaded" !== e && "hasChildren" !== e && "_childrenOptions" !== e
	} }), Ot = Rt.extend({ init: function (e) {
		var t = Nt.define({ children: e });
		Rt.fn.init.call(this, I(!0, {}, { schema: { modelBase: t, model: t} }, e))
	}, remove: function (e) {
		var t, n = e.parentNode(), i = this;
		return n && (i = n.children), t = Rt.fn.remove.call(i, e), n && !i.data().length && (n.hasChildren = !1), t
	}, insert: function (e, t) {
		var n = this._parent();
		return n && (n.hasChildren = !0, n._initChildren()), Rt.fn.insert.call(this, e, t)
	}, _find: function (e, t) {
		var n, i, r, o, a;
		if (r = Rt.fn[e].call(this, t))
			return r;
		if (o = this._flatData(this.data()))
			for (n = 0, i = o.length; i > n; n++)
				if (a = o[n].children, a instanceof Ot && (r = a[e](t)))
					return r
	}, get: function (e) {
		return this._find("get", e)
	}, getByUid: function (e) {
		return this._find("getByUid", e)
	} });
	Ot.create = function (e) {
		e = e && e.push ? { data: e} : e;
		var t = e || {}, n = t.data, i = t.fields, r = t.list;
		return n && n._dataSource ? n._dataSource : (n || !i || t.transport || r && (n = E(r, i)), t.data = n, t instanceof Ot ? t : new Ot(t))
	}, I(!0, V.data, { readers: { json: zt }, Query: o, DataSource: Rt, HierarchicalDataSource: Ot, Node: Nt, ObservableObject: kt, ObservableArray: xt, LocalTransport: Ft, RemoteTransport: It, Cache: Pt, DataReader: zt, Model: Ct })
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		var t, i, r = [];
		for (t = 0, i = e.length; i > t; t++)
			r = e[t].hasSubgroups ? r.concat(n(e[t].items)) : r.concat(e[t].items);
		return r
	}
	function i(e, n, i) {
		var r = i[e];
		return r ? new I(f.initWidget(n, r.options, i)) : t
	}
	function r(e) {
		var t, n, i, o, a, s, l, d = {};
		for (l = e.match(P), t = 0, n = l.length; n > t; t++)
			i = l[t], o = i.indexOf(":"), a = i.substring(0, o), s = i.substring(o + 1), "{" == s.charAt(0) && (s = r(s)), d[a] = s;
		return d
	}
	function o(e, t, n) {
		var i, r = {};
		for (i in e)
			r[i] = new n(t, e[i]);
		return r
	}
	function a(e, t, n) {
		var s, d, c, u = e.getAttribute("data-" + f.ns + "role"), p = e.getAttribute("data-" + f.ns + "bind"), h = e.children, m = !0, g = {};
		if ((u || p) && l(e), u && (c = i(u, e, n)), p && (p = r(p.replace(z, "")), c || (g = f.parseOptions(e, { textField: "", valueField: "", template: "", valueUpdate: T }), g.roles = n, c = new F(e, g)), c.source = t, d = o(p, t, S), g.template && (d.template = new D(t, "", g.template)), d.click && (p.events = p.events || {}, p.events.click = p.click, delete d.click), d.source && (m = !1), p.attr && (d.attr = o(p.attr, t, S)), p.style && (d.style = o(p.style, t, S)), p.events && (d.events = o(p.events, t, A)), c.bind(d)), c && (e.kendoBindingTarget = c), m && h)
			for (s = 0; h.length > s; s++)
				a(h[s], t, n)
	}
	function s(t, n) {
		var i, r, o = f.rolesFromNamespaces([].slice.call(arguments, 2));
		for (n = f.observable(n), t = e(t), i = 0, r = t.length; r > i; i++)
			a(t[i], n, o)
	}
	function l(t) {
		var n = t.kendoBindingTarget;
		n && (n.destroy(), e.support.deleteExpando ? delete t.kendoBindingTarget : t.removeAttribute ? t.removeAttribute("kendoBindingTarget") : t.kendoBindingTarget = null)
	}
	function d(e) {
		var t, n, i = e.children;
		if (l(e), i)
			for (t = 0, n = i.length; n > t; t++)
				d(i[t])
	}
	function c(t) {
		var n, i;
		for (t = e(t), n = 0, i = t.length; i > n; n++)
			d(t[n])
	}
	function u(e, t) {
		var n = e.element, i = n[0].kendoBindingTarget;
		i && s(n, i.source, t)
	}
	var p, f = window.kendo, h = f.Observable, m = f.data.ObservableObject, g = f.data.ObservableArray, v = {}.toString, b = {}, _ = f.Class, x = e.proxy, k = "value", w = "source", y = "events", C = "checked", T = "change";
	(function () {
		var e = document.createElement("a");
		e.innerText !== t ? p = "innerText" : e.textContent !== t && (p = "textContent")
	})();
	var S = h.extend({ init: function (e, t) {
		var n = this;
		h.fn.init.call(n), n.source = e, n.path = t, n.dependencies = {}, n.dependencies[t] = !0, n.observable = n.source instanceof h, n._access = function (e) {
			n.dependencies[e.field] = !0
		}, n.observable && (n._change = function (e) {
			n.change(e)
		}, n.source.bind(T, n._change))
	}, change: function (e) {
		var t, n, i, r = this;
		if ("this" === r.path)
			r.trigger(T, e);
		else
			for (t in r.dependencies)
				if (n = t.indexOf(e.field), 0 === n && (i = t.charAt(e.field.length), !i || "." === i || "[" === i)) {
					r.trigger(T, e);
					break
				}
	}, start: function () {
		this.observable && this.source.bind("get", this._access)
	}, stop: function () {
		this.observable && this.source.unbind("get", this._access)
	}, get: function () {
		var e, n = this, i = n.source, r = n.path, o = i;
		if (n.start(), n.observable) {
			for (o = i.get(r); o === t && i;)
				i = i.parent(), i instanceof m && (o = i.get(r));
			"function" == typeof o && (e = r.lastIndexOf("."), e > 0 && (i = i.get(r.substring(0, e))), o = x(o, i), o = o(n.source)), i && i !== n.source && (n.currentSource = i, i.unbind(T, n._change).bind(T, n._change))
		}
		return n.stop(), o
	}, set: function (e) {
		var t = this, n = t.currentSource || t.source;
		n.set(t.path, e)
	}, destroy: function () {
		this.observable && this.source.unbind(T, this._change)
	} }), A = S.extend({ get: function () {
		var e, t = this.source, n = this.path;
		for (e = t.get(n); !e && t;)
			t = t.parent(), t instanceof m && (e = t.get(n));
		return x(e, t)
	} }), D = S.extend({ init: function (e, t, n) {
		var i = this;
		S.fn.init.call(i, e, t), i.template = n
	}, render: function (e) {
		var t;
		return this.start(), t = f.render(this.template, e), this.stop(), t
	} }), E = _.extend({ init: function (e, t, n) {
		this.element = e, this.bindings = t, this.options = n
	}, bind: function (e, t) {
		var n = this;
		e = t ? e[t] : e, e.bind(T, function (e) {
			n.refresh(t || e)
		}), n.refresh(t)
	}, destroy: function () {
	} });
	b.attr = E.extend({ refresh: function (e) {
		this.element.setAttribute(e, this.bindings.attr[e].get())
	} }), b.style = E.extend({ refresh: function (e) {
		this.element.style[e] = this.bindings.style[e].get()
	} }), b.enabled = E.extend({ refresh: function () {
		this.bindings.enabled.get() ? this.element.removeAttribute("disabled") : this.element.setAttribute("disabled", "disabled")
	} }), b.readonly = E.extend({ refresh: function () {
		this.bindings.readonly.get() ? this.element.setAttribute("readonly", "readonly") : this.element.removeAttribute("readonly")
	} }), b.disabled = E.extend({ refresh: function () {
		this.bindings.disabled.get() ? this.element.setAttribute("disabled", "disabled") : this.element.removeAttribute("disabled")
	} }), b.events = E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e, t, n), this.handlers = {}
	}, refresh: function (t) {
		var n = e(this.element), i = this.bindings.events[t], r = this.handlers[t];
		r && n.off(t, r), r = this.handlers[t] = i.get(), n.on(t, i.source, r)
	}, destroy: function () {
		var t, n = e(this.element);
		for (t in this.handlers)
			n.off(t, this.handlers[t])
	} }), b.text = E.extend({ refresh: function () {
		var e = this.bindings.text.get();
		null == e && (e = ""), this.element[p] = e
	} }), b.visible = E.extend({ refresh: function () {
		this.element.style.display = this.bindings.visible.get() ? "" : "none"
	} }), b.invisible = E.extend({ refresh: function () {
		this.element.style.display = this.bindings.invisible.get() ? "none" : ""
	} }), b.html = E.extend({ refresh: function () {
		this.element.innerHTML = this.bindings.html.get()
	} }), b.value = E.extend({ init: function (t, n, i) {
		E.fn.init.call(this, t, n, i), this._change = x(this.change, this), this.eventName = i.valueUpdate || T, e(this.element).on(this.eventName, this._change), this._initChange = !1
	}, change: function () {
		this._initChange = this.eventName != T, this.bindings[k].set(this.element.value), this._initChange = !1
	}, refresh: function () {
		if (!this._initChange) {
			var e = this.bindings[k].get();
			null == e && (e = ""), this.element.value = e
		}
		this._initChange = !1
	}, destroy: function () {
		e(this.element).off(this.eventName, this._change)
	} }), b.source = E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e, t, n)
	}, refresh: function (e) {
		var t = this, n = t.bindings.source.get();
		n instanceof g ? (e = e || {}, "add" == e.action ? t.add(e.index, e.items) : "remove" == e.action ? t.remove(e.index, e.items) : "itemchange" != e.action && t.render()) : t.render()
	}, container: function () {
		var e = this.element;
		return "table" == e.nodeName.toLowerCase() && (e.tBodies[0] || e.appendChild(document.createElement("tbody")), e = e.tBodies[0]), e
	}, template: function () {
		var e = this.options, t = e.template, n = this.container().nodeName.toLowerCase();
		return t || (t = "select" == n ? e.valueField || e.textField ? f.format('<option value="#:{0}#">#:{1}#</option>', e.valueField || e.textField, e.textField || e.valueField) : "<option>#:data#</option>" : "tbody" == n ? "<tr><td>#:data#</td></tr>" : "ul" == n || "ol" == n ? "<li>#:data#</li>" : "#:data#", t = f.template(t)), t
	}, destroy: function () {
		var e = this.bindings.source.get();
		e.unbind(T, this._change)
	}, add: function (t, n) {
		var i, r, o, s = this.container(), l = s.cloneNode(!1), d = s.children[t];
		if (e(l).html(f.render(this.template(), n)), l.children.length)
			for (i = 0, r = n.length; r > i; i++)
				o = l.children[0], s.insertBefore(o, d || null), a(o, n[i], this.options.roles)
	}, remove: function (e, t) {
		var n, i = this.container();
		for (n = 0; t.length > n; n++)
			i.removeChild(i.children[e])
	}, render: function () {
		var t, n, i, r = this.bindings.source.get(), o = this.container(), s = this.template();
		if (r instanceof g || "[object Array]" === v.call(r) || (r.parent && (i = r.parent), r = new g([r]), r.parent && (r.parent = i)), this.bindings.template) {
			if (e(o).html(this.bindings.template.render(r)), o.children.length)
				for (t = 0, n = r.length; n > t; t++)
					a(o.children[t], r[t], this.options.roles)
		}
		else
			e(o).html(f.render(s, r))
	} }), b.input = { checked: E.extend({ init: function (t, n, i) {
		E.fn.init.call(this, t, n, i), this._change = x(this.change, this), e(this.element).change(this._change)
	}, change: function () {
		var e = this.element, t = this.value();
		if ("radio" == e.type)
			this.bindings[C].set(t);
		else if ("checkbox" == e.type) {
			var n, i = this.bindings[C].get();
			i instanceof g ? (t = this.element.value, "on" !== t && "off" !== t && (n = i.indexOf(t), n > -1 ? i.splice(n, 1) : i.push(t))) : this.bindings[C].set(t)
		}
	}, refresh: function () {
		var e = this.bindings[C].get(), t = e, n = this.element;
		"checkbox" == n.type ? (t instanceof g && (e = this.element.value, t.indexOf(e) >= 0 && (e = !0)), n.checked = e === !0) : "radio" == n.type && null != e && n.value === "" + e && (n.checked = !0)
	}, value: function () {
		var e = this.element, t = e.value;
		return "checkbox" == e.type && (t = e.checked), t
	}, destroy: function () {
		e(this.element).off(T, this._change)
	} }) }, b.select = {
		value: E.extend({
			init: function (t, n, i) {
				E.fn.init.call(this, t, n, i), this._change = x(this.change, this), e(this.element).change(this._change)
			}, change: function () {
				var e, t, n, i, r, o, a = [], s = this.element, l = this.options.valueField || this.options.textField;
				for (r = 0, o = s.options.length; o > r; r++)
					t = s.options[r], t.selected && (i = t.attributes.value, i = i && i.specified ? t.value : t.text, a.push(i));
				if (l)
					for (e = this.bindings.source.get(), n = 0; a.length > n; n++)
						for (r = 0, o = e.length; o > r; r++)
							if (e[r].get(l) == a[n]) {
								a[n] = e[r];
								break
							}
				i = this.bindings[k].get(), i instanceof g ? i.splice.apply(i, [0, i.length].concat(a)) : i instanceof m || !l ? this.bindings[k].set(a[0]) : this.bindings[k].set(a[0].get(l))
			}, refresh: function () {
				var e, t, n = this.element, i = n.options, r = this.bindings[k].get(), o = r, a = this.options.valueField || this.options.textField;
				o instanceof g || (o = new g([r]));
				for (var s = 0; o.length > s; s++)
					for (r = o[s], a && r instanceof m && (r = r.get(a)), e = 0; i.length > e; e++)
						t = i[e].value, "" === t && "" !== r && (t = i[e].text), t == r && (i[e].selected = !0)
			}, destroy: function () {
				e(this.element).off(T, this._change)
			}
		})
	}, b.widget = { events: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e, this.handlers = {}
	}, refresh: function (e) {
		var t = this.bindings.events[e], n = this.handlers[e];
		n && this.widget.unbind(e, n), n = t.get(), this.handlers[e] = function (e) {
			e.data = t.source, n(e), e.data === t.source && delete e.data
		}, this.widget.bind(e, this.handlers[e])
	}, destroy: function () {
		var e;
		for (e in this.handlers)
			this.widget.unbind(e, this.handlers[e])
	} }), checked: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e, this._change = x(this.change, this), this.widget.bind(T, this._change)
	}, change: function () {
		this.bindings[C].set(this.value())
	}, refresh: function () {
		this.widget.check(this.bindings[C].get() === !0)
	}, value: function () {
		var e = this.element, t = e.value;
		return ("on" == t || "off" == t) && (t = e.checked), t
	}, destroy: function () {
		this.widget.unbind(T, this._change)
	} }), visible: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e
	}, refresh: function () {
		var e = this.bindings.visible.get();
		this.widget.wrapper[0].style.display = e ? "" : "none"
	} }), invisible: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e
	}, refresh: function () {
		var e = this.bindings.invisible.get();
		this.widget.wrapper[0].style.display = e ? "none" : ""
	} }), enabled: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e
	}, refresh: function () {
		this.widget.enable && this.widget.enable(this.bindings.enabled.get())
	} }), disabled: E.extend({ init: function (e, t, n) {
		E.fn.init.call(this, e.element[0], t, n), this.widget = e
	}, refresh: function () {
		this.widget.enable && this.widget.enable(!this.bindings.disabled.get())
	} }), source: E.extend({ init: function (e, t, n) {
		var i = this;
		E.fn.init.call(i, e.element[0], t, n), i.widget = e, i._dataBinding = x(i.dataBinding, i), i._dataBound = x(i.dataBound, i), i._itemChange = x(i.itemChange, i)
	}, itemChange: function (e) {
		a(e.item[0], e.data, this._ns(e.ns))
	}, dataBinding: function () {
		var e, t, n = this.widget, i = n.items();
		for (e = 0, t = i.length; t > e; e++)
			d(i[e])
	}, _ns: function (t) {
		t = t || f.ui;
		var n = [f.ui, f.dataviz.ui, f.mobile.ui];
		return n.splice(e.inArray(t, n), 1), n.unshift(t), f.rolesFromNamespaces(n)
	}, dataBound: function (e) {
		var t, i, r = this.widget, o = r.items(), s = r.dataSource, l = s.view(), d = s.group() || [];
		if (o.length)
			for (d.length && (l = n(l)), t = 0, i = l.length; i > t; t++)
				a(o[t], l[t], this._ns(e.ns))
	}, refresh: function (e) {
		var t, n = this, i = n.widget;
		e = e || {}, e.action || (n.destroy(), i.bind("dataBinding", n._dataBinding), i.bind("dataBound", n._dataBound), i.bind("itemChange", n._itemChange), i.dataSource instanceof f.data.DataSource && (t = n.bindings.source.get(), t instanceof f.data.DataSource ? i.setDataSource(t) : t && t._dataSource ? i.setDataSource(t._dataSource) : i.dataSource.data(t)))
	}, destroy: function () {
		var e = this.widget;
		e.unbind("dataBinding", this._dataBinding), e.unbind("dataBound", this._dataBound), e.unbind("itemChange", this._itemChange)
	} }), value: E.extend({ init: function (t, n, i) {
		E.fn.init.call(this, t.element[0], n, i), this.widget = t, this._change = e.proxy(this.change, this), this.widget.first(T, this._change);
		var r = this.bindings.value.get();
		this._valueIsObservableObject = null == r || r instanceof m
	}, change: function () {
		var e, t, n = this.widget.value(), i = this.options.dataValueField || this.options.dataTextField;
		if (i) {
			var r, o = this._valueIsObservableObject;
			if (this.bindings.source && (r = this.bindings.source.get()), "" === n && o)
				n = null;
			else
				for ((!r || r instanceof f.data.DataSource) && (r = this.widget.dataSource.view()), e = 0, t = r.length; t > e; e++)
					if (r[e].get(i) == n) {
						n = o ? r[e] : r[e].get(i);
						break
					}
		}
		this.bindings.value.set(n)
	}, refresh: function () {
		var e = this.options.dataValueField || this.options.dataTextField, t = this.bindings.value.get();
		e && t instanceof m && (t = t.get(e)), this.widget.value(t)
	}, destroy: function () {
		this.widget.unbind(T, this._change)
	} }) };
	var F = _.extend({ init: function (e, t) {
		this.target = e, this.options = t, this.toDestroy = []
	}, bind: function (e) {
		var t, n, i, r, o = this.target.nodeName.toLowerCase(), a = b[o] || {};
		for (t in e)
			t == k ? n = !0 : t == w ? i = !0 : t == y ? r = !0 : this.applyBinding(t, e, a);
		i && this.applyBinding(w, e, a), n && this.applyBinding(k, e, a), r && this.applyBinding(y, e, a)
	}, applyBinding: function (e, t, n) {
		var i, r = n[e] || b[e], o = this.toDestroy, a = t[e];
		if (r) if (r = new r(this.target, t, this.options), o.push(r), a instanceof S)
			r.bind(a), o.push(a);
		else
			for (i in a)
				r.bind(a, i), o.push(a[i]);
		else if ("template" !== e)
			throw Error("The " + e + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element")
	}, destroy: function () {
		var e, t, n = this.toDestroy;
		for (e = 0, t = n.length; t > e; e++)
			n[e].destroy()
	} }), I = F.extend({ bind: function (e) {
		var t, n = this, i = !1, r = !1;
		for (t in e)
			t == k ? i = !0 : t == w ? r = !0 : n.applyBinding(t, e);
		r && n.applyBinding(w, e), i && n.applyBinding(k, e)
	}, applyBinding: function (e, t) {
		var n, i = b.widget[e], r = this.toDestroy, o = t[e];
		if (!i)
			throw Error("The " + e + " binding is not supported by the " + this.target.options.name + " widget");
		if (i = new i(this.target, t, this.target.options), r.push(i), o instanceof S)
			i.bind(o), r.push(o);
		else
			for (n in o)
				i.bind(o, n), r.push(o[n])
	} }), P = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g, z = /\s/g;
	f.unbind = c, f.bind = s, f.data.binders = b, f.data.Binder = E, f.notify = u, f.observable = function (e) {
		return e instanceof m || (e = new m(e)), e
	}, f.observableHierarchy = function (e) {
		function t(e) {
			var n, i;
			for (n = 0; e.length > n; n++)
				e[n]._initChildren(), i = e[n].children, i.fetch(), e[n].items = i.data(), t(e[n].items)
		}
		var n = f.data.HierarchicalDataSource.create(e);
		return n.fetch(), t(n.data()), n._data._dataSource = n, n._data
	}
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		var n, i = o.ui.validator.ruleResolvers || {}, r = {};
		for (n in i)
			e.extend(!0, r, i[n].resolve(t));
		return r
	}
	function i(e) {
		return e.replace(/&amp/g, "&amp;").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
	}
	function r(e) {
		return e = (e + "").split("."), e.length > 1 ? e[1].length : 0
	}
	var o = window.kendo, a = o.ui.Widget, s = ".kendoValidator", l = "k-invalid-msg", d = "k-invalid", c = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, u = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, p = ":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])", f = ":checkbox:not([disabled],[readonly])", h = "[type=number],[type=range]", m = "blur", g = "name", v = "form", b = "novalidate", _ = e.proxy, x = function (e, t) {
		return "string" == typeof t && (t = RegExp("^(?:" + t + ")$")), t.test(e)
	}, k = function (e, t, n) {
		var i = e.val();
		return e.filter(t).length && "" !== i ? x(i, n) : !0
	}, w = function (e, n) {
		return e.length ? e[0].attributes[n] !== t : !1
	}, y = /(\[|\]|\$|\.|\:|\+)/g;
	o.ui.validator || (o.ui.validator = { rules: {}, messages: {} });
	var C = a.extend({ init: function (t, i) {
		var r = this, s = n(t);
		i = i || {}, i.rules = e.extend({}, o.ui.validator.rules, s.rules, i.rules), i.messages = e.extend({}, o.ui.validator.messages, s.messages, i.messages), a.fn.init.call(r, t, i), r._errorTemplate = o.template(r.options.errorTemplate), r.element.is(v) && r.element.attr(b, b), r._errors = {}, r._attachEvents()
	}, options: { name: "Validator", errorTemplate: '<span class="k-widget k-tooltip k-tooltip-validation"><span class="k-icon k-warning"> </span> #=message#</span>', messages: { required: "{0} is required", pattern: "{0} is not valid", min: "{0} should be greater than or equal to {1}", max: "{0} should be smaller than or equal to {1}", step: "{0} is not valid", email: "{0} is not valid email", url: "{0} is not valid URL", date: "{0} is not valid date" }, rules: { required: function (e) {
		var t = e.filter("[type=checkbox]").length && "checked" !== e.attr("checked"), n = e.val();
		return !(w(e, "required") && ("" === n || !n || t))
	}, pattern: function (e) {
		return e.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length && "" !== e.val() ? x(e.val(), e.attr("pattern")) : !0
	}, min: function (e) {
		if (e.filter(h + ",[" + o.attr("type") + "=number]").filter("[min]").length && "" !== e.val()) {
			var t = parseFloat(e.attr("min")) || 0, n = parseFloat(e.val());
			return n >= t
		}
		return !0
	}, max: function (e) {
		if (e.filter(h + ",[" + o.attr("type") + "=number]").filter("[max]").length && "" !== e.val()) {
			var t = parseFloat(e.attr("max")) || 0, n = parseFloat(e.val());
			return t >= n
		}
		return !0
	}, step: function (e) {
		if (e.filter(h + ",[" + o.attr("type") + "=number]").filter("[step]").length && "" !== e.val()) {
			var t, n = parseFloat(e.attr("min")) || 0, i = parseFloat(e.attr("step")) || 1, a = parseFloat(e.val()), s = r(i);
			return s ? (t = Math.pow(10, s), 0 === (a - n) * t % (i * t) / Math.pow(100, s)) : 0 === (a - n) % i
		}
		return !0
	}, email: function (e) {
		return k(e, "[type=email],[" + o.attr("type") + "=email]", c)
	}, url: function (e) {
		return k(e, "[type=url],[" + o.attr("type") + "=url]", u)
	}, date: function (e) {
		return e.filter("[type^=date],[" + o.attr("type") + "=date]").length && "" !== e.val() ? null !== o.parseDate(e.val(), e.attr(o.attr("format"))) : !0
	} }, validateOnBlur: !0 }, destroy: function () {
		a.fn.destroy.call(this), this.element.off(s)
	}, _submit: function (e) {
		return this.validate() ? !0 : (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !1)
	}, _attachEvents: function () {
		var t = this;
		t.element.is(v) && t.element.on("submit" + s, _(t._submit, t)), t.options.validateOnBlur && (t.element.is(p) ? (t.element.on(m + s, function () {
			t.validateInput(t.element)
		}), t.element.is(f) && t.element.on("click" + s, function () {
			t.validateInput(t.element)
		})) : (t.element.on(m + s, p, function () {
			t.validateInput(e(this))
		}), t.element.on("click" + s, f, function () {
			t.validateInput(e(this))
		})))
	}, validate: function () {
		var e, t, n, i = this, r = !1;
		if (i._errors = {}, !i.element.is(p)) {
			for (e = i.element.find(p), t = 0, n = e.length; n > t; t++)
				i.validateInput(e.eq(t)) || (r = !0);
			return !r
		}
		return i.validateInput(i.element)
	}, validateInput: function (t) {
		t = e(t);
		var n, r = this, o = r._errorTemplate, a = r._checkValidity(t), s = a.valid, c = "." + l, u = t.attr(g) || "", p = r._findMessageContainer(u).add(t.next(c)).hide();
		if (t.removeAttr("aria-invalid"), !s) {
			n = r._extractMessage(t, a.key), r._errors[u] = n;
			var f = e(o({ message: i(n) }));
			r._decorateMessageContainer(f, u), p.replaceWith(f).length || f.insertAfter(t), f.show(), t.attr("aria-invalid", !0)
		}
		return t.toggleClass(d, !s), s
	}, _findMessageContainer: function (e) {
		var t, n = o.ui.validator.messageLocators, i = this.element.find("." + l + "[" + o.attr("for") + "=" + e.replace(y, "\\$1") + "]");
		for (t in n)
			i = i.add(n[t].locate(this.element, e));
		return i
	}, _decorateMessageContainer: function (e, t) {
		var n, i = o.ui.validator.messageLocators;
		e.addClass(l).attr(o.attr("for"), t || "");
		for (n in i)
			i[n].decorate(e, t);
		e.attr("role", "alert")
	}, _extractMessage: function (t, n) {
		var i = this, r = i.options.messages[n], a = t.attr(g);
		return r = e.isFunction(r) ? r(t) : r, o.format(t.attr(o.attr(n + "-msg")) || t.attr("validationMessage") || t.attr("title") || r || "", a, t.attr(n))
	}, _checkValidity: function (e) {
		var t, n = this.options.rules;
		for (t in n)
			if (!n[t](e))
				return { valid: !1, key: t };
		return { valid: !0}
	}, errors: function () {
		var e, t = [], n = this._errors;
		for (e in n)
			t.push(n[e]);
		return t
	} });
	o.ui.plugin(C)
}(window.kendo.jQuery), function (e) {
	function t(t) {
		t.preventDefault();
		var n = e(t.data.root), i = n.closest(".k-widget").parent();
		i[0] || (i = n.parent()), i.trigger(e.Event(t.type, { target: n[0] }))
	}
	function n(e, t) {
		var n = e.x.location, i = e.y.location, r = t.x.location, o = t.y.location, a = n - r, s = i - o;
		return { center: { x: (n + r) / 2, y: (i + o) / 2 }, distance: Math.sqrt(a * a + s * s)}
	}
	function i(e) {
		var t, n, i, r = [], a = e.originalEvent, s = 0;
		if (e.api)
			r.push({ id: 2, event: e, target: e.target, location: e });
		else if (e.type.match(/touch/))
			for (n = a ? a.changedTouches : [], t = n.length; t > s; s++)
				i = n[s], r.push({ location: i, event: e, target: i.target, id: i.identifier });
		else
			o.pointers ? r.push({ location: a, event: e, target: e.target, id: a.pointerId }) : r.push({ id: 1, event: e, target: e.target, location: e });
		return r
	}
	var r = window.kendo, o = r.support, a = o.pointers, s = window.document, l = e(s.documentElement), d = r.Class, c = r.Observable, u = e.now, p = e.extend, f = o.mobileOS, h = f && f.android, m = "press", g = "start", v = "move", b = "end", _ = "cancel", x = "tap", k = "gesturestart", w = "gesturechange", y = "gestureend", C = "gesturetap", T = d.extend({ init: function (e, t) {
		var n = this;
		n.axis = e, n._updateLocationData(t), n.startLocation = n.location, n.velocity = n.delta = 0, n.timeStamp = u()
	}, move: function (e) {
		var t = this, n = e["page" + t.axis], i = u(), r = i - t.timeStamp || 1;
		(n || !h) && (t.delta = n - t.location, t._updateLocationData(e), t.initialDelta = n - t.startLocation, t.velocity = t.delta / r, t.timeStamp = i)
	}, _updateLocationData: function (e) {
		var t = this, n = t.axis;
		t.location = e["page" + n], t.client = e["client" + n], t.screen = e["screen" + n]
	} }), S = d.extend({ init: function (e, t, n) {
		var i = this;
		p(i, { x: new T("X", n.location), y: new T("Y", n.location), userEvents: e, target: t, currentTarget: n.currentTarget, id: n.id, _moved: !1, _finished: !1 }), i._trigger(m, n)
	}, move: function (e) {
		var t = this;
		if (!t._finished) {
			if (t.x.move(e.location), t.y.move(e.location), !t._moved) {
				if (t._withinIgnoreThreshold())
					return;
				if (A.current && A.current !== t.userEvents)
					return t.dispose();
				t._start(e)
			}
			t._finished || t._trigger(v, e)
		}
	}, end: function (e) {
		var t = this;
		t.endTime = u(), t._finished || (t._moved ? t._trigger(b, e) : t._trigger(x, e), t.dispose())
	}, dispose: function () {
		var t = this, n = t.userEvents, i = n.touches;
		t._finished = !0, i.splice(e.inArray(t, i), 1)
	}, skip: function () {
		this.dispose()
	}, cancel: function () {
		this.dispose()
	}, isMoved: function () {
		return this._moved
	}, _start: function (e) {
		this.startTime = u(), this._moved = !0, this._trigger(g, e)
	}, _trigger: function (e, t) {
		var n = this, i = t.event, r = { touch: n, x: n.x, y: n.y, target: n.target, event: i };
		n.userEvents.notify(e, r) && i.preventDefault()
	}, _withinIgnoreThreshold: function () {
		var e = this.x.initialDelta, t = this.y.initialDelta;
		return this.userEvents.threshold >= Math.sqrt(e * e + t * t)
	} }), A = c.extend({ init: function (n, i) {
		var s, d = this;
		if (i = i || {}, s = d.filter = i.filter, d.threshold = i.threshold || 0, d.touches = [], d._maxTouches = i.multiTouch ? 2 : 1, d.eventNS = r.guid(), n = e(n).handler(d).autoApplyNS(d.eventNS), c.fn.init.call(d), p(d, { element: n, surface: i.global ? l : i.surface || n, stopPropagation: i.stopPropagation, pressed: !1 }), d.surface.handler(d).autoApplyNS(d.eventNS).on("move", "_move").on("up cancel", "_end"), n.on("down", s, "_start"), a && n.css("-ms-touch-action", "pinch-zoom double-tap-zoom"), i.preventDragEvent && n.on("dragstart", r.preventDefault), i.allowSelection || n.on("mousedown selectstart", s, { root: n }, t), o.eventCapture)
			for (var u = r.eventMap.up.split(" "), f = 0, h = u.length, T = d.surface[0], S = function (e) {
				d._isMoved() && e.preventDefault()
			}; h > f; f++)
				T.addEventListener(u[f], S, !0);
		d.bind([m, x, g, v, b, _, k, w, y, C], i)
	}, destroy: function () {
		var e = this;
		e.element.kendoDestroy(e.eventNS), e.surface.kendoDestroy(e.eventNS), e._disposeAll()
	}, capture: function () {
		A.current = this
	}, cancel: function () {
		this._disposeAll(), this.trigger(_)
	}, notify: function (t, i) {
		var r = this, o = r.touches;
		if (this._isMultiTouch()) {
			switch (t) {
				case v:
					t = w;
					break;
				case b:
					t = y;
					break;
				case x:
					t = C
			}
			e.extend(i, { touches: o }, n(o[0], o[1]))
		}
		return this.trigger(t, i)
	}, press: function (e, t, n) {
		this._apiCall("_start", e, t, n)
	}, move: function (e, t) {
		this._apiCall("_move", e, t)
	}, end: function (e, t) {
		this._apiCall("_end", e, t)
	}, _isMultiTouch: function () {
		return this.touches.length > 1
	}, _maxTouchesReached: function () {
		return this.touches.length >= this._maxTouches
	}, _disposeAll: function () {
		e.each(this.touches, function () {
			this.dispose()
		})
	}, _isMoved: function () {
		return e.grep(this.touches, function (e) {
			return e.isMoved()
		}).length
	}, _start: function (t) {
		var n, r, o = this, a = 0, s = o.filter, l = i(t), d = l.length;
		if (!o._maxTouchesReached())
			for (A.current = null, o.currentTarget = t.currentTarget, o.stopPropagation && t.stopPropagation(); d > a && !o._maxTouchesReached(); a++)
				r = l[a], n = e(r.target), n = s ? n.is(s) ? n : n.closest(s, o.element) : o.element, n.length && (o.touches.push(new S(o, n, r)), o._isMultiTouch() && o.notify("gesturestart", {}))
	}, _move: function (e) {
		this._eachTouch("move", e)
	}, _end: function (e) {
		this._eachTouch("end", e)
	}, _eachTouch: function (e, t) {
		var n, r, o, a, s = this, l = {}, d = i(t), c = s.touches;
		for (n = 0; c.length > n; n++)
			r = c[n], l[r.id] = r;
		for (n = 0; d.length > n; n++)
			o = d[n], a = l[o.id], a && a[e](o)
	}, _apiCall: function (t, n, i, r) {
		this[t]({ api: !0, pageX: n, pageY: i, target: r || this.element, stopPropagation: e.noop, preventDefault: e.noop })
	} });
	r.getTouches = i, r.touchDelta = n, r.UserEvents = A
}(window.kendo.jQuery), function (e, t) {
	function n(t, n) {
		try {
			return e.contains(t, n) || t == n
		}
		catch (i) {
			return !1
		}
	}
	function i(e) {
		return T ? p.elementFromPoint(e.x.screen, e.y.screen) : p.elementFromPoint(e.x.client, e.y.client)
	}
	function r(e, t) {
		return parseInt(e.css(t), 10) || 0
	}
	function o(e, t) {
		return Math.min(Math.max(e, t.min), t.max)
	}
	function a(e, t) {
		var n = e.offset(), i = n.left + r(e, "borderLeftWidth") + r(e, "paddingLeft"), o = n.top + r(e, "borderTopWidth") + r(e, "paddingTop"), a = i + e.width() - t.outerWidth(!0), s = o + e.height() - t.outerHeight(!0);
		return { x: { min: i, max: a }, y: { min: o, max: s}}
	}
	function s(e, n, i) {
		for (var r, o, a = 0, s = n && n.length, l = i && i.length; e && e.parentNode;) {
			for (a = 0; s > a; a++)
				if (r = n[a], r.element[0] === e)
					return { target: r, targetElement: e };
			for (a = 0; l > a; a++)
				if (o = i[a], u.matchesSelector.call(e, o.options.filter))
					return { target: o, targetElement: e };
			e = e.parentNode
		}
		return t
	}
	var l, d, c = window.kendo, u = c.support, p = window.document, f = c.Class, h = c.ui.Widget, m = c.Observable, g = c.UserEvents, v = e.proxy, b = e.extend, _ = c.getOffset, x = {}, k = {}, w = {}, y = u.mobileOS, C = y && y.android, T = C && "chrome" == y.browser, S = "keyup", A = "change", D = "dragstart", E = "drag", F = "dragend", I = "dragcancel", P = "dragenter", z = "dragleave", R = "drop", N = m.extend({ init: function (t, n) {
		var i = this, r = t[0];
		i.capture = !1, e.each(c.eventMap.down.split(" "), function () {
			r.addEventListener(this, v(i._press, i), !0)
		}), e.each(c.eventMap.up.split(" "), function () {
			r.addEventListener(this, v(i._release, i), !0)
		}), m.fn.init.call(i), i.bind(["press", "release"], n || {})
	}, captureNext: function () {
		this.capture = !0
	}, cancelCapture: function () {
		this.capture = !1
	}, _press: function (e) {
		var t = this;
		t.trigger("press"), t.capture && e.preventDefault()
	}, _release: function (e) {
		var t = this;
		t.trigger("release"), t.capture && (e.preventDefault(), t.cancelCapture())
	} }), O = m.extend({ init: function (t) {
		var n = this;
		m.fn.init.call(n), n.forcedEnabled = !1, e.extend(n, t), n.scale = 1, n.max = 0, n.horizontal ? (n.measure = "width", n.scrollSize = "scrollWidth", n.axis = "x") : (n.measure = "height", n.scrollSize = "scrollHeight", n.axis = "y")
	}, outOfBounds: function (e) {
		return e > this.max || this.min > e
	}, forceEnabled: function () {
		this.forcedEnabled = !0
	}, getSize: function () {
		return this.container[this.measure]()
	}, getTotal: function () {
		return this.element[0][this.scrollSize]
	}, rescale: function (e) {
		this.scale = e
	}, update: function (e) {
		var t = this, n = t.getTotal(), i = n * t.scale, r = t.getSize();
		t.size = r, t.total = i, t.min = Math.min(t.max, t.size - i), t.minScale = t.size / n, t.enabled = t.forcedEnabled || i > r, e || t.trigger(A, t)
	} }), M = m.extend({ init: function (e) {
		var t = this, n = v(t.refresh, t);
		m.fn.init.call(t), t.x = new O(b({ horizontal: !0 }, e)), t.y = new O(b({ horizontal: !1 }, e)), t.forcedMinScale = e.minScale, t.bind(A, e), c.onResize(n)
	}, rescale: function (e) {
		this.x.rescale(e), this.y.rescale(e), this.refresh()
	}, refresh: function () {
		var e = this;
		e.x.update(), e.y.update(), e.enabled = e.x.enabled || e.y.enabled, e.minScale = e.forcedMinScale || Math.max(e.x.minScale, e.y.minScale), e.trigger(A)
	} }), H = m.extend({ init: function (e) {
		var t = this;
		b(t, e), m.fn.init.call(t)
	}, dragMove: function (e) {
		var t = this, n = t.dimension, i = t.axis, r = t.movable, o = r[i] + e;
		n.enabled && ((n.min > o && 0 > e || o > n.max && e > 0) && (e *= t.resistance), r.translateAxis(i, e), t.trigger(A, t))
	} }), B = f.extend({ init: function (e) {
		var t, n, i, r, o = this;
		b(o, { elastic: !0 }, e), i = o.elastic ? .5 : 0, r = o.movable, o.x = t = new H({ axis: "x", dimension: o.dimensions.x, resistance: i, movable: r }), o.y = n = new H({ axis: "y", dimension: o.dimensions.y, resistance: i, movable: r }), o.userEvents.bind(["move", "end", "gesturestart", "gesturechange"], { gesturestart: function (e) {
			o.gesture = e
		}, gesturechange: function (e) {
			var i, a = o.gesture, s = a.center, l = e.center, d = e.distance / a.distance, c = o.dimensions.minScale;
			c >= r.scale && 1 > d && (d += .8 * (1 - d)), i = { x: (r.x - s.x) * d + l.x - r.x, y: (r.y - s.y) * d + l.y - r.y }, r.scaleWith(d), t.dragMove(i.x), n.dragMove(i.y), o.dimensions.rescale(r.scale), o.gesture = e
		}, move: function (e) {
			t.dimension.enabled || n.dimension.enabled ? (t.dragMove(e.x.delta), n.dragMove(e.y.delta), e.preventDefault()) : e.touch.skip()
		}, end: function (e) {
			e.preventDefault()
		} })
	} }), L = u.transitions.prefix + "Transform", V = Math.round;
	d = u.hasHW3D ? function (e, t, n) {
		return "translate3d(" + V(e) + "px," + V(t) + "px,0) scale(" + n + ")"
	} : function (e, t, n) {
		return "translate(" + V(e) + "px," + V(t) + "px) scale(" + n + ")"
	};
	var U = m.extend({ init: function (t) {
		var n = this;
		m.fn.init.call(n), n.element = e(t), n.element[0].style.webkitTransformOrigin = "left top", n.x = 0, n.y = 0, n.scale = 1, n._saveCoordinates(d(n.x, n.y, n.scale))
	}, translateAxis: function (e, t) {
		this[e] += t, this.refresh()
	}, scaleTo: function (e) {
		this.scale = e, this.refresh()
	}, scaleWith: function (e) {
		this.scale *= e, this.refresh()
	}, translate: function (e) {
		this.x += e.x, this.y += e.y, this.refresh()
	}, moveAxis: function (e, t) {
		this[e] = t, this.refresh()
	}, moveTo: function (e) {
		b(this, e), this.refresh()
	}, refresh: function () {
		var e = this, t = d(e.x, e.y, e.scale);
		t != e.coordinates && (e.element[0].style[L] = t, e._saveCoordinates(t), e.trigger(A))
	}, _saveCoordinates: function (e) {
		this.coordinates = e
	} }), j = h.extend({ init: function (e, t) {
		var n = this;
		h.fn.init.call(n, e, t);
		var i = n.options.group;
		i in k ? k[i].push(n) : k[i] = [n]
	}, events: [P, z, R], options: { name: "DropTarget", group: "default" }, destroy: function () {
		var e, t = this.options.group, n = k[t] || w[t];
		if (n.length > 1) {
			for (h.fn.destroy.call(this), e = 0; n.length > e; e++)
				if (n[e] == this) {
					n.splice(e, 1);
					break
				}
		}
		else
			j.destroyGroup(t)
	}, _trigger: function (e, n) {
		var i = this, r = x[i.options.group];
		return r ? i.trigger(e, b({}, n.event, { draggable: r, dropTarget: n.dropTarget })) : t
	}, _over: function (e) {
		this._trigger(P, e)
	}, _out: function (e) {
		this._trigger(z, e)
	}, _drop: function (e) {
		var t = this, n = x[t.options.group];
		n && (n.dropped = !t._trigger(R, e))
	} });
	j.destroyGroup = function (e) {
		var t, n = k[e] || w[e];
		if (n) {
			for (t = 0; n.length > t; t++)
				h.fn.destroy.call(n[t]);
			n.length = 0, delete k[e], delete w[e]
		}
	}, j._cache = k;
	var W = j.extend({ init: function (e, t) {
		var n = this;
		h.fn.init.call(n, e, t);
		var i = n.options.group;
		i in w ? w[i].push(n) : w[i] = [n]
	}, options: { name: "DropTargetArea", group: "default", filter: null} }), q = h.extend({ init: function (e, t) {
		var n = this;
		h.fn.init.call(n, e, t), n.userEvents = new g(n.element, { global: !0, stopPropagation: !0, filter: n.options.filter, threshold: n.options.distance, start: v(n._start, n), move: v(n._drag, n), end: v(n._end, n), cancel: v(n._cancel, n) }), n._afterEndHandler = v(n._afterEnd, n), n.captureEscape = function (e) {
			e.keyCode === c.keys.ESC && (n._trigger(I, { event: e }), n.userEvents.cancel())
		}
	}, events: [D, E, F, I], options: { name: "Draggable", distance: 5, group: "default", cursorOffset: null, axis: null, container: null, dropped: !1 }, _updateHint: function (t) {
		var n, i = this, r = i.options, a = i.boundaries, s = r.axis, l = i.options.cursorOffset;
		l ? n = { left: t.x.location + l.left, top: t.y.location + l.top} : (i.hintOffset.left += t.x.delta, i.hintOffset.top += t.y.delta, n = e.extend({}, i.hintOffset)), a && (n.top = o(n.top, a.y), n.left = o(n.left, a.x)), "x" === s ? delete n.top : "y" === s && delete n.left, i.hint.css(n)
	}, _start: function (t) {
		var n = this, i = n.options, r = i.container, o = i.hint;
		if (n.currentTarget = t.target, n.currentTargetOffset = _(n.currentTarget), o) {
			n.hint = e.isFunction(o) ? e(o.call(n, n.currentTarget)) : o;
			var s = _(n.currentTarget);
			n.hintOffset = s, n.hint.css({ position: "absolute", zIndex: 2e4, left: s.left, top: s.top }).appendTo(p.body)
		}
		x[i.group] = n, n.dropped = !1, r && (n.boundaries = a(r, n.hint)), n._trigger(D, t) && (n.userEvents.cancel(), n._afterEnd()), e(p).on(S, n.captureEscape)
	}, _drag: function (n) {
		var i = this;
		n.preventDefault(), i._withDropTarget(n, function (i, r) {
			if (!i)
				return l && (l._trigger(z, b(n, { dropTarget: e(l.targetElement) })), l = null), t;
			if (l) {
				if (r === l.targetElement)
					return;
				l._trigger(z, b(n, { dropTarget: e(l.targetElement) }))
			}
			i._trigger(P, b(n, { dropTarget: e(r) })), l = b(i, { targetElement: r })
		}), i._trigger(E, n), i.hint && i._updateHint(n)
	}, _end: function (t) {
		var n = this;
		n._withDropTarget(t, function (n, i) {
			n && (n._drop(b({}, t, { dropTarget: e(i) })), l = null)
		}), n._trigger(F, t), n._cancel(t.event)
	}, _cancel: function () {
		var e = this;
		e.hint && !e.dropped ? e.hint.animate(e.currentTargetOffset, "fast", e._afterEndHandler) : e._afterEnd()
	}, _trigger: function (e, t) {
		var n = this;
		return n.trigger(e, b({}, t.event, { x: t.x, y: t.y, currentTarget: n.currentTarget, dropTarget: t.dropTarget }))
	}, _withDropTarget: function (e, t) {
		var r, o, a = this, l = a.options, d = k[l.group], c = w[l.group];
		(d && d.length || c && c.length) && (r = i(e), a.hint && n(a.hint[0], r) && (a.hint.hide(), r = i(e), r || (r = i(e)), a.hint.show()), o = s(r, d, c), o ? t(o.target, o.targetElement) : t())
	}, destroy: function () {
		var e = this;
		h.fn.destroy.call(e), e._afterEnd(), e.userEvents.destroy()
	}, _afterEnd: function () {
		var t = this;
		t.hint && t.hint.remove(), delete x[t.options.group], t.trigger("destroy"), e(p).off(S, t.captureEscape)
	} });
	c.ui.plugin(j), c.ui.plugin(W), c.ui.plugin(q), c.TapCapture = N, c.containerBoundaries = a, b(c.ui, { Pane: B, PaneDimensions: M, Movable: U })
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile, i = t.fx, r = n.ui, o = e.proxy, a = e.extend, s = r.Widget, l = t.Class, d = t.ui.Movable, c = t.ui.Pane, u = t.ui.PaneDimensions, p = i.Transition, f = i.Animation, h = Math.abs, m = 500, g = .7, v = .93, b = .5, _ = "km-scroller-release", x = "km-scroller-refresh", k = "pull", w = "change", y = "resize", C = "scroll", T = f.extend({ init: function (e) {
		var t = this;
		f.fn.init.call(t), a(t, e), t.userEvents.bind("gestureend", o(t.start, t)), t.tapCapture.bind("press", o(t.cancel, t))
	}, done: function () {
		return .01 > this.dimensions.minScale - this.movable.scale
	}, tick: function () {
		var e = this.movable;
		e.scaleWith(1.1), this.dimensions.rescale(e.scale)
	}, onEnd: function () {
		var e = this.movable;
		e.scaleTo(this.dimensions.minScale), this.dimensions.rescale(e.scale)
	} }), S = f.extend({ init: function (e) {
		var t = this;
		f.fn.init.call(t), a(t, e, { transition: new p({ axis: e.axis, movable: e.movable, onEnd: function () {
			t._end()
		} }) }), t.tapCapture.bind("press", function () {
			t.cancel()
		}), t.userEvents.bind("end", o(t.start, t)), t.userEvents.bind("gestureend", o(t.start, t)), t.userEvents.bind("tap", o(t.onEnd, t))
	}, onCancel: function () {
		this.transition.cancel()
	}, freeze: function (e) {
		var t = this;
		t.cancel(), t._moveTo(e)
	}, onEnd: function () {
		var e = this;
		e._outOfBounds() ? e._snapBack() : e._end()
	}, done: function () {
		return 1 > h(this.velocity)
	}, start: function (e) {
		var t = this;
		t.dimension.enabled && (t._outOfBounds() ? t._snapBack() : (t.velocity = 16 * e.touch[t.axis].velocity, t.velocity && (t.tapCapture.captureNext(), f.fn.start.call(t))))
	}, tick: function () {
		var e = this, t = e.dimension, n = e._outOfBounds() ? b : v, i = e.velocity *= n, r = e.movable[e.axis] + i;
		!e.elastic && t.outOfBounds(r) && (r = Math.max(Math.min(r, t.max), t.min), e.velocity = 0), e.movable.moveAxis(e.axis, r)
	}, _end: function () {
		this.tapCapture.cancelCapture(), this.end()
	}, _outOfBounds: function () {
		return this.dimension.outOfBounds(this.movable[this.axis])
	}, _snapBack: function () {
		var e = this, t = e.dimension, n = e.movable[e.axis] > t.max ? t.max : t.min;
		e._moveTo(n)
	}, _moveTo: function (e) {
		this.transition.moveTo({ location: e, duration: m, ease: p.easeOutExpo })
	} }), A = l.extend({ init: function (t) {
		var n = this, i = "x" === t.axis, r = e('<div class="km-touch-scrollbar km-' + (i ? "horizontal" : "vertical") + '-scrollbar" />');
		a(n, t, { element: r, elementSize: 0, movable: new d(r), scrollMovable: t.movable, size: i ? "width" : "height" }), n.scrollMovable.bind(w, o(n._move, n)), n.container.append(r)
	}, _move: function () {
		var e = this, t = e.axis, n = e.dimension, i = n.size, r = e.scrollMovable, o = i / n.total, a = Math.round(-r[t] * o), s = Math.round(i * o);
		a + s > i ? s = i - a : 0 > a && (s += a, a = 0), e.elementSize != s && (e.element.css(e.size, s + "px"), e.elementSize = s), e.movable.moveAxis(t, a)
	}, show: function () {
		this.element.css({ opacity: g, visibility: "visible" })
	}, hide: function () {
		this.element.css({ opacity: 0 })
	} }), D = s.extend({
		init: function (n, i) {
			var r = this;
			s.fn.init.call(r, n, i), n = r.element, n.css("overflow", "hidden").addClass("km-scroll-wrapper").wrapInner('<div class="km-scroll-container"/>').prepend('<div class="km-scroll-header"/>');
			var o = n.children().eq(1), l = new t.TapCapture(n), p = new d(o), f = new u({ element: o, container: n, forcedEnabled: r.options.zoom, change: function () {
				r.trigger(y)
			} }), m = new t.UserEvents(n, { allowSelection: !0, preventDragEvent: !0, multiTouch: r.options.zoom, start: function (e) {
				f.refresh();
				var t = h(e.x.velocity), n = h(e.y.velocity);
				f.x.enabled && 2 * t >= n || f.y.enabled && 2 * n >= t ? m.capture() : m.cancel()
			} }), g = new c({ movable: p, dimensions: f, userEvents: m, elastic: r.options.elastic }), v = new T({ movable: p, dimensions: f, userEvents: m, tapCapture: l });
			p.bind(w, function () {
				r.scrollTop = -p.y, r.scrollLeft = -p.x, r.trigger(C, { scrollTop: r.scrollTop, scrollLeft: r.scrollLeft })
			}), a(r, { movable: p, dimensions: f, zoomSnapBack: v, userEvents: m, pane: g, tapCapture: l, pulled: !1, scrollElement: o, fixedContainer: n.children().first() }), r._initAxis("x"), r._initAxis("y"), f.refresh(), r.options.pullToRefresh && r._initPullToRefresh(), t.onResize(e.proxy(r.reset, r))
		}, scrollHeight: function () {
			return this.scrollElement[0].scrollHeight
		}, scrollWidth: function () {
			return this.scrollElement[0].scrollWidth
		}, options: { name: "Scroller", zoom: !1, pullOffset: 140, elastic: !0, pullTemplate: "Pull to refresh", releaseTemplate: "Release to refresh", refreshTemplate: "Refreshing" }, events: [k, C, y], setOptions: function (e) {
			var t = this;
			s.fn.setOptions.call(t, e), e.pullToRefresh && t._initPullToRefresh()
		}, reset: function () {
			this.movable.moveTo({ x: 0, y: 0 })
		}, scrollTo: function (e, t) {
			this.movable.moveTo({ x: e, y: t })
		}, pullHandled: function () {
			var e = this;
			e.refreshHint.removeClass(x), e.hintContainer.html(e.pullTemplate({})), e.yinertia.onEnd(), e.xinertia.onEnd()
		}, destroy: function () {
			s.fn.destroy.call(this), this.userEvents.destroy()
		}, _initPullToRefresh: function () {
			var e = this;
			e.dimensions.y.forceEnabled(), e.pullTemplate = t.template(e.options.pullTemplate), e.releaseTemplate = t.template(e.options.releaseTemplate), e.refreshTemplate = t.template(e.options.refreshTemplate), e.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-template">' + e.pullTemplate({}) + "</span></span>"), e.refreshHint = e.scrollElement.children().first(), e.hintContainer = e.refreshHint.children(".km-template"), e.pane.y.bind("change", o(e._paneChange, e)), e.userEvents.bind("end", o(e._dragEnd, e))
		}, _dragEnd: function () {
			var e = this;
			e.pulled && (e.pulled = !1, e.refreshHint.removeClass(_).addClass(x), e.hintContainer.html(e.refreshTemplate({})), e.trigger("pull"), e.yinertia.freeze(e.options.pullOffset / 2))
		}, _paneChange: function () {
			var e = this;
			e.movable.y / b > e.options.pullOffset ? e.pulled || (e.pulled = !0, e.refreshHint.removeClass(x).addClass(_), e.hintContainer.html(e.releaseTemplate({}))) : e.pulled && (e.pulled = !1, e.refreshHint.removeClass(_), e.hintContainer.html(e.pullTemplate({})))
		}, _initAxis: function (e) {
			var t = this, n = t.movable, i = t.dimensions[e], r = t.tapCapture, o = new A({ axis: e, movable: n, dimension: i, container: t.element }), a = new S({ axis: e, movable: n, tapCapture: r, userEvents: t.userEvents, dimension: i, elastic: t.options.elastic, end: function () {
				o.hide()
			} });
			t[e + "inertia"] = a, t.pane[e].bind(w, function () {
				o.show()
			})
		}
	});
	r.plugin(D)
}(window.kendo.jQuery), function (e) {
	function t(e) {
		return e.position().top + 3
	}
	var n = window.kendo, i = n.ui.Widget, r = e.proxy, o = ".kendoGroupable", a = n.template('<div class="k-group-indicator" data-#=data.ns#field="${data.field}" data-#=data.ns#title="${data.title || ""}" data-#=data.ns#dir="${data.dir || "asc"}"><a href="\\#" class="k-link"><span class="k-icon k-si-arrow-${(data.dir || "asc") == "asc" ? "n" : "s"}">(sorted ${(data.dir || "asc") == "asc" ? "ascending": "descending"})</span>${data.title ? data.title: data.field}</a><a class="k-button k-button-icon k-button-bare"><span class="k-icon k-group-delete"></span></a></div>', { useWithBlock: !1 }), s = function (t) {
		return e('<div class="k-header k-drag-clue" />').css({ width: t.width(), paddingLeft: t.css("paddingLeft"), paddingRight: t.css("paddingRight"), lineHeight: t.height() + "px", paddingTop: t.css("paddingTop"), paddingBottom: t.css("paddingBottom") }).html(t.attr(n.attr("title")) || t.attr(n.attr("field"))).prepend('<span class="k-icon k-drag-status k-denied" />')
	}, l = e('<div class="k-grouping-dropclue"/>'), d = /(\[|\]|\$|\.|\:|\+)/g, c = i.extend({ init: function (a, d) {
		var c, u, p = this, f = n.guid(), h = r(p._intializePositions, p), m = p._dropCuePositions = [];
		i.fn.init.call(p, a, d), p.draggable = u = p.options.draggable || new n.ui.Draggable(p.element, { filter: p.options.draggableElements, hint: s, group: f }), c = p.groupContainer = e(p.options.groupContainer, p.element).kendoDropTarget({ group: u.options.group, dragenter: function (e) {
			p._canDrag(e.draggable.currentTarget) && (e.draggable.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add"), l.css({ top: t(c), left: 0 }).appendTo(c))
		}, dragleave: function (e) {
			e.draggable.hint.find(".k-drag-status").removeClass("k-add").addClass("k-denied"), l.remove()
		}, drop: function (t) {
			var i, r = t.draggable.currentTarget, o = r.attr(n.attr("field")), a = r.attr(n.attr("title")), s = p.indicator(o), d = p._dropCuePositions, c = d[d.length - 1];
			(r.hasClass("k-group-indicator") || p._canDrag(r)) && (c ? (i = p._dropCuePosition(l.offset().left + parseInt(c.element.css("marginLeft"), 10) + parseInt(c.element.css("marginRight"), 10)), i && p._canDrop(e(s), i.element, i.left) && (i.before ? i.element.before(s || p.buildIndicator(o, a)) : i.element.after(s || p.buildIndicator(o, a)), p._change())) : (p.groupContainer.append(p.buildIndicator(o, a)), p._change()))
		} }).kendoDraggable({ filter: "div.k-group-indicator", hint: s, group: u.options.group, dragcancel: r(p._dragCancel, p), dragstart: function (e) {
			var n = e.currentTarget, i = parseInt(n.css("marginLeft"), 10), r = n.position().left - i;
			h(), l.css({ top: t(c), left: r }).appendTo(c), this.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add")
		}, dragend: function () {
			p._dragEnd(this)
		}, drag: r(p._drag, p) }).on("click" + o, ".k-button", function (t) {
			t.preventDefault(), p._removeIndicator(e(this).parent())
		}).on("click" + o, ".k-link", function (t) {
			var i = e(this).parent(), r = p.buildIndicator(i.attr(n.attr("field")), i.attr(n.attr("title")), "asc" == i.attr(n.attr("dir")) ? "desc" : "asc");
			i.before(r).remove(), p._change(), t.preventDefault()
		}), u.bind(["dragend", "dragcancel", "dragstart", "drag"], { dragend: function () {
			p._dragEnd(this)
		}, dragcancel: r(p._dragCancel, p), dragstart: function (e) {
			var t, n, i;
			return p.options.allowDrag || p._canDrag(e.currentTarget) ? (h(), m.length ? (t = m[m.length - 1].element, n = parseInt(t.css("marginRight"), 10), i = t.position().left + t.outerWidth() + n) : i = 0, undefined) : (e.preventDefault(), undefined)
		}, drag: r(p._drag, p) }), p.dataSource = p.options.dataSource, p.dataSource && (p._refreshHandler = r(p.refresh, p), p.dataSource.bind("change", p._refreshHandler))
	}, refresh: function () {
		var t = this, i = t.dataSource;
		t.groupContainer.empty().append(e.map(i.group() || [], function (e) {
			var i = e.field.replace(d, "\\$1"), r = t.element.find(t.options.filter).filter("[" + n.attr("field") + "=" + i + "]");
			return t.buildIndicator(e.field, r.attr(n.attr("title")), e.dir)
		}).join("")), t._invalidateGroupContainer()
	}, destroy: function () {
		var e = this;
		i.fn.destroy.call(e), e.groupContainer.off(o).kendoDropTarget("destroy").kendoDraggable("destroy"), e.options.draggable || e.draggable.destroy(), e.dataSource && e._refreshHandler && e.dataSource.unbind("change", e._refreshHandler)
	}, options: { name: "Groupable", filter: "th", draggableElements: "th", messages: { empty: "Drag a column header and drop it here to group by that column"} }, indicator: function (t) {
		var i = e(".k-group-indicator", this.groupContainer);
		return e.grep(i, function (i) {
			return e(i).attr(n.attr("field")) === t
		})[0]
	}, buildIndicator: function (e, t, i) {
		return a({ field: e, dir: i, title: t, ns: n.ns })
	}, descriptors: function () {
		var t, i, r, o, a, s = this, l = e(".k-group-indicator", s.groupContainer);
		return t = s.element.find(s.options.filter).map(function () {
			var t = e(this), r = t.attr(n.attr("aggregates")), s = t.attr(n.attr("field"));
			if (r && "" !== r)
				for (i = r.split(","), r = [], o = 0, a = i.length; a > o; o++)
					r.push({ field: s, aggregate: i[o] });
			return r
		}).toArray(), e.map(l, function (i) {
			return i = e(i), r = i.attr(n.attr("field")), { field: r, dir: i.attr(n.attr("dir")), aggregates: t || []}
		})
	}, _removeIndicator: function (e) {
		var t = this;
		e.remove(), t._invalidateGroupContainer(), t._change()
	}, _change: function () {
		var e = this;
		e.dataSource && e.dataSource.group(e.descriptors())
	}, _dropCuePosition: function (t) {
		var n = this._dropCuePositions;
		if (l.is(":visible") && 0 !== n.length) {
			t = Math.ceil(t);
			var i = n[n.length - 1], r = i.right, o = parseInt(i.element.css("marginLeft"), 10), a = parseInt(i.element.css("marginRight"), 10);
			return t >= r ? t = { left: i.element.position().left + i.element.outerWidth() + a, element: i.element, before: !1} : (t = e.grep(n, function (e) {
				return t >= e.left && e.right >= t
			})[0], t && (t = { left: t.element.position().left - o, element: t.element, before: !0 })), t
		}
	}, _drag: function (e) {
		var t = n.touchLocation(e), i = this._dropCuePosition(t.x);
		i && l.css({ left: i.left })
	}, _canDrag: function (e) {
		var t = e.attr(n.attr("field"));
		return "false" != e.attr(n.attr("groupable")) && t && (e.hasClass("k-group-indicator") || !this.indicator(t))
	}, _canDrop: function (e, t, n) {
		var i = e.next();
		return e[0] !== t[0] && (!i[0] || t[0] !== i[0] || n > i.position().left)
	}, _dragEnd: function (t) {
		var i = this, r = t.currentTarget.attr(n.attr("field")), o = i.indicator(r);
		t !== i.options.draggable && !t.dropped && o && i._removeIndicator(e(o)), i._dragCancel()
	}, _dragCancel: function () {
		l.remove(), this._dropCuePositions = []
	}, _intializePositions: function () {
		var t, n = this, i = e(".k-group-indicator", n.groupContainer);
		n._dropCuePositions = e.map(i, function (n) {
			return n = e(n), t = n.offset().left, { left: parseInt(t, 10), right: parseInt(t + n.outerWidth(), 10), element: n}
		})
	}, _invalidateGroupContainer: function () {
		var e = this.groupContainer;
		e.is(":empty") && e.html(this.options.messages.empty)
	} });
	n.ui.plugin(c)
}(window.kendo.jQuery), function (e) {
	function t(t, n) {
		t = e(t), n ? t.find(".k-drag-status").removeClass("k-add").addClass("k-denied") : t.find(".k-drag-status").removeClass("k-denied").addClass("k-add")
	}
	var n = window.kendo, i = n.ui.Widget, r = "change", o = "k-reorderable", a = i.extend({ init: function (a, s) {
		var l, d = this, c = n.guid() + "-reorderable";
		i.fn.init.call(d, a, s), a = d.element.addClass(o), s = d.options, d.draggable = l = s.draggable || new n.ui.Draggable(a, { group: c, filter: s.filter, hint: s.hint }), d.reorderDropCue = e('<div class="k-reorder-cue"><div class="k-icon k-i-arrow-s"></div><div class="k-icon k-i-arrow-n"></div></div>'), a.find(l.options.filter).kendoDropTarget({ group: l.options.group, dragenter: function (e) {
			if (d._draggable) {
				var n = this.element, i = n[0] === d._draggable[0];
				t(e.draggable.hint, i), i || d.reorderDropCue.css({ height: n.outerHeight(), top: n.offset().top, left: n.offset().left + (n.index() > d._draggable.index() ? n.outerWidth() : 0) }).appendTo(document.body)
			}
		}, dragleave: function (e) {
			t(e.draggable.hint, !0), d.reorderDropCue.remove()
		}, drop: function () {
			if (d._draggable) {
				var e, t = d._draggable[0], n = this.element[0];
				t !== n && (e = a.find(l.options.filter), d.trigger(r, { element: d._draggable, oldIndex: e.index(t), newIndex: e.index(n) }))
			}
		} }), l.bind(["dragcancel", "dragend", "dragstart"], { dragcancel: function () {
			d.reorderDropCue.remove(), d._draggable = null
		}, dragend: function () {
			d.reorderDropCue.remove(), d._draggable = null
		}, dragstart: function (e) {
			d._draggable = e.currentTarget
		} })
	}, options: { name: "Reorderable", filter: "*" }, events: [r], destroy: function () {
		var e = this;
		i.fn.destroy.call(e), e.draggable && e.draggable.destroy(), n.destroy(e.element)
	} });
	n.ui.plugin(a)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.ui, r = i.Widget, o = e.proxy, a = e.isFunction, s = e.extend, l = "horizontal", d = "vertical", c = "start", u = "resize", p = "resizeend", f = r.extend({ init: function (e, t) {
		var n = this;
		r.fn.init.call(n, e, t), n.orientation = n.options.orientation.toLowerCase() != d ? l : d, n._positionMouse = n.orientation == l ? "x" : "y", n._position = n.orientation == l ? "left" : "top", n._sizingDom = n.orientation == l ? "outerWidth" : "outerHeight", n.draggable = new i.Draggable(e, { distance: 0, filter: t.handle, drag: o(n._resize, n), dragcancel: o(n._cancel, n), dragstart: o(n._start, n), dragend: o(n._stop, n) }), n.userEvents = n.draggable.userEvents
	}, events: [u, p, c], options: { name: "Resizable", orientation: l }, _max: function (e) {
		var n = this, i = n.hint ? n.hint[n._sizingDom]() : 0, r = n.options.max;
		return a(r) ? r(e) : r !== t ? n._initialElementPosition + r - i : r
	}, _min: function (e) {
		var n = this, i = n.options.min;
		return a(i) ? i(e) : i !== t ? n._initialElementPosition + i : i
	}, _start: function (t) {
		var n = this, i = n.options.hint, r = e(t.currentTarget);
		n._initialElementPosition = r.position()[n._position], n._initialMousePosition = t[n._positionMouse].startLocation, i && (n.hint = a(i) ? e(i(r)) : i, n.hint.css({ position: "absolute" }).css(n._position, n._initialElementPosition).appendTo(n.element)), n.trigger(c, t), n._maxPosition = n._max(t), n._minPosition = n._min(t), e(document.body).css("cursor", r.css("cursor"))
	}, _resize: function (n) {
		var i, r = this, o = (e(n.currentTarget), r._maxPosition), a = r._minPosition, l = r._initialElementPosition + (n[r._positionMouse].location - r._initialMousePosition);
		i = a !== t ? Math.max(a, l) : l, r.position = i = o !== t ? Math.min(o, i) : i, r.hint && r.hint.toggleClass(r.options.invalidClass || "", i == o || i == a).css(r._position, i), r.resizing = !0, r.trigger(u, s(n, { position: i }))
	}, _stop: function (t) {
		var n = this;
		n.hint && n.hint.remove(), n.resizing = !1, n.trigger(p, s(t, { position: n.position })), e(document.body).css("cursor", "")
	}, _cancel: function (e) {
		var n = this;
		n.hint && (n.position = t, n.hint.css(n._position, n._initialElementPosition), n._stop(e))
	}, destroy: function () {
		var e = this;
		r.fn.destroy.call(e), e.draggable && e.draggable.destroy()
	}, press: function (e) {
		if (e) {
			var t = e.position(), n = this;
			n.userEvents.press(t.left, t.top, e[0]), n.targetPosition = t, n.target = e
		}
	}, move: function (e) {
		var n = this, i = n._position, r = n.targetPosition, o = n.position;
		o === t && (o = r[i]), r[i] = o + e, n.userEvents.move(r.left, r.top)
	}, end: function () {
		this.userEvents.end(), this.target = this.position = t
	} });
	n.ui.plugin(f)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = e.proxy, r = "dir", o = "asc", a = "single", s = "field", l = "desc", d = ".kendoSortable", c = ".k-link", u = "aria-sort", p = n.ui.Widget, f = p.extend({ init: function (e, t) {
		var n, r = this;
		p.fn.init.call(r, e, t), r._refreshHandler = i(r.refresh, r), r.dataSource = r.options.dataSource.bind("change", r._refreshHandler), n = r.element.find(c), n[0] || (n = r.element.wrapInner('<a class="k-link" href="#"/>').find(c)), r.link = n, r.element.on("click" + d, i(r._click, r))
	}, options: { name: "Sortable", mode: a, allowUnsort: !0 }, destroy: function () {
		var e = this;
		p.fn.destroy.call(e), e.element.off(d), e.dataSource.unbind("change", e._refreshHandler)
	}, refresh: function () {
		var t, i, a, d, c = this, p = c.dataSource.sort() || [], f = c.element, h = f.attr(n.attr(s));
		for (f.removeAttr(n.attr(r)), f.removeAttr(u), t = 0, i = p.length; i > t; t++)
			a = p[t], h == a.field && f.attr(n.attr(r), a.dir);
		d = f.attr(n.attr(r)), f.find(".k-i-arrow-n,.k-i-arrow-s").remove(), d === o ? (e('<span class="k-icon k-i-arrow-n" />').appendTo(c.link), f.attr(u, "ascending")) : d === l && (e('<span class="k-icon k-i-arrow-s" />').appendTo(c.link), f.attr(u, "descending"))
	}, _click: function (e) {
		var i, d, c = this, u = c.element, p = u.attr(n.attr(s)), f = u.attr(n.attr(r)), h = c.options, m = c.dataSource.sort() || [];
		if (f = f === o ? l : f === l && h.allowUnsort ? t : o, h.mode === a)
			m = [{ field: p, dir: f}];
		else if ("multiple" === h.mode) {
			for (i = 0, d = m.length; d > i; i++)
				if (m[i].field === p) {
					m.splice(i, 1);
					break
				}
			m.push({ field: p, dir: f })
		}
		e.preventDefault(), c.dataSource.sort(m)
	} });
	n.ui.plugin(f)
}(window.kendo.jQuery), function (e) {
	function t(e, t) {
		var n = e.offset(), i = t.left + t.width, r = t.top + t.height;
		return n.right = n.left + e.outerWidth(), n.bottom = n.top + e.outerHeight(), !(n.left > i || t.left > n.right || n.top > r || t.top > n.bottom)
	}
	function n(e, n, i, r) {
		var o, a, s;
		for (o = 0, a = e.length; a > o; o++)
			s = e.eq(o), t(s, i) ? s.hasClass(l) ? r && n !== s[0] && s.removeClass(l).addClass(f) : s.hasClass(d) || s.hasClass(f) || s.addClass(d) : s.hasClass(d) ? s.removeClass(d) : r && s.hasClass(f) && s.removeClass(f).addClass(l)
	}
	var i = window.kendo, r = i.ui.Widget, o = e.proxy, a = Math.abs, s = "aria-selected", l = "k-state-selected", d = "k-state-selecting", c = "k-selectable", u = "change", p = ".kendoSelectable", f = "k-state-unselecting", h = !1;
	(function (e) {
		(function () {
			e('<div class="parent"><span /></div>').on("click", ">*", function () {
				h = !0
			}).find("span").click()
		})()
	})(e);
	var m = r.extend({ init: function (t, n) {
		var a, s = this;
		r.fn.init.call(s, t, n), s._marquee = e("<div class='k-marquee'></div>"), s._lastActive = null, s.element.addClass(c), a = s.options.multiple, s.userEvents = new i.UserEvents(s.element, { global: !0, allowSelection: !a, filter: (h ? "" : "." + c + " ") + s.options.filter, tap: o(s._tap, s) }), a && s.userEvents.bind("start", o(s._start, s)).bind("move", o(s._move, s)).bind("end", o(s._end, s))
	}, events: [u], options: { name: "Selectable", filter: ">*", multiple: !1 }, _tap: function (t) {
		var n, i = e(t.target), r = this, o = t.event.ctrlKey, a = r.options.multiple, s = a && t.event.shiftKey;
		i.closest("." + c)[0] === r.element[0] && (n = i.hasClass(l), a && o || r.clear(), s ? r.selectRange(r._firstSelectee(), i) : (n && o ? (r._unselect(i), r._notify(u)) : r.value(i), r._lastActive = r._downTarget = i))
	}, _start: function (t) {
		var n = this, i = e(t.target), r = i.hasClass(l), o = t.event.ctrlKey;
		return n._downTarget = i, i.closest("." + c)[0] !== n.element[0] ? (n.userEvents.cancel(), n._downTarget = null, undefined) : (n._marquee.appendTo(document.body).css({ left: t.x.client + 1, top: t.y.client + 1, width: 0, height: 0 }), o || n.clear(), r && (n._selectElement(i, !0), o && i.addClass(f)), undefined)
	}, _move: function (e) {
		var t = this, i = { left: e.x.startLocation > e.x.location ? e.x.location : e.x.startLocation, top: e.y.startLocation > e.y.location ? e.y.location : e.y.startLocation, width: a(e.x.initialDelta), height: a(e.y.initialDelta) }, r = t.element.find(t.options.filter);
		t._marquee.css(i), n(r, t._downTarget[0], i, e.event.ctrlKey), e.preventDefault()
	}, _end: function () {
		var e = this;
		e._marquee.remove(), e._unselect(e.element.find(e.options.filter + "." + f)).removeClass(f), e.value(e.element.find(e.options.filter + "." + d)), e._lastActive = e._downTarget
	}, value: function (e) {
		var t = this, n = o(t._selectElement, t);
		return e ? (e.each(function () {
			n(this)
		}), t._notify(u), undefined) : t.element.find(t.options.filter + "." + l)
	}, _firstSelectee: function () {
		var e, t = this;
		return null !== t._lastActive ? t._lastActive : (e = t.value(), e.length > 0 ? e[0] : t.element.find(t.options.filter))
	}, _selectElement: function (t, n) {
		var i = e(t), r = !n && this._notify("select", { element: t });
		i.removeClass(d), r || (i.addClass(l), this.options.aria && i.attr(s, !0))
	}, _notify: function (e, t) {
		return t = t || {}, this.trigger(e, t)
	}, _unselect: function (e) {
		return e.removeClass(l), this.options.aria && e.attr(s, !1), e
	}, clear: function () {
		var e = this.element.find(this.options.filter + "." + l);
		this._unselect(e)
	}, selectRange: function (t, n) {
		var i, r, a, s, d = this, c = !1, p = d.element.find(d.options.filter), f = o(d._selectElement, d);
		for (t = e(t)[0], n = e(n)[0], i = 0, r = p.length; r > i; i++)
			s = p[i], c ? (f(s), c = s !== n) : s === t ? (c = t !== n, f(s)) : s === n ? (a = t, t = n, n = a, c = !0, f(s)) : e(s).removeClass(l);
		d._notify(u)
	}, destroy: function () {
		var e = this;
		r.fn.destroy.call(e), e.element.off(p), e.userEvents.destroy()
	} });
	i.ui.plugin(m)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n, i) {
		return e({ idx: t, text: n, ns: d.ns, numeric: i })
	}
	function i(e, t) {
		return w({ className: e.substring(1), text: t })
	}
	function r(e, t, n, i) {
		e.find(t).parent().attr(d.attr("page"), n).attr("tabindex", -1).toggleClass("k-state-disabled", i)
	}
	function o(e, t) {
		r(e, f, 1, 1 >= t)
	}
	function a(e, t) {
		r(e, m, Math.max(1, t - 1), 1 >= t)
	}
	function s(e, t, n) {
		r(e, g, Math.min(n, t + 1), t >= n)
	}
	function l(e, t, n) {
		r(e, h, n, t >= n)
	}
	var d = window.kendo, c = d.ui, u = c.Widget, p = e.proxy, f = ".k-i-seek-w", h = ".k-i-seek-e", m = ".k-i-arrow-w", g = ".k-i-arrow-e", v = "change", b = ".kendoPager", _ = "click", x = "keydown", k = "disabled", w = d.template('<a href="\\#" title="#=text#" class="k-link"><span class="k-icon #= className #">#=text#</span></a>'), y = u.extend({ init: function (t, n) {
		var r, c, k = this;
		u.fn.init.call(k, t, n), n = k.options, k.dataSource = d.data.DataSource.create(n.dataSource), k.linkTemplate = d.template(k.options.linkTemplate), k.selectTemplate = d.template(k.options.selectTemplate), r = k.page(), c = k.totalPages(), k._refreshHandler = p(k.refresh, k), k.dataSource.bind(v, k._refreshHandler), n.previousNext && (k.element.find(f).length || (k.element.append(i(f, n.messages.first)), o(k.element, r, c)), k.element.find(m).length || (k.element.append(i(m, n.messages.previous)), a(k.element, r, c))), n.numeric && (k.list = k.element.find(".k-pager-numbers"), k.list.length || (k.list = e('<ul class="k-pager-numbers k-reset" />').appendTo(k.element))), n.input && (k.element.find(".k-pager-input").length || k.element.append('<span class="k-pager-input k-label">' + n.messages.page + '<input class="k-textbox">' + d.format(n.messages.of, c) + "</span>"), k.element.on(x + b, ".k-pager-input input", p(k._keydown, k))), n.previousNext && (k.element.find(g).length || (k.element.append(i(g, n.messages.next)), s(k.element, r, c)), k.element.find(h).length || (k.element.append(i(h, n.messages.last)), l(k.element, r, c))), n.pageSizes && (k.element.find(".k-pager-sizes").length || e('<span class="k-pager-sizes k-label"><select/>' + n.messages.itemsPerPage + "</span>").appendTo(k.element).find("select").html(e.map(e.isArray(n.pageSizes) ? n.pageSizes : [5, 10, 20], function (e) {
			return "<option>" + e + "</option>"
		}).join("")).end().appendTo(k.element), k.element.find(".k-pager-sizes select").val(k.pageSize()), d.ui.DropDownList && k.element.find(".k-pager-sizes select").show().kendoDropDownList(), k.element.on(v + b, ".k-pager-sizes select", p(k._change, k))), n.refresh && (k.element.find(".k-pager-refresh").length || k.element.append('<a href="#" class="k-pager-refresh k-link"  title="' + n.messages.refresh + '"><span class="k-icon k-i-refresh">' + n.messages.refresh + "</span></a>"), k.element.on("touchend" + b + " " + _ + b, ".k-pager-refresh", p(k._refreshClick, k))), n.info && (k.element.find(".k-pager-info").length || k.element.append('<span class="k-pager-info k-label" />')), k.element.on("touchend" + b + " " + _ + b, "a", p(k._click, k)).addClass("k-pager-wrap k-widget"), n.autoBind && k.refresh(), d.notify(k)
	}, destroy: function () {
		var e = this;
		u.fn.destroy.call(e), e.element.off(b), e.dataSource.unbind(v, e._refreshHandler)
	}, events: [v], options: { name: "Pager", selectTemplate: '<li><span class="k-state-selected">#=text#</span></li>', linkTemplate: '<li><a tabindex="-1" href="\\#" class="k-link" data-#=ns#page="#=idx#">#=text#</a></li>', buttonCount: 10, autoBind: !0, numeric: !0, info: !0, input: !1, previousNext: !0, pageSizes: !1, refresh: !1, messages: { display: "{0} - {1} of {2} items", empty: "No items to display", page: "Page", of: "of {0}", itemsPerPage: "items per page", first: "Go to the first page", previous: "Go to the previous page", next: "Go to the next page", last: "Go to the last page", refresh: "Refresh"} }, setDataSource: function (e) {
		var t = this;
		t.dataSource.unbind(v, t._refreshHandler), t.dataSource = t.options.dataSource = e, e.bind(v, t._refreshHandler), t.options.autoBind && e.fetch()
	}, refresh: function () {
		var e, t, i, r = this, c = 1, u = "", p = r.page(), f = r.options, h = r.pageSize(), m = r.dataSource.total(), g = r.totalPages(), v = r.linkTemplate, b = f.buttonCount;
		if (f.numeric) {
			for (p > b && (i = p % b, c = 0 === i ? p - b + 1 : p - i + 1), t = Math.min(c + b - 1, g), c > 1 && (u += n(v, c - 1, "...", !1)), e = c; t >= e; e++)
				u += n(e == p ? r.selectTemplate : v, e, e, !0);
			g > t && (u += n(v, e, "...", !1)), "" === u && (u = r.selectTemplate({ text: 0 })), r.list.html(u)
		}
		f.info && (u = m > 0 ? d.format(f.messages.display, (p - 1) * h + 1, Math.min(p * h, m), m) : f.messages.empty, r.element.find(".k-pager-info").html(u)), f.input && r.element.find(".k-pager-input").html(r.options.messages.page + '<input class="k-textbox">' + d.format(f.messages.of, g)).find("input").val(p).attr(k, 1 > m).toggleClass("k-state-disabled", 1 > m), f.previousNext && (o(r.element, p, g), a(r.element, p, g), s(r.element, p, g), l(r.element, p, g)), f.pageSizes && r.element.find(".k-pager-sizes select").val(h).filter("[" + d.attr("role") + "=dropdownlist]").kendoDropDownList("value", h).kendoDropDownList("text", h)
	}, _keydown: function (e) {
		if (e.keyCode === d.keys.ENTER) {
			var t = this.element.find(".k-pager-input").find("input"), n = parseInt(t.val(), 10);
			(isNaN(n) || 1 > n || n > this.totalPages()) && (n = this.page()), t.val(n), this.page(n)
		}
	}, _refreshClick: function (e) {
		e.preventDefault(), this.dataSource.read()
	}, _change: function (e) {
		var t = parseInt(e.currentTarget.value, 10);
		isNaN(t) || this.dataSource.pageSize(t)
	}, _click: function (t) {
		var n = e(t.currentTarget);
		t.preventDefault(), n.is(".k-state-disabled") || this.page(n.attr(d.attr("page")))
	}, totalPages: function () {
		return Math.ceil((this.dataSource.total() || 0) / this.pageSize())
	}, pageSize: function () {
		return this.dataSource.pageSize() || this.dataSource.total()
	}, page: function (e) {
		return e === t ? this.dataSource.total() > 0 ? this.dataSource.page() : 0 : (this.dataSource.page(e), this.trigger(v, { index: e }), t)
	} });
	c.plugin(y)
}(window.kendo.jQuery), function (e) {
	function t(t, n) {
		return t === n || e.contains(t, n)
	}
	var n = window.kendo, i = n.ui, r = i.Widget, o = n.support, a = n.getOffset, s = n.support.browser, l = s.msie && 9 > s.version, d = "open", c = "close", u = "deactivate", p = "activate", f = "center", h = "left", m = "right", g = "top", v = "bottom", b = "absolute", _ = "hidden", x = "body", k = "location", w = "position", y = "visible", C = "fitted", T = "effects", S = "k-state-active", A = "k-state-border", D = ".k-picker-wrap, .k-dropdown-wrap, .k-link", E = "down", F = e(document), I = e(window), P = e(document.documentElement), z = "resize scroll", R = o.transitions.css, N = R + "transform", O = e.extend, M = ".kendoPopup", H = ["font-family", "font-size", "font-stretch", "font-style", "font-weight", "line-height"], B = r.extend({ init: function (t, i) {
		var o, a = this;
		i = i || {}, i.isRtl && (i.origin = i.origin || v + " " + m, i.position = i.position || g + " " + m), r.fn.init.call(a, t, i), t = a.element, i = a.options, a.collisions = i.collision ? i.collision.split(" ") : [], 1 === a.collisions.length && a.collisions.push(a.collisions[0]), o = e(a.options.anchor).closest(".k-popup,.k-group"), i.appendTo = e(e(i.appendTo)[0] || o[0] || x), a.element.hide().addClass("k-popup k-group k-reset").toggleClass("k-rtl", !!i.isRtl).css({ position: b }).appendTo(i.appendTo).on("mouseenter" + M, function () {
			a._hovered = !0
		}).on("mouseleave" + M, function () {
			a._hovered = !1
		}), a.wrapper = e(), i.animation === !1 && (i.animation = { open: { effects: {} }, close: { hide: !0, effects: {}} }), O(i.animation.open, { complete: function () {
			a.wrapper.css({ overflow: y }), a.trigger(p)
		} }), O(i.animation.close, { complete: function () {
			a.wrapper.hide();
			var r, o, s = a.wrapper.data(k), l = e(i.anchor);
			s && a.wrapper.css(s), i.anchor != x && (r = l.hasClass(A + "-down") ? "down" : "up", o = A + "-" + r, l.removeClass(o).children(D).removeClass(S).removeClass(o), t.removeClass(A + "-" + n.directions[r].reverse)), a._closing = !1, a.trigger(u)
		} }), a._mousedownProxy = function (e) {
			a._mousedown(e)
		}, a._currentWidth = F.width(), a._resizeProxy = function (e) {
			a._resize(e)
		}, i.toggleTarget && e(i.toggleTarget).on(i.toggleEvent + M, e.proxy(a.toggle, a))
	}, events: [d, p, c, u], options: { name: "Popup", toggleEvent: "click", origin: v + " " + h, position: g + " " + h, anchor: x, collision: "flip fit", viewport: window, animation: { open: { effects: "slideIn:down", transition: !0, duration: 200 }, close: { duration: 100, hide: !0}} }, destroy: function () {
		var t, i = this, o = i.options, a = i.element.off(M);
		r.fn.destroy.call(i), o.toggleTarget && e(o.toggleTarget).off(M), P.unbind(E, i._mousedownProxy), I.unbind(z, i._resizeProxy), o.appendTo[0] === document.body && (t = a.parent(".k-animation-container"), t[0] ? t.remove() : a.remove()), n.destroy(i.element.children())
	}, open: function (t, i) {
		var r, a, s = this, l = { isFixed: !isNaN(parseInt(i, 10)), x: t, y: i }, c = s.element, u = s.options, p = "down", f = e(u.anchor);
		if (!s.visible()) {
			if (c.css(n.getComputedStyles(f[0], H)), c.data("animating") || s.trigger(d))
				return;
			if (P.unbind(E, s._mousedownProxy).bind(E, s._mousedownProxy), o.mobileOS.ios || o.mobileOS.android || I.unbind(z, s._resizeProxy).bind(z, s._resizeProxy), s.wrapper = a = n.wrap(c).css({ overflow: _, display: "block", position: b }), o.mobileOS.android && a.add(f).css(N, "translatez(0)"), a.css(w), e(u.appendTo)[0] == document.body && a.css(g, "-10000px"), r = O(!0, {}, u.animation.open), s.flipped = s._position(l), r.effects = n.parseEffects(r.effects, s.flipped), p = r.effects.slideIn ? r.effects.slideIn.direction : p, u.anchor != x) {
				var h = A + "-" + p;
				c.addClass(A + "-" + n.directions[p].reverse), f.addClass(h).children(D).addClass(S).addClass(h)
			}
			c.data(T, r.effects).kendoStop(!0).kendoAnimate(r)
		}
	}, toggle: function () {
		var e = this;
		e[e.visible() ? c : d]()
	}, visible: function () {
		return this.element.is(":" + y)
	}, close: function () {
		var t, i, r, o = this, a = o.options;
		if (o.visible()) {
			if (o._closing || o.trigger(c))
				return;
			o.element.find(".k-popup").each(function () {
				var t = e(this), n = t.data("kendoPopup");
				n && n.close()
			}), P.unbind(E, o._mousedownProxy), I.unbind(z, o._resizeProxy), t = O(!0, {}, a.animation.close), i = o.element.data(T), r = t.effects, o.wrapper = n.wrap(o.element).css({ overflow: _ }), !r && !n.size(r) && i && n.size(i) && (t.effects = i, t.reverse = !0), o._closing = !0, o.element.kendoStop(!0).kendoAnimate(t)
		}
	}, _resize: function () {
		var e = this;
		if (l) {
			var n = F.width();
			if (n == e._currentWidth)
				return;
			e._currentWidth = n
		}
		e._hovered || t(e.element[0], document.activeElement) || e.close()
	}, _mousedown: function (i) {
		var r = this, o = r.element[0], a = r.options, s = e(a.anchor)[0], l = a.toggleTarget, d = n.eventTarget(i), c = e(d).closest(".k-popup")[0];
		c && c !== r.element[0] || t(o, d) || t(s, d) || l && t(e(l)[0], d) || r.close()
	}, _fit: function (e, t, n) {
		var i = 0;
		return e + t > n && (i = n - (e + t)), 0 > e && (i = -e), i
	}, _flip: function (e, t, n, i, r, o, a) {
		var s = 0;
		return a = a || t, o !== r && o !== f && r !== f && (e + a > i && (s += -(n + t)), 0 > e + s && (s += n + t)), s
	}, _position: function (t) {
		var n, i, r, s, l = this, d = l.element.css(w, ""), c = l.wrapper, u = l.options, p = e(u.viewport), f = e(p).offset(), h = e(u.anchor), m = u.origin.toLowerCase().split(" "), g = u.position.toLowerCase().split(" "), v = l.collisions, _ = o.zoomLevel(), x = 10002, y = 0;
		if (n = h.parents().filter(c.siblings()), n[0])
			if (r = Number(e(n).css("zIndex")))
				x = r + 1;
			else
				for (i = h.parentsUntil(n), s = i.length; s > y; y++)
					r = Number(e(i[y]).css("zIndex")), r && r > x && (x = r + 1);
		c.css("zIndex", x), t && t.isFixed ? c.css({ left: t.x, top: t.y }) : c.css(l._align(m, g));
		var T = a(c, w), S = a(c), A = h.offsetParent().parent(".k-animation-container");
		A.length && A.data(C) && (T = a(c, w), S = a(c)), p[0] === window ? (S.top -= window.pageYOffset || document.documentElement.scrollTop || 0, S.left -= window.pageXOffset || document.documentElement.scrollLeft || 0) : (S.top -= f.top, S.left -= f.left), l.wrapper.data(k) || c.data(k, O({}, T));
		var D = O({}, S), E = O({}, T);
		"fit" === v[0] && (E.top += l._fit(D.top, c.outerHeight(), p.height() / _)), "fit" === v[1] && (E.left += l._fit(D.left, c.outerWidth(), p.width() / _)), E.left != T.left || E.top != T.top ? c.data(C, !0) : c.removeData(C);
		var F = O({}, E);
		return "flip" === v[0] && (E.top += l._flip(D.top, d.outerHeight(), h.outerHeight(), p.height() / _, m[0], g[0], c.outerHeight())), "flip" === v[1] && (E.left += l._flip(D.left, d.outerWidth(), h.outerWidth(), p.width() / _, m[1], g[1], c.outerWidth())), d.css(w, b), c.css(E), E.left != F.left || E.top != F.top
	}, _align: function (t, n) {
		var i, r = this, o = r.wrapper, s = e(r.options.anchor), l = t[0], d = t[1], c = n[0], u = n[1], p = a(s), h = e(r.options.appendTo), g = o.outerWidth(), b = o.outerHeight(), _ = s.outerWidth(), x = s.outerHeight(), k = p.top, w = p.left, y = Math.round;
		return h[0] != document.body && (i = a(h), k -= i.top, w -= i.left), l === v && (k += x), l === f && (k += y(x / 2)), c === v && (k -= b), c === f && (k -= y(b / 2)), d === m && (w += _), d === f && (w += y(_ / 2)), u === m && (w -= g), u === f && (w -= y(g / 2)), { top: k, left: w}
	} });
	i.plugin(B)
}(window.kendo.jQuery), function (e, t) {
	function n(t, i) {
		t.filters && (t.filters = e.grep(t.filters, function (e) {
			return n(e, i), e.filters ? e.filters.length : e.field != i
		}))
	}
	var i = window.kendo, r = i.ui, o = r.Widget, a = i.keys, s = i.htmlEncode, l = "id", d = "li", c = "change", u = "character", p = "k-state-focused", f = "k-state-hover", h = "k-loading", m = "open", g = "close", v = "select", b = "progress", _ = "requestEnd", x = "width", k = e.extend, w = e.proxy, y = i.support.browser, C = y.msie && 9 > parseInt(y.version, 10), T = /"/g, S = o.extend({
		init: function (t, n) {
			var r, a = this, s = a.ns;
			o.fn.init.call(a, t, n), t = a.element, a._template(), a.ul = e('<ul unselectable="on" class="k-list k-reset"/>').css({ overflow: i.support.kineticScrollNeeded ? "" : "auto" }).on("mouseenter" + s, d, function () {
				e(this).addClass(f)
			}).on("mouseleave" + s, d, function () {
				e(this).removeClass(f)
			}).on("touchend" + s + " click" + s, d, w(a._click, a)).attr({ tabIndex: -1, role: "listbox", "aria-hidden": !0 }), a.list = e("<div class='k-list-container'/>").append(a.ul).on("mousedown" + s, function (e) {
				e.preventDefault()
			}), r = t.attr(l), r && (a.list.attr(l, r + "-list"), a.ul.attr(l, r + "_listbox"), a._optionID = r + "_option_selected")
		}, items: function () {
			return this.ul[0].children
		}, current: function (e) {
			var n = this, i = n._optionID;
			return e === t ? n._current : (n._current && (n._current.removeClass(p).removeAttr("aria-selected").removeAttr(l), n._focused.removeAttr("aria-activedescendant")), e && (e.addClass(p), n._scroll(e), i && (e.attr("id", i), n._focused.attr("aria-activedescendant", i))), n._current = e, t)
		}, destroy: function () {
			var e = this, t = e.ns;
			o.fn.destroy.call(e), e._unbindDataSource(), e.ul.off(t), e.list.off(t), e.popup.destroy(), e._form && e._form.off("reset", e._resetHandler)
		}, dataItem: function (e) {
			var n = this;
			return e === t && (e = n.selectedIndex), n._data()[e]
		}, _accessors: function () {
			var e = this, t = e.element, n = e.options, r = i.getter, o = t.attr(i.attr("text-field")), a = t.attr(i.attr("value-field"));
			o && (n.dataTextField = o), a && (n.dataValueField = a), e._text = r(n.dataTextField), e._value = r(n.dataValueField)
		}, _aria: function () {
			var e = this, n = e.options, i = e._focused;
			n.suggest !== t && i.attr("aria-autocomplete", n.suggest ? "both" : "list"), e.element[0].id && i.attr("aria-owns", e.ul[0].id), e.ul.attr("aria-live", n.filter && "none" !== n.filter ? "polite" : "off")
		}, _blur: function () {
			var e = this;
			e._change(), e.close()
		}, _change: function () {
			var e, n = this, i = n.selectedIndex, r = n.value();
			r !== n._old ? e = !0 : i !== t && i !== n._oldIndex && (e = !0), e && (n._old = r, n._oldIndex = i, n.trigger(c), n.element.trigger(c))
		}, _click: function (t) {
			t.isDefaultPrevented() || (this._accept(e(t.currentTarget)), "touchend" === t.type && t.preventDefault())
		}, _data: function () {
			return this.dataSource.view()
		}, _enable: function () {
			var e = this, t = e.options;
			e.element.prop("disabled") && (t.enable = !1), e.enable(t.enable)
		}, _focus: function (e) {
			var n = this;
			return n.popup.visible() && e && n.trigger(v, { item: e }) ? (n.close(), t) : (n._select(e), n._triggerCascade(), n._blur(), t)
		}, _height: function (e) {
			if (e) {
				var t = this, n = t.list, i = t.popup.visible(), r = t.options.height;
				n = n.add(n.parent(".k-animation-container")).show().height(t.ul[0].scrollHeight > r ? r : "auto"), i || n.hide()
			}
		}, _adjustListWidth: function () {
			var e, t, n = this.list, i = n[0].style.width, r = this.wrapper;
			if (n.data(x) || !i)
				return e = window.getComputedStyle ? window.getComputedStyle(r[0], null) : 0, t = e ? parseFloat(e.width) : r.outerWidth(), e && (y.mozilla || y.msie) && (t += parseFloat(e.paddingLeft) + parseFloat(e.paddingRight) + parseFloat(e.borderLeftWidth) + parseFloat(e.borderRightWidth)), i = t - (n.outerWidth() - n.width()), n.css({ fontFamily: r.css("font-family"), width: i }).data(x, i), !0
		}, _popup: function () {
			var e = this, t = e.list, n = e._focused, o = e.options, a = e.wrapper;
			e.popup = new r.Popup(t, k({}, o.popup, { anchor: a, open: function (t) {
				e._adjustListWidth(), e.trigger(m) ? t.preventDefault() : (n.attr("aria-expanded", !0), e.ul.attr("aria-hidden", !1))
			}, close: function (t) {
				e.trigger(g) ? t.preventDefault() : (n.attr("aria-expanded", !1), e.ul.attr("aria-hidden", !0))
			}, animation: o.animation, isRtl: i.support.isRtl(a) })), e._touchScroller = i.touchScroller(e.popup.element)
		}, _makeUnselectable: function () {
			C && this.list.find("*").attr("unselectable", "on")
		}, _toggleHover: function (t) {
			e(t.currentTarget).toggleClass(f, "mouseenter" === t.type)
		}, _toggle: function (e) {
			var n = this;
			e = e !== t ? e : !n.popup.visible(), i.support.mobileOS || n._focused[0] === document.activeElement || n._focused.focus(), n[e ? m : g]()
		}, _scroll: function (e) {
			if (e) {
				e[0] && (e = e[0]);
				var t = this.ul[0], n = e.offsetTop, i = e.offsetHeight, r = t.scrollTop, o = t.clientHeight, a = n + i;
				t.scrollTop = r > n ? n : a > r + o ? a - o : r
			}
		}, _template: function () {
			var e = this, t = e.options, n = t.template, r = t.dataSource;
			e.element.is(v) && e.element[0].length && (r || (t.dataTextField = t.dataTextField || "text", t.dataValueField = t.dataValueField || "value")), n ? (n = i.template(n), e.template = function (e) {
				return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + n(e) + "</li>"
			}) : e.template = i.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${data' + (t.dataTextField ? "." : "") + t.dataTextField + "}</li>", { useWithBlock: !1 })
		}, _triggerCascade: function () {
			this._old !== this.value() && this.trigger("cascade")
		}, _unbindDataSource: function () {
			var e = this;
			e.dataSource.unbind(c, e._refreshHandler).unbind(b, e._progressHandler).unbind(_, e._requestEndHandler)
		}
	});
	k(S, { caret: function (e) {
		var t, n = e.ownerDocument.selection;
		return t = n ? Math.abs(n.createRange().moveStart(u, -e.value.length)) : e.selectionStart
	}, selectText: function (e, t, n) {
		try {
			if (e.createTextRange) {
				e.focus();
				var i = e.createTextRange();
				i.collapse(!0), i.moveStart(u, t), i.moveEnd(u, n - t), i.select()
			}
			else
				e.setSelectionRange(t, n)
		}
		catch (r) {
		}
	}, inArray: function (e, t) {
		var n, i, r = t.children;
		if (!e || e.parentNode !== t)
			return -1;
		for (n = 0, i = r.length; i > n; n++)
			if (e === r[n])
				return n;
		return -1
	} }), i.ui.List = S, r.Select = S.extend({ init: function (e, t) {
		S.fn.init.call(this, e, t)
	}, setDataSource: function (e) {
		this.options.dataSource = e, this._dataSource(), this.options.autoBind && this.dataSource.fetch()
	}, close: function () {
		this.popup.close()
	}, select: function (e) {
		var n = this;
		return e === t ? n.selectedIndex : (n._select(e), n._triggerCascade(), n._old = n._accessor(), n._oldIndex = n.selectedIndex, t)
	}, _accessor: function (e, n) {
		var i, r, o = this.element, a = o.is(v);
		return o = o[0], e === t ? (a ? (r = o.selectedIndex, r > -1 && (i = o.options[r], i && (e = i.value))) : e = o.value, e) : (a ? o.selectedIndex = n : o.value = e, t)
	}, _hideBusy: function () {
		var e = this;
		clearTimeout(e._busy), e._arrow.removeClass(h), e._focused.attr("aria-busy", !1), e._busy = null
	}, _showBusy: function () {
		var e = this;
		e._request = !0, e._busy || (e._busy = setTimeout(function () {
			e._focused.attr("aria-busy", !0), e._arrow.addClass(h)
		}, 100))
	}, _requestEnd: function () {
		this._request = !1
	}, _dataSource: function () {
		var t, n = this, r = n.element, o = n.options, a = o.dataSource || {};
		a = e.isArray(a) ? { data: a} : a, r.is(v) && (t = r[0].selectedIndex, t > -1 && (o.index = t), a.select = r, a.fields = [{ field: o.dataTextField }, { field: o.dataValueField}]), n.dataSource && n._refreshHandler ? n._unbindDataSource() : (n._refreshHandler = w(n.refresh, n), n._progressHandler = w(n._showBusy, n), n._requestEndHandler = w(n._requestEnd, n)), n.dataSource = i.data.DataSource.create(a).bind(c, n._refreshHandler).bind(b, n._progressHandler).bind(_, n._requestEndHandler)
	}, _index: function (e) {
		var n, i, r, o = this, a = o._data();
		for (n = 0, i = a.length; i > n; n++)
			if (r = o._value(a[n]), r === t && (r = o._text(a[n])), r == e)
				return n;
		return -1
	}, _get: function (t) {
		var n, i, r = this, o = r._data();
		if ("function" == typeof t)
			for (n = 0, i = o.length; i > n; n++)
				if (t(o[n])) {
					t = n;
					break
				}
		if ("number" == typeof t) {
			if (0 > t)
				return e();
			t = e(r.ul[0].children[t])
		}
		return t && t.nodeType && (t = e(t)), t
	}, _move: function (e) {
		var t, n = this, i = e.keyCode, r = n.ul[0], o = n._current, s = i === a.DOWN;
		return i === a.UP || s ? (e.altKey ? n.toggle(s) : s ? (o = !o || -1 === n.selectedIndex && !n.value() ? r.firstChild : o[0].nextSibling, n._select(o)) : n._select(o ? o[0].previousSibling : r.lastChild), e.preventDefault(), t = !0) : i === a.ENTER || i === a.TAB ? (n.popup.visible() && e.preventDefault(), n._accept(o), t = !0) : i === a.ESC && (n.popup.visible() && e.preventDefault(), n.close(), t = !0), t
	}, _selectItem: function (e) {
		var t = this, n = t.options;
		e = t._selectedValue || n.value || t._accessor(), e ? t.value(e) : t.select(n.index)
	}, _fetchItems: function (e) {
		var n = this, i = n.ul[0].firstChild;
		return n._request ? !0 : n._fetch || i ? t : n.options.cascadeFrom ? !i : (n.dataSource.one(c, function () {
			n.value(e), n._fetch = !1
		}), n._fetch = !0, n.dataSource.fetch(), !0)
	}, _options: function (e, n) {
		var i, r, o, a, l = this, d = l.element, c = d[0].selectedIndex, u = e.length, p = "", f = 0;
		for (n && (p = n, f = 1); u > f; f++)
			i = "<option", r = e[f], o = l._text(r), a = l._value(r), a !== t && (a += "", -1 !== a.indexOf('"') && (a = a.replace(T, "&quot;")), i += ' value="' + a + '"'), i += ">", o !== t && (i += s(o)), i += "</option>", p += i;
		d.html(p), d[0].selectedIndex = c
	}, _reset: function () {
		var e = this, t = e.element, n = t.closest("form");
		n[0] && (e._resetHandler = function () {
			setTimeout(function () {
				e.value(t[0].value)
			})
		}, e._form = n.on("reset", e._resetHandler))
	}, _cascade: function () {
		var t, i, r, o, a = this, s = a.options, l = s.cascadeFrom;
		if (l) {
			if (t = e("#" + l).data("kendo" + s.name), !t)
				return;
			r = t.options.dataValueField, o = function () {
				var e = a._selectedValue || a.value();
				e ? (a.value(e), a.dataSource.view()[0] && -1 !== a.selectedIndex || a._clearSelection(t, !0)) : a.select(s.index), a.enable()
			}, i = function () {
				var e, i, s = t.dataItem(), l = s ? t._value(s) : null;
				l ? (e = a.dataSource.filter() || {}, n(e, r), i = e.filters || [], i.push({ field: r, operator: "eq", value: l }), a.dataSource.one(c, o).filter(i)) : (a.enable(!1), a._clearSelection(t)), a._triggerCascade()
			}, t.bind("cascade", function () {
				i()
			}), t._bound ? i() : t.value() || a.enable(!1)
		}
	} }), r.Select.removeFiltersForField = n
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		for (var t, n = 0, i = e.min, r = e.max, a = e.start, s = e.setter, l = e.build, d = e.cells || 12, c = e.perRow || 4, u = e.content || S, p = e.empty || A, f = e.html || '<table tabindex="0" role="grid" class="k-content k-meta-view" cellspacing="0"><tbody><tr role="row">'; d > n; n++)
			n > 0 && 0 === n % c && (f += '</tr><tr role="row">'), t = l(a, n), f += o(a, i, r) ? u(t) : p(t), s(a, 1);
		return f + "</tr></tbody></table>"
	}
	function i(e, t, n) {
		var i = e.getFullYear(), r = t.getFullYear(), o = r, a = 0;
		return n && (r -= r % n, o = r - r % n + n - 1), i > o ? a = 1 : r > i && (a = -1), a
	}
	function r(e, t, n) {
		var i = new dt;
		return i = new dt(i.getFullYear(), i.getMonth(), i.getDate()), e && (i = new dt(+e)), t > i ? i = new dt(+t) : i > n && (i = new dt(+n)), i
	}
	function o(e, t, n) {
		return +e >= +t && +n >= +e
	}
	function a(e, t) {
		return e.slice(t).concat(e.slice(0, t))
	}
	function s(e, t, n) {
		t = t instanceof dt ? t.getFullYear() : e.getFullYear() + n * t, e.setFullYear(t)
	}
	function l(t) {
		-1 === t.type.indexOf("touch") && t.stopImmediatePropagation(), e(this).toggleClass(U, J.indexOf(t.type) > -1 || t.type == K)
	}
	function d(e) {
		e.preventDefault()
	}
	function c(e) {
		return y(e).calendars.standard
	}
	function u(e) {
		var n = ct[e.start], i = ct[e.depth], r = y(e.culture);
		e.format = k(e.format || r.calendars.standard.patterns.d), isNaN(n) && (n = 0, e.start = M), (i === t || i > n) && (e.depth = M), e.dates || (e.dates = [])
	}
	function p(e) {
		E && e.find("*").attr("unselectable", "on")
	}
	function f(e, t) {
		for (var n = 0, i = t.length; i > n; n++)
			if (e === +t[n])
				return !0;
		return !1
	}
	function h(e, t) {
		return e ? e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate() : !1
	}
	var m = window.kendo, g = m.ui, v = g.Widget, b = m.parseDate, _ = m._adjustDate, x = m.keys, k = m._extractFormat, w = m.template, y = m.getCulture, C = m.support.transitions, T = C ? C.css + "transform-origin" : "", S = w('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link" href="\\#" data-#=data.ns#value="#=data.dateString#">#=data.value#</a></td>', { useWithBlock: !1 }), A = w('<td role="gridcell">&nbsp;</td>', { useWithBlock: !1 }), D = m.support.browser, E = D.msie && (9 > parseInt(D.version, 10) || document.documentMode && 9 > document.documentMode), F = ".kendoCalendar", I = "touchend" + F + " click" + F, P = "keydown" + F, z = "id", R = "min", N = "left", O = "slideIn", M = "month", H = "century", B = "change", L = "navigate", V = "value", U = "k-state-hover", j = "k-state-disabled", W = "k-state-focused", q = "k-other-month", G = ' class="' + q + '"', $ = "k-nav-today", Y = "td:has(.k-link)", Q = "blur" + F, K = "focus", X = K + F, J = "touchstart mouseenter", Z = "touchstart" + F + " mouseenter" + F, et = "touchend" + F + " mouseleave" + F, tt = 6e4, nt = 864e5, it = "_prevArrow", rt = "_nextArrow", ot = "aria-disabled", at = "aria-selected", st = e.proxy, lt = e.extend, dt = Date, ct = { month: 0, year: 1, decade: 2, century: 3 }, ut = v.extend({ init: function (t, n) {
		var i, o, a = this;
		v.fn.init.call(a, t, n), t = a.wrapper = a.element, n = a.options, n.url = window.unescape(n.url), a._templates(), a._header(), a._footer(a.footer), o = t.addClass("k-widget k-calendar").on(Z + " " + et, Y, l).on(P, "table.k-content", st(a._move, a)).on(I, Y, function (t) {
			var n = t.currentTarget.firstChild;
			-1 != n.href.indexOf("#") && t.preventDefault(), a._click(e(n))
		}).on("mouseup" + F, function () {
			a._focusView(a.options.focusOnNav !== !1)
		}).attr(z), o && (a._cellID = o + "_cell_selected"), i = n.value, u(n), a._index = ct[n.start], a._current = new dt(+r(i, n.min, n.max)), a._addClassProxy = function () {
			a._active = !0, a._cell.addClass(W)
		}, a._removeClassProxy = function () {
			a._active = !1, a._cell.removeClass(W)
		}, a.value(i), m.notify(a)
	}, options: { name: "Calendar", value: null, min: new dt(1900, 0, 1), max: new dt(2099, 11, 31), dates: [], url: "", culture: "", footer: "", format: "", month: {}, start: M, depth: M, animation: { horizontal: { effects: O, reverse: !0, duration: 500, divisor: 2 }, vertical: { effects: "zoomIn", duration: 400}} }, events: [B, L], setOptions: function (e) {
		u(e), v.fn.setOptions.call(this, e)
	}, destroy: function () {
		var e = this, t = e._today.off(F);
		e.element.off(F), e._title.off(F), e[it].off(F), e[rt].off(F), m.destroy(t), m.destroy(e._view), v.fn.destroy.call(e)
	}, current: function () {
		return this._current
	}, view: function () {
		return this._view
	}, focus: function (e) {
		e = e || this._table, this._bindTable(e), e.focus()
	}, min: function (e) {
		return this._option(R, e)
	}, max: function (e) {
		return this._option("max", e)
	}, navigateToPast: function () {
		this._navigate(it, -1)
	}, navigateToFuture: function () {
		this._navigate(rt, 1)
	}, navigateUp: function () {
		var e = this, t = e._index;
		e._title.hasClass(j) || e.navigate(e._current, ++t)
	}, navigateDown: function (e) {
		var n = this, i = n._index, r = n.options.depth;
		if (e)
			return i === ct[r] ? (+n._value != +e && (n.value(e), n.trigger(B)), t) : (n.navigate(e, --i), t)
	}, navigate: function (n, i) {
		i = isNaN(i) ? ct[i] : i;
		var o, a, s, l, d = this, c = d.options, u = c.culture, f = c.min, h = c.max, m = d._title, g = d._table, v = d._oldTable, b = d._value, _ = d._current, x = n && +n > +_, k = i !== t && i !== d._index;
		n ? d._current = n = new dt(+r(n, f, h)) : n = _, i === t ? i = d._index : d._index = i, d._view = a = pt.views[i], s = a.compare, l = i === ct[H], m.toggleClass(j, l).attr(ot, l), l = 1 > s(n, f), d[it].toggleClass(j, l).attr(ot, l), l = s(n, h) > -1, d[rt].toggleClass(j, l).attr(ot, l), g && v && v.data("animating") && (v.kendoStop(!0, !0), g.kendoStop(!0, !0)), d._oldTable = g, (!g || d._changeView) && (m.html(a.title(n, u)), d._table = o = e(a.content(lt({ min: f, max: h, date: n, url: c.url, dates: c.dates, format: c.format, culture: u }, d[a.name]))), p(o), d._animate({ from: g, to: o, vertical: k, future: x }), d._focus(n), d.trigger(L)), i === ct[c.depth] && b && d._class("k-state-selected", a.toDateString(b)), d._class(W, a.toDateString(n)), !g && d._cell && d._cell.removeClass(W), d._changeView = !0
	}, value: function (e) {
		var n = this, i = n._view, r = n.options, a = r.min, s = r.max;
		return e === t ? n._value : (e = b(e, r.format, r.culture), null !== e && (e = new dt(+e), o(e, a, s) || (e = null)), n._value = e, n._changeView = !e || i && 0 !== i.compare(e, n._current), n.navigate(e), t)
	}, _move: function (t) {
		var n, i, o, a, s = this, l = s.options, d = t.keyCode, c = s._view, u = s._index, p = new dt(+s._current);
		return t.target === s._table[0] && (s._active = !0), t.ctrlKey ? d == x.RIGHT ? (s.navigateToFuture(), i = !0) : d == x.LEFT ? (s.navigateToPast(), i = !0) : d == x.UP ? (s.navigateUp(), i = !0) : d == x.DOWN && (s._click(e(s._cell[0].firstChild)), i = !0) : (d == x.RIGHT ? (n = 1, i = !0) : d == x.LEFT ? (n = -1, i = !0) : d == x.UP ? (n = 0 === u ? -7 : -4, i = !0) : d == x.DOWN ? (n = 0 === u ? 7 : 4, i = !0) : d == x.ENTER ? (s._click(e(s._cell[0].firstChild)), i = !0) : d == x.HOME || d == x.END ? (o = d == x.HOME ? "first" : "last", a = c[o](p), p = new dt(a.getFullYear(), a.getMonth(), a.getDate(), p.getHours(), p.getMinutes(), p.getSeconds(), p.getMilliseconds()), i = !0) : d == x.PAGEUP ? (i = !0, s.navigateToPast()) : d == x.PAGEDOWN && (i = !0, s.navigateToFuture()), (n || o) && (o || c.setDate(p, n), s._focus(r(p, l.min, l.max)))), i && t.preventDefault(), s._current
	}, _animate: function (e) {
		var t = this, n = e.from, i = e.to, r = t._active;
		n ? n.parent().data("animating") ? (n.parent().kendoStop(!0, !0).remove(), n.remove(), i.insertAfter(t.element[0].firstChild), t._focusView(r)) : n.is(":visible") && t.options.animation !== !1 ? t[e.vertical ? "_vertical" : "_horizontal"](n, i, e.future) : (i.insertAfter(n), n.remove(), t._focusView(r)) : (i.insertAfter(t.element[0].firstChild), t._bindTable(i))
	}, _horizontal: function (e, n, i) {
		var r = this, o = r._active, a = r.options.animation.horizontal, s = a.effects, l = e.outerWidth();
		s && -1 != s.indexOf(O) && (e.add(n).css({ width: l }), e.wrap("<div/>"), r._focusView(o, e), e.parent().css({ position: "relative", width: 2 * l, "float": N, "margin-left": i ? 0 : -l }), n[i ? "insertAfter" : "insertBefore"](e), lt(a, { effects: O + ":" + (i ? "right" : N), complete: function () {
			e.remove(), n.unwrap(), r._focusView(o), r._oldTable = t
		} }), e.parent().kendoStop(!0, !0).kendoAnimate(a))
	}, _vertical: function (e, n) {
		var i, r, o = this, a = o.options.animation.vertical, s = a.effects, l = o._active;
		s && -1 != s.indexOf("zoom") && (n.css({ position: "absolute", top: e.prev().outerHeight(), left: 0 }).insertBefore(e), T && (i = o._cellByDate(o._view.toDateString(o._current)), r = i.position(), r = r.left + parseInt(i.width() / 2, 10) + "px" + " " + (r.top + parseInt(i.height() / 2, 10) + "px"), n.css(T, r)), e.kendoStop(!0, !0).kendoAnimate({ effects: "fadeOut", duration: 600, complete: function () {
			e.remove(), n.css({ position: "static", top: 0, left: 0 }), o._focusView(l), o._oldTable = t
		} }), n.kendoStop(!0, !0).kendoAnimate(a))
	}, _cellByDate: function (t) {
		return this._table.find("td:not(." + q + ")").filter(function () {
			return e(this.firstChild).attr(m.attr(V)) === t
		})
	}, _class: function (t, n) {
		var i = this, r = i._cellID, o = i._cell;
		o && o.removeAttr(at).removeAttr(z), o = i._table.find("td:not(." + q + ")").removeClass(t).filter(function () {
			return e(this.firstChild).attr(m.attr(V)) === n
		}).attr(at, !0), t !== W || i._active || i.options.focusOnNav === !1 || (t = ""), o.addClass(t), o[0] && (i._cell = o), r && (o.attr(z, r), i._table.removeAttr("aria-activedescendant").attr("aria-activedescendant", r))
	}, _bindTable: function (e) {
		e.on(X, this._addClassProxy).on(Q, this._removeClassProxy)
	}, _click: function (e) {
		var t = this, n = t.options, i = new Date(+t._current), o = e.attr(m.attr(V)).split("/");
		o = new dt(o[0], o[1], o[2]), _(o), t._view.setDate(i, o), t.navigateDown(r(i, n.min, n.max))
	}, _focus: function (e) {
		var t = this, n = t._view;
		0 !== n.compare(e, t._current) ? t.navigate(e) : (t._current = e, t._class(W, n.toDateString(e)))
	}, _focusView: function (e, t) {
		e && this.focus(t)
	}, _footer: function (n) {
		var i = this, r = i.element, o = new dt, a = r.find(".k-footer");
		return n ? (a[0] || (a = e('<div class="k-footer"><a href="#" class="k-link k-nav-today"></a></div>').appendTo(r)), i._today = a.show().find(".k-link").html(n(o)).attr("title", m.toString(o, "D", i.options.culture)), i._toggle(), t) : (i._toggle(!1), a.hide(), t)
	}, _header: function () {
		var e, t = this, n = t.element, i = t.options.focusOnNav !== !1;
		n.find(".k-header")[0] || n.html('<div class="k-header"><a href="#" role="button" class="k-link k-nav-prev"><span class="k-icon k-i-arrow-w"></span></a><a href="#" role="button" aria-live="assertive" aria-atomic="true" class="k-link k-nav-fast"></a><a href="#" role="button" class="k-link k-nav-next"><span class="k-icon k-i-arrow-e"></span></a></div>'), e = n.find(".k-link").on(Z + " " + et + " " + X + " " + Q, l).click(!1), t._title = e.eq(1).on(I, function () {
			t._focusView(i), t.navigateUp()
		}), t[it] = e.eq(0).on(I, function () {
			t._focusView(i), t.navigateToPast()
		}), t[rt] = e.eq(2).on(I, function () {
			t._focusView(i), t.navigateToFuture()
		})
	}, _navigate: function (e, t) {
		var n = this, i = n._index + 1, r = new dt(+n._current);
		e = n[e], e.hasClass(j) || (i > 3 ? r.setFullYear(r.getFullYear() + 100 * t) : pt.views[i].setDate(r, t), n.navigate(r))
	}, _option: function (e, n) {
		var i, r, o = this, a = o.options, s = +o._value, l = rt;
		return n === t ? a[e] : (n = b(n, a.format, a.culture), n && (a[e] = new dt(+n), r = o._view.compare(n, o._current), e === R ? (i = +n > s, r = r > -1, l = it) : (i = s > +n, r = 1 > r), i ? o.value(null) : r ? o.navigate() : o[l].toggleClass(j, !1).attr(ot, !1), o._toggle()), t)
	}, _toggle: function (e) {
		var n = this, i = n.options, r = n._today;
		e === t && (e = o(new dt, i.min, i.max)), r && (r.off(I), e ? r.addClass($).removeClass(j).on(I, st(n._todayClick, n)) : r.removeClass($).addClass(j).on(I, d))
	}, _todayClick: function (e) {
		var t = this, n = ct[t.options.depth], i = new dt;
		e.preventDefault(), 0 === t._view.compare(t._current, i) && t._index == n && (t._changeView = !1), t._value = i, t.navigate(i, n), t.trigger(B)
	}, _templates: function () {
		var e = this, t = e.options, n = t.footer, i = t.month, r = i.content, o = i.empty;
		e.month = { content: w('<td#=data.cssClass# role="gridcell"><a tabindex="-1" class="k-link#=data.linkClass#" href="#=data.url#" ' + m.attr("value") + '="#=data.dateString#" title="#=data.title#">' + (r || "#=data.value#") + "</a></td>", { useWithBlock: !!r }), empty: w('<td role="gridcell">' + (o || "&nbsp;") + "</td>", { useWithBlock: !!o }) }, n !== !1 && (e.footer = w(n || '#= kendo.toString(data,"D","' + t.culture + '") #', { useWithBlock: !1 }))
	} });
	g.plugin(ut);
	var pt = { firstDayOfMonth: function (e) {
		return new dt(e.getFullYear(), e.getMonth(), 1)
	}, firstVisibleDay: function (e, t) {
		t = t || m.culture().calendar;
		for (var n = t.firstDay, i = new dt(e.getFullYear(), e.getMonth(), 0, e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()); i.getDay() != n;)
			pt.setTime(i, -1 * nt);
		return i
	}, setTime: function (e, t) {
		var n = e.getTimezoneOffset(), i = new dt(e.getTime() + t), r = i.getTimezoneOffset() - n;
		e.setTime(i.getTime() + r * tt)
	}, views: [{ name: M, title: function (e, t) {
		return c(t).months.names[e.getMonth()] + " " + e.getFullYear()
	}, content: function (e) {
		for (var t = this, i = 0, r = e.min, o = e.max, s = e.date, l = e.dates, d = e.format, u = e.culture, p = e.url, h = p && l[0], g = c(u), v = g.firstDay, b = g.days, x = a(b.names, v), k = a(b.namesShort, v), w = pt.firstVisibleDay(s, g), y = t.first(s), C = t.last(s), T = t.toDateString, S = new dt, A = '<table tabindex="0" role="grid" class="k-content" cellspacing="0"><thead><tr role="row">'; 7 > i; i++)
			A += '<th scope="col" title="' + x[i] + '">' + k[i] + "</th>";
		return S = new dt(S.getFullYear(), S.getMonth(), S.getDate()), _(S), S = +S, n({ cells: 42, perRow: 7, html: A += '</tr></thead><tbody><tr role="row">', start: new dt(w.getFullYear(), w.getMonth(), w.getDate()), min: new dt(r.getFullYear(), r.getMonth(), r.getDate()), max: new dt(o.getFullYear(), o.getMonth(), o.getDate()), content: e.content, empty: e.empty, setter: t.setDate, build: function (e) {
			var t = [], n = e.getDay(), i = "", r = "#";
			return (y > e || e > C) && t.push(q), +e === S && t.push("k-today"), (0 === n || 6 === n) && t.push("k-weekend"), h && f(+e, l) && (r = p.replace("{0}", m.toString(e, d, u)), i = " k-action-link"), { date: e, dates: l, ns: m.ns, title: m.toString(e, "D", u), value: e.getDate(), dateString: T(e), cssClass: t[0] ? ' class="' + t.join(" ") + '"' : "", linkClass: i, url: r}
		} })
	}, first: function (e) {
		return pt.firstDayOfMonth(e)
	}, last: function (e) {
		var t = new dt(e.getFullYear(), e.getMonth() + 1, 0), n = pt.firstDayOfMonth(e), i = Math.abs(t.getTimezoneOffset() - n.getTimezoneOffset());
		return i && t.setHours(n.getHours() + i / 60), t
	}, compare: function (e, t) {
		var n, i = e.getMonth(), r = e.getFullYear(), o = t.getMonth(), a = t.getFullYear();
		return n = r > a ? 1 : a > r ? -1 : i == o ? 0 : i > o ? 1 : -1
	}, setDate: function (e, t) {
		var n = e.getHours();
		t instanceof dt ? e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()) : pt.setTime(e, t * nt), _(e, n)
	}, toDateString: function (e) {
		return e.getFullYear() + "/" + e.getMonth() + "/" + e.getDate()
	} }, { name: "year", title: function (e) {
		return e.getFullYear()
	}, content: function (e) {
		var t = c(e.culture).months.namesAbbr, i = this.toDateString, r = e.min, o = e.max;
		return n({ min: new dt(r.getFullYear(), r.getMonth(), 1), max: new dt(o.getFullYear(), o.getMonth(), 1), start: new dt(e.date.getFullYear(), 0, 1), setter: this.setDate, build: function (e) {
			return { value: t[e.getMonth()], ns: m.ns, dateString: i(e), cssClass: ""}
		} })
	}, first: function (e) {
		return new dt(e.getFullYear(), 0, e.getDate())
	}, last: function (e) {
		return new dt(e.getFullYear(), 11, e.getDate())
	}, compare: function (e, t) {
		return i(e, t)
	}, setDate: function (e, t) {
		var n, i = e.getHours();
		t instanceof dt ? (n = t.getMonth(), e.setFullYear(t.getFullYear(), n, e.getDate()), n !== e.getMonth() && e.setDate(0)) : (n = e.getMonth() + t, e.setMonth(n), n > 11 && (n -= 12), n > 0 && e.getMonth() != n && e.setDate(0)), _(e, i)
	}, toDateString: function (e) {
		return e.getFullYear() + "/" + e.getMonth() + "/1"
	} }, { name: "decade", title: function (e) {
		var t = e.getFullYear();
		return t -= t % 10, t + "-" + (t + 9)
	}, content: function (e) {
		var t = e.date.getFullYear(), i = this.toDateString;
		return n({ start: new dt(t - t % 10 - 1, 0, 1), min: new dt(e.min.getFullYear(), 0, 1), max: new dt(e.max.getFullYear(), 0, 1), setter: this.setDate, build: function (e, t) {
			return { value: e.getFullYear(), ns: m.ns, dateString: i(e), cssClass: 0 === t || 11 == t ? G : ""}
		} })
	}, first: function (e) {
		var t = e.getFullYear();
		return new dt(t - t % 10, e.getMonth(), e.getDate())
	}, last: function (e) {
		var t = e.getFullYear();
		return new dt(t - t % 10 + 9, e.getMonth(), e.getDate())
	}, compare: function (e, t) {
		return i(e, t, 10)
	}, setDate: function (e, t) {
		s(e, t, 1)
	}, toDateString: function (e) {
		return e.getFullYear() + "/0/1"
	} }, { name: H, title: function (e) {
		var t = e.getFullYear();
		return t -= t % 100, t + "-" + (t + 99)
	}, content: function (e) {
		var t = e.date.getFullYear(), i = e.min.getFullYear(), r = e.max.getFullYear(), o = this.toDateString;
		return i -= i % 10, r -= r % 10, 10 > r - i && (r = i + 9), n({ start: new dt(t - t % 100 - 10, 0, 1), min: new dt(i, 0, 1), max: new dt(r, 0, 1), setter: this.setDate, build: function (e, t) {
			var n = e.getFullYear();
			return { value: n + " - " + (n + 9), ns: m.ns, dateString: o(e), cssClass: 0 === t || 11 == t ? G : ""}
		} })
	}, first: function (e) {
		var t = e.getFullYear();
		return new dt(t - t % 100, e.getMonth(), e.getDate())
	}, last: function (e) {
		var t = e.getFullYear();
		return new dt(t - t % 100 + 99, e.getMonth(), e.getDate())
	}, compare: function (e, t) {
		return i(e, t, 100)
	}, setDate: function (e, t) {
		s(e, t, 10)
	}, toDateString: function (e) {
		var t = e.getFullYear();
		return t - t % 10 + "/0/1"
	} }] };
	pt.isEqualDatePart = h, pt.makeUnselectable = p, pt.restrictValue = r, pt.isInRange = o, pt.normalize = u, pt.viewsEnum = ct, m.calendar = pt
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		var n = t.parseFormats;
		R.normalize(t), n = e.isArray(n) ? n : [n], n.splice(0, 0, t.format), t.parseFormats = n
	}
	function i(e) {
		e.preventDefault()
	}
	var r = window.kendo, o = r.ui, a = o.Widget, s = r.parseDate, l = r.keys, d = r.template, c = "<div />", u = "<span />", p = ".kendoDatePicker", f = "touchend" + p + " click" + p, h = "open", m = "close", g = "change", v = "dateView", b = "disabled", _ = "k-state-default", x = "k-state-focused", k = "k-state-selected", w = "k-state-disabled", y = "k-state-hover", C = "keydown" + p, T = "mouseenter" + p + " mouseleave" + p, S = "touchstart" + p + " mousedown" + p, A = "id", D = "min", E = "max", F = "month", I = "aria-disabled", P = "aria-expanded", z = "aria-hidden", R = r.calendar, N = R.isInRange, O = R.restrictValue, M = R.isEqualDatePart, H = e.extend, B = e.proxy, L = Date, V = function (t) {
		var n, i = this, a = document.body, s = U.sharedCalendar, l = e(c).attr(z, "true").addClass("k-calendar-container").appendTo(a);
		s || (s = U.sharedCalendar = new o.Calendar(e(c).attr(A, r.guid()).hide().appendTo(a), { focusOnNav: !1 }), R.makeUnselectable(s.element)), i.calendar = s, i.options = t = t || {}, n = t.id, n && (n += "_dateview", l.attr(A, n), i._dateViewID = n), i.popup = new o.Popup(l, H(t.popup, t, { name: "Popup", isRtl: r.support.isRtl(t.anchor) })), i.div = l, i._templates(), i.value(t.value)
	};
	V.prototype = { _calendar: function () {
		var e = this, t = e.popup, n = e.options, r = e.calendar, o = r.element;
		o.data(v) !== e && (o.appendTo(t.element).data(v, e).off(f + " " + C).on(f, "td:has(.k-link)", B(e._click, e)).on(S, i).show(), r.unbind(g).bind(g, n), r.month = e.month, r.options.dates = n.dates, r.options.depth = n.depth, r.options.culture = n.culture, r._footer(e.footer), r.min(n.min), r.max(n.max), r.navigate(e._value, n.start), e.value(e._value))
	}, destroy: function () {
		var n, i = this, r = i.calendar, o = r.element, a = o.data(v);
		(a === t || a === i) && (n = e(".k-calendar-container"), n.length > 1 ? o.hide().appendTo(document.body) : (o.off(p), r.destroy(), U.sharedCalendar = null)), i.popup.destroy()
	}, open: function () {
		var e = this;
		e._calendar(), e.popup.open()
	}, close: function () {
		this.popup.close()
	}, min: function (e) {
		this._option(D, e)
	}, max: function (e) {
		this._option(E, e)
	}, toggle: function () {
		var e = this;
		e[e.popup.visible() ? m : h]()
	}, move: function (e) {
		var n = this, i = e.keyCode, r = n.calendar, o = e.ctrlKey && i == l.DOWN || i == l.ENTER;
		if (i == l.ESC)
			return n.close(), t;
		if (e.altKey)
			return i == l.DOWN ? (n.open(), e.preventDefault()) : i == l.UP && (n.close(), e.preventDefault()), t;
		if (n.popup.visible())
			return o && r._cell.hasClass(k) ? (n.close(), e.preventDefault(), t) : (n._current = r._move(e), t)
	}, value: function (e) {
		var t = this, n = t.calendar, i = t.options;
		t._value = e, t._current = new L(+O(e, i.min, i.max)), n.element.data(v) === t && n.value(e)
	}, _click: function (e) {
		-1 !== e.currentTarget.className.indexOf(k) && this.close()
	}, _option: function (e, t) {
		var n = this, i = n.options, r = n.calendar;
		i[e] = t, r.element.data(v) === n && r[e](t)
	}, _templates: function () {
		var e = this, t = e.options, n = t.footer, i = t.month || {}, o = i.content, a = i.empty;
		e.month = { content: d('<td#=data.cssClass#><a tabindex="-1" class="k-link" href="\\#" ' + r.attr("value") + '="#=data.dateString#" title="#=data.title#">' + (o || "#=data.value#") + "</a></td>", { useWithBlock: !!o }), empty: d("<td>" + (a || "&nbsp;") + "</td>", { useWithBlock: !!a }) }, n !== !1 && (e.footer = d(n || '#= kendo.toString(data,"D","' + t.culture + '") #', { useWithBlock: !1 }))
	} }, V.normalize = n, r.DateView = V;
	var U = a.extend({ init: function (e, t) {
		var i, o = this;
		a.fn.init.call(o, e, t), e = o.element, t = o.options, n(t), o._wrapper(), o.dateView = new V(H({}, t, { id: e.attr(A), anchor: o.wrapper, change: function () {
			o._change(this.value()), o.close()
		}, close: function (t) {
			o.trigger(m) ? t.preventDefault() : (e.attr(P, !1), i.attr(z, !0))
		}, open: function (t) {
			var n, r = o.options;
			o.trigger(h) ? t.preventDefault() : (n = s(e.val(), r.parseFormats, r.culture), n ? (o.dateView._current = n, o.dateView.calendar._focus(n)) : o.dateView.value(n), e.attr(P, !0), i.attr(z, !1))
		} })), i = o.dateView.div, o._icon(), e[0].type = "text", e.addClass("k-input").on("keydown" + p, B(o._keydown, o)).on("blur" + p, B(o._blur, o)).on("focus" + p, function () {
			o._inputWrapper.addClass(x)
		}).attr({ role: "textbox", "aria-haspopup": !0, "aria-expanded": !1, "aria-owns": o.dateView._dateViewID }), o._reset(), o._template(), o.enable(!e.is("[disabled]")), o.value(t.value || o.element.val()), r.notify(o)
	}, events: [h, m, g], options: { name: "DatePicker", value: null, footer: "", format: "", culture: "", parseFormats: [], min: new Date(1900, 0, 1), max: new Date(2099, 11, 31), start: F, depth: F, animation: {}, month: {}, dates: [], ARIATemplate: 'Current focused date is #=kendo.toString(data.current, "D")#' }, setOptions: function (e) {
		var t = this, i = t.dateView, r = i.options;
		a.fn.setOptions.call(t, e), n(t.options), i.options = H(r, t.options, { change: r.change, close: r.close, open: r.open })
	}, enable: function (e) {
		var t = this, n = t._dateIcon.off(p), r = t._inputWrapper.off(p), o = t.element;
		e === !1 ? (r.removeClass(_).addClass(w), o.attr(b, b).attr(I, !0)) : (r.addClass(_).removeClass(w).on(T, t._toggleHover), o.removeAttr(b).attr(I, !1), n.on(f, B(t._click, t)).on(S, i))
	}, destroy: function () {
		var e = this;
		a.fn.destroy.call(e), e.dateView.destroy(), e.element.off(p), e._dateIcon.off(p), e._inputWrapper.off(p), e._form && e._form.off("reset", e._resetHandler)
	}, open: function () {
		this.dateView.open()
	}, close: function () {
		this.dateView.close()
	}, min: function (e) {
		return this._option(D, e)
	}, max: function (e) {
		return this._option(E, e)
	}, value: function (e) {
		var n = this;
		return e === t ? n._value : (n._old = n._update(e), null === n._old && n.element.val(""), t)
	}, _toggleHover: function (t) {
		e(t.currentTarget).toggleClass(y, "mouseenter" === t.type)
	}, _blur: function () {
		var e = this;
		e.close(), e._change(e.element.val()), e._inputWrapper.removeClass(x)
	}, _click: function (e) {
		var t = this, n = t.element;
		t.dateView.toggle(), "click" === e.type && n[0] !== document.activeElement && n.focus()
	}, _change: function (e) {
		var t = this;
		e = t._update(e), +t._old != +e && (t._old = e, t.trigger(g), t.element.trigger(g))
	}, _keydown: function (e) {
		var t = this, n = t.dateView;
		n.popup.visible() || e.keyCode != l.ENTER ? (n.move(e), t._updateARIA(n._current)) : t._change(t.element.val())
	}, _icon: function () {
		var t, n = this, i = n.element;
		t = i.next("span.k-select"), t[0] || (t = e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span></span>').insertAfter(i)), n._dateIcon = t.attr({ role: "button", "aria-controls": n.dateView._dateViewID })
	}, _option: function (e, n) {
		var i = this, r = i.options;
		return n === t ? r[e] : (n = s(n, r.parseFormats, r.culture), n && (r[e] = new L(+n), i.dateView[e](n)), t)
	}, _update: function (e) {
		var t, n = this, i = n.options, o = i.min, a = i.max, l = s(e, i.parseFormats, i.culture);
		return +l === +n._value ? (t = r.toString(l, i.format, i.culture), t !== e && n.element.val(null === l ? e : t), l) : (null !== l && M(l, o) ? l = O(l, o, a) : N(l, o, a) || (l = null), n._value = l, n.dateView.value(l), n.element.val(l ? r.toString(l, i.format, i.culture) : e), n._updateARIA(l), l)
	}, _wrapper: function () {
		var t, n = this, i = n.element;
		t = i.parents(".k-datepicker"), t[0] || (t = i.wrap(u).parent().addClass("k-picker-wrap k-state-default"), t = t.wrap(u).parent()), t[0].style.cssText = i[0].style.cssText, i.css({ width: "100%", height: i[0].style.height }), n.wrapper = t.addClass("k-widget k-datepicker k-header").addClass(i[0].className), n._inputWrapper = e(t[0].firstChild)
	}, _reset: function () {
		var e = this, t = e.element, n = t.closest("form");
		n[0] && (e._resetHandler = function () {
			e.value(t[0].defaultValue)
		}, e._form = n.on("reset", e._resetHandler))
	}, _template: function () {
		this._ariaTemplate = d(this.options.ARIATemplate)
	}, _updateARIA: function (e) {
		this.element.attr("aria-label", this._ariaTemplate({ current: e }))
	} });
	o.plugin(U)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		return n ? t.substring(0, e).split(n).length - 1 : 0
	}
	function i(e, t, i) {
		return t.split(i)[n(e, t, i)]
	}
	function r(e, t, i, r) {
		var o = t.split(r);
		return o.splice(n(e, t, r), 1, i), r && "" !== o[o.length - 1] && o.push(""), o.join(r)
	}
	function o(e) {
		var t = e.value.length;
		y(e, t, t)
	}
	var a = window.kendo, s = a.support, l = s.placeholder, d = a.ui, c = a.keys, u = a.data.DataSource, p = d.List, f = "aria-disabled", h = "k-state-default", m = "disabled", g = "k-state-focused", v = "k-state-selected", b = "k-state-disabled", _ = "k-state-hover", x = ".kendoAutoComplete", k = "mouseenter" + x + " mouseleave" + x, w = p.caret, y = p.selectText, C = e.proxy, T = p.extend({
		init: function (t, n) {
			var i, r = this;
			r.ns = x, n = e.isArray(n) ? { dataSource: n} : n, p.fn.init.call(r, t, n), t = r.element, n = r.options, n.placeholder = n.placeholder || t.attr("placeholder"), l && t.attr("placeholder", n.placeholder), r._wrapper(), r._accessors(), r._dataSource(), t[0].type = "text", i = r.wrapper, r._popup(), t.addClass("k-input").on("keydown" + x, C(r._keydown, r)).on("paste" + x, C(r._search, r)).on("focus" + x, function () {
				r._prev = r._accessor(), r._placeholder(!1), i.addClass(g)
			}).on("blur" + x, function () {
				r._change(), r._placeholder(), i.removeClass(g)
			}).attr({ autocomplete: "off", role: "textbox", "aria-haspopup": !0 }), r._enable(), r._popup(), r._old = r._accessor(), t[0].id && t.attr("aria-owns", r.ul[0].id), r._aria(), r._placeholder(), a.notify(r)
		}, options: { name: "AutoComplete", enable: !0, suggest: !1, template: "", dataTextField: "", minLength: 1, delay: 200, height: 200, filter: "startswith", ignoreCase: !0, highlightFirst: !1, separator: null, placeholder: "", animation: {} }, _dataSource: function () {
			var e = this;
			e.dataSource && e._refreshHandler ? e._unbindDataSource() : e._refreshHandler = C(e.refresh, e), e.dataSource = u.create(e.options.dataSource).bind("change", e._refreshHandler)
		}, setDataSource: function (e) {
			this.options.dataSource = e, this._dataSource()
		}, events: ["open", "close", "change", "select", "dataBinding", "dataBound"], setOptions: function (e) {
			p.fn.setOptions.call(this, e), this._template(), this._accessors(), this._aria()
		}, enable: function (e) {
			var t = this, n = t.element, i = t.wrapper.off(k);
			e === !1 ? (i.removeClass(h).addClass(b), n.attr(m, m).attr(f, !0)) : (i.removeClass(b).addClass(h).on(k, t._toggleHover), n.removeAttr(m).attr(f, !1))
		}, close: function () {
			var e = this;
			e.current(null), e.popup.close()
		}, destroy: function () {
			var e = this;
			e.element.off(x), e.wrapper.off(x), p.fn.destroy.call(e)
		}, refresh: function () {
			var n, i = this, r = i.ul[0], o = i.popup, s = i.options, l = i._data(), d = l.length;
			i.trigger("dataBinding"), r.innerHTML = a.render(i.template, l), i._height(d), o.visible() && o._position(), d && (s.highlightFirst && i.current(e(r.firstChild)), s.suggest && i.suggest(e(r.firstChild))), i._open && (i._open = !1, n = d ? "open" : "close", i._typing && i.element[0] !== document.activeElement && (n = "close"), o[n](), i._typing = t), i._touchScroller && i._touchScroller.reset(), i._makeUnselectable(), i.trigger("dataBound")
		}, select: function (e) {
			this._select(e)
		}, search: function (e) {
			var t, n = this, r = n.options, o = r.ignoreCase, a = r.separator;
			e = e || n._accessor(), n._current = null, clearTimeout(n._typing), a && (e = i(w(n.element[0]), e, a)), t = e.length, t ? t >= n.options.minLength && (n._open = !0, n.dataSource.filter({ value: o ? e.toLowerCase() : e, operator: r.filter, field: r.dataTextField, ignoreCase: o })) : n.popup.close()
		}, suggest: function (e) {
			var i, r = this, o = r._last, a = r._accessor(), s = r.element[0], l = w(s), d = r.options.separator, u = a.split(d), f = n(l, a, d), h = l;
			return o == c.BACKSPACE || o == c.DELETE ? (r._last = t, t) : (e = e || "", "string" != typeof e && (i = p.inArray(e[0], r.ul[0]), e = i > -1 ? r._text(r._data()[i]) : ""), 0 >= l && (l = a.toLowerCase().indexOf(e.toLowerCase()) + 1), i = a.substring(0, l).lastIndexOf(d), i = i > -1 ? l - (i + d.length) : l, a = u[f].substring(0, i), e && (i = e.toLowerCase().indexOf(a.toLowerCase()), i > -1 && (e = e.substring(i + a.length), h = l + e.length, a += e), d && "" !== u[u.length - 1] && u.push("")), u[f] = a, r._accessor(u.join(d || "")), y(s, l, h), t)
		}, value: function (e) {
			return e === t ? this._accessor() : (this._accessor(e), this._old = e, t)
		}, _accessor: function (e) {
			var n = this, i = n.element[0];
			return e === t ? (e = i.value, i.className.indexOf("k-readonly") > -1 ? e === n.options.placeholder ? "" : e : e) : (i.value = null === e ? "" : e, n._placeholder(), t)
		}, _accept: function (e) {
			var t = this;
			t._focus(e), o(t.element[0])
		}, _keydown: function (t) {
			var n = this, i = n.ul[0], r = t.keyCode, o = n._current, a = n.popup.visible();
			n._last = r, r === c.DOWN ? (a && n._move(o ? o.next() : e(i.firstChild)), t.preventDefault()) : r === c.UP ? (a && n._move(o ? o.prev() : e(i.lastChild)), t.preventDefault()) : r === c.ENTER || r === c.TAB ? (r === c.ENTER && n.popup.visible() && t.preventDefault(), n._accept(o)) : r === c.ESC ? (n.popup.visible() && t.preventDefault(), n.close()) : n._search()
		}, _move: function (e) {
			var t = this;
			e = e[0] ? e : null, t.current(e), t.options.suggest && t.suggest(e)
		}, _placeholder: function (e) {
			if (!l) {
				var n, i = this, r = i.element, o = i.options.placeholder;
				if (o) {
					if (n = r.val(), e === t && (e = !n), e || (o = n !== o ? n : ""), n === i._old && !e)
						return;
					r.toggleClass("k-readonly", e).val(o)
				}
			}
		}, _search: function () {
			var e = this;
			clearTimeout(e._typing), e._typing = setTimeout(function () {
				e._prev !== e._accessor() && (e._prev = e._accessor(), e.search())
			}, e.options.delay)
		}, _select: function (t) {
			var n, i, o = this, a = o.options.separator, s = o._data();
			t = e(t), t[0] && !t.hasClass(v) && (i = p.inArray(t[0], o.ul[0]), i > -1 && (s = s[i], n = o._text(s), a && (n = r(w(o.element[0]), o._accessor(), n, a)), o._accessor(n), o.current(t.addClass(v))))
		}, _toggleHover: function (t) {
			e(t.currentTarget).toggleClass(_, "mouseenter" === t.type)
		}, _wrapper: function () {
			var e, t = this, n = t.element, i = n[0];
			e = n.parent(), e.is("span.k-widget") || (e = n.wrap("<span />").parent()), e.attr("tabindex", -1), e.attr("role", "presentation"), e[0].style.cssText = i.style.cssText, n.css({ width: "100%", height: i.style.height }), t._focused = t.element, t.wrapper = e.addClass("k-widget k-autocomplete k-header").addClass(i.className)
		}
	});
	d.plugin(T)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		for (var i, r = 0, o = t.length - 1; o > r; ++r)
			i = t[r], i in e || (e[i] = {}), e = e[i];
		e[t[o]] = n
	}
	var i = window.kendo, r = i.ui, o = r.Select, a = i.support.mobileOS, s = ".kendoDropDownList", l = "disabled", d = "change", c = "select", u = "k-state-focused", p = "k-state-default", f = "k-state-disabled", h = "k-state-selected", m = "mouseenter" + s + " mouseleave" + s, g = e.proxy, v = o.extend({ init: function (n, r) {
		var a, l, d, u = this, p = r && r.index;
		u.ns = s, r = e.isArray(r) ? { dataSource: r} : r, o.fn.init.call(u, n, r), u._focusHandler = function () {
			u.wrapper.focus()
		}, r = u.options, n = u.element.on("focus" + s, u._focusHandler), u._reset(), u._word = "", u._wrapper(), u._tabindex(), u._aria(), u._span(), u._popup(), u._mobile(), u._accessors(), u._dataSource(), u._enable(), u._cascade(), u.selectedIndex = -1, p !== t && (r.index = p), r.autoBind ? u.dataSource.fetch() : (d = r.text, d || (a = u._optionLabelText(r.optionLabel), l = a && 0 === r.index, n.is(c) ? d = l ? a : n.children(":selected").text() : !n[0].value && l && (d = a)), u.text(d)), i.notify(u)
	}, options: { name: "DropDownList", enable: !0, index: 0, autoBind: !0, text: "", template: "", delay: 500, height: 200, dataTextField: "", dataValueField: "", optionLabel: "", cascadeFrom: "", ignoreCase: !0, animation: {} }, events: ["open", "close", d, "select", "dataBinding", "dataBound", "cascade"], setOptions: function (e) {
		o.fn.setOptions.call(this, e), this._template(), this._accessors(), this._aria()
	}, destroy: function () {
		var e = this;
		e.wrapper.off(s), e.element.off(s), e._inputWrapper.off(s), o.fn.destroy.call(e)
	}, enable: function (e) {
		var t = this, n = t.element, i = t.wrapper.off(s), r = t._inputWrapper.off(m);
		e === !1 ? (n.attr(l, l), r.removeClass(p).addClass(f)) : (n.removeAttr(l, l), r.addClass(p).removeClass(f).on(m, t._toggleHover), i.on("touchend" + s + " click" + s, function (e) {
			t._blured = !1, e.preventDefault(), t.toggle()
		}).on("keydown" + s, g(t._keydown, t)).on("keypress" + s, g(t._keypress, t)).on("focusin" + s, function () {
			r.addClass(u), t._blured = !1
		}).on("focusout" + s, function () {
			t._blured || (t._blur(), r.removeClass(u), t._blured = !0, n.blur())
		}))
	}, open: function () {
		var e = this;
		e.ul[0].firstChild ? (e.popup.open(), e._scroll(e._current)) : (e._open = !0, e._request || e.dataSource.fetch())
	}, toggle: function (e) {
		this._toggle(e)
	}, refresh: function () {
		var e = this, t = e._data(), n = t.length, r = e.options.optionLabel;
		e.trigger("dataBinding"), e._current && e.current(null), e.ul[0].innerHTML = i.render(e.template, t), e._height(n), e.popup.visible() && e.popup._position(), e.element.is(c) && (r && n && (r = e._optionLabelText(r), r = '<option value="">' + r + "</option>"), e._options(t, r)), e._open && (e._open = !1, e.toggle(!!n)), e._hideBusy(), e._makeUnselectable(), !e._fetch && n && e._selectItem(), e._bound = !0, e.trigger("dataBound")
	}, search: function (e) {
		if (e) {
			var n = this, i = n.options.ignoreCase;
			i && (e = e.toLowerCase()), n._select(function (r) {
				var o = n._text(r);
				return o !== t ? (o += "", i && (o = o.toLowerCase()), 0 === o.indexOf(e)) : t
			})
		}
	}, text: function (e) {
		var n = this.span;
		return e === t ? n.text() : (n.text(e), t)
	}, value: function (e) {
		var n, i, r = this;
		return e === t ? r._accessor() : (null !== e && (e = "" + e), r._selectedValue = e, i = e || r.options.optionLabel && !r.element[0].disabled && "" === e, i && r._fetchItems(e) || (n = r._index(e), r.select(n > -1 ? n : 0)), t)
	}, _accept: function (e) {
		this._focus(e)
	}, _optionLabelText: function () {
		var e = this.options, t = e.dataTextField, n = e.optionLabel;
		return n && t && "object" == typeof n ? this._text(n) : n
	}, _data: function () {
		var e = this, t = e.options, r = t.optionLabel, o = t.dataTextField, a = t.dataValueField, s = e.dataSource.view(), l = s.length, d = r, c = 0;
		if (r && l) {
			for ("object" == typeof r ? d = r : o && (d = {}, o = o.split("."), a = a.split("."), n(d, a, ""), n(d, o, r)), d = new i.data.ObservableArray([d]); l > c; c++)
				d.push(s[c]);
			s = d
		}
		return s
	}, _keydown: function (e) {
		var t = this, n = e.keyCode, r = i.keys, o = t.ul[0];
		n === r.LEFT ? n = r.UP : n === r.RIGHT && (n = r.DOWN), e.keyCode = n, t._move(e), n === r.HOME ? (e.preventDefault(), t._select(o.firstChild)) : n === r.END && (e.preventDefault(), t._select(o.lastChild))
	}, _keypress: function (e) {
		var t = this;
		setTimeout(function () {
			t._word += String.fromCharCode(e.keyCode || e.charCode), t._search()
		})
	}, _popup: function () {
		o.fn._popup.call(this), this.popup.one("open", function () {
			this.wrapper = i.wrap(this.element).addClass("km-popup")
		})
	}, _search: function () {
		var e = this;
		clearTimeout(e._typing), e._typing = setTimeout(function () {
			e._word = ""
		}, e.options.delay), e.search(e._word)
	}, _select: function (e) {
		var n, i, o, a = this, s = a._current, l = a._data();
		e = a._get(e), e && e[0] && !e.hasClass(h) && (s && s.removeClass(h), o = r.List.inArray(e[0], a.ul[0]), o > -1 && (l = l[o], i = a._text(l), n = a._value(l), a.selectedIndex = o, a.text(i), a._accessor(n !== t ? n : i, o), a._selectedValue = a._accessor(), a.current(e.addClass(h)), a._optionID && a._current.attr("aria-selected", !0)))
	}, _mobile: function () {
		var e = this, t = e.popup, n = t.element.parents(".km-root").eq(0);
		n.length && a && (t.options.animation.open.effects = a.android || a.meego ? "fadeIn" : a.ios ? "slideIn:up" : t.options.animation.open.effects)
	}, _span: function () {
		var t, n = this, i = n.wrapper, r = "span.k-input";
		t = i.find(r), t[0] || (i.append('<span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">&nbsp;</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>').append(n.element), t = i.find(r)), n.span = t, n._inputWrapper = e(i[0].firstChild), n._arrow = i.find(".k-icon").mousedown(function (e) {
			e.preventDefault()
		})
	}, _wrapper: function () {
		var e, t = this, n = t.element, i = n[0];
		e = n.parent(), e.is("span.k-widget") || (e = n.wrap("<span />").parent(), e[0].style.cssText = i.style.cssText), n.hide(), t._focused = t.wrapper = e.addClass("k-widget k-dropdown k-header").addClass(i.className).css("display", "").attr({ unselectable: "on", role: "listbox", "aria-haspopup": !0, "aria-expanded": !1 })
	}, _clearSelection: function () {
		var e = this, n = e.options.optionLabel;
		return e.dataSource.view()[0] && n ? (e.select(0), t) : (e.text(n), e.element.val(""), e.selectedIndex = -1, t)
	} });
	r.plugin(v)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.ui, r = i.List, o = i.Select, a = n.support, s = a.placeholder, l = o.removeFiltersForField, d = n.keys, c = ".kendoComboBox", u = "touchend" + c + " click" + c, p = "disabled", f = "change", h = "k-state-default", m = "k-state-disabled", g = "k-state-focused", v = "mousedown" + c + " touchstart" + c, b = "select", _ = "aria-disabled", x = "k-state-selected", k = "filter", w = "accept", y = "rebind", C = "mouseenter" + c + " mouseleave" + c, T = null, S = e.proxy, A = o.extend({ init: function (t, i) {
		var r, a, s = this;
		s.ns = c, i = e.isArray(i) ? { dataSource: i} : i, o.fn.init.call(s, t, i), s._focusHandler = function () {
			s.input.focus()
		}, i = s.options, t = s.element.on("focus" + c, s._focusHandler), i.placeholder = i.placeholder || t.attr("placeholder"), s._reset(), s._wrapper(), s._input(), s._popup(), s._accessors(), s._dataSource(), s._enable(), s._cascade(), r = s._inputWrapper, s.input.on("keydown" + c, S(s._keydown, s)).on("focus" + c, function () {
			r.addClass(g), s._placeholder(!1)
		}).on("blur" + c, function () {
			r.removeClass(g), clearTimeout(s._typing), s.options.text !== s.input.val() && s.text(s.text()), s._placeholder(), s._blur(), t.blur()
		}).attr({ role: "combobox", "aria-expanded": !1 }), s._aria(), s._oldIndex = s.selectedIndex = -1, s._old = i.value || s._accessor(), i.autoBind ? s._filterSource() : (a = i.text, !a && t.is(b) && (a = t.children(":selected").text()), a && s.input.val(a)), a || s._placeholder(), n.notify(s)
	}, options: { name: "ComboBox", enable: !0, index: -1, autoBind: !0, delay: 200, dataTextField: "", dataValueField: "", minLength: 0, height: 200, highlightFirst: !0, template: "", filter: "none", placeholder: "", suggest: !1, ignoreCase: !0, animation: {} }, events: ["open", "close", f, "select", "dataBinding", "dataBound", "cascade"], setOptions: function (e) {
		o.fn.setOptions.call(this, e), this._template(), this._accessors(), this._aria()
	}, current: function (e) {
		var n = this, i = n._current;
		return e === t ? i : (i && i.removeClass(x), o.fn.current.call(n, e), t)
	}, destroy: function () {
		var e = this;
		e.input.off(c), e.element.off(c), e._inputWrapper.off(c), o.fn.destroy.call(e)
	}, enable: function (e) {
		var t = this, n = t.input.add(t.element), i = t._inputWrapper.off(C), r = t._arrow.parent().off(u + " " + v);
		e === !1 ? (i.removeClass(h).addClass(m), n.attr(p, p).attr(_, !0)) : (i.removeClass(m).addClass(h).on(C, t._toggleHover), n.removeAttr(p).attr(_, !1), r.on(u, function () {
			t.toggle()
		}).on(v, function (e) {
			e.preventDefault()
		}))
	}, open: function () {
		var e = this, t = e.dataSource.options.serverFiltering;
		e.popup.visible() || (!e.ul[0].firstChild || e._state === w && !t ? (e._open = !0, e._state = y, e._filterSource()) : (e.popup.open(), e._scroll(e._current)))
	}, refresh: function () {
		var i, r, o, a = this, s = a.ul[0], l = a.options, d = a._state, c = a._data(), u = c.length;
		a.trigger("dataBinding"), s.innerHTML = n.render(a.template, c), a._height(u), a.popup.visible() && a.popup._position(), a.element.is(b) && (d === y && (a._state = "", i = a.value()), o = a._option, a._option = t, a._options(c), o && o[0].selected && a._custom(o.val())), u && (l.highlightFirst && a.current(e(s.firstChild)), l.suggest && a.input.val() && a._request !== t && a.suggest(e(s.firstChild))), d === k || a._fetch || a._selectItem(), a._open && (a._open = !1, r = !!u, a._typing && a.input[0] !== document.activeElement && (r = !1), a.toggle(r), a._typing = t), a._touchScroller && a._touchScroller.reset(), a._makeUnselectable(), a._hideBusy(), a._bound = !0, a.trigger("dataBound")
	}, search: function (e) {
		e = "string" == typeof e ? e : this.text();
		var t = this, n = e.length, i = t.options, r = i.ignoreCase, o = i.filter, a = i.dataTextField;
		clearTimeout(t._typing), n >= i.minLength && (t._state = k, "none" === o ? t._filter(e) : (t._open = !0, t._filterSource({ value: r ? e.toLowerCase() : e, field: a, operator: o, ignoreCase: r })))
	}, suggest: function (e) {
		var n, i = this, o = i.input[0], a = i.text(), s = r.caret(o), l = i._last;
		return l == d.BACKSPACE || l == d.DELETE ? (i._last = t, t) : (e = e || "", "string" != typeof e && (n = r.inArray(e[0], i.ul[0]), e = n > -1 ? i._text(i.dataSource.view()[n]) : ""), 0 >= s && (s = a.toLowerCase().indexOf(e.toLowerCase()) + 1), e ? (n = e.toLowerCase().indexOf(a.toLowerCase()), n > -1 && (a += e.substring(n + a.length))) : a = a.substring(0, s), a.length === s && e || (o.value = a, r.selectText(o, s, a.length)), t)
	}, text: function (e) {
		e = null === e ? "" : e;
		var n, i = this, r = i._text, o = i.input[0], a = i.options.ignoreCase, s = e;
		return e === t ? o.value : (n = i.dataItem(), n && r(n) === e || (a && (s = s.toLowerCase()), i._select(function (e) {
			return e = r(e), a && (e = (e + "").toLowerCase()), e === s
		}), 0 > i.selectedIndex && (i._custom(e), o.value = e), i._triggerCascade()), t)
	}, toggle: function (e) {
		var t = this;
		t._toggle(e)
	}, value: function (e) {
		var n, i = this;
		return e === t ? i._accessor() : (null !== e && (e = "" + e), i._selectedValue = e, !i._open && e && i._fetchItems(e) || (n = i._index(e), n > -1 ? i.select(n) : (i.current(T), i._custom(e), i.text(e), i._placeholder()), i._prev = i._old = i._accessor(), i._oldIndex = i.selectedIndex), t)
	}, _accept: function (e) {
		var t = this;
		e && t.popup.visible() ? t._focus(e) : (t.text(t.text()), t._change())
	}, _custom: function (t) {
		var n = this, i = n.element, r = n._option;
		n._state === k && (n._state = w), i.is(b) ? (r || (r = n._option = e("<option/>"), i.append(r)), r.text(t), r[0].selected = !0) : i.val(t), n._selectedValue = t
	}, _filter: function (e) {
		var n = this, i = n.options, r = n.dataSource, o = i.ignoreCase, a = function (i) {
			var r = n._text(i);
			return r !== t ? (r += "", "" !== r && "" === e ? !1 : (o && (r = r.toLowerCase()), 0 === r.indexOf(e))) : t
		};
		return o && (e = e.toLowerCase()), n.ul[0].firstChild ? (-1 !== n._highlight(a) && (i.suggest && n._current && n.suggest(n._current), n.open()), n._hideBusy(), t) : (r.one(f, function () {
			r.data()[0] && n.search(e)
		}).fetch(), t)
	}, _highlight: function (n) {
		var i, o = this;
		return n === t || null === n ? -1 : (n = o._get(n), i = r.inArray(n[0], o.ul[0]), -1 == i && (n = o.options.highlightFirst && !o.text() ? e(o.ul[0].firstChild) : T), o.current(n), i)
	}, _input: function () {
		var t, n, i = this, r = i.element.removeClass("k-input")[0], o = r.tabIndex, a = r.accessKey, l = i.wrapper, d = "input.k-input", c = r.name || "";
		c && (c = 'name="' + c + '_input" '), t = l.find(d), t[0] || (l.append('<span tabindex="-1" unselectable="on" class="k-dropdown-wrap k-state-default"><input ' + c + 'class="k-input" type="text" autocomplete="off"/><span tabindex="-1" unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>').append(i.element), t = l.find(d)), n = t[0], n.tabIndex = o, n.style.cssText = r.style.cssText, r.maxLength > -1 && (n.maxLength = r.maxLength), t.addClass(r.className).val(r.value).css({ width: "100%", height: r.style.height }).show(), s && t.attr("placeholder", i.options.placeholder), a && (r.accessKey = "", t[0].accessKey = a), i._focused = i.input = t, i._inputWrapper = e(l[0].firstChild), i._arrow = l.find(".k-icon").attr({ role: "button", tabIndex: -1 }), r.id && i._arrow.attr("aria-controls", i.ul[0].id)
	}, _keydown: function (e) {
		var t = this, n = e.keyCode;
		t._last = n, clearTimeout(t._typing), n == d.TAB || t._move(e) || t._search()
	}, _placeholder: function (e) {
		if (!s) {
			var n, i = this, r = i.input, o = i.options.placeholder;
			if (o) {
				if (n = i.value(), e === t && (e = !n), r.toggleClass("k-readonly", e), !e) {
					if (n)
						return;
					o = ""
				}
				r.val(o)
			}
		}
	}, _search: function () {
		var e = this;
		e._typing = setTimeout(function () {
			var t = e.text();
			e._prev !== t && (e._prev = t, e.search(t))
		}, e.options.delay)
	}, _select: function (e) {
		var n, i, r = this, o = r._data(), a = r._highlight(e);
		r.selectedIndex = a, -1 !== a && (r._state === k && (r._state = w), r._current.addClass(x), o = o[a], n = r._text(o), i = r._value(o), r._prev = r.input[0].value = n, r._accessor(i !== t ? i : n, a), r._selectedValue = r._accessor(), r._placeholder(), r._optionID && r._current.attr("aria-selected", !0))
	}, _filterSource: function (e) {
		var t = this, n = t.options, i = t.dataSource, r = i.filter() || {};
		l(r, n.dataTextField), e && (r = r.filters || [], r.push(e)), i.filter(r)
	}, _wrapper: function () {
		var e = this, t = e.element, n = t.parent();
		n.is("span.k-widget") || (n = t.hide().wrap("<span />").parent(), n[0].style.cssText = t[0].style.cssText), e.wrapper = n.addClass("k-widget k-combobox k-header").addClass(t[0].className).css("display", "")
	}, _clearSelection: function (e, t) {
		var n = this, i = e._selectedValue || e.value(), r = i && -1 === e.selectedIndex;
		(t || !i || r) && n.value("")
	} });
	i.plugin(A)
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		return e.trim(t).replace(/&nbsp;/gi, "")
	}
	var i = window.kendo, r = i.ui, o = e.proxy, a = e.extend, s = e.grep, l = e.map, d = e.inArray, c = "k-state-selected", u = "asc", p = "desc", f = "change", h = "kendoPopup", m = "kendoFilterMenu", g = "kendoMenu", v = ".kendoColumnMenu", b = /(\[|\]|\$|\.|\:|\+)/g, _ = r.Widget, x = _.extend({ init: function (t, n) {
		var r, a = this;
		_.fn.init.call(a, t, n), t = a.element, n = a.options, a.owner = n.owner, a.dataSource = n.dataSource, a.field = t.attr(i.attr("field")), r = t.find(".k-header-column-menu"), r[0] || (r = t.prepend('<a class="k-header-column-menu" href="#"><span class="k-icon k-i-arrowhead-s"/></a>').find(".k-header-column-menu")), a.link = r.attr("tabindex", -1).on("click" + v, o(a._click, a)), a.wrapper = e('<div class="k-column-menu"/>'), a.wrapper.html(i.template(k)({ ns: i.ns, messages: n.messages, sortable: n.sortable, filterable: n.filterable, columns: a._ownerColumns(), showColumns: n.columns })), a.popup = a.wrapper[h]({ anchor: r, open: o(a._open, a), activate: o(a._activate, a), close: a.options.closeCallback }).data(h), a._menu(), a._sort(), a._columns(), a._filter()
	}, options: { name: "ColumnMenu", messages: { sortAscending: "Sort Ascending", sortDescending: "Sort Descending", filter: "Filter", columns: "Columns" }, columns: !0, sortable: !0, filterable: !0 }, destroy: function () {
		var e = this;
		_.fn.destroy.call(e), e.filterMenu && e.filterMenu.destroy(), e.dataSource.unbind("refresh", e._refreshHandler), e.options.columns && (e.owner.unbind("columnShow", e._updateColumnsMenuHandler), e.owner.unbind("columnHide", e._updateColumnsMenuHandler)), e.menu.element.off(v), e.menu.destroy(), e.wrapper.off(v), e.popup.destroy(), e.link.off(v)
	}, close: function () {
		this.menu.close(), this.popup.close(), this.popup.element.off("keydown" + v)
	}, _click: function (e) {
		e.preventDefault(), e.stopPropagation(), this.popup.toggle()
	}, _open: function () {
		var t = this;
		e(".k-column-menu").not(t.wrapper).each(function () {
			e(this).data(h).close()
		}), t.popup.element.on("keydown" + v, function (e) {
			e.keyCode == i.keys.ESC && t.close()
		})
	}, _activate: function () {
		this.menu.element.focus()
	}, _ownerColumns: function () {
		var e = this.owner.columns, t = s(e, function (e) {
			var t = !0, i = n(e.title || "");
			return (e.menu === !1 || !e.field && !i.length) && (t = !1), t
		});
		return l(t, function (t) {
			return { field: t.field || t.title, title: t.title || t.field, hidden: t.hidden, index: d(t, e)}
		})
	}, _menu: function () {
		this.menu = this.wrapper.children()[g]({ orientation: "vertical", closeOnClick: !1 }).data(g)
	}, _sort: function () {
		var t = this;
		t.options.sortable && (t.refresh(), t._refreshHandler = o(t.refresh, t), t.dataSource.bind(f, t._refreshHandler), t.menu.element.on("click" + v, ".k-sort-asc, .k-sort-desc", function () {
			var n = e(this), i = n.hasClass("k-sort-asc") ? u : p;
			n.parent().find(".k-sort-" + (i == u ? p : u)).removeClass(c), t._sortDataSource(n, i), t.close()
		}))
	}, _sortDataSource: function (e, n) {
		var i, r, o = this, a = o.options.sortable, s = o.dataSource, l = s.sort() || [];
		if (e.hasClass(c) && a && a.allowUnsort !== !1 ? (e.removeClass(c), n = t) : e.addClass(c), a === !0 || "single" === a.mode)
			l = [{ field: o.field, dir: n}];
		else {
			for (i = 0, r = l.length; r > i; i++)
				if (l[i].field === o.field) {
					l.splice(i, 1);
					break
				}
			l.push({ field: o.field, dir: n })
		}
		s.sort(l)
	}, _columns: function () {
		var t = this;
		t.options.columns && (t._updateColumnsMenu(), t._updateColumnsMenuHandler = o(t._updateColumnsMenu, t), t.owner.bind(["columnHide", "columnShow"], t._updateColumnsMenuHandler), t.menu.bind("select", function (n) {
			var r, o, a, l, c = e(n.item), u = t.owner.columns;
			c.parent().closest("li.k-columns-item")[0] && (r = c.find(":checkbox"), r.attr("disabled") || (l = r.attr(i.attr("field")), a = s(u, function (e) {
				return e.field == l || e.title == l
			})[0], o = d(a, u), a.hidden === !0 ? t.owner.showColumn(o) : t.owner.hideColumn(o)))
		}))
	}, _updateColumnsMenu: function () {
		var e = "[" + i.attr("field") + "=", t = this._ownerColumns(), n = l(t, function (t) {
			return e + t.field.replace(b, "\\$1") + "]"
		}).join(","), r = s(t, function (e) {
			return !e.hidden
		}), o = l(r, function (t) {
			return e + t.field.replace(b, "\\$1") + "]"
		}).join(",");
		this.wrapper.find(n).attr("checked", !1), this.wrapper.find(o).attr("checked", !0).attr("disabled", 1 == r.length)
	}, _filter: function () {
		var e = this, t = e.options;
		t.filterable !== !1 && (e.filterMenu = e.wrapper.find(".k-filterable")[m](a(!0, {}, { appendToElement: !0, dataSource: t.dataSource, values: t.values, field: e.field }, t.filterable)).data(m))
	}, refresh: function () {
		var e, t, n, i = this, r = i.options.dataSource.sort() || [], o = i.field;
		for (i.wrapper.find(".k-sort-asc, .k-sort-desc").removeClass(c), t = 0, n = r.length; n > t; t++)
			e = r[t], o == e.field && i.wrapper.find(".k-sort-" + e.dir).addClass(c)
	} }), k = '<ul>#if(sortable){#<li class="k-item k-sort-asc"><span class="k-link"><span class="k-sprite k-i-sort-asc"></span>${messages.sortAscending}</span></li><li class="k-item k-sort-desc"><span class="k-link"><span class="k-sprite k-i-sort-desc"></span>${messages.sortDescending}</span></li>#if(showColumns || filterable){#<li class="k-separator"></li>#}##}##if(showColumns){#<li class="k-item k-columns-item"><span class="k-link"><span class="k-sprite k-i-columns"></span>${messages.columns}</span><ul>#for (var col in columns) {#<li><input type="checkbox" data-#=ns#field="#=columns[col].field#" data-#=ns#index="#=columns[col].index#"/>#=columns[col].title#</li>#}#</ul></li>#if(filterable){#<li class="k-separator"></li>#}##}##if(filterable){#<li class="k-item k-filter-item"><span class="k-link"><span class="k-sprite k-filter"></span>${messages.filter}</span><ul><li><div class="k-filterable"></div></li></ul></li>#}#</ul>';
	r.plugin(x)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		return Array(e + 1).join('<td class="k-group-cell">&nbsp;</td>')
	}
	function i(e) {
		var t, n = " ";
		if (e) {
			if (typeof e === ut)
				return e;
			for (t in e)
				n += t + '="' + e[t] + '"'
		}
		return n
	}
	function r(t) {
		var n = 0;
		return e("> .k-grouping-header, > .k-grid-toolbar", t).each(function () {
			n += this.offsetHeight
		}), n
	}
	function o(t, n) {
		e("th, th .k-grid-filter, th .k-link", t).add(document.body).css("cursor", n)
	}
	function a(e) {
		var t, n, i = {}, r = {};
		if (!z(e))
			for (E(e) || (e = [e]), t = 0, n = e.length; n > t; t++)
				i[e[t].aggregate] = 0, r[e[t].field] = i;
		return r
	}
	function s(e, t, n) {
		var i = e.eq(t), r = e.eq(n);
		i[t > n ? "insertBefore" : "insertAfter"](r)
	}
	function l(e, t, n) {
		var i, r, o, a;
		for (n = E(n) ? n : [n], i = 0, r = n.length; r > i; i++)
			o = n[i], T(o) && o.click && (a = o.name || o.text, t.on(st + q, "a.k-grid-" + (a || "").replace(/\s/g, ""), { commandName: a }, I(o.click, e)))
	}
	function d(e) {
		return D(e, function (e) {
			return !e.hidden
		})
	}
	function c(e) {
		e = e || {};
		var t = e.style;
		return t ? (t = t.replace(/((.*)?display)(.*)?:([^;]*)/i, "$1:none"), t === e.style && (t = t.replace(/(.*)?/i, "display:none;$1"))) : t = "display:none", S({}, e, { style: t })
	}
	function u(e) {
		e = e || {};
		var t = e.style;
		return t && (e.style = t.replace(/(display\s*:\s*none\s*;?)*/gi, "")), e
	}
	function p(t, n, i, r) {
		var o, a = t.find(">colgroup"), s = A(n, function (e) {
			return o = e.width, o && 0 !== parseInt(o, 10) ? b.format('<col style="width:{0}"/>', typeof o === ut ? o : o + "px") : "<col />"
		});
		(i || a.find(".k-hierarchy-col").length) && s.splice(0, 0, '<col class="k-hierarchy-col" />'), a.length && a.remove(), a = e("<colgroup/>").append(e(Array(r + 1).join('<col class="k-group-col">') + s.join(""))), t.prepend(a)
	}
	function f(e) {
		var t, n, i, r = {};
		for (n = 0, i = e.length; i > n; n++)
			t = e[n], r[t.value] = t.text;
		return r
	}
	function h(e, t, n) {
		var i = n && n.length && T(n[0]) && "value" in n[0], r = i ? f(n)[e] : e;
		return r = null != r ? r : "", t ? b.format(t, r) : r
	}
	function m(e, t, n) {
		for (var i = 0, r = e[i]; r;) {
			if ((n || "none" != r.style.display) && !vt.test(r.className)) {
				e[t + i].style.display = n ? "" : "none";
				break
			}
			r = e[++i]
		}
	}
	function g(e, t) {
		var n, i, r;
		if (typeof e === ut && e === t)
			return e;
		if (T(e) && e.name === t)
			return e;
		if (E(e))
			for (n = 0, i = e.length; i > n; n++)
				if (r = e[n], typeof r === ut && r === t || r.name === t)
					return r;
		return null
	}
	function v(t) {
		var n = e(t.currentTarget), i = n.closest("table")[0];
		(i === this.table[0] || i === this.thead.parent()[0]) && (this.current(n), (n.is("th") || !e(t.target).is(":button,a,:input,a>.k-icon,textarea,span.k-icon,.k-input")) && setTimeout(function () {
			i.focus()
		}), n.is("th") && t.preventDefault())
	}
	var b = window.kendo, _ = b.ui, x = b.data.DataSource, k = _.Groupable, w = b.support.tbodyInnerHtml, y = _.Widget, C = b.keys, T = e.isPlainObject, S = e.extend, A = e.map, D = e.grep, E = e.isArray, F = e.inArray, I = e.proxy, P = e.isFunction, z = e.isEmptyObject, R = Math, N = "progress", O = "error", M = ":not(.k-group-cell):not(.k-hierarchy-cell):visible", H = "tbody>tr:not(.k-grouping-row):not(.k-detail-row):not(.k-group-footer) > td:not(.k-group-cell):not(.k-hierarchy-cell)", B = "tr:not(.k-footer-template):visible", L = ":not(.k-group-cell):not(.k-hierarchy-cell):visible", V = B + ":first>" + L + ":first", U = "th.k-header:not(.k-group-cell,.k-hierarchy-cell)", j = U + ":visible[" + b.attr("field") + "]", W = U + "[" + b.attr("field") + "]", q = ".kendoGrid", G = "edit", $ = "save", Y = "remove", Q = "detailInit", K = "change", X = "columnHide", J = "columnShow", Z = "saveChanges", et = "dataBound", tt = "detailExpand", nt = "detailCollapse", it = "k-state-focused", rt = "k-state-selected", ot = "columnResize", at = "columnReorder", st = "click", lt = "height", dt = "tabIndex", ct = "function", ut = "string", pt = "Are you sure you want to delete this record?", ft = /(\}|\#)/gi, ht = 3, mt = /#/gi, gt = "[\\x20\\t\\r\\n\\f]", vt = RegExp("(^|" + gt + ")" + "(k-group-cell|k-hierarchy-cell)" + "(" + gt + "|$)"), bt = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>', _t = !1, xt = y.extend({ init: function (e, t) {
		var n = this;
		y.fn.init.call(n, e, t), n._refreshHandler = I(n.refresh, n), n.setDataSource(t.dataSource), n.wrap()
	}, setDataSource: function (e) {
		var t = this;
		t.dataSource && t.dataSource.unbind(K, t._refreshHandler), t.dataSource = e, t.dataSource.bind(K, t._refreshHandler)
	}, options: { name: "VirtualScrollable", itemHeight: e.noop }, destroy: function () {
		var e = this;
		y.fn.destroy.call(e), e.dataSource.unbind(K, e._refreshHandler), e.wrapper.add(e.verticalScrollbar).off(q), e.drag && e.drag.destroy()
	}, wrap: function () {
		var t, n = this, i = b.support.scrollbar() + 1, r = n.element;
		r.css({ width: "auto", overflow: "hidden" }).css(_t ? "padding-left" : "padding-right", i), n.content = r.children().first(), t = n.wrapper = n.content.wrap('<div class="k-virtual-scrollable-wrap"/>').parent().bind("DOMMouseScroll" + q + " mousewheel" + q, I(n._wheelScroll, n)), b.support.kineticScrollNeeded && (n.drag = new b.UserEvents(n.wrapper, { global: !0, move: function (e) {
			n.verticalScrollbar.scrollTop(n.verticalScrollbar.scrollTop() - e.y.delta), t.scrollLeft(t.scrollLeft() - e.x.delta), e.preventDefault()
		} })), n.verticalScrollbar = e('<div class="k-scrollbar k-scrollbar-vertical" />').css({ width: i }).appendTo(r).bind("scroll" + q, I(n._scroll, n))
	}, _wheelScroll: function (e) {
		var n, i = this, r = i.verticalScrollbar.scrollTop(), o = e.originalEvent, a = o.wheelDeltaY;
		o.wheelDelta ? (a === t || a) && (n = o.wheelDelta) : o.detail && o.axis === o.VERTICAL_AXIS && (n = 10 * -o.detail), n && (e.preventDefault(), i.verticalScrollbar.scrollTop(r + -n))
	}, _scroll: function (e) {
		var t = this, n = e.currentTarget.scrollTop, i = t.dataSource, r = t.itemHeight, o = i.skip() || 0, a = t._rangeStart || o, s = t.element.innerHeight(), l = !!(t._scrollbarTop && t._scrollbarTop > n), d = R.max(R.floor(n / r), 0), c = R.max(d + R.floor(s / r), 0);
		t._scrollTop = n - a * r, t._scrollbarTop = n, t._fetch(d, c, l) || (t.wrapper[0].scrollTop = t._scrollTop)
	}, _fetch: function (e, t, n) {
		var i = this, r = i.dataSource, o = i.itemHeight, a = r.take(), s = i._rangeStart || r.skip() || 0, l = R.floor(e / a) * a, d = !1, c = .33;
		return s > e ? (d = !0, s = R.max(0, t - a), i._scrollTop = (e - s) * o, i._page(s, a)) : t >= s + a && !n ? (d = !0, s = e, i._scrollTop = o, i._page(s, a)) : i._fetching || (l + a - a * c > e && e > a && r.prefetch(l - a, a), t > l + a * c && r.prefetch(l + a, a)), d
	}, _page: function (e, t) {
		var n = this, i = n.dataSource;
		clearTimeout(n._timeout), n._fetching = !0, n._rangeStart = e, i.inRange(e, t) ? i.range(e, t) : (b.ui.progress(n.wrapper.parent(), !0), n._timeout = setTimeout(function () {
			i.range(e, t)
		}, 100))
	}, refresh: function () {
		var e, t, n, i = this, r = "", o = 25e4, a = i.dataSource, s = i._rangeStart, l = b.support.kineticScrollNeeded ? 0 : b.support.scrollbar(), d = i.wrapper[0];
		b.ui.progress(i.wrapper.parent(), !1), clearTimeout(i._timeout), n = i.itemHeight = i.options.itemHeight() || 0;
		var c = d.scrollWidth > d.offsetWidth ? l : 0;
		for (e = a.total() * n + c, t = 0; R.floor(e / o) > t; t++)
			r += '<div style="width:1px;height:' + o + 'px"></div>';
		e % o && (r += '<div style="width:1px;height:' + e % o + 'px"></div>'), i.verticalScrollbar.html(r), d.scrollTop = i._scrollTop, i.drag && i.drag.cancel(), s && !i._fetching && (i._rangeStart = a.skip()), i._fetching = !1
	} }), kt = { create: { text: "Add new record", imageClass: "k-add", className: "k-grid-add", iconClass: "k-icon" }, cancel: { text: "Cancel changes", imageClass: "k-cancel", className: "k-grid-cancel-changes", iconClass: "k-icon" }, save: { text: "Save changes", imageClass: "k-update", className: "k-grid-save-changes", iconClass: "k-icon" }, destroy: { text: "Delete", imageClass: "k-delete", className: "k-grid-delete", iconClass: "k-icon" }, edit: { text: "Edit", imageClass: "k-edit", className: "k-grid-edit", iconClass: "k-icon" }, update: { text: "Update", imageClass: "k-update", className: "k-grid-update", iconClass: "k-icon" }, canceledit: { text: "Cancel", imageClass: "k-cancel", className: "k-grid-cancel", iconClass: "k-icon"} }, wt = y.extend({
		init: function (e, t) {
			var n = this;
			t = E(t) ? { dataSource: t} : t, y.fn.init.call(n, e, t), _t = b.support.isRtl(e), n._element(), n._aria(), n._columns(n.options.columns), n._dataSource(), n._tbody(), n._pageable(), n._thead(), n._groupable(), n._toolbar(), n._setContentHeight(), n._templates(), n._navigatable(), n._selectable(), n._details(), n._editable(), n._attachCustomCommandsEvent(), n.options.autoBind ? n.dataSource.fetch() : n._footer(), b.notify(n)
		}, events: [K, "dataBinding", et, tt, nt, Q, G, $, Y, Z, ot, at, J, X], setDataSource: function (e) {
			var t = this;
			t.options.dataSource = e, t._dataSource(), t._pageable(), t.options.groupable && t._groupable(), t._thead(), t.virtualScrollable && t.virtualScrollable.setDataSource(t.options.dataSource), t.options.autoBind && e.fetch()
		}, options: { name: "Grid", columns: [], toolbar: null, autoBind: !0, filterable: !1, scrollable: !0, sortable: !1, selectable: !1, navigatable: !1, pageable: !1, editable: !1, groupable: !1, rowTemplate: "", altRowTemplate: "", dataSource: {}, height: null, resizable: !1, reorderable: !1, columnMenu: !1, detailTemplate: null }, destroy: function () {
			var e = this;
			y.fn.destroy.call(e), e.pager && e.pager.destroy(), e.groupable && e.groupable.destroy(), e.virtualScrollable && e.virtualScrollable.destroy(), e._destroyColumnAttachments(), e._destroyEditable(), e.dataSource.unbind(K, e._refreshHandler).unbind(N, e._progressHandler).unbind(O, e._errorHandler), e.element.add(e.wrapper).add(e.table).add(e.thead).add(e.wrapper.find(">.k-grid-toolbar")), e.content && e.element.add(e.content).add(e.content.find(">.k-virtual-scrollable-wrap")), e.element.off(q), b.destroy(e.wrapper)
		}, setOptions: function (e) {
			var t = this;
			y.fn.setOptions.call(this, e), t._templates()
		}, items: function () {
			return this.tbody.children(":not(.k-grouping-row,.k-detail-row,.k-group-footer)")
		}, _destroyColumnAttachments: function () {
			var t = this;
			t.thead.find("th").each(function () {
				var t = e(this), n = t.data("kendoFilterMenu"), i = t.data("kendoSortable"), r = t.data("kendoColumnMenu");
				n && n.destroy(), i && i.destroy(), r && r.destroy()
			})
		}, _attachCustomCommandsEvent: function () {
			var e, t, n, i = this, r = i.columns || [];
			for (t = 0, n = r.length; n > t; t++)
				e = r[t].command, e && l(i, i.wrapper, e)
		}, _aria: function () {
			var e = this.element.attr("id") || "aria";
			e && (this._cellId = e + "_active_cell")
		}, _element: function () {
			var t = this, n = t.element;
			n.is("table") || (n = t.options.scrollable ? t.element.find("> .k-grid-content > table") : t.element.children("table"), n.length || (n = e("<table />").appendTo(t.element))), t.table = n.attr("cellspacing", 0).attr("role", t._hasDetails() ? "treegrid" : "grid"), t._wrapper()
		}, _positionColumnResizeHandle: function (t) {
			var n, i = this, a = i.options.scrollable, s = i.resizeHandle;
			i.thead.on("mousemove" + q, "th:not(.k-group-cell,.k-hierarchy-cell)", function (l) {
				var d = e(this), c = l.clientX, u = e(window).scrollLeft(), p = d.offset().left + (_t ? 0 : this.offsetWidth);
				if (c + u > p - ht && p + ht > c + u) {
					if (s || (s = i.resizeHandle = e('<div class="k-resize-handle"/>'), t.append(s)), _t) {
						var f = d.closest(".k-grid-header-wrap"), h = e.browser.msie ? f.scrollLeft() : 0, m = e.browser.webkit ? f[0].scrollWidth - f[0].offsetWidth - f.scrollLeft() : 0, g = e.browser.mozilla ? f[0].scrollWidth - f[0].offsetWidth - (f[0].scrollWidth - f[0].offsetWidth - f.scrollLeft()) : 0;
						n = d.position().left - m + g - h
					}
					else
						n = this.offsetWidth, d.prevAll(":visible").each(function () {
							n += this.offsetWidth
						});
					s.css({ top: a ? 0 : r(i.wrapper), left: n - ht, height: d.outerHeight(), width: 3 * ht }).data("th", d).show()
				}
				else
					s ? s.hide() : o(i.wrapper, "")
			})
		}, _resizable: function () {
			var t, n, i, r, a, s = this, l = s.options;
			l.resizable && (t = l.scrollable ? s.wrapper.find(".k-grid-header-wrap:first") : s.wrapper, s._positionColumnResizeHandle(t), t.kendoResizable({ handle: ".k-resize-handle", hint: function (t) {
				return e('<div class="k-grid-resize-indicator" />').css({ height: t.data("th").outerHeight() + s.tbody.attr("clientHeight") })
			}, start: function (t) {
				var d = e(t.currentTarget).data("th"), c = e.inArray(d[0], d.parent().children(":visible")), u = s.tbody.parent(), p = s.footer || e();
				o(s.wrapper, "col-resize"), a = l.scrollable ? s.thead.parent().find("col:eq(" + c + ")").add(u.children("colgroup").find("col:eq(" + c + ")")).add(p.find("colgroup").find("col:eq(" + c + ")")) : u.children("colgroup").find("col:eq(" + c + ")"), n = t.x.location, i = d.outerWidth(), r = s.tbody.outerWidth()
			}, resize: function (t) {
				var o = _t ? -1 : 1, d = i + t.x.location * o - n * o, c = s.footer || e();
				d > 10 && (a.css("width", d), l.scrollable && (s._footerWidth = r + t.x.location * o - n * o, s.tbody.parent().add(s.thead.parent()).add(c.find("table")).css("width", s._footerWidth)))
			}, resizeend: function (t) {
				var n, r = e(t.currentTarget).data("th"), a = r.outerWidth();
				o(s.wrapper, ""), i != a && (n = s.columns[r.parent().find("th:not(.k-group-cell,.k-hierarchy-cell)").index(r)], n.width = a, s.trigger(ot, { column: n, oldWidth: i, newWidth: a })), s.resizeHandle.hide()
			} }))
		}, _draggable: function () {
			var t = this;
			t.options.reorderable && (t._draggableInstance && t._draggableInstance.destroy(), t._draggableInstance = t.wrapper.kendoDraggable({
				group: b.guid(), filter: ">.k-grid-header " + U + ",>table>.k-grid-header " + U, hint: function (t) {
					return e('<div class="k-header k-drag-clue" />').css({ width: t.width(), paddingLeft: t.css("paddingLeft"), paddingRight: t.css("paddingRight"), lineHeight: t.height() + "px", paddingTop: t.css("paddingTop"), paddingBottom: t.css("paddingBottom") }).html(t.attr(b.attr("title")) || t.attr(b.attr("field")) || t.text()).prepend('<span class="k-icon k-drag-status k-denied" />')
				}
			}).data("kendoDraggable"))
		}, _reorderable: function () {
			var e = this;
			e.options.reorderable && e.wrapper.kendoReorderable({ draggable: e._draggableInstance, change: function (t) {
				var n = F(e.columns[t.newIndex], e.columns), i = e.columns[t.oldIndex];
				e.trigger(at, { newIndex: n, oldIndex: F(i, e.columns), column: i }), e.reorderColumn(n, i)
			} })
		}, reorderColumn: function (e, t) {
			var n, i, r, o = this, a = F(t, o.columns), l = F(t, d(o.columns)), c = o.footer || o.wrapper.find(".k-grid-footer");
			if (a !== e)
				for (o.columns.splice(a, 1), o.columns.splice(e, 0, t), o._templates(), s(o.thead.prev().find("col:not(.k-group-col,.k-hierarchy-col)"), l, e), o.options.scrollable && s(o.tbody.prev().find("col:not(.k-group-col,.k-hierarchy-col)"), l, e), s(o.thead.find(".k-header:not(.k-group-cell,.k-hierarchy-cell)"), a, e), c && c.length && (s(c.find(".k-grid-footer-wrap>table>colgroup>col:not(.k-group-col,.k-hierarchy-col)"), l, e), s(c.find(".k-footer-template>td:not(.k-group-cell,.k-hierarchy-cell)"), a, e)), n = o.tbody.children(":not(.k-grouping-row,.k-detail-row)"), i = 0, r = n.length; r > i; i += 1)
					s(n.eq(i).find(">td:not(.k-group-cell,.k-hierarchy-cell)"), a, e)
		}, cellIndex: function (t) {
			return e(t).parent().children("td:not(.k-group-cell,.k-hierarchy-cell)").index(t)
		}, _modelForContainer: function (t) {
			t = e(t), t.is("tr") || "popup" === this._editMode() || (t = t.closest("tr"));
			var n = t.attr(b.attr("uid"));
			return this.dataSource.getByUid(n)
		}, _editable: function () {
			var t = this, n = t.options.editable, i = function () {
				var n = document.activeElement, i = t._editContainer;
				!i || e.contains(i[0], n) || i[0] === n || e(n).closest(".k-animation-container").length || t.editable.end() && t.closeCell()
			};
			if (n) {
				var r = t._editMode();
				"incell" === r ? n.update !== !1 && t.wrapper.on(st + q, "tr:not(.k-grouping-row) > td", function (n) {
					var i = e(this);
					i.hasClass("k-hierarchy-cell") || i.hasClass("k-detail-cell") || i.hasClass("k-group-cell") || i.hasClass("k-edit-cell") || i.has("a.k-grid-delete").length || i.has("button.k-grid-delete").length || i.closest("tbody")[0] !== t.tbody[0] || e(n.target).is(":input") || (t.editable ? t.editable.end() && (t.closeCell(), t.editCell(i)) : t.editCell(i))
				}).on("focusin" + q, function () {
					clearTimeout(t.timer), t.timer = null
				}).on("focusout" + q, function () {
					t.timer = setTimeout(i, 1)
				}) : n.update !== !1 && t.wrapper.on(st + q, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible a.k-grid-edit", function (n) {
					n.preventDefault(), t.editRow(e(this).closest("tr"))
				}), n.destroy !== !1 ? t.wrapper.on(st + q, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible .k-grid-delete", function (n) {
					n.preventDefault(), n.stopPropagation(), t.removeRow(e(this).closest("tr"))
				}) : t.wrapper.on(st + q, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible button.k-grid-delete", function (e) {
					t._confirmation() || e.preventDefault()
				})
			}
		}, editCell: function (e) {
			var t = this, n = t.columns[t.cellIndex(e)], i = t._modelForContainer(e);
			!i || i.editable && !i.editable(n.field) || n.command || !n.field || (t._attachModelChange(i), t._editContainer = e, t.editable = e.addClass("k-edit-cell").kendoEditable({ fields: { field: n.field, format: n.format, editor: n.editor, values: n.values }, model: i, change: function (n) {
				t.trigger($, { values: n.values, container: e, model: i }) && n.preventDefault()
			} }).data("kendoEditable"), e.parent().addClass("k-grid-edit-row"), t.trigger(G, { container: e, model: i }))
		}, _destroyEditable: function () {
			var e = this, t = function () {
				e.editable && (e._detachModelChange(), e.editable.destroy(), e.editable = null, e._editContainer = null)
			};
			e.editable && ("popup" === e._editMode() ? e._editContainer.data("kendoWindow").bind("deactivate", t).close() : t())
		}, _attachModelChange: function (e) {
			var t = this;
			t._modelChangeHandler = function (e) {
				t._modelChange({ field: e.field, model: this })
			}, e.bind("change", t._modelChangeHandler)
		}, _detachModelChange: function () {
			var e = this, t = e._editContainer, n = e._modelForContainer(t);
			n && n.unbind(K, e._modelChangeHandler)
		}, closeCell: function () {
			var t = this, n = t._editContainer.removeClass("k-edit-cell"), i = n.closest("tr").attr(b.attr("uid")), r = t.columns[t.cellIndex(n)], o = t.dataSource.getByUid(i);
			n.parent().removeClass("k-grid-edit-row"), t._destroyEditable(), t._displayCell(n, r, o), n.hasClass("k-dirty-cell") && e('<span class="k-dirty"/>').prependTo(n)
		}, _displayCell: function (e, t, n) {
			var i = this, r = { storage: {}, count: 0 }, o = S({}, b.Template, i.options.templateSettings), a = b.template(i._cellTmpl(t, r), o);
			r.count > 0 && (a = I(a, r.storage)), e.empty().html(a(n))
		}, removeRow: function (t) {
			var n, i, r = this;
			r._confirmation() && (t = e(t).hide(), n = r._modelForContainer(t), n && !r.trigger(Y, { row: t, model: n }) && (r.dataSource.remove(n), i = r._editMode(), ("inline" === i || "popup" === i) && r.dataSource.sync()))
		}, _editMode: function () {
			var e = "incell", t = this.options.editable;
			return t !== !0 && (e = "string" == typeof t ? t : t.mode || e), e
		}, editRow: function (n) {
			var i, r = this, o = r._modelForContainer(n), a = r._editMode(), s = r.options.navigatable;
			r.cancelRow(), o && (r._attachModelChange(o), "popup" === a ? r._createPopupEditor(o) : "inline" === a ? r._createInlineEditor(n, o) : "incell" === a && e(n).children(M).each(function () {
				var n = e(this), i = r.columns[n.index()];
				return o = r._modelForContainer(n), o && (!o.editable || o.editable(i.field)) && i.field ? (r.editCell(n), !1) : t
			}), i = r._editContainer, i.on(st + q, "a.k-grid-cancel", function (t) {
				t.preventDefault(), t.stopPropagation();
				var n = r.items().index(e(r.current()).parent());
				r.cancelRow(), s && (r.current(r.items().eq(n).children().filter(L).first()), r.table.focus())
			}), i.on(st + q, "a.k-grid-update", function (e) {
				e.preventDefault(), e.stopPropagation(), r.saveRow()
			}))
		}, _createPopupEditor: function (t) {
			var n, i, r, o, a, s, l, d, c, u = this, p = "<div " + b.attr("uid") + '="' + t.uid + '"><div class="k-edit-form-container">', f = [], h = u.options.editable, m = h.template, v = T(h) ? h.window : {}, _ = S({}, b.Template, u.options.templateSettings);
			if (m)
				for (typeof m === ut && (m = window.unescape(m)), p += b.template(m, _)(t), r = 0, o = u.columns.length; o > r; r++)
					n = u.columns[r], n.command && (d = g(n.command, "edit"), d && (i = d));
			else
				for (r = 0, o = u.columns.length; o > r; r++)
					if (n = u.columns[r], n.command)
						n.command && (d = g(n.command, "edit"), d && (i = d));
					else if (p += '<div class="k-edit-label"><label for="' + n.field + '">' + (n.title || n.field || "") + "</label></div>", t.editable && !t.editable(n.field) || !n.field) {
						var x = { storage: {}, count: 0 };
						a = b.template(u._cellTmpl(n, x), _), x.count > 0 && (a = I(a, x.storage)), p += '<div class="k-edit-field">' + a(t) + "</div>"
					}
					else
						f.push({ field: n.field, format: n.format, editor: n.editor, values: n.values }), p += "<div " + b.attr("container-for") + '="' + n.field + '" class="k-edit-field"></div>';
			i && T(i) && (i.text && T(i.text) && (s = i.text.update, l = i.text.cancel), i.attr && (c = i.attr)), p += u._createButton({ name: "update", text: s, attr: c }) + u._createButton({ name: "canceledit", text: l, attr: c }), p += "</div></div>";
			var k = u._editContainer = e(p).appendTo(u.wrapper).eq(0).kendoWindow(S({ modal: !0, resizable: !1, draggable: !0, title: "Edit", visible: !1, close: function (e) {
				e.userTriggered && u.cancelRow()
			} }, v));
			u.editable = u._editContainer.kendoEditable({ fields: f, model: t, clearContainer: !1 }).data("kendoEditable"), k.data("kendoWindow").center().open(), u.trigger(G, { container: k, model: t })
		}, _createInlineEditor: function (t, n) {
			var i, r, o, a = this, s = [];
			t.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function () {
				if (r = e(this), i = a.columns[a.cellIndex(r)], i.command || !i.field || n.editable && !n.editable(i.field)) {
					if (i.command && (o = g(i.command, "edit"))) {
						r.empty();
						var t, l, d;
						T(o) && (o.text && T(o.text) && (t = o.text.update, l = o.text.cancel), o.attr && (d = o.attr)), e(a._createButton({ name: "update", text: t, attr: d }) + a._createButton({ name: "canceledit", text: l, attr: d })).appendTo(r)
					}
				}
				else
					s.push({ field: i.field, format: i.format, editor: i.editor, values: i.values }), r.attr("data-container-for", i.field), r.empty()
			}), a._editContainer = t, a.editable = t.addClass("k-grid-edit-row").kendoEditable({ fields: s, model: n, clearContainer: !1 }).data("kendoEditable"), a.trigger(G, { container: t, model: n })
		}, cancelRow: function () {
			var e, t = this, n = t._editContainer;
			n && (e = t._modelForContainer(n), t.dataSource.cancelChanges(e), "popup" !== t._editMode() ? t._displayRow(n) : t._displayRow(t.items().filter("[" + b.attr("uid") + "=" + e.uid + "]")), t._destroyEditable())
		}, saveRow: function () {
			var e = this, t = e._editContainer, n = e._modelForContainer(t), i = e.editable;
			t && i && i.end() && !e.trigger($, { container: t, model: n }) && e.dataSource.sync()
		}, _displayRow: function (t) {
			var n = this, i = n._modelForContainer(t);
			i && t.replaceWith(e((t.hasClass("k-alt") ? n.altRowTemplate : n.rowTemplate)(i)))
		}, _showMessage: function (e) {
			return window.confirm(e)
		}, _confirmation: function () {
			var e = this, t = e.options.editable, n = t === !0 || typeof t === ut ? pt : t.confirmation;
			return n !== !1 && null != n ? e._showMessage(n) : !0
		}, cancelChanges: function () {
			this.dataSource.cancelChanges()
		}, saveChanges: function () {
			var e = this;
			(e.editable && e.editable.end() || !e.editable) && !e.trigger(Z) && e.dataSource.sync()
		}, addRow: function () {
			var e, t = this, n = t.dataSource, i = t._editMode(), r = t.options.editable.createAt || "", o = n.pageSize(), a = n.view() || [];
			if (t.editable && t.editable.end() || !t.editable) {
				"incell" != i && t.cancelRow(), e = n.indexOf(a[0]), "bottom" == r.toLowerCase() && (e += a.length, o && !n.options.serverPaging && a.length >= o && (e -= 1)), 0 > e && (e = 0);
				var s = n.insert(e, {}), l = s.uid, d = t.table.find("tr[" + b.attr("uid") + "=" + l + "]"), c = d.children("td:not(.k-group-cell,.k-hierarchy-cell)").eq(t._firstEditableColumnIndex(d));
				"inline" !== i && "popup" !== i || !d.length ? c.length && t.editCell(c) : t.editRow(d)
			}
		}, _firstEditableColumnIndex: function (e) {
			var t, n, i, r = this, o = r.columns, a = r._modelForContainer(e);
			for (n = 0, i = o.length; i > n; n++)
				if (t = o[n], a && (!a.editable || a.editable(t.field)) && !t.command && t.field)
					return n;
			return -1
		}, _toolbar: function () {
			var t, n = this, i = n.wrapper, r = n.options.toolbar, o = n.options.editable;
			r && (t = n.wrapper.find(".k-grid-toolbar"), t.length || (P(r) || (r = typeof r === ut ? r : n._toolbarTmpl(r).replace(mt, "\\#"), r = I(b.template(r), n)), t = e('<div class="k-toolbar k-grid-toolbar" />').html(r({})).prependTo(i)), o && o.create !== !1 && t.on(st + q, ".k-grid-add", function (e) {
				e.preventDefault(), n.addRow()
			}).on(st + q, ".k-grid-cancel-changes", function (e) {
				e.preventDefault(), n.cancelChanges()
			}).on(st + q, ".k-grid-save-changes", function (e) {
				e.preventDefault(), n.saveChanges()
			}))
		}, _toolbarTmpl: function (e) {
			var t, n, i = this, r = "";
			if (E(e))
				for (t = 0, n = e.length; n > t; t++)
					r += i._createButton(e[t]);
			return r
		}, _createButton: function (e) {
			var t = e.template || bt, n = typeof e === ut ? e : e.name || e.text, r = { className: "k-grid-" + (n || "").replace(/\s/g, ""), text: n, imageClass: "", attr: "", iconClass: "" };
			if (!(n || T(e) && e.template))
				throw Error("Custom commands should have name specified");
			return T(e) ? (e.className && (e.className += " " + r.className), "edit" === n && T(e.text) && (e = S(!0, {}, e), e.text = e.text.edit), e.attr && T(e.attr) && (e.attr = i(e.attr)), r = S(!0, r, kt[n], e)) : r = S(!0, r, kt[n]), b.template(t)(r)
		}, _groupable: function () {
			var t = this;
			t.table.on(st + q, ".k-grouping-row .k-i-collapse, .k-grouping-row .k-i-expand", function (n) {
				var i = e(this), r = i.closest("tr");
				i.hasClass("k-i-collapse") ? t.collapseGroup(r) : t.expandGroup(r), n.preventDefault(), n.stopPropagation()
			}), t._attachGroupable()
		}, _attachGroupable: function () {
			var t = this, n = t.wrapper, i = t.options.groupable;
			i && (n.has("div.k-grouping-header")[0] || e("<div>&nbsp;</div>").addClass("k-grouping-header").prependTo(n), t.groupable && t.groupable.destroy(), t.groupable = new k(n, S({}, i, { draggable: t._draggableInstance, groupContainer: ">div.k-grouping-header", dataSource: t.dataSource, draggableElements: ">.k-grid-header " + j + ",>table>.k-grid-header " + j, filter: ">.k-grid-header " + W + ",>table>.k-grid-header " + W, allowDrag: t.options.reorderable })))
		}, _selectable: function () {
			var e, n, i = this, r = i.options.selectable;
			r && (e = typeof r === ut && r.toLowerCase().indexOf("multiple") > -1, n = typeof r === ut && r.toLowerCase().indexOf("cell") > -1, i.selectable = new b.ui.Selectable(i.table, { filter: ">" + (n ? H : "tbody>tr:not(.k-grouping-row,.k-detail-row,.k-group-footer)"), aria: !0, multiple: e, change: function () {
				i.trigger(K)
			} }), i.options.navigatable && i.table.on("keydown" + q, function (r) {
				var o = i.current();
				if (r.keyCode === C.SPACEBAR && r.target == i.table[0] && !o.is(".k-edit-cell,.k-header") && o.parent().is(":not(.k-grouping-row,.k-detail-row,.k-group-footer)")) {
					if (r.preventDefault(), r.stopPropagation(), o = n ? o : o.parent(), e) if (r.ctrlKey) {
						if (o.hasClass(rt))
							return o.removeClass(rt), i.trigger(K), t
					}
					else
						i.selectable.clear();
					else
						i.selectable.clear();
					i.selectable.value(o)
				}
			}))
		}, clearSelection: function () {
			var e = this;
			e.selectable.clear(), e.trigger(K)
		}, select: function (n) {
			var i = this, r = i.selectable;
			return n = e(n), n.length ? (r.options.multiple || (r.clear(), n = n.first()), r.value(n), t) : r.value()
		}, current: function (e) {
			var n = this, i = n.options.scrollable, r = n._current, o = n.table.add(n.thead.parent());
			return e !== t && e.length && (r && r[0] === e[0] || (r && (r.removeClass(it).removeAttr("id"), o.removeAttr("aria-activedescendant")), e.attr("id", n._cellId), n._current = e.addClass(it), o.attr("aria-activedescendant", n._cellId), e.length && i && (n._scrollTo(e.parent()[0], n.content[0]), i.virtual ? n._scrollTo(e[0], n.content.find(">.k-virtual-scrollable-wrap")[0]) : n._scrollTo(e[0], n.content[0])))), n._current
		}, _removeCurrent: function () {
			this._current && (this._current.removeClass(it), this._current = null)
		}, _scrollTo: function (e, t) {
			var n = "td" === e.tagName.toLowerCase(), i = e[n ? "offsetLeft" : "offsetTop"], r = e[n ? "offsetWidth" : "offsetHeight"], o = t[n ? "scrollLeft" : "scrollTop"], a = t[n ? "clientWidth" : "clientHeight"], s = i + r;
			t[n ? "scrollLeft" : "scrollTop"] = o > i ? i : s > o + a ? s - a : o
		}, _navigatable: function () {
			var t = this, n = I(t.current, t), i = t.table, r = t.thead.parent(), o = i;
			t.options.navigatable && (t.options.scrollable && (o = i.add(r), r.attr(dt, -1)), r.on("keydown" + q, function (e) {
				e.altKey && e.keyCode == C.DOWN && (n().find(".k-grid-filter, .k-header-column-menu").click(), e.stopImmediatePropagation())
			}).find("a.k-link").attr("tabIndex", -1), i.attr(dt, R.max(i.attr(dt) || 0, 0)).on("mousedown" + q + " keydown" + q, ".k-detail-cell", function (e) {
				e.target !== e.currentTarget && e.stopImmediatePropagation()
			}), o.on("mousedown" + q, B + ">" + L, I(v, t)).on("focus" + q, function () {
				var t = n();
				t && t.is(":visible") ? t.addClass(it) : n(e(this).find(V)), this == i[0] ? (r.attr(dt, -1), i.attr(dt, 0)) : (i.attr(dt, -1), r.attr(dt, 0))
			}).on("focusout" + q, function () {
				var e = n();
				e && e.removeClass(it)
			}).on("keydown" + q, function (r) {
				var o, a, s, l = r.keyCode, d = !1, c = !r.isDefaultPrevented() && !e(r.target).is(":button,a,:input,a>.k-icon"), u = t.options.pageable, p = t.dataSource, f = "incell" == t._editMode(), h = r.shiftKey, m = b.support.browser, g = n();
				if (g && g.is("th") && (c = !0), c && l == C.UP)
					g ? (a = g.parent().prevAll(B).first(), a[0] || (a = t.thead.parent().focus().find(B).first()), s = g.index(), g = a.children().eq(s), g[0] && g.is(L) || (g = a.children(L).first())) : g = i.find(V), d = !0, n(g);
				else if (c && l == C.DOWN)
					g ? (a = g.parent().nextAll(B).first(), !a[0] && g.is("th") && (a = t.tbody.parent().focus().end().find(B).first()), s = g.index(), g = a.children().eq(s), g[0] && g.is(L) || (g = a.children(L).first())) : g = i.find(V), d = !0, n(g);
				else if (c && l == C.LEFT)
					n(g ? g.prevAll(M + ":first") : i.find(V)), d = !0;
				else if (c && l == C.RIGHT)
					g ? g.next()[0] && (g = g.nextAll(M + ":first")) : g = i.find(V), d = !0, n(g);
				else if (c && u && C.PAGEDOWN == l)
					p.page(p.page() + 1), d = !0;
				else if (c && u && C.PAGEUP == l)
					p.page(p.page() - 1), d = !0;
				else if (l == C.ENTER || C.F2 == l) if (g = g ? g : i.find(V), g.is("th"))
					g.find(".k-link").click(), d = !0;
				else if (g.parent().is(".k-master-row,.k-grouping-row"))
					g.parent().find(".k-icon:first").click(), d = !0;
				else {
					var v = g.find(":focusable:first");
					!g.hasClass("k-edit-cell") && v[0] && g.hasClass("k-state-focused") ? (v.focus(), d = !0) : t.options.editable && !e(r.target).is(":button,.k-button") && (t._handleEditing(g), d = !0)
				}
				else if (C.ESC == l)
					g && e.contains(g[0], document.activeElement) && !g.hasClass("k-edit-cell") && !g.parent().hasClass("k-grid-edit-row") ? (t.table[0].focus(), d = !0) : !t._editContainer || g && !t._editContainer.has(g[0]) && g[0] !== t._editContainer[0] || (f ? t.closeCell() : (o = t.items().index(e(g).parent()), document.activeElement.blur(), t.cancelRow(), o >= 0 && t.current(t.items().eq(o).children().filter(L).first())), m.msie && 9 > parseInt(m.version, 10) && document.body.focus(), i.focus(), d = !0);
				else if (C.TAB == l) {
					var _;
					g = e(g), t.options.editable && f && (_ = e(document.activeElement).closest(".k-edit-cell"), _[0] && _[0] !== g[0] && (g = _)), _ = h ? g.prevAll(M + ":first") : g.nextAll(":visible:first"), _.length || (_ = g.parent()[h ? "prevAll" : "nextAll"]("tr:not(.k-grouping-row):not(.k-detail-row):visible:first").children(M + (h ? ":last" : ":first"))), !g.is("th") && _.length && t.options.editable && f && (t._handleEditing(g, _), d = !0)
				}
				d && (r.preventDefault(), r.stopPropagation())
			}))
		}, _handleEditing: function (n, i) {
			var r, o, a = this, s = e(document.activeElement), l = a._editMode(), d = a._editContainer;
			if (o = "incell" == l ? n.hasClass("k-edit-cell") : n.parent().hasClass("k-grid-edit-row"), a.editable) {
				if (e.contains(d[0], s[0]) && (s.blur(), b.support.browser.opera && s.change()), !a.editable)
					return a.table.focus(), t;
				if (!a.editable.end())
					return "incell" == l ? a.current(d) : a.current(d.children().filter(M).first()), r = d.find(":focusable:first")[0], r && r.focus(), t;
				"incell" == l ? a.closeCell() : (a.saveRow(), o = !0)
			}
			i && a.current(i), a.table.focus(), (!o && !i || i) && ("incell" == l ? a.editCell(a.current()) : a.editRow(a.current().parent()))
		}, _wrapper: function () {
			var e = this, t = e.table, n = e.options.height, i = e.element;
			i.is("div") || (i = i.wrap("<div/>").parent()), e.wrapper = i.addClass("k-grid k-widget"), n && (e.wrapper.css(lt, n), t.css(lt, "auto"))
		}, _tbody: function () {
			var t, n = this, i = n.table;
			t = i.find(">tbody"), t.length || (t = e("<tbody/>").appendTo(i)), n.tbody = t
		}, _scrollable: function () {
			var t, n, i = this, r = i.options, o = r.scrollable, a = o !== !0 && o.virtual && !i.virtualScrollable, s = !b.support.kineticScrollNeeded || a ? b.support.scrollbar() : 0;
			if (o) {
				t = i.wrapper.children(".k-grid-header"), t[0] || (t = e('<div class="k-grid-header" />').insertBefore(i.table)), t.css(_t ? "padding-left" : "padding-right", o.virtual ? s + 1 : s), n = e('<table role="grid" cellspacing="0" />'), n.append(i.thead), t.empty().append(e('<div class="k-grid-header-wrap" />').append(n)), i.content = i.table.parent(), i.content.is(".k-virtual-scrollable-wrap") && (i.content = i.content.parent()), i.content.is(".k-grid-content, .k-virtual-scrollable-wrap") || (i.content = i.table.wrap('<div class="k-grid-content" />').parent()), a && (i.virtualScrollable = new xt(i.content, { dataSource: i.dataSource, itemHeight: I(i._averageRowHeight, i) })), i.scrollables = t.children(".k-grid-header-wrap");
				var l = i.wrapper.find(".k-grid-footer"), d = _t && e.browser.webkit ? s : 0;
				if (l.length && (i.scrollables = i.scrollables.add(l.children(".k-grid-footer-wrap"))), o.virtual)
					i.content.find(">.k-virtual-scrollable-wrap").bind("scroll" + q, function () {
						i.scrollables.scrollLeft(this.scrollLeft + d)
					});
				else {
					i.content.bind("scroll" + q, function () {
						i.scrollables.scrollLeft(this.scrollLeft + d)
					});
					var c = b.touchScroller(i.content);
					c && c.movable && c.movable.bind("change", function (e) {
						i.scrollables.scrollLeft(-e.sender.x)
					})
				}
			}
		}, _setContentHeight: function () {
			var e = this, t = e.options, n = e.wrapper.innerHeight(), i = e.wrapper.children(".k-grid-header"), r = b.support.scrollbar();
			if (t.scrollable) {
				n -= i.outerHeight(), e.pager && (n -= e.pager.element.outerHeight()), t.groupable && (n -= e.wrapper.children(".k-grouping-header").outerHeight()), t.toolbar && (n -= e.wrapper.children(".k-grid-toolbar").outerHeight()), e.footerTemplate && (n -= e.wrapper.children(".k-grid-footer").outerHeight());
				var o = function (e) {
					var t, n;
					return e[0].style.height ? !0 : (t = e.height(), e.height("auto"), n = e.height(), t != n ? (e.height(""), !0) : (e.height(""), !1))
				};
				o(e.wrapper) && (n > 2 * r ? e.content.height(n) : e.content.height(2 * r + 1))
			}
		}, _averageRowHeight: function () {
			var e = this, t = e._rowHeight;
			e._rowHeight || (e._rowHeight = t = e.table.outerHeight() / e.table[0].rows.length, e._sum = t, e._measures = 1);
			var n = e.table.outerHeight() / e.table[0].rows.length;
			return t !== n && (e._measures++, e._sum += n, e._rowHeight = e._sum / e._measures), t
		}, _dataSource: function () {
			var e, n = this, i = n.options, r = i.dataSource;
			r = E(r) ? { data: r} : r, T(r) && (S(r, { table: n.table, fields: n.columns }), e = i.pageable, T(e) && e.pageSize !== t && (r.pageSize = e.pageSize)), n.dataSource && n._refreshHandler ? n.dataSource.unbind(K, n._refreshHandler).unbind(N, n._progressHandler).unbind(O, n._errorHandler) : (n._refreshHandler = I(n.refresh, n), n._progressHandler = I(n._requestStart, n), n._errorHandler = I(n._error, n)), n.dataSource = x.create(r).bind(K, n._refreshHandler).bind(N, n._progressHandler).bind(O, n._errorHandler)
		}, _error: function () {
			this._progress(!1)
		}, _requestStart: function () {
			this._progress(!0)
		}, _modelChange: function (t) {
			var n, i, r, o, a, s = this, l = t.model, d = s.tbody.find("tr[" + b.attr("uid") + "=" + l.uid + "]"), c = d.hasClass("k-alt");
			if (d.children(".k-edit-cell").length && !s.options.rowTemplate)
				d.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function () {
					n = e(this), i = s.columns[s.cellIndex(n)], i.field === t.field && (n.hasClass("k-edit-cell") ? n.addClass("k-dirty-cell") : (s._displayCell(n, i, l), e('<span class="k-dirty"/>').prependTo(n)))
				});
			else if (!d.hasClass("k-grid-edit-row")) {
				for (r = e((c ? s.altRowTemplate : s.rowTemplate)(l)), d.replaceWith(r), o = 0, a = s.columns.length; a > o; o++)
					i = s.columns[o], i.field === t.field && (n = r.children(":not(.k-group-cell,.k-hierarchy-cell)").eq(o), e('<span class="k-dirty"/>').prependTo(n));
				s.trigger("itemChange", { item: r, data: l, ns: _ })
			}
		}, _pageable: function () {
			var t, n = this, i = n.options.pageable;
			i && (t = n.wrapper.children("div.k-grid-pager"), t.length || (t = e('<div class="k-pager-wrap k-grid-pager"/>').appendTo(n.wrapper)), n.pager && n.pager.destroy(), n.pager = "object" == typeof i && i instanceof b.ui.Pager ? i : new b.ui.Pager(t, S({}, i, { dataSource: n.dataSource })))
		}, _footer: function () {
			var t = this, n = t.dataSource.aggregates(), i = "", r = t.footerTemplate, o = t.options, s = t.footer || t.wrapper.find(".k-grid-footer");
			if (r) if (n = z(n) ? a(t.dataSource.aggregate()) : n, i = e(t._wrapFooter(r(n))), s.length) {
				var l = i;
				s.replaceWith(l), s = t.footer = l
			}
			else
				s = t.footer = o.scrollable ? o.pageable ? i.insertBefore(t.wrapper.children("div.k-grid-pager")) : i.appendTo(t.wrapper) : i.insertBefore(t.tbody);
			else
				s && !t.footer && (t.footer = s);
			s.length && (o.scrollable && (t.scrollables = t.scrollables.not(".k-grid-footer-wrap").add(t.footer.attr("tabindex", -1).children(".k-grid-footer-wrap"))), t._footerWidth && s.find("table").css("width", t._footerWidth))
		}, _wrapFooter: function (t) {
			var n = this, i = "", r = b.support.mobileOS ? 0 : b.support.scrollbar();
			return n.options.scrollable ? (i = e('<div class="k-grid-footer"><div class="k-grid-footer-wrap"><table cellspacing="0"><tbody>' + t + "</tbody></table></div></div>"), n._appendCols(i.find("table")), i.css(_t ? "padding-left" : "padding-right", r), i) : '<tfoot class="k-grid-footer">' + t + "</tfoot>"
		}, _columnMenu: function () {
			var t, n, i, r, o, a, s = this, l = s.columns, d = s.options, c = d.columnMenu, u = function () {
				s.thead.parent().focus()
			};
			c && ("boolean" == typeof c && (c = {}), s.thead.find("th:not(.k-hierarchy-cell,.k-group-cell)").each(function (p) {
				n = l[p], a = e(this), n.command || !n.field && !a.attr("data-" + b.ns + "field") || (t = a.data("kendoColumnMenu"), t && t.destroy(), r = n.sortable !== !1 && c.sortable !== !1 ? d.sortable : !1, o = d.filterable && n.filterable !== !1 && c.filterable !== !1 ? S({}, n.filterable, d.filterable) : !1, i = { dataSource: s.dataSource, values: n.values, columns: c.columns, sortable: r, filterable: o, messages: c.messages, owner: s, closeCallback: u }, a.kendoColumnMenu(i))
			}))
		}, _filterable: function () {
			var t, n, i = this, r = i.columns, o = function () {
				i.thead.parent().focus()
			}, a = i.options.filterable;
			a && !i.options.columnMenu && i.thead.find("th:not(.k-hierarchy-cell,.k-group-cell)").each(function (s) {
				t = e(this), r[s].filterable === !1 || r[s].command || !r[s].field && !t.attr("data-" + b.ns + "field") || (n = t.data("kendoFilterMenu"), n && n.destroy(), t.kendoFilterMenu(S(!0, {}, a, r[s].filterable, { dataSource: i.dataSource, values: r[s].values, closeCallback: o })))
			})
		}, _sortable: function () {
			var t, n, i, r = this, o = r.columns, a = r.options.sortable;
			a && r.thead.find("th:not(.k-hierarchy-cell,.k-group-cell)").each(function (s) {
				t = o[s], t.sortable !== !1 && !t.command && t.field && (n = e(this), i = n.data("kendoSortable"), i && i.destroy(), n.attr("data-" + b.ns + "field", t.field).kendoSortable(S({}, a, { dataSource: r.dataSource, aria: !0 })))
			})
		}, _columns: function (t) {
			var n, i = this, r = i.table, o = r.find("col"), a = i.options.dataSource;
			t = t.length ? t : A(r.find("th"), function (t, n) {
				t = e(t);
				var i = t.attr(b.attr("sortable")), r = t.attr(b.attr("filterable")), a = t.attr(b.attr("type")), s = t.attr(b.attr("groupable")), l = t.attr(b.attr("field")), d = t.attr(b.attr("menu"));
				return l || (l = t.text().replace(/\s|[^A-z0-9]/g, "")), { field: l, type: a, sortable: "false" !== i, filterable: "false" !== r, groupable: "false" !== s, menu: d, template: t.attr(b.attr("template")), width: o.eq(n).css("width")}
			}), n = !(i.table.find("tbody tr").length > 0 && (!a || !a.transport)), i.columns = A(t, function (e) {
				return e = typeof e === ut ? { field: e} : e, e.hidden && (e.attributes = c(e.attributes), e.footerAttributes = c(e.footerAttributes), e.headerAttributes = c(e.headerAttributes)), S({ encoded: n }, e)
			})
		}, _groups: function () {
			var e = this.dataSource.group();
			return e ? e.length : 0
		}, _tmpl: function (e, t) {
			var r, o, a, s, l = this, d = S({}, b.Template, l.options.templateSettings), c = l.columns.length, u = { storage: {}, count: 0 }, p = l._hasDetails(), f = [], h = l._groups();
			if (!e) {
				for (e = "<tr", t && f.push("k-alt"), p && f.push("k-master-row"), f.length && (e += ' class="' + f.join(" ") + '"'), c && (e += " " + b.attr("uid") + '="#=' + d.paramName + '.uid#"'), e += " role='row'>", h > 0 && (e += n(h)), p && (e += '<td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#" tabindex="-1"></a></td>'), r = 0; c > r; r++)
					a = l.columns[r], o = a.template, s = typeof o, e += "<td" + i(a.attributes) + " role='gridcell'>", e += l._cellTmpl(a, u), e += "</td>";
				e += "</tr>"
			}
			return e = b.template(e, d), u.count > 0 ? I(e, u.storage) : e
		}, _headerCellText: function (e) {
			var t = this, n = S({}, b.Template, t.options.templateSettings), i = e.headerTemplate, r = typeof i, o = e.title || e.field || "";
			return r === ct ? o = b.template(i, n)({}) : r === ut && (o = i), o
		}, _cellTmpl: function (e, t) {
			var n, i, r = this, o = S({}, b.Template, r.options.templateSettings), a = e.template, s = o.paramName, l = e.field, d = "", c = e.format, u = typeof a, p = e.values;
			if (e.command) {
				if (E(e.command)) {
					for (n = 0, i = e.command.length; i > n; n++)
						d += r._createButton(e.command[n]);
					return d.replace(mt, "\\#")
				}
				return r._createButton(e.command).replace(mt, "\\#")
			}
			return u === ct ? (t.storage["tmpl" + t.count] = a, d += "#=this.tmpl" + t.count + "(" + s + ")#", t.count++) : u === ut ? d += a : p && p.length && T(p[0]) && "value" in p[0] && l ? (d += "#var v =" + b.stringify(f(p)) + "#", d += "#var f = v[", o.useWithBlock || (d += s + "."), d += l + "]#", d += "${f != null ? f : ''}") : (d += e.encoded ? "${" : "#=", c && (d += 'kendo.format("' + c.replace(ft, "\\$1") + '",'), l ? (l = s + "." + l, d += l + "==null?'':" + l) : d += "''", c && (d += ")"), d += e.encoded ? "}" : "#"), d
		}, _templates: function () {
			var t = this, n = t.options, i = t.dataSource, r = i.group(), o = t.footer || t.wrapper.find(".k-grid-footer"), a = i.aggregate();
			t.rowTemplate = t._tmpl(n.rowTemplate), t.altRowTemplate = t._tmpl(n.altRowTemplate || n.rowTemplate, !0), t._hasDetails() && (t.detailTemplate = t._detailTmpl(n.detailTemplate || "")), (!z(a) && !o.length || D(t.columns, function (e) {
				return e.footerTemplate
			}).length) && (t.footerTemplate = t._footerTmpl(a, "footerTemplate", "k-footer-template")), r && D(t.columns, function (e) {
				return e.groupFooterTemplate
			}).length && (a = e.map(r, function (e) {
				return e.aggregates
			}), t.groupFooterTemplate = t._footerTmpl(a, "groupFooterTemplate", "k-group-footer"))
		}, _footerTmpl: function (e, t, r) {
			var o, s, l, d, c, u = this, p = S({}, b.Template, u.options.templateSettings), f = p.paramName, h = "", m = u.columns, g = {}, v = 0, _ = {}, x = u._groups(), k = a(e);
			for (h += '<tr class="' + r + '">', x > 0 && (h += n(x)), u._hasDetails() && (h += '<td class="k-hierarchy-cell">&nbsp;</td>'), o = 0, s = u.columns.length; s > o; o++)
				c = m[o], l = c[t], d = typeof l, h += "<td" + i(c.footerAttributes) + ">", l ? (d !== ct && (_ = k[c.field] ? S({}, p, { paramName: f + "." + c.field }) : {}, l = b.template(l, _)), g["tmpl" + v] = l, h += "#=this.tmpl" + v + "(" + f + ")#", v++) : h += "&nbsp;", h += "</td>";
			return h += "</tr>", h = b.template(h, p), v > 0 ? I(h, g) : h
		}, _detailTmpl: function (e) {
			var t = this, i = "", r = S({}, b.Template, t.options.templateSettings), o = r.paramName, a = {}, s = 0, l = t._groups(), c = d(t.columns).length, u = typeof e;
			return i += '<tr class="k-detail-row">', l > 0 && (i += n(l)), i += '<td class="k-hierarchy-cell"></td><td class="k-detail-cell"' + (c ? ' colspan="' + c + '"' : "") + ">", u === ct ? (a["tmpl" + s] = e, i += "#=this.tmpl" + s + "(" + o + ")#", s++) : i += e, i += "</td></tr>", i = b.template(i, r), s > 0 ? I(i, a) : i
		}, _hasDetails: function () {
			var e = this;
			return null !== e.options.detailTemplate || (e._events[Q] || []).length
		}, _details: function () {
			var t = this;
			t.table.on(st + q, ".k-hierarchy-cell .k-plus, .k-hierarchy-cell .k-minus", function (n) {
				var i, r, o = e(this), a = o.hasClass("k-plus"), s = o.closest("tr.k-master-row"), l = t.detailTemplate, d = t._hasDetails();
				return o.toggleClass("k-plus", !a).toggleClass("k-minus", a), d && !s.next().hasClass("k-detail-row") && (r = t.dataItem(s), e(l(r)).addClass(s.hasClass("k-alt") ? "k-alt" : "").insertAfter(s), t.trigger(Q, { masterRow: s, detailRow: s.next(), data: r, detailCell: s.next().find(".k-detail-cell") })), i = s.next(), t.trigger(a ? tt : nt, { masterRow: s, detailRow: i }), i.toggle(a), t._current && t._current.attr("aria-expanded", a), n.preventDefault(), !1
			})
		}, dataItem: function (t) {
			return this._data[this.tbody.find("> tr:not(.k-grouping-row,.k-detail-row,.k-group-footer)").index(e(t))]
		}, expandRow: function (t) {
			e(t).find("> td .k-plus, > td .k-i-expand").click()
		}, collapseRow: function (t) {
			e(t).find("> td .k-minus, > td .k-i-collapse").click()
		}, _thead: function () {
			var n, r, o, a, s, l = this, d = l.columns, c = l._hasDetails() && d.length, u = "", p = l.table.find(">thead");
			if (p.length || (p = e("<thead/>").insertBefore(l.tbody)), o = l.element.find("tr:has(th):first"), o.length || (o = p.children().first(), o.length || (o = e("<tr/>"))), o.children().length)
				c && !o.find(".k-hierarchy-cell")[0] && o.prepend('<th class="k-hierarchy-cell">&nbsp;</th>');
			else {
				for (c && (u += '<th class="k-hierarchy-cell">&nbsp;</th>'), n = 0, r = d.length; r > n; n++)
					s = d[n], a = l._headerCellText(s), s.command ? u += "<th" + i(s.headerAttributes) + ">" + a + "</th>" : (u += "<th role='columnheader' " + b.attr("field") + "='" + (s.field || "") + "' ", s.title && (u += b.attr("title") + '="' + s.title.replace(/'/g, "'") + '" '), s.groupable !== t && (u += b.attr("groupable") + "='" + s.groupable + "' "), s.aggregates && (u += b.attr("aggregates") + "='" + s.aggregates + "'"), u += i(s.headerAttributes), u += ">" + a + "</th>");
				o.html(u)
			}
			o.find("th").addClass("k-header"), l.options.scrollable || p.addClass("k-grid-header"), o.find("script").remove().end().appendTo(p), l.thead && l._destroyColumnAttachments(), l.thead = p, l._sortable(), l._filterable(), l._scrollable(), l._updateCols(), l._resizable(), l._draggable(), l._reorderable(), l.groupable && l._attachGroupable(), l._columnMenu()
		}, _updateCols: function () {
			var e = this;
			e._appendCols(e.thead.parent().add(e.table))
		}, _appendCols: function (e) {
			var t = this;
			p(e, d(t.columns), t._hasDetails(), t._groups())
		}, _autoColumns: function (e) {
			if (e && e.toJSON) {
				var t, n = this;
				e = e.toJSON();
				for (t in e)
					n.columns.push({ field: t });
				n._thead(), n._templates()
			}
		}, _rowsHtml: function (e) {
			var t, n, i = this, r = "", o = i.rowTemplate, a = i.altRowTemplate;
			for (t = 0, n = e.length; n > t; t++)
				r += t % 2 ? a(e[t]) : o(e[t]), i._data.push(e[t]);
			return r
		}, _groupRowHtml: function (e, t, i) {
			var r, o, a = this, s = "", l = e.field, d = D(a.columns, function (e) {
				return e.field == l
			})[0] || {}, c = d.groupHeaderTemplate, u = (d.title || l) + ": " + h(e.value, d.format, d.values), p = S({}, { field: e.field, value: e.value }, e.aggregates[e.field]), f = a._groupAggregatesDefaultObject || {}, m = e.items;
			if (c && (u = typeof c === ct ? c(p) : b.template(c)(p)), s += '<tr class="k-grouping-row">' + n(i) + '<td colspan="' + t + '" aria-expanded="true">' + '<p class="k-reset">' + '<a class="k-icon k-i-collapse" href="#" tabindex="-1"></a>' + u + "</p></td></tr>", e.hasSubgroups)
				for (r = 0, o = m.length; o > r; r++)
					s += a._groupRowHtml(m[r], t - 1, i + 1);
			else
				s += a._rowsHtml(m);
			return a.groupFooterTemplate && (s += a.groupFooterTemplate(S(f, e.aggregates))), s
		}, collapseGroup: function (n) {
			n = e(n).find(".k-icon").addClass("k-i-expand").removeClass("k-i-collapse").end();
			var i, r, o = n.find(".k-group-cell").length, a = 1;
			n.find("td:first").attr("aria-expanded", !1), n.nextAll("tr").each(function () {
				return r = e(this), i = r.find(".k-group-cell").length, r.hasClass("k-grouping-row") ? a++ : r.hasClass("k-group-footer") && a--, o >= i || r.hasClass("k-group-footer") && 0 > a ? !1 : (r.hide(), t)
			})
		}, expandGroup: function (n) {
			n = e(n).find(".k-icon").addClass("k-i-collapse").removeClass("k-i-expand").end();
			var i, r, o = this, a = n.find(".k-group-cell").length, s = 1;
			n.find("td:first").attr("aria-expanded", !0), n.nextAll("tr").each(function () {
				return i = e(this), r = i.find(".k-group-cell").length, a >= r ? !1 : (r != a + 1 || i.hasClass("k-detail-row") || (i.show(), i.hasClass("k-grouping-row") && i.find(".k-icon").hasClass("k-i-collapse") && o.expandGroup(i), i.hasClass("k-master-row") && i.find(".k-icon").hasClass("k-minus") && i.next().show()), i.hasClass("k-grouping-row") && s++, i.hasClass("k-group-footer") && (1 == s ? i.show() : s--), t)
			})
		}, _updateHeader: function (t) {
			var n = this, i = n.thead.find("th.k-group-cell"), r = i.length;
			t > r ? e(Array(t - r + 1).join('<th class="k-group-cell k-header">&nbsp;</th>')).prependTo(n.thead.find("tr")) : r > t && (r -= t, e(D(i, function (e, t) {
				return r > t
			})).remove())
		}, _firstDataItem: function (e, t) {
			return e && t && (e = e.hasSubgroups ? this._firstDataItem(e.items[0], t) : e.items[0]), e
		}, hideColumn: function (t) {
			var n, i, r, o, a, s, l, u, p, f = this, h = 0, g = f.footer || f.wrapper.find(".k-grid-footer"), v = f.columns;
			if (t = "number" == typeof t ? v[t] : D(v, function (e) {
				return e.field === t
			})[0], t && !t.hidden) {
				for (p = F(t, d(v)), t.hidden = !0, t.attributes = c(t.attributes), t.footerAttributes = c(t.footerAttributes), t.headerAttributes = c(t.headerAttributes), f._templates(), f._updateCols(), f.thead.find(">tr>th:not(.k-hierarchy-cell,.k-group-cell):visible").eq(p).hide(), g && (f._appendCols(g.find("table:first")), g.find(".k-footer-template>td:not(.k-hierarchy-cell,.k-group-cell):visible").eq(p).hide()), n = f.tbody.children(), a = 0, u = n.length; u > a; a += 1)
					i = n.eq(a), i.is(".k-grouping-row,.k-detail-row") ? (r = i.children(":not(.k-group-cell):first,.k-detail-cell").last(), r.attr("colspan", parseInt(r.attr("colspan"), 10) - 1)) : (i.hasClass("k-grid-edit-row") && (r = i.children(".k-edit-container")[0]) && (r = e(r), r.attr("colspan", parseInt(r.attr("colspan"), 10) - 1), r.find("col").eq(p).remove(), i = r.find("tr:first")), m(i[0].cells, p, !1));
				for (s = f.thead.prev().find("col"), a = 0, u = s.length; u > a; a += 1) {
					if (l = s[a].style.width, !l || -1 != l.indexOf("%")) {
						h = 0;
						break
					}
					h += parseInt(l, 10)
				}
				o = e(">.k-grid-header table:first,>.k-grid-footer table:first", f.wrapper).add(f.table), f._footerWidth = null, h && (o.width(h), f._footerWidth = h), e.browser.msie && 8 == parseInt(e.browser.version, 10) && (o.css("display", "inline-table"), setTimeout(function () {
					o.css("display", "table")
				}, 1)), f.trigger(X, { column: t })
			}
		}, showColumn: function (t) {
			var n, i, r, o, a, s, l, c, f, h, g = this, v = g.columns, b = g.footer || g.wrapper.find(".k-grid-footer");
			if (t = "number" == typeof t ? v[t] : D(v, function (e) {
				return e.field === t
			})[0], t && t.hidden) {
				for (h = F(t, v), t.hidden = !1, t.attributes = u(t.attributes), t.footerAttributes = u(t.footerAttributes), t.headerAttributes = u(t.headerAttributes), g._templates(), g._updateCols(), g.thead.find(">tr>th:not(.k-hierarchy-cell,.k-group-cell)").eq(h).show(), b && (g._appendCols(b.find("table:first")), b.find(".k-footer-template>td:not(.k-hierarchy-cell,.k-group-cell)").eq(h).show()), n = g.tbody.children(), i = 0, r = n.length; r > i; i += 1)
					o = n.eq(i), o.is(".k-grouping-row,.k-detail-row") ? (a = o.children(":not(.k-group-cell):first,.k-detail-cell").last(), a.attr("colspan", parseInt(a.attr("colspan"), 10) + 1)) : (o.hasClass("k-grid-edit-row") && (a = o.children(".k-edit-container")[0]) && (a = e(a), a.attr("colspan", parseInt(a.attr("colspan"), 10) + 1), p(a.find(">form>table"), d(v), !1, 0), o = a.find("tr:first")), m(o[0].cells, h, !0));
				if (s = e(">.k-grid-header table:first,>.k-grid-footer table:first", g.wrapper).add(g.table), t.width) {
					for (l = 0, f = g.thead.prev().find("col"), i = 0, r = f.length; r > i; i += 1) {
						if (c = f[i].style.width, c.indexOf("%") > -1) {
							l = 0;
							break
						}
						l += parseInt(c, 10)
					}
					g._footerWidth = null, l && (s.width(l), g._footerWidth = l)
				}
				else
					s.width("");
				g.trigger(J, { column: t })
			}
		}, _progress: function (e) {
			var t = this, n = t.element.is("table") ? t.element.parent() : t.content && t.content.length ? t.content : t.element;
			b.ui.progress(n, e)
		}, refresh: function (t) {
			var n, i, r, o, s, l = this, c = "", u = l.dataSource.view(), p = l.options.navigatable, f = e(l.current()), h = !1, m = (l.dataSource.group() || []).length, g = m + d(l.columns).length;
			if (!(t && "itemchange" === t.action && l.editable || (t = t || {}, l.trigger("dataBinding", { action: t.action || "rebind", index: t.index, items: t.items })))) {
				if (p && (l.table[0] === document.activeElement || e.contains(l.table[0], document.activeElement)) && (h = f.is("th"), s = 0, h && (s = l.thead.find("th:not(.k-group-cell)").index(f))), l._destroyEditable(), l._progress(!1), l._data = [], l.columns.length || (l._autoColumns(l._firstDataItem(u[0], m)), g = m + l.columns.length), l._group = m > 0 || l._group, l._group && (l._templates(), l._updateCols(), l._updateHeader(m), l._group = m > 0), m > 0)
					for (l.detailTemplate && g++, l.groupFooterTemplate && (l._groupAggregatesDefaultObject = a(l.dataSource.aggregate())), i = 0, n = u.length; n > i; i++)
						c += l._groupRowHtml(u[i], g, 0);
				else
					c += l._rowsHtml(u);
				w ? l.tbody[0].innerHTML = c : (o = document.createElement("div"), o.innerHTML = "<table><tbody>" + c + "</tbody></table>", r = o.firstChild.firstChild, l.table[0].replaceChild(r, l.tbody[0]), l.tbody = e(r)), l._footer(), l._setContentHeight(), s >= 0 && (l._removeCurrent(), h ? l.current(l.thead.find("th:not(.k-group-cell)").eq(s)) : l.current(l.items().eq(s).children().filter(M).first()), l._current && l._current.closest("table")[0].focus()), l.trigger(et)
			}
		}
	});
	_.plugin(wt), _.plugin(xt)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = "change", r = "dataBound", o = "dataBinding", a = n.ui.Widget, s = n.keys, l = ">*", d = "progress", c = "error", u = "k-state-focused", p = "k-state-selected", f = "k-edit-item", h = "string", m = "edit", g = "remove", v = "save", b = "click", _ = ".kendoListView", x = e.proxy, k = n.ui.progress, w = n.data.DataSource, y = a.extend({ init: function (t, i) {
		var r = this;
		i = e.isArray(i) ? { dataSource: i} : i, a.fn.init.call(r, t, i), i = r.options, r.wrapper = t = r.element, t[0].id && (r._itemId = t[0].id + "_lv_active"), r._element(), r._dataSource(), r.template = n.template(i.template || ""), r.altTemplate = n.template(i.altTemplate || i.template), r.editTemplate = n.template(i.editTemplate || ""), r._navigatable(), r._selectable(), r._pageable(), r._crudHandlers(), r.options.autoBind && r.dataSource.fetch(), n.notify(r)
	}, events: [i, o, r, m, g, v], options: { name: "ListView", autoBind: !0, selectable: !1, navigatable: !1, template: "", altTemplate: "", editTemplate: "" }, _item: function (e) {
		return this.element.children()[e]()
	}, items: function () {
		return this.element.children()
	}, setDataSource: function (e) {
		this.options.dataSource = e, this._dataSource(), this.options.autoBind && e.fetch()
	}, _unbindDataSource: function () {
		var e = this;
		e.dataSource.unbind(i, e._refreshHandler).unbind(d, e._progressHandler).unbind(c, e._errorHandler)
	}, _dataSource: function () {
		var e = this;
		e.dataSource && e._refreshHandler ? e._unbindDataSource() : (e._refreshHandler = x(e.refresh, e), e._progressHandler = x(e._progress, e), e._errorHandler = x(e._error, e)), e.dataSource = w.create(e.options.dataSource).bind(i, e._refreshHandler).bind(d, e._progressHandler).bind(c, e._errorHandler)
	}, _progress: function () {
		k(this.element, !0)
	}, _error: function () {
		k(this.element, !1)
	}, _element: function () {
		this.element.addClass("k-widget k-listview").attr("role", "listbox")
	}, refresh: function (i) {
		var a, s, l, d, c, u = this, p = u.dataSource.view(), f = "", h = u.template, m = u.altTemplate;
		if (i && "itemchange" === i.action)
			return u.editable || (a = i.items[0], d = e.inArray(a, p), d >= 0 && (l = e(h(a)).attr(n.attr("uid"), a.uid), u.items().eq(d).replaceWith(l), u.trigger("itemChange", { item: l, data: a }))), t;
		if (i = i || {}, !u.trigger(o, { action: i.action || "rebind", items: i.items, index: i.index })) {
			for (u._destroyEditable(), d = 0, c = p.length; c > d; d++)
				f += d % 2 ? m(p[d]) : h(p[d]);
			for (u.element.html(f), s = u.items(), d = 0, c = p.length; c > d; d++)
				s.eq(d).attr(n.attr("uid"), p[d].uid).attr("role", "option").attr("aria-selected", "false");
			u.element[0] === document.activeElement && u.options.navigatable && u.current(s.eq(0)), u.trigger(r)
		}
	}, _pageable: function () {
		var t, i, r = this, o = r.options.pageable;
		e.isPlainObject(o) && (i = o.pagerId, t = e.extend({}, o, { dataSource: r.dataSource, pagerId: null }), r.pager = new n.ui.Pager(e("#" + i), t))
	}, _selectable: function () {
		var e, r, o = this, a = o.options.selectable, d = o.options.navigatable;
		a && (e = typeof a === h && a.toLowerCase().indexOf("multiple") > -1, e && o.element.attr("aria-multiselectable", !0), o.selectable = new n.ui.Selectable(o.element, { aria: !0, multiple: e, filter: l, change: function () {
			o.trigger(i)
		} }), d && o.element.on("keydown" + _, function (n) {
			if (n.keyCode === s.SPACEBAR) {
				if (r = o.current(), n.target == n.currentTarget && n.preventDefault(), e) if (n.ctrlKey) {
					if (r && r.hasClass(p))
						return r.removeClass(p), t
				}
				else
					o.selectable.clear();
				else
					o.selectable.clear();
				o.selectable.value(r)
			}
		}))
	}, current: function (e) {
		var n = this, i = n.element, r = n._current, o = n._itemId;
		return e === t ? r : (r && (r[0].id === o && r.removeAttr("id"), r.removeClass(u), i.removeAttr("aria-activedescendant")), e && e[0] && (o = e[0].id || o, n._scrollTo(e[0]), i.attr("aria-activedescendant", o), e.addClass(u).attr("id", o)), n._current = e, t)
	}, _scrollTo: function (t) {
		var n, i = this, r = !1, o = "scroll";
		"auto" == i.wrapper.css("overflow") || i.wrapper.css("overflow") == o ? n = i.wrapper[0] : (n = window, r = !0);
		var a = function (i, a) {
			var s = r ? e(t).offset()[i.toLowerCase()] : t["offset" + i], l = t["client" + a], d = e(n)[o + i](), c = e(n)[a.toLowerCase()]();
			s + l > d + c ? e(n)[o + i](s + l - c) : d > s && e(n)[o + i](s)
		};
		a("Top", "Height"), a("Left", "Width")
	}, _navigatable: function () {
		var t = this, i = t.options.navigatable, r = t.element, o = function (n) {
			t.current(e(n.currentTarget)), e(n.target).is(":button,a,:input,a>.k-icon,textarea") || r.focus()
		};
		i && (t._tabindex(), r.on("focus" + _, function () {
			var e = t._current;
			e && e.is(":visible") || (e = t._item("first")), t.current(e)
		}).on("focusout" + _, function () {
			t._current && t._current.removeClass(u)
		}).on("keydown" + _, function (i) {
			var o, a = i.keyCode, l = t.current(), d = e(i.target), c = !d.is(":button,textarea,a,a>.t-icon,input"), u = d.is(":text"), p = n.preventDefault, h = r.find("." + f);
			if (!(!c && !u && s.ESC != a || u && s.ESC != a && s.ENTER != a))
				if (s.UP === a || s.LEFT === a)
					l && (l = l.prev()), t.current(l && l[0] ? l : t._item("last")), p(i);
				else if (s.DOWN === a || s.RIGHT === a)
					l && (l = l.next()), t.current(l && l[0] ? l : t._item("first")), p(i);
				else if (s.PAGEUP === a)
					t.current(null), t.dataSource.page(t.dataSource.page() - 1), p(i);
				else if (s.PAGEDOWN === a)
					t.current(null), t.dataSource.page(t.dataSource.page() + 1), p(i);
				else if (s.HOME === a)
					t.current(t._item("first")), p(i);
				else if (s.END === a)
					t.current(t._item("last")), p(i);
				else if (s.ENTER === a) if (0 !== h.length && (c || u)) {
					o = t.items().index(h), document.activeElement.blur(), t.save();
					var m = function () {
						t.element.trigger("focus"), t.current(t.items().eq(o))
					};
					t.one("dataBound", m)
				}
				else
					"" !== t.options.editTemplate && t.edit(l);
				else if (s.ESC === a) {
					if (h = r.find("." + f), 0 === h.length)
						return;
					o = t.items().index(h), t.cancel(), t.element.trigger("focus"), t.current(t.items().eq(o))
				}
		}), r.on("mousedown" + _ + " touchstart" + _, l, x(o, t)))
	}, clearSelection: function () {
		var e = this;
		e.selectable.clear(), e.trigger(i)
	}, select: function (n) {
		var i = this, r = i.selectable;
		return n = e(n), n.length ? (r.options.multiple || (r.clear(), n = n.first()), r.value(n), t) : r.value()
	}, _destroyEditable: function () {
		var e = this;
		e.editable && (e.editable.destroy(), delete e.editable)
	}, _modelFromElement: function (e) {
		var t = e.attr(n.attr("uid"));
		return this.dataSource.getByUid(t)
	}, _closeEditable: function (t) {
		var i, r, o = this, a = o.editable, s = o.template, l = !0;
		return a && (t && (l = a.end()), l && (a.element.index() % 2 && (s = o.altTemplate), i = o._modelFromElement(a.element), r = e(s(i)).attr(n.attr("uid"), i.uid), o._destroyEditable(), a.element.replaceWith(r))), l
	}, edit: function (t) {
		var i = this, r = i._modelFromElement(t), o = e(i.editTemplate(r)).addClass(f);
		i.cancel(), o.attr(n.attr("uid"), r.uid), t.replaceWith(o), i.editable = o.kendoEditable({ model: r, clearContainer: !1, errorTemplate: !1 }).data("kendoEditable"), i.trigger(m, { model: r, item: o })
	}, save: function () {
		var e, t = this, n = t.editable;
		n && (n = n.element, e = t._modelFromElement(n), !t.trigger(v, { model: e, item: n }) && t._closeEditable(!0) && t.dataSource.sync())
	}, remove: function (e) {
		var t = this, n = t.dataSource, i = t._modelFromElement(e);
		t.trigger(g, { model: i, item: e }) || (e.hide(), n.remove(i), n.sync())
	}, add: function () {
		var e = this, t = e.dataSource, n = t.indexOf((t.view() || [])[0]);
		0 > n && (n = 0), e.cancel(), t.insert(n, {}), e.edit(e.element.children().first())
	}, cancel: function () {
		var e = this, t = e.dataSource;
		e.editable && (t.cancelChanges(e._modelFromElement(e.editable.element)), e._closeEditable(!1))
	}, _crudHandlers: function () {
		var t = this, i = "touchend" + _ + " " + b + _;
		t.element.on(i, ".k-edit-button", function (i) {
			var r = e(this).closest("[" + n.attr("uid") + "]");
			t.edit(r), i.preventDefault()
		}), t.element.on(i, ".k-delete-button", function (i) {
			var r = e(this).closest("[" + n.attr("uid") + "]");
			t.remove(r), i.preventDefault()
		}), t.element.on(i, ".k-update-button", function (e) {
			t.save(), e.preventDefault()
		}), t.element.on(i, ".k-cancel-button", function (e) {
			t.cancel(), e.preventDefault()
		})
	}, destroy: function () {
		var e = this;
		a.fn.destroy.call(e), e._unbindDataSource(), e._destroyEditable(), e.element.off(_), e.pager && e.pager.destroy(), e.selectable && e.selectable.destroy(), n.destroy(e.element)
	} });
	n.ui.plugin(y)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		var i, r;
		e.on("dragenter" + b, function () {
			t(), r = new Date, i || (i = setInterval(function () {
				var e = new Date - r;
				e > 100 && (n(), clearInterval(i), i = null)
			}, 100))
		}).on("dragover" + b, function () {
			r = new Date
		})
	}
	function i(e, t) {
		var n = e[t];
		return l(n) ? n.field || t : n
	}
	function r(e, n) {
		return e !== t && e.match(/\/$/) || (e = (e || "") + "/"), e + n
	}
	function o(e) {
		if (!e)
			return "";
		var t = " bytes";
		return e >= 1073741824 ? (t = " GB", e /= 1073741824) : e >= 1048576 ? (t = " MB", e /= 1048576) : e >= 1024 && (t = " KB", e /= 1024), Math.round(100 * e) / 100 + t
	}
	var a = window.kendo, s = a.ui.Widget, l = e.isPlainObject, d = e.proxy, c = e.extend, u = a.support.placeholder, p = e.isFunction, f = /(^\/|\/$)/g, h = "change", m = "apply", g = "error", v = "click", b = ".kendoImageBrowser", _ = ".kendoBreadcrumbs", x = ".kendoSearchBox", k = "name", w = "size", y = "type", C = { field: y, dir: "asc" }, T = a.template('<li data-#=ns#value="#=value#" class="k-item">${text}</li>'), S = a.template('<li class="k-tile-empty"><strong>${text}</strong></li>'), A = '<div class="k-widget k-toolbar k-floatwrap"><div class="k-toolbar-wrap">#if(showUpload) { # <div class="k-widget k-upload"><div class="k-button k-button-icontext k-button-bare k-upload-button"><span class="k-icon k-add"></span>#=messages.uploadFile#<input type="file" name="file" /></div></div>#}##if(showCreate) {#<button type="button" class="k-button k-button-icon k-button-bare"><span class="k-icon k-addfolder"></span></button>#}##if(showDelete) {#<button type="button" class="k-button k-button-icon k-button-bare k-state-disabled"><span class="k-icon k-delete"></span></button>&nbsp;#}#</div><div class="k-tiles-arrange">#=messages.orderBy#: <a href="\\#" class="k-link"><span>#=messages.orderByName#</span><span class="k-icon k-i-arrow-s"></span></a></div></div>';
	c(!0, a.data, { schemas: { imagebrowser: { data: function (e) {
		return e.items || e || []
	}, model: { id: "name", fields: { name: "name", size: "size", type: "type"}}}} }), c(!0, a.data, { transports: { imagebrowser: a.data.RemoteTransport.extend({ init: function (t) {
		a.data.RemoteTransport.fn.init.call(this, e.extend(!0, {}, this.options, t))
	}, _call: function (t, n) {
		n.data = e.extend({}, n.data, { path: this.options.path() }), p(this.options[t]) ? this.options[t].call(this, n) : a.data.RemoteTransport.fn[t].call(this, n)
	}, read: function (e) {
		this._call("read", e)
	}, create: function (e) {
		this._call("create", e)
	}, destroy: function (e) {
		this._call("destroy", e)
	}, update: function () {
	}, options: { read: { type: "POST" }, update: { type: "POST" }, create: { type: "POST" }, destroy: { type: "POST"}} })} });
	var D;
	D = e.browser.msie && 8 > parseFloat(e.browser.version) ? function (e) {
		return e.offsetTop
	} : function (t) {
		return t.offsetTop - e(t).height()
	};
	var E = s.extend({ init: function (e, t) {
		var n = this;
		t = t || {}, s.fn.init.call(n, e, t), n.element.addClass("k-imagebrowser"), n.element.on(v + b, ".k-toolbar button:not(.k-state-disabled):has(.k-delete)", d(n._deleteClick, n)).on(v + b, ".k-toolbar button:not(.k-state-disabled):has(.k-addfolder)", d(n._addClick, n)).on("keydown" + b, "li.k-state-selected input", d(n._directoryKeyDown, n)).on("blur" + b, "li.k-state-selected input", d(n._directoryBlur, n)), n._dataSource(), n.refresh(), n.path(n.options.path)
	}, options: { name: "ImageBrowser", messages: { uploadFile: "Upload", orderBy: "Arrange by", orderByName: "Name", orderBySize: "Size", directoryNotFound: "A directory with this name was not found.", emptyFolder: "Empty Folder", deleteFile: 'Are you sure you want to delete "{0}"?', invalidFileType: 'The selected file "{0}" is not valid. Supported file types are {1}.', overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?', dropFilesHere: "drop files here to upload" }, transport: {}, path: "/", fileTypes: "*.png,*.gif,*.jpg,*.jpeg" }, events: [g, h, m], destroy: function () {
		var e = this;
		s.fn.destroy.call(e), e.dataSource.unbind(g, e._errorHandler), e.element.add(e.list).add(e.toolbar).off(b), e.arrangeByPopup && e.arrangeByPopup.destroy(), a.destroy(e.element)
	}, value: function () {
		var e, n = this, i = n._selectedItem(), o = n.options.transport.imageUrl;
		return i && "f" === i.get(n._getFieldName(y)) ? (e = r(n.path(), i.get(n._getFieldName(k))).replace(f, ""), o && (e = p(o) ? o(e) : a.format(o, e)), e) : t
	}, _selectedItem: function () {
		var e = this.listView, n = e.select();
		return n.length ? this.dataSource.getByUid(n.attr(a.attr("uid"))) : t
	}, _toolbar: function () {
		var t, n, i = this, r = a.template(A), o = i.options.messages, s = [{ text: o.orderByName, value: "name", ns: a.ns }, { text: o.orderBySize, value: "size", ns: a.ns}];
		i.toolbar = e(r({ messages: o, showUpload: i.options.transport.uploadUrl, showCreate: i.options.transport.create, showDelete: i.options.transport.destroy })).appendTo(i.element).find(".k-upload input").kendoUpload({ multiple: !1, localization: { dropFilesHere: o.dropFilesHere }, async: { saveUrl: i.options.transport.uploadUrl, autoUpload: !0 }, upload: d(i._fileUpload, i) }).end(), i.upload = i.toolbar.find(".k-upload input").data("kendoUpload"), t = i.toolbar.find(".k-tiles-arrange a"), i.arrangeByPopup = n = e("<ul>" + a.render(T, s) + "</ul>").kendoPopup({ anchor: t }).on(v + b, "li", function () {
			var t = e(this), r = t.attr(a.attr("value"));
			i.toolbar.find(".k-tiles-arrange a span:first").html(t.text()), n.close(), i.orderBy(r)
		}).data("kendoPopup"), t.on(v + b, function (e) {
			e.preventDefault(), n.toggle()
		}), i._attachDropzoneEvents()
	}, _attachDropzoneEvents: function () {
		var t = this;
		t.options.transport.uploadUrl && (n(e(document.documentElement), e.proxy(t._dropEnter, t), e.proxy(t._dropLeave, t)), t._scrollHandler = d(t._positionDropzone, t))
	}, _dropEnter: function () {
		this._positionDropzone(), e(document).on("scroll" + b, this._scrollHandler)
	}, _dropLeave: function () {
		this._removeDropzone(), e(document).off("scroll" + b, this._scrollHandler)
	}, _positionDropzone: function () {
		var e = this, t = e.element, n = t.offset();
		e.toolbar.find(".k-dropzone").addClass("k-imagebrowser-dropzone").offset(n).css({ width: t[0].clientWidth, height: t[0].clientHeight, lineHeight: t[0].clientHeight + "px" })
	}, _removeDropzone: function () {
		this.toolbar.find(".k-dropzone").removeClass("k-imagebrowser-dropzone").css({ width: "", height: "", lineHeight: "", top: "", left: "" })
	}, _deleteClick: function () {
		var e = this, t = e.listView.select(), n = a.format(e.options.messages.deleteFile, t.find("strong").text());
		t.length && e._showMessage(n, "confirm") && e.listView.remove(t)
	}, _addClick: function () {
		this.createDirectory()
	}, _fileUpload: function (e) {
		var t, n = this, i = n.options, r = i.fileTypes, o = RegExp(("(" + r.split(",").join(")|(") + ")").replace(/\*\./g, ".*."), "i"), s = e.files[0].name, l = n._getFieldName(k), d = n._getFieldName(w);
		o.test(s) ? (e.data = { path: n.path() }, t = n._createFile(s), t ? n.upload.one("success", function (e) {
			t.set(l, e.response[l]), t.set(d, e.response[d]), n._tiles = n.listView.items().filter("[" + a.attr("type") + "=f]")
		}) : e.preventDefault()) : (e.preventDefault(), n._showMessage(a.format(i.messages.invalidFileType, s, r)))
	}, _findFile: function (e) {
		var t, n, i, r = this.dataSource.data(), o = this._getFieldName(y), a = this._getFieldName(k);
		for (e = e.toLowerCase(), t = 0, i = r.length; i > t; t++)
			if ("f" === r[t].get(o) && r[t].get(a).toLowerCase() === e) {
				n = r[t];
				break
			}
		return n
	}, _createFile: function (e) {
		var t, n, i = this, r = 0, o = {}, s = i._getFieldName(y), l = i.dataSource.view(), d = i._findFile(e);
		if (d && !i._showMessage(a.format(i.options.messages.overwriteFile, e), "confirm"))
			return null;
		if (d)
			return d;
		for (t = 0, n = l.length; n > t; t++)
			if ("f" === l[t].get(s)) {
				r = t;
				break
			}
		return o[s] = "f", o[i._getFieldName(k)] = e, o[i._getFieldName(w)] = 0, i.dataSource.insert(++r, o)
	}, createDirectory: function () {
		var e, t, n = this, i = 0, r = n._getFieldName(y), o = n._getFieldName(k), s = n.dataSource.data(), l = n._nameDirectory(), d = new n.dataSource.reader.model;
		for (e = 0, t = s.length; t > e; e++)
			"d" === s[e].get(r) && (i = e);
		d.set(r, "d"), d.set(o, l), n.listView.one("dataBound", function () {
			var e = n.listView.items().filter("[" + a.attr("uid") + "=" + d.uid + "]"), t = e.find("input");
			e.length && this.edit(e), this.element.scrollTop(e.attr("offsetTop") - this.element[0].offsetHeight), setTimeout(function () {
				t.select()
			})
		}).one("save", function (e) {
			var t = e.model.get(o);
			t ? e.model.set(o, n._nameExists(t, d.uid) ? n._nameDirectory() : t) : e.model.set(o, l)
		}), n.dataSource.insert(++i, d)
	}, _directoryKeyDown: function (e) {
		13 == e.keyCode && e.currentTarget.blur()
	}, _directoryBlur: function () {
		this.listView.save()
	}, _nameExists: function (e, t) {
		var n, i, r = this.dataSource.data(), o = this._getFieldName(y), a = this._getFieldName(k);
		for (n = 0, i = r.length; i > n; n++)
			if ("d" === r[n].get(o) && r[n].get(a).toLowerCase() === e.toLowerCase() && r[n].uid !== t)
				return !0;
		return !1
	}, _nameDirectory: function () {
		var t, n, i, r = "New folder", o = this.dataSource.data(), a = [], s = this._getFieldName(y), l = this._getFieldName(k);
		for (n = 0, i = o.length; i > n; n++)
			"d" === o[n].get(s) && o[n].get(l).toLowerCase().indexOf(r.toLowerCase()) > -1 && a.push(o[n].get(l));
		if (e.inArray(r, a) > -1) {
			n = 2;
			do
				t = r + " (" + n + ")", n++;
			while (e.inArray(t, a) > -1);
			r = t
		}
		return r
	}, orderBy: function (e) {
		this.dataSource.sort([{ field: this._getFieldName(y), dir: "asc" }, { field: this._getFieldName(e), dir: "asc"}])
	}, search: function (e) {
		this.dataSource.filter({ field: this._getFieldName(k), operator: "contains", value: e })
	}, _content: function () {
		var t = this;
		t.list = e('<ul class="k-reset k-floats k-tiles" />').appendTo(t.element).on("scroll" + b, d(t._scroll, t)).on("dblclick" + b, "li", d(t._dblClick, t)), t.listView = new a.ui.ListView(t.list, { dataSource: t.dataSource, template: t._itemTmpl(), editTemplate: t._editTmpl(), selectable: !0, autoBind: !1, dataBinding: function (e) {
			t.toolbar.find(".k-delete").parent().addClass("k-state-disabled"), ("remove" === e.action || "sync" === e.action) && e.preventDefault()
		}, dataBound: function () {
			t.dataSource.view().length ? (t._tiles = this.items().filter("[" + a.attr("type") + "=f]"), t._scroll()) : this.wrapper.append(S({ text: t.options.messages.emptyFolder }))
		}, change: d(t._listViewChange, t) })
	}, _dblClick: function (t) {
		var n = this, i = e(t.currentTarget);
		if (i.filter("[" + a.attr("type") + "=d]").length) {
			var o = n.dataSource.getByUid(i.attr(a.attr("uid")));
			o && (n.path(r(n.path(), o.get(n._getFieldName(k)))), n.breadcrumbs.value(n.path()))
		}
		else
			i.filter("[" + a.attr("type") + "=f]").length && n.trigger(m)
	}, _listViewChange: function () {
		var e = this._selectedItem();
		this.toolbar.find(".k-delete").parent().removeClass("k-state-disabled"), e && "f" === e.get(this._getFieldName(y)) && this.trigger(h)
	}, _dataSource: function () {
		var e, t = this, n = t.options, r = n.transport, o = c({}, C), s = { field: k, dir: "asc" }, u = { type: r.type || "imagebrowser", sort: [o, s] };
		l(r) && (r.path = d(t.path, t), u.transport = r), l(n.schema) ? (u.schema = n.schema, l(n.schema.model) && n.schema.model.fields && (o.field = i(n.schema.model.fields, y), s.field = i(n.schema.model.fields, k))) : r.type && l(a.data.schemas[r.type]) && (e = a.data.schemas[r.type], l(e.model) && e.model.fields && (o.field = i(e.model.fields, y), s.field = i(e.model.fields, k))), t.dataSource && t._errorHandler ? t.dataSource.unbind(g, t._errorHandler) : t._errorHandler = d(t._error, t), t.dataSource = a.data.DataSource.create(u).bind(g, t._errorHandler)
	}, _navigation: function () {
		var t = this, n = e('<div class="k-floatwrap"><input/><input/></div>').appendTo(this.element);
		t.breadcrumbs = n.find("input:first").kendoBreadcrumbs({ value: t.options.path, change: function () {
			t.path(this.value())
		} }).data("kendoBreadcrumbs"), t.searchBox = n.parent().find("input:last").kendoSearchBox({ change: function () {
			t.search(this.value())
		} }).data("kendoSearchBox")
	}, _error: function (e) {
		var t, n = this;
		n.trigger(g, e) || (t = e.xhr.status, "error" == e.status ? "404" == t ? n._showMessage(n.options.messages.directoryNotFound) : "0" != t && n._showMessage("Error! The requested URL returned " + t + " - " + e.xhr.statusText) : "timeout" == t && n._showMessage("Error! Server timeout."))
	}, _showMessage: function (e, t) {
		return window[t || "alert"](e)
	}, refresh: function () {
		var e = this;
		e._navigation(), e._toolbar(), e._content()
	}, _loadImage: function (t) {
		var n = this, i = e(t), r = n.dataSource.getByUid(i.attr(a.attr("uid"))), o = r.get(n._getFieldName(k)), s = e("<img />", { alt: o }).hide().on("load" + b, function () {
			e(this).prev().remove().end().addClass("k-image").fadeIn()
		});
		i.find(".k-loading").after(s), s.attr("src", n.options.transport.thumbnailUrl + "?path=" + n.path() + encodeURIComponent(o)), t.loaded = !0
	}, _scroll: function () {
		var e = this;
		e.options.transport && e.options.transport.thumbnailUrl && (clearTimeout(e._timeout), e._timeout = setTimeout(function () {
			var n = e.list.outerHeight(), i = e.list.scrollTop(), r = i + n;
			e._tiles.each(function () {
				var n = D(this), o = n + this.offsetHeight;
				return (n >= i && r > n || o >= i && r > o) && e._loadImage(this), n > r ? !1 : t
			}), e._tiles = e._tiles.filter(function () {
				return !this.loaded
			})
		}, 250))
	}, _editTmpl: function () {
		var e = this, t = '<li class="k-tile k-state-selected" ' + a.attr("uid") + '="#=uid#" ';
		return t += a.attr("type") + '="${' + e._getFieldName(y) + '}">', t += "#if(" + e._getFieldName(y) + ' == "d") { #', t += '<div class="k-thumb"><span class="k-icon k-folder"></span></div>', t += "#}else{#", t += '<div class="k-thumb"><span class="k-icon k-loading"></span></div>', t += "#}#", t += "#if(" + e._getFieldName(y) + ' == "d") { #', t += '<input class="k-input" ' + a.attr("bind") + '="value:' + e._getFieldName(k) + '"/>', t += "#}#", t += "</li>", d(a.template(t), { sizeFormatter: o })
	}, _itemTmpl: function () {
		var e = this, t = '<li class="k-tile" ' + a.attr("uid") + '="#=uid#" ';
		return t += a.attr("type") + '="${' + e._getFieldName(y) + '}">', t += "#if(" + e._getFieldName(y) + ' == "d") { #', t += '<div class="k-thumb"><span class="k-icon k-folder"></span></div>', t += "#}else{#", t += e.options.transport && e.options.transport.thumbnailUrl ? '<div class="k-thumb"><span class="k-icon k-loading"></span></div>' : '<div class="k-thumb"><span class="k-icon k-file"></span></div>', t += "#}#", t += "<strong>${" + e._getFieldName(k) + "}</strong>", t += "#if(" + e._getFieldName(y) + ' == "f") { # <span class="k-filesize">${this.sizeFormatter(' + e._getFieldName(w) + ")}</span> #}#", t += "</li>", d(a.template(t), { sizeFormatter: o })
	}, _getFieldName: function (e) {
		return i(this.dataSource.reader.model.fields, e)
	}, path: function (e) {
		var n = this, i = n._path || "";
		return e !== t ? (n._path = e.replace(f, "") + "/", n.dataSource.read({ path: n._path }), t) : (i && (i = i.replace(f, "")), "/" === i || "" === i ? "" : i + "/")
	} }), F = s.extend({ init: function (e, t) {
		var n = this;
		t = t || {}, s.fn.init.call(n, e, t), u && n.element.attr("placeholder", n.options.label), n._wrapper(), n.element.on("keydown" + x, d(n._keydown, n)).on("change" + x, d(n._updateValue, n)), n.wrapper.on(v + x, "a", d(n._click, n)), u || n.element.on("focus" + x, d(n._focus, n)).on("blur" + x, d(n._blur, n))
	}, options: { name: "SearchBox", label: "Search", value: "" }, events: [h], destroy: function () {
		var e = this;
		e.wrapper.add(e.element).add(e.label).off(x), s.fn.destroy.call(e)
	}, _keydown: function (e) {
		13 === e.keyCode && this._updateValue()
	}, _click: function (e) {
		e.preventDefault(), this._updateValue()
	}, _updateValue: function () {
		var e = this, t = e.element.val();
		t !== e.value() && (e.value(t), e.trigger(h))
	}, _blur: function () {
		this._updateValue(), this._toggleLabel()
	}, _toggleLabel: function () {
		u || this.label.toggle(!this.element.val())
	}, _focus: function () {
		this.label.hide()
	}, _wrapper: function () {
		var t = this.element, n = t.parents(".k-search-wrap");
		t[0].style.width = "", t.addClass("k-input k-textbox"), n.length || (n = t.wrap(e('<div class="k-widget k-search-wrap k-textbox"/>')).parent(), u || e('<label style="display:block">' + this.options.label + "</label>").insertBefore(t), e('<a href="#" class="k-icon k-i-search k-search"/>').appendTo(n)), this.wrapper = n, this.label = n.find(">label")
	}, value: function (e) {
		var n = this;
		return e !== t ? (n.options.value = e, n.element.val(e), n._toggleLabel(), t) : n.options.value
	} }), I = s.extend({ init: function (e, t) {
		var n = this;
		t = t || {}, s.fn.init.call(n, e, t), n._wrapper(), n.wrapper.on("focus" + _, "input", d(n._focus, n)).on("blur" + _, "input", d(n._blur, n)).on("keydown" + _, "input", d(n._keydown, n)).on(v + _, "a.k-i-arrow-n:first", d(n._rootClick, n)).on(v + _, "a:not(.k-i-arrow-n)", d(n._click, n)), n.value(n.options.value)
	}, options: { name: "Breadcrumbs", gap: 50 }, events: [h], destroy: function () {
		var e = this;
		s.fn.destroy.call(e), e.wrapper.add(e.wrapper.find("input")).add(e.wrapper.find("a")).off(_)
	}, _update: function (e) {
		e = "/" === (e || "").charAt(0) ? e : "/" + (e || ""), e !== this.value() && (this.value(e), this.trigger(h))
	}, _click: function (t) {
		t.preventDefault(), this._update(this._path(e(t.target).prevAll("a:not(.k-i-arrow-n)").andSelf()))
	}, _rootClick: function (e) {
		e.preventDefault(), this._update("")
	}, _focus: function () {
		var e = this, t = e.element;
		e.overlay.hide(), e.element.val(e.value()), setTimeout(function () {
			t.select()
		})
	}, _blur: function () {
		if (!this.overlay.is(":visible")) {
			var e = this, t = e.element, n = t.val().replace(/\/{2,}/g, "/");
			e.overlay.show(), t.val(""), e._update(n)
		}
	}, _keydown: function (e) {
		var t = this;
		13 === e.keyCode && (t._blur(), setTimeout(function () {
			t.overlay.find("a:first").focus()
		}))
	}, _wrapper: function () {
		var t, n = this.element, i = n.parents(".k-breadcrumbs");
		n[0].style.width = "", n.addClass("k-input"), i.length || (i = n.wrap(e('<div class="k-widget k-breadcrumbs k-header k-state-default"/>')).parent()), t = i.find(".k-breadcrumbs-wrap"), t.length || (t = e('<div class="k-breadcrumbs-wrap"/>').appendTo(i)), this.wrapper = i, this.overlay = t
	}, refresh: function () {
		var n, i, r, o, a = "", s = this.value();
		for (s !== t && s.match(/^\//) || (s = "/" + (s || "")), n = s.split("/"), r = 0, o = n.length; o > r; r++)
			i = n[r], i && (a || (a += '<a href="#" class="k-icon k-i-arrow-n">root</a>'), a += '<a class="k-link" href="#">' + n[r] + "</a>", a += '<span class="k-icon k-i-arrow-e">&gt;</span>');
		this.overlay.empty().append(e(a)), this._adjustSectionWidth()
	}, _adjustSectionWidth: function () {
		var t, n = this, i = n.wrapper, r = i.width() - n.options.gap, o = n.overlay.find("a");
		o.each(function (n) {
			t = e(this), t.parent().width() > r && (n == o.length - 1 ? t.width(r) : t.prev().andSelf().hide())
		})
	}, value: function (e) {
		return e !== t ? (this._value = e.replace(/\/{2,}/g, "/"), this.refresh(), t) : this._value
	}, _path: function (t) {
		return "/" + e.map(t, function (t) {
			return e(t).text()
		}).join("/")
	} });
	a.ui.plugin(E), a.ui.plugin(I), a.ui.plugin(F)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.Class, r = n.ui.Widget, o = n.support.mobileOS, a = n.support.browser, s = e.extend, l = n.deepExtend, d = ".kendoEditor", c = n.keys, u = i.extend({ init: function (e) {
		var t = this;
		t.options = e
	}, getHtml: function () {
		var e = this.options;
		return n.template(e.template)({ cssClass: e.cssClass, tooltip: e.title, initialValue: e.initialValue })
	} }), p = {
		select: function (e) {
			e.trigger("select", {})
		}, editorWrapperTemplate: '<table cellspacing="4" cellpadding="0" class="k-widget k-editor k-header" role="presentation"><tbody><tr role="presentation"><td class="k-editor-toolbar-wrap" role="presentation"><ul class="k-editor-toolbar" role="toolbar"></ul></td></tr><tr><td class="k-editable-area"></td></tr></tbody></table>', buttonTemplate: '<li class="k-editor-button" role="presentation"><a href="" role="button" class="k-tool-icon #= cssClass #" unselectable="on" title="#= tooltip #">#= tooltip #</a></li>', colorPickerTemplate: '<li class="k-editor-colorpicker" role="presentation"><div class="k-widget k-colorpicker k-header #= cssClass #" role="combobox" title="#=tooltip#"><span class="k-tool-icon"><span class="k-selected-color"></span></span><span class="k-icon k-i-arrow-s"></span></div></li>', comboBoxTemplate: '<li class="k-editor-combobox"><select title="#= tooltip #" class="#= cssClass #"></select></li>', dropDownListTemplate: '<li class="k-editor-selectbox"><select title="#= tooltip #" class="#= cssClass #"></select></li>', separatorTemplate: '<li class="k-separator"></li>', focusable: ".k-colorpicker,a.k-tool-icon:not(.k-state-disabled),.k-selectbox, .k-combobox .k-input", wrapTextarea: function (t) {
			var n = t[0].style.width, i = t[0].style.height, r = p.editorWrapperTemplate, o = e(r).insertBefore(t).width(n).height(i), a = o.find(".k-editable-area");
			return t.appendTo(a).addClass("k-content k-raw-content").hide(), t.closest(".k-editor")
		}, renderTools: function (t, i) {
			var r, o, a, l, d, c = {}, u = t._nativeTools, f = e(t.element).closest(".k-editor").find(".k-editor-toolbar");
			if (i)
				for (a = 0; i.length > a; a++)
					r = i[a], d = null, e.isPlainObject(r) ? r.name && t.tools[r.name] ? (e.extend(t.tools[r.name].options, r), c[r.name] = t.tools[r.name], d = c[r.name].options) : (d = s({ cssClass: "k-i-custom", type: "button", tooltip: "" }, r), d.name && (d.cssClass = "k-" + ("custom" == d.name ? "i-custom" : d.name)), d.template || "button" == d.type && (d.template = p.buttonTemplate)) : t.tools[r] && (c[r] = t.tools[r], d = c[r].options), d && (l = d.template, l && (l.getHtml ? l = l.getHtml() : (e.isFunction(l) || (l = n.template(l)), l = l(d)), 0 !== l.indexOf("<li") && (l = "<li class='k-editor-template'>" + l + "</li>"), o = e(l).appendTo(f), "button" == d.type && d.exec && o.find(".k-tool-icon").click(e.proxy(d.exec, t.element[0]))));
			for (a = 0; u.length > a; a++)
				c[u[a]] || (c[u[a]] = t.tools[u[a]]);
			t.options.tools = c
		}, decorateStyleToolItems: function (t) {
			var i = t.data.closest(".k-editor").find(".k-style").data("kendoSelectBox");
			if (i) {
				var r = i.dataSource.view();
				i.list.find(".k-item").each(function (i, o) {
					var a = e(o), s = a.text(), l = n.ui.editor.Dom.inlineStyle(t.data.data("kendoEditor").document, "span", { className: r[i].value });
					a.html('<span unselectable="on" style="display:block;' + l + '">' + s + "</span>")
				})
			}
		}, createContentElement: function (t, i) {
			var r, o, a, s = n.support.isRtl(t) ? "direction:rtl;" : "";
			return t.hide(), r = e("<iframe />", { src: 'javascript:""', frameBorder: "0" }).css("display", "").addClass("k-content").insertBefore(t)[0], o = r.contentWindow || r, i.length > 0 && e(r).one("load", t, p.decorateStyleToolItems), a = o.document || r.contentDocument, a.open(), a.write("<!DOCTYPE html><html><head><meta charset='utf-8' /><style>html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;height:100%;min-height:100%;}html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;word-wrap: break-word;-webkit-nbsp-mode: space;-webkit-line-break: after-white-space;" + s + "}" + "h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}" + "p{margin:0 0 1em;padding:0 .2em}.k-marker{display:none;}.k-paste-container{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}" + "ul,ol{padding-left:2.5em}" + "a{color:#00a}" + "code{font-size:1.23em}" + "</style>" + e.map(i, function (e) {
				return "<link rel='stylesheet' href='" + e + "'>"
			}).join("") + "</head><body contenteditable='true'></body></html>"), a.close(), o
		}, initializeContentElement: function (n) {
			var i = !0;
			n.window = p.createContentElement(e(n.textarea), n.options.stylesheets), n.document = n.window.contentDocument || n.window.document, n.body = n.document.body, e(n.document).on("keydown" + d, function (e) {
				if (e.keyCode === c.F10)
					return setTimeout(function () {
						var e = "tabIndex", t = n.wrapper, i = t.attr(e);
						t.attr(e, i || 0).focus().find("li:has(" + h + ")").first().focus(), i || 0 === i || t.removeAttr(e)
					}, 100), e.preventDefault(), t;
				var r = n.keyboard.toolFromShortcut(n.options.tools, e);
				if (r)
					return e.preventDefault(), /undo|redo/.test(r) || n.keyboard.endTyping(!0), n.exec(r), !1;
				if (n.keyboard.isTypingKey(e) && n.pendingFormats.hasPending())
					if (i)
						i = !1;
					else {
						var o = n.getRange();
						n.pendingFormats.apply(o), n.selectRange(o)
					}
				n.keyboard.clearTimeout(), n.keyboard.keydown(e)
			}).on("keyup" + d, function (t) {
				var r = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];
				if ((e.inArray(t.keyCode, r) > -1 || 65 == t.keyCode && t.ctrlKey && !t.altKey && !t.shiftKey) && (n.pendingFormats.clear(), f(n)), n.keyboard.isTypingKey(t)) {
					if (n.pendingFormats.hasPending()) {
						var o = n.getRange();
						n.pendingFormats.apply(o), n.selectRange(o)
					}
				}
				else
					i = !0;
				n.keyboard.keyup(t)
			}).on("mousedown" + d, function (t) {
				n.pendingFormats.clear();
				var i = e(t.target);
				!a.gecko && 2 == t.which && i.is("a[href]") && window.open(i.attr("href"), "_new")
			}).on("mouseup" + d, function () {
				f(n)
			}), e(n.window).on("blur" + d, function () {
				var e = n.textarea.value, t = n.encodedValue();
				n.update(), t != e && n.trigger("change")
			}), e(n.body).on("cut" + d + " paste" + d, function (e) {
				n.clipboard["on" + e.type](e)
			})
		}, formatByName: function (t, n) {
			for (var i = 0; n.length > i; i++)
				if (e.inArray(t, n[i].tags) >= 0)
					return n[i]
		}, registerTool: function (e, t) {
			var n = x.fn._tools;
			n[e] = t, n[e].options && n[e].options.template && (n[e].options.template.options.cssClass = "k-" + e)
		}, registerFormat: function (e, t) {
			n.ui.Editor.fn.options.formats[e] = t
		}, createDialog: function (t, i, r) {
			var o = n.support.isRtl(i.wrapper), a = e(t).appendTo(document.body).kendoWindow(r);
			return o && a.closest(".k-window").addClass("k-rtl"), a
		}
	}, f = p.select, h = p.focusable, m = p.wrapTextarea, g = p.renderTools, v = p.initializeContentElement, b = { bold: "Bold", italic: "Italic", underline: "Underline", strikethrough: "Strikethrough", superscript: "Superscript", subscript: "Subscript", justifyCenter: "Center text", justifyLeft: "Align text left", justifyRight: "Align text right", justifyFull: "Justify", insertUnorderedList: "Insert unordered list", insertOrderedList: "Insert ordered list", indent: "Indent", outdent: "Outdent", createLink: "Insert hyperlink", unlink: "Remove hyperlink", insertImage: "Insert image", insertHtml: "Insert HTML", fontName: "Select font family", fontNameInherit: "(inherited font)", fontSize: "Select font size", fontSizeInherit: "(inherited size)", formatBlock: "Format", foreColor: "Color", backColor: "Background color", style: "Styles", emptyFolder: "Empty Folder", uploadFile: "Upload", orderBy: "Arrange by:", orderBySize: "Size", orderByName: "Name", invalidFileType: 'The selected file "{0}" is not valid. Supported file types are {1}.', deleteFile: 'Are you sure you want to delete "{0}"?', overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?', directoryNotFound: "A directory with this name was not found.", imageWebAddress: "Web address", imageAltText: "Alternate text", linkWebAddress: "Web address", linkText: "Text", linkToolTip: "ToolTip", linkOpenInNewWindow: "Open link in new window", dialogInsert: "Insert", dialogButtonSeparator: "or", dialogCancel: "Cancel" }, _ = !o || o.ios && o.flatVersion >= 500 || !o.ios && document.documentElement.contentEditable !== t, x = r.extend({ init: function (t, i) {
		function o(t) {
			var n = e.grep(t.className.split(" "), function (e) {
				return !/^k-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(e)
			});
			return n[0] ? n[0].substring(n[0].lastIndexOf("-") + 1) : "custom"
		}
		function a(e, t) {
			if (!t.key)
				return e;
			var n = e + " (";
			return t.ctrl && (n += "Ctrl + "), t.shift && (n += "Shift + "), t.alt && (n += "Alt + "), n += t.key + ")"
		}
		if (_) {
			var s, u, p = this, f = n.ui.editor;
			r.fn.init.call(p, t, i), p.tools = l({}, n.ui.Editor.fn._tools), p.options = l({}, p.options, i), t = e(t), t.closest("form").on("submit" + d, function () {
				p.update()
			});
			for (var x in p.tools)
				p.tools[x].name = x.toLowerCase();
			p.textarea = t.attr("autocomplete", "off")[0], s = p.wrapper = m(t), p.textarea.id && s.find(".k-editor-toolbar").attr("aria-controls", p.textarea.id), g(p, p.options.tools), v(p), p.keyboard = new f.Keyboard([new f.TypingHandler(p), new f.SystemHandler(p)]), p.clipboard = new f.Clipboard(this), p.pendingFormats = new f.PendingFormats(this), p.undoRedoStack = new f.UndoRedoStack, u = i && i.value ? i.value : t.val().replace(/[\r\n\v\f\t ]+/gi, " "), p.value(u);
			var k = ".k-editor-toolbar > li > *, .k-editor-toolbar > li select", w = ".k-editor-button .k-tool-icon", y = w + ":not(.k-state-disabled)", C = w + ".k-state-disabled";
			s.find(".k-combobox .k-input").keydown(function (t) {
				var n = e(this).closest(".k-combobox").data("kendoComboBox"), i = t.keyCode;
				i == c.RIGHT || i == c.LEFT ? n.close() : i == c.DOWN && (n.dropDown.isOpened() || (t.stopImmediatePropagation(), n.open()))
			}), s.on("mouseenter" + d, y, function () {
				e(this).addClass("k-state-hover")
			}).on("mouseleave" + d, y, function () {
				e(this).removeClass("k-state-hover")
			}).on("mousedown" + d, w, !1).on("keydown" + d, h, function (t) {
				var n, i = e(this).closest("li"), r = "li:has(" + h + ")", o = t.keyCode;
				if (o == c.RIGHT)
					n = i.nextAll(r).first().find(h);
				else if (o == c.LEFT)
					n = i.prevAll(r).first().find(h);
				else if (o == c.ESC)
					n = p;
				else if (o == c.TAB && !t.ctrlKey && !t.altKey)
					if (t.shiftKey) {
						if (n = i.prevAll(r).first().find(h), !n.length)
							return;
						t.preventDefault()
					}
					else
						t.preventDefault(), n = i.nextAll(r).first().find(h), n.length || (n = p);
				n && n.focus()
			}).on("click" + d, y, function (e) {
				e.preventDefault(), e.stopPropagation(), p.exec(o(this))
			}).on("click" + d, C, function (e) {
				e.preventDefault()
			}).find(k).each(function () {
				var t = o(this), n = p.options, i = n.tools[t], r = n.messages[t], s = e(this);
				if (i) {
					if ("fontSize" == t || "fontName" == t) {
						var l = n.messages[t + "Inherit"] || b[t + "Inherit"];
						s.find("input").val(l).end().find("span.k-input").text(l).end()
					}
					i.initialize(s, { title: a(r, i), editor: p })
				}
			}), p.bind("select", function () {
				var t = p.getRange(), n = f.RangeUtils.textNodes(t);
				n.length || (n = [t.startContainer]), s.find(k).each(function () {
					var t = p.options.tools[o(this)];
					t && t.update(e(this), n, p.pendingFormats)
				})
			}), p._DOMNodeInsertedHandler = function (e) {
				p._DOMNodeInserted(e)
			}, p._endTypingHandler = function () {
				p._endTyping()
			}, e(document).on("DOMNodeInserted", p._DOMNodeInsertedHandler).on("mousedown", p._endTypingHandler), n.notify(p)
		}
	}, _endTyping: function () {
		var e = this;
		try {
			e.keyboard.isTypingInProgress() && e.keyboard.endTyping(!0), e.selectionRestorePoint || (e.selectionRestorePoint = new n.ui.editor.RestorePoint(e.getRange()))
		}
		catch (t) {
		}
	}, _DOMNodeInserted: function (t) {
		var n = this, i = n.wrapper;
		(e.contains(t.target, i[0]) || i[0] == t.target) && (n.textarea.value = n.value(), i.find("iframe").remove(), v(n), n.value(n.textarea.value))
	}, events: ["select", "change", "execute", "error", "paste", "keydown", "keyup"], options: { name: "Editor", messages: b, formats: {}, encoded: !0, stylesheets: [], dialogOptions: { modal: !0, resizable: !1, draggable: !0, animation: !1 }, fontName: [{ text: "Arial", value: "Arial,Helvetica,sans-serif" }, { text: "Courier New", value: "'Courier New',Courier,monospace" }, { text: "Georgia", value: "Georgia,serif" }, { text: "Impact", value: "Impact,Charcoal,sans-serif" }, { text: "Lucida Console", value: "'Lucida Console',Monaco,monospace" }, { text: "Tahoma", value: "Tahoma,Geneva,sans-serif" }, { text: "Times New Roman", value: "'Times New Roman',Times,serif" }, { text: "Trebuchet MS", value: "'Trebuchet MS',Helvetica,sans-serif" }, { text: "Verdana", value: "Verdana,Geneva,sans-serif"}], fontSize: [{ text: "1 (8pt)", value: "xx-small" }, { text: "2 (10pt)", value: "x-small" }, { text: "3 (12pt)", value: "small" }, { text: "4 (14pt)", value: "medium" }, { text: "5 (18pt)", value: "large" }, { text: "6 (24pt)", value: "x-large" }, { text: "7 (36pt)", value: "xx-large"}], formatBlock: [{ text: "Paragraph", value: "p" }, { text: "Quotation", value: "blockquote" }, { text: "Heading 1", value: "h1" }, { text: "Heading 2", value: "h2" }, { text: "Heading 3", value: "h3" }, { text: "Heading 4", value: "h4" }, { text: "Heading 5", value: "h5" }, { text: "Heading 6", value: "h6"}], tools: ["bold", "italic", "underline", "strikethrough", "fontName", "fontSize", "foreColor", "backColor", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "formatBlock", "createLink", "unlink", "insertImage"] }, destroy: function () {
		var t = this;
		r.fn.destroy.call(t), e(t.window).add(t.document).add(t.wrapper).add(t.element.closest("form")).off(d), e(document).off("DOMNodeInserted", t._DOMNodeInsertedHandler).off("mousedown", t._endTypingHandler), n.destroy(t.wrapper)
	}, _nativeTools: ["insertLineBreak", "insertParagraph", "redo", "undo", "insertHtml"], _tools: { undo: { options: { key: "Z", ctrl: !0} }, redo: { options: { key: "Y", ctrl: !0}} }, tools: {}, value: function (i) {
		var r = this.body, o = n.ui.editor.Dom, s = n.ui.editor.Serializer.domToXhtml(r);
		if (i === t)
			return s;
		if (i != s) {
			if (this.pendingFormats.clear(), i = (i || "").replace(/<!\[CDATA\[(.*)?\]\]>/g, "<!--[CDATA[$1]]-->").replace(/<script([^>]*)>(.*)?<\/script>/gi, "<telerik:script $1>$2</telerik:script>").replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/gi, "$1"), a.msie || (i = i.replace(/<p([^>]*)>(\s*)?<\/p>/gi, '<p $1><br _moz_dirty="" /></p>')), a.msie && 9 > parseInt(a.version, 10)) {
				i = "<br/>" + i;
				var l = "originalsrc", d = "originalhref";
				i = i.replace(/href\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, d + '="$1"'), i = i.replace(/src\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, l + '="$1"'), r.innerHTML = i, o.remove(r.firstChild), e(r).find("telerik\\:script,script,link,img,a").each(function () {
					var e = this;
					e[d] && (e.setAttribute("href", e[d]), e.removeAttribute(d)), e[l] && (e.setAttribute("src", e[l]), e.removeAttribute(l))
				})
			}
			else
				r.innerHTML = i, a.msie && (o.normalize(r), setTimeout(function () {
					var e, t, n, i = r.getElementsByTagName("ol");
					for (e = 0; i.length > e; e++)
						t = i[e], n = t.getAttribute("start"), t.setAttribute("start", 1), n ? t.setAttribute("start", n) : t.removeAttribute(n)
				}, 1));
			this.selectionRestorePoint = null, this.update()
		}
	}, focus: function () {
		this.window.focus()
	}, update: function (e) {
		this.textarea.value = e || this.options.encoded ? this.encodedValue() : this.value()
	}, encodedValue: function () {
		return n.ui.editor.Dom.encode(this.value())
	}, createRange: function (e) {
		return n.ui.editor.RangeUtils.createRange(e || this.document)
	}, getSelection: function () {
		return n.ui.editor.SelectionUtils.selectionFromDocument(this.document)
	}, selectRange: function (e) {
		this.focus();
		var t = this.getSelection();
		t.removeAllRanges(), t.addRange(e)
	}, getRange: function () {
		var e = this.getSelection(), t = e.rangeCount > 0 ? e.getRangeAt(0) : this.createRange(), n = this.document;
		return t.startContainer != n || t.endContainer != n || t.startOffset || t.endOffset || (t.setStart(this.body, 0), t.collapse(!0)), t
	}, selectedHtml: function () {
		return n.ui.editor.Serializer.domToXhtml(this.getRange().cloneContents())
	}, paste: function (e) {
		this.clipboard.paste(e)
	}, exec: function (n, i) {
		var r, o, a, l, d = this, c = "";
		n = n.toLowerCase(), d.keyboard.isTypingInProgress() || (d.focus(), r = d.getRange(), o = d.document.body);
		for (a in d.options.tools)
			if (a.toLowerCase() == n) {
				c = d.options.tools[a];
				break
			}
		if (c) {
			if (r = d.getRange(), !/undo|redo/i.test(n) && c.willDelayExecution(r))
				return l = e.extend({}, c), e.extend(l.options, { params: i }), d.pendingFormats.toggle(l), f(d), t;
			var u = c.command ? c.command(s({ range: r }, i)) : null;
			if (d.trigger("execute", { name: n, command: u }), /undo|redo/i.test(n))
				d.undoRedoStack[n]();
			else if (u && (u.managesUndoRedo || d.undoRedoStack.push(u), u.editor = d, u.exec(), u.async))
				return u.change = e.proxy(function () {
					f(d)
				}, d), t;
			f(d)
		}
	} });
	n.ui.plugin(x);
	var k = i.extend({ init: function (e) {
		this.options = e
	}, initialize: function (e, t) {
		e.attr({ unselectable: "on", title: t.title })
	}, command: function (e) {
		return new this.options.command(e)
	}, update: function () {
	}, willDelayExecution: function () {
		return !1
	} });
	k.exec = function (e, t, n) {
		e.exec(t, { value: n })
	};
	var w = k.extend({ init: function (e) {
		k.fn.init.call(this, e)
	}, command: function (e) {
		var t = this;
		return new n.ui.editor.FormatCommand(s(e, { formatter: t.options.formatter }))
	}, update: function (e, t, n) {
		var i = n.isPending(this.name), r = this.options.finder.isFormatted(t), o = i ? !r : r;
		e.toggleClass("k-state-active", o), e.attr("aria-pressed", o)
	} });
	p.registerTool("separator", new k({ template: new u({ template: p.separatorTemplate }) })), s(n.ui, { editor: { ToolTemplate: u, EditorUtils: p, Tool: k, FormatTool: w} })
}(window.jQuery), function (e) {
	function t(e) {
		var t, n, i = {};
		for (t = 0, n = e.length; n > t; t++)
			i[e[t]] = !0;
		return i
	}
	var n = window.kendo, i = e.map, r = e.extend, o = n.support.browser, a = "style", s = "float", l = "cssFloat", d = "styleFloat", c = "class", u = "k-marker", p = t("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(",")), f = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,pre,script,table,tbody,td,tfoot,th,thead,tr,ul".split(","), h = t(f), m = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var".split(","), g = t(m), v = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected".split(",")), b = function (e) {
		1 == e.nodeType && e.normalize()
	};
	o.msie && parseInt(o.version, 10) >= 8 && (b = function (e) {
		if (1 == e.nodeType && e.firstChild)
			for (var t = e.firstChild, n = t; ;) {
				if (n = n.nextSibling, !n)
					break;
				3 == n.nodeType && 3 == t.nodeType && (n.nodeValue = t.nodeValue + n.nodeValue, A.remove(t)), t = n
			}
	});
	var _ = /^\s+$/, x = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i, k = /&/g, w = /</g, y = />/g, C = /\u00a0/g, T = /\ufeff/g, S = "color,padding-left,padding-right,padding-top,padding-bottom,background-color,background-attachment,background-image,background-position,background-repeat,border-top-style,border-top-width,border-top-color,border-bottom-style,border-bottom-width,border-bottom-color,border-left-style,border-left-width,border-left-color,border-right-style,border-right-width,border-right-color,font-family,font-size,font-style,font-variant,font-weight,line-height".split(","), A = { findNodeIndex: function (e) {
		for (var t = 0; ;) {
			if (e = e.previousSibling, !e)
				break;
			t++
		}
		return t
	}, isDataNode: function (e) {
		return e && null !== e.nodeValue && null !== e.data
	}, isAncestorOf: function (t, n) {
		try {
			return !A.isDataNode(t) && (e.contains(t, A.isDataNode(n) ? n.parentNode : n) || n.parentNode == t)
		}
		catch (i) {
			return !1
		}
	}, isAncestorOrSelf: function (e, t) {
		return A.isAncestorOf(e, t) || e == t
	}, findClosestAncestor: function (e, t) {
		if (A.isAncestorOf(e, t))
			for (; t && t.parentNode != e;)
				t = t.parentNode;
		return t
	}, getNodeLength: function (e) {
		return A.isDataNode(e) ? e.length : e.childNodes.length
	}, splitDataNode: function (e, t) {
		for (var n = e.cloneNode(!1), i = "", r = e; r.nextSibling && 3 == r.nextSibling.nodeType && r.nextSibling.nodeValue;)
			i += r.nextSibling.nodeValue, r = r.nextSibling;
		e.deleteData(t, e.length), n.deleteData(0, t), n.nodeValue += i, A.insertAfter(n, e)
	}, attrEquals: function (t, n) {
		for (var i in n) {
			var r = t[i];
			if (i == s && (r = t[e.support.cssFloat ? l : d]), "object" == typeof r) {
				if (!A.attrEquals(r, n[i]))
					return !1
			}
			else if (r != n[i])
				return !1
		}
		return !0
	}, blockParentOrBody: function (e) {
		return A.parentOfType(e, f) || e.ownerDocument.body
	}, blockParents: function (t) {
		var n, i, r = [];
		for (n = 0, i = t.length; i > n; n++) {
			var o = A.parentOfType(t[n], A.blockElements);
			o && 0 > e.inArray(o, r) && r.push(o)
		}
		return r
	}, windowFromDocument: function (e) {
		return e.defaultView || e.parentWindow
	}, normalize: b, blockElements: f, inlineElements: m, empty: p, fillAttrs: v, toHex: function (e) {
		var t = x.exec(e);
		return t ? "#" + i(t.slice(1), function (e) {
			return e = parseInt(e, 10).toString(16), e.length > 1 ? e : "0" + e
		}).join("") : e
	}, encode: function (e) {
		return e.replace(k, "&amp;").replace(w, "&lt;").replace(y, "&gt;").replace(C, "&nbsp;")
	}, name: function (e) {
		return e.nodeName.toLowerCase()
	}, significantChildNodes: function (t) {
		return e.grep(t.childNodes, function (e) {
			return 3 != e.nodeType || !A.isWhitespace(e)
		})
	}, lastTextNode: function (e) {
		var t = null;
		if (3 == e.nodeType)
			return e;
		for (var n = e.lastChild; n; n = n.previousSibling)
			if (t = A.lastTextNode(n))
				return t;
		return t
	}, is: function (e, t) {
		return A.name(e) == t
	}, isMarker: function (e) {
		return e.className == u
	}, isWhitespace: function (e) {
		return _.test(e.nodeValue)
	}, isBlock: function (e) {
		return h[A.name(e)]
	}, isEmpty: function (e) {
		return p[A.name(e)]
	}, isInline: function (e) {
		return g[A.name(e)]
	}, scrollTo: function (t) {
		var n, i, r = t.ownerDocument.body, o = e(A.isDataNode(t) ? t.parentNode : t), a = A.windowFromDocument(t.ownerDocument).innerHeight;
		"br" == A.name(o[0]) && (o = o.parent()), n = o.offset().top, i = o[0].offsetHeight, i + n > r.scrollTop + a && (r.scrollTop = i + n - a)
	}, insertAt: function (e, t, n) {
		e.insertBefore(t, e.childNodes[n] || null)
	}, insertBefore: function (e, t) {
		return t.parentNode ? t.parentNode.insertBefore(e, t) : t
	}, insertAfter: function (e, t) {
		return t.parentNode.insertBefore(e, t.nextSibling)
	}, remove: function (e) {
		e.parentNode.removeChild(e)
	}, trim: function (e) {
		for (var t = e.childNodes.length - 1; t >= 0; t--) {
			var n = e.childNodes[t];
			A.isDataNode(n) ? (n.nodeValue.replace(T, "").length || A.remove(n), A.isWhitespace(n) && A.insertBefore(n, e)) : n.className != u && (A.trim(n), n.childNodes.length || A.isEmpty(n) || A.remove(n))
		}
		return e
	}, parentOfType: function (e, t) {
		do
			e = e.parentNode;
		while (e && !A.ofType(e, t));
		return e
	}, ofType: function (t, n) {
		return e.inArray(A.name(t), n) >= 0
	}, changeTag: function (e, t) {
		var n, i, r, o, s, l = A.create(e.ownerDocument, t), d = e.attributes;
		for (n = 0, i = d.length; i > n; n++)
			s = d[n], s.specified && (r = s.nodeName, o = s.nodeValue, r == c ? l.className = o : r == a ? l.style.cssText = e.style.cssText : l.setAttribute(r, o));
		for (; e.firstChild;)
			l.appendChild(e.firstChild);
		return A.insertBefore(l, e), A.remove(e), l
	}, wrap: function (e, t) {
		return A.insertBefore(t, e), t.appendChild(e), t
	}, unwrap: function (e) {
		for (var t = e.parentNode; e.firstChild;)
			t.insertBefore(e.firstChild, e);
		t.removeChild(e)
	}, create: function (e, t, n) {
		return A.attr(e.createElement(t), n)
	}, attr: function (e, t) {
		return t = r({}, t), t && a in t && (A.style(e, t.style), delete t.style), r(e, t)
	}, style: function (t, n) {
		e(t).css(n || {})
	}, unstyle: function (t, n) {
		for (var i in n)
			i == s && (i = e.support.cssFloat ? l : d), t.style[i] = "";
		"" === t.style.cssText && t.removeAttribute(a)
	}, inlineStyle: function (t, n, r) {
		var a, s = e(A.create(t, n, r));
		return t.body.appendChild(s[0]), a = i(S, function (e) {
			return o.msie && "line-height" == e && "1px" == s.css(e) ? "line-height:1.5" : e + ":" + s.css(e)
		}).join(";"), s.remove(), a
	}, removeClass: function (t, n) {
		var i, r, o = " " + t.className + " ", a = n.split(" ");
		for (i = 0, r = a.length; r > i; i++)
			o = o.replace(" " + a[i] + " ", " ");
		o = e.trim(o), o.length ? t.className = o : t.removeAttribute(c)
	}, commonAncestor: function () {
		var e, t, n, i, r, o = arguments.length, a = [], s = 1 / 0, l = null;
		if (!o)
			return null;
		if (1 == o)
			return arguments[0];
		for (e = 0; o > e; e++) {
			for (t = [], n = arguments[e]; n;)
				t.push(n), n = n.parentNode;
			a.push(t.reverse()), s = Math.min(s, t.length)
		}
		if (1 == o)
			return a[0][0];
		for (e = 0; s > e; e++) {
			for (i = a[0][e], r = 1; o > r; r++)
				if (i != a[r][e])
					return l;
			l = i
		}
		return l
	} };
	n.ui.editor.Dom = A
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.ui.editor, r = i.Dom, o = e.extend, a = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","), s = /"/g, l = /<br[^>]*>/i, d = /<p><\/p>/i, c = /([\w|\-]+)\s*:\s*([^;]+);?/i, u = { domToXhtml: function (n) {
		function i(n) {
			var i, o, a, l = [], d = n.attributes, u = e.trim;
			if (r.is(n, "img")) {
				var f = n.style.width, h = n.style.height, m = e(n);
				f && (m.attr("width", parseInt(f, 10)), r.unstyle(n, { width: t })), h && (m.attr("height", parseInt(h, 10)), r.unstyle(n, { height: t }))
			}
			for (o = 0, a = d.length; a > o; o++) {
				i = d[o];
				var g = i.nodeName;
				(i.specified || "value" == g && !n.value || "type" == g && "text" == i.nodeValue) && 0 > g.indexOf("_moz") && "complete" != g && "altHtml" != g && l.push(i)
			}
			if (l.length)
				for (l.sort(function (e, t) {
					return e.nodeName > t.nodeName ? 1 : t.nodeName > e.nodeName ? -1 : 0
				}), o = 0, a = l.length; a > o; o++) {
					i = l[o];
					var v = i.nodeName, b = i.nodeValue;
					if (p.push(" "), p.push(v), p.push('="'), "style" == v)
						for (var _ = u(b || n.style.cssText).split(";"), x = 0, k = _.length; k > x; x++) {
							var w = _[x];
							if (w.length) {
								var y = c.exec(w), C = u(y[1].toLowerCase()), T = u(y[2]);
								if ("font-size-adjust" == C || "font-stretch" == C)
									continue;
								C.indexOf("color") >= 0 && (T = r.toHex(T)), C.indexOf("font") >= 0 && (T = T.replace(s, "'")), p.push(C), p.push(":"), p.push(T), p.push(";")
							}
						}
					else
						"src" == v || "href" == v ? p.push(n.getAttribute(v, 2)) : p.push(r.fillAttrs[v] ? v : b);
					p.push('"')
				}
		}
		function o(e, t) {
			for (var n = e.firstChild; n; n = n.nextSibling)
				u(n, t)
		}
		function u(n, a) {
			var s, l, d, c, u, h = n.nodeType;
			if (1 == h) {
				if (s = r.name(n), !s || (n.attributes._moz_dirty || n.attributes._moz_editor_bogus_node) && r.is(n, "br") || "k-marker" == n.className)
					return;
				if (l = f[s])
					return l.start(n), o(n), l.end(n), t;
				p.push("<"), p.push(s), i(n), r.empty[s] ? p.push(" />") : (p.push(">"), o(n, a || r.is(n, "pre")), p.push("</"), p.push(s), p.push(">"))
			}
			else
				3 == h ? (c = n.nodeValue, !a && e.support.leadingWhitespace && (d = n.parentNode, u = n.previousSibling, u || (u = (r.isInline(d) ? d : n).previousSibling), (!u || "" === u.innerHTML || r.isBlock(u)) && (c = c.replace(/^[\r\n\v\f\t ]+/, "")), c = c.replace(/ +/, " ")), p.push(r.encode(c))) : 4 == h ? (p.push("<![CDATA["), p.push(n.data), p.push("]]>")) : 8 == h && (0 > n.data.indexOf("[CDATA[") ? (p.push("<!--"), p.push(n.data), p.push("-->")) : (p.push("<!"), p.push(n.data), p.push(">")))
		}
		var p = [], f = { "telerik:script": { start: function (e) {
			p.push("<script"), i(e), p.push(">")
		}, end: function () {
			p.push("</script>")
		} }, b: { start: function () {
			p.push("<strong>")
		}, end: function () {
			p.push("</strong>")
		} }, i: { start: function () {
			p.push("<em>")
		}, end: function () {
			p.push("</em>")
		} }, u: { start: function () {
			p.push('<span style="text-decoration:underline;">')
		}, end: function () {
			p.push("</span>")
		} }, iframe: { start: function (e) {
			p.push("<iframe"), i(e), p.push(">")
		}, end: function () {
			p.push("</iframe>")
		} }, font: { start: function (e) {
			p.push('<span style="');
			var t = e.getAttribute("color"), n = a[e.getAttribute("size")], i = e.getAttribute("face");
			t && (p.push("color:"), p.push(r.toHex(t)), p.push(";")), i && (p.push("font-face:"), p.push(i), p.push(";")), n && (p.push("font-size:"), p.push(n), p.push(";")), p.push('">')
		}, end: function () {
			p.push("</span>")
		} } };
		return o(n), p = p.join(""), "" === p.replace(l, "").replace(d, "") ? "" : p
	} };
	o(i, { Serializer: u })
}(window.kendo.jQuery), function (e) {
	function t(e, t, n, i) {
		if (e == t)
			return i - n;
		for (var r = t; r && r.parentNode != e;)
			r = r.parentNode;
		if (r)
			return p(r) - n;
		for (r = e; r && r.parentNode != t;)
			r = r.parentNode;
		if (r)
			return i - p(r) - 1;
		for (var o = u.commonAncestor(e, t), a = e; a && a.parentNode != o;)
			a = a.parentNode;
		a || (a = o);
		for (var s = t; s && s.parentNode != o;)
			s = s.parentNode;
		return s || (s = o), a == s ? 0 : p(s) - p(a)
	}
	function n(e, n) {
		function i(e) {
			try {
				return 0 > t(e.startContainer, e.endContainer, e.startOffset, e.endOffset)
			}
			catch (n) {
				return !0
			}
		}
		i(e) && (n ? (e.commonAncestorContainer = e.endContainer = e.startContainer, e.endOffset = e.startOffset) : (e.commonAncestorContainer = e.startContainer = e.endContainer, e.startOffset = e.endOffset), e.collapsed = !0)
	}
	function i(e) {
		e.collapsed = e.startContainer == e.endContainer && e.startOffset == e.endOffset;
		for (var t = e.startContainer; t && t != e.endContainer && !u.isAncestorOf(t, e.endContainer);)
			t = t.parentNode;
		e.commonAncestorContainer = t
	}
	function r(e, t, n) {
		var i = t[n ? "startContainer" : "endContainer"], r = t[n ? "startOffset" : "endOffset"], o = 0, a = f(i) ? i : i.childNodes[r] || null, s = f(i) ? i.parentNode : i;
		(3 == i.nodeType || 4 == i.nodeType) && (o = r);
		var l = s.insertBefore(u.create(t.ownerDocument, "a"), a), d = t.ownerDocument.body.createTextRange();
		d.moveToElementText(l), u.remove(l), d[n ? "moveStart" : "moveEnd"]("character", o), d.collapse(!1), e.setEndPoint(n ? "StartToStart" : "EndToStart", d)
	}
	function o(e, t, n) {
		var i = u.create(t.ownerDocument, "a"), r = e.duplicate();
		r.collapse(n);
		var o = r.parentElement();
		do
			o.insertBefore(i, i.previousSibling), r.moveToElementText(i);
		while (r.compareEndPoints(n ? "StartToStart" : "StartToEnd", e) > 0 && i.previousSibling);
		r.setEndPoint(n ? "EndToStart" : "EndToEnd", e);
		var a = i.nextSibling;
		return a ? (u.remove(i), f(a) ? t[n ? "setStart" : "setEnd"](a, r.text.length) : t[n ? "setStartBefore" : "setEndBefore"](a), void 0) : (a = i.previousSibling, a && f(a) ? (t.setEnd(a, a.nodeValue.length), u.remove(i)) : (t.selectNodeContents(o), u.remove(i), t.endOffset -= 1), void 0)
	}
	var a = window.kendo, s = a.Class, l = e.extend, d = a.ui.editor, c = a.support.browser, u = d.Dom, p = u.findNodeIndex, f = u.isDataNode, h = u.findClosestAncestor, m = u.getNodeLength, g = u.normalize, v = { selectionFromWindow: function (e) {
		return c.msie && 9 > c.version ? new x(e.document) : e.getSelection()
	}, selectionFromRange: function (e) {
		var t = T.documentFromRange(e);
		return v.selectionFromDocument(t)
	}, selectionFromDocument: function (e) {
		return v.selectionFromWindow(u.windowFromDocument(e))
	} }, b = s.extend({ init: function (t) {
		e.extend(this, { ownerDocument: t, startContainer: t, endContainer: t, commonAncestorContainer: t, startOffset: 0, endOffset: 0, collapsed: !0 })
	}, setStart: function (e, t) {
		this.startContainer = e, this.startOffset = t, i(this), n(this, !0)
	}, setEnd: function (e, t) {
		this.endContainer = e, this.endOffset = t, i(this), n(this, !1)
	}, setStartBefore: function (e) {
		this.setStart(e.parentNode, p(e))
	}, setStartAfter: function (e) {
		this.setStart(e.parentNode, p(e) + 1)
	}, setEndBefore: function (e) {
		this.setEnd(e.parentNode, p(e))
	}, setEndAfter: function (e) {
		this.setEnd(e.parentNode, p(e) + 1)
	}, selectNode: function (e) {
		this.setStartBefore(e), this.setEndAfter(e)
	}, selectNodeContents: function (e) {
		this.setStart(e, 0), this.setEnd(e, e[1 === e.nodeType ? "childNodes" : "nodeValue"].length)
	}, collapse: function (e) {
		var t = this;
		e ? t.setEnd(t.startContainer, t.startOffset) : t.setStart(t.endContainer, t.endOffset)
	}, deleteContents: function () {
		var e = this, t = e.cloneRange();
		e.startContainer != e.commonAncestorContainer && e.setStartAfter(h(e.commonAncestorContainer, e.startContainer)), e.collapse(!0), function n(e) {
			for (; e.next();)
				e.hasPartialSubtree() ? n(e.getSubtreeIterator()) : e.remove()
		}(new _(t))
	}, cloneContents: function () {
		var e = T.documentFromRange(this);
		return function t(n) {
			for (var i, r = e.createDocumentFragment(); i = n.next();)
				i = i.cloneNode(!n.hasPartialSubtree()), n.hasPartialSubtree() && i.appendChild(t(n.getSubtreeIterator())), r.appendChild(i);
			return r
		}(new _(this))
	}, extractContents: function () {
		var e = this, t = e.cloneRange();
		e.startContainer != e.commonAncestorContainer && e.setStartAfter(h(e.commonAncestorContainer, e.startContainer)), e.collapse(!0);
		var n = T.documentFromRange(e);
		return function i(t) {
			for (var r, o = n.createDocumentFragment(); r = t.next();)
				t.hasPartialSubtree() ? (r = r.cloneNode(!1), r.appendChild(i(t.getSubtreeIterator()))) : t.remove(e.originalRange), o.appendChild(r);
			return o
		}(new _(t))
	}, insertNode: function (e) {
		var t = this;
		f(t.startContainer) ? (t.startOffset != t.startContainer.nodeValue.length && u.splitDataNode(t.startContainer, t.startOffset), u.insertAfter(e, t.startContainer)) : u.insertAt(t.startContainer, e, t.startOffset), t.setStart(t.startContainer, t.startOffset)
	}, cloneRange: function () {
		return e.extend(new b(this.ownerDocument), { startContainer: this.startContainer, endContainer: this.endContainer, commonAncestorContainer: this.commonAncestorContainer, startOffset: this.startOffset, endOffset: this.endOffset, collapsed: this.collapsed, originalRange: this })
	}, toString: function () {
		var e = this.startContainer.nodeName, t = this.endContainer.nodeName;
		return ["#text" == e ? this.startContainer.nodeValue : e, "(", this.startOffset, ") : ", "#text" == t ? this.endContainer.nodeValue : t, "(", this.endOffset, ")"].join("")
	} }), _ = s.extend({ init: function (t) {
		if (e.extend(this, { range: t, _current: null, _next: null, _end: null }), !t.collapsed) {
			var n = t.commonAncestorContainer;
			this._next = t.startContainer != n || f(t.startContainer) ? h(n, t.startContainer) : t.startContainer.childNodes[t.startOffset], this._end = t.endContainer != n || f(t.endContainer) ? h(n, t.endContainer).nextSibling : t.endContainer.childNodes[t.endOffset]
		}
	}, hasNext: function () {
		return !!this._next
	}, next: function () {
		var e = this, t = e._current = e._next;
		return e._next = e._current && e._current.nextSibling != e._end ? e._current.nextSibling : null, f(e._current) && (e.range.endContainer == e._current && (t = t.cloneNode(!0), t.deleteData(e.range.endOffset, t.length - e.range.endOffset)), e.range.startContainer == e._current && (t = t.cloneNode(!0), t.deleteData(0, e.range.startOffset))), t
	}, traverse: function (e) {
		function t() {
			return i._current = i._next, i._next = i._current && i._current.nextSibling != i._end ? i._current.nextSibling : null, i._current
		}
		for (var n, i = this; n = t();)
			i.hasPartialSubtree() ? i.getSubtreeIterator().traverse(e) : e(n);
		return n
	}, remove: function (e) {
		var t, n, i, r = this, o = r.range.startContainer == r._current, a = r.range.endContainer == r._current;
		if (f(r._current) && (o || a))
			t = o ? r.range.startOffset : 0, n = a ? r.range.endOffset : r._current.length, i = n - t, e && (o || a) && (r._current == e.startContainer && e.startOffset >= t && (e.startOffset -= i), r._current == e.endContainer && e.endOffset >= n && (e.endOffset -= i)), r._current.deleteData(t, i);
		else {
			var s = r._current.parentNode;
			if (e && (r.range.startContainer == s || r.range.endContainer == s)) {
				var l = p(r._current);
				s == e.startContainer && e.startOffset >= l && (e.startOffset -= 1), s == e.endContainer && e.endOffset > l && (e.endOffset -= 1)
			}
			u.remove(r._current)
		}
	}, hasPartialSubtree: function () {
		return !f(this._current) && (u.isAncestorOrSelf(this._current, this.range.startContainer) || u.isAncestorOrSelf(this._current, this.range.endContainer))
	}, getSubtreeIterator: function () {
		var e = this, t = e.range.cloneRange();
		return t.selectNodeContents(e._current), u.isAncestorOrSelf(e._current, e.range.startContainer) && t.setStart(e.range.startContainer, e.range.startOffset), u.isAncestorOrSelf(e._current, e.range.endContainer) && t.setEnd(e.range.endContainer, e.range.endOffset), new _(t)
	} }), x = s.extend({ init: function (e) {
		this.ownerDocument = e, this.rangeCount = 1
	}, addRange: function (e) {
		var t = this.ownerDocument.body.createTextRange();
		r(t, e, !1), r(t, e, !0), t.select()
	}, removeAllRanges: function () {
		this.ownerDocument.selection.empty()
	}, getRangeAt: function () {
		var e, t, n = new b(this.ownerDocument), i = this.ownerDocument.selection;
		try {
			if (e = i.createRange(), t = e.item ? e.item(0) : e.parentElement(), t.ownerDocument != this.ownerDocument)
				return n
		}
		catch (r) {
			return n
		}
		if ("Control" == i.type)
			n.selectNode(e.item(0));
		else {
			o(e, n, !0), o(e, n, !1), 9 == n.startContainer.nodeType && n.setStart(n.endContainer, n.startOffset), 9 == n.endContainer.nodeType && n.setEnd(n.startContainer, n.endOffset), 0 === e.compareEndPoints("StartToEnd", e) && n.collapse(!1);
			var a = n.startContainer, s = n.endContainer, l = this.ownerDocument.body;
			if (!(n.collapsed || 0 !== n.startOffset || n.endOffset != m(n.endContainer) || a == s && f(a) && a.parentNode == l)) {
				for (var d = !1, c = !1; 0 === p(a) && a == a.parentNode.firstChild && a != l;)
					a = a.parentNode, d = !0;
				for (; p(s) == m(s.parentNode) - 1 && s == s.parentNode.lastChild && s != l;)
					s = s.parentNode, c = !0;
				a == l && s == l && d && c && (n.setStart(a, 0), n.setEnd(s, m(l)))
			}
		}
		return n
	} }), k = s.extend({ init: function (e) {
		this.enumerate = function () {
			function t(e) {
				if (u.is(e, "img") || 3 == e.nodeType && !u.isWhitespace(e))
					n.push(e);
				else
					for (e = e.firstChild; e;)
						t(e), e = e.nextSibling
			}
			var n = [];
			return new _(e).traverse(t), n
		}
	} }), w = s.extend({
		init: function (e) {
			var t = this;
			t.range = e, t.rootNode = T.documentFromRange(e), t.body = t.rootNode.body, t.html = t.body.innerHTML, t.startContainer = t.nodeToPath(e.startContainer), t.endContainer = t.nodeToPath(e.endContainer), t.startOffset = t.offset(e.startContainer, e.startOffset), t.endOffset = t.offset(e.endContainer, e.endOffset)
		}, index: function (e) {
			for (var t = 0, n = e.nodeType; e = e.previousSibling;) {
				var i = e.nodeType;
				(3 != i || n != i) && t++, n = i
			}
			return t
		}, offset: function (e, t) {
			if (3 == e.nodeType)
				for (; (e = e.previousSibling) && 3 == e.nodeType;)
					t += e.nodeValue.length;
			return t
		}, nodeToPath: function (e) {
			for (var t = []; e != this.rootNode;)
				t.push(this.index(e)), e = e.parentNode;
			return t
		}, toRangePoint: function (e, t, n, i) {
			for (var r = this.rootNode, o = n.length, a = i; o--;)
				r = r.childNodes[n[o]];
			for (; 3 == r.nodeType && a > r.nodeValue.length;)
				a -= r.nodeValue.length, r = r.nextSibling;
			e[t ? "setStart" : "setEnd"](r, a)
		}, toRange: function () {
			var e = this, t = e.range.cloneRange();
			return e.toRangePoint(t, !0, e.startContainer, e.startOffset), e.toRangePoint(t, !1, e.endContainer, e.endOffset), t
		}
	}), y = s.extend({ init: function () {
		this.caret = null
	}, addCaret: function (e) {
		var t = this;
		return t.caret = u.create(T.documentFromRange(e), "span", { className: "k-marker" }), e.insertNode(t.caret), e.selectNode(t.caret), t.caret
	}, removeCaret: function (e) {
		var t = this, n = t.caret.previousSibling, i = 0;
		n && (i = f(n) ? n.nodeValue.length : p(n));
		var r = t.caret.parentNode, o = n ? p(n) : 0;
		u.remove(t.caret), g(r);
		var a = r.childNodes[o];
		if (f(a))
			e.setStart(a, i);
		else if (a) {
			var s = u.lastTextNode(a);
			s ? e.setStart(s, s.nodeValue.length) : e[n ? "setStartAfter" : "setStartBefore"](a)
		}
		else
			c.msie || r.innerHTML || (r.innerHTML = '<br _moz_dirty="" />'), e.selectNodeContents(r);
		e.collapse(!0)
	}, add: function (e, t) {
		var n = this;
		t && e.collapsed && (n.addCaret(e), e = T.expand(e));
		var i = e.cloneRange();
		return i.collapse(!1), n.end = u.create(T.documentFromRange(e), "span", { className: "k-marker" }), i.insertNode(n.end), i = e.cloneRange(), i.collapse(!0), n.start = n.end.cloneNode(!0), i.insertNode(n.start), e.setStartBefore(n.start), e.setEndAfter(n.end), g(e.commonAncestorContainer), e
	}, remove: function (e) {
		var t, n, i, r = this, o = r.start, a = r.end;
		for (g(e.commonAncestorContainer); !o.nextSibling && o.parentNode;)
			o = o.parentNode;
		for (; !a.previousSibling && a.parentNode;)
			a = a.parentNode;
		t = o.previousSibling && 3 == o.previousSibling.nodeType && o.nextSibling && 3 == o.nextSibling.nodeType, n = a.previousSibling && 3 == a.previousSibling.nodeType && a.nextSibling && 3 == a.nextSibling.nodeType, i = t && n, o = o.nextSibling, a = a.previousSibling;
		var s = !1, l = !1;
		if (o == r.end && (l = !!r.start.previousSibling, o = a = r.start.previousSibling || r.end.nextSibling, s = !0), u.remove(r.start), u.remove(r.end), !o || !a)
			return e.selectNodeContents(e.commonAncestorContainer), e.collapse(!0), void 0;
		var d = s ? f(o) ? o.nodeValue.length : o.childNodes.length : 0, c = f(a) ? a.nodeValue.length : a.childNodes.length;
		if (3 == o.nodeType)
			for (; o.previousSibling && 3 == o.previousSibling.nodeType;)
				o = o.previousSibling, d += o.nodeValue.length;
		if (3 == a.nodeType)
			for (; a.previousSibling && 3 == a.previousSibling.nodeType;)
				a = a.previousSibling, c += a.nodeValue.length;
		for (var h = p(o), m = o.parentNode, v = p(a), b = a.parentNode, _ = o; _.previousSibling; _ = _.previousSibling)
			3 == _.nodeType && 3 == _.previousSibling.nodeType && h--;
		for (var x = a; x.previousSibling; x = x.previousSibling)
			3 == x.nodeType && 3 == x.previousSibling.nodeType && v--;
		g(m), 3 == o.nodeType && (o = m.childNodes[h]), g(b), 3 == a.nodeType && (a = b.childNodes[v]), s ? (3 == o.nodeType ? e.setStart(o, d) : e[l ? "setStartAfter" : "setStartBefore"](o), e.collapse(!0)) : (3 == o.nodeType ? e.setStart(o, d) : e.setStartBefore(o), 3 == a.nodeType ? e.setEnd(a, c) : e.setEndAfter(a)), r.caret && r.removeCaret(e)
	} }), C = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/, T = { nodes: function (e) {
		var t = T.textNodes(e);
		return t.length || (e.selectNodeContents(e.commonAncestorContainer), t = T.textNodes(e), t.length || (t = u.significantChildNodes(e.commonAncestorContainer))), t
	}, textNodes: function (e) {
		return new k(e).enumerate()
	}, documentFromRange: function (e) {
		var t = e.startContainer;
		return 9 == t.nodeType ? t : t.ownerDocument
	}, createRange: function (e) {
		return c.msie && 9 > c.version ? new b(e) : e.createRange()
	}, selectRange: function (e) {
		var t = T.image(e);
		t && (e.setStartAfter(t), e.setEndAfter(t));
		var n = v.selectionFromRange(e);
		n.removeAllRanges(), n.addRange(e)
	}, split: function (e, t, n) {
		function i(i) {
			var r = e.cloneRange();
			r.collapse(i), r[i ? "setStartBefore" : "setEndAfter"](t);
			var o = r.extractContents();
			n && (o = u.trim(o)), u[i ? "insertBefore" : "insertAfter"](o, t)
		}
		i(!0), i(!1)
	}, getMarkers: function (e) {
		var t = [];
		return new _(e).traverse(function (e) {
			"k-marker" == e.className && t.push(e)
		}), t
	}, image: function (e) {
		var t = [];
		return new _(e).traverse(function (e) {
			u.is(e, "img") && t.push(e)
		}), 1 == t.length ? t[0] : void 0
	}, expand: function (e) {
		var t = e.cloneRange(), n = t.startContainer.childNodes[0 === t.startOffset ? 0 : t.startOffset - 1], i = t.endContainer.childNodes[t.endOffset];
		if (!f(n) || !f(i))
			return t;
		var r = n.nodeValue, o = i.nodeValue;
		if (!r || !o)
			return t;
		var a = r.split("").reverse().join("").search(C), s = o.search(C);
		return a && s ? (s = -1 == s ? o.length : s, a = -1 == a ? 0 : r.length - a, t.setStart(n, a), t.setEnd(i, s), t) : t
	}, isExpandable: function (e) {
		var t = e.startContainer, n = T.documentFromRange(e);
		if (t == n || t == n.body)
			return !1;
		var i = e.cloneRange(), r = t.nodeValue;
		if (!r)
			return !1;
		var o = r.substring(0, i.startOffset), a = r.substring(i.startOffset), s = 0, l = 0;
		return o && (s = o.split("").reverse().join("").search(C)), a && (l = a.search(C)), s && l
	} };
	l(d, { SelectionUtils: v, W3CRange: b, RangeIterator: _, W3CSelection: x, RangeEnumerator: k, RestorePoint: w, Marker: y, RangeUtils: T })
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = t.ui.editor, r = i.EditorUtils, o = r.registerTool, a = i.Dom, s = i.RangeUtils, l = s.selectRange, d = i.Tool, c = i.ToolTemplate, u = i.RestorePoint, p = i.Marker, f = e.extend, h = n.extend({ init: function (e) {
		var t = this;
		t.options = e, t.restorePoint = new u(e.range), t.marker = new p, t.formatter = e.formatter
	}, getRange: function () {
		return this.restorePoint.toRange()
	}, lockRange: function (e) {
		return this.marker.add(this.getRange(), e)
	}, releaseRange: function (e) {
		this.marker.remove(e), l(e)
	}, undo: function () {
		var e = this.restorePoint;
		e.body.innerHTML = e.html, l(e.toRange())
	}, redo: function () {
		this.exec()
	}, exec: function () {
		var e = this, t = e.lockRange(!0);
		e.formatter.editor = e.editor, e.formatter.toggle(t), e.releaseRange(t)
	} }), m = n.extend({ init: function (e, t) {
		this.body = e.body, this.startRestorePoint = e, this.endRestorePoint = t
	}, redo: function () {
		this.body.innerHTML = this.endRestorePoint.html, l(this.endRestorePoint.toRange())
	}, undo: function () {
		this.body.innerHTML = this.startRestorePoint.html, l(this.startRestorePoint.toRange())
	} }), g = h.extend({ init: function (e) {
		h.fn.init.call(this, e), this.managesUndoRedo = !0
	}, exec: function () {
		var e = this.editor, t = e.getRange(), n = new u(t);
		e.clipboard.paste(this.options.value || ""), e.undoRedoStack.push(new m(n, new u(e.getRange()))), e.focus()
	} }), v = d.extend({ initialize: function (e, t) {
		var n = t.editor;
		new i.SelectBox(e, { dataSource: n.options.insertHtml || [], dataTextField: "text", dataValueField: "value", change: function () {
			d.exec(n, "insertHtml", this.value())
		}, title: n.options.messages.insertHtml, highlightFirst: !1 })
	}, command: function (e) {
		return new g(e)
	}, update: function (e) {
		var t = e.data("kendoSelectBox") || e.find("select").data("kendoSelectBox");
		t.close(), t.value(t.options.title)
	} }), b = n.extend({ init: function () {
		this.stack = [], this.currentCommandIndex = -1
	}, push: function (e) {
		var t = this;
		t.stack = t.stack.slice(0, t.currentCommandIndex + 1), t.currentCommandIndex = t.stack.push(e) - 1
	}, undo: function () {
		this.canUndo() && this.stack[this.currentCommandIndex--].undo()
	}, redo: function () {
		this.canRedo() && this.stack[++this.currentCommandIndex].redo()
	}, canUndo: function () {
		return this.currentCommandIndex >= 0
	}, canRedo: function () {
		return this.currentCommandIndex != this.stack.length - 1
	} }), _ = n.extend({ init: function (e) {
		this.editor = e
	}, keydown: function (t) {
		var n = this, i = n.editor, r = i.keyboard, o = r.isTypingKey(t), a = f(e.Event(), t);
		if (n.editor.trigger("keydown", a), a.isDefaultPrevented() && t.preventDefault(), !a.isDefaultPrevented() && o && !r.isTypingInProgress()) {
			var s = i.getRange();
			return n.startRestorePoint = new u(s), r.startTyping(function () {
				i.selectionRestorePoint = n.endRestorePoint = new u(i.getRange()), i.undoRedoStack.push(new m(n.startRestorePoint, n.endRestorePoint))
			}), !0
		}
		return !1
	}, keyup: function (e) {
		var t = this.editor.keyboard;
		return this.editor.trigger("keyup", e), t.isTypingInProgress() ? (t.endTyping(), !0) : !1
	} }), x = n.extend({ init: function (e) {
		this.editor = e, this.systemCommandIsInProgress = !1
	}, createUndoCommand: function () {
		var e = this;
		e.endRestorePoint = new u(e.editor.getRange()), e.editor.undoRedoStack.push(new m(e.startRestorePoint, e.endRestorePoint)), e.startRestorePoint = e.endRestorePoint
	}, changed: function () {
		return this.startRestorePoint ? this.startRestorePoint.html != this.editor.body.innerHTML : !1
	}, keydown: function (e) {
		var t = this, n = t.editor, i = n.keyboard;
		return i.isModifierKey(e) ? (i.isTypingInProgress() && i.endTyping(!0), t.startRestorePoint = new u(n.getRange()), !0) : i.isSystem(e) ? (t.systemCommandIsInProgress = !0, t.changed() && (t.systemCommandIsInProgress = !1, t.createUndoCommand()), !0) : !1
	}, keyup: function (e) {
		var t = this;
		return t.systemCommandIsInProgress && t.changed() ? (t.systemCommandIsInProgress = !1, t.createUndoCommand(e), !0) : !1
	} }), k = n.extend({ init: function (e) {
		this.handlers = e, this.typingInProgress = !1
	}, isCharacter: function (e) {
		return e >= 48 && 90 >= e || e >= 96 && 111 >= e || e >= 186 && 192 >= e || e >= 219 && 222 >= e
	}, toolFromShortcut: function (t, n) {
		var i, r, o = String.fromCharCode(n.keyCode);
		for (i in t)
			if (r = e.extend({ ctrl: !1, alt: !1, shift: !1 }, t[i].options), (r.key == o || r.key == n.keyCode) && r.ctrl == n.ctrlKey && r.alt == n.altKey && r.shift == n.shiftKey)
				return i
	}, isTypingKey: function (e) {
		var t = e.keyCode;
		return this.isCharacter(t) && !e.ctrlKey && !e.altKey || 32 == t || 13 == t || 8 == t || 46 == t && !e.shiftKey && !e.ctrlKey && !e.altKey
	}, isModifierKey: function (e) {
		var t = e.keyCode;
		return 17 == t && !e.shiftKey && !e.altKey || 16 == t && !e.ctrlKey && !e.altKey || 18 == t && !e.ctrlKey && !e.shiftKey
	}, isSystem: function (e) {
		return 46 == e.keyCode && e.ctrlKey && !e.altKey && !e.shiftKey
	}, startTyping: function (e) {
		this.onEndTyping = e, this.typingInProgress = !0
	}, stopTyping: function () {
		this.typingInProgress = !1, this.onEndTyping && this.onEndTyping()
	}, endTyping: function (t) {
		var n = this;
		n.clearTimeout(), t ? n.stopTyping() : n.timeout = window.setTimeout(e.proxy(n.stopTyping, n), 1e3)
	}, isTypingInProgress: function () {
		return this.typingInProgress
	}, clearTimeout: function () {
		window.clearTimeout(this.timeout)
	}, notify: function (e, t) {
		var n, i = this.handlers;
		for (n = 0; i.length > n && !i[n][t](e); n++)
			;
	}, keydown: function (e) {
		this.notify(e, "keydown")
	}, keyup: function (e) {
		this.notify(e, "keyup")
	} }), w = n.extend({ init: function (e) {
		this.editor = e, this.cleaners = [new y]
	}, htmlToFragment: function (e) {
		var t = this.editor, n = t.document, i = a.create(n, "div"), r = n.createDocumentFragment();
		for (i.innerHTML = e; i.firstChild;)
			r.appendChild(i.firstChild);
		return r
	}, isBlock: function (e) {
		return /<(div|p|ul|ol|table|h[1-6])/i.test(e)
	}, oncut: function () {
		var e = this.editor, t = new u(e.getRange());
		setTimeout(function () {
			e.undoRedoStack.push(new m(t, new u(e.getRange())))
		})
	}, onpaste: function (t) {
		var n = this.editor, r = n.getRange(), o = "Ã¯Â»Â¿", s = new u(r), d = a.create(n.document, "div", { className: "k-paste-container", innerHTML: o });
		if (n.body.appendChild(d), n.body.createTextRange) {
			t.preventDefault();
			var c = n.createRange();
			c.selectNodeContents(d), n.selectRange(c);
			var p = n.body.createTextRange();
			p.moveToElementText(d), e(n.body).unbind("paste"), p.execCommand("Paste"), e(n.body).bind("paste", e.proxy(arguments.callee, this))
		}
		else {
			var f = n.createRange();
			f.selectNodeContents(d), l(f)
		}
		setTimeout(function () {
			var e, t = { html: "" };
			l(r), a.remove(d), d.lastChild && a.is(d.lastChild, "br") && a.remove(d.lastChild), e = d.innerHTML, e != o && (t.html = e), n.trigger("paste", t), n.clipboard.paste(t.html, !0), n.undoRedoStack.push(new m(s, new u(n.getRange()))), i.EditorUtils.select(n)
		})
	}, splittableParent: function (e, t) {
		var n, i;
		if (e)
			return a.parentOfType(t, ["p", "ul", "ol"]) || t.parentNode;
		if (n = t.parentNode, i = t.ownerDocument.body, a.isInline(n))
			for (; n.parentNode != i && !a.isBlock(n.parentNode);)
				n = n.parentNode;
		return n
	}, paste: function (e, t) {
		var n, i, r = this.editor;
		for (n = 0, i = this.cleaners.length; i > n; n++)
			this.cleaners[n].applicable(e) && (e = this.cleaners[n].clean(e));
		t && (e = e.replace(/(<br>(\s|&nbsp;)*)+(<\/?(div|p|li|col|t))/gi, "$3"), e = e.replace(/<(a|span)[^>]*><\/\1>/gi, "")), e = e.replace(/^<li/i, "<ul><li").replace(/li>$/g, "li></ul>");
		var o = this.isBlock(e), d = r.getRange();
		d.deleteContents(), d.startContainer == r.document && d.selectNodeContents(r.body);
		var c = new p, u = c.addCaret(d), f = this.splittableParent(o, u), h = !1;
		/body|td/.test(a.name(f)) || !o && !a.isInline(f) || (d.selectNode(u), s.split(d, f, !0), h = !0);
		var m = this.htmlToFragment(e);
		if (m.firstChild && "k-paste-container" === m.firstChild.className) {
			var g = [];
			for (n = 0, i = m.childNodes.length; i > n; n++)
				g.push(m.childNodes[n].innerHTML);
			m = this.htmlToFragment(g.join("<br />"))
		}
		if (d.insertNode(m), f = this.splittableParent(o, u), h) {
			for (; u.parentNode != f;)
				a.unwrap(u.parentNode);
			a.unwrap(u.parentNode)
		}
		a.normalize(d.commonAncestorContainer), u.style.display = "inline", a.scrollTo(u), c.removeCaret(d), l(d)
	} }), y = n.extend({ init: function () {
		this.replacements = [/<\?xml[^>]*>/gi, "", /<!--(.|\n)*?-->/g, "", /&quot;/g, "'", /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6]|hr|p|div|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|address|pre|form|blockquote|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1", /<br><br>/g, "<BR><BR>", /<br>/g, " ", /<table([^>]*)>(\s|&nbsp;)+<t/gi, "<table$1><t", /<tr[^>]*>(\s|&nbsp;)*<\/tr>/gi, "", /<tbody[^>]*>(\s|&nbsp;)*<\/tbody>/gi, "", /<table[^>]*>(\s|&nbsp;)*<\/table>/gi, "", /<BR><BR>/g, "<br>", /^\s*(&nbsp;)+/gi, "", /(&nbsp;|<br[^>]*>)+\s*$/gi, "", /mso-[^;"]*;?/gi, "", /<(\/?)b(\s[^>]*)?>/gi, "<$1strong$2>", /<(\/?)i(\s[^>]*)?>/gi, "<$1em$2>", /<\/?(meta|link|style|o:|v:|x:)[^>]*>((?:.|\n)*?<\/(meta|link|style|o:|v:|x:)[^>]*>)?/gi, "", /style=(["|'])\s*\1/g, ""]
	}, applicable: function (e) {
		return /class="?Mso|style="[^"]*mso-/i.test(e)
	}, listType: function (e) {
		return /^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(e) ? "ul" : /^\s*\w+[\.\)]\u00a0{2,}/.test(e) ? "ol" : void 0
	}, lists: function (t) {
		for (var n, i = a.create(document, "div", { innerHTML: t }), r = e(a.blockElements.join(","), i), o = -1, s = { ul: {}, ol: {} }, l = i, d = 0; r.length > d; d++) {
			var c = r[d];
			t = c.innerHTML.replace(/<\/?\w+[^>]*>/g, "").replace(/&nbsp;/g, "Ã‚ ");
			var u = this.listType(t);
			if (u && "p" == a.name(c)) {
				var p = parseFloat(c.style.marginLeft || 0), f = s[u][p];
				if ((p > o || !f) && (f = a.create(document, u), l == i ? a.insertBefore(f, c) : l.appendChild(f), s[u][p] = f), n != u)
					for (var h in s)
						for (var m in s[h])
							e.contains(f, s[h][m]) && delete s[h][m];
				a.remove(c.firstChild), l = a.create(document, "li", { innerHTML: c.innerHTML }), f.appendChild(l), a.remove(c), o = p, n = u
			}
			else
				c.innerHTML ? (s = { ul: {}, ol: {} }, l = i, o = -1) : a.remove(c)
		}
		return i.innerHTML
	}, stripEmptyAnchors: function (e) {
		return e.replace(/<a([^>]*)>\s*<\/a>/gi, function (e, t) {
			return !t || 0 > t.indexOf("href") ? "" : e
		})
	}, clean: function (e) {
		var t, n, i = this, r = i.replacements;
		for (t = 0, n = r.length; n > t; t += 2)
			e = e.replace(r[t], r[t + 1]);
		return e = i.stripEmptyAnchors(e), e = i.lists(e), e = e.replace(/\s+class="?[^"\s>]*"?/gi, "")
	} });
	f(i, { Command: h, GenericCommand: m, InsertHtmlCommand: g, InsertHtmlTool: v, UndoRedoStack: b, TypingHandler: _, SystemHandler: x, Keyboard: k, Clipboard: w, MSWordFormatCleaner: y }), o("insertHtml", new v({ template: new c({ template: r.dropDownListTemplate, title: "Insert HTML", initialValue: "Insert HTML" }) }))
}(window.kendo.jQuery), function (e) {
	function t(e) {
		return e.collapsed && !u.isExpandable(e)
	}
	var n = window.kendo, i = n.Class, r = n.ui.editor, o = n.ui.Editor.fn.options.formats, a = r.EditorUtils, s = r.Tool, l = r.ToolTemplate, d = r.FormatTool, c = r.Dom, u = r.RangeUtils, p = e.extend, f = r.EditorUtils.registerTool, h = r.EditorUtils.registerFormat, m = "k-marker", g = i.extend({ init: function (e) {
		this.format = e
	}, numberOfSiblings: function (e) {
		var t, n = 0, i = 0, r = 0, o = e.parentNode;
		for (t = o.firstChild; t; t = t.nextSibling)
			t != e && (t.className == m ? r++ : 3 == t.nodeType ? n++ : i++);
		return r > 1 && o.firstChild.className == m && o.lastChild.className == m ? 0 : i + n
	}, findSuitable: function (e, t) {
		return !t && this.numberOfSiblings(e) > 0 ? null : c.parentOfType(e, this.format[0].tags)
	}, findFormat: function (e) {
		var t, n, i, r, o, a = this.format, s = c.attrEquals;
		for (t = 0, n = a.length; n > t; t++) {
			if (i = e, r = a[t].tags, o = a[t].attr, i && c.ofType(i, r) && s(i, o))
				return i;
			for (; i;)
				if (i = c.parentOfType(i, r), i && s(i, o))
					return i
		}
		return null
	}, isFormatted: function (e) {
		var t, n;
		for (t = 0, n = e.length; n > t; t++)
			if (this.findFormat(e[t]))
				return !0;
		return !1
	} }), v = i.extend({ init: function (e, t) {
		var n = this;
		n.finder = new g(e), n.attributes = p({}, e[0].attr, t), n.tag = e[0].tags[0]
	}, wrap: function (e) {
		return c.wrap(e, c.create(e.ownerDocument, this.tag, this.attributes))
	}, activate: function (e, t) {
		var n = this;
		n.finder.isFormatted(t) ? (n.split(e), n.remove(t)) : n.apply(t)
	}, toggle: function (e) {
		var t = u.textNodes(e);
		t.length > 0 && this.activate(e, t)
	}, apply: function (e) {
		var t, n, i, r, o = this, a = [];
		for (t = 0, n = e.length; n > t; t++)
			i = e[t], r = o.finder.findSuitable(i), r ? c.attr(r, o.attributes) : r = o.wrap(i), a.push(r);
		o.consolidate(a)
	}, remove: function (e) {
		var t, n, i, r = this;
		for (t = 0, n = e.length; n > t; t++)
			i = r.finder.findFormat(e[t]), i && (r.attributes && r.attributes.style ? (c.unstyle(i, r.attributes.style), i.style.cssText || c.unwrap(i)) : c.unwrap(i))
	}, split: function (e) {
		var t, n, i = u.textNodes(e), r = i.length;
		if (r > 0)
			for (t = 0; r > t; t++)
				n = this.finder.findFormat(i[t]), n && u.split(e, n, !0)
	}, consolidate: function (e) {
		for (var t, n; e.length > 1;)
			if (t = e.pop(), n = e[e.length - 1], t.previousSibling && t.previousSibling.className == m && n.appendChild(t.previousSibling), t.tagName == n.tagName && t.previousSibling == n && t.style.cssText == n.style.cssText) {
				for (; t.firstChild;)
					n.appendChild(t.firstChild);
				c.remove(t)
			}
	} }), b = g.extend({ init: function (e, t) {
		var n = this;
		n.format = e, n.greedyProperty = t, g.fn.init.call(n, e)
	}, getInlineCssValue: function (t) {
		var n, i, r, o, a, s, l, d, u, p, f, h, m = t.attributes, g = e.trim;
		if (m)
			for (n = 0, i = m.length; i > n; n++)
				if (r = m[n], o = r.nodeName, a = r.nodeValue, r.specified && "style" == o)
					for (s = g(a || t.style.cssText).split(";"), d = 0, u = s.length; u > d; d++)
						if (l = s[d], l.length) {
							if (p = l.split(":"), f = g(p[0].toLowerCase()), h = g(p[1]), f != this.greedyProperty)
								continue;
							return f.indexOf("color") >= 0 ? c.toHex(h) : h
						}
	}, getFormatInner: function (t) {
		var n, i, r, o = e(c.isDataNode(t) ? t.parentNode : t), a = o.parents().andSelf();
		for (n = 0, i = a.length; i > n; n++)
			if (r = "className" == this.greedyProperty ? a[n].className : this.getInlineCssValue(a[n]))
				return r;
		return "inherit"
	}, getFormat: function (e) {
		var t, n, i = this.getFormatInner(e[0]);
		for (t = 1, n = e.length; n > t; t++)
			if (i != this.getFormatInner(e[t]))
				return "";
		return i
	}, isFormatted: function (e) {
		return "" !== this.getFormat(e)
	} }), _ = v.extend({ init: function (e, t, n) {
		var i = this;
		v.fn.init.call(i, e, t), i.greedyProperty = n, i.values = t, i.finder = new b(e, n)
	}, activate: function (e, t) {
		var n, i = this, r = i.greedyProperty, o = "apply";
		i.split(e), r && (n = r.replace(/-([a-z])/, function (e, t) {
			return t.toUpperCase()
		}), "inherit" == i.values.style[n] && (o = "remove")), i[o](t)
	} }), x = d.extend({ init: function (e) {
		d.fn.init.call(this, p(e, { finder: new g(e.format), formatter: function () {
			return new v(e.format)
		} })), this.willDelayExecution = t
	} }), k = s.extend({ init: function (e) {
		var t = this;
		s.fn.init.call(t, e), t.type = n.support.browser.msie || n.support.touch ? "kendoDropDownList" : "kendoComboBox", t.format = [{ tags: ["span"]}], t.finder = new b(t.format, e.cssAttr)
	}, command: function (e) {
		var t = this.options, n = this.format, i = {};
		return new r.FormatCommand(p(e, { formatter: function () {
			return i[t.domAttr] = e.value, new _(n, { style: i }, t.cssAttr)
		} }))
	}, willDelayExecution: t, update: function (e, t, n) {
		var i, r = e.data(this.type), o = n.getPending(this.name);
		i = o && o.options.params ? o.options.params.value : this.finder.getFormat(t), r.close(), r.value(i)
	}, initialize: function (e, t) {
		var n, i = t.editor, r = this.options, o = r.name, a = [];
		r.defaultValue && (a = [{ text: i.options.messages[r.defaultValue[0].text], value: r.defaultValue[0].value}]), n = a.concat(r.items ? r.items : i.options[o]), e[this.type]({ dataTextField: "text", dataValueField: "value", dataSource: n, change: function () {
			s.exec(i, o, this.value())
		}, highlightFirst: !1 }), e.closest(".k-widget").removeClass("k-" + o).find("*").andSelf().attr("unselectable", "on"), e.data(this.type).value("inherit")
	} }), w = s.extend({ init: function (e) {
		s.fn.init.call(this, e), this.options = e, this.format = [{ tags: ["span"]}]
	}, update: function (e) {
		e.data("kendoColorPicker").close()
	}, command: function (e) {
		var t = this.options, n = this.format, i = {};
		return new r.FormatCommand(p(e, { formatter: function () {
			return i[t.domAttr] = e.value, new _(n, { style: i }, t.cssAttr)
		} }))
	}, willDelayExecution: t, initialize: function (e, t) {
		var i = t.editor, o = this.name;
		e.attr("title", t.title), new r.ColorPicker(e, { value: "#000000", ariaId: i.element[0].id ? n.format("{0}_{1}_cp", i.element[0].id, o) : "", change: function (e) {
			s.exec(i, o, e.value)
		} })
	} }), y = s.extend({ init: function (e) {
		var t = this;
		s.fn.init.call(t, e), t.format = [{ tags: ["span"]}], t.finder = new b(t.format, "className")
	}, command: function (e) {
		var t = this.format;
		return new r.FormatCommand(p(e, { formatter: function () {
			return new _(t, { className: e.value })
		} }))
	}, update: function (e, t) {
		var n = e.data("kendoSelectBox");
		n.close(), n.value(this.finder.getFormat(t))
	}, initialize: function (e, t) {
		var n = t.editor;
		new r.SelectBox(e, { dataTextField: "text", dataValueField: "value", dataSource: n.options.style, title: n.options.messages.style, change: function () {
			s.exec(n, "style", this.value())
		}, highlightFirst: !1 }), e.closest(".k-widget").removeClass("k-" + this.name).find("*").andSelf().attr("unselectable", "on")
	} });
	p(r, { InlineFormatFinder: g, InlineFormatter: v, GreedyInlineFormatFinder: b, GreedyInlineFormatter: _, InlineFormatTool: x, FontTool: k, ColorTool: w, StyleTool: y }), f("style", new r.StyleTool({ template: new l({ template: a.dropDownListTemplate, title: "Styles" }) })), h("bold", [{ tags: ["strong"] }, { tags: ["span"], attr: { style: { fontWeight: "bold"}}}]), f("bold", new x({ key: "B", ctrl: !0, format: o.bold, template: new l({ template: a.buttonTemplate, title: "Bold" }) })), h("italic", [{ tags: ["em"] }, { tags: ["span"], attr: { style: { fontStyle: "italic"}}}]), f("italic", new x({ key: "I", ctrl: !0, format: o.italic, template: new l({ template: a.buttonTemplate, title: "Italic" }) })), h("underline", [{ tags: ["span"], attr: { style: { textDecoration: "underline"}}}]), f("underline", new x({ key: "U", ctrl: !0, format: o.underline, template: new l({ template: a.buttonTemplate, title: "Underline" }) })), h("strikethrough", [{ tags: ["del"] }, { tags: ["span"], attr: { style: { textDecoration: "line-through"}}}]), f("strikethrough", new x({ format: o.strikethrough, template: new l({ template: a.buttonTemplate, title: "Strikethrough" }) })), h("superscript", [{ tags: ["sup"]}]), f("superscript", new x({ format: o.superscript, template: new l({ template: a.buttonTemplate, title: "Superscript" }) })), h("subscript", [{ tags: ["sub"]}]), f("subscript", new x({ format: o.subscript, template: new l({ template: a.buttonTemplate, title: "Subscript" }) })), f("foreColor", new w({ cssAttr: "color", domAttr: "color", name: "foreColor", template: new l({ template: a.colorPickerTemplate, title: "Color" }) })), f("backColor", new w({ cssAttr: "background-color", domAttr: "backgroundColor", name: "backColor", template: new l({ template: a.colorPickerTemplate, title: "Background Color" }) })), f("fontName", new k({ cssAttr: "font-family", domAttr: "fontFamily", name: "fontName", defaultValue: [{ text: "fontNameInherit", value: "inherit"}], template: new l({ template: a.comboBoxTemplate, title: "Font Name" }) })), f("fontSize", new k({ cssAttr: "font-size", domAttr: "fontSize", name: "fontSize", defaultValue: [{ text: "fontSizeInherit", value: "inherit"}], template: new l({ template: a.comboBoxTemplate, title: "Font Size" }) }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = e.extend, r = t.ui.editor, o = t.ui.Editor.fn.options.formats, a = r.Dom, s = r.Command, l = r.Tool, d = r.ToolTemplate, c = r.FormatTool, u = r.EditorUtils, p = u.registerTool, f = u.registerFormat, h = r.RangeUtils, m = n.extend({ init: function (e) {
		this.format = e
	}, contains: function (e, t) {
		var n, i, r;
		for (n = 0, i = t.length; i > n; n++)
			if (r = t[n], !r || !a.isAncestorOrSelf(e, r))
				return !1;
		return !0
	}, findSuitable: function (t) {
		var n, i, r, o = this.format, s = [];
		for (n = 0, i = t.length; i > n; n++) {
			if (r = a.ofType(t[n], o[0].tags) ? t[n] : a.parentOfType(t[n], o[0].tags), !r)
				return [];
			0 > e.inArray(r, s) && s.push(r)
		}
		for (n = 0, i = s.length; i > n; n++)
			if (this.contains(s[n], s))
				return [s[n]];
		return s
	}, findFormat: function (e) {
		var t, n, i, r, o, s = this.format;
		for (t = 0, n = s.length; n > t; t++)
			for (i = e, r = s[t].tags, o = s[t].attr; i;) {
				if (a.ofType(i, r) && a.attrEquals(i, o))
					return i;
				i = i.parentNode
			}
		return null
	}, getFormat: function (e) {
		var t, n, i = this, r = function (e) {
			return i.findFormat(a.isDataNode(e) ? e.parentNode : e)
		}, o = r(e[0]);
		if (!o)
			return "";
		for (t = 1, n = e.length; n > t; t++)
			if (o != r(e[t]))
				return "";
		return o.nodeName.toLowerCase()
	}, isFormatted: function (e) {
		for (var t = 0, n = e.length; n > t; t++)
			if (!this.findFormat(e[t]))
				return !1;
		return !0
	} }), g = n.extend({ init: function (e, t) {
		this.format = e, this.values = t, this.finder = new m(e)
	}, wrap: function (e, t, n) {
		var i = 1 == n.length ? a.blockParentOrBody(n[0]) : a.commonAncestor.apply(null, n);
		a.isInline(i) && (i = a.blockParentOrBody(i));
		var r, o, s = a.significantChildNodes(i), l = a.findNodeIndex(s[0]), d = a.create(i.ownerDocument, e, t);
		for (r = 0; s.length > r; r++)
			o = s[r], a.isBlock(o) ? (a.attr(o, t), d.childNodes.length && (a.insertBefore(d, o), d = d.cloneNode(!1)), l = a.findNodeIndex(o) + 1) : d.appendChild(o);
		d.firstChild && a.insertAt(i, d, l)
	}, apply: function (e) {
		var t, n, r = this, o = a.is(e[0], "img") ? [e[0]] : r.finder.findSuitable(e), s = o.length ? u.formatByName(a.name(o[0]), r.format) : r.format[0], l = s.tags[0], d = i({}, s.attr, r.values);
		if (o.length)
			for (t = 0, n = o.length; n > t; t++)
				a.attr(o[t], d);
		else
			r.wrap(l, d, e)
	}, remove: function (e) {
		var t, n, i, r;
		for (t = 0, n = e.length; n > t; t++)
			i = this.finder.findFormat(e[t]), i && (a.ofType(i, ["p", "img", "li"]) ? (r = u.formatByName(a.name(i), this.format), r.attr.style && a.unstyle(i, r.attr.style), r.attr.className && a.removeClass(i, r.attr.className)) : a.unwrap(i))
	}, toggle: function (e) {
		var t = this, n = h.nodes(e);
		t.finder.isFormatted(n) ? t.remove(n) : t.apply(n)
	} }), v = n.extend({ init: function (e, t) {
		var n = this;
		n.format = e, n.values = t, n.finder = new m(e)
	}, apply: function (e) {
		var t, n, i, o, s, l = this.format, d = a.blockParents(e), c = l[0].tags[0];
		if (d.length)
			for (t = 0, n = d.length; n > t; t++)
				a.is(d[t], "li") ? (i = d[t].parentNode, o = new r.ListFormatter(i.nodeName.toLowerCase(), c), s = this.editor.createRange(), s.selectNode(d[t]), o.toggle(s)) : a.changeTag(d[t], c);
		else
			new g(l, this.values).apply(e)
	}, toggle: function (e) {
		var t = h.textNodes(e);
		t.length || (e.selectNodeContents(e.commonAncestorContainer), t = h.textNodes(e), t.length || (t = a.significantChildNodes(e.commonAncestorContainer))), this.apply(t)
	} }), b = s.extend({ init: function (e) {
		e.formatter = e.formatter(), s.fn.init.call(this, e)
	} }), _ = c.extend({ init: function (e) {
		c.fn.init.call(this, i(e, { finder: new m(e.format), formatter: function () {
			return new g(e.format)
		} }))
	} }), x = l.extend({ init: function (e) {
		l.fn.init.call(this, e), this.finder = new m([{ tags: a.blockElements}])
	}, command: function (e) {
		return new b(i(e, { formatter: function () {
			return new v([{ tags: [e.value]}], {})
		} }))
	}, update: function (e, t) {
		var n;
		n = e.is("select") ? e.data("kendoSelectBox") : e.find("select").data("kendoSelectBox"), n.close(), n.value(this.finder.getFormat(t))
	}, initialize: function (e, t) {
		var n = t.editor, i = "formatBlock";
		new r.SelectBox(e, { dataTextField: "text", dataValueField: "value", dataSource: this.options.items ? this.options.items : n.options.formatBlock, title: n.options.messages.formatBlock, change: function () {
			l.exec(n, i, this.value())
		}, highlightFirst: !1 }), e.closest(".k-widget").removeClass("k-" + i).find("*").andSelf().attr("unselectable", "on")
	} });
	i(r, { BlockFormatFinder: m, BlockFormatter: g, GreedyBlockFormatter: v, FormatCommand: b, BlockFormatTool: _, FormatBlockTool: x }), p("formatBlock", new x({ template: new d({ template: u.dropDownListTemplate }) })), f("justifyLeft", [{ tags: a.blockElements, attr: { style: { textAlign: "left"}} }, { tags: ["img"], attr: { style: { "float": "left"}}}]), p("justifyLeft", new _({ format: o.justifyLeft, template: new d({ template: u.buttonTemplate, title: "Justify Left" }) })), f("justifyCenter", [{ tags: a.blockElements, attr: { style: { textAlign: "center"}} }, { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto"}}}]), p("justifyCenter", new _({ format: o.justifyCenter, template: new d({ template: u.buttonTemplate, title: "Justify Center" }) })), f("justifyRight", [{ tags: a.blockElements, attr: { style: { textAlign: "right"}} }, { tags: ["img"], attr: { style: { "float": "right"}}}]), p("justifyRight", new _({ format: o.justifyRight, template: new d({ template: u.buttonTemplate, title: "Justify Right" }) })), f("justifyFull", [{ tags: a.blockElements, attr: { style: { textAlign: "justify"}}}]), p("justifyFull", new _({ format: o.justifyFull, template: new d({ template: u.buttonTemplate, title: "Justify Full" }) }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = e.extend, i = t.ui.editor, r = i.Dom, o = i.Command, a = i.Tool, s = i.BlockFormatter, l = r.normalize, d = i.RangeUtils, c = i.EditorUtils.registerTool, u = o.extend({ init: function (e) {
		this.options = e, o.fn.init.call(this, e)
	}, exec: function () {
		function e(e) {
			if (e.firstChild && r.is(e.firstChild, "br") && r.remove(e.firstChild), r.isDataNode(e) && !e.nodeValue && (e = e.parentNode), e && !r.is(e, "img")) {
				for (; e.firstChild && 1 == e.firstChild.nodeType;)
					e = e.firstChild;
				"" === e.innerHTML && (e.innerHTML = v)
			}
		}
		var n, i, o, a, c, u, p, f, h, m = this.getRange(), g = d.documentFromRange(m), v = t.support.browser.msie ? "" : '<br _moz_dirty="" />', b = "p,h1,h2,h3,h4,h5,h6".split(","), _ = r.parentOfType(m.startContainer, b), x = r.parentOfType(m.endContainer, b), k = _ && !x || !_ && x;
		if (m.deleteContents(), u = r.create(g, "a"), m.insertNode(u), u.parentNode || (a = m.commonAncestorContainer, a.innerHTML = "", a.appendChild(u)), l(u.parentNode), p = r.parentOfType(u, ["li"]), f = r.parentOfType(u, "h1,h2,h3,h4,h5,h6".split(",")), p ? (h = m.cloneRange(), h.selectNode(p), d.textNodes(h).length || (c = r.create(g, "p"), p.nextSibling && d.split(h, p.parentNode), r.insertAfter(c, p.parentNode), r.remove(1 == p.parentNode.childNodes.length ? p.parentNode : p), c.innerHTML = v, o = c)) : f && !u.nextSibling && (c = r.create(g, "p"), r.insertAfter(c, f), c.innerHTML = v, r.remove(u), o = c), o || (p || f || new s([{ tags: ["p"]}]).apply([u]), m.selectNode(u), n = r.parentOfType(u, [p ? "li" : f ? r.name(f) : "p"]), d.split(m, n, k), i = n.previousSibling, r.is(i, "li") && i.firstChild && !r.is(i.firstChild, "br") && (i = i.firstChild), o = n.nextSibling, r.is(o, "li") && o.firstChild && !r.is(o.firstChild, "br") && (o = o.firstChild), r.remove(n), e(i), e(o), l(i)), l(o), r.is(o, "img"))
			m.setStartBefore(o);
		else {
			m.selectNodeContents(o);
			var w = d.textNodes(m)[0];
			w && m.selectNodeContents(w)
		}
		m.collapse(!0), r.scrollTo(o), d.selectRange(m)
	} }), p = o.extend({ init: function (e) {
		this.options = e, o.fn.init.call(this, e)
	}, exec: function () {
		var e = this.getRange();
		e.deleteContents();
		var n = r.create(d.documentFromRange(e), "br");
		if (e.insertNode(n), l(n.parentNode), !t.support.browser.msie && (!n.nextSibling || r.isWhitespace(n.nextSibling))) {
			var i = n.cloneNode(!0);
			i.setAttribute("_moz_dirty", ""), r.insertAfter(i, n)
		}
		e.setStartAfter(n), e.collapse(!0), r.scrollTo(n.nextSibling), d.selectRange(e)
	} });
	n(i, { ParagraphCommand: u, NewLineCommand: p }), c("insertLineBreak", new a({ key: 13, shift: !0, command: p })), c("insertParagraph", new a({ key: 13, command: u }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = e.extend, r = t.ui.editor, o = r.Dom, a = r.RangeUtils, s = r.EditorUtils, l = r.Command, d = r.ToolTemplate, c = r.FormatTool, u = r.BlockFormatFinder, p = a.textNodes, f = r.EditorUtils.registerTool, h = u.extend({ init: function (e) {
		this.tag = e;
		var t = this.tags = ["ul" == e ? "ol" : "ul", e];
		u.fn.init.call(this, [{ tags: t}])
	}, isFormatted: function (e) {
		for (var t, n = [], i = 0; e.length > i; i++)
			(t = this.findFormat(e[i])) && o.name(t) == this.tag && n.push(t);
		if (1 > n.length)
			return !1;
		if (n.length != e.length)
			return !1;
		for (i = 0; n.length > i && n[i].parentNode == t.parentNode; i++)
			if (n[i] != t)
				return !1;
		return !0
	}, findSuitable: function (e) {
		var t = o.parentOfType(e[0], this.tags);
		return t && o.name(t) == this.tag ? t : null
	} }), m = n.extend({
		init: function (e, t) {
			var n = this;
			n.finder = new h(e), n.tag = e, n.unwrapTag = t
		}, wrap: function (e, t) {
			var n, i, r = o.create(e.ownerDocument, "li");
			for (n = 0; t.length > n; n++)
				if (i = t[n], o.is(i, "li"))
					e.appendChild(i);
				else if (o.is(i, "ul") || o.is(i, "ol"))
					for (; i.firstChild;)
						e.appendChild(i.firstChild);
				else if (o.is(i, "td")) {
					for (; i.firstChild;)
						r.appendChild(i.firstChild);
					e.appendChild(r), i.appendChild(e), e = e.cloneNode(!1), r = r.cloneNode(!1)
				}
				else
					r.appendChild(i), o.isBlock(i) && (e.appendChild(r), o.unwrap(i), r = r.cloneNode(!1));
			r.firstChild && e.appendChild(r)
		}, containsAny: function (e, t) {
			for (var n = 0; t.length > n; n++)
				if (o.isAncestorOrSelf(e, t[n]))
					return !0;
			return !1
		}, suitable: function (e, t) {
			if ("k-marker" == e.className) {
				var n = e.nextSibling;
				if (n && o.isBlock(n))
					return !1;
				if (n = e.previousSibling, n && o.isBlock(n))
					return !1
			}
			return this.containsAny(e, t) || o.isInline(e) || 3 == e.nodeType
		}, split: function (t) {
			var n, i, r = p(t);
			if (r.length) {
				n = o.parentOfType(r[0], ["li"]), i = o.parentOfType(r[r.length - 1], ["li"]), t.setStartBefore(n), t.setEndAfter(i);
				for (var s = 0, l = r.length; l > s; s++) {
					var d = this.finder.findFormat(r[s]);
					if (d) {
						var c = e(d).parents("ul,ol");
						c[0] ? a.split(t, c.last()[0], !0) : a.split(t, d, !0)
					}
				}
			}
		}, merge: function (e, t) {
			for (var n, i = t.previousSibling; i && ("k-marker" == i.className || 3 == i.nodeType && o.isWhitespace(i));)
				i = i.previousSibling;
			if (i && o.name(i) == e) {
				for (; t.firstChild;)
					i.appendChild(t.firstChild);
				o.remove(t), t = i
			}
			for (n = t.nextSibling; n && ("k-marker" == n.className || 3 == n.nodeType && o.isWhitespace(n));)
				n = n.nextSibling;
			if (n && o.name(n) == e) {
				for (; t.lastChild;)
					n.insertBefore(t.lastChild, n.firstChild);
				o.remove(t)
			}
		}, applyOnSection: function (t, n) {
			function i() {
				s.push(this)
			}
			var r, a = this.tag;
			r = 1 == n.length ? o.parentOfType(n[0], ["ul", "ol"]) : o.commonAncestor.apply(null, n), r || (r = o.parentOfType(n[0], ["p", "td"]) || n[0].ownerDocument.body), o.isInline(r) && (r = o.blockParentOrBody(r));
			var s = [], l = this.finder.findSuitable(n);
			l || (l = new h("ul" == a ? "ol" : "ul").findSuitable(n));
			var d = o.significantChildNodes(r);
			d.length || (d = n), /table|tbody/.test(o.name(r)) && (d = e.map(n, function (e) {
				return o.parentOfType(e, ["td"])
			}));
			for (var c = 0; d.length > c; c++) {
				var u = d[c], p = o.name(u);
				!this.suitable(u, n) || l && o.isAncestorOrSelf(l, u) || (!l || "ul" != p && "ol" != p ? s.push(u) : (e.each(u.childNodes, i), o.remove(u)))
			}
			s.length != d.length || r == n[0].ownerDocument.body || /table|tbody|tr|td/.test(o.name(r)) || (s = [r]), l || (l = o.create(r.ownerDocument, a), o.insertBefore(l, s[0])), this.wrap(l, s), o.is(l, a) || o.changeTag(l, a), this.merge(a, l)
		}, apply: function (e) {
			var t, n, i, r = 0, a = [];
			do
				i = o.parentOfType(e[r], ["td", "body"]), t && i == t ? n.push(e[r]) : (t && a.push({ section: t, nodes: n }), n = [e[r]], t = i), r++;
			while (e.length > r);
			for (a.push({ section: t, nodes: n }), r = 0; a.length > r; r++)
				this.applyOnSection(a[r].section, a[r].nodes)
		}, unwrap: function (t) {
			var n, i, r, a, s = t.ownerDocument.createDocumentFragment(), l = this.unwrapTag;
			for (i = t.firstChild; i; i = i.nextSibling) {
				for (r = o.create(t.ownerDocument, l || "p"); i.firstChild;)
					a = i.firstChild, o.isBlock(a) ? (r.firstChild && (s.appendChild(r), r = o.create(t.ownerDocument, l || "p")), s.appendChild(a)) : r.appendChild(a);
				r.firstChild && s.appendChild(r)
			}
			n = e(t).parents("ul,ol"), n[0] ? (o.insertAfter(s, n.last()[0]), n.last().remove()) : o.insertAfter(s, t), o.remove(t)
		}, remove: function (e) {
			for (var t, n = 0, i = e.length; i > n; n++)
				t = this.finder.findFormat(e[n]), t && this.unwrap(t)
		}, toggle: function (e) {
			var t = this, n = p(e), i = e.commonAncestorContainer;
			if (!n.length && (e.selectNodeContents(i), n = p(e), !n.length)) {
				var r = i.ownerDocument.createTextNode("");
				e.startContainer.appendChild(r), n = [r], e.selectNode(r.parentNode)
			}
			t.finder.isFormatted(n) ? (t.split(e), t.remove(n)) : t.apply(n)
		}
	}), g = l.extend({ init: function (e) {
		e.formatter = new m(e.tag), l.fn.init.call(this, e)
	} }), v = c.extend({ init: function (e) {
		this.options = e, c.fn.init.call(this, i(e, { finder: new h(e.tag) }))
	}, command: function (e) {
		return new g(i(e, { tag: this.options.tag }))
	} });
	i(r, { ListFormatFinder: h, ListFormatter: m, ListCommand: g, ListTool: v }), f("insertUnorderedList", new v({ tag: "ul", template: new d({ template: s.buttonTemplate, title: "Remove Link" }) })), f("insertOrderedList", new v({ tag: "ol", template: new d({ template: s.buttonTemplate, title: "Remove Link" }) }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = e.extend, r = t.ui.editor, o = r.Dom, a = r.RangeUtils, s = r.EditorUtils, l = r.Command, d = r.Tool, c = r.ToolTemplate, u = r.InlineFormatter, p = r.InlineFormatFinder, f = a.textNodes, h = r.EditorUtils.registerTool, m = n.extend({ findSuitable: function (e) {
		return o.parentOfType(e, ["a"])
	} }), g = n.extend({ init: function () {
		this.finder = new m
	}, apply: function (e, t) {
		var n, i, r, s, l = f(e);
		t.innerHTML ? (n = a.getMarkers(e), i = a.documentFromRange(e), e.deleteContents(), s = o.create(i, "a", t), e.insertNode(s), n.length > 1 && (o.insertAfter(n[n.length - 1], s), o.insertAfter(n[1], s), o[l.length > 0 ? "insertBefore" : "insertAfter"](n[0], s))) : (r = new u([{ tags: ["a"]}], t), r.finder = this.finder, r.apply(l))
	} }), v = l.extend({ init: function (e) {
		e.formatter = { toggle: function (e) {
			new u([{ tags: ["a"]}]).remove(f(e))
		} }, this.options = e, l.fn.init.call(this, e)
	} }), b = l.extend({ init: function (e) {
		var t = this;
		t.options = e, l.fn.init.call(t, e), t.attributes = null, t.async = !0, t.formatter = new g
	}, _dialogTemplate: function (e) {
		return t.template("<div class=\"k-editor-dialog\"><ol><li class='k-form-text-row'><label for='k-editor-link-url'>#: messages.linkWebAddress #</label><input type='text' class='k-input' id='k-editor-link-url'></li># if (showText) { #<li class='k-form-text-row'><label for='k-editor-link-text'>#: messages.linkText #</label><input type='text' class='k-input' id='k-editor-link-text'></li># } #<li class='k-form-text-row'><label for='k-editor-link-title'>#: messages.linkToolTip #</label><input type='text' class='k-input' id='k-editor-link-title'></li><li class='k-form-checkbox-row'><input type='checkbox' id='k-editor-link-target'><label for='k-editor-link-target'>#: messages.linkOpenInNewWindow #</label></li></ol><div class='k-button-wrapper'><button class=\"k-dialog-insert k-button\">#: messages.dialogInsert #</button>&nbsp;#: messages.dialogButtonSeparator #&nbsp;<a href=\"\\#\" class=\"k-dialog-close k-link\">#: messages.dialogCancel #</a></div></div>")({ messages: this.editor.options.messages, showText: e })
	}, exec: function () {
		function n(t) {
			var n, i, o, a = g.element, s = e("#k-editor-link-url", a).val();
			s && "http://" != s && (d.attributes = { href: s }, n = e("#k-editor-link-title", a).val(), n && (d.attributes.title = n), i = e("#k-editor-link-text", a).val(), i !== p && (d.attributes.innerHTML = i || s), o = e("#k-editor-link-target", a).is(":checked"), o && (d.attributes.target = "_blank"), d.formatter.apply(c, d.attributes)), r(t), d.change && d.change()
		}
		function r(e) {
			e.preventDefault(), g.destroy(), o.windowFromDocument(a.documentFromRange(c)).focus(), d.releaseRange(c)
		}
		var l, d = this, c = d.getRange(), u = c.collapsed, p = null;
		c = d.lockRange(!0), l = f(c);
		var h = l.length ? d.formatter.finder.findSuitable(l[0]) : null, m = 1 >= l.length || 2 == l.length && u, g = s.createDialog(d._dialogTemplate(m), d.editor, i({}, d.editor.options.dialogOptions, { title: "Insert link", close: r, visible: !1 })).find(".k-dialog-insert").click(n).end().find(".k-dialog-close").click(r).end().find(".k-form-text-row input").keydown(function (e) {
			var i = t.keys;
			e.keyCode == i.ENTER ? n(e) : e.keyCode == i.ESC && r(e)
		}).end().find("#k-editor-link-url").val(h ? h.getAttribute("href", 2) : "http://").end().find("#k-editor-link-text").val(l.length > 0 ? 1 == l.length ? l[0].nodeValue : l[0].nodeValue + l[1].nodeValue : "").end().find("#k-editor-link-title").val(h ? h.title : "").end().find("#k-editor-link-target").attr("checked", h ? "_blank" == h.target : !1).end().data("kendoWindow").center().open();
		m && l.length > 0 && (p = e("#k-editor-link-text", g.element).val()), e("#k-editor-link-url", g.element).focus().select()
	}, redo: function () {
		var e = this, t = e.lockRange(!0);
		e.formatter.apply(t, e.attributes), e.releaseRange(t)
	} }), _ = d.extend({ init: function (t) {
		this.options = t, this.finder = new p([{ tags: ["a"]}]), d.fn.init.call(this, e.extend(t, { command: v }))
	}, initialize: function (e) {
		e.attr("unselectable", "on").addClass("k-state-disabled")
	}, update: function (e, t) {
		e.toggleClass("k-state-disabled", !this.finder.isFormatted(t)).removeClass("k-state-hover")
	} });
	i(t.ui.editor, { LinkFormatFinder: m, LinkFormatter: g, UnlinkCommand: v, LinkCommand: b, UnlinkTool: _ }), h("createLink", new d({ key: "K", ctrl: !0, command: b, template: new c({ template: s.buttonTemplate, title: "Create Link" }) })), h("unlink", new _({ key: "K", ctrl: !0, shift: !0, template: new c({ template: s.buttonTemplate, title: "Remove Link" }) }))
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = e.extend, r = n.ui.editor, o = r.EditorUtils, a = r.Dom, s = o.registerTool, l = r.ToolTemplate, d = r.RangeUtils, c = r.Command, u = n.keys, p = "Insert Image", f = "#k-editor-image-url", h = "#k-editor-image-title", m = c.extend({ init: function (e) {
		var t = this;
		c.fn.init.call(t, e), t.async = !0, t.attributes = {}
	}, insertImage: function (e, t) {
		var n = this.attributes;
		if (n.src && "http://" != n.src) {
			if (!e)
				return e = a.create(d.documentFromRange(t), "img", n), e.onload = e.onerror = function () {
					e.removeAttribute("complete"), e.removeAttribute("width"), e.removeAttribute("height")
				}, t.deleteContents(), t.insertNode(e), t.setStartAfter(e), t.setEndAfter(e), d.selectRange(t), !0;
			a.attr(e, n)
		}
		return !1
	}, _dialogTemplate: function (e) {
		return n.template('<div class="k-editor-dialog"># if (showBrowser) { #<div class="k-imagebrowser"></div># } #<ol><li class="k-form-text-row"><label for="k-editor-image-url">#: messages.imageWebAddress #</label><input type="text" class="k-input" id="k-editor-image-url"></li><li class="k-form-text-row"><label for="k-editor-image-title">#: messages.imageAltText #</label><input type="text" class="k-input" id="k-editor-image-title"></li></ol><div class="k-button-wrapper"><button class="k-dialog-insert k-button">#: messages.dialogInsert #</button>&nbsp;#: messages.dialogButtonSeparator #&nbsp;<a href="\\#" class="k-dialog-close k-link">#: messages.dialogCancel #</a></div></div>')({ messages: this.editor.options.messages, showBrowser: e })
	}, redo: function () {
		var e = this, t = e.lockRange();
		e.insertImage(d.image(t), t) || e.releaseRange(t)
	}, exec: function () {
		function r(e) {
			var t = c.element;
			g.attributes = { src: t.find(f).val().replace(/ /g, "%20"), alt: t.find(h).val() }, b = g.insertImage(_, v), s(e), g.change && g.change()
		}
		function s(e) {
			e.preventDefault(), c.destroy(), a.windowFromDocument(d.documentFromRange(v)).focus(), b || g.releaseRange(v)
		}
		function l(e) {
			e.keyCode == u.ENTER ? r(e) : e.keyCode == u.ESC && s(e)
		}
		var c, m, g = this, v = g.lockRange(), b = !1, _ = d.image(v), x = g.editor.options, k = x.imageBrowser, w = !!(n.ui.ImageBrowser && k && k.transport && k.transport.read !== t);
		m = w ? { width: "960px"} : {}, c = o.createDialog(g._dialogTemplate(w), g.editor, i(m, x.dialogOptions, { title: p, close: s, visible: !1, resizable: w, activate: function () {
			if (w) {
				var e = this;
				new n.ui.ImageBrowser(e.element.find(".k-imagebrowser"), i({}, k, { change: function () {
					e.element.find(f).val(this.value())
				}, apply: r }))
			}
		} })).find(".k-dialog-insert").click(r).end().find(".k-dialog-close").click(s).end().find(".k-form-text-row input").keydown(l).end().find(f).val(_ ? _.getAttribute("src", 2) : "http://").end().find(h).val(_ ? _.alt : "").end().data("kendoWindow").center().open(), e(f, c.element).focus().select()
	} });
	n.ui.editor.ImageCommand = m, s("insertImage", new r.Tool({ command: m, template: new l({ template: o.buttonTemplate, title: p }) }))
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.ui.Widget, r = n.ui.DropDownList, o = n.ui.editor, a = o.Dom, s = "change", l = "k-state-selected", d = "." + l, c = ".k-selected-color", u = "unselectable", p = "background-color", f = "aria-selected", h = "aria-labelledby", m = n.keys, g = n.template('<div class="k-colorpicker-popup"><ul class="k-reset"># for(var i = 0; i < colors.length; i++) { #<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i] == value ? "k-state-selected" : "" #" aria-label="\\##= colors[i]#"><div style="background-color:\\##= colors[i] #"></div></li># } #</ul></div>'), v = i.extend({ init: function (t, n) {
		var r, o = this;
		i.fn.init.call(o, t, n), t = o.element, n = o.options, o._value = n.value, o._ariaId = r = n.ariaId, r && t.attr(h, r), o.popup = e(g({ colors: n.colors, value: n.value.substring(1), id: r })).kendoPopup({ anchor: t, toggleTarget: t.find(".k-icon") }).delegate(".k-item", "click", function (t) {
			o.select(e(t.currentTarget).find("div").css(p))
		}).find("*").attr(u, "on").end().data("kendoPopup"), t.attr("tabIndex", 0).keydown(function (e) {
			o.keydown(e)
		}).focus(function () {
			t.css("outline", "1px dotted #000")
		}).blur(function () {
			t.css("outline", "")
		}).delegate(".k-tool-icon", "click", function () {
			o.select()
		}).find("*").attr(u, "on"), o._value && t.find(c).css(p, o._value)
	}, options: { name: "ColorPicker", colors: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","), value: null }, events: [s], select: function (e) {
		var t = this;
		e ? (e = a.toHex(e), t.trigger(s, { value: e }) || (t.value(e), t.close())) : t.trigger(s, { value: t._value })
	}, open: function () {
		this.popup.open()
	}, close: function () {
		this.popup.close()
	}, toggle: function () {
		this.popup.toggle()
	}, _applyAriaAttributes: function (e, t) {
		var n = this;
		n.element.removeAttr(h), n.element.attr(h, n._ariaId), e.removeAttr("id"), e.attr(f, !1), t.attr({ id: n._ariaId, "aria-selected": !0 })
	}, keydown: function (e) {
		var t, n, i, r = this, o = r.popup.element, a = r.popup.visible(), s = !1, c = e.keyCode;
		c == m.DOWN ? (a ? (t = o.find(d), n = t[0] ? t.next() : o.find("li:first"), n[0] && (t.removeClass(l), n.addClass(l), r._applyAriaAttributes(t, n))) : r.open(), s = !0) : c == m.UP ? (a && (t = o.find(d), i = t.prev(), i[0] && (t.removeClass(l), i.addClass(l), r._applyAriaAttributes(t, i))), s = !0) : c == m.TAB || c == m.RIGHT || c == m.LEFT ? r.close() : c == m.ENTER && (o.find(d).click(), s = !0), s && e.preventDefault()
	}, value: function (e) {
		var n = this;
		return e === t ? n._value : (e = a.toHex(e), n._value = e, n.element.find(c).css(p, e), t)
	}, destroy: function () {
		this.popup.destroy(), i.fn.destroy.call(this)
	} }), b = r.extend({ init: function (e, t) {
		var n = this;
		r.fn.init.call(n, e, t), n.value(n.options.title)
	}, options: { name: "SelectBox" }, value: function (e) {
		var n = this, i = r.fn.value.call(n, e);
		return e === t ? i : (e !== r.fn.value.call(n) && (n.text(n.options.title), n._current.removeClass("k-state-selected"), n.current(null), n._oldIndex = n.selectedIndex = -1), t)
	} });
	n.ui.plugin(v), n.ui.plugin(b), n.ui.editor.ColorPicker = v, n.ui.editor.SelectBox = b
}(window.kendo.jQuery), function (e, t) {
	function n(n, i) {
		var r = "rtl" == e(n).css("direction"), o = r ? "Right" : "Left", a = "td" != s.name(n) ? "margin" + o : "padding" + o;
		return i === t ? n.style[a] || 0 : (i > 0 ? n.style[a] = i + "px" : (n.style[a] = "", n.style.cssText || n.removeAttribute("style")), t)
	}
	var i = window.kendo, r = i.Class, o = e.extend, a = i.ui.editor, s = a.Dom, l = a.EditorUtils, d = l.registerTool, c = a.Command, u = a.Tool, p = a.ToolTemplate, f = a.RangeUtils, h = s.blockElements, m = a.BlockFormatFinder, g = a.BlockFormatter, v = r.extend({ init: function () {
		this.finder = new m([{ tags: s.blockElements}])
	}, apply: function (t) {
		var i, r, o, a, l, d = this.finder.findSuitable(t), c = [];
		if (d.length) {
			for (i = 0, r = d.length; r > i; i++)
				s.is(d[i], "li") ? e(d[i]).index() ? 0 > e.inArray(d[i].parentNode, c) && c.push(d[i]) : c.push(d[i].parentNode) : c.push(d[i]);
			for (; c.length;)
				if (o = c.shift(), s.is(o, "li")) {
					a = o.parentNode, l = e(o).prev("li");
					var u = l.find("ul,ol").last(), p = e(o).children("ul,ol")[0];
					if (p && l[0])
						u[0] ? (u.append(o), u.append(e(p).children()), s.remove(p)) : (l.append(p), p.insertBefore(o, p.firstChild));
					else
						for (p = l.children("ul,ol")[0], p || (p = s.create(o.ownerDocument, s.name(a)), l.append(p)); o && o.parentNode == a;)
							p.appendChild(o), o = c.shift()
				}
				else {
					var f = parseInt(n(o), 10) + 30;
					n(o, f);
					for (var h = 0; c.length > h; h++)
						e.contains(o, c[h]) && c.splice(h, 1)
				}
		}
		else {
			var m = new g([{ tags: "p"}], { style: { marginLeft: 30} });
			m.apply(t)
		}
	}, remove: function (t) {
		var i, r, o, a, s, l, d, c, u = this.finder.findSuitable(t);
		for (r = 0, o = u.length; o > r; r++) {
			if (d = e(u[r]), d.is("li")) {
				if (a = d.parent(), s = a.parent(), s.is("li,ul,ol") && !n(a[0])) {
					if (i && e.contains(i, s[0]))
						continue;
					l = d.nextAll("li"), l.length && e(a[0].cloneNode(!1)).appendTo(d).append(l), s.is("li") ? d.insertAfter(s) : d.appendTo(s), a.children("li").length || a.remove();
					continue
				}
				if (i == a[0])
					continue;
				i = a[0]
			}
			else
				i = u[r];
			c = parseInt(n(i), 10) - 30, n(i, c)
		}
	} }), b = c.extend({ init: function (e) {
		e.formatter = { toggle: function (e) {
			(new v).apply(f.nodes(e))
		} }, c.fn.init.call(this, e)
	} }), _ = c.extend({ init: function (e) {
		e.formatter = { toggle: function (e) {
			(new v).remove(f.nodes(e))
		} }, c.fn.init.call(this, e)
	} }), x = u.extend({ init: function (e) {
		u.fn.init.call(this, e), this.finder = new m([{ tags: h}])
	}, update: function (i, r) {
		var o, a, l, d, c = this.finder.findSuitable(r);
		for (l = 0, d = c.length; d > l; l++)
			if (o = n(c[l]), o || (a = e(c[l]).parents("ul,ol").length, o = s.is(c[l], "li") && (a > 1 || n(c[l].parentNode)) || s.ofType(c[l], ["ul", "ol"]) && a > 0), o)
				return i.removeClass("k-state-disabled"), t;
		i.addClass("k-state-disabled").removeClass("k-state-hover")
	} });
	o(a, { IndentFormatter: v, IndentCommand: b, OutdentCommand: _, OutdentTool: x }), d("indent", new u({ command: b, template: new p({ template: l.buttonTemplate, title: "Indent" }) })), d("outdent", new x({ command: _, template: new p({ template: l.buttonTemplate, title: "Outdent" }) }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = e.extend, i = t.ui.editor, r = i.Dom, o = i.RangeUtils, a = i.EditorUtils, s = i.Command, l = i.Tool, d = i.ToolTemplate, c = s.extend({ init: function (e) {
		var t = this;
		t.options = e, s.fn.init.call(t, e), t.attributes = null, t.async = !0
	}, exec: function () {
		function t(e) {
			s.value(d.find(p).val()), i(e), a.change && a.change(), s.trigger("change")
		}
		function i(e) {
			e.preventDefault(), d.data("kendoWindow").destroy(), r.windowFromDocument(o.documentFromRange(l)).focus()
		}
		var a = this, s = a.editor, l = s.getRange(), d = e(c.template).appendTo(document.body), u = c.indent(s.value()), p = ".k-editor-textarea";
		d.kendoWindow(n({}, s.options.dialogOptions, { title: "View HTML", close: i })).hide().find(p).val(u).end().find(".k-dialog-update").click(t).end().find(".k-dialog-close").click(i).end().show().data("kendoWindow").center(), d.find(p).focus()
	} });
	n(c, { template: "<div class='k-editor-dialog'><textarea class='k-editor-textarea k-input'></textarea><div class='k-button-wrapper'><button class='k-dialog-update k-button'>Update</button>&nbsp;or&nbsp;<a href='#' class='k-dialog-close k-link'>Close</a></div></div>", indent: function (e) {
		return e.replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/gi, "</$1>\n").replace(/<(ul|ol)([^>]*)><li/gi, "<$1$2>\n<li").replace(/<br \/>/gi, "<br />\n").replace(/\n$/, "")
	} }), t.ui.editor.ViewHtmlCommand = c, i.EditorUtils.registerTool("viewHtml", new l({ command: c, template: new d({ template: a.buttonTemplate, title: "View HTML" }) }))
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = e.extend, r = t.ui.editor, o = r.RangeUtils, a = r.Marker, s = n.extend({ init: function (e) {
		this.editor = e, this.formats = []
	}, apply: function (e) {
		if (this.hasPending()) {
			var t = new a;
			t.addCaret(e);
			var n = e.startContainer.childNodes[e.startOffset], r = n.previousSibling;
			if (r ? (r.nodeValue || (r = r.previousSibling), e.setStart(r, r.nodeValue.length - 1)) : e.setStart(e.startContainer, e.startOffset), t.add(e), !o.textNodes(e).length)
				return t.remove(e), e.collapse(!0), this.editor.selectRange(e), void 0;
			for (var s, l = t.end.previousSibling.previousSibling, d = this.formats, c = 0; d.length > c; c++) {
				s = d[c];
				var u = s.command(i({ range: e }, s.options.params));
				u.editor = this.editor, u.exec(), e.selectNode(l)
			}
			t.remove(e), l.parentNode && (e.setStart(l, 1), e.collapse(!0)), this.clear(), this.editor.selectRange(e)
		}
	}, hasPending: function () {
		return this.formats.length > 0
	}, isPending: function (e) {
		return !!this.getPending(e)
	}, getPending: function (e) {
		for (var t = this.formats, n = 0; t.length > n; n++)
			if (t[n].name == e)
				return t[n]
	}, toggle: function (e) {
		for (var t = this.formats, n = 0; t.length > n; n++)
			if (t[n].name == e.name)
				return t[n].params && t[n].params.value != e.params.value ? t[n].params.value = e.params.value : t.splice(n, 1), void 0;
		t.push(e)
	}, clear: function () {
		this.formats = []
	} });
	i(r, { PendingFormats: s })
}(window.kendo.jQuery), function (e, t) {
	function n(e, t) {
		return '<span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-' + e + '" title="' + t + '">' + t + "</span></span>"
	}
	function i(n, i) {
		var r, o = i !== t;
		if (n.selectionStart !== t)
			o ? (n.focus(), n.setSelectionRange(i, i)) : i = [n.selectionStart, n.selectionEnd];
		else if (document.selection)
			if (e(n).is(":visible") && n.focus(), r = document.selection.createRange(), o)
				r.move("character", i), r.select();
			else {
				var a, s, l = n.createTextRange(), d = l.duplicate();
				l.moveToBookmark(r.getBookmark()), d.setEndPoint("EndToStart", l), a = d.text.length, s = a + l.text.length, i = [a, s]
			}
		return i
	}
	var r = window.kendo, o = r.keys, a = r.ui, s = a.Widget, l = r._extractFormat, d = r.parseFloat, c = r.support.placeholder, u = r.getCulture, p = "change", f = "disabled", h = "k-input", m = "spin", g = ".kendoNumericTextBox", v = "touchend", b = "mouseleave" + g, _ = "touchstart" + g + " mousedown" + g, x = "touchcancel" + g + " " + "touchend" + g + " mouseup" + g + " " + b, k = "mouseenter" + g + " " + b, w = "k-state-default", y = "k-state-focused", C = "k-state-hover", T = ".", S = "k-state-selected", A = "k-state-disabled", D = null, E = e.proxy, F = { 190: ".", 188: "," }, I = s.extend({ init: function (e, n) {
		var i, o, a, d, c = this, u = n && n.step !== t;
		s.fn.init.call(c, e, n), n = c.options, e = c.element.on("keydown" + g, E(c._keydown, c)).on("paste" + g, E(c._paste, c)).on("blur" + g, E(c._focusout, c)).attr("role", "spinbutton"), n.placeholder = n.placeholder || e.attr("placeholder"), c._reset(), c._wrapper(), c._arrows(), c._input(), c._text.on(v + g, function () {
			c._toggleText(!1)
		}), r.support.mobileOS || c._text.on("focus" + g, E(c._click, c)), i = c.min(e.attr("min")), o = c.max(e.attr("max")), a = c._parse(e.attr("step")), n.min === D && i !== D && (n.min = i), n.max === D && o !== D && (n.max = o), u || a === D || (n.step = a), e.attr("aria-valuemin", n.min).attr("aria-valuemax", n.max), n.format = l(n.format), d = n.value, c.value(d !== D ? d : e.val()), c.enable(!e.is("[disabled]")), r.notify(c)
	}, options: { name: "NumericTextBox", decimals: D, min: D, max: D, value: D, step: 1, culture: "", format: "n", spinners: !0, placeholder: "", upArrowText: "Increase value", downArrowText: "Decrease value" }, events: [p, m], enable: function (e) {
		var t = this, n = t._text.add(t.element), i = t._inputWrapper.off(k), r = t._upArrow.off(_), o = t._downArrow.off(_);
		t._toggleText(!0), e === !1 ? (i.removeClass(w).addClass(A), n.attr(f, f)) : (i.addClass(w).removeClass(A).on(k, t._toggleHover), n.removeAttr(f), r.on(_, function (e) {
			e.preventDefault(), t._spin(1), t._upArrow.addClass(S)
		}), o.on(_, function (e) {
			e.preventDefault(), t._spin(-1), t._downArrow.addClass(S)
		}))
	}, destroy: function () {
		var e = this;
		e.element.add(e._text).add(e._upArrow).add(e._downArrow).add(e._inputWrapper).off(g), e._form && e._form.off("reset", e._resetHandler), s.fn.destroy.call(e)
	}, min: function (e) {
		return this._option("min", e)
	}, max: function (e) {
		return this._option("max", e)
	}, step: function (e) {
		return this._option("step", e)
	}, value: function (e) {
		var n, i = this;
		return e === t ? i._value : (e = i._parse(e), n = i._adjust(e), e === n && (i._update(e), i._old = i._value), t)
	}, focus: function () {
		this._focusin()
	}, _adjust: function (e) {
		var t = this, n = t.options, i = n.min, r = n.max;
		return e === D ? e : (i !== D && i > e ? e = i : r !== D && e > r && (e = r), e)
	}, _arrows: function () {
		var t, i = this, r = i.options, o = r.spinners, a = i.element;
		t = a.siblings(".k-icon"), t[0] || (t = e(n("n", r.upArrowText) + n("s", r.downArrowText)).insertAfter(a), t.wrapAll('<span class="k-select"/>')), t.on(x, function () {
			clearTimeout(i._spinning), t.removeClass(S)
		}), o || (t.toggle(o), i._inputWrapper.addClass("k-expand-padding")), i._upArrow = t.eq(0), i._downArrow = t.eq(1)
	}, _blur: function () {
		var e = this;
		e._toggleText(!0), e._change(e.element.val())
	}, _click: function (e) {
		var t = this;
		clearTimeout(t._focusing), t._focusing = setTimeout(function () {
			var n = e.target, r = i(n)[0], o = n.value.substring(0, r), a = t._format(t.options.format), s = a[","], l = RegExp("\\" + s, "g"), d = RegExp("([\\d\\" + s + "]+)(\\" + a[T] + ")?(\\d+)?"), c = d.exec(o), u = 0;
			c && (u = c[0].replace(l, "").length, -1 != o.indexOf("(") && 0 > t._value && u++), t._focusin(), i(t.element[0], u)
		})
	}, _change: function (e) {
		var t = this;
		t._update(e), e = t._value, t._old != e && (t._old = e, t.trigger(p), t.element.trigger(p))
	}, _culture: function (e) {
		return e || u(this.options.culture)
	}, _focusin: function () {
		var e = this;
		e._inputWrapper.addClass(y), e._toggleText(!1), e.element[0].focus()
	}, _focusout: function () {
		var e = this;
		clearTimeout(e._focusing), e._inputWrapper.removeClass(y), e._blur()
	}, _format: function (e, t) {
		var n = this._culture(t).numberFormat;
		return e = e.toLowerCase(), e.indexOf("c") > -1 ? n = n.currency : e.indexOf("p") > -1 && (n = n.percent), n
	}, _input: function () {
		var t, n = this, i = "k-formatted-value", r = n.element.addClass(h).show()[0], o = r.accessKey, a = n.wrapper;
		t = a.find(T + i), t[0] || (t = e('<input type="text"/>').insertBefore(r).addClass(i)), t[0].style.cssText = r.style.cssText, t[0].tabIndex = r.tabIndex, r.tabIndex = 0, r.type = "text", t.attr("placeholder", n.options.placeholder), o && (t.attr("accesskey", o), r.accessKey = ""), n._text = t.attr("readonly", !0).addClass(r.className)
	}, _keydown: function (e) {
		var t = this, n = e.keyCode;
		n == o.DOWN ? t._step(-1) : n == o.UP ? t._step(1) : n == o.ENTER && t._change(t.element.val()), t._prevent(n, e.shiftKey) && !e.ctrlKey && e.preventDefault()
	}, _paste: function (e) {
		var t = this, n = e.target, i = n.value;
		setTimeout(function () {
			t._parse(n.value) === D && t._update(i)
		})
	}, _prevent: function (e, t) {
		var n, r = this, a = r.element[0], s = a.value, l = r.options, d = l.min, c = r._format(l.format), u = c[T], p = l.decimals, f = i(a), h = f[0], m = f[1], g = 0 === h && m === s.length, v = !0;
		return p === D && (p = c.decimals), e > 16 && 21 > e || e > 32 && 37 > e || e > 47 && 58 > e || e > 95 && 106 > e || e == o.INSERT || e == o.DELETE || e == o.LEFT || e == o.RIGHT || e == o.TAB || e == o.BACKSPACE || e == o.ENTER ? (v = !1, t && (n = parseInt(String.fromCharCode(e), 10), isNaN(n) || (n += "", a.value = s.substring(0, h) + n + s.substring(m), i(a, h + n.length), v = !0))) : (F[e] === u || 110 == e) && p > 0 && (-1 == s.indexOf(u) || g) ? 110 == e ? (a.value = s.substring(0, h) + u + s.substring(m), i(a, h + u.length)) : v = !1 : !(d === D || 0 > d) || -1 != s.indexOf("-") || 189 != e && 109 != e && 173 != e || 0 !== h || (v = !1), v
	}, _option: function (e, n) {
		var i = this, r = i.options;
		return n === t ? r[e] : (n = i._parse(n), (n || "step" !== e) && (r[e] = i._parse(n), i.element.attr("aria-value" + e, r[e])), t)
	}, _spin: function (e, t) {
		var n = this;
		t = t || 500, clearTimeout(n._spinning), n._spinning = setTimeout(function () {
			n._spin(e, 50)
		}, t), n._step(e)
	}, _step: function (e) {
		var t = this, n = t.element, i = t._parse(n.val()) || 0;
		document.activeElement != n[0] && t._focusin(), i += t.options.step * e, t._update(t._adjust(i)), t.trigger(m)
	}, _toggleHover: function (t) {
		e(t.currentTarget).toggleClass(C, "mouseenter" === t.type)
	}, _toggleText: function (e) {
		var t = this;
		t._text.toggle(e), t.element.toggle(!e)
	}, _parse: function (e, t) {
		return d(e, this._culture(t), this.options.format)
	}, _update: function (e) {
		var t, n = this, i = n.options, o = i.format, a = i.decimals, s = n._culture(), l = n._format(o, s);
		a === D && (a = l.decimals), e = n._parse(e, s), t = e !== D, t && (e = parseFloat(e.toFixed(a))), n._value = e = n._adjust(e), n._placeholder(r.toString(e, o, s)), n.element.val(t ? ("" + e).replace(T, l[T]) : "").attr("aria-valuenow", e)
	}, _placeholder: function (e) {
		this._text.val(e), c || e || this._text.val(this.options.placeholder)
	}, _wrapper: function () {
		var t, n = this, i = n.element, r = i[0];
		t = i.parents(".k-numerictextbox"), t.is("span.k-numerictextbox") || (t = i.hide().wrap('<span class="k-numeric-wrap k-state-default" />').parent(), t = t.wrap("<span/>").parent()), t[0].style.cssText = r.style.cssText, r.style.width = "", n.wrapper = t.addClass("k-widget k-numerictextbox").addClass(r.className).css("display", ""), n._inputWrapper = e(t[0].firstChild)
	}, _reset: function () {
		var e = this, t = e.element, n = t.closest("form");
		n[0] && (e._resetHandler = function () {
			setTimeout(function () {
				e.value(t[0].value)
			})
		}, e._form = n.on("reset", e._resetHandler))
	} });
	a.plugin(I)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t) {
		return e = e.split(" ")[!t + 0] || e, e.replace("top", "up").replace("bottom", "down")
	}
	function i(e, t, n) {
		e = e.split(" ")[!t + 0] || e;
		var i = { origin: ["bottom", n ? "right" : "left"], position: ["top", n ? "right" : "left"] }, r = /left|right/.test(e);
		return r ? (i.origin = ["top", e], i.position[1] = l.directions[e].reverse) : (i.origin[0] = e, i.position[0] = l.directions[e].reverse), i.origin = i.origin.join(" "), i.position = i.position.join(" "), i
	}
	function r(t, n) {
		try {
			return e.contains(t, n)
		}
		catch (i) {
			return !1
		}
	}
	function o(t) {
		t = e(t), t.addClass("k-item").children(w).addClass(F), t.children("a").addClass(T).children(w).addClass(F), t.filter(":not([disabled])").addClass(O), t.filter(".k-separator:empty").append("&nbsp;"), t.filter("li[disabled]").addClass(B).removeAttr("disabled").attr("aria-disabled", !0), t.children("a").filter(":focus").parent().addClass(V), t.filter("[role]").length || t.attr("role", "menuitem"), t.children("." + T).length || t.contents().filter(function () {
			return !(this.nodeName.match(x) || 3 == this.nodeType && !e.trim(this.nodeValue))
		}).wrapAll("<span class='" + T + "'/>"), a(t), s(t)
	}
	function a(t) {
		t = e(t), t.find("> .k-link > [class*=k-i-arrow]").remove(), t.filter(":has(.k-group)").children(".k-link:not(:has([class*=k-i-arrow]))").each(function () {
			var t = e(this), n = t.parent().parent();
			t.append("<span class='k-icon " + (n.hasClass(C + "-horizontal") ? "k-i-arrow-s" : "k-i-arrow-e") + "'/>")
		})
	}
	function s(t) {
		t = e(t), t.filter(".k-first:not(:first-child)").removeClass(E), t.filter(".k-last:not(:last-child)").removeClass(S), t.filter(":first-child").addClass(E), t.filter(":last-child").addClass(S)
	}
	var l = window.kendo, d = l.ui, c = l.support.touch && l.support.mobileOS, u = c || l.support.pointers, p = l.support.mousedown, f = l.support.click, h = e.extend, m = e.proxy, g = e.each, v = l.template, b = l.keys, _ = d.Widget, x = /^(ul|a|div)$/i, k = ".kendoMenu", w = "img", y = "open", C = "k-menu", T = "k-link", S = "k-last", A = "close", D = "timer", E = "k-first", F = "k-image", I = "select", P = "zIndex", z = l.support.pointers ? "MSPointerOver" : "mouseenter", R = l.support.pointers ? "MSPointerOut" : "mouseleave", N = "kendoPopup", O = "k-state-default", M = "k-state-hover", H = "k-state-focused", B = "k-state-disabled", L = ".k-group", V = "k-state-active", U = ":not(.k-list) > .k-item", j = ".k-item.k-state-disabled", W = ".k-item:not(.k-state-disabled)", q = ".k-item:not(.k-state-disabled) > .k-link", G = ":not(.k-item.k-separator)", $ = G + ":eq(0)", Y = G + ":last", Q = "div:not(.k-animation-container,.k-list-container)", K = { content: v("<div class='k-content k-group' tabindex='-1'>#= content(item) #</div>"), group: v("<ul class='#= groupCssClass(group) #'#= groupAttributes(group) # role='menu' aria-hidden='true'>#= renderItems(data) #</ul>"), itemWrapper: v("<#= tag(item) # class='#= textClass(item) #'#= textAttributes(item) #>#= image(item) ##= sprite(item) ##= text(item) ##= arrow(data) #</#= tag(item) #>"), item: v("<li class='#= wrapperCssClass(group, item) #' role='menuitem' #=item.items ? \"aria-haspopup='true'\": \"\"##=item.enabled === false ? \"aria-disabled='true'\" : ''#>#= itemWrapper(data) ## if (item.items) { ##= subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded } }) ## } else if (item.content || item.contentUrl) { ##= renderContent(data) ## } #</li>"), image: v("<img class='k-image' alt='' src='#= imageUrl #' />"), arrow: v("<span class='#= arrowClass(item, group) #'></span>"), sprite: v("<span class='k-sprite #= spriteCssClass #'></span>"), empty: v("") }, X = { wrapperCssClass: function (e, t) {
		var n = "k-item", i = t.index;
		return n += t.enabled === !1 ? " k-state-disabled" : " k-state-default", e.firstLevel && 0 === i && (n += " k-first"), i == e.length - 1 && (n += " k-last"), t.cssClass && (n += " " + t.cssClass), n
	}, textClass: function () {
		return T
	}, textAttributes: function (e) {
		return e.url ? " href='" + e.url + "'" : ""
	}, arrowClass: function (e, t) {
		var n = "k-icon";
		return n += t.horizontal ? " k-i-arrow-s" : " k-i-arrow-e"
	}, text: function (e) {
		return e.encoded === !1 ? e.text : l.htmlEncode(e.text)
	}, tag: function (e) {
		return e.url ? "a" : "span"
	}, groupAttributes: function (e) {
		return e.expanded !== !0 ? " style='display:none'" : ""
	}, groupCssClass: function () {
		return "k-group"
	}, content: function (e) {
		return e.content ? e.content : "&nbsp;"
	} }, J = _.extend({
		init: function (t, n) {
			var i = this;
			_.fn.init.call(i, t, n), t = i.wrapper = i.element, n = i.options, i._initData(n), i._updateClasses(), i._animations(n), i.nextItemZIndex = 100, i._tabindex(), i._focusProxy = m(i._focusHandler, i), t.on("touchstart MSPointerDown", i._focusProxy).on(f + k, j, !1).on(f + k, W, m(i._click, i)).on("keydown" + k, m(i._keydown, i)).on("focus" + k, m(i._focus, i)).on("focus" + k, ".k-content", m(i._focus, i)).on("blur" + k, m(i._removeHoverItem, i)).on(z + k, W, m(i._mouseenter, i)).on(R + k, W, m(i._mouseleave, i)).on(z + k + " " + R + k + " " + p + k + " " + f + k, q, m(i._toggleHover, i)), n.openOnClick && (i.clicked = !1, i._documentClickHandler = m(i._documentClick, i), e(document).click(i._documentClickHandler)), t.attr("role", "menubar"), t[0].id && (i._ariaId = l.format("{0}_mn_active", t[0].id)), l.notify(i)
		}, events: [y, A, I], options: { name: "Menu", animation: { open: { duration: 200 }, close: { duration: 100} }, orientation: "horizontal", direction: "default", openOnClick: !1, closeOnClick: !0, hoverDelay: 100 }, _initData: function (e) {
			var t = this;
			e.dataSource && (t.element.empty(), t.append(e.dataSource, t.element))
		}, setOptions: function (e) {
			var t = this.options.animation;
			this._animations(e), e.animation = h(!0, t, e.animation), "dataSource" in e && this._initData(e), _.fn.setOptions.call(this, e)
		}, destroy: function () {
			var t = this;
			_.fn.destroy.call(t), t.element.off(k), t._documentClickHandler && e(document).unbind("click", t._documentClickHandler)
		}, enable: function (e, t) {
			return this._toggleDisabled(e, t !== !1), this
		}, disable: function (e) {
			return this._toggleDisabled(e, !1), this
		}, append: function (e, t) {
			t = this.element.find(t);
			var n = this._insert(e, t, t.length ? t.find("> .k-group, > .k-animation-container > .k-group") : null);
			return g(n.items, function () {
				n.group.append(this), a(this)
			}), a(t), s(n.group.find(".k-first, .k-last").add(n.items)), this
		}, insertBefore: function (e, t) {
			t = this.element.find(t);
			var n = this._insert(e, t, t.parent());
			return g(n.items, function () {
				t.before(this), a(this), s(this)
			}), s(t), this
		}, insertAfter: function (e, t) {
			t = this.element.find(t);
			var n = this._insert(e, t, t.parent());
			return g(n.items, function () {
				t.after(this), a(this), s(this)
			}), s(t), this
		}, _insert: function (t, n, i) {
			var r, a, s = this;
			n && n.length || (i = s.element);
			var l = e.isPlainObject(t), d = { firstLevel: i.hasClass(C), horizontal: i.hasClass(C + "-horizontal"), expanded: !0, length: i.children().length };
			return n && !i.length && (i = e(J.renderGroup({ group: d })).appendTo(n)), l || e.isArray(t) ? r = e.map(l ? [t] : t, function (t, n) {
				return "string" == typeof t ? e(t) : e(J.renderItem({ group: d, item: h(t, { index: n }) }))
			}) : (r = e(t), a = r.find("> ul").addClass("k-group").attr("role", "menu"), r = r.filter("li"), r.add(a.find("> li")).each(function () {
				o(this)
			})), { items: r, group: i}
		}, remove: function (e) {
			e = this.element.find(e);
			var t = this, n = e.parentsUntil(t.element, U), i = e.parent("ul");
			if (e.remove(), i && !i.children(U).length) {
				var r = i.parent(".k-animation-container");
				r.length ? r.remove() : i.remove()
			}
			return n.length && (n = n.eq(0), a(n), s(n)), t
		}, open: function (r) {
			var o = this, a = o.options, s = "horizontal" == a.orientation, d = a.direction, c = l.support.isRtl(o.wrapper);
			return r = o.element.find(r), /^(top|bottom|default)$/.test(d) && (d = c ? s ? (d + " left").replace("default", "bottom") : "left" : s ? (d + " right").replace("default", "bottom") : "right"), r.siblings().find(">.k-popup:visible,>.k-animation-container>.k-popup:visible").each(function () {
				var t = e(this).data("kendoPopup");
				t && t.close()
			}), r.each(function () {
				var r = e(this);
				clearTimeout(r.data(D)), r.data(D, setTimeout(function () {
					var e, l = r.find(".k-group:first:hidden");
					if (l[0] && o.trigger(y, { item: r[0] }) === !1) {
						r.data(P, r.css(P)), r.css(P, o.nextItemZIndex++), e = l.data(N);
						var u = r.parent().hasClass(C), p = u && s, f = i(d, u, c), m = a.animation.open.effects, g = m !== t ? m : "slideIn:" + n(d, u);
						e ? (e = l.data(N), e.options.origin = f.origin, e.options.position = f.position, e.options.animation.open.effects = g) : e = l.kendoPopup({ origin: f.origin, position: f.position, collision: a.popupCollision !== t ? a.popupCollision : p ? "fit" : "fit flip", anchor: r, appendTo: r, animation: { open: h(!0, { effects: g }, a.animation.open), close: a.animation.close }, close: function (e) {
							var t = e.sender.wrapper.parent();
							o.trigger(A, { item: t[0] }) ? e.preventDefault() : (t.css(P, t.data(P)), t.removeData(P))
						} }).data(N), l.removeAttr("aria-hidden"), e.open()
					}
				}, o.options.hoverDelay))
			}), o
		}, close: function (t) {
			var n = this, i = n.element;
			return t = i.find(t), t.length || (t = i.find(">.k-item")), t.each(function () {
				var t = e(this);
				clearTimeout(t.data(D)), t.data(D, setTimeout(function () {
					var e = t.find(".k-group:first:visible").data(N);
					e && (e.close(), e.element.attr("aria-hidden", !0))
				}, n.options.hoverDelay))
			}), n
		}, _toggleDisabled: function (t, n) {
			this.element.find(t).each(function () {
				e(this).toggleClass(O, n).toggleClass(B, !n).attr("aria-disabled", !n)
			})
		}, _toggleHover: function (t) {
			var n = e(l.eventTarget(t) || t.target).closest(U), i = t.type == z || -1 !== p.indexOf(t.type);
			n.parents("li." + B).length || n.toggleClass(M, i), this._removeHoverItem()
		}, _removeHoverItem: function () {
			var e = this._hoverItem();
			e && e.hasClass(H) && (e.removeClass(H), this._oldHoverItem = null)
		}, _updateClasses: function () {
			var e, t = this.element;
			t.addClass("k-widget k-reset k-header " + C).addClass(C + "-" + this.options.orientation), t.find("li > ul").addClass("k-group").attr("role", "menu").attr("aria-hidden", t.is(":visible")).end().find("li > div").addClass("k-content").attr("tabindex", "-1"), e = t.find("> li,.k-group > li"), e.each(function () {
				o(this)
			})
		}, _mouseenter: function (t) {
			var n = this, i = e(t.currentTarget), o = i.children(".k-animation-container").length || i.children(L).length;
			t.delegateTarget == i.parents(".k-menu")[0] && ((!n.options.openOnClick || n.clicked) && !r(t.currentTarget, t.relatedTarget) && o && n.open(i), (n.options.openOnClick && n.clicked || u) && i.siblings().each(m(function (e, t) {
				n.close(t)
			}, n)))
		}, _mouseleave: function (n) {
			var i = this, o = e(n.currentTarget), a = o.children(".k-animation-container").length || o.children(L).length;
			return o.parentsUntil(".k-animation-container", ".k-list-container,.k-calendar-container")[0] ? (n.stopImmediatePropagation(), t) : (i.options.openOnClick || c || l.support.pointers && 2 == n.originalEvent.pointerType || r(n.currentTarget, n.relatedTarget) || !a || i.close(o), t)
		}, _click: function (n) {
			var i, r, o, a = this, s = a.options, d = e(l.eventTarget(n)), c = d[0] ? d[0].nodeName.toUpperCase() : "", u = "INPUT" == c || "SELECT" == c || "BUTTON" == c, p = d.closest("." + T), f = d.closest(U), h = p.attr("href"), m = !!h && "#" != h.charAt(h.length - 1);
			if (!f.children(Q)[0])
				return f.hasClass(B) ? (n.preventDefault(), t) : (n.handled || !a.trigger(I, { item: f[0] }) || u || n.preventDefault(), n.handled = !0, r = f.children(L + ",.k-animation-container"), o = r.is(":visible"), s.closeOnClick && !m && (!r.length || s.openOnClick && o) ? (f.removeClass(M).css("height"), a._oldHoverItem = a._findRootParent(f), a.close(p.parentsUntil(a.element, U)), a.clicked = !1, -1 != "touchend MSPointerUp".indexOf(n.type) && n.preventDefault(), t) : ((f.parent().hasClass(C) && s.openOnClick || l.support.touch) && (m || u || n.preventDefault(), a.clicked = !0, i = r.is(":visible") ? A : y, a[i](f)), t))
		}, _documentClick: function (e) {
			r(this.element[0], e.target) || (this.clicked = !1)
		}, _focus: function (n) {
			var i = this, r = n.target, o = i._hoverItem();
			return r != i.wrapper[0] ? (n.stopPropagation(), e(r).closest(".k-content").closest(".k-group").closest(".k-item").addClass(H), i.wrapper.focus(), t) : (r == i.wrapper[0] && o.length ? i._moveHover([], o) : r != i.wrapper[0] || i._oldHoverItem || document.activeElement == i.wrapper[0] || i._moveHover([], i.wrapper.children().first()), t)
		}, _keydown: function (e) {
			var n, i, r, o = this, a = e.keyCode, s = o._oldHoverItem, d = l.support.isRtl(o.wrapper);
			if (e.target == e.currentTarget || a == b.ESC) {
				if (s || (s = o._oldHoverItem = o._hoverItem()), i = o._itemBelongsToVertival(s), r = o._itemHasChildren(s), a == b.RIGHT)
					n = o[d ? "_itemLeft" : "_itemRight"](s, i, r);
				else if (a == b.LEFT)
					n = o[d ? "_itemRight" : "_itemLeft"](s, i, r);
				else if (a == b.DOWN)
					n = o._itemDown(s, i, r);
				else if (a == b.UP)
					n = o._itemUp(s, i, r);
				else if (a == b.ESC)
					n = o._itemEsc(s, i);
				else if (a == b.ENTER || a == b.SPACEBAR)
					n = s.children(".k-link"), n.length > 0 && (o._click({ target: n[0], preventDefault: function () {
					} }), o._moveHover(s, o._findRootParent(s)));
				else if (a == b.TAB)
					return n = o._findRootParent(s), o.close(n), o._moveHover(s, n), t;
				n && n[0] && (e.preventDefault(), e.stopPropagation())
			}
		}, _hoverItem: function () {
			return this.wrapper.find(".k-item.k-state-hover,.k-item.k-state-focused").filter(":visible")
		}, _itemBelongsToVertival: function (e) {
			var t = this.wrapper.hasClass("k-menu-vertical");
			return e.length ? e.parent().hasClass("k-group") || t : t
		}, _itemHasChildren: function (e) {
			return e.length ? e.children("ul.k-group, div.k-animation-container").length > 0 : !1
		}, _moveHover: function (e, t) {
			var n = this, i = n._ariaId;
			e.length && t.length && (e.removeClass(H), e[0].id === i && e.removeAttr("id")), t.length && (t[0].id && (i = t[0].id), t.addClass(H), n._oldHoverItem = t, i && (n.element.removeAttr("aria-activedescendant"), t.attr("id", i), n.element.attr("aria-activedescendant", i)))
		}, _findRootParent: function (e) {
			return e.parent().hasClass("k-menu") ? e : e.parentsUntil(".k-menu", "li.k-item").last()
		}, _isRootItem: function (e) {
			return e.parent().hasClass("k-menu")
		}, _itemRight: function (e, t, n) {
			var i, r, o = this;
			return t ? n ? (o.open(e), i = e.find(".k-group").children().first()) : "horizontal" == o.options.orientation && (r = o._findRootParent(e), o.close(r), i = r.nextAll($)) : (i = e.nextAll($), i.length || (i = e.prevAll(Y))), i && !i.length ? i = o.wrapper.children(".k-item").first() : i || (i = []), o._moveHover(e, i), i
		}, _itemLeft: function (e, t) {
			var n, i = this;
			return t ? (n = e.parent().closest(".k-item"), i.close(n), i._isRootItem(n) && "horizontal" == i.options.orientation && (n = n.prevAll($))) : (n = e.prevAll($), n.length || (n = e.nextAll(Y))), n.length || (n = i.wrapper.children(".k-item").last()), i._moveHover(e, n), n
		}, _itemDown: function (e, t, n) {
			var i, r = this;
			if (t)
				i = e.nextAll($);
			else {
				if (!n || e.hasClass(B))
					return;
				r.open(e), i = e.find(".k-group").children().first()
			}
			return !i.length && e.length ? i = e.parent().children().first() : e.length || (i = r.wrapper.children(".k-item").first()), r._moveHover(e, i), i
		}, _itemUp: function (e, t) {
			var n, i = this;
			if (t)
				return n = e.prevAll($), !n.length && e.length ? n = e.parent().children().last() : e.length || (n = i.wrapper.children(".k-item").last()), i._moveHover(e, n), n
		}, _itemEsc: function (e, t) {
			var n, i = this;
			return t ? (n = e.parent().closest(".k-item"), i.close(n), i._moveHover(e, n), n) : e
		}, _focusHandler: function (t) {
			var n = this, i = e(l.eventTarget(t)).closest(U);
			setTimeout(function () {
				n._moveHover([], i), i.children(".k-content")[0] && i.parent().closest(".k-item").removeClass(H)
			}, 200)
		}, _animations: function (e) {
			e && "animation" in e && !e.animation && (e.animation = { open: { effects: {} }, close: { hide: !0, effects: {}} })
		}
	});
	h(J, { renderItem: function (e) {
		e = h({ menu: {}, group: {} }, e);
		var t = K.empty, n = e.item;
		return K.item(h(e, { image: n.imageUrl ? K.image : t, sprite: n.spriteCssClass ? K.sprite : t, itemWrapper: K.itemWrapper, renderContent: J.renderContent, arrow: n.items || n.content ? K.arrow : t, subGroup: J.renderGroup }, X))
	}, renderGroup: function (e) {
		return K.group(h({ renderItems: function (e) {
			for (var t = "", n = 0, i = e.items, r = i ? i.length : 0, o = h({ length: r }, e.group); r > n; n++)
				t += J.renderItem(h(e, { group: o, item: h({ index: n }, i[n]) }));
			return t
		} }, e, X))
	}, renderContent: function (e) {
		return K.content(h(e, X))
	} }), l.ui.plugin(J)
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		return t = null != t ? t : "", t.type || e.type(t) || "string"
	}
	function i(t) {
		t.find(":input:not(:button, [" + s.attr("role") + "=upload], [" + s.attr("skip") + "]), select").each(function () {
			var t = s.attr("bind"), n = this.getAttribute(t) || "", i = "checkbox" === this.type || "radio" === this.type ? "checked:" : "value:", r = this.name;
			-1 === n.indexOf(i) && r && (n += (n.length ? "," : "") + i + r, e(this).attr(t, n))
		})
	}
	function r(e) {
		var t, i, r = (e.model.fields || e.model)[e.field], o = n(r), a = r ? r.validation : {}, l = s.attr("type"), d = s.attr("bind"), c = { name: e.field };
		for (t in a)
			i = a[t], f(t, v) >= 0 ? c[l] = t : u(i) || (c[t] = p(i) ? i.value || t : i), c[s.attr(t + "-msg")] = i.message;
		return f(o, v) >= 0 && (c[l] = o), c[d] = ("boolean" === o ? "checked:" : "value:") + e.field, c
	}
	function o(e) {
		var t, n, i, r, o, a;
		if (e && e.length)
			for (a = [], t = 0, n = e.length; n > t; t++)
				i = e[t], o = i.text || i.value || i, r = null == i.value ? i.text || i : i.value, a[t] = { text: o, value: r };
		return a
	}
	function a(e, t) {
		var n, i = e ? e.validation || {} : {};
		for (n in i)
			u(i[n]) && (t[n] = i[n])
	}
	var s = window.kendo, l = s.ui, d = l.Widget, c = e.extend, u = e.isFunction, p = e.isPlainObject, f = e.inArray, h = /(\[|\]|\$|\.|\:|\+)/g, m = '<div class="k-widget k-tooltip k-tooltip-validation" style="margin:0.5em"><span class="k-icon k-warning"> </span>#=message#<div class="k-callout k-callout-n"></div></div>', g = "change", v = ["url", "email", "number", "date", "boolean"], b = { number: function (t, n) {
		var i = r(n);
		e('<input type="text"/>').attr(i).appendTo(t).kendoNumericTextBox({ format: n.format }), e("<span " + s.attr("for") + '="' + n.field + '" class="k-invalid-msg"/>').hide().appendTo(t)
	}, date: function (t, n) {
		var i = r(n), o = n.format;
		o && (o = s._extractFormat(o)), i[s.attr("format")] = o, e('<input type="text"/>').attr(i).appendTo(t).kendoDatePicker({ format: n.format }), e("<span " + s.attr("for") + '="' + n.field + '" class="k-invalid-msg"/>').hide().appendTo(t)
	}, string: function (t, n) {
		var i = r(n);
		e('<input type="text" class="k-input k-textbox"/>').attr(i).appendTo(t)
	}, "boolean": function (t, n) {
		var i = r(n);
		e('<input type="checkbox" />').attr(i).appendTo(t)
	}, values: function (t, n) {
		var i = r(n);
		e("<select " + s.attr("text-field") + '="text"' + s.attr("value-field") + '="value"' + s.attr("source") + "='" + s.stringify(o(n.values)).replace(/\'/g, "&apos;") + "'" + s.attr("role") + '="dropdownlist"/>').attr(i).appendTo(t), e("<span " + s.attr("for") + '="' + n.field + '" class="k-invalid-msg"/>').hide().appendTo(t)
	} }, _ = d.extend({ init: function (t, n) {
		var i = this;
		d.fn.init.call(i, t, n), i._validateProxy = e.proxy(i._validate, i), i.refresh()
	}, events: [g], options: { name: "Editable", editors: b, clearContainer: !0, errorTemplate: m }, editor: function (e, t) {
		var i = this, r = i.options.editors, o = p(e), a = o ? e.field : e, s = i.options.model || {}, l = o && e.values, d = l ? "values" : n(t), u = o && e.editor, f = u ? e.editor : r[d], m = i.element.find("[data-container-for=" + a.replace(h, "\\$1") + "]");
		f = f ? f : r.string, u && "string" == typeof e.editor && (f = function (t) {
			t.append(e.editor)
		}), m = m.length ? m : i.element, f(m, c(!0, {}, o ? e : { field: a }, { model: s }))
	}, _validate: function (t) {
		var n, i = this, r = "boolean" == typeof t.value, o = i._validationEventInProgress, a = {};
		a[t.field] = t.value, n = e(":input[" + s.attr("bind") + '="' + (r ? "checked:" : "value:") + t.field + '"]', i.element);
		try {
			i._validationEventInProgress = !0, (!i.validatable.validateInput(n) || !o && i.trigger(g, { values: a })) && t.preventDefault()
		}
		finally {
			i._validationEventInProgress = !1
		}
	}, end: function () {
		return this.validatable.validate()
	}, destroy: function () {
		var e = this;
		d.fn.destroy.call(e), e.options.model.unbind("set", e._validateProxy), s.unbind(e.element), s.destroy(e.element), e.element.removeData("kendoValidator")
	}, refresh: function () {
		var n, r, o, l, d, c, u, f = this, h = f.options.fields || [], m = f.options.clearContainer ? f.element.empty() : f.element, g = f.options.model || {}, v = {};
		for (e.isArray(h) || (h = [h]), n = 0, r = h.length; r > n; n++)
			o = h[n], l = p(o), d = l ? o.field : o, c = (g.fields || g)[d], a(c, v), f.editor(o, c);
		if (!r) {
			u = g.fields || g;
			for (d in u)
				a(u[d], v)
		}
		i(m), s.bind(m, f.options.model), f.options.model.bind("set", f._validateProxy), f.validatable = m.kendoValidator({ validateOnBlur: !1, errorTemplate: f.options.errorTemplate || t, rules: v }).data("kendoValidator"), m.find(":focusable:first").focus()
	} });
	l.plugin(_)
}(window.kendo.jQuery), function (e) {
	function t(n, i) {
		n.filters && (n.filters = e.grep(n.filters, function (e) {
			return t(e, i), e.filters ? e.filters.length : e.field != i
		}))
	}
	function n(e) {
		var t, n, i, r, o, a;
		if (e && e.length)
			for (a = [], t = 0, n = e.length; n > t; t++)
				i = e[t], o = i.text || i.value || i, r = null == i.value ? i.text || i : i.value, a[t] = { text: o, value: r };
		return a
	}
	var i = window.kendo, r = i.ui, o = e.proxy, a = "kendoPopup", s = ".kendoFilterMenu", l = "Is equal to", d = "Is not equal to", c = { number: "numerictextbox", date: "datepicker" }, u = e.isFunction, p = r.Widget, f = '<div><div class="k-filter-help-text">#=messages.info#</div><label><input type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>#=messages.isTrue#</label><label><input type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>#=messages.isFalse#</label><div><button type="submit" class="k-button">#=messages.filter#</button><button type="reset" class="k-button">#=messages.clear#</button></div></div>', h = '<div><div class="k-filter-help-text">#=messages.info#</div><select data-#=ns#bind="value: filters[0].operator" data-#=ns#role="dropdownlist">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select>#if(values){#<select data-#=ns#bind="value:filters[0].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#"></select>#}else{#<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""# />#}##if(extra){#<select class="k-filter-and" data-#=ns#bind="value: logic" data-#=ns#role="dropdownlist"><option value="and">#=messages.and#</option><option value="or">#=messages.or#</option></select><select data-#=ns#bind="value: filters[1].operator" data-#=ns#role="dropdownlist">#for(var op in operators){#<option value="#=op#">#=operators[op]#</option>#}#</select>#if(values){#<select data-#=ns#bind="value:filters[1].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#"></select>#}else{#<input data-#=ns#bind="value: filters[1].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""#/>#}##}#<div><button type="submit" class="k-button">#=messages.filter#</button><button type="reset" class="k-button">#=messages.clear#</button></div></div>', m = p.extend({ init: function (t, r) {
		var l, d, m, g, v = this, b = "string", _ = r.ui, x = u(_);
		p.fn.init.call(v, t, r), g = r.operators || {}, t = v.element, r = v.options, r.appendToElement ? v.link = e() : (d = t.addClass("k-filterable").find(".k-grid-filter"), d[0] || (d = t.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter")), d.attr("tabindex", -1).on("click" + s, o(v._click, v))), v._refreshHandler = o(v.refresh, v), v.dataSource = r.dataSource.bind("change", v._refreshHandler), v.field = r.field || t.attr(i.attr("field")), v.model = v.dataSource.reader.model, v._parse = function (e) {
			return e + ""
		}, v.model && v.model.fields && (m = v.model.fields[v.field], m && (b = m.type || "string", m.parse && (v._parse = o(m.parse, m)))), r.values && (b = "enums"), g = g[b] || r.operators[b];
		var k;
		for (k in g)
			break;
		v._defaultFilter = function () {
			return { field: v.field, operator: k || "eq", value: ""}
		}, x || (l = _ || c[b]), v.form = e('<form class="k-filter-menu"/>').html(i.template("boolean" === b ? f : h)({ field: v.field, ns: i.ns, messages: r.messages, extra: r.extra, operators: g, type: b, role: l, values: n(r.values) })).on("keydown" + s, o(v._keydown, v)).on("submit" + s, o(v._submit, v)).on("reset" + s, o(v._reset, v)), r.appendToElement ? (t.append(v.form), v.popup = v.element.closest(".k-popup").data(a)) : (v.popup = v.form[a]({ anchor: d, open: o(v._open, v), activate: o(v._activate, v), close: v.options.closeCallback }).data(a), v.link = d), x && v.form.find(".k-textbox").removeClass("k-textbox").each(function () {
			_(e(this))
		}), v.form.find("[" + i.attr("role") + "=numerictextbox]").removeClass("k-textbox").end().find("[" + i.attr("role") + "=datetimepicker]").removeClass("k-textbox").end().find("[" + i.attr("role") + "=timepicker]").removeClass("k-textbox").end().find("[" + i.attr("role") + "=datepicker]").removeClass("k-textbox"), v.refresh()
	}, refresh: function () {
		var e = this, t = e.dataSource.filter() || { filters: [], logic: "and" };
		e.filterModel = i.observable({ logic: "and", filters: [e._defaultFilter(), e._defaultFilter()] }), i.bind(e.form.children().first(), e.filterModel), e._bind(t) ? e.link.addClass("k-state-active") : e.link.removeClass("k-state-active")
	}, destroy: function () {
		var e = this;
		p.fn.destroy.call(e), i.unbind(e.form), i.destroy(e.form), e.form.unbind(s), e.popup.destroy(), e.link.unbind(s), e.dataSource.unbind("change", e._refreshHandler)
	}, _bind: function (e) {
		var t, n, i, r, o = this, a = e.filters, s = !1, l = 0, d = o.filterModel;
		for (t = 0, n = a.length; n > t; t++)
			r = a[t], r.field == o.field ? (d.set("logic", e.logic), i = d.filters[l], i || (d.filters.push({ field: o.field }), i = d.filters[l]), i.set("value", o._parse(r.value)), i.set("operator", r.operator), l++, s = !0) : r.filters && (s = s || o._bind(r));
		return s
	}, _merge: function (n) {
		var i, r, o, a = this, s = n.logic || "and", l = n.filters, d = a.dataSource.filter() || { filters: [], logic: "and" };
		for (t(d, a.field), l = e.grep(l, function (e) {
			return "" !== e.value
		}), r = 0, o = l.length; o > r; r++)
			i = l[r], i.value = a._parse(i.value);
		return l.length && (d.filters.length ? (n.filters = l, "and" !== d.logic && (d.filters = [{ logic: d.logic, filters: d.filters}], d.logic = "and"), l.length > 1 ? d.filters.push(n) : d.filters.push(l[0])) : (d.filters = l, d.logic = s)), d
	}, filter: function (e) {
		e = this._merge(e), e.filters.length && this.dataSource.filter(e)
	}, clear: function () {
		var t = this, n = t.dataSource.filter() || { filters: [] };
		n.filters = e.grep(n.filters, function (n) {
			return n.filters ? (n.filters = e.grep(n.filters, function (e) {
				return e.field != t.field
			}), n.filters.length) : n.field != t.field
		}), n.filters.length || (n = null), t.dataSource.filter(n)
	}, _submit: function (e) {
		var t = this;
		e.preventDefault(), t.filter(t.filterModel.toJSON()), t.popup.close()
	}, _reset: function () {
		this.clear(), this.popup.close()
	}, _click: function (e) {
		e.preventDefault(), e.stopPropagation(), this.popup.toggle()
	}, _open: function () {
		var t;
		e(".k-filter-menu").not(this.form).each(function () {
			t = e(this).data(a), t && t.close()
		})
	}, _activate: function () {
		this.form.find(":focusable:first").focus()
	}, _keydown: function (e) {
		e.keyCode == i.keys.ESC && this.popup.close()
	}, options: { name: "FilterMenu", extra: !0, appendToElement: !1, type: "string", operators: { string: { eq: l, neq: d, startswith: "Starts with", contains: "Contains", doesnotcontain: "Does not contain", endswith: "Ends with" }, number: { eq: l, neq: d, gte: "Is greater than or equal to", gt: "Is greater than", lte: "Is less than or equal to", lt: "Is less than" }, date: { eq: l, neq: d, gte: "Is after or equal to", gt: "Is after", lte: "Is before or equal to", lt: "Is before" }, enums: { eq: l, neq: d} }, messages: { info: "Show items with value that:", isTrue: "is true", isFalse: "is false", filter: "Filter", clear: "Clear", and: "And", or: "Or", selectValue: "-Select value-"}} });
	r.plugin(m)
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		t = e(t), t.children(v).children(".k-icon").remove(), t.filter(":has(.k-panel),:has(.k-content)").children(".k-link:not(:has([class*=k-i-arrow]))").each(function () {
			var t = e(this), n = t.parent();
			t.append("<span class='k-icon " + (n.hasClass(z) ? "k-i-arrow-n k-panelbar-collapse" : "k-i-arrow-s k-panelbar-expand") + "'/>")
		})
	}
	function i(t) {
		t = e(t), t.filter(".k-first:not(:first-child)").removeClass(y), t.filter(".k-last:not(:last-child)").removeClass(m), t.filter(":first-child").addClass(y), t.filter(":last-child").addClass(m)
	}
	var r = window.kendo, o = r.ui, a = r.keys, s = e.extend, l = e.each, d = r.template, c = o.Widget, u = /^(ul|a|div)$/i, p = ".kendoPanelBar", f = "img", h = "href", m = "k-last", g = "k-link", v = "." + g, b = "error", _ = ".k-item", x = ".k-group", k = x + ":visible", w = "k-image", y = "k-first", C = "expand", T = "select", S = "k-content", A = "activate", D = "collapse", E = "contentUrl", F = "mouseenter", I = "mouseleave", P = "contentLoad", z = "k-state-active", R = "> .k-panel", N = "> .k-content", O = "k-state-focused", M = "k-state-disabled", H = "k-state-selected", B = "." + H, L = "k-state-highlighted", V = _ + ":not(.k-state-disabled)", U = V + " > .k-link", j = _ + ".k-state-disabled > .k-link", W = "> li > " + B + ", .k-panel > li > " + B, q = "k-state-default", G = "aria-disabled", $ = "aria-expanded", Y = "aria-hidden", Q = "aria-selected", K = ":visible", X = ":empty", J = "single", Z = { content: d("<div role='region' class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"), group: d("<ul role='group' aria-hidden='true' class='#= groupCssClass(group) #'#= groupAttributes(group) #>#= renderItems(data) #</ul>"), itemWrapper: d("<#= tag(item) # class='#= textClass(item, group) #' #= contentUrl(item) ##= textAttributes(item) #>#= image(item) ##= sprite(item) ##= text(item) ##= arrow(data) #</#= tag(item) #>"), item: d("<li role='menuitem' #=aria(item)#class='#= wrapperCssClass(group, item) #'>#= itemWrapper(data) ## if (item.items) { ##= subGroup({ items: item.items, panelBar: panelBar, group: { expanded: item.expanded } }) ## } else if (item.content || item.contentUrl) { ##= renderContent(data) ## } #</li>"), image: d("<img class='k-image' alt='' src='#= imageUrl #' />"), arrow: d("<span class='#= arrowClass(item) #'></span>"), sprite: d("<span class='k-sprite #= spriteCssClass #'></span>"), empty: d("") }, et = { aria: function (e) {
		var t = "";
		return (e.items || e.content || e.contentUrl) && (t += $ + "='" + (e.expanded ? "true" : "false") + "' "), e.enabled === !1 && (t += G + "='true'"), t
	}, wrapperCssClass: function (e, t) {
		var n = "k-item", i = t.index;
		return n += t.enabled === !1 ? " " + M : t.expanded === !0 ? " " + z : " k-state-default", 0 === i && (n += " k-first"), i == e.length - 1 && (n += " k-last"), t.cssClass && (n += " " + t.cssClass), n
	}, textClass: function (e, t) {
		var n = g;
		return t.firstLevel && (n += " k-header"), n
	}, textAttributes: function (e) {
		return e.url ? " href='" + e.url + "'" : ""
	}, arrowClass: function (e) {
		var t = "k-icon";
		return t += e.expanded ? " k-i-arrow-n k-panelbar-collapse" : " k-i-arrow-s k-panelbar-expand"
	}, text: function (e) {
		return e.encoded === !1 ? e.text : r.htmlEncode(e.text)
	}, tag: function (e) {
		return e.url ? "a" : "span"
	}, groupAttributes: function (e) {
		return e.expanded !== !0 ? " style='display:none'" : ""
	}, groupCssClass: function () {
		return "k-group k-panel"
	}, contentAttributes: function (e) {
		return e.item.expanded !== !0 ? " style='display:none'" : ""
	}, content: function (e) {
		return e.content ? e.content : e.contentUrl ? "" : "&nbsp;"
	}, contentUrl: function (e) {
		return e.contentUrl ? r.attr("content-url") + '="' + e.contentUrl + '"' : ""
	} }, tt = c.extend({ init: function (t, n) {
		var i, o = this;
		c.fn.init.call(o, t, n), t = o.wrapper = o.element.addClass("k-widget k-reset k-header k-panelbar"), n = o.options, t[0].id && (o._itemId = t[0].id + "_pb_active"), o._tabindex(), o._initData(n), o._updateClasses(), o._animations(n), t.on("click" + p, U, function (t) {
			o._click(e(t.currentTarget)) && t.preventDefault()
		}).on(F + p + " " + I + p, U, o._toggleHover).on("touchend" + p + " mouseup" + p, j, !1).on("keydown" + p, e.proxy(o._keydown, o)).on("focus" + p, function () {
			var e = o.select();
			o._current(e[0] ? e : o._first())
		}).on("blur" + p, function () {
			o._current(null)
		}).attr("role", "menu"), n.contentUrls && t.find("> .k-item").each(function (t, i) {
			e(i).find(v).data(E, n.contentUrls[t])
		}), i = t.find("li." + z + " > ." + S), i[0] && o.expand(i.parent(), !1), r.notify(o)
	}, events: [C, D, T, A, b, P], options: { name: "PanelBar", animation: { expand: { effects: "expand:vertical", duration: 200 }, collapse: { duration: 200} }, expandMode: "multiple" }, destroy: function () {
		c.fn.destroy.call(this), this.element.off(p), r.destroy(this.element)
	}, _initData: function (e) {
		var t = this;
		e.dataSource && (t.element.empty(), t.append(e.dataSource, t.element))
	}, setOptions: function (e) {
		var t = this.options.animation;
		this._animations(e), e.animation = s(!0, t, e.animation), "dataSource" in e && this._initData(e), c.fn.setOptions.call(this, e)
	}, expand: function (t, n) {
		var i = this, r = {};
		return n = n !== !1, t = this.element.find(t), t.each(function (o, a) {
			a = e(a);
			var s = a.find(R).add(a.find(N));
			if (!a.hasClass(M) && s.length > 0) {
				if (i.options.expandMode == J && i._collapseAllExpanded(a))
					return i;
				t.find("." + L).removeClass(L), a.addClass(L), n || (r = i.options.animation, i.options.animation = { expand: { effects: {} }, collapse: { hide: !0, effects: {}} }), i._triggerEvent(C, a) || i._toggleItem(a, !1), n || (i.options.animation = r)
			}
		}), i
	}, collapse: function (t, n) {
		var i = this, r = {};
		return n = n !== !1, t = i.element.find(t), t.each(function (t, o) {
			o = e(o);
			var a = o.find(R).add(o.find(N));
			!o.hasClass(M) && a.is(K) && (o.removeClass(L), n || (r = i.options.animation, i.options.animation = { expand: { effects: {} }, collapse: { hide: !0, effects: {}} }), i._triggerEvent(D, o) || i._toggleItem(o, !0), n || (i.options.animation = r))
		}), i
	}, _toggleDisabled: function (e, t) {
		e = this.element.find(e), e.toggleClass(q, t).toggleClass(M, !t).attr(G, !t)
	}, select: function (n) {
		var i = this;
		return n === t ? i.element.find(W).parent() : (i.element.find(n).each(function () {
			var n = e(this), r = n.children(v);
			return n.hasClass(M) ? i : (i._updateSelected(r), t)
		}), i)
	}, enable: function (e, t) {
		return this._toggleDisabled(e, t !== !1), this
	}, disable: function (e) {
		return this._toggleDisabled(e, !1), this
	}, append: function (e, t) {
		t = this.element.find(t);
		var r = this._insert(e, t, t.length ? t.find(R) : null);
		return l(r.items, function () {
			r.group.append(this), i(this)
		}), n(t), i(r.group.find(".k-first, .k-last")), r.group.height("auto"), this
	}, insertBefore: function (e, t) {
		t = this.element.find(t);
		var n = this._insert(e, t, t.parent());
		return l(n.items, function () {
			t.before(this), i(this)
		}), i(t), n.group.height("auto"), this
	}, insertAfter: function (e, t) {
		t = this.element.find(t);
		var n = this._insert(e, t, t.parent());
		return l(n.items, function () {
			t.after(this), i(this)
		}), i(t), n.group.height("auto"), this
	}, remove: function (e) {
		e = this.element.find(e);
		var t = this, r = e.parentsUntil(t.element, _), o = e.parent("ul");
		return e.remove(), !o || o.hasClass("k-panelbar") || o.children(_).length || o.remove(), r.length && (r = r.eq(0), n(r), i(r)), t
	}, reload: function (t) {
		var n = this;
		t = n.element.find(t), t.each(function () {
			var t = e(this);
			n._ajaxRequest(t, t.children("." + S), !t.is(K))
		})
	}, _first: function () {
		return this.element.children(V).first()
	}, _last: function () {
		var e = this.element.children(V).last(), t = e.children(k);
		return t[0] ? t.children(V).last() : e
	}, _current: function (e) {
		var n = this, i = n._focused, r = n._itemId;
		return e === t ? i : (n.element.removeAttr("aria-activedescendant"), i && (i[0].id === r && i.removeAttr("id"), i.children(v).removeClass(O)), e && (r = e[0].id || r, e.attr("id", r).children(v).addClass(O), n.element.attr("aria-activedescendant", r)), n._focused = e, t)
	}, _keydown: function (e) {
		var t = this, n = e.keyCode, i = t._current();
		e.target == e.currentTarget && (n == a.DOWN || n == a.RIGHT ? (t._current(t._nextItem(i)), e.preventDefault()) : n == a.UP || n == a.LEFT ? (t._current(t._prevItem(i)), e.preventDefault()) : n == a.ENTER || n == a.SPACEBAR ? (t._click(i.children(v)), e.preventDefault()) : n == a.HOME ? (t._current(t._first()), e.preventDefault()) : n == a.END && (t._current(t._last()), e.preventDefault()))
	}, _nextItem: function (e) {
		if (!e)
			return this._first();
		var t = e.children(k), n = e.next();
		return t[0] && (n = t.children("." + y)), n[0] || (n = e.parent(k).parent(_).next()), n[0] && n.is(":visible") || (n = this._first()), n.hasClass(M) && (n = this._nextItem(n)), n
	}, _prevItem: function (e) {
		if (!e)
			return this._last();
		var t, n = e.prev();
		if (n[0])
			for (t = n; t[0];)
				t = t.children(k).children("." + m), t[0] && (n = t);
		else
			n = e.parent(k).parent(_), n[0] || (n = this._last());
		return n.hasClass(M) && (n = this._prevItem(n)), n
	}, _insert: function (t, n, i) {
		var r, o, a = this, l = e.isPlainObject(t), d = n && n[0];
		return d || (i = a.element), o = { firstLevel: i.hasClass("k-panelbar"), expanded: i.parent().hasClass(z), length: i.children().length }, d && !i.length && (i = e(tt.renderGroup({ group: o })).appendTo(n)), l || e.isArray(t) ? (r = e.map(l ? [t] : t, function (t, n) {
			return "string" == typeof t ? e(t) : e(tt.renderItem({ group: o, item: s(t, { index: n }) }))
		}), d && n.attr($, !1)) : (r = e(t), a._updateItemsClasses(r)), { items: r, group: i}
	}, _toggleHover: function (t) {
		var n = e(t.currentTarget);
		n.parents("li." + M).length || n.toggleClass("k-state-hover", t.type == F)
	}, _updateClasses: function () {
		var t, r, o = this;
		t = o.element.find("li > ul").not(function () {
			return e(this).parentsUntil(".k-panelbar", "div").length
		}).addClass("k-group k-panel").attr("role", "group"), t.parent().attr($, !1).not("." + z).children("ul").attr(Y, !0).hide(), r = o.element.add(t).children(), o._updateItemsClasses(r), n(r), i(r)
	}, _updateItemsClasses: function (e) {
		for (var t = e.length, n = 0; t > n; n++)
			this._updateItemClasses(e[n])
	}, _updateItemClasses: function (t) {
		var n, i = this._selected;
		t = e(t).addClass("k-item").attr("role", "menuitem"), t.children(f).addClass(w), t.children("a").addClass(g).children(f).addClass(w), t.filter(":not([disabled]):not([class*=k-state])").addClass("k-state-default"), t.filter("li[disabled]").addClass("k-state-disabled").attr(G, !0).removeAttr("disabled"), t.children("div").addClass(S).attr("role", "region").attr(Y, !0).hide().parent().attr($, !1), n = t.children(B), n[0] && (i && i.removeAttr(Q).children(B).removeClass(H), n.addClass(H), this._selected = t.attr(Q, !0)), t.children(v)[0] || t.contents().filter(function () {
			return !(this.nodeName.match(u) || 3 == this.nodeType && !e.trim(this.nodeValue))
		}).wrapAll("<span class='" + g + "'/>"), t.parent(".k-panelbar")[0] && t.children(v).addClass("k-header")
	}, _click: function (e) {
		var t, n, i, r, o = this, a = o.element;
		if (!e.parents("li." + M).length && e.closest(".k-widget")[0] == a[0]) {
			var s = e.closest(v), l = s.closest(_);
			if (o._updateSelected(s), n = l.find(R).add(l.find(N)), i = s.attr(h), r = s.data(E) || i && ("#" == i.charAt(i.length - 1) || -1 != i.indexOf("#" + o.element[0].id + "-")), t = !(!r && !n.length), n.data("animating"))
				return t;
			if (o._triggerEvent(T, l) && (t = !0), t !== !1) {
				if (o.options.expandMode == J && o._collapseAllExpanded(l))
					return t;
				if (n.length) {
					var d = n.is(K);
					o._triggerEvent(d ? D : C, l) || (t = o._toggleItem(l, d))
				}
				return t
			}
		}
	}, _toggleItem: function (e, t) {
		var n, i, r = this, o = e.find(R);
		return o.length ? (this._toggleGroup(o, t), n = !0) : (i = e.children("." + S), i.length && (n = !0, i.is(X) ? r._ajaxRequest(e, i, t) : r._toggleGroup(i, t))), n
	}, _toggleGroup: function (e, t) {
		var n = this, i = n.options.animation, r = i.expand, o = s({}, i.collapse), a = o && "effects" in o;
		e.is(K) == t && (e.parent().attr($, !t).attr(Y, t).toggleClass(q, t).toggleClass(z, !t).find("> .k-link > .k-icon").toggleClass("k-i-arrow-n", !t).toggleClass("k-panelbar-collapse", !t).toggleClass("k-i-arrow-s", t).toggleClass("k-panelbar-expand", t), r = t ? s(a ? o : s({ reverse: !0 }, r), { hide: !0 }) : s({ complete: function (e) {
			n._triggerEvent(A, e.closest(_))
		} }, r), e.kendoStop(!0, !0).kendoAnimate(r))
	}, _collapseAllExpanded: function (t) {
		var n, i = this, r = !1;
		if (t.children(v).hasClass("k-header")) {
			var o = t.find(R).add(t.find(N));
			return o.is(K) && (r = !0), o.is(K) || 0 === o.length || (n = e(i.element).children(), n.find(R).add(n.find(N)).filter(function () {
				return e(this).is(K)
			}).each(function (t, n) {
				n = e(n), r = i._triggerEvent(D, n.closest(_)), r || i._toggleGroup(n, !0)
			})), r
		}
	}, _ajaxRequest: function (t, n, i) {
		var r = this, o = t.find(".k-panelbar-collapse, .k-panelbar-expand"), a = t.find(v), s = setTimeout(function () {
			o.addClass("k-loading")
		}, 100), l = {};
		e.ajax({ type: "GET", cache: !1, url: a.data(E) || a.attr(h), dataType: "html", data: l, error: function (e, t) {
			o.removeClass("k-loading"), r.trigger(b, { xhr: e, status: t }) && this.complete()
		}, complete: function () {
			clearTimeout(s), o.removeClass("k-loading")
		}, success: function (e) {
			n.html(e), r._toggleGroup(n, i), r.trigger(P, { item: t[0], contentElement: n[0] })
		} })
	}, _triggerEvent: function (e, t) {
		var n = this;
		return n.trigger(e, { item: t[0] })
	}, _updateSelected: function (e) {
		var t = this, n = t.element, i = e.parent(_), r = t._selected;
		r && r.removeAttr(Q), t._selected = i.attr(Q, !0), n.find(W).removeClass(H), n.find("> .k-state-highlighted, .k-panel > .k-state-highlighted").removeClass(L), e.addClass(H), e.parentsUntil(n, _).filter(":has(.k-header)").addClass(L), t._current(i)
	}, _animations: function (e) {
		e && "animation" in e && !e.animation && (e.animation = { expand: { effects: {} }, collapse: { hide: !0, effects: {}} })
	} });
	s(tt, { renderItem: function (e) {
		e = s({ panelBar: {}, group: {} }, e);
		var t = Z.empty, n = e.item;
		return Z.item(s(e, { image: n.imageUrl ? Z.image : t, sprite: n.spriteCssClass ? Z.sprite : t, itemWrapper: Z.itemWrapper, renderContent: tt.renderContent, arrow: n.items || n.content || n.contentUrl ? Z.arrow : t, subGroup: tt.renderGroup }, et))
	}, renderGroup: function (e) {
		return Z.group(s({ renderItems: function (e) {
			for (var t = "", n = 0, i = e.items, r = i ? i.length : 0, o = s({ length: r }, e.group); r > n; n++)
				t += tt.renderItem(s(e, { group: o, item: s({ index: n }, i[n]) }));
			return t
		} }, e, et))
	}, renderContent: function (e) {
		return Z.content(s(e, et))
	} }), r.ui.plugin(tt)
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		t.children(m).addClass(y), t.children("a").addClass(b).children(m).addClass(y), t.filter(":not([disabled]):not([class*=k-state-disabled])").addClass(z), t.filter("li[disabled]").addClass(P).removeAttr("disabled"), t.filter(":not([class*=k-state])").children("a").filter(":focus").parent().addClass(R + " " + M), t.attr("role", "tab"), t.filter("." + R).attr("aria-selected", !0), t.each(function () {
			var t = e(this);
			t.children("." + b).length || t.contents().filter(function () {
				return !(this.nodeName.match(f) || 3 == this.nodeType && !d(this.nodeValue))
			}).wrapAll("<a class='" + b + "'/>")
		})
	}
	function i(e) {
		var t = e.children(".k-item");
		t.filter(".k-first:not(:first-child)").removeClass(C), t.filter(".k-last:not(:last-child)").removeClass(_), t.filter(":first-child").addClass(C), t.filter(":last-child").addClass(_)
	}
	var r = window.kendo, o = r.ui, a = r.keys, s = e.map, l = e.each, d = e.trim, c = e.extend, u = r.template, p = o.Widget, f = /^(a|div)$/i, h = ".kendoTabStrip", m = "img", g = "href", v = "prev", b = "k-link", _ = "k-last", x = "click", k = "error", w = ":empty", y = "k-image", C = "k-first", T = "select", S = "activate", A = "k-content", D = "contentUrl", E = "mouseenter", F = "mouseleave", I = "contentLoad", P = "k-state-disabled", z = "k-state-default", R = "k-state-active", N = "k-state-focused", O = "k-state-hover", M = "k-tab-on-top", H = ".k-item:not(." + P + ")", B = ".k-tabstrip-items > " + H, L = ".k-tabstrip-items > " + H + ":not(." + R + ")", V = ".k-tabstrip-items > .k-state-disabled .k-link", U = { content: u("<div class='k-content'#= contentAttributes(data) # role='tabpanel'>#= content(item) #</div>"), itemWrapper: u("<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>#= image(item) ##= sprite(item) ##= text(item) #</#= tag(item) #>"), item: u("<li class='#= wrapperCssClass(group, item) #' role='tab' #=item.active ? \"aria-selected='true'\" : ''#>#= itemWrapper(data) #</li>"), image: u("<img class='k-image' alt='' src='#= imageUrl #' />"), sprite: u("<span class='k-sprite #= spriteCssClass #'></span>"), empty: u("") }, j = { wrapperCssClass: function (e, t) {
		var n = "k-item", i = t.index;
		return n += t.enabled === !1 ? " k-state-disabled" : " k-state-default", 0 === i && (n += " k-first"), i == e.length - 1 && (n += " k-last"), n
	}, textAttributes: function (e) {
		return e.url ? " href='" + e.url + "'" : ""
	}, text: function (e) {
		return e.encoded === !1 ? e.text : r.htmlEncode(e.text)
	}, tag: function (e) {
		return e.url ? "a" : "span"
	}, contentAttributes: function (e) {
		return e.active !== !0 ? " style='display:none' aria-hidden='true' aria-expanded='false'" : ""
	}, content: function (e) {
		return e.content ? e.content : e.contentUrl ? "" : "&nbsp;"
	}, contentUrl: function (e) {
		return e.contentUrl ? r.attr("content-url") + '="' + e.contentUrl + '"' : ""
	} }, W = p.extend({ init: function (t, n) {
		var i = this;
		p.fn.init.call(i, t, n), i._animations(i.options), i.wrapper = i.element.is("ul") ? i.element.wrapAll("<div />").parent() : i.element, n = i.options, i.wrapper.on(x + h, V, !1).on("touchend" + h + " mouseup" + h, B, function (t) {
			i._click(e(t.currentTarget)) && t.preventDefault()
		}).on(E + h + " " + F + h, L, i._toggleHover).on("keydown" + h, e.proxy(i._keydown, i)).on("focus" + h, e.proxy(i._active, i)).on("blur" + h, function () {
			i._current(null)
		}), i._isRtl = r.support.isRtl(i.wrapper), i._tabindex(), i._updateClasses(), i._dataSource(), n.dataSource && i.dataSource.fetch(), i.options.contentUrls && i.wrapper.find(".k-tabstrip-items > .k-item").each(function (t, n) {
			e(n).find(">." + b).data(D, i.options.contentUrls[t])
		});
		var o = i.tabGroup.children("li." + R), a = i.contentHolder(o.index());
		a.length > 0 && 0 === a[0].childNodes.length && i.activateTab(o.eq(0)), i.element.attr("role", "tablist"), i.element[0].id && (i._ariaId = i.element[0].id + "_ts_active"), r.notify(i)
	}, _active: function () {
		var e = this.tabGroup.children().filter("." + R);
		this._current(e[0] ? e : this._endItem("first"))
	}, _endItem: function (e) {
		return this.tabGroup.children(H)[e]()
	}, _item: function (e, t) {
		var n;
		return n = t === v ? "last" : "first", e ? (e = e[t](), e[0] || (e = this._endItem(n)), e.hasClass(P) && (e = this._item(e, t)), e) : this._endItem(n)
	}, _current: function (e) {
		var n = this, i = n._focused, r = n._ariaId;
		return e === t ? i : (i && (i[0].id === r && i.removeAttr("id"), i.removeClass(N)), e && (e.hasClass(R) || e.addClass(N), n.element.removeAttr("aria-activedescendant"), r = e[0].id || r, r && (e.attr("id", r), n.element.attr("aria-activedescendant", r))), n._focused = e, t)
	}, _keydown: function (e) {
		var n, i = this, r = e.keyCode, o = i._current(), s = i._isRtl;
		if (e.target == e.currentTarget) {
			if (r == a.DOWN || r == a.RIGHT)
				n = s ? v : "next";
			else if (r == a.UP || r == a.LEFT)
				n = s ? "next" : v;
			else if (r == a.ENTER || r == a.SPACEBAR)
				i._click(o), e.preventDefault();
			else {
				if (r == a.HOME)
					return i._click(i._endItem("first")), e.preventDefault(), t;
				if (r == a.END)
					return i._click(i._endItem("last")), e.preventDefault(), t
			}
			n && (i._click(i._item(o, n)), e.preventDefault())
		}
	}, _dataSource: function () {
		var t = this;
		t.dataSource && t._refreshHandler ? t.dataSource.unbind("change", t._refreshHandler) : t._refreshHandler = e.proxy(t.refresh, t), t.dataSource = r.data.DataSource.create(t.options.dataSource).bind("change", t._refreshHandler)
	}, setDataSource: function (e) {
		this.options.dataSource = e, this._dataSource(), e.fetch()
	}, _animations: function (e) {
		e && "animation" in e && !e.animation && (e.animation = { open: { effects: {} }, close: { effects: {}} })
	}, refresh: function (e) {
		var t, n, i, o, a = this, s = a.options, l = r.getter(s.dataTextField), d = r.getter(s.dataContentField), c = r.getter(s.dataContentUrlField), u = r.getter(s.dataImageUrlField), p = r.getter(s.dataUrlField), f = r.getter(s.dataSpriteCssClass), h = [], m = a.dataSource.view();
		for (e = e || {}, i = e.action, i && (m = e.items), t = 0, o = m.length; o > t; t++)
			n = { text: l(m[t]) }, s.dataContentField && (n.content = d(m[t])), s.dataContentUrlField && (n.contentUrl = c(m[t])), s.dataUrlField && (n.url = p(m[t])), s.dataImageUrlField && (n.imageUrl = u(m[t])), s.dataSpriteCssClass && (n.spriteCssClass = f(m[t])), h[t] = n;
		if ("add" == e.action)
			a.tabGroup.children().length > e.index ? a.insertBefore(h, a.tabGroup.children().eq(e.index)) : a.append(h);
		else if ("remove" == e.action)
			for (t = 0; m.length > t; t++)
				a.remove(e.index);
		else
			"itemchange" == e.action ? (t = a.dataSource.view().indexOf(m[0]), e.field === s.dataTextField && a.tabGroup.children().eq(t).find(".k-link").text(m[0].get(e.field))) : (a.trigger("dataBinding"), a.remove("li"), a.append(h), a.trigger("dataBound"))
	}, value: function (n) {
		var i = this;
		return n === t ? i.select().text() : (n != i.value() && i.tabGroup.children().each(function () {
			e.trim(e(this).text()) == n && i.select(this)
		}), t)
	}, items: function () {
		return this.tabGroup[0].children
	}, setOptions: function (e) {
		var t = this.options.animation;
		this._animations(e), e.animation = c(!0, t, e.animation), p.fn.setOptions.call(this, e)
	}, events: [T, S, k, I, "change", "dataBinding", "dataBound"], options: { name: "TabStrip", dataTextField: "", dataContentField: "", dataImageUrlField: "", dataUrlField: "", dataSpriteCssClass: "", dataContentUrlField: "", animation: { open: { effects: "expand:vertical fadeIn", duration: 200 }, close: { duration: 200} }, collapsible: !1 }, destroy: function () {
		var e = this;
		p.fn.destroy.call(e), e._refreshHandler && e.dataSource.unbind("change", e._refreshHandler), e.wrapper.off(h), r.destroy(e.wrapper)
	}, select: function (t) {
		var n = this;
		return 0 === arguments.length ? n.tabGroup.children("li." + R) : (isNaN(t) || (t = n.tabGroup.children().get(t)), t = n.tabGroup.find(t), e(t).each(function (t, i) {
			i = e(i), i.hasClass(R) || n.trigger(T, { item: i[0], contentElement: n.contentHolder(i.index())[0] }) || n.activateTab(i)
		}), n)
	}, enable: function (e, t) {
		return this._toggleDisabled(e, t !== !1), this
	}, disable: function (e) {
		return this._toggleDisabled(e, !1), this
	}, reload: function (t) {
		t = this.tabGroup.find(t);
		var n = this;
		return t.each(function () {
			var t = e(this), i = t.find("." + b).data(D), r = n.contentHolder(t.index());
			i && n.ajaxRequest(t, r, null, i)
		}), n
	}, append: function (e) {
		var t = this, n = t._create(e);
		return l(n.tabs, function (e) {
			t.tabGroup.append(this), t.wrapper.append(n.contents[e])
		}), i(t.tabGroup), t._updateContentElements(), t
	}, insertBefore: function (t, n) {
		var r = this, o = r._create(t), a = e(r.contentElement(n.index()));
		return l(o.tabs, function (e) {
			n.before(this), a.before(o.contents[e])
		}), i(r.tabGroup), r._updateContentElements(), r
	}, insertAfter: function (t, n) {
		var r = this, o = r._create(t), a = e(r.contentElement(n.index()));
		return l(o.tabs, function (e) {
			n.after(this), a.after(o.contents[e])
		}), i(r.tabGroup), r._updateContentElements(), r
	}, remove: function (t) {
		var n = this, i = typeof t, r = e();
		return "string" === i ? t = n.tabGroup.find(t) : "number" === i && (t = n.tabGroup.children().eq(t)), t.each(function () {
			r.push(n.contentElement(e(this).index()))
		}), t.remove(), r.remove(), n._updateContentElements(), n
	}, _create: function (i) {
		var r, o, a = e.isPlainObject(i), l = this;
		return a || e.isArray(i) ? (i = e.isArray(i) ? i : [i], r = s(i, function (t, n) {
			return e(W.renderItem({ group: l.tabGroup, item: c(t, { index: n }) }))
		}), o = s(i, function (n, i) {
			return n.content || n.contentUrl ? e(W.renderContent({ item: c(n, { index: i }) })) : t
		})) : (r = e(i), o = e("<div class='" + A + "'/>"), n(r)), { tabs: r, contents: o}
	}, _toggleDisabled: function (t, n) {
		t = this.tabGroup.find(t), t.each(function () {
			e(this).toggleClass(z, n).toggleClass(P, !n)
		})
	}, _updateClasses: function () {
		var r, o, a, s = this;
		s.wrapper.addClass("k-widget k-header k-tabstrip"), s.tabGroup = s.wrapper.children("ul").addClass("k-tabstrip-items k-reset"), s.tabGroup[0] || (s.tabGroup = e("<ul class='k-tabstrip-items k-reset'/>").appendTo(s.wrapper)), r = s.tabGroup.find("li").addClass("k-item"), r.length && (o = r.filter("." + R).index(), a = o >= 0 ? o : t, s.tabGroup.contents().filter(function () {
			return 3 == this.nodeType && !d(this.nodeValue)
		}).remove()), o >= 0 && r.eq(o).addClass(M), s.contentElements = s.wrapper.children("div"), s.contentElements.addClass(A).eq(a).addClass(R).css({ display: "block" }), r.length && (n(r), i(s.tabGroup), s._updateContentElements())
	}, _updateContentElements: function () {
		var t = this, n = t.options.contentUrls || [], i = t.element.attr("id"), o = t.wrapper.children("div");
		t.tabGroup.find(".k-item").each(function (r) {
			var a = o.eq(r), s = i + "-" + (r + 1);
			this.setAttribute("aria-controls", s), !a.length && n[r] ? e("<div id='" + s + "' class='" + A + "'/>").appendTo(t.wrapper) : a.attr("id", s), a.attr("role", "tabpanel"), a.filter(":not(." + R + ")").attr("aria-hidden", !0).attr("aria-expanded", !1), a.filter("." + R).attr("aria-expanded", !0)
		}), t.contentElements = t.contentAnimators = t.wrapper.children("div"), r.kineticScrollNeeded && r.mobile.ui.Scroller && (r.touchScroller(t.contentElements), t.contentElements = t.contentElements.children(".km-scroll-container"))
	}, _toggleHover: function (t) {
		e(t.currentTarget).toggleClass(O, t.type == E)
	}, _click: function (e) {
		var t, n, i = this, r = e.find("." + b), o = r.attr(g), a = i.options.collapsible, s = i.contentHolder(e.index());
		if (e.closest(".k-widget")[0] == i.wrapper[0]) {
			if (e.is("." + P + (a ? "" : ",." + R)))
				return !0;
			if (n = r.data(D) || o && ("#" == o.charAt(o.length - 1) || -1 != o.indexOf("#" + i.element[0].id + "-")), t = !o || n, i.tabGroup.children("[data-animating], [data-in-request]").length)
				return t;
			if (i.trigger(T, { item: e[0], contentElement: s[0] }))
				return !0;
			if (t !== !1)
				return a && e.is("." + R) ? (i.deactivateTab(e), !0) : (i.activateTab(e) && (t = !0), t)
		}
	}, deactivateTab: function (e) {
		var t = this, n = t.options.animation, i = n.open, o = c({}, n.close), a = o && "effects" in o;
		e = t.tabGroup.find(e), o = c(a ? o : c({ reverse: !0 }, i), { hide: !0 }), r.size(i.effects) ? (e.kendoAddClass(z, { duration: i.duration }), e.kendoRemoveClass(R, { duration: i.duration })) : (e.addClass(z), e.removeClass(R)), e.removeAttr("aria-selected"), t.contentAnimators.filter("." + R).kendoStop(!0, !0).kendoAnimate(o).removeClass(R).attr("aria-hidden", !0)
	}, activateTab: function (e) {
		e = this.tabGroup.find(e);
		var t = this, n = t.options.animation, i = n.open, o = c({}, n.close), a = o && "effects" in o, s = e.parent().children(), l = s.filter("." + R), d = s.index(e);
		o = c(a ? o : c({ reverse: !0 }, i), { hide: !0 }), r.size(i.effects) ? (l.kendoRemoveClass(R, { duration: o.duration }), e.kendoRemoveClass(O, { duration: o.duration })) : (l.removeClass(R), e.removeClass(O));
		var u = t.contentAnimators;
		if (0 === u.length)
			return l.removeClass(M), e.addClass(M).css("z-index"), e.addClass(R), t._current(e), t.trigger("change"), !1;
		var p = u.filter("." + R), f = t.contentHolder(d), h = f.closest(".k-content");
		if (0 === f.length)
			return p.removeClass(R).attr("aria-hidden", !0).kendoStop(!0, !0).kendoAnimate(o), !1;
		e.attr("data-animating", !0);
		var m = (e.children("." + b).data(D) || !1) && f.is(w), g = function () {
			l.removeClass(M), e.addClass(M).css("z-index"), r.size(i.effects) ? (l.kendoAddClass(z, { duration: i.duration }), e.kendoAddClass(R, { duration: i.duration })) : (l.addClass(z), e.addClass(R)), l.removeAttr("aria-selected"), e.attr("aria-selected", !0), t._current(e), h.addClass(R).removeAttr("aria-hidden").kendoStop(!0, !0).attr("aria-expanded", !0).kendoAnimate(c({ init: function () {
				t.trigger(S, { item: e[0], contentElement: f[0] })
			} }, i, { complete: function () {
				e.removeAttr("data-animating")
			} }))
		}, v = function () {
			m ? t.ajaxRequest(e, f, function () {
				g(), t.trigger("change")
			}) : (g(), t.trigger("change"))
		};
		return p.removeClass(R), p.attr("aria-hidden", !0), p.attr("aria-expanded", !1), p.length ? p.kendoStop(!0, !0).kendoAnimate(c({ complete: v }, o)) : v(), !0
	}, contentElement: function (e) {
		if (isNaN(e - 0))
			return t;
		var n = this.contentElements && this.contentElements[0] && !r.kineticScrollNeeded ? this.contentElements : this.contentAnimators, i = RegExp("-" + (e + 1) + "$");
		if (n)
			for (var o = 0, a = n.length; a > o; o++)
				if (i.test(n.closest(".k-content")[o].id))
					return n[o];
		return t
	}, contentHolder: function (t) {
		var n = e(this.contentElement(t)), i = n.children(".km-scroll-container");
		return r.support.touch && i[0] ? i : n
	}, ajaxRequest: function (t, n, i, r) {
		if (t = this.tabGroup.find(t), !t.find(".k-loading").length) {
			var o = this, a = t.find("." + b), s = {}, l = null, d = setTimeout(function () {
				l = e("<span class='k-icon k-loading'/>").prependTo(a)
			}, 100);
			t.attr("data-in-request", !0), e.ajax({ type: "GET", cache: !1, url: r || a.data(D) || a.attr(g), dataType: "html", data: s, error: function (e, n) {
				t.removeAttr("data-animating"), o.trigger("error", { xhr: e, status: n }) && this.complete()
			}, complete: function () {
				t.removeAttr("data-in-request"), clearTimeout(d), null !== l && l.remove()
			}, success: function (e) {
				n.html(e), i && i.call(o, n), o.trigger(I, { item: t[0], contentElement: n[0] })
			} })
		}
	} });
	c(W, { renderItem: function (e) {
		e = c({ tabStrip: {}, group: {} }, e);
		var t = U.empty, n = e.item;
		return U.item(c(e, { image: n.imageUrl ? U.image : t, sprite: n.spriteCssClass ? U.sprite : t, itemWrapper: U.itemWrapper }, j))
	}, renderContent: function (e) {
		return U.content(c(e, j))
	} }), r.ui.plugin(W)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		var i, r = e.getTimezoneOffset();
		e.setTime(e.getTime() + t), n || (i = e.getTimezoneOffset() - r, e.setTime(e.getTime() + i * A))
	}
	function i() {
		var e = new B, t = new B(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0), n = new B(e.getFullYear(), e.getMonth(), e.getDate(), 12, 0, 0);
		return -1 * (t.getTimezoneOffset() - n.getTimezoneOffset())
	}
	function r(e) {
		return 60 * e.getHours() * A + e.getMinutes() * A + 1e3 * e.getSeconds() + e.getMilliseconds()
	}
	function o(e, t, n) {
		var i, o = r(t), a = r(n);
		return e && o != a ? (i = r(e), o > i && (i += D), o > a && (a += D), i >= o && a >= i) : !0
	}
	function a(e) {
		var t = e.parseFormats;
		e.format = c(e.format || l.getCulture(e.culture).calendars.standard.patterns.t), t = O(t) ? t : [t], t.splice(0, 0, e.format), e.parseFormats = t
	}
	function s(e) {
		e.preventDefault()
	}
	var l = window.kendo, d = l.keys, c = l._extractFormat, u = l.support.browser, p = l.ui, f = p.Widget, h = "open", m = "close", g = "change", v = ".kendoTimePicker", b = "touchend" + v + " click" + v, _ = "k-state-default", x = "disabled", k = "li", w = "<span/>", y = "k-state-focused", C = "k-state-hover", T = "mouseenter" + v + " mouseleave" + v, S = "mousedown" + v, A = 6e4, D = 864e5, E = "k-state-selected", F = "k-state-disabled", I = "aria-selected", P = "aria-expanded", z = "aria-hidden", R = "aria-activedescendant", N = "id", O = e.isArray, M = e.extend, H = e.proxy, B = Date, L = new B;
	L = new B(L.getFullYear(), L.getMonth(), L.getDate(), 0, 0, 0);
	var V = function (t) {
		var n = this, i = t.id;
		n.options = t, n.ul = e('<ul tabindex="-1" role="listbox" aria-hidden="true" unselectable="on" class="k-list k-reset"/>').css({ overflow: l.support.kineticScrollNeeded ? "" : "auto" }).on(b, k, H(n._click, n)).on("mouseenter" + v, k, function () {
			e(this).addClass(C)
		}).on("mouseleave" + v, k, function () {
			e(this).removeClass(C)
		}), n.list = e("<div class='k-list-container'/>").append(n.ul).on(S, s), i && (n._timeViewID = i + "_timeview", n._optionID = i + "_option_selected", n.ul.attr(N, n._timeViewID)), n._popup(), n.template = l.template('<li tabindex="-1" role="option" class="k-item" unselectable="on">#=data#</li>', { useWithBlock: !1 })
	};
	V.prototype = { current: function (n) {
		var i = this, r = i.options.active;
		return n === t ? i._current : (i._current && i._current.removeClass(E).removeAttr(I).removeAttr(N), n && (n = e(n).addClass(E).attr(N, i._optionID).attr(I, !0), i.scroll(n[0])), i._current = n, r && r(n), t)
	}, close: function () {
		this.popup.close()
	}, destroy: function () {
		var e = this;
		e.ul.off(v), e.list.off(v), e.popup.destroy()
	}, open: function () {
		var e = this;
		e.ul[0].firstChild || e.bind(), e.popup.open(), e._current && e.scroll(e._current[0])
	}, dataBind: function (e) {
		for (var t, n = this, i = n.options, r = i.format, a = l.toString, s = n.template, d = e.length, c = 0, u = ""; d > c; c++)
			t = e[c], o(t, i.min, i.max) && (u += s(a(t, r, i.culture)));
		n._html(u, d)
	}, refresh: function () {
		var e, t = this, o = t.options, a = o.format, s = i(), d = 0 > s, c = o.min, u = o.max, p = r(c), f = r(u), h = o.interval * A, m = l.toString, g = t.template, v = new B(+c), b = 0, _ = "";
		for (e = d ? (D + s * A) / h : D / h, p != f && (p > f && (f += D), e = (f - p) / h + 1); e > b; b++)
			b && n(v, h, d), f && r(v) > f && (v = new B(+u)), _ += g(m(v, a, o.culture));
		t._html(_, e)
	}, bind: function () {
		var e = this, t = e.options.dates;
		t && t[0] ? e.dataBind(t) : e.refresh()
	}, _html: function (e, t) {
		var n = this;
		n.ul[0].innerHTML = e, n._height(t), n.current(null), n.select(n._value)
	}, scroll: function (e) {
		if (e) {
			var t = this.ul[0], n = e.offsetTop, i = e.offsetHeight, r = t.scrollTop, o = t.clientHeight, a = n + i;
			t.scrollTop = r > n ? n : a > r + o ? a - o : r
		}
	}, select: function (t) {
		var n = this, i = n.options, r = n._current;
		t instanceof Date && (t = l.toString(t, i.format, i.culture)), "string" == typeof t && (r && r.text() === t ? t = r : (t = e.grep(n.ul[0].childNodes, function (e) {
			return (e.textContent || e.innerText) == t
		}), t = t[0] ? t : null)), n.current(t)
	}, toggle: function () {
		var e = this;
		e.popup.visible() ? e.close() : e.open()
	}, value: function (e) {
		var t = this;
		t._value = e, t.ul[0].firstChild && t.select(e)
	}, _click: function (t) {
		var n = this, i = e(t.currentTarget);
		t.isDefaultPrevented() || (n.select(i), n.options.change(i.text(), !0), n.close())
	}, _height: function (e) {
		if (e) {
			var t = this, n = t.list, i = n.parent(".k-animation-container"), r = t.options.height;
			n.add(i).show().height(t.ul[0].scrollHeight > r ? r : "auto").hide()
		}
	}, _parse: function (e) {
		var t = this, n = t.options, i = t._value || L;
		return e instanceof B ? e : (e = l.parseDate(e, n.parseFormats, n.culture), e && (e = new B(i.getFullYear(), i.getMonth(), i.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds())), e)
	}, _adjustListWidth: function () {
		var e, t, n = this.list, i = n[0].style.width, r = this.options.anchor;
		(n.data("width") || !i) && (e = window.getComputedStyle ? window.getComputedStyle(r[0], null) : 0, t = e ? parseFloat(e.width) : r.outerWidth(), e && (u.mozilla || u.msie) && (t += parseFloat(e.paddingLeft) + parseFloat(e.paddingRight) + parseFloat(e.borderLeftWidth) + parseFloat(e.borderRightWidth)), i = t - (n.outerWidth() - n.width()), n.css({ fontFamily: r.css("font-family"), width: i }).data("width", i))
	}, _popup: function () {
		var e = this, t = e.list, n = e.options, i = n.anchor;
		e.popup = new p.Popup(t, M(n.popup, { anchor: i, open: n.open, close: n.close, animation: n.animation, isRtl: l.support.isRtl(n.anchor) })), l.touchScroller(e.popup.element)
	}, move: function (e) {
		var n = this, i = e.keyCode, r = n.ul[0], o = n._current, a = i === d.DOWN;
		if (i === d.UP || a) {
			if (e.altKey)
				return n.toggle(a), t;
			o = a ? o ? o[0].nextSibling : r.firstChild : o ? o[0].previousSibling : r.lastChild, o && n.select(o), n.options.change(n._current.text()), e.preventDefault()
		}
		else
			(i === d.ENTER || i === d.TAB || i === d.ESC) && (e.preventDefault(), o && n.options.change(o.text(), !0), n.close())
	} }, V.getMilliseconds = r, l.TimeView = V;
	var U = f.extend({ init: function (e, t) {
		var n, i, r = this;
		f.fn.init.call(r, e, t), e = r.element, t = r.options, a(t), r._wrapper(), r.timeView = i = new V(M({}, t, { id: e.attr(N), anchor: r.wrapper, format: t.format, change: function (t, n) {
			n ? r._change(t) : e.val(t)
		}, open: function (t) {
			r.timeView._adjustListWidth(), r.trigger(h) ? t.preventDefault() : (e.attr(P, !0), n.attr(z, !1))
		}, close: function (t) {
			r.trigger(m) ? t.preventDefault() : (e.attr(P, !1), n.attr(z, !0))
		}, active: function (t) {
			e.removeAttr(R), t && e.attr(R, i._optionID)
		} })), n = i.ul, r._icon(), r._reset(), e[0].type = "text", e.addClass("k-input").on("keydown" + v, H(r._keydown, r)).on("blur" + v, H(r._blur, r)).on("focus" + v, function () {
			r._inputWrapper.addClass(y)
		}).attr({ role: "textbox", "aria-haspopup": !0, "aria-expanded": !1, "aria-owns": i._timeViewID }), r.enable(!e.is("[disabled]")), r.value(t.value || e.val()), l.notify(r)
	}, options: { name: "TimePicker", min: L, max: L, format: "", dates: [], parseFormats: [], value: null, interval: 30, height: 200, animation: {} }, events: [h, m, g], setOptions: function (e) {
		var t = this, n = t.timeView, i = n.options;
		f.fn.setOptions.call(t, e), a(t.options), n.options = M(i, t.options, { active: i.active, change: i.change, close: i.close, open: i.open }), n.ul[0].innerHTML = ""
	}, dataBind: function (e) {
		O(e) && this.timeView.dataBind(e)
	}, enable: function (e) {
		var t = this, n = t.element, i = t._arrow.off(v), r = t._inputWrapper.off(T);
		e === !1 ? (r.removeClass(_).addClass(F), n.attr(x, x)) : (r.removeClass(F).addClass(_).on(T, t._toggleHover), n.removeAttr(x), i.on(b, H(t._click, t)).on(S, s))
	}, destroy: function () {
		var e = this;
		f.fn.destroy.call(e), e.timeView.destroy(), e.element.off(v), e._arrow.off(v), e._inputWrapper.off(v), e._form && e._form.off("reset", e._resetHandler)
	}, close: function () {
		this.timeView.close()
	}, open: function () {
		this.timeView.open()
	}, min: function (e) {
		return this._option("min", e)
	}, max: function (e) {
		return this._option("max", e)
	}, value: function (e) {
		var n = this;
		return e === t ? n._value : (n._old = n._update(e), null === n._old && n.element.val(""), t)
	}, _blur: function () {
		var e = this;
		e.close(), e._change(e.element.val()), e._inputWrapper.removeClass(y)
	}, _click: function (e) {
		var t = this, n = t.element;
		t.timeView.toggle(), "click" === e.type && n[0] !== document.activeElement && n.focus()
	}, _change: function (e) {
		var t = this;
		e = t._update(e), +t._old != +e && (t._old = e, t.trigger(g), t.element.trigger(g))
	}, _icon: function () {
		var t, n = this, i = n.element;
		t = i.next("span.k-select"), t[0] || (t = e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(i)), n._arrow = t.attr({ role: "button", "aria-controls": n.timeView._timeViewID })
	}, _keydown: function (e) {
		var t = this, n = e.keyCode, i = t.timeView;
		i.popup.visible() || e.altKey ? i.move(e) : n === d.ENTER && t._change(t.element.val())
	}, _option: function (e, n) {
		var i = this, r = i.options;
		return n === t ? r[e] : (n = i.timeView._parse(n), n && (n = new B(+n), r[e] = n, i.timeView.options[e] = n, i.timeView.bind()), t)
	}, _toggleHover: function (t) {
		e(t.currentTarget).toggleClass(C, "mouseenter" === t.type)
	}, _update: function (e) {
		var t = this, n = t.options, i = t.timeView, r = i._parse(e);
		return o(r, n.min, n.max) || (r = null), t._value = r, t.element.val(r ? l.toString(r, n.format, n.culture) : e), i.value(r), r
	}, _wrapper: function () {
		var t, n = this, i = n.element;
		t = i.parents(".k-timepicker"), t[0] || (t = i.wrap(w).parent().addClass("k-picker-wrap k-state-default"), t = t.wrap(w).parent()), t[0].style.cssText = i[0].style.cssText, n.wrapper = t.addClass("k-widget k-timepicker k-header").addClass(i[0].className), i.css({ width: "100%", height: i[0].style.height }), n._inputWrapper = e(t[0].firstChild)
	}, _reset: function () {
		var e = this, t = e.element, n = t.closest("form");
		n[0] && (e._resetHandler = function () {
			e.value(t[0].defaultValue)
		}, e._form = n.on("reset", e._resetHandler))
	} });
	p.plugin(U)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		e.preventDefault()
	}
	function i(e) {
		var t = r.getCulture(e.culture).calendars.standard.patterns;
		e.format = s(e.format || t.g), e.timeFormat = s(e.timeFormat || t.t), r.DateView.normalize(e), e.parseFormats.splice(1, 0, e.timeFormat)
	}
	var r = window.kendo, o = r.TimeView, a = r.parseDate, s = r._extractFormat, l = r.calendar, d = l.isInRange, c = l.restrictValue, u = l.isEqualDatePart, p = o.getMilliseconds, f = r.ui, h = f.Widget, m = "open", g = "close", v = "change", b = ".kendoDateTimePicker", _ = "touchend" + b + " click" + b, x = "disabled", k = "k-state-default", w = "k-state-focused", y = "k-state-hover", C = "k-state-disabled", T = "mouseenter" + b + " mouseleave" + b, S = "touchstart" + b + " mousedown" + b, A = "month", D = "<span/>", E = "aria-activedescendant", F = "aria-expanded", I = "aria-hidden", P = "aria-owns", z = Date, R = new z(1900, 0, 1), N = new z(2099, 11, 31), O = { view: "date" }, M = { view: "time" }, H = e.extend, B = h.extend({ init: function (t, n) {
		var o = this;
		h.fn.init.call(o, t, n), t = o.element, n = o.options, i(n), o._wrapper(), o._views(), o._icons(), o._reset(), o._template(), t[0].type = "text", t.addClass("k-input").on("keydown" + b, e.proxy(o._keydown, o)).on("focus" + b, function () {
			o._inputWrapper.addClass(w)
		}).on("blur" + b, function () {
			o._inputWrapper.removeClass(w), o._change(t.val()), o.close("date"), o.close("time")
		}).attr({ role: "textbox", "aria-haspopup": !0, "aria-expanded": !1 }), o._midnight = 0 === p(n.min) + p(n.max), o.enable(!t.is("[disabled]")), o.value(n.value || t.val()), r.notify(o)
	}, options: { name: "DateTimePicker", value: null, format: "", timeFormat: "", culture: "", parseFormats: [], dates: [], min: new z(R), max: new z(N), interval: 30, height: 200, footer: "", start: A, depth: A, animation: {}, month: {}, ARIATemplate: 'Current focused date is #=kendo.toString(data.current, "G")#' }, events: [m, g, v], setOptions: function (e) {
		var t = this, n = t.dateView.options, r = t.timeView.options;
		h.fn.setOptions.call(t, e), i(t.options), e = t.options, H(n, e, { change: n.change, close: n.close, open: n.open }), H(r, e, { format: e.timeFormat, active: r.active, change: r.change, close: r.close, open: r.open }), t.timeView.ul[0].innerHTML = ""
	}, enable: function (e) {
		var t = this, i = t.element, r = t._dateIcon.off(b), o = t._timeIcon.off(b), a = t._inputWrapper.off(T);
		e === !1 ? (a.removeClass(k).addClass(C), i.attr(x, x)) : (a.addClass(k).removeClass(C).on(T, t._toggleHover), i.removeAttr(x), r.on(S, n).on(_, function (e) {
			t.toggle("date"), "click" === e.type && i[0] !== document.activeElement && i.focus()
		}), o.on(S, n).on(_, function (e) {
			t.toggle("time"), "click" === e.type && i[0] !== document.activeElement && i.focus()
		}))
	}, destroy: function () {
		var e = this;
		h.fn.destroy.call(e), e.dateView.destroy(), e.timeView.destroy(), e.element.off(b), e._dateIcon.off(b), e._timeIcon.off(b), e._inputWrapper.off(b), e._form && e._form.off("reset", e._resetHandler)
	}, close: function (e) {
		"time" !== e && (e = "date"), this[e + "View"].close()
	}, open: function (e) {
		"time" !== e && (e = "date"), this[e + "View"].open()
	}, min: function (e) {
		return this._option("min", e)
	}, max: function (e) {
		return this._option("max", e)
	}, toggle: function (e) {
		var t = "timeView";
		"time" !== e ? e = "date" : t = "dateView", this[e + "View"].toggle(), this[t].close()
	}, value: function (e) {
		var n = this;
		return e === t ? n._value : (n._old = n._update(e), null === n._old && n.element.val(""), t)
	}, _change: function (e) {
		var t = this;
		e = t._update(e), +t._old != +e && (t._old = e, t.trigger(v), t.element.trigger(v))
	}, _option: function (e, n) {
		var i = this, r = i.options, o = i.timeView, s = o.options, l = i._value || i._old;
		if (n === t)
			return r[e];
		if (n = a(n, r.parseFormats, r.culture)) {
			if (r[e] = new z(+n), i.dateView[e](n), i._midnight = 0 === p(r.min) + p(r.max), l && u(n, l)) {
				if (i._midnight && "max" == e)
					return s[e] = N, o.dataBind([N]), t;
				s[e] = n
			}
			else
				s.max = N, s.min = R;
			o.bind()
		}
	}, _toggleHover: function (t) {
		e(t.currentTarget).toggleClass(y, "mouseenter" === t.type)
	}, _update: function (t) {
		var n, i, o, s, l, p = this, f = p.options, h = f.min, m = f.max, g = f.dates, v = p.timeView, b = a(t, f.parseFormats, f.culture);
		return +b === +p._value ? (l = r.toString(b, f.format, f.culture), l !== t && p.element.val(null === b ? t : l), b) : (null !== b && u(b, h) ? b = c(b, h, m) : d(b, h, m) || (b = null), p._value = b, v.value(b), p.dateView.value(b), b && (o = p._old, i = v.options, g[0] && (g = e.grep(g, function (e) {
			return u(b, e)
		}), g[0] && (v.dataBind(g), s = !0)), s || (u(b, h) && (i.min = h, i.max = N, n = !0), u(b, m) && (p._midnight ? (v.dataBind([N]), s = !0) : (i.max = m, n || (i.min = R), n = !0))), !s && (!o && n || o && !u(o, b)) && (n || (i.max = N, i.min = R), v.bind())), p.element.val(b ? r.toString(b, f.format, f.culture) : t), p._updateARIA(b), b)
	}, _keydown: function (e) {
		var t = this, n = t.dateView, i = t.timeView, o = n.popup.visible();
		e.altKey && e.keyCode === r.keys.DOWN ? t.toggle(o ? "time" : "date") : o ? (n.move(e), t._updateARIA(n._current)) : i.popup.visible() ? i.move(e) : e.keyCode === r.keys.ENTER && t._change(t.element.val())
	}, _views: function () {
		var e, t, n, i, s, l = this, c = l.element, u = l.options, p = c.attr("id");
		l.dateView = e = new r.DateView(H({}, u, { id: p, anchor: l.wrapper, change: function () {
			var t, n = e.calendar.value(), i = +n, r = +u.min, o = +u.max;
			(i === r || i === o) && (t = new z(+l._value), t.setFullYear(n.getFullYear()), t.setMonth(n.getMonth()), t.setDate(n.getDate()), d(t, r, o) && (n = t)), l._change(n), l.close("date")
		}, close: function (e) {
			l.trigger(g, O) ? e.preventDefault() : (c.attr(F, !1), n.attr(I, !0), t.popup.visible() || c.removeAttr(P))
		}, open: function (t) {
			l.trigger(m, O) ? t.preventDefault() : (s = a(c.val(), u.parseFormats, u.culture), s ? (l.dateView._current = s, l.dateView.calendar._focus(s)) : l.dateView.value(s), n.attr(I, !1), c.attr(F, !0).attr(P, e._dateViewID))
		} })), n = e.div, l.timeView = t = new o({ id: p, value: u.value, anchor: l.wrapper, animation: u.animation, format: u.timeFormat, culture: u.culture, height: u.height, interval: u.interval, min: new z(R), max: new z(N), parseFormats: u.parseFormats, change: function (n, i) {
			n = t._parse(n), u.min > n ? (n = new z(+u.min), t.options.min = n) : n > u.max && (n = new z(+u.max), t.options.max = n), i ? (l._timeSelected = !0, l._change(n)) : (c.val(r.toString(n, u.format, u.culture)), e.value(n), l._updateARIA(n))
		}, close: function (t) {
			l.trigger(g, M) ? t.preventDefault() : (i.attr(I, !0), c.attr(F, !1), e.popup.visible() || c.removeAttr(P))
		}, open: function (e) {
			t._adjustListWidth(), l.trigger(m, M) ? e.preventDefault() : (i.attr(I, !1), c.attr(F, !0).attr(P, t._timeViewID))
		}, active: function (e) {
			c.removeAttr(E), e && c.attr(E, t._optionID)
		} }), i = t.ul
	}, _icons: function () {
		var t, n = this, i = n.element;
		t = i.next("span.k-select"), t[0] || (t = e('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(i)), t = t.children(), n._dateIcon = t.eq(0).attr({ role: "button", "aria-controls": n.dateView._dateViewID }), n._timeIcon = t.eq(1).attr({ role: "button", "aria-controls": n.timeView._timeViewID })
	}, _wrapper: function () {
		var t, n = this, i = n.element;
		t = i.parents(".k-datetimepicker"), t[0] || (t = i.wrap(D).parent().addClass("k-picker-wrap k-state-default"), t = t.wrap(D).parent()), t[0].style.cssText = i[0].style.cssText, i.css({ width: "100%", height: i[0].style.height }), n.wrapper = t.addClass("k-widget k-datetimepicker k-header").addClass(i[0].className), n._inputWrapper = e(t[0].firstChild)
	}, _reset: function () {
		var e = this, t = e.element, n = t.closest("form");
		n[0] && (e._resetHandler = function () {
			e.value(t[0].defaultValue)
		}, e._form = n.on("reset", e._resetHandler))
	}, _template: function () {
		this._ariaTemplate = r.template(this.options.ARIATemplate)
	}, _updateARIA: function (e) {
		this.element.attr("aria-label", this._ariaTemplate({ current: e }))
	} });
	f.plugin(B)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		return function (t) {
			var n = t.children(".k-animation-container");
			return n.length || (n = t), n.children(e)
		}
	}
	function i(e) {
		return e.children("div").find(":checkbox:first")
	}
	function r(t) {
		var n, i, r = t.children("div"), o = t.children("ul"), a = r.children(".k-icon"), s = t.children(":checkbox"), l = r.children(".k-in");
		if (!t.hasClass("k-treeview") && (r.length || (r = e("<div />").prependTo(t)), !a.length && o.length ? a = e("<span class='k-icon' />").prependTo(r) : o.length && o.children().length || (a.remove(), o.remove()), s.length && e("<span class='k-checkbox' />").appendTo(r).append(s), !l.length))
			for (l = e("<span class='k-in' />").appendTo(r)[0], n = r[0].nextSibling, l = r.find(".k-in")[0]; n && "ul" != n.nodeName.toLowerCase();)
				i = n, n = n.nextSibling, 3 == i.nodeType && (i.nodeValue = e.trim(i.nodeValue)), l.appendChild(i)
	}
	function o(e) {
		var t = this;
		t.treeview = e, t.hovered = e.element, t._draggable = new u.Draggable(e.element, { filter: "div:not(.k-state-disabled) .k-in", hint: function (t) {
			return e.templates.dragClue({ item: e.dataItem(t), treeview: e.options })
		}, cursorOffset: { left: 10, top: c.support.touch ? -40 / c.support.zoomLevel() : 10 }, dragstart: b(t.dragstart, t), dragcancel: b(t.dragcancel, t), drag: b(t.drag, t), dragend: b(t.dragend, t) })
	}
	var a, s, l, d, c = window.kendo, u = c.ui, p = c.data, f = e.extend, h = c.template, m = e.isArray, g = u.Widget, v = p.HierarchicalDataSource, b = e.proxy, _ = c.keys, x = ".kendoTreeView", k = "select", w = "navigate", y = "expand", C = "change", T = "checked", S = "collapse", A = "dragstart", D = "drag", E = "drop", F = "dragend", I = "dataBound", P = "click", z = "visibility", R = "undefined", N = "k-state-hover", O = "k-treeview", M = ":visible", H = ".k-item", B = "string", L = "aria-selected", V = "aria-disabled", U = { text: "dataTextField", url: "dataUrlField", spriteCssClass: "dataSpriteCssClassField", imageUrl: "dataImageUrlField" }, j = function (e) {
		return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && 1 === e.nodeType && typeof e.nodeName === B
	};
	s = n(".k-group"), l = n(".k-group,.k-content"), d = function (e) {
		return e.children("div").children(".k-icon")
	}, a = g.extend({
		init: function (t, n) {
			var i, r = this, a = !1;
			m(n) && (i = !0, n = { dataSource: n }), n && typeof n.loadOnDemand == R && m(n.dataSource) && (n.loadOnDemand = !1), g.prototype.init.call(r, t, n), t = r.element, n = r.options, a = t.is("ul") || t.hasClass(O), a && (n.dataSource.list = t.is("ul") ? t : t.children("ul")), r._animation(), r._accessors(), r._templates(), t.hasClass(O) ? (r.wrapper = t, r.root = t.children("ul").eq(0)) : (r._wrapper(), a && (r.root = t, r._group(r.wrapper))), r._tabindex(), r.wrapper.filter("[role=tree]").length || r.wrapper.attr("role", "tree"), r._dataSource(a), r._attachEvents(), n.dragAndDrop && (r.dragging = new o(r)), a ? r._attachUids() : n.autoBind && (r._progress(!0), r.dataSource.fetch()), n.checkboxes && n.checkboxes.checkChildren && r.wrapper.find(":checkbox").closest(H).each(function () {
				r._updateIndeterminate(e(this))
			}), r.element[0].id && (r._ariaId = c.format("{0}_tv_active", r.element[0].id))
		}, _attachEvents: function () {
			var t = this, n = ".k-in:not(.k-state-selected,.k-state-disabled)", i = "mouseenter";
			t.wrapper.on(i + x, ".k-in.k-state-selected", function (e) {
				e.preventDefault()
			}).on(i + x, n, function () {
				e(this).addClass(N)
			}).on("mouseleave" + x, n, function () {
				e(this).removeClass(N)
			}).on("touchend" + x + " " + P + x, n, b(t._click, t)).on("dblclick" + x, ".k-in:not(.k-state-disabled)", b(t._toggleButtonClick, t)).on("touchend" + x + " " + P + x, ".k-plus,.k-minus", b(t._toggleButtonClick, t)).on("keydown" + x, b(t._keydown, t)).on("focus" + x, b(t._focus, t)).on("blur" + x, b(t._blur, t)).on("mousedown" + x, ".k-in,.k-checkbox :checkbox", b(t._mousedown, t)).on("change" + x, ".k-checkbox :checkbox", b(t._checkboxChange, t)).on("click" + x, ".k-checkbox :checkbox", b(t._checkboxClick, t)).on("click" + x, function (n) {
				e(n.target).is(":focusable") || t.focus()
			})
		}, _checkboxClick: function (t) {
			var n = e(t.target);
			n.data("indeterminate") && (n.data("indeterminate", !1).prop("indeterminate", !1).prop(T, !0), this._checkboxChange(t))
		}, _attachUids: function (t, n) {
			var i, r = this, o = c.attr("uid");
			t = t || r.root, n = n || r.dataSource, i = n.view(), t.children("li").each(function (t, n) {
				n = e(n).attr(o, i[t].uid), n.attr("role", "treeitem"), r._attachUids(n.children("ul"), i[t].children)
			})
		}, _animation: function () {
			var e = this.options, t = e.animation;
			t === !1 ? t = { expand: { effects: {} }, collapse: { hide: !0, effects: {}}} : t.collapse && "effects" in t.collapse || (t.collapse = f({ reverse: !0 }, t.expand)), f(t.collapse, { hide: !0 }), e.animation = t
		}, _templates: function () {
			var e = this, t = e.options, n = b(e._fieldAccessor, e);
			t.template && typeof t.template == B ? t.template = h(t.template) : t.template || (t.template = h("# var text = " + n("text") + "(item); #" + "# if (typeof item.encoded != 'undefined' && item.encoded === false) {#" + "#= text #" + "# } else { #" + "#: text #" + "# } #")), e._checkboxes(), e.templates = { wrapperCssClass: function (e, t) {
				var n = "k-item", i = t.index;
				return e.firstLevel && 0 === i && (n += " k-first"), i == e.length - 1 && (n += " k-last"), n
			}, cssClass: function (e, t) {
				var n = "", i = t.index, r = e.length - 1;
				return e.firstLevel && 0 === i && (n += "k-top "), n += 0 === i && i != r ? "k-top" : i == r ? "k-bot" : "k-mid"
			}, textClass: function (e) {
				var t = "k-in";
				return e.enabled === !1 && (t += " k-state-disabled"), e.selected === !0 && (t += " k-state-selected"), t
			}, toggleButtonClass: function (e) {
				var t = "k-icon";
				return t += e.expanded !== !0 ? " k-plus" : " k-minus", e.enabled === !1 && (t += "-disabled"), t
			}, groupAttributes: function (e) {
				return e.expanded !== !0 ? " style='display:none'" : ""
			}, groupCssClass: function (e) {
				var t = "k-group";
				return e.firstLevel && (t += " k-treeview-lines"), t
			}, dragClue: h("<div class='k-header k-drag-clue'><span class='k-icon k-drag-status'></span>#= treeview.template(data) #</div>"), group: h("<ul class='#= r.groupCssClass(group) #'#= r.groupAttributes(group) # role='group'>#= renderItems(data) #</ul>"), itemContent: h("# var imageUrl = " + n("imageUrl") + "(item); #" + "# var spriteCssClass = " + n("spriteCssClass") + "(item); #" + "# if (imageUrl) { #" + "<img class='k-image' alt='' src='#= imageUrl #'>" + "# } #" + "# if (spriteCssClass) { #" + "<span class='k-sprite #= spriteCssClass #'></span>" + "# } #" + "#= treeview.template(data) #"), itemElement: h("# var url = " + n("url") + "(item); #" + "<div class='#= r.cssClass(group, item) #'>" + "# if (item.hasChildren) { #" + "<span class='#= r.toggleButtonClass(item) #' role='presentation'></span>" + "# } #" + "# if (treeview.checkboxes) { #" + "<span class='k-checkbox' role='presentation'>" + "#= treeview.checkboxes.template(data) #" + "</span>" + "# } #" + "# var tag = url ? 'a' : 'span'; #" + "# var textAttr = url ? ' href=\\'' + url + '\\'' : ''; #" + "<#=tag#  class='#= r.textClass(item) #'#= textAttr #>" + "#= r.itemContent(data) #" + "</#=tag#>" + "</div>"), item: h("<li role='treeitem' class='#= r.wrapperCssClass(group, item) #' " + c.attr("uid") + "='#= item.uid #'" + "#=item.selected ? \"aria-selected='true'\" : ''#" + "#=item.enabled === false ? \"aria-disabled='true'\" : ''#" + ">" + "#= r.itemElement(data) #" + "</li>"), loading: h("<div class='k-icon k-loading' /> Loading...")}
		}, items: function () {
			return this.element.find(".k-item")
		}, setDataSource: function (e) {
			this.options.dataSource = e, this._dataSource(), this.dataSource.fetch()
		}, _dataSource: function (e) {
			function t(e) {
				for (var n = 0; e.length > n; n++)
					e[n]._initChildren(), e[n].children.fetch(), t(e[n].children.view())
			}
			var n = this, i = n.options, r = i.dataSource;
			r = m(r) ? { data: r} : r, n.dataSource && n._refreshHandler ? n.dataSource.unbind(C, n._refreshHandler) : n._refreshHandler = b(n.refresh, n), r.fields || (r.fields = [{ field: "text" }, { field: "url" }, { field: "spriteCssClass" }, { field: "imageUrl"}]), n.dataSource = v.create(r), e && (n.dataSource.fetch(), t(n.dataSource.view())), n.dataSource.bind(C, n._refreshHandler)
		}, events: [A, D, E, F, I, y, S, k, w], options: { name: "TreeView", dataSource: {}, animation: { expand: { effects: "expand:vertical", duration: 200 }, collapse: { duration: 100} }, dragAndDrop: !1, checkboxes: !1, autoBind: !0, loadOnDemand: !0, template: "" }, _accessors: function () {
			var e, t, n, i = this, r = i.options, o = i.element;
			for (e in U)
				t = r[U[e]], n = o.attr(c.attr(e + "-field")), n && (t = n), t || (t = e), m(t) || (t = [t]), r[U[e]] = t
		}, _fieldAccessor: function (t) {
			var n = this.options[U[t]], i = n.length, r = "(function(item) {";
			return 0 === i ? r += "return item['" + t + "'];" : (r += "var level = item.level();var levels = [" + e.map(n, function (e) {
				return "function(d){ return " + c.expr(e) + "}"
			}).join(",") + "];", r += "return levels[Math.min(level, " + i + "-1)](item)"), r += "})"
		}, setOptions: function (e) {
			var t = this;
			"dragAndDrop" in e && e.dragAndDrop && !t.options.dragAndDrop && (t.dragging = new o(t)), g.fn.setOptions.call(t, e), t._animation(), t._templates()
		}, _trigger: function (e, t) {
			return this.trigger(e, { node: t.closest(H)[0] })
		}, _updateIndeterminate: function (e) {
			var t, n, r, o = this.parent(e), a = !0;
			if (o.length) {
				if (t = i(e.siblings().andSelf()), r = t.length, r > 1) {
					for (n = 1; r > n; n++)
						if (t[n].checked != t[n - 1].checked || t[n].indeterminate || t[n - 1].indeterminate) {
							a = !1;
							break
						}
				}
				else
					a = !t[0].indeterminate;
				i(o).data("indeterminate", !a).prop("indeterminate", !a).prop(T, a && t[0].checked), this._updateIndeterminate(o)
			}
		}, _checkboxChange: function (t) {
			var n = e(t.target), i = n.prop(T), r = n.closest(H), o = this;
			o.options.checkboxes.checkChildren ? (r.find(":checkbox").each(function () {
				o.dataItem(this).set(T, i)
			}), o._updateIndeterminate(r)) : o.dataItem(r).set(T, i)
		}, _toggleButtonClick: function (t) {
			this.toggle(e(t.target).closest(H))
		}, _mousedown: function (t) {
			this._clickTarget = e(t.currentTarget).closest(H)
		}, _focusable: function (e) {
			return e && e.length && e.is(":visible") && !e.find(".k-in:first").hasClass("k-state-disabled")
		}, _focus: function () {
			var t = this.select();
			c.support.touch || (this._focusable(t) || (t = this._clickTarget), this._focusable(t) || (t = this.current()), this._focusable(t) || (t = this._nextVisible(e())), this.current(t))
		}, focus: function () {
			this.wrapper.focus()
		}, _blur: function () {
			this.current().find(".k-in:first").removeClass("k-state-focused")
		}, _enabled: function (e) {
			return !e.children("div").children(".k-in").hasClass("k-state-disabled")
		}, parent: function (t) {
			var n, i, r = /\bk-treeview\b/, o = /\bk-item\b/;
			typeof t == B && (t = this.element.find(t)), j(t) || (t = t[0]), i = o.test(t.className);
			do
				t = t.parentNode, o.test(t.className) && (i ? n = t : i = !0);
			while (!r.test(t.className) && !n);
			return e(n)
		}, _nextVisible: function (e) {
			var t, n = this, i = n._expanded(e);
			if (e.length && e.is(":visible")) if (i)
				t = s(e).children().first();
			else {
				for (; e.length && !e.next().length;)
					e = n.parent(e);
				t = e.next().length ? e.next() : e
			}
			else
				t = n.root.children().eq(0);
			return n._enabled(t) || (t = n._nextVisible(t)), t
		}, _previousVisible: function (e) {
			var t, n = this;
			if (!e.length || e.prev().length)
				for (t = e.length ? e.prev() : n.root.children().last(); n._expanded(t);)
					t = s(t).children().last();
			else
				t = n.parent(e) || e;
			return n._enabled(t) || (t = n._previousVisible(t)), t
		}, _keydown: function (n) {
			var i, r = this, o = n.keyCode, a = r.current(), s = r._expanded(a), l = a.find(":checkbox:first"), d = c.support.isRtl(r.element);
			n.target == n.currentTarget && (!d && o == _.RIGHT || d && o == _.LEFT ? s ? i = r._nextVisible(a) : r.expand(a) : !d && o == _.LEFT || d && o == _.RIGHT ? s ? r.collapse(a) : (i = r.parent(a), r._enabled(i) || (i = t)) : o == _.DOWN ? i = r._nextVisible(a) : o == _.UP ? i = r._previousVisible(a) : o == _.HOME ? i = r._nextVisible(e()) : o == _.END ? i = r._previousVisible(e()) : o == _.ENTER ? a.find(".k-in:first").hasClass("k-state-selected") || r._trigger(k, a) || r.select(a) : o == _.SPACEBAR && l.length && (l.prop(T, !l.prop(T)).data("indeterminate", !1).prop("indeterminate", !1), r._checkboxChange({ target: l }), i = a), i && (n.preventDefault(), a[0] != i[0] && (r._trigger(w, i), r.current(i))))
		}, _click: function (t) {
			var n, i = this, r = e(t.target), o = l(r.closest(H)), a = r.attr("href");
			n = a ? "#" == a || a.indexOf("#" + this.element.id + "-") >= 0 : o.length && !o.children().length, n && t.preventDefault(), r.hasClass(".k-state-selected") || i._trigger(k, r) || i.select(r)
		}, _wrapper: function () {
			var e, t, n = this, i = n.element, r = "k-widget k-treeview";
			i.is("div") ? (e = i, t = e.children("ul").eq(0)) : (e = i.wrap("<div />").parent(), t = i), n.wrapper = e.addClass(r), n.root = t
		}, _group: function (e) {
			var t = this, n = e.hasClass(O), i = { firstLevel: n, expanded: n || t._expanded(e) }, r = e.children("ul");
			r.addClass(t.templates.groupCssClass(i)).css("display", i.expanded ? "" : "none"), t._nodes(r, i)
		}, _nodes: function (t, n) {
			var i, o = this, a = t.children("li");
			n = f({ length: a.length }, n), a.each(function (t, a) {
				a = e(a), i = { index: t, expanded: o._expanded(a) }, r(a), o._updateNodeClasses(a, n, i), o._group(a)
			})
		}, _checkboxes: function () {
			var e, t = this.options, n = t.checkboxes;
			(n || t.checkboxTemplate) && (t.checkboxTemplate ? e = t.checkboxTemplate : (e = "<input type='checkbox' #= item.checked ? 'checked' : '' #", n.name && (e += " name='" + n.name + "'"), e += " />"), n = f({ template: e }, t.checkboxes), typeof n.template == B && (n.template = h(n.template)), t.checkboxes = n)
		}, _updateNodeClasses: function (e, t, n) {
			var i = e.children("div"), r = e.children("ul"), o = this.templates;
			e.hasClass("k-treeview") || (n = n || {}, n.expanded = typeof n.expanded != R ? n.expanded : this._expanded(e), n.index = typeof n.index != R ? n.index : e.index(), n.enabled = typeof n.enabled != R ? n.enabled : !i.children(".k-in").hasClass("k-state-disabled"), t = t || {}, t.firstLevel = typeof t.firstLevel != R ? t.firstLevel : e.parent().parent().hasClass(O), t.length = typeof t.length != R ? t.length : e.parent().children().length, e.removeClass("k-first k-last").addClass(o.wrapperCssClass(t, n)), i.removeClass("k-top k-mid k-bot").addClass(o.cssClass(t, n)), i.children(".k-in").removeClass("k-in k-state-default k-state-disabled").addClass(o.textClass(n)), (r.length || "true" == e.attr("data-hasChildren")) && (i.children(".k-icon").removeClass("k-plus k-minus k-plus-disabled k-minus-disabled").addClass(o.toggleButtonClass(n)), r.addClass("k-group")))
		}, _processNodes: function (t, n) {
			var i = this;
			i.element.find(t).each(function (t, r) {
				n.call(i, t, e(r).closest(H))
			})
		}, dataItem: function (t) {
			var n = e(t).closest(H).attr(c.attr("uid")), i = this.dataSource;
			return i && i.getByUid(n)
		}, _insertNode: function (t, n, i, o, a) {
			var l, d, c, u, p = this, f = s(i), h = f.children().length + 1, m = { firstLevel: i.hasClass(O), expanded: !a, length: h }, g = "", v = function (e, t) {
				e.appendTo(t)
			};
			for (c = 0; t.length > c; c++)
				u = t[c], u.index = n + c, g += p._renderItem({ group: m, item: u });
			if (d = e(g), d.length) {
				for (f.length || (f = e(p._renderGroup({ group: m })).appendTo(i)), o(d, f), i.hasClass("k-item") && (r(i), p._updateNodeClasses(i)), p._updateNodeClasses(d.prev().first()), p._updateNodeClasses(d.next().last()), c = 0; t.length > c; c++)
					u = t[c], u.hasChildren && (l = u.children.data(), l.length && p._insertNode(l, u.index, d.eq(c), v, !p._expanded(d.eq(c))));
				return d
			}
		}, _updateNode: function (t, n) {
			var i, r, o, a = this, s = { treeview: a.options, item: o };
			if ("selected" == t)
				o = n[0], r = a.findByUid(o.uid).find(".k-in:first").removeClass("k-state-hover").toggleClass("k-state-selected", o[t]).end(), o[t] ? (a.current(r), r.attr(L, !0)) : r.attr(L, !1);
			else
				for (i = 0; n.length > i; i++)
					s.item = o = n[i], "spriteCssClass" == t || "imageUrl" == t || e.inArray(t, a.options.dataTextField) >= 0 ? a.findByUid(o.uid).find(">div>.k-in").html(a.templates.itemContent(s)) : t == T ? (r = a.findByUid(o.uid), r.children("div").find(":checkbox").prop(T, o[t]).data("indeterminate", !1).prop("indeterminate", !1), a._updateIndeterminate(r)) : "expanded" == t && a._toggle(a.findByUid(o.uid), o, o[t])
		}, refresh: function (e) {
			function n(e, t) {
				var n = s(t), i = n.children(), o = !r._expanded(t);
				typeof c == R && (c = i.length), r._insertNode(e, c, t, function (e, t) {
					c == i.length ? e.appendTo(t) : e.insertBefore(i.eq(c))
				}, o), r._expanded(t) && (r._updateNodeClasses(t), s(t).css("display", "block"))
			}
			var i, r = this, o = r.wrapper, a = e.node, l = e.action, d = e.items, c = e.index, u = r.options, p = u.loadOnDemand, f = u.checkboxes && u.checkboxes.checkChildren;
			if (e.field)
				return r._updateNode(e.field, d);
			if (a && (o = r.findByUid(a.uid), r._progress(o, !1)), f && "remove" != l && a && a.checked)
				for (i = 0; d.length > i; i++)
					d[i].checked = !0;
			for ("add" == l ? n(d, o) : "remove" == l ? r._remove(r.findByUid(d[0].uid), !1) : a ? (s(o).empty(), n(d, o)) : r.root = r.wrapper.html(r._renderGroup({ items: d, group: { firstLevel: !0, expanded: !0} })).children("ul"), i = 0; d.length > i; i++)
				(!p || d[i].expanded) && d[i].load();
			r.trigger(I, { node: a ? o : t })
		}, expand: function (e) {
			this._processNodes(e, function (e, t) {
				this.toggle(t, !0)
			})
		}, collapse: function (e) {
			this._processNodes(e, function (e, t) {
				this.toggle(t, !1)
			})
		}, enable: function (e, t) {
			t = 2 == arguments.length ? !!t : !0, this._processNodes(e, function (e, n) {
				var i = !l(n).is(M), r = this.dataItem(n);
				n.removeAttr(V), t || (r.selected && r.set("selected", !1), this.collapse(n), i = !0, n.removeAttr(L), n.attr(V, !0)), this._updateNodeClasses(n, {}, { enabled: t, expanded: !i })
			})
		}, current: function (n) {
			var i = this, r = i._current, o = i.element, a = i._ariaId;
			return arguments.length > 0 && n && n.length ? (r && (r[0].id === a && r.removeAttr("id"), r.find(".k-in:first").removeClass("k-state-focused")), r = i._current = e(n, o).closest(H), r.find(".k-in:first").addClass("k-state-focused"), a = r[0].id || a, a && (i.wrapper.removeAttr("aria-activedescendant"), r.attr("id", a), i.wrapper.attr("aria-activedescendant", a)), t) : (r || (r = i._nextVisible(e())), r)
		}, select: function (n) {
			var i = this, r = i.element;
			return arguments.length ? (n = e(n, r).closest(H), n.length && (r.find(".k-state-selected").each(function () {
				var e = i.dataItem(this);
				e.set("selected", !1), delete e.selected
			}), i.dataItem(n).set("selected", !0)), t) : r.find(".k-state-selected").closest(H)
		}, _toggle: function (e, t, n) {
			var i, r = this, o = r.options, a = l(e), s = n ? "expand" : "collapse", d = o.animation[s];
			if (!a.data("animating") && !r._trigger(s, e))
				if (r._expanded(e, n), i = t && t.loaded(), i && a.children().length > 0) {
					if (r._updateNodeClasses(e, {}, { expanded: n }), a.css("display") == (n ? "block" : "none"))
						return;
					n || a.css("height", a.height()).css("height"), a.kendoStop(!0, !0).kendoAnimate(f({ reset: !0 }, d, { complete: function () {
						n && a.css("height", "")
					} }))
				}
				else
					t && (o.loadOnDemand && r._progress(e, !0), a.remove(), t.load())
		}, toggle: function (t, n) {
			t = e(t), d(t).is(".k-minus,.k-plus,.k-minus-disabled,.k-plus-disabled") && (1 == arguments.length && (n = !this._expanded(t)), this._expanded(t, n))
		}, destroy: function () {
			var e = this;
			g.fn.destroy.call(e), e.element.off(x), e.dragging && e.dragging.destroy(), c.destroy(e.element)
		}, _expanded: function (e, n) {
			var i = c.attr("expanded"), r = this.dataItem(e);
			return 1 == arguments.length ? "true" === e.attr(i) || r && r.expanded : (l(e).data("animating") || (r && r.set("expanded", n), n ? (e.attr(i, "true"), e.attr("aria-expanded", "true")) : (e.removeAttr(i), e.attr("aria-expanded", "false"))), t)
		}, _progress: function (e, t) {
			var n = this.element;
			1 == arguments.length ? (t = e, t ? n.html(this.templates.loading) : n.empty()) : d(e).toggleClass("k-loading", t)
		}, text: function (e, n) {
			var i = this.dataItem(e), r = this.options[U.text], o = i.level(), a = r.length, s = r[Math.min(o, a - 1)];
			return n ? (i.set(s, n), t) : i[s]
		}, _objectOrSelf: function (t) {
			return e(t).closest("[data-role=treeview]").data("kendoTreeView") || this
		}, _dataSourceMove: function (e, t, n, i) {
			var r, o, a, s = this._objectOrSelf(n || t), l = s.dataSource;
			if (n && n[0] != s.element[0] && (o = s.dataItem(n), o.loaded() || (s._progress(n, !0), o.load()), n != this.root && (l = o.children)), e = this._toObservableData(e), m(e) || e instanceof p.ObservableArray)
				for (a = 0; e.length > a; a++)
					r = i(l, e[a]);
			else
				r = i(l, e);
			return r && this.findByUid(r.uid)
		}, _toObservableData: function (t) {
			var n, i, r = t;
			return (t instanceof window.jQuery || j(t)) && (n = this._objectOrSelf(t).dataSource, i = e(t).attr(c.attr("uid")), r = n.getByUid(i), r && (r = n.remove(r))), r
		}, insertAfter: function (e, t) {
			var n, i = t.parent();
			return i.parent().is("li") && (n = i.parent()), this._dataSourceMove(e, i, n, function (e, n) {
				return e.insert(t.index() + 1, n)
			})
		}, insertBefore: function (e, t) {
			var n, i = t.parent();
			return i.parent().is("li") && (n = i.parent()), this._dataSourceMove(e, i, n, function (e, n) {
				return e.insert(t.index(), n)
			})
		}, append: function (e, t) {
			var n = this, i = n.root;
			return t && (i = s(t)), n._dataSourceMove(e, i, t, function (e, i) {
				function r() {
					return t && n._expanded(t, !0), e.add(i)
				}
				return e.data() ? r() : (e.one(C, r), null)
			})
		}, _remove: function (t, n) {
			var i, o, a, s = this;
			return t = e(t, s.element), i = t.parent().parent(), o = t.prev(), a = t.next(), t[n ? "detach" : "remove"](), i.hasClass("k-item") && (r(i), s._updateNodeClasses(i)), s._updateNodeClasses(o), s._updateNodeClasses(a), t
		}, remove: function (e) {
			var t = this.dataItem(e);
			t && this.dataSource.remove(t)
		}, detach: function (e) {
			return this._remove(e, !0)
		}, findByText: function (t) {
			return e(this.element).find(".k-in").filter(function (n, i) {
				return e(i).text() == t
			}).closest(H)
		}, findByUid: function (e) {
			return this.element.find(".k-item[" + c.attr("uid") + "=" + e + "]")
		}, _renderItem: function (e) {
			return e.group || (e.group = {}), e.treeview = this.options, e.r = this.templates, this.templates.item(e)
		}, _renderGroup: function (e) {
			var t = this;
			return e.renderItems = function (e) {
				var n = "", i = 0, r = e.items, o = r ? r.length : 0, a = e.group;
				for (a.length = o; o > i; i++)
					e.group = a, e.item = r[i], e.item.index = i, n += t._renderItem(e);
				return n
			}, e.r = t.templates, t.templates.group(e)
		}
	}), o.prototype = { _removeTouchHover: function () {
		var e = this;
		c.support.touch && e.hovered && (e.hovered.find("." + N).removeClass(N), e.hovered = !1)
	}, _hintStatus: function (n) {
		var i = this._draggable.hint.find(".k-drag-status")[0];
		return n ? (i.className = "k-icon k-drag-status " + n, t) : e.trim(i.className.replace(/k-(icon|drag-status)/g, ""))
	}, dragstart: function (t) {
		var n = this, i = n.treeview, r = n.sourceNode = t.currentTarget.closest(H);
		i.trigger(A, { sourceNode: r[0] }) && t.preventDefault(), n.dropHint = e("<div class='k-drop-hint' />").css(z, "hidden").appendTo(i.element)
	}, drag: function (t) {
		var n, i, r, o, a, s, l, d, u, p, f = this, h = f.treeview, m = f.sourceNode, g = f.dropTarget = e(c.eventTarget(t)), v = g.closest(".k-treeview");
		v.length ? e.contains(m[0], g[0]) ? n = "k-denied" : (n = "k-insert-middle", i = g.closest(".k-top,.k-mid,.k-bot"), i.length ? (o = i.outerHeight(), a = i.offset().top, s = g.closest(".k-in"), l = o / (s.length > 0 ? 4 : 2), d = a + l > t.y.location, u = t.y.location > a + o - l, f._removeTouchHover(), p = s.length && !d && !u, f.hovered = p ? v : !1, f.dropHint.css(z, p ? "hidden" : "visible"), s.toggleClass(N, p), p ? n = "k-add" : (r = i.position(), r.top += d ? 0 : o, f.dropHint.css(r)[d ? "prependTo" : "appendTo"](g.closest(H).children("div:first")), d && i.hasClass("k-top") && (n = "k-insert-top"), u && i.hasClass("k-bot") && (n = "k-insert-bottom"))) : g[0] != f.dropHint[0] && (n = v[0] != h.element[0] ? "k-add" : "k-denied")) : (n = "k-denied", f._removeTouchHover()), h.trigger(D, { sourceNode: m[0], dropTarget: g[0], pageY: t.y.location, pageX: t.x.location, statusClass: n.substring(2), setStatusClass: function (e) {
			n = e
		} }), 0 !== n.indexOf("k-insert") && f.dropHint.css(z, "hidden"), f._hintStatus(n)
	}, dragcancel: function () {
		this.dropHint.remove()
	}, dragend: function () {
		var e, n, i, r = this, o = r.treeview, a = "over", s = r.sourceNode, l = r.dropHint, d = r.dropTarget;
		return "visible" == l.css(z) ? (a = l.prevAll(".k-in").length > 0 ? "after" : "before", e = l.closest(H)) : d && (e = d.closest(H), e.length || (e = d.closest(".k-treeview"))), n = "k-denied" != r._hintStatus(), i = o.trigger(E, { sourceNode: s[0], destinationNode: e[0], valid: n, setValid: function (e) {
			n = e
		}, dropTarget: d[0], dropPosition: a }), l.remove(), r._removeTouchHover(), !n || i ? (r._draggable.dropped = n, t) : (r._draggable.dropped = !0, "over" == a ? s = o.append(s, e) : "before" == a ? s = o.insertBefore(s, e) : "after" == a && (s = o.insertAfter(s, e)), o.trigger(F, { sourceNode: s && s[0], destinationNode: e[0], dropPosition: a }), t)
	}, destroy: function () {
		this._draggable.destroy()
	} }, u.plugin(a)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		var i = n ? " k-slider-horizontal" : " k-slider-vertical", r = e.style ? e.style : t.attr("style"), o = t.attr("class") ? " " + t.attr("class") : "", a = "";
		return "bottomRight" == e.tickPlacement ? a = " k-slider-bottomright" : "topLeft" == e.tickPlacement && (a = " k-slider-topleft"), r = r ? " style='" + r + "'" : "", "<div class='k-widget k-slider" + i + o + "'" + r + ">" + "<div class='k-slider-wrap" + (e.showButtons ? " k-slider-buttons" : "") + a + "'></div></div>"
	}
	function i(e, t, n) {
		var i = "";
		return i = "increase" == t ? n ? "k-i-arrow-e" : "k-i-arrow-n" : n ? "k-i-arrow-w" : "k-i-arrow-s", "<a class='k-button k-button-" + t + "'><span class='k-icon " + i + "' title='" + e[t + "ButtonTitle"] + "'>" + e[t + "ButtonTitle"] + "</span></a>"
	}
	function r(e, t) {
		var n, i = "<ul class='k-reset k-slider-items'>", r = x.floor(d(t / e.smallStep)) + 1;
		for (n = 0; r > n; n++)
			i += "<li class='k-tick' role='presentation'>&nbsp;</li>";
		return i += "</ul>"
	}
	function o(e, t) {
		var n = t.is("input") ? 1 : 2, i = 2 == n ? e.leftDragHandleTitle : e.dragHandleTitle;
		return "<div class='k-slider-track'><div class='k-slider-selection'><!-- --></div><a href='#' class='k-draghandle' title='" + i + "' role='slider' aria-valuemin='" + e.min + "' aria-valuemax='" + e.max + "' aria-valuenow='" + (n > 1 ? e.selectionStart || e.min : e.value || e.min) + "'>Drag</a>" + (n > 1 ? "<a href='#' class='k-draghandle' title='" + e.rightDragHandleTitle + "'role='slider' aria-valuemin='" + e.min + "' aria-valuemax='" + e.max + "' aria-valuenow='" + (e.selectionEnd || e.max) + "'>Drag</a>" : "") + "</div>"
	}
	function a(e) {
		return function (t) {
			return t + e
		}
	}
	function s(e) {
		return function () {
			return e
		}
	}
	function l(e) {
		return (e + "").replace(".", p.cultures.current.numberFormat["."])
	}
	function d(e) {
		e = parseFloat(e, 10);
		var t = x.pow(10, V || 0);
		return x.round(e * t) / t
	}
	function c(e, n) {
		var i = v(e.getAttribute(n));
		return null === i && (i = t), i
	}
	function u(e) {
		return typeof e !== j
	}
	var p = window.kendo, f = p.ui.Widget, h = p.ui.Draggable, m = e.extend, g = p.format, v = p.parseFloat, b = e.proxy, _ = e.isArray, x = Math, k = p.support, w = k.pointers, y = "change", C = "slide", T = ".slider", S = "touchstart" + T + " mousedown" + T, A = w ? "MSPointerDown" + T : "mousedown" + T + " touchstart" + T, D = "touchend" + T + " mouseup" + T, E = "moveSelection", F = "keydown" + T, I = "click" + T, P = "mouseover" + T, z = "focus" + T, R = "blur" + T, N = ".k-draghandle", O = ".k-slider-track", M = ".k-tick", H = "k-state-selected", B = "k-state-default", L = "k-state-disabled", V = 3, U = "disabled", j = "undefined", W = f.extend({ init: function (e, t) {
		var n = this;
		f.fn.init.call(n, e, t), t = n.options, n._distance = t.max - t.min, n._isHorizontal = "horizontal" == t.orientation, n._isRtl = n._isHorizontal && p.support.isRtl(e), n._position = n._isHorizontal ? "left" : "bottom", n._size = n._isHorizontal ? "width" : "height", n._outerSize = n._isHorizontal ? "outerWidth" : "outerHeight", t.tooltip.format = t.tooltip.enabled ? t.tooltip.format || "{0}" : "{0}", n._createHtml(), n.wrapper = n.element.closest(".k-slider"), n._trackDiv = n.wrapper.find(O), n._setTrackDivWidth(), n._maxSelection = n._trackDiv[n._size]();
		var i = n._maxSelection / ((t.max - t.min) / t.smallStep), o = n._calculateItemsWidth(x.floor(n._distance / t.smallStep));
		"none" != t.tickPlacement && i >= 2 && (n._trackDiv.before(r(t, n._distance)), n._setItemsWidth(o), n._setItemsTitle(), n._setItemsLargeTick()), n._calculateSteps(o), n._tabindex(n.wrapper.find(N)), n[t.enabled ? "enable" : "disable"]();
		var l = p.support.isRtl(n.wrapper) ? -1 : 1;
		n._keyMap = { 37: a(-1 * l * t.smallStep), 40: a(-t.smallStep), 39: a(1 * l * t.smallStep), 38: a(+t.smallStep), 35: s(t.max), 36: s(t.min), 33: a(+t.largeStep), 34: a(-t.largeStep) }, p.notify(n)
	}, events: [y, C], options: { enabled: !0, min: 0, max: 10, smallStep: 1, largeStep: 5, orientation: "horizontal", tickPlacement: "both", tooltip: { enabled: !0, format: "{0}"} }, _setTrackDivWidth: function () {
		var e = this, t = 2 * parseFloat(e._trackDiv.css(e._isRtl ? "right" : e._position), 10);
		e._trackDiv[e._size](e.wrapper[e._size]() - 2 - t)
	}, _setItemsWidth: function (t) {
		var n, i = this, r = i.options, o = 0, a = t.length - 1, s = i.wrapper.find(M), l = 0, d = 2, c = s.length, u = 0;
		for (n = 0; c - 2 > n; n++)
			e(s[n + 1])[i._size](t[n]);
		if (i._isHorizontal ? (e(s[o]).addClass("k-first")[i._size](t[a - 1]), e(s[a]).addClass("k-last")[i._size](t[a])) : (e(s[a]).addClass("k-first")[i._size](t[a]), e(s[o]).addClass("k-last")[i._size](t[a - 1])), 0 !== i._distance % r.smallStep && !i._isHorizontal) {
			for (n = 0; t.length > n; n++)
				u += t[n];
			l = i._maxSelection - u, l += parseFloat(i._trackDiv.css(i._position), 10) + d, i.wrapper.find(".k-slider-items").css("padding-top", l)
		}
	}, _setItemsTitle: function () {
		for (var t = this, n = t.options, i = t.wrapper.find(M), r = n.min, o = i.length, a = t._isHorizontal && !t._isRtl ? 0 : o - 1, s = t._isHorizontal && !t._isRtl ? o : -1, l = t._isHorizontal && !t._isRtl ? 1 : -1; 0 !== a - s; a += l)
			e(i[a]).attr("title", g(n.tooltip.format, d(r))), r += n.smallStep
	}, _setItemsLargeTick: function () {
		var t, n = this, i = n.options, r = n.wrapper.find(M), o = {}, a = d(i.largeStep / i.smallStep);
		if (0 === 1e3 * i.largeStep % (1e3 * i.smallStep))
			if (n._isHorizontal && !n._isRtl)
				for (t = 0; r.length > t; t = d(t + a))
					o = e(r[t]), o.addClass("k-tick-large").html("<span class='k-label'>" + o.attr("title") + "</span>");
			else
				for (t = r.length - 1; t >= 0; t = d(t - a))
					o = e(r[t]), o.addClass("k-tick-large").html("<span class='k-label'>" + o.attr("title") + "</span>"), n._isRtl || 0 !== t && t !== r.length - 1 && o.css("line-height", o[n._size]() + "px")
	}, _calculateItemsWidth: function (e) {
		var t, n, i, r = this, o = r.options, a = parseFloat(r._trackDiv.css(r._size)) + 1, s = a / r._distance;
		for (r._distance / o.smallStep - x.floor(r._distance / o.smallStep) > 0 && (a -= r._distance % o.smallStep * s), t = a / e, n = [], i = 0; e - 1 > i; i++)
			n[i] = t;
		return n[e - 1] = n[e] = t / 2, r._roundWidths(n)
	}, _roundWidths: function (e) {
		var t, n = 0, i = e.length;
		for (t = 0; i > t; t++)
			n += e[t] - x.floor(e[t]), e[t] = x.floor(e[t]);
		return n = x.round(n), this._addAdditionalSize(n, e)
	}, _addAdditionalSize: function (e, t) {
		if (0 === e)
			return t;
		var n, i = parseFloat(t.length - 1) / parseFloat(1 == e ? e : e - 1);
		for (n = 0; e > n; n++)
			t[parseInt(x.round(i * n), 10)] += 1;
		return t
	}, _calculateSteps: function (e) {
		var t, n = this, i = n.options, r = i.min, o = 0, a = x.ceil(n._distance / i.smallStep), s = 1;
		if (a += 0 === n._distance / i.smallStep % 1 ? 1 : 0, e.splice(0, 0, 2 * e[a - 2]), e.splice(a - 1, 1, 2 * e.pop()), n._pixelSteps = [o], n._values = [r], 0 !== a) {
			for (; a > s;)
				o += (e[s - 1] + e[s]) / 2, n._pixelSteps[s] = o, n._values[s] = r += i.smallStep, s++;
			t = 0 === n._distance % i.smallStep ? a - 1 : a, n._pixelSteps[t] = n._maxSelection, n._values[t] = i.max, n._isRtl && (n._pixelSteps.reverse(), n._values.reverse())
		}
	}, _getValueFromPosition: function (e, t) {
		var n, i = this, r = i.options, o = x.max(r.smallStep * (i._maxSelection / i._distance), 0), a = 0, s = o / 2;
		if (i._isHorizontal ? (a = e - t.startPoint, i._isRtl && (a = i._maxSelection - a)) : a = t.startPoint - e, a > i._maxSelection - (parseInt(i._maxSelection % o, 10) - 3) / 2)
			return r.max;
		for (n = 0; i._pixelSteps.length > n; n++)
			if (s >= x.abs(i._pixelSteps[n] - a) - 1)
				return d(i._values[n])
	}, _getFormattedValue: function (e, t) {
		var n, i, r, o = this, a = "", s = o.options.tooltip;
		return _(e) ? (i = e[0], r = e[1]) : t && t.type && (i = t.selectionStart, r = t.selectionEnd), t && (n = t.tooltipTemplate), !n && s.template && (n = p.template(s.template)), _(e) || t && t.type ? n ? a = n({ selectionStart: i, selectionEnd: r }) : (i = g(s.format, i), r = g(s.format, r), a = i + " - " + r) : (t && (t.val = e), a = n ? n({ value: e }) : g(s.format, e)), a
	}, _getDragableArea: function () {
		var e = this, t = e._trackDiv.offset().left, n = e._trackDiv.offset().top;
		return { startPoint: e._isHorizontal ? t : n + e._maxSelection, endPoint: e._isHorizontal ? t + e._maxSelection : n}
	}, _createHtml: function () {
		var e = this, t = e.element, r = e.options, a = t.find("input");
		2 == a.length ? (a.eq(0).val(r.selectionStart), a.eq(1).val(r.selectionEnd)) : t.val(r.value), t.wrap(n(r, t, e._isHorizontal)).hide(), r.showButtons && t.before(i(r, "increase", e._isHorizontal)).before(i(r, "decrease", e._isHorizontal)), t.before(o(r, t))
	}, _focus: function (t) {
		var n = this, i = t.target, r = n.value(), o = n._drag;
		o || (i == n.wrapper.find(N).eq(0)[0] ? (o = n._firstHandleDrag, n._activeHandle = 0) : (o = n._lastHandleDrag, n._activeHandle = 1), r = r[n._activeHandle]), e(i).addClass(H), o && (n._activeHandleDrag = o, o.selectionStart = n.options.selectionStart, o.selectionEnd = n.options.selectionEnd, o._updateTooltip(r))
	}, _focusWithMouse: function (t) {
		var n = this, i = e(t.target), r = i.is(N) ? i.index() : 0;
		window.setTimeout(function () {
			n.wrapper.find(N)[2 == r ? 1 : 0].focus()
		}, 1), n._setTooltipTimeout()
	}, _blur: function (t) {
		var n = this, i = n._activeHandleDrag;
		e(t.target).removeClass(H), i && (i._removeTooltip(), delete n._activeHandleDrag, delete n._activeHandle)
	}, _setTooltipTimeout: function () {
		var e = this;
		e._tooltipTimeout = window.setTimeout(function () {
			var t = e._drag || e._activeHandleDrag;
			t && t._removeTooltip()
		}, 300)
	}, _clearTooltipTimeout: function () {
		var e = this;
		window.clearTimeout(this._tooltipTimeout);
		var t = e._drag || e._activeHandleDrag;
		t && t.tooltipDiv && t.tooltipDiv.stop(!0, !1).css("opacity", 1)
	} }), q = function (e) {
		return { idx: 0, x: e.pageX, y: e.pageY}
	};
	k.pointers && (q = function (e) {
		return { idx: 0, x: e.originalEvent.clientX, y: e.originalEvent.clientY}
	}), k.touch && (q = function (t, n) {
		var i = t.changedTouches || t.originalEvent.changedTouches;
		if (n) {
			var r = null;
			return e.each(i, function (e, t) {
				n == t.identifier && (r = { idx: t.identifier, x: t.pageX, y: t.pageY })
			}), r
		}
		return { idx: i[0].identifier, x: i[0].pageX, y: i[0].pageY}
	});
	var G = W.extend({ init: function (n, i) {
		var r, o = this;
		n.type = "text", i = m({}, { value: c(n, "value"), min: c(n, "min"), max: c(n, "max"), smallStep: c(n, "step") }, i), n = e(n), i && i.enabled === t && (i.enabled = !n.is("[disabled]")), W.fn.init.call(o, n, i), i = o.options, u(i.value) && null !== i.value || (i.value = i.min, n.val(i.min)), i.value = x.max(x.min(i.value, i.max), i.min), r = o.wrapper.find(N), new G.Selection(r, o, i), o._drag = new G.Drag(r, "", o, i)
	}, options: { name: "Slider", showButtons: !0, increaseButtonTitle: "Increase", decreaseButtonTitle: "Decrease", dragHandleTitle: "drag", tooltip: { format: "{0}" }, value: null }, enable: function (n) {
		var i, r, o = this, a = o.options;
		if (o.disable(), n !== !1) {
			if (o.wrapper.removeClass(L).addClass(B), o.wrapper.find("input").removeAttr(U), i = function (n) {
				var i = q(n), r = o._isHorizontal ? i.x : i.y, a = o._getDragableArea(), s = e(n.target);
				return s.hasClass("k-draghandle") ? (s.addClass(H), t) : (o._update(o._getValueFromPosition(r, a)), o._focusWithMouse(n), o._drag.dragstart(n), t)
			}, o.wrapper.find(M + ", " + O).on(A, i).end().on(A, function () {
				e(document.documentElement).one("selectstart", p.preventDefault)
			}), o.wrapper.find(N).on(D, function () {
				o._setTooltipTimeout()
			}).on(I, function (e) {
				o._focusWithMouse(e), e.preventDefault()
			}).on(z, b(o._focus, o)).on(R, b(o._blur, o)), r = b(function (e) {
				var t = o._nextValueByIndex(o._valueIndex + 1 * e);
				o._setValueInRange(t), o._drag._updateTooltip(t)
			}, o), a.showButtons) {
				var s = b(function (e, t) {
					this._clearTooltipTimeout(), (1 === e.which || k.touch && 0 === e.which) && (r(t), this.timeout = setTimeout(b(function () {
						this.timer = setInterval(function () {
							r(t)
						}, 60)
					}, this), 200))
				}, o);
				o.wrapper.find(".k-button").on(D, b(function (e) {
					this._clearTimer(), o._focusWithMouse(e)
				}, o)).on(P, function (t) {
					e(t.currentTarget).addClass("k-state-hover")
				}).on("mouseout" + T, b(function (t) {
					e(t.currentTarget).removeClass("k-state-hover"), this._clearTimer()
				}, o)).eq(0).on(S, b(function (e) {
					s(e, 1)
				}, o)).click(!1).end().eq(1).on(S, b(function (e) {
					s(e, -1)
				}, o)).click(p.preventDefault)
			}
			o.wrapper.find(N).off(F, !1).on(F, b(this._keydown, o)), a.enabled = !0
		}
	}, disable: function () {
		var t = this;
		t.wrapper.removeClass(B).addClass(L), e(t.element).attr(U, U), t.wrapper.find(".k-button").off(S).on(S, p.preventDefault).off(D).on(D, p.preventDefault).off("mouseleave" + T).on("mouseleave" + T, p.preventDefault).off(P).on(P, p.preventDefault), t.wrapper.find(M + ", " + O).off(A), t.wrapper.find(N).off(D).off(F).off(I).off(z).off(R), t.options.enabled = !1
	}, _update: function (e) {
		var t = this, n = t.value() != e;
		t.value(e), n && t.trigger(y, { value: t.options.value })
	}, value: function (e) {
		var n = this, i = n.options;
		return e = d(e), isNaN(e) ? i.value : (e >= i.min && i.max >= e && i.value != e && (n.element.attr("value", l(e)), i.value = e, n._refreshAriaAttr(e), n._refresh()), t)
	}, _refresh: function () {
		this.trigger(E, { value: this.options.value })
	}, _refreshAriaAttr: function (e) {
		var t, n = this, i = n._drag;
		t = i && i._tooltipDiv ? i._tooltipDiv.text() : n._getFormattedValue(e, null), this.wrapper.find(N).attr("aria-valuenow", e).attr("aria-valuetext", t)
	}, _clearTimer: function () {
		clearTimeout(this.timeout), clearInterval(this.timer)
	}, _keydown: function (e) {
		var t = this;
		e.keyCode in t._keyMap && (t._clearTooltipTimeout(), t._setValueInRange(t._keyMap[e.keyCode](t.options.value)), t._drag._updateTooltip(t.value()), e.preventDefault())
	}, _setValueInRange: function (e) {
		var n = this, i = n.options;
		return e = d(e), isNaN(e) ? (n._update(i.min), t) : (e = x.max(x.min(e, i.max), i.min), n._update(e), t)
	}, _nextValueByIndex: function (e) {
		var t = this._values.length;
		return this._isRtl && (e = t - 1 - e), this._values[x.max(0, x.min(e, t - 1))]
	}, destroy: function () {
		var e = this;
		f.fn.destroy.call(e), e.wrapper.off(T).find(".k-button").off(T).end().find(N).off(T).end().find(M + ", " + O).off(T).end(), e._drag.draggable.destroy()
	} });
	G.Selection = function (e, t, n) {
		function i(i) {
			var r = i - n.min, o = t._valueIndex = x.ceil(d(r / n.smallStep)), a = parseInt(t._pixelSteps[o], 10), s = t._trackDiv.find(".k-slider-selection"), l = parseInt(e[t._outerSize]() / 2, 10), c = t._isRtl ? 2 : 0;
			s[t._size](t._isRtl ? t._maxSelection - a : a), e.css(t._position, a - l - c)
		}
		i(n.value), t.bind([y, C, E], function (e) {
			i(parseFloat(e.value, 10))
		})
	}, G.Drag = function (e, t, n, i) {
		var r = this;
		r.owner = n, r.options = i, r.dragHandle = e, r.dragHandleSize = e[n._outerSize](), r.type = t, r.draggable = new h(e, { distance: 0, dragstart: b(r._dragstart, r), drag: b(r.drag, r), dragend: b(r.dragend, r), dragcancel: b(r.dragcancel, r) }), e.click(!1)
	}, G.Drag.prototype = { dragstart: function (e) {
		this.draggable.userEvents._start(e)
	}, _dragstart: function (n) {
		var i = this, r = i.owner, o = i.options;
		return o.enabled ? (r.element.off(P), i.dragHandle.addClass(H), e(document.documentElement).css("cursor", "pointer"), i.dragableArea = r._getDragableArea(), i.step = x.max(o.smallStep * (r._maxSelection / r._distance), 0), i.type ? (i.selectionStart = o.selectionStart, i.selectionEnd = o.selectionEnd, r._setZIndex(i.type)) : i.oldVal = i.val = o.value, i._removeTooltip(!0), i._createTooltip(), t) : (n.preventDefault(), t)
	}, _createTooltip: function () {
		var t, n = this, i = n.owner, r = n.options.tooltip, o = "";
		r.enabled && (r.template && (t = n.tooltipTemplate = p.template(r.template)), e(".k-slider-tooltip").remove(), n.tooltipDiv = e("<div class='k-widget k-tooltip k-slider-tooltip'><!-- --></div>").appendTo(document.body), o = i._getFormattedValue(n.val || i.value(), n), n.type || (n.tooltipInnerDiv = "<div class='k-callout k-callout-" + (i._isHorizontal ? "s" : "e") + "'><!-- --></div>", o += n.tooltipInnerDiv), n.tooltipDiv.html(o), n.moveTooltip())
	}, drag: function (e) {
		var t, n = this, i = n.owner, r = e.x.location, o = e.y.location, a = n.dragableArea.startPoint, s = n.dragableArea.endPoint;
		e.preventDefault(), n.val = i._isHorizontal ? i._isRtl ? n.constrainValue(r, a, s, s > r) : n.constrainValue(r, a, s, r >= s) : n.constrainValue(o, s, a, s >= o), n.oldVal != n.val && (n.oldVal = n.val, n.type ? ("firstHandle" == n.type ? n.selectionStart = n.selectionEnd > n.val ? n.val : n.selectionEnd = n.val : n.val > n.selectionStart ? n.selectionEnd = n.val : n.selectionStart = n.selectionEnd = n.val, t = { values: [n.selectionStart, n.selectionEnd], value: [n.selectionStart, n.selectionEnd] }) : t = { value: n.val }, i.trigger(C, t)), n._updateTooltip(n.val)
	}, _updateTooltip: function (e) {
		var t = this, n = t.options, i = n.tooltip, r = "";
		i.enabled && (t.tooltipDiv || t._createTooltip(), r = t.owner._getFormattedValue(d(e), t), t.type || (r += t.tooltipInnerDiv), t.tooltipDiv.html(r), t.moveTooltip())
	}, dragcancel: function () {
		return this.owner._refresh(), e(document.documentElement).css("cursor", ""), this._end()
	}, dragend: function () {
		var t = this, n = t.owner;
		return e(document.documentElement).css("cursor", ""), t.type ? n._update(t.selectionStart, t.selectionEnd) : n._update(t.val), t._end()
	}, _end: function () {
		var e = this, t = e.owner;
		return t._focusWithMouse({ target: e.dragHandle[0] }), t.element.on(P), !1
	}, _removeTooltip: function (t) {
		var n = this, i = n.owner;
		n.tooltipDiv && i.options.tooltip.enabled && i.options.enabled && (t ? (n.tooltipDiv.remove(), n.tooltipDiv = null) : n.tooltipDiv.fadeOut("slow", function () {
			e(this).remove(), n.tooltipDiv = null
		}))
	}, moveTooltip: function () {
		var e, t, n, i = this, r = i.owner, o = 0, a = 0, s = i.dragHandle.offset(), l = 4, d = i.tooltipDiv.find(".k-callout");
		i.type ? (e = r.wrapper.find(N), t = e.eq(0).offset(), n = e.eq(1).offset(), r._isHorizontal ? (o = n.top, a = t.left + (n.left - t.left) / 2) : (o = t.top + (n.top - t.top) / 2, a = n.left)) : (o = s.top, a = s.left), r._isHorizontal ? (a -= parseInt((i.tooltipDiv.outerWidth() - i.dragHandle[r._outerSize]()) / 2, 10), o -= i.tooltipDiv.outerHeight() + (d.height() || 0) + l) : (o -= parseInt((i.tooltipDiv.outerHeight() - i.dragHandle[r._outerSize]()) / 2, 10), a -= i.tooltipDiv.outerWidth() + (d.width() || 0) + l), i.tooltipDiv.css({ top: o, left: a })
	}, constrainValue: function (e, t, n, i) {
		var r = this, o = 0;
		return o = e > t && n > e ? r.owner._getValueFromPosition(e, r.dragableArea) : i ? r.options.max : r.options.min
	} }, p.ui.plugin(G);
	var $ = W.extend({ init: function (n, i) {
		var r = this, o = e(n).find("input"), a = o.eq(0)[0], s = o.eq(1)[0];
		a.type = "text", s.type = "text", i = m({}, { selectionStart: c(a, "value"), min: c(a, "min"), max: c(a, "max"), smallStep: c(a, "step") }, { selectionEnd: c(s, "value"), min: c(s, "min"), max: c(s, "max"), smallStep: c(s, "step") }, i), i && i.enabled === t && (i.enabled = !o.is("[disabled]")), W.fn.init.call(r, n, i), i = r.options, u(i.selectionStart) && null !== i.selectionStart || (i.selectionStart = i.min, o.eq(0).val(i.min)), u(i.selectionEnd) && null !== i.selectionEnd || (i.selectionEnd = i.max, o.eq(1).val(i.max));
		var l = r.wrapper.find(N);
		new $.Selection(l, r, i), r._firstHandleDrag = new G.Drag(l.eq(0), "firstHandle", r, i), r._lastHandleDrag = new G.Drag(l.eq(1), "lastHandle", r, i)
	}, options: { name: "RangeSlider", leftDragHandleTitle: "drag", rightDragHandleTitle: "drag", tooltip: { format: "{0}" }, selectionStart: null, selectionEnd: null }, enable: function (n) {
		var i, r = this, o = r.options;
		r.disable(), n !== !1 && (r.wrapper.removeClass(L).addClass(B), r.wrapper.find("input").removeAttr(U), i = function (n) {
			var i, a = q(n), s = r._isHorizontal ? a.x : a.y, l = r._getDragableArea(), d = r._getValueFromPosition(s, l), c = e(n.target);
			return c.hasClass("k-draghandle") ? (c.addClass(H), t) : (o.selectionStart > d ? (r._setValueInRange(d, o.selectionEnd), r._firstHandleDrag.dragstart(n), i = 0) : d > r.selectionEnd ? (r._setValueInRange(o.selectionStart, d), r._lastHandleDrag.dragstart(n), i = 1) : o.selectionEnd - d >= d - o.selectionStart ? (r._setValueInRange(d, o.selectionEnd), r._firstHandleDrag.dragstart(n), i = 0) : (r._setValueInRange(o.selectionStart, d), r._lastHandleDrag.dragstart(n), i = 1), r._focusWithMouse({ target: r.wrapper.find(N)[i] }), t)
		}, r.wrapper.find(M + ", " + O).on(A, i).end().on(A, function () {
			e(document.documentElement).one("selectstart", p.preventDefault)
		}), r.wrapper.find(N).on(D, function () {
			r._setTooltipTimeout()
		}).on(I, function (e) {
			r._focusWithMouse(e), e.preventDefault()
		}).on(z, b(r._focus, r)).on(R, b(r._blur, r)), r.wrapper.find(N).off(F, p.preventDefault).eq(0).on(F, b(function (e) {
			this._keydown(e, "firstHandle")
		}, r)).end().eq(1).on(F, b(function (e) {
			this._keydown(e, "lastHandle")
		}, r)), r.options.enabled = !0)
	}, disable: function () {
		var e = this;
		e.wrapper.removeClass(B).addClass(L), e.wrapper.find("input").attr(U, U), e.wrapper.find(M + ", " + O).off(A), e.wrapper.find(N).off(D).off(F).off(I).off(z).off(R), e.options.enabled = !1
	}, _keydown: function (e, t) {
		var n, i, r, o = this, a = o.options.selectionStart, s = o.options.selectionEnd;
		e.keyCode in o._keyMap && (o._clearTooltipTimeout(), "firstHandle" == t ? (r = o._activeHandleDrag = o._firstHandleDrag, a = o._keyMap[e.keyCode](a), a > s && (s = a)) : (r = o._activeHandleDrag = o._lastHandleDrag, s = o._keyMap[e.keyCode](s), a > s && (a = s)), o._setValueInRange(a, s), n = Math.max(a, o.options.selectionStart), i = Math.min(s, o.options.selectionEnd), r.selectionEnd = Math.max(i, o.options.selectionStart), r.selectionStart = Math.min(n, o.options.selectionEnd), r._updateTooltip(o.value()[o._activeHandle]), e.preventDefault())
	}, _update: function (e, t) {
		var n = this, i = n.value(), r = i[0] != e || i[1] != t;
		n.value([e, t]), r && n.trigger(y, { values: [e, t], value: [e, t] })
	}, value: function (e) {
		return e && e.length ? this._value(e[0], e[1]) : this._value()
	}, _value: function (e, n) {
		var i = this, r = i.options, o = r.selectionStart, a = r.selectionEnd;
		return isNaN(e) && isNaN(n) ? [o, a] : (e = d(e), n = d(n), e >= r.min && r.max >= e && n >= r.min && r.max >= n && n >= e && (o != e || a != n) && (i.element.find("input").eq(0).attr("value", l(e)).end().eq(1).attr("value", l(n)), r.selectionStart = e, r.selectionEnd = n, i._refresh(), i._refreshAriaAttr(e, n)), t)
	}, values: function (e, t) {
		return _(e) ? this._value(e[0], e[1]) : this._value(e, t)
	}, _refresh: function () {
		var e = this, t = e.options;
		e.trigger(E, { values: [t.selectionStart, t.selectionEnd], value: [t.selectionStart, t.selectionEnd] }), t.selectionStart == t.max && t.selectionEnd == t.max && e._setZIndex("firstHandle")
	}, _refreshAriaAttr: function (e, t) {
		var n, i = this, r = i.wrapper.find(N), o = i._activeHandleDrag;
		n = i._getFormattedValue([e, t], o), r.eq(0).attr("aria-valuenow", e), r.eq(1).attr("aria-valuenow", t), r.attr("aria-valuetext", n)
	}, _setValueInRange: function (e, t) {
		var n = this.options;
		e = x.max(x.min(e, n.max), n.min), t = x.max(x.min(t, n.max), n.min), e == n.max && t == n.max && this._setZIndex("firstHandle"), this._update(x.min(e, t), x.max(e, t))
	}, _setZIndex: function (t) {
		this.wrapper.find(N).each(function (n) {
			e(this).css("z-index", "firstHandle" == t ? 1 - n : n)
		})
	}, destroy: function () {
		var e = this;
		f.fn.destroy.call(e), e.wrapper.off(T).find(M + ", " + O).off(T).end().find(N).off(T), e._firstHandleDrag.draggable.destroy(), e._lastHandleDrag.draggable.destroy()
	} });
	$.Selection = function (e, t, n) {
		function i(i) {
			i = i || [];
			var o = i[0] - n.min, a = i[1] - n.min, s = x.ceil(d(o / n.smallStep)), l = x.ceil(d(a / n.smallStep)), c = t._pixelSteps[s], u = t._pixelSteps[l], p = parseInt(e.eq(0)[t._outerSize]() / 2, 10), f = t._isRtl ? 2 : 0;
			e.eq(0).css(t._position, c - p - f).end().eq(1).css(t._position, u - p - f), r(c, u)
		}
		function r(e, n) {
			var i, r, o = t._trackDiv.find(".k-slider-selection");
			i = x.abs(e - n), o[t._size](i), t._isRtl ? (r = x.max(e, n), o.css("right", t._maxSelection - r - 1)) : (r = x.min(e, n), o.css(t._position, r - 1))
		}
		i(t.value()), t.bind([y, C, E], function (e) {
			i(e.values)
		})
	}, p.ui.plugin($)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		return h.test(e)
	}
	function i(e) {
		return f.test(e)
	}
	function r(e) {
		return !n(e) && !i(e)
	}
	function o(t, n) {
		return function (i, r) {
			var o = e(i).data(T);
			if (1 == arguments.length)
				return o[t];
			if (o[t] = r, n) {
				var a = this.element.data("kendoSplitter");
				a.trigger(_)
			}
		}
	}
	function a(e) {
		var t = this, n = e.orientation;
		t.owner = e, t._element = e.element, t.orientation = n, c(t, n === k ? P : I), t._resizable = new s.ui.Resizable(e.element, { orientation: n, handle: ".k-splitbar-draggable-" + n + "[data-marker=" + e._marker + "]", hint: u(t._createHint, t), start: u(t._start, t), max: u(t._max, t), min: u(t._min, t), invalidClass: "k-restricted-size-" + n, resizeend: u(t._stop, t) })
	}
	var s = window.kendo, l = s.ui, d = s.keys, c = e.extend, u = e.proxy, p = l.Widget, f = /^\d+(\.\d+)?px$/i, h = /^\d+(\.\d+)?%$/i, m = ".kendoSplitter", g = "expand", v = "collapse", b = "contentLoad", _ = "resize", x = "layoutChange", k = "horizontal", w = "vertical", y = "mouseenter", C = "click", T = "pane", S = "mouseleave", A = "k-state-focused", D = "k-" + T, E = "." + D, F = p.extend({ init: function (t, n) {
		var i, r = this;
		p.fn.init.call(r, t, n), r.wrapper = r.element, i = r.options.orientation.toLowerCase() != w, r.orientation = i ? k : w, r._dimension = i ? "width" : "height", r._keys = { decrease: i ? d.LEFT : d.UP, increase: i ? d.RIGHT : d.DOWN }, r._resizeStep = 10, r.bind(_, u(r._resize, r)), r._marker = s.guid().substring(0, 8), r._initPanes(), r._resizeHandler = function () {
			r.trigger(_)
		}, r._attachEvents(), e(window).on("resize", r._resizeHandler), r.resizing = new a(r), r.element.triggerHandler("init.kendoSplitter")
	}, events: [g, v, b, _, x], _attachEvents: function () {
		var t = this, n = t.options.orientation, i = " > .k-splitbar-" + n, r = " > .k-splitbar-draggable-" + n, o = ".k-splitbar .k-icon:not(.k-resize-handle)";
		t.element.on("keydown" + m, i, "_keydown").on("mousedown" + m, i, function (e) {
			e.currentTarget.focus()
		}).on("focus" + m, i, function (t) {
			e(t.currentTarget).addClass(A)
		}).on("blur" + m, i, function (n) {
			e(n.currentTarget).removeClass(A), t.resizing.end()
		}).on(y + m, r, function () {
			e(this).addClass("k-splitbar-" + t.orientation + "-hover")
		}).on(S + m, r, function () {
			e(this).removeClass("k-splitbar-" + t.orientation + "-hover")
		}).on("mousedown" + m, r, function () {
			t._panes().append("<div class='k-splitter-overlay k-overlay' />")
		}).on("mouseup" + m, r, function () {
			t._panes().children(".k-splitter-overlay").remove()
		}).on(y + m, o, function () {
			e(this).addClass("k-state-hover")
		}).on(S + m, o, function () {
			e(this).removeClass("k-state-hover")
		}).on(C + m, ".k-splitbar .k-collapse-next, .k-splitbar .k-collapse-prev", t._arrowClick(v)).on(C + m, ".k-splitbar .k-expand-next, .k-splitbar .k-expand-prev", t._arrowClick(g)).on("dblclick" + m, ".k-splitbar", u(t._togglePane, t)).parent().closest(".k-splitter").each(function () {
			var n = e(this), i = n.data("kendoSplitter");
			i ? i.bind(_, t._resizeHandler) : n.one("init" + m, function () {
				e(this).data("kendoSplitter").bind(_, t._resizeHandler), t._resizeHandler()
			})
		})
	}, options: { name: "Splitter", orientation: k }, destroy: function () {
		var t = this;
		p.fn.destroy.call(t), t.element.off(m), t.resizing.destroy(), e(window).off("resize", t._resizeHandler), s.destroy(t.element)
	}, _keydown: function (t) {
		var n, i = this, r = t.keyCode, o = i.resizing, a = e(t.currentTarget), s = i._keys, l = r === s.increase, c = r === s.decrease;
		l || c ? (t.ctrlKey ? (n = a[c ? "next" : "prev"](), o.isResizing() && o.end(), n[i._dimension]() ? i._triggerAction(v, a[c ? "prev" : "next"]()) : i._triggerAction(g, n)) : o.move((c ? -1 : 1) * i._resizeStep, a), t.preventDefault()) : r === d.ENTER && (o.end(), t.preventDefault())
	}, _initPanes: function () {
		var t = this, n = t.options.panes || [];
		t.element.addClass("k-widget").addClass("k-splitter").children().each(function (i, r) {
			var o = n && n[i];
			r = e(r).attr("role", "group").addClass(D), r.data(T, o ? o : {}).toggleClass("k-scrollable", o ? o.scrollable !== !1 : !0), t.ajaxRequest(r)
		}).end(), t.trigger(_)
	}, ajaxRequest: function (t, n, i) {
		t = e(t);
		var r = this, o = t.data(T);
		n = n || o.contentUrl, n && (t.append("<span class='k-icon k-loading k-pane-loading' />"), s.isLocalUrl(n) ? jQuery.ajax({ url: n, data: i || {}, type: "GET", dataType: "html", success: function (e) {
			t.html(e), r.trigger(b, { pane: t[0] })
		} }) : t.removeClass("k-scrollable").html("<iframe src='" + n + "' frameborder='0' class='k-content-frame'>" + "This page requires frames in order to show content" + "</iframe>"))
	}, _triggerAction: function (e, t) {
		this.trigger(e, { pane: t[0] }) || this[e](t[0])
	}, _togglePane: function (t) {
		var n, i = this, r = e(t.target);
		r.closest(".k-splitter")[0] == i.element[0] && (n = r.children(".k-icon:not(.k-resize-handle)"), 1 === n.length && (n.is(".k-collapse-prev") ? i._triggerAction(v, r.prev()) : n.is(".k-collapse-next") ? i._triggerAction(v, r.next()) : n.is(".k-expand-prev") ? i._triggerAction(g, r.prev()) : n.is(".k-expand-next") && i._triggerAction(g, r.next())))
	}, _arrowClick: function (t) {
		var n = this;
		return function (i) {
			var r, o = e(i.target);
			o.closest(".k-splitter")[0] == n.element[0] && (r = o.is(".k-" + t + "-prev") ? o.parent().prev() : o.parent().next(), n._triggerAction(t, r))
		}
	}, _updateSplitBar: function (e, t, n) {
		var i = function (e, t) {
			return t ? "<div class='k-icon " + e + "' />" : ""
		}, r = this.orientation, o = t.resizable !== !1 && n.resizable !== !1, a = t.collapsible, s = t.collapsed, l = n.collapsible, d = n.collapsed;
		e.addClass("k-splitbar k-state-default k-splitbar-" + r).attr("role", "separator").attr("aria-expanded", !(s || d)).removeClass("k-splitbar-" + r + "-hover").toggleClass("k-splitbar-draggable-" + r, o && !s && !d).toggleClass("k-splitbar-static-" + r, !o && !a && !l).html(i("k-collapse-prev", a && !s && !d) + i("k-expand-prev", a && s && !d) + i("k-resize-handle", o) + i("k-collapse-next", l && !d && !s) + i("k-expand-next", l && d && !s))
	}, _updateSplitBars: function () {
		var t = this;
		this.element.children(".k-splitbar").each(function () {
			var n = e(this), i = n.prev(E).data(T), r = n.next(E).data(T);
			r && t._updateSplitBar(n, i, r)
		})
	}, _panes: function () {
		return this.element.children(E)
	}, _resize: function () {
		var i = this, o = i.element, a = o.children(":not(.k-splitbar)"), s = i.orientation == k, l = o.children(".k-splitbar"), d = l.length, c = s ? "width" : "height", u = o[c]();
		0 === d ? (d = a.length - 1, a.slice(0, d).after("<div tabindex='0' class='k-splitbar' data-marker='" + i._marker + "' />"), i._updateSplitBars(), l = o.children(".k-splitbar")) : i._updateSplitBars(), l.each(function () {
			u -= this[s ? "offsetWidth" : "offsetHeight"]
		});
		var p = 0, f = 0, h = e();
		a.css({ position: "absolute", top: 0 })[c](function () {
			var i, o = e(this).data(T) || {};
			if (o.collapsed)
				i = 0, e(this).css("overflow", "hidden");
			else {
				if (r(o.size))
					return h = h.add(this), t;
				i = parseInt(o.size, 10), n(o.size) && (i = Math.floor(i * u / 100))
			}
			return f++, p += i, i
		}), u -= p;
		var m = h.length, g = Math.floor(u / m);
		h.slice(0, m - 1).css(c, g).end().eq(m - 1).css(c, u - (m - 1) * g);
		var v = 0, b = s ? "height" : "width", _ = s ? "left" : "top", w = s ? "offsetWidth" : "offsetHeight";
		if (0 === m) {
			var y = a.filter(function () {
				return !(e(this).data(T) || {}).collapsed
			}).last();
			y[c](u + y[0][w])
		}
		o.children().css(b, o[b]()).each(function (e, t) {
			t.style[_] = Math.floor(v) + "px", v += t[w]
		}), i.trigger(x)
	}, toggle: function (n, i) {
		var r;
		n = e(n), r = n.data(T), (i || r.collapsible) && (1 == arguments.length && (i = r.collapsed === t ? !1 : r.collapsed), r.collapsed = !i, r.collapsed ? n.css("overflow", "hidden") : n.css("overflow", ""), this.trigger(_), this.resizing.destroy(), this.resizing = new a(this))
	}, collapse: function (e) {
		this.toggle(e, !1)
	}, expand: function (e) {
		this.toggle(e, !0)
	}, size: o("size", !0), min: o("min"), max: o("max") });
	l.plugin(F);
	var I = { sizingProperty: "height", sizingDomProperty: "offsetHeight", alternateSizingProperty: "width", positioningProperty: "top", mousePositioningProperty: "pageY" }, P = { sizingProperty: "width", sizingDomProperty: "offsetWidth", alternateSizingProperty: "height", positioningProperty: "left", mousePositioningProperty: "pageX" };
	a.prototype = { press: function (e) {
		this._resizable.press(e)
	}, move: function (e, t) {
		this.pressed || (this.press(t), this.pressed = !0), this._resizable.target || this._resizable.press(t), this._resizable.move(e)
	}, end: function () {
		this._resizable.end(), this.pressed = !1
	}, destroy: function () {
		this._resizable.destroy()
	}, isResizing: function () {
		return this._resizable.resizing
	}, _createHint: function (t) {
		var n = this;
		return e("<div class='k-ghost-splitbar k-ghost-splitbar-" + n.orientation + " k-state-default' />").css(n.alternateSizingProperty, t[n.alternateSizingProperty]())
	}, _start: function (t) {
		var n = this, r = e(t.currentTarget), o = r.prev(), a = r.next(), s = o.data(T), l = a.data(T), d = parseInt(o[0].style[n.positioningProperty], 10), c = parseInt(a[0].style[n.positioningProperty], 10) + a[0][n.sizingDomProperty] - r[0][n.sizingDomProperty], u = parseInt(n._element.css(n.sizingProperty), 10), p = function (e) {
			var t = parseInt(e, 10);
			return (i(e) ? t : u * t / 100) || 0
		}, f = p(s.min), h = p(s.max) || c - d, m = p(l.min), g = p(l.max) || c - d;
		n.previousPane = o, n.nextPane = a, n._maxPosition = Math.min(c - m, d + h), n._minPosition = Math.max(d + f, c - g)
	}, _max: function () {
		return this._maxPosition
	}, _min: function () {
		return this._minPosition
	}, _stop: function (t) {
		var n = this, i = e(t.currentTarget), o = n.owner;
		if (o._panes().children(".k-splitter-overlay").remove(), t.keyCode !== s.keys.ESC) {
			var a = t.position, l = i.prev(), d = i.next(), c = l.data(T), u = d.data(T), p = a - parseInt(l[0].style[n.positioningProperty], 10), f = parseInt(d[0].style[n.positioningProperty], 10) + d[0][n.sizingDomProperty] - a - i[0][n.sizingDomProperty], h = n._element.children(E).filter(function () {
				return r(e(this).data(T).size)
			}).length;
			(!r(c.size) || h > 1) && (r(c.size) && h--, c.size = p + "px"), (!r(u.size) || h > 1) && (u.size = f + "px"), o.trigger(_)
		}
		return !1
	} }
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		return e.map(i(t), function (e) {
			return e.name
		}).join(", ")
	}
	function i(e) {
		var t = e[0];
		return t.files ? r(t.files) : [{ name: s(t.value), extension: a(t.value), size: null}]
	}
	function r(t) {
		return e.map(t, function (e) {
			return o(e)
		})
	}
	function o(e) {
		var t = e.name || e.fileName;
		return { name: t, extension: a(t), size: e.size || e.fileSize, rawFile: e}
	}
	function a(e) {
		var t = e.match(b);
		return t ? t[0] : ""
	}
	function s(e) {
		var t = e.lastIndexOf("\\");
		return -1 != t ? e.substr(t + 1) : e
	}
	function l(t, n, i) {
		if (n._supportsRemove()) {
			var r = t.data("fileNames"), o = e.map(r, function (e) {
				return e.name
			});
			n._submitRemove(o, i, function (e, i, o) {
				n._removeFileEntry(t), n.trigger(w, { operation: "remove", files: r, response: e, XMLHttpRequest: o })
			}, function (e) {
				n.trigger(y, { operation: "remove", files: r, XMLHttpRequest: e }), v("Server response: " + e.responseText)
			})
		}
	}
	function d(t, n, i) {
		var r = !1, o = "";
		try {
			o = e.parseJSON(t), r = !0
		}
		catch (a) {
			i()
		}
		r && n(o)
	}
	function c(e) {
		e.stopPropagation(), e.preventDefault()
	}
	function u(e, t, n, i) {
		var r, o;
		e.on("dragenter" + t, function () {
			n(), o = new Date, r || (r = setInterval(function () {
				var e = new Date - o;
				e > 100 && (i(), clearInterval(r), r = null)
			}, 100))
		}).on("dragover" + t, function () {
			o = new Date
		})
	}
	function p(e) {
		return e.children(".k-icon").is(".k-loading, .k-success, .k-fail")
	}
	function f(t) {
		return e(t.target).closest(".k-file")
	}
	function h() {
		var n = {}, i = e("meta[name=csrf-token]").attr("content"), r = e("meta[name=csrf-param]").attr("content");
		return e("input[name^='__RequestVerificationToken']").each(function () {
			n[this.name] = this.value
		}), r !== t && i !== t && (n[r] = i), n
	}
	var m = window.kendo, g = m.ui.Widget, v = m.logToConsole, b = /\.([^\.]+)$/, _ = ".kendoUpload", x = "select", k = "upload", w = "success", y = "error", C = "complete", T = "cancel", S = "progress", A = "remove", D = g.extend({ init: function (t, n) {
		var i = this;
		g.fn.init.call(i, t, n), i.name = t.name, i.multiple = i.options.multiple, i.localization = i.options.localization;
		var r = i.element;
		i.wrapper = r.closest(".k-upload"), 0 === i.wrapper.length && (i.wrapper = i._wrapInput(r)), i._activeInput(r), i.toggle(i.options.enabled);
		var o = i._ns = _ + "-" + m.guid();
		r.closest("form").on("submit" + o, e.proxy(i._onParentFormSubmit, i)).on("reset" + o, e.proxy(i._onParentFormReset, i)), i.options.async.saveUrl ? (i._module = i._supportsFormData() ? new I(i) : new F(i), i._async = !0) : i._module = new E(i), i._supportsDrop() && i._setupDropZone(), i.wrapper.delegate(".k-upload-action", "click", e.proxy(i._onFileAction, i)).delegate(".k-upload-selected", "click", e.proxy(i._onUploadSelected, i)).delegate(".k-file", "t:progress", e.proxy(i._onFileProgress, i)).delegate(".k-file", "t:upload-success", e.proxy(i._onUploadSuccess, i)).delegate(".k-file", "t:upload-error", e.proxy(i._onUploadError, i))
	}, events: [x, k, w, y, C, T, S, A], options: { name: "Upload", enabled: !0, multiple: !0, showFileList: !0, async: { removeVerb: "POST", autoUpload: !0 }, localization: { select: "Select...", cancel: "Cancel", retry: "Retry", remove: "Remove", uploadSelectedFiles: "Upload files", dropFilesHere: "drop files here to upload", statusUploading: "uploading", statusUploaded: "uploaded", statusFailed: "failed"} }, setOptions: function (e) {
		var t = this, n = t.element;
		g.fn.setOptions.call(t, e), t.multiple = t.options.multiple, n.attr("multiple", t._supportsMultiple() ? t.multiple : !1), t.toggle(t.options.enabled)
	}, enable: function (e) {
		e = e === t ? !0 : e, this.toggle(e)
	}, disable: function () {
		this.toggle(!1)
	}, toggle: function (e) {
		e = e === t ? e : !e, this.wrapper.toggleClass("k-state-disabled", e)
	}, destroy: function () {
		var t = this;
		e(document).add(e(".k-dropzone", t.wrapper)).add(t.wrapper.closest("form")).off(t._ns), g.fn.destroy.call(t)
	}, _addInput: function (t) {
		var n = this;
		t.insertAfter(n.element).data("kendoUpload", n), e(n.element).hide().removeAttr("id"), n._activeInput(t)
	}, _activeInput: function (t) {
		var n = this, i = n.wrapper;
		n.element = t, t.attr("multiple", n._supportsMultiple() ? n.multiple : !1).attr("autocomplete", "off").click(function (e) {
			i.hasClass("k-state-disabled") && e.preventDefault()
		}).change(e.proxy(n._onInputChange, n))
	}, _onInputChange: function (t) {
		var n = this, r = e(t.target), o = n.trigger(x, { files: i(r) });
		o ? (n._addInput(r.clone().val("")), r.remove()) : r.trigger("t:select")
	}, _onDrop: function (t) {
		var n = t.originalEvent.dataTransfer, i = this, o = n.files;
		if (c(t), o.length > 0) {
			var a = i.trigger(x, { files: r(o) });
			a || e(".k-dropzone", i.wrapper).trigger("t:select", [o])
		}
	}, _enqueueFile: function (t, n) {
		var i, r, o = this, a = e(".k-upload-files", o.wrapper);
		return 0 === a.length && (a = e("<ul class='k-upload-files k-reset'></ul>").appendTo(o.wrapper), o.options.showFileList || a.hide()), i = e(".k-file", a), r = e("<li class='k-file'><span class='k-filename' title='" + t + "'>" + t + "</span></li>").appendTo(a).data(n), o._async && r.prepend("<span class='k-icon'></span>"), o.multiple || i.trigger("t:remove"), r
	}, _removeFileEntry: function (t) {
		var n, i = t.closest(".k-upload-files");
		t.remove(), n = e(".k-file", i), n.find("> .k-fail").length === n.length && this._hideUploadButton(), 0 === n.length && i.remove()
	}, _fileAction: function (e, t) {
		var n = { remove: "k-delete", cancel: "k-cancel", retry: "k-retry" };
		n.hasOwnProperty(t) && (this._clearFileAction(e), e.append(this._renderAction(n[t], this.localization[t]).addClass("k-upload-action")))
	}, _fileState: function (e, t) {
		var n = this.localization, i = { uploading: { cssClass: "k-loading", text: n.statusUploading }, uploaded: { cssClass: "k-success", text: n.statusUploaded }, failed: { cssClass: "k-fail", text: n.statusFailed} }, r = i[t];
		if (r) {
			var o = e.children(".k-icon").text(r.text);
			o[0].className = "k-icon " + r.cssClass
		}
	}, _renderAction: function (t, n) {
		return "" !== t ? e("<button type='button' class='k-button k-button-icontext'><span class='k-icon " + t + "'></span>" + n + "</button>") : e("<button type='button' class='k-button'>" + n + "</button>")
	}, _clearFileAction: function (e) {
		e.find(".k-upload-action").remove()
	}, _onFileAction: function (t) {
		var n = this;
		if (!n.wrapper.hasClass("k-state-disabled")) {
			var i = e(t.target).closest(".k-upload-action"), r = i.find(".k-icon"), o = i.closest(".k-file"), a = { files: o.data("fileNames") };
			r.hasClass("k-delete") ? n.trigger(A, a) || o.trigger("t:remove", a.data) : r.hasClass("k-cancel") ? (n.trigger(T, a), o.trigger("t:cancel"), this._checkAllComplete()) : r.hasClass("k-retry") && o.trigger("t:retry")
		}
		return !1
	}, _onUploadSelected: function () {
		return this.wrapper.trigger("t:saveSelected"), !1
	}, _onFileProgress: function (t, n) {
		var i = e(".k-progress-status", t.target);
		0 === i.length && (i = e("<span class='k-progress'><span class='k-state-selected k-progress-status' style='width: 0;'></span></span>").appendTo(e(".k-filename", t.target)).find(".k-progress-status")), i.width(n + "%"), this.trigger(S, { files: f(t).data("fileNames"), percentComplete: n })
	}, _onUploadSuccess: function (e, t, n) {
		var i = f(e);
		this._fileState(i, "uploaded"), this.trigger(w, { files: i.data("fileNames"), response: t, operation: "upload", XMLHttpRequest: n }), this._supportsRemove() ? this._fileAction(i, A) : this._clearFileAction(i), this._checkAllComplete()
	}, _onUploadError: function (e, t) {
		var n = f(e);
		this._fileState(n, "failed"), this._fileAction(n, "retry"), this.trigger(y, { operation: "upload", files: n.data("fileNames"), XMLHttpRequest: t }), v("Server response: " + t.responseText), this._checkAllComplete()
	}, _showUploadButton: function () {
		var t = e(".k-upload-selected", this.wrapper);
		0 === t.length && (t = this._renderAction("", this.localization.uploadSelectedFiles).addClass("k-upload-selected")), this.wrapper.append(t)
	}, _hideUploadButton: function () {
		e(".k-upload-selected", this.wrapper).remove()
	}, _onParentFormSubmit: function () {
		var t = this, n = t.element;
		if (n.trigger("t:abort"), !n.value) {
			var i = e(n);
			i.attr("disabled", "disabled"), window.setTimeout(function () {
				i.removeAttr("disabled")
			}, 0)
		}
	}, _onParentFormReset: function () {
		e(".k-upload-files", this.wrapper).remove()
	}, _supportsFormData: function () {
		return "undefined" != typeof FormData
	}, _supportsMultiple: function () {
		var e = this._userAgent().indexOf("Windows") > -1;
		return !(m.support.browser.opera || m.support.browser.safari && e)
	}, _supportsDrop: function () {
		var e = this._userAgent().toLowerCase(), t = /chrome/.test(e), n = !t && /safari/.test(e), i = n && /windows/.test(e);
		return !i && this._supportsFormData() && this.options.async.saveUrl
	}, _userAgent: function () {
		return navigator.userAgent
	}, _setupDropZone: function () {
		var t = this;
		e(".k-upload-button", this.wrapper).wrap("<div class='k-dropzone'></div>");
		var n = t._ns, i = e(".k-dropzone", t.wrapper).append(e("<em>" + t.localization.dropFilesHere + "</em>")).on("dragenter" + n, c).on("dragover" + n, function (e) {
			e.preventDefault()
		}).on("drop" + n, e.proxy(this._onDrop, this));
		u(i, n, function () {
			i.addClass("k-dropzone-hovered")
		}, function () {
			i.removeClass("k-dropzone-hovered")
		}), u(e(document), n, function () {
			i.addClass("k-dropzone-active")
		}, function () {
			i.removeClass("k-dropzone-active")
		})
	}, _supportsRemove: function () {
		return !!this.options.async.removeUrl
	}, _submitRemove: function (t, n, i, r) {
		var o = this, a = o.options.async.removeField || "fileNames", s = e.extend(n, h());
		s[a] = t, jQuery.ajax({ type: this.options.async.removeVerb, dataType: "json", url: this.options.async.removeUrl, traditional: !0, data: s, success: i, error: r })
	}, _wrapInput: function (e) {
		return e.wrap("<div class='k-widget k-upload'><div class='k-button k-upload-button'></div></div>"), e.closest(".k-button").append("<span>" + this.localization.select + "</span>"), e.closest(".k-upload")
	}, _checkAllComplete: function () {
		0 === e(".k-file .k-icon.k-loading", this.wrapper).length && this.trigger(C)
	} }), E = function (t) {
		this.name = "syncUploadModule", this.element = t.wrapper, this.upload = t, this.element.bind("t:select", e.proxy(this.onSelect, this)).bind("t:remove", e.proxy(this.onRemove, this)).closest("form").attr("enctype", "multipart/form-data").attr("encoding", "multipart/form-data")
	};
	E.prototype = { onSelect: function (t) {
		var r = this.upload, o = e(t.target);
		r._addInput(o.clone().val(""));
		var a = r._enqueueFile(n(o), { relatedInput: o, fileNames: i(o) });
		r._fileAction(a, A)
	}, onRemove: function (e) {
		var t = f(e);
		t.data("relatedInput").remove(), this.upload._removeFileEntry(t)
	} };
	var F = function (t) {
		this.name = "iframeUploadModule", this.element = t.wrapper, this.upload = t, this.iframes = [], this.element.bind("t:select", e.proxy(this.onSelect, this)).bind("t:cancel", e.proxy(this.onCancel, this)).bind("t:retry", e.proxy(this.onRetry, this)).bind("t:remove", e.proxy(this.onRemove, this)).bind("t:saveSelected", e.proxy(this.onSaveSelected, this)).bind("t:abort", e.proxy(this.onAbort, this))
	};
	D._frameId = 0, F.prototype = { onSelect: function (t) {
		var n = this.upload, i = e(t.target), r = this.prepareUpload(i);
		n.options.async.autoUpload ? this.performUpload(r) : (n._supportsRemove() && this.upload._fileAction(r, A), n._showUploadButton())
	}, prepareUpload: function (t) {
		var r = this.upload, o = e(r.element), a = r.options.async.saveField || t.attr("name");
		r._addInput(t.clone().val("")), t.attr("name", a);
		var s = this.createFrame(r.name + "_" + D._frameId++);
		this.registerFrame(s);
		var l = this.createForm(r.options.async.saveUrl, s.attr("name")).append(o), d = r._enqueueFile(n(t), { frame: s, relatedInput: o, fileNames: i(t) });
		return s.data({ form: l, file: d }), d
	}, performUpload: function (t) {
		var n = { files: t.data("fileNames") }, i = t.data("frame"), r = this.upload;
		if (r.trigger(k, n))
			r._removeFileEntry(i.data("file")), this.cleanupFrame(i), this.unregisterFrame(i);
		else {
			r._hideUploadButton(), i.appendTo(document.body);
			var o = i.data("form").appendTo(document.body);
			n.data = e.extend({}, n.data, h());
			for (var a in n.data) {
				var s = o.find("input[name='" + a + "']");
				0 === s.length && (s = e("<input>", { type: "hidden", name: a }).appendTo(o)), s.val(n.data[a])
			}
			r._fileAction(t, T), r._fileState(t, "uploading"), i.one("load", e.proxy(this.onIframeLoad, this)), o[0].submit()
		}
	}, onSaveSelected: function () {
		var t = this;
		e(".k-file", this.element).each(function () {
			var n = e(this), i = p(n);
			i || t.performUpload(n)
		})
	}, onIframeLoad: function (t) {
		var n, i = e(t.target);
		try {
			n = i.contents().text()
		}
		catch (t) {
			n = "Error trying to get server response: " + t
		}
		this.processResponse(i, n)
	}, processResponse: function (t, n) {
		var i = t.data("file"), r = this, o = { responseText: n };
		d(n, function (n) {
			e.extend(o, { statusText: "OK", status: "200" }), i.trigger("t:progress", [100]), i.trigger("t:upload-success", [n, o]), r.cleanupFrame(t), r.unregisterFrame(t)
		}, function () {
			e.extend(o, { statusText: "error", status: "500" }), i.trigger("t:upload-error", [o])
		})
	}, onCancel: function (t) {
		var n = e(t.target).data("frame");
		this.stopFrameSubmit(n), this.cleanupFrame(n), this.unregisterFrame(n), this.upload._removeFileEntry(n.data("file"))
	}, onRetry: function (e) {
		var t = f(e);
		this.performUpload(t)
	}, onRemove: function (e, t) {
		var n = f(e), i = n.data("frame");
		i ? (this.unregisterFrame(i), this.upload._removeFileEntry(n), this.cleanupFrame(i)) : l(n, this.upload, t)
	}, onAbort: function () {
		var t = this.element, n = this;
		e.each(this.iframes, function () {
			e("input", this.data("form")).appendTo(t), n.stopFrameSubmit(this[0]), this.data("form").remove(), this.remove()
		}), this.iframes = []
	}, createFrame: function (t) {
		return e("<iframe name='" + t + "'" + " id='" + t + "'" + " style='display:none;' />")
	}, createForm: function (t, n) {
		return e("<form enctype='multipart/form-data' method='POST' action='" + t + "'" + " target='" + n + "'" + "/>")
	}, stopFrameSubmit: function (e) {
		e.stop !== t ? e.stop() : e.document && e.document.execCommand("Stop")
	}, registerFrame: function (e) {
		this.iframes.push(e)
	}, unregisterFrame: function (t) {
		this.iframes = e.grep(this.iframes, function (e) {
			return e.attr("name") != t.attr("name")
		})
	}, cleanupFrame: function (e) {
		var t = e.data("form");
		e.data("file").data("frame", null), setTimeout(function () {
			t.remove(), e.remove()
		}, 1)
	} };
	var I = function (t) {
		this.name = "formDataUploadModule", this.element = t.wrapper, this.upload = t, this.element.bind("t:select", e.proxy(this.onSelect, this)).bind("t:cancel", e.proxy(this.onCancel, this)).bind("t:remove", e.proxy(this.onRemove, this)).bind("t:retry", e.proxy(this.onRetry, this)).bind("t:saveSelected", e.proxy(this.onSaveSelected, this)).bind("t:abort", e.proxy(this.onAbort, this))
	};
	I.prototype = {
		onSelect: function (t, n) {
			var i = this.upload, o = this, a = e(t.target), s = n ? r(n) : this.inputFiles(a), l = this.prepareUpload(a, s);
			e.each(l, function () {
				i.options.async.autoUpload ? o.performUpload(this) : (i._supportsRemove() && i._fileAction(this, A), i._showUploadButton())
			})
		}, prepareUpload: function (t, n) {
			var i = this.enqueueFiles(n);
			return t.is("input") && (e.each(i, function () {
				e(this).data("relatedInput", t)
			}), t.data("relatedFileEntries", i), this.upload._addInput(t.clone().val(""))), i
		}, enqueueFiles: function (t) {
			var n, i, r, o, a = this.upload, s = t.length, l = [];
			if (a.options.async.batch === !0)
				n = e.map(t, function (e) {
					return e.name
				}).join(", "), o = a._enqueueFile(n, { fileNames: t }), o.data("files", t), l.push(o);
			else
				for (i = 0; s > i; i++)
					r = t[i], n = r.name, o = a._enqueueFile(n, { fileNames: [r] }), o.data("files", [r]), l.push(o);
			return l
		}, inputFiles: function (e) {
			return i(e)
		}, performUpload: function (t) {
			var n = this.upload, i = this.createFormData(t.data("files")), r = { files: t.data("fileNames") };
			if (n.trigger(k, r))
				this.removeFileEntry(t);
			else {
				n._fileAction(t, T), n._hideUploadButton(), r.data = e.extend({}, r.data, h());
				for (var o in r.data)
					i.append(o, r.data[o]);
				n._fileState(t, "uploading"), this.postFormData(this.upload.options.async.saveUrl, i, t)
			}
		}, onSaveSelected: function () {
			var t = this;
			e(".k-file", this.element).each(function () {
				var n = e(this), i = p(n);
				i || t.performUpload(n)
			})
		}, onCancel: function (e) {
			var t = f(e);
			this.stopUploadRequest(t), this.removeFileEntry(t)
		}, onRetry: function (e) {
			var t = f(e);
			this.performUpload(t)
		}, onRemove: function (e, t) {
			var n = f(e);
			n.children(".k-icon").is(".k-success") ? l(n, this.upload, t) : this.removeFileEntry(n)
		}, postFormData: function (e, t, n) {
			var i = new XMLHttpRequest, r = this;
			n.data("request", i), i.addEventListener("load", function (e) {
				r.onRequestSuccess.call(r, e, n)
			}, !1), i.addEventListener(y, function (e) {
				r.onRequestError.call(r, e, n)
			}, !1), i.upload.addEventListener("progress", function (e) {
				r.onRequestProgress.call(r, e, n)
			}, !1), i.open("POST", e), i.withCredentials = "true", i.send(t)
		}, createFormData: function (e) {
			var t, n = new FormData, i = this.upload, r = e.length;
			for (t = 0; r > t; t++)
				n.append(i.options.async.saveField || i.name, e[t].rawFile);
			return n
		}, onRequestSuccess: function (e, t) {
			function n() {
				t.trigger("t:upload-error", [i])
			}
			var i = e.target, r = this;
			i.status >= 200 && 299 >= i.status ? d(i.responseText, function (e) {
				t.trigger("t:progress", [100]), t.trigger("t:upload-success", [e, i]), r.cleanupFileEntry(t)
			}, n) : n()
		}, onRequestError: function (e, t) {
			var n = e.target;
			t.trigger("t:upload-error", [n])
		}, cleanupFileEntry: function (t) {
			var n = t.data("relatedInput"), i = !0;
			n && (e.each(n.data("relatedFileEntries") || [], function () {
				this.parent().length > 0 && this[0] != t[0] && (i = i && this.children(".k-icon").is(".k-success"))
			}), i && n.remove())
		}, removeFileEntry: function (e) {
			this.cleanupFileEntry(e), this.upload._removeFileEntry(e)
		}, onRequestProgress: function (e, t) {
			var n = Math.round(100 * e.loaded / e.total);
			t.trigger("t:progress", [n])
		}, stopUploadRequest: function (e) {
			e.data("request").abort()
		}
	}, m.ui.plugin(D)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		return e !== t
	}
	function i(e, t, n) {
		return Math.max(Math.min(e, n), t)
	}
	function r(e, t) {
		var n = e.children(y);
		return n.data("kendoWindow") || n.data("kendo" + t)
	}
	function o(t) {
		return e(x).filter(function () {
			var n = e(this), i = r(n, t);
			return i.options.modal && n.is(F) && i.options.visible
		}).sort(function (t, n) {
			return +e(t).css("zIndex") - +e(n).css("zIndex")
		})
	}
	function a(e, t) {
		return function () {
			var e = this, n = e.wrapper, i = n[0].style, r = e.options;
			if (!r.isMaximized && !r.isMinimized)
				return e.restoreOptions = { width: i.width, height: i.height }, n.find(C).hide().end().find(W).parent().hide().eq(0).before(d.action({ name: "Restore" })), t.call(e), e
		}
	}
	function s(e) {
		var t = this;
		t.owner = e, t._draggable = new p(e.wrapper, { filter: C, group: e.wrapper.id + "-resizing", dragstart: h(t.dragstart, t), drag: h(t.drag, t), dragend: h(t.dragend, t) })
	}
	function l(e) {
		var t = this;
		t.owner = e, t._draggable = new p(e.wrapper, { filter: w, group: e.wrapper.id + "-moving", dragstart: h(t.dragstart, t), drag: h(t.drag, t), dragend: h(t.dragend, t), dragcancel: h(t.dragcancel, t) })
	}
	var d, c = window.kendo, u = c.ui.Widget, p = c.ui.Draggable, f = e.isPlainObject, h = e.proxy, m = e.extend, g = e.each, v = c.template, b = "body", _ = ".kendoWindow", x = ".k-window", k = ".k-window-title", w = k + "bar", y = ".k-window-content", C = ".k-resize-handle", T = ".k-overlay", S = "k-content-frame", A = "k-loading", D = "k-state-hover", E = "k-state-focused", F = ":visible", I = "hidden", P = "cursor", z = "open", R = "activate", N = "deactivate", O = "close", M = "refresh", H = "resize", B = "dragstart", L = "dragend", V = "error", U = "overflow", j = "zIndex", W = ".k-window-actions .k-i-minimize,.k-window-actions .k-i-maximize", q = ".k-window-titlebar .k-window-action", G = c.isLocalUrl, $ = u.extend({ init: function (t, i) {
		var r, o, a, p, m, v, b, C = this, T = !1;
		u.fn.init.call(C, t, i), i = C.options, t = C.element, m = i.content, C.appendTo = e(i.appendTo || document.body), C._animations(), m && !f(m) && (m = i.content = { url: m }), t.parent().is(C.appendTo) || (t.find("script").filter(function () {
			return !this.type || this.type.toLowerCase().indexOf("script") >= 0
		}).remove(), t.is(F) ? (o = t.offset(), T = !0) : (a = t.css("visibility"), p = t.css("display"), t.css({ visibility: I, display: "" }), o = t.offset(), t.css({ visibility: a, display: p }))), n(i.visible) && null !== i.visible || (i.visible = t.is(F)), r = C.wrapper = t.closest(x), t.is(".k-content") && r[0] || (t.addClass("k-window-content k-content"), C._createWindow(t, i), r = C.wrapper = t.closest(x), C._dimensions()), o && r.css({ top: o.top, left: o.left }), m && C.refresh(m), C.toFront(), v = r.children(y), C._tabindex(v), i.visible && i.modal && C._overlay(r.is(F)).css({ opacity: .5 }), r.on("mouseenter" + _, q, function () {
			e(this).addClass(D)
		}).on("mouseleave" + _, q, function () {
			e(this).removeClass(D)
		}).on("touchend" + _ + " click" + _, q, h(C._windowActionHandler, C)), v.on("keydown" + _, h(C._keydown, C)).on("focus" + _, function () {
			r.addClass(E)
		}).on("blur" + _, function () {
			r.removeClass(E)
		}), i.resizable && (r.on("dblclick" + _, w, h(C.toggleMaximization, C)), g("n e s w se sw ne nw".split(" "), function (e, t) {
			r.append(d.resizeHandle(t))
		}), C.resizing = new s(C)), i.draggable && (C.dragging = new l(C)), b = t.attr("id"), b && (b += "_wnd_title", r.find(w).children(k).attr("id", b), v.attr({ role: "dialog", "aria-labelledby": b })), r.add(r.find(".k-resize-handle,.k-window-titlebar")).on("mousedown" + _, h(C.toFront, C)), C.touchScroller = c.touchScroller(t), C._resizeHandler = function (e) {
			return C._onDocumentResize(e)
		}, e(window).on("resize", C._resizeHandler), i.visible && (C.element.focus(), C.trigger(z), C.trigger(R)), c.notify(C)
	}, _dimensions: function () {
		var e = this, t = e.wrapper, n = e.element, i = e.options;
		e.title(i.title), i.width && t.width(i.width), i.height && t.height(i.height), g(["minWidth", "minHeight", "maxWidth", "maxHeight"], function (e, t) {
			var r = i[t];
			r && 1 / 0 != r && n.css(t, r)
		}), i.visible || t.hide()
	}, _animations: function () {
		var e = this.options;
		e.animation === !1 && (e.animation = { open: { effects: {} }, close: { hide: !0, effects: {}} })
	}, setOptions: function (e) {
		u.fn.setOptions.call(this, e), this._animations(), this._dimensions()
	}, events: [z, R, N, O, M, H, B, L, V], options: { name: "Window", animation: { open: { effects: { zoom: { direction: "in" }, fade: { direction: "in"} }, duration: 350 }, close: { effects: { zoom: { direction: "out", properties: { scale: .7} }, fade: { direction: "out"} }, duration: 350, hide: !0} }, title: "", actions: ["Close"], modal: !1, resizable: !0, draggable: !0, minWidth: 90, minHeight: 50, maxWidth: 1 / 0, maxHeight: 1 / 0, visible: null }, _closable: function () {
		return e.inArray("close", e.map(this.options.actions, function (e) {
			return e.toLowerCase()
		})) > -1
	}, _keydown: function (e) {
		var t, n, r, o, a = this, s = a.options, l = c.keys, d = e.keyCode, u = a.wrapper, p = 10, f = a.options.isMaximized;
		e.target == e.currentTarget && (d == l.ESC && a._closable() && a._close(!0), !s.draggable || e.ctrlKey || f || (t = u.offset(), d == l.UP ? n = u.css("top", t.top - p) : d == l.DOWN ? n = u.css("top", t.top + p) : d == l.LEFT ? n = u.css("left", t.left - p) : d == l.RIGHT && (n = u.css("left", t.left + p))), s.resizable && e.ctrlKey && !f && (d == l.UP ? (n = !0, o = u.height() - p) : d == l.DOWN && (n = !0, o = u.height() + p), d == l.LEFT ? (n = !0, r = u.width() - p) : d == l.RIGHT && (n = !0, r = u.width() + p), n && (u.css({ width: i(r, s.minWidth, s.maxWidth), height: i(o, s.minHeight, s.maxHeight) }), a.trigger(H))), n && e.preventDefault())
	}, _overlay: function (t) {
		var n = this.appendTo.children(".k-overlay"), i = this.wrapper;
		return n.length || (n = e("<div class='k-overlay' />")), n.insertBefore(i[0]).toggle(t).css(j, parseInt(i.css(j), 10) - 1), n
	}, _windowActionHandler: function (n) {
		var i = e(n.target).closest(".k-window-action").find(".k-icon"), r = this;
		g({ "k-i-close": function () {
			r._close(!0)
		}, "k-i-maximize": r.maximize, "k-i-minimize": r.minimize, "k-i-restore": r.restore, "k-i-refresh": r.refresh }, function (e, o) {
			return i.hasClass(e) ? (n.preventDefault(), o.call(r), !1) : t
		})
	}, center: function () {
		var t = this.wrapper, n = e(window);
		return t.css({ left: n.scrollLeft() + Math.max(0, (n.width() - t.width()) / 2), top: n.scrollTop() + Math.max(0, (n.height() - t.height()) / 2) }), this
	}, title: function (e) {
		var t = this, n = t.wrapper, i = t.options, r = n.find(w), o = r.children(k), a = r.outerHeight();
		return arguments.length ? (e === !1 ? (n.addClass("k-window-titleless"), r.remove()) : (r.length || n.prepend(d.titlebar(m(d, i))), n.css("padding-top", a), r.css("margin-top", -a)), o.text(e), t) : o.text()
	}, content: function (e) {
		var t = this.wrapper.children(y);
		return e ? (t.html(e), this) : t.html()
	}, open: function () {
		var t, n = this, i = n.wrapper, r = n.options, o = r.animation.open, a = i.children(y), s = a.css(U);
		return n.trigger(z) || (n.toFront(), n.element.focus(), r.visible = !0, r.modal && (t = n._overlay(!1), o.duration ? t.kendoStop().kendoAnimate({ effects: "fade:in", duration: o.duration }) : t.css("opacity", .5).show()), i.is(F) || (a.css(U, I), i.show().kendoStop().kendoAnimate({ effects: o.effects, duration: o.duration, complete: function () {
			n.element.focus(), n.trigger(R), a.css(U, s)
		} }))), r.isMaximized && (n._documentScrollTop = e(document).scrollTop(), e("html, body").css(U, I)), n
	}, _close: function (n) {
		var i, a, s, l = this, d = l.wrapper, c = l.options, u = c.animation.open, p = c.animation.close;
		d.is(F) && !l.trigger(O, { userTriggered: !!n }) && (c.visible = !1, e(x).each(function (t, n) {
			var i = e(n), r = i.find(y);
			n != d && r.find("> ." + S).length > 0 && r.children(".k-overlay").remove()
		}), i = o(c.name), a = c.modal && !i.length, s = c.modal ? l._overlay(!0) : e(t), a ? p.duration ? s.kendoStop().kendoAnimate({ effects: "fade:out", duration: p.duration, hide: !0 }) : s.hide() : i.length && r(i.eq(i.length - 1), c.name)._overlay(!0), d.kendoStop().kendoAnimate({ effects: p.effects || u.effects, reverse: p.reverse === !0, duration: p.duration, complete: function () {
			d.hide(), l.trigger(N)
		} })), l.options.isMaximized && (e("html, body").css(U, ""), l._documentScrollTop && l._documentScrollTop > 0 && e(document).scrollTop(l._documentScrollTop))
	}, close: function () {
		return this._close(!1), this
	}, toFront: function (t) {
		var n = this, i = n.wrapper, r = i[0], o = +i.css(j), a = o, s = document.activeElement, l = n.element, c = t && t.target ? t.target : null;
		if (e(x).each(function (t, n) {
			var i = e(n), a = i.css(j), s = i.find(y);
			isNaN(a) || (o = Math.max(+a, o)), n != r && s.find("> ." + S).length > 0 && s.append(d.overlay)
		}), (10001 == o || o > a) && i.css(j, o + 2), n.element.find("> .k-overlay").remove(), !(e(s).is(l) || e(c).is(q + "," + q + " .k-icon,:input") || l.find(s).length && l.find(c).length)) {
			l.focus();
			var u = e(window).scrollTop(), p = parseInt(n.wrapper.position().top, 10);
			p > 0 && 0 > p - u && (u > 0 ? e(window).scrollTop(p) : n.wrapper.css("top", u))
		}
		return n
	}, toggleMaximization: function () {
		return this[this.options.isMaximized ? "restore" : "maximize"]()
	}, restore: function () {
		var t = this, n = t.options, i = t.restoreOptions;
		if (n.isMaximized || n.isMinimized)
			return t.wrapper.css({ position: "absolute", left: i.left, top: i.top, width: i.width, height: i.height }).find(".k-window-content,.k-resize-handle").show().end().find(".k-window-titlebar .k-i-restore").parent().remove().end().end().find(W).parent().show(), e("html, body").css(U, ""), this._documentScrollTop && this._documentScrollTop > 0 && e(document).scrollTop(this._documentScrollTop), n.isMaximized = n.isMinimized = !1, t.trigger(H), t
	}, maximize: a("maximize", function () {
		var t = this, n = t.wrapper, i = n.position();
		m(t.restoreOptions, { left: i.left, top: i.top }), n.css({ left: 0, top: 0, position: "fixed" }), this._documentScrollTop = e(document).scrollTop(), e("html, body").css(U, I), t.options.isMaximized = !0, t._onDocumentResize()
	}), minimize: a("minimize", function () {
		var e = this;
		e.wrapper.css("height", ""), e.element.hide(), e.options.isMinimized = !0
	}), _onDocumentResize: function () {
		var t = this, n = t.wrapper, i = e(window);
		t.options.isMaximized && (n.css({ width: i.width(), height: i.height() - parseInt(n.css("padding-top"), 10) }), t.trigger(H))
	}, refresh: function (t) {
		var i, r, o, a = this, s = a.options, l = e(a.element);
		return f(t) || (t = { url: t }), t = m({}, s.content, t), r = n(s.iframe) ? s.iframe : t.iframe, o = t.url, o ? (n(r) || (r = !G(o)), r ? (i = l.find("." + S)[0], i ? i.src = o || i.src : l.html(d.contentFrame(m({}, s, { content: t }))), l.find("." + S).unbind("load" + _).on("load" + _, function () {
			a.trigger(M)
		})) : a._ajaxRequest(t)) : (t.template && a.content(v(t.template)({})), a.trigger(M)), a
	}, _ajaxRequest: function (e) {
		var t = this, n = e.template, i = t.wrapper.find(".k-window-titlebar .k-i-refresh"), r = setTimeout(function () {
			i.addClass(A)
		}, 100);
		jQuery.ajax(m({ type: "GET", dataType: "html", cache: !1, error: h(function (e, n) {
			t.trigger(V, { status: n, xhr: e })
		}, t), complete: function () {
			clearTimeout(r), i.removeClass(A)
		}, success: h(function (e) {
			n && (e = v(n)(e || {})), t.element.html(e), t.trigger(M)
		}, t) }, e))
	}, destroy: function () {
		var t, n, i = this;
		u.fn.destroy.call(i), c.destroy(i.wrapper), i.resizing && i.resizing.destroy(), i.dragging && i.dragging.destroy(), i.wrapper.remove().add(i.wrapper.find(".k-resize-handle,.k-window-titlebar")).off(_), e(window).off("resize", i._resizeHandler), t = o(), n = i.options.modal && !t.length, n ? i._overlay(!1).remove() : t.length > 0 && r(t.eq(t.length - 2), i.options.name)._overlay(!0)
	}, _createWindow: function () {
		var t, n, i = this, r = i.element, o = i.options, a = c.support.isRtl(r);
		o.scrollable === !1 && r.attr("style", "overflow:hidden;"), o.iframe && o.content && r.html(d.contentFrame(o)), n = e(d.wrapper(o)), o.title !== !1 && n.append(d.titlebar(m(d, o))), t = r.find("iframe:not(.k-content)").map(function () {
			var e = this.getAttribute("src");
			return this.src = "", e
		}), n.toggleClass("k-rtl", a).appendTo(i.appendTo).append(r).find("iframe:not(.k-content)").each(function (e) {
			this.src = t[e]
		}), n.find(".k-window-title").css(a ? "left" : "right", n.find(".k-window-actions").outerWidth() + 10), r.show()
	} });
	d = { wrapper: v("<div class='k-widget k-window' />"), action: v("<a role='button' href='\\#' class='k-window-action k-link'><span role='presentation' class='k-icon k-i-#= name.toLowerCase() #'>#= name #</span></a>"), titlebar: v("<div class='k-window-titlebar k-header'>&nbsp;<span class='k-window-title'>#= title #</span><div class='k-window-actions'># for (var i = 0; i < actions.length; i++) { ##= action({ name: actions[i] }) ## } #</div></div>"), overlay: "<div class='k-overlay' />", contentFrame: v("<iframe frameborder='0' title='#= title #' class='" + S + "' " + "src='#= content.url #'>" + "This page requires frames in order to show content" + "</iframe>"), resizeHandle: v("<div class='k-resize-handle k-resize-#= data #'></div>") }, s.prototype = { dragstart: function (t) {
		var n = this, i = n.owner, r = i.wrapper;
		n.elementPadding = parseInt(i.wrapper.css("padding-top"), 10), n.initialCursorPosition = r.offset(), n.resizeDirection = t.currentTarget.prop("className").replace("k-resize-handle k-resize-", ""), n.initialSize = { width: r.width(), height: r.height() }, n.containerOffset = i.appendTo.offset(), r.append(d.overlay).find(C).not(t.currentTarget).hide(), e(b).css(P, t.currentTarget.css(P))
	}, drag: function (e) {
		var t, n, r, o, a = this, s = a.owner, l = s.wrapper, d = s.options, c = a.resizeDirection, u = a.containerOffset, p = a.initialCursorPosition, f = a.initialSize, h = e.x.location, m = e.y.location;
		c.indexOf("e") >= 0 ? (t = h - p.left, l.width(i(t, d.minWidth, d.maxWidth))) : c.indexOf("w") >= 0 && (o = p.left + f.width, t = i(o - h, d.minWidth, d.maxWidth), l.css({ left: o - t - u.left, width: t })), c.indexOf("s") >= 0 ? (n = m - p.top - a.elementPadding, l.height(i(n, d.minHeight, d.maxHeight))) : c.indexOf("n") >= 0 && (r = p.top + f.height, n = i(r - m, d.minHeight, d.maxHeight), l.css({ top: r - n - u.top, height: n })), s.trigger(H)
	}, dragend: function (t) {
		var n = this, i = n.owner, r = i.wrapper;
		return r.find(T).remove().end().find(C).not(t.currentTarget).show(), e(b).css(P, ""), i.touchScroller && i.touchScroller.reset(), 27 == t.keyCode && r.css(n.initialCursorPosition).css(n.initialSize), !1
	}, destroy: function () {
		this._draggable.destroy()
	} }, l.prototype = { dragstart: function (t) {
		var n = this.owner, i = n.element, r = i.find(".k-window-actions"), o = n.appendTo.offset();
		n.trigger(B), n.initialWindowPosition = n.wrapper.position(), n.startPosition = { left: t.x.client - n.initialWindowPosition.left, top: t.y.client - n.initialWindowPosition.top }, n.minLeftPosition = r.length > 0 ? r.outerWidth() + parseInt(r.css("right"), 10) - i.outerWidth() : 20 - i.outerWidth(), n.minLeftPosition -= o.left, n.minTopPosition = -o.top, n.wrapper.append(d.overlay).find(C).hide(), e(b).css(P, t.currentTarget.css(P))
	}, drag: function (t) {
		var n = this.owner, i = { left: Math.max(t.x.client - n.startPosition.left, n.minLeftPosition), top: Math.max(t.y.client - n.startPosition.top, n.minTopPosition) };
		e(n.wrapper).css(i)
	}, _finishDrag: function () {
		var t = this.owner;
		t.wrapper.find(C).toggle(!t.options.isMinimized).end().find(T).remove(), e(b).css(P, "")
	}, dragcancel: function (e) {
		this._finishDrag(), e.currentTarget.closest(x).css(this.owner.initialWindowPosition)
	}, dragend: function () {
		return this._finishDrag(), this.owner.trigger(L), !1
	}, destroy: function () {
		this._draggable.destroy()
	} }, c.ui.plugin($)
}(window.kendo.jQuery), function (e) {
	function t(e) {
		var t = { top: 0, right: 0, bottom: 0, left: 0 };
		return "number" == typeof e ? t[ot] = t[it] = t[O] = t[K] = e : (t[ot] = e[ot] || 0, t[it] = e[it] || 0, t[O] = e[O] || 0, t[K] = e[K] || 0), t
	}
	function n(e, t) {
		return y.extend({ init: function (e) {
			this.view = e
		}, decorate: function (n) {
			var i, r = this, o = r.view, a = n.options.animation;
			return a && a.type === e && o.options.transitions && (i = n._animation = new t(n, a), o.animations.push(i)), n
		} })
	}
	function i(t, n, r) {
		var s = o(n), l = t + s + r, d = i.cache[l], c = { width: 0, height: 0, baseline: 0 };
		if (d)
			return d;
		var u = i.measureBox, p = i.baselineMarker.cloneNode(!1);
		u || (u = i.measureBox = e("<div style='position: absolute; top: -4000px; left: -4000px;line-height: normal; visibility: hidden;' />").appendTo(x.body)[0]);
		for (var f in n)
			u.style[f] = n[f];
		if (u.innerHTML = t, u.appendChild(p), (t + "").length && (c = { width: u.offsetWidth - R, height: u.offsetHeight, baseline: p.offsetTop + R }), r) {
			var h = c.width, m = c.height, g = h / 2, v = m / 2, b = a(0, 0, g, v, r), _ = a(h, 0, g, v, r), k = a(h, m, g, v, r), w = a(0, m, g, v, r);
			c.normalWidth = h, c.normalHeight = m, c.width = D.max(b.x, _.x, k.x, w.x) - D.min(b.x, _.x, k.x, w.x), c.height = D.max(b.y, _.y, k.y, w.y) - D.min(b.y, _.y, k.y, w.y)
		}
		return i.cache[l] = c, c
	}
	function r(e, t) {
		var n = t - e;
		if (0 === n) {
			if (0 === t)
				return .1;
			n = D.abs(t)
		}
		var i = D.pow(10, D.floor(D.log(n) / D.log(10))), r = h(n / i, U), o = 1;
		return o = 1.904762 > r ? .2 : 4.761904 > r ? .5 : 9.523809 > r ? 1 : 2, h(i * o, U)
	}
	function o(e) {
		var t = [];
		for (var n in e)
			t.push(n + e[n]);
		return t.sort().join(" ")
	}
	function a(e, t, n, i, r) {
		var o = r * W;
		return { x: n + (e - n) * D.cos(o) + (t - i) * D.sin(o), y: i - (e - n) * D.sin(o) + (t - i) * D.cos(o)}
	}
	function s(t, n) {
		if (t.x1 == n.x1 && t.y1 == n.y1 && t.x2 == n.x2 && t.y2 == n.y2)
			return n;
		var i = D.min(t.x1, n.x1), r = D.max(t.x1, n.x1), o = D.min(t.x2, n.x2), a = D.max(t.x2, n.x2), s = D.min(t.y1, n.y1), l = D.max(t.y1, n.y1), d = D.min(t.y2, n.y2), c = D.max(t.y2, n.y2), u = [];
		return u[0] = new ht(r, s, o, l), u[1] = new ht(i, l, r, d), u[2] = new ht(o, l, a, d), u[3] = new ht(r, d, o, c), t.x1 == i && t.y1 == s || n.x1 == i && n.y1 == s ? (u[4] = new ht(i, s, r, l), u[5] = new ht(o, d, a, c)) : (u[4] = new ht(o, s, a, l), u[5] = new ht(i, d, r, c)), e.grep(u, function (e) {
			return e.height() > 0 && e.width() > 0
		})[0]
	}
	function l() {
		return x.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
	}
	function d(e, t) {
		return -1 != A(e, t)
	}
	function c(e) {
		return e[e.length - 1]
	}
	function u(e, t) {
		[].push.apply(e, t)
	}
	function p(e, t) {
		return h(D.ceil(e / t) * t, U)
	}
	function f(e, t) {
		return h(D.floor(e / t) * t, U)
	}
	function h(e, t) {
		var n = D.pow(10, t || 0);
		return D.round(e * n) / n
	}
	function m(e, t, n) {
		return h(e + (t - e) * n, H)
	}
	function g(e) {
		return typeof e !== at
	}
	function v(e, t) {
		return e - t
	}
	function b(e, t, n) {
		var i, r = e.length;
		for (i = 0; r > i; i++)
			e[i][t] = n
	}
	function _(e, t) {
		return e.match(G) ? k.format.apply(this, arguments) : k.toString(t, e)
	}
	var x = document, k = window.kendo, w = k.dataviz = {}, y = k.Class, C = k.template, T = e.map, S = e.noop, A = e.inArray, D = Math, E = k.deepExtend, F = function (e) {
		return C(e, { useWithBlock: !1, paramName: "d" })
	}, I = "k-", P = 10, z = "axisLabelClick", R = 1, N = "#000", O = "bottom", M = "center", H = 3, B = "clip", L = "12px sans-serif", V = 400, U = 6, j = 600, W = D.PI / 180, q = "fadeIn", G = /\{\d+:?/, $ = "height", Y = "k", Q = 600, K = "left", X = "linear", J = Number.MAX_VALUE, Z = -Number.MAX_VALUE, et = "none", tt = "outside", nt = "radial", it = "right", rt = "swing", ot = "top", at = "undefined", st = /([A-Z])/g, lt = "width", dt = "#fff", ct = "x", ut = "y", pt = .2, ft = y.extend({ init: function (e, t) {
		var n = this;
		n.x = h(e || 0, H), n.y = h(t || 0, H)
	}, clone: function () {
		var e = this;
		return new ft(e.x, e.y)
	} }), ht = y.extend({ init: function (e, t, n, i) {
		var r = this;
		r.x1 = e || 0, r.x2 = n || 0, r.y1 = t || 0, r.y2 = i || 0
	}, width: function () {
		return this.x2 - this.x1
	}, height: function () {
		return this.y2 - this.y1
	}, translate: function (e, t) {
		var n = this;
		return n.x1 += e, n.x2 += e, n.y1 += t, n.y2 += t, n
	}, move: function (e, t) {
		var n = this, i = n.height(), r = n.width();
		return n.x1 = e, n.y1 = t, n.x2 = n.x1 + r, n.y2 = n.y1 + i, n
	}, wrap: function (e) {
		var t = this;
		return t.x1 = D.min(t.x1, e.x1), t.y1 = D.min(t.y1, e.y1), t.x2 = D.max(t.x2, e.x2), t.y2 = D.max(t.y2, e.y2), t
	}, wrapPoint: function (e) {
		return this.wrap(new ht(e.x, e.y, e.x, e.y)), this
	}, snapTo: function (e, t) {
		var n = this;
		return t != ct && t || (n.x1 = e.x1, n.x2 = e.x2), t != ut && t || (n.y1 = e.y1, n.y2 = e.y2), n
	}, alignTo: function (e, t) {
		var n = this, i = n.height(), r = n.width(), o = t == ot || t == O ? ut : ct, a = o == ut ? i : r;
		if (t === M) {
			var s = e.center(), l = n.center();
			n.x1 += s.x - l.x, n.y1 += s.y - l.y
		}
		else
			n[o + 1] = t === ot || t === K ? e[o + 1] - a : e[o + 2];
		return n.x2 = n.x1 + r, n.y2 = n.y1 + i, n
	}, shrink: function (e, t) {
		var n = this;
		return n.x2 -= e, n.y2 -= t, n
	}, expand: function (e, t) {
		return this.shrink(-e, -t), this
	}, pad: function (e) {
		var n = this, i = t(e);
		return n.x1 -= i.left, n.x2 += i.right, n.y1 -= i.top, n.y2 += i.bottom, n
	}, unpad: function (e) {
		var n = this, i = t(e);
		return i.left = -i.left, i.top = -i.top, i.right = -i.right, i.bottom = -i.bottom, n.pad(i)
	}, clone: function () {
		var e = this;
		return new ht(e.x1, e.y1, e.x2, e.y2)
	}, center: function () {
		var e = this;
		return { x: e.x1 + e.width() / 2, y: e.y1 + e.height() / 2}
	}, containsPoint: function (e) {
		var t = this;
		return e.x >= t.x1 && t.x2 >= e.x && e.y >= t.y1 && t.y2 >= e.y
	}, points: function () {
		var e = this;
		return [new ft(e.x1, e.y1), new ft(e.x2, e.y1), new ft(e.x2, e.y2), new ft(e.x1, e.y2)]
	}, getHash: function () {
		var e = this;
		return [e.x1, e.y1, e.x2, e.y2].join(",")
	} }), mt = y.extend({ init: function (e, t, n, i, r) {
		var o = this;
		o.c = e, o.ir = t, o.r = n, o.startAngle = i, o.angle = r
	}, clone: function () {
		var e = this;
		return new mt(e.c, e.ir, e.r, e.startAngle, e.angle)
	}, middle: function () {
		return this.startAngle + this.angle / 2
	}, radius: function (e, t) {
		var n = this;
		return t ? n.ir = e : n.r = e, n
	}, point: function (e, t) {
		var n = this, i = e * W, r = D.cos(i), o = D.sin(i), a = t ? n.ir : n.r, s = n.c.x - r * a, l = n.c.y - o * a;
		return new ft(s, l)
	}, getBBox: function () {
		var e, t, n, i = this, r = new ht(J, J, Z, Z), o = h(i.startAngle % 360), a = h((o + i.angle) % 360), s = i.ir, l = [0, 90, 180, 270, o, a].sort(v), d = A(o, l), c = A(a, l);
		for (e = o == a ? l : c > d ? l.slice(d, c + 1) : [].concat(l.slice(0, c + 1), l.slice(d, l.length)), t = 0; e.length > t; t++)
			n = i.point(e[t]), r.wrapPoint(n), r.wrapPoint(n, s);
		return s || r.wrapPoint(i.c), r
	}, expand: function (e) {
		return this.r += e, this
	} }), gt = mt.extend({ init: function (e, t, n, i) {
		mt.fn.init.call(this, e, 0, t, n, i)
	}, expand: function (e) {
		return mt.fn.expand.call(this, e)
	}, clone: function () {
		var e = this;
		return new gt(e.c, e.r, e.startAngle, e.angle)
	}, radius: function (e) {
		return mt.fn.radius.call(this, e)
	}, point: function (e) {
		return mt.fn.point.call(this, e)
	} }), vt = y.extend({ init: function (e) {
		E(this, { height: 40, rotation: 90, radius: 10, arcAngle: 10 }, e)
	} }), bt = y.extend({ init: function (e) {
		var t = this;
		t.children = [], t.options = E({}, t.options, e)
	}, reflow: function (e) {
		var t, n, i, r = this, o = r.children;
		for (n = 0; o.length > n; n++)
			i = o[n], i.reflow(e), t = t ? t.wrap(i.box) : i.box.clone();
		r.box = t || e
	}, getViewElements: function (e) {
		var t, n, i, r = this, o = r.options, a = o.modelId, s = [], l = r.children, d = l.length;
		for (n = 0; d > n; n++)
			i = l[n], i.discoverable || (i.options = i.options || {}, i.options.modelId = a), s.push.apply(s, i.getViewElements(e));
		return r.discoverable && (t = r.getRoot(), t && (t.modelMap[a] = r)), s
	}, enableDiscovery: function () {
		var e = this, t = e.options;
		t.modelId = Ht(), e.discoverable = !0
	}, disableDiscovery: function () {
		var e, t = this, n = t.children, i = t.getRoot(), r = t.options.modelId;
		for (i && r && delete i.modelMap[r], e = 0; n.length > e; e++)
			n[e].disableDiscovery()
	}, getRoot: function () {
		var e = this.parent;
		return e ? e.getRoot() : null
	}, translateChildren: function (e, t) {
		var n, i = this, r = i.children, o = r.length;
		for (n = 0; o > n; n++)
			r[n].box.translate(e, t)
	}, append: function () {
		var e, t = this, n = arguments.length;
		for (u(t.children, arguments), e = 0; n > e; e++)
			arguments[e].parent = t
	} }), _t = bt.extend({ init: function (e) {
		var t = this;
		t.modelMap = {}, bt.fn.init.call(t, e)
	}, options: { width: j, height: V, background: dt, border: { color: N, width: 0 }, margin: t(5), zIndex: -2 }, reflow: function () {
		var e = this, t = e.options, n = e.children, i = new ht(0, 0, t.width, t.height);
		e.box = i.unpad(t.margin);
		for (var r = 0; n.length > r; r++)
			n[r].reflow(i), i = s(i, n[r].box)
	}, getViewElements: function (e) {
		var t = this, n = t.options, i = n.border || {}, r = t.box.clone().pad(n.margin).unpad(i.width), o = [e.createRect(r, { stroke: i.width ? i.color : "", strokeWidth: i.width, dashType: i.dashType, fill: n.background, fillOpacity: n.opacity, zIndex: n.zIndex })];
		return o.concat(bt.fn.getViewElements.call(t, e))
	}, getRoot: function () {
		return this
	} }), xt = bt.extend({ init: function (e) {
		bt.fn.init.call(this, e)
	}, options: { align: K, vAlign: ot, margin: {}, padding: {}, border: { color: N, width: 0 }, background: "", shrinkToFit: !1, width: 0, height: 0, visible: !0 }, reflow: function (e) {
		function n() {
			o.align(e, ct, a.align), o.align(e, ut, a.vAlign), o.paddingBox = i.clone().unpad(s).unpad(d)
		}
		var i, r, o = this, a = o.options, s = t(a.margin), l = t(a.padding), d = a.border.width;
		bt.fn.reflow.call(o, e), i = a.width && a.height ? o.box = new ht(0, 0, a.width, a.height) : o.box, a.shrinkToFit ? (n(), r = o.contentBox = o.paddingBox.clone().unpad(l)) : (r = o.contentBox = i.clone(), i.pad(l).pad(d).pad(s), n()), o.translateChildren(i.x1 - r.x1 + s.left + d + l.left, i.y1 - r.y1 + s.top + d + l.top)
	}, align: function (e, t, n) {
		var i = this, r = i.box, o = t + 1, a = t + 2, s = t === ct ? lt : $, l = r[s]();
		d(n, [K, ot]) ? (r[o] = e[o], r[a] = r[o] + l) : d(n, [it, O]) ? (r[a] = e[a], r[o] = r[a] - l) : n == M && (r[o] = e[o] + (e[s]() - l) / 2, r[a] = r[o] + l)
	}, hasBox: function () {
		var e = this.options;
		return e.border.width || e.background
	}, getViewElements: function (e, t) {
		var n = this, i = n.options, r = [];
		return i.visible ? (n.hasBox() && r.push(e.createRect(n.paddingBox, E(n.elementStyle(), t))), r.concat(bt.fn.getViewElements.call(n, e))) : []
	}, elementStyle: function () {
		var e = this, t = e.options, n = t.border || {};
		return { id: t.id, stroke: n.width ? n.color : "", strokeWidth: n.width, dashType: n.dashType, strokeOpacity: t.opacity, fill: t.background, fillOpacity: t.opacity, animation: t.animation, zIndex: t.zIndex, data: { modelId: t.modelId}}
	} }), kt = bt.extend({ init: function (e, t) {
		var n = this;
		bt.fn.init.call(n, t), n.content = e, n.reflow(new ht)
	}, options: { font: L, color: N, align: K, vAlign: "" }, reflow: function (e) {
		var t, n, r = this, o = r.options;
		t = o.size = i(r.content, { font: o.font }, o.rotation), r.baseline = t.baseline, o.align == K ? r.box = new ht(e.x1, e.y1, e.x1 + t.width, e.y1 + t.height) : o.align == it ? r.box = new ht(e.x2 - t.width, e.y1, e.x2, e.y1 + t.height) : o.align == M && (n = (e.width() - t.width) / 2, r.box = new ht(h(e.x1 + n, H), e.y1, h(e.x2 - n, H), e.y1 + t.height)), o.vAlign == M ? (n = (e.height() - t.height) / 2, r.box = new ht(r.box.x1, e.y1 + n, r.box.x2, e.y2 - n)) : o.vAlign == O ? r.box = new ht(r.box.x1, e.y2 - t.height, r.box.x2, e.y2) : o.vAlign == ot && (r.box = new ht(r.box.x1, e.y1, r.box.x2, e.y1 + t.height))
	}, getViewElements: function (e) {
		var t = this, n = t.options;
		return bt.fn.getViewElements.call(this, e), [e.createText(t.content, E({}, n, { x: t.box.x1, y: t.box.y1, baseline: t.baseline, data: { modelId: n.modelId} }))]
	} }), wt = xt.extend({ init: function (e, t) {
		var n, i = this;
		xt.fn.init.call(i, t), t = i.options, n = new kt(e, E({}, t, { align: K, vAlign: ot })), i.append(n), i.hasBox() && (n.options.id = Ht()), i.reflow(new ht)
	} }), yt = bt.extend({ init: function (e) {
		var t = this;
		bt.fn.init.call(t, e), e = t.options, t.append(new wt(e.text, E({}, e, { vAlign: e.position })))
	}, options: { color: N, position: ot, align: M, margin: t(5), padding: t(5) }, reflow: function (e) {
		var t = this;
		bt.fn.reflow.call(t, e), t.box.snapTo(e, ct)
	} });
	yt.buildTitle = function (e, t, n) {
		var i;
		return "string" == typeof e && (e = { text: e }), e = E({ visible: !0 }, n, e), e && e.visible && e.text && (i = new yt(e), t.append(i)), i
	};
	var Ct = wt.extend({ init: function (e, t, n, i) {
		var r = this, o = e;
		i.template ? (r.template = C(i.template), o = r.template({ value: e, dataItem: n })) : i.format && (o = r.formatValue(e, i)), r.text = o, r.value = e, r.index = t, r.dataItem = n, wt.fn.init.call(r, o, E({ id: Ht() }, i)), r.enableDiscovery()
	}, formatValue: function (e, t) {
		return _(t.format, e)
	}, click: function (t, n) {
		var i = this;
		t.trigger(z, { element: e(n.target), value: i.value, text: i.text, index: i.index, dataItem: i.dataItem, axis: i.parent.options })
	} }), Tt = bt.extend({
		init: function (e) {
			var t = this;
			bt.fn.init.call(t, e), t.options.visible || (t.options = E({}, t.options, { labels: { visible: !1 }, line: { visible: !1 }, margin: 0, majorTickSize: 0, minorTickSize: 0 })), t.options.minorTicks = E({}, { color: t.options.line.color, width: t.options.line.width, visible: t.options.minorTickType != et }, t.options.minorTicks, { size: t.options.minorTickSize, align: t.options.minorTickType }), t.options.majorTicks = E({}, { color: t.options.line.color, width: t.options.line.width, visible: t.options.majorTickType != et }, t.options.majorTicks, { size: t.options.majorTickSize, align: t.options.majorTickType }), t.createLabels(), t.createTitle()
		}, options: { labels: { visible: !0, rotation: 0, mirror: !1, step: 1, skip: 0 }, line: { width: 1, color: N, visible: !0, zIndex: 2 }, title: { visible: !0, position: M }, majorTicks: { align: tt, size: 4 }, minorTicks: { align: tt, size: 3 }, axisCrossingValue: 0, majorTickType: tt, minorTickType: et, minorGridLines: { visible: !1, width: 1, color: N }, margin: 5, visible: !0, reverse: !1, justified: !0, _alignLines: !0 }, createLabels: function () {
			var e = this, t = e.options, n = t.vertical ? it : M, i = E({}, t.labels, { align: n, zIndex: t.zIndex, modelId: t.modelId }), r = i.step;
			if (e.labels = [], i.visible) {
				var o, a, s = e.labelsCount();
				for (a = i.skip; s > a; a += r)
					o = e.createAxisLabel(a, i), e.append(o), e.labels.push(o)
			}
		}, lineBox: function () {
			var e = this, t = e.options, n = e.box, i = t.vertical, r = e.labels, o = i ? $ : lt, a = t.justified, s = t.labels.mirror, l = s ? n.x1 : n.x2, d = s ? n.y2 : n.y1, u = 0, p = t.line.width;
			return a && r.length > 1 && (u = r[0].box[o]() / 2, p = c(r).box[o]() / 2), i ? new ht(l, n.y1 + u, l, n.y2 - p) : new ht(n.x1 + u, d, n.x2 - p, d)
		}, createTitle: function () {
			var e, t = this, n = t.options, i = E({ rotation: n.vertical ? -90 : 0, text: "", zIndex: 1 }, n.title);
			i.visible && i.text && (e = new wt(i.text, i), t.append(e), t.title = e)
		}, renderTicks: function (e) {
			function t(t, a, u, p, f) {
				var h, m = f / a, g = t.length;
				if (p)
					for (h = 0; g > h; h++)
						0 !== h % m && (n = c ? d.x2 : d.x2 - u.size, i = c ? d.y1 - u.size : d.y1, r = t[h], o = { strokeWidth: u.width, stroke: u.color, align: l._alignLines }, l.vertical ? s.push(e.createLine(n, r, n + u.size, r, o)) : s.push(e.createLine(r, i, r, i + u.size, o)))
			}
			var n, i, r, o, a = this, s = [], l = a.options, d = a.lineBox(), c = l.labels.mirror;
			return t(a.getMajorTickPositions(), l.majorUnit, l.majorTicks, l.majorTicks.visible), t(a.getMinorTickPositions(), l.minorUnit, l.minorTicks, l.minorTicks.visible, l.majorTicks.visible ? l.majorUnit : 0), s
		}, getViewElements: function (e) {
			var t, n = this, i = n.options, r = i.line, o = n.lineBox(), a = bt.fn.getViewElements.call(n, e);
			return r.width > 0 && r.visible && (t = { strokeWidth: r.width, stroke: r.color, dashType: r.dashType, zIndex: r.zIndex, align: i._alignLines }, a.push(e.createLine(o.x1, o.y1, o.x2, o.y2, t)), u(a, n.renderTicks(e))), u(a, n.renderPlotBands(e)), a
		}, getActualTickSize: function () {
			var e = this, t = e.options, n = 0;
			return t.majorTicks.visible && t.minorTicks.visible ? n = D.max(t.majorTicks.size, t.minorTicks.size) : t.majorTicks.visible ? n = t.majorTicks.size : t.minorTicks.visible && (n = t.minorTicks.size), n
		}, renderPlotBands: function (e) {
			var t, n, i, r, o = this, a = o.options, s = a.plotBands || [], l = a.vertical, d = [], c = o.plotArea;
			return s.length && (d = T(s, function (a) {
				return i = g(a.from) ? a.from : Z, r = g(a.to) ? a.to : J, l ? (t = c.axisX.lineBox(), n = o.getSlot(a.from, a.to)) : (t = o.getSlot(a.from, a.to), n = c.axisY.lineBox()), e.createRect(new ht(t.x1, n.y1, t.x2, n.y2), { fill: a.color, fillOpacity: a.opacity, zIndex: -1 })
			})), d
		}, renderGridLines: function (e, t) {
			var n = this, i = n.plotArea.options.modelId, r = n.options, o = r.vertical, a = t.lineBox(), s = a[o ? "x1" : "y1"], l = a[o ? "x2" : "y2"], c = n.getMajorTickPositions(), u = [], p = function (e, t) {
				return { pos: e, options: t}
			};
			return r.majorGridLines.visible && (u = T(c, function (e) {
				return p(e, r.majorGridLines)
			})), r.minorGridLines.visible && (u = u.concat(T(n.getMinorTickPositions(), function (e) {
				return r.majorGridLines.visible ? d(e, c) ? undefined : p(e, r.minorGridLines) : p(e, r.minorGridLines)
			}))), T(u, function (n) {
				var r = { data: { modelId: i }, strokeWidth: n.options.width, stroke: n.options.color, dashType: n.options.dashType }, a = h(n.pos), d = t.lineBox();
				if (o) {
					if (!t.options.line.visible || d.y1 !== a)
						return e.createLine(s, a, l, a, r)
				}
				else if (!t.options.line.visible || d.x1 !== a)
					return e.createLine(a, s, a, l, r)
			})
		}, reflow: function (e) {
			var t, n, i = this, r = i.options, o = r.vertical, a = i.labels, s = a.length, l = i.getActualTickSize() + r.margin, d = 0, c = 0, u = i.title;
			for (n = 0; s > n; n++)
				t = a[n], d = D.max(d, t.box.height()), c = D.max(c, t.box.width());
			u && (o ? c += u.box.width() : d += u.box.height()), i.box = o ? new ht(e.x1, e.y1, e.x1 + c + l, e.y2) : new ht(e.x1, e.y1, e.x2, e.y1 + d + l), i.arrangeTitle(), i.arrangeLabels(c, d)
		}, arrangeLabels: function () {
			var e, t, n, i = this, r = i.options, o = r.labels, a = i.labels, s = !r.justified, l = r.vertical, d = i.lineBox(), c = r.labels.mirror, u = i.getMajorTickPositions(), p = i.getActualTickSize() + r.margin;
			for (n = 0; a.length > n; n++) {
				var f, h, m, g, v = a[n], b = o.skip + o.step * n, _ = l ? v.box.height() : v.box.width(), x = u[b] - _ / 2;
				l ? (s && (f = u[b], h = u[b + 1], m = f + (h - f) / 2, x = m - _ / 2), g = d.x2, c ? g += p : g -= p + v.box.width(), e = v.box.move(g, x)) : (s ? (f = u[b], h = u[b + 1]) : (f = x, h = x + _), t = d.y1, c ? t -= p + v.box.height() : t += p, e = new ht(f, t, h, t + v.box.height())), v.reflow(e)
			}
		}, arrangeTitle: function () {
			var e = this, t = e.options, n = t.labels.mirror, i = t.vertical, r = e.title;
			r && (i ? (r.options.align = n ? it : K, r.options.vAlign = r.options.position) : (r.options.align = r.options.position, r.options.vAlign = n ? ot : O), r.reflow(e.box))
		}, alignTo: function (e) {
			var t = this, n = e.lineBox(), i = t.options.vertical, r = i ? ut : ct;
			t.box.snapTo(n, r), i ? t.box.shrink(0, t.lineBox().height() - n.height()) : t.box.shrink(t.lineBox().width() - n.width(), 0), t.box[r + 1] -= t.lineBox()[r + 1] - n[r + 1], t.box[r + 2] -= t.lineBox()[r + 2] - n[r + 2]
		}
	}), St = Tt.extend({ init: function (e, t, n) {
		var i = this, r = i.initDefaults(e, t, n);
		Tt.fn.init.call(i, r)
	}, options: { type: "numeric", min: 0, max: 1, vertical: !0, majorGridLines: { visible: !0, width: 1, color: N }, zIndex: 1 }, initDefaults: function (e, t, n) {
		var i, o = this, a = n.narrowRange, s = o.autoAxisMin(e, t, a), l = o.autoAxisMax(e, t, a), d = r(s, l), c = { majorUnit: d };
		return 0 > s && (s -= d), l > 0 && (l += d), c.min = f(s, d), c.max = p(l, d), n && (i = g(n.min) || g(n.max), i && n.min === n.max && (n.min > 0 ? n.min = 0 : n.max = 1), n.majorUnit ? (c.min = f(c.min, n.majorUnit), c.max = p(c.max, n.majorUnit)) : i && (n = E(c, n), c.majorUnit = r(n.min, n.max))), c.minorUnit = (n.majorUnit || c.majorUnit) / 5, E(c, n)
	}, range: function () {
		var e = this.options;
		return { min: e.min, max: e.max}
	}, autoAxisMax: function (e, t, n) {
		var i, r;
		if (!e && !t)
			return 1;
		if (0 >= e && 0 >= t) {
			if (t = e == t ? 0 : t, r = D.abs((t - e) / t), !n && r > pt)
				return 0;
			i = D.min(0, t - (e - t) / 2)
		}
		else
			e = e == t ? 0 : e, i = t;
		return i
	}, autoAxisMin: function (e, t, n) {
		var i, r;
		if (!e && !t)
			return 0;
		if (e >= 0 && t >= 0) {
			if (e = e == t ? 0 : e, r = (t - e) / t, !n && r > pt)
				return 0;
			i = D.max(0, e - (t - e) / 2)
		}
		else
			t = e == t ? 0 : t, i = e;
		return i
	}, getDivisions: function (e) {
		var t = this.options, n = t.max - t.min;
		return D.floor(h(n / e, H)) + 1
	}, getTickPositions: function (e) {
		var t, n = this, i = n.options, r = i.vertical, o = i.reverse, a = n.lineBox(), s = r ? a.height() : a.width(), l = i.max - i.min, d = s / l, c = e * d, u = n.getDivisions(e), p = (r ? -1 : 1) * (o ? -1 : 1), f = 1 === p ? 1 : 2, m = a[(r ? ut : ct) + f], g = [];
		for (t = 0; u > t; t++)
			g.push(h(m, H)), m += c * p;
		return g
	}, getMajorTickPositions: function () {
		var e = this;
		return e.getTickPositions(e.options.majorUnit)
	}, getMinorTickPositions: function () {
		var e = this;
		return e.getTickPositions(e.options.minorUnit)
	}, getSlot: function (e, t) {
		var n, i, r = this, o = r.options, a = o.reverse, s = o.vertical, l = s ? ut : ct, d = r.lineBox(), c = d[l + (a ? 2 : 1)], u = s ? d.height() : d.width(), p = a ? -1 : 1, f = p * (u / (o.max - o.min)), h = new ht(d.x1, d.y1, d.x1, d.y1);
		return g(e) || (e = t || 0), g(t) || (t = e || 0), e = D.max(D.min(e, o.max), o.min), t = D.max(D.min(t, o.max), o.min), s ? (n = o.max - D.max(e, t), i = o.max - D.min(e, t)) : (n = D.min(e, t) - o.min, i = D.max(e, t) - o.min), h[l + 1] = c + f * (a ? i : n), h[l + 2] = c + f * (a ? n : i), h
	}, getValue: function (e) {
		var t, n = this, i = n.options, r = i.reverse, o = i.vertical, a = 1 * i.max, s = 1 * i.min, l = o ? ut : ct, d = n.lineBox(), c = d[l + (r ? 2 : 1)], u = o ? d.height() : d.width(), p = r ? -1 : 1, f = p * (e[l] - c), m = (a - s) / u, g = f * m;
		return 0 > f || f > u ? null : (t = o ? a - g : s + g, h(t, U))
	}, translateRange: function (e) {
		var t = this, n = t.options, i = t.lineBox(), r = n.vertical, o = n.reverse, a = r ? i.height() : i.width(), s = n.max - n.min, l = a / s, d = h(e / l, U);
		return !r && !o || r && o || (d = -d), { min: n.min + d, max: n.max + d}
	}, scaleRange: function (e) {
		var t = this, n = t.options, i = -e * n.majorUnit;
		return { min: n.min - i, max: n.max + i}
	}, labelsCount: function () {
		return this.getDivisions(this.options.majorUnit)
	}, createAxisLabel: function (e, t) {
		var n = this, i = n.options, r = h(i.min + e * i.majorUnit, U);
		return new Ct(r, e, null, t)
	} }), At = y.extend({ init: function (e) {
		var t = this;
		t.children = [], t.options = E({}, t.options, e)
	}, render: function () {
		return this.template(this)
	}, renderContent: function () {
		var e, t = this, n = "", i = t.sortChildren(), r = i.length;
		for (e = 0; r > e; e++)
			n += i[e].render();
		return n
	}, sortChildren: function () {
		var e, t, n = this, i = n.children;
		for (t = 0, e = i.length; e > t; t++)
			i[t]._childIndex = t;
		return i.slice(0).sort(n.compareChildren)
	}, refresh: e.noop, compareChildren: function (e, t) {
		var n = e.options.zIndex || 0, i = t.options.zIndex || 0;
		return n !== i ? n - i : e._childIndex - t._childIndex
	}, renderAttr: function (e, t) {
		return g(t) ? " " + e + "='" + t + "' " : ""
	}, renderDataAttributes: function () {
		var e, t, n = this, i = n.options.data, r = "";
		for (e in i)
			t = "data-" + e.replace(st, "-$1").toLowerCase(), r += n.renderAttr(t, i[e]);
		return r
	} }), Dt = At.extend({ init: function (e) {
		var t = this;
		At.fn.init.call(t, e), t.definitions = {}, t.decorators = [], t.animations = []
	}, renderDefinitions: function () {
		var e, t = this.definitions, n = "";
		for (e in t)
			t.hasOwnProperty(e) && (n += t[e].render());
		return n
	}, decorate: function (e) {
		var t, n, i = this.decorators, r = i.length;
		for (t = 0; r > t; t++)
			n = i[t], this._decorateChildren(n, e), e = n.decorate.call(n, e);
		return e
	}, _decorateChildren: function (e, t) {
		var n, i = this, r = t.children, o = r.length;
		for (n = 0; o > n; n++)
			i._decorateChildren(e, r[n]), r[n] = e.decorate.call(e, r[n])
	}, setupAnimations: function () {
		var e, t = this.animations, n = t.length;
		for (e = 0; n > e; e++)
			t[e].setup()
	}, playAnimations: function () {
		for (var e = this.animations; e.length > 0;)
			e.shift().play()
	}, buildGradient: function (e) {
		var t, n, i, r = this, a = r._gradientCache;
		return a || (a = r._gradientCache = []), e && (t = o(e), n = a[t], i = w.Gradients[e.gradient], !n && i && (n = E({ id: Ht() }, i, e), a[t] = n)), n
	} });
	w.Gradients = { glass: { type: X, rotation: 0, stops: [{ offset: 0, color: dt, opacity: 0 }, { offset: .25, color: dt, opacity: .3 }, { offset: 1, color: dt, opacity: 0}] }, sharpBevel: { type: nt, stops: [{ offset: 0, color: dt, opacity: .55 }, { offset: .65, color: dt, opacity: 0 }, { offset: .95, color: dt, opacity: .25}] }, roundedBevel: { type: nt, stops: [{ offset: .33, color: dt, opacity: .06 }, { offset: .83, color: dt, opacity: .2 }, { offset: .95, color: dt, opacity: 0}] }, roundedGlass: { type: nt, supportVML: !1, stops: [{ offset: 0, color: dt, opacity: 0 }, { offset: .5, color: dt, opacity: .3 }, { offset: .99, color: dt, opacity: 0}] }, sharpGlass: { type: nt, supportVML: !1, stops: [{ offset: 0, color: dt, opacity: .2 }, { offset: .15, color: dt, opacity: .15 }, { offset: .17, color: dt, opacity: .35 }, { offset: .85, color: dt, opacity: .05 }, { offset: .87, color: dt, opacity: .15 }, { offset: .99, color: dt, opacity: 0}]} };
	var Et = y.extend({ init: function (e, t) {
		var n = this;
		n.options = E({}, n.options, t), n.element = e
	}, options: { duration: Q, easing: rt }, play: function () {
		var t, n, i, r, o = this, a = o.options, s = o.element, l = s.options.id, d = a.delay || 0, c = +new Date + d, u = a.duration, p = c + u, f = e.easing[a.easing];
		setTimeout(function () {
			var e = function () {
				o._stopped || (t = +new Date, n = D.min(t - c, u), i = n / u, r = f(i, n, 0, 1, u), o.step(r), s.refresh(x.getElementById(l)), p > t ? Bt(e) : o.destroy())
			};
			e()
		}, d)
	}, abort: function () {
		this._stopped = !0, this.destroy()
	}, destroy: S, setup: S, step: S }), Ft = Et.extend({ options: { duration: 200, easing: X }, setup: function () {
		var e = this, t = e.element.options;
		e.targetFillOpacity = t.fillOpacity, e.targetStrokeOpacity = t.strokeOpacity, t.fillOpacity = t.strokeOpacity = 0
	}, step: function (e) {
		var t = this, n = t.element.options;
		n.fillOpacity = e * t.targetFillOpacity, n.strokeOpacity = e * t.targetStrokeOpacity
	} }), It = Et.extend({ options: { size: 0, easing: X }, setup: function () {
		var e = this.element.points;
		e[1].x = e[2].x = e[0].x
	}, step: function (e) {
		var t = this.options, n = m(0, t.size, e), i = this.element.points;
		i[1].x = i[2].x = i[0].x + n
	}, destroy: function () {
		this.element.destroy()
	} }), Pt = Et.extend({ options: { easing: X, duration: 900 }, setup: function () {
		var e, t, n = this, i = n.element, r = i.options, o = n.options, a = o.center;
		r.rotation && (e = o.startAngle, t = r.rotation[0], o.duration = D.max(1e3 * (D.abs(e - t) / o.speed), 1), n.endState = t, r.rotation = [e, a.x, a.y])
	}, step: function (e) {
		var t = this, n = t.element;
		n.options.rotation && (n.options.rotation[0] = m(t.options.startAngle, t.endState, e))
	} }), zt = Et.extend({ options: { easing: rt }, setup: function () {
		var e, t = this, n = t.element, i = n.points, r = n.options, o = r.vertical ? ut : ct, a = r.stackBase, s = r.aboveAxis, l = t.endState = { top: i[0].y, right: i[1].x, bottom: i[3].y, left: i[0].x };
		e = o === ut ? g(a) ? a : l[s ? O : ot] : g(a) ? a : l[s ? K : it], t.startPosition = e, b(i, o, e)
	}, step: function (e) {
		var t = this, n = t.startPosition, i = t.endState, r = t.element, o = r.points;
		r.options.vertical ? (o[0].y = o[1].y = m(n, i.top, e), o[2].y = o[3].y = m(n, i.bottom, e)) : (o[0].x = o[3].x = m(n, i.left, e), o[1].x = o[2].x = m(n, i.right, e))
	} }), Rt = Et.extend({ options: { easing: rt, duration: 1e3 }, setup: function () {
		var e, t, n, i = this, r = i.element, o = r.points, a = r.options.animation, s = a.vertical, l = a.reverse, d = i.axis = s ? "y" : "x", c = i.options.endPosition, u = i.initialState = { top: o[0].y, right: o[1].x, bottom: o[3].y, left: o[0].x }, p = !g(i.options.endPosition);
		s ? (n = l ? "y2" : "y1", e = u[p && !l ? O : ot], t = p ? u[l ? O : ot] : c[n]) : (n = l ? "x1" : "x2", e = u[p && !l ? K : it], t = p ? u[l ? K : it] : c[n]), i.start = e, i.end = t, p ? b(o, d, i.start) : a.speed && (i.options.duration = D.max(1e3 * (D.abs(i.start - i.end) / a.speed), 1))
	}, step: function (e) {
		var t = this, n = t.start, i = t.end, r = t.element, o = r.points, a = t.axis;
		r.options.animation.vertical ? o[0][a] = o[1][a] = m(n, i, e) : o[1][a] = o[2][a] = m(n, i, e)
	} }), Nt = Et.extend({ options: { easing: rt, duration: 1e3 }, setup: function () {
		var e, t, n, i = this, r = i.element, o = r.points, a = r.options.animation, s = a.vertical, l = a.reverse, d = s ? "y" : "x", c = d + (l ? "1" : "2"), u = d + (l ? "2" : "1"), p = a.startPosition[s ? c : u], f = a.size / 2, h = o.length, m = !g(i.options.endPosition), v = f;
		for (i.axis = d, i.endPositions = [], i.startPositions = [], m || (p = o[1][d], t = i.options.endPosition[s ? u : c], a.speed && (i.options.duration = D.max(1e3 * (D.abs(p - t) / a.speed), 1))), n = 0; h > n; n++)
			e = E({}, o[n]), m ? (i.endPositions[n] = e[d], o[n][d] = p - v) : i.endPositions[n] = t - v, i.startPositions[n] = o[n][d], v -= f
	}, step: function (e) {
		var t, n = this, i = n.startPositions, r = n.endPositions, o = n.element, a = o.points, s = n.axis, l = a.length;
		for (t = 0; l > t; t++)
			a[t][s] = m(i[t], r[t], e)
	} }), Ot = n(q, Ft), Mt = function (e) {
		var t, n, i, r, o, a = this, s = Mt.formats;
		if (1 === arguments.length)
			for (e = a.resolveColor(e), r = 0; s.length > r; r++)
				t = s[r].re, n = s[r].process, i = t.exec(e), i && (o = n(i), a.r = o[0], a.g = o[1], a.b = o[2]);
		else
			a.r = arguments[0], a.g = arguments[1], a.b = arguments[2];
		a.r = a.normalizeByte(a.r), a.g = a.normalizeByte(a.g), a.b = a.normalizeByte(a.b)
	};
	Mt.prototype = { toHex: function () {
		var e = this, t = e.padDigit, n = e.r.toString(16), i = e.g.toString(16), r = e.b.toString(16);
		return "#" + t(n) + t(i) + t(r)
	}, resolveColor: function (e) {
		return e = e || N, "#" == e.charAt(0) && (e = e.substr(1, 6)), e = e.replace(/ /g, ""), e = e.toLowerCase(), e = Mt.namedColors[e] || e
	}, normalizeByte: function (e) {
		return 0 > e || isNaN(e) ? 0 : e > 255 ? 255 : e
	}, padDigit: function (e) {
		return 1 === e.length ? "0" + e : e
	}, brightness: function (e) {
		var t = this, n = D.round;
		return t.r = n(t.normalizeByte(t.r * e)), t.g = n(t.normalizeByte(t.g * e)), t.b = n(t.normalizeByte(t.b * e)), t
	} }, Mt.formats = [{ re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, process: function (e) {
		return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)]
	} }, { re: /^(\w{2})(\w{2})(\w{2})$/, process: function (e) {
		return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
	} }, { re: /^(\w{1})(\w{1})(\w{1})$/, process: function (e) {
		return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
	} }], Mt.namedColors = { aqua: "00ffff", azure: "f0ffff", beige: "f5f5dc", black: "000000", blue: "0000ff", brown: "a52a2a", coral: "ff7f50", cyan: "00ffff", darkblue: "00008b", darkcyan: "008b8b", darkgray: "a9a9a9", darkgreen: "006400", darkorange: "ff8c00", darkred: "8b0000", dimgray: "696969", fuchsia: "ff00ff", gold: "ffd700", goldenrod: "daa520", gray: "808080", green: "008000", greenyellow: "adff2f", indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c", lightblue: "add8e6", lightgrey: "d3d3d3", lightgreen: "90ee90", lightpink: "ffb6c1", lightyellow: "ffffe0", lime: "00ff00", limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff", maroon: "800000", mediumblue: "0000cd", navy: "000080", olive: "808000", orange: "ffa500", orangered: "ff4500", orchid: "da70d6", pink: "ffc0cb", plum: "dda0dd", purple: "800080", red: "ff0000", royalblue: "4169e1", salmon: "fa8072", silver: "c0c0c0", skyblue: "87ceeb", slateblue: "6a5acd", slategray: "708090", snow: "fffafa", steelblue: "4682b4", tan: "d2b48c", teal: "008080", tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee", wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5", yellow: "ffff00", yellowgreen: "9acd32" }, i.cache = {}, i.baselineMarker = e("<div class='" + I + "baseline-marker' " + "style='display: inline-block; vertical-align: baseline;" + "width: " + R + "px; height: " + R + "px;" + "overflow: hidden;' />")[0];
	var Ht = function () {
		var e = 1;
		return function () {
			return e = (e >>> 1 ^ 3489660929 & -(1 & e)) >>> 0, Y + e.toString(16)
		}
	}(), Bt = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
		setTimeout(e, P)
	};
	E(k.dataviz, { init: function (e) {
		k.init(e, k.dataviz.ui)
	}, ui: { roles: {}, themes: {}, views: [], defaultView: function () {
		var e, t = w.ui.views, n = t.length;
		for (e = 0; n > e; e++)
			if (t[e].available())
				return t[e];
		k.logToConsole("Warning: KendoUI DataViz cannot render. Possible causes:\n- The browser does not support SVG or VML. User agent: " + navigator.userAgent + "\n" + "- The kendo.dataviz.svg.js or kendo.dataviz.vml.js scripts are not loaded")
	}, registerView: function (e) {
		var t = w.ui.views[0];
		!t || e.preference > t.preference ? w.ui.views.unshift(e) : w.ui.views.push(e)
	}, plugin: function (e) {
		k.ui.plugin(e, w.ui)
	} }, AXIS_LABEL_CLICK: z, COORD_PRECISION: H, DEFAULT_PRECISION: U, DEFAULT_WIDTH: j, DEFAULT_HEIGHT: V, DEFAULT_FONT: L, INITIAL_ANIMATION_DURATION: Q, CLIP: B, Axis: Tt, AxisLabel: Ct, Box2D: ht, BoxElement: xt, ChartElement: bt, Color: Mt, ElementAnimation: Et, ExpandAnimation: It, ArrowAnimation: Nt, BarAnimation: zt, BarIndicatorAnimatin: Rt, FadeAnimation: Ft, FadeAnimationDecorator: Ot, NumericAxis: St, Point2D: ft, Ring: mt, Pin: vt, RootElement: _t, RotationAnimation: Pt, Sector: gt, Text: kt, TextBox: wt, Title: yt, ViewBase: Dt, ViewElement: At, animationDecorator: n, append: u, autoFormat: _, autoMajorUnit: r, boxDiff: s, defined: g, getSpacing: t, inArray: d, interpolateValue: m, last: c, measureText: i, rotatePoint: a, round: h, ceil: p, floor: f, supportsSVG: l, renderTemplate: F, uniqueId: Ht })
}(window.kendo.jQuery), function () {
	var e = window.kendo, t = e.dataviz.ui, n = e.deepExtend, i = 1.5, r = .4, o = "#000", a = "Arial,Helvetica,sans-serif", s = "11px " + a, l = "12px " + a, d = "16px " + a, c = "#fff", u = { title: { font: d }, legend: { labels: { font: l} }, seriesDefaults: { labels: { font: s }, donut: { margin: 1 }, line: { width: 4 }, area: { line: { opacity: 1, width: 0} }, candlestick: { line: { width: 1, color: o }, border: { width: 1, _brightness: .8 }, gap: 1, spacing: .3, downColor: c, aggregate: { open: "max", high: "max", low: "min", close: "max" }, highlight: { line: { width: 2 }, border: { width: 2, opacity: 1}} }, ohlc: { line: { width: 1 }, gap: 1, spacing: .3, aggregate: { open: "max", high: "max", low: "min", close: "max" }, highlight: { line: { width: 3, opacity: 1}} }, bubble: { opacity: .6, border: { width: 0 }, labels: { background: "transparent"} }, bar: { gap: i, spacing: r }, column: { gap: i, spacing: r} }, categoryAxis: { majorGridLines: { visible: !0} }, axisDefaults: { labels: { font: l }, title: { font: d, margin: 5} }, tooltip: { font: l }, navigator: { pane: { height: 90, margin: { top: 10}}} }, p = { scale: { labels: { font: l}} }, f = t.themes, h = t.registerTheme = function (e, t) {
		var i = {};
		i.chart = n({}, u, t.chart), i.gauge = n({}, p, t.gauge);
		var r = i.chart.seriesDefaults;
		r.verticalLine = n({}, r.line), r.verticalArea = n({}, r.area), f[e] = i
	};
	h("black", { chart: { title: { color: c }, legend: { labels: { color: c} }, seriesDefaults: { labels: { color: c }, pie: { overlay: { gradient: "sharpBevel"} }, donut: { overlay: { gradient: "sharpGlass"} }, line: { markers: { background: "#3d3d3d"} }, scatter: { markers: { background: "#3d3d3d"} }, scatterLine: { markers: { background: "#3d3d3d"} }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#555", line: { color: c }, border: { _brightness: 1.5, opacity: 1 }, highlight: { border: { color: c, opacity: .2}} }, ohlc: { line: { color: c}} }, chartArea: { background: "#3d3d3d" }, seriesColors: ["#0081da", "#3aafff", "#99c900", "#ffeb3d", "#b20753", "#ff4195"], axisDefaults: { line: { color: "#8e8e8e" }, labels: { color: c }, majorGridLines: { color: "#545454" }, minorGridLines: { color: "#454545" }, title: { color: c} }, tooltip: { background: "#3d3d3d", color: c, opacity: .8} }, gauge: { pointer: { color: "#0070e4" }, scale: { rangePlaceholderColor: "#1d1d1d", labels: { color: c }, minorTicks: { color: c }, majorTicks: { color: c }, line: { color: c}}} }), h("blueopal", { chart: { title: { color: "#293135" }, legend: { labels: { color: "#293135"} }, seriesDefaults: { labels: { color: o, background: c, opacity: .5 }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#c4d0d5", line: { color: "#9aabb2"}} }, seriesColors: ["#0069a5", "#0098ee", "#7bd2f6", "#ffb800", "#ff8517", "#e34a00"], axisDefaults: { line: { color: "#9aabb2" }, labels: { color: "#293135" }, majorGridLines: { color: "#c4d0d5" }, minorGridLines: { color: "#edf1f2" }, title: { color: "#293135"} }, tooltip: { background: c, color: o, opacity: .8} }, gauge: { pointer: { color: "#005c83" }, scale: { rangePlaceholderColor: "#daecf4", labels: { color: "#293135" }, minorTicks: { color: "#293135" }, majorTicks: { color: "#293135" }, line: { color: "#293135"}}} }), h("highcontrast", { chart: { title: { color: "#ffffff" }, legend: { labels: { color: "#ffffff"} }, seriesDefaults: { labels: { color: "#ffffff" }, pie: { overlay: { gradient: "sharpGlass"} }, donut: { overlay: { gradient: "sharpGlass"} }, line: { markers: { background: "#2c232b"} }, scatter: { markers: { background: "#2c232b"} }, scatterLine: { markers: { background: "#2c232b"} }, area: { opacity: .5, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#664e62", line: { color: "#ffffff" }, border: { _brightness: 1.5, opacity: 1 }, highlight: { border: { color: "#ffffff", opacity: 1}} }, ohlc: { line: { color: "#ffffff"}} }, chartArea: { background: "#2c232b" }, seriesColors: ["#a7008f", "#ffb800", "#3aafff", "#99c900", "#b20753", "#ff4195"], axisDefaults: { line: { color: "#ffffff" }, labels: { color: "#ffffff" }, majorGridLines: { color: "#664e62" }, minorGridLines: { color: "#4f394b" }, title: { color: "#ffffff"} }, tooltip: { background: "#1b141a", color: "#ffffff", opacity: 1} }, gauge: { pointer: { color: "#a7008f" }, scale: { rangePlaceholderColor: "#2c232b", labels: { color: "#ffffff" }, minorTicks: { color: "#2c232b" }, majorTicks: { color: "#664e62" }, line: { color: "#ffffff"}}} }), h("default", { chart: { title: { color: "#8e8e8e" }, legend: { labels: { color: "#232323"} }, seriesDefaults: { labels: { color: o, background: c, opacity: .5 }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#dedede", line: { color: "#8d8d8d"}} }, seriesColors: ["#ff6800", "#a0a700", "#ff8d00", "#678900", "#ffb53c", "#396000"], axisDefaults: { line: { color: "#8e8e8e" }, labels: { color: "#232323" }, minorGridLines: { color: "#f0f0f0" }, majorGridLines: { color: "#dfdfdf" }, title: { color: "#232323"} }, tooltip: { background: c, color: o, opacity: .8} }, gauge: { pointer: { color: "#ea7001" }, scale: { rangePlaceholderColor: "#dedede", labels: { color: "#2e2e2e" }, minorTicks: { color: "#2e2e2e" }, majorTicks: { color: "#2e2e2e" }, line: { color: "#2e2e2e"}}} }), h("silver", { chart: { title: { color: "#4e5968" }, legend: { labels: { color: "#4e5968"} }, seriesDefaults: { labels: { color: "#293135", background: "#eaeaec", opacity: .5 }, line: { markers: { background: "#eaeaec"} }, scatter: { markers: { background: "#eaeaec"} }, scatterLine: { markers: { background: "#eaeaec"} }, pie: { connectors: { color: "#A6B1C0"} }, donut: { connectors: { color: "#A6B1C0"} }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#a6afbe"} }, chartArea: { background: "#eaeaec" }, seriesColors: ["#007bc3", "#76b800", "#ffae00", "#ef4c00", "#a419b7", "#430B62"], axisDefaults: { line: { color: "#a6b1c0" }, labels: { color: "#4e5968" }, majorGridLines: { color: "#dcdcdf" }, minorGridLines: { color: "#eeeeef" }, title: { color: "#4e5968"} }, tooltip: { background: c, color: "#4e5968", opacity: .8} }, gauge: { pointer: { color: "#0879c0" }, scale: { rangePlaceholderColor: "#f3f3f4", labels: { color: "#515967" }, minorTicks: { color: "#515967" }, majorTicks: { color: "#515967" }, line: { color: "#515967"}}} }), h("metro", { chart: { title: { color: "#777777" }, legend: { labels: { color: "#777777"} }, seriesDefaults: { labels: { color: o }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#c7c7c7", line: { color: "#787878"} }, overlay: { gradient: "none" }, border: { _brightness: 1} }, seriesColors: ["#8ebc00", "#309b46", "#25a0da", "#ff6900", "#e61e26", "#d8e404", "#16aba9", "#7e51a1", "#313131", "#ed1691"], axisDefaults: { line: { color: "#c7c7c7" }, labels: { color: "#777777" }, minorGridLines: { color: "#c7c7c7" }, majorGridLines: { color: "#c7c7c7" }, title: { color: "#777777"} }, tooltip: { background: c, color: o} }, gauge: { pointer: { color: "#8ebc00" }, scale: { rangePlaceholderColor: "#e6e6e6", labels: { color: "#777" }, minorTicks: { color: "#777" }, majorTicks: { color: "#777" }, line: { color: "#777"}}} }), h("metroblack", { chart: { title: { color: "#ffffff" }, legend: { labels: { color: "#ffffff"} }, seriesDefaults: { border: { _brightness: 1 }, labels: { color: "#ffffff" }, line: { markers: { background: "#0e0e0e"} }, bubble: { opacity: .6 }, scatter: { markers: { background: "#0e0e0e"} }, scatterLine: { markers: { background: "#0e0e0e"} }, area: { opacity: .4, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#828282", line: { color: "#ffffff"} }, overlay: { gradient: "none"} }, chartArea: { background: "#0e0e0e" }, seriesColors: ["#00aba9", "#309b46", "#8ebc00", "#ff6900", "#e61e26", "#d8e404", "#25a0da", "#7e51a1", "#313131", "#ed1691"], axisDefaults: { line: { color: "#cecece" }, labels: { color: "#ffffff" }, minorGridLines: { color: "#2d2d2d" }, majorGridLines: { color: "#333333" }, title: { color: "#ffffff"} }, tooltip: { background: "#0e0e0e", color: "#ffffff"} }, gauge: { pointer: { color: "#00aba9" }, scale: { rangePlaceholderColor: "#2d2d2d", labels: { color: "#ffffff" }, minorTicks: { color: "#333333" }, majorTicks: { color: "#cecece" }, line: { color: "#cecece"}}} }), h("moonlight", { chart: { title: { color: "#ffffff" }, legend: { labels: { color: "#ffffff"} }, seriesDefaults: { labels: { color: "#ffffff" }, pie: { overlay: { gradient: "sharpBevel"} }, donut: { overlay: { gradient: "sharpGlass"} }, line: { markers: { background: "#212a33"} }, bubble: { opacity: .6 }, scatter: { markers: { background: "#212a33"} }, scatterLine: { markers: { background: "#212a33"} }, area: { opacity: .3, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#757d87", line: { color: "#ea9d06" }, border: { _brightness: 1.5, opacity: 1 }, highlight: { border: { color: c, opacity: .2}} }, ohlc: { line: { color: "#ea9d06"}} }, chartArea: { background: "#212a33" }, seriesColors: ["#ffca08", "#ff710f", "#ed2e24", "#ff9f03", "#e13c02", "#a00201"], axisDefaults: { line: { color: "#8c909e" }, minorTicks: { color: "#8c909e" }, majorTicks: { color: "#8c909e" }, labels: { color: "#ffffff" }, majorGridLines: { color: "#3e424d" }, minorGridLines: { color: "#2f3640" }, title: { color: "#ffffff"} }, tooltip: { background: "#212a33", color: "#ffffff", opacity: 1} }, gauge: { pointer: { color: "#f4af03" }, scale: { rangePlaceholderColor: "#2f3640", labels: { color: c }, minorTicks: { color: "#8c909e" }, majorTicks: { color: "#8c909e" }, line: { color: "#8c909e"}}} }), h("uniform", { chart: { title: { color: "#686868" }, legend: { labels: { color: "#686868"} }, seriesDefaults: { labels: { color: "#686868" }, pie: { overlay: { gradient: "sharpBevel"} }, donut: { overlay: { gradient: "sharpGlass"} }, line: { markers: { background: "#ffffff"} }, bubble: { opacity: .6 }, scatter: { markers: { background: "#ffffff"} }, scatterLine: { markers: { background: "#ffffff"} }, area: { opacity: .3, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#cccccc", line: { color: "#cccccc" }, border: { _brightness: 1.5, opacity: 1 }, highlight: { border: { color: "#cccccc", opacity: .2}} }, ohlc: { line: { color: "#cccccc"}} }, chartArea: { background: "#ffffff" }, seriesColors: ["#527aa3", "#6f91b3", "#8ca7c2", "#a8bdd1", "#c5d3e0", "#e2e9f0"], axisDefaults: { line: { color: "#9e9e9e" }, minorTicks: { color: "#aaaaaa" }, majorTicks: { color: "#888888" }, labels: { color: "#686868" }, majorGridLines: { color: "#dadada" }, minorGridLines: { color: "#e7e7e7" }, title: { color: "#686868"} }, tooltip: { background: "#ffffff", color: "#686868", opacity: .8} }, gauge: { pointer: { color: "#527aa3" }, scale: { rangePlaceholderColor: "#e7e7e7", labels: { color: "#686868" }, minorTicks: { color: "#aaaaaa" }, majorTicks: { color: "#888888" }, line: { color: "#9e9e9e"}}} }), h("bootstrap",
		{ chart: { title: { color: "#343434" }, legend: { labels: { color: "#343434"} }, seriesDefaults: { labels: { color: "#343434" }, pie: { overlay: { gradient: "sharpBevel"} }, donut: { overlay: { gradient: "sharpGlass"} }, line: { markers: { background: "#ffffff"} }, bubble: { opacity: .6 }, scatter: { markers: { background: "#ffffff"} }, scatterLine: { markers: { background: "#ffffff"} }, area: { opacity: .3, markers: { visible: !1, size: 6} }, candlestick: { downColor: "#d0d0d0", line: { color: "#d0d0d0" }, border: { _brightness: 1.5, opacity: 1 }, highlight: { border: { color: "#b8b8b8", opacity: .2}} }, ohlc: { line: { color: "#d0d0d0"}} }, chartArea: { background: "#ffffff" }, seriesColors: ["#006dcc", "#49AFCD", "#5BB75B", "#FAA732", "#DA4F49", "#363636"], axisDefaults: { line: { color: "#b8b8b8" }, minorTicks: { color: "#dddddd" }, majorTicks: { color: "#b8b8b8" }, labels: { color: "#343434" }, majorGridLines: { color: "#b8b8b8" }, minorGridLines: { color: "#dddddd" }, title: { color: "#343434"} }, tooltip: { background: "#ffffff", color: "#343434", opacity: .8} }, gauge: { pointer: { color: "#0044cc" }, scale: { rangePlaceholderColor: "#b8b8b8", labels: { color: "#343434" }, minorTicks: { color: "#dddddd" }, majorTicks: { color: "#b8b8b8" }, line: { color: "#b8b8b8"}}} })
}(window.kendo.jQuery), function (e, t) {
	function n(e, t) {
		function n(e, t, n) {
			var i, r = typeof t;
			return i = r === Gn ? hr[t](e) : "function" === r ? t(e, n) : hr.max(e)
		}
		function i(e, t, i) {
			var r, o, a, s = T(i.type), l = s.length, d = e.length, c = [], u = [];
			for (r = 0; l > r; r++) {
				for (a = s[r], o = 0; d > o; o++)
					u.push(e[o][a]);
				c.push(n(u, t[a], i)), u = []
			}
			return c
		}
		var r, o = t.aggregate;
		return r = "object" == typeof o ? i(e, o, t) : n(e, o, t)
	}
	function i(e) {
		return o(e).min
	}
	function r(e) {
		return o(e).max
	}
	function o(e) {
		var n, i, r = kn, o = wn, a = e.length;
		for (n = 0; a > n; n++)
			i = e[n], null !== i && isFinite(i) && (r = j.min(r, i), o = j.max(o, i));
		return { min: r === kn ? t : r, max: o === wn ? t : o}
	}
	function a(e, t, n, i) {
		var r, o, a = (i.x - n.x) * (e.y - n.y) - (i.y - n.y) * (e.x - n.x), s = (i.y - n.y) * (t.x - e.x) - (i.x - n.x) * (t.y - e.y);
		return 0 !== s && (o = a / s, r = new ut(e.x + o * (t.x - e.x), e.y + o * (t.y - e.y))), r
	}
	function s(e, t) {
		var n, i, r = e.series, o = r.length, a = e.seriesDefaults, s = Z({}, e.seriesDefaults), d = t ? Z({}, t.seriesDefaults) : {}, c = Z({}, d);
		for (l(s), l(c), n = 0; o > n; n++)
			i = r[n].type || e.seriesDefaults.type, r[n] = Z({}, c, d[i], { tooltip: e.tooltip }, s, a[i], r[n])
	}
	function l(e) {
		delete e.bar, delete e.column, delete e.line, delete e.verticalLine, delete e.pie, delete e.area, delete e.verticalArea, delete e.scatter, delete e.scatterLine, delete e.bubble, delete e.candlestick, delete e.ohlc
	}
	function d(e) {
		var t, n = e.series, i = n.length, r = e.seriesColors || [];
		for (t = 0; i > t; t++)
			n[t].color = n[t].color || r[t % r.length]
	}
	function c(e) {
		var t;
		L([Vt, ai, ui, pi], function () {
			t = this + "Axes", e[t] && (e[this + "Axis"] = e[t], delete e[t])
		})
	}
	function u(t, n) {
		var i = (n || {}).axisDefaults || {};
		L([Vt, ai, ui, pi], function () {
			var n = this + "Axis", r = [].concat(t[n]), o = t.axisDefaults || {};
			r = e.map(r, function (e) {
				var t = (e || {}).color;
				return Z({}, i, i[n], o, o[n], { line: { color: t }, labels: { color: t }, title: { color: t} }, e)
			}), t[n] = r.length > 1 ? r : r[0]
		})
	}
	function p(e, t, n) {
		e[t] = (e[t] || 0) + n
	}
	function f(e) {
		var t, n = e.length, i = 0;
		for (t = 0; n > t; t++)
			i = j.max(i, e[t].data.length);
		return i
	}
	function h(e) {
		return e * e
	}
	function m(e, t) {
		if (null === t)
			return null;
		var n = m.cache[e] = m.cache[e] || et(e, !0);
		return n(t)
	}
	function g(e) {
		var t, n, i;
		if (e instanceof Date)
			t = e;
		else if (typeof e === Gn)
			n = Jt.exec(e), t = new Date(n ? parseInt(n[1], 10) : e);
		else if (e)
			if (e.length)
				for (t = [], i = 0; e.length > i; i++)
					t.push(g(e[i]));
			else
				t = new Date(e);
		return t
	}
	function v(e) {
		return V(e) ? U(e, v) : e ? g(e).getTime() : t
	}
	function b(e, t, n, i) {
		if (!e)
			return e;
		if (e = g(e), n === fi)
			return new Date(e.getFullYear() + t, 0, 1);
		if (n === Cn)
			return new Date(e.getFullYear(), e.getMonth() + t, 1);
		if (n === di) {
			var r = _(e, i);
			return b(r, 7 * t, Zt)
		}
		return n === Zt ? new Date(e.getFullYear(), e.getMonth(), e.getDate() + t) : n === fn ? new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours() + t) : n === yn ? new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes() + t) : e
	}
	function _(e, t) {
		var n = e.getDay(), i = 0;
		for (t = t || 0; n !== t;)
			0 === n ? n = 6 : n--, i++;
		return y(e, -i * Qn)
	}
	function x(e, t, n) {
		return e = g(e), b(e, 0, t, n)
	}
	function k(e, t, n) {
		return e = g(e), x(e, t, n).getTime() === e.getTime() ? e : b(e, 1, t, n)
	}
	function w(e, t) {
		var n = e.getTime() - t, i = e.getTimezoneOffset() - t.getTimezoneOffset();
		return n - i * $n
	}
	function y(e, t) {
		var n = e.getTimezoneOffset(), i = new Date(e.getTime() + t), r = i.getTimezoneOffset() - n;
		return new Date(i.getTime() + r * $n)
	}
	function C(e, t, n) {
		var i;
		return i = n === fi ? t.getFullYear() - e.getFullYear() : n === Cn ? 12 * C(e, t, fi) + t.getMonth() - e.getMonth() : n === Zt ? j.floor(w(t, e) / Qn) : j.floor((t - e) / Zn[n])
	}
	function T(e) {
		var t = [ai];
		return wt(e, [Lt, Fn]) ? t = ["open", "high", "low", "close"] : wt(e, _i) && (t = [ui, pi], e === Bt && t.push("size")), t
	}
	function S(e, t, n) {
		var i, r, o, a, s = e.data[t], l = {}, d = T(e.type), c = { value: s };
		return xt(s) ? V(s) ? (i = s.slice(d.length), a = A(s, d), l = A(i, n)) : "object" == typeof s && (r = E(e, d), o = E(e, n), a = D(s, d, r), l = D(s, n, o)) : a = D({}, d), xt(a) && (1 === d.length && (a = a[d[0]]), c.value = a), c.fields = l, c
	}
	function A(e, t) {
		var n, i, r = {};
		if (t)
			for (i = j.min(t.length, e.length), n = 0; i > n; n++)
				r[t[n]] = e[n];
		return r
	}
	function D(e, t, n) {
		var i, r, o, a, s = {};
		if (t)
			for (r = t.length, n = n || t, i = 0; r > i; i++)
				o = t[i], a = n[i], s[o] = m(a, e);
		return s
	}
	function E(e, t) {
		var n, i, r, o, a;
		if (t)
			for (i = t.length, o = [], n = 0; i > n; n++)
				r = t[n], a = r === ai ? "field" : r + "Field", o.push(e[a] || r);
		return o
	}
	function F(e) {
		return 1 === e.length ? e[0] : e
	}
	function I(e, t, n) {
		return j.max(j.min(e, n), t)
	}
	function P(e) {
		var t, n, i = new ot, r = e.length;
		if (r > 0)
			for (t = 0; r > t; t++)
				n = e[t], 0 === t ? i = n.box.clone() : i.wrap(n.box);
		return i
	}
	function z(e, t) {
		return e && t ? e.toLowerCase() === t.toLowerCase() : e === t
	}
	function R(e, t) {
		return e && t ? v(e) === v(t) : e === t
	}
	function N(e) {
		for (var t, n = e.length; n--;)
			if (t = e[n], xt(t) && null !== t)
				return t
	}
	function O(e, t) {
		null !== t && e.push(t)
	}
	function M(e, t) {
		for (var n, i, r = 0, o = e.length - 1; o >= r;)
			if (n = j.floor((r + o) / 2), i = e[n], t > i)
				r = n + 1;
			else {
				if (!(i > t))
					return n;
				o = n - 1
			}
		return t >= e[n] ? n : n - 1
	}
	function H(e) {
		var t, n, i = !0, r = e.length;
		for (t = 0; r > t; t++)
			if (n = e[t], "number" != typeof n || isNaN(n)) {
				i = !1;
				break
			}
		return i
	}
	function B(e) {
		var t, n, i, r = {};
		for (t = 0; e.length > t; t++)
			n = e[t], i = n.options.name, i && (r[i] = n.range());
		return r
	}
	var L = e.each, V = e.isArray, U = e.map, j = Math, W = e.extend, q = e.proxy, G = document, $ = window.kendo, Y = $.Class, Q = $.Observable, K = $.data.DataSource, X = $.ui.Widget, J = $.template, Z = $.deepExtend, et = $.getter, tt = $.dataviz, nt = tt.Axis, it = tt.AxisLabel, rt = tt.BarAnimation, ot = tt.Box2D, at = tt.BoxElement, st = tt.ChartElement, lt = tt.Color, dt = tt.ElementAnimation, ct = tt.NumericAxis, ut = tt.Point2D, pt = tt.RootElement, ft = tt.Ring, ht = tt.Text, mt = tt.TextBox, gt = tt.Title, vt = tt.animationDecorator, bt = tt.append, _t = tt.autoFormat, xt = tt.defined, kt = tt.getSpacing, wt = tt.inArray, yt = tt.interpolateValue, Ct = tt.last, Tt = tt.round, St = tt.renderTemplate, At = tt.uniqueId, Dt = ".kendoChart", Et = "above", Ft = "area", It = "auto", Pt = "fit", zt = tt.AXIS_LABEL_CLICK, Rt = "bar", Nt = .8, Ot = "below", Mt = "#000", Ht = "bottom", Bt = "bubble", Lt = "candlestick", Vt = "category", Ut = "center", jt = "change", Wt = "circle", qt = "click" + Dt, Gt = tt.CLIP, $t = "column", Yt = tt.COORD_PRECISION, Qt = "k-", Kt = "dataBound", Xt = "date", Jt = /^\/Date\((.*?)\)\/$/, Zt = "days", en = tt.DEFAULT_FONT, tn = tt.DEFAULT_HEIGHT, nn = tt.DEFAULT_PRECISION, rn = tt.DEFAULT_WIDTH, on = j.PI / 180, an = "donut", sn = 50, ln = "drag", dn = "dragEnd", cn = "dragStart", un = "fadeIn", pn = "glass", fn = "hours", hn = tt.INITIAL_ANIMATION_DURATION, mn = "insideBase", gn = "insideEnd", vn = "interpolate", bn = "left", _n = "line", xn = 8, kn = Number.MAX_VALUE, wn = -Number.MAX_VALUE, yn = "minutes", Cn = "months", Tn = "mousemove.tracking", Sn = "mouseover" + Dt, An = 150, Dn = "DOMMouseScroll" + Dt + " mousewheel" + Dt, En = "MSPointerDown" + Dt, Fn = "ohlc", In = "outsideEnd", Pn = "_outline", zn = "pie", Rn = 70, Nn = "plotAreaClick", On = "right", Mn = "roundedBevel", Hn = "roundedGlass", Bn = "scatter", Ln = "scatterLine", Vn = "selectStart", Un = "select", jn = "selectEnd", Wn = "seriesClick", qn = "seriesHover", Gn = "string", $n = 6e4, Yn = 60 * $n, Qn = 24 * Yn, Kn = 7 * Qn, Xn = 31 * Qn, Jn = 365 * Qn, Zn = { years: Jn, months: Xn, weeks: Kn, days: Qn, hours: Yn, minutes: $n }, ei = "top", ti = 150, ni = 5, ii = 100, ri = "touchstart" + Dt, oi = "triangle", ai = "value", si = "verticalArea", li = "verticalLine", di = "weeks", ci = "#fff", ui = "x", pi = "y", fi = "years", hi = "zero", mi = "zoomStart", gi = "zoom", vi = "zoomEnd", bi = [Rt, $t, _n, li, Ft, si, Lt, Fn], _i = [Bn, Ln, Bt], xi = [yn, fn, Zt, di, Cn, fi], ki = { minutes: "HH:mm", hours: "HH:mm", days: "M/d", weeks: "M/d", months: "MMM 'yy", years: "yyyy" }, wi = X.extend({
		init: function (e, t) {
			var n, i, r, o, a = this, s = tt.ui.themes || {};
			X.fn.init.call(a, e), n = Z({}, a.options, t), a.element.addClass("k-chart").css("position", "relative"), a._originalOptions = Z({}, n), o = n.theme, r = s[o] || s[o.toLowerCase()], i = o && r ? r.chart : {}, c(n), a._applyDefaults(n, i), a.options = Z({}, i, n), d(a.options), a.bind(a.events, a.options), a.wrapper = a.element, a._initDataSource(t), $.notify(a, tt.ui)
		}, _initDataSource: function (e) {
			var t = this, n = (e || {}).dataSource;
			t._dataChangeHandler = q(t._onDataChanged, t), t.dataSource = K.create(n).bind(jt, t._dataChangeHandler), t._redraw(), t._attachEvents(), n && t.options.autoBind && t.dataSource.fetch()
		}, setDataSource: function (e) {
			var t = this;
			t.dataSource.unbind(jt, t._dataChangeHandler), t.dataSource = e, e.bind(jt, t._dataChangeHandler), t.options.autoBind && e.fetch()
		}, events: [Kt, Wn, qn, zt, Nn, cn, ln, dn, mi, gi, vi, Vn, Un, jn], items: function () {
			return e()
		}, options: { name: "Chart", theme: "default", chartArea: {}, legend: { visible: !0, labels: {} }, categoryAxis: {}, autoBind: !0, seriesDefaults: { type: $t, data: [], groupNameTemplate: "#= group.value + (kendo.dataviz.defined(series.name) ? ': ' + series.name : '') #", labels: {} }, series: [], tooltip: { visible: !1 }, transitions: !0, valueAxis: {}, plotArea: {}, title: {}, xAxis: {}, yAxis: {} }, refresh: function () {
			var e = this;
			e._applyDefaults(e.options), delete e._sourceSeries, e._onDataChanged()
		}, redraw: function (e) {
			var t, n, i = this;
			i._applyDefaults(i.options), e ? (n = i._model._plotArea, t = n.findPane(e), n.redraw(t)) : i._redraw()
		}, _redraw: function () {
			var e, t = this, n = t.options, i = t.element, r = t._model = t._getModel(), o = tt.ui.defaultView();
			t._plotArea = r._plotArea, o && (e = t._view = o.fromModel(r), t._viewElement = e.renderTo(i[0]), t._tooltip = new tt.Tooltip(i, n.tooltip), t._highlight = new pr(e, t._viewElement))
		}, svg: function () {
			var e = this._getModel(), t = tt.SVGView.fromModel(e);
			return t.render()
		}, _applyDefaults: function (e, t) {
			u(e, t), s(e, t)
		}, _getModel: function () {
			var e, t = this, n = t.options, i = t.element, r = new pt(Z({ width: i.width() || rn, height: i.height() || tn, transitions: n.transitions }, n.chartArea));
			return gt.buildTitle(n.title, r), e = r._plotArea = t._createPlotArea(), n.legend.visible && r.append(new Ci(e.options.legend)), r.append(e), r.reflow(), r
		}, _createPlotArea: function () {
			var e, t, n, i = this, r = i.options, o = r.series, a = o.length, s = [], l = [], d = [], c = [];
			for (e = 0; a > e; e++)
				t = o[e], wt(t.type, bi) ? s.push(t) : wt(t.type, _i) ? l.push(t) : t.type === zn ? d.push(t) : t.type === an && c.push(t);
			return n = d.length > 0 ? new or(d, r) : c.length > 0 ? new ar(c, r) : l.length > 0 ? new rr(l, r) : new nr(s, r)
		}, _attachEvents: function () {
			var e = this, t = e.element, n = q(e._touchstart, e);
			t.on(qt, q(e._click, e)), t.on(Sn, q(e._mouseover, e)), t.on(Dn, q(e._mousewheel, e)), t.on(ri, n), t.on(En, n), $.UserEvents && (e._userEvents = new $.UserEvents(t, { global: !0, threshold: 5, filter: ":not(.k-selector)", multiTouch: !1, start: q(e._start, e), move: q(e._move, e), end: q(e._end, e) }))
		}, _start: function (e) {
			var t = this, n = t._events;
			xt(n[cn] || n[ln] || n[dn]) && t._startNavigation(e, cn)
		}, _move: function (e) {
			var t, n = this, i = n._navState, r = {};
			if (i) {
				e.preventDefault(), t = i.axes;
				for (var o = 0; t.length > o; o++) {
					var a = t[o], s = a.options.name;
					if (s) {
						var l = a.options.vertical ? e.y : e.x, d = l.startLocation - l.location;
						0 !== d && (r[a.options.name] = a.translateRange(d))
					}
				}
				i.axisRanges = r, n.trigger(ln, { axisRanges: r, originalEvent: e })
			}
		}, _end: function (e) {
			this._endNavigation(e, dn)
		}, _mousewheel: function (e) {
			var t, n, i, r, o, a, s = this, l = e.originalEvent, d = 0, c = s._navState, u = {};
			if (l.wheelDelta && (d = -l.wheelDelta / 120, d = d > 0 ? j.ceil(d) : j.floor(d)), l.detail && (d = Tt(l.detail / 3)), c || (t = s._startNavigation(l, mi), t || (c = s._navState)), c) {
				for (n = c.totalDelta || d, c.totalDelta = n + d, i = s._navState.axes, r = 0; i.length > r; r++)
					o = i[r], a = o.options.name, a && (u[a] = o.scaleRange(n));
				s.trigger(gi, { delta: d, axisRanges: u, originalEvent: e }), s._mwTimeout && clearTimeout(s._mwTimeout), s._mwTimeout = setTimeout(function () {
					s._endNavigation(e, vi)
				}, An)
			}
		}, _startNavigation: function (e, t) {
			var n, i, r, o = this, a = o._eventCoordinates(e), s = o._model._plotArea, l = s.findPointPane(a), d = s.axes.slice(0), c = !1;
			if (l) {
				for (n = 0; d.length > n; n++)
					if (i = d[n], i.box.containsPoint(a)) {
						c = !0;
						break
					}
				!c && s.backgroundBox().containsPoint(a) && (r = o.trigger(t, { axisRanges: B(d), originalEvent: e }), r ? o._userEvents.cancel() : (o._suppressHover = !0, o._unsetActivePoint(), o._navState = { pane: l, axes: d }))
			}
		}, _endNavigation: function (e, t) {
			var n = this;
			n._navState && (n.trigger(t, { axisRanges: n._navState.axisRanges, originalEvent: e }), n._suppressHover = !1, n._navState = null)
		}, _getChartElement: function (t) {
			var n, i = this, r = e(t.target).data("modelId"), o = i._model;
			return r && (n = o.modelMap[r]), n && n.aliasFor && (n = n.aliasFor(t, i._eventCoordinates(t))), n
		}, _eventCoordinates: function (e) {
			var t = this, n = xt((e.x || {}).client), i = n ? e.x.client : e.clientX, r = n ? e.y.client : e.clientY;
			return t._toModelCoordinates(i, r)
		}, _toModelCoordinates: function (t, n) {
			var i = this.element, r = i.offset(), o = parseInt(i.css("paddingLeft"), 10), a = parseInt(i.css("paddingTop"), 10), s = e(window);
			return { x: t - r.left - o + s.scrollLeft(), y: n - r.top - a + s.scrollTop()}
		}, _click: function (e) {
			for (var t = this, n = t._getChartElement(e); n;)
				n.click && n.click(t, e), n = n.parent
		}, _mouseover: function (t) {
			var n, i, r = this, o = r._tooltip, a = r._highlight;
			!r._suppressHover && a && a.overlayElement !== t.target && (i = r._getChartElement(t), i && i.hover && (i.hover(r, t), r._activePoint = i, n = Z({}, r.options.tooltip, i.options.tooltip), n.visible && o.show(i), a.show(i), e(G.body).on(Tn, q(r._mouseMove, r))))
		}, _mouseMove: function (t) {
			var n, i, r, o = this, a = o._tooltip, s = o._highlight, l = o._eventCoordinates(t), d = o._activePoint;
			o._plotArea.box.containsPoint(l) ? d && d.series && (d.series.type === _n || d.series.type === Ft) && (i = d.parent, r = i.getNearestPoint(l.x, l.y, d.seriesIx), r && r != d && (r.hover(o, t), o._activePoint = r, n = Z({}, o.options.tooltip, d.options.tooltip), n.visible && a.show(r), s.show(r))) : (e(G.body).off(Tn), o._unsetActivePoint())
		}, _unsetActivePoint: function () {
			var e = this, t = e._tooltip, n = e._highlight;
			e._activePoint = null, t && t.hide(), n && n.hide()
		}, _onDataChanged: function () {
			var e, t, n = this, i = n.options, r = n._sourceSeries || i.series, o = r.length, a = n.dataSource.view(), s = (n.dataSource.group() || []).length > 0, l = s ? a[0].items : a, c = [];
			for (e = 0; o > e; e++)
				t = r[e], n.isBindable(t) ? (t.autoBind !== !1 && (t.data = a), bt(c, s ? n._createGroupedSeries(t, a) : [t])) : c.push(t);
			n._sourceSeries = r, i.series = c, d(n.options), n._bindCategories(l), n.trigger(Kt), n._redraw()
		}, _bindCategories: function (e) {
			var t, n, i = this, r = i.options, o = [].concat(r.categoryAxis);
			for (t = 0; o.length > t; t++)
				n = o[t], n.autoBind !== !1 && i._bindCategoryAxis(n, e)
		}, _bindCategoryAxis: function (e, t) {
			var n, i, r;
			if (e.field)
				for (e.categories = [], n = 0; t.length > n; n++)
					r = t[n], i = m(e.field, r), 0 === n ? (e.categories = [i], e.dataItems = [r]) : (e.categories.push(i), e.dataItems.push(r))
		}, isBindable: function (e) {
			var t, n, i = T(e.type), r = !0;
			for (n = 0; i.length > n; n++)
				if (t = i[n], t === ai ? t = "field" : t += "Field", !e[t]) {
					r = !1;
					break
				}
			return r
		}, _createGroupedSeries: function (e, n) {
			var i, r, o, a, s = [], l = n.length;
			for (e.groupNameTemplate && (i = J(e.groupNameTemplate)), o = 0; l > o; o++)
				a = Z({}, e), a.color = t, s.push(a), r = n[o], a.data = r.items, i && (a.name = i({ series: a, group: r }));
			return s
		}, _touchstart: function (e) {
			var t, n, i = this, r = i._tooltip, o = i._highlight;
			!i._suppressHover && o && o.overlayElement !== e.target && (e.originalEvent.pointerType && 2 !== e.originalEvent.pointerType || (n = i._getChartElement(e), n && n.hover ? (n.hover(i, e), i._activePoint = n, t = Z({}, i.options.tooltip, n.options.tooltip), t.visible && r.show(n), o.show(n)) : i._unsetActivePoint()))
		}, destroy: function () {
			var e = this, t = e.dataSource;
			e.element.off(Dt), t.unbind(jt, e._dataChangeHandler), e._userEvents && e._userEvents.destroy(), X.fn.destroy.call(e)
		}
	}), yi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.append(new mt(e, n.options))
	}, options: { position: In, margin: kt(3), padding: kt(4), color: Mt, background: "", border: { width: 1, color: "" }, aboveAxis: !0, vertical: !1, animation: { type: un, delay: hn }, zIndex: 1 }, reflow: function (e) {
		var t = this, n = t.options, i = n.vertical, r = n.aboveAxis, o = t.children[0], a = o.box, s = o.options.padding;
		o.options.align = i ? Ut : bn, o.options.vAlign = i ? ei : Ut, n.position == gn ? i ? (o.options.vAlign = ei, !r && e.height() > a.height() && (o.options.vAlign = Ht)) : o.options.align = r ? On : bn : n.position == Ut ? (o.options.vAlign = Ut, o.options.align = Ut) : n.position == mn ? i ? o.options.vAlign = r ? Ht : ei : o.options.align = r ? bn : On : n.position == In && (i ? e = r ? new ot(e.x1, e.y1 - a.height(), e.x2, e.y1) : new ot(e.x1, e.y2, e.x2, e.y2 + a.height()) : (o.options.align = Ut, e = r ? new ot(e.x2 + a.width(), e.y1, e.x2, e.y2) : new ot(e.x1 - a.width(), e.y1, e.x1, e.y2))), i ? s.left = s.right = (e.width() - o.contentBox.width()) / 2 : s.top = s.bottom = (e.height() - o.contentBox.height()) / 2, o.reflow(e)
	} }), Ci = st.extend({ init: function (e) {
		var t = this;
		st.fn.init.call(t, e), t.createLabels()
	}, options: { position: On, items: [], labels: {}, offsetX: 0, offsetY: 0, margin: kt(10), padding: kt(5), border: { color: Mt, width: 0 }, background: "", zIndex: 1 }, createLabels: function () {
		var e, t, n, i = this, r = i.options.items, o = r.length;
		for (n = 0; o > n; n++)
			t = r[n].name, e = new ht(t, i.options.labels), i.append(e)
	}, reflow: function (e) {
		var n = this, i = n.options, r = n.children.length;
		return 0 === r ? (n.box = e.clone(), t) : "custom" == i.position ? (n.customLayout(e), t) : (i.position == ei || i.position == Ht ? n.horizontalLayout(e) : n.verticalLayout(e), t)
	}, getViewElements: function (e) {
		var t, n, i, r, o, a, s, l = this, d = l.children, c = l.options, u = c.items, p = u.length, f = l.markerSize(), h = e.createGroup({ zIndex: c.zIndex }), m = c.border || {};
		for (bt(h.children, st.fn.getViewElements.call(l, e)), s = 0; p > s; s++)
			r = u[s].color, o = d[s], n = new ot, a = o.box, i = i ? i.wrap(a) : a.clone(), n.x1 = a.x1 - 2 * f, n.x2 = n.x1 + f, n.y1 = c.position == ei || c.position == Ht ? a.y1 + f / 2 : a.y1 + (a.height() - f) / 2, n.y2 = n.y1 + f, h.children.push(e.createRect(n, { fill: r, stroke: r }));
		return d.length > 0 && (t = kt(c.padding), t.left += 2 * f, i.pad(t), h.children.unshift(e.createRect(i, { stroke: m.width ? m.color : "", strokeWidth: m.width, dashType: m.dashType, fill: c.background }))), [h]
	}, verticalLayout: function (e) {
		var t, n, i, r, o = this, a = o.options, s = o.children, l = s.length, d = s[0].box.clone(), c = kt(a.margin), u = 2 * o.markerSize();
		for (r = 1; l > r; r++)
			i = o.children[r], i.box.alignTo(o.children[r - 1].box, Ht), d.wrap(i.box);
		a.position == bn ? (t = e.x1 + u + c.left, n = (e.y2 - d.height()) / 2, d.x2 += u + c.left + c.right) : (t = e.x2 - d.width() - c.right, n = (e.y2 - d.height()) / 2, d.translate(t, n), d.x1 -= u + c.left), o.translateChildren(t + a.offsetX, n + a.offsetY);
		var p = d.width();
		d.x1 = j.max(e.x1, d.x1), d.x2 = d.x1 + p, d.y1 = e.y1, d.y2 = e.y2, o.box = d
	}, horizontalLayout: function (e) {
		var t, n, i, r, o = this, a = o.options, s = o.children, l = s.length, d = s[0].box.clone(), c = 3 * o.markerSize(), u = kt(a.margin), p = s[0].box.width() + c, f = e.width(), h = 0;
		for (r = 1; l > r; r++)
			i = s[r], p += i.box.width() + c, p > f - c ? (i.box = new ot(d.x1, d.y2, d.x1 + i.box.width(), d.y2 + i.box.height()), p = i.box.width() + c, h = i.box.y1) : (i.box.alignTo(s[r - 1].box, On), i.box.y2 = h + i.box.height(), i.box.y1 = h, i.box.translate(c, 0)), d.wrap(i.box);
		t = (e.width() - d.width() + c) / 2, a.position === ei ? (n = e.y1 + u.top, d.y2 = e.y1 + d.height() + u.top + u.bottom, d.y1 = e.y1) : (n = e.y2 - d.height() - u.bottom, d.y1 = e.y2 - d.height() - u.top - u.bottom, d.y2 = e.y2), o.translateChildren(t + a.offsetX, n + a.offsetY), d.x1 = e.x1, d.x2 = e.x2, o.box = d
	}, customLayout: function (e) {
		var t, n = this, i = n.options, r = n.children, o = r.length, a = r[0].box.clone(), s = 2 * n.markerSize();
		for (t = 1; o > t; t++)
			a = n.children[t].box, a.alignTo(n.children[t - 1].box, Ht), a.wrap(a);
		n.translateChildren(i.offsetX + s, i.offsetY), n.box = e
	}, markerSize: function () {
		var e = this, t = e.children;
		return t.length > 0 ? t[0].box.height() / 2 : 0
	} }), Ti = nt.extend({ init: function (e) {
		var t = this;
		nt.fn.init.call(t, e), e = t.options, e.categories = e.categories.slice(0)
	}, options: { type: Vt, categories: [], vertical: !1, majorGridLines: { visible: !1, width: 1, color: Mt }, zIndex: 1, justified: !1 }, range: function () {
		return { min: 0, max: this.options.categories.length}
	}, getTickPositions: function (e) {
		var t, n = this, i = n.options, r = i.vertical, o = i.justified, a = n.lineBox(), s = r ? a.height() : a.width(), l = e - (o ? 1 : 0), d = s / l, c = r ? pi : ui, u = a[c + 1], p = [];
		for (t = 0; e > t; t++)
			p.push(Tt(u, Yt)), u += d;
		return o || p.push(a[c + 2]), i.reverse ? p.reverse() : p
	}, getMajorTickPositions: function () {
		var e = this;
		return e.getTickPositions(e.options.categories.length)
	}, getMinorTickPositions: function () {
		var e = this;
		return e.getTickPositions(2 * e.options.categories.length)
	}, getSlot: function (e, t) {
		var n, i, r, o = this, a = o.options, s = o.getMajorTickPositions(), l = a.reverse, d = a.justified, c = a.vertical ? pi : ui, u = o.lineBox(), p = u[c + (l ? 2 : 1)], f = u[c + (l ? 1 : 2)], h = u.clone(), m = j.max(1, s.length - (d ? 0 : 1));
		return e = xt(e) ? e : 0, t = xt(t) ? t : e, e = I(e, 0, m), t = I(t - 1, e, m), t = j.max(e, t), n = 0 === e ? p : s[e], i = d ? n : s[t], r = t - e, (r > 0 || e === t) && (i = s[t + 1] || f), d && (e === m ? n = i : i = n), h[c + 1] = l ? i : n, h[c + 2] = l ? n : i, h
	}, getCategoryIndex: function (e) {
		var t, n, i, r, o = this, a = o.options, s = a.reverse, l = a.vertical, d = l ? pi : ui, c = o.lineBox(), u = c[d + 1], p = c[d + 2], f = e[d], h = o.getMajorTickPositions();
		if (u > f || f > p)
			return null;
		for (i = 0; h.length > i; i++) {
			if (t = h[i], n = h[i + 1], xt(n) || (n = s ? u : p), s && (t = n, n = h[i]), a.justified && f === n) {
				r = j.max(0, l ? h.length - i - 1 : i + 1);
				break
			}
			if (f >= t && n >= f) {
				r = j.max(0, l ? h.length - i - 2 : i);
				break
			}
		}
		return r
	}, getCategory: function (e) {
		var t = this.getCategoryIndex(e);
		return null === t ? null : this.options.categories[t]
	}, translateRange: function (e) {
		var t = this, n = t.options, i = t.lineBox(), r = n.vertical ? i.height() : i.width(), o = n.categories.length, a = r / o, s = Tt(e / a, nn);
		return { min: s, max: o + s}
	}, scaleRange: function (e) {
		var t = this, n = t.options, i = n.categories.length, r = e * i;
		return { min: -r, max: i + r}
	}, labelsCount: function () {
		return this.options.categories.length
	}, createAxisLabel: function (e, t) {
		var n = this, i = n.options, r = i.dataItems ? i.dataItems[e] : null, o = xt(i.categories[e]) ? i.categories[e] : "";
		return new it(o, e, r, t)
	} }), Si = it.extend({ formatValue: function (e, t) {
		return $.toString(e, t.format, t.culture)
	} }), Ai = Ti.extend({ init: function (e) {
		var t, n, i = this;
		e = e || {}, e = Z({ roundToBaseUnit: !0 }, e, { min: g(e.min), max: g(e.max) }), e.categories && e.categories.length > 0 && (t = (e.baseUnit || "").toLowerCase(), n = t !== Pt && !wt(t, xi), n && (e.baseUnit = i.defaultBaseUnit(e)), (t === Pt || e.baseUnitStep === It) && i.autoBaseUnit(e), i.groupCategories(e)), Ti.fn.init.call(i, e)
	}, options: { type: Xt, labels: { dateFormats: ki }, autoBaseUnitSteps: { minutes: [1, 2, 5, 15, 30], hours: [1, 2, 3], days: [1, 2, 3], weeks: [1, 2], months: [1, 2, 3, 6], years: [1, 2, 3, 5, 10, 25, 50] }, maxDateGroups: 10 }, translateRange: function (e) {
		var t = this, n = Ti.fn.translateRange.call(t, e), i = t.options, r = i.baseUnit, o = j.round(n.min), a = i.weekStartDay;
		return { min: b(i.min, o, r, a), max: b(i.max, o, r, a)}
	}, scaleRange: function (e) {
		for (var t, n, i = this, r = i.options, o = j.abs(e), a = r.min, s = r.max; o--;)
			t = w(a, s), n = j.round(.1 * t), 0 > e ? (a = y(a, n), s = y(s, -n)) : (a = y(a, -n), s = y(s, n));
		return { min: a, max: s}
	}, defaultBaseUnit: function (e) {
		var t, n, i, r, o, a = e.categories, s = xt(a) ? a.length : 0, l = kn;
		for (t = 0; s > t; t++)
			n = g(a[t]), n && r && (i = n - r, i > 0 && (l = j.min(l, i), o = l >= Jn ? fi : l >= Xn - 3 * Qn ? Cn : l >= Kn ? di : l >= Qn ? Zt : l >= Yn ? fn : yn)), r = n;
		return o || Zt
	}, range: function (e) {
		e = e || this.options;
		var t = g(e.categories), n = e.baseUnit === Pt, i = n ? xi[0] : e.baseUnit, r = v(e.min), a = v(e.max), s = o(t), l = v(s.min), d = v(s.max);
		return e.roundToBaseUnit ? { min: b(r || l, 0, i, e.weekStartDay), max: b(a || d, 1, i, e.weekStartDay)} : { min: g(r || l), max: g(a || d)}
	}, autoBaseUnit: function (e) {
		for (var t, n, i, r = this, o = r.range(e), a = e.baseUnit === Pt, s = 0, l = a ? xi[s++] : e.baseUnit, d = o.max - o.min, c = d / Zn[l], u = c, p = e.maxDateGroups || r.options.maxDateGroups, f = Z({}, r.options.autoBaseUnitSteps, e.autoBaseUnitSteps); c > p;)
			if (t = t || f[l].slice(0), i = t.shift())
				n = i, c = u / n;
			else {
				if (!a) {
					c > p && (n = j.ceil(u / p));
					break
				}
				l = xi[s++] || Ct(xi), u = d / Zn[l], t = null
			}
		e.baseUnitStep = n, e.baseUnit = l
	}, getMajorTickPositions: function () {
		var e = this, t = e.options, n = t.categories, i = [];
		if (t.roundToBaseUnit || 0 === n.length)
			i = Ti.fn.getMajorTickPositions.call(e);
		else {
			var r, o, a = t.vertical, s = t.reverse, l = e.lineBox(), d = a ? l.height() : l.width(), c = n[0].getTime(), u = e.range(e.options), p = u.max - u.min, f = d / p, h = n.length, m = (a ? -1 : 1) * (s ? -1 : 1), g = 1 === m ? 1 : 2, v = 1 === m ? 2 : 1, b = l[(a ? pi : ui) + g], _ = l[(a ? pi : ui) + v], x = b;
			for (r = 0; h > r; r++)
				o = n[r] - c, x = b + o * f * m, i.push(Tt(x, Yt));
			Ct(i) !== _ && i.push(_)
		}
		return i
	}, groupCategories: function (e) {
		var t, n, i, r, o, a, s = this, l = g(e.categories), d = e.baseUnit, c = e.baseUnitStep || 1, u = s.range(e), p = e.roundToBaseUnit, f = [], h = s.categoryMap = [], m = [];
		for (t = p ? b(u.max, c - 1, d, e.weekStartDay) : u.max, R(u.min, u.max) && (t = g(v(t) + 1)), n = u.min; t > n; n = i) {
			for (i = b(n, c, d, e.weekStartDay), f.push(n), r = [], o = M(l, n); l.length > o; o++)
				if (a = l[o], a && a >= n)
					if (i > a)
						e.justified && R(a, t) ? m.push(o) : r.push(o);
					else {
						if (p || !R(i, t))
							break;
						m.push(o)
					}
			h.push(r)
		}
		m.length && (f.push(t), h.push(m)), e.max || 0 !== (Ct(h) || []).length || (h.pop(), f.pop()), e.min = f[0], e.max = p ? Ct(f) : t, e.categories = f
	}, createAxisLabel: function (e, t) {
		var n = this.options, i = n.dataItems ? n.dataItems[e] : null, r = n.categories[e], o = n.baseUnit, a = !0, s = t.dateFormats[o];
		if (n.justified) {
			var l = x(r, o, n.weekStartDay);
			a = R(l, r)
		}
		return t = Z({ format: s }, t, { visible: a }), new Si(r, e, i, t)
	} }), Di = nt.extend({ init: function (e, t, n) {
		var i = this;
		n = n || {}, Z(n, { min: g(n.min), max: g(n.max), axisCrossingValue: g(n.axisCrossingValues || n.axisCrossingValue) }), n = i.applyDefaults(g(e), g(t), n), nt.fn.init.call(i, n)
	}, options: { type: Xt, labels: { dateFormats: ki} }, applyDefaults: function (e, n, i) {
		var r = this, o = i.min || e, a = i.max || n, s = i.baseUnit || r.timeUnits(a - o), l = Zn[s], d = x(v(o) - 1, s), c = k(v(a) + 1, s), u = i.majorUnit ? i.majorUnit : t, p = u || tt.ceil(tt.autoMajorUnit(d.getTime(), c.getTime()), l) / l, f = C(d, c, s), h = tt.ceil(f, p), m = h - f, g = j.floor(m / 2), _ = m - g;
		return i.baseUnit || delete i.baseUnit, Z({ baseUnit: s, min: b(d, -g, s), max: b(c, _, s), minorUnit: p / 5 }, i, { majorUnit: p })
	}, range: function () {
		var e = this.options;
		return { min: e.min, max: e.max}
	}, getDivisions: function (e) {
		var t = this.options;
		return j.floor(C(t.min, t.max, t.baseUnit) / e + 1)
	}, getTickPositions: function (e) {
		var t, n = this, i = n.options, r = i.vertical, o = i.reverse, a = n.lineBox(), s = r ? a.height() : a.width(), l = C(i.min, i.max, i.baseUnit), d = s / l, c = e * d, u = n.getDivisions(e), p = (r ? -1 : 1) * (o ? -1 : 1), f = 1 === p ? 1 : 2, h = a[(r ? pi : ui) + f], m = [];
		for (t = 0; u > t; t++)
			m.push(Tt(h, Yt)), h += c * p;
		return m
	}, getMajorTickPositions: function () {
		var e = this;
		return e.getTickPositions(e.options.majorUnit)
	}, getMinorTickPositions: function () {
		var e = this;
		return e.getTickPositions(e.options.minorUnit)
	}, getSlot: function (e, t) {
		return ct.fn.getSlot.call(this, g(e), g(t))
	}, getValue: function (e) {
		var t = ct.fn.getValue.call(this, e);
		return null !== t ? g(t) : null
	}, labelsCount: function () {
		return this.getDivisions(this.options.majorUnit)
	}, createAxisLabel: function (e, t) {
		var n = this.options, i = e * n.majorUnit, r = b(n.min, i, n.baseUnit), o = t.dateFormats[n.baseUnit];
		return t.format = t.format || o, new Si(r, e, null, t)
	}, timeUnits: function (e) {
		var t = fn;
		return e >= Jn ? t = fi : e >= Xn ? t = Cn : e >= Kn ? t = di : e >= Qn && (t = Zt), t
	} }), Ei = st.extend({ init: function (e) {
		var t = this;
		st.fn.init.call(t, e)
	}, options: { vertical: !1, gap: 0, spacing: 0 }, reflow: function (e) {
		var t, n, i = this, r = i.options, o = r.vertical, a = o ? pi : ui, s = i.children, l = r.gap, d = r.spacing, c = s.length, u = c + l + d * (c - 1), p = (o ? e.height() : e.width()) / u, f = e[a + 1] + p * (l / 2);
		for (n = 0; c > n; n++)
			t = (s[n].box || e).clone(), t[a + 1] = f, t[a + 2] = f + p, s[n].reflow(t), c - 1 > n && (f += p * d), f += p
	} }), Fi = st.extend({ init: function (e) {
		var t = this;
		st.fn.init.call(t, e)
	}, options: { vertical: !0, isReversed: !1 }, reflow: function (e) {
		var t, n, i = this, r = i.options, o = r.vertical, a = o ? ui : pi, s = o ? pi : ui, l = e[s + 2], d = i.children, c = i.box = new ot, u = d.length;
		for (t = r.isReversed ? o ? Ht : bn : o ? ei : On, n = 0; u > n; n++) {
			var p = d[n], f = p.box.clone();
			f.snapTo(e, a), p.options && (p.options.stackBase = l), 0 === n ? c = i.box = f.clone() : f.alignTo(d[n - 1].box, t), p.reflow(f), c.wrap(f)
		}
	} }), Ii = { click: function (t, n) {
		var i = this;
		t.trigger(Wn, { value: i.value, category: i.category, series: i.series, dataItem: i.dataItem, element: e(n.target) })
	}, hover: function (t, n) {
		var i = this;
		t.trigger(qn, { value: i.value, category: i.category, series: i.series, dataItem: i.dataItem, element: e(n.target) })
	} }, Pi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.value = e, n.options.id = At(), n.enableDiscovery()
	}, options: { color: ci, border: { width: 1 }, vertical: !0, overlay: { gradient: pn }, aboveAxis: !0, labels: { visible: !1 }, animation: { type: Rt }, opacity: 1 }, render: function () {
		var e, t = this, n = t.value, i = t.options, r = i.labels, o = n;
		t._rendered || (t._rendered = !0, r.visible && n && (r.template ? (e = J(r.template), o = e({ dataItem: t.dataItem, category: t.category, value: t.value, series: t.series })) : r.format && (o = _t(r.format, o)), t.append(new yi(o, Z({ vertical: i.vertical, id: At() }, i.labels)))))
	}, reflow: function (e) {
		this.render();
		var t = this, n = t.options, i = t.children, r = i[0];
		t.box = e, r && (r.options.aboveAxis = n.aboveAxis, r.reflow(e))
	}, getViewElements: function (e) {
		var t = this, n = t.options, i = n.vertical, r = n.border.width > 0 ? { stroke: t.getBorderColor(), strokeWidth: n.border.width, dashType: n.border.dashType} : {}, o = t.box, a = Z({ id: n.id, fill: n.color, fillOpacity: n.opacity, strokeOpacity: n.opacity, vertical: n.vertical, aboveAxis: n.aboveAxis, stackBase: n.stackBase, animation: n.animation, data: { modelId: n.modelId} }, r), s = [];
		return o.width() > 0 && o.height() > 0 && (n.overlay && (a.overlay = Z({ rotation: i ? 0 : 90 }, n.overlay)), s.push(e.createRect(o, a))), bt(s, st.fn.getViewElements.call(t, e)), s
	}, highlightOverlay: function (e, t) {
		var n = this, i = n.box;
		return t = Z({ data: { modelId: n.options.modelId} }, t), e.createRect(i, t)
	}, getBorderColor: function () {
		var e = this, t = e.options, n = t.color, i = t.border, r = i.color, o = i._brightness || Nt;
		return xt(r) || (r = new lt(n).brightness(o).toHex()), r
	}, tooltipAnchor: function (e, t) {
		var n, i, r = this, o = r.options, a = r.box, s = o.vertical, l = o.aboveAxis;
		return s ? (n = a.x2 + ni, i = l ? a.y1 : a.y2 - t) : o.isStacked ? (n = a.x2 - e, i = a.y1 - t - ni) : (n = a.x2 + ni, i = a.y1), new ut(n, i)
	}, formatValue: function (e) {
		var t = this;
		return t.owner.formatPointValue(t, e)
	} });
	Z(Pi.fn, Ii);
	var zi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.plotArea = e, n.categoryAxis = e.seriesCategoryAxis(t.series[0]), n.valueAxisRanges = {}, n.points = [], n.categoryPoints = [], n.seriesPoints = [], n.render()
	}, options: { series: [], invertAxes: !1, isStacked: !1 }, render: function () {
		var e = this;
		e.traverseDataPoints(q(e.addValue, e))
	}, addValue: function (e, t, n, i, r) {
		var o, a = this, s = e.value, l = a.categoryPoints[n], d = a.seriesPoints[r];
		l || (a.categoryPoints[n] = l = []), d || (a.seriesPoints[r] = d = []), a.updateRange(s, n, i), o = a.createPoint(e, t, n, i, r), o && (o.category = t, o.series = i, o.seriesIx = r, o.owner = a, o.dataItem = i.data[n]), a.points.push(o), d.push(o), l.push(o)
	}, updateRange: function (e, t, n) {
		var i = this, r = n.axis, o = i.valueAxisRanges[r];
		xt(e) && !isNaN(e) && (o = i.valueAxisRanges[r] = o || { min: kn, max: wn }, o.min = j.min(o.min, e), o.max = j.max(o.max, e))
	}, seriesValueAxis: function (e) {
		var t = this.plotArea, n = e.axis, i = n ? t.namedValueAxes[n] : t.valueAxis;
		if (!i)
			throw Error("Unable to locate value axis with name " + n);
		return i
	}, reflow: function (e) {
		var t, n, i, r = this, o = r.options, a = o.invertAxes, s = 0, l = r.categorySlots = [], d = r.points, c = r.categoryAxis;
		r.traverseDataPoints(function (e, o, u, p) {
			var f = e.value;
			t = r.seriesValueAxis(p), n = r.categoryAxisCrossingValue(t), i = d[s++], i && i.plotValue && (f = i.plotValue);
			var h = r.categorySlot(c, u, t), m = r.valueSlot(t, f, n), g = a ? m : h, v = a ? h : m, b = new ot(g.x1, v.y1, g.x2, v.y2), _ = t.options.reverse ? n > f : f >= n;
			i && (i.options.aboveAxis = _, i.reflow(b)), l[u] || (l[u] = h)
		}), r.reflowCategories(l), r.box = e
	}, categoryAxisCrossingValue: function (e) {
		var t = this.categoryAxis, n = e.options, i = [].concat(n.axisCrossingValues || n.axisCrossingValue);
		return i[t.axisIndex || 0] || 0
	}, reflowCategories: function () {
	}, valueSlot: function (e, t, n) {
		return e.getSlot(t, n)
	}, categorySlot: function (e, t) {
		return e.getSlot(t)
	}, traverseDataPoints: function (e) {
		var t, n, i, r, o, a = this, s = a.options, l = s.series, d = a.categoryAxis.options.categories || [], c = f(l), u = a.bindableFields(), p = l.length;
		for (t = 0; c > t; t++)
			for (n = 0; p > n; n++)
				r = d[t], o = l[n], i = S(o, t, u), e(i, r, t, o, n)
	}, bindableFields: function () {
		return []
	}, formatPointValue: function (e, t) {
		return _t(t, e.value)
	} }), Ri = zi.extend({ init: function (e, t) {
		var n = this;
		n._groupTotals = {}, n._groups = [], zi.fn.init.call(n, e, t)
	}, render: function () {
		var e = this;
		zi.fn.render.apply(e), e.computeAxisRanges()
	}, createPoint: function (e, n, i, r) {
		var o, a, s = this, l = e.value, d = s.options, c = s.children, u = s.options.isStacked, p = Z({}, r.labels);
		if (u && p.position == In && (p.position = gn), o = new Pi(l, Z({}, { vertical: !d.invertAxes, overlay: r.overlay, labels: p, isStacked: u }, r, { color: e.fields.color || t })), a = c[i], a || (a = new Ei({ vertical: d.invertAxes, gap: d.gap, spacing: d.spacing }), s.append(a)), u) {
			var f, h, m = s.getStackWrap(r, a);
			0 === m.children.length ? (f = new Fi({ vertical: !d.invertAxes }), h = new Fi({ vertical: !d.invertAxes, isReversed: !0 }), m.append(f, h)) : (f = m.children[0], h = m.children[1]), l > 0 ? f.append(o) : h.append(o)
		}
		else
			a.append(o);
		return o
	}, getStackWrap: function (e, t) {
		var n, i, r = t.children, o = e.stack, a = r.length;
		if (typeof o === Gn) {
			for (i = 0; a > i; i++)
				if (r[i]._stackGroup === o) {
					n = r[i];
					break
				}
		}
		else
			n = r[0];
		return n || (n = new st, n._stackGroup = o, t.append(n)), n
	}, updateRange: function (e, t, n) {
		var i = this, r = i.options.isStacked, o = i.groupTotals(n.stack), a = o.positive, s = o.negative;
		xt(e) && (r ? p(e > 0 ? a : s, t, e) : zi.fn.updateRange.apply(i, arguments))
	}, computeAxisRanges: function () {
		var e, t, n = this, o = n.options.isStacked;
		o && (e = n.options.series[0].axis, t = n.categoryTotals(), n.valueAxisRanges[e] = { min: i(t.negative.concat(0)), max: r(t.positive.concat(0)) })
	}, seriesValueAxis: function (e) {
		var t = this, n = t.options;
		return zi.fn.seriesValueAxis.call(t, n.isStacked ? t.options.series[0] : e)
	}, valueSlot: function (e, t, n) {
		return e.getSlot(t, this.options.isStacked ? 0 : n)
	}, categorySlot: function (e, t, n) {
		var i, r, o = this, a = o.options, s = e.getSlot(t);
		return a.isStacked && (r = n.getSlot(0, 0), i = a.invertAxes ? ui : pi, s[i + 1] = s[i + 2] = r[i + 1]), s
	}, reflow: function (e) {
		var t = this;
		t.setStacksDirection(), zi.fn.reflow.call(t, e)
	}, setStacksDirection: function () {
		var e, t, n, i, r = this, o = r.options, a = o.series, s = f(a), l = r.children, d = a.length;
		for (t = 0; d > t; t++)
			for (n = a[t], i = r.seriesValueAxis(n), e = 0; s > e; e++) {
				var c = l[e], u = r.getStackWrap(n, c), p = u.children, h = p[0], m = p[1];
				h && m && (h.options.isReversed = i.options.reverse, m.options.isReversed = !i.options.reverse)
			}
	}, reflowCategories: function (e) {
		var t, n = this, i = n.children, r = i.length;
		for (t = 0; r > t; t++)
			i[t].reflow(e[t])
	}, groupTotals: function (e) {
		var t = this, n = typeof e === Gn ? e : "default", i = t._groupTotals[n];
		return i || (i = t._groupTotals[n] = { positive: [], negative: [] }, t._groups.push(n)), i
	}, categoryTotals: function () {
		var e, t, n, i = this, r = i._groups, o = i._groupTotals, a = { positive: [], negative: [] }, s = r.length;
		for (n = 0; s > n; n++)
			e = r[n], t = o[e], bt(a.positive, t.positive), bt(a.negative, t.negative);
		return a
	}, bindableFields: function () {
		return ["color"]
	} }), Ni = at.extend({ init: function (e) {
		var t = this;
		at.fn.init.call(t, e)
	}, options: { type: Wt, align: Ut, vAlign: Ut }, getViewElements: function (e, t) {
		var n, i, r = this, o = r.options, a = o.type, s = r.paddingBox, l = s.width() / 2;
		return o.visible && r.hasBox() ? (i = Z(r.elementStyle(), t), n = a === oi ? e.createPolyline([new ut(s.x1 + l, s.y1), new ut(s.x1, s.y2), new ut(s.x2, s.y2)], !0, i) : a === Wt ? e.createCircle(new ut(Tt(s.x1 + l, Yt), Tt(s.y1 + s.height() / 2, Yt)), l, i) : e.createRect(s, i), [n]) : []
	} }), Oi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.value = e, n.options.id = At(), n.enableDiscovery()
	}, options: { aboveAxis: !0, vertical: !0, markers: { visible: !0, background: ci, size: xn, type: Wt, border: { width: 2 }, opacity: 1 }, labels: { visible: !1, position: Et, margin: kt(3), padding: kt(4), animation: { type: un, delay: hn}} }, render: function () {
		var e = this, t = e.options, n = t.markers, i = t.labels, r = n.background, o = Z({}, n.border), a = e.value;
		if (!e._rendered && (e._rendered = !0, xt(o.color) || (o.color = new lt(r).brightness(Nt).toHex()), e.marker = new Ni({ id: e.options.id, visible: n.visible && n.size, type: n.type, width: n.size, height: n.size, background: r, border: o, opacity: n.opacity, zIndex: n.zIndex, animation: n.animation }), e.append(e.marker), i.visible)) {
			if (i.template) {
				var s = J(i.template);
				a = s({ dataItem: e.dataItem, category: e.category, value: e.value, series: e.series })
			}
			else
				i.format && (a = e.formatValue(i.format));
			e.label = new mt(a, Z({ id: At(), align: Ut, vAlign: Ut, margin: { left: 5, right: 5} }, i)), e.append(e.label)
		}
	}, markerBox: function () {
		return this.marker.box
	}, reflow: function (e) {
		var t, n = this, i = n.options, r = i.vertical, o = i.aboveAxis;
		n.render(), n.box = e, t = e.clone(), r ? o ? t.y1 -= t.height() : t.y2 += t.height() : o ? t.x1 += t.width() : t.x2 -= t.width(), n.marker.reflow(t), n.reflowLabel(t)
	}, reflowLabel: function (e) {
		var t = this, n = t.options, i = t.marker, r = t.label, o = n.labels.position;
		r && (o = o === Et ? ei : o, o = o === Ot ? Ht : o, r.reflow(e), r.box.alignTo(i.box, o), r.reflow(r.box))
	}, highlightOverlay: function (e, t) {
		var n = this, i = n.marker;
		return t = Z({ data: { modelId: n.options.modelId} }, t), i.getViewElements(e, Z(t, { fill: i.options.border.color, fillOpacity: 1, strokeOpacity: 0 }))[0]
	}, tooltipAnchor: function (e, t) {
		var n = this, i = n.marker.box, r = n.options.aboveAxis;
		return new ut(i.x2 + ni, r ? i.y1 - t : i.y2)
	}, formatValue: function (e) {
		var t = this;
		return t.owner.formatPointValue(t, e)
	} });
	Z(Oi.fn, Ii);
	var Mi = Oi.extend({ init: function (e, t) {
		var n = this;
		Oi.fn.init.call(n, e, t), n.category = e.category
	}, options: { labels: { position: Ut }, highlight: { opacity: 1, border: { width: 1, opacity: 1}} }, highlightOverlay: function (e) {
		var t = this, n = t.options, i = n.highlight, r = i.border.width, o = n.markers, a = t.box.center(), s = o.size / 2 - r / 2, l = i.border.color || new lt(o.background).brightness(Nt).toHex();
		return e.createCircle(a, s, { data: { modelId: t.options.modelId }, stroke: l, strokeWidth: r, strokeOpacity: i.border.opacity })
	}, toggleHighlight: function (e) {
		var n = this, i = n.options.highlight.opacity;
		n.highlighted = !n.highlighted;
		var r = n.marker.getViewElements(e, { fillOpacity: n.highlighted ? i : t })[0];
		r.refresh(G.getElementById(this.options.id))
	} }), Hi = st.extend({ init: function (e, t, n) {
		var i = this;
		st.fn.init.call(i), i.linePoints = e, i.series = t, i.seriesIx = n, i.options.id = At(), i.enableDiscovery()
	}, options: {}, points: function (e) {
		var t, n, i = this, r = i.linePoints.concat(e || []), o = [], a = r.length;
		for (t = 0; a > t; t++)
			n = r[t].markerBox().center(), o.push(new ut(n.x, n.y));
		return o
	}, getViewElements: function (e) {
		var t = this, n = t.series;
		return st.fn.getViewElements.call(t, e), [e.createPolyline(t.points(), !1, { id: t.options.id, stroke: n.color, strokeWidth: n.width, strokeOpacity: n.opacity, fill: "", dashType: n.dashType, data: { modelId: t.options.modelId }, zIndex: -1 })]
	}, aliasFor: function (e, t) {
		var n = this, i = n.seriesIx;
		return n.parent.getNearestPoint(t.x, t.y, i)
	} }), Bi = { renderSegments: function () {
		var e, t, n, i, r, o, a, s = this, l = s.options, d = l.series, c = s.seriesPoints, u = c.length, p = [];
		for (t = 0; u > t; t++) {
			for (n = c[t], a = n.length, e = d[t], i = [], o = 0; a > o; o++)
				r = n[o], r ? i.push(r) : s.seriesMissingValues(e) !== vn && (i.length > 1 && p.push(s.createSegment(i, e, t, Ct(p))), i = []);
			i.length > 1 && p.push(s.createSegment(i, e, t, Ct(p)))
		}
		s._segments = p, s.append.apply(s, p)
	}, seriesMissingValues: function (e) {
		var t = e.missingValues, n = !t && this.options.isStacked;
		return n ? hi : t
	}, createSegment: function (e, t, n) {
		return new Hi(e, t, n)
	}, getNearestPoint: function (e, t, n) {
		var i, r, o, a, s, l = this, d = l.options.invertAxes, c = d ? pi : ui, u = d ? t : e, p = l.seriesPoints[n], f = kn, h = p.length;
		for (s = 0; h > s; s++)
			i = p[s], i && xt(i.value) && null !== i.value && (r = i.box, o = j.abs(r.center()[c] - u), f > o && (a = i, f = o));
		return a
	} }, Li = zi.extend({ init: function (e, t) {
		var n = this;
		n._stackAxisRange = { min: kn, max: wn }, n._categoryTotals = [], n.enableDiscovery(), zi.fn.init.call(n, e, t)
	}, render: function () {
		var e = this;
		zi.fn.render.apply(e), e.computeAxisRanges(), e.renderSegments()
	}, createPoint: function (e, t, n, i) {
		var r, o = this, a = e.value, s = o.options, l = s.isStacked, d = o.categoryPoints[n], c = o.seriesMissingValues(i), u = 0, p = e.fields;
		if (!xt(a) || null === a) {
			if (c !== hi)
				return null;
			a = 0
		}
		var f = new Oi(a, Z({ vertical: !s.invertAxes, markers: { border: { color: i.color}} }, i, { color: p.color, markers: { border: { color: p.color}} }));
		return l && (r = N(d), r && (u = r.plotValue), f.plotValue = a + u), o.append(f), f
	}, updateRange: function (e, t) {
		var n, i = this, r = i.options.isStacked, a = i._stackAxisRange, s = i._categoryTotals;
		xt(e) && (r ? (p(s, t, e), n = o(s), a.min = j.min(a.min, n.min), a.max = j.max(a.max, n.max)) : zi.fn.updateRange.apply(i, arguments))
	}, computeAxisRanges: function () {
		var e, t = this, n = t.options.isStacked;
		n && (e = t.options.series[0].axis, t.valueAxisRanges[e] = t._stackAxisRange)
	}, getViewElements: function (e) {
		var t = this, n = zi.fn.getViewElements.call(t, e), i = e.createGroup({ animation: { type: Gt} });
		return i.children = n, [i]
	}, bindableFields: function () {
		return ["color"]
	} });
	Z(Li.fn, Bi);
	var Vi = Hi.extend({ init: function (e, t, n, i) {
		var r = this;
		r.stackPoints = t, Hi.fn.init.call(r, e, n, i)
	}, points: function () {
		var e, t, n = this, i = n.parent, r = i.options.isStacked && n.seriesIx > 0, o = i.plotArea, a = i.options.invertAxes, s = i.seriesValueAxis(n.series), l = s.lineBox(), d = o.seriesCategoryAxis(n.series), c = d.lineBox(), u = a ? c.x1 : c.y1, p = n.stackPoints, f = Hi.fn.points.call(n, p);
		return u = a ? I(u, l.x1, l.x2) : I(u, l.y1, l.y2), !r && f.length > 1 && (e = f[0], t = Ct(f), a ? (f.unshift(new ut(u, e.y)), f.push(new ut(u, t.y))) : (f.unshift(new ut(e.x, u)), f.push(new ut(t.x, u)))), f
	}, getViewElements: function (e) {
		var t = this, n = t.series, i = Z({ color: n.color, opacity: n.opacity }, n.line), r = Hi.fn.points.call(t), o = t.points();
		return st.fn.getViewElements.call(t, e), [e.createPolyline(o, !1, { id: t.options.id, fillOpacity: n.opacity, fill: n.color, stack: n.stack, data: { modelId: t.options.modelId }, zIndex: -1 }), e.createPolyline(r, !1, { id: t.options.id, stroke: i.color, strokeWidth: i.width, strokeOpacity: i.opacity, dashType: i.dashType, data: { modelId: t.options.modelId }, strokeLineCap: "butt", zIndex: -1 })]
	} }), Ui = Li.extend({ createSegment: function (e, t, n, i) {
		var r, o = this, a = o.options;
		return a.isStacked && n > 0 && i && (r = i.linePoints.slice(0).reverse()), new Vi(e, r, t, n)
	}, seriesMissingValues: function (e) {
		return e.missingValues || hi
	} }), ji = st.extend({
		init: function (e, t) {
			var n = this;
			st.fn.init.call(n, t), n.plotArea = e, n.xAxisRanges = {}, n.yAxisRanges = {}, n.points = [], n.seriesPoints = [], n.render()
		}, options: { series: [], tooltip: { format: "{0}, {1}" }, labels: { format: "{0}, {1}"} }, render: function () {
			var e = this;
			e.traverseDataPoints(q(e.addValue, e))
		}, addValue: function (e, t) {
			var n, i = this, r = e.x, o = e.y, a = t.seriesIx, s = i.seriesPoints[a];
			i.updateRange(e, t.series), xt(r) && null !== r && xt(o) && null !== o && (n = i.createPoint(e, t.series, a, t), n && W(n, t)), i.points.push(n), s.push(n)
		}, updateRange: function (e, t) {
			var n = this, i = e.x, r = e.y, o = t.xAxis, a = t.yAxis, s = n.xAxisRanges[o], l = n.yAxisRanges[a];
			xt(i) && null !== i && (s = n.xAxisRanges[o] = s || { min: kn, max: wn }, s.min = j.min(s.min, i), s.max = j.max(s.max, i)), xt(r) && null !== r && (l = n.yAxisRanges[a] = l || { min: kn, max: wn }, l.min = j.min(l.min, r), l.max = j.max(l.max, r))
		}, createPoint: function (e, t, n, i) {
			var r, o = this;
			return r = new Oi(e, Z({ markers: { border: { color: t.color }, opacity: t.opacity }, tooltip: { format: o.options.tooltip.format }, labels: { format: o.options.labels.format} }, t, { color: i.color, markers: { border: { color: i.color}} })), o.append(r), r
		}, seriesAxes: function (e) {
			var t = this.plotArea, n = e.xAxis, i = n ? t.namedXAxes[n] : t.axisX, r = e.yAxis, o = r ? t.namedYAxes[r] : t.axisY;
			if (!i)
				throw Error("Unable to locate X axis with name " + n);
			if (!o)
				throw Error("Unable to locate Y axis with name " + r);
			return { x: i, y: o}
		}, reflow: function (e) {
			var t, n, i = this, r = i.points, o = 0;
			i.traverseDataPoints(function (e, a) {
				t = r[o++], n = i.seriesAxes(a.series);
				var s = n.x.getSlot(e.x, e.x), l = n.y.getSlot(e.y, e.y), d = new ot(s.x1, l.y1, s.x2, l.y2);
				t && t.reflow(d)
			}), i.box = e
		}, getViewElements: function (e) {
			var t = this, n = st.fn.getViewElements.call(t, e), i = e.createGroup({ animation: { type: Gt} });
			return i.children = n, [i]
		}, traverseDataPoints: function (e) {
			var t, n, i, r, o, a, s, l = this, d = l.options, c = d.series, u = l.seriesPoints, p = l.bindableFields();
			for (n = 0; c.length > n; n++)
				for (i = c[n], r = u[n], r || (u[n] = []), t = 0; i.data.length > t; t++)
					o = S(i, t, p), a = o.value, s = o.fields, e(a, Z({ pointIx: t, series: i, seriesIx: n, dataItem: i.data[t], owner: l }, s))
		}, bindableFields: function () {
			return ["color"]
		}, formatPointValue: function (e, t) {
			var n = e.value;
			return _t(t, n.x, n.y)
		}
	}), Wi = ji.extend({ render: function () {
		var e = this;
		ji.fn.render.call(e), e.renderSegments()
	} });
	Z(Wi.fn, Bi);
	var qi = ji.extend({ options: { tooltip: { format: "{3}" }, labels: { format: "{3}"} }, addValue: function (e, t) {
		var n, i = this, r = t.series, o = r.negativeValues, a = i.plotArea.options.seriesColors || [], s = !0;
		n = t.color || r.color || a[t.pointIx % a.length], 0 > e.size && (n = o.color || n, s = o.visible), t.color = n, s && ji.fn.addValue.call(this, e, t)
	}, reflow: function (e) {
		var t = this;
		t.updateBubblesSize(e), ji.fn.reflow.call(t, e)
	}, createPoint: function (e, t, n, i) {
		var r, o = this, a = t.data.length, s = i.pointIx * (hn / a), l = { delay: s, duration: hn - s, type: Bt };
		return r = new Mi(e, Z({ tooltip: { format: o.options.tooltip.format }, labels: { format: o.options.labels.format, animation: l} }, t, { color: i.color, markers: { type: Wt, background: i.color, border: t.border, opacity: t.opacity, animation: l} })), o.append(r), r
	}, updateBubblesSize: function (e) {
		var t, n, i = this, r = i.options, o = r.series, a = j.min(e.width(), e.height());
		for (t = 0; o.length > t; t++) {
			var s = o[t], l = i.seriesPoints[t], d = i.maxSize(l), c = s.minSize || j.max(.02 * a, 10), u = s.maxSize || .2 * a, p = c / 2, f = u / 2, h = j.PI * p * p, m = j.PI * f * f, g = m - h, v = g / d;
			for (n = 0; l.length > n; n++) {
				var b = l[n], _ = j.abs(b.value.size) * v, x = j.sqrt((h + _) / j.PI);
				Z(b.options, { markers: { size: 2 * x, zIndex: f - x }, labels: { zIndex: f - x + 1} })
			}
		}
	}, maxSize: function (e) {
		var t, n, i = e.length, r = 0;
		for (t = 0; i > t; t++)
			n = e[t].value.size, r = j.max(r, j.abs(n));
		return r
	}, bindableFields: function () {
		return ["color", "category", "visibleInLegend"]
	}, getViewElements: function (e) {
		var t = this, n = st.fn.getViewElements.call(t, e), i = e.createGroup();
		return i.children = n, [i]
	}, formatPointValue: function (e, t) {
		var n = e.value;
		return _t(t, n.x, n.y, n.size, e.category)
	} }), Gi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.value = e, n.options.id = At(), n.enableDiscovery()
	}, options: { border: { _brightness: .8 }, line: { width: 2 }, overlay: { gradient: pn }, tooltip: { format: "<table style='text-align: left;'><th colspan='2'>{4:d}</th><tr><td>Open:</td><td>{0:C}</td></tr><tr><td>High:</td><td>{1:C}</td></tr><tr><td>Low:</td><td>{2:C}</td></tr><tr><td>Close:</td><td>{3:C}</td></tr></table>" }, highlight: { opacity: 1, border: { width: 1, opacity: 1 }, line: { width: 1, opacity: 1}} }, reflow: function (e) {
		var t, n, i, r = this, o = r.options, a = r.owner, s = r.value, l = a.seriesValueAxis(o), d = [];
		n = l.getSlot(s.open, s.close), i = l.getSlot(s.low, s.high), n.x1 = i.x1 = e.x1, n.x2 = i.x2 = e.x2, r.realBody = n, t = i.center().x, d.push([new ut(t, i.y1), new ut(t, n.y1)]), d.push([new ut(t, n.y2), new ut(t, i.y2)]), r.lowHighLinePoints = d, r.box = i.clone().wrap(n)
	}, getViewElements: function (e) {
		var t = this, n = t.options, i = [], r = n.border.width > 0 ? { stroke: t.getBorderColor(), strokeWidth: n.border.width, dashType: n.border.dashType, strokeOpacity: xt(n.border.opacity) ? n.border.opacity : n.opacity} : {}, o = Z({ id: n.id, fill: t.color, fillOpacity: n.opacity }, r), a = { id: n.id, strokeOpacity: xt(n.line.opacity) ? n.line.opacity : n.opacity, strokeWidth: n.line.width, stroke: n.line.color || t.color, dashType: n.line.dashType, strokeLineCap: "butt" }, s = e.createGroup({ animation: { type: Gt} });
		return n.overlay && (o.overlay = Z({ rotation: 0 }, n.overlay)), i.push(e.createRect(t.realBody, o)), i.push(e.createPolyline(t.lowHighLinePoints[0], !1, a)), i.push(e.createPolyline(t.lowHighLinePoints[1], !1, a)), i.push(t.createOverlayRect(e, n)), bt(i, st.fn.getViewElements.call(t, e)), s.children = i, [s]
	}, getBorderColor: function () {
		var e = this, t = e.options, n = e.color, i = t.border, r = i.color;
		return xt(r) || (r = new lt(n).brightness(i._brightness).toHex()), r
	}, createOverlayRect: function (e, t) {
		return e.createRect(this.box, { id: t.id, data: { modelId: t.modelId }, fill: "#fff", fillOpacity: 0 })
	}, highlightOverlay: function (e, t) {
		var n = this, i = n.options, r = i.highlight, o = r.border, a = n.getBorderColor(), s = r.line, l = { data: { modelId: i.modelId} }, d = Z({}, l, t, { stroke: a, strokeOpacity: o.opacity, strokeWidth: o.width }), c = Z({}, l, { stroke: s.color || a, strokeWidth: s.width, strokeOpacity: s.opacity, strokeLineCap: "butt" }), u = e.createGroup();
		return u.children.push(e.createRect(n.realBody, d)), u.children.push(e.createPolyline(n.lowHighLinePoints[0], !1, c)), u.children.push(e.createPolyline(n.lowHighLinePoints[1], !1, c)), u
	}, tooltipAnchor: function () {
		var e = this, t = e.box;
		return new ut(t.x2 + ni, t.y1 + ni)
	}, formatValue: function (e) {
		var t = this;
		return t.owner.formatPointValue(t, e)
	} });
	Z(Gi.fn, Ii);
	var $i = zi.extend({ options: {}, bindableFields: function () {
		return ["color", "downColor"]
	}, reflowCategories: function (e) {
		var t, n = this, i = n.children, r = i.length;
		for (t = 0; r > t; t++)
			i[t].reflow(e[t])
	}, addValue: function (e, t, n, i, r) {
		var o, a, s = this, l = s.options, d = e.value, c = s.children, u = e.fields.color || i.color, p = this.splitValue(d), f = H(p);
		f && (o = s.createPoint(d, i)), a = c[n], a || (a = new Ei({ vertical: l.invertAxes, gap: l.gap, spacing: l.spacing }), s.append(a)), o && (s.updateRange(d, n, i), a.append(o), i.type == Lt && d.open > d.close && (u = e.fields.downColor || i.downColor), o.color = u, o.categoryIx = n, o.category = t, o.series = i, o.seriesIx = r, o.owner = s, o.dataItem = i.data[n]), s.points.push(o)
	}, createPoint: function (e, t) {
		return new Gi(e, t)
	}, splitValue: function (e) {
		return [e.low, e.open, e.close, e.high]
	}, updateRange: function (e, t, n) {
		var i = this, r = n.axis, o = i.valueAxisRanges[r], a = i.splitValue(e);
		o = i.valueAxisRanges[r] = o || { min: kn, max: wn }, o = i.valueAxisRanges[r] = { min: j.min.apply(j, a.concat([o.min])), max: j.max.apply(j, a.concat([o.max]))}
	}, formatPointValue: function (e, t) {
		var n = e.value;
		return _t(t, n.open, n.high, n.low, n.close, e.category)
	} }), Yi = Gi.extend({ reflow: function (e) {
		var t, n, i, r, o = this, a = o.options, s = o.owner, l = o.value, d = s.seriesValueAxis(a), c = [], u = [], p = [];
		r = d.getSlot(l.low, l.high), n = d.getSlot(l.open, l.open), i = d.getSlot(l.close, l.close), n.x1 = i.x1 = r.x1 = e.x1, n.x2 = i.x2 = r.x2 = e.x2, t = r.center().x, c.push(new ut(n.x1, n.y1)), c.push(new ut(t, n.y1)), u.push(new ut(t, i.y1)), u.push(new ut(i.x2, i.y1)), p.push(new ut(t, r.y1)), p.push(new ut(t, r.y2)), o.oPoints = c, o.cPoints = u, o.lhPoints = p, o.box = r.clone().wrap(n.clone().wrap(i))
	}, getViewElements: function (e) {
		var t = this, n = t.options, i = [], r = { id: n.id, strokeOpacity: n.opacity, zIndex: -1, strokeWidth: n.width, stroke: t.color, dashType: n.dashType }, o = e.createGroup({ animation: { type: Gt} });
		return i.push(t.createOverlayRect(e, n)), i.push(e.createPolyline(t.oPoints, !0, r)), i.push(e.createPolyline(t.cPoints, !0, r)), i.push(e.createPolyline(t.lhPoints, !0, r)), bt(i, st.fn.getViewElements.call(t, e)), o.children = i, [o]
	}, highlightOverlay: function (e) {
		var t = this, n = t.options, i = n.highlight, r = { data: { modelId: n.modelId} }, o = Z(r, { strokeWidth: i.line.width, strokeOpacity: i.line.opacity, stroke: i.line.color || t.color }), a = e.createGroup();
		return a.children.push(e.createPolyline(t.oPoints, !0, o)), a.children.push(e.createPolyline(t.cPoints, !0, o)), a.children.push(e.createPolyline(t.lhPoints, !0, o)), a
	} }), Qi = $i.extend({ createPoint: function (e, t) {
		return new Yi(e, t)
	}, bindableFields: function () {
		return ["color"]
	} }), Ki = st.extend({ init: function (e, t, n) {
		var i = this;
		i.value = e, i.sector = t, i.enableDiscovery(), st.fn.init.call(i, n)
	}, options: { color: ci, overlay: { gradient: Mn }, border: { width: .5 }, labels: { visible: !1, distance: 35, font: en, margin: kt(.5), align: Wt, zIndex: 1, position: In }, animation: { type: zn }, highlight: { visible: !0, border: { width: 1}} }, render: function () {
		var e, t = this, n = t.options, i = n.labels, r = t.value;
		t._rendered || (t._rendered = !0, i.template ? (e = J(i.template), r = e({ dataItem: t.dataItem, category: t.category, value: t.value, series: t.series, percentage: t.percentage })) : i.format && (r = _t(i.format, r)), i.visible && r && (t.label = new mt(r, Z({}, i, { id: At(), align: Ut, vAlign: "", animation: { type: un, delay: t.animationDelay} })), t.append(t.label)))
	}, reflow: function (e) {
		var t = this;
		t.render(), t.box = e, t.reflowLabel()
	}, reflowLabel: function () {
		var e, t, n, i, r = this, o = r.sector.clone(), a = r.options, s = r.label, l = a.labels, d = l.distance, c = o.middle();
		s && (i = s.box.height(), n = s.box.width(), l.position == Ut ? (o.r = j.abs((o.r - i) / 2) + i, e = o.point(c), s.reflow(new ot(e.x, e.y - i / 2, e.x, e.y))) : l.position == gn ? (o.r = o.r - i / 2, e = o.point(c), s.reflow(new ot(e.x, e.y - i / 2, e.x, e.y))) : (e = o.clone().expand(d).point(c), e.x >= o.c.x ? (t = e.x + n, s.orientation = On) : (t = e.x - n, s.orientation = bn), s.reflow(new ot(t, e.y - i, e.x, e.y))))
	}, getViewElements: function (e) {
		var t = this, n = t.sector, i = t.options, r = i.border || {}, o = r.width > 0 ? { stroke: r.color, strokeWidth: r.width, dashType: r.dashType} : {}, a = [], s = i.overlay;
		return s && (s = Z({}, i.overlay, { r: n.r, ir: n.ir, cx: n.c.x, cy: n.c.y, bbox: n.getBBox() })), t.value && a.push(t.createSegment(e, n, Z({ id: i.id, fill: i.color, overlay: s, fillOpacity: i.opacity, strokeOpacity: i.opacity, animation: Z(i.animation, { delay: t.animationDelay }), data: { modelId: i.modelId }, zIndex: i.zIndex, singleSegment: 1 === (t.options.data || []).length }, o))), bt(a, st.fn.getViewElements.call(t, e)), a
	}, createSegment: function (e, t, n) {
		return n.singleSegment ? e.createCircle(t.c, t.r, n) : e.createSector(t, n)
	}, highlightOverlay: function (e, t) {
		var n, i = this, r = i.options.highlight || {}, o = r.border || {}, a = i.options.id + Pn;
		return t = Z({}, t, { id: a }), 0 !== i.value && (n = i.createSegment(e, i.sector, Z({}, t, { fill: r.color, fillOpacity: r.opacity, strokeOpacity: o.opacity, strokeWidth: o.width, stroke: o.color, data: { modelId: i.options.modelId} }))), n
	}, tooltipAnchor: function (e, t) {
		var n = this, i = n.sector.clone().expand(15), r = e / 2, o = t / 2, a = i.middle(), s = a * on, l = i.point(a), d = l.x - r, c = l.y - o, u = j.sin(s), p = j.cos(s);
		return .9 > j.abs(u) && (d += r * -p / j.abs(p)), .9 > j.abs(p) && (c += o * -u / j.abs(u)), new ut(d, c)
	}, formatValue: function (e) {
		var t = this;
		return t.owner.formatPointValue(t, e)
	} });
	Z(Ki.fn, Ii);
	var Xi = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.plotArea = e, n.segments = [], n.legendItems = [], n.render()
	}, options: { startAngle: 90, connectors: { width: 1, color: "#939393", padding: 4} }, render: function () {
		var e = this;
		e.traverseDataPoints(q(e.addValue, e))
	}, traverseDataPoints: function (e) {
		var t, n, i, r, o, a, s, l, d, c, u, p, f = this, h = f.options, m = f.plotArea.options.seriesColors || [], g = h.startAngle, v = m.length, b = h.series, _ = b.length, x = At(), k = f.bindableFields();
		for (r = 0; _ > r; r++)
			for (t = b[r], a = t.data, c = f.pointsTotal(t), s = 360 / c, u = g, r != _ - 1 && t.labels.position == In && (t.labels.position = Ut), p = 0; a.length > p; p++)
				n = S(t, p, k), l = n.value, i = n.fields, o = Tt(l * s, nn), d = 1 != a.length && !!i.explode, t.color = i.color || m[p % v], e(l, new ft(null, 0, 0, u, o), { owner: f, category: i.category || "", categoryIx: p, series: t, seriesIx: r, dataItem: a[p], percentage: l / c, explode: d, visibleInLegend: i.visibleInLegend, overlay: { id: x + r }, zIndex: _ - r, animationDelay: f.animationDelay(p, r, _) }), u += o
	}, bindableFields: function () {
		return ["category", "color", "explode", "visibleInLegend"]
	}, addValue: function (e, t, n) {
		var i, r = this;
		r.createLegendItem(e, n), e && (i = new Ki(e, t, n.series), i.options.id = At(), W(i, n), r.append(i), r.segments.push(i))
	}, createLegendItem: function (e, t) {
		var n, i, r = this, o = (r.options.legend || {}).labels || {};
		t && t.visibleInLegend !== !1 && (n = t.category || "", (o || {}).template && (i = J(o.template), n = i({ text: n, series: t.series, dataItem: t.dataItem, percentage: t.percentage, value: e })), r.legendItems.push({ name: n, color: t.series.color }))
	}, pointsTotal: function (e) {
		var t, n = e.data, i = n.length, r = 0;
		for (t = 0; i > t; t++)
			r += S(e, t).value;
		return r
	}, reflow: function (e) {
		var t, n, i, r, o, a, s, l, d = this, c = d.options, u = e.clone(), p = 5, f = j.min(u.width(), u.height()), h = f / 2, m = f - .85 * f, g = xt(c.padding) ? c.padding : m, v = new ot(u.x1, u.y1, u.x1 + f, u.y1 + f), b = v.center(), _ = d.seriesConfigs || [], x = u.center(), k = d.segments, w = k.length, y = c.series.length, C = [], T = [];
		for (g = g > h - p ? h - p : g, v.translate(x.x - b.x, x.y - b.y), a = h - g, l = new ut(a + v.x1 + g, a + v.y1 + g), s = 0; w > s; s++)
			r = k[s], o = r.sector, o.r = a, o.c = l, n = r.seriesIx, _.length && (t = _[n], o.ir = t.ir, o.r = t.r), n == y - 1 && r.explode && (o.c = o.clone().radius(.15 * o.r).point(o.middle())), r.reflow(v), i = r.label, i && i.options.position === In && n == y - 1 && (i.orientation === On ? T.push(i) : C.push(i));
		C.length > 0 && (C.sort(d.labelComparator(!0)), d.leftLabelsReflow(C)), T.length > 0 && (T.sort(d.labelComparator(!1)), d.rightLabelsReflow(T)), d.box = v
	}, leftLabelsReflow: function (e) {
		var t = this, n = t.distanceBetweenLabels(e);
		t.distributeLabels(n, e)
	}, rightLabelsReflow: function (e) {
		var t = this, n = t.distanceBetweenLabels(e);
		t.distributeLabels(n, e)
	}, distanceBetweenLabels: function (e) {
		var t, n, i, r = this, o = r.segments, a = o[o.length - 1], s = a.sector, l = e[0].box, d = e.length - 1, c = [], u = s.r + a.options.labels.distance;
		for (n = Tt(l.y1 - (s.c.y - u - l.height() - l.height() / 2)), c.push(n), i = 0; d > i; i++)
			l = e[i].box, t = e[i + 1].box, n = Tt(t.y1 - l.y2), c.push(n);
		return n = Tt(s.c.y + u - e[d].box.y2 - e[d].box.height() / 2), c.push(n), c
	}, distributeLabels: function (e, t) {
		var n, i, r, o, a = this, s = e.length;
		for (o = 0; s > o; o++)
			for (i = r = o, n = -e[o]; n > 0 && (i >= 0 || s > r);)
				n = a._takeDistance(e, o, --i, n), n = a._takeDistance(e, o, ++r, n);
		a.reflowLabels(e, t)
	}, _takeDistance: function (e, t, n, i) {
		if (e[n] > 0) {
			var r = j.min(e[n], i);
			i -= r, e[n] -= r, e[t] += r
		}
		return i
	}, reflowLabels: function (e, t) {
		var n, i, r, o, a = this, s = a.segments, l = s[s.length - 1], d = l.sector, c = t.length, u = l.options.labels, p = u.distance, f = d.c.y - (d.r + p) - t[0].box.height();
		for (e[0] += 2, o = 0; c > o; o++)
			n = t[o], f += e[o], r = n.box, i = a.hAlignLabel(r.x2, d.clone().expand(p), f, f + r.height(), n.orientation == On), n.orientation == On ? (u.align !== Wt && (i = d.r + d.c.x + p), n.reflow(new ot(i + r.width(), f, i, f))) : (u.align !== Wt && (i = d.c.x - d.r - p), n.reflow(new ot(i - r.width(), f, i, f))), f += r.height()
	}, getViewElements: function (e) {
		var t, n, i, r, o, s, l, d, c = this, u = c.options, p = u.connectors, f = c.segments, h = f.length, m = 4, g = [];
		for (d = 0; h > d; d++)
			if (o = f[d], n = o.sector, i = n.middle(), l = o.label, s = { seriesId: o.seriesIx }, l && (r = [], l.options.position === In && 0 !== o.value)) {
				var v, b, _, x = l.box, k = n.c, w = n.point(i), y = new ut(x.x1, x.center().y);
				w = n.clone().expand(p.padding).point(i), r.push(w), l.orientation == On ? (b = new ut(x.x1 - p.padding, x.center().y), _ = a(k, w, y, b), y = new ut(b.x - m, b.y), _ = _ || y, _.x = j.min(_.x, y.x), c.pointInCircle(_, n.c, n.r + m) || n.c.x > _.x ? (v = n.c.x + n.r + m, o.options.labels.align !== $t ? y.x > v ? r.push(new ut(v, w.y)) : r.push(new ut(w.x + 2 * m, w.y)) : r.push(new ut(v, w.y)), r.push(new ut(y.x, b.y))) : (_.y = b.y, r.push(_))) : (b = new ut(x.x2 + p.padding, x.center().y), _ = a(k, w, y, b), y = new ut(b.x + m, b.y), _ = _ || y, _.x = j.max(_.x, y.x), c.pointInCircle(_, n.c, n.r + m) || _.x > n.c.x ? (v = n.c.x - n.r - m, o.options.labels.align !== $t ? v > y.x ? r.push(new ut(v, w.y)) : r.push(new ut(w.x - 2 * m, w.y)) : r.push(new ut(v, w.y)), r.push(new ut(y.x, b.y))) : (_.y = b.y, r.push(_))), r.push(b), t = e.createPolyline(r, !1, { id: At(), stroke: p.color, strokeWidth: p.width, animation: { type: un, delay: o.animationDelay }, data: { modelId: o.options.modelId} }), g.push(t)
			}
		return bt(g, st.fn.getViewElements.call(c, e)), g
	}, labelComparator: function (e) {
		return e = e ? -1 : 1, function (t, n) {
			return t = (t.parent.sector.middle() + 270) % 360, n = (n.parent.sector.middle() + 270) % 360, (t - n) * e
		}
	}, hAlignLabel: function (e, t, n, i, r) {
		var o = t.c.x, a = t.c.y, s = t.r, l = j.min(j.abs(a - n), j.abs(a - i));
		return l > s ? e : o + j.sqrt(s * s - l * l) * (r ? 1 : -1)
	}, pointInCircle: function (e, t, n) {
		return h(n) > h(t.x - e.x) + h(t.y - e.y)
	}, formatPointValue: function (e, t) {
		return _t(t, e.value)
	}, animationDelay: function (e) {
		return e * Rn
	} }), Ji = Ki.extend({ options: { overlay: { gradient: Hn }, labels: { position: Ut }, animation: { type: zn} }, reflowLabel: function () {
		var e, t, n = this, i = n.sector.clone(), r = n.options, o = n.label, a = r.labels, s = i.middle();
		o && (t = o.box.height(), a.position == Ut ? (i.r -= (i.r - i.ir) / 2, e = i.point(s), o.reflow(new ot(e.x, e.y - t / 2, e.x, e.y))) : Ki.fn.reflowLabel.call(n))
	}, createSegment: function (e, t, n) {
		return e.createRing(t, n)
	} });
	Z(Ji.fn, Ii);
	var Zi = Xi.extend({ options: { startAngle: 90, connectors: { width: 1, color: "#939393", padding: 4} }, addValue: function (e, t, n) {
		var i, r = this;
		r.createLegendItem(e, n), e && (i = new Ji(e, t, n.series), i.options.id = At(), W(i, n), r.append(i), r.segments.push(i))
	}, reflow: function (e) {
		var t, n, i, r, o, a, s = this, l = s.options, d = e.clone(), c = 5, u = j.min(d.width(), d.height()), p = u / 2, f = u - .85 * u, h = xt(l.padding) ? l.padding : f, m = l.series, g = m.length, v = 0, b = 0, _ = 0, x = 0;
		for (s.seriesConfigs = [], h = h > p - c ? p - c : h, i = p - h, o = 0; g > o; o++)
			t = m[o], 0 === o && xt(t.holeSize) && (n = t.holeSize, i -= t.holeSize), xt(t.size) ? i -= t.size : v++, xt(t.margin) && o != g - 1 && (i -= t.margin);
		for (xt(n) || (x = (p - h) / (g + .75), n = .75 * x, i -= n), _ = n, o = 0; g > o; o++)
			t = m[o], r = xt(t.size) ? t.size : i / v, _ += b, a = _ + r, s.seriesConfigs.push({ ir: _, r: a }), b = t.margin || 0, _ = a;
		Xi.fn.reflow.call(s, e)
	}, animationDelay: function (e, t, n) {
		return e * sn + hn * (t + 1) / (n + 1)
	} }), er = at.extend({ init: function (e) {
		var t = this;
		at.fn.init.call(t, e), e = t.options, e.id = At(), t.title = gt.buildTitle(e.title, t, er.fn.options.title), t.content = new st, t.append(t.content), t.axes = [], t.charts = []
	}, options: { zIndex: -1, shrinkToFit: !0, title: { align: bn }, visible: !0 }, appendAxis: function (e) {
		var t = this;
		t.content.append(e), t.axes.push(e), e.pane = t
	}, appendChart: function (e) {
		var t = this;
		t.charts.push(e), t.content.append(e), e.pane = t
	}, empty: function () {
		var e, t = this, n = t.parent;
		if (n) {
			for (e = 0; t.axes.length > e; e++)
				n.removeAxis(t.axes[e]);
			for (e = 0; t.charts.length > e; e++)
				n.removeChart(t.charts[e])
		}
		t.axes = [], t.charts = [], t.content.disableDiscovery(), t.content.children = []
	}, reflow: function (e) {
		var t = this;
		Ct(t.children) === t.content && t.children.pop(), at.fn.reflow.call(t, e), t.title && (t.contentBox.y1 += t.title.box.height())
	}, getViewElements: function (e) {
		var t = this, n = zi.fn.getViewElements.call(t, e), i = e.createGroup({ id: t.options.id }), r = [];
		return i.children = n.concat(t.renderGridLines(e), t.content.getViewElements(e)), t.view = e, t.options.visible && (r = [i]), r
	}, renderGridLines: function (e) {
		var t, n, i, r, o, a, s = this, l = s.axes, d = l.concat(s.parent.axes), c = [], u = [];
		for (n = 0; l.length > n; n++)
			for (r = l[n], o = r.options.vertical, t = o ? c : u, i = 0; d.length > i; i++)
				0 === t.length && (a = d[i], o !== a.options.vertical && bt(t, r.renderGridLines(e, a, r)));
		return c.concat(u)
	}, refresh: function () {
		var e = this, t = e.view, n = document.getElementById(e.options.id);
		t && n && n.parentNode.replaceChild(t.renderElement(e.getViewElements(t)[0]), n)
	} }), tr = st.extend({ init: function (e, t) {
		var n = this;
		st.fn.init.call(n, t), n.series = e, n.charts = [], n.options.legend.items = [], n.axes = [], n.options.id = At(), n.enableDiscovery(), n.createPanes(), n.render()
	}, options: { series: [], plotArea: { margin: {} }, background: "", border: { color: Mt, width: 0 }, legend: {} }, createPanes: function () {
		var e, t, n = this, i = [], r = n.options.panes || [], o = j.max(r.length, 1);
		for (e = 0; o > e; e++)
			t = new er(r[e]), t.paneIndex = e, i.push(t), n.append(t);
		n.panes = i
	}, findPane: function (e) {
		var t, n, i = this, r = i.panes;
		for (t = 0; r.length > t; t++)
			if (r[t].options.name === e) {
				n = r[t];
				break
			}
		return n || r[0]
	}, findPointPane: function (e) {
		var t, n, i = this, r = i.panes;
		for (t = 0; r.length > t; t++)
			if (r[t].box.containsPoint(e)) {
				n = r[t];
				break
			}
		return n
	}, appendAxis: function (e) {
		var t = this, n = t.findPane(e.options.pane);
		n.appendAxis(e), t.axes.push(e), e.plotArea = t
	}, removeAxis: function (e) {
		var t, n, i = this, r = [];
		for (t = 0; i.axes.length > t; t++)
			n = i.axes[t], e !== n && r.push(n);
		i.axes = r
	}, appendChart: function (e, t) {
		var n = this;
		n.charts.push(e), n.addToLegend(e), t ? t.appendChart(e) : n.append(e)
	}, removeChart: function (e) {
		var t, n, i = this, r = [];
		for (t = 0; i.charts.length > t; t++)
			n = i.charts[t], n !== e && r.push(n);
		i.charts = r
	}, addToLegend: function (e) {
		var t, n, i, r, o = e.options.series, a = o.length, s = [], l = this.options.legend.labels || {};
		if (e.legendItems)
			s = e.legendItems;
		else
			for (t = 0; a > t; t++)
				n = o[t], n.visibleInLegend !== !1 && (i = n.name || "", l.template && (r = J(l.template), i = r({ text: i, series: n })), s.push({ name: i, color: n.color }));
		bt(this.options.legend.items, s)
	}, groupAxes: function (e) {
		var t, n, i, r, o = [], a = [];
		for (i = 0; e.length > i; i++)
			for (t = e[i].axes, r = 0; t.length > r; r++)
				n = t[r], n.options.vertical ? a.push(n) : o.push(n);
		return { x: o, y: a, any: o.concat(a)}
	}, groupSeriesByPane: function () {
		var e, t, n, i = this, r = i.series, o = {};
		for (e = 0; r.length > e; e++)
			n = r[e], t = i.seriesPaneName(n), o[t] ? o[t].push(n) : o[t] = [n];
		return o
	}, filterSeriesByType: function (e, t) {
		var n, i, r = [];
		for (t = [].concat(t), n = 0; e.length > n; n++)
			i = e[n], wt(i.type, t) && r.push(i);
		return r
	}, reflow: function (e) {
		var t = this, n = t.options.plotArea, i = t.panes, r = kt(n.margin);
		t.box = e.clone().unpad(r), t.reflowPanes(), t.reflowAxes(i), t.reflowCharts(i)
	}, redraw: function (e) {
		var t, n = this;
		for (e = [].concat(e), t = 0; e.length > t; t++)
			e[t].empty();
		for (n.render(e), n.reflowAxes(n.panes), n.reflowCharts(e), t = 0; e.length > t; t++)
			e[t].refresh()
	}, axisCrossingValues: function (e, t) {
		var n, i = e.options, r = [].concat(i.axisCrossingValues || i.axisCrossingValue), o = t.length - r.length, a = r[0] || 0;
		for (n = 0; o > n; n++)
			r.push(a);
		return r
	}, alignAxisTo: function (e, t, n, i) {
		var r = e.getSlot(n, n), o = e.options.reverse ? 2 : 1, a = t.getSlot(i, i), s = t.options.reverse ? 2 : 1, l = e.box.translate(a[ui + s] - r[ui + o], a[pi + s] - r[pi + o]);
		e.pane !== t.pane && l.translate(0, e.pane.box.y1 - t.pane.box.y1), e.reflow(l)
	}, alignAxes: function (e, t) {
		var n, i, r, o, a = this, s = e[0], l = t[0], d = a.axisCrossingValues(s, t), c = a.axisCrossingValues(l, e), u = {}, p = {}, f = {}, h = {};
		for (o = 0; t.length > o; o++)
			r = t[o], n = r.pane, i = n.options.id, a.alignAxisTo(r, s, c[o], d[o]), r.options._overlap || (Tt(r.lineBox().x1) === Tt(s.lineBox().x1) && (u[i] && r.reflow(r.box.alignTo(u[i].box, bn).translate(-r.options.margin, 0)), u[i] = r), Tt(r.lineBox().x2) === Tt(s.lineBox().x2) && (r._mirrored || (r.options.labels.mirror = !r.options.labels.mirror, r._mirrored = !0), a.alignAxisTo(r, s, c[o], d[o]), p[i] && r.reflow(r.box.alignTo(p[i].box, On).translate(r.options.margin, 0)), p[i] = r), 0 !== o && l.pane === r.pane && r.alignTo(l));
		for (o = 0; e.length > o; o++)
			r = e[o], n = r.pane, i = n.options.id, a.alignAxisTo(r, l, d[o], c[o]), r.options._overlap || (Tt(r.lineBox().y1) === Tt(l.lineBox().y1) && (r._mirrored || (r.options.labels.mirror = !r.options.labels.mirror, r._mirrored = !0), a.alignAxisTo(r, l, d[o], c[o]), f[i] && r.reflow(r.box.alignTo(f[i].box, ei).translate(0, -r.options.margin)), f[i] = r), Tt(r.lineBox().y2, Yt) === Tt(l.lineBox().y2, Yt) && (h[i] && r.reflow(r.box.alignTo(h[i].box, Ht).translate(0, r.options.margin)), h[i] = r), 0 !== o && r.alignTo(s))
	}, shrinkAxisWidth: function (e) {
		var t, n, i, r = this, o = r.groupAxes(e).any, a = P(o), s = 0;
		for (t = 0; e.length > t; t++)
			n = e[t], n.axes.length > 0 && (s = j.max(s, a.width() - n.contentBox.width()));
		for (t = 0; o.length > t; t++)
			i = o[t], i.options.vertical || i.reflow(i.box.shrink(s, 0))
	}, shrinkAxisHeight: function (e) {
		var t, n, i, r, o, a;
		for (t = 0; e.length > t; t++)
			for (n = e[t], i = n.axes, r = j.max(0, P(i).height() - n.contentBox.height()), o = 0; i.length > o; o++)
				a = i[o], a.options.vertical && a.reflow(a.box.shrink(0, r))
	}, fitAxes: function (e) {
		var t, n, i, r, o, a, s, l, d = this, c = d.groupAxes(e).any, u = 0;
		for (s = 0; e.length > s; s++)
			if (o = e[s], t = o.axes, n = o.contentBox, t.length > 0)
				for (i = P(t), u = j.max(u, n.x1 - i.x1), r = j.max(n.y1 - i.y1, n.y2 - i.y2), l = 0; t.length > l; l++)
					a = t[l], a.reflow(a.box.translate(0, r));
		for (s = 0; c.length > s; s++)
			a = c[s], a.reflow(a.box.translate(u, 0))
	}, reflowAxes: function (e) {
		var t, n = this, i = n.groupAxes(e);
		for (t = 0; e.length > t; t++)
			n.reflowPaneAxes(e[t]);
		i.x.length > 0 && i.y.length > 0 && (n.alignAxes(i.x, i.y), n.shrinkAxisWidth(e), n.alignAxes(i.x, i.y), n.shrinkAxisHeight(e), n.alignAxes(i.x, i.y), n.fitAxes(e))
	}, reflowPaneAxes: function (e) {
		var t, n = e.axes, i = n.length;
		if (i > 0)
			for (t = 0; i > t; t++)
				n[t].reflow(e.contentBox)
	}, reflowCharts: function (e) {
		var t, n, i = this, r = i.charts, o = r.length, a = i.box;
		for (n = 0; o > n; n++)
			t = r[n].pane, (!t || wt(t, e)) && r[n].reflow(a)
	}, reflowPanes: function () {
		var e, t, n, i, r, o = this, a = o.box, s = o.panes, l = s.length, d = a.height(), c = l, u = 0, p = a.y1;
		for (e = 0; l > e; e++)
			t = s[e], i = t.options.height, t.options.width = a.width(), t.options.height ? (i.indexOf && i.indexOf("%") && (r = parseInt(i, 10) / 100, t.options.height = r * a.height()), t.reflow(a.clone()), d -= t.options.height) : u++;
		for (e = 0; l > e; e++)
			t = s[e], t.options.height || (t.options.height = d / u);
		for (e = 0; l > e; e++)
			t = s[e], n = a.clone().move(a.x1, p), t.reflow(n), c--, p += t.options.height
	}, backgroundBox: function () {
		var e, t, n, i, r, o, a = this, s = a.axes, l = s.length;
		for (n = 0; l > n; n++)
			for (r = s[n], i = 0; l > i; i++)
				o = s[i], r.options.vertical !== o.options.vertical && (e = r.lineBox().clone().wrap(o.lineBox()), t = t ? t.wrap(e) : e);
		return t || a.box
	}, getViewElements: function (e) {
		var t = this, n = t.backgroundBox(), i = t.options, r = i.plotArea, o = r.border || {}, a = st.fn.getViewElements.call(t, e);
		return bt(a, [e.createRect(n, { fill: r.background, fillOpacity: r.opacity, zIndex: -2, strokeWidth: .1 }), e.createRect(n, { id: i.id, data: { modelId: i.modelId }, stroke: o.width ? o.color : "", strokeWidth: o.width, fill: ci, fillOpacity: 0, zIndex: -1, dashType: o.dashType })]), a
	} }), nr = tr.extend({ init: function (e, t) {
		var n = this;
		n.namedCategoryAxes = {}, n.namedValueAxes = {}, n.valueAxisRangeTracker = new ir, e.length > 0 && (n.invertAxes = wt(e[0].type, [Rt, li, si])), tr.fn.init.call(n, e, t)
	}, options: { categoryAxis: { categories: [] }, valueAxis: {} }, render: function (e) {
		var t = this;
		e = e || t.panes, t.createCategoryAxes(e), t.aggregateDateSeries(e), t.createCharts(e), t.createValueAxes(e)
	}, removeAxis: function (e) {
		var t = this, n = e.options.name;
		tr.fn.removeAxis.call(t, e), e instanceof Ti ? delete t.namedCategoryAxes[n] : (t.valueAxisRangeTracker.reset(n), delete t.namedValueAxes[n]), e === t.categoryAxis && delete t.categoryAxis, e === t.valueAxis && delete t.valueAxis
	}, createCharts: function (e) {
		var t, n, i, r = this, o = r.groupSeriesByPane();
		for (t = 0; e.length > t; t++)
			n = e[t], i = o[n.options.name || "default"], i && (r.createAreaChart(r.filterSeriesByType(i, [Ft, si]), n), r.createBarChart(r.filterSeriesByType(i, [$t, Rt]), n), r.createLineChart(r.filterSeriesByType(i, [_n, li]), n), r.createCandlestickChart(r.filterSeriesByType(i, Lt), n), r.createOHLCChart(r.filterSeriesByType(i, Fn), n))
	}, aggregateDateSeries: function (e) {
		var t, i, r, o, a, s, l, d, c, u, p, f, h, m, g, v, b = this, _ = b.srcSeries || b.series, x = [];
		for (l = 0; _.length > l; l++) {
			if (d = _[l], c = Z({}, d), t = b.seriesCategoryAxis(d), i = b.findPane(t.options.pane), wt(i, e) && z(t.options.type, Xt))
				for (r = t.options.categories, o = t.categoryMap, u = c.data, c.data = p = [], a = 0; r.length > a; a++) {
					for (s = o[a], f = [], h = 0; s.length > h; h++)
						m = s[h], g = S(d, m), v = g.value, xt(v) && f.push(g.value);
					p[a] = f.length > 1 ? n(f, d) : u[s[0]]
				}
			x.push(c)
		}
		b.srcSeries = _, b.series = x
	}, appendChart: function (e, t) {
		for (var n = this, i = e.options.series, r = n.seriesCategoryAxis(i[0]), o = r.options.categories, a = j.max(0, f(i) - o.length); a--;)
			o.push("");
		n.valueAxisRangeTracker.update(e.valueAxisRanges), tr.fn.appendChart.call(n, e, t)
	}, seriesPaneName: function (t) {
		var n = this, i = n.options, r = t.axis, o = [].concat(i.valueAxis), a = e.grep(o, function (e) {
			return e.name === r
		})[0], s = i.panes || [{}], l = (s[0] || {}).name || "default", d = (a || {}).pane || l;
		return d
	}, seriesCategoryAxis: function (e) {
		var t = this, n = e.categoryAxis, i = n ? t.namedCategoryAxes[n] : t.categoryAxis;
		if (!i)
			throw Error("Unable to locate category axis with name " + n);
		return i
	}, createBarChart: function (e, t) {
		if (0 !== e.length) {
			var n = this, i = e[0], r = new Ri(n, { series: e, invertAxes: n.invertAxes, isStacked: i.stack && e.length > 1, gap: i.gap, spacing: i.spacing });
			n.appendChart(r, t)
		}
	}, createLineChart: function (e, t) {
		if (0 !== e.length) {
			var n = this, i = e[0], r = new Li(n, { invertAxes: n.invertAxes, isStacked: i.stack && e.length > 1, series: e });
			n.appendChart(r, t)
		}
	}, createAreaChart: function (e, t) {
		if (0 !== e.length) {
			var n = this, i = e[0], r = new Ui(n, { invertAxes: n.invertAxes, isStacked: i.stack && e.length > 1, series: e });
			n.appendChart(r, t)
		}
	}, createOHLCChart: function (e, t) {
		if (0 !== e.length) {
			var n = this, i = e[0], r = new Qi(n, { invertAxes: n.invertAxes, gap: i.gap, series: e, spacing: i.spacing });
			n.appendChart(r, t)
		}
	}, createCandlestickChart: function (e, t) {
		if (0 !== e.length) {
			var n = this, i = e[0], r = new $i(n, { invertAxes: n.invertAxes, gap: i.gap, series: e, spacing: i.spacing });
			n.appendChart(r, t)
		}
	}, axisRequiresRounding: function (e, t) {
		var n, i, r = this, o = r.filterSeriesByType(r.series, [Rt, $t, Fn, Lt]);
		for (n = 0; o.length > n; n++)
			if (i = o[n].categoryAxis || "", i === e || !i && 0 === t)
				return !0
	}, createCategoryAxes: function (e) {
		var t, n, i, r, o, a, s, l, d, c = this, u = c.invertAxes, p = [].concat(c.options.categoryAxis), f = [];
		for (t = 0; p.length > t; t++)
			if (n = p[t], i = c.findPane(n.pane), wt(i, e)) {
				if (a = n.name, r = n.categories || [], s = r[0] instanceof Date, o = n.type || "", n = Z({ vertical: u, axisCrossingValue: u ? r.length : 0 }, n), c.axisRequiresRounding(a, t) && (n.justified = !1, n.roundToBaseUnit = !0), l = !o && s || z(o, Xt) ? new Ai(n) : new Ti(n), a) {
					if (c.namedCategoryAxes[a])
						throw Error("Category axis with name " + a + " is already defined");
					c.namedCategoryAxes[a] = l
				}
				l.axisIndex = t, f.push(l), c.appendAxis(l)
			}
		d = c.categoryAxis || f[0], c.categoryAxis = d, u ? c.axisY = d : c.axisX = d
	}, createValueAxes: function (e) {
		var t, n, i, r, o, a, s, l = this, d = l.valueAxisRangeTracker, c = d.query(), u = [].concat(l.options.valueAxis), p = l.invertAxes, f = { vertical: !p }, h = [];
		for (s = 0; u.length > s; s++)
			if (t = u[s], n = l.findPane(t.pane), wt(n, e)) {
				if (a = t.name, o = d.query(a), 0 === s && c && (o.min = j.min(o.min, c.min), o.max = j.max(o.max, c.max)), i = new ct(o.min, o.max, Z({}, f, t)), a) {
					if (l.namedValueAxes[a])
						throw Error("Value axis with name " + a + " is already defined");
					l.namedValueAxes[a] = i
				}
				h.push(i), l.appendAxis(i)
			}
		r = l.valueAxis || h[0], l.valueAxis = r, p ? l.axisX = r : l.axisY = r
	}, click: function (t, n) {
		var i, r, o, a = this, s = t._eventCoordinates(n), l = new ut(s.x, s.y), d = a.pointPane(l), c = [], u = [];
		if (d) {
			for (i = d.axes, r = 0; i.length > r; r++)
				o = i[r], o.getValue ? O(u, o.getValue(l)) : O(c, o.getCategory(l));
			0 === c.length && O(c, a.categoryAxis.getCategory(l)), c.length > 0 && u.length > 0 && t.trigger(Nn, { element: e(n.target), category: F(c), value: F(u) })
		}
	}, pointPane: function (e) {
		var t, n, i = this, r = i.panes;
		for (n = 0; r.length > n; n++)
			if (t = r[n], t.contentBox.containsPoint(e))
				return t
	} }), ir = Y.extend({ init: function () {
		var e = this;
		e.axisRanges = {}
	}, update: function (e) {
		var t, n, i, r = this, o = r.axisRanges;
		for (i in e)
			t = o[i], n = e[i], o[i] = t = t || { min: kn, max: wn }, t.min = j.min(t.min, n.min), t.max = j.max(t.max, n.max)
	}, reset: function (e) {
		delete this.axisRanges[e]
	}, query: function (e) {
		var t = this;
		return t.axisRanges[e] || { min: 0, max: 1}
	} }), rr = tr.extend({ init: function (e, t) {
		var n = this;
		n.namedXAxes = {}, n.namedYAxes = {}, n.xAxisRangeTracker = new ir, n.yAxisRangeTracker = new ir, tr.fn.init.call(n, e, t)
	}, options: { xAxis: {}, yAxis: {} }, render: function (e) {
		var t, n, i, r = this, o = r.groupSeriesByPane();
		for (e = e || r.panes, t = 0; e.length > t; t++)
			n = e[t], i = o[n.options.name || "default"], i && (r.createScatterChart(r.filterSeriesByType(i, Bn), n), r.createScatterLineChart(r.filterSeriesByType(i, Ln), n), r.createBubbleChart(r.filterSeriesByType(i, Bt), n));
		r.createAxes(e)
	}, appendChart: function (e, t) {
		var n = this;
		n.xAxisRangeTracker.update(e.xAxisRanges), n.yAxisRangeTracker.update(e.yAxisRanges), tr.fn.appendChart.call(n, e, t)
	}, removeAxis: function (e) {
		var t = this, n = e.options.name;
		tr.fn.removeAxis.call(t, e), e.options.vertical ? (t.yAxisRangeTracker.reset(n), delete t.namedYAxes[n]) : (t.xAxisRangeTracker.reset(n), delete t.namedXAxes[n]), e === t.axisX && delete t.axisX, e === t.axisY && delete t.axisY
	}, seriesPaneName: function (t) {
		var n = this, i = n.options, r = t.xAxis, o = [].concat(i.xAxis), a = e.grep(o, function (e) {
			return e.name === r
		})[0], s = t.yAxis, l = [].concat(i.yAxis), d = e.grep(l, function (e) {
			return e.name === s
		})[0], c = i.panes || [{}], u = c[0].name || "default", p = (a || {}).pane || (d || {}).pane || u;
		return p
	}, createScatterChart: function (e, t) {
		var n = this;
		e.length > 0 && n.appendChart(new ji(n, { series: e }), t)
	}, createScatterLineChart: function (e, t) {
		var n = this;
		e.length > 0 && n.appendChart(new Wi(n, { series: e }), t)
	}, createBubbleChart: function (e, t) {
		var n = this;
		e.length > 0 && n.appendChart(new qi(n, { series: e }), t)
	}, createXYAxis: function (e, t, n) {
		var i, r, o, a, s, l = this, d = e.name, c = t ? l.namedYAxes : l.namedXAxes, u = t ? l.yAxisRangeTracker : l.xAxisRangeTracker, p = u.query(d), f = u.query(), h = Z({}, e, { vertical: t }), m = l.series;
		for (r = 0; m.length > r; r++)
			if (o = m[r], o[t ? "yAxis" : "xAxis"] == h.name) {
				a = S(o, 0).value, s = a[t ? "y" : "x"] instanceof Date;
				break
			}
		if (0 === n && f && (p.min = j.min(p.min, f.min), p.max = j.max(p.max, f.max)), i = z(h.type, Xt) || !h.type && s ? new Di(p.min, p.max, h) : new ct(p.min, p.max, h), d) {
			if (c[d])
				throw Error((t ? "Y" : "X") + " axis with name " + d + " is already defined");
			c[d] = i
		}
		return l.appendAxis(i), i
	}, createAxes: function (e) {
		var t, n = this, i = n.options, r = [].concat(i.xAxis), o = [], a = [].concat(i.yAxis), s = [];
		L(r, function (i) {
			t = n.findPane(this.pane), wt(t, e) && o.push(n.createXYAxis(this, !1, i))
		}), L(a, function (i) {
			t = n.findPane(this.pane), wt(t, e) && s.push(n.createXYAxis(this, !0, i))
		}), n.axisX = n.axisX || o[0], n.axisY = n.axisY || s[0]
	}, click: function (t, n) {
		var i, r, o, a, s = this, l = t._eventCoordinates(n), d = new ut(l.x, l.y), c = s.axes, u = c.length, p = [], f = [];
		for (i = 0; u > i; i++)
			r = c[i], a = r.options.vertical ? f : p, o = r.getValue(d), null !== o && a.push(o);
		p.length > 0 && f.length > 0 && t.trigger(Nn, { element: e(n.target), x: F(p), y: F(f) })
	} }), or = tr.extend({ render: function () {
		var e = this, t = e.series;
		e.createPieChart(t)
	}, createPieChart: function (e) {
		var t = this, n = e[0], i = new Xi(t, { series: e, padding: n.padding, startAngle: n.startAngle, connectors: n.connectors, legend: t.options.legend });
		t.appendChart(i)
	} }), ar = or.extend({ render: function () {
		var e = this, t = e.series;
		e.createDonutChart(t)
	}, createDonutChart: function (e) {
		var t = this, n = e[0], i = new Zi(t, { series: e, padding: n.padding, startAngle: n.startAngle, connectors: n.connectors, legend: t.options.legend });
		t.appendChart(i)
	} }), sr = dt.extend({ options: { easing: "easeOutElastic", duration: hn }, setup: function () {
		var e, t = this.element, n = t.config;
		t.options.singleSegment && (n = t), this.endRadius = n.r, e = this.startRadius = n.ir || 0, n.r = e
	}, step: function (e) {
		var t = this, n = t.element, i = t.endRadius, r = n.config, o = t.startRadius;
		n.options.singleSegment && (r = n), r.r = yt(o, i, e)
	} }), lr = dt.extend({ options: { easing: "easeOutElastic", duration: hn }, setup: function () {
		var e = this.element;
		e.endRadius = e.radius, e.radius = 0
	}, step: function (e) {
		var t = this.element, n = t.endRadius;
		t.radius = yt(0, n, e)
	} }), dr = vt(Rt, rt), cr = vt(zn, sr), ur = vt(Bt, lr), pr = Y.extend({
		init: function (e, t, n) {
			var i = this;
			i.options = Z({}, i.options, n), i.view = e, i.viewElement = t
		}, options: { fill: ci, fillOpacity: .2, stroke: ci, strokeWidth: 1, strokeOpacity: .2 }, show: function (e) {
			var t, n, i = this, r = i.view, o = i.viewElement;
			i.hide(), e.highlightOverlay && (t = e.highlightOverlay(r, i.options), t && (n = r.renderElement(t), o.appendChild(n), i.overlayElement = n, i.visible = !0)), e.toggleHighlight && (e.toggleHighlight(r), i.point = e, i.visible = !0)
		}, hide: function () {
			var e = this, t = e.overlayElement;
			t && (t.parentNode && t.parentNode.removeChild(t), delete e.overlayElement), e.point && (e.point.toggleHighlight(e.view), delete e.point), e.visible = !1
		}
	}), fr = Y.extend({ init: function (t, n) {
		var i = this;
		i.options = Z({}, i.options, n), n = i.options, i.chartElement = t, i.chartPadding = { top: parseInt(t.css("paddingTop"), 10), left: parseInt(t.css("paddingLeft"), 10) }, i.template = fr.template, i.template || (i.template = fr.template = St("<div class='" + Qt + "tooltip' " + "style='display:none; position: absolute; font: #= d.font #;" + "border: #= d.border.width #px solid;" + "opacity: #= d.opacity #; filter: alpha(opacity=#= d.opacity * 100 #);'>" + "</div>")), i.element = e(i.template(i.options)).appendTo(t)
	}, options: { background: Mt, color: ci, border: { width: 3 }, opacity: 1, animation: { duration: ti} }, show: function (e) {
		var t = this;
		t.point = e, t.showTimeout = setTimeout(q(t._show, t), ii)
	}, _show: function () {
		var e, t, n, i, r, o, a = this, s = a.point, l = a.element, d = a.options, c = a.chartPadding;
		s && (n = "" + s.value, i = Z({}, a.options, s.options.tooltip), i.template ? (t = J(i.template), n = t({ value: s.value, category: s.category, series: s.series, dataItem: s.dataItem, percentage: s.percentage })) : i.format && (n = s.formatValue(i.format)), l.html(n), e = s.tooltipAnchor(l.outerWidth(), l.outerHeight()), r = Tt(e.y + c.top) + "px", o = Tt(e.x + c.left) + "px", a.visible || a.element.css({ top: r, left: o }), a.element.css({ backgroundColor: i.background, borderColor: i.border.color || s.options.color, font: i.font, color: i.color, opacity: i.opacity, borderWidth: i.border.width }).stop(!0, !0).show().animate({ left: o, top: r }, d.animation.duration), a.visible = !0)
	}, hide: function () {
		var e = this;
		clearTimeout(e.showTimeout), e.visible && (e.element.fadeOut(), e.point = null, e.visible = !1)
	} }), hr = { max: function (e) {
		var t = j.max.apply(j, e);
		return isNaN(t) ? r(e) : t
	}, min: function (e) {
		var t = j.min.apply(j, e);
		return isNaN(t) ? i(e) : t
	}, sum: function (e) {
		var t, n, i = e.length, r = 0;
		for (t = 0; i > t; t++)
			n = e[t], xt(n) && !isNaN(n) && (r += n);
		return r
	}, count: function (e) {
		return e.length
	}, avg: function (e) {
		return hr.sum(e) / hr.count(e)
	} }, mr = Q.extend({ init: function (t, n, i) {
		var r, o, a = this, s = t.element, l = n.lineBox(), d = a.getValueAxis(n), c = d.lineBox(), u = "." + Qt;
		Q.fn.init.call(a), a.options = Z({}, a.options, i), i = a.options, a.chart = t, a.chartElement = s, a.categoryAxis = n, a.valueAxis = d, a.template = mr.template, a.template || (a.template = mr.template = St("<div class='" + Qt + "selector' " + "style='width: #= d.width #px; height: #= d.height #px;" + " top: #= d.offset.top #px; left: #= d.offset.left #px;'>" + "<div class='" + Qt + "mask'></div>" + "<div class='" + Qt + "mask'></div>" + "<div class='" + Qt + "selection'>" + "<div class='" + Qt + "handle " + Qt + "leftHandle'><div></div></div>" + "<div class='" + Qt + "handle " + Qt + "rightHandle'><div></div></div>" + "</div></div>")), o = { left: parseInt(s.css("paddingLeft"), 10), right: parseInt(s.css("paddingTop"), 10) }, a.options = Z({}, { width: l.width(), height: c.height(), padding: o, offset: { left: c.x2 + o.left, top: c.y1 + o.right }, from: i.min, to: i.max }, i), a.options.visible && (a.wrapper = r = e(a.template(a.options)).appendTo(s), a.selection = r.find(u + "selection"), a.leftMask = r.find(u + "mask").first(), a.rightMask = r.find(u + "mask").last(), a.leftHandle = r.find(u + "leftHandle"), a.rightHandle = r.find(u + "rightHandle"), a.options.selection = { border: { left: parseFloat(a.selection.css("border-left-width"), 10), right: parseFloat(a.selection.css("border-right-width"), 10)} }, a.leftHandle.css("top", (a.selection.height() - a.leftHandle.height()) / 2), a.rightHandle.css("top", (a.selection.height() - a.rightHandle.height()) / 2), a.move(i.from, i.to), a.bind(a.events, a.options), a.wrapper[0].style.cssText = a.wrapper[0].style.cssText, $.UserEvents ? a.userEvents = new $.UserEvents(a.wrapper, { global: !0, threshold: 5, stopPropagation: !0, multiTouch: !0, start: q(a._start, a), move: q(a._move, a), end: q(a._end, a), tap: q(a._tap, a), gesturestart: q(a._gesturechange, a), gesturechange: q(a._gesturechange, a) }) : a.leftHandle.add(a.rightHandle).removeClass(Qt + "handle"))
	}, events: [Vn, Un, jn], options: { min: wn, max: kn }, destroy: function () {
		var e = this, t = e.userEvents;
		t && t.destroy()
	}, _start: function (t) {
		var n = this, i = n.options, r = e(t.event.target);
		!n._state && r && (n.chart._unsetActivePoint(), n._state = { moveTarget: r.parents(".k-handle").add(r).first(), startLocation: t.x.location, range: { from: i.from, to: i.to} }, n.trigger(Vn, n._state.range) && (n.userEvents.cancel(), n._state = null))
	}, _move: function (e) {
		if (this._state) {
			var t = this, n = t._state, i = t.options, r = i.max - i.min, o = n.startLocation - e.x.location, a = n.range, s = a.to - a.from, l = n.moveTarget, d = t.wrapper.width() / r, c = j.round(o / d);
			l && (e.preventDefault(), l.is(".k-selection") ? (a.from = j.min(j.max(i.min, i.from - c), i.max - s), a.to = j.min(a.from + s, i.max)) : l.is(".k-leftHandle") ? (a.from = j.min(j.max(i.min, i.from - c), i.max - 1), a.to = j.max(a.from + 1, a.to)) : l.is(".k-rightHandle") && (a.to = j.min(j.max(i.min + 1, i.to - c), i.max), a.from = j.min(a.to - 1, a.from)), t.move(a.from, a.to), t.trigger(Un, a))
		}
	}, _end: function () {
		var e = this, t = e._state.range;
		delete e._state, e.set(t.from, t.to), e.trigger(jn, t)
	}, _gesturechange: function (e) {
		if (this._state) {
			var t = this, n = t.chart, i = t._state, r = t.options, o = t.categoryAxis, a = i.range, s = n._toModelCoordinates(e.touches[0].x.location).x, l = n._toModelCoordinates(e.touches[1].x.location).x, d = j.min(s, l), c = j.max(s, l);
			e.preventDefault(), i.moveTarget = null, a.from = o.getCategoryIndex(new tt.Point2D(d)) || r.min, a.to = o.getCategoryIndex(new tt.Point2D(c)) || r.max, t.move(a.from, a.to)
		}
	}, _tap: function (e) {
		var t, n, i = this, r = i.options, o = i.chart._eventCoordinates(e), a = i.categoryAxis, s = a.getCategoryIndex(new tt.Point2D(o.x, a.box.y1)), l = r.to - r.from, d = r.from + l / 2, c = j.round(d - s);
		i._state || (e.preventDefault(), i.chart._unsetActivePoint(), t = j.min(j.max(r.min, r.from - c), r.max - l), n = j.min(t + l, r.max), i.set(t, n), i.trigger(jn))
	}, move: function (e, t) {
		var n, i, r, o, a = this, s = a.options, l = s.offset, d = s.padding, c = s.selection.border, u = a.categoryAxis;
		r = u.getSlot(e), n = Tt(r.x1 - l.left + d.left), a.leftMask.width(n), a.selection.css("left", n), r = u.getSlot(t), i = Tt(s.width - (r.x1 - l.left + d.left)), a.rightMask.width(i), o = s.width - i, o != s.width && (o += c.right), a.rightMask.css("left", o), a.selection.width(j.max(s.width - (n + i) - c.right, 0))
	}, set: function (e, t) {
		var n = this, i = n.options;
		e = I(e, i.min, i.max), t = I(t, e + 1, i.max), i.visible && n.move(e, t), i.from = e, i.to = t
	}, expandLeft: function (e) {
		var t = this, n = t.options;
		t.set(j.min(n.from - e, n.to - 1), n.to)
	}, getValueAxis: function (e) {
		var t, n, i = e.pane.axes, r = i.length;
		for (t = 0; r > t; t++)
			if (n = i[t], n.options.vertical !== e.options.vertical)
				return n
	} });
	W(e.easing, { easeOutElastic: function (e, t, n, i) {
		var r = 1.70158, o = 0, a = i;
		return 0 === e ? n : 1 === e ? n + i : (o || (o = .5), j.abs(i) > a ? (a = i, r = o / 4) : r = o / (2 * j.PI) * j.asin(i / a), a * j.pow(2, -10 * e) * j.sin((1 * e - r) * 1.1 * j.PI / o) + i + n)
	} }), m.cache = {}, tt.ui.plugin(wi), Z(tt, { Aggregates: hr, AreaChart: Ui, Bar: Pi, BarAnimationDecorator: dr, BarChart: Ri, BarLabel: yi, BubbleAnimationDecorator: ur, BubbleChart: qi, CandlestickChart: $i, Candlestick: Gi, CategoricalPlotArea: nr, CategoryAxis: Ti, ClusterLayout: Ei, DateCategoryAxis: Ai, DateValueAxis: Di, DonutChart: Zi, DonutPlotArea: ar, DonutSegment: Ji, Highlight: pr, Legend: Ci, LineChart: Li, LinePoint: Oi, Pane: er, PieAnimation: sr, PieAnimationDecorator: cr, PieChart: Xi, PiePlotArea: or, PieSegment: Ki, ScatterChart: ji, ScatterLineChart: Wi, Selection: mr, ShapeElement: Ni, StackLayout: Fi, Tooltip: fr, OHLCChart: Qi, OHLCPoint: Yi, XYPlotArea: rr, addDuration: b, axisGroupBox: P, validNumbers: H, bindPoint: S, categoriesCount: f, ceilDate: k, duration: C, floorDate: x, lteDateIndex: M, sparseArrayLimits: o, toDate: g, toTime: v })
}(window.kendo.jQuery), function () {
	function e(e, t, i) {
		var r = k(e.from) ? e.from : R, o = k(e.to) ? e.to : z;
		return e.from = n.max(n.min(o, r), t), e.to = n.min(n.max(o, r), i), e
	}
	var t = document, n = Math, i = window.kendo, r = i.ui.Widget, o = i.deepExtend, a = i.dataviz, s = a.Axis, l = a.Box2D, d = a.ChartElement, c = a.NumericAxis, u = a.Pin, p = a.Ring, f = a.RootElement, h = a.RotationAnimation, m = a.BarIndicatorAnimatin, g = a.ArrowAnimation, v = a.append, b = a.animationDecorator, _ = a.autoMajorUnit, x = a.getSpacing, k = a.defined, w = a.rotatePoint, y = a.Point2D, C = a.round, T = a.uniqueId, S = 150, A = "arrow", D = "arrowPointer", E = "barIndicator", F = "#000", I = .05, P = a.COORD_PRECISION, z = Number.MAX_VALUE, R = -Number.MAX_VALUE, N = 200, O = .5, M = 200, H = 60, B = 60, L = n.PI / 180, V = "inside", U = "needle", j = "outside", W = "radialPointer", q = 90, G = d.extend({ init: function (e, t) {
		var i = this, r = e.options;
		d.fn.init.call(i, t), t = i.options, t.id || (t.id = T()), t.fill = t.color, i.scale = e, t.value = k(t.value) ? n.min(n.max(t.value, r.min), r.max) : r.min
	}, options: { color: F }, value: function (e) {
		var t = this, i = t.options, r = i.value, o = t.scale.options;
		return 0 === arguments.length ? r : (i._oldValue = i.value, i.value = n.min(n.max(e, o.min), o.max), t.repaint(), undefined)
	} }), $ = G.extend({ options: { shape: U, cap: { size: I }, arrow: { width: 16, height: 14 }, animation: { type: W, speed: S} }, reflow: function () {
		var e = this, t = e.options, n = e.scale, i = n.ring, r = i.c, o = i.r * t.cap.size;
		e.box = new l(r.x - o, r.y - o, r.x + o, r.y + o)
	}, repaint: function () {
		var e = this, n = e.scale, i = e.options, r = e.elements[0], a = i.animation, s = n.slotAngle(n.options.min), l = n.slotAngle(i._oldValue) - s, d = r._animation;
		r.options.rotation[0] = n.slotAngle(i.value) - s, d && d.abort(), a.transitions === !1 ? r.refresh(t.getElementById(i.id)) : (d = r._animation = new h(r, o(a, { startAngle: l, reverse: n.options.reverse })), d.setup(), d.play())
	}, _renderNeedle: function (e, t, n, i) {
		var r = this, o = r.options, a = r.scale, s = a.ring.r * o.cap.size;
		return [e.createPolyline([w((t.x1 + t.x2) / 2, t.y1 + a.options.minorTicks.size, n.x, n.y, i), w(n.x - s / 2, n.y, n.x, n.y, i), w(n.x + s / 2, n.y, n.x, n.y, i)], !0, o), e.createCircle(n, s, { fill: o.cap.color || o.color })]
	}, _renderArrow: function (e, t, n, i) {
		var r = this, o = r.options, a = r.scale, s = a.ring.clone(), l = 5, d = o.arrow, c = d.height;
		return s.ir = s.r - l, [e.createPin(new u({ origin: w((t.x1 + t.x2) / 2, t.y1 + c, n.x, n.y, i), height: d.height, radius: l, rotation: i, arcAngle: 180 }), o), e.createRing(s, { fill: o.color })]
	}, renderPointer: function (e) {
		var t, n = this, i = n.scale, r = i.ring, a = r.c, s = r.r, d = n.options, c = new l(a.x - s, a.y - s, a.x + s, a.y + s), u = c.center(), p = i.slotAngle(i.options.min), f = q - p;
		return d.animation !== !1 && o(d.animation, { startAngle: 0, center: u, reverse: i.options.reverse }), o(d, { rotation: [i.slotAngle(d.value) - p, u.x, u.y] }), t = d.shape == A ? n._renderArrow(e, c, u, f) : n._renderNeedle(e, c, u, f)
	}, getViewElements: function (e) {
		var t = this, n = t.renderPointer(e);
		return t.elements = n, n
	} }), Y = c.extend({ init: function (e) {
		var t = this, n = t.options;
		n.majorUnit = _(t.options.min, t.options.max), s.fn.init.call(t, e), t.options.minorUnit = t.options.minorUnit || t.options.majorUnit / 10
	}, options: { min: 0, max: 100, majorTicks: { size: 15, align: V, color: F, width: O, visible: !0 }, minorTicks: { size: 10, align: V, color: F, width: O, visible: !0 }, startAngle: -30, endAngle: 210, labels: { position: V, padding: 2} }, reflow: function (e) {
		var t = this, i = t.options, r = e.center(), o = n.min(e.height(), e.width()) / 2, s = t.ring || new a.Ring(r, o - i.majorTicks.size, o, i.startAngle, i.endAngle - i.startAngle);
		t.ring = s, t.box = s.getBBox(), t.arrangeLabels()
	}, slotAngle: function (e) {
		var t, n = this.options, i = n.startAngle, r = n.reverse, o = n.endAngle - i, a = n.min, s = n.max;
		return t = r ? n.endAngle - (e - a) / (s - a) * o : (e - a) / (s - a) * o + i
	}, renderTicks: function (e) {
		function t(t, r, o, a, s) {
			var l, d, c, u = n.tickAngles(t, r), p = s / r, f = u.length;
			if (a)
				for (l = 0; f > l; l++)
					0 !== l % p && (c = t.point(u[l]), d = t.point(u[l], !0), i.push(e.createLine(d.x, d.y, c.x, c.y, { align: !1, stroke: o.color, strokeWidth: o.width })))
		}
		var n = this, i = [], r = n.ring, o = r.clone(), a = n.options, s = a.minorTicks.size;
		return t(r, a.majorUnit, a.majorTicks, a.majorTicks.visible), a.labels.position == V ? o.radius(o.r - s, !0) : o.radius(o.ir + s), t(o, a.minorUnit, a.minorTicks, a.minorTicks.visible, a.majorUnit), i
	}, arrangeLabels: function () {
		var e, t, i, r, o, a, s, d, c, u, p = this, f = p.options, h = p.ring.clone(), m = p.tickAngles(h, f.majorUnit), g = p.labels, v = g.length, b = f.labels, _ = b.padding, x = .05 * h.r, k = f.rangeSize = f.rangeSize || .1 * h.r, w = f.ranges || [];
		for (p.options.rangeDistance !== undefined ? x = p.options.rangeDistance : p.options.rangeDistance = x, b.position === V && w.length && (h.r -= k + x, h.ir -= k + x), s = 0; v > s; s++)
			o = g[s], e = o.box.width() / 2, t = o.box.height() / 2, r = m[s], i = r * L, u = b.position === V, a = h.point(r, u), d = a.x + n.cos(i) * (e + _) * (u ? 1 : -1), c = a.y + n.sin(i) * (t + _) * (u ? 1 : -1), o.reflow(new l(d - e, c - t, d + e, c + t)), p.box.wrap(o.box)
	}, tickAngles: function (e, t) {
		var n, i = this, r = i.options, o = r.reverse, a = r.max - r.min, s = e.angle, l = e.startAngle, d = a / t, c = s / d, u = [];
		for (o && (l += s, c = -c), n = 0; d > n; n++)
			u.push(C(l, P)), l += c;
		return r.endAngle >= C(l) && u.push(l), u
	}, renderRanges: function (e) {
		var t, n, i, r, o, a = this, s = [], l = a.rangeSegments(), d = l.length, c = a.options.reverse;
		if (d)
			for (r = a.getRadius(), o = 0; d > o; o++)
				i = l[o], t = a.slotAngle(i[c ? "to" : "from"]), n = a.slotAngle(i[c ? "from" : "to"]), 0 !== n - t && s.push(e.createRing(new p(a.ring.c, r.inner, r.outer, t, n - t), { fill: i.color, fillOpacity: i.opacity, zIndex: -1 }));
		return s
	}, rangeSegments: function () {
		function t(e, t, n) {
			return { from: e, to: t, color: n}
		}
		var n, i, r, o, a, s = this, l = s.options, d = l.ranges || [], c = d.length, u = l.rangePlaceholderColor, p = [], f = l.min, h = l.max;
		if (c)
			for (p.push(t(f, h, u)), o = 0; c > o; o++)
				for (n = e(d[o], f, h), i = p.length, a = 0; i > a; a++)
					if (r = p[a], n.from >= r.from && r.to >= n.from) {
						p.push(t(n.from, n.to, n.color)), n.to >= r.from && r.to >= n.to && p.push(t(n.to, r.to, u)), r.to = n.from;
						break
					}
		return p
	}, getRadius: function () {
		var e, t, n = this, i = n.options, r = i.rangeSize, o = i.rangeDistance, a = n.ring;
		return i.labels.position === j ? (t = a.ir - o, e = t - r) : (t = a.r, e = t - r, a.r -= r + o, a.ir -= r + o), { inner: e, outer: t}
	}, getViewElements: function (e) {
		var t = this, n = d.fn.getViewElements.call(t, e);
		return v(n, t.renderRanges(e)), v(n, t.renderTicks(e)), n
	} }), Q = d.extend({ init: function (e) {
		d.fn.init.call(this, e), this.render()
	}, options: { margin: {}, background: "", border: { color: F, width: 0 }, minorTicks: { align: V} }, reflow: function (e) {
		var t, n = this, i = n.scale, r = n.pointer;
		i.reflow(e), t = i.box.clone(), r.scale = i, r.reflow(), t.wrap(r.box), n.box = t, n.fitScale(e), n.alignScale(e)
	}, alignScale: function (e) {
		var t = this, n = t.box.center(), i = e.center(), r = n.x - i.x, o = n.y - i.y, a = t.scale, s = t.pointer;
		a.ring.c.x -= r, a.ring.c.y -= o, a.reflow(e), s.reflow(), t.box = a.box.clone().wrap(s.box)
	}, fitScale: function (e) {
		for (var t, i, r, o, a = this, s = a.scale, l = s.ring, d = a.box, c = n.abs(a.getDiff(d, e)), u = C(c, P), p = C(-c, P), f = 0; !(!(100 > f) || (f++, u != o && (t = a.getPlotBox(u, e, l), t >= 0 && 2 >= t)) || p != o && (r = a.getPlotBox(p, e, l), r >= 0 && 2 >= r) || (o = t > 0 && r > 0 ? 2 * u : 0 > t && 0 > r ? 2 * p : C((u + p) / 2 || 1, P), i = a.getPlotBox(o, e, l), i >= 0 && 2 >= i));)
			i > 0 ? (p = o, r = i) : (u = o, t = i)
	}, getPlotBox: function (e, t, n) {
		var i = this, r = i.scale, o = i.pointer;
		return n = n.clone(), n.r += e, n.ir += e, r.ring = n, r.reflow(t), o.scale = r, o.reflow(), i.box = r.box.clone().wrap(o.box), i.getDiff(i.box, t)
	}, getDiff: function (e, t) {
		return n.min(t.width() - e.width(), t.height() - e.height())
	}, render: function () {
		var e, t = this, n = t.options;
		e = t.scale = new Y(n.scale), t.append(t.scale), t.pointer = new $(e, o({}, n.pointer, { animation: { transitions: n.transitions} })), t.append(t.pointer)
	} }), K = c.extend({ init: function (e) {
		var t = this, n = t.options;
		n.majorUnit = _(t.options.min, t.options.max), e = o({}, n, e), e = o({}, e, { labels: { mirror: e.mirror} }), c.fn.init.call(t, 0, 1, e)
	}, options: { min: 0, max: 50, minorUnit: 1, majorTicks: { size: 15, align: V, color: F, width: O, visible: !0 }, minorTicks: { size: 10, align: V, color: F, width: O, visible: !0 }, line: { width: O }, labels: { position: V, padding: 2 }, mirror: !1, _alignLines: !1 }, renderRanges: function (t) {
		var n, i, r, o, a, s = this, d = s.options, c = d.min, u = d.max, p = d.ranges || [], f = d.vertical, h = d.labels.mirror, m = [], g = p.length, v = d.rangeSize || d.minorTicks.size / 2;
		if (g)
			for (o = 0; g > o; o++)
				n = e(p[o], c, u), a = s.getSlot(n.from, n.to), i = f ? s.lineBox() : a, r = f ? a : s.lineBox(), f ? i.x1 -= v * (h ? -1 : 1) : r.y2 += v * (h ? -1 : 1), m.push(t.createRect(new l(i.x1, r.y1, i.x2, r.y2), { fill: n.color, fillOpacity: n.opacity }));
		return m
	}, getViewElements: function (e) {
		var t = this, n = c.fn.getViewElements.call(t, e);
		return v(n, t.renderRanges(e)), n
	} }), X = G.extend({ init: function (e, t) {
		var n = this;
		G.fn.init.call(n, e, t), n.options = o({ size: n.pointerSize(), track: { visible: k(t.track)} }, n.options)
	}, options: { shape: E, track: { border: { width: 1} }, color: F, border: { width: 1 }, opacity: 1, margin: x(3), animation: { type: E }, visible: !0 }, repaint: function () {
		var e = this, n = e.scale, i = e.options, r = e.element, a = r._animation;
		a && a.abort(), i.animation.transitions === !1 ? (e.getViewElements(e._view), r.points = e.element.points, r.refresh(t.getElementById(i.id))) : (i.animation = o({}, i.animation, { endPosition: n.getSlot(n.options.min, i.value), reverse: n.options.reverse }), a = r._animation = i.shape === A ? new g(r, i.animation) : new m(r, i.animation), a.setup(), a.play())
	}, reflow: function () {
		var e, t, n, i = this, r = i.options, o = i.scale, a = o.lineBox(), s = r.track.size || r.size, d = r.size / 2, c = o.options.mirror, u = x(r.margin), p = o.options.vertical, f = p ? u[c ? "left" : "right"] : u[c ? "bottom" : "top"];
		f = c ? -f : f, p ? (n = new l(a.x1 + f, a.y1, a.x1 + f, a.y2), c ? n.x1 -= s : n.x2 += s, r.shape !== E && (t = new l(a.x2 + f, a.y1 - d, a.x2 + f, a.y2 + d), e = t)) : (n = new l(a.x1, a.y1 - f, a.x2, a.y1 - f), c ? n.y2 += s : n.y1 -= s, r.shape !== E && (t = new l(a.x1 - d, a.y1 - f, a.x2 + d, a.y1 - f), e = t)), i.trackBox = n, i.pointerRangeBox = t, i.box = e || n.clone().pad(r.border.width)
	}, renderPointer: function (e) {
		var t, n = this, i = n.scale, r = n.options, a = k(r.border) ? { stroke: r.border.width ? r.border.color || r.color : "", strokeWidth: r.border.width, dashType: r.border.dashType} : {}, s = o({ fill: r.color, fillOpacity: r.opacity, animation: o(r.animation, { startPosition: i.getSlot(i.options.min, r.value), size: r.size, vertical: i.options.vertical, reverse: i.options.reverse }), id: r.id, zIndex: 2, align: !1 }, a), l = n.pointerShape(r.value);
		return r.shape === A ? (s.animation.type = D, t = e.createPolyline(l, !0, s)) : t = e.createRect(l, s), t
	}, pointerShape: function (e) {
		var t, n, i, r = this, o = r.options, a = r.scale, s = a.getSlot(e, a.options.min), d = o.size, c = r.pointerRangeBox, u = a.options.vertical, p = d / 2, f = a.options.mirror ? -1 : 1, h = a.options.reverse;
		return o.shape == A ? u ? (n = h ? "y2" : "y1", t = [new y(c.x1, s[n] - p), new y(c.x1 - f * d, s[n]), new y(c.x1, s[n] + p)]) : (n = h ? "x1" : "x2", t = [new y(s[n] - p, c.y2), new y(s[n], c.y2 + f * d), new y(s[n] + p, c.y2)]) : (i = r.trackBox, t = u ? new l(i.x1, s.y1, i.x1 + d, s.y2) : new l(s.x1, i.y1, s.x2, i.y1 + d)), t
	}, pointerSize: function () {
		var e, t = this, n = t.options, i = t.scale, r = i.options.majorTicks.size;
		return e = n.shape === A ? .6 * r : .3 * r, C(e)
	}, renderTrack: function (e) {
		var t = this, n = t.options, i = n.track, r = i.border || {}, o = t.trackBox.clone().pad(r.width || 0);
		return e.createRect(o, { fill: i.color, fillOpacity: i.opacity, stroke: r.width ? r.color || i.color : "", strokeWidth: r.width, dashType: r.dashType, align: !1 })
	}, getViewElements: function (e) {
		var t = this, n = t.options, i = [];
		return t.element = t.renderPointer(e), i.push(t.element), !n.track.visible || n.shape !== E && "" !== n.shape || i.push(t.renderTrack(e)), t._view = e, v(i, G.fn.getViewElements.call(t, e)), i
	} }), J = d.extend({ init: function (e) {
		d.fn.init.call(this, e), this.render()
	}, options: { plotArea: { margin: {}, background: "", border: { color: F, width: 0} }, pointer: {}, scale: {} }, reflow: function (e) {
		var t = this, n = t.scale, i = t.pointer;
		n.reflow(e), i.reflow(e), t.box = t.getBox(e), t.alignElements(), t.shrinkElements()
	}, shrinkElements: function () {
		var e = this, t = e.scale, i = e.pointer, r = t.box.clone(), o = i.box, a = t.options.vertical ? "y" : "x";
		r[a + 1] += n.max(r[a + 1] - o[a + 1], 0), r[a + 2] -= n.max(o[a + 2] - r[a + 2], 0), t.reflow(r), i.reflow(e.box)
	}, getBox: function (e) {
		var t, n = this, i = n.scale, r = n.pointer, o = e.center(), a = r.box.clone().wrap(i.box);
		return i.options.vertical ? (t = a.width() / 2, a = new l(o.x - t, e.y1, o.x + t, e.y2)) : (t = a.height() / 2, a = new l(e.x1, o.y - t, e.x2, o.y + t)), a
	}, alignElements: function () {
		var e, t = this, n = t.scale, i = t.pointer, r = n.box, o = i.box.clone().wrap(n.box), a = t.box;
		n.options.vertical ? (e = a.center().x - o.center().x, n.reflow(new l(r.x1 + e, a.y1, r.x2 + e, a.y2))) : (e = a.center().y - o.center().y, n.reflow(new l(a.x1, r.y1 + e, a.x2, r.y2 + e))), i.reflow(t.box)
	}, render: function () {
		var e, t = this, n = t.options;
		e = t.scale = new K(n.scale), t.append(t.scale), t.pointer = new X(e, o({}, n.pointer, { animation: { transitions: n.transitions} })), t.append(t.pointer)
	}, getViewElements: function (e) {
		var t = this, n = t.options.plotArea, i = d.fn.getViewElements.call(t, e), r = n.border || {}, o = [e.createRect(t.box, { fill: n.background, stroke: r.width ? r.color : "", strokeWidth: r.width, dashType: r.dashType })];
		return v(o, i), o
	} }), Z = r.extend({ init: function (e, t) {
		var n, i, s, l, d = this, c = a.ui.themes || {};
		r.fn.init.call(d, e), d.wrapper = d.element, d._originalOptions = o({}, t), n = o({}, d.options, t), s = n.theme, l = c[s] || c[s.toLowerCase()], i = s && l ? l.gauge : {}, d.options = o({}, i, n), d.element.addClass("k-gauge"), d.redraw()
	}, options: { plotArea: {}, theme: "default", pointer: {}, scale: {}, gaugeArea: {} }, value: function (e) {
		return 0 === arguments.length ? this._pointers[0].value() : (this._pointers[0].value(e), undefined)
	}, redraw: function () {
		var e, t = this, n = t.element, i = t._model = t._getModel(), r = a.ui.defaultView();
		t._plotArea = i._plotArea, r && (e = t._view = r.fromModel(i), n.css("position", "relative"), t._viewElement = e.renderTo(n[0]))
	}, svg: function () {
		var e = this._getModel(), t = a.SVGView.fromModel(e);
		return t.render()
	}, _createModel: function () {
		var e = this, t = e.options, n = e._getSize();
		return new f(o({ width: n.width, height: n.height, transitions: t.transitions }, t.gaugeArea))
	}, _getSize: function () {
		var e = this, t = e.element, n = t.width(), i = t.height();
		return n || (n = M), i || (i = N), { width: n, height: i}
	} }), et = Z.extend({ init: function (e, t) {
		var n = this;
		Z.fn.init.call(n, e, t), i.notify(n, a.ui)
	}, options: { name: "RadialGauge", transitions: !0, gaugeArea: { background: ""} }, _getModel: function () {
		var e, t = this, n = t.options, i = t._createModel();
		return e = i._plotArea = new Q(n), t._pointers = [e.pointer], i.append(e), i.reflow(), i
	} }), tt = Z.extend({ init: function (e, t) {
		var n = this;
		Z.fn.init.call(n, e, t), i.notify(n, a.ui)
	}, options: { name: "LinearGauge", transitions: !0, gaugeArea: { background: "" }, scale: { vertical: !0} }, _getModel: function () {
		var e, t = this, n = t.options, i = t._createModel();
		return e = i._plotArea = new J(n), t._pointers = [e.pointer], i.append(e), i.reflow(), i
	}, _getSize: function () {
		var e = this, t = e.element, n = t.width(), i = t.height(), r = e.options.scale.vertical;
		return n || (n = r ? H : M), i || (i = r ? N : B), { width: n, height: i}
	} }), nt = b(W, h), it = b(D, g), rt = b(E, m);
	a.ui.plugin(et), a.ui.plugin(tt), o(a, { Gauge: Z, RadialGaugePlotArea: Q, LinearGaugePlotArea: J, RadialPointer: $, LinearPointer: X, LinearScale: K, RadialScale: Y, RadialPointerAnimationDecorator: nt, ArrowPointerAnimationDecorator: it, BarIndicatorAnimationDecorator: rt })
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.Class, i = t.Observable, r = t.deepExtend, o = Math, a = e.proxy, s = t.dataviz, l = t.template, d = s.defined, c = s.ui.Chart, u = s.Selection, p = s.addDuration, f = s.duration, h = s.last, m = s.lteDateIndex, g = s.renderTemplate, v = s.toDate, b = s.toTime, _ = 28, x = "change", k = "k-", w = "drag", y = "dragEnd", C = "_navigator", T = C, S = "selectStart", A = "select", D = "selectEnd", E = 3, F = "zoom", I = "zoomEnd", P = c.extend({ init: function (e, t) {
		var n = this;
		c.fn.init.call(n, e, t)
	}, _applyDefaults: function (e, t) {
		var n = this, i = n.element.width() || s.DEFAULT_WIDTH, a = { axisDefaults: { categoryAxis: { name: "default", field: e.dateField, majorGridLines: { visible: !1 }, labels: { step: 2 }, majorTicks: { visible: !1 }, maxDateGroups: o.floor(i / _)}} };
		t && (t = r({}, t, a)), n._navigator || z.setup(e, t), c.fn._applyDefaults.call(n, e, t)
	}, _initDataSource: function (e) {
		var t, n, i = e || {}, o = i.dataSource, a = o && o.serverFiltering, l = [].concat(i.categoryAxis)[0], d = i.navigator || {}, u = d.select, p = u && u.from && u.to;
		a && p && (t = [].concat(o.filter || []), n = new s.DateCategoryAxis(r({ baseUnit: "fit" }, l, { categories: [u.from, u.to] })), o.filter = z.buildFilter(n.options.min, u.to).concat(t)), c.fn._initDataSource.call(this, e)
	}, options: { name: "StockChart", dateField: "date", axisDefaults: { categoryAxis: { type: "date", baseUnit: "fit", justified: !0 }, valueAxis: { narrowRange: !0, labels: { format: "C"}} }, navigator: { select: {}, seriesDefaults: { markers: { visible: !1 }, tooltip: { visible: !0, template: "#= kendo.toString(category, 'd') #" }, line: { width: 2} }, hint: {}, visible: !0 }, tooltip: { visible: !0 }, legend: { visible: !1} }, _redraw: function () {
		var e = this, t = e._navigator;
		t && t.dataSource ? t.redrawSlaves() : (t || (t = e._navigator = new z(e)), t.filterAxes(), c.fn._redraw.call(e), t.redraw())
	}, _onDataChanged: function () {
		var e = this;
		c.fn._onDataChanged.call(e), e._dataBound = !0
	}, destroy: function () {
		var e = this;
		e._navigator.destroy(), c.fn.destroy.call(e)
	} }), z = i.extend({ init: function (e) {
		var t = this;
		t.chart = e, t.options = r({}, t.options, e.options.navigator), t._initDataSource(), d(t.options.hint.visible) || (t.options.hint.visible = t.options.visible), e.bind(w, a(t._drag, t)), e.bind(y, a(t._dragEnd, t)), e.bind(F, a(t._zoom, t)), e.bind(I, a(t._zoomEnd, t))
	}, options: {}, _initDataSource: function () {
		var e = this, n = e.options, i = n.autoBind, r = n.dataSource;
		d(i) || (i = e.chart.options.autoBind), e._dataChangedHandler = a(e._onDataChanged, e), r && (e.dataSource = t.data.DataSource.create(r).bind(x, e._dataChangedHandler), i && e.dataSource.fetch())
	}, _onDataChanged: function () {
		var e, t, n, i, r = this, o = r.chart, a = o.options.series, s = a.length, l = o.options.categoryAxis, d = l.length, c = r.dataSource.view();
		for (e = 0; s > e; e++)
			n = a[e], n.axis == T && o.isBindable(n) && (n.data = c);
		for (t = 0; d > t; t++)
			i = l[t], i.pane == C && o._bindCategoryAxis(i, c);
		o._model && (r.redraw(), r.filterAxes(), (!o.options.dataSource || o.options.dataSource && o._dataBound) && r.redrawSlaves())
	}, destroy: function () {
		var e = this, t = e.dataSource;
		t && t.unbind(x, e._dataChangeHandler), e.selection && e.selection.destroy()
	}, redraw: function () {
		this._redrawSelf();
		var t = this, n = t.chart, i = t.options, r = t.mainAxis(), o = r.options.categories, a = t.options.select || {}, l = t.selection, d = 0, c = o.length - 1, p = d, f = c;
		o.length > 0 && (a.from && (p = m(o, v(a.from))), a.to && (f = m(o, v(a.to))), l && (l.destroy(), l.wrapper.remove()), l = t.selection = new u(n, r, { min: d, max: c, from: p, to: f, selectStart: e.proxy(t._selectStart, t), select: e.proxy(t._select, t), selectEnd: e.proxy(t._selectEnd, t), visible: i.visible }), i.hint.visible && (t.hint = new R(n.element, { min: o[0], max: s.last(o), template: i.hint.template, format: i.hint.format })))
	}, _redrawSelf: function (e) {
		var t = this.chart._plotArea;
		t && t.redraw(h(t.panes), e)
	}, redrawSlaves: function () {
		var e = this, t = e.chart, n = t._plotArea, i = n.panes.slice(0, -1);
		t._plotArea.redraw(i)
	}, _drag: function (e) {
		var t, n, i = this, r = i.chart, a = r._eventCoordinates(e.originalEvent), l = i.mainAxis(), d = l.pane.box.containsPoint(a), c = l.options.categories, u = r._plotArea.categoryAxis, h = u.options.baseUnit, g = e.axisRanges[u.options.name], b = i.selection, _ = f(u.options.min, u.options.max, u.options.baseUnit);
		g && !d && (t = v(o.min(o.max(c[0], g.min), p(s.last(c), -_, h))), n = v(o.min(p(t, _, h), s.last(c))), i.options.select = { from: t, to: n }, i._liveDrag() && (i.filterAxes(), i.redrawSlaves()), b.set(m(c, t), m(c, n) + 1), i.showHint(t, n))
	}, _dragEnd: function () {
		var e = this;
		e.filterAxes(), e.filterDataSource(), e.redrawSlaves(), e.hint && e.hint.hide()
	}, _liveDrag: function () {
		var e = t.support, n = e.touch, i = e.browser, r = i.mozilla, o = i.msie && 9 > i.version;
		return !n && !r && !o
	}, readSelection: function () {
		var e = this, t = e.mainAxis(), n = t.options.categories, i = e.selection, r = i.options, o = e.options.select;
		o.from = n[r.from], o.to = n[r.to]
	}, indexToDate: function (e) {
		var t = this, n = t.mainAxis(), i = n.options.categories;
		return i[e]
	}, filterAxes: function () {
		var e, t, n, i, r, o = this, a = o.options.select || {}, s = o.chart, l = s.options.categoryAxis, d = a.from, c = a.to;
		for (i = 0; l.length > i; i++)
			if (r = l[i], r.name === T && (e = r.categories, e && e.length > 0)) {
				t = b(e[0]), n = b(h(e)), d = b(d), (t > d || d > n) && (d = t), c = b(c), (t > c || c > n) && (c = n);
				break
			}
		for (i = 0; l.length > i; i++)
			r = l[i], r.pane !== C && (r.min = v(d), r.max = v(c))
	}, filterDataSource: function () {
		var e, t = this, n = t.options.select || {}, i = t.chart, o = i.dataSource, a = o && o.options.serverFiltering;
		t.dataSource && a && (e = new s.DateCategoryAxis(r({ baseUnit: "fit" }, i.options.categoryAxis[0], { categories: [n.from, n.to] })).options, o.filter(z.buildFilter(p(e.min, -e.baseUnitStep, e.baseUnit), p(e.max, e.baseUnitStep, e.baseUnit))))
	}, _zoom: function (e) {
		var n = this, i = n.chart, r = e.delta, a = n.mainAxis(), s = i._plotArea.categoryAxis, l = n.options.select, d = n.selection;
		e.originalEvent.preventDefault(), o.abs(r) > 1 && (r *= E), d.options.to - d.options.from > 1 ? (d.expandLeft(r), n.readSelection()) : (s.options.min = l.from, l.from = s.scaleRange(-e.delta).min), t.support.touch || (n.filterAxes(), n.redrawSlaves()), d.set(m(a.options.categories, n.options.select.from), m(a.options.categories, n.options.select.to)), n.showHint(n.options.select.from, n.options.select.to)
	}, _zoomEnd: function (e) {
		this._dragEnd(e)
	}, showHint: function (e, t) {
		var n = this, i = n.chart, r = i._plotArea;
		n.hint && n.hint.show(e, t, r.backgroundBox())
	}, _selectStart: function (e) {
		this.chart.trigger(S, { from: e.from, to: e.to }) && e.preventDefault()
	}, _select: function (e) {
		var t = this;
		t.showHint(t.indexToDate(e.from), t.indexToDate(e.to)), t.chart.trigger(A, { from: e.from, to: e.to })
	}, _selectEnd: function (e) {
		var t = this;
		t.hint && t.hint.hide(), t.readSelection(), t.filterAxes(), t.filterDataSource(), t.redrawSlaves(), t.chart.trigger(D, { from: e.from, to: e.to })
	}, mainAxis: function () {
		var e = this.chart._plotArea;
		return e ? e.namedCategoryAxes[T] : undefined
	} });
	z.setup = function (e, t) {
		e = e || {}, t = t || {};
		var n = r({}, t.navigator, e.navigator), i = e.panes = [].concat(e.panes), o = r({}, n.pane, { name: C });
		n.visible || (o.visible = !1, o.height = .1), i.push(o), z.attachAxes(e, n), z.attachSeries(e, n, t)
	}, z.attachAxes = function (e, t) {
		var n, i;
		n = e.categoryAxis = [].concat(e.categoryAxis), i = e.valueAxis = [].concat(e.valueAxis);
		var o = r({ type: "date", pane: C, field: t.dateField, roundToBaseUnit: !1, justified: !0, tooltip: { visible: !1 }, labels: { step: 1 }, autoBind: !t.dataSource, autoBaseUnitSteps: { minutes: [1], hours: [1], days: [1], weeks: [], months: [1], years: [1] }, _overlap: !1 }, t.categoryAxis);
		n.push(r({}, o, { name: T, baseUnit: "fit", maxDateGroups: 200, baseUnitStep: "auto", labels: { visible: !1 }, majorTicks: { visible: !1} }), r({}, o, { name: T + "_labels", maxDateGroups: 20, baseUnitStep: "auto", autoBaseUnitSteps: { minutes: [] }, majorTicks: { visible: !0} }), r({}, o, { name: T + "_ticks", maxDateGroups: 200, majorTicks: { visible: !0, width: .5 }, labels: { visible: !1, mirror: !0} })), i.push({ name: T, pane: C, majorGridLines: { visible: !1 }, visible: !1 })
	}, z.attachSeries = function (e, t, n) {
		var i, o = e.series = e.series || [], a = [].concat(t.series), s = n.seriesColors, l = t.seriesDefaults;
		for (i = 0; a.length > i; i++)
			o.push(r({ color: s[i % s.length], visibleInLegend: !1, tooltip: { visible: !1} }, l, a[i], { axis: T, categoryAxis: T, autoBind: !t.dataSource }))
	}, z.buildFilter = function (e, t) {
		return [{ field: "Date", operator: "gte", value: v(e) }, { field: "Date", operator: "lt", value: v(t)}]
	};
	var R = n.extend({ init: function (t, n) {
		var i = this;
		i.options = r({}, i.options, n), i.container = t, i.chartPadding = { top: parseInt(t.css("paddingTop"), 10), left: parseInt(t.css("paddingLeft"), 10) }, i.template = i.template, i.template || (i.template = i.template = g("<div class='" + k + "navigator-hint' " + "style='display: none; position: absolute; top: 1px; left: 1px;'>" + "<div class='" + k + "tooltip'>&nbsp;</div>" + "<div class='" + k + "scroll' />" + "</div>")), i.element = e(i.template()).appendTo(t)
	}, options: { format: "{0:d} - {1:d}", hideDelay: 500 }, show: function (e, n, i) {
		var r, o = this, a = v(b(e) + b(n - e) / 2), s = o.options, d = t.format(o.options.format, e, n), c = o.element.find("." + k + "tooltip"), u = o.element.find("." + k + "scroll"), p = .4 * i.width(), f = i.center().x - p, h = i.center().x, m = h - f, g = s.max - s.min, _ = m / g, x = a - s.min;
		o._hideTimeout && clearTimeout(o._hideTimeout), o._visible || (o.element.stop(!1, !0).css("visibility", "hidden").show(), o._visible = !0), s.template && (r = l(s.template), d = r({ from: e, to: n })), c.text(d).css({ left: i.center().x - c.outerWidth() / 2, top: i.y1 }), u.css({ width: p, left: f + x * _, top: i.y1 + parseInt(c.css("margin-top"), 10) + parseInt(c.css("border-top-width"), 10) + c.height() / 2 }), o.element.css("visibility", "visible")
	}, hide: function () {
		var e = this;
		e._hideTimeout && clearTimeout(e._hideTimeout), e._hideTimeout = setTimeout(function () {
			e._visible = !1, e.element.fadeOut("slow")
		}, e.options.hideDelay)
	} });
	s.ui.plugin(P), r(s, { Navigator: z })
}(window.kendo.jQuery), function () {
	function e(e) {
		this.view = e
	}
	function t(e) {
		this.view = e
	}
	function n(e) {
		return a.round(e) + .5
	}
	function i(e, t) {
		var n, i, r = [];
		if (e = e ? e.toLowerCase() : null, e && e != E && t) {
			for (n = P[e], i = 0; n.length > i; i++)
				r.push(n[i] * t);
			return "stroke-dasharray='" + r.join(" ") + "' "
		}
		return ""
	}
	var r = jQuery, o = document, a = Math, s = window.kendo, l = s.Class, d = s.dataviz, c = d.Box2D, u = d.ExpandAnimation, p = d.Point2D, f = d.ViewBase, h = d.ViewElement, m = s.deepExtend, g = d.defined, v = d.round, b = d.renderTemplate, _ = d.rotatePoint, x = d.uniqueId, k = "butt", w = d.CLIP, y = d.COORD_PRECISION, C = d.DEFAULT_WIDTH, T = d.DEFAULT_HEIGHT, S = d.DEFAULT_FONT, A = "none", D = "radial", E = "solid", F = "square", I = "http://www.w3.org/2000/svg", P = { dot: [1.5, 3.5], dash: [4, 3.5], longdash: [8, 3.5], dashdot: [3.5, 3.5, 1.5, 3.5], longdashdot: [8, 3.5, 1.5, 3.5], longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5] }, z = "transparent", R = "undefined", N = f.extend({
		init: function (n) {
			var i = this;
			f.fn.init.call(i, n), i.decorators.push(new e(i), new t(i)), d.ui.Chart && i.decorators.push(new d.BarAnimationDecorator(i), new d.PieAnimationDecorator(i), new d.BubbleAnimationDecorator(i)), i.decorators.push(new Q(i), new d.FadeAnimationDecorator(i)), d.Gauge && i.decorators.push(new d.RadialPointerAnimationDecorator(i), new d.ArrowPointerAnimationDecorator(i), new d.BarIndicatorAnimationDecorator(i)), i.defsId = x(), i.template = N.template, i.template || (i.template = N.template = b("<?xml version='1.0' ?><svg xmlns='" + I + "' version='1.1' " + "width='#= d.options.width #px' height='#= d.options.height #px' " + "style='position: relative; display: block;'>" + "#= d.renderDefinitions() #" + "#= d.renderContent() #</svg>"))
		}, options: { width: C, height: T, idPrefix: "" }, renderTo: function (e) {
			var t, n = this;
			return n.setupAnimations(), d.renderSVG(e, n.render()), t = e.firstElementChild, n.alignToScreen(t), n.playAnimations(), t
		}, renderDefinitions: function () {
			var e = this, t = e.defsId, n = f.fn.renderDefinitions.call(e);
			return "<defs id='" + t + "'>" + n + "</defs>"
		}, renderElement: function (e) {
			var t, n, i = this, r = o.createElement("div"), a = o.getElementById(i.defsId);
			return d.renderSVG(r, "<?xml version='1.0' ?><svg xmlns='" + I + "' version='1.1'>" + i.renderDefinitions() + e.render() + "</svg>"), t = r.firstElementChild.firstChild, n = r.firstElementChild.lastChild, a && a.textContent !== t.textContent && a.parentNode.replaceChild(t, a), n
		}, createGroup: function (e) {
			return this.decorate(new j(e))
		}, createText: function (e, t) {
			return this.decorate(new O(e, t))
		}, createRect: function (e, t) {
			return this.decorate(new H(e.points(), !0, t))
		}, createLine: function (e, t, n, i, r) {
			return this.decorate(new H([new p(e, t), new p(n, i)], !1, r))
		}, createPolyline: function (e, t, n) {
			return this.decorate(new H(e, t, n))
		}, createCircle: function (e, t, n) {
			return this.decorate(new U(e, t, n))
		}, createSector: function (e, t) {
			return this.decorate(new V(e, t))
		}, createRing: function (e, t) {
			return this.decorate(new B(e, t))
		}, createPin: function (e, t) {
			return this.decorate(new L(e, t))
		}, createGradient: function (e) {
			return e.type === D ? g(e.ir) ? new Y(e) : new $(e) : new G(e)
		}, alignToScreen: function (e) {
			var t;
			try {
				t = e.getScreenCTM ? e.getScreenCTM() : null
			}
			catch (n) {
			}
			if (t) {
				var i = -t.e % 1, r = -t.f % 1, o = e.style;
				(0 !== i || 0 !== r) && (o.left = i + "px", o.top = r + "px")
			}
		}
	});
	N.fromModel = function (e) {
		var t = new N(e.options);
		return [].push.apply(t.children, e.getViewElements(t)), t
	}, N.available = d.supportsSVG, N.preference = 100, d.ui.registerView(N);
	var O = h.extend({ init: function (e, t) {
		var n = this;
		h.fn.init.call(n, t), n.content = e, n.template = O.template, n.template || (n.template = O.template = b("<text #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() # x='#= Math.round(d.options.x) #' y='#= Math.round(d.options.y + d.options.baseline) #' fill-opacity='#= d.options.fillOpacity #' #= d.options.rotation ? d.renderRotation() : '' # style='font: #= d.options.font #' fill='#= d.options.color #'>#= d.content #</text>"))
	}, options: { x: 0, y: 0, baseline: 0, font: S, size: { width: 0, height: 0 }, fillOpacity: 1 }, refresh: function (e) {
		var t = this.options;
		r(e).attr({ "fill-opacity": t.fillOpacity })
	}, clone: function () {
		var e = this;
		return new O(e.content, m({}, e.options))
	}, renderRotation: function () {
		var e = this, t = e.options, n = t.size, i = v(t.x + n.normalWidth / 2, y), r = v(t.y + n.normalHeight / 2, y), o = v(t.x + n.width / 2, y), a = v(t.y + n.height / 2, y), s = v(o - i, y), l = v(a - r, y);
		return "transform='translate(" + s + "," + l + ") " + "rotate(" + t.rotation + "," + i + "," + r + ")'"
	} }), M = h.extend({ init: function (e) {
		var t = this;
		h.fn.init.call(t, e), t.template = M.template, t.template || (t.template = M.template = b("<path #= d.renderAttr(\"id\", d.options.id) ##= d.renderDataAttributes() # d='#= d.renderPoints() #' #= d.renderAttr(\"stroke\", d.options.stroke) # #= d.renderAttr(\"stroke-width\", d.options.strokeWidth) ##= d.renderDashType() # stroke-linecap='#= d.renderLinecap() #' stroke-linejoin='round' fill-opacity='#= d.options.fillOpacity #' stroke-opacity='#= d.options.strokeOpacity #' fill='#= d.renderFill() #'></path>"))
	}, options: { fill: "", fillOpacity: 1, strokeOpacity: 1, rotation: [0, 0, 0], strokeLineCap: F }, refresh: function (e) {
		var t = this.options;
		r(e).attr({ d: this.renderPoints(), "fill-opacity": t.fillOpacity, "stroke-opacity": t.strokeOpacity })
	}, clone: function () {
		var e = this;
		return new M(m({}, e.options))
	}, renderPoints: function () {
	}, renderDashType: function () {
		var e = this, t = e.options;
		return i(t.dashType, t.strokeWidth)
	}, renderLinecap: function () {
		var e = this.options, t = e.dashType, n = e.strokeLineCap;
		return t && t != E ? k : n
	}, renderFill: function () {
		var e = this.options.fill;
		return e && e !== z ? e : A
	}, destroy: function () {
	} }), H = M.extend({ init: function (e, t, n) {
		var i = this;
		M.fn.init.call(i, n), i.points = e, i.closed = t
	}, renderPoints: function () {
		var e, t = this, n = t.points, i = n.length, r = function (e) {
			var n = t.options.rotation;
			return _(e.x, e.y, n[1], n[2], -n[0])
		}, o = "M" + t._print(r(n[0]));
		for (e = 1; i > e; e++)
			o += " " + t._print(r(n[e]));
		return t.closed && (o += " z"), o
	}, clone: function () {
		var e = this;
		return new H(m([], e.points), e.closed, m({}, e.options))
	}, _print: function (e) {
		var t = this, i = t.options, r = i.strokeWidth, o = i.align !== !1 && r && 0 !== r % 2, a = o ? n : v;
		return a(e.x, y) + " " + a(e.y, y)
	} }), B = M.extend({ init: function (e, t) {
		var n = this;
		M.fn.init.call(n, t), n.pathTemplate = B.pathTemplate, n.pathTemplate || (n.pathTemplate = B.pathTemplate = b("M #= d.firstOuterPoint.x # #= d.firstOuterPoint.y # A#= d.r # #= d.r # 0 #= d.isReflexAngle ? '1' : '0' #,1 #= d.secondOuterPoint.x # #= d.secondOuterPoint.y # L #= d.secondInnerPoint.x # #= d.secondInnerPoint.y # A#= d.ir # #= d.ir # 0 #= d.isReflexAngle ? '1' : '0' #,0 #= d.firstInnerPoint.x # #= d.firstInnerPoint.y # z")), n.config = e || {}
	}, renderPoints: function () {
		var e, t, n = this, i = n.config, r = i.startAngle, o = i.angle + r, s = o - r > 180, l = a.max(i.r, 0), d = a.max(i.ir, 0), c = i.c, u = i.point(r), p = i.point(r, !0);
		return o = 360 === o - r ? o - .002 : o, e = i.point(o), t = i.point(o, !0), n.pathTemplate({ firstOuterPoint: u, secondOuterPoint: e, isReflexAngle: s, r: l, ir: d, cx: c.x, cy: c.y, firstInnerPoint: p, secondInnerPoint: t })
	}, clone: function () {
		var e = this;
		return new B(m({}, e.config), m({}, e.options))
	} }), L = M.extend({ init: function (e, t) {
		var n = this;
		M.fn.init.call(n, t), n.pathTemplate = L.pathTemplate, n.pathTemplate || (n.pathTemplate = L.pathTemplate = b("M #= d.origin.x # #= d.origin.y # #= d.as.x # #= d.as.y # A#= d.r # #= d.r # 0 #= d.isReflexAngle ? '1' : '0' #,0 #= d.ae.x # #= d.ae.y # z")), n.config = e || new d.Pin
	}, renderPoints: function () {
		var e = this, t = e.config, n = t.radius, i = a.PI / 180, r = t.arcAngle, o = n * a.sin(r * i / 2), s = t.height - n * (1 - a.cos(r * i / 2)), l = t.origin, d = { x: l.x + o, y: l.y - s }, c = { x: l.x - o, y: l.y - s }, u = function (n, i) {
			var r = e.options.rotation, o = t.rotation;
			return n = _(n.x, n.y, r[1], r[2], -r[0]), i && (n = _(n.x, n.y, l.x, l.y, o)), n
		};
		return l = u(l), e.pathTemplate({ origin: l, as: u(d, !0), ae: u(c, !0), r: n, isReflexAngle: r > 180 })
	} }), V = B.extend({ init: function (e, t) {
		var n = this;
		B.fn.init.call(n, e, t), n.pathTemplate = V.pathTemplate, n.pathTemplate || (n.pathTemplate = V.pathTemplate = b("M #= d.firstOuterPoint.x # #= d.firstOuterPoint.y # A#= d.r # #= d.r # 0 #= d.isReflexAngle ? '1' : '0' #,1 #= d.secondOuterPoint.x # #= d.secondOuterPoint.y # L #= d.cx # #= d.cy # z"))
	}, options: { fill: "", fillOpacity: 1, strokeOpacity: 1, strokeLineCap: F }, clone: function () {
		var e = this;
		return new V(m({}, e.config), m({}, e.options))
	} }), U = h.extend({ init: function (e, t, n) {
		var i = this;
		h.fn.init.call(i, n), i.c = e, i.r = t, i.template = U.template, i.template || (i.template = U.template = b("<circle #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() #cx='#= d.c.x #' cy='#= d.c.y #' r='#= d.r #' #= d.renderAttr(\"stroke\", d.options.stroke) # #= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #fill-opacity='#= d.options.fillOpacity #' stroke-opacity='#= d.options.strokeOpacity #'  fill='#= d.options.fill || \"none\" #'></circle>"))
	}, options: { fill: "", fillOpacity: 1, strokeOpacity: 1 }, refresh: function (e) {
		r(e).attr({ r: a.max(0, this.r), "fill-opacity": this.options.fillOpacity })
	}, clone: function () {
		var e = this;
		return new U(m({}, e.c), e.r, m({}, e.options))
	} }), j = h.extend({ init: function (e) {
		var t = this;
		h.fn.init.call(t, e), t.template = j.template, t.template || (t.template = j.template = b('<g#= d.renderAttr("id", d.options.id) ##= d.renderDataAttributes() ##= d.renderAttr("clip-path", d.options.clipPath) #>#= d.renderContent() #</g>'))
	} }), W = h.extend({ init: function (e) {
		var t = this;
		h.fn.init.call(t, e), t.template = W.template, t.template || (t.template = W.template = b('<clipPath#= d.renderAttr("id", d.options.id) #>#= d.renderContent() #</clipPath>'))
	} }), q = h.extend({ init: function (e) {
		var t = this;
		h.fn.init.call(t, e)
	}, options: { id: "" }, renderStops: function () {
		var e, t, n = this, i = n.options.stops, r = n.stopTemplate, o = i.length, a = "";
		for (e = 0; o > e; e++)
			t = i[e], a += r(t);
		return a
	} }), G = q.extend({ init: function (e) {
		var t = this;
		q.fn.init.call(t, e), t.template = G.template, t.stopTemplate = G.stopTemplate, t.template || (t.template = G.template = b("<linearGradient id='#= d.options.id #' gradientTransform='rotate(#= d.options.rotation #)'> #= d.renderStops() #</linearGradient>"), t.stopTemplate = G.stopTemplate = b("<stop offset='#= Math.round(d.offset * 100) #%' style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />"))
	}, options: { rotation: 0} }), $ = q.extend({ init: function (e) {
		var t = this;
		q.fn.init.call(t, e), t.template = $.template, t.stopTemplate = $.stopTemplate, t.template || (t.template = $.template = b("<radialGradient id='#= d.options.id #' cx='#= d.options.cx #' cy='#= d.options.cy #' fx='#= d.options.cx #' fy='#= d.options.cy #' r='#= d.options.r #' gradientUnits='userSpaceOnUse'>#= d.renderStops() #</radialGradient>"), t.stopTemplate = $.stopTemplate = b("<stop offset='#= Math.round(d.offset * 100) #%' style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />"))
	} }), Y = h.extend({ init: function (e) {
		var t = this;
		h.fn.init.call(t, e), t.template = Y.template, t.stopTemplate = Y.stopTemplate, t.template || (t.template = Y.template = b("<radialGradient id='#= d.options.id #' cx='#= d.options.cx #' cy='#= d.options.cy #' fx='#= d.options.cx #' fy='#= d.options.cy #' r='#= d.options.r #' gradientUnits='userSpaceOnUse'>#= d.renderStops() #</radialGradient>"), t.stopTemplate = Y.stopTemplate = b("<stop offset='#= d.offset #%' style='stop-color:#= d.color #;stop-opacity:#= d.opacity #' />"))
	}, options: { id: "" }, renderStops: function () {
		var e, t, n = this, i = n.options, r = i.stops, o = n.stopTemplate, a = 100 * (i.ir / i.r), s = r.length, l = "";
		for (t = m({}, r[0]), t.offset = a, l += o(t), e = 1; s > e; e++)
			t = m({}, r[e]), t.offset = t.offset * (100 - a) + a, l += o(t);
		return l
	} });
	e.prototype = { decorate: function (e) {
		var t, n, i = this, r = i.view, o = e.options, a = o.id;
		return o.overlay ? (e.options.id = x(), t = r.createGroup(), n = e.clone(), t.children.push(e, n), n.options.id = a, n.options.fill = o.overlay, t) : e
	} }, t.prototype = { decorate: function (e) {
		var t = this, n = e.options;
		return n.fill = t.getPaint(n.fill), e
	}, getPaint: function (e) {
		var t, n, i, r = this, o = r.view, a = r.baseUrl(), s = o.definitions;
		return e && g(e.gradient) ? (t = o.buildGradient(e), t ? (n = t.id, i = s[n], i || (i = o.createGradient(t), s[n] = i), "url(" + a + "#" + i.options.id + ")") : A) : e
	}, baseUrl: function () {
		var e = o.getElementsByTagName("base")[0], t = "", n = o.location.href, i = n.indexOf("#");
		return e && !s.support.browser.msie && (-1 !== i && (n = n.substring(0, i)), t = n), t
	} };
	var Q = l.extend({ init: function (e) {
		this.view = e, this.clipId = x()
	}, decorate: function (e) {
		var t, n = this, i = n.view, r = n.clipId, o = i.options, a = e.options.animation, s = i.definitions, l = s[r];
		return a && a.type === w && o.transitions && (l || (l = new W({ id: r }), t = i.createRect(new c(0, 0, o.width, o.height), { id: x() }), l.children.push(t), s[r] = l, i.animations.push(new u(t, { size: o.width }))), e.options.clipPath = "url(#" + r + ")"), e
	} }), K = function (e, t) {
		e.innerHTML = t
	};
	(function () {
		var e = "<svg xmlns='" + I + "'></svg>", t = o.createElement("div"), n = typeof DOMParser != R;
		t.innerHTML = e, n && t.firstChild.namespaceURI != I && (K = function (e, t) {
			var n = new DOMParser, i = n.parseFromString(t, "text/xml"), r = o.adoptNode(i.documentElement);
			e.innerHTML = "", e.appendChild(r)
		})
	})(), m(d, { renderSVG: K, SVGCircle: U, SVGClipAnimationDecorator: Q, SVGClipPath: W, SVGGradientDecorator: t, SVGGroup: j, SVGLine: H, SVGLinearGradient: G, SVGOverlayDecorator: e, SVGPath: M, SVGRadialGradient: $, SVGDonutGradient: Y, SVGRing: B, SVGSector: V, SVGText: O, SVGView: N })
}(window.kendo.jQuery), function () {
	function e(e) {
		this.view = e
	}
	function t(e) {
		this.view = e
	}
	function n() {
		return d.support.browser.msie && !C() && window.performance !== void 0
	}
	function i(e, t, n) {
		var i = new f(e), o = new f(t), a = r(i.r, o.r, n), s = r(i.g, o.g, n), l = r(i.b, o.b, n);
		return new f(a, s, l).toHex()
	}
	function r(e, t, n) {
		return l.round(n * t + (1 - n) * e)
	}
	function o(e, t) {
		var n, r, o, a = t.stops, s = a.length, l = u({}, t);
		for (l.stops = [], n = 0; s > n; n++)
			r = a[n], o = l.stops[n] = u({}, a[n]), o.color = i(e, r.color, r.opacity), o.opacity = 0;
		return l
	}
	var a = jQuery, s = document, l = Math, d = window.kendo, c = d.Class, u = d.deepExtend, p = d.dataviz, f = p.Color, h = p.Box2D, m = p.Point2D, g = p.ExpandAnimation, v = p.ViewBase, b = p.ViewElement, _ = p.defined, x = p.renderTemplate, k = p.uniqueId, w = p.rotatePoint, y = p.round, C = p.supportsSVG, T = "#000", S = p.CLIP, A = p.COORD_PRECISION, D = p.DEFAULT_WIDTH, E = p.DEFAULT_HEIGHT, F = p.DEFAULT_FONT, I = "object", P = "linear", z = "radial", R = "transparent", N = v.extend({ init: function (i) {
		var r = this;
		v.fn.init.call(r, i), r.decorators.push(new e(r), new t(r)), p.ui.Chart && r.decorators.push(new p.BarAnimationDecorator(r), new p.PieAnimationDecorator(r), new p.BubbleAnimationDecorator(r)), r.decorators.push(new K(r)), n() || r.decorators.push(new p.FadeAnimationDecorator(r)), p.Gauge && r.decorators.push(new p.RadialPointerAnimationDecorator(r), new p.ArrowPointerAnimationDecorator(r), new p.BarIndicatorAnimationDecorator(r)), r.template = N.template, r.template || (r.template = N.template = x("<div style='width:#= d.options.width #px; height:#= d.options.height #px; position: relative;'>#= d.renderContent() #</div>"))
	}, options: { width: D, height: E }, renderTo: function (e) {
		var t = this;
		return s.namespaces && s.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML"), t.setupAnimations(), e.innerHTML = t.render(), t.playAnimations(), e.firstChild
	}, renderElement: function (e) {
		var t, n = s.createElement("div");
		return n.style.display = "none", s.body.appendChild(n), n.innerHTML = e.render(), t = n.firstChild, s.body.removeChild(n), t
	}, createText: function (e, t) {
		return this.decorate(t && t.rotation ? new M(e, t) : new O(e, t))
	}, createRect: function (e, t) {
		return this.decorate(new V(e.points(), !0, t))
	}, createLine: function (e, t, n, i, r) {
		return this.decorate(new V([new m(e, t), new m(n, i)], !1, r))
	}, createPolyline: function (e, t, n) {
		return this.decorate(new V(e, t, n))
	}, createCircle: function (e, t, n) {
		return this.decorate(new W(e, t, n))
	}, createSector: function (e, t) {
		return this.decorate(new j(e, t))
	}, createRing: function (e, t) {
		return this.decorate(new U(e, t))
	}, createGroup: function (e) {
		return this.decorate(new q(e))
	}, createGradient: function (e) {
		var t = _(e.cx) && _(e.cy) && _(e.bbox);
		return e.type === z && t ? new Q(e) : e.type === P ? new Y(e) : T
	} });
	N.fromModel = function (e) {
		var t = new N(e.options);
		return [].push.apply(t.children, e.getViewElements(t)), t
	}, N.available = function () {
		return d.support.browser.msie
	}, N.preference = 50, p.ui.registerView(N);
	var O = b.extend({ init: function (e, t) {
		var n = this;
		b.fn.init.call(n, t), n.content = e, n.template = O.template, n.template || (n.template = O.template = x("<kvml:textbox #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() #style='position: absolute; left: #= d.options.x #px; top: #= d.options.y #px; font: #= d.options.font #; color: #= d.options.color #; visibility: #= d.renderVisibility() #; white-space: nowrap;'>#= d.content #</kvml:textbox>"))
	}, options: { x: 0, y: 0, font: F, color: T, fillOpacity: 1 }, refresh: function (e) {
		a(e).css("visibility", this.renderVisibility())
	}, clone: function () {
		var e = this;
		return new O(e.content, u({}, e.options))
	}, renderVisibility: function () {
		return this.options.fillOpacity > 0 ? "visible" : "hidden"
	} }), M = b.extend({ init: function (e, t) {
		var n = this;
		b.fn.init.call(n, t), n.content = e, n.template = M.template, n.template || (n.template = M.template = x("<kvml:shape #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() #style='position: absolute; top: 0px; left: 0px; width: 1px; height: 1px;' stroked='false' coordsize='1,1'>#= d.renderPath() #<kvml:fill color='#= d.options.color #' /><kvml:textpath on='true' style='font: #= d.options.font #;' fitpath='false' string='#= d.content #' /></kvml:shape>"))
	}, options: { x: 0, y: 0, font: F, color: T, size: { width: 0, height: 0} }, renderPath: function () {
		var e = this, t = e.options, n = t.size.width, i = t.size.height, r = t.x + n / 2, o = t.y + i / 2, a = -t.rotation, s = w(t.x, o, r, o, a), l = w(t.x + n, o, r, o, a);
		return "<kvml:path textpathok='true' v='m " + y(s.x) + "," + y(s.y) + " l " + y(l.x) + "," + y(l.y) + "' />"
	} }), H = b.extend({ init: function (e) {
		var t = this;
		b.fn.init.call(t, e), t.template = H.template, t.template || (t.template = H.template = x('<kvml:stroke on=\'#= !!d.options.stroke #\' #= d.renderAttr("color", d.options.stroke) ##= d.renderAttr("weight", d.options.strokeWidth) ##= d.renderAttr("dashstyle", d.options.dashType) ##= d.renderAttr("opacity", d.options.strokeOpacity) # />'))
	}, refresh: function (e) {
		try {
			e.opacity = this.options.strokeOpacity
		}
		catch (t) {
		}
	} }), B = b.extend({ init: function (e) {
		var t = this;
		b.fn.init.call(t, e), t.template = B.template, t.template || (t.template = B.template = x('<kvml:fill on=\'#= d.isEnabled() #\' #= d.renderAttr("color", d.options.fill) ##= d.renderAttr("weight", d.options.fillWidth) ##= d.renderAttr("opacity", d.options.fillOpacity) # />'))
	}, isEnabled: function () {
		var e = this.options.fill;
		return !!e && e.toLowerCase() !== R
	}, refresh: function (e) {
		try {
			e.opacity = this.options.fillOpacity
		}
		catch (t) {
		}
	} }), L = b.extend({ init: function (e) {
		var t = this;
		b.fn.init.call(t, e), t.template = L.template, t.template || (t.template = L.template = x("<kvml:shape #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() #style='position:absolute; #= d.renderSize() #' coordorigin='0 0' #= d.renderCoordsize() # ><kvml:path v='#= d.renderPoints() # e' />#= d.fill.render() + d.stroke.render() #</kvml:shape>")), t.stroke = new H(t.options), t.fill = new B(t.options)
	}, options: { fill: "", fillOpacity: 1, strokeOpacity: 1, rotation: [0, 0, 0] }, renderCoordsize: function () {
		var e = this.options.align === !1 ? 1e4 : 1;
		return "coordsize='" + e + " " + e + "'"
	}, renderSize: function () {
		var e = this.options.align === !1 ? 100 : 1;
		return "width:" + e + "px; height:" + e + "px;"
	}, render: function () {
		var e = this;
		return e.fill.options.fillOpacity = e.options.fillOpacity, e.stroke.options.strokeOpacity = e.options.strokeOpacity, b.fn.render.call(e)
	}, renderPoints: function () {
	}, refresh: function (e) {
		if (e) {
			var t = this, n = a(e), i = n[0].parentNode, r = t.fill, o = t.stroke;
			i && (n.find("path")[0].v = this.renderPoints(), r.options = o.options = t.options, r.refresh(n.find("fill")[0]), o.refresh(n.find("stroke")[0]), i.style.cssText = i.style.cssText)
		}
	} }), V = L.extend({ init: function (e, t, n) {
		var i = this;
		L.fn.init.call(i, n), i.points = e, i.closed = t
	}, renderPoints: function () {
		var e, t = this, n = t.points, i = n.length, r = function (e) {
			var n = t.options.rotation;
			return w(e.x, e.y, n[1], n[2], -n[0])
		}, o = "m " + t._print(r(n[0]));
		if (i > 1)
			for (o += " l ", e = 1; i > e; e++)
				o += t._print(r(n[e])), i - 1 > e && (o += ", ");
		return t.closed && (o += " x"), o
	}, clone: function () {
		var e = this;
		return new V(u([], e.points), e.closed, u({}, e.options))
	}, _print: function (e) {
		var t = this.options.align === !1 ? 100 : 1;
		return l.round(e.x * t) + "," + l.round(e.y * t)
	} }), U = L.extend({ init: function (e, t) {
		var n = this;
		L.fn.init.call(n, t), n.pathTemplate = U.pathTemplate, n.pathTemplate || (n.pathTemplate = U.pathTemplate = x("M #= d.osp.x #,#= d.osp.y # WA #= d.obb.l #,#= d.obb.t # #= d.obb.r #,#= d.obb.b # #= d.osp.x #,#= d.osp.y # #= d.oep.x #,#= d.oep.y # L #= d.iep.x #,#= d.iep.y # AT #= d.ibb.l #,#= d.ibb.t # #= d.ibb.r #,#= d.ibb.b # #= d.iep.x #,#= d.iep.y # #= d.isp.x #,#= d.isp.y # X E")), n.config = e
	}, renderPoints: function () {
		function e(e) {
			return new m(y(e.x), y(e.y))
		}
		var t, n, i, r, o = this, a = o.config, s = l.max(y(a.r), 0), d = l.max(y(a.ir), 0), c = y(a.c.x), u = y(a.c.y), p = a.startAngle, f = a.angle + p, h = f - p, g = { l: c - s, t: u - s, r: c + s, b: u + s }, v = { l: c - d, t: u - d, r: c + d, b: u + d };
		return 1 >= h ? f += 1 - h : h > 359 && (f -= 1 - h), t = e(a.point(p)), n = e(a.point(p, !0)), r = e(a.point(f)), i = e(a.point(f, !0)), o.pathTemplate({ obb: g, ibb: v, osp: t, isp: n, oep: r, iep: i, cx: c, cy: u })
	}, clone: function () {
		var e = this;
		return new U(u({}, e.config), u({}, e.options))
	} }), j = U.extend({ init: function (e, t) {
		var n = this;
		U.fn.init.call(n, e, t), n.pathTemplate = j.pathTemplate, n.pathTemplate || (n.pathTemplate = j.pathTemplate = x("M #= d.osp.x #,#= d.osp.y # WA #= d.obb.l #,#= d.obb.t # #= d.obb.r #,#= d.obb.b # #= d.osp.x #,#= d.osp.y # #= d.oep.x #,#= d.oep.y # L #= d.cx #,#= d.cy # X E"))
	}, clone: function () {
		var e = this;
		return new j(u({}, e.config), u({}, e.options))
	} }), W = b.extend({ init: function (e, t, n) {
		var i = this;
		b.fn.init.call(i, n), i.c = e, i.r = t, i.template = W.template, i.template || (i.template = W.template = x("<kvml:oval #= d.renderAttr(\"id\", d.options.id) # #= d.renderDataAttributes() #style='position:absolute; width:#= d.r * 2 #px; height:#= d.r * 2 #px; top:#= d.c.y - d.r #px; left:#= d.c.x - d.r #px;'>#= d.fill.render() + d.stroke.render() #</kvml:oval>")), i.stroke = new H(i.options), i.fill = new B(i.options)
	}, options: { fill: "" }, refresh: function (e) {
		var t = this, n = t.c, i = l.max(0, t.r), r = 2 * i, o = a(e);
		o.css({ width: r, height: r, top: n.y - i, left: n.x - i }), t.fill.options = t.options, t.fill.refresh(o.find("fill")[0])
	}, clone: function () {
		var e = this;
		return new W(u({}, e.c), e.r, u({}, e.options))
	} }), q = b.extend({ init: function (e) {
		var t = this;
		b.fn.init.call(t, e), t.template = q.template, t.template || (t.template = q.template = x("<div #= d.renderAttr(\"id\", d.options.id) ##= d.renderDataAttributes() #style='position: absolute; white-space: nowrap;'>#= d.renderContent() #</div>"))
	} }), G = b.extend({ init: function (e, t) {
		var n = this;
		b.fn.init.call(n, t), n.template = G.template, n.clipTemplate = G.clipTemplate, n.template || (n.template = G.template = x("<div #= d.renderAttr(\"id\", d.options.id) #style='position:absolute; width:#= d.box.width() #px; height:#= d.box.height() #px; top:#= d.box.y1 #px; left:#= d.box.x1 #px; clip:#= d._renderClip() #;' >#= d.renderContent() #</div>"), n.clipTemplate = G.clipTemplate = x("rect(#= d.points[0].y #px #= d.points[1].x #px #= d.points[2].y #px #= d.points[0].x #px)")), n.box = e, n.points = e.points()
	}, clone: function () {
		var e = this;
		return new G(e.box, u({}, e.options))
	}, refresh: function (e) {
		e && (e.style.clip = this._renderClip())
	}, _renderClip: function () {
		return this.clipTemplate(this)
	}, destroy: function () {
		a("#" + this.options.id + ">*").unwrap()
	} }), $ = b.extend({ init: function (e) {
		var t = this;
		b.fn.init.call(t, e)
	}, options: { opacity: 1 }, renderColors: function () {
		var e, t, n = this, i = n.options, r = i.stops, o = r.length, a = [], s = l.round;
		for (t = 0; o > t; t++)
			e = r[t], a.push(s(100 * e.offset) + "% " + e.color);
		return a.join(",")
	} }), Y = $.extend({ init: function (e) {
		var t = this;
		$.fn.init.call(t, e), t.template = Y.template, t.template || (t.template = Y.template = x("<kvml:fill type='gradient' angle='#= 270 - d.options.rotation #' colors='#= d.renderColors() #' opacity='#= d.options.opacity #' />"))
	}, options: { rotation: 0} }), Q = $.extend({ init: function (e) {
		var t = this;
		$.fn.init.call(t, e), t.template = Q.template, t.template || (t.template = Q.template = x("<kvml:fill type='gradienttitle' focus='100%' focusposition='#= d.focusPosition() #'colors='#= d.renderColors() #' color='#= d.firstColor() #' color2='#= d.lastColor() #' opacity='#= d.options.opacity #' />"))
	}, focusPosition: function () {
		var e = this.options, t = e.bbox, n = e.cx, i = e.cy, r = Math.max(0, Math.min(1, (n - t.x1) / t.width())), o = Math.max(0, Math.min(1, (i - t.y1) / t.height()));
		return y(r, A) + " " + y(o, A)
	}, firstColor: function () {
		var e = this.options.stops;
		return e[0].color
	}, lastColor: function () {
		var e = this.options.stops;
		return e[e.length - 1].color
	} });
	e.prototype = { decorate: function (e) {
		var t, n, i = e.options, r = this.view;
		return i.overlay && (n = i.overlay.bbox, t = r.buildGradient(u({}, i.overlay, { _overlayFill: i.fill, _bboxHash: _(n) ? n.getHash() : "" }))), t ? (delete i.overlay, i.fill = u(o(i.fill, t), { opacity: i.fillOpacity }), e) : e
	} }, t.prototype = { decorate: function (e) {
		var t = this, n = t.view, i = e.options, r = i.fill;
		return r && r.supportVML !== !1 && (r.gradient && (r = n.buildGradient(r)), typeof r === I && (e.fill = n.createGradient(r))), e
	} };
	var K = c.extend({ init: function (e) {
		this.view = e
	}, decorate: function (e) {
		var t, n = this, i = n.view, r = i.options, o = e.options.animation;
		return o && o.type === S && r.transitions ? (t = new G(new h(0, 0, r.width, r.height), { id: k() }), i.animations.push(new g(t, { size: r.width })), t.children.push(e), t) : e
	} });
	u(p, { VMLCircle: W, VMLClipAnimationDecorator: K, VMLClipRect: G, VMLFill: B, VMLGroup: q, VMLLine: V, VMLLinearGradient: Y, VMLOverlayDecorator: e, VMLPath: L, VMLRadialGradient: Q, VMLRing: U, VMLRotatedText: M, VMLSector: j, VMLStroke: H, VMLText: O, VMLView: N, blendColors: i, blendGradient: o })
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = window.location, i = window.history, r = 50, o = /^#*/, a = window.document.documentMode, s = t.support.browser.msie && (!a || 8 >= a), l = "onhashchange" in window && !s, d = window.document, c = t.Observable.extend({ start: function (e) {
		e = e || {};
		var t = this;
		return t._pushStateRequested = !!e.pushState, t._pushState = t._pushStateRequested && t._pushStateSupported(), t.root = e.root || "/", t._interval = 0, this.bind(["change", "ready"], e), t._normalizeUrl() ? !0 : (t.current = t._currentLocation(), t._listenToLocationChange(), t.trigger("ready", { url: t.current }), undefined)
	}, stop: function () {
		e(window).unbind(".kendo"), this.unbind("change"), this.unbind("ready"), clearInterval(this._interval)
	}, _normalizeUrl: function () {
		var e, t = this, r = t.root == n.pathname, a = t._pushStateRequested && !t._pushStateSupported() && !r, s = t._pushState && r && n.hash;
		return a ? (n.replace(t.root + "#" + t._stripRoot(n.pathname)), !0) : s ? (e = t._makePushStateUrl(n.hash.replace(o, "")), i.replaceState({}, d.title, e), !1) : !1
	}, _listenToLocationChange: function () {
		var t = this, n = e.proxy(t._checkUrl, t);
		this._pushState ? e(window).bind("popstate.kendo", n) : l ? e(window).bind("hashchange.kendo", n) : t._interval = setInterval(n, r)
	}, _pushStateSupported: function () {
		return window.history && window.history.pushState
	}, _checkUrl: function () {
		var e = this, t = e._currentLocation();
		t != e.current && e.navigate(t)
	}, _stripRoot: function (e) {
		var t = this;
		return 0 === e.indexOf(t.root) ? ("/" + e.substr(t.root.length)).replace(/\/\//g, "/") : e
	}, _makePushStateUrl: function (e) {
		var t = this;
		return 0 !== e.indexOf(t.root) && (e = (t.root + e).replace(/\/\//g, "/")), n.protocol + "//" + n.host + e
	}, _currentLocation: function () {
		var e, t = this;
		return t._pushState ? (e = n.pathname, n.search && (e += n.search), t._stripRoot(e)) : n.hash.replace(o, "")
	}, change: function (e) {
		this.bind("change", e)
	}, navigate: function (e, t) {
		var r = this;
		return "#:back" === e ? (i.back(), undefined) : (e = e.replace(o, ""), r.current !== e && r.current !== decodeURIComponent(e) && (r._pushState ? (i.pushState({}, d.title, r._makePushStateUrl(e)), r.current = e) : n.hash = r.current = e, t || r.trigger("change", { url: r.current })), undefined)
	} });
	t.history = new c
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.ui.Widget, i = e.proxy, r = Math.abs, o = 20, a = t.Class.extend({ init: function (n, i, o) {
		o = e.extend({ minXDelta: 30, maxYDelta: 20, maxDuration: 1e3 }, o), new t.UserEvents(n, { surface: o.surface, allowSelection: !0, start: function (e) {
			2 * r(e.x.velocity) >= r(e.y.velocity) && e.sender.capture()
		}, move: function (e) {
			var t = e.touch, n = e.event.timeStamp - t.startTime, a = t.x.initialDelta > 0 ? "right" : "left";
			r(t.x.initialDelta) >= o.minXDelta && o.maxYDelta > r(t.y.initialDelta) && o.maxDuration > n && (i({ direction: a, touch: t, target: t.target }), t.cancel())
		} })
	} }), s = n.extend({ init: function (e, r) {
		function o(e) {
			return function (t) {
				s._triggerTouch(e, t)
			}
		}
		function a(e) {
			return function (t) {
				s.trigger(e, { touches: t.touches, distance: t.distance, center: t.center })
			}
		}
		var s = this;
		n.fn.init.call(s, e, r), r = s.options, e = s.element, s.events = new t.UserEvents(e, { surface: r.surface, multiTouch: r.multiTouch, allowSelection: !0, press: i(s, "_touchstart"), tap: i(s, "_tap"), gesturestart: a("gesturestart"), gesturechange: a("gesturechange"), gestureend: a("gestureend") }), r.enableSwipe ? (s.events.bind("start", i(s, "_swipestart")), s.events.bind("move", i(s, "_swipemove"))) : (s.events.bind("start", i(s, "_dragstart")), s.events.bind("move", o("drag")), s.events.bind("end", o("dragend"))), t.notify(s)
	}, events: ["touchstart", "dragstart", "drag", "dragend", "tap", "doubletap", "hold", "swipe", "gesturestart", "gesturechange", "gestureend"], options: { name: "Touch", surface: null, global: !1, multiTouch: !1, enableSwipe: !1, minXDelta: 30, maxYDelta: 20, maxDuration: 1e3, minHold: 800, doubleTapTimeout: 800 }, _cancelHold: function () {
		clearTimeout(this.holdTimeout)
	}, _triggerTouch: function (e, t) {
		this.trigger(e, { touch: t.touch })
	}, _touchstart: function (e) {
		var t = this;
		t._triggerTouch("touchstart", e), t._cancelHold(), t.holdTimeout = setTimeout(function () {
			t._triggerTouch("hold", e)
		}, t.options.minHold)
	}, _tap: function (e) {
		var n = this, i = n.lastTap, r = e.touch;
		n._cancelHold(), i && n.options.doubleTapTimeout > r.endTime - i.endTime && o > t.touchDelta(r, i).distance ? (n._triggerTouch("doubletap", e), n.lastTap = null) : (n._triggerTouch("tap", e), n.lastTap = r)
	}, _dragstart: function (e) {
		this._cancelHold(), this._triggerTouch("dragstart", e)
	}, _swipestart: function (e) {
		this._cancelHold(), 2 * r(e.x.velocity) >= r(e.y.velocity) && e.sender.capture()
	}, _swipemove: function (e) {
		var t = this, n = t.options, i = e.touch, o = e.event.timeStamp - i.startTime, a = i.x.initialDelta > 0 ? "right" : "left";
		t._cancelHold(), r(i.x.initialDelta) >= n.minXDelta && n.maxYDelta > r(i.y.initialDelta) && n.maxDuration > o && (t.trigger("swipe", { direction: a, touch: e.touch }), i.cancel())
	} });
	window.jQuery.fn.kendoMobileSwipe = function (e, t) {
		this.each(function () {
			new a(this, e, t)
		})
	}, t.ui.plugin(s)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile, i = n.ui, r = "show", o = "hide", a = "open", s = "close", l = '<div class="km-popup-wrapper" />', d = '<div class="km-popup-arrow" />', c = '<div class="km-popup-overlay" />', u = "km-up km-down km-left km-right", p = i.Widget, f = { down: { origin: "bottom center", position: "top center" }, up: { origin: "top center", position: "bottom center" }, left: { origin: "center left", position: "center right", collision: "fit flip" }, right: { origin: "center right", position: "center left", collision: "fit flip"} }, h = { animation: { open: { effects: "fade:in", duration: 0 }, close: { effects: "fade:out", duration: 400}} }, m = { horizontal: { offset: "top", size: "height" }, vertical: { offset: "left", size: "width"} }, g = { up: "down", down: "up", left: "right", right: "left" }, v = p.extend({ init: function (i, r) {
		var a, s = this, u = n.application.element, g = { viewport: t.mobile.application.element, open: function () {
			s.overlay.show()
		}, activate: e.proxy(s._activate, s), deactivate: function () {
			s.overlay.hide(), s.trigger(o)
		} };
		p.fn.init.call(s, i, r), i = s.element, r = s.options, i.wrap(l).addClass("km-popup").show(), a = s.options.direction.match(/left|right/) ? "horizontal" : "vertical", s.dimensions = m[a], s.wrapper = i.parent().css({ width: r.width, height: r.height }).addClass("km-popup-wrapper km-" + r.direction).hide(), s.arrow = e(d).prependTo(s.wrapper).hide(), s.overlay = e(c).appendTo(u).hide(), g.appendTo = s.overlay, s.popup = new t.ui.Popup(s.wrapper, e.extend(!0, g, h, f[r.direction]))
	}, options: { name: "Popup", width: 240, height: 320, direction: "down" }, events: [r, o], show: function (t) {
		var n = this, i = n.popup;
		i.options.anchor = e(t), i.open()
	}, target: function () {
		return this.popup.options.anchor
	}, hide: function () {
		this.popup.close()
	}, destroy: function () {
		p.fn.destroy.call(this), this.popup.destroy()
	}, _activate: function () {
		var t = this, n = t.options.direction, i = t.dimensions, o = i.offset, a = t.popup, s = a.options.anchor, l = e(s).offset(), d = e(a.element).offset(), c = a.flipped ? g[n] : n, p = l[o] - d[o] + e(s)[i.size]() / 2;
		t.wrapper.removeClass(u).addClass("km-" + c), t.arrow.css(o, p).show(), t.trigger(r)
	} }), b = p.extend({ init: function (n, r) {
		var o, l = this;
		l.initialOpen = !1, p.fn.init.call(l, n, r), r = l.options, o = e.extend({ show: function () {
			l.trigger(a, { target: l.popup.target() })
		}, hide: function () {
			l.trigger(s)
		} }, this.options.popup), l.popup = new v(l.element, o), l.pane = new i.Pane(l.element, this.options.pane), t.notify(l, i)
	}, options: { name: "PopOver", popup: {}, pane: {} }, events: [a, s], open: function (e) {
		this.openFor(e)
	}, openFor: function (e) {
		this.popup.show(e), this.initialOpen || (this.pane.navigate(""), this.initialOpen = !0)
	}, close: function () {
		this.popup.hide()
	}, destroy: function () {
		p.fn.destroy.call(this), this.pane.destroy(), this.popup.destroy(), t.destroy(this.element)
	} });
	i.plugin(v), i.plugin(b)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile.ui, i = n.Widget, r = ["touchstart", "touchend", "touchmove", "mousedown", "mousemove", "mouseup"], o = i.extend({ init: function (t, n) {
		var r = this, o = e('<div class="km-loader"><span class="km-loading km-spin"></span></div>');
		i.fn.init.call(r, o, n), r.container = t, r._attachCapture(), o.append(r.options.loading).hide().appendTo(t)
	}, options: { name: "Loader", loading: "<h1>Loading...</h1>", timeout: 100 }, show: function () {
		var e = this;
		clearTimeout(e._loading), e.options.loading !== !1 && (e._loading = setTimeout(function () {
			e.element.show()
		}, e.options.timeout))
	}, hide: function () {
		var e = this;
		clearTimeout(e._loading), e.element.hide()
	}, transition: function () {
		this.transitioning = !0
	}, transitionDone: function () {
		this.transitioning = !1
	}, _attachCapture: function () {
		function e(e) {
			t.transitioning && e.stopPropagation()
		}
		var t = this;
		t.transitioning = !1;
		for (var n = 0; r.length > n; n++)
			t.container[0].addEventListener(r[n], e, !0)
	} });
	n.plugin(o)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.mobile.ui, r = n.ui.Popup, o = '<div class="km-shim"/>', a = i.Widget, s = a.extend({
		init: function (t, i) {
			var s = this, l = "ios" === n.mobile.application.os, d = i.align || (l ? "bottom center" : "center center"), c = i.position || (l ? "bottom center" : "center center"), u = i.effect || (l ? "slideIn:up" : "fade:in"), p = e(o).handler(s).hide();
			a.fn.init.call(s, t, i), s.shim = p, s.element = t, s.options.modal || s.shim.on("up", "hide"), n.mobile.application.element.append(p), s.popup = new r(s.element, {
				anchor: p, appendTo: p, origin: d, position: c, animation: { open: { effects: u, duration: s.options.duration }, close: { duration: s.options.duration} }, deactivate: function () {
					p.hide()
				}, open: function () {
					p.show()
				}
			}), n.notify(s)
		}, options: { name: "Shim", modal: !0, align: t, position: t, effect: t, duration: 200 }, show: function () {
			this.popup.open()
		}, hide: function () {
			this.popup.close()
		}, destroy: function () {
			a.fn.destroy.call(this), this.shim.kendoDestroy(), this.popup.destroy()
		}
	});
	i.plugin(s)
}(window.kendo.jQuery), function (e, t) {
	function n(e) {
		var t, n, i = e.find(b("popover")), r = l.roles;
		for (t = 0, n = i.length; n > t; t++)
			a.initWidget(i[t], {}, r)
	}
	function i(e, t) {
		e[0] && t[0] && e[0] != t[0] && e.kendoAnimateTo(t, { effects: "fade" })
	}
	function r(t) {
		t.each(function () {
			a.initWidget(e(this), {}, l.roles)
		})
	}
	function o(e) {
		for (var t = e.split("?")[1] || "", n = {}, i = t.split(/&|=/), r = i.length, o = 0; r > o; o += 2)
			n[i[o]] = i[o + 1];
		return n
	}
	var a = window.kendo, s = a.mobile, l = s.ui, d = a.attr, c = a.Class, u = l.Widget, p = "init", f = "show", h = "beforeShow", m = "hide", g = "z-index", v = a.attrValue, b = a.roleSelector, _ = u.extend({ init: function (t, n) {
		var i = this;
		u.fn.init.call(i, t, n), t = i.element, i.params = {}, i.lastParams = {}, e.extend(i, n), i._layout(), i._scroller(), i._model()
	}, events: [p, h, f, m], options: { name: "View", title: "", defaultTransition: "", stretch: !1, zoom: !1, model: null }, destroy: function () {
		u.fn.destroy.call(this), this.scroller && this.scroller.destroy(), a.destroy(this.element)
	}, showStart: function () {
		var e = this;
		e.element.css("display", ""), e.inited || (e.inited = !0, e.trigger(p, { view: e })), e.layout && e.layout.attach(e), e.trigger(f, { view: e })
	}, hideStart: function () {
		var e = this;
		e.layout && e.layout.detach(e)
	}, hideComplete: function () {
		var e = this;
		e.element.hide(), e.trigger(m, { view: e })
	}, updateParams: function (e) {
		var t = this;
		t.trigger(h, { view: t }) || (t.lastParams = t.params, t.params = e, t.trigger(f, { view: t }))
	}, switchWith: function (e, t, n, i) {
		var r = this;
		r.trigger(h, { view: r }) || (r.lastParams = r.params, r.params = n, e ? (e.hideStart(), r.showStart(), new x({ current: e, next: r, transition: t, defaultTransition: e.options.defaultTransition, complete: i })) : (r.showStart(), i()))
	}, parallaxContents: function (e) {
		var t = this, n = t.content;
		return e.header[0] || (n = n.add(t.header)), e.footer[0] || (n = n.add(t.footer)), n
	}, _scroller: function () {
		var e = this;
		e.options.stretch ? e.content.addClass("km-stretched-view") : (e.content.kendoMobileScroller({ zoom: e.options.zoom }), e.scroller = e.content.data("kendoMobileScroller"), e.scrollerContent = e.scroller.scrollElement)
	}, _model: function () {
		var e = this, t = e.element, i = e.options.model;
		"string" == typeof i && (i = a.getter(i)(window)), e.model = i, n(t), i ? a.bind(t.children(), i, l, a.ui, a.dataviz.ui) : s.init(t.children())
	}, _layout: function () {
		var e = this, t = b("content"), n = e.element;
		n.data("kendoView", e).addClass("km-view"), e.transition = v(n, "transition"), e.header = n.children(b("header")).addClass("km-header"), e.footer = n.children(b("footer")).addClass("km-footer"), n.children(t)[0] || n.wrapInner("<div " + d("role") + '="content"></div>'), e.content = n.children(b("content")).addClass("km-content"), e.element.prepend(e.header).append(e.footer), e.id = v(n, "url") || "#" + n.attr("id"), e.layout && e.layout.setup(e)
	} }), x = c.extend({ init: function (t) {
		e.extend(this, t);
		var n = this, r = n.current, o = n.next, a = r.element, s = o.element, l = o, d = r, c = n._transition();
		c.reverse && !c.parallax && (l = r, d = o), l.element.css(g, 1), d.element.css(g, 0), c.parallax && (i(r.footer, o.footer), i(r.header, o.header), a = r.parallaxContents(o), s = o.parallaxContents(r)), a.kendoAnimateTo(s, c), n.back() || (r.nextView = o, r.backTransition = c.transition)
	}, _transition: function () {
		var e = this, t = e.current, n = e.next, i = e.back(), r = function () {
			t.hideComplete(), e.complete()
		}, o = i ? n.backTransition : n.transition, a = e.transition || o || e.defaultTransition, s = a.split(" "), l = s[0], d = /^slide/.test(l), c = "reverse" === s[1];
		return e.back() && !e.transition && (c = !c), { effects: l, reverse: c, parallax: d, complete: r, transition: a}
	}, back: function () {
		var e = this.next, t = this.current;
		return e.nextView === t && JSON.stringify(e.params) === JSON.stringify(e.lastParams)
	} }), k = u.extend({ init: function (e, t) {
		var i = this;
		u.fn.init.call(i, e, t), e = i.element, i.element = e.detach(), i.header = e.children(b("header")).addClass("km-header"), i.footer = e.children(b("footer")).addClass("km-footer"), i.elements = i.header.add(i.footer), n(e), a.mobile.init(i.element.children()), i.trigger(p, { layout: i })
	}, options: { name: "Layout" }, events: [p, f, m], setup: function (e) {
		e.header[0] || (e.header = this.header), e.footer[0] || (e.footer = this.footer)
	}, detach: function (e) {
		var t = this;
		e.header === t.header && e.element.prepend(t.header.detach().clone(!0)), e.footer === t.footer && e.element.append(t.footer.detach().clone(!0)), t.trigger(m, { layout: t, view: e })
	}, attach: function (e) {
		var t = this;
		e.header === t.header && (t.header.detach(), e.element.children(b("header")).remove(), e.element.prepend(t.header)), e.footer === t.footer && (t.footer.detach(), e.element.children(b("footer")).remove(), e.element.append(t.footer)), t.trigger(f, { layout: t, view: e })
	} }), w = a.Observable, y = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i, C = "loadStart", T = "loadComplete", S = "showStart", A = "viewShow", D = w.extend({ init: function (t) {
		var n, i, o = this;
		if (w.fn.init.call(o), e.extend(o, t), o.sandbox = e("<div />"), i = o.container, n = o._hideViews(i), o.rootView = n.first(), !o.rootView[0])
			throw Error('Your kendo mobile application element does not contain any direct child elements with data-role="view" attribute set. Make sure that you instantiate the mobile application using the correct container.');
		o._view = null, o.layouts = {}, o._setupLayouts(i), r(i.children(b("modalview"))), o.loader && (o.bind(S, function () {
			o.loader.transition()
		}), o.bind(C, function () {
			o.loader.show()
		}), o.bind(T, function () {
			o.loader.hide()
		}), o.bind(A, function () {
			o.loader.transitionDone()
		}))
	}, view: function () {
		return this._view
	}, showView: function (e, t) {
		var n, i, r = this, a = r.container, s = o(e), l = e.split("?")[0];
		e !== r.url && (r.url = e, r.trigger(S), e ? (i = a.children("[" + d("url") + "='" + e + "']"), i[0] || -1 !== l.indexOf("/") || (i = a.children("#" === l.charAt(0) ? l : "#" + l))) : i = r.rootView, n = i.data("kendoView"), i[0] ? (n || (n = r._createView(i)), r._show(n, t, s)) : r._loadView(e, function (e) {
			r._show(e, t, s)
		}))
	}, _createView: function (e) {
		var n, i = this, r = v(e, "layout");
		return r === t && (r = i.layout), r && (r = i.layouts[r]), n = { defaultTransition: i.transition, loader: i.loader, container: i.container, layout: r }, a.initWidget(e, n, l.roles)
	}, _loadView: function (t, n) {
		var i = this;
		i._xhr && i._xhr.abort(), i.trigger(C), i._xhr = e.get(t, function (e) {
			i.trigger(T), n(i._createRemoteView(t, e))
		}, "html").fail(function (e) {
			i.trigger(T), 0 === e.status && e.responseText && n(i._createRemoteView(t, e.responseText))
		})
	}, _createRemoteView: function (e, t) {
		var n, i, o, a = this, s = a.sandbox, l = a.container;
		return y.test(t) && (t = RegExp.$1), s[0].innerHTML = t, l.append(s.children("script, style")), n = a._hideViews(s), o = n.first(), o.hide().attr(d("url"), e), a._setupLayouts(s), i = s.children(b("modalview")), l.append(s.children(b("layout modalview")).add(n)), r(i), a._createView(o)
	}, _show: function (e, t, n) {
		var i = this;
		i._view !== e ? e.switchWith(i._view, t, n, function () {
			i._view = e, i.trigger(A, { view: e })
		}) : (i._view.updateParams(n), i.trigger(A, { view: e }))
	}, _hideViews: function (e) {
		return e.children(b("view splitview")).hide()
	}, _setupLayouts: function (n) {
		var i = this;
		n.children(b("layout")).each(function () {
			var n = e(this), r = v(n, "platform");
			(r === t || r === s.application.os) && (i.layouts[n.data("id")] = a.initWidget(n, {}, l.roles))
		})
	} });
	a.mobile.ViewEngine = D, l.plugin(_), l.plugin(k)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile.ui, i = n.Shim, r = n.Widget, o = "open", a = '<div class="km-modalview-wrapper" />', s = n.View.extend({ init: function (e, n) {
		var o, s, l = this;
		r.fn.init.call(l, e, n), e = l.element, n = l.options, o = e[0].style.width || e.css("width"), s = e[0].style.height || e.css("height"), e.addClass("km-modalview").wrap(a), l.wrapper = e.parent().css({ width: n.width || o || 300, height: n.height || s || 300 }), e.css({ width: "", height: "" }), l.shim = new i(l.wrapper, { modal: n.modal, position: "center center", align: "center center", effect: "fade:in" }), l._layout(), l._scroller(), l._model(), t.onResize(function () {
			var e = l.wrapper.parent(), t = e.parent();
			e.css({ top: (t.height() - e.height()) / 2 + "px", left: (t.width() - e.width()) / 2 + "px" })
		})
	}, events: [o], options: { name: "ModalView", modal: !0, width: null, height: null }, destroy: function () {
		r.fn.destroy.call(this), this.shim.destroy()
	}, open: function (t) {
		var n = this;
		n.target = e(t), n.shim.show(), n.trigger("show", { view: n })
	}, openFor: function (e) {
		this.open(e), this.trigger(o, { target: e })
	}, close: function () {
		this.shim.hide()
	} });
	n.plugin(s)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile.ui, i = n.Widget, r = n.View, o = r.extend({ init: function (r, o) {
		var a = this;
		i.fn.init.call(a, r, o), r = a.element, e.extend(a, o), a._layout(), a._style(), t.mobile.init(r.children(t.roleSelector("modalview"))), a.panes = [], a.element.children(t.roleSelector("pane")).each(function () {
			a.panes.push(t.initWidget(this, {}, n.roles))
		})
	}, options: { name: "SplitView", style: "horizontal" }, _layout: function () {
		var n = this, i = n.element;
		i.data("kendoView", n).addClass("km-view km-splitview"), n.transition = t.attrValue(i, "transition"), e.extend(n, { header: [], footer: [], content: i })
	}, _style: function () {
		var t, n = this.options.style, i = this.element;
		n && (t = n.split(" "), e.each(t, function () {
			i.addClass("km-split-" + this)
		}))
	}, showStart: function () {
		var t = this;
		t.element.css("display", ""), t.inited || (t.inited = !0, e.each(t.panes, function () {
			this.navigate("")
		}), t.trigger("init", { view: t })), t.trigger("show", { view: t })
	} });
	n.plugin(o)
}(window.kendo.jQuery), function (e, t) {
	function n(t) {
		b(e(t.currentTarget), "rel") != u && t.preventDefault()
	}
	function i(t) {
		b(e(t.currentTarget), "rel") !== u && t.preventDefault()
	}
	var r = window.kendo, o = r.mobile, a = r.roleSelector, s = o.ui, l = s.Widget, d = o.ViewEngine, c = o.ui.Loader, u = "external", p = "href", f = "#!", h = "navigate", m = "viewShow", g = /popover|actionsheet|modalview/, v = "#:back", b = r.attrValue, _ = "button backbutton detailbutton listview-link", x = "tab", k = l.extend({ init: function (e, t) {
		var n = this;
		l.fn.init.call(n, e, t), e = n.element, e.addClass("km-pane"), n.loader = new c(e, { loading: n.options.loading }), n.viewEngine = new d({ container: e, transition: n.options.transition, layout: n.options.layout, loader: n.loader }), n.viewEngine.bind(m, function (e) {
			n.trigger(m, e)
		}), n.history = [], n._setupAppLinks()
	}, options: { name: "Pane", transition: "", layout: "", loading: t }, events: [h, m], destroy: function () {
		l.fn.destroy.call(this), r.destroy(this.element)
	}, navigate: function (e, t) {
		var n = this, i = n.history;
		e === v ? (i.pop(), e = i[i.length - 1]) : n.history.push(e), n.trigger(h, { url: e }), n.viewEngine.showView(e, t)
	}, hideLoading: function () {
		this.loader.hide()
	}, showLoading: function () {
		this.loader.show()
	}, view: function () {
		return this.viewEngine.view()
	}, _setupAppLinks: function () {
		this.element.handler(this).on("down", a(x), "_mouseup").on("up", a(_), "_mouseup").on("click", a(x + " " + _), n).on("touchstart", a(_), i).on("touchstart", ".km-popup .k-item", r.preventDefault)
	}, _mouseup: function (n) {
		if (!(n.which > 1 || n.isDefaultPrevented())) {
			var i = e(n.currentTarget), a = b(i, "transition"), l = b(i, "rel") || "", d = b(i, "target"), c = this, h = i.attr(p);
			l !== u && h !== t && h !== f && (i.attr(p, f), setTimeout(function () {
				i.attr(p, h)
			}), l.match(g) ? r.widgetInstance(e(h), s).openFor(i) : ("_top" === d ? c = o.application.pane : d && (c = e("#" + d).data("kendoMobilePane")), c.navigate(h, a)), n.preventDefault())
		}
	} });
	s.plugin(k)
}(window.kendo.jQuery), function (e, t) {
	function n() {
		return 1 == Math.abs(window.orientation) / 90
	}
	function i() {
		return n() ? m : h
	}
	function r() {
		e("meta[name=viewport]").remove(), T.append(v({ height: n() ? ", height=" + window.innerHeight + "px" : l.mobileOS.flatVersion >= 600 && 700 > l.mobileOS.flatVersion ? ", height=" + window.innerWidth + "px" : ", height=device-height" }))
	}
	var o = window.kendo, a = o.mobile, s = o.history, l = o.support, d = a.ui.Pane, c = "ios", u = l.mobileOS, p = o.template("km-#=data.name##if(data.device){# km-on-#=data.device##}##if(data.version){# km-#=data.name##=data.version.major# km-#=data.version.major# km-m#=data.version.minor# #=data.version.appMode?'km-app':'km-web'##}#", { usedWithBlock: !1 }), f = "blackberry" == u.device && u.flatVersion >= 600 && 1e3 > u.flatVersion && u.appMode, h = "km-vertical", m = "km-horizontal", g = { ios: { ios: !0, appMode: !1, browser: "default", device: "iphone", flatVersion: "500", majorVersion: "5", minorVersion: "0.0", name: "ios", tablet: !1 }, android: { android: !0, appMode: !1, browser: "default", device: "android", flatVersion: "233", majorVersion: "2", minorVersion: "3.3", name: "android", tablet: !1 }, blackberry: { blackberry: !0, appMode: !1, browser: "default", device: "blackberry", flatVersion: "710", majorVersion: "7", minorVersion: "1.0", name: "blackberry", tablet: !1 }, meego: { meego: !0, appMode: !1, browser: "default", device: "meego", flatVersion: "850", majorVersion: "8", minorVersion: "5.0", name: "meego", tablet: !1} }, v = o.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no#=data.height#" name="viewport" />', { usedWithBlock: !1 }), b = '<meta name="apple-mobile-web-app-capable" content="yes" /> <meta name="apple-mobile-web-app-status-bar-style" content="black" /> ', _ = v({ height: "" }), x = o.template('<link rel="apple-touch-icon' + (u.android ? "-precomposed" : "") + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', { usedWithBlock: !1 }), k = u.name, w = ("iphone" == u.device || "ipod" == u.device) && "mobilesafari" == u.browser, y = 60, C = e(window), T = e("head"), S = e.proxy, A = o.Observable.extend({ init: function (t, n) {
		var i = this;
		a.application = i, i.options = e.extend({ hideAddressBar: !0, transition: "", updateDocumentTitle: !0 }, n), o.Observable.fn.init.call(i, i.options), e(function () {
			i.element = e(t ? t : document.body), i._setupPlatform(), i._attachHideBarHandlers(), i.pane = new d(i.element, i.options), i._setupElementClass(), i._attachMeta(), i.options.updateDocumentTitle && i._setupDocumentTitle(), i._startHistory(), l.kineticScrollNeeded && e(document.documentElement).on("touchmove", function (t) {
				e(t.target).is("textarea") || o.preventDefault(t)
			})
		})
	}, navigate: function (e, t) {
		this.pane.navigate(e, t)
	}, scroller: function () {
		return this.view().scroller
	}, hideLoading: function () {
		this.pane.hideLoading()
	}, showLoading: function () {
		this.pane.showLoading()
	}, view: function () {
		return this.pane.view()
	}, _setupPlatform: function () {
		var e, t = this, n = t.options.platform, i = u;
		n && (i = "string" == typeof n ? g[n] : n, u = i), i ? (t.os = i.name, e = { appMode: i.appMode, major: i.majorVersion, minor: i.minorVersion ? i.minorVersion[0] : 0 }) : (t.os = c, e = !1), t.osCssClass = p({ name: t.os, device: k, version: e })
	}, _startHistory: function () {
		var t, n = this, i = n.options.initial;
		t = { change: function (e) {
			n.pane.navigate(e.url)
		}, ready: function (e) {
			var t = e.url;
			!t && i && (t = i, s.navigate(i, !0)), n.pane.navigate(t)
		} }, n.pane.bind("navigate", function (e) {
			s.navigate(e.url, !0)
		}), s.start(e.extend(n.options, t))
	}, _setupElementClass: function () {
		var e = this, t = e.element;
		t.parent().addClass("km-root km-" + (u.tablet ? "tablet" : "phone")), t.addClass(e.osCssClass + " " + i()), f && r(), o.onResize(function () {
			t.removeClass("km-horizontal km-vertical").addClass(i()), f && r()
		})
	}, _attachMeta: function () {
		var e, t = this.options.icon;
		if (f || T.prepend(_), T.prepend(b), t) {
			"string" == typeof t && (t = { "": t });
			for (e in t)
				T.prepend(x({ icon: t[e], size: e }))
		}
	}, _attachHideBarHandlers: function () {
		var e = this, t = S(e._hideBar, e);
		!l.mobileOS.appMode && e.options.hideAddressBar && (e._initialHeight = {}, w && (C.on("load", t), o.onResize(t), e.element[0].addEventListener("touchstart", t, !0)))
	}, _setupDocumentTitle: function () {
		var e = this, n = document.title;
		e.pane.bind("viewShow", function (e) {
			var i = e.view.title;
			document.title = i !== t ? i : n
		})
	}, _hideBar: function () {
		var e, t = this, n = t.element, i = window.orientation + "", r = t._initialHeight;
		r[i] || (r[i] = C.height()), e = r[i] + y, e != n.height() && n.height(e), setTimeout(window.scrollTo, 0, 0, 1)
	} });
	o.mobile.Application = A
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile.ui, i = n.Shim, r = n.Popup, o = n.Widget, a = "open", s = "li>a", l = "actionsheetContext", d = '<div class="km-actionsheet-wrapper" />', c = t.template('<li class="km-actionsheet-cancel"><a href="\\#">#:cancel#</a></li>'), u = o.extend({ init: function (a, l) {
		var u = this, p = t.support.mobileOS, f = p.tablet ? r : i;
		o.fn.init.call(u, a, l), a = u.element, a.addClass("km-actionsheet").append(c({ cancel: u.options.cancel })).wrap(d).on("up", s, "_click").on("click", s, t.preventDefault), u.wrapper = a.parent(), u.shim = new f(u.wrapper, e.extend({ modal: !(p.android || p.meego) }, u.options.popup)), t.notify(u, n), t.onResize(function () {
			var e = u.wrapper.parent(), t = e.parent();
			e.css({ top: t.height() - e.height() + "px", width: t.width() + "px" })
		})
	}, events: [a], options: { name: "ActionSheet", cancel: "Cancel", popup: { height: "auto"} }, open: function (t, n) {
		var i = this;
		i.target = e(t), i.context = n, i.shim.show(t)
	}, close: function () {
		this.context = this.target = null, this.shim.hide()
	}, openFor: function (e) {
		var t = this, n = e.data(l);
		t.open(e, n), t.trigger(a, { target: e, context: n })
	}, destroy: function () {
		o.fn.destroy.call(this), this.shim.destroy()
	}, _click: function (n) {
		if (!n.isDefaultPrevented()) {
			var i = e(n.currentTarget).data("action");
			i && t.getter(i)(window)({ target: this.target, context: this.context }), n.preventDefault(), this.close()
		}
	} });
	n.plugin(u)
}(window.kendo.jQuery), function (e) {
	function t(t, n, i) {
		e(n.target).closest(".km-button,.km-detail").toggleClass("km-state-active", i), l && t.deactivateTimeoutID && (clearTimeout(t.deactivateTimeoutID), t.deactivateTimeoutID = 0)
	}
	var n = window.kendo, i = n.mobile, r = i.ui, o = r.Widget, a = n.support, s = a.mobileOS, l = s.android && s.flatVersion >= 300, d = "click", c = o.extend({ init: function (e, t) {
		var n = this;
		o.fn.init.call(n, e, t), n._wrap(), n._style(), n.element.on("up", "_release").on("down", "_activate").on("up cancel", "_deactivate"), l && n.element.on("move", "_timeoutDeactivate")
	}, events: [d], options: { name: "Button", icon: "", style: "" }, _timeoutDeactivate: function (e) {
		this.deactivateTimeoutID || (this.deactivateTimeoutID = setTimeout(t, 500, this, e, !1))
	}, _activate: function (e) {
		t(this, e, !0), document.activeElement.blur()
	}, _deactivate: function (e) {
		t(this, e, !1)
	}, _release: function (t) {
		var n = this;
		t.which > 1 || n.trigger(d, { target: e(t.target), button: n.element }) && t.preventDefault()
	}, _style: function () {
		var t, n = this.options.style, i = this.element;
		n && (t = n.split(" "), e.each(t, function () {
			i.addClass("km-" + this)
		}))
	}, _wrap: function () {
		var t = this, n = t.options.icon, i = '<span class="km-icon km-' + n, r = t.element.addClass("km-button"), o = r.children("span:not(.km-icon)").addClass("km-text"), a = r.find("img").addClass("km-image");
		!o[0] && r.html() && (o = r.wrapInner('<span class="km-text" />').children("span.km-text")), !a[0] && n && (o[0] || (i += " km-notext"), r.prepend(e(i + '" />')))
	} }), u = c.extend({ options: { name: "BackButton", style: "back" }, init: function (e, t) {
		var n = this;
		c.fn.init.call(n, e, t), n.element.attr("href") === undefined && n.element.attr("href", "#:back")
	} }), p = c.extend({ options: { name: "DetailButton", style: "" }, init: function (e, t) {
		c.fn.init.call(this, e, t)
	}, _style: function () {
		var t = this.options.style + " detail", n = this.element;
		if (t) {
			var i = t.split(" ");
			e.each(i, function () {
				n.addClass("km-" + this)
			})
		}
	}, _wrap: function () {
		var t = this, n = t.options.icon, i = '<span class="km-icon km-' + n, r = t.element, o = r.children("span"), a = r.find("img").addClass("km-image");
		!a[0] && n && (o[0] || (i += " km-notext"), r.prepend(e(i + '" />')))
	} });
	r.plugin(c), r.plugin(u), r.plugin(p)
}(window.kendo.jQuery), function (e, t) {
	var n = window.kendo, i = n.mobile.ui, r = i.Widget, o = "km-state-active", a = "select", s = "li:not(." + o + ")", l = r.extend({ init: function (e, t) {
		var n = this;
		r.fn.init.call(n, e, t), n.element.addClass("km-buttongroup").find("li").each(n._button), n.element.on("down", s, "_mousedown"), n.select(n.options.index)
	}, events: [a], options: { name: "ButtonGroup", index: -1 }, current: function () {
		return this.element.find("." + o)
	}, select: function (n) {
		var i = this, r = -1;
		n !== t && -1 !== n && (i.current().removeClass(o), "number" == typeof n ? (r = n, n = e(i.element[0].children[n])) : n.nodeType && (n = e(n), r = n.index()), n.addClass(o), i.selectedIndex = r)
	}, _button: function () {
		var t = e(this).addClass("km-button"), i = n.attrValue(t, "icon"), r = t.children("span"), o = t.find("img").addClass("km-image");
		r[0] || (r = t.wrapInner("<span/>").children("span")), r.addClass("km-text"), !o[0] && i && t.prepend(e('<span class="km-icon km-' + i + '"/>'))
	}, _mousedown: function (e) {
		if (!(e.which > 1)) {
			var t = this;
			t.select(e.currentTarget), t.trigger(a)
		}
	} });
	i.plugin(l)
}(window.kendo.jQuery), function (e) {
	function t(t) {
		var n = e(t.target), i = n.is("input"), r = i ? n : n.find("input");
		r.attr("checked", r.is(":radio") ? !0 : !r[0].checked), i || r.trigger("change")
	}
	function n() {
		return this.nodeType === l.TEXT_NODE && this.nodeValue.match(I)
	}
	function i(e, t) {
		t && e.prepend('<span class="km-icon km-' + t + '"/>')
	}
	function r(e) {
		i(e, v(e, "icon"))
	}
	function o(e) {
		var t = e.parent(), r = e.add(t.children(s.roleSelector("detailbutton"))), o = t.contents().not(r).not(n);
		o.length || (e.addClass("km-listview-link").attr(s.attr("role"), "listview-link"), i(e, v(t, "icon")))
	}
	function a(e) {
		if (e.children("input[type=checkbox],input[type=radio]").length) {
			var t = e.parent();
			t.contents().not(e).not(function () {
				return 3 == this.nodeType
			})[0] || e.addClass("km-listview-label")
		}
	}
	var s = window.kendo, l = window.Node, d = s.mobile, c = d.ui, u = s.support, p = s.data.DataSource, f = c.Widget, h = ".km-list > li, > li:not(.km-group-container)", m = ".km-listview-link, .km-listview-label", g = e.proxy, v = s.attrValue, b = "km-group-title", _ = "km-state-active", x = '<div class="' + b + '"><div class="km-text"></div></div>', k = s.template('<li><div class="' + b + '"><div class="km-text">#= this.headerTemplate(data) #</div></div><ul>#= kendo.render(this.template, data.items)#</ul></li>'), w = '<div class="km-listview-wrapper" />', y = ".kendoMobileListView", C = "lastPageReached", T = "click", S = "touchend click", A = S.split(" ").join(y + " ") + y, D = "change", E = "progress", F = "function", I = /^\s+$/, P = /button/, z = f.extend({ init: function (e, n) {
		var i = this;
		f.fn.init.call(i, e, n), e = i.element, n = i.options, e.on("down", m, "_highlight").on("move up cancel", m, "_dim").on(S, h, "_click"), u.mobileOS && u.mobileOS.ios && e.on("touchend", ".km-listview-label", t).on("click", ".km-listview-label", s.preventDefault), e.wrap(w), i.wrapper = i.element.parent(), i._footer(), i._dataSource(), i._bindScroller(), i._fixHeaders(), n.dataSource && i.options.autoBind ? i.dataSource.fetch() : i._style(), s.notify(i, c)
	}, events: [T, C], options: { name: "ListView", style: "", type: "flat", autoBind: !0, fixedHeaders: !1, template: "#:data#", headerTemplate: '<span class="km-text">#:value#</span>', appendOnRefresh: !1, loadMore: !1, loadMoreText: "Press to load more", endlessScroll: !1, scrollTreshold: 30, pullToRefresh: !1, pullTemplate: "Pull to refresh", releaseTemplate: "Release to refresh", refreshTemplate: "Refreshing", pullOffset: 140 }, setOptions: function (e) {
		f.fn.setOptions.call(this, e)
	}, setDataSource: function (e) {
		this.options.dataSource = e, this._dataSource(), this.options.autoBind && e.fetch()
	}, destroy: function () {
		var e = this;
		f.fn.destroy.call(e), e._unbindDataSource(), e.stopEndlessScrolling(), e.stopLoadMore(), s.destroy(e.element)
	}, refresh: function (t) {
		t = t || {};
		var n, i, r, o = this, a = o.element, l = o.options, u = o.dataSource, p = u.view(), f = o.loading, h = "html";
		return "itemchange" === t.action ? (i = t.items[0], r = e(o.template(i)), a.find("[data-" + s.ns + "uid=" + i.uid + "]").replaceWith(r), o.trigger("itemChange", { item: r, data: i, ns: c }), o._style(), undefined) : (o.template || o._templates(), o._cacheDataItems(p), o.trigger("dataBinding"), u.group()[0] ? (l.type = "group", n = s.render(o.groupTemplate, p)) : n = s.render(o.template, p), f ? h = "append" : l.appendOnRefresh && (h = "prepend"), n = e(n), a[h](n), d.init(n), f && (o.loading = !1, o._calcTreshold(), o._toggleLoader(!1)), l.pullToRefresh && o._scroller().pullHandled(), o._hideLoading(), o._shouldFixHeaders(), o._style(), o.trigger("dataBound", { ns: c }), undefined)
	}, _cacheDataItems: function (e) {
		var t, n = this;
		n.element[0].firstChild || (n._firstOrigin = n._first = e[0], n._last = e[e.length - 1]), n._pulled && (t = e[0], n._pulled = !1, t && (n._first = t)), n.loading && (t = e[e.length - 1], t && (n._last = t))
	}, items: function () {
		return "group" === this.options.type ? this.element.find(".km-list").children() : this.element.children()
	}, stopEndlessScrolling: function () {
		var e = this, t = e._scroller();
		t && e._loadIcon && (e.loading = !1, e._loadIcon.parent().hide(), t.unbind("resize", e._scrollerResize).unbind("scroll", e._scrollerScroll), e.trigger(C))
	}, stopLoadMore: function () {
		var e = this;
		e._loadButton && (e.loading = !1, e._loadButton.off(A).parent().hide(), e.trigger(C))
	}, _dim: function (e) {
		this._toggle(e, !1)
	}, _highlight: function (e) {
		this._toggle(e, !0)
	}, _toggle: function (t, n) {
		if (!(t.which > 1)) {
			var i = e(t.currentTarget), r = i.parent(), o = v(i, "role") || "", a = !o.match(P), s = t.isDefaultPrevented();
			a && r.toggleClass(_, n && !s)
		}
	}, _unbindDataSource: function () {
		var e = this;
		e.dataSource.unbind(D, e._refreshHandler).unbind(E, e._progressHandler)
	}, _dataSource: function () {
		var e = this, t = e.options;
		e.dataSource && e._refreshHandler ? e._unbindDataSource() : (e._refreshHandler = g(e.refresh, e), e._progressHandler = g(e._showLoading, e)), e.dataSource = p.create(t.dataSource).bind(D, e._refreshHandler), t.pullToRefresh || t.loadMore || t.endlessScroll || e.dataSource.bind(E, e._progressHandler)
	}, _fixHeader: function (t) {
		var n, i, r, o = 0, a = this, s = a._scroller(), l = t.scrollTop, d = a.headers;
		if (a.fixedHeaders) {
			do {
				if (n = d[o++], !n) {
					r = e("<div />");
					break
				}
				i = n.offset, r = n.header
			}
			while (i > l);
			a.currentHeader != o && (s.fixedContainer.html(r.clone()), a.currentHeader = o)
		}
	}, _shouldFixHeaders: function () {
		this.fixedHeaders = "group" === this.options.type && this.options.fixedHeaders
	}, _cacheHeaders: function () {
		var t = this, n = [];
		t.fixedHeaders && (t.element.find("." + b).each(function (t, i) {
			i = e(i), n.unshift({ offset: i.position().top, header: i })
		}), t.headers = n, t._fixHeader({ scrollTop: 0 }))
	}, _fixHeaders: function () {
		var e = this, t = e._scroller();
		e._shouldFixHeaders(), t && (s.onResize(function () {
			e._cacheHeaders()
		}), t.bind("scroll", function (t) {
			e._fixHeader(t)
		}))
	}, _bindScroller: function () {
		var e = this, t = e.options, n = e._scroller();
		n && (t.pullToRefresh && n.setOptions({ pullToRefresh: !0, pull: function () {
			var n = t.pullParameters, i = { page: 1 };
			n && (i = n.call(e, e._first)), e._pulled = !0, e.dataSource.read(i)
		}, pullTemplate: t.pullTemplate, releaseTemplate: t.releaseTemplate, refreshTemplate: t.refreshTemplate }), t.endlessScroll && (e._scrollHeight = n.element.height(), e._scrollerResize = function () {
			e._scrollHeight = n.element.height(), e._calcTreshold()
		}, e._scrollerScroll = function (t) {
			!e.loading && t.scrollTop + e._scrollHeight > e._treshold && e._nextPage()
		}, n.setOptions({ resize: e._scrollerResize, scroll: e._scrollerScroll })))
	}, _calcTreshold: function () {
		var e = this, t = e._scroller();
		t && (e._treshold = t.scrollHeight() - e.options.scrollTreshold)
	}, _nextPage: function () {
		var e, t = this, n = t.options, i = n.endlessScrollParameters || n.loadMoreParameters;
		t.loading = !0, t._toggleLoader(!0), i && (e = i.call(t, t._firstOrigin, t._last)), t.dataSource.next(e) || (t.stopLoadMore(), t.stopEndlessScrolling())
	}, _templates: function () {
		var e = this, t = e.options.template, n = e.options.headerTemplate, i = ' data-uid="#=data.uid || ""#"', r = {}, o = {};
		typeof t === F && (r.template = t, t = "#=this.template(data)#"), o.template = e.template = g(s.template("<li" + i + ">" + t + "</li>"), r), typeof n === F && (o._headerTemplate = n, n = "#=this._headerTemplate(data)#"), o.headerTemplate = s.template(n), e.groupTemplate = g(k, o)
	}, _click: function (t) {
		if (!(t.which > 1 || t.isDefaultPrevented())) {
			var n, i = this, r = e(t.currentTarget), o = e(t.target), a = o.closest(s.roleSelector("button", "detailbutton", "backbutton")), l = s.widgetInstance(a, c), d = r.attr(s.attr("uid"));
			d && (n = i.dataSource.getByUid(d)), i.trigger(T, { target: o, item: r, dataItem: n, button: l }) && t.preventDefault()
		}
	}, _style: function () {
		var t = this, n = t.options, i = "group" === n.type, r = t.element, o = "inset" === n.style;
		r.addClass("km-listview").toggleClass("km-list", !i).toggleClass("km-listinset", !i && o).toggleClass("km-listgroup", i && !o).toggleClass("km-listgroupinset", i && o), i && (r.children().children("ul").addClass("km-list"), r.children("li").each(function () {
			var t = e(this), n = t.contents().first();
			t.addClass("km-group-container"), n.is("ul") || n.is("div." + b) || n.wrap(x)
		})), t._enhanceItems(), r.parents(".km-listview")[0] || r.closest(".km-content").toggleClass("km-insetcontent", o), t._cacheHeaders()
	}, _enhanceItems: function () {
		this.items().each(function () {
			var t, n = e(this), i = !1;
			n.children().each(function () {
				t = e(this), t.is("a") ? (o(t), i = !0) : t.is("label") && (a(t), i = !0)
			}), i || r(n)
		})
	}, _footer: function () {
		var t, n = this, i = n.options, r = i.loadMore;
		(r || i.endlessScroll) && (n._loadIcon = e('<span style="display:none" class="km-icon"></span>'), t = e('<span class="km-load-more"></span>').append(n._loadIcon), r && (n._loadButton = e('<button class="km-load km-button">' + i.loadMoreText + "</button>").on(A, g(n._nextPage, n)), t.append(n._loadButton)), n.wrapper.append(t))
	}, _toggleLoader: function (e) {
		var t = this, n = t._loadIcon, i = t._loadButton;
		i && i.toggle(!e), e ? n.css("display", "block") : n.hide()
	}, _scroller: function () {
		var e, t = this;
		return t._scrollerInstance || (e = t.view(), t._scrollerInstance = e && e.scroller), t._scrollerInstance
	}, _showLoading: function () {
		var e = this.view();
		e && e.loader.show()
	}, _hideLoading: function () {
		var e = this.view();
		e && e.loader.hide()
	} });
	c.plugin(z)
}(window.kendo.jQuery), function (e) {
	function t(t, n) {
		var r = n.find("[" + i.attr("align") + "=" + t + "]");
		r[0] && n.prepend(e('<div class="km-' + t + 'item" />').append(r))
	}
	function n(t) {
		var n = t.siblings();
		t.toggleClass("km-show-title", !!n[0] && "" === e.trim(t.text())), t.toggleClass("km-no-title", !!t.children("ul")[0]), t.toggleClass("km-hide-title", "hidden" == t.css("visibility") && !n.children().is(":visible"))
	}
	var i = window.kendo, r = i.mobile.ui, o = i.roleSelector, a = r.Widget, s = a.extend({ init: function (n, i) {
		var r = this;
		a.fn.init.call(r, n, i), n = r.element, r.container().bind("show", e.proxy(this, "viewShow")), n.addClass("km-navbar").wrapInner(e('<div class="km-view-title" />')), t("left", n), t("right", n), r.centerElement = n.find(".km-view-title")
	}, options: { name: "NavBar" }, title: function (e) {
		this.element.find(o("view-title")).text(e), n(this.centerElement)
	}, viewShow: function (e) {
		var t = e.view;
		t.options.title ? this.title(t.options.title) : n(this.centerElement)
	}, destroy: function () {
		a.fn.destroy.call(this), i.destroy(this.element)
	} });
	r.plugin(s)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile, i = n.ui, r = e.proxy, o = t.fx.Transition, a = t.ui.Pane, s = t.ui.PaneDimensions, l = i.Widget, d = Math, c = d.abs, u = d.ceil, p = d.round, f = d.max, h = d.min, m = d.floor, g = "change", v = "km-current-page", b = l.extend({ init: function (n, i) {
		var d = this;
		l.fn.init.call(d, n, i), n = d.element, n.wrapInner("<div/>").addClass("km-scrollview").append('<ol class="km-pages"/>'), d.inner = n.children().first(), n.children().first().addClass("firstdiv"),d.pager = n.children().last(), d.page = 0, d.inner.css("height", d.options.contentHeight), d.container().bind("show", e.proxy(this, "viewShow"));
		var u, p, f, h, m, v;
		u = new t.ui.Movable(d.inner), p = new o({ axis: "x", movable: u, onEnd: r(d._transitionEnd, d) }), f = new t.UserEvents(n, { start: function (e) {
			2 * c(e.x.velocity) >= c(e.y.velocity) ? f.capture() : f.cancel(), p.cancel()
		}, allowSelection: !0, end: r(d._dragEnd, d) }), h = new s({ element: d.inner, container: d.element }), m = h.x, m.bind(g, r(d.refresh, d)), v = new a({ dimensions: h, userEvents: f, movable: u, elastic: !0 }), e.extend(d, { movable: u, transition: p, userEvents: f, dimensions: h, dimension: m, pane: v }), d.page = d.options.page
	}, options: { name: "ScrollView", page: 0, duration: 300, velocityThreshold: .8, contentHeight: "auto", bounceVelocityThreshold: 1.6 }, events: [g], destroy: function () {
		l.fn.destroy.call(this), this.userEvents.destroy(), t.destroy(this.element)
	}, viewShow: function () {
		this.dimensions.refresh()
	}, refresh: function () {
		var e, t = this, n = "", i = t.dimension, r = i.getSize(), o = t.element.find("[data-role=page]");
		o.width(r), i.update(!0), o[0] || (t.page = Math.floor(-t.movable.x / r), t.scrollTo(t.page)), e = t.pages = u(i.getTotal() / r), t.minSnap = -(e - 1) * r, t.maxSnap = 0;
		for (var a = 0; e > a; a++)
			n += "<li/>";
		t.pager.html(n), t._updatePager()
	}, content: function (e) {
		this.element.children().first().html(e), this.dimensions.refresh()
	}, scrollTo: function (e) {
		this.page = e, this._moveTo(-e * this.dimension.getSize(), o.easeOutExpo)
	}, _moveTo: function (e, t) {
		this.transition.moveTo({ location: e, duration: this.options.duration, ease: t })
	}, _dragEnd: function (e) {
		var t, n = this, i = e.x.velocity, r = n.dimension.size, a = n.options, s = a.velocityThreshold, l = p, d = o.easeOutExpo;
		i > s ? l = u : -s > i && (l = m), c(i) > a.bounceVelocityThreshold && (d = o.easeOutBack), t = f(n.minSnap, h(l(n.movable.x / r) * r, n.maxSnap)), this._moveTo(t, d)
	}, _transitionEnd: function () {
		var e = this, t = Math.round(-e.movable.x / e.dimension.size);
		t != e.page && (e.page = t, e.trigger(g, { page: t }), e._updatePager())
	}, _updatePager: function () {
		this.pager.children().removeClass(v).eq(this.page).addClass(v)
	} });
	i.plugin(b)
}(window.kendo.jQuery), function (e, t) {
	function n(e, t, n) {
		return Math.max(t, Math.min(n, e))
	}
	var i = window.kendo, r = i.mobile.ui, o = r.Widget, a = i.support, s = "change", l = "km-switch-on", d = "km-switch-off", c = "margin-left", u = "km-state-active", p = a.transitions.css + "transform", f = e.proxy, h = o.extend({
		init: function (t, n) {
			var r, a = this;
			o.fn.init.call(a, t, n), a._wrapper(), a._drag(), a._background(), a.origin = parseInt(a.background.css(c), 10), a._handle(), a.constrain = 0, a.snapPoint = 0, a.container().bind("show", e.proxy(this, "viewShow")), t = a.element[0], t.type = "checkbox", a._animateBackground = !0, r = a.options.checked, null === r && (r = t.checked), a.check(r), a.viewShow(), i.notify(a, i.mobile.ui)
		}, viewShow: function () {
			var e, t, n = this;
			e = n.wrapper.width(), t = n.handle.outerWidth(!0), n.constrain = e - t, n.snapPoint = e / 2 - t / 2, n.background.data("origin", n.origin), n.check(n.element[0].checked)
		}, events: [s], options: { name: "Switch", onLabel: "ON", offLabel: "OFF", checked: null }, check: function (e) {
			var n = this, i = n.element[0];
			return e === t ? i.checked : (n._position(e ? n.constrain : 0), i.checked = e, n.wrapper.toggleClass(l, e).toggleClass(d, !e), t)
		}, destroy: function () {
			o.fn.destroy.call(this), this.userEvents.destroy()
		}, toggle: function () {
			var e = this;
			e.check(!e.element[0].checked)
		}, _move: function (e) {
			var t = this;
			e.preventDefault(), t._position(n(t.position + e.x.delta, 0, t.constrain))
		}, _position: function (e) {
			var t = this;
			t.position = e, t.handle.css(p, "translatex(" + e + "px)"), t._animateBackground && t.background.css(c, t.origin + e)
		}, _start: function () {
			this.userEvents.capture(), this.handle.addClass(u)
		}, _stop: function () {
			var e = this;
			e.handle.removeClass(u), e._toggle(e.position > e.snapPoint)
		}, _toggle: function (e) {
			var t, n = this, i = n.handle, r = n.element[0], o = r.checked, a = 200;
			n.wrapper.toggleClass(l, e).toggleClass(d, !e), n.position = t = e * n.constrain, n._animateBackground && n.background.kendoStop(!0, !0).kendoAnimate({ effects: "slideMargin", offset: t, reset: !0, reverse: !e, axis: "left", duration: a }), i.kendoStop(!0, !0).kendoAnimate({ effects: "slideTo", duration: a, offset: t + "px,0", reset: !0, complete: function () {
				o !== e && (r.checked = e, n.trigger(s, { checked: e }))
			} })
		}, _background: function () {
			var t, n = this;
			t = e("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>").appendTo(n.wrapper).children(".km-switch-background"), n.background = t
		}, _handle: function () {
			var t = this, n = t.options;
			t.handle = e("<span class='km-switch-container'><span class='km-switch-handle' /></span>").appendTo(t.wrapper).children(".km-switch-handle"), t.handle.append('<span class="km-switch-label-on">' + n.onLabel + '</span><span class="km-switch-label-off">' + n.offLabel + "</span>")
		}, _wrapper: function () {
			var e = this, t = e.element, n = t.parent("span.km-switch");
			n[0] || (n = t.wrap('<span class="km-switch"/>').parent()), e.wrapper = n
		}, _drag: function () {
			var e = this;
			e.userEvents = new i.UserEvents(e.wrapper, { tap: function () {
				e._toggle(!e.element[0].checked)
			}, start: f(e._start, e), move: f(e._move, e), end: f(e._stop, e) })
		}
	});
	r.plugin(h)
}(window.kendo.jQuery), function (e) {
	var t = window.kendo, n = t.mobile.ui, i = n.Widget, r = "km-state-active", o = "select", a = i.extend({ init: function (t, n) {
		var o = this;
		i.fn.init.call(o, t, n), o.container().bind("show", e.proxy(this, "viewShow")), o.element.addClass("km-tabstrip").find("a").each(o._buildButton).eq(o.options.selectedIndex).addClass(r), o.element.on("down", "a", "_release")
	}, events: [o], switchTo: function (e) {
		this._setActiveItem(this.element.find('a[href$="' + e + '"]'))
	}, clear: function () {
		this.currentItem().removeClass(r)
	}, currentItem: function () {
		return this.element.children("." + r)
	}, _release: function (t) {
		if (!(t.which > 1)) {
			var n = this, i = e(t.currentTarget);
			i[0] !== n.currentItem()[0] && (n.trigger(o, { item: i }) ? t.preventDefault() : n._setActiveItem(i))
		}
	}, _setActiveItem: function (e) {
		e[0] && (this.clear(), e.addClass(r))
	}, _buildButton: function () {
		var n = e(this), i = t.attrValue(n, "icon"), r = n.find("img"), o = e('<span class="km-icon"/>');
		n.addClass("km-button").attr(t.attr("role"), "tab").contents().not(r).wrapAll('<span class="km-text"/>'), r[0] ? r.addClass("km-image") : (n.prepend(o), i && o.addClass("km-" + i))
	}, viewShow: function (e) {
		this.switchTo(e.view.id)
	}, destroy: function () {
		i.fn.destroy.call(this)
	}, options: { name: "TabStrip", selectedIndex: 0, enable: !0} });
	n.plugin(a)
}(window.kendo.jQuery);