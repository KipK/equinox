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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", v = h.reactiveElementPolyfillSupport, y = (e, t) => e, b = {
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
}, ee = (e, t) => !l(e, t), te = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	useDefault: !1,
	hasChanged: ee
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var x = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = te) {
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
		return this.elementProperties.get(e) ?? te;
	}
	static _$Ei() {
		if (this.hasOwnProperty(y("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(y("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(y("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? b : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? b : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ee)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[y("elementProperties")] = /* @__PURE__ */ new Map(), x[y("finalized")] = /* @__PURE__ */ new Map(), v?.({ ReactiveElement: x }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ne = globalThis, re = (e) => e, S = ne.trustedTypes, ie = S ? S.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, C = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, ae = "?" + w, oe = `<${ae}>`, se = document, ce = () => se.createComment(""), le = (e) => e === null || typeof e != "object" && typeof e != "function", ue = Array.isArray, de = (e) => ue(e) || typeof e?.[Symbol.iterator] == "function", fe = "[ 	\n\f\r]", pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, he = />/g, ge = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), _e = /'/g, ve = /"/g, ye = /^(?:script|style|textarea|title)$/i, be = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), T = be(1), E = be(2), xe = Symbol.for("lit-noChange"), D = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), Ce = se.createTreeWalker(se, 129);
function we(e, t) {
	if (!ue(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ie === void 0 ? t : ie.createHTML(t);
}
var Te = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = pe;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === pe ? c[1] === "!--" ? o = me : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ge) : (ye.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ge) : o = he : o === ge ? c[0] === ">" ? (o = i ?? pe, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ge : c[3] === "\"" ? ve : _e) : o === ve || o === _e ? o = ge : o === me || o === he ? o = pe : (o = ge, i = void 0);
		let d = o === ge && e[t + 1].startsWith("/>") ? " " : "";
		a += o === pe ? n + oe : l >= 0 ? (r.push(s), n.slice(0, l) + C + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [we(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ee = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Te(t, n);
		if (this.el = e.createElement(l, r), Ce.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Ce.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(C)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? je : r[1] === "?" ? Me : r[1] === "@" ? Ne : Ae
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ye.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = S ? S.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ce()), Ce.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], ce());
					}
				}
			} else if (i.nodeType === 8) if (i.data === ae) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += w.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = se.createElement("template");
		return n.innerHTML = e, n;
	}
};
function De(e, t, n = e, r) {
	if (t === xe) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = le(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = De(e, i._$AS(e, t.values), i, r)), t;
}
var Oe = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? se).importNode(t, !0);
		Ce.currentNode = r;
		let i = Ce.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ke(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Ce.nextNode(), a++);
		}
		return Ce.currentNode = se, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ke = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = De(this, e, t), le(e) ? e === D || e == null || e === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : e !== this._$AH && e !== xe && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? de(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== D && le(this._$AH) ? this._$AA.nextSibling.data = e : this.T(se.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ee.createElement(we(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Oe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Se.get(e.strings);
		return t === void 0 && Se.set(e.strings, t = new Ee(e)), t;
	}
	k(t) {
		ue(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ce()), this.O(ce()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = re(e).nextSibling;
			re(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ae = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = D, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = D;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = De(this, e, t, 0), a = !le(e) || e !== this._$AH && e !== xe, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = De(this, r[n + o], t, o), s === xe && (s = this._$AH[o]), a ||= !le(s) || s !== this._$AH[o], s === D ? e = D : e !== D && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, je = class extends Ae {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === D ? void 0 : e;
	}
}, Me = class extends Ae {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== D);
	}
}, Ne = class extends Ae {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = De(this, e, t, 0) ?? D) === xe) return;
		let n = this._$AH, r = e === D && n !== D || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== D && (n === D || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		De(this, e);
	}
}, Fe = ne.litHtmlPolyfillSupport;
Fe?.(Ee, ke), (ne.litHtmlVersions ??= []).push("3.3.3");
var Ie = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ke(t.insertBefore(ce(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Le = globalThis, O = class extends x {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ie(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return xe;
	}
};
O._$litElement$ = !0, O.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: O });
var Re = Le.litElementPolyfillSupport;
Re?.({ LitElement: O }), (Le.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var ze = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: ee
}, Be = (e = ze, t, n) => {
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
function k(e) {
	return (t, n) => typeof n == "object" ? Be(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function A(e) {
	return k({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/@kipk/load-ha-components/dist/load-ha-components.js
var Ve = [
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
], He = async (e) => {
	let t = e || Ve;
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
}, Ue = new Set(["unknown", "unavailable"]);
function We(e) {
	return e == null || typeof e == "string" && Ue.has(e);
}
function Ge(e) {
	if (!(We(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Ke(e) {
	if (We(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function j() {
	return typeof performance < "u" ? performance.now() : Date.now();
}
function M(e, t, n) {
	e && console.debug("[ha-better-history][perf]", t, n);
}
async function qe(e, t = {}) {
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
var Je = 6e4, Ye = 3, Xe = 350, Ze = 360 * 60 * 1e3, Qe = 3600 * 1e3, $e = 720 * 60 * 1e3, et = 2500, tt = 8e3, nt = 15e3, rt = 300, it = 700, at = 1100, ot = 80;
function st(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var ct = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function lt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ut(e, t) {
	return t.reduce((e, t) => lt(e) ? e[t] : void 0, e);
}
function dt(e) {
	return e[e.length - 1] ?? "";
}
function ft(e) {
	return e instanceof Error ? e.message : String(e);
}
function pt(e) {
	if (!lt(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function mt(e) {
	if (!lt(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function ht(e) {
	if (e instanceof ct) return !0;
	let t = pt(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = ft(e).toLowerCase(), r = `${mt(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function gt(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function _t(e) {
	return new Promise((t) => setTimeout(t, e));
}
function vt(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function yt(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new ct(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function bt(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function xt(e) {
	let t = bt(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function St(e, t, n) {
	let r = ut(e.attributes, t), i = bt(typeof r == "string" && Number.isFinite(Number(r)) ? Number(r) : r);
	if (i) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? dt(t),
		path: t,
		valueType: i
	};
}
function Ct(e, t) {
	return t === "number" ? Ke(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : Ge(e);
}
function wt(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return Ct(t.kind === "entity_state" ? e.state ?? e.s : ut(n, t.path ?? []), t.valueType);
}
function Tt(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function Et(e, t, n) {
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
function Dt(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function Ot(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = wt(i, t), o = Tt(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function kt(e, t, n, r) {
	let i = Ot(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var At = class {
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
		return i ? Mt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return Pt(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = Ft([...a.states, ...t]), a.stateCoverage = jt([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = jt([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return Bt(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Nt(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function jt(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function Mt(e, t, n) {
	return Nt(e, t, n) >= n - 1;
}
function Nt(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of jt(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function Pt(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of jt(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function Ft(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Tt(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function It(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= nt || t.requestDurationMs >= at, i = r || t.stateCount >= tt || t.requestDurationMs >= it || n >= ot, a = t.stateCount <= et && t.requestDurationMs <= rt && n <= ot / 2;
	return i && e > Qe ? {
		nextChunkMs: Math.max(Qe, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < $e ? {
		nextChunkMs: Math.min($e, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function Lt(e, t, n, r, i, a, o) {
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
async function Rt(e, t) {
	let n = 1;
	for (;;) {
		if (t.isCancelled?.()) throw Error("History request cancelled");
		let r = t.onPerformance ? j() : 0;
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
			let i = await yt(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(j() - r)
				}
			}), i;
		} catch (e) {
			let i = ht(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: ft(e),
					durationMs: Math.round(j() - r)
				}
			}), !a) throw e;
			await _t(gt(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function zt(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_state").map((e) => e.entityId)), l = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), u = s.filter((e) => c.has(e)), d = s.filter((e) => l.has(e)), f = o.accumulator ?? new At(), p = [], m = Math.max(1, Math.floor(o.chunkTimeoutMs ?? Je)), h = Math.max(1, Math.floor(o.maxChunkAttempts ?? Ye)), g = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? Xe)), _ = (e, t) => Rt(t, {
		taskId: e,
		timeoutMs: m,
		maxAttempts: h,
		retryBaseDelayMs: g,
		isCancelled: o.isCancelled,
		onPerformance: a
	}), v = /* @__PURE__ */ new Map(), y = (e, t, n, r, i, a, o) => {
		let s = [
			r,
			t.toISOString(),
			n.toISOString(),
			i ? "minimal" : "full",
			a ? "noattr" : "attrs",
			o ? "significant" : "all"
		].join("|"), c = v.get(s);
		c ? c.entityIds.push(e) : v.set(s, {
			entityIds: [e],
			start: t,
			end: n,
			coverageKind: r,
			minimalResponse: i,
			noAttributes: a,
			significantChangesOnly: o
		});
	}, b = [];
	for (let e of u) for (let t of f.missingIntervals(e, n, r, "state")) y(e, t.start, t.end, "state", !0, !0, !0);
	for (let e of d) for (let t of f.missingIntervals(e, n, r, "full")) b.push({
		entityId: e,
		start: t.start,
		end: t.end
	});
	let ee = b.reduce((e, t) => {
		let n = t.end.getTime() - t.start.getTime();
		return e + Math.max(1, Math.ceil(n / Ze));
	}, 0), te = v.size + ee, x = 0, ne = /* @__PURE__ */ new Set(), re = async (s, c, l) => {
		let u = x;
		if (x += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await vt();
		let d = j(), p = Dt(c, s.entityIds), m = j() - d, h = [...p.values()].reduce((e, t) => e + t.length, 0);
		a?.({
			event: "history.batch",
			details: {
				batchIndex: u,
				batchCount: te,
				entityCount: s.entityIds.length,
				stateCount: h,
				requestDurationMs: Math.round(l),
				normalizeDurationMs: Math.round(m)
			}
		});
		let g = j(), _ = /* @__PURE__ */ new Set();
		for (let [e, t] of p) f.integrate(e, t, s.start, s.end, s.coverageKind), _.add(e), ne.add(e);
		let v = j() - g;
		a?.({
			event: "history.merge",
			details: {
				batchIndex: u,
				entityCount: s.entityIds.length,
				stateCount: h,
				mergeDurationMs: Math.round(v)
			}
		});
		let y = 0;
		if (i) {
			await vt();
			let o = j(), c = /* @__PURE__ */ new Set();
			for (let i of t) ((s.coverageKind === "full" ? i.kind === "entity_attribute" : i.kind === "entity_state") && _.has(i.entityId) || !S.has(i.id)) && (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && (S.set(i.id, f.buildSeries(i, e, n, r)), c.add(i.id));
			let l = t.map((e) => S.get(e.id)).filter((e) => e !== void 0);
			y = j() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: l.length,
					pointCount: l.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(y)
				}
			}), i(l, [...c]), await vt(120);
		}
		return {
			stateCount: h,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: Math.round(m),
			mergeDurationMs: Math.round(v),
			buildDurationMs: Math.round(y)
		};
	};
	for (let t of v.values()) {
		let n = t.coverageKind === "full" ? "attr" : "state", r = [...new Set(t.entityIds)], i = `${n}:${r.join(",")}:${t.start.toISOString()}:${t.end.toISOString()}`;
		p.push({
			id: i,
			entityIds: r,
			start: t.start,
			end: t.end,
			coverageKind: t.coverageKind,
			run: () => _(i, () => Lt(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: te,
			attributeChunkHours: Ze / 36e5,
			minAttributeChunkHours: Qe / 36e5,
			maxAttributeChunkHours: $e / 36e5,
			adaptiveAttributeChunks: b.length > 0,
			cachedSourceCount: t.filter((e) => f.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: m,
			maxChunkAttempts: h,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let S = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? f.hasFullStates(i.entityId) : f.hasStates(i.entityId)) && S.set(i.id, f.buildSeries(i, e, n, r));
	await qe(p, {
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
			await re(e, t, n);
		}
	});
	let ie = 0;
	for (let t of b) {
		let n = Ze;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: ie
				}
			});
			let l = j(), u = await _(c, () => Lt(e, [t.entityId], i, o, !1, !1, !1)), d = j() - l;
			ie += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: ie
				}
			});
			let f = await re({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = It(n, f);
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
	let C = a ? j() : 0, w = t.map((t) => {
		let i = S.get(t.id);
		return i && !ne.has(t.entityId) ? i : f.buildSeries(t, e, n, r);
	}), ae = a ? j() - C : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: w.length,
			pointCount: w.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(ae)
		}
	}), w;
}
function Bt(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = wt(t, e), r = Tt(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: st(a.length > 0 ? Et(a, r, i) : kt(n, e, r, i))
	};
}
var Vt = 6e4, Ht = 48;
function Ut(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function Wt(e) {
	return e instanceof Error ? e.message : String(e);
}
function Gt(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function Kt(e, t) {
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
function qt(e, t) {
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
function Jt(e, t) {
	let n = e.findIndex((e) => e.time >= t);
	if (n === -1) return e.length > 1 ? [e[e.length - 1]] : e;
	let r = Math.max(0, n - 1);
	return r === 0 ? e : e.slice(r);
}
var Yt = class {
	constructor(e) {
		this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "", this.debugPerformance = !1, this._prevKey = "", this._nextSessionId = 0, this._progressUpdateScheduled = !1, this._lastProgressUpdateMs = 0, this.host = e, e.addController(this);
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
			accumulator: new At()
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
		return (e.activeEntityLoads.get(Gt(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = Gt(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = Gt(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = j() - this._lastProgressUpdateMs, n = Math.max(0, Ht - t);
		setTimeout(() => {
			requestAnimationFrame(() => {
				this._progressUpdateScheduled = !1, this._isCurrentSession(e) && (this._lastProgressUpdateMs = j(), this.host.requestUpdate());
			});
		}, n);
	}
	fetch(e, t, n, r) {
		let i = `${t.map((e) => e.id).join("|")}|${n.getTime()}|${r.getTime()}`;
		if (i === this._prevKey && !this.error) return;
		if (this._prevKey = i, t.length === 0) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "", this.host.requestUpdate();
			return;
		}
		if (!e) {
			this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = "No hass object", this.host.requestUpdate();
			return;
		}
		let a = this._createSession(t, n, r), o = j();
		this.series = [], this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !0, this.error = "", this._beginLoad(a, t), this.debugPerformance && M(this.debugPerformance, "controller.fetch_start", {
			sessionId: a.id,
			sourceCount: t.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), zt(e, a.sources, n, r, (t, i) => {
			if (!this._isCurrentSession(a)) return;
			let o = j(), s = this._availableSessionSeries(a, e, n, r, t);
			this.series = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), s), this.changedSourceIds = new Set(i);
			for (let e of s) a.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(a), this.debugPerformance && M(this.debugPerformance, "controller.progress_update", {
				sessionId: a.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				updateDurationMs: Math.round(j() - o)
			});
		}, this.debugPerformance ? (e) => {
			M(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(a),
			chunkTimeoutMs: Vt,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && Ut(() => {
				if (!this._isCurrentSession(a)) return;
				let s = j(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				Kt(this.series, l) || (this.series = l), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of c) a.sourceStates.set(e.source.id, "ready");
				this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && M(this.debugPerformance, "controller.fetch_complete", {
					sessionId: a.id,
					sourceCount: i.length,
					pointCount: i.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(j() - o),
					updateDurationMs: Math.round(j() - s)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(a)) {
				for (let e of t) a.sourceStates.set(e.id, "error");
				this.error = Wt(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && M(this.debugPerformance, "controller.fetch_error", {
					sessionId: a.id,
					totalDurationMs: Math.round(j() - o),
					error: this.error
				});
			}
		});
	}
	setImportedSeries(e, t, n) {
		this._cancelSession(), this.series = e, this.changedSourceIds = new Set(e.map((e) => e.source.id)), this.loading = !1, this.error = "", this._prevKey = `${e.map((e) => e.source.id).join("|")}|${t.getTime()}|${n.getTime()}`, this.host.requestUpdate();
	}
	setError(e) {
		this._cancelSession(), this.changedSourceIds = /* @__PURE__ */ new Set(), this.loading = !1, this.error = e, this.host.requestUpdate();
	}
	clearChangedSourceIds() {
		this.changedSourceIds.size !== 0 && (this.changedSourceIds = /* @__PURE__ */ new Set());
	}
	addSources(e, t, n, r) {
		if (!e || t.length === 0) return;
		let i = this._activeSession(n, r) ?? this._createSession(this.series.map((e) => e.source), n, r), a = new Set([...this.series.map((e) => e.source.id), ...i.sourceStates.keys()]), o = t.filter((e) => !a.has(e.id));
		if (o.length === 0) return;
		let s = new Set(i.activeEntityLoads.keys());
		this._addSessionSources(i, o);
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(Gt(e))), d = j();
		for (let e of o) i.sourceStates.set(e.id, c.includes(e) ? "queued" : "loading");
		if (c.length === 0) {
			let t = this._availableSessionSeries(i, e, n, r, []);
			if (t.length > 0) {
				this._mergePartial(t), this.changedSourceIds = new Set(t.map((e) => e.source.id));
				for (let e of t) i.sourceStates.set(e.source.id, "partial");
			}
			this.loading = i.activeLoads > 0, this._requestProgressUpdate(i), this.debugPerformance && M(this.debugPerformance, "controller.add_sources_joined_active_load", {
				sessionId: i.id,
				sourceCount: o.length,
				existingSourceCount: this.series.length
			});
			return;
		}
		this.loading = !0, this._beginLoad(i, c), this.debugPerformance && M(this.debugPerformance, "controller.add_sources_start", {
			sessionId: i.id,
			sourceCount: c.length,
			joinedActiveSourceCount: o.length - c.length,
			existingSourceCount: this.series.length,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}), this.host.requestUpdate(), zt(e, u, n, r, (t, a) => {
			if (!this._isCurrentSession(i)) return;
			let o = j(), s = this._availableSessionSeries(i, e, n, r, t);
			this._mergePartial(s), this.changedSourceIds = new Set(a);
			for (let e of s) i.sourceStates.set(e.source.id, "partial");
			this._requestProgressUpdate(i), this.debugPerformance && M(this.debugPerformance, "controller.add_sources_progress", {
				sessionId: i.id,
				sourceCount: t.length,
				pointCount: t.reduce((e, t) => e + t.points.length, 0),
				mergeDurationMs: Math.round(j() - o)
			});
		}, this.debugPerformance ? (e) => {
			M(this.debugPerformance, e.event, e.details);
		} : void 0, {
			isCancelled: () => !this._isCurrentSession(i),
			chunkTimeoutMs: Vt,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && Ut(() => {
				if (!this._isCurrentSession(i)) return;
				let a = j(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				Kt(this.series, s) || (this.series = s), this.changedSourceIds = /* @__PURE__ */ new Set();
				for (let e of o) i.sourceStates.set(e.source.id, "ready");
				this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && M(this.debugPerformance, "controller.add_sources_complete", {
					sessionId: i.id,
					sourceCount: t.length,
					pointCount: t.reduce((e, t) => e + t.points.length, 0),
					totalDurationMs: Math.round(j() - d),
					mergeDurationMs: Math.round(j() - a)
				});
			});
		}).catch((e) => {
			if (this._isCurrentSession(i)) {
				for (let e of c) i.sourceStates.set(e.id, "error");
				this.error = Wt(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && M(this.debugPerformance, "controller.add_sources_error", {
					sessionId: i.id,
					totalDurationMs: Math.round(j() - d),
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
			let r = Ot(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = Jt(qt(t.points, c), i);
			return l === t.points ? t : (o = !0, {
				...t,
				points: l
			});
		});
		o && (this.series = c, this.changedSourceIds = /* @__PURE__ */ new Set(), this.host.requestUpdate());
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
		this.series = this.series.filter((e) => !t.has(e.source.id)), this.changedSourceIds = /* @__PURE__ */ new Set();
		for (let t of e) this._session?.sourceStates.delete(t);
		this._prevKey = this.series.map((e) => e.source.id).join("|") + "|", this.host.requestUpdate();
	}
}, Xt = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], Zt = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, Qt = new Set(Object.values(Zt)), $t = Xt.filter((e) => !Qt.has(e));
function en(e) {
	return $t[e % $t.length];
}
function tn(e) {
	return e.trim().toLowerCase();
}
function nn(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function rn(e, t, n) {
	if (!t.has(tn(e))) return e;
	let r = [
		...$t.slice(n % $t.length),
		...$t.slice(0, n % $t.length),
		...Xt
	];
	for (let e of r) if (!t.has(tn(e))) return e;
	let i = n, a = nn(i);
	for (; t.has(tn(a));) i += 1, a = nn(i);
	return a;
}
function an(e) {
	return tn(e);
}
function on(e) {
	let t = e?.trim().toLowerCase();
	if (t) {
		if (t === "°c" || t === "c" || t === "celsius") return "c";
		if (t === "°f" || t === "f" || t === "fahrenheit") return "f";
		if (t === "k" || t === "kelvin") return "k";
	}
}
function N(e) {
	return on(e) !== void 0;
}
function sn(e, t) {
	let n = on(e), r = on(t);
	return n !== void 0 && n === r;
}
function cn(e) {
	let t = on(e);
	return t ? `temperature:${t}` : e && e.trim() !== "" ? e : "__unitless__";
}
var ln = 214;
function un(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function dn(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function fn(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = pn(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(mn(e, i));
	return c;
}
function pn(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function mn(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function hn(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function gn(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: dn(e - r, n),
			max: dn(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: dn(e - o, n),
		max: dn(t + o, n)
	};
}
function _n(e) {
	return 28 + (Math.max(e, 1) - 1) * ln + 180 + 18;
}
var vn = .1, yn = 12, bn = 2.5;
function xn(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function Sn(e) {
	return (e.min + e.max) / 2;
}
function Cn(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function wn(e, t) {
	let n = Math.abs(Cn(xn(e)) - Cn(xn(t))), r = Math.abs(Cn(Sn(e)) - Cn(Sn(t))), i = Tn(e.unit) === Tn(t.unit) ? 0 : 2;
	return n + r * .6 + i;
}
function Tn(e) {
	return cn(e);
}
function En(e) {
	return e.length > 0 && e.every((e) => N(e.unit));
}
function Dn(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i), s = i.find((e) => e / r <= vn);
	return s === void 0 ? !1 : r / s >= bn && (o / Math.max(a, 1e-9) >= yn || r / a >= yn);
}
function On(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = wn(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function kn(e, t) {
	let n = e.filter((e) => e.scalePreference === "primary"), r = e.filter((e) => e.scalePreference === "secondary"), i = e.filter((e) => e.scalePreference === "auto");
	if (r.length > 0 && r.length < e.length) return [[...n, ...i], r];
	if (n.length > 0 || !t || !Dn(e)) return [e, []];
	let [a, o] = On(e), s = [], c = [];
	for (let t of e) t.id === a.id ? s.push(t) : t.id === o.id ? c.push(t) : wn(t, a) <= wn(t, o) ? s.push(t) : c.push(t);
	return [s, c];
}
function An(e, t) {
	let n = jn(e);
	return n.length >= 2 ? [n[0].series, n[1].series] : kn(e, t);
}
function jn(e) {
	let t = [];
	for (let n of e) {
		let e = Tn(n.unit), r = t.find((t) => t.unit === e);
		r ? r.series.push(n) : t.push({
			unit: e,
			series: [n]
		});
	}
	return t;
}
function Mn(e) {
	let t = jn(e);
	if (t.length <= 2) return [e];
	let n = [];
	for (let e = 0; e < t.length; e += 2) n.push(t.slice(e, e + 2).flatMap((e) => e.series));
	return n;
}
function Nn(e, t, n, r, i) {
	let a = Math.min(...r.map((e) => e.min)), o = Math.max(...r.map((e) => e.max)), s = Math.max(...r.map((e) => e.precision)), c = gn(a, o, s), l = fn(c.min, c.max);
	return {
		ids: new Set(r.map((e) => e.id)),
		graphKey: e,
		sourceGraphKey: t,
		axis: n,
		min: c.min,
		max: c.max,
		precision: Math.max(s, hn(l)),
		ticks: l,
		top: i,
		height: 180
	};
}
function Pn(e, t = {}) {
	let n = t.autoScaleSplit ?? !0, r = [];
	for (let [t, n] of e.entries()) {
		if (n.valueType !== "number" && n.valueType !== "boolean") continue;
		let e = n.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = n.scaleMode === "manual" && n.scaleMin !== void 0 ? n.scaleMin : 0, a = n.scaleMode === "manual" && n.scaleMax !== void 0 ? n.scaleMax : 1, o = n.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = n.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = n.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => un(e))), l = n.valueType === "boolean" ? "group:boolean" : n.scaleGroupKey, u = r.find((e) => e.key === l);
		u || (u = {
			key: l,
			series: []
		}, r.push(u)), n.scaleMode === "manual" && (n.scaleMin !== void 0 && (o = Math.min(o, n.scaleMin)), n.scaleMax !== void 0 && (s = Math.max(s, n.scaleMax))), u.series.push({
			id: n.id,
			unit: n.unit,
			min: o,
			max: s,
			precision: c,
			scalePreference: n.scalePreference,
			order: t
		});
	}
	let i = 0;
	return r.flatMap((e) => (e.key === "group:boolean" ? [e.series] : Mn(e.series)).flatMap((t, r) => {
		let a = r === 0 ? e.key : `${e.key}::unit-graph:${r + 1}`, o = n && e.key !== "group:temperature" && !En(t), [s, c] = e.key === "group:boolean" ? [t, []] : An(t, o), l = 28 + i++ * ln, u = Nn(a, e.key, "left", s, l);
		return c.length > 0 ? [u, Nn(a, e.key, "right", c, l)] : [u];
	}));
}
function Fn(e, t, n, r) {
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
function In(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Ln(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Rn(e, t) {
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
function zn(e) {
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
function Bn(e, t, n) {
	let r = zn(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Vn(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Rn(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Rn(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${In(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${In(e.time, n).toFixed(1)},${Ln(e.value, o).toFixed(1)}`),
			`${In(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Vn(e, t) {
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
function P(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Hn(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Un(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function Wn(e, t) {
	return Gn(e, t, !0);
}
function Gn(e, t, n) {
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
var Kn = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function qn(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return Kn.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, Xt[(r + n.size) % Xt.length]), n.get(i));
}
function Jn(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function Yn(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = Un(e, t);
		if (!i) return [];
		let a = Fn(Xn(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? ir(a, n, i) : rr(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function Xn(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return Qn(i, a, t);
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function Zn(e, t, n) {
	if (!e || !t || e.time === t.time || e.time > n || t.time < n) return;
	let r = (n - e.time) / (t.time - e.time);
	return {
		time: n,
		value: e.value + (t.value - e.value) * r
	};
}
function Qn(e, t, n) {
	let r = [...e].reverse().find((e) => e.time < n.start), i = e.find((e) => e.time > n.start), a = [...e].reverse().find((e) => e.time < n.end), o = e.find((e) => e.time > n.end), s = t[0]?.time === n.start ? void 0 : Zn(r, i, n.start), c = t[t.length - 1]?.time === n.end ? void 0 : Zn(a, o, n.end);
	return [
		s,
		...t,
		c
	].filter((e) => e !== void 0);
}
function $n(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function er(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let i = Un(e, t);
		if (!i) return [];
		let a = Hn($n(i), i);
		return Gn(e, n, r.extendColumnToEnd).flatMap((t, r) => {
			let o = Number(t.value);
			if (!Number.isFinite(o)) return [];
			let s = P(t.start, n), c = P(t.end, n), l = Hn(o, i), u = Math.max(c - s, 1);
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
function tr(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return Wn(e, n).reduce((n, r) => {
			let i = qn(r.value, e.color, o, t), a = n[n.length - 1];
			return a && a.fill === i && Math.abs(a.end - r.start) < 1 ? a.end = r.end : n.push({
				start: r.start,
				end: r.end,
				fill: i
			}), n;
		}, []).map((t, r) => {
			let i = P(t.start, n), o = Math.max(P(t.end, n) - i, 1);
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
function nr(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: ar(n, e.precision)
		}));
	});
}
function rr(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	if (e.length === 1) return {
		points: `${P(e[0].time, t).toFixed(1)},${Hn(e[0].value, n).toFixed(1)}`,
		pathLength: 0
	};
	let r = [], i = 0;
	for (let a = 0; a < e.length - 1; a++) {
		let o = e[a], s = e[a + 1], c = P(o.time, t), l = Hn(o.value, n), u = P(s.time, t), d = Hn(s.value, n);
		a === 0 && r.push(`${c.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${l.toFixed(1)}`), r.push(`${u.toFixed(1)},${d.toFixed(1)}`), i += Math.abs(u - c) + Math.abs(d - l);
	}
	return {
		points: r.join(" "),
		pathLength: i
	};
}
function ir(e, t, n) {
	if (e.length === 0) return {
		points: "",
		pathLength: 0
	};
	let r = 0, i;
	return {
		points: e.map((e) => {
			let a = P(e.time, t), o = Hn(e.value, n);
			return i && (r += Math.hypot(a - i.x, o - i.y)), i = {
				x: a,
				y: o
			}, `${a.toFixed(1)},${o.toFixed(1)}`;
		}).join(" "),
		pathLength: r
	};
}
function ar(e, t) {
	return t <= 0 && Number.isInteger(e) ? String(e) : e.toFixed(t);
}
var or = 60 * 1e3, sr = 60 * or, F = 24 * sr, cr = [
	10 * or,
	15 * or,
	20 * or,
	30 * or,
	sr,
	2 * sr,
	3 * sr,
	4 * sr,
	6 * sr,
	8 * sr,
	12 * sr,
	F,
	2 * F,
	3 * F,
	7 * F,
	14 * F,
	30 * F,
	60 * F,
	90 * F
];
function lr(e, t) {
	for (let n of cr) if (e / n <= t) return n;
	return cr[cr.length - 1];
}
function ur(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = lr(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function dr(e, t) {
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
function fr(e, t) {
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
function pr(e, t) {
	return e.map((e) => ({
		...e,
		points: fr(e.points, t)
	}));
}
function mr(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function hr(e) {
	return cn(e);
}
function gr(e, t) {
	let n = mr(e);
	if (n === "group:boolean") return n;
	let r = [];
	for (let e of t) {
		let t = hr(e.unit);
		r.includes(t) || r.push(t);
	}
	let i = r.indexOf(hr(e.unit));
	return i < 0 || r.length <= 2 || i < 2 ? n : `${n}::unit-graph:${Math.floor(i / 2) + 1}`;
}
function _r(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = mr(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = mr(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => pr(r.get(e) ?? t, n));
}
function vr(e, t, n, r = !1, i = 12, a = !0, o = !0) {
	let s = { extendStairToEnd: a }, c = { extendColumnToEnd: a }, l = Pn(_r(e, t, n), { autoScaleSplit: o }), u = new Set(l.map((e) => e.graphKey)).size, d = _n(u), f = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, p = ur(n.start, n.end, i), m = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: l,
		plotBottom: d,
		chartHeight: Jn(d, f),
		numericLines: Yn(t, l, n, s),
		numericColumns: er(t, l, n, c),
		segments: tr(t, d, n),
		heatingAreas: r ? [] : Bn(t, l, n),
		yAxisLabels: nr(l),
		xAxisLabels: p.map((e) => ({
			x: P(e.time, n),
			label: dr(e.time, m),
			bold: e.bold
		}))
	};
}
function yr(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let a = Un(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: i
		}, s = Fn(Xn(e.points, n, e.lineMode, r), n, 40, 640), { points: c, pathLength: l } = e.lineMode === "line" ? ir(s, n, o) : rr(s, n, o);
		return {
			id: e.id,
			color: e.color,
			points: c,
			pathLength: l,
			lineWidth: e.lineWidth
		};
	});
}
function br(e, t, n, r, i) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let a = Un(e, t);
		if (!a) return [];
		let o = {
			...a,
			top: 28,
			height: r
		}, s = Hn($n(o), o);
		return Gn(e, n, i.extendColumnToEnd).flatMap((t, r) => {
			let i = Number(t.value);
			if (!Number.isFinite(i)) return [];
			let a = P(t.start, n), c = P(t.end, n), l = Hn(i, o);
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
function xr(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return Wn(e, n).reduce((t, n) => {
			let i = qn(n.value, e.color, a, r), o = t[t.length - 1];
			return o && o.fill === i && Math.abs(o.end - n.start) < 1 ? o.end = n.end : t.push({
				start: n.start,
				end: n.end,
				fill: i
			}), t;
		}, []).map((t, r) => {
			let a = P(t.start, n), o = Math.max(P(t.end, n) - a, 1);
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
function Sr(e) {
	return e >= 160 ? 5 : e >= 100 ? 4 : e >= 64 ? 3 : 2;
}
function Cr(e, t) {
	let n = t - 10, r = Sr(t), i = e.ticks.length <= r ? e.ticks : fn(e.min, e.max, r), a = Math.max(Math.abs(e.max - e.min), 1) * 1e-9, o = i.filter((t) => t >= e.min - a && t <= e.max + a), s = o.length > 0 ? o : [e.min, e.max], c = e.ticks === i ? e.precision : Math.max(e.precision, hn(s));
	return s.map((t) => ({
		y: 33 + n - (t - e.min) / (e.max - e.min) * n,
		value: ar(t, c)
	}));
}
function wr(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = rn(e.color, r, n * Xt.length + t);
			return r.add(an(a)), i.set(e.id, a), a === e.color ? e : {
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
function Tr(e, t = 12, n = 180) {
	let r = [], i = e.timeBounds, a = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), s = i.end - i.start, c = ur(i.start, i.end, t).map((e) => ({
		x: P(e.time, i),
		label: dr(e.time, s),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && a.length > 0) {
		let e = o.length, t = 28 + n + 16 + 6, s = e > 0 ? 22 + e * 14 : 0, l = 28 + n + s + 18, u = l + (e > 0 ? 0 : 16), d = wr(a, o, 0);
		r.push({
			series: d.visibleSeries,
			allSeries: d.allSeries,
			scales: [],
			graphHeight: n,
			svgHeight: l,
			canvasHeight: u,
			lines: [],
			columns: [],
			segments: xr(d.visibleSeries, t, i),
			yLabels: [],
			rightYLabels: [],
			xLabels: c,
			heatingAreas: []
		});
	}
	let l = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < l.length; t++) {
		let s = l[t], u = e.numericScales.filter((e) => e.graphKey === s), d = u.find((e) => e.axis === "left") ?? u[0], f = u.find((e) => e.axis === "right"), p = new Set(u.flatMap((e) => [...e.ids])), m = u[0]?.sourceGraphKey ?? s, h = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && mr(e) === m), g = h.filter((e) => gr(e, h) === s), _ = e.visibleSeries.filter((e) => p.has(e.id)), v = t === 0 ? [..._, ...o] : _, y = wr(t === 0 ? [...g, ...a] : g, v, t), b = y.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), ee = b.length, te = 28 + n + 16 + 6, x = ee > 0 ? 22 + ee * 14 : 0, ne = 28 + n + x + 18, re = ne + (ee > 0 ? 0 : 16), S = Cr(d, n), ie = f ? Cr(f, n) : [], C = u.map((e) => ({
			...e,
			top: 28,
			height: n
		})), w = C.find((e) => e.axis === "left") ?? C[0];
		r.push({
			series: y.visibleSeries,
			allSeries: y.allSeries,
			scale: w,
			scales: C,
			graphHeight: n,
			svgHeight: ne,
			canvasHeight: re,
			lines: yr(y.visibleSeries, C, i, { extendStairToEnd: e.extendStairToEnd }, n),
			columns: br(y.visibleSeries, C, i, n, { extendColumnToEnd: e.extendStairToEnd }),
			segments: xr(b, te, i),
			yLabels: S,
			rightYLabels: ie,
			xLabels: c,
			heatingAreas: e.heatingAreas.length > 0 ? Bn(e.visibleSeries, C, i) : []
		});
	}
	return r;
}
var Er = class {
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
			x: P(i, this._timeBounds),
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
		if (!this.tooltip) return D;
		let e = this.tooltip.activeLeft + (this.tooltip.x - 40) / 640 * this.tooltip.activeWidth, t = this.tooltip.activeLeft + (this.tooltip.tooltipX - 40) / 640 * this.tooltip.activeWidth, n = this.tooltip.placement === "above" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)";
		return T`
      <div class="tooltip-axis-pointer" style=${`left:${e.toFixed(1)}px;top:${this.tooltip.activeTop.toFixed(1)}px;height:${this.tooltip.activeHeight.toFixed(1)}px;`}></div>
      <div
        class="tooltip"
        style=${`left:clamp(150px,${t.toFixed(1)}px,calc(100% - 150px));top:${this.tooltip.y.toFixed(1)}px;transform:${n};`}
      >
        <div class="tooltip-time">${new Date(this.tooltip.time).toLocaleString()}</div>
        ${this.tooltip.values.map((e) => T`
            <div class="tooltip-row">
              <span class="tooltip-dot" style=${`background:${e.color}`}></span>
              <span class="tooltip-label">${e.label}</span>
              <span>${e.value}</span>
            </div>
          `)}
      </div>
    `;
	}
}, Dr = "temperature";
function Or(e) {
	return e.join(".");
}
function kr(e) {
	return e?.toLowerCase() === Dr;
}
function Ar(e, t) {
	if (!e || !t) return;
	let n = t[Or(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function jr(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit,
		scalePreference: e.scalePreference
	};
}
var Mr = 24, Nr = "2.5", Pr = [
	"current_temperature",
	"temperature",
	"hvac_action"
];
function Fr(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function Ir(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function Lr(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function Rr(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function zr(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : Nr : typeof e == "string" && e.trim() !== "" ? e.trim() : Nr;
}
function Br(e) {
	return e === "primary" || e === "secondary" ? e : "auto";
}
function Vr(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function Hr(e) {
	return e[e.length - 1] ?? "";
}
function Ur(e, t, n) {
	let r = e?.states[t];
	return r ? n ? St(r, n)?.valueType ?? "string" : xt(r)?.valueType ?? "string" : "number";
}
function Wr(e, t, n, r) {
	if (r) return r;
	if (n) return Hr(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Gr(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return Ar(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Kr(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function qr(e, t) {
	let n = t?.length === 1 ? t[0] : void 0;
	return e.startsWith("climate.") && (n === "current_temperature" || n === "temperature");
}
function Jr(e) {
	return qr(e.entity, e.attribute);
}
function Yr(e, t, n, r, i, a) {
	let o = Lr(e.attribute), s = Vr(e.entity, o), c = Ur(n, e.entity, o), l = Gr(n, e.entity, o, e.unit, r), u = e.group ?? e.scaleGroup ?? (qr(e.entity, o) ? "temperature" : void 0);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		forced: e.forced ?? !0,
		label: Wr(n, e.entity, o, e.label),
		color: e.color ?? en(t),
		unit: l,
		scaleGroupKey: Kr(s, l, u, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		scalePreference: Br(e.scalePreference),
		lineMode: Rr(e.lineMode ?? i),
		lineWidth: zr(e.lineWidth ?? a),
		valueType: c
	};
}
function Xr(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			forced: !0,
			label: e,
			color: en(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			scalePreference: "auto",
			lineMode: Rr(r),
			lineWidth: zr(i),
			valueType: "number"
		};
	}
	let o = xt(a);
	if (o) return {
		id: o.id,
		entity: e,
		forced: !0,
		label: o.label,
		color: en(t),
		unit: o.unit,
		scaleGroupKey: Kr(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		scalePreference: "auto",
		lineMode: Rr(r),
		lineWidth: zr(i),
		valueType: o.valueType
	};
}
function Zr(e, t) {
	let n = t?.states[e]?.attributes, r = n?.temperature_unit;
	if (typeof r == "string" && r !== "") return r;
	let i = n?.unit_of_measurement;
	if (typeof i == "string" && i !== "") return i;
	let a = t?.config?.unit_system?.temperature;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Qr(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Zr(e.entity, n), i = e.scaleGroupKey.startsWith("group:") ? e.scaleGroupKey.slice(6) : void 0;
	return [e, ...Pr.map((a) => {
		let o = [a], s = Vr(e.entity, o), c = Ur(n, e.entity, o), l = Zt[a] ?? en(t()), u = a === "current_temperature" || a === "temperature" ? r : void 0, d = a === "hvac_action" ? void 0 : i ?? "temperature";
		return {
			id: s,
			entity: e.entity,
			attribute: o,
			forced: e.forced,
			label: a,
			color: l,
			unit: u,
			scaleGroupKey: Kr(s, u, d, c),
			scaleMode: "auto",
			scalePreference: e.scalePreference,
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: c
		};
	})];
}
function $r(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && N(e.unit))?.unit ?? e.find((e) => e.unit && N(e.unit))?.unit;
}
function ei(e) {
	let t = $r(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = kr(e.unit), i = Jr(e), a = t && (r || sn(e.unit, t) || e.unit === void 0 && i) ? t : e.unit, o = e.scaleGroupKey;
		if (a && o.startsWith("unit:")) {
			let e = o.slice(5);
			(r && e === "temperature" || sn(e, a)) && (o = `unit:${a}`);
		}
		return n && e.valueType === "number" && a && N(a) && o.startsWith("unit:") && !Fr(e) && (o = "group:temperature"), a !== e.unit || o !== e.scaleGroupKey ? {
			...e,
			unit: a,
			scaleGroupKey: o
		} : e;
	});
}
function ti(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? Mr, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Yr(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Xr(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => Qr(e, () => u++, n)), l = ei(l), {
		startDate: Ir(o),
		endDate: Ir(i),
		showDatePicker: t?.showDatePicker ?? e.showDatePicker ?? !1,
		showEntityPicker: t?.showEntityPicker ?? e.showEntityPicker ?? !1,
		showLegend: t?.showLegend ?? e.showLegend ?? !0,
		showTooltip: t?.showTooltip ?? e.showTooltip ?? !0,
		showGrid: t?.showGrid ?? e.showGrid ?? !0,
		showScale: t?.showScale ?? e.showScale ?? !0,
		autoScaleSplit: t?.autoScaleSplit ?? e.autoScaleSplit ?? !0,
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
var ni = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back",
	done: "ui.common.done",
	search_entity: "ui.components.entity.entity-picker.search"
}, ri = {
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
	let n = ni[t];
	if (n && e?.localize) {
		let t = e.localize(n);
		if (t) return t;
	}
	return ri[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? ri.en?.[t] ?? t;
}
var ii = o`
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

  .axis-color-dots {
    position: absolute;
    display: flex;
    gap: 0;
    min-width: 20px;
    min-height: 24px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 14px;
    pointer-events: auto;
    z-index: 2;
  }

  .axis-color-dots--left {
    right: calc(var(--axis-label-gap) * -1 - 14px);
    justify-content: flex-end;
  }

  .axis-color-dots--right {
    left: calc(var(--axis-label-gap) * -1 - 14px);
    justify-content: flex-start;
  }

  .axis-color-dot-hit {
    position: relative;
    display: inline-flex;
    width: 10px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .axis-color-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 70%, transparent);
    transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  }

  .axis-color-dot-hit[draggable="true"] {
    cursor: grab;
    touch-action: none;
    -webkit-touch-callout: none;
  }

  .axis-color-dot-hit[draggable="true"]:hover .axis-color-dot {
    transform: scale(1.85);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 70%, transparent),
      0 0 0 4px color-mix(in srgb, currentColor 14%, transparent);
  }

  .axis-color-dot-hit[draggable="false"] {
    cursor: default;
  }

  .axis-color-dot-hit[dragging] {
    cursor: grabbing;
    opacity: 0.65;
  }

  .axis-color-dot-hit[dragging] .axis-color-dot {
    transform: scale(1.85);
  }

  .axis-drop-preview {
    display: inline-flex;
    width: 7px;
    height: 7px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex: 0 0 auto;
    pointer-events: none;
    animation: axis-drop-preview-in 120ms ease-out;
  }

  .axis-drop-preview .axis-color-dot {
    opacity: 0.95;
  }

  @keyframes axis-drop-preview-in {
    from {
      opacity: 0;
      transform: translateX(var(--axis-drop-preview-offset, 0)) scale(0.75);
    }
    to {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }

  .axis-color-dots--left {
    --axis-drop-preview-offset: 6px;
  }

  .axis-color-dots--right {
    --axis-drop-preview-offset: -6px;
  }

  .axis-touch-drag-preview {
    display: none;
    position: fixed;
    pointer-events: none;
    z-index: 200;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--better-history-bg, var(--card-background-color, #1e1e2e)) 80%, transparent),
      0 2px 8px rgb(0 0 0 / 30%);
  }

  @media (pointer: coarse) {
    .axis-color-dots {
      gap: 0;
      padding-inline: 18px;
    }

    .axis-color-dot-hit {
      width: 12px;
      height: 24px;
    }

    .axis-color-dot {
      width: 9px;
      height: 9px;
    }
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
    margin: 3px calc(40 / 720 * 100%) 0;
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
`, ai = [
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
], oi;
function si() {
	return oi ??= He(ai), oi;
}
var ci;
function li() {
	return ci ??= ui(), ci;
}
async function ui() {
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
function di() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function fi() {
	await li();
}
function pi(e) {
	return T`
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
var mi = 8, hi = 50, gi = 20, _i = [
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
function vi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function yi(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
function bi(e) {
	return typeof e == "string" && e.trim() !== "" ? e : void 0;
}
function xi(...e) {
	return e.find((e) => bi(e) !== void 0);
}
function Si(e) {
	return e.split(".")[0] ?? e;
}
function Ci(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function wi(e, t) {
	let n = yi(t), r = e.entities?.[t.entity_id], i = r?.device_id ? e.devices?.[r.device_id] : void 0, a = r?.area_id ?? i?.area_id, o = a ? e.areas?.[a] : void 0, s = xi(r?.name_by_user, r?.name, r?.original_name, n) ?? t.entity_id, c = xi(i?.name_by_user, i?.name), l = xi(o?.name), u = Si(t.entity_id);
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
function Ti(e, t) {
	return e ? (t ?? Object.values(e.states).filter((e) => e !== void 0)).map((t) => wi(e, t)) : [];
}
function Ei(e, t) {
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
function Di(e) {
	return [
		e.primary,
		e.secondary,
		e.id,
		...Object.values(e.search_labels).filter((e) => typeof e == "string")
	].filter((e) => typeof e == "string").map(Ci);
}
function Oi(e, t) {
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
		e.length >= 4 && t.some((t) => Ei(e, t) <= 1) && (n = Math.max(n ?? 0, 65));
	}
	return n;
}
function ki(e, t, n = gi) {
	let r = Ci(t).split(/\s+/).filter(Boolean);
	return r.length === 0 ? [] : e.map((e) => {
		let t = Di(e), n = 0;
		for (let e of r) {
			let r = Oi(e, t);
			if (r === void 0) return;
			n += r;
		}
		return {
			item: e,
			score: n
		};
	}).filter((e) => e !== void 0).sort((e, t) => t.score - e.score || e.item.primary.localeCompare(t.item.primary)).slice(0, n).map((e) => e.item);
}
var Ai = !1;
async function ji() {
	Ai || (Ai = !0, await si());
}
function Mi() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function Ni(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = Xi(e);
	return T`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? yi(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${Hi(e)}
      </div>
      <div
        class="entity-picker-row"
        @dragover=${(t) => e.onSourceDragOver(void 0, t)}
        @drop=${(t) => e.onSourceDrop(void 0, t)}
      >
        ${e.hideEmptyPickerState ? Fi(e) : Pi(e)}
        ${n.map((t) => zi(t, e))}
      </div>
      ${e.hideEmptyPickerState ? Ii(e) : D}
      ${e.loading ? T`
            <div class="history-loading-indicator" role="status" aria-label=${I(e.hass, "loading")}>
              <span class="history-loading-spinner"></span>
              <span class="history-loading-text">${I(e.hass, "loading")}</span>
            </div>
          ` : D}
      ${Bi(e)}
    </div>
  `;
}
function Pi(e) {
	return T`
    <ha-generic-picker
      class="entity-trigger"
      .hass=${e.hass}
      .addButtonLabel=${I(e.hass, "add_target")}
      .value=${""}
      .getItems=${e.getItems}
      .emptyLabel=${""}
      .searchLabel=${I(e.hass, "search_entity")}
      .searchKeys=${_i}
      @value-changed=${(t) => {
		let n = t.detail.value;
		n && e.onEntitySelected(n);
	}}
    ></ha-generic-picker>
  `;
}
function Fi(e) {
	let t = I(e.hass, "add_target");
	return T`
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
function Ii(e) {
	let t = I(e.hass, "search_entity"), n = e.entitySearch ?? "", r = n.trim() ? e.getAdditionalItems(n).filter(Li) : [];
	return T`
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
      ${r.length > 0 ? T`
        <div class="entity-select-results">
          ${r.map((t) => T`
            <button
              class="entity-select-result"
              @click=${() => {
		e.onEntitySearchChanged?.(""), e.onEntitySelected(t.id);
	}}
            >
              <span class="entity-browser-entry-label">${t.primary}</span>
              ${t.secondary ? T`<span class="entity-browser-entry-secondary">${t.secondary}</span>` : D}
            </button>
          `)}
        </div>
      ` : D}
    </div>
  `;
}
function Li(e) {
	return vi(e) && typeof e.id == "string" && typeof e.primary == "string";
}
function Ri(e) {
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
function zi(e, t) {
	let n = Ji(e.id, t), r = Ki(e.id, t), i = e.kind === "entity_state", a = t.hass?.states[e.entityId], o = i ? "entity-source-chip" : "attr-source-chip", s = t.draggingSourceId === e.id, c = (e.kind === "entity_attribute" || e.kind === "entity_state") && r && !n, l, u, d = () => {
		l !== void 0 && (clearTimeout(l), l = void 0), u = void 0;
	}, f = (n) => {
		c && (n.preventDefault(), n.stopPropagation(), t.onSourceSettingsOpen(e, n));
	};
	return T`
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
        ${i && a ? T`<ha-icon .icon=${Ri(a)}></ha-icon>` : T`<ha-icon .icon=${Vi(e.valueType)}></ha-icon>`}
      </span>
      <span class="source-chip-label">${e.label}</span>
      ${n ? D : T`<button
            class="source-chip-remove"
            @click=${(n) => {
		n.preventDefault(), t.onSourceRemoved(e.id);
	}}
          >&#x2715;</button>`}
    </div>
  `;
}
function Bi(e) {
	return e.sourceSettingsSourceId ? T`
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
  ` : D;
}
function Vi(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function Hi(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!vi(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return T`
    <div class="entity-browser">
      ${Ui(t, e)}
      <div class="entity-browser-list">
        ${t ? Wi(t, n, vi(r) ? r : {}, e) : T`<div class="entity-browser-empty">${I(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Ui(e, t) {
	return !e || t.path.length === 0 ? T`` : T`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => T`
          ${n > 0 ? T`<span class="entity-breadcrumb-sep">/</span>` : D}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function Wi(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => vi(r) ? !0 : bt(r) !== void 0 && !!St(e, [...t, n]));
	return T`
    <div class="entity-browser-entries">
      ${t.length > 0 ? T`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${I(r.hass, "back")}
            </div>
          ` : T`
            ${$i(e, r)}
            ${a ? T`
                  <div class="entity-browser-section-title">${I(r.hass, "attributes")}</div>
                  ${Gi(r)}
                ` : D}
          `}
      ${t.length === 0 && r.attributeSearch.trim() ? na(e, r) : i.map(([n, i]) => ea(e, n, i, t, r))}
    </div>
  `;
}
function Gi(e) {
	let t = I(e.hass, "search_attributes");
	return T`
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
function Ki(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function qi(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function Ji(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e && t.forced !== !1);
}
function Yi(e) {
	return {
		id: e.id,
		kind: e.attribute ? "entity_attribute" : "entity_state",
		entityId: e.entity,
		label: e.label,
		path: e.attribute,
		valueType: e.valueType,
		unit: e.unit,
		scalePreference: e.scalePreference
	};
}
function Xi(e) {
	let t = [...(e.resolved?.series ?? []).filter((e) => e.forced === !1).map(Yi), ...e.selectedSources], n = /* @__PURE__ */ new Set();
	return t.filter((e) => n.has(e.id) ? !1 : (n.add(e.id), !0));
}
function Zi(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function Qi(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function $i(e, t) {
	let n = xt(e);
	return n ? Qi(e, t) ? T`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Ki(n.id, t) ? T`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : qi(n.id, t) ? Ji(n.id, t) ? T`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : T`
        <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
          <span class="entity-browser-entry-label">${e.entity_id}</span>
        </div>
      ` : Zi(e.entity_id, t) ? T`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : T`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : D;
}
function ea(e, t, n, r, i) {
	if (vi(n)) return T`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = bt(n), o = [...r, t];
	if (!a) return D;
	let s = St(e, o);
	return s ? ta({
		label: t,
		source: s,
		type: a,
		opts: i
	}) : D;
}
function ta(e) {
	let { label: t, source: n, type: r, opts: i, secondary: a } = e, o = T`
    <span class="entity-browser-entry-text">
      <span class="entity-browser-entry-label">${t}</span>
      ${a ? T`<span class="entity-browser-entry-secondary">${a}</span>` : D}
    </span>
    <span class="entity-browser-entry-type">${r}</span>
  `;
	return Ki(n.id, i) ? T`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
        ${o}
      </div>
    ` : qi(n.id, i) ? Ji(n.id, i) ? T`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--forced">
        ${o}
      </div>
    ` : T`
        <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(n.id)}>
          ${o}
        </div>
      ` : T`
    <div class="entity-browser-entry" @click=${() => i.onSourceAdded(n)}>
      ${o}
    </div>
  `;
}
function na(e, t) {
	let n = ra(e, e.attributes, t.attributeSearch), r = n.slice(0, hi);
	return r.length === 0 ? T`<div class="entity-browser-search-empty">${I(t.hass, "no_matching_attributes")}</div>` : T`
    <div class="entity-browser-search-results">
      ${r.map((e) => ta({
		label: e.key,
		source: e.source,
		type: e.valueType,
		opts: t,
		secondary: e.dottedPath
	}))}
      ${n.length > r.length ? T`<div class="entity-browser-search-count">${I(t.hass, "attribute_results_limited")}</div>` : D}
    </div>
  `;
}
function ra(e, t, n) {
	let r = n.trim().toLocaleLowerCase();
	if (!r) return [];
	let i = [], a = (t, n, o) => {
		if (!(o > mi)) for (let [s, c] of Object.entries(t)) {
			let t = [...n, s];
			if (vi(c)) {
				a(c, t, o + 1);
				continue;
			}
			let l = bt(c), u = l ? St(e, t) : void 0;
			!l || !u || ia(t, c).includes(r) && i.push({
				key: s,
				dottedPath: t.join("."),
				valueType: l,
				source: u
			});
		}
	};
	return a(t, [], 0), i.sort((e, t) => {
		let n = aa(e, r), i = aa(t, r);
		return n === i ? e.dottedPath.length === t.dottedPath.length ? e.dottedPath.localeCompare(t.dottedPath) : e.dottedPath.length - t.dottedPath.length : n - i;
	});
}
function ia(e, t) {
	let n = typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : "";
	return [
		...e,
		e.join("."),
		n
	].join(" ").toLocaleLowerCase();
}
function aa(e, t) {
	let n = e.key.toLocaleLowerCase(), r = e.dottedPath.toLocaleLowerCase();
	return n.startsWith(t) ? 0 : r.startsWith(t) ? 1 : n.includes(t) ? 2 : r.includes(t) ? 3 : 4;
}
function L(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var oa = 60, sa = 1e3, ca = 24, la = 28, ua = 720, da = 1e3, fa = 18, pa = 44, ma = 12, ha = 14, ga = 48, _a = .34, va = .72, ya = 720, ba = 2, xa = 46, Sa = 22, Ca = [
	"current_temperature",
	"temperature",
	"hvac_action"
], wa = new Set(["current_temperature", "temperature"]), Ta = 5, Ea = "haBetterHistory";
function Da(e) {
	let t = 0;
	for (let n of e) n >= "0" && n <= "9" ? t += 6.2 : n === "." || n === "," ? t += 3.2 : n === "-" ? t += 4 : t += 6.2;
	return Math.ceil(t);
}
function Oa(e, t = 0) {
	let n = Math.max(0, ...e.map((e) => Da(e.value))), r = t > 0 ? t * 10 : 0, i = Math.max(n, r);
	return i > 0 ? `${i + Ta}px` : "0px";
}
function ka(e) {
	return cn(e);
}
function Aa(e) {
	let t = e?.trim();
	if (!t || !/^\d+$/.test(t)) return;
	let n = Number(t);
	return Number.isSafeInteger(n) && n > 0 ? n : void 0;
}
function ja(e) {
	return e.group ?? e.scaleGroup;
}
function Ma(e) {
	return e.id.startsWith("attr:climate.") && (e.id.endsWith(":current_temperature") || e.id.endsWith(":temperature"));
}
function Na(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && N(e.unit))?.unit ?? e.find((e) => e.unit && N(e.unit))?.unit;
}
function Pa(e) {
	let t = Na(e);
	return t ? e.map((e) => {
		let n = sn(e.unit, t) || e.unit === void 0 && Ma(e) ? t : e.unit;
		return n === e.unit ? e : {
			...e,
			unit: n
		};
	}) : e;
}
var R = class extends O {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showImportButton = !1, this.showExportButton = !0, this.showTimeRangeSelector = !0, this.showLineModeButtons = !0, this.showLegend = !0, this.showTooltip = !0, this.showGrid = !0, this.showScale = !0, this.autoScaleSplit = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._attributeSearch = "", this._path = [], this._selectedSources = [], this._removedConfigSourceIds = [], this._scalePreferences = {}, this._customEntityIds = [], this._entityPickerOpen = !1, this._datePickerOpen = !1, this._pendingAddedSources = [], this._data = new Yt(this), this._tooltip = new Er(this), this._browserHistoryInstanceId = `hbh-${Math.random().toString(36).slice(2)}`, this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._suppressLiveRangeAnimation = !1, this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._lastPointerDownInside = !1, this._syncingBrowserHistory = !1, this._selectingEntityForAttributeMenu = !1, this._importedSeriesMeta = /* @__PURE__ */ new Map(), this._importedDataActive = !1, this._containerWidth = 0, this._chartSurfaceHeight = 0, this._chartSurfaceConstrained = !1, this._lastContentHeight = 0, this._handleBrowserPopState = (e) => {
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
		}, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => Ti(this.hass), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return ki(Ti(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
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
		this.styles = ii;
	}
	connectedCallback() {
		super.connectedCallback(), si(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), this._resizeObserver = new ResizeObserver((e) => {
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
		if (this._measureGraphLayout(n ?? void 0, r), this._lastContentHeight > 0 && r > 0 && r === this._lastContentHeight && Math.abs(t - this._chartSurfaceHeight) > ba) return;
		this._lastContentHeight = r;
		let i = r < t - ba || t < r - ba, a = t < this._chartSurfaceHeight - ba, o = this._graphGroupRenderCache?.graphHeight ?? 180, s = this._chartSurfaceConstrained && o !== 180;
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
		let n = t.querySelector(".chart-graphs"), r = Math.round(t.getBoundingClientRect().height), i = n ? Math.round(n.offsetHeight) : 0, a = i > r - ba, o = Math.max(0, (r - i) / 2), s = e + 10 - o, c = t.style.getPropertyValue("--better-history-surface-header-offset"), l = c !== "";
		if (this._chartSurfaceConstrained || a) {
			let r = Math.ceil(e + 10);
			if (c === `${r}px`) return;
			this._lastContentHeight = n ? Math.round(n.offsetHeight) : 0, t.style.setProperty("--better-history-surface-header-offset", `${r}px`);
			return;
		}
		if (s <= 0) {
			if (!l || s > -ba) return;
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= sa * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, sa);
	}
	_stopLiveClock() {
		this._liveNowTimer !== void 0 && (clearInterval(this._liveNowTimer), this._liveNowTimer = void 0);
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[Ea] : void 0;
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
			[Ea]: {
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
		if (this._resolved && !this._importedDataActive) for (let n of this._activeResolvedSeries()) t.has(n.id) || (t.add(n.id), e.push(jr(n)));
		for (let n of this._selectedSources) for (let r of this._expandedSelectedSources(n)) t.has(r.id) || (t.add(r.id), e.push(r));
		return e;
	}
	_selectedSourcesForDisplay() {
		let e = /* @__PURE__ */ new Set(), t = [];
		for (let n of [...this._selectedSources, ...this._pendingAddedSources]) e.has(n.id) || (e.add(n.id), t.push(n));
		return t;
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
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && N(e.unit))?.unit;
	}
	willUpdate(e) {
		this._data.debugPerformance = this.debugPerformance || this.config?.debugPerformance === !0;
		let t = this._usesRollingRelativeRange(), n = this._effectiveDateRange(), r = n.start.getTime(), i = n.end.getTime(), a = this._rangeExtendsFuture();
		this._syncLiveClock(), e.has("hass") && (a || t) && this._data.updateLivePoints(this.hass, this._lastFetchSources, new Date(r), new Date(i));
		let o = r !== this._prevStartTime || i !== this._prevEndTime, s = this._containerWidth !== this._prevContainerWidth, c = e.has("_rangeStart") || e.has("_rangeEnd") || e.has("startDate") || e.has("endDate") || e.has("config") || e.has("hours"), l = (a || t) && o && !s && !c;
		this._suppressLiveRangeAnimation = l, (o || s) && (l || this._prevClipX.clear(), this._prevStartTime = r, this._prevEndTime = i, this._prevContainerWidth = this._containerWidth), this._data.loading && this._data.series.length === 0 && this._prevClipX.clear();
		let u = /* @__PURE__ */ "_rangeStart._rangeEnd._selectedSources._removedConfigSourceIds._scalePreferences.hass.config.entities.hours.startDate.endDate.showDatePicker.showEntityPicker.showLegend.showTooltip.showGrid.showScale.autoScaleSplit.width.height.lineMode.lineWidth.backgroundColor.graphTitle.titleFontFamily.titleFontSize.titleColor.language.debugPerformance.attributeUnits._runtimeLineMode".split(".");
		if (u.some((t) => e.has(t))) {
			let r = !u.some((t) => t !== "hass" && e.has(t));
			if ((e.has("config") || e.has("entities")) && (this._importedDataActive = !1, this._importedSeriesMeta.clear()), r) {
				let e = Math.floor(Date.now() / 1e3) * 1e3;
				if ((a || t) && this._lastFetchKey && (this._lastHassResolveTime = e, !t) || !t && e === this._lastHassResolveTime && this._lastFetchKey) return;
				this._lastHassResolveTime = e;
			}
			let i = ti({
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
				autoScaleSplit: this.autoScaleSplit,
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
			i.showDatePicker && !this._datePickerReady && fi().then(() => {
				this._datePickerReady = di(), this.requestUpdate();
			}), i.showEntityPicker && !this._entityComponentsReady && ji().then(() => {
				this._entityComponentsReady = Mi(), this.requestUpdate();
			});
		}
	}
	updated(e) {
		this._observeChartSurface(), this._observeSurfaceHeader(), e.has("_attributeMenuOpen") && this._attributeMenuOpen && this._positionEntityMenu(), e.has("_sourceSettingsSourceId") && this._sourceSettingsSourceId && this._positionSourceSettingsPopover(), (e.has("_attributeMenuOpen") || e.has("_entityPickerOpen") || e.has("_datePickerOpen") || e.has("_sourceSettingsSourceId")) && this._emitPickerOverlayState(), this._emitGraphVisibilityState(), this._animateClipPaths(), this._data.clearChangedSourceIds(), this._wasLoading = this._data.loading, this._suppressLiveRangeAnimation = !1;
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
		let r = ja(e);
		if (r) {
			let e = Aa(r);
			if (e !== void 0) {
				let r = (n ?? this._scaleGraphKeys(t))[e - 1];
				if (r) return r;
			}
			return `group:${r}`;
		}
		let i = e.entityId.startsWith("climate.") && e.path?.length === 1 && wa.has(e.path[0]);
		if (e.unit) {
			let n = t.find((t) => t.valueType === "number" && (t.unit === e.unit || sn(t.unit, e.unit)));
			if (n) return n.scaleGroupKey;
			let r = this._resolved?.series.find((t) => t.valueType === "number" && (t.unit === e.unit || sn(t.unit, e.unit)));
			if (r) return r.scaleGroupKey;
			let i = this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature");
			if (i && N(e.unit)) return i.scaleGroupKey;
			let a = t.find((e) => e.scaleGroupKey === "group:temperature");
			if (a && N(e.unit)) return a.scaleGroupKey;
		}
		if (i) {
			let e = t.find((e) => e.valueType === "number" && e.unit !== void 0 && N(e.unit));
			return e ? e.scaleGroupKey : "group:temperature";
		}
		return e.unit ? `unit:${e.unit}` : `series:${e.id}`;
	}
	_scaleGraphKeys(e) {
		return [...new Set(e.filter((e) => e.valueType === "number" || e.valueType === "boolean").map((e) => e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey))];
	}
	_usesScaleGraphAlias(e) {
		return e.valueType === "number" && Aa(ja(e)) !== void 0;
	}
	_renderSeriesFromSource(e, t, n, r, i = e.unit) {
		let a = e.entityId.startsWith("climate.") && e.path?.length === 1 ? e.path[0] : void 0;
		return {
			id: e.id,
			label: e.label,
			color: this._importedSeriesMeta.get(e.id)?.color ?? (a ? Zt[a] : void 0) ?? en(r),
			unit: i,
			scaleGroupKey: n,
			scaleMode: "auto",
			scalePreference: this._effectiveScalePreference(e.id, e.scalePreference ?? this._importedSeriesMeta.get(e.id)?.scalePreference),
			lineMode: this._runtimeLineMode ?? this._importedSeriesMeta.get(e.id)?.lineMode ?? this._defaultLineMode(),
			lineWidth: this._defaultLineWidth(),
			valueType: e.valueType,
			points: t?.points ?? []
		};
	}
	_unitForScaleGroup(e, t, n) {
		if (!e.unit || !N(e.unit)) return e.unit;
		let r = n.find((n) => n.scaleGroupKey === t && sn(n.unit, e.unit));
		return r?.unit ? r.unit : this._activeResolvedSeries().find((n) => n.scaleGroupKey === t && sn(n.unit, e.unit))?.unit ?? e.unit;
	}
	_defaultLineMode() {
		let e = this._effectiveLineMode();
		return e === "line" || e === "column" ? e : "stair";
	}
	_defaultLineWidth() {
		let e = this.config?.lineWidth ?? this.lineWidth;
		return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : "2.5" : typeof e == "string" && e.trim() !== "" ? e.trim() : "2.5";
	}
	_effectiveScalePreference(e, t) {
		return this._scalePreferences[e] ?? t ?? "auto";
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
		if (this._selectedSourcesForDisplay().length > 0) return !1;
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
				scalePreference: this._effectiveScalePreference(e.id, e.scalePreference),
				lineMode: this._runtimeLineMode ?? e.lineMode,
				lineWidth: e.lineWidth,
				valueType: e.valueType,
				points: t?.points ?? []
			}];
		}), t = [], n = new Set(e.map((e) => e.id));
		for (let e of this._selectedSourcesForDisplay()) for (let r of this._expandedSelectedSources(e)) {
			if (n.has(r.id)) continue;
			let e = this._data.series.find((e) => e.source.id === r.id);
			n.add(r.id), t.push({
				source: r,
				fetched: e
			});
		}
		let r = [...e], i = /* @__PURE__ */ new Map();
		for (let { source: e, fetched: n } of t) {
			if (this._usesScaleGraphAlias(e)) continue;
			let t = this._pickScaleGroup(e, r), a = this._unitForScaleGroup(e, t, r);
			i.set(e.id, {
				scaleGroupKey: t,
				unit: a
			}), r.push(this._renderSeriesFromSource(e, n, t, r.length, a));
		}
		let a = this._scaleGraphKeys(r);
		for (let { source: n, fetched: o } of t) {
			let t = i.get(n.id), s = t?.scaleGroupKey ?? this._pickScaleGroup(n, e, a);
			e.push(this._renderSeriesFromSource(n, o, s, e.length, t?.unit ?? this._unitForScaleGroup(n, s, r)));
		}
		return Pa(e);
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
			this._effectiveScalePreference(e.id, e.scalePreference),
			e.lineMode,
			e.lineWidth,
			e.valueType
		].join("~")) ?? [], ...this._selectedSourcesForDisplay().flatMap((e) => this._expandedSelectedSources(e)).map((e) => [
			e.id,
			e.label,
			e.kind,
			e.unit ?? "",
			ja(e) ?? "",
			this._effectiveScalePreference(e.id, e.scalePreference),
			e.valueType,
			this._defaultLineMode(),
			this._defaultLineWidth()
		].join("~"))].join("|");
	}
	_chartData() {
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading, c = this._resolved?.autoScaleSplit ?? !0;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.autoScaleSplit === c && n.containerWidth === o) return n.data;
		let l = this._maxXTicks(), u = this._buildRenderSeries(), d = u.filter((e) => !this._hiddenSeriesIds.includes(e.id)), f = {
			start: i,
			end: Math.max(a, i + 1)
		}, p = this._data.debugPerformance, m = p ? j() : 0, h = vr(u, d, f, this._resolved?.disableClimateOverlay ?? !1, l, s, c), g = p ? j() - m : 0;
		return p && M(p, "chart.build_data", {
			allSeriesCount: u.length,
			visibleSeriesCount: d.length,
			pointCount: d.reduce((e, t) => e + t.points.length, 0),
			groupCount: h.numericScales.length,
			segmentCount: h.segments.length,
			lineCount: h.numericLines.length,
			buildDurationMs: Math.round(g)
		}), this._chartRenderCache = {
			seriesRef: this._data.series,
			sourceKey: t,
			hiddenKey: e,
			startTime: i,
			endTime: a,
			extendStairToEnd: s,
			autoScaleSplit: c,
			containerWidth: o,
			data: h
		}, h;
	}
	_graphGroups(e) {
		let t = this._maxXTicks(), n = this._graphHeightFor(e), r = this._graphGroupRenderCache;
		if (r && r.dataRef === e && r.maxXTicks === t && r.graphHeight === n) return r.groups;
		let i = Tr(e, t, n);
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
	_lineDomKey(e, t) {
		return `${t}:${e}`;
	}
	_safeLineDomId(e) {
		return e.replace(/[^a-zA-Z0-9]/g, "_");
	}
	_shouldAnimateLine(e, t, n = this._lineTargetX(e)) {
		let r = this._prevClipX.get(t) ?? 0;
		return this._data.loading && !this._suppressLineAnimation && !this._suppressLiveRangeAnimation && this._data.changedSourceIds.has(e.id) && n > r;
	}
	_graphHeightFor(e) {
		if (!this._chartSurfaceConstrained || this._chartSurfaceHeight <= 0) return 180;
		let t = this._graphCountFor(e), n = this._measuredGraphLayout?.graphCount === t ? this._measuredGraphLayout.overheadHeight : void 0, r = this._estimatedGraphOverhead(e, t), i = n ?? r, a = this._chartSurfaceHeight - i, o = this._containerWidth > 0 ? this._containerWidth * 640 / 720 : 640, s = Math.max(180, Math.min(Math.floor(o * _a), Math.floor(this._chartSurfaceHeight / t * va), ya)), c = Math.floor(Math.max(0, a) / t);
		return Math.max(ga, Math.min(c, s));
	}
	_graphCountFor(e) {
		return Math.max(new Set(e.numericScales.map((e) => e.graphKey)).size, +!!e.allSeries.some((e) => e.valueType !== "number" && e.valueType !== "boolean"), 1);
	}
	_estimatedGraphOverhead(e, t) {
		let n = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, r = this._resolved?.showLegend ?? !0 ? t * 30 : 0;
		return t * 62 + r + (n > 0 ? 10 + n * 14 : 0);
	}
	_renderGraphGroup(e, t) {
		let n = this._resolved?.showLegend ?? !0, r = this._resolved?.showGrid ?? !0, i = this._resolved?.showScale ?? !0, a = e.series.map((e) => e.id).join("|"), o = i ? this._axisSeriesDots(e, "left") : [], s = i ? this._axisSeriesDots(e, "right") : [], c = o.length || +!!this._draggingAxisSeriesId, l = s.length || +!!this._draggingAxisSeriesId, u = i ? Oa(e.yLabels, c) : "0px", d = i ? Oa(e.rightYLabels, l) : "0px", f = 28 + e.graphHeight, p = f + 3, m = f + 16 + 6;
		return T`
      <div class="graph-section">
        <div class="graph-row" style=${`--axis-label-gap:${Ta}px;--axis-left-gutter:${u};--axis-right-gutter:${d};`}>
          <div
            class="axis-labels axis-labels--left"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("left", e)}
            @dragleave=${(e) => this._onAxisDragLeave("left", e)}
            @drop=${(t) => this._onAxisDrop(e, "left", t)}
          >
            ${i ? this._renderAxisColorDots(e, o, "left") : D}
            ${i ? e.yLabels.map((e) => T`<span class="y-axis-label y-axis-label--left" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : D}
          </div>
          <div class="graph-canvas" data-series-ids=${a} style="height:${e.canvasHeight}px">
            <svg
              viewBox="${40} 0 ${640} ${e.svgHeight}"
              height="${e.svgHeight}"
              preserveAspectRatio="none"
            >
              ${r ? e.xLabels.map((e) => E`
                      <line class="grid-line grid-line--vertical" x1=${e.x.toFixed(1)} y1=${18} x2=${e.x.toFixed(1)} y2=${f}></line>
                    `) : D}
              ${r ? e.yLabels.map((e) => E`
                      <line class="grid-line grid-line--horizontal" x1=${40} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : D}
              <defs>
                ${e.lines.map((n) => {
			let r = this._lineDomKey(n.id, t), i = this._safeLineDomId(r), a = `clip-${i}`, o = `rect-${i}`, s = this._lineTargetX(n);
			return E`
                    <clipPath id=${a}>
                      <rect id=${o} x="0" y="0" width=${this._shouldAnimateLine(n, r, s) ? this._prevClipX.get(r) ?? 0 : s} height=${e.svgHeight}></rect>
                    </clipPath>
                  `;
		})}
              </defs>
              ${e.heatingAreas.map((e) => E`<polygon class="climate-heating-area" points=${e.points}></polygon>`)}
              ${e.columns.map((e) => E`<rect class="column" x=${e.x.toFixed(1)} y=${e.y.toFixed(1)} width=${e.width.toFixed(1)} height=${e.height.toFixed(1)} fill=${e.fill}></rect>`)}
              ${e.lines.map((e) => {
			let n = this._lineDomKey(e.id, t), r = `clip-${this._safeLineDomId(n)}`, i = this._lineTargetX(e), a = this._shouldAnimateLine(e, n, i);
			return E`<polyline class="line" style=${`--better-history-line-width:${e.lineWidth};`} clip-path="url(#${r})" data-line-id=${e.id} data-line-dom-key=${n} data-animate-clip=${a ? "true" : D} data-target-x=${i} points=${e.points} stroke=${e.color}></polyline>`;
		})}
              ${e.segments.map((e) => E`<rect class="segment" x=${e.x} y=${e.y} width=${e.width} height="9" fill=${e.fill}></rect>`)}
              ${e.series.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").map((e, t) => E`<rect class="segment-border" x=${40} y=${m + t * 14} width=${640} height="9" fill="none" stroke=${e.color}></rect>`)}
              ${i ? E`<line class="axis" x1=${40} y1=${18} x2=${40} y2=${f}></line>` : D}
              ${i && e.rightYLabels.length > 0 ? E`<line class="axis" x1=${680} y1=${18} x2=${680} y2=${f}></line>` : D}
              ${i ? E`<line class="axis" x1=${40} y1=${f} x2=${680} y2=${f}></line>` : D}
              ${i && e.scale ? e.yLabels.map((e) => E`
                      <line class="axis tick" x1=${40} y1=${e.y.toFixed(1)} x2=${44} y2=${e.y.toFixed(1)}></line>
                    `) : D}
              ${i ? e.rightYLabels.map((e) => E`
                      <line class="axis tick" x1=${676} y1=${e.y.toFixed(1)} x2=${680} y2=${e.y.toFixed(1)}></line>
                    `) : D}
            </svg>
            ${i ? e.xLabels.map((e) => {
			let t = ((e.x - 40) / 640 * 100).toFixed(2);
			return T`<span class="x-axis-label ${e.bold ? "x-axis-label--bold" : ""}" style="left:${t}%;top:${p}px;">${e.label}</span>`;
		}) : D}
          </div>
          <div
            class="axis-labels axis-labels--right"
            style="height:${e.canvasHeight}px"
            @dragover=${(e) => this._onAxisDragOver("right", e)}
            @dragleave=${(e) => this._onAxisDragLeave("right", e)}
            @drop=${(t) => this._onAxisDrop(e, "right", t)}
          >
            ${i ? this._renderAxisColorDots(e, s, "right") : D}
            ${i ? e.rightYLabels.map((e) => T`<span class="y-axis-label y-axis-label--right" style="top:${e.y.toFixed(1)}px;">${e.value}</span>`) : D}
          </div>
        </div>
        ${n && e.allSeries.length > 0 ? T`
            <div class="graph-legend">
              ${e.allSeries.map((e) => T`
                  <button class="legend-item" ?hidden-series=${this._hiddenSeriesIds.includes(e.id)} @click=${() => this._toggleSeries(e.id)}>
                    <span class="swatch" style=${e.valueType === "string" ? `background:color-mix(in srgb,${e.color} 30%,transparent);border:1px solid ${e.color};` : `background:${e.color};`}></span>
                    <span class="legend-label">${e.label}</span>
                  </button>
                `)}
            </div>
          ` : D}
      </div>
    `;
	}
	_axisSeriesDots(e, t) {
		let n = new Set(e.scales.filter((e) => e.axis === t).flatMap((e) => [...e.ids]));
		return e.series.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && n.has(e.id));
	}
	_renderAxisColorDots(e, t, n) {
		let r = this._draggingAxisSeriesId;
		if (t.length === 0 && !r) return D;
		let i = this._axisDropTarget === n && r ? this._canDropAxisSeries(e, r, n) ? "valid" : "invalid" : void 0, a = i === "valid" && r ? e.series.find((e) => e.id === r)?.color : void 0;
		return T`
      <span
        class="axis-color-dots axis-color-dots--${n}"
        style="top:${1}px;"
        data-drop-state=${i ?? D}
        @dragover=${(e) => this._onAxisDragOver(n, e)}
        @dragleave=${() => this._onAxisDragLeave(n)}
        @drop=${(t) => this._onAxisDrop(e, n, t)}
        @touchstart=${(t) => this._onAxisDotsTouchStart(e, n, t)}
      >
        ${a && n === "left" ? T`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : D}
        ${t.map((t) => {
			let r = this._canDragAxisSeries(e, t.id, n);
			return T`
            <span
              class="axis-color-dot-hit axis-color-dot-hit--${n}"
              style="color:${t.color};"
              data-series-id=${t.id}
              draggable=${r}
              ?dragging=${this._draggingAxisSeriesId === t.id}
              title=${t.label}
              @dragstart=${(r) => this._onAxisDotDragStart(e, t.id, n, r)}
              @dragend=${() => this._onAxisDotDragEnd()}
              @contextmenu=${(e) => e.preventDefault()}
            >
              <span class="axis-color-dot" style="background:${t.color};"></span>
            </span>
          `;
		})}
        ${a && n === "right" ? T`<span class="axis-drop-preview"><span class="axis-color-dot" style="background:${a};"></span></span>` : D}
      </span>
    `;
	}
	_axisDraggableSeries(e) {
		let t = e.series.filter((e) => e.valueType === "number" || e.valueType === "boolean"), n = new Set(t.map((e) => ka(e.unit)));
		return t.length >= 2 && n.size === 1 ? t : [];
	}
	_canDragAxisSeries(e, t, n) {
		return this._canDropAxisSeries(e, t, n === "left" ? "right" : "left");
	}
	_canDropAxisSeries(e, t, n) {
		let r = this._axisDraggableSeries(e).find((e) => e.id === t);
		if (!r) return !1;
		let i = e.scales.find((e) => e.axis === n);
		return i ? e.series.filter((e) => i.ids.has(e.id)).every((e) => ka(e.unit) === ka(r.unit)) : n === "right";
	}
	_onAxisDotDragStart(e, t, n, r) {
		if (!this._canDragAxisSeries(e, t, n)) {
			r.preventDefault();
			return;
		}
		this._draggingAxisSeriesId = t, r.dataTransfer?.setData("text/plain", t), r.dataTransfer && (r.dataTransfer.effectAllowed = "move");
	}
	_clearAxisDrag() {
		this._draggingAxisSeriesId = void 0, this._axisDropTarget = void 0;
	}
	_onAxisDotDragEnd() {
		this._clearAxisDrag();
	}
	_onAxisDragOver(e, t) {
		(this._draggingAxisSeriesId ?? t.dataTransfer?.getData("text/plain")) && (this._axisDropTarget = e, t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"));
	}
	_onAxisDragLeave(e, t) {
		let n = t?.currentTarget, r = t?.relatedTarget;
		n instanceof Node && r instanceof Node && n.contains(r) || this._axisDropTarget === e && (this._axisDropTarget = void 0);
	}
	_onAxisDrop(e, t, n) {
		let r = this._draggingAxisSeriesId ?? n?.dataTransfer?.getData("text/plain");
		r && (n?.preventDefault(), this._axisDropTarget = void 0, this._canDropAxisSeries(e, r, t) && (this._scalePreferences = {
			...this._scalePreferences,
			[r]: t === "right" ? "secondary" : "primary"
		}));
	}
	_onAxisDotsTouchStart(e, t, n) {
		let r = n.touches?.[0], i = n.currentTarget;
		if (!r || !i) return;
		let a = this._nearestAxisDot(i, r.clientX, r.clientY);
		a && this._onAxisDotTouchStart(e, a, t, n);
	}
	_nearestAxisDot(e, t, n) {
		let r;
		return e.querySelectorAll(".axis-color-dot-hit[data-series-id]").forEach((e) => {
			let i = e.dataset.seriesId;
			if (!i) return;
			let a = e.getBoundingClientRect(), o = a.left + a.width / 2, s = a.top + a.height / 2, c = Math.hypot(t - o, n - s);
			(!r || c < r.distance) && (r = {
				id: i,
				distance: c
			});
		}), r?.id;
	}
	_onAxisDotTouchStart(e, t, n, r) {
		if (!this._canDragAxisSeries(e, t, n)) return;
		r.preventDefault();
		let i = e.series.find((e) => e.id === t);
		if (!i) return;
		let a = r.currentTarget?.closest(".graph-row");
		this._draggingAxisSeriesId = t;
		let o = this.renderRoot?.querySelector(".axis-touch-drag-preview");
		if (o) {
			o.style.display = "block", o.style.background = i.color;
			let e = r.touches?.[0];
			e && this._positionAxisTouchPreview(o, e);
		}
		let s = (e) => {
			e.preventDefault();
			let t = e.touches[0];
			t && (this._axisDropTarget = a ? this._touchDropTarget(a, t.clientX, t.clientY) : void 0, o && this._positionAxisTouchPreview(o, t));
		}, c = () => {
			document.removeEventListener("touchmove", s), document.removeEventListener("touchend", c), document.removeEventListener("touchcancel", c), o && (o.style.display = "none", o.style.background = "");
			let t = this._axisDropTarget;
			t && this._onAxisDrop(e, t), this._clearAxisDrag();
		};
		document.addEventListener("touchmove", s, { passive: !1 }), document.addEventListener("touchend", c), document.addEventListener("touchcancel", c);
	}
	_positionAxisTouchPreview(e, t) {
		e.style.left = `${t.clientX}px`, e.style.top = `${t.clientY - xa}px`;
	}
	_touchDropTarget(e, t, n) {
		let r = e.querySelector(".axis-labels--left"), i = e.querySelector(".axis-labels--right");
		if (r && this._isTouchInsideAxisDropZone(r, t, n)) return "left";
		if (i && this._isTouchInsideAxisDropZone(i, t, n)) return "right";
	}
	_isTouchInsideAxisDropZone(e, t, n) {
		let r = e.getBoundingClientRect();
		return t >= r.left - Sa && t <= r.right + Sa && n >= r.top && n <= r.bottom;
	}
	_animateClipPaths() {
		let e = this.renderRoot;
		e && e.querySelectorAll("polyline[data-line-id]").forEach((t) => {
			let n = t.getAttribute("data-line-id"), r = t.getAttribute("data-line-dom-key") ?? n, i = Number(t.getAttribute("data-target-x"));
			if (!n || !r || !Number.isFinite(i)) return;
			let a = this._prevClipX.get(r) ?? 0, o = this._safeLineDomId(r), s = e.querySelector(`#rect-${o}`);
			if (s instanceof SVGRectElement) {
				if (t.getAttribute("data-animate-clip") !== "true") {
					s.style.removeProperty("transition"), s.setAttribute("width", i.toString()), this._prevClipX.set(r, i);
					return;
				}
				s.style.setProperty("transition", "none"), s.setAttribute("width", a.toString()), s.getBoundingClientRect(), s.style.setProperty("transition", "width 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)"), s.setAttribute("width", i.toString()), this._prevClipX.set(r, i);
			}
			t.removeAttribute("data-animate-clip");
		});
	}
	_renderChartBody() {
		if (this._data.error) {
			this._queueGraphVisible(!1);
			let e = /timed?\s*out/i.test(this._data.error);
			return T`<div class="error">${I(this.hass, e ? "error_timeout" : "error")}</div>`;
		}
		if (!this._resolved || this._resolved.series.length === 0 && this._selectedSourcesForDisplay().length === 0) return this._queueGraphVisible(!1), D;
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
		return T`
      <div class="chart-surface">
        ${i ? T`
              <div class="chart-graphs"
                @pointermove=${n ? (e) => this._tooltip.handlePointerMove(e) : D}
                @pointerleave=${n ? () => this._tooltip.handlePointerLeave() : D}
              >
                ${r.map((e, t) => this._renderGraphGroup(e, t))}
                ${n ? this._tooltip.renderTooltip() : D}
              </div>` : this._data.loading ? D : T`<div class="empty">${I(this.hass, "empty")}</div>`}
      </div>
    `;
	}
	_renderEntityPickerUI() {
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? D : Ni({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSourcesForDisplay(),
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
			sourceSettingsGroup: this._sourceSettingsSource() ? ja(this._sourceSettingsSource()) : void 0,
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
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? la : ca;
	}
	_rangeThumbHalfWidthPx() {
		return (window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? ha : ma) / 2;
	}
	_rangeThumbHitWidthPx() {
		return window.matchMedia?.("(hover: none) and (pointer: coarse)").matches ? pa : fa;
	}
	_minViewSpanMs(e = this._rangeSliderTrackWidthPx()) {
		let { span: t } = this._loadedRangeMs(), n = this._minViewRangeGapPx(), r = Math.max(e ?? ua, n), i = Math.ceil(t * n / r), a = Math.min(6e4, Math.max(1, Math.floor(t / 1e3)));
		return Math.min(t, Math.max(1, i, a));
	}
	_minViewRangeStep(e) {
		let t = this._loadedRangeMs();
		return Math.max(1, Math.ceil(this._minViewSpanMs(e) / t.span * da));
	}
	_percentFromRangePointer(e, t) {
		return Math.round(Math.max(0, Math.min(t.width, e.clientX - t.left)) / t.width * da);
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
		return new Date(t + Math.max(0, Math.min(da, e)) / da * (n - t));
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
		e === "start" ? (c = Math.min(Math.max(t, 0), o - s), r && (r.value = String(c)), this._setViewRangeMs(this._dateFromRangePercent(c).getTime(), i.end.getTime(), n)) : (c = Math.max(Math.min(t, da), a + s), r && (r.value = String(c)), this._setViewRangeMs(i.start.getTime(), this._dateFromRangePercent(c).getTime(), n));
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
		let i = this._effectiveViewRange(), a = this._rangePercent(i.start, i.start), o = this._rangePercent(i.end, i.end), s = a / da * r.width, c = o / da * r.width, l = Math.max(0, Math.min(r.width, e.clientX - r.left)), u = this._percentFromRangePointer(e, r), d = this._rangeThumbHalfWidthPx(), f = this._rangeThumbHitWidthPx(), p = s <= f, m = c >= r.width - f, h = Math.max(0, s - f), g = Math.min(r.width, s + (p ? f : d)), _ = Math.max(0, c - (m ? f : d)), v = Math.min(r.width, c + f);
		if (l > g && l < _ || g >= _ && l >= s && l <= c) {
			this._startRangeSelectionDrag(e, t, n);
			return;
		}
		let y = l >= h && l <= g ? "start" : l >= _ && l <= v ? "end" : Math.abs(l - s) <= Math.abs(l - c) ? "start" : "end";
		this._startRangeThumbDrag(e, t, y, u);
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
			scalePreference: t.scalePreference,
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
				unit: typeof e.unit == "string" ? e.unit : void 0,
				scalePreference: e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : "auto"
			}, d = c.map((e) => this._parseImportedPoint(e, s)).filter((e) => e !== void 0).sort((e, t) => e.time - t.time);
			t.push({
				source: u,
				points: d
			}), n.set(i, {
				color: typeof e.color == "string" && e.color.trim() !== "" ? e.color : void 0,
				lineMode: e.lineMode === "line" || e.lineMode === "column" || e.lineMode === "stair" ? e.lineMode : void 0,
				scalePreference: e.scalePreference === "primary" || e.scalePreference === "secondary" ? e.scalePreference : void 0
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
		if (!this.toolsOpen || !this._resolved || this._lastGraphVisible === !1) return D;
		let e = this._effectiveViewRange(), t = this._rangePercent(e.start, this._resolved.startDate), n = this._rangePercent(e.end, this._resolved.endDate), r = this._defaultLineMode(), i = this._showTimeRangeSelector(), a = this._showLineModeButtons(), o = this._showExportButton(), s = this._showImportButton();
		return !i && !a && !o && !s ? D : T`
      <div class="tools-panel">
        <div class="tool-range">
          <div class="tool-range-row">
            ${i ? T`
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
              ` : D}
            <div class="tool-actions">
              ${a ? T`
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
		].map(([e, t, n]) => T`
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
              ` : D}
              ${o ? T`
                  <button
                    class="tool-action-button"
                    title=${I(this.hass, "export_data")}
                    aria-label=${I(this.hass, "export_data")}
                    @click=${() => this._exportData()}
                  >
                    <ha-icon .icon=${"mdi:download"}></ha-icon>
                  </button>
                ` : D}
              ${s ? T`
                  <button
                    class="tool-action-button"
                    title=${I(this.hass, "import_data")}
                    aria-label=${I(this.hass, "import_data")}
                    ?disabled=${this._hasForcedConfigSeries()}
                    @click=${() => this._importData()}
                  >
                    <ha-icon .icon=${"mdi:upload"}></ha-icon>
                  </button>
                ` : D}
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
		return T`
      <div class="root" style="width:${e};background:${t};">
        ${n ? T`<div class="graph-title" style=${r}>${n}</div>` : D}
        <div class="chart-layout">
          ${a ? T`<div class="surface-header">
                ${i ? T`<div class="controls-bar">
                      ${this._renderDatePicker()}
                      ${this._renderEntityPickerUI()}
                    </div>` : D}
                ${this._renderToolsPanel()}
              </div>` : D}
          <div class="chart-area">
            ${this._renderChartBody()}
          </div>
        </div>
      </div>
      <span class="axis-touch-drag-preview"></span>
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
		return !this._resolved?.showDatePicker || !this._datePickerReady ? D : pi({
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
		if (this._sourceSettingsSourceId) {
			let e = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((e) => e.dataset.sourceId === this._sourceSettingsSourceId);
			if (e && this._pathContainsElement(t, e)) return !0;
		}
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
		if (e.entityId.startsWith("climate.") && e.path.length === 1 && wa.has(e.path[0])) {
			let t = this._climateTemperatureUnit(e.entityId);
			if (t) return {
				...e,
				unit: t
			};
		}
		let t = Ar(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = kr(t) ? this._resolvedTemperatureUnit() ?? t : t;
		return !n || e.unit === n ? e : {
			...e,
			unit: n
		};
	}
	_climateTemperatureUnit(e) {
		let t = this.hass?.states[e], n = t?.attributes.temperature_unit;
		if (typeof n == "string" && n !== "") return n;
		let r = t?.attributes.unit_of_measurement;
		if (typeof r == "string" && r !== "") return r;
		let i = this.hass?.config?.unit_system?.temperature;
		return typeof i == "string" && i !== "" ? i : void 0;
	}
	_expandedSelectedSources(e) {
		if (e.kind !== "entity_state" || !e.entityId.startsWith("climate.")) return [this._sourceWithAttributeUnit(e)];
		let t = this.hass?.states[e.entityId];
		if (!t) return [this._sourceWithAttributeUnit(e)];
		let n = this._climateTemperatureUnit(e.entityId), r = Ca.map((r) => {
			let i = St(t, [r]), a = {
				id: `attr:${e.entityId}:${r}`,
				kind: "entity_attribute",
				entityId: e.entityId,
				label: r,
				path: [r],
				valueType: r === "hvac_action" ? "string" : "number",
				unit: wa.has(r) ? n : void 0,
				scalePreference: e.scalePreference
			}, o = i ?? a, s = ja(e);
			return wa.has(r) && n ? {
				...o,
				unit: n,
				group: s,
				scalePreference: e.scalePreference
			} : wa.has(r) ? {
				...o,
				group: s,
				scalePreference: e.scalePreference
			} : {
				...o,
				scalePreference: e.scalePreference
			};
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
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), oa);
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
L([k({ attribute: !1 })], R.prototype, "hass", void 0), L([k({ attribute: !1 })], R.prototype, "config", void 0), L([k({ attribute: !1 })], R.prototype, "entities", void 0), L([k({ attribute: !1 })], R.prototype, "attributeUnits", void 0), L([k({ type: Number })], R.prototype, "hours", void 0), L([k({ attribute: !1 })], R.prototype, "startDate", void 0), L([k({ attribute: !1 })], R.prototype, "endDate", void 0), L([k({
	type: Boolean,
	attribute: "show-date-picker"
})], R.prototype, "showDatePicker", void 0), L([k({
	type: Boolean,
	attribute: "show-entity-picker"
})], R.prototype, "showEntityPicker", void 0), L([k({
	type: Boolean,
	attribute: "show-import-button"
})], R.prototype, "showImportButton", void 0), L([k({
	type: Boolean,
	attribute: "show-export-button"
})], R.prototype, "showExportButton", void 0), L([k({
	type: Boolean,
	attribute: "show-time-range-selector"
})], R.prototype, "showTimeRangeSelector", void 0), L([k({
	type: Boolean,
	attribute: "show-line-mode-buttons"
})], R.prototype, "showLineModeButtons", void 0), L([k({
	type: Boolean,
	attribute: "show-legend"
})], R.prototype, "showLegend", void 0), L([k({
	type: Boolean,
	attribute: "show-tooltip"
})], R.prototype, "showTooltip", void 0), L([k({
	type: Boolean,
	attribute: "show-grid"
})], R.prototype, "showGrid", void 0), L([k({
	type: Boolean,
	attribute: "show-scale"
})], R.prototype, "showScale", void 0), L([k({
	type: Boolean,
	attribute: "auto-scale-split"
})], R.prototype, "autoScaleSplit", void 0), L([k({
	type: Boolean,
	attribute: "show-controls"
})], R.prototype, "showControls", void 0), L([k()], R.prototype, "width", void 0), L([k()], R.prototype, "height", void 0), L([k({ attribute: "line-mode" })], R.prototype, "lineMode", void 0), L([k({ attribute: "line-width" })], R.prototype, "lineWidth", void 0), L([k({ attribute: "background-color" })], R.prototype, "backgroundColor", void 0), L([k({ attribute: "graph-title" })], R.prototype, "graphTitle", void 0), L([k({ attribute: "title-font-family" })], R.prototype, "titleFontFamily", void 0), L([k({ attribute: "title-font-size" })], R.prototype, "titleFontSize", void 0), L([k({ attribute: "title-color" })], R.prototype, "titleColor", void 0), L([k()], R.prototype, "language", void 0), L([k({
	type: Boolean,
	attribute: "debug-performance"
})], R.prototype, "debugPerformance", void 0), L([k({
	type: Boolean,
	attribute: "tools-open"
})], R.prototype, "toolsOpen", void 0), L([A()], R.prototype, "_resolved", void 0), L([A()], R.prototype, "_hiddenSeriesIds", void 0), L([A()], R.prototype, "_rangeStart", void 0), L([A()], R.prototype, "_rangeEnd", void 0), L([A()], R.prototype, "_viewStart", void 0), L([A()], R.prototype, "_viewEnd", void 0), L([A()], R.prototype, "_liveNow", void 0), L([A()], R.prototype, "_datePickerReady", void 0), L([A()], R.prototype, "_entityComponentsReady", void 0), L([A()], R.prototype, "_runtimeLineMode", void 0), L([A()], R.prototype, "_attributeMenuOpen", void 0), L([A()], R.prototype, "_attributeSearch", void 0), L([A()], R.prototype, "_selectedEntityId", void 0), L([A()], R.prototype, "_path", void 0), L([A()], R.prototype, "_selectedSources", void 0), L([A()], R.prototype, "_removedConfigSourceIds", void 0), L([A()], R.prototype, "_scalePreferences", void 0), L([A()], R.prototype, "_customEntityIds", void 0), L([A()], R.prototype, "_entityPickerOpen", void 0), L([A()], R.prototype, "_datePickerOpen", void 0), L([A()], R.prototype, "_draggingSourceId", void 0), L([A()], R.prototype, "_draggingAxisSeriesId", void 0), L([A()], R.prototype, "_axisDropTarget", void 0), L([A()], R.prototype, "_sourceSettingsSourceId", void 0), L([A()], R.prototype, "_pendingAddedSources", void 0), L([A()], R.prototype, "_importedDataActive", void 0), L([A()], R.prototype, "_containerWidth", void 0), L([A()], R.prototype, "_chartSurfaceHeight", void 0), L([A()], R.prototype, "_chartSurfaceConstrained", void 0);
var Fa = "haBetterHistory";
function Ia(e) {
	return e?.group ?? e?.scaleGroup;
}
var z = class extends O {
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
		}, this._getItems = () => Ti(this.hass), this._getAdditionalItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = new Set(this._pickerEntities().map((e) => e.entity_id));
			return ki(Ti(this.hass, Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !t.has(e.entity_id))), e);
		};
	}
	static {
		this.styles = [ii, o`
      :host {
        display: block;
      }
    `];
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), window.addEventListener("popstate", this._handleBrowserPopState), ji().then(() => {
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
		if (this._sourceSettingsSourceId) {
			let e = Array.from(this.renderRoot?.querySelectorAll(".source-chip") ?? []).find((e) => e.dataset.sourceId === this._sourceSettingsSourceId);
			if (e && this._pathContainsElement(t, e)) return !0;
		}
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
		let t = typeof e == "object" && e ? e[Fa] : void 0;
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
			[Fa]: {
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
		return this._componentsReady ? T`
      ${Ni({
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
			sourceSettingsGroup: Ia(this._sourceSettingsSource()),
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
    ` : T``;
	}
};
L([k({ attribute: !1 })], z.prototype, "hass", void 0), L([k({ attribute: !1 })], z.prototype, "initialSources", void 0), L([k({
	type: Boolean,
	attribute: "browser-history"
})], z.prototype, "browserHistory", void 0), L([A()], z.prototype, "_selectedSources", void 0), L([A()], z.prototype, "_attributeMenuOpen", void 0), L([A()], z.prototype, "_entityPickerOpen", void 0), L([A()], z.prototype, "_selectedEntityId", void 0), L([A()], z.prototype, "_entitySearch", void 0), L([A()], z.prototype, "_path", void 0), L([A()], z.prototype, "_attributeSearch", void 0), L([A()], z.prototype, "_componentsReady", void 0), L([A()], z.prototype, "_customEntityIds", void 0), L([A()], z.prototype, "_sourceSettingsSourceId", void 0), customElements.get("abh-series-picker") || customElements.define("abh-series-picker", z);
function La(e = "ha-better-history") {
	customElements.get(e) || customElements.define(e, R);
}
//#endregion
//#region src/const.ts
var Ra = "Equinox", za = "custom:equinox-card", Ba = "equinox-card", Va = "equinox-better-history", Ha = "equinox-card-editor", Ua = "liquid_glow", Wa = "classic", Ga = "setpoint", Ka = "auto", qa = [
	"heat",
	"cool",
	"heat_cool",
	"auto",
	"dry",
	"fan_only",
	"off"
], Ja = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:sun-snowflake-variant",
	auto: "mdi:thermostat-auto",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Ya = {
	heat: "heat",
	cool: "cool",
	heat_cool: "heat-cool",
	auto: "auto",
	dry: "dry",
	fan_only: "fan-only",
	off: "off"
}, Xa = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], B = {
	frost: "mdi:snowflake-alert",
	eco: "mdi:leaf",
	away: "mdi:account-arrow-right",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:bed",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Za = [
	"off",
	"on",
	"vertical",
	"horizontal",
	"both"
], Qa = {
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
}, $a = {
	off: "mdi:arrow-oscillating-off",
	Off: "mdi:arrow-oscillating-off",
	on: "mdi:arrow-expand-horizontal",
	On: "mdi:arrow-expand-horizontal"
}, eo = [
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
], to;
function no() {
	return to ??= He(eo), to;
}
//#endregion
//#region src/localize/languages/index.ts
var ro = {
	bg: {
		card: {
			description: "Карта на Lovelace за Versatile Thermostat и стандартни климатични елементи.",
			missing_entity: "Конфигурирайте климатичен елемент.",
			invalid_entity: "Конфигурираният елемент трябва да принадлежи към климатичния домейн.",
			invalid_theme: "Конфигурираната тема не е налична.",
			invalid_display_mode: "Конфигурираният режим на показване не е наличен.",
			invalid_primary_display: "Конфигурираният приоритет на показване не е наличен.",
			invalid_additional_dashboards: "Конфигурираният режим на панелите не е наличен.",
			invalid_state_icons_layout: "Конфигурираният макет на икони на състояние не е наличен.",
			entity_not_found: "Елемент не е намерен: {entity}",
			placeholder: "Equinox е готин за {entity}."
		},
		main: {
			status: {
				heating: "Отопление активно",
				cooling: "Охлаждане активно",
				auto: "Автоматичен",
				heat: "Отопление",
				cool: "Охлаждане",
				heat_cool: "Автоматичен",
				dry: "Сушене",
				fan_only: "Само вентилатор",
				off: "Изключено",
				boost: "Временен импулс",
				unavailable: "Недостъпно"
			},
			hvac: {
				heat: "Отопление",
				cool: "Охлаждане",
				heat_cool: "Отопление/Охлаждане",
				auto: "Автоматичен",
				dry: "Сушене",
				fan_only: "Само вентилатор",
				off: "Изключено"
			},
			hvac_action: {
				off: "Изключено",
				preheating: "Предварително загряване",
				heating: "Отопление активно",
				cooling: "Охлаждане активно",
				drying: "Сушене активно",
				fan: "Вентилатор активен",
				idle: "Неактивен",
				defrosting: "Разстойване"
			},
			preset: {
				none: "Без предустановка",
				frost: "Защита от замръзване",
				eco: "Eco",
				away: "Отсъстващ",
				comfort: "Комфорт",
				home: "Дом",
				sleep: "Сън",
				activity: "Активност",
				boost: "Импулс"
			},
			fan: {
				on: "Включено",
				auto: "Автоматичен",
				low: "Нисък",
				medium: "Среден",
				middle: "Среда",
				high: "Висок",
				top: "Горен",
				off: "Изключено",
				focus: "Фокус",
				diffuse: "Дифузия",
				auto_fan_none: "Нищо",
				auto_fan_low: "Нисък",
				auto_fan_medium: "Среден",
				auto_fan_high: "Висок",
				auto_fan_turbo: "Турбо",
				None: "Нищо",
				Turbo: "Турбо",
				unavailable: "Вентилатор"
			},
			swing: {
				off: "Изключено",
				on: "Включено",
				vertical: "Вертикална",
				horizontal: "Хоризонтална",
				both: "И двете",
				unavailable: "Люлеене"
			},
			lock: {
				locked: "Заключено",
				unlocked: "Отключено",
				code_required: "Изисква се код",
				enter_code: "Въведете код",
				wrong_code: "Неправилен код"
			},
			events: {
				hasDanger: "Критично предупреждение",
				hasAlert: "Предупреждение",
				hasOverpowering: "Претоварване",
				hasOpenWindow: "Прозорец е отворен",
				hasPresence: "Присъствието е открито",
				hasTimer: "Таймерът е активен"
			},
			messages: {
				hvac_off_manual: "Ръчно изключено",
				hvac_off_auto_start_stop: "Изключено чрез автоматичен старт/стоп",
				hvac_off_window_detection: "Изключено чрез откриване на прозорец",
				hvac_off_sleep_mode: "Изключено чрез режим на сън",
				hvac_off_safety_detection: "Изключено чрез режим на безопасност",
				hvac_off_central_mode: "Изключено чрез централен режим",
				safety_detected: "Режимът на безопасност е открит",
				overpowering_detected: "Претоварването е открито",
				target_temp_window_eco: "Цел. темп.: прозорец eco",
				target_temp_window_frost: "Цел. темп.: прозорец мраз",
				target_temp_power: "Цел. темп.: мощност",
				target_temp_central_mode: "Цел. темп.: централен режим",
				target_temp_activity_detected: "Цел. темп.: активност открита",
				target_temp_activity_not_detected: "Цел. темп.: без активност",
				target_temp_absence_detected: "Цел. темп.: отсъствието е открито",
				target_temp_timed_preset: "Синхронизирана предустановка активна",
				not_initialized: "Грешка при инициализация",
				heating_failure: "Открита е грешка при отопление",
				cooling_failure: "Открита е грешка при охлаждане"
			},
			actions: {
				decrease_temperature: "Намалете зададената температура",
				increase_temperature: "Увеличете зададената температура",
				low_temperature: "Нисък",
				high_temperature: "Висок",
				open_fan: "Отворете вентилатор",
				open_swing: "Отворете люлеене",
				open_menu: "Отворете меню",
				open_power_info: "Показване на индикаторите на мощност"
			}
		},
		dialog: {
			close: "Затворете",
			back: "Назад",
			fan: {
				title: "Вентилация",
				description_auto: "Автоматичният режим автоматично приспособява вентилацията към потребностите на отопление."
			},
			swing: {
				title: "Люлеене",
				vertical: "Вертикална",
				horizontal: "Хоризонтална"
			},
			hvac: { title: "Режим" },
			preset: { title: "Предустановка" },
			message: { title: "Съобщение" },
			menu: {
				title: "Меню",
				regulation: "Регулация",
				boost: "Временен импулс",
				history: "История"
			},
			history: {
				title: "История",
				load: "Зареждане",
				add: "Добавяне",
				add_entity: "Добавяне на елемент",
				loading: "Зареждане на история...",
				empty: "Няма история за този период.",
				no_attributes: "Няма избираем атрибут.",
				tools: "Инструменти",
				show_controls: "Показване на контролите на историята",
				hide_controls: "Скриване на контролите на историята",
				fullscreen: "Цял екран",
				exit_fullscreen: "Излизане от цял екран",
				sources: {
					current_temperature: "Текуща температура",
					temperature: "Целева температура",
					hvac_action: "Действие на HVAC"
				}
			},
			boost: {
				title: "Временен импулс",
				duration: "Продължителност в минути",
				minutes: "мин",
				hours: "ч",
				start: "Начало",
				stop: "Стоп",
				active: "Импулсът е активен",
				remaining_unknown: "Оставащото време е недостъпно",
				preset: "Синхронизирана предустановка",
				original_preset: "Предишна предустановка",
				start_description: "Когато обратното броене завърши, термостатът ще се върне в предишния режим.",
				active_description: "Когато обратното броене завърши, термостатът ще се върне в предишния режим.",
				active_description_with_preset: "Когато обратното броене завърши, термостатът ще се върне в предишния режим ({preset})."
			}
		},
		editor: {
			entity: "Елемент",
			name: "Име",
			diagnostic_entity: "Диагностичен елемент",
			power_entity: "Елемент на мощност",
			humidity_entity: "Елемент на влажност",
			temperature_entity: "Елемент на температура",
			theme: "Тема",
			display_mode: "Формат",
			primary_display: "Приоритет на показване",
			card_background_color: "Цвят на фона на картата",
			card_background_opacity: "Непрозрачност на фона на картата",
			disable_name: "Скриване на име",
			hide_lock_button: "Скриване на бутона за заключване",
			additional_dashboards: "Допълнителни панели",
			state_icons_layout: "Икони на състояние",
			border_glow_on_action: "Ръбовете светят само когато HVAC е активен",
			tabs: {
				general: "Общи",
				presentation: "Презентация",
				hvac: "Режими HVAC",
				preset: "Предустановки"
			},
			options: {
				theme: {
					flat: "Равен",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Класически",
					compact: "Компактен"
				},
				primary_display: {
					setpoint: "Зададена температура",
					sensors: "Сензори"
				},
				layout_orientation: {
					horizontal: "Хоризонтална",
					vertical: "Вертикална"
				},
				additional_dashboards: {
					auto: "Автоматичен",
					custom: "Персонализиран",
					disabled: "Деактивирано"
				}
			},
			hvac_modes: "Бутони HVAC",
			preset_modes: "Бутони предустановки",
			visibility: {
				help: "Махнете отметката на режим, за да скриете бутона му в Equinox, без да променяте възможностите на climate обекта в Home Assistant.",
				no_entity: "Първо изберете climate обект, за да се заредят поддържаните режими.",
				no_hvac_modes: "Този climate обект не предоставя поддържани HVAC режими.",
				no_presets: "Този climate обект не предоставя поддържани предустановки."
			}
		}
	},
	ca: {
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
				auto: "Auto",
				low: "Low",
				medium: "Medium",
				middle: "Middle",
				high: "High",
				top: "Top",
				off: "Off",
				focus: "Focus",
				diffuse: "Diffuse",
				auto_fan_none: "None",
				auto_fan_low: "Low",
				auto_fan_medium: "Medium",
				auto_fan_high: "High",
				auto_fan_turbo: "Turbo",
				None: "None",
				Turbo: "Turbo",
				unavailable: "Fan"
			},
			swing: {
				off: "Off",
				on: "On",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Both",
				unavailable: "Swing"
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
				low_temperature: "Low",
				high_temperature: "High",
				open_fan: "Open fan",
				open_swing: "Open swing",
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
			swing: {
				title: "Swing",
				vertical: "Vertical",
				horizontal: "Horizontal"
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
				start: "Start",
				stop: "Stop",
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
			card_background_color: "Color de fons de la targeta",
			card_background_opacity: "Opacitat del fons de la targeta",
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			border_glow_on_action: "Les vores brillen només quan l'HVAC està actiu",
			tabs: {
				general: "General",
				presentation: "Presentation",
				hvac: "Modes HVAC",
				preset: "Predefinits"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Glow"
				},
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
			},
			hvac_modes: "Botons HVAC",
			preset_modes: "Botons predefinits",
			visibility: {
				help: "Desmarca un mode per amagar el botó a Equinox sense canviar les capacitats de l'entitat climate a Home Assistant.",
				no_entity: "Selecciona primer una entitat climate per carregar els modes compatibles.",
				no_hvac_modes: "Aquesta entitat climate no mostra cap mode HVAC compatible.",
				no_presets: "Aquesta entitat climate no mostra cap predefinició compatible."
			}
		}
	},
	cs: {
		card: {
			description: "Karta Lovelace pro Versatile Thermostat a standardní entity klimatizace.",
			missing_entity: "Nakonfigurujte entitu klimatizace.",
			invalid_entity: "Nakonfigurovaná entita musí patřit do domény klimatizace.",
			invalid_theme: "Nakonfigurované téma není dostupné.",
			invalid_display_mode: "Nakonfigurovaný režim zobrazení není dostupný.",
			invalid_primary_display: "Nakonfigurovaná priorita zobrazení není dostupná.",
			invalid_additional_dashboards: "Nakonfigurovaný režim přístupového panelu není dostupný.",
			invalid_state_icons_layout: "Nakonfigurované rozložení ikon stavu není dostupné.",
			entity_not_found: "Entita nenalezena: {entity}",
			placeholder: "Equinox je připraven pro {entity}."
		},
		main: {
			status: {
				heating: "Topení aktivní",
				cooling: "Chlazení aktivní",
				auto: "Automatické",
				heat: "Topení",
				cool: "Chlazení",
				heat_cool: "Automatické",
				dry: "Sušení",
				fan_only: "Pouze ventilátor",
				off: "Vypnuto",
				boost: "Dočasný boost",
				unavailable: "Nedostupné"
			},
			hvac: {
				heat: "Topení",
				cool: "Chlazení",
				heat_cool: "Topení/Chlazení",
				auto: "Automatické",
				dry: "Sušení",
				fan_only: "Pouze ventilátor",
				off: "Vypnuto"
			},
			hvac_action: {
				off: "Vypnuto",
				preheating: "Předehřívání",
				heating: "Topení aktivní",
				cooling: "Chlazení aktivní",
				drying: "Sušení aktivní",
				fan: "Ventilátor aktivní",
				idle: "Nečinný",
				defrosting: "Odmrazování"
			},
			preset: {
				none: "Bez předvolby",
				frost: "Ochrana před mrazem",
				eco: "Eco",
				away: "Pryč",
				comfort: "Komfort",
				home: "Domů",
				sleep: "Spánek",
				activity: "Aktivita",
				boost: "Boost"
			},
			fan: {
				on: "Zapnuto",
				auto: "Automatické",
				low: "Nízko",
				medium: "Střední",
				middle: "Střed",
				high: "Vysoko",
				top: "Horní",
				off: "Vypnuto",
				focus: "Zaměření",
				diffuse: "Rozptyl",
				auto_fan_none: "Žádný",
				auto_fan_low: "Nízko",
				auto_fan_medium: "Střední",
				auto_fan_high: "Vysoko",
				auto_fan_turbo: "Turbo",
				None: "Žádný",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Vypnuto",
				on: "Zapnuto",
				vertical: "Vertikální",
				horizontal: "Horizontální",
				both: "Oba",
				unavailable: "Kyv"
			},
			lock: {
				locked: "Zamčeno",
				unlocked: "Odemčeno",
				code_required: "Vyžadován kód",
				enter_code: "Zadejte kód",
				wrong_code: "Nesprávný kód"
			},
			events: {
				hasDanger: "Kritické upozornění",
				hasAlert: "Upozornění",
				hasOverpowering: "Přetížení",
				hasOpenWindow: "Okno otevřeno",
				hasPresence: "Přítomnost zjištěna",
				hasTimer: "Časovač aktivní"
			},
			messages: {
				hvac_off_manual: "Ručně vypnuto",
				hvac_off_auto_start_stop: "Vypnuto automatickým spuštěním/zastavením",
				hvac_off_window_detection: "Vypnuto detekcí okna",
				hvac_off_sleep_mode: "Vypnuto režimem spánku",
				hvac_off_safety_detection: "Vypnuto režimem bezpečnosti",
				hvac_off_central_mode: "Vypnuto centrálním režimem",
				safety_detected: "Režim bezpečnosti zjištěn",
				overpowering_detected: "Přetížení zjištěno",
				target_temp_window_eco: "Cíl. teplota: okno eco",
				target_temp_window_frost: "Cíl. teplota: okno mraz",
				target_temp_power: "Cíl. teplota: výkon",
				target_temp_central_mode: "Cíl. teplota: centrální režim",
				target_temp_activity_detected: "Cíl. teplota: aktivita zjištěna",
				target_temp_activity_not_detected: "Cíl. teplota: bez aktivity",
				target_temp_absence_detected: "Cíl. teplota: absence zjištěna",
				target_temp_timed_preset: "Časovaná předvolba aktivní",
				not_initialized: "Chyba inicializace",
				heating_failure: "Chyba topení zjištěna",
				cooling_failure: "Chyba chlazení zjištěna"
			},
			actions: {
				decrease_temperature: "Snížit zadanou teplotu",
				increase_temperature: "Zvýšit zadanou teplotu",
				low_temperature: "Nízko",
				high_temperature: "Vysoko",
				open_fan: "Otevřít ventilátor",
				open_swing: "Otevřít kyv",
				open_menu: "Otevřít menu",
				open_power_info: "Zobrazit indikátory výkonu"
			}
		},
		dialog: {
			close: "Zavřít",
			back: "Zpět",
			fan: {
				title: "Ventilace",
				description_auto: "Automatický režim automaticky přizpůsobuje ventilaci potřebám topení."
			},
			swing: {
				title: "Kyv",
				vertical: "Vertikální",
				horizontal: "Horizontální"
			},
			hvac: { title: "Režim" },
			preset: { title: "Předvolba" },
			message: { title: "Zpráva" },
			menu: {
				title: "Menu",
				regulation: "Regulace",
				boost: "Dočasný boost",
				history: "Historie"
			},
			history: {
				title: "Historie",
				load: "Načíst",
				add: "Přidat",
				add_entity: "Přidat entitu",
				loading: "Načítání historie...",
				empty: "Žádná historie pro toto období.",
				no_attributes: "Žádný volitelný atribut.",
				tools: "Nástroje",
				show_controls: "Zobrazit ovládací prvky historie",
				hide_controls: "Skrýt ovládací prvky historie",
				fullscreen: "Celá obrazovka",
				exit_fullscreen: "Opustit celou obrazovku",
				sources: {
					current_temperature: "Aktuální teplota",
					temperature: "Cílová teplota",
					hvac_action: "Akce HVAC"
				}
			},
			boost: {
				title: "Dočasný boost",
				duration: "Doba trvání v minutách",
				minutes: "min",
				hours: "h",
				start: "Spustit",
				stop: "Zastavit",
				active: "Boost aktivní",
				remaining_unknown: "Zbývající čas není dostupný",
				preset: "Časovaná předvolba",
				original_preset: "Předchozí předvolba",
				start_description: "Když se odpočet skončí, termostat se vrátí do předchozího režimu.",
				active_description: "Když se odpočet skončí, termostat se vrátí do předchozího režimu.",
				active_description_with_preset: "Když se odpočet skončí, termostat se vrátí do předchozího režimu ({preset})."
			}
		},
		editor: {
			entity: "Entita",
			name: "Název",
			diagnostic_entity: "Diagnostická entita",
			power_entity: "Entita výkonu",
			humidity_entity: "Entita vlhkosti",
			temperature_entity: "Entita teploty",
			theme: "Téma",
			display_mode: "Formát",
			primary_display: "Priorita zobrazení",
			card_background_color: "Barva pozadí karty",
			card_background_opacity: "Neprůhlednost pozadí karty",
			disable_name: "Skrýt název",
			hide_lock_button: "Skrýt tlačítko zámku",
			additional_dashboards: "Další přístupové panely",
			state_icons_layout: "Ikony stavu",
			border_glow_on_action: "Okraje září jen když je HVAC aktivní",
			tabs: {
				general: "Obecné",
				presentation: "Prezentace",
				hvac: "Režimy HVAC",
				preset: "Předvolby"
			},
			options: {
				theme: {
					flat: "Plochý",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klasický",
					compact: "Kompaktní"
				},
				primary_display: {
					setpoint: "Zadaná teplota",
					sensors: "Senzory"
				},
				layout_orientation: {
					horizontal: "Horizontální",
					vertical: "Vertikální"
				},
				additional_dashboards: {
					auto: "Automatické",
					custom: "Vlastní",
					disabled: "Zakázáno"
				}
			},
			hvac_modes: "Tlačítka HVAC",
			preset_modes: "Tlačítka předvoleb",
			visibility: {
				help: "Vypněte režim, pokud chcete v Equinox skrýt jeho tlačítko, aniž se změní možnosti entity climate v Home Assistant.",
				no_entity: "Nejprve vyberte entitu climate, aby bylo možné načíst podporované režimy.",
				no_hvac_modes: "Tato entita climate neposkytuje žádné podporované režimy HVAC.",
				no_presets: "Tato entita climate neposkytuje žádné podporované předvolby."
			}
		}
	},
	da: {
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
				auto: "Auto",
				low: "Low",
				medium: "Medium",
				middle: "Middle",
				high: "High",
				top: "Top",
				off: "Off",
				focus: "Focus",
				diffuse: "Diffuse",
				auto_fan_none: "None",
				auto_fan_low: "Low",
				auto_fan_medium: "Medium",
				auto_fan_high: "High",
				auto_fan_turbo: "Turbo",
				None: "None",
				Turbo: "Turbo",
				unavailable: "Fan"
			},
			swing: {
				off: "Off",
				on: "On",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Both",
				unavailable: "Swing"
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
				low_temperature: "Low",
				high_temperature: "High",
				open_fan: "Open fan",
				open_swing: "Open swing",
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
			swing: {
				title: "Swing",
				vertical: "Vertical",
				horizontal: "Horizontal"
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
				start: "Start",
				stop: "Stop",
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
			card_background_color: "Kortets baggrundsfarve",
			card_background_opacity: "Kortets baggrundsgennemsigtighed",
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			border_glow_on_action: "Kanterne lyser kun når HVAC er aktiv",
			tabs: {
				general: "General",
				presentation: "Presentation",
				hvac: "HVAC-tilstande",
				preset: "Forudindstillinger"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Glow"
				},
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
			},
			hvac_modes: "HVAC-knapper",
			preset_modes: "Knapper til forudindstillinger",
			visibility: {
				help: "Fjern markeringen af en tilstand for at skjule knappen i Equinox uden at ændre climate-enhedens egenskaber i Home Assistant.",
				no_entity: "Vælg først en climate-enhed for at indlæse understøttede tilstande.",
				no_hvac_modes: "Denne climate-enhed viser ingen understøttede HVAC-tilstande.",
				no_presets: "Denne climate-enhed viser ingen understøttede forudindstillinger."
			}
		}
	},
	de: {
		card: {
			description: "Lovelace-Karte für Versatile Thermostat und Standard-Klimageräte.",
			missing_entity: "Konfigurieren Sie ein Klimagerät.",
			invalid_entity: "Das konfigurierte Gerät muss zur Klimadomäne gehören.",
			invalid_theme: "Das konfigurierte Design ist nicht verfügbar.",
			invalid_display_mode: "Der konfigurierte Anzeigemodus ist nicht verfügbar.",
			invalid_primary_display: "Die konfigurierte Anzeigepriorität ist nicht verfügbar.",
			invalid_additional_dashboards: "Der konfigurierte Dashboard-Modus ist nicht verfügbar.",
			invalid_state_icons_layout: "Das konfigurierte Zustandssymbollayout ist nicht verfügbar.",
			entity_not_found: "Gerät nicht gefunden: {entity}",
			placeholder: "Equinox ist bereit für {entity}."
		},
		main: {
			status: {
				heating: "Heizung aktiv",
				cooling: "Kühlung aktiv",
				auto: "Automatisch",
				heat: "Heizen",
				cool: "Kühlen",
				heat_cool: "Automatisch",
				dry: "Trocknung",
				fan_only: "Nur Lüfter",
				off: "Aus",
				boost: "Temporärer Boost",
				unavailable: "Nicht verfügbar"
			},
			hvac: {
				heat: "Heizen",
				cool: "Kühlen",
				heat_cool: "Heizen/Kühlen",
				auto: "Automatisch",
				dry: "Trocknung",
				fan_only: "Nur Lüfter",
				off: "Aus"
			},
			hvac_action: {
				off: "Aus",
				preheating: "Vorwärmung",
				heating: "Heizung aktiv",
				cooling: "Kühlung aktiv",
				drying: "Trocknung aktiv",
				fan: "Lüfter aktiv",
				idle: "Bereit",
				defrosting: "Enteisen"
			},
			preset: {
				none: "Kein Preset",
				frost: "Frostschutz",
				eco: "Öko",
				away: "Abwesend",
				comfort: "Komfort",
				home: "Zuhause",
				sleep: "Schlaf",
				activity: "Aktivität",
				boost: "Boost"
			},
			fan: {
				on: "An",
				auto: "Automatisch",
				low: "Niedrig",
				medium: "Mittel",
				middle: "Mitte",
				high: "Hoch",
				top: "Oben",
				off: "Aus",
				focus: "Fokus",
				diffuse: "Diffus",
				auto_fan_none: "Keine",
				auto_fan_low: "Niedrig",
				auto_fan_medium: "Mittel",
				auto_fan_high: "Hoch",
				auto_fan_turbo: "Turbo",
				None: "Keine",
				Turbo: "Turbo",
				unavailable: "Lüfter"
			},
			swing: {
				off: "Aus",
				on: "An",
				vertical: "Vertikal",
				horizontal: "Horizontal",
				both: "Beide",
				unavailable: "Lüfterschwung"
			},
			lock: {
				locked: "Gesperrt",
				unlocked: "Entsperrt",
				code_required: "Code erforderlich",
				enter_code: "Code eingeben",
				wrong_code: "Falscher Code"
			},
			events: {
				hasDanger: "Kritische Warnung",
				hasAlert: "Warnung",
				hasOverpowering: "Überlastung",
				hasOpenWindow: "Fenster offen",
				hasPresence: "Präsenz erkannt",
				hasTimer: "Timer aktiv"
			},
			messages: {
				hvac_off_manual: "Manuell ausgeschaltet",
				hvac_off_auto_start_stop: "Von Auto-Start/Stop ausgeschaltet",
				hvac_off_window_detection: "Von Fenstererkennung ausgeschaltet",
				hvac_off_sleep_mode: "Von Schlafmodus ausgeschaltet",
				hvac_off_safety_detection: "Von Sicherheitsmodus ausgeschaltet",
				hvac_off_central_mode: "Von Zentralmodus ausgeschaltet",
				safety_detected: "Sicherheitsmodus erkannt",
				overpowering_detected: "Überlastung erkannt",
				target_temp_window_eco: "Zieltemp.: Fenster-Öko",
				target_temp_window_frost: "Zieltemp.: Fenster-Frost",
				target_temp_power: "Zieltemp.: Leistung",
				target_temp_central_mode: "Zieltemp.: Zentralmodus",
				target_temp_activity_detected: "Zieltemp.: Aktivität erkannt",
				target_temp_activity_not_detected: "Zieltemp.: Keine Aktivität",
				target_temp_absence_detected: "Zieltemp.: Abwesenheit erkannt",
				target_temp_timed_preset: "Zeitgesteuertes Preset aktiv",
				not_initialized: "Initialisierungsfehler",
				heating_failure: "Heizfehler erkannt",
				cooling_failure: "Kühlungsfehler erkannt"
			},
			actions: {
				decrease_temperature: "Sollwert senken",
				increase_temperature: "Sollwert erhöhen",
				low_temperature: "Niedrig",
				high_temperature: "Hoch",
				open_fan: "Lüfter öffnen",
				open_swing: "Lüfterschwung öffnen",
				open_menu: "Menü öffnen",
				open_power_info: "Leistungsindikatoren anzeigen"
			}
		},
		dialog: {
			close: "Schließen",
			back: "Zurück",
			fan: {
				title: "Belüftung",
				description_auto: "Der Automatikmodus passt die Belüftung automatisch an die Heizanforderungen an."
			},
			swing: {
				title: "Lüfterschwung",
				vertical: "Vertikal",
				horizontal: "Horizontal"
			},
			hvac: { title: "Modus" },
			preset: { title: "Preset" },
			message: { title: "Nachricht" },
			menu: {
				title: "Menü",
				regulation: "Regelung",
				boost: "Temporärer Boost",
				history: "Verlauf"
			},
			history: {
				title: "Verlauf",
				load: "Laden",
				add: "Hinzufügen",
				add_entity: "Gerät hinzufügen",
				loading: "Verlauf wird geladen...",
				empty: "Kein Verlauf für diesen Zeitraum.",
				no_attributes: "Kein wählbares Attribut.",
				tools: "Werkzeuge",
				show_controls: "Verlaufssteuerelemente anzeigen",
				hide_controls: "Verlaufssteuerelemente ausblenden",
				fullscreen: "Vollbild",
				exit_fullscreen: "Vollbild beenden",
				sources: {
					current_temperature: "Aktuelle Temperatur",
					temperature: "Solltemperatur",
					hvac_action: "HVAC-Aktion"
				}
			},
			boost: {
				title: "Temporärer Boost",
				duration: "Dauer in Minuten",
				minutes: "min",
				hours: "h",
				start: "Start",
				stop: "Stop",
				active: "Boost aktiv",
				remaining_unknown: "Verbleibende Zeit nicht verfügbar",
				preset: "Zeitgesteuertes Preset",
				original_preset: "Vorheriges Preset",
				start_description: "Wenn der Countdown endet, kehrt der Thermostat zum vorherigen Modus zurück.",
				active_description: "Wenn der Countdown endet, kehrt der Thermostat zum vorherigen Modus zurück.",
				active_description_with_preset: "Wenn der Countdown endet, kehrt der Thermostat zum vorherigen Modus zurück ({preset})."
			}
		},
		editor: {
			entity: "Gerät",
			name: "Name",
			diagnostic_entity: "Diagnose-Gerät",
			power_entity: "Leistungs-Gerät",
			humidity_entity: "Feuchte-Gerät",
			temperature_entity: "Temperatur-Gerät",
			theme: "Design",
			display_mode: "Format",
			primary_display: "Anzeigepriorität",
			card_background_color: "Farbe des Kartenhintergrunds",
			card_background_opacity: "Opazität des Kartenhintergrunds",
			disable_name: "Name ausblenden",
			hide_lock_button: "Sperrschaltfläche ausblenden",
			additional_dashboards: "Zusätzliche Dashboards",
			state_icons_layout: "Statussymbole",
			border_glow_on_action: "Die Ränder leuchten nur bei aktiver HVAC-Aktion",
			tabs: {
				general: "Allgemein",
				presentation: "Präsentation",
				hvac: "HVAC-Modi",
				preset: "Presets"
			},
			options: {
				theme: {
					flat: "Flach",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klassisch",
					compact: "Kompakt"
				},
				primary_display: {
					setpoint: "Sollwert",
					sensors: "Sensoren"
				},
				layout_orientation: {
					horizontal: "Horizontal",
					vertical: "Vertikal"
				},
				additional_dashboards: {
					auto: "Automatisch",
					custom: "Benutzerdefiniert",
					disabled: "Deaktiviert"
				}
			},
			hvac_modes: "HVAC-Buttons",
			preset_modes: "Preset-Buttons",
			visibility: {
				help: "Deaktiviere einen Modus, um seinen Button in Equinox auszublenden, ohne die Fähigkeiten der climate-Entität in Home Assistant zu ändern.",
				no_entity: "Wähle zuerst eine climate-Entität aus, um unterstützte Modi zu laden.",
				no_hvac_modes: "Diese climate-Entität stellt keine unterstützten HVAC-Modi bereit.",
				no_presets: "Diese climate-Entität stellt keine unterstützten Presets bereit."
			}
		}
	},
	el: {
		card: {
			description: "Κάρτα Lovelace για Versatile Thermostat και τυπικές οντότητες κλίματος.",
			missing_entity: "Διαμορφώστε μια οντότητα κλίματος.",
			invalid_entity: "Η διαμορφωμένη οντότητα πρέπει να ανήκει στο πεδίο κλίματος.",
			invalid_theme: "Το διαμορφωμένο θέμα δεν είναι διαθέσιμο.",
			invalid_display_mode: "Η διαμορφωμένη λειτουργία εμφάνισης δεν είναι διαθέσιμη.",
			invalid_primary_display: "Η διαμορφωμένη προτεραιότητα εμφάνισης δεν είναι διαθέσιμη.",
			invalid_additional_dashboards: "Η διαμορφωμένη λειτουργία πίνακα δεν είναι διαθέσιμη.",
			invalid_state_icons_layout: "Η διαμορφωμένη διάταξη εικονιδίων κατάστασης δεν είναι διαθέσιμη.",
			entity_not_found: "Οντότητα δεν βρέθηκε: {entity}",
			placeholder: "Το Equinox είναι έτοιμο για {entity}."
		},
		main: {
			status: {
				heating: "Θέρμανση ενεργή",
				cooling: "Ψύξη ενεργή",
				auto: "Αυτόματο",
				heat: "Θέρμανση",
				cool: "Ψύξη",
				heat_cool: "Αυτόματο",
				dry: "Ξήρανση",
				fan_only: "Μόνο ανεμιστήρας",
				off: "Απενεργοποιημένο",
				boost: "Προσωρινή ενίσχυση",
				unavailable: "Μη διαθέσιμο"
			},
			hvac: {
				heat: "Θέρμανση",
				cool: "Ψύξη",
				heat_cool: "Θέρμανση/Ψύξη",
				auto: "Αυτόματο",
				dry: "Ξήρανση",
				fan_only: "Μόνο ανεμιστήρας",
				off: "Απενεργοποιημένο"
			},
			hvac_action: {
				off: "Απενεργοποιημένο",
				preheating: "Προθέρμανση",
				heating: "Θέρμανση ενεργή",
				cooling: "Ψύξη ενεργή",
				drying: "Ξήρανση ενεργή",
				fan: "Ανεμιστήρας ενεργός",
				idle: "Αδράνεια",
				defrosting: "Απόψυξη"
			},
			preset: {
				none: "Χωρίς προρύθμιση",
				frost: "Προστασία από παγετό",
				eco: "Eco",
				away: "Απόντας",
				comfort: "Άνεση",
				home: "Σπίτι",
				sleep: "Ύπνος",
				activity: "Δραστηριότητα",
				boost: "Ενίσχυση"
			},
			fan: {
				on: "Ενεργό",
				auto: "Αυτόματο",
				low: "Χαμηλό",
				medium: "Μεσαίο",
				middle: "Μέση",
				high: "Υψηλό",
				top: "Κορυφή",
				off: "Απενεργοποιημένο",
				focus: "Εστίαση",
				diffuse: "Διάχυση",
				auto_fan_none: "Κανένα",
				auto_fan_low: "Χαμηλό",
				auto_fan_medium: "Μεσαίο",
				auto_fan_high: "Υψηλό",
				auto_fan_turbo: "Turbo",
				None: "Κανένα",
				Turbo: "Turbo",
				unavailable: "Ανεμιστήρας"
			},
			swing: {
				off: "Απενεργοποιημένο",
				on: "Ενεργό",
				vertical: "Κάθετη",
				horizontal: "Οριζόντια",
				both: "Και οι δύο",
				unavailable: "Ταλάντωση"
			},
			lock: {
				locked: "Κλειδωμένο",
				unlocked: "Ξεκλείδωτο",
				code_required: "Απαιτείται κωδικός",
				enter_code: "Εισαγάγετε κωδικό",
				wrong_code: "Λανθασμένος κωδικός"
			},
			events: {
				hasDanger: "Κρίσιμη ειδοποίηση",
				hasAlert: "Ειδοποίηση",
				hasOverpowering: "Υπερφόρτωση",
				hasOpenWindow: "Παράθυρο ανοικτό",
				hasPresence: "Παρουσία ανιχνεύθηκε",
				hasTimer: "Χρονόμετρο ενεργό"
			},
			messages: {
				hvac_off_manual: "Απενεργοποιήθηκε χειροκίνητα",
				hvac_off_auto_start_stop: "Απενεργοποιήθηκε με αυτόματη έναρξη/διακοπή",
				hvac_off_window_detection: "Απενεργοποιήθηκε με ανίχνευση παραθύρου",
				hvac_off_sleep_mode: "Απενεργοποιήθηκε σε λειτουργία ύπνου",
				hvac_off_safety_detection: "Απενεργοποιήθηκε σε λειτουργία ασφαλείας",
				hvac_off_central_mode: "Απενεργοποιήθηκε σε κεντρική λειτουργία",
				safety_detected: "Ανιχνεύθηκε λειτουργία ασφαλείας",
				overpowering_detected: "Ανιχνεύθηκε υπερφόρτωση",
				target_temp_window_eco: "Θερμ. στόχου: παράθυρο eco",
				target_temp_window_frost: "Θερμ. στόχου: παράθυρο παγετό",
				target_temp_power: "Θερμ. στόχου: ισχύς",
				target_temp_central_mode: "Θερμ. στόχου: κεντρική λειτουργία",
				target_temp_activity_detected: "Θερμ. στόχου: δραστηριότητα ανιχνεύθηκε",
				target_temp_activity_not_detected: "Θερμ. στόχου: χωρίς δραστηριότητα",
				target_temp_absence_detected: "Θερμ. στόχου: απουσία ανιχνεύθηκε",
				target_temp_timed_preset: "Χρονοδιάγραμμα προρύθμισης ενεργό",
				not_initialized: "Σφάλμα αρχικοποίησης",
				heating_failure: "Ανιχνεύθηκε σφάλμα θέρμανσης",
				cooling_failure: "Ανιχνεύθηκε σφάλμα ψύξης"
			},
			actions: {
				decrease_temperature: "Μείωση σημείου ρύθμισης",
				increase_temperature: "Αύξηση σημείου ρύθμισης",
				low_temperature: "Χαμηλό",
				high_temperature: "Υψηλό",
				open_fan: "Ανοίξτε ανεμιστήρα",
				open_swing: "Ανοίξτε ταλάντωση",
				open_menu: "Ανοίξτε μενού",
				open_power_info: "Εμφάνιση δεικτών ισχύος"
			}
		},
		dialog: {
			close: "Κλείσιμο",
			back: "Πίσω",
			fan: {
				title: "Εξαερισμός",
				description_auto: "Η λειτουργία αυτόματης προσαρμογής τροποποιεί αυτόματα τον εξαερισμό στις ανάγκες θέρμανσης."
			},
			swing: {
				title: "Ταλάντωση",
				vertical: "Κάθετη",
				horizontal: "Οριζόντια"
			},
			hvac: { title: "Λειτουργία" },
			preset: { title: "Προρύθμιση" },
			message: { title: "Μήνυμα" },
			menu: {
				title: "Μενού",
				regulation: "Ρύθμιση",
				boost: "Προσωρινή ενίσχυση",
				history: "Ιστορικό"
			},
			history: {
				title: "Ιστορικό",
				load: "Φόρτωση",
				add: "Προσθήκη",
				add_entity: "Προσθήκη οντότητας",
				loading: "Φόρτωση ιστορικού...",
				empty: "Κανένα ιστορικό για αυτήν την περίοδο.",
				no_attributes: "Κανένα επιλεγμένο χαρακτηριστικό.",
				tools: "Εργαλεία",
				show_controls: "Εμφάνιση στοιχείων ελέγχου ιστορικού",
				hide_controls: "Απόκρυψη στοιχείων ελέγχου ιστορικού",
				fullscreen: "Πλήρης οθόνη",
				exit_fullscreen: "Έξοδος από πλήρη οθόνη",
				sources: {
					current_temperature: "Τρέχουσα θερμοκρασία",
					temperature: "Θερμοκρασία στόχου",
					hvac_action: "Ενέργεια HVAC"
				}
			},
			boost: {
				title: "Προσωρινή ενίσχυση",
				duration: "Διάρκεια σε λεπτά",
				minutes: "λ",
				hours: "ώ",
				start: "Έναρξη",
				stop: "Διακοπή",
				active: "Ενίσχυση ενεργή",
				remaining_unknown: "Υπολειπόμενος χρόνος μη διαθέσιμος",
				preset: "Χρονοδιάγραμμα προρύθμισης",
				original_preset: "Προηγούμενη προρύθμιση",
				start_description: "Όταν τελειώσει η αντίστροφη μέτρηση, ο θερμοστάτης θα επιστρέψει στην προηγούμενη λειτουργία.",
				active_description: "Όταν τελειώσει η αντίστροφη μέτρηση, ο θερμοστάτης θα επιστρέψει στην προηγούμενη λειτουργία.",
				active_description_with_preset: "Όταν τελειώσει η αντίστροφη μέτρηση, ο θερμοστάτης θα επιστρέψει στην προηγούμενη λειτουργία ({preset})."
			}
		},
		editor: {
			entity: "Οντότητα",
			name: "Όνομα",
			diagnostic_entity: "Δεδομένα διάγνωσης",
			power_entity: "Οντότητα ισχύος",
			humidity_entity: "Οντότητα υγρασίας",
			temperature_entity: "Οντότητα θερμοκρασίας",
			theme: "Θέμα",
			display_mode: "Μορφή",
			primary_display: "Προτεραιότητα εμφάνισης",
			card_background_color: "Χρώμα φόντου κάρτας",
			card_background_opacity: "Αδιαφάνεια φόντου κάρτας",
			disable_name: "Απόκρυψη ονόματος",
			hide_lock_button: "Απόκρυψη κουμπιού κλειδώματος",
			additional_dashboards: "Πρόσθετα ταμπλό",
			state_icons_layout: "Εικονίδια κατάστασης",
			border_glow_on_action: "Τα περιθώρια λάμπουν μόνο όταν το HVAC είναι ενεργό",
			tabs: {
				general: "Γενικά",
				presentation: "Παρουσίαση",
				hvac: "Λειτουργίες HVAC",
				preset: "Προρυθμίσεις"
			},
			options: {
				theme: {
					flat: "Επίπεδη",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Κλασσικό",
					compact: "Συμπαγής"
				},
				primary_display: {
					setpoint: "Σημείο ρύθμισης",
					sensors: "Αισθητήρες"
				},
				layout_orientation: {
					horizontal: "Οριζόντια",
					vertical: "Κάθετη"
				},
				additional_dashboards: {
					auto: "Αυτόματο",
					custom: "Προσαρμοσμένο",
					disabled: "Απενεργοποιημένο"
				}
			},
			hvac_modes: "Κουμπιά HVAC",
			preset_modes: "Κουμπιά προρυθμίσεων",
			visibility: {
				help: "Αποεπιλέξτε μια λειτουργία για να κρύψετε το κουμπί της στο Equinox χωρίς να αλλάξουν οι δυνατότητες της οντότητας climate στο Home Assistant.",
				no_entity: "Επιλέξτε πρώτα μια οντότητα climate για να φορτωθούν οι υποστηριζόμενες λειτουργίες.",
				no_hvac_modes: "Αυτή η οντότητα climate δεν αναφέρει υποστηριζόμενες λειτουργίες HVAC.",
				no_presets: "Αυτή η οντότητα climate δεν αναφέρει υποστηριζόμενες προρυθμίσεις."
			}
		}
	},
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
				auto: "Auto",
				low: "Low",
				medium: "Medium",
				middle: "Middle",
				high: "High",
				top: "Top",
				off: "Off",
				focus: "Focus",
				diffuse: "Diffuse",
				auto_fan_none: "None",
				auto_fan_low: "Low",
				auto_fan_medium: "Medium",
				auto_fan_high: "High",
				auto_fan_turbo: "Turbo",
				None: "None",
				Turbo: "Turbo",
				unavailable: "Fan"
			},
			swing: {
				off: "Off",
				on: "On",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Both",
				unavailable: "Swing"
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
				low_temperature: "Low",
				high_temperature: "High",
				open_fan: "Open fan",
				open_swing: "Open swing",
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
			swing: {
				title: "Swing",
				vertical: "Vertical",
				horizontal: "Horizontal"
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
			regulation: {
				title: "Regulation",
				loading: "Loading regulation dashboard...",
				invalid: "Regulation dashboard is invalid.",
				unavailable: "Regulation dashboard is unavailable.",
				custom_not_found: "Custom regulation dashboard not found.",
				section_missing: "Regulation section is unavailable.",
				empty_section: "This regulation section is empty.",
				source_missing: "Source unavailable",
				unsupported_block: "This block will be available in a later regulation step.",
				action_locked: "Action disabled: thermostat locked.",
				action_failed: "Action failed.",
				action_running: "Running action...",
				confirm_action_title: "Confirm action",
				confirm_action_text: "This action will call a Home Assistant service.",
				sections: "Regulation sections"
			},
			boost: {
				title: "Temporary boost",
				duration: "Duration in minutes",
				minutes: "min",
				hours: "h",
				start: "Start",
				stop: "Stop",
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
			card_background_color: "Card background color",
			card_background_opacity: "Card background opacity",
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			hvac_modes: "HVAC buttons",
			preset_modes: "Preset buttons",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			border_glow_on_action: "Borders glow only while HVAC is active",
			tabs: {
				general: "General",
				presentation: "Presentation",
				hvac: "HVAC modes",
				preset: "Presets"
			},
			visibility: {
				help: "Uncheck a mode to hide its button in Equinox while keeping the climate capability unchanged in Home Assistant.",
				no_entity: "Select a climate entity first to load its supported modes.",
				no_hvac_modes: "This climate does not report any supported HVAC modes.",
				no_presets: "This climate does not report any supported presets."
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Glow"
				},
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
	es: {
		card: {
			description: "Tarjeta Lovelace para Termostato Versátil y entidades climáticas estándar.",
			missing_entity: "Configure una entidad climática.",
			invalid_entity: "La entidad configurada debe pertenecer al dominio climático.",
			invalid_theme: "El tema configurado no está disponible.",
			invalid_display_mode: "El modo de visualización configurado no está disponible.",
			invalid_primary_display: "La prioridad de visualización configurada no está disponible.",
			invalid_additional_dashboards: "El modo de panel configurado no está disponible.",
			invalid_state_icons_layout: "El diseño de iconos de estado configurado no está disponible.",
			entity_not_found: "Entidad no encontrada: {entity}",
			placeholder: "Equinox está listo para {entity}."
		},
		main: {
			status: {
				heating: "Calefacción activa",
				cooling: "Refrigeración activa",
				auto: "Automático",
				heat: "Calefacción",
				cool: "Refrigeración",
				heat_cool: "Automático",
				dry: "Secado",
				fan_only: "Solo ventilador",
				off: "Apagado",
				boost: "Impulso temporal",
				unavailable: "No disponible"
			},
			hvac: {
				heat: "Calefacción",
				cool: "Refrigeración",
				heat_cool: "Calefacción/Refrigeración",
				auto: "Automático",
				dry: "Secado",
				fan_only: "Solo ventilador",
				off: "Apagado"
			},
			hvac_action: {
				off: "Apagado",
				preheating: "Precalentamiento",
				heating: "Calefacción activa",
				cooling: "Refrigeración activa",
				drying: "Secado activo",
				fan: "Ventilador activo",
				idle: "Inactivo",
				defrosting: "Descongelación"
			},
			preset: {
				none: "Sin preset",
				frost: "Protección anticongelante",
				eco: "Eco",
				away: "Ausente",
				comfort: "Confort",
				home: "Inicio",
				sleep: "Sueño",
				activity: "Actividad",
				boost: "Impulso"
			},
			fan: {
				on: "Encendido",
				auto: "Automático",
				low: "Bajo",
				medium: "Medio",
				middle: "Medio",
				high: "Alto",
				top: "Arriba",
				off: "Apagado",
				focus: "Enfoque",
				diffuse: "Difuso",
				auto_fan_none: "Ninguno",
				auto_fan_low: "Bajo",
				auto_fan_medium: "Medio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Ninguno",
				Turbo: "Turbo",
				unavailable: "Ventilador"
			},
			swing: {
				off: "Apagado",
				on: "Encendido",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Ambos",
				unavailable: "Oscilación"
			},
			lock: {
				locked: "Bloqueado",
				unlocked: "Desbloqueado",
				code_required: "Código requerido",
				enter_code: "Ingrese código",
				wrong_code: "Código incorrecto"
			},
			events: {
				hasDanger: "Alerta crítica",
				hasAlert: "Alerta",
				hasOverpowering: "Sobrecarga",
				hasOpenWindow: "Ventana abierta",
				hasPresence: "Presencia detectada",
				hasTimer: "Temporizador activo"
			},
			messages: {
				hvac_off_manual: "Apagado manualmente",
				hvac_off_auto_start_stop: "Apagado por auto-inicio/parada",
				hvac_off_window_detection: "Apagado por detección de ventana",
				hvac_off_sleep_mode: "Apagado por modo de sueño",
				hvac_off_safety_detection: "Apagado por modo de seguridad",
				hvac_off_central_mode: "Apagado por modo central",
				safety_detected: "Modo de seguridad detectado",
				overpowering_detected: "Sobrecarga detectada",
				target_temp_window_eco: "Temp. obj.: ventana eco",
				target_temp_window_frost: "Temp. obj.: ventana anticongelante",
				target_temp_power: "Temp. obj.: potencia",
				target_temp_central_mode: "Temp. obj.: modo central",
				target_temp_activity_detected: "Temp. obj.: actividad detectada",
				target_temp_activity_not_detected: "Temp. obj.: sin actividad",
				target_temp_absence_detected: "Temp. obj.: ausencia detectada",
				target_temp_timed_preset: "Preset temporizado activo",
				not_initialized: "Error de inicialización",
				heating_failure: "Fallo de calefacción detectado",
				cooling_failure: "Fallo de refrigeración detectado"
			},
			actions: {
				decrease_temperature: "Disminuir consigna",
				increase_temperature: "Aumentar consigna",
				low_temperature: "Bajo",
				high_temperature: "Alto",
				open_fan: "Abrir ventilador",
				open_swing: "Abrir oscilación",
				open_menu: "Abrir menú",
				open_power_info: "Mostrar indicadores de potencia"
			}
		},
		dialog: {
			close: "Cerrar",
			back: "Atrás",
			fan: {
				title: "Ventilación",
				description_auto: "El modo automático adapta automáticamente la ventilación a las necesidades de calefacción."
			},
			swing: {
				title: "Oscilación",
				vertical: "Vertical",
				horizontal: "Horizontal"
			},
			hvac: { title: "Modo" },
			preset: { title: "Preset" },
			message: { title: "Mensaje" },
			menu: {
				title: "Menú",
				regulation: "Regulación",
				boost: "Impulso temporal",
				history: "Historial"
			},
			history: {
				title: "Historial",
				load: "Cargar",
				add: "Añadir",
				add_entity: "Añadir una entidad",
				loading: "Cargando historial...",
				empty: "Sin historial para este período.",
				no_attributes: "Sin atributo seleccionable.",
				tools: "Herramientas",
				show_controls: "Mostrar controles de historial",
				hide_controls: "Ocultar controles de historial",
				fullscreen: "Pantalla completa",
				exit_fullscreen: "Salir de pantalla completa",
				sources: {
					current_temperature: "Temperatura actual",
					temperature: "Temperatura objetivo",
					hvac_action: "Acción HVAC"
				}
			},
			boost: {
				title: "Impulso temporal",
				duration: "Duración en minutos",
				minutes: "min",
				hours: "h",
				start: "Iniciar",
				stop: "Detener",
				active: "Impulso activo",
				remaining_unknown: "Tiempo restante no disponible",
				preset: "Preset temporizado",
				original_preset: "Preset anterior",
				start_description: "Cuando la cuenta regresiva termine, el termostato volverá al modo anterior.",
				active_description: "Cuando la cuenta regresiva termine, el termostato volverá al modo anterior.",
				active_description_with_preset: "Cuando la cuenta regresiva termine, el termostato volverá al modo anterior ({preset})."
			}
		},
		editor: {
			entity: "Entidad",
			name: "Nombre",
			diagnostic_entity: "Entidad de diagnóstico",
			power_entity: "Entidad de potencia",
			humidity_entity: "Entidad de humedad",
			temperature_entity: "Entidad de temperatura",
			theme: "Tema",
			display_mode: "Formato",
			primary_display: "Prioridad de visualización",
			card_background_color: "Color de fondo de la tarjeta",
			card_background_opacity: "Opacidad del fondo de la tarjeta",
			disable_name: "Ocultar nombre",
			hide_lock_button: "Ocultar botón de bloqueo",
			additional_dashboards: "Paneles adicionales",
			state_icons_layout: "Iconos de estado",
			border_glow_on_action: "Los bordes brillan solo cuando el HVAC está activo",
			tabs: {
				general: "General",
				presentation: "Presentación",
				hvac: "Modos HVAC",
				preset: "Preajustes"
			},
			options: {
				theme: {
					flat: "Plano",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Clásico",
					compact: "Compacto"
				},
				primary_display: {
					setpoint: "Consigna",
					sensors: "Sensores"
				},
				layout_orientation: {
					horizontal: "Horizontal",
					vertical: "Vertical"
				},
				additional_dashboards: {
					auto: "Automático",
					custom: "Personalizado",
					disabled: "Deshabilitado"
				}
			},
			hvac_modes: "Botones HVAC",
			preset_modes: "Botones de preajustes",
			visibility: {
				help: "Desmarca un modo para ocultar su botón en Equinox sin cambiar las capacidades de la entidad climate en Home Assistant.",
				no_entity: "Selecciona primero una entidad climate para cargar los modos compatibles.",
				no_hvac_modes: "Esta entidad climate no informa de modos HVAC compatibles.",
				no_presets: "Esta entidad climate no informa de preajustes compatibles."
			}
		}
	},
	fi: {
		card: {
			description: "Lovelace-kortti Versatile Thermostat- ja vakioilmastoentiteeteille.",
			missing_entity: "Määritä ilmastoentiteetti.",
			invalid_entity: "Määritellyn entiteetin tulee kuulua ilmaston verkkotunnukseen.",
			invalid_theme: "Määriteltyä teemaa ei ole saatavilla.",
			invalid_display_mode: "Määriteltyä näyttötilaa ei ole saatavilla.",
			invalid_primary_display: "Määriteltyä näyttöprioriteetia ei ole saatavilla.",
			invalid_additional_dashboards: "Määriteltyä koontinäyttötilaa ei ole saatavilla.",
			invalid_state_icons_layout: "Määriteltyä tilapainikkeiston asettelua ei ole saatavilla.",
			entity_not_found: "Entiteettiä ei löydy: {entity}",
			placeholder: "Equinox on valmis {entity}:lle."
		},
		main: {
			status: {
				heating: "Lämmitys aktiivinen",
				cooling: "Jäähdytys aktiivinen",
				auto: "Automaattinen",
				heat: "Lämmitys",
				cool: "Jäähdytys",
				heat_cool: "Automaattinen",
				dry: "Kuivaus",
				fan_only: "Vain puhaltimen",
				off: "Pois",
				boost: "Väliaikainen tehonkohennos",
				unavailable: "Ei saatavilla"
			},
			hvac: {
				heat: "Lämmitys",
				cool: "Jäähdytys",
				heat_cool: "Lämmitys/Jäähdytys",
				auto: "Automaattinen",
				dry: "Kuivaus",
				fan_only: "Vain puhaltimen",
				off: "Pois"
			},
			hvac_action: {
				off: "Pois",
				preheating: "Eslämmitys",
				heating: "Lämmitys aktiivinen",
				cooling: "Jäähdytys aktiivinen",
				drying: "Kuivaus aktiivinen",
				fan: "Puhallinen aktiivinen",
				idle: "Käyttämätön",
				defrosting: "Sulaminen"
			},
			preset: {
				none: "Ei esiasetus",
				frost: "Pakkassuoja",
				eco: "Eco",
				away: "Poissa",
				comfort: "Mukavuus",
				home: "Koti",
				sleep: "Uni",
				activity: "Aktiviteetti",
				boost: "Tehonkohennos"
			},
			fan: {
				on: "Päällä",
				auto: "Automaattinen",
				low: "Matala",
				medium: "Keskitaso",
				middle: "Keski",
				high: "Korkea",
				top: "Yläosa",
				off: "Pois",
				focus: "Kohdistus",
				diffuse: "Hajallaan",
				auto_fan_none: "Ei mitään",
				auto_fan_low: "Matala",
				auto_fan_medium: "Keskitaso",
				auto_fan_high: "Korkea",
				auto_fan_turbo: "Turbo",
				None: "Ei mitään",
				Turbo: "Turbo",
				unavailable: "Puhallinen"
			},
			swing: {
				off: "Pois",
				on: "Päällä",
				vertical: "Pystysuora",
				horizontal: "Vaakasuora",
				both: "Molemmat",
				unavailable: "Heilunta"
			},
			lock: {
				locked: "Lukittu",
				unlocked: "Lukittu auki",
				code_required: "Koodi vaaditaan",
				enter_code: "Syötä koodi",
				wrong_code: "Väärä koodi"
			},
			events: {
				hasDanger: "Kriittinen varoitus",
				hasAlert: "Varoitus",
				hasOverpowering: "Ylikuorma",
				hasOpenWindow: "Ikkuna auki",
				hasPresence: "Läsnäolo havaittu",
				hasTimer: "Ajastin aktiivinen"
			},
			messages: {
				hvac_off_manual: "Sammutettu manuaalisesti",
				hvac_off_auto_start_stop: "Sammutettu automaattisella käynnistyksellä/pysäytyksellä",
				hvac_off_window_detection: "Sammutettu ikkunan havainnolla",
				hvac_off_sleep_mode: "Sammutettu uniilla",
				hvac_off_safety_detection: "Sammutettu turvatilalla",
				hvac_off_central_mode: "Sammutettu keskustilalla",
				safety_detected: "Turvatila havaittu",
				overpowering_detected: "Ylikuorma havaittu",
				target_temp_window_eco: "Koht. lämp.: ikkuna eco",
				target_temp_window_frost: "Koht. lämp.: ikkuna pakkanen",
				target_temp_power: "Koht. lämp.: teho",
				target_temp_central_mode: "Koht. lämp.: keskustila",
				target_temp_activity_detected: "Koht. lämp.: aktiviteetti havaittu",
				target_temp_activity_not_detected: "Koht. lämp.: ei aktiviteettia",
				target_temp_absence_detected: "Koht. lämp.: poissaolo havaittu",
				target_temp_timed_preset: "Ajastettu esiasetus aktiivinen",
				not_initialized: "Alustusvirhe",
				heating_failure: "Lämmitysvirhe havaittu",
				cooling_failure: "Jäähdytysvirhe havaittu"
			},
			actions: {
				decrease_temperature: "Pienennä asetusarvoa",
				increase_temperature: "Suurenna asetusarvoa",
				low_temperature: "Matala",
				high_temperature: "Korkea",
				open_fan: "Avaa puhallinen",
				open_swing: "Avaa heilunta",
				open_menu: "Avaa valikko",
				open_power_info: "Näytä tehoindikaattorit"
			}
		},
		dialog: {
			close: "Sulje",
			back: "Takaisin",
			fan: {
				title: "Tuuletus",
				description_auto: "Automaattinen tila mukauttaa automaattisesti tuuletusta lämmitystarpeisiin."
			},
			swing: {
				title: "Heilunta",
				vertical: "Pystysuora",
				horizontal: "Vaakasuora"
			},
			hvac: { title: "Tila" },
			preset: { title: "Esiasetus" },
			message: { title: "Viesti" },
			menu: {
				title: "Valikko",
				regulation: "Säätö",
				boost: "Väliaikainen tehonkohennos",
				history: "Historia"
			},
			history: {
				title: "Historia",
				load: "Lataa",
				add: "Lisää",
				add_entity: "Lisää entiteetti",
				loading: "Ladataan historiaa...",
				empty: "Ei historiaa tälle ajanjaksolle.",
				no_attributes: "Ei valittavaa attribuuttia.",
				tools: "Työkalut",
				show_controls: "Näytä historian ohjaimet",
				hide_controls: "Piilota historian ohjaimet",
				fullscreen: "Koko näyttö",
				exit_fullscreen: "Poistu koko näytöstä",
				sources: {
					current_temperature: "Nykyinen lämpötila",
					temperature: "Tavoitelämpötila",
					hvac_action: "HVAC-toiminta"
				}
			},
			boost: {
				title: "Väliaikainen tehonkohennos",
				duration: "Kesto minuutteina",
				minutes: "min",
				hours: "h",
				start: "Aloita",
				stop: "Pysäytä",
				active: "Tehonkohennos aktiivinen",
				remaining_unknown: "Jäljellä oleva aika ei ole saatavilla",
				preset: "Ajastettu esiasetus",
				original_preset: "Edellinen esiasetus",
				start_description: "Kun taaksepäin laskeminen päättyy, termostaatti palaa edelliseen tilaan.",
				active_description: "Kun taaksepäin laskeminen päättyy, termostaatti palaa edelliseen tilaan.",
				active_description_with_preset: "Kun taaksepäin laskeminen päättyy, termostaatti palaa edelliseen tilaan ({preset})."
			}
		},
		editor: {
			entity: "Entiteetti",
			name: "Nimi",
			diagnostic_entity: "Diagnostinen entiteetti",
			power_entity: "Tehotoiminto",
			humidity_entity: "Kosteuden entiteetti",
			temperature_entity: "Lämpötilan entiteetti",
			theme: "Teema",
			display_mode: "Muoto",
			primary_display: "Näyttöprioriteetti",
			card_background_color: "Kortin taustaväri",
			card_background_opacity: "Kortin taustan läpinäkyvyys",
			disable_name: "Piilota nimi",
			hide_lock_button: "Piilota lukituspainike",
			additional_dashboards: "Lisäkoontinäytöt",
			state_icons_layout: "Tilakuvakkeet",
			border_glow_on_action: "Reunat hehkuvat vain kun HVAC on aktiivinen",
			tabs: {
				general: "Yleinen",
				presentation: "Esittely",
				hvac: "HVAC-tilat",
				preset: "Esiasetukset"
			},
			options: {
				theme: {
					flat: "Litteä",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klassinen",
					compact: "Kompakti"
				},
				primary_display: {
					setpoint: "Asetusarvo",
					sensors: "Anturit"
				},
				layout_orientation: {
					horizontal: "Vaakasuora",
					vertical: "Pystysuora"
				},
				additional_dashboards: {
					auto: "Automaattinen",
					custom: "Mukautettu",
					disabled: "Poistettu käytöstä"
				}
			},
			hvac_modes: "HVAC-painikkeet",
			preset_modes: "Esiasetuspainikkeet",
			visibility: {
				help: "Poista tila valinnasta, niin sen painike piilotetaan Equinoxissa muuttamatta climate-entiteetin ominaisuuksia Home Assistantissa.",
				no_entity: "Valitse ensin climate-entiteetti, jotta tuetut tilat voidaan ladata.",
				no_hvac_modes: "Tämä climate-entiteetti ei ilmoita tuettuja HVAC-tiloja.",
				no_presets: "Tämä climate-entiteetti ei ilmoita tuettuja esiasetuksia."
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
				auto: "Auto",
				low: "Faible",
				medium: "Moyenne",
				middle: "Moyenne",
				high: "Forte",
				top: "Maximale",
				off: "Éteinte",
				focus: "Concentrée",
				diffuse: "Diffuse",
				auto_fan_none: "Aucune",
				auto_fan_low: "Faible",
				auto_fan_medium: "Moyenne",
				auto_fan_high: "Forte",
				auto_fan_turbo: "Turbo",
				None: "Aucune",
				Turbo: "Turbo",
				unavailable: "Ventilation"
			},
			swing: {
				off: "Éteint",
				on: "Activé",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Complet",
				unavailable: "Oscillation"
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
				low_temperature: "Basse",
				high_temperature: "Haute",
				open_fan: "Ouvrir la ventilation",
				open_swing: "Ouvrir l'oscillation",
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
			swing: {
				title: "Oscillation",
				vertical: "Verticale",
				horizontal: "Horizontale"
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
			regulation: {
				title: "Régulation",
				loading: "Chargement du dashboard de régulation...",
				invalid: "Le dashboard de régulation est invalide.",
				unavailable: "Le dashboard de régulation est indisponible.",
				custom_not_found: "Dashboard de régulation personnalisé introuvable.",
				section_missing: "Cette rubrique de régulation est indisponible.",
				empty_section: "Cette rubrique de régulation est vide.",
				source_missing: "Source indisponible",
				unsupported_block: "Ce bloc sera disponible dans une prochaine étape de régulation.",
				action_locked: "Action désactivée: thermostat verrouillé.",
				action_failed: "L'action a échoué.",
				action_running: "Action en cours...",
				confirm_action_title: "Confirmer l'action",
				confirm_action_text: "Cette action va appeler un service Home Assistant.",
				sections: "Rubriques de régulation"
			},
			boost: {
				title: "Boost temporaire",
				duration: "Durée en minutes",
				minutes: "mn",
				hours: "h",
				start: "Démarrer",
				stop: "Arrêter",
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
			card_background_color: "Couleur du fond de carte",
			card_background_opacity: "Opacité du fond de carte",
			disable_name: "Masquer le nom",
			hide_lock_button: "Masquer le bouton de verrouillage",
			hvac_modes: "Boutons HVAC",
			preset_modes: "Boutons preset",
			additional_dashboards: "Dashboards additionnels",
			state_icons_layout: "Icônes d'état",
			border_glow_on_action: "Les bordures brillent uniquement quand le HVAC est actif",
			tabs: {
				general: "Général",
				presentation: "Présentation",
				hvac: "Modes HVAC",
				preset: "Presets"
			},
			visibility: {
				help: "Décochez un mode pour masquer son bouton dans Equinox sans changer les capacités du climate dans Home Assistant.",
				no_entity: "Sélectionnez d'abord une entité climate pour charger les modes supportés.",
				no_hvac_modes: "Cette entité climate ne remonte aucun mode HVAC supporté.",
				no_presets: "Cette entité climate ne remonte aucun preset supporté."
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Glow"
				},
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
	},
	he: {
		card: {
			description: "כרטיס Lovelace עבור Versatile Thermostat וישויות climate סטנדרטיות.",
			missing_entity: "יש להגדיר ישות climate.",
			invalid_entity: "הישות שהוגדרה חייבת להשתייך לדומיין climate.",
			invalid_theme: "ערכת הנושא שהוגדרה אינה זמינה.",
			invalid_display_mode: "מצב התצוגה שהוגדר אינו זמין.",
			invalid_primary_display: "עדיפות התצוגה שהוגדרה אינה זמינה.",
			invalid_additional_dashboards: "מצב לוחות המחוונים שהוגדר אינו זמין.",
			invalid_state_icons_layout: "פריסת סמלי המצב שהוגדרה אינה זמינה.",
			entity_not_found: "הישות לא נמצאה: {entity}",
			placeholder: "Equinox מוכן עבור {entity}."
		},
		main: {
			status: {
				heating: "חימום פעיל",
				cooling: "קירור פעיל",
				auto: "אוטומטי",
				heat: "חימום",
				cool: "קירור",
				heat_cool: "אוטומטי",
				dry: "ייבוש",
				fan_only: "מאוורר בלבד",
				off: "כבוי",
				boost: "הגברה זמנית",
				unavailable: "לא זמין"
			},
			hvac: {
				heat: "חימום",
				cool: "קירור",
				heat_cool: "חימום/קירור",
				auto: "אוטומטי",
				dry: "ייבוש",
				fan_only: "מאוורר בלבד",
				off: "כבוי"
			},
			hvac_action: {
				off: "כבוי",
				preheating: "חימום מקדים",
				heating: "חימום פעיל",
				cooling: "קירור פעיל",
				drying: "ייבוש פעיל",
				fan: "מאוורר פעיל",
				idle: "במתנה",
				defrosting: "הפשרה"
			},
			preset: {
				none: "ללא פריסט",
				frost: "הגנה מקפיאה",
				eco: "חיסכון",
				away: "מחוץ לבית",
				comfort: "נוחות",
				home: "בבית",
				sleep: "שינה",
				activity: "פעילות",
				boost: "הגברה"
			},
			fan: {
				on: "פועל",
				auto: "אוטומטי",
				low: "נמוך",
				medium: "בינוני",
				middle: "אמצעי",
				high: "גבוה",
				top: "מקסימלי",
				off: "כבוי",
				focus: "ממוקד",
				diffuse: "מפוזר",
				auto_fan_none: "ללא",
				auto_fan_low: "נמוך",
				auto_fan_medium: "בינוני",
				auto_fan_high: "גבוה",
				auto_fan_turbo: "טורבו",
				None: "ללא",
				Turbo: "טורבו",
				unavailable: "מאוורר"
			},
			swing: {
				off: "כבוי",
				on: "פועל",
				vertical: "אנכי",
				horizontal: "אופקי",
				both: "מלא",
				unavailable: "נדנוד"
			},
			lock: {
				locked: "נעול",
				unlocked: "פתוח",
				code_required: "נדרש קוד",
				enter_code: "הזן קוד",
				wrong_code: "קוד שגוי"
			},
			events: {
				hasDanger: "התראה קריטית",
				hasAlert: "התראה",
				hasOverpowering: "עומס יתר",
				hasOpenWindow: "חלון פתוח",
				hasPresence: "זוהתה נוכחות",
				hasTimer: "טיימר פעיל"
			},
			messages: {
				hvac_off_manual: "כובה ידנית",
				hvac_off_auto_start_stop: "כובה ע״י הפעלה/עצירה אוטומטית",
				hvac_off_window_detection: "כובה ע״י זיהוי חלון פתוח",
				hvac_off_sleep_mode: "כובה ע״י מצב שינה",
				hvac_off_safety_detection: "כובה ע״י מצב בטיחות",
				hvac_off_central_mode: "כובה ע״י המצב המרכזי",
				safety_detected: "זוהה מצב בטיחות",
				overpowering_detected: "זוהה עומס יתר",
				target_temp_window_eco: "טמפ׳ יעד: חלון חיסכון",
				target_temp_window_frost: "טמפ׳ יעד: חלון הגנה מקפיאה",
				target_temp_power: "טמפ׳ יעד: ניהול עומסי הספק",
				target_temp_central_mode: "טמפ׳ יעד: מצב מרכזי",
				target_temp_activity_detected: "טמפ׳ יעד: זוהתה פעילות",
				target_temp_activity_not_detected: "טמפ׳ יעד: לא זוהתה פעילות",
				target_temp_absence_detected: "טמפ׳ יעד: זוהתה היעדרות",
				target_temp_timed_preset: "פריסט מתוזמן פעיל",
				not_initialized: "שגיאת אתחול",
				heating_failure: "זוהתה תקלת חימום",
				cooling_failure: "זוהתה תקלת קירור"
			},
			actions: {
				decrease_temperature: "הורדת ערך היעד",
				increase_temperature: "העלאת ערך היעד",
				low_temperature: "נמוכה",
				high_temperature: "גבוהה",
				open_fan: "פתיחת המאוורר",
				open_swing: "פתיחת הנדנוד",
				open_menu: "פתיחת התפריט",
				open_power_info: "הצגת מחווני הספק"
			}
		},
		dialog: {
			close: "סגירה",
			back: "חזרה",
			fan: {
				title: "אוורור",
				description_auto: "מצב אוטומטי מתאים את האוורור לצורכי החימום."
			},
			swing: {
				title: "נדנוד",
				vertical: "אנכי",
				horizontal: "אופקי"
			},
			hvac: { title: "מצב" },
			preset: { title: "פריסט" },
			message: { title: "הודעה" },
			menu: {
				title: "תפריט",
				regulation: "ויסות",
				boost: "הגברה זמנית",
				history: "היסטוריה"
			},
			history: {
				title: "היסטוריה",
				load: "טעינה",
				add: "הוספה",
				add_entity: "הוספת ישות",
				loading: "טוען היסטוריה...",
				empty: "אין היסטוריה לתקופה זו.",
				no_attributes: "אין מאפיין הניתן לבחירה.",
				tools: "כלים",
				show_controls: "הצגת פקדי ההיסטוריה",
				hide_controls: "הסתרת פקדי ההיסטוריה",
				fullscreen: "מסך מלא",
				exit_fullscreen: "יציאה ממסך מלא",
				sources: {
					current_temperature: "טמפרטורה נוכחית",
					temperature: "טמפרטורת יעד",
					hvac_action: "פעולת HVAC"
				}
			},
			boost: {
				title: "הגברה זמנית",
				duration: "משך בדקות",
				minutes: "דק׳",
				hours: "שע׳",
				start: "התחלה",
				stop: "עצירה",
				active: "הגברה פעילה",
				remaining_unknown: "הזמן הנותר אינו זמין",
				preset: "פריסט מתוזמן",
				original_preset: "הפריסט הקודם",
				start_description: "בתום הספירה לאחור, התרמוסטט יחזור למצב הקודם.",
				active_description: "בתום הספירה לאחור, התרמוסטט יחזור למצב הקודם.",
				active_description_with_preset: "בתום הספירה לאחור, התרמוסטט יחזור למצב הקודם ({preset})."
			}
		},
		editor: {
			entity: "ישות",
			name: "שם",
			diagnostic_entity: "ישות אבחון",
			power_entity: "ישות הספק",
			humidity_entity: "ישות לחות",
			temperature_entity: "ישות טמפרטורה",
			theme: "ערכת נושא",
			display_mode: "פורמט",
			primary_display: "עדיפות תצוגה",
			card_background_color: "צבע רקע הכרטיס",
			card_background_opacity: "אטימות רקע הכרטיס",
			disable_name: "הסתרת השם",
			hide_lock_button: "הסתרת כפתור הנעילה",
			hvac_modes: "כפתורי HVAC",
			preset_modes: "כפתורי פריסט",
			additional_dashboards: "לוחות מחוונים נוספים",
			state_icons_layout: "סמלי מצב",
			border_glow_on_action: "המסגרות זוהרות רק כאשר ה-HVAC פעיל",
			tabs: {
				general: "כללי",
				presentation: "הצגה",
				hvac: "מצבי HVAC",
				preset: "פריסטים"
			},
			visibility: {
				help: "בטלו את הסימון של מצב כדי להסתיר את הכפתור שלו ב-Equinox מבלי לשנות את יכולות ה-climate ב-Home Assistant.",
				no_entity: "בחרו תחילה ישות climate כדי לטעון את המצבים הנתמכים שלה.",
				no_hvac_modes: "ישות climate זו אינה מדווחת על מצבי HVAC נתמכים.",
				no_presets: "ישות climate זו אינה מדווחת על פריסטים נתמכים."
			},
			options: {
				theme: {
					flat: "שטוח",
					liquid_glow: "זוהר"
				},
				display_mode: {
					classic: "קלאסי",
					compact: "קומפקטי"
				},
				primary_display: {
					setpoint: "ערך יעד",
					sensors: "חיישנים"
				},
				layout_orientation: {
					horizontal: "אופקי",
					vertical: "אנכי"
				},
				additional_dashboards: {
					auto: "אוטומטי",
					custom: "מותאם אישית",
					disabled: "מושבת"
				}
			}
		}
	},
	hu: {
		card: {
			description: "Lovelace kártya a sokoldalú termosztáthoz és standard klímaentitásokhoz.",
			missing_entity: "Konfigurálja a klímaentitást.",
			invalid_entity: "A konfigurált entitásnak a klíma tartományba kell tartoznia.",
			invalid_theme: "A konfigurált téma nem érhető el.",
			invalid_display_mode: "A konfigurált megjelenítési mód nem érhető el.",
			invalid_primary_display: "A konfigurált megjelenítési prioritás nem érhető el.",
			invalid_additional_dashboards: "A konfigurált irányítópult mód nem érhető el.",
			invalid_state_icons_layout: "A konfigurált állapot ikon elrendezés nem érhető el.",
			entity_not_found: "Entitás nem található: {entity}",
			placeholder: "Az Equinox készen áll a {entity}hez."
		},
		main: {
			status: {
				heating: "Fűtés aktív",
				cooling: "Hűtés aktív",
				auto: "Automatikus",
				heat: "Fűtés",
				cool: "Hűtés",
				heat_cool: "Automatikus",
				dry: "Szárítás",
				fan_only: "Csak ventilátor",
				off: "Kikapcsolva",
				boost: "Ideiglenes erősítés",
				unavailable: "Nem elérhető"
			},
			hvac: {
				heat: "Fűtés",
				cool: "Hűtés",
				heat_cool: "Fűtés/Hűtés",
				auto: "Automatikus",
				dry: "Szárítás",
				fan_only: "Csak ventilátor",
				off: "Kikapcsolva"
			},
			hvac_action: {
				off: "Kikapcsolva",
				preheating: "Előfűtés",
				heating: "Fűtés aktív",
				cooling: "Hűtés aktív",
				drying: "Szárítás aktív",
				fan: "Ventilátor aktív",
				idle: "Tétlen",
				defrosting: "Leolvasztás"
			},
			preset: {
				none: "Nincs előbeállítás",
				frost: "Fagyálló védelme",
				eco: "Eco",
				away: "Távolléte",
				comfort: "Kényelem",
				home: "Otthon",
				sleep: "Alvás",
				activity: "Aktivitás",
				boost: "Erősítés"
			},
			fan: {
				on: "Be",
				auto: "Automatikus",
				low: "Alacsony",
				medium: "Közepes",
				middle: "Közép",
				high: "Magas",
				top: "Felső",
				off: "Ki",
				focus: "Fókusz",
				diffuse: "Szórt",
				auto_fan_none: "Nincs",
				auto_fan_low: "Alacsony",
				auto_fan_medium: "Közepes",
				auto_fan_high: "Magas",
				auto_fan_turbo: "Turbo",
				None: "Nincs",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Ki",
				on: "Be",
				vertical: "Függőleges",
				horizontal: "Vízszintes",
				both: "Mindkettő",
				unavailable: "Lengés"
			},
			lock: {
				locked: "Zárva",
				unlocked: "Nyitva",
				code_required: "Kód szükséges",
				enter_code: "Írja be a kódot",
				wrong_code: "Hibás kód"
			},
			events: {
				hasDanger: "Kritikus figyelmeztetés",
				hasAlert: "Figyelmeztetés",
				hasOverpowering: "Túlterhelés",
				hasOpenWindow: "Ablak nyitva",
				hasPresence: "Jelenlét észlelhető",
				hasTimer: "Időzítő aktív"
			},
			messages: {
				hvac_off_manual: "Manuálisan kikapcsolva",
				hvac_off_auto_start_stop: "Kikapcsolva automatikus indítás/leállítással",
				hvac_off_window_detection: "Ablakérzékelés által kikapcsolva",
				hvac_off_sleep_mode: "Alvási mód által kikapcsolva",
				hvac_off_safety_detection: "Biztonsági mód által kikapcsolva",
				hvac_off_central_mode: "Központi mód által kikapcsolva",
				safety_detected: "Biztonsági mód észlelve",
				overpowering_detected: "Túlterhelés észlelve",
				target_temp_window_eco: "Cél hőm.: ablak eco",
				target_temp_window_frost: "Cél hőm.: ablak fagy",
				target_temp_power: "Cél hőm.: teljesítmény",
				target_temp_central_mode: "Cél hőm.: központi mód",
				target_temp_activity_detected: "Cél hőm.: aktivitás észlelve",
				target_temp_activity_not_detected: "Cél hőm.: nincs aktivitás",
				target_temp_absence_detected: "Cél hőm.: hiányzás észlelve",
				target_temp_timed_preset: "Időzített előbeállítás aktív",
				not_initialized: "Inicializálási hiba",
				heating_failure: "Fűtési hiba észlelve",
				cooling_failure: "Hűtési hiba észlelve"
			},
			actions: {
				decrease_temperature: "Csökkentse a beállított értéket",
				increase_temperature: "Növelje a beállított értéket",
				low_temperature: "Alacsony",
				high_temperature: "Magas",
				open_fan: "Nyissa meg a ventilátort",
				open_swing: "Nyissa meg a lengést",
				open_menu: "Nyissa meg a menüt",
				open_power_info: "Teljesítménymutató megjelenítése"
			}
		},
		dialog: {
			close: "Bezárás",
			back: "Vissza",
			fan: {
				title: "Szellőztetés",
				description_auto: "Az automatikus mód automatikusan igazítja a szellőztetést a fűtési igényekhez."
			},
			swing: {
				title: "Lengés",
				vertical: "Függőleges",
				horizontal: "Vízszintes"
			},
			hvac: { title: "Mód" },
			preset: { title: "Előbeállítás" },
			message: { title: "Üzenet" },
			menu: {
				title: "Menü",
				regulation: "Szabályozás",
				boost: "Ideiglenes erősítés",
				history: "Előzmények"
			},
			history: {
				title: "Előzmények",
				load: "Betöltés",
				add: "Hozzáadás",
				add_entity: "Entitás hozzáadása",
				loading: "Előzmények betöltése...",
				empty: "Nincsenek előzmények erre az időszakra.",
				no_attributes: "Nincs választható attribútum.",
				tools: "Eszközök",
				show_controls: "Az előzmények vezérlőelemei megjelenítése",
				hide_controls: "Az előzmények vezérlőelemei elrejtése",
				fullscreen: "Teljes képernyő",
				exit_fullscreen: "Teljes képernyő bezárása",
				sources: {
					current_temperature: "Jelenlegi hőmérséklet",
					temperature: "Cél hőmérséklet",
					hvac_action: "HVAC művelet"
				}
			},
			boost: {
				title: "Ideiglenes erősítés",
				duration: "Időtartam percben",
				minutes: "min",
				hours: "h",
				start: "Indítás",
				stop: "Leállítás",
				active: "Erősítés aktív",
				remaining_unknown: "Hátralévő idő nem érhető el",
				preset: "Időzített előbeállítás",
				original_preset: "Előző előbeállítás",
				start_description: "A visszaszámlálás végénél a termosztát visszatér az előző módhoz.",
				active_description: "A visszaszámlálás végénél a termosztát visszatér az előző módhoz.",
				active_description_with_preset: "A visszaszámlálás végénél a termosztát visszatér az előző módhoz ({preset})."
			}
		},
		editor: {
			entity: "Entitás",
			name: "Név",
			diagnostic_entity: "Diagnosztikai entitás",
			power_entity: "Teljesítmény entitás",
			humidity_entity: "Páratartalom entitás",
			temperature_entity: "Hőmérséklet entitás",
			theme: "Téma",
			display_mode: "Formátum",
			primary_display: "Megjelenítési prioritás",
			card_background_color: "Kártya háttérszíne",
			card_background_opacity: "Kártya háttér átlátszatlansága",
			disable_name: "Név elrejtése",
			hide_lock_button: "Zárolási gomb elrejtése",
			additional_dashboards: "További irányítópultok",
			state_icons_layout: "Állapot ikonok",
			border_glow_on_action: "A keretek csak akkor ragyognak, ha a HVAC aktív",
			tabs: {
				general: "Általános",
				presentation: "Bemutató",
				hvac: "HVAC módok",
				preset: "Előbeállítások"
			},
			options: {
				theme: {
					flat: "Lapos",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klasszikus",
					compact: "Kompakt"
				},
				primary_display: {
					setpoint: "Beállított érték",
					sensors: "Érzékelők"
				},
				layout_orientation: {
					horizontal: "Vízszintes",
					vertical: "Függőleges"
				},
				additional_dashboards: {
					auto: "Automatikus",
					custom: "Egyéni",
					disabled: "Letiltva"
				}
			},
			hvac_modes: "HVAC gombok",
			preset_modes: "Előbeállítás gombok",
			visibility: {
				help: "Kapcsold ki a módot, hogy elrejtsd a gombját az Equinoxban anélkül, hogy a Home Assistant climate entitásának képességei megváltoznának.",
				no_entity: "Először válassz egy climate entitást a támogatott módok betöltéséhez.",
				no_hvac_modes: "Ez a climate entitás nem jelent be támogatott HVAC módokat.",
				no_presets: "Ez a climate entitás nem jelent be támogatott előbeállításokat."
			}
		}
	},
	it: {
		card: {
			description: "Scheda Lovelace per Termostato Versatile e entità climatiche standard.",
			missing_entity: "Configurare un'entità climatica.",
			invalid_entity: "L'entità configurata deve appartenere al dominio climatico.",
			invalid_theme: "Il tema configurato non è disponibile.",
			invalid_display_mode: "La modalità di visualizzazione configurata non è disponibile.",
			invalid_primary_display: "La priorità di visualizzazione configurata non è disponibile.",
			invalid_additional_dashboards: "La modalità dashboard configurata non è disponibile.",
			invalid_state_icons_layout: "Il layout delle icone di stato configurato non è disponibile.",
			entity_not_found: "Entità non trovata: {entity}",
			placeholder: "Equinox è pronto per {entity}."
		},
		main: {
			status: {
				heating: "Riscaldamento attivo",
				cooling: "Raffreddamento attivo",
				auto: "Automatico",
				heat: "Riscaldamento",
				cool: "Raffreddamento",
				heat_cool: "Automatico",
				dry: "Secco",
				fan_only: "Solo ventilatore",
				off: "Spento",
				boost: "Potenziamento temporaneo",
				unavailable: "Non disponibile"
			},
			hvac: {
				heat: "Riscaldamento",
				cool: "Raffreddamento",
				heat_cool: "Riscaldamento/Raffreddamento",
				auto: "Automatico",
				dry: "Secco",
				fan_only: "Solo ventilatore",
				off: "Spento"
			},
			hvac_action: {
				off: "Spento",
				preheating: "Preriscaldamento",
				heating: "Riscaldamento attivo",
				cooling: "Raffreddamento attivo",
				drying: "Essiccazione attiva",
				fan: "Ventilatore attivo",
				idle: "Inattivo",
				defrosting: "Sbrinamento"
			},
			preset: {
				none: "Nessun preset",
				frost: "Protezione dal gelo",
				eco: "Eco",
				away: "Assente",
				comfort: "Comfort",
				home: "Casa",
				sleep: "Riposo",
				activity: "Attività",
				boost: "Potenziamento"
			},
			fan: {
				on: "Acceso",
				auto: "Automatico",
				low: "Basso",
				medium: "Medio",
				middle: "Mezzo",
				high: "Alto",
				top: "Superiore",
				off: "Spento",
				focus: "Fuoco",
				diffuse: "Diffuso",
				auto_fan_none: "Nessuno",
				auto_fan_low: "Basso",
				auto_fan_medium: "Medio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Nessuno",
				Turbo: "Turbo",
				unavailable: "Ventilatore"
			},
			swing: {
				off: "Spento",
				on: "Acceso",
				vertical: "Verticale",
				horizontal: "Orizzontale",
				both: "Entrambi",
				unavailable: "Oscillazione"
			},
			lock: {
				locked: "Bloccato",
				unlocked: "Sbloccato",
				code_required: "Codice richiesto",
				enter_code: "Inserisci codice",
				wrong_code: "Codice errato"
			},
			events: {
				hasDanger: "Avviso critico",
				hasAlert: "Avviso",
				hasOverpowering: "Sovraccarico",
				hasOpenWindow: "Finestra aperta",
				hasPresence: "Presenza rilevata",
				hasTimer: "Timer attivo"
			},
			messages: {
				hvac_off_manual: "Spento manualmente",
				hvac_off_auto_start_stop: "Spento da avvio/arresto automatico",
				hvac_off_window_detection: "Spento dal rilevamento finestra",
				hvac_off_sleep_mode: "Spento da modalità riposo",
				hvac_off_safety_detection: "Spento da modalità sicurezza",
				hvac_off_central_mode: "Spento da modalità centrale",
				safety_detected: "Modalità sicurezza rilevata",
				overpowering_detected: "Sovraccarico rilevato",
				target_temp_window_eco: "Temp. obiettivo: finestra eco",
				target_temp_window_frost: "Temp. obiettivo: finestra gelo",
				target_temp_power: "Temp. obiettivo: potenza",
				target_temp_central_mode: "Temp. obiettivo: modalità centrale",
				target_temp_activity_detected: "Temp. obiettivo: attività rilevata",
				target_temp_activity_not_detected: "Temp. obiettivo: nessuna attività",
				target_temp_absence_detected: "Temp. obiettivo: assenza rilevata",
				target_temp_timed_preset: "Preset programmato attivo",
				not_initialized: "Errore di inizializzazione",
				heating_failure: "Errore di riscaldamento rilevato",
				cooling_failure: "Errore di raffreddamento rilevato"
			},
			actions: {
				decrease_temperature: "Diminuisci consegna",
				increase_temperature: "Aumenta consegna",
				low_temperature: "Basso",
				high_temperature: "Alto",
				open_fan: "Apri ventilatore",
				open_swing: "Apri oscillazione",
				open_menu: "Apri menu",
				open_power_info: "Mostra indicatori di potenza"
			}
		},
		dialog: {
			close: "Chiudi",
			back: "Indietro",
			fan: {
				title: "Ventilazione",
				description_auto: "La modalità automatica adatta automaticamente la ventilazione alle esigenze di riscaldamento."
			},
			swing: {
				title: "Oscillazione",
				vertical: "Verticale",
				horizontal: "Orizzontale"
			},
			hvac: { title: "Modalità" },
			preset: { title: "Preset" },
			message: { title: "Messaggio" },
			menu: {
				title: "Menu",
				regulation: "Regolazione",
				boost: "Potenziamento temporaneo",
				history: "Cronologia"
			},
			history: {
				title: "Cronologia",
				load: "Carica",
				add: "Aggiungi",
				add_entity: "Aggiungi un'entità",
				loading: "Caricamento cronologia...",
				empty: "Nessuna cronologia per questo periodo.",
				no_attributes: "Nessun attributo selezionabile.",
				tools: "Strumenti",
				show_controls: "Mostra controlli cronologia",
				hide_controls: "Nascondi controlli cronologia",
				fullscreen: "Schermo intero",
				exit_fullscreen: "Esci da schermo intero",
				sources: {
					current_temperature: "Temperatura attuale",
					temperature: "Temperatura obiettivo",
					hvac_action: "Azione HVAC"
				}
			},
			boost: {
				title: "Potenziamento temporaneo",
				duration: "Durata in minuti",
				minutes: "min",
				hours: "h",
				start: "Avvia",
				stop: "Arresta",
				active: "Potenziamento attivo",
				remaining_unknown: "Tempo rimanente non disponibile",
				preset: "Preset programmato",
				original_preset: "Preset precedente",
				start_description: "Al termine del conto alla rovescia, il termostato tornerà alla modalità precedente.",
				active_description: "Al termine del conto alla rovescia, il termostato tornerà alla modalità precedente.",
				active_description_with_preset: "Al termine del conto alla rovescia, il termostato tornerà alla modalità precedente ({preset})."
			}
		},
		editor: {
			entity: "Entità",
			name: "Nome",
			diagnostic_entity: "Entità diagnostica",
			power_entity: "Entità potenza",
			humidity_entity: "Entità umidità",
			temperature_entity: "Entità temperatura",
			theme: "Tema",
			display_mode: "Formato",
			primary_display: "Priorità visualizzazione",
			card_background_color: "Colore sfondo scheda",
			card_background_opacity: "Opacità sfondo scheda",
			disable_name: "Nascondi nome",
			hide_lock_button: "Nascondi pulsante blocco",
			additional_dashboards: "Dashboard aggiuntivi",
			state_icons_layout: "Icone di stato",
			border_glow_on_action: "I bordi brillano solo quando l'HVAC è attivo",
			tabs: {
				general: "Generale",
				presentation: "Presentazione",
				hvac: "Modalità HVAC",
				preset: "Preset"
			},
			options: {
				theme: {
					flat: "Piatto",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Classico",
					compact: "Compatto"
				},
				primary_display: {
					setpoint: "Consegna",
					sensors: "Sensori"
				},
				layout_orientation: {
					horizontal: "Orizzontale",
					vertical: "Verticale"
				},
				additional_dashboards: {
					auto: "Automatico",
					custom: "Personalizzato",
					disabled: "Disabilitato"
				}
			},
			hvac_modes: "Pulsanti HVAC",
			preset_modes: "Pulsanti preset",
			visibility: {
				help: "Deseleziona una modalità per nascondere il suo pulsante in Equinox senza cambiare le capacità dell'entità climate in Home Assistant.",
				no_entity: "Seleziona prima un'entità climate per caricare le modalità supportate.",
				no_hvac_modes: "Questa entità climate non segnala modalità HVAC supportate.",
				no_presets: "Questa entità climate non segnala preset supportati."
			}
		}
	},
	nl: {
		card: {
			description: "Lovelace-kaart voor Versatile Thermostat en standaard klimaatentiteiten.",
			missing_entity: "Configureer een klimaatentiteit.",
			invalid_entity: "De geconfigureerde entiteit moet tot het klimaatdomein behoren.",
			invalid_theme: "Het geconfigureerde thema is niet beschikbaar.",
			invalid_display_mode: "De geconfigureerde weergavemodus is niet beschikbaar.",
			invalid_primary_display: "De geconfigureerde weergaveprioriteit is niet beschikbaar.",
			invalid_additional_dashboards: "De geconfigureerde dashboardmodus is niet beschikbaar.",
			invalid_state_icons_layout: "De geconfigureerde statusiconindeling is niet beschikbaar.",
			entity_not_found: "Entiteit niet gevonden: {entity}",
			placeholder: "Equinox is klaar voor {entity}."
		},
		main: {
			status: {
				heating: "Verwarming actief",
				cooling: "Koeling actief",
				auto: "Automatisch",
				heat: "Verwarming",
				cool: "Koeling",
				heat_cool: "Automatisch",
				dry: "Drogen",
				fan_only: "Alleen ventilator",
				off: "Uit",
				boost: "Tijdelijke verhoging",
				unavailable: "Niet beschikbaar"
			},
			hvac: {
				heat: "Verwarming",
				cool: "Koeling",
				heat_cool: "Verwarming/Koeling",
				auto: "Automatisch",
				dry: "Drogen",
				fan_only: "Alleen ventilator",
				off: "Uit"
			},
			hvac_action: {
				off: "Uit",
				preheating: "Voorverwarmen",
				heating: "Verwarming actief",
				cooling: "Koeling actief",
				drying: "Drogen actief",
				fan: "Ventilator actief",
				idle: "Inactief",
				defrosting: "Ontdooien"
			},
			preset: {
				none: "Geen voorinstelling",
				frost: "Vorstbescherming",
				eco: "Eco",
				away: "Weg",
				comfort: "Comfort",
				home: "Thuis",
				sleep: "Slaap",
				activity: "Activiteit",
				boost: "Verhoging"
			},
			fan: {
				on: "Aan",
				auto: "Automatisch",
				low: "Laag",
				medium: "Gemiddeld",
				middle: "Midden",
				high: "Hoog",
				top: "Bovenkant",
				off: "Uit",
				focus: "Scherpstelling",
				diffuse: "Diffuus",
				auto_fan_none: "Geen",
				auto_fan_low: "Laag",
				auto_fan_medium: "Gemiddeld",
				auto_fan_high: "Hoog",
				auto_fan_turbo: "Turbo",
				None: "Geen",
				Turbo: "Turbo",
				unavailable: "Ventilator"
			},
			swing: {
				off: "Uit",
				on: "Aan",
				vertical: "Verticaal",
				horizontal: "Horizontaal",
				both: "Beide",
				unavailable: "Swing"
			},
			lock: {
				locked: "Vergrendeld",
				unlocked: "Ontgrendeld",
				code_required: "Code vereist",
				enter_code: "Voer code in",
				wrong_code: "Onjuiste code"
			},
			events: {
				hasDanger: "Kritische waarschuwing",
				hasAlert: "Waarschuwing",
				hasOverpowering: "Overbelasting",
				hasOpenWindow: "Raam open",
				hasPresence: "Aanwezigheid gedetecteerd",
				hasTimer: "Timer actief"
			},
			messages: {
				hvac_off_manual: "Handmatig uitgeschakeld",
				hvac_off_auto_start_stop: "Uitgeschakeld door automatisch starten/stoppen",
				hvac_off_window_detection: "Uitgeschakeld door raamdetectie",
				hvac_off_sleep_mode: "Uitgeschakeld door slaapmodus",
				hvac_off_safety_detection: "Uitgeschakeld door veiligheidsmodus",
				hvac_off_central_mode: "Uitgeschakeld door centrale modus",
				safety_detected: "Veiligheidsmodus gedetecteerd",
				overpowering_detected: "Overbelasting gedetecteerd",
				target_temp_window_eco: "Doel temp.: raam eco",
				target_temp_window_frost: "Doel temp.: raam vorst",
				target_temp_power: "Doel temp.: vermogen",
				target_temp_central_mode: "Doel temp.: centrale modus",
				target_temp_activity_detected: "Doel temp.: activiteit gedetecteerd",
				target_temp_activity_not_detected: "Doel temp.: geen activiteit",
				target_temp_absence_detected: "Doel temp.: afwezigheid gedetecteerd",
				target_temp_timed_preset: "Getimede voorinstelling actief",
				not_initialized: "Initialisatiefout",
				heating_failure: "Verwarmingsfout gedetecteerd",
				cooling_failure: "Koelfout gedetecteerd"
			},
			actions: {
				decrease_temperature: "Zet punt verlagen",
				increase_temperature: "Zet punt verhogen",
				low_temperature: "Laag",
				high_temperature: "Hoog",
				open_fan: "Open ventilator",
				open_swing: "Open swing",
				open_menu: "Menu openen",
				open_power_info: "Stromindicatoren weergeven"
			}
		},
		dialog: {
			close: "Sluiten",
			back: "Terug",
			fan: {
				title: "Ventilatie",
				description_auto: "Automatische modus past ventilatie automatisch aan aan verwarmingsbehoeften."
			},
			swing: {
				title: "Swing",
				vertical: "Verticaal",
				horizontal: "Horizontaal"
			},
			hvac: { title: "Modus" },
			preset: { title: "Voorinstelling" },
			message: { title: "Bericht" },
			menu: {
				title: "Menu",
				regulation: "Regeling",
				boost: "Tijdelijke verhoging",
				history: "Geschiedenis"
			},
			history: {
				title: "Geschiedenis",
				load: "Laden",
				add: "Toevoegen",
				add_entity: "Entiteit toevoegen",
				loading: "Geschiedenis laden...",
				empty: "Geen geschiedenis voor deze periode.",
				no_attributes: "Geen selecteerbaar attribuut.",
				tools: "Gereedschappen",
				show_controls: "Geschiedenisbesturingselementen weergeven",
				hide_controls: "Geschiedenisbesturingselementen verbergen",
				fullscreen: "Volledig scherm",
				exit_fullscreen: "Volledig scherm afsluiten",
				sources: {
					current_temperature: "Huidige temperatuur",
					temperature: "Doeltemperatuur",
					hvac_action: "HVAC-actie"
				}
			},
			boost: {
				title: "Tijdelijke verhoging",
				duration: "Duur in minuten",
				minutes: "min",
				hours: "h",
				start: "Start",
				stop: "Stop",
				active: "Verhoging actief",
				remaining_unknown: "Resterende tijd niet beschikbaar",
				preset: "Getimede voorinstelling",
				original_preset: "Vorige voorinstelling",
				start_description: "Wanneer de aftelling eindigt, keert de thermostaat terug naar de vorige modus.",
				active_description: "Wanneer de aftelling eindigt, keert de thermostaat terug naar de vorige modus.",
				active_description_with_preset: "Wanneer de aftelling eindigt, keert de thermostaat terug naar de vorige modus ({preset})."
			}
		},
		editor: {
			entity: "Entiteit",
			name: "Naam",
			diagnostic_entity: "Diagnostische entiteit",
			power_entity: "Vermogenentiteit",
			humidity_entity: "Vochtigheidsentiteit",
			temperature_entity: "Temperatuurentiteit",
			theme: "Thema",
			display_mode: "Indeling",
			primary_display: "Weergaveprioriteit",
			card_background_color: "Achtergrondkleur van de kaart",
			card_background_opacity: "Opaciteit van de kaartachtergrond",
			disable_name: "Naam verbergen",
			hide_lock_button: "Vergrendelingsknop verbergen",
			additional_dashboards: "Aanvullende dashboards",
			state_icons_layout: "Statuspictogrammen",
			border_glow_on_action: "De randen gloeien alleen wanneer HVAC actief is",
			tabs: {
				general: "Algemeen",
				presentation: "Presentatie",
				hvac: "HVAC-modi",
				preset: "Voorinstellingen"
			},
			options: {
				theme: {
					flat: "Plat",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klassiek",
					compact: "Compact"
				},
				primary_display: {
					setpoint: "Zet punt",
					sensors: "Sensoren"
				},
				layout_orientation: {
					horizontal: "Horizontaal",
					vertical: "Verticaal"
				},
				additional_dashboards: {
					auto: "Automatisch",
					custom: "Aangepast",
					disabled: "Uitgeschakeld"
				}
			},
			hvac_modes: "HVAC-knoppen",
			preset_modes: "Knoppen voor voorinstellingen",
			visibility: {
				help: "Schakel een modus uit om de knop ervan in Equinox te verbergen zonder de mogelijkheden van de climate-entiteit in Home Assistant te wijzigen.",
				no_entity: "Selecteer eerst een climate-entiteit om ondersteunde modi te laden.",
				no_hvac_modes: "Deze climate-entiteit meldt geen ondersteunde HVAC-modi.",
				no_presets: "Deze climate-entiteit meldt geen ondersteunde voorinstellingen."
			}
		}
	},
	no: {
		card: {
			description: "Lovelace-kort for Versatile Thermostat og standard klimaenheter.",
			missing_entity: "Konfigurer en klimaenhet.",
			invalid_entity: "Den konfigurerte enheten må tilhøre klimadomenet.",
			invalid_theme: "Det konfigurerte temaet er ikke tilgjengelig.",
			invalid_display_mode: "Den konfigurerte visningsmodus er ikke tilgjengelig.",
			invalid_primary_display: "Den konfigurerte visningsprioriteten er ikke tilgjengelig.",
			invalid_additional_dashboards: "Den konfigurerte dashbordmodus er ikke tilgjengelig.",
			invalid_state_icons_layout: "Den konfigurerte tilstandsikonoppsettingen er ikke tilgjengelig.",
			entity_not_found: "Enhet ikke funnet: {entity}",
			placeholder: "Equinox er klar for {entity}."
		},
		main: {
			status: {
				heating: "Oppvarming aktiv",
				cooling: "Kjøling aktiv",
				auto: "Automatisk",
				heat: "Oppvarming",
				cool: "Kjøling",
				heat_cool: "Automatisk",
				dry: "Tørking",
				fan_only: "Kun vifte",
				off: "Av",
				boost: "Midlertidig boost",
				unavailable: "Utilgjengelig"
			},
			hvac: {
				heat: "Oppvarming",
				cool: "Kjøling",
				heat_cool: "Oppvarming/Kjøling",
				auto: "Automatisk",
				dry: "Tørking",
				fan_only: "Kun vifte",
				off: "Av"
			},
			hvac_action: {
				off: "Av",
				preheating: "Forvarmning",
				heating: "Oppvarming aktiv",
				cooling: "Kjøling aktiv",
				drying: "Tørking aktiv",
				fan: "Vifte aktiv",
				idle: "Inaktiv",
				defrosting: "Avising"
			},
			preset: {
				none: "Ingen forhåndsinnstilling",
				frost: "Frostbeskyttelse",
				eco: "Eco",
				away: "Borte",
				comfort: "Komfort",
				home: "Hjem",
				sleep: "Søvn",
				activity: "Aktivitet",
				boost: "Boost"
			},
			fan: {
				on: "På",
				auto: "Automatisk",
				low: "Lav",
				medium: "Medium",
				middle: "Midt",
				high: "Høy",
				top: "Topp",
				off: "Av",
				focus: "Fokus",
				diffuse: "Diffus",
				auto_fan_none: "Ingen",
				auto_fan_low: "Lav",
				auto_fan_medium: "Medium",
				auto_fan_high: "Høy",
				auto_fan_turbo: "Turbo",
				None: "Ingen",
				Turbo: "Turbo",
				unavailable: "Vifte"
			},
			swing: {
				off: "Av",
				on: "På",
				vertical: "Vertikal",
				horizontal: "Horisontal",
				both: "Begge",
				unavailable: "Swing"
			},
			lock: {
				locked: "Låst",
				unlocked: "Ulåst",
				code_required: "Kode påkrevd",
				enter_code: "Skriv inn kode",
				wrong_code: "Feil kode"
			},
			events: {
				hasDanger: "Kritisk advarsel",
				hasAlert: "Advarsel",
				hasOverpowering: "Overbelastning",
				hasOpenWindow: "Vindu åpent",
				hasPresence: "Tilstedeværelse oppdaget",
				hasTimer: "Timer aktiv"
			},
			messages: {
				hvac_off_manual: "Slått av manuelt",
				hvac_off_auto_start_stop: "Slått av av automatisk start/stopp",
				hvac_off_window_detection: "Slått av av vindusdeteksjon",
				hvac_off_sleep_mode: "Slått av av søvnmodus",
				hvac_off_safety_detection: "Slått av av sikkerhetsmodus",
				hvac_off_central_mode: "Slått av av sentral modus",
				safety_detected: "Sikkerhetsmodus oppdaget",
				overpowering_detected: "Overbelastning oppdaget",
				target_temp_window_eco: "Mål temp.: vindu eco",
				target_temp_window_frost: "Mål temp.: vindu frost",
				target_temp_power: "Mål temp.: kraft",
				target_temp_central_mode: "Mål temp.: sentral modus",
				target_temp_activity_detected: "Mål temp.: aktivitet oppdaget",
				target_temp_activity_not_detected: "Mål temp.: ingen aktivitet",
				target_temp_absence_detected: "Mål temp.: fravær oppdaget",
				target_temp_timed_preset: "Tidsinnstilt forhåndsinnstilling aktiv",
				not_initialized: "Initialiseringsfeil",
				heating_failure: "Oppvarmingsfeil oppdaget",
				cooling_failure: "Kjølingsfeil oppdaget"
			},
			actions: {
				decrease_temperature: "Senk innstillingspunktet",
				increase_temperature: "Hev innstillingspunktet",
				low_temperature: "Lav",
				high_temperature: "Høy",
				open_fan: "Åpne vifte",
				open_swing: "Åpne swing",
				open_menu: "Åpne meny",
				open_power_info: "Vis stromindikatorer"
			}
		},
		dialog: {
			close: "Lukk",
			back: "Tilbake",
			fan: {
				title: "Ventilasjon",
				description_auto: "Automatisk modus tilpasser automatisk ventilasjon til oppvarmingsbehov."
			},
			swing: {
				title: "Swing",
				vertical: "Vertikal",
				horizontal: "Horisontal"
			},
			hvac: { title: "Modus" },
			preset: { title: "Forhåndsinnstilling" },
			message: { title: "Melding" },
			menu: {
				title: "Meny",
				regulation: "Regulering",
				boost: "Midlertidig boost",
				history: "Historie"
			},
			history: {
				title: "Historie",
				load: "Last inn",
				add: "Legg til",
				add_entity: "Legg til enhet",
				loading: "Laster inn historie...",
				empty: "Ingen historie for denne perioden.",
				no_attributes: "Ingen valgbar attributt.",
				tools: "Verktøy",
				show_controls: "Vis historiekontroller",
				hide_controls: "Skjul historiekontroller",
				fullscreen: "Fullskjerm",
				exit_fullscreen: "Avslutt fullskjerm",
				sources: {
					current_temperature: "Gjeldende temperatur",
					temperature: "Måltemperatur",
					hvac_action: "HVAC-handling"
				}
			},
			boost: {
				title: "Midlertidig boost",
				duration: "Varighet i minutter",
				minutes: "min",
				hours: "h",
				start: "Start",
				stop: "Stopp",
				active: "Boost aktiv",
				remaining_unknown: "Gjenstående tid utilgjengelig",
				preset: "Tidsinnstilt forhåndsinnstilling",
				original_preset: "Forrige forhåndsinnstilling",
				start_description: "Når nedtellingen er ferdig, vender termostaten tilbake til forrige modus.",
				active_description: "Når nedtellingen er ferdig, vender termostaten tilbake til forrige modus.",
				active_description_with_preset: "Når nedtellingen er ferdig, vender termostaten tilbake til forrige modus ({preset})."
			}
		},
		editor: {
			entity: "Enhet",
			name: "Navn",
			diagnostic_entity: "Diagnostisk enhet",
			power_entity: "Kraftenhet",
			humidity_entity: "Fuktighets-enhet",
			temperature_entity: "Temperaturenhet",
			theme: "Tema",
			display_mode: "Format",
			primary_display: "Visningsprioritet",
			card_background_color: "Bakgrunnsfarge for kortet",
			card_background_opacity: "Kortets bakgrunnsopasitet",
			disable_name: "Skjul navn",
			hide_lock_button: "Skjul låseknapp",
			additional_dashboards: "Tilleggssamler",
			state_icons_layout: "Tilstands ikoner",
			border_glow_on_action: "Kantene lyser bare når HVAC er aktiv",
			tabs: {
				general: "Generelt",
				presentation: "Presentasjon",
				hvac: "HVAC-moduser",
				preset: "Forhåndsinnstillinger"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klassisk",
					compact: "Kompakt"
				},
				primary_display: {
					setpoint: "Innstillingspunkt",
					sensors: "Sensorer"
				},
				layout_orientation: {
					horizontal: "Horisontal",
					vertical: "Vertikal"
				},
				additional_dashboards: {
					auto: "Automatisk",
					custom: "Tilpasset",
					disabled: "Deaktivert"
				}
			},
			hvac_modes: "HVAC-knapper",
			preset_modes: "Knapper for forhåndsinnstillinger",
			visibility: {
				help: "Fjern avmerkingen for en modus for å skjule knappen i Equinox uten å endre climate-entitetens egenskaper i Home Assistant.",
				no_entity: "Velg først en climate-entitet for å laste inn støttede moduser.",
				no_hvac_modes: "Denne climate-entiteten har ingen støttede HVAC-moduser.",
				no_presets: "Denne climate-entiteten har ingen støttede forhåndsinnstillinger."
			}
		}
	},
	pl: {
		card: {
			description: "Karta Lovelace dla Versatile Thermostat i standardowych jednostek klimatyzacyjnych.",
			missing_entity: "Skonfiguruj jednostkę klimatyzacyjną.",
			invalid_entity: "Skonfigurowana jednostka musi należeć do domeny klimatyzacyjnej.",
			invalid_theme: "Skonfigurowany motyw nie jest dostępny.",
			invalid_display_mode: "Skonfigurowany tryb wyświetlania nie jest dostępny.",
			invalid_primary_display: "Skonfigurowany priorytet wyświetlania nie jest dostępny.",
			invalid_additional_dashboards: "Skonfigurowany tryb pulpitu nawigacyjnego nie jest dostępny.",
			invalid_state_icons_layout: "Skonfigurowany układ ikon stanu nie jest dostępny.",
			entity_not_found: "Jednostka nie znaleziona: {entity}",
			placeholder: "Equinox jest gotowy dla {entity}."
		},
		main: {
			status: {
				heating: "Grzewanie aktywne",
				cooling: "Chłodzenie aktywne",
				auto: "Automatyczne",
				heat: "Grzewanie",
				cool: "Chłodzenie",
				heat_cool: "Automatyczne",
				dry: "Suszenie",
				fan_only: "Tylko wentylator",
				off: "Wyłączony",
				boost: "Tymczasowe przyspieszenie",
				unavailable: "Niedostępne"
			},
			hvac: {
				heat: "Grzewanie",
				cool: "Chłodzenie",
				heat_cool: "Grzewanie/Chłodzenie",
				auto: "Automatyczne",
				dry: "Suszenie",
				fan_only: "Tylko wentylator",
				off: "Wyłączony"
			},
			hvac_action: {
				off: "Wyłączony",
				preheating: "Wstępne podgrzewanie",
				heating: "Grzewanie aktywne",
				cooling: "Chłodzenie aktywne",
				drying: "Suszenie aktywne",
				fan: "Wentylator aktywny",
				idle: "Bezczynny",
				defrosting: "Odmrażanie"
			},
			preset: {
				none: "Brak predefiniowanego",
				frost: "Ochrona przed mrozem",
				eco: "Eco",
				away: "Nieobecny",
				comfort: "Komfort",
				home: "Dom",
				sleep: "Sen",
				activity: "Aktywność",
				boost: "Przyspieszenie"
			},
			fan: {
				on: "Włączony",
				auto: "Automatyczne",
				low: "Niskie",
				medium: "Średnie",
				middle: "Pośrednie",
				high: "Wysokie",
				top: "Górne",
				off: "Wyłączony",
				focus: "Skupienie",
				diffuse: "Rozproszone",
				auto_fan_none: "Brak",
				auto_fan_low: "Niskie",
				auto_fan_medium: "Średnie",
				auto_fan_high: "Wysokie",
				auto_fan_turbo: "Turbo",
				None: "Brak",
				Turbo: "Turbo",
				unavailable: "Wentylator"
			},
			swing: {
				off: "Wyłączony",
				on: "Włączony",
				vertical: "Pionowa",
				horizontal: "Pozioma",
				both: "Obie",
				unavailable: "Oscylacja"
			},
			lock: {
				locked: "Zablokowany",
				unlocked: "Odblokowany",
				code_required: "Wymagany kod",
				enter_code: "Wpisz kod",
				wrong_code: "Nieprawidłowy kod"
			},
			events: {
				hasDanger: "Alert krytyczny",
				hasAlert: "Alert",
				hasOverpowering: "Przeciążenie",
				hasOpenWindow: "Okno otwarte",
				hasPresence: "Wykryta obecność",
				hasTimer: "Czasomierz aktywny"
			},
			messages: {
				hvac_off_manual: "Wyłączony ręcznie",
				hvac_off_auto_start_stop: "Wyłączony przez automatyczne uruchamianie/zatrzymywanie",
				hvac_off_window_detection: "Wyłączony przez detekcję okna",
				hvac_off_sleep_mode: "Wyłączony przez tryb snu",
				hvac_off_safety_detection: "Wyłączony przez tryb bezpieczeństwa",
				hvac_off_central_mode: "Wyłączony przez tryb centralny",
				safety_detected: "Wykryty tryb bezpieczeństwa",
				overpowering_detected: "Wykryto przeciążenie",
				target_temp_window_eco: "Docel. temp.: okno eco",
				target_temp_window_frost: "Docel. temp.: okno mróz",
				target_temp_power: "Docel. temp.: moc",
				target_temp_central_mode: "Docel. temp.: tryb centralny",
				target_temp_activity_detected: "Docel. temp.: aktywność wykryta",
				target_temp_activity_not_detected: "Docel. temp.: brak aktywności",
				target_temp_absence_detected: "Docel. temp.: nieobecność wykryta",
				target_temp_timed_preset: "Zaplanowana predefiniowana aktywna",
				not_initialized: "Błąd inicjalizacji",
				heating_failure: "Wykryto błąd grzewania",
				cooling_failure: "Wykryto błąd chłodzenia"
			},
			actions: {
				decrease_temperature: "Zmniejsz punkt zadany",
				increase_temperature: "Zwiększ punkt zadany",
				low_temperature: "Niskie",
				high_temperature: "Wysokie",
				open_fan: "Otwórz wentylator",
				open_swing: "Otwórz oscylację",
				open_menu: "Otwórz menu",
				open_power_info: "Pokaż wskaźniki mocy"
			}
		},
		dialog: {
			close: "Zamknij",
			back: "Wróć",
			fan: {
				title: "Wentylacja",
				description_auto: "Tryb automatyczny automatycznie dostosowuje wentylację do potrzeb grzewania."
			},
			swing: {
				title: "Oscylacja",
				vertical: "Pionowa",
				horizontal: "Pozioma"
			},
			hvac: { title: "Tryb" },
			preset: { title: "Predefiniowana" },
			message: { title: "Wiadomość" },
			menu: {
				title: "Menu",
				regulation: "Regulacja",
				boost: "Tymczasowe przyspieszenie",
				history: "Historia"
			},
			history: {
				title: "Historia",
				load: "Załaduj",
				add: "Dodaj",
				add_entity: "Dodaj jednostkę",
				loading: "Ładowanie historii...",
				empty: "Brak historii dla tego okresu.",
				no_attributes: "Brak atrybutu do wyboru.",
				tools: "Narzędzia",
				show_controls: "Pokaż kontrolki historii",
				hide_controls: "Ukryj kontrolki historii",
				fullscreen: "Pełny ekran",
				exit_fullscreen: "Zamknij pełny ekran",
				sources: {
					current_temperature: "Bieżąca temperatura",
					temperature: "Temperatura docelowa",
					hvac_action: "Działanie HVAC"
				}
			},
			boost: {
				title: "Tymczasowe przyspieszenie",
				duration: "Czas trwania w minutach",
				minutes: "min",
				hours: "h",
				start: "Start",
				stop: "Stop",
				active: "Przyspieszenie aktywne",
				remaining_unknown: "Pozostały czas niedostępny",
				preset: "Zaplanowana predefiniowana",
				original_preset: "Poprzednia predefiniowana",
				start_description: "Po zakończeniu odliczania termostat powróci do poprzedniego trybu.",
				active_description: "Po zakończeniu odliczania termostat powróci do poprzedniego trybu.",
				active_description_with_preset: "Po zakończeniu odliczania termostat powróci do poprzedniego trybu ({preset})."
			}
		},
		editor: {
			entity: "Jednostka",
			name: "Nazwa",
			diagnostic_entity: "Jednostka diagnostyki",
			power_entity: "Jednostka mocy",
			humidity_entity: "Jednostka wilgotności",
			temperature_entity: "Jednostka temperatury",
			theme: "Motyw",
			display_mode: "Format",
			primary_display: "Priorytet wyświetlania",
			card_background_color: "Kolor tła karty",
			card_background_opacity: "Nieprzezroczystość tła karty",
			disable_name: "Ukryj nazwę",
			hide_lock_button: "Ukryj przycisk blokady",
			additional_dashboards: "Dodatkowe pulpity nawigacyjne",
			state_icons_layout: "Ikony stanu",
			border_glow_on_action: "Krawędzie świecą tylko gdy HVAC jest aktywny",
			tabs: {
				general: "Ogólne",
				presentation: "Prezentacja",
				hvac: "Tryby HVAC",
				preset: "Presety"
			},
			options: {
				theme: {
					flat: "Płaski",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klasyczny",
					compact: "Kompaktowy"
				},
				primary_display: {
					setpoint: "Punkt zadany",
					sensors: "Czujniki"
				},
				layout_orientation: {
					horizontal: "Pozioma",
					vertical: "Pionowa"
				},
				additional_dashboards: {
					auto: "Automatyczne",
					custom: "Niestandardowy",
					disabled: "Wyłączony"
				}
			},
			hvac_modes: "Przyciski HVAC",
			preset_modes: "Przyciski preset",
			visibility: {
				help: "Odznacz tryb, aby ukryć jego przycisk w Equinox bez zmiany możliwości encji climate w Home Assistant.",
				no_entity: "Najpierw wybierz encję climate, aby wczytać obsługiwane tryby.",
				no_hvac_modes: "Ta encja climate nie zgłasza obsługiwanych trybów HVAC.",
				no_presets: "Ta encja climate nie zgłasza obsługiwanych presetów."
			}
		}
	},
	pt: {
		card: {
			description: "Placa Lovelace para Termostato Versátil e entidades climáticas padrão.",
			missing_entity: "Configure uma entidade climática.",
			invalid_entity: "A entidade configurada deve pertencer ao domínio climático.",
			invalid_theme: "O tema configurado não está disponível.",
			invalid_display_mode: "O modo de exibição configurado não está disponível.",
			invalid_primary_display: "A prioridade de exibição configurada não está disponível.",
			invalid_additional_dashboards: "O modo de painel configurado não está disponível.",
			invalid_state_icons_layout: "O layout de ícones de estado configurado não está disponível.",
			entity_not_found: "Entidade não encontrada: {entity}",
			placeholder: "Equinox está pronto para {entity}."
		},
		main: {
			status: {
				heating: "Aquecimento ativo",
				cooling: "Resfriamento ativo",
				auto: "Automático",
				heat: "Aquecimento",
				cool: "Resfriamento",
				heat_cool: "Automático",
				dry: "Secagem",
				fan_only: "Apenas ventilador",
				off: "Desligado",
				boost: "Impulso temporário",
				unavailable: "Indisponível"
			},
			hvac: {
				heat: "Aquecimento",
				cool: "Resfriamento",
				heat_cool: "Aquecimento/Resfriamento",
				auto: "Automático",
				dry: "Secagem",
				fan_only: "Apenas ventilador",
				off: "Desligado"
			},
			hvac_action: {
				off: "Desligado",
				preheating: "Pré-aquecimento",
				heating: "Aquecimento ativo",
				cooling: "Resfriamento ativo",
				drying: "Secagem ativa",
				fan: "Ventilador ativo",
				idle: "Inativo",
				defrosting: "Descongelação"
			},
			preset: {
				none: "Sem preset",
				frost: "Proteção contra congelamento",
				eco: "Eco",
				away: "Fora",
				comfort: "Conforto",
				home: "Casa",
				sleep: "Dormir",
				activity: "Atividade",
				boost: "Impulso"
			},
			fan: {
				on: "Ligado",
				auto: "Automático",
				low: "Baixo",
				medium: "Médio",
				middle: "Meio",
				high: "Alto",
				top: "Superior",
				off: "Desligado",
				focus: "Foco",
				diffuse: "Difuso",
				auto_fan_none: "Nenhum",
				auto_fan_low: "Baixo",
				auto_fan_medium: "Médio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Nenhum",
				Turbo: "Turbo",
				unavailable: "Ventilador"
			},
			swing: {
				off: "Desligado",
				on: "Ligado",
				vertical: "Vertical",
				horizontal: "Horizontal",
				both: "Ambos",
				unavailable: "Balanço"
			},
			lock: {
				locked: "Bloqueado",
				unlocked: "Desbloqueado",
				code_required: "Código obrigatório",
				enter_code: "Insira o código",
				wrong_code: "Código incorreto"
			},
			events: {
				hasDanger: "Alerta crítico",
				hasAlert: "Alerta",
				hasOverpowering: "Sobrecarga",
				hasOpenWindow: "Janela aberta",
				hasPresence: "Presença detectada",
				hasTimer: "Temporizador ativo"
			},
			messages: {
				hvac_off_manual: "Desligado manualmente",
				hvac_off_auto_start_stop: "Desligado por início/parada automática",
				hvac_off_window_detection: "Desligado por detecção de janela",
				hvac_off_sleep_mode: "Desligado pelo modo dormir",
				hvac_off_safety_detection: "Desligado pelo modo de segurança",
				hvac_off_central_mode: "Desligado pelo modo central",
				safety_detected: "Modo de segurança detectado",
				overpowering_detected: "Sobrecarga detectada",
				target_temp_window_eco: "Temp. alvo: janela eco",
				target_temp_window_frost: "Temp. alvo: janela congelada",
				target_temp_power: "Temp. alvo: energia",
				target_temp_central_mode: "Temp. alvo: modo central",
				target_temp_activity_detected: "Temp. alvo: atividade detectada",
				target_temp_activity_not_detected: "Temp. alvo: sem atividade",
				target_temp_absence_detected: "Temp. alvo: ausência detectada",
				target_temp_timed_preset: "Preset cronometrado ativo",
				not_initialized: "Erro de inicialização",
				heating_failure: "Falha de aquecimento detectada",
				cooling_failure: "Falha de resfriamento detectada"
			},
			actions: {
				decrease_temperature: "Diminuir setpoint",
				increase_temperature: "Aumentar setpoint",
				low_temperature: "Baixo",
				high_temperature: "Alto",
				open_fan: "Abrir ventilador",
				open_swing: "Abrir balanço",
				open_menu: "Abrir menu",
				open_power_info: "Mostrar indicadores de energia"
			}
		},
		dialog: {
			close: "Fechar",
			back: "Voltar",
			fan: {
				title: "Ventilação",
				description_auto: "O modo automático adapta automaticamente a ventilação às necessidades de aquecimento."
			},
			swing: {
				title: "Balanço",
				vertical: "Vertical",
				horizontal: "Horizontal"
			},
			hvac: { title: "Modo" },
			preset: { title: "Preset" },
			message: { title: "Mensagem" },
			menu: {
				title: "Menu",
				regulation: "Regulação",
				boost: "Impulso temporário",
				history: "Histórico"
			},
			history: {
				title: "Histórico",
				load: "Carregar",
				add: "Adicionar",
				add_entity: "Adicionar uma entidade",
				loading: "Carregando histórico...",
				empty: "Nenhum histórico para este período.",
				no_attributes: "Nenhum atributo selecionável.",
				tools: "Ferramentas",
				show_controls: "Mostrar controles de histórico",
				hide_controls: "Ocultar controles de histórico",
				fullscreen: "Tela cheia",
				exit_fullscreen: "Sair da tela cheia",
				sources: {
					current_temperature: "Temperatura atual",
					temperature: "Temperatura alvo",
					hvac_action: "Ação HVAC"
				}
			},
			boost: {
				title: "Impulso temporário",
				duration: "Duração em minutos",
				minutes: "min",
				hours: "h",
				start: "Iniciar",
				stop: "Parar",
				active: "Impulso ativo",
				remaining_unknown: "Tempo restante indisponível",
				preset: "Preset cronometrado",
				original_preset: "Preset anterior",
				start_description: "Quando a contagem regressiva terminar, o termostato voltará ao modo anterior.",
				active_description: "Quando a contagem regressiva terminar, o termostato voltará ao modo anterior.",
				active_description_with_preset: "Quando a contagem regressiva terminar, o termostato voltará ao modo anterior ({preset})."
			}
		},
		editor: {
			entity: "Entidade",
			name: "Nome",
			diagnostic_entity: "Entidade de diagnóstico",
			power_entity: "Entidade de energia",
			humidity_entity: "Entidade de umidade",
			temperature_entity: "Entidade de temperatura",
			theme: "Tema",
			display_mode: "Formato",
			primary_display: "Prioridade de exibição",
			card_background_color: "Cor de fundo do cartão",
			card_background_opacity: "Opacidade do fundo do cartão",
			disable_name: "Ocultar nome",
			hide_lock_button: "Ocultar botão de bloqueio",
			additional_dashboards: "Painéis adicionais",
			state_icons_layout: "Ícones de estado",
			border_glow_on_action: "As bordas brilham apenas quando o HVAC está ativo",
			tabs: {
				general: "Geral",
				presentation: "Apresentação",
				hvac: "Modos HVAC",
				preset: "Predefinições"
			},
			options: {
				theme: {
					flat: "Plano",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Clássico",
					compact: "Compacto"
				},
				primary_display: {
					setpoint: "Setpoint",
					sensors: "Sensores"
				},
				layout_orientation: {
					horizontal: "Horizontal",
					vertical: "Vertical"
				},
				additional_dashboards: {
					auto: "Automático",
					custom: "Personalizado",
					disabled: "Desabilitado"
				}
			},
			hvac_modes: "Botões HVAC",
			preset_modes: "Botões de predefinição",
			visibility: {
				help: "Desmarque um modo para ocultar o botão no Equinox sem alterar as capacidades da entidade climate no Home Assistant.",
				no_entity: "Selecione primeiro uma entidade climate para carregar os modos suportados.",
				no_hvac_modes: "Esta entidade climate não informa modos HVAC suportados.",
				no_presets: "Esta entidade climate não informa predefinições suportadas."
			}
		}
	},
	ru: {
		card: {
			description: "Карточка Lovelace для Versatile Thermostat и стандартных сущностей климата.",
			missing_entity: "Настройте сущность климата.",
			invalid_entity: "Настроенная сущность должна принадлежать домену климата.",
			invalid_theme: "Настроенная тема недоступна.",
			invalid_display_mode: "Настроенный режим отображения недоступен.",
			invalid_primary_display: "Настроенный приоритет отображения недоступен.",
			invalid_additional_dashboards: "Настроенный режим панели недоступен.",
			invalid_state_icons_layout: "Настроенный макет значков состояния недоступен.",
			entity_not_found: "Сущность не найдена: {entity}",
			placeholder: "Equinox готов к {entity}."
		},
		main: {
			status: {
				heating: "Отопление активно",
				cooling: "Охлаждение активно",
				auto: "Автоматический",
				heat: "Отопление",
				cool: "Охлаждение",
				heat_cool: "Автоматический",
				dry: "Осушка",
				fan_only: "Только вентилятор",
				off: "Выключено",
				boost: "Временное ускорение",
				unavailable: "Недоступно"
			},
			hvac: {
				heat: "Отопление",
				cool: "Охлаждение",
				heat_cool: "Отопление/Охлаждение",
				auto: "Автоматический",
				dry: "Осушка",
				fan_only: "Только вентилятор",
				off: "Выключено"
			},
			hvac_action: {
				off: "Выключено",
				preheating: "Предварительный нагрев",
				heating: "Отопление активно",
				cooling: "Охлаждение активно",
				drying: "Осушка активна",
				fan: "Вентилятор активен",
				idle: "Ожидание",
				defrosting: "Разморозка"
			},
			preset: {
				none: "Нет предустановки",
				frost: "Защита от мороза",
				eco: "Эко",
				away: "В отсутствии",
				comfort: "Комфорт",
				home: "Дом",
				sleep: "Сон",
				activity: "Активность",
				boost: "Ускорение"
			},
			fan: {
				on: "Включено",
				auto: "Автоматический",
				low: "Низко",
				medium: "Среднее",
				middle: "Середина",
				high: "Высоко",
				top: "Верхний",
				off: "Выключено",
				focus: "Фокус",
				diffuse: "Диффузия",
				auto_fan_none: "Нет",
				auto_fan_low: "Низко",
				auto_fan_medium: "Среднее",
				auto_fan_high: "Высоко",
				auto_fan_turbo: "Турбо",
				None: "Нет",
				Turbo: "Турбо",
				unavailable: "Вентилятор"
			},
			swing: {
				off: "Выключено",
				on: "Включено",
				vertical: "Вертикально",
				horizontal: "Горизонтально",
				both: "Оба",
				unavailable: "Колебание"
			},
			lock: {
				locked: "Заблокировано",
				unlocked: "Разблокировано",
				code_required: "Требуется код",
				enter_code: "Введите код",
				wrong_code: "Неправильный код"
			},
			events: {
				hasDanger: "Критическое предупреждение",
				hasAlert: "Предупреждение",
				hasOverpowering: "Перегрузка",
				hasOpenWindow: "Окно открыто",
				hasPresence: "Обнаружено присутствие",
				hasTimer: "Таймер активен"
			},
			messages: {
				hvac_off_manual: "Выключено вручную",
				hvac_off_auto_start_stop: "Выключено автоматическим запуском/остановом",
				hvac_off_window_detection: "Выключено обнаружением окна",
				hvac_off_sleep_mode: "Выключено режимом сна",
				hvac_off_safety_detection: "Выключено режимом безопасности",
				hvac_off_central_mode: "Выключено центральным режимом",
				safety_detected: "Обнаружен режим безопасности",
				overpowering_detected: "Обнаружена перегрузка",
				target_temp_window_eco: "Целевая темп.: окно эко",
				target_temp_window_frost: "Целевая темп.: окно мороз",
				target_temp_power: "Целевая темп.: питание",
				target_temp_central_mode: "Целевая темп.: центральный режим",
				target_temp_activity_detected: "Целевая темп.: активность обнаружена",
				target_temp_activity_not_detected: "Целевая темп.: активность не обнаружена",
				target_temp_absence_detected: "Целевая темп.: отсутствие обнаружено",
				target_temp_timed_preset: "Временная предустановка активна",
				not_initialized: "Ошибка инициализации",
				heating_failure: "Обнаружена ошибка отопления",
				cooling_failure: "Обнаружена ошибка охлаждения"
			},
			actions: {
				decrease_temperature: "Уменьшить уставку",
				increase_temperature: "Увеличить уставку",
				low_temperature: "Низко",
				high_temperature: "Высоко",
				open_fan: "Открыть вентилятор",
				open_swing: "Открыть колебание",
				open_menu: "Открыть меню",
				open_power_info: "Показать индикаторы питания"
			}
		},
		dialog: {
			close: "Закрыть",
			back: "Назад",
			fan: {
				title: "Вентиляция",
				description_auto: "Автоматический режим автоматически адаптирует вентиляцию к потребностям отопления."
			},
			swing: {
				title: "Колебание",
				vertical: "Вертикально",
				horizontal: "Горизонтально"
			},
			hvac: { title: "Режим" },
			preset: { title: "Предустановка" },
			message: { title: "Сообщение" },
			menu: {
				title: "Меню",
				regulation: "Регуляция",
				boost: "Временное ускорение",
				history: "История"
			},
			history: {
				title: "История",
				load: "Загрузить",
				add: "Добавить",
				add_entity: "Добавить сущность",
				loading: "Загрузка истории...",
				empty: "Нет истории для этого периода.",
				no_attributes: "Нет выбираемого атрибута.",
				tools: "Инструменты",
				show_controls: "Показать элементы управления историей",
				hide_controls: "Скрыть элементы управления историей",
				fullscreen: "Полный экран",
				exit_fullscreen: "Выход из полного экрана",
				sources: {
					current_temperature: "Текущая температура",
					temperature: "Целевая температура",
					hvac_action: "Действие HVAC"
				}
			},
			boost: {
				title: "Временное ускорение",
				duration: "Продолжительность в минутах",
				minutes: "мин",
				hours: "ч",
				start: "Начать",
				stop: "Остановить",
				active: "Ускорение активно",
				remaining_unknown: "Оставшееся время недоступно",
				preset: "Временная предустановка",
				original_preset: "Предыдущая предустановка",
				start_description: "По окончании обратного отсчета термостат вернется в предыдущий режим.",
				active_description: "По окончании обратного отсчета термостат вернется в предыдущий режим.",
				active_description_with_preset: "По окончании обратного отсчета термостат вернется в предыдущий режим ({preset})."
			}
		},
		editor: {
			entity: "Сущность",
			name: "Название",
			diagnostic_entity: "Сущность диагностики",
			power_entity: "Сущность питания",
			humidity_entity: "Сущность влажности",
			temperature_entity: "Сущность температуры",
			theme: "Тема",
			display_mode: "Формат",
			primary_display: "Приоритет отображения",
			card_background_color: "Цвет фона карточки",
			card_background_opacity: "Непрозрачность фона карточки",
			disable_name: "Скрыть название",
			hide_lock_button: "Скрыть кнопку блокировки",
			additional_dashboards: "Дополнительные панели",
			state_icons_layout: "Значки состояния",
			border_glow_on_action: "Края светятся только когда HVAC активен",
			tabs: {
				general: "Общие",
				presentation: "Презентация",
				hvac: "Режимы HVAC",
				preset: "Предустановки"
			},
			options: {
				theme: {
					flat: "Плоский",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Классический",
					compact: "Компактный"
				},
				primary_display: {
					setpoint: "Уставка",
					sensors: "Датчики"
				},
				layout_orientation: {
					horizontal: "Горизонтально",
					vertical: "Вертикально"
				},
				additional_dashboards: {
					auto: "Автоматический",
					custom: "Пользовательский",
					disabled: "Отключено"
				}
			},
			hvac_modes: "Кнопки HVAC",
			preset_modes: "Кнопки предустановок",
			visibility: {
				help: "Снимите флажок с режима, чтобы скрыть его кнопку в Equinox, не меняя возможности сущности climate в Home Assistant.",
				no_entity: "Сначала выберите сущность climate, чтобы загрузить поддерживаемые режимы.",
				no_hvac_modes: "Эта сущность climate не сообщает поддерживаемые режимы HVAC.",
				no_presets: "Эта сущность climate не сообщает поддерживаемые предустановки."
			}
		}
	},
	sk: {
		card: {
			description: "Karta Lovelace pre Versatile Thermostat a štandardné klimatizačné entity.",
			missing_entity: "Nakonfigurujte klimatizačnú entitu.",
			invalid_entity: "Nakonfigurovaná entita musí patriť do klimatizačnej domény.",
			invalid_theme: "Nakonfigurovaná téma nie je dostupná.",
			invalid_display_mode: "Nakonfigurovaný režim zobrazenia nie je dostupný.",
			invalid_primary_display: "Nakonfigurovaná priorita zobrazenia nie je dostupná.",
			invalid_additional_dashboards: "Nakonfigurovaný režim panelu nie je dostupný.",
			invalid_state_icons_layout: "Nakonfigurované rozloženie ikon stavu nie je dostupné.",
			entity_not_found: "Entita nenájdená: {entity}",
			placeholder: "Equinox je pripravený pre {entity}."
		},
		main: {
			status: {
				heating: "Vykurovanie aktívne",
				cooling: "Chladenie aktívne",
				auto: "Automatické",
				heat: "Vykurovanie",
				cool: "Chladenie",
				heat_cool: "Automatické",
				dry: "Sušenie",
				fan_only: "Iba ventilátor",
				off: "Vypnuté",
				boost: "Dočasný boost",
				unavailable: "Nedostupné"
			},
			hvac: {
				heat: "Vykurovanie",
				cool: "Chladenie",
				heat_cool: "Vykurovanie/Chladenie",
				auto: "Automatické",
				dry: "Sušenie",
				fan_only: "Iba ventilátor",
				off: "Vypnuté"
			},
			hvac_action: {
				off: "Vypnuté",
				preheating: "Predohrev",
				heating: "Vykurovanie aktívne",
				cooling: "Chladenie aktívne",
				drying: "Sušenie aktívne",
				fan: "Ventilátor aktívny",
				idle: "Nečinný",
				defrosting: "Odmrazovanie"
			},
			preset: {
				none: "Bez prednastavenia",
				frost: "Ochrana pred mrazom",
				eco: "Eco",
				away: "Preč",
				comfort: "Komfort",
				home: "Domov",
				sleep: "Spánok",
				activity: "Aktivita",
				boost: "Boost"
			},
			fan: {
				on: "Zapnuté",
				auto: "Automatické",
				low: "Nízko",
				medium: "Stredné",
				middle: "Stred",
				high: "Vysoko",
				top: "Horný",
				off: "Vypnuté",
				focus: "Zameranie",
				diffuse: "Rozptyl",
				auto_fan_none: "Žiadny",
				auto_fan_low: "Nízko",
				auto_fan_medium: "Stredné",
				auto_fan_high: "Vysoko",
				auto_fan_turbo: "Turbo",
				None: "Žiadny",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Vypnuté",
				on: "Zapnuté",
				vertical: "Vertikálne",
				horizontal: "Horizontálne",
				both: "Oboje",
				unavailable: "Kyv"
			},
			lock: {
				locked: "Zamknuté",
				unlocked: "Odomknuté",
				code_required: "Vyžaduje sa kód",
				enter_code: "Zadajte kód",
				wrong_code: "Nesprávny kód"
			},
			events: {
				hasDanger: "Kritické upozornenie",
				hasAlert: "Upozornenie",
				hasOverpowering: "Preťaženie",
				hasOpenWindow: "Okno otvorené",
				hasPresence: "Prítomnosť zistená",
				hasTimer: "Časovač aktívny"
			},
			messages: {
				hvac_off_manual: "Ručne vypnuté",
				hvac_off_auto_start_stop: "Vypnuté automatickým spustením/zastavením",
				hvac_off_window_detection: "Vypnuté detekciou okna",
				hvac_off_sleep_mode: "Vypnuté režimom spánku",
				hvac_off_safety_detection: "Vypnuté režimom bezpečnosti",
				hvac_off_central_mode: "Vypnuté centrálnym režimom",
				safety_detected: "Režim bezpečnosti zistený",
				overpowering_detected: "Preťaženie zistené",
				target_temp_window_eco: "Cieľ. teplota: okno eco",
				target_temp_window_frost: "Cieľ. teplota: okno mráz",
				target_temp_power: "Cieľ. teplota: výkon",
				target_temp_central_mode: "Cieľ. teplota: centrálny režim",
				target_temp_activity_detected: "Cieľ. teplota: aktivita zistená",
				target_temp_activity_not_detected: "Cieľ. teplota: bez aktivity",
				target_temp_absence_detected: "Cieľ. teplota: neprítomnosť zistená",
				target_temp_timed_preset: "Načasované prednastavenie aktívne",
				not_initialized: "Chyba inicializácie",
				heating_failure: "Zistená chyba vykurovania",
				cooling_failure: "Zistená chyba chladenia"
			},
			actions: {
				decrease_temperature: "Znížiť nastavenú teplotu",
				increase_temperature: "Zvýšiť nastavenú teplotu",
				low_temperature: "Nízko",
				high_temperature: "Vysoko",
				open_fan: "Otvoriť ventilátor",
				open_swing: "Otvoriť kyv",
				open_menu: "Otvoriť menu",
				open_power_info: "Zobraziť indikátory výkonu"
			}
		},
		dialog: {
			close: "Zatvoriť",
			back: "Späť",
			fan: {
				title: "Ventilacia",
				description_auto: "Automatický režim automaticky prispôsobuje ventilciu potrebám vykurovania."
			},
			swing: {
				title: "Kyv",
				vertical: "Vertikálne",
				horizontal: "Horizontálne"
			},
			hvac: { title: "Režim" },
			preset: { title: "Prednastavenie" },
			message: { title: "Správa" },
			menu: {
				title: "Menu",
				regulation: "Regulácia",
				boost: "Dočasný boost",
				history: "História"
			},
			history: {
				title: "História",
				load: "Načítať",
				add: "Pridať",
				add_entity: "Pridať entitu",
				loading: "Načítavanie histórie...",
				empty: "Žiadna história za toto obdobie.",
				no_attributes: "Žiadny voliteľný atribút.",
				tools: "Nástroje",
				show_controls: "Zobraziť ovládacie prvky histórie",
				hide_controls: "Skryť ovládacie prvky histórie",
				fullscreen: "Celá obrazovka",
				exit_fullscreen: "Opustiť celú obrazovku",
				sources: {
					current_temperature: "Aktuálna teplota",
					temperature: "Cieľová teplota",
					hvac_action: "Akcia HVAC"
				}
			},
			boost: {
				title: "Dočasný boost",
				duration: "Trvanie v minútach",
				minutes: "min",
				hours: "h",
				start: "Spustiť",
				stop: "Zastaviť",
				active: "Boost aktívny",
				remaining_unknown: "Zvyšný čas nie je dostupný",
				preset: "Načasované prednastavenie",
				original_preset: "Predchádzajúce prednastavenie",
				start_description: "Po skončení odpočtu sa termostat vráti do predchádzajúceho režimu.",
				active_description: "Po skončení odpočtu sa termostat vráti do predchádzajúceho režimu.",
				active_description_with_preset: "Po skončení odpočtu sa termostat vráti do predchádzajúceho režimu ({preset})."
			}
		},
		editor: {
			entity: "Entita",
			name: "Názov",
			diagnostic_entity: "Diagnostická entita",
			power_entity: "Entita výkonu",
			humidity_entity: "Entita vlhkosti",
			temperature_entity: "Entita teploty",
			theme: "Téma",
			display_mode: "Formát",
			primary_display: "Priorita zobrazenia",
			card_background_color: "Farba pozadia karty",
			card_background_opacity: "Priehľadnosť pozadia karty",
			disable_name: "Skryť názov",
			hide_lock_button: "Skryť tlačítko zámku",
			additional_dashboards: "Ďalšie panely",
			state_icons_layout: "Ikony stavu",
			border_glow_on_action: "Okraje žiaria len keď je HVAC aktívny",
			tabs: {
				general: "Všeobecné",
				presentation: "Prezentácia",
				hvac: "Režimy HVAC",
				preset: "Predvoľby"
			},
			options: {
				theme: {
					flat: "Plochý",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "Klasický",
					compact: "Kompaktný"
				},
				primary_display: {
					setpoint: "Nastavená teplota",
					sensors: "Senzory"
				},
				layout_orientation: {
					horizontal: "Horizontálne",
					vertical: "Vertikálne"
				},
				additional_dashboards: {
					auto: "Automatické",
					custom: "Vlastný",
					disabled: "Zakázané"
				}
			},
			hvac_modes: "Tlačidlá HVAC",
			preset_modes: "Tlačidlá predvolieb",
			visibility: {
				help: "Odškrtnite režim, aby sa v Equinox skrylo jeho tlačidlo bez zmeny možností entity climate v Home Assistante.",
				no_entity: "Najprv vyberte entitu climate, aby sa načítali podporované režimy.",
				no_hvac_modes: "Táto entita climate neposkytuje žiadne podporované režimy HVAC.",
				no_presets: "Táto entita climate neposkytuje žiadne podporované predvoľby."
			}
		}
	},
	zh: {
		card: {
			description: "适用于 Versatile Thermostat 和标准气候实体的 Lovelace 卡片。",
			missing_entity: "请配置一个气候实体。",
			invalid_entity: "所配置的实体必须属于气候域。",
			invalid_theme: "所配置的主题不可用。",
			invalid_display_mode: "所配置的显示模式不可用。",
			invalid_primary_display: "所配置的显示优先级不可用。",
			invalid_additional_dashboards: "所配置的仪表板模式不可用。",
			invalid_state_icons_layout: "所配置的状态图标布局不可用。",
			entity_not_found: "未找到实体：{entity}",
			placeholder: "Equinox 已准备好显示 {entity}。"
		},
		main: {
			status: {
				heating: "加热中",
				cooling: "制冷中",
				auto: "自动",
				heat: "加热",
				cool: "制冷",
				heat_cool: "自动",
				dry: "除湿",
				fan_only: "仅风扇",
				off: "关闭",
				boost: "临时加速",
				unavailable: "不可用"
			},
			hvac: {
				heat: "加热",
				cool: "制冷",
				heat_cool: "加热/制冷",
				auto: "自动",
				dry: "除湿",
				fan_only: "仅风扇",
				off: "关闭"
			},
			hvac_action: {
				off: "关闭",
				preheating: "预热中",
				heating: "加热中",
				cooling: "制冷中",
				drying: "除湿中",
				fan: "风扇运行中",
				idle: "待机",
				defrosting: "除霜中"
			},
			preset: {
				none: "无预设",
				frost: "防冻保护",
				eco: "节能",
				away: "离家",
				comfort: "舒适",
				home: "在家",
				sleep: "睡眠",
				activity: "活动",
				boost: "加速"
			},
			fan: {
				on: "开启",
				auto: "自动",
				low: "低速",
				medium: "中速",
				middle: "中档",
				high: "高速",
				top: "最高",
				off: "关闭",
				focus: "集中",
				diffuse: "扩散",
				auto_fan_none: "无",
				auto_fan_low: "低速",
				auto_fan_medium: "中速",
				auto_fan_high: "高速",
				auto_fan_turbo: "涡轮",
				None: "无",
				Turbo: "涡轮",
				unavailable: "风扇"
			},
			swing: {
				off: "关闭",
				on: "开启",
				vertical: "垂直",
				horizontal: "水平",
				both: "全向",
				unavailable: "摆风"
			},
			lock: {
				locked: "已锁定",
				unlocked: "已解锁",
				code_required: "需要密码",
				enter_code: "输入密码",
				wrong_code: "密码错误"
			},
			events: {
				hasDanger: "严重警报",
				hasAlert: "警报",
				hasOverpowering: "功率过载",
				hasOpenWindow: "窗户开启",
				hasPresence: "检测到人员",
				hasTimer: "定时器激活"
			},
			messages: {
				hvac_off_manual: "已手动关闭",
				hvac_off_auto_start_stop: "已由自动启停关闭",
				hvac_off_window_detection: "已由开窗检测关闭",
				hvac_off_sleep_mode: "已由睡眠模式关闭",
				hvac_off_safety_detection: "已由安全模式关闭",
				hvac_off_central_mode: "已由集中模式关闭",
				safety_detected: "检测到安全模式",
				overpowering_detected: "检测到功率过载",
				target_temp_window_eco: "目标温度：开窗节能",
				target_temp_window_frost: "目标温度：开窗防冻",
				target_temp_power: "目标温度：功率限制",
				target_temp_central_mode: "目标温度：集中模式",
				target_temp_activity_detected: "目标温度：检测到活动",
				target_temp_activity_not_detected: "目标温度：未检测到活动",
				target_temp_absence_detected: "目标温度：检测到离家",
				target_temp_timed_preset: "定时预设激活",
				not_initialized: "初始化错误",
				heating_failure: "检测到加热故障",
				cooling_failure: "检测到制冷故障"
			},
			actions: {
				decrease_temperature: "降低设定温度",
				increase_temperature: "升高设定温度",
				low_temperature: "低温",
				high_temperature: "高温",
				open_fan: "打开风扇",
				open_swing: "打开摆风",
				open_menu: "打开菜单",
				open_power_info: "显示功率指标"
			}
		},
		dialog: {
			close: "关闭",
			back: "返回",
			fan: {
				title: "通风",
				description_auto: "自动模式根据加热需求自动调节通风。"
			},
			swing: {
				title: "摆风",
				vertical: "垂直",
				horizontal: "水平"
			},
			hvac: { title: "模式" },
			preset: { title: "预设" },
			message: { title: "消息" },
			menu: {
				title: "菜单",
				regulation: "调节",
				boost: "临时加速",
				history: "历史记录"
			},
			history: {
				title: "历史记录",
				load: "加载",
				add: "添加",
				add_entity: "添加实体",
				loading: "正在加载历史记录…",
				empty: "该时段无历史记录。",
				no_attributes: "无可选属性。",
				tools: "工具",
				show_controls: "显示历史记录控件",
				hide_controls: "隐藏历史记录控件",
				fullscreen: "全屏",
				exit_fullscreen: "退出全屏",
				sources: {
					current_temperature: "当前温度",
					temperature: "目标温度",
					hvac_action: "空调动作"
				}
			},
			boost: {
				title: "临时加速",
				duration: "持续时间（分钟）",
				minutes: "分",
				hours: "时",
				start: "开始",
				stop: "停止",
				active: "加速中",
				remaining_unknown: "剩余时间不可用",
				preset: "定时预设",
				original_preset: "上一个预设",
				start_description: "倒计时结束后，温控器将返回上一个模式。",
				active_description: "倒计时结束后，温控器将返回上一个模式。",
				active_description_with_preset: "倒计时结束后，温控器将返回上一个模式（{preset}）。"
			}
		},
		editor: {
			entity: "实体",
			name: "名称",
			diagnostic_entity: "诊断实体",
			power_entity: "功率实体",
			humidity_entity: "湿度实体",
			temperature_entity: "温度实体",
			theme: "主题",
			display_mode: "格式",
			primary_display: "显示优先级",
			card_background_color: "卡片背景颜色",
			card_background_opacity: "卡片背景不透明度",
			disable_name: "隐藏名称",
			hide_lock_button: "隐藏锁定按钮",
			additional_dashboards: "附加仪表板",
			state_icons_layout: "状态图标",
			border_glow_on_action: "仅在 HVAC 处于活动状态时边框发光",
			tabs: {
				general: "常规",
				presentation: "外观",
				hvac: "HVAC 模式",
				preset: "预设"
			},
			options: {
				theme: {
					flat: "扁平",
					liquid_glow: "Glow"
				},
				display_mode: {
					classic: "经典",
					compact: "紧凑"
				},
				primary_display: {
					setpoint: "设定值",
					sensors: "传感器"
				},
				layout_orientation: {
					horizontal: "水平",
					vertical: "垂直"
				},
				additional_dashboards: {
					auto: "自动",
					custom: "自定义",
					disabled: "禁用"
				}
			},
			hvac_modes: "HVAC 按钮",
			preset_modes: "预设按钮",
			visibility: {
				help: "取消勾选某个模式即可在不更改 Home Assistant 中 climate 实体能力的情况下隐藏其在 Equinox 中的按钮。",
				no_entity: "请先选择一个 climate 实体以加载受支持的模式。",
				no_hvac_modes: "此 climate 实体未报告受支持的 HVAC 模式。",
				no_presets: "此 climate 实体未报告受支持的预设。"
			}
		}
	}
}, io = [
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
	"he",
	"hu",
	"it",
	"nl",
	"no",
	"pl",
	"pt",
	"ru",
	"sk",
	"zh"
], ao = /* @__PURE__ */ new Map();
new Set(io);
for (let [e, t] of Object.entries(ro)) ao.set(e, t);
function oo(e) {
	return e.toLowerCase().split("-")[0] || "en";
}
function so(e) {
	return ao.get(oo(e));
}
//#endregion
//#region src/localize/localize.ts
function co(e) {
	return (e ?? "en").toLowerCase().split("-")[0] || "en";
}
function lo(e, t) {
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
function uo(e, t) {
	return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, String(n)), e);
}
function V(e, t, n = {}) {
	let r = so(co(e)), i = so("en");
	return uo((r == null ? void 0 : lo(r, t)) ?? (i == null ? void 0 : lo(i, t)) ?? t, n);
}
//#endregion
//#region src/types/config.ts
var fo = ["flat", "liquid_glow"], po = ["classic", "compact"], mo = ["setpoint", "sensors"], ho = [
	"auto",
	"custom",
	"disabled"
], go = ["horizontal", "vertical"], _o = {
	theme: Ua,
	display_mode: Wa,
	primary_display: Ga,
	disable_name: !1,
	hide_lock_button: !1,
	additional_dashboards: Ka,
	state_icons_layout: "horizontal",
	border_glow_on_action: !0
};
//#endregion
//#region src/equinox-card-editor.ts
no();
function vo(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function yo(e) {
	let t = { ...e };
	return delete t.card_height, delete t.diagnostic_entity, (!Array.isArray(t.hidden_hvac_modes) || t.hidden_hvac_modes.length === 0) && delete t.hidden_hvac_modes, (!Array.isArray(t.hidden_preset_modes) || t.hidden_preset_modes.length === 0) && delete t.hidden_preset_modes, t;
}
var bo = class extends O {
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
		this._config = yo(e);
	}
	render() {
		let e = this.hass?.locale?.language ?? this.hass?.language, t = {
			..._o,
			...this._config
		};
		return T`
      <div class="tabs">
        <button class="tab" ?active=${this._activeTab === "general"} @click=${() => {
			this._activeTab = "general";
		}}>
          ${V(e, "editor.tabs.general")}
        </button>
        <button class="tab" ?active=${this._activeTab === "presentation"} @click=${() => {
			this._activeTab = "presentation";
		}}>
          ${V(e, "editor.tabs.presentation")}
        </button>
        <button class="tab" ?active=${this._activeTab === "hvac"} @click=${() => {
			this._activeTab = "hvac";
		}}>
          ${V(e, "editor.tabs.hvac")}
        </button>
        <button class="tab" ?active=${this._activeTab === "preset"} @click=${() => {
			this._activeTab = "preset";
		}}>
          ${V(e, "editor.tabs.preset")}
        </button>
      </div>
      ${this._activeTab === "presentation" ? this._renderPresentationTab(e, t) : this._activeTab === "general" ? T`
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
		return T`
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
		return T`
      <div class="options-panel">
        <div class="options-help">${V(e, "editor.visibility.help")}</div>
        ${n.length === 0 ? T`<div class="options-empty">${V(e, this._config.entity ? i : "editor.visibility.no_entity")}</div>` : T`
              <div class="checkbox-list">
                ${n.map((n) => T`
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
							label: V(e, "editor.options.additional_dashboards.auto")
						},
						{
							value: "custom",
							label: V(e, "editor.options.additional_dashboards.custom")
						},
						{
							value: "disabled",
							label: V(e, "editor.options.additional_dashboards.disabled")
						}
					]
				} }
			}
		];
	}
	_presentationSchema(e) {
		let t = [{
			value: "horizontal",
			label: V(e, "editor.options.layout_orientation.horizontal")
		}, {
			value: "vertical",
			label: V(e, "editor.options.layout_orientation.vertical")
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
						label: V(e, "editor.options.theme.flat")
					}, {
						value: "liquid_glow",
						label: V(e, "editor.options.theme.liquid_glow")
					}]
				} }
			},
			{
				name: "display_mode",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "classic",
						label: V(e, "editor.options.display_mode.classic")
					}, {
						value: "compact",
						label: V(e, "editor.options.display_mode.compact")
					}]
				} }
			},
			{
				name: "primary_display",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "setpoint",
						label: V(e, "editor.options.primary_display.setpoint")
					}, {
						value: "sensors",
						label: V(e, "editor.options.primary_display.sensors")
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
		return T`
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
		return vo(t);
	}
	_colorChanged(e, t) {
		let n = { ...this._config }, r = vo(t.detail.value);
		r === void 0 || r === "" ? delete n[e] : n[e] = r, this._config = yo(n), this._emitConfigChanged();
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
		return qa.filter((t) => e.has(t) && Ja[t]);
	}
	_supportedPresetModes() {
		let e = new Set(this._attributeModes("preset_modes"));
		return Xa.filter((t) => e.has(t) && t !== "none" && B[t]);
	}
	_hvacLabel(e, t) {
		let n = V(e, `main.hvac.${t}`);
		return n === `main.hvac.${t}` ? t : n;
	}
	_presetLabel(e, t) {
		let n = V(e, `main.preset.${t}`);
		return n === `main.preset.${t}` ? t : n;
	}
	_computeLabel(e) {
		return (t) => V(e, `editor.${t.name}`);
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
		n ? i.delete(t) : i.add(t), this._config = yo({
			...this._config,
			[r]: i.size > 0 ? [...i] : void 0
		}), this._emitConfigChanged();
	}
	_valueChanged(e) {
		this._config = yo({
			...this._config,
			...e.detail.value
		}), this._emitConfigChanged();
	}
};
customElements.get("equinox-card-editor") || customElements.define(Ha, bo);
//#endregion
//#region src/data/actions.ts
var xo = {
	auto_fan_none: "None",
	auto_fan_low: "Low",
	auto_fan_medium: "Medium",
	auto_fan_high: "High",
	auto_fan_turbo: "Turbo"
};
function H(e) {
	return e.viewModel?.vt?.lock.isUserLocked === !0;
}
function U() {
	return {
		ok: !1,
		error: "locked"
	};
}
function W() {
	return {
		ok: !1,
		error: "unsupported"
	};
}
function So() {
	return {
		ok: !1,
		error: "invalid_payload"
	};
}
async function G(e, t, n, r) {
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
function Co(e) {
	return typeof e == "number" && Number.isFinite(e);
}
async function wo(e, t) {
	return H(e) ? U() : Co(t.targetTempLow) && Co(t.targetTempHigh) ? G(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		target_temp_low: t.targetTempLow,
		target_temp_high: t.targetTempHigh
	}) : Co(t.temperature) ? G(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		temperature: t.temperature
	}) : So();
}
async function To(e, t) {
	return H(e) ? U() : e.viewModel?.climate.hvacModes.includes(t) ? G(e, "climate", "set_hvac_mode", {
		entity_id: e.entityId,
		hvac_mode: t
	}) : W();
}
async function Eo(e, t) {
	return H(e) ? U() : e.viewModel?.climate.presetModes.includes(t) ? G(e, "climate", "set_preset_mode", {
		entity_id: e.entityId,
		preset_mode: t
	}) : W();
}
async function Do(e, t) {
	return H(e) ? U() : e.viewModel?.climate.fanModes.includes(t) ? G(e, "climate", "set_fan_mode", {
		entity_id: e.entityId,
		fan_mode: t
	}) : W();
}
async function Oo(e, t) {
	return H(e) ? U() : e.viewModel?.climate.swingModes.includes(t) ? G(e, "climate", "set_swing_mode", {
		entity_id: e.entityId,
		swing_mode: t
	}) : W();
}
async function ko(e, t) {
	return H(e) ? U() : e.viewModel?.climate.swingHorizontalModes.includes(t) ? G(e, "climate", "set_swing_horizontal_mode", {
		entity_id: e.entityId,
		swing_horizontal_mode: t
	}) : W();
}
async function Ao(e, t, n) {
	return H(e) ? U() : !e.viewModel?.vt?.isVt || !e.viewModel.vt.timedPresetManager ? W() : !Number.isInteger(n) || n < 1 || n > 1440 || t.trim() === "" ? So() : G(e, "versatile_thermostat", "set_timed_preset", {
		entity_id: e.entityId,
		preset: t,
		duration_minutes: n
	});
}
async function jo(e) {
	return H(e) ? U() : e.viewModel?.vt?.timedPreset.isActive ? G(e, "versatile_thermostat", "cancel_timed_preset", { entity_id: e.entityId }) : W();
}
async function Mo(e, t) {
	if (H(e)) return U();
	if (!e.viewModel?.vt?.fan.hasAutoFan) return W();
	let n = xo[t];
	return n ? G(e, "versatile_thermostat", "set_auto_fan_mode", {
		entity_id: e.entityId,
		auto_fan_mode: n
	}) : So();
}
async function No(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return W();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), G(e, "versatile_thermostat", "lock", n);
}
async function Po(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return W();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), G(e, "versatile_thermostat", "unlock", n);
}
//#endregion
//#region src/data/colors.ts
var Fo = {
	cooling: "cool",
	defrosting: "heat",
	drying: "dry",
	fan: "fan_only",
	heating: "heat",
	idle: "off",
	off: "off",
	preheating: "heat"
}, Io = {
	heat: "heat",
	cool: "cool",
	heat_cool: "heat-cool",
	auto: "auto",
	dry: "dry",
	fan_only: "fan-only",
	off: "off"
};
function K(e) {
	return e ? e === "idle" ? "muted" : e === "off" ? "off" : Io[Fo[e] ?? e] ?? "" : "";
}
function Lo(e, t) {
	switch (e) {
		case "frost": return "preset-frost";
		case "eco": return "preset-eco";
		case "away": return "preset-away";
		case "comfort": return t === "cool" ? "cool" : "preset-comfort";
		case "home": return "preset-home";
		case "sleep": return "preset-sleep";
		case "activity": return t === "cool" ? "cool-boost" : "preset-activity";
		case "boost": return t === "cool" ? "cool-boost" : "boost";
		default: return "";
	}
}
function Ro(e) {
	if (!e) return "";
	switch (e.toLowerCase().replace(/^fan_/, "").replace(/^auto_fan_/, "")) {
		case "off":
		case "none": return "fan-off";
		case "auto": return "fan-auto";
		case "low": return "fan-low";
		case "medium":
		case "middle": return "fan-medium";
		case "high":
		case "top":
		case "turbo": return "fan-high";
		case "on": return "fan-high";
		case "focus": return "fan-focus";
		case "diffuse": return "fan-diffuse";
		default: return "";
	}
}
function zo(e) {
	if (!e) return "";
	switch (e.toLowerCase().replace(/^swing_/, "")) {
		case "off": return "swing-off";
		case "on": return "swing-on";
		case "vertical": return "swing-vertical";
		case "horizontal": return "swing-horizontal";
		case "both": return "swing-both";
		default: return "";
	}
}
function Bo(e) {
	return e ? "lock-locked" : "lock-unlocked";
}
//#endregion
//#region src/data/fan.ts
var Vo = {
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
}, Ho = [
	"auto_fan_none",
	"auto_fan_low",
	"auto_fan_medium",
	"auto_fan_high",
	"auto_fan_turbo"
], Uo = {
	smartpi: {
		schema_version: 1,
		kind: "regulation-dashboard",
		algorithm: "smartpi",
		title: "Smart PI",
		translations: /* @__PURE__ */ JSON.parse("{\"fr\":{\"sections.overview.title\":\"Vue d'ensemble\",\"sections.overview.summary\":\"Synthese de la regulation Smart PI active.\",\"sections.learning.title\":\"Apprentissage\",\"sections.learning.summary\":\"Etat de la collecte des echantillons A/B du modele thermique.\",\"sections.model.title\":\"Modele thermique\",\"sections.model.summary\":\"Fiabilite du modele et temps morts estimes.\",\"sections.command.title\":\"Commande\",\"sections.command.summary\":\"Puissance demandee, limites et decomposition de la commande.\",\"sections.health.title\":\"Securite et actions\",\"sections.health.summary\":\"Garde-fous, calibration et actions de maintenance.\",\"hero.overview.title\":\"Smart PI pilote la regulation\",\"hero.overview.bootstrap\":\"Smart PI collecte les premiers echantillons et regule provisoirement en hysteresis.\",\"hero.overview.hysteresis_learning\":\"Le modele se consolide encore ; la regulation reste prudente pendant l'apprentissage.\",\"hero.overview.stable_learning\":\"Smart PI affine le modele tout en pilotant la regulation active.\",\"hero.overview.monitoring\":\"Le modele thermique est exploite pour anticiper la puissance necessaire.\",\"hero.overview.calibration\":\"Une calibration est en cours pour recaler le comportement thermique.\",\"hero.overview.degraded\":\"La regulation limite l'adaptation car le modele manque de fiabilite.\",\"hero.overview.fallback\":\"Smart PI ajuste la puissance selon la phase courante, l'apprentissage A/B et les limites de securite.\",\"hero.learning.title\":\"Apprentissage A/B\",\"hero.learning.subtitle\":\"Etat de la collecte des echantillons A/B du modele thermique.\",\"hero.model.title\":\"Modele thermique\",\"hero.model.subtitle\":\"La confiance du modele determine la part de feed-forward et les limites de prudence.\",\"hero.command.title\":\"Commande appliquee\",\"hero.command.subtitle\":\"La commande finale combine PI, feed-forward, maintien et limitations.\",\"hero.health.title\":\"Surveillance active\",\"hero.health.subtitle\":\"Les protections peuvent figer l'apprentissage ou demander une calibration.\",\"metrics.phase\":\"Phase\",\"metrics.mode\":\"Mode\",\"metrics.hysteresis\":\"Etat hysteresis\",\"metrics.temperature\":\"Temperature\",\"metrics.external_temperature\":\"Temperature externe\",\"metrics.error\":\"Ecart consigne\",\"metrics.integral_error\":\"Integrale\",\"metrics.filtered_setpoint\":\"Consigne filtree\",\"metrics.current_cycle\":\"Cycle courant\",\"metrics.next_cycle\":\"Prochain cycle\",\"metrics.linear_current_cycle\":\"Cycle courant lineaire\",\"metrics.linear_next_cycle\":\"Prochain cycle lineaire\",\"metrics.command\":\"Commande\",\"metrics.limited\":\"Limitee\",\"metrics.applied\":\"Appliquee\",\"metrics.pi\":\"PI\",\"metrics.ff\":\"Feed-forward\",\"metrics.hold\":\"Maintien\",\"metrics.kp\":\"Kp\",\"metrics.ki\":\"Ki\",\"metrics.a\":\"A - Reponse active\",\"metrics.b\":\"B - Pertes thermiques\",\"metrics.tau\":\"Tau\",\"metrics.deadtime_heat\":\"Temps mort chauffe\",\"metrics.deadtime_cool\":\"Temps mort refroidissement\",\"metrics.a_stability\":\"Dispersion A\",\"metrics.b_stability\":\"Dispersion B\",\"metrics.samples_a\":\"Historique A\",\"metrics.samples_b\":\"Historique B\",\"metrics.accepted_a\":\"Updates A acceptes\",\"metrics.accepted_b\":\"Updates B acceptes\",\"metrics.bootstrap_progress\":\"Bootstrap\",\"metrics.bootstrap_a\":\"Echantillons A\",\"metrics.bootstrap_b\":\"Echantillons B\",\"metrics.history_a\":\"Echantillons A\",\"metrics.history_b\":\"Echantillons B\",\"metrics.learning_stage\":\"Etat apprentissage\",\"metrics.bootstrap_status\":\"Etat bootstrap\",\"metrics.confidence\":\"Confiance modele\",\"metrics.reliability\":\"Fiabilite\",\"metrics.tau_reliable\":\"Tau\",\"metrics.deadtime_heat_reliable\":\"Temps mort chauffe\",\"metrics.deadtime_cool_reliable\":\"Temps mort refroidissement\",\"metrics.governance\":\"Regime de securite\",\"metrics.thermal_decision\":\"Decision thermique\",\"metrics.thermal_reason\":\"Raison\",\"metrics.feedforward_status\":\"FF3\",\"metrics.twin_status\":\"Jumeau thermique\",\"metrics.deadband_source\":\"Source deadband\",\"metrics.deadband_mode\":\"Mode deadband\",\"metrics.in_deadband\":\"Dans la bande morte\",\"metrics.in_near_band\":\"Zone proche\",\"metrics.in_deadtime\":\"Fenetre temps mort\",\"metrics.saturation\":\"Saturation\",\"metrics.integral_mode\":\"Mode integrale\",\"metrics.integral_hold\":\"Maintien integrale\",\"metrics.autocalib_state\":\"Autocalibration\",\"metrics.autocalib_degraded\":\"Modele degrade\",\"metrics.autocalib_snapshot_age\":\"Age du snapshot\",\"metrics.autocalib_next_check\":\"Prochain controle\",\"metrics.calibration_state\":\"Calibration\",\"metrics.calibration_retry\":\"Essais calibration\",\"status.phase.Hysteresis\":\"Bootstrap hysteresis\",\"status.phase.Stable\":\"Stable\",\"status.phase.Calibration\":\"Calibration\",\"status.mode.smartpi\":\"Smart PI\",\"status.mode.hysteresis\":\"Hysteresis\",\"status.hysteresis.on\":\"Chauffe\",\"status.hysteresis.off\":\"Arret\",\"status.hysteresis.band\":\"Bande morte\",\"status.learning.bootstrap\":\"Bootstrap\",\"status.learning.learning\":\"Apprentissage\",\"status.learning.monitoring\":\"Surveillance\",\"status.learning.degraded\":\"Degrade\",\"status.confidence.ab_ok\":\"Modele fiable\",\"status.confidence.ab_bootstrap\":\"Bootstrap du modele\",\"status.confidence.ab_degraded\":\"Modele partiel\",\"status.confidence.ab_bad\":\"Modele insuffisant\",\"status.confidence.unknown\":\"Confiance inconnue\",\"status.confidence.ab_ok.description\":\"Les echantillons A et B sont suffisamment coherents pour utiliser le modele normalement.\",\"status.confidence.ab_bootstrap.description\":\"Smart PI collecte encore les echantillons de bootstrap ; le modele n'est pas encore pret.\",\"status.confidence.ab_degraded.description\":\"Une partie du modele est exploitable, mais la regulation reste prudente.\",\"status.confidence.ab_bad.description\":\"Le modele n'est pas assez fiable ; Smart PI limite ou evite son influence.\",\"status.confidence.unknown.description\":\"L'etat de confiance n'est pas encore publie par le diagnostic.\",\"status.boolean.true\":\"Oui\",\"status.boolean.false\":\"Non\",\"status.reliability.true\":\"Fiable\",\"status.reliability.false\":\"Non fiable\",\"status.coherence.collecting\":\"En collecte\",\"status.coherence.coherent\":\"Coherente\",\"status.coherence.watch\":\"A surveiller\",\"status.coherence.acceptable\":\"Acceptable\",\"status.coherence.dispersed\":\"Dispersee\",\"status.coherence.unstable\":\"Instable\",\"status.coherence.very_unstable\":\"Tres instable\",\"status.autocalib.idle\":\"Desactivee\",\"status.autocalib.waiting_snapshot\":\"Attente snapshot\",\"status.autocalib.monitoring\":\"Surveillance\",\"status.autocalib.triggered\":\"Declenchee\",\"status.autocalib.post_calib_check\":\"Verification\",\"status.calibration.Idle\":\"Inactive\",\"status.calibration.CoolDown\":\"Refroidissement\",\"status.calibration.HeatUp\":\"Chauffe\",\"status.calibration.CoolDownFinal\":\"Refroidissement final\",\"status.decision.adapt_on\":\"Adaptation autorisee\",\"status.decision.freeze\":\"Fige\",\"status.decision.hard_freeze\":\"Blocage strict\",\"status.decision.soft_freeze_down\":\"Baisse seule\",\"status.regime.warmup\":\"Echauffement\",\"status.regime.excited_stable\":\"Stable excite\",\"status.regime.near_band\":\"Zone proche\",\"status.regime.dead_band\":\"Bande morte\",\"status.regime.hold\":\"Maintien\",\"status.regime.perturbed\":\"Perturbe\",\"status.regime.degraded\":\"Degrade\",\"status.regime.saturated\":\"Sature\",\"notes.diagnostic_required\":\"Le thermostat n'a pas encore publie l'entite de diagnostic Smart PI.\",\"notes.learning\":\"A mesure la reponse a la commande ; B mesure les pertes thermiques. Smart PI collecte les deux series d'echantillons pour fiabiliser le modele.\",\"notes.hysteresis_phase\":\"En phase bootstrap, Smart PI peut fonctionner en hysteresis le temps de collecter assez d'observations.\",\"actions.reset_learning\":\"Reinitialiser l'apprentissage\",\"actions.reset_learning.confirm\":\"Smart PI va effacer son apprentissage et revenir en bootstrap.\",\"actions.force_calibration\":\"Forcer une calibration\",\"actions.force_calibration.confirm\":\"Smart PI va lancer une calibration si l'etat courant le permet.\",\"actions.reset_integral\":\"Reinitialiser l'integrale\",\"actions.reset_integral.confirm\":\"Smart PI va remettre le terme integral a zero sans effacer le modele appris.\",\"graphs.command.title\":\"Commande Smart PI\",\"graphs.command.applied\":\"Puissance appliquee\",\"graphs.command.command\":\"Commande\",\"graphs.command.pi\":\"PI\",\"graphs.command.ff\":\"Feed-forward\",\"graphs.model.title\":\"Parametres A et B (1R1C) (24h)\",\"graphs.model.a\":\"A - Reponse active\",\"graphs.model.b\":\"B - Pertes thermiques\"},\"en\":{\"sections.overview.title\":\"Overview\",\"sections.overview.summary\":\"Summary of the active Smart PI regulation.\",\"sections.learning.title\":\"Learning\",\"sections.learning.summary\":\"Sample collection state for the A/B thermal model.\",\"sections.model.title\":\"Thermal model\",\"sections.model.summary\":\"Model reliability and estimated dead times.\",\"sections.command.title\":\"Command\",\"sections.command.summary\":\"Requested power, limits and command breakdown.\",\"sections.health.title\":\"Safety and actions\",\"sections.health.summary\":\"Guards, calibration and maintenance actions.\",\"hero.overview.title\":\"Smart PI is driving regulation\",\"hero.overview.bootstrap\":\"Smart PI is collecting the first samples and temporarily regulating with hysteresis.\",\"hero.overview.hysteresis_learning\":\"The model is still consolidating; regulation remains cautious during learning.\",\"hero.overview.stable_learning\":\"Smart PI is refining the model while driving active regulation.\",\"hero.overview.monitoring\":\"The thermal model is used to anticipate the required power.\",\"hero.overview.calibration\":\"Calibration is running to realign the thermal behavior.\",\"hero.overview.degraded\":\"Regulation limits adaptation because the model lacks reliability.\",\"hero.overview.fallback\":\"Smart PI adjusts power from the current phase, A/B learning and safety limits.\",\"hero.learning.title\":\"A/B learning\",\"hero.learning.subtitle\":\"Sample collection state for the A/B thermal model.\",\"hero.model.title\":\"Thermal model\",\"hero.model.subtitle\":\"Model confidence controls the feed-forward share and cautious limits.\",\"hero.command.title\":\"Applied command\",\"hero.command.subtitle\":\"The final command combines PI, feed-forward, hold and limits.\",\"hero.health.title\":\"Active supervision\",\"hero.health.subtitle\":\"Protections may freeze learning or request calibration.\",\"metrics.phase\":\"Phase\",\"metrics.mode\":\"Mode\",\"metrics.hysteresis\":\"Hysteresis state\",\"metrics.temperature\":\"Temperature\",\"metrics.external_temperature\":\"External temperature\",\"metrics.error\":\"Setpoint error\",\"metrics.integral_error\":\"Integral\",\"metrics.filtered_setpoint\":\"Filtered setpoint\",\"metrics.current_cycle\":\"Current cycle\",\"metrics.next_cycle\":\"Next cycle\",\"metrics.linear_current_cycle\":\"Linear current cycle\",\"metrics.linear_next_cycle\":\"Linear next cycle\",\"metrics.command\":\"Command\",\"metrics.limited\":\"Limited\",\"metrics.applied\":\"Applied\",\"metrics.pi\":\"PI\",\"metrics.ff\":\"Feed-forward\",\"metrics.hold\":\"Hold\",\"metrics.kp\":\"Kp\",\"metrics.ki\":\"Ki\",\"metrics.a\":\"A - Active response\",\"metrics.b\":\"B - Thermal losses\",\"metrics.tau\":\"Tau\",\"metrics.deadtime_heat\":\"Heat dead time\",\"metrics.deadtime_cool\":\"Cool dead time\",\"metrics.a_stability\":\"A dispersion\",\"metrics.b_stability\":\"B dispersion\",\"metrics.samples_a\":\"A history\",\"metrics.samples_b\":\"B history\",\"metrics.accepted_a\":\"Accepted A updates\",\"metrics.accepted_b\":\"Accepted B updates\",\"metrics.bootstrap_progress\":\"Bootstrap\",\"metrics.bootstrap_a\":\"A samples\",\"metrics.bootstrap_b\":\"B samples\",\"metrics.history_a\":\"A samples\",\"metrics.history_b\":\"B samples\",\"metrics.learning_stage\":\"Learning state\",\"metrics.bootstrap_status\":\"Bootstrap state\",\"metrics.confidence\":\"Model confidence\",\"metrics.reliability\":\"Reliability\",\"metrics.tau_reliable\":\"Tau\",\"metrics.deadtime_heat_reliable\":\"Heat dead time\",\"metrics.deadtime_cool_reliable\":\"Cool dead time\",\"metrics.governance\":\"Safety regime\",\"metrics.thermal_decision\":\"Thermal decision\",\"metrics.thermal_reason\":\"Reason\",\"metrics.feedforward_status\":\"FF3\",\"metrics.twin_status\":\"Thermal twin\",\"metrics.deadband_source\":\"Deadband source\",\"metrics.deadband_mode\":\"Deadband mode\",\"metrics.in_deadband\":\"In dead band\",\"metrics.in_near_band\":\"Near band\",\"metrics.in_deadtime\":\"Dead-time window\",\"metrics.saturation\":\"Saturation\",\"metrics.integral_mode\":\"Integral mode\",\"metrics.integral_hold\":\"Integral hold\",\"metrics.autocalib_state\":\"Auto-calibration\",\"metrics.autocalib_degraded\":\"Model degraded\",\"metrics.autocalib_snapshot_age\":\"Snapshot age\",\"metrics.autocalib_next_check\":\"Next check\",\"metrics.calibration_state\":\"Calibration\",\"metrics.calibration_retry\":\"Calibration retries\",\"status.phase.Hysteresis\":\"Bootstrap hysteresis\",\"status.phase.Stable\":\"Stable\",\"status.phase.Calibration\":\"Calibration\",\"status.mode.smartpi\":\"Smart PI\",\"status.mode.hysteresis\":\"Hysteresis\",\"status.hysteresis.on\":\"Heating\",\"status.hysteresis.off\":\"Off\",\"status.hysteresis.band\":\"Dead band\",\"status.learning.bootstrap\":\"Bootstrap\",\"status.learning.learning\":\"Learning\",\"status.learning.monitoring\":\"Monitoring\",\"status.learning.degraded\":\"Degraded\",\"status.confidence.ab_ok\":\"Reliable model\",\"status.confidence.ab_bootstrap\":\"Model bootstrap\",\"status.confidence.ab_degraded\":\"Partial model\",\"status.confidence.ab_bad\":\"Insufficient model\",\"status.confidence.unknown\":\"Unknown confidence\",\"status.confidence.ab_ok.description\":\"A and B samples are coherent enough to use the model normally.\",\"status.confidence.ab_bootstrap.description\":\"Smart PI is still collecting bootstrap samples; the model is not ready yet.\",\"status.confidence.ab_degraded.description\":\"Part of the model is usable, but regulation remains cautious.\",\"status.confidence.ab_bad.description\":\"The model is not reliable enough; Smart PI limits or avoids its influence.\",\"status.confidence.unknown.description\":\"The confidence state has not been published by diagnostics yet.\",\"status.boolean.true\":\"Yes\",\"status.boolean.false\":\"No\",\"status.reliability.true\":\"Reliable\",\"status.reliability.false\":\"Not reliable\",\"status.coherence.collecting\":\"Collecting\",\"status.coherence.coherent\":\"Coherent\",\"status.coherence.watch\":\"Watch\",\"status.coherence.acceptable\":\"Acceptable\",\"status.coherence.dispersed\":\"Dispersed\",\"status.coherence.unstable\":\"Unstable\",\"status.coherence.very_unstable\":\"Very unstable\",\"status.autocalib.idle\":\"Disabled\",\"status.autocalib.waiting_snapshot\":\"Waiting for snapshot\",\"status.autocalib.monitoring\":\"Monitoring\",\"status.autocalib.triggered\":\"Triggered\",\"status.autocalib.post_calib_check\":\"Checking\",\"status.calibration.Idle\":\"Inactive\",\"status.calibration.CoolDown\":\"Cool down\",\"status.calibration.HeatUp\":\"Heat up\",\"status.calibration.CoolDownFinal\":\"Final cool down\",\"status.decision.adapt_on\":\"Adaptation allowed\",\"status.decision.freeze\":\"Frozen\",\"status.decision.hard_freeze\":\"Hard freeze\",\"status.decision.soft_freeze_down\":\"Downward only\",\"status.regime.warmup\":\"Warmup\",\"status.regime.excited_stable\":\"Excited stable\",\"status.regime.near_band\":\"Near band\",\"status.regime.dead_band\":\"Dead band\",\"status.regime.hold\":\"Hold\",\"status.regime.perturbed\":\"Perturbed\",\"status.regime.degraded\":\"Degraded\",\"status.regime.saturated\":\"Saturated\",\"notes.diagnostic_required\":\"The thermostat has not published the Smart PI diagnostics entity yet.\",\"notes.learning\":\"A measures the command response; B measures thermal losses. Smart PI collects both sample series to make the model reliable.\",\"notes.hysteresis_phase\":\"During bootstrap, Smart PI may run in hysteresis while collecting enough observations.\",\"actions.reset_learning\":\"Reset learning\",\"actions.reset_learning.confirm\":\"Smart PI will clear learning and return to bootstrap.\",\"actions.force_calibration\":\"Force calibration\",\"actions.force_calibration.confirm\":\"Smart PI will start a calibration cycle if the current state allows it.\",\"actions.reset_integral\":\"Reset integral\",\"actions.reset_integral.confirm\":\"Smart PI will reset the integral term without clearing the learned model.\",\"graphs.command.title\":\"Smart PI command\",\"graphs.command.applied\":\"Applied power\",\"graphs.command.command\":\"Command\",\"graphs.command.pi\":\"PI\",\"graphs.command.ff\":\"Feed-forward\",\"graphs.model.title\":\"1R1C Parameters A and B (24h)\",\"graphs.model.a\":\"A - Active response\",\"graphs.model.b\":\"B - Thermal losses\"}}"),
		sections: [
			{
				id: "overview",
				title_key: "sections.overview.title",
				icon: "mdi:view-dashboard-outline",
				summary_key: "sections.overview.summary",
				items: [
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.bootstrap",
						icon: "mdi:chart-bell-curve",
						tone: "warning",
						visible_if: { and: [{ "==": [{ var: "diagnostic/control/phase" }, "Hysteresis"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.hysteresis_learning",
						icon: "mdi:chart-bell-curve",
						tone: "info",
						visible_if: { and: [{ "==": [{ var: "diagnostic/control/phase" }, "Hysteresis"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "learning"] }] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.stable_learning",
						icon: "mdi:chart-bell-curve",
						tone: "info",
						visible_if: { and: [{ "==": [{ var: "diagnostic/control/phase" }, "Stable"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "learning"] }] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.monitoring",
						icon: "mdi:chart-bell-curve",
						tone: "ok",
						visible_if: { and: [{ "==": [{ var: "diagnostic/control/phase" }, "Stable"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "monitoring"] }] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.calibration",
						icon: "mdi:tune-variant",
						tone: "info",
						visible_if: { "==": [{ var: "diagnostic/control/phase" }, "Calibration"] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.degraded",
						icon: "mdi:alert-outline",
						tone: "danger",
						visible_if: { and: [{ "==": [{ var: "diagnostic/ab_learning/stage" }, "degraded"] }, { "!=": [{ var: "diagnostic/control/phase" }, "Calibration"] }] }
					},
					{
						type: "hero_status",
						title_key: "hero.overview.title",
						subtitle_key: "hero.overview.fallback",
						icon: "mdi:chart-bell-curve",
						tone: "info",
						visible_if: { "!": { or: [
							{ and: [{ "==": [{ var: "diagnostic/control/phase" }, "Hysteresis"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }] },
							{ and: [{ "==": [{ var: "diagnostic/control/phase" }, "Hysteresis"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "learning"] }] },
							{ and: [{ "==": [{ var: "diagnostic/control/phase" }, "Stable"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "learning"] }] },
							{ and: [{ "==": [{ var: "diagnostic/control/phase" }, "Stable"] }, { "==": [{ var: "diagnostic/ab_learning/stage" }, "monitoring"] }] },
							{ "==": [{ var: "diagnostic/control/phase" }, "Calibration"] },
							{ and: [{ "==": [{ var: "diagnostic/ab_learning/stage" }, "degraded"] }, { "!=": [{ var: "diagnostic/control/phase" }, "Calibration"] }] }
						] } }
					},
					{
						type: "layout_grid",
						min_width: 140,
						items: [{
							type: "status",
							label_key: "metrics.phase",
							source: "diagnostic",
							path: "control/phase",
							map: {
								Hysteresis: {
									label_key: "status.phase.Hysteresis",
									tone: "warning",
									icon: "mdi:chart-timeline-variant"
								},
								Stable: {
									label_key: "status.phase.Stable",
									tone: "ok",
									icon: "mdi:check-circle-outline"
								},
								Calibration: {
									label_key: "status.phase.Calibration",
									tone: "info",
									icon: "mdi:tune-variant"
								}
							},
							fallback: {
								label: "--",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						}, {
							type: "status",
							label_key: "metrics.learning_stage",
							source: "diagnostic",
							path: "ab_learning/stage",
							map: {
								bootstrap: {
									label_key: "status.learning.bootstrap",
									tone: "warning",
									icon: "mdi:school-outline"
								},
								learning: {
									label_key: "status.learning.learning",
									tone: "info",
									icon: "mdi:school-outline"
								},
								monitoring: {
									label_key: "status.learning.monitoring",
									tone: "ok",
									icon: "mdi:radar"
								},
								degraded: {
									label_key: "status.learning.degraded",
									tone: "danger",
									icon: "mdi:alert-outline"
								}
							},
							fallback: {
								label: "--",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						}]
					},
					{
						type: "metric_grid",
						title_key: "sections.overview.title",
						metrics: [
							{
								label_key: "metrics.temperature",
								source: "diagnostic",
								path: "temperature/sensor",
								unit: "°",
								digits: 1
							},
							{
								label_key: "metrics.filtered_setpoint",
								source: "diagnostic",
								path: "setpoint/filtered_setpoint",
								unit: "°",
								digits: 1
							},
							{
								label_key: "metrics.error",
								source: "diagnostic",
								path: "temperature/error",
								unit: "°",
								digits: 2
							},
							{
								label_key: "metrics.applied",
								source: "diagnostic",
								path: "power/applied_percent",
								unit: "%",
								digits: 0
							},
							{
								label_key: "metrics.next_cycle",
								source: "diagnostic",
								path: "power/next_cycle_percent",
								unit: "%",
								digits: 0
							},
							{
								label_key: "metrics.mode",
								source: "diagnostic",
								path: "control/mode"
							}
						]
					}
				]
			},
			{
				id: "learning",
				title_key: "sections.learning.title",
				icon: "mdi:school-outline",
				summary_key: "sections.learning.summary",
				items: [
					{
						type: "hero_status",
						title_key: "hero.learning.title",
						subtitle_key: "hero.learning.subtitle",
						icon: "mdi:school-outline",
						tone: "info"
					},
					{
						type: "progress",
						label_key: "metrics.bootstrap_progress",
						value: {
							source: "diagnostic",
							path: "ab_learning/bootstrap_progress_percent"
						},
						target: 100,
						unit: "%",
						digits: 0,
						visible_if: { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
					},
					{
						type: "layout_grid",
						min_width: 140,
						items: [
							{
								type: "progress",
								label_key: "metrics.bootstrap_a",
								value: {
									source: "diagnostic",
									path: "ab_learning/emea_samples_a"
								},
								target: {
									source: "diagnostic",
									path: "ab_learning/bootstrap_target_a"
								},
								digits: 0,
								visible_if: { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
							},
							{
								type: "progress",
								label_key: "metrics.bootstrap_b",
								value: {
									source: "diagnostic",
									path: "ab_learning/emea_samples_b"
								},
								target: {
									source: "diagnostic",
									path: "ab_learning/bootstrap_target_b"
								},
								digits: 0,
								visible_if: { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
							},
							{
								type: "progress",
								label_key: "metrics.history_a",
								value: {
									source: "diagnostic",
									path: "ab_learning/emea_samples_a"
								},
								target: {
									source: "diagnostic",
									path: "ab_learning/history_target"
								},
								digits: 0,
								visible_if: { "!=": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
							},
							{
								type: "progress",
								label_key: "metrics.history_b",
								value: {
									source: "diagnostic",
									path: "ab_learning/emea_samples_b"
								},
								target: {
									source: "diagnostic",
									path: "ab_learning/history_target"
								},
								digits: 0,
								visible_if: { "!=": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
							}
						]
					},
					{
						type: "metric_grid",
						title_key: "sections.learning.title",
						metrics: [
							{
								label_key: "metrics.accepted_a",
								source: "diagnostic",
								path: "ab_learning/accepted_updates_a",
								digits: 0
							},
							{
								label_key: "metrics.accepted_b",
								source: "diagnostic",
								path: "ab_learning/accepted_updates_b",
								digits: 0
							},
							{
								label_key: "metrics.bootstrap_status",
								source: "diagnostic",
								path: "ab_learning/bootstrap_status",
								visible_if: { "==": [{ var: "diagnostic/ab_learning/stage" }, "bootstrap"] }
							}
						]
					},
					{
						type: "status",
						label_key: "metrics.confidence",
						source: "diagnostic",
						path: "model/confidence",
						map: {
							ab_ok: {
								label_key: "status.confidence.ab_ok",
								description_key: "status.confidence.ab_ok.description",
								tone: "ok",
								icon: "mdi:check-circle-outline"
							},
							ab_bootstrap: {
								label_key: "status.confidence.ab_bootstrap",
								description_key: "status.confidence.ab_bootstrap.description",
								tone: "info",
								icon: "mdi:progress-clock"
							},
							ab_degraded: {
								label_key: "status.confidence.ab_degraded",
								description_key: "status.confidence.ab_degraded.description",
								tone: "warning",
								icon: "mdi:alert-outline"
							},
							ab_bad: {
								label_key: "status.confidence.ab_bad",
								description_key: "status.confidence.ab_bad.description",
								tone: "danger",
								icon: "mdi:alert-octagon-outline"
							}
						},
						fallback: {
							label_key: "status.confidence.unknown",
							description_key: "status.confidence.unknown.description",
							tone: "muted",
							icon: "mdi:help-circle-outline"
						}
					},
					{
						type: "section_note",
						text_key: "notes.learning",
						tone: "info",
						icon: "mdi:information-outline"
					}
				]
			},
			{
				id: "model",
				title_key: "sections.model.title",
				icon: "mdi:home-thermometer-outline",
				summary_key: "sections.model.summary",
				items: [
					{
						type: "hero_status",
						title_key: "hero.model.title",
						subtitle_key: "hero.model.subtitle",
						icon: "mdi:home-thermometer-outline",
						tone: "info"
					},
					{
						type: "status",
						label_key: "metrics.confidence",
						source: "diagnostic",
						path: "model/confidence",
						map: {
							ab_ok: {
								label_key: "status.confidence.ab_ok",
								description_key: "status.confidence.ab_ok.description",
								tone: "ok",
								icon: "mdi:check-circle-outline"
							},
							ab_bootstrap: {
								label_key: "status.confidence.ab_bootstrap",
								description_key: "status.confidence.ab_bootstrap.description",
								tone: "info",
								icon: "mdi:progress-clock"
							},
							ab_degraded: {
								label_key: "status.confidence.ab_degraded",
								description_key: "status.confidence.ab_degraded.description",
								tone: "warning",
								icon: "mdi:alert-outline"
							},
							ab_bad: {
								label_key: "status.confidence.ab_bad",
								description_key: "status.confidence.ab_bad.description",
								tone: "danger",
								icon: "mdi:alert-octagon-outline"
							}
						},
						fallback: {
							label_key: "status.confidence.unknown",
							description_key: "status.confidence.unknown.description",
							tone: "muted",
							icon: "mdi:help-circle-outline"
						}
					},
					{
						type: "metric_grid",
						columns: 1,
						metrics: [{
							label_key: "metrics.tau",
							source: "diagnostic",
							path: "model/tau_min",
							unit: "min",
							digits: 1
						}]
					},
					{
						type: "layout_grid",
						items: [
							{
								type: "metric_grid",
								columns: 2,
								metrics: [{
									label_key: "metrics.a",
									source: "diagnostic",
									path: "model/a",
									unit: "°C/min",
									digits: 4
								}, {
									label_key: "metrics.b",
									source: "diagnostic",
									path: "model/b",
									unit: "min⁻¹",
									digits: 4
								}]
							},
							{
								type: "metric_grid",
								columns: 2,
								metrics: [{
									label_key: "metrics.deadtime_heat",
									source: "diagnostic",
									path: "model/deadtime_heat_s",
									unit: "s",
									digits: 0
								}, {
									label_key: "metrics.deadtime_cool",
									source: "diagnostic",
									path: "model/deadtime_cool_s",
									unit: "s",
									digits: 0
								}]
							},
							{
								type: "layout_grid",
								min_width: 140,
								items: [{
									type: "status",
									label_key: "metrics.a_stability",
									source: "diagnostic",
									path: "model/a_stability_ratio",
									map: {},
									align: "center",
									ranges: [
										{
											max: .15,
											label_key: "status.coherence.coherent",
											tone: "ok",
											icon: "mdi:check-circle-outline"
										},
										{
											min: .150000001,
											max: .25,
											label_key: "status.coherence.watch",
											tone: "warning",
											icon: "mdi:alert-outline"
										},
										{
											min: .250000001,
											label_key: "status.coherence.dispersed",
											tone: "danger",
											icon: "mdi:alert-octagon-outline"
										}
									],
									fallback: {
										label_key: "status.coherence.collecting",
										tone: "muted",
										icon: "mdi:progress-clock"
									},
									show_value: !0,
									value_multiplier: 100,
									value_unit: "%",
									value_digits: 0
								}, {
									type: "status",
									label_key: "metrics.b_stability",
									source: "diagnostic",
									path: "model/b_stability_ratio",
									map: {},
									align: "center",
									ranges: [
										{
											max: .2,
											label_key: "status.coherence.coherent",
											tone: "ok",
											icon: "mdi:check-circle-outline"
										},
										{
											min: .200000001,
											max: .3,
											label_key: "status.coherence.acceptable",
											tone: "info",
											icon: "mdi:check-circle-outline"
										},
										{
											min: .300000001,
											max: .6,
											label_key: "status.coherence.unstable",
											tone: "warning",
											icon: "mdi:alert-outline"
										},
										{
											min: .600000001,
											label_key: "status.coherence.very_unstable",
											tone: "danger",
											icon: "mdi:alert-octagon-outline"
										}
									],
									fallback: {
										label_key: "status.coherence.collecting",
										tone: "muted",
										icon: "mdi:progress-clock"
									},
									show_value: !0,
									value_multiplier: 100,
									value_unit: "%",
									value_digits: 0
								}]
							}
						]
					},
					{
						type: "layout_grid",
						title_key: "metrics.reliability",
						items: [{
							type: "status",
							label_key: "metrics.tau_reliable",
							source: "diagnostic",
							path: "model/tau_reliable",
							align: "center",
							map: {
								true: {
									label_key: "status.reliability.true",
									tone: "ok",
									icon: "mdi:check-circle-outline"
								},
								false: {
									label_key: "status.reliability.false",
									tone: "warning",
									icon: "mdi:alert-outline"
								}
							},
							fallback: {
								label: "--",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						}, {
							type: "layout_grid",
							min_width: 140,
							items: [{
								type: "status",
								label_key: "metrics.deadtime_heat_reliable",
								source: "diagnostic",
								path: "model/deadtime_heat_reliable",
								align: "center",
								map: {
									true: {
										label_key: "status.reliability.true",
										tone: "ok",
										icon: "mdi:check-circle-outline"
									},
									false: {
										label_key: "status.reliability.false",
										tone: "warning",
										icon: "mdi:alert-outline"
									}
								},
								fallback: {
									label: "--",
									tone: "muted",
									icon: "mdi:help-circle-outline"
								}
							}, {
								type: "status",
								label_key: "metrics.deadtime_cool_reliable",
								source: "diagnostic",
								path: "model/deadtime_cool_reliable",
								align: "center",
								map: {
									true: {
										label_key: "status.reliability.true",
										tone: "ok",
										icon: "mdi:check-circle-outline"
									},
									false: {
										label_key: "status.reliability.false",
										tone: "warning",
										icon: "mdi:alert-outline"
									}
								},
								fallback: {
									label: "--",
									tone: "muted",
									icon: "mdi:help-circle-outline"
								}
							}]
						}]
					},
					{
						type: "history",
						title_key: "graphs.model.title",
						range: "24h",
						series: [{
							entity: "$diagnostic_entity",
							attribute: "model/a",
							label_key: "graphs.model.a",
							unit: "°C/min",
							scale_group: "coefficients"
						}, {
							entity: "$diagnostic_entity",
							attribute: "model/b",
							label_key: "graphs.model.b",
							unit: "min⁻¹",
							scale_group: "coefficients"
						}],
						options: {
							tooltip: !0,
							legend: !0,
							scales: !0,
							tools: !1,
							date_picker: !1,
							entity_picker: !1,
							range_picker: !1
						}
					}
				]
			},
			{
				id: "command",
				title_key: "sections.command.title",
				icon: "mdi:flash-outline",
				summary_key: "sections.command.summary",
				items: [
					{
						type: "hero_status",
						title_key: "hero.command.title",
						subtitle_key: "hero.command.subtitle",
						icon: "mdi:flash-outline",
						tone: "info"
					},
					{
						type: "layout_grid",
						items: [{
							type: "metric_grid",
							title_key: "sections.command.title",
							columns: 2,
							metrics: [
								{
									label_key: "metrics.current_cycle",
									source: "diagnostic",
									path: "power/current_cycle_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.next_cycle",
									source: "diagnostic",
									path: "power/next_cycle_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.command",
									source: "diagnostic",
									path: "power/command_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.limited",
									source: "diagnostic",
									path: "power/limited_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.applied",
									source: "diagnostic",
									path: "power/applied_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.saturation",
									source: "diagnostic",
									path: "control/saturation_state"
								}
							]
						}, {
							type: "metric_grid",
							title_key: "metrics.pi",
							columns: 2,
							metrics: [
								{
									label_key: "metrics.pi",
									source: "diagnostic",
									path: "power/pi_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.ff",
									source: "diagnostic",
									path: "power/ff_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.hold",
									source: "diagnostic",
									path: "power/hold_percent",
									unit: "%",
									digits: 0
								},
								{
									label_key: "metrics.integral_error",
									source: "diagnostic",
									path: "temperature/integral_error",
									digits: 3
								},
								{
									label_key: "metrics.kp",
									source: "diagnostic",
									path: "control/kp",
									digits: 3
								},
								{
									label_key: "metrics.ki",
									source: "diagnostic",
									path: "control/ki",
									digits: 4
								}
							]
						}]
					},
					{
						type: "history",
						title_key: "graphs.command.title",
						range: "12h",
						series: [
							{
								entity: "$diagnostic_entity",
								attribute: "power/applied_percent",
								label_key: "graphs.command.applied",
								unit: "%",
								scale_group: "power"
							},
							{
								entity: "$diagnostic_entity",
								attribute: "power/command_percent",
								label_key: "graphs.command.command",
								unit: "%",
								scale_group: "power"
							},
							{
								entity: "$diagnostic_entity",
								attribute: "power/pi_percent",
								label_key: "graphs.command.pi",
								unit: "%",
								scale_group: "power"
							},
							{
								entity: "$diagnostic_entity",
								attribute: "power/ff_percent",
								label_key: "graphs.command.ff",
								unit: "%",
								scale_group: "power"
							}
						],
						options: {
							tooltip: !0,
							legend: !0,
							scales: !0,
							tools: !1,
							date_picker: !1,
							entity_picker: !1,
							range_picker: !1
						}
					}
				]
			},
			{
				id: "health",
				title_key: "sections.health.title",
				icon: "mdi:shield-check-outline",
				summary_key: "sections.health.summary",
				items: [
					{
						type: "hero_status",
						title_key: "hero.health.title",
						subtitle_key: "hero.health.subtitle",
						icon: "mdi:shield-check-outline",
						tone: "info"
					},
					{
						type: "status",
						label_key: "metrics.governance",
						source: "diagnostic",
						path: "governance/regime",
						map: {
							warmup: {
								label_key: "status.regime.warmup",
								tone: "warning",
								icon: "mdi:timer-sand"
							},
							excited_stable: {
								label_key: "status.regime.excited_stable",
								tone: "ok",
								icon: "mdi:check-circle-outline"
							},
							near_band: {
								label_key: "status.regime.near_band",
								tone: "info",
								icon: "mdi:target"
							},
							dead_band: {
								label_key: "status.regime.dead_band",
								tone: "muted",
								icon: "mdi:pause-circle-outline"
							},
							hold: {
								label_key: "status.regime.hold",
								tone: "warning",
								icon: "mdi:hand-back-left-outline"
							},
							perturbed: {
								label_key: "status.regime.perturbed",
								tone: "warning",
								icon: "mdi:weather-windy"
							},
							degraded: {
								label_key: "status.regime.degraded",
								tone: "danger",
								icon: "mdi:alert-outline"
							},
							saturated: {
								label_key: "status.regime.saturated",
								tone: "warning",
								icon: "mdi:gauge-full"
							}
						},
						fallback: {
							label: "--",
							tone: "muted",
							icon: "mdi:help-circle-outline"
						}
					},
					{
						type: "layout_grid",
						items: [{
							type: "metric_grid",
							title_key: "sections.health.title",
							metrics: [
								{
									label_key: "metrics.thermal_decision",
									source: "diagnostic",
									path: "governance/thermal_update_decision"
								},
								{
									label_key: "metrics.thermal_reason",
									source: "diagnostic",
									path: "governance/thermal_update_reason"
								},
								{
									label_key: "metrics.in_deadband",
									source: "diagnostic",
									path: "control/in_deadband"
								},
								{
									label_key: "metrics.in_near_band",
									source: "diagnostic",
									path: "control/in_near_band"
								},
								{
									label_key: "metrics.in_deadtime",
									source: "diagnostic",
									path: "control/in_deadtime_window"
								},
								{
									label_key: "metrics.integral_hold",
									source: "diagnostic",
									path: "temperature/integral_hold_mode"
								}
							]
						}, {
							type: "metric_grid",
							title_key: "metrics.autocalib_state",
							metrics: [
								{
									label_key: "metrics.autocalib_state",
									source: "diagnostic",
									path: "autocalib/state"
								},
								{
									label_key: "metrics.autocalib_degraded",
									source: "diagnostic",
									path: "autocalib/model_degraded"
								},
								{
									label_key: "metrics.autocalib_snapshot_age",
									source: "diagnostic",
									path: "autocalib/snapshot_age_h",
									unit: "h",
									digits: 0
								},
								{
									label_key: "metrics.autocalib_next_check",
									source: "diagnostic",
									path: "autocalib/next_check_ts"
								},
								{
									label_key: "metrics.calibration_state",
									source: "diagnostic",
									path: "calibration/state"
								},
								{
									label_key: "metrics.calibration_retry",
									source: "diagnostic",
									path: "calibration/retry_count",
									digits: 0
								}
							]
						}]
					},
					{
						type: "layout_grid",
						min_width: 100,
						items: [
							{
								type: "action",
								label_key: "actions.reset_learning",
								icon: "mdi:school-outline",
								service: "vtherm_smartpi.reset_smartpi_learning",
								target: { entity_id: "$climate_entity" },
								confirmation: {
									enabled: !0,
									text_key: "actions.reset_learning.confirm"
								}
							},
							{
								type: "action",
								label_key: "actions.force_calibration",
								icon: "mdi:tune-variant",
								service: "vtherm_smartpi.force_smartpi_calibration",
								target: { entity_id: "$climate_entity" },
								confirmation: {
									enabled: !0,
									text_key: "actions.force_calibration.confirm"
								}
							},
							{
								type: "action",
								label_key: "actions.reset_integral",
								icon: "mdi:restart",
								service: "vtherm_smartpi.reset_smartpi_integral",
								target: { entity_id: "$climate_entity" },
								confirmation: {
									enabled: !0,
									text_key: "actions.reset_integral.confirm"
								}
							}
						]
					},
					{
						type: "section_note",
						text_key: "notes.hysteresis_phase",
						tone: "muted",
						icon: "mdi:information-outline"
					}
				]
			}
		]
	},
	hysteresis: {
		schema_version: 1,
		kind: "regulation-dashboard",
		algorithm: "hysteresis",
		title: "Hysteresis",
		translations: {
			fr: {
				"sections.main.title": "Synthese",
				"sections.main.summary": "Etat courant du controle hysteresis heat/cool.",
				"hero.title": "Regulation hysteresis",
				"hero.subtitle": "Le controleur active ou desactive la regulation selon le mode HVAC et les seuils calcules.",
				"groups.state": "Etat courant",
				"groups.temperatures": "Temperatures",
				"groups.thresholds": "Seuils",
				"groups.settings": "Configuration",
				"metrics.entity": "Entite climate",
				"metrics.state": "Etat",
				"metrics.current_temperature": "Temperature",
				"metrics.target_temperature": "Consigne",
				"metrics.hvac_action": "Action HVAC",
				"metrics.hvac_mode": "Mode HVAC",
				"metrics.active": "Commande",
				"metrics.on_percent": "Puissance demandee",
				"metrics.reason": "Decision",
				"metrics.activation_threshold": "Seuil activation",
				"metrics.deactivation_threshold": "Seuil desactivation",
				"metrics.hysteresis_on": "Ecart activation",
				"metrics.hysteresis_off": "Ecart desactivation",
				"metrics.max_on_percent": "Puissance active",
				"metrics.min_on_percent": "Puissance inactive",
				"status.active.true": "Active",
				"status.active.false": "Inactive",
				"status.mode.heat": "Chauffage",
				"status.mode.cool": "Refroidissement",
				"status.mode.off": "Arret",
				"status.mode.unknown": "Mode inconnu",
				"status.reason.below_activation_threshold": "Sous le seuil d'activation",
				"status.reason.above_activation_threshold": "Au-dessus du seuil d'activation",
				"status.reason.above_deactivation_threshold": "Au-dessus du seuil de desactivation",
				"status.reason.below_deactivation_threshold": "Sous le seuil de desactivation",
				"status.reason.hold_in_band": "Maintien dans la bande",
				"status.reason.hvac_off": "HVAC arrete",
				"status.reason.unsupported_hvac_mode": "Mode HVAC non supporte",
				"status.reason.missing_temperature": "Temperature manquante",
				"status.reason.idle": "En attente",
				"status.reason.unknown": "Decision inconnue",
				"status.power.inactive": "Inactive",
				"status.power.partial": "Partielle",
				"status.power.active": "Active",
				"notes.diagnostics": "Les diagnostics hysteresis sont publies par vtherm_hysteresis dans specific_states.hysteresis. Les valeurs absentes indiquent souvent une version plus ancienne ou un calcul pas encore execute."
			},
			en: {
				"sections.main.title": "Summary",
				"sections.main.summary": "Current state of the heat/cool hysteresis controller.",
				"hero.title": "Hysteresis regulation",
				"hero.subtitle": "The controller activates or deactivates regulation from the HVAC mode and computed thresholds.",
				"groups.state": "Current state",
				"groups.temperatures": "Temperatures",
				"groups.thresholds": "Thresholds",
				"groups.settings": "Configuration",
				"metrics.entity": "Climate entity",
				"metrics.state": "State",
				"metrics.current_temperature": "Temperature",
				"metrics.target_temperature": "Setpoint",
				"metrics.hvac_action": "HVAC action",
				"metrics.hvac_mode": "HVAC mode",
				"metrics.active": "Command",
				"metrics.on_percent": "Requested power",
				"metrics.reason": "Decision",
				"metrics.activation_threshold": "Activation threshold",
				"metrics.deactivation_threshold": "Deactivation threshold",
				"metrics.hysteresis_on": "Activation delta",
				"metrics.hysteresis_off": "Deactivation delta",
				"metrics.max_on_percent": "Active power",
				"metrics.min_on_percent": "Inactive power",
				"status.active.true": "Active",
				"status.active.false": "Inactive",
				"status.mode.heat": "Heat",
				"status.mode.cool": "Cool",
				"status.mode.off": "Off",
				"status.mode.unknown": "Unknown mode",
				"status.reason.below_activation_threshold": "Below activation threshold",
				"status.reason.above_activation_threshold": "Above activation threshold",
				"status.reason.above_deactivation_threshold": "Above deactivation threshold",
				"status.reason.below_deactivation_threshold": "Below deactivation threshold",
				"status.reason.hold_in_band": "Holding inside band",
				"status.reason.hvac_off": "HVAC off",
				"status.reason.unsupported_hvac_mode": "Unsupported HVAC mode",
				"status.reason.missing_temperature": "Missing temperature",
				"status.reason.idle": "Waiting",
				"status.reason.unknown": "Unknown decision",
				"status.power.inactive": "Inactive",
				"status.power.partial": "Partial",
				"status.power.active": "Active",
				"notes.diagnostics": "Hysteresis diagnostics are published by vtherm_hysteresis under specific_states.hysteresis. Missing values usually mean an older version or no control calculation has run yet."
			}
		},
		sections: [{
			id: "main",
			title_key: "sections.main.title",
			icon: "mdi:thermostat-auto",
			summary_key: "sections.main.summary",
			items: [
				{
					type: "hero_status",
					title_key: "hero.title",
					subtitle_key: "hero.subtitle",
					icon: "mdi:thermostat-auto",
					tone: "info"
				},
				{
					type: "layout_grid",
					min_width: 260,
					items: [
						{
							type: "status",
							label_key: "metrics.active",
							source: "climate",
							path: "specific_states/hysteresis/is_active",
							align: "center",
							map: {
								true: {
									label_key: "status.active.true",
									tone: "ok",
									icon: "mdi:power-plug"
								},
								false: {
									label_key: "status.active.false",
									tone: "muted",
									icon: "mdi:power-plug-off"
								}
							},
							fallback: {
								label_key: "status.active.false",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						},
						{
							type: "status",
							label_key: "metrics.hvac_mode",
							source: "climate",
							path: "specific_states/hysteresis/hvac_mode",
							align: "center",
							map: {
								heat: {
									label_key: "status.mode.heat",
									tone: "warning",
									icon: "mdi:fire"
								},
								cool: {
									label_key: "status.mode.cool",
									tone: "info",
									icon: "mdi:snowflake"
								},
								off: {
									label_key: "status.mode.off",
									tone: "muted",
									icon: "mdi:power"
								}
							},
							fallback: {
								label_key: "status.mode.unknown",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						},
						{
							type: "status",
							label_key: "metrics.on_percent",
							source: "climate",
							path: "specific_states/hysteresis/on_percent",
							align: "center",
							show_value: !0,
							value_multiplier: 100,
							value_unit: "%",
							value_digits: 0,
							map: {},
							ranges: [
								{
									max: 0,
									label_key: "status.power.inactive",
									tone: "muted",
									icon: "mdi:gauge-empty"
								},
								{
									min: 1e-6,
									max: .999999,
									label_key: "status.power.partial",
									tone: "warning",
									icon: "mdi:gauge"
								},
								{
									min: 1,
									label_key: "status.power.active",
									tone: "ok",
									icon: "mdi:gauge-full"
								}
							],
							fallback: {
								label_key: "status.power.inactive",
								tone: "muted",
								icon: "mdi:help-circle-outline"
							}
						}
					]
				},
				{
					type: "status",
					label_key: "metrics.reason",
					source: "climate",
					path: "specific_states/hysteresis/last_reason",
					map: {
						below_activation_threshold: {
							label_key: "status.reason.below_activation_threshold",
							tone: "ok",
							icon: "mdi:arrow-down-bold-circle-outline"
						},
						above_activation_threshold: {
							label_key: "status.reason.above_activation_threshold",
							tone: "ok",
							icon: "mdi:arrow-up-bold-circle-outline"
						},
						above_deactivation_threshold: {
							label_key: "status.reason.above_deactivation_threshold",
							tone: "muted",
							icon: "mdi:arrow-up-circle-outline"
						},
						below_deactivation_threshold: {
							label_key: "status.reason.below_deactivation_threshold",
							tone: "muted",
							icon: "mdi:arrow-down-circle-outline"
						},
						hold_in_band: {
							label_key: "status.reason.hold_in_band",
							tone: "info",
							icon: "mdi:pause-circle-outline"
						},
						hvac_off: {
							label_key: "status.reason.hvac_off",
							tone: "muted",
							icon: "mdi:power"
						},
						unsupported_hvac_mode: {
							label_key: "status.reason.unsupported_hvac_mode",
							tone: "warning",
							icon: "mdi:alert-circle-outline"
						},
						missing_temperature: {
							label_key: "status.reason.missing_temperature",
							tone: "warning",
							icon: "mdi:thermometer-alert"
						},
						idle: {
							label_key: "status.reason.idle",
							tone: "muted",
							icon: "mdi:clock-outline"
						}
					},
					fallback: {
						label_key: "status.reason.unknown",
						tone: "muted",
						icon: "mdi:help-circle-outline"
					}
				},
				{
					type: "layout_grid",
					min_width: 300,
					items: [
						{
							type: "metric_grid",
							title_key: "groups.temperatures",
							metrics: [
								{
									label_key: "metrics.current_temperature",
									source: "climate",
									path: "current_temperature",
									unit: "°",
									digits: 1
								},
								{
									label_key: "metrics.target_temperature",
									source: "climate",
									path: "temperature",
									unit: "°",
									digits: 1
								},
								{
									label_key: "metrics.state",
									source: "climate",
									path: "state"
								},
								{
									label_key: "metrics.hvac_action",
									source: "climate",
									path: "hvac_action"
								}
							]
						},
						{
							type: "metric_grid",
							title_key: "groups.thresholds",
							metrics: [
								{
									label_key: "metrics.activation_threshold",
									source: "climate",
									path: "specific_states/hysteresis/activation_threshold",
									unit: "°",
									digits: 2
								},
								{
									label_key: "metrics.deactivation_threshold",
									source: "climate",
									path: "specific_states/hysteresis/deactivation_threshold",
									unit: "°",
									digits: 2
								},
								{
									label_key: "metrics.hysteresis_on",
									source: "climate",
									path: "specific_states/hysteresis/hysteresis_on",
									unit: "°",
									digits: 2
								},
								{
									label_key: "metrics.hysteresis_off",
									source: "climate",
									path: "specific_states/hysteresis/hysteresis_off",
									unit: "°",
									digits: 2
								}
							]
						},
						{
							type: "metric_grid",
							title_key: "groups.settings",
							metrics: [
								{
									label_key: "metrics.entity",
									source: "config",
									path: "entity"
								},
								{
									label_key: "metrics.max_on_percent",
									source: "climate",
									path: "specific_states/hysteresis/max_on_percent",
									digits: 2
								},
								{
									label_key: "metrics.min_on_percent",
									source: "climate",
									path: "specific_states/hysteresis/min_on_percent",
									digits: 2
								}
							]
						}
					]
				},
				{
					type: "section_note",
					text_key: "notes.diagnostics",
					tone: "muted",
					icon: "mdi:information-outline"
				}
			]
		}]
	}
};
function Wo(e) {
	return Uo[e];
}
function Go(e) {
	return e in Uo;
}
//#endregion
//#region src/data/regulation-dashboard-loader.ts
var Ko = /* @__PURE__ */ new Map();
function qo(e) {
	if (!e.available) return Promise.resolve({
		status: "unavailable",
		reason: e.reason,
		algorithm: e.algorithm
	});
	let t = `${e.source}:${e.algorithm}`, n = Ko.get(t);
	if (n) return n;
	let r = e.source === "custom" ? Xo(e.algorithm) : Promise.resolve(Yo(e.algorithm));
	return Ko.set(t, r), r;
}
function Jo(e) {
	if (!Zo(e) || e.schema_version !== 1 || e.kind !== "regulation-dashboard" || !Array.isArray(e.sections) || e.sections.length === 0) return !1;
	let t = /* @__PURE__ */ new Set();
	return e.sections.every((e) => !Zo(e) || typeof e.id != "string" || !Qo(e.id) || !Array.isArray(e.items) || t.has(e.id) ? !1 : (t.add(e.id), e.items.every($o)));
}
function Yo(e) {
	let t = Wo(e);
	return t ? Jo(t) ? {
		status: "loaded",
		dashboard: t,
		algorithm: e
	} : {
		status: "error",
		reason: "invalid_dashboard",
		error: /* @__PURE__ */ Error("Invalid regulation dashboard"),
		algorithm: e
	} : (console.info("[equinox] Regulation dashboard not found", { algorithm: e }), {
		status: "unavailable",
		reason: "not_found",
		algorithm: e
	});
}
async function Xo(e) {
	try {
		window.EquinoxRegulationDashboard = void 0;
		let t = await import(
			/* @vite-ignore */
			"/local/equinox/dash/custom.js"
), n = t.default ?? t.dashboard ?? window.EquinoxRegulationDashboard;
		return Jo(n) ? {
			status: "loaded",
			dashboard: n,
			algorithm: e
		} : {
			status: "error",
			reason: "invalid_dashboard",
			error: /* @__PURE__ */ Error("Invalid custom regulation dashboard"),
			algorithm: e
		};
	} catch (t) {
		return {
			status: "error",
			reason: "load_failed",
			error: t,
			algorithm: e
		};
	}
}
function Zo(e) {
	return typeof e == "object" && !!e;
}
function Qo(e) {
	return /^[a-z0-9_-]+$/u.test(e);
}
function $o(e) {
	return !Zo(e) || typeof e.type != "string" ? !1 : e.type === "layout_grid" ? Array.isArray(e.items) && e.items.every($o) : [
		"hero_status",
		"value",
		"metric_grid",
		"status",
		"progress",
		"text",
		"section_note",
		"history",
		"action"
	].includes(e.type);
}
//#endregion
//#region src/data/regulation-dashboard-values.ts
var es = "specific_states/regulation_diagnostics";
function ts(e) {
	return typeof e == "string" && e.trim().length > 0 ? e.trim() : void 0;
}
function ns(e) {
	return e ? Array.isArray(e) ? e.map((e) => String(e)).filter((e) => e.length > 0) : e.split(/[/.]/u).map((e) => e.trim()).filter((e) => e.length > 0) : [];
}
function rs(e, t) {
	let n = ns(t), r = e;
	for (let e of n) {
		if (r == null) return;
		if (Array.isArray(r)) {
			let t = Number(e);
			if (!Number.isInteger(t) || t < 0 || t >= r.length) return;
			r = r[t];
			continue;
		}
		if (typeof r != "object") return;
		r = r[e];
	}
	return r;
}
function is(e) {
	return e == null || e === "" || e === "unknown" || e === "unavailable";
}
function as(e, t) {
	let n = e.states[t.entity]?.attributes;
	return ts(rs(n, es)) ?? ts(t.diagnostic_entity);
}
function os(e, t) {
	let n = as(e, t);
	return {
		climate: e.states[t.entity],
		diagnostic: n ? e.states[n] : void 0,
		power: t.power_entity ? e.states[t.power_entity] : void 0,
		humidity: t.humidity_entity ? e.states[t.humidity_entity] : void 0,
		temperature: t.temperature_entity ? e.states[t.temperature_entity] : void 0,
		config: t
	};
}
function ss(e, t) {
	return os(e.hass, e.config)[t];
}
function cs(e, t, n) {
	let r = ss(e, t);
	if (!r) return;
	if (t === "config") return rs(r, n);
	let i = ns(n);
	if (i.length === 0) return r;
	let a = i[0];
	if (a === "state" || a === "attributes" || a === "entity_id") return rs(r, i);
	let o = rs(r.attributes, i);
	return o === void 0 ? rs(r, i) : o;
}
//#endregion
//#region src/data/regulation-dashboard-resolver.ts
var ls = [
	"configuration/proportional_function",
	"vtherm_over_valve/function",
	"vtherm_over_climate_valve/valve_regulation/function",
	"vtherm_over_switch/function",
	"specific_states/proportional_function"
];
function us(e) {
	if (typeof e != "string") return;
	let t = e.trim().toLowerCase();
	if (!(!t || !/^[a-z0-9_-]+$/u.test(t))) return t;
}
function ds(e, t) {
	let n = e.states[t.entity]?.attributes;
	if (n) for (let e of ls) {
		let t = us(rs(n, e));
		if (t) return t;
	}
}
function fs(e, t) {
	let n = t.additional_dashboards ?? "auto";
	if (n === "disabled") return {
		available: !1,
		mode: n,
		reason: "disabled"
	};
	if (n === "custom") return {
		available: !0,
		mode: n,
		source: "custom",
		algorithm: ds(e, t) ?? ""
	};
	let r = ps(e, t), i = us(r);
	return i ? Go(i) ? {
		available: !0,
		mode: n,
		source: "builtin",
		algorithm: i
	} : {
		available: !1,
		mode: n,
		reason: "unsupported_algorithm",
		algorithm: i
	} : {
		available: !1,
		mode: n,
		reason: r === void 0 ? "missing_algorithm" : "invalid_algorithm",
		algorithm: typeof r == "string" ? r : void 0
	};
}
function ps(e, t) {
	let n = e.states[t.entity]?.attributes;
	if (n) for (let e of ls) {
		let t = rs(n, e);
		if (t != null && t !== "") return t;
	}
}
//#endregion
//#region src/styles/base.ts
var ms = o`
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
`, hs = o`
  :host {
    --equinox-card-bg: var(--ha-card-background, var(--card-background-color));
    --equinox-panel-bg: var(--equinox-flat-panel-bg, var(--secondary-background-color));
    --equinox-control-bg: var(--equinox-flat-control-bg, var(--secondary-background-color));
    --equinox-control-active-bg: var(--primary-color);
    --equinox-border-color: var(--equinox-flat-border-color, var(--divider-color));
    --equinox-text-color: var(--primary-text-color, #f4f0ec);
    --equinox-muted-color: var(--secondary-text-color, #aeb7c2);
    /* Climate mode palette — first choice is HA's --state-climate-{mode}-color
       so user themes flow through. The hyphen in --state-climate-heat-cool-color
       and the underscore in --state-climate-fan_only-color are quirks of the
       HA frontend authoring (see src/data/colors.ts comment). */
    --equinox-heat-color: var(--state-climate-heat-color, #ff8a1c);
    --equinox-cool-color: var(--state-climate-cool-color, #4da1ff);
    --equinox-heat-cool-color: var(--state-climate-heat-cool-color, #9b5cff);
    --equinox-dry-color: var(--state-climate-dry-color, #ff9800);
    --equinox-fan-only-color: var(--state-climate-fan_only-color, #00bcd4);
    --equinox-auto-color: var(--state-climate-auto-color, var(--success-color, #55bf6a));
    --equinox-cool-boost-color: var(--equinox-flat-cool-boost-color, #7cc7ff);
    --equinox-boost-color: var(--accent-color, #b06cff);
    --equinox-muted-tone-color: color-mix(in srgb, var(--state-icon-color, var(--secondary-text-color, #7e8792)) 70%, var(--secondary-text-color, #aeb7c2));
    --equinox-danger-color: var(--error-color, #ff5d5d);
    --equinox-warning-color: var(--warning-color, #ffa726);
    --equinox-info-color: var(--info-color, #64b5f6);
    /* Lock — semantics chosen for the thermostat use case (not HA's generic
       lock tokens). Locked = red so the color flags *why* setpoints can't be
       changed. Unlocked = the regular icon color so the common state stays
       visually quiet alongside the other status icons. */
    --equinox-lock-locked-color: var(--error-color, #ff5d5d);
    --equinox-lock-unlocked-color: var(--state-icon-color, var(--secondary-text-color, #aeb7c2));
    /* Preset palette — built from HA tokens via color-mix() so themes still flow through.
       HA has no preset_mode color tokens of its own (verified May 2026). */
    --equinox-preset-eco-color: color-mix(in srgb, var(--state-climate-auto-color, #4caf50) 85%, white);
    --equinox-preset-away-color: color-mix(in srgb, var(--state-icon-color, #44739e) 70%, var(--secondary-text-color, #aeb7c2));
    --equinox-preset-comfort-color: color-mix(in srgb, var(--state-climate-heat-color, #ff8a1c) 65%, white);
    --equinox-preset-home-color: var(--primary-color, #03a9f4);
    --equinox-preset-sleep-color: color-mix(in srgb, var(--accent-color, #b06cff) 70%, var(--state-climate-cool-color, #4da1ff));
    --equinox-preset-frost-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 65%, white);
    --equinox-preset-activity-color: var(--state-climate-auto-color, #55bf6a);
    /* Fan palette — graduated tint from cool token; focus/diffuse use accents. */
    --equinox-fan-off-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792));
    --equinox-fan-auto-color: var(--state-climate-auto-color, #55bf6a);
    --equinox-fan-low-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 55%, white);
    --equinox-fan-medium-color: color-mix(in srgb, var(--state-climate-cool-color, #4da1ff) 80%, white);
    --equinox-fan-high-color: var(--state-climate-cool-color, #4da1ff);
    --equinox-fan-focus-color: var(--primary-color, #03a9f4);
    --equinox-fan-diffuse-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, white);
    /* Swing palette — cyan/teal family. */
    --equinox-swing-off-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792));
    --equinox-swing-on-color: var(--state-climate-fan_only-color, #00bcd4);
    --equinox-swing-vertical-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, var(--primary-color, #03a9f4));
    --equinox-swing-horizontal-color: color-mix(in srgb, var(--state-climate-fan_only-color, #00bcd4) 80%, var(--accent-color, #b06cff));
    --equinox-swing-both-color: var(--accent-color, #b06cff);
    --equinox-radius: 8px;
    --equinox-control-radius: 8px;
    --equinox-shadow: var(--ha-card-box-shadow, 0 1px 2px rgb(0 0 0 / 34%));
  }

  :host([light]) {
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }
`, gs = o`
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

  :host([theme="liquid_glow"]) ha-card[tone="dry"] {
    --equinox-liquid-glow-color: var(--equinox-dry-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-dry-color) 24%, transparent);
  }

  :host([theme="liquid_glow"]) ha-card[tone="fan-only"] {
    --equinox-liquid-glow-color: var(--equinox-fan-only-color);
    --equinox-liquid-glow-soft: color-mix(in srgb, var(--equinox-fan-only-color) 24%, transparent);
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
    --control-button-background-color: var(--equinox-mode-control-bg);
    --control-button-icon-color: var(--equinox-mode-control-text);
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

  /* HA-aligned dry/fan_only tones + preset/fan/swing palettes. The active-tone
     CSS variable is set per attribute value, then a single generic rule below
     paints the button background and icon color from that variable. */
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle]            { --equinox-liquid-active-tone: var(--equinox-dry-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-only-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-eco"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-preset-eco-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-away"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-preset-away-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-comfort"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-preset-comfort-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-home"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-preset-home-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-sleep"][active][subtle]   { --equinox-liquid-active-tone: var(--equinox-preset-sleep-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-frost"][active][subtle]   { --equinox-liquid-active-tone: var(--equinox-preset-frost-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="preset-activity"][active][subtle]{ --equinox-liquid-active-tone: var(--equinox-preset-activity-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-auto"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-auto-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-low"][active][subtle]        { --equinox-liquid-active-tone: var(--equinox-fan-low-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-medium"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-fan-medium-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-high"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-fan-high-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-focus"][active][subtle]      { --equinox-liquid-active-tone: var(--equinox-fan-focus-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-diffuse"][active][subtle]    { --equinox-liquid-active-tone: var(--equinox-fan-diffuse-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-on"][active][subtle]       { --equinox-liquid-active-tone: var(--equinox-swing-on-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-vertical"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-swing-vertical-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-horizontal"][active][subtle] { --equinox-liquid-active-tone: var(--equinox-swing-horizontal-color); }
  :host([theme="liquid_glow"]) ha-control-button[tone="swing-both"][active][subtle]     { --equinox-liquid-active-tone: var(--equinox-swing-both-color); }

  /* Single generic paint rule for all new tones. Heat/cool/auto/heat-cool/boost/off
     keep their dedicated rules above (with explicit icon-color and background). */
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="preset-"],
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="fan-"]:not([tone="fan-off"]),
  :host([theme="liquid_glow"]) ha-control-button[active][subtle][tone^="swing-"]:not([tone="swing-off"]),
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle] {
    --control-button-icon-color: var(--equinox-liquid-active-tone);
    --control-button-background-color: color-mix(in srgb, var(--equinox-mode-control-bg) 78%, var(--equinox-liquid-active-tone) 22%);
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

  /* New tone group icons — set --eq-tone-color per attribute value, then
     paint background and color from that variable in one shared rule. */
  :host([theme="liquid_glow"]) .btn-icon[tone="dry"]                { --eq-tone-color: var(--equinox-dry-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-only"]           { --eq-tone-color: var(--equinox-fan-only-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="muted"]              { --eq-tone-color: var(--equinox-muted-tone-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-eco"]         { --eq-tone-color: var(--equinox-preset-eco-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-away"]        { --eq-tone-color: var(--equinox-preset-away-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-comfort"]     { --eq-tone-color: var(--equinox-preset-comfort-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-home"]        { --eq-tone-color: var(--equinox-preset-home-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-sleep"]       { --eq-tone-color: var(--equinox-preset-sleep-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-frost"]       { --eq-tone-color: var(--equinox-preset-frost-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="preset-activity"]    { --eq-tone-color: var(--equinox-preset-activity-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-auto"]           { --eq-tone-color: var(--equinox-fan-auto-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-low"]            { --eq-tone-color: var(--equinox-fan-low-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-medium"]         { --eq-tone-color: var(--equinox-fan-medium-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-high"]           { --eq-tone-color: var(--equinox-fan-high-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-focus"]          { --eq-tone-color: var(--equinox-fan-focus-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-diffuse"]        { --eq-tone-color: var(--equinox-fan-diffuse-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-on"]           { --eq-tone-color: var(--equinox-swing-on-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-vertical"]     { --eq-tone-color: var(--equinox-swing-vertical-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-horizontal"]   { --eq-tone-color: var(--equinox-swing-horizontal-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-both"]         { --eq-tone-color: var(--equinox-swing-both-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="lock-locked"]        { --eq-tone-color: var(--equinox-lock-locked-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="lock-unlocked"]      { --eq-tone-color: var(--equinox-lock-unlocked-color); }
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-off"],
  :host([theme="liquid_glow"]) .btn-icon[tone="swing-off"]          { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }

  :host([theme="liquid_glow"]) .btn-icon[tone^="preset-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="fan-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="swing-"],
  :host([theme="liquid_glow"]) .btn-icon[tone^="lock-"],
  :host([theme="liquid_glow"]) .btn-icon[tone="dry"],
  :host([theme="liquid_glow"]) .btn-icon[tone="fan-only"],
  :host([theme="liquid_glow"]) .btn-icon[tone="muted"] {
    background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    color: var(--eq-tone-color);
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

  /* Active state for new tone groups: icon inherits the per-tone color and
     drops its tinted background (active state already provides the glow). */
  :host([theme="liquid_glow"]) ha-control-button[tone^="preset-"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone^="fan-"]:not([tone="fan-off"])[active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone^="swing-"]:not([tone="swing-off"])[active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="dry"][active][subtle] .btn-icon,
  :host([theme="liquid_glow"]) ha-control-button[tone="fan-only"][active][subtle] .btn-icon {
    background: transparent;
    color: var(--equinox-liquid-active-tone);
  }
`, _s = class extends O {
	constructor(...e) {
		super(...e), this.open = !1, this.title = "", this.showBack = !1, this.floating = !1, this.centered = !1, this.closeOnLeave = !1, this._handleKeyDown = (e) => {
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
			headerActionIcon: { attribute: "header-action-icon" },
			headerActionLabel: { attribute: "header-action-label" },
			floating: { type: Boolean },
			centered: { type: Boolean },
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
      display: flex;
      flex-direction: column;
      min-height: 0;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
      color: var(--primary-text-color);
      border-radius: var(--equinox-radius, 12px);
      overflow: hidden;
    }

    .scrim.centered {
      position: fixed;
      inset: 0;
      border-radius: 0;
    }

    .panel.centered {
      position: fixed;
      inset: 50% auto auto 50%;
      width: var(--eq-dialog-width, min(920px, calc(100vw - 48px)));
      min-width: min(var(--eq-dialog-min-width, 360px), calc(100vw - 24px));
      max-width: calc(100vw - 24px);
      max-height: calc(100vh - 24px);
      transform: translate(-50%, -50%);
      overflow: hidden;
      border: 1px solid color-mix(in srgb, var(--equinox-border-color, var(--divider-color)) 70%, transparent);
      box-shadow: 0 18px 44px rgb(0 0 0 / 34%);
    }

    .panel.centered[popover] {
      margin: 0;
      padding: 0;
      color: var(--primary-text-color);
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
    }

    .panel.centered[popover]::backdrop {
      background: rgba(0, 0, 0, 0.45);
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

      .panel.popover[popover] {
        margin: 0;
        padding: 0;
        color: var(--primary-text-color);
      }

      .panel.popover[popover]::backdrop {
        background: transparent;
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

      .panel.centered {
        inset: 0;
        left: 0;
        right: auto;
        bottom: auto;
        top: 0;
        inset-inline: auto;
        width: 100vw;
        min-width: 0;
        max-width: 100vw;
        height: 100dvh;
        max-height: 100dvh;
        border-radius: 0;
        transform: none;
        border: 0;
        overflow: hidden;
      }
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 6px;
      flex: 0 0 auto;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 64%, transparent);
    }

    .header-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
    }

    @media (max-width: 600px) {
      .panel.centered .header {
        min-height: 48px;
        padding: max(6px, env(safe-area-inset-top)) 10px 6px;
      }

      .panel.centered .content {
        flex: 1 1 auto;
        padding: 12px max(12px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("keydown", this._handleKeyDown), window.addEventListener("resize", this._handleResize), window.addEventListener("scroll", this._handleScroll, !0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._clearCloseOnLeaveTimer(), this._disconnectPopoverResizeObserver(), document.removeEventListener("keydown", this._handleKeyDown), window.removeEventListener("resize", this._handleResize), window.removeEventListener("scroll", this._handleScroll, !0);
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
	_dispatchHeaderAction() {
		this.dispatchEvent(new CustomEvent("eq-dialog-header-action", {
			bubbles: !0,
			composed: !0
		}));
	}
	updated() {
		this.open || (this._clearCloseOnLeaveTimer(), this._disconnectPopoverResizeObserver()), this.open && (this.floating || this.centered) && this.updateComplete.then(() => {
			this._syncNativePopover(), this.floating && (this._observePopoverSize(), this._positionPopover());
		});
	}
	_disconnectPopoverResizeObserver() {
		this._popoverResizeObserver?.disconnect(), this._popoverResizeObserver = void 0, this._observedPopoverPanel = void 0;
	}
	_observePopoverSize() {
		if (typeof ResizeObserver > "u") return;
		if (window.innerWidth <= 600) {
			this._disconnectPopoverResizeObserver();
			return;
		}
		let e = this.renderRoot.querySelector(".panel.popover");
		!e || e === this._observedPopoverPanel || (this._disconnectPopoverResizeObserver(), this._observedPopoverPanel = e, this._popoverResizeObserver = new ResizeObserver(() => this._positionPopover()), this._popoverResizeObserver.observe(e));
	}
	_supportsNativePopover() {
		return typeof HTMLElement.prototype.showPopover == "function";
	}
	_usesNativePopover() {
		return this.open && this._supportsNativePopover() && (this.centered || this.floating && window.innerWidth > 600);
	}
	_syncNativePopover() {
		if (!this._usesNativePopover()) return;
		let e = this.renderRoot.querySelector(".panel[popover]");
		!e || e.matches(":popover-open") || e.showPopover();
	}
	_handlePopoverToggle(e) {
		e.newState === "closed" && this.open && this._dispatchClose();
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
		if (!this.open) return D;
		let e = V(this.language, "dialog.close"), t = V(this.language, "dialog.back"), n = this.headerActionLabel || t, r = this._usesNativePopover(), i = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "", a = [
			"panel",
			this.floating ? "popover" : "",
			this.centered ? "centered" : ""
		].filter(Boolean).join(" "), o = [
			"scrim",
			this.floating ? "popover" : "",
			this.centered ? "centered" : ""
		].filter(Boolean).join(" ");
		return T`
      ${r ? D : T`<div class=${o} @click=${this._dispatchClose}></div>`}
      <div
        class=${a}
        style=${i}
        popover=${r ? "auto" : D}
        @toggle=${r ? this._handlePopoverToggle : void 0}
        @click=${(e) => e.stopPropagation()}
        @mouseenter=${() => this._clearCloseOnLeaveTimer()}
        @mouseleave=${this.closeOnLeave ? () => this._scheduleCloseOnLeave() : void 0}
      >
        <div class="header">
          ${this.showBack ? T`
                <ha-icon-button class="back-btn" .label=${t} @click=${this._dispatchBack}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </ha-icon-button>
              ` : this.headerActionIcon ? T`
                <ha-icon-button class="back-btn" .label=${n} @click=${this._dispatchHeaderAction}>
                  <ha-icon icon=${this.headerActionIcon}></ha-icon>
                </ha-icon-button>
              ` : D}
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
customElements.get("eq-dialog") || customElements.define("eq-dialog", _s);
//#endregion
//#region src/components/eq-fan-dialog.ts
var vs = class extends O {
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

    /* Per-fan-mode palette — each value sets --eq-tone-color, picked up by the
       shared paint rule below and by the active-row :has() selector. */
    .fan-option-icon[tone="fan-auto"]    { --eq-tone-color: var(--equinox-fan-auto-color); }
    .fan-option-icon[tone="fan-off"]     { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
    .fan-option-icon[tone="fan-low"]     { --eq-tone-color: var(--equinox-fan-low-color); }
    .fan-option-icon[tone="fan-medium"]  { --eq-tone-color: var(--equinox-fan-medium-color); }
    .fan-option-icon[tone="fan-high"]    { --eq-tone-color: var(--equinox-fan-high-color); }
    .fan-option-icon[tone="fan-focus"]   { --eq-tone-color: var(--equinox-fan-focus-color); }
    .fan-option-icon[tone="fan-diffuse"] { --eq-tone-color: var(--equinox-fan-diffuse-color); }

    .fan-option-icon[tone^="fan-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    }

    .fan-option[active]:has(.fan-option-icon[tone="fan-auto"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-auto-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-low"])     { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-low-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-medium"])  { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-medium-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-high"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-high-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-focus"])   { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-focus-color) 22%); }
    .fan-option[active]:has(.fan-option-icon[tone="fan-diffuse"]) { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-diffuse-color) 22%); }

    /* List icon (mobile view) — same palette. */
    .option-icon[tone^="fan-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    }
    .option-icon[tone="fan-auto"]    { --eq-tone-color: var(--equinox-fan-auto-color); }
    .option-icon[tone="fan-off"]     { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
    .option-icon[tone="fan-low"]     { --eq-tone-color: var(--equinox-fan-low-color); }
    .option-icon[tone="fan-medium"]  { --eq-tone-color: var(--equinox-fan-medium-color); }
    .option-icon[tone="fan-high"]    { --eq-tone-color: var(--equinox-fan-high-color); }
    .option-icon[tone="fan-focus"]   { --eq-tone-color: var(--equinox-fan-focus-color); }
    .option-icon[tone="fan-diffuse"] { --eq-tone-color: var(--equinox-fan-diffuse-color); }

    /* Liquid-glow active tone follows the same per-mode color. */
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-auto"])    { --equinox-fan-active-tone: var(--equinox-fan-auto-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-low"])     { --equinox-fan-active-tone: var(--equinox-fan-low-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-medium"])  { --equinox-fan-active-tone: var(--equinox-fan-medium-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-high"])    { --equinox-fan-active-tone: var(--equinox-fan-high-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-focus"])   { --equinox-fan-active-tone: var(--equinox-fan-focus-color); }
    :host([theme="liquid_glow"]) .fan-option[active]:has(.fan-option-icon[tone="fan-diffuse"]) { --equinox-fan-active-tone: var(--equinox-fan-diffuse-color); }

    .fan-option[active] .fan-option-icon {
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
    }

    .fan-option[active] .fan-option-icon[tone^="fan-"] {
      background: color-mix(in srgb, var(--eq-tone-color) 18%, transparent);
      color: var(--eq-tone-color);
    }

    ha-md-list-item[active] .option-icon[tone^="fan-"] {
      background: color-mix(in srgb, var(--eq-tone-color) 18%, transparent);
      color: var(--eq-tone-color);
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
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? Ho : this.viewModel?.climate.fanModes ?? [];
	}
	_getActiveMode() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? this.viewModel.vt.fan.currentAutoFanMode : this.viewModel?.climate.fanMode;
	}
	_fanIcon(e) {
		return Vo[e] ?? "mdi:fan-speed-2";
	}
	_fanTone(e) {
		return Ro(e);
	}
	_fanLabel(e) {
		let t = V(this.language, `main.fan.${e}`);
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
		this.viewModel?.vt?.fan.hasAutoFan === !0 ? await Mo(t, e) : await Do(t, e), this._dispatchClose();
	}
	render() {
		let e = this._getOptions(), t = this._getActiveMode(), n = V(this.language, "dialog.fan.title");
		return T`
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
            ${e.map((e) => T`
                <button
                  class="fan-option"
                  ?active=${e === t}
                  @click=${() => this._selectMode(e)}
                  title=${this._fanLabel(e)}
                  aria-label=${this._fanLabel(e)}
                >
                  <span class="fan-option-icon" tone=${this._fanTone(e)}>
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
          ${e.map((e) => T`
              <ha-md-list-item
                type="button"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
              >
                <span class="option-icon" slot="start" tone=${this._fanTone(e)}>
                  <ha-icon .icon=${this._fanIcon(e)} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span>${this._fanLabel(e)}</span>
                ${e === t ? T`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : D}
              </ha-md-list-item>
            `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-fan-dialog") || customElements.define("eq-fan-dialog", vs);
//#endregion
//#region src/components/eq-hvac-dialog.ts
var ys = class extends O {
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

    .option-row[active]:has(.option-icon[tone="dry"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-dry-color, #ff9800) 22%);
    }

    .option-row[active]:has(.option-icon[tone="fan-only"]) {
      background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-fan-only-color, #00bcd4) 22%);
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

    :host([theme="liquid_glow"]) .option-icon[tone="dry"] {
      background: color-mix(in srgb, var(--equinox-dry-color, #ff9800) 15%, transparent);
    }

    :host([theme="liquid_glow"]) .option-icon[tone="fan-only"] {
      background: color-mix(in srgb, var(--equinox-fan-only-color, #00bcd4) 15%, transparent);
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

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="dry"]) {
      --equinox-option-active-tone: var(--equinox-dry-color, #ff9800);
    }

    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="fan-only"]) {
      --equinox-option-active-tone: var(--equinox-fan-only-color, #00bcd4);
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

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="dry"]) {
      --equinox-option-active-tone: var(--equinox-dry-color, #ff9800);
    }

    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="fan-only"]) {
      --equinox-option-active-tone: var(--equinox-fan-only-color, #00bcd4);
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

    /* HA-aligned dry and fan_only get their own palette entries. */
    .option-icon[tone="dry"] {
      color: var(--equinox-dry-color, #ff9800);
      background: color-mix(in srgb, var(--equinox-dry-color, #ff9800) 15%, transparent);
    }

    .option-icon[tone="fan-only"] {
      color: var(--equinox-fan-only-color, #00bcd4);
      background: color-mix(in srgb, var(--equinox-fan-only-color, #00bcd4) 15%, transparent);
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
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		let e = this.viewModel?.climate.hvacModes ?? [], t = new Set(this.config?.hidden_hvac_modes ?? []);
		return qa.filter((n) => e.includes(n) && Ja[n] && !t.has(n));
	}
	_modeLabel(e) {
		let t = V(this.language, `main.hvac.${e}`);
		return t === `main.hvac.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectMode(e) {
		!this.hass || !this.config || (await To({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.hvacMode, n = V(this.language, "dialog.hvac.title");
		return T`
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
          ${e.map((e) => T`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
                title=${this._modeLabel(e)}
                aria-label=${this._modeLabel(e)}
              >
                <span class="option-icon" tone=${Ya[e] ?? ""}>
                  <ha-icon .icon=${Ja[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._modeLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => T`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectMode(e)}>
                  <span class="option-icon" tone=${Ya[e] ?? ""} slot="start">
                    <ha-icon .icon=${Ja[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._modeLabel(e)}</span>
                  ${e === t ? T`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : D}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-hvac-dialog") || customElements.define("eq-hvac-dialog", ys);
//#endregion
//#region src/components/eq-swing-dialog.ts
function bs(e) {
	let t = [...new Set(e)], n = Za.filter((e) => t.includes(e)), r = t.filter((e) => !Za.includes(e));
	return [...n, ...r];
}
var xs = class extends O {
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

    /* Per-swing-mode palette — same --eq-tone-color pattern as fan dialog. */
    .swing-option-icon[tone="swing-off"],
    .option-icon[tone="swing-off"]        { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
    .swing-option-icon[tone="swing-on"],
    .option-icon[tone="swing-on"]         { --eq-tone-color: var(--equinox-swing-on-color); }
    .swing-option-icon[tone="swing-vertical"],
    .option-icon[tone="swing-vertical"]   { --eq-tone-color: var(--equinox-swing-vertical-color); }
    .swing-option-icon[tone="swing-horizontal"],
    .option-icon[tone="swing-horizontal"] { --eq-tone-color: var(--equinox-swing-horizontal-color); }
    .swing-option-icon[tone="swing-both"],
    .option-icon[tone="swing-both"]       { --eq-tone-color: var(--equinox-swing-both-color); }

    .swing-option-icon[tone^="swing-"],
    .option-icon[tone^="swing-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
    }

    .swing-option[active]:has(.swing-option-icon[tone="swing-on"])         { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-swing-on-color) 22%); }
    .swing-option[active]:has(.swing-option-icon[tone="swing-vertical"])   { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-swing-vertical-color) 22%); }
    .swing-option[active]:has(.swing-option-icon[tone="swing-horizontal"]) { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-swing-horizontal-color) 22%); }
    .swing-option[active]:has(.swing-option-icon[tone="swing-both"])       { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-swing-both-color) 22%); }

    /* Active rows keep their per-mode icon color (not primary-color). */
    .swing-option[active] .swing-option-icon[tone^="swing-"],
    ha-md-list-item[active] .option-icon[tone^="swing-"] {
      color: var(--eq-tone-color);
      background: color-mix(in srgb, var(--eq-tone-color) 18%, transparent);
    }

    :host([theme="liquid_glow"]) .swing-option[active]:has(.swing-option-icon[tone="swing-on"])         { --equinox-swing-active-tone: var(--equinox-swing-on-color); }
    :host([theme="liquid_glow"]) .swing-option[active]:has(.swing-option-icon[tone="swing-vertical"])   { --equinox-swing-active-tone: var(--equinox-swing-vertical-color); }
    :host([theme="liquid_glow"]) .swing-option[active]:has(.swing-option-icon[tone="swing-horizontal"]) { --equinox-swing-active-tone: var(--equinox-swing-horizontal-color); }
    :host([theme="liquid_glow"]) .swing-option[active]:has(.swing-option-icon[tone="swing-both"])       { --equinox-swing-active-tone: var(--equinox-swing-both-color); }

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
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_verticalOptions() {
		return bs(this.viewModel?.climate.swingModes ?? []);
	}
	_horizontalOptions() {
		return bs(this.viewModel?.climate.swingHorizontalModes ?? []);
	}
	_swingIcon(e, t = !1) {
		return t ? $a[e] ?? Qa[e] ?? "mdi:arrow-expand-horizontal" : Qa[e] ?? "mdi:arrow-oscillating";
	}
	_swingLabel(e) {
		let t = V(this.language, `main.swing.${e}`);
		return t === `main.swing.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectVerticalMode(e) {
		!this.hass || !this.config || (await Oo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	async _selectHorizontalMode(e) {
		!this.hass || !this.config || (await ko({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	_renderDesktopGroup(e, t, n, r) {
		return e.length === 0 ? D : T`
      <div class="swing-grid">
        ${e.map((e) => T`
            <button
              class="swing-option"
              ?active=${e === t}
              @click=${() => r(e)}
              title=${this._swingLabel(e)}
              aria-label=${this._swingLabel(e)}
            >
              <span class="swing-option-icon" tone=${zo(e)}>
                <ha-icon .icon=${this._swingIcon(e, n)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span class="swing-option-label">${this._swingLabel(e)}</span>
            </button>
          `)}
      </div>
    `;
	}
	_renderMobileGroup(e, t, n, r) {
		return e.length === 0 ? D : T`
      <ha-md-list class="swing-list">
        ${e.map((e) => T`
            <ha-md-list-item type="button" ?active=${e === t} @click=${() => r(e)}>
              <span class="option-icon" slot="start" tone=${zo(e)}>
                <ha-icon .icon=${this._swingIcon(e, n)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span>${this._swingLabel(e)}</span>
              ${e === t ? T`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : D}
            </ha-md-list-item>
          `)}
      </ha-md-list>
    `;
	}
	render() {
		let e = this._verticalOptions(), t = this._horizontalOptions(), n = e.length > 0 && t.length > 0, r = V(this.language, "dialog.swing.title");
		return T`
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
            ${e.length > 0 ? T`
                  <div class="group">
                    ${n ? T`<span class="group-title">${V(this.language, "dialog.swing.vertical")}</span>` : D}
                    ${this._renderDesktopGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : D}
            ${t.length > 0 ? T`
                  <div class="group">
                    ${n ? T`<span class="group-title">${V(this.language, "dialog.swing.horizontal")}</span>` : D}
                    ${this._renderDesktopGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : D}
          </div>
          <div class="swing-mobile">
            ${e.length > 0 ? T`
                  <div class="group">
                    ${n ? T`<span class="group-title">${V(this.language, "dialog.swing.vertical")}</span>` : D}
                    ${this._renderMobileGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : D}
            ${t.length > 0 ? T`
                  <div class="group">
                    ${n ? T`<span class="group-title">${V(this.language, "dialog.swing.horizontal")}</span>` : D}
                    ${this._renderMobileGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : D}
          </div>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-swing-dialog") || customElements.define("eq-swing-dialog", xs);
//#endregion
//#region src/components/eq-preset-dialog.ts
var Ss = class extends O {
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

    /* Per-preset tones — explicit per-tone rules. The active-row tint follows
       the same color via :has(). HA has no native preset color tokens; the
       --equinox-preset-* family is defined in src/styles/flat.ts. */
    .option-icon[tone="preset-eco"]      { color: var(--equinox-preset-eco-color);      background: color-mix(in srgb, var(--equinox-preset-eco-color) 15%, transparent); }
    .option-icon[tone="preset-away"]     { color: var(--equinox-preset-away-color);     background: color-mix(in srgb, var(--equinox-preset-away-color) 15%, transparent); }
    .option-icon[tone="preset-comfort"]  { color: var(--equinox-preset-comfort-color);  background: color-mix(in srgb, var(--equinox-preset-comfort-color) 15%, transparent); }
    .option-icon[tone="preset-home"]     { color: var(--equinox-preset-home-color);     background: color-mix(in srgb, var(--equinox-preset-home-color) 15%, transparent); }
    .option-icon[tone="preset-sleep"]    { color: var(--equinox-preset-sleep-color);    background: color-mix(in srgb, var(--equinox-preset-sleep-color) 15%, transparent); }
    .option-icon[tone="preset-frost"]    { color: var(--equinox-preset-frost-color);    background: color-mix(in srgb, var(--equinox-preset-frost-color) 15%, transparent); }
    .option-icon[tone="preset-activity"] { color: var(--equinox-preset-activity-color); background: color-mix(in srgb, var(--equinox-preset-activity-color) 15%, transparent); }

    .option-row[active]:has(.option-icon[tone="preset-eco"])      { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-eco-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-away"])     { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-away-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-comfort"])  { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-comfort-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-home"])     { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-home-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-sleep"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-sleep-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-frost"])    { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-frost-color) 22%); }
    .option-row[active]:has(.option-icon[tone="preset-activity"]) { background: color-mix(in srgb, var(--equinox-control-bg, #1c1c1c) 78%, var(--equinox-preset-activity-color) 22%); }

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

    /* Liquid-glow icon tints for new preset tones. */
    :host([theme="liquid_glow"]) .option-icon[tone="preset-eco"]      { background: color-mix(in srgb, var(--equinox-preset-eco-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-away"]     { background: color-mix(in srgb, var(--equinox-preset-away-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-comfort"]  { background: color-mix(in srgb, var(--equinox-preset-comfort-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-home"]     { background: color-mix(in srgb, var(--equinox-preset-home-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-sleep"]    { background: color-mix(in srgb, var(--equinox-preset-sleep-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-frost"]    { background: color-mix(in srgb, var(--equinox-preset-frost-color) 15%, transparent); }
    :host([theme="liquid_glow"]) .option-icon[tone="preset-activity"] { background: color-mix(in srgb, var(--equinox-preset-activity-color) 15%, transparent); }

    /* Liquid-glow active-tone propagation for new preset tones. */
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-eco"])      { --equinox-option-active-tone: var(--equinox-preset-eco-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-away"])     { --equinox-option-active-tone: var(--equinox-preset-away-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-comfort"])  { --equinox-option-active-tone: var(--equinox-preset-comfort-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-home"])     { --equinox-option-active-tone: var(--equinox-preset-home-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-sleep"])    { --equinox-option-active-tone: var(--equinox-preset-sleep-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-frost"])    { --equinox-option-active-tone: var(--equinox-preset-frost-color); }
    :host([theme="liquid_glow"]) .option-row[active]:has(.option-icon[tone="preset-activity"]) { --equinox-option-active-tone: var(--equinox-preset-activity-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-eco"])      { --equinox-option-active-tone: var(--equinox-preset-eco-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-away"])     { --equinox-option-active-tone: var(--equinox-preset-away-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-comfort"])  { --equinox-option-active-tone: var(--equinox-preset-comfort-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-home"])     { --equinox-option-active-tone: var(--equinox-preset-home-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-sleep"])    { --equinox-option-active-tone: var(--equinox-preset-sleep-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-frost"])    { --equinox-option-active-tone: var(--equinox-preset-frost-color); }
    :host([theme="liquid_glow"]) ha-md-list-item[active]:has(.option-icon[tone="preset-activity"]) { --equinox-option-active-tone: var(--equinox-preset-activity-color); }

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
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	_getOptions() {
		let e = this.viewModel?.climate.presetModes ?? [], t = this.viewModel?.climate.hvacMode, n = new Set(this.config?.hidden_preset_modes ?? []);
		return Xa.filter((r) => e.includes(r) && B[r] && r !== "none" && !(r === "frost" && t !== "heat") && !n.has(r));
	}
	_presetLabel(e) {
		let t = V(this.language, `main.preset.${e}`);
		return t === `main.preset.${e}` ? e : t;
	}
	_presetTone(e) {
		return Lo(e, this.viewModel?.climate.hvacMode);
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectPreset(e) {
		!this.hass || !this.config || (await Eo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.presetMode, n = V(this.language, "dialog.preset.title");
		return T`
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
          ${e.map((e) => T`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectPreset(e)}
                title=${this._presetLabel(e)}
                aria-label=${this._presetLabel(e)}
              >
                <span class="option-icon" tone=${this._presetTone(e)}>
                  <ha-icon .icon=${B[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._presetLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => T`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectPreset(e)}>
                  <span class="option-icon" tone=${this._presetTone(e)} slot="start">
                    <ha-icon .icon=${B[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${this._presetLabel(e)}</span>
                  ${e === t ? T`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : D}
                </ha-md-list-item>
              `)}
          </ha-md-list>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-preset-dialog") || customElements.define("eq-preset-dialog", Ss);
//#endregion
//#region src/components/eq-menu-dialog.ts
var Cs = class extends O {
	constructor(...e) {
		super(...e), this.open = !1, this.regulationAvailable = !1, this.floating = !1, this.closeOnLeave = !1;
	}
	static {
		this.properties = {
			open: { type: Boolean },
			hass: { attribute: !1 },
			viewModel: { attribute: !1 },
			config: { attribute: !1 },
			regulationDashboard: { attribute: !1 },
			regulationAvailable: {
				type: Boolean,
				attribute: "regulation-available"
			},
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
	_dispatchAndClose(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			detail: t,
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
		return this.config?.additional_dashboards !== "disabled" && this.regulationAvailable;
	}
	_showBoost() {
		return this.viewModel?.vt?.timedPreset.isActive === !0 || !!this.viewModel?.vt?.timedPresetManager;
	}
	render() {
		let e = this._showRegulation(), t = this._showBoost(), n = this.viewModel?.vt?.timedPreset.isActive === !0, r = this.viewModel?.vt?.timedPreset.remainingTimeMin, i = V(this.language, "dialog.menu.title");
		return T`
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
          ${e ? T`
                <ha-md-list-item type="button" @click=${() => this._openRegulationMenuEntry()}>
                  <span class="option-icon" slot="start">
                    <ha-icon icon="mdi:chart-line" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${V(this.language, "dialog.menu.regulation")}</span>
                  <span class="option-trailing" slot="end">
                    <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
                  </span>
                </ha-md-list-item>
              ` : D}

          ${t ? T`
                <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-boost")}>
                  <span class="option-icon" tone=${n ? "boost" : ""} slot="start">
                    <ha-icon icon="mdi:timer-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                  </span>
                  <span>${V(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing" slot="end">
                    ${n && typeof r == "number" ? T`<span class="boost-time">${r} min</span>` : T`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </ha-md-list-item>
              ` : D}

          <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon" slot="start">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${V(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing" slot="end">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </ha-md-list-item>
        </ha-md-list>
      </eq-dialog>
    `;
	}
	_openRegulationMenuEntry() {
		let e = this.regulationDashboard?.sections ?? [];
		this._dispatchAndClose("equinox-open-regulation", e.length > 0 ? { sectionId: e[0].id } : void 0);
	}
};
customElements.get("eq-menu-dialog") || customElements.define("eq-menu-dialog", Cs);
//#endregion
//#region src/components/eq-boost-dialog.ts
var ws = 60, Ts = [
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
], Es = class extends O {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1, this._durationMinutes = ws;
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
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
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
		Ts.includes(e) && (this._durationMinutes = e);
	}
	_onDurationChange(e) {
		let t = Number(e.detail.value);
		Number.isFinite(t) && this._setDuration(Ts[Math.round(t)] ?? ws);
	}
	async _startBoost() {
		if (!this.hass || !this.config) return;
		let e = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		(this._hasTimedPreset() ? await Ao(e, "boost", this._durationMinutes) : await Eo(e, "boost")).ok && this._dispatchClose();
	}
	async _stopBoost() {
		!this.hass || !this.config || (await jo({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		})).ok && this._dispatchClose();
	}
	_durationIndex(e) {
		let t = Ts.indexOf(e);
		return t >= 0 ? t : Ts.reduce((t, n, r) => Math.abs(n - e) < Math.abs(Ts[t] - e) ? r : t, 0);
	}
	_formatDuration(e) {
		if (e < 60) return {
			value: `${e}${V(this.language, "dialog.boost.minutes")}`,
			unit: ""
		};
		if (e % 60 == 0) return {
			value: `${e / 60}${V(this.language, "dialog.boost.hours")}`,
			unit: ""
		};
		let t = Math.floor(e / 60), n = e % 60;
		return {
			value: `${t}${V(this.language, "dialog.boost.hours")}${n}`,
			unit: ""
		};
	}
	render() {
		let e = V(this.language, "dialog.boost.title"), t = this.viewModel?.vt?.timedPreset, n = t?.isActive === !0, r = this._isDisabled(), i = this._hasTimedPreset(), a = n && typeof t?.remainingTimeMin == "number" ? t.remainingTimeMin : this._durationMinutes, o = this._formatDuration(a);
		return T`
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
          ${i ? T`
                <div class="boost-wheel-shell">
                  <ha-control-circular-slider
                    class="boost-wheel"
                    .mode=${"start"}
                    .min=${0}
                    .max=${Ts.length - 1}
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
              ` : D}
          <button class="action-button" ?disabled=${r || n && !i} @click=${n ? this._stopBoost : this._startBoost}>
            <ha-icon aria-hidden="true" .icon=${n ? "mdi:timer-off-outline" : "mdi:rocket-launch-outline"}></ha-icon>
            <span class="action-label">${V(this.language, n ? "dialog.boost.stop" : "dialog.boost.start")}</span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-boost-dialog") || customElements.define("eq-boost-dialog", Es);
var Ds = {
	ema_temp: "temperature",
	on_percent: "%",
	power_percent: "%",
	valve_open_percent: "%",
	"ab_learning.bootstrap_progress_percent": "%",
	"auto_start_stop_manager.auto_start_stop_dtmin": "min",
	"autocalib.snapshot_age_h": "h",
	"configuration.cycle_min": "min",
	"configuration.minimal_activation_delay_sec": "s",
	"configuration.minimal_deactivation_delay_sec": "s",
	"control.ki": "coeff",
	"control.kp": "coeff",
	"heating_failure_detection_manager.cooling_tracking.current_temperature": "temperature",
	"heating_failure_detection_manager.cooling_tracking.elapsed_time_min": "min",
	"heating_failure_detection_manager.cooling_tracking.initial_temperature": "temperature",
	"heating_failure_detection_manager.cooling_tracking.remaining_time_min": "min",
	"heating_failure_detection_manager.detection_delay_min": "min",
	"heating_failure_detection_manager.heating_tracking.current_temperature": "temperature",
	"heating_failure_detection_manager.heating_tracking.elapsed_time_min": "min",
	"heating_failure_detection_manager.heating_tracking.initial_temperature": "temperature",
	"heating_failure_detection_manager.heating_tracking.remaining_time_min": "min",
	"heating_failure_detection_manager.temperature_change_tolerance": "temperature",
	"lock_manager.auto_relock_sec": "s",
	"model.a": "coeff",
	"model.b": "coeff",
	"model.a_stability_ratio": "ratio",
	"model.b_stability_ratio": "ratio",
	"model.deadtime_cool_s": "s",
	"model.deadtime_heat_s": "s",
	"model.tau_min": "min",
	"motion_manager.motion_delay_sec": "s",
	"motion_manager.motion_off_delay_sec": "s",
	"power_manager.device_power": "W",
	"power_manager.mean_cycle_power": "W",
	"power.applied_percent": "%",
	"power.command_percent": "%",
	"power.current_cycle_percent": "%",
	"power.ff_percent": "%",
	"power.hold_percent": "%",
	"power.limited_percent": "%",
	"power.linear_current_cycle_percent": "%",
	"power.linear_next_cycle_percent": "%",
	"power.next_cycle_percent": "%",
	"power.pi_percent": "%",
	"preset_temperatures.boost_away_temp": "temperature",
	"preset_temperatures.boost_temp": "temperature",
	"preset_temperatures.comfort_away_temp": "temperature",
	"preset_temperatures.comfort_temp": "temperature",
	"preset_temperatures.eco_away_temp": "temperature",
	"preset_temperatures.eco_temp": "temperature",
	"preset_temperatures.frost_away_temp": "temperature",
	"preset_temperatures.frost_temp": "temperature",
	"safety_manager.safety_delay_min": "min",
	"setpoint.filtered_setpoint": "temperature",
	"specific_states.ema_temp": "temperature",
	"specific_states.ext_current_temperature": "temperature",
	"temperature.error": "temperature",
	"temperature.ext_sensor": "temperature",
	"temperature.sensor": "temperature",
	"timed_preset_manager.remaining_time_min": "min",
	"vtherm_over_climate.regulation.regulated_target_temperature": "temperature",
	"vtherm_over_climate.regulation.regulation_accumulated_error": "temperature",
	"vtherm_over_switch.keep_alive_sec": "s",
	"vtherm_over_switch.off_time_sec": "s",
	"vtherm_over_switch.on_time_sec": "s",
	"vtherm_over_switch.power_percent": "%",
	"vtherm_over_switch.tpi_coef_ext": "coeff",
	"vtherm_over_switch.tpi_coef_int": "coeff",
	"vtherm_over_switch.tpi_threshold_high": "temperature",
	"vtherm_over_switch.tpi_threshold_low": "temperature",
	"vtherm_over_valve.auto_regulation_dpercent": "%",
	"vtherm_over_valve.auto_regulation_period_min": "min",
	"vtherm_over_valve.tpi_coef_ext": "coeff",
	"vtherm_over_valve.tpi_coef_int": "coeff",
	"vtherm_over_valve.tpi_threshold_high": "temperature",
	"vtherm_over_valve.tpi_threshold_low": "temperature",
	"vtherm_over_valve.valve_open_percent": "%",
	"window_manager.window_auto_max_duration": "min",
	"window_manager.window_delay_sec": "s",
	"window_manager.window_off_delay_sec": "s"
}, Os = {};
function ks(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return Os;
	let t = {};
	for (let [n, r] of Object.entries(e)) n !== "" && typeof r == "string" && r !== "" && (t[n] = r);
	return t;
}
var As = ks(Ds);
function js() {
	return Promise.resolve(As);
}
function Ms(e) {
	return e ?? Os;
}
//#endregion
//#region src/components/eq-history-dialog.ts
var Ns = class extends O {
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
	willUpdate(e) {
		e.has("open") && this.open && this._resetOpenState();
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
	_resetOpenState() {
		this._fullscreen = !1, this._controlsVisible = !0, this._toolsOpen = !1, this._historyPickerOverlayOpen = !1, this._suppressNextDialogClose = !1, this._suppressCloseTimer !== void 0 && (clearTimeout(this._suppressCloseTimer), this._suppressCloseTimer = void 0);
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
		this._attributeUnitsLoadStarted || (this._attributeUnitsLoadStarted = !0, js().then((e) => {
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
		let e = this.config?.entity, t = this.language ?? this.hass?.locale?.language, n = this.config && this.hass ? as(this.hass, this.config) : void 0, r = `${e ?? ""}|${t ?? ""}|${n ?? ""}|${this.config?.power_entity ?? ""}|${this.config?.humidity_entity ?? ""}|${this.config?.temperature_entity ?? ""}`;
		if (r === this._configCacheKey && this._configCache) return this._configCache;
		this._configCacheKey = r;
		let i = [
			e,
			n,
			this.config?.power_entity,
			this.config?.humidity_entity,
			this.config?.temperature_entity
		].filter((e) => typeof e == "string" && e !== ""), a = [];
		return e && a.push({ entity: e }), this.config?.temperature_entity && a.push({
			entity: this.config.temperature_entity,
			scaleGroup: "temperature"
		}), this._configCache = {
			showDatePicker: !0,
			showEntityPicker: !0,
			showLegend: !0,
			showTooltip: !0,
			debugPerformance: !1,
			defaultEntities: i,
			series: a
		}, this._configCache;
	}
	render() {
		return T`
      <ha-dialog
        .open=${this.open}
        .headerTitle=${this.hass?.states[this.config?.entity ?? ""]?.attributes?.friendly_name ?? this.config?.entity ?? V(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._handleDialogClosed(e)}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-tools-btn"
          .label=${V(this.language, "dialog.history.tools")}
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
          .label=${V(this.language, this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls")}
          @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
        >
          <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          .label=${V(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </ha-icon-button>
        ${this.open ? T`<equinox-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .attributeUnits=${Ms(this._staticAttributeUnits)}
              .language=${this.language}
              .showControls=${this._controlsVisible}
              .toolsOpen=${this._toolsOpen}
              @picker-overlay-changed=${(e) => this._onHistoryPickerOverlayChanged(e)}
              class="history"
            ></equinox-better-history>` : D}
      </ha-dialog>
    `;
	}
};
customElements.get("eq-history-dialog") || customElements.define("eq-history-dialog", Ns);
//#endregion
//#region src/data/regulation-dashboard-i18n.ts
function Ps(e) {
	return (e?.trim().toLowerCase().replace("_", "-"))?.split("-")[0] || "en";
}
function Fs(e, t, n, r) {
	if (!n) return r ?? "";
	let i = Ps(t), a = e.translations;
	return a?.[i]?.[n] ?? a?.en?.[n] ?? r ?? n;
}
//#endregion
//#region src/components/eq-regulation-renderer.ts
var Is = "--", Ls = new Set([
	"vtherm_smartpi.reset_smartpi_learning",
	"vtherm_smartpi.force_smartpi_calibration",
	"vtherm_smartpi.reset_smartpi_integral"
]), Rs = class extends O {
	constructor(...e) {
		super(...e), this._attributeUnitsLoadStarted = !1, this._historyConfigCache = /* @__PURE__ */ new Map();
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { attribute: !1 },
			viewModel: { attribute: !1 },
			dashboard: { attribute: !1 },
			activeSectionId: { attribute: "active-section-id" },
			language: {},
			_actionError: { state: !0 },
			_actionPending: { state: !0 },
			_staticAttributeUnits: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    .state {
      display: grid;
      gap: 8px;
      padding: 18px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }

    .section {
      display: grid;
      gap: 10px;
      min-width: 0;
    }

    .section-header {
      display: grid;
      gap: 4px;
      padding-block-end: 2px;
    }

    h2,
    h3,
    p {
      margin: 0;
    }

    h2 {
      font-size: 18px;
      line-height: 1.25;
      font-weight: 650;
    }

    h3 {
      font-size: 14px;
      line-height: 1.3;
      font-weight: 650;
    }

    .summary,
    .description,
    .text,
    .missing,
    .meta {
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.4;
    }

    .hero,
    .block,
    .note {
      border: 1px solid color-mix(in srgb, var(--divider-color) 78%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 88%, var(--primary-text-color) 4%);
    }

    .hero {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px;
      align-items: center;
      padding: 12px;
    }

    .hero ha-icon,
    .note ha-icon,
    .status ha-icon {
      color: var(--regulation-tone-color, var(--secondary-text-color));
    }

    .hero-content {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .block {
      display: grid;
      gap: 6px;
      padding: 10px;
      min-width: 0;
    }

    .value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    .label {
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.25;
    }

    .value {
      min-width: 0;
      overflow-wrap: anywhere;
      text-align: end;
      font-size: 17px;
      line-height: 1.15;
      font-weight: 650;
      color: var(--primary-text-color);
    }

    .metric-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }

    .metric-grid.grid-layout {
      display: grid !important;
      gap: 8px;
      justify-content: stretch;
      width: 100%;
    }

    .metric {
      display: grid;
      gap: 4px;
      justify-items: center;
      text-align: center;
      min-width: 0;
      flex: 1 1 128px;
      max-width: 180px;
      padding: 8px 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }

    .metric-grid.grid-layout .metric {
      flex: none !important;
      max-width: none !important;
    }

    .metric .value {
      text-align: center;
      font-size: 16px;
    }

    .status {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: start;
    }

    .status.center {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
    }

    .status.center > div {
      display: grid;
      justify-items: center;
      gap: 4px;
    }

    .status-pill {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--regulation-tone-color, var(--secondary-text-color)) 16%, transparent);
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
    }

    .progress-line {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      color: var(--secondary-text-color);
      font-size: 11px;
    }

    .progress-track {
      height: 6px;
      overflow: hidden;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }

    .progress-fill {
      width: var(--progress, 0%);
      height: 100%;
      border-radius: inherit;
      background: var(--regulation-tone-color, var(--primary-color));
    }

    .note {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: start;
      padding: 8px 10px;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--grid-min-width, 240px)), 1fr));
      gap: 10px;
    }

    .layout-section {
      display: grid;
      gap: 8px;
      min-width: 0;
    }

    .layout-section > h3 {
      padding-inline: 2px;
    }

    .text {
      white-space: pre-line;
    }

    .history-block {
      display: grid;
      gap: 10px;
      min-width: 0;
      padding: 12px;
      border: 1px solid color-mix(in srgb, var(--divider-color) 78%, transparent);
      border-radius: 8px;
      background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 88%, var(--primary-text-color) 4%);
    }

    .history-chart {
      display: flex;
      width: 100%;
      min-width: 0;
      height: min(360px, 46vh);
      min-height: 260px;
      --better-history-min-height: 0px;
      --better-history-surface-overflow-y: visible;
      --better-history-surface-header-offset: 4px;
    }

    .action-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 8px;
      padding: 10px 6px;
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 52%, var(--divider-color));
      background: color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 16%, transparent);
      color: var(--regulation-tone-color, var(--primary-text-color));
      cursor: pointer;
      transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
    }

    .action-button:hover:not(:disabled) {
      background: color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 28%, transparent);
      transform: scale(1.06);
      box-shadow: 0 0 8px color-mix(in srgb, var(--regulation-tone-color, var(--primary-color)) 30%, transparent);
    }

    .action-button:active:not(:disabled) {
      transform: scale(0.94);
    }

    .action-button:disabled {
      cursor: default;
      opacity: 0.45;
    }

    .action-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .action-button ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-label {
      font-size: 11px;
      font-weight: 550;
      line-height: 1.25;
      color: var(--primary-text-color);
      max-width: 100%;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 600px) {
      .history-chart {
        height: min(320px, 42vh);
        min-height: 240px;
      }
    }

    [tone="ok"] {
      --regulation-tone-color: var(--success-color, #43a047);
    }

    [tone="info"] {
      --regulation-tone-color: var(--info-color, var(--primary-color));
    }

    [tone="warning"] {
      --regulation-tone-color: var(--warning-color, #f9a825);
    }

    [tone="danger"] {
      --regulation-tone-color: var(--error-color, #db4437);
    }

    [tone="muted"] {
      --regulation-tone-color: var(--secondary-text-color);
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback(), this._loadAttributeUnits();
	}
	_loadAttributeUnits() {
		this._attributeUnitsLoadStarted || (this._attributeUnitsLoadStarted = !0, js().then((e) => {
			this._staticAttributeUnits = e, this.requestUpdate();
		}));
	}
	render() {
		if (!this.hass || !this.config || !this.dashboard) return this._renderState(V(this.language, "dialog.regulation.loading"));
		let e = this._activeSection();
		return e ? T`
      <section class="section" aria-labelledby="regulation-section-title">
        <div class="section-header">
          <h2 id="regulation-section-title">${this._sectionTitle(e)}</h2>
          ${this._sectionSummary(e) ? T`<p class="summary">${this._sectionSummary(e)}</p>` : D}
        </div>
        ${e.items.length > 0 ? e.items.map((e) => this._renderItem(e)) : this._renderState(V(this.language, "dialog.regulation.empty_section"))}
      </section>
    ` : this._renderState(V(this.language, "dialog.regulation.section_missing"));
	}
	_renderState(e) {
		return T`<div class="state" role="status">${e}</div>`;
	}
	_activeSection() {
		return this.dashboard?.sections.find((e) => e.id === this.activeSectionId) ?? this.dashboard?.sections[0];
	}
	_context() {
		return {
			hass: this.hass,
			config: this.config
		};
	}
	_sectionTitle(e) {
		return this._translate(e.title_key, e.title || e.id);
	}
	_sectionSummary(e) {
		return this._translate(e.summary_key, e.summary);
	}
	_translate(e, t) {
		return this.dashboard ? Fs(this.dashboard, this.language, e, t) : t ?? "";
	}
	_renderItem(e) {
		if (!this._conditionMatches(e.visible_if)) return D;
		switch (e.type) {
			case "hero_status": return T`
          <article class="hero" tone=${e.tone ?? "info"}>
            ${e.icon ? T`<ha-icon icon=${e.icon}></ha-icon>` : T`<ha-icon icon="mdi:information-outline"></ha-icon>`}
            <div class="hero-content">
              <h3>${this._translate(e.title_key, e.title)}</h3>
              ${this._translate(e.subtitle_key, e.subtitle) ? T`<p class="description">${this._translate(e.subtitle_key, e.subtitle)}</p>` : D}
            </div>
          </article>
        `;
			case "value": return this._renderValue(e);
			case "metric_grid": return this._renderMetricGrid(e);
			case "status": return this._renderStatus(e);
			case "progress": return this._renderProgress(e);
			case "text": return T`<article class="block"><p class="text">${this._translate(e.text_key, e.text)}</p></article>`;
			case "section_note": return T`
          <aside class="note" tone=${e.tone ?? "muted"}>
            ${e.icon ? T`<ha-icon icon=${e.icon}></ha-icon>` : T`<ha-icon icon="mdi:note-text-outline"></ha-icon>`}
            <p class="text">${this._translate(e.text_key, e.text)}</p>
          </aside>
        `;
			case "history": return this._renderHistory(e);
			case "action": return this._renderAction(e);
			case "layout_grid": {
				let t = this._translate(e.title_key, e.title), n = T`
          <div
            class="layout-grid"
            style=${e.min_width ? `--grid-min-width: ${e.min_width}px;` : D}
          >
            ${e.items.map((e) => this._renderItem(e))}
          </div>
        `;
				return t ? T`<section class="layout-section"><h3>${t}</h3>${n}</section>` : n;
			}
			default: return D;
		}
	}
	_renderValue(e) {
		let t = this._sourceMissing(e.source);
		return T`
      <article class="block" tone=${this._toneForValue(e)}>
        <div class="value-row">
          <span class="label">${this._translate(e.label_key, e.label)}</span>
          <span class="value">${this._formatSourceValue(e)}</span>
        </div>
        ${t ? T`<p class="missing">${V(this.language, "dialog.regulation.source_missing")}</p>` : D}
      </article>
    `;
	}
	_renderMetricGrid(e) {
		let t = e.metrics.filter((e) => this._conditionMatches(e.visible_if));
		return t.length === 0 ? D : T`
      <article class="block">
        ${this._translate(e.title_key, e.title) ? T`<h3>${this._translate(e.title_key, e.title)}</h3>` : D}
        <div class="metric-grid ${e.columns ? "grid-layout" : ""}" style=${e.columns ? `grid-template-columns: repeat(${e.columns}, 1fr);` : ""}>
          ${t.map((e) => this._renderMetric(e))}
        </div>
      </article>
    `;
	}
	_renderMetric(e) {
		return T`
      <div class="metric" tone=${this._toneForValue(e)}>
        <span class="label">${this._translate(e.label_key, e.label)}</span>
        <span class="value">${this._formatSourceValue(e)}</span>
        ${this._sourceMissing(e.source) ? T`<span class="meta">${V(this.language, "dialog.regulation.source_missing")}</span>` : D}
      </div>
    `;
	}
	_renderStatus(e) {
		let t = cs(this._context(), e.source, e.path), n = is(t) ? "" : String(t), r = e.map[n] ?? this._rangeStatusEntry(e, t) ?? e.fallback, i = r?.tone ?? "muted", a = r ? this._translate(r.label_key, r.label ?? n) : Is, o = e.show_value ? this._formatStatusValue(e, t) : "", s = o && a !== Is ? `${a} · ${o}` : a, c = r ? this._translate(r.description_key, r.description) : "";
		return T`
      <article class="block status ${e.align === "center" ? "center" : ""}" tone=${i}>
        ${r?.icon ? T`<ha-icon icon=${r.icon}></ha-icon>` : T`<ha-icon icon="mdi:circle-medium"></ha-icon>`}
        <div>
          ${this._translate(e.label_key, e.label) ? T`<div class="label">${this._translate(e.label_key, e.label)}</div>` : D}
          <div class="status-pill">${s}</div>
          ${c ? T`<p class="description">${c}</p>` : D}
          ${this._sourceMissing(e.source) ? T`<p class="missing">${V(this.language, "dialog.regulation.source_missing")}</p>` : D}
        </div>
      </article>
    `;
	}
	_renderProgress(e) {
		let t = this._readValueRef(e.value), n = typeof e.target == "number" ? e.target : this._readValueRef(e.target), r = this._asNumber(t), i = this._asNumber(n), a = r === void 0 || i === void 0 || i <= 0 ? void 0 : Math.max(0, Math.min(100, r / i * 100)), o = this._translate(e.unit_key, e.unit);
		return T`
      <article class="block" tone="info">
        <div class="value-row">
          <span class="label">${this._translate(e.label_key, e.label)}</span>
          <span class="value">${a === void 0 ? Is : `${Math.round(a)}%`}</span>
        </div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style=${`--progress:${a ?? 0}%`}></div>
        </div>
        <div class="progress-line">
          <span>${this._formatPrimitive(t, e.digits)}${o ? ` ${o}` : ""}</span>
          <span>${this._formatPrimitive(n, e.digits)}${o ? ` ${o}` : ""}</span>
        </div>
        ${this._sourceMissing(e.value.source) ? T`<p class="missing">${V(this.language, "dialog.regulation.source_missing")}</p>` : D}
      </article>
    `;
	}
	_renderHistory(e) {
		let t = this._betterHistoryConfig(e), n = e.options ?? {}, r = this._showHistoryControls(n), i = n.tools === !0 || n.range_picker === !0;
		return !t.series || t.series.length === 0 ? T`
        <aside class="note" tone="muted">
          <ha-icon icon="mdi:chart-line"></ha-icon>
          <p class="text">${V(this.language, "dialog.regulation.source_missing")}</p>
        </aside>
      ` : T`
      <article class="history-block">
        ${this._translate(e.title_key, e.title) ? T`<h3>${this._translate(e.title_key, e.title)}</h3>` : D}
        <equinox-better-history
          class="history-chart"
          .hass=${this.hass}
          .config=${t}
          .attributeUnits=${Ms(this._staticAttributeUnits)}
          .language=${this.language}
          .showControls=${r}
          .toolsOpen=${i}
          .showExportButton=${n.tools === !0}
          .showImportButton=${!1}
          .showLineModeButtons=${n.tools === !0}
          .showTimeRangeSelector=${n.range_picker === !0}
        ></equinox-better-history>
      </article>
    `;
	}
	_renderAction(e) {
		let t = this._translate(e.label_key, e.label) || e.service, n = this._actionKey(e), r = this._isThermostatLocked(), i = this._actionPending === n, a = r || i || !this.hass;
		return T`
      <article class="block action-block" tone=${this._isDestructiveAction(e) ? "warning" : "info"}>
        <button
          class="action-button"
          type="button"
          ?disabled=${a}
          title=${t}
          aria-label=${t}
          @click=${() => this._handleActionClick(e)}
        >
          <ha-icon icon=${e.icon || "mdi:play-circle-outline"}></ha-icon>
        </button>
        <span class="action-label">${i ? V(this.language, "dialog.regulation.action_running") : t}</span>
        ${r ? T`<p class="missing">${V(this.language, "dialog.regulation.action_locked")}</p>` : D}
        ${this._actionError === n ? T`<p class="missing" role="alert">${V(this.language, "dialog.regulation.action_failed")}</p>` : D}
      </article>
    `;
	}
	async _handleActionClick(e) {
		if (!this.hass || !this.config || this._isThermostatLocked() || this._requiresConfirmation(e) && !this._confirmAction(e)) return;
		let t = this._parseService(e.service);
		if (!t) {
			this._actionError = this._actionKey(e), console.error("[equinox] Invalid regulation action service", { service: e.service });
			return;
		}
		let n = this._actionKey(e);
		this._actionPending = n, this._actionError = void 0;
		try {
			await this.hass.callService(t.domain, t.service, this._actionServiceData(e));
		} catch (t) {
			this._actionError = n, console.error("[equinox] Regulation action failed", {
				action: e,
				error: t
			});
		} finally {
			this._actionPending = void 0;
		}
	}
	_parseService(e) {
		let t = e.match(/^([a-z0-9_]+)\.([a-z0-9_]+)$/u);
		return t ? {
			domain: t[1],
			service: t[2]
		} : void 0;
	}
	_actionServiceData(e) {
		return {
			...this._resolveActionRecord(e.data),
			...this._resolveActionRecord(e.target)
		};
	}
	_resolveActionRecord(e) {
		let t = this._resolveActionValue(e);
		return t && typeof t == "object" && !Array.isArray(t) ? t : {};
	}
	_resolveActionValue(e) {
		if (Array.isArray(e)) return e.map((e) => this._resolveActionValue(e));
		if (e && typeof e == "object") return Object.fromEntries(Object.entries(e).map(([e, t]) => [e, this._resolveActionValue(t)]));
		if (typeof e != "string") return e;
		switch (e) {
			case "$climate_entity": return this.config?.entity;
			case "$diagnostic_entity": return this.config && this.hass ? as(this.hass, this.config) : void 0;
			case "$power_entity": return this.config?.power_entity;
			case "$humidity_entity": return this.config?.humidity_entity;
			case "$temperature_entity": return this.config?.temperature_entity;
			default: return e;
		}
	}
	_requiresConfirmation(e) {
		return e.confirmation?.enabled === !0 || this._isCustomDashboard() || this._isDestructiveAction(e);
	}
	_confirmAction(e) {
		let t = this._translate(e.confirmation?.title_key, e.confirmation?.title) || V(this.language, "dialog.regulation.confirm_action_title"), n = this._translate(e.confirmation?.text_key, e.confirmation?.text) || V(this.language, "dialog.regulation.confirm_action_text");
		return window.confirm(`${t}\n\n${n}`);
	}
	_isCustomDashboard() {
		return this.config?.additional_dashboards === "custom" || this.dashboard?.algorithm === "custom";
	}
	_isDestructiveAction(e) {
		return Ls.has(e.service);
	}
	_isThermostatLocked() {
		return this.viewModel?.vt?.lock.isUserLocked === !0 ? !0 : cs(this._context(), "climate", "lock_manager/is_locked") === !0;
	}
	_actionKey(e) {
		return e.id || e.service;
	}
	_betterHistoryConfig(e) {
		let t = this._historyConfigCacheKey(e), n = this._historyConfigCache.get(t);
		if (n) return n;
		let r = e.options ?? {}, i = {
			hours: this._historyRangeHours(e.range),
			showDatePicker: r.date_picker ?? !1,
			showEntityPicker: r.entity_picker ?? !1,
			showLegend: r.legend ?? !0,
			showTooltip: r.tooltip ?? !0,
			showScale: r.scales ?? !0,
			showGrid: !0,
			showExportButton: r.tools === !0,
			showImportButton: !1,
			showTimeRangeSelector: r.range_picker === !0,
			showLineModeButtons: r.tools === !0,
			debugPerformance: !1,
			title: void 0,
			series: e.series.flatMap((e) => this._betterHistorySeries(e))
		};
		return this._historyConfigCache.set(t, i), i;
	}
	_betterHistorySeries(e) {
		let t = this._resolveHistoryEntity(e.entity);
		return t ? [{
			entity: t,
			attribute: e.attribute ? ns(e.attribute) : void 0,
			label: this._translate(e.label_key, e.label),
			unit: this._translate(e.unit_key, e.unit) || void 0,
			group: e.scale_group,
			color: e.color,
			forced: !0
		}] : [];
	}
	_resolveHistoryEntity(e) {
		switch (e) {
			case "$climate_entity": return this.config?.entity || void 0;
			case "$diagnostic_entity": return this.config && this.hass ? as(this.hass, this.config) : void 0;
			case "$power_entity": return this.config?.power_entity || void 0;
			case "$humidity_entity": return this.config?.humidity_entity || void 0;
			case "$temperature_entity": return this.config?.temperature_entity || void 0;
			default: return e;
		}
	}
	_historyRangeHours(e) {
		if (!e) return 24;
		let t = e.trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([hdw])$/u);
		if (!t) return 24;
		let n = Number(t[1]);
		if (!Number.isFinite(n) || n <= 0) return 24;
		switch (t[2]) {
			case "h": return n;
			case "d": return n * 24;
			case "w": return n * 24 * 7;
			default: return 24;
		}
	}
	_showHistoryControls(e) {
		return e.date_picker === !0 || e.entity_picker === !0 || e.tools === !0 || e.range_picker === !0;
	}
	_historyConfigCacheKey(e) {
		return JSON.stringify({
			language: this.language ?? this.hass?.locale?.language ?? "",
			climate: this.config?.entity ?? "",
			diagnostic: this.config && this.hass ? as(this.hass, this.config) ?? "" : "",
			power: this.config?.power_entity ?? "",
			humidity: this.config?.humidity_entity ?? "",
			temperature: this.config?.temperature_entity ?? "",
			item: e
		});
	}
	_formatSourceValue(e) {
		let t = cs(this._context(), e.source, e.path), n = this._formatPrimitive(t, e.digits, e.fallback), r = this._translate(e.unit_key, e.unit);
		return n === Is || !r ? n : `${n} ${r}`;
	}
	_formatPrimitive(e, t, n = Is) {
		return is(e) ? n || Is : typeof e == "number" ? Number.isFinite(e) ? e.toFixed(Math.max(0, t ?? 0)) : n || Is : typeof e == "boolean" ? e ? "true" : "false" : String(e);
	}
	_formatStatusValue(e, t) {
		let n = this._asNumber(t);
		if (n === void 0) return "";
		let r = e.value_multiplier ?? 1, i = this._translate(e.value_unit_key, e.value_unit), a = this._formatPrimitive(n * r, e.value_digits);
		return i ? `${a} ${i}` : a;
	}
	_rangeStatusEntry(e, t) {
		let n = this._asNumber(t);
		if (n !== void 0) return e.ranges?.find((e) => {
			let t = e.min === void 0 || n >= e.min, r = e.max === void 0 || n <= e.max;
			return t && r;
		});
	}
	_toneForValue(e) {
		let t = cs(this._context(), e.source, e.path);
		return e.tone_map?.[String(t)] ?? "muted";
	}
	_readValueRef(e) {
		return cs(this._context(), e.source, e.path);
	}
	_asNumber(e) {
		if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
		if (typeof e != "string" || e.trim() === "") return;
		let t = Number(e);
		return Number.isFinite(t) ? t : void 0;
	}
	_sourceMissing(e) {
		return !this.hass || !this.config ? !0 : os(this.hass, this.config)[e] === void 0;
	}
	_conditionMatches(e) {
		return e ? this._truthy(this._evaluateCondition(e)) : !0;
	}
	_evaluateCondition(e) {
		if (Array.isArray(e)) return e.map((e) => this._evaluateCondition(e));
		if (!e || typeof e != "object") return e;
		let t = e;
		if ("var" in t) return this._readConditionVariable(t.var);
		if ("!" in t) return !this._truthy(this._evaluateCondition(t["!"]));
		if ("and" in t) return (Array.isArray(t.and) ? t.and : [t.and]).every((e) => this._truthy(this._evaluateCondition(e)));
		if ("or" in t) return (Array.isArray(t.or) ? t.or : [t.or]).some((e) => this._truthy(this._evaluateCondition(e)));
		for (let e of [
			"==",
			"!=",
			">",
			">=",
			"<",
			"<="
		]) if (e in t) {
			let n = Array.isArray(t[e]) ? t[e] : [], r = this._evaluateCondition(n[0]), i = this._evaluateCondition(n[1]);
			return this._compareCondition(e, r, i);
		}
		return !0;
	}
	_readConditionVariable(e) {
		if (typeof e != "string") return;
		let t = ns(e), n = t[0];
		if (!(!n || ![
			"climate",
			"diagnostic",
			"power",
			"humidity",
			"temperature",
			"config"
		].includes(n))) return cs(this._context(), n, t.slice(1));
	}
	_compareCondition(e, t, n) {
		switch (e) {
			case "==": return t === n;
			case "!=": return t !== n;
			case ">": return Number(t) > Number(n);
			case ">=": return Number(t) >= Number(n);
			case "<": return Number(t) < Number(n);
			case "<=": return Number(t) <= Number(n);
			default: return !1;
		}
	}
	_truthy(e) {
		return e !== !1 && e != null && e !== "" && e !== 0;
	}
};
customElements.get("eq-regulation-renderer") || customElements.define("eq-regulation-renderer", Rs);
//#endregion
//#region src/components/eq-regulation-dialog.ts
var zs = class extends O {
	constructor(...e) {
		super(...e), this.open = !1, this.mobileSectionMenuOpen = !1;
	}
	static {
		this.properties = {
			open: {
				type: Boolean,
				reflect: !0
			},
			hass: { attribute: !1 },
			config: { attribute: !1 },
			viewModel: { attribute: !1 },
			dashboard: { attribute: !1 },
			loadResult: { attribute: !1 },
			activeSectionId: { attribute: "active-section-id" },
			language: {},
			mobileSectionMenuOpen: {
				type: Boolean,
				attribute: "mobile-section-menu-open"
			}
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
      pointer-events: none;
    }

    :host([open]) {
      position: fixed;
      inset: 0;
      z-index: 9000;
      pointer-events: auto;
    }

    eq-dialog {
      --eq-dialog-width: min(920px, calc(100vw - 48px));
      --eq-dialog-min-width: 360px;
      --equinox-regulation-dialog-width: min(860px, calc(100vw - 80px));
    }

    .layout {
      display: grid;
      grid-template-columns: 200px minmax(0, 1fr);
      gap: 16px;
      width: var(--equinox-regulation-dialog-width);
      max-width: 100%;
      min-height: min(460px, calc(100vh - 160px));
    }

    .layout[single-section] {
      grid-template-columns: minmax(0, 1fr);
    }

    .section-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-inline-end: 12px;
      border-inline-end: 1px solid var(--divider-color);
    }

    .section-button {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 8px;
      align-items: center;
      min-width: 0;
      width: 100%;
      padding: 9px 10px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .section-button[aria-current="true"] {
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-text-color);
      font-weight: 650;
    }

    .section-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .section-button span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      width: min(560px, calc(100vw - 48px));
      padding: 18px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
    }

    .mobile-section-list {
      display: grid;
      gap: 8px;
      width: 100%;
      min-width: 0;
    }

    .mobile-navigation-shell {
      position: relative;
      min-height: calc(100dvh - 76px);
      overflow: hidden;
      margin: -12px -12px -16px;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
    }

    .mobile-current-page {
      min-width: 0;
      min-height: calc(100dvh - 76px);
      padding: 12px max(12px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      box-sizing: border-box;
      transition: transform 0.18s ease-out, opacity 0.18s ease-out, filter 0.18s ease-out;
    }

    .mobile-navigation-shell[sheet-open] .mobile-current-page {
      pointer-events: none;
    }

    .mobile-section-fab {
      position: fixed;
      inset-inline-end: max(16px, env(safe-area-inset-right));
      inset-block-end: max(18px, env(safe-area-inset-bottom));
      z-index: 9002;
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;
      justify-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 1px solid color-mix(in srgb, var(--primary-color) 54%, var(--divider-color));
      border-radius: 50%;
      background: color-mix(in srgb, var(--primary-color) 88%, var(--card-background-color, #1c1c1c) 12%);
      color: var(--primary-text-color, #fff);
      box-shadow: 0 10px 26px rgb(0 0 0 / 28%);
      font: inherit;
      font-weight: 650;
      white-space: nowrap;
      transition: opacity 0.14s ease-out, transform 0.14s ease-out;
    }

    .mobile-section-fab ha-icon {
      --mdc-icon-size: 22px;
    }

    .mobile-navigation-shell[sheet-open] .mobile-section-fab {
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
    }

    .mobile-sheet-scrim {
      position: fixed;
      inset: 0;
      z-index: 9001;
      background: rgba(0, 0, 0, 0.28);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease-out;
    }

    .mobile-navigation-shell[sheet-open] .mobile-sheet-scrim {
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-section-sheet {
      position: fixed;
      inset-inline: 0;
      inset-block-end: 0;
      z-index: 9003;
      max-height: min(72dvh, 520px);
      padding: 8px 12px max(16px, env(safe-area-inset-bottom));
      box-sizing: border-box;
      border-radius: 18px 18px 0 0;
      border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
      border-bottom: 0;
      background: var(--equinox-card-bg, var(--card-background-color, #1c1c1c));
      box-shadow: 0 -18px 36px rgb(0 0 0 / 30%);
      transform: translateY(100%);
      transition: transform 0.18s ease-out;
      pointer-events: none;
      overflow: auto;
    }

    .mobile-navigation-shell[sheet-open] .mobile-section-sheet {
      transform: translateY(0);
      pointer-events: auto;
    }

    .mobile-section-sheet-handle {
      width: 38px;
      height: 4px;
      margin: 2px auto 12px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--secondary-text-color) 42%, transparent);
    }

    .mobile-section-sheet-title {
      margin: 0 4px 10px;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 650;
    }

    .mobile-section-button {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
      width: 100%;
      min-height: 52px;
      padding: 8px 10px;
      border: 0;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .mobile-section-button:hover {
      background: rgba(128, 128, 128, 0.08);
    }

    .mobile-section-button[aria-current="true"] {
      color: var(--primary-color);
      font-weight: 650;
    }

    .mobile-section-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.12);
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .mobile-section-button[aria-current="true"] .mobile-section-icon,
    .mobile-section-button[aria-current="true"] .mobile-section-chevron {
      color: var(--primary-color);
    }

    .mobile-section-button span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mobile-section-chevron {
      color: var(--secondary-text-color);
    }

    @media (max-width: 600px) {
      eq-dialog {
        --eq-dialog-width: 100vw;
        --eq-dialog-min-width: 0;
        --equinox-regulation-dialog-width: 100%;
      }

      .layout {
        display: block;
        width: 100%;
        min-height: 0;
      }

      .section-nav {
        display: none;
      }

      .state {
        box-sizing: border-box;
        width: 100%;
      }
    }

  `;
	}
	render() {
		return T`
      <eq-dialog
        .open=${this.open}
        .title=${this._dialogTitle()}
        .language=${this.language}
        .centered=${!0}
        @eq-dialog-close=${(e) => this._forwardClose(e)}
      >
        ${this._renderContent()}
      </eq-dialog>
    `;
	}
	_renderContent() {
		if (!this.open) return T``;
		if (!this.hass || !this.config) return T`<div class="state" role="status">${V(this.language, "dialog.regulation.loading")}</div>`;
		if (this.loadResult?.status === "unavailable") return T`<div class="state" role="status">${V(this.language, "dialog.regulation.unavailable")}</div>`;
		if (this.loadResult?.status === "error") {
			let e = this.loadResult.reason === "load_failed" ? "dialog.regulation.custom_not_found" : "dialog.regulation.invalid";
			return T`<div class="state" role="alert">${V(this.language, e)}</div>`;
		}
		if (!this.dashboard || this.dashboard.kind !== "regulation-dashboard" || this.dashboard.sections.length === 0) return T`<div class="state" role="alert">${V(this.language, "dialog.regulation.invalid")}</div>`;
		let e = this._activeSectionId();
		return this._isMobile() && this.dashboard.sections.length > 1 ? this._renderMobileSectionSheet(e) : T`
      <div class="layout" ?single-section=${this.dashboard.sections.length === 1}>
        ${this.dashboard.sections.length > 1 ? T`
              <nav class="section-nav" aria-label=${V(this.language, "dialog.regulation.sections")}>
                ${this.dashboard.sections.map((t) => {
			let n = Fs(this.dashboard, this.language, t.title_key, t.title || t.id);
			return T`
                    <button
                      class="section-button"
                      type="button"
                      aria-current=${t.id === e ? "true" : "false"}
                      @click=${() => this._selectSection(t.id)}
                    >
                      ${t.icon ? T`<ha-icon icon=${t.icon}></ha-icon>` : D}
                      <span>${n}</span>
                    </button>
                  `;
		})}
              </nav>
            ` : D}
        <eq-regulation-renderer
          .hass=${this.hass}
          .config=${this.config}
          .viewModel=${this.viewModel}
          .dashboard=${this.dashboard}
          .activeSectionId=${e}
          .language=${this.language}
        ></eq-regulation-renderer>
      </div>
    `;
	}
	_renderMobileSectionMenu(e) {
		return T`
      <nav class="mobile-section-list" aria-label=${V(this.language, "dialog.regulation.sections")}>
        ${this.dashboard.sections.map((t) => {
			let n = Fs(this.dashboard, this.language, t.title_key, t.title || t.id);
			return T`
            <button
              class="mobile-section-button"
              type="button"
              aria-current=${t.id === e ? "true" : "false"}
              @click=${() => this._selectSection(t.id)}
            >
              <span class="mobile-section-icon">
                <ha-icon icon=${t.icon || "mdi:view-dashboard-outline"}></ha-icon>
              </span>
              <span>${n}</span>
              <ha-icon class="mobile-section-chevron" icon="mdi:chevron-right"></ha-icon>
            </button>
          `;
		})}
      </nav>
    `;
	}
	_renderMobileSectionSheet(e) {
		return T`
      <div class="mobile-navigation-shell" ?sheet-open=${this.mobileSectionMenuOpen}>
        <div class="mobile-current-page">
          <eq-regulation-renderer
            .hass=${this.hass}
            .config=${this.config}
            .viewModel=${this.viewModel}
            .dashboard=${this.dashboard}
            .activeSectionId=${e}
            .language=${this.language}
          ></eq-regulation-renderer>
        </div>
        <button
          class="mobile-section-fab"
          type="button"
          aria-label=${V(this.language, "dialog.regulation.sections")}
          @click=${() => this._setMobileSectionMenu(!0)}
        >
          <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
        </button>
        <div class="mobile-sheet-scrim" @click=${() => this._setMobileSectionMenu(!1)}></div>
        <div class="mobile-section-sheet" role="dialog" aria-label=${V(this.language, "dialog.regulation.sections")}>
          <div class="mobile-section-sheet-handle"></div>
          <h3 class="mobile-section-sheet-title">${V(this.language, "dialog.regulation.sections")}</h3>
          ${this._renderMobileSectionMenu(e)}
        </div>
      </div>
    `;
	}
	_dialogTitle() {
		let e = V(this.language, "dialog.regulation.title");
		if (!this.dashboard) return e;
		let t = Fs(this.dashboard, this.language, this.dashboard.title_key, this.dashboard.title);
		if (this._isMobile()) {
			let n = this.dashboard.sections.find((e) => e.id === this._activeSectionId());
			return (n ? Fs(this.dashboard, this.language, n.title_key, n.title || n.id) : "") || (t ? `${e} - ${t}` : e);
		}
		return t ? `${e} - ${t}` : e;
	}
	_activeSectionId() {
		return this.dashboard?.sections.find((e) => e.id === this.activeSectionId)?.id ?? this.dashboard?.sections[0]?.id;
	}
	_selectSection(e) {
		this.renderRoot.querySelector(".mobile-navigation-shell")?.removeAttribute("sheet-open"), window.requestAnimationFrame(() => this._dispatchSectionSelected(e));
	}
	_forwardClose(e) {
		e.stopPropagation(), this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	_setMobileSectionMenu(e) {
		this.renderRoot.querySelector(".mobile-navigation-shell")?.toggleAttribute("sheet-open", e), window.requestAnimationFrame(() => this._dispatchMenuToggled(e));
	}
	_dispatchSectionSelected(e) {
		this.dispatchEvent(new CustomEvent("equinox-regulation-section-selected", {
			detail: { sectionId: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_dispatchMenuToggled(e) {
		this.dispatchEvent(new CustomEvent("equinox-regulation-menu-toggled", {
			detail: { open: e },
			bubbles: !0,
			composed: !0
		}));
	}
	_isMobile() {
		return window.matchMedia("(max-width: 600px)").matches;
	}
};
customElements.get("eq-regulation-dialog") || customElements.define("eq-regulation-dialog", zs);
//#endregion
//#region src/components/eq-lock-dialog.ts
var Bs = 4, Vs = [
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
], Hs = class extends O {
	constructor(...e) {
		super(...e), this.open = !1, this.entityId = "", this.isLocking = !0, this._code = "", this._error = !1, this._loading = !1, this._onKeyDown = (e) => {
			this.open && (e.key >= "0" && e.key <= "9" ? this._pressDigit(e.key) : e.key === "Backspace" ? this._pressBackspace() : e.key === "Escape" ? this._cancel() : e.key === "Enter" && this._code.length === Bs && this._validate());
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
		if (!this.open) return D;
		let e = !this.isLocking, t = e ? V(this.language, "main.lock.locked") : V(this.language, "main.lock.unlocked"), n = V(this.language, "main.lock.enter_code"), r = V(this.language, "main.lock.wrong_code"), i = V(this.language, "dialog.close");
		return T`
      <div class="backdrop" @click=${this._cancel}></div>
      <div class="dialog" role="dialog" aria-modal="true">
        <div class="header">
          <ha-icon
            .icon=${e ? "mdi:lock-outline" : "mdi:lock-open-outline"}
            ?unlocked=${!e}
          ></ha-icon>
          <span>${t} — ${n}</span>
        </div>
        <div class="dots" ?error=${this._error}>
          ${Array.from({ length: Bs }, (e, t) => T`
            <div
              class="dot"
              ?filled=${t < this._code.length && !this._error}
              ?error=${this._error}
            ></div>
          `)}
        </div>
        <div class="error-msg">${this._error ? r : D}</div>
        <div class="keypad">
          ${Vs.map((e) => this._renderKey(e))}
        </div>
        <button class="cancel" @click=${this._cancel}>${i}</button>
      </div>
    `;
	}
	_renderKey(e) {
		return e === "backspace" ? T`
        <button
          class="key"
          ?disabled=${this._loading || this._code.length === 0}
          @click=${this._pressBackspace}
        >
          <ha-icon icon="mdi:backspace-outline"></ha-icon>
        </button>
      ` : e === "spacer" ? T`<div></div>` : T`
      <button
        class="key"
        ?disabled=${this._loading || this._code.length >= Bs}
        @click=${() => this._pressDigit(e)}
      >
        ${e}
      </button>
    `;
	}
	_pressDigit(e) {
		this._loading || this._code.length >= Bs || (this._error = !1, this._code += e, this._code.length === Bs && this._validate());
	}
	_pressBackspace() {
		this._loading || this._code.length === 0 || (this._error = !1, this._code = this._code.slice(0, -1));
	}
	async _validate() {
		if (this._loading || !this.hass || this._code.length < Bs) return;
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
customElements.get("eq-lock-dialog") || customElements.define("eq-lock-dialog", Hs);
//#endregion
//#region src/components/eq-main-card.ts
var Us = "equinox", Ws = [
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
], Gs = {
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
}, Ks = {
	preheating: {
		icon: "mdi:heat-wave",
		tone: K("preheating")
	},
	heat: {
		icon: "mdi:fire",
		tone: K("heating")
	},
	heating: {
		icon: "mdi:fire",
		tone: K("heating")
	},
	cool: {
		icon: "mdi:snowflake",
		tone: K("cooling")
	},
	cooling: {
		icon: "mdi:snowflake",
		tone: K("cooling")
	},
	drying: {
		icon: "mdi:water-percent",
		tone: K("drying")
	},
	fan: {
		icon: "mdi:fan",
		tone: K("fan")
	},
	idle: { tone: K("idle") },
	defrosting: {
		icon: "mdi:snowflake-melt",
		tone: K("defrosting")
	}
};
function q(e) {
	return typeof e == "number" && Number.isFinite(e);
}
function qs(e) {
	if (typeof e == "string" && e.trim() !== "") return e.trim();
	if (!Array.isArray(e) || e.length < 3) return;
	let [t, n, r] = e.map((e) => Number(e));
	if ([
		t,
		n,
		r
	].every((e) => Number.isFinite(e))) return `rgb(${t}, ${n}, ${r})`;
}
function Js(e) {
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
function Ys({ r: e, g: t, b: n }) {
	let r = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return r(e) * .2126 + r(t) * .7152 + r(n) * .0722;
}
function Xs(e, t) {
	if (t !== void 0 && t < 70) return;
	let n = Js(e);
	if (n) return Ys(n) > .42 ? "#111418" : "#ffffff";
}
function Zs(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
function Qs(e, t) {
	let n = [...new Set(e)], r = t.filter((e) => n.includes(e)), i = n.filter((e) => !t.includes(e));
	return [...r, ...i];
}
var $s = class extends O {
	constructor(...e) {
		super(...e), this._activeDialog = null, this._powerInfoPinned = !1, this._lockDialogOpen = !1, this._lockIsLocking = !1, this._regulationLoadKey = "", this._regulationMobileSectionMenuOpen = !1, this._regulationBrowserHistoryDepth = 0, this._browserHistoryInstanceId = `equinox-${Math.random().toString(36).slice(2)}`, this._syncingBrowserHistory = !1, this._handleMouseLeave = () => {
			this._activeDialog === "menu" && (this._activeDialog = null);
		}, this._handleBrowserPopState = (e) => {
			let t = this._browserHistoryEntry(e.state);
			this._syncingBrowserHistory = !0;
			try {
				if (t?.layer === "history-dialog") {
					this._activeDialog = "history", this._activeMessageKey = void 0;
					return;
				}
				if (t?.layer === "regulation-dialog") {
					this._activeDialog = "regulation", this._activeMessageKey = void 0, this._regulationActiveSectionId = t.sectionId, this._regulationMobileSectionMenuOpen = !1, this._regulationBrowserHistoryDepth = t.regulationDepth ?? 1, this._ensureRegulationDashboard();
					return;
				}
				this._activeDialog === "history" && (this._activeDialog = null), this._activeDialog === "regulation" && (this._activeDialog = null, this._regulationMobileSectionMenuOpen = !1, this._regulationBrowserHistoryDepth = 0);
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
			_lockIsLocking: { state: !0 },
			_regulationLoadResult: { state: !0 },
			_regulationActiveSectionId: { state: !0 }
		};
	}
	static {
		this.styles = [
			ms,
			hs,
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

      .event ha-icon,
      .lock ha-icon {
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

      .action-icon[tone="dry"] {
        color: var(--equinox-dry-color);
      }

      .action-icon[tone="fan-only"] {
        color: var(--equinox-fan-only-color);
      }

      .action-icon[tone="muted"] {
        color: var(--equinox-muted-tone-color);
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
        --control-button-background-color: var(--equinox-mode-control-bg);
        --control-button-background-opacity: 1;
        --control-button-focus-color: var(--primary-color);
        --control-button-icon-color: var(--equinox-mode-control-text);
        --mdc-icon-size: 24px;
        filter: drop-shadow(0 1px 3px rgb(0 0 0 / 18%));
      }

      .step:hover:not([disabled]) {
        --control-button-background-color: var(--equinox-mode-control-hover-bg);
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

      .btn-icon[tone="heat"] { background: color-mix(in srgb, var(--equinox-heat-color) 15%, transparent); color: var(--equinox-heat-color); }
      .btn-icon[tone="cool"] { background: color-mix(in srgb, var(--equinox-cool-color) 15%, transparent); color: var(--equinox-cool-color); }
      .btn-icon[tone="auto"] { background: color-mix(in srgb, var(--equinox-auto-color) 15%, transparent); color: var(--equinox-auto-color); }
      .btn-icon[tone="heat-cool"] { background: color-mix(in srgb, var(--equinox-heat-cool-color) 15%, transparent); color: var(--equinox-heat-cool-color); }
      .btn-icon[tone="boost"] { background: color-mix(in srgb, var(--equinox-boost-color) 15%, transparent); color: var(--equinox-boost-color); }
      .btn-icon[tone="cool-boost"] { background: color-mix(in srgb, var(--equinox-cool-boost-color) 15%, transparent); color: var(--equinox-cool-boost-color); }

      /* HA-aligned and equinox-derivative tones — each value sets --eq-tone-color
         which the generic paint rule below consumes. Heat/cool/auto/heat-cool/boost
         keep their explicit rules above so legacy CSS stays unchanged. */
      .btn-icon[tone="dry"]             { --eq-tone-color: var(--equinox-dry-color); }
      .btn-icon[tone="fan-only"]        { --eq-tone-color: var(--equinox-fan-only-color); }
      .btn-icon[tone="muted"]           { --eq-tone-color: var(--equinox-muted-tone-color); }
      .btn-icon[tone="preset-eco"]      { --eq-tone-color: var(--equinox-preset-eco-color); }
      .btn-icon[tone="preset-away"]     { --eq-tone-color: var(--equinox-preset-away-color); }
      .btn-icon[tone="preset-comfort"]  { --eq-tone-color: var(--equinox-preset-comfort-color); }
      .btn-icon[tone="preset-home"]     { --eq-tone-color: var(--equinox-preset-home-color); }
      .btn-icon[tone="preset-sleep"]    { --eq-tone-color: var(--equinox-preset-sleep-color); }
      .btn-icon[tone="preset-frost"]    { --eq-tone-color: var(--equinox-preset-frost-color); }
      .btn-icon[tone="preset-activity"] { --eq-tone-color: var(--equinox-preset-activity-color); }
      .btn-icon[tone="fan-auto"]        { --eq-tone-color: var(--equinox-fan-auto-color); }
      .btn-icon[tone="fan-low"]         { --eq-tone-color: var(--equinox-fan-low-color); }
      .btn-icon[tone="fan-medium"]      { --eq-tone-color: var(--equinox-fan-medium-color); }
      .btn-icon[tone="fan-high"]        { --eq-tone-color: var(--equinox-fan-high-color); }
      .btn-icon[tone="fan-focus"]       { --eq-tone-color: var(--equinox-fan-focus-color); }
      .btn-icon[tone="fan-diffuse"]     { --eq-tone-color: var(--equinox-fan-diffuse-color); }
      .btn-icon[tone="swing-on"]        { --eq-tone-color: var(--equinox-swing-on-color); }
      .btn-icon[tone="swing-vertical"]  { --eq-tone-color: var(--equinox-swing-vertical-color); }
      .btn-icon[tone="swing-horizontal"]{ --eq-tone-color: var(--equinox-swing-horizontal-color); }
      .btn-icon[tone="swing-both"]      { --eq-tone-color: var(--equinox-swing-both-color); }
      .btn-icon[tone="fan-off"],
      .btn-icon[tone="swing-off"]       { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .btn-icon[tone="off"]             { --eq-tone-color: var(--disabled-text-color, var(--equinox-muted-color)); }

      .btn-icon[tone^="preset-"],
      .btn-icon[tone^="fan-"],
      .btn-icon[tone^="swing-"],
      .btn-icon[tone="dry"],
      .btn-icon[tone="fan-only"],
      .btn-icon[tone="muted"],
      .btn-icon[tone="off"] {
        background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
        color: var(--eq-tone-color);
      }

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

      /* Per-mode tinting for the standalone fan/swing rail buttons —
         mirrors .btn-icon palette. */
      .fan[tone="fan-auto"], .swing[tone="fan-auto"]               { --eq-tone-color: var(--equinox-fan-auto-color); }
      .fan[tone="fan-low"]                                          { --eq-tone-color: var(--equinox-fan-low-color); }
      .fan[tone="fan-medium"]                                       { --eq-tone-color: var(--equinox-fan-medium-color); }
      .fan[tone="fan-high"]                                         { --eq-tone-color: var(--equinox-fan-high-color); }
      .fan[tone="fan-focus"]                                        { --eq-tone-color: var(--equinox-fan-focus-color); }
      .fan[tone="fan-diffuse"]                                      { --eq-tone-color: var(--equinox-fan-diffuse-color); }
      .fan[tone="fan-off"]                                          { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .swing[tone="swing-on"]                                       { --eq-tone-color: var(--equinox-swing-on-color); }
      .swing[tone="swing-vertical"]                                 { --eq-tone-color: var(--equinox-swing-vertical-color); }
      .swing[tone="swing-horizontal"]                               { --eq-tone-color: var(--equinox-swing-horizontal-color); }
      .swing[tone="swing-both"]                                     { --eq-tone-color: var(--equinox-swing-both-color); }
      .swing[tone="swing-off"]                                      { --eq-tone-color: var(--state-unavailable-color, var(--disabled-text-color, #7e8792)); }
      .fan[tone="off"], .swing[tone="off"]                          { --eq-tone-color: var(--disabled-text-color, var(--equinox-muted-color)); }

      .fan[tone^="fan-"],
      .swing[tone^="swing-"],
      .fan[tone="off"],
      .swing[tone="off"] {
        background: color-mix(in srgb, var(--eq-tone-color) 15%, transparent);
        color: var(--eq-tone-color);
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

      /* Locked = red so the color flags why the controls are blocked.
         Unlocked = inherits the regular icon color (the common state stays
         quiet). See --equinox-lock-{locked,unlocked}-color in flat.ts. */
      .lock[tone="lock-locked"] {
        color: var(--equinox-lock-locked-color);
      }

      .lock[tone="lock-unlocked"] {
        color: var(--equinox-lock-unlocked-color);
      }

      ha-card[locked] .setpoint-control,
      ha-card[locked] .segments,
      ha-card[locked] .compact-selectors {
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    `,
			gs
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("mouseleave", this._handleMouseLeave), window.addEventListener("popstate", this._handleBrowserPopState);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("mouseleave", this._handleMouseLeave), window.removeEventListener("popstate", this._handleBrowserPopState), this._clearPowerInfoPressTimer();
	}
	_browserHistoryEntry(e = window.history.state) {
		let t = typeof e == "object" && e ? e[Us] : void 0;
		if (typeof t != "object" || !t) return;
		let n = t;
		if (!(n.instanceId !== this._browserHistoryInstanceId || n.layer !== "history-dialog" && n.layer !== "regulation-dialog")) return {
			instanceId: n.instanceId,
			layer: n.layer,
			sectionId: typeof n.sectionId == "string" ? n.sectionId : void 0,
			regulationDepth: typeof n.regulationDepth == "number" ? n.regulationDepth : void 0
		};
	}
	_browserHistoryState(e) {
		return {
			...typeof window.history.state == "object" && window.history.state !== null ? window.history.state : {},
			[Us]: {
				instanceId: this._browserHistoryInstanceId,
				...e
			}
		};
	}
	_sameBrowserHistoryEntry(e) {
		let t = this._browserHistoryEntry();
		return t?.layer === e.layer && t.sectionId === e.sectionId;
	}
	_pushBrowserHistoryState(e) {
		this._syncingBrowserHistory || this._sameBrowserHistoryEntry(e) || window.history.pushState(this._browserHistoryState(e), "", window.location.href);
	}
	_pushHistoryDialogState() {
		this._pushBrowserHistoryState({ layer: "history-dialog" });
	}
	_pushRegulationDialogState(e = this._regulationActiveSectionId) {
		if (this._sameBrowserHistoryEntry({
			layer: "regulation-dialog",
			sectionId: e
		})) return;
		let t = this._browserHistoryEntry(), n = t?.layer === "regulation-dialog" && t.regulationDepth ? t.regulationDepth + 1 : 1;
		this._pushBrowserHistoryState({
			layer: "regulation-dialog",
			sectionId: e,
			regulationDepth: n
		}), this._regulationBrowserHistoryDepth = n;
	}
	_openHistoryDialog() {
		this._activeDialog = "history", this._activeMessageKey = void 0, this._pushHistoryDialogState();
	}
	_closeHistoryDialog() {
		if (!this._syncingBrowserHistory && this._browserHistoryEntry()?.layer === "history-dialog") {
			this._activeDialog = null, window.history.back();
			return;
		}
		this._activeDialog = null;
	}
	_regulationDashboard() {
		return this._regulationLoadResult?.status === "loaded" ? this._regulationLoadResult.dashboard : void 0;
	}
	_regulationMenuAvailable() {
		return !this.hass || !this.config || this.config.additional_dashboards === "disabled" ? !1 : this.config.additional_dashboards === "custom" ? !0 : this._regulationLoadResult?.status === "loaded";
	}
	_regulationLoadCacheKey() {
		if (!this.hass || !this.config) return;
		let e = fs(this.hass, this.config);
		return e.available ? `${e.mode}:${e.source}:${e.algorithm}` : `${e.mode}:${e.reason}:${e.algorithm ?? ""}`;
	}
	_ensureRegulationDashboard() {
		if (!this.hass || !this.config) return Promise.resolve(void 0);
		let e = fs(this.hass, this.config), t = this._regulationLoadCacheKey();
		if (!t) return Promise.resolve(void 0);
		if (t !== this._regulationLoadKey && (this._regulationLoadKey = t, this._regulationLoadResult = void 0, this._regulationLoadPromise = void 0, this._regulationActiveSectionId = void 0, this._regulationMobileSectionMenuOpen = !1, this._regulationBrowserHistoryDepth = 0), this._regulationLoadResult) return Promise.resolve(this._regulationLoadResult);
		if (this._regulationLoadPromise) return this._regulationLoadPromise;
		let n = qo(e).then((e) => (this._regulationLoadKey === t && (this._regulationLoadResult = e, this._regulationLoadPromise = void 0, e.status === "loaded" && !this._regulationActiveSectionId && (this._regulationActiveSectionId = e.dashboard.sections[0]?.id)), e));
		return this._regulationLoadPromise = n, n;
	}
	async _openRegulationDialog(e) {
		this._activeDialog = "regulation", this._activeMessageKey = void 0, this._regulationMobileSectionMenuOpen = !1, e && (this._regulationActiveSectionId = e);
		let t = await this._ensureRegulationDashboard();
		if (t?.status === "loaded") {
			this._regulationActiveSectionId = e ?? t.dashboard.sections[0]?.id, this._pushRegulationDialogState(this._regulationActiveSectionId);
			return;
		}
		this.config?.additional_dashboards === "custom" ? this._pushRegulationDialogState(e) : this._activeDialog = null;
	}
	_closeRegulationDialog() {
		let e = this._browserHistoryEntry();
		if (!this._syncingBrowserHistory && e?.layer === "regulation-dialog") {
			window.history.go(-Math.max(1, e.regulationDepth ?? this._regulationBrowserHistoryDepth));
			return;
		}
		this._activeDialog = null, this._regulationMobileSectionMenuOpen = !1, this._regulationBrowserHistoryDepth = 0;
	}
	_setRegulationMobileSectionMenu(e) {
		this._activeDialog === "regulation" && (this._regulationMobileSectionMenuOpen = e);
	}
	_selectRegulationSection(e) {
		this._regulationActiveSectionId = e, this._regulationMobileSectionMenuOpen = !1, this._pushRegulationDialogState(e);
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "liquid_glow"), this.toggleAttribute("light", !this.hass?.themes?.darkMode), this.toggleAttribute("border-glow-on-action", !!this.config?.border_glow_on_action);
	}
	updated() {
		(this._activeDialog === "menu" || this._activeDialog === "regulation") && this._ensureRegulationDashboard();
	}
	render() {
		if (!this.viewModel || !this.config) return D;
		let e = this.config?.display_mode === "compact", t = this.config.state_icons_layout === "vertical", n = this.viewModel.vt?.lock.isConfigured === !0 && this.viewModel.vt.lock.isUserLocked === !0, r = this._activeHvacAction();
		return T`
      <ha-card
        style=${this._cardStyle()}
        ?locked=${n}
        tone=${this._cardTone()}
        active-action=${r ?? D}
      >
        <div class="card">
          ${this._renderName()}
          ${t ? D : this._renderStatus()}
          <div class="layout" ?state-vertical=${t}>
            <div class="main">
              ${this._renderSetpoint()}
              ${this._renderConditions()}
              ${e ? this._renderCompactSelectors() : T`${this._renderHvacModes()} ${this._renderPresets()}`}
            </div>
            ${t ? T`<div class="left-rail">${this._renderLeftRail()}</div>` : D}
            ${t ? T`<div class="state-rail">${this._renderStateRail()}</div>` : D}
          </div>
        </div>
      </ha-card>
      ${this._renderActiveDialogs()}
    `;
	}
	_renderActiveDialogs() {
		return [
			this._renderLightweightDialog(),
			this._renderHistoryDialog(),
			this._renderRegulationDialog(),
			this._renderLockDialog(),
			this._renderMessageDialog()
		];
	}
	_renderLightweightDialog() {
		switch (this._activeDialog) {
			case "fan": return T`
          <eq-fan-dialog
            .open=${!0}
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
        `;
			case "swing": return T`
          <eq-swing-dialog
            .open=${!0}
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
        `;
			case "hvac": return T`
          <eq-hvac-dialog
            .open=${!0}
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
        `;
			case "preset": return T`
          <eq-preset-dialog
            .open=${!0}
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
        `;
			case "menu": return T`
          <eq-menu-dialog
            .open=${!0}
            .hass=${this.hass}
            .viewModel=${this.viewModel}
            .config=${this.config}
            .regulationDashboard=${this._regulationDashboard()}
            .regulationAvailable=${this._regulationMenuAvailable()}
            .language=${this._language()}
            .floating=${!0}
            .closeOnLeave=${!0}
            .anchor=${this._dialogAnchor}
            @eq-dialog-close=${() => {
				this._activeDialog === "menu" && (this._activeDialog = null);
			}}
            @equinox-open-regulation=${(e) => this._openRegulationDialog(e.detail?.sectionId)}
            @equinox-open-boost=${() => {
				this._activeDialog = "boost";
			}}
            @equinox-open-history=${() => this._openHistoryDialog()}
          ></eq-menu-dialog>
        `;
			case "boost": return T`
          <eq-boost-dialog
            .open=${!0}
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
        `;
			default: return D;
		}
	}
	_renderHistoryDialog() {
		return this._activeDialog === "history" ? T`
      <eq-history-dialog
        .open=${!0}
        .hass=${this.hass}
        .config=${this.config}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeHistoryDialog()}
      ></eq-history-dialog>
    ` : D;
	}
	_renderRegulationDialog() {
		return this._activeDialog === "regulation" ? T`
      <eq-regulation-dialog
        .open=${!0}
        .hass=${this.hass}
        .config=${this.config}
        .viewModel=${this.viewModel}
        .dashboard=${this._regulationDashboard()}
        .loadResult=${this._regulationLoadResult}
        .activeSectionId=${this._regulationActiveSectionId}
        .mobileSectionMenuOpen=${this._regulationMobileSectionMenuOpen}
        .language=${this._language()}
        @eq-dialog-close=${() => this._closeRegulationDialog()}
        @equinox-regulation-menu-toggled=${(e) => this._setRegulationMobileSectionMenu(e.detail.open)}
        @equinox-regulation-section-selected=${(e) => this._selectRegulationSection(e.detail.sectionId)}
      ></eq-regulation-dialog>
    ` : D;
	}
	_renderLockDialog() {
		return this._lockDialogOpen ? T`
      <eq-lock-dialog
        .open=${!0}
        .hass=${this.hass}
        .entityId=${this.config?.entity}
        .isLocking=${this._lockIsLocking}
        .language=${this._language()}
        @eq-dialog-close=${() => {
			this._lockDialogOpen = !1;
		}}
      ></eq-lock-dialog>
    ` : D;
	}
	_renderMessageDialog() {
		return this._activeMessageKey === void 0 ? D : T`
      <eq-dialog
        .open=${!0}
        .title=${V(this._language(), "dialog.message.title")}
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
		let e = qs(this.config?.card_background_color), t = Zs(this.config?.card_background_opacity), n = Xs(this.config?.card_background_color, t), r = e && t !== void 0 ? `color-mix(in srgb, ${e} ${t}%, transparent)` : e || (t === void 0 ? void 0 : `color-mix(in srgb, var(--equinox-card-bg) ${t}%, transparent)`), i = [];
		return r && (i.push(`--equinox-config-card-bg: ${r}`), i.push(`--equinox-card-surface-bg: ${r}`), i.push(`--equinox-mode-control-bg: ${r}`)), n && i.push(`--equinox-card-surface-text-color: ${n}`), i.length > 0 ? `${i.join("; ")};` : "";
	}
	_language() {
		return this.hass?.locale?.language ?? this.hass?.language;
	}
	_renderName() {
		return this.config?.disable_name ? D : T`
      <div class="name">
        <span class="name-label">${this.viewModel?.climate.name}</span>
        ${this._renderMenuButton()}
      </div>
    `;
	}
	_renderStatus() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? V(this._language(), "main.lock.locked") : V(this._language(), "main.lock.unlocked"), n = this.config?.display_mode !== "compact" && this._hasFanControl(), r = this.config?.display_mode !== "compact" && this._hasSwingControl();
		return T`
      <div class="status">
        ${n ? this._renderFanButton() : D}
        ${r ? this._renderSwingButton() : D}
        ${this._renderPowerInfoButton()}
        <span class="status-spacer"></span>
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${e ? this._renderLockButton(t) : D}
        ${this.config?.disable_name ? this._renderMenuButton() : D}
      </div>
    `;
	}
	_renderStateRail() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? V(this._language(), "main.lock.locked") : V(this._language(), "main.lock.unlocked");
		return [
			...this.config?.disable_name ? [this._renderMenuButton()] : [],
			...e ? [this._renderLockButton(t)] : [],
			T`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
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
		return T`
      <button
        class="lock"
        title=${e}
        aria-label=${e}
        ?locked=${t}
        tone=${Bo(t)}
        @click=${this._toggleLock}
      >
        <ha-icon .icon=${t ? "mdi:lock" : "mdi:lock-open-outline"}></ha-icon>
      </button>
    `;
	}
	_renderHvacStateIcon() {
		let e = this.viewModel?.climate.hvacAction, t = e ? Ks[e] : void 0, n = this.viewModel?.climate.hvacMode;
		if (n === "off" && this.viewModel?.vt?.messages.some((e) => e.key === "hvac_off_manual")) return D;
		let r = t?.icon || (n ? Ja[n] : ""), i = t?.tone ?? this._modeTone(n), a = e ? V(this._language(), `main.hvac_action.${e}`) : this._hvacLabel(n);
		return r ? T`
      <ha-icon
        class="action-icon"
        tone=${i}
        .icon=${r}
        title=${a}
      ></ha-icon>
    ` : D;
	}
	_renderEvents() {
		let e = this.viewModel?.vt?.events, t = this.viewModel?.vt?.messages ?? [];
		if (!e) return [];
		let n = new Set(Ws.filter((e) => e.key === "hasTimer").flatMap((e) => e.messageKeys ?? [])), r = t.map((e) => {
			let t = n.has(e.key) ? (e) => this._openBoost(e) : void 0;
			return this._renderMessageIcon(e, t);
		}), i = Ws.filter((n) => {
			let r = n.messageKeys ?? [];
			return e[n.key] && !r.some((e) => t.some((t) => t.key === e));
		}).map((e) => {
			let t = e.key === "hasTimer" ? (e) => this._openBoost(e) : void 0;
			return this._renderEventIcon(e, t);
		});
		return [...r, ...i];
	}
	_renderEventIcon(e, t) {
		let n = V(this._language(), `main.events.${e.key}`);
		return t ? T`
        <button
          class="event"
          tone=${e.tone}
          title=${n}
          aria-label=${n}
          @click=${t}
        >
          <ha-icon .icon=${e.icon}></ha-icon>
        </button>
      ` : T`
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
		return T`
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
		if (!this._activeMessageKey) return D;
		let e = this._messageIcon(this._activeMessageKey);
		return T`
      <div class="message-body" tone=${e.tone}>
        <ha-icon .icon=${e.icon}></ha-icon>
        <span>${this._messageLabel(this._activeMessageKey)}</span>
      </div>
    `;
	}
	_messageIcon(e) {
		return Gs[e] ?? {
			icon: "mdi:information-outline",
			tone: "info"
		};
	}
	_messageLabel(e) {
		return V(this._language(), `main.messages.${e}`);
	}
	_renderSetpoint() {
		return this.config?.primary_display === "sensors" ? this._renderSensorFocus() : T`<div class="setpoint">${this._renderTemperatureControl(!1)}</div>`;
	}
	_renderSensorFocus() {
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return T`
      <div class="setpoint" sensor-focus>
        <div class="sensor-primary">
          <span
            class="sensor-temperature"
            ?clickable=${!!n}
            @click=${n ? () => this._openMoreInfo(n) : D}
          >
            <ha-icon icon="mdi:thermometer"></ha-icon>
            <span>${this._formatCurrentTempValue()}</span>
            <span class="sensor-unit">°</span>
          </span>
          ${t ? T`
                <span class="sensor-humidity" @click=${() => this._openMoreInfo(this._humidityEntityId())}>
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  <span>${this._formatPercent(e)}</span>
                </span>
              ` : D}
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
		return T`
      <div class="setpoint-control" ?compact=${e}>
        <ha-control-button
          class="step"
          .label=${V(this._language(), "main.actions.decrease_temperature")}
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
          .label=${V(this._language(), "main.actions.increase_temperature")}
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
		return T`
      <div class="range-setpoint-control" mode=${n ? "heat-cool" : "range"} ?compact=${e}>
        ${n ? T`
              ${this._renderRangeBound("high", t?.high, e)}
              ${this._renderRangeBound("low", t?.low, e)}
            ` : T`
              ${this._renderRangeBound("low", t?.low, e)}
              ${this._renderRangeBound("high", t?.high, e)}
            `}
      </div>
    `;
	}
	_renderRangeBound(e, t, n) {
		let r = this._isControlDisabled() || !q(t), i = this._rangeBoundLabel(e), a = this._rangeSetpointFallback(e), o = a.length || 4, s = this._rangeBoundTone(e);
		return T`
      <div class="range-bound">
        ${i ? T`<span class="range-label">${i}</span>` : D}
        <div class="setpoint-control" ?compact=${n}>
          <ha-control-button
            class="step"
            .label=${V(this._language(), "main.actions.decrease_temperature")}
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
            .label=${V(this._language(), "main.actions.increase_temperature")}
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
		return V(this._language(), t);
	}
	_rangeBoundTone(e) {
		return this.viewModel?.climate.hvacMode === "heat_cool" && this.viewModel.climate.availability === "available" ? e === "high" ? "cool" : "heat" : this._targetTone();
	}
	_renderConditions() {
		if (this.config?.primary_display === "sensors") return D;
		let e = this.viewModel?.climate.currentHumidity, t = q(e), n = this.viewModel?.climate.temperatureEntityId;
		return T`
      <div class="conditions">
        <span
          class="condition"
          ?clickable=${!!n}
          @click=${n ? () => this._openMoreInfo(n) : D}
        >
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <span class="condition-value" kind="temperature">${this._formatCurrentTemp()}</span>
        </span>
        ${t ? T`
            <span class="divider"></span>
            <span class="condition" clickable @click=${() => this._openMoreInfo(this._humidityEntityId())}>
              <ha-icon icon="mdi:water-percent"></ha-icon>
              <span class="condition-value" kind="humidity">${this._formatPercent(e)}</span>
            </span>
          ` : D}
      </div>
    `;
	}
	_renderHvacModes() {
		let e = this._visibleHvacModes();
		return e.length === 0 ? D : T`<div class="segments" style=${e.length < 3 ? `width: calc(100% / 3 * ${e.length}); margin-inline: auto;` : ""}>${e.map((e) => this._renderHvacButton(e))}</div>`;
	}
	_renderHvacButton(e) {
		return T`
      <ha-control-button
        .label=${this._hvacLabel(e)}
        tone=${this._modeTone(e)}
        ?active=${this.viewModel?.climate.hvacMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setHvacMode(e)}
      >
        <span class="btn-icon" tone=${this._modeTone(e)}>
          <ha-icon .icon=${Ja[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderPresets() {
		let e = this._visiblePresetModes();
		return e.length === 0 ? D : T`<div class="segments">${e.map((e) => this._renderPresetButton(e))}</div>`;
	}
	_renderPresetButton(e) {
		return T`
      <ha-control-button
        .label=${this._presetLabel(e)}
        tone=${this._presetTone(e)}
        ?active=${this.viewModel?.climate.presetMode === e}
        ?subtle=${!0}
        ?disabled=${this._isControlDisabled()}
        @click=${() => this._setPresetMode(e)}
      >
        <span class="btn-icon" tone=${this._presetTone(e)}>
          <ha-icon .icon=${B[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderCompactSelectors() {
		let e = this.viewModel?.climate.hvacMode, t = this.viewModel?.climate.presetMode, n = this._visibleHvacModes(), r = e && n.includes(e) ? e : void 0, i = n.length > 0, a = this._visiblePresetModes().length > 0, o = t && t !== "none" && B[t] ? B[t] : "mdi:hand-back-right-outline", s = !!t && t !== "none" && !!B[t], c = this._hasFanControl(), l = this._hasSwingControl(), u = +!!i + +!!a + +!!c + +!!l;
		return u === 0 ? D : T`
      <div class="compact-selectors" style=${u < 4 ? `width: calc(100% / 3 * ${u}); margin-inline: auto;` : ""}>
        ${i ? T`
              <ha-control-button
                .label=${r ? this._hvacLabel(r) : V(this._language(), "dialog.hvac.title")}
                tone=${this._modeTone(r)}
                ?active=${r !== "off" && !!r}
                ?subtle=${!0}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("hvac", e)}
              >
                <span class="btn-icon" tone=${this._modeTone(r)}>
                  <ha-icon .icon=${r ? Ja[r] : "mdi:thermostat"}></ha-icon>
                </span>
              </ha-control-button>
            ` : D}
        ${a ? T`
              <ha-control-button
                .label=${t && t !== "none" ? this._presetLabel(t) : V(this._language(), "main.preset.none")}
                tone=${s ? this._presetTone(t) : ""}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("preset", e)}
              >
                <span class="btn-icon" tone=${s ? this._presetTone(t) : ""}>
                  <ha-icon .icon=${o}></ha-icon>
                </span>
              </ha-control-button>
            ` : D}
        ${c ? T`
              <ha-control-button
                class="fan-selector"
                .label=${this._fanLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("fan", e)}
              >
                <span class="btn-icon" tone=${this._fanRailTone()}>
                  <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
                </span>
              </ha-control-button>
            ` : D}
        ${l ? T`
              <ha-control-button
                class="swing-selector"
                .label=${this._swingLabel()}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("swing", e)}
              >
                <span class="btn-icon" tone=${this._swingRailTone()}>
                  <ha-icon .icon=${this._swingIcon()}></ha-icon>
                </span>
              </ha-control-button>
            ` : D}
      </div>
    `;
	}
	_hasPowerInfo() {
		let e = this._powerValveValue(), t = this.viewModel?.vt?.powerValve.instantPower ?? this.viewModel?.climate.instantPower;
		return !!e || q(t);
	}
	_renderPowerInfoButton() {
		if (!this._hasPowerInfo()) return D;
		let e = V(this._language(), "main.actions.open_power_info");
		return T`
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
		return T`
      <button class="fan" tone=${this._fanRailTone()} title=${V(this._language(), "main.actions.open_fan")} aria-label=${V(this._language(), "main.actions.open_fan")} @click=${(e) => this._openDialog("fan", e)}>
        <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
	}
	_renderSwingButton() {
		let e = V(this._language(), "main.actions.open_swing");
		return T`
      <button class="swing" tone=${this._swingRailTone()} title=${e} aria-label=${e} @click=${(e) => this._openDialog("swing", e)}>
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
		return !e && !q(t) ? D : T`
      <div class="meter">
        ${e ? T`<span class="meter-line"><ha-icon .icon=${e.icon}></ha-icon><span>${e.label}</span></span>` : D}
        ${q(t) ? T`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(t)}${n ? ` ${n}` : ""}</span></span>` : D}
      </div>
    `;
	}
	_renderMenuButton() {
		return T`
      <button class="menu" title=${V(this._language(), "main.actions.open_menu")} aria-label=${V(this._language(), "main.actions.open_menu")} @click=${(e) => this._openDialog("menu", e)}>
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
		return e ? Ya[e] ?? "" : "";
	}
	_presetTone(e) {
		return this.viewModel?.climate.availability === "available" ? Lo(e, this.viewModel?.climate.hvacMode) : "off";
	}
	_hidePreset(e) {
		let t = this.viewModel?.climate.hvacMode;
		return e === "frost" && t !== "heat";
	}
	_visibleHvacModes() {
		let e = new Set(this.config?.hidden_hvac_modes ?? []);
		return Qs(this.viewModel?.climate.hvacModes ?? [], qa).filter((t) => Ja[t] && !e.has(t));
	}
	_visiblePresetModes() {
		let e = new Set(this.config?.hidden_preset_modes ?? []);
		return Qs(this.viewModel?.climate.presetModes ?? [], Xa).filter((t) => t !== "none" && B[t] && !this._hidePreset(t) && !e.has(t));
	}
	_fanIcon() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;
		return e ? Vo[e] ?? "mdi:fan-speed-2" : "mdi:fan-speed-2";
	}
	_fanRailTone() {
		if (this.viewModel?.climate.availability !== "available") return "off";
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode;
		return e ? Ro(e) : "fan";
	}
	_swingRailTone() {
		if (this.viewModel?.climate.availability !== "available") return "off";
		let e = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;
		return e ? zo(e) : "swing";
	}
	_fanIconClass() {
		let e = this._fanIcon();
		return e === "mdi:fan-auto" ? "fan-icon-auto" : e === "mdi:fan-speed-2" ? "fan-icon-speed" : "";
	}
	_fanLabel() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode ?? (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : void 0);
		return e ? this._optionLabel("main.fan", e) : V(this._language(), "main.fan.unavailable");
	}
	_swingIcon() {
		let e = this.viewModel?.climate.swingMode, t = this.viewModel?.climate.swingHorizontalMode;
		return e ? Qa[e] ?? "mdi:arrow-oscillating" : t ? $a[t] ?? Qa[t] ?? "mdi:arrow-expand-horizontal" : "mdi:arrow-oscillating";
	}
	_swingLabel() {
		let e = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;
		return e ? this._optionLabel("main.swing", e) : V(this._language(), "main.swing.unavailable");
	}
	_hvacLabel(e) {
		return !e || this.viewModel?.climate.availability !== "available" ? V(this._language(), "main.status.unavailable") : e === "off" ? V(this._language(), "main.status.off") : this._optionLabel("main.hvac", e);
	}
	_presetLabel(e) {
		return this._optionLabel("main.preset", e);
	}
	_optionLabel(e, t) {
		let n = V(this._language(), `${e}.${t}`);
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
		}).format(a), wo({
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
		}).format(a[n]), wo({
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
		wo({
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
		i && wo({
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
		!this.hass || !this.config || !this.viewModel || To({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e);
	}
	_setPresetMode(e) {
		!this.hass || !this.config || !this.viewModel || Eo({
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
			Po(e);
			return;
		}
		No(e);
	}
};
customElements.get("eq-main-card") || customElements.define("eq-main-card", $s);
//#endregion
//#region src/data/format.ts
var ec = new Set(["unknown", "unavailable"]);
function tc(e) {
	return e == null || typeof e == "string" && ec.has(e);
}
function J(e) {
	if (!(tc(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Y(e) {
	if (tc(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function nc(e) {
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
function rc(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string" && e.trim() !== "") : typeof e == "string" && e.trim() !== "" ? [e] : [];
}
function ic(e) {
	return e === "safety_detected" || e === "heating_failure" || e === "cooling_failure" ? "danger" : e === "overpowering_detected" || e === "not_initialized" ? "alert" : "info";
}
function ac(e) {
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
function oc(e) {
	let t = J(Q(e, ["configuration", "type"])), n = [];
	return (e.is_over_switch === !0 || t === "over_switch") && n.push("over_switch"), (e.is_over_valve === !0 || t === "over_valve") && n.push("over_valve"), (e.is_over_climate === !0 || t === "over_climate") && n.push("over_climate"), (Q(e, ["vtherm_over_climate_valve", "have_valve_regulation"]) === !0 || Q(e, ["configuration", "have_valve_regulation"]) === !0) && n.push("over_climate_valve"), n;
}
function sc(e) {
	let t = rc(Q(e, ["specific_states", "messages"]));
	return Q(e, ["safety_manager", "safety_state"]) === "on" && t.push("safety_detected"), Q(e, ["heating_failure_detection_manager", "heating_failure_state"]) === "on" && t.push("heating_failure"), Q(e, ["heating_failure_detection_manager", "cooling_failure_state"]) === "on" && t.push("cooling_failure"), Q(e, ["power_manager", "overpowering_state"]) === "on" && t.push("overpowering_detected"), [...new Set(t)].map((e) => ({
		key: e,
		severity: ic(e)
	}));
}
function cc(e) {
	return X(J(Q(e, ["configuration", "proportional_function"])), J(Q(e, ["vtherm_over_valve", "function"])), J(Q(e, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"function"
	])), J(Q(e, ["specific_states", "proportional_function"])));
}
function lc(e, t, n) {
	let r = n.attributes, i = Z(r.specific_states), a = oc(r);
	if (!(a.length > 0 || i !== void 0 || Z(r.configuration) !== void 0)) return;
	let o = ac(r), s = X(Y(Q(r, ["vtherm_over_switch", "power_percent"])), Y(Q(r, [
		"vtherm_over_climate",
		"valve_regulation",
		"power_percent"
	])), Y(r.power_percent)), c = X(Y(Q(r, ["vtherm_over_valve", "valve_open_percent"])), Y(Q(r, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"valve_open_percent"
	])), Y(r.valve_open_percent)), l = Q(r, ["timed_preset_manager", "is_active"]) === !0, u = X(Q(r, ["lock_manager", "is_locked"]) === !0 ? !0 : void 0, Q(r, ["specific_states", "is_locked"]) === !0 ? !0 : void 0) === !0, d = sc(r), f = J(Q(r, ["vtherm_over_climate", "auto_fan_mode"])), p = J(Q(r, ["vtherm_over_climate", "current_auto_fan_mode"])), m = e.power_entity ? t.states[e.power_entity] : void 0, h = J(Q(r, ["requested_state", "hvac_mode"]));
	return {
		isVt: !0,
		types: a,
		configuration: {
			type: J(Q(r, ["configuration", "type"])),
			proportionalFunction: cc(r),
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
function uc(e) {
	return typeof e == "object" && e ? e : void 0;
}
function dc(e, t) {
	return t.reduce((e, t) => uc(e)?.[t], e);
}
function fc(e) {
	return e.state === "unavailable" ? "unavailable" : e.state === "unknown" ? "unknown" : "available";
}
function pc(e, t, n) {
	return X(Y(n.humidity), e.humidity_entity ? Y(t.states[e.humidity_entity]?.state) : void 0);
}
function mc(e, t) {
	if (!e.temperature_entity) return;
	let n = t.states[e.temperature_entity]?.state;
	if (!n || tc(n)) return;
	let r = parseFloat(n);
	if (!Number.isFinite(r)) return;
	let i = n.indexOf(".");
	return {
		value: r,
		decimals: i >= 0 ? n.length - i - 1 : 0,
		entityId: e.temperature_entity
	};
}
function hc(e, t) {
	if (!e.power_entity) return {};
	let n = t.states[e.power_entity];
	return {
		instantPower: Y(n?.state),
		instantPowerUnit: J(n?.attributes.unit_of_measurement)
	};
}
function gc(e, t, n) {
	let r = n.attributes, i = mc(e, t), a = X(tc(n.state) ? void 0 : n.state, J(r.hvac_mode), J(dc(r, ["current_state", "hvac_mode"]))), o = X(J(r.preset_mode), J(dc(r, ["current_state", "preset"]))), s = a === "cool" && o === "frost" ? "none" : o;
	return {
		entityId: n.entity_id,
		name: e.name ?? J(r.friendly_name),
		availability: fc(n),
		hvacMode: a,
		hvacAction: J(r.hvac_action),
		targetTemperature: X(Y(r.temperature), Y(dc(r, ["current_state", "target_temperature"]))),
		currentTemperature: i?.value ?? Y(r.current_temperature),
		currentTemperatureDecimals: i?.decimals,
		temperatureEntityId: i?.entityId,
		currentHumidity: pc(e, t, r),
		hvacModes: nc(r.hvac_modes),
		presetModes: nc(r.preset_modes),
		presetMode: s,
		fanMode: J(r.fan_mode),
		fanModes: nc(r.fan_modes),
		swingMode: J(r.swing_mode),
		swingModes: nc(r.swing_modes),
		swingHorizontalMode: J(r.swing_horizontal_mode),
		swingHorizontalModes: nc(r.swing_horizontal_modes),
		minTemp: Y(r.min_temp),
		maxTemp: Y(r.max_temp),
		targetTempStep: X(Y(r.target_temp_step), Y(dc(r, ["configuration", "target_temperature_step"])), .5),
		targetTemperatureRange: {
			low: Y(r.target_temp_low),
			high: Y(r.target_temp_high)
		},
		...hc(e, t)
	};
}
function _c(e, t, n) {
	return {
		climate: gc(e, t, n),
		vt: lc(e, t, n)
	};
}
//#endregion
//#region src/data/config.ts
function vc(e) {
	return typeof e == "string";
}
function yc(e, t) {
	return vc(t) && e.includes(t);
}
function bc(e) {
	return e.startsWith("climate.");
}
function xc(e) {
	if (!Array.isArray(e)) return;
	let t = [...new Set(e.filter(vc).map((e) => e.trim()).filter((e) => e.length > 0))];
	return t.length > 0 ? t : void 0;
}
function Sc(e) {
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
function Cc(e) {
	if (e == null || e === "") return;
	let t = Number(e);
	if (Number.isFinite(t)) return Math.min(100, Math.max(0, t));
}
function wc(e) {
	let t = {
		..._o,
		...e,
		type: za
	};
	if (delete t.card_height, !vc(t.entity) || t.entity.trim() === "") return {
		config: t,
		error: "missing_entity"
	};
	if (t.entity = t.entity.trim(), !bc(t.entity)) return {
		config: t,
		error: "invalid_entity"
	};
	if (!yc(fo, t.theme)) return {
		config: t,
		error: "invalid_theme"
	};
	if (!yc(po, t.display_mode)) return {
		config: t,
		error: "invalid_display_mode"
	};
	if (!yc(mo, t.primary_display)) return {
		config: t,
		error: "invalid_primary_display"
	};
	if (!yc(ho, t.additional_dashboards)) return {
		config: t,
		error: "invalid_additional_dashboards"
	};
	if (!yc(go, t.state_icons_layout)) return {
		config: t,
		error: "invalid_state_icons_layout"
	};
	let n = Sc(t.card_background_color);
	n ? t.card_background_color = n : delete t.card_background_color;
	let r = Cc(t.card_background_opacity);
	r === void 0 ? delete t.card_background_opacity : t.card_background_opacity = r;
	let i = xc(t.hidden_hvac_modes), a = xc(t.hidden_preset_modes);
	return i ? t.hidden_hvac_modes = i : delete t.hidden_hvac_modes, a ? t.hidden_preset_modes = a : delete t.hidden_preset_modes, { config: t };
}
//#endregion
//#region src/equinox-card.ts
La(Va);
var Tc = {
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
	he: "כרטיס Lovelace עבור Versatile Thermostat וישויות climate סטנדרטיות.",
	hu: "Lovelace kártya a sokoldalú termosztáthoz és standard klímaentitásokhoz.",
	it: "Scheda Lovelace per Termostato Versatile e entità climatiche standard.",
	nl: "Lovelace-kaart voor Versatile Thermostat en standaard klimaatentiteiten.",
	no: "Lovelace-kort for Versatile Thermostat og standard klimaenheter.",
	pl: "Karta Lovelace dla Versatile Thermostat i standardowych jednostek klimatyzacyjnych.",
	pt: "Placa Lovelace para Termostato Versátil e entidades climáticas padrão.",
	ru: "Карточка Lovelace для Versatile Thermostat и стандартных сущностей климата.",
	sk: "Karta Lovelace pre Versatile Thermostat a štandardné klimatizačné entity."
};
function Ec(e) {
	return Tc[e.toLowerCase().split("-")[0] || "en"] ?? Tc.en;
}
var Dc = class extends O {
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
			type: za,
			entity: Object.keys(e?.states ?? {}).find((e) => e.startsWith("climate.")) ?? "climate.example"
		};
	}
	setConfig(e) {
		this._validation = wc(e);
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
			rows: "auto",
			min_columns: 4,
			max_columns: 12,
			min_rows: 3
		};
	}
	_language() {
		return (this.hass?.locale?.language ?? this.hass?.language ?? "en").toLowerCase().split("-")[0] || "en";
	}
	render() {
		let e = this._language();
		if (!this._validation) return this._renderMessage(V(e, "card.missing_entity"), !0);
		if (this._validation.error) return this._renderMessage(V(e, `card.${this._validation.error}`), !0);
		let t = this._validation.config.entity;
		if (!t) return this._renderMessage(V(e, "card.missing_entity"), !0);
		let n = this.hass?.states[t];
		return this.hass && !n ? this._renderMessage(V(e, "card.entity_not_found", { entity: t }), !0) : T`
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
		if (t) return _c(e, this.hass, t);
	}
	_renderMessage(e, t = !1) {
		return T`
      <ha-card>
        <div class=${t ? "error" : ""}>${e}</div>
      </ha-card>
    `;
	}
};
customElements.get("equinox-card") || customElements.define(Ba, Dc), window.customCards = window.customCards ?? [];
var Oc = window.customCards;
Oc.filter((e) => e.type === "equinox-card" || e.type === "custom:equinox-card" || e.name === "Equinox").forEach((e) => {
	Oc.splice(Oc.indexOf(e), 1);
}), Oc.push({
	type: Ba,
	name: Ra,
	description: Ec(navigator.language),
	preview: !0,
	documentationURL: "https://github.com/KipK/equinox#readme"
});
//#endregion
export { Dc as EquinoxCard };
