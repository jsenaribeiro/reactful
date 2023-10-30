"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = __importDefault(require("node:os"));
const react_1 = __importDefault(require("react"));
function Arch() {
    const [type, arch, release] = [node_os_1.default.type(), node_os_1.default.arch(), node_os_1.default.release()];
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null, "server side resources"),
        react_1.default.createElement("pre", null,
            type,
            " | ",
            arch,
            " | ",
            release,
            " "));
}
exports.default = Arch;
