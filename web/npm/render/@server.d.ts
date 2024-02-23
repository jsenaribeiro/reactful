import '@reactful/extensions';
export declare function server(mode: "static" | "dynamic"): Decorator<RFC>;
export declare function server(mode: "periodic", ms: number): Decorator<RFC>;
export declare function server(mode: "periodic", time: Time): Decorator<RFC>;
