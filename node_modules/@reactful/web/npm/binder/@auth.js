import { env, STATUS_CODE } from '@reactful/commons';
const { failure, context } = env.settings;
export function auth(rule) {
    rule ||= {};
    return function (meta, call) {
        const user = context.logon;
        const args = JSON.stringify(rule).replace(/["\{\}]/g, "").replaceAll(':', '=');
        const code = STATUS_CODE.UNAUTHORIZED;
        const fail = call.metadata?.fail || failure;
        const none = !user || Object.keys(user).length == 0;
        const rest = `for authorization defined by @auth(${args})`;
        const kind = `The component ${call.name} requires`;
        const list = none ? [`${kind} a logged user`]
            : Object.entries(rule).flatMap(validateOf)
                .flatMap(x => x ? [x] : []);
        // console.log({rule, list})
        return list.length ? () => fail(code, list) : call;
        function validateOf(entry) {
            const [field, value] = entry;
            const noLoggedUsers = !user;
            const isNestingRule = typeof value == 'object';
            const notIncludeKey = !Object.keys(user).includes(field);
            const contentDiffer = value !== undefined
                && !user[field].match(new RegExp(value));
            // console.log(0, { noLoggedUsers, isNestingRule, notIncludeKey, contentDiffer })
            // console.log(1, { rule, field, value, user, userValue: user[field], regex:new RegExp(value) })
            if (noLoggedUsers)
                return [`Requires a logged user`];
            if (isNestingRule)
                return Object.entries(value).map(validateOf);
            if (notIncludeKey)
                return [`${kind} field user.${field} ${rest}`];
            if (contentDiffer)
                return [`${kind} user.${field}=${value} ${rest}`];
        }
    };
}
//# sourceMappingURL=@auth.js.map