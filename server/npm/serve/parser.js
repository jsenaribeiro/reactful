"use server";
import React from "react";
import { logger as log } from "../extra";
import { SELF_CLOSE_TAGS, JSXON } from "@reactful/commons";
import { env, proper, params } from "@reactful/commons";
import { styler } from "./styler";
const raw = x => typeof x != "object";
const rce = (fce, props) => React.createElement(fce, props);
let uid = 0;
export const parser = (root, href) => new Parser(root, href).render();
class Parser {
    leaf = false;
    path;
    href;
    root;
    constructor(root, href) {
        this.root = root['type'] ? root : rce(root, {});
        this.path = root.metadata?.path?.replace(/\/$/, '') || '';
        this.href = href.replace(/\/$/, '');
        this.leaf = !!root['type'];
        if (!this.leaf) {
            const filename = this.path.split("/").at(-1);
            filename && log.itemfy(filename);
            uid = 0;
        }
    }
    async render() {
        const tag = this.root.type.name.replace(/[\$]+$/, '') || 'default';
        const now = await this.parent(this.root, tag);
        return (uid = 0) || now;
    }
    parent = async (now, own) => !now ? undefined
        : now['type'] ? await this.child(now, own)
            : Array.isArray(now) ? await this.children(now, own)
                : typeof now == "object" ? await this.syblings(now, own)
                    : now;
    async child(jsx, own) {
        const label = typeof jsx.type == 'function' ? (jsx.type.name || 'default') : jsx.type.toString();
        const keyed = jsx.key && jsx.key.includes(".") ? null : jsx.key;
        const props = { ...jsx.props, tag: label, uid: uid++ };
        const fixed = { ...jsx, key: keyed, props };
        const infos = jsx.type.metadata;
        const isElement = typeof jsx.type === "string";
        const isComponent = typeof jsx.type === "function";
        const isFrament = jsx.type === Symbol.for('react.fragment');
        const isSuspense = jsx.type === Symbol.for("react.suspense");
        const isFailed = !React.isValidElement(jsx) && !isComponent && !isSuspense;
        const isSubComponent = isComponent && infos?.path && this.path && infos.path != this.path;
        if (isFailed)
            log.insert(`isFailed ${JSON.stringify(jsx)}\n`);
        return isFailed ? undefined
            : isSubComponent ? new Parser(jsx, this.href).render()
                : isComponent ? await this.component(fixed, own)
                    : isElement ? await this.element(fixed, own)
                        : isSuspense ? await this.fragment(jsx, own)
                            : isFrament ? await this.fragment(jsx, own)
                                : jsx;
    }
    async children(jsxs, own) {
        const mapper = async (node) => {
            try {
                const tag = typeof node.type == "function" ? node.type.name
                    : typeof node.type == "string" ? node.type
                        : typeof node.type == "symbol" ? '<>'
                            : node.type?.toString() || '';
                const end = raw(node) === true;
                if (tag)
                    log.append(` ${tag}`, "DIM");
                else if (end)
                    return await node;
                return await this.parent(node, own);
            }
            catch (ex) {
                console.error(ex);
                return undefined;
            }
        };
        const all = jsxs.map(mapper);
        return await Promise.all(all);
    }
    syblings = async (props, own) => Object
        .fromEntries(await Promise
        .all(Object.entries(props)
        .map(async ([key, val]) => [key, await this.parent(val, own)])));
    async element(jsx, own) {
        try {
            const attrs = params(jsx.type, own, ++uid);
            const props = proper(jsx.props, attrs);
            const style = styler({ ...jsx, props }, this.path);
            const internal = jsx.props?.children;
            const isClosed = SELF_CLOSE_TAGS.includes(jsx.type);
            const children = isClosed ? undefined : await this.parent(internal, own);
            Object.keys(env.settings.propers).forEach(k => delete jsx[k]);
            return { ...jsx, props: { ...props, style, children } };
        }
        catch (ex) {
            console.error(ex);
            throw ex;
        }
    }
    async fragment(jsx, own) {
        const fall = jsx.props.fallback;
        const html = fall ? JSXON.htmlfy(fall) : '';
        const lazy = jsx.type === Symbol.for("react.suspense");
        const name = own.replace('default$', 'default');
        if (lazy && fall)
            env.set("lazy", this.href, name, html);
        return await this.parent(jsx.props.children, own);
    }
    async component(jsx, own) {
        const tag = jsx.type.name || 'default';
        const arg = params(tag, own, ++uid);
        const ioc = env.settings.context;
        try {
            const topProps = { ...jsx.props, own: tag };
            const newChild = await jsx.type(topProps, ioc);
            const subProps = { ...topProps, ...newChild.props };
            const endChild = { ...newChild, props: subProps };
            const children = await this.parent(endChild, tag);
            const newProps = Array.isArray(endChild)
                ? subProps : await proper(subProps, arg);
            if (Array.isArray(children))
                return children;
            else if (!children)
                return [];
            else
                return {
                    ...children, props: {
                        ...newProps,
                        ...children.props,
                        own: jsx.props.tag,
                    }
                };
        }
        catch (ex) {
            const refer = jsx.type;
            const fails = [ex.message, ex.stack].distinct();
            const error = (refer.metadata?.fail || env.settings.failure);
            const attrs = { ...jsx.props, retry: this.href, hidden: true };
            const child = error(500, fails);
            const props = { ...attrs, ...child.props };
            env.settings.faileds.push({ href: this.href, call: jsx.type });
            return { ...child, props };
        }
    }
}
//# sourceMappingURL=parser.js.map