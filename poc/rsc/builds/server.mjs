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
const server_1 = require("react-dom/server");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const settings_1 = require("./settings");
const promises_1 = __importDefault(require("fs/promises"));
const PRIMITIVES = ["string", "boolean", "number"];
const awaits = value => Promise.resolve(value);
const encode = (_, value) => {
    const isReactSymbol = value === Symbol.for("react.element");
    console.log("encode", isReactSymbol, value);
    return isReactSymbol ? "$" : value;
};
const app = (0, express_1.default)();
app.use(express_1.default.static("./builds"));
app.get("/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modulePath = `./pages/${req.params.page}.js`;
    const resolved = yield Promise.resolve(`${modulePath}`).then(s => __importStar(require(s))).then(x => x.default);
    const Component = (resolved === null || resolved === void 0 ? void 0 : resolved.default) || resolved;
    // console.log(0, dir)
    // console.log(1, module)
    // console.log(2, Component)
    const tree = yield recursiveTree(Component);
    console.log({ reactTree: tree });
    const stringified = JSON.stringify(tree, encode);
    console.log({ stringified });
    if (req.query.jsx === "")
        return res.end(stringified);
    const rendered = `${(0, server_1.renderToString)(tree)}
      <script>const exports = {}</script>
      <script>window.__initialMarkup=\`${stringified}\`</script>
      <script src="/client.js" type="module"></script>`;
    const path = (0, path_1.join)(process.cwd(), 'index.html');
    console.log({ path });
    const html = yield promises_1.default.readFile(path, 'utf-8');
    return res.end(html.replace('<!-- content -->', rendered));
}));
const log = (value, ...args) => { console.log("!", value, ...args); return value; };
const componentType = jsx => !jsx ? "undefined"
    : PRIMITIVES.includes(typeof jsx) ? "primitive"
        : Array.isArray(jsx) ? "array"
            // : jsx.$$typeof != Symbol.for("react.element") ? "non-react"
            : typeof jsx.type === "string" ? "string"
                : typeof jsx.type === "function" ? "function"
                    : "???";
const recursiveTree = (jsx) => __awaiter(void 0, void 0, void 0, function* () {
    return !log(jsx, componentType(jsx), jsx.toString()) ? undefined
        : PRIMITIVES.includes(typeof jsx) ? jsx
            : Array.isArray(jsx) ? yield Promise.all(jsx.map(recursiveTree))
                : typeof jsx != "object" || jsx === null ? undefined
                    // : jsx.$$typeof != Symbol.for("react.element") ? undefined
                    : typeof jsx.type === "string" ? Object.assign(Object.assign({}, jsx), { props: yield recursiveTree(jsx.props) }) : typeof jsx.type === "function" ? yield createFunctionComponent(jsx)
                        : Object.fromEntries(yield Promise.all(Object.entries(jsx).map(([key, value]) => __awaiter(void 0, void 0, void 0, function* () {
                            return [
                                key, yield recursiveTree(value)
                            ];
                        }))));
});
function createFunctionComponent(jsx) {
    return __awaiter(this, void 0, void 0, function* () {
        const props = jsx.props;
        const Component = jsx.type;
        const renderedComponent = yield Component(props);
        return yield recursiveTree(renderedComponent);
    });
}
app.listen(settings_1.PORT, () => console.log(`Listening on ${settings_1.HOST}`));
