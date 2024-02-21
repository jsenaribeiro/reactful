import { test, expect } from 'bun:test';
import { env } from '@reactful/commons';
import { auth } from './@auth';
import React from 'react';
const { context } = env.settings;
const fComponent = function (props) {
    return React.createElement('h1', {}, 'title...');
};
test('@auth: authorized', function () {
    globalThis.IS_SERVER_SIDE_TEST = true;
    context.logon = { name: 'test' };
    const result = auth()(import.meta, fComponent);
    const element = result();
    expect(element.type).toBe('h1');
    expect(element.props.children).toBe('title...');
});
test('@auth: unauthorized', function () {
    globalThis.IS_SERVER_SIDE_TEST = true;
    context.logon = undefined;
    const error = 'The component fComponent requires a logged user';
    const result = auth()(import.meta, fComponent);
    const element = result();
    const message = element.props.children[1]
        .props.children[0].props.children;
    expect(element.props.children[0].type).toBe('h1');
    expect(element.props.children[0].props.children).toBe('Unauthorized error');
    expect(message).toBe(error);
});
test('@auth: unauthorized role', function () {
    globalThis.IS_SERVER_SIDE_TEST = true;
    context.logon = { name: 'test', role: 'admin' };
    const error = 'The component fComponent requires user.role=user '
        + 'for authorization defined by @auth(role=user)';
    const result = auth({ role: 'user' })(import.meta, fComponent);
    const element = result();
    const message = element.props.children[1]
        .props.children[0].props.children;
    expect(message).toBe(error);
});
test('@auth: authorized role', function () {
    globalThis.IS_SERVER_SIDE_TEST = true;
    context.logon = { name: 'test', role: 'admin' };
    const result = auth({ role: 'admin' })(import.meta, fComponent);
    const element = result();
    expect(element.type).toBe('h1');
    expect(element.props.children).toBe('title...');
});
//# sourceMappingURL=@auth.test.js.map