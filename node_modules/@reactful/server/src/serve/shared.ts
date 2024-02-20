import "@reactful/extension"

import { Server } from "bun"

export interface IServer extends IServerFluent {   
   port: number

   /** Starts a bun server for React SSR
    * @param {string} id query selector HTML for React hydration root */
   server(id: string): IServerFluent
   
   /** Starts a bun server for React SSR
    * @param {string} id query selector HTML for React hydration root
    * @param {number} port server port number (default 3000) */
   server(id: string, port: number): IServerFluent

   
   /** Starts a bun server for React SSR
    * @param {string} id query selector HTML for React hydration root
    * @param {number} port server port number (default 3000) 
    * @param {Settings} configs global settings with defaults  */
   server(id: string, port: number, configs: Partial<Settings>): IServerFluent
}

export interface IServerFluent {   
   /** Inject a custom props directive 
   * @param {function} props props directive with function name */
   inject(props: Proper): IServerFluent
   
   /** Inject a custom props directive 
   * @param {string} props props directive with object named key */
   inject(props: Record<string, Proper>): IServerFluent

   /** Inject a store object into feeds.global IoC 
    * @param {object} store store object with object named key */
   inject<T extends Object>(store: Record<string, T>): IServerFluent

   /** Inject a wasm module library as feeds.module IoC 
   * @param {string} wasms wasm module name identifier  */
   inject(wasms: Record<string, `${string}.aswm`>): IServerFluent

   /** starts react fullstack render */
   render(): Promise<Server>
}