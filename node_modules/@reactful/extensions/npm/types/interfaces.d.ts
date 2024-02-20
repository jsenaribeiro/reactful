export {};
declare global {
    type UrlMap<T> = {
        [key: URLString]: T;
    };
    type UrlTagMap<T> = {
        [key: URLString]: Record<string, T>;
    };
    interface OAuth {
        clientId: string;
        secretId: string;
        scopings: string;
    }
    interface ISession<T> {
        login(username: string, password: string): Promise<void>;
        logout(): void;
        logged: T | undefined;
    }
    interface ClientInfo {
        run: IParser<any, any>;
        off: boolean;
        tag: string;
        jsx: RFC;
    }
    interface Settings<T = any> {
        storage: T;
        context: Feeds;
        current: string;
        queryId: string;
        binding: Binding;
        folders: Folders;
        caching: ICache[];
        propers: Proper[];
        renders: Render[];
        faileds: {
            href: string;
            call: RFC;
        }[];
        failure: (status: number, errors: string[]) => RRE;
        stylers: UrlMap<string[]>;
        clients: UrlMap<ClientInfo>;
    }
    interface ClientSettings<T = any> extends Settings<T> {
        initial: string;
        binding: Binding;
    }
    interface Feeds<L = any, P = any> {
        logon: L;
        param: P;
        await: boolean;
        fails: Invalid[];
        store: Record<string | symbol, any>;
    }
    type CacheKey = "html" | "meta" | "lazy" | "href";
    interface ICache {
        type: CacheKey;
        name: string;
        data: string;
        path: string;
        call: RFC;
    }
    interface Caching {
        html: UrlMap<HTMLString>;
        lazy: UrlMap<HTMLString>;
        meta: UrlTagMap<MetaTags>;
    }
    interface Route<D = any, F = Function> {
        type: RouteType;
        path: string;
        name: string;
        data: D;
        call: F;
    }
    interface Detail {
        title: string;
        description: string;
    }
    interface Folders {
        apis: URLString;
        assets: URLString;
        builds: URLString;
        routes: URLString;
        shares: URLString;
        components: URLString;
        directives: URLString;
    }
    interface Params<T extends object = any> {
        uid: number;
        tag: string;
        own: string;
        ioc: Feeds;
        mem?: T | undefined;
    }
    interface Render {
        call: RFC;
        mode: Mode;
        name: string;
        path: string;
        href: string;
        time: number;
    }
}
