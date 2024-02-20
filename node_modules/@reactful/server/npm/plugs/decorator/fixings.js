export function parenthelessDecorators(args) {
    args.code = removeAllCommentsLines(args);
    // get all parentheless decorator
    const parenthelessDecorators = Array.from(args.code
        .matchAll(/(@\w[\w\d\$_]*)([\s\t\n]+)/gm))
        .flatMap(x => x.at(1) ? [x.at(1)] : []);
    // adding space after decorators 
    args.code = args.code.replace(/(@[\w\d\$_]+)(.+\))([^\s])/gm, '$1$2 $3');
    // adding parentheses in parentheless decorators
    args.code = args.code.replace(/(@\w[\w\d\$_]*)([\s\t\n]+)/gm, '$1() $2');
    return parenthelessDecorators;
}
export function removeAllCommentsLines(args) {
    args.code = args.code.replace(/\/\*[\n\N]*\*\//gm, '');
    args.code = args.code.replace(/^\s*\/{3}.+\n/gm, '');
    args.code = args.code.replace(/^\s*\/{2}.+\n/gm, '');
    args.code = args.code.replace(/([^:])\/{3}.+\n/gm, '$1');
    args.code = args.code.replace(/([^:])\/{2}.+\n/gm, '$1');
    return args.code;
}
//# sourceMappingURL=fixings.js.map