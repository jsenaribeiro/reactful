import transpiler from './plugin';
import { tester } from '../../extra';
import { COMMENTS } from '@reactful/commons';
const functionDecoratorCase = {
    sampling: 'function Hello(props) { return <>Hello World</> }',
    expected: `function Hello(props) { return <>Hello World</> }
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';`
};
const asyncFunctionDecoratorCase = {
    sampling: 'async function Hello(props) { return <>Hello World</> }',
    expected: `async function Hello(props) { return <>Hello World</> }
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';`
};
const defaultFunctionDecoratorCase = {
    sampling: 'export default function Hello(props) { return <>Hello World</> }',
    expected: `function Hello(props) { return <>Hello World</> }
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';
   export default Hello`
};
const defaultAsyncFunctionDecoratorCase = {
    sampling: 'export default async function Hello(props) { return <>Hello World</> }',
    expected: `async function Hello(props) { return <>Hello World</> }
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';
   export default Hello`
};
const defaultAnonymousFunctionDecoratorCase = {
    sampling: 'export default function(props) { return <>Hello World</> }',
    expected: `function default$(props) { return <>Hello World</> }
   default$["metadata"] ||= { };
   default$["metadata"].path = '/file.tsx';
   export default default$`
};
const defaultAnonymousAsyncFunctionDecoratorCase = {
    sampling: 'export default async function(props) { return <>Hello World</> }',
    expected: `async function default$(props) { return <>Hello World</> }
   default$["metadata"] ||= { };
   default$["metadata"].path = '/file.tsx';   
   export default default$`
};
const arrowFunctionDecoratorCase = {
    sampling: 'export const Hello = (props) => <>Hello World</>',
    expected: `export const Hello = (props) => <>Hello World</>
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';`
};
const asyncArrowFunctionDecoratorCase = {
    sampling: 'export const Hello = async (props) => <>Hello World</>',
    expected: `export const Hello = async (props) => <>Hello World</>
   Hello["metadata"] ||= { };
   Hello["metadata"].path = '/file.tsx';`
};
const defaultArrowFunctionDecoratorCase = {
    sampling: 'export default (props) => <>Hello World</>',
    expected: `const default$ = (props) => <>Hello World</>
   default$["metadata"] ||= { };
   default$["metadata"].path = '/file.tsx';   
   export default default$`
};
const defaultAsyncArrowFunctionDecoratorCase = {
    sampling: 'export default (props) => <>Hello World</>',
    expected: `const default$ = (props) => <>Hello World</>
   default$["metadata"] ||= { };
   default$["metadata"].path = '/file.tsx';   
   export default default$`
};
const multipleExportedFunctions = {
    sampling: `export const F1 = async (props) => <>F1</>
   export const F2 = props => { return null }
   export function F3(props) { return null }`,
    expected: `export const F1 = async (props) => <>F1</> 
   export const F2 = props => { return null }
   export function F3(props) { return null }
   F1["metadata"] ||= { };
   F1["metadata"].path = '/file.tsx';
   F2["metadata"] ||= { };
   F2["metadata"].path = '/file.tsx';
   F3["metadata"] ||= { };
   F3["metadata"].path = '/file.tsx';`
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
    defaultAsyncArrowFunctionDecoratorCase,
    multipleExportedFunctions
};
tester(true, scenarios, COMMENTS, sample => transpiler({ code: sample, path: '/file.tsx' }));
//# sourceMappingURL=@.test.js.map