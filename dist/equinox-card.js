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
var ie = globalThis, ae = (e) => e, oe = ie.trustedTypes, se = oe ? oe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + b, ue = `<${le}>`, de = document, fe = () => de.createComment(""), pe = (e) => e === null || typeof e != "object" && typeof e != "function", me = Array.isArray, he = (e) => me(e) || typeof e?.[Symbol.iterator] == "function", ge = "[ 	\n\f\r]", _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, ye = />/g, x = RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, S = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), Ce = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), w = de.createTreeWalker(de, 129);
function Te(e, t) {
	if (!me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var Ee = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = _e;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === _e ? c[1] === "!--" ? o = ve : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = x) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = x) : o = ye : o === x ? c[0] === ">" ? (o = i ?? _e, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? x : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = x : o === ve || o === ye ? o = _e : (o = x, i = void 0);
		let d = o === x && e[t + 1].startsWith("/>") ? " " : "";
		a += o === _e ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
	}
	return [Te(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, De = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ee(t, n);
		if (this.el = e.createElement(l, r), w.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = w.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Me : r[1] === "?" ? Ne : r[1] === "@" ? Pe : je
					}), i.removeAttribute(e);
				} else e.startsWith(b) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(b), t = e.length - 1;
					if (t > 0) {
						i.textContent = oe ? oe.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], fe()), w.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], fe());
					}
				}
			} else if (i.nodeType === 8) if (i.data === le) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += b.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = de.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Oe(e, t, n = e, r) {
	if (t === Ce) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = pe(t) ? void 0 : t._$litDirective$;
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? de).importNode(t, !0);
		w.currentNode = r;
		let i = w.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ae(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = w.nextNode(), a++);
		}
		return w.currentNode = de, r;
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
		this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = Oe(this, e, t), pe(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== Ce && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? he(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== C && pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(de.createTextNode(e)), this._$AH = e;
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
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new De(e)), t;
	}
	k(t) {
		me(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(fe()), this.O(fe()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
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
		this.type = 1, this._$AH = C, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = C;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Oe(this, e, t, 0), a = !pe(e) || e !== this._$AH && e !== Ce, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Oe(this, r[n + o], t, o), s === Ce && (s = this._$AH[o]), a ||= !pe(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Me = class extends je {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, Ne = class extends je {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, Pe = class extends je {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Oe(this, e, t, 0) ?? C) === Ce) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
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
Ie?.(De, Ae), (ie.litHtmlVersions ??= []).push("3.3.2");
var Le = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ae(t.insertBefore(fe(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Re = globalThis, T = class extends y {
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
		return Ce;
	}
};
T._$litElement$ = !0, T.finalized = !0, Re.litElementHydrateSupport?.({ LitElement: T });
var ze = Re.litElementPolyfillSupport;
ze?.({ LitElement: T }), (Re.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/const.ts
var Be = "Equinox", Ve = "custom:equinox-card", He = "equinox-card", Ue = "equinox-card-editor", We = "flat", Ge = "classic", Ke = "setpoint", qe = "auto", Je = [
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
], Ye = async (e) => {
	let t = e || Je;
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
}, Xe = [
	"ha-form",
	"ha-icon",
	"ha-entity-picker",
	"ha-dialog",
	"ha-control-circular-slider",
	"ha-control-button",
	"ha-icon-button",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip"
], Ze;
function Qe() {
	return Ze ??= Ye(Xe), Ze;
}
//#endregion
//#region src/localize/localize.ts
var $e = {
	en: {
		card: {
			description: "Lovelace card for Versatile Thermostat and standard climate entities.",
			missing_entity: "Configure a climate entity.",
			invalid_entity: "The configured entity must belong to the climate domain.",
			invalid_theme: "The configured theme is not available.",
			invalid_display_mode: "The configured display mode is not available.",
			invalid_primary_display: "The configured display priority is not available.",
			invalid_additional_dashboards: "The configured dashboard mode is not available.",
			invalid_state_icons_layout: "The configured state icon layout is not available.",
			entity_not_found: "Entity not found: {entity}",
			placeholder: "Equinox is ready for {entity}."
		},
		main: {
			status: {
				heating: "Heating active",
				cooling: "Cooling active",
				auto: "Auto",
				heat: "Heating",
				cool: "Cooling",
				heat_cool: "Auto",
				dry: "Dry",
				fan_only: "Fan only",
				off: "Off",
				boost: "Temporary boost",
				unavailable: "Unavailable"
			},
			hvac: {
				heat: "Heat",
				cool: "Cool",
				heat_cool: "Heat/cool",
				auto: "Auto",
				dry: "Dry",
				fan_only: "Fan only",
				off: "Off"
			},
			hvac_action: {
				off: "Off",
				preheating: "Preheating",
				heating: "Heating active",
				cooling: "Cooling active",
				drying: "Drying active",
				fan: "Fan active",
				idle: "Idle",
				defrosting: "Defrosting"
			},
			preset: {
				none: "No preset",
				frost: "Frost protection",
				eco: "Eco",
				away: "Away",
				comfort: "Comfort",
				home: "Home",
				sleep: "Sleep",
				activity: "Activity",
				boost: "Boost"
			},
			fan: {
				on: "On",
				On: "On",
				FAN_ON: "On",
				auto: "Auto",
				Auto: "Auto",
				FAN_AUTO: "Auto",
				low: "Low",
				FAN_LOW: "Low",
				medium: "Medium",
				FAN_MEDIUM: "Medium",
				middle: "Middle",
				Middle: "Middle",
				FAN_MIDDLE: "Middle",
				high: "High",
				FAN_HIGH: "High",
				off: "Off",
				Off: "Off",
				FAN_OFF: "Off",
				focus: "Focus",
				Focus: "Focus",
				FAN_FOCUS: "Focus",
				diffuse: "Diffuse",
				Diffuse: "Diffuse",
				FAN_DIFFUSE: "Diffuse",
				auto_fan_none: "None",
				auto_fan_low: "Low",
				auto_fan_medium: "Medium",
				auto_fan_high: "High",
				auto_fan_turbo: "Turbo",
				None: "None",
				Low: "Low",
				Medium: "Medium",
				High: "High",
				Turbo: "Turbo",
				unavailable: "Fan"
			},
			lock: {
				locked: "Locked",
				unlocked: "Unlocked",
				code_required: "Code required",
				enter_code: "Enter code",
				wrong_code: "Incorrect code"
			},
			events: {
				hasDanger: "Critical alert",
				hasAlert: "Alert",
				hasOverpowering: "Overpowering",
				hasOpenWindow: "Open window",
				hasPresence: "Presence detected",
				hasTimer: "Active timer"
			},
			messages: {
				hvac_off_manual: "Turned off manually",
				hvac_off_auto_start_stop: "Turned off by auto-start/stop",
				hvac_off_window_detection: "Turned off by window detection",
				hvac_off_sleep_mode: "Turned off by sleep mode",
				hvac_off_safety_detection: "Turned off by safety mode",
				hvac_off_central_mode: "Turned off by central mode",
				safety_detected: "Safety mode detected",
				overpowering_detected: "Overpowering detected",
				target_temp_window_eco: "Target temp.: window eco",
				target_temp_window_frost: "Target temp.: window frost",
				target_temp_power: "Target temp.: power",
				target_temp_central_mode: "Target temp.: central mode",
				target_temp_activity_detected: "Target temp.: activity detected",
				target_temp_activity_not_detected: "Target temp.: activity not detected",
				target_temp_absence_detected: "Target temp.: absence detected",
				target_temp_timed_preset: "Timed preset active",
				not_initialized: "Initialisation error",
				heating_failure: "Heating failure detected",
				cooling_failure: "Cooling failure detected"
			},
			actions: {
				decrease_temperature: "Decrease setpoint",
				increase_temperature: "Increase setpoint",
				open_fan: "Open fan",
				open_menu: "Open menu",
				open_power_info: "Show power indicators"
			}
		},
		dialog: {
			close: "Close",
			back: "Back",
			fan: {
				title: "Ventilation",
				description_auto: "Auto mode automatically adapts ventilation to heating needs."
			},
			hvac: { title: "Mode" },
			preset: { title: "Preset" },
			message: { title: "Message" },
			menu: {
				title: "Menu",
				regulation: "Regulation",
				boost: "Temporary boost",
				history: "History"
			},
			history: {
				title: "History",
				load: "Load",
				add: "Add",
				add_entity: "Add an entity",
				loading: "Loading history...",
				empty: "No history for this period.",
				no_attributes: "No selectable attribute.",
				tools: "Tools",
				show_controls: "Show history controls",
				hide_controls: "Hide history controls",
				fullscreen: "Fullscreen",
				exit_fullscreen: "Exit fullscreen",
				sources: {
					current_temperature: "Current temperature",
					temperature: "Target temperature",
					hvac_action: "HVAC action"
				}
			},
			boost: {
				title: "Temporary boost",
				duration: "Duration in minutes",
				minutes: "min",
				hours: "h",
				start: "Start boost",
				stop: "Stop boost",
				active: "Boost active",
				remaining_unknown: "Remaining time unavailable",
				preset: "Timed preset",
				original_preset: "Previous preset",
				start_description: "When the countdown ends, the thermostat will return to the previous mode.",
				active_description: "When the countdown ends, the thermostat will return to the previous mode.",
				active_description_with_preset: "When the countdown ends, the thermostat will return to the previous mode ({preset})."
			}
		},
		editor: {
			entity: "Entity",
			name: "Name",
			diagnostic_entity: "Diagnostic entity",
			power_entity: "Power entity",
			humidity_entity: "Humidity entity",
			temperature_entity: "Temperature entity",
			theme: "Theme",
			display_mode: "Format",
			primary_display: "Display priority",
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			tabs: {
				general: "General",
				presentation: "Presentation"
			},
			options: {
				theme: { flat: "Flat" },
				display_mode: {
					classic: "Classic",
					compact: "Compact"
				},
				primary_display: {
					setpoint: "Setpoint",
					sensors: "Sensors"
				},
				layout_orientation: {
					horizontal: "Horizontal",
					vertical: "Vertical"
				},
				additional_dashboards: {
					auto: "Auto",
					custom: "Custom",
					disabled: "Disabled"
				}
			}
		}
	},
	fr: {
		card: {
			description: "Carte Lovelace pour Versatile Thermostat et les entités climate standard.",
			missing_entity: "Configurez une entité climate.",
			invalid_entity: "L'entité configurée doit appartenir au domaine climate.",
			invalid_theme: "Le thème configuré n'est pas disponible.",
			invalid_display_mode: "Le mode d'affichage configuré n'est pas disponible.",
			invalid_primary_display: "La priorité d'affichage configurée n'est pas disponible.",
			invalid_additional_dashboards: "Le mode de dashboards configuré n'est pas disponible.",
			invalid_state_icons_layout: "La disposition des icônes d'état configurée n'est pas disponible.",
			entity_not_found: "Entité introuvable: {entity}",
			placeholder: "Equinox est prêt pour {entity}."
		},
		main: {
			status: {
				heating: "Chauffage actif",
				cooling: "Refroidissement actif",
				auto: "Auto",
				heat: "Chauffage",
				cool: "Clim",
				heat_cool: "Auto",
				dry: "Déshumidification",
				fan_only: "Ventilation",
				off: "Éteint",
				boost: "Boost temporaire",
				unavailable: "Indisponible"
			},
			hvac: {
				heat: "Chauffage",
				cool: "Clim",
				heat_cool: "Chaud/froid",
				auto: "Auto",
				dry: "Déshumidification",
				fan_only: "Ventilation",
				off: "Éteint"
			},
			hvac_action: {
				off: "Éteint",
				preheating: "Préchauffage",
				heating: "Chauffage actif",
				cooling: "Refroidissement actif",
				drying: "Déshumidification active",
				fan: "Ventilation active",
				idle: "En attente",
				defrosting: "Dégivrage"
			},
			preset: {
				none: "Aucun preset",
				frost: "Hors gel",
				eco: "Éco",
				away: "Absent",
				comfort: "Confort",
				home: "Maison",
				sleep: "Nuit",
				activity: "Activité",
				boost: "Boost"
			},
			fan: {
				on: "Activée",
				On: "Activée",
				FAN_ON: "Activée",
				auto: "Auto",
				Auto: "Auto",
				FAN_AUTO: "Auto",
				low: "Faible",
				FAN_LOW: "Faible",
				medium: "Moyenne",
				FAN_MEDIUM: "Moyenne",
				middle: "Moyenne",
				Middle: "Moyenne",
				FAN_MIDDLE: "Moyenne",
				high: "Forte",
				FAN_HIGH: "Forte",
				off: "Éteinte",
				Off: "Éteinte",
				FAN_OFF: "Éteinte",
				focus: "Concentrée",
				Focus: "Concentrée",
				FAN_FOCUS: "Concentrée",
				diffuse: "Diffuse",
				Diffuse: "Diffuse",
				FAN_DIFFUSE: "Diffuse",
				auto_fan_none: "Aucune",
				auto_fan_low: "Faible",
				auto_fan_medium: "Moyenne",
				auto_fan_high: "Forte",
				auto_fan_turbo: "Turbo",
				None: "Aucune",
				Low: "Faible",
				Medium: "Moyenne",
				High: "Forte",
				Turbo: "Turbo",
				unavailable: "Ventilation"
			},
			lock: {
				locked: "Verrouillé",
				unlocked: "Déverrouillé",
				code_required: "Code requis",
				enter_code: "Entrer le code",
				wrong_code: "Code incorrect"
			},
			events: {
				hasDanger: "Alerte critique",
				hasAlert: "Alerte",
				hasOverpowering: "Délestage",
				hasOpenWindow: "Fenêtre ouverte",
				hasPresence: "Présence détectée",
				hasTimer: "Minuterie active"
			},
			messages: {
				hvac_off_manual: "Eteint manuellement",
				hvac_off_auto_start_stop: "Eteint par auto-start/stop",
				hvac_off_window_detection: "Eteint par détection d'ouverture",
				hvac_off_sleep_mode: "Eteint par le mode endormi",
				hvac_off_safety_detection: "Eteint par le mode sécurité",
				hvac_off_central_mode: "Eteint par le mode central",
				safety_detected: "Mode sécurité détectée",
				overpowering_detected: "Sur-puissance détectée",
				target_temp_window_eco: "Temp. cible : fenêtre éco",
				target_temp_window_frost: "Temp. cible : fenêtre hors-gel",
				target_temp_power: "Temp. cible : délestage",
				target_temp_central_mode: "Temp. cible : mode central",
				target_temp_activity_detected: "Temp. cible : activité détectée",
				target_temp_activity_not_detected: "Temp. cible : activité non détectée",
				target_temp_absence_detected: "Temp. cible : absence détectée",
				target_temp_timed_preset: "Temporisation d'un preset active",
				not_initialized: "Erreur d'initialisation",
				heating_failure: "Défaut de chauffage détecté",
				cooling_failure: "Défaut de refroidissement détecté"
			},
			actions: {
				decrease_temperature: "Baisser la consigne",
				increase_temperature: "Augmenter la consigne",
				open_fan: "Ouvrir la ventilation",
				open_menu: "Ouvrir le menu",
				open_power_info: "Afficher les indicateurs de puissance"
			}
		},
		dialog: {
			close: "Fermer",
			back: "Retour",
			fan: {
				title: "Ventilation",
				description_auto: "Le mode Auto adapte automatiquement la ventilation selon les besoins."
			},
			hvac: { title: "Mode" },
			preset: { title: "Preset" },
			message: { title: "Message" },
			menu: {
				title: "Menu",
				regulation: "Régulation",
				boost: "Boost temporaire",
				history: "Historique"
			},
			history: {
				title: "Historique",
				load: "Charger",
				add: "Ajouter",
				add_entity: "Ajouter une entité",
				loading: "Chargement de l'historique...",
				empty: "Aucun historique sur cette période.",
				no_attributes: "Aucun attribut sélectionnable.",
				tools: "Outils",
				show_controls: "Afficher les contrôles de l'historique",
				hide_controls: "Masquer les contrôles de l'historique",
				fullscreen: "Plein écran",
				exit_fullscreen: "Quitter le plein écran",
				sources: {
					current_temperature: "Température actuelle",
					temperature: "Consigne",
					hvac_action: "Action HVAC"
				}
			},
			boost: {
				title: "Boost temporaire",
				duration: "Durée en minutes",
				minutes: "mn",
				hours: "h",
				start: "Démarrer le boost",
				stop: "Arrêter le boost",
				active: "Boost actif",
				remaining_unknown: "Temps restant indisponible",
				preset: "Preset temporisé",
				original_preset: "Preset précédent",
				start_description: "À la fin du compte à rebours, le thermostat reviendra au mode précédent.",
				active_description: "À la fin du compte à rebours, le thermostat reviendra au mode précédent.",
				active_description_with_preset: "À la fin du compte à rebours, le thermostat reviendra au mode précédent ({preset})."
			}
		},
		editor: {
			entity: "Entité",
			name: "Nom",
			diagnostic_entity: "Entité diagnostic",
			power_entity: "Entité puissance",
			humidity_entity: "Entité humidité",
			temperature_entity: "Entité température",
			theme: "Thème",
			display_mode: "Format",
			primary_display: "Priorité d'affichage",
			disable_name: "Masquer le nom",
			hide_lock_button: "Masquer le bouton de verrouillage",
			additional_dashboards: "Dashboards additionnels",
			state_icons_layout: "Icônes d'état",
			tabs: {
				general: "Général",
				presentation: "Présentation"
			},
			options: {
				theme: { flat: "Flat" },
				display_mode: {
					classic: "Classique",
					compact: "Compact"
				},
				primary_display: {
					setpoint: "Consigne",
					sensors: "Capteurs"
				},
				layout_orientation: {
					horizontal: "Horizontal",
					vertical: "Vertical"
				},
				additional_dashboards: {
					auto: "Auto",
					custom: "Personnalisé",
					disabled: "Désactivé"
				}
			}
		}
	}
};
function et(e) {
	return (e ?? "en").toLowerCase().split("-")[0] || "en";
}
function tt(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : void 0;
}
function nt(e, t) {
	return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, String(n)), e);
}
function E(e, t, n = {}) {
	return nt(tt($e[et(e)] ?? $e.en, t) ?? tt($e.en, t) ?? t, n);
}
//#endregion
//#region src/types/config.ts
var rt = ["flat"], it = ["classic", "compact"], at = ["setpoint", "sensors"], ot = [
	"auto",
	"custom",
	"disabled"
], st = ["horizontal", "vertical"], ct = {
	theme: We,
	display_mode: Ge,
	primary_display: Ke,
	disable_name: !1,
	hide_lock_button: !1,
	additional_dashboards: qe,
	state_icons_layout: "horizontal"
};
//#endregion
//#region src/equinox-card-editor.ts
Qe();
function lt(e) {
	let t = { ...e };
	return delete t.card_height, t;
}
var ut = class extends T {
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
  `;
	}
	setConfig(e) {
		this._config = lt(e);
	}
	render() {
		let e = this.hass?.locale?.language ?? this.hass?.language, t = {
			...ct,
			...this._config
		};
		return S`
      <div class="tabs">
        <button class="tab" ?active=${this._activeTab === "general"} @click=${() => {
			this._activeTab = "general";
		}}>
          ${E(e, "editor.tabs.general")}
        </button>
        <button class="tab" ?active=${this._activeTab === "presentation"} @click=${() => {
			this._activeTab = "presentation";
		}}>
          ${E(e, "editor.tabs.presentation")}
        </button>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${this._activeTab === "presentation" ? this._presentationSchema(e) : this._generalSchema(e)}
        .computeLabel=${this._computeLabel(e)}
        @value-changed=${this._valueChanged}
      ></ha-form>
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
				name: "hide_lock_button",
				selector: { boolean: {} }
			},
			{
				name: "additional_dashboards",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "auto",
							label: E(e, "editor.options.additional_dashboards.auto")
						},
						{
							value: "custom",
							label: E(e, "editor.options.additional_dashboards.custom")
						},
						{
							value: "disabled",
							label: E(e, "editor.options.additional_dashboards.disabled")
						}
					]
				} }
			}
		];
	}
	_presentationSchema(e) {
		let t = [{
			value: "horizontal",
			label: E(e, "editor.options.layout_orientation.horizontal")
		}, {
			value: "vertical",
			label: E(e, "editor.options.layout_orientation.vertical")
		}];
		return [
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
						label: E(e, "editor.options.theme.flat")
					}]
				} }
			},
			{
				name: "display_mode",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "classic",
						label: E(e, "editor.options.display_mode.classic")
					}, {
						value: "compact",
						label: E(e, "editor.options.display_mode.compact")
					}]
				} }
			},
			{
				name: "primary_display",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "setpoint",
						label: E(e, "editor.options.primary_display.setpoint")
					}, {
						value: "sensors",
						label: E(e, "editor.options.primary_display.sensors")
					}]
				} }
			},
			{
				name: "state_icons_layout",
				selector: { select: {
					mode: "dropdown",
					options: t
				} }
			}
		];
	}
	_computeLabel(e) {
		return (t) => E(e, `editor.${t.name}`);
	}
	_valueChanged(e) {
		this._config = lt({
			...this._config,
			...e.detail.value
		}), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
};
customElements.get("equinox-card-editor") || customElements.define(Ue, ut);
//#endregion
//#region src/data/actions.ts
var dt = {
	auto_fan_none: "None",
	auto_fan_low: "Low",
	auto_fan_medium: "Medium",
	auto_fan_high: "High",
	auto_fan_turbo: "Turbo"
};
function D(e) {
	return e.viewModel?.vt?.lock.isUserLocked === !0;
}
function O() {
	return {
		ok: !1,
		error: "locked"
	};
}
function k() {
	return {
		ok: !1,
		error: "unsupported"
	};
}
function ft() {
	return {
		ok: !1,
		error: "invalid_payload"
	};
}
async function A(e, t, n, r) {
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
function pt(e) {
	return typeof e == "number" && Number.isFinite(e);
}
async function mt(e, t) {
	return D(e) ? O() : pt(t.targetTempLow) && pt(t.targetTempHigh) ? A(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		target_temp_low: t.targetTempLow,
		target_temp_high: t.targetTempHigh
	}) : pt(t.temperature) ? A(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		temperature: t.temperature
	}) : ft();
}
async function ht(e, t) {
	return D(e) ? O() : e.viewModel?.climate.hvacModes.includes(t) ? A(e, "climate", "set_hvac_mode", {
		entity_id: e.entityId,
		hvac_mode: t
	}) : k();
}
async function gt(e, t) {
	return D(e) ? O() : e.viewModel?.climate.presetModes.includes(t) ? A(e, "climate", "set_preset_mode", {
		entity_id: e.entityId,
		preset_mode: t
	}) : k();
}
async function _t(e, t) {
	return D(e) ? O() : e.viewModel?.climate.fanModes.includes(t) ? A(e, "climate", "set_fan_mode", {
		entity_id: e.entityId,
		fan_mode: t
	}) : k();
}
async function vt(e, t, n) {
	return D(e) ? O() : !e.viewModel?.vt?.isVt || !e.viewModel.vt.timedPresetManager ? k() : !Number.isInteger(n) || n < 1 || n > 1440 || t.trim() === "" ? ft() : A(e, "versatile_thermostat", "set_timed_preset", {
		entity_id: e.entityId,
		preset: t,
		duration_minutes: n
	});
}
async function yt(e) {
	return D(e) ? O() : e.viewModel?.vt?.timedPreset.isActive ? A(e, "versatile_thermostat", "cancel_timed_preset", { entity_id: e.entityId }) : k();
}
async function bt(e, t) {
	if (D(e)) return O();
	if (!e.viewModel?.vt?.fan.hasAutoFan) return k();
	let n = dt[t];
	return n ? A(e, "versatile_thermostat", "set_auto_fan_mode", {
		entity_id: e.entityId,
		auto_fan_mode: n
	}) : ft();
}
async function xt(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return k();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), A(e, "versatile_thermostat", "lock", n);
}
async function St(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return k();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), A(e, "versatile_thermostat", "unlock", n);
}
//#endregion
//#region src/data/fan.ts
var Ct = {
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
	focus: "mdi:fan-chevron-up",
	Focus: "mdi:fan-chevron-up",
	FAN_FOCUS: "mdi:fan-chevron-up",
	diffuse: "mdi:fan-chevron-down",
	Diffuse: "mdi:fan-chevron-down",
	FAN_DIFFUSE: "mdi:fan-chevron-down",
	auto_fan_turbo: "mdi:fan",
	Turbo: "mdi:fan"
}, wt = [
	"auto_fan_none",
	"auto_fan_low",
	"auto_fan_medium",
	"auto_fan_high",
	"auto_fan_turbo"
], Tt = o`
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
`, Et = o`
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
`, Dt = class extends T {
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
		super.disconnectedCallback(), document.removeEventListener("keydown", this._handleKeyDown), window.removeEventListener("resize", this._handleResize), window.removeEventListener("scroll", this._handleScroll, !0);
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
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
		this.open && this.floating && this.updateComplete.then(() => this._positionPopover());
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
		if (!this.open) return C;
		let e = E(this.language, "dialog.close"), t = E(this.language, "dialog.back"), n = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "", r = ["panel", this.floating ? "popover" : ""].filter(Boolean).join(" ");
		return S`
      <div class=${this.floating ? "scrim popover" : "scrim"} @click=${this._dispatchClose}></div>
      <div class=${r} style=${n} @click=${(e) => e.stopPropagation()} @mouseleave=${this.closeOnLeave ? this._dispatchClose : void 0}>
        <div class="header">
          ${this.showBack ? S`
                <ha-icon-button class="back-btn" .label=${t} @click=${this._dispatchBack}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </ha-icon-button>
              ` : C}
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
customElements.get("eq-dialog") || customElements.define("eq-dialog", Dt);
//#endregion
//#region src/components/eq-fan-dialog.ts
var Ot = class extends T {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
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
      background: rgba(128, 128, 128, 0.10);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fan-option[active] .fan-option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
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
      background: rgba(128, 128, 128, 0.10);
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
	_getOptions() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? wt : this.viewModel?.climate.fanModes ?? [];
	}
	_getActiveMode() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? this.viewModel.vt.fan.currentAutoFanMode : this.viewModel?.climate.fanMode;
	}
	_fanIcon(e) {
		return Ct[e] ?? "mdi:fan";
	}
	_fanLabel(e) {
		let t = E(this.language, `main.fan.${e}`);
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
		this.viewModel?.vt?.fan.hasAutoFan === !0 ? await bt(t, e) : await _t(t, e), this._dispatchClose();
	}
	render() {
		let e = this._getOptions(), t = this._getActiveMode(), n = E(this.language, "dialog.fan.title");
		return S`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <!-- Desktop: horizontal grid of icon buttons -->
        <div class="fan-desktop">
          <div class="fan-grid">
            ${e.map((e) => S`
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
          ${e.map((e) => S`
              <ha-md-list-item
                type="button"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
              >
                <span class="option-icon" slot="start">
                  <ha-icon .icon=${this._fanIcon(e)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${this._fanLabel(e)}</span>
                ${e === t ? S`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : C}
              </ha-md-list-item>
            `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-fan-dialog") || customElements.define("eq-fan-dialog", Ot);
//#endregion
//#region src/components/eq-hvac-dialog.ts
var kt = [
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
], At = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, jt = {
	heat: "heat",
	cool: "cool",
	dry: "cool",
	fan_only: "auto",
	off: "off"
}, Mt = class extends T {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
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

    .option-row[active]:has(.option-icon[tone="off"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--disabled-text-color, rgba(128, 128, 128, 0.5)) 22%);
    }

    .option-row[active] .option-icon {
      background: transparent;
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
	_getOptions() {
		let e = this.viewModel?.climate.hvacModes ?? [];
		return kt.filter((t) => e.includes(t) && At[t]);
	}
	_modeLabel(e) {
		let t = E(this.language, `main.hvac.${e}`);
		return t === `main.hvac.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectMode(e) {
		!this.hass || !this.config || (await ht({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.hvacMode, n = E(this.language, "dialog.hvac.title");
		return S`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="option-grid option-desktop">
          ${e.map((e) => S`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
              >
                <span class="option-icon" tone=${jt[e] ?? ""}>
                  <ha-icon .icon=${At[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._modeLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => S`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectMode(e)}>
                  <span class="option-icon" tone=${jt[e] ?? ""} slot="start">
                    <ha-icon .icon=${At[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._modeLabel(e)}</span>
                  ${e === t ? S`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : C}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-hvac-dialog") || customElements.define("eq-hvac-dialog", Mt);
//#endregion
//#region src/components/eq-preset-dialog.ts
var Nt = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], Pt = {
	frost: "mdi:snowflake",
	eco: "mdi:tree-outline",
	away: "mdi:home-export-outline",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:sleep",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Ft = class extends T {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			language: {},
			floating: { type: Boolean },
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
	_getOptions() {
		let e = this.viewModel?.climate.presetModes ?? [], t = this.viewModel?.climate.hvacMode;
		return Nt.filter((n) => e.includes(n) && Pt[n] && n !== "none" && !(n === "frost" && t !== "heat"));
	}
	_presetLabel(e) {
		let t = E(this.language, `main.preset.${e}`);
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
		!this.hass || !this.config || (await gt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.presetMode, n = E(this.language, "dialog.preset.title");
		return S`
      <eq-dialog
        .open=${this.open}
        .title=${n}
        .language=${this.language}
        .floating=${this.floating}
        .anchor=${this.anchor}
        @eq-dialog-close=${this._dispatchClose}
      >
        <div class="option-grid option-desktop">
          ${e.map((e) => S`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectPreset(e)}
              >
                <span class="option-icon" tone=${this._presetTone(e)}>
                  <ha-icon .icon=${Pt[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._presetLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => S`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectPreset(e)}>
                  <span class="option-icon" tone=${this._presetTone(e)} slot="start">
                    <ha-icon .icon=${Pt[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._presetLabel(e)}</span>
                  ${e === t ? S`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : C}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-preset-dialog") || customElements.define("eq-preset-dialog", Ft);
//#endregion
//#region src/components/eq-menu-dialog.ts
var It = class extends T {
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
		return this.config?.additional_dashboards !== "disabled";
	}
	_showBoost() {
		return this.viewModel?.vt?.timedPreset.isActive === !0 || !!this.viewModel?.vt?.timedPresetManager;
	}
	render() {
		let e = this._showRegulation(), t = this._showBoost(), n = this.viewModel?.vt?.timedPreset.isActive === !0, r = this.viewModel?.vt?.timedPreset.remainingTimeMin, i = E(this.language, "dialog.menu.title");
		return S`
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
          ${e ? S`
                <ha-md-list-item type="button" @click=${() => this._dispatchAndClose("equinox-open-regulation")}>
                  <span class="option-icon" slot="start">
                    <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${E(this.language, "dialog.menu.regulation")}</span>
                  <span class="option-trailing" slot="end">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </ha-md-list-item>
              ` : C}

          ${t ? S`
                <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-boost")}>
                  <span class="option-icon" tone=${n ? "boost" : ""} slot="start">
                    <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${E(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing" slot="end">
                    ${n && typeof r == "number" ? S`<span class="boost-time">${r} min</span>` : S`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </ha-md-list-item>
              ` : C}

          <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon" slot="start">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${E(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing" slot="end">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </ha-md-list-item>
        </ha-md-list>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-menu-dialog") || customElements.define("eq-menu-dialog", It);
//#endregion
//#region src/components/eq-boost-dialog.ts
var Lt = 60, Rt = [
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
], zt = class extends T {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1, this._durationMinutes = Lt;
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
      --boost-wheel-size: clamp(74px, min(32vw, 20vh), 136px);
      display: grid;
      grid-template-rows: var(--boost-wheel-size) minmax(34px, 40px);
      align-content: center;
      align-items: center;
      gap: clamp(5px, 1.4vh, 12px);
      justify-items: center;
      min-width: 210px;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .boost-wheel-shell {
      width: var(--boost-wheel-size);
      height: var(--boost-wheel-size);
      max-width: 100%;
      display: grid;
      place-items: center;
      position: relative;
    }

    .boost-wheel {
      grid-area: 1 / 1;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 0;
      --clear-background-color: var(--equinox-card-bg, var(--card-background-color, #111820));
      --control-circular-slider-color: var(--equinox-boost-color, #b06cff);
      --control-circular-slider-background: var(--disabled-color, #5e6975);
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
      color: var(--equinox-boost-color, #b06cff);
      font-size: clamp(22px, calc(var(--boost-wheel-size) * 0.23), 36px);
      font-weight: 700;
      letter-spacing: 0;
    }

    .wheel-unit {
      margin-top: clamp(4px, calc(var(--boost-wheel-size) * 0.04), 8px);
      color: var(--primary-text-color, #fff);
      font-size: clamp(16px, calc(var(--boost-wheel-size) * 0.12), 25px);
      font-weight: 600;
    }

    .wheel-unit:empty {
      display: none;
    }

    .action-button {
      width: min(100%, 300px);
      min-height: 34px;
      height: 100%;
      max-height: 40px;
      border: 0;
      border-radius: var(--equinox-control-radius, 8px);
      background: var(--equinox-boost-color, #b06cff);
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-size: clamp(13px, 1.9vh, 15px);
      font-weight: 600;
    }

    .action-button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    @media (min-width: 601px) {
      .action-button {
        max-width: 160px;
      }
    }

    @media (max-width: 600px) {
      .boost-body {
        --boost-wheel-size: clamp(72px, min(42vw, 20vh), 148px);
        min-width: 0;
        padding-top: 16px;
      }
    }
  `;
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
		Rt.includes(e) && (this._durationMinutes = e);
	}
	_onDurationChange(e) {
		let t = Number(e.detail.value);
		Number.isFinite(t) && this._setDuration(Rt[Math.round(t)] ?? Lt);
	}
	async _startBoost() {
		if (!this.hass || !this.config) return;
		let e = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		(this._hasTimedPreset() ? await vt(e, "boost", this._durationMinutes) : await gt(e, "boost")).ok && this._dispatchClose();
	}
	async _stopBoost() {
		!this.hass || !this.config || (await yt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		})).ok && this._dispatchClose();
	}
	_durationIndex(e) {
		let t = Rt.indexOf(e);
		return t >= 0 ? t : Rt.reduce((t, n, r) => Math.abs(n - e) < Math.abs(Rt[t] - e) ? r : t, 0);
	}
	_formatDuration(e) {
		if (e < 60) return {
			value: `${e}${E(this.language, "dialog.boost.minutes")}`,
			unit: ""
		};
		if (e % 60 == 0) return {
			value: `${e / 60}${E(this.language, "dialog.boost.hours")}`,
			unit: ""
		};
		let t = Math.floor(e / 60), n = e % 60;
		return {
			value: `${t}${E(this.language, "dialog.boost.hours")}${n}`,
			unit: ""
		};
	}
	render() {
		let e = E(this.language, "dialog.boost.title"), t = this.viewModel?.vt?.timedPreset, n = t?.isActive === !0, r = this._isDisabled(), i = this._hasTimedPreset(), a = n && typeof t?.remainingTimeMin == "number" ? t.remainingTimeMin : this._durationMinutes, o = this._formatDuration(a);
		return S`
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
        <div class="boost-body">
          ${i ? S`
                <div class="boost-wheel-shell">
                  <ha-control-circular-slider
                    class="boost-wheel"
                    .mode=${"start"}
                    .min=${0}
                    .max=${Rt.length - 1}
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
              ` : C}
          <button class="action-button" ?disabled=${r || n && !i} @click=${n ? this._stopBoost : this._startBoost}>
            ${E(this.language, n ? "dialog.boost.stop" : "dialog.boost.start")}
          </button>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-boost-dialog") || customElements.define("eq-boost-dialog", zt);
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/css-tag.js
var Bt = globalThis, Vt = Bt.ShadowRoot && (Bt.ShadyCSS === void 0 || Bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), Ut = /* @__PURE__ */ new WeakMap(), Wt = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (Vt && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Ut.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ut.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, Gt = (e) => new Wt(typeof e == "string" ? e : e + "", void 0, Ht), Kt = (e, ...t) => new Wt(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Ht), qt = (e, t) => {
	if (Vt) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = Bt.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, Jt = Vt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return Gt(t);
})(e) : e, { is: Yt, defineProperty: Xt, getOwnPropertyDescriptor: Zt, getOwnPropertyNames: Qt, getOwnPropertySymbols: $t, getPrototypeOf: en } = Object, tn = globalThis, nn = tn.trustedTypes, rn = nn ? nn.emptyScript : "", an = tn.reactiveElementPolyfillSupport, on = (e, t) => e, sn = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? rn : null;
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
}, cn = (e, t) => !Yt(e, t), ln = {
	attribute: !0,
	type: String,
	converter: sn,
	reflect: !1,
	useDefault: !1,
	hasChanged: cn
};
Symbol.metadata ??= Symbol("metadata"), tn.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var un = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ln) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && Xt(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = Zt(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? ln;
	}
	static _$Ei() {
		if (this.hasOwnProperty(on("elementProperties"))) return;
		let e = en(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(on("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(on("properties"))) {
			let e = this.properties, t = [...Qt(e), ...$t(e)];
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
			for (let e of n) t.unshift(Jt(e));
		} else e !== void 0 && t.push(Jt(e));
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
		return qt(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? sn : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? sn : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? cn)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
un.elementStyles = [], un.shadowRootOptions = { mode: "open" }, un[on("elementProperties")] = /* @__PURE__ */ new Map(), un[on("finalized")] = /* @__PURE__ */ new Map(), an?.({ ReactiveElement: un }), (tn.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../ha-better-history/node_modules/lit-html/lit-html.js
var dn = globalThis, fn = (e) => e, pn = dn.trustedTypes, mn = pn ? pn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, hn = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, gn = "?" + j, _n = `<${gn}>`, vn = document, yn = () => vn.createComment(""), bn = (e) => e === null || typeof e != "object" && typeof e != "function", xn = Array.isArray, Sn = (e) => xn(e) || typeof e?.[Symbol.iterator] == "function", Cn = "[ 	\n\f\r]", wn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tn = /-->/g, En = />/g, Dn = RegExp(`>|${Cn}(?:([^\\s"'>=/]+)(${Cn}*=${Cn}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), On = /'/g, kn = /"/g, An = /^(?:script|style|textarea|title)$/i, jn = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), M = jn(1), N = jn(2), Mn = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), Nn = /* @__PURE__ */ new WeakMap(), F = vn.createTreeWalker(vn, 129);
function Pn(e, t) {
	if (!xn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return mn === void 0 ? t : mn.createHTML(t);
}
var Fn = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = wn;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === wn ? c[1] === "!--" ? o = Tn : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = Dn) : (An.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = Dn) : o = En : o === Dn ? c[0] === ">" ? (o = i ?? wn, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? Dn : c[3] === "\"" ? kn : On) : o === kn || o === On ? o = Dn : o === Tn || o === En ? o = wn : (o = Dn, i = void 0);
		let d = o === Dn && e[t + 1].startsWith("/>") ? " " : "";
		a += o === wn ? n + _n : l >= 0 ? (r.push(s), n.slice(0, l) + hn + n.slice(l) + j + d) : n + j + (l === -2 ? t : d);
	}
	return [Pn(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, In = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Fn(t, n);
		if (this.el = e.createElement(l, r), F.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = F.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(hn)) {
					let t = u[o++], n = i.getAttribute(e).split(j), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Vn : r[1] === "?" ? Hn : r[1] === "@" ? Un : Bn
					}), i.removeAttribute(e);
				} else e.startsWith(j) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (An.test(i.tagName)) {
					let e = i.textContent.split(j), t = e.length - 1;
					if (t > 0) {
						i.textContent = pn ? pn.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], yn()), F.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], yn());
					}
				}
			} else if (i.nodeType === 8) if (i.data === gn) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(j, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += j.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = vn.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Ln(e, t, n = e, r) {
	if (t === Mn) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = bn(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Ln(e, i._$AS(e, t.values), i, r)), t;
}
var Rn = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? vn).importNode(t, !0);
		F.currentNode = r;
		let i = F.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new zn(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Wn(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = F.nextNode(), a++);
		}
		return F.currentNode = vn, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, zn = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = Ln(this, e, t), bn(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== Mn && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? Sn(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && bn(this._$AH) ? this._$AA.nextSibling.data = e : this.T(vn.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = In.createElement(Pn(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Rn(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Nn.get(e.strings);
		return t === void 0 && Nn.set(e.strings, t = new In(e)), t;
	}
	k(t) {
		xn(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(yn()), this.O(yn()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = fn(e).nextSibling;
			fn(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Bn = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = P;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Ln(this, e, t, 0), a = !bn(e) || e !== this._$AH && e !== Mn, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Ln(this, r[n + o], t, o), s === Mn && (s = this._$AH[o]), a ||= !bn(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Vn = class extends Bn {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, Hn = class extends Bn {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, Un = class extends Bn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Ln(this, e, t, 0) ?? P) === Mn) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Wn = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Ln(this, e);
	}
}, Gn = dn.litHtmlPolyfillSupport;
Gn?.(In, zn), (dn.litHtmlVersions ??= []).push("3.3.2");
var Kn = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new zn(t.insertBefore(yn(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, qn = globalThis, Jn = class extends un {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Kn(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Mn;
	}
};
Jn._$litElement$ = !0, Jn.finalized = !0, qn.litElementHydrateSupport?.({ LitElement: Jn });
var Yn = qn.litElementPolyfillSupport;
Yn?.({ LitElement: Jn }), (qn.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/property.js
var Xn = {
	attribute: !0,
	type: String,
	converter: sn,
	reflect: !1,
	hasChanged: cn
}, Zn = (e = Xn, t, n) => {
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
function I(e) {
	return (t, n) => typeof n == "object" ? Zn(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/state.js
function L(e) {
	return I({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region ../ha-better-history/node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Qn = [
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
], $n = async (e) => {
	let t = e || Qn;
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
}, er = new Set(["unknown", "unavailable"]);
function tr(e) {
	return e == null || typeof e == "string" && er.has(e);
}
function nr(e) {
	if (!(tr(e) || typeof e != "string" || e.trim() === "")) return e;
}
function rr(e) {
	if (tr(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function R() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function z(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function ir(e, t = {}) {
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
var ar = 6e4, or = 3, sr = 350, cr = 360 * 60 * 1e3, lr = 3600 * 1e3, ur = 720 * 60 * 1e3, dr = 2500, fr = 8e3, pr = 15e3, mr = 300, hr = 700, gr = 1100, _r = 80;
function vr(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var yr = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function br(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function xr(e, t) {
	return t.reduce((e, t) => br(e) ? e[t] : void 0, e);
}
function Sr(e) {
	return e[e.length - 1] ?? "";
}
function Cr(e) {
	return e instanceof Error ? e.message : String(e);
}
function wr(e) {
	if (!br(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function Tr(e) {
	if (!br(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function Er(e) {
	if (e instanceof yr) return !0;
	let t = wr(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = Cr(e).toLowerCase(), r = `${Tr(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function Dr(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function Or(e) {
	return new Promise((t) => setTimeout(t, e));
}
function kr(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function Ar(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new yr(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function jr(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function Mr(e) {
	let t = jr(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function Nr(e, t, n) {
	let r = jr(xr(e.attributes, t));
	if (r) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? Sr(t),
		path: t,
		valueType: r
	};
}
function Pr(e, t) {
	return t === "number" ? rr(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : nr(e);
}
function Fr(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return Pr(t.kind === "entity_state" ? e.state ?? e.s : xr(n, t.path ?? []), t.valueType);
}
function Ir(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function Lr(e, t, n) {
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
function Rr(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function zr(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = Fr(i, t), o = Ir(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function Br(e, t, n, r) {
	let i = zr(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var Vr = class {
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
		return i ? Ur(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return Gr(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = Kr([...a.states, ...t]), a.stateCoverage = Hr([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = Hr([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return Zr(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Wr(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function Hr(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function Ur(e, t, n) {
	return Wr(e, t, n) >= n - 1;
}
function Wr(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of Hr(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function Gr(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of Hr(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function Kr(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Ir(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function qr(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= pr || t.requestDurationMs >= gr, i = r || t.stateCount >= fr || t.requestDurationMs >= hr || n >= _r, a = t.stateCount <= dr && t.requestDurationMs <= mr && n <= _r / 2;
	return i && e > lr ? {
		nextChunkMs: Math.max(lr, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < ur ? {
		nextChunkMs: Math.min(ur, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function Jr(e, t, n, r, i, a, o) {
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
async function Yr(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? R() : 0;
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
			let i = await Ar(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(R() - r)
				}
			}), i;
		} catch (e) {
			let i = Er(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: Cr(e),
					durationMs: Math.round(R() - r)
				}
			}), !a) throw e;
			await Or(Dr(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function Xr(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), l = s.filter((e) => !c.has(e)), u = s.filter((e) => c.has(e)), d = o.accumulator ?? new Vr(), f = [], p = Math.max(1, Math.floor(o.chunkTimeoutMs ?? ar)), m = Math.max(1, Math.floor(o.maxChunkAttempts ?? or)), h = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? sr)), g = (e, t) => Yr(t, {
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
		return e + Math.max(1, Math.ceil(n / cr));
	}, 0), ne = _.size + te, re = 0, y = /* @__PURE__ */ new Set(), ie = async (s, c, l) => {
		let u = re;
		if (re += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await kr();
		let f = R(), p = Rr(c, s.entityIds), m = R() - f, h = [...p.values()].reduce((e, t) => e + t.length, 0);
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
		let g = R(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) d.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), y.add(e);
		let ee = R() - g;
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
			await kr();
			let o = R();
			for (let i of t) (_.has(i.entityId) || !ae.has(i.id)) && (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && ae.set(i.id, d.buildSeries(i, e, n, r));
			let s = t.map((e) => ae.get(e.id)).filter((e) => e !== void 0);
			v = R() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: s.length,
					pointCount: s.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(v)
				}
			}), i(s), await kr(120);
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
			run: () => g(i, () => Jr(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: ne,
			attributeChunkHours: cr / 36e5,
			minAttributeChunkHours: lr / 36e5,
			maxAttributeChunkHours: ur / 36e5,
			adaptiveAttributeChunks: v.length > 0,
			cachedSourceCount: t.filter((e) => d.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: p,
			maxChunkAttempts: m,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let ae = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && ae.set(i.id, d.buildSeries(i, e, n, r));
	await ir(f, {
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
	let oe = 0;
	for (let t of v) {
		let n = cr;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: oe
				}
			});
			let l = R(), u = await g(c, () => Jr(e, [t.entityId], i, o, !1, !1, !1)), d = R() - l;
			oe += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: oe
				}
			});
			let f = await ie({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = qr(n, f);
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
	let se = a ? R() : 0, ce = t.map((t) => {
		let i = ae.get(t.id);
		return i && !y.has(t.entityId) ? i : d.buildSeries(t, e, n, r);
	}), b = a ? R() - se : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: ce.length,
			pointCount: ce.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(b)
		}
	}), ce;
}
function Zr(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = Fr(t, e), r = Ir(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: vr(a.length > 0 ? Lr(a, r, i) : Br(n, e, r, i))
	};
}
var Qr = 6e4, $r = 48;
function ei(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function ti(e) {
	return e instanceof Error ? e.message : String(e);
}
function ni(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function ri(e, t) {
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
function ii(e, t) {
	let n = e.findIndex((e) => e.time === t.time);
	if (n !== -1) {
		if (e[n].value === t.value) return e;
		let r = [...e];
		return r[n] = t, r;
	}
	return [...e].reverse().find((e) => e.time < t.time)?.value === t.value ? e : [...e, t].sort((e, t) => e.time - t.time);
}
var ai = class {
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
			accumulator: new Vr()
		};
		return this._session = r, r;
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
		return (e.activeEntityLoads.get(ni(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = ni(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = ni(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = R() - this._lastProgressUpdateMs, n = Math.max(0, $r - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = R(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${t.map((e) => e.id).join("|")}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, !e || t.length === 0) {
			this.series = [], this.loading = !1, this.error = e ? "No sources provided" : "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = R();
		this.series = [], this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && z(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Xr(e, a.sources, n, r, (t) => {
			if (!this._isCurrentSession(a)) return;
			let i = R(), o = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), o);
			for (let e of o) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && z(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(R() - i)
			});
		}, this.debugPerformance ? (e) => {
			z(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: Qr,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && ei(() => {
				if (!this._isCurrentSession(a)) return;
				let s = R(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				ri(this.series, l) || (this.series = l);
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(R() - o),
					updateDurationMs: Math.round(R() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = ti(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(R() - o),
					error: this.error
				});
			}
		});
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(ni(e))), d = R();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t);
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), Xr(e, u, n, r, (t) => {
			if (!this._isCurrentSession(i)) return;
			let a = R(), o = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(o);
			for (let e of o) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(R() - a)
			});
		}, this.debugPerformance ? (e) => {
			z(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: Qr,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && ei(() => {
				if (!this._isCurrentSession(i)) return;
				let a = R(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				ri(this.series, s) || (this.series = s);
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(R() - d),
					mergeDurationMs: Math.round(R() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = ti(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(R() - d),
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
			let r = zr(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = ii(t.points, c);
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
}, oi = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], si = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, ci = new Set(Object.values(si)), li = oi.filter((e) => !ci.has(e));
function ui(e) {
	return li[e % li.length];
}
function di(e) {
	return e.trim().toLowerCase();
}
function fi(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function pi(e, t, n) {
	if (!t.has(di(e))) return e;
	let r = [
		...li.slice(n % li.length),
		...li.slice(0, n % li.length),
		...oi
	];
	for (let e of r) if (!t.has(di(e))) return e;
	let i = n, a = fi(i);
	for (; t.has(di(a));) i += 1, a = fi(i);
	return a;
}
function mi(e) {
	return di(e);
}
var hi = 214;
function gi(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function _i(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function vi(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = yi(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(bi(e, i));
	return c;
}
function yi(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function bi(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function xi(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function Si(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: _i(e - r, n),
			max: _i(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: _i(e - o, n),
		max: _i(t + o, n)
	};
}
function Ci(e) {
	return 28 + (Math.max(e, 1) - 1) * hi + 180 + 18;
}
var wi = .15, Ti = 8;
function Ei(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function Di(e) {
	return (e.min + e.max) / 2;
}
function Oi(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function ki(e, t) {
	let n = Math.abs(Oi(Ei(e)) - Oi(Ei(t))), r = Math.abs(Oi(Di(e)) - Oi(Di(t))), i = e.unit && t.unit && e.unit !== t.unit ? .4 : 0;
	return n + r * .6 + i;
}
function Ai(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i);
	return Math.min(...i.map((e) => e / r)) <= wi && (o / Math.max(a, 1e-9) >= Ti || r / a >= Ti);
}
function ji(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = ki(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function Mi(e) {
	if (!Ai(e)) return [e, []];
	let [t, n] = ji(e), r = [], i = [];
	for (let a of e) a.id === t.id ? r.push(a) : a.id === n.id ? i.push(a) : ki(a, t) <= ki(a, n) ? r.push(a) : i.push(a);
	return [r, i];
}
function Ni(e, t, n, r) {
	let i = Math.min(...n.map((e) => e.min)), a = Math.max(...n.map((e) => e.max)), o = Math.max(...n.map((e) => e.precision)), s = Si(i, a, o), c = vi(s.min, s.max);
	return {
		ids: new Set(n.map((e) => e.id)),
		graphKey: e,
		axis: t,
		min: s.min,
		max: s.max,
		precision: Math.max(o, xi(c)),
		ticks: c,
		top: r,
		height: 180
	};
}
function Pi(e) {
	let t = [];
	for (let [n, r] of e.entries()) {
		if (r.valueType !== "number" && r.valueType !== "boolean") continue;
		let e = r.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = r.scaleMode === "manual" && r.scaleMin !== void 0 ? r.scaleMin : 0, a = r.scaleMode === "manual" && r.scaleMax !== void 0 ? r.scaleMax : 1, o = r.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = r.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = r.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => gi(e))), l = r.valueType === "boolean" ? "group:boolean" : r.scaleGroupKey, u = t.find((e) => e.key === l);
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
		let [n, r] = e.key === "group:boolean" ? [e.series, []] : Mi(e.series), i = 28 + t * hi, a = Ni(e.key, "left", n, i);
		return r.length > 0 ? [a, Ni(e.key, "right", r, i)] : [a];
	});
}
function Fi(e, t, n, r) {
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
function Ii(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Li(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Ri(e, t) {
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
function zi(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		if (!n.id.startsWith("attr:")) continue;
		let e = n.id.split(":");
		if (e.length < 3) continue;
		let r = e[1], i = e.slice(2).join(":");
		t.has(r) || t.set(r, {});
		let a = t.get(r);
		i === "current_temperature" || i === "temperature" ? a.temp = n.id : i === "hvac_action" && (a.hvac = n.id);
	}
	for (let [, e] of t) if (e.temp && e.hvac) return {
		tempId: e.temp,
		hvacId: e.hvac
	};
}
function Bi(e, t, n) {
	let r = zi(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Vi(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Ri(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Ri(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${Ii(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${Ii(e.time, n).toFixed(1)},${Li(e.value, o).toFixed(1)}`),
			`${Ii(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Vi(e, t) {
	let n = Date.now();
	return e.flatMap((r, i) => {
		let a = Math.max(r.time, t.start), o = Math.min(e[i + 1]?.time ?? t.end, t.end, n);
		return o > a ? [{
			start: a,
			end: o,
			value: r.value
		}] : [];
	});
}
var Hi = 16;
function B(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function V(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Ui(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function Wi(e, t) {
	let n = Date.now();
	return e.points.flatMap((r, i) => {
		let a = Math.max(r.time, t.start), o = Math.min(e.points[i + 1]?.time ?? t.end, t.end, n);
		return o > a ? [{
			start: a,
			end: o,
			value: r.value
		}] : [];
	});
}
var Gi = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function Ki(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return Gi.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, oi[(r + n.size) % oi.length]), n.get(i));
}
function qi(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Ji(e, t, n) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let r = Ui(e, t);
		if (!r) return [];
		let i = Fi(Yi(e.points, n, e.lineMode), n, 40, 640), { points: a, pathLength: o } = e.lineMode === "line" ? ta(i, n, r) : ea(i, n, r);
		return [{
			id: e.id,
			color: e.color,
			points: a,
			pathLength: o,
			lineWidth: e.lineWidth
		}];
	});
}
function Yi(e, t, n) {
	let r = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), i = r.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return i;
	let a = [...r].reverse().find((e) => e.time < t.start), o = a && (i.length === 0 || i[0].time > t.start) ? [{
		time: t.start,
		value: a.value
	}, ...i] : i, s = o[o.length - 1];
	return s && s.time < t.end ? [...o, {
		time: t.end,
		value: s.value
	}] : o;
}
function Xi(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function Zi(e, t, n) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let r = Ui(e, t);
		if (!r) return [];
		let i = V(Xi(r), r);
		return Wi(e, n).flatMap((t, a) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = B(t.start, n), c = B(t.end, n), l = V(o, r), u = Math.max(c - s, 1);
			return [{
				id: `${e.id}:${a}`,
				x: s,
				y: Math.min(l, i),
				width: u,
				height: Math.max(Math.abs(i - l), 1),
				fill: e.color
			}];
		});
	});
}
function Qi(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return Wi(e, n).reduce((n, r) => {
			let i = Ki(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = B(t.start, n), o = Math.max(B(t.end, n) - i, 1);
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
function $i(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: na(n, e.precision)
		}));
	});
}
function ea(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${B(e[0].time, t).toFixed(1)},${V(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = B(o.time, t), l = V(o.value, n), u = B(s.time, t), d = V(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function ta(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = B(e.time, t), o = V(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function na(e, t) {
	if (t <= 0 && Number.isInteger(e)) return String(e);
	let n = e.toFixed(t);
	return n = n.replace(/\.?0+$/, ""), n;
}
var ra = 60 * 1e3, H = 60 * ra, U = 24 * H, ia = [
	10 * ra,
	15 * ra,
	20 * ra,
	30 * ra,
	H,
	2 * H,
	3 * H,
	4 * H,
	6 * H,
	8 * H,
	12 * H,
	U,
	2 * U,
	3 * U,
	7 * U,
	14 * U,
	30 * U,
	60 * U,
	90 * U
];
function aa(e, t) {
	for (let n of ia) if (e / n <= t) return n;
	return ia[ia.length - 1];
}
function oa(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = aa(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function sa(e, t) {
	let n = new Date(e), r = t / U;
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
function ca(e, t) {
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
function la(e, t) {
	return e.map((e) => ({
		...e,
		points: ca(e.points, t)
	}));
}
function ua(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function da(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = ua(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = ua(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => la(r.get(e) ?? t, n));
}
function fa(e, t, n, r = !1, i = 12) {
	let a = Pi(da(e, t, n)), o = new Set(a.map((e) => e.graphKey)).size, s = Ci(o), c = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, l = oa(n.start, n.end, i), u = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		numericScales: a,
		plotBottom: s,
		chartHeight: qi(s, c),
		numericLines: Ji(t, a, n),
		numericColumns: Zi(t, a, n),
		segments: Qi(t, s, n),
		heatingAreas: r ? [] : Bi(t, a, n),
		yAxisLabels: $i(a),
		xAxisLabels: l.map((e) => ({
			x: B(e.time, n),
			label: sa(e.time, u),
			bold: e.bold
		}))
	};
}
function pa(e, t, n) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let r = Ui(e, t);
		if (!r) return [];
		let i = {
			...r,
			top: 28
		}, a = Fi(Yi(e.points, n, e.lineMode), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? ta(a, n, i) : ea(a, n, i);
		return {
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		};
	});
}
function ma(e, t, n) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let r = Ui(e, t);
		if (!r) return [];
		let i = {
			...r,
			top: 28
		}, a = V(Xi(i), i);
		return Wi(e, n).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = B(t.start, n), c = B(t.end, n), l = V(o, i);
			return [{
				id: `${e.id}:${r}`,
				x: s,
				y: Math.min(l, a),
				width: Math.max(c - s, 1),
				height: Math.max(Math.abs(a - l), 1),
				fill: e.color
			}];
		});
	});
}
function ha(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return Wi(e, n).reduce((t, n) => {
			let i = Ki(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = B(t.start, n), o = Math.max(B(t.end, n) - a, 1);
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
function ga(e) {
	let t = e.height - 10;
	return e.ticks.map((n) => ({
		y: 33 + t - (n - e.min) / (e.max - e.min) * t,
		value: na(n, e.precision)
	}));
}
function _a(e, t) {
	return t === 0 ? e : e.split(" ").map((e) => {
		let [n, r] = e.split(",");
		return `${n},${(parseFloat(r) + t).toFixed(1)}`;
	}).join(" ");
}
function va(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = pi(e.color, r, n * oi.length + t);
			return r.add(mi(a)), i.set(e.id, a), a === e.color ? e : {
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
function ya(e, t = 12) {
	let n = [], r = e.timeBounds, i = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), a = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = r.end - r.start, s = oa(r.start, r.end, t).map((e) => ({
		x: B(e.time, r),
		label: sa(e.time, o),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && i.length > 0) {
		let e = a.length, t = 208 + (e > 0 ? 10 + e * 14 : 0) + 18, o = t + Hi, c = va(i, a, 0);
		n.push({
			series: c.visibleSeries,
			allSeries: c.allSeries,
			scales: [],
			svgHeight: t,
			canvasHeight: o,
			lines: [],
			columns: [],
			segments: ha(c.visibleSeries, 218, r),
			yLabels: [],
			rightYLabels: [],
			xLabels: s,
			heatingAreas: []
		});
	}
	let c = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < c.length; t++) {
		let o = c[t], l = e.numericScales.filter((e) => e.graphKey === o), u = l.find((e) => e.axis === "left") ?? l[0], d = l.find((e) => e.axis === "right"), f = new Set(l.flatMap((e) => [...e.ids])), p = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && ua(e) === o), m = e.visibleSeries.filter((e) => f.has(e.id)), h = t === 0 ? [...m, ...a] : m, g = va(t === 0 ? [...p, ...i] : p, h, t), _ = g.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), ee = _.length, v = 208 + (ee > 0 ? 10 + ee * 14 : 0) + 18, te = v + Hi, ne = 28 - u.top;
		n.push({
			series: g.visibleSeries,
			allSeries: g.allSeries,
			scale: u,
			scales: l,
			svgHeight: v,
			canvasHeight: te,
			lines: pa(g.visibleSeries, l, r),
			columns: ma(g.visibleSeries, l, r),
			segments: ha(_, 218, r),
			yLabels: ga(u),
			rightYLabels: d ? ga(d) : [],
			xLabels: s,
			heatingAreas: t === 0 ? e.heatingAreas.map((e) => ({
				id: e.id,
				points: _a(e.points, ne)
			})) : []
		});
	}
	return n;
}
var ba = class {
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
		if (this.tooltip?.time === i && this.tooltip.activeTop === e.activeTop && this.tooltip.activeHeight === e.activeHeight && this.tooltip.activeKey === e.activeKey && Math.abs(this.tooltip.tooltipX - Math.min(Math.max(e.x, 120), 600)) < 1 && Math.abs(this.tooltip.y - this._tooltipY(e)) < 1 && this.tooltip.placement === this._placement(e)) return;
		let o = Math.min(Math.max(e.x, 120), 600), s = this._tooltipY(e);
		this.tooltip = {
			x: B(i, this._timeBounds),
			tooltipX: o,
			y: s,
			placement: this._placement(e),
			activeTop: e.activeTop,
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
		let o = a.top - i.top;
		return {
			x: (e.clientX - a.left) / a.width * 720,
			y: e.clientY - i.top,
			activeTop: o,
			activeHeight: a.height,
			activeIds: r,
			activeKey: [...r].join("|"),
			touchLike: e.pointerType === "touch" || window.matchMedia("(hover: none) and (pointer: coarse)").matches
		};
	}
	renderTooltip() {
		if (!this.tooltip) return P;
		let e = this.tooltip.x / 720 * 100, t = this.tooltip.tooltipX / 720 * 100, n = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return M`
      <div class="tooltip-axis-pointer" style=${`left:${e}%;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${t}%,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${n};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => M`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, xa = "temperature";
function Sa(e) {
	return e.join(".");
}
function Ca(e) {
	return e?.toLowerCase() === xa;
}
function wa(e, t) {
	if (!e || !t) return;
	let n = t[Sa(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function Ta(e) {
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
var Ea = 24, Da = "2.5", Oa = [
	"current_temperature",
	"temperature",
	"hvac_action"
], ka = /°[CF]|[CFK]$/;
function Aa(e) {
	return ka.test(e);
}
function ja(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function Ma(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function Na(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function Pa(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function Fa(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : Da : typeof e == "string" && e.trim() !== "" ? e.trim() : Da;
}
function Ia(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function La(e) {
	return e[e.length - 1] ?? "";
}
function Ra(e, t, n) {
	let r = e?.states[t];
	return r ? n ? Nr(r, n)?.valueType ?? "string" : Mr(r)?.valueType ?? "string" : "number";
}
function za(e, t, n, r) {
	if (r) return r;
	if (n) return La(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Ba(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return wa(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Va(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Ha(e, t, n, r, i, a) {
	let o = Na(e.attribute), s = Ia(e.entity, o), c = Ra(n, e.entity, o), l = Ba(n, e.entity, o, e.unit, r);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		label: za(n, e.entity, o, e.label),
		color: e.color ?? ui(t),
		unit: l,
		scaleGroupKey: Va(s, l, e.scaleGroup, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		lineMode: Pa(e.lineMode ?? i),
		lineWidth: Fa(e.lineWidth ?? a),
		valueType: c
	};
}
function Ua(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			label: e,
			color: ui(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			lineMode: Pa(r),
			lineWidth: Fa(i),
			valueType: "number"
		};
	}
	let o = Mr(a);
	if (o) return {
		id: o.id,
		entity: e,
		label: o.label,
		color: ui(t),
		unit: o.unit,
		scaleGroupKey: Va(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		lineMode: Pa(r),
		lineWidth: Fa(i),
		valueType: o.valueType
	};
}
function Wa(e, t) {
	let n = t?.states[e];
	if (!n) return;
	let r = n.attributes, i = r.temperature_unit;
	if (typeof i == "string" && i !== "") return i;
	let a = r.unit_of_measurement;
	if (typeof a == "string" && a !== "") return a;
}
function Ga(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Wa(e.entity, n);
	return [e, ...Oa.map((i) => {
		let a = [i], o = Ia(e.entity, a), s = Ra(n, e.entity, a), c = si[i] ?? ui(t()), l = i === "current_temperature" || i === "temperature" ? r : void 0, u = i === "hvac_action" ? void 0 : "temperature";
		return {
			id: o,
			entity: e.entity,
			attribute: a,
			label: i,
			color: c,
			unit: l,
			scaleGroupKey: Va(o, l, u, s),
			scaleMode: "auto",
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: s
		};
	})];
}
function Ka(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && Aa(e.unit))?.unit ?? e.find((e) => e.unit && Aa(e.unit))?.unit;
}
function qa(e) {
	let t = Ka(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = Ca(e.unit), i = r && t ? t : e.unit, a = r && i && e.scaleGroupKey === "unit:temperature" ? `unit:${i}` : e.scaleGroupKey;
		return n && e.valueType === "number" && i && Aa(i) && a.startsWith("unit:") && !ja(e) && (a = "group:temperature"), i !== e.unit || a !== e.scaleGroupKey ? {
			...e,
			unit: i,
			scaleGroupKey: a
		} : e;
	});
}
function Ja(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? Ea, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Ha(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Ua(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => Ga(e, () => u++, n)), l = qa(l), {
		startDate: Ma(o),
		endDate: Ma(i),
		showDatePicker: t?.showDatePicker ?? e.showDatePicker ?? !1,
		showEntityPicker: t?.showEntityPicker ?? e.showEntityPicker ?? !1,
		showLegend: t?.showLegend ?? e.showLegend ?? !0,
		showTooltip: t?.showTooltip ?? e.showTooltip ?? !0,
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
var Ya = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back"
}, Xa = {
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
		export_data: "Export"
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
		export_data: "Exporter"
	}
};
function W(e, t) {
	let n = Ya[t];
	return n && e?.localize ? e.localize(n) : Xa[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? Xa.en?.[t] ?? t;
}
var Za = Kt`
  :host {
    display: flex;
    flex-direction: column;
    min-height: 360px;
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
    position: relative;
    overflow-y: auto;
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
    stroke-width: 2.5;
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

  .graph-canvas {
    position: relative;
    overflow: hidden;
  }

  .graph-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
    padding: 0 6px 8px 6px;
    font-size: 12px;
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
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
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    width: 100%;
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
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    align-items: end;
    margin-bottom: 8px;
    padding: 7px 8px;
    border: 1px solid var(--better-history-border-color, var(--divider-color, #444));
    border-radius: var(--better-history-radius, 8px);
    background: color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 96%, var(--primary-text-color, #fff) 4%);
  }

  .tool-range {
    min-width: 0;
  }

  .tool-range-head,
  .tool-actions,
  .range-values {
    display: flex;
    align-items: center;
  }

  .tool-range-head {
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 2px;
  }

  .tool-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 11px;
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
    height: 24px;
    display: flex;
    align-items: center;
    padding: 0 2px;
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
    top: 50%;
    width: max(36px, 8%);
    height: 22px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--better-history-info-color, var(--info-color, var(--primary-color, #03a9f4))) 8%, transparent);
    cursor: grab;
    pointer-events: auto;
    touch-action: none;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .range-selection-hit::before {
    left: 12px;
    right: 12px;
    opacity: 0.42;
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
    height: 24px;
    background: transparent;
  }

  .range-slider::-moz-range-track {
    height: 24px;
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
    pointer-events: auto;
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
    pointer-events: auto;
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
  }

  .mode-button:last-child {
    border-right: 0;
  }

  .tool-action-button {
    gap: 5px;
    height: 32px;
    padding: 0 8px;
    border-radius: var(--better-history-radius, 8px);
    color: var(--better-history-text-color, var(--primary-text-color, #fff));
    font-size: 12px;
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
      justify-content: space-between;
    }

    .range-slider-stack,
    .range-slider::-webkit-slider-runnable-track,
    .range-slider::-moz-range-track {
      height: 30px;
    }

    .range-selection {
      height: 18px;
    }

    .range-selection-hit {
      width: max(44px, 12%);
      height: 30px;
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
    flex: 0 0 auto;
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
    flex: 1 1 0;
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .entity-trigger {
    width: 100%;
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

  .entity-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    width: 100%;
  }

  .entity-menu {
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

  .entity-menu[open] {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 8px;
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

  .source-chip.entity-source-chip {
    border-color: var(--ha-color-green-80, #81c784);
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
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 20%, transparent);
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

  .entity-browser-entry-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-browser-entry-type,
  .entity-browser-entry-arrow {
    color: var(--better-history-muted-color, var(--secondary-text-color, #888));
    font-size: 11px;
    flex-shrink: 0;
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
    color: var(--ha-color-green-80, #81c784);
    border-color: color-mix(in srgb, var(--ha-color-green-80, #81c784) 62%, var(--better-history-border-color, var(--divider-color, #444)));
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 14%, transparent);
    box-shadow: inset 3px 0 0 var(--ha-color-green-80, #81c784);
  }

  .entity-browser-entity--present:hover {
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 14%, transparent);
  }

  .entity-browser-entity--removable {
    cursor: pointer;
  }

  .entity-browser-entity--removable:hover {
    background: color-mix(in srgb, var(--ha-color-green-80, #81c784) 22%, transparent);
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
`, Qa = [
	"ha-icon",
	"ha-icon-button",
	"ha-svg-icon",
	"ha-entity-picker",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip",
	"ha-assist-chip",
	"ha-generic-picker"
], $a;
function eo() {
	return $a ??= $n(Qa), $a;
}
var to;
function no() {
	return to ??= ro(), to;
}
async function ro() {
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
function io() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function ao() {
	await no();
}
function oo(e, t, n, r) {
	return M`
    <div class="date-picker-wrapper">
      <ha-date-range-picker
        .hass=${e}
        .startDate=${t}
        .endDate=${n}
        time-picker
        extended-presets
        @value-changed=${(e) => {
		let t = e.detail, n = t.value?.startDate ?? t.startDate, i = t.value?.endDate ?? t.endDate;
		n instanceof Date && i instanceof Date && r(n, i);
	}}
      ></ha-date-range-picker>
    </div>
  `;
}
function so(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function co(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
var lo = !1;
async function uo() {
	lo || (lo = !0, await eo());
}
function fo() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function po(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0;
	return M`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? co(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${_o(e)}
      </div>
      <ha-generic-picker
        class="entity-trigger"
        .hass=${e.hass}
        .addButtonLabel=${W(e.hass, "add_target")}
        .value=${""}
        .getItems=${e.getItems}
        .getAdditionalItems=${e.getAdditionalItems}
        @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
      ></ha-generic-picker>
      ${e.loading ? M`
            <div class="history-loading-indicator" role="status" aria-label=${W(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${W(e.hass, "loading")}</span>
            </div>
          ` : P}
      ${e.selectedSources.length > 0 ? M`
        <div class="entity-row">
          ${e.selectedSources.map((t) => ho(t, e))}
        </div>
      ` : P}
    </div>
  `;
}
function mo(e) {
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
function ho(e, t) {
	let n = t.resolved?.series.some((t) => t.id === e.id) ?? !1, r = e.kind === "entity_state", i = t.hass?.states[e.entityId];
	return M`
    <div class="source-chip ${r ? "entity-source-chip" : "attr-source-chip"}">
      <span class="source-chip-icon">
        ${r && i ? M`<ha-icon .icon=${mo(i)}></ha-icon>` : M`<ha-icon .icon=${go(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? P : M`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function go(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function _o(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!so(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return M`
    <div class="entity-browser">
      ${vo(t, e)}
      <div class="entity-browser-list">
        ${t ? yo(t, n, so(r) ? r : {}, e) : M`<div class="entity-browser-empty">${W(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function vo(e, t) {
	return !e || t.path.length === 0 ? M`` : M`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => M`
          ${n > 0 ? M`<span class="entity-breadcrumb-sep">/</span>` : P}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function yo(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => so(r) ? !0 : jr(r) !== void 0 && !!Nr(e, [...t, n]));
	return M`
    <div class="entity-browser-entries">
      ${t.length > 0 ? M`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${W(r.hass, "back")}
            </div>
          ` : M`
            ${wo(e, r)}
            ${a ? M`<div class="entity-browser-section-title">${W(r.hass, "attributes")}</div>` : P}
          `}
      ${i.map(([n, i]) => To(e, n, i, t, r))}
    </div>
  `;
}
function bo(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function xo(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function So(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function Co(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function wo(e, t) {
	let n = Mr(e);
	return n ? Co(e, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : bo(n.id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : xo(n.id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : So(e.entity_id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : M`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : P;
}
function To(e, t, n, r, i) {
	if (so(n)) return M`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = jr(n), o = [...r, t], s = a ? Nr(e, o) : void 0;
	return s ? bo(s.id, i) ? M`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(s.id)}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-type">${a}</span>
      </div>
    ` : xo(s.id, i) ? M`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-type">${a}</span>
      </div>
    ` : M`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(s)}>
      <span class="entity-browser-entry-label">${t}</span>
      <span class="entity-browser-entry-type">${a}</span>
    </div>
  ` : P;
}
function G(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var Eo = /°[CF]|[CFK]$/, Do = 60, Oo = 1e3;
function ko(e) {
	return Eo.test(e);
}
var K = class extends Jn {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showLegend = !0, this.showTooltip = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._path = [], this._selectedSources = [], this._customEntityIds = [], this._entityPickerOpen = !1, this._data = new ai(this), this._tooltip = new ba(this), this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._pendingAddedSources = [], this._lastPickerOverlayOpen = !1, this._containerWidth = 0, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => this._pickerEntities().map((e) => ({
			id: e.entity_id,
			primary: co(e),
			secondary: e.entity_id
		})), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = e.toLowerCase(), n = new Set(this._pickerEntities().map((e) => e.entity_id));
			return Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !n.has(e.entity_id)).filter((e) => e.entity_id.toLowerCase().includes(t) || typeof e.attributes.friendly_name == "string" && e.attributes.friendly_name.toLowerCase().includes(t)).slice(0, 20).map((e) => ({
				id: e.entity_id,
				primary: co(e),
				secondary: e.entity_id
			}));
		}, this._handleDocumentClick = (e) => {
			if (!this._attributeMenuOpen || this._entityPickerOpen) return;
			let t = this.renderRoot?.querySelector(".entity-menu");
			t && e.composedPath().includes(t) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu());
		};
	}
	static {
		this.styles = Za;
	}
	connectedCallback() {
		super.connectedCallback(), eo(), document.addEventListener("click", this._handleDocumentClick, !0), this._resizeObserver = new ResizeObserver((e) => {
			let t = e[0]?.contentRect.width ?? 0;
			t !== this._containerWidth && (this._containerWidth = t);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("click", this._handleDocumentClick, !0), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
	}
	_maxXTicks() {
		return this._containerWidth <= 0 ? 12 : Math.max(3, Math.floor(this._containerWidth * 640 / (720 * 50)));
	}
	_effectiveStartDate() {
		return this._rangeStart ?? this.startDate ?? this.config?.startDate ?? /* @__PURE__ */ new Date(Date.now() - (this.config?.hours ?? this.hours ?? 24) * 36e5);
	}
	_effectiveEndDate() {
		let e = this._requestedEndDate(), t = this._liveNow || Date.now();
		return e.getTime() > t ? new Date(t) : e;
	}
	_requestedEndDate() {
		return this._rangeEnd ?? this.endDate ?? this.config?.endDate ?? /* @__PURE__ */ new Date();
	}
	_rangeExtendsFuture() {
		return this._requestedEndDate().getTime() > Date.now();
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= Oo * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, Oo);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_effectiveLineMode() {
		return this._runtimeLineMode ?? this.config?.lineMode ?? this.lineMode;
	}
	_effectiveViewRange() {
		let e = this._resolved?.startDate ?? this._effectiveStartDate(), t = this._rangeExtendsFuture() ? this._effectiveEndDate() : this._resolved?.endDate ?? this._effectiveEndDate(), n = this._viewStart && this._viewStart.getTime() >= e.getTime() ? this._viewStart : e, r = this._viewEnd && this._viewEnd.getTime() <= t.getTime() ? this._viewEnd : t;
		return r.getTime() > n.getTime() ? {
			start: n,
			end: r
		} : {
			start: e,
			end: t
		};
	}
	_pickerEntities() {
		return this.hass ? [...this.config?.defaultEntities ?? [], ...this._customEntityIds].filter((e) => typeof e == "string" && e !== "").filter((e, t, n) => n.indexOf(e) === t).map((e) => this.hass?.states[e]).filter((e) => e !== void 0) : [];
	}
	_fetchSources() {
		let e = [], t = /* @__PURE__ */ new Set();
		if (this._resolved) for (let n of this._resolved.series) t.has(n.id) || (t.add(n.id), e.push(Ta(n)));
		for (let n of this._selectedSources) {
			let r = this._sourceWithAttributeUnit(n);
			t.has(r.id) || (t.add(r.id), e.push(r));
		}
		return e;
	}
	_isDefaultSource(e) {
		return (this._resolved?.series ?? []).some((t) => t.id === e.id);
	}
	_resolvedTemperatureUnit() {
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && ko(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._effectiveStartDate().getTime(), n = this._effectiveEndDate().getTime(), r = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && r && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(t), new Date(n));
		let i = t !== this._prevStartTime || n !== this._prevEndTime, a = this._containerWidth !== this._prevContainerWidth, o = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours");
		(i || a) && (r && i && !a && !o || this._prevClipX.clear(), this._prevStartTime = t, this._prevEndTime = n, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let s = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (s.some((t) => e.has(t))) {
			if (!s.some((t) => t !== "hass" && e.has(t))) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if (r && this._lastFetchKey) {
					this._lastHassResolveTime = e;
					return;
				}
				if (e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let t = Ja({
				config: this.config,
				entities: this.entities,
				hours: this.hours,
				startDate: this._effectiveStartDate(),
				endDate: this._effectiveEndDate(),
				showDatePicker: this.showDatePicker,
				showEntityPicker: this.showEntityPicker,
				showLegend: this.showLegend,
				showTooltip: this.showTooltip,
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
			this._resolved = t, !this._rangeStart && !this._rangeEnd && (this._rangeStart = t.startDate, this._rangeEnd = t.endDate), !this._viewStart && !this._viewEnd && (this._viewStart = t.startDate, this._viewEnd = t.endDate);
			let n = this._fetchSources(), i = n.map((e) => e.id).sort().join("|"), a = `${i}|${t.startDate.getTime()}|${t.endDate.getTime()}`;
			if (a !== this._lastFetchKey) {
				let e = i === this._lastFetchKey.split("|").slice(0, -2).join("|") && this._lastFetchKey !== "";
				if (this._lastFetchSources.length > 0 && !e) {
					let e = new Set(this._lastFetchSources.map((e) => e.id)), r = new Set(n.map((e) => e.id)), i = n.filter((t) => !e.has(t.id)), o = this._lastFetchSources.filter((e) => !r.has(e.id)).map((e) => e.id);
					i.length > 0 && o.length === 0 ? (this._lastFetchKey = a, this._lastFetchSources = n, this._data.addSources(this.hass, i, t.startDate, t.endDate)) : o.length > 0 && i.length === 0 ? (this._lastFetchKey = a, this._lastFetchSources = n, this._data.removeSources(o)) : (this._lastFetchKey = a, this._lastFetchSources = n, this._data.fetch(this.hass, n, t.startDate, t.endDate));
				} else this._lastFetchKey = a, this._lastFetchSources = n, this._data.fetch(this.hass, n, t.startDate, t.endDate);
			}
			t.showDatePicker && !this._datePickerReady && ao().then(() => {
				this._datePickerReady = io(), this.requestUpdate();
			}), t.showEntityPicker && !this._entityComponentsReady && uo().then(() => {
				this._entityComponentsReady = fo(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen")) && this._emitPickerOverlayState(), this._animateClipPaths(), this._wasLoading = this._data.loading;
	}
	_emitPickerOverlayState() {
		let e = this._attributeMenuOpen || this._entityPickerOpen;
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
	_pickScaleGroup(e, t) {
		if (e.valueType !== "number") return `series:${e.id}`;
		if (e.unit) {
			let t = this._resolved?.series.find((t) => t.unit === e.unit && t.valueType === "number");
			if (t) return t.scaleGroupKey;
			let n = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (n && ko(e.unit)) return n.scaleGroupKey;
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_defaultLineMode() {
		let e = this._effectiveLineMode();
		return e === "line" || e === "column" ? e : "stair";
	}
	_defaultLineWidth() {
		let e = this.config?.lineWidth ?? this.lineWidth;
		return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : "2.5" : typeof e == "string" && e.trim() !== "" ? e.trim() : "2.5";
	}
	_buildRenderSeries() {
		if (!this._resolved) return [];
		let e = this._resolved.series.flatMap((e) => {
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
		});
		for (let t of this._selectedSources) {
			let n = this._sourceWithAttributeUnit(t);
			if (e.some((e) => e.id === n.id)) continue;
			let r = this._data.series.find((e) => e.source.id === n.id);
			if (!r) continue;
			let i = e.length, a = this._pickScaleGroup(n, e);
			e.push({
				id: n.id,
				label: n.label,
				color: ui(i),
				unit: n.unit,
				scaleGroupKey: a,
				scaleMode: "auto",
				lineMode: this._defaultLineMode(),
				lineWidth: this._defaultLineWidth(),
				valueType: n.valueType,
				points: r?.points ?? []
			});
		}
		return e;
	}
	_chartSourceKey() {
		return [...this._resolved?.series.map((e) => [
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
		].join("~")) ?? [], ...this._selectedSources.map((e) => {
			let t = this._sourceWithAttributeUnit(e);
			return [
				t.id,
				t.label,
				t.kind,
				t.unit ?? "",
				t.valueType,
				this._defaultLineMode(),
				this._defaultLineWidth()
			].join("~");
		})].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.containerWidth === o) return n.data;
		let s = this._maxXTicks(), c = this._buildRenderSeries(), l = c.filter((e) => !this._hiddenSeriesIds.includes(e.id)), u = {
			start: i,
			end: Math.max(a, i + 1)
		}, d = this._data.debugPerformance, f = d ? R() : 0, p = fa(c, l, u, this._resolved?.disableClimateOverlay ?? !1, s), m = d ? R() - f : 0;
		return d && z(d, "chart.build_data", {
			allSeriesCount: c.length,
			visibleSeriesCount: l.length,
			pointCount: l.reduce((e, t) => e + t.points.length, 0),
			groupCount: p.numericScales.length,
			segmentCount: p.segments.length,
			lineCount: p.numericLines.length,
			buildDurationMs: Math.round(m)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: i,
			endTime: a,
			containerWidth: o,
			data: p
		}, p;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphGroupRenderCache;
		if (n && n.dataRef === e && n.maxXTicks === t) return n.groups;
		let r = ya(e, t);
		return this._graphGroupRenderCache = {
			dataRef: e,
			maxXTicks: t,
			groups: r
		}, r;
	}
	_renderGraphGroup(e) {
		let t = this._resolved?.showLegend ?? !0;
		return M`
      <div class="graph-section">
        <div class="graph-canvas" data-series-ids=${e.series.map((e) => e.id).join("|")} style="height:${e.canvasHeight}px">
          <svg
            viewBox="0 0 ${720} ${e.svgHeight}"
            height="${e.svgHeight}"
            preserveAspectRatio="none"
          >
            ${e.xLabels.map((t) => N`
                <line class="grid-line grid-line--vertical" x1=${t.x.toFixed(1)} y1=${18} x2=${t.x.toFixed(1)} y2=${e.svgHeight - 18}></line>
              `)}
            ${e.yLabels.map((e) => N`
                <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
              `)}
            <defs>
              ${e.lines.map((t) => {
			let n = t.id.replace(/[^a-zA-Z0-9]/g, "_");
			return N`
                  <clipPath id=${`clip-${n}`}>
                    <rect id=${`rect-${n}`} x="0" y="0" width="0" height=${e.svgHeight}></rect>
                  </clipPath>
                `;
		})}
            </defs>
            ${e.heatingAreas.map((e) => N`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
            ${e.columns.map((e) => N`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
            ${e.lines.map((e) => {
			let t = `clip-${e.id.replace(/[^a-zA-Z0-9]/g, "_")}`, n = e.points.split(" "), r = n[n.length - 1], i = r ? parseFloat(r.split(",")[0]) : 0, a = this._prevClipX.get(e.id) ?? 0, o = !this._suppressLineAnimation && i > a;
			return N`<polyline class="line" clip-path="url(#${t})" data-line-id=${e.id} data-animate-clip=${o ? "true" : P} data-target-x=${i} points=${e.points} stroke=${e.color} stroke-width=${e.lineWidth}></polyline>`;
		})}
            ${e.segments.map((e) => N`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
            ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => N`<rect class="segment-border" x=${40} y=${218 + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
            <line class="axis" x1=${40} y1=${18} x2=${40} y2=${e.svgHeight - 18}></line>
            ${e.rightYLabels.length > 0 ? N`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${e.svgHeight - 18}></line>` : P}
            <line class="axis" x1=${40} y1=${e.svgHeight - 18} x2=${680} y2=${e.svgHeight - 18}></line>
            ${e.scale ? e.yLabels.map((e) => N`
                    <line class="axis tick" x1=${36} y1=${e.y.toFixed(1)} x2=${40} y2=${e.y.toFixed(1)}></line>
                  `) : P}
            ${e.rightYLabels.map((e) => N`
                <line class="axis tick" x1=${680} y1=${e.y.toFixed(1)} x2=${684} y2=${e.y.toFixed(1)}></line>
              `)}
          </svg>
          ${e.yLabels.map((e) => {
			let t = (40 / 720 * 100).toFixed(2);
			return M`<span class="y-axis-label" style="top:${e.y.toFixed(1)}px;left:0;width:${t}%;text-align:right;padding-right:6px;">${e.value}</span>`;
		})}
          ${e.rightYLabels.map((e) => {
			let t = (680 / 720 * 100).toFixed(2), n = (100 - Number(t)).toFixed(2);
			return M`<span class="y-axis-label" style="top:${e.y.toFixed(1)}px;left:${t}%;width:${n}%;text-align:left;padding-left:6px;">${e.value}</span>`;
		})}
          ${e.xLabels.map((t) => {
			let n = (t.x / 720 * 100).toFixed(2);
			return M`<span class="x-axis-label ${t.bold ? "x-axis-label--bold" : ""}" style="left:${n}%;top:${e.svgHeight + 3}px;">${t.label}</span>`;
		})}
        </div>
        ${t && e.allSeries.length > 0 ? M`
            <div class="graph-legend">
              ${e.allSeries.map((e) => M`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : P}
      </div>
    `;
	}
	_animateClipPaths() {
		let e = this.renderRoot;
		if (!e) return;
		let t = e.querySelectorAll("polyline[data-animate-clip=\"true\"]");
		if (t.length === 0) {
			e.querySelectorAll("polyline[data-line-id]").forEach((t) => {
				let n = t.getAttribute("data-line-id");
				if (!n) return;
				let r = Number(t.getAttribute("data-target-x")), i = n.replace(/[^a-zA-Z0-9]/g, "_"), a = e.querySelector(`#rect-${i}`);
				a instanceof SVGRectElement && (a.setAttribute("width", r.toString()), this._prevClipX.set(n, r));
			});
			return;
		}
		t.forEach((t) => {
			let n = t.getAttribute("data-line-id"), r = Number(t.getAttribute("data-target-x"));
			if (!n || !Number.isFinite(r)) return;
			let i = this._prevClipX.get(n) ?? 0, a = n.replace(/[^a-zA-Z0-9]/g, "_"), o = e.querySelector(`#rect-${a}`);
			o instanceof SVGRectElement && (o.style.setProperty("transition", "none"), o.setAttribute("width", i.toString()), o.getBoundingClientRect(), o.style.setProperty("transition", "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)"), o.setAttribute("width", r.toString()), this._prevClipX.set(n, r)), t.removeAttribute("data-animate-clip");
		});
	}
	_renderChartBody() {
		if (this._data.error) {
			let e = /timed?\s*out/i.test(this._data.error);
			return M`<div class="error">${W(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSources.length === 0) return M`<div class="empty">${W(this.hass, "no_series")}</div>`;
		let e = this._chartData(), t = e.visibleSeries.some((e) => e.points.length > 0), n = this._resolved.showTooltip, r = this._graphGroups(e), i = r.length > 0 && (t || this._data.loading);
		this._suppressLineAnimation = this._wasLoading && !this._data.loading;
		let a = r.reduce((e, t) => e + t.canvasHeight, 0);
		if (t && n) {
			let t = r.flatMap((e) => e.allSeries.map((e) => ({
				id: e.id,
				label: e.label,
				color: e.color
			})));
			this._tooltip.sync(t, this._data.series, this._hiddenSeriesIds, a, e.timeBounds);
		}
		return M`
      <div class="chart-surface">
        ${i ? M`
              <div class="chart-graphs"
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : P}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : P}
              >
                ${r.map((e) => this._renderGraphGroup(e))}
                ${n ? this._tooltip.renderTooltip() : P}
              </div>` : this._data.loading ? P : M`<div class="empty">${W(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? P : po({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSources,
			resolved: this._resolved,
			loading: this._data.loading,
			getItems: this._getEntityPickerItems,
			getAdditionalItems: this._getAdditionalEntityPickerItems,
			onEntityPickerOpened: () => this._onEntityPickerOpened(),
			onEntityPickerClosed: () => this._onEntityPickerClosed(),
			onEntitySelected: (e) => this._onEntitySelected(e),
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
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
	_minViewSpanMs() {
		let { span: e } = this._loadedRangeMs();
		return Math.min(6e4, Math.max(1, Math.floor(e / 1e3)));
	}
	_setViewRangeMs(e, t) {
		let n = this._loadedRangeMs(), r = this._minViewSpanMs(), i = Math.max(t - e, r), a = Math.min(i, n.span), o = Math.min(Math.max(e, n.start), n.end - a), s = o + a;
		this._viewStart = new Date(o), this._viewEnd = new Date(s), this.dispatchEvent(new CustomEvent("view-range-changed", {
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
		return new Date(t + Math.max(0, Math.min(1e3, e)) / 1e3 * (n - t));
	}
	_formatRangeDate(e) {
		return e.toLocaleString(this._resolved?.language ?? void 0, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	_setViewRangePart(e, t) {
		let n = t.currentTarget, r = this._dateFromRangePercent(Number(n.value)), i = this._effectiveViewRange(), a = this._loadedRangeMs(), o = this._minViewSpanMs();
		if (e === "start") {
			let e = i.end.getTime();
			this._setViewRangeMs(Math.min(Math.max(r.getTime(), a.start), e - o), e);
		} else {
			let e = i.start.getTime();
			this._setViewRangeMs(e, Math.max(Math.min(r.getTime(), a.end), e + o));
		}
	}
	_onRangeSelectionPointerDown(e) {
		if (e.button !== 0) return;
		let t = e.currentTarget, n = t.closest(".range-slider-stack");
		if (!(n instanceof HTMLElement)) return;
		let r = n.getBoundingClientRect();
		if (r.width <= 0) return;
		let i = this._loadedRangeMs(), a = this._effectiveViewRange(), o = a.start.getTime(), s = a.end.getTime() - o;
		if (s >= i.span - 1) return;
		e.preventDefault(), e.stopPropagation();
		let c = e.clientX;
		t.setPointerCapture(e.pointerId), t.toggleAttribute("dragging", !0);
		let l = (e) => {
			e.preventDefault();
			let t = (e.clientX - c) / r.width * i.span, n = Math.min(Math.max(o + t, i.start), i.end - s);
			this._setViewRangeMs(n, n + s);
		}, u = () => {
			t.toggleAttribute("dragging", !1), t.removeEventListener("pointermove", l), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", u);
		};
		t.addEventListener("pointermove", l), t.addEventListener("pointerup", u), t.addEventListener("pointercancel", u);
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
	_renderToolsPanel() {
		if (!this.toolsOpen || !this._resolved) return P;
		let e = this._effectiveViewRange(), t = this._rangePercent(this._viewStart, this._resolved.startDate), n = this._rangePercent(this._viewEnd, this._resolved.endDate), r = (t + n) / 20, i = this._defaultLineMode();
		return M`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-head">
            <span class="tool-label"><ha-icon .icon=${"mdi:timeline-clock-outline"}></ha-icon>${W(this.hass, "view_range")}</span>
            <button class="tool-icon-button" title=${W(this.hass, "reset_zoom")} @click=${() => this._resetViewRange()}>
              <ha-icon .icon=${"mdi:restore"}></ha-icon>
            </button>
          </div>
          <div class="range-values">
            <span>${this._formatRangeDate(e.start)}</span>
            <span>${this._formatRangeDate(e.end)}</span>
          </div>
          <div class="range-slider-stack">
            <div
              class="range-selection"
              style="left:${t / 10}%;right:${100 - n / 10}%;"
            ></div>
            <div
              class="range-selection-hit"
              style="left:clamp(18px, ${r}%, calc(100% - 18px));"
              @pointerdown=${(e) => this._onRangeSelectionPointerDown(e)}
            ></div>
            <input class="range-slider" type="range" min="0" max="1000" .value=${String(t)} @input=${(e) => this._setViewRangePart("start", e)} />
            <input class="range-slider" type="range" min="0" max="1000" .value=${String(n)} @input=${(e) => this._setViewRangePart("end", e)} />
          </div>
        </div>
        <div class="tool-actions">
          <div class="mode-switch" role="group" aria-label=${W(this.hass, "line_mode")}>
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
		].map(([e, t, n]) => M`
              <button
                class="mode-button"
                ?active=${i === e}
                title=${W(this.hass, n)}
                @click=${() => this._setRuntimeLineMode(e)}
              >
                <ha-icon .icon=${t}></ha-icon>
              </button>
            `)}
          </div>
          <button class="tool-action-button" @click=${() => this._exportData()}>
            <ha-icon .icon=${"mdi:download"}></ha-icon>
            <span>${W(this.hass, "export_data")}</span>
          </button>
        </div>
      </div>
    `;
	}
	render() {
		let e = this._resolved?.width ?? "100%", t = this._resolved?.backgroundColor ?? "transparent", n = this._resolved?.title?.trim(), r = [
			this._resolved?.titleFontFamily ? `font-family:${this._resolved.titleFontFamily};` : "",
			this._resolved?.titleFontSize ? `font-size:${this._resolved.titleFontSize};` : "",
			this._resolved?.titleColor ? `color:${this._resolved.titleColor};` : ""
		].join("");
		return M`
      <div class="root" style="width:${e};background:${t};">
        ${n ? M`<div class="graph-title" style=${r}>${n}</div>` : P}
        ${this.showControls ? M`<div class="controls-bar">
              ${this._renderDatePicker()}
              ${this._renderEntityPickerUI()}
            </div>` : P}
        ${this._renderToolsPanel()}
        <div class="chart-area">
          ${this._renderChartBody()}
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
	_renderDatePicker() {
		return !this._resolved?.showDatePicker || !this._datePickerReady ? P : oo(this.hass, this._resolved.startDate, this._resolved.endDate, (e, t) => this._onDateRangeChanged(e, t));
	}
	_positionEntityMenu() {
		let e = this.renderRoot?.querySelector(".entity-trigger"), t = this.renderRoot?.querySelector(".entity-menu");
		if (!e || !t) return;
		t.style.top = "0", t.style.left = "0", t.style.right = "", t.style.width = "";
		let n = t.getBoundingClientRect(), r = e.getBoundingClientRect(), i = this.getBoundingClientRect(), a = i.bottom - 8 - r.bottom - 8;
		t.style.maxHeight = `${Math.min(Math.max(a, 120), 420)}px`, t.style.top = `${r.bottom - n.top + 6}px`;
		let o = i.left + 8, s = i.right - 8, c = s - o, l = Math.min(420, c);
		t.style.width = `${l}px`;
		let u;
		window.matchMedia("(hover: hover) and (pointer: fine)").matches ? (u = r.left, u = Math.min(u, s - l), u = Math.max(u, o)) : (u = o, t.style.width = `${c}px`), t.style.left = `${u - n.left}px`, t.style.right = "";
	}
	_closeAttributeMenu() {
		this._attributeMenuOpen = !1, this._entityPickerOpen = !1;
	}
	_onEntitySelected(e) {
		new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._attributeMenuOpen = !0;
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen = !0, this._attributeMenuOpen = !1;
	}
	_onEntityPickerClosed() {
		this._entityPickerOpen = !1;
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path) return e;
		let t = wa(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = Ca(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_addSource(e) {
		if (this._selectedSources.some((t) => t.id === e.id) || this._pendingAddedSources.some((t) => t.id === e.id) || (this._resolved?.series ?? []).some((t) => t.id === e.id)) return;
		let t = this._sourceWithAttributeUnit(e);
		this._pendingAddedSources = [...this._pendingAddedSources, t], this.dispatchEvent(new CustomEvent("series-added", {
			detail: { source: t },
			bubbles: !0,
			composed: !0
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), Do);
	}
	_flushPendingAddedSources() {
		if (this._sourceAddBatchTimer = void 0, this._pendingAddedSources.length === 0) return;
		let e = new Set(this._selectedSources.map((e) => e.id)), t = this._pendingAddedSources.filter((t) => !e.has(t.id));
		this._pendingAddedSources = [], t.length !== 0 && (this._selectedSources = [...this._selectedSources, ...t], this.requestUpdate());
	}
	_removeSource(e) {
		let t = this._selectedSources.find((t) => t.id === e);
		this._pendingAddedSources = this._pendingAddedSources.filter((t) => t.id !== e), !(!t || this._isDefaultSource(t)) && (this._selectedSources = this._selectedSources.filter((t) => t.id !== e), this._hiddenSeriesIds = this._hiddenSeriesIds.filter((t) => t !== e), this.dispatchEvent(new CustomEvent("series-removed", {
			detail: { sourceId: e },
			bubbles: !0,
			composed: !0
		})), this.requestUpdate());
	}
};
//#endregion
//#region ../ha-better-history/dist/define.js
G([I({ attribute: !1 })], K.prototype, "hass", void 0), G([I({ attribute: !1 })], K.prototype, "config", void 0), G([I({ attribute: !1 })], K.prototype, "entities", void 0), G([I({ attribute: !1 })], K.prototype, "attributeUnits", void 0), G([I({ type: Number })], K.prototype, "hours", void 0), G([I({ attribute: !1 })], K.prototype, "startDate", void 0), G([I({ attribute: !1 })], K.prototype, "endDate", void 0), G([I({
	type: Boolean,
	attribute: "show-date-picker"
})], K.prototype, "showDatePicker", void 0), G([I({
	type: Boolean,
	attribute: "show-entity-picker"
})], K.prototype, "showEntityPicker", void 0), G([I({
	type: Boolean,
	attribute: "show-legend"
})], K.prototype, "showLegend", void 0), G([I({
	type: Boolean,
	attribute: "show-tooltip"
})], K.prototype, "showTooltip", void 0), G([I({
	type: Boolean,
	attribute: "show-controls"
})], K.prototype, "showControls", void 0), G([I()], K.prototype, "width", void 0), G([I()], K.prototype, "height", void 0), G([I({ attribute: "line-mode" })], K.prototype, "lineMode", void 0), G([I({ attribute: "line-width" })], K.prototype, "lineWidth", void 0), G([I({ attribute: "background-color" })], K.prototype, "backgroundColor", void 0), G([I({ attribute: "graph-title" })], K.prototype, "graphTitle", void 0), G([I({ attribute: "title-font-family" })], K.prototype, "titleFontFamily", void 0), G([I({ attribute: "title-font-size" })], K.prototype, "titleFontSize", void 0), G([I({ attribute: "title-color" })], K.prototype, "titleColor", void 0), G([I()], K.prototype, "language", void 0), G([I({
	type: Boolean,
	attribute: "debug-performance"
})], K.prototype, "debugPerformance", void 0), G([I({
	type: Boolean,
	attribute: "tools-open"
})], K.prototype, "toolsOpen", void 0), G([L()], K.prototype, "_resolved", void 0), G([L()], K.prototype, "_hiddenSeriesIds", void 0), G([L()], K.prototype, "_rangeStart", void 0), G([L()], K.prototype, "_rangeEnd", void 0), G([L()], K.prototype, "_viewStart", void 0), G([L()], K.prototype, "_viewEnd", void 0), G([L()], K.prototype, "_liveNow", void 0), G([L()], K.prototype, "_datePickerReady", void 0), G([L()], K.prototype, "_entityComponentsReady", void 0), G([L()], K.prototype, "_runtimeLineMode", void 0), G([L()], K.prototype, "_attributeMenuOpen", void 0), G([L()], K.prototype, "_selectedEntityId", void 0), G([L()], K.prototype, "_path", void 0), G([L()], K.prototype, "_selectedSources", void 0), G([L()], K.prototype, "_customEntityIds", void 0), G([L()], K.prototype, "_entityPickerOpen", void 0), G([L()], K.prototype, "_containerWidth", void 0), customElements.get("ha-better-history") || customElements.define("ha-better-history", K);
//#endregion
//#region src/data/attribute-units.ts
var Ao = "attributes.json", jo = {}, Mo;
function No() {
	return new URL(Ao, import.meta.url).toString();
}
function Po(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return jo;
	let t = {};
	for (let [n, r] of Object.entries(e)) n !== "" && typeof r == "string" && r !== "" && (t[n] = r);
	return t;
}
function Fo() {
	return Mo ??= fetch(No()).then((e) => e.ok ? e.json() : jo).then(Po).catch(() => jo), Mo;
}
function Io(e) {
	return e ?? jo;
}
//#endregion
//#region src/components/eq-history-dialog.ts
var Lo = class extends T {
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
		this._attributeUnitsLoadStarted || (this._attributeUnitsLoadStarted = !0, Fo().then((e) => {
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
		return S`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${this.hass?.states[this.config?.entity ?? ""]?.attributes?.friendly_name ?? this.config?.entity ?? E(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._handleDialogClosed(e)}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-tools-btn"
          .label=${E(this.language, "dialog.history.tools")}
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
          .label=${E(this.language, this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls")}
          @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
        >
          <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          .label=${E(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </ha-icon-button>
        ${this.open ? S`<ha-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .attributeUnits=${Io(this._staticAttributeUnits)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onHistoryPickerOverlayChanged(e)}
              style="flex:1;min-height:70vh;"
            ></ha-better-history>` : C}
      </ha-dialog>
    `;
	}
};
customElements.get("eq-history-dialog") || customElements.define("eq-history-dialog", Lo);
//#endregion
//#region src/components/eq-lock-dialog.ts
var Ro = 4, zo = [
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
], Bo = class extends T {
	constructor(...e) {
		super(...e), this.open = !1, this.entityId = "", this.isLocking = !0, this._code = "", this._error = !1, this._loading = !1, this._onKeyDown = (e) => {
			this.open && (e.key >= "0" && e.key <= "9" ? this._pressDigit(e.key) : e.key === "Backspace" ? this._pressBackspace() : e.key === "Escape" ? this._cancel() : e.key === "Enter" && this._code.length === Ro && this._validate());
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
		if (!this.open) return C;
		let e = this.isLocking ? E(this.language, "main.lock.locked") : E(this.language, "main.lock.unlocked"), t = E(this.language, "main.lock.enter_code"), n = E(this.language, "main.lock.wrong_code"), r = E(this.language, "dialog.close");
		return S`
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
          ${Array.from({ length: Ro }, (e, t) => S`
            <div
              class="dot"
              ?filled=${t < this._code.length && !this._error}
              ?error=${this._error}
            ></div>
          `)}
        </div>
        <div class="error-msg">${this._error ? n : C}</div>
        <div class="keypad">
          ${zo.map((e) => this._renderKey(e))}
        </div>
        <button class="cancel" @click=${this._cancel}>${r}</button>
      </div>
    `;
	}
	_renderKey(e) {
		return e === "backspace" ? S`
        <button
          class="key"
          ?disabled=${this._loading || this._code.length === 0}
          @click=${this._pressBackspace}
        >
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
      ` : e === "spacer" ? S`<div></div>` : S`
      <button
        class="key"
        ?disabled=${this._loading || this._code.length >= Ro}
        @click=${() => this._pressDigit(e)}
      >
        ${e}
      </button>
    `;
	}
	_pressDigit(e) {
		this._loading || this._code.length >= Ro || (this._error = !1, this._code += e, this._code.length === Ro && this._validate());
	}
	_pressBackspace() {
		this._loading || this._code.length === 0 || (this._error = !1, this._code = this._code.slice(0, -1));
	}
	async _validate() {
		if (this._loading || !this.hass || this._code.length < Ro) return;
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
customElements.get("eq-lock-dialog") || customElements.define("eq-lock-dialog", Bo);
//#endregion
//#region src/components/eq-main-card.ts
var Vo = [
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
], Ho = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], Uo = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Wo = {
	frost: "mdi:snowflake",
	eco: "mdi:tree-outline",
	away: "mdi:home-export-outline",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:sleep",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Go = [
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
], Ko = {
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
}, qo = {
	preheating: {
		icon: "mdi:timer-sand",
		tone: "heat"
	},
	heating: {
		icon: "mdi:fire",
		tone: "heat"
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
		icon: "mdi:fan",
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
function Jo(e, t) {
	let n = [...new Set(e)], r = t.filter((e) => n.includes(e)), i = n.filter((e) => !t.includes(e));
	return [...r, ...i];
}
var Yo = class extends T {
	constructor(...e) {
		super(...e), this._activeDialog = null, this._powerInfoPinned = !1, this._lockDialogOpen = !1, this._lockIsLocking = !1, this._handleMouseLeave = () => {
			this._activeDialog === "menu" && (this._activeDialog = null);
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
			Tt,
			Et,
			o`
      :host {
        display: block;
        position: relative;
        container-type: inline-size;
        height: 100%;
      }

      ha-card {
        height: 100%;
        overflow: visible;
        border-radius: var(--equinox-radius);
        background: var(--equinox-card-bg);
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
      .state-rail .menu,
      .left-rail .fan,
      .left-rail .power-info,
      .state-rail .power-info {
        flex: 0 0 auto;
      }

      .state-rail .event,
      .state-rail .action-icon,
      .state-rail .lock,
      .state-rail .fan,
      .left-rail .fan,
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
      .state-rail .menu ha-icon,
      .left-rail .fan ha-icon,
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
        grid-auto-columns: minmax(42px, 1fr);
        border-radius: var(--equinox-control-radius);
        overflow: hidden;
        min-height: 45px;
        background: var(--equinox-control-bg);
        border: 1px solid var(--equinox-border-color);
      }

      .segments ha-control-button:not(:last-child) {
        border-inline-end: 1px solid var(--equinox-border-color);
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
        --control-button-icon-color: var(--equinox-muted-color);
      }

      .segments ha-control-button {
        height: 100%;
        --control-button-border-radius: 0;
        --control-button-padding: 0;
      }

      .compact-selectors {
        display: flex;
        gap: 8px;
        min-height: 45px;
      }

      .compact-selectors ha-control-button {
        flex: 1;
        min-width: 0;
        border: 1px solid var(--equinox-border-color);
        border-radius: var(--equinox-control-radius);
        background: var(--equinox-control-bg);
        overflow: hidden;
      }

      ha-control-button:hover:not([disabled]) {
        --control-button-icon-color: var(--equinox-text-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 82%, var(--equinox-text-color) 18%);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active] {
        --control-button-icon-color: var(--equinox-text-color);
        --control-button-background-color: var(--equinox-control-active-bg);
        --control-button-background-opacity: 1;
      }

      ha-control-button[active][subtle] {
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 74%, var(--equinox-text-color) 10%);
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
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-color) 22%);
      }

      ha-control-button[tone="cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-color) 22%);
      }

      ha-control-button[tone="auto"][active][subtle] {
        --control-button-icon-color: var(--equinox-auto-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-auto-color) 22%);
      }

      ha-control-button[tone="boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-boost-color) 22%);
      }

      ha-control-button[tone="cool-boost"][active][subtle] {
        --control-button-icon-color: var(--equinox-cool-boost-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-boost-color) 22%);
      }

      ha-control-button[tone="off"][active][subtle] {
        --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--disabled-text-color, var(--equinox-muted-color)) 22%);
      }

      .compact-selectors ha-control-button:not(.fan-selector) {
        overflow: hidden;
      }

      .compact-selectors ha-control-button.fan-selector {
        --control-button-icon-color: var(--equinox-text-color);
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

      .btn-icon[tone="heat"] { background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent); }
      .btn-icon[tone="cool"] { background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent); }
      .btn-icon[tone="auto"] { background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent); }
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

      .fan {
        width: 36px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        color: var(--equinox-text-color);
        padding: 0;
        cursor: pointer;
      }

      .status .fan {
        width: 26px;
        height: 26px;
      }

      .fan-label {
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
      .fan {
        border-radius: var(--equinox-control-radius);
      }

      .menu:hover,
      .fan:hover {
        background: color-mix(in srgb, var(--equinox-control-bg) 80%, var(--equinox-text-color) 14%);
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
    `
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("mouseleave", this._handleMouseLeave);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("mouseleave", this._handleMouseLeave), this._clearPowerInfoPressTimer();
	}
	render() {
		if (!this.viewModel || !this.config) return C;
		let e = this.config?.display_mode === "compact", t = this.config.state_icons_layout === "vertical";
		return S`
      <ha-card ?locked=${this.viewModel.vt?.lock.isConfigured === !0 && this.viewModel.vt.lock.isUserLocked === !0}>
        <div class="card">
          ${this._renderName()}
          ${t ? C : this._renderStatus()}
          <div class="layout" ?state-vertical=${t}>
            <div class="main">
              ${this._renderSetpoint()}
              ${this._renderConditions()}
              ${e ? this._renderCompactSelectors() : S`${this._renderHvacModes()} ${this._renderPresets()}`}
            </div>
            ${t ? S`<div class="left-rail">${this._renderLeftRail()}</div>` : C}
            ${t ? S`<div class="state-rail">${this._renderStateRail()}</div>` : C}
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
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
      ></eq-fan-dialog>
      <eq-hvac-dialog
        .open=${this._activeDialog === "hvac"}
        .hass=${this.hass}
        .viewModel=${this.viewModel}
        .config=${this.config}
        .language=${this._language()}
        .floating=${!0}
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
        @equinox-open-history=${() => {
			this._activeDialog = "history";
		}}
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
        @eq-dialog-close=${() => {
			this._activeDialog = null;
		}}
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
        .title=${E(this._language(), "dialog.message.title")}
        .language=${this._language()}
        .floating=${!0}
        .anchor=${this._dialogAnchor}
        @eq-dialog-close=${() => this._closeMessage()}
      >
        ${this._renderMessageOverlay()}
      </eq-dialog>
    `;
	}
	_language() {
		return this.hass?.locale?.language ?? this.hass?.language;
	}
	_renderName() {
		return this.config?.disable_name ? C : S`
      <div class="name">
        <span class="name-label">${this.viewModel?.climate.name}</span>
        ${this._renderMenuButton()}
      </div>
    `;
	}
	_renderStatus() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? E(this._language(), "main.lock.locked") : E(this._language(), "main.lock.unlocked");
		return S`
      <div class="status">
        ${this.config?.display_mode !== "compact" && this._hasFanControl() ? this._renderFanButton() : C}
        ${this._renderPowerInfoButton()}
        <span class="status-spacer"></span>
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${e ? this._renderLockButton(t) : C}
        ${this.config?.disable_name ? this._renderMenuButton() : C}
      </div>
    `;
	}
	_renderStateRail() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? E(this._language(), "main.lock.locked") : E(this._language(), "main.lock.unlocked");
		return [
			...this.config?.disable_name ? [this._renderMenuButton()] : [],
			...e ? [this._renderLockButton(t)] : [],
			S`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
		];
	}
	_renderLeftRail() {
		return [...this.config?.display_mode !== "compact" && this._hasFanControl() ? [this._renderFanButton()] : [], this._renderPowerInfoButton()];
	}
	_renderLockButton(e) {
		let t = this.viewModel?.vt?.lock.isLocked === !0;
		return S`
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
		let e = this.viewModel?.climate.hvacAction, t = e ? qo[e] : void 0, n = this.viewModel?.climate.hvacMode;
		if (n === "off" && this.viewModel?.vt?.messages.some((e) => e.key === "hvac_off_manual")) return C;
		let r = t?.icon || (n ? Uo[n] : ""), i = t?.tone ?? this._modeTone(n), a = e ? E(this._language(), `main.hvac_action.${e}`) : this._hvacLabel(n);
		return r ? S`
      <ha-icon
        class="action-icon"
        tone=${i}
        .icon=${r}
        title=${a}
      ></ha-icon>
    ` : C;
	}
	_renderEvents() {
		let e = this.viewModel?.vt?.events, t = this.viewModel?.vt?.messages ?? [];
		if (!e) return [];
		let n = new Set(Go.filter((e) => e.key === "hasTimer").flatMap((e) => e.messageKeys ?? [])), r = t.map((e) => {
			let t = n.has(e.key) ? (e) => this._openBoost(e) : void 0;
			return this._renderMessageIcon(e, t);
		}), i = Go.filter((n) => {
			let r = n.messageKeys ?? [];
			return e[n.key] && !r.some((e) => t.some((t) => t.key === e));
		}).map((e) => {
			let t = e.key === "hasTimer" ? (e) => this._openBoost(e) : void 0;
			return this._renderEventIcon(e, t);
		});
		return [...r, ...i];
	}
	_renderEventIcon(e, t) {
		let n = E(this._language(), `main.events.${e.key}`);
		return t ? S`
        <button
          class="event"
          tone=${e.tone}
          title=${n}
          aria-label=${n}
          @click=${t}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
      ` : S`
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
		return S`
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
		if (!this._activeMessageKey) return C;
		let e = this._messageIcon(this._activeMessageKey);
		return S`
      <div class="message-body" tone=${e.tone}>
        <ha-icon .icon=${e.icon}></ha-icon>
        <span>${this._messageLabel(this._activeMessageKey)}</span>
      </div>
    `;
	}
	_messageIcon(e) {
		return Ko[e] ?? {
			icon: "mdi:information-outline",
			tone: "info"
		};
	}
	_messageLabel(e) {
		return E(this._language(), `main.messages.${e}`);
	}
	_renderSetpoint() {
		return this.config?.primary_display === "sensors" ? this._renderSensorFocus() : S`<div class="setpoint">${this._renderSetpointControl(!1)}</div>`;
	}
	_renderSensorFocus() {
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return S`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span
            class="sensor-temperature"
            ?clickable=${!!n}
            @click=${n ? () => this._openMoreInfo(n) : C}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatCurrentTempValue()}</span>
            <span class="sensor-unit">°</span>
          </span>
          ${t ? S`
                <span class="sensor-humidity" @click=${() => this._openMoreInfo(this._humidityEntityId())}>
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span>${this._formatPercent(e)}</span>
                </span>
              ` : C}
        </div>
        ${this._renderSetpointControl(!0)}
      </div>
    `;
	}
	_renderSetpointControl(e) {
		let t = this._isControlDisabled() || !q(this.viewModel?.climate.targetTemperature), n = this._setpointFallback(), r = n.length || 4;
		return S`
      <div class="setpoint-control" ?compact=${e}>
        <ha-control-button
          class="step"
          .label=${E(this._language(), "main.actions.decrease_temperature")}
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
          .label=${E(this._language(), "main.actions.increase_temperature")}
          ?disabled=${t}
          @click=${() => this._changeTemperature(1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-control-button>
      </div>
    `;
	}
	_renderConditions() {
		if (this.config?.primary_display === "sensors") return C;
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return S`
      <div class="conditions">
        <span
          class="condition"
          ?clickable=${!!n}
          @click=${n ? () => this._openMoreInfo(n) : C}
        >
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatCurrentTemp()}</span>
        </span>
        ${t ? S`
            <span class="divider"></span>
            <span class="condition" clickable @click=${() => this._openMoreInfo(this._humidityEntityId())}>
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span class="condition-value" kind="humidity">${this._formatPercent(e)}</span>
            </span>
          ` : C}
      </div>
    `;
	}
	_renderHvacModes() {
		let e = Jo(this.viewModel?.climate.hvacModes ?? [], Vo).filter((e) => Uo[e]);
		return e.length === 0 ? C : S`<div class="segments" style=${e.length < 3 ? `width: calc(100% / 3 * ${e.length}); margin-inline: auto;` : ""}>${e.map((e) => this._renderHvacButton(e))}</div>`;
	}
	_renderHvacButton(e) {
		return S`
      <ha-control-button
        .label=${this._hvacLabel(e)}
        tone=${this._modeTone(e)}
        ?active=${this.viewModel?.climate.hvacMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(e)}
      >
        <span class="btn-icon" tone=${this._modeTone(e)}>
          <ha-icon .icon=${Uo[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderPresets() {
		let e = Jo(this.viewModel?.climate.presetModes ?? [], Ho).filter((e) => e !== "none" && Wo[e] && !this._hidePreset(e));
		return e.length === 0 ? C : S`<div class="segments">${e.map((e) => this._renderPresetButton(e))}</div>`;
	}
	_renderPresetButton(e) {
		return S`
      <ha-control-button
        .label=${this._presetLabel(e)}
        tone=${this._presetTone(e)}
        ?active=${this.viewModel?.climate.presetMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setPresetMode(e)}
      >
        <span class="btn-icon" tone=${this._presetTone(e)}>
          <ha-icon .icon=${Wo[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderCompactSelectors() {
		let e = this.viewModel?.climate.hvacMode, t = this.viewModel?.climate.presetMode, n = Jo(this.viewModel?.climate.hvacModes ?? [], Vo).filter((e) => Uo[e]), r = e && n.includes(e) ? e : void 0, i = n.length > 0, a = (this.viewModel?.climate.presetModes ?? []).filter((e) => e !== "none" && Wo[e]).length > 0, o = t && t !== "none" && Wo[t] ? Wo[t] : "mdi:knob", s = !!t && t !== "none" && !!Wo[t], c = (this.viewModel?.climate.fanModes?.length ?? 0) > 0 || this.viewModel?.vt?.fan.hasAutoFan === !0, l = +!!i + +!!a + +!!c;
		return l === 0 ? C : S`
      <div class="compact-selectors" style=${l < 3 ? `width: calc(100% / 3 * ${l}); margin-inline: auto;` : ""}>
        ${i ? S`
              <ha-control-button
                .label=${r ? this._hvacLabel(r) : E(this._language(), "dialog.hvac.title")}
                tone=${this._modeTone(r)}
                ?active=${r !== "off" && !!r}
                ?subtle=${!0}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("hvac", e)}
              >
                <span class="btn-icon" tone=${this._modeTone(r)}>
                  <ha-icon .icon=${r ? Uo[r] : "mdi:thermostat"}></ha-icon>
                </span>
              </ha-control-button>
            ` : C}
        ${a ? S`
              <ha-control-button
                .label=${t && t !== "none" ? this._presetLabel(t) : E(this._language(), "main.preset.none")}
                tone=${s ? this._presetTone(t) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("preset", e)}
              >
                <span class="btn-icon" tone=${s ? this._presetTone(t) : ""}>
                  <ha-icon .icon=${o}></ha-icon>
                </span>
              </ha-control-button>
            ` : C}
        ${c ? S`
              <ha-control-button
                class="fan-selector"
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("fan", e)}
              >
                <ha-icon .icon=${this._fanIcon()}></ha-icon>
              </ha-control-button>
            ` : C}
      </div>
    `;
	}
	_hasPowerInfo() {
		let e = this._powerValveValue(), t = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower;
		return !!e || q(t);
	}
	_renderPowerInfoButton() {
		if (!this._hasPowerInfo()) return C;
		let e = E(this._language(), "main.actions.open_power_info");
		return S`
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
		return S`
      <button class="fan" title=${E(this._language(), "main.actions.open_fan")} aria-label=${E(this._language(), "main.actions.open_fan")} @click=${(e) => this._openDialog("fan", e)}>
        <ha-icon .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
	}
	_hasFanControl() {
		return (this.viewModel?.climate.fanModes?.length ?? 0) > 0 || this.viewModel?.vt?.fan.hasAutoFan === !0;
	}
	_renderPowerValve() {
		let e = this._powerValveValue(), t = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower, n = this.viewModel?.vt?.powerValve.instantPowerUnit ?? this.viewModel?.climate.instantPowerUnit;
		return !e && !q(t) ? C : S`
      <div class="meter">
        ${e ? S`<span class="meter-line"><ha-icon .icon=${e.icon}></ha-icon><span>${e.label}</span></span>` : C}
        ${q(t) ? S`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(t)}${n ? ` ${n}` : ""}</span></span>` : C}
      </div>
    `;
	}
	_renderMenuButton() {
		return S`
      <button class="menu" title=${E(this._language(), "main.actions.open_menu")} aria-label=${E(this._language(), "main.actions.open_menu")} @click=${(e) => this._openDialog("menu", e)}>
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
	_modeTone(e) {
		return e === "heat" ? "heat" : e === "cool" ? "cool" : e === "heat_cool" || e === "auto" ? "auto" : e === "off" ? "off" : "";
	}
	_presetTone(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" ? "cool" : e === "eco" ? "auto" : e === "away" || e === "sleep" ? "off" : e === "comfort" ? t === "cool" ? "cool" : "heat" : e === "home" ? "auto" : e === "boost" || e === "activity" ? t === "cool" ? "cool-boost" : "boost" : "";
	}
	_hidePreset(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" && t !== "heat";
	}
	_fanIcon() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;
		return e ? Ct[e] ?? "mdi:fan" : "mdi:fan";
	}
	_fanLabel() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode ?? (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : void 0);
		return e ? this._optionLabel("main.fan", e) : E(this._language(), "main.fan.unavailable");
	}
	_hvacLabel(e) {
		return !e || this.viewModel?.climate.availability !== "available" ? E(this._language(), "main.status.unavailable") : e === "off" ? E(this._language(), "main.status.off") : this._optionLabel("main.hvac", e);
	}
	_presetLabel(e) {
		return this._optionLabel("main.preset", e);
	}
	_optionLabel(e, t) {
		let n = E(this._language(), `${e}.${t}`);
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
	_setpointFallback() {
		let e = this._stepDecimals();
		return q(this.viewModel?.climate.targetTemperature) ? new Intl.NumberFormat(this._language(), {
			minimumFractionDigits: e,
			maximumFractionDigits: e
		}).format(this.viewModel.climate.targetTemperature) : "";
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
		}).format(a), mt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, { temperature: a });
	}
	_changeTemperature(e) {
		if (!this.hass || !this.config || !this.viewModel || !q(this.viewModel.climate.targetTemperature)) return;
		let t = this.viewModel.climate.targetTempStep ?? .5, n = this._clampTemperature(this.viewModel.climate.targetTemperature + t * e);
		mt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, { temperature: n });
	}
	_clampTemperature(e) {
		let t = this.viewModel?.climate.minTemp, n = this.viewModel?.climate.maxTemp, r = q(t) ? Math.max(e, t) : e, i = q(n) ? Math.min(r, n) : r;
		return Number(i.toFixed(2));
	}
	_setHvacMode(e) {
		!this.hass || !this.config || !this.viewModel || ht({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e);
	}
	_setPresetMode(e) {
		!this.hass || !this.config || !this.viewModel || gt({
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
			St(e);
			return;
		}
		xt(e);
	}
};
customElements.get("eq-main-card") || customElements.define("eq-main-card", Yo);
//#endregion
//#region src/data/format.ts
var Xo = new Set(["unknown", "unavailable"]);
function Zo(e) {
	return e == null || typeof e == "string" && Xo.has(e);
}
function J(e) {
	if (!(Zo(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Y(e) {
	if (Zo(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function Qo(e) {
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
function $o(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string" && e.trim() !== "") : typeof e == "string" && e.trim() !== "" ? [e] : [];
}
function es(e) {
	return e === "safety_detected" || e === "heating_failure" || e === "cooling_failure" ? "danger" : e === "overpowering_detected" || e === "not_initialized" ? "alert" : "info";
}
function ts(e) {
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
function ns(e) {
	let t = J(Q(e, ["configuration", "type"])), n = [];
	return (e.is_over_switch === !0 || t === "over_switch") && n.push("over_switch"), (e.is_over_valve === !0 || t === "over_valve") && n.push("over_valve"), (e.is_over_climate === !0 || t === "over_climate") && n.push("over_climate"), (Q(e, ["vtherm_over_climate_valve", "have_valve_regulation"]) === !0 || Q(e, ["configuration", "have_valve_regulation"]) === !0) && n.push("over_climate_valve"), n;
}
function rs(e) {
	let t = $o(Q(e, ["specific_states", "messages"]));
	return Q(e, ["safety_manager", "safety_state"]) === "on" && t.push("safety_detected"), Q(e, ["heating_failure_detection_manager", "heating_failure_state"]) === "on" && t.push("heating_failure"), Q(e, ["heating_failure_detection_manager", "cooling_failure_state"]) === "on" && t.push("cooling_failure"), Q(e, ["power_manager", "overpowering_state"]) === "on" && t.push("overpowering_detected"), [...new Set(t)].map((e) => ({
		key: e,
		severity: es(e)
	}));
}
function is(e) {
	return X(J(Q(e, ["configuration", "proportional_function"])), J(Q(e, ["vtherm_over_valve", "function"])), J(Q(e, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"function"
	])), J(Q(e, ["specific_states", "proportional_function"])));
}
function as(e, t, n) {
	let r = n.attributes, i = Z(r.specific_states), a = ns(r);
	if (!(a.length > 0 || i !== void 0 || Z(r.configuration) !== void 0)) return;
	let o = ts(r), s = X(Y(Q(r, ["vtherm_over_switch", "power_percent"])), Y(Q(r, [
		"vtherm_over_climate",
		"valve_regulation",
		"power_percent"
	])), Y(r.power_percent)), c = X(Y(Q(r, ["vtherm_over_valve", "valve_open_percent"])), Y(Q(r, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"valve_open_percent"
	])), Y(r.valve_open_percent)), l = Q(r, ["timed_preset_manager", "is_active"]) === !0, u = X(Q(r, ["lock_manager", "is_locked"]) === !0 ? !0 : void 0, Q(r, ["specific_states", "is_locked"]) === !0 ? !0 : void 0) === !0, d = rs(r), f = J(Q(r, ["vtherm_over_climate", "auto_fan_mode"])), p = J(Q(r, ["vtherm_over_climate", "current_auto_fan_mode"])), m = e.power_entity ? t.states[e.power_entity] : void 0, h = J(Q(r, ["requested_state", "hvac_mode"]));
	return {
		isVt: !0,
		types: a,
		configuration: {
			type: J(Q(r, ["configuration", "type"])),
			proportionalFunction: is(r),
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
function os(e) {
	return typeof e == "object" && e ? e : void 0;
}
function ss(e, t) {
	return t.reduce((e, t) => os(e)?.[t], e);
}
function cs(e) {
	return e.state === "unavailable" ? "unavailable" : e.state === "unknown" ? "unknown" : "available";
}
function ls(e, t, n) {
	return X(Y(n.humidity), e.humidity_entity ? Y(t.states[e.humidity_entity]?.state) : void 0);
}
function us(e, t) {
	if (!e.temperature_entity) return;
	let n = t.states[e.temperature_entity]?.state;
	if (!n || Zo(n)) return;
	let r = parseFloat(n);
	if (!Number.isFinite(r)) return;
	let i = n.indexOf(".");
	return {
		value: r,
		decimals: i >= 0 ? n.length - i - 1 : 0,
		entityId: e.temperature_entity
	};
}
function ds(e, t) {
	if (!e.power_entity) return {};
	let n = t.states[e.power_entity];
	return {
		instantPower: Y(n?.state),
		instantPowerUnit: J(n?.attributes.unit_of_measurement)
	};
}
function fs(e, t, n) {
	let r = n.attributes, i = us(e, t), a = X(Zo(n.state) ? void 0 : n.state, J(r.hvac_mode), J(ss(r, ["current_state", "hvac_mode"]))), o = X(J(r.preset_mode), J(ss(r, ["current_state", "preset"]))), s = a === "cool" && o === "frost" ? "none" : o;
	return {
		entityId: n.entity_id,
		name: e.name ?? J(r.friendly_name),
		availability: cs(n),
		hvacMode: a,
		hvacAction: J(r.hvac_action),
		targetTemperature: X(Y(r.temperature), Y(ss(r, ["current_state", "target_temperature"]))),
		currentTemperature: i?.value ?? Y(r.current_temperature),
		currentTemperatureDecimals: i?.decimals,
		temperatureEntityId: i?.entityId,
		currentHumidity: ls(e, t, r),
		hvacModes: Qo(r.hvac_modes),
		presetModes: Qo(r.preset_modes),
		presetMode: s,
		fanMode: J(r.fan_mode),
		fanModes: Qo(r.fan_modes),
		minTemp: Y(r.min_temp),
		maxTemp: Y(r.max_temp),
		targetTempStep: X(Y(r.target_temp_step), Y(ss(r, ["configuration", "target_temperature_step"])), .5),
		targetTemperatureRange: {
			low: Y(r.target_temp_low),
			high: Y(r.target_temp_high)
		},
		...ds(e, t)
	};
}
function ps(e, t, n) {
	return {
		climate: fs(e, t, n),
		vt: as(e, t, n)
	};
}
//#endregion
//#region src/data/config.ts
function ms(e) {
	return typeof e == "string";
}
function hs(e, t) {
	return ms(t) && e.includes(t);
}
function gs(e) {
	return e.startsWith("climate.");
}
function _s(e) {
	let t = {
		...ct,
		...e,
		type: Ve
	};
	return delete t.card_height, !ms(t.entity) || t.entity.trim() === "" ? {
		config: t,
		error: "missing_entity"
	} : (t.entity = t.entity.trim(), gs(t.entity) ? hs(rt, t.theme) ? hs(it, t.display_mode) ? hs(at, t.primary_display) ? hs(ot, t.additional_dashboards) ? hs(st, t.state_icons_layout) ? { config: t } : {
		config: t,
		error: "invalid_state_icons_layout"
	} : {
		config: t,
		error: "invalid_additional_dashboards"
	} : {
		config: t,
		error: "invalid_primary_display"
	} : {
		config: t,
		error: "invalid_display_mode"
	} : {
		config: t,
		error: "invalid_theme"
	} : {
		config: t,
		error: "invalid_entity"
	});
}
//#endregion
//#region src/equinox-card.ts
var vs = class extends T {
	static {
		this.properties = {
			hass: { attribute: !1 },
			_validation: { state: !0 }
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
			type: Ve,
			entity: Object.keys(e?.states ?? {}).find((e) => e.startsWith("climate.")) ?? "climate.example"
		};
	}
	setConfig(e) {
		this._validation = _s(e);
	}
	willUpdate() {
		this._viewModel = this._buildViewModel();
	}
	getCardSize() {
		return 3;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 4,
			min_columns: 4,
			max_columns: 12,
			min_rows: 3,
			max_rows: 8
		};
	}
	render() {
		let e = this.hass?.locale?.language ?? this.hass?.language;
		if (!this._validation) return this._renderMessage(E(e, "card.missing_entity"), !0);
		if (this._validation.error) return this._renderMessage(E(e, `card.${this._validation.error}`), !0);
		let t = this._validation.config.entity;
		if (!t) return this._renderMessage(E(e, "card.missing_entity"), !0);
		let n = this.hass?.states[t];
		return this.hass && !n ? this._renderMessage(E(e, "card.entity_not_found", { entity: t }), !0) : S`
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
		if (t) return ps(e, this.hass, t);
	}
	_renderMessage(e, t = !1) {
		return S`
      <ha-card>
        <div class=${t ? "error" : ""}>${e}</div>
      </ha-card>
    `;
	}
};
customElements.get("equinox-card") || customElements.define(He, vs), window.customCards = window.customCards ?? [];
var ys = window.customCards;
ys.filter((e) => e.type === "equinox-card" || e.type === "custom:equinox-card" || e.name === "Equinox").forEach((e) => {
	ys.splice(ys.indexOf(e), 1);
}), ys.push({
	type: He,
	name: Be,
	description: E(navigator.language, "card.description"),
	preview: !0
});
//#endregion
export { vs as EquinoxCard };
