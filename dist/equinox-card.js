//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", ee = h.reactiveElementPolyfillSupport, v = (e, t) => e, te = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, ne = (e, t) => !l(e, t), re = {
	attribute: !0,
	type: String,
	converter: te,
	reflect: !1,
	useDefault: !1,
	hasChanged: ne
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = re) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? re;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? te : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? te : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ne)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[v("elementProperties")] = /* @__PURE__ */ new Map(), y[v("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: y }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ie = globalThis, b = (e) => e, x = ie.trustedTypes, ae = x ? x.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, oe = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, se = "?" + S, ce = `<${se}>`, C = document, le = () => C.createComment(""), ue = (e) => e === null || typeof e != "object" && typeof e != "function", de = Array.isArray, fe = (e) => de(e) || typeof e?.[Symbol.iterator] == "function", pe = "[ 	\n\f\r]", me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ge = />/g, _e = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, ye = /"/g, be = /^(?:script|style|textarea|title)$/i, xe = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), w = xe(1), T = xe(2), Se = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), we = C.createTreeWalker(C, 129);
function Te(e, t) {
	if (!de(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ae === void 0 ? t : ae.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = me;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === me ? c[1] === "!--" ? o = he : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = _e) : (be.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = _e) : o = ge : o === _e ? c[0] === ">" ? (o = i ?? me, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? _e : c[3] === "\"" ? ye : ve) : o === ye || o === ve ? o = _e : o === he || o === ge ? o = me : (o = _e, i = void 0);
		let d = o === _e && e[t + 1].startsWith("/>") ? " " : "";
		a += o === me ? n + ce : l >= 0 ? (r.push(s), n.slice(0, l) + oe + n.slice(l) + S + d) : n + S + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), we.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = we.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(oe)) {
					let t = u[o++], n = i.getAttribute(e).split(S), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Me : r[1] === "?" ? Ne : r[1] === "@" ? Pe : je
					}), i.removeAttribute(e);
				} else e.startsWith(S) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (be.test(i.tagName)) {
					let e = i.textContent.split(S), t = e.length - 1;
					if (t > 0) {
						i.textContent = x ? x.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], le()), we.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], le());
					}
				}
			} else if (i.nodeType === 8) if (i.data === se) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(S, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += S.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = C.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Oe(e, t, n = e, r) {
	if (t === Se) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ue(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Oe(e, i._$AS(e, t.values), i, r)), t;
}
var ke = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
		we.currentNode = r;
		let i = we.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ae(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = we.nextNode(), a++);
		}
		return we.currentNode = C, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ae = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = Oe(this, e, t), ue(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== Se && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== E && ue(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = De.createElement(Te(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ke(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ce.get(e.strings);
		return t === void 0 && Ce.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		de(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(le()), this.O(le()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = b(e).nextSibling;
			b(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, je = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = E;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Oe(this, e, t, 0), a = !ue(e) || e !== this._$AH && e !== Se, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Oe(this, r[n + o], t, o), s === Se && (s = this._$AH[o]), a ||= !ue(s) || s !== this._$AH[o], s === E ? e = E : e !== E && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Me = class extends je {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === E ? void 0 : e;
	}
}, Ne = class extends je {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== E);
	}
}, Pe = class extends je {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Oe(this, e, t, 0) ?? E) === Se) return;
		let n = this._$AH, r = e === E && n !== E || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== E && (n === E || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Fe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Oe(this, e);
	}
}, Ie = ie.litHtmlPolyfillSupport;
Ie?.(De, Ae), (ie.litHtmlVersions ??= []).push("3.3.3");
var Le = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ae(t.insertBefore(le(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Re = globalThis, D = class extends y {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Le(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Se;
	}
};
D._$litElement$ = !0, D.finalized = !0, Re.litElementHydrateSupport?.({ LitElement: D });
var ze = Re.litElementPolyfillSupport;
ze?.({ LitElement: D }), (Re.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Be = {
	attribute: !0,
	type: String,
	converter: te,
	reflect: !1,
	hasChanged: ne
}, Ve = (e = Be, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function O(e) {
	return (t, n) => typeof n == "object" ? Ve(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function k(e) {
	return O({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var He = [
	"ha-form",
	"ha-icon",
	"ha-icon-button",
	"ha-selector",
	"ha-textfield",
	"ha-icon-picker",
	"ha-icon-button",
	"ha-entity-picker",
	"ha-select",
	"ha-dialog",
	"ha-sortable",
	"ha-svg-icon",
	"ha-alert",
	"ha-button",
	"ha-color-picker",
	"ha-badge",
	"ha-sankey-chart",
	"mwc-button"
], Ue = async (e) => {
	let t = e || He;
	try {
		if (t.every((e) => customElements.get(e))) return;
		await Promise.race([customElements.whenDefined("partial-panel-resolver"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout waiting for partial-panel-resolver")), 1e4))]);
		let e = document.createElement("partial-panel-resolver");
		if (!e) throw Error("Failed to create partial-panel-resolver element");
		if (e.hass = { panels: [{
			url_path: "tmp",
			component_name: "config"
		}] }, typeof e._updateRoutes != "function") throw Error("partial-panel-resolver does not have _updateRoutes method");
		if (e._updateRoutes(), !e.routerOptions?.routes?.tmp?.load) throw Error("Failed to create tmp route in partial-panel-resolver");
		await Promise.race([e.routerOptions.routes.tmp.load(), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout loading tmp route")), 1e4))]), await Promise.race([customElements.whenDefined("ha-panel-config"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout waiting for ha-panel-config")), 1e4))]);
		let n = document.createElement("ha-panel-config");
		if (!n) throw Error("Failed to create ha-panel-config element");
		if (!n.routerOptions?.routes?.automation?.load) throw Error("ha-panel-config does not have automation route");
		await Promise.race([n.routerOptions.routes.automation.load(), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("Timeout loading automation components")), 1e4))]);
		let r = t.filter((e) => !customElements.get(e));
		if (r.length > 0) throw Error(`Failed to load components: ${r.join(", ")}`);
	} catch (e) {
		console.error("Error loading Home Assistant form components:", e);
		try {
			if (window.customElements && window.customElements.get("home-assistant")) {
				console.log("Attempting fallback loading method for HA components");
				let e = new CustomEvent("ha-request-load-components", {
					detail: { components: t },
					bubbles: !0,
					composed: !0
				});
				document.dispatchEvent(e);
			}
		} catch (e) {
			console.error("Fallback loading method failed:", e);
		}
	}
}, We = new Set(["unknown", "unavailable"]);
function Ge(e) {
	return e == null || typeof e == "string" && We.has(e);
}
function Ke(e) {
	if (!(Ge(e) || typeof e != "string" || e.trim() === "")) return e;
}
function qe(e) {
	if (Ge(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function A() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function j(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function Je(e, t = {}) {
	let n = Math.max(1, Math.floor(t.concurrency ?? 1)), r = [], i = 0, a = 0, o = 0, s = (n, r) => {
		t.onEvent?.({
			event: n,
			taskId: r,
			queuedCount: Math.max(e.length - i, 0),
			activeCount: a,
			completedCount: o
		});
	};
	s("queue.start");
	async function c() {
		for (; i < e.length;) {
			if (t.isCancelled?.()) {
				s("queue.cancelled");
				return;
			}
			let n = e[i++];
			a += 1, s("queue.task_start", n.id);
			try {
				let e = typeof performance < "u" ? performance.now() : Date.now(), i = {
					task: n,
					value: await n.run(),
					durationMs: (typeof performance < "u" ? performance.now() : Date.now()) - e
				};
				r.push(i), o += 1, s("queue.task_complete", n.id), await t.onResult?.(i);
			} finally {
				--a;
			}
		}
	}
	return await Promise.all(Array.from({ length: Math.min(n, e.length) }, () => c())), r;
}
var Ye = 6e4, Xe = 3, Ze = 350, Qe = 360 * 60 * 1e3, $e = 3600 * 1e3, et = 720 * 60 * 1e3, tt = 2500, nt = 8e3, rt = 15e3, it = 300, at = 700, ot = 1100, st = 80;
function ct(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var lt = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function ut(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function dt(e, t) {
	return t.reduce((e, t) => ut(e) ? e[t] : void 0, e);
}
function ft(e) {
	return e[e.length - 1] ?? "";
}
function pt(e) {
	return e instanceof Error ? e.message : String(e);
}
function mt(e) {
	if (!ut(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function ht(e) {
	if (!ut(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function gt(e) {
	if (e instanceof lt) return !0;
	let t = mt(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = pt(e).toLowerCase(), r = `${ht(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function _t(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function vt(e) {
	return new Promise((t) => setTimeout(t, e));
}
function yt(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function bt(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new lt(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function xt(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function St(e) {
	let t = xt(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function Ct(e, t, n) {
	let r = dt(e.attributes, t), i = xt(typeof r == "string" && Number.isFinite(Number(r)) ? Number(r) : r);
	if (i) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? ft(t),
		path: t,
		valueType: i
	};
}
function wt(e, t) {
	return t === "number" ? qe(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : Ke(e);
}
function Tt(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return wt(t.kind === "entity_state" ? e.state ?? e.s : dt(n, t.path ?? []), t.valueType);
}
function Et(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function Dt(e, t, n) {
	if (e.length === 0) return e;
	let r = t.getTime(), i = Math.min(n.getTime(), Date.now()), a = [...e].sort((e, t) => e.time - t.time), o = a[0], s = a[a.length - 1];
	return [
		...o.time > r ? [{
			time: r,
			value: o.value
		}] : [],
		...a,
		...s.time < i ? [{
			time: i,
			value: s.value
		}] : []
	];
}
function Ot(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function kt(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = Tt(i, t), o = Et(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function At(e, t, n, r) {
	let i = kt(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var jt = class {
	constructor() {
		this._entities = /* @__PURE__ */ new Map();
	}
	hasStates(e) {
		return (this._entities.get(e)?.states.length ?? 0) > 0;
	}
	hasFullStates(e) {
		let t = this._entities.get(e);
		return t !== void 0 && t.fullCoverage.length > 0 && t.states.length > 0;
	}
	hasCoverage(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Nt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return Ft(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
			start: new Date(e.startTime),
			end: new Date(e.endTime)
		}));
	}
	integrate(e, t, n, r, i) {
		let a = this._entities.get(e) ?? {
			states: [],
			stateCoverage: [],
			fullCoverage: []
		};
		a.states = It([...a.states, ...t]), a.stateCoverage = Mt([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = Mt([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return Vt(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Pt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function Mt(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function Nt(e, t, n) {
	return Pt(e, t, n) >= n - 1;
}
function Pt(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of Mt(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function Ft(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of Mt(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function It(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Et(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function Lt(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= rt || t.requestDurationMs >= ot, i = r || t.stateCount >= nt || t.requestDurationMs >= at || n >= st, a = t.stateCount <= tt && t.requestDurationMs <= it && n <= st / 2;
	return i && e > $e ? {
		nextChunkMs: Math.max($e, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < et ? {
		nextChunkMs: Math.min(et, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function Rt(e, t, n, r, i, a, o) {
	if (e.callWS) return e.callWS({
		type: "history/history_during_period",
		start_time: n.toISOString(),
		end_time: r.toISOString(),
		entity_ids: t,
		minimal_response: i,
		no_attributes: a,
		significant_changes_only: o
	});
	let s = new URLSearchParams({
		filter_entity_id: t.join(","),
		end_time: r.toISOString()
	});
	return i && s.set("minimal_response", "1"), a && s.set("no_attributes", "1"), o && s.set("significant_changes_only", "1"), e.callApi("GET", `history/period/${encodeURIComponent(n.toISOString())}?${s.toString()}`);
}
async function zt(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? A() : 0;
		try {
			t.onPerformance?.({
				event: "history.chunk_attempt",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					timeoutMs: t.timeoutMs
				}
			});
			let i = await bt(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(A() - r)
				}
			}), i;
		} catch (e) {
			let i = gt(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: pt(e),
					durationMs: Math.round(A() - r)
				}
			}), !a) throw e;
			await vt(_t(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function Bt(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), l = s.filter((e) => !c.has(e)), u = s.filter((e) => c.has(e)), d = o.accumulator ?? new jt(), f = [], p = Math.max(1, Math.floor(o.chunkTimeoutMs ?? Ye)), m = Math.max(1, Math.floor(o.maxChunkAttempts ?? Xe)), h = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? Ze)), g = (e, t) => zt(t, {
		taskId: e,
		timeoutMs: p,
		maxAttempts: m,
		retryBaseDelayMs: h,
		isCancelled: o.isCancelled,
		onPerformance: a
	}), _ = /* @__PURE__ */ new Map(), ee = (e, t, n, r, i, a, o) => {
		let s = [
			r,
			t.toISOString(),
			n.toISOString(),
			i ? "minimal" : "full",
			a ? "noattr" : "attrs",
			o ? "significant" : "all"
		].join("|"), c = _.get(s);
		c ? c.entityIds.push(e) : _.set(s, {
			entityIds: [e],
			start: t,
			end: n,
			coverageKind: r,
			minimalResponse: i,
			noAttributes: a,
			significantChangesOnly: o
		});
	}, v = [];
	for (let e of l) for (let t of d.missingIntervals(e, n, r, "state")) ee(e, t.start, t.end, "state", !0, !0, !0);
	for (let e of u) for (let t of d.missingIntervals(e, n, r, "full")) v.push({
		entityId: e,
		start: t.start,
		end: t.end
	});
	let te = v.reduce((e, t) => {
		let n = t.end.getTime() - t.start.getTime();
		return e + Math.max(1, Math.ceil(n / Qe));
	}, 0), ne = _.size + te, re = 0, y = /* @__PURE__ */ new Set(), ie = async (s, c, l) => {
		let u = re;
		if (re += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await yt();
		let f = A(), p = Ot(c, s.entityIds), m = A() - f, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: ne,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = A(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) d.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), y.add(e);
		let ee = A() - g;
		a?.({
			event: "history.merge",
			details: {
				batchIndex: u,
				entityCount: s.entityIds.length,
				stateCount: h,
				mergeDurationMs: Math.round(ee)
			}
		});
		let v = 0;
		if (i) {
			await yt();
			let o = A();
			for (let i of t) (_.has(i.entityId) || !b.has(i.id)) && (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && b.set(i.id, d.buildSeries(i, e, n, r));
			let s = t.map((e) => b.get(e.id)).filter((e) => e !== void 0);
			v = A() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: s.length,
					pointCount: s.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(v)
				}
			}), i(s), await yt(120);
		}
		return {
			stateCount: h,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: Math.round(m),
			mergeDurationMs: Math.round(ee),
			buildDurationMs: Math.round(v)
		};
	};
	for (let t of _.values()) {
		let n = t.coverageKind === "full" ? "attr" : "state", r = [...new Set(t.entityIds)], i = `${n}:${r.join(",")}:${t.start.toISOString()}:${t.end.toISOString()}`;
		f.push({
			id: i,
			entityIds: r,
			start: t.start,
			end: t.end,
			coverageKind: t.coverageKind,
			run: () => g(i, () => Rt(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: ne,
			attributeChunkHours: Qe / 36e5,
			minAttributeChunkHours: $e / 36e5,
			maxAttributeChunkHours: et / 36e5,
			adaptiveAttributeChunks: v.length > 0,
			cachedSourceCount: t.filter((e) => d.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: p,
			maxChunkAttempts: m,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let b = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && b.set(i.id, d.buildSeries(i, e, n, r));
	await Je(f, {
		concurrency: o.concurrency ?? 1,
		isCancelled: o.isCancelled,
		onEvent: (e) => {
			a?.({
				event: `history.${e.event}`,
				details: {
					taskId: e.taskId,
					queuedCount: e.queuedCount,
					activeCount: e.activeCount,
					completedCount: e.completedCount
				}
			});
		},
		onResult: async ({ task: e, value: t, durationMs: n }) => {
			await ie(e, t, n);
		}
	});
	let x = 0;
	for (let t of v) {
		let n = Qe;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: x
				}
			});
			let l = A(), u = await g(c, () => Rt(e, [t.entityId], i, o, !1, !1, !1)), d = A() - l;
			x += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: x
				}
			});
			let f = await ie({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = Lt(n, f);
			a?.({
				event: "history.adaptive_chunk",
				details: {
					taskId: c,
					entityId: t.entityId,
					chunkHours: Math.round(s / 36e3) / 100,
					nextChunkHours: Math.round(p.nextChunkMs / 36e3) / 100,
					stateCount: f.stateCount,
					requestDurationMs: f.requestDurationMs,
					processingDurationMs: f.normalizeDurationMs + f.mergeDurationMs + f.buildDurationMs,
					reason: p.reason
				}
			}), n = p.nextChunkMs, r = o.getTime();
		}
	}
	let ae = a ? A() : 0, oe = t.map((t) => {
		let i = b.get(t.id);
		return i && !y.has(t.entityId) ? i : d.buildSeries(t, e, n, r);
	}), S = a ? A() - ae : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: oe.length,
			pointCount: oe.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(S)
		}
	}), oe;
}
function Vt(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = Tt(t, e), r = Et(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: ct(a.length > 0 ? Dt(a, r, i) : At(n, e, r, i))
	};
}
var Ht = 6e4, Ut = 48;
function Wt(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function Gt(e) {
	return e instanceof Error ? e.message : String(e);
}
function Kt(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function qt(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.source.id !== i.source.id || r.points.length !== i.points.length) return !1;
		for (let e = 0; e < r.points.length; e++) {
			let t = r.points[e], n = i.points[e];
			if (t.time !== n.time || t.value !== n.value) return !1;
		}
	}
	return !0;
}
function Jt(e, t) {
	let n = e.findIndex((e) => e.time === t.time);
	if (n !== -1) {
		if (e[n].value === t.value) return e;
		let r = [...e];
		return r[n] = t, r;
	}
	let r = -1;
	for (let n = e.length - 1; n >= 0; n--) if (e[n].time < t.time) {
		r = n;
		break;
	}
	let i = r === -1 ? void 0 : e[r];
	if (i?.value === t.value) {
		let n;
		for (let t = r - 1; t >= 0; t--) if (e[t].time < i.time) {
			n = e[t];
			break;
		}
		if (n?.value === t.value) {
			let n = [...e];
			return n[r] = t, n.sort((e, t) => e.time - t.time);
		}
		return [...e, t].sort((e, t) => e.time - t.time);
	}
	return [...e, t].sort((e, t) => e.time - t.time);
}
function Yt(e, t) {
	let n = e.findIndex((e) => e.time >= t);
	if (n === -1) return e.length > 1 ? [e[e.length - 1]] : e;
	let r = Math.max(0, n - 1);
	return r === 0 ? e : e.slice(r);
}
var Xt = class {
	constructor(e) {
		this.series = [], this.loading = !1, this.error = "", this.debugPerformance = !1, this._prevKey = "", this._nextSessionId = 0, this._progressUpdateScheduled = !1, this._lastProgressUpdateMs = 0, this.host = e, e.addController(this);
	}
	hostConnected() {}
	hostDisconnected() {}
	_createSession(e, t, n) {
		this._session && (this._session.cancelled = !0);
		let r = {
			id: ++this._nextSessionId,
			startTime: t.getTime(),
			endTime: n.getTime(),
			cancelled: !1,
			activeLoads: 0,
			sources: [...e],
			sourceStates: new Map(e.map((e) => [e.id, "queued"])),
			activeEntityLoads: /* @__PURE__ */ new Map(),
			accumulator: new jt()
		};
		return this._session = r, r;
	}
	_cancelSession() {
		this._session && (this._session.cancelled = !0), this._session = void 0, this._progressUpdateScheduled = !1;
	}
	_activeSession(e, t) {
		let n = this._session;
		if (!(!n || n.cancelled)) return n.startTime === e.getTime() && n.endTime === t.getTime() ? n : void 0;
	}
	_isCurrentSession(e) {
		return this._session === e && !e.cancelled;
	}
	_addSessionSources(e, t) {
		let n = new Set(e.sources.map((e) => e.id));
		for (let r of t) n.has(r.id) || (n.add(r.id), e.sources.push(r));
	}
	_hasActiveEntityLoad(e, t) {
		return (e.activeEntityLoads.get(Kt(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = Kt(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = Kt(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
			r > 0 ? e.activeEntityLoads.set(t, r) : e.activeEntityLoads.delete(t);
		}
		this.loading = e.activeLoads > 0;
	}
	_sessionSources(e, t) {
		return t.filter((t) => e.sourceStates.has(t.source.id));
	}
	_hasAccumulatorSeries(e, t) {
		return t.kind === "entity_attribute" ? e.accumulator.hasFullStates(t.entityId) : e.accumulator.hasStates(t.entityId);
	}
	_availableSessionSeries(e, t, n, r, i) {
		let a = this._sessionSources(e, i), o = new Set(a.map((e) => e.source.id));
		for (let i of e.sources) o.has(i.id) || !e.sourceStates.has(i.id) || this._hasAccumulatorSeries(e, i) && (a.push(e.accumulator.buildSeries(i, t, n, r)), o.add(i.id));
		return a;
	}
	_requestProgressUpdate(e) {
		if (this._progressUpdateScheduled) return;
		this._progressUpdateScheduled = !0;
		let t = A() - this._lastProgressUpdateMs, n = Math.max(0, Ut - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = A(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${t.map((e) => e.id).join("|")}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, t.length === 0) {
			this.series = [], this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = A();
		this.series = [], this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && j(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Bt(e, a.sources, n, r, (t) => {
			if (!this._isCurrentSession(a)) return;
			let i = A(), o = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), o);
			for (let e of o) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && j(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(A() - i)
			});
		}, this.debugPerformance ? (e) => {
			j(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: Ht,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && Wt(() => {
				if (!this._isCurrentSession(a)) return;
				let s = A(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				qt(this.series, l) || (this.series = l);
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && j(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(A() - o),
					updateDurationMs: Math.round(A() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = Gt(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && j(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(A() - o),
					error: this.error
				});
			}
		});
	}
	setImportedSeries(e, t, n) {
		this._cancelSession(), this.series = e, this.loading = !1, this.error = "", this._prevKey = `${e.map((e) => e.source.id).join("|")}|${t.getTime()}|${n.getTime()}`, this.host.requestUpdate();
	}
	setError(e) {
		this._cancelSession(), this.loading = !1, this.error = e, this.host.requestUpdate();
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(Kt(e))), d = A();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t);
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && j(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && j(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Bt(e, u, n, r, (t) => {
			if (!this._isCurrentSession(i)) return;
			let a = A(), o = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(o);
			for (let e of o) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && j(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(A() - a)
			});
		}, this.debugPerformance ? (e) => {
			j(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: Ht,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && Wt(() => {
				if (!this._isCurrentSession(i)) return;
				let a = A(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				qt(this.series, s) || (this.series = s);
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && j(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(A() - d),
					mergeDurationMs: Math.round(A() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = Gt(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && j(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(A() - d),
					error: this.error
				});
			}
		});
	}
	updateLivePoints(e, t, n, r) {
		if (!e || t.length === 0 || this.series.length === 0) return;
		let i = n.getTime(), a = r.getTime(), o = !1, s = new Map(t.map((e) => [e.id, e])), c = this.series.map((t) => {
			let n = s.get(t.source.id);
			if (!n) return t;
			let r = kt(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = Yt(Jt(t.points, c), i);
			return l === t.points ? t : (o = !0, {
				...t,
				points: l
			});
		});
		o && (this.series = c, this.host.requestUpdate());
	}
	_mergeSeries(e, t) {
		let n = [...e];
		for (let e of t) {
			let t = n.findIndex((t) => t.source.id === e.source.id);
			t === -1 ? n.push(e) : n[t] = e;
		}
		return n;
	}
	_mergePartial(e) {
		this.series = this._mergeSeries(this.series, e);
	}
	removeSources(e) {
		if (e.length === 0) return;
		let t = new Set(e);
		this.series = this.series.filter((e) => !t.has(e.source.id));
		for (let t of e) this._session?.sourceStates.delete(t);
		this._prevKey = this.series.map((e) => e.source.id).join("|") + "|", this.host.requestUpdate();
	}
}, Zt = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], Qt = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, $t = new Set(Object.values(Qt)), en = Zt.filter((e) => !$t.has(e));
function tn(e) {
	return en[e % en.length];
}
function nn(e) {
	return e.trim().toLowerCase();
}
function rn(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function an(e, t, n) {
	if (!t.has(nn(e))) return e;
	let r = [
		...en.slice(n % en.length),
		...en.slice(0, n % en.length),
		...Zt
	];
	for (let e of r) if (!t.has(nn(e))) return e;
	let i = n, a = rn(i);
	for (; t.has(nn(a));) i += 1, a = rn(i);
	return a;
}
function on(e) {
	return nn(e);
}
var sn = 214;
function cn(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function ln(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function un(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = dn(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(fn(e, i));
	return c;
}
function dn(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function fn(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function pn(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function mn(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: ln(e - r, n),
			max: ln(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: ln(e - o, n),
		max: ln(t + o, n)
	};
}
function hn(e) {
	return 28 + (Math.max(e, 1) - 1) * sn + 180 + 18;
}
var gn = .15, _n = 8;
function vn(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function yn(e) {
	return (e.min + e.max) / 2;
}
function bn(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function xn(e, t) {
	let n = Math.abs(bn(vn(e)) - bn(vn(t))), r = Math.abs(bn(yn(e)) - bn(yn(t))), i = Sn(e.unit) === Sn(t.unit) ? 0 : 2;
	return n + r * .6 + i;
}
function Sn(e) {
	return e && e.trim() !== "" ? e : "__unitless__";
}
function Cn(e) {
	if (e.length < 2) return;
	let t = Sn(e[0].unit);
	if (!e.some((e) => Sn(e.unit) !== t)) return;
	let n = e.filter((e) => Sn(e.unit) === t), r = e.filter((e) => Sn(e.unit) !== t);
	return n.length > 0 && r.length > 0 ? [n, r] : void 0;
}
function wn(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i);
	return Math.min(...i.map((e) => e / r)) <= gn && (o / Math.max(a, 1e-9) >= _n || r / a >= _n);
}
function Tn(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = xn(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function En(e) {
	let t = Cn(e);
	if (t) return t;
	if (!wn(e)) return [e, []];
	let [n, r] = Tn(e), i = [], a = [];
	for (let t of e) t.id === n.id ? i.push(t) : t.id === r.id ? a.push(t) : xn(t, n) <= xn(t, r) ? i.push(t) : a.push(t);
	return [i, a];
}
function Dn(e, t, n, r) {
	let i = Math.min(...n.map((e) => e.min)), a = Math.max(...n.map((e) => e.max)), o = Math.max(...n.map((e) => e.precision)), s = mn(i, a, o), c = un(s.min, s.max);
	return {
		ids: new Set(n.map((e) => e.id)),
		graphKey: e,
		axis: t,
		min: s.min,
		max: s.max,
		precision: Math.max(o, pn(c)),
		ticks: c,
		top: r,
		height: 180
	};
}
function On(e) {
	let t = [];
	for (let [n, r] of e.entries()) {
		if (r.valueType !== "number" && r.valueType !== "boolean") continue;
		let e = r.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = r.scaleMode === "manual" && r.scaleMin !== void 0 ? r.scaleMin : 0, a = r.scaleMode === "manual" && r.scaleMax !== void 0 ? r.scaleMax : 1, o = r.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = r.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = r.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => cn(e))), l = r.valueType === "boolean" ? "group:boolean" : r.scaleGroupKey, u = t.find((e) => e.key === l);
		u || (u = {
			key: l,
			series: []
		}, t.push(u)), r.scaleMode === "manual" && (r.scaleMin !== void 0 && (o = Math.min(o, r.scaleMin)), r.scaleMax !== void 0 && (s = Math.max(s, r.scaleMax))), u.series.push({
			id: r.id,
			unit: r.unit,
			min: o,
			max: s,
			precision: c,
			order: n
		});
	}
	return t.flatMap((e, t) => {
		let [n, r] = e.key === "group:boolean" ? [e.series, []] : En(e.series), i = 28 + t * sn, a = Dn(e.key, "left", n, i);
		return r.length > 0 ? [a, Dn(e.key, "right", r, i)] : [a];
	});
}
function kn(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)), a = r * 4;
	if (i.length <= a) return i;
	let o = /* @__PURE__ */ new Map();
	i.forEach((e, i) => {
		let a = Math.floor(n + (e.time - t.start) / (t.end - t.start) * r), s = o.get(a);
		s ? s.push({
			...e,
			index: i
		}) : o.set(a, [{
			...e,
			index: i
		}]);
	});
	let s = /* @__PURE__ */ new Map();
	for (let e of o.values()) {
		let t = e[0], n = e[e.length - 1], r = e.reduce((e, t) => t.value < e.value ? t : e, t), i = e.reduce((e, t) => t.value > e.value ? t : e, t);
		for (let e of [
			t,
			r,
			i,
			n
		]) s.set(e.index, e);
	}
	return [...s.values()].sort((e, t) => e.index - t.index).map(({ time: e, value: t }) => ({
		time: e,
		value: t
	}));
}
function An(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function jn(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Mn(e, t) {
	if (e.length === 0) return;
	if (t <= e[0].time) return e[0].value;
	let n = e[e.length - 1];
	if (t >= n.time) return n.value;
	for (let n = 0; n < e.length - 1; n++) {
		let r = e[n], i = e[n + 1];
		if (t >= r.time && t <= i.time) {
			let e = i.time - r.time;
			return e <= 0 ? r.value : r.value + (t - r.time) / e * (i.value - r.value);
		}
	}
}
function Nn(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (!n.id.startsWith("attr:")) continue;
		let e = n.id.split(":");
		if (e.length < 3) continue;
		let r = e[1], i = e.slice(2).join(":");
		t.has(r) || t.set(r, {});
		let a = t.get(r);
		i === "current_temperature" || i === "temperature" && !a.temp ? a.temp = n.id : i === "hvac_action" && (a.hvac = n.id);
	}
	for (let [, e] of t) if (e.temp && e.hvac) return {
		tempId: e.temp,
		hvacId: e.hvac
	};
}
function Pn(e, t, n) {
	let r = Nn(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Fn(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Mn(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Mn(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${An(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${An(e.time, n).toFixed(1)},${jn(e.value, o).toFixed(1)}`),
			`${An(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Fn(e, t) {
	let n = Date.now(), r = [...e].sort((e, t) => e.time - t.time), i = r.findIndex((e) => e.time >= t.start), a = i === -1 ? r.length : i, o = a > 0 ? r.slice(a - 1) : r;
	return o.flatMap((e, r) => {
		let i = Math.max(e.time, t.start), a = Math.min(o[r + 1]?.time ?? t.end, t.end, n);
		return a > i ? [{
			start: i,
			end: a,
			value: e.value
		}] : [];
	});
}
function M(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function N(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function In(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function Ln(e, t) {
	return Rn(e, t, !0);
}
function Rn(e, t, n) {
	let r = Date.now(), i = [...e.points].sort((e, t) => e.time - t.time), a = i.findIndex((e) => e.time >= t.start), o = a === -1 ? i.length : a, s = o > 0 ? i.slice(o - 1) : i;
	return s.flatMap((e, i) => {
		let a = Math.max(e.time, t.start), o = s[i + 1]?.time, c = n ? t.end : e.time, l = Math.min(o ?? c, t.end, r);
		return l > a ? [{
			start: a,
			end: l,
			value: e.value
		}] : [];
	});
}
var zn = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function Bn(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return zn.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, Zt[(r + n.size) % Zt.length]), n.get(i));
}
function Vn(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Hn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = In(e, t);
		if (!i) return [];
		let a = kn(Un(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? Zn(a, n, i) : Xn(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function Un(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return Gn(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function Wn(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function Gn(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : Wn(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : Wn(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function Kn(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function qn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let i = In(e, t);
		if (!i) return [];
		let a = N(Kn(i), i);
		return Rn(e, n, r.extendColumnToEnd).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = M(t.start, n), c = M(t.end, n), l = N(o, i), u = Math.max(c - s, 1);
			return [{
				id: `${e.id}:${r}`,
				x: s,
				y: Math.min(l, a),
				width: u,
				height: Math.max(Math.abs(a - l), 1),
				fill: e.color
			}];
		});
	});
}
function Jn(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return Ln(e, n).reduce((n, r) => {
			let i = Bn(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = M(t.start, n), o = Math.max(M(t.end, n) - i, 1);
			return {
				id: `${e.id}:${r}`,
				x: i,
				y: a,
				width: o,
				fill: t.fill
			};
		});
	});
}
function Yn(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: Qn(n, e.precision)
		}));
	});
}
function Xn(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${M(e[0].time, t).toFixed(1)},${N(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = M(o.time, t), l = N(o.value, n), u = M(s.time, t), d = N(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function Zn(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = M(e.time, t), o = N(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function Qn(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var $n = 60 * 1e3, P = 60 * $n, F = 24 * P, er = [
	10 * $n,
	15 * $n,
	20 * $n,
	30 * $n,
	P,
	2 * P,
	3 * P,
	4 * P,
	6 * P,
	8 * P,
	12 * P,
	F,
	2 * F,
	3 * F,
	7 * F,
	14 * F,
	30 * F,
	60 * F,
	90 * F
];
function tr(e, t) {
	for (let n of er) if (e / n <= t) return n;
	return er[er.length - 1];
}
function nr(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = tr(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function rr(e, t) {
	let n = new Date(e), r = t / F;
	if (r > 88) {
		let e = n.toLocaleString("default", { month: "short" }), t = n.getFullYear();
		return n.getMonth() === 0 ? `${e} ${t}` : e;
	}
	if (r > 35) {
		let e = n.toLocaleString("default", { month: "short" });
		return `${n.getDate()} ${e}`;
	}
	if (r > 7) return `${n.getDate()}/${n.getMonth() + 1}`;
	if (r > 2) return n.toLocaleString("default", { weekday: "short" });
	let i = String(n.getHours()).padStart(2, "0"), a = String(n.getMinutes()).padStart(2, "0");
	return r > .5 ? `${i}:${a}` : `${i}:${a}:${String(n.getSeconds()).padStart(2, "0")}`;
}
function ir(e, t) {
	let n = [], r;
	for (let i of e) {
		if (i.time < t.start) {
			r = i;
			continue;
		}
		if (i.time > t.end) break;
		n.push(i);
	}
	return r ? [r, ...n] : n;
}
function ar(e, t) {
	return e.map((e) => ({
		...e,
		points: ir(e.points, t)
	}));
}
function or(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function sr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = or(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = or(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => ar(r.get(e) ?? t, n));
}
function cr(e, t, n, r = !1, i = 12, a = !0) {
	let o = { extendStairToEnd: a }, s = { extendColumnToEnd: a }, c = On(sr(e, t, n)), l = new Set(c.map((e) => e.graphKey)).size, u = hn(l), d = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, f = nr(n.start, n.end, i), p = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: c,
		plotBottom: u,
		chartHeight: Vn(u, d),
		numericLines: Hn(t, c, n, o),
		numericColumns: qn(t, c, n, s),
		segments: Jn(t, u, n),
		heatingAreas: r ? [] : Pn(t, c, n),
		yAxisLabels: Yn(c),
		xAxisLabels: f.map((e) => ({
			x: M(e.time, n),
			label: rr(e.time, p),
			bold: e.bold
		}))
	};
}
function lr(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let a = In(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: i
		}, s = kn(Un(e.points, n, e.lineMode, r), n, 40, 640), { points: c, pathLength: l } = e.lineMode === "line" ? Zn(s, n, o) : Xn(s, n, o);
		return {
			id: e.id,
			color: e.color,
			points: c,
			pathLength: l,
			lineWidth: e.lineWidth
		};
	});
}
function ur(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let a = In(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: r
		}, s = N(Kn(o), o);
		return Rn(e, n, i.extendColumnToEnd).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let a = M(t.start, n), c = M(t.end, n), l = N(i, o);
			return [{
				id: `${e.id}:${r}`,
				x: a,
				y: Math.min(l, s),
				width: Math.max(c - a, 1),
				height: Math.max(Math.abs(s - l), 1),
				fill: e.color
			}];
		});
	});
}
function dr(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return Ln(e, n).reduce((t, n) => {
			let i = Bn(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = M(t.start, n), o = Math.max(M(t.end, n) - a, 1);
			return {
				id: `${e.id}:${r}`,
				x: a,
				y: i,
				width: o,
				fill: t.fill
			};
		});
	});
}
function fr(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function pr(e, t) {
	let n = t - 10, r = fr(t), i = e.ticks.length <= r ? e.ticks : un(e.min, e.max, r), a = e.ticks === i ? e.precision : Math.max(e.precision, pn(i));
	return i.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: Qn(t, a)
	}));
}
function mr(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = an(e.color, r, n * Zt.length + t);
			return r.add(on(a)), i.set(e.id, a), a === e.color ? e : {
				...e,
				color: a
			};
		}),
		visibleSeries: t.map((e) => {
			let t = i.get(e.id);
			return t && t !== e.color ? {
				...e,
				color: t
			} : e;
		})
	};
}
function hr(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = nr(i.start, i.end, t).map((e) => ({
		x: M(e.time, i),
		label: rr(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = 28 + n + 16 + 6, s = e > 0 ? 22 + e * 14 : 0, l = 28 + n + s + 18, u = l + 16, d = mr(a, o, 0);
		r.push({
			series: d.visibleSeries,
			allSeries: d.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: l,
			canvasHeight: u,
			lines: [],
			columns: [],
			segments: dr(d.visibleSeries, t, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < l.length; t++) {
		let s = l[t], u = e.numericScales.filter((e) => e.graphKey === s), d = u.find((e) => e.axis === "left") ?? u[0], f = u.find((e) => e.axis === "right"), p = new Set(u.flatMap((e) => [...e.ids])), m = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && or(e) === s), h = e.visibleSeries.filter((e) => p.has(e.id)), g = t === 0 ? [...h, ...o] : h, _ = mr(t === 0 ? [...m, ...a] : m, g, t), ee = _.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), v = ee.length, te = 28 + n + 16 + 6, ne = v > 0 ? 22 + v * 14 : 0, re = 28 + n + ne + 18, y = re + 16, ie = pr(d, n), b = f ? pr(f, n) : [], x = u.map((e) => ({
			...e,
			top: 28,
			height: n
		})), ae = x.find((e) => e.axis === "left") ?? x[0];
		r.push({
			series: _.visibleSeries,
			allSeries: _.allSeries,
			scale: ae,
			scales: x,
			graphHeight: n,
			svgHeight: re,
			canvasHeight: y,
			lines: lr(_.visibleSeries, x, i, { extendStairToEnd: e.extendStairToEnd }, n),
			columns: ur(_.visibleSeries, x, i, n, { extendColumnToEnd: e.extendStairToEnd }),
			segments: dr(ee, te, i),
			yLabels: ie,
			rightYLabels: b,
			xLabels: c,
			heatingAreas: e.heatingAreas.length > 0 ? Pn(e.visibleSeries, x, i) : []
		});
	}
	return r;
}
var gr = class {
	constructor(e) {
		this.tooltip = void 0, this._series = [], this._cacheKey = "", this._timeBounds = {
			start: 0,
			end: 1
		}, this._host = e, e.addController(this);
	}
	hostConnected() {}
	hostDisconnected() {
		this._frame !== void 0 && (cancelAnimationFrame(this._frame), this._frame = void 0);
	}
	sync(e, t, n, r, i) {
		this._timeBounds = i, this._rebuildCache(e, t, n);
	}
	_rebuildCache(e, t, n) {
		let r = `${t.map((e) => `${e.source.id}:${e.points.length}`).join("|")}::${n.join("|")}`;
		this._fetchedRef === t && this._cacheKey === r || (this._fetchedRef = t, this._cacheKey = r, this._series = e.filter((e) => !n.includes(e.id)).flatMap((e) => {
			let n = t.find((t) => t.source.id === e.id);
			return !n || n.points.length === 0 ? [] : [{
				id: e.id,
				label: e.label,
				color: e.color,
				points: n.points
			}];
		}));
	}
	handlePointerMove(e) {
		let t = this._svgPoint(e);
		if (!t) {
			this._clear();
			return;
		}
		this._pendingPoint = t, this._frame === void 0 && (this._frame = requestAnimationFrame(() => {
			this._frame = void 0, this._apply();
		}));
	}
	handlePointerLeave() {
		this._pendingPoint = void 0, this._clear();
	}
	_clear() {
		this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
	}
	_apply() {
		let e = this._pendingPoint;
		if (!e) return;
		let t = this._timeAt(e.x), n = this._series.filter((t) => e.activeIds.has(t.id)), r = this._nearestPoint(n, t);
		if (!r) {
			this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
			return;
		}
		let i = r.time, a = n.flatMap((e) => {
			let t = this._pointAtOrBefore(e.points, i);
			return t ? [{
				label: e.label,
				color: e.color,
				value: String(t.value)
			}] : [];
		});
		if (a.length === 0) {
			this.tooltip !== void 0 && (this.tooltip = void 0, this._host.requestUpdate(), this._emit());
			return;
		}
		if (this.tooltip?.time === i && this.tooltip.activeLeft === e.activeLeft && this.tooltip.activeTop === e.activeTop && this.tooltip.activeWidth === e.activeWidth && this.tooltip.activeHeight === e.activeHeight && this.tooltip.activeKey === e.activeKey && Math.abs(this.tooltip.tooltipX - Math.min(Math.max(e.x, 120), 600)) < 1 && Math.abs(this.tooltip.y - this._tooltipY(e)) < 1 && this.tooltip.placement === this._placement(e)) return;
		let o = Math.min(Math.max(e.x, 120), 600), s = this._tooltipY(e);
		this.tooltip = {
			x: M(i, this._timeBounds),
			tooltipX: o,
			y: s,
			placement: this._placement(e),
			activeLeft: e.activeLeft,
			activeTop: e.activeTop,
			activeWidth: e.activeWidth,
			activeHeight: e.activeHeight,
			activeKey: e.activeKey,
			time: i,
			values: a
		}, this._host.requestUpdate(), this._emit();
	}
	_placement(e) {
		let t = e.activeTop + e.activeHeight;
		return e.touchLike ? e.y < e.activeTop + e.activeHeight / 2 ? "above" : "below" : t - e.y < 120 ? "above" : "below";
	}
	_tooltipY(e) {
		let t = e.activeTop + e.activeHeight;
		return e.touchLike ? this._placement(e) === "above" ? t - 10 : e.activeTop + 10 : Math.min(Math.max(e.y, e.activeTop + 28), t - 28);
	}
	_emit() {
		this._host.dispatchEvent(new CustomEvent("tooltip-changed", {
			detail: this.tooltip ? {
				time: this.tooltip.time,
				values: this.tooltip.values
			} : null,
			bubbles: !0,
			composed: !0
		}));
	}
	_nearest(e, t) {
		if (e.length === 0) return;
		let n = 0, r = e.length - 1;
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			e[i].time < t ? n = i + 1 : r = i;
		}
		let i = e[n], a = n > 0 ? e[n - 1] : void 0;
		return a && Math.abs(a.time - t) < Math.abs(i.time - t) ? a : i;
	}
	_nearestPoint(e, t) {
		let n, r = Infinity;
		for (let i of e) {
			let e = this._nearest(i.points, t);
			if (!e) continue;
			let a = Math.abs(e.time - t);
			a < r && (n = e, r = a);
		}
		return n;
	}
	_pointAtOrBefore(e, t) {
		if (e.length === 0) return;
		let n = 0, r = e.length - 1;
		for (; n < r;) {
			let i = Math.ceil((n + r) / 2);
			e[i].time <= t ? n = i : r = i - 1;
		}
		return e[n].time <= t ? e[n] : void 0;
	}
	_timeAt(e) {
		let t = Math.min(Math.max((e - 40) / 640, 0), 1);
		return this._timeBounds.start + t * (this._timeBounds.end - this._timeBounds.start);
	}
	_svgPoint(e) {
		let t = e.currentTarget;
		if (!(t instanceof Element)) return;
		let n = e.composedPath().find((e) => e instanceof HTMLElement && e.classList.contains("graph-canvas"));
		if (!n) return;
		let r = new Set((n.dataset.seriesIds ?? "").split("|").filter((e) => e !== ""));
		if (r.size === 0) return;
		let i = t.getBoundingClientRect(), a = n.getBoundingClientRect();
		if (e.clientX < a.left || e.clientX > a.right || e.clientY < a.top || e.clientY > a.bottom) return;
		let o = a.left - i.left, s = a.top - i.top;
		return {
			x: 40 + (e.clientX - a.left) / a.width * 640,
			y: e.clientY - i.top,
			activeLeft: o,
			activeTop: s,
			activeWidth: a.width,
			activeHeight: a.height,
			activeIds: r,
			activeKey: [...r].join("|"),
			touchLike: e.pointerType === "touch" || window.matchMedia("(hover: none) and (pointer: coarse)").matches
		};
	}
	renderTooltip() {
		if (!this.tooltip) return E;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, t = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth, n = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return w`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${t.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${n};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => w`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, _r = "temperature";
function vr(e) {
	return e.join(".");
}
function yr(e) {
	return e?.toLowerCase() === _r;
}
function br(e, t) {
	if (!e || !t) return;
	let n = t[vr(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function xr(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit
	};
}
var Sr = 24, Cr = "2.5", wr = [
	"current_temperature",
	"temperature",
	"hvac_action"
], Tr = /°[CF]|[CFK]$/;
function Er(e) {
	return Tr.test(e);
}
function Dr(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function Or(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function kr(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function Ar(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function jr(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : Cr : typeof e == "string" && e.trim() !== "" ? e.trim() : Cr;
}
function Mr(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function Nr(e) {
	return e[e.length - 1] ?? "";
}
function Pr(e, t, n) {
	let r = e?.states[t];
	return r ? n ? Ct(r, n)?.valueType ?? "string" : St(r)?.valueType ?? "string" : "number";
}
function Fr(e, t, n, r) {
	if (r) return r;
	if (n) return Nr(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Ir(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return br(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Lr(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Rr(e, t, n, r, i, a) {
	let o = kr(e.attribute), s = Mr(e.entity, o), c = Pr(n, e.entity, o), l = Ir(n, e.entity, o, e.unit, r), u = e.group ?? e.scaleGroup;
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: Fr(n, e.entity, o, e.label),
		color: e.color ?? tn(t),
		unit: l,
		scaleGroupKey: Lr(s, l, u, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		lineMode: Ar(e.lineMode ?? i),
		lineWidth: jr(e.lineWidth ?? a),
		valueType: c
	};
}
function zr(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: tn(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			lineMode: Ar(r),
			lineWidth: jr(i),
			valueType: "number"
		};
	}
	let o = St(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: tn(t),
		unit: o.unit,
		scaleGroupKey: Lr(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		lineMode: Ar(r),
		lineWidth: jr(i),
		valueType: o.valueType
	};
}
function Br(e, t) {
	let n = t?.states[e];
	if (!n) return;
	let r = n.attributes, i = r.temperature_unit;
	if (typeof i == "string" && i !== "") return i;
	let a = r.unit_of_measurement;
	if (typeof a == "string" && a !== "") return a;
}
function Vr(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Br(e.entity, n), i = e.scaleGroupKey.startsWith("group:") ? e.scaleGroupKey.slice(6) : void 0;
	return [e, ...wr.map((a) => {
		let o = [a], s = Mr(e.entity, o), c = Pr(n, e.entity, o), l = Qt[a] ?? tn(t()), u = a === "current_temperature" || a === "temperature" ? r : void 0, d = a === "hvac_action" ? void 0 : i ?? "temperature";
		return {
			id: s,
			entity: e.entity,
			attribute: o,
			forced: e.forced,
			label: a,
			color: l,
			unit: u,
			scaleGroupKey: Lr(s, u, d, c),
			scaleMode: "auto",
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: c
		};
	})];
}
function Hr(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && Er(e.unit))?.unit ?? e.find((e) => e.unit && Er(e.unit))?.unit;
}
function Ur(e) {
	let t = Hr(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = yr(e.unit), i = r && t ? t : e.unit, a = r && i && e.scaleGroupKey === "unit:temperature" ? `unit:${i}` : e.scaleGroupKey;
		return n && e.valueType === "number" && i && Er(i) && a.startsWith("unit:") && !Dr(e) && (a = "group:temperature"), i !== e.unit || a !== e.scaleGroupKey ? {
			...e,
			unit: i,
			scaleGroupKey: a
		} : e;
	});
}
function Wr(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? Sr, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Rr(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => zr(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => Vr(e, () => u++, n)), l = Ur(l), {
		startDate: Or(o),
		endDate: Or(i),
		showDatePicker: t?.showDatePicker ?? e.showDatePicker ?? !1,
		showEntityPicker: t?.showEntityPicker ?? e.showEntityPicker ?? !1,
		showLegend: t?.showLegend ?? e.showLegend ?? !0,
		showTooltip: t?.showTooltip ?? e.showTooltip ?? !0,
		showGrid: t?.showGrid ?? e.showGrid ?? !0,
		showScale: t?.showScale ?? e.showScale ?? !0,
		width: t?.width ?? e.width ?? "100%",
		height: t?.height ?? e.height,
		backgroundColor: t?.backgroundColor ?? e.backgroundColor,
		title: t?.title ?? e.title,
		titleFontFamily: t?.titleFontFamily ?? e.titleFontFamily,
		titleFontSize: t?.titleFontSize ?? e.titleFontSize,
		titleColor: t?.titleColor ?? e.titleColor,
		language: e.language ?? n?.locale?.language ?? n?.language,
		series: l,
		disableClimateOverlay: t?.disableClimateOverlay ?? !1
	};
}
var Gr = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	done: "ui.common.done",
	search_entity: "ui.components.entity.entity-picker.search"
}, Kr = {
	en: {
		no_series: "No series configured",
		no_entity_selected: "No entity selected",
		error_timeout: "The request timed out. Please try again.",
		tools: "Tools",
		view_range: "View range",
		reset_zoom: "Reset zoom",
		line_mode: "Display mode",
		mode_stair: "Stair",
		mode_line: "Line",
		mode_column: "Columns",
		export_data: "Export",
		import_data: "Import",
		done: "Done",
		search_entity: "Search entity",
		search_attributes: "Search attributes",
		attribute_unit: "Unit",
		attribute_unit_placeholder: "Auto",
		group: "Group",
		group_placeholder: "Default",
		no_matching_attributes: "No matching attributes",
		attribute_results_limited: "Showing first 50 matches"
	},
	fr: {
		no_series: "Aucune série configurée",
		no_entity_selected: "Aucune entité sélectionnée",
		error_timeout: "La requête a expiré. Veuillez réessayer.",
		tools: "Outils",
		view_range: "Plage affichée",
		reset_zoom: "Réinitialiser le zoom",
		line_mode: "Mode d'affichage",
		mode_stair: "Escalier",
		mode_line: "Ligne",
		mode_column: "Colonnes",
		export_data: "Exporter",
		import_data: "Importer",
		done: "Terminé",
		search_entity: "Rechercher une entité",
		search_attributes: "Rechercher des attributs",
		attribute_unit: "Unité",
		attribute_unit_placeholder: "Auto",
		group: "Groupe",
		group_placeholder: "Défaut",
		no_matching_attributes: "Aucun attribut correspondant",
		attribute_results_limited: "50 premiers résultats affichés"
	},
	cs: {
		no_series: "Není nakonfigurována žádná série",
		no_entity_selected: "Nebyla vybrána žádná entita",
		error_timeout: "Požadavek vypršel. Zkuste to prosím znovu.",
		tools: "Nástroje",
		view_range: "Rozsah zobrazení",
		reset_zoom: "Obnovit přiblížení",
		line_mode: "Režim zobrazení",
		mode_stair: "Schody",
		mode_line: "Čára",
		mode_column: "Sloupce",
		export_data: "Exportovat",
		import_data: "Importovat",
		search_attributes: "Hledat atributy",
		no_matching_attributes: "Žádné odpovídající atributy",
		attribute_results_limited: "Zobrazuje se prvních 50 shod"
	},
	de: {
		no_series: "Keine Serie konfiguriert",
		no_entity_selected: "Keine Entität ausgewählt",
		error_timeout: "Die Anfrage ist abgelaufen. Bitte erneut versuchen.",
		tools: "Werkzeuge",
		view_range: "Anzeigebereich",
		reset_zoom: "Zoom zurücksetzen",
		line_mode: "Anzeigemodus",
		mode_stair: "Stufen",
		mode_line: "Linie",
		mode_column: "Spalten",
		export_data: "Exportieren",
		import_data: "Importieren",
		done: "Fertig",
		search_entity: "Entität suchen",
		search_attributes: "Attribute suchen",
		attribute_unit: "Einheit",
		attribute_unit_placeholder: "Auto",
		group: "Gruppe",
		group_placeholder: "Standard",
		no_matching_attributes: "Keine passenden Attribute",
		attribute_results_limited: "Die ersten 50 Treffer werden angezeigt"
	},
	el: {
		no_series: "Δεν έχει ρυθμιστεί σειρά",
		no_entity_selected: "Δεν έχει επιλεγεί οντότητα",
		error_timeout: "Το αίτημα έληξε χρονικά. Παρακαλώ δοκιμάστε ξανά.",
		tools: "Εργαλεία",
		view_range: "Εύρος προβολής",
		reset_zoom: "Επαναφορά ζουμ",
		line_mode: "Λειτουργία εμφάνισης",
		mode_stair: "Σκάλα",
		mode_line: "Γραμμή",
		mode_column: "Στήλες",
		export_data: "Εξαγωγή",
		import_data: "Εισαγωγή",
		done: "Τέλος",
		search_entity: "Αναζήτηση οντότητας",
		search_attributes: "Αναζήτηση χαρακτηριστικών",
		attribute_unit: "Μονάδα",
		attribute_unit_placeholder: "Αυτόματο",
		group: "Ομάδα",
		group_placeholder: "Προεπιλογή",
		no_matching_attributes: "Δεν βρέθηκαν χαρακτηριστικά",
		attribute_results_limited: "Εμφανίζονται οι πρώτες 50 αντιστοιχίες"
	},
	it: {
		no_series: "Nessuna serie configurata",
		no_entity_selected: "Nessuna entità selezionata",
		error_timeout: "La richiesta è scaduta. Riprova.",
		tools: "Strumenti",
		view_range: "Intervallo visualizzato",
		reset_zoom: "Reimposta zoom",
		line_mode: "Modalità di visualizzazione",
		mode_stair: "Gradini",
		mode_line: "Linea",
		mode_column: "Colonne",
		export_data: "Esporta",
		import_data: "Importa",
		done: "Fatto",
		search_entity: "Cerca entità",
		search_attributes: "Cerca attributi",
		attribute_unit: "Unità",
		attribute_unit_placeholder: "Auto",
		group: "Gruppo",
		group_placeholder: "Predefinito",
		no_matching_attributes: "Nessun attributo corrispondente",
		attribute_results_limited: "Mostrate le prime 50 corrispondenze"
	},
	pl: {
		no_series: "Nie skonfigurowano serii",
		no_entity_selected: "Nie wybrano encji",
		error_timeout: "Upłynął limit czasu żądania. Spróbuj ponownie.",
		tools: "Narzędzia",
		view_range: "Zakres widoku",
		reset_zoom: "Resetuj powiększenie",
		line_mode: "Tryb wyświetlania",
		mode_stair: "Schodkowy",
		mode_line: "Linia",
		mode_column: "Kolumny",
		export_data: "Eksportuj",
		import_data: "Importuj",
		done: "Gotowe",
		search_entity: "Wyszukaj encję",
		search_attributes: "Szukaj atrybutów",
		attribute_unit: "Jednostka",
		attribute_unit_placeholder: "Auto",
		group: "Grupa",
		group_placeholder: "Domyślny",
		no_matching_attributes: "Brak pasujących atrybutów",
		attribute_results_limited: "Pokazano pierwsze 50 wyników"
	},
	ru: {
		no_series: "Серии не настроены",
		no_entity_selected: "Сущность не выбрана",
		error_timeout: "Время ожидания запроса истекло. Повторите попытку.",
		tools: "Инструменты",
		view_range: "Диапазон просмотра",
		reset_zoom: "Сбросить масштаб",
		line_mode: "Режим отображения",
		mode_stair: "Ступени",
		mode_line: "Линия",
		mode_column: "Столбцы",
		export_data: "Экспорт",
		import_data: "Импорт",
		done: "Готово",
		search_entity: "Поиск сущности",
		search_attributes: "Поиск атрибутов",
		attribute_unit: "Единица",
		attribute_unit_placeholder: "Авто",
		group: "Группа",
		group_placeholder: "По умолчанию",
		no_matching_attributes: "Подходящие атрибуты не найдены",
		attribute_results_limited: "Показаны первые 50 совпадений"
	},
	sk: {
		no_series: "Nie je nakonfigurovaná žiadna séria",
		no_entity_selected: "Nie je vybraná žiadna entita",
		error_timeout: "Časový limit požiadavky vypršal. Skúste to znova.",
		tools: "Nástroje",
		view_range: "Rozsah zobrazenia",
		reset_zoom: "Obnoviť priblíženie",
		line_mode: "Režim zobrazenia",
		mode_stair: "Schody",
		mode_line: "Čiara",
		mode_column: "Stĺpce",
		export_data: "Exportovať",
		import_data: "Importovať",
		done: "Hotovo",
		search_entity: "Hľadať entitu",
		search_attributes: "Hľadať atribúty",
		attribute_unit: "Jednotka",
		attribute_unit_placeholder: "Auto",
		group: "Skupina",
		group_placeholder: "Predvolené",
		no_matching_attributes: "Žiadne zodpovedajúce atribúty",
		attribute_results_limited: "Zobrazuje sa prvých 50 zhôd"
	}
};
function I(e, t) {
	let n = Gr[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return Kr[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? Kr.en?.[t] ?? t;
}
var qr = o`
  :host {
    display: flex;
    flex-direction: column;
    container-type: inline-size;
    isolation: isolate;
    min-height: var(--better-history-min-height, 360px);
    font-family: var(--better-history-font-family, inherit);
    user-select: none;
    -webkit-user-select: none;
  }

  .root {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    user-select: none;
    -webkit-user-select: none;
  }

  .chart-layout {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
  }

  .chart-layout > .chart-area {
    grid-row: 1;
    grid-column: 1;
    min-height: 0;
    min-width: 0;
  }

  .surface-header {
    grid-row: 1;
    grid-column: 1;
    z-index: 3;
    align-self: start;
    pointer-events: none;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0 calc(40 / 720 * 100%) 0;
    padding: 7px 8px;
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 95%, var(--primary-text-color, #fff) 5%);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    box-sizing: border-box;
  }

  .surface-header > * {
    pointer-events: auto;
  }

  .surface-header:empty {
    display: none;
  }

  .surface-header .controls-bar,
  .surface-header .tools-panel {
    margin: 0;
  }

  .surface-header .tools-panel {
    position: static;
    top: auto;
    z-index: auto;
    background: none;
    border: 0;
    border-radius: 0;
    padding: 0;
  }

  .graph-title {
    margin: 0 0 8px;
    color: var(--better-history-title-color, var(--primary-text-color, inherit));
    font-family: var(--better-history-title-font-family, inherit);
    font-size: var(--better-history-title-font-size, var(--ha-font-size-xl, 20px));
    font-weight: 500;
    line-height: 1.25;
  }

  .chart-area {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .chart-surface {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    position: relative;
    overflow-y: var(--better-history-surface-overflow-y, auto);
    padding: 16px;
    padding-top: var(--better-history-surface-header-offset, 16px);
    flex: 1;
    min-height: 0;
  }

  svg {
    width: 100%;
    display: block;
    touch-action: pan-y;
  }

  .axis {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1;
  }

  .axis.tick {
    stroke-width: 1;
  }

  .grid-line {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1;
    opacity: 0.45;
    vector-effect: non-scaling-stroke;
  }

  .x-axis-label {
    position: absolute;
    font-size: 11px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-family: inherit;
    white-space: nowrap;
    pointer-events: none;
    transform: translateX(-50%);
    box-sizing: border-box;
    line-height: 1;
  }

  .x-axis-label--bold {
    font-weight: 600;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
  }

  .graph-separator {
    stroke: var(--better-history-border-color, var(--divider-color, #444));
    stroke-width: 1.2;
    stroke-dasharray: 3 5;
    opacity: 0.64;
  }

  .line {
    fill: none;
    stroke-width: var(--better-history-line-width, 2.5);
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .column {
    opacity: 0.62;
    vector-effect: non-scaling-stroke;
  }

  .segment {
    opacity: 0.7;
  }

  .segment-border {
    stroke-width: 1.5;
    stroke-opacity: 0.6;
    vector-effect: non-scaling-stroke;
  }

  .climate-heating-area {
    fill: var(--better-history-accent-color, var(--accent-color, #ff9800));
    opacity: 0.22;
  }

  .y-axis-label {
    position: absolute;
    font-size: 11px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    transform: translateY(-50%);
    white-space: nowrap;
    pointer-events: none;
    box-sizing: border-box;
    line-height: 1;
    z-index: 1;
  }

  .y-axis-label--left,
  .y-axis-label--right {
    width: 100%;
  }

  .y-axis-label--left {
    right: 0;
    padding-right: var(--axis-label-gap);
    text-align: right;
  }

  .y-axis-label--right {
    left: 0;
    padding-left: var(--axis-label-gap);
    text-align: left;
  }

  .tooltip-axis-pointer {
    position: absolute;
    top: 0;
    width: 0;
    border-left: 1px dashed var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    opacity: 0.9;
    pointer-events: none;
    transform: translateX(-0.5px);
    z-index: 2;
  }

  .chart-graphs {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    contain: layout;
  }

  .graph-section {
    display: flex;
    flex-direction: column;
  }

  .graph-row {
    --axis-label-gap: 5px;
    display: grid;
    grid-template-columns: var(--axis-left-gutter, 0px) minmax(0, 1fr) var(--axis-right-gutter, 0px);
    min-width: 0;
  }

  .axis-labels {
    min-width: 0;
    position: relative;
  }

  .graph-canvas {
    min-width: 0;
    position: relative;
    overflow: hidden;
  }

  .graph-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 6px calc(40 / 720 * 100%) 0;
    padding: 0 6px 8px 6px;
    font-size: 12px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    box-sizing: border-box;
  }

  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .legend-item[hidden-series] {
    opacity: 0.38;
  }

  .swatch {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex: 0 0 auto;
    box-sizing: border-box;
  }

  .legend-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 160px;
  }

  .tooltip {
    position: absolute;
    z-index: 2;
    min-width: 170px;
    width: max-content;
    max-width: min(300px, calc(100% - 16px));
    padding: 8px;
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, #000 12%);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    box-shadow: 0 8px 20px rgb(0 0 0 / 28%);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 12px;
    pointer-events: none;
    box-sizing: border-box;
    transition: left 90ms ease-out, top 90ms ease-out;
    will-change: left, top, transform;
  }

  .tooltip-time {
    margin-bottom: 6px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
  }

  .tooltip-row {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) auto;
    align-items: center;
    gap: 6px;
    margin-top: 3px;
  }

  .tooltip-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tooltip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .empty,
  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
  }

  .error {
    color: #ff6b6b;
  }

  .controls-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 calc(40 / 720 * 100%) 8px;
    box-sizing: border-box;
  }

  .controls-bar:empty {
    display: none;
  }

  .tool-icon-button,
  .mode-button,
  .tool-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    background: transparent;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    cursor: pointer;
    box-sizing: border-box;
    font: inherit;
  }

  .mode-button[active] {
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 18%, transparent);
    border-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
  }

  .tool-icon-button ha-icon,
  .mode-button ha-icon,
  .tool-action-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .tools-panel {
    display: block;
    margin: 0 calc(40 / 720 * 100%) 8px;
    padding: 7px 8px;
    position: sticky;
    top: 0;
    z-index: 4;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 96%, var(--primary-text-color, #fff) 4%);
    box-sizing: border-box;
  }

  .tool-range {
    min-width: 0;
  }

  .tool-range-row,
  .tool-actions,
  .range-values {
    display: flex;
    align-items: center;
  }

  .tool-range-row {
    gap: 8px;
  }

  .tool-range-control {
    flex: 1 1 auto;
    min-width: 120px;
  }

  .tool-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tool-label ha-icon {
    --mdc-icon-size: 16px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
  }

  .tool-icon-button {
    width: 24px;
    height: 24px;
    border-radius: var(--better-history-radius, 8px);
  }

  .range-values {
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 0;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 10px;
  }

  .range-slider-stack {
    position: relative;
    height: 34px;
    display: flex;
    align-items: center;
    padding: 0 2px;
    cursor: ew-resize;
    touch-action: none;
  }

  .range-slider-stack::before {
    content: "";
    position: absolute;
    left: 2px;
    right: 2px;
    top: 50%;
    height: 3px;
    border-radius: 999px;
    background:
      linear-gradient(
        90deg,
        transparent,
        color-mix(in srgb, var(--better-history-border-color, var(--divider-color, #444)) 72%, transparent) 12%,
        color-mix(in srgb, var(--better-history-border-color, var(--divider-color, #444)) 72%, transparent) 88%,
        transparent
      );
    transform: translateY(-50%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 14%);
  }

  .range-selection {
    position: absolute;
    top: 50%;
    height: 12px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 16%, transparent);
    transform: translateY(-50%);
    pointer-events: none;
    box-shadow: 0 0 8px color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 26%, transparent);
    z-index: 1;
  }

  .range-selection,
  .range-selection-hit {
    min-width: 0;
  }

  .range-selection::before,
  .range-selection-hit::before {
    content: "";
    position: absolute;
    left: 6px;
    right: 6px;
    top: 50%;
    height: 2px;
    border-radius: inherit;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 82%, var(--primary-text-color, #fff) 18%);
    transform: translateY(-50%);
  }

  .range-selection-hit {
    position: absolute;
    left: 2px;
    right: 2px;
    top: 0;
    bottom: 0;
    min-width: 18px;
    border-radius: 999px;
    background: transparent;
    cursor: grab;
    pointer-events: none;
    touch-action: none;
    z-index: 1;
  }

  .range-selection-hit::before {
    display: none;
  }

  .range-selection-hit[dragging] {
    cursor: grabbing;
  }

  .range-slider {
    position: absolute;
    inset: 0;
    width: 100%;
    margin: 0;
    appearance: none;
    background: transparent;
    cursor: ew-resize;
    pointer-events: none;
    z-index: 2;
  }

  .range-slider::-webkit-slider-runnable-track {
    height: 34px;
    background: transparent;
  }

  .range-slider::-moz-range-track {
    height: 34px;
    background: transparent;
  }

  .range-slider::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 18px;
    margin-top: 3px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 86%, var(--primary-text-color, #fff) 14%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, transparent),
      0 1px 4px rgb(0 0 0 / 18%);
    pointer-events: none;
  }

  .range-slider::-moz-range-thumb {
    width: 12px;
    height: 18px;
    border: 0;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 86%, var(--primary-text-color, #fff) 14%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, transparent),
      0 1px 4px rgb(0 0 0 / 18%);
    pointer-events: none;
  }

  .range-slider:focus-visible::-webkit-slider-thumb {
    outline: 1px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 3px;
  }

  .range-slider:focus-visible::-moz-range-thumb {
    outline: 1px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 3px;
  }

  .tool-actions {
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;
  }

  .mode-switch {
    display: inline-flex;
    overflow: hidden;
    border-radius: var(--better-history-radius, 8px);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
  }

  .mode-button {
    width: 30px;
    height: 30px;
    border: 0;
    border-right: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    transition: background-color 120ms ease;
  }

  .mode-button:last-child {
    border-right: 0;
  }

  .tool-action-button {
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: var(--better-history-radius, 8px);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 12px;
    transition: background-color 120ms ease;
  }

  .mode-button:hover,
  .tool-action-button:not(:disabled):hover {
    background: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
  }

  .tool-reset-button {
    flex: 0 0 auto;
  }

  .tool-action-button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
    color: var(--better-history-muted-color, var(--disabled-text-color, var(--secondary-text-color, #888)));
    background: color-mix(in srgb, var(--better-history-muted-color, var(--secondary-text-color, #888)) 12%, transparent);
    border-color: color-mix(in srgb, var(--better-history-muted-color, var(--divider-color, #444)) 55%, transparent);
  }

  @container (max-width: 360px) {
    .tool-range-row {
      flex-wrap: wrap;
    }

    .tool-range-control {
      flex: 1 1 0;
      min-width: 0;
    }

    .tool-actions {
      flex: 1 1 100%;
    }

    .tool-actions {
      justify-content: flex-end;
    }
  }

  @container (max-width: 560px) {
    .surface-header {
      margin-left: 0;
      margin-right: 0;
    }

    .date-picker-wrapper,
    .entity-picker {
      flex-basis: 100%;
      width: 100%;
    }

    .entity-add-trigger {
      width: fit-content;
      max-width: 100%;
    }
  }

  @media (max-width: 700px) {
    .surface-header {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .controls-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .tools-panel {
      grid-template-columns: 1fr;
      padding: 8px;
    }

    .tool-actions {
      flex: 1 1 100%;
      justify-content: flex-end;
    }

    .tool-range-row {
      flex-wrap: wrap;
    }

    .tool-range-control {
      flex: 1 1 0;
      min-width: 0;
    }

    .range-slider-stack,
    .range-slider::-webkit-slider-runnable-track,
    .range-slider::-moz-range-track {
      height: 44px;
    }

    .range-selection {
      height: 18px;
    }

    .range-selection-hit {
      min-width: 44px;
    }

    .range-slider::-webkit-slider-thumb {
      width: 14px;
      height: 22px;
      margin-top: 4px;
    }

    .range-slider::-moz-range-thumb {
      width: 14px;
      height: 22px;
    }

    .date-picker-wrapper {
      width: 100%;
      max-width: 100%;
    }

    .date-picker-wrapper ha-date-range-picker {
      width: 100%;
    }
  }

  .date-picker-wrapper {
    flex: 0 1 auto;
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    overflow: visible;
  }

  .date-picker-wrapper ha-date-range-picker {
    display: block;
  }

  .entity-picker {
    position: relative;
    flex: 0 1 auto;
    min-width: 0;
    max-width: 100%;
    display: block;
  }

  @container (max-width: 560px) {
    .entity-picker {
      flex: 0 1 auto;
      width: 100%;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .entity-picker {
      flex: 0 1 auto;
      width: 100%;
    }
  }

  .entity-picker-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    max-width: 100%;
  }

  .entity-trigger {
    flex: 0 0 auto;
    max-width: 100%;
    width: fit-content;
  }

  .entity-add-trigger {
    width: fit-content;
  }

  .entity-add-trigger ha-icon {
    --mdc-icon-size: 20px;
  }

  .history-loading-indicator {
    position: absolute;
    top: 16px;
    right: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 8px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 88%, var(--primary-color, #03a9f4) 12%);
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    box-shadow: 0 2px 8px rgb(0 0 0 / 14%);
    font-size: 11px;
    line-height: 1;
    pointer-events: none;
    transform: translateY(-50%);
    z-index: 1;
  }

  .history-loading-spinner {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, var(--better-history-muted-color, var(--secondary-text-color, #888)) 28%, transparent);
    border-top-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    box-sizing: border-box;
    animation: better-history-spin 850ms linear infinite;
  }

  @keyframes better-history-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .entity-menu,
  .entity-select-menu {
    position: fixed;
    top: -9999px;
    left: -9999px;
    display: none;
    width: min(420px, calc(100vw - 48px));
    max-height: 420px;
    padding: 12px;
    overflow: hidden;
    border: var(--wa-panel-border-width, 1px) var(--wa-panel-border-style, solid) var(--wa-color-surface-border, var(--divider-color, rgba(0, 0, 0, 0.12)));
    border-radius: var(--wa-panel-border-radius, var(--ha-dialog-border-radius, var(--ha-border-radius-3xl, 24px)));
    background: var(--wa-color-surface-raised, var(--card-background-color, #fff));
    box-shadow: var(--wa-shadow-m, var(--ha-box-shadow-m, 0 4px 8px rgba(0, 0, 0, 0.08)));
    box-sizing: border-box;
    z-index: 100;
  }

  .entity-menu[open],
  .entity-select-menu[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 8px;
  }

  .entity-select-menu[open] {
    grid-template-rows: auto minmax(0, auto);
    max-height: 360px;
  }

  .entity-select-results {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow-y: auto;
  }

  .entity-select-result {
    background: transparent;
    border: 0;
    border-radius: var(--better-history-radius, 8px);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font: inherit;
    gap: 1px;
    min-width: 0;
    padding: 8px;
    text-align: left;
  }

  .entity-select-result:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-menu-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .entity-menu-title {
    font-size: var(--wa-font-size-m, var(--ha-font-size-m, 14px));
    font-weight: var(--wa-font-weight-body, var(--ha-font-weight-normal, 400));
    color: var(--wa-color-text-normal, var(--primary-text-color));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 8px;
  }

  .entity-menu-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    cursor: pointer;
    font-size: 14px;
    flex-shrink: 0;
  }

  .entity-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 0;
  }

  .source-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 32px;
    padding: 0 8px 0 3px;
    border-radius: 20px;
    border: var(--wa-border-width-md, 1.5px) solid;
    background: var(--card-background-color, var(--better-history-bg, #1e1e2e));
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    user-select: none;
    -webkit-user-select: none;
  }

  .source-chip[draggable="true"] {
    cursor: grab;
  }

  .source-chip[draggable="true"]:active {
    cursor: grabbing;
  }

  .source-chip[dragging] {
    opacity: 0.48;
    outline: 2px solid var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline-offset: 2px;
  }

  .source-chip.entity-source-chip {
    border-color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
  }

  .source-chip.attr-source-chip {
    border-color: var(--ha-color-amber-80, #ffb74d);
  }

  .source-chip-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .entity-source-chip .source-chip-icon {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 20%, transparent);
  }

  .attr-source-chip .source-chip-icon {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 20%, transparent);
  }

  .source-chip-icon ha-icon {
    --mdc-icon-size: 16px;
  }

  .source-chip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: var(--wa-font-size-s, 13px);
    color: var(--primary-text-color, var(--better-history-text-color, #fff));
  }

  .source-chip-remove {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--secondary-text-color, #888);
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1;
  }

  .source-chip-remove:hover {
    background: color-mix(in srgb, var(--secondary-text-color, #888) 15%, transparent);
    color: var(--primary-text-color, #fff);
  }

  .source-settings-popover {
    position: fixed;
    top: -9999px;
    left: -9999px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 260px;
    padding: 12px;
    border: var(--wa-panel-border-width, 1px) var(--wa-panel-border-style, solid) var(--wa-color-surface-border, var(--divider-color, rgba(0, 0, 0, 0.12)));
    border-radius: var(--better-history-radius, 8px);
    background: var(--wa-color-surface-raised, var(--card-background-color, #fff));
    box-shadow: var(--wa-shadow-m, var(--ha-box-shadow-m, 0 4px 8px rgba(0, 0, 0, 0.08)));
    box-sizing: border-box;
    z-index: 110;
  }

  .source-settings-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    color: var(--wa-color-text-normal, var(--primary-text-color));
    font-size: var(--wa-font-size-s, 13px);
  }

  .source-settings-input {
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: var(--better-history-radius, 8px);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #111);
    font: inherit;
    padding: 0 10px;
  }

  .source-settings-input:focus {
    border-color: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    outline: none;
  }

  .source-settings-close {
    align-self: flex-end;
    min-height: 32px;
    border: 0;
    border-radius: var(--better-history-radius, 8px);
    background: var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4)));
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    padding: 0 12px;
  }

  .entity-browser {
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .entity-browser-title {
    font-size: var(--wa-font-size-m, var(--ha-font-size-m, 14px));
    font-weight: var(--wa-font-weight-body, var(--ha-font-weight-normal, 400));
    color: var(--wa-color-text-normal, var(--primary-text-color));
    margin-bottom: 2px;
  }

  .entity-breadcrumb {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    margin-bottom: 6px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 12px;
  }

  .entity-crumb {
    border: 0;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .entity-breadcrumb-sep {
    opacity: 0.5;
  }

  .entity-browser-list {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  .entity-browser-entries {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .entity-browser-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 6px 8px;
    border-radius: var(--better-history-radius, 8px);
    cursor: pointer;
    font-size: 13px;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
  }

  .entity-browser-entry:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-browser-entry--disabled {
    cursor: default;
    opacity: 0.45;
  }

  .entity-browser-entry--disabled:hover {
    background: transparent;
  }

  .entity-browser-entry--present {
    cursor: default;
    color: var(--ha-color-amber-80, #ffb74d);
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--ha-color-amber-80, #ffb74d);
  }

  .entity-browser-entry--present:hover {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 14%, transparent);
  }

  .entity-browser-entry--removable {
    cursor: pointer;
  }

  .entity-browser-entry--removable:hover {
    background: color-mix(in srgb, var(--ha-color-amber-80, #ffb74d) 22%, transparent);
  }

  .entity-browser-entry--present .entity-browser-entry-type,
  .entity-browser-entry--present .entity-browser-entry-arrow {
    color: inherit;
    opacity: 0.78;
  }

  .entity-browser-entry-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 1px;
  }

  .entity-browser-entry-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-browser-entry-secondary {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
    line-height: 1.25;
  }

  .entity-browser-entry-type,
  .entity-browser-entry-arrow {
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
    flex-shrink: 0;
  }

  .entity-browser-search {
    width: 100%;
    margin: 4px 0 6px;
  }

  .entity-browser-search-input {
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--wa-color-surface-raised, var(--card-background-color, #fff)) 92%, var(--primary-text-color, #000) 8%);
    box-sizing: border-box;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font: inherit;
    font-size: 13px;
    outline: none;
  }

  .entity-browser-search-input::placeholder {
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
  }

  .entity-browser-search-input:focus {
    border-color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    box-shadow: 0 0 0 1px var(--better-history-accent-color, var(--primary-color, #03a9f4));
  }

  .entity-browser-search-results {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .entity-browser-search-empty,
  .entity-browser-search-count {
    padding: 8px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 12px;
  }

  .entity-browser-back {
    padding: 6px 8px;
    cursor: pointer;
    font-size: 12px;
    color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .entity-browser-back:hover {
    background: rgba(var(--rgb-primary-text-color, 255, 255, 255), 0.08);
  }

  .entity-browser-entity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 10px;
    border-radius: var(--better-history-radius, 8px);
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    cursor: pointer;
    margin-bottom: 6px;
  }

  .entity-browser-entity:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 10%, transparent);
  }

  .entity-browser-entity--disabled {
    cursor: default;
    opacity: 0.45;
    border-style: dashed;
  }

  .entity-browser-entity--disabled:hover {
    background: transparent;
  }

  .entity-browser-entity--present {
    cursor: default;
    color: var(--better-history-accent-color, var(--primary-color, #03a9f4));
    border-color: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 62%, var(--better-history-border-color, var(--divider-color, #444)));
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--better-history-accent-color, var(--primary-color, #03a9f4));
  }

  .entity-browser-entity--present:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 14%, transparent);
  }

  .entity-browser-entity--removable {
    cursor: pointer;
  }

  .entity-browser-entity--removable:hover {
    background: color-mix(in srgb, var(--better-history-accent-color, var(--primary-color, #03a9f4)) 22%, transparent);
  }

  .entity-browser-entity-id {
    font-size: 13px;
    font-weight: 500;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-browser-section-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    padding: 2px 8px 4px;
    margin-top: 2px;
  }

  .entity-browser-empty {
    padding: 12px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 13px;
    text-align: center;
  }
`, Jr = [
	"ha-icon",
	"ha-button",
	"ha-icon-button",
	"ha-svg-icon",
	"ha-entity-picker",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip",
	"ha-assist-chip",
	"ha-generic-picker"
], Yr;
function Xr() {
	return Yr ??= Ue(Jr), Yr;
}
var Zr;
function Qr() {
	return Zr ??= $r(), Zr;
}
async function $r() {
	if (!customElements.get("ha-date-range-picker")) try {
		await Promise.race([customElements.whenDefined("partial-panel-resolver"), new Promise((e, t) => setTimeout(() => t(/* @__PURE__ */ Error("timeout")), 1e4))]);
		let e = document.createElement("partial-panel-resolver");
		e.hass = { panels: [{
			url_path: "history",
			component_name: "history"
		}] }, e._updateRoutes(), await e.routerOptions?.routes?.history?.load(), await customElements.whenDefined("ha-date-range-picker");
	} catch (e) {
		console.warn("[ha-better-history] Failed to load ha-date-range-picker:", e);
	}
}
function ei() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function ti() {
	await Qr();
}
function ni(e) {
	return w`
    <div
      class="date-picker-wrapper"
      @focusin=${() => e.onOpen?.()}
      @pointerdown=${() => e.onOpen?.()}
      @keydown=${(t) => {
		t.key === "Escape" && e.onClose?.();
	}}
    >
      <ha-date-range-picker
        .hass=${e.hass}
        .startDate=${e.startDate}
        .endDate=${e.endDate}
        time-picker
        extended-presets
        @value-changed=${(t) => {
		let n = t.detail, r = n.value?.startDate ?? n.startDate, i = n.value?.endDate ?? n.endDate;
		r instanceof Date && i instanceof Date && (e.onChange(r, i), e.onClose?.());
	}}
      ></ha-date-range-picker>
    </div>
  `;
}
var ri = 8, ii = 50, ai = 20, oi = [
	{
		name: "search_labels.entityName",
		weight: 10
	},
	{
		name: "search_labels.friendlyName",
		weight: 8
	},
	{
		name: "search_labels.deviceName",
		weight: 7
	},
	{
		name: "search_labels.areaName",
		weight: 6
	},
	{
		name: "search_labels.domainName",
		weight: 6
	},
	{
		name: "search_labels.entityId",
		weight: 3
	}
];
function si(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ci(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function li(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function ui(...e) {
	return e.find((e) => li(e) !== void 0);
}
function di(e) {
	return e.split(".")[0] ?? e;
}
function fi(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function pi(e, t) {
	let n = ci(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = ui(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = ui(i?.name_by_user, i?.name), l = ui(o?.name), u = di(t.entity_id);
	return {
		id: t.entity_id,
		primary: n,
		secondary: t.entity_id,
		sorting_label: [n, t.entity_id].join("_"),
		search_labels: {
			entityName: s,
			friendlyName: n,
			deviceName: c ?? null,
			areaName: l ?? null,
			domainName: u,
			entityId: t.entity_id
		}
	};
}
function mi(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => pi(e, t)) : [];
}
function hi(e, t) {
	if (e === t) return 0;
	if (Math.abs(e.length - t.length) > 2) return 3;
	let n = Array.from({ length: t.length + 1 }, (e, t) => t), r = Array(t.length + 1);
	for (let i = 1; i <= e.length; i += 1) {
		r[0] = i;
		for (let a = 1; a <= t.length; a += 1) {
			let o = e[i - 1] === t[a - 1] ? 0 : 1;
			r[a] = Math.min(r[a - 1] + 1, n[a] + 1, n[a - 1] + o);
		}
		n.splice(0, n.length, ...r);
	}
	return n[t.length] ?? 3;
}
function gi(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(fi);
}
function _i(e, t) {
	let n;
	for (let r of t) {
		if (r === e) {
			n = Math.max(n ?? 0, 120);
			continue;
		}
		let t = r.split(/[\s_.-]+/).filter(Boolean);
		if (t.some((t) => t === e)) {
			n = Math.max(n ?? 0, 110);
			continue;
		}
		if (t.some((t) => t.startsWith(e))) {
			n = Math.max(n ?? 0, 95);
			continue;
		}
		if (r.includes(e)) {
			n = Math.max(n ?? 0, 80);
			continue;
		}
		e.length >= 4 && t.some((t) => hi(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function vi(e, t, n = ai) {
	let r = fi(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = gi(e), n = 0;
		for (let e of r) {
			let r = _i(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var yi = !1;
async function bi() {
	yi || (yi = !0, await Xr());
}
function xi() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function Si(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = zi(e);
	return w`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? ci(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${ji(e)}
      </div>
      <div
        class="entity-picker-row"
        @dragover=${(t) => e.onSourceDragOver(void 0, t)}
        @drop=${(t) => e.onSourceDrop(void 0, t)}
      >
        ${e.hideEmptyPickerState ? wi(e) : Ci(e)}
        ${n.map((t) => Oi(t, e))}
      </div>
      ${e.hideEmptyPickerState ? Ti(e) : E}
      ${e.loading ? w`
            <div class="history-loading-indicator" role="status" aria-label=${I(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${I(e.hass, "loading")}</span>
            </div>
          ` : E}
      ${ki(e)}
    </div>
  `;
}
function Ci(e) {
	return w`
    <ha-generic-picker
      class="entity-trigger"
      .hass=${e.hass}
      .addButtonLabel=${I(e.hass, "add_target")}
      .value=${""}
      .getItems=${e.getItems}
      .emptyLabel=${""}
      .searchLabel=${I(e.hass, "search_entity")}
      .searchKeys=${oi}
      @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
    ></ha-generic-picker>
  `;
}
function wi(e) {
	let t = I(e.hass, "add_target");
	return w`
    <ha-button
      class="entity-trigger entity-add-trigger"
      size="small"
      appearance="filled"
      @click=${e.onEntityPickerOpened}
    >
      <ha-icon icon="mdi:playlist-plus" slot="start"></ha-icon>
      ${t}
    </ha-button>
  `;
}
function Ti(e) {
	let t = I(e.hass, "search_entity"), n = e.entitySearch ?? "", r = n.trim() ? e.getAdditionalItems(n).filter(Ei) : [];
	return w`
    <div class="entity-select-menu" ?open=${e.entityPickerOpen} @click=${(e) => e.stopPropagation()}>
      <input
        class="entity-browser-search-input"
        type="search"
        .value=${n}
        placeholder=${t}
        aria-label=${t}
        @input=${(t) => e.onEntitySearchChanged?.(t.target.value)}
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => e.stopPropagation()}
      />
      ${r.length > 0 ? w`
        <div class="entity-select-results">
          ${r.map((t) => w`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? w`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : E}
            </button>
          `)}
        </div>
      ` : E}
    </div>
  `;
}
function Ei(e) {
	return si(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function Di(e) {
	let t = e.attributes.icon;
	return typeof t == "string" && t ? t : {
		climate: "mdi:thermostat",
		sensor: "mdi:eye",
		binary_sensor: "mdi:radiobox-marked",
		light: "mdi:lightbulb",
		switch: "mdi:toggle-switch",
		input_boolean: "mdi:toggle-switch",
		fan: "mdi:fan",
		cover: "mdi:window-shutter",
		lock: "mdi:lock",
		media_player: "mdi:cast",
		vacuum: "mdi:robot-vacuum",
		camera: "mdi:camera",
		weather: "mdi:weather-partly-cloudy",
		device_tracker: "mdi:map-marker",
		person: "mdi:account",
		sun: "mdi:white-balance-sunny",
		alarm_control_panel: "mdi:shield",
		automation: "mdi:robot",
		script: "mdi:script-text",
		scene: "mdi:palette",
		timer: "mdi:timer"
	}[e.entity_id.split(".")[0]] ?? "mdi:bookmark";
}
function Oi(e, t) {
	let n = Li(e.id, t), r = Fi(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id, c = (e.kind === "entity_attribute" || e.kind === "entity_state") && r && !n, l, u, d = () => {
		l !== void 0 && (clearTimeout(l), l = void 0), u = void 0;
	}, f = (n) => {
		c && (n.preventDefault(), n.stopPropagation(), t.onSourceSettingsOpen(e, n));
	};
	return w`
    <div
      class="source-chip ${o}"
      data-source-id=${e.id}
      draggable=${r && !n}
      ?dragging=${s}
      @contextmenu=${f}
      @pointerdown=${(e) => {
		!c || e.button !== 0 || (u = {
			x: e.clientX,
			y: e.clientY
		}, l = setTimeout(() => {
			l = void 0, f(e);
		}, 560));
	}}
      @pointermove=${(e) => {
		u && (Math.abs(e.clientX - u.x) > 8 || Math.abs(e.clientY - u.y) > 8) && d();
	}}
      @pointerup=${d}
      @pointercancel=${d}
      @pointerleave=${d}
      @dragstart=${(i) => {
		d(), r && !n && t.onSourceDragStart(e.id, i);
	}}
      @dragend=${() => {
		d(), t.onSourceDragEnd();
	}}
      @dragover=${(i) => {
		r && !n && t.onSourceDragOver(e.id, i);
	}}
      @drop=${(n) => t.onSourceDrop(e.id, n)}
    >
      <span class="source-chip-icon">
        ${i && a ? w`<ha-icon .icon=${Di(a)}></ha-icon>` : w`<ha-icon .icon=${Ai(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? E : w`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function ki(e) {
	return e.sourceSettingsSourceId ? w`
    <div
      class="source-settings-popover"
      data-source-settings-popover
      @click=${(e) => e.stopPropagation()}
      @pointerdown=${(e) => e.stopPropagation()}
      @keydown=${(t) => {
		t.stopPropagation(), t.key === "Escape" && e.onSourceSettingsClose();
	}}
    >
      <label class="source-settings-field">
        <span>${I(e.hass, "attribute_unit")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsUnit ?? ""}
          placeholder=${I(e.hass, "attribute_unit_placeholder")}
          @input=${(t) => e.onSourceSettingsUnitChanged(t.target.value)}
        />
      </label>
      <label class="source-settings-field">
        <span>${I(e.hass, "group")}</span>
        <input
          class="source-settings-input"
          .value=${e.sourceSettingsGroup ?? ""}
          placeholder=${I(e.hass, "group_placeholder")}
          @input=${(t) => e.onSourceSettingsGroupChanged(t.target.value)}
        />
      </label>
      <button class="source-settings-close" @click=${e.onSourceSettingsClose}>
        ${I(e.hass, "done")}
      </button>
    </div>
  ` : E;
}
function Ai(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function ji(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!si(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return w`
    <div class="entity-browser">
      ${Mi(t, e)}
      <div class="entity-browser-list">
        ${t ? Ni(t, n, si(r) ? r : {}, e) : w`<div class="entity-browser-empty">${I(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Mi(e, t) {
	return !e || t.path.length === 0 ? w`` : w`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => w`
          ${n > 0 ? w`<span class="entity-breadcrumb-sep">/</span>` : E}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function Ni(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => si(r) ? !0 : xt(r) !== void 0 && !!Ct(e, [...t, n]));
	return w`
    <div class="entity-browser-entries">
      ${t.length > 0 ? w`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${I(r.hass, "back")}
            </div>
          ` : w`
            ${Hi(e, r)}
            ${a ? w`
                  <div class="entity-browser-section-title">${I(r.hass, "attributes")}</div>
                  ${Pi(r)}
                ` : E}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? Gi(e, r) : i.map(([n, i]) => Ui(e, n, i, t, r))}
    </div>
  `;
}
function Pi(e) {
	let t = I(e.hass, "search_attributes");
	return w`
    <div class="entity-browser-search">
      <input
        class="entity-browser-search-input"
        type="search"
        .value=${e.attributeSearch}
        placeholder=${t}
        aria-label=${t}
        @input=${(t) => e.onAttributeSearchChanged(t.target.value)}
        @click=${(e) => e.stopPropagation()}
        @keydown=${(e) => e.stopPropagation()}
      />
    </div>
  `;
}
function Fi(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function Ii(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function Li(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function Ri(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit
	};
}
function zi(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(Ri), ...e.selectedSources], n = /* @__PURE__ */ new Set();
	return t.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
}
function Bi(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function Vi(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function Hi(e, t) {
	let n = St(e);
	return n ? Vi(e, t) ? w`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Fi(n.id, t) ? w`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Ii(n.id, t) ? Li(n.id, t) ? w`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : w`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : Bi(e.entity_id, t) ? w`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : w`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : E;
}
function Ui(e, t, n, r, i) {
	if (si(n)) return w`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = xt(n), o = [...r, t];
	if (!a) return E;
	let s = Ct(e, o);
	return s ? Wi({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : E;
}
function Wi(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = w`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? w`<span class="entity-browser-entry-secondary">${a}</span>` : E}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return Fi(n.id, i) ? w`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : Ii(n.id, i) ? Li(n.id, i) ? w`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : w`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : w`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function Gi(e, t) {
	let n = Ki(e, e.attributes, t.attributeSearch), r = n.slice(0, ii);
	return r.length === 0 ? w`<div class="entity-browser-search-empty">${I(t.hass, "no_matching_attributes")}</div>` : w`
    <div class="entity-browser-search-results">
      ${r.map((e) => Wi({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? w`<div class="entity-browser-search-count">${I(t.hass, "attribute_results_limited")}</div>` : E}
    </div>
  `;
}
function Ki(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > ri)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if (si(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = xt(c), u = l ? Ct(e, t) : void 0;
			!l || !u || qi(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = Ji(e, r), i = Ji(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function qi(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function Ji(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
function L(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var Yi = /°[CF]|[CFK]$/, Xi = 60, Zi = 1e3, Qi = 24, $i = 28, ea = 720, ta = 1e3, na = 18, ra = 44, ia = 12, aa = 14, oa = 48, sa = .34, ca = .72, la = 720, ua = 2, da = [
	"current_temperature",
	"temperature",
	"hvac_action"
], fa = new Set(["current_temperature", "temperature"]), pa = 5, ma = "haBetterHistory";
function ha(e) {
	let t = 0;
	for (let n of e) n >= "0" && n <= "9" ? t += 6.2 : n === "." || n === "," ? t += 3.2 : n === "-" ? t += 4 : t += 6.2;
	return Math.ceil(t);
}
function ga(e) {
	let t = Math.max(0, ...e.map((e) => ha(e.value)));
	return t > 0 ? `${t + pa}px` : "0px";
}
function _a(e) {
	return Yi.test(e);
}
function va(e) {
	let t = e?.trim();
	if (!t || !/^\d+$/.test(t)) return;
	let n = Number(t);
	return Number.isSafeInteger(n) && n > 0 ? n : void 0;
}
function ya(e) {
	return e.group ?? e.scaleGroup;
}
var R = class extends D {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._removedConfigSourceIds = [], this._customEntityIds = [], this._entityPickerOpen = !1, this._datePickerOpen = !1, this._data = new Xt(this), this._tooltip = new gr(this), this._browserHistoryInstanceId = `hbh-${Math.random().toString(36).slice(2)}`, this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._suppressLiveRangeAnimation = !1, this._pendingAddedSources = [], this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastContentHeight = 0, this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (!t) {
					this._closeBrowserHistoryOverlays();
					return;
				}
				this._openBrowserHistoryLayer(t.layer);
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => mi(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return vi(mi(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		}, this._handleDocumentPointerDown = (e) => {
			this._lastPointerDownInside = this._isEventInsideAttributeOverlay(e), !(!this._attributeMenuOpen && !this._sourceSettingsSourceId) && (this._lastPointerDownInside || (e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen && !this._sourceSettingsSourceId) {
				this._lastPointerDownInside = !1;
				return;
			}
			let t = this._lastPointerDownInside;
			if (this._lastPointerDownInside = !1, !t && !this._isEventInsideAttributeOverlay(e)) {
				if (this._sourceSettingsSourceId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._sourceSettingsSourceId = void 0;
					return;
				}
				e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu();
			}
		};
	}
	static {
		this.styles = qr;
	}
	connectedCallback() {
		super.connectedCallback(), Xr(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), this._resizeObserver = new ResizeObserver((e) => {
			for (let t of e) if (t.target === this) {
				let e = Math.round(t.contentRect.width);
				e !== this._containerWidth && (this._containerWidth = e);
			} else t.target === this._observedChartSurface && this._syncChartSurfaceSize(t.contentRect.height);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._surfaceHeaderObserver?.disconnect(), this._surfaceHeaderObserver = void 0, this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
	}
	_maxXTicks() {
		if (this._containerWidth <= 0) return 12;
		let e = Math.max(3, Math.floor(this._containerWidth * 640 / (720 * 50)));
		return this._chartSurfaceHeight > 0 && this._chartSurfaceHeight < 120 ? Math.max(3, Math.min(e, Math.floor(this._chartSurfaceHeight / 24))) : e;
	}
	_observeChartSurface() {
		let e = this.renderRoot.querySelector(".chart-surface");
		e !== this._observedChartSurface && (this._observedChartSurface && this._resizeObserver?.unobserve(this._observedChartSurface), this._observedChartSurface = e ?? void 0, e ? (this._resizeObserver?.observe(e), this._syncChartSurfaceSize(e.getBoundingClientRect().height)) : this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1));
	}
	_syncChartSurfaceSize(e) {
		let t = Math.round(e), n = this._observedChartSurface?.querySelector(".chart-graphs"), r = n ? Math.round(n.offsetHeight) : 0;
		if (this._measureGraphLayout(n ?? void 0, r), this._lastContentHeight > 0 && r > 0 && r === this._lastContentHeight && Math.abs(t - this._chartSurfaceHeight) > ua) return;
		this._lastContentHeight = r;
		let i = r < t - ua || t < r - ua, a = t < this._chartSurfaceHeight - ua, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
		if (i || a || s) {
			this._chartSurfaceHeight !== t && (this._chartSurfaceHeight = t), this._chartSurfaceConstrained ||= !0;
			return;
		}
		this._chartSurfaceHeight !== 0 && (this._chartSurfaceHeight = 0), this._chartSurfaceConstrained &&= !1;
	}
	_observeSurfaceHeader() {
		let e = this.renderRoot.querySelector(".surface-header");
		e !== this._observedSurfaceHeader && (this._surfaceHeaderObserver && this._observedSurfaceHeader && this._surfaceHeaderObserver.unobserve(this._observedSurfaceHeader), this._observedSurfaceHeader && !e && this._syncSurfaceHeaderOffset(0), this._observedSurfaceHeader = e ?? void 0, e && (this._surfaceHeaderObserver ||= new ResizeObserver((e) => {
			for (let t of e) this._syncSurfaceHeaderOffset(t.contentRect.height);
		}), this._surfaceHeaderObserver.observe(e)));
	}
	_measureGraphLayout(e, t) {
		if (!e || t <= 0) return;
		let n = e.querySelectorAll(".graph-section").length, r = this._graphGroupRenderCache?.graphHeight;
		if (n <= 0 || r === void 0) return;
		let i = Math.max(0, t - n * r);
		this._measuredGraphLayout = {
			graphCount: n,
			graphHeight: r,
			overheadHeight: i
		};
	}
	_syncSurfaceHeaderOffset(e) {
		let t = this.renderRoot.querySelector(".chart-surface");
		if (!t) return;
		if (e <= 0) {
			t.style.getPropertyValue("--better-history-surface-header-offset") && t.style.removeProperty("--better-history-surface-header-offset");
			return;
		}
		let n = t.querySelector(".chart-graphs"), r = Math.round(t.getBoundingClientRect().height), i = n ? Math.round(n.offsetHeight) : 0, a = i > r - ua, o = Math.max(0, (r - i) / 2), s = e + 10 - o, c = t.style.getPropertyValue("--better-history-surface-header-offset"), l = c !== "";
		if (this._chartSurfaceConstrained || a) {
			let r = Math.ceil(e + 10);
			if (c === `${r}px`) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${r}px`);
			return;
		}
		if (s <= 0) {
			if (!l || s > -ua) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.removeProperty("--better-history-surface-header-offset");
			return;
		}
		let u = Math.ceil(2 * s);
		c !== `${u}px` && (this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${u}px`));
	}
	_effectiveStartDate() {
		return this._usesRollingRelativeRange() ? new Date(Date.now() - this._relativeRangeMs()) : this._rangeStart ?? this.startDate ?? this.config?.startDate ?? new Date(Date.now() - this._relativeRangeMs());
	}
	_effectiveEndDate() {
		if (this._usesRollingRelativeRange()) return /* @__PURE__ */ new Date();
		let e = this._requestedEndDate(), t = this._liveNow || Date.now();
		return e.getTime() > t ? new Date(t) : e;
	}
	_requestedEndDate() {
		return this._rangeEnd ?? this.endDate ?? this.config?.endDate ?? /* @__PURE__ */ new Date();
	}
	_rangeExtendsFuture() {
		return this._requestedEndDate().getTime() > Date.now();
	}
	_relativeRangeMs() {
		return (this.config?.hours ?? this.hours ?? 24) * 36e5;
	}
	_usesRollingRelativeRange() {
		return !this._importedDataActive && !this._rangeStart && !this._rangeEnd && !this.startDate && !this.endDate && !this.config?.startDate && !this.config?.endDate;
	}
	_effectiveDateRange() {
		if (this._usesRollingRelativeRange()) {
			let e = /* @__PURE__ */ new Date();
			return {
				start: new Date(e.getTime() - this._relativeRangeMs()),
				end: e
			};
		}
		return {
			start: this._effectiveStartDate(),
			end: this._effectiveEndDate()
		};
	}
	_syncLiveClock() {
		if (!this._rangeExtendsFuture()) {
			this._stopLiveClock();
			return;
		}
		if (this._liveNowTimer !== void 0) return;
		let e = Date.now();
		this._viewEnd &&= new Date(e), this._liveNow = e, this._liveNowTimer = setInterval(() => {
			if (!this._rangeExtendsFuture()) {
				this._stopLiveClock();
				return;
			}
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= Zi * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, Zi);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[ma] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && !(n.layer !== "date-picker" && n.layer !== "entity-picker" && n.layer !== "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[ma]: {
				instanceId: this._browserHistoryInstanceId,
				layer: e
			}
		};
	}
	_pushBrowserHistoryLayer(e) {
		this._syncingBrowserHistory || this._browserHistoryEntry()?.layer !== e && window.history.pushState(this._browserHistoryState(e), "", window.location.href);
	}
	_replaceBrowserHistoryLayer(e) {
		this._syncingBrowserHistory || window.history.replaceState(this._browserHistoryState(e), "", window.location.href);
	}
	_closeBrowserHistoryLayer(e, t) {
		if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === e) {
			window.history.back();
			return;
		}
		t();
	}
	_openBrowserHistoryLayer(e) {
		this._datePickerOpen = e === "date-picker", this._entityPickerOpen = e === "entity-picker", this._attributeMenuOpen = e === "attribute-picker", e !== "attribute-picker" && (this._attributeSearch = "");
	}
	_closeBrowserHistoryOverlays() {
		this._datePickerOpen && this._closeDatePickerOverlay(), (this._attributeMenuOpen || this._entityPickerOpen) && this._closePickerOverlay();
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._attributeSearch = "", this._sourceSettingsSourceId = void 0;
	}
	_closeDatePickerOverlay() {
		if (!this._datePickerOpen) return;
		this._datePickerOpen = !1;
		let e = this.renderRoot.querySelector("ha-date-range-picker");
		e?.dispatchEvent(new KeyboardEvent("keydown", {
			key: "Escape",
			bubbles: !0
		})), e?.blur();
		let t = this.getRootNode(), n = t instanceof Document || t instanceof ShadowRoot ? t.activeElement : void 0;
		n instanceof HTMLElement && n.blur();
	}
	_effectiveLineMode() {
		return this._runtimeLineMode ?? this.config?.lineMode ?? this.lineMode;
	}
	_effectiveViewRange() {
		let e = this._resolved?.startDate ?? this._effectiveStartDate(), t = this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved?.endDate ?? this._effectiveEndDate(), n = this._viewStart && this._viewStart.getTime() >= e.getTime() ? this._viewStart : e, r = this._viewEnd && this._viewEnd.getTime() <= t.getTime() ? this._viewEnd : t;
		if (r.getTime() <= n.getTime()) return {
			start: e,
			end: t
		};
		let i = this._minViewSpanMs();
		if (r.getTime() - n.getTime() >= i) return {
			start: n,
			end: r
		};
		let a = e.getTime(), o = t.getTime(), s = Math.min(Math.max(n.getTime(), a), o - i);
		return {
			start: new Date(s),
			end: new Date(s + i)
		};
	}
	_pickerEntities() {
		return this.hass ? [...this.config?.defaultEntities ?? [], ...this._customEntityIds].filter((e) => typeof e == "string" && e !== "").filter((e, t, n) => n.indexOf(e) === t).map((e) => this.hass?.states[e]).filter((e) => e !== void 0) : [];
	}
	_fetchSources() {
		let e = [], t = /* @__PURE__ */ new Set();
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(xr(n)));
		for (let n of this._selectedSources) for (let r of this._expandedSelectedSources(n)) t.has(r.id) || (t.add(r.id), e.push(r));
		return e;
	}
	_isDefaultSource(e) {
		return this._activeResolvedSeries().some((t) => t.id === e.id && t.forced !== !1);
	}
	_activeResolvedSeries() {
		return this._resolved ? this._resolved.series.filter((e) => !this._removedConfigSourceIds.includes(e.id)) : [];
	}
	_activeResolvedConfig() {
		if (this._resolved) return {
			...this._resolved,
			series: this._activeResolvedSeries()
		};
	}
	_reconcileRemovedConfigSourceIds(e) {
		if (this._removedConfigSourceIds.length === 0) return;
		let t = new Set(e.series.filter((e) => e.forced === !1).map((e) => e.id)), n = this._removedConfigSourceIds.filter((e) => t.has(e));
		n.length !== this._removedConfigSourceIds.length && (this._removedConfigSourceIds = n);
	}
	_resolvedTemperatureUnit() {
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && _a(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._usesRollingRelativeRange(), n = this._effectiveDateRange(), r = n.start.getTime(), i = n.end.getTime(), a = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && (a || t) && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(r), new Date(i));
		let o = r !== this._prevStartTime || i !== this._prevEndTime, s = this._containerWidth !== this._prevContainerWidth, c = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours"), l = (a || t) && o && !s && !c;
		this._suppressLiveRangeAnimation = l, (o || s) && (l || this._prevClipX.clear(), this._prevStartTime = r, this._prevEndTime = i, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let u = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._removedConfigSourceIds.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (u.some((t) => e.has(t))) {
			let r = !u.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear()), r) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if ((a || t) && this._lastFetchKey && (this._lastHassResolveTime = e, !t) || !t && e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let i = Wr({
				config: this.config,
				entities: this.entities,
				hours: this.hours,
				startDate: n.start,
				endDate: n.end,
				showDatePicker: this.showDatePicker,
				showEntityPicker: this.showEntityPicker,
				showLegend: this.showLegend,
				showTooltip: this.showTooltip,
				showGrid: this.showGrid,
				showScale: this.showScale,
				width: this.width,
				height: this.height,
				lineMode: this._effectiveLineMode(),
				lineWidth: this.lineWidth,
				backgroundColor: this.backgroundColor,
				title: this.graphTitle,
				titleFontFamily: this.titleFontFamily,
				titleFontSize: this.titleFontSize,
				titleColor: this.titleColor,
				language: this.language,
				hass: this.hass,
				attributeUnits: this.attributeUnits
			});
			this._reconcileRemovedConfigSourceIds(i), this._resolved = i, !this._rangeStart && !this._rangeEnd && !t && (this._rangeStart = i.startDate, this._rangeEnd = i.endDate), !this._viewStart && !this._viewEnd && !t && (this._viewStart = i.startDate, this._viewEnd = i.endDate);
			let o = this._fetchSources(), s = o.map((e) => e.id).sort().join("|"), c = t ? `${s}|rolling|${this._relativeRangeMs()}` : `${s}|${i.startDate.getTime()}|${i.endDate.getTime()}`;
			if (c !== this._lastFetchKey) {
				let e = s === this._lastFetchKey.split("|").slice(0, -2).join("|") && this._lastFetchKey !== "";
				if (this._lastFetchSources.length > 0 && !e) {
					let e = new Set(this._lastFetchSources.map((e) => e.id)), t = new Set(o.map((e) => e.id)), n = o.filter((t) => !e.has(t.id)), r = this._lastFetchSources.filter((e) => !t.has(e.id)).map((e) => e.id);
					n.length > 0 && r.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.addSources(this.hass, n, i.startDate, i.endDate)) : r.length > 0 && n.length === 0 ? (this._lastFetchKey = c, this._lastFetchSources = o, this._data.removeSources(r)) : (this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate));
				} else this._lastFetchKey = c, this._lastFetchSources = o, this._data.fetch(this.hass, o, i.startDate, i.endDate);
			}
			i.showDatePicker && !this._datePickerReady && ti().then(() => {
				this._datePickerReady = ei(), this.requestUpdate();
			}), i.showEntityPicker && !this._entityComponentsReady && bi().then(() => {
				this._entityComponentsReady = xi(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), this._observeSurfaceHeader(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this._positionSourceSettingsPopover(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen") || e.has("_datePickerOpen") || e.has("_sourceSettingsSourceId")) && this._emitPickerOverlayState(), this._emitGraphVisibilityState(), this._animateClipPaths(), this._wasLoading = this._data.loading, this._suppressLiveRangeAnimation = !1;
	}
	_emitPickerOverlayState() {
		let e = this._datePickerOpen || this._attributeMenuOpen || this._entityPickerOpen || this._sourceSettingsSourceId !== void 0;
		e !== this._lastPickerOverlayOpen && (this._lastPickerOverlayOpen = e, this.dispatchEvent(new CustomEvent("picker-overlay-changed", {
			detail: { open: e },
			bubbles: !0,
			composed: !0
		})));
	}
	_onDateRangeChanged(e, t) {
		this._rangeStart = e, this._rangeEnd = t, this._viewStart = e, this._viewEnd = t, this.dispatchEvent(new CustomEvent("range-changed", {
			detail: {
				startDate: e,
				endDate: t
			},
			bubbles: !0,
			composed: !0
		})), this.requestUpdate();
	}
	_onDatePickerOpened() {
		this._datePickerOpen || (this._datePickerOpen = !0, this._pushBrowserHistoryLayer("date-picker"));
	}
	_onDatePickerClosed() {
		this._closeBrowserHistoryLayer("date-picker", () => this._closeDatePickerOverlay());
	}
	_pickScaleGroup(e, t, n) {
		if (e.valueType !== "number") return `series:${e.id}`;
		let r = ya(e);
		if (r) {
			let e = va(r);
			if (e !== void 0) {
				let r = (n ?? this._scaleGraphKeys(t))[e - 1];
				if (r) return r;
			}
			return `group:${r}`;
		}
		let i = e.entityId.startsWith("climate.") && e.path?.length === 1 && fa.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.unit === e.unit && t.valueType === "number");
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.unit === e.unit && t.valueType === "number");
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && _a(e.unit)) return i.scaleGroupKey;
		}
		if (i) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && _a(e.unit));
			return e ? e.scaleGroupKey : "group:temperature";
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_scaleGraphKeys(e) {
		return [...new Set(e.filter((e) => e.valueType === "number" || e.valueType === "boolean").map((e) => e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey))];
	}
	_usesScaleGraphAlias(e) {
		return e.valueType === "number" && va(ya(e)) !== void 0;
	}
	_renderSeriesFromSource(e, t, n, r) {
		let i = e.entityId.startsWith("climate.") && e.path?.length === 1 ? e.path[0] : void 0;
		return {
			id: e.id,
			label: e.label,
			color: this._importedSeriesMeta.get(e.id)?.color ?? (i ? Qt[i] : void 0) ?? tn(r),
			unit: e.unit,
			scaleGroupKey: n,
			scaleMode: "auto",
			lineMode: this._runtimeLineMode ?? this._importedSeriesMeta.get(e.id)?.lineMode ?? this._defaultLineMode(),
			lineWidth: this._defaultLineWidth(),
			valueType: e.valueType,
			points: t?.points ?? []
		};
	}
	_defaultLineMode() {
		let e = this._effectiveLineMode();
		return e === "line" || e === "column" ? e : "stair";
	}
	_defaultLineWidth() {
		let e = this.config?.lineWidth ?? this.lineWidth;
		return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : "2.5" : typeof e == "string" && e.trim() !== "" ? e.trim() : "2.5";
	}
	_showImportButton() {
		return this.showImportButton || this.config?.showImportButton === !0;
	}
	_showExportButton() {
		return this.config?.showExportButton !== !1 && this.showExportButton;
	}
	_showTimeRangeSelector() {
		return this.config?.showTimeRangeSelector !== !1 && this.showTimeRangeSelector;
	}
	_allSeriesHaveExplicitLineMode() {
		if (this._selectedSources.length > 0) return !1;
		if (this.config?.lineMode != null) return !0;
		let e = this.config?.series;
		return e && e.length > 0 ? e.every((e) => e.lineMode != null) : !1;
	}
	_showLineModeButtons() {
		return this._allSeriesHaveExplicitLineMode() ? !1 : this.config?.showLineModeButtons !== !1 && this.showLineModeButtons;
	}
	_hasForcedConfigSeries() {
		return this._activeResolvedSeries().some((e) => e.forced !== !1);
	}
	_buildRenderSeries() {
		if (!this._resolved && !this._importedDataActive) return [];
		let e = this._importedDataActive ? [] : this._activeResolvedSeries().flatMap((e) => {
			let t = this._data.series.find((t) => t.source.id === e.id);
			return [{
				id: e.id,
				label: e.label,
				color: e.color,
				unit: e.unit,
				scaleGroupKey: e.scaleGroupKey,
				scaleMode: e.scaleMode,
				scaleMin: e.scaleMin,
				scaleMax: e.scaleMax,
				lineMode: this._runtimeLineMode ?? e.lineMode,
				lineWidth: e.lineWidth,
				valueType: e.valueType,
				points: t?.points ?? []
			}];
		}), t = [], n = new Set(e.map((e) => e.id));
		for (let e of this._selectedSources) for (let r of this._expandedSelectedSources(e)) {
			if (n.has(r.id)) continue;
			let e = this._data.series.find((e) => e.source.id === r.id);
			e && (n.add(r.id), t.push({
				source: r,
				fetched: e
			}));
		}
		let r = [...e];
		for (let { source: e, fetched: n } of t) this._usesScaleGraphAlias(e) || r.push(this._renderSeriesFromSource(e, n, this._pickScaleGroup(e, r), r.length));
		let i = this._scaleGraphKeys(r);
		for (let { source: n, fetched: r } of t) {
			let t = this._pickScaleGroup(n, e, i);
			e.push(this._renderSeriesFromSource(n, r, t, e.length));
		}
		return e;
	}
	_chartSourceKey() {
		return [...(this._importedDataActive ? [] : this._activeResolvedSeries()).map((e) => [
			e.id,
			e.label,
			e.color,
			e.unit ?? "",
			e.scaleGroupKey,
			e.scaleMode,
			e.scaleMin ?? "",
			e.scaleMax ?? "",
			e.lineMode,
			e.lineWidth,
			e.valueType
		].join("~")) ?? [], ...this._selectedSources.flatMap((e) => this._expandedSelectedSources(e)).map((e) => [
			e.id,
			e.label,
			e.kind,
			e.unit ?? "",
			ya(e) ?? "",
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth()
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.containerWidth === o) return n.data;
		let c = this._maxXTicks(), l = this._buildRenderSeries(), u = l.filter((e) => !this._hiddenSeriesIds.includes(e.id)), d = {
			start: i,
			end: Math.max(a, i + 1)
		}, f = this._data.debugPerformance, p = f ? A() : 0, m = cr(l, u, d, this._resolved?.disableClimateOverlay ?? !1, c, s), h = f ? A() - p : 0;
		return f && j(f, "chart.build_data", {
			allSeriesCount: l.length,
			visibleSeriesCount: u.length,
			pointCount: u.reduce((e, t) => e + t.points.length, 0),
			groupCount: m.numericScales.length,
			segmentCount: m.segments.length,
			lineCount: m.numericLines.length,
			buildDurationMs: Math.round(h)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: i,
			endTime: a,
			extendStairToEnd: s,
			containerWidth: o,
			data: m
		}, m;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphHeightFor(e), r = this._graphGroupRenderCache;
		if (r && r.dataRef === e && r.maxXTicks === t && r.graphHeight === n) return r.groups;
		let i = hr(e, t, n);
		return this._graphGroupRenderCache = {
			dataRef: e,
			maxXTicks: t,
			graphHeight: n,
			groups: i
		}, i;
	}
	_lineTargetX(e) {
		let t = e.points.split(" "), n = t[t.length - 1], r = n ? parseFloat(n.split(",")[0]) : 0;
		return Number.isFinite(r) ? r : 0;
	}
	_shouldAnimateLine(e, t = this._lineTargetX(e)) {
		let n = this._prevClipX.get(e.id) ?? 0;
		return this._data.loading && !this._suppressLineAnimation && !this._suppressLiveRangeAnimation && t > n;
	}
	_graphHeightFor(e) {
		if (!this._chartSurfaceConstrained || this._chartSurfaceHeight <= 0) return 180;
		let t = this._graphCountFor(e), n = this._measuredGraphLayout?.graphCount === t ? this._measuredGraphLayout.overheadHeight : void 0, r = this._estimatedGraphOverhead(e, t), i = n ?? r, a = this._chartSurfaceHeight - i, o = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, s = Math.max(180, Math.min(Math.floor(o * sa), Math.floor(this._chartSurfaceHeight / t * ca), la)), c = Math.floor(Math.max(0, a) / t);
		return Math.max(oa, Math.min(c, s));
	}
	_graphCountFor(e) {
		return Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1);
	}
	_estimatedGraphOverhead(e, t) {
		let n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = this._resolved?.showLegend ?? !0 ? t * 30 : 0;
		return t * 62 + r + (n > 0 ? 10 + n * 14 : 0);
	}
	_renderGraphGroup(e) {
		let t = this._resolved?.showLegend ?? !0, n = this._resolved?.showGrid ?? !0, r = this._resolved?.showScale ?? !0, i = e.series.map((e) => e.id).join("|"), a = r ? ga(e.yLabels) : "0px", o = r ? ga(e.rightYLabels) : "0px", s = 28 + e.graphHeight, c = s + 3, l = s + 16 + 6;
		return w`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${pa}px;--axis-left-gutter:${a};--axis-right-gutter:${o};`}>
          <div class="axis-labels axis-labels--left" style="height:${e.canvasHeight}px">
            ${r ? e.yLabels.map((e) => w`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : E}
          </div>
          <div class="graph-canvas" data-series-ids=${i} style="height:${e.canvasHeight}px">
            <svg
              viewBox="${40} 0 ${640} ${e.svgHeight}"
              height="${e.svgHeight}"
              preserveAspectRatio="none"
            >
              ${n ? e.xLabels.map((e) => T`
                      <line class="grid-line grid-line--vertical" x1=${e.x.toFixed(1)} y1=${18} x2=${e.x.toFixed(1)} y2=${s}></line>
                    `) : E}
              ${n ? e.yLabels.map((e) => T`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : E}
              <defs>
                ${e.lines.map((t) => {
			let n = t.id.replace(/[^a-zA-Z0-9]/g, "_"), r = `clip-${n}`, i = `rect-${n}`, a = this._lineTargetX(t);
			return T`
                    <clipPath id=${r}>
                      <rect id=${i} x="0" y="0" width=${this._shouldAnimateLine(t, a) ? this._prevClipX.get(t.id) ?? 0 : a} height=${e.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${e.heatingAreas.map((e) => T`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
              ${e.columns.map((e) => T`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
              ${e.lines.map((e) => {
			let t = `clip-${e.id.replace(/[^a-zA-Z0-9]/g, "_")}`, n = this._lineTargetX(e), r = this._shouldAnimateLine(e, n);
			return T`<polyline class="line" style=${`--better-history-line-width:${e.lineWidth};`} clip-path="url(#${t})" data-line-id=${e.id} data-animate-clip=${r ? "true" : E} data-target-x=${n} points=${e.points} stroke=${e.color}></polyline>`;
		})}
              ${e.segments.map((e) => T`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
              ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => T`<rect class="segment-border" x=${40} y=${l + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
              ${r ? T`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${s}></line>` : E}
              ${r && e.rightYLabels.length > 0 ? T`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${s}></line>` : E}
              ${r ? T`<line class="axis" x1=${40} y1=${s} x2=${680} y2=${s}></line>` : E}
              ${r && e.scale ? e.yLabels.map((e) => T`
                      <line class="axis tick" x1=${40} y1=${e.y.toFixed(1)} x2=${44} y2=${e.y.toFixed(1)}></line>
                    `) : E}
              ${r ? e.rightYLabels.map((e) => T`
                      <line class="axis tick" x1=${676} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : E}
            </svg>
            ${r ? e.xLabels.map((e) => {
			let t = ((e.x - 40) / 640 * 100).toFixed(2);
			return w`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${t}%;top:${c}px;">${e.label}</span>`;
		}) : E}
          </div>
          <div class="axis-labels axis-labels--right" style="height:${e.canvasHeight}px">
            ${r ? e.rightYLabels.map((e) => w`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : E}
          </div>
        </div>
        ${t && e.allSeries.length > 0 ? w`
            <div class="graph-legend">
              ${e.allSeries.map((e) => w`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : E}
      </div>
    `;
	}
	_animateClipPaths() {
		let e = this.renderRoot;
		e && e.querySelectorAll("polyline[data-line-id]").forEach((t) => {
			let n = t.getAttribute("data-line-id"), r = Number(t.getAttribute("data-target-x"));
			if (!n || !Number.isFinite(r)) return;
			let i = this._prevClipX.get(n) ?? 0, a = n.replace(/[^a-zA-Z0-9]/g, "_"), o = e.querySelector(`#rect-${a}`);
			if (o instanceof SVGRectElement) {
				if (t.getAttribute("data-animate-clip") !== "true") {
					o.style.removeProperty("transition"), o.setAttribute("width", r.toString()), this._prevClipX.set(n, r);
					return;
				}
				o.style.setProperty("transition", "none"), o.setAttribute("width", i.toString()), o.getBoundingClientRect(), o.style.setProperty("transition", "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)"), o.setAttribute("width", r.toString()), this._prevClipX.set(n, r);
			}
			t.removeAttribute("data-animate-clip");
		});
	}
	_renderChartBody() {
		if (this._data.error) {
			this._queueGraphVisible(!1);
			let e = /timed?\s*out/i.test(this._data.error);
			return w`<div class="error">${I(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSources.length === 0) return this._queueGraphVisible(!1), E;
		let e = this._chartData(), t = e.visibleSeries.some((e) => e.points.length > 0), n = this._resolved.showTooltip, r = this._graphGroups(e), i = r.length > 0 && (t || this._data.loading);
		this._queueGraphVisible(i), this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let a = r.reduce((e, t) => e + t.canvasHeight, 0);
		if (t && n) {
			let t = r.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, a, e.timeBounds);
		}
		return w`
      <div class="chart-surface">
        ${i ? w`
              <div class="chart-graphs"
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : E}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : E}
              >
                ${r.map((e) => this._renderGraphGroup(e))}
                ${n ? this._tooltip.renderTooltip() : E}
              </div>` : this._data.loading ? E : w`<div class="empty">${I(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? E : Si({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSources,
			draggingSourceId: this._draggingSourceId,
			resolved: this._activeResolvedConfig(),
			loading: this._data.loading,
			attributeSearch: this._attributeSearch,
			getItems: this._getEntityPickerItems,
			getAdditionalItems: this._getAdditionalEntityPickerItems,
			onEntityPickerOpened: () => this._onEntityPickerOpened(),
			onEntityPickerClosed: () => this._onEntityPickerClosed(),
			onEntitySelected: (e) => this._onEntitySelected(e),
			onAttributeSearchChanged: (e) => {
				this._attributeSearch = e;
			},
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
			onSourceDragStart: (e, t) => this._onSourceDragStart(e, t),
			onSourceDragOver: (e, t) => this._onSourceDragOver(e, t),
			onSourceDragEnd: () => this._onSourceDragEnd(),
			onSourceDrop: (e, t) => this._onSourceDrop(e, t),
			sourceSettingsSourceId: this._sourceSettingsSourceId,
			sourceSettingsUnit: this._sourceSettingsSource()?.unit,
			sourceSettingsGroup: this._sourceSettingsSource() ? ya(this._sourceSettingsSource()) : void 0,
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({
					group: t || void 0,
					scaleGroup: void 0
				});
			},
			onBreadcrumbClick: (e) => {
				this._path = e;
			},
			onCloseMenu: () => this._closeAttributeMenu()
		});
	}
	_rangePercent(e, t) {
		let n = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), r = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime(), i = Math.max(r - n, 1), a = e?.getTime() ?? t.getTime();
		return Math.round((a - n) / i * 1e3);
	}
	_loadedRangeMs() {
		let e = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), t = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime(), n = Math.max(t, e + 1);
		return {
			start: e,
			end: n,
			span: n - e
		};
	}
	_rangeSliderTrackWidthPx(e) {
		let t = (e?.closest(".range-slider-stack") ?? this.renderRoot.querySelector(".range-slider-stack"))?.getBoundingClientRect().width ?? 0;
		return t > 0 ? t : void 0;
	}
	_minViewRangeGapPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? $i : Qi;
	}
	_rangeThumbHalfWidthPx() {
		return (window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? aa : ia) / 2;
	}
	_rangeThumbHitWidthPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? ra : na;
	}
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = this._minViewRangeGapPx(), r = Math.max(e ?? ea, n), i = Math.ceil(t * n / r), a = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, i, a));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * ta));
	}
	_percentFromRangePointer(e, t) {
		return Math.round(Math.max(0, Math.min(t.width, e.clientX - t.left)) / t.width * ta);
	}
	_setViewRangeMs(e, t, n) {
		let r = this._loadedRangeMs(), i = this._minViewSpanMs(n), a = Math.max(t - e, i), o = Math.min(a, r.span), s = Math.min(Math.max(e, r.start), r.end - o), c = s + o;
		this._viewStart = new Date(s), this._viewEnd = new Date(c), this.dispatchEvent(new CustomEvent("view-range-changed", {
			detail: {
				start: this._viewStart,
				end: this._viewEnd
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_dateFromRangePercent(e) {
		let t = this._resolved?.startDate.getTime() ?? this._effectiveStartDate().getTime(), n = this._rangeExtendsFuture() ? this._effectiveEndDate().getTime() : this._resolved?.endDate.getTime() ?? this._effectiveEndDate().getTime();
		return new Date(t + Math.max(0, Math.min(ta, e)) / ta * (n - t));
	}
	_formatRangeDate(e) {
		return e.toLocaleString(this._resolved?.language ?? void 0, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	_setViewRangePartPercent(e, t, n, r) {
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = this._minViewRangeStep(n), c;
		e === "start" ? (c = Math.min(Math.max(t, 0), o - s), r && (r.value = String(c)), this._setViewRangeMs(this._dateFromRangePercent(c).getTime(), i.end.getTime(), n)) : (c = Math.max(Math.min(t, ta), a + s), r && (r.value = String(c)), this._setViewRangeMs(i.start.getTime(), this._dateFromRangePercent(c).getTime(), n));
	}
	_setViewRangePart(e, t) {
		let n = t.currentTarget;
		this._setViewRangePartPercent(e, Number(n.value), this._rangeSliderTrackWidthPx(n), n);
	}
	_startRangeSelectionDrag(e, t, n) {
		let r = t.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._loadedRangeMs(), a = this._effectiveViewRange(), o = a.start.getTime(), s = a.end.getTime() - o;
		if (s >= i.span - 1) return;
		e.preventDefault(), e.stopPropagation();
		let c = e.clientX;
		t.setPointerCapture(e.pointerId), n.toggleAttribute("dragging", !0);
		let l = (e) => {
			e.preventDefault();
			let t = (e.clientX - c) / r.width * i.span, n = Math.min(Math.max(o + t, i.start), i.end - s);
			this._setViewRangeMs(n, n + s);
		}, u = () => {
			n.toggleAttribute("dragging", !1), t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", u);
		};
		t.addEventListener("pointermove", l), t.addEventListener("pointerup", u), t.addEventListener("pointercancel", u);
	}
	_startRangeThumbDrag(e, t, n, r) {
		e.preventDefault(), e.stopPropagation();
		let i = this._rangeSliderTrackWidthPx(t), a = (e) => {
			let r = t.getBoundingClientRect();
			r.width > 0 && this._setViewRangePartPercent(n, this._percentFromRangePointer(e, r), r.width);
		}, o = (e) => {
			e.preventDefault(), a(e);
		}, s = () => {
			t.removeEventListener("pointermove", o), t.removeEventListener("pointerup", s), t.removeEventListener("pointercancel", s);
		};
		t.setPointerCapture(e.pointerId), this._setViewRangePartPercent(n, r, i), t.addEventListener("pointermove", o), t.addEventListener("pointerup", s), t.addEventListener("pointercancel", s);
	}
	_onRangeSliderStackPointerDown(e) {
		if (e.button !== 0) return;
		let t = e.currentTarget, n = t.querySelector(".range-selection-hit");
		if (!(n instanceof HTMLElement)) return;
		let r = t.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = a / ta * r.width, c = o / ta * r.width, l = Math.max(0, Math.min(r.width, e.clientX - r.left)), u = this._percentFromRangePointer(e, r), d = this._rangeThumbHalfWidthPx(), f = this._rangeThumbHitWidthPx(), p = s <= f, m = c >= r.width - f, h = Math.max(0, s - f), g = Math.min(r.width, s + (p ? f : d)), _ = Math.max(0, c - (m ? f : d)), ee = Math.min(r.width, c + f);
		if (l > g && l < _ || g >= _ && l >= s && l <= c) {
			this._startRangeSelectionDrag(e, t, n);
			return;
		}
		let v = l >= h && l <= g ? "start" : l >= _ && l <= ee ? "end" : Math.abs(l - s) <= Math.abs(l - c) ? "start" : "end";
		this._startRangeThumbDrag(e, t, v, u);
	}
	_resetViewRange() {
		this._resolved && (this._viewStart = this._resolved.startDate, this._viewEnd = this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved.endDate, this.dispatchEvent(new CustomEvent("view-range-changed", {
			detail: {
				start: this._viewStart,
				end: this._viewEnd
			},
			bubbles: !0,
			composed: !0
		})));
	}
	_setRuntimeLineMode(e) {
		this._runtimeLineMode = e;
	}
	_exportData() {
		let e = this._effectiveViewRange(), t = this._buildRenderSeries().filter((e) => !this._hiddenSeriesIds.includes(e.id)).map((t) => ({
			id: t.id,
			entityId: t.id.startsWith("attr:") ? t.id.slice(5).split(":")[0] : t.id.replace(/^state:/, ""),
			attribute: t.id.startsWith("attr:") ? t.id.slice(5).split(":").slice(1).join(":") : void 0,
			label: t.label,
			unit: t.unit,
			valueType: t.valueType,
			lineMode: t.lineMode,
			color: t.color,
			points: t.points.filter((t) => t.time >= e.start.getTime() && t.time <= e.end.getTime()).map((e) => ({
				timestamp: new Date(e.time).toISOString(),
				value: e.value
			}))
		})), n = {
			format: "ha-better-history-series-v1",
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			loadedRange: {
				start: this._resolved?.startDate.toISOString(),
				end: (this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved?.endDate)?.toISOString()
			},
			viewRange: {
				start: e.start.toISOString(),
				end: e.end.toISOString()
			},
			series: t
		}, r = new Blob([JSON.stringify(n, null, 2)], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a"), o = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
		a.href = i, a.download = `ha-better-history-${o}.json`, a.click(), URL.revokeObjectURL(i);
	}
	_importData() {
		let e = document.createElement("input");
		e.type = "file", e.accept = "application/json,.json", e.addEventListener("change", () => {
			let t = e.files?.[0];
			t && t.text().then((e) => this._applyImportedData(JSON.parse(e))).catch(() => this._data.setError("Invalid import file"));
		}, { once: !0 }), e.click();
	}
	_applyImportedData(e) {
		if (!this._isExportPayload(e)) {
			this._data.setError("Unsupported import format");
			return;
		}
		let t = this._parseImportedSeries(e.series ?? []);
		if (!t) {
			this._data.setError("Invalid import data");
			return;
		}
		let n = this._parseDate(e.viewRange?.start), r = this._parseDate(e.viewRange?.end), i = this._parseDate(e.loadedRange?.start) ?? n, a = this._parseDate(e.loadedRange?.end) ?? r;
		if (!n || !r || !i || !a || i.getTime() >= a.getTime()) {
			this._data.setError("Invalid import range");
			return;
		}
		this._importedSeriesMeta = t.meta, this._importedDataActive = !0, this._selectedSources = t.series.map((e) => e.source), this._removedConfigSourceIds = [], this._rangeStart = i, this._rangeEnd = a, this._viewStart = n, this._viewEnd = r, this._hiddenSeriesIds = [], this._prevClipX.clear(), this._chartRenderCache = void 0, this._graphGroupRenderCache = void 0;
		let o = this._selectedSources.map((e) => e.id).sort().join("|");
		this._lastFetchKey = `${o}|${i.getTime()}|${a.getTime()}`, this._lastFetchSources = [...this._selectedSources], this._data.setImportedSeries(t.series, i, a), this.dispatchEvent(new CustomEvent("data-imported", {
			detail: {
				start: i,
				end: a,
				seriesCount: t.series.length
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_isExportPayload(e) {
		return typeof e == "object" && !!e && e.format === "ha-better-history-series-v1";
	}
	_parseImportedSeries(e) {
		let t = [], n = /* @__PURE__ */ new Map();
		for (let r of e) {
			if (typeof r != "object" || !r) return;
			let e = r, i = typeof e.id == "string" && e.id.trim() !== "" ? e.id : void 0, a = typeof e.entityId == "string" && e.entityId.trim() !== "" ? e.entityId : void 0, o = typeof e.label == "string" && e.label.trim() !== "" ? e.label : i, s = e.valueType === "number" || e.valueType === "boolean" || e.valueType === "string" ? e.valueType : void 0, c = Array.isArray(e.points) ? e.points : void 0;
			if (!i || !a || !o || !s || !c) return;
			let l = typeof e.attribute == "string" && e.attribute.trim() !== "" ? e.attribute : void 0, u = {
				id: i,
				kind: l ? "entity_attribute" : "entity_state",
				entityId: a,
				label: o,
				path: l?.split("."),
				valueType: s,
				unit: typeof e.unit == "string" ? e.unit : void 0
			}, d = c.map((e) => this._parseImportedPoint(e, s)).filter((e) => e !== void 0).sort((e, t) => e.time - t.time);
			t.push({
				source: u,
				points: d
			}), n.set(i, {
				color: typeof e.color == "string" && e.color.trim() !== "" ? e.color : void 0,
				lineMode: e.lineMode === "line" || e.lineMode === "column" || e.lineMode === "stair" ? e.lineMode : void 0
			});
		}
		return {
			series: t,
			meta: n
		};
	}
	_parseImportedPoint(e, t) {
		if (typeof e != "object" || !e) return;
		let n = e, r = Date.parse(String(n.timestamp ?? "")), i = n.value;
		if (Number.isFinite(r) && (t === "number" && typeof i == "number" && Number.isFinite(i) || t === "boolean" && typeof i == "boolean" || t === "string" && typeof i == "string")) return {
			time: r,
			value: i
		};
	}
	_parseDate(e) {
		if (typeof e != "string") return;
		let t = Date.parse(e);
		return Number.isFinite(t) ? new Date(t) : void 0;
	}
	_renderToolsPanel() {
		if (!this.toolsOpen || !this._resolved || this._lastGraphVisible === !1) return E;
		let e = this._effectiveViewRange(), t = this._rangePercent(e.start, this._resolved.startDate), n = this._rangePercent(e.end, this._resolved.endDate), r = this._defaultLineMode(), i = this._showTimeRangeSelector(), a = this._showLineModeButtons(), o = this._showExportButton(), s = this._showImportButton();
		return !i && !a && !o && !s ? E : w`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${i ? w`
                <div class="tool-range-control">
                  <div class="range-values">
                    <span>${this._formatRangeDate(e.start)}</span>
                    <span>${this._formatRangeDate(e.end)}</span>
                  </div>
                  <div
                    class="range-slider-stack"
                    @pointerdown=${(e) => this._onRangeSliderStackPointerDown(e)}
                  >
                    <div
                      class="range-selection"
                      style="left:${t / 10}%;right:${100 - n / 10}%;"
                    ></div>
                    <div
                      class="range-selection-hit"
                      style="left:${t / 10}%;right:${100 - n / 10}%;"
                    ></div>
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(t)} @input=${(e) => this._setViewRangePart("start", e)} />
                    <input class="range-slider" type="range" min="0" max="1000" .value=${String(n)} @input=${(e) => this._setViewRangePart("end", e)} />
                  </div>
                </div>
                <button
                  class="tool-action-button tool-reset-button"
                  title=${I(this.hass, "reset_zoom")}
                  aria-label=${I(this.hass, "reset_zoom")}
                  @click=${() => this._resetViewRange()}
                >
                  <ha-icon .icon=${"mdi:restore"}></ha-icon>
                </button>
              ` : E}
            <div class="tool-actions">
              ${a ? w`
                <div class="mode-switch" role="group" aria-label=${I(this.hass, "line_mode")}>
                  ${[
			[
				"stair",
				"mdi:stairs",
				"mode_stair"
			],
			[
				"line",
				"mdi:chart-line",
				"mode_line"
			],
			[
				"column",
				"mdi:chart-bar",
				"mode_column"
			]
		].map(([e, t, n]) => w`
                    <button
                      class="mode-button"
                      ?active=${r === e}
                      title=${I(this.hass, n)}
                      @click=${() => this._setRuntimeLineMode(e)}
                    >
                      <ha-icon .icon=${t}></ha-icon>
                    </button>
                  `)}
                </div>
              ` : E}
              ${o ? w`
                  <button
                    class="tool-action-button"
                    title=${I(this.hass, "export_data")}
                    aria-label=${I(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : E}
              ${s ? w`
                  <button
                    class="tool-action-button"
                    title=${I(this.hass, "import_data")}
                    aria-label=${I(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : E}
            </div>
          </div>
        </div>
      </div>
    `;
	}
	_queueGraphVisible(e) {
		this._pendingGraphVisible = e;
	}
	_emitGraphVisibilityState() {
		let e = this._pendingGraphVisible;
		e === void 0 || this._lastGraphVisible === e || (this._lastGraphVisible = e, this.dispatchEvent(new CustomEvent("graph-visibility-changed", {
			detail: { visible: e },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	render() {
		let e = this._resolved?.width ?? "100%", t = this._resolved?.backgroundColor ?? "transparent", n = this._resolved?.title?.trim(), r = [
			this._resolved?.titleFontFamily ? `font-family:${this._resolved.titleFontFamily};` : "",
			this._resolved?.titleFontSize ? `font-size:${this._resolved.titleFontSize};` : "",
			this._resolved?.titleColor ? `color:${this._resolved.titleColor};` : ""
		].join(""), i = this._hasVisibleControls(), a = i || this.toolsOpen && this._lastGraphVisible !== !1;
		return w`
      <div class="root" style="width:${e};background:${t};">
        ${n ? w`<div class="graph-title" style=${r}>${n}</div>` : E}
        <div class="chart-layout">
          ${a ? w`<div class="surface-header">
                ${i ? w`<div class="controls-bar">
                      ${this._renderDatePicker()}
                      ${this._renderEntityPickerUI()}
                    </div>` : E}
                ${this._renderToolsPanel()}
              </div>` : E}
          <div class="chart-area">
            ${this._renderChartBody()}
          </div>
        </div>
      </div>
    `;
	}
	_toggleSeries(e) {
		let t = !this._hiddenSeriesIds.includes(e);
		this._hiddenSeriesIds = t ? [...this._hiddenSeriesIds, e] : this._hiddenSeriesIds.filter((t) => t !== e), this.dispatchEvent(new CustomEvent("series-toggled", {
			detail: {
				id: e,
				hidden: t
			},
			bubbles: !0,
			composed: !0
		}));
	}
	_hasVisibleControls() {
		return this.showControls && (this._resolved?.showDatePicker === !0 && this._datePickerReady || this._resolved?.showEntityPicker === !0 && this._entityComponentsReady);
	}
	_renderDatePicker() {
		return !this._resolved?.showDatePicker || !this._datePickerReady ? E : ni({
			hass: this.hass,
			startDate: this._resolved.startDate,
			endDate: this._resolved.endDate,
			onChange: (e, t) => this._onDateRangeChanged(e, t),
			onOpen: () => this._onDatePickerOpened(),
			onClose: () => this._onDatePickerClosed()
		});
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "", t.style.maxHeight = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.left + 8, o = i.right - 8, s = o - a, c = Math.min(420, s);
		t.style.width = `${c}px`;
		let l;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (l = r.left, l = Math.min(l, o - c), l = Math.max(l, a)) : (l = a, t.style.width = `${s}px`);
		let u = window.visualViewport, d = u?.offsetTop ?? 0, f = d + (u?.height ?? window.innerHeight) - 8 - r.bottom - 6, p = r.top - d - 8 - 6, m = f < Math.min(t.scrollHeight || t.offsetHeight || 420, 420) && p > f, h = Math.min(Math.max(m ? p : f, 120), 420), g = m ? Math.max(d + 8, r.top - 6 - h) : r.bottom + 6;
		t.style.maxHeight = `${h}px`, t.style.top = `${g - n.top}px`, t.style.left = `${l - n.left}px`, t.style.right = "";
	}
	_positionSourceSettingsPopover() {
		let e = this._sourceSettingsSourceId;
		if (!e) return;
		let t = this.renderRoot?.querySelector("[data-source-settings-popover]"), n = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((t) => t.dataset.sourceId === e);
		if (!t || !n) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "";
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = this.getBoundingClientRect(), o = Math.min(280, Math.max(220, a.width - 16));
		t.style.width = `${o}px`;
		let s = a.left + 8, c = a.right - 8, l = Math.max(s, Math.min(i.left, c - o)), u = i.bottom + 6, d = i.top - t.offsetHeight - 6, f = u + t.offsetHeight <= window.innerHeight - 8 ? u : Math.max(8, d);
		t.style.left = `${l - r.left}px`, t.style.top = `${f - r.top}px`;
	}
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_onEntitySelected(e) {
		this._selectingEntityForAttributeMenu = !0, new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "entity-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker"), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("entity-picker"));
	}
	_onEntityPickerClosed() {
		if (this._selectingEntityForAttributeMenu) {
			this._entityPickerOpen = !1;
			return;
		}
		this._closeBrowserHistoryLayer("entity-picker", () => {
			this._entityPickerOpen = !1;
		});
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".entity-trigger");
		if (r && this._pathContainsElement(t, r)) return !0;
		let i = this.renderRoot?.querySelector("[data-source-settings-popover]");
		if (i && this._pathContainsElement(t, i)) return !0;
		for (let e of t) {
			if (e === this) break;
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path || e.unit) return e;
		let t = br(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = yr(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_expandedSelectedSources(e) {
		if (e.kind !== "entity_state" || !e.entityId.startsWith("climate.")) return [this._sourceWithAttributeUnit(e)];
		let t = this.hass?.states[e.entityId];
		if (!t) return [this._sourceWithAttributeUnit(e)];
		let n = typeof t.attributes.temperature_unit == "string" && t.attributes.temperature_unit !== "" ? t.attributes.temperature_unit : typeof t.attributes.unit_of_measurement == "string" && t.attributes.unit_of_measurement !== "" ? t.attributes.unit_of_measurement : void 0, r = da.map((r) => {
			let i = Ct(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: fa.has(r) ? n : void 0
			}, o = i ?? a, s = ya(e);
			return fa.has(r) && n ? {
				...o,
				unit: n,
				group: s
			} : fa.has(r) ? {
				...o,
				group: s
			} : o;
		});
		return [this._sourceWithAttributeUnit(e), ...r.map((e) => this._sourceWithAttributeUnit(e))];
	}
	_addSource(e) {
		if (this._resolved?.series.find((t) => t.id === e.id && t.forced === !1 && this._removedConfigSourceIds.includes(t.id))) {
			this._removedConfigSourceIds = this._removedConfigSourceIds.filter((t) => t !== e.id), this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e.id);
			return;
		}
		if (this._selectedSources.some((t) => t.id === e.id) || this._pendingAddedSources.some((t) => t.id === e.id) || (this._resolved?.series ?? []).some((t) => t.id === e.id)) return;
		let t = this._sourceWithAttributeUnit(e);
		this._pendingAddedSources = [...this._pendingAddedSources, t], this.dispatchEvent(new CustomEvent("series-added", {
			detail: { source: t },
			bubbles: !0,
			composed: !0
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), Xi);
	}
	_flushPendingAddedSources() {
		if (this._sourceAddBatchTimer = void 0, this._pendingAddedSources.length === 0) return;
		let e = new Set(this._selectedSources.map((e) => e.id)), t = this._pendingAddedSources.filter((t) => !e.has(t.id));
		this._pendingAddedSources = [], t.length !== 0 && (this._selectedSources = [...this._selectedSources, ...t], this.requestUpdate());
	}
	_removeSource(e) {
		let t = this._selectedSources.find((t) => t.id === e);
		if (this._pendingAddedSources = this._pendingAddedSources.filter((t) => t.id !== e), this._sourceSettingsSourceId === e && (this._sourceSettingsSourceId = void 0), this._activeResolvedSeries().find((t) => t.id === e && t.forced === !1)) {
			this._removedConfigSourceIds = [...this._removedConfigSourceIds, e], this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e), this._data.removeSources([e]), this.dispatchEvent(new CustomEvent("series-removed", {
				detail: { sourceId: e },
				bubbles: !0,
				composed: !0
			}));
			return;
		}
		!t || this._isDefaultSource(t) || (this._selectedSources = this._selectedSources.filter((t) => t.id !== e), this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e), this.dispatchEvent(new CustomEvent("series-removed", {
			detail: { sourceId: e },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	_sourceSettingsSource() {
		return this._selectedSources.find((e) => e.id === this._sourceSettingsSourceId);
	}
	_openSourceSettings(e) {
		e.kind !== "entity_attribute" && e.kind !== "entity_state" || (this._sourceSettingsSourceId = e.id);
	}
	_updateSourceSettings(e) {
		let t = this._sourceSettingsSourceId;
		t && (this._selectedSources = this._selectedSources.map((n) => n.id === t ? {
			...n,
			...e
		} : n), this.requestUpdate());
	}
	_onSourceDragStart(e, t) {
		let n = this._selectedSources.find((t) => t.id === e);
		if (!n || this._isDefaultSource(n)) {
			t.preventDefault();
			return;
		}
		this._draggingSourceId = e, this._dragStartSourceIds = this._selectedSources.map((e) => e.id), this._dragDropCommitted = !1, t.dataTransfer?.setData("text/plain", e), t.dataTransfer && (t.dataTransfer.effectAllowed = "move");
	}
	_onSourceDragEnd() {
		if (!this._dragDropCommitted && this._dragStartSourceIds) {
			let e = new Map(this._dragStartSourceIds.map((e, t) => [e, t]));
			this._selectedSources = [...this._selectedSources].sort((t, n) => (e.get(t.id) ?? 2 ** 53 - 1) - (e.get(n.id) ?? 2 ** 53 - 1));
		}
		this._draggingSourceId = void 0, this._dragStartSourceIds = void 0, this._dragDropCommitted = !1;
	}
	_onSourceDragOver(e, t) {
		t.preventDefault(), t.stopPropagation(), t.dataTransfer && (t.dataTransfer.dropEffect = "move");
		let n = this._draggingSourceId ?? t.dataTransfer?.getData("text/plain");
		n && this._previewSourceOrder(n, e);
	}
	_onSourceDrop(e, t) {
		t.preventDefault(), t.stopPropagation();
		let n = this._draggingSourceId ?? t.dataTransfer?.getData("text/plain");
		n && (this._previewSourceOrder(n, e), this._dragDropCommitted = !0, this.dispatchEvent(new CustomEvent("series-reordered", {
			detail: { sourceIds: this._selectedSources.map((e) => e.id) },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
	_previewSourceOrder(e, t) {
		if (e === t) return;
		let n = this._selectedSources.find((t) => t.id === e);
		if (!n || this._isDefaultSource(n)) return;
		let r = this._selectedSources.filter((t) => t.id !== e), i = t ? r.findIndex((e) => e.id === t) : r.length;
		if (i < 0) return;
		let a = [
			...r.slice(0, i),
			n,
			...r.slice(i)
		];
		a.map((e) => e.id).join("|") !== this._selectedSources.map((e) => e.id).join("|") && (this._selectedSources = a, this.requestUpdate());
	}
};
L([O({ attribute: !1 })], R.prototype, "hass", void 0), L([O({ attribute: !1 })], R.prototype, "config", void 0), L([O({ attribute: !1 })], R.prototype, "entities", void 0), L([O({ attribute: !1 })], R.prototype, "attributeUnits", void 0), L([O({ type: Number })], R.prototype, "hours", void 0), L([O({ attribute: !1 })], R.prototype, "startDate", void 0), L([O({ attribute: !1 })], R.prototype, "endDate", void 0), L([O({
	type: Boolean,
	attribute: "show-date-picker"
})], R.prototype, "showDatePicker", void 0), L([O({
	type: Boolean,
	attribute: "show-entity-picker"
})], R.prototype, "showEntityPicker", void 0), L([O({
	type: Boolean,
	attribute: "show-import-button"
})], R.prototype, "showImportButton", void 0), L([O({
	type: Boolean,
	attribute: "show-export-button"
})], R.prototype, "showExportButton", void 0), L([O({
	type: Boolean,
	attribute: "show-time-range-selector"
})], R.prototype, "showTimeRangeSelector", void 0), L([O({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], R.prototype, "showLineModeButtons", void 0), L([O({
	type: Boolean,
	attribute: "show-legend"
})], R.prototype, "showLegend", void 0), L([O({
	type: Boolean,
	attribute: "show-tooltip"
})], R.prototype, "showTooltip", void 0), L([O({
	type: Boolean,
	attribute: "show-grid"
})], R.prototype, "showGrid", void 0), L([O({
	type: Boolean,
	attribute: "show-scale"
})], R.prototype, "showScale", void 0), L([O({
	type: Boolean,
	attribute: "show-controls"
})], R.prototype, "showControls", void 0), L([O()], R.prototype, "width", void 0), L([O()], R.prototype, "height", void 0), L([O({ attribute: "line-mode" })], R.prototype, "lineMode", void 0), L([O({ attribute: "line-width" })], R.prototype, "lineWidth", void 0), L([O({ attribute: "background-color" })], R.prototype, "backgroundColor", void 0), L([O({ attribute: "graph-title" })], R.prototype, "graphTitle", void 0), L([O({ attribute: "title-font-family" })], R.prototype, "titleFontFamily", void 0), L([O({ attribute: "title-font-size" })], R.prototype, "titleFontSize", void 0), L([O({ attribute: "title-color" })], R.prototype, "titleColor", void 0), L([O()], R.prototype, "language", void 0), L([O({
	type: Boolean,
	attribute: "debug-performance"
})], R.prototype, "debugPerformance", void 0), L([O({
	type: Boolean,
	attribute: "tools-open"
})], R.prototype, "toolsOpen", void 0), L([k()], R.prototype, "_resolved", void 0), L([k()], R.prototype, "_hiddenSeriesIds", void 0), L([k()], R.prototype, "_rangeStart", void 0), L([k()], R.prototype, "_rangeEnd", void 0), L([k()], R.prototype, "_viewStart", void 0), L([k()], R.prototype, "_viewEnd", void 0), L([k()], R.prototype, "_liveNow", void 0), L([k()], R.prototype, "_datePickerReady", void 0), L([k()], R.prototype, "_entityComponentsReady", void 0), L([k()], R.prototype, "_runtimeLineMode", void 0), L([k()], R.prototype, "_attributeMenuOpen", void 0), L([k()], R.prototype, "_attributeSearch", void 0), L([k()], R.prototype, "_selectedEntityId", void 0), L([k()], R.prototype, "_path", void 0), L([k()], R.prototype, "_selectedSources", void 0), L([k()], R.prototype, "_removedConfigSourceIds", void 0), L([k()], R.prototype, "_customEntityIds", void 0), L([k()], R.prototype, "_entityPickerOpen", void 0), L([k()], R.prototype, "_datePickerOpen", void 0), L([k()], R.prototype, "_draggingSourceId", void 0), L([k()], R.prototype, "_sourceSettingsSourceId", void 0), L([k()], R.prototype, "_importedDataActive", void 0), L([k()], R.prototype, "_containerWidth", void 0), L([k()], R.prototype, "_chartSurfaceHeight", void 0), L([k()], R.prototype, "_chartSurfaceConstrained", void 0);
var ba = "haBetterHistory";
function xa(e) {
	return e?.group ?? e?.scaleGroup;
}
var z = class extends D {
	constructor(...e) {
		super(...e), this.browserHistory = !0, this._selectedSources = [], this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._componentsReady = !1, this._customEntityIds = [], this._browserHistoryInstanceId = `abh-picker-${Math.random().toString(36).slice(2)}`, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._handleDocumentPointerDown = (e) => {
			this._lastPointerDownInside = this._isEventInsideAttributeOverlay(e), !(!this._attributeMenuOpen && !this._sourceSettingsSourceId) && (this._lastPointerDownInside || (e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen && !this._entityPickerOpen && !this._sourceSettingsSourceId) {
				this._lastPointerDownInside = !1;
				return;
			}
			let t = this._lastPointerDownInside;
			if (this._lastPointerDownInside = !1, !t && !this._isEventInsideAttributeOverlay(e)) {
				if (this._sourceSettingsSourceId) {
					e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._sourceSettingsSourceId = void 0;
					return;
				}
				if (this._entityPickerOpen && !this._attributeMenuOpen) {
					this._closeBrowserHistoryLayer("entity-picker", () => {
						this._entityPickerOpen = !1, this._entitySearch = "";
					});
					return;
				}
				e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu();
			}
		}, this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (!t) {
					this._closePickerOverlay();
					return;
				}
				this._entityPickerOpen = t.layer === "entity-picker", this._attributeMenuOpen = t.layer === "attribute-picker", t.layer !== "attribute-picker" && (this._attributeSearch = "");
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._getItems = () => mi(this.hass), this._getAdditionalItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return vi(mi(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		};
	}
	static {
		this.styles = [qr, o`
      :host {
        display: block;
      }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), bi().then(() => {
			this._componentsReady = !0;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), window.removeEventListener("popstate", this._handleBrowserPopState);
	}
	willUpdate(e) {
		e.has("initialSources") && this.initialSources && (this._selectedSources = [...this.initialSources]), (e.has("_attributeMenuOpen") && this._attributeMenuOpen || e.has("_entityPickerOpen") && this._entityPickerOpen) && this.updateComplete.then(() => this._positionEntityMenu()), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this.updateComplete.then(() => this._positionSourceSettingsPopover());
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
		if (n && this._pathContainsElement(t, n)) return !0;
		let r = this.renderRoot?.querySelector(".entity-trigger");
		if (r && this._pathContainsElement(t, r)) return !0;
		let i = this.renderRoot?.querySelector("[data-source-settings-popover]");
		if (i && this._pathContainsElement(t, i)) return !0;
		for (let e of t) {
			if (e === this) break;
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_pathContainsElement(e, t) {
		return e.some((e) => e instanceof Node && t.contains(e));
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu[open], .entity-select-menu[open]");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "", t.style.maxHeight = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.left + 8, o = i.right - 8, s = o - a, c = Math.min(420, s);
		t.style.width = `${c}px`;
		let l;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (l = r.left, l = Math.min(l, o - c), l = Math.max(l, a)) : (l = a, t.style.width = `${s}px`);
		let u = window.visualViewport, d = u?.offsetTop ?? 0, f = d + (u?.height ?? window.innerHeight) - 8 - r.bottom - 6, p = r.top - d - 8 - 6, m = t.classList.contains("entity-select-menu") ? 360 : 420, h = f < Math.min(t.scrollHeight || t.offsetHeight || m, m) && p > f, g = Math.min(Math.max(h ? p : f, 120), m), _ = h ? Math.max(d + 8, r.top - 6 - g) : r.bottom + 6;
		t.style.maxHeight = `${g}px`, t.style.top = `${_ - n.top}px`, t.style.left = `${l - n.left}px`, t.style.right = "";
	}
	_positionSourceSettingsPopover() {
		let e = this._sourceSettingsSourceId;
		if (!e) return;
		let t = this.renderRoot?.querySelector("[data-source-settings-popover]"), n = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((t) => t.dataset.sourceId === e);
		if (!t || !n) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "";
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = this.getBoundingClientRect(), o = Math.min(280, Math.max(220, a.width - 16));
		t.style.width = `${o}px`;
		let s = a.left + 8, c = a.right - 8, l = Math.max(s, Math.min(i.left, c - o)), u = i.bottom + 6, d = i.top - t.offsetHeight - 6, f = u + t.offsetHeight <= window.innerHeight - 8 ? u : Math.max(8, d);
		t.style.left = `${l - r.left}px`, t.style.top = `${f - r.top}px`;
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[ba] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (n.instanceId === this._browserHistoryInstanceId && !(n.layer !== "entity-picker" && n.layer !== "attribute-picker")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[ba]: {
				instanceId: this._browserHistoryInstanceId,
				layer: e
			}
		};
	}
	_pushBrowserHistoryLayer(e) {
		this.browserHistory && (this._syncingBrowserHistory || this._browserHistoryEntry()?.layer !== e && window.history.pushState(this._browserHistoryState(e), "", window.location.href));
	}
	_replaceBrowserHistoryLayer(e) {
		this.browserHistory && (this._syncingBrowserHistory || window.history.replaceState(this._browserHistoryState(e), "", window.location.href));
	}
	_closeBrowserHistoryLayer(e, t) {
		if (this.browserHistory && !this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === e) {
			window.history.back();
			return;
		}
		t();
	}
	_pickerEntities() {
		return this.hass ? this._customEntityIds.filter((e) => typeof e == "string" && e !== "").filter((e, t, n) => n.indexOf(e) === t).map((e) => this.hass?.states[e]).filter((e) => e !== void 0) : [];
	}
	_onEntitySelected(e) {
		this._selectingEntityForAttributeMenu = !0, new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._entitySearch = "", this._path = [], this._attributeSearch = "", this._entityPickerOpen = !1, this._attributeMenuOpen = !0, this._browserHistoryEntry()?.layer === "entity-picker" ? this._replaceBrowserHistoryLayer("attribute-picker") : this._pushBrowserHistoryLayer("attribute-picker"), queueMicrotask(() => {
			this._selectingEntityForAttributeMenu = !1;
		});
	}
	_closeAttributeMenu() {
		this._closeBrowserHistoryLayer("attribute-picker", () => this._closePickerOverlay());
	}
	_closePickerOverlay() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1, this._entitySearch = "", this._attributeSearch = "", this._sourceSettingsSourceId = void 0, this._selectedSources.length > 0 && (this._confirm(), this._selectedSources = []);
	}
	_addSource(e) {
		this._selectedSources.some((t) => t.id === e.id) || (this._selectedSources = [...this._selectedSources, e]);
	}
	_removeSource(e) {
		this._selectedSources = this._selectedSources.filter((t) => t.id !== e), this._sourceSettingsSourceId === e && (this._sourceSettingsSourceId = void 0);
	}
	_sourceSettingsSource() {
		return this._selectedSources.find((e) => e.id === this._sourceSettingsSourceId);
	}
	_openSourceSettings(e) {
		e.kind !== "entity_attribute" && e.kind !== "entity_state" || (this._sourceSettingsSourceId = e.id);
	}
	_updateSourceSettings(e) {
		let t = this._sourceSettingsSourceId;
		t && (this._selectedSources = this._selectedSources.map((n) => n.id === t ? {
			...n,
			...e
		} : n));
	}
	_confirm() {
		this.dispatchEvent(new CustomEvent("sources-confirmed", {
			detail: { sources: [...this._selectedSources] },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return this._componentsReady ? w`
      ${Si({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			entitySearch: this._entitySearch,
			path: this._path,
			selectedSources: this._selectedSources,
			draggingSourceId: void 0,
			resolved: void 0,
			loading: !1,
			attributeSearch: this._attributeSearch,
			getItems: this._getItems,
			getAdditionalItems: this._getAdditionalItems,
			onEntityPickerOpened: () => {
				this._entityPickerOpen && !this._attributeMenuOpen || (this._entityPickerOpen = !0, this._attributeMenuOpen = !1, this._pushBrowserHistoryLayer("entity-picker"));
			},
			onEntityPickerClosed: () => {
				if (this._selectingEntityForAttributeMenu) {
					this._entityPickerOpen = !1;
					return;
				}
				this._closeBrowserHistoryLayer("entity-picker", () => {
					this._entityPickerOpen = !1;
				});
			},
			onEntitySelected: (e) => this._onEntitySelected(e),
			onEntitySearchChanged: (e) => {
				this._entitySearch = e;
			},
			onAttributeSearchChanged: (e) => {
				this._attributeSearch = e;
			},
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
			onSourceDragStart: () => {},
			onSourceDragOver: () => {},
			onSourceDragEnd: () => {},
			onSourceDrop: () => {},
			sourceSettingsSourceId: this._sourceSettingsSourceId,
			sourceSettingsUnit: this._sourceSettingsSource()?.unit,
			sourceSettingsGroup: xa(this._sourceSettingsSource()),
			onSourceSettingsOpen: (e) => this._openSourceSettings(e),
			onSourceSettingsClose: () => {
				this._sourceSettingsSourceId = void 0;
			},
			onSourceSettingsUnitChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({ unit: t || void 0 });
			},
			onSourceSettingsGroupChanged: (e) => {
				let t = e.trim();
				this._updateSourceSettings({
					group: t || void 0,
					scaleGroup: void 0
				});
			},
			onBreadcrumbClick: (e) => {
				this._path = e;
			},
			onCloseMenu: () => this._closeAttributeMenu(),
			hideEmptyPickerState: this._pickerEntities().length === 0
		})}
    ` : w``;
	}
};
L([O({ attribute: !1 })], z.prototype, "hass", void 0), L([O({ attribute: !1 })], z.prototype, "initialSources", void 0), L([O({
	type: Boolean,
	attribute: "browser-history"
})], z.prototype, "browserHistory", void 0), L([k()], z.prototype, "_selectedSources", void 0), L([k()], z.prototype, "_attributeMenuOpen", void 0), L([k()], z.prototype, "_entityPickerOpen", void 0), L([k()], z.prototype, "_selectedEntityId", void 0), L([k()], z.prototype, "_entitySearch", void 0), L([k()], z.prototype, "_path", void 0), L([k()], z.prototype, "_attributeSearch", void 0), L([k()], z.prototype, "_componentsReady", void 0), L([k()], z.prototype, "_customEntityIds", void 0), L([k()], z.prototype, "_sourceSettingsSourceId", void 0), customElements.get("abh-series-picker") || customElements.define("abh-series-picker", z);
function Sa(e = "ha-better-history") {
	customElements.get(e) || customElements.define(e, R);
}
//#endregion
//#region src/const.ts
var Ca = "Equinox", wa = "custom:equinox-card", Ta = "equinox-card", Ea = "equinox-better-history", Da = "equinox-card-editor", Oa = "flat", ka = "classic", Aa = "setpoint", ja = "auto", Ma = [
	"heat",
	"cool",
	"heat_cool",
	"auto",
	"dry",
	"fan_only",
	"off"
], B = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:sun-snowflake-variant",
	auto: "mdi:thermostat-auto",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Na = {
	heat: "heat",
	cool: "cool",
	heat_cool: "heat-cool",
	auto: "auto",
	dry: "cool",
	fan_only: "auto",
	off: "off"
}, Pa = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], V = {
	frost: "mdi:snowflake",
	eco: "mdi:tree-outline",
	away: "mdi:home-export-outline",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:sleep",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Fa = [
	"off",
	"on",
	"vertical",
	"horizontal",
	"both"
], Ia = {
	off: "mdi:arrow-oscillating-off",
	Off: "mdi:arrow-oscillating-off",
	SWING_OFF: "mdi:arrow-oscillating-off",
	on: "mdi:arrow-oscillating",
	On: "mdi:arrow-oscillating",
	SWING_ON: "mdi:arrow-oscillating",
	vertical: "mdi:arrow-up-down",
	Vertical: "mdi:arrow-up-down",
	SWING_VERTICAL: "mdi:arrow-up-down",
	horizontal: "mdi:arrow-left-right",
	Horizontal: "mdi:arrow-left-right",
	SWING_HORIZONTAL: "mdi:arrow-left-right",
	both: "mdi:arrow-all",
	Both: "mdi:arrow-all",
	SWING_BOTH: "mdi:arrow-all"
}, La = {
	off: "mdi:arrow-oscillating-off",
	Off: "mdi:arrow-oscillating-off",
	on: "mdi:arrow-expand-horizontal",
	On: "mdi:arrow-expand-horizontal"
}, Ra = [
	"ha-form",
	"ha-icon",
	"ha-entity-picker",
	"ha-dialog",
	"ha-control-circular-slider",
	"ha-control-button",
	"ha-icon-button",
	"ha-color-picker",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip"
], za;
function Ba() {
	return za ??= Ue(Ra), za;
}
//#endregion
//#region src/localize/loader.ts
var Va = [
	"bg",
	"ca",
	"cs",
	"da",
	"de",
	"el",
	"en",
	"es",
	"fi",
	"fr",
	"hu",
	"it",
	"nl",
	"no",
	"pl",
	"pt",
	"ru",
	"sk",
	"zh"
], Ha = /* @__PURE__ */ new Map(), Ua = /* @__PURE__ */ new Map(), Wa = new Set(Va);
function Ga(e) {
	return e.toLowerCase().split("-")[0] || "en";
}
var Ka = import.meta.url, qa = new URL("translations/", Ka).toString();
function Ja(e) {
	return qa + e + ".json";
}
function Ya(e) {
	return Ha.get(Ga(e));
}
function Xa(e) {
	let t = Ga(e);
	if (!Wa.has(t) || Ha.has(t)) return Promise.resolve();
	let n = Ua.get(t);
	if (n) return n;
	let r = fetch(Ja(t)).then((e) => {
		if (!e.ok) throw Error(`HTTP ${e.status}`);
		return e.json();
	}).then((e) => {
		typeof e == "object" && e && !Array.isArray(e) && Ha.set(t, e);
	}).catch((e) => {
		console.warn(`[equinox] Failed to load translations for "${t}":`, e);
	});
	return Ua.set(t, r), r;
}
//#endregion
//#region src/localize/localize.ts
function Za(e) {
	return (e ?? "en").toLowerCase().split("-")[0] || "en";
}
function Qa(e, t) {
	let n = t.split("."), r = e;
	for (let e = 0; e < n.length; e++) {
		if (typeof r != "object" || !r) return;
		let t = n[e], i = e === n.length - 1;
		if (t in r) r = r[t];
		else if (t.toLowerCase() in r) r = r[t.toLowerCase()];
		else if (i) {
			let e = t.replace(/^(fan_|swing_)/i, "").toLowerCase();
			r = e in r ? r[e] : void 0;
		} else return;
	}
	return typeof r == "string" ? r : void 0;
}
function $a(e, t) {
	return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, String(n)), e);
}
function H(e, t, n = {}) {
	let r = Ya(Za(e)), i = Ya("en");
	return $a((r == null ? void 0 : Qa(r, t)) ?? (i == null ? void 0 : Qa(i, t)) ?? t, n);
}
//#endregion
//#region src/types/config.ts
var eo = ["flat", "liquid_glow"], to = ["classic", "compact"], no = ["setpoint", "sensors"], ro = [
	"auto",
	"custom",
	"disabled"
], io = ["horizontal", "vertical"], ao = {
	theme: Oa,
	display_mode: ka,
	primary_display: Aa,
	disable_name: !1,
	hide_lock_button: !1,
	additional_dashboards: ja,
	state_icons_layout: "horizontal",
	border_glow_on_action: !0
};
//#endregion
//#region src/equinox-card-editor.ts
Ba();
function oo(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function so(e) {
	let t = { ...e };
	return delete t.card_height, (!Array.isArray(t.hidden_hvac_modes) || t.hidden_hvac_modes.length === 0) && delete t.hidden_hvac_modes, (!Array.isArray(t.hidden_preset_modes) || t.hidden_preset_modes.length === 0) && delete t.hidden_preset_modes, t;
}
var co = class extends D {
	constructor(...e) {
		super(...e), this._config = {}, this._activeTab = "general";
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			_config: { state: !0 },
			_activeTab: { state: !0 }
		};
	}
	static {
		this.styles = o`
    .tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--divider-color);
      flex-wrap: wrap;
    }

    .tab {
      border: 0;
      border-bottom: 2px solid transparent;
      background: transparent;
      color: var(--secondary-text-color);
      padding: 8px 12px;
      font: inherit;
      cursor: pointer;
    }

    .tab[active] {
      border-bottom-color: var(--primary-color);
      color: var(--primary-text-color);
    }

    .options-panel {
      display: grid;
      gap: 12px;
    }

    .options-help,
    .options-empty {
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1.4;
    }

    .checkbox-list {
      display: grid;
      gap: 8px;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: var(--card-background-color);
      cursor: pointer;
    }

    .checkbox-item:hover {
      border-color: var(--primary-color);
    }

    .checkbox-item input {
      margin: 0;
      accent-color: var(--primary-color);
    }

    .checkbox-label {
      color: var(--primary-text-color);
      font: inherit;
    }

    .color-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      margin-top: 12px;
      margin-bottom: 16px;
    }

    .color-picker {
      max-width: 260px;
      width: 100%;
    }
  `;
	}
	setConfig(e) {
		this._config = so(e);
	}
	render() {
		let e = this.hass?.locale?.language ?? this.hass?.language, t = {
			...ao,
			...this._config
		};
		return w`
      <div class="tabs">
        <button class="tab" ?active=${this._activeTab === "general"} @click=${() => {
			this._activeTab = "general";
		}}>
          ${H(e, "editor.tabs.general")}
        </button>
        <button class="tab" ?active=${this._activeTab === "presentation"} @click=${() => {
			this._activeTab = "presentation";
		}}>
          ${H(e, "editor.tabs.presentation")}
        </button>
        <button class="tab" ?active=${this._activeTab === "hvac"} @click=${() => {
			this._activeTab = "hvac";
		}}>
          ${H(e, "editor.tabs.hvac")}
        </button>
        <button class="tab" ?active=${this._activeTab === "preset"} @click=${() => {
			this._activeTab = "preset";
		}}>
          ${H(e, "editor.tabs.preset")}
        </button>
      </div>
      ${this._activeTab === "presentation" ? this._renderPresentationTab(e, t) : this._activeTab === "general" ? w`
            <ha-form
              .hass=${this.hass}
              .data=${t}
              .schema=${this._generalSchema(e)}
              .computeLabel=${this._computeLabel(e)}
              @value-changed=${this._valueChanged}
            ></ha-form>
          ` : this._renderVisibilityTab(e, this._activeTab)}
    `;
	}
	_renderPresentationTab(e, t) {
		let n = this._presentationSchema(e), r = n.findIndex((e) => e.name === "card_background_color"), i = r >= 0 ? n.slice(0, r) : n, a = n.filter((e) => e.name === "card_background_color"), o = r >= 0 ? n.slice(r + 1) : [];
		return w`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${i}
        .computeLabel=${this._computeLabel(e)}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="color-grid">
        ${a.map((t) => this._renderColorField(e, t))}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${o}
        .computeLabel=${this._computeLabel(e)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
	}
	_renderVisibilityTab(e, t) {
		let n = t === "hvac" ? this._supportedHvacModes() : this._supportedPresetModes(), r = new Set(t === "hvac" ? this._config.hidden_hvac_modes ?? [] : this._config.hidden_preset_modes ?? []), i = t === "hvac" ? "editor.visibility.no_hvac_modes" : "editor.visibility.no_presets";
		return w`
      <div class="options-panel">
        <div class="options-help">${H(e, "editor.visibility.help")}</div>
        ${n.length === 0 ? w`<div class="options-empty">${H(e, this._config.entity ? i : "editor.visibility.no_entity")}</div>` : w`
              <div class="checkbox-list">
                ${n.map((n) => w`
                    <label class="checkbox-item">
                      <input
                        type="checkbox"
                        .checked=${!r.has(n)}
                        @change=${(e) => this._toggleVisibility(t, n, e.currentTarget.checked)}
                      />
                      <span class="checkbox-label">${t === "hvac" ? this._hvacLabel(e, n) : this._presetLabel(e, n)}</span>
                    </label>
                  `)}
              </div>
            `}
      </div>
    `;
	}
	_generalSchema(e) {
		return [
			{
				name: "entity",
				selector: { entity: { domain: ["climate"] } }
			},
			{
				name: "name",
				selector: { text: {} }
			},
			{
				name: "diagnostic_entity",
				selector: { entity: { domain: ["sensor"] } }
			},
			{
				name: "power_entity",
				selector: { entity: { domain: ["sensor", "input_number"] } }
			},
			{
				name: "humidity_entity",
				selector: { entity: { domain: ["sensor"] } }
			},
			{
				name: "temperature_entity",
				selector: { entity: { domain: ["sensor"] } }
			},
			{
				name: "additional_dashboards",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "auto",
							label: H(e, "editor.options.additional_dashboards.auto")
						},
						{
							value: "custom",
							label: H(e, "editor.options.additional_dashboards.custom")
						},
						{
							value: "disabled",
							label: H(e, "editor.options.additional_dashboards.disabled")
						}
					]
				} }
			}
		];
	}
	_presentationSchema(e) {
		let t = [{
			value: "horizontal",
			label: H(e, "editor.options.layout_orientation.horizontal")
		}, {
			value: "vertical",
			label: H(e, "editor.options.layout_orientation.vertical")
		}], n = [
			{
				name: "disable_name",
				selector: { boolean: {} }
			},
			{
				name: "theme",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "flat",
						label: H(e, "editor.options.theme.flat")
					}, {
						value: "liquid_glow",
						label: H(e, "editor.options.theme.liquid_glow")
					}]
				} }
			},
			{
				name: "display_mode",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "classic",
						label: H(e, "editor.options.display_mode.classic")
					}, {
						value: "compact",
						label: H(e, "editor.options.display_mode.compact")
					}]
				} }
			},
			{
				name: "primary_display",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "setpoint",
						label: H(e, "editor.options.primary_display.setpoint")
					}, {
						value: "sensors",
						label: H(e, "editor.options.primary_display.sensors")
					}]
				} }
			},
			{
				name: "state_icons_layout",
				selector: { select: {
					mode: "dropdown",
					options: t
				} }
			},
			{
				name: "card_background_color",
				selector: { color_rgb: {} }
			},
			{
				name: "card_background_opacity",
				selector: { number: {
					min: 0,
					max: 100,
					mode: "slider",
					unit_of_measurement: "%"
				} }
			},
			{
				name: "hide_lock_button",
				selector: { boolean: {} }
			}
		];
		return this._config.theme === "liquid_glow" && n.push({
			name: "border_glow_on_action",
			selector: { boolean: {} }
		}), n;
	}
	_renderColorField(e, t) {
		return w`
      <ha-color-picker
        class="color-picker"
        .label=${this._computeLabel(e)(t)}
        .value=${this._colorValue(t.name)}
        @value-changed=${(e) => this._colorChanged(t.name, e)}
      ></ha-color-picker>
    `;
	}
	_colorValue(e) {
		let t = this._config[e];
		return oo(t);
	}
	_colorChanged(e, t) {
		let n = { ...this._config }, r = oo(t.detail.value);
		r === void 0 || r === "" ? delete n[e] : n[e] = r, this._config = so(n), this._emitConfigChanged();
	}
	_climateEntity() {
		let e = this._config.entity;
		return e ? this.hass?.states[e] : void 0;
	}
	_attributeModes(e) {
		let t = this._climateEntity()?.attributes[e];
		return Array.isArray(t) ? t.filter((e) => typeof e == "string") : [];
	}
	_supportedHvacModes() {
		let e = new Set(this._attributeModes("hvac_modes"));
		return Ma.filter((t) => e.has(t) && B[t]);
	}
	_supportedPresetModes() {
		let e = new Set(this._attributeModes("preset_modes"));
		return Pa.filter((t) => e.has(t) && t !== "none" && V[t]);
	}
	_hvacLabel(e, t) {
		let n = H(e, `main.hvac.${t}`);
		return n === `main.hvac.${t}` ? t : n;
	}
	_presetLabel(e, t) {
		let n = H(e, `main.preset.${t}`);
		return n === `main.preset.${t}` ? t : n;
	}
	_computeLabel(e) {
		return (t) => H(e, `editor.${t.name}`);
	}
	_emitConfigChanged() {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
	_toggleVisibility(e, t, n) {
		let r = e === "hvac" ? "hidden_hvac_modes" : "hidden_preset_modes", i = new Set(this._config[r] ?? []);
		n ? i.delete(t) : i.add(t), this._config = so({
			...this._config,
			[r]: i.size > 0 ? [...i] : void 0
		}), this._emitConfigChanged();
	}
	_valueChanged(e) {
		this._config = so({
			...this._config,
			...e.detail.value
		}), this._emitConfigChanged();
	}
};
customElements.get("equinox-card-editor") || customElements.define(Da, co);
//#endregion
//#region src/data/actions.ts
var lo = {
	auto_fan_none: "None",
	auto_fan_low: "Low",
	auto_fan_medium: "Medium",
	auto_fan_high: "High",
	auto_fan_turbo: "Turbo"
};
function U(e) {
	return e.viewModel?.vt?.lock.isUserLocked === !0;
}
function W() {
	return {
		ok: !1,
		error: "locked"
	};
}
function G() {
	return {
		ok: !1,
		error: "unsupported"
	};
}
function uo() {
	return {
		ok: !1,
		error: "invalid_payload"
	};
}
async function K(e, t, n, r) {
	try {
		return await e.hass.callService(t, n, r), { ok: !0 };
	} catch (e) {
		return {
			ok: !1,
			error: "service_error",
			cause: e
		};
	}
}
function fo(e) {
	return typeof e == "number" && Number.isFinite(e);
}
async function po(e, t) {
	return U(e) ? W() : fo(t.targetTempLow) && fo(t.targetTempHigh) ? K(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		target_temp_low: t.targetTempLow,
		target_temp_high: t.targetTempHigh
	}) : fo(t.temperature) ? K(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		temperature: t.temperature
	}) : uo();
}
async function mo(e, t) {
	return U(e) ? W() : e.viewModel?.climate.hvacModes.includes(t) ? K(e, "climate", "set_hvac_mode", {
		entity_id: e.entityId,
		hvac_mode: t
	}) : G();
}
async function ho(e, t) {
	return U(e) ? W() : e.viewModel?.climate.presetModes.includes(t) ? K(e, "climate", "set_preset_mode", {
		entity_id: e.entityId,
		preset_mode: t
	}) : G();
}
async function go(e, t) {
	return U(e) ? W() : e.viewModel?.climate.fanModes.includes(t) ? K(e, "climate", "set_fan_mode", {
		entity_id: e.entityId,
		fan_mode: t
	}) : G();
}
async function _o(e, t) {
	return U(e) ? W() : e.viewModel?.climate.swingModes.includes(t) ? K(e, "climate", "set_swing_mode", {
		entity_id: e.entityId,
		swing_mode: t
	}) : G();
}
async function vo(e, t) {
	return U(e) ? W() : e.viewModel?.climate.swingHorizontalModes.includes(t) ? K(e, "climate", "set_swing_horizontal_mode", {
		entity_id: e.entityId,
		swing_horizontal_mode: t
	}) : G();
}
async function yo(e, t, n) {
	return U(e) ? W() : !e.viewModel?.vt?.isVt || !e.viewModel.vt.timedPresetManager ? G() : !Number.isInteger(n) || n < 1 || n > 1440 || t.trim() === "" ? uo() : K(e, "versatile_thermostat", "set_timed_preset", {
		entity_id: e.entityId,
		preset: t,
		duration_minutes: n
	});
}
async function bo(e) {
	return U(e) ? W() : e.viewModel?.vt?.timedPreset.isActive ? K(e, "versatile_thermostat", "cancel_timed_preset", { entity_id: e.entityId }) : G();
}
async function xo(e, t) {
	if (U(e)) return W();
	if (!e.viewModel?.vt?.fan.hasAutoFan) return G();
	let n = lo[t];
	return n ? K(e, "versatile_thermostat", "set_auto_fan_mode", {
		entity_id: e.entityId,
		auto_fan_mode: n
	}) : uo();
}
async function So(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return G();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), K(e, "versatile_thermostat", "lock", n);
}
async function Co(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return G();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), K(e, "versatile_thermostat", "unlock", n);
}
//#endregion
//#region src/data/fan.ts
var wo = {
	on: "mdi:fan",
	On: "mdi:fan",
	FAN_ON: "mdi:fan",
	auto: "mdi:fan-auto",
	Auto: "mdi:fan-auto",
	FAN_AUTO: "mdi:fan-auto",
	off: "mdi:fan-off",
	Off: "mdi:fan-off",
	FAN_OFF: "mdi:fan-off",
	auto_fan_none: "mdi:fan-off",
	None: "mdi:fan-off",
	low: "mdi:fan-speed-1",
	auto_fan_low: "mdi:fan-speed-1",
	Low: "mdi:fan-speed-1",
	FAN_LOW: "mdi:fan-speed-1",
	medium: "mdi:fan-speed-2",
	auto_fan_medium: "mdi:fan-speed-2",
	Medium: "mdi:fan-speed-2",
	FAN_MEDIUM: "mdi:fan-speed-2",
	middle: "mdi:fan-speed-2",
	Middle: "mdi:fan-speed-2",
	FAN_MIDDLE: "mdi:fan-speed-2",
	high: "mdi:fan-speed-3",
	auto_fan_high: "mdi:fan-speed-3",
	High: "mdi:fan-speed-3",
	FAN_HIGH: "mdi:fan-speed-3",
	top: "mdi:fan-speed-3",
	Top: "mdi:fan-speed-3",
	FAN_TOP: "mdi:fan-speed-3",
	focus: "mdi:fan-chevron-up",
	Focus: "mdi:fan-chevron-up",
	FAN_FOCUS: "mdi:fan-chevron-up",
	diffuse: "mdi:fan-chevron-down",
	Diffuse: "mdi:fan-chevron-down",
	FAN_DIFFUSE: "mdi:fan-chevron-down",
	auto_fan_turbo: "mdi:fan-speed-2",
	Turbo: "mdi:fan-speed-2"
}, To = [
	"auto_fan_none",
	"auto_fan_low",
	"auto_fan_medium",
	"auto_fan_high",
	"auto_fan_turbo"
], Eo = o`
  :host {
    display: block;
    color: var(--equinox-text-color);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, inherit));
  }

  button {
    font: inherit;
  }

  ha-icon {
    display: inline-flex;
    width: 22px;
    height: 22px;
  }
`, Do = o`
  :host {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--equinox-flat-panel-bg, var(--secondary-background-color));
    --equinox-control-bg: var(--equinox-flat-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--primary-color);
    --equinox-border-color: var(--equinox-flat-border-color, var(--divider-color));
    --equinox-text-color: var(--primary-text-color, #f4f0ec);
    --equinox-muted-color: var(--secondary-text-color, #aeb7c2);
    --equinox-heat-color: var(--state-climate-heat-color, #ff8a1c);
    --equinox-cool-color: var(--state-climate-cool-color, #4da1ff);
    --equinox-heat-cool-color: var(--equinox-flat-heat-cool-color, #9b5cff);
    --equinox-cool-boost-color: var(--equinox-flat-cool-boost-color, #7cc7ff);
    --equinox-auto-color: var(--success-color, #55bf6a);
    --equinox-boost-color: var(--accent-color, #b06cff);
    --equinox-danger-color: var(--error-color, #ff5d5d);
    --equinox-warning-color: var(--warning-color, #ffa726);
    --equinox-info-color: var(--info-color, #64b5f6);
    --equinox-radius: 8px;
    --equinox-control-radius: 8px;
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
  }

  :host([light]) {
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }
`, Oo = o`
  :host([theme="liquid_glow"]) {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--secondary-background-color);
    --equinox-control-bg: var(--equinox-liquid-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--equinox-liquid-control-active-bg, var(--primary-color));
    --equinox-border-color: var(--equinox-liquid-border-color, var(--divider-color));
    --equinox-text-color: var(--equinox-liquid-text-color, var(--primary-text-color));
    --equinox-muted-color: var(--equinox-liquid-muted-color, var(--secondary-text-color));
    --equinox-cool-boost-color: var(--equinox-liquid-cool-boost-color, #8fcfff);
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
    --equinox-liquid-glow-color: rgb(115 160 190 / 44%);
    --equinox-liquid-glow-soft: rgb(115 160 190 / 10%);
    --equinox-liquid-line-opacity-min: 0.76;
    --equinox-liquid-line-opacity-max: 1;
    --equinox-liquid-halo-opacity-min: 0.62;
    --equinox-liquid-halo-opacity-max: 1;
    --equinox-liquid-line-edge-stop: 5%;
    --equinox-liquid-line-soft-stop: 22%;
    --equinox-liquid-line-mid-stop: 38%;
    --equinox-liquid-line-edge-alpha: 32%;
    --equinox-liquid-line-mid-alpha: 60%;
    --equinox-liquid-line-peak-alpha: 88%;
    --equinox-liquid-halo-size: 10px 65%;
    --equinox-liquid-halo-alpha: 42%;
    --equinox-liquid-halo-fade-alpha: 14%;
    --equinox-liquid-line-filter-min: brightness(0.96) saturate(0.98);
    --equinox-liquid-line-filter-max: brightness(1.46) saturate(1.24) drop-shadow(0 0 5px var(--equinox-liquid-glow-color));
    --equinox-liquid-line-height-min: 72%;
    --equinox-liquid-line-height-max: 100%;
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 5%, transparent),
      var(--equinox-shadow);
  }

  :host([theme="liquid_glow"]) ha-card::before,
  :host([theme="liquid_glow"]) ha-card::after {
    content: "";
    position: absolute;
    pointer-events: none;
    border-radius: inherit;
  }

  @keyframes equinox-liquid-line-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-line-opacity-min);
      filter: var(--equinox-liquid-line-filter-min);
      background-size:
        1px var(--equinox-liquid-line-height-min),
        1px var(--equinox-liquid-line-height-min);
    }

    50% {
      opacity: var(--equinox-liquid-line-opacity-max);
      filter: var(--equinox-liquid-line-filter-max);
      background-size:
        1px var(--equinox-liquid-line-height-max),
        1px var(--equinox-liquid-line-height-max);
    }
  }

  @keyframes equinox-liquid-halo-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-halo-opacity-min);
      filter: brightness(0.94) saturate(0.96);
      transform: scaleY(0.72);
    }

    50% {
      opacity: var(--equinox-liquid-halo-opacity-max);
      filter: brightness(1.34) saturate(1.18);
      transform: scaleY(1);
    }
  }

  /* The pseudo-element covers the card's border-box exactly via inset: -1px (the
     containing block for absolutely-positioned children is the padding-box, so -1px
     pushes back through the 1px border zone to the outer edge). The 1px-offset
     keyword position then puts each line on the outermost 1px of the card box. */
  :host([theme="liquid_glow"]) ha-card::before {
    inset: -1px;
    z-index: 0;
    background:
      linear-gradient(
        180deg,
        transparent var(--equinox-liquid-line-edge-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) var(--equinox-liquid-line-soft-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) var(--equinox-liquid-line-mid-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-peak-alpha), transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) calc(100% - var(--equinox-liquid-line-mid-stop)),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) calc(100% - var(--equinox-liquid-line-soft-stop)),
        transparent calc(100% - var(--equinox-liquid-line-edge-stop))
      ) left 0 center / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        transparent var(--equinox-liquid-line-edge-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) var(--equinox-liquid-line-soft-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) var(--equinox-liquid-line-mid-stop),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-peak-alpha), transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-mid-alpha), transparent) calc(100% - var(--equinox-liquid-line-mid-stop)),
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-line-edge-alpha), transparent) calc(100% - var(--equinox-liquid-line-soft-stop)),
        transparent calc(100% - var(--equinox-liquid-line-edge-stop))
      ) right 0 center / 1px 100% no-repeat;
    box-shadow: none;
    opacity: var(--equinox-liquid-line-opacity-min);
    filter: var(--equinox-liquid-line-filter-min);
  }

  /* Halo extends 4px beyond each side of the card; gradient origin sits exactly on
     the outer edge of the card so the halo bleeds equally outside and inside. */
  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px -5px;
    border-radius: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse var(--equinox-liquid-halo-size) at left 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-alpha), transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-fade-alpha), transparent) 55%,
        transparent 100%
      ),
      radial-gradient(ellipse var(--equinox-liquid-halo-size) at right 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-alpha), transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) var(--equinox-liquid-halo-fade-alpha), transparent) 55%,
        transparent 100%
    );
    opacity: var(--equinox-liquid-halo-opacity-min);
    filter: brightness(0.94) saturate(0.96);
    transform-origin: center;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before {
    --equinox-liquid-line-edge-stop: 0%;
    --equinox-liquid-line-soft-stop: 10%;
    --equinox-liquid-line-mid-stop: 26%;
    --equinox-liquid-line-edge-alpha: 22%;
    --equinox-liquid-line-mid-alpha: 72%;
    --equinox-liquid-line-peak-alpha: 100%;
    animation: equinox-liquid-line-pulse 5.5s ease-in-out infinite;
    will-change: background-size, opacity, filter;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
    --equinox-liquid-halo-size: 14px 86%;
    --equinox-liquid-halo-alpha: 54%;
    --equinox-liquid-halo-fade-alpha: 20%;
    animation: equinox-liquid-halo-pulse 5.5s ease-in-out infinite;
    will-change: transform, opacity, filter;
  }

  /* Light mode: tone down halo so the orange wash doesn't smudge the light background.
     Detected via hass.themes.darkMode reflected as a [light] attribute on :host. */
  :host([theme="liquid_glow"][light]) {
    --equinox-liquid-line-opacity-min: 0.88;
    --equinox-liquid-halo-opacity-min: 0.4;
    --equinox-liquid-halo-opacity-max: 0.88;
    --equinox-liquid-line-filter-min: brightness(1.02) saturate(1.08);
    --equinox-liquid-line-filter-max: brightness(1.72) saturate(1.42) drop-shadow(0 0 6px var(--equinox-liquid-glow-color));
    --equinox-liquid-line-height-min: 66%;
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }

  :host([theme="liquid_glow"][light]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"][light]) ha-card[active-action="cool"]::before {
    --equinox-liquid-line-soft-stop: 8%;
    --equinox-liquid-line-mid-stop: 22%;
    --equinox-liquid-line-edge-alpha: 40%;
    --equinox-liquid-line-mid-alpha: 86%;
    --equinox-liquid-line-peak-alpha: 100%;
  }

  :host([theme="liquid_glow"][light]) ha-card::after {
    --equinox-liquid-halo-size: 10px 72%;
    --equinox-liquid-halo-alpha: 34%;
    --equinox-liquid-halo-fade-alpha: 10%;
  }

  :host([theme="liquid_glow"][light]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"][light]) ha-card[active-action="cool"]::after {
    --equinox-liquid-halo-size: 12px 82%;
    --equinox-liquid-halo-alpha: 42%;
    --equinox-liquid-halo-fade-alpha: 14%;
  }

  :host([theme="liquid_glow"][light]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"][light]) .compact-selectors ha-control-button[active][subtle] {
    border-color: color-mix(in srgb, var(--equinox-liquid-active-tone) 72%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-mode-control-text) 6%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 16%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-mode-control-bg) 90%, var(--equinox-liquid-active-tone) 10%));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-mode-control-text) 10%, transparent),
      inset 0 -12px 20px color-mix(in srgb, var(--equinox-liquid-active-tone) 10%, transparent),
      0 0 9px color-mix(in srgb, var(--equinox-liquid-active-tone) 16%, transparent);
  }

  :host([theme="liquid_glow"][light]) ha-control-button[active][subtle] .btn-icon ha-icon {
    filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
    :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before,
    :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
    :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
      animation: none;
    }
  }

  :host([theme="liquid_glow"]) .card {
    position: relative;
    z-index: 1;
  }

  /* No glow when HVAC is off or the entity is unavailable. */
  :host([theme="liquid_glow"]) ha-card[tone="off"]::before,
  :host([theme="liquid_glow"]) ha-card[tone="off"]::after {
    display: none;
  }

  /* When glow_on_action_only is set, hide glow unless there is active heating/cooling. */
  :host([theme="liquid_glow"][border-glow-on-action]) ha-card:not([active-action])::before,
  :host([theme="liquid_glow"][border-glow-on-action]) ha-card:not([active-action])::after {
    display: none;
  }

  :host([theme="liquid_glow"]) ha-card[tone="heat"] {
    --equinox-liquid-glow-color: var(--equinox-heat-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-color) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="cool"] {
    --equinox-liquid-glow-color: var(--equinox-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-cool-color) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="boost"],
  :host([theme="liquid_glow"]) ha-card[tone="cool-boost"] {
    --equinox-liquid-glow-color: var(--equinox-boost-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-boost-color) 30%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="auto"] {
    --equinox-liquid-glow-color: var(--equinox-auto-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-auto-color) 22%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="heat-cool"] {
    --equinox-liquid-glow-color: var(--equinox-heat-cool-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-heat-cool-color) 24%, transparent);
  }

  :host([theme="liquid_glow"]) .segments,
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button {
    border-color: var(--equinox-mode-control-border-color);
    background: var(--equinox-mode-control-bg);
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button:not(:last-child) {
    border-inline-end-color: var(--equinox-mode-control-border-color);
  }

  :host([theme="liquid_glow"]) .step {
    --control-button-background-color: var(--equinox-control-bg);
    --control-button-icon-color: var(--equinox-text-color);
    box-shadow: none;
    filter: none;
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-mode-control-text);
    --control-button-background-color: var(--equinox-control-active-bg);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 58%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--equinox-mode-control-text) 18%, transparent),
      inset 0 -18px 28px color-mix(in srgb, var(--equinox-liquid-active-tone) 22%, transparent),
      0 0 16px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-color);
    --control-button-icon-color: var(--equinox-heat-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-cool-color);
    --control-button-icon-color: var(--equinox-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-cool-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-auto-color);
    --control-button-icon-color: var(--equinox-auto-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-auto-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat-cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-cool-color);
    --control-button-icon-color: var(--equinox-heat-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-boost-color);
    --control-button-icon-color: var(--equinox-boost-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-boost-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="off"][active][subtle] {
    --equinox-liquid-active-tone: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-background-color: var(--equinox-mode-control-bg);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--equinox-liquid-active-tone) 88%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-mode-control-text) 10%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 24%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-mode-control-bg) 86%, var(--equinox-liquid-active-tone) 14%));
    /* No inset 1px ring (avoids a "double frame" inside the border) and no outer
       0 0 0 1px ring (would render 1px past the segments outline now that the active
       button is extended to it via margin). The 1px border is enough; we keep the soft
       outer glow only. */
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-mode-control-text) 18%, transparent),
      inset 0 -16px 24px color-mix(in srgb, var(--equinox-liquid-active-tone) 18%, transparent),
      0 0 10px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  /* Allow the active segment button to extend over the .segments outer border line so
     its frame coincides with the segments' visible outline instead of sitting 1px inside it.
     Buttons have an explicit width:100%/height:100%, so a negative margin alone only
     shifts them — we must also grow width/height by the same amount to cover the border. */
  :host([theme="liquid_glow"]) .segments {
    overflow: visible;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle] {
    margin-block: -1px;
    height: calc(100% + 2px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:first-child {
    margin-inline-start: -1px;
    width: calc(100% + 1px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:last-child {
    margin-inline-end: -1px;
    width: calc(100% + 1px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:only-child {
    margin: -1px;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[tone="off"][active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[tone="off"][active][subtle] {
    border-color: var(--equinox-mode-control-border-color);
    background: var(--equinox-mode-control-bg);
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:first-child {
    --control-button-border-radius: var(--equinox-control-radius) 0 0 var(--equinox-control-radius);
    border-start-start-radius: var(--equinox-control-radius);
    border-end-start-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:last-child {
    --control-button-border-radius: 0 var(--equinox-control-radius) var(--equinox-control-radius) 0;
    border-start-end-radius: var(--equinox-control-radius);
    border-end-end-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle]:only-child {
    --control-button-border-radius: var(--equinox-control-radius);
    border-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    --control-button-border-radius: var(--equinox-control-radius);
    border-radius: var(--equinox-control-radius);
  }

  :host([theme="liquid_glow"]) .btn-icon {
    background: rgba(128, 128, 128, 0.10);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 8%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="heat"] {
    background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="cool"] {
    background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="auto"] {
    background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="heat-cool"] {
    background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="boost"] {
    background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="cool-boost"] {
    background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent);
  }

  :host([theme="liquid_glow"]) .btn-icon[tone="fan"] {
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    color: var(--primary-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] .btn-icon {
    background: transparent;
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] .btn-icon ha-icon {
    filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 11px currentColor);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-heat-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-cool-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-auto-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat-cool"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-heat-cool-color);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-boost-color);
  }
`, ko = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.title = "", this.showBack = !1, this.floating = !1, this.closeOnLeave = !1, this._handleKeyDown = (e) => {
			e.key === "Escape" && this.open && this._dispatchClose();
		}, this._handleResize = () => {
			this.open && this.floating && this._positionPopover();
		}, this._handleScroll = () => {
			this.open && this.floating && this._positionPopover();
		};
	}
	static {
		this.properties = {
			open: { type: Boolean },
			title: {},
			language: {},
			showBack: {
				type: Boolean,
				attribute: "show-back"
			},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    .scrim {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      z-index: 9000;
      border-radius: var(--equinox-radius, 12px);
    }

    .panel {
      position: absolute;
      inset: 0;
      z-index: 9001;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
      color: var(--primary-text-color);
      border-radius: var(--equinox-radius, 12px);
      overflow-y: auto;
    }

    @media (min-width: 601px) {
      .scrim.popover {
        position: fixed;
        inset: 0;
        background: transparent;
        border-radius: 0;
      }

      .panel.popover {
        position: fixed;
        inset: auto;
        width: max-content;
        max-width: min(calc(100vw - 24px), 520px);
        max-height: calc(100vh - 24px);
        overflow: auto;
        background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
        border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
        box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
        backdrop-filter: blur(14px);
      }

      .panel.popover .header {
        display: none;
      }

      .panel.popover .content {
        padding: 10px;
      }
    }

    @media (max-width: 600px) {
      .scrim {
        position: fixed;
        inset: 0;
        border-radius: 0;
      }

      .panel {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        inset-inline: 0;
        border-radius: 16px 16px 0 0;
        max-height: 80vh;
        overflow-y: auto;
      }
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 6px;
    }

    .header-title {
      flex: 1;
      font-weight: 600;
      font-size: 16px;
    }

    .back-btn,
    .close-btn {
      --ha-icon-button-size: 32px;
      --ha-icon-button-padding-inline: 4px;
      color: var(--primary-text-color);
      flex-shrink: 0;
    }

    .content {
      padding: 0 16px 16px;
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("keydown", this._handleKeyDown), window.addEventListener("resize", this._handleResize), window.addEventListener("scroll", this._handleScroll, !0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._clearCloseOnLeaveTimer(), document.removeEventListener("keydown", this._handleKeyDown), window.removeEventListener("resize", this._handleResize), window.removeEventListener("scroll", this._handleScroll, !0);
	}
	_clearCloseOnLeaveTimer() {
		this._closeOnLeaveTimer !== void 0 && (window.clearTimeout(this._closeOnLeaveTimer), this._closeOnLeaveTimer = void 0);
	}
	_scheduleCloseOnLeave() {
		this.closeOnLeave && (this._clearCloseOnLeaveTimer(), this._closeOnLeaveTimer = window.setTimeout(() => {
			this._closeOnLeaveTimer = void 0, this._dispatchClose();
		}, 500));
	}
	_dispatchClose() {
		this._clearCloseOnLeaveTimer(), this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	_dispatchBack() {
		this.dispatchEvent(new CustomEvent("eq-dialog-back", {
			bubbles: !0,
			composed: !0
		}));
	}
	updated() {
		this.open || this._clearCloseOnLeaveTimer(), this.open && this.floating && this.updateComplete.then(() => this._positionPopover());
	}
	_positionPopover() {
		let e = this.renderRoot.querySelector(".panel.popover");
		if (!e) return;
		if (window.innerWidth <= 600) {
			e.style.left = "", e.style.top = "", e.style.visibility = "";
			return;
		}
		if (!this.anchor) return;
		let t = e.getBoundingClientRect(), n = t.width, r = t.height, i = Math.max(12, window.innerWidth - n - 12);
		if (this.anchor.clientY !== void 0) {
			let t = Math.min(Math.max(this.anchor.clientX ?? 0, 12), i), n = Math.min(Math.max(this.anchor.clientY, 12), window.innerHeight - r - 12);
			e.style.left = `${t}px`, e.style.top = `${n}px`, e.style.visibility = "visible";
			return;
		}
		let a = this.anchor.element.getBoundingClientRect(), o = this.anchor.clientX === void 0 ? a.left + a.width / 2 - n / 2 : this.anchor.clientX - n / 2, s = a.bottom + 8, c = a.top - r - 8, l = s + r + 12 <= window.innerHeight, u = c >= 12, d;
		d = l ? s : u ? c : Math.max(12, window.innerHeight - r - 12), e.style.left = `${Math.min(Math.max(o, 12), i)}px`, e.style.top = `${Math.max(d, 12)}px`, e.style.visibility = "visible";
	}
	render() {
		if (!this.open) return E;
		let e = H(this.language, "dialog.close"), t = H(this.language, "dialog.back"), n = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "", r = ["panel", this.floating ? "popover" : ""].filter(Boolean).join(" ");
		return w`
      <div class=${this.floating ? "scrim popover" : "scrim"} @click=${this._dispatchClose}></div>
      <div
        class=${r}
        style=${n}
        @click=${(e) => e.stopPropagation()}
        @mouseenter=${() => this._clearCloseOnLeaveTimer()}
        @mouseleave=${this.closeOnLeave ? () => this._scheduleCloseOnLeave() : void 0}
      >
        <div class="header">
          ${this.showBack ? w`
                <ha-icon-button class="back-btn" .label=${t} @click=${this._dispatchBack}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </ha-icon-button>
              ` : E}
          <span class="header-title">${this.title}</span>
          <ha-icon-button class="close-btn" .label=${e} @click=${this._dispatchClose}>
            <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
	}
};
customElements.get("eq-dialog") || customElements.define("eq-dialog", ko);
//#endregion
//#region src/components/eq-fan-dialog.ts
var Ao = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    .fan-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .fan-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
    }

    .fan-option:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .fan-option:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .fan-option[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--primary-color) 22%);
    }

    .fan-option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fan-option[active] .fan-option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    /* Liquid Glow theme: same active treatment as the segments in liquid-glow.ts —
       active option's frame extends to the fan-grid outer border via negative margin
       + height/width grown by 2px, with gradient + glow.
       Color stays --primary-color so the visual identity matches flat mode. */
    :host([theme="liquid_glow"]) .fan-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .fan-option[active] {
      --equinox-fan-active-tone: var(--primary-color);
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-fan-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-fan-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-fan-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-fan-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-fan-active-tone) 28%, transparent);
      /* .fan-option base height is 45px and .fan-grid has no explicit height,
         so calc(100% + 2px) collapses to auto. Use explicit base + 2px extension. */
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active]:only-child {
      margin: -1px;
      width: calc(100% + 2px);
      border-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .fan-option[active] .fan-option-icon {
      background: transparent;
      color: var(--equinox-fan-active-tone);
    }

    :host([theme="liquid_glow"]) .fan-option[active] .fan-option-icon ha-icon {
      filter: drop-shadow(0 0 4px currentColor);
    }

    :host([theme="liquid_glow"][light]) .fan-option[active] {
      border-color: color-mix(in srgb, var(--equinox-fan-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-fan-active-tone) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--equinox-fan-active-tone) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-fan-active-tone) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--equinox-fan-active-tone) 16%, transparent);
    }

    :host([theme="liquid_glow"][light]) .fan-option[active] .fan-option-icon ha-icon {
      filter: drop-shadow(0 0 2px currentColor);
    }

    .fan-option-label {
      display: none;
    }

    .fan-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 12px;
    }

    ha-md-list-item[active] {
      color: var(--primary-color);
      --md-list-item-label-text-color: var(--primary-color);
    }

    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    ha-md-list-item[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    .fan-desktop {
      display: flex;
      flex-direction: column;
    }

    .fan-mobile {
      display: none;
    }

    @media (max-width: 600px) {
      .fan-desktop {
        display: none;
      }

      .fan-mobile {
        display: block;
      }
    }
  `;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? To : this.viewModel?.climate.fanModes ?? [];
	}
	_getActiveMode() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? this.viewModel.vt.fan.currentAutoFanMode : this.viewModel?.climate.fanMode;
	}
	_fanIcon(e) {
		return wo[e] ?? "mdi:fan-speed-2";
	}
	_fanLabel(e) {
		let t = H(this.language, `main.fan.${e}`);
		return t === `main.fan.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectMode(e) {
		if (!this.hass || !this.config) return;
		let t = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		this.viewModel?.vt?.fan.hasAutoFan === !0 ? await xo(t, e) : await go(t, e), this._dispatchClose();
	}
	render() {
		let e = this._getOptions(), t = this._getActiveMode(), n = H(this.language, "dialog.fan.title");
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <!-- Desktop: horizontal grid of icon buttons -->
        <div class="fan-desktop">
          <div class="fan-grid">
            ${e.map((e) => w`
                <button
                  class="fan-option"
                  ?active=${e === t}
                  @click=${() => this._selectMode(e)}
                  title=${this._fanLabel(e)}
                  aria-label=${this._fanLabel(e)}
                >
                  <span class="fan-option-icon">
                    <ha-icon .icon=${this._fanIcon(e)} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span class="fan-option-label">${this._fanLabel(e)}</span>
                </button>
              `)}
          </div>
        </div>

        <!-- Mobile: vertical list -->
        <div class="fan-mobile">
          <ha-md-list class="fan-list">
          ${e.map((e) => w`
              <ha-md-list-item
                type="button"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
              >
                <span class="option-icon" slot="start">
                  <ha-icon .icon=${this._fanIcon(e)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${this._fanLabel(e)}</span>
                ${e === t ? w`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : E}
              </ha-md-list-item>
            `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-fan-dialog") || customElements.define("eq-fan-dialog", Ao);
//#endregion
//#region src/components/eq-hvac-dialog.ts
var jo = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    .option-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
      text-align: center;
    }

    .option-row:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .option-row[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 74%, var(--equinox-text-color, #fff) 10%);
    }

    .option-row[active]:has(.option-icon[tone="heat"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-heat-color, #ff8a1c) 22%);
    }

    .option-row[active]:has(.option-icon[tone="cool"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-cool-color, #4da1ff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="auto"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-auto-color, #55bf6a) 22%);
    }

    .option-row[active]:has(.option-icon[tone="heat-cool"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-heat-cool-color, #9b5cff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="off"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--disabled-text-color, rgba(128, 128, 128, 0.5)) 22%);
    }

    .option-row[active] .option-icon {
      background: transparent;
    }

    :host([theme="liquid_glow"]) .option-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .option-icon {
      background: rgba(128, 128, 128, 0.10);
      box-shadow: inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="heat"] {
      background: color-mix(in srgb, var(--equinox-heat-color, #ff8a1c) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="cool"] {
      background: color-mix(in srgb, var(--equinox-cool-color, #4da1ff) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="auto"] {
      background: color-mix(in srgb, var(--equinox-auto-color, #55bf6a) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="heat-cool"] {
      background: color-mix(in srgb, var(--equinox-heat-cool-color, #9b5cff) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="off"] {
      background: rgba(128, 128, 128, 0.10);
    }

    :host([theme="liquid_glow"]) .option-row[active] {
      --equinox-option-active-tone: var(--equinox-text-color, var(--primary-text-color, #fff));
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-option-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-option-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-option-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-option-active-tone) 28%, transparent);
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="heat"]) {
      --equinox-option-active-tone: var(--equinox-heat-color, #ff8a1c);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="cool"]) {
      --equinox-option-active-tone: var(--equinox-cool-color, #4da1ff);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="auto"]) {
      --equinox-option-active-tone: var(--equinox-auto-color, #55bf6a);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="heat-cool"]) {
      --equinox-option-active-tone: var(--equinox-heat-cool-color, #9b5cff);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="off"]) {
      --equinox-option-active-tone: var(--disabled-text-color, rgba(128, 128, 128, 0.5));
      border-color: var(--equinox-border-color, rgba(128, 128, 128, 0.2));
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow: none;
    }

    :host([theme="liquid_glow"]) .option-row[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:only-child {
      margin: -1px;
      width: calc(100% + 2px);
      border-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active] .option-icon {
      background: transparent;
      box-shadow: none;
      color: var(--equinox-option-active-tone);
    }

    :host([theme="liquid_glow"]) .option-row[active] .option-icon ha-icon {
      filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 11px currentColor);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] {
      --equinox-option-active-tone: var(--equinox-text-color, var(--primary-text-color, #fff));
      --md-list-item-label-text-color: var(--equinox-option-active-tone);
      border: 1px solid color-mix(in srgb, var(--equinox-option-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent) 0%, transparent 42%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 20%, transparent) 0%, transparent 62%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 88%, var(--equinox-option-active-tone) 12%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 14%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-option-active-tone) 22%, transparent);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="heat"]) {
      --equinox-option-active-tone: var(--equinox-heat-color, #ff8a1c);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="cool"]) {
      --equinox-option-active-tone: var(--equinox-cool-color, #4da1ff);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="auto"]) {
      --equinox-option-active-tone: var(--equinox-auto-color, #55bf6a);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="heat-cool"]) {
      --equinox-option-active-tone: var(--equinox-heat-cool-color, #9b5cff);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="off"]) {
      --equinox-option-active-tone: var(--disabled-text-color, rgba(128, 128, 128, 0.5));
      border-color: var(--equinox-border-color, rgba(128, 128, 128, 0.2));
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow: none;
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon {
      background: transparent;
      box-shadow: none;
      color: var(--equinox-option-active-tone);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon ha-icon,
    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-check {
      color: var(--equinox-option-active-tone);
      filter: drop-shadow(0 0 5px currentColor);
    }

    :host([theme="liquid_glow"][light]) .option-row[active] {
      border-color: color-mix(in srgb, var(--equinox-option-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--equinox-option-active-tone) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-option-active-tone) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--equinox-option-active-tone) 16%, transparent);
    }

    :host([theme="liquid_glow"][light]) ha-md-list-item[active] {
      border-color: color-mix(in srgb, var(--equinox-option-active-tone) 58%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 5%, transparent) 0%, transparent 42%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 13%, transparent) 0%, transparent 62%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 92%, var(--equinox-option-active-tone) 8%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent),
        0 0 8px color-mix(in srgb, var(--equinox-option-active-tone) 14%, transparent);
    }

    :host([theme="liquid_glow"][light]) .option-row[active] .option-icon ha-icon {
      filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
    }

    :host([theme="liquid_glow"][light]) ha-md-list-item[active] .option-icon ha-icon,
    :host([theme="liquid_glow"][light]) ha-md-list-item[active] .option-check {
      filter: drop-shadow(0 0 3px currentColor);
    }

    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-icon[tone="heat"] {
      color: var(--equinox-heat-color, #ff8a1c);
      background: color-mix(in srgb, var(--equinox-heat-color, #ff8a1c) 15%, transparent);
    }

    .option-icon[tone="cool"] {
      color: var(--equinox-cool-color, #4da1ff);
      background: color-mix(in srgb, var(--equinox-cool-color, #4da1ff) 15%, transparent);
    }

    .option-icon[tone="auto"] {
      color: var(--equinox-auto-color, #55bf6a);
      background: color-mix(in srgb, var(--equinox-auto-color, #55bf6a) 15%, transparent);
    }

    .option-icon[tone="heat-cool"] {
      color: var(--equinox-heat-cool-color, #9b5cff);
      background: color-mix(in srgb, var(--equinox-heat-cool-color, #9b5cff) 15%, transparent);
    }

    .option-icon[tone="off"] {
      color: var(--disabled-text-color, #7e8792);
      background: rgba(128, 128, 128, 0.12);
    }

    .option-label {
      display: none;
    }

    .option-mobile {
      display: none;
    }

    .option-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 10px;
    }

    ha-md-list-item[active] {
      --md-list-item-label-text-color: var(--primary-color);
    }

    ha-md-list-item[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .option-desktop {
        display: none;
      }

      .option-mobile {
        display: block;
      }
    }
  `;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		let e = this.viewModel?.climate.hvacModes ?? [], t = new Set(this.config?.hidden_hvac_modes ?? []);
		return Ma.filter((n) => e.includes(n) && B[n] && !t.has(n));
	}
	_modeLabel(e) {
		let t = H(this.language, `main.hvac.${e}`);
		return t === `main.hvac.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectMode(e) {
		!this.hass || !this.config || (await mo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.hvacMode, n = H(this.language, "dialog.hvac.title");
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="option-grid option-desktop">
          ${e.map((e) => w`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
                title=${this._modeLabel(e)}
                aria-label=${this._modeLabel(e)}
              >
                <span class="option-icon" tone=${Na[e] ?? ""}>
                  <ha-icon .icon=${B[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._modeLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => w`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectMode(e)}>
                  <span class="option-icon" tone=${Na[e] ?? ""} slot="start">
                    <ha-icon .icon=${B[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._modeLabel(e)}</span>
                  ${e === t ? w`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : E}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-hvac-dialog") || customElements.define("eq-hvac-dialog", jo);
//#endregion
//#region src/components/eq-swing-dialog.ts
function Mo(e) {
	let t = [...new Set(e)], n = Fa.filter((e) => t.includes(e)), r = t.filter((e) => !Fa.includes(e));
	return [...n, ...r];
}
var No = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    .swing-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: min(320px, calc(100vw - 48px));
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .group-title {
      color: var(--secondary-text-color, var(--equinox-muted-color, #9aa0a6));
      font-size: 12px;
      font-weight: var(--ha-font-weight-medium, 500);
      line-height: 1;
      padding-inline: 2px;
    }

    .swing-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .swing-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
    }

    .swing-option:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .swing-option:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .swing-option[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--primary-color) 22%);
    }

    .swing-option-icon,
    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .swing-option-label {
      display: none;
    }

    .swing-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 12px;
    }

    ha-md-list-item[active] {
      color: var(--primary-color);
      --md-list-item-label-text-color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    .swing-desktop {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .swing-mobile {
      display: none;
    }

    :host([theme="liquid_glow"]) .swing-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .swing-option[active] {
      --equinox-swing-active-tone: var(--primary-color);
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-swing-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-swing-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-swing-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-swing-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-swing-active-tone) 28%, transparent);
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .swing-option[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .swing-option[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .swing-option[active] .swing-option-icon,
    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon {
      background: transparent;
      color: var(--primary-color);
    }

    :host([theme="liquid_glow"][light]) .swing-option[active] {
      border-color: color-mix(in srgb, var(--primary-color) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--primary-color) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--primary-color) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--primary-color) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--primary-color) 16%, transparent);
    }

    @media (max-width: 600px) {
      .swing-desktop {
        display: none;
      }

      .swing-mobile {
        display: block;
      }
    }
  `;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_verticalOptions() {
		return Mo(this.viewModel?.climate.swingModes ?? []);
	}
	_horizontalOptions() {
		return Mo(this.viewModel?.climate.swingHorizontalModes ?? []);
	}
	_swingIcon(e, t = !1) {
		return t ? La[e] ?? Ia[e] ?? "mdi:arrow-expand-horizontal" : Ia[e] ?? "mdi:arrow-oscillating";
	}
	_swingLabel(e) {
		let t = H(this.language, `main.swing.${e}`);
		return t === `main.swing.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectVerticalMode(e) {
		!this.hass || !this.config || (await _o({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	async _selectHorizontalMode(e) {
		!this.hass || !this.config || (await vo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	_renderDesktopGroup(e, t, n, r) {
		return e.length === 0 ? E : w`
      <div class="swing-grid">
        ${e.map((e) => w`
            <button
              class="swing-option"
              ?active=${e === t}
              @click=${() => r(e)}
              title=${this._swingLabel(e)}
              aria-label=${this._swingLabel(e)}
            >
              <span class="swing-option-icon">
                <ha-icon .icon=${this._swingIcon(e, n)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span class="swing-option-label">${this._swingLabel(e)}</span>
            </button>
          `)}
      </div>
    `;
	}
	_renderMobileGroup(e, t, n, r) {
		return e.length === 0 ? E : w`
      <ha-md-list class="swing-list">
        ${e.map((e) => w`
            <ha-md-list-item type="button" ?active=${e === t} @click=${() => r(e)}>
              <span class="option-icon" slot="start">
                <ha-icon .icon=${this._swingIcon(e, n)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span>${this._swingLabel(e)}</span>
              ${e === t ? w`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : E}
            </ha-md-list-item>
          `)}
      </ha-md-list>
    `;
	}
	render() {
		let e = this._verticalOptions(), t = this._horizontalOptions(), n = e.length > 0 && t.length > 0, r = H(this.language, "dialog.swing.title");
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${r}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="swing-content">
          <div class="swing-desktop">
            ${e.length > 0 ? w`
                  <div class="group">
                    ${n ? w`<span class="group-title">${H(this.language, "dialog.swing.vertical")}</span>` : E}
                    ${this._renderDesktopGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : E}
            ${t.length > 0 ? w`
                  <div class="group">
                    ${n ? w`<span class="group-title">${H(this.language, "dialog.swing.horizontal")}</span>` : E}
                    ${this._renderDesktopGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : E}
          </div>
          <div class="swing-mobile">
            ${e.length > 0 ? w`
                  <div class="group">
                    ${n ? w`<span class="group-title">${H(this.language, "dialog.swing.vertical")}</span>` : E}
                    ${this._renderMobileGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : E}
            ${t.length > 0 ? w`
                  <div class="group">
                    ${n ? w`<span class="group-title">${H(this.language, "dialog.swing.horizontal")}</span>` : E}
                    ${this._renderMobileGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : E}
          </div>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-swing-dialog") || customElements.define("eq-swing-dialog", No);
//#endregion
//#region src/components/eq-preset-dialog.ts
var Po = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    .option-grid {
      display: flex;
      overflow: hidden;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      height: 45px;
      border-radius: 0;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--primary-text-color, #fff);
      flex: 1;
      min-width: 56px;
      text-align: center;
    }

    .option-row:not(:last-child) {
      border-inline-end: 1px solid var(--equinox-border-color, rgba(128, 128, 128, 0.2));
    }

    .option-row:hover:not(:disabled) {
      background: rgba(128, 128, 128, 0.12);
    }

    .option-row[active] {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 74%, var(--equinox-text-color, #fff) 10%);
    }

    .option-row[active]:has(.option-icon[tone="heat"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-heat-color, #ff8a1c) 22%);
    }

    .option-row[active]:has(.option-icon[tone="cool"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-cool-color, #4da1ff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="auto"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-auto-color, #55bf6a) 22%);
    }

    .option-row[active]:has(.option-icon[tone="boost"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-boost-color, #b06cff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="cool-boost"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-cool-boost-color, #7cc7ff) 22%);
    }

    .option-row[active]:has(.option-icon[tone="off"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--disabled-text-color, rgba(128, 128, 128, 0.5)) 22%);
    }

    .option-row[active] .option-icon {
      background: transparent;
    }

    :host([theme="liquid_glow"]) .option-grid {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .option-icon {
      background: rgba(128, 128, 128, 0.10);
      box-shadow: inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="heat"] {
      background: color-mix(in srgb, var(--equinox-heat-color, #ff8a1c) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="cool"] {
      background: color-mix(in srgb, var(--equinox-cool-color, #4da1ff) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="auto"] {
      background: color-mix(in srgb, var(--equinox-auto-color, #55bf6a) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="boost"] {
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="cool-boost"] {
      background: color-mix(in srgb, var(--equinox-cool-boost-color, #7cc7ff) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-row[active] {
      --equinox-option-active-tone: var(--equinox-text-color, var(--primary-text-color, #fff));
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border: 1px solid color-mix(in srgb, var(--equinox-option-active-tone) 88%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 24%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 86%, var(--equinox-option-active-tone) 14%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 18%, transparent),
        inset 0 -16px 24px color-mix(in srgb, var(--equinox-option-active-tone) 18%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-option-active-tone) 28%, transparent);
      margin-block: -1px;
      height: calc(45px + 2px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="heat"]) {
      --equinox-option-active-tone: var(--equinox-heat-color, #ff8a1c);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="cool"]) {
      --equinox-option-active-tone: var(--equinox-cool-color, #4da1ff);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="auto"]) {
      --equinox-option-active-tone: var(--equinox-auto-color, #55bf6a);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="boost"]) {
      --equinox-option-active-tone: var(--equinox-boost-color, #b06cff);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="cool-boost"]) {
      --equinox-option-active-tone: var(--equinox-cool-boost-color, #7cc7ff);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="off"]) {
      --equinox-option-active-tone: var(--disabled-text-color, rgba(128, 128, 128, 0.5));
      border-color: var(--equinox-border-color, rgba(128, 128, 128, 0.2));
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow: none;
    }

    :host([theme="liquid_glow"]) .option-row[active]:first-child {
      margin-inline-start: -1px;
      width: calc(100% + 1px);
      border-start-start-radius: var(--equinox-control-radius, 8px);
      border-end-start-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:last-child {
      margin-inline-end: -1px;
      width: calc(100% + 1px);
      border-start-end-radius: var(--equinox-control-radius, 8px);
      border-end-end-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active]:only-child {
      margin: -1px;
      width: calc(100% + 2px);
      border-radius: var(--equinox-control-radius, 8px);
    }

    :host([theme="liquid_glow"]) .option-row[active] .option-icon {
      background: transparent;
      box-shadow: none;
      color: var(--equinox-option-active-tone);
    }

    :host([theme="liquid_glow"]) .option-row[active] .option-icon ha-icon {
      filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 11px currentColor);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] {
      --equinox-option-active-tone: var(--equinox-text-color, var(--primary-text-color, #fff));
      --md-list-item-label-text-color: var(--equinox-option-active-tone);
      border: 1px solid color-mix(in srgb, var(--equinox-option-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent) 0%, transparent 42%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 20%, transparent) 0%, transparent 62%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 88%, var(--equinox-option-active-tone) 12%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 14%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-option-active-tone) 22%, transparent);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="heat"]) {
      --equinox-option-active-tone: var(--equinox-heat-color, #ff8a1c);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="cool"]) {
      --equinox-option-active-tone: var(--equinox-cool-color, #4da1ff);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="auto"]) {
      --equinox-option-active-tone: var(--equinox-auto-color, #55bf6a);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="boost"]) {
      --equinox-option-active-tone: var(--equinox-boost-color, #b06cff);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="cool-boost"]) {
      --equinox-option-active-tone: var(--equinox-cool-boost-color, #7cc7ff);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="off"]) {
      --equinox-option-active-tone: var(--disabled-text-color, rgba(128, 128, 128, 0.5));
      border-color: var(--equinox-border-color, rgba(128, 128, 128, 0.2));
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow: none;
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon {
      background: transparent;
      box-shadow: none;
      color: var(--equinox-option-active-tone);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-icon ha-icon,
    :host([theme="liquid_glow"]) ha-md-list-item[active] .option-check {
      color: var(--equinox-option-active-tone);
      filter: drop-shadow(0 0 5px currentColor);
    }

    :host([theme="liquid_glow"][light]) .option-row[active] {
      border-color: color-mix(in srgb, var(--equinox-option-active-tone) 72%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 6%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 16%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 90%, var(--equinox-option-active-tone) 10%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-option-active-tone) 10%, transparent),
        0 0 9px color-mix(in srgb, var(--equinox-option-active-tone) 16%, transparent);
    }

    :host([theme="liquid_glow"][light]) ha-md-list-item[active] {
      border-color: color-mix(in srgb, var(--equinox-option-active-tone) 58%, transparent);
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 5%, transparent) 0%, transparent 42%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-option-active-tone) 13%, transparent) 0%, transparent 62%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 92%, var(--equinox-option-active-tone) 8%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent),
        0 0 8px color-mix(in srgb, var(--equinox-option-active-tone) 14%, transparent);
    }

    :host([theme="liquid_glow"][light]) .option-row[active] .option-icon ha-icon {
      filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 7px currentColor);
    }

    :host([theme="liquid_glow"][light]) ha-md-list-item[active] .option-icon ha-icon,
    :host([theme="liquid_glow"][light]) ha-md-list-item[active] .option-check {
      filter: drop-shadow(0 0 3px currentColor);
    }

    .option-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-icon[tone="heat"] {
      color: var(--equinox-heat-color, #ff8a1c);
      background: color-mix(in srgb, var(--equinox-heat-color, #ff8a1c) 15%, transparent);
    }

    .option-icon[tone="cool"] {
      color: var(--equinox-cool-color, #4da1ff);
      background: color-mix(in srgb, var(--equinox-cool-color, #4da1ff) 15%, transparent);
    }

    .option-icon[tone="auto"] {
      color: var(--equinox-auto-color, #55bf6a);
      background: color-mix(in srgb, var(--equinox-auto-color, #55bf6a) 15%, transparent);
    }

    .option-icon[tone="boost"] {
      color: var(--equinox-boost-color, #b06cff);
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 15%, transparent);
    }

    .option-icon[tone="cool-boost"] {
      color: var(--equinox-cool-boost-color, #7cc7ff);
      background: color-mix(in srgb, var(--equinox-cool-boost-color, #7cc7ff) 15%, transparent);
    }

    .option-label {
      display: none;
    }

    .option-mobile {
      display: none;
    }

    .option-list {
      padding: 0;
      background: transparent;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 10px;
    }

    ha-md-list-item[active] {
      --md-list-item-label-text-color: var(--primary-color);
    }

    ha-md-list-item[active] .option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .option-check {
      color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .option-desktop {
        display: none;
      }

      .option-mobile {
        display: block;
      }
    }
  `;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		let e = this.viewModel?.climate.presetModes ?? [], t = this.viewModel?.climate.hvacMode, n = new Set(this.config?.hidden_preset_modes ?? []);
		return Pa.filter((r) => e.includes(r) && V[r] && r !== "none" && !(r === "frost" && t !== "heat") && !n.has(r));
	}
	_presetLabel(e) {
		let t = H(this.language, `main.preset.${e}`);
		return t === `main.preset.${e}` ? e : t;
	}
	_presetTone(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" ? "cool" : e === "eco" ? "auto" : e === "away" || e === "sleep" ? "off" : e === "comfort" ? t === "cool" ? "cool" : "heat" : e === "home" ? "auto" : e === "boost" || e === "activity" ? t === "cool" ? "cool-boost" : "boost" : "";
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectPreset(e) {
		!this.hass || !this.config || (await ho({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.presetMode, n = H(this.language, "dialog.preset.title");
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="option-grid option-desktop">
          ${e.map((e) => w`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectPreset(e)}
                title=${this._presetLabel(e)}
                aria-label=${this._presetLabel(e)}
              >
                <span class="option-icon" tone=${this._presetTone(e)}>
                  <ha-icon .icon=${V[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._presetLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => w`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectPreset(e)}>
                  <span class="option-icon" tone=${this._presetTone(e)} slot="start">
                    <ha-icon .icon=${V[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._presetLabel(e)}</span>
                  ${e === t ? w`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : E}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-preset-dialog") || customElements.define("eq-preset-dialog", Po);
//#endregion
//#region src/components/eq-menu-dialog.ts
var Fo = !1, Io = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 }
		};
	}
	static {
		this.styles = o`
    .menu-list {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
    }

    ha-md-list-item {
      border-radius: var(--equinox-control-radius, 8px);
      color: var(--primary-text-color, #fff);
      --md-list-item-container-color: transparent;
      --md-list-item-label-text-size: 15px;
      --md-list-item-label-text-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-color: var(--primary-text-color, #fff);
      --md-list-item-hover-state-layer-opacity: 0.08;
      --ha-md-list-item-gap: 12px;
    }

    .option-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .option-icon[tone="boost"] {
      color: var(--equinox-boost-color, #b06cff);
      background: color-mix(in srgb, var(--equinox-boost-color, #b06cff) 16%, transparent);
    }

    .option-trailing {
      display: flex;
      align-items: center;
      color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    }

    .boost-time {
      color: var(--equinox-boost-color, #b06cff);
      font-size: 13px;
      font-weight: 500;
    }
  `;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	_dispatchAndClose(e) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0
		})), this._dispatchClose();
	}
	_dispatchOpen(e) {
		this.dispatchEvent(new CustomEvent(e, {
			bubbles: !0,
			composed: !0
		}));
	}
	_showRegulation() {
		return Fo;
	}
	_showBoost() {
		return this.viewModel?.vt?.timedPreset.isActive === !0 || !!this.viewModel?.vt?.timedPresetManager;
	}
	render() {
		let e = this._showRegulation(), t = this._showBoost(), n = this.viewModel?.vt?.timedPreset.isActive === !0, r = this.viewModel?.vt?.timedPreset.remainingTimeMin, i = H(this.language, "dialog.menu.title");
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${i}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <ha-md-list class="menu-list">
          ${e ? w`
                <ha-md-list-item type="button" @click=${() => this._dispatchAndClose("equinox-open-regulation")}>
                  <span class="option-icon" slot="start">
                    <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${H(this.language, "dialog.menu.regulation")}</span>
                  <span class="option-trailing" slot="end">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </ha-md-list-item>
              ` : E}

          ${t ? w`
                <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-boost")}>
                  <span class="option-icon" tone=${n ? "boost" : ""} slot="start">
                    <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${H(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing" slot="end">
                    ${n && typeof r == "number" ? w`<span class="boost-time">${r} min</span>` : w`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </ha-md-list-item>
              ` : E}

          <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon" slot="start">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${H(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing" slot="end">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </ha-md-list-item>
        </ha-md-list>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-menu-dialog") || customElements.define("eq-menu-dialog", Io);
//#endregion
//#region src/components/eq-boost-dialog.ts
var Lo = 60, Ro = [
	15,
	30,
	45,
	60,
	75,
	90,
	105,
	120,
	150,
	180,
	210,
	240,
	300,
	360,
	420,
	480,
	600,
	720,
	960,
	1200,
	1440
], zo = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1, this._durationMinutes = Lo;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
			closeOnLeave: { type: Boolean },
			anchor: { attribute: !1 },
			_durationMinutes: { state: !0 }
		};
	}
	static {
		this.styles = o`
    .boost-body {
      --boost-wheel-size: clamp(92px, min(34vw, 20vh), 136px);
      display: grid;
      grid-template-rows: minmax(34px, 40px);
      align-content: center;
      align-items: center;
      gap: clamp(8px, 1.6vh, 12px);
      justify-items: center;
      min-width: 210px;
      width: max-content;
      max-width: calc(100vw - 48px);
      overflow: visible;
    }

    .boost-body[has-wheel] {
      grid-template-rows: auto minmax(34px, 40px);
    }

    .boost-wheel-shell {
      box-sizing: border-box;
      width: var(--boost-wheel-size);
      height: var(--boost-wheel-size);
      max-width: 100%;
      display: grid;
      place-items: center;
      position: relative;
    }

    .boost-wheel {
      grid-area: 1 / 1;
      width: var(--boost-wheel-size);
      height: var(--boost-wheel-size);
      display: block;
      z-index: 0;
      --clear-background-color: var(--equinox-card-bg, var(--card-background-color, #111820));
      --control-circular-slider-color: var(--equinox-boost-color, var(--accent-color));
      --control-circular-slider-background: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 22%, var(--disabled-color, #5e6975));
      --control-circular-slider-background-opacity: 0.3;
      --control-circular-slider-margin-top: 0;
    }

    .boost-wheel[disabled] {
      opacity: 1;
    }

    .wheel-value {
      grid-area: 1 / 1;
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      line-height: 1;
      white-space: nowrap;
    }

    .wheel-number {
      color: var(--equinox-boost-color, var(--accent-color));
      font-size: clamp(22px, calc(var(--boost-wheel-size) * 0.23), 36px);
      font-weight: 700;
      letter-spacing: 0;
    }

    .wheel-unit {
      margin-top: clamp(4px, calc(var(--boost-wheel-size) * 0.04), 8px);
      color: var(--equinox-muted-color, var(--secondary-text-color, #9ba3ad));
      font-size: clamp(16px, calc(var(--boost-wheel-size) * 0.12), 25px);
      font-weight: 600;
    }

    .wheel-unit:empty {
      display: none;
    }

    .action-button {
      min-width: 132px;
      width: max-content;
      min-height: 34px;
      height: 100%;
      max-height: 40px;
      display: grid;
      grid-template-columns: 22px max-content 22px;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 10px;
      border: 1px solid color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 55%, transparent);
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      color: var(--equinox-text-color, var(--primary-text-color, #fff));
      cursor: pointer;
      font: inherit;
      font-size: clamp(13px, 1.9vh, 15px);
      font-weight: 600;
      line-height: 1.1;
      text-align: center;
    }

    .action-button ha-icon {
      color: var(--equinox-boost-color, var(--accent-color));
      --mdc-icon-size: 20px;
    }

    .action-label {
      white-space: nowrap;
    }

    .action-button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    .action-button:hover:not(:disabled),
    .action-button:focus-visible:not(:disabled) {
      background: color-mix(in srgb, var(--equinox-control-bg, rgba(128, 128, 128, 0.08)) 78%, var(--equinox-boost-color, var(--accent-color)) 22%);
    }

    @media (min-width: 601px) {
      .action-button {
        max-width: none;
      }
    }

    :host([theme="liquid_glow"]) .boost-body {
      overflow: visible;
    }

    :host([theme="liquid_glow"]) .action-button {
      border-color: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 72%, transparent);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 10%, transparent),
        0 0 7px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 14%, transparent);
    }

    :host([theme="liquid_glow"]) .action-button:hover:not(:disabled),
    :host([theme="liquid_glow"]) .action-button:focus-visible:not(:disabled) {
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 8%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 20%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 88%, var(--equinox-boost-color, var(--accent-color)) 12%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #fff)) 14%, transparent),
        inset 0 -12px 20px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 12%, transparent),
        0 0 10px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 22%, transparent);
    }

    :host([theme="liquid_glow"]) .action-button ha-icon {
      filter: drop-shadow(0 0 4px currentColor);
    }

    :host([theme="liquid_glow"][light]) .action-button {
      border-color: color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 52%, transparent);
      background: var(--equinox-control-bg, rgba(128, 128, 128, 0.08));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 7%, transparent),
        0 0 6px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 8%, transparent);
    }

    :host([theme="liquid_glow"][light]) .action-button:hover:not(:disabled),
    :host([theme="liquid_glow"][light]) .action-button:focus-visible:not(:disabled) {
      background:
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 5%, transparent) 0%, transparent 40%),
        linear-gradient(180deg, color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 12%, transparent) 0%, transparent 58%),
        linear-gradient(180deg, var(--equinox-control-bg, transparent), color-mix(in srgb, var(--equinox-control-bg, transparent) 92%, var(--equinox-boost-color, var(--accent-color)) 8%));
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color, var(--primary-text-color, #111)) 8%, transparent),
        inset 0 -10px 18px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 8%, transparent),
        0 0 8px color-mix(in srgb, var(--equinox-boost-color, var(--accent-color)) 13%, transparent);
    }

    :host([theme="liquid_glow"][light]) .action-button ha-icon {
      filter: drop-shadow(0 0 2px currentColor);
    }

    @media (max-width: 600px) {
      .boost-body {
        --boost-wheel-size: clamp(84px, min(40vw, 18vh), 132px);
        min-width: 0;
        width: 100%;
        max-width: 100%;
        padding-top: 8px;
      }

      .boost-wheel-shell {
        width: var(--boost-wheel-size);
        height: var(--boost-wheel-size);
      }

      .action-button {
        width: 100%;
        max-width: none;
      }
    }
  `;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	_dispatchBack() {
		this.dispatchEvent(new CustomEvent("equinox-open-menu", {
			bubbles: !0,
			composed: !0
		}));
	}
	_hasTimedPreset() {
		return this.viewModel?.vt?.isVt === !0 && !!this.viewModel.vt.timedPresetManager;
	}
	_isDisabled() {
		return !this.hass || !this.config || this.viewModel?.climate.availability !== "available" || this.viewModel?.vt?.lock.isUserLocked === !0;
	}
	_setDuration(e) {
		Ro.includes(e) && (this._durationMinutes = e);
	}
	_onDurationChange(e) {
		let t = Number(e.detail.value);
		Number.isFinite(t) && this._setDuration(Ro[Math.round(t)] ?? Lo);
	}
	async _startBoost() {
		if (!this.hass || !this.config) return;
		let e = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		(this._hasTimedPreset() ? await yo(e, "boost", this._durationMinutes) : await ho(e, "boost")).ok && this._dispatchClose();
	}
	async _stopBoost() {
		!this.hass || !this.config || (await bo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		})).ok && this._dispatchClose();
	}
	_durationIndex(e) {
		let t = Ro.indexOf(e);
		return t >= 0 ? t : Ro.reduce((t, n, r) => Math.abs(n - e) < Math.abs(Ro[t] - e) ? r : t, 0);
	}
	_formatDuration(e) {
		if (e < 60) return {
			value: `${e}${H(this.language, "dialog.boost.minutes")}`,
			unit: ""
		};
		if (e % 60 == 0) return {
			value: `${e / 60}${H(this.language, "dialog.boost.hours")}`,
			unit: ""
		};
		let t = Math.floor(e / 60), n = e % 60;
		return {
			value: `${t}${H(this.language, "dialog.boost.hours")}${n}`,
			unit: ""
		};
	}
	render() {
		let e = H(this.language, "dialog.boost.title"), t = this.viewModel?.vt?.timedPreset, n = t?.isActive === !0, r = this._isDisabled(), i = this._hasTimedPreset(), a = n && typeof t?.remainingTimeMin == "number" ? t.remainingTimeMin : this._durationMinutes, o = this._formatDuration(a);
		return w`
      <eq-dialog
        .open=${this.open}
        .title=${e}
        .language=${this.language}
        .floating=${this.floating}
        .closeOnLeave=${this.closeOnLeave}
        .anchor=${this.anchor}
        .showBack=${!0}
        @eq-dialog-close=${this._dispatchClose}
        @eq-dialog-back=${this._dispatchBack}
      >
        <div class="boost-body" ?has-wheel=${i}>
          ${i ? w`
                <div class="boost-wheel-shell">
                  <ha-control-circular-slider
                    class="boost-wheel"
                    .mode=${"start"}
                    .min=${0}
                    .max=${Ro.length - 1}
                    .step=${1}
                    .value=${this._durationIndex(a)}
                    ?disabled=${r || n}
                    @value-changed=${this._onDurationChange}
                    @value-changing=${this._onDurationChange}
                  ></ha-control-circular-slider>
                  <div class="wheel-value">
                    <span class="wheel-number">${o.value}</span>
                    <span class="wheel-unit">${o.unit}</span>
                  </div>
                </div>
              ` : E}
          <button class="action-button" ?disabled=${r || n && !i} @click=${n ? this._stopBoost : this._startBoost}>
            <ha-icon aria-hidden="true" .icon=${n ? "mdi:timer-off-outline" : "mdi:rocket-launch-outline"}></ha-icon>
            <span class="action-label">${H(this.language, n ? "dialog.boost.stop" : "dialog.boost.start")}</span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-boost-dialog") || customElements.define("eq-boost-dialog", zo);
//#endregion
//#region src/data/attribute-units.ts
var Bo = "attributes.json", Vo = {}, Ho;
function Uo() {
	return new URL(Bo, import.meta.url).toString();
}
function Wo(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return Vo;
	let t = {};
	for (let [n, r] of Object.entries(e)) n !== "" && typeof r == "string" && r !== "" && (t[n] = r);
	return t;
}
function Go() {
	return Ho ??= fetch(Uo()).then((e) => e.ok ? e.json() : Vo).then(Wo).catch(() => Vo), Ho;
}
function Ko(e) {
	return e ?? Vo;
}
//#endregion
//#region src/components/eq-history-dialog.ts
var qo = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this._fullscreen = !1, this._controlsVisible = !0, this._toolsOpen = !1, this._attributeUnitsLoadStarted = !1, this._historyPickerOverlayOpen = !1, this._suppressNextDialogClose = !1, this._handleDocumentPointerDown = () => {
			!this.open || !this._historyPickerOverlayOpen || (this._suppressNextDialogClose = !0, this._suppressCloseTimer !== void 0 && clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = setTimeout(() => {
				this._suppressNextDialogClose = !1, this._suppressCloseTimer = void 0;
			}, 1e3));
		}, this._configCacheKey = "";
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			_fullscreen: { state: !0 },
			_controlsVisible: { state: !0 },
			_toolsOpen: { state: !0 },
			_staticAttributeUnits: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host,
    ha-dialog {
      user-select: none;
      -webkit-user-select: none;
    }

    .dialog-fullscreen-btn {
      --ha-icon-button-size: 40px;
      --ha-icon-button-padding-inline: 6px;
      color: var(--primary-text-color);
    }

    .dialog-tools-btn {
      --mdc-icon-size: 18px;
      margin-inline-start: 12px;
    }

    @media (max-width: 600px) {
      .dialog-tools-btn {
        margin-inline-start: 14px;
      }

      .dialog-fs-toggle {
        display: none;
      }
    }

    .history {
      display: flex;
      flex: 1 1 auto;
      height: min(72vh, 58vw, 820px);
      min-height: min(420px, calc(100vh - 128px));
      min-width: 0;
      width: 100%;
    }

    ha-dialog[fullscreen] .history {
      height: min(76vh, 52vw, 860px);
      min-height: min(460px, calc(100vh - 128px));
    }
  `;
	}
	updated() {
		this._styleDialogHeader();
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), this._loadAttributeUnits();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), this._suppressCloseTimer !== void 0 && (clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = void 0);
	}
	_handleDialogClosed(e) {
		if (this._suppressNextDialogClose) {
			e.stopPropagation(), this._suppressNextDialogClose = !1, this._suppressCloseTimer !== void 0 && (clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = void 0);
			let t = e.currentTarget;
			t.open = !0, this.requestUpdate();
			return;
		}
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	_onHistoryPickerOverlayChanged(e) {
		this._historyPickerOverlayOpen = e.detail.open;
	}
	_toggleFullscreen() {
		this._fullscreen = !this._fullscreen;
	}
	_loadAttributeUnits() {
		this._attributeUnitsLoadStarted || (this._attributeUnitsLoadStarted = !0, Go().then((e) => {
			this._staticAttributeUnits = e, this.requestUpdate();
		}));
	}
	_styleDialogHeader() {
		let e = this.renderRoot.querySelector("ha-dialog")?.shadowRoot;
		if (!e || e.querySelector("style[data-equinox-history-header]")) return;
		let t = document.createElement("style");
		t.dataset.equinoxHistoryHeader = "true", t.textContent = "\n      .mdc-dialog__title,\n      .header-title,\n      .title {\n        min-width: 0;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      }\n\n      .header,\n      .dialog-header,\n      .mdc-dialog__header {\n        gap: 12px;\n      }\n\n      [name=\"headerActionItems\"],\n      slot[name=\"headerActionItems\"] {\n        flex: 0 0 auto;\n      }\n    ", e.appendChild(t);
	}
	_betterHistoryConfig() {
		let e = this.config?.entity, t = this.language ?? this.hass?.locale?.language, n = `${e ?? ""}|${t ?? ""}|${this.config?.diagnostic_entity ?? ""}|${this.config?.power_entity ?? ""}|${this.config?.humidity_entity ?? ""}|${this.config?.temperature_entity ?? ""}`;
		if (n === this._configCacheKey && this._configCache) return this._configCache;
		this._configCacheKey = n;
		let r = [
			e,
			this.config?.diagnostic_entity,
			this.config?.power_entity,
			this.config?.humidity_entity,
			this.config?.temperature_entity
		].filter((e) => typeof e == "string" && e !== ""), i = [];
		return e && i.push({ entity: e }), this.config?.temperature_entity && i.push({
			entity: this.config.temperature_entity,
			scaleGroup: "temperature"
		}), this._configCache = {
			showDatePicker: !0,
			showEntityPicker: !0,
			showLegend: !0,
			showTooltip: !0,
			debugPerformance: !1,
			defaultEntities: r,
			series: i
		}, this._configCache;
	}
	render() {
		return w`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${this.hass?.states[this.config?.entity ?? ""]?.attributes?.friendly_name ?? this.config?.entity ?? H(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._handleDialogClosed(e)}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-tools-btn"
          .label=${H(this.language, "dialog.history.tools")}
          ?active=${this._toolsOpen}
          @click=${() => {
			this._toolsOpen = !this._toolsOpen;
		}}
        >
          <ha-icon icon="mdi:tools"></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn"
          .label=${H(this.language, this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls")}
          @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
        >
          <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          .label=${H(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </ha-icon-button>
        ${this.open ? w`<equinox-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .attributeUnits=${Ko(this._staticAttributeUnits)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onHistoryPickerOverlayChanged(e)}
              class="history"
            ></equinox-better-history>` : E}
      </ha-dialog>
    `;
	}
};
customElements.get("eq-history-dialog") || customElements.define("eq-history-dialog", qo);
//#endregion
//#region src/components/eq-lock-dialog.ts
var Jo = 4, Yo = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"spacer",
	"0",
	"backspace"
], Xo = class extends D {
	constructor(...e) {
		super(...e), this.open = !1, this.entityId = "", this.isLocking = !0, this._code = "", this._error = !1, this._loading = !1, this._onKeyDown = (e) => {
			this.open && (e.key >= "0" && e.key <= "9" ? this._pressDigit(e.key) : e.key === "Backspace" ? this._pressBackspace() : e.key === "Escape" ? this._cancel() : e.key === "Enter" && this._code.length === Jo && this._validate());
		};
	}
	static {
		this.properties = {
			open: {
				type: Boolean,
				reflect: !0
			},
			hass: { attribute: !1 },
			entityId: { type: String },
			isLocking: { type: Boolean },
			language: { type: String },
			_code: { state: !0 },
			_error: { state: !0 },
			_loading: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
    }

    .dialog {
      position: relative;
      z-index: 1;
      background: var(--equinox-card-bg, var(--ha-card-background, var(--card-background-color)));
      border-radius: var(--equinox-radius, 8px);
      border: 1px solid var(--equinox-border-color, var(--divider-color));
      box-shadow: var(--equinox-shadow, 0 4px 20px rgba(0, 0, 0, 0.35));
      color: var(--equinox-text-color, var(--primary-text-color));
      width: 100%;
      max-width: 320px;
      padding: 24px 20px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 500;
    }

    .header ha-icon {
      --mdc-icon-size: 22px;
      color: var(--equinox-danger-color, var(--error-color));
    }

    .header ha-icon[unlocked] {
      color: var(--equinox-auto-color, var(--success-color));
    }

    .dots {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .dots[error] {
      animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }

    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid var(--equinox-muted-color, var(--secondary-text-color));
      background: transparent;
      transition: background 0.15s, border-color 0.15s, transform 0.15s;
    }

    .dot[filled] {
      background: var(--equinox-text-color, var(--primary-text-color));
      border-color: var(--equinox-text-color, var(--primary-text-color));
      transform: scale(1.15);
    }

    .dot[error] {
      background: var(--equinox-danger-color, var(--error-color));
      border-color: var(--equinox-danger-color, var(--error-color));
    }

    .error-msg {
      text-align: center;
      font-size: 13px;
      color: var(--equinox-danger-color, var(--error-color));
      min-height: 18px;
    }

    .keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .key {
      height: 56px;
      font-size: 20px;
      font-weight: 500;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-control-bg, var(--secondary-background-color));
      color: var(--equinox-text-color, var(--primary-text-color));
      cursor: pointer;
      transition: background 0.12s, opacity 0.12s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    .key:hover {
      background: color-mix(in srgb, var(--equinox-control-bg, var(--secondary-background-color)) 80%, var(--equinox-text-color, var(--primary-text-color)) 14%);
    }

    .key:active {
      opacity: 0.7;
    }

    .key[disabled] {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }

    .key ha-icon {
      --mdc-icon-size: 22px;
    }

    .cancel {
      background: transparent;
      border: 0;
      color: var(--equinox-muted-color, var(--secondary-text-color));
      font: inherit;
      font-size: 14px;
      cursor: pointer;
      padding: 4px;
      text-align: center;
      width: 100%;
      border-radius: var(--equinox-control-radius, 8px);
      transition: color 0.12s;
    }

    .cancel:hover {
      color: var(--equinox-text-color, var(--primary-text-color));
    }

    @media (max-width: 600px) {
      :host([open]) {
        align-items: flex-end;
      }

      .dialog {
        max-width: 100%;
        border-radius: var(--equinox-radius, 8px) var(--equinox-radius, 8px) 0 0;
        padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("keydown", this._onKeyDown);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown);
	}
	updated(e) {
		e.has("open") && !this.open && (this._code = "", this._error = !1, this._loading = !1);
	}
	render() {
		if (!this.open) return E;
		let e = this.isLocking ? H(this.language, "main.lock.locked") : H(this.language, "main.lock.unlocked"), t = H(this.language, "main.lock.enter_code"), n = H(this.language, "main.lock.wrong_code"), r = H(this.language, "dialog.close");
		return w`
      <div class="backdrop" @click=${this._cancel}></div>
      <div class="dialog" role="dialog" aria-modal="true">
        <div class="header">
          <ha-icon
            .icon=${this.isLocking ? "mdi:lock-outline" : "mdi:lock-open-outline"}
            ?unlocked=${!this.isLocking}
          ></ha-icon>
          <span>${e} — ${t}</span>
        </div>
        <div class="dots" ?error=${this._error}>
          ${Array.from({ length: Jo }, (e, t) => w`
            <div
              class="dot"
              ?filled=${t < this._code.length && !this._error}
              ?error=${this._error}
            ></div>
          `)}
        </div>
        <div class="error-msg">${this._error ? n : E}</div>
        <div class="keypad">
          ${Yo.map((e) => this._renderKey(e))}
        </div>
        <button class="cancel" @click=${this._cancel}>${r}</button>
      </div>
    `;
	}
	_renderKey(e) {
		return e === "backspace" ? w`
        <button
          class="key"
          ?disabled=${this._loading || this._code.length === 0}
          @click=${this._pressBackspace}
        >
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
      ` : e === "spacer" ? w`<div></div>` : w`
      <button
        class="key"
        ?disabled=${this._loading || this._code.length >= Jo}
        @click=${() => this._pressDigit(e)}
      >
        ${e}
      </button>
    `;
	}
	_pressDigit(e) {
		this._loading || this._code.length >= Jo || (this._error = !1, this._code += e, this._code.length === Jo && this._validate());
	}
	_pressBackspace() {
		this._loading || this._code.length === 0 || (this._error = !1, this._code = this._code.slice(0, -1));
	}
	async _validate() {
		if (this._loading || !this.hass || this._code.length < Jo) return;
		this._loading = !0;
		let e = this.isLocking ? "lock" : "unlock";
		try {
			await this.hass.callService("versatile_thermostat", e, {
				entity_id: this.entityId,
				code: this._code
			}), this.dispatchEvent(new CustomEvent("eq-dialog-close", {
				bubbles: !0,
				composed: !0
			}));
		} catch {
			this._error = !0, this._code = "", navigator.vibrate?.(200);
		} finally {
			this._loading = !1;
		}
	}
	_cancel() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
};
customElements.get("eq-lock-dialog") || customElements.define("eq-lock-dialog", Xo);
//#endregion
//#region src/components/eq-main-card.ts
var Zo = "equinox", Qo = [
	{
		key: "hasOverpowering",
		icon: "mdi:flash-alert",
		tone: "warning",
		messageKeys: ["overpowering_detected", "target_temp_power"]
	},
	{
		key: "hasOpenWindow",
		icon: "mdi:window-open-variant",
		tone: "info",
		messageKeys: [
			"hvac_off_window_detection",
			"target_temp_window_eco",
			"target_temp_window_frost"
		]
	},
	{
		key: "hasPresence",
		icon: "mdi:home-account",
		tone: "info"
	},
	{
		key: "hasTimer",
		icon: "mdi:timer-outline",
		tone: "boost",
		messageKeys: ["target_temp_timed_preset"]
	}
], $o = {
	safety_detected: {
		icon: "mdi:thermometer-alert",
		tone: "danger"
	},
	heating_failure: {
		icon: "mdi:thermometer-alert",
		tone: "danger"
	},
	cooling_failure: {
		icon: "mdi:snowflake-alert",
		tone: "danger"
	},
	overpowering_detected: {
		icon: "mdi:flash-alert",
		tone: "warning"
	},
	target_temp_power: {
		icon: "mdi:flash-alert",
		tone: "warning"
	},
	hvac_off_window_detection: {
		icon: "mdi:window-open-variant",
		tone: "info"
	},
	target_temp_window_eco: {
		icon: "mdi:window-open-variant",
		tone: "info"
	},
	target_temp_window_frost: {
		icon: "mdi:window-open-variant",
		tone: "info"
	},
	hvac_off_auto_start_stop: {
		icon: "mdi:power-sleep",
		tone: "boost"
	},
	hvac_off_sleep_mode: {
		icon: "mdi:sleep",
		tone: "boost"
	},
	target_temp_timed_preset: {
		icon: "mdi:timer-outline",
		tone: "boost"
	},
	target_temp_activity_detected: {
		icon: "mdi:motion-sensor",
		tone: "info"
	},
	target_temp_activity_not_detected: {
		icon: "mdi:motion-sensor-off",
		tone: "info"
	},
	target_temp_absence_detected: {
		icon: "mdi:home-export-outline",
		tone: "info"
	},
	hvac_off_central_mode: {
		icon: "mdi:home-thermometer-outline",
		tone: "info"
	},
	target_temp_central_mode: {
		icon: "mdi:home-thermometer-outline",
		tone: "info"
	},
	hvac_off_manual: {
		icon: "mdi:power",
		tone: "info"
	},
	hvac_off_safety_detection: {
		icon: "mdi:thermometer-alert",
		tone: "danger"
	},
	not_initialized: {
		icon: "mdi:alert-box-outline",
		tone: "warning"
	}
}, es = {
	preheating: {
		icon: "mdi:timer-sand",
		tone: "heat"
	},
	heat: {
		icon: "mdi:fire",
		tone: "heat"
	},
	heating: {
		icon: "mdi:fire",
		tone: "heat"
	},
	cool: {
		icon: "mdi:snowflake",
		tone: "cool"
	},
	cooling: {
		icon: "mdi:snowflake",
		tone: "cool"
	},
	drying: {
		icon: "mdi:water-percent",
		tone: "cool"
	},
	fan: {
		icon: "mdi:fan-speed-2",
		tone: "auto"
	},
	idle: { tone: "muted" },
	defrosting: {
		icon: "mdi:snowflake",
		tone: "cool"
	}
};
function q(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function ts(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function ns(e) {
	if (Array.isArray(e) && e.length >= 3) {
		let [t, n, r] = e.map((e) => Number(e));
		return [
			t,
			n,
			r
		].every((e) => Number.isFinite(e)) ? {
			r: Math.min(255, Math.max(0, t)),
			g: Math.min(255, Math.max(0, n)),
			b: Math.min(255, Math.max(0, r))
		} : void 0;
	}
	if (typeof e != "string") return;
	let t = e.trim(), n = t.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)?.[1];
	if (n) return n.length === 3 ? {
		r: parseInt(n[0] + n[0], 16),
		g: parseInt(n[1] + n[1], 16),
		b: parseInt(n[2] + n[2], 16)
	} : {
		r: parseInt(n.slice(0, 2), 16),
		g: parseInt(n.slice(2, 4), 16),
		b: parseInt(n.slice(4, 6), 16)
	};
	let r = t.match(/^rgba?\(\s*([\d.]+)(?:\s*,\s*|\s+)([\d.]+)(?:\s*,\s*|\s+)([\d.]+)/i);
	if (!r) return;
	let [, i, a, o] = r, s = [
		i,
		a,
		o
	].map((e) => Number(e));
	if (s.every((e) => Number.isFinite(e))) return {
		r: Math.min(255, Math.max(0, s[0])),
		g: Math.min(255, Math.max(0, s[1])),
		b: Math.min(255, Math.max(0, s[2]))
	};
}
function rs({ r: e, g: t, b: n }) {
	let r = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return r(e) * .2126 + r(t) * .7152 + r(n) * .0722;
}
function is(e, t) {
	if (t !== void 0 && t < 70) return;
	let n = ns(e);
	if (n) return rs(n) > .42 ? "#111418" : "#ffffff";
}
function as(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
function os(e, t) {
	let n = [...new Set(e)], r = t.filter((e) => n.includes(e)), i = n.filter((e) => !t.includes(e));
	return [...r, ...i];
}
var ss = class extends D {
	constructor(...e) {
		super(...e), this._activeDialog = null, this._powerInfoPinned = !1, this._lockDialogOpen = !1, this._lockIsLocking = !1, this._browserHistoryInstanceId = `equinox-${Math.random().toString(36).slice(2)}`, this._syncingBrowserHistory = !1, this._handleMouseLeave = () => {
			this._activeDialog === "menu" && (this._activeDialog = null);
		}, this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (t?.layer === "history-dialog") {
					this._activeDialog = "history", this._activeMessageKey = void 0;
					return;
				}
				this._activeDialog === "history" && (this._activeDialog = null);
			} finally {
				this._syncingBrowserHistory = !1;
			}
		}, this._startPowerInfoPress = (e) => {
			e.pointerType !== "touch" && e.pointerType !== "pen" || (this._clearPowerInfoPressTimer(), this._powerInfoPressTimer = window.setTimeout(() => {
				this._powerInfoPinned = !0;
			}, 450));
		}, this._clearPowerInfoPressTimer = () => {
			this._powerInfoPressTimer !== void 0 && (window.clearTimeout(this._powerInfoPressTimer), this._powerInfoPressTimer = void 0);
		}, this._closePowerInfo = () => {
			this._powerInfoPinned = !1;
		};
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { attribute: !1 },
			viewModel: { attribute: !1 },
			_activeDialog: { state: !0 },
			_dialogAnchor: { state: !0 },
			_activeMessageKey: { state: !0 },
			_powerInfoPinned: { state: !0 },
			_lockDialogOpen: { state: !0 },
			_lockIsLocking: { state: !0 }
		};
	}
	static {
		this.styles = [
			Eo,
			Do,
			o`
      :host {
        display: block;
        position: relative;
        container-type: inline-size;
        height: 100%;
        --equinox-card-surface-bg: var(--equinox-config-card-bg, var(--equinox-card-bg));
        --equinox-mode-control-bg: var(--equinox-config-card-bg, var(--equinox-control-bg));
        --equinox-mode-control-text: var(--equinox-card-surface-text-color, var(--equinox-text-color));
        --equinox-mode-control-muted: color-mix(in srgb, var(--equinox-mode-control-text) 68%, transparent);
        --equinox-mode-control-border-color: color-mix(in srgb, var(--equinox-mode-control-text) 18%, transparent);
        --equinox-mode-control-hover-bg: color-mix(in srgb, var(--equinox-mode-control-bg) 82%, var(--equinox-mode-control-text) 18%);
      }

      ha-card {
        height: 100%;
        overflow: visible;
        border-radius: var(--equinox-radius);
        background: var(--equinox-card-surface-bg);
        border: 1px solid var(--equinox-border-color);
        box-shadow: var(--equinox-shadow);
        color: var(--equinox-text-color);
      }

      .card {
        display: flex;
        flex-direction: column;
        gap: 11px;
        padding: 15px 16px 16px;
        box-sizing: border-box;
        min-height: 100%;
      }

      .name {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 28px;
        align-items: center;
        gap: 8px;
        min-height: 20px;
        font-size: var(--ha-card-header-font-size, 16px);
        font-weight: var(--ha-card-header-font-weight, 500);
        line-height: var(--ha-card-header-line-height, 20px);
      }

      .name-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .status {
        min-height: 27px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .status-spacer {
        flex: 1;
        min-width: 0;
      }

      .events {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        min-width: 28px;
      }

      .event {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-info-color);
        padding: 0;
      }

      .event[tone="warning"] {
        color: var(--equinox-warning-color);
      }

      .event[tone="danger"] {
        color: var(--equinox-danger-color);
      }

      .event[tone="boost"] {
        color: var(--equinox-boost-color);
      }

      button.event {
        cursor: pointer;
      }

      button.event:hover {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
      }

      .event ha-icon {
        --mdc-icon-size: 22px;
      }

      .message-body {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 220px;
        max-width: 360px;
        color: var(--equinox-text-color);
        font-size: 14px;
        line-height: 1.35;
      }

      .message-body ha-icon {
        --mdc-icon-size: 24px;
        flex: 0 0 auto;
        color: var(--equinox-info-color);
      }

      .message-body[tone="warning"] ha-icon {
        color: var(--equinox-warning-color);
      }

      .message-body[tone="danger"] ha-icon {
        color: var(--equinox-danger-color);
      }

      .message-body[tone="boost"] ha-icon {
        color: var(--equinox-boost-color);
      }

      .lock {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-text-color);
        padding: 0;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .lock:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .action-icon {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--equinox-muted-color);
      }

      .action-icon[tone="heat"] {
        color: var(--equinox-heat-color);
      }

      .action-icon[tone="cool"] {
        color: var(--equinox-cool-color);
      }

      .action-icon[tone="auto"] {
        color: var(--equinox-auto-color);
      }

      .action-icon[tone="heat-cool"] {
        color: var(--equinox-heat-cool-color);
      }

      .action-icon[tone="off"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 11px;
        flex: 1;
        min-height: 0;
        position: relative;
        --rail-icon-size: clamp(20px, 7cqi, 26px);
        --rail-menu-size: clamp(22px, 7.5cqi, 28px);
        --rail-icon-inner-size: clamp(17px, 5.8cqi, 22px);
        --rail-gap: clamp(4px, 2.5cqi, 8px);
        --rail-power-font-size: clamp(10px, 3.6cqi, 12px);
      }

      .layout[state-vertical] {
        align-items: start;
      }

      .main {
        display: flex;
        flex-direction: column;
        gap: 11px;
        min-width: 0;
        grid-area: 1 / 1;
      }

      .state-rail,
      .left-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--rail-gap);
        min-width: 0;
      }

      .layout[state-vertical] .state-rail,
      .layout[state-vertical] .left-rail {
        position: absolute;
        top: 0;
        z-index: 1;
      }

      .state-rail {
        justify-content: flex-start;
        right: 0;
      }

      .left-rail {
        justify-content: flex-start;
        left: 0;
      }

      .state-rail .events {
        flex-direction: column;
        justify-content: flex-start;
      }

      .state-rail .lock,
      .state-rail .fan,
      .state-rail .swing,
      .state-rail .menu,
      .left-rail .fan,
      .left-rail .swing,
      .left-rail .power-info,
      .state-rail .power-info {
        flex: 0 0 auto;
      }

      .state-rail .event,
      .state-rail .action-icon,
      .state-rail .lock,
      .state-rail .fan,
      .state-rail .swing,
      .left-rail .fan,
      .left-rail .swing,
      .left-rail .power-info-button,
      .state-rail .power-info-button {
        width: var(--rail-icon-size);
        height: var(--rail-icon-size);
      }

      .state-rail .menu {
        width: var(--rail-menu-size);
        height: var(--rail-menu-size);
      }

      .state-rail .event ha-icon,
      .state-rail .action-icon ha-icon,
      .state-rail .lock ha-icon,
      .state-rail .fan ha-icon,
      .state-rail .swing ha-icon,
      .state-rail .menu ha-icon,
      .left-rail .fan ha-icon,
      .left-rail .swing ha-icon,
      .left-rail .power-info-button ha-icon,
      .state-rail .power-info-button ha-icon {
        --mdc-icon-size: var(--rail-icon-inner-size);
      }

      .setpoint {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(10px, 4cqi, 18px);
        margin-top: 2px;
      }

      .setpoint[sensor-focus] {
        flex-direction: column;
        gap: 8px;
        margin-top: 0;
        --sensor-focus-temperature-size: clamp(18px, 10cqi, 40px);
        --sensor-focus-humidity-size: clamp(11px, 4.8cqi, 20px);
        --sensor-focus-temperature-icon-size: clamp(18px, 7cqi, 28px);
        --sensor-focus-humidity-icon-size: clamp(13px, 4.8cqi, 18px);
      }

      .step {
        width: clamp(30px, 9cqi, 40px);
        height: clamp(30px, 9cqi, 40px);
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        --control-button-border-radius: 50%;
        --control-button-padding: 0;
        --control-button-background-color: var(--equinox-control-bg);
        --control-button-background-opacity: 1;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-text-color);
        --mdc-icon-size: 24px;
        filter: drop-shadow(0 1px 3px rgb(0 0 0 / 18%));
      }

      .step:hover:not([disabled]) {
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 82%, var(--equinox-text-color) 18%);
      }

      .setpoint-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(5px, 2.5cqi, 10px);
      }

      .setpoint-control[compact] {
        gap: clamp(4px, 1.8cqi, 6px);
      }

      .setpoint-control[compact] .step {
        width: clamp(24px, 7cqi, 30px);
        height: clamp(24px, 7cqi, 30px);
      }

      .setpoint-control[compact] .step ha-icon {
        --mdc-icon-size: 18px;
        width: 18px;
        height: 18px;
      }

      .range-setpoint-control {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(8px, 3cqi, 14px);
        min-width: 0;
      }

      .range-setpoint-control[mode="heat-cool"] {
        flex-direction: column;
        gap: clamp(6px, 2cqi, 10px);
      }

      @container (min-width: 340px) {
        .range-setpoint-control[mode="heat-cool"] {
          flex-direction: row;
          gap: clamp(8px, 3cqi, 14px);
        }
      }

      .range-bound {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }

      .range-label {
        color: var(--equinox-muted-color);
        font-size: clamp(9px, 3cqi, 11px);
        font-weight: var(--ha-font-weight-medium, 500);
        line-height: 1;
        text-transform: uppercase;
      }

      .range-bound .setpoint-control {
        gap: clamp(3px, 1.2cqi, 5px);
      }

      .range-bound .step {
        width: clamp(24px, 7cqi, 30px);
        height: clamp(24px, 7cqi, 30px);
      }

      .range-bound .step ha-icon {
        --mdc-icon-size: 18px;
        width: 18px;
        height: 18px;
      }

      .range-bound .target {
        font-size: clamp(18px, 6.5cqi, 26px);
      }

      .target {
        min-width: 0;
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-size: clamp(24px, 9cqi, 38px);
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        color: var(--equinox-auto-color);
      }

      .setpoint-input {
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        line-height: inherit;
        color: inherit;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        text-align: center;
        cursor: pointer;
      }

      .setpoint-input:focus {
        cursor: text;
      }

      .setpoint-input:disabled {
        cursor: default;
      }

      .setpoint-unit {
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
      }

      .target[mode="heat"],
      .target[mode="boost"] {
        color: var(--equinox-heat-color);
      }

      .target[mode="cool"] {
        color: var(--equinox-cool-color);
      }

      .target[mode="heat-cool"] {
        color: var(--equinox-heat-cool-color);
      }

      .target[mode="off"],
      .target[mode="unavailable"] {
        color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      .target[compact] {
        font-size: clamp(15px, 5cqi, 20px);
        font-weight: var(--ha-font-weight-medium, 500);
      }

      .sensor-primary {
        display: inline-flex;
        align-items: baseline;
        justify-content: center;
        gap: clamp(4px, 2.5cqi, 12px);
        min-width: 0;
      }

      .sensor-temperature {
        display: inline-flex;
        align-items: baseline;
        gap: clamp(2px, 1.1cqi, 4px);
        font-size: var(--sensor-focus-temperature-size, clamp(26px, 9.5cqi, 40px));
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        color: var(--equinox-text-color);
        min-width: 0;
      }

      .sensor-temperature[clickable] {
        cursor: pointer;
      }

      .sensor-temperature[clickable]:hover {
        opacity: 0.75;
      }

      .sensor-temperature ha-icon {
        --mdc-icon-size: var(--sensor-focus-temperature-icon-size, 28px);
        width: var(--sensor-focus-temperature-icon-size, 28px);
        height: var(--sensor-focus-temperature-icon-size, 28px);
        color: var(--equinox-muted-color);
      }

      .sensor-temperature .sensor-unit {
        font-size: 0.82em;
      }

      .sensor-humidity {
        display: inline-flex;
        align-items: baseline;
        gap: clamp(2px, 1cqi, 3px);
        color: var(--equinox-muted-color);
        font-size: var(--sensor-focus-humidity-size, clamp(14px, 5cqi, 20px));
        line-height: 1;
        font-weight: var(--ha-font-weight-normal, 400);
        cursor: pointer;
        min-width: 0;
      }

      .sensor-humidity:hover {
        opacity: 0.75;
      }


      .sensor-humidity ha-icon {
        --mdc-icon-size: var(--sensor-focus-humidity-icon-size, 18px);
        width: var(--sensor-focus-humidity-icon-size, 18px);
        height: var(--sensor-focus-humidity-icon-size, 18px);
        color: var(--equinox-muted-color);
      }

      .conditions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(8px, 4cqi, 16px);
        color: var(--equinox-muted-color);
        font-size: clamp(14px, 5cqi, 20px);
        font-weight: var(--ha-font-weight-normal, 400);
      }

      .condition {
        display: inline-flex;
        align-items: center;
        gap: clamp(3px, 1.5cqi, 6px);
        min-width: 66px;
        justify-content: center;
      }

      .condition[clickable] {
        cursor: pointer;
      }

      .condition[clickable]:hover {
        opacity: 0.75;
      }

      .condition ha-icon {
        --condition-icon-size: clamp(15px, 4.8cqi, 20px);
        color: var(--equinox-muted-color);
        --mdc-icon-size: var(--condition-icon-size);
        width: var(--condition-icon-size);
        height: var(--condition-icon-size);
      }

      .condition-value[kind="temperature"] {
        color: var(--equinox-text-color);
      }

      .condition-value[kind="humidity"] {
        color: var(--equinox-muted-color);
        font-size: 14px;
      }

      .divider {
        width: 1px;
        align-self: stretch;
        min-height: 26px;
        background: var(--equinox-border-color);
      }

      .segments {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
        border-radius: var(--equinox-control-radius);
        overflow: hidden;
        min-height: clamp(36px, 14cqi, 45px);
        background: var(--equinox-mode-control-bg);
        border: 1px solid var(--equinox-mode-control-border-color);
      }

      .segments ha-control-button:not(:last-child) {
        border-inline-end: 1px solid var(--equinox-mode-control-border-color);
      }

      .segments ha-control-button,
      .compact-selectors ha-control-button {
        display: block;
        min-width: 0;
        width: 100%;
        height: 45px;
        --control-button-border-radius: var(--equinox-control-radius);
        --control-button-background-color: transparent;
        --control-button-background-opacity: 0;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-mode-control-muted);
        --control-button-padding: 0;
      }

      .segments ha-control-button {
        height: 100%;
        --control-button-border-radius: 0;
        --control-button-padding: 0;
      }

      .compact-selectors {
        display: flex;
        gap: clamp(3px, 2.4cqi, 8px);
        min-height: clamp(36px, 14cqi, 45px);
      }

      .compact-selectors ha-control-button {
        flex: 1;
        min-width: 0;
        height: clamp(36px, 14cqi, 45px);
        border: 1px solid var(--equinox-mode-control-border-color);
        border-radius: var(--equinox-control-radius);
        background: var(--equinox-mode-control-bg);
        overflow: hidden;
      }

      ha-control-button:hover:not([disabled]) {
        --control-button-icon-color: var(--equinox-mode-control-text);
        --control-button-background-color: var(--equinox-mode-control-hover-bg);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active] {
        --control-button-icon-color: var(--equinox-mode-control-text);
        --control-button-background-color: var(--equinox-control-active-bg);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active][subtle] {
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 74%, var(--equinox-mode-control-text) 10%);
      }

      ha-control-button[tone="heat"]:not([active]) {
        --control-button-icon-color: var(--equinox-heat-color);
      }

      ha-control-button[tone="cool"]:not([active]) {
        --control-button-icon-color: var(--equinox-cool-color);
      }

      ha-control-button[tone="auto"]:not([active]) {
        --control-button-icon-color: var(--equinox-auto-color);
      }

      ha-control-button[tone="heat-cool"]:not([active]) {
        --control-button-icon-color: var(--equinox-heat-cool-color);
      }

      ha-control-button[tone="boost"]:not([active]) {
        --control-button-icon-color: var(--equinox-boost-color);
      }

      ha-control-button[tone="cool-boost"]:not([active]) {
        --control-button-icon-color: var(--equinox-cool-boost-color);
      }

      ha-control-button[tone="off"]:not([active]) {
        --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
      }

      ha-control-button[tone="heat"][active][subtle] {
        --control-button-icon-color: var(--equinox-heat-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-color) 22%);
      }

      ha-control-button[tone="cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-cool-color) 22%);
      }

      ha-control-button[tone="auto"][active][subtle] {
        --control-button-icon-color: var(--equinox-auto-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-auto-color) 22%);
      }

      ha-control-button[tone="heat-cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-heat-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
      }

      ha-control-button[tone="boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-boost-color) 22%);
      }

      ha-control-button[tone="cool-boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-cool-boost-color) 22%);
      }

      ha-control-button[tone="off"][active][subtle] {
        --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
        --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--disabled-text-color, var(--equinox-muted-color)) 22%);
      }

      .compact-selectors ha-control-button:not(.fan-selector) {
        overflow: hidden;
      }

      .compact-selectors ha-control-button.fan-selector,
      .compact-selectors ha-control-button.swing-selector {
        --control-button-icon-color: var(--primary-color);
      }

      .compact-selectors ha-control-button.fan-selector .btn-icon,
      .compact-selectors ha-control-button.swing-selector .btn-icon {
        color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      }

      .fan-icon-auto {
        --mdc-icon-size: 22px;
        transform: translate(-0.04em, -0.04em);
      }

      .fan .fan-icon-speed {
        transform: translateY(-1px);
      }

      .compact-selectors .btn-icon {
        --equinox-selector-icon-size: clamp(16px, 7.6cqi, 24px);
        width: clamp(20px, 10cqi, 30px);
        height: clamp(20px, 10cqi, 30px);
      }

      .segments .btn-icon {
        --equinox-selector-icon-size: clamp(16px, 7.6cqi, 24px);
        width: clamp(20px, 10cqi, 30px);
        height: clamp(20px, 10cqi, 30px);
      }

      .segments .btn-icon ha-icon,
      .compact-selectors .btn-icon ha-icon {
        --mdc-icon-size: var(--equinox-selector-icon-size);
      }

      .compact-selectors .fan-icon-auto {
        --equinox-selector-icon-size: clamp(15px, 7cqi, 22px);
      }

      .btn-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: rgba(128, 128, 128, 0.10);
      }

      .btn-icon ha-icon {
        width: var(--equinox-selector-icon-size, 24px);
        height: var(--equinox-selector-icon-size, 24px);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }

      .btn-icon[tone="heat"] { background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent); }
      .btn-icon[tone="cool"] { background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent); }
      .btn-icon[tone="auto"] { background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent); }
      .btn-icon[tone="heat-cool"] { background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent); }
      .btn-icon[tone="boost"] { background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent); }
      .btn-icon[tone="cool-boost"] { background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent); }

      ha-control-button[active] .btn-icon { background: transparent; }

      .bottom {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-height: 47px;
      }

      .fan,
      .swing {
        width: 36px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: color-mix(in srgb, var(--primary-color) 15%, transparent);
        color: var(--primary-color);
        padding: 0;
        cursor: pointer;
      }

      .status .fan,
      .status .swing {
        width: 26px;
        height: 26px;
      }

      .fan-label,
      .swing-label {
        display: none;
      }

      .meter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: var(--equinox-muted-color);
        font-size: 12px;
        white-space: nowrap;
      }

      .meter-line {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        line-height: 1;
      }

      .menu {
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        color: var(--equinox-muted-color);
        padding: 0;
        cursor: pointer;
      }

      .menu,
      .fan,
      .swing {
        border-radius: var(--equinox-control-radius);
      }

      .menu:hover,
      .fan:hover,
      .swing:hover {
        background: color-mix(in srgb, var(--primary-color) 22%, transparent);
      }

      .meter-legacy {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .meter ha-icon {
        --mdc-icon-size: 22px;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .power-info {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .power-info-button {
        width: 26px;
        height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--equinox-muted-color);
        padding: 0;
        cursor: pointer;
      }

      .power-info-button:hover,
      .power-info-button:focus-visible {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
      }

      .power-popover {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        z-index: 20;
        display: none;
        width: max-content;
        min-width: 82px;
        max-width: min(180px, calc(100vw - 24px));
        padding: 10px;
        border-radius: var(--equinox-radius);
        border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
        background: color-mix(in srgb, var(--equinox-card-bg, var(--card-background-color, #1c1c1c)) 82%, transparent);
        box-shadow: 0 10px 28px rgb(0 0 0 / 28%);
        backdrop-filter: blur(14px);
        color: var(--equinox-text-color);
      }

      .state-rail .power-popover {
        left: auto;
        right: 0;
      }

      .power-info:hover .power-popover,
      .power-info:focus-within .power-popover,
      .power-info[open] .power-popover {
        display: block;
      }

      .power-popover .meter {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        font-size: 12px;
        white-space: nowrap;
        color: var(--equinox-text-color);
      }

      .power-popover .meter-line {
        gap: 6px;
      }

      .power-popover ha-icon {
        width: 28px;
        height: 28px;
        --mdc-icon-size: 18px;
        background: rgba(128, 128, 128, 0.10);
        border-radius: 50%;
        flex-shrink: 0;
        color: var(--equinox-muted-color);
      }

      @media (max-width: 360px) {
        .card {
          padding: 14px;
          gap: 10px;
        }

        .layout {
          gap: 10px;
        }

        .bottom {
          grid-template-columns: 38px minmax(0, 1fr) 28px;
          gap: 6px;
        }
      }

      @container (max-width: 260px) {
        .card {
          padding: 10px 12px;
          gap: 8px;
        }

      }

      .lock[locked] {
        color: var(--equinox-danger-color);
      }

      ha-card[locked] .setpoint-control,
      ha-card[locked] .segments,
      ha-card[locked] .compact-selectors {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    `,
			Oo
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("mouseleave", this._handleMouseLeave), window.addEventListener("popstate", this._handleBrowserPopState);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("mouseleave", this._handleMouseLeave), window.removeEventListener("popstate", this._handleBrowserPopState), this._clearPowerInfoPressTimer();
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[Zo] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (!(n.instanceId !== this._browserHistoryInstanceId || n.layer !== "history-dialog")) return {
			instanceId: n.instanceId,
			layer: n.layer
		};
	}
	_browserHistoryState() {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[Zo]: {
				instanceId: this._browserHistoryInstanceId,
				layer: "history-dialog"
			}
		};
	}
	_pushHistoryDialogState() {
		this._syncingBrowserHistory || this._browserHistoryEntry()?.layer !== "history-dialog" && window.history.pushState(this._browserHistoryState(), "", window.location.href);
	}
	_openHistoryDialog() {
		this._activeDialog = "history", this._activeMessageKey = void 0, this._pushHistoryDialogState();
	}
	_closeHistoryDialog() {
		if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === "history-dialog") {
			window.history.back();
			return;
		}
		this._activeDialog = null;
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode), this.toggleAttribute("border-glow-on-action", !!this.config?.border_glow_on_action);
	}
	render() {
		if (!this.viewModel || !this.config) return E;
		let e = this.config?.display_mode === "compact", t = this.config.state_icons_layout === "vertical", n = this.viewModel.vt?.lock.isConfigured === !0 && this.viewModel.vt.lock.isUserLocked === !0, r = this._activeHvacAction();
		return w`
      <ha-card
        style=${this._cardStyle()}
        ?locked=${n}
        tone=${this._cardTone()}
        active-action=${r ?? E}
      >
        <div class="card">
          ${this._renderName()}
          ${t ? E : this._renderStatus()}
          <div class="layout" ?state-vertical=${t}>
            <div class="main">
              ${this._renderSetpoint()}
              ${this._renderConditions()}
              ${e ? this._renderCompactSelectors() : w`${this._renderHvacModes()} ${this._renderPresets()}`}
            </div>
            ${t ? w`<div class="left-rail">${this._renderLeftRail()}</div>` : E}
            ${t ? w`<div class="state-rail">${this._renderStateRail()}</div>` : E}
          </div>
        </div>
      </ha-card>
      <eq-fan-dialog
        .open=${this._activeDialog === "fan"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
      ></eq-fan-dialog>
      <eq-swing-dialog
        .open=${this._activeDialog === "swing"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
      ></eq-swing-dialog>
      <eq-hvac-dialog
        .open=${this._activeDialog === "hvac"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
      ></eq-hvac-dialog>
      <eq-preset-dialog
        .open=${this._activeDialog === "preset"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
      ></eq-preset-dialog>
      <eq-menu-dialog
        .open=${this._activeDialog === "menu"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
        @equinox-open-regulation=${() => {
			this._activeDialog = null;
		}}
        @equinox-open-boost=${() => {
			this._activeDialog = "boost";
		}}
        @equinox-open-history=${() => this._openHistoryDialog()}
      ></eq-menu-dialog>
      <eq-boost-dialog
        .open=${this._activeDialog === "boost"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
        .closeOnLeave=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
        @equinox-open-menu=${() => {
			this._activeDialog = "menu";
		}}
      ></eq-boost-dialog>
      <eq-history-dialog
        .open=${this._activeDialog === "history"}
        .hass=${this.hass}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeHistoryDialog()}
      ></eq-history-dialog>
      <eq-lock-dialog
        .open=${this._lockDialogOpen}
        .hass=${this.hass}
        .entityId=${this.config.entity}
        .isLocking=${this._lockIsLocking}
        .language=${this._language()}
        @eq-dialog-close=${() => {
			this._lockDialogOpen = !1;
		}}
      ></eq-lock-dialog>
      <eq-dialog
        .open=${this._activeMessageKey !== void 0}
        .title=${H(this._language(), "dialog.message.title")}
        .language=${this._language()}
        .floating=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => this._closeMessage()}
      >
        ${this._renderMessageOverlay()}
      </eq-dialog>
    `;
	}
	_cardStyle() {
		let e = ts(this.config?.card_background_color), t = as(this.config?.card_background_opacity), n = is(this.config?.card_background_color, t), r = e && t !== void 0 ? `color-mix(in srgb, ${e} ${t}%, transparent)` : e || (t === void 0 ? void 0 : `color-mix(in srgb, var(--equinox-card-bg) ${t}%, transparent)`), i = [];
		return r && (i.push(`--equinox-config-card-bg: ${r}`), i.push(`--equinox-card-surface-bg: ${r}`), i.push(`--equinox-mode-control-bg: ${r}`)), n && i.push(`--equinox-card-surface-text-color: ${n}`), i.length > 0 ? `${i.join("; ")};` : "";
	}
	_language() {
		return this.hass?.locale?.language ?? this.hass?.language;
	}
	_renderName() {
		return this.config?.disable_name ? E : w`
      <div class="name">
        <span class="name-label">${this.viewModel?.climate.name}</span>
        ${this._renderMenuButton()}
      </div>
    `;
	}
	_renderStatus() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? H(this._language(), "main.lock.locked") : H(this._language(), "main.lock.unlocked"), n = this.config?.display_mode !== "compact" && this._hasFanControl(), r = this.config?.display_mode !== "compact" && this._hasSwingControl();
		return w`
      <div class="status">
        ${n ? this._renderFanButton() : E}
        ${r ? this._renderSwingButton() : E}
        ${this._renderPowerInfoButton()}
        <span class="status-spacer"></span>
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${e ? this._renderLockButton(t) : E}
        ${this.config?.disable_name ? this._renderMenuButton() : E}
      </div>
    `;
	}
	_renderStateRail() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? H(this._language(), "main.lock.locked") : H(this._language(), "main.lock.unlocked");
		return [
			...this.config?.disable_name ? [this._renderMenuButton()] : [],
			...e ? [this._renderLockButton(t)] : [],
			w`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
		];
	}
	_renderLeftRail() {
		return [
			...this.config?.display_mode !== "compact" && this._hasFanControl() ? [this._renderFanButton()] : [],
			...this.config?.display_mode !== "compact" && this._hasSwingControl() ? [this._renderSwingButton()] : [],
			this._renderPowerInfoButton()
		];
	}
	_renderLockButton(e) {
		let t = this.viewModel?.vt?.lock.isLocked === !0;
		return w`
      <button
        class="lock"
        title=${e}
        aria-label=${e}
        ?locked=${t}
        @click=${this._toggleLock}
      >
        <ha-icon .icon=${t ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
      </button>
    `;
	}
	_renderHvacStateIcon() {
		let e = this.viewModel?.climate.hvacAction, t = e ? es[e] : void 0, n = this.viewModel?.climate.hvacMode;
		if (n === "off" && this.viewModel?.vt?.messages.some((e) => e.key === "hvac_off_manual")) return E;
		let r = t?.icon || (n ? B[n] : ""), i = t?.tone ?? this._modeTone(n), a = e ? H(this._language(), `main.hvac_action.${e}`) : this._hvacLabel(n);
		return r ? w`
      <ha-icon
        class="action-icon"
        tone=${i}
        .icon=${r}
        title=${a}
      ></ha-icon>
    ` : E;
	}
	_renderEvents() {
		let e = this.viewModel?.vt?.events, t = this.viewModel?.vt?.messages ?? [];
		if (!e) return [];
		let n = new Set(Qo.filter((e) => e.key === "hasTimer").flatMap((e) => e.messageKeys ?? [])), r = t.map((e) => {
			let t = n.has(e.key) ? (e) => this._openBoost(e) : void 0;
			return this._renderMessageIcon(e, t);
		}), i = Qo.filter((n) => {
			let r = n.messageKeys ?? [];
			return e[n.key] && !r.some((e) => t.some((t) => t.key === e));
		}).map((e) => {
			let t = e.key === "hasTimer" ? (e) => this._openBoost(e) : void 0;
			return this._renderEventIcon(e, t);
		});
		return [...r, ...i];
	}
	_renderEventIcon(e, t) {
		let n = H(this._language(), `main.events.${e.key}`);
		return t ? w`
        <button
          class="event"
          tone=${e.tone}
          title=${n}
          aria-label=${n}
          @click=${t}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
      ` : w`
      <ha-icon
        class="event"
        tone=${e.tone}
        .icon=${e.icon}
        title=${n}
      ></ha-icon>
    `;
	}
	_renderMessageIcon(e, t) {
		let n = this._messageIcon(e.key), r = this._messageLabel(e.key), i = t ?? ((t) => this._openMessage(e.key, t));
		return w`
      <button
        class="event"
        tone=${n.tone}
        title=${r}
        aria-label=${r}
        @click=${i}
      >
        <ha-icon .icon=${n.icon}></ha-icon>
      </button>
    `;
	}
	_renderMessageOverlay() {
		if (!this._activeMessageKey) return E;
		let e = this._messageIcon(this._activeMessageKey);
		return w`
      <div class="message-body" tone=${e.tone}>
        <ha-icon .icon=${e.icon}></ha-icon>
        <span>${this._messageLabel(this._activeMessageKey)}</span>
      </div>
    `;
	}
	_messageIcon(e) {
		return $o[e] ?? {
			icon: "mdi:information-outline",
			tone: "info"
		};
	}
	_messageLabel(e) {
		return H(this._language(), `main.messages.${e}`);
	}
	_renderSetpoint() {
		return this.config?.primary_display === "sensors" ? this._renderSensorFocus() : w`<div class="setpoint">${this._renderTemperatureControl(!1)}</div>`;
	}
	_renderSensorFocus() {
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return w`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span
            class="sensor-temperature"
            ?clickable=${!!n}
            @click=${n ? () => this._openMoreInfo(n) : E}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatCurrentTempValue()}</span>
            <span class="sensor-unit">°</span>
          </span>
          ${t ? w`
                <span class="sensor-humidity" @click=${() => this._openMoreInfo(this._humidityEntityId())}>
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span>${this._formatPercent(e)}</span>
                </span>
              ` : E}
        </div>
        ${this._renderTemperatureControl(!0)}
      </div>
    `;
	}
	_renderTemperatureControl(e) {
		return this._hasTemperatureRangeControl() ? this._renderRangeSetpointControl(e) : this._renderSetpointControl(e);
	}
	_renderSetpointControl(e) {
		let t = this._isControlDisabled() || !q(this.viewModel?.climate.targetTemperature), n = this._setpointFallback(), r = n.length || 4;
		return w`
      <div class="setpoint-control" ?compact=${e}>
        <ha-control-button
          class="step"
          .label=${H(this._language(), "main.actions.decrease_temperature")}
          ?disabled=${t}
          @click=${() => this._changeTemperature(-1)}
        >
          <ha-icon icon="mdi:minus"></ha-icon>
        </ha-control-button>
        <div class="target" mode=${this._targetTone()} ?compact=${e}>
          <span class="setpoint-unit" aria-hidden="true" style="visibility: hidden">°</span>
          <input
            class="setpoint-input"
            type="text"
            inputmode="decimal"
            .value=${n}
            placeholder="--.-"
            style="width: ${r}ch"
            ?disabled=${t}
            @focus=${this._onSetpointFocus}
            @blur=${this._onSetpointBlur}
            @keydown=${this._onSetpointKeyDown}
          >
          <span class="setpoint-unit">°</span>
        </div>
        <ha-control-button
          class="step"
          .label=${H(this._language(), "main.actions.increase_temperature")}
          ?disabled=${t}
          @click=${() => this._changeTemperature(1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-control-button>
      </div>
    `;
	}
	_renderRangeSetpointControl(e) {
		let t = this.viewModel?.climate.targetTemperatureRange, n = this.viewModel?.climate.hvacMode === "heat_cool";
		return w`
      <div class="range-setpoint-control" mode=${n ? "heat-cool" : "range"} ?compact=${e}>
        ${n ? w`
              ${this._renderRangeBound("high", t?.high, e)}
              ${this._renderRangeBound("low", t?.low, e)}
            ` : w`
              ${this._renderRangeBound("low", t?.low, e)}
              ${this._renderRangeBound("high", t?.high, e)}
            `}
      </div>
    `;
	}
	_renderRangeBound(e, t, n) {
		let r = this._isControlDisabled() || !q(t), i = this._rangeBoundLabel(e), a = this._rangeSetpointFallback(e), o = a.length || 4, s = this._rangeBoundTone(e);
		return w`
      <div class="range-bound">
        ${i ? w`<span class="range-label">${i}</span>` : E}
        <div class="setpoint-control" ?compact=${n}>
          <ha-control-button
            class="step"
            .label=${H(this._language(), "main.actions.decrease_temperature")}
            ?disabled=${r}
            @click=${() => this._changeRangeTemperature(e, -1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </ha-control-button>
          <div class="target" mode=${s} ?compact=${n}>
            <span class="setpoint-unit" aria-hidden="true" style="visibility: hidden">°</span>
            <input
              class="setpoint-input"
              type="text"
              inputmode="decimal"
              .value=${a}
              placeholder="--.-"
              style="width: ${o}ch"
              ?disabled=${r}
              data-range-bound=${e}
              @focus=${this._onSetpointFocus}
              @blur=${this._onRangeSetpointBlur}
              @keydown=${this._onSetpointKeyDown}
            >
            <span class="setpoint-unit">°</span>
          </div>
          <ha-control-button
            class="step"
            .label=${H(this._language(), "main.actions.increase_temperature")}
            ?disabled=${r}
            @click=${() => this._changeRangeTemperature(e, 1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-control-button>
        </div>
      </div>
    `;
	}
	_rangeBoundLabel(e) {
		if (this.viewModel?.climate.hvacMode === "heat_cool") return "";
		let t = e === "low" ? "main.actions.low_temperature" : "main.actions.high_temperature";
		return H(this._language(), t);
	}
	_rangeBoundTone(e) {
		return this.viewModel?.climate.hvacMode === "heat_cool" && this.viewModel.climate.availability === "available" ? e === "high" ? "cool" : "heat" : this._targetTone();
	}
	_renderConditions() {
		if (this.config?.primary_display === "sensors") return E;
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return w`
      <div class="conditions">
        <span
          class="condition"
          ?clickable=${!!n}
          @click=${n ? () => this._openMoreInfo(n) : E}
        >
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatCurrentTemp()}</span>
        </span>
        ${t ? w`
            <span class="divider"></span>
            <span class="condition" clickable @click=${() => this._openMoreInfo(this._humidityEntityId())}>
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span class="condition-value" kind="humidity">${this._formatPercent(e)}</span>
            </span>
          ` : E}
      </div>
    `;
	}
	_renderHvacModes() {
		let e = this._visibleHvacModes();
		return e.length === 0 ? E : w`<div class="segments" style=${e.length < 3 ? `width: calc(100% / 3 * ${e.length}); margin-inline: auto;` : ""}>${e.map((e) => this._renderHvacButton(e))}</div>`;
	}
	_renderHvacButton(e) {
		return w`
      <ha-control-button
        .label=${this._hvacLabel(e)}
        tone=${this._modeTone(e)}
        ?active=${this.viewModel?.climate.hvacMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(e)}
      >
        <span class="btn-icon" tone=${this._modeTone(e)}>
          <ha-icon .icon=${B[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderPresets() {
		let e = this._visiblePresetModes();
		return e.length === 0 ? E : w`<div class="segments">${e.map((e) => this._renderPresetButton(e))}</div>`;
	}
	_renderPresetButton(e) {
		return w`
      <ha-control-button
        .label=${this._presetLabel(e)}
        tone=${this._presetTone(e)}
        ?active=${this.viewModel?.climate.presetMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setPresetMode(e)}
      >
        <span class="btn-icon" tone=${this._presetTone(e)}>
          <ha-icon .icon=${V[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderCompactSelectors() {
		let e = this.viewModel?.climate.hvacMode, t = this.viewModel?.climate.presetMode, n = this._visibleHvacModes(), r = e && n.includes(e) ? e : void 0, i = n.length > 0, a = this._visiblePresetModes().length > 0, o = t && t !== "none" && V[t] ? V[t] : "mdi:hand-back-right-outline", s = !!t && t !== "none" && !!V[t], c = this._hasFanControl(), l = this._hasSwingControl(), u = +!!i + +!!a + +!!c + +!!l;
		return u === 0 ? E : w`
      <div class="compact-selectors" style=${u < 4 ? `width: calc(100% / 3 * ${u}); margin-inline: auto;` : ""}>
        ${i ? w`
              <ha-control-button
                .label=${r ? this._hvacLabel(r) : H(this._language(), "dialog.hvac.title")}
                tone=${this._modeTone(r)}
                ?active=${r !== "off" && !!r}
                ?subtle=${!0}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("hvac", e)}
              >
                <span class="btn-icon" tone=${this._modeTone(r)}>
                  <ha-icon .icon=${r ? B[r] : "mdi:thermostat"}></ha-icon>
                </span>
              </ha-control-button>
            ` : E}
        ${a ? w`
              <ha-control-button
                .label=${t && t !== "none" ? this._presetLabel(t) : H(this._language(), "main.preset.none")}
                tone=${s ? this._presetTone(t) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("preset", e)}
              >
                <span class="btn-icon" tone=${s ? this._presetTone(t) : ""}>
                  <ha-icon .icon=${o}></ha-icon>
                </span>
              </ha-control-button>
            ` : E}
        ${c ? w`
              <ha-control-button
                class="fan-selector"
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("fan", e)}
              >
                <span class="btn-icon" tone="fan">
                  <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
                </span>
              </ha-control-button>
            ` : E}
        ${l ? w`
              <ha-control-button
                class="swing-selector"
                .label=${this._swingLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("swing", e)}
              >
                <span class="btn-icon" tone="swing">
                  <ha-icon .icon=${this._swingIcon()}></ha-icon>
                </span>
              </ha-control-button>
            ` : E}
      </div>
    `;
	}
	_hasPowerInfo() {
		let e = this._powerValveValue(), t = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower;
		return !!e || q(t);
	}
	_renderPowerInfoButton() {
		if (!this._hasPowerInfo()) return E;
		let e = H(this._language(), "main.actions.open_power_info");
		return w`
      <span class="power-info" ?open=${this._powerInfoPinned} @mouseleave=${this._closePowerInfo}>
        <button
          class="power-info-button"
          aria-label=${e}
          @pointerdown=${this._startPowerInfoPress}
          @pointerup=${this._clearPowerInfoPressTimer}
          @pointercancel=${this._clearPowerInfoPressTimer}
        >
          <ha-icon .icon=${this._powerInfoButtonIcon()}></ha-icon>
        </button>
        <div class="power-popover">
          ${this._renderPowerValve()}
        </div>
      </span>
    `;
	}
	_powerInfoButtonIcon() {
		return this._powerValveValue()?.icon === "mdi:pipe-valve" ? "mdi:pipe-valve" : "mdi:flash";
	}
	_renderFanButton() {
		return w`
      <button class="fan" title=${H(this._language(), "main.actions.open_fan")} aria-label=${H(this._language(), "main.actions.open_fan")} @click=${(e) => this._openDialog("fan", e)}>
        <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
	}
	_renderSwingButton() {
		let e = H(this._language(), "main.actions.open_swing");
		return w`
      <button class="swing" title=${e} aria-label=${e} @click=${(e) => this._openDialog("swing", e)}>
        <ha-icon .icon=${this._swingIcon()}></ha-icon>
        <span class="swing-label">${this._swingLabel()}</span>
      </button>
    `;
	}
	_hasFanControl() {
		return (this.viewModel?.climate.fanModes?.length ?? 0) > 0 || this.viewModel?.vt?.fan.hasAutoFan === !0;
	}
	_hasSwingControl() {
		return (this.viewModel?.climate.swingModes?.length ?? 0) > 0 || (this.viewModel?.climate.swingHorizontalModes?.length ?? 0) > 0;
	}
	_renderPowerValve() {
		let e = this._powerValveValue(), t = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower, n = this.viewModel?.vt?.powerValve.instantPowerUnit ?? this.viewModel?.climate.instantPowerUnit;
		return !e && !q(t) ? E : w`
      <div class="meter">
        ${e ? w`<span class="meter-line"><ha-icon .icon=${e.icon}></ha-icon><span>${e.label}</span></span>` : E}
        ${q(t) ? w`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(t)}${n ? ` ${n}` : ""}</span></span>` : E}
      </div>
    `;
	}
	_renderMenuButton() {
		return w`
      <button class="menu" title=${H(this._language(), "main.actions.open_menu")} aria-label=${H(this._language(), "main.actions.open_menu")} @click=${(e) => this._openDialog("menu", e)}>
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    `;
	}
	_openDialog(e, t) {
		let n = t.currentTarget instanceof HTMLElement ? t.currentTarget : void 0;
		if (n) {
			let r = e === "menu", i = t instanceof MouseEvent ? t.clientX : void 0, a = r && t instanceof MouseEvent ? t.clientY : void 0;
			this._dialogAnchor = {
				element: n,
				clientX: i,
				clientY: a
			};
		} else this._dialogAnchor = void 0;
		this._activeDialog = e, this._activeMessageKey = void 0;
	}
	_openBoost(e) {
		let t = e.currentTarget instanceof HTMLElement ? e.currentTarget : void 0;
		if (t) {
			let n = e instanceof MouseEvent ? e.clientX : void 0;
			this._dialogAnchor = {
				element: t,
				clientX: n
			};
		}
		this._activeDialog = "boost", this._activeMessageKey = void 0;
	}
	_openMessage(e, t) {
		let n = t.currentTarget instanceof HTMLElement ? t.currentTarget : void 0;
		n ? this._dialogAnchor = { element: n } : this._dialogAnchor = void 0, this._activeDialog = null, this._activeMessageKey = e;
	}
	_closeMessage() {
		this._activeMessageKey = void 0;
	}
	_powerValveValue() {
		let e = this.viewModel?.vt;
		if (e) {
			if (e.types.includes("over_valve") || e.types.includes("over_climate_valve")) return q(e.powerValve.valveOpenPercent) ? {
				icon: "mdi:pipe-valve",
				label: this._formatPercent(e.powerValve.valveOpenPercent)
			} : void 0;
			if (e.types.includes("over_switch")) return q(e.powerValve.powerPercent) ? {
				icon: "mdi:meter-electric",
				label: this._formatPercent(e.powerValve.powerPercent)
			} : void 0;
		}
	}
	_targetTone() {
		if (this.viewModel?.vt?.timedPreset.isActive) return "boost";
		let e = this.viewModel?.climate.hvacMode;
		return this.viewModel?.climate.availability !== "available" || e === "off" ? "unavailable" : this._modeTone(e);
	}
	_cardTone() {
		if (this.viewModel?.vt?.timedPreset.isActive) return "boost";
		let e = this.viewModel?.climate.hvacMode;
		return this.viewModel?.climate.availability !== "available" || e === "off" ? "off" : this._modeTone(e);
	}
	_activeHvacAction() {
		let e = this.viewModel?.climate.hvacAction;
		if (e === "heating" || e === "heat") return "heat";
		if (e === "cooling" || e === "cool") return "cool";
	}
	_modeTone(e) {
		return e ? Na[e] ?? "" : "";
	}
	_presetTone(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" ? "cool" : e === "eco" ? "auto" : e === "away" || e === "sleep" ? "off" : e === "comfort" ? t === "cool" ? "cool" : "heat" : e === "home" ? "auto" : e === "boost" || e === "activity" ? t === "cool" ? "cool-boost" : "boost" : "";
	}
	_hidePreset(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" && t !== "heat";
	}
	_visibleHvacModes() {
		let e = new Set(this.config?.hidden_hvac_modes ?? []);
		return os(this.viewModel?.climate.hvacModes ?? [], Ma).filter((t) => B[t] && !e.has(t));
	}
	_visiblePresetModes() {
		let e = new Set(this.config?.hidden_preset_modes ?? []);
		return os(this.viewModel?.climate.presetModes ?? [], Pa).filter((t) => t !== "none" && V[t] && !this._hidePreset(t) && !e.has(t));
	}
	_fanIcon() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;
		return e ? wo[e] ?? "mdi:fan-speed-2" : "mdi:fan-speed-2";
	}
	_fanIconClass() {
		let e = this._fanIcon();
		return e === "mdi:fan-auto" ? "fan-icon-auto" : e === "mdi:fan-speed-2" ? "fan-icon-speed" : "";
	}
	_fanLabel() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode ?? (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : void 0);
		return e ? this._optionLabel("main.fan", e) : H(this._language(), "main.fan.unavailable");
	}
	_swingIcon() {
		let e = this.viewModel?.climate.swingMode, t = this.viewModel?.climate.swingHorizontalMode;
		return e ? Ia[e] ?? "mdi:arrow-oscillating" : t ? La[t] ?? Ia[t] ?? "mdi:arrow-expand-horizontal" : "mdi:arrow-oscillating";
	}
	_swingLabel() {
		let e = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;
		return e ? this._optionLabel("main.swing", e) : H(this._language(), "main.swing.unavailable");
	}
	_hvacLabel(e) {
		return !e || this.viewModel?.climate.availability !== "available" ? H(this._language(), "main.status.unavailable") : e === "off" ? H(this._language(), "main.status.off") : this._optionLabel("main.hvac", e);
	}
	_presetLabel(e) {
		return this._optionLabel("main.preset", e);
	}
	_optionLabel(e, t) {
		let n = H(this._language(), `${e}.${t}`);
		return n === `${e}.${t}` ? t : n;
	}
	_formatCurrentTemp() {
		let e = this.viewModel?.climate.currentTemperature, t = this.viewModel?.climate.currentTemperatureDecimals;
		return q(e) ? t === void 0 ? `${this._formatNumber(e)}°` : new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: t,
			maximumFractionDigits: t
		}).format(e) + "°" : "--.-°";
	}
	_formatCurrentTempValue() {
		let e = this.viewModel?.climate.currentTemperature, t = this.viewModel?.climate.currentTemperatureDecimals;
		return q(e) ? t === void 0 ? this._formatNumber(e) : new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: t,
			maximumFractionDigits: t
		}).format(e) : "--.-";
	}
	_formatPercent(e) {
		return q(e) ? `${this._formatNumber(e, 0)}%` : "--%";
	}
	_formatNumber(e, t = 1) {
		return new Intl.NumberFormat(this._language(), {
			maximumFractionDigits: t,
			minimumFractionDigits: t === 0 ? 0 : 1
		}).format(e);
	}
	_isControlDisabled() {
		return !this.hass || this.viewModel?.climate.availability !== "available" || this.viewModel?.vt?.lock.isUserLocked === !0;
	}
	_stepDecimals() {
		let e = String(this.viewModel?.climate.targetTempStep ?? .5);
		return e.includes(".") ? e.split(".")[1]?.length ?? 0 : 0;
	}
	_hasTemperatureRangeControl() {
		let e = this.viewModel?.climate.hvacMode, t = this.viewModel?.climate.targetTemperatureRange;
		return (e === "heat_cool" || e === "auto") && (q(t?.low) || q(t?.high));
	}
	_setpointFallback() {
		let e = this._stepDecimals();
		return q(this.viewModel?.climate.targetTemperature) ? new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: e,
			maximumFractionDigits: e
		}).format(this.viewModel.climate.targetTemperature) : "";
	}
	_rangeSetpointFallback(e) {
		let t = this._stepDecimals(), n = this.viewModel?.climate.targetTemperatureRange?.[e];
		return q(n) ? new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: t,
			maximumFractionDigits: t
		}).format(n) : "";
	}
	_onSetpointFocus(e) {
		e.target.value = "";
	}
	_onSetpointKeyDown(e) {
		e.key === "Enter" && e.target.blur();
	}
	_isValidStep(e) {
		let t = this.viewModel?.climate.targetTempStep ?? .5, n = this._stepDecimals();
		return (Math.round(e / t) * t).toFixed(n) === e.toFixed(n);
	}
	_onSetpointBlur(e) {
		let t = e.target, n = this._setpointFallback(), r = parseFloat(t.value.trim().replace(",", "."));
		if (!Number.isFinite(r) || !this._isValidStep(r) || !this.hass || !this.config || !this.viewModel) {
			t.value = n;
			return;
		}
		let i = this._stepDecimals(), a = this._clampTemperature(r);
		t.value = new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: i,
			maximumFractionDigits: i
		}).format(a), po({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, { temperature: a });
	}
	_onRangeSetpointBlur(e) {
		let t = e.target, n = t.dataset.rangeBound === "high" ? "high" : "low", r = this._rangeSetpointFallback(n), i = parseFloat(t.value.trim().replace(",", "."));
		if (!Number.isFinite(i) || !this._isValidStep(i) || !this.hass || !this.config || !this.viewModel) {
			t.value = r;
			return;
		}
		let a = this._rangeWith(n, i);
		if (!a) {
			t.value = r;
			return;
		}
		let o = this._stepDecimals();
		t.value = new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: o,
			maximumFractionDigits: o
		}).format(a[n]), po({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, {
			targetTempLow: a.low,
			targetTempHigh: a.high
		});
	}
	_changeTemperature(e) {
		if (!this.hass || !this.config || !this.viewModel || !q(this.viewModel.climate.targetTemperature)) return;
		let t = this.viewModel.climate.targetTempStep ?? .5, n = this._clampTemperature(this.viewModel.climate.targetTemperature + t * e);
		po({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, { temperature: n });
	}
	_changeRangeTemperature(e, t) {
		if (!this.hass || !this.config || !this.viewModel) return;
		let n = this.viewModel.climate.targetTemperatureRange?.[e];
		if (!q(n)) return;
		let r = this.viewModel.climate.targetTempStep ?? .5, i = this._rangeWith(e, n + r * t);
		i && po({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, {
			targetTempLow: i.low,
			targetTempHigh: i.high
		});
	}
	_rangeWith(e, t) {
		let n = this.viewModel?.climate.targetTemperatureRange, r = e === "low" ? this._clampTemperature(t) : n?.low, i = e === "high" ? this._clampTemperature(t) : n?.high;
		if (!q(r) || !q(i)) return;
		let a = e === "low" ? {
			low: Math.min(r, i),
			high: i
		} : {
			low: r,
			high: Math.max(i, r)
		};
		return {
			low: Number(a.low.toFixed(2)),
			high: Number(a.high.toFixed(2))
		};
	}
	_clampTemperature(e) {
		let t = this.viewModel?.climate.minTemp, n = this.viewModel?.climate.maxTemp, r = q(t) ? Math.max(e, t) : e, i = q(n) ? Math.min(r, n) : r;
		return Number(i.toFixed(2));
	}
	_setHvacMode(e) {
		!this.hass || !this.config || !this.viewModel || mo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e);
	}
	_setPresetMode(e) {
		!this.hass || !this.config || !this.viewModel || ho({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e);
	}
	_openMoreInfo(e) {
		this.dispatchEvent(new CustomEvent("hass-more-info", {
			bubbles: !0,
			composed: !0,
			detail: { entityId: e }
		}));
	}
	_humidityEntityId() {
		return this.config.humidity_entity ?? this.config.entity;
	}
	_toggleLock() {
		if (!this.hass || !this.config || !this.viewModel?.vt?.lock.isConfigured) return;
		if (this.viewModel.vt.lock.hasCode) {
			this._lockIsLocking = !this.viewModel.vt.lock.isLocked, this._lockDialogOpen = !0;
			return;
		}
		let e = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		if (this.viewModel.vt.lock.isLocked) {
			Co(e);
			return;
		}
		So(e);
	}
};
customElements.get("eq-main-card") || customElements.define("eq-main-card", ss);
//#endregion
//#region src/data/format.ts
var cs = new Set(["unknown", "unavailable"]);
function ls(e) {
	return e == null || typeof e == "string" && cs.has(e);
}
function J(e) {
	if (!(ls(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Y(e) {
	if (ls(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function us(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string" && e.trim() !== "") : [];
}
function X(...e) {
	return e.find((e) => e !== void 0);
}
//#endregion
//#region src/data/vt-state.ts
function Z(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Q(e, t) {
	return t.reduce((e, t) => Z(e)?.[t], e);
}
function $(e) {
	return e === !0;
}
function ds(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string" && e.trim() !== "") : typeof e == "string" && e.trim() !== "" ? [e] : [];
}
function fs(e) {
	return e === "safety_detected" || e === "heating_failure" || e === "cooling_failure" ? "danger" : e === "overpowering_detected" || e === "not_initialized" ? "alert" : "info";
}
function ps(e) {
	return {
		isPresenceConfigured: $(e.is_presence_configured),
		isPowerConfigured: $(e.is_power_configured),
		isMotionConfigured: $(e.is_motion_configured),
		isWindowConfigured: $(e.is_window_configured),
		isWindowAutoConfigured: $(e.is_window_auto_configured),
		isSafetyConfigured: $(e.is_safety_configured),
		isLockConfigured: $(e.is_lock_configured),
		isHeatingFailureDetectionConfigured: $(e.is_heating_failure_detection_configured),
		isRepairIncorrectStateConfigured: $(e.is_repair_incorrect_state_configured)
	};
}
function ms(e) {
	let t = J(Q(e, ["configuration", "type"])), n = [];
	return (e.is_over_switch === !0 || t === "over_switch") && n.push("over_switch"), (e.is_over_valve === !0 || t === "over_valve") && n.push("over_valve"), (e.is_over_climate === !0 || t === "over_climate") && n.push("over_climate"), (Q(e, ["vtherm_over_climate_valve", "have_valve_regulation"]) === !0 || Q(e, ["configuration", "have_valve_regulation"]) === !0) && n.push("over_climate_valve"), n;
}
function hs(e) {
	let t = ds(Q(e, ["specific_states", "messages"]));
	return Q(e, ["safety_manager", "safety_state"]) === "on" && t.push("safety_detected"), Q(e, ["heating_failure_detection_manager", "heating_failure_state"]) === "on" && t.push("heating_failure"), Q(e, ["heating_failure_detection_manager", "cooling_failure_state"]) === "on" && t.push("cooling_failure"), Q(e, ["power_manager", "overpowering_state"]) === "on" && t.push("overpowering_detected"), [...new Set(t)].map((e) => ({
		key: e,
		severity: fs(e)
	}));
}
function gs(e) {
	return X(J(Q(e, ["configuration", "proportional_function"])), J(Q(e, ["vtherm_over_valve", "function"])), J(Q(e, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"function"
	])), J(Q(e, ["specific_states", "proportional_function"])));
}
function _s(e, t, n) {
	let r = n.attributes, i = Z(r.specific_states), a = ms(r);
	if (!(a.length > 0 || i !== void 0 || Z(r.configuration) !== void 0)) return;
	let o = ps(r), s = X(Y(Q(r, ["vtherm_over_switch", "power_percent"])), Y(Q(r, [
		"vtherm_over_climate",
		"valve_regulation",
		"power_percent"
	])), Y(r.power_percent)), c = X(Y(Q(r, ["vtherm_over_valve", "valve_open_percent"])), Y(Q(r, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"valve_open_percent"
	])), Y(r.valve_open_percent)), l = Q(r, ["timed_preset_manager", "is_active"]) === !0, u = X(Q(r, ["lock_manager", "is_locked"]) === !0 ? !0 : void 0, Q(r, ["specific_states", "is_locked"]) === !0 ? !0 : void 0) === !0, d = hs(r), f = J(Q(r, ["vtherm_over_climate", "auto_fan_mode"])), p = J(Q(r, ["vtherm_over_climate", "current_auto_fan_mode"])), m = e.power_entity ? t.states[e.power_entity] : void 0, h = J(Q(r, ["requested_state", "hvac_mode"]));
	return {
		isVt: !0,
		types: a,
		configuration: {
			type: J(Q(r, ["configuration", "type"])),
			proportionalFunction: gs(r),
			haveValveRegulation: Q(r, ["configuration", "have_valve_regulation"]) === !0 || Q(r, ["vtherm_over_climate_valve", "have_valve_regulation"]) === !0
		},
		flags: o,
		powerValve: {
			powerPercent: s,
			valveOpenPercent: c,
			onPercent: X(Y(Q(r, ["vtherm_over_valve", "on_percent"])), Y(r.on_percent)),
			meanCyclePower: Y(Q(r, ["power_manager", "mean_cycle_power"])),
			devicePower: Y(Q(r, ["power_manager", "device_power"])),
			instantPower: Y(m?.state),
			instantPowerUnit: J(m?.attributes.unit_of_measurement)
		},
		timedPreset: {
			isActive: l,
			remainingTimeMin: Y(Q(r, ["timed_preset_manager", "remaining_time_min"])),
			preset: J(Q(r, ["timed_preset_manager", "preset"])),
			originalPreset: J(Q(r, ["timed_preset_manager", "original_preset"]))
		},
		lock: {
			isConfigured: o.isLockConfigured,
			isLocked: u,
			isUserLocked: u && (!o.isLockConfigured || Q(r, ["lock_manager", "lock_users"]) === !0),
			isAutomationLocked: u && Q(r, ["lock_manager", "lock_automations"]) === !0,
			hasCode: Q(r, ["lock_manager", "lock_code"]) === !0
		},
		events: {
			isHeating: r.hvac_action === "heating" || a.includes("over_switch") && s !== void 0 && s > 0 && h === "heat",
			isCooling: r.hvac_action === "cooling",
			hasTimer: l,
			hasOpenWindow: o.isWindowConfigured && Q(r, ["window_manager", "window_state"]) === "on" || o.isWindowAutoConfigured && Q(r, ["window_manager", "window_auto_state"]) === "on",
			hasOverpowering: Q(r, ["power_manager", "overpowering_state"]) === "on",
			hasPresence: o.isPresenceConfigured && Q(r, ["presence_manager", "presence_state"]) === "on",
			hasLock: u,
			hasAlert: d.some((e) => e.severity === "alert"),
			hasDanger: d.some((e) => e.severity === "danger")
		},
		messages: d,
		fan: {
			autoFanMode: f,
			currentAutoFanMode: p,
			hasAutoFan: f !== void 0 || p !== void 0
		},
		specificStates: i,
		currentState: Z(r.current_state),
		requestedState: Z(r.requested_state),
		powerManager: Z(r.power_manager),
		safetyManager: Z(r.safety_manager),
		lockManager: Z(r.lock_manager),
		timedPresetManager: Z(r.timed_preset_manager),
		vthermOverValve: Z(r.vtherm_over_valve),
		vthermOverSwitch: Z(r.vtherm_over_switch),
		vthermOverClimate: Z(r.vtherm_over_climate),
		vthermOverClimateValve: Z(r.vtherm_over_climate_valve)
	};
}
//#endregion
//#region src/data/climate-state.ts
function vs(e) {
	return typeof e == "object" && e ? e : void 0;
}
function ys(e, t) {
	return t.reduce((e, t) => vs(e)?.[t], e);
}
function bs(e) {
	return e.state === "unavailable" ? "unavailable" : e.state === "unknown" ? "unknown" : "available";
}
function xs(e, t, n) {
	return X(Y(n.humidity), e.humidity_entity ? Y(t.states[e.humidity_entity]?.state) : void 0);
}
function Ss(e, t) {
	if (!e.temperature_entity) return;
	let n = t.states[e.temperature_entity]?.state;
	if (!n || ls(n)) return;
	let r = parseFloat(n);
	if (!Number.isFinite(r)) return;
	let i = n.indexOf(".");
	return {
		value: r,
		decimals: i >= 0 ? n.length - i - 1 : 0,
		entityId: e.temperature_entity
	};
}
function Cs(e, t) {
	if (!e.power_entity) return {};
	let n = t.states[e.power_entity];
	return {
		instantPower: Y(n?.state),
		instantPowerUnit: J(n?.attributes.unit_of_measurement)
	};
}
function ws(e, t, n) {
	let r = n.attributes, i = Ss(e, t), a = X(ls(n.state) ? void 0 : n.state, J(r.hvac_mode), J(ys(r, ["current_state", "hvac_mode"]))), o = X(J(r.preset_mode), J(ys(r, ["current_state", "preset"]))), s = a === "cool" && o === "frost" ? "none" : o;
	return {
		entityId: n.entity_id,
		name: e.name ?? J(r.friendly_name),
		availability: bs(n),
		hvacMode: a,
		hvacAction: J(r.hvac_action),
		targetTemperature: X(Y(r.temperature), Y(ys(r, ["current_state", "target_temperature"]))),
		currentTemperature: i?.value ?? Y(r.current_temperature),
		currentTemperatureDecimals: i?.decimals,
		temperatureEntityId: i?.entityId,
		currentHumidity: xs(e, t, r),
		hvacModes: us(r.hvac_modes),
		presetModes: us(r.preset_modes),
		presetMode: s,
		fanMode: J(r.fan_mode),
		fanModes: us(r.fan_modes),
		swingMode: J(r.swing_mode),
		swingModes: us(r.swing_modes),
		swingHorizontalMode: J(r.swing_horizontal_mode),
		swingHorizontalModes: us(r.swing_horizontal_modes),
		minTemp: Y(r.min_temp),
		maxTemp: Y(r.max_temp),
		targetTempStep: X(Y(r.target_temp_step), Y(ys(r, ["configuration", "target_temperature_step"])), .5),
		targetTemperatureRange: {
			low: Y(r.target_temp_low),
			high: Y(r.target_temp_high)
		},
		...Cs(e, t)
	};
}
function Ts(e, t, n) {
	return {
		climate: ws(e, t, n),
		vt: _s(e, t, n)
	};
}
//#endregion
//#region src/data/config.ts
function Es(e) {
	return typeof e == "string";
}
function Ds(e, t) {
	return Es(t) && e.includes(t);
}
function Os(e) {
	return e.startsWith("climate.");
}
function ks(e) {
	if (!Array.isArray(e)) return;
	let t = [...new Set(e.filter(Es).map((e) => e.trim()).filter((e) => e.length > 0))];
	return t.length > 0 ? t : void 0;
}
function As(e) {
	if (typeof e == "string") {
		let t = e.trim();
		return t.length > 0 ? t : void 0;
	}
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	return [
		t,
		n,
		r
	].every((e) => Number.isFinite(e)) ? [
		t,
		n,
		r
	] : void 0;
}
function js(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
function Ms(e) {
	let t = {
		...ao,
		...e,
		type: wa
	};
	if (delete t.card_height, !Es(t.entity) || t.entity.trim() === "") return {
		config: t,
		error: "missing_entity"
	};
	if (t.entity = t.entity.trim(), !Os(t.entity)) return {
		config: t,
		error: "invalid_entity"
	};
	if (!Ds(eo, t.theme)) return {
		config: t,
		error: "invalid_theme"
	};
	if (!Ds(to, t.display_mode)) return {
		config: t,
		error: "invalid_display_mode"
	};
	if (!Ds(no, t.primary_display)) return {
		config: t,
		error: "invalid_primary_display"
	};
	if (!Ds(ro, t.additional_dashboards)) return {
		config: t,
		error: "invalid_additional_dashboards"
	};
	if (!Ds(io, t.state_icons_layout)) return {
		config: t,
		error: "invalid_state_icons_layout"
	};
	let n = As(t.card_background_color);
	n ? t.card_background_color = n : delete t.card_background_color;
	let r = js(t.card_background_opacity);
	r === void 0 ? delete t.card_background_opacity : t.card_background_opacity = r;
	let i = ks(t.hidden_hvac_modes), a = ks(t.hidden_preset_modes);
	return i ? t.hidden_hvac_modes = i : delete t.hidden_hvac_modes, a ? t.hidden_preset_modes = a : delete t.hidden_preset_modes, { config: t };
}
//#endregion
//#region src/equinox-card.ts
Sa(Ea);
var Ns = {
	bg: "Карта на Lovelace за Versatile Thermostat и стандартни климатични елементи.",
	ca: "Lovelace card for Versatile Thermostat and standard climate entities.",
	zh: "适用于 Versatile Thermostat 和标准气候实体的 Lovelace 卡片。",
	cs: "Karta Lovelace pro Versatile Thermostat a standardní entity klimatizace.",
	da: "Lovelace card for Versatile Thermostat and standard climate entities.",
	de: "Lovelace-Karte für Versatile Thermostat und Standard-Klimageräte.",
	el: "Κάρτα Lovelace για Versatile Thermostat και τυπικές οντότητες κλίματος.",
	en: "Lovelace card for Versatile Thermostat and standard climate entities.",
	es: "Tarjeta Lovelace para Termostato Versátil y entidades climáticas estándar.",
	fi: "Lovelace-kortti Versatile Thermostat- ja vakioilmastoentiteeteille.",
	fr: "Carte Lovelace pour Versatile Thermostat et les entités climate standard.",
	hu: "Lovelace kártya a sokoldalú termosztáthoz és standard klímaentitásokhoz.",
	it: "Scheda Lovelace per Termostato Versatile e entità climatiche standard.",
	nl: "Lovelace-kaart voor Versatile Thermostat en standaard klimaatentiteiten.",
	no: "Lovelace-kort for Versatile Thermostat og standard klimaenheter.",
	pl: "Karta Lovelace dla Versatile Thermostat i standardowych jednostek klimatyzacyjnych.",
	pt: "Placa Lovelace para Termostato Versátil e entidades climáticas padrão.",
	ru: "Карточка Lovelace для Versatile Thermostat и стандартных сущностей климата.",
	sk: "Karta Lovelace pre Versatile Thermostat a štandardné klimatizačné entity."
};
function Ps(e) {
	return Ns[e.toLowerCase().split("-")[0] || "en"] ?? Ns.en;
}
var Fs = class extends D {
	constructor(...e) {
		super(...e), this._translationsReady = !1, this._currentLang = "en", this._pendingLang = null;
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			_validation: { state: !0 },
			_translationsReady: { state: !0 },
			_currentLang: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
      height: 100%;
    }

    eq-main-card {
      height: 100%;
    }

    ha-card {
      padding: 16px;
      color: var(--primary-text-color);
    }

    .error {
      color: var(--error-color);
    }
  `;
	}
	static getConfigElement() {
		return document.createElement("equinox-card-editor");
	}
	static getStubConfig(e) {
		return {
			type: wa,
			entity: Object.keys(e?.states ?? {}).find((e) => e.startsWith("climate.")) ?? "climate.example"
		};
	}
	setConfig(e) {
		this._validation = Ms(e);
	}
	willUpdate() {
		this._viewModel = this._buildViewModel(), this._syncTranslations();
	}
	_syncTranslations() {
		let e = (this.hass?.locale?.language ?? this.hass?.language ?? "en").toLowerCase().split("-")[0] || "en";
		this._translationsReady ? e !== this._currentLang && e !== this._pendingLang && (this._pendingLang = e, Xa(e).then(() => {
			this._currentLang = e, this._pendingLang = null;
		})) : Promise.all([Xa(e), Xa("en")]).then(() => {
			this._translationsReady = !0, this._currentLang = e;
		});
	}
	getCardSize() {
		return 3;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: "auto",
			min_columns: 4,
			max_columns: 12,
			min_rows: 3
		};
	}
	render() {
		if (!this._translationsReady) return w`<ha-card style="visibility:hidden"></ha-card>`;
		let e = this._currentLang;
		if (!this._validation) return this._renderMessage(H(e, "card.missing_entity"), !0);
		if (this._validation.error) return this._renderMessage(H(e, `card.${this._validation.error}`), !0);
		let t = this._validation.config.entity;
		if (!t) return this._renderMessage(H(e, "card.missing_entity"), !0);
		let n = this.hass?.states[t];
		return this.hass && !n ? this._renderMessage(H(e, "card.entity_not_found", { entity: t }), !0) : w`
      <eq-main-card
        .hass=${this.hass}
        .config=${this._validation.config}
        .viewModel=${this._viewModel}
      ></eq-main-card>
    `;
	}
	_buildViewModel() {
		if (!this.hass || !this._validation || this._validation.error) return;
		let e = this._validation.config, t = this.hass.states[e.entity];
		if (t) return Ts(e, this.hass, t);
	}
	_renderMessage(e, t = !1) {
		return w`
      <ha-card>
        <div class=${t ? "error" : ""}>${e}</div>
      </ha-card>
    `;
	}
};
customElements.get("equinox-card") || customElements.define(Ta, Fs), window.customCards = window.customCards ?? [];
var Is = window.customCards;
Is.filter((e) => e.type === "equinox-card" || e.type === "custom:equinox-card" || e.name === "Equinox").forEach((e) => {
	Is.splice(Is.indexOf(e), 1);
}), Is.push({
	type: Ta,
	name: Ca,
	description: Ps(navigator.language),
	preview: !0,
	documentationURL: "https://github.com/KipK/equinox#readme"
});
//#endregion
export { Fs as EquinoxCard };
