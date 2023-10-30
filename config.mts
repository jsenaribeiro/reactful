/// <reference types="vite" />
/// <reference types="vite/client" />
/// <reference types="@types/react" />
/// <reference types="@types/react-dom" />

import { defineConfig } from 'npm:vite@latest'
import react from 'npm:@vitejs/plugin-react-swc@latest'

import 'npm:react@latest'
import 'npm:@swc/core@latest'
import 'npm:typescript@latest'
import 'npm:react-dom@latest/client'

/** @type {import('vite').UserConfig} */

export default defineConfig({
   root: "src",
   target: "esnext",
   plugins: [react()],
   publicDir: "assets"
})
