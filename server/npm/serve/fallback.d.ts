import { File } from '../extra';
export declare function fallbackFile(file: File, base: string, href: string): Promise<Response>;
export declare function fallbackHTML(html: string, base: string, href: string): Response;
export declare function fallbackURL(href: string, base: string): Promise<any>;
