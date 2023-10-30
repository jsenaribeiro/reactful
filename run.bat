@echo off
if "%1"=="help" ( deno run -A npm:vite --help )
if "%1"=="" ( deno run -A npm:vite -c config.mts )
if "%1"=="build" ( deno run -A npm:vite build -c config.mts )
if "%1"=="serve" ( deno run -A https://deno.land/std@0.157.0/http/file_server.ts out/ )