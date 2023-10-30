rem node server.js
rem node --experimental-specifier-resolution=esnext server.js

if "%1"=="" ( npx esbuild --platform=node --bundle server.tsx --outfile=dist/server.js )
