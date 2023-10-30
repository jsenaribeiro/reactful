"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const express_1 = __importStar(require("express"));
const path_1 = require("path");
const settings_1 = require("./settings");
const promises_1 = __importDefault(require("fs/promises"));
console.debug = args => { };
const PRIMITIVES = ["string", "boolean", "number"];
const isReact = jsx => isReactSymbol(jsx === null || jsx === void 0 ? void 0 : jsx.$$typeof);
const isReactSymbol = value => value === Symbol.for("react.element");
const encode = (_, value) => isReactSymbol(value) ? "$" : value;
const log = (...args) => { console.log("!!! ", ...args); return true; };
const error = (...args) => { console.error(...args); return undefined; };
const express = (0, express_1.default)();
express.use((0, express_1.static)("./builds"));
express.get("/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modulePath = `./pages/${req.params.page}.js`;
    const resolved = yield Promise.resolve(`${modulePath}`).then(s => __importStar(require(s))).then(x => x.default);
    const Component = (resolved === null || resolved === void 0 ? void 0 : resolved.default) || resolved;
    const tree = yield treefy(react_1.default.createElement(Component, Object.assign({}, req.query)));
    const json = JSON.stringify(tree, encode);
    if (req.query.jsx === "")
        return res.end(json);
    const rendered = `${(0, server_1.renderToString)(tree)}
      <script>const exports = {}</script>
      <script>window.__initialMarkup=\`${json}\`</script>
      <script src="/client.js" type="module"></script>`;
    const path = (0, path_1.join)(process.cwd(), 'index.html');
    const html = yield promises_1.default.readFile(path, 'utf-8');
    return res.end(html.replace('<!-- content -->', rendered));
}));
function treefy(jsx) {
    try {
        return nodeOf(jsx);
    }
    catch (e) {
        console.error('TREEFY', e);
        return undefined;
    }
    '';
}
const typeOf = jsx => !jsx ? "unvailable"
    : PRIMITIVES.includes(typeof jsx) ? "primitive"
        : Array.isArray(jsx) && !!(jsx === null || jsx === void 0 ? void 0 : jsx.length) ? "children"
            : isReact(jsx) && typeof jsx.type === "string" ? "element"
                : isReact(jsx) && typeof jsx.type === "function" ? "component"
                    : isReact(jsx) && jsx.type === Symbol.for('react.fragment') ? "fragment"
                        : typeof jsx === "object" && !isReact(jsx) ? "object"
                            : isReact(jsx) ? "attachment"
                                : "unvailable";
const nodeOf = (jsx) => __awaiter(void 0, void 0, void 0, function* () {
    return typeOf(jsx) == "unvailable" ? {}
        : typeOf(jsx) == "primitive" ? jsx
            : typeOf(jsx) == "element" ? yield element(jsx)
                : typeOf(jsx) == "fragment" ? yield element(jsx)
                    : typeOf(jsx) == "children" ? yield children(jsx)
                        : typeOf(jsx) == "component" ? yield component(jsx)
                            : typeOf(jsx) == "attachment" ? yield subComponent(jsx)
                                : typeOf(jsx) == "object" ? stringify(jsx)
                                    : error("nodeOf", typeOf(jsx), jsx === null || jsx === void 0 ? void 0 : jsx.type, jsx);
});
const children = (jsx) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(jsx.map(x => {
        console.log("children", "x", typeOf(x), x);
        return treefy(x);
    }));
});
function stringify(jsx) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.stringify(jsx)
            .replace(/\{/g, "\{ ")
            .replace(/\}/g, " \}")
            .replace(/","/g, '", "')
            .replace(/"([\w\d_-]+?)":([0-9]+?)/g, '$1: $2')
            .replace(/"([\w\d_-]+?)":"/g, '$1: "');
    });
}
function element(jsx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const children = yield treefy((_a = jsx.props) === null || _a === void 0 ? void 0 : _a.children);
        const element = Object.assign(Object.assign({}, jsx), { props: Object.assign(Object.assign({}, jsx.props), { children }) });
        // if (jsx.type == "div") {
        // console.log("element", "props", typeOf(props), props)
        console.log("element", "children", typeOf(children), children);
        // }
        return element;
    });
}
function component(jsx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const children = yield treefy((_a = jsx.props) === null || _a === void 0 ? void 0 : _a.children);
        const props = Object.assign(Object.assign({}, jsx.props), { children });
        const tag = yield jsx.type(props);
        // console.log("component", typeOf(tag.props), tag.props)
        return yield treefy(tag);
    });
}
function subComponent(jsx) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapper = ([k, v]) => __awaiter(this, void 0, void 0, function* () { return [k, yield treefy(v)]; });
        const awaits = Object.entries(jsx).map(mapper);
        const synced = yield Promise.all(awaits);
        console.log('subComponent', jsx, synced);
        return Object.fromEntries(synced);
    });
}
express.listen(settings_1.PORT, () => console.log(`Listening on ${settings_1.HOST}`));
