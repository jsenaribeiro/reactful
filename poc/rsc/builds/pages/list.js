"use strict";
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
const settings_1 = require("../settings");
const List = () => __awaiter(void 0, void 0, void 0, function* () {
    const breeds = yield fetch(`${settings_1.HOST}/api/breeds/list/all`)
        .then((r) => r.json())
        .then((data) => Object.keys(data.message));
    const images = yield Promise.all(breeds.map((b) => fetch(`${settings_1.HOST}/api/breed/${b}/images/random`)
        .then((r) => r.json())
        .then((data) => data.message)));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Welcome to my dog site!"),
        react_1.default.createElement("p", null, "Here are some of my favorite good bois. They are so good, the goodest. I love them. Please click on one to go to its page."),
        react_1.default.createElement("ul", null, breeds.map((breed) => (react_1.default.createElement("li", { key: breed },
            react_1.default.createElement("a", { href: `/detail?breed=${breed}` }, breed))))),
        react_1.default.createElement("div", { className: "grid" }, images.map((i) => (react_1.default.createElement("img", { key: i, alt: i, src: i }))))));
});
exports.default = List;
