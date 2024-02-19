import transpiler from './plugin';
import { tester } from '../../extra';
import { COMMENTS } from '@reactful/commons';
const functionDecoratorCase = {
    sampling: 'function Hello(props) { return <>Hello World</> }',
    expected: `function Hello(props) { return <>Hello World</> }
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const asyncFunctionDecoratorCase = {
    sampling: 'async function Hello(props) { return <>Hello World</> }',
    expected: `async function Hello(props) { return <>Hello World</> }
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const defaultFunctionDecoratorCase = {
    sampling: 'export default function Hello(props) { return <>Hello World</> }',
    expected: `export default function Hello(props) { return <>Hello World</> }
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const defaultAsyncFunctionDecoratorCase = {
    sampling: 'export default async function Hello(props) { return <>Hello World</> }',
    expected: `export default async function Hello(props) { return <>Hello World</> }
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const defaultAnonymousFunctionDecoratorCase = {
    sampling: 'export default function(props) { return <>Hello World</> }',
    expected: `export default function(props) { return <>Hello World</> }`
};
const defaultAnonymousAsyncFunctionDecoratorCase = {
    sampling: 'export default async function(props) { return <>Hello World</> }',
    expected: `export default async function(props) { return <>Hello World</> }`
};
const arrowFunctionDecoratorCase = {
    sampling: 'export const Hello = (props) => <>Hello World</>',
    expected: `export const Hello = (props) => <>Hello World</>
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const asyncArrowFunctionDecoratorCase = {
    sampling: 'export const Hello = async (props) => <>Hello World</>',
    expected: `export const Hello = async (props) => <>Hello World</>
   Hello.metadata ||= { };
   Hello.metadata.src = '/file.tsx';`
};
const defaultArrowFunctionDecoratorCase = {
    sampling: 'export default (props) => <>Hello World</>',
    expected: `export default (props) => <>Hello World</>`
};
const defaultAsyncArrowFunctionDecoratorCase = {
    sampling: 'export default (props) => <>Hello World</>',
    expected: `export default (props) => <>Hello World</>`
};
const scenarios = {
    functionDecoratorCase,
    asyncFunctionDecoratorCase,
    defaultFunctionDecoratorCase,
    defaultAsyncFunctionDecoratorCase,
    defaultAnonymousFunctionDecoratorCase,
    defaultAnonymousAsyncFunctionDecoratorCase,
    arrowFunctionDecoratorCase,
    asyncArrowFunctionDecoratorCase,
    defaultArrowFunctionDecoratorCase,
    defaultAsyncArrowFunctionDecoratorCase
};
tester(true, scenarios, COMMENTS, sample => transpiler({ code: sample, path: '/file.tsx' }));
//# sourceMappingURL=@.test.js.map