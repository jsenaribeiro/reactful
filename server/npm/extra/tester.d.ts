export type TestCase = {
    sampling: string;
    expected: string;
    hasError?: boolean;
};
export type Encoder = (sample: string) => string | Promise<string>;
export type Scenarios = Record<string, TestCase>;
export declare function tester(minify: boolean, scenarios: Scenarios, comments: string, encoder: Encoder): void;
