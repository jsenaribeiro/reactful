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
function Facts(props) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://catfact.ninja/fact?max_length=33");
        const catFacts = yield response.json();
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h2", null, "Async React Server Component"),
            react_1.default.createElement("pre", null,
                "Cat Fact of day: ",
                catFacts,
                " "));
    });
}
exports.default = Facts;
