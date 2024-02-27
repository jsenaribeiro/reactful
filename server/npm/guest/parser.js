"use client";
import React from "react";
import { env, PROXY, params } from "@reactful/commons";
import { mountState, refocus } from "../state";
import { styler } from "./styler";
import proper from "../props";
var latest = {};
const raw = x => typeof x != "object";
const rce = fce => React.createElement(fce, {});
const settings = env.settings;
const fixKey = (child) => child.key && child.key.includes(".") ? null : child.key;
export async function parser(root, path, href) {
    return await new Parser(root, path, href).render();
}
class Parser {
    leaf = false;
    path;
    href;
    root;
    constructor(root, path, href) {
        this.root = root['type'] ? root : rce(root);
        this.path = path.replace(/\/$/, '');
        this.href = href.replace(/\/$/, '');
        this.leaf = !!root['type'];
        settings.binding.ready = false;
    }
    render() {
        const jsx = this.root;
        const tag = jsx.type.name;
        const obj = this.parent(jsx, tag);
        return obj;
    }
    parent = (now, own) => !now ? undefined : now[PROXY] ? now
        : now['type'] ? this.child(now, own)
            : Array.isArray(now) ? this.children(now, own)
                : typeof now == "object" ? this.syblings(now, own)
                    : now;
    child(jsx, own) {
        const typed = x => typeof jsx?.type == x;
        const count = ++settings.binding.count;
        const label = jsx.props?.tag || jsx?.type?.name || jsx?.type;
        const props = { ...jsx.props, tag: label, uid: count, own };
        const fixed = { ...jsx, props, key: fixKey(jsx) };
        return typed("string") ? this.element(fixed, own)
            : typed("symbol") ? this.fragment(jsx, own)
                : typed("function") ? this.component(fixed, own)
                    : jsx;
    }
    children = (all, own) => React.Children.map(all, x => this.parent(x, own));
    syblings = (props, own) => Object.fromEntries(Object.entries(props)
        .map(([key, val]) => [key, this.parent(val, own)]));
    client(_, own) { throw new Error("client not implemented..."); }
    element(jsx, own) {
        const count = settings.binding.count;
        const attrs = params(jsx.type, own, count, latest);
        const props = proper(jsx.props, attrs);
        const style = styler({ ...jsx, props }, this.path);
        jsx.props = this.syblings({ ...props, style }, own);
        Object.keys(settings.propers).forEach(k => delete jsx[k]);
        return jsx;
    }
    fragment(jsx, own) {
        const FRAGMENT = Symbol.for('react.fragment');
        const children = jsx.props?.children;
        const resulted = jsx.type == FRAGMENT
            ? this.children(children, own)
            : children;
        return resulted;
    }
    component(jsx, own) {
        const retype = (arg, ref) => {
            const [state, feeds] = rebind(arg, ref);
            const child = jsx.type(state, feeds);
            const props = reprop(child);
            return { ...child, props, key: fixKey(child) };
        };
        const rebind = (arg, ref) => {
            const set = React.useState(0);
            const [dir, url] = [this.path, this.href];
            const [state, feeds] = mountState({ url, set, jsx, dir });
            feeds.ref ||= (ref ?? undefined);
            state.children ||= arg.children;
            return [latest = state, feeds];
        };
        const reprop = child => {
            if (!child?.props)
                return {};
            const label = jsx.type.name;
            const count = settings.binding.count;
            const isRaw = typeof child.type == 'string';
            const param = isRaw ? params(child.type, own, count, latest) : null;
            const props = this.syblings(child.props, label);
            const names = Object.keys(props || {});
            for (const field of names) {
                const value = props[field];
                if (value === undefined)
                    continue;
                else if (props[field])
                    continue;
                else
                    props[field] = value;
            }
            return param ? proper(props, param) : props;
        };
        return refocus(9) && ({ ...jsx, type: retype });
    }
}
//# sourceMappingURL=parser.js.map