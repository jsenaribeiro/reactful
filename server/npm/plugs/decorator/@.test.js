import transpiler from './plugin';
import { tester } from '../../extra/tester';
import { COMMENTS } from '@reactful/commons';
// variation: async default anonymous export
const withArrobaImport = {
    sampling: 'import some from "@url/file"\n @test function Hello(props) { return <>Hello World</> }',
    expected: `import some from "@url/file"
   const Hello = test(import.meta, function Hello(props) { return <>Hello World</> })`
};
const functionDecoratorCase = {
    sampling: '@test(true) export function sum(x,y) { return x+y }',
    expected: `export const sum = test(true)(import.meta, function sum(x,y) { return x+y })`
};
const asyncFunctionDecoratorCase = {
    sampling: '@test(true) async function sum(x: number) { return x+1 }',
    expected: `const sum = test(true)(import.meta, async function sum(x: number) { return x+1 })`
};
const defaultFunctionDecoratorCase = {
    sampling: '@test(true) export default function Hello(props) { return <>Hello World</> }',
    expected: `export default test(true)(import.meta, function Hello(props) { return <>Hello World</> })`
};
const defaultAsyncFunctionDecoratorCase = {
    sampling: '@test(true) export default async function Hello(props) { return <>Hello World</> }',
    expected: `export default test(true)(import.meta, async function Hello(props) { return <>Hello World</> })`
};
const defaultAnonymousFunctionDecoratorCase = {
    sampling: '@test(true) export default function(props) { return <>Hello World</> }',
    expected: `export default test(true)(import.meta, function(props) { return <>Hello World</> })`
};
const defaultAnonymousAsyncFunctionDecoratorCase = {
    sampling: '@test(true) export default async function(props) { return <>Hello World</> }',
    expected: `export default test(true)(import.meta, async function(props) { return <>Hello World</> })`
};
const multipleFunctionDecoratorCase = {
    sampling: '@id(1) @aid("info") @auth(true) function Hi() { return "Hi!" }',
    expected: `const Hi = auth(true)(import.meta, aid("info")(import.meta, id(1)(import.meta, function Hi() { return "Hi!" })))`
};
const parenthelessMultipleFunctionDecoratorCase = {
    sampling: '@id @log @auth @count function Hello(props) { return <>Hello World</> }',
    expected: `const Hello = count(import.meta, auth(import.meta, log(import.meta, id(import.meta, function Hello(props) { return <>Hello World</> }))))`
};
const arrowFunctionDecoratorCase = {
    sampling: '@test(true) export const Hello = (props) => <>Hello World</>',
    expected: `export const Hello = test(true)(import.meta, (props) => <>Hello World</>)`
};
const asyncArrowFunctionDecoratorCase = {
    sampling: '@test(true) export const Hello = async (props) => <>Hello World</>',
    expected: `export const Hello = test(true)(import.meta, async (props) => <>Hello World</>)`
};
const defaultArrowFunctionDecoratorCase = {
    sampling: '@test(true) export default (props) => <>Hello World</>',
    expected: `export default test(true)(import.meta, (props) => <>Hello World</>)`
};
const defaultAsyncArrowFunctionDecoratorCase = {
    sampling: '@test(true) export default (props) => <>Hello World</>',
    expected: `export default test(true)(import.meta, (props) => <>Hello World</>)`
};
const defaultFunctionDecoratorWithComplexArgsCase = {
    sampling: '@test({ name: john, date: new Date() }) export default function Hello(props) { return <>Hello World</> }',
    expected: `export default test({ name: john, date: new Date() })(import.meta, function Hello(props) { return <>Hello World</> })`
};
const innerBlockFunctionDecoratorMustBeThrowCase = {
    sampling: '@outer(0) function Hello(props) { @inner(1) function what() { }; return 1 }',
    expected: 'Invalid nesting functions decorators',
    hasError: true
};
const innerArrowFunctionDecoratorMustBeThrowCase = {
    sampling: '@outer(0) const Hello = (props) => { @inner(1) function what() { }; return 1 }',
    expected: `Invalid nesting functions decorators`,
    hasError: true
};
const scenarios = {
    withArrobaImport,
    functionDecoratorCase,
    asyncFunctionDecoratorCase,
    defaultFunctionDecoratorCase,
    multipleFunctionDecoratorCase,
    defaultAsyncFunctionDecoratorCase,
    defaultAnonymousFunctionDecoratorCase,
    parenthelessMultipleFunctionDecoratorCase,
    defaultAnonymousAsyncFunctionDecoratorCase,
    defaultFunctionDecoratorWithComplexArgsCase,
    arrowFunctionDecoratorCase,
    asyncArrowFunctionDecoratorCase,
    defaultArrowFunctionDecoratorCase,
    defaultAsyncArrowFunctionDecoratorCase,
    innerBlockFunctionDecoratorMustBeThrowCase,
    innerArrowFunctionDecoratorMustBeThrowCase
};
// log('' + scenarios.functionDecoratorCase.sampling 
//    + '\n-------------------------------------------\n')
tester(true, scenarios, COMMENTS, sample => transpiler({ code: sample, path: '/fake.tsx' }));
//# sourceMappingURL=@.test.js.map