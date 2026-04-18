(function() {
    const a = document.createElement("link").relList;
    if (a && a.supports && a.supports("modulepreload"))
        return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]'))
        o(c);
    new MutationObserver(c => {
        for (const f of c)
            if (f.type === "childList")
                for (const d of f.addedNodes)
                    d.tagName === "LINK" && d.rel === "modulepreload" && o(d)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function r(c) {
        const f = {};
        return c.integrity && (f.integrity = c.integrity),
        c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
        c.crossOrigin === "use-credentials" ? f.credentials = "include" : c.crossOrigin === "anonymous" ? f.credentials = "omit" : f.credentials = "same-origin",
        f
    }
    function o(c) {
        if (c.ep)
            return;
        c.ep = !0;
        const f = r(c);
        fetch(c.href, f)
    }
}
)();
const Os = [];
let sg = !0;
const rg = console.error;
function $h(s) {
    Os.length > 5 || !sg || Os.push(s)
}
function ug(s) {
    Os.push({
        type: "runtime",
        args: s
    })
}
function og(s) {
    s.preventDefault()
}
function yy(s) {
    try {
        const a = s.find(r => r instanceof Error);
        if (a && a.stack)
            $h({
                type: "console.error",
                args: a
            });
        else if (s.length > 0) {
            const r = s.map(c => typeof c == "object" ? JSON.stringify(c) : String(c)).join(" ")
              , o = new Error(r);
            $h({
                type: "console.error",
                args: o
            })
        }
    } catch (a) {
        console.warn(a)
    }
}
window.addEventListener("error", ug);
window.addEventListener("unhandledrejection", og);
console.error = function(...a) {
    yy(a),
    rg.apply(this, a)
}
;
function xy() {
    return window.removeEventListener("error", ug),
    window.removeEventListener("unhandledrejection", og),
    console.error = rg,
    sg = !1,
    Os
}
const vy = 1e3
  , Fh = Symbol("postMessageResponseTimeout");
let bs = 0;
const lo = "*";
class Pa {
    client;
    baseTimeout;
    waitRes = new Map;
    removeListeners = new Set;
    clear;
    constructor(a, r) {
        this.client = a,
        this.baseTimeout = r?.timeout || vy;
        const o = this.emitResponse.bind(this);
        this.clear = () => {
            window.removeEventListener("message", o)
        }
        ,
        window.addEventListener("message", o)
    }
    destroy() {
        this.clear(),
        this.removeListeners.forEach(a => a())
    }
    isTimeout(a) {
        return a === Fh
    }
    post(a, r, o) {
        bs++;
        const {timeout: c, origin: f=lo} = o || {};
        return this.client.postMessage({
            data: r,
            id: bs,
            type: a
        }, f),
        new Promise(d => {
            this.waitRes.set(bs, m => {
                d(m)
            }
            ),
            setTimeout( () => {
                this.waitRes.delete(bs),
                d(Fh)
            }
            , c || this.baseTimeout)
        }
        )
    }
    on(a, r, o) {
        const {once: c, origin: f=lo} = o || {}
          , d = async g => {
            const {id: p, type: b, data: x} = g.data;
            let E;
            b === a && (E = await r(x),
            console.log(a, c, E, x),
            (p && f === g.origin || f === lo) && g.source?.postMessage({
                fromType: a,
                id: p,
                data: E
            }, g.origin),
            c && m())
        }
        ;
        window.addEventListener("message", d);
        const m = () => {
            window.removeEventListener("message", d),
            this.removeListeners.delete(m)
        }
        ;
        return this.removeListeners.add(m),
        m
    }
    emitResponse(a) {
        const r = a.data
          , {id: o, data: c} = r
          , f = this.waitRes.get(o);
        f && f(c)
    }
}
function by(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s
}
function Sy(s) {
    if (Object.prototype.hasOwnProperty.call(s, "__esModule"))
        return s;
    var a = s.default;
    if (typeof a == "function") {
        var r = function o() {
            var c = !1;
            try {
                c = this instanceof o
            } catch {}
            return c ? Reflect.construct(a, arguments, this.constructor) : a.apply(this, arguments)
        };
        r.prototype = a.prototype
    } else
        r = {};
    return Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.keys(s).forEach(function(o) {
        var c = Object.getOwnPropertyDescriptor(s, o);
        Object.defineProperty(r, o, c.get ? c : {
            enumerable: !0,
            get: function() {
                return s[o]
            }
        })
    }),
    r
}
var Ba = {}, ao = {}, io = {}, so = {}, Wh;
function Ey() {
    if (Wh)
        return so;
    Wh = 1;
    const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return so.encode = function(a) {
        if (0 <= a && a < s.length)
            return s[a];
        throw new TypeError("Must be between 0 and 63: " + a)
    }
    ,
    so
}
var Ph;
function cg() {
    if (Ph)
        return io;
    Ph = 1;
    const s = Ey()
      , a = 5
      , r = 1 << a
      , o = r - 1
      , c = r;
    function f(d) {
        return d < 0 ? (-d << 1) + 1 : (d << 1) + 0
    }
    return io.encode = function(m) {
        let g = "", p, b = f(m);
        do
            p = b & o,
            b >>>= a,
            b > 0 && (p |= c),
            g += s.encode(p);
        while (b > 0);
        return g
    }
    ,
    io
}
var Dt = {};
const wy = {}
  , _y = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: wy
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Ny = Sy(_y);
var ro, Ih;
function jy() {
    return Ih || (Ih = 1,
    ro = typeof URL == "function" ? URL : Ny.URL),
    ro
}
var em;
function Ls() {
    if (em)
        return Dt;
    em = 1;
    const s = jy();
    function a(Q, k, K) {
        if (k in Q)
            return Q[k];
        if (arguments.length === 3)
            return K;
        throw new Error('"' + k + '" is a required argument.')
    }
    Dt.getArg = a;
    const r = (function() {
        return !("__proto__"in Object.create(null))
    }
    )();
    function o(Q) {
        return Q
    }
    function c(Q) {
        return d(Q) ? "$" + Q : Q
    }
    Dt.toSetString = r ? o : c;
    function f(Q) {
        return d(Q) ? Q.slice(1) : Q
    }
    Dt.fromSetString = r ? o : f;
    function d(Q) {
        if (!Q)
            return !1;
        const k = Q.length;
        if (k < 9 || Q.charCodeAt(k - 1) !== 95 || Q.charCodeAt(k - 2) !== 95 || Q.charCodeAt(k - 3) !== 111 || Q.charCodeAt(k - 4) !== 116 || Q.charCodeAt(k - 5) !== 111 || Q.charCodeAt(k - 6) !== 114 || Q.charCodeAt(k - 7) !== 112 || Q.charCodeAt(k - 8) !== 95 || Q.charCodeAt(k - 9) !== 95)
            return !1;
        for (let K = k - 10; K >= 0; K--)
            if (Q.charCodeAt(K) !== 36)
                return !1;
        return !0
    }
    function m(Q, k) {
        return Q === k ? 0 : Q === null ? 1 : k === null ? -1 : Q > k ? 1 : -1
    }
    function g(Q, k) {
        let K = Q.generatedLine - k.generatedLine;
        return K !== 0 || (K = Q.generatedColumn - k.generatedColumn,
        K !== 0) || (K = m(Q.source, k.source),
        K !== 0) || (K = Q.originalLine - k.originalLine,
        K !== 0) || (K = Q.originalColumn - k.originalColumn,
        K !== 0) ? K : m(Q.name, k.name)
    }
    Dt.compareByGeneratedPositionsInflated = g;
    function p(Q) {
        return JSON.parse(Q.replace(/^\)]}'[^\n]*\n/, ""))
    }
    Dt.parseSourceMapInput = p;
    const b = "http:"
      , x = `${b}//host`;
    function E(Q) {
        return k => {
            const K = z(k)
              , ne = T(k)
              , oe = new s(k,ne);
            Q(oe);
            const fe = oe.toString();
            return K === "absolute" ? fe : K === "scheme-relative" ? fe.slice(b.length) : K === "path-absolute" ? fe.slice(x.length) : G(ne, fe)
        }
    }
    function S(Q, k) {
        return new s(Q,k).toString()
    }
    function w(Q, k) {
        let K = 0;
        do {
            const ne = Q + K++;
            if (k.indexOf(ne) === -1)
                return ne
        } while (!0)
    }
    function T(Q) {
        const k = Q.split("..").length - 1
          , K = w("p", Q);
        let ne = `${x}/`;
        for (let oe = 0; oe < k; oe++)
            ne += `${K}/`;
        return ne
    }
    const _ = /^[A-Za-z0-9\+\-\.]+:/;
    function z(Q) {
        return Q[0] === "/" ? Q[1] === "/" ? "scheme-relative" : "path-absolute" : _.test(Q) ? "absolute" : "path-relative"
    }
    function G(Q, k) {
        typeof Q == "string" && (Q = new s(Q)),
        typeof k == "string" && (k = new s(k));
        const K = k.pathname.split("/")
          , ne = Q.pathname.split("/");
        for (ne.length > 0 && !ne[ne.length - 1] && ne.pop(); K.length > 0 && ne.length > 0 && K[0] === ne[0]; )
            K.shift(),
            ne.shift();
        return ne.map( () => "..").concat(K).join("/") + k.search + k.hash
    }
    const V = E(Q => {
        Q.pathname = Q.pathname.replace(/\/?$/, "/")
    }
    )
      , J = E(Q => {
        Q.href = new s(".",Q.toString()).toString()
    }
    )
      , W = E(Q => {}
    );
    Dt.normalize = W;
    function ue(Q, k) {
        const K = z(k)
          , ne = z(Q);
        if (Q = V(Q),
        K === "absolute")
            return S(k, void 0);
        if (ne === "absolute")
            return S(k, Q);
        if (K === "scheme-relative")
            return W(k);
        if (ne === "scheme-relative")
            return S(k, S(Q, x)).slice(b.length);
        if (K === "path-absolute")
            return W(k);
        if (ne === "path-absolute")
            return S(k, S(Q, x)).slice(x.length);
        const oe = T(k + Q)
          , fe = S(k, S(Q, oe));
        return G(oe, fe)
    }
    Dt.join = ue;
    function P(Q, k) {
        const K = ye(Q, k);
        return typeof K == "string" ? K : W(k)
    }
    Dt.relative = P;
    function ye(Q, k) {
        if (z(Q) !== z(k))
            return null;
        const ne = T(Q + k)
          , oe = new s(Q,ne)
          , fe = new s(k,ne);
        try {
            new s("",fe.toString())
        } catch {
            return null
        }
        return fe.protocol !== oe.protocol || fe.user !== oe.user || fe.password !== oe.password || fe.hostname !== oe.hostname || fe.port !== oe.port ? null : G(oe, fe)
    }
    function Ne(Q, k, K) {
        Q && z(k) === "path-absolute" && (k = k.replace(/^\//, ""));
        let ne = W(k || "");
        return Q && (ne = ue(Q, ne)),
        K && (ne = ue(J(K), ne)),
        ne
    }
    return Dt.computeSourceURL = Ne,
    Dt
}
var uo = {}, tm;
function fg() {
    if (tm)
        return uo;
    tm = 1;
    class s {
        constructor() {
            this._array = [],
            this._set = new Map
        }
        static fromArray(r, o) {
            const c = new s;
            for (let f = 0, d = r.length; f < d; f++)
                c.add(r[f], o);
            return c
        }
        size() {
            return this._set.size
        }
        add(r, o) {
            const c = this.has(r)
              , f = this._array.length;
            (!c || o) && this._array.push(r),
            c || this._set.set(r, f)
        }
        has(r) {
            return this._set.has(r)
        }
        indexOf(r) {
            const o = this._set.get(r);
            if (o >= 0)
                return o;
            throw new Error('"' + r + '" is not in the set.')
        }
        at(r) {
            if (r >= 0 && r < this._array.length)
                return this._array[r];
            throw new Error("No element indexed by " + r)
        }
        toArray() {
            return this._array.slice()
        }
    }
    return uo.ArraySet = s,
    uo
}
var oo = {}, nm;
function Cy() {
    if (nm)
        return oo;
    nm = 1;
    const s = Ls();
    function a(o, c) {
        const f = o.generatedLine
          , d = c.generatedLine
          , m = o.generatedColumn
          , g = c.generatedColumn;
        return d > f || d == f && g >= m || s.compareByGeneratedPositionsInflated(o, c) <= 0
    }
    class r {
        constructor() {
            this._array = [],
            this._sorted = !0,
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        unsortedForEach(c, f) {
            this._array.forEach(c, f)
        }
        add(c) {
            a(this._last, c) ? (this._last = c,
            this._array.push(c)) : (this._sorted = !1,
            this._array.push(c))
        }
        toArray() {
            return this._sorted || (this._array.sort(s.compareByGeneratedPositionsInflated),
            this._sorted = !0),
            this._array
        }
    }
    return oo.MappingList = r,
    oo
}
var lm;
function dg() {
    if (lm)
        return ao;
    lm = 1;
    const s = cg()
      , a = Ls()
      , r = fg().ArraySet
      , o = Cy().MappingList;
    class c {
        constructor(d) {
            d || (d = {}),
            this._file = a.getArg(d, "file", null),
            this._sourceRoot = a.getArg(d, "sourceRoot", null),
            this._skipValidation = a.getArg(d, "skipValidation", !1),
            this._sources = new r,
            this._names = new r,
            this._mappings = new o,
            this._sourcesContents = null
        }
        static fromSourceMap(d) {
            const m = d.sourceRoot
              , g = new c({
                file: d.file,
                sourceRoot: m
            });
            return d.eachMapping(function(p) {
                const b = {
                    generated: {
                        line: p.generatedLine,
                        column: p.generatedColumn
                    }
                };
                p.source != null && (b.source = p.source,
                m != null && (b.source = a.relative(m, b.source)),
                b.original = {
                    line: p.originalLine,
                    column: p.originalColumn
                },
                p.name != null && (b.name = p.name)),
                g.addMapping(b)
            }),
            d.sources.forEach(function(p) {
                let b = p;
                m != null && (b = a.relative(m, p)),
                g._sources.has(b) || g._sources.add(b);
                const x = d.sourceContentFor(p);
                x != null && g.setSourceContent(p, x)
            }),
            g
        }
        addMapping(d) {
            const m = a.getArg(d, "generated")
              , g = a.getArg(d, "original", null);
            let p = a.getArg(d, "source", null)
              , b = a.getArg(d, "name", null);
            this._skipValidation || this._validateMapping(m, g, p, b),
            p != null && (p = String(p),
            this._sources.has(p) || this._sources.add(p)),
            b != null && (b = String(b),
            this._names.has(b) || this._names.add(b)),
            this._mappings.add({
                generatedLine: m.line,
                generatedColumn: m.column,
                originalLine: g && g.line,
                originalColumn: g && g.column,
                source: p,
                name: b
            })
        }
        setSourceContent(d, m) {
            let g = d;
            this._sourceRoot != null && (g = a.relative(this._sourceRoot, g)),
            m != null ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
            this._sourcesContents[a.toSetString(g)] = m) : this._sourcesContents && (delete this._sourcesContents[a.toSetString(g)],
            Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null))
        }
        applySourceMap(d, m, g) {
            let p = m;
            if (m == null) {
                if (d.file == null)
                    throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
                p = d.file
            }
            const b = this._sourceRoot;
            b != null && (p = a.relative(b, p));
            const x = this._mappings.toArray().length > 0 ? new r : this._sources
              , E = new r;
            this._mappings.unsortedForEach(function(S) {
                if (S.source === p && S.originalLine != null) {
                    const _ = d.originalPositionFor({
                        line: S.originalLine,
                        column: S.originalColumn
                    });
                    _.source != null && (S.source = _.source,
                    g != null && (S.source = a.join(g, S.source)),
                    b != null && (S.source = a.relative(b, S.source)),
                    S.originalLine = _.line,
                    S.originalColumn = _.column,
                    _.name != null && (S.name = _.name))
                }
                const w = S.source;
                w != null && !x.has(w) && x.add(w);
                const T = S.name;
                T != null && !E.has(T) && E.add(T)
            }, this),
            this._sources = x,
            this._names = E,
            d.sources.forEach(function(S) {
                const w = d.sourceContentFor(S);
                w != null && (g != null && (S = a.join(g, S)),
                b != null && (S = a.relative(b, S)),
                this.setSourceContent(S, w))
            }, this)
        }
        _validateMapping(d, m, g, p) {
            if (m && typeof m.line != "number" && typeof m.column != "number")
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if (!(d && "line"in d && "column"in d && d.line > 0 && d.column >= 0 && !m && !g && !p)) {
                if (!(d && "line"in d && "column"in d && m && "line"in m && "column"in m && d.line > 0 && d.column >= 0 && m.line > 0 && m.column >= 0 && g))
                    throw new Error("Invalid mapping: " + JSON.stringify({
                        generated: d,
                        source: g,
                        original: m,
                        name: p
                    }))
            }
        }
        _serializeMappings() {
            let d = 0, m = 1, g = 0, p = 0, b = 0, x = 0, E = "", S, w, T, _;
            const z = this._mappings.toArray();
            for (let G = 0, V = z.length; G < V; G++) {
                if (w = z[G],
                S = "",
                w.generatedLine !== m)
                    for (d = 0; w.generatedLine !== m; )
                        S += ";",
                        m++;
                else if (G > 0) {
                    if (!a.compareByGeneratedPositionsInflated(w, z[G - 1]))
                        continue;
                    S += ","
                }
                S += s.encode(w.generatedColumn - d),
                d = w.generatedColumn,
                w.source != null && (_ = this._sources.indexOf(w.source),
                S += s.encode(_ - x),
                x = _,
                S += s.encode(w.originalLine - 1 - p),
                p = w.originalLine - 1,
                S += s.encode(w.originalColumn - g),
                g = w.originalColumn,
                w.name != null && (T = this._names.indexOf(w.name),
                S += s.encode(T - b),
                b = T)),
                E += S
            }
            return E
        }
        _generateSourcesContent(d, m) {
            return d.map(function(g) {
                if (!this._sourcesContents)
                    return null;
                m != null && (g = a.relative(m, g));
                const p = a.toSetString(g);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, p) ? this._sourcesContents[p] : null
            }, this)
        }
        toJSON() {
            const d = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return this._file != null && (d.file = this._file),
            this._sourceRoot != null && (d.sourceRoot = this._sourceRoot),
            this._sourcesContents && (d.sourcesContent = this._generateSourcesContent(d.sources, d.sourceRoot)),
            d
        }
        toString() {
            return JSON.stringify(this.toJSON())
        }
    }
    return c.prototype._version = 3,
    ao.SourceMapGenerator = c,
    ao
}
var Ga = {}, co = {}, am;
function Ty() {
    return am || (am = 1,
    (function(s) {
        s.GREATEST_LOWER_BOUND = 1,
        s.LEAST_UPPER_BOUND = 2;
        function a(r, o, c, f, d, m) {
            const g = Math.floor((o - r) / 2) + r
              , p = d(c, f[g], !0);
            return p === 0 ? g : p > 0 ? o - g > 1 ? a(g, o, c, f, d, m) : m === s.LEAST_UPPER_BOUND ? o < f.length ? o : -1 : g : g - r > 1 ? a(r, g, c, f, d, m) : m == s.LEAST_UPPER_BOUND ? g : r < 0 ? -1 : r
        }
        s.search = function(o, c, f, d) {
            if (c.length === 0)
                return -1;
            let m = a(-1, c.length, o, c, f, d || s.GREATEST_LOWER_BOUND);
            if (m < 0)
                return -1;
            for (; m - 1 >= 0 && f(c[m], c[m - 1], !0) === 0; )
                --m;
            return m
        }
    }
    )(co)),
    co
}
var Ss = {
    exports: {}
}, im;
function hg() {
    if (im)
        return Ss.exports;
    im = 1;
    let s = null;
    return Ss.exports = function() {
        if (typeof s == "string")
            return fetch(s).then(r => r.arrayBuffer());
        if (s instanceof ArrayBuffer)
            return Promise.resolve(s);
        throw new Error("You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer")
    }
    ,
    Ss.exports.initialize = a => {
        s = a
    }
    ,
    Ss.exports
}
var fo, sm;
function Oy() {
    if (sm)
        return fo;
    sm = 1;
    const s = hg();
    function a() {
        this.generatedLine = 0,
        this.generatedColumn = 0,
        this.lastGeneratedColumn = null,
        this.source = null,
        this.originalLine = null,
        this.originalColumn = null,
        this.name = null
    }
    let r = null;
    return fo = function() {
        if (r)
            return r;
        const c = [];
        return r = s().then(f => WebAssembly.instantiate(f, {
            env: {
                mapping_callback(d, m, g, p, b, x, E, S, w, T) {
                    const _ = new a;
                    _.generatedLine = d + 1,
                    _.generatedColumn = m,
                    g && (_.lastGeneratedColumn = p - 1),
                    b && (_.source = x,
                    _.originalLine = E + 1,
                    _.originalColumn = S,
                    w && (_.name = T)),
                    c[c.length - 1](_)
                },
                start_all_generated_locations_for() {
                    console.time("all_generated_locations_for")
                },
                end_all_generated_locations_for() {
                    console.timeEnd("all_generated_locations_for")
                },
                start_compute_column_spans() {
                    console.time("compute_column_spans")
                },
                end_compute_column_spans() {
                    console.timeEnd("compute_column_spans")
                },
                start_generated_location_for() {
                    console.time("generated_location_for")
                },
                end_generated_location_for() {
                    console.timeEnd("generated_location_for")
                },
                start_original_location_for() {
                    console.time("original_location_for")
                },
                end_original_location_for() {
                    console.timeEnd("original_location_for")
                },
                start_parse_mappings() {
                    console.time("parse_mappings")
                },
                end_parse_mappings() {
                    console.timeEnd("parse_mappings")
                },
                start_sort_by_generated_location() {
                    console.time("sort_by_generated_location")
                },
                end_sort_by_generated_location() {
                    console.timeEnd("sort_by_generated_location")
                },
                start_sort_by_original_location() {
                    console.time("sort_by_original_location")
                },
                end_sort_by_original_location() {
                    console.timeEnd("sort_by_original_location")
                }
            }
        })).then(f => ({
            exports: f.instance.exports,
            withMappingCallback: (d, m) => {
                c.push(d);
                try {
                    m()
                } finally {
                    c.pop()
                }
            }
        })).then(null, f => {
            throw r = null,
            f
        }
        ),
        r
    }
    ,
    fo
}
var rm;
function Ry() {
    if (rm)
        return Ga;
    rm = 1;
    const s = Ls()
      , a = Ty()
      , r = fg().ArraySet;
    cg();
    const o = hg()
      , c = Oy()
      , f = Symbol("smcInternal");
    class d {
        constructor(E, S) {
            return E == f ? Promise.resolve(this) : p(E, S)
        }
        static initialize(E) {
            o.initialize(E["lib/mappings.wasm"])
        }
        static fromSourceMap(E, S) {
            return b(E, S)
        }
        static async with(E, S, w) {
            const T = await new d(E,S);
            try {
                return await w(T)
            } finally {
                T.destroy()
            }
        }
        eachMapping(E, S, w) {
            throw new Error("Subclasses must implement eachMapping")
        }
        allGeneratedPositionsFor(E) {
            throw new Error("Subclasses must implement allGeneratedPositionsFor")
        }
        destroy() {
            throw new Error("Subclasses must implement destroy")
        }
    }
    d.prototype._version = 3,
    d.GENERATED_ORDER = 1,
    d.ORIGINAL_ORDER = 2,
    d.GREATEST_LOWER_BOUND = 1,
    d.LEAST_UPPER_BOUND = 2,
    Ga.SourceMapConsumer = d;
    class m extends d {
        constructor(E, S) {
            return super(f).then(w => {
                let T = E;
                typeof E == "string" && (T = s.parseSourceMapInput(E));
                const _ = s.getArg(T, "version")
                  , z = s.getArg(T, "sources").map(String)
                  , G = s.getArg(T, "names", [])
                  , V = s.getArg(T, "sourceRoot", null)
                  , J = s.getArg(T, "sourcesContent", null)
                  , W = s.getArg(T, "mappings")
                  , ue = s.getArg(T, "file", null)
                  , P = s.getArg(T, "x_google_ignoreList", null);
                if (_ != w._version)
                    throw new Error("Unsupported version: " + _);
                return w._sourceLookupCache = new Map,
                w._names = r.fromArray(G.map(String), !0),
                w._sources = r.fromArray(z, !0),
                w._absoluteSources = r.fromArray(w._sources.toArray().map(function(ye) {
                    return s.computeSourceURL(V, ye, S)
                }), !0),
                w.sourceRoot = V,
                w.sourcesContent = J,
                w._mappings = W,
                w._sourceMapURL = S,
                w.file = ue,
                w.x_google_ignoreList = P,
                w._computedColumnSpans = !1,
                w._mappingsPtr = 0,
                w._wasm = null,
                c().then(ye => (w._wasm = ye,
                w))
            }
            )
        }
        _findSourceIndex(E) {
            const S = this._sourceLookupCache.get(E);
            if (typeof S == "number")
                return S;
            const w = s.computeSourceURL(null, E, this._sourceMapURL);
            if (this._absoluteSources.has(w)) {
                const _ = this._absoluteSources.indexOf(w);
                return this._sourceLookupCache.set(E, _),
                _
            }
            const T = s.computeSourceURL(this.sourceRoot, E, this._sourceMapURL);
            if (this._absoluteSources.has(T)) {
                const _ = this._absoluteSources.indexOf(T);
                return this._sourceLookupCache.set(E, _),
                _
            }
            return -1
        }
        static fromSourceMap(E, S) {
            return new m(E.toString())
        }
        get sources() {
            return this._absoluteSources.toArray()
        }
        _getMappingsPtr() {
            return this._mappingsPtr === 0 && this._parseMappings(),
            this._mappingsPtr
        }
        _parseMappings() {
            const E = this._mappings
              , S = E.length
              , w = this._wasm.exports.allocate_mappings(S) >>> 0
              , T = new Uint8Array(this._wasm.exports.memory.buffer,w,S);
            for (let z = 0; z < S; z++)
                T[z] = E.charCodeAt(z);
            const _ = this._wasm.exports.parse_mappings(w);
            if (!_) {
                const z = this._wasm.exports.get_last_error();
                let G = `Error parsing mappings (code ${z}): `;
                switch (z) {
                case 1:
                    G += "the mappings contained a negative line, column, source index, or name index";
                    break;
                case 2:
                    G += "the mappings contained a number larger than 2**32";
                    break;
                case 3:
                    G += "reached EOF while in the middle of parsing a VLQ";
                    break;
                case 4:
                    G += "invalid base 64 character while parsing a VLQ";
                    break;
                default:
                    G += "unknown error code";
                    break
                }
                throw new Error(G)
            }
            this._mappingsPtr = _
        }
        eachMapping(E, S, w) {
            const T = S || null
              , _ = w || d.GENERATED_ORDER;
            this._wasm.withMappingCallback(z => {
                z.source !== null && (z.source = this._absoluteSources.at(z.source),
                z.name !== null && (z.name = this._names.at(z.name))),
                this._computedColumnSpans && z.lastGeneratedColumn === null && (z.lastGeneratedColumn = 1 / 0),
                E.call(T, z)
            }
            , () => {
                switch (_) {
                case d.GENERATED_ORDER:
                    this._wasm.exports.by_generated_location(this._getMappingsPtr());
                    break;
                case d.ORIGINAL_ORDER:
                    this._wasm.exports.by_original_location(this._getMappingsPtr());
                    break;
                default:
                    throw new Error("Unknown order of iteration.")
                }
            }
            )
        }
        allGeneratedPositionsFor(E) {
            let S = s.getArg(E, "source");
            const w = s.getArg(E, "line")
              , T = E.column || 0;
            if (S = this._findSourceIndex(S),
            S < 0)
                return [];
            if (w < 1)
                throw new Error("Line numbers must be >= 1");
            if (T < 0)
                throw new Error("Column numbers must be >= 0");
            const _ = [];
            return this._wasm.withMappingCallback(z => {
                let G = z.lastGeneratedColumn;
                this._computedColumnSpans && G === null && (G = 1 / 0),
                _.push({
                    line: z.generatedLine,
                    column: z.generatedColumn,
                    lastColumn: G
                })
            }
            , () => {
                this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(), S, w - 1, "column"in E, T)
            }
            ),
            _
        }
        destroy() {
            this._mappingsPtr !== 0 && (this._wasm.exports.free_mappings(this._mappingsPtr),
            this._mappingsPtr = 0)
        }
        computeColumnSpans() {
            this._computedColumnSpans || (this._wasm.exports.compute_column_spans(this._getMappingsPtr()),
            this._computedColumnSpans = !0)
        }
        originalPositionFor(E) {
            const S = {
                generatedLine: s.getArg(E, "line"),
                generatedColumn: s.getArg(E, "column")
            };
            if (S.generatedLine < 1)
                throw new Error("Line numbers must be >= 1");
            if (S.generatedColumn < 0)
                throw new Error("Column numbers must be >= 0");
            let w = s.getArg(E, "bias", d.GREATEST_LOWER_BOUND);
            w == null && (w = d.GREATEST_LOWER_BOUND);
            let T;
            if (this._wasm.withMappingCallback(_ => T = _, () => {
                this._wasm.exports.original_location_for(this._getMappingsPtr(), S.generatedLine - 1, S.generatedColumn, w)
            }
            ),
            T && T.generatedLine === S.generatedLine) {
                let _ = s.getArg(T, "source", null);
                _ !== null && (_ = this._absoluteSources.at(_));
                let z = s.getArg(T, "name", null);
                return z !== null && (z = this._names.at(z)),
                {
                    source: _,
                    line: s.getArg(T, "originalLine", null),
                    column: s.getArg(T, "originalColumn", null),
                    name: z
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(E) {
                return E == null
            }) : !1
        }
        sourceContentFor(E, S) {
            if (!this.sourcesContent)
                return null;
            const w = this._findSourceIndex(E);
            if (w >= 0)
                return this.sourcesContent[w];
            if (S)
                return null;
            throw new Error('"' + E + '" is not in the SourceMap.')
        }
        generatedPositionFor(E) {
            let S = s.getArg(E, "source");
            if (S = this._findSourceIndex(S),
            S < 0)
                return {
                    line: null,
                    column: null,
                    lastColumn: null
                };
            const w = {
                source: S,
                originalLine: s.getArg(E, "line"),
                originalColumn: s.getArg(E, "column")
            };
            if (w.originalLine < 1)
                throw new Error("Line numbers must be >= 1");
            if (w.originalColumn < 0)
                throw new Error("Column numbers must be >= 0");
            let T = s.getArg(E, "bias", d.GREATEST_LOWER_BOUND);
            T == null && (T = d.GREATEST_LOWER_BOUND);
            let _;
            if (this._wasm.withMappingCallback(z => _ = z, () => {
                this._wasm.exports.generated_location_for(this._getMappingsPtr(), w.source, w.originalLine - 1, w.originalColumn, T)
            }
            ),
            _ && _.source === w.source) {
                let z = _.lastGeneratedColumn;
                return this._computedColumnSpans && z === null && (z = 1 / 0),
                {
                    line: s.getArg(_, "generatedLine", null),
                    column: s.getArg(_, "generatedColumn", null),
                    lastColumn: z
                }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
    }
    m.prototype.consumer = d,
    Ga.BasicSourceMapConsumer = m;
    class g extends d {
        constructor(E, S) {
            return super(f).then(w => {
                let T = E;
                typeof E == "string" && (T = s.parseSourceMapInput(E));
                const _ = s.getArg(T, "version")
                  , z = s.getArg(T, "sections");
                if (_ != w._version)
                    throw new Error("Unsupported version: " + _);
                let G = {
                    line: -1,
                    column: 0
                };
                return Promise.all(z.map(V => {
                    if (V.url)
                        throw new Error("Support for url field in sections not implemented.");
                    const J = s.getArg(V, "offset")
                      , W = s.getArg(J, "line")
                      , ue = s.getArg(J, "column");
                    if (W < G.line || W === G.line && ue < G.column)
                        throw new Error("Section offsets must be ordered and non-overlapping.");
                    return G = J,
                    new d(s.getArg(V, "map"),S).then(ye => ({
                        generatedOffset: {
                            generatedLine: W + 1,
                            generatedColumn: ue + 1
                        },
                        consumer: ye
                    }))
                }
                )).then(V => (w._sections = V,
                w))
            }
            )
        }
        get sources() {
            const E = [];
            for (let S = 0; S < this._sections.length; S++)
                for (let w = 0; w < this._sections[S].consumer.sources.length; w++)
                    E.push(this._sections[S].consumer.sources[w]);
            return E
        }
        originalPositionFor(E) {
            const S = {
                generatedLine: s.getArg(E, "line"),
                generatedColumn: s.getArg(E, "column")
            }
              , w = a.search(S, this._sections, function(_, z) {
                const G = _.generatedLine - z.generatedOffset.generatedLine;
                return G || _.generatedColumn - (z.generatedOffset.generatedColumn - 1)
            })
              , T = this._sections[w];
            return T ? T.consumer.originalPositionFor({
                line: S.generatedLine - (T.generatedOffset.generatedLine - 1),
                column: S.generatedColumn - (T.generatedOffset.generatedLine === S.generatedLine ? T.generatedOffset.generatedColumn - 1 : 0),
                bias: E.bias
            }) : {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this._sections.every(function(E) {
                return E.consumer.hasContentsOfAllSources()
            })
        }
        sourceContentFor(E, S) {
            for (let w = 0; w < this._sections.length; w++) {
                const _ = this._sections[w].consumer.sourceContentFor(E, !0);
                if (_)
                    return _
            }
            if (S)
                return null;
            throw new Error('"' + E + '" is not in the SourceMap.')
        }
        _findSectionIndex(E) {
            for (let S = 0; S < this._sections.length; S++) {
                const {consumer: w} = this._sections[S];
                if (w._findSourceIndex(E) !== -1)
                    return S
            }
            return -1
        }
        generatedPositionFor(E) {
            const S = this._findSectionIndex(s.getArg(E, "source"))
              , w = S >= 0 ? this._sections[S] : null
              , T = S >= 0 && S + 1 < this._sections.length ? this._sections[S + 1] : null
              , _ = w && w.consumer.generatedPositionFor(E);
            if (_ && _.line !== null) {
                const z = w.generatedOffset.generatedLine - 1
                  , G = w.generatedOffset.generatedColumn - 1;
                return _.line === 1 && (_.column += G,
                typeof _.lastColumn == "number" && (_.lastColumn += G)),
                _.lastColumn === 1 / 0 && T && _.line === T.generatedOffset.generatedLine && (_.lastColumn = T.generatedOffset.generatedColumn - 2),
                _.line += z,
                _
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
        allGeneratedPositionsFor(E) {
            const S = this._findSectionIndex(s.getArg(E, "source"))
              , w = S >= 0 ? this._sections[S] : null
              , T = S >= 0 && S + 1 < this._sections.length ? this._sections[S + 1] : null;
            return w ? w.consumer.allGeneratedPositionsFor(E).map(_ => {
                const z = w.generatedOffset.generatedLine - 1
                  , G = w.generatedOffset.generatedColumn - 1;
                return _.line === 1 && (_.column += G,
                typeof _.lastColumn == "number" && (_.lastColumn += G)),
                _.lastColumn === 1 / 0 && T && _.line === T.generatedOffset.generatedLine && (_.lastColumn = T.generatedOffset.generatedColumn - 2),
                _.line += z,
                _
            }
            ) : []
        }
        eachMapping(E, S, w) {
            this._sections.forEach( (T, _) => {
                const z = _ + 1 < this._sections.length ? this._sections[_ + 1] : null
                  , {generatedOffset: G} = T
                  , V = G.generatedLine - 1
                  , J = G.generatedColumn - 1;
                T.consumer.eachMapping(function(W) {
                    W.generatedLine === 1 && (W.generatedColumn += J,
                    typeof W.lastGeneratedColumn == "number" && (W.lastGeneratedColumn += J)),
                    W.lastGeneratedColumn === 1 / 0 && z && W.generatedLine === z.generatedOffset.generatedLine && (W.lastGeneratedColumn = z.generatedOffset.generatedColumn - 2),
                    W.generatedLine += V,
                    E.call(this, W)
                }, S, w)
            }
            )
        }
        computeColumnSpans() {
            for (let E = 0; E < this._sections.length; E++)
                this._sections[E].consumer.computeColumnSpans()
        }
        destroy() {
            for (let E = 0; E < this._sections.length; E++)
                this._sections[E].consumer.destroy()
        }
    }
    Ga.IndexedSourceMapConsumer = g;
    function p(x, E) {
        let S = x;
        typeof x == "string" && (S = s.parseSourceMapInput(x));
        const w = S.sections != null ? new g(S,E) : new m(S,E);
        return Promise.resolve(w)
    }
    function b(x, E) {
        return m.fromSourceMap(x, E)
    }
    return Ga
}
var ho = {}, um;
function Ay() {
    if (um)
        return ho;
    um = 1;
    const s = dg().SourceMapGenerator
      , a = Ls()
      , r = /(\r?\n)/
      , o = 10
      , c = "$$$isSourceNode$$$";
    class f {
        constructor(m, g, p, b, x) {
            this.children = [],
            this.sourceContents = {},
            this.line = m ?? null,
            this.column = g ?? null,
            this.source = p ?? null,
            this.name = x ?? null,
            this[c] = !0,
            b != null && this.add(b)
        }
        static fromStringWithSourceMap(m, g, p) {
            const b = new f
              , x = m.split(r);
            let E = 0;
            const S = function() {
                const V = W()
                  , J = W() || "";
                return V + J;
                function W() {
                    return E < x.length ? x[E++] : void 0
                }
            };
            let w = 1, T = 0, _ = null, z;
            return g.eachMapping(function(V) {
                if (_ !== null)
                    if (w < V.generatedLine)
                        G(_, S()),
                        w++,
                        T = 0;
                    else {
                        z = x[E] || "";
                        const J = z.substr(0, V.generatedColumn - T);
                        x[E] = z.substr(V.generatedColumn - T),
                        T = V.generatedColumn,
                        G(_, J),
                        _ = V;
                        return
                    }
                for (; w < V.generatedLine; )
                    b.add(S()),
                    w++;
                T < V.generatedColumn && (z = x[E] || "",
                b.add(z.substr(0, V.generatedColumn)),
                x[E] = z.substr(V.generatedColumn),
                T = V.generatedColumn),
                _ = V
            }, this),
            E < x.length && (_ && G(_, S()),
            b.add(x.splice(E).join(""))),
            g.sources.forEach(function(V) {
                const J = g.sourceContentFor(V);
                J != null && (p != null && (V = a.join(p, V)),
                b.setSourceContent(V, J))
            }),
            b;
            function G(V, J) {
                if (V === null || V.source === void 0)
                    b.add(J);
                else {
                    const W = p ? a.join(p, V.source) : V.source;
                    b.add(new f(V.originalLine,V.originalColumn,W,J,V.name))
                }
            }
        }
        add(m) {
            if (Array.isArray(m))
                m.forEach(function(g) {
                    this.add(g)
                }, this);
            else if (m[c] || typeof m == "string")
                m && this.children.push(m);
            else
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + m);
            return this
        }
        prepend(m) {
            if (Array.isArray(m))
                for (let g = m.length - 1; g >= 0; g--)
                    this.prepend(m[g]);
            else if (m[c] || typeof m == "string")
                this.children.unshift(m);
            else
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + m);
            return this
        }
        walk(m) {
            let g;
            for (let p = 0, b = this.children.length; p < b; p++)
                g = this.children[p],
                g[c] ? g.walk(m) : g !== "" && m(g, {
                    source: this.source,
                    line: this.line,
                    column: this.column,
                    name: this.name
                })
        }
        join(m) {
            let g, p;
            const b = this.children.length;
            if (b > 0) {
                for (g = [],
                p = 0; p < b - 1; p++)
                    g.push(this.children[p]),
                    g.push(m);
                g.push(this.children[p]),
                this.children = g
            }
            return this
        }
        replaceRight(m, g) {
            const p = this.children[this.children.length - 1];
            return p[c] ? p.replaceRight(m, g) : typeof p == "string" ? this.children[this.children.length - 1] = p.replace(m, g) : this.children.push("".replace(m, g)),
            this
        }
        setSourceContent(m, g) {
            this.sourceContents[a.toSetString(m)] = g
        }
        walkSourceContents(m) {
            for (let p = 0, b = this.children.length; p < b; p++)
                this.children[p][c] && this.children[p].walkSourceContents(m);
            const g = Object.keys(this.sourceContents);
            for (let p = 0, b = g.length; p < b; p++)
                m(a.fromSetString(g[p]), this.sourceContents[g[p]])
        }
        toString() {
            let m = "";
            return this.walk(function(g) {
                m += g
            }),
            m
        }
        toStringWithSourceMap(m) {
            const g = {
                code: "",
                line: 1,
                column: 0
            }
              , p = new s(m);
            let b = !1
              , x = null
              , E = null
              , S = null
              , w = null;
            return this.walk(function(T, _) {
                g.code += T,
                _.source !== null && _.line !== null && _.column !== null ? ((x !== _.source || E !== _.line || S !== _.column || w !== _.name) && p.addMapping({
                    source: _.source,
                    original: {
                        line: _.line,
                        column: _.column
                    },
                    generated: {
                        line: g.line,
                        column: g.column
                    },
                    name: _.name
                }),
                x = _.source,
                E = _.line,
                S = _.column,
                w = _.name,
                b = !0) : b && (p.addMapping({
                    generated: {
                        line: g.line,
                        column: g.column
                    }
                }),
                x = null,
                b = !1);
                for (let z = 0, G = T.length; z < G; z++)
                    T.charCodeAt(z) === o ? (g.line++,
                    g.column = 0,
                    z + 1 === G ? (x = null,
                    b = !1) : b && p.addMapping({
                        source: _.source,
                        original: {
                            line: _.line,
                            column: _.column
                        },
                        generated: {
                            line: g.line,
                            column: g.column
                        },
                        name: _.name
                    })) : g.column++
            }),
            this.walkSourceContents(function(T, _) {
                p.setSourceContent(T, _)
            }),
            {
                code: g.code,
                map: p
            }
        }
    }
    return ho.SourceNode = f,
    ho
}
var om;
function My() {
    return om || (om = 1,
    Ba.SourceMapGenerator = dg().SourceMapGenerator,
    Ba.SourceMapConsumer = Ry().SourceMapConsumer,
    Ba.SourceNode = Ay().SourceNode),
    Ba
}
var Ro = My();
function zy(s, a, r) {
    const o = s[a];
    if (!o)
        return {
            lineIndex: a,
            column: r
        };
    const c = o.trim()
      , f = /^<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(c)
      , d = /<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(c);
    let m = !1;
    if (r != null) {
        const g = o.substring(0, r);
        m = /<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(g)
    }
    if (f || d || m) {
        if (r != null) {
            const g = o.substring(r)
              , p = g.match(/<([A-Za-z][A-Za-z0-9\-_.]*)/);
            if (p && g[p.index + 1] !== "/")
                return {
                    lineIndex: a,
                    column: r + p.index + 1
                }
        }
        for (let g = a + 1; g < s.length && g < a + 50; g++) {
            const p = s[g]
              , b = p.match(/<([A-Za-z][A-Za-z0-9\-_.]*)/);
            if (b && p[b.index + 1] !== "/")
                return {
                    lineIndex: g,
                    column: b.index + 1
                }
        }
    }
    return {
        lineIndex: a,
        column: r
    }
}
function Do(s, a, r) {
    let o = 0;
    for (let c = a; c < s.length; c++) {
        const f = s[c]
          , d = c === a ? r : 0;
        for (let m = d; m < f.length; m++) {
            const g = f[m];
            if (g === "{")
                o++;
            else if (g === "}")
                o--;
            else if (o === 0) {
                if (g === "/" && f[m + 1] === ">")
                    return {
                        lineIndex: c,
                        columnEnd: m + 2,
                        isSelfClosing: !0
                    };
                if (g === ">")
                    return {
                        lineIndex: c,
                        columnEnd: m + 1,
                        isSelfClosing: !1
                    }
            }
        }
    }
}
function mg(s, a, r, o) {
    let c = 1;
    const f = new RegExp(`<${a}(?=\\s|>|/>)`,"g")
      , d = new RegExp(`</${a}\\s*>`,"g");
    for (let m = r; m < s.length; m++) {
        const g = m === r ? o : 0
          , p = s[m].substring(g)
          , b = [];
        let x;
        for (f.lastIndex = 0; (x = f.exec(p)) !== null; ) {
            const E = Do([p], 0, x.index + x[0].length);
            E && !E.isSelfClosing && b.push({
                type: "open",
                index: x.index,
                length: x[0].length
            })
        }
        for (d.lastIndex = 0; (x = d.exec(p)) !== null; )
            b.push({
                type: "close",
                index: x.index,
                length: x[0].length
            });
        b.sort( (E, S) => E.index - S.index);
        for (const E of b)
            if (E.type === "open")
                c++;
            else if (E.type === "close" && (c--,
            c === 0))
                return {
                    lineIndex: m,
                    columnEnd: g + E.index + E.length
                }
    }
}
function cm(s, a, r) {
    let o;
    for (let c = a; c >= 0; c--) {
        const f = s[c]
          , d = /<([A-Za-z][A-Za-z0-9\-_.]*)/g;
        let m;
        for (; (m = d.exec(f)) !== null; ) {
            const g = m.index
              , p = m[1];
            if (f[g + 1] === "/" || !(c < a || c === a && g <= (r ?? f.length)))
                continue;
            const x = g + m[0].length
              , E = Do(s, c, x);
            if (!E)
                continue;
            let S = c
              , w = E.columnEnd;
            if (!E.isSelfClosing) {
                const _ = mg(s, p, c, E.columnEnd);
                if (!_)
                    continue;
                S = _.lineIndex,
                w = _.columnEnd
            }
            (c < a || c === a && g <= (r ?? f.length)) && (S > a || S === a && w >= (r ?? 0)) && (!o || S - c < o.closeLineIndex - o.lineIndex || S - c === o.closeLineIndex - o.lineIndex && w - g < o.closeColumnEnd - o.columnStart) && (o = {
                tagName: p,
                lineIndex: c,
                columnStart: g,
                columnEnd: E.columnEnd,
                isSelfClosing: E.isSelfClosing,
                closeLineIndex: S,
                closeColumnEnd: w
            })
        }
    }
    return o
}
function Ly(s, a, r) {
    const o = new RegExp(`<(${r})(?=\\s|>|/>)`,"i");
    for (let c = a + 1; c < s.length && c < a + 50; c++) {
        const f = s[c]
          , d = o.exec(f);
        if (d) {
            const m = d.index
              , g = d[1]
              , p = m + d[0].length
              , b = Do(s, c, p);
            if (!b)
                continue;
            let x = c
              , E = b.columnEnd;
            if (!b.isSelfClosing) {
                const S = mg(s, g, c, b.columnEnd);
                if (!S)
                    continue;
                x = S.lineIndex,
                E = S.columnEnd
            }
            return {
                tagName: g,
                lineIndex: c,
                columnStart: m,
                columnEnd: b.columnEnd,
                isSelfClosing: b.isSelfClosing,
                closeLineIndex: x,
                closeColumnEnd: E
            }
        }
    }
}
function Dy(s, a, r, o, c) {
    if (a === o)
        return s[a].substring(r, c);
    let f = s[a].substring(r);
    for (let d = a + 1; d < o; d++)
        f += `
` + s[d];
    return f += `
` + s[o].substring(0, c),
    f
}
function Uy(s, a, r=10) {
    const o = s.split(`
`)
      , c = Math.max(0, a - r - 1)
      , f = Math.min(o.length - 1, a + r - 1)
      , d = [];
    for (let m = c; m <= f; m++) {
        const g = m + 1
          , x = `${g === a ? ">>>" : "   "} ${g.toString().padStart(4, " ")} | ${o[m] || ""}`;
        d.push(x)
    }
    return d.join(`
`)
}
async function Hy(s) {
    try {
        const a = await fetch(s);
        if (!a.ok)
            throw new Error(`Failed to load source map: ${a.status}`);
        return await a.json()
    } catch (a) {
        const r = a instanceof Error ? a.message : String(a);
        console.warn("Error loading source map from", s, r)
    }
}
let mo = !1;
const Xl = new Map
  , qy = 300 * 1e3
  , By = 1e3;
setInterval( () => {
    const s = Date.now();
    for (const [a,r] of Xl.entries())
        s - r.timestamp > qy && Xl.delete(a)
}
, 6e4);
async function Gy() {
    if (!mo)
        try {
            await Ro.SourceMapConsumer.initialize({
                "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm"
            }),
            mo = !0
        } catch (s) {
            console.warn("Failed to initialize SourceMapConsumer:", s);
            try {
                await Ro.SourceMapConsumer.initialize({}),
                mo = !0
            } catch (a) {
                throw console.error("SourceMapConsumer initialization failed completely:", a),
                a
            }
        }
}
function Yy(s) {
    if (!s || !s.stack)
        return `no-stack-${s?.message || "unknown"}`;
    const o = s.stack.split(`
`).slice(0, 6).map(c => c.replace(/\?t=\d+/g, "").replace(/\?v=[\w\d]+/g, "").replace(/\d{13,}/g, "TIMESTAMP"));
    return `${s.name || "Error"}-${s.message}-${o.join("|")}`
}
const Vy = "preview-inject/";
async function ka(s, a=10, r) {
    if (!s || !s.stack)
        return {
            errorMessage: s?.message || "",
            mappedStack: s?.stack || "",
            sourceContext: []
        };
    const o = Yy(s);
    if (Xl.has(o)) {
        const x = Xl.get(o);
        return console.log("Using cached error mapping for:", o),
        x
    }
    if (Xl.size >= By)
        return null;
    await Gy();
    const c = s.stack.split(`
`)
      , f = []
      , d = []
      , m = new Map
      , g = new Map;
    let p = 0;
    for (const x of c) {
        const E = x.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)|([^@]*)@(.+?):(\d+):(\d+)/);
        if (!E) {
            f.push(x);
            continue
        }
        let S, w, T, _;
        E[1] ? (S = E[1],
        w = E[2],
        T = parseInt(E[3]),
        _ = parseInt(E[4])) : E[5] ? (S = "<anonymous>",
        w = E[5],
        T = parseInt(E[6]),
        _ = parseInt(E[7])) : (S = E[8],
        w = E[9],
        T = parseInt(E[10]),
        _ = parseInt(E[11]));
        try {
            const z = `${w}.map`;
            let G = m.get(z);
            if (!G) {
                const J = await Hy(z);
                G = await new Ro.SourceMapConsumer(J),
                m.set(z, G)
            }
            const V = G.originalPositionFor({
                line: T,
                column: _
            });
            if (V.source) {
                if (V.source.includes(Vy))
                    continue;
                const J = V.source.split("/").filter(P => P !== "..").join("/")
                  , ue = `    at ${V.name || S} (${J}:${V.line}:${V.column})`;
                if (f.push(ue),
                V.line && V.column && p < a) {
                    p++;
                    try {
                        const P = await Qy(G, V.source, g);
                        if (P) {
                            const ye = J.includes("node_modules")
                              , Ne = /\.(tsx|jsx)$/.test(J);
                            let Q;
                            if (!ye && Ne) {
                                const K = Xy(P, V.line, V.column, r);
                                K && (Q = {
                                    tagName: K.tagName,
                                    code: K.code,
                                    context: K.context,
                                    startLine: K.startLine,
                                    endLine: K.endLine
                                })
                            }
                            const k = Uy(P, V.line, ye ? 1 : 10);
                            d.push({
                                file: J,
                                line: V.line,
                                column: V.column,
                                context: k,
                                closedBlock: Q
                            })
                        }
                    } catch (P) {
                        console.warn("Failed to extract source context:", P)
                    }
                }
            } else
                f.push(x)
        } catch (z) {
            console.warn("Failed to map stack line:", x, z),
            f.push(x)
        }
    }
    for (const x of m.values())
        x.destroy();
    const b = {
        errorMessage: s?.message || "",
        mappedStack: f.join(`
`),
        sourceContext: d
    };
    return b.timestamp = Date.now(),
    Xl.set(o, b),
    b
}
async function Qy(s, a, r) {
    if (r.has(a))
        return r.get(a) || null;
    const o = s.sourceContentFor(a);
    return o ? (r.set(a, o),
    o) : null
}
function Xy(s, a, r, o) {
    const c = s.split(`
`);
    let f = a - 1;
    if (f < 0 || f >= c.length)
        return;
    let d = cm(c, f, r);
    if (o && d) {
        const S = o.toLowerCase()
          , w = d.tagName.toLowerCase();
        if (S !== w) {
            const T = Ly(c, f, S);
            T && (d = T)
        }
    } else if (!d) {
        const S = zy(c, f, r);
        d = cm(c, S.lineIndex, S.column)
    }
    if (!d)
        return;
    const {tagName: m, lineIndex: g, columnStart: p, closeLineIndex: b, closeColumnEnd: x, isSelfClosing: E} = d;
    return {
        tagName: m,
        code: Dy(c, g, p, b, x),
        context: c.slice(g, b + 1).join(`
`),
        startLine: g + 1,
        endLine: b + 1,
        isSelfClosing: E
    }
}
class ky {
    client;
    originalConsoleError;
    constructor() {
        const a = xy();
        a.length > 0 && a.forEach(r => {
            r.type === "console.error" ? this.handleConsoleError(r.args) : r.type === "runtime" && this.handleError(r.args)
        }
        ),
        this.client = new Pa(window.parent),
        this.originalConsoleError = console.error,
        this.initErrorHandlers()
    }
    initErrorHandlers() {
        window.addEventListener("error", this.handleError.bind(this)),
        window.addEventListener("unhandledrejection", this.handlePromiseRejection.bind(this)),
        this.interceptConsoleError()
    }
    async handleError(a) {
        const r = a.target;
        if (!(r && r instanceof HTMLElement && r.tagName && ["IMG", "SCRIPT", "LINK", "VIDEO", "AUDIO", "SOURCE", "IFRAME"].includes(r.tagName)) && a.error && a.error.stack)
            try {
                const o = await ka(a.error);
                this.sendError(o)
            } catch (o) {
                console.warn("Failed to map error stack:", o)
            }
    }
    async handlePromiseRejection(a) {
        const r = a.reason instanceof Error ? a.reason : new Error(String(a.reason));
        if (r.stack)
            try {
                const o = await ka(r);
                this.sendError(o)
            } catch (o) {
                console.warn("Failed to map promise rejection stack:", o)
            }
    }
    interceptConsoleError() {
        console.error = (...a) => {
            this.originalConsoleError.apply(console, a);
            const r = a.find(o => o instanceof Error);
            if (r && r.stack)
                this.handleConsoleError(r);
            else if (a.length > 0) {
                const o = a.map(f => typeof f == "object" ? JSON.stringify(f) : String(f)).join(" ")
                  , c = new Error(o);
                this.handleConsoleError(c)
            }
        }
    }
    async handleConsoleError(a) {
        try {
            const r = await ka(a);
            this.sendError(r)
        } catch (r) {
            console.warn("Failed to map console error stack:", r)
        }
    }
    reportError(a) {
        this.handleReactError(a)
    }
    async handleReactError(a) {
        try {
            const r = await ka(a);
            this.sendError(r)
        } catch (r) {
            console.warn("Failed to map React error stack:", r)
        }
    }
    async sendError(a) {
        if (!a) {
            console.warn("error is too many");
            return
        }
        if (a.sourceContext.length !== 0)
            try {
                await this.client.post("runtime-error", a)
            } catch (r) {
                console.warn("Failed to send error to parent:", r)
            }
    }
    destroy() {
        console.error = this.originalConsoleError,
        this.client.destroy()
    }
}
function Zy() {
    const s = new ky;
    return window.runtimeErrorCollector = s,
    s
}
class Ky {
    _client;
    constructor() {
        this._client = new Pa(window.parent),
        this._domContentLoadedListener()
    }
    _domContentLoadedListener() {
        const a = () => {
            console.log("DOMContentLoaded"),
            this._client.post("DOMContentLoaded"),
            document.removeEventListener("DOMContentLoaded", a)
        }
        ;
        document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", a) : (console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"))
    }
}
function Jy() {
    return new Ky
}
const Uo = s => {
    const a = "/preview/058c727d-e524-43f3-aa39-75dae29dc1a6/6746491";
    return s.startsWith(a) ? s.replaceAll(a, "") || "/" : s || "/"
}
  , $y = "modulepreload"
  , Fy = function(s) {
    return "/preview/058c727d-e524-43f3-aa39-75dae29dc1a6/6746491/" + s
}
  , fm = {}
  , gg = function(a, r, o) {
    let c = Promise.resolve();
    if (r && r.length > 0) {
        let p = function(b) {
            return Promise.all(b.map(x => Promise.resolve(x).then(E => ({
                status: "fulfilled",
                value: E
            }), E => ({
                status: "rejected",
                reason: E
            }))))
        };
        var d = p;
        document.getElementsByTagName("link");
        const m = document.querySelector("meta[property=csp-nonce]")
          , g = m?.nonce || m?.getAttribute("nonce");
        c = p(r.map(b => {
            if (b = Fy(b),
            b in fm)
                return;
            fm[b] = !0;
            const x = b.endsWith(".css")
              , E = x ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${b}"]${E}`))
                return;
            const S = document.createElement("link");
            if (S.rel = x ? "stylesheet" : $y,
            x || (S.as = "script"),
            S.crossOrigin = "",
            S.href = b,
            g && S.setAttribute("nonce", g),
            document.head.appendChild(S),
            x)
                return new Promise( (w, T) => {
                    S.addEventListener("load", w),
                    S.addEventListener("error", () => T(new Error(`Unable to preload CSS for ${b}`)))
                }
                )
        }
        ))
    }
    function f(m) {
        const g = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (g.payload = m,
        window.dispatchEvent(g),
        !g.defaultPrevented)
            throw m
    }
    return c.then(m => {
        for (const g of m || [])
            g.status === "rejected" && f(g.reason);
        return a().catch(f)
    }
    )
};
async function Wy() {
    await await gg( () => Promise.resolve().then( () => f1), []).then(a => a.navigatePromise).catch(a => (console.error(a),
    Promise.resolve( () => {}
    ))),
    window.REACT_APP_ROUTER = {
        push: (a, r) => {
            window.REACT_APP_NAVIGATE(a, r)
        }
        ,
        replace: (a, r, o) => {
            window.REACT_APP_NAVIGATE(a, {
                replace: !0,
                ...o
            })
        }
        ,
        forward: () => {
            window.REACT_APP_NAVIGATE(1)
        }
        ,
        back: () => {
            window.REACT_APP_NAVIGATE(-1)
        }
        ,
        refresh: () => {
            window.REACT_APP_NAVIGATE(0)
        }
        ,
        prefetch: (a, r) => {
            window.REACT_APP_NAVIGATE(a, r)
        }
    }
}
const pg = new Promise(s => {
    Wy().then( () => {
        s(window.REACT_APP_ROUTER)
    }
    )
}
)
  , Ho = () => window.REACT_APP_ROUTER
  , qo = new Pa(window.parent)
  , Ao = async (s, a) => {
    await qo.post("routeWillChange", {
        next: Uo(s)
    }, a)
}
;
function Py(s) {
    const a = document.querySelector(s);
    a && a.scrollIntoView({
        behavior: "smooth"
    })
}
function Iy() {
    const s = window.open;
    return window.open = function(a, r, o) {
        return a && typeof a == "string" && a.startsWith("#") ? (Py(a),
        null) : (s(a, "_blank", o),
        null)
    }
    ,
    () => {
        window.open = s
    }
}
function ex() {
    const s = async a => {
        const o = a.target.closest("a");
        if (!o || o.tagName !== "A")
            return;
        const c = o.getAttribute("href");
        if (c && !["#", "javascript:void(0)", ""].includes(c) && !c.startsWith("#")) {
            if (a.preventDefault(),
            c.startsWith("/")) {
                const f = Ho();
                await Ao(c, {
                    timeout: 500
                });
                const d = Uo(c);
                f.push(d);
                return
            }
            window.open(o.href, "_blank")
        }
    }
    ;
    return window.addEventListener("click", s, !0),
    () => {
        window.removeEventListener("click", s, !0)
    }
}
const dm = s => s.startsWith("http://") || s.startsWith("https://");
function tx(s) {
    return !s || typeof s != "string" ? !1 : s.indexOf("accounts.google.com") !== -1 || s.indexOf("googleapis.com/oauth") !== -1 || s.indexOf("/auth/") !== -1 && s.indexOf("provider=google") !== -1
}
function nx() {
    const s = () => {
        const a = Ho()
          , r = a.push;
        a.push = async function(c, f, d) {
            return dm(c) ? (window.open(c, "_blank"),
            Promise.resolve(!1)) : (await Ao(c, {
                timeout: 500
            }),
            r.call(this, c, f, d))
        }
        ;
        const o = a.replace;
        a.replace = async function(c, f, d) {
            return dm(c) ? (window.open(c, "_blank"),
            Promise.resolve(!1)) : (await Ao(c, {
                timeout: 500
            }),
            o.call(this, c, f, d))
        }
    }
    ;
    return window.addEventListener("load", s),
    () => {
        window.removeEventListener("load", s)
    }
}
function lx() {
    if (!("navigation"in window))
        return () => {}
        ;
    const s = a => {
        tx(a.destination.url) && qo.post("google-auth-blocked", {
            url: a.destination.url || ""
        })
    }
    ;
    return window.navigation.addEventListener("navigate", s),
    () => {
        window.navigation.removeEventListener("navigate", s)
    }
}
async function ax() {
    await pg;
    const s = Iy()
      , a = ex()
      , r = nx()
      , o = lx();
    return () => {
        qo.destroy(),
        s(),
        a(),
        r(),
        o()
    }
}
async function ix() {
    const s = await gg( () => Promise.resolve().then( () => o1), void 0).then(f => f.default).catch(f => []);
    let a = []
      , r = 0;
    function o(f, d) {
        const {path: m="", children: g, index: p} = f;
        r++;
        const b = p === !0 || m === ""
          , x = m && m[0] === "/"
          , E = b ? d.path : `${d.path}/${m}`
          , S = x && !b ? m : E
          , w = {
            id: r,
            parentId: d.id,
            path: "/" + S.split("/").filter(Boolean).join("/")
        };
        /\*/.test(w.path) || a.push(w),
        g && g.forEach(T => o(T, w))
    }
    s.forEach(f => o(f, {
        id: 0,
        path: ""
    }));
    const c = new Set;
    return a = a.filter(f => c.has(f.path) ? !1 : (c.add(f.path),
    !0)),
    a
}
async function sx() {
    const s = new Pa(window.parent)
      , a = await ix();
    window.REACT_APP_ROUTES = a,
    s.post("routes", {
        routes: a
    }),
    s.on("getRouteInfo", async x => a),
    await pg,
    s.on("routeAction", async x => {
        const E = Ho()
          , {action: S, route: w} = x;
        switch (S) {
        case "goForward":
            E.forward();
            break;
        case "goBack":
            E.back();
            break;
        case "refresh":
            E.refresh();
            break;
        case "goTo":
            w && E.push(w);
            break;
        default:
            console.warn("Unknown action:", S)
        }
    }
    );
    function r() {
        const x = window.history.state?.index ?? 0
          , E = window.history.length > x + 1
          , S = x > 0
          , w = window.location.pathname;
        s.post("updateNavigationState", {
            canGoForward: E,
            canGoBack: S,
            currentRoute: Uo(w)
        })
    }
    function o() {
        const x = new MutationObserver(S => {
            S.forEach(w => {
                (w.type === "childList" || w.type === "characterData") && s.post("titleChanged", {
                    title: document.title
                })
            }
            )
        }
        )
          , E = document.querySelector("title");
        return s.post("titleChanged", {
            title: document.title
        }),
        E && x.observe(E, {
            childList: !0,
            characterData: !0,
            subtree: !0
        }),
        x
    }
    let c = o();
    function f() {
        c.disconnect(),
        setTimeout( () => {
            c = o()
        }
        , 100)
    }
    const d = window.history.pushState
      , m = window.history.replaceState
      , g = window.history.go
      , p = window.history.back
      , b = window.history.forward;
    return window.history.pushState = function(x, E, S) {
        d.apply(this, arguments),
        r(),
        f()
    }
    ,
    window.history.replaceState = function(x, E, S) {
        m.apply(this, arguments),
        r(),
        f()
    }
    ,
    window.history.go = function(x) {
        g.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    window.history.back = function() {
        p.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    window.history.forward = function() {
        b.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    {
        destroy: () => {
            s.destroy(),
            c.disconnect()
        }
    }
}
var go = {
    exports: {}
}
  , ie = {};
var hm;
function rx() {
    if (hm)
        return ie;
    hm = 1;
    var s = Symbol.for("react.transitional.element")
      , a = Symbol.for("react.portal")
      , r = Symbol.for("react.fragment")
      , o = Symbol.for("react.strict_mode")
      , c = Symbol.for("react.profiler")
      , f = Symbol.for("react.consumer")
      , d = Symbol.for("react.context")
      , m = Symbol.for("react.forward_ref")
      , g = Symbol.for("react.suspense")
      , p = Symbol.for("react.memo")
      , b = Symbol.for("react.lazy")
      , x = Symbol.for("react.activity")
      , E = Symbol.iterator;
    function S(j) {
        return j === null || typeof j != "object" ? null : (j = E && j[E] || j["@@iterator"],
        typeof j == "function" ? j : null)
    }
    var w = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , T = Object.assign
      , _ = {};
    function z(j, q, Z) {
        this.props = j,
        this.context = q,
        this.refs = _,
        this.updater = Z || w
    }
    z.prototype.isReactComponent = {},
    z.prototype.setState = function(j, q) {
        if (typeof j != "object" && typeof j != "function" && j != null)
            throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, j, q, "setState")
    }
    ,
    z.prototype.forceUpdate = function(j) {
        this.updater.enqueueForceUpdate(this, j, "forceUpdate")
    }
    ;
    function G() {}
    G.prototype = z.prototype;
    function V(j, q, Z) {
        this.props = j,
        this.context = q,
        this.refs = _,
        this.updater = Z || w
    }
    var J = V.prototype = new G;
    J.constructor = V,
    T(J, z.prototype),
    J.isPureReactComponent = !0;
    var W = Array.isArray;
    function ue() {}
    var P = {
        H: null,
        A: null,
        T: null,
        S: null
    }
      , ye = Object.prototype.hasOwnProperty;
    function Ne(j, q, Z) {
        var $ = Z.ref;
        return {
            $$typeof: s,
            type: j,
            key: q,
            ref: $ !== void 0 ? $ : null,
            props: Z
        }
    }
    function Q(j, q) {
        return Ne(j.type, q, j.props)
    }
    function k(j) {
        return typeof j == "object" && j !== null && j.$$typeof === s
    }
    function K(j) {
        var q = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + j.replace(/[=:]/g, function(Z) {
            return q[Z]
        })
    }
    var ne = /\/+/g;
    function oe(j, q) {
        return typeof j == "object" && j !== null && j.key != null ? K("" + j.key) : q.toString(36)
    }
    function fe(j) {
        switch (j.status) {
        case "fulfilled":
            return j.value;
        case "rejected":
            throw j.reason;
        default:
            switch (typeof j.status == "string" ? j.then(ue, ue) : (j.status = "pending",
            j.then(function(q) {
                j.status === "pending" && (j.status = "fulfilled",
                j.value = q)
            }, function(q) {
                j.status === "pending" && (j.status = "rejected",
                j.reason = q)
            })),
            j.status) {
            case "fulfilled":
                return j.value;
            case "rejected":
                throw j.reason
            }
        }
        throw j
    }
    function D(j, q, Z, $, se) {
        var de = typeof j;
        (de === "undefined" || de === "boolean") && (j = null);
        var _e = !1;
        if (j === null)
            _e = !0;
        else
            switch (de) {
            case "bigint":
            case "string":
            case "number":
                _e = !0;
                break;
            case "object":
                switch (j.$$typeof) {
                case s:
                case a:
                    _e = !0;
                    break;
                case b:
                    return _e = j._init,
                    D(_e(j._payload), q, Z, $, se)
                }
            }
        if (_e)
            return se = se(j),
            _e = $ === "" ? "." + oe(j, 0) : $,
            W(se) ? (Z = "",
            _e != null && (Z = _e.replace(ne, "$&/") + "/"),
            D(se, q, Z, "", function(Zl) {
                return Zl
            })) : se != null && (k(se) && (se = Q(se, Z + (se.key == null || j && j.key === se.key ? "" : ("" + se.key).replace(ne, "$&/") + "/") + _e)),
            q.push(se)),
            1;
        _e = 0;
        var nt = $ === "" ? "." : $ + ":";
        if (W(j))
            for (var He = 0; He < j.length; He++)
                $ = j[He],
                de = nt + oe($, He),
                _e += D($, q, Z, de, se);
        else if (He = S(j),
        typeof He == "function")
            for (j = He.call(j),
            He = 0; !($ = j.next()).done; )
                $ = $.value,
                de = nt + oe($, He++),
                _e += D($, q, Z, de, se);
        else if (de === "object") {
            if (typeof j.then == "function")
                return D(fe(j), q, Z, $, se);
            throw q = String(j),
            Error("Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead.")
        }
        return _e
    }
    function X(j, q, Z) {
        if (j == null)
            return j;
        var $ = []
          , se = 0;
        return D(j, $, "", "", function(de) {
            return q.call(Z, de, se++)
        }),
        $
    }
    function te(j) {
        if (j._status === -1) {
            var q = j._result;
            q = q(),
            q.then(function(Z) {
                (j._status === 0 || j._status === -1) && (j._status = 1,
                j._result = Z)
            }, function(Z) {
                (j._status === 0 || j._status === -1) && (j._status = 2,
                j._result = Z)
            }),
            j._status === -1 && (j._status = 0,
            j._result = q)
        }
        if (j._status === 1)
            return j._result.default;
        throw j._result
    }
    var ve = typeof reportError == "function" ? reportError : function(j) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var q = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
                error: j
            });
            if (!window.dispatchEvent(q))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", j);
            return
        }
        console.error(j)
    }
      , we = {
        map: X,
        forEach: function(j, q, Z) {
            X(j, function() {
                q.apply(this, arguments)
            }, Z)
        },
        count: function(j) {
            var q = 0;
            return X(j, function() {
                q++
            }),
            q
        },
        toArray: function(j) {
            return X(j, function(q) {
                return q
            }) || []
        },
        only: function(j) {
            if (!k(j))
                throw Error("React.Children.only expected to receive a single React element child.");
            return j
        }
    };
    return ie.Activity = x,
    ie.Children = we,
    ie.Component = z,
    ie.Fragment = r,
    ie.Profiler = c,
    ie.PureComponent = V,
    ie.StrictMode = o,
    ie.Suspense = g,
    ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P,
    ie.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(j) {
            return P.H.useMemoCache(j)
        }
    },
    ie.cache = function(j) {
        return function() {
            return j.apply(null, arguments)
        }
    }
    ,
    ie.cacheSignal = function() {
        return null
    }
    ,
    ie.cloneElement = function(j, q, Z) {
        if (j == null)
            throw Error("The argument must be a React element, but you passed " + j + ".");
        var $ = T({}, j.props)
          , se = j.key;
        if (q != null)
            for (de in q.key !== void 0 && (se = "" + q.key),
            q)
                !ye.call(q, de) || de === "key" || de === "__self" || de === "__source" || de === "ref" && q.ref === void 0 || ($[de] = q[de]);
        var de = arguments.length - 2;
        if (de === 1)
            $.children = Z;
        else if (1 < de) {
            for (var _e = Array(de), nt = 0; nt < de; nt++)
                _e[nt] = arguments[nt + 2];
            $.children = _e
        }
        return Ne(j.type, se, $)
    }
    ,
    ie.createContext = function(j) {
        return j = {
            $$typeof: d,
            _currentValue: j,
            _currentValue2: j,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        },
        j.Provider = j,
        j.Consumer = {
            $$typeof: f,
            _context: j
        },
        j
    }
    ,
    ie.createElement = function(j, q, Z) {
        var $, se = {}, de = null;
        if (q != null)
            for ($ in q.key !== void 0 && (de = "" + q.key),
            q)
                ye.call(q, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (se[$] = q[$]);
        var _e = arguments.length - 2;
        if (_e === 1)
            se.children = Z;
        else if (1 < _e) {
            for (var nt = Array(_e), He = 0; He < _e; He++)
                nt[He] = arguments[He + 2];
            se.children = nt
        }
        if (j && j.defaultProps)
            for ($ in _e = j.defaultProps,
            _e)
                se[$] === void 0 && (se[$] = _e[$]);
        return Ne(j, de, se)
    }
    ,
    ie.createRef = function() {
        return {
            current: null
        }
    }
    ,
    ie.forwardRef = function(j) {
        return {
            $$typeof: m,
            render: j
        }
    }
    ,
    ie.isValidElement = k,
    ie.lazy = function(j) {
        return {
            $$typeof: b,
            _payload: {
                _status: -1,
                _result: j
            },
            _init: te
        }
    }
    ,
    ie.memo = function(j, q) {
        return {
            $$typeof: p,
            type: j,
            compare: q === void 0 ? null : q
        }
    }
    ,
    ie.startTransition = function(j) {
        var q = P.T
          , Z = {};
        P.T = Z;
        try {
            var $ = j()
              , se = P.S;
            se !== null && se(Z, $),
            typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(ue, ve)
        } catch (de) {
            ve(de)
        } finally {
            q !== null && Z.types !== null && (q.types = Z.types),
            P.T = q
        }
    }
    ,
    ie.unstable_useCacheRefresh = function() {
        return P.H.useCacheRefresh()
    }
    ,
    ie.use = function(j) {
        return P.H.use(j)
    }
    ,
    ie.useActionState = function(j, q, Z) {
        return P.H.useActionState(j, q, Z)
    }
    ,
    ie.useCallback = function(j, q) {
        return P.H.useCallback(j, q)
    }
    ,
    ie.useContext = function(j) {
        return P.H.useContext(j)
    }
    ,
    ie.useDebugValue = function() {}
    ,
    ie.useDeferredValue = function(j, q) {
        return P.H.useDeferredValue(j, q)
    }
    ,
    ie.useEffect = function(j, q) {
        return P.H.useEffect(j, q)
    }
    ,
    ie.useEffectEvent = function(j) {
        return P.H.useEffectEvent(j)
    }
    ,
    ie.useId = function() {
        return P.H.useId()
    }
    ,
    ie.useImperativeHandle = function(j, q, Z) {
        return P.H.useImperativeHandle(j, q, Z)
    }
    ,
    ie.useInsertionEffect = function(j, q) {
        return P.H.useInsertionEffect(j, q)
    }
    ,
    ie.useLayoutEffect = function(j, q) {
        return P.H.useLayoutEffect(j, q)
    }
    ,
    ie.useMemo = function(j, q) {
        return P.H.useMemo(j, q)
    }
    ,
    ie.useOptimistic = function(j, q) {
        return P.H.useOptimistic(j, q)
    }
    ,
    ie.useReducer = function(j, q, Z) {
        return P.H.useReducer(j, q, Z)
    }
    ,
    ie.useRef = function(j) {
        return P.H.useRef(j)
    }
    ,
    ie.useState = function(j) {
        return P.H.useState(j)
    }
    ,
    ie.useSyncExternalStore = function(j, q, Z) {
        return P.H.useSyncExternalStore(j, q, Z)
    }
    ,
    ie.useTransition = function() {
        return P.H.useTransition()
    }
    ,
    ie.version = "19.2.4",
    ie
}
var mm;
function Bo() {
    return mm || (mm = 1,
    go.exports = rx()),
    go.exports
}
var U = Bo();
const gm = by(U);
var po = {
    exports: {}
}
  , Ya = {};
var pm;
function ux() {
    if (pm)
        return Ya;
    pm = 1;
    var s = Symbol.for("react.transitional.element")
      , a = Symbol.for("react.fragment");
    function r(o, c, f) {
        var d = null;
        if (f !== void 0 && (d = "" + f),
        c.key !== void 0 && (d = "" + c.key),
        "key"in c) {
            f = {};
            for (var m in c)
                m !== "key" && (f[m] = c[m])
        } else
            f = c;
        return c = f.ref,
        {
            $$typeof: s,
            type: o,
            key: d,
            ref: c !== void 0 ? c : null,
            props: f
        }
    }
    return Ya.Fragment = a,
    Ya.jsx = r,
    Ya.jsxs = r,
    Ya
}
var ym;
function ox() {
    return ym || (ym = 1,
    po.exports = ux()),
    po.exports
}
var y = ox()
  , yo = {
    exports: {}
}
  , Es = {};
var xm;
function cx() {
    if (xm)
        return Es;
    xm = 1;
    var s = Symbol.for("react.fragment");
    return Es.Fragment = s,
    Es.jsxDEV = void 0,
    Es
}
var vm;
function fx() {
    return vm || (vm = 1,
    yo.exports = cx()),
    yo.exports
}
var bm = fx();
class yg {
    static getFiberFromDOMNode(a) {
        if (!a)
            return null;
        const r = Object.keys(a).find(o => o.startsWith("__reactFiber$") || o.startsWith("__reactInternalInstance$"));
        return r ? a[r] : null
    }
}
const xg = new WeakMap
  , vg = new WeakMap
  , Sm = new WeakMap
  , xo = new WeakMap
  , Em = new WeakMap
  , wm = new WeakMap
  , vo = (s, a) => {
    try {
        vg.set(s, a);
        const r = yg.getFiberFromDOMNode(s);
        r && xg.set(r, a)
    } catch {}
}
  , ws = (s, a) => {
    if (!s)
        return r => {
            r instanceof HTMLElement && vo(r, a)
        }
        ;
    if (typeof s == "function") {
        let r = xo.get(s);
        r || (r = [],
        xo.set(s, r)),
        r.push(a);
        let o = Sm.get(s);
        return o || (o = c => {
            if (c instanceof HTMLElement) {
                const f = xo.get(s);
                if (f && f.length > 0) {
                    const d = f.shift();
                    vo(c, d)
                }
            }
            s(c)
        }
        ,
        Sm.set(s, o)),
        o
    }
    if (s && typeof s == "object" && "current"in s) {
        wm.set(s, a);
        let r = Em.get(s);
        return r || (r = o => {
            if (o instanceof HTMLElement) {
                const c = wm.get(s);
                c && vo(o, c)
            }
            s.current = o
        }
        ,
        Em.set(s, r)),
        r
    }
}
;
function dx() {
    const s = gm.createElement
      , a = y.jsx
      , r = y.jsxs
      , o = bm.jsxDEV
      , c = () => {
        const d = new Error;
        return () => d
    }
      , f = d => typeof d == "string";
    gm.createElement = function(d, m, ...g) {
        if (!f(d) && typeof d != "function")
            return s(d, m, ...g);
        const p = c()
          , b = m ? {
            ...m
        } : {}
          , x = ws(b.ref, p);
        return x && (b.ref = x),
        s(d, b, ...g)
    }
    ,
    y.jsx = function(d, m, g) {
        if (!f(d) && typeof d != "function")
            return a(d, m, g);
        const p = c()
          , b = m ? {
            ...m
        } : {}
          , x = ws(b.ref, p);
        return x && (b.ref = x),
        a(d, b, g)
    }
    ,
    y.jsxs = function(d, m, g) {
        if (!f(d) && typeof d != "function")
            return r(d, m, g);
        const p = c()
          , b = m ? {
            ...m
        } : {}
          , x = ws(b.ref, p);
        return x && (b.ref = x),
        r(d, b, g)
    }
    ,
    o && (bm.jsxDEV = function(d, m, g, p, b, x) {
        if (!f(d) && typeof d != "function")
            return o(d, m, g, p, b, x);
        const E = c()
          , S = m ? {
            ...m
        } : {}
          , w = ws(S.ref, E);
        return w && (S.ref = w),
        o(d, S, g, p, b, x)
    }
    )
}
function hx(s) {
    const a = document.querySelector(s);
    if (!a)
        return null;
    const r = a.tagName.toLowerCase()
      , o = vg.get(a);
    if (o)
        return {
            element: a,
            tagName: r,
            debugError: o()
        };
    const c = yg.getFiberFromDOMNode(a);
    if (c) {
        const f = xg.get(c);
        if (f)
            return {
                element: a,
                tagName: r,
                debugError: f()
            }
    }
    return null
}
dx();
function mx() {
    const s = new WeakMap
      , a = new Pa(window.parent);
    return a.on("get-element-source", async ({selector: r}) => {
        const o = hx(r);
        if (!o)
            return null;
        const {element: c, tagName: f, debugError: d} = o;
        if (s.has(c))
            return s.get(c);
        const m = await ka(d, 10, f);
        if (!m)
            return null;
        const p = {
            ...m.sourceContext.filter(b => !b.file.includes("node_modules"))[0],
            domInfo: {
                tagName: c.tagName,
                textContent: c.textContent.slice(0, 300)
            }
        };
        return s.set(c, p),
        p
    }
    ),
    () => {
        a.destroy()
    }
}
const gx = !0;
console.log("Is preview build:", gx);
async function px() {
    Zy(),
    ax(),
    Jy(),
    sx(),
    mx()
}
px();
const yx = "phc_V7JMHB0fVJGRu8UHyrsj6pSL1BS76P5zD8qCi7lrTTV"
  , Je = {
    colors: {
        text: "#5D5D5D",
        white: "#FFFFFF",
        border: "rgba(0, 10, 36, 0.08)"
    },
    font: {
        family: '"Geist"',
        weight: "600",
        size: {
            normal: "14px",
            button: "18px"
        },
        lineHeight: "20px"
    },
    button: {
        gradient: "linear-gradient(180deg, #A797FF 0%, #7057FF 100%)"
    },
    shadow: "0px 8px 12px 0px rgba(9, 10, 20, 0.06)",
    zIndex: `${Number.MAX_SAFE_INTEGER}`
}
  , _m = {
    close: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D303D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')}`,
    generate: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.87 4.94c.227-.71 1.21-.723 1.456-.02l1.177 3.378 3.101 1.013c.708.231.714 1.216.01 1.455l-3.183 1.082-1.105 3.17c-.245.704-1.23.69-1.455-.02l-.989-3.107-3.367-1.203c-.702-.25-.68-1.234.04-1.455l3.282-1.016 1.043-3.277Z" fill="#FFF"/><path fill-rule="evenodd" d="M12.238 1.3c.167-.667 1.1-.667 1.266 0l.388 1.551 1.55.388c.666.166.667 1.1 0 1.266l-1.55.388-.388 1.55c-.167.666-1.1.667-1.266 0l-.388-1.55-1.55-.388c-.667-.166-.667-1.1 0-1.266l1.55-.388.388-1.551Z" fill="#FFF"/></svg>')}`
}
  
;
function Sx() {
    if (window.posthog)
        return;
    const s = document.createElement("script");
    s.src = Za.posthogCDN,
    s.async = !0,
    s.onload = () => {
        window.posthog?.init(yx, {
            api_host: "https://us.i.posthog.com",
            autocapture: !1,
            capture_pageview: !1,
            capture_pageleave: !1,
            disable_session_recording: !0,
            disable_scroll_properties: !0,
            capture_performance: {
                web_vitals: !1
            },
            rageclick: !1,
            loaded: function(a) {
                a.sessionRecording && a.sessionRecording.stopRecording()
            }
        })
    }
    ,
    document.head.appendChild(s)
}
function jm(s, a) {
    window.posthog?.capture(s, {
        ...a,
        version: 2
    })
}
function Yt(s, a) {
    Object.assign(s.style, a)
}
function So(s, a="0") {
    Yt(s, {
        color: Je.colors.text,
        fontFamily: Je.font.family,
        fontSize: Je.font.size.normal,
        lineHeight: Je.font.lineHeight,
        fontWeight: Je.font.weight,
        whiteSpace: "nowrap",
        marginRight: a
    })
}
function _s(s, a="row") {
    Yt(s, {
        display: "flex",
        flexDirection: a,
        alignItems: "center",
        justifyContent: "center"
    })
}
// function Ex() {
//     if (bx())
//         return;
//     const s = "https://readdy.ai/api/public/user/is_free"
//       , a = "058c727d-e524-43f3-aa39-75dae29dc1a6";
//     async function r(S) {
//         try {
//             return !(await (await fetch(`${s}?projectId=${S}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })).json()).data.is_free
//         } catch {
//             return !0
//         }
//     }
//     function o() {
//         document.querySelector('link[rel="icon"]')?.remove();
//         const S = document.createElement("link");
//         S.type = "image/png",
//         S.rel = "icon",
//         S.href = Za.readdyLogo,
//         document.head.appendChild(S);
//         const w = document.createElement("link");
//         w.rel = "stylesheet",
//         w.href = Za.fontStylesheet,
//         document.head.appendChild(w)
//     }
    // function c(S) {
    //     jm(S),
    //     window.open(Za.readdyLink, "_blank")
    // }
    function f() {
        const S = document.createElement("div");
        S.id = "close-button",
        Yt(S, {
            position: "absolute",
            top: "-12px",
            right: "-12px",
            width: "32px",
            height: "32px",
            backgroundColor: Je.colors.white,
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: Je.colors.border,
            cursor: "pointer",
            boxShadow: Je.shadow
        }),
        _s(S);
        const w = document.createElement("img");
        return w.src = _m.close,
        Yt(w, {
            width: "24px",
            height: "24px"
        }),
        S.appendChild(w),
        S.addEventListener("click", T => {
            T.stopPropagation(),
            jm("watermark_close_button_click"),
            document.getElementById("watermark")?.remove()
        }
        ),
        S
    }
    function d(S) {
        const w = document.createElement("div");
        w.id = "generate-button",
        Yt(w, {
            padding: S ? "8px 16px" : "10px 20px",
            background: Je.button.gradient,
            borderRadius: "999px",
            border: "none",
            gap: "6px",
            cursor: "pointer",
            marginLeft: S ? "12px" : "0",
            whiteSpace: "nowrap",
            width: S ? "auto" : "100%"
        }),
        _s(w);
        const T = document.createElement("img");
        T.src = _m.generate,
        Yt(T, {
            width: "16px",
            height: "16px",
            flexShrink: "0"
        });
        const _ = document.createElement("span");
        return _.textContent = bo().button,
        Yt(_, {
            color: Je.colors.white,
            fontFamily: Je.font.family,
            fontSize: Je.font.size.button,
            fontWeight: Je.font.weight,
            lineHeight: Je.font.lineHeight
        }),
        w.append(T, _),
        w.addEventListener("click", z => {
            z.stopPropagation(),
            c("watermark_create_button_click")
        }
        ),
        w
    }
    function m() {
        const S = document.createElement("img");
        return S.src = Za.watermarkLogo,
        Yt(S, {
            width: "92px",
            height: "auto",
            paddingLeft: "8px",
            flexShrink: "0"
        }),
        S
    }
    function g(S) {
        const w = bo()
          , T = document.createElement("div");
        T.textContent = w.prefix,
        So(T);
        const _ = m()
          , z = document.createElement("div");
        z.textContent = w.suffix,
        So(z, "12px"),
        S.append(T, _, z, d(!0))
    }
    function p(S, w) {
        const T = document.createElement("div");
        return T.textContent = S,
        So(T),
        w && Yt(T, w),
        T
    }
    function b(S) {
        const {prefix: w, suffix: T} = bo()
          , [_,z] = T.startsWith(".") ? [".", T.slice(1).trim()] : ["", T]
          , G = document.createElement("div");
        _s(G),
        G.style.marginBottom = "4px",
        G.append(p(w, {
            marginRight: "6px"
        }), m(), ..._ ? [p(_)] : []),
        S.append(G, p(z, {
            textAlign: "center",
            marginBottom: "12px"
        }), d(!1))
    }
    function x() {
        const S = vx()
          , w = document.createElement("div");
        return w.id = "watermark",
        Yt(w, {
            zIndex: Je.zIndex,
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: S ? "fit-content" : "calc(100% - 32px)",
            maxWidth: S ? "none" : "100%",
            backgroundColor: Je.colors.white,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: S ? "999px" : "36px",
            borderColor: Je.colors.border,
            padding: S ? "12px 20px" : "16px",
            boxShadow: Je.shadow,
            cursor: "pointer"
        }),
        _s(w, S ? "row" : "column"),
        w.appendChild(f()),
        S ? g(w) : b(w),
        w.addEventListener("click", T => {
            T.target.closest("#generate-button, #close-button") || c("watermark_create_button_click")
        }
        ),
        w
    }
    function E(S) {
        const w = document.getElementById("watermark");
        !w && !S ? (document.body.appendChild(x()),
        o(),
        Sx()) : S && w && w.remove()
    }
    r(a).then(E)
}
Ex();
const ae = s => typeof s == "string"
  , Va = () => {
    let s, a;
    const r = new Promise( (o, c) => {
        s = o,
        a = c
    }
    );
    return r.resolve = s,
    r.reject = a,
    r
}
  , Cm = s => s == null ? "" : "" + s
  , wx = (s, a, r) => {
    s.forEach(o => {
        a[o] && (r[o] = a[o])
    }
    )
}
  , _x = /###/g
  , Tm = s => s && s.indexOf("###") > -1 ? s.replace(_x, ".") : s
  , Om = s => !s || ae(s)
  , Ja = (s, a, r) => {
    const o = ae(a) ? a.split(".") : a;
    let c = 0;
    for (; c < o.length - 1; ) {
        if (Om(s))
            return {};
        const f = Tm(o[c]);
        !s[f] && r && (s[f] = new r),
        Object.prototype.hasOwnProperty.call(s, f) ? s = s[f] : s = {},
        ++c
    }
    return Om(s) ? {} : {
        obj: s,
        k: Tm(o[c])
    }
}
  , Rm = (s, a, r) => {
    const {obj: o, k: c} = Ja(s, a, Object);
    if (o !== void 0 || a.length === 1) {
        o[c] = r;
        return
    }
    let f = a[a.length - 1]
      , d = a.slice(0, a.length - 1)
      , m = Ja(s, d, Object);
    for (; m.obj === void 0 && d.length; )
        f = `${d[d.length - 1]}.${f}`,
        d = d.slice(0, d.length - 1),
        m = Ja(s, d, Object),
        m?.obj && typeof m.obj[`${m.k}.${f}`] < "u" && (m.obj = void 0);
    m.obj[`${m.k}.${f}`] = r
}
  , Nx = (s, a, r, o) => {
    const {obj: c, k: f} = Ja(s, a, Object);
    c[f] = c[f] || [],
    c[f].push(r)
}
  , Rs = (s, a) => {
    const {obj: r, k: o} = Ja(s, a);
    if (r && Object.prototype.hasOwnProperty.call(r, o))
        return r[o]
}
  , jx = (s, a, r) => {
    const o = Rs(s, r);
    return o !== void 0 ? o : Rs(a, r)
}
  , bg = (s, a, r) => {
    for (const o in a)
        o !== "__proto__" && o !== "constructor" && (o in s ? ae(s[o]) || s[o]instanceof String || ae(a[o]) || a[o]instanceof String ? r && (s[o] = a[o]) : bg(s[o], a[o], r) : s[o] = a[o]);
    return s
}
  , Yl = s => s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var Cx = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
const Tx = s => ae(s) ? s.replace(/[&<>"'\/]/g, a => Cx[a]) : s;
class Ox {
    constructor(a) {
        this.capacity = a,
        this.regExpMap = new Map,
        this.regExpQueue = []
    }
    getRegExp(a) {
        const r = this.regExpMap.get(a);
        if (r !== void 0)
            return r;
        const o = new RegExp(a);
        return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()),
        this.regExpMap.set(a, o),
        this.regExpQueue.push(a),
        o
    }
}
const Rx = [" ", ",", "?", "!", ";"]
  , Ax = new Ox(20)
  , Mx = (s, a, r) => {
    a = a || "",
    r = r || "";
    const o = Rx.filter(d => a.indexOf(d) < 0 && r.indexOf(d) < 0);
    if (o.length === 0)
        return !0;
    const c = Ax.getRegExp(`(${o.map(d => d === "?" ? "\\?" : d).join("|")})`);
    let f = !c.test(s);
    if (!f) {
        const d = s.indexOf(r);
        d > 0 && !c.test(s.substring(0, d)) && (f = !0)
    }
    return f
}
  , Mo = (s, a, r=".") => {
    if (!s)
        return;
    if (s[a])
        return Object.prototype.hasOwnProperty.call(s, a) ? s[a] : void 0;
    const o = a.split(r);
    let c = s;
    for (let f = 0; f < o.length; ) {
        if (!c || typeof c != "object")
            return;
        let d, m = "";
        for (let g = f; g < o.length; ++g)
            if (g !== f && (m += r),
            m += o[g],
            d = c[m],
            d !== void 0) {
                if (["string", "number", "boolean"].indexOf(typeof d) > -1 && g < o.length - 1)
                    continue;
                f += g - f + 1;
                break
            }
        c = d
    }
    return c
}
  , $a = s => s?.replace("_", "-")
  , zx = {
    type: "logger",
    log(s) {
        this.output("log", s)
    },
    warn(s) {
        this.output("warn", s)
    },
    error(s) {
        this.output("error", s)
    },
    output(s, a) {
        console?.[s]?.apply?.(console, a)
    }
};
class As {
    constructor(a, r={}) {
        this.init(a, r)
    }
    init(a, r={}) {
        this.prefix = r.prefix || "i18next:",
        this.logger = a || zx,
        this.options = r,
        this.debug = r.debug
    }
    log(...a) {
        return this.forward(a, "log", "", !0)
    }
    warn(...a) {
        return this.forward(a, "warn", "", !0)
    }
    error(...a) {
        return this.forward(a, "error", "")
    }
    deprecate(...a) {
        return this.forward(a, "warn", "WARNING DEPRECATED: ", !0)
    }
    forward(a, r, o, c) {
        return c && !this.debug ? null : (ae(a[0]) && (a[0] = `${o}${this.prefix} ${a[0]}`),
        this.logger[r](a))
    }
    create(a) {
        return new As(this.logger,{
            prefix: `${this.prefix}:${a}:`,
            ...this.options
        })
    }
    clone(a) {
        return a = a || this.options,
        a.prefix = a.prefix || this.prefix,
        new As(this.logger,a)
    }
}
var Vt = new As;
class Ds {
    constructor() {
        this.observers = {}
    }
    on(a, r) {
        return a.split(" ").forEach(o => {
            this.observers[o] || (this.observers[o] = new Map);
            const c = this.observers[o].get(r) || 0;
            this.observers[o].set(r, c + 1)
        }
        ),
        this
    }
    off(a, r) {
        if (this.observers[a]) {
            if (!r) {
                delete this.observers[a];
                return
            }
            this.observers[a].delete(r)
        }
    }
    emit(a, ...r) {
        this.observers[a] && Array.from(this.observers[a].entries()).forEach( ([c,f]) => {
            for (let d = 0; d < f; d++)
                c(...r)
        }
        ),
        this.observers["*"] && Array.from(this.observers["*"].entries()).forEach( ([c,f]) => {
            for (let d = 0; d < f; d++)
                c.apply(c, [a, ...r])
        }
        )
    }
}
class Am extends Ds {
    constructor(a, r={
        ns: ["translation"],
        defaultNS: "translation"
    }) {
        super(),
        this.data = a || {},
        this.options = r,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0)
    }
    addNamespaces(a) {
        this.options.ns.indexOf(a) < 0 && this.options.ns.push(a)
    }
    removeNamespaces(a) {
        const r = this.options.ns.indexOf(a);
        r > -1 && this.options.ns.splice(r, 1)
    }
    getResource(a, r, o, c={}) {
        const f = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator
          , d = c.ignoreJSONStructure !== void 0 ? c.ignoreJSONStructure : this.options.ignoreJSONStructure;
        let m;
        a.indexOf(".") > -1 ? m = a.split(".") : (m = [a, r],
        o && (Array.isArray(o) ? m.push(...o) : ae(o) && f ? m.push(...o.split(f)) : m.push(o)));
        const g = Rs(this.data, m);
        return !g && !r && !o && a.indexOf(".") > -1 && (a = m[0],
        r = m[1],
        o = m.slice(2).join(".")),
        g || !d || !ae(o) ? g : Mo(this.data?.[a]?.[r], o, f)
    }
    addResource(a, r, o, c, f={
        silent: !1
    }) {
        const d = f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator;
        let m = [a, r];
        o && (m = m.concat(d ? o.split(d) : o)),
        a.indexOf(".") > -1 && (m = a.split("."),
        c = r,
        r = m[1]),
        this.addNamespaces(r),
        Rm(this.data, m, c),
        f.silent || this.emit("added", a, r, o, c)
    }
    addResources(a, r, o, c={
        silent: !1
    }) {
        for (const f in o)
            (ae(o[f]) || Array.isArray(o[f])) && this.addResource(a, r, f, o[f], {
                silent: !0
            });
        c.silent || this.emit("added", a, r, o)
    }
    addResourceBundle(a, r, o, c, f, d={
        silent: !1,
        skipCopy: !1
    }) {
        let m = [a, r];
        a.indexOf(".") > -1 && (m = a.split("."),
        c = o,
        o = r,
        r = m[1]),
        this.addNamespaces(r);
        let g = Rs(this.data, m) || {};
        d.skipCopy || (o = JSON.parse(JSON.stringify(o))),
        c ? bg(g, o, f) : g = {
            ...g,
            ...o
        },
        Rm(this.data, m, g),
        d.silent || this.emit("added", a, r, o)
    }
    removeResourceBundle(a, r) {
        this.hasResourceBundle(a, r) && delete this.data[a][r],
        this.removeNamespaces(r),
        this.emit("removed", a, r)
    }
    hasResourceBundle(a, r) {
        return this.getResource(a, r) !== void 0
    }
    getResourceBundle(a, r) {
        return r || (r = this.options.defaultNS),
        this.getResource(a, r)
    }
    getDataByLanguage(a) {
        return this.data[a]
    }
    hasLanguageSomeTranslations(a) {
        const r = this.getDataByLanguage(a);
        return !!(r && Object.keys(r) || []).find(c => r[c] && Object.keys(r[c]).length > 0)
    }
    toJSON() {
        return this.data
    }
}
var Sg = {
    processors: {},
    addPostProcessor(s) {
        this.processors[s.name] = s
    },
    handle(s, a, r, o, c) {
        return s.forEach(f => {
            a = this.processors[f]?.process(a, r, o, c) ?? a
        }
        ),
        a
    }
};
const Eg = Symbol("i18next/PATH_KEY");
function Lx() {
    const s = []
      , a = Object.create(null);
    let r;
    return a.get = (o, c) => (r?.revoke?.(),
    c === Eg ? s : (s.push(c),
    r = Proxy.revocable(o, a),
    r.proxy)),
    Proxy.revocable(Object.create(null), a).proxy
}
function zo(s, a) {
    const {[Eg]: r} = s(Lx());
    return r.join(a?.keySeparator ?? ".")
}
const Mm = {}
  , zm = s => !ae(s) && typeof s != "boolean" && typeof s != "number";
class Ms extends Ds {
    constructor(a, r={}) {
        super(),
        wx(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], a, this),
        this.options = r,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.logger = Vt.create("translator")
    }
    changeLanguage(a) {
        a && (this.language = a)
    }
    exists(a, r={
        interpolation: {}
    }) {
        const o = {
            ...r
        };
        return a == null ? !1 : this.resolve(a, o)?.res !== void 0
    }
    extractFromKey(a, r) {
        let o = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
        o === void 0 && (o = ":");
        const c = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
        let f = r.ns || this.options.defaultNS || [];
        const d = o && a.indexOf(o) > -1
          , m = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !Mx(a, o, c);
        if (d && !m) {
            const g = a.match(this.interpolator.nestingRegexp);
            if (g && g.length > 0)
                return {
                    key: a,
                    namespaces: ae(f) ? [f] : f
                };
            const p = a.split(o);
            (o !== c || o === c && this.options.ns.indexOf(p[0]) > -1) && (f = p.shift()),
            a = p.join(c)
        }
        return {
            key: a,
            namespaces: ae(f) ? [f] : f
        }
    }
    translate(a, r, o) {
        let c = typeof r == "object" ? {
            ...r
        } : r;
        if (typeof c != "object" && this.options.overloadTranslationOptionHandler && (c = this.options.overloadTranslationOptionHandler(arguments)),
        typeof options == "object" && (c = {
            ...c
        }),
        c || (c = {}),
        a == null)
            return "";
        typeof a == "function" && (a = zo(a, c)),
        Array.isArray(a) || (a = [String(a)]);
        const f = c.returnDetails !== void 0 ? c.returnDetails : this.options.returnDetails
          , d = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator
          , {key: m, namespaces: g} = this.extractFromKey(a[a.length - 1], c)
          , p = g[g.length - 1];
        let b = c.nsSeparator !== void 0 ? c.nsSeparator : this.options.nsSeparator;
        b === void 0 && (b = ":");
        const x = c.lng || this.language
          , E = c.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
        if (x?.toLowerCase() === "cimode")
            return E ? f ? {
                res: `${p}${b}${m}`,
                usedKey: m,
                exactUsedKey: m,
                usedLng: x,
                usedNS: p,
                usedParams: this.getUsedParamsDetails(c)
            } : `${p}${b}${m}` : f ? {
                res: m,
                usedKey: m,
                exactUsedKey: m,
                usedLng: x,
                usedNS: p,
                usedParams: this.getUsedParamsDetails(c)
            } : m;
        const S = this.resolve(a, c);
        let w = S?.res;
        const T = S?.usedKey || m
          , _ = S?.exactUsedKey || m
          , z = ["[object Number]", "[object Function]", "[object RegExp]"]
          , G = c.joinArrays !== void 0 ? c.joinArrays : this.options.joinArrays
          , V = !this.i18nFormat || this.i18nFormat.handleAsObject
          , J = c.count !== void 0 && !ae(c.count)
          , W = Ms.hasDefaultValue(c)
          , ue = J ? this.pluralResolver.getSuffix(x, c.count, c) : ""
          , P = c.ordinal && J ? this.pluralResolver.getSuffix(x, c.count, {
            ordinal: !1
        }) : ""
          , ye = J && !c.ordinal && c.count === 0
          , Ne = ye && c[`defaultValue${this.options.pluralSeparator}zero`] || c[`defaultValue${ue}`] || c[`defaultValue${P}`] || c.defaultValue;
        let Q = w;
        V && !w && W && (Q = Ne);
        const k = zm(Q)
          , K = Object.prototype.toString.apply(Q);
        if (V && Q && k && z.indexOf(K) < 0 && !(ae(G) && Array.isArray(Q))) {
            if (!c.returnObjects && !this.options.returnObjects) {
                this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                const ne = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(T, Q, {
                    ...c,
                    ns: g
                }) : `key '${m} (${this.language})' returned an object instead of string.`;
                return f ? (S.res = ne,
                S.usedParams = this.getUsedParamsDetails(c),
                S) : ne
            }
            if (d) {
                const ne = Array.isArray(Q)
                  , oe = ne ? [] : {}
                  , fe = ne ? _ : T;
                for (const D in Q)
                    if (Object.prototype.hasOwnProperty.call(Q, D)) {
                        const X = `${fe}${d}${D}`;
                        W && !w ? oe[D] = this.translate(X, {
                            ...c,
                            defaultValue: zm(Ne) ? Ne[D] : void 0,
                            joinArrays: !1,
                            ns: g
                        }) : oe[D] = this.translate(X, {
                            ...c,
                            joinArrays: !1,
                            ns: g
                        }),
                        oe[D] === X && (oe[D] = Q[D])
                    }
                w = oe
            }
        } else if (V && ae(G) && Array.isArray(w))
            w = w.join(G),
            w && (w = this.extendTranslation(w, a, c, o));
        else {
            let ne = !1
              , oe = !1;
            !this.isValidLookup(w) && W && (ne = !0,
            w = Ne),
            this.isValidLookup(w) || (oe = !0,
            w = m);
            const D = (c.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && oe ? void 0 : w
              , X = W && Ne !== w && this.options.updateMissing;
            if (oe || ne || X) {
                if (this.logger.log(X ? "updateKey" : "missingKey", x, p, m, X ? Ne : w),
                d) {
                    const j = this.resolve(m, {
                        ...c,
                        keySeparator: !1
                    });
                    j && j.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                }
                let te = [];
                const ve = this.languageUtils.getFallbackCodes(this.options.fallbackLng, c.lng || this.language);
                if (this.options.saveMissingTo === "fallback" && ve && ve[0])
                    for (let j = 0; j < ve.length; j++)
                        te.push(ve[j]);
                else
                    this.options.saveMissingTo === "all" ? te = this.languageUtils.toResolveHierarchy(c.lng || this.language) : te.push(c.lng || this.language);
                const we = (j, q, Z) => {
                    const $ = W && Z !== w ? Z : D;
                    this.options.missingKeyHandler ? this.options.missingKeyHandler(j, p, q, $, X, c) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(j, p, q, $, X, c),
                    this.emit("missingKey", j, p, q, w)
                }
                ;
                this.options.saveMissing && (this.options.saveMissingPlurals && J ? te.forEach(j => {
                    const q = this.pluralResolver.getSuffixes(j, c);
                    ye && c[`defaultValue${this.options.pluralSeparator}zero`] && q.indexOf(`${this.options.pluralSeparator}zero`) < 0 && q.push(`${this.options.pluralSeparator}zero`),
                    q.forEach(Z => {
                        we([j], m + Z, c[`defaultValue${Z}`] || Ne)
                    }
                    )
                }
                ) : we(te, m, Ne))
            }
            w = this.extendTranslation(w, a, c, S, o),
            oe && w === m && this.options.appendNamespaceToMissingKey && (w = `${p}${b}${m}`),
            (oe || ne) && this.options.parseMissingKeyHandler && (w = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${p}${b}${m}` : m, ne ? w : void 0, c))
        }
        return f ? (S.res = w,
        S.usedParams = this.getUsedParamsDetails(c),
        S) : w
    }
    extendTranslation(a, r, o, c, f) {
        if (this.i18nFormat?.parse)
            a = this.i18nFormat.parse(a, {
                ...this.options.interpolation.defaultVariables,
                ...o
            }, o.lng || this.language || c.usedLng, c.usedNS, c.usedKey, {
                resolved: c
            });
        else if (!o.skipInterpolation) {
            o.interpolation && this.interpolator.init({
                ...o,
                interpolation: {
                    ...this.options.interpolation,
                    ...o.interpolation
                }
            });
            const g = ae(a) && (o?.interpolation?.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            let p;
            if (g) {
                const x = a.match(this.interpolator.nestingRegexp);
                p = x && x.length
            }
            let b = o.replace && !ae(o.replace) ? o.replace : o;
            if (this.options.interpolation.defaultVariables && (b = {
                ...this.options.interpolation.defaultVariables,
                ...b
            }),
            a = this.interpolator.interpolate(a, b, o.lng || this.language || c.usedLng, o),
            g) {
                const x = a.match(this.interpolator.nestingRegexp)
                  , E = x && x.length;
                p < E && (o.nest = !1)
            }
            !o.lng && c && c.res && (o.lng = this.language || c.usedLng),
            o.nest !== !1 && (a = this.interpolator.nest(a, (...x) => f?.[0] === x[0] && !o.context ? (this.logger.warn(`It seems you are nesting recursively key: ${x[0]} in key: ${r[0]}`),
            null) : this.translate(...x, r), o)),
            o.interpolation && this.interpolator.reset()
        }
        const d = o.postProcess || this.options.postProcess
          , m = ae(d) ? [d] : d;
        return a != null && m?.length && o.applyPostProcessor !== !1 && (a = Sg.handle(m, a, r, this.options && this.options.postProcessPassResolved ? {
            i18nResolved: {
                ...c,
                usedParams: this.getUsedParamsDetails(o)
            },
            ...o
        } : o, this)),
        a
    }
    resolve(a, r={}) {
        let o, c, f, d, m;
        return ae(a) && (a = [a]),
        a.forEach(g => {
            if (this.isValidLookup(o))
                return;
            const p = this.extractFromKey(g, r)
              , b = p.key;
            c = b;
            let x = p.namespaces;
            this.options.fallbackNS && (x = x.concat(this.options.fallbackNS));
            const E = r.count !== void 0 && !ae(r.count)
              , S = E && !r.ordinal && r.count === 0
              , w = r.context !== void 0 && (ae(r.context) || typeof r.context == "number") && r.context !== ""
              , T = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
            x.forEach(_ => {
                this.isValidLookup(o) || (m = _,
                !Mm[`${T[0]}-${_}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(m) && (Mm[`${T[0]}-${_}`] = !0,
                this.logger.warn(`key "${c}" for languages "${T.join(", ")}" won't get resolved as namespace "${m}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                T.forEach(z => {
                    if (this.isValidLookup(o))
                        return;
                    d = z;
                    const G = [b];
                    if (this.i18nFormat?.addLookupKeys)
                        this.i18nFormat.addLookupKeys(G, b, z, _, r);
                    else {
                        let J;
                        E && (J = this.pluralResolver.getSuffix(z, r.count, r));
                        const W = `${this.options.pluralSeparator}zero`
                          , ue = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                        if (E && (r.ordinal && J.indexOf(ue) === 0 && G.push(b + J.replace(ue, this.options.pluralSeparator)),
                        G.push(b + J),
                        S && G.push(b + W)),
                        w) {
                            const P = `${b}${this.options.contextSeparator || "_"}${r.context}`;
                            G.push(P),
                            E && (r.ordinal && J.indexOf(ue) === 0 && G.push(P + J.replace(ue, this.options.pluralSeparator)),
                            G.push(P + J),
                            S && G.push(P + W))
                        }
                    }
                    let V;
                    for (; V = G.pop(); )
                        this.isValidLookup(o) || (f = V,
                        o = this.getResource(z, _, V, r))
                }
                ))
            }
            )
        }
        ),
        {
            res: o,
            usedKey: c,
            exactUsedKey: f,
            usedLng: d,
            usedNS: m
        }
    }
    isValidLookup(a) {
        return a !== void 0 && !(!this.options.returnNull && a === null) && !(!this.options.returnEmptyString && a === "")
    }
    getResource(a, r, o, c={}) {
        return this.i18nFormat?.getResource ? this.i18nFormat.getResource(a, r, o, c) : this.resourceStore.getResource(a, r, o, c)
    }
    getUsedParamsDetails(a={}) {
        const r = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"]
          , o = a.replace && !ae(a.replace);
        let c = o ? a.replace : a;
        if (o && typeof a.count < "u" && (c.count = a.count),
        this.options.interpolation.defaultVariables && (c = {
            ...this.options.interpolation.defaultVariables,
            ...c
        }),
        !o) {
            c = {
                ...c
            };
            for (const f of r)
                delete c[f]
        }
        return c
    }
    static hasDefaultValue(a) {
        const r = "defaultValue";
        for (const o in a)
            if (Object.prototype.hasOwnProperty.call(a, o) && r === o.substring(0, r.length) && a[o] !== void 0)
                return !0;
        return !1
    }
}
class Lm {
    constructor(a) {
        this.options = a,
        this.supportedLngs = this.options.supportedLngs || !1,
        this.logger = Vt.create("languageUtils")
    }
    getScriptPartFromCode(a) {
        if (a = $a(a),
        !a || a.indexOf("-") < 0)
            return null;
        const r = a.split("-");
        return r.length === 2 || (r.pop(),
        r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"))
    }
    getLanguagePartFromCode(a) {
        if (a = $a(a),
        !a || a.indexOf("-") < 0)
            return a;
        const r = a.split("-");
        return this.formatLanguageCode(r[0])
    }
    formatLanguageCode(a) {
        if (ae(a) && a.indexOf("-") > -1) {
            let r;
            try {
                r = Intl.getCanonicalLocales(a)[0]
            } catch {}
            return r && this.options.lowerCaseLng && (r = r.toLowerCase()),
            r || (this.options.lowerCaseLng ? a.toLowerCase() : a)
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? a.toLowerCase() : a
    }
    isSupportedCode(a) {
        return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (a = this.getLanguagePartFromCode(a)),
        !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(a) > -1
    }
    getBestMatchFromCodes(a) {
        if (!a)
            return null;
        let r;
        return a.forEach(o => {
            if (r)
                return;
            const c = this.formatLanguageCode(o);
            (!this.options.supportedLngs || this.isSupportedCode(c)) && (r = c)
        }
        ),
        !r && this.options.supportedLngs && a.forEach(o => {
            if (r)
                return;
            const c = this.getScriptPartFromCode(o);
            if (this.isSupportedCode(c))
                return r = c;
            const f = this.getLanguagePartFromCode(o);
            if (this.isSupportedCode(f))
                return r = f;
            r = this.options.supportedLngs.find(d => {
                if (d === f)
                    return d;
                if (!(d.indexOf("-") < 0 && f.indexOf("-") < 0) && (d.indexOf("-") > 0 && f.indexOf("-") < 0 && d.substring(0, d.indexOf("-")) === f || d.indexOf(f) === 0 && f.length > 1))
                    return d
            }
            )
        }
        ),
        r || (r = this.getFallbackCodes(this.options.fallbackLng)[0]),
        r
    }
    getFallbackCodes(a, r) {
        if (!a)
            return [];
        if (typeof a == "function" && (a = a(r)),
        ae(a) && (a = [a]),
        Array.isArray(a))
            return a;
        if (!r)
            return a.default || [];
        let o = a[r];
        return o || (o = a[this.getScriptPartFromCode(r)]),
        o || (o = a[this.formatLanguageCode(r)]),
        o || (o = a[this.getLanguagePartFromCode(r)]),
        o || (o = a.default),
        o || []
    }
    toResolveHierarchy(a, r) {
        const o = this.getFallbackCodes((r === !1 ? [] : r) || this.options.fallbackLng || [], a)
          , c = []
          , f = d => {
            d && (this.isSupportedCode(d) ? c.push(d) : this.logger.warn(`rejecting language code not found in supportedLngs: ${d}`))
        }
        ;
        return ae(a) && (a.indexOf("-") > -1 || a.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && f(this.formatLanguageCode(a)),
        this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && f(this.getScriptPartFromCode(a)),
        this.options.load !== "currentOnly" && f(this.getLanguagePartFromCode(a))) : ae(a) && f(this.formatLanguageCode(a)),
        o.forEach(d => {
            c.indexOf(d) < 0 && f(this.formatLanguageCode(d))
        }
        ),
        c
    }
}
const Dm = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
}
  , Um = {
    select: s => s === 1 ? "one" : "other",
    resolvedOptions: () => ({
        pluralCategories: ["one", "other"]
    })
};
class Dx {
    constructor(a, r={}) {
        this.languageUtils = a,
        this.options = r,
        this.logger = Vt.create("pluralResolver"),
        this.pluralRulesCache = {}
    }
    addRule(a, r) {
        this.rules[a] = r
    }
    clearCache() {
        this.pluralRulesCache = {}
    }
    getRule(a, r={}) {
        const o = $a(a === "dev" ? "en" : a)
          , c = r.ordinal ? "ordinal" : "cardinal"
          , f = JSON.stringify({
            cleanedCode: o,
            type: c
        });
        if (f in this.pluralRulesCache)
            return this.pluralRulesCache[f];
        let d;
        try {
            d = new Intl.PluralRules(o,{
                type: c
            })
        } catch {
            if (!Intl)
                return this.logger.error("No Intl support, please use an Intl polyfill!"),
                Um;
            if (!a.match(/-|_/))
                return Um;
            const g = this.languageUtils.getLanguagePartFromCode(a);
            d = this.getRule(g, r)
        }
        return this.pluralRulesCache[f] = d,
        d
    }
    needsPlural(a, r={}) {
        let o = this.getRule(a, r);
        return o || (o = this.getRule("dev", r)),
        o?.resolvedOptions().pluralCategories.length > 1
    }
    getPluralFormsOfKey(a, r, o={}) {
        return this.getSuffixes(a, o).map(c => `${r}${c}`)
    }
    getSuffixes(a, r={}) {
        let o = this.getRule(a, r);
        return o || (o = this.getRule("dev", r)),
        o ? o.resolvedOptions().pluralCategories.sort( (c, f) => Dm[c] - Dm[f]).map(c => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${c}`) : []
    }
    getSuffix(a, r, o={}) {
        const c = this.getRule(a, o);
        return c ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${c.select(r)}` : (this.logger.warn(`no plural rule found for: ${a}`),
        this.getSuffix("dev", r, o))
    }
}
const Hm = (s, a, r, o=".", c=!0) => {
    let f = jx(s, a, r);
    return !f && c && ae(r) && (f = Mo(s, r, o),
    f === void 0 && (f = Mo(a, r, o))),
    f
}
  , Eo = s => s.replace(/\$/g, "$$$$");
class Ux {
    constructor(a={}) {
        this.logger = Vt.create("interpolator"),
        this.options = a,
        this.format = a?.interpolation?.format || (r => r),
        this.init(a)
    }
    init(a={}) {
        a.interpolation || (a.interpolation = {
            escapeValue: !0
        });
        const {escape: r, escapeValue: o, useRawValueToEscape: c, prefix: f, prefixEscaped: d, suffix: m, suffixEscaped: g, formatSeparator: p, unescapeSuffix: b, unescapePrefix: x, nestingPrefix: E, nestingPrefixEscaped: S, nestingSuffix: w, nestingSuffixEscaped: T, nestingOptionsSeparator: _, maxReplaces: z, alwaysFormat: G} = a.interpolation;
        this.escape = r !== void 0 ? r : Tx,
        this.escapeValue = o !== void 0 ? o : !0,
        this.useRawValueToEscape = c !== void 0 ? c : !1,
        this.prefix = f ? Yl(f) : d || "{{",
        this.suffix = m ? Yl(m) : g || "}}",
        this.formatSeparator = p || ",",
        this.unescapePrefix = b ? "" : x || "-",
        this.unescapeSuffix = this.unescapePrefix ? "" : b || "",
        this.nestingPrefix = E ? Yl(E) : S || Yl("$t("),
        this.nestingSuffix = w ? Yl(w) : T || Yl(")"),
        this.nestingOptionsSeparator = _ || ",",
        this.maxReplaces = z || 1e3,
        this.alwaysFormat = G !== void 0 ? G : !1,
        this.resetRegExp()
    }
    reset() {
        this.options && this.init(this.options)
    }
    resetRegExp() {
        const a = (r, o) => r?.source === o ? (r.lastIndex = 0,
        r) : new RegExp(o,"g");
        this.regexp = a(this.regexp, `${this.prefix}(.+?)${this.suffix}`),
        this.regexpUnescape = a(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),
        this.nestingRegexp = a(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)
    }
    interpolate(a, r, o, c) {
        let f, d, m;
        const g = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}
          , p = S => {
            if (S.indexOf(this.formatSeparator) < 0) {
                const z = Hm(r, g, S, this.options.keySeparator, this.options.ignoreJSONStructure);
                return this.alwaysFormat ? this.format(z, void 0, o, {
                    ...c,
                    ...r,
                    interpolationkey: S
                }) : z
            }
            const w = S.split(this.formatSeparator)
              , T = w.shift().trim()
              , _ = w.join(this.formatSeparator).trim();
            return this.format(Hm(r, g, T, this.options.keySeparator, this.options.ignoreJSONStructure), _, o, {
                ...c,
                ...r,
                interpolationkey: T
            })
        }
        ;
        this.resetRegExp();
        const b = c?.missingInterpolationHandler || this.options.missingInterpolationHandler
          , x = c?.interpolation?.skipOnVariables !== void 0 ? c.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        return [{
            regex: this.regexpUnescape,
            safeValue: S => Eo(S)
        }, {
            regex: this.regexp,
            safeValue: S => this.escapeValue ? Eo(this.escape(S)) : Eo(S)
        }].forEach(S => {
            for (m = 0; f = S.regex.exec(a); ) {
                const w = f[1].trim();
                if (d = p(w),
                d === void 0)
                    if (typeof b == "function") {
                        const _ = b(a, f, c);
                        d = ae(_) ? _ : ""
                    } else if (c && Object.prototype.hasOwnProperty.call(c, w))
                        d = "";
                    else if (x) {
                        d = f[0];
                        continue
                    } else
                        this.logger.warn(`missed to pass in variable ${w} for interpolating ${a}`),
                        d = "";
                else
                    !ae(d) && !this.useRawValueToEscape && (d = Cm(d));
                const T = S.safeValue(d);
                if (a = a.replace(f[0], T),
                x ? (S.regex.lastIndex += d.length,
                S.regex.lastIndex -= f[0].length) : S.regex.lastIndex = 0,
                m++,
                m >= this.maxReplaces)
                    break
            }
        }
        ),
        a
    }
    nest(a, r, o={}) {
        let c, f, d;
        const m = (g, p) => {
            const b = this.nestingOptionsSeparator;
            if (g.indexOf(b) < 0)
                return g;
            const x = g.split(new RegExp(`${b}[ ]*{`));
            let E = `{${x[1]}`;
            g = x[0],
            E = this.interpolate(E, d);
            const S = E.match(/'/g)
              , w = E.match(/"/g);
            ((S?.length ?? 0) % 2 === 0 && !w || w.length % 2 !== 0) && (E = E.replace(/'/g, '"'));
            try {
                d = JSON.parse(E),
                p && (d = {
                    ...p,
                    ...d
                })
            } catch (T) {
                return this.logger.warn(`failed parsing options string in nesting for key ${g}`, T),
                `${g}${b}${E}`
            }
            return d.defaultValue && d.defaultValue.indexOf(this.prefix) > -1 && delete d.defaultValue,
            g
        }
        ;
        for (; c = this.nestingRegexp.exec(a); ) {
            let g = [];
            d = {
                ...o
            },
            d = d.replace && !ae(d.replace) ? d.replace : d,
            d.applyPostProcessor = !1,
            delete d.defaultValue;
            const p = /{.*}/.test(c[1]) ? c[1].lastIndexOf("}") + 1 : c[1].indexOf(this.formatSeparator);
            if (p !== -1 && (g = c[1].slice(p).split(this.formatSeparator).map(b => b.trim()).filter(Boolean),
            c[1] = c[1].slice(0, p)),
            f = r(m.call(this, c[1].trim(), d), d),
            f && c[0] === a && !ae(f))
                return f;
            ae(f) || (f = Cm(f)),
            f || (this.logger.warn(`missed to resolve ${c[1]} for nesting ${a}`),
            f = ""),
            g.length && (f = g.reduce( (b, x) => this.format(b, x, o.lng, {
                ...o,
                interpolationkey: c[1].trim()
            }), f.trim())),
            a = a.replace(c[0], f),
            this.regexp.lastIndex = 0
        }
        return a
    }
}
const Hx = s => {
    let a = s.toLowerCase().trim();
    const r = {};
    if (s.indexOf("(") > -1) {
        const o = s.split("(");
        a = o[0].toLowerCase().trim();
        const c = o[1].substring(0, o[1].length - 1);
        a === "currency" && c.indexOf(":") < 0 ? r.currency || (r.currency = c.trim()) : a === "relativetime" && c.indexOf(":") < 0 ? r.range || (r.range = c.trim()) : c.split(";").forEach(d => {
            if (d) {
                const [m,...g] = d.split(":")
                  , p = g.join(":").trim().replace(/^'+|'+$/g, "")
                  , b = m.trim();
                r[b] || (r[b] = p),
                p === "false" && (r[b] = !1),
                p === "true" && (r[b] = !0),
                isNaN(p) || (r[b] = parseInt(p, 10))
            }
        }
        )
    }
    return {
        formatName: a,
        formatOptions: r
    }
}
  , qm = s => {
    const a = {};
    return (r, o, c) => {
        let f = c;
        c && c.interpolationkey && c.formatParams && c.formatParams[c.interpolationkey] && c[c.interpolationkey] && (f = {
            ...f,
            [c.interpolationkey]: void 0
        });
        const d = o + JSON.stringify(f);
        let m = a[d];
        return m || (m = s($a(o), c),
        a[d] = m),
        m(r)
    }
}
  , qx = s => (a, r, o) => s($a(r), o)(a);
class Bx {
    constructor(a={}) {
        this.logger = Vt.create("formatter"),
        this.options = a,
        this.init(a)
    }
    init(a, r={
        interpolation: {}
    }) {
        this.formatSeparator = r.interpolation.formatSeparator || ",";
        const o = r.cacheInBuiltFormats ? qm : qx;
        this.formats = {
            number: o( (c, f) => {
                const d = new Intl.NumberFormat(c,{
                    ...f
                });
                return m => d.format(m)
            }
            ),
            currency: o( (c, f) => {
                const d = new Intl.NumberFormat(c,{
                    ...f,
                    style: "currency"
                });
                return m => d.format(m)
            }
            ),
            datetime: o( (c, f) => {
                const d = new Intl.DateTimeFormat(c,{
                    ...f
                });
                return m => d.format(m)
            }
            ),
            relativetime: o( (c, f) => {
                const d = new Intl.RelativeTimeFormat(c,{
                    ...f
                });
                return m => d.format(m, f.range || "day")
            }
            ),
            list: o( (c, f) => {
                const d = new Intl.ListFormat(c,{
                    ...f
                });
                return m => d.format(m)
            }
            )
        }
    }
    add(a, r) {
        this.formats[a.toLowerCase().trim()] = r
    }
    addCached(a, r) {
        this.formats[a.toLowerCase().trim()] = qm(r)
    }
    format(a, r, o, c={}) {
        const f = r.split(this.formatSeparator);
        if (f.length > 1 && f[0].indexOf("(") > 1 && f[0].indexOf(")") < 0 && f.find(m => m.indexOf(")") > -1)) {
            const m = f.findIndex(g => g.indexOf(")") > -1);
            f[0] = [f[0], ...f.splice(1, m)].join(this.formatSeparator)
        }
        return f.reduce( (m, g) => {
            const {formatName: p, formatOptions: b} = Hx(g);
            if (this.formats[p]) {
                let x = m;
                try {
                    const E = c?.formatParams?.[c.interpolationkey] || {}
                      , S = E.locale || E.lng || c.locale || c.lng || o;
                    x = this.formats[p](m, S, {
                        ...b,
                        ...c,
                        ...E
                    })
                } catch (E) {
                    this.logger.warn(E)
                }
                return x
            } else
                this.logger.warn(`there was no format function for ${p}`);
            return m
        }
        , a)
    }
}
const Gx = (s, a) => {
    s.pending[a] !== void 0 && (delete s.pending[a],
    s.pendingCount--)
}
;
class Yx extends Ds {
    constructor(a, r, o, c={}) {
        super(),
        this.backend = a,
        this.store = r,
        this.services = o,
        this.languageUtils = o.languageUtils,
        this.options = c,
        this.logger = Vt.create("backendConnector"),
        this.waitingReads = [],
        this.maxParallelReads = c.maxParallelReads || 10,
        this.readingCalls = 0,
        this.maxRetries = c.maxRetries >= 0 ? c.maxRetries : 5,
        this.retryTimeout = c.retryTimeout >= 1 ? c.retryTimeout : 350,
        this.state = {},
        this.queue = [],
        this.backend?.init?.(o, c.backend, c)
    }
    queueLoad(a, r, o, c) {
        const f = {}
          , d = {}
          , m = {}
          , g = {};
        return a.forEach(p => {
            let b = !0;
            r.forEach(x => {
                const E = `${p}|${x}`;
                !o.reload && this.store.hasResourceBundle(p, x) ? this.state[E] = 2 : this.state[E] < 0 || (this.state[E] === 1 ? d[E] === void 0 && (d[E] = !0) : (this.state[E] = 1,
                b = !1,
                d[E] === void 0 && (d[E] = !0),
                f[E] === void 0 && (f[E] = !0),
                g[x] === void 0 && (g[x] = !0)))
            }
            ),
            b || (m[p] = !0)
        }
        ),
        (Object.keys(f).length || Object.keys(d).length) && this.queue.push({
            pending: d,
            pendingCount: Object.keys(d).length,
            loaded: {},
            errors: [],
            callback: c
        }),
        {
            toLoad: Object.keys(f),
            pending: Object.keys(d),
            toLoadLanguages: Object.keys(m),
            toLoadNamespaces: Object.keys(g)
        }
    }
    loaded(a, r, o) {
        const c = a.split("|")
          , f = c[0]
          , d = c[1];
        r && this.emit("failedLoading", f, d, r),
        !r && o && this.store.addResourceBundle(f, d, o, void 0, void 0, {
            skipCopy: !0
        }),
        this.state[a] = r ? -1 : 2,
        r && o && (this.state[a] = 0);
        const m = {};
        this.queue.forEach(g => {
            Nx(g.loaded, [f], d),
            Gx(g, a),
            r && g.errors.push(r),
            g.pendingCount === 0 && !g.done && (Object.keys(g.loaded).forEach(p => {
                m[p] || (m[p] = {});
                const b = g.loaded[p];
                b.length && b.forEach(x => {
                    m[p][x] === void 0 && (m[p][x] = !0)
                }
                )
            }
            ),
            g.done = !0,
            g.errors.length ? g.callback(g.errors) : g.callback())
        }
        ),
        this.emit("loaded", m),
        this.queue = this.queue.filter(g => !g.done)
    }
    read(a, r, o, c=0, f=this.retryTimeout, d) {
        if (!a.length)
            return d(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
                lng: a,
                ns: r,
                fcName: o,
                tried: c,
                wait: f,
                callback: d
            });
            return
        }
        this.readingCalls++;
        const m = (p, b) => {
            if (this.readingCalls--,
            this.waitingReads.length > 0) {
                const x = this.waitingReads.shift();
                this.read(x.lng, x.ns, x.fcName, x.tried, x.wait, x.callback)
            }
            if (p && b && c < this.maxRetries) {
                setTimeout( () => {
                    this.read.call(this, a, r, o, c + 1, f * 2, d)
                }
                , f);
                return
            }
            d(p, b)
        }
          , g = this.backend[o].bind(this.backend);
        if (g.length === 2) {
            try {
                const p = g(a, r);
                p && typeof p.then == "function" ? p.then(b => m(null, b)).catch(m) : m(null, p)
            } catch (p) {
                m(p)
            }
            return
        }
        return g(a, r, m)
    }
    prepareLoading(a, r, o={}, c) {
        if (!this.backend)
            return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
            c && c();
        ae(a) && (a = this.languageUtils.toResolveHierarchy(a)),
        ae(r) && (r = [r]);
        const f = this.queueLoad(a, r, o, c);
        if (!f.toLoad.length)
            return f.pending.length || c(),
            null;
        f.toLoad.forEach(d => {
            this.loadOne(d)
        }
        )
    }
    load(a, r, o) {
        this.prepareLoading(a, r, {}, o)
    }
    reload(a, r, o) {
        this.prepareLoading(a, r, {
            reload: !0
        }, o)
    }
    loadOne(a, r="") {
        const o = a.split("|")
          , c = o[0]
          , f = o[1];
        this.read(c, f, "read", void 0, void 0, (d, m) => {
            d && this.logger.warn(`${r}loading namespace ${f} for language ${c} failed`, d),
            !d && m && this.logger.log(`${r}loaded namespace ${f} for language ${c}`, m),
            this.loaded(a, d, m)
        }
        )
    }
    saveMissing(a, r, o, c, f, d={}, m= () => {}
    ) {
        if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(r)) {
            this.logger.warn(`did not save key "${o}" as the namespace "${r}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
            return
        }
        if (!(o == null || o === "")) {
            if (this.backend?.create) {
                const g = {
                    ...d,
                    isUpdate: f
                }
                  , p = this.backend.create.bind(this.backend);
                if (p.length < 6)
                    try {
                        let b;
                        p.length === 5 ? b = p(a, r, o, c, g) : b = p(a, r, o, c),
                        b && typeof b.then == "function" ? b.then(x => m(null, x)).catch(m) : m(null, b)
                    } catch (b) {
                        m(b)
                    }
                else
                    p(a, r, o, c, m, g)
            }
            !a || !a[0] || this.store.addResource(a[0], r, o, c)
        }
    }
}
const Bm = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: s => {
        let a = {};
        if (typeof s[1] == "object" && (a = s[1]),
        ae(s[1]) && (a.defaultValue = s[1]),
        ae(s[2]) && (a.tDescription = s[2]),
        typeof s[2] == "object" || typeof s[3] == "object") {
            const r = s[3] || s[2];
            Object.keys(r).forEach(o => {
                a[o] = r[o]
            }
            )
        }
        return a
    }
    ,
    interpolation: {
        escapeValue: !0,
        format: s => s,
        prefix: "{{",
        suffix: "}}",
        formatSeparator: ",",
        unescapePrefix: "-",
        nestingPrefix: "$t(",
        nestingSuffix: ")",
        nestingOptionsSeparator: ",",
        maxReplaces: 1e3,
        skipOnVariables: !0
    },
    cacheInBuiltFormats: !0
})
  , Gm = s => (ae(s.ns) && (s.ns = [s.ns]),
ae(s.fallbackLng) && (s.fallbackLng = [s.fallbackLng]),
ae(s.fallbackNS) && (s.fallbackNS = [s.fallbackNS]),
s.supportedLngs?.indexOf?.("cimode") < 0 && (s.supportedLngs = s.supportedLngs.concat(["cimode"])),
typeof s.initImmediate == "boolean" && (s.initAsync = s.initImmediate),
s)
  , Ns = () => {}
  , Vx = s => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(s)).forEach(r => {
        typeof s[r] == "function" && (s[r] = s[r].bind(s))
    }
    )
}
;
class Fa extends Ds {
    constructor(a={}, r) {
        if (super(),
        this.options = Gm(a),
        this.services = {},
        this.logger = Vt,
        this.modules = {
            external: []
        },
        Vx(this),
        r && !this.isInitialized && !a.isClone) {
            if (!this.options.initAsync)
                return this.init(a, r),
                this;
            setTimeout( () => {
                this.init(a, r)
            }
            , 0)
        }
    }
    init(a={}, r) {
        this.isInitializing = !0,
        typeof a == "function" && (r = a,
        a = {}),
        a.defaultNS == null && a.ns && (ae(a.ns) ? a.defaultNS = a.ns : a.ns.indexOf("translation") < 0 && (a.defaultNS = a.ns[0]));
        const o = Bm();
        this.options = {
            ...o,
            ...this.options,
            ...Gm(a)
        },
        this.options.interpolation = {
            ...o.interpolation,
            ...this.options.interpolation
        },
        a.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = a.keySeparator),
        a.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = a.nsSeparator);
        const c = p => p ? typeof p == "function" ? new p : p : null;
        if (!this.options.isClone) {
            this.modules.logger ? Vt.init(c(this.modules.logger), this.options) : Vt.init(null, this.options);
            let p;
            this.modules.formatter ? p = this.modules.formatter : p = Bx;
            const b = new Lm(this.options);
            this.store = new Am(this.options.resources,this.options);
            const x = this.services;
            x.logger = Vt,
            x.resourceStore = this.store,
            x.languageUtils = b,
            x.pluralResolver = new Dx(b,{
                prepend: this.options.pluralSeparator,
                simplifyPluralSuffix: this.options.simplifyPluralSuffix
            }),
            this.options.interpolation.format && this.options.interpolation.format !== o.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),
            p && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (x.formatter = c(p),
            x.formatter.init && x.formatter.init(x, this.options),
            this.options.interpolation.format = x.formatter.format.bind(x.formatter)),
            x.interpolator = new Ux(this.options),
            x.utils = {
                hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
            },
            x.backendConnector = new Yx(c(this.modules.backend),x.resourceStore,x,this.options),
            x.backendConnector.on("*", (S, ...w) => {
                this.emit(S, ...w)
            }
            ),
            this.modules.languageDetector && (x.languageDetector = c(this.modules.languageDetector),
            x.languageDetector.init && x.languageDetector.init(x, this.options.detection, this.options)),
            this.modules.i18nFormat && (x.i18nFormat = c(this.modules.i18nFormat),
            x.i18nFormat.init && x.i18nFormat.init(this)),
            this.translator = new Ms(this.services,this.options),
            this.translator.on("*", (S, ...w) => {
                this.emit(S, ...w)
            }
            ),
            this.modules.external.forEach(S => {
                S.init && S.init(this)
            }
            )
        }
        if (this.format = this.options.interpolation.format,
        r || (r = Ns),
        this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            const p = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            p.length > 0 && p[0] !== "dev" && (this.options.lng = p[0])
        }
        !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"),
        ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(p => {
            this[p] = (...b) => this.store[p](...b)
        }
        ),
        ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(p => {
            this[p] = (...b) => (this.store[p](...b),
            this)
        }
        );
        const m = Va()
          , g = () => {
            const p = (b, x) => {
                this.isInitializing = !1,
                this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"),
                this.isInitialized = !0,
                this.options.isClone || this.logger.log("initialized", this.options),
                this.emit("initialized", this.options),
                m.resolve(x),
                r(b, x)
            }
            ;
            if (this.languages && !this.isInitialized)
                return p(null, this.t.bind(this));
            this.changeLanguage(this.options.lng, p)
        }
        ;
        return this.options.resources || !this.options.initAsync ? g() : setTimeout(g, 0),
        m
    }
    loadResources(a, r=Ns) {
        let o = r;
        const c = ae(a) ? a : this.language;
        if (typeof a == "function" && (o = a),
        !this.options.resources || this.options.partialBundledLanguages) {
            if (c?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
                return o();
            const f = []
              , d = m => {
                if (!m || m === "cimode")
                    return;
                this.services.languageUtils.toResolveHierarchy(m).forEach(p => {
                    p !== "cimode" && f.indexOf(p) < 0 && f.push(p)
                }
                )
            }
            ;
            c ? d(c) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(g => d(g)),
            this.options.preload?.forEach?.(m => d(m)),
            this.services.backendConnector.load(f, this.options.ns, m => {
                !m && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language),
                o(m)
            }
            )
        } else
            o(null)
    }
    reloadResources(a, r, o) {
        const c = Va();
        return typeof a == "function" && (o = a,
        a = void 0),
        typeof r == "function" && (o = r,
        r = void 0),
        a || (a = this.languages),
        r || (r = this.options.ns),
        o || (o = Ns),
        this.services.backendConnector.reload(a, r, f => {
            c.resolve(),
            o(f)
        }
        ),
        c
    }
    use(a) {
        if (!a)
            throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
        if (!a.type)
            throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
        return a.type === "backend" && (this.modules.backend = a),
        (a.type === "logger" || a.log && a.warn && a.error) && (this.modules.logger = a),
        a.type === "languageDetector" && (this.modules.languageDetector = a),
        a.type === "i18nFormat" && (this.modules.i18nFormat = a),
        a.type === "postProcessor" && Sg.addPostProcessor(a),
        a.type === "formatter" && (this.modules.formatter = a),
        a.type === "3rdParty" && this.modules.external.push(a),
        this
    }
    setResolvedLanguage(a) {
        if (!(!a || !this.languages) && !(["cimode", "dev"].indexOf(a) > -1)) {
            for (let r = 0; r < this.languages.length; r++) {
                const o = this.languages[r];
                if (!(["cimode", "dev"].indexOf(o) > -1) && this.store.hasLanguageSomeTranslations(o)) {
                    this.resolvedLanguage = o;
                    break
                }
            }
            !this.resolvedLanguage && this.languages.indexOf(a) < 0 && this.store.hasLanguageSomeTranslations(a) && (this.resolvedLanguage = a,
            this.languages.unshift(a))
        }
    }
    changeLanguage(a, r) {
        this.isLanguageChangingTo = a;
        const o = Va();
        this.emit("languageChanging", a);
        const c = m => {
            this.language = m,
            this.languages = this.services.languageUtils.toResolveHierarchy(m),
            this.resolvedLanguage = void 0,
            this.setResolvedLanguage(m)
        }
          , f = (m, g) => {
            g ? this.isLanguageChangingTo === a && (c(g),
            this.translator.changeLanguage(g),
            this.isLanguageChangingTo = void 0,
            this.emit("languageChanged", g),
            this.logger.log("languageChanged", g)) : this.isLanguageChangingTo = void 0,
            o.resolve( (...p) => this.t(...p)),
            r && r(m, (...p) => this.t(...p))
        }
          , d = m => {
            !a && !m && this.services.languageDetector && (m = []);
            const g = ae(m) ? m : m && m[0]
              , p = this.store.hasLanguageSomeTranslations(g) ? g : this.services.languageUtils.getBestMatchFromCodes(ae(m) ? [m] : m);
            p && (this.language || c(p),
            this.translator.language || this.translator.changeLanguage(p),
            this.services.languageDetector?.cacheUserLanguage?.(p)),
            this.loadResources(p, b => {
                f(b, p)
            }
            )
        }
        ;
        return !a && this.services.languageDetector && !this.services.languageDetector.async ? d(this.services.languageDetector.detect()) : !a && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(d) : this.services.languageDetector.detect(d) : d(a),
        o
    }
    getFixedT(a, r, o) {
        const c = (f, d, ...m) => {
            let g;
            typeof d != "object" ? g = this.options.overloadTranslationOptionHandler([f, d].concat(m)) : g = {
                ...d
            },
            g.lng = g.lng || c.lng,
            g.lngs = g.lngs || c.lngs,
            g.ns = g.ns || c.ns,
            g.keyPrefix !== "" && (g.keyPrefix = g.keyPrefix || o || c.keyPrefix);
            const p = this.options.keySeparator || ".";
            let b;
            return g.keyPrefix && Array.isArray(f) ? b = f.map(x => (typeof x == "function" && (x = zo(x, d)),
            `${g.keyPrefix}${p}${x}`)) : (typeof f == "function" && (f = zo(f, d)),
            b = g.keyPrefix ? `${g.keyPrefix}${p}${f}` : f),
            this.t(b, g)
        }
        ;
        return ae(a) ? c.lng = a : c.lngs = a,
        c.ns = r,
        c.keyPrefix = o,
        c
    }
    t(...a) {
        return this.translator?.translate(...a)
    }
    exists(...a) {
        return this.translator?.exists(...a)
    }
    setDefaultNamespace(a) {
        this.options.defaultNS = a
    }
    hasLoadedNamespace(a, r={}) {
        if (!this.isInitialized)
            return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
            !1;
        if (!this.languages || !this.languages.length)
            return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
            !1;
        const o = r.lng || this.resolvedLanguage || this.languages[0]
          , c = this.options ? this.options.fallbackLng : !1
          , f = this.languages[this.languages.length - 1];
        if (o.toLowerCase() === "cimode")
            return !0;
        const d = (m, g) => {
            const p = this.services.backendConnector.state[`${m}|${g}`];
            return p === -1 || p === 0 || p === 2
        }
        ;
        if (r.precheck) {
            const m = r.precheck(this, d);
            if (m !== void 0)
                return m
        }
        return !!(this.hasResourceBundle(o, a) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || d(o, a) && (!c || d(f, a)))
    }
    loadNamespaces(a, r) {
        const o = Va();
        return this.options.ns ? (ae(a) && (a = [a]),
        a.forEach(c => {
            this.options.ns.indexOf(c) < 0 && this.options.ns.push(c)
        }
        ),
        this.loadResources(c => {
            o.resolve(),
            r && r(c)
        }
        ),
        o) : (r && r(),
        Promise.resolve())
    }
    loadLanguages(a, r) {
        const o = Va();
        ae(a) && (a = [a]);
        const c = this.options.preload || []
          , f = a.filter(d => c.indexOf(d) < 0 && this.services.languageUtils.isSupportedCode(d));
        return f.length ? (this.options.preload = c.concat(f),
        this.loadResources(d => {
            o.resolve(),
            r && r(d)
        }
        ),
        o) : (r && r(),
        Promise.resolve())
    }
    dir(a) {
        if (a || (a = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)),
        !a)
            return "rtl";
        try {
            const c = new Intl.Locale(a);
            if (c && c.getTextInfo) {
                const f = c.getTextInfo();
                if (f && f.direction)
                    return f.direction
            }
        } catch {}
        const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"]
          , o = this.services?.languageUtils || new Lm(Bm());
        return a.toLowerCase().indexOf("-latn") > 1 ? "ltr" : r.indexOf(o.getLanguagePartFromCode(a)) > -1 || a.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
    }
    static createInstance(a={}, r) {
        return new Fa(a,r)
    }
    cloneInstance(a={}, r=Ns) {
        const o = a.forkResourceStore;
        o && delete a.forkResourceStore;
        const c = {
            ...this.options,
            ...a,
            isClone: !0
        }
          , f = new Fa(c);
        if ((a.debug !== void 0 || a.prefix !== void 0) && (f.logger = f.logger.clone(a)),
        ["store", "services", "language"].forEach(m => {
            f[m] = this[m]
        }
        ),
        f.services = {
            ...this.services
        },
        f.services.utils = {
            hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
        },
        o) {
            const m = Object.keys(this.store.data).reduce( (g, p) => (g[p] = {
                ...this.store.data[p]
            },
            g[p] = Object.keys(g[p]).reduce( (b, x) => (b[x] = {
                ...g[p][x]
            },
            b), g[p]),
            g), {});
            f.store = new Am(m,c),
            f.services.resourceStore = f.store
        }
        return f.translator = new Ms(f.services,c),
        f.translator.on("*", (m, ...g) => {
            f.emit(m, ...g)
        }
        ),
        f.init(c, r),
        f.translator.options = c,
        f.translator.backendConnector.services.utils = {
            hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
        },
        f
    }
    toJSON() {
        return {
            options: this.options,
            store: this.store,
            language: this.language,
            languages: this.languages,
            resolvedLanguage: this.resolvedLanguage
        }
    }
}
const et = Fa.createInstance();
et.createInstance = Fa.createInstance;
et.createInstance;
et.dir;
et.init;
et.loadResources;
et.reloadResources;
et.use;
et.changeLanguage;
et.getFixedT;
et.t;
et.exists;
et.setDefaultNamespace;
et.hasLoadedNamespace;
et.loadNamespaces;
et.loadLanguages;
const Qx = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g
  , Xx = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/"
}
  , kx = s => Xx[s]
  , Zx = s => s.replace(Qx, kx);
let Ym = {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: !0,
    transWrapTextNodes: "",
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    useSuspense: !0,
    unescape: Zx
};
const Kx = (s={}) => {
    Ym = {
        ...Ym,
        ...s
    }
}
  , Jx = {
    type: "3rdParty",
    init(s) {
        Kx(s.options.react)
    }
}
  , $x = U.createContext();
function Fx({i18n: s, defaultNS: a, children: r}) {
    const o = U.useMemo( () => ({
        i18n: s,
        defaultNS: a
    }), [s, a]);
    return U.createElement($x.Provider, {
        value: o
    }, r)
}
const {slice: Wx, forEach: Px} = [];
function Ix(s) {
    return Px.call(Wx.call(arguments, 1), a => {
        if (a)
            for (const r in a)
                s[r] === void 0 && (s[r] = a[r])
    }
    ),
    s
}
function ev(s) {
    return typeof s != "string" ? !1 : [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i].some(r => r.test(s))
}
const Vm = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
  , tv = function(s, a) {
    const o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        path: "/"
    }
      , c = encodeURIComponent(a);
    let f = `${s}=${c}`;
    if (o.maxAge > 0) {
        const d = o.maxAge - 0;
        if (Number.isNaN(d))
            throw new Error("maxAge should be a Number");
        f += `; Max-Age=${Math.floor(d)}`
    }
    if (o.domain) {
        if (!Vm.test(o.domain))
            throw new TypeError("option domain is invalid");
        f += `; Domain=${o.domain}`
    }
    if (o.path) {
        if (!Vm.test(o.path))
            throw new TypeError("option path is invalid");
        f += `; Path=${o.path}`
    }
    if (o.expires) {
        if (typeof o.expires.toUTCString != "function")
            throw new TypeError("option expires is invalid");
        f += `; Expires=${o.expires.toUTCString()}`
    }
    if (o.httpOnly && (f += "; HttpOnly"),
    o.secure && (f += "; Secure"),
    o.sameSite)
        switch (typeof o.sameSite == "string" ? o.sameSite.toLowerCase() : o.sameSite) {
        case !0:
            f += "; SameSite=Strict";
            break;
        case "lax":
            f += "; SameSite=Lax";
            break;
        case "strict":
            f += "; SameSite=Strict";
            break;
        case "none":
            f += "; SameSite=None";
            break;
        default:
            throw new TypeError("option sameSite is invalid")
        }
    return o.partitioned && (f += "; Partitioned"),
    f
}
  , Qm = {
    create(s, a, r, o) {
        let c = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
            path: "/",
            sameSite: "strict"
        };
        r && (c.expires = new Date,
        c.expires.setTime(c.expires.getTime() + r * 60 * 1e3)),
        o && (c.domain = o),
        document.cookie = tv(s, a, c)
    },
    read(s) {
        const a = `${s}=`
          , r = document.cookie.split(";");
        for (let o = 0; o < r.length; o++) {
            let c = r[o];
            for (; c.charAt(0) === " "; )
                c = c.substring(1, c.length);
            if (c.indexOf(a) === 0)
                return c.substring(a.length, c.length)
        }
        return null
    },
    remove(s, a) {
        this.create(s, "", -1, a)
    }
};
var nv = {
    name: "cookie",
    lookup(s) {
        let {lookupCookie: a} = s;
        if (a && typeof document < "u")
            return Qm.read(a) || void 0
    },
    cacheUserLanguage(s, a) {
        let {lookupCookie: r, cookieMinutes: o, cookieDomain: c, cookieOptions: f} = a;
        r && typeof document < "u" && Qm.create(r, s, o, c, f)
    }
}
  , lv = {
    name: "querystring",
    lookup(s) {
        let {lookupQuerystring: a} = s, r;
        if (typeof window < "u") {
            let {search: o} = window.location;
            !window.location.search && window.location.hash?.indexOf("?") > -1 && (o = window.location.hash.substring(window.location.hash.indexOf("?")));
            const f = o.substring(1).split("&");
            for (let d = 0; d < f.length; d++) {
                const m = f[d].indexOf("=");
                m > 0 && f[d].substring(0, m) === a && (r = f[d].substring(m + 1))
            }
        }
        return r
    }
}
  , av = {
    name: "hash",
    lookup(s) {
        let {lookupHash: a, lookupFromHashIndex: r} = s, o;
        if (typeof window < "u") {
            const {hash: c} = window.location;
            if (c && c.length > 2) {
                const f = c.substring(1);
                if (a) {
                    const d = f.split("&");
                    for (let m = 0; m < d.length; m++) {
                        const g = d[m].indexOf("=");
                        g > 0 && d[m].substring(0, g) === a && (o = d[m].substring(g + 1))
                    }
                }
                if (o)
                    return o;
                if (!o && r > -1) {
                    const d = c.match(/\/([a-zA-Z-]*)/g);
                    return Array.isArray(d) ? d[typeof r == "number" ? r : 0]?.replace("/", "") : void 0
                }
            }
        }
        return o
    }
};
let Vl = null;
const Xm = () => {
    if (Vl !== null)
        return Vl;
    try {
        if (Vl = typeof window < "u" && window.localStorage !== null,
        !Vl)
            return !1;
        const s = "i18next.translate.boo";
        window.localStorage.setItem(s, "foo"),
        window.localStorage.removeItem(s)
    } catch {
        Vl = !1
    }
    return Vl
}
;
var iv = {
    name: "localStorage",
    lookup(s) {
        let {lookupLocalStorage: a} = s;
        if (a && Xm())
            return window.localStorage.getItem(a) || void 0
    },
    cacheUserLanguage(s, a) {
        let {lookupLocalStorage: r} = a;
        r && Xm() && window.localStorage.setItem(r, s)
    }
};
let Ql = null;
const km = () => {
    if (Ql !== null)
        return Ql;
    try {
        if (Ql = typeof window < "u" && window.sessionStorage !== null,
        !Ql)
            return !1;
        const s = "i18next.translate.boo";
        window.sessionStorage.setItem(s, "foo"),
        window.sessionStorage.removeItem(s)
    } catch {
        Ql = !1
    }
    return Ql
}
;
var sv = {
    name: "sessionStorage",
    lookup(s) {
        let {lookupSessionStorage: a} = s;
        if (a && km())
            return window.sessionStorage.getItem(a) || void 0
    },
    cacheUserLanguage(s, a) {
        let {lookupSessionStorage: r} = a;
        r && km() && window.sessionStorage.setItem(r, s)
    }
}
  , rv = {
    name: "navigator",
    lookup(s) {
        const a = [];
        if (typeof navigator < "u") {
            const {languages: r, userLanguage: o, language: c} = navigator;
            if (r)
                for (let f = 0; f < r.length; f++)
                    a.push(r[f]);
            o && a.push(o),
            c && a.push(c)
        }
        return a.length > 0 ? a : void 0
    }
}
  , uv = {
    name: "htmlTag",
    lookup(s) {
        let {htmlTag: a} = s, r;
        const o = a || (typeof document < "u" ? document.documentElement : null);
        return o && typeof o.getAttribute == "function" && (r = o.getAttribute("lang")),
        r
    }
}
  , ov = {
    name: "path",
    lookup(s) {
        let {lookupFromPathIndex: a} = s;
        if (typeof window > "u")
            return;
        const r = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        return Array.isArray(r) ? r[typeof a == "number" ? a : 0]?.replace("/", "") : void 0
    }
}
  , cv = {
    name: "subdomain",
    lookup(s) {
        let {lookupFromSubdomainIndex: a} = s;
        const r = typeof a == "number" ? a + 1 : 1
          , o = typeof window < "u" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
        if (o)
            return o[r]
    }
};
let wg = !1;
try {
    document.cookie,
    wg = !0
} catch {}
const _g = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
wg || _g.splice(1, 1);
const fv = () => ({
    order: _g,
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    convertDetectedLanguage: s => s
});
class Ng {
    constructor(a) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        this.type = "languageDetector",
        this.detectors = {},
        this.init(a, r)
    }
    init() {
        let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
            languageUtils: {}
        }
          , r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
          , o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        this.services = a,
        this.options = Ix(r, this.options || {}, fv()),
        typeof this.options.convertDetectedLanguage == "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1 && (this.options.convertDetectedLanguage = c => c.replace("-", "_")),
        this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
        this.i18nOptions = o,
        this.addDetector(nv),
        this.addDetector(lv),
        this.addDetector(iv),
        this.addDetector(sv),
        this.addDetector(rv),
        this.addDetector(uv),
        this.addDetector(ov),
        this.addDetector(cv),
        this.addDetector(av)
    }
    addDetector(a) {
        return this.detectors[a.name] = a,
        this
    }
    detect() {
        let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order
          , r = [];
        return a.forEach(o => {
            if (this.detectors[o]) {
                let c = this.detectors[o].lookup(this.options);
                c && typeof c == "string" && (c = [c]),
                c && (r = r.concat(c))
            }
        }
        ),
        r = r.filter(o => o != null && !ev(o)).map(o => this.options.convertDetectedLanguage(o)),
        this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes ? r : r.length > 0 ? r[0] : null
    }
    cacheUserLanguage(a) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
        r && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(a) > -1 || r.forEach(o => {
            this.detectors[o] && this.detectors[o].cacheUserLanguage(a, this.options)
        }
        ))
    }
}
Ng.type = "languageDetector";
const Zm = Object.assign({})
  , Ka = {};
Object.keys(Zm).forEach(s => {
    const a = s.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
    if (a) {
        const [,r] = a
          , o = Zm[s];
        Ka[r] || (Ka[r] = {
            translation: {}
        }),
        o.default && (Ka[r].translation = {
            ...Ka[r].translation,
            ...o.default
        })
    }
}
);
et.use(Ng).use(Jx).init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: Ka,
    interpolation: {
        escapeValue: !1
    }
});
var wo = {
    exports: {}
}
  , Qa = {}
  , _o = {
    exports: {}
}
  , No = {};
var Km;
function dv() {
    return Km || (Km = 1,
    (function(s) {
        function a(D, X) {
            var te = D.length;
            D.push(X);
            e: for (; 0 < te; ) {
                var ve = te - 1 >>> 1
                  , we = D[ve];
                if (0 < c(we, X))
                    D[ve] = X,
                    D[te] = we,
                    te = ve;
                else
                    break e
            }
        }
        function r(D) {
            return D.length === 0 ? null : D[0]
        }
        function o(D) {
            if (D.length === 0)
                return null;
            var X = D[0]
              , te = D.pop();
            if (te !== X) {
                D[0] = te;
                e: for (var ve = 0, we = D.length, j = we >>> 1; ve < j; ) {
                    var q = 2 * (ve + 1) - 1
                      , Z = D[q]
                      , $ = q + 1
                      , se = D[$];
                    if (0 > c(Z, te))
                        $ < we && 0 > c(se, Z) ? (D[ve] = se,
                        D[$] = te,
                        ve = $) : (D[ve] = Z,
                        D[q] = te,
                        ve = q);
                    else if ($ < we && 0 > c(se, te))
                        D[ve] = se,
                        D[$] = te,
                        ve = $;
                    else
                        break e
                }
            }
            return X
        }
        function c(D, X) {
            var te = D.sortIndex - X.sortIndex;
            return te !== 0 ? te : D.id - X.id
        }
        if (s.unstable_now = void 0,
        typeof performance == "object" && typeof performance.now == "function") {
            var f = performance;
            s.unstable_now = function() {
                return f.now()
            }
        } else {
            var d = Date
              , m = d.now();
            s.unstable_now = function() {
                return d.now() - m
            }
        }
        var g = []
          , p = []
          , b = 1
          , x = null
          , E = 3
          , S = !1
          , w = !1
          , T = !1
          , _ = !1
          , z = typeof setTimeout == "function" ? setTimeout : null
          , G = typeof clearTimeout == "function" ? clearTimeout : null
          , V = typeof setImmediate < "u" ? setImmediate : null;
        function J(D) {
            for (var X = r(p); X !== null; ) {
                if (X.callback === null)
                    o(p);
                else if (X.startTime <= D)
                    o(p),
                    X.sortIndex = X.expirationTime,
                    a(g, X);
                else
                    break;
                X = r(p)
            }
        }
        function W(D) {
            if (T = !1,
            J(D),
            !w)
                if (r(g) !== null)
                    w = !0,
                    ue || (ue = !0,
                    K());
                else {
                    var X = r(p);
                    X !== null && fe(W, X.startTime - D)
                }
        }
        var ue = !1
          , P = -1
          , ye = 5
          , Ne = -1;
        function Q() {
            return _ ? !0 : !(s.unstable_now() - Ne < ye)
        }
        function k() {
            if (_ = !1,
            ue) {
                var D = s.unstable_now();
                Ne = D;
                var X = !0;
                try {
                    e: {
                        w = !1,
                        T && (T = !1,
                        G(P),
                        P = -1),
                        S = !0;
                        var te = E;
                        try {
                            t: {
                                for (J(D),
                                x = r(g); x !== null && !(x.expirationTime > D && Q()); ) {
                                    var ve = x.callback;
                                    if (typeof ve == "function") {
                                        x.callback = null,
                                        E = x.priorityLevel;
                                        var we = ve(x.expirationTime <= D);
                                        if (D = s.unstable_now(),
                                        typeof we == "function") {
                                            x.callback = we,
                                            J(D),
                                            X = !0;
                                            break t
                                        }
                                        x === r(g) && o(g),
                                        J(D)
                                    } else
                                        o(g);
                                    x = r(g)
                                }
                                if (x !== null)
                                    X = !0;
                                else {
                                    var j = r(p);
                                    j !== null && fe(W, j.startTime - D),
                                    X = !1
                                }
                            }
                            break e
                        } finally {
                            x = null,
                            E = te,
                            S = !1
                        }
                        X = void 0
                    }
                } finally {
                    X ? K() : ue = !1
                }
            }
        }
        var K;
        if (typeof V == "function")
            K = function() {
                V(k)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var ne = new MessageChannel
              , oe = ne.port2;
            ne.port1.onmessage = k,
            K = function() {
                oe.postMessage(null)
            }
        } else
            K = function() {
                z(k, 0)
            }
            ;
        function fe(D, X) {
            P = z(function() {
                D(s.unstable_now())
            }, X)
        }
        s.unstable_IdlePriority = 5,
        s.unstable_ImmediatePriority = 1,
        s.unstable_LowPriority = 4,
        s.unstable_NormalPriority = 3,
        s.unstable_Profiling = null,
        s.unstable_UserBlockingPriority = 2,
        s.unstable_cancelCallback = function(D) {
            D.callback = null
        }
        ,
        s.unstable_forceFrameRate = function(D) {
            0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ye = 0 < D ? Math.floor(1e3 / D) : 5
        }
        ,
        s.unstable_getCurrentPriorityLevel = function() {
            return E
        }
        ,
        s.unstable_next = function(D) {
            switch (E) {
            case 1:
            case 2:
            case 3:
                var X = 3;
                break;
            default:
                X = E
            }
            var te = E;
            E = X;
            try {
                return D()
            } finally {
                E = te
            }
        }
        ,
        s.unstable_requestPaint = function() {
            _ = !0
        }
        ,
        s.unstable_runWithPriority = function(D, X) {
            switch (D) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                D = 3
            }
            var te = E;
            E = D;
            try {
                return X()
            } finally {
                E = te
            }
        }
        ,
        s.unstable_scheduleCallback = function(D, X, te) {
            var ve = s.unstable_now();
            switch (typeof te == "object" && te !== null ? (te = te.delay,
            te = typeof te == "number" && 0 < te ? ve + te : ve) : te = ve,
            D) {
            case 1:
                var we = -1;
                break;
            case 2:
                we = 250;
                break;
            case 5:
                we = 1073741823;
                break;
            case 4:
                we = 1e4;
                break;
            default:
                we = 5e3
            }
            return we = te + we,
            D = {
                id: b++,
                callback: X,
                priorityLevel: D,
                startTime: te,
                expirationTime: we,
                sortIndex: -1
            },
            te > ve ? (D.sortIndex = te,
            a(p, D),
            r(g) === null && D === r(p) && (T ? (G(P),
            P = -1) : T = !0,
            fe(W, te - ve))) : (D.sortIndex = we,
            a(g, D),
            w || S || (w = !0,
            ue || (ue = !0,
            K()))),
            D
        }
        ,
        s.unstable_shouldYield = Q,
        s.unstable_wrapCallback = function(D) {
            var X = E;
            return function() {
                var te = E;
                E = X;
                try {
                    return D.apply(this, arguments)
                } finally {
                    E = te
                }
            }
        }
    }
    )(No)),
    No
}
var Jm;
function hv() {
    return Jm || (Jm = 1,
    _o.exports = dv()),
    _o.exports
}
var jo = {
    exports: {}
}
  , tt = {};
var $m;
function mv() {
    if ($m)
        return tt;
    $m = 1;
    var s = Bo();
    function a(g) {
        var p = "https://react.dev/errors/" + g;
        if (1 < arguments.length) {
            p += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var b = 2; b < arguments.length; b++)
                p += "&args[]=" + encodeURIComponent(arguments[b])
        }
        return "Minified React error #" + g + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function r() {}
    var o = {
        d: {
            f: r,
            r: function() {
                throw Error(a(522))
            },
            D: r,
            C: r,
            L: r,
            m: r,
            X: r,
            S: r,
            M: r
        },
        p: 0,
        findDOMNode: null
    }
      , c = Symbol.for("react.portal");
    function f(g, p, b) {
        var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: c,
            key: x == null ? null : "" + x,
            children: g,
            containerInfo: p,
            implementation: b
        }
    }
    var d = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function m(g, p) {
        if (g === "font")
            return "";
        if (typeof p == "string")
            return p === "use-credentials" ? p : ""
    }
    return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o,
    tt.createPortal = function(g, p) {
        var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
            throw Error(a(299));
        return f(g, p, null, b)
    }
    ,
    tt.flushSync = function(g) {
        var p = d.T
          , b = o.p;
        try {
            if (d.T = null,
            o.p = 2,
            g)
                return g()
        } finally {
            d.T = p,
            o.p = b,
            o.d.f()
        }
    }
    ,
    tt.preconnect = function(g, p) {
        typeof g == "string" && (p ? (p = p.crossOrigin,
        p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null,
        o.d.C(g, p))
    }
    ,
    tt.prefetchDNS = function(g) {
        typeof g == "string" && o.d.D(g)
    }
    ,
    tt.preinit = function(g, p) {
        if (typeof g == "string" && p && typeof p.as == "string") {
            var b = p.as
              , x = m(b, p.crossOrigin)
              , E = typeof p.integrity == "string" ? p.integrity : void 0
              , S = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
            b === "style" ? o.d.S(g, typeof p.precedence == "string" ? p.precedence : void 0, {
                crossOrigin: x,
                integrity: E,
                fetchPriority: S
            }) : b === "script" && o.d.X(g, {
                crossOrigin: x,
                integrity: E,
                fetchPriority: S,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0
            })
        }
    }
    ,
    tt.preinitModule = function(g, p) {
        if (typeof g == "string")
            if (typeof p == "object" && p !== null) {
                if (p.as == null || p.as === "script") {
                    var b = m(p.as, p.crossOrigin);
                    o.d.M(g, {
                        crossOrigin: b,
                        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
                        nonce: typeof p.nonce == "string" ? p.nonce : void 0
                    })
                }
            } else
                p == null && o.d.M(g)
    }
    ,
    tt.preload = function(g, p) {
        if (typeof g == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
            var b = p.as
              , x = m(b, p.crossOrigin);
            o.d.L(g, b, {
                crossOrigin: x,
                integrity: typeof p.integrity == "string" ? p.integrity : void 0,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0,
                type: typeof p.type == "string" ? p.type : void 0,
                fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
                referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
                imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
                imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
                media: typeof p.media == "string" ? p.media : void 0
            })
        }
    }
    ,
    tt.preloadModule = function(g, p) {
        if (typeof g == "string")
            if (p) {
                var b = m(p.as, p.crossOrigin);
                o.d.m(g, {
                    as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
                    crossOrigin: b,
                    integrity: typeof p.integrity == "string" ? p.integrity : void 0
                })
            } else
                o.d.m(g)
    }
    ,
    tt.requestFormReset = function(g) {
        o.d.r(g)
    }
    ,
    tt.unstable_batchedUpdates = function(g, p) {
        return g(p)
    }
    ,
    tt.useFormState = function(g, p, b) {
        return d.H.useFormState(g, p, b)
    }
    ,
    tt.useFormStatus = function() {
        return d.H.useHostTransitionStatus()
    }
    ,
    tt.version = "19.2.4",
    tt
}
var Fm;
function gv() {
    if (Fm)
        return jo.exports;
    Fm = 1;
    function s() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)
            } catch (a) {
                console.error(a)
            }
    }
    return s(),
    jo.exports = mv(),
    jo.exports
}
var Wm;
function pv() {
    if (Wm)
        return Qa;
    Wm = 1;
    var s = hv()
      , a = Bo()
      , r = gv();
    function o(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var n = 2; n < arguments.length; n++)
                t += "&args[]=" + encodeURIComponent(arguments[n])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function c(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function f(e) {
        var t = e
          , n = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                (t.flags & 4098) !== 0 && (n = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? n : null
    }
    function d(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function m(e) {
        if (e.tag === 31) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function g(e) {
        if (f(e) !== e)
            throw Error(o(188))
    }
    function p(e) {
        var t = e.alternate;
        if (!t) {
            if (t = f(e),
            t === null)
                throw Error(o(188));
            return t !== e ? null : e
        }
        for (var n = e, l = t; ; ) {
            var i = n.return;
            if (i === null)
                break;
            var u = i.alternate;
            if (u === null) {
                if (l = i.return,
                l !== null) {
                    n = l;
                    continue
                }
                break
            }
            if (i.child === u.child) {
                for (u = i.child; u; ) {
                    if (u === n)
                        return g(i),
                        e;
                    if (u === l)
                        return g(i),
                        t;
                    u = u.sibling
                }
                throw Error(o(188))
            }
            if (n.return !== l.return)
                n = i,
                l = u;
            else {
                for (var h = !1, v = i.child; v; ) {
                    if (v === n) {
                        h = !0,
                        n = i,
                        l = u;
                        break
                    }
                    if (v === l) {
                        h = !0,
                        l = i,
                        n = u;
                        break
                    }
                    v = v.sibling
                }
                if (!h) {
                    for (v = u.child; v; ) {
                        if (v === n) {
                            h = !0,
                            n = u,
                            l = i;
                            break
                        }
                        if (v === l) {
                            h = !0,
                            l = u,
                            n = i;
                            break
                        }
                        v = v.sibling
                    }
                    if (!h)
                        throw Error(o(189))
                }
            }
            if (n.alternate !== l)
                throw Error(o(190))
        }
        if (n.tag !== 3)
            throw Error(o(188));
        return n.stateNode.current === n ? e : t
    }
    function b(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e;
        for (e = e.child; e !== null; ) {
            if (t = b(e),
            t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var x = Object.assign
      , E = Symbol.for("react.element")
      , S = Symbol.for("react.transitional.element")
      , w = Symbol.for("react.portal")
      , T = Symbol.for("react.fragment")
      , _ = Symbol.for("react.strict_mode")
      , z = Symbol.for("react.profiler")
      , G = Symbol.for("react.consumer")
      , V = Symbol.for("react.context")
      , J = Symbol.for("react.forward_ref")
      , W = Symbol.for("react.suspense")
      , ue = Symbol.for("react.suspense_list")
      , P = Symbol.for("react.memo")
      , ye = Symbol.for("react.lazy")
      , Ne = Symbol.for("react.activity")
      , Q = Symbol.for("react.memo_cache_sentinel")
      , k = Symbol.iterator;
    function K(e) {
        return e === null || typeof e != "object" ? null : (e = k && e[k] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var ne = Symbol.for("react.client.reference");
    function oe(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.$$typeof === ne ? null : e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case T:
            return "Fragment";
        case z:
            return "Profiler";
        case _:
            return "StrictMode";
        case W:
            return "Suspense";
        case ue:
            return "SuspenseList";
        case Ne:
            return "Activity"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case w:
                return "Portal";
            case V:
                return e.displayName || "Context";
            case G:
                return (e._context.displayName || "Context") + ".Consumer";
            case J:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case P:
                return t = e.displayName || null,
                t !== null ? t : oe(e.type) || "Memo";
            case ye:
                t = e._payload,
                e = e._init;
                try {
                    return oe(e(t))
                } catch {}
            }
        return null
    }
    var fe = Array.isArray
      , D = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , te = {
        pending: !1,
        data: null,
        method: null,
        action: null
    }
      , ve = []
      , we = -1;
    function j(e) {
        return {
            current: e
        }
    }
    function q(e) {
        0 > we || (e.current = ve[we],
        ve[we] = null,
        we--)
    }
    function Z(e, t) {
        we++,
        ve[we] = e.current,
        e.current = t
    }
    var $ = j(null)
      , se = j(null)
      , de = j(null)
      , _e = j(null);
    function nt(e, t) {
        switch (Z(de, t),
        Z(se, e),
        Z($, null),
        t.nodeType) {
        case 9:
        case 11:
            e = (e = t.documentElement) && (e = e.namespaceURI) ? xh(e) : 0;
            break;
        default:
            if (e = t.tagName,
            t = t.namespaceURI)
                t = xh(t),
                e = vh(t, e);
            else
                switch (e) {
                case "svg":
                    e = 1;
                    break;
                case "math":
                    e = 2;
                    break;
                default:
                    e = 0
                }
        }
        q($),
        Z($, e)
    }
    function He() {
        q($),
        q(se),
        q(de)
    }
    function Zl(e) {
        e.memoizedState !== null && Z(_e, e);
        var t = $.current
          , n = vh(t, e.type);
        t !== n && (Z(se, e),
        Z($, n))
    }
    function ni(e) {
        se.current === e && (q($),
        q(se)),
        _e.current === e && (q(_e),
        Da._currentValue = te)
    }
    var Bs, Ko;
    function qn(e) {
        if (Bs === void 0)
            try {
                throw Error()
            } catch (n) {
                var t = n.stack.trim().match(/\n( *(at )?)/);
                Bs = t && t[1] || "",
                Ko = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : ""
            }
        return `
` + Bs + e + Ko
    }
    var Gs = !1;
    function Ys(e, t) {
        if (!e || Gs)
            return "";
        Gs = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var l = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var Y = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(Y.prototype, "props", {
                                set: function() {
                                    throw Error()
                                }
                            }),
                            typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(Y, [])
                                } catch (L) {
                                    var M = L
                                }
                                Reflect.construct(e, [], Y)
                            } else {
                                try {
                                    Y.call()
                                } catch (L) {
                                    M = L
                                }
                                e.call(Y.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (L) {
                                M = L
                            }
                            (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {})
                        }
                    } catch (L) {
                        if (L && M && typeof L.stack == "string")
                            return [L.stack, M.stack]
                    }
                    return [null, null]
                }
            };
            l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var i = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
            i && i.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var u = l.DetermineComponentFrameRoot()
              , h = u[0]
              , v = u[1];
            if (h && v) {
                var N = h.split(`
`)
                  , A = v.split(`
`);
                for (i = l = 0; l < N.length && !N[l].includes("DetermineComponentFrameRoot"); )
                    l++;
                for (; i < A.length && !A[i].includes("DetermineComponentFrameRoot"); )
                    i++;
                if (l === N.length || i === A.length)
                    for (l = N.length - 1,
                    i = A.length - 1; 1 <= l && 0 <= i && N[l] !== A[i]; )
                        i--;
                for (; 1 <= l && 0 <= i; l--,
                i--)
                    if (N[l] !== A[i]) {
                        if (l !== 1 || i !== 1)
                            do
                                if (l--,
                                i--,
                                0 > i || N[l] !== A[i]) {
                                    var H = `
` + N[l].replace(" at new ", " at ");
                                    return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)),
                                    H
                                }
                            while (1 <= l && 0 <= i);
                        break
                    }
            }
        } finally {
            Gs = !1,
            Error.prepareStackTrace = n
        }
        return (n = e ? e.displayName || e.name : "") ? qn(n) : ""
    }
    function Jg(e, t) {
        switch (e.tag) {
        case 26:
        case 27:
        case 5:
            return qn(e.type);
        case 16:
            return qn("Lazy");
        case 13:
            return e.child !== t && t !== null ? qn("Suspense Fallback") : qn("Suspense");
        case 19:
            return qn("SuspenseList");
        case 0:
        case 15:
            return Ys(e.type, !1);
        case 11:
            return Ys(e.type.render, !1);
        case 1:
            return Ys(e.type, !0);
        case 31:
            return qn("Activity");
        default:
            return ""
        }
    }
    function Jo(e) {
        try {
            var t = ""
              , n = null;
            do
                t += Jg(e, n),
                n = e,
                e = e.return;
            while (e);
            return t
        } catch (l) {
            return `
Error generating stack: ` + l.message + `
` + l.stack
        }
    }
    var Vs = Object.prototype.hasOwnProperty
      , Qs = s.unstable_scheduleCallback
      , Xs = s.unstable_cancelCallback
      , $g = s.unstable_shouldYield
      , Fg = s.unstable_requestPaint
      , ft = s.unstable_now
      , Wg = s.unstable_getCurrentPriorityLevel
      , $o = s.unstable_ImmediatePriority
      , Fo = s.unstable_UserBlockingPriority
      , li = s.unstable_NormalPriority
      , Pg = s.unstable_LowPriority
      , Wo = s.unstable_IdlePriority
      , Ig = s.log
      , ep = s.unstable_setDisableYieldValue
      , Kl = null
      , dt = null;
    function hn(e) {
        if (typeof Ig == "function" && ep(e),
        dt && typeof dt.setStrictMode == "function")
            try {
                dt.setStrictMode(Kl, e)
            } catch {}
    }
    var ht = Math.clz32 ? Math.clz32 : lp
      , tp = Math.log
      , np = Math.LN2;
    function lp(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (tp(e) / np | 0) | 0
    }
    var ai = 256
      , ii = 262144
      , si = 4194304;
    function Bn(e) {
        var t = e & 42;
        if (t !== 0)
            return t;
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
            return 64;
        case 128:
            return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
            return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return e & 62914560;
        case 67108864:
            return 67108864;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 0;
        default:
            return e
        }
    }
    function ri(e, t, n) {
        var l = e.pendingLanes;
        if (l === 0)
            return 0;
        var i = 0
          , u = e.suspendedLanes
          , h = e.pingedLanes;
        e = e.warmLanes;
        var v = l & 134217727;
        return v !== 0 ? (l = v & ~u,
        l !== 0 ? i = Bn(l) : (h &= v,
        h !== 0 ? i = Bn(h) : n || (n = v & ~e,
        n !== 0 && (i = Bn(n))))) : (v = l & ~u,
        v !== 0 ? i = Bn(v) : h !== 0 ? i = Bn(h) : n || (n = l & ~e,
        n !== 0 && (i = Bn(n)))),
        i === 0 ? 0 : t !== 0 && t !== i && (t & u) === 0 && (u = i & -i,
        n = t & -t,
        u >= n || u === 32 && (n & 4194048) !== 0) ? t : i
    }
    function Jl(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }
    function ap(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
            return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function Po() {
        var e = si;
        return si <<= 1,
        (si & 62914560) === 0 && (si = 4194304),
        e
    }
    function ks(e) {
        for (var t = [], n = 0; 31 > n; n++)
            t.push(e);
        return t
    }
    function $l(e, t) {
        e.pendingLanes |= t,
        t !== 268435456 && (e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0)
    }
    function ip(e, t, n, l, i, u) {
        var h = e.pendingLanes;
        e.pendingLanes = n,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0,
        e.expiredLanes &= n,
        e.entangledLanes &= n,
        e.errorRecoveryDisabledLanes &= n,
        e.shellSuspendCounter = 0;
        var v = e.entanglements
          , N = e.expirationTimes
          , A = e.hiddenUpdates;
        for (n = h & ~n; 0 < n; ) {
            var H = 31 - ht(n)
              , Y = 1 << H;
            v[H] = 0,
            N[H] = -1;
            var M = A[H];
            if (M !== null)
                for (A[H] = null,
                H = 0; H < M.length; H++) {
                    var L = M[H];
                    L !== null && (L.lane &= -536870913)
                }
            n &= ~Y
        }
        l !== 0 && Io(e, l, 0),
        u !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(h & ~t))
    }
    function Io(e, t, n) {
        e.pendingLanes |= t,
        e.suspendedLanes &= ~t;
        var l = 31 - ht(t);
        e.entangledLanes |= t,
        e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930
    }
    function ec(e, t) {
        var n = e.entangledLanes |= t;
        for (e = e.entanglements; n; ) {
            var l = 31 - ht(n)
              , i = 1 << l;
            i & t | e[l] & t && (e[l] |= t),
            n &= ~i
        }
    }
    function tc(e, t) {
        var n = t & -t;
        return n = (n & 42) !== 0 ? 1 : Zs(n),
        (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    }
    function Zs(e) {
        switch (e) {
        case 2:
            e = 1;
            break;
        case 8:
            e = 4;
            break;
        case 32:
            e = 16;
            break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            e = 128;
            break;
        case 268435456:
            e = 134217728;
            break;
        default:
            e = 0
        }
        return e
    }
    function Ks(e) {
        return e &= -e,
        2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }
    function nc() {
        var e = X.p;
        return e !== 0 ? e : (e = window.event,
        e === void 0 ? 32 : Vh(e.type))
    }
    function lc(e, t) {
        var n = X.p;
        try {
            return X.p = e,
            t()
        } finally {
            X.p = n
        }
    }
    var mn = Math.random().toString(36).slice(2)
      , $e = "__reactFiber$" + mn
      , at = "__reactProps$" + mn
      , ll = "__reactContainer$" + mn
      , Js = "__reactEvents$" + mn
      , sp = "__reactListeners$" + mn
      , rp = "__reactHandles$" + mn
      , ac = "__reactResources$" + mn
      , Fl = "__reactMarker$" + mn;
    function $s(e) {
        delete e[$e],
        delete e[at],
        delete e[Js],
        delete e[sp],
        delete e[rp]
    }
    function al(e) {
        var t = e[$e];
        if (t)
            return t;
        for (var n = e.parentNode; n; ) {
            if (t = n[ll] || n[$e]) {
                if (n = t.alternate,
                t.child !== null || n !== null && n.child !== null)
                    for (e = jh(e); e !== null; ) {
                        if (n = e[$e])
                            return n;
                        e = jh(e)
                    }
                return t
            }
            e = n,
            n = e.parentNode
        }
        return null
    }
    function il(e) {
        if (e = e[$e] || e[ll]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
                return e
        }
        return null
    }
    function Wl(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e.stateNode;
        throw Error(o(33))
    }
    function sl(e) {
        var t = e[ac];
        return t || (t = e[ac] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }),
        t
    }
    function Ze(e) {
        e[Fl] = !0
    }
    var ic = new Set
      , sc = {};
    function Gn(e, t) {
        rl(e, t),
        rl(e + "Capture", t)
    }
    function rl(e, t) {
        for (sc[e] = t,
        e = 0; e < t.length; e++)
            ic.add(t[e])
    }
    var up = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$")
      , rc = {}
      , uc = {};
    function op(e) {
        return Vs.call(uc, e) ? !0 : Vs.call(rc, e) ? !1 : up.test(e) ? uc[e] = !0 : (rc[e] = !0,
        !1)
    }
    function ui(e, t, n) {
        if (op(t))
            if (n === null)
                e.removeAttribute(t);
            else {
                switch (typeof n) {
                case "undefined":
                case "function":
                case "symbol":
                    e.removeAttribute(t);
                    return;
                case "boolean":
                    var l = t.toLowerCase().slice(0, 5);
                    if (l !== "data-" && l !== "aria-") {
                        e.removeAttribute(t);
                        return
                    }
                }
                e.setAttribute(t, "" + n)
            }
    }
    function oi(e, t, n) {
        if (n === null)
            e.removeAttribute(t);
        else {
            switch (typeof n) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(t);
                return
            }
            e.setAttribute(t, "" + n)
        }
    }
    function kt(e, t, n, l) {
        if (l === null)
            e.removeAttribute(n);
        else {
            switch (typeof l) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(n);
                return
            }
            e.setAttributeNS(t, n, "" + l)
        }
    }
    function St(e) {
        switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function oc(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function cp(e, t, n) {
        var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
            var i = l.get
              , u = l.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return i.call(this)
                },
                set: function(h) {
                    n = "" + h,
                    u.call(this, h)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: l.enumerable
            }),
            {
                getValue: function() {
                    return n
                },
                setValue: function(h) {
                    n = "" + h
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function Fs(e) {
        if (!e._valueTracker) {
            var t = oc(e) ? "checked" : "value";
            e._valueTracker = cp(e, t, "" + e[t])
        }
    }
    function cc(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var n = t.getValue()
          , l = "";
        return e && (l = oc(e) ? e.checked ? "true" : "false" : e.value),
        e = l,
        e !== n ? (t.setValue(e),
        !0) : !1
    }
    function ci(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var fp = /[\n"\\]/g;
    function Et(e) {
        return e.replace(fp, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }
    function Ws(e, t, n, l, i, u, h, v) {
        e.name = "",
        h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"),
        t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"),
        t != null ? Ps(e, h, St(t)) : n != null ? Ps(e, h, St(n)) : l != null && e.removeAttribute("value"),
        i == null && u != null && (e.defaultChecked = !!u),
        i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"),
        v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.name = "" + St(v) : e.removeAttribute("name")
    }
    function fc(e, t, n, l, i, u, h, v) {
        if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u),
        t != null || n != null) {
            if (!(u !== "submit" && u !== "reset" || t != null)) {
                Fs(e);
                return
            }
            n = n != null ? "" + St(n) : "",
            t = t != null ? "" + St(t) : n,
            v || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        l = l ?? i,
        l = typeof l != "function" && typeof l != "symbol" && !!l,
        e.checked = v ? e.checked : !!l,
        e.defaultChecked = !!l,
        h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h),
        Fs(e)
    }
    function Ps(e, t, n) {
        t === "number" && ci(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n)
    }
    function ul(e, t, n, l) {
        if (e = e.options,
        t) {
            t = {};
            for (var i = 0; i < n.length; i++)
                t["$" + n[i]] = !0;
            for (n = 0; n < e.length; n++)
                i = t.hasOwnProperty("$" + e[n].value),
                e[n].selected !== i && (e[n].selected = i),
                i && l && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + St(n),
            t = null,
            i = 0; i < e.length; i++) {
                if (e[i].value === n) {
                    e[i].selected = !0,
                    l && (e[i].defaultSelected = !0);
                    return
                }
                t !== null || e[i].disabled || (t = e[i])
            }
            t !== null && (t.selected = !0)
        }
    }
    function dc(e, t, n) {
        if (t != null && (t = "" + St(t),
        t !== e.value && (e.value = t),
        n == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = n != null ? "" + St(n) : ""
    }
    function hc(e, t, n, l) {
        if (t == null) {
            if (l != null) {
                if (n != null)
                    throw Error(o(92));
                if (fe(l)) {
                    if (1 < l.length)
                        throw Error(o(93));
                    l = l[0]
                }
                n = l
            }
            n == null && (n = ""),
            t = n
        }
        n = St(t),
        e.defaultValue = n,
        l = e.textContent,
        l === n && l !== "" && l !== null && (e.value = l),
        Fs(e)
    }
    function ol(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && n.nodeType === 3) {
                n.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var dp = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function mc(e, t, n) {
        var l = t.indexOf("--") === 0;
        n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || dp.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px"
    }
    function gc(e, t, n) {
        if (t != null && typeof t != "object")
            throw Error(o(62));
        if (e = e.style,
        n != null) {
            for (var l in n)
                !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
            for (var i in t)
                l = t[i],
                t.hasOwnProperty(i) && n[i] !== l && mc(e, i, l)
        } else
            for (var u in t)
                t.hasOwnProperty(u) && mc(e, u, t[u])
    }
    function Is(e) {
        if (e.indexOf("-") === -1)
            return !1;
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var hp = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]])
      , mp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function fi(e) {
        return mp.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    function Zt() {}
    var er = null;
    function tr(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var cl = null
      , fl = null;
    function pc(e) {
        var t = il(e);
        if (t && (e = t.stateNode)) {
            var n = e[at] || null;
            e: switch (e = t.stateNode,
            t.type) {
            case "input":
                if (Ws(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name),
                t = n.name,
                n.type === "radio" && t != null) {
                    for (n = e; n.parentNode; )
                        n = n.parentNode;
                    for (n = n.querySelectorAll('input[name="' + Et("" + t) + '"][type="radio"]'),
                    t = 0; t < n.length; t++) {
                        var l = n[t];
                        if (l !== e && l.form === e.form) {
                            var i = l[at] || null;
                            if (!i)
                                throw Error(o(90));
                            Ws(l, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name)
                        }
                    }
                    for (t = 0; t < n.length; t++)
                        l = n[t],
                        l.form === e.form && cc(l)
                }
                break e;
            case "textarea":
                dc(e, n.value, n.defaultValue);
                break e;
            case "select":
                t = n.value,
                t != null && ul(e, !!n.multiple, t, !1)
            }
        }
    }
    var nr = !1;
    function yc(e, t, n) {
        if (nr)
            return e(t, n);
        nr = !0;
        try {
            var l = e(t);
            return l
        } finally {
            if (nr = !1,
            (cl !== null || fl !== null) && (Pi(),
            cl && (t = cl,
            e = fl,
            fl = cl = null,
            pc(t),
            e)))
                for (t = 0; t < e.length; t++)
                    pc(e[t])
        }
    }
    function Pl(e, t) {
        var n = e.stateNode;
        if (n === null)
            return null;
        var l = n[at] || null;
        if (l === null)
            return null;
        n = l[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (l = !l.disabled) || (e = e.type,
            l = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !l;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (n && typeof n != "function")
            throw Error(o(231, t, typeof n));
        return n
    }
    var Kt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , lr = !1;
    if (Kt)
        try {
            var Il = {};
            Object.defineProperty(Il, "passive", {
                get: function() {
                    lr = !0
                }
            }),
            window.addEventListener("test", Il, Il),
            window.removeEventListener("test", Il, Il)
        } catch {
            lr = !1
        }
    var gn = null
      , ar = null
      , di = null;
    function xc() {
        if (di)
            return di;
        var e, t = ar, n = t.length, l, i = "value"in gn ? gn.value : gn.textContent, u = i.length;
        for (e = 0; e < n && t[e] === i[e]; e++)
            ;
        var h = n - e;
        for (l = 1; l <= h && t[n - l] === i[u - l]; l++)
            ;
        return di = i.slice(e, 1 < l ? 1 - l : void 0)
    }
    function hi(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function mi() {
        return !0
    }
    function vc() {
        return !1
    }
    function it(e) {
        function t(n, l, i, u, h) {
            this._reactName = n,
            this._targetInst = i,
            this.type = l,
            this.nativeEvent = u,
            this.target = h,
            this.currentTarget = null;
            for (var v in e)
                e.hasOwnProperty(v) && (n = e[v],
                this[v] = n ? n(u) : u[v]);
            return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? mi : vc,
            this.isPropagationStopped = vc,
            this
        }
        return x(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                this.isDefaultPrevented = mi)
            },
            stopPropagation: function() {
                var n = this.nativeEvent;
                n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                this.isPropagationStopped = mi)
            },
            persist: function() {},
            isPersistent: mi
        }),
        t
    }
    var Yn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, gi = it(Yn), ea = x({}, Yn, {
        view: 0,
        detail: 0
    }), gp = it(ea), ir, sr, ta, pi = x({}, ea, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ur,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== ta && (ta && e.type === "mousemove" ? (ir = e.screenX - ta.screenX,
            sr = e.screenY - ta.screenY) : sr = ir = 0,
            ta = e),
            ir)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : sr
        }
    }), bc = it(pi), pp = x({}, pi, {
        dataTransfer: 0
    }), yp = it(pp), xp = x({}, ea, {
        relatedTarget: 0
    }), rr = it(xp), vp = x({}, Yn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), bp = it(vp), Sp = x({}, Yn, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), Ep = it(Sp), wp = x({}, Yn, {
        data: 0
    }), Sc = it(wp), _p = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, Np = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, jp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function Cp(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = jp[e]) ? !!t[e] : !1
    }
    function ur() {
        return Cp
    }
    var Tp = x({}, ea, {
        key: function(e) {
            if (e.key) {
                var t = _p[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = hi(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Np[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ur,
        charCode: function(e) {
            return e.type === "keypress" ? hi(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? hi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , Op = it(Tp)
      , Rp = x({}, pi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , Ec = it(Rp)
      , Ap = x({}, ea, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ur
    })
      , Mp = it(Ap)
      , zp = x({}, Yn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , Lp = it(zp)
      , Dp = x({}, pi, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , Up = it(Dp)
      , Hp = x({}, Yn, {
        newState: 0,
        oldState: 0
    })
      , qp = it(Hp)
      , Bp = [9, 13, 27, 32]
      , or = Kt && "CompositionEvent"in window
      , na = null;
    Kt && "documentMode"in document && (na = document.documentMode);
    var Gp = Kt && "TextEvent"in window && !na
      , wc = Kt && (!or || na && 8 < na && 11 >= na)
      , _c = " "
      , Nc = !1;
    function jc(e, t) {
        switch (e) {
        case "keyup":
            return Bp.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function Cc(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var dl = !1;
    function Yp(e, t) {
        switch (e) {
        case "compositionend":
            return Cc(t);
        case "keypress":
            return t.which !== 32 ? null : (Nc = !0,
            _c);
        case "textInput":
            return e = t.data,
            e === _c && Nc ? null : e;
        default:
            return null
        }
    }
    function Vp(e, t) {
        if (dl)
            return e === "compositionend" || !or && jc(e, t) ? (e = xc(),
            di = ar = gn = null,
            dl = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return wc && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var Qp = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function Tc(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Qp[e.type] : t === "textarea"
    }
    function Oc(e, t, n, l) {
        cl ? fl ? fl.push(l) : fl = [l] : cl = l,
        t = is(t, "onChange"),
        0 < t.length && (n = new gi("onChange","change",null,n,l),
        e.push({
            event: n,
            listeners: t
        }))
    }
    var la = null
      , aa = null;
    function Xp(e) {
        dh(e, 0)
    }
    function yi(e) {
        var t = Wl(e);
        if (cc(t))
            return e
    }
    function Rc(e, t) {
        if (e === "change")
            return t
    }
    var Ac = !1;
    if (Kt) {
        var cr;
        if (Kt) {
            var fr = "oninput"in document;
            if (!fr) {
                var Mc = document.createElement("div");
                Mc.setAttribute("oninput", "return;"),
                fr = typeof Mc.oninput == "function"
            }
            cr = fr
        } else
            cr = !1;
        Ac = cr && (!document.documentMode || 9 < document.documentMode)
    }
    function zc() {
        la && (la.detachEvent("onpropertychange", Lc),
        aa = la = null)
    }
    function Lc(e) {
        if (e.propertyName === "value" && yi(aa)) {
            var t = [];
            Oc(t, aa, e, tr(e)),
            yc(Xp, t)
        }
    }
    function kp(e, t, n) {
        e === "focusin" ? (zc(),
        la = t,
        aa = n,
        la.attachEvent("onpropertychange", Lc)) : e === "focusout" && zc()
    }
    function Zp(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return yi(aa)
    }
    function Kp(e, t) {
        if (e === "click")
            return yi(t)
    }
    function Jp(e, t) {
        if (e === "input" || e === "change")
            return yi(t)
    }
    function $p(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var mt = typeof Object.is == "function" ? Object.is : $p;
    function ia(e, t) {
        if (mt(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var n = Object.keys(e)
          , l = Object.keys(t);
        if (n.length !== l.length)
            return !1;
        for (l = 0; l < n.length; l++) {
            var i = n[l];
            if (!Vs.call(t, i) || !mt(e[i], t[i]))
                return !1
        }
        return !0
    }
    function Dc(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function Uc(e, t) {
        var n = Dc(e);
        e = 0;
        for (var l; n; ) {
            if (n.nodeType === 3) {
                if (l = e + n.textContent.length,
                e <= t && l >= t)
                    return {
                        node: n,
                        offset: t - e
                    };
                e = l
            }
            e: {
                for (; n; ) {
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e
                    }
                    n = n.parentNode
                }
                n = void 0
            }
            n = Dc(n)
        }
    }
    function Hc(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Hc(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function qc(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = ci(e.document); t instanceof e.HTMLIFrameElement; ) {
            try {
                var n = typeof t.contentWindow.location.href == "string"
            } catch {
                n = !1
            }
            if (n)
                e = t.contentWindow;
            else
                break;
            t = ci(e.document)
        }
        return t
    }
    function dr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var Fp = Kt && "documentMode"in document && 11 >= document.documentMode
      , hl = null
      , hr = null
      , sa = null
      , mr = !1;
    function Bc(e, t, n) {
        var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        mr || hl == null || hl !== ci(l) || (l = hl,
        "selectionStart"in l && dr(l) ? l = {
            start: l.selectionStart,
            end: l.selectionEnd
        } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(),
        l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset
        }),
        sa && ia(sa, l) || (sa = l,
        l = is(hr, "onSelect"),
        0 < l.length && (t = new gi("onSelect","select",null,t,n),
        e.push({
            event: t,
            listeners: l
        }),
        t.target = hl)))
    }
    function Vn(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(),
        n["Webkit" + e] = "webkit" + t,
        n["Moz" + e] = "moz" + t,
        n
    }
    var ml = {
        animationend: Vn("Animation", "AnimationEnd"),
        animationiteration: Vn("Animation", "AnimationIteration"),
        animationstart: Vn("Animation", "AnimationStart"),
        transitionrun: Vn("Transition", "TransitionRun"),
        transitionstart: Vn("Transition", "TransitionStart"),
        transitioncancel: Vn("Transition", "TransitionCancel"),
        transitionend: Vn("Transition", "TransitionEnd")
    }
      , gr = {}
      , Gc = {};
    Kt && (Gc = document.createElement("div").style,
    "AnimationEvent"in window || (delete ml.animationend.animation,
    delete ml.animationiteration.animation,
    delete ml.animationstart.animation),
    "TransitionEvent"in window || delete ml.transitionend.transition);
    function Qn(e) {
        if (gr[e])
            return gr[e];
        if (!ml[e])
            return e;
        var t = ml[e], n;
        for (n in t)
            if (t.hasOwnProperty(n) && n in Gc)
                return gr[e] = t[n];
        return e
    }
    var Yc = Qn("animationend")
      , Vc = Qn("animationiteration")
      , Qc = Qn("animationstart")
      , Wp = Qn("transitionrun")
      , Pp = Qn("transitionstart")
      , Ip = Qn("transitioncancel")
      , Xc = Qn("transitionend")
      , kc = new Map
      , pr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    pr.push("scrollEnd");
    function Mt(e, t) {
        kc.set(e, t),
        Gn(t, [e])
    }
    var xi = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    }
      , wt = []
      , gl = 0
      , yr = 0;
    function vi() {
        for (var e = gl, t = yr = gl = 0; t < e; ) {
            var n = wt[t];
            wt[t++] = null;
            var l = wt[t];
            wt[t++] = null;
            var i = wt[t];
            wt[t++] = null;
            var u = wt[t];
            if (wt[t++] = null,
            l !== null && i !== null) {
                var h = l.pending;
                h === null ? i.next = i : (i.next = h.next,
                h.next = i),
                l.pending = i
            }
            u !== 0 && Zc(n, i, u)
        }
    }
    function bi(e, t, n, l) {
        wt[gl++] = e,
        wt[gl++] = t,
        wt[gl++] = n,
        wt[gl++] = l,
        yr |= l,
        e.lanes |= l,
        e = e.alternate,
        e !== null && (e.lanes |= l)
    }
    function xr(e, t, n, l) {
        return bi(e, t, n, l),
        Si(e)
    }
    function Xn(e, t) {
        return bi(e, null, null, t),
        Si(e)
    }
    function Zc(e, t, n) {
        e.lanes |= n;
        var l = e.alternate;
        l !== null && (l.lanes |= n);
        for (var i = !1, u = e.return; u !== null; )
            u.childLanes |= n,
            l = u.alternate,
            l !== null && (l.childLanes |= n),
            u.tag === 22 && (e = u.stateNode,
            e === null || e._visibility & 1 || (i = !0)),
            e = u,
            u = u.return;
        return e.tag === 3 ? (u = e.stateNode,
        i && t !== null && (i = 31 - ht(n),
        e = u.hiddenUpdates,
        l = e[i],
        l === null ? e[i] = [t] : l.push(t),
        t.lane = n | 536870912),
        u) : null
    }
    function Si(e) {
        if (50 < Ta)
            throw Ta = 0,
            Cu = null,
            Error(o(185));
        for (var t = e.return; t !== null; )
            e = t,
            t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var pl = {};
    function e0(e, t, n, l) {
        this.tag = e,
        this.key = n,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.refCleanup = this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = l,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function gt(e, t, n, l) {
        return new e0(e,t,n,l)
    }
    function vr(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function Jt(e, t) {
        var n = e.alternate;
        return n === null ? (n = gt(e.tag, t, e.key, e.mode),
        n.elementType = e.elementType,
        n.type = e.type,
        n.stateNode = e.stateNode,
        n.alternate = e,
        e.alternate = n) : (n.pendingProps = t,
        n.type = e.type,
        n.flags = 0,
        n.subtreeFlags = 0,
        n.deletions = null),
        n.flags = e.flags & 65011712,
        n.childLanes = e.childLanes,
        n.lanes = e.lanes,
        n.child = e.child,
        n.memoizedProps = e.memoizedProps,
        n.memoizedState = e.memoizedState,
        n.updateQueue = e.updateQueue,
        t = e.dependencies,
        n.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        n.sibling = e.sibling,
        n.index = e.index,
        n.ref = e.ref,
        n.refCleanup = e.refCleanup,
        n
    }
    function Kc(e, t) {
        e.flags &= 65011714;
        var n = e.alternate;
        return n === null ? (e.childLanes = 0,
        e.lanes = t,
        e.child = null,
        e.subtreeFlags = 0,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.updateQueue = null,
        e.dependencies = null,
        e.stateNode = null) : (e.childLanes = n.childLanes,
        e.lanes = n.lanes,
        e.child = n.child,
        e.subtreeFlags = 0,
        e.deletions = null,
        e.memoizedProps = n.memoizedProps,
        e.memoizedState = n.memoizedState,
        e.updateQueue = n.updateQueue,
        e.type = n.type,
        t = n.dependencies,
        e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }),
        e
    }
    function Ei(e, t, n, l, i, u) {
        var h = 0;
        if (l = e,
        typeof e == "function")
            vr(e) && (h = 1);
        else if (typeof e == "string")
            h = iy(e, n, $.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else
            e: switch (e) {
            case Ne:
                return e = gt(31, n, t, i),
                e.elementType = Ne,
                e.lanes = u,
                e;
            case T:
                return kn(n.children, i, u, t);
            case _:
                h = 8,
                i |= 24;
                break;
            case z:
                return e = gt(12, n, t, i | 2),
                e.elementType = z,
                e.lanes = u,
                e;
            case W:
                return e = gt(13, n, t, i),
                e.elementType = W,
                e.lanes = u,
                e;
            case ue:
                return e = gt(19, n, t, i),
                e.elementType = ue,
                e.lanes = u,
                e;
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case V:
                        h = 10;
                        break e;
                    case G:
                        h = 9;
                        break e;
                    case J:
                        h = 11;
                        break e;
                    case P:
                        h = 14;
                        break e;
                    case ye:
                        h = 16,
                        l = null;
                        break e
                    }
                h = 29,
                n = Error(o(130, e === null ? "null" : typeof e, "")),
                l = null
            }
        return t = gt(h, n, t, i),
        t.elementType = e,
        t.type = l,
        t.lanes = u,
        t
    }
    function kn(e, t, n, l) {
        return e = gt(7, e, l, t),
        e.lanes = n,
        e
    }
    function br(e, t, n) {
        return e = gt(6, e, null, t),
        e.lanes = n,
        e
    }
    function Jc(e) {
        var t = gt(18, null, null, 0);
        return t.stateNode = e,
        t
    }
    function Sr(e, t, n) {
        return t = gt(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = n,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    var $c = new WeakMap;
    function _t(e, t) {
        if (typeof e == "object" && e !== null) {
            var n = $c.get(e);
            return n !== void 0 ? n : (t = {
                value: e,
                source: t,
                stack: Jo(t)
            },
            $c.set(e, t),
            t)
        }
        return {
            value: e,
            source: t,
            stack: Jo(t)
        }
    }
    var yl = []
      , xl = 0
      , wi = null
      , ra = 0
      , Nt = []
      , jt = 0
      , pn = null
      , Ut = 1
      , Ht = "";
    function $t(e, t) {
        yl[xl++] = ra,
        yl[xl++] = wi,
        wi = e,
        ra = t
    }
    function Fc(e, t, n) {
        Nt[jt++] = Ut,
        Nt[jt++] = Ht,
        Nt[jt++] = pn,
        pn = e;
        var l = Ut;
        e = Ht;
        var i = 32 - ht(l) - 1;
        l &= ~(1 << i),
        n += 1;
        var u = 32 - ht(t) + i;
        if (30 < u) {
            var h = i - i % 5;
            u = (l & (1 << h) - 1).toString(32),
            l >>= h,
            i -= h,
            Ut = 1 << 32 - ht(t) + i | n << i | l,
            Ht = u + e
        } else
            Ut = 1 << u | n << i | l,
            Ht = e
    }
    function Er(e) {
        e.return !== null && ($t(e, 1),
        Fc(e, 1, 0))
    }
    function wr(e) {
        for (; e === wi; )
            wi = yl[--xl],
            yl[xl] = null,
            ra = yl[--xl],
            yl[xl] = null;
        for (; e === pn; )
            pn = Nt[--jt],
            Nt[jt] = null,
            Ht = Nt[--jt],
            Nt[jt] = null,
            Ut = Nt[--jt],
            Nt[jt] = null
    }
    function Wc(e, t) {
        Nt[jt++] = Ut,
        Nt[jt++] = Ht,
        Nt[jt++] = pn,
        Ut = t.id,
        Ht = t.overflow,
        pn = e
    }
    var Fe = null
      , Me = null
      , xe = !1
      , yn = null
      , Ct = !1
      , _r = Error(o(519));
    function xn(e) {
        var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw ua(_t(t, e)),
        _r
    }
    function Pc(e) {
        var t = e.stateNode
          , n = e.type
          , l = e.memoizedProps;
        switch (t[$e] = e,
        t[at] = l,
        n) {
        case "dialog":
            me("cancel", t),
            me("close", t);
            break;
        case "iframe":
        case "object":
        case "embed":
            me("load", t);
            break;
        case "video":
        case "audio":
            for (n = 0; n < Ra.length; n++)
                me(Ra[n], t);
            break;
        case "source":
            me("error", t);
            break;
        case "img":
        case "image":
        case "link":
            me("error", t),
            me("load", t);
            break;
        case "details":
            me("toggle", t);
            break;
        case "input":
            me("invalid", t),
            fc(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0);
            break;
        case "select":
            me("invalid", t);
            break;
        case "textarea":
            me("invalid", t),
            hc(t, l.value, l.defaultValue, l.children)
        }
        n = l.children,
        typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || ph(t.textContent, n) ? (l.popover != null && (me("beforetoggle", t),
        me("toggle", t)),
        l.onScroll != null && me("scroll", t),
        l.onScrollEnd != null && me("scrollend", t),
        l.onClick != null && (t.onclick = Zt),
        t = !0) : t = !1,
        t || xn(e, !0)
    }
    function Ic(e) {
        for (Fe = e.return; Fe; )
            switch (Fe.tag) {
            case 5:
            case 31:
            case 13:
                Ct = !1;
                return;
            case 27:
            case 3:
                Ct = !0;
                return;
            default:
                Fe = Fe.return
            }
    }
    function vl(e) {
        if (e !== Fe)
            return !1;
        if (!xe)
            return Ic(e),
            xe = !0,
            !1;
        var t = e.tag, n;
        if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type,
        n = !(n !== "form" && n !== "button") || Vu(e.type, e.memoizedProps)),
        n = !n),
        n && Me && xn(e),
        Ic(e),
        t === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            Me = Nh(e)
        } else if (t === 31) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            Me = Nh(e)
        } else
            t === 27 ? (t = Me,
            Mn(e.type) ? (e = Ku,
            Ku = null,
            Me = e) : Me = t) : Me = Fe ? Ot(e.stateNode.nextSibling) : null;
        return !0
    }
    function Zn() {
        Me = Fe = null,
        xe = !1
    }
    function Nr() {
        var e = yn;
        return e !== null && (ot === null ? ot = e : ot.push.apply(ot, e),
        yn = null),
        e
    }
    function ua(e) {
        yn === null ? yn = [e] : yn.push(e)
    }
    var jr = j(null)
      , Kn = null
      , Ft = null;
    function vn(e, t, n) {
        Z(jr, t._currentValue),
        t._currentValue = n
    }
    function Wt(e) {
        e._currentValue = jr.current,
        q(jr)
    }
    function Cr(e, t, n) {
        for (; e !== null; ) {
            var l = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
            e === n)
                break;
            e = e.return
        }
    }
    function Tr(e, t, n, l) {
        var i = e.child;
        for (i !== null && (i.return = e); i !== null; ) {
            var u = i.dependencies;
            if (u !== null) {
                var h = i.child;
                u = u.firstContext;
                e: for (; u !== null; ) {
                    var v = u;
                    u = i;
                    for (var N = 0; N < t.length; N++)
                        if (v.context === t[N]) {
                            u.lanes |= n,
                            v = u.alternate,
                            v !== null && (v.lanes |= n),
                            Cr(u.return, n, e),
                            l || (h = null);
                            break e
                        }
                    u = v.next
                }
            } else if (i.tag === 18) {
                if (h = i.return,
                h === null)
                    throw Error(o(341));
                h.lanes |= n,
                u = h.alternate,
                u !== null && (u.lanes |= n),
                Cr(h, n, e),
                h = null
            } else
                h = i.child;
            if (h !== null)
                h.return = i;
            else
                for (h = i; h !== null; ) {
                    if (h === e) {
                        h = null;
                        break
                    }
                    if (i = h.sibling,
                    i !== null) {
                        i.return = h.return,
                        h = i;
                        break
                    }
                    h = h.return
                }
            i = h
        }
    }
    function bl(e, t, n, l) {
        e = null;
        for (var i = t, u = !1; i !== null; ) {
            if (!u) {
                if ((i.flags & 524288) !== 0)
                    u = !0;
                else if ((i.flags & 262144) !== 0)
                    break
            }
            if (i.tag === 10) {
                var h = i.alternate;
                if (h === null)
                    throw Error(o(387));
                if (h = h.memoizedProps,
                h !== null) {
                    var v = i.type;
                    mt(i.pendingProps.value, h.value) || (e !== null ? e.push(v) : e = [v])
                }
            } else if (i === _e.current) {
                if (h = i.alternate,
                h === null)
                    throw Error(o(387));
                h.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Da) : e = [Da])
            }
            i = i.return
        }
        e !== null && Tr(t, e, n, l),
        t.flags |= 262144
    }
    function _i(e) {
        for (e = e.firstContext; e !== null; ) {
            if (!mt(e.context._currentValue, e.memoizedValue))
                return !0;
            e = e.next
        }
        return !1
    }
    function Jn(e) {
        Kn = e,
        Ft = null,
        e = e.dependencies,
        e !== null && (e.firstContext = null)
    }
    function We(e) {
        return ef(Kn, e)
    }
    function Ni(e, t) {
        return Kn === null && Jn(e),
        ef(e, t)
    }
    function ef(e, t) {
        var n = t._currentValue;
        if (t = {
            context: t,
            memoizedValue: n,
            next: null
        },
        Ft === null) {
            if (e === null)
                throw Error(o(308));
            Ft = t,
            e.dependencies = {
                lanes: 0,
                firstContext: t
            },
            e.flags |= 524288
        } else
            Ft = Ft.next = t;
        return n
    }
    var t0 = typeof AbortController < "u" ? AbortController : function() {
        var e = []
          , t = this.signal = {
            aborted: !1,
            addEventListener: function(n, l) {
                e.push(l)
            }
        };
        this.abort = function() {
            t.aborted = !0,
            e.forEach(function(n) {
                return n()
            })
        }
    }
      , n0 = s.unstable_scheduleCallback
      , l0 = s.unstable_NormalPriority
      , Ge = {
        $$typeof: V,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
    };
    function Or() {
        return {
            controller: new t0,
            data: new Map,
            refCount: 0
        }
    }
    function oa(e) {
        e.refCount--,
        e.refCount === 0 && n0(l0, function() {
            e.controller.abort()
        })
    }
    var ca = null
      , Rr = 0
      , Sl = 0
      , El = null;
    function a0(e, t) {
        if (ca === null) {
            var n = ca = [];
            Rr = 0,
            Sl = zu(),
            El = {
                status: "pending",
                value: void 0,
                then: function(l) {
                    n.push(l)
                }
            }
        }
        return Rr++,
        t.then(tf, tf),
        t
    }
    function tf() {
        if (--Rr === 0 && ca !== null) {
            El !== null && (El.status = "fulfilled");
            var e = ca;
            ca = null,
            Sl = 0,
            El = null;
            for (var t = 0; t < e.length; t++)
                (0,
                e[t])()
        }
    }
    function i0(e, t) {
        var n = []
          , l = {
            status: "pending",
            value: null,
            reason: null,
            then: function(i) {
                n.push(i)
            }
        };
        return e.then(function() {
            l.status = "fulfilled",
            l.value = t;
            for (var i = 0; i < n.length; i++)
                (0,
                n[i])(t)
        }, function(i) {
            for (l.status = "rejected",
            l.reason = i,
            i = 0; i < n.length; i++)
                (0,
                n[i])(void 0)
        }),
        l
    }
    var nf = D.S;
    D.S = function(e, t) {
        Gd = ft(),
        typeof t == "object" && t !== null && typeof t.then == "function" && a0(e, t),
        nf !== null && nf(e, t)
    }
    ;
    var $n = j(null);
    function Ar() {
        var e = $n.current;
        return e !== null ? e : Ae.pooledCache
    }
    function ji(e, t) {
        t === null ? Z($n, $n.current) : Z($n, t.pool)
    }
    function lf() {
        var e = Ar();
        return e === null ? null : {
            parent: Ge._currentValue,
            pool: e
        }
    }
    var wl = Error(o(460))
      , Mr = Error(o(474))
      , Ci = Error(o(542))
      , Ti = {
        then: function() {}
    };
    function af(e) {
        return e = e.status,
        e === "fulfilled" || e === "rejected"
    }
    function sf(e, t, n) {
        switch (n = e[n],
        n === void 0 ? e.push(t) : n !== t && (t.then(Zt, Zt),
        t = n),
        t.status) {
        case "fulfilled":
            return t.value;
        case "rejected":
            throw e = t.reason,
            uf(e),
            e;
        default:
            if (typeof t.status == "string")
                t.then(Zt, Zt);
            else {
                if (e = Ae,
                e !== null && 100 < e.shellSuspendCounter)
                    throw Error(o(482));
                e = t,
                e.status = "pending",
                e.then(function(l) {
                    if (t.status === "pending") {
                        var i = t;
                        i.status = "fulfilled",
                        i.value = l
                    }
                }, function(l) {
                    if (t.status === "pending") {
                        var i = t;
                        i.status = "rejected",
                        i.reason = l
                    }
                })
            }
            switch (t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason,
                uf(e),
                e
            }
            throw Wn = t,
            wl
        }
    }
    function Fn(e) {
        try {
            var t = e._init;
            return t(e._payload)
        } catch (n) {
            throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Wn = n,
            wl) : n
        }
    }
    var Wn = null;
    function rf() {
        if (Wn === null)
            throw Error(o(459));
        var e = Wn;
        return Wn = null,
        e
    }
    function uf(e) {
        if (e === wl || e === Ci)
            throw Error(o(483))
    }
    var _l = null
      , fa = 0;
    function Oi(e) {
        var t = fa;
        return fa += 1,
        _l === null && (_l = []),
        sf(_l, e, t)
    }
    function da(e, t) {
        t = t.props.ref,
        e.ref = t !== void 0 ? t : null
    }
    function Ri(e, t) {
        throw t.$$typeof === E ? Error(o(525)) : (e = Object.prototype.toString.call(t),
        Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }
    function of(e) {
        function t(O, C) {
            if (e) {
                var R = O.deletions;
                R === null ? (O.deletions = [C],
                O.flags |= 16) : R.push(C)
            }
        }
        function n(O, C) {
            if (!e)
                return null;
            for (; C !== null; )
                t(O, C),
                C = C.sibling;
            return null
        }
        function l(O) {
            for (var C = new Map; O !== null; )
                O.key !== null ? C.set(O.key, O) : C.set(O.index, O),
                O = O.sibling;
            return C
        }
        function i(O, C) {
            return O = Jt(O, C),
            O.index = 0,
            O.sibling = null,
            O
        }
        function u(O, C, R) {
            return O.index = R,
            e ? (R = O.alternate,
            R !== null ? (R = R.index,
            R < C ? (O.flags |= 67108866,
            C) : R) : (O.flags |= 67108866,
            C)) : (O.flags |= 1048576,
            C)
        }
        function h(O) {
            return e && O.alternate === null && (O.flags |= 67108866),
            O
        }
        function v(O, C, R, B) {
            return C === null || C.tag !== 6 ? (C = br(R, O.mode, B),
            C.return = O,
            C) : (C = i(C, R),
            C.return = O,
            C)
        }
        function N(O, C, R, B) {
            var ee = R.type;
            return ee === T ? H(O, C, R.props.children, B, R.key) : C !== null && (C.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === ye && Fn(ee) === C.type) ? (C = i(C, R.props),
            da(C, R),
            C.return = O,
            C) : (C = Ei(R.type, R.key, R.props, null, O.mode, B),
            da(C, R),
            C.return = O,
            C)
        }
        function A(O, C, R, B) {
            return C === null || C.tag !== 4 || C.stateNode.containerInfo !== R.containerInfo || C.stateNode.implementation !== R.implementation ? (C = Sr(R, O.mode, B),
            C.return = O,
            C) : (C = i(C, R.children || []),
            C.return = O,
            C)
        }
        function H(O, C, R, B, ee) {
            return C === null || C.tag !== 7 ? (C = kn(R, O.mode, B, ee),
            C.return = O,
            C) : (C = i(C, R),
            C.return = O,
            C)
        }
        function Y(O, C, R) {
            if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
                return C = br("" + C, O.mode, R),
                C.return = O,
                C;
            if (typeof C == "object" && C !== null) {
                switch (C.$$typeof) {
                case S:
                    return R = Ei(C.type, C.key, C.props, null, O.mode, R),
                    da(R, C),
                    R.return = O,
                    R;
                case w:
                    return C = Sr(C, O.mode, R),
                    C.return = O,
                    C;
                case ye:
                    return C = Fn(C),
                    Y(O, C, R)
                }
                if (fe(C) || K(C))
                    return C = kn(C, O.mode, R, null),
                    C.return = O,
                    C;
                if (typeof C.then == "function")
                    return Y(O, Oi(C), R);
                if (C.$$typeof === V)
                    return Y(O, Ni(O, C), R);
                Ri(O, C)
            }
            return null
        }
        function M(O, C, R, B) {
            var ee = C !== null ? C.key : null;
            if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
                return ee !== null ? null : v(O, C, "" + R, B);
            if (typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case S:
                    return R.key === ee ? N(O, C, R, B) : null;
                case w:
                    return R.key === ee ? A(O, C, R, B) : null;
                case ye:
                    return R = Fn(R),
                    M(O, C, R, B)
                }
                if (fe(R) || K(R))
                    return ee !== null ? null : H(O, C, R, B, null);
                if (typeof R.then == "function")
                    return M(O, C, Oi(R), B);
                if (R.$$typeof === V)
                    return M(O, C, Ni(O, R), B);
                Ri(O, R)
            }
            return null
        }
        function L(O, C, R, B, ee) {
            if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
                return O = O.get(R) || null,
                v(C, O, "" + B, ee);
            if (typeof B == "object" && B !== null) {
                switch (B.$$typeof) {
                case S:
                    return O = O.get(B.key === null ? R : B.key) || null,
                    N(C, O, B, ee);
                case w:
                    return O = O.get(B.key === null ? R : B.key) || null,
                    A(C, O, B, ee);
                case ye:
                    return B = Fn(B),
                    L(O, C, R, B, ee)
                }
                if (fe(B) || K(B))
                    return O = O.get(R) || null,
                    H(C, O, B, ee, null);
                if (typeof B.then == "function")
                    return L(O, C, R, Oi(B), ee);
                if (B.$$typeof === V)
                    return L(O, C, R, Ni(C, B), ee);
                Ri(C, B)
            }
            return null
        }
        function F(O, C, R, B) {
            for (var ee = null, be = null, I = C, ce = C = 0, pe = null; I !== null && ce < R.length; ce++) {
                I.index > ce ? (pe = I,
                I = null) : pe = I.sibling;
                var Se = M(O, I, R[ce], B);
                if (Se === null) {
                    I === null && (I = pe);
                    break
                }
                e && I && Se.alternate === null && t(O, I),
                C = u(Se, C, ce),
                be === null ? ee = Se : be.sibling = Se,
                be = Se,
                I = pe
            }
            if (ce === R.length)
                return n(O, I),
                xe && $t(O, ce),
                ee;
            if (I === null) {
                for (; ce < R.length; ce++)
                    I = Y(O, R[ce], B),
                    I !== null && (C = u(I, C, ce),
                    be === null ? ee = I : be.sibling = I,
                    be = I);
                return xe && $t(O, ce),
                ee
            }
            for (I = l(I); ce < R.length; ce++)
                pe = L(I, O, ce, R[ce], B),
                pe !== null && (e && pe.alternate !== null && I.delete(pe.key === null ? ce : pe.key),
                C = u(pe, C, ce),
                be === null ? ee = pe : be.sibling = pe,
                be = pe);
            return e && I.forEach(function(Hn) {
                return t(O, Hn)
            }),
            xe && $t(O, ce),
            ee
        }
        function le(O, C, R, B) {
            if (R == null)
                throw Error(o(151));
            for (var ee = null, be = null, I = C, ce = C = 0, pe = null, Se = R.next(); I !== null && !Se.done; ce++,
            Se = R.next()) {
                I.index > ce ? (pe = I,
                I = null) : pe = I.sibling;
                var Hn = M(O, I, Se.value, B);
                if (Hn === null) {
                    I === null && (I = pe);
                    break
                }
                e && I && Hn.alternate === null && t(O, I),
                C = u(Hn, C, ce),
                be === null ? ee = Hn : be.sibling = Hn,
                be = Hn,
                I = pe
            }
            if (Se.done)
                return n(O, I),
                xe && $t(O, ce),
                ee;
            if (I === null) {
                for (; !Se.done; ce++,
                Se = R.next())
                    Se = Y(O, Se.value, B),
                    Se !== null && (C = u(Se, C, ce),
                    be === null ? ee = Se : be.sibling = Se,
                    be = Se);
                return xe && $t(O, ce),
                ee
            }
            for (I = l(I); !Se.done; ce++,
            Se = R.next())
                Se = L(I, O, ce, Se.value, B),
                Se !== null && (e && Se.alternate !== null && I.delete(Se.key === null ? ce : Se.key),
                C = u(Se, C, ce),
                be === null ? ee = Se : be.sibling = Se,
                be = Se);
            return e && I.forEach(function(py) {
                return t(O, py)
            }),
            xe && $t(O, ce),
            ee
        }
        function Re(O, C, R, B) {
            if (typeof R == "object" && R !== null && R.type === T && R.key === null && (R = R.props.children),
            typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case S:
                    e: {
                        for (var ee = R.key; C !== null; ) {
                            if (C.key === ee) {
                                if (ee = R.type,
                                ee === T) {
                                    if (C.tag === 7) {
                                        n(O, C.sibling),
                                        B = i(C, R.props.children),
                                        B.return = O,
                                        O = B;
                                        break e
                                    }
                                } else if (C.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === ye && Fn(ee) === C.type) {
                                    n(O, C.sibling),
                                    B = i(C, R.props),
                                    da(B, R),
                                    B.return = O,
                                    O = B;
                                    break e
                                }
                                n(O, C);
                                break
                            } else
                                t(O, C);
                            C = C.sibling
                        }
                        R.type === T ? (B = kn(R.props.children, O.mode, B, R.key),
                        B.return = O,
                        O = B) : (B = Ei(R.type, R.key, R.props, null, O.mode, B),
                        da(B, R),
                        B.return = O,
                        O = B)
                    }
                    return h(O);
                case w:
                    e: {
                        for (ee = R.key; C !== null; ) {
                            if (C.key === ee)
                                if (C.tag === 4 && C.stateNode.containerInfo === R.containerInfo && C.stateNode.implementation === R.implementation) {
                                    n(O, C.sibling),
                                    B = i(C, R.children || []),
                                    B.return = O,
                                    O = B;
                                    break e
                                } else {
                                    n(O, C);
                                    break
                                }
                            else
                                t(O, C);
                            C = C.sibling
                        }
                        B = Sr(R, O.mode, B),
                        B.return = O,
                        O = B
                    }
                    return h(O);
                case ye:
                    return R = Fn(R),
                    Re(O, C, R, B)
                }
                if (fe(R))
                    return F(O, C, R, B);
                if (K(R)) {
                    if (ee = K(R),
                    typeof ee != "function")
                        throw Error(o(150));
                    return R = ee.call(R),
                    le(O, C, R, B)
                }
                if (typeof R.then == "function")
                    return Re(O, C, Oi(R), B);
                if (R.$$typeof === V)
                    return Re(O, C, Ni(O, R), B);
                Ri(O, R)
            }
            return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R,
            C !== null && C.tag === 6 ? (n(O, C.sibling),
            B = i(C, R),
            B.return = O,
            O = B) : (n(O, C),
            B = br(R, O.mode, B),
            B.return = O,
            O = B),
            h(O)) : n(O, C)
        }
        return function(O, C, R, B) {
            try {
                fa = 0;
                var ee = Re(O, C, R, B);
                return _l = null,
                ee
            } catch (I) {
                if (I === wl || I === Ci)
                    throw I;
                var be = gt(29, I, null, O.mode);
                return be.lanes = B,
                be.return = O,
                be
            }
        }
    }
    var Pn = of(!0)
      , cf = of(!1)
      , bn = !1;
    function zr(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }
    function Lr(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }
    function Sn(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function En(e, t, n) {
        var l = e.updateQueue;
        if (l === null)
            return null;
        if (l = l.shared,
        (Ee & 2) !== 0) {
            var i = l.pending;
            return i === null ? t.next = t : (t.next = i.next,
            i.next = t),
            l.pending = t,
            t = Si(e),
            Zc(e, null, n),
            t
        }
        return bi(e, l, t, n),
        Si(e)
    }
    function ha(e, t, n) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (n & 4194048) !== 0)) {
            var l = t.lanes;
            l &= e.pendingLanes,
            n |= l,
            t.lanes = n,
            ec(e, n)
        }
    }
    function Dr(e, t) {
        var n = e.updateQueue
          , l = e.alternate;
        if (l !== null && (l = l.updateQueue,
        n === l)) {
            var i = null
              , u = null;
            if (n = n.firstBaseUpdate,
            n !== null) {
                do {
                    var h = {
                        lane: n.lane,
                        tag: n.tag,
                        payload: n.payload,
                        callback: null,
                        next: null
                    };
                    u === null ? i = u = h : u = u.next = h,
                    n = n.next
                } while (n !== null);
                u === null ? i = u = t : u = u.next = t
            } else
                i = u = t;
            n = {
                baseState: l.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: u,
                shared: l.shared,
                callbacks: l.callbacks
            },
            e.updateQueue = n;
            return
        }
        e = n.lastBaseUpdate,
        e === null ? n.firstBaseUpdate = t : e.next = t,
        n.lastBaseUpdate = t
    }
    var Ur = !1;
    function ma() {
        if (Ur) {
            var e = El;
            if (e !== null)
                throw e
        }
    }
    function ga(e, t, n, l) {
        Ur = !1;
        var i = e.updateQueue;
        bn = !1;
        var u = i.firstBaseUpdate
          , h = i.lastBaseUpdate
          , v = i.shared.pending;
        if (v !== null) {
            i.shared.pending = null;
            var N = v
              , A = N.next;
            N.next = null,
            h === null ? u = A : h.next = A,
            h = N;
            var H = e.alternate;
            H !== null && (H = H.updateQueue,
            v = H.lastBaseUpdate,
            v !== h && (v === null ? H.firstBaseUpdate = A : v.next = A,
            H.lastBaseUpdate = N))
        }
        if (u !== null) {
            var Y = i.baseState;
            h = 0,
            H = A = N = null,
            v = u;
            do {
                var M = v.lane & -536870913
                  , L = M !== v.lane;
                if (L ? (ge & M) === M : (l & M) === M) {
                    M !== 0 && M === Sl && (Ur = !0),
                    H !== null && (H = H.next = {
                        lane: 0,
                        tag: v.tag,
                        payload: v.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var F = e
                          , le = v;
                        M = t;
                        var Re = n;
                        switch (le.tag) {
                        case 1:
                            if (F = le.payload,
                            typeof F == "function") {
                                Y = F.call(Re, Y, M);
                                break e
                            }
                            Y = F;
                            break e;
                        case 3:
                            F.flags = F.flags & -65537 | 128;
                        case 0:
                            if (F = le.payload,
                            M = typeof F == "function" ? F.call(Re, Y, M) : F,
                            M == null)
                                break e;
                            Y = x({}, Y, M);
                            break e;
                        case 2:
                            bn = !0
                        }
                    }
                    M = v.callback,
                    M !== null && (e.flags |= 64,
                    L && (e.flags |= 8192),
                    L = i.callbacks,
                    L === null ? i.callbacks = [M] : L.push(M))
                } else
                    L = {
                        lane: M,
                        tag: v.tag,
                        payload: v.payload,
                        callback: v.callback,
                        next: null
                    },
                    H === null ? (A = H = L,
                    N = Y) : H = H.next = L,
                    h |= M;
                if (v = v.next,
                v === null) {
                    if (v = i.shared.pending,
                    v === null)
                        break;
                    L = v,
                    v = L.next,
                    L.next = null,
                    i.lastBaseUpdate = L,
                    i.shared.pending = null
                }
            } while (!0);
            H === null && (N = Y),
            i.baseState = N,
            i.firstBaseUpdate = A,
            i.lastBaseUpdate = H,
            u === null && (i.shared.lanes = 0),
            Cn |= h,
            e.lanes = h,
            e.memoizedState = Y
        }
    }
    function ff(e, t) {
        if (typeof e != "function")
            throw Error(o(191, e));
        e.call(t)
    }
    function df(e, t) {
        var n = e.callbacks;
        if (n !== null)
            for (e.callbacks = null,
            e = 0; e < n.length; e++)
                ff(n[e], t)
    }
    var Nl = j(null)
      , Ai = j(0);
    function hf(e, t) {
        e = rn,
        Z(Ai, e),
        Z(Nl, t),
        rn = e | t.baseLanes
    }
    function Hr() {
        Z(Ai, rn),
        Z(Nl, Nl.current)
    }
    function qr() {
        rn = Ai.current,
        q(Nl),
        q(Ai)
    }
    var pt = j(null)
      , Tt = null;
    function wn(e) {
        var t = e.alternate;
        Z(qe, qe.current & 1),
        Z(pt, e),
        Tt === null && (t === null || Nl.current !== null || t.memoizedState !== null) && (Tt = e)
    }
    function Br(e) {
        Z(qe, qe.current),
        Z(pt, e),
        Tt === null && (Tt = e)
    }
    function mf(e) {
        e.tag === 22 ? (Z(qe, qe.current),
        Z(pt, e),
        Tt === null && (Tt = e)) : _n()
    }
    function _n() {
        Z(qe, qe.current),
        Z(pt, pt.current)
    }
    function yt(e) {
        q(pt),
        Tt === e && (Tt = null),
        q(qe)
    }
    var qe = j(0);
    function Mi(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var n = t.memoizedState;
                if (n !== null && (n = n.dehydrated,
                n === null || ku(n) || Zu(n)))
                    return t
            } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                if ((t.flags & 128) !== 0)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var Pt = 0
      , re = null
      , Te = null
      , Ye = null
      , zi = !1
      , jl = !1
      , In = !1
      , Li = 0
      , pa = 0
      , Cl = null
      , s0 = 0;
    function De() {
        throw Error(o(321))
    }
    function Gr(e, t) {
        if (t === null)
            return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
            if (!mt(e[n], t[n]))
                return !1;
        return !0
    }
    function Yr(e, t, n, l, i, u) {
        return Pt = u,
        re = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        D.H = e === null || e.memoizedState === null ? Wf : nu,
        In = !1,
        u = n(l, i),
        In = !1,
        jl && (u = pf(t, n, l, i)),
        gf(e),
        u
    }
    function gf(e) {
        D.H = va;
        var t = Te !== null && Te.next !== null;
        if (Pt = 0,
        Ye = Te = re = null,
        zi = !1,
        pa = 0,
        Cl = null,
        t)
            throw Error(o(300));
        e === null || Ve || (e = e.dependencies,
        e !== null && _i(e) && (Ve = !0))
    }
    function pf(e, t, n, l) {
        re = e;
        var i = 0;
        do {
            if (jl && (Cl = null),
            pa = 0,
            jl = !1,
            25 <= i)
                throw Error(o(301));
            if (i += 1,
            Ye = Te = null,
            e.updateQueue != null) {
                var u = e.updateQueue;
                u.lastEffect = null,
                u.events = null,
                u.stores = null,
                u.memoCache != null && (u.memoCache.index = 0)
            }
            D.H = Pf,
            u = t(n, l)
        } while (jl);
        return u
    }
    function r0() {
        var e = D.H
          , t = e.useState()[0];
        return t = typeof t.then == "function" ? ya(t) : t,
        e = e.useState()[0],
        (Te !== null ? Te.memoizedState : null) !== e && (re.flags |= 1024),
        t
    }
    function Vr() {
        var e = Li !== 0;
        return Li = 0,
        e
    }
    function Qr(e, t, n) {
        t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~n
    }
    function Xr(e) {
        if (zi) {
            for (e = e.memoizedState; e !== null; ) {
                var t = e.queue;
                t !== null && (t.pending = null),
                e = e.next
            }
            zi = !1
        }
        Pt = 0,
        Ye = Te = re = null,
        jl = !1,
        pa = Li = 0,
        Cl = null
    }
    function lt() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return Ye === null ? re.memoizedState = Ye = e : Ye = Ye.next = e,
        Ye
    }
    function Be() {
        if (Te === null) {
            var e = re.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = Te.next;
        var t = Ye === null ? re.memoizedState : Ye.next;
        if (t !== null)
            Ye = t,
            Te = e;
        else {
            if (e === null)
                throw re.alternate === null ? Error(o(467)) : Error(o(310));
            Te = e,
            e = {
                memoizedState: Te.memoizedState,
                baseState: Te.baseState,
                baseQueue: Te.baseQueue,
                queue: Te.queue,
                next: null
            },
            Ye === null ? re.memoizedState = Ye = e : Ye = Ye.next = e
        }
        return Ye
    }
    function Di() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }
    function ya(e) {
        var t = pa;
        return pa += 1,
        Cl === null && (Cl = []),
        e = sf(Cl, e, t),
        t = re,
        (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate,
        D.H = t === null || t.memoizedState === null ? Wf : nu),
        e
    }
    function Ui(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function")
                return ya(e);
            if (e.$$typeof === V)
                return We(e)
        }
        throw Error(o(438, String(e)))
    }
    function kr(e) {
        var t = null
          , n = re.updateQueue;
        if (n !== null && (t = n.memoCache),
        t == null) {
            var l = re.alternate;
            l !== null && (l = l.updateQueue,
            l !== null && (l = l.memoCache,
            l != null && (t = {
                data: l.data.map(function(i) {
                    return i.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
            data: [],
            index: 0
        }),
        n === null && (n = Di(),
        re.updateQueue = n),
        n.memoCache = t,
        n = t.data[t.index],
        n === void 0)
            for (n = t.data[t.index] = Array(e),
            l = 0; l < e; l++)
                n[l] = Q;
        return t.index++,
        n
    }
    function It(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function Hi(e) {
        var t = Be();
        return Zr(t, Te, e)
    }
    function Zr(e, t, n) {
        var l = e.queue;
        if (l === null)
            throw Error(o(311));
        l.lastRenderedReducer = n;
        var i = e.baseQueue
          , u = l.pending;
        if (u !== null) {
            if (i !== null) {
                var h = i.next;
                i.next = u.next,
                u.next = h
            }
            t.baseQueue = i = u,
            l.pending = null
        }
        if (u = e.baseState,
        i === null)
            e.memoizedState = u;
        else {
            t = i.next;
            var v = h = null
              , N = null
              , A = t
              , H = !1;
            do {
                var Y = A.lane & -536870913;
                if (Y !== A.lane ? (ge & Y) === Y : (Pt & Y) === Y) {
                    var M = A.revertLane;
                    if (M === 0)
                        N !== null && (N = N.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: A.action,
                            hasEagerState: A.hasEagerState,
                            eagerState: A.eagerState,
                            next: null
                        }),
                        Y === Sl && (H = !0);
                    else if ((Pt & M) === M) {
                        A = A.next,
                        M === Sl && (H = !0);
                        continue
                    } else
                        Y = {
                            lane: 0,
                            revertLane: A.revertLane,
                            gesture: null,
                            action: A.action,
                            hasEagerState: A.hasEagerState,
                            eagerState: A.eagerState,
                            next: null
                        },
                        N === null ? (v = N = Y,
                        h = u) : N = N.next = Y,
                        re.lanes |= M,
                        Cn |= M;
                    Y = A.action,
                    In && n(u, Y),
                    u = A.hasEagerState ? A.eagerState : n(u, Y)
                } else
                    M = {
                        lane: Y,
                        revertLane: A.revertLane,
                        gesture: A.gesture,
                        action: A.action,
                        hasEagerState: A.hasEagerState,
                        eagerState: A.eagerState,
                        next: null
                    },
                    N === null ? (v = N = M,
                    h = u) : N = N.next = M,
                    re.lanes |= Y,
                    Cn |= Y;
                A = A.next
            } while (A !== null && A !== t);
            if (N === null ? h = u : N.next = v,
            !mt(u, e.memoizedState) && (Ve = !0,
            H && (n = El,
            n !== null)))
                throw n;
            e.memoizedState = u,
            e.baseState = h,
            e.baseQueue = N,
            l.lastRenderedState = u
        }
        return i === null && (l.lanes = 0),
        [e.memoizedState, l.dispatch]
    }
    function Kr(e) {
        var t = Be()
          , n = t.queue;
        if (n === null)
            throw Error(o(311));
        n.lastRenderedReducer = e;
        var l = n.dispatch
          , i = n.pending
          , u = t.memoizedState;
        if (i !== null) {
            n.pending = null;
            var h = i = i.next;
            do
                u = e(u, h.action),
                h = h.next;
            while (h !== i);
            mt(u, t.memoizedState) || (Ve = !0),
            t.memoizedState = u,
            t.baseQueue === null && (t.baseState = u),
            n.lastRenderedState = u
        }
        return [u, l]
    }
    function yf(e, t, n) {
        var l = re
          , i = Be()
          , u = xe;
        if (u) {
            if (n === void 0)
                throw Error(o(407));
            n = n()
        } else
            n = t();
        var h = !mt((Te || i).memoizedState, n);
        if (h && (i.memoizedState = n,
        Ve = !0),
        i = i.queue,
        Fr(bf.bind(null, l, i, e), [e]),
        i.getSnapshot !== t || h || Ye !== null && Ye.memoizedState.tag & 1) {
            if (l.flags |= 2048,
            Tl(9, {
                destroy: void 0
            }, vf.bind(null, l, i, n, t), null),
            Ae === null)
                throw Error(o(349));
            u || (Pt & 127) !== 0 || xf(l, t, n)
        }
        return n
    }
    function xf(e, t, n) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: n
        },
        t = re.updateQueue,
        t === null ? (t = Di(),
        re.updateQueue = t,
        t.stores = [e]) : (n = t.stores,
        n === null ? t.stores = [e] : n.push(e))
    }
    function vf(e, t, n, l) {
        t.value = n,
        t.getSnapshot = l,
        Sf(t) && Ef(e)
    }
    function bf(e, t, n) {
        return n(function() {
            Sf(t) && Ef(e)
        })
    }
    function Sf(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var n = t();
            return !mt(e, n)
        } catch {
            return !0
        }
    }
    function Ef(e) {
        var t = Xn(e, 2);
        t !== null && ct(t, e, 2)
    }
    function Jr(e) {
        var t = lt();
        if (typeof e == "function") {
            var n = e;
            if (e = n(),
            In) {
                hn(!0);
                try {
                    n()
                } finally {
                    hn(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e,
        t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: It,
            lastRenderedState: e
        },
        t
    }
    function wf(e, t, n, l) {
        return e.baseState = n,
        Zr(e, Te, typeof l == "function" ? l : It)
    }
    function u0(e, t, n, l, i) {
        if (Gi(e))
            throw Error(o(485));
        if (e = t.action,
        e !== null) {
            var u = {
                payload: i,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(h) {
                    u.listeners.push(h)
                }
            };
            D.T !== null ? n(!0) : u.isTransition = !1,
            l(u),
            n = t.pending,
            n === null ? (u.next = t.pending = u,
            _f(t, u)) : (u.next = n.next,
            t.pending = n.next = u)
        }
    }
    function _f(e, t) {
        var n = t.action
          , l = t.payload
          , i = e.state;
        if (t.isTransition) {
            var u = D.T
              , h = {};
            D.T = h;
            try {
                var v = n(i, l)
                  , N = D.S;
                N !== null && N(h, v),
                Nf(e, t, v)
            } catch (A) {
                $r(e, t, A)
            } finally {
                u !== null && h.types !== null && (u.types = h.types),
                D.T = u
            }
        } else
            try {
                u = n(i, l),
                Nf(e, t, u)
            } catch (A) {
                $r(e, t, A)
            }
    }
    function Nf(e, t, n) {
        n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(l) {
            jf(e, t, l)
        }, function(l) {
            return $r(e, t, l)
        }) : jf(e, t, n)
    }
    function jf(e, t, n) {
        t.status = "fulfilled",
        t.value = n,
        Cf(t),
        e.state = n,
        t = e.pending,
        t !== null && (n = t.next,
        n === t ? e.pending = null : (n = n.next,
        t.next = n,
        _f(e, n)))
    }
    function $r(e, t, n) {
        var l = e.pending;
        if (e.pending = null,
        l !== null) {
            l = l.next;
            do
                t.status = "rejected",
                t.reason = n,
                Cf(t),
                t = t.next;
            while (t !== l)
        }
        e.action = null
    }
    function Cf(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)
            (0,
            e[t])()
    }
    function Tf(e, t) {
        return t
    }
    function Of(e, t) {
        if (xe) {
            var n = Ae.formState;
            if (n !== null) {
                e: {
                    var l = re;
                    if (xe) {
                        if (Me) {
                            t: {
                                for (var i = Me, u = Ct; i.nodeType !== 8; ) {
                                    if (!u) {
                                        i = null;
                                        break t
                                    }
                                    if (i = Ot(i.nextSibling),
                                    i === null) {
                                        i = null;
                                        break t
                                    }
                                }
                                u = i.data,
                                i = u === "F!" || u === "F" ? i : null
                            }
                            if (i) {
                                Me = Ot(i.nextSibling),
                                l = i.data === "F!";
                                break e
                            }
                        }
                        xn(l)
                    }
                    l = !1
                }
                l && (t = n[0])
            }
        }
        return n = lt(),
        n.memoizedState = n.baseState = t,
        l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Tf,
            lastRenderedState: t
        },
        n.queue = l,
        n = Jf.bind(null, re, l),
        l.dispatch = n,
        l = Jr(!1),
        u = tu.bind(null, re, !1, l.queue),
        l = lt(),
        i = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        },
        l.queue = i,
        n = u0.bind(null, re, i, u, n),
        i.dispatch = n,
        l.memoizedState = e,
        [t, n, !1]
    }
    function Rf(e) {
        var t = Be();
        return Af(t, Te, e)
    }
    function Af(e, t, n) {
        if (t = Zr(e, t, Tf)[0],
        e = Hi(It)[0],
        typeof t == "object" && t !== null && typeof t.then == "function")
            try {
                var l = ya(t)
            } catch (h) {
                throw h === wl ? Ci : h
            }
        else
            l = t;
        t = Be();
        var i = t.queue
          , u = i.dispatch;
        return n !== t.memoizedState && (re.flags |= 2048,
        Tl(9, {
            destroy: void 0
        }, o0.bind(null, i, n), null)),
        [l, u, e]
    }
    function o0(e, t) {
        e.action = t
    }
    function Mf(e) {
        var t = Be()
          , n = Te;
        if (n !== null)
            return Af(t, n, e);
        Be(),
        t = t.memoizedState,
        n = Be();
        var l = n.queue.dispatch;
        return n.memoizedState = e,
        [t, l, !1]
    }
    function Tl(e, t, n, l) {
        return e = {
            tag: e,
            create: n,
            deps: l,
            inst: t,
            next: null
        },
        t = re.updateQueue,
        t === null && (t = Di(),
        re.updateQueue = t),
        n = t.lastEffect,
        n === null ? t.lastEffect = e.next = e : (l = n.next,
        n.next = e,
        e.next = l,
        t.lastEffect = e),
        e
    }
    function zf() {
        return Be().memoizedState
    }
    function qi(e, t, n, l) {
        var i = lt();
        re.flags |= e,
        i.memoizedState = Tl(1 | t, {
            destroy: void 0
        }, n, l === void 0 ? null : l)
    }
    function Bi(e, t, n, l) {
        var i = Be();
        l = l === void 0 ? null : l;
        var u = i.memoizedState.inst;
        Te !== null && l !== null && Gr(l, Te.memoizedState.deps) ? i.memoizedState = Tl(t, u, n, l) : (re.flags |= e,
        i.memoizedState = Tl(1 | t, u, n, l))
    }
    function Lf(e, t) {
        qi(8390656, 8, e, t)
    }
    function Fr(e, t) {
        Bi(2048, 8, e, t)
    }
    function c0(e) {
        re.flags |= 4;
        var t = re.updateQueue;
        if (t === null)
            t = Di(),
            re.updateQueue = t,
            t.events = [e];
        else {
            var n = t.events;
            n === null ? t.events = [e] : n.push(e)
        }
    }
    function Df(e) {
        var t = Be().memoizedState;
        return c0({
            ref: t,
            nextImpl: e
        }),
        function() {
            if ((Ee & 2) !== 0)
                throw Error(o(440));
            return t.impl.apply(void 0, arguments)
        }
    }
    function Uf(e, t) {
        return Bi(4, 2, e, t)
    }
    function Hf(e, t) {
        return Bi(4, 4, e, t)
    }
    function qf(e, t) {
        if (typeof t == "function") {
            e = e();
            var n = t(e);
            return function() {
                typeof n == "function" ? n() : t(null)
            }
        }
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function Bf(e, t, n) {
        n = n != null ? n.concat([e]) : null,
        Bi(4, 4, qf.bind(null, t, e), n)
    }
    function Wr() {}
    function Gf(e, t) {
        var n = Be();
        t = t === void 0 ? null : t;
        var l = n.memoizedState;
        return t !== null && Gr(t, l[1]) ? l[0] : (n.memoizedState = [e, t],
        e)
    }
    function Yf(e, t) {
        var n = Be();
        t = t === void 0 ? null : t;
        var l = n.memoizedState;
        if (t !== null && Gr(t, l[1]))
            return l[0];
        if (l = e(),
        In) {
            hn(!0);
            try {
                e()
            } finally {
                hn(!1)
            }
        }
        return n.memoizedState = [l, t],
        l
    }
    function Pr(e, t, n) {
        return n === void 0 || (Pt & 1073741824) !== 0 && (ge & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n,
        e = Vd(),
        re.lanes |= e,
        Cn |= e,
        n)
    }
    function Vf(e, t, n, l) {
        return mt(n, t) ? n : Nl.current !== null ? (e = Pr(e, n, l),
        mt(e, t) || (Ve = !0),
        e) : (Pt & 42) === 0 || (Pt & 1073741824) !== 0 && (ge & 261930) === 0 ? (Ve = !0,
        e.memoizedState = n) : (e = Vd(),
        re.lanes |= e,
        Cn |= e,
        t)
    }
    function Qf(e, t, n, l, i) {
        var u = X.p;
        X.p = u !== 0 && 8 > u ? u : 8;
        var h = D.T
          , v = {};
        D.T = v,
        tu(e, !1, t, n);
        try {
            var N = i()
              , A = D.S;
            if (A !== null && A(v, N),
            N !== null && typeof N == "object" && typeof N.then == "function") {
                var H = i0(N, l);
                xa(e, t, H, bt(e))
            } else
                xa(e, t, l, bt(e))
        } catch (Y) {
            xa(e, t, {
                then: function() {},
                status: "rejected",
                reason: Y
            }, bt())
        } finally {
            X.p = u,
            h !== null && v.types !== null && (h.types = v.types),
            D.T = h
        }
    }
    function f0() {}
    function Ir(e, t, n, l) {
        if (e.tag !== 5)
            throw Error(o(476));
        var i = Xf(e).queue;
        Qf(e, i, t, te, n === null ? f0 : function() {
            return kf(e),
            n(l)
        }
        )
    }
    function Xf(e) {
        var t = e.memoizedState;
        if (t !== null)
            return t;
        t = {
            memoizedState: te,
            baseState: te,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: It,
                lastRenderedState: te
            },
            next: null
        };
        var n = {};
        return t.next = {
            memoizedState: n,
            baseState: n,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: It,
                lastRenderedState: n
            },
            next: null
        },
        e.memoizedState = t,
        e = e.alternate,
        e !== null && (e.memoizedState = t),
        t
    }
    function kf(e) {
        var t = Xf(e);
        t.next === null && (t = e.alternate.memoizedState),
        xa(e, t.next.queue, {}, bt())
    }
    function eu() {
        return We(Da)
    }
    function Zf() {
        return Be().memoizedState
    }
    function Kf() {
        return Be().memoizedState
    }
    function d0(e) {
        for (var t = e.return; t !== null; ) {
            switch (t.tag) {
            case 24:
            case 3:
                var n = bt();
                e = Sn(n);
                var l = En(t, e, n);
                l !== null && (ct(l, t, n),
                ha(l, t, n)),
                t = {
                    cache: Or()
                },
                e.payload = t;
                return
            }
            t = t.return
        }
    }
    function h0(e, t, n) {
        var l = bt();
        n = {
            lane: l,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        Gi(e) ? $f(t, n) : (n = xr(e, t, n, l),
        n !== null && (ct(n, e, l),
        Ff(n, t, l)))
    }
    function Jf(e, t, n) {
        var l = bt();
        xa(e, t, n, l)
    }
    function xa(e, t, n, l) {
        var i = {
            lane: l,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (Gi(e))
            $f(t, i);
        else {
            var u = e.alternate;
            if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer,
            u !== null))
                try {
                    var h = t.lastRenderedState
                      , v = u(h, n);
                    if (i.hasEagerState = !0,
                    i.eagerState = v,
                    mt(v, h))
                        return bi(e, t, i, 0),
                        Ae === null && vi(),
                        !1
                } catch {}
            if (n = xr(e, t, i, l),
            n !== null)
                return ct(n, e, l),
                Ff(n, t, l),
                !0
        }
        return !1
    }
    function tu(e, t, n, l) {
        if (l = {
            lane: 2,
            revertLane: zu(),
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        Gi(e)) {
            if (t)
                throw Error(o(479))
        } else
            t = xr(e, n, l, 2),
            t !== null && ct(t, e, 2)
    }
    function Gi(e) {
        var t = e.alternate;
        return e === re || t !== null && t === re
    }
    function $f(e, t) {
        jl = zi = !0;
        var n = e.pending;
        n === null ? t.next = t : (t.next = n.next,
        n.next = t),
        e.pending = t
    }
    function Ff(e, t, n) {
        if ((n & 4194048) !== 0) {
            var l = t.lanes;
            l &= e.pendingLanes,
            n |= l,
            t.lanes = n,
            ec(e, n)
        }
    }
    var va = {
        readContext: We,
        use: Ui,
        useCallback: De,
        useContext: De,
        useEffect: De,
        useImperativeHandle: De,
        useLayoutEffect: De,
        useInsertionEffect: De,
        useMemo: De,
        useReducer: De,
        useRef: De,
        useState: De,
        useDebugValue: De,
        useDeferredValue: De,
        useTransition: De,
        useSyncExternalStore: De,
        useId: De,
        useHostTransitionStatus: De,
        useFormState: De,
        useActionState: De,
        useOptimistic: De,
        useMemoCache: De,
        useCacheRefresh: De
    };
    va.useEffectEvent = De;
    var Wf = {
        readContext: We,
        use: Ui,
        useCallback: function(e, t) {
            return lt().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: We,
        useEffect: Lf,
        useImperativeHandle: function(e, t, n) {
            n = n != null ? n.concat([e]) : null,
            qi(4194308, 4, qf.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return qi(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            qi(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = lt();
            t = t === void 0 ? null : t;
            var l = e();
            if (In) {
                hn(!0);
                try {
                    e()
                } finally {
                    hn(!1)
                }
            }
            return n.memoizedState = [l, t],
            l
        },
        useReducer: function(e, t, n) {
            var l = lt();
            if (n !== void 0) {
                var i = n(t);
                if (In) {
                    hn(!0);
                    try {
                        n(t)
                    } finally {
                        hn(!1)
                    }
                }
            } else
                i = t;
            return l.memoizedState = l.baseState = i,
            e = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: i
            },
            l.queue = e,
            e = e.dispatch = h0.bind(null, re, e),
            [l.memoizedState, e]
        },
        useRef: function(e) {
            var t = lt();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: function(e) {
            e = Jr(e);
            var t = e.queue
              , n = Jf.bind(null, re, t);
            return t.dispatch = n,
            [e.memoizedState, n]
        },
        useDebugValue: Wr,
        useDeferredValue: function(e, t) {
            var n = lt();
            return Pr(n, e, t)
        },
        useTransition: function() {
            var e = Jr(!1);
            return e = Qf.bind(null, re, e.queue, !0, !1),
            lt().memoizedState = e,
            [!1, e]
        },
        useSyncExternalStore: function(e, t, n) {
            var l = re
              , i = lt();
            if (xe) {
                if (n === void 0)
                    throw Error(o(407));
                n = n()
            } else {
                if (n = t(),
                Ae === null)
                    throw Error(o(349));
                (ge & 127) !== 0 || xf(l, t, n)
            }
            i.memoizedState = n;
            var u = {
                value: n,
                getSnapshot: t
            };
            return i.queue = u,
            Lf(bf.bind(null, l, u, e), [e]),
            l.flags |= 2048,
            Tl(9, {
                destroy: void 0
            }, vf.bind(null, l, u, n, t), null),
            n
        },
        useId: function() {
            var e = lt()
              , t = Ae.identifierPrefix;
            if (xe) {
                var n = Ht
                  , l = Ut;
                n = (l & ~(1 << 32 - ht(l) - 1)).toString(32) + n,
                t = "_" + t + "R_" + n,
                n = Li++,
                0 < n && (t += "H" + n.toString(32)),
                t += "_"
            } else
                n = s0++,
                t = "_" + t + "r_" + n.toString(32) + "_";
            return e.memoizedState = t
        },
        useHostTransitionStatus: eu,
        useFormState: Of,
        useActionState: Of,
        useOptimistic: function(e) {
            var t = lt();
            t.memoizedState = t.baseState = e;
            var n = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null
            };
            return t.queue = n,
            t = tu.bind(null, re, !0, n),
            n.dispatch = t,
            [e, t]
        },
        useMemoCache: kr,
        useCacheRefresh: function() {
            return lt().memoizedState = d0.bind(null, re)
        },
        useEffectEvent: function(e) {
            var t = lt()
              , n = {
                impl: e
            };
            return t.memoizedState = n,
            function() {
                if ((Ee & 2) !== 0)
                    throw Error(o(440));
                return n.impl.apply(void 0, arguments)
            }
        }
    }
      , nu = {
        readContext: We,
        use: Ui,
        useCallback: Gf,
        useContext: We,
        useEffect: Fr,
        useImperativeHandle: Bf,
        useInsertionEffect: Uf,
        useLayoutEffect: Hf,
        useMemo: Yf,
        useReducer: Hi,
        useRef: zf,
        useState: function() {
            return Hi(It)
        },
        useDebugValue: Wr,
        useDeferredValue: function(e, t) {
            var n = Be();
            return Vf(n, Te.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Hi(It)[0]
              , t = Be().memoizedState;
            return [typeof e == "boolean" ? e : ya(e), t]
        },
        useSyncExternalStore: yf,
        useId: Zf,
        useHostTransitionStatus: eu,
        useFormState: Rf,
        useActionState: Rf,
        useOptimistic: function(e, t) {
            var n = Be();
            return wf(n, Te, e, t)
        },
        useMemoCache: kr,
        useCacheRefresh: Kf
    };
    nu.useEffectEvent = Df;
    var Pf = {
        readContext: We,
        use: Ui,
        useCallback: Gf,
        useContext: We,
        useEffect: Fr,
        useImperativeHandle: Bf,
        useInsertionEffect: Uf,
        useLayoutEffect: Hf,
        useMemo: Yf,
        useReducer: Kr,
        useRef: zf,
        useState: function() {
            return Kr(It)
        },
        useDebugValue: Wr,
        useDeferredValue: function(e, t) {
            var n = Be();
            return Te === null ? Pr(n, e, t) : Vf(n, Te.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Kr(It)[0]
              , t = Be().memoizedState;
            return [typeof e == "boolean" ? e : ya(e), t]
        },
        useSyncExternalStore: yf,
        useId: Zf,
        useHostTransitionStatus: eu,
        useFormState: Mf,
        useActionState: Mf,
        useOptimistic: function(e, t) {
            var n = Be();
            return Te !== null ? wf(n, Te, e, t) : (n.baseState = e,
            [e, n.queue.dispatch])
        },
        useMemoCache: kr,
        useCacheRefresh: Kf
    };
    Pf.useEffectEvent = Df;
    function lu(e, t, n, l) {
        t = e.memoizedState,
        n = n(l, t),
        n = n == null ? t : x({}, t, n),
        e.memoizedState = n,
        e.lanes === 0 && (e.updateQueue.baseState = n)
    }
    var au = {
        enqueueSetState: function(e, t, n) {
            e = e._reactInternals;
            var l = bt()
              , i = Sn(l);
            i.payload = t,
            n != null && (i.callback = n),
            t = En(e, i, l),
            t !== null && (ct(t, e, l),
            ha(t, e, l))
        },
        enqueueReplaceState: function(e, t, n) {
            e = e._reactInternals;
            var l = bt()
              , i = Sn(l);
            i.tag = 1,
            i.payload = t,
            n != null && (i.callback = n),
            t = En(e, i, l),
            t !== null && (ct(t, e, l),
            ha(t, e, l))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var n = bt()
              , l = Sn(n);
            l.tag = 2,
            t != null && (l.callback = t),
            t = En(e, l, n),
            t !== null && (ct(t, e, n),
            ha(t, e, n))
        }
    };
    function If(e, t, n, l, i, u, h) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, h) : t.prototype && t.prototype.isPureReactComponent ? !ia(n, l) || !ia(i, u) : !0
    }
    function ed(e, t, n, l) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l),
        t.state !== e && au.enqueueReplaceState(t, t.state, null)
    }
    function el(e, t) {
        var n = t;
        if ("ref"in t) {
            n = {};
            for (var l in t)
                l !== "ref" && (n[l] = t[l])
        }
        if (e = e.defaultProps) {
            n === t && (n = x({}, n));
            for (var i in e)
                n[i] === void 0 && (n[i] = e[i])
        }
        return n
    }
    function td(e) {
        xi(e)
    }
    function nd(e) {
        console.error(e)
    }
    function ld(e) {
        xi(e)
    }
    function Yi(e, t) {
        try {
            var n = e.onUncaughtError;
            n(t.value, {
                componentStack: t.stack
            })
        } catch (l) {
            setTimeout(function() {
                throw l
            })
        }
    }
    function ad(e, t, n) {
        try {
            var l = e.onCaughtError;
            l(n.value, {
                componentStack: n.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (i) {
            setTimeout(function() {
                throw i
            })
        }
    }
    function iu(e, t, n) {
        return n = Sn(n),
        n.tag = 3,
        n.payload = {
            element: null
        },
        n.callback = function() {
            Yi(e, t)
        }
        ,
        n
    }
    function id(e) {
        return e = Sn(e),
        e.tag = 3,
        e
    }
    function sd(e, t, n, l) {
        var i = n.type.getDerivedStateFromError;
        if (typeof i == "function") {
            var u = l.value;
            e.payload = function() {
                return i(u)
            }
            ,
            e.callback = function() {
                ad(t, n, l)
            }
        }
        var h = n.stateNode;
        h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
            ad(t, n, l),
            typeof i != "function" && (Tn === null ? Tn = new Set([this]) : Tn.add(this));
            var v = l.stack;
            this.componentDidCatch(l.value, {
                componentStack: v !== null ? v : ""
            })
        }
        )
    }
    function m0(e, t, n, l, i) {
        if (n.flags |= 32768,
        l !== null && typeof l == "object" && typeof l.then == "function") {
            if (t = n.alternate,
            t !== null && bl(t, n, i, !0),
            n = pt.current,
            n !== null) {
                switch (n.tag) {
                case 31:
                case 13:
                    return Tt === null ? Ii() : n.alternate === null && Ue === 0 && (Ue = 3),
                    n.flags &= -257,
                    n.flags |= 65536,
                    n.lanes = i,
                    l === Ti ? n.flags |= 16384 : (t = n.updateQueue,
                    t === null ? n.updateQueue = new Set([l]) : t.add(l),
                    Ru(e, l, i)),
                    !1;
                case 22:
                    return n.flags |= 65536,
                    l === Ti ? n.flags |= 16384 : (t = n.updateQueue,
                    t === null ? (t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l])
                    },
                    n.updateQueue = t) : (n = t.retryQueue,
                    n === null ? t.retryQueue = new Set([l]) : n.add(l)),
                    Ru(e, l, i)),
                    !1
                }
                throw Error(o(435, n.tag))
            }
            return Ru(e, l, i),
            Ii(),
            !1
        }
        if (xe)
            return t = pt.current,
            t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            t.flags |= 65536,
            t.lanes = i,
            l !== _r && (e = Error(o(422), {
                cause: l
            }),
            ua(_t(e, n)))) : (l !== _r && (t = Error(o(423), {
                cause: l
            }),
            ua(_t(t, n))),
            e = e.current.alternate,
            e.flags |= 65536,
            i &= -i,
            e.lanes |= i,
            l = _t(l, n),
            i = iu(e.stateNode, l, i),
            Dr(e, i),
            Ue !== 4 && (Ue = 2)),
            !1;
        var u = Error(o(520), {
            cause: l
        });
        if (u = _t(u, n),
        Ca === null ? Ca = [u] : Ca.push(u),
        Ue !== 4 && (Ue = 2),
        t === null)
            return !0;
        l = _t(l, n),
        n = t;
        do {
            switch (n.tag) {
            case 3:
                return n.flags |= 65536,
                e = i & -i,
                n.lanes |= e,
                e = iu(n.stateNode, l, e),
                Dr(n, e),
                !1;
            case 1:
                if (t = n.type,
                u = n.stateNode,
                (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Tn === null || !Tn.has(u))))
                    return n.flags |= 65536,
                    i &= -i,
                    n.lanes |= i,
                    i = id(i),
                    sd(i, e, n, l),
                    Dr(n, i),
                    !1
            }
            n = n.return
        } while (n !== null);
        return !1
    }
    var su = Error(o(461))
      , Ve = !1;
    function Pe(e, t, n, l) {
        t.child = e === null ? cf(t, null, n, l) : Pn(t, e.child, n, l)
    }
    function rd(e, t, n, l, i) {
        n = n.render;
        var u = t.ref;
        if ("ref"in l) {
            var h = {};
            for (var v in l)
                v !== "ref" && (h[v] = l[v])
        } else
            h = l;
        return Jn(t),
        l = Yr(e, t, n, h, u, i),
        v = Vr(),
        e !== null && !Ve ? (Qr(e, t, i),
        en(e, t, i)) : (xe && v && Er(t),
        t.flags |= 1,
        Pe(e, t, l, i),
        t.child)
    }
    function ud(e, t, n, l, i) {
        if (e === null) {
            var u = n.type;
            return typeof u == "function" && !vr(u) && u.defaultProps === void 0 && n.compare === null ? (t.tag = 15,
            t.type = u,
            od(e, t, u, l, i)) : (e = Ei(n.type, null, l, t, t.mode, i),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (u = e.child,
        !mu(e, i)) {
            var h = u.memoizedProps;
            if (n = n.compare,
            n = n !== null ? n : ia,
            n(h, l) && e.ref === t.ref)
                return en(e, t, i)
        }
        return t.flags |= 1,
        e = Jt(u, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function od(e, t, n, l, i) {
        if (e !== null) {
            var u = e.memoizedProps;
            if (ia(u, l) && e.ref === t.ref)
                if (Ve = !1,
                t.pendingProps = l = u,
                mu(e, i))
                    (e.flags & 131072) !== 0 && (Ve = !0);
                else
                    return t.lanes = e.lanes,
                    en(e, t, i)
        }
        return ru(e, t, n, l, i)
    }
    function cd(e, t, n, l) {
        var i = l.children
          , u = e !== null ? e.memoizedState : null;
        if (e === null && t.stateNode === null && (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        l.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (u = u !== null ? u.baseLanes | n : n,
                e !== null) {
                    for (l = t.child = e.child,
                    i = 0; l !== null; )
                        i = i | l.lanes | l.childLanes,
                        l = l.sibling;
                    l = i & ~u
                } else
                    l = 0,
                    t.child = null;
                return fd(e, t, u, n, l)
            }
            if ((n & 536870912) !== 0)
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                },
                e !== null && ji(t, u !== null ? u.cachePool : null),
                u !== null ? hf(t, u) : Hr(),
                mf(t);
            else
                return l = t.lanes = 536870912,
                fd(e, t, u !== null ? u.baseLanes | n : n, n, l)
        } else
            u !== null ? (ji(t, u.cachePool),
            hf(t, u),
            _n(),
            t.memoizedState = null) : (e !== null && ji(t, null),
            Hr(),
            _n());
        return Pe(e, t, i, n),
        t.child
    }
    function ba(e, t) {
        return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        t.sibling
    }
    function fd(e, t, n, l, i) {
        var u = Ar();
        return u = u === null ? null : {
            parent: Ge._currentValue,
            pool: u
        },
        t.memoizedState = {
            baseLanes: n,
            cachePool: u
        },
        e !== null && ji(t, null),
        Hr(),
        mf(t),
        e !== null && bl(e, t, l, !0),
        t.childLanes = i,
        null
    }
    function Vi(e, t) {
        return t = Xi({
            mode: t.mode,
            children: t.children
        }, e.mode),
        t.ref = e.ref,
        e.child = t,
        t.return = e,
        t
    }
    function dd(e, t, n) {
        return Pn(t, e.child, null, n),
        e = Vi(t, t.pendingProps),
        e.flags |= 2,
        yt(t),
        t.memoizedState = null,
        e
    }
    function g0(e, t, n) {
        var l = t.pendingProps
          , i = (t.flags & 128) !== 0;
        if (t.flags &= -129,
        e === null) {
            if (xe) {
                if (l.mode === "hidden")
                    return e = Vi(t, l),
                    t.lanes = 536870912,
                    ba(null, e);
                if (Br(t),
                (e = Me) ? (e = _h(e, Ct),
                e = e !== null && e.data === "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: pn !== null ? {
                        id: Ut,
                        overflow: Ht
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                n = Jc(e),
                n.return = t,
                t.child = n,
                Fe = t,
                Me = null)) : e = null,
                e === null)
                    throw xn(t);
                return t.lanes = 536870912,
                null
            }
            return Vi(t, l)
        }
        var u = e.memoizedState;
        if (u !== null) {
            var h = u.dehydrated;
            if (Br(t),
            i)
                if (t.flags & 256)
                    t.flags &= -257,
                    t = dd(e, t, n);
                else if (t.memoizedState !== null)
                    t.child = e.child,
                    t.flags |= 128,
                    t = null;
                else
                    throw Error(o(558));
            else if (Ve || bl(e, t, n, !1),
            i = (n & e.childLanes) !== 0,
            Ve || i) {
                if (l = Ae,
                l !== null && (h = tc(l, n),
                h !== 0 && h !== u.retryLane))
                    throw u.retryLane = h,
                    Xn(e, h),
                    ct(l, e, h),
                    su;
                Ii(),
                t = dd(e, t, n)
            } else
                e = u.treeContext,
                Me = Ot(h.nextSibling),
                Fe = t,
                xe = !0,
                yn = null,
                Ct = !1,
                e !== null && Wc(t, e),
                t = Vi(t, l),
                t.flags |= 4096;
            return t
        }
        return e = Jt(e.child, {
            mode: l.mode,
            children: l.children
        }),
        e.ref = t.ref,
        t.child = e,
        e.return = t,
        e
    }
    function Qi(e, t) {
        var n = t.ref;
        if (n === null)
            e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof n != "function" && typeof n != "object")
                throw Error(o(284));
            (e === null || e.ref !== n) && (t.flags |= 4194816)
        }
    }
    function ru(e, t, n, l, i) {
        return Jn(t),
        n = Yr(e, t, n, l, void 0, i),
        l = Vr(),
        e !== null && !Ve ? (Qr(e, t, i),
        en(e, t, i)) : (xe && l && Er(t),
        t.flags |= 1,
        Pe(e, t, n, i),
        t.child)
    }
    function hd(e, t, n, l, i, u) {
        return Jn(t),
        t.updateQueue = null,
        n = pf(t, l, n, i),
        gf(e),
        l = Vr(),
        e !== null && !Ve ? (Qr(e, t, u),
        en(e, t, u)) : (xe && l && Er(t),
        t.flags |= 1,
        Pe(e, t, n, u),
        t.child)
    }
    function md(e, t, n, l, i) {
        if (Jn(t),
        t.stateNode === null) {
            var u = pl
              , h = n.contextType;
            typeof h == "object" && h !== null && (u = We(h)),
            u = new n(l,u),
            t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null,
            u.updater = au,
            t.stateNode = u,
            u._reactInternals = t,
            u = t.stateNode,
            u.props = l,
            u.state = t.memoizedState,
            u.refs = {},
            zr(t),
            h = n.contextType,
            u.context = typeof h == "object" && h !== null ? We(h) : pl,
            u.state = t.memoizedState,
            h = n.getDerivedStateFromProps,
            typeof h == "function" && (lu(t, n, h, l),
            u.state = t.memoizedState),
            typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (h = u.state,
            typeof u.componentWillMount == "function" && u.componentWillMount(),
            typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(),
            h !== u.state && au.enqueueReplaceState(u, u.state, null),
            ga(t, l, u, i),
            ma(),
            u.state = t.memoizedState),
            typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            l = !0
        } else if (e === null) {
            u = t.stateNode;
            var v = t.memoizedProps
              , N = el(n, v);
            u.props = N;
            var A = u.context
              , H = n.contextType;
            h = pl,
            typeof H == "object" && H !== null && (h = We(H));
            var Y = n.getDerivedStateFromProps;
            H = typeof Y == "function" || typeof u.getSnapshotBeforeUpdate == "function",
            v = t.pendingProps !== v,
            H || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (v || A !== h) && ed(t, u, l, h),
            bn = !1;
            var M = t.memoizedState;
            u.state = M,
            ga(t, l, u, i),
            ma(),
            A = t.memoizedState,
            v || M !== A || bn ? (typeof Y == "function" && (lu(t, n, Y, l),
            A = t.memoizedState),
            (N = bn || If(t, n, N, l, M, A, h)) ? (H || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(),
            typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()),
            typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = l,
            t.memoizedState = A),
            u.props = l,
            u.state = A,
            u.context = h,
            l = N) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            l = !1)
        } else {
            u = t.stateNode,
            Lr(e, t),
            h = t.memoizedProps,
            H = el(n, h),
            u.props = H,
            Y = t.pendingProps,
            M = u.context,
            A = n.contextType,
            N = pl,
            typeof A == "object" && A !== null && (N = We(A)),
            v = n.getDerivedStateFromProps,
            (A = typeof v == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h !== Y || M !== N) && ed(t, u, l, N),
            bn = !1,
            M = t.memoizedState,
            u.state = M,
            ga(t, l, u, i),
            ma();
            var L = t.memoizedState;
            h !== Y || M !== L || bn || e !== null && e.dependencies !== null && _i(e.dependencies) ? (typeof v == "function" && (lu(t, n, v, l),
            L = t.memoizedState),
            (H = bn || If(t, n, H, l, M, L, N) || e !== null && e.dependencies !== null && _i(e.dependencies)) ? (A || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, L, N),
            typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(l, L, N)),
            typeof u.componentDidUpdate == "function" && (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && M === e.memoizedState || (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = l,
            t.memoizedState = L),
            u.props = l,
            u.state = L,
            u.context = N,
            l = H) : (typeof u.componentDidUpdate != "function" || h === e.memoizedProps && M === e.memoizedState || (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && M === e.memoizedState || (t.flags |= 1024),
            l = !1)
        }
        return u = l,
        Qi(e, t),
        l = (t.flags & 128) !== 0,
        u || l ? (u = t.stateNode,
        n = l && typeof n.getDerivedStateFromError != "function" ? null : u.render(),
        t.flags |= 1,
        e !== null && l ? (t.child = Pn(t, e.child, null, i),
        t.child = Pn(t, null, n, i)) : Pe(e, t, n, i),
        t.memoizedState = u.state,
        e = t.child) : e = en(e, t, i),
        e
    }
    function gd(e, t, n, l) {
        return Zn(),
        t.flags |= 256,
        Pe(e, t, n, l),
        t.child
    }
    var uu = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };
    function ou(e) {
        return {
            baseLanes: e,
            cachePool: lf()
        }
    }
    function cu(e, t, n) {
        return e = e !== null ? e.childLanes & ~n : 0,
        t && (e |= vt),
        e
    }
    function pd(e, t, n) {
        var l = t.pendingProps, i = !1, u = (t.flags & 128) !== 0, h;
        if ((h = u) || (h = e !== null && e.memoizedState === null ? !1 : (qe.current & 2) !== 0),
        h && (i = !0,
        t.flags &= -129),
        h = (t.flags & 32) !== 0,
        t.flags &= -33,
        e === null) {
            if (xe) {
                if (i ? wn(t) : _n(),
                (e = Me) ? (e = _h(e, Ct),
                e = e !== null && e.data !== "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: pn !== null ? {
                        id: Ut,
                        overflow: Ht
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                n = Jc(e),
                n.return = t,
                t.child = n,
                Fe = t,
                Me = null)) : e = null,
                e === null)
                    throw xn(t);
                return Zu(e) ? t.lanes = 32 : t.lanes = 536870912,
                null
            }
            var v = l.children;
            return l = l.fallback,
            i ? (_n(),
            i = t.mode,
            v = Xi({
                mode: "hidden",
                children: v
            }, i),
            l = kn(l, i, n, null),
            v.return = t,
            l.return = t,
            v.sibling = l,
            t.child = v,
            l = t.child,
            l.memoizedState = ou(n),
            l.childLanes = cu(e, h, n),
            t.memoizedState = uu,
            ba(null, l)) : (wn(t),
            fu(t, v))
        }
        var N = e.memoizedState;
        if (N !== null && (v = N.dehydrated,
        v !== null)) {
            if (u)
                t.flags & 256 ? (wn(t),
                t.flags &= -257,
                t = du(e, t, n)) : t.memoizedState !== null ? (_n(),
                t.child = e.child,
                t.flags |= 128,
                t = null) : (_n(),
                v = l.fallback,
                i = t.mode,
                l = Xi({
                    mode: "visible",
                    children: l.children
                }, i),
                v = kn(v, i, n, null),
                v.flags |= 2,
                l.return = t,
                v.return = t,
                l.sibling = v,
                t.child = l,
                Pn(t, e.child, null, n),
                l = t.child,
                l.memoizedState = ou(n),
                l.childLanes = cu(e, h, n),
                t.memoizedState = uu,
                t = ba(null, l));
            else if (wn(t),
            Zu(v)) {
                if (h = v.nextSibling && v.nextSibling.dataset,
                h)
                    var A = h.dgst;
                h = A,
                l = Error(o(419)),
                l.stack = "",
                l.digest = h,
                ua({
                    value: l,
                    source: null,
                    stack: null
                }),
                t = du(e, t, n)
            } else if (Ve || bl(e, t, n, !1),
            h = (n & e.childLanes) !== 0,
            Ve || h) {
                if (h = Ae,
                h !== null && (l = tc(h, n),
                l !== 0 && l !== N.retryLane))
                    throw N.retryLane = l,
                    Xn(e, l),
                    ct(h, e, l),
                    su;
                ku(v) || Ii(),
                t = du(e, t, n)
            } else
                ku(v) ? (t.flags |= 192,
                t.child = e.child,
                t = null) : (e = N.treeContext,
                Me = Ot(v.nextSibling),
                Fe = t,
                xe = !0,
                yn = null,
                Ct = !1,
                e !== null && Wc(t, e),
                t = fu(t, l.children),
                t.flags |= 4096);
            return t
        }
        return i ? (_n(),
        v = l.fallback,
        i = t.mode,
        N = e.child,
        A = N.sibling,
        l = Jt(N, {
            mode: "hidden",
            children: l.children
        }),
        l.subtreeFlags = N.subtreeFlags & 65011712,
        A !== null ? v = Jt(A, v) : (v = kn(v, i, n, null),
        v.flags |= 2),
        v.return = t,
        l.return = t,
        l.sibling = v,
        t.child = l,
        ba(null, l),
        l = t.child,
        v = e.child.memoizedState,
        v === null ? v = ou(n) : (i = v.cachePool,
        i !== null ? (N = Ge._currentValue,
        i = i.parent !== N ? {
            parent: N,
            pool: N
        } : i) : i = lf(),
        v = {
            baseLanes: v.baseLanes | n,
            cachePool: i
        }),
        l.memoizedState = v,
        l.childLanes = cu(e, h, n),
        t.memoizedState = uu,
        ba(e.child, l)) : (wn(t),
        n = e.child,
        e = n.sibling,
        n = Jt(n, {
            mode: "visible",
            children: l.children
        }),
        n.return = t,
        n.sibling = null,
        e !== null && (h = t.deletions,
        h === null ? (t.deletions = [e],
        t.flags |= 16) : h.push(e)),
        t.child = n,
        t.memoizedState = null,
        n)
    }
    function fu(e, t) {
        return t = Xi({
            mode: "visible",
            children: t
        }, e.mode),
        t.return = e,
        e.child = t
    }
    function Xi(e, t) {
        return e = gt(22, e, null, t),
        e.lanes = 0,
        e
    }
    function du(e, t, n) {
        return Pn(t, e.child, null, n),
        e = fu(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function yd(e, t, n) {
        e.lanes |= t;
        var l = e.alternate;
        l !== null && (l.lanes |= t),
        Cr(e.return, t, n)
    }
    function hu(e, t, n, l, i, u) {
        var h = e.memoizedState;
        h === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: n,
            tailMode: i,
            treeForkCount: u
        } : (h.isBackwards = t,
        h.rendering = null,
        h.renderingStartTime = 0,
        h.last = l,
        h.tail = n,
        h.tailMode = i,
        h.treeForkCount = u)
    }
    function xd(e, t, n) {
        var l = t.pendingProps
          , i = l.revealOrder
          , u = l.tail;
        l = l.children;
        var h = qe.current
          , v = (h & 2) !== 0;
        if (v ? (h = h & 1 | 2,
        t.flags |= 128) : h &= 1,
        Z(qe, h),
        Pe(e, t, l, n),
        l = xe ? ra : 0,
        !v && e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && yd(e, n, t);
                else if (e.tag === 19)
                    yd(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        switch (i) {
        case "forwards":
            for (n = t.child,
            i = null; n !== null; )
                e = n.alternate,
                e !== null && Mi(e) === null && (i = n),
                n = n.sibling;
            n = i,
            n === null ? (i = t.child,
            t.child = null) : (i = n.sibling,
            n.sibling = null),
            hu(t, !1, i, n, u, l);
            break;
        case "backwards":
        case "unstable_legacy-backwards":
            for (n = null,
            i = t.child,
            t.child = null; i !== null; ) {
                if (e = i.alternate,
                e !== null && Mi(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling,
                i.sibling = n,
                n = i,
                i = e
            }
            hu(t, !0, n, null, u, l);
            break;
        case "together":
            hu(t, !1, null, null, void 0, l);
            break;
        default:
            t.memoizedState = null
        }
        return t.child
    }
    function en(e, t, n) {
        if (e !== null && (t.dependencies = e.dependencies),
        Cn |= t.lanes,
        (n & t.childLanes) === 0)
            if (e !== null) {
                if (bl(e, t, n, !1),
                (n & t.childLanes) === 0)
                    return null
            } else
                return null;
        if (e !== null && t.child !== e.child)
            throw Error(o(153));
        if (t.child !== null) {
            for (e = t.child,
            n = Jt(e, e.pendingProps),
            t.child = n,
            n.return = t; e.sibling !== null; )
                e = e.sibling,
                n = n.sibling = Jt(e, e.pendingProps),
                n.return = t;
            n.sibling = null
        }
        return t.child
    }
    function mu(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies,
        !!(e !== null && _i(e)))
    }
    function p0(e, t, n) {
        switch (t.tag) {
        case 3:
            nt(t, t.stateNode.containerInfo),
            vn(t, Ge, e.memoizedState.cache),
            Zn();
            break;
        case 27:
        case 5:
            Zl(t);
            break;
        case 4:
            nt(t, t.stateNode.containerInfo);
            break;
        case 10:
            vn(t, t.type, t.memoizedProps.value);
            break;
        case 31:
            if (t.memoizedState !== null)
                return t.flags |= 128,
                Br(t),
                null;
            break;
        case 13:
            var l = t.memoizedState;
            if (l !== null)
                return l.dehydrated !== null ? (wn(t),
                t.flags |= 128,
                null) : (n & t.child.childLanes) !== 0 ? pd(e, t, n) : (wn(t),
                e = en(e, t, n),
                e !== null ? e.sibling : null);
            wn(t);
            break;
        case 19:
            var i = (e.flags & 128) !== 0;
            if (l = (n & t.childLanes) !== 0,
            l || (bl(e, t, n, !1),
            l = (n & t.childLanes) !== 0),
            i) {
                if (l)
                    return xd(e, t, n);
                t.flags |= 128
            }
            if (i = t.memoizedState,
            i !== null && (i.rendering = null,
            i.tail = null,
            i.lastEffect = null),
            Z(qe, qe.current),
            l)
                break;
            return null;
        case 22:
            return t.lanes = 0,
            cd(e, t, n, t.pendingProps);
        case 24:
            vn(t, Ge, e.memoizedState.cache)
        }
        return en(e, t, n)
    }
    function vd(e, t, n) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps)
                Ve = !0;
            else {
                if (!mu(e, n) && (t.flags & 128) === 0)
                    return Ve = !1,
                    p0(e, t, n);
                Ve = (e.flags & 131072) !== 0
            }
        else
            Ve = !1,
            xe && (t.flags & 1048576) !== 0 && Fc(t, ra, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 16:
            e: {
                var l = t.pendingProps;
                if (e = Fn(t.elementType),
                t.type = e,
                typeof e == "function")
                    vr(e) ? (l = el(e, l),
                    t.tag = 1,
                    t = md(null, t, e, l, n)) : (t.tag = 0,
                    t = ru(null, t, e, l, n));
                else {
                    if (e != null) {
                        var i = e.$$typeof;
                        if (i === J) {
                            t.tag = 11,
                            t = rd(null, t, e, l, n);
                            break e
                        } else if (i === P) {
                            t.tag = 14,
                            t = ud(null, t, e, l, n);
                            break e
                        }
                    }
                    throw t = oe(e) || e,
                    Error(o(306, t, ""))
                }
            }
            return t;
        case 0:
            return ru(e, t, t.type, t.pendingProps, n);
        case 1:
            return l = t.type,
            i = el(l, t.pendingProps),
            md(e, t, l, i, n);
        case 3:
            e: {
                if (nt(t, t.stateNode.containerInfo),
                e === null)
                    throw Error(o(387));
                l = t.pendingProps;
                var u = t.memoizedState;
                i = u.element,
                Lr(e, t),
                ga(t, l, null, n);
                var h = t.memoizedState;
                if (l = h.cache,
                vn(t, Ge, l),
                l !== u.cache && Tr(t, [Ge], n, !0),
                ma(),
                l = h.element,
                u.isDehydrated)
                    if (u = {
                        element: l,
                        isDehydrated: !1,
                        cache: h.cache
                    },
                    t.updateQueue.baseState = u,
                    t.memoizedState = u,
                    t.flags & 256) {
                        t = gd(e, t, l, n);
                        break e
                    } else if (l !== i) {
                        i = _t(Error(o(424)), t),
                        ua(i),
                        t = gd(e, t, l, n);
                        break e
                    } else
                        for (e = t.stateNode.containerInfo,
                        e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e,
                        Me = Ot(e.firstChild),
                        Fe = t,
                        xe = !0,
                        yn = null,
                        Ct = !0,
                        n = cf(t, null, l, n),
                        t.child = n; n; )
                            n.flags = n.flags & -3 | 4096,
                            n = n.sibling;
                else {
                    if (Zn(),
                    l === i) {
                        t = en(e, t, n);
                        break e
                    }
                    Pe(e, t, l, n)
                }
                t = t.child
            }
            return t;
        case 26:
            return Qi(e, t),
            e === null ? (n = Rh(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : xe || (n = t.type,
            e = t.pendingProps,
            l = ss(de.current).createElement(n),
            l[$e] = t,
            l[at] = e,
            Ie(l, n, e),
            Ze(l),
            t.stateNode = l) : t.memoizedState = Rh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState),
            null;
        case 27:
            return Zl(t),
            e === null && xe && (l = t.stateNode = Ch(t.type, t.pendingProps, de.current),
            Fe = t,
            Ct = !0,
            i = Me,
            Mn(t.type) ? (Ku = i,
            Me = Ot(l.firstChild)) : Me = i),
            Pe(e, t, t.pendingProps.children, n),
            Qi(e, t),
            e === null && (t.flags |= 4194304),
            t.child;
        case 5:
            return e === null && xe && ((i = l = Me) && (l = Z0(l, t.type, t.pendingProps, Ct),
            l !== null ? (t.stateNode = l,
            Fe = t,
            Me = Ot(l.firstChild),
            Ct = !1,
            i = !0) : i = !1),
            i || xn(t)),
            Zl(t),
            i = t.type,
            u = t.pendingProps,
            h = e !== null ? e.memoizedProps : null,
            l = u.children,
            Vu(i, u) ? l = null : h !== null && Vu(i, h) && (t.flags |= 32),
            t.memoizedState !== null && (i = Yr(e, t, r0, null, null, n),
            Da._currentValue = i),
            Qi(e, t),
            Pe(e, t, l, n),
            t.child;
        case 6:
            return e === null && xe && ((e = n = Me) && (n = K0(n, t.pendingProps, Ct),
            n !== null ? (t.stateNode = n,
            Fe = t,
            Me = null,
            e = !0) : e = !1),
            e || xn(t)),
            null;
        case 13:
            return pd(e, t, n);
        case 4:
            return nt(t, t.stateNode.containerInfo),
            l = t.pendingProps,
            e === null ? t.child = Pn(t, null, l, n) : Pe(e, t, l, n),
            t.child;
        case 11:
            return rd(e, t, t.type, t.pendingProps, n);
        case 7:
            return Pe(e, t, t.pendingProps, n),
            t.child;
        case 8:
            return Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 12:
            return Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 10:
            return l = t.pendingProps,
            vn(t, t.type, l.value),
            Pe(e, t, l.children, n),
            t.child;
        case 9:
            return i = t.type._context,
            l = t.pendingProps.children,
            Jn(t),
            i = We(i),
            l = l(i),
            t.flags |= 1,
            Pe(e, t, l, n),
            t.child;
        case 14:
            return ud(e, t, t.type, t.pendingProps, n);
        case 15:
            return od(e, t, t.type, t.pendingProps, n);
        case 19:
            return xd(e, t, n);
        case 31:
            return g0(e, t, n);
        case 22:
            return cd(e, t, n, t.pendingProps);
        case 24:
            return Jn(t),
            l = We(Ge),
            e === null ? (i = Ar(),
            i === null && (i = Ae,
            u = Or(),
            i.pooledCache = u,
            u.refCount++,
            u !== null && (i.pooledCacheLanes |= n),
            i = u),
            t.memoizedState = {
                parent: l,
                cache: i
            },
            zr(t),
            vn(t, Ge, i)) : ((e.lanes & n) !== 0 && (Lr(e, t),
            ga(t, null, null, n),
            ma()),
            i = e.memoizedState,
            u = t.memoizedState,
            i.parent !== l ? (i = {
                parent: l,
                cache: l
            },
            t.memoizedState = i,
            t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
            vn(t, Ge, l)) : (l = u.cache,
            vn(t, Ge, l),
            l !== i.cache && Tr(t, [Ge], n, !0))),
            Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 29:
            throw t.pendingProps
        }
        throw Error(o(156, t.tag))
    }
    function tn(e) {
        e.flags |= 4
    }
    function gu(e, t, n, l, i) {
        if ((t = (e.mode & 32) !== 0) && (t = !1),
        t) {
            if (e.flags |= 16777216,
            (i & 335544128) === i)
                if (e.stateNode.complete)
                    e.flags |= 8192;
                else if (Zd())
                    e.flags |= 8192;
                else
                    throw Wn = Ti,
                    Mr
        } else
            e.flags &= -16777217
    }
    function bd(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
            e.flags &= -16777217;
        else if (e.flags |= 16777216,
        !Dh(t))
            if (Zd())
                e.flags |= 8192;
            else
                throw Wn = Ti,
                Mr
    }
    function ki(e, t) {
        t !== null && (e.flags |= 4),
        e.flags & 16384 && (t = e.tag !== 22 ? Po() : 536870912,
        e.lanes |= t,
        Ml |= t)
    }
    function Sa(e, t) {
        if (!xe)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t),
                    t = t.sibling;
                n === null ? e.tail = null : n.sibling = null;
                break;
            case "collapsed":
                n = e.tail;
                for (var l = null; n !== null; )
                    n.alternate !== null && (l = n),
                    n = n.sibling;
                l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null
            }
    }
    function ze(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , n = 0
          , l = 0;
        if (t)
            for (var i = e.child; i !== null; )
                n |= i.lanes | i.childLanes,
                l |= i.subtreeFlags & 65011712,
                l |= i.flags & 65011712,
                i.return = e,
                i = i.sibling;
        else
            for (i = e.child; i !== null; )
                n |= i.lanes | i.childLanes,
                l |= i.subtreeFlags,
                l |= i.flags,
                i.return = e,
                i = i.sibling;
        return e.subtreeFlags |= l,
        e.childLanes = n,
        t
    }
    function y0(e, t, n) {
        var l = t.pendingProps;
        switch (wr(t),
        t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ze(t),
            null;
        case 1:
            return ze(t),
            null;
        case 3:
            return n = t.stateNode,
            l = null,
            e !== null && (l = e.memoizedState.cache),
            t.memoizedState.cache !== l && (t.flags |= 2048),
            Wt(Ge),
            He(),
            n.pendingContext && (n.context = n.pendingContext,
            n.pendingContext = null),
            (e === null || e.child === null) && (vl(t) ? tn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
            Nr())),
            ze(t),
            null;
        case 26:
            var i = t.type
              , u = t.memoizedState;
            return e === null ? (tn(t),
            u !== null ? (ze(t),
            bd(t, u)) : (ze(t),
            gu(t, i, null, l, n))) : u ? u !== e.memoizedState ? (tn(t),
            ze(t),
            bd(t, u)) : (ze(t),
            t.flags &= -16777217) : (e = e.memoizedProps,
            e !== l && tn(t),
            ze(t),
            gu(t, i, e, l, n)),
            null;
        case 27:
            if (ni(t),
            n = de.current,
            i = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== l && tn(t);
            else {
                if (!l) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return ze(t),
                    null
                }
                e = $.current,
                vl(t) ? Pc(t) : (e = Ch(i, l, n),
                t.stateNode = e,
                tn(t))
            }
            return ze(t),
            null;
        case 5:
            if (ni(t),
            i = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== l && tn(t);
            else {
                if (!l) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return ze(t),
                    null
                }
                if (u = $.current,
                vl(t))
                    Pc(t);
                else {
                    var h = ss(de.current);
                    switch (u) {
                    case 1:
                        u = h.createElementNS("http://www.w3.org/2000/svg", i);
                        break;
                    case 2:
                        u = h.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                        break;
                    default:
                        switch (i) {
                        case "svg":
                            u = h.createElementNS("http://www.w3.org/2000/svg", i);
                            break;
                        case "math":
                            u = h.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                            break;
                        case "script":
                            u = h.createElement("div"),
                            u.innerHTML = "<script><\/script>",
                            u = u.removeChild(u.firstChild);
                            break;
                        case "select":
                            u = typeof l.is == "string" ? h.createElement("select", {
                                is: l.is
                            }) : h.createElement("select"),
                            l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                            break;
                        default:
                            u = typeof l.is == "string" ? h.createElement(i, {
                                is: l.is
                            }) : h.createElement(i)
                        }
                    }
                    u[$e] = t,
                    u[at] = l;
                    e: for (h = t.child; h !== null; ) {
                        if (h.tag === 5 || h.tag === 6)
                            u.appendChild(h.stateNode);
                        else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                            h.child.return = h,
                            h = h.child;
                            continue
                        }
                        if (h === t)
                            break e;
                        for (; h.sibling === null; ) {
                            if (h.return === null || h.return === t)
                                break e;
                            h = h.return
                        }
                        h.sibling.return = h.return,
                        h = h.sibling
                    }
                    t.stateNode = u;
                    e: switch (Ie(u, i, l),
                    i) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        l = !!l.autoFocus;
                        break e;
                    case "img":
                        l = !0;
                        break e;
                    default:
                        l = !1
                    }
                    l && tn(t)
                }
            }
            return ze(t),
            gu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
            null;
        case 6:
            if (e && t.stateNode != null)
                e.memoizedProps !== l && tn(t);
            else {
                if (typeof l != "string" && t.stateNode === null)
                    throw Error(o(166));
                if (e = de.current,
                vl(t)) {
                    if (e = t.stateNode,
                    n = t.memoizedProps,
                    l = null,
                    i = Fe,
                    i !== null)
                        switch (i.tag) {
                        case 27:
                        case 5:
                            l = i.memoizedProps
                        }
                    e[$e] = t,
                    e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || ph(e.nodeValue, n)),
                    e || xn(t, !0)
                } else
                    e = ss(e).createTextNode(l),
                    e[$e] = t,
                    t.stateNode = e
            }
            return ze(t),
            null;
        case 31:
            if (n = t.memoizedState,
            e === null || e.memoizedState !== null) {
                if (l = vl(t),
                n !== null) {
                    if (e === null) {
                        if (!l)
                            throw Error(o(318));
                        if (e = t.memoizedState,
                        e = e !== null ? e.dehydrated : null,
                        !e)
                            throw Error(o(557));
                        e[$e] = t
                    } else
                        Zn(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    ze(t),
                    e = !1
                } else
                    n = Nr(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                    e = !0;
                if (!e)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null);
                if ((t.flags & 128) !== 0)
                    throw Error(o(558))
            }
            return ze(t),
            null;
        case 13:
            if (l = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (i = vl(t),
                l !== null && l.dehydrated !== null) {
                    if (e === null) {
                        if (!i)
                            throw Error(o(318));
                        if (i = t.memoizedState,
                        i = i !== null ? i.dehydrated : null,
                        !i)
                            throw Error(o(317));
                        i[$e] = t
                    } else
                        Zn(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    ze(t),
                    i = !1
                } else
                    i = Nr(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
                    i = !0;
                if (!i)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null)
            }
            return yt(t),
            (t.flags & 128) !== 0 ? (t.lanes = n,
            t) : (n = l !== null,
            e = e !== null && e.memoizedState !== null,
            n && (l = t.child,
            i = null,
            l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool),
            u = null,
            l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool),
            u !== i && (l.flags |= 2048)),
            n !== e && n && (t.child.flags |= 8192),
            ki(t, t.updateQueue),
            ze(t),
            null);
        case 4:
            return He(),
            e === null && Hu(t.stateNode.containerInfo),
            ze(t),
            null;
        case 10:
            return Wt(t.type),
            ze(t),
            null;
        case 19:
            if (q(qe),
            l = t.memoizedState,
            l === null)
                return ze(t),
                null;
            if (i = (t.flags & 128) !== 0,
            u = l.rendering,
            u === null)
                if (i)
                    Sa(l, !1);
                else {
                    if (Ue !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null; ) {
                            if (u = Mi(e),
                            u !== null) {
                                for (t.flags |= 128,
                                Sa(l, !1),
                                e = u.updateQueue,
                                t.updateQueue = e,
                                ki(t, e),
                                t.subtreeFlags = 0,
                                e = n,
                                n = t.child; n !== null; )
                                    Kc(n, e),
                                    n = n.sibling;
                                return Z(qe, qe.current & 1 | 2),
                                xe && $t(t, l.treeForkCount),
                                t.child
                            }
                            e = e.sibling
                        }
                    l.tail !== null && ft() > Fi && (t.flags |= 128,
                    i = !0,
                    Sa(l, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!i)
                    if (e = Mi(u),
                    e !== null) {
                        if (t.flags |= 128,
                        i = !0,
                        e = e.updateQueue,
                        t.updateQueue = e,
                        ki(t, e),
                        Sa(l, !0),
                        l.tail === null && l.tailMode === "hidden" && !u.alternate && !xe)
                            return ze(t),
                            null
                    } else
                        2 * ft() - l.renderingStartTime > Fi && n !== 536870912 && (t.flags |= 128,
                        i = !0,
                        Sa(l, !1),
                        t.lanes = 4194304);
                l.isBackwards ? (u.sibling = t.child,
                t.child = u) : (e = l.last,
                e !== null ? e.sibling = u : t.child = u,
                l.last = u)
            }
            return l.tail !== null ? (e = l.tail,
            l.rendering = e,
            l.tail = e.sibling,
            l.renderingStartTime = ft(),
            e.sibling = null,
            n = qe.current,
            Z(qe, i ? n & 1 | 2 : n & 1),
            xe && $t(t, l.treeForkCount),
            e) : (ze(t),
            null);
        case 22:
        case 23:
            return yt(t),
            qr(),
            l = t.memoizedState !== null,
            e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192),
            l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (ze(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : ze(t),
            n = t.updateQueue,
            n !== null && ki(t, n.retryQueue),
            n = null,
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool),
            l = null,
            t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool),
            l !== n && (t.flags |= 2048),
            e !== null && q($n),
            null;
        case 24:
            return n = null,
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            Wt(Ge),
            ze(t),
            null;
        case 25:
            return null;
        case 30:
            return null
        }
        throw Error(o(156, t.tag))
    }
    function x0(e, t) {
        switch (wr(t),
        t.tag) {
        case 1:
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return Wt(Ge),
            He(),
            e = t.flags,
            (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 26:
        case 27:
        case 5:
            return ni(t),
            null;
        case 31:
            if (t.memoizedState !== null) {
                if (yt(t),
                t.alternate === null)
                    throw Error(o(340));
                Zn()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 13:
            if (yt(t),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(o(340));
                Zn()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return q(qe),
            null;
        case 4:
            return He(),
            null;
        case 10:
            return Wt(t.type),
            null;
        case 22:
        case 23:
            return yt(t),
            qr(),
            e !== null && q($n),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 24:
            return Wt(Ge),
            null;
        case 25:
            return null;
        default:
            return null
        }
    }
    function Sd(e, t) {
        switch (wr(t),
        t.tag) {
        case 3:
            Wt(Ge),
            He();
            break;
        case 26:
        case 27:
        case 5:
            ni(t);
            break;
        case 4:
            He();
            break;
        case 31:
            t.memoizedState !== null && yt(t);
            break;
        case 13:
            yt(t);
            break;
        case 19:
            q(qe);
            break;
        case 10:
            Wt(t.type);
            break;
        case 22:
        case 23:
            yt(t),
            qr(),
            e !== null && q($n);
            break;
        case 24:
            Wt(Ge)
        }
    }
    function Ea(e, t) {
        try {
            var n = t.updateQueue
              , l = n !== null ? n.lastEffect : null;
            if (l !== null) {
                var i = l.next;
                n = i;
                do {
                    if ((n.tag & e) === e) {
                        l = void 0;
                        var u = n.create
                          , h = n.inst;
                        l = u(),
                        h.destroy = l
                    }
                    n = n.next
                } while (n !== i)
            }
        } catch (v) {
            Ce(t, t.return, v)
        }
    }
    function Nn(e, t, n) {
        try {
            var l = t.updateQueue
              , i = l !== null ? l.lastEffect : null;
            if (i !== null) {
                var u = i.next;
                l = u;
                do {
                    if ((l.tag & e) === e) {
                        var h = l.inst
                          , v = h.destroy;
                        if (v !== void 0) {
                            h.destroy = void 0,
                            i = t;
                            var N = n
                              , A = v;
                            try {
                                A()
                            } catch (H) {
                                Ce(i, N, H)
                            }
                        }
                    }
                    l = l.next
                } while (l !== u)
            }
        } catch (H) {
            Ce(t, t.return, H)
        }
    }
    function Ed(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var n = e.stateNode;
            try {
                df(t, n)
            } catch (l) {
                Ce(e, e.return, l)
            }
        }
    }
    function wd(e, t, n) {
        n.props = el(e.type, e.memoizedProps),
        n.state = e.memoizedState;
        try {
            n.componentWillUnmount()
        } catch (l) {
            Ce(e, t, l)
        }
    }
    function wa(e, t) {
        try {
            var n = e.ref;
            if (n !== null) {
                switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    var l = e.stateNode;
                    break;
                case 30:
                    l = e.stateNode;
                    break;
                default:
                    l = e.stateNode
                }
                typeof n == "function" ? e.refCleanup = n(l) : n.current = l
            }
        } catch (i) {
            Ce(e, t, i)
        }
    }
    function qt(e, t) {
        var n = e.ref
          , l = e.refCleanup;
        if (n !== null)
            if (typeof l == "function")
                try {
                    l()
                } catch (i) {
                    Ce(e, t, i)
                } finally {
                    e.refCleanup = null,
                    e = e.alternate,
                    e != null && (e.refCleanup = null)
                }
            else if (typeof n == "function")
                try {
                    n(null)
                } catch (i) {
                    Ce(e, t, i)
                }
            else
                n.current = null
    }
    function _d(e) {
        var t = e.type
          , n = e.memoizedProps
          , l = e.stateNode;
        try {
            e: switch (t) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                n.autoFocus && l.focus();
                break e;
            case "img":
                n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet)
            }
        } catch (i) {
            Ce(e, e.return, i)
        }
    }
    function pu(e, t, n) {
        try {
            var l = e.stateNode;
            G0(l, e.type, n, t),
            l[at] = t
        } catch (i) {
            Ce(e, e.return, i)
        }
    }
    function Nd(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Mn(e.type) || e.tag === 4
    }
    function yu(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || Nd(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.tag === 27 && Mn(e.type) || e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function xu(e, t, n) {
        var l = e.tag;
        if (l === 5 || l === 6)
            e = e.stateNode,
            t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n,
            t.appendChild(e),
            n = n._reactRootContainer,
            n != null || t.onclick !== null || (t.onclick = Zt));
        else if (l !== 4 && (l === 27 && Mn(e.type) && (n = e.stateNode,
        t = null),
        e = e.child,
        e !== null))
            for (xu(e, t, n),
            e = e.sibling; e !== null; )
                xu(e, t, n),
                e = e.sibling
    }
    function Zi(e, t, n) {
        var l = e.tag;
        if (l === 5 || l === 6)
            e = e.stateNode,
            t ? n.insertBefore(e, t) : n.appendChild(e);
        else if (l !== 4 && (l === 27 && Mn(e.type) && (n = e.stateNode),
        e = e.child,
        e !== null))
            for (Zi(e, t, n),
            e = e.sibling; e !== null; )
                Zi(e, t, n),
                e = e.sibling
    }
    function jd(e) {
        var t = e.stateNode
          , n = e.memoizedProps;
        try {
            for (var l = e.type, i = t.attributes; i.length; )
                t.removeAttributeNode(i[0]);
            Ie(t, l, n),
            t[$e] = e,
            t[at] = n
        } catch (u) {
            Ce(e, e.return, u)
        }
    }
    var nn = !1
      , Qe = !1
      , vu = !1
      , Cd = typeof WeakSet == "function" ? WeakSet : Set
      , Ke = null;
    function v0(e, t) {
        if (e = e.containerInfo,
        Gu = hs,
        e = qc(e),
        dr(e)) {
            if ("selectionStart"in e)
                var n = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    n = (n = e.ownerDocument) && n.defaultView || window;
                    var l = n.getSelection && n.getSelection();
                    if (l && l.rangeCount !== 0) {
                        n = l.anchorNode;
                        var i = l.anchorOffset
                          , u = l.focusNode;
                        l = l.focusOffset;
                        try {
                            n.nodeType,
                            u.nodeType
                        } catch {
                            n = null;
                            break e
                        }
                        var h = 0
                          , v = -1
                          , N = -1
                          , A = 0
                          , H = 0
                          , Y = e
                          , M = null;
                        t: for (; ; ) {
                            for (var L; Y !== n || i !== 0 && Y.nodeType !== 3 || (v = h + i),
                            Y !== u || l !== 0 && Y.nodeType !== 3 || (N = h + l),
                            Y.nodeType === 3 && (h += Y.nodeValue.length),
                            (L = Y.firstChild) !== null; )
                                M = Y,
                                Y = L;
                            for (; ; ) {
                                if (Y === e)
                                    break t;
                                if (M === n && ++A === i && (v = h),
                                M === u && ++H === l && (N = h),
                                (L = Y.nextSibling) !== null)
                                    break;
                                Y = M,
                                M = Y.parentNode
                            }
                            Y = L
                        }
                        n = v === -1 || N === -1 ? null : {
                            start: v,
                            end: N
                        }
                    } else
                        n = null
                }
            n = n || {
                start: 0,
                end: 0
            }
        } else
            n = null;
        for (Yu = {
            focusedElem: e,
            selectionRange: n
        },
        hs = !1,
        Ke = t; Ke !== null; )
            if (t = Ke,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                Ke = e;
            else
                for (; Ke !== null; ) {
                    switch (t = Ke,
                    u = t.alternate,
                    e = t.flags,
                    t.tag) {
                    case 0:
                        if ((e & 4) !== 0 && (e = t.updateQueue,
                        e = e !== null ? e.events : null,
                        e !== null))
                            for (n = 0; n < e.length; n++)
                                i = e[n],
                                i.ref.impl = i.nextImpl;
                        break;
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if ((e & 1024) !== 0 && u !== null) {
                            e = void 0,
                            n = t,
                            i = u.memoizedProps,
                            u = u.memoizedState,
                            l = n.stateNode;
                            try {
                                var F = el(n.type, i);
                                e = l.getSnapshotBeforeUpdate(F, u),
                                l.__reactInternalSnapshotBeforeUpdate = e
                            } catch (le) {
                                Ce(n, n.return, le)
                            }
                        }
                        break;
                    case 3:
                        if ((e & 1024) !== 0) {
                            if (e = t.stateNode.containerInfo,
                            n = e.nodeType,
                            n === 9)
                                Xu(e);
                            else if (n === 1)
                                switch (e.nodeName) {
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    Xu(e);
                                    break;
                                default:
                                    e.textContent = ""
                                }
                        }
                        break;
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        if ((e & 1024) !== 0)
                            throw Error(o(163))
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        Ke = e;
                        break
                    }
                    Ke = t.return
                }
    }
    function Td(e, t, n) {
        var l = n.flags;
        switch (n.tag) {
        case 0:
        case 11:
        case 15:
            an(e, n),
            l & 4 && Ea(5, n);
            break;
        case 1:
            if (an(e, n),
            l & 4)
                if (e = n.stateNode,
                t === null)
                    try {
                        e.componentDidMount()
                    } catch (h) {
                        Ce(n, n.return, h)
                    }
                else {
                    var i = el(n.type, t.memoizedProps);
                    t = t.memoizedState;
                    try {
                        e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                    } catch (h) {
                        Ce(n, n.return, h)
                    }
                }
            l & 64 && Ed(n),
            l & 512 && wa(n, n.return);
            break;
        case 3:
            if (an(e, n),
            l & 64 && (e = n.updateQueue,
            e !== null)) {
                if (t = null,
                n.child !== null)
                    switch (n.child.tag) {
                    case 27:
                    case 5:
                        t = n.child.stateNode;
                        break;
                    case 1:
                        t = n.child.stateNode
                    }
                try {
                    df(e, t)
                } catch (h) {
                    Ce(n, n.return, h)
                }
            }
            break;
        case 27:
            t === null && l & 4 && jd(n);
        case 26:
        case 5:
            an(e, n),
            t === null && l & 4 && _d(n),
            l & 512 && wa(n, n.return);
            break;
        case 12:
            an(e, n);
            break;
        case 31:
            an(e, n),
            l & 4 && Ad(e, n);
            break;
        case 13:
            an(e, n),
            l & 4 && Md(e, n),
            l & 64 && (e = n.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null && (n = T0.bind(null, n),
            J0(e, n))));
            break;
        case 22:
            if (l = n.memoizedState !== null || nn,
            !l) {
                t = t !== null && t.memoizedState !== null || Qe,
                i = nn;
                var u = Qe;
                nn = l,
                (Qe = t) && !u ? sn(e, n, (n.subtreeFlags & 8772) !== 0) : an(e, n),
                nn = i,
                Qe = u
            }
            break;
        case 30:
            break;
        default:
            an(e, n)
        }
    }
    function Od(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        Od(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && $s(t)),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    var Le = null
      , st = !1;
    function ln(e, t, n) {
        for (n = n.child; n !== null; )
            Rd(e, t, n),
            n = n.sibling
    }
    function Rd(e, t, n) {
        if (dt && typeof dt.onCommitFiberUnmount == "function")
            try {
                dt.onCommitFiberUnmount(Kl, n)
            } catch {}
        switch (n.tag) {
        case 26:
            Qe || qt(n, t),
            ln(e, t, n),
            n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode,
            n.parentNode.removeChild(n));
            break;
        case 27:
            Qe || qt(n, t);
            var l = Le
              , i = st;
            Mn(n.type) && (Le = n.stateNode,
            st = !1),
            ln(e, t, n),
            Ma(n.stateNode),
            Le = l,
            st = i;
            break;
        case 5:
            Qe || qt(n, t);
        case 6:
            if (l = Le,
            i = st,
            Le = null,
            ln(e, t, n),
            Le = l,
            st = i,
            Le !== null)
                if (st)
                    try {
                        (Le.nodeType === 9 ? Le.body : Le.nodeName === "HTML" ? Le.ownerDocument.body : Le).removeChild(n.stateNode)
                    } catch (u) {
                        Ce(n, t, u)
                    }
                else
                    try {
                        Le.removeChild(n.stateNode)
                    } catch (u) {
                        Ce(n, t, u)
                    }
            break;
        case 18:
            Le !== null && (st ? (e = Le,
            Eh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode),
            Gl(e)) : Eh(Le, n.stateNode));
            break;
        case 4:
            l = Le,
            i = st,
            Le = n.stateNode.containerInfo,
            st = !0,
            ln(e, t, n),
            Le = l,
            st = i;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            Nn(2, n, t),
            Qe || Nn(4, n, t),
            ln(e, t, n);
            break;
        case 1:
            Qe || (qt(n, t),
            l = n.stateNode,
            typeof l.componentWillUnmount == "function" && wd(n, t, l)),
            ln(e, t, n);
            break;
        case 21:
            ln(e, t, n);
            break;
        case 22:
            Qe = (l = Qe) || n.memoizedState !== null,
            ln(e, t, n),
            Qe = l;
            break;
        default:
            ln(e, t, n)
        }
    }
    function Ad(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null))) {
            e = e.dehydrated;
            try {
                Gl(e)
            } catch (n) {
                Ce(t, t.return, n)
            }
        }
    }
    function Md(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null))))
            try {
                Gl(e)
            } catch (n) {
                Ce(t, t.return, n)
            }
    }
    function b0(e) {
        switch (e.tag) {
        case 31:
        case 13:
        case 19:
            var t = e.stateNode;
            return t === null && (t = e.stateNode = new Cd),
            t;
        case 22:
            return e = e.stateNode,
            t = e._retryCache,
            t === null && (t = e._retryCache = new Cd),
            t;
        default:
            throw Error(o(435, e.tag))
        }
    }
    function Ki(e, t) {
        var n = b0(e);
        t.forEach(function(l) {
            if (!n.has(l)) {
                n.add(l);
                var i = O0.bind(null, e, l);
                l.then(i, i)
            }
        })
    }
    function rt(e, t) {
        var n = t.deletions;
        if (n !== null)
            for (var l = 0; l < n.length; l++) {
                var i = n[l]
                  , u = e
                  , h = t
                  , v = h;
                e: for (; v !== null; ) {
                    switch (v.tag) {
                    case 27:
                        if (Mn(v.type)) {
                            Le = v.stateNode,
                            st = !1;
                            break e
                        }
                        break;
                    case 5:
                        Le = v.stateNode,
                        st = !1;
                        break e;
                    case 3:
                    case 4:
                        Le = v.stateNode.containerInfo,
                        st = !0;
                        break e
                    }
                    v = v.return
                }
                if (Le === null)
                    throw Error(o(160));
                Rd(u, h, i),
                Le = null,
                st = !1,
                u = i.alternate,
                u !== null && (u.return = null),
                i.return = null
            }
        if (t.subtreeFlags & 13886)
            for (t = t.child; t !== null; )
                zd(t, e),
                t = t.sibling
    }
    var zt = null;
    function zd(e, t) {
        var n = e.alternate
          , l = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            rt(t, e),
            ut(e),
            l & 4 && (Nn(3, e, e.return),
            Ea(3, e),
            Nn(5, e, e.return));
            break;
        case 1:
            rt(t, e),
            ut(e),
            l & 512 && (Qe || n === null || qt(n, n.return)),
            l & 64 && nn && (e = e.updateQueue,
            e !== null && (l = e.callbacks,
            l !== null && (n = e.shared.hiddenCallbacks,
            e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
            break;
        case 26:
            var i = zt;
            if (rt(t, e),
            ut(e),
            l & 512 && (Qe || n === null || qt(n, n.return)),
            l & 4) {
                var u = n !== null ? n.memoizedState : null;
                if (l = e.memoizedState,
                n === null)
                    if (l === null)
                        if (e.stateNode === null) {
                            e: {
                                l = e.type,
                                n = e.memoizedProps,
                                i = i.ownerDocument || i;
                                t: switch (l) {
                                case "title":
                                    u = i.getElementsByTagName("title")[0],
                                    (!u || u[Fl] || u[$e] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = i.createElement(l),
                                    i.head.insertBefore(u, i.querySelector("head > title"))),
                                    Ie(u, l, n),
                                    u[$e] = e,
                                    Ze(u),
                                    l = u;
                                    break e;
                                case "link":
                                    var h = zh("link", "href", i).get(l + (n.href || ""));
                                    if (h) {
                                        for (var v = 0; v < h.length; v++)
                                            if (u = h[v],
                                            u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                                                h.splice(v, 1);
                                                break t
                                            }
                                    }
                                    u = i.createElement(l),
                                    Ie(u, l, n),
                                    i.head.appendChild(u);
                                    break;
                                case "meta":
                                    if (h = zh("meta", "content", i).get(l + (n.content || ""))) {
                                        for (v = 0; v < h.length; v++)
                                            if (u = h[v],
                                            u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                                                h.splice(v, 1);
                                                break t
                                            }
                                    }
                                    u = i.createElement(l),
                                    Ie(u, l, n),
                                    i.head.appendChild(u);
                                    break;
                                default:
                                    throw Error(o(468, l))
                                }
                                u[$e] = e,
                                Ze(u),
                                l = u
                            }
                            e.stateNode = l
                        } else
                            Lh(i, e.type, e.stateNode);
                    else
                        e.stateNode = Mh(i, l, e.memoizedProps);
                else
                    u !== l ? (u === null ? n.stateNode !== null && (n = n.stateNode,
                    n.parentNode.removeChild(n)) : u.count--,
                    l === null ? Lh(i, e.type, e.stateNode) : Mh(i, l, e.memoizedProps)) : l === null && e.stateNode !== null && pu(e, e.memoizedProps, n.memoizedProps)
            }
            break;
        case 27:
            rt(t, e),
            ut(e),
            l & 512 && (Qe || n === null || qt(n, n.return)),
            n !== null && l & 4 && pu(e, e.memoizedProps, n.memoizedProps);
            break;
        case 5:
            if (rt(t, e),
            ut(e),
            l & 512 && (Qe || n === null || qt(n, n.return)),
            e.flags & 32) {
                i = e.stateNode;
                try {
                    ol(i, "")
                } catch (F) {
                    Ce(e, e.return, F)
                }
            }
            l & 4 && e.stateNode != null && (i = e.memoizedProps,
            pu(e, i, n !== null ? n.memoizedProps : i)),
            l & 1024 && (vu = !0);
            break;
        case 6:
            if (rt(t, e),
            ut(e),
            l & 4) {
                if (e.stateNode === null)
                    throw Error(o(162));
                l = e.memoizedProps,
                n = e.stateNode;
                try {
                    n.nodeValue = l
                } catch (F) {
                    Ce(e, e.return, F)
                }
            }
            break;
        case 3:
            if (os = null,
            i = zt,
            zt = rs(t.containerInfo),
            rt(t, e),
            zt = i,
            ut(e),
            l & 4 && n !== null && n.memoizedState.isDehydrated)
                try {
                    Gl(t.containerInfo)
                } catch (F) {
                    Ce(e, e.return, F)
                }
            vu && (vu = !1,
            Ld(e));
            break;
        case 4:
            l = zt,
            zt = rs(e.stateNode.containerInfo),
            rt(t, e),
            ut(e),
            zt = l;
            break;
        case 12:
            rt(t, e),
            ut(e);
            break;
        case 31:
            rt(t, e),
            ut(e),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 13:
            rt(t, e),
            ut(e),
            e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($i = ft()),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 22:
            i = e.memoizedState !== null;
            var N = n !== null && n.memoizedState !== null
              , A = nn
              , H = Qe;
            if (nn = A || i,
            Qe = H || N,
            rt(t, e),
            Qe = H,
            nn = A,
            ut(e),
            l & 8192)
                e: for (t = e.stateNode,
                t._visibility = i ? t._visibility & -2 : t._visibility | 1,
                i && (n === null || N || nn || Qe || tl(e)),
                n = null,
                t = e; ; ) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (n === null) {
                            N = n = t;
                            try {
                                if (u = N.stateNode,
                                i)
                                    h = u.style,
                                    typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                                else {
                                    v = N.stateNode;
                                    var Y = N.memoizedProps.style
                                      , M = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                                    v.style.display = M == null || typeof M == "boolean" ? "" : ("" + M).trim()
                                }
                            } catch (F) {
                                Ce(N, N.return, F)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (n === null) {
                            N = t;
                            try {
                                N.stateNode.nodeValue = i ? "" : N.memoizedProps
                            } catch (F) {
                                Ce(N, N.return, F)
                            }
                        }
                    } else if (t.tag === 18) {
                        if (n === null) {
                            N = t;
                            try {
                                var L = N.stateNode;
                                i ? wh(L, !0) : wh(N.stateNode, !1)
                            } catch (F) {
                                Ce(N, N.return, F)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t,
                        t = t.child;
                        continue
                    }
                    if (t === e)
                        break e;
                    for (; t.sibling === null; ) {
                        if (t.return === null || t.return === e)
                            break e;
                        n === t && (n = null),
                        t = t.return
                    }
                    n === t && (n = null),
                    t.sibling.return = t.return,
                    t = t.sibling
                }
            l & 4 && (l = e.updateQueue,
            l !== null && (n = l.retryQueue,
            n !== null && (l.retryQueue = null,
            Ki(e, n))));
            break;
        case 19:
            rt(t, e),
            ut(e),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 30:
            break;
        case 21:
            break;
        default:
            rt(t, e),
            ut(e)
        }
    }
    function ut(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var n, l = e.return; l !== null; ) {
                    if (Nd(l)) {
                        n = l;
                        break
                    }
                    l = l.return
                }
                if (n == null)
                    throw Error(o(160));
                switch (n.tag) {
                case 27:
                    var i = n.stateNode
                      , u = yu(e);
                    Zi(e, u, i);
                    break;
                case 5:
                    var h = n.stateNode;
                    n.flags & 32 && (ol(h, ""),
                    n.flags &= -33);
                    var v = yu(e);
                    Zi(e, v, h);
                    break;
                case 3:
                case 4:
                    var N = n.stateNode.containerInfo
                      , A = yu(e);
                    xu(e, A, N);
                    break;
                default:
                    throw Error(o(161))
                }
            } catch (H) {
                Ce(e, e.return, H)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function Ld(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null; ) {
                var t = e;
                Ld(t),
                t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
                e = e.sibling
            }
    }
    function an(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null; )
                Td(e, t.alternate, t),
                t = t.sibling
    }
    function tl(e) {
        for (e = e.child; e !== null; ) {
            var t = e;
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                Nn(4, t, t.return),
                tl(t);
                break;
            case 1:
                qt(t, t.return);
                var n = t.stateNode;
                typeof n.componentWillUnmount == "function" && wd(t, t.return, n),
                tl(t);
                break;
            case 27:
                Ma(t.stateNode);
            case 26:
            case 5:
                qt(t, t.return),
                tl(t);
                break;
            case 22:
                t.memoizedState === null && tl(t);
                break;
            case 30:
                tl(t);
                break;
            default:
                tl(t)
            }
            e = e.sibling
        }
    }
    function sn(e, t, n) {
        for (n = n && (t.subtreeFlags & 8772) !== 0,
        t = t.child; t !== null; ) {
            var l = t.alternate
              , i = e
              , u = t
              , h = u.flags;
            switch (u.tag) {
            case 0:
            case 11:
            case 15:
                sn(i, u, n),
                Ea(4, u);
                break;
            case 1:
                if (sn(i, u, n),
                l = u,
                i = l.stateNode,
                typeof i.componentDidMount == "function")
                    try {
                        i.componentDidMount()
                    } catch (A) {
                        Ce(l, l.return, A)
                    }
                if (l = u,
                i = l.updateQueue,
                i !== null) {
                    var v = l.stateNode;
                    try {
                        var N = i.shared.hiddenCallbacks;
                        if (N !== null)
                            for (i.shared.hiddenCallbacks = null,
                            i = 0; i < N.length; i++)
                                ff(N[i], v)
                    } catch (A) {
                        Ce(l, l.return, A)
                    }
                }
                n && h & 64 && Ed(u),
                wa(u, u.return);
                break;
            case 27:
                jd(u);
            case 26:
            case 5:
                sn(i, u, n),
                n && l === null && h & 4 && _d(u),
                wa(u, u.return);
                break;
            case 12:
                sn(i, u, n);
                break;
            case 31:
                sn(i, u, n),
                n && h & 4 && Ad(i, u);
                break;
            case 13:
                sn(i, u, n),
                n && h & 4 && Md(i, u);
                break;
            case 22:
                u.memoizedState === null && sn(i, u, n),
                wa(u, u.return);
                break;
            case 30:
                break;
            default:
                sn(i, u, n)
            }
            t = t.sibling
        }
    }
    function bu(e, t) {
        var n = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool),
        e = null,
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++,
        n != null && oa(n))
    }
    function Su(e, t) {
        e = null,
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        t = t.memoizedState.cache,
        t !== e && (t.refCount++,
        e != null && oa(e))
    }
    function Lt(e, t, n, l) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; )
                Dd(e, t, n, l),
                t = t.sibling
    }
    function Dd(e, t, n, l) {
        var i = t.flags;
        switch (t.tag) {
        case 0:
        case 11:
        case 15:
            Lt(e, t, n, l),
            i & 2048 && Ea(9, t);
            break;
        case 1:
            Lt(e, t, n, l);
            break;
        case 3:
            Lt(e, t, n, l),
            i & 2048 && (e = null,
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            t = t.memoizedState.cache,
            t !== e && (t.refCount++,
            e != null && oa(e)));
            break;
        case 12:
            if (i & 2048) {
                Lt(e, t, n, l),
                e = t.stateNode;
                try {
                    var u = t.memoizedProps
                      , h = u.id
                      , v = u.onPostCommit;
                    typeof v == "function" && v(h, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                } catch (N) {
                    Ce(t, t.return, N)
                }
            } else
                Lt(e, t, n, l);
            break;
        case 31:
            Lt(e, t, n, l);
            break;
        case 13:
            Lt(e, t, n, l);
            break;
        case 23:
            break;
        case 22:
            u = t.stateNode,
            h = t.alternate,
            t.memoizedState !== null ? u._visibility & 2 ? Lt(e, t, n, l) : _a(e, t) : u._visibility & 2 ? Lt(e, t, n, l) : (u._visibility |= 2,
            Ol(e, t, n, l, (t.subtreeFlags & 10256) !== 0 || !1)),
            i & 2048 && bu(h, t);
            break;
        case 24:
            Lt(e, t, n, l),
            i & 2048 && Su(t.alternate, t);
            break;
        default:
            Lt(e, t, n, l)
        }
    }
    function Ol(e, t, n, l, i) {
        for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1),
        t = t.child; t !== null; ) {
            var u = e
              , h = t
              , v = n
              , N = l
              , A = h.flags;
            switch (h.tag) {
            case 0:
            case 11:
            case 15:
                Ol(u, h, v, N, i),
                Ea(8, h);
                break;
            case 23:
                break;
            case 22:
                var H = h.stateNode;
                h.memoizedState !== null ? H._visibility & 2 ? Ol(u, h, v, N, i) : _a(u, h) : (H._visibility |= 2,
                Ol(u, h, v, N, i)),
                i && A & 2048 && bu(h.alternate, h);
                break;
            case 24:
                Ol(u, h, v, N, i),
                i && A & 2048 && Su(h.alternate, h);
                break;
            default:
                Ol(u, h, v, N, i)
            }
            t = t.sibling
        }
    }
    function _a(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; ) {
                var n = e
                  , l = t
                  , i = l.flags;
                switch (l.tag) {
                case 22:
                    _a(n, l),
                    i & 2048 && bu(l.alternate, l);
                    break;
                case 24:
                    _a(n, l),
                    i & 2048 && Su(l.alternate, l);
                    break;
                default:
                    _a(n, l)
                }
                t = t.sibling
            }
    }
    var Na = 8192;
    function Rl(e, t, n) {
        if (e.subtreeFlags & Na)
            for (e = e.child; e !== null; )
                Ud(e, t, n),
                e = e.sibling
    }
    function Ud(e, t, n) {
        switch (e.tag) {
        case 26:
            Rl(e, t, n),
            e.flags & Na && e.memoizedState !== null && sy(n, zt, e.memoizedState, e.memoizedProps);
            break;
        case 5:
            Rl(e, t, n);
            break;
        case 3:
        case 4:
            var l = zt;
            zt = rs(e.stateNode.containerInfo),
            Rl(e, t, n),
            zt = l;
            break;
        case 22:
            e.memoizedState === null && (l = e.alternate,
            l !== null && l.memoizedState !== null ? (l = Na,
            Na = 16777216,
            Rl(e, t, n),
            Na = l) : Rl(e, t, n));
            break;
        default:
            Rl(e, t, n)
        }
    }
    function Hd(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child,
        e !== null)) {
            t.child = null;
            do
                t = e.sibling,
                e.sibling = null,
                e = t;
            while (e !== null)
        }
    }
    function ja(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var n = 0; n < t.length; n++) {
                    var l = t[n];
                    Ke = l,
                    Bd(l, e)
                }
            Hd(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; )
                qd(e),
                e = e.sibling
    }
    function qd(e) {
        switch (e.tag) {
        case 0:
        case 11:
        case 15:
            ja(e),
            e.flags & 2048 && Nn(9, e, e.return);
            break;
        case 3:
            ja(e);
            break;
        case 12:
            ja(e);
            break;
        case 22:
            var t = e.stateNode;
            e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3,
            Ji(e)) : ja(e);
            break;
        default:
            ja(e)
        }
    }
    function Ji(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var n = 0; n < t.length; n++) {
                    var l = t[n];
                    Ke = l,
                    Bd(l, e)
                }
            Hd(e)
        }
        for (e = e.child; e !== null; ) {
            switch (t = e,
            t.tag) {
            case 0:
            case 11:
            case 15:
                Nn(8, t, t.return),
                Ji(t);
                break;
            case 22:
                n = t.stateNode,
                n._visibility & 2 && (n._visibility &= -3,
                Ji(t));
                break;
            default:
                Ji(t)
            }
            e = e.sibling
        }
    }
    function Bd(e, t) {
        for (; Ke !== null; ) {
            var n = Ke;
            switch (n.tag) {
            case 0:
            case 11:
            case 15:
                Nn(8, n, t);
                break;
            case 23:
            case 22:
                if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
                    var l = n.memoizedState.cachePool.pool;
                    l != null && l.refCount++
                }
                break;
            case 24:
                oa(n.memoizedState.cache)
            }
            if (l = n.child,
            l !== null)
                l.return = n,
                Ke = l;
            else
                e: for (n = e; Ke !== null; ) {
                    l = Ke;
                    var i = l.sibling
                      , u = l.return;
                    if (Od(l),
                    l === n) {
                        Ke = null;
                        break e
                    }
                    if (i !== null) {
                        i.return = u,
                        Ke = i;
                        break e
                    }
                    Ke = u
                }
        }
    }
    var S0 = {
        getCacheForType: function(e) {
            var t = We(Ge)
              , n = t.data.get(e);
            return n === void 0 && (n = e(),
            t.data.set(e, n)),
            n
        },
        cacheSignal: function() {
            return We(Ge).controller.signal
        }
    }
      , E0 = typeof WeakMap == "function" ? WeakMap : Map
      , Ee = 0
      , Ae = null
      , he = null
      , ge = 0
      , je = 0
      , xt = null
      , jn = !1
      , Al = !1
      , Eu = !1
      , rn = 0
      , Ue = 0
      , Cn = 0
      , nl = 0
      , wu = 0
      , vt = 0
      , Ml = 0
      , Ca = null
      , ot = null
      , _u = !1
      , $i = 0
      , Gd = 0
      , Fi = 1 / 0
      , Wi = null
      , Tn = null
      , Xe = 0
      , On = null
      , zl = null
      , un = 0
      , Nu = 0
      , ju = null
      , Yd = null
      , Ta = 0
      , Cu = null;
    function bt() {
        return (Ee & 2) !== 0 && ge !== 0 ? ge & -ge : D.T !== null ? zu() : nc()
    }
    function Vd() {
        if (vt === 0)
            if ((ge & 536870912) === 0 || xe) {
                var e = ii;
                ii <<= 1,
                (ii & 3932160) === 0 && (ii = 262144),
                vt = e
            } else
                vt = 536870912;
        return e = pt.current,
        e !== null && (e.flags |= 32),
        vt
    }
    function ct(e, t, n) {
        (e === Ae && (je === 2 || je === 9) || e.cancelPendingCommit !== null) && (Ll(e, 0),
        Rn(e, ge, vt, !1)),
        $l(e, n),
        ((Ee & 2) === 0 || e !== Ae) && (e === Ae && ((Ee & 2) === 0 && (nl |= n),
        Ue === 4 && Rn(e, ge, vt, !1)),
        Bt(e))
    }
    function Qd(e, t, n) {
        if ((Ee & 6) !== 0)
            throw Error(o(327));
        var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Jl(e, t)
          , i = l ? N0(e, t) : Ou(e, t, !0)
          , u = l;
        do {
            if (i === 0) {
                Al && !l && Rn(e, t, 0, !1);
                break
            } else {
                if (n = e.current.alternate,
                u && !w0(n)) {
                    i = Ou(e, t, !1),
                    u = !1;
                    continue
                }
                if (i === 2) {
                    if (u = t,
                    e.errorRecoveryDisabledLanes & u)
                        var h = 0;
                    else
                        h = e.pendingLanes & -536870913,
                        h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
                    if (h !== 0) {
                        t = h;
                        e: {
                            var v = e;
                            i = Ca;
                            var N = v.current.memoizedState.isDehydrated;
                            if (N && (Ll(v, h).flags |= 256),
                            h = Ou(v, h, !1),
                            h !== 2) {
                                if (Eu && !N) {
                                    v.errorRecoveryDisabledLanes |= u,
                                    nl |= u,
                                    i = 4;
                                    break e
                                }
                                u = ot,
                                ot = i,
                                u !== null && (ot === null ? ot = u : ot.push.apply(ot, u))
                            }
                            i = h
                        }
                        if (u = !1,
                        i !== 2)
                            continue
                    }
                }
                if (i === 1) {
                    Ll(e, 0),
                    Rn(e, t, 0, !0);
                    break
                }
                e: {
                    switch (l = e,
                    u = i,
                    u) {
                    case 0:
                    case 1:
                        throw Error(o(345));
                    case 4:
                        if ((t & 4194048) !== t)
                            break;
                    case 6:
                        Rn(l, t, vt, !jn);
                        break e;
                    case 2:
                        ot = null;
                        break;
                    case 3:
                    case 5:
                        break;
                    default:
                        throw Error(o(329))
                    }
                    if ((t & 62914560) === t && (i = $i + 300 - ft(),
                    10 < i)) {
                        if (Rn(l, t, vt, !jn),
                        ri(l, 0, !0) !== 0)
                            break e;
                        un = t,
                        l.timeoutHandle = bh(Xd.bind(null, l, n, ot, Wi, _u, t, vt, nl, Ml, jn, u, "Throttled", -0, 0), i);
                        break e
                    }
                    Xd(l, n, ot, Wi, _u, t, vt, nl, Ml, jn, u, null, -0, 0)
                }
            }
            break
        } while (!0);
        Bt(e)
    }
    function Xd(e, t, n, l, i, u, h, v, N, A, H, Y, M, L) {
        if (e.timeoutHandle = -1,
        Y = t.subtreeFlags,
        Y & 8192 || (Y & 16785408) === 16785408) {
            Y = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Zt
            },
            Ud(t, u, Y);
            var F = (u & 62914560) === u ? $i - ft() : (u & 4194048) === u ? Gd - ft() : 0;
            if (F = ry(Y, F),
            F !== null) {
                un = u,
                e.cancelPendingCommit = F(Pd.bind(null, e, t, u, n, l, i, h, v, N, H, Y, null, M, L)),
                Rn(e, u, h, !A);
                return
            }
        }
        Pd(e, t, u, n, l, i, h, v, N)
    }
    function w0(e) {
        for (var t = e; ; ) {
            var n = t.tag;
            if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue,
            n !== null && (n = n.stores,
            n !== null)))
                for (var l = 0; l < n.length; l++) {
                    var i = n[l]
                      , u = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!mt(u(), i))
                            return !1
                    } catch {
                        return !1
                    }
                }
            if (n = t.child,
            t.subtreeFlags & 16384 && n !== null)
                n.return = t,
                t = n;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function Rn(e, t, n, l) {
        t &= ~wu,
        t &= ~nl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        l && (e.warmLanes |= t),
        l = e.expirationTimes;
        for (var i = t; 0 < i; ) {
            var u = 31 - ht(i)
              , h = 1 << u;
            l[u] = -1,
            i &= ~h
        }
        n !== 0 && Io(e, n, t)
    }
    function Pi() {
        return (Ee & 6) === 0 ? (Oa(0),
        !1) : !0
    }
    function Tu() {
        if (he !== null) {
            if (je === 0)
                var e = he.return;
            else
                e = he,
                Ft = Kn = null,
                Xr(e),
                _l = null,
                fa = 0,
                e = he;
            for (; e !== null; )
                Sd(e.alternate, e),
                e = e.return;
            he = null
        }
    }
    function Ll(e, t) {
        var n = e.timeoutHandle;
        n !== -1 && (e.timeoutHandle = -1,
        Q0(n)),
        n = e.cancelPendingCommit,
        n !== null && (e.cancelPendingCommit = null,
        n()),
        un = 0,
        Tu(),
        Ae = e,
        he = n = Jt(e.current, null),
        ge = t,
        je = 0,
        xt = null,
        jn = !1,
        Al = Jl(e, t),
        Eu = !1,
        Ml = vt = wu = nl = Cn = Ue = 0,
        ot = Ca = null,
        _u = !1,
        (t & 8) !== 0 && (t |= t & 32);
        var l = e.entangledLanes;
        if (l !== 0)
            for (e = e.entanglements,
            l &= t; 0 < l; ) {
                var i = 31 - ht(l)
                  , u = 1 << i;
                t |= e[i],
                l &= ~u
            }
        return rn = t,
        vi(),
        n
    }
    function kd(e, t) {
        re = null,
        D.H = va,
        t === wl || t === Ci ? (t = rf(),
        je = 3) : t === Mr ? (t = rf(),
        je = 4) : je = t === su ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1,
        xt = t,
        he === null && (Ue = 1,
        Yi(e, _t(t, e.current)))
    }
    function Zd() {
        var e = pt.current;
        return e === null ? !0 : (ge & 4194048) === ge ? Tt === null : (ge & 62914560) === ge || (ge & 536870912) !== 0 ? e === Tt : !1
    }
    function Kd() {
        var e = D.H;
        return D.H = va,
        e === null ? va : e
    }
    function Jd() {
        var e = D.A;
        return D.A = S0,
        e
    }
    function Ii() {
        Ue = 4,
        jn || (ge & 4194048) !== ge && pt.current !== null || (Al = !0),
        (Cn & 134217727) === 0 && (nl & 134217727) === 0 || Ae === null || Rn(Ae, ge, vt, !1)
    }
    function Ou(e, t, n) {
        var l = Ee;
        Ee |= 2;
        var i = Kd()
          , u = Jd();
        (Ae !== e || ge !== t) && (Wi = null,
        Ll(e, t)),
        t = !1;
        var h = Ue;
        e: do
            try {
                if (je !== 0 && he !== null) {
                    var v = he
                      , N = xt;
                    switch (je) {
                    case 8:
                        Tu(),
                        h = 6;
                        break e;
                    case 3:
                    case 2:
                    case 9:
                    case 6:
                        pt.current === null && (t = !0);
                        var A = je;
                        if (je = 0,
                        xt = null,
                        Dl(e, v, N, A),
                        n && Al) {
                            h = 0;
                            break e
                        }
                        break;
                    default:
                        A = je,
                        je = 0,
                        xt = null,
                        Dl(e, v, N, A)
                    }
                }
                _0(),
                h = Ue;
                break
            } catch (H) {
                kd(e, H)
            }
        while (!0);
        return t && e.shellSuspendCounter++,
        Ft = Kn = null,
        Ee = l,
        D.H = i,
        D.A = u,
        he === null && (Ae = null,
        ge = 0,
        vi()),
        h
    }
    function _0() {
        for (; he !== null; )
            $d(he)
    }
    function N0(e, t) {
        var n = Ee;
        Ee |= 2;
        var l = Kd()
          , i = Jd();
        Ae !== e || ge !== t ? (Wi = null,
        Fi = ft() + 500,
        Ll(e, t)) : Al = Jl(e, t);
        e: do
            try {
                if (je !== 0 && he !== null) {
                    t = he;
                    var u = xt;
                    t: switch (je) {
                    case 1:
                        je = 0,
                        xt = null,
                        Dl(e, t, u, 1);
                        break;
                    case 2:
                    case 9:
                        if (af(u)) {
                            je = 0,
                            xt = null,
                            Fd(t);
                            break
                        }
                        t = function() {
                            je !== 2 && je !== 9 || Ae !== e || (je = 7),
                            Bt(e)
                        }
                        ,
                        u.then(t, t);
                        break e;
                    case 3:
                        je = 7;
                        break e;
                    case 4:
                        je = 5;
                        break e;
                    case 7:
                        af(u) ? (je = 0,
                        xt = null,
                        Fd(t)) : (je = 0,
                        xt = null,
                        Dl(e, t, u, 7));
                        break;
                    case 5:
                        var h = null;
                        switch (he.tag) {
                        case 26:
                            h = he.memoizedState;
                        case 5:
                        case 27:
                            var v = he;
                            if (h ? Dh(h) : v.stateNode.complete) {
                                je = 0,
                                xt = null;
                                var N = v.sibling;
                                if (N !== null)
                                    he = N;
                                else {
                                    var A = v.return;
                                    A !== null ? (he = A,
                                    es(A)) : he = null
                                }
                                break t
                            }
                        }
                        je = 0,
                        xt = null,
                        Dl(e, t, u, 5);
                        break;
                    case 6:
                        je = 0,
                        xt = null,
                        Dl(e, t, u, 6);
                        break;
                    case 8:
                        Tu(),
                        Ue = 6;
                        break e;
                    default:
                        throw Error(o(462))
                    }
                }
                j0();
                break
            } catch (H) {
                kd(e, H)
            }
        while (!0);
        return Ft = Kn = null,
        D.H = l,
        D.A = i,
        Ee = n,
        he !== null ? 0 : (Ae = null,
        ge = 0,
        vi(),
        Ue)
    }
    function j0() {
        for (; he !== null && !$g(); )
            $d(he)
    }
    function $d(e) {
        var t = vd(e.alternate, e, rn);
        e.memoizedProps = e.pendingProps,
        t === null ? es(e) : he = t
    }
    function Fd(e) {
        var t = e
          , n = t.alternate;
        switch (t.tag) {
        case 15:
        case 0:
            t = hd(n, t, t.pendingProps, t.type, void 0, ge);
            break;
        case 11:
            t = hd(n, t, t.pendingProps, t.type.render, t.ref, ge);
            break;
        case 5:
            Xr(t);
        default:
            Sd(n, t),
            t = he = Kc(t, rn),
            t = vd(n, t, rn)
        }
        e.memoizedProps = e.pendingProps,
        t === null ? es(e) : he = t
    }
    function Dl(e, t, n, l) {
        Ft = Kn = null,
        Xr(t),
        _l = null,
        fa = 0;
        var i = t.return;
        try {
            if (m0(e, i, t, n, ge)) {
                Ue = 1,
                Yi(e, _t(n, e.current)),
                he = null;
                return
            }
        } catch (u) {
            if (i !== null)
                throw he = i,
                u;
            Ue = 1,
            Yi(e, _t(n, e.current)),
            he = null;
            return
        }
        t.flags & 32768 ? (xe || l === 1 ? e = !0 : Al || (ge & 536870912) !== 0 ? e = !1 : (jn = e = !0,
        (l === 2 || l === 9 || l === 3 || l === 6) && (l = pt.current,
        l !== null && l.tag === 13 && (l.flags |= 16384))),
        Wd(t, e)) : es(t)
    }
    function es(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                Wd(t, jn);
                return
            }
            e = t.return;
            var n = y0(t.alternate, t, rn);
            if (n !== null) {
                he = n;
                return
            }
            if (t = t.sibling,
            t !== null) {
                he = t;
                return
            }
            he = t = e
        } while (t !== null);
        Ue === 0 && (Ue = 5)
    }
    function Wd(e, t) {
        do {
            var n = x0(e.alternate, e);
            if (n !== null) {
                n.flags &= 32767,
                he = n;
                return
            }
            if (n = e.return,
            n !== null && (n.flags |= 32768,
            n.subtreeFlags = 0,
            n.deletions = null),
            !t && (e = e.sibling,
            e !== null)) {
                he = e;
                return
            }
            he = e = n
        } while (e !== null);
        Ue = 6,
        he = null
    }
    function Pd(e, t, n, l, i, u, h, v, N) {
        e.cancelPendingCommit = null;
        do
            ts();
        while (Xe !== 0);
        if ((Ee & 6) !== 0)
            throw Error(o(327));
        if (t !== null) {
            if (t === e.current)
                throw Error(o(177));
            if (u = t.lanes | t.childLanes,
            u |= yr,
            ip(e, n, u, h, v, N),
            e === Ae && (he = Ae = null,
            ge = 0),
            zl = t,
            On = e,
            un = n,
            Nu = u,
            ju = i,
            Yd = l,
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null,
            e.callbackPriority = 0,
            R0(li, function() {
                return lh(),
                null
            })) : (e.callbackNode = null,
            e.callbackPriority = 0),
            l = (t.flags & 13878) !== 0,
            (t.subtreeFlags & 13878) !== 0 || l) {
                l = D.T,
                D.T = null,
                i = X.p,
                X.p = 2,
                h = Ee,
                Ee |= 4;
                try {
                    v0(e, t, n)
                } finally {
                    Ee = h,
                    X.p = i,
                    D.T = l
                }
            }
            Xe = 1,
            Id(),
            eh(),
            th()
        }
    }
    function Id() {
        if (Xe === 1) {
            Xe = 0;
            var e = On
              , t = zl
              , n = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || n) {
                n = D.T,
                D.T = null;
                var l = X.p;
                X.p = 2;
                var i = Ee;
                Ee |= 4;
                try {
                    zd(t, e);
                    var u = Yu
                      , h = qc(e.containerInfo)
                      , v = u.focusedElem
                      , N = u.selectionRange;
                    if (h !== v && v && v.ownerDocument && Hc(v.ownerDocument.documentElement, v)) {
                        if (N !== null && dr(v)) {
                            var A = N.start
                              , H = N.end;
                            if (H === void 0 && (H = A),
                            "selectionStart"in v)
                                v.selectionStart = A,
                                v.selectionEnd = Math.min(H, v.value.length);
                            else {
                                var Y = v.ownerDocument || document
                                  , M = Y && Y.defaultView || window;
                                if (M.getSelection) {
                                    var L = M.getSelection()
                                      , F = v.textContent.length
                                      , le = Math.min(N.start, F)
                                      , Re = N.end === void 0 ? le : Math.min(N.end, F);
                                    !L.extend && le > Re && (h = Re,
                                    Re = le,
                                    le = h);
                                    var O = Uc(v, le)
                                      , C = Uc(v, Re);
                                    if (O && C && (L.rangeCount !== 1 || L.anchorNode !== O.node || L.anchorOffset !== O.offset || L.focusNode !== C.node || L.focusOffset !== C.offset)) {
                                        var R = Y.createRange();
                                        R.setStart(O.node, O.offset),
                                        L.removeAllRanges(),
                                        le > Re ? (L.addRange(R),
                                        L.extend(C.node, C.offset)) : (R.setEnd(C.node, C.offset),
                                        L.addRange(R))
                                    }
                                }
                            }
                        }
                        for (Y = [],
                        L = v; L = L.parentNode; )
                            L.nodeType === 1 && Y.push({
                                element: L,
                                left: L.scrollLeft,
                                top: L.scrollTop
                            });
                        for (typeof v.focus == "function" && v.focus(),
                        v = 0; v < Y.length; v++) {
                            var B = Y[v];
                            B.element.scrollLeft = B.left,
                            B.element.scrollTop = B.top
                        }
                    }
                    hs = !!Gu,
                    Yu = Gu = null
                } finally {
                    Ee = i,
                    X.p = l,
                    D.T = n
                }
            }
            e.current = t,
            Xe = 2
        }
    }
    function eh() {
        if (Xe === 2) {
            Xe = 0;
            var e = On
              , t = zl
              , n = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || n) {
                n = D.T,
                D.T = null;
                var l = X.p;
                X.p = 2;
                var i = Ee;
                Ee |= 4;
                try {
                    Td(e, t.alternate, t)
                } finally {
                    Ee = i,
                    X.p = l,
                    D.T = n
                }
            }
            Xe = 3
        }
    }
    function th() {
        if (Xe === 4 || Xe === 3) {
            Xe = 0,
            Fg();
            var e = On
              , t = zl
              , n = un
              , l = Yd;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Xe = 5 : (Xe = 0,
            zl = On = null,
            nh(e, e.pendingLanes));
            var i = e.pendingLanes;
            if (i === 0 && (Tn = null),
            Ks(n),
            t = t.stateNode,
            dt && typeof dt.onCommitFiberRoot == "function")
                try {
                    dt.onCommitFiberRoot(Kl, t, void 0, (t.current.flags & 128) === 128)
                } catch {}
            if (l !== null) {
                t = D.T,
                i = X.p,
                X.p = 2,
                D.T = null;
                try {
                    for (var u = e.onRecoverableError, h = 0; h < l.length; h++) {
                        var v = l[h];
                        u(v.value, {
                            componentStack: v.stack
                        })
                    }
                } finally {
                    D.T = t,
                    X.p = i
                }
            }
            (un & 3) !== 0 && ts(),
            Bt(e),
            i = e.pendingLanes,
            (n & 261930) !== 0 && (i & 42) !== 0 ? e === Cu ? Ta++ : (Ta = 0,
            Cu = e) : Ta = 0,
            Oa(0)
        }
    }
    function nh(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache,
        t != null && (e.pooledCache = null,
        oa(t)))
    }
    function ts() {
        return Id(),
        eh(),
        th(),
        lh()
    }
    function lh() {
        if (Xe !== 5)
            return !1;
        var e = On
          , t = Nu;
        Nu = 0;
        var n = Ks(un)
          , l = D.T
          , i = X.p;
        try {
            X.p = 32 > n ? 32 : n,
            D.T = null,
            n = ju,
            ju = null;
            var u = On
              , h = un;
            if (Xe = 0,
            zl = On = null,
            un = 0,
            (Ee & 6) !== 0)
                throw Error(o(331));
            var v = Ee;
            if (Ee |= 4,
            qd(u.current),
            Dd(u, u.current, h, n),
            Ee = v,
            Oa(0, !1),
            dt && typeof dt.onPostCommitFiberRoot == "function")
                try {
                    dt.onPostCommitFiberRoot(Kl, u)
                } catch {}
            return !0
        } finally {
            X.p = i,
            D.T = l,
            nh(e, t)
        }
    }
    function ah(e, t, n) {
        t = _t(n, t),
        t = iu(e.stateNode, t, 2),
        e = En(e, t, 2),
        e !== null && ($l(e, 2),
        Bt(e))
    }
    function Ce(e, t, n) {
        if (e.tag === 3)
            ah(e, e, n);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    ah(t, e, n);
                    break
                } else if (t.tag === 1) {
                    var l = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Tn === null || !Tn.has(l))) {
                        e = _t(n, e),
                        n = id(2),
                        l = En(t, n, 2),
                        l !== null && (sd(n, l, t, e),
                        $l(l, 2),
                        Bt(l));
                        break
                    }
                }
                t = t.return
            }
    }
    function Ru(e, t, n) {
        var l = e.pingCache;
        if (l === null) {
            l = e.pingCache = new E0;
            var i = new Set;
            l.set(t, i)
        } else
            i = l.get(t),
            i === void 0 && (i = new Set,
            l.set(t, i));
        i.has(n) || (Eu = !0,
        i.add(n),
        e = C0.bind(null, e, t, n),
        t.then(e, e))
    }
    function C0(e, t, n) {
        var l = e.pingCache;
        l !== null && l.delete(t),
        e.pingedLanes |= e.suspendedLanes & n,
        e.warmLanes &= ~n,
        Ae === e && (ge & n) === n && (Ue === 4 || Ue === 3 && (ge & 62914560) === ge && 300 > ft() - $i ? (Ee & 2) === 0 && Ll(e, 0) : wu |= n,
        Ml === ge && (Ml = 0)),
        Bt(e)
    }
    function ih(e, t) {
        t === 0 && (t = Po()),
        e = Xn(e, t),
        e !== null && ($l(e, t),
        Bt(e))
    }
    function T0(e) {
        var t = e.memoizedState
          , n = 0;
        t !== null && (n = t.retryLane),
        ih(e, n)
    }
    function O0(e, t) {
        var n = 0;
        switch (e.tag) {
        case 31:
        case 13:
            var l = e.stateNode
              , i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            l = e.stateNode;
            break;
        case 22:
            l = e.stateNode._retryCache;
            break;
        default:
            throw Error(o(314))
        }
        l !== null && l.delete(t),
        ih(e, n)
    }
    function R0(e, t) {
        return Qs(e, t)
    }
    var ns = null
      , Ul = null
      , Au = !1
      , ls = !1
      , Mu = !1
      , An = 0;
    function Bt(e) {
        e !== Ul && e.next === null && (Ul === null ? ns = Ul = e : Ul = Ul.next = e),
        ls = !0,
        Au || (Au = !0,
        M0())
    }
    function Oa(e, t) {
        if (!Mu && ls) {
            Mu = !0;
            do
                for (var n = !1, l = ns; l !== null; ) {
                    if (e !== 0) {
                        var i = l.pendingLanes;
                        if (i === 0)
                            var u = 0;
                        else {
                            var h = l.suspendedLanes
                              , v = l.pingedLanes;
                            u = (1 << 31 - ht(42 | e) + 1) - 1,
                            u &= i & ~(h & ~v),
                            u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0
                        }
                        u !== 0 && (n = !0,
                        oh(l, u))
                    } else
                        u = ge,
                        u = ri(l, l === Ae ? u : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1),
                        (u & 3) === 0 || Jl(l, u) || (n = !0,
                        oh(l, u));
                    l = l.next
                }
            while (n);
            Mu = !1
        }
    }
    function A0() {
        sh()
    }
    function sh() {
        ls = Au = !1;
        var e = 0;
        An !== 0 && V0() && (e = An);
        for (var t = ft(), n = null, l = ns; l !== null; ) {
            var i = l.next
              , u = rh(l, t);
            u === 0 ? (l.next = null,
            n === null ? ns = i : n.next = i,
            i === null && (Ul = n)) : (n = l,
            (e !== 0 || (u & 3) !== 0) && (ls = !0)),
            l = i
        }
        Xe !== 0 && Xe !== 5 || Oa(e),
        An !== 0 && (An = 0)
    }
    function rh(e, t) {
        for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
            var h = 31 - ht(u)
              , v = 1 << h
              , N = i[h];
            N === -1 ? ((v & n) === 0 || (v & l) !== 0) && (i[h] = ap(v, t)) : N <= t && (e.expiredLanes |= v),
            u &= ~v
        }
        if (t = Ae,
        n = ge,
        n = ri(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        l = e.callbackNode,
        n === 0 || e === t && (je === 2 || je === 9) || e.cancelPendingCommit !== null)
            return l !== null && l !== null && Xs(l),
            e.callbackNode = null,
            e.callbackPriority = 0;
        if ((n & 3) === 0 || Jl(e, n)) {
            if (t = n & -n,
            t === e.callbackPriority)
                return t;
            switch (l !== null && Xs(l),
            Ks(n)) {
            case 2:
            case 8:
                n = Fo;
                break;
            case 32:
                n = li;
                break;
            case 268435456:
                n = Wo;
                break;
            default:
                n = li
            }
            return l = uh.bind(null, e),
            n = Qs(n, l),
            e.callbackPriority = t,
            e.callbackNode = n,
            t
        }
        return l !== null && l !== null && Xs(l),
        e.callbackPriority = 2,
        e.callbackNode = null,
        2
    }
    function uh(e, t) {
        if (Xe !== 0 && Xe !== 5)
            return e.callbackNode = null,
            e.callbackPriority = 0,
            null;
        var n = e.callbackNode;
        if (ts() && e.callbackNode !== n)
            return null;
        var l = ge;
        return l = ri(e, e === Ae ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        l === 0 ? null : (Qd(e, l, t),
        rh(e, ft()),
        e.callbackNode != null && e.callbackNode === n ? uh.bind(null, e) : null)
    }
    function oh(e, t) {
        if (ts())
            return null;
        Qd(e, t, !0)
    }
    function M0() {
        X0(function() {
            (Ee & 6) !== 0 ? Qs($o, A0) : sh()
        })
    }
    function zu() {
        if (An === 0) {
            var e = Sl;
            e === 0 && (e = ai,
            ai <<= 1,
            (ai & 261888) === 0 && (ai = 256)),
            An = e
        }
        return An
    }
    function ch(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : fi("" + e)
    }
    function fh(e, t) {
        var n = t.ownerDocument.createElement("input");
        return n.name = t.name,
        n.value = t.value,
        e.id && n.setAttribute("form", e.id),
        t.parentNode.insertBefore(n, t),
        e = new FormData(e),
        n.parentNode.removeChild(n),
        e
    }
    function z0(e, t, n, l, i) {
        if (t === "submit" && n && n.stateNode === i) {
            var u = ch((i[at] || null).action)
              , h = l.submitter;
            h && (t = (t = h[at] || null) ? ch(t.formAction) : h.getAttribute("formAction"),
            t !== null && (u = t,
            h = null));
            var v = new gi("action","action",null,l,i);
            e.push({
                event: v,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (l.defaultPrevented) {
                            if (An !== 0) {
                                var N = h ? fh(i, h) : new FormData(i);
                                Ir(n, {
                                    pending: !0,
                                    data: N,
                                    method: i.method,
                                    action: u
                                }, null, N)
                            }
                        } else
                            typeof u == "function" && (v.preventDefault(),
                            N = h ? fh(i, h) : new FormData(i),
                            Ir(n, {
                                pending: !0,
                                data: N,
                                method: i.method,
                                action: u
                            }, u, N))
                    },
                    currentTarget: i
                }]
            })
        }
    }
    for (var Lu = 0; Lu < pr.length; Lu++) {
        var Du = pr[Lu]
          , L0 = Du.toLowerCase()
          , D0 = Du[0].toUpperCase() + Du.slice(1);
        Mt(L0, "on" + D0)
    }
    Mt(Yc, "onAnimationEnd"),
    Mt(Vc, "onAnimationIteration"),
    Mt(Qc, "onAnimationStart"),
    Mt("dblclick", "onDoubleClick"),
    Mt("focusin", "onFocus"),
    Mt("focusout", "onBlur"),
    Mt(Wp, "onTransitionRun"),
    Mt(Pp, "onTransitionStart"),
    Mt(Ip, "onTransitionCancel"),
    Mt(Xc, "onTransitionEnd"),
    rl("onMouseEnter", ["mouseout", "mouseover"]),
    rl("onMouseLeave", ["mouseout", "mouseover"]),
    rl("onPointerEnter", ["pointerout", "pointerover"]),
    rl("onPointerLeave", ["pointerout", "pointerover"]),
    Gn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Gn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    Gn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Gn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Gn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    Gn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Ra = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , U0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ra));
    function dh(e, t) {
        t = (t & 4) !== 0;
        for (var n = 0; n < e.length; n++) {
            var l = e[n]
              , i = l.event;
            l = l.listeners;
            e: {
                var u = void 0;
                if (t)
                    for (var h = l.length - 1; 0 <= h; h--) {
                        var v = l[h]
                          , N = v.instance
                          , A = v.currentTarget;
                        if (v = v.listener,
                        N !== u && i.isPropagationStopped())
                            break e;
                        u = v,
                        i.currentTarget = A;
                        try {
                            u(i)
                        } catch (H) {
                            xi(H)
                        }
                        i.currentTarget = null,
                        u = N
                    }
                else
                    for (h = 0; h < l.length; h++) {
                        if (v = l[h],
                        N = v.instance,
                        A = v.currentTarget,
                        v = v.listener,
                        N !== u && i.isPropagationStopped())
                            break e;
                        u = v,
                        i.currentTarget = A;
                        try {
                            u(i)
                        } catch (H) {
                            xi(H)
                        }
                        i.currentTarget = null,
                        u = N
                    }
            }
        }
    }
    function me(e, t) {
        var n = t[Js];
        n === void 0 && (n = t[Js] = new Set);
        var l = e + "__bubble";
        n.has(l) || (hh(t, e, 2, !1),
        n.add(l))
    }
    function Uu(e, t, n) {
        var l = 0;
        t && (l |= 4),
        hh(n, e, l, t)
    }
    var as = "_reactListening" + Math.random().toString(36).slice(2);
    function Hu(e) {
        if (!e[as]) {
            e[as] = !0,
            ic.forEach(function(n) {
                n !== "selectionchange" && (U0.has(n) || Uu(n, !1, e),
                Uu(n, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[as] || (t[as] = !0,
            Uu("selectionchange", !1, t))
        }
    }
    function hh(e, t, n, l) {
        switch (Vh(t)) {
        case 2:
            var i = cy;
            break;
        case 8:
            i = fy;
            break;
        default:
            i = Pu
        }
        n = i.bind(null, t, n, e),
        i = void 0,
        !lr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
        l ? i !== void 0 ? e.addEventListener(t, n, {
            capture: !0,
            passive: i
        }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
            passive: i
        }) : e.addEventListener(t, n, !1)
    }
    function qu(e, t, n, l, i) {
        var u = l;
        if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
            e: for (; ; ) {
                if (l === null)
                    return;
                var h = l.tag;
                if (h === 3 || h === 4) {
                    var v = l.stateNode.containerInfo;
                    if (v === i)
                        break;
                    if (h === 4)
                        for (h = l.return; h !== null; ) {
                            var N = h.tag;
                            if ((N === 3 || N === 4) && h.stateNode.containerInfo === i)
                                return;
                            h = h.return
                        }
                    for (; v !== null; ) {
                        if (h = al(v),
                        h === null)
                            return;
                        if (N = h.tag,
                        N === 5 || N === 6 || N === 26 || N === 27) {
                            l = u = h;
                            continue e
                        }
                        v = v.parentNode
                    }
                }
                l = l.return
            }
        yc(function() {
            var A = u
              , H = tr(n)
              , Y = [];
            e: {
                var M = kc.get(e);
                if (M !== void 0) {
                    var L = gi
                      , F = e;
                    switch (e) {
                    case "keypress":
                        if (hi(n) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        L = Op;
                        break;
                    case "focusin":
                        F = "focus",
                        L = rr;
                        break;
                    case "focusout":
                        F = "blur",
                        L = rr;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        L = rr;
                        break;
                    case "click":
                        if (n.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        L = bc;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        L = yp;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        L = Mp;
                        break;
                    case Yc:
                    case Vc:
                    case Qc:
                        L = bp;
                        break;
                    case Xc:
                        L = Lp;
                        break;
                    case "scroll":
                    case "scrollend":
                        L = gp;
                        break;
                    case "wheel":
                        L = Up;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        L = Ep;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        L = Ec;
                        break;
                    case "toggle":
                    case "beforetoggle":
                        L = qp
                    }
                    var le = (t & 4) !== 0
                      , Re = !le && (e === "scroll" || e === "scrollend")
                      , O = le ? M !== null ? M + "Capture" : null : M;
                    le = [];
                    for (var C = A, R; C !== null; ) {
                        var B = C;
                        if (R = B.stateNode,
                        B = B.tag,
                        B !== 5 && B !== 26 && B !== 27 || R === null || O === null || (B = Pl(C, O),
                        B != null && le.push(Aa(C, B, R))),
                        Re)
                            break;
                        C = C.return
                    }
                    0 < le.length && (M = new L(M,F,null,n,H),
                    Y.push({
                        event: M,
                        listeners: le
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (M = e === "mouseover" || e === "pointerover",
                    L = e === "mouseout" || e === "pointerout",
                    M && n !== er && (F = n.relatedTarget || n.fromElement) && (al(F) || F[ll]))
                        break e;
                    if ((L || M) && (M = H.window === H ? H : (M = H.ownerDocument) ? M.defaultView || M.parentWindow : window,
                    L ? (F = n.relatedTarget || n.toElement,
                    L = A,
                    F = F ? al(F) : null,
                    F !== null && (Re = f(F),
                    le = F.tag,
                    F !== Re || le !== 5 && le !== 27 && le !== 6) && (F = null)) : (L = null,
                    F = A),
                    L !== F)) {
                        if (le = bc,
                        B = "onMouseLeave",
                        O = "onMouseEnter",
                        C = "mouse",
                        (e === "pointerout" || e === "pointerover") && (le = Ec,
                        B = "onPointerLeave",
                        O = "onPointerEnter",
                        C = "pointer"),
                        Re = L == null ? M : Wl(L),
                        R = F == null ? M : Wl(F),
                        M = new le(B,C + "leave",L,n,H),
                        M.target = Re,
                        M.relatedTarget = R,
                        B = null,
                        al(H) === A && (le = new le(O,C + "enter",F,n,H),
                        le.target = R,
                        le.relatedTarget = Re,
                        B = le),
                        Re = B,
                        L && F)
                            t: {
                                for (le = H0,
                                O = L,
                                C = F,
                                R = 0,
                                B = O; B; B = le(B))
                                    R++;
                                B = 0;
                                for (var ee = C; ee; ee = le(ee))
                                    B++;
                                for (; 0 < R - B; )
                                    O = le(O),
                                    R--;
                                for (; 0 < B - R; )
                                    C = le(C),
                                    B--;
                                for (; R--; ) {
                                    if (O === C || C !== null && O === C.alternate) {
                                        le = O;
                                        break t
                                    }
                                    O = le(O),
                                    C = le(C)
                                }
                                le = null
                            }
                        else
                            le = null;
                        L !== null && mh(Y, M, L, le, !1),
                        F !== null && Re !== null && mh(Y, Re, F, le, !0)
                    }
                }
                e: {
                    if (M = A ? Wl(A) : window,
                    L = M.nodeName && M.nodeName.toLowerCase(),
                    L === "select" || L === "input" && M.type === "file")
                        var be = Rc;
                    else if (Tc(M))
                        if (Ac)
                            be = Jp;
                        else {
                            be = Zp;
                            var I = kp
                        }
                    else
                        L = M.nodeName,
                        !L || L.toLowerCase() !== "input" || M.type !== "checkbox" && M.type !== "radio" ? A && Is(A.elementType) && (be = Rc) : be = Kp;
                    if (be && (be = be(e, A))) {
                        Oc(Y, be, n, H);
                        break e
                    }
                    I && I(e, M, A),
                    e === "focusout" && A && M.type === "number" && A.memoizedProps.value != null && Ps(M, "number", M.value)
                }
                switch (I = A ? Wl(A) : window,
                e) {
                case "focusin":
                    (Tc(I) || I.contentEditable === "true") && (hl = I,
                    hr = A,
                    sa = null);
                    break;
                case "focusout":
                    sa = hr = hl = null;
                    break;
                case "mousedown":
                    mr = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    mr = !1,
                    Bc(Y, n, H);
                    break;
                case "selectionchange":
                    if (Fp)
                        break;
                case "keydown":
                case "keyup":
                    Bc(Y, n, H)
                }
                var ce;
                if (or)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var pe = "onCompositionStart";
                            break e;
                        case "compositionend":
                            pe = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            pe = "onCompositionUpdate";
                            break e
                        }
                        pe = void 0
                    }
                else
                    dl ? jc(e, n) && (pe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (pe = "onCompositionStart");
                pe && (wc && n.locale !== "ko" && (dl || pe !== "onCompositionStart" ? pe === "onCompositionEnd" && dl && (ce = xc()) : (gn = H,
                ar = "value"in gn ? gn.value : gn.textContent,
                dl = !0)),
                I = is(A, pe),
                0 < I.length && (pe = new Sc(pe,e,null,n,H),
                Y.push({
                    event: pe,
                    listeners: I
                }),
                ce ? pe.data = ce : (ce = Cc(n),
                ce !== null && (pe.data = ce)))),
                (ce = Gp ? Yp(e, n) : Vp(e, n)) && (pe = is(A, "onBeforeInput"),
                0 < pe.length && (I = new Sc("onBeforeInput","beforeinput",null,n,H),
                Y.push({
                    event: I,
                    listeners: pe
                }),
                I.data = ce)),
                z0(Y, e, A, n, H)
            }
            dh(Y, t)
        })
    }
    function Aa(e, t, n) {
        return {
            instance: e,
            listener: t,
            currentTarget: n
        }
    }
    function is(e, t) {
        for (var n = t + "Capture", l = []; e !== null; ) {
            var i = e
              , u = i.stateNode;
            if (i = i.tag,
            i !== 5 && i !== 26 && i !== 27 || u === null || (i = Pl(e, n),
            i != null && l.unshift(Aa(e, i, u)),
            i = Pl(e, t),
            i != null && l.push(Aa(e, i, u))),
            e.tag === 3)
                return l;
            e = e.return
        }
        return []
    }
    function H0(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }
    function mh(e, t, n, l, i) {
        for (var u = t._reactName, h = []; n !== null && n !== l; ) {
            var v = n
              , N = v.alternate
              , A = v.stateNode;
            if (v = v.tag,
            N !== null && N === l)
                break;
            v !== 5 && v !== 26 && v !== 27 || A === null || (N = A,
            i ? (A = Pl(n, u),
            A != null && h.unshift(Aa(n, A, N))) : i || (A = Pl(n, u),
            A != null && h.push(Aa(n, A, N)))),
            n = n.return
        }
        h.length !== 0 && e.push({
            event: t,
            listeners: h
        })
    }
    var q0 = /\r\n?/g
      , B0 = /\u0000|\uFFFD/g;
    function gh(e) {
        return (typeof e == "string" ? e : "" + e).replace(q0, `
`).replace(B0, "")
    }
    function ph(e, t) {
        return t = gh(t),
        gh(e) === t
    }
    function Oe(e, t, n, l, i, u) {
        switch (n) {
        case "children":
            typeof l == "string" ? t === "body" || t === "textarea" && l === "" || ol(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && ol(e, "" + l);
            break;
        case "className":
            oi(e, "class", l);
            break;
        case "tabIndex":
            oi(e, "tabindex", l);
            break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
            oi(e, n, l);
            break;
        case "style":
            gc(e, l, u);
            break;
        case "data":
            if (t !== "object") {
                oi(e, "data", l);
                break
            }
        case "src":
        case "href":
            if (l === "" && (t !== "a" || n !== "href")) {
                e.removeAttribute(n);
                break
            }
            if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
                e.removeAttribute(n);
                break
            }
            l = fi("" + l),
            e.setAttribute(n, l);
            break;
        case "action":
        case "formAction":
            if (typeof l == "function") {
                e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                break
            } else
                typeof u == "function" && (n === "formAction" ? (t !== "input" && Oe(e, t, "name", i.name, i, null),
                Oe(e, t, "formEncType", i.formEncType, i, null),
                Oe(e, t, "formMethod", i.formMethod, i, null),
                Oe(e, t, "formTarget", i.formTarget, i, null)) : (Oe(e, t, "encType", i.encType, i, null),
                Oe(e, t, "method", i.method, i, null),
                Oe(e, t, "target", i.target, i, null)));
            if (l == null || typeof l == "symbol" || typeof l == "boolean") {
                e.removeAttribute(n);
                break
            }
            l = fi("" + l),
            e.setAttribute(n, l);
            break;
        case "onClick":
            l != null && (e.onclick = Zt);
            break;
        case "onScroll":
            l != null && me("scroll", e);
            break;
        case "onScrollEnd":
            l != null && me("scrollend", e);
            break;
        case "dangerouslySetInnerHTML":
            if (l != null) {
                if (typeof l != "object" || !("__html"in l))
                    throw Error(o(61));
                if (n = l.__html,
                n != null) {
                    if (i.children != null)
                        throw Error(o(60));
                    e.innerHTML = n
                }
            }
            break;
        case "multiple":
            e.multiple = l && typeof l != "function" && typeof l != "symbol";
            break;
        case "muted":
            e.muted = l && typeof l != "function" && typeof l != "symbol";
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
            break;
        case "autoFocus":
            break;
        case "xlinkHref":
            if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
                e.removeAttribute("xlink:href");
                break
            }
            n = fi("" + l),
            e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
            break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
            l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
            break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
            l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
            break;
        case "capture":
        case "download":
            l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
            break;
        case "cols":
        case "rows":
        case "size":
        case "span":
            l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
            break;
        case "rowSpan":
        case "start":
            l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
            break;
        case "popover":
            me("beforetoggle", e),
            me("toggle", e),
            ui(e, "popover", l);
            break;
        case "xlinkActuate":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
            break;
        case "xlinkArcrole":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
            break;
        case "xlinkRole":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
            break;
        case "xlinkShow":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
            break;
        case "xlinkTitle":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
            break;
        case "xlinkType":
            kt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
            break;
        case "xmlBase":
            kt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
            break;
        case "xmlLang":
            kt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
            break;
        case "xmlSpace":
            kt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
            break;
        case "is":
            ui(e, "is", l);
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = hp.get(n) || n,
            ui(e, n, l))
        }
    }
    function Bu(e, t, n, l, i, u) {
        switch (n) {
        case "style":
            gc(e, l, u);
            break;
        case "dangerouslySetInnerHTML":
            if (l != null) {
                if (typeof l != "object" || !("__html"in l))
                    throw Error(o(61));
                if (n = l.__html,
                n != null) {
                    if (i.children != null)
                        throw Error(o(60));
                    e.innerHTML = n
                }
            }
            break;
        case "children":
            typeof l == "string" ? ol(e, l) : (typeof l == "number" || typeof l == "bigint") && ol(e, "" + l);
            break;
        case "onScroll":
            l != null && me("scroll", e);
            break;
        case "onScrollEnd":
            l != null && me("scrollend", e);
            break;
        case "onClick":
            l != null && (e.onclick = Zt);
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            if (!sc.hasOwnProperty(n))
                e: {
                    if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"),
                    t = n.slice(2, i ? n.length - 7 : void 0),
                    u = e[at] || null,
                    u = u != null ? u[n] : null,
                    typeof u == "function" && e.removeEventListener(t, u, i),
                    typeof l == "function")) {
                        typeof u != "function" && u !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)),
                        e.addEventListener(t, l, i);
                        break e
                    }
                    n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : ui(e, n, l)
                }
        }
    }
    function Ie(e, t, n) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "img":
            me("error", e),
            me("load", e);
            var l = !1, i = !1, u;
            for (u in n)
                if (n.hasOwnProperty(u)) {
                    var h = n[u];
                    if (h != null)
                        switch (u) {
                        case "src":
                            l = !0;
                            break;
                        case "srcSet":
                            i = !0;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(o(137, t));
                        default:
                            Oe(e, t, u, h, n, null)
                        }
                }
            i && Oe(e, t, "srcSet", n.srcSet, n, null),
            l && Oe(e, t, "src", n.src, n, null);
            return;
        case "input":
            me("invalid", e);
            var v = u = h = i = null
              , N = null
              , A = null;
            for (l in n)
                if (n.hasOwnProperty(l)) {
                    var H = n[l];
                    if (H != null)
                        switch (l) {
                        case "name":
                            i = H;
                            break;
                        case "type":
                            h = H;
                            break;
                        case "checked":
                            N = H;
                            break;
                        case "defaultChecked":
                            A = H;
                            break;
                        case "value":
                            u = H;
                            break;
                        case "defaultValue":
                            v = H;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (H != null)
                                throw Error(o(137, t));
                            break;
                        default:
                            Oe(e, t, l, H, n, null)
                        }
                }
            fc(e, u, v, N, A, h, i, !1);
            return;
        case "select":
            me("invalid", e),
            l = h = u = null;
            for (i in n)
                if (n.hasOwnProperty(i) && (v = n[i],
                v != null))
                    switch (i) {
                    case "value":
                        u = v;
                        break;
                    case "defaultValue":
                        h = v;
                        break;
                    case "multiple":
                        l = v;
                    default:
                        Oe(e, t, i, v, n, null)
                    }
            t = u,
            n = h,
            e.multiple = !!l,
            t != null ? ul(e, !!l, t, !1) : n != null && ul(e, !!l, n, !0);
            return;
        case "textarea":
            me("invalid", e),
            u = i = l = null;
            for (h in n)
                if (n.hasOwnProperty(h) && (v = n[h],
                v != null))
                    switch (h) {
                    case "value":
                        l = v;
                        break;
                    case "defaultValue":
                        i = v;
                        break;
                    case "children":
                        u = v;
                        break;
                    case "dangerouslySetInnerHTML":
                        if (v != null)
                            throw Error(o(91));
                        break;
                    default:
                        Oe(e, t, h, v, n, null)
                    }
            hc(e, l, i, u);
            return;
        case "option":
            for (N in n)
                n.hasOwnProperty(N) && (l = n[N],
                l != null) && (N === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : Oe(e, t, N, l, n, null));
            return;
        case "dialog":
            me("beforetoggle", e),
            me("toggle", e),
            me("cancel", e),
            me("close", e);
            break;
        case "iframe":
        case "object":
            me("load", e);
            break;
        case "video":
        case "audio":
            for (l = 0; l < Ra.length; l++)
                me(Ra[l], e);
            break;
        case "image":
            me("error", e),
            me("load", e);
            break;
        case "details":
            me("toggle", e);
            break;
        case "embed":
        case "source":
        case "link":
            me("error", e),
            me("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
            for (A in n)
                if (n.hasOwnProperty(A) && (l = n[A],
                l != null))
                    switch (A) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        throw Error(o(137, t));
                    default:
                        Oe(e, t, A, l, n, null)
                    }
            return;
        default:
            if (Is(t)) {
                for (H in n)
                    n.hasOwnProperty(H) && (l = n[H],
                    l !== void 0 && Bu(e, t, H, l, n, void 0));
                return
            }
        }
        for (v in n)
            n.hasOwnProperty(v) && (l = n[v],
            l != null && Oe(e, t, v, l, n, null))
    }
    function G0(e, t, n, l) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "input":
            var i = null
              , u = null
              , h = null
              , v = null
              , N = null
              , A = null
              , H = null;
            for (L in n) {
                var Y = n[L];
                if (n.hasOwnProperty(L) && Y != null)
                    switch (L) {
                    case "checked":
                        break;
                    case "value":
                        break;
                    case "defaultValue":
                        N = Y;
                    default:
                        l.hasOwnProperty(L) || Oe(e, t, L, null, l, Y)
                    }
            }
            for (var M in l) {
                var L = l[M];
                if (Y = n[M],
                l.hasOwnProperty(M) && (L != null || Y != null))
                    switch (M) {
                    case "type":
                        u = L;
                        break;
                    case "name":
                        i = L;
                        break;
                    case "checked":
                        A = L;
                        break;
                    case "defaultChecked":
                        H = L;
                        break;
                    case "value":
                        h = L;
                        break;
                    case "defaultValue":
                        v = L;
                        break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (L != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        L !== Y && Oe(e, t, M, L, l, Y)
                    }
            }
            Ws(e, h, v, N, A, H, u, i);
            return;
        case "select":
            L = h = v = M = null;
            for (u in n)
                if (N = n[u],
                n.hasOwnProperty(u) && N != null)
                    switch (u) {
                    case "value":
                        break;
                    case "multiple":
                        L = N;
                    default:
                        l.hasOwnProperty(u) || Oe(e, t, u, null, l, N)
                    }
            for (i in l)
                if (u = l[i],
                N = n[i],
                l.hasOwnProperty(i) && (u != null || N != null))
                    switch (i) {
                    case "value":
                        M = u;
                        break;
                    case "defaultValue":
                        v = u;
                        break;
                    case "multiple":
                        h = u;
                    default:
                        u !== N && Oe(e, t, i, u, l, N)
                    }
            t = v,
            n = h,
            l = L,
            M != null ? ul(e, !!n, M, !1) : !!l != !!n && (t != null ? ul(e, !!n, t, !0) : ul(e, !!n, n ? [] : "", !1));
            return;
        case "textarea":
            L = M = null;
            for (v in n)
                if (i = n[v],
                n.hasOwnProperty(v) && i != null && !l.hasOwnProperty(v))
                    switch (v) {
                    case "value":
                        break;
                    case "children":
                        break;
                    default:
                        Oe(e, t, v, null, l, i)
                    }
            for (h in l)
                if (i = l[h],
                u = n[h],
                l.hasOwnProperty(h) && (i != null || u != null))
                    switch (h) {
                    case "value":
                        M = i;
                        break;
                    case "defaultValue":
                        L = i;
                        break;
                    case "children":
                        break;
                    case "dangerouslySetInnerHTML":
                        if (i != null)
                            throw Error(o(91));
                        break;
                    default:
                        i !== u && Oe(e, t, h, i, l, u)
                    }
            dc(e, M, L);
            return;
        case "option":
            for (var F in n)
                M = n[F],
                n.hasOwnProperty(F) && M != null && !l.hasOwnProperty(F) && (F === "selected" ? e.selected = !1 : Oe(e, t, F, null, l, M));
            for (N in l)
                M = l[N],
                L = n[N],
                l.hasOwnProperty(N) && M !== L && (M != null || L != null) && (N === "selected" ? e.selected = M && typeof M != "function" && typeof M != "symbol" : Oe(e, t, N, M, l, L));
            return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
            for (var le in n)
                M = n[le],
                n.hasOwnProperty(le) && M != null && !l.hasOwnProperty(le) && Oe(e, t, le, null, l, M);
            for (A in l)
                if (M = l[A],
                L = n[A],
                l.hasOwnProperty(A) && M !== L && (M != null || L != null))
                    switch (A) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (M != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        Oe(e, t, A, M, l, L)
                    }
            return;
        default:
            if (Is(t)) {
                for (var Re in n)
                    M = n[Re],
                    n.hasOwnProperty(Re) && M !== void 0 && !l.hasOwnProperty(Re) && Bu(e, t, Re, void 0, l, M);
                for (H in l)
                    M = l[H],
                    L = n[H],
                    !l.hasOwnProperty(H) || M === L || M === void 0 && L === void 0 || Bu(e, t, H, M, l, L);
                return
            }
        }
        for (var O in n)
            M = n[O],
            n.hasOwnProperty(O) && M != null && !l.hasOwnProperty(O) && Oe(e, t, O, null, l, M);
        for (Y in l)
            M = l[Y],
            L = n[Y],
            !l.hasOwnProperty(Y) || M === L || M == null && L == null || Oe(e, t, Y, M, l, L)
    }
    function yh(e) {
        switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
            return !0;
        default:
            return !1
        }
    }
    function Y0() {
        if (typeof performance.getEntriesByType == "function") {
            for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
                var i = n[l]
                  , u = i.transferSize
                  , h = i.initiatorType
                  , v = i.duration;
                if (u && v && yh(h)) {
                    for (h = 0,
                    v = i.responseEnd,
                    l += 1; l < n.length; l++) {
                        var N = n[l]
                          , A = N.startTime;
                        if (A > v)
                            break;
                        var H = N.transferSize
                          , Y = N.initiatorType;
                        H && yh(Y) && (N = N.responseEnd,
                        h += H * (N < v ? 1 : (v - A) / (N - A)))
                    }
                    if (--l,
                    t += 8 * (u + h) / (i.duration / 1e3),
                    e++,
                    10 < e)
                        break
                }
            }
            if (0 < e)
                return t / e / 1e6
        }
        return navigator.connection && (e = navigator.connection.downlink,
        typeof e == "number") ? e : 5
    }
    var Gu = null
      , Yu = null;
    function ss(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }
    function xh(e) {
        switch (e) {
        case "http://www.w3.org/2000/svg":
            return 1;
        case "http://www.w3.org/1998/Math/MathML":
            return 2;
        default:
            return 0
        }
    }
    function vh(e, t) {
        if (e === 0)
            switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
            }
        return e === 1 && t === "foreignObject" ? 0 : e
    }
    function Vu(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var Qu = null;
    function V0() {
        var e = window.event;
        return e && e.type === "popstate" ? e === Qu ? !1 : (Qu = e,
        !0) : (Qu = null,
        !1)
    }
    var bh = typeof setTimeout == "function" ? setTimeout : void 0
      , Q0 = typeof clearTimeout == "function" ? clearTimeout : void 0
      , Sh = typeof Promise == "function" ? Promise : void 0
      , X0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sh < "u" ? function(e) {
        return Sh.resolve(null).then(e).catch(k0)
    }
    : bh;
    function k0(e) {
        setTimeout(function() {
            throw e
        })
    }
    function Mn(e) {
        return e === "head"
    }
    function Eh(e, t) {
        var n = t
          , l = 0;
        do {
            var i = n.nextSibling;
            if (e.removeChild(n),
            i && i.nodeType === 8)
                if (n = i.data,
                n === "/$" || n === "/&") {
                    if (l === 0) {
                        e.removeChild(i),
                        Gl(t);
                        return
                    }
                    l--
                } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
                    l++;
                else if (n === "html")
                    Ma(e.ownerDocument.documentElement);
                else if (n === "head") {
                    n = e.ownerDocument.head,
                    Ma(n);
                    for (var u = n.firstChild; u; ) {
                        var h = u.nextSibling
                          , v = u.nodeName;
                        u[Fl] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u),
                        u = h
                    }
                } else
                    n === "body" && Ma(e.ownerDocument.body);
            n = i
        } while (n);
        Gl(t)
    }
    function wh(e, t) {
        var n = e;
        e = 0;
        do {
            var l = n.nextSibling;
            if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display,
            n.style.display = "none") : (n.style.display = n._stashedDisplay || "",
            n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue,
            n.nodeValue = "") : n.nodeValue = n._stashedText || ""),
            l && l.nodeType === 8)
                if (n = l.data,
                n === "/$") {
                    if (e === 0)
                        break;
                    e--
                } else
                    n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
            n = l
        } while (n)
    }
    function Xu(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
            var n = t;
            switch (t = t.nextSibling,
            n.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
                Xu(n),
                $s(n);
                continue;
            case "SCRIPT":
            case "STYLE":
                continue;
            case "LINK":
                if (n.rel.toLowerCase() === "stylesheet")
                    continue
            }
            e.removeChild(n)
        }
    }
    function Z0(e, t, n, l) {
        for (; e.nodeType === 1; ) {
            var i = n;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
                    break
            } else if (l) {
                if (!e[Fl])
                    switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop"))
                            break;
                        return e;
                    case "link":
                        if (u = e.getAttribute("rel"),
                        u === "stylesheet" && e.hasAttribute("data-precedence"))
                            break;
                        if (u !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                            break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence"))
                            break;
                        return e;
                    case "script":
                        if (u = e.getAttribute("src"),
                        (u !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                            break;
                        return e;
                    default:
                        return e
                    }
            } else if (t === "input" && e.type === "hidden") {
                var u = i.name == null ? null : "" + i.name;
                if (i.type === "hidden" && e.getAttribute("name") === u)
                    return e
            } else
                return e;
            if (e = Ot(e.nextSibling),
            e === null)
                break
        }
        return null
    }
    function K0(e, t, n) {
        if (t === "")
            return null;
        for (; e.nodeType !== 3; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Ot(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function _h(e, t) {
        for (; e.nodeType !== 8; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ot(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function ku(e) {
        return e.data === "$?" || e.data === "$~"
    }
    function Zu(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
    }
    function J0(e, t) {
        var n = e.ownerDocument;
        if (e.data === "$~")
            e._reactRetry = t;
        else if (e.data !== "$?" || n.readyState !== "loading")
            t();
        else {
            var l = function() {
                t(),
                n.removeEventListener("DOMContentLoaded", l)
            };
            n.addEventListener("DOMContentLoaded", l),
            e._reactRetry = l
        }
    }
    function Ot(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
                    break;
                if (t === "/$" || t === "/&")
                    return null
            }
        }
        return e
    }
    var Ku = null;
    function Nh(e) {
        e = e.nextSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var n = e.data;
                if (n === "/$" || n === "/&") {
                    if (t === 0)
                        return Ot(e.nextSibling);
                    t--
                } else
                    n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++
            }
            e = e.nextSibling
        }
        return null
    }
    function jh(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var n = e.data;
                if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    n !== "/$" && n !== "/&" || t++
            }
            e = e.previousSibling
        }
        return null
    }
    function Ch(e, t, n) {
        switch (t = ss(n),
        e) {
        case "html":
            if (e = t.documentElement,
            !e)
                throw Error(o(452));
            return e;
        case "head":
            if (e = t.head,
            !e)
                throw Error(o(453));
            return e;
        case "body":
            if (e = t.body,
            !e)
                throw Error(o(454));
            return e;
        default:
            throw Error(o(451))
        }
    }
    function Ma(e) {
        for (var t = e.attributes; t.length; )
            e.removeAttributeNode(t[0]);
        $s(e)
    }
    var Rt = new Map
      , Th = new Set;
    function rs(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var on = X.d;
    X.d = {
        f: $0,
        r: F0,
        D: W0,
        C: P0,
        L: I0,
        m: ey,
        X: ny,
        S: ty,
        M: ly
    };
    function $0() {
        var e = on.f()
          , t = Pi();
        return e || t
    }
    function F0(e) {
        var t = il(e);
        t !== null && t.tag === 5 && t.type === "form" ? kf(t) : on.r(e)
    }
    var Hl = typeof document > "u" ? null : document;
    function Oh(e, t, n) {
        var l = Hl;
        if (l && typeof t == "string" && t) {
            var i = Et(t);
            i = 'link[rel="' + e + '"][href="' + i + '"]',
            typeof n == "string" && (i += '[crossorigin="' + n + '"]'),
            Th.has(i) || (Th.add(i),
            e = {
                rel: e,
                crossOrigin: n,
                href: t
            },
            l.querySelector(i) === null && (t = l.createElement("link"),
            Ie(t, "link", e),
            Ze(t),
            l.head.appendChild(t)))
        }
    }
    function W0(e) {
        on.D(e),
        Oh("dns-prefetch", e, null)
    }
    function P0(e, t) {
        on.C(e, t),
        Oh("preconnect", e, t)
    }
    function I0(e, t, n) {
        on.L(e, t, n);
        var l = Hl;
        if (l && e && t) {
            var i = 'link[rel="preload"][as="' + Et(t) + '"]';
            t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + Et(n.imageSrcSet) + '"]',
            typeof n.imageSizes == "string" && (i += '[imagesizes="' + Et(n.imageSizes) + '"]')) : i += '[href="' + Et(e) + '"]';
            var u = i;
            switch (t) {
            case "style":
                u = ql(e);
                break;
            case "script":
                u = Bl(e)
            }
            Rt.has(u) || (e = x({
                rel: "preload",
                href: t === "image" && n && n.imageSrcSet ? void 0 : e,
                as: t
            }, n),
            Rt.set(u, e),
            l.querySelector(i) !== null || t === "style" && l.querySelector(za(u)) || t === "script" && l.querySelector(La(u)) || (t = l.createElement("link"),
            Ie(t, "link", e),
            Ze(t),
            l.head.appendChild(t)))
        }
    }
    function ey(e, t) {
        on.m(e, t);
        var n = Hl;
        if (n && e) {
            var l = t && typeof t.as == "string" ? t.as : "script"
              , i = 'link[rel="modulepreload"][as="' + Et(l) + '"][href="' + Et(e) + '"]'
              , u = i;
            switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
                u = Bl(e)
            }
            if (!Rt.has(u) && (e = x({
                rel: "modulepreload",
                href: e
            }, t),
            Rt.set(u, e),
            n.querySelector(i) === null)) {
                switch (l) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    if (n.querySelector(La(u)))
                        return
                }
                l = n.createElement("link"),
                Ie(l, "link", e),
                Ze(l),
                n.head.appendChild(l)
            }
        }
    }
    function ty(e, t, n) {
        on.S(e, t, n);
        var l = Hl;
        if (l && e) {
            var i = sl(l).hoistableStyles
              , u = ql(e);
            t = t || "default";
            var h = i.get(u);
            if (!h) {
                var v = {
                    loading: 0,
                    preload: null
                };
                if (h = l.querySelector(za(u)))
                    v.loading = 5;
                else {
                    e = x({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, n),
                    (n = Rt.get(u)) && Ju(e, n);
                    var N = h = l.createElement("link");
                    Ze(N),
                    Ie(N, "link", e),
                    N._p = new Promise(function(A, H) {
                        N.onload = A,
                        N.onerror = H
                    }
                    ),
                    N.addEventListener("load", function() {
                        v.loading |= 1
                    }),
                    N.addEventListener("error", function() {
                        v.loading |= 2
                    }),
                    v.loading |= 4,
                    us(h, t, l)
                }
                h = {
                    type: "stylesheet",
                    instance: h,
                    count: 1,
                    state: v
                },
                i.set(u, h)
            }
        }
    }
    function ny(e, t) {
        on.X(e, t);
        var n = Hl;
        if (n && e) {
            var l = sl(n).hoistableScripts
              , i = Bl(e)
              , u = l.get(i);
            u || (u = n.querySelector(La(i)),
            u || (e = x({
                src: e,
                async: !0
            }, t),
            (t = Rt.get(i)) && $u(e, t),
            u = n.createElement("script"),
            Ze(u),
            Ie(u, "link", e),
            n.head.appendChild(u)),
            u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            },
            l.set(i, u))
        }
    }
    function ly(e, t) {
        on.M(e, t);
        var n = Hl;
        if (n && e) {
            var l = sl(n).hoistableScripts
              , i = Bl(e)
              , u = l.get(i);
            u || (u = n.querySelector(La(i)),
            u || (e = x({
                src: e,
                async: !0,
                type: "module"
            }, t),
            (t = Rt.get(i)) && $u(e, t),
            u = n.createElement("script"),
            Ze(u),
            Ie(u, "link", e),
            n.head.appendChild(u)),
            u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            },
            l.set(i, u))
        }
    }
    function Rh(e, t, n, l) {
        var i = (i = de.current) ? rs(i) : null;
        if (!i)
            throw Error(o(446));
        switch (e) {
        case "meta":
        case "title":
            return null;
        case "style":
            return typeof n.precedence == "string" && typeof n.href == "string" ? (t = ql(n.href),
            n = sl(i).hoistableStyles,
            l = n.get(t),
            l || (l = {
                type: "style",
                instance: null,
                count: 0,
                state: null
            },
            n.set(t, l)),
            l) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        case "link":
            if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
                e = ql(n.href);
                var u = sl(i).hoistableStyles
                  , h = u.get(e);
                if (h || (i = i.ownerDocument || i,
                h = {
                    type: "stylesheet",
                    instance: null,
                    count: 0,
                    state: {
                        loading: 0,
                        preload: null
                    }
                },
                u.set(e, h),
                (u = i.querySelector(za(e))) && !u._p && (h.instance = u,
                h.state.loading = 5),
                Rt.has(e) || (n = {
                    rel: "preload",
                    as: "style",
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy
                },
                Rt.set(e, n),
                u || ay(i, e, n, h.state))),
                t && l === null)
                    throw Error(o(528, ""));
                return h
            }
            if (t && l !== null)
                throw Error(o(529, ""));
            return null;
        case "script":
            return t = n.async,
            n = n.src,
            typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Bl(n),
            n = sl(i).hoistableScripts,
            l = n.get(t),
            l || (l = {
                type: "script",
                instance: null,
                count: 0,
                state: null
            },
            n.set(t, l)),
            l) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        default:
            throw Error(o(444, e))
        }
    }
    function ql(e) {
        return 'href="' + Et(e) + '"'
    }
    function za(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }
    function Ah(e) {
        return x({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }
    function ay(e, t, n, l) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"),
        l.preload = t,
        t.addEventListener("load", function() {
            return l.loading |= 1
        }),
        t.addEventListener("error", function() {
            return l.loading |= 2
        }),
        Ie(t, "link", n),
        Ze(t),
        e.head.appendChild(t))
    }
    function Bl(e) {
        return '[src="' + Et(e) + '"]'
    }
    function La(e) {
        return "script[async]" + e
    }
    function Mh(e, t, n) {
        if (t.count++,
        t.instance === null)
            switch (t.type) {
            case "style":
                var l = e.querySelector('style[data-href~="' + Et(n.href) + '"]');
                if (l)
                    return t.instance = l,
                    Ze(l),
                    l;
                var i = x({}, n, {
                    "data-href": n.href,
                    "data-precedence": n.precedence,
                    href: null,
                    precedence: null
                });
                return l = (e.ownerDocument || e).createElement("style"),
                Ze(l),
                Ie(l, "style", i),
                us(l, n.precedence, e),
                t.instance = l;
            case "stylesheet":
                i = ql(n.href);
                var u = e.querySelector(za(i));
                if (u)
                    return t.state.loading |= 4,
                    t.instance = u,
                    Ze(u),
                    u;
                l = Ah(n),
                (i = Rt.get(i)) && Ju(l, i),
                u = (e.ownerDocument || e).createElement("link"),
                Ze(u);
                var h = u;
                return h._p = new Promise(function(v, N) {
                    h.onload = v,
                    h.onerror = N
                }
                ),
                Ie(u, "link", l),
                t.state.loading |= 4,
                us(u, n.precedence, e),
                t.instance = u;
            case "script":
                return u = Bl(n.src),
                (i = e.querySelector(La(u))) ? (t.instance = i,
                Ze(i),
                i) : (l = n,
                (i = Rt.get(u)) && (l = x({}, n),
                $u(l, i)),
                e = e.ownerDocument || e,
                i = e.createElement("script"),
                Ze(i),
                Ie(i, "link", l),
                e.head.appendChild(i),
                t.instance = i);
            case "void":
                return null;
            default:
                throw Error(o(443, t.type))
            }
        else
            t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance,
            t.state.loading |= 4,
            us(l, n.precedence, e));
        return t.instance
    }
    function us(e, t, n) {
        for (var l = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = l.length ? l[l.length - 1] : null, u = i, h = 0; h < l.length; h++) {
            var v = l[h];
            if (v.dataset.precedence === t)
                u = v;
            else if (u !== i)
                break
        }
        u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = n.nodeType === 9 ? n.head : n,
        t.insertBefore(e, t.firstChild))
    }
    function Ju(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title)
    }
    function $u(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity)
    }
    var os = null;
    function zh(e, t, n) {
        if (os === null) {
            var l = new Map
              , i = os = new Map;
            i.set(n, l)
        } else
            i = os,
            l = i.get(n),
            l || (l = new Map,
            i.set(n, l));
        if (l.has(e))
            return l;
        for (l.set(e, null),
        n = n.getElementsByTagName(e),
        i = 0; i < n.length; i++) {
            var u = n[i];
            if (!(u[Fl] || u[$e] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
                var h = u.getAttribute(t) || "";
                h = e + h;
                var v = l.get(h);
                v ? v.push(u) : l.set(h, [u])
            }
        }
        return l
    }
    function Lh(e, t, n) {
        e = e.ownerDocument || e,
        e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null)
    }
    function iy(e, t, n) {
        if (n === 1 || t.itemProp != null)
            return !1;
        switch (e) {
        case "meta":
        case "title":
            return !0;
        case "style":
            if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
                break;
            return !0;
        case "link":
            if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
                break;
            return t.rel === "stylesheet" ? (e = t.disabled,
            typeof t.precedence == "string" && e == null) : !0;
        case "script":
            if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
                return !0
        }
        return !1
    }
    function Dh(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    function sy(e, t, n, l) {
        if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
            if (n.instance === null) {
                var i = ql(l.href)
                  , u = t.querySelector(za(i));
                if (u) {
                    t = u._p,
                    t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++,
                    e = cs.bind(e),
                    t.then(e, e)),
                    n.state.loading |= 4,
                    n.instance = u,
                    Ze(u);
                    return
                }
                u = t.ownerDocument || t,
                l = Ah(l),
                (i = Rt.get(i)) && Ju(l, i),
                u = u.createElement("link"),
                Ze(u);
                var h = u;
                h._p = new Promise(function(v, N) {
                    h.onload = v,
                    h.onerror = N
                }
                ),
                Ie(u, "link", l),
                n.instance = u
            }
            e.stylesheets === null && (e.stylesheets = new Map),
            e.stylesheets.set(n, t),
            (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++,
            n = cs.bind(e),
            t.addEventListener("load", n),
            t.addEventListener("error", n))
        }
    }
    var Fu = 0;
    function ry(e, t) {
        return e.stylesheets && e.count === 0 && ds(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount ? function(n) {
            var l = setTimeout(function() {
                if (e.stylesheets && ds(e, e.stylesheets),
                e.unsuspend) {
                    var u = e.unsuspend;
                    e.unsuspend = null,
                    u()
                }
            }, 6e4 + t);
            0 < e.imgBytes && Fu === 0 && (Fu = 62500 * Y0());
            var i = setTimeout(function() {
                if (e.waitingForImages = !1,
                e.count === 0 && (e.stylesheets && ds(e, e.stylesheets),
                e.unsuspend)) {
                    var u = e.unsuspend;
                    e.unsuspend = null,
                    u()
                }
            }, (e.imgBytes > Fu ? 50 : 800) + t);
            return e.unsuspend = n,
            function() {
                e.unsuspend = null,
                clearTimeout(l),
                clearTimeout(i)
            }
        }
        : null
    }
    function cs() {
        if (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
            if (this.stylesheets)
                ds(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null,
                e()
            }
        }
    }
    var fs = null;
    function ds(e, t) {
        e.stylesheets = null,
        e.unsuspend !== null && (e.count++,
        fs = new Map,
        t.forEach(uy, e),
        fs = null,
        cs.call(e))
    }
    function uy(e, t) {
        if (!(t.state.loading & 4)) {
            var n = fs.get(e);
            if (n)
                var l = n.get(null);
            else {
                n = new Map,
                fs.set(e, n);
                for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < i.length; u++) {
                    var h = i[u];
                    (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h),
                    l = h)
                }
                l && n.set(null, l)
            }
            i = t.instance,
            h = i.getAttribute("data-precedence"),
            u = n.get(h) || l,
            u === l && n.set(null, i),
            n.set(h, i),
            this.count++,
            l = cs.bind(this),
            i.addEventListener("load", l),
            i.addEventListener("error", l),
            u ? u.parentNode.insertBefore(i, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e,
            e.insertBefore(i, e.firstChild)),
            t.state.loading |= 4
        }
    }
    var Da = {
        $$typeof: V,
        Provider: null,
        Consumer: null,
        _currentValue: te,
        _currentValue2: te,
        _threadCount: 0
    };
    function oy(e, t, n, l, i, u, h, v, N) {
        this.tag = 1,
        this.containerInfo = e,
        this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null,
        this.callbackPriority = 0,
        this.expirationTimes = ks(-1),
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = ks(0),
        this.hiddenUpdates = ks(null),
        this.identifierPrefix = l,
        this.onUncaughtError = i,
        this.onCaughtError = u,
        this.onRecoverableError = h,
        this.pooledCache = null,
        this.pooledCacheLanes = 0,
        this.formState = N,
        this.incompleteTransitions = new Map
    }
    function Uh(e, t, n, l, i, u, h, v, N, A, H, Y) {
        return e = new oy(e,t,n,h,N,A,H,Y,v),
        t = 1,
        u === !0 && (t |= 24),
        u = gt(3, null, null, t),
        e.current = u,
        u.stateNode = e,
        t = Or(),
        t.refCount++,
        e.pooledCache = t,
        t.refCount++,
        u.memoizedState = {
            element: l,
            isDehydrated: n,
            cache: t
        },
        zr(u),
        e
    }
    function Hh(e) {
        return e ? (e = pl,
        e) : pl
    }
    function qh(e, t, n, l, i, u) {
        i = Hh(i),
        l.context === null ? l.context = i : l.pendingContext = i,
        l = Sn(t),
        l.payload = {
            element: n
        },
        u = u === void 0 ? null : u,
        u !== null && (l.callback = u),
        n = En(e, l, t),
        n !== null && (ct(n, e, t),
        ha(n, e, t))
    }
    function Bh(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var n = e.retryLane;
            e.retryLane = n !== 0 && n < t ? n : t
        }
    }
    function Wu(e, t) {
        Bh(e, t),
        (e = e.alternate) && Bh(e, t)
    }
    function Gh(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Xn(e, 67108864);
            t !== null && ct(t, e, 67108864),
            Wu(e, 67108864)
        }
    }
    function Yh(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = bt();
            t = Zs(t);
            var n = Xn(e, t);
            n !== null && ct(n, e, t),
            Wu(e, t)
        }
    }
    var hs = !0;
    function cy(e, t, n, l) {
        var i = D.T;
        D.T = null;
        var u = X.p;
        try {
            X.p = 2,
            Pu(e, t, n, l)
        } finally {
            X.p = u,
            D.T = i
        }
    }
    function fy(e, t, n, l) {
        var i = D.T;
        D.T = null;
        var u = X.p;
        try {
            X.p = 8,
            Pu(e, t, n, l)
        } finally {
            X.p = u,
            D.T = i
        }
    }
    function Pu(e, t, n, l) {
        if (hs) {
            var i = Iu(l);
            if (i === null)
                qu(e, t, l, ms, n),
                Qh(e, l);
            else if (hy(i, e, t, n, l))
                l.stopPropagation();
            else if (Qh(e, l),
            t & 4 && -1 < dy.indexOf(e)) {
                for (; i !== null; ) {
                    var u = il(i);
                    if (u !== null)
                        switch (u.tag) {
                        case 3:
                            if (u = u.stateNode,
                            u.current.memoizedState.isDehydrated) {
                                var h = Bn(u.pendingLanes);
                                if (h !== 0) {
                                    var v = u;
                                    for (v.pendingLanes |= 2,
                                    v.entangledLanes |= 2; h; ) {
                                        var N = 1 << 31 - ht(h);
                                        v.entanglements[1] |= N,
                                        h &= ~N
                                    }
                                    Bt(u),
                                    (Ee & 6) === 0 && (Fi = ft() + 500,
                                    Oa(0))
                                }
                            }
                            break;
                        case 31:
                        case 13:
                            v = Xn(u, 2),
                            v !== null && ct(v, u, 2),
                            Pi(),
                            Wu(u, 2)
                        }
                    if (u = Iu(l),
                    u === null && qu(e, t, l, ms, n),
                    u === i)
                        break;
                    i = u
                }
                i !== null && l.stopPropagation()
            } else
                qu(e, t, l, null, n)
        }
    }
    function Iu(e) {
        return e = tr(e),
        eo(e)
    }
    var ms = null;
    function eo(e) {
        if (ms = null,
        e = al(e),
        e !== null) {
            var t = f(e);
            if (t === null)
                e = null;
            else {
                var n = t.tag;
                if (n === 13) {
                    if (e = d(t),
                    e !== null)
                        return e;
                    e = null
                } else if (n === 31) {
                    if (e = m(t),
                    e !== null)
                        return e;
                    e = null
                } else if (n === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated)
                        return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else
                    t !== e && (e = null)
            }
        }
        return ms = e,
        null
    }
    function Vh(e) {
        switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 8;
        case "message":
            switch (Wg()) {
            case $o:
                return 2;
            case Fo:
                return 8;
            case li:
            case Pg:
                return 32;
            case Wo:
                return 268435456;
            default:
                return 32
            }
        default:
            return 32
        }
    }
    var to = !1
      , zn = null
      , Ln = null
      , Dn = null
      , Ua = new Map
      , Ha = new Map
      , Un = []
      , dy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function Qh(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            zn = null;
            break;
        case "dragenter":
        case "dragleave":
            Ln = null;
            break;
        case "mouseover":
        case "mouseout":
            Dn = null;
            break;
        case "pointerover":
        case "pointerout":
            Ua.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Ha.delete(t.pointerId)
        }
    }
    function qa(e, t, n, l, i, u) {
        return e === null || e.nativeEvent !== u ? (e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: l,
            nativeEvent: u,
            targetContainers: [i]
        },
        t !== null && (t = il(t),
        t !== null && Gh(t)),
        e) : (e.eventSystemFlags |= l,
        t = e.targetContainers,
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e)
    }
    function hy(e, t, n, l, i) {
        switch (t) {
        case "focusin":
            return zn = qa(zn, e, t, n, l, i),
            !0;
        case "dragenter":
            return Ln = qa(Ln, e, t, n, l, i),
            !0;
        case "mouseover":
            return Dn = qa(Dn, e, t, n, l, i),
            !0;
        case "pointerover":
            var u = i.pointerId;
            return Ua.set(u, qa(Ua.get(u) || null, e, t, n, l, i)),
            !0;
        case "gotpointercapture":
            return u = i.pointerId,
            Ha.set(u, qa(Ha.get(u) || null, e, t, n, l, i)),
            !0
        }
        return !1
    }
    function Xh(e) {
        var t = al(e.target);
        if (t !== null) {
            var n = f(t);
            if (n !== null) {
                if (t = n.tag,
                t === 13) {
                    if (t = d(n),
                    t !== null) {
                        e.blockedOn = t,
                        lc(e.priority, function() {
                            Yh(n)
                        });
                        return
                    }
                } else if (t === 31) {
                    if (t = m(n),
                    t !== null) {
                        e.blockedOn = t,
                        lc(e.priority, function() {
                            Yh(n)
                        });
                        return
                    }
                } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function gs(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Iu(e.nativeEvent);
            if (n === null) {
                n = e.nativeEvent;
                var l = new n.constructor(n.type,n);
                er = l,
                n.target.dispatchEvent(l),
                er = null
            } else
                return t = il(n),
                t !== null && Gh(t),
                e.blockedOn = n,
                !1;
            t.shift()
        }
        return !0
    }
    function kh(e, t, n) {
        gs(e) && n.delete(t)
    }
    function my() {
        to = !1,
        zn !== null && gs(zn) && (zn = null),
        Ln !== null && gs(Ln) && (Ln = null),
        Dn !== null && gs(Dn) && (Dn = null),
        Ua.forEach(kh),
        Ha.forEach(kh)
    }
    function ps(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        to || (to = !0,
        s.unstable_scheduleCallback(s.unstable_NormalPriority, my)))
    }
    var ys = null;
    function Zh(e) {
        ys !== e && (ys = e,
        s.unstable_scheduleCallback(s.unstable_NormalPriority, function() {
            ys === e && (ys = null);
            for (var t = 0; t < e.length; t += 3) {
                var n = e[t]
                  , l = e[t + 1]
                  , i = e[t + 2];
                if (typeof l != "function") {
                    if (eo(l || n) === null)
                        continue;
                    break
                }
                var u = il(n);
                u !== null && (e.splice(t, 3),
                t -= 3,
                Ir(u, {
                    pending: !0,
                    data: i,
                    method: n.method,
                    action: l
                }, l, i))
            }
        }))
    }
    function Gl(e) {
        function t(N) {
            return ps(N, e)
        }
        zn !== null && ps(zn, e),
        Ln !== null && ps(Ln, e),
        Dn !== null && ps(Dn, e),
        Ua.forEach(t),
        Ha.forEach(t);
        for (var n = 0; n < Un.length; n++) {
            var l = Un[n];
            l.blockedOn === e && (l.blockedOn = null)
        }
        for (; 0 < Un.length && (n = Un[0],
        n.blockedOn === null); )
            Xh(n),
            n.blockedOn === null && Un.shift();
        if (n = (e.ownerDocument || e).$$reactFormReplay,
        n != null)
            for (l = 0; l < n.length; l += 3) {
                var i = n[l]
                  , u = n[l + 1]
                  , h = i[at] || null;
                if (typeof u == "function")
                    h || Zh(n);
                else if (h) {
                    var v = null;
                    if (u && u.hasAttribute("formAction")) {
                        if (i = u,
                        h = u[at] || null)
                            v = h.formAction;
                        else if (eo(i) !== null)
                            continue
                    } else
                        v = h.action;
                    typeof v == "function" ? n[l + 1] = v : (n.splice(l, 3),
                    l -= 3),
                    Zh(n)
                }
            }
    }
    function Kh() {
        function e(u) {
            u.canIntercept && u.info === "react-transition" && u.intercept({
                handler: function() {
                    return new Promise(function(h) {
                        return i = h
                    }
                    )
                },
                focusReset: "manual",
                scroll: "manual"
            })
        }
        function t() {
            i !== null && (i(),
            i = null),
            l || setTimeout(n, 20)
        }
        function n() {
            if (!l && !navigation.transition) {
                var u = navigation.currentEntry;
                u && u.url != null && navigation.navigate(u.url, {
                    state: u.getState(),
                    info: "react-transition",
                    history: "replace"
                })
            }
        }
        if (typeof navigation == "object") {
            var l = !1
              , i = null;
            return navigation.addEventListener("navigate", e),
            navigation.addEventListener("navigatesuccess", t),
            navigation.addEventListener("navigateerror", t),
            setTimeout(n, 100),
            function() {
                l = !0,
                navigation.removeEventListener("navigate", e),
                navigation.removeEventListener("navigatesuccess", t),
                navigation.removeEventListener("navigateerror", t),
                i !== null && (i(),
                i = null)
            }
        }
    }
    function no(e) {
        this._internalRoot = e
    }
    xs.prototype.render = no.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(o(409));
        var n = t.current
          , l = bt();
        qh(n, l, e, t, null, null)
    }
    ,
    xs.prototype.unmount = no.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            qh(e.current, 2, null, e, null, null),
            Pi(),
            t[ll] = null
        }
    }
    ;
    function xs(e) {
        this._internalRoot = e
    }
    xs.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = nc();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var n = 0; n < Un.length && t !== 0 && t < Un[n].priority; n++)
                ;
            Un.splice(n, 0, e),
            n === 0 && Xh(e)
        }
    }
    ;
    var Jh = a.version;
    if (Jh !== "19.2.4")
        throw Error(o(527, Jh, "19.2.4"));
    X.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","),
            Error(o(268, e)));
        return e = p(t),
        e = e !== null ? b(e) : null,
        e = e === null ? null : e.stateNode,
        e
    }
    ;
    var gy = {
        bundleType: 0,
        version: "19.2.4",
        rendererPackageName: "react-dom",
        currentDispatcherRef: D,
        reconcilerVersion: "19.2.4"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var vs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vs.isDisabled && vs.supportsFiber)
            try {
                Kl = vs.inject(gy),
                dt = vs
            } catch {}
    }
    return Qa.createRoot = function(e, t) {
        if (!c(e))
            throw Error(o(299));
        var n = !1
          , l = ""
          , i = td
          , u = nd
          , h = ld;
        return t != null && (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
        t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
        t.onCaughtError !== void 0 && (u = t.onCaughtError),
        t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        t = Uh(e, 1, !1, null, null, n, l, null, i, u, h, Kh),
        e[ll] = t.current,
        Hu(e),
        new no(t)
    }
    ,
    Qa.hydrateRoot = function(e, t, n) {
        if (!c(e))
            throw Error(o(299));
        var l = !1
          , i = ""
          , u = td
          , h = nd
          , v = ld
          , N = null;
        return n != null && (n.unstable_strictMode === !0 && (l = !0),
        n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
        n.onUncaughtError !== void 0 && (u = n.onUncaughtError),
        n.onCaughtError !== void 0 && (h = n.onCaughtError),
        n.onRecoverableError !== void 0 && (v = n.onRecoverableError),
        n.formState !== void 0 && (N = n.formState)),
        t = Uh(e, 1, !0, t, n ?? null, l, i, N, u, h, v, Kh),
        t.context = Hh(null),
        n = t.current,
        l = bt(),
        l = Zs(l),
        i = Sn(l),
        i.callback = null,
        En(n, i, l),
        n = l,
        t.current.lanes = n,
        $l(t, n),
        Bt(t),
        e[ll] = t.current,
        Hu(e),
        new xs(t)
    }
    ,
    Qa.version = "19.2.4",
    Qa
}
var Pm;
function yv() {
    if (Pm)
        return wo.exports;
    Pm = 1;
    function s() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)
            } catch (a) {
                console.error(a)
            }
    }
    return s(),
    wo.exports = pv(),
    wo.exports
}
var xv = yv();
var Im = "popstate";
function eg(s) {
    return typeof s == "object" && s != null && "pathname"in s && "search"in s && "hash"in s && "state"in s && "key"in s
}
function vv(s={}) {
    function a(o, c) {
        let f = c.state?.masked
          , {pathname: d, search: m, hash: g} = f || o.location;
        return Lo("", {
            pathname: d,
            search: m,
            hash: g
        }, c.state && c.state.usr || null, c.state && c.state.key || "default", f ? {
            pathname: o.location.pathname,
            search: o.location.search,
            hash: o.location.hash
        } : void 0)
    }
    function r(o, c) {
        return typeof c == "string" ? c : Wa(c)
    }
    return Sv(a, r, null, s)
}
function ke(s, a) {
    if (s === !1 || s === null || typeof s > "u")
        throw new Error(a)
}
function Xt(s, a) {
    if (!s) {
        typeof console < "u" && console.warn(a);
        try {
            throw new Error(a)
        } catch {}
    }
}
function bv() {
    return Math.random().toString(36).substring(2, 10)
}
function tg(s, a) {
    return {
        usr: s.state,
        key: s.key,
        idx: a,
        masked: s.unstable_mask ? {
            pathname: s.pathname,
            search: s.search,
            hash: s.hash
        } : void 0
    }
}
function Lo(s, a, r=null, o, c) {
    return {
        pathname: typeof s == "string" ? s : s.pathname,
        search: "",
        hash: "",
        ...typeof a == "string" ? Ia(a) : a,
        state: r,
        key: a && a.key || o || bv(),
        unstable_mask: c
    }
}
function Wa({pathname: s="/", search: a="", hash: r=""}) {
    return a && a !== "?" && (s += a.charAt(0) === "?" ? a : "?" + a),
    r && r !== "#" && (s += r.charAt(0) === "#" ? r : "#" + r),
    s
}
function Ia(s) {
    let a = {};
    if (s) {
        let r = s.indexOf("#");
        r >= 0 && (a.hash = s.substring(r),
        s = s.substring(0, r));
        let o = s.indexOf("?");
        o >= 0 && (a.search = s.substring(o),
        s = s.substring(0, o)),
        s && (a.pathname = s)
    }
    return a
}
function Sv(s, a, r, o={}) {
    let {window: c=document.defaultView, v5Compat: f=!1} = o
      , d = c.history
      , m = "POP"
      , g = null
      , p = b();
    p == null && (p = 0,
    d.replaceState({
        ...d.state,
        idx: p
    }, ""));
    function b() {
        return (d.state || {
            idx: null
        }).idx
    }
    function x() {
        m = "POP";
        let _ = b()
          , z = _ == null ? null : _ - p;
        p = _,
        g && g({
            action: m,
            location: T.location,
            delta: z
        })
    }
    function E(_, z) {
        m = "PUSH";
        let G = eg(_) ? _ : Lo(T.location, _, z);
        p = b() + 1;
        let V = tg(G, p)
          , J = T.createHref(G.unstable_mask || G);
        try {
            d.pushState(V, "", J)
        } catch (W) {
            if (W instanceof DOMException && W.name === "DataCloneError")
                throw W;
            c.location.assign(J)
        }
        f && g && g({
            action: m,
            location: T.location,
            delta: 1
        })
    }
    function S(_, z) {
        m = "REPLACE";
        let G = eg(_) ? _ : Lo(T.location, _, z);
        p = b();
        let V = tg(G, p)
          , J = T.createHref(G.unstable_mask || G);
        d.replaceState(V, "", J),
        f && g && g({
            action: m,
            location: T.location,
            delta: 0
        })
    }
    function w(_) {
        return Ev(_)
    }
    let T = {
        get action() {
            return m
        },
        get location() {
            return s(c, d)
        },
        listen(_) {
            if (g)
                throw new Error("A history only accepts one active listener");
            return c.addEventListener(Im, x),
            g = _,
            () => {
                c.removeEventListener(Im, x),
                g = null
            }
        },
        createHref(_) {
            return a(c, _)
        },
        createURL: w,
        encodeLocation(_) {
            let z = w(_);
            return {
                pathname: z.pathname,
                search: z.search,
                hash: z.hash
            }
        },
        push: E,
        replace: S,
        go(_) {
            return d.go(_)
        }
    };
    return T
}
function Ev(s, a=!1) {
    let r = "http://localhost";
    typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href),
    ke(r, "No window.location.(origin|href) available to create URL");
    let o = typeof s == "string" ? s : Wa(s);
    return o = o.replace(/ $/, "%20"),
    !a && o.startsWith("//") && (o = r + o),
    new URL(o,r)
}
function jg(s, a, r="/") {
    return wv(s, a, r, !1)
}
function wv(s, a, r, o) {
    let c = typeof a == "string" ? Ia(a) : a
      , f = cn(c.pathname || "/", r);
    if (f == null)
        return null;
    let d = Cg(s);
    _v(d);
    let m = null;
    for (let g = 0; m == null && g < d.length; ++g) {
        let p = Dv(f);
        m = zv(d[g], p, o)
    }
    return m
}
function Cg(s, a=[], r=[], o="", c=!1) {
    let f = (d, m, g=c, p) => {
        let b = {
            relativePath: p === void 0 ? d.path || "" : p,
            caseSensitive: d.caseSensitive === !0,
            childrenIndex: m,
            route: d
        };
        if (b.relativePath.startsWith("/")) {
            if (!b.relativePath.startsWith(o) && g)
                return;
            ke(b.relativePath.startsWith(o), `Absolute route path "${b.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),
            b.relativePath = b.relativePath.slice(o.length)
        }
        let x = Qt([o, b.relativePath])
          , E = r.concat(b);
        d.children && d.children.length > 0 && (ke(d.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${x}".`),
        Cg(d.children, a, E, x, g)),
        !(d.path == null && !d.index) && a.push({
            path: x,
            score: Av(x, d.index),
            routesMeta: E
        })
    }
    ;
    return s.forEach( (d, m) => {
        if (d.path === "" || !d.path?.includes("?"))
            f(d, m);
        else
            for (let g of Tg(d.path))
                f(d, m, !0, g)
    }
    ),
    a
}
function Tg(s) {
    let a = s.split("/");
    if (a.length === 0)
        return [];
    let[r,...o] = a
      , c = r.endsWith("?")
      , f = r.replace(/\?$/, "");
    if (o.length === 0)
        return c ? [f, ""] : [f];
    let d = Tg(o.join("/"))
      , m = [];
    return m.push(...d.map(g => g === "" ? f : [f, g].join("/"))),
    c && m.push(...d),
    m.map(g => s.startsWith("/") && g === "" ? "/" : g)
}
function _v(s) {
    s.sort( (a, r) => a.score !== r.score ? r.score - a.score : Mv(a.routesMeta.map(o => o.childrenIndex), r.routesMeta.map(o => o.childrenIndex)))
}
var Nv = /^:[\w-]+$/
  , jv = 3
  , Cv = 2
  , Tv = 1
  , Ov = 10
  , Rv = -2
  , ng = s => s === "*";
function Av(s, a) {
    let r = s.split("/")
      , o = r.length;
    return r.some(ng) && (o += Rv),
    a && (o += Cv),
    r.filter(c => !ng(c)).reduce( (c, f) => c + (Nv.test(f) ? jv : f === "" ? Tv : Ov), o)
}
function Mv(s, a) {
    return s.length === a.length && s.slice(0, -1).every( (o, c) => o === a[c]) ? s[s.length - 1] - a[a.length - 1] : 0
}
function zv(s, a, r=!1) {
    let {routesMeta: o} = s
      , c = {}
      , f = "/"
      , d = [];
    for (let m = 0; m < o.length; ++m) {
        let g = o[m]
          , p = m === o.length - 1
          , b = f === "/" ? a : a.slice(f.length) || "/"
          , x = zs({
            path: g.relativePath,
            caseSensitive: g.caseSensitive,
            end: p
        }, b)
          , E = g.route;
        if (!x && p && r && !o[o.length - 1].route.index && (x = zs({
            path: g.relativePath,
            caseSensitive: g.caseSensitive,
            end: !1
        }, b)),
        !x)
            return null;
        Object.assign(c, x.params),
        d.push({
            params: c,
            pathname: Qt([f, x.pathname]),
            pathnameBase: Bv(Qt([f, x.pathnameBase])),
            route: E
        }),
        x.pathnameBase !== "/" && (f = Qt([f, x.pathnameBase]))
    }
    return d
}
function zs(s, a) {
    typeof s == "string" && (s = {
        path: s,
        caseSensitive: !1,
        end: !0
    });
    let[r,o] = Lv(s.path, s.caseSensitive, s.end)
      , c = a.match(r);
    if (!c)
        return null;
    let f = c[0]
      , d = f.replace(/(.)\/+$/, "$1")
      , m = c.slice(1);
    return {
        params: o.reduce( (p, {paramName: b, isOptional: x}, E) => {
            if (b === "*") {
                let w = m[E] || "";
                d = f.slice(0, f.length - w.length).replace(/(.)\/+$/, "$1")
            }
            const S = m[E];
            return x && !S ? p[b] = void 0 : p[b] = (S || "").replace(/%2F/g, "/"),
            p
        }
        , {}),
        pathname: f,
        pathnameBase: d,
        pattern: s
    }
}
function Lv(s, a=!1, r=!0) {
    Xt(s === "*" || !s.endsWith("*") || s.endsWith("/*"), `Route path "${s}" will be treated as if it were "${s.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/, "/*")}".`);
    let o = []
      , c = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, m, g, p, b) => {
        if (o.push({
            paramName: m,
            isOptional: g != null
        }),
        g) {
            let x = b.charAt(p + d.length);
            return x && x !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?"
        }
        return "/([^\\/]+)"
    }
    ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return s.endsWith("*") ? (o.push({
        paramName: "*"
    }),
    c += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? c += "\\/*$" : s !== "" && s !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c,a ? void 0 : "i"), o]
}
function Dv(s) {
    try {
        return s.split("/").map(a => decodeURIComponent(a).replace(/\//g, "%2F")).join("/")
    } catch (a) {
        return Xt(!1, `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`),
        s
    }
}
function cn(s, a) {
    if (a === "/")
        return s;
    if (!s.toLowerCase().startsWith(a.toLowerCase()))
        return null;
    let r = a.endsWith("/") ? a.length - 1 : a.length
      , o = s.charAt(r);
    return o && o !== "/" ? null : s.slice(r) || "/"
}
var Uv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Hv(s, a="/") {
    let {pathname: r, search: o="", hash: c=""} = typeof s == "string" ? Ia(s) : s, f;
    return r ? (r = r.replace(/\/\/+/g, "/"),
    r.startsWith("/") ? f = lg(r.substring(1), "/") : f = lg(r, a)) : f = a,
    {
        pathname: f,
        search: Gv(o),
        hash: Yv(c)
    }
}
function lg(s, a) {
    let r = a.replace(/\/+$/, "").split("/");
    return s.split("/").forEach(c => {
        c === ".." ? r.length > 1 && r.pop() : c !== "." && r.push(c)
    }
    ),
    r.length > 1 ? r.join("/") : "/"
}
function Co(s, a, r, o) {
    return `Cannot include a '${s}' character in a manually specified \`to.${a}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function qv(s) {
    return s.filter( (a, r) => r === 0 || a.route.path && a.route.path.length > 0)
}
function Og(s) {
    let a = qv(s);
    return a.map( (r, o) => o === a.length - 1 ? r.pathname : r.pathnameBase)
}
function Go(s, a, r, o=!1) {
    let c;
    typeof s == "string" ? c = Ia(s) : (c = {
        ...s
    },
    ke(!c.pathname || !c.pathname.includes("?"), Co("?", "pathname", "search", c)),
    ke(!c.pathname || !c.pathname.includes("#"), Co("#", "pathname", "hash", c)),
    ke(!c.search || !c.search.includes("#"), Co("#", "search", "hash", c)));
    let f = s === "" || c.pathname === "", d = f ? "/" : c.pathname, m;
    if (d == null)
        m = r;
    else {
        let x = a.length - 1;
        if (!o && d.startsWith("..")) {
            let E = d.split("/");
            for (; E[0] === ".."; )
                E.shift(),
                x -= 1;
            c.pathname = E.join("/")
        }
        m = x >= 0 ? a[x] : "/"
    }
    let g = Hv(c, m)
      , p = d && d !== "/" && d.endsWith("/")
      , b = (f || d === ".") && r.endsWith("/");
    return !g.pathname.endsWith("/") && (p || b) && (g.pathname += "/"),
    g
}
var Qt = s => s.join("/").replace(/\/\/+/g, "/")
  , Bv = s => s.replace(/\/+$/, "").replace(/^\/*/, "/")
  , Gv = s => !s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s
  , Yv = s => !s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s
  , Vv = class {
    constructor(s, a, r, o=!1) {
        this.status = s,
        this.statusText = a || "",
        this.internal = o,
        r instanceof Error ? (this.data = r.toString(),
        this.error = r) : this.data = r
    }
}
;
function Qv(s) {
    return s != null && typeof s.status == "number" && typeof s.statusText == "string" && typeof s.internal == "boolean" && "data"in s
}
function Xv(s) {
    return s.map(a => a.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/"
}
var Rg = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ag(s, a) {
    let r = s;
    if (typeof r != "string" || !Uv.test(r))
        return {
            absoluteURL: void 0,
            isExternal: !1,
            to: r
        };
    let o = r
      , c = !1;
    if (Rg)
        try {
            let f = new URL(window.location.href)
              , d = r.startsWith("//") ? new URL(f.protocol + r) : new URL(r)
              , m = cn(d.pathname, a);
            d.origin === f.origin && m != null ? r = m + d.search + d.hash : c = !0
        } catch {
            Xt(!1, `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
    return {
        absoluteURL: o,
        isExternal: c,
        to: r
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Mg = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Mg);
var kv = ["GET", ...Mg];
new Set(kv);
var kl = U.createContext(null);
kl.displayName = "DataRouter";
var Us = U.createContext(null);
Us.displayName = "DataRouterState";
var Zv = U.createContext(!1)
  , zg = U.createContext({
    isTransitioning: !1
});
zg.displayName = "ViewTransition";
var Kv = U.createContext(new Map);
Kv.displayName = "Fetchers";
var Jv = U.createContext(null);
Jv.displayName = "Await";
var At = U.createContext(null);
At.displayName = "Navigation";
var Hs = U.createContext(null);
Hs.displayName = "Location";
var fn = U.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
fn.displayName = "Route";
var Yo = U.createContext(null);
Yo.displayName = "RouteError";
var Lg = "REACT_ROUTER_ERROR"
  , $v = "REDIRECT"
  , Fv = "ROUTE_ERROR_RESPONSE";
function Wv(s) {
    if (s.startsWith(`${Lg}:${$v}:{`))
        try {
            let a = JSON.parse(s.slice(28));
            if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
                return a
        } catch {}
}
function Pv(s) {
    if (s.startsWith(`${Lg}:${Fv}:{`))
        try {
            let a = JSON.parse(s.slice(40));
            if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
                return new Vv(a.status,a.statusText,a.data)
        } catch {}
}
function Iv(s, {relative: a}={}) {
    ke(ei(), "useHref() may be used only in the context of a <Router> component.");
    let {basename: r, navigator: o} = U.useContext(At)
      , {hash: c, pathname: f, search: d} = ti(s, {
        relative: a
    })
      , m = f;
    return r !== "/" && (m = f === "/" ? r : Qt([r, f])),
    o.createHref({
        pathname: m,
        search: d,
        hash: c
    })
}
function ei() {
    return U.useContext(Hs) != null
}
function dn() {
    return ke(ei(), "useLocation() may be used only in the context of a <Router> component."),
    U.useContext(Hs).location
}
var Dg = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ug(s) {
    U.useContext(At).static || U.useLayoutEffect(s)
}
function Hg() {
    let {isDataRoute: s} = U.useContext(fn);
    return s ? db() : eb()
}
function eb() {
    ke(ei(), "useNavigate() may be used only in the context of a <Router> component.");
    let s = U.useContext(kl)
      , {basename: a, navigator: r} = U.useContext(At)
      , {matches: o} = U.useContext(fn)
      , {pathname: c} = dn()
      , f = JSON.stringify(Og(o))
      , d = U.useRef(!1);
    return Ug( () => {
        d.current = !0
    }
    ),
    U.useCallback( (g, p={}) => {
        if (Xt(d.current, Dg),
        !d.current)
            return;
        if (typeof g == "number") {
            r.go(g);
            return
        }
        let b = Go(g, JSON.parse(f), c, p.relative === "path");
        s == null && a !== "/" && (b.pathname = b.pathname === "/" ? a : Qt([a, b.pathname])),
        (p.replace ? r.replace : r.push)(b, p.state, p)
    }
    , [a, r, f, c, s])
}
U.createContext(null);
function ti(s, {relative: a}={}) {
    let {matches: r} = U.useContext(fn)
      , {pathname: o} = dn()
      , c = JSON.stringify(Og(r));
    return U.useMemo( () => Go(s, JSON.parse(c), o, a === "path"), [s, c, o, a])
}
function tb(s, a) {
    return qg(s)
}
function qg(s, a, r) {
    ke(ei(), "useRoutes() may be used only in the context of a <Router> component.");
    let {navigator: o} = U.useContext(At)
      , {matches: c} = U.useContext(fn)
      , f = c[c.length - 1]
      , d = f ? f.params : {}
      , m = f ? f.pathname : "/"
      , g = f ? f.pathnameBase : "/"
      , p = f && f.route;
    {
        let _ = p && p.path || "";
        Gg(m, !p || _.endsWith("*") || _.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_ === "/" ? "*" : `${_}/*`}">.`)
    }
    let b = dn(), x;
    x = b;
    let E = x.pathname || "/"
      , S = E;
    if (g !== "/") {
        let _ = g.replace(/^\//, "").split("/");
        S = "/" + E.replace(/^\//, "").split("/").slice(_.length).join("/")
    }
    let w = jg(s, {
        pathname: S
    });
    return Xt(p || w != null, `No routes matched location "${x.pathname}${x.search}${x.hash}" `),
    Xt(w == null || w[w.length - 1].route.element !== void 0 || w[w.length - 1].route.Component !== void 0 || w[w.length - 1].route.lazy !== void 0, `Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),
    sb(w && w.map(_ => Object.assign({}, _, {
        params: Object.assign({}, d, _.params),
        pathname: Qt([g, o.encodeLocation ? o.encodeLocation(_.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : _.pathname]),
        pathnameBase: _.pathnameBase === "/" ? g : Qt([g, o.encodeLocation ? o.encodeLocation(_.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : _.pathnameBase])
    })), c, r)
}
function nb() {
    let s = fb()
      , a = Qv(s) ? `${s.status} ${s.statusText}` : s instanceof Error ? s.message : JSON.stringify(s)
      , r = s instanceof Error ? s.stack : null
      , o = "rgba(200,200,200, 0.5)"
      , c = {
        padding: "0.5rem",
        backgroundColor: o
    }
      , f = {
        padding: "2px 4px",
        backgroundColor: o
    }
      , d = null;
    return console.error("Error handled by React Router default ErrorBoundary:", s),
    d = U.createElement(U.Fragment, null, U.createElement("p", null, "💿 Hey developer 👋"), U.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", U.createElement("code", {
        style: f
    }, "ErrorBoundary"), " or", " ", U.createElement("code", {
        style: f
    }, "errorElement"), " prop on your route.")),
    U.createElement(U.Fragment, null, U.createElement("h2", null, "Unexpected Application Error!"), U.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, a), r ? U.createElement("pre", {
        style: c
    }, r) : null, d)
}
var lb = U.createElement(nb, null)
  , Bg = class extends U.Component {
    constructor(s) {
        super(s),
        this.state = {
            location: s.location,
            revalidation: s.revalidation,
            error: s.error
        }
    }
    static getDerivedStateFromError(s) {
        return {
            error: s
        }
    }
    static getDerivedStateFromProps(s, a) {
        return a.location !== s.location || a.revalidation !== "idle" && s.revalidation === "idle" ? {
            error: s.error,
            location: s.location,
            revalidation: s.revalidation
        } : {
            error: s.error !== void 0 ? s.error : a.error,
            location: a.location,
            revalidation: s.revalidation || a.revalidation
        }
    }
    componentDidCatch(s, a) {
        this.props.onError ? this.props.onError(s, a) : console.error("React Router caught the following error during render", s)
    }
    render() {
        let s = this.state.error;
        if (this.context && typeof s == "object" && s && "digest"in s && typeof s.digest == "string") {
            const r = Pv(s.digest);
            r && (s = r)
        }
        let a = s !== void 0 ? U.createElement(fn.Provider, {
            value: this.props.routeContext
        }, U.createElement(Yo.Provider, {
            value: s,
            children: this.props.component
        })) : this.props.children;
        return this.context ? U.createElement(ab, {
            error: s
        }, a) : a
    }
}
;
Bg.contextType = Zv;
var To = new WeakMap;
function ab({children: s, error: a}) {
    let {basename: r} = U.useContext(At);
    if (typeof a == "object" && a && "digest"in a && typeof a.digest == "string") {
        let o = Wv(a.digest);
        if (o) {
            let c = To.get(a);
            if (c)
                throw c;
            let f = Ag(o.location, r);
            if (Rg && !To.get(a))
                if (f.isExternal || o.reloadDocument)
                    window.location.href = f.absoluteURL || f.to;
                else {
                    const d = Promise.resolve().then( () => window.__reactRouterDataRouter.navigate(f.to, {
                        replace: o.replace
                    }));
                    throw To.set(a, d),
                    d
                }
            return U.createElement("meta", {
                httpEquiv: "refresh",
                content: `0;url=${f.absoluteURL || f.to}`
            })
        }
    }
    return s
}
function ib({routeContext: s, match: a, children: r}) {
    let o = U.useContext(kl);
    return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id),
    U.createElement(fn.Provider, {
        value: s
    }, r)
}
function sb(s, a=[], r) {
    let o = r?.state;
    if (s == null) {
        if (!o)
            return null;
        if (o.errors)
            s = o.matches;
        else if (a.length === 0 && !o.initialized && o.matches.length > 0)
            s = o.matches;
        else
            return null
    }
    let c = s
      , f = o?.errors;
    if (f != null) {
        let b = c.findIndex(x => x.route.id && f?.[x.route.id] !== void 0);
        ke(b >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`),
        c = c.slice(0, Math.min(c.length, b + 1))
    }
    let d = !1
      , m = -1;
    if (r && o) {
        d = o.renderFallback;
        for (let b = 0; b < c.length; b++) {
            let x = c[b];
            if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (m = b),
            x.route.id) {
                let {loaderData: E, errors: S} = o
                  , w = x.route.loader && !E.hasOwnProperty(x.route.id) && (!S || S[x.route.id] === void 0);
                if (x.route.lazy || w) {
                    r.isStatic && (d = !0),
                    m >= 0 ? c = c.slice(0, m + 1) : c = [c[0]];
                    break
                }
            }
        }
    }
    let g = r?.onError
      , p = o && g ? (b, x) => {
        g(b, {
            location: o.location,
            params: o.matches?.[0]?.params ?? {},
            unstable_pattern: Xv(o.matches),
            errorInfo: x
        })
    }
    : void 0;
    return c.reduceRight( (b, x, E) => {
        let S, w = !1, T = null, _ = null;
        o && (S = f && x.route.id ? f[x.route.id] : void 0,
        T = x.route.errorElement || lb,
        d && (m < 0 && E === 0 ? (Gg("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"),
        w = !0,
        _ = null) : m === E && (w = !0,
        _ = x.route.hydrateFallbackElement || null)));
        let z = a.concat(c.slice(0, E + 1))
          , G = () => {
            let V;
            return S ? V = T : w ? V = _ : x.route.Component ? V = U.createElement(x.route.Component, null) : x.route.element ? V = x.route.element : V = b,
            U.createElement(ib, {
                match: x,
                routeContext: {
                    outlet: b,
                    matches: z,
                    isDataRoute: o != null
                },
                children: V
            })
        }
        ;
        return o && (x.route.ErrorBoundary || x.route.errorElement || E === 0) ? U.createElement(Bg, {
            location: o.location,
            revalidation: o.revalidation,
            component: T,
            error: S,
            children: G(),
            routeContext: {
                outlet: null,
                matches: z,
                isDataRoute: !0
            },
            onError: p
        }) : G()
    }
    , null)
}
function Vo(s) {
    return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function rb(s) {
    let a = U.useContext(kl);
    return ke(a, Vo(s)),
    a
}
function ub(s) {
    let a = U.useContext(Us);
    return ke(a, Vo(s)),
    a
}
function ob(s) {
    let a = U.useContext(fn);
    return ke(a, Vo(s)),
    a
}
function Qo(s) {
    let a = ob(s)
      , r = a.matches[a.matches.length - 1];
    return ke(r.route.id, `${s} can only be used on routes that contain a unique "id"`),
    r.route.id
}
function cb() {
    return Qo("useRouteId")
}
function fb() {
    let s = U.useContext(Yo)
      , a = ub("useRouteError")
      , r = Qo("useRouteError");
    return s !== void 0 ? s : a.errors?.[r]
}
function db() {
    let {router: s} = rb("useNavigate")
      , a = Qo("useNavigate")
      , r = U.useRef(!1);
    return Ug( () => {
        r.current = !0
    }
    ),
    U.useCallback(async (c, f={}) => {
        Xt(r.current, Dg),
        r.current && (typeof c == "number" ? await s.navigate(c) : await s.navigate(c, {
            fromRouteId: a,
            ...f
        }))
    }
    , [s, a])
}
var ag = {};
function Gg(s, a, r) {
    !a && !ag[s] && (ag[s] = !0,
    Xt(!1, r))
}
U.memo(hb);
function hb({routes: s, future: a, state: r, isStatic: o, onError: c}) {
    return qg(s, void 0, {
        state: r,
        isStatic: o,
        onError: c
    })
}
function mb({basename: s="/", children: a=null, location: r, navigationType: o="POP", navigator: c, static: f=!1, unstable_useTransitions: d}) {
    ke(!ei(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let m = s.replace(/^\/*/, "/")
      , g = U.useMemo( () => ({
        basename: m,
        navigator: c,
        static: f,
        unstable_useTransitions: d,
        future: {}
    }), [m, c, f, d]);
    typeof r == "string" && (r = Ia(r));
    let {pathname: p="/", search: b="", hash: x="", state: E=null, key: S="default", unstable_mask: w} = r
      , T = U.useMemo( () => {
        let _ = cn(p, m);
        return _ == null ? null : {
            location: {
                pathname: _,
                search: b,
                hash: x,
                state: E,
                key: S,
                unstable_mask: w
            },
            navigationType: o
        }
    }
    , [m, p, b, x, E, S, o, w]);
    return Xt(T != null, `<Router basename="${m}"> is not able to match the URL "${p}${b}${x}" because it does not start with the basename, so the <Router> won't render anything.`),
    T == null ? null : U.createElement(At.Provider, {
        value: g
    }, U.createElement(Hs.Provider, {
        children: a,
        value: T
    }))
}
var Cs = "get"
  , Ts = "application/x-www-form-urlencoded";
function qs(s) {
    return typeof HTMLElement < "u" && s instanceof HTMLElement
}
function gb(s) {
    return qs(s) && s.tagName.toLowerCase() === "button"
}
function pb(s) {
    return qs(s) && s.tagName.toLowerCase() === "form"
}
function yb(s) {
    return qs(s) && s.tagName.toLowerCase() === "input"
}
function xb(s) {
    return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey)
}
function vb(s, a) {
    return s.button === 0 && (!a || a === "_self") && !xb(s)
}
var js = null;
function bb() {
    if (js === null)
        try {
            new FormData(document.createElement("form"),0),
            js = !1
        } catch {
            js = !0
        }
    return js
}
var Sb = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Oo(s) {
    return s != null && !Sb.has(s) ? (Xt(!1, `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ts}"`),
    null) : s
}
function Eb(s, a) {
    let r, o, c, f, d;
    if (pb(s)) {
        let m = s.getAttribute("action");
        o = m ? cn(m, a) : null,
        r = s.getAttribute("method") || Cs,
        c = Oo(s.getAttribute("enctype")) || Ts,
        f = new FormData(s)
    } else if (gb(s) || yb(s) && (s.type === "submit" || s.type === "image")) {
        let m = s.form;
        if (m == null)
            throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let g = s.getAttribute("formaction") || m.getAttribute("action");
        if (o = g ? cn(g, a) : null,
        r = s.getAttribute("formmethod") || m.getAttribute("method") || Cs,
        c = Oo(s.getAttribute("formenctype")) || Oo(m.getAttribute("enctype")) || Ts,
        f = new FormData(m,s),
        !bb()) {
            let {name: p, type: b, value: x} = s;
            if (b === "image") {
                let E = p ? `${p}.` : "";
                f.append(`${E}x`, "0"),
                f.append(`${E}y`, "0")
            } else
                p && f.append(p, x)
        }
    } else {
        if (qs(s))
            throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        r = Cs,
        o = null,
        c = Ts,
        d = s
    }
    return f && c === "text/plain" && (d = f,
    f = void 0),
    {
        action: o,
        method: r.toLowerCase(),
        encType: c,
        formData: f,
        body: d
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Xo(s, a) {
    if (s === !1 || s === null || typeof s > "u")
        throw new Error(a)
}
function wb(s, a, r, o) {
    let c = typeof s == "string" ? new URL(s,typeof window > "u" ? "server://singlefetch/" : window.location.origin) : s;
    return r ? c.pathname.endsWith("/") ? c.pathname = `${c.pathname}_.${o}` : c.pathname = `${c.pathname}.${o}` : c.pathname === "/" ? c.pathname = `_root.${o}` : a && cn(c.pathname, a) === "/" ? c.pathname = `${a.replace(/\/$/, "")}/_root.${o}` : c.pathname = `${c.pathname.replace(/\/$/, "")}.${o}`,
    c
}
async function _b(s, a) {
    if (s.id in a)
        return a[s.id];
    try {
        let r = await import(s.module);
        return a[s.id] = r,
        r
    } catch (r) {
        return console.error(`Error loading route module \`${s.module}\`, reloading page...`),
        console.error(r),
        window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
        window.location.reload(),
        new Promise( () => {}
        )
    }
}
function Nb(s) {
    return s == null ? !1 : s.href == null ? s.rel === "preload" && typeof s.imageSrcSet == "string" && typeof s.imageSizes == "string" : typeof s.rel == "string" && typeof s.href == "string"
}
async function jb(s, a, r) {
    let o = await Promise.all(s.map(async c => {
        let f = a.routes[c.route.id];
        if (f) {
            let d = await _b(f, r);
            return d.links ? d.links() : []
        }
        return []
    }
    ));
    return Rb(o.flat(1).filter(Nb).filter(c => c.rel === "stylesheet" || c.rel === "preload").map(c => c.rel === "stylesheet" ? {
        ...c,
        rel: "prefetch",
        as: "style"
    } : {
        ...c,
        rel: "prefetch"
    }))
}
function ig(s, a, r, o, c, f) {
    let d = (g, p) => r[p] ? g.route.id !== r[p].route.id : !0
      , m = (g, p) => r[p].pathname !== g.pathname || r[p].route.path?.endsWith("*") && r[p].params["*"] !== g.params["*"];
    return f === "assets" ? a.filter( (g, p) => d(g, p) || m(g, p)) : f === "data" ? a.filter( (g, p) => {
        let b = o.routes[g.route.id];
        if (!b || !b.hasLoader)
            return !1;
        if (d(g, p) || m(g, p))
            return !0;
        if (g.route.shouldRevalidate) {
            let x = g.route.shouldRevalidate({
                currentUrl: new URL(c.pathname + c.search + c.hash,window.origin),
                currentParams: r[0]?.params || {},
                nextUrl: new URL(s,window.origin),
                nextParams: g.params,
                defaultShouldRevalidate: !0
            });
            if (typeof x == "boolean")
                return x
        }
        return !0
    }
    ) : []
}
function Cb(s, a, {includeHydrateFallback: r}={}) {
    return Tb(s.map(o => {
        let c = a.routes[o.route.id];
        if (!c)
            return [];
        let f = [c.module];
        return c.clientActionModule && (f = f.concat(c.clientActionModule)),
        c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
        r && c.hydrateFallbackModule && (f = f.concat(c.hydrateFallbackModule)),
        c.imports && (f = f.concat(c.imports)),
        f
    }
    ).flat(1))
}
function Tb(s) {
    return [...new Set(s)]
}
function Ob(s) {
    let a = {}
      , r = Object.keys(s).sort();
    for (let o of r)
        a[o] = s[o];
    return a
}
function Rb(s, a) {
    let r = new Set;
    return new Set(a),
    s.reduce( (o, c) => {
        let f = JSON.stringify(Ob(c));
        return r.has(f) || (r.add(f),
        o.push({
            key: f,
            link: c
        })),
        o
    }
    , [])
}
function Yg() {
    let s = U.useContext(kl);
    return Xo(s, "You must render this element inside a <DataRouterContext.Provider> element"),
    s
}
function Ab() {
    let s = U.useContext(Us);
    return Xo(s, "You must render this element inside a <DataRouterStateContext.Provider> element"),
    s
}
var ko = U.createContext(void 0);
ko.displayName = "FrameworkContext";
function Vg() {
    let s = U.useContext(ko);
    return Xo(s, "You must render this element inside a <HydratedRouter> element"),
    s
}
function Mb(s, a) {
    let r = U.useContext(ko)
      , [o,c] = U.useState(!1)
      , [f,d] = U.useState(!1)
      , {onFocus: m, onBlur: g, onMouseEnter: p, onMouseLeave: b, onTouchStart: x} = a
      , E = U.useRef(null);
    U.useEffect( () => {
        if (s === "render" && d(!0),
        s === "viewport") {
            let T = z => {
                z.forEach(G => {
                    d(G.isIntersecting)
                }
                )
            }
              , _ = new IntersectionObserver(T,{
                threshold: .5
            });
            return E.current && _.observe(E.current),
            () => {
                _.disconnect()
            }
        }
    }
    , [s]),
    U.useEffect( () => {
        if (o) {
            let T = setTimeout( () => {
                d(!0)
            }
            , 100);
            return () => {
                clearTimeout(T)
            }
        }
    }
    , [o]);
    let S = () => {
        c(!0)
    }
      , w = () => {
        c(!1),
        d(!1)
    }
    ;
    return r ? s !== "intent" ? [f, E, {}] : [f, E, {
        onFocus: Xa(m, S),
        onBlur: Xa(g, w),
        onMouseEnter: Xa(p, S),
        onMouseLeave: Xa(b, w),
        onTouchStart: Xa(x, S)
    }] : [!1, E, {}]
}
function Xa(s, a) {
    return r => {
        s && s(r),
        r.defaultPrevented || a(r)
    }
}
function zb({page: s, ...a}) {
    let {router: r} = Yg()
      , o = U.useMemo( () => jg(r.routes, s, r.basename), [r.routes, s, r.basename]);
    return o ? U.createElement(Db, {
        page: s,
        matches: o,
        ...a
    }) : null
}
function Lb(s) {
    let {manifest: a, routeModules: r} = Vg()
      , [o,c] = U.useState([]);
    return U.useEffect( () => {
        let f = !1;
        return jb(s, a, r).then(d => {
            f || c(d)
        }
        ),
        () => {
            f = !0
        }
    }
    , [s, a, r]),
    o
}
function Db({page: s, matches: a, ...r}) {
    let o = dn()
      , {future: c, manifest: f, routeModules: d} = Vg()
      , {basename: m} = Yg()
      , {loaderData: g, matches: p} = Ab()
      , b = U.useMemo( () => ig(s, a, p, f, o, "data"), [s, a, p, f, o])
      , x = U.useMemo( () => ig(s, a, p, f, o, "assets"), [s, a, p, f, o])
      , E = U.useMemo( () => {
        if (s === o.pathname + o.search + o.hash)
            return [];
        let T = new Set
          , _ = !1;
        if (a.forEach(G => {
            let V = f.routes[G.route.id];
            !V || !V.hasLoader || (!b.some(J => J.route.id === G.route.id) && G.route.id in g && d[G.route.id]?.shouldRevalidate || V.hasClientLoader ? _ = !0 : T.add(G.route.id))
        }
        ),
        T.size === 0)
            return [];
        let z = wb(s, m, c.unstable_trailingSlashAwareDataRequests, "data");
        return _ && T.size > 0 && z.searchParams.set("_routes", a.filter(G => T.has(G.route.id)).map(G => G.route.id).join(",")),
        [z.pathname + z.search]
    }
    , [m, c.unstable_trailingSlashAwareDataRequests, g, o, f, b, a, s, d])
      , S = U.useMemo( () => Cb(x, f), [x, f])
      , w = Lb(x);
    return U.createElement(U.Fragment, null, E.map(T => U.createElement("link", {
        key: T,
        rel: "prefetch",
        as: "fetch",
        href: T,
        ...r
    })), S.map(T => U.createElement("link", {
        key: T,
        rel: "modulepreload",
        href: T,
        ...r
    })), w.map( ({key: T, link: _}) => U.createElement("link", {
        key: T,
        nonce: r.nonce,
        ..._,
        crossOrigin: _.crossOrigin ?? r.crossOrigin
    })))
}
function Ub(...s) {
    return a => {
        s.forEach(r => {
            typeof r == "function" ? r(a) : r != null && (r.current = a)
        }
        )
    }
}
var Hb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    Hb && (window.__reactRouterVersion = "7.13.1")
} catch {}
function qb({basename: s, children: a, unstable_useTransitions: r, window: o}) {
    let c = U.useRef();
    c.current == null && (c.current = vv({
        window: o,
        v5Compat: !0
    }));
    let f = c.current
      , [d,m] = U.useState({
        action: f.action,
        location: f.location
    })
      , g = U.useCallback(p => {
        r === !1 ? m(p) : U.startTransition( () => m(p))
    }
    , [r]);
    return U.useLayoutEffect( () => f.listen(g), [f, g]),
    U.createElement(mb, {
        basename: s,
        children: a,
        location: d.location,
        navigationType: d.action,
        navigator: f,
        unstable_useTransitions: r
    })
}
var Qg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Zo = U.forwardRef(function({onClick: a, discover: r="render", prefetch: o="none", relative: c, reloadDocument: f, replace: d, unstable_mask: m, state: g, target: p, to: b, preventScrollReset: x, viewTransition: E, unstable_defaultShouldRevalidate: S, ...w}, T) {
    let {basename: _, navigator: z, unstable_useTransitions: G} = U.useContext(At)
      , V = typeof b == "string" && Qg.test(b)
      , J = Ag(b, _);
    b = J.to;
    let W = Iv(b, {
        relative: c
    })
      , ue = dn()
      , P = null;
    if (m) {
        let fe = Go(m, [], ue.unstable_mask ? ue.unstable_mask.pathname : "/", !0);
        _ !== "/" && (fe.pathname = fe.pathname === "/" ? _ : Qt([_, fe.pathname])),
        P = z.createHref(fe)
    }
    let[ye,Ne,Q] = Mb(o, w)
      , k = Vb(b, {
        replace: d,
        unstable_mask: m,
        state: g,
        target: p,
        preventScrollReset: x,
        relative: c,
        viewTransition: E,
        unstable_defaultShouldRevalidate: S,
        unstable_useTransitions: G
    });
    function K(fe) {
        a && a(fe),
        fe.defaultPrevented || k(fe)
    }
    let ne = !(J.isExternal || f)
      , oe = U.createElement("a", {
        ...w,
        ...Q,
        href: (ne ? P : void 0) || J.absoluteURL || W,
        onClick: ne ? K : a,
        ref: Ub(T, Ne),
        target: p,
        "data-discover": !V && r === "render" ? "true" : void 0
    });
    return ye && !V ? U.createElement(U.Fragment, null, oe, U.createElement(zb, {
        page: W
    })) : oe
});
Zo.displayName = "Link";
var Bb = U.forwardRef(function({"aria-current": a="page", caseSensitive: r=!1, className: o="", end: c=!1, style: f, to: d, viewTransition: m, children: g, ...p}, b) {
    let x = ti(d, {
        relative: p.relative
    })
      , E = dn()
      , S = U.useContext(Us)
      , {navigator: w, basename: T} = U.useContext(At)
      , _ = S != null && Kb(x) && m === !0
      , z = w.encodeLocation ? w.encodeLocation(x).pathname : x.pathname
      , G = E.pathname
      , V = S && S.navigation && S.navigation.location ? S.navigation.location.pathname : null;
    r || (G = G.toLowerCase(),
    V = V ? V.toLowerCase() : null,
    z = z.toLowerCase()),
    V && T && (V = cn(V, T) || V);
    const J = z !== "/" && z.endsWith("/") ? z.length - 1 : z.length;
    let W = G === z || !c && G.startsWith(z) && G.charAt(J) === "/", ue = V != null && (V === z || !c && V.startsWith(z) && V.charAt(z.length) === "/"), P = {
        isActive: W,
        isPending: ue,
        isTransitioning: _
    }, ye = W ? a : void 0, Ne;
    typeof o == "function" ? Ne = o(P) : Ne = [o, W ? "active" : null, ue ? "pending" : null, _ ? "transitioning" : null].filter(Boolean).join(" ");
    let Q = typeof f == "function" ? f(P) : f;
    return U.createElement(Zo, {
        ...p,
        "aria-current": ye,
        className: Ne,
        ref: b,
        style: Q,
        to: d,
        viewTransition: m
    }, typeof g == "function" ? g(P) : g)
});
Bb.displayName = "NavLink";
var Gb = U.forwardRef( ({discover: s="render", fetcherKey: a, navigate: r, reloadDocument: o, replace: c, state: f, method: d=Cs, action: m, onSubmit: g, relative: p, preventScrollReset: b, viewTransition: x, unstable_defaultShouldRevalidate: E, ...S}, w) => {
    let {unstable_useTransitions: T} = U.useContext(At)
      , _ = kb()
      , z = Zb(m, {
        relative: p
    })
      , G = d.toLowerCase() === "get" ? "get" : "post"
      , V = typeof m == "string" && Qg.test(m)
      , J = W => {
        if (g && g(W),
        W.defaultPrevented)
            return;
        W.preventDefault();
        let ue = W.nativeEvent.submitter
          , P = ue?.getAttribute("formmethod") || d
          , ye = () => _(ue || W.currentTarget, {
            fetcherKey: a,
            method: P,
            navigate: r,
            replace: c,
            state: f,
            relative: p,
            preventScrollReset: b,
            viewTransition: x,
            unstable_defaultShouldRevalidate: E
        });
        T && r !== !1 ? U.startTransition( () => ye()) : ye()
    }
    ;
    return U.createElement("form", {
        ref: w,
        method: G,
        action: z,
        onSubmit: o ? g : J,
        ...S,
        "data-discover": !V && s === "render" ? "true" : void 0
    })
}
);
Gb.displayName = "Form";
function Yb(s) {
    return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Xg(s) {
    let a = U.useContext(kl);
    return ke(a, Yb(s)),
    a
}
function Vb(s, {target: a, replace: r, unstable_mask: o, state: c, preventScrollReset: f, relative: d, viewTransition: m, unstable_defaultShouldRevalidate: g, unstable_useTransitions: p}={}) {
    let b = Hg()
      , x = dn()
      , E = ti(s, {
        relative: d
    });
    return U.useCallback(S => {
        if (vb(S, a)) {
            S.preventDefault();
            let w = r !== void 0 ? r : Wa(x) === Wa(E)
              , T = () => b(s, {
                replace: w,
                unstable_mask: o,
                state: c,
                preventScrollReset: f,
                relative: d,
                viewTransition: m,
                unstable_defaultShouldRevalidate: g
            });
            p ? U.startTransition( () => T()) : T()
        }
    }
    , [x, b, E, r, o, c, a, s, f, d, m, g, p])
}
var Qb = 0
  , Xb = () => `__${String(++Qb)}__`;
function kb() {
    let {router: s} = Xg("useSubmit")
      , {basename: a} = U.useContext(At)
      , r = cb()
      , o = s.fetch
      , c = s.navigate;
    return U.useCallback(async (f, d={}) => {
        let {action: m, method: g, encType: p, formData: b, body: x} = Eb(f, a);
        if (d.navigate === !1) {
            let E = d.fetcherKey || Xb();
            await o(E, r, d.action || m, {
                unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
                preventScrollReset: d.preventScrollReset,
                formData: b,
                body: x,
                formMethod: d.method || g,
                formEncType: d.encType || p,
                flushSync: d.flushSync
            })
        } else
            await c(d.action || m, {
                unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
                preventScrollReset: d.preventScrollReset,
                formData: b,
                body: x,
                formMethod: d.method || g,
                formEncType: d.encType || p,
                replace: d.replace,
                state: d.state,
                fromRouteId: r,
                flushSync: d.flushSync,
                viewTransition: d.viewTransition
            })
    }
    , [o, c, a, r])
}
function Zb(s, {relative: a}={}) {
    let {basename: r} = U.useContext(At)
      , o = U.useContext(fn);
    ke(o, "useFormAction must be used inside a RouteContext");
    let[c] = o.matches.slice(-1)
      , f = {
        ...ti(s || ".", {
            relative: a
        })
    }
      , d = dn();
    if (s == null) {
        f.search = d.search;
        let m = new URLSearchParams(f.search)
          , g = m.getAll("index");
        if (g.some(b => b === "")) {
            m.delete("index"),
            g.filter(x => x).forEach(x => m.append("index", x));
            let b = m.toString();
            f.search = b ? `?${b}` : ""
        }
    }
    return (!s || s === ".") && c.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (f.pathname = f.pathname === "/" ? r : Qt([r, f.pathname])),
    Wa(f)
}
function Kb(s, {relative: a}={}) {
    let r = U.useContext(zg);
    ke(r != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {basename: o} = Xg("useViewTransitionState")
      , c = ti(s, {
        relative: a
    });
    if (!r.isTransitioning)
        return !1;
    let f = cn(r.currentLocation.pathname, o) || r.currentLocation.pathname
      , d = cn(r.nextLocation.pathname, o) || r.nextLocation.pathname;
    return zs(c.pathname, d) != null || zs(c.pathname, f) != null
}
function Jb() {
    const s = dn();
    return y.jsxs("div", {
        className: "relative flex flex-col items-center justify-center h-screen text-center px-4",
        children: [y.jsx("h1", {
            className: "absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-50 select-none pointer-events-none z-0",
            children: "404"
        }), y.jsxs("div", {
            className: "relative z-10",
            children: [y.jsx("h1", {
                className: "text-xl md:text-2xl font-semibold mt-6",
                children: "This page has not been generated"
            }), y.jsx("p", {
                className: "mt-2 text-base text-gray-400 font-mono",
                children: s.pathname
            }), y.jsx("p", {
                className: "mt-4 text-lg md:text-xl text-gray-500",
                children: "Tell me more about this page, so I can generate it"
            })]
        })]
    })
}
function $b() {
    const [s,a] = U.useState(!1);
    return U.useEffect( () => {
        const r = () => {
            a(window.scrollY > 50)
        }
        ;
        return window.addEventListener("scroll", r),
        () => window.removeEventListener("scroll", r)
    }
    , []),
    y.jsx("nav", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${s ? "bg-white shadow-lg" : "bg-transparent"}`,
        children: y.jsx("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: y.jsxs("div", {
                className: "flex items-center justify-between h-20",
                children: [y.jsxs(Zo, {
                    to: "/",
                    className: "flex items-center space-x-3",
                    children: [y.jsx("div", {
                        className: "w-10 h-10 flex items-center justify-center",
                        children: y.jsx("i", {
                            className: "ri-building-4-line text-3xl text-gold"
                        })
                    }), y.jsx("span", {
                        className: `font-serif text-2xl font-bold transition-colors ${s ? "text-navy" : "text-white"}`,
                        children: "Legacy"
                    })]
                }), y.jsxs("div", {
                    className: "hidden md:flex items-center space-x-8",
                    children: [y.jsx("a", {
                        href: "#expertise",
                        className: `text-sm font-medium transition-colors hover:text-gold whitespace-nowrap ${s ? "text-gray-700" : "text-white"}`,
                        children: "Our Expertise"
                    }), y.jsx("a", {
                        href: "#showcase",
                        className: `text-sm font-medium transition-colors hover:text-gold whitespace-nowrap ${s ? "text-gray-700" : "text-white"}`,
                        children: "Portfolio"
                    }), y.jsx("a", {
                        href: "#pricing",
                        className: `text-sm font-medium transition-colors hover:text-gold whitespace-nowrap ${s ? "text-gray-700" : "text-white"}`,
                        children: "Pricing"
                    }), y.jsx("a", {
                        href: "#testimonials",
                        className: `text-sm font-medium transition-colors hover:text-gold whitespace-nowrap ${s ? "text-gray-700" : "text-white"}`,
                        children: "Testimonials"
                    }), y.jsx("a", {
                        href: "#start",
                        className: "bg-gold hover:bg-gold-dark text-navy px-6 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer",
                        children: "Start Your Project"
                    })]
                }), y.jsx("button", {
                    className: "md:hidden",
                    children: y.jsx("i", {
                        className: `ri-menu-line text-2xl ${s ? "text-navy" : "text-white"}`
                    })
                })]
            })
        })
    })
}
function Fb() {
    return y.jsx("footer", {
        className: "bg-navy text-white",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8 py-16",
            children: [y.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-12",
                children: [y.jsxs("div", {
                    className: "col-span-1 md:col-span-2",
                    children: [y.jsxs("div", {
                        className: "flex items-center space-x-3 mb-6",
                        children: [y.jsx("div", {
                            className: "w-10 h-10 flex items-center justify-center",
                            children: y.jsx("i", {
                                className: "ri-building-4-line text-3xl text-gold"
                            })
                        }), y.jsx("span", {
                            className: "font-serif text-2xl font-bold",
                            children: "Legacy"
                        })]
                    }), y.jsx("p", {
                        className: "text-gray-400 text-sm leading-relaxed mb-6",
                        children: "Building legacy structures with precision, transparency, and care. Custom residential and commercial construction that stands the test of time."
                    }), y.jsxs("div", {
                        className: "flex space-x-4",
                        children: [y.jsx("a", {
                            href: "#",
                            className: "w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gold rounded-lg transition-colors cursor-pointer",
                            children: y.jsx("i", {
                                className: "ri-facebook-fill text-lg"
                            })
                        }), y.jsx("a", {
                            href: "#",
                            className: "w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gold rounded-lg transition-colors cursor-pointer",
                            children: y.jsx("i", {
                                className: "ri-instagram-line text-lg"
                            })
                        }), y.jsx("a", {
                            href: "#",
                            className: "w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gold rounded-lg transition-colors cursor-pointer",
                            children: y.jsx("i", {
                                className: "ri-linkedin-fill text-lg"
                            })
                        }), y.jsx("a", {
                            href: "#",
                            className: "w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-gold rounded-lg transition-colors cursor-pointer",
                            children: y.jsx("i", {
                                className: "ri-twitter-x-line text-lg"
                            })
                        })]
                    })]
                }), y.jsxs("div", {
                    children: [y.jsx("h4", {
                        className: "font-semibold text-lg mb-4",
                        children: "Services"
                    }), y.jsxs("ul", {
                        className: "space-y-3",
                        children: [y.jsx("li", {
                            children: y.jsx("a", {
                                href: "#",
                                className: "text-gray-400 hover:text-gold text-sm transition-colors cursor-pointer",
                                children: "Residential Construction"
                            })
                        }), y.jsx("li", {
                            children: y.jsx("a", {
                                href: "#",
                                className: "text-gray-400 hover:text-gold text-sm transition-colors cursor-pointer",
                                children: "Commercial Development"
                            })
                        }), y.jsx("li", {
                            children: y.jsx("a", {
                                href: "#",
                                className: "text-gray-400 hover:text-gold text-sm transition-colors cursor-pointer",
                                children: "Luxury Renovations"
                            })
                        }), y.jsx("li", {
                            children: y.jsx("a", {
                                href: "#",
                                className: "text-gray-400 hover:text-gold text-sm transition-colors cursor-pointer",
                                children: "Custom Homes"
                            })
                        })]
                    })]
                }), y.jsxs("div", {
                    children: [y.jsx("h4", {
                        className: "font-semibold text-lg mb-4",
                        children: "Contact"
                    }), y.jsxs("ul", {
                        className: "space-y-3",
                        children: [y.jsxs("li", {
                            className: "text-gray-400 text-sm flex items-start",
                            children: [y.jsx("i", {
                                className: "ri-phone-line text-gold mr-2 mt-0.5"
                            }), y.jsx("span", {
                                children: "(555) 123-4567"
                            })]
                        }), y.jsxs("li", {
                            className: "text-gray-400 text-sm flex items-start",
                            children: [y.jsx("i", {
                                className: "ri-mail-line text-gold mr-2 mt-0.5"
                            }), y.jsx("span", {
                                children: "info@legacyconstruction.com"
                            })]
                        }), y.jsxs("li", {
                            className: "text-gray-400 text-sm flex items-start",
                            children: [y.jsx("i", {
                                className: "ri-map-pin-line text-gold mr-2 mt-0.5"
                            }), y.jsxs("span", {
                                children: ["123 Builder Street", y.jsx("br", {}), "New York, NY 10001"]
                            })]
                        })]
                    })]
                })]
            }), y.jsxs("div", {
                className: "border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center",
                children: [y.jsx("p", {
                    className: "text-gray-400 text-sm",
                    children: "© 2025 Legacy Construction. All rights reserved."
                }), y.jsx("a", {
                    // href: "https://readdy.ai/?ref=logo",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-gray-400 hover:text-gold text-sm transition-colors mt-4 md:mt-0 cursor-pointer",
                    // children: "Powered by Readdy"
                })]
            })]
        })
    })
}
function Wb() {
    return y.jsxs("section", {
        className: "relative min-h-screen flex items-center justify-center overflow-hidden",
        children: [y.jsxs("div", {
            className: "absolute inset-0",
            children: [y.jsx("img", {
                // src: "https://readdy.ai/api/search-image?query=modern%20luxury%20architectural%20construction%20site%20with%20steel%20beams%20and%20glass%20structures%20during%20golden%20hour%20sunset%20with%20dramatic%20lighting%20and%20professional%20photography%20style%20showing%20precision%20engineering%20and%20craftsmanship%20with%20clean%20lines%20and%20sophisticated%20design%20elements&width=1920&height=1080&seq=hero-construction-bg&orientation=landscape",
                alt: "Luxury Construction",
                className: "w-full h-full object-cover object-center"
            }), y.jsx("div", {
                className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"
            })]
        }), y.jsxs("div", {
            className: "relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center w-full py-32",
            children: [y.jsxs("h1", {
                className: "font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight",
                children: ["Building Legacy.", y.jsx("br", {}), "Not Just Structures."]
            }), y.jsx("p", {
                className: "text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed",
                children: "Custom residential and commercial construction crafted with precision, transparency, and care."
            }), y.jsxs("div", {
                className: "flex flex-col sm:flex-row gap-4 justify-center mb-16",
                children: [y.jsx("a", {
                    href: "#start",
                    className: "bg-gold hover:bg-gold-dark text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer",
                    children: "Start Your Project"
                }), y.jsx("a", {
                    href: "#showcase",
                    className: "border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all whitespace-nowrap cursor-pointer",
                    children: "View Portfolio"
                })]
            }), y.jsxs("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto",
                children: [y.jsxs("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20",
                    children: [y.jsx("div", {
                        className: "text-3xl font-bold text-gold mb-2",
                        children: "15+"
                    }), y.jsx("div", {
                        className: "text-sm text-gray-200",
                        children: "Years Experience"
                    })]
                }), y.jsxs("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20",
                    children: [y.jsx("div", {
                        className: "text-3xl font-bold text-gold mb-2",
                        children: "350+"
                    }), y.jsx("div", {
                        className: "text-sm text-gray-200",
                        children: "Projects Completed"
                    })]
                }), y.jsxs("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20",
                    children: [y.jsx("div", {
                        className: "text-3xl font-bold text-gold mb-2",
                        children: "98%"
                    }), y.jsx("div", {
                        className: "text-sm text-gray-200",
                        children: "Client Satisfaction"
                    })]
                }), y.jsxs("div", {
                    className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20",
                    children: [y.jsx("div", {
                        className: "text-3xl font-bold text-gold mb-2",
                        children: "24/7"
                    }), y.jsx("div", {
                        className: "text-sm text-gray-200",
                        children: "Support Available"
                    })]
                })]
            })]
        })]
    })
}
const Pb = [{
    icon: "ri-home-5-line",
    title: "Residential Construction",
    description: "Custom homes built to your exact specifications with attention to every detail and craftsmanship."
}, {
    icon: "ri-building-line",
    title: "Commercial Development",
    description: "Large-scale commercial projects delivered on time and within budget with professional excellence."
}, {
    icon: "ri-paint-brush-line",
    title: "Luxury Renovations",
    description: "Transform existing spaces into stunning modern environments with high-end finishes and design."
}, {
    icon: "ri-pencil-ruler-2-line",
    title: "Design-Build Services",
    description: "Seamless integration of design and construction for streamlined project delivery and coordination."
}, {
    icon: "ri-home-heart-line",
    title: "Custom Homes",
    description: "One-of-a-kind residences that reflect your unique vision, lifestyle, and architectural preferences."
}, {
    icon: "ri-file-list-3-line",
    title: "Project Management",
    description: "Expert oversight ensuring quality control, timeline adherence, and transparent communication throughout."
}];
function Ib() {
    return y.jsx("section", {
        id: "expertise",
        className: "bg-charcoal py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-white mb-4",
                    children: "Our Expertise"
                }), y.jsx("p", {
                    className: "text-gray-400 text-lg max-w-2xl mx-auto",
                    children: "Comprehensive construction services tailored to bring your vision to life with precision and excellence."
                })]
            }), y.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: Pb.map( (s, a) => y.jsxs("div", {
                    className: "bg-navy rounded-xl p-8 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group",
                    children: [y.jsx("div", {
                        className: "w-14 h-14 flex items-center justify-center bg-gold/10 rounded-lg mb-6 group-hover:bg-gold/20 transition-colors",
                        children: y.jsx("i", {
                            className: `${s.icon} text-3xl text-gold`
                        })
                    }), y.jsx("h3", {
                        className: "text-xl font-semibold text-white mb-3",
                        children: s.title
                    }), y.jsx("p", {
                        className: "text-gray-400 text-sm leading-relaxed",
                        children: s.description
                    })]
                }, a))
            })]
        })
    })
}
const e1 = [{
    icon: "ri-3d-cube-line",
    title: "3D Concept Visualizations",
    description: "See your project come to life before construction begins with detailed 3D renderings and walkthroughs."
}, {
    icon: "ri-stack-line",
    title: "Smart Material Selection",
    description: "Optimized material choices based on durability, aesthetics, budget, and environmental impact."
}, {
    icon: "ri-calendar-check-line",
    title: "Predictive Scheduling",
    description: "Advanced timeline planning that anticipates challenges and keeps your project on track."
}, {
    icon: "ri-notification-3-line",
    title: "Real-Time Project Updates",
    description: "Stay informed with instant notifications and live progress tracking throughout construction."
}];
function t1() {
    return y.jsx("section", {
        className: "bg-white py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-navy mb-4",
                    children: "Construction Meets Intelligence"
                }), y.jsx("p", {
                    className: "text-gray-600 text-lg max-w-2xl mx-auto",
                    children: "Smart planning tools, precision estimating, and seamless project coordination."
                })]
            }), y.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                children: e1.map( (s, a) => y.jsxs("div", {
                    className: "bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:border-gold hover:shadow-xl transition-all duration-300 cursor-pointer group",
                    children: [y.jsx("div", {
                        className: "w-14 h-14 flex items-center justify-center bg-gold/10 rounded-lg mb-6 group-hover:bg-gold/20 transition-colors",
                        children: y.jsx("i", {
                            className: `${s.icon} text-3xl text-gold`
                        })
                    }), y.jsx("h3", {
                        className: "text-lg font-semibold text-navy mb-3",
                        children: s.title
                    }), y.jsx("p", {
                        className: "text-gray-600 text-sm leading-relaxed",
                        children: s.description
                    })]
                }, a))
            })]
        })
    })
}

function l1() {
    const [s,a] = U.useState(null);
    return y.jsx("section", {
        id: "showcase",
        className: "bg-gray-50 py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-navy mb-4",
                    children: "Project Showcase"
                }), y.jsx("p", {
                    className: "text-gray-600 text-lg max-w-2xl mx-auto",
                    children: "Explore our portfolio of exceptional projects that showcase our commitment to quality and innovation."
                })]
            }), y.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: n1.map( (r, o) => y.jsxs("div", {
                    className: "relative rounded-xl overflow-hidden cursor-pointer group h-80",
                    onMouseEnter: () => a(o),
                    onMouseLeave: () => a(null),
                    children: [y.jsx("div", {
                        className: "w-full h-full",
                        children: y.jsx("img", {
                            src: r.image,
                            alt: r.name,
                            className: "w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        })
                    }), y.jsx("div", {
                        className: `absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent transition-opacity duration-300 ${s === o ? "opacity-100" : "opacity-0"}`,
                        children: y.jsxs("div", {
                            className: "absolute bottom-0 left-0 right-0 p-6",
                            children: [y.jsx("div", {
                                className: "text-gold text-sm font-semibold mb-2",
                                children: r.category
                            }), y.jsx("h3", {
                                className: "text-white text-xl font-semibold",
                                children: r.name
                            })]
                        })
                    })]
                }, o))
            })]
        })
    })
}
function a1() {
    const [s,a] = U.useState("residential")
      , [r,o] = U.useState("2500")
      , [c,f] = U.useState("6-12")
      , [d,m] = U.useState("premium")
      , [g,p] = U.useState(5e5)
      , b = () => {
        let x = 150;
        s === "commercial" && (x = 200),
        s === "renovation" && (x = 180),
        d === "standard" && (x *= .8),
        d === "luxury" && (x *= 1.4);
        const E = parseInt(r) || 2500;
        return (x * E).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
    }
    ;
    return y.jsx("section", {
        id: "pricing",
        className: "bg-white py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-navy mb-4",
                    children: "Transparent Pricing & Instant Estimates"
                }), y.jsx("p", {
                    className: "text-gray-600 text-lg max-w-2xl mx-auto",
                    children: "Get a clear understanding of your investment with our transparent pricing model."
                })]
            }), y.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start",
                children: [y.jsxs("div", {
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-navy mb-6",
                        children: "Our Transparent Approach"
                    }), y.jsxs("div", {
                        className: "space-y-4 text-gray-600 leading-relaxed",
                        children: [y.jsx("p", {
                            children: "At Legacy Construction, we believe in complete transparency. No hidden fees, no surprise costs, no unclear estimates. Every project begins with a detailed breakdown of materials, labor, and timeline."
                        }), y.jsx("p", {
                            children: "Our pricing model is built on years of experience and industry expertise, ensuring you receive fair, competitive rates without compromising on quality or craftsmanship."
                        }), y.jsx("p", {
                            children: "We provide itemized proposals that clearly outline every aspect of your project, giving you full visibility into where your investment goes and why."
                        })]
                    }), y.jsxs("div", {
                        className: "mt-8 space-y-4",
                        children: [y.jsxs("div", {
                            className: "flex items-start",
                            children: [y.jsx("div", {
                                className: "w-6 h-6 flex items-center justify-center",
                                children: y.jsx("i", {
                                    className: "ri-check-line text-xl text-gold"
                                })
                            }), y.jsxs("div", {
                                className: "ml-3",
                                children: [y.jsx("strong", {
                                    className: "text-navy",
                                    children: "No Hidden Fees"
                                }), y.jsx("p", {
                                    className: "text-gray-600 text-sm",
                                    children: "All costs clearly outlined upfront"
                                })]
                            })]
                        }), y.jsxs("div", {
                            className: "flex items-start",
                            children: [y.jsx("div", {
                                className: "w-6 h-6 flex items-center justify-center",
                                children: y.jsx("i", {
                                    className: "ri-check-line text-xl text-gold"
                                })
                            }), y.jsxs("div", {
                                className: "ml-3",
                                children: [y.jsx("strong", {
                                    className: "text-navy",
                                    children: "Detailed Breakdowns"
                                }), y.jsx("p", {
                                    className: "text-gray-600 text-sm",
                                    children: "Itemized proposals for full transparency"
                                })]
                            })]
                        }), y.jsxs("div", {
                            className: "flex items-start",
                            children: [y.jsx("div", {
                                className: "w-6 h-6 flex items-center justify-center",
                                children: y.jsx("i", {
                                    className: "ri-check-line text-xl text-gold"
                                })
                            }), y.jsxs("div", {
                                className: "ml-3",
                                children: [y.jsx("strong", {
                                    className: "text-navy",
                                    children: "Flexible Payment Plans"
                                }), y.jsx("p", {
                                    className: "text-gray-600 text-sm",
                                    children: "Options to fit your financial needs"
                                })]
                            })]
                        })]
                    })]
                }), y.jsxs("div", {
                    className: "bg-gradient-to-br from-navy to-charcoal rounded-2xl p-8 shadow-2xl",
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-white mb-6",
                        children: "Estimate Calculator"
                    }), y.jsxs("div", {
                        className: "space-y-6",
                        children: [y.jsxs("div", {
                            children: [y.jsx("label", {
                                className: "block text-sm font-medium text-gray-300 mb-2",
                                children: "Project Type"
                            }), y.jsxs("select", {
                                value: s,
                                onChange: x => a(x.target.value),
                                className: "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold transition-colors cursor-pointer",
                                children: [y.jsx("option", {
                                    value: "residential",
                                    children: "Residential Construction"
                                }), y.jsx("option", {
                                    value: "commercial",
                                    children: "Commercial Development"
                                }), y.jsx("option", {
                                    value: "renovation",
                                    children: "Luxury Renovation"
                                }), y.jsx("option", {
                                    value: "custom",
                                    children: "Custom Home"
                                })]
                            })]
                        }), y.jsxs("div", {
                            children: [y.jsx("label", {
                                className: "block text-sm font-medium text-gray-300 mb-2",
                                children: "Square Footage"
                            }), y.jsx("input", {
                                type: "number",
                                value: r,
                                onChange: x => o(x.target.value),
                                className: "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold transition-colors",
                                placeholder: "2500"
                            })]
                        }), y.jsxs("div", {
                            children: [y.jsx("label", {
                                className: "block text-sm font-medium text-gray-300 mb-2",
                                children: "Timeline"
                            }), y.jsxs("select", {
                                value: c,
                                onChange: x => f(x.target.value),
                                className: "w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold transition-colors cursor-pointer",
                                children: [y.jsx("option", {
                                    value: "3-6",
                                    children: "3-6 Months"
                                }), y.jsx("option", {
                                    value: "6-12",
                                    children: "6-12 Months"
                                }), y.jsx("option", {
                                    value: "12-18",
                                    children: "12-18 Months"
                                }), y.jsx("option", {
                                    value: "18+",
                                    children: "18+ Months"
                                })]
                            })]
                        }), y.jsxs("div", {
                            children: [y.jsx("label", {
                                className: "block text-sm font-medium text-gray-300 mb-2",
                                children: "Material Level"
                            }), y.jsx("div", {
                                className: "grid grid-cols-3 gap-3",
                                children: ["standard", "premium", "luxury"].map(x => y.jsx("button", {
                                    onClick: () => m(x),
                                    className: `px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${d === x ? "bg-gold text-navy" : "bg-white/10 text-white hover:bg-white/20"}`,
                                    children: x.charAt(0).toUpperCase() + x.slice(1)
                                }, x))
                            })]
                        }), y.jsxs("div", {
                            className: "pt-6 border-t border-white/20",
                            children: [y.jsx("div", {
                                className: "text-sm text-gray-300 mb-2",
                                children: "Estimated Investment"
                            }), y.jsx("div", {
                                className: "text-4xl font-bold text-gold mb-6",
                                children: b()
                            }), y.jsx("a", {
                                href: "#start",
                                className: "block w-full bg-gold hover:bg-gold-dark text-navy px-6 py-4 rounded-lg text-base font-semibold transition-all text-center whitespace-nowrap cursor-pointer",
                                children: "Get Detailed Proposal"
                            })]
                        })]
                    })]
                })]
            })]
        })
    })
}
function i1() {
    return y.jsx("section", {
        className: "bg-gray-50 py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-navy mb-4",
                    children: "Your Project. Always Within Reach."
                }), y.jsx("p", {
                    className: "text-gray-600 text-lg max-w-2xl mx-auto",
                    children: "Access real-time updates, track progress, and manage every detail of your construction project from anywhere."
                })]
            }), y.jsxs("div", {
                className: "bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200",
                children: [y.jsxs("div", {
                    className: "bg-gradient-to-r from-navy to-charcoal px-6 py-4 flex items-center justify-between",
                    children: [y.jsxs("div", {
                        className: "flex items-center space-x-4",
                        children: [y.jsx("div", {
                            className: "w-3 h-3 rounded-full bg-red-500"
                        }), y.jsx("div", {
                            className: "w-3 h-3 rounded-full bg-yellow-500"
                        }), y.jsx("div", {
                            className: "w-3 h-3 rounded-full bg-green-500"
                        })]
                    }), y.jsx("div", {
                        className: "text-white text-sm font-medium",
                        children: "Client Portal"
                    }), y.jsx("div", {
                        className: "w-20"
                    })]
                }), y.jsxs("div", {
                    className: "p-8",
                    children: [y.jsxs("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8",
                        children: [y.jsxs("div", {
                            className: "bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-6 border border-gold/20",
                            children: [y.jsxs("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [y.jsx("div", {
                                    className: "text-sm font-medium text-gray-600",
                                    children: "Project Progress"
                                }), y.jsx("div", {
                                    className: "w-8 h-8 flex items-center justify-center",
                                    children: y.jsx("i", {
                                        className: "ri-line-chart-line text-xl text-gold"
                                    })
                                })]
                            }), y.jsx("div", {
                                className: "text-3xl font-bold text-navy mb-2",
                                children: "68%"
                            }), y.jsx("div", {
                                className: "w-full bg-gray-200 rounded-full h-2",
                                children: y.jsx("div", {
                                    className: "bg-gold rounded-full h-2",
                                    style: {
                                        width: "68%"
                                    }
                                })
                            })]
                        }), y.jsxs("div", {
                            className: "bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200",
                            children: [y.jsxs("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [y.jsx("div", {
                                    className: "text-sm font-medium text-gray-600",
                                    children: "Budget Tracking"
                                }), y.jsx("div", {
                                    className: "w-8 h-8 flex items-center justify-center",
                                    children: y.jsx("i", {
                                        className: "ri-money-dollar-circle-line text-xl text-blue-600"
                                    })
                                })]
                            }), y.jsx("div", {
                                className: "text-3xl font-bold text-navy mb-2",
                                children: "$425K"
                            }), y.jsx("div", {
                                className: "text-sm text-gray-600",
                                children: "of $500K allocated"
                            })]
                        }), y.jsxs("div", {
                            className: "bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200",
                            children: [y.jsxs("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [y.jsx("div", {
                                    className: "text-sm font-medium text-gray-600",
                                    children: "Timeline Status"
                                }), y.jsx("div", {
                                    className: "w-8 h-8 flex items-center justify-center",
                                    children: y.jsx("i", {
                                        className: "ri-calendar-check-line text-xl text-green-600"
                                    })
                                })]
                            }), y.jsx("div", {
                                className: "text-3xl font-bold text-navy mb-2",
                                children: "On Track"
                            }), y.jsx("div", {
                                className: "text-sm text-gray-600",
                                children: "Est. completion: Mar 2025"
                            })]
                        })]
                    }), y.jsxs("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                        children: [y.jsxs("div", {
                            className: "bg-gray-50 rounded-xl p-6",
                            children: [y.jsxs("h4", {
                                className: "font-semibold text-navy mb-4 flex items-center",
                                children: [y.jsx("div", {
                                    className: "w-6 h-6 flex items-center justify-center mr-2",
                                    children: y.jsx("i", {
                                        className: "ri-checkbox-circle-line text-xl text-gold"
                                    })
                                }), "Recent Milestones"]
                            }), y.jsxs("div", {
                                className: "space-y-3",
                                children: [y.jsxs("div", {
                                    className: "flex items-center justify-between py-2 border-b border-gray-200",
                                    children: [y.jsx("span", {
                                        className: "text-sm text-gray-700",
                                        children: "Foundation Complete"
                                    }), y.jsx("span", {
                                        className: "text-xs text-green-600 font-medium",
                                        children: "✓ Done"
                                    })]
                                }), y.jsxs("div", {
                                    className: "flex items-center justify-between py-2 border-b border-gray-200",
                                    children: [y.jsx("span", {
                                        className: "text-sm text-gray-700",
                                        children: "Framing Inspection"
                                    }), y.jsx("span", {
                                        className: "text-xs text-green-600 font-medium",
                                        children: "✓ Done"
                                    })]
                                }), y.jsxs("div", {
                                    className: "flex items-center justify-between py-2 border-b border-gray-200",
                                    children: [y.jsx("span", {
                                        className: "text-sm text-gray-700",
                                        children: "Electrical Rough-In"
                                    }), y.jsx("span", {
                                        className: "text-xs text-blue-600 font-medium",
                                        children: "In Progress"
                                    })]
                                }), y.jsxs("div", {
                                    className: "flex items-center justify-between py-2",
                                    children: [y.jsx("span", {
                                        className: "text-sm text-gray-700",
                                        children: "Plumbing Installation"
                                    }), y.jsx("span", {
                                        className: "text-xs text-gray-400 font-medium",
                                        children: "Upcoming"
                                    })]
                                })]
                            })]
                        }), y.jsxs("div", {
                            className: "bg-gray-50 rounded-xl p-6",
                            children: [y.jsxs("h4", {
                                className: "font-semibold text-navy mb-4 flex items-center",
                                children: [y.jsx("div", {
                                    className: "w-6 h-6 flex items-center justify-center mr-2",
                                    children: y.jsx("i", {
                                        className: "ri-file-text-line text-xl text-gold"
                                    })
                                }), "Quick Actions"]
                            }), y.jsxs("div", {
                                className: "space-y-3",
                                children: [y.jsxs("button", {
                                    className: "w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
                                    children: [y.jsx("span", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: "View 3D Renderings"
                                    }), y.jsx("i", {
                                        className: "ri-arrow-right-line text-gray-400"
                                    })]
                                }), y.jsxs("button", {
                                    className: "w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
                                    children: [y.jsx("span", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: "Download Documents"
                                    }), y.jsx("i", {
                                        className: "ri-arrow-right-line text-gray-400"
                                    })]
                                }), y.jsxs("button", {
                                    className: "w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
                                    children: [y.jsx("span", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: "Message Project Manager"
                                    }), y.jsx("i", {
                                        className: "ri-arrow-right-line text-gray-400"
                                    })]
                                }), y.jsxs("button", {
                                    className: "w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",
                                    children: [y.jsx("span", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: "Schedule Site Visit"
                                    }), y.jsx("i", {
                                        className: "ri-arrow-right-line text-gray-400"
                                    })]
                                })]
                            })]
                        })]
                    })]
                })]
            }), y.jsx("div", {
                className: "text-center mt-12",
                children: y.jsx("a", {
                    href: "#start",
                    className: "inline-block bg-gold hover:bg-gold-dark text-navy px-8 py-4 rounded-lg text-base font-semibold transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer",
                    children: "Access Client Portal"
                })
            })]
        })
    })
}

function s1() {
    const [s,a] = U.useState(0)
      , r = () => {
        a(c => (c + 1) % Gt.length)
    }
      , o = () => {
        a(c => (c - 1 + Gt.length) % Gt.length)
    }
    ;
    return y.jsx("section", {
        id: "testimonials",
        className: "bg-charcoal py-24",
        children: y.jsxs("div", {
            className: "max-w-7xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-white mb-4",
                    children: "Client Testimonials"
                }), y.jsx("p", {
                    className: "text-gray-400 text-lg max-w-2xl mx-auto",
                    children: "Hear from clients who have experienced the Legacy Construction difference."
                })]
            }), y.jsxs("div", {
                className: "relative max-w-4xl mx-auto",
                children: [y.jsxs("div", {
                    className: "bg-navy rounded-2xl p-12 border border-white/10",
                    children: [y.jsx("div", {
                        className: "flex items-center justify-center mb-6",
                        children: [...Array(Gt[s].rating)].map( (c, f) => y.jsx("i", {
                            className: "ri-star-fill text-2xl text-gold mx-1"
                        }, f))
                    }), y.jsxs("blockquote", {
                        className: "text-xl md:text-2xl text-gray-300 text-center mb-8 leading-relaxed font-serif italic",
                        children: ['"', Gt[s].text, '"']
                    }), y.jsxs("div", {
                        className: "flex items-center justify-center",
                        children: [y.jsx("div", {
                            className: "w-16 h-16 rounded-full overflow-hidden mr-4",
                            children: y.jsx("img", {
                                src: Gt[s].image,
                                alt: Gt[s].name,
                                className: "w-full h-full object-cover object-center"
                            })
                        }), y.jsxs("div", {
                            children: [y.jsx("div", {
                                className: "text-white font-semibold text-lg",
                                children: Gt[s].name
                            }), y.jsx("div", {
                                className: "text-gray-400 text-sm",
                                children: Gt[s].role
                            })]
                        })]
                    })]
                }), y.jsx("button", {
                    onClick: o,
                    className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 flex items-center justify-center bg-gold hover:bg-gold-dark rounded-full transition-colors cursor-pointer",
                    children: y.jsx("i", {
                        className: "ri-arrow-left-line text-xl text-navy"
                    })
                }), y.jsx("button", {
                    onClick: r,
                    className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 flex items-center justify-center bg-gold hover:bg-gold-dark rounded-full transition-colors cursor-pointer",
                    children: y.jsx("i", {
                        className: "ri-arrow-right-line text-xl text-navy"
                    })
                }), y.jsx("div", {
                    className: "flex justify-center mt-8 space-x-2",
                    children: Gt.map( (c, f) => y.jsx("button", {
                        onClick: () => a(f),
                        className: `w-2 h-2 rounded-full transition-all cursor-pointer ${f === s ? "bg-gold w-8" : "bg-white/30"}`
                    }, f))
                })]
            })]
        })
    })
}
function r1() {
    const [s,a] = U.useState(1)
      , [r,o] = U.useState({
        fullName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        projectType: "residential",
        squareFeet: "",
        timeline: "6-12",
        budgetRange: "250000-500000",
        description: "",
        materialPreferences: "",
        styleSelection: "modern",
        specialRequirements: ""
    })
      , c = g => {
        const {name: p, value: b} = g.target;
        o(x => ({
            ...x,
            [p]: b
        }))
    }
      , f = () => {
        s < 4 && a(s + 1)
    }
      , d = () => {
        s > 1 && a(s - 1)
    }
      , m = async g => {
        g.preventDefault();
        const p = g.target
          , b = new FormData(p);
        try {
            // (await fetch("https://readdy.ai/api/form/d6gbbqhghdq4qda705f0", {
                method: "POST",
                body: new URLSearchParams(b),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })).ok ? (alert("Thank you! Your project intake has been submitted successfully. Our team will contact you within 24 hours."),
            o({
                fullName: "",
                email: "",
                phone: "",
                propertyAddress: "",
                projectType: "residential",
                squareFeet: "",
                timeline: "6-12",
                budgetRange: "250000-500000",
                description: "",
                materialPreferences: "",
                styleSelection: "modern",
                specialRequirements: ""
            }),
            a(1)) : alert("There was an error submitting your form. Please try again.")
        } catch {
            alert("There was an error submitting your form. Please try again.")
        }
    }
    ;
    return y.jsx("section", {
        id: "start",
        className: "bg-white py-24",
        children: y.jsxs("div", {
            className: "max-w-4xl mx-auto px-6 lg:px-8",
            children: [y.jsxs("div", {
                className: "text-center mb-16",
                children: [y.jsx("h2", {
                    className: "font-serif text-4xl md:text-5xl font-bold text-navy mb-4",
                    children: "Start Your Journey"
                }), y.jsx("p", {
                    className: "text-gray-600 text-lg max-w-2xl mx-auto",
                    children: "Tell us about your vision and we'll guide you through the next steps."
                })]
            }), y.jsxs("div", {
                className: "mb-12",
                children: [y.jsx("div", {
                    className: "flex items-center justify-between",
                    children: [1, 2, 3, 4].map(g => y.jsxs("div", {
                        className: "flex items-center flex-1",
                        children: [y.jsx("div", {
                            className: `w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${s >= g ? "bg-gold text-navy" : "bg-gray-200 text-gray-500"}`,
                            children: g
                        }), g < 4 && y.jsx("div", {
                            className: `flex-1 h-1 mx-2 transition-all ${s > g ? "bg-gold" : "bg-gray-200"}`
                        })]
                    }, g))
                }), y.jsxs("div", {
                    className: "flex justify-between mt-3",
                    children: [y.jsx("span", {
                        className: "text-xs text-gray-600",
                        children: "Personal Info"
                    }), y.jsx("span", {
                        className: "text-xs text-gray-600",
                        children: "Project Details"
                    }), y.jsx("span", {
                        className: "text-xs text-gray-600",
                        children: "Specifications"
                    }), y.jsx("span", {
                        className: "text-xs text-gray-600",
                        children: "Review"
                    })]
                })]
            }), y.jsxs("form", {
                id: "project-intake-form",
                "data-readdy-form": !0,
                onSubmit: m,
                className: "bg-gray-50 rounded-2xl p-8 border border-gray-200",
                children: [s === 1 && y.jsxs("div", {
                    className: "space-y-6",
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-navy mb-6",
                        children: "Personal Information"
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Full Name *"
                        }), y.jsx("input", {
                            type: "text",
                            name: "fullName",
                            value: r.fullName,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "John Smith"
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Email Address *"
                        }), y.jsx("input", {
                            type: "email",
                            name: "email",
                            value: r.email,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "john@example.com"
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Phone Number *"
                        }), y.jsx("input", {
                            type: "tel",
                            name: "phone",
                            value: r.phone,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "(555) 123-4567"
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Property Address *"
                        }), y.jsx("input", {
                            type: "text",
                            name: "propertyAddress",
                            value: r.propertyAddress,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "123 Main Street, City, State, ZIP"
                        })]
                    })]
                }), s === 2 && y.jsxs("div", {
                    className: "space-y-6",
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-navy mb-6",
                        children: "Project Details"
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Project Type *"
                        }), y.jsxs("select", {
                            name: "projectType",
                            value: r.projectType,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors cursor-pointer",
                            children: [y.jsx("option", {
                                value: "residential",
                                children: "Residential Construction"
                            }), y.jsx("option", {
                                value: "commercial",
                                children: "Commercial Development"
                            }), y.jsx("option", {
                                value: "renovation",
                                children: "Luxury Renovation"
                            }), y.jsx("option", {
                                value: "custom",
                                children: "Custom Home"
                            }), y.jsx("option", {
                                value: "design-build",
                                children: "Design-Build Services"
                            })]
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Square Footage *"
                        }), y.jsx("input", {
                            type: "number",
                            name: "squareFeet",
                            value: r.squareFeet,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "2500"
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Timeline *"
                        }), y.jsxs("select", {
                            name: "timeline",
                            value: r.timeline,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors cursor-pointer",
                            children: [y.jsx("option", {
                                value: "3-6",
                                children: "3-6 Months"
                            }), y.jsx("option", {
                                value: "6-12",
                                children: "6-12 Months"
                            }), y.jsx("option", {
                                value: "12-18",
                                children: "12-18 Months"
                            }), y.jsx("option", {
                                value: "18+",
                                children: "18+ Months"
                            })]
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Budget Range *"
                        }), y.jsxs("select", {
                            name: "budgetRange",
                            value: r.budgetRange,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors cursor-pointer",
                            children: [y.jsx("option", {
                                value: "100000-250000",
                                children: "$100,000 - $250,000"
                            }), y.jsx("option", {
                                value: "250000-500000",
                                children: "$250,000 - $500,000"
                            }), y.jsx("option", {
                                value: "500000-1000000",
                                children: "$500,000 - $1,000,000"
                            }), y.jsx("option", {
                                value: "1000000+",
                                children: "$1,000,000+"
                            })]
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Project Description"
                        }), y.jsx("textarea", {
                            name: "description",
                            value: r.description,
                            onChange: c,
                            maxLength: 500,
                            rows: 4,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors resize-none",
                            placeholder: "Tell us about your vision..."
                        }), y.jsxs("div", {
                            className: "text-xs text-gray-500 mt-1 text-right",
                            children: [r.description.length, "/500 characters"]
                        })]
                    })]
                }), s === 3 && y.jsxs("div", {
                    className: "space-y-6",
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-navy mb-6",
                        children: "Specifications"
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Material Preferences"
                        }), y.jsx("input", {
                            type: "text",
                            name: "materialPreferences",
                            value: r.materialPreferences,
                            onChange: c,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors",
                            placeholder: "e.g., Hardwood floors, granite countertops, etc."
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Style Selection *"
                        }), y.jsxs("select", {
                            name: "styleSelection",
                            value: r.styleSelection,
                            onChange: c,
                            required: !0,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors cursor-pointer",
                            children: [y.jsx("option", {
                                value: "modern",
                                children: "Modern"
                            }), y.jsx("option", {
                                value: "contemporary",
                                children: "Contemporary"
                            }), y.jsx("option", {
                                value: "traditional",
                                children: "Traditional"
                            }), y.jsx("option", {
                                value: "farmhouse",
                                children: "Farmhouse"
                            }), y.jsx("option", {
                                value: "industrial",
                                children: "Industrial"
                            }), y.jsx("option", {
                                value: "mediterranean",
                                children: "Mediterranean"
                            })]
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Special Requirements"
                        }), y.jsx("textarea", {
                            name: "specialRequirements",
                            value: r.specialRequirements,
                            onChange: c,
                            maxLength: 500,
                            rows: 4,
                            className: "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors resize-none",
                            placeholder: "Any special requirements or considerations..."
                        }), y.jsxs("div", {
                            className: "text-xs text-gray-500 mt-1 text-right",
                            children: [r.specialRequirements.length, "/500 characters"]
                        })]
                    }), y.jsxs("div", {
                        children: [y.jsx("label", {
                            className: "block text-sm font-medium text-gray-700 mb-2",
                            children: "Property Photos / Site Images"
                        }), y.jsxs("div", {
                            className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gold transition-colors cursor-pointer",
                            children: [y.jsx("i", {
                                className: "ri-upload-cloud-line text-4xl text-gray-400 mb-2"
                            }), y.jsx("p", {
                                className: "text-sm text-gray-600 mb-1",
                                children: "Drag and drop files here or click to browse"
                            }), y.jsx("p", {
                                className: "text-xs text-gray-500",
                                children: "Uncollectable - For reference only"
                            })]
                        })]
                    })]
                }), s === 4 && y.jsxs("div", {
                    className: "space-y-6",
                    children: [y.jsx("h3", {
                        className: "text-2xl font-semibold text-navy mb-6",
                        children: "Review & Submit"
                    }), y.jsxs("div", {
                        className: "bg-white rounded-lg p-6 space-y-4",
                        children: [y.jsxs("div", {
                            className: "border-b border-gray-200 pb-4",
                            children: [y.jsx("h4", {
                                className: "font-semibold text-navy mb-3",
                                children: "Personal Information"
                            }), y.jsxs("div", {
                                className: "grid grid-cols-2 gap-4 text-sm",
                                children: [y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Name:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.fullName
                                    })]
                                }), y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Email:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.email
                                    })]
                                }), y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Phone:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.phone
                                    })]
                                }), y.jsxs("div", {
                                    className: "col-span-2",
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Address:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.propertyAddress
                                    })]
                                })]
                            })]
                        }), y.jsxs("div", {
                            className: "border-b border-gray-200 pb-4",
                            children: [y.jsx("h4", {
                                className: "font-semibold text-navy mb-3",
                                children: "Project Details"
                            }), y.jsxs("div", {
                                className: "grid grid-cols-2 gap-4 text-sm",
                                children: [y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Type:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium capitalize",
                                        children: r.projectType
                                    })]
                                }), y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Square Feet:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.squareFeet
                                    })]
                                }), y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Timeline:"
                                    }), y.jsxs("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: [r.timeline, " months"]
                                    })]
                                }), y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Budget:"
                                    }), y.jsxs("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: ["$", r.budgetRange]
                                    })]
                                })]
                            })]
                        }), y.jsxs("div", {
                            children: [y.jsx("h4", {
                                className: "font-semibold text-navy mb-3",
                                children: "Specifications"
                            }), y.jsxs("div", {
                                className: "text-sm space-y-2",
                                children: [y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Style:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium capitalize",
                                        children: r.styleSelection
                                    })]
                                }), r.materialPreferences && y.jsxs("div", {
                                    children: [y.jsx("span", {
                                        className: "text-gray-600",
                                        children: "Materials:"
                                    }), y.jsx("span", {
                                        className: "ml-2 text-navy font-medium",
                                        children: r.materialPreferences
                                    })]
                                })]
                            })]
                        })]
                    }), y.jsxs("div", {
                        className: "flex items-start bg-blue-50 rounded-lg p-4",
                        children: [y.jsx("i", {
                            className: "ri-information-line text-xl text-blue-600 mr-3 mt-0.5"
                        }), y.jsx("p", {
                            className: "text-sm text-gray-700",
                            children: "By submitting this form, you agree to be contacted by Legacy Construction regarding your project. We'll review your information and reach out within 24 hours."
                        })]
                    })]
                }), y.jsxs("div", {
                    className: "flex justify-between mt-8",
                    children: [s > 1 && y.jsx("button", {
                        type: "button",
                        onClick: d,
                        className: "px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gold hover:text-gold transition-all whitespace-nowrap cursor-pointer",
                        children: "Previous Step"
                    }), s < 4 ? y.jsx("button", {
                        type: "button",
                        onClick: f,
                        className: "ml-auto bg-gold hover:bg-gold-dark text-navy px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer",
                        children: "Next Step"
                    }) : y.jsx("button", {
                        type: "submit",
                        className: "ml-auto bg-gold hover:bg-gold-dark text-navy px-8 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer",
                        children: "Submit Project"
                    })]
                })]
            }), y.jsxs("div", {
                className: "mt-12 text-center",
                children: [y.jsx("p", {
                    className: "text-gray-600 mb-4",
                    children: "Or get started quickly:"
                }), y.jsxs("form", {
                    className: "flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto",
                    children: [y.jsx("input", {
                        type: "text",
                        placeholder: "Your Name",
                        className: "flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors"
                    }), y.jsx("input", {
                        type: "email",
                        placeholder: "Email Address",
                        className: "flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors"
                    }), y.jsxs("select", {
                        className: "flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gold transition-colors cursor-pointer",
                        children: [y.jsx("option", {
                            children: "Residential"
                        }), y.jsx("option", {
                            children: "Commercial"
                        }), y.jsx("option", {
                            children: "Renovation"
                        })]
                    }), y.jsx("button", {
                        type: "button",
                        className: "bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer",
                        children: "Begin Your Project"
                    })]
                })]
            })]
        })
    })
}
function u1() {
    return y.jsxs("div", {
        className: "min-h-screen bg-white",
        children: [y.jsx($b, {}), y.jsx(Wb, {}), y.jsx(Ib, {}), y.jsx(t1, {}), y.jsx(l1, {}), y.jsx(a1, {}), y.jsx(i1, {}), y.jsx(s1, {}), y.jsx(r1, {}), y.jsx(Fb, {})]
    })
}
const kg = [{
    path: "/",
    element: y.jsx(u1, {})
}, {
    path: "*",
    element: y.jsx(Jb, {})
}]
  , o1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: kg
}, Symbol.toStringTag, {
    value: "Module"
}));
let Zg;
const c1 = new Promise(s => {
    Zg = s
}
);
function Kg() {
    const s = tb(kg)
      , a = Hg();
    return U.useEffect( () => {
        window.REACT_APP_NAVIGATE = a,
        Zg(window.REACT_APP_NAVIGATE)
    }
    ),
    s
}
const f1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    AppRoutes: Kg,
    navigatePromise: c1
}, Symbol.toStringTag, {
    value: "Module"
}));
function d1() {
    return y.jsx(Fx, {
        i18n: et,
        children: y.jsx(qb, {
            basename: "/preview/058c727d-e524-43f3-aa39-75dae29dc1a6/6746491",
            children: y.jsx(Kg, {})
        })
    })
}
xv.createRoot(document.getElementById("root")).render(y.jsx(U.StrictMode, {
    children: y.jsx(d1, {})
}));
//# sourceMappingURL=index-Cln-xkKi.js.map

