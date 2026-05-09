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
var ie = globalThis, b = (e) => e, ae = ie.trustedTypes, oe = ae ? ae.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, se = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, ce = "?" + x, le = `<${ce}>`, ue = document, de = () => ue.createComment(""), fe = (e) => e === null || typeof e != "object" && typeof e != "function", pe = Array.isArray, me = (e) => pe(e) || typeof e?.[Symbol.iterator] == "function", he = "[ 	\n\f\r]", ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, ve = />/g, ye = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, xe = /"/g, Se = /^(?:script|style|textarea|title)$/i, S = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), Ce = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), Te = ue.createTreeWalker(ue, 129);
function Ee(e, t) {
	if (!pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return oe === void 0 ? t : oe.createHTML(t);
}
var De = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ge ? c[1] === "!--" ? o = _e : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ye) : (Se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ye) : o = ve : o === ye ? c[0] === ">" ? (o = i ?? ge, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ye : c[3] === "\"" ? xe : be) : o === xe || o === be ? o = ye : o === _e || o === ve ? o = ge : (o = ye, i = void 0);
		let d = o === ye && e[t + 1].startsWith("/>") ? " " : "";
		a += o === ge ? n + le : l >= 0 ? (r.push(s), n.slice(0, l) + se + n.slice(l) + x + d) : n + x + (l === -2 ? t : d);
	}
	return [Ee(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Oe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = De(t, n);
		if (this.el = e.createElement(l, r), Te.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Te.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(se)) {
					let t = u[o++], n = i.getAttribute(e).split(x), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ne : r[1] === "?" ? Pe : r[1] === "@" ? Fe : Me
					}), i.removeAttribute(e);
				} else e.startsWith(x) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Se.test(i.tagName)) {
					let e = i.textContent.split(x), t = e.length - 1;
					if (t > 0) {
						i.textContent = ae ? ae.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], de()), Te.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], de());
					}
				}
			} else if (i.nodeType === 8) if (i.data === ce) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(x, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += x.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = ue.createElement("template");
		return n.innerHTML = e, n;
	}
};
function ke(e, t, n = e, r) {
	if (t === Ce) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = fe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = ke(e, i._$AS(e, t.values), i, r)), t;
}
var Ae = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? ue).importNode(t, !0);
		Te.currentNode = r;
		let i = Te.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new je(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ie(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Te.nextNode(), a++);
		}
		return Te.currentNode = ue, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, je = class e {
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
		e = ke(this, e, t), fe(e) ? e === C || e == null || e === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : e !== this._$AH && e !== Ce && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? me(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== C && fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ue.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Oe.createElement(Ee(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ae(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new Oe(e)), t;
	}
	k(t) {
		pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(de()), this.O(de()), this, this.options)) : r = n[i], r._$AI(a), i++;
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
}, Me = class {
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
		if (i === void 0) e = ke(this, e, t, 0), a = !fe(e) || e !== this._$AH && e !== Ce, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = ke(this, r[n + o], t, o), s === Ce && (s = this._$AH[o]), a ||= !fe(s) || s !== this._$AH[o], s === C ? e = C : e !== C && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ne = class extends Me {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === C ? void 0 : e;
	}
}, Pe = class extends Me {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== C);
	}
}, Fe = class extends Me {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = ke(this, e, t, 0) ?? C) === Ce) return;
		let n = this._$AH, r = e === C && n !== C || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== C && (n === C || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ie = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		ke(this, e);
	}
}, Le = ie.litHtmlPolyfillSupport;
Le?.(Oe, je), (ie.litHtmlVersions ??= []).push("3.3.2");
var Re = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new je(t.insertBefore(de(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ze = globalThis, w = class extends y {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Re(t, this.renderRoot, this.renderOptions);
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
w._$litElement$ = !0, w.finalized = !0, ze.litElementHydrateSupport?.({ LitElement: w });
var Be = ze.litElementPolyfillSupport;
Be?.({ LitElement: w }), (ze.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/const.ts
var Ve = "Equinox", He = "custom:equinox-card", Ue = "equinox-card", We = "equinox-card-editor", Ge = "flat", Ke = "classic", qe = "setpoint", Je = "auto", Ye = [
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
], Xe = async (e) => {
	let t = e || Ye;
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
}, Ze = [
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
], Qe;
function $e() {
	return Qe ??= Xe(Ze), Qe;
}
//#endregion
//#region src/localize/localize.ts
var et = {
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
				top: "Top",
				Top: "Top",
				FAN_TOP: "Top",
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
			swing: {
				off: "Off",
				Off: "Off",
				SWING_OFF: "Off",
				on: "On",
				On: "On",
				SWING_ON: "On",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Both",
				Both: "Both",
				SWING_BOTH: "Both",
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
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			tabs: {
				general: "General",
				presentation: "Presentation"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
				top: "Maximale",
				Top: "Maximale",
				FAN_TOP: "Maximale",
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
			swing: {
				off: "Éteint",
				Off: "Éteint",
				SWING_OFF: "Éteint",
				on: "Activé",
				On: "Activé",
				SWING_ON: "Activé",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Complet",
				Both: "Complet",
				SWING_BOTH: "Complet",
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
			disable_name: "Masquer le nom",
			hide_lock_button: "Masquer le bouton de verrouillage",
			additional_dashboards: "Dashboards additionnels",
			state_icons_layout: "Icônes d'état",
			tabs: {
				general: "Général",
				presentation: "Présentation"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
				On: "An",
				FAN_ON: "An",
				auto: "Automatisch",
				Auto: "Automatisch",
				FAN_AUTO: "Automatisch",
				low: "Niedrig",
				FAN_LOW: "Niedrig",
				medium: "Mittel",
				FAN_MEDIUM: "Mittel",
				middle: "Mitte",
				Middle: "Mitte",
				FAN_MIDDLE: "Mitte",
				high: "Hoch",
				FAN_HIGH: "Hoch",
				top: "Oben",
				Top: "Oben",
				FAN_TOP: "Oben",
				off: "Aus",
				Off: "Aus",
				FAN_OFF: "Aus",
				focus: "Fokus",
				Focus: "Fokus",
				FAN_FOCUS: "Fokus",
				diffuse: "Diffus",
				Diffuse: "Diffus",
				FAN_DIFFUSE: "Diffus",
				auto_fan_none: "Keine",
				auto_fan_low: "Niedrig",
				auto_fan_medium: "Mittel",
				auto_fan_high: "Hoch",
				auto_fan_turbo: "Turbo",
				None: "Keine",
				Low: "Niedrig",
				Medium: "Mittel",
				High: "Hoch",
				Turbo: "Turbo",
				unavailable: "Lüfter"
			},
			swing: {
				off: "Aus",
				Off: "Aus",
				SWING_OFF: "Aus",
				on: "An",
				On: "An",
				SWING_ON: "An",
				vertical: "Vertikal",
				Vertical: "Vertikal",
				SWING_VERTICAL: "Vertikal",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Beide",
				Both: "Beide",
				SWING_BOTH: "Beide",
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
			disable_name: "Name ausblenden",
			hide_lock_button: "Sperrschaltfläche ausblenden",
			additional_dashboards: "Zusätzliche Dashboards",
			state_icons_layout: "Statussymbole",
			tabs: {
				general: "Allgemein",
				presentation: "Präsentation"
			},
			options: {
				theme: {
					flat: "Flach",
					liquid_glow: "Liquid Glow"
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
				On: "Zapnuto",
				FAN_ON: "Zapnuto",
				auto: "Automatické",
				Auto: "Automatické",
				FAN_AUTO: "Automatické",
				low: "Nízko",
				FAN_LOW: "Nízko",
				medium: "Střední",
				FAN_MEDIUM: "Střední",
				middle: "Střed",
				Middle: "Střed",
				FAN_MIDDLE: "Střed",
				high: "Vysoko",
				FAN_HIGH: "Vysoko",
				top: "Horní",
				Top: "Horní",
				FAN_TOP: "Horní",
				off: "Vypnuto",
				Off: "Vypnuto",
				FAN_OFF: "Vypnuto",
				focus: "Zaměření",
				Focus: "Zaměření",
				FAN_FOCUS: "Zaměření",
				diffuse: "Rozptyl",
				Diffuse: "Rozptyl",
				FAN_DIFFUSE: "Rozptyl",
				auto_fan_none: "Žádný",
				auto_fan_low: "Nízko",
				auto_fan_medium: "Střední",
				auto_fan_high: "Vysoko",
				auto_fan_turbo: "Turbo",
				None: "Žádný",
				Low: "Nízko",
				Medium: "Střední",
				High: "Vysoko",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Vypnuto",
				Off: "Vypnuto",
				SWING_OFF: "Vypnuto",
				on: "Zapnuto",
				On: "Zapnuto",
				SWING_ON: "Zapnuto",
				vertical: "Vertikální",
				Vertical: "Vertikální",
				SWING_VERTICAL: "Vertikální",
				horizontal: "Horizontální",
				Horizontal: "Horizontální",
				SWING_HORIZONTAL: "Horizontální",
				both: "Oba",
				Both: "Oba",
				SWING_BOTH: "Oba",
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
			disable_name: "Skrýt název",
			hide_lock_button: "Skrýt tlačítko zámku",
			additional_dashboards: "Další přístupové panely",
			state_icons_layout: "Ikony stavu",
			tabs: {
				general: "Obecné",
				presentation: "Prezentace"
			},
			options: {
				theme: {
					flat: "Plochý",
					liquid_glow: "Liquid Glow"
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
				On: "Ενεργό",
				FAN_ON: "Ενεργό",
				auto: "Αυτόματο",
				Auto: "Αυτόματο",
				FAN_AUTO: "Αυτόματο",
				low: "Χαμηλό",
				FAN_LOW: "Χαμηλό",
				medium: "Μεσαίο",
				FAN_MEDIUM: "Μεσαίο",
				middle: "Μέση",
				Middle: "Μέση",
				FAN_MIDDLE: "Μέση",
				high: "Υψηλό",
				FAN_HIGH: "Υψηλό",
				top: "Κορυφή",
				Top: "Κορυφή",
				FAN_TOP: "Κορυφή",
				off: "Απενεργοποιημένο",
				Off: "Απενεργοποιημένο",
				FAN_OFF: "Απενεργοποιημένο",
				focus: "Εστίαση",
				Focus: "Εστίαση",
				FAN_FOCUS: "Εστίαση",
				diffuse: "Διάχυση",
				Diffuse: "Διάχυση",
				FAN_DIFFUSE: "Διάχυση",
				auto_fan_none: "Κανένα",
				auto_fan_low: "Χαμηλό",
				auto_fan_medium: "Μεσαίο",
				auto_fan_high: "Υψηλό",
				auto_fan_turbo: "Turbo",
				None: "Κανένα",
				Low: "Χαμηλό",
				Medium: "Μεσαίο",
				High: "Υψηλό",
				Turbo: "Turbo",
				unavailable: "Ανεμιστήρας"
			},
			swing: {
				off: "Απενεργοποιημένο",
				Off: "Απενεργοποιημένο",
				SWING_OFF: "Απενεργοποιημένο",
				on: "Ενεργό",
				On: "Ενεργό",
				SWING_ON: "Ενεργό",
				vertical: "Κάθετη",
				Vertical: "Κάθετη",
				SWING_VERTICAL: "Κάθετη",
				horizontal: "Οριζόντια",
				Horizontal: "Οριζόντια",
				SWING_HORIZONTAL: "Οριζόντια",
				both: "Και οι δύο",
				Both: "Και οι δύο",
				SWING_BOTH: "Και οι δύο",
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
			disable_name: "Απόκρυψη ονόματος",
			hide_lock_button: "Απόκρυψη κουμπιού κλειδώματος",
			additional_dashboards: "Πρόσθετα ταμπλό",
			state_icons_layout: "Εικονίδια κατάστασης",
			tabs: {
				general: "Γενικά",
				presentation: "Παρουσίαση"
			},
			options: {
				theme: {
					flat: "Επίπεδη",
					liquid_glow: "Liquid Glow"
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
				On: "Acceso",
				FAN_ON: "Acceso",
				auto: "Automatico",
				Auto: "Automatico",
				FAN_AUTO: "Automatico",
				low: "Basso",
				FAN_LOW: "Basso",
				medium: "Medio",
				FAN_MEDIUM: "Medio",
				middle: "Mezzo",
				Middle: "Mezzo",
				FAN_MIDDLE: "Mezzo",
				high: "Alto",
				FAN_HIGH: "Alto",
				top: "Superiore",
				Top: "Superiore",
				FAN_TOP: "Superiore",
				off: "Spento",
				Off: "Spento",
				FAN_OFF: "Spento",
				focus: "Fuoco",
				Focus: "Fuoco",
				FAN_FOCUS: "Fuoco",
				diffuse: "Diffuso",
				Diffuse: "Diffuso",
				FAN_DIFFUSE: "Diffuso",
				auto_fan_none: "Nessuno",
				auto_fan_low: "Basso",
				auto_fan_medium: "Medio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Nessuno",
				Low: "Basso",
				Medium: "Medio",
				High: "Alto",
				Turbo: "Turbo",
				unavailable: "Ventilatore"
			},
			swing: {
				off: "Spento",
				Off: "Spento",
				SWING_OFF: "Spento",
				on: "Acceso",
				On: "Acceso",
				SWING_ON: "Acceso",
				vertical: "Verticale",
				Vertical: "Verticale",
				SWING_VERTICAL: "Verticale",
				horizontal: "Orizzontale",
				Horizontal: "Orizzontale",
				SWING_HORIZONTAL: "Orizzontale",
				both: "Entrambi",
				Both: "Entrambi",
				SWING_BOTH: "Entrambi",
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
			disable_name: "Nascondi nome",
			hide_lock_button: "Nascondi pulsante blocco",
			additional_dashboards: "Dashboard aggiuntivi",
			state_icons_layout: "Icone di stato",
			tabs: {
				general: "Generale",
				presentation: "Presentazione"
			},
			options: {
				theme: {
					flat: "Piatto",
					liquid_glow: "Liquid Glow"
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
				On: "Włączony",
				FAN_ON: "Włączony",
				auto: "Automatyczne",
				Auto: "Automatyczne",
				FAN_AUTO: "Automatyczne",
				low: "Niskie",
				FAN_LOW: "Niskie",
				medium: "Średnie",
				FAN_MEDIUM: "Średnie",
				middle: "Pośrednie",
				Middle: "Pośrednie",
				FAN_MIDDLE: "Pośrednie",
				high: "Wysokie",
				FAN_HIGH: "Wysokie",
				top: "Górne",
				Top: "Górne",
				FAN_TOP: "Górne",
				off: "Wyłączony",
				Off: "Wyłączony",
				FAN_OFF: "Wyłączony",
				focus: "Skupienie",
				Focus: "Skupienie",
				FAN_FOCUS: "Skupienie",
				diffuse: "Rozproszone",
				Diffuse: "Rozproszone",
				FAN_DIFFUSE: "Rozproszone",
				auto_fan_none: "Brak",
				auto_fan_low: "Niskie",
				auto_fan_medium: "Średnie",
				auto_fan_high: "Wysokie",
				auto_fan_turbo: "Turbo",
				None: "Brak",
				Low: "Niskie",
				Medium: "Średnie",
				High: "Wysokie",
				Turbo: "Turbo",
				unavailable: "Wentylator"
			},
			swing: {
				off: "Wyłączony",
				Off: "Wyłączony",
				SWING_OFF: "Wyłączony",
				on: "Włączony",
				On: "Włączony",
				SWING_ON: "Włączony",
				vertical: "Pionowa",
				Vertical: "Pionowa",
				SWING_VERTICAL: "Pionowa",
				horizontal: "Pozioma",
				Horizontal: "Pozioma",
				SWING_HORIZONTAL: "Pozioma",
				both: "Obie",
				Both: "Obie",
				SWING_BOTH: "Obie",
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
			disable_name: "Ukryj nazwę",
			hide_lock_button: "Ukryj przycisk blokady",
			additional_dashboards: "Dodatkowe pulpity nawigacyjne",
			state_icons_layout: "Ikony stanu",
			tabs: {
				general: "Ogólne",
				presentation: "Prezentacja"
			},
			options: {
				theme: {
					flat: "Płaski",
					liquid_glow: "Liquid Glow"
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
				On: "Включено",
				FAN_ON: "Включено",
				auto: "Автоматический",
				Auto: "Автоматический",
				FAN_AUTO: "Автоматический",
				low: "Низко",
				FAN_LOW: "Низко",
				medium: "Среднее",
				FAN_MEDIUM: "Среднее",
				middle: "Середина",
				Middle: "Середина",
				FAN_MIDDLE: "Середина",
				high: "Высоко",
				FAN_HIGH: "Высоко",
				top: "Верхний",
				Top: "Верхний",
				FAN_TOP: "Верхний",
				off: "Выключено",
				Off: "Выключено",
				FAN_OFF: "Выключено",
				focus: "Фокус",
				Focus: "Фокус",
				FAN_FOCUS: "Фокус",
				diffuse: "Диффузия",
				Diffuse: "Диффузия",
				FAN_DIFFUSE: "Диффузия",
				auto_fan_none: "Нет",
				auto_fan_low: "Низко",
				auto_fan_medium: "Среднее",
				auto_fan_high: "Высоко",
				auto_fan_turbo: "Турбо",
				None: "Нет",
				Low: "Низко",
				Medium: "Среднее",
				High: "Высоко",
				Turbo: "Турбо",
				unavailable: "Вентилятор"
			},
			swing: {
				off: "Выключено",
				Off: "Выключено",
				SWING_OFF: "Выключено",
				on: "Включено",
				On: "Включено",
				SWING_ON: "Включено",
				vertical: "Вертикально",
				Vertical: "Вертикально",
				SWING_VERTICAL: "Вертикально",
				horizontal: "Горизонтально",
				Horizontal: "Горизонтально",
				SWING_HORIZONTAL: "Горизонтально",
				both: "Оба",
				Both: "Оба",
				SWING_BOTH: "Оба",
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
			disable_name: "Скрыть название",
			hide_lock_button: "Скрыть кнопку блокировки",
			additional_dashboards: "Дополнительные панели",
			state_icons_layout: "Значки состояния",
			tabs: {
				general: "Общие",
				presentation: "Презентация"
			},
			options: {
				theme: {
					flat: "Плоский",
					liquid_glow: "Liquid Glow"
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
				On: "Zapnuté",
				FAN_ON: "Zapnuté",
				auto: "Automatické",
				Auto: "Automatické",
				FAN_AUTO: "Automatické",
				low: "Nízko",
				FAN_LOW: "Nízko",
				medium: "Stredné",
				FAN_MEDIUM: "Stredné",
				middle: "Stred",
				Middle: "Stred",
				FAN_MIDDLE: "Stred",
				high: "Vysoko",
				FAN_HIGH: "Vysoko",
				top: "Horný",
				Top: "Horný",
				FAN_TOP: "Horný",
				off: "Vypnuté",
				Off: "Vypnuté",
				FAN_OFF: "Vypnuté",
				focus: "Zameranie",
				Focus: "Zameranie",
				FAN_FOCUS: "Zameranie",
				diffuse: "Rozptyl",
				Diffuse: "Rozptyl",
				FAN_DIFFUSE: "Rozptyl",
				auto_fan_none: "Žiadny",
				auto_fan_low: "Nízko",
				auto_fan_medium: "Stredné",
				auto_fan_high: "Vysoko",
				auto_fan_turbo: "Turbo",
				None: "Žiadny",
				Low: "Nízko",
				Medium: "Stredné",
				High: "Vysoko",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Vypnuté",
				Off: "Vypnuté",
				SWING_OFF: "Vypnuté",
				on: "Zapnuté",
				On: "Zapnuté",
				SWING_ON: "Zapnuté",
				vertical: "Vertikálne",
				Vertical: "Vertikálne",
				SWING_VERTICAL: "Vertikálne",
				horizontal: "Horizontálne",
				Horizontal: "Horizontálne",
				SWING_HORIZONTAL: "Horizontálne",
				both: "Oboje",
				Both: "Oboje",
				SWING_BOTH: "Oboje",
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
			disable_name: "Skryť názov",
			hide_lock_button: "Skryť tlačítko zámku",
			additional_dashboards: "Ďalšie panely",
			state_icons_layout: "Ikony stavu",
			tabs: {
				general: "Všeobecné",
				presentation: "Prezentácia"
			},
			options: {
				theme: {
					flat: "Plochý",
					liquid_glow: "Liquid Glow"
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
			}
		}
	},
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
				On: "Включено",
				FAN_ON: "Включено",
				auto: "Автоматичен",
				Auto: "Автоматичен",
				FAN_AUTO: "Автоматичен",
				low: "Нисък",
				FAN_LOW: "Нисък",
				medium: "Среден",
				FAN_MEDIUM: "Среден",
				middle: "Среда",
				Middle: "Среда",
				FAN_MIDDLE: "Среда",
				high: "Висок",
				FAN_HIGH: "Висок",
				top: "Горен",
				Top: "Горен",
				FAN_TOP: "Горен",
				off: "Изключено",
				Off: "Изключено",
				FAN_OFF: "Изключено",
				focus: "Фокус",
				Focus: "Фокус",
				FAN_FOCUS: "Фокус",
				diffuse: "Дифузия",
				Diffuse: "Дифузия",
				FAN_DIFFUSE: "Дифузия",
				auto_fan_none: "Нищо",
				auto_fan_low: "Нисък",
				auto_fan_medium: "Среден",
				auto_fan_high: "Висок",
				auto_fan_turbo: "Турбо",
				None: "Нищо",
				Low: "Нисък",
				Medium: "Среден",
				High: "Висок",
				Turbo: "Турбо",
				unavailable: "Вентилатор"
			},
			swing: {
				off: "Изключено",
				Off: "Изключено",
				SWING_OFF: "Изключено",
				on: "Включено",
				On: "Включено",
				SWING_ON: "Включено",
				vertical: "Вертикална",
				Vertical: "Вертикална",
				SWING_VERTICAL: "Вертикална",
				horizontal: "Хоризонтална",
				Horizontal: "Хоризонтална",
				SWING_HORIZONTAL: "Хоризонтална",
				both: "И двете",
				Both: "И двете",
				SWING_BOTH: "И двете",
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
			disable_name: "Скриване на име",
			hide_lock_button: "Скриване на бутона за заключване",
			additional_dashboards: "Допълнителни панели",
			state_icons_layout: "Икони на състояние",
			tabs: {
				general: "Общи",
				presentation: "Презентация"
			},
			options: {
				theme: {
					flat: "Равен",
					liquid_glow: "Liquid Glow"
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
				top: "Top",
				Top: "Top",
				FAN_TOP: "Top",
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
			swing: {
				off: "Off",
				Off: "Off",
				SWING_OFF: "Off",
				on: "On",
				On: "On",
				SWING_ON: "On",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Both",
				Both: "Both",
				SWING_BOTH: "Both",
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
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			tabs: {
				general: "General",
				presentation: "Presentation"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
	cn: {
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
				top: "Top",
				Top: "Top",
				FAN_TOP: "Top",
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
			swing: {
				off: "Off",
				Off: "Off",
				SWING_OFF: "Off",
				on: "On",
				On: "On",
				SWING_ON: "On",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Both",
				Both: "Both",
				SWING_BOTH: "Both",
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
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			tabs: {
				general: "General",
				presentation: "Presentation"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
				top: "Top",
				Top: "Top",
				FAN_TOP: "Top",
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
			swing: {
				off: "Off",
				Off: "Off",
				SWING_OFF: "Off",
				on: "On",
				On: "On",
				SWING_ON: "On",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Both",
				Both: "Both",
				SWING_BOTH: "Both",
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
			disable_name: "Hide name",
			hide_lock_button: "Hide lock button",
			additional_dashboards: "Additional dashboards",
			state_icons_layout: "State icons",
			tabs: {
				general: "General",
				presentation: "Presentation"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
				On: "Encendido",
				FAN_ON: "Encendido",
				auto: "Automático",
				Auto: "Automático",
				FAN_AUTO: "Automático",
				low: "Bajo",
				FAN_LOW: "Bajo",
				medium: "Medio",
				FAN_MEDIUM: "Medio",
				middle: "Medio",
				Middle: "Medio",
				FAN_MIDDLE: "Medio",
				high: "Alto",
				FAN_HIGH: "Alto",
				top: "Arriba",
				Top: "Arriba",
				FAN_TOP: "Arriba",
				off: "Apagado",
				Off: "Apagado",
				FAN_OFF: "Apagado",
				focus: "Enfoque",
				Focus: "Enfoque",
				FAN_FOCUS: "Enfoque",
				diffuse: "Difuso",
				Diffuse: "Difuso",
				FAN_DIFFUSE: "Difuso",
				auto_fan_none: "Ninguno",
				auto_fan_low: "Bajo",
				auto_fan_medium: "Medio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Ninguno",
				Low: "Bajo",
				Medium: "Medio",
				High: "Alto",
				Turbo: "Turbo",
				unavailable: "Ventilador"
			},
			swing: {
				off: "Apagado",
				Off: "Apagado",
				SWING_OFF: "Apagado",
				on: "Encendido",
				On: "Encendido",
				SWING_ON: "Encendido",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Ambos",
				Both: "Ambos",
				SWING_BOTH: "Ambos",
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
			disable_name: "Ocultar nombre",
			hide_lock_button: "Ocultar botón de bloqueo",
			additional_dashboards: "Paneles adicionales",
			state_icons_layout: "Iconos de estado",
			tabs: {
				general: "General",
				presentation: "Presentación"
			},
			options: {
				theme: {
					flat: "Plano",
					liquid_glow: "Liquid Glow"
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
				On: "Päällä",
				FAN_ON: "Päällä",
				auto: "Automaattinen",
				Auto: "Automaattinen",
				FAN_AUTO: "Automaattinen",
				low: "Matala",
				FAN_LOW: "Matala",
				medium: "Keskitaso",
				FAN_MEDIUM: "Keskitaso",
				middle: "Keski",
				Middle: "Keski",
				FAN_MIDDLE: "Keski",
				high: "Korkea",
				FAN_HIGH: "Korkea",
				top: "Yläosa",
				Top: "Yläosa",
				FAN_TOP: "Yläosa",
				off: "Pois",
				Off: "Pois",
				FAN_OFF: "Pois",
				focus: "Kohdistus",
				Focus: "Kohdistus",
				FAN_FOCUS: "Kohdistus",
				diffuse: "Hajallaan",
				Diffuse: "Hajallaan",
				FAN_DIFFUSE: "Hajallaan",
				auto_fan_none: "Ei mitään",
				auto_fan_low: "Matala",
				auto_fan_medium: "Keskitaso",
				auto_fan_high: "Korkea",
				auto_fan_turbo: "Turbo",
				None: "Ei mitään",
				Low: "Matala",
				Medium: "Keskitaso",
				High: "Korkea",
				Turbo: "Turbo",
				unavailable: "Puhallinen"
			},
			swing: {
				off: "Pois",
				Off: "Pois",
				SWING_OFF: "Pois",
				on: "Päällä",
				On: "Päällä",
				SWING_ON: "Päällä",
				vertical: "Pystysuora",
				Vertical: "Pystysuora",
				SWING_VERTICAL: "Pystysuora",
				horizontal: "Vaakasuora",
				Horizontal: "Vaakasuora",
				SWING_HORIZONTAL: "Vaakasuora",
				both: "Molemmat",
				Both: "Molemmat",
				SWING_BOTH: "Molemmat",
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
			disable_name: "Piilota nimi",
			hide_lock_button: "Piilota lukituspainike",
			additional_dashboards: "Lisäkoontinäytöt",
			state_icons_layout: "Tilakuvakkeet",
			tabs: {
				general: "Yleinen",
				presentation: "Esittely"
			},
			options: {
				theme: {
					flat: "Litteä",
					liquid_glow: "Liquid Glow"
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
				On: "Be",
				FAN_ON: "Be",
				auto: "Automatikus",
				Auto: "Automatikus",
				FAN_AUTO: "Automatikus",
				low: "Alacsony",
				FAN_LOW: "Alacsony",
				medium: "Közepes",
				FAN_MEDIUM: "Közepes",
				middle: "Közép",
				Middle: "Közép",
				FAN_MIDDLE: "Közép",
				high: "Magas",
				FAN_HIGH: "Magas",
				top: "Felső",
				Top: "Felső",
				FAN_TOP: "Felső",
				off: "Ki",
				Off: "Ki",
				FAN_OFF: "Ki",
				focus: "Fókusz",
				Focus: "Fókusz",
				FAN_FOCUS: "Fókusz",
				diffuse: "Szórt",
				Diffuse: "Szórt",
				FAN_DIFFUSE: "Szórt",
				auto_fan_none: "Nincs",
				auto_fan_low: "Alacsony",
				auto_fan_medium: "Közepes",
				auto_fan_high: "Magas",
				auto_fan_turbo: "Turbo",
				None: "Nincs",
				Low: "Alacsony",
				Medium: "Közepes",
				High: "Magas",
				Turbo: "Turbo",
				unavailable: "Ventilátor"
			},
			swing: {
				off: "Ki",
				Off: "Ki",
				SWING_OFF: "Ki",
				on: "Be",
				On: "Be",
				SWING_ON: "Be",
				vertical: "Függőleges",
				Vertical: "Függőleges",
				SWING_VERTICAL: "Függőleges",
				horizontal: "Vízszintes",
				Horizontal: "Vízszintes",
				SWING_HORIZONTAL: "Vízszintes",
				both: "Mindkettő",
				Both: "Mindkettő",
				SWING_BOTH: "Mindkettő",
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
			disable_name: "Név elrejtése",
			hide_lock_button: "Zárolási gomb elrejtése",
			additional_dashboards: "További irányítópultok",
			state_icons_layout: "Állapot ikonok",
			tabs: {
				general: "Általános",
				presentation: "Bemutató"
			},
			options: {
				theme: {
					flat: "Lapos",
					liquid_glow: "Liquid Glow"
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
				On: "Aan",
				FAN_ON: "Aan",
				auto: "Automatisch",
				Auto: "Automatisch",
				FAN_AUTO: "Automatisch",
				low: "Laag",
				FAN_LOW: "Laag",
				medium: "Gemiddeld",
				FAN_MEDIUM: "Gemiddeld",
				middle: "Midden",
				Middle: "Midden",
				FAN_MIDDLE: "Midden",
				high: "Hoog",
				FAN_HIGH: "Hoog",
				top: "Bovenkant",
				Top: "Bovenkant",
				FAN_TOP: "Bovenkant",
				off: "Uit",
				Off: "Uit",
				FAN_OFF: "Uit",
				focus: "Scherpstelling",
				Focus: "Scherpstelling",
				FAN_FOCUS: "Scherpstelling",
				diffuse: "Diffuus",
				Diffuse: "Diffuus",
				FAN_DIFFUSE: "Diffuus",
				auto_fan_none: "Geen",
				auto_fan_low: "Laag",
				auto_fan_medium: "Gemiddeld",
				auto_fan_high: "Hoog",
				auto_fan_turbo: "Turbo",
				None: "Geen",
				Low: "Laag",
				Medium: "Gemiddeld",
				High: "Hoog",
				Turbo: "Turbo",
				unavailable: "Ventilator"
			},
			swing: {
				off: "Uit",
				Off: "Uit",
				SWING_OFF: "Uit",
				on: "Aan",
				On: "Aan",
				SWING_ON: "Aan",
				vertical: "Verticaal",
				Vertical: "Verticaal",
				SWING_VERTICAL: "Verticaal",
				horizontal: "Horizontaal",
				Horizontal: "Horizontaal",
				SWING_HORIZONTAL: "Horizontaal",
				both: "Beide",
				Both: "Beide",
				SWING_BOTH: "Beide",
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
			disable_name: "Naam verbergen",
			hide_lock_button: "Vergrendelingsknop verbergen",
			additional_dashboards: "Aanvullende dashboards",
			state_icons_layout: "Statuspictogrammen",
			tabs: {
				general: "Algemeen",
				presentation: "Presentatie"
			},
			options: {
				theme: {
					flat: "Plat",
					liquid_glow: "Liquid Glow"
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
				On: "På",
				FAN_ON: "På",
				auto: "Automatisk",
				Auto: "Automatisk",
				FAN_AUTO: "Automatisk",
				low: "Lav",
				FAN_LOW: "Lav",
				medium: "Medium",
				FAN_MEDIUM: "Medium",
				middle: "Midt",
				Middle: "Midt",
				FAN_MIDDLE: "Midt",
				high: "Høy",
				FAN_HIGH: "Høy",
				top: "Topp",
				Top: "Topp",
				FAN_TOP: "Topp",
				off: "Av",
				Off: "Av",
				FAN_OFF: "Av",
				focus: "Fokus",
				Focus: "Fokus",
				FAN_FOCUS: "Fokus",
				diffuse: "Diffus",
				Diffuse: "Diffus",
				FAN_DIFFUSE: "Diffus",
				auto_fan_none: "Ingen",
				auto_fan_low: "Lav",
				auto_fan_medium: "Medium",
				auto_fan_high: "Høy",
				auto_fan_turbo: "Turbo",
				None: "Ingen",
				Low: "Lav",
				Medium: "Medium",
				High: "Høy",
				Turbo: "Turbo",
				unavailable: "Vifte"
			},
			swing: {
				off: "Av",
				Off: "Av",
				SWING_OFF: "Av",
				on: "På",
				On: "På",
				SWING_ON: "På",
				vertical: "Vertikal",
				Vertical: "Vertikal",
				SWING_VERTICAL: "Vertikal",
				horizontal: "Horisontal",
				Horizontal: "Horisontal",
				SWING_HORIZONTAL: "Horisontal",
				both: "Begge",
				Both: "Begge",
				SWING_BOTH: "Begge",
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
			disable_name: "Skjul navn",
			hide_lock_button: "Skjul låseknapp",
			additional_dashboards: "Tilleggssamler",
			state_icons_layout: "Tilstands ikoner",
			tabs: {
				general: "Generelt",
				presentation: "Presentasjon"
			},
			options: {
				theme: {
					flat: "Flat",
					liquid_glow: "Liquid Glow"
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
				On: "Ligado",
				FAN_ON: "Ligado",
				auto: "Automático",
				Auto: "Automático",
				FAN_AUTO: "Automático",
				low: "Baixo",
				FAN_LOW: "Baixo",
				medium: "Médio",
				FAN_MEDIUM: "Médio",
				middle: "Meio",
				Middle: "Meio",
				FAN_MIDDLE: "Meio",
				high: "Alto",
				FAN_HIGH: "Alto",
				top: "Superior",
				Top: "Superior",
				FAN_TOP: "Superior",
				off: "Desligado",
				Off: "Desligado",
				FAN_OFF: "Desligado",
				focus: "Foco",
				Focus: "Foco",
				FAN_FOCUS: "Foco",
				diffuse: "Difuso",
				Diffuse: "Difuso",
				FAN_DIFFUSE: "Difuso",
				auto_fan_none: "Nenhum",
				auto_fan_low: "Baixo",
				auto_fan_medium: "Médio",
				auto_fan_high: "Alto",
				auto_fan_turbo: "Turbo",
				None: "Nenhum",
				Low: "Baixo",
				Medium: "Médio",
				High: "Alto",
				Turbo: "Turbo",
				unavailable: "Ventilador"
			},
			swing: {
				off: "Desligado",
				Off: "Desligado",
				SWING_OFF: "Desligado",
				on: "Ligado",
				On: "Ligado",
				SWING_ON: "Ligado",
				vertical: "Vertical",
				Vertical: "Vertical",
				SWING_VERTICAL: "Vertical",
				horizontal: "Horizontal",
				Horizontal: "Horizontal",
				SWING_HORIZONTAL: "Horizontal",
				both: "Ambos",
				Both: "Ambos",
				SWING_BOTH: "Ambos",
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
			disable_name: "Ocultar nome",
			hide_lock_button: "Ocultar botão de bloqueio",
			additional_dashboards: "Painéis adicionais",
			state_icons_layout: "Ícones de estado",
			tabs: {
				general: "Geral",
				presentation: "Apresentação"
			},
			options: {
				theme: {
					flat: "Plano",
					liquid_glow: "Liquid Glow"
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
			}
		}
	}
};
function tt(e) {
	return (e ?? "en").toLowerCase().split("-")[0] || "en";
}
function nt(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : void 0;
}
function rt(e, t) {
	return Object.entries(t).reduce((e, [t, n]) => e.replaceAll(`{${t}}`, String(n)), e);
}
function T(e, t, n = {}) {
	return rt(nt(et[tt(e)] ?? et.en, t) ?? nt(et.en, t) ?? t, n);
}
//#endregion
//#region src/types/config.ts
var it = ["flat", "liquid_glow"], at = ["classic", "compact"], ot = ["setpoint", "sensors"], st = [
	"auto",
	"custom",
	"disabled"
], ct = ["horizontal", "vertical"], lt = {
	theme: Ge,
	display_mode: Ke,
	primary_display: qe,
	disable_name: !1,
	hide_lock_button: !1,
	additional_dashboards: Je,
	state_icons_layout: "horizontal"
};
//#endregion
//#region src/equinox-card-editor.ts
$e();
function ut(e) {
	let t = { ...e };
	return delete t.card_height, t;
}
var dt = class extends w {
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
		this._config = ut(e);
	}
	render() {
		let e = this.hass?.locale?.language ?? this.hass?.language, t = {
			...lt,
			...this._config
		};
		return S`
      <div class="tabs">
        <button class="tab" ?active=${this._activeTab === "general"} @click=${() => {
			this._activeTab = "general";
		}}>
          ${T(e, "editor.tabs.general")}
        </button>
        <button class="tab" ?active=${this._activeTab === "presentation"} @click=${() => {
			this._activeTab = "presentation";
		}}>
          ${T(e, "editor.tabs.presentation")}
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
				name: "additional_dashboards",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "auto",
							label: T(e, "editor.options.additional_dashboards.auto")
						},
						{
							value: "custom",
							label: T(e, "editor.options.additional_dashboards.custom")
						},
						{
							value: "disabled",
							label: T(e, "editor.options.additional_dashboards.disabled")
						}
					]
				} }
			}
		];
	}
	_presentationSchema(e) {
		let t = [{
			value: "horizontal",
			label: T(e, "editor.options.layout_orientation.horizontal")
		}, {
			value: "vertical",
			label: T(e, "editor.options.layout_orientation.vertical")
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
						label: T(e, "editor.options.theme.flat")
					}, {
						value: "liquid_glow",
						label: T(e, "editor.options.theme.liquid_glow")
					}]
				} }
			},
			{
				name: "display_mode",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "classic",
						label: T(e, "editor.options.display_mode.classic")
					}, {
						value: "compact",
						label: T(e, "editor.options.display_mode.compact")
					}]
				} }
			},
			{
				name: "primary_display",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "setpoint",
						label: T(e, "editor.options.primary_display.setpoint")
					}, {
						value: "sensors",
						label: T(e, "editor.options.primary_display.sensors")
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
				name: "hide_lock_button",
				selector: { boolean: {} }
			}
		];
	}
	_computeLabel(e) {
		return (t) => T(e, `editor.${t.name}`);
	}
	_valueChanged(e) {
		this._config = ut({
			...this._config,
			...e.detail.value
		}), this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: this._config },
			bubbles: !0,
			composed: !0
		}));
	}
};
customElements.get("equinox-card-editor") || customElements.define(We, dt);
//#endregion
//#region src/data/actions.ts
var ft = {
	auto_fan_none: "None",
	auto_fan_low: "Low",
	auto_fan_medium: "Medium",
	auto_fan_high: "High",
	auto_fan_turbo: "Turbo"
};
function E(e) {
	return e.viewModel?.vt?.lock.isUserLocked === !0;
}
function D() {
	return {
		ok: !1,
		error: "locked"
	};
}
function O() {
	return {
		ok: !1,
		error: "unsupported"
	};
}
function pt() {
	return {
		ok: !1,
		error: "invalid_payload"
	};
}
async function k(e, t, n, r) {
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
function mt(e) {
	return typeof e == "number" && Number.isFinite(e);
}
async function ht(e, t) {
	return E(e) ? D() : mt(t.targetTempLow) && mt(t.targetTempHigh) ? k(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		target_temp_low: t.targetTempLow,
		target_temp_high: t.targetTempHigh
	}) : mt(t.temperature) ? k(e, "climate", "set_temperature", {
		entity_id: e.entityId,
		temperature: t.temperature
	}) : pt();
}
async function gt(e, t) {
	return E(e) ? D() : e.viewModel?.climate.hvacModes.includes(t) ? k(e, "climate", "set_hvac_mode", {
		entity_id: e.entityId,
		hvac_mode: t
	}) : O();
}
async function _t(e, t) {
	return E(e) ? D() : e.viewModel?.climate.presetModes.includes(t) ? k(e, "climate", "set_preset_mode", {
		entity_id: e.entityId,
		preset_mode: t
	}) : O();
}
async function vt(e, t) {
	return E(e) ? D() : e.viewModel?.climate.fanModes.includes(t) ? k(e, "climate", "set_fan_mode", {
		entity_id: e.entityId,
		fan_mode: t
	}) : O();
}
async function yt(e, t) {
	return E(e) ? D() : e.viewModel?.climate.swingModes.includes(t) ? k(e, "climate", "set_swing_mode", {
		entity_id: e.entityId,
		swing_mode: t
	}) : O();
}
async function bt(e, t) {
	return E(e) ? D() : e.viewModel?.climate.swingHorizontalModes.includes(t) ? k(e, "climate", "set_swing_horizontal_mode", {
		entity_id: e.entityId,
		swing_horizontal_mode: t
	}) : O();
}
async function xt(e, t, n) {
	return E(e) ? D() : !e.viewModel?.vt?.isVt || !e.viewModel.vt.timedPresetManager ? O() : !Number.isInteger(n) || n < 1 || n > 1440 || t.trim() === "" ? pt() : k(e, "versatile_thermostat", "set_timed_preset", {
		entity_id: e.entityId,
		preset: t,
		duration_minutes: n
	});
}
async function St(e) {
	return E(e) ? D() : e.viewModel?.vt?.timedPreset.isActive ? k(e, "versatile_thermostat", "cancel_timed_preset", { entity_id: e.entityId }) : O();
}
async function Ct(e, t) {
	if (E(e)) return D();
	if (!e.viewModel?.vt?.fan.hasAutoFan) return O();
	let n = ft[t];
	return n ? k(e, "versatile_thermostat", "set_auto_fan_mode", {
		entity_id: e.entityId,
		auto_fan_mode: n
	}) : pt();
}
async function wt(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return O();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), k(e, "versatile_thermostat", "lock", n);
}
async function Tt(e, t) {
	if (!e.viewModel?.vt?.lock.isConfigured) return O();
	let n = { entity_id: e.entityId };
	return t && (n.code = t), k(e, "versatile_thermostat", "unlock", n);
}
//#endregion
//#region src/data/climate-modes.ts
var Et = [
	"heat",
	"cool",
	"heat_cool",
	"auto",
	"dry",
	"fan_only",
	"off"
], A = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:sun-snowflake-variant",
	auto: "mdi:thermostat-auto",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Dt = {
	heat: "heat",
	cool: "cool",
	heat_cool: "heat-cool",
	auto: "auto",
	dry: "cool",
	fan_only: "auto",
	off: "off"
}, Ot = [
	"off",
	"on",
	"vertical",
	"horizontal",
	"both"
], kt = {
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
}, At = {
	off: "mdi:arrow-oscillating-off",
	Off: "mdi:arrow-oscillating-off",
	on: "mdi:arrow-expand-horizontal",
	On: "mdi:arrow-expand-horizontal"
}, jt = {
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
}, Mt = [
	"auto_fan_none",
	"auto_fan_low",
	"auto_fan_medium",
	"auto_fan_high",
	"auto_fan_turbo"
], Nt = o`
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
`, Pt = o`
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
`, Ft = o`
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
  }

  :host([theme="liquid_glow"]) ha-card {
    position: relative;
    isolation: isolate;
    /* Transparent on the side edges where our gradient line sits — keep top/bottom intact. */
    border-color: color-mix(in srgb, var(--equinox-border-color) 56%, transparent);
    border-left-color: transparent;
    border-right-color: transparent;
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
      filter: brightness(0.96) saturate(0.98);
    }

    50% {
      opacity: var(--equinox-liquid-line-opacity-max);
      filter: brightness(1.32) saturate(1.18) drop-shadow(0 0 3px var(--equinox-liquid-glow-color));
    }
  }

  @keyframes equinox-liquid-halo-pulse {
    0%,
    100% {
      opacity: var(--equinox-liquid-halo-opacity-min);
      filter: brightness(0.94) saturate(0.96);
    }

    50% {
      opacity: var(--equinox-liquid-halo-opacity-max);
      filter: brightness(1.34) saturate(1.18);
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
        transparent 5%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 22%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 38%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 88%, transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 62%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 78%,
        transparent 95%
      ) left 0 top 0 / 1px 100% no-repeat,
      linear-gradient(
        180deg,
        transparent 5%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 22%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 38%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 88%, transparent) 50%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 60%, transparent) 62%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 32%, transparent) 78%,
        transparent 95%
      ) right 0 top 0 / 1px 100% no-repeat;
    box-shadow: none;
    opacity: var(--equinox-liquid-line-opacity-min);
    filter: brightness(0.96) saturate(0.98);
  }

  /* Halo extends 4px beyond each side of the card; gradient origin sits exactly on
     the outer edge of the card so the halo bleeds equally outside and inside. */
  :host([theme="liquid_glow"]) ha-card::after {
    inset: -1px -5px;
    border-radius: 0;
    z-index: 0;
    background:
      radial-gradient(ellipse 10px 65% at left 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 42%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 14%, transparent) 55%,
        transparent 100%
      ),
      radial-gradient(ellipse 10px 65% at right 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 42%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 14%, transparent) 55%,
        transparent 100%
      );
    opacity: var(--equinox-liquid-halo-opacity-min);
    filter: brightness(0.94) saturate(0.96);
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::before,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::before {
    animation: equinox-liquid-line-pulse 5.5s ease-in-out infinite;
    will-change: opacity, filter;
  }

  :host([theme="liquid_glow"]) ha-card[active-action="heat"]::after,
  :host([theme="liquid_glow"]) ha-card[active-action="cool"]::after {
    animation: equinox-liquid-halo-pulse 5.5s ease-in-out infinite;
    will-change: opacity, filter;
  }

  /* Light mode: tone down halo so the orange wash doesn't smudge the light background.
     Detected via hass.themes.darkMode reflected as a [light] attribute on :host. */
  :host([theme="liquid_glow"][light]) {
    --equinox-liquid-line-opacity-min: 0.82;
    --equinox-liquid-halo-opacity-min: 0.36;
    --equinox-liquid-halo-opacity-max: 0.72;
    --equinox-panel-bg: var(--equinox-card-bg);
    --equinox-control-bg: var(--equinox-card-bg);
  }

  :host([theme="liquid_glow"][light]) ha-card::after {
    background:
      radial-gradient(ellipse 8px 60% at left 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 30%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 8%, transparent) 55%,
        transparent 100%
      ),
      radial-gradient(ellipse 8px 60% at right 4px center,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 30%, transparent) 0%,
        color-mix(in oklab, var(--equinox-liquid-glow-color) 8%, transparent) 55%,
        transparent 100%
    );
  }

  :host([theme="liquid_glow"][light]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"][light]) .compact-selectors ha-control-button[active][subtle] {
    border-color: color-mix(in srgb, var(--equinox-liquid-active-tone) 72%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color) 6%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 16%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-control-bg) 90%, var(--equinox-liquid-active-tone) 10%));
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 10%, transparent),
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
    border-color: var(--equinox-border-color);
    background: var(--equinox-control-bg);
    box-shadow: none;
  }

  :host([theme="liquid_glow"]) .segments ha-control-button:not(:last-child) {
    border-inline-end-color: var(--equinox-border-color);
  }

  :host([theme="liquid_glow"]) .step {
    --control-button-background-color: var(--equinox-control-bg);
    --control-button-icon-color: var(--equinox-text-color);
    box-shadow: none;
    filter: none;
  }

  :host([theme="liquid_glow"]) ha-control-button[active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-text-color);
    --control-button-background-color: var(--equinox-control-active-bg);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--equinox-liquid-active-tone) 58%, transparent),
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 18%, transparent),
      inset 0 -18px 28px color-mix(in srgb, var(--equinox-liquid-active-tone) 22%, transparent),
      0 0 16px color-mix(in srgb, var(--equinox-liquid-active-tone) 28%, transparent);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-color);
    --control-button-icon-color: var(--equinox-heat-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-cool-color);
    --control-button-icon-color: var(--equinox-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-cool-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="auto"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-auto-color);
    --control-button-icon-color: var(--equinox-auto-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-auto-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="heat-cool"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-heat-cool-color);
    --control-button-icon-color: var(--equinox-heat-cool-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="boost"][active][subtle],
  :host([theme="liquid_glow"]) ha-control-button[tone="cool-boost"][active][subtle] {
    --equinox-liquid-active-tone: var(--equinox-boost-color);
    --control-button-icon-color: var(--equinox-boost-color);
    --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-boost-color) 22%);
  }

  :host([theme="liquid_glow"]) ha-control-button[tone="off"][active][subtle] {
    --equinox-liquid-active-tone: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-icon-color: var(--disabled-text-color, var(--equinox-muted-color));
    --control-button-background-color: var(--equinox-control-bg);
  }

  :host([theme="liquid_glow"]) .segments ha-control-button[active][subtle],
  :host([theme="liquid_glow"]) .compact-selectors ha-control-button[active][subtle] {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--equinox-liquid-active-tone) 88%, transparent);
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-text-color) 10%, transparent) 0%, transparent 40%),
      linear-gradient(180deg, color-mix(in srgb, var(--equinox-liquid-active-tone) 24%, transparent) 0%, transparent 58%),
      linear-gradient(180deg, var(--control-button-background-color), color-mix(in srgb, var(--equinox-control-bg) 86%, var(--equinox-liquid-active-tone) 14%));
    /* No inset 1px ring (avoids a "double frame" inside the border) and no outer
       0 0 0 1px ring (would render 1px past the segments outline now that the active
       button is extended to it via margin). The 1px border is enough; we keep the soft
       outer glow only. */
    box-shadow:
      inset 0 1px 0 color-mix(in srgb, var(--equinox-text-color) 18%, transparent),
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
    border-color: var(--equinox-border-color);
    background: var(--equinox-control-bg);
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
`, It = class extends w {
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
		if (!this.open) return C;
		let e = T(this.language, "dialog.close"), t = T(this.language, "dialog.back"), n = this.floating && window.innerWidth > 600 ? "left: 0; top: 0; visibility: hidden;" : "", r = ["panel", this.floating ? "popover" : ""].filter(Boolean).join(" ");
		return S`
      <div class=${this.floating ? "scrim popover" : "scrim"} @click=${this._dispatchClose}></div>
      <div
        class=${r}
        style=${n}
        @click=${(e) => e.stopPropagation()}
        @mouseenter=${() => this._clearCloseOnLeaveTimer()}
        @mouseleave=${this.closeOnLeave ? () => this._scheduleCloseOnLeave() : void 0}
      >
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
customElements.get("eq-dialog") || customElements.define("eq-dialog", It);
//#endregion
//#region src/components/eq-fan-dialog.ts
var Lt = class extends w {
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
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? Mt : this.viewModel?.climate.fanModes ?? [];
	}
	_getActiveMode() {
		return this.viewModel?.vt?.fan.hasAutoFan === !0 ? this.viewModel.vt.fan.currentAutoFanMode : this.viewModel?.climate.fanMode;
	}
	_fanIcon(e) {
		return jt[e] ?? "mdi:fan-speed-2";
	}
	_fanLabel(e) {
		let t = T(this.language, `main.fan.${e}`);
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
		this.viewModel?.vt?.fan.hasAutoFan === !0 ? await Ct(t, e) : await vt(t, e), this._dispatchClose();
	}
	render() {
		let e = this._getOptions(), t = this._getActiveMode(), n = T(this.language, "dialog.fan.title");
		return S`
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
customElements.get("eq-fan-dialog") || customElements.define("eq-fan-dialog", Lt);
//#endregion
//#region src/components/eq-hvac-dialog.ts
var Rt = class extends w {
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
		let e = this.viewModel?.climate.hvacModes ?? [];
		return Et.filter((t) => e.includes(t) && A[t]);
	}
	_modeLabel(e) {
		let t = T(this.language, `main.hvac.${e}`);
		return t === `main.hvac.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectMode(e) {
		!this.hass || !this.config || (await gt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.hvacMode, n = T(this.language, "dialog.hvac.title");
		return S`
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
          ${e.map((e) => S`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectMode(e)}
                title=${this._modeLabel(e)}
                aria-label=${this._modeLabel(e)}
              >
                <span class="option-icon" tone=${Dt[e] ?? ""}>
                  <ha-icon .icon=${A[e]} style="--mdc-icon-size: 24px;"></ha-icon>
                </span>
                <span class="option-label">${this._modeLabel(e)}</span>
              </button>
            `)}
        </div>
        <div class="option-mobile">
          <ha-md-list class="option-list">
            ${e.map((e) => S`
                <ha-md-list-item type="button" ?active=${e === t} @click=${() => this._selectMode(e)}>
                  <span class="option-icon" tone=${Dt[e] ?? ""} slot="start">
                    <ha-icon .icon=${A[e]} style="--mdc-icon-size: 24px;"></ha-icon>
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
customElements.get("eq-hvac-dialog") || customElements.define("eq-hvac-dialog", Rt);
//#endregion
//#region src/components/eq-swing-dialog.ts
function zt(e) {
	let t = [...new Set(e)], n = Ot.filter((e) => t.includes(e)), r = t.filter((e) => !Ot.includes(e));
	return [...n, ...r];
}
var Bt = class extends w {
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
		return zt(this.viewModel?.climate.swingModes ?? []);
	}
	_horizontalOptions() {
		return zt(this.viewModel?.climate.swingHorizontalModes ?? []);
	}
	_swingIcon(e, t = !1) {
		return t ? At[e] ?? kt[e] ?? "mdi:arrow-expand-horizontal" : kt[e] ?? "mdi:arrow-oscillating";
	}
	_swingLabel(e) {
		let t = T(this.language, `main.swing.${e}`);
		return t === `main.swing.${e}` ? e : t;
	}
	_dispatchClose() {
		this.dispatchEvent(new CustomEvent("eq-dialog-close", {
			bubbles: !0,
			composed: !0
		}));
	}
	async _selectVerticalMode(e) {
		!this.hass || !this.config || (await yt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	async _selectHorizontalMode(e) {
		!this.hass || !this.config || (await bt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	_renderDesktopGroup(e, t, n, r) {
		return e.length === 0 ? C : S`
      <div class="swing-grid">
        ${e.map((e) => S`
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
		return e.length === 0 ? C : S`
      <ha-md-list class="swing-list">
        ${e.map((e) => S`
            <ha-md-list-item type="button" ?active=${e === t} @click=${() => r(e)}>
              <span class="option-icon" slot="start">
                <ha-icon .icon=${this._swingIcon(e, n)} style="--mdc-icon-size: 24px;"></ha-icon>
              </span>
              <span>${this._swingLabel(e)}</span>
              ${e === t ? S`<ha-icon slot="end" class="option-check" icon="mdi:check" style="--mdc-icon-size: 20px;"></ha-icon>` : C}
            </ha-md-list-item>
          `)}
      </ha-md-list>
    `;
	}
	render() {
		let e = this._verticalOptions(), t = this._horizontalOptions(), n = e.length > 0 && t.length > 0, r = T(this.language, "dialog.swing.title");
		return S`
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
            ${e.length > 0 ? S`
                  <div class="group">
                    ${n ? S`<span class="group-title">${T(this.language, "dialog.swing.vertical")}</span>` : C}
                    ${this._renderDesktopGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : C}
            ${t.length > 0 ? S`
                  <div class="group">
                    ${n ? S`<span class="group-title">${T(this.language, "dialog.swing.horizontal")}</span>` : C}
                    ${this._renderDesktopGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : C}
          </div>
          <div class="swing-mobile">
            ${e.length > 0 ? S`
                  <div class="group">
                    ${n ? S`<span class="group-title">${T(this.language, "dialog.swing.vertical")}</span>` : C}
                    ${this._renderMobileGroup(e, this.viewModel?.climate.swingMode, !1, (e) => this._selectVerticalMode(e))}
                  </div>
                ` : C}
            ${t.length > 0 ? S`
                  <div class="group">
                    ${n ? S`<span class="group-title">${T(this.language, "dialog.swing.horizontal")}</span>` : C}
                    ${this._renderMobileGroup(t, this.viewModel?.climate.swingHorizontalMode, !0, (e) => this._selectHorizontalMode(e))}
                  </div>
                ` : C}
          </div>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-swing-dialog") || customElements.define("eq-swing-dialog", Bt);
//#endregion
//#region src/components/eq-preset-dialog.ts
var Vt = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], Ht = {
	frost: "mdi:snowflake",
	eco: "mdi:tree-outline",
	away: "mdi:home-export-outline",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:sleep",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Ut = class extends w {
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
		let e = this.viewModel?.climate.presetModes ?? [], t = this.viewModel?.climate.hvacMode;
		return Vt.filter((n) => e.includes(n) && Ht[n] && n !== "none" && !(n === "frost" && t !== "heat"));
	}
	_presetLabel(e) {
		let t = T(this.language, `main.preset.${e}`);
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
		!this.hass || !this.config || (await _t({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e), this._dispatchClose());
	}
	render() {
		let e = this._getOptions(), t = this.viewModel?.climate.presetMode, n = T(this.language, "dialog.preset.title");
		return S`
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
          ${e.map((e) => S`
              <button
                class="option-row"
                ?active=${e === t}
                @click=${() => this._selectPreset(e)}
                title=${this._presetLabel(e)}
                aria-label=${this._presetLabel(e)}
              >
                <span class="option-icon" tone=${this._presetTone(e)}>
                  <ha-icon .icon=${Ht[e]} style="--mdc-icon-size: 24px;"></ha-icon>
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
                    <ha-icon .icon=${Ht[e]} style="--mdc-icon-size: 24px;"></ha-icon>
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
customElements.get("eq-preset-dialog") || customElements.define("eq-preset-dialog", Ut);
//#endregion
//#region src/components/eq-menu-dialog.ts
var Wt = class extends w {
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
		let e = this._showRegulation(), t = this._showBoost(), n = this.viewModel?.vt?.timedPreset.isActive === !0, r = this.viewModel?.vt?.timedPreset.remainingTimeMin, i = T(this.language, "dialog.menu.title");
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
                  <span>${T(this.language, "dialog.menu.regulation")}</span>
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
                  <span>${T(this.language, "dialog.menu.boost")}</span>
                  <span class="option-trailing" slot="end">
                    ${n && typeof r == "number" ? S`<span class="boost-time">${r} min</span>` : S`<ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>`}
                  </span>
                </ha-md-list-item>
              ` : C}

          <ha-md-list-item type="button" @click=${() => this._dispatchOpen("equinox-open-history")}>
            <span class="option-icon" slot="start">
              <ha-icon icon="mdi:chart-bar" style="--mdc-icon-size: 24px;"></ha-icon>
            </span>
            <span>${T(this.language, "dialog.menu.history")}</span>
            <span class="option-trailing" slot="end">
              <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 20px;"></ha-icon>
            </span>
          </ha-md-list-item>
        </ha-md-list>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-menu-dialog") || customElements.define("eq-menu-dialog", Wt);
//#endregion
//#region src/components/eq-boost-dialog.ts
var Gt = 60, Kt = [
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
], qt = class extends w {
	constructor(...e) {
		super(...e), this.open = !1, this.floating = !1, this.closeOnLeave = !1, this._durationMinutes = Gt;
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
		Kt.includes(e) && (this._durationMinutes = e);
	}
	_onDurationChange(e) {
		let t = Number(e.detail.value);
		Number.isFinite(t) && this._setDuration(Kt[Math.round(t)] ?? Gt);
	}
	async _startBoost() {
		if (!this.hass || !this.config) return;
		let e = {
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		};
		(this._hasTimedPreset() ? await xt(e, "boost", this._durationMinutes) : await _t(e, "boost")).ok && this._dispatchClose();
	}
	async _stopBoost() {
		!this.hass || !this.config || (await St({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		})).ok && this._dispatchClose();
	}
	_durationIndex(e) {
		let t = Kt.indexOf(e);
		return t >= 0 ? t : Kt.reduce((t, n, r) => Math.abs(n - e) < Math.abs(Kt[t] - e) ? r : t, 0);
	}
	_formatDuration(e) {
		if (e < 60) return {
			value: `${e}${T(this.language, "dialog.boost.minutes")}`,
			unit: ""
		};
		if (e % 60 == 0) return {
			value: `${e / 60}${T(this.language, "dialog.boost.hours")}`,
			unit: ""
		};
		let t = Math.floor(e / 60), n = e % 60;
		return {
			value: `${t}${T(this.language, "dialog.boost.hours")}${n}`,
			unit: ""
		};
	}
	render() {
		let e = T(this.language, "dialog.boost.title"), t = this.viewModel?.vt?.timedPreset, n = t?.isActive === !0, r = this._isDisabled(), i = this._hasTimedPreset(), a = n && typeof t?.remainingTimeMin == "number" ? t.remainingTimeMin : this._durationMinutes, o = this._formatDuration(a);
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
        <div class="boost-body" ?has-wheel=${i}>
          ${i ? S`
                <div class="boost-wheel-shell">
                  <ha-control-circular-slider
                    class="boost-wheel"
                    .mode=${"start"}
                    .min=${0}
                    .max=${Kt.length - 1}
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
            <ha-icon aria-hidden="true" .icon=${n ? "mdi:timer-off-outline" : "mdi:rocket-launch-outline"}></ha-icon>
            <span class="action-label">${T(this.language, n ? "dialog.boost.stop" : "dialog.boost.start")}</span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </eq-dialog>
    `;
	}
};
customElements.get("eq-boost-dialog") || customElements.define("eq-boost-dialog", qt);
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/css-tag.js
var Jt = globalThis, Yt = Jt.ShadowRoot && (Jt.ShadyCSS === void 0 || Jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xt = Symbol(), Zt = /* @__PURE__ */ new WeakMap(), Qt = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== Xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (Yt && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = Zt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Zt.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, $t = (e) => new Qt(typeof e == "string" ? e : e + "", void 0, Xt), en = (e, ...t) => new Qt(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, Xt), tn = (e, t) => {
	if (Yt) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = Jt.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, nn = Yt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return $t(t);
})(e) : e, { is: rn, defineProperty: an, getOwnPropertyDescriptor: on, getOwnPropertyNames: sn, getOwnPropertySymbols: cn, getPrototypeOf: ln } = Object, un = globalThis, dn = un.trustedTypes, fn = dn ? dn.emptyScript : "", pn = un.reactiveElementPolyfillSupport, mn = (e, t) => e, hn = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? fn : null;
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
}, gn = (e, t) => !rn(e, t), _n = {
	attribute: !0,
	type: String,
	converter: hn,
	reflect: !1,
	useDefault: !1,
	hasChanged: gn
};
Symbol.metadata ??= Symbol("metadata"), un.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var vn = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = _n) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && an(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = on(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? _n;
	}
	static _$Ei() {
		if (this.hasOwnProperty(mn("elementProperties"))) return;
		let e = ln(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(mn("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(mn("properties"))) {
			let e = this.properties, t = [...sn(e), ...cn(e)];
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
			for (let e of n) t.unshift(nn(e));
		} else e !== void 0 && t.push(nn(e));
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
		return tn(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? hn : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? hn : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? gn)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
vn.elementStyles = [], vn.shadowRootOptions = { mode: "open" }, vn[mn("elementProperties")] = /* @__PURE__ */ new Map(), vn[mn("finalized")] = /* @__PURE__ */ new Map(), pn?.({ ReactiveElement: vn }), (un.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region ../ha-better-history/node_modules/lit-html/lit-html.js
var yn = globalThis, bn = (e) => e, xn = yn.trustedTypes, Sn = xn ? xn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Cn = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, wn = "?" + j, Tn = `<${wn}>`, En = document, Dn = () => En.createComment(""), On = (e) => e === null || typeof e != "object" && typeof e != "function", kn = Array.isArray, An = (e) => kn(e) || typeof e?.[Symbol.iterator] == "function", jn = "[ 	\n\f\r]", Mn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nn = /-->/g, Pn = />/g, Fn = RegExp(`>|${jn}(?:([^\\s"'>=/]+)(${jn}*=${jn}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), In = /'/g, Ln = /"/g, Rn = /^(?:script|style|textarea|title)$/i, zn = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), M = zn(1), N = zn(2), Bn = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), Vn = /* @__PURE__ */ new WeakMap(), F = En.createTreeWalker(En, 129);
function Hn(e, t) {
	if (!kn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return Sn === void 0 ? t : Sn.createHTML(t);
}
var Un = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Mn;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === Mn ? c[1] === "!--" ? o = Nn : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = Fn) : (Rn.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = Fn) : o = Pn : o === Fn ? c[0] === ">" ? (o = i ?? Mn, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? Fn : c[3] === "\"" ? Ln : In) : o === Ln || o === In ? o = Fn : o === Nn || o === Pn ? o = Mn : (o = Fn, i = void 0);
		let d = o === Fn && e[t + 1].startsWith("/>") ? " " : "";
		a += o === Mn ? n + Tn : l >= 0 ? (r.push(s), n.slice(0, l) + Cn + n.slice(l) + j + d) : n + j + (l === -2 ? t : d);
	}
	return [Hn(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Wn = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Un(t, n);
		if (this.el = e.createElement(l, r), F.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = F.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(Cn)) {
					let t = u[o++], n = i.getAttribute(e).split(j), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Yn : r[1] === "?" ? Xn : r[1] === "@" ? Zn : Jn
					}), i.removeAttribute(e);
				} else e.startsWith(j) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Rn.test(i.tagName)) {
					let e = i.textContent.split(j), t = e.length - 1;
					if (t > 0) {
						i.textContent = xn ? xn.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], Dn()), F.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], Dn());
					}
				}
			} else if (i.nodeType === 8) if (i.data === wn) c.push({
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
		let n = En.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Gn(e, t, n = e, r) {
	if (t === Bn) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = On(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Gn(e, i._$AS(e, t.values), i, r)), t;
}
var Kn = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? En).importNode(t, !0);
		F.currentNode = r;
		let i = F.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new qn(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Qn(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = F.nextNode(), a++);
		}
		return F.currentNode = En, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, qn = class e {
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
		e = Gn(this, e, t), On(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== Bn && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? An(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && On(this._$AH) ? this._$AA.nextSibling.data = e : this.T(En.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Wn.createElement(Hn(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Kn(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Vn.get(e.strings);
		return t === void 0 && Vn.set(e.strings, t = new Wn(e)), t;
	}
	k(t) {
		kn(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(Dn()), this.O(Dn()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = bn(e).nextSibling;
			bn(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Jn = class {
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
		if (i === void 0) e = Gn(this, e, t, 0), a = !On(e) || e !== this._$AH && e !== Bn, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Gn(this, r[n + o], t, o), s === Bn && (s = this._$AH[o]), a ||= !On(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Yn = class extends Jn {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, Xn = class extends Jn {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, Zn = class extends Jn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Gn(this, e, t, 0) ?? P) === Bn) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Qn = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Gn(this, e);
	}
}, $n = yn.litHtmlPolyfillSupport;
$n?.(Wn, qn), (yn.litHtmlVersions ??= []).push("3.3.2");
var er = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new qn(t.insertBefore(Dn(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, tr = globalThis, nr = class extends vn {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = er(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Bn;
	}
};
nr._$litElement$ = !0, nr.finalized = !0, tr.litElementHydrateSupport?.({ LitElement: nr });
var rr = tr.litElementPolyfillSupport;
rr?.({ LitElement: nr }), (tr.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region ../ha-better-history/node_modules/@lit/reactive-element/decorators/property.js
var ir = {
	attribute: !0,
	type: String,
	converter: hn,
	reflect: !1,
	hasChanged: gn
}, ar = (e = ir, t, n) => {
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
	return (t, n) => typeof n == "object" ? ar(e, t, n) : ((e, t, n) => {
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
var or = [
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
], sr = async (e) => {
	let t = e || or;
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
}, cr = new Set(["unknown", "unavailable"]);
function lr(e) {
	return e == null || typeof e == "string" && cr.has(e);
}
function ur(e) {
	if (!(lr(e) || typeof e != "string" || e.trim() === "")) return e;
}
function dr(e) {
	if (lr(e)) return;
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
async function fr(e, t = {}) {
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
var pr = 6e4, mr = 3, hr = 350, gr = 360 * 60 * 1e3, _r = 3600 * 1e3, vr = 720 * 60 * 1e3, yr = 2500, br = 8e3, xr = 15e3, Sr = 300, Cr = 700, wr = 1100, Tr = 80;
function Er(e) {
	if (e.length <= 2) return e;
	let t = [e[0]];
	for (let n = 1; n < e.length - 1; n++) {
		let r = e[n], i = e[n - 1], a = e[n + 1];
		(r.value !== i.value || a.value !== r.value) && t.push(r);
	}
	return t.push(e[e.length - 1]), t;
}
var Dr = class extends Error {
	constructor(e) {
		super(`History chunk timed out after ${e}ms`), this.name = "HistoryChunkTimeoutError";
	}
};
function Or(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function kr(e, t) {
	return t.reduce((e, t) => Or(e) ? e[t] : void 0, e);
}
function Ar(e) {
	return e[e.length - 1] ?? "";
}
function jr(e) {
	return e instanceof Error ? e.message : String(e);
}
function Mr(e) {
	if (!Or(e)) return;
	let t = e.status ?? e.statusCode ?? e.status_code;
	return typeof t == "number" ? t : void 0;
}
function Nr(e) {
	if (!Or(e)) return "";
	let t = e.code;
	return typeof t == "string" ? t.toLowerCase() : "";
}
function Pr(e) {
	if (e instanceof Dr) return !0;
	let t = Mr(e);
	if (t !== void 0) return t === 408 || t === 429 || t >= 500;
	let n = jr(e).toLowerCase(), r = `${Nr(e)} ${n}`;
	return r.includes("timeout") || r.includes("timed out") || r.includes("network") || r.includes("failed to fetch") || r.includes("connection") || r.includes("temporarily unavailable") || r.includes("unavailable") || r.includes("aborted");
}
function Fr(e, t) {
	let n = Math.floor(Math.random() * Math.max(1, t));
	return t * 2 ** Math.max(0, e - 1) + n;
}
function Ir(e) {
	return new Promise((t) => setTimeout(t, e));
}
function Lr(e = 80) {
	let t = globalThis.requestIdleCallback;
	return t ? new Promise((n) => t(() => n(), { timeout: e })) : new Promise((e) => {
		typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
async function Rr(e, t) {
	let n;
	try {
		return await Promise.race([e, new Promise((e, r) => {
			n = setTimeout(() => r(new Dr(t)), t);
		})]);
	} finally {
		n !== void 0 && clearTimeout(n);
	}
}
function zr(e) {
	if (typeof e == "number" && Number.isFinite(e)) return "number";
	if (typeof e == "boolean") return "boolean";
	if (typeof e == "string" && e !== "") return "string";
}
function Br(e) {
	let t = zr(Number.isFinite(Number(e.state)) ? Number(e.state) : e.state), n = e.attributes.unit_of_measurement;
	if (t) return {
		id: `state:${e.entity_id}`,
		kind: "entity_state",
		entityId: e.entity_id,
		label: e.attributes.friendly_name && typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id,
		valueType: t,
		unit: t === "number" && typeof n == "string" && n !== "" ? n : void 0
	};
}
function Vr(e, t, n) {
	let r = zr(kr(e.attributes, t));
	if (r) return {
		id: `attr:${e.entity_id}:${t.join(".")}`,
		kind: "entity_attribute",
		entityId: e.entity_id,
		label: n ?? Ar(t),
		path: t,
		valueType: r
	};
}
function Hr(e, t) {
	return t === "number" ? dr(e) : t === "boolean" ? typeof e == "boolean" ? e : void 0 : ur(e);
}
function Ur(e, t) {
	let n = e.attributes ?? e.a ?? {};
	return Hr(t.kind === "entity_state" ? e.state ?? e.s : kr(n, t.path ?? []), t.valueType);
}
function Wr(e) {
	if (typeof e.lu == "number") return e.lu * 1e3;
	let t = e.last_changed ?? e.last_updated;
	return t ? Date.parse(t) : NaN;
}
function Gr(e, t, n) {
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
function Kr(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (Array.isArray(e)) return e.forEach((e, r) => {
		let i = e[0]?.entity_id ?? t[r];
		i && n.set(i, e);
	}), n;
	for (let [t, r] of Object.entries(e)) Array.isArray(r) && n.set(t, r);
	return n;
}
function qr(e, t, n = Date.now()) {
	let r = e.states[t.entityId];
	if (!r) return;
	let i = {
		entity_id: r.entity_id,
		state: r.state,
		last_changed: r.last_changed,
		last_updated: r.last_updated,
		attributes: r.attributes
	}, a = Ur(i, t), o = Wr(i), s = Number.isFinite(o) ? o : n;
	return a === void 0 || !Number.isFinite(s) ? void 0 : {
		time: s,
		value: a
	};
}
function Jr(e, t, n, r) {
	let i = qr(e, t, n.getTime());
	return i ? [{
		time: n.getTime(),
		value: i.value
	}, {
		time: Math.min(r.getTime(), Date.now()),
		value: i.value
	}] : [];
}
var Yr = class {
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
		return i ? Zr(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : !1;
	}
	missingIntervals(e, t, n, r) {
		let i = this._entities.get(e);
		return $r(i ? r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage] : [], t.getTime(), n.getTime()).map((e) => ({
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
		a.states = ei([...a.states, ...t]), a.stateCoverage = Xr([...a.stateCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}]), i === "full" && (a.fullCoverage = Xr([...a.fullCoverage, {
			startTime: n.getTime(),
			endTime: r.getTime()
		}])), this._entities.set(e, a);
	}
	buildSeries(e, t, n, r) {
		let i = e.kind === "entity_attribute" ? "full" : "state", a = this.coverageEnd(e.entityId, n, r, i);
		return ai(e, this._entities.get(e.entityId)?.states ?? [], t, n, new Date(a));
	}
	coverageEnd(e, t, n, r) {
		let i = this._entities.get(e);
		return i ? Qr(r === "full" ? i.fullCoverage : [...i.stateCoverage, ...i.fullCoverage], t.getTime(), n.getTime()) : n.getTime();
	}
};
function Xr(e) {
	let t = e.filter((e) => e.endTime > e.startTime).sort((e, t) => e.startTime - t.startTime), n = [];
	for (let e of t) {
		let t = n[n.length - 1];
		t && e.startTime <= t.endTime + 1 ? t.endTime = Math.max(t.endTime, e.endTime) : n.push({ ...e });
	}
	return n;
}
function Zr(e, t, n) {
	return Qr(e, t, n) >= n - 1;
}
function Qr(e, t, n) {
	if (n <= t) return n;
	let r = t;
	for (let t of Xr(e)) if (!(t.endTime < r)) {
		if (t.startTime > r + 1) break;
		if (r = Math.max(r, t.endTime), r >= n - 1) return n;
	}
	return r;
}
function $r(e, t, n) {
	if (n <= t) return [];
	let r = [], i = t;
	for (let t of Xr(e)) if (!(t.endTime <= i) && (t.startTime > i + 1 && r.push({
		startTime: i,
		endTime: Math.min(t.startTime, n)
	}), i = Math.max(i, t.endTime), i >= n)) break;
	return i < n && r.push({
		startTime: i,
		endTime: n
	}), r;
}
function ei(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Wr(n);
		Number.isFinite(e) && t.set(e, n);
	}
	return [...t.entries()].sort(([e], [t]) => e - t).map(([, e]) => e);
}
function ti(e, t) {
	let n = t.normalizeDurationMs + t.mergeDurationMs + t.buildDurationMs, r = t.stateCount >= xr || t.requestDurationMs >= wr, i = r || t.stateCount >= br || t.requestDurationMs >= Cr || n >= Tr, a = t.stateCount <= yr && t.requestDurationMs <= Sr && n <= Tr / 2;
	return i && e > _r ? {
		nextChunkMs: Math.max(_r, Math.floor(e / (r ? 4 : 2))),
		reason: "decrease"
	} : a && e < vr ? {
		nextChunkMs: Math.min(vr, e * 2),
		reason: "increase"
	} : {
		nextChunkMs: e,
		reason: "keep"
	};
}
async function ni(e, t, n, r, i, a, o) {
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
async function ri(e, t) {
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
			let i = await Rr(e(), t.timeoutMs);
			return t.onPerformance?.({
				event: "history.chunk_success",
				details: {
					taskId: t.taskId,
					attempt: n,
					durationMs: Math.round(R() - r)
				}
			}), i;
		} catch (e) {
			let i = Pr(e), a = i && n < t.maxAttempts && !t.isCancelled?.();
			if (t.onPerformance?.({
				event: a ? "history.chunk_retry" : "history.chunk_error",
				details: {
					taskId: t.taskId,
					attempt: n,
					maxAttempts: t.maxAttempts,
					retryable: i,
					error: jr(e),
					durationMs: Math.round(R() - r)
				}
			}), !a) throw e;
			await Ir(Fr(n, t.retryBaseDelayMs)), n += 1;
		}
	}
}
async function ii(e, t, n, r, i, a, o = {}) {
	if (!e.callWS && !e.callApi) throw Error("Home Assistant history API is unavailable");
	let s = [...new Set(t.map((e) => e.entityId))], c = new Set(t.filter((e) => e.kind === "entity_attribute").map((e) => e.entityId)), l = s.filter((e) => !c.has(e)), u = s.filter((e) => c.has(e)), d = o.accumulator ?? new Yr(), f = [], p = Math.max(1, Math.floor(o.chunkTimeoutMs ?? pr)), m = Math.max(1, Math.floor(o.maxChunkAttempts ?? mr)), h = Math.max(0, Math.floor(o.chunkRetryBaseDelayMs ?? hr)), g = (e, t) => ri(t, {
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
		return e + Math.max(1, Math.ceil(n / gr));
	}, 0), ne = _.size + te, re = 0, y = /* @__PURE__ */ new Set(), ie = async (s, c, l) => {
		let u = re;
		if (re += 1, o.isCancelled?.()) return {
			stateCount: 0,
			requestDurationMs: Math.round(l),
			normalizeDurationMs: 0,
			mergeDurationMs: 0,
			buildDurationMs: 0
		};
		await Lr();
		let f = R(), p = Kr(c, s.entityIds), m = R() - f, h = [...p.values()].reduce((e, t) => e + t.length, 0);
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
			await Lr();
			let o = R();
			for (let i of t) (_.has(i.entityId) || !b.has(i.id)) && (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && b.set(i.id, d.buildSeries(i, e, n, r));
			let s = t.map((e) => b.get(e.id)).filter((e) => e !== void 0);
			v = R() - o, a?.({
				event: "history.progress_series",
				details: {
					batchIndex: u,
					seriesCount: s.length,
					pointCount: s.reduce((e, t) => e + t.points.length, 0),
					buildDurationMs: Math.round(v)
				}
			}), i(s), await Lr(120);
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
			run: () => g(i, () => ni(e, r, t.start, t.end, t.minimalResponse, t.noAttributes, t.significantChangesOnly))
		});
	}
	a?.({
		event: "history.start",
		details: {
			sourceCount: t.length,
			entityCount: s.length,
			batchCount: ne,
			attributeChunkHours: gr / 36e5,
			minAttributeChunkHours: _r / 36e5,
			maxAttributeChunkHours: vr / 36e5,
			adaptiveAttributeChunks: v.length > 0,
			cachedSourceCount: t.filter((e) => d.hasCoverage(e.entityId, n, r, e.kind === "entity_attribute" ? "full" : "state")).length,
			chunkTimeoutMs: p,
			maxChunkAttempts: m,
			rangeHours: Math.round((r.getTime() - n.getTime()) / 36e3) / 100
		}
	});
	let b = /* @__PURE__ */ new Map();
	for (let i of t) (i.kind === "entity_attribute" ? d.hasFullStates(i.entityId) : d.hasStates(i.entityId)) && b.set(i.id, d.buildSeries(i, e, n, r));
	await fr(f, {
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
	let ae = 0;
	for (let t of v) {
		let n = gr;
		for (let r = t.start.getTime(); r < t.end.getTime() && !o.isCancelled?.();) {
			let i = new Date(r), o = new Date(Math.min(r + n, t.end.getTime())), s = o.getTime() - i.getTime(), c = `attr:${t.entityId}:${i.toISOString()}:${o.toISOString()}`;
			a?.({
				event: "history.queue.task_start",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 1,
					completedCount: ae
				}
			});
			let l = R(), u = await g(c, () => ni(e, [t.entityId], i, o, !1, !1, !1)), d = R() - l;
			ae += 1, a?.({
				event: "history.queue.task_complete",
				details: {
					taskId: c,
					queuedCount: void 0,
					activeCount: 0,
					completedCount: ae
				}
			});
			let f = await ie({
				id: c,
				entityIds: [t.entityId],
				start: i,
				end: o,
				coverageKind: "full"
			}, u, d), p = ti(n, f);
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
	let oe = a ? R() : 0, se = t.map((t) => {
		let i = b.get(t.id);
		return i && !y.has(t.entityId) ? i : d.buildSeries(t, e, n, r);
	}), x = a ? R() - oe : 0;
	return a?.({
		event: "history.final_series",
		details: {
			seriesCount: se.length,
			pointCount: se.reduce((e, t) => e + t.points.length, 0),
			buildDurationMs: Math.round(x)
		}
	}), se;
}
function ai(e, t, n, r, i) {
	let a = t.flatMap((t) => {
		let n = Ur(t, e), r = Wr(t);
		return n !== void 0 && Number.isFinite(r) ? [{
			time: r,
			value: n
		}] : [];
	});
	return {
		source: e,
		points: Er(a.length > 0 ? Gr(a, r, i) : Jr(n, e, r, i))
	};
}
var oi = 6e4, si = 48;
function ci(e) {
	requestAnimationFrame(() => requestAnimationFrame(e));
}
function li(e) {
	return e instanceof Error ? e.message : String(e);
}
function ui(e) {
	return `${e.kind === "entity_attribute" ? "full" : "state"}:${e.entityId}`;
}
function di(e, t) {
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
function fi(e, t) {
	let n = e.findIndex((e) => e.time === t.time);
	if (n !== -1) {
		if (e[n].value === t.value) return e;
		let r = [...e];
		return r[n] = t, r;
	}
	return [...e].reverse().find((e) => e.time < t.time)?.value === t.value ? e : [...e, t].sort((e, t) => e.time - t.time);
}
var pi = class {
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
			accumulator: new Yr()
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
		return (e.activeEntityLoads.get(ui(t)) ?? 0) > 0;
	}
	_beginLoad(e, t) {
		e.activeLoads += 1;
		for (let n of t) {
			e.sourceStates.set(n.id, "loading");
			let t = ui(n);
			e.activeEntityLoads.set(t, (e.activeEntityLoads.get(t) ?? 0) + 1);
		}
	}
	_completeLoad(e, t) {
		e.activeLoads = Math.max(0, e.activeLoads - 1);
		for (let n of t) {
			let t = ui(n), r = Math.max(0, (e.activeEntityLoads.get(t) ?? 0) - 1);
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
		let t = R() - this._lastProgressUpdateMs, n = Math.max(0, si - t);
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
		}), this.host.requestUpdate(), ii(e, a.sources, n, r, (t) => {
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
			chunkTimeoutMs: oi,
			accumulator: a.accumulator
		}).then((i) => {
			this._isCurrentSession(a) && ci(() => {
				if (!this._isCurrentSession(a)) return;
				let s = R(), c = this._availableSessionSeries(a, e, n, r, i), l = this._mergeSeries(this.series.filter((e) => !a.sources.some((t) => t.id === e.source.id)), c);
				di(this.series, l) || (this.series = l);
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
				this.error = li(e), this._completeLoad(a, t), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.fetch_error", {
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
		let c = o.filter((e) => !this._hasActiveEntityLoad(i, e)), l = new Set(c.map((e) => e.id)), u = i.sources.filter((e) => l.has(e.id) || !s.has(ui(e))), d = R();
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
		}), this.host.requestUpdate(), ii(e, u, n, r, (t) => {
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
			chunkTimeoutMs: oi,
			accumulator: i.accumulator
		}).then((t) => {
			this._isCurrentSession(i) && ci(() => {
				if (!this._isCurrentSession(i)) return;
				let a = R(), o = this._availableSessionSeries(i, e, n, r, t), s = this._mergeSeries(this.series, o);
				di(this.series, s) || (this.series = s);
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
				this.error = li(e), this._completeLoad(i, c), this.host.requestUpdate(), this.debugPerformance && z(this.debugPerformance, "controller.add_sources_error", {
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
			let r = qr(e, n, a);
			if (!r) return t;
			let c = {
				...r,
				time: Math.min(Math.max(r.time, i), a)
			}, l = fi(t.points, c);
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
}, mi = [
	"#ff9800",
	"#42a5f5",
	"#66bb6a",
	"#ec407a",
	"#ab47bc",
	"#26a69a"
], hi = {
	current_temperature: "#42a5f5",
	temperature: "#ff9800"
}, gi = new Set(Object.values(hi)), _i = mi.filter((e) => !gi.has(e));
function vi(e) {
	return _i[e % _i.length];
}
function yi(e) {
	return e.trim().toLowerCase();
}
function bi(e) {
	return `hsl(${(e * 137.508 % 360).toFixed(1)} 68% 52%)`;
}
function xi(e, t, n) {
	if (!t.has(yi(e))) return e;
	let r = [
		..._i.slice(n % _i.length),
		..._i.slice(0, n % _i.length),
		...mi
	];
	for (let e of r) if (!t.has(yi(e))) return e;
	let i = n, a = bi(i);
	for (; t.has(yi(a));) i += 1, a = bi(i);
	return a;
}
function Si(e) {
	return yi(e);
}
var Ci = 214;
function wi(e) {
	if (!Number.isFinite(e) || Number.isInteger(e)) return 0;
	let t = e.toString().toLowerCase();
	if (t.includes("e-")) {
		let [e, n] = t.split("e-"), r = e.split(".")[1]?.length ?? 0;
		return Math.min(r + Number(n), 4);
	}
	return Math.min(t.split(".")[1]?.length ?? 0, 4);
}
function Ti(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
function Ei(e, t, n = 5) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return [e, t];
	let r = Math.abs(t - e);
	if (r < 1e-10) return [e];
	let i = Di(r / (Math.max(n, 2) - 1)), a = Math.floor(e / i) * i, o = Math.ceil(t / i) * i, s = i * 1e-8, c = [];
	for (let e = a; e <= o + s; e += i) c.push(Oi(e, i));
	return c;
}
function Di(e) {
	if (e <= 0) return 1;
	let t = Math.floor(Math.log10(Math.abs(e))), n = e / 10 ** t, r;
	return r = n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10, r * 10 ** t;
}
function Oi(e, t) {
	let n = Math.max(0, -Math.floor(Math.log10(Math.abs(t) || 1)) + 1);
	return parseFloat(e.toFixed(n));
}
function ki(e) {
	let t = 0;
	for (let n of e) {
		let e = String(n), r = e.indexOf(".");
		r !== -1 && (t = Math.max(t, e.length - r - 1));
	}
	return t;
}
function Ai(e, t, n) {
	let r = t - e;
	if (r < 1e-6) {
		let r = Math.max(Math.abs(t) * .05, 1);
		return {
			min: Ti(e - r, n),
			max: Ti(t + r, n)
		};
	}
	let i = Math.max(r * .08, 10 ** -n), a = 10 ** n, o = Math.ceil(i * a) / a;
	return {
		min: Ti(e - o, n),
		max: Ti(t + o, n)
	};
}
function ji(e) {
	return 28 + (Math.max(e, 1) - 1) * Ci + 180 + 18;
}
var Mi = .15, Ni = 8;
function Pi(e) {
	return Math.max(e.max - e.min, 1e-9);
}
function Fi(e) {
	return (e.min + e.max) / 2;
}
function Ii(e) {
	return Math.log10(Math.max(Math.abs(e), 1e-9));
}
function Li(e, t) {
	let n = Math.abs(Ii(Pi(e)) - Ii(Pi(t))), r = Math.abs(Ii(Fi(e)) - Ii(Fi(t))), i = e.unit && t.unit && e.unit !== t.unit ? .4 : 0;
	return n + r * .6 + i;
}
function Ri(e) {
	if (e.length < 2) return !1;
	let t = Math.min(...e.map((e) => e.min)), n = Math.max(...e.map((e) => e.max)), r = Math.max(n - t, 1e-9), i = e.map((e) => e.max - e.min).filter((e) => e > 1e-6);
	if (i.length < 2) return !1;
	let a = Math.min(...i), o = Math.max(...i);
	return Math.min(...i.map((e) => e / r)) <= Mi && (o / Math.max(a, 1e-9) >= Ni || r / a >= Ni);
}
function zi(e) {
	let t = e[0], n = e[1], r = -Infinity;
	for (let i = 0; i < e.length; i++) for (let a = i + 1; a < e.length; a++) {
		let o = Li(e[i], e[a]);
		o > r && (r = o, t = e[i], n = e[a]);
	}
	return t.order <= n.order ? [t, n] : [n, t];
}
function Bi(e) {
	if (!Ri(e)) return [e, []];
	let [t, n] = zi(e), r = [], i = [];
	for (let a of e) a.id === t.id ? r.push(a) : a.id === n.id ? i.push(a) : Li(a, t) <= Li(a, n) ? r.push(a) : i.push(a);
	return [r, i];
}
function Vi(e, t, n, r) {
	let i = Math.min(...n.map((e) => e.min)), a = Math.max(...n.map((e) => e.max)), o = Math.max(...n.map((e) => e.precision)), s = Ai(i, a, o), c = Ei(s.min, s.max);
	return {
		ids: new Set(n.map((e) => e.id)),
		graphKey: e,
		axis: t,
		min: s.min,
		max: s.max,
		precision: Math.max(o, ki(c)),
		ticks: c,
		top: r,
		height: 180
	};
}
function Hi(e) {
	let t = [];
	for (let [n, r] of e.entries()) {
		if (r.valueType !== "number" && r.valueType !== "boolean") continue;
		let e = r.points.map((e) => Number(e.value)).filter((e) => Number.isFinite(e)), i = r.scaleMode === "manual" && r.scaleMin !== void 0 ? r.scaleMin : 0, a = r.scaleMode === "manual" && r.scaleMax !== void 0 ? r.scaleMax : 1, o = r.valueType === "boolean" ? 0 : e.length > 0 ? Math.min(...e) : Math.min(i, a), s = r.valueType === "boolean" ? 1 : e.length > 0 ? Math.max(...e) : Math.max(i, a), c = r.valueType === "boolean" || e.length === 0 ? 0 : Math.max(...e.map((e) => wi(e))), l = r.valueType === "boolean" ? "group:boolean" : r.scaleGroupKey, u = t.find((e) => e.key === l);
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
		let [n, r] = e.key === "group:boolean" ? [e.series, []] : Bi(e.series), i = 28 + t * Ci, a = Vi(e.key, "left", n, i);
		return r.length > 0 ? [a, Vi(e.key, "right", r, i)] : [a];
	});
}
function Ui(e, t, n, r) {
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
function Wi(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function Gi(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Ki(e, t) {
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
function qi(e) {
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
function Ji(e, t, n) {
	let r = qi(e);
	if (!r) return [];
	let i = e.find((e) => e.id === r.tempId), a = e.find((e) => e.id === r.hvacId);
	if (!i || !a) return [];
	let o = t.find((e) => e.ids.has(i.id));
	if (!o) return [];
	let s = i.points.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time);
	return s.length === 0 ? [] : Yi(a.points, n).filter((e) => e.value === "heating").reduce((e, t) => {
		let n = e[e.length - 1];
		return n && Math.abs(n.end - t.start) < 1 ? n.end = t.end : e.push({
			start: t.start,
			end: t.end
		}), e;
	}, []).flatMap(({ start: e, end: t }, r) => {
		let i = [
			{
				time: e,
				value: Ki(s, e)
			},
			...s.filter((n) => n.time > e && n.time < t),
			{
				time: t,
				value: Ki(s, t)
			}
		].filter((e) => e.value !== void 0);
		if (i.length === 0) return [];
		let c = o.top + o.height, l = [
			`${Wi(e, n).toFixed(1)},${c.toFixed(1)}`,
			...i.map((e) => `${Wi(e.time, n).toFixed(1)},${Gi(e.value, o).toFixed(1)}`),
			`${Wi(t, n).toFixed(1)},${c.toFixed(1)}`
		].join(" ");
		return [{
			id: `${a.id}:heat:${r}`,
			points: l
		}];
	});
}
function Yi(e, t) {
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
var Xi = 16;
function B(e, t) {
	return 40 + (e - t.start) / (t.end - t.start) * 640;
}
function V(e, t) {
	let n = t.max - t.min;
	if (n < 1e-6) return t.top + t.height / 2;
	let r = t.height - 10;
	return t.top + 5 + r - (e - t.min) / n * r;
}
function Zi(e, t) {
	return t.find((t) => t.ids.has(e.id));
}
function Qi(e, t) {
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
var $i = new Set([
	"off",
	"idle",
	"none",
	"false"
]);
function ea(e, t, n, r) {
	if (typeof e == "boolean") return e ? t : "var(--better-history-muted-color, var(--secondary-text-color, #888))";
	let i = String(e);
	return $i.has(i.toLowerCase()) ? "var(--better-history-muted-color, var(--secondary-text-color, #888))" : (n.has(i) || n.set(i, mi[(r + n.size) % mi.length]), n.get(i));
}
function ta(e, t) {
	return e + 34 + Math.max(t - 1, 0) * 14;
}
function na(e, t, n, r) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode === "column") return [];
		let i = Zi(e, t);
		if (!i) return [];
		let a = Ui(ra(e.points, n, e.lineMode, r), n, 40, 640), { points: o, pathLength: s } = e.lineMode === "line" ? la(a, n, i) : ca(a, n, i);
		return [{
			id: e.id,
			color: e.color,
			points: o,
			pathLength: s,
			lineWidth: e.lineWidth
		}];
	});
}
function ra(e, t, n, r) {
	let i = e.map((e) => ({
		time: e.time,
		value: Number(e.value)
	})).filter((e) => Number.isFinite(e.value)).sort((e, t) => e.time - t.time), a = i.filter((e) => e.time >= t.start && e.time <= t.end);
	if (n === "line") return a;
	let o = [...i].reverse().find((e) => e.time < t.start), s = o && (a.length === 0 || a[0].time > t.start) ? [{
		time: t.start,
		value: o.value
	}, ...a] : a, c = s[s.length - 1];
	return r.extendStairToEnd && c && c.time < t.end ? [...s, {
		time: t.end,
		value: c.value
	}] : s;
}
function ia(e) {
	return e.min <= 0 && e.max >= 0 ? 0 : e.min > 0 ? e.min : e.max;
}
function aa(e, t, n) {
	return e.flatMap((e) => {
		if (e.valueType !== "number" && e.valueType !== "boolean" || e.lineMode !== "column") return [];
		let r = Zi(e, t);
		if (!r) return [];
		let i = V(ia(r), r);
		return Qi(e, n).flatMap((t, a) => {
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
function oa(e, t, n) {
	let r = t + 10, i = 0;
	return e.flatMap((e, t) => {
		if (e.valueType === "number" || e.valueType === "boolean") return [];
		let a = r + i * 14;
		i += 1;
		let o = /* @__PURE__ */ new Map();
		return Qi(e, n).reduce((n, r) => {
			let i = ea(r.value, e.color, o, t), a = n[n.length - 1];
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
function sa(e) {
	return e.flatMap((e) => {
		let t = e.height - 10;
		return e.ticks.map((n) => ({
			y: e.top + 5 + t - (n - e.min) / (e.max - e.min) * t,
			value: ua(n, e.precision)
		}));
	});
}
function ca(e, t, n) {
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
function la(e, t, n) {
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
function ua(e, t) {
	if (t <= 0 && Number.isInteger(e)) return String(e);
	let n = e.toFixed(t);
	return n = n.replace(/\.?0+$/, ""), n;
}
var da = 60 * 1e3, H = 60 * da, U = 24 * H, fa = [
	10 * da,
	15 * da,
	20 * da,
	30 * da,
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
function pa(e, t) {
	for (let n of fa) if (e / n <= t) return n;
	return fa[fa.length - 1];
}
function ma(e, t, n = 12) {
	let r = t - e;
	if (r <= 0) return [];
	let i = pa(r, n), a = [], o = Math.ceil(e / i) * i;
	for (let e = o; e < t; e += i) {
		let t = new Date(e);
		a.push({
			time: e,
			bold: t.getHours() === 0 && t.getMinutes() === 0
		});
	}
	return a;
}
function ha(e, t) {
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
function ga(e, t) {
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
function _a(e, t) {
	return e.map((e) => ({
		...e,
		points: ga(e.points, t)
	}));
}
function va(e) {
	return e.valueType === "boolean" ? "group:boolean" : e.scaleGroupKey;
}
function ya(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
	for (let t of e) {
		if (t.valueType !== "number" && t.valueType !== "boolean") continue;
		let e = va(t);
		i.set(e, [...i.get(e) ?? [], t]);
	}
	for (let e of t) {
		if (e.valueType !== "number" && e.valueType !== "boolean") continue;
		let t = va(e);
		r.set(t, [...r.get(t) ?? [], e]);
	}
	return [...i.entries()].flatMap(([e, t]) => _a(r.get(e) ?? t, n));
}
function ba(e, t, n, r = !1, i = 12, a = !0) {
	let o = { extendStairToEnd: a }, s = Hi(ya(e, t, n)), c = new Set(s.map((e) => e.graphKey)).size, l = ji(c), u = e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").length, d = ma(n.start, n.end, i), f = n.end - n.start;
	return {
		allSeries: e,
		visibleSeries: t,
		timeBounds: n,
		extendStairToEnd: a,
		numericScales: s,
		plotBottom: l,
		chartHeight: ta(l, u),
		numericLines: na(t, s, n, o),
		numericColumns: aa(t, s, n),
		segments: oa(t, l, n),
		heatingAreas: r ? [] : Ji(t, s, n),
		yAxisLabels: sa(s),
		xAxisLabels: d.map((e) => ({
			x: B(e.time, n),
			label: ha(e.time, f),
			bold: e.bold
		}))
	};
}
function xa(e, t, n, r) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode !== "column").flatMap((e) => {
		let i = Zi(e, t);
		if (!i) return [];
		let a = {
			...i,
			top: 28
		}, o = Ui(ra(e.points, n, e.lineMode, r), n, 40, 640), { points: s, pathLength: c } = e.lineMode === "line" ? la(o, n, a) : ca(o, n, a);
		return {
			id: e.id,
			color: e.color,
			points: s,
			pathLength: c,
			lineWidth: e.lineWidth
		};
	});
}
function Sa(e, t, n) {
	return e.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && e.lineMode === "column").flatMap((e) => {
		let r = Zi(e, t);
		if (!r) return [];
		let i = {
			...r,
			top: 28
		}, a = V(ia(i), i);
		return Qi(e, n).flatMap((t, r) => {
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
function Ca(e, t, n) {
	return e.filter((e) => e.valueType !== "number" && e.valueType !== "boolean").flatMap((e, r) => {
		let i = t + r * 14, a = /* @__PURE__ */ new Map();
		return Qi(e, n).reduce((t, n) => {
			let i = ea(n.value, e.color, a, r), o = t[t.length - 1];
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
function wa(e) {
	let t = e.height - 10;
	return e.ticks.map((n) => ({
		y: 33 + t - (n - e.min) / (e.max - e.min) * t,
		value: ua(n, e.precision)
	}));
}
function Ta(e, t) {
	return t === 0 ? e : e.split(" ").map((e) => {
		let [n, r] = e.split(",");
		return `${n},${(parseFloat(r) + t).toFixed(1)}`;
	}).join(" ");
}
function Ea(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
	return {
		allSeries: e.map((e, t) => {
			let a = xi(e.color, r, n * mi.length + t);
			return r.add(Si(a)), i.set(e.id, a), a === e.color ? e : {
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
function Da(e, t = 12) {
	let n = [], r = e.timeBounds, i = e.allSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), a = e.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), o = r.end - r.start, s = ma(r.start, r.end, t).map((e) => ({
		x: B(e.time, r),
		label: ha(e.time, o),
		bold: e.bold
	}));
	if (e.numericScales.length === 0 && i.length > 0) {
		let e = a.length, t = 208 + (e > 0 ? 10 + e * 14 : 0) + 18, o = t + Xi, c = Ea(i, a, 0);
		n.push({
			series: c.visibleSeries,
			allSeries: c.allSeries,
			scales: [],
			svgHeight: t,
			canvasHeight: o,
			lines: [],
			columns: [],
			segments: Ca(c.visibleSeries, 218, r),
			yLabels: [],
			rightYLabels: [],
			xLabels: s,
			heatingAreas: []
		});
	}
	let c = [...new Set(e.numericScales.map((e) => e.graphKey))];
	for (let t = 0; t < c.length; t++) {
		let o = c[t], l = e.numericScales.filter((e) => e.graphKey === o), u = l.find((e) => e.axis === "left") ?? l[0], d = l.find((e) => e.axis === "right"), f = new Set(l.flatMap((e) => [...e.ids])), p = e.allSeries.filter((e) => (e.valueType === "number" || e.valueType === "boolean") && va(e) === o), m = e.visibleSeries.filter((e) => f.has(e.id)), h = t === 0 ? [...m, ...a] : m, g = Ea(t === 0 ? [...p, ...i] : p, h, t), _ = g.visibleSeries.filter((e) => e.valueType !== "number" && e.valueType !== "boolean"), ee = _.length, v = 208 + (ee > 0 ? 10 + ee * 14 : 0) + 18, te = v + Xi, ne = 28 - u.top;
		n.push({
			series: g.visibleSeries,
			allSeries: g.allSeries,
			scale: u,
			scales: l,
			svgHeight: v,
			canvasHeight: te,
			lines: xa(g.visibleSeries, l, r, { extendStairToEnd: e.extendStairToEnd }),
			columns: Sa(g.visibleSeries, l, r),
			segments: Ca(_, 218, r),
			yLabels: wa(u),
			rightYLabels: d ? wa(d) : [],
			xLabels: s,
			heatingAreas: t === 0 ? e.heatingAreas.map((e) => ({
				id: e.id,
				points: Ta(e.points, ne)
			})) : []
		});
	}
	return n;
}
var Oa = class {
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
}, ka = "temperature";
function Aa(e) {
	return e.join(".");
}
function ja(e) {
	return e?.toLowerCase() === ka;
}
function Ma(e, t) {
	if (!e || !t) return;
	let n = t[Aa(e)];
	return typeof n == "string" && n !== "" ? n : void 0;
}
function Na(e) {
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
var Pa = 24, Fa = "2.5", Ia = [
	"current_temperature",
	"temperature",
	"hvac_action"
], La = /°[CF]|[CFK]$/;
function Ra(e) {
	return La.test(e);
}
function za(e) {
	return e.scaleMode === "manual" && (e.scaleMin !== void 0 || e.scaleMax !== void 0);
}
function Ba(e) {
	return /* @__PURE__ */ new Date(Math.floor(e.getTime() / 1e3) * 1e3);
}
function Va(e) {
	if (e !== void 0) return Array.isArray(e) ? e : e.split(".");
}
function Ha(e) {
	return e === "line" || e === "column" ? e : "stair";
}
function Ua(e) {
	return typeof e == "number" ? Number.isFinite(e) && e >= 0 ? String(e) : Fa : typeof e == "string" && e.trim() !== "" ? e.trim() : Fa;
}
function Wa(e, t) {
	return t ? `attr:${e}:${t.join(".")}` : `state:${e}`;
}
function Ga(e) {
	return e[e.length - 1] ?? "";
}
function Ka(e, t, n) {
	let r = e?.states[t];
	return r ? n ? Vr(r, n)?.valueType ?? "string" : Br(r)?.valueType ?? "string" : "number";
}
function qa(e, t, n, r) {
	if (r) return r;
	if (n) return Ga(n);
	let i = e?.states[t]?.attributes.friendly_name;
	return typeof i == "string" && i !== "" ? i : t;
}
function Ja(e, t, n, r, i) {
	if (r !== void 0) return r || void 0;
	if (n) return Ma(n, i);
	let a = e?.states[t]?.attributes.unit_of_measurement;
	return typeof a == "string" && a !== "" ? a : void 0;
}
function Ya(e, t, n, r) {
	return n ? `group:${n}` : r === "number" && t ? `unit:${t}` : `series:${e}`;
}
function Xa(e, t, n, r, i, a) {
	let o = Va(e.attribute), s = Wa(e.entity, o), c = Ka(n, e.entity, o), l = Ja(n, e.entity, o, e.unit, r);
	return {
		id: s,
		entity: e.entity,
		attribute: o,
		label: qa(n, e.entity, o, e.label),
		color: e.color ?? vi(t),
		unit: l,
		scaleGroupKey: Ya(s, l, e.scaleGroup, c),
		scaleMode: e.scaleMode ?? "auto",
		scaleMin: e.scaleMin,
		scaleMax: e.scaleMax,
		lineMode: Ha(e.lineMode ?? i),
		lineWidth: Ua(e.lineWidth ?? a),
		valueType: c
	};
}
function Za(e, t, n, r, i) {
	let a = n?.states[e];
	if (!a) {
		let n = `state:${e}`;
		return {
			id: n,
			entity: e,
			label: e,
			color: vi(t),
			scaleGroupKey: `series:${n}`,
			scaleMode: "auto",
			lineMode: Ha(r),
			lineWidth: Ua(i),
			valueType: "number"
		};
	}
	let o = Br(a);
	if (o) return {
		id: o.id,
		entity: e,
		label: o.label,
		color: vi(t),
		unit: o.unit,
		scaleGroupKey: Ya(o.id, o.unit, void 0, o.valueType),
		scaleMode: "auto",
		lineMode: Ha(r),
		lineWidth: Ua(i),
		valueType: o.valueType
	};
}
function Qa(e, t) {
	let n = t?.states[e];
	if (!n) return;
	let r = n.attributes, i = r.temperature_unit;
	if (typeof i == "string" && i !== "") return i;
	let a = r.unit_of_measurement;
	if (typeof a == "string" && a !== "") return a;
}
function $a(e, t, n) {
	if (e.attribute || !e.entity.startsWith("climate.") || !n?.states[e.entity]) return [e];
	let r = Qa(e.entity, n);
	return [e, ...Ia.map((i) => {
		let a = [i], o = Wa(e.entity, a), s = Ka(n, e.entity, a), c = hi[i] ?? vi(t()), l = i === "current_temperature" || i === "temperature" ? r : void 0, u = i === "hvac_action" ? void 0 : "temperature";
		return {
			id: o,
			entity: e.entity,
			attribute: a,
			label: i,
			color: c,
			unit: l,
			scaleGroupKey: Ya(o, l, u, s),
			scaleMode: "auto",
			lineMode: e.lineMode,
			lineWidth: e.lineWidth,
			valueType: s
		};
	})];
}
function eo(e) {
	return e.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && Ra(e.unit))?.unit ?? e.find((e) => e.unit && Ra(e.unit))?.unit;
}
function to(e) {
	let t = eo(e), n = e.some((e) => e.scaleGroupKey === "group:temperature");
	return e.map((e) => {
		let r = ja(e.unit), i = r && t ? t : e.unit, a = r && i && e.scaleGroupKey === "unit:temperature" ? `unit:${i}` : e.scaleGroupKey;
		return n && e.valueType === "number" && i && Ra(i) && a.startsWith("unit:") && !za(e) && (a = "group:temperature"), i !== e.unit || a !== e.scaleGroupKey ? {
			...e,
			unit: i,
			scaleGroupKey: a
		} : e;
	});
}
function no(e) {
	let { config: t, hass: n } = e, r = e.attributeUnits ?? t?.attributeUnits, i = t?.endDate ?? e.endDate ?? /* @__PURE__ */ new Date(), a = t?.hours ?? e.hours ?? Pa, o = t?.startDate ?? e.startDate ?? /* @__PURE__ */ new Date(i.getTime() - a * 36e5), s = t?.lineMode ?? e.lineMode, c = t?.lineWidth ?? e.lineWidth, l;
	l = t?.series && t.series.length > 0 ? t.series.map((e, t) => Xa(e, t, n, r, s, c)) : (t?.defaultEntities ?? e.entities ?? []).map((e, t) => Za(e, t, n, s, c)).filter((e) => e !== void 0);
	let u = l.length;
	return l = l.flatMap((e) => $a(e, () => u++, n)), l = to(l), {
		startDate: Ba(o),
		endDate: Ba(i),
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
var ro = {
	loading: "ui.common.loading",
	empty: "ui.components.history_charts.no_history_found",
	error: "ui.components.history_charts.error",
	add_target: "ui.components.target-picker.add_target",
	attributes: "ui.dialogs.more_info_control.attributes",
	back: "ui.common.back"
}, io = {
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
	let n = ro[t];
	return n && e?.localize ? e.localize(n) : io[e?.locale?.language?.split("-")[0] ?? e?.language?.split("-")[0] ?? "en"]?.[t] ?? io.en?.[t] ?? t;
}
var ao = en`
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
`, oo = [
	"ha-icon",
	"ha-icon-button",
	"ha-svg-icon",
	"ha-entity-picker",
	"ha-md-list",
	"ha-md-list-item",
	"ha-input-chip",
	"ha-assist-chip",
	"ha-generic-picker"
], so;
function co() {
	return so ??= sr(oo), so;
}
var lo;
function uo() {
	return lo ??= fo(), lo;
}
async function fo() {
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
function po() {
	return customElements.get("ha-date-range-picker") !== void 0;
}
async function mo() {
	await uo();
}
function ho(e, t, n, r) {
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
function go(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function _o(e) {
	return typeof e.attributes.friendly_name == "string" ? e.attributes.friendly_name : e.entity_id;
}
var vo = !1;
async function yo() {
	vo || (vo = !0, await co());
}
function bo() {
	return customElements.get("ha-generic-picker") !== void 0;
}
function xo(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0;
	return M`
    <div class="entity-picker"
      @picker-opened=${e.onEntityPickerOpened}
      @picker-closed=${e.onEntityPickerClosed}
    >
      <div class="entity-menu" ?open=${e.menuOpen} @click=${(e) => e.stopPropagation()}>
        <div class="entity-menu-top">
          <span class="entity-menu-title">${t ? _o(t) : ""}</span>
          <button class="entity-menu-close" @click=${e.onCloseMenu}>&#x2715;</button>
        </div>
        ${To(e)}
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
        <div
          class="entity-row"
          @dragover=${(t) => e.onSourceDragOver(void 0, t)}
          @drop=${(t) => e.onSourceDrop(void 0, t)}
        >
          ${e.selectedSources.map((t) => Co(t, e))}
        </div>
      ` : P}
    </div>
  `;
}
function So(e) {
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
function Co(e, t) {
	let n = t.resolved?.series.some((t) => t.id === e.id) ?? !1, r = e.kind === "entity_state", i = t.hass?.states[e.entityId], a = r ? "entity-source-chip" : "attr-source-chip", o = t.draggingSourceId === e.id;
	return M`
    <div
      class="source-chip ${a}"
      draggable=${!n}
      ?dragging=${o}
      @dragstart=${(n) => t.onSourceDragStart(e.id, n)}
      @dragend=${() => t.onSourceDragEnd()}
      @dragover=${(r) => {
		n || t.onSourceDragOver(e.id, r);
	}}
      @drop=${(n) => t.onSourceDrop(e.id, n)}
    >
      <span class="source-chip-icon">
        ${r && i ? M`<ha-icon .icon=${So(i)}></ha-icon>` : M`<ha-icon .icon=${wo(e.valueType)}></ha-icon>`}
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
function wo(e) {
	switch (e) {
		case "number": return "mdi:chart-line";
		case "string": return "mdi:text";
		case "boolean": return "mdi:toggle-switch";
		default: return "mdi:code-tags";
	}
}
function To(e) {
	let t = e.selectedEntityId && e.hass ? e.hass.states[e.selectedEntityId] : void 0, n = e.path, r = t ? (() => {
		if (n.length === 0) return t.attributes;
		let e = t.attributes;
		for (let t of n) {
			if (!go(e)) return;
			e = e[t];
		}
		return e;
	})() : void 0;
	return M`
    <div class="entity-browser">
      ${Eo(t, e)}
      <div class="entity-browser-list">
        ${t ? Do(t, n, go(r) ? r : {}, e) : M`<div class="entity-browser-empty">${W(e.hass, "no_entity_selected")}</div>`}
      </div>
    </div>
  `;
}
function Eo(e, t) {
	return !e || t.path.length === 0 ? M`` : M`
    <div class="entity-breadcrumb">
      ${t.path.map((e, n) => M`
          ${n > 0 ? M`<span class="entity-breadcrumb-sep">/</span>` : P}
          <button class="entity-crumb" @click=${() => t.onBreadcrumbClick(t.path.slice(0, n + 1))}>${e}</button>
        `)}
    </div>
  `;
}
function Do(e, t, n, r) {
	let i = Object.entries(n).sort(([e], [t]) => e.localeCompare(t)), a = i.some(([n, r]) => go(r) ? !0 : zr(r) !== void 0 && !!Vr(e, [...t, n]));
	return M`
    <div class="entity-browser-entries">
      ${t.length > 0 ? M`
            <div class="entity-browser-back" @click=${() => r.onBreadcrumbClick(t.slice(0, -1))}>
              &#x2190; ${W(r.hass, "back")}
            </div>
          ` : M`
            ${Mo(e, r)}
            ${a ? M`<div class="entity-browser-section-title">${W(r.hass, "attributes")}</div>` : P}
          `}
      ${i.map(([n, i]) => No(e, n, i, t, r))}
    </div>
  `;
}
function Oo(e, t) {
	return t.selectedSources.some((t) => t.id === e);
}
function ko(e, t) {
	return (t.resolved?.series ?? []).some((t) => t.id === e);
}
function Ao(e, t) {
	let n = t.selectedSources.some((t) => t.entityId === e), r = (t.resolved?.series ?? []).some((t) => t.entity === e);
	return n || r;
}
function jo(e, t) {
	if (!e.entity_id.startsWith("climate.")) return !1;
	let n = t.selectedSources.some((t) => t.entityId.startsWith("climate.") && t.entityId !== e.entity_id), r = (t.resolved?.series ?? []).some((t) => t.entity.startsWith("climate.") && t.entity !== e.entity_id);
	return n || r;
}
function Mo(e, t) {
	let n = Br(e);
	return n ? jo(e, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Oo(n.id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--removable" @click=${() => t.onSourceRemoved(n.id)}>
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : ko(n.id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--present entity-browser-entity--forced">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : Ao(e.entity_id, t) ? M`
      <div class="entity-browser-entity entity-browser-entity--disabled">
        <span class="entity-browser-entry-label">${e.entity_id}</span>
      </div>
    ` : M`
    <div class="entity-browser-entity" @click=${() => t.onSourceAdded(n)}>
      <span class="entity-browser-entry-label">${e.entity_id}</span>
    </div>
  ` : P;
}
function No(e, t, n, r, i) {
	if (go(n)) return M`
      <div class="entity-browser-entry" @click=${() => i.onBreadcrumbClick([...r, t])}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-arrow">&#x203A;</span>
      </div>
    `;
	let a = zr(n), o = [...r, t], s = a ? Vr(e, o) : void 0;
	return s ? Oo(s.id, i) ? M`
      <div class="entity-browser-entry entity-browser-entry--present entity-browser-entry--removable" @click=${() => i.onSourceRemoved(s.id)}>
        <span class="entity-browser-entry-label">${t}</span>
        <span class="entity-browser-entry-type">${a}</span>
      </div>
    ` : ko(s.id, i) ? M`
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
var Po = /°[CF]|[CFK]$/, Fo = 60, Io = 1e3;
function Lo(e) {
	return Po.test(e);
}
var K = class extends nr {
	constructor(...e) {
		super(...e), this.hours = 24, this.showDatePicker = !1, this.showEntityPicker = !1, this.showLegend = !0, this.showTooltip = !0, this.showControls = !0, this.debugPerformance = !1, this.toolsOpen = !1, this._hiddenSeriesIds = [], this._liveNow = Date.now(), this._datePickerReady = !1, this._entityComponentsReady = !1, this._attributeMenuOpen = !1, this._path = [], this._selectedSources = [], this._customEntityIds = [], this._entityPickerOpen = !1, this._data = new pi(this), this._tooltip = new Oa(this), this._prevClipX = /* @__PURE__ */ new Map(), this._prevStartTime = 0, this._prevEndTime = 0, this._prevContainerWidth = 0, this._wasLoading = !1, this._suppressLineAnimation = !1, this._pendingAddedSources = [], this._dragDropCommitted = !1, this._lastPickerOverlayOpen = !1, this._containerWidth = 0, this._lastFetchKey = "", this._lastFetchSources = [], this._lastHassResolveTime = 0, this._getEntityPickerItems = () => this._pickerEntities().map((e) => ({
			id: e.entity_id,
			primary: _o(e),
			secondary: e.entity_id
		})), this._getAdditionalEntityPickerItems = (e) => {
			if (!this.hass || !e?.trim()) return [];
			let t = e.toLowerCase(), n = new Set(this._pickerEntities().map((e) => e.entity_id));
			return Object.values(this.hass.states).filter((e) => e !== void 0).filter((e) => !n.has(e.entity_id)).filter((e) => e.entity_id.toLowerCase().includes(t) || typeof e.attributes.friendly_name == "string" && e.attributes.friendly_name.toLowerCase().includes(t)).slice(0, 20).map((e) => ({
				id: e.entity_id,
				primary: _o(e),
				secondary: e.entity_id
			}));
		}, this._handleDocumentPointerDown = (e) => {
			this._attributeMenuOpen && (this._isEventInsideAttributeOverlay(e) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()));
		}, this._handleDocumentClick = (e) => {
			this._attributeMenuOpen && (this._isEventInsideAttributeOverlay(e) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this._closeAttributeMenu()));
		};
	}
	static {
		this.styles = ao;
	}
	connectedCallback() {
		super.connectedCallback(), co(), document.addEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.addEventListener("mousedown", this._handleDocumentPointerDown, !0), document.addEventListener("click", this._handleDocumentClick, !0), this._resizeObserver = new ResizeObserver((e) => {
			let t = e[0]?.contentRect.width ?? 0;
			t !== this._containerWidth && (this._containerWidth = t);
		}), this._resizeObserver.observe(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), document.removeEventListener("pointerdown", this._handleDocumentPointerDown, !0), document.removeEventListener("mousedown", this._handleDocumentPointerDown, !0), document.removeEventListener("click", this._handleDocumentClick, !0), this._resizeObserver?.disconnect(), this._resizeObserver = void 0, this._sourceAddBatchTimer !== void 0 && (clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = void 0), this._stopLiveClock();
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
			let e = this._effectiveEndDate().getTime(), t = !this._viewEnd || Math.abs(this._viewEnd.getTime() - e) <= Io * 2, n = Date.now();
			this._liveNow = n, t && (this._viewEnd = new Date(n));
		}, Io);
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
		if (this._resolved) for (let n of this._resolved.series) t.has(n.id) || (t.add(n.id), e.push(Na(n)));
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
		return this._resolved?.series.find((e) => e.scaleGroupKey === "group:temperature" && e.unit && Lo(e.unit))?.unit;
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
			let t = no({
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
			t.showDatePicker && !this._datePickerReady && mo().then(() => {
				this._datePickerReady = po(), this.requestUpdate();
			}), t.showEntityPicker && !this._entityComponentsReady && yo().then(() => {
				this._entityComponentsReady = bo(), this.requestUpdate();
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
			if (n && Lo(e.unit)) return n.scaleGroupKey;
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
				color: vi(i),
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
		let e = this._hiddenSeriesIds.join("|"), t = this._chartSourceKey(), n = this._chartRenderCache, r = this._effectiveViewRange(), i = r.start.getTime(), a = r.end.getTime(), o = this._containerWidth, s = !this._data.loading;
		if (n && n.seriesRef === this._data.series && n.sourceKey === t && n.hiddenKey === e && n.startTime === i && n.endTime === a && n.extendStairToEnd === s && n.containerWidth === o) return n.data;
		let c = this._maxXTicks(), l = this._buildRenderSeries(), u = l.filter((e) => !this._hiddenSeriesIds.includes(e.id)), d = {
			start: i,
			end: Math.max(a, i + 1)
		}, f = this._data.debugPerformance, p = f ? R() : 0, m = ba(l, u, d, this._resolved?.disableClimateOverlay ?? !1, c, s), h = f ? R() - p : 0;
		return f && z(f, "chart.build_data", {
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
		let t = this._maxXTicks(), n = this._graphGroupRenderCache;
		if (n && n.dataRef === e && n.maxXTicks === t) return n.groups;
		let r = Da(e, t);
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
		return !this._resolved?.showEntityPicker || !this._entityComponentsReady ? P : xo({
			hass: this.hass,
			menuOpen: this._attributeMenuOpen,
			entityPickerOpen: this._entityPickerOpen,
			selectedEntityId: this._selectedEntityId,
			path: this._path,
			selectedSources: this._selectedSources,
			draggingSourceId: this._draggingSourceId,
			resolved: this._resolved,
			loading: this._data.loading,
			getItems: this._getEntityPickerItems,
			getAdditionalItems: this._getAdditionalEntityPickerItems,
			onEntityPickerOpened: () => this._onEntityPickerOpened(),
			onEntityPickerClosed: () => this._onEntityPickerClosed(),
			onEntitySelected: (e) => this._onEntitySelected(e),
			onSourceAdded: (e) => this._addSource(e),
			onSourceRemoved: (e) => this._removeSource(e),
			onSourceDragStart: (e, t) => this._onSourceDragStart(e, t),
			onSourceDragOver: (e, t) => this._onSourceDragOver(e, t),
			onSourceDragEnd: () => this._onSourceDragEnd(),
			onSourceDrop: (e, t) => this._onSourceDrop(e, t),
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
		return !this._resolved?.showDatePicker || !this._datePickerReady ? P : ho(this.hass, this._resolved.startDate, this._resolved.endDate, (e, t) => this._onDateRangeChanged(e, t));
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
		new Set(this._pickerEntities().map((e) => e.entity_id)).has(e) || (this._customEntityIds = [...this._customEntityIds, e]), this._selectedEntityId = e, this._path = [], this._entityPickerOpen = !1, this._attributeMenuOpen = !0;
	}
	_onEntityPickerOpened() {
		this._entityPickerOpen = !0, this._attributeMenuOpen = !1;
	}
	_onEntityPickerClosed() {
		this._entityPickerOpen = !1;
	}
	_isEventInsideAttributeOverlay(e) {
		let t = e.composedPath(), n = this.renderRoot?.querySelector(".entity-menu");
		if (n && t.includes(n)) return !0;
		for (let e of t) {
			if (!(e instanceof HTMLElement)) continue;
			let t = e.localName;
			if (t === "ha-generic-picker" || t === "ha-combo-box" || t === "vaadin-combo-box-overlay" || t === "mwc-menu-surface" || t === "ha-md-list" || t === "md-menu") return !0;
		}
		return !1;
	}
	_sourceWithAttributeUnit(e) {
		if (e.kind !== "entity_attribute" || !e.path) return e;
		let t = Ma(e.path, this.attributeUnits ?? this.config?.attributeUnits), n = ja(t) ? this._resolvedTemperatureUnit() ?? t : t;
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
		})), this._sourceAddBatchTimer !== void 0 && clearTimeout(this._sourceAddBatchTimer), this._sourceAddBatchTimer = setTimeout(() => this._flushPendingAddedSources(), Fo);
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
})], K.prototype, "toolsOpen", void 0), G([L()], K.prototype, "_resolved", void 0), G([L()], K.prototype, "_hiddenSeriesIds", void 0), G([L()], K.prototype, "_rangeStart", void 0), G([L()], K.prototype, "_rangeEnd", void 0), G([L()], K.prototype, "_viewStart", void 0), G([L()], K.prototype, "_viewEnd", void 0), G([L()], K.prototype, "_liveNow", void 0), G([L()], K.prototype, "_datePickerReady", void 0), G([L()], K.prototype, "_entityComponentsReady", void 0), G([L()], K.prototype, "_runtimeLineMode", void 0), G([L()], K.prototype, "_attributeMenuOpen", void 0), G([L()], K.prototype, "_selectedEntityId", void 0), G([L()], K.prototype, "_path", void 0), G([L()], K.prototype, "_selectedSources", void 0), G([L()], K.prototype, "_customEntityIds", void 0), G([L()], K.prototype, "_entityPickerOpen", void 0), G([L()], K.prototype, "_draggingSourceId", void 0), G([L()], K.prototype, "_containerWidth", void 0), customElements.get("ha-better-history") || customElements.define("ha-better-history", K);
//#endregion
//#region src/data/attribute-units.ts
var Ro = "attributes.json", zo = {}, Bo;
function Vo() {
	return new URL(Ro, import.meta.url).toString();
}
function Ho(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return zo;
	let t = {};
	for (let [n, r] of Object.entries(e)) n !== "" && typeof r == "string" && r !== "" && (t[n] = r);
	return t;
}
function Uo() {
	return Bo ??= fetch(Vo()).then((e) => e.ok ? e.json() : zo).then(Ho).catch(() => zo), Bo;
}
function Wo(e) {
	return e ?? zo;
}
//#endregion
//#region src/components/eq-history-dialog.ts
var Go = class extends w {
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
		this._attributeUnitsLoadStarted || (this._attributeUnitsLoadStarted = !0, Uo().then((e) => {
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
        .headerTitle=${this.hass?.states[this.config?.entity ?? ""]?.attributes?.friendly_name ?? this.config?.entity ?? T(this.language, "dialog.history.title")}
        width="large"
        flexcontent
        ?fullscreen=${this._fullscreen}
        @closed=${(e) => this._handleDialogClosed(e)}
      >
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-tools-btn"
          .label=${T(this.language, "dialog.history.tools")}
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
          .label=${T(this.language, this._controlsVisible ? "dialog.history.hide_controls" : "dialog.history.show_controls")}
          @click=${() => {
			this._controlsVisible = !this._controlsVisible;
		}}
        >
          <ha-icon icon=${this._controlsVisible ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          slot="headerActionItems"
          class="dialog-fullscreen-btn dialog-fs-toggle"
          .label=${T(this.language, this._fullscreen ? "dialog.history.exit_fullscreen" : "dialog.history.fullscreen")}
          @click=${this._toggleFullscreen}
        >
          <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
        </ha-icon-button>
        ${this.open ? S`<ha-better-history
              .hass=${this.hass}
              .config=${this._betterHistoryConfig()}
              .attributeUnits=${Wo(this._staticAttributeUnits)}
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
customElements.get("eq-history-dialog") || customElements.define("eq-history-dialog", Go);
//#endregion
//#region src/components/eq-lock-dialog.ts
var Ko = 4, qo = [
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
], Jo = class extends w {
	constructor(...e) {
		super(...e), this.open = !1, this.entityId = "", this.isLocking = !0, this._code = "", this._error = !1, this._loading = !1, this._onKeyDown = (e) => {
			this.open && (e.key >= "0" && e.key <= "9" ? this._pressDigit(e.key) : e.key === "Backspace" ? this._pressBackspace() : e.key === "Escape" ? this._cancel() : e.key === "Enter" && this._code.length === Ko && this._validate());
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
		let e = this.isLocking ? T(this.language, "main.lock.locked") : T(this.language, "main.lock.unlocked"), t = T(this.language, "main.lock.enter_code"), n = T(this.language, "main.lock.wrong_code"), r = T(this.language, "dialog.close");
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
          ${Array.from({ length: Ko }, (e, t) => S`
            <div
              class="dot"
              ?filled=${t < this._code.length && !this._error}
              ?error=${this._error}
            ></div>
          `)}
        </div>
        <div class="error-msg">${this._error ? n : C}</div>
        <div class="keypad">
          ${qo.map((e) => this._renderKey(e))}
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
        ?disabled=${this._loading || this._code.length >= Ko}
        @click=${() => this._pressDigit(e)}
      >
        ${e}
      </button>
    `;
	}
	_pressDigit(e) {
		this._loading || this._code.length >= Ko || (this._error = !1, this._code += e, this._code.length === Ko && this._validate());
	}
	_pressBackspace() {
		this._loading || this._code.length === 0 || (this._error = !1, this._code = this._code.slice(0, -1));
	}
	async _validate() {
		if (this._loading || !this.hass || this._code.length < Ko) return;
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
customElements.get("eq-lock-dialog") || customElements.define("eq-lock-dialog", Jo);
//#endregion
//#region src/components/eq-main-card.ts
var Yo = [
	"frost",
	"eco",
	"away",
	"comfort",
	"home",
	"sleep",
	"activity",
	"boost"
], Xo = {
	frost: "mdi:snowflake",
	eco: "mdi:tree-outline",
	away: "mdi:home-export-outline",
	comfort: "mdi:sofa-outline",
	home: "mdi:home-outline",
	sleep: "mdi:sleep",
	activity: "mdi:motion-sensor",
	boost: "mdi:rocket-launch-outline"
}, Zo = [
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
], Qo = {
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
}, $o = {
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
function es(e, t) {
	let n = [...new Set(e)], r = t.filter((e) => n.includes(e)), i = n.filter((e) => !t.includes(e));
	return [...r, ...i];
}
var ts = class extends w {
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
			Nt,
			Pt,
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

      ha-control-button[tone="heat-cool"][active][subtle] {
        --control-button-icon-color: var(--equinox-heat-cool-color);
        --control-button-background-color: color-mix(in srgb, var(--equinox-control-bg) 78%, var(--equinox-heat-cool-color) 22%);
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
			Ft
		];
	}
	connectedCallback() {
		super.connectedCallback(), this.addEventListener("mouseleave", this._handleMouseLeave);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeEventListener("mouseleave", this._handleMouseLeave), this._clearPowerInfoPressTimer();
	}
	willUpdate() {
		this.setAttribute("theme", this.config?.theme ?? "flat"), this.toggleAttribute("light", !this.hass?.themes?.darkMode);
	}
	render() {
		if (!this.viewModel || !this.config) return C;
		let e = this.config?.display_mode === "compact", t = this.config.state_icons_layout === "vertical", n = this.viewModel.vt?.lock.isConfigured === !0 && this.viewModel.vt.lock.isUserLocked === !0, r = this._activeHvacAction();
		return S`
      <ha-card ?locked=${n} tone=${this._cardTone()} active-action=${r ?? C}>
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
        .title=${T(this._language(), "dialog.message.title")}
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
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? T(this._language(), "main.lock.locked") : T(this._language(), "main.lock.unlocked"), n = this.config?.display_mode !== "compact" && this._hasFanControl(), r = this.config?.display_mode !== "compact" && this._hasSwingControl();
		return S`
      <div class="status">
        ${n ? this._renderFanButton() : C}
        ${r ? this._renderSwingButton() : C}
        ${this._renderPowerInfoButton()}
        <span class="status-spacer"></span>
        <div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>
        ${e ? this._renderLockButton(t) : C}
        ${this.config?.disable_name ? this._renderMenuButton() : C}
      </div>
    `;
	}
	_renderStateRail() {
		let e = !this.config?.hide_lock_button && this.viewModel?.vt?.lock.isConfigured === !0, t = this.viewModel?.vt?.lock.isLocked ? T(this._language(), "main.lock.locked") : T(this._language(), "main.lock.unlocked");
		return [
			...this.config?.disable_name ? [this._renderMenuButton()] : [],
			...e ? [this._renderLockButton(t)] : [],
			S`<div class="events">${this._renderEvents()}${this._renderHvacStateIcon()}</div>`
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
		let e = this.viewModel?.climate.hvacAction, t = e ? $o[e] : void 0, n = this.viewModel?.climate.hvacMode;
		if (n === "off" && this.viewModel?.vt?.messages.some((e) => e.key === "hvac_off_manual")) return C;
		let r = t?.icon || (n ? A[n] : ""), i = t?.tone ?? this._modeTone(n), a = e ? T(this._language(), `main.hvac_action.${e}`) : this._hvacLabel(n);
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
		let n = new Set(Zo.filter((e) => e.key === "hasTimer").flatMap((e) => e.messageKeys ?? [])), r = t.map((e) => {
			let t = n.has(e.key) ? (e) => this._openBoost(e) : void 0;
			return this._renderMessageIcon(e, t);
		}), i = Zo.filter((n) => {
			let r = n.messageKeys ?? [];
			return e[n.key] && !r.some((e) => t.some((t) => t.key === e));
		}).map((e) => {
			let t = e.key === "hasTimer" ? (e) => this._openBoost(e) : void 0;
			return this._renderEventIcon(e, t);
		});
		return [...r, ...i];
	}
	_renderEventIcon(e, t) {
		let n = T(this._language(), `main.events.${e.key}`);
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
		return Qo[e] ?? {
			icon: "mdi:information-outline",
			tone: "info"
		};
	}
	_messageLabel(e) {
		return T(this._language(), `main.messages.${e}`);
	}
	_renderSetpoint() {
		return this.config?.primary_display === "sensors" ? this._renderSensorFocus() : S`<div class="setpoint">${this._renderTemperatureControl(!1)}</div>`;
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
        ${this._renderTemperatureControl(!0)}
      </div>
    `;
	}
	_renderTemperatureControl(e) {
		return this._hasTemperatureRangeControl() ? this._renderRangeSetpointControl(e) : this._renderSetpointControl(e);
	}
	_renderSetpointControl(e) {
		let t = this._isControlDisabled() || !q(this.viewModel?.climate.targetTemperature), n = this._setpointFallback(), r = n.length || 4;
		return S`
      <div class="setpoint-control" ?compact=${e}>
        <ha-control-button
          class="step"
          .label=${T(this._language(), "main.actions.decrease_temperature")}
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
          .label=${T(this._language(), "main.actions.increase_temperature")}
          ?disabled=${t}
          @click=${() => this._changeTemperature(1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-control-button>
      </div>
    `;
	}
	_renderRangeSetpointControl(e) {
		let t = this.viewModel?.climate.targetTemperatureRange;
		return S`
      <div class="range-setpoint-control" ?compact=${e}>
        ${this._renderRangeBound("low", t?.low, e)}
        ${this._renderRangeBound("high", t?.high, e)}
      </div>
    `;
	}
	_renderRangeBound(e, t, n) {
		let r = this._isControlDisabled() || !q(t), i = e === "low" ? "main.actions.low_temperature" : "main.actions.high_temperature", a = T(this._language(), i), o = this._rangeSetpointFallback(e), s = o.length || 4;
		return S`
      <div class="range-bound">
        <span class="range-label">${a}</span>
        <div class="setpoint-control" ?compact=${n}>
          <ha-control-button
            class="step"
            .label=${T(this._language(), "main.actions.decrease_temperature")}
            ?disabled=${r}
            @click=${() => this._changeRangeTemperature(e, -1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </ha-control-button>
          <div class="target" mode=${this._targetTone()} ?compact=${n}>
            <span class="setpoint-unit" aria-hidden="true" style="visibility: hidden">°</span>
            <input
              class="setpoint-input"
              type="text"
              inputmode="decimal"
              .value=${o}
              placeholder="--.-"
              style="width: ${s}ch"
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
            .label=${T(this._language(), "main.actions.increase_temperature")}
            ?disabled=${r}
            @click=${() => this._changeRangeTemperature(e, 1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-control-button>
        </div>
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
		let e = es(this.viewModel?.climate.hvacModes ?? [], Et).filter((e) => A[e]);
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
          <ha-icon .icon=${A[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderPresets() {
		let e = es(this.viewModel?.climate.presetModes ?? [], Yo).filter((e) => e !== "none" && Xo[e] && !this._hidePreset(e));
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
          <ha-icon .icon=${Xo[e]}></ha-icon>
        </span>
      </ha-control-button>
    `;
	}
	_renderCompactSelectors() {
		let e = this.viewModel?.climate.hvacMode, t = this.viewModel?.climate.presetMode, n = es(this.viewModel?.climate.hvacModes ?? [], Et).filter((e) => A[e]), r = e && n.includes(e) ? e : void 0, i = n.length > 0, a = (this.viewModel?.climate.presetModes ?? []).filter((e) => e !== "none" && Xo[e]).length > 0, o = t && t !== "none" && Xo[t] ? Xo[t] : "mdi:knob", s = !!t && t !== "none" && !!Xo[t], c = this._hasFanControl(), l = this._hasSwingControl(), u = +!!i + +!!a + +!!c + +!!l;
		return u === 0 ? C : S`
      <div class="compact-selectors" style=${u < 4 ? `width: calc(100% / 3 * ${u}); margin-inline: auto;` : ""}>
        ${i ? S`
              <ha-control-button
                .label=${r ? this._hvacLabel(r) : T(this._language(), "dialog.hvac.title")}
                tone=${this._modeTone(r)}
                ?active=${r !== "off" && !!r}
                ?subtle=${!0}
                ?disabled=${this._isControlDisabled()}
                @click=${(e) => this._openDialog("hvac", e)}
              >
                <span class="btn-icon" tone=${this._modeTone(r)}>
                  <ha-icon .icon=${r ? A[r] : "mdi:thermostat"}></ha-icon>
                </span>
              </ha-control-button>
            ` : C}
        ${a ? S`
              <ha-control-button
                .label=${t && t !== "none" ? this._presetLabel(t) : T(this._language(), "main.preset.none")}
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
                <span class="btn-icon" tone="fan">
                  <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
                </span>
              </ha-control-button>
            ` : C}
        ${l ? S`
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
		let e = T(this._language(), "main.actions.open_power_info");
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
      <button class="fan" title=${T(this._language(), "main.actions.open_fan")} aria-label=${T(this._language(), "main.actions.open_fan")} @click=${(e) => this._openDialog("fan", e)}>
        <ha-icon class=${this._fanIconClass()} .icon=${this._fanIcon()}></ha-icon>
        <span class="fan-label">${this._fanLabel()}</span>
      </button>
    `;
	}
	_renderSwingButton() {
		let e = T(this._language(), "main.actions.open_swing");
		return S`
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
		return !e && !q(t) ? C : S`
      <div class="meter">
        ${e ? S`<span class="meter-line"><ha-icon .icon=${e.icon}></ha-icon><span>${e.label}</span></span>` : C}
        ${q(t) ? S`<span class="meter-line"><ha-icon icon="mdi:flash"></ha-icon><span>${this._formatNumber(t)}${n ? ` ${n}` : ""}</span></span>` : C}
      </div>
    `;
	}
	_renderMenuButton() {
		return S`
      <button class="menu" title=${T(this._language(), "main.actions.open_menu")} aria-label=${T(this._language(), "main.actions.open_menu")} @click=${(e) => this._openDialog("menu", e)}>
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
		return e ? Dt[e] ?? "" : "";
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
		return e ? jt[e] ?? "mdi:fan-speed-2" : "mdi:fan-speed-2";
	}
	_fanIconClass() {
		let e = this._fanIcon();
		return e === "mdi:fan-auto" ? "fan-icon-auto" : e === "mdi:fan-speed-2" ? "fan-icon-speed" : "";
	}
	_fanLabel() {
		let e = this.viewModel?.climate.fanMode ?? this.viewModel?.vt?.fan.currentAutoFanMode ?? (this.viewModel?.climate.fanModes.includes("auto") ? "auto" : void 0);
		return e ? this._optionLabel("main.fan", e) : T(this._language(), "main.fan.unavailable");
	}
	_swingIcon() {
		let e = this.viewModel?.climate.swingMode, t = this.viewModel?.climate.swingHorizontalMode;
		return e ? kt[e] ?? "mdi:arrow-oscillating" : t ? At[t] ?? kt[t] ?? "mdi:arrow-expand-horizontal" : "mdi:arrow-oscillating";
	}
	_swingLabel() {
		let e = this.viewModel?.climate.swingMode ?? this.viewModel?.climate.swingHorizontalMode;
		return e ? this._optionLabel("main.swing", e) : T(this._language(), "main.swing.unavailable");
	}
	_hvacLabel(e) {
		return !e || this.viewModel?.climate.availability !== "available" ? T(this._language(), "main.status.unavailable") : e === "off" ? T(this._language(), "main.status.off") : this._optionLabel("main.hvac", e);
	}
	_presetLabel(e) {
		return this._optionLabel("main.preset", e);
	}
	_optionLabel(e, t) {
		let n = T(this._language(), `${e}.${t}`);
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
		}).format(a), ht({
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
		}).format(a[n]), ht({
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
		ht({
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
		i && ht({
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
		!this.hass || !this.config || !this.viewModel || gt({
			hass: this.hass,
			entityId: this.config.entity,
			viewModel: this.viewModel
		}, e);
	}
	_setPresetMode(e) {
		!this.hass || !this.config || !this.viewModel || _t({
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
			Tt(e);
			return;
		}
		wt(e);
	}
};
customElements.get("eq-main-card") || customElements.define("eq-main-card", ts);
//#endregion
//#region src/data/format.ts
var ns = new Set(["unknown", "unavailable"]);
function rs(e) {
	return e == null || typeof e == "string" && ns.has(e);
}
function J(e) {
	if (!(rs(e) || typeof e != "string" || e.trim() === "")) return e;
}
function Y(e) {
	if (rs(e)) return;
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (typeof e != "string" || e.trim() === "") return;
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function is(e) {
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
function as(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string" && e.trim() !== "") : typeof e == "string" && e.trim() !== "" ? [e] : [];
}
function os(e) {
	return e === "safety_detected" || e === "heating_failure" || e === "cooling_failure" ? "danger" : e === "overpowering_detected" || e === "not_initialized" ? "alert" : "info";
}
function ss(e) {
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
function cs(e) {
	let t = J(Q(e, ["configuration", "type"])), n = [];
	return (e.is_over_switch === !0 || t === "over_switch") && n.push("over_switch"), (e.is_over_valve === !0 || t === "over_valve") && n.push("over_valve"), (e.is_over_climate === !0 || t === "over_climate") && n.push("over_climate"), (Q(e, ["vtherm_over_climate_valve", "have_valve_regulation"]) === !0 || Q(e, ["configuration", "have_valve_regulation"]) === !0) && n.push("over_climate_valve"), n;
}
function ls(e) {
	let t = as(Q(e, ["specific_states", "messages"]));
	return Q(e, ["safety_manager", "safety_state"]) === "on" && t.push("safety_detected"), Q(e, ["heating_failure_detection_manager", "heating_failure_state"]) === "on" && t.push("heating_failure"), Q(e, ["heating_failure_detection_manager", "cooling_failure_state"]) === "on" && t.push("cooling_failure"), Q(e, ["power_manager", "overpowering_state"]) === "on" && t.push("overpowering_detected"), [...new Set(t)].map((e) => ({
		key: e,
		severity: os(e)
	}));
}
function us(e) {
	return X(J(Q(e, ["configuration", "proportional_function"])), J(Q(e, ["vtherm_over_valve", "function"])), J(Q(e, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"function"
	])), J(Q(e, ["specific_states", "proportional_function"])));
}
function ds(e, t, n) {
	let r = n.attributes, i = Z(r.specific_states), a = cs(r);
	if (!(a.length > 0 || i !== void 0 || Z(r.configuration) !== void 0)) return;
	let o = ss(r), s = X(Y(Q(r, ["vtherm_over_switch", "power_percent"])), Y(Q(r, [
		"vtherm_over_climate",
		"valve_regulation",
		"power_percent"
	])), Y(r.power_percent)), c = X(Y(Q(r, ["vtherm_over_valve", "valve_open_percent"])), Y(Q(r, [
		"vtherm_over_climate_valve",
		"valve_regulation",
		"valve_open_percent"
	])), Y(r.valve_open_percent)), l = Q(r, ["timed_preset_manager", "is_active"]) === !0, u = X(Q(r, ["lock_manager", "is_locked"]) === !0 ? !0 : void 0, Q(r, ["specific_states", "is_locked"]) === !0 ? !0 : void 0) === !0, d = ls(r), f = J(Q(r, ["vtherm_over_climate", "auto_fan_mode"])), p = J(Q(r, ["vtherm_over_climate", "current_auto_fan_mode"])), m = e.power_entity ? t.states[e.power_entity] : void 0, h = J(Q(r, ["requested_state", "hvac_mode"]));
	return {
		isVt: !0,
		types: a,
		configuration: {
			type: J(Q(r, ["configuration", "type"])),
			proportionalFunction: us(r),
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
function fs(e) {
	return typeof e == "object" && e ? e : void 0;
}
function ps(e, t) {
	return t.reduce((e, t) => fs(e)?.[t], e);
}
function ms(e) {
	return e.state === "unavailable" ? "unavailable" : e.state === "unknown" ? "unknown" : "available";
}
function hs(e, t, n) {
	return X(Y(n.humidity), e.humidity_entity ? Y(t.states[e.humidity_entity]?.state) : void 0);
}
function gs(e, t) {
	if (!e.temperature_entity) return;
	let n = t.states[e.temperature_entity]?.state;
	if (!n || rs(n)) return;
	let r = parseFloat(n);
	if (!Number.isFinite(r)) return;
	let i = n.indexOf(".");
	return {
		value: r,
		decimals: i >= 0 ? n.length - i - 1 : 0,
		entityId: e.temperature_entity
	};
}
function _s(e, t) {
	if (!e.power_entity) return {};
	let n = t.states[e.power_entity];
	return {
		instantPower: Y(n?.state),
		instantPowerUnit: J(n?.attributes.unit_of_measurement)
	};
}
function vs(e, t, n) {
	let r = n.attributes, i = gs(e, t), a = X(rs(n.state) ? void 0 : n.state, J(r.hvac_mode), J(ps(r, ["current_state", "hvac_mode"]))), o = X(J(r.preset_mode), J(ps(r, ["current_state", "preset"]))), s = a === "cool" && o === "frost" ? "none" : o;
	return {
		entityId: n.entity_id,
		name: e.name ?? J(r.friendly_name),
		availability: ms(n),
		hvacMode: a,
		hvacAction: J(r.hvac_action),
		targetTemperature: X(Y(r.temperature), Y(ps(r, ["current_state", "target_temperature"]))),
		currentTemperature: i?.value ?? Y(r.current_temperature),
		currentTemperatureDecimals: i?.decimals,
		temperatureEntityId: i?.entityId,
		currentHumidity: hs(e, t, r),
		hvacModes: is(r.hvac_modes),
		presetModes: is(r.preset_modes),
		presetMode: s,
		fanMode: J(r.fan_mode),
		fanModes: is(r.fan_modes),
		swingMode: J(r.swing_mode),
		swingModes: is(r.swing_modes),
		swingHorizontalMode: J(r.swing_horizontal_mode),
		swingHorizontalModes: is(r.swing_horizontal_modes),
		minTemp: Y(r.min_temp),
		maxTemp: Y(r.max_temp),
		targetTempStep: X(Y(r.target_temp_step), Y(ps(r, ["configuration", "target_temperature_step"])), .5),
		targetTemperatureRange: {
			low: Y(r.target_temp_low),
			high: Y(r.target_temp_high)
		},
		..._s(e, t)
	};
}
function ys(e, t, n) {
	return {
		climate: vs(e, t, n),
		vt: ds(e, t, n)
	};
}
//#endregion
//#region src/data/config.ts
function bs(e) {
	return typeof e == "string";
}
function xs(e, t) {
	return bs(t) && e.includes(t);
}
function Ss(e) {
	return e.startsWith("climate.");
}
function Cs(e) {
	let t = {
		...lt,
		...e,
		type: He
	};
	return delete t.card_height, !bs(t.entity) || t.entity.trim() === "" ? {
		config: t,
		error: "missing_entity"
	} : (t.entity = t.entity.trim(), Ss(t.entity) ? xs(it, t.theme) ? xs(at, t.display_mode) ? xs(ot, t.primary_display) ? xs(st, t.additional_dashboards) ? xs(ct, t.state_icons_layout) ? { config: t } : {
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
var ws = class extends w {
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
			type: He,
			entity: Object.keys(e?.states ?? {}).find((e) => e.startsWith("climate.")) ?? "climate.example"
		};
	}
	setConfig(e) {
		this._validation = Cs(e);
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
		if (!this._validation) return this._renderMessage(T(e, "card.missing_entity"), !0);
		if (this._validation.error) return this._renderMessage(T(e, `card.${this._validation.error}`), !0);
		let t = this._validation.config.entity;
		if (!t) return this._renderMessage(T(e, "card.missing_entity"), !0);
		let n = this.hass?.states[t];
		return this.hass && !n ? this._renderMessage(T(e, "card.entity_not_found", { entity: t }), !0) : S`
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
		if (t) return ys(e, this.hass, t);
	}
	_renderMessage(e, t = !1) {
		return S`
      <ha-card>
        <div class=${t ? "error" : ""}>${e}</div>
      </ha-card>
    `;
	}
};
customElements.get("equinox-card") || customElements.define(Ue, ws), window.customCards = window.customCards ?? [];
var Ts = window.customCards;
Ts.filter((e) => e.type === "equinox-card" || e.type === "custom:equinox-card" || e.name === "Equinox").forEach((e) => {
	Ts.splice(Ts.indexOf(e), 1);
}), Ts.push({
	type: Ue,
	name: Ve,
	description: T(navigator.language, "card.description"),
	preview: !0
});
//#endregion
export { ws as EquinoxCard };
