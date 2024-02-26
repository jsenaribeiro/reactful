/// <reference lib='dom' />

import { allSettings } from "./all"
import { IEnvironment } from "./trait"
import { contextualizer } from "./context"
import { validation } from "./try"
import { routefy } from "./let"
import { get } from "./get"
import { set } from "./set"
import '@reactful/extensions'

const consoleError = console.error.bind({})
const consoleEmpty = (...args) => null

export class Environment implements IEnvironment {
   constructor() { validation(this); contextualizer() }
   public is = (side: "CLIENT"|"SERVER") => side == (globalThis.document ? "CLIENT" : "SERVER")   
   public PORT: number = 0
   public MINIFY: boolean = true
   public FLAGS = {
      log: false,
      debug: false,
      build: false,
      serve: false,
      get errors() { return console.error != consoleEmpty },
      set errors(enable) {
         console.error = enable
            ? consoleError.bind({})
            : (...args) => null
      },
   }

   public get = get
   public set = set
   public let = routefy

   public get settings() { return allSettings() }
}