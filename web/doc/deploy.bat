deno run -A deploy.js

set "BASIC_DIR=B:\Repositorios\reactive\doc"
set "SLIDE_DIR=B:\Repositorios\jsenaribeiro.github.io\slideme"
set "INDEX_DIR=B:\Repositorios\jsenaribeiro.github.io\readme"

copy %BASIC_DIR%\overview.* %INDEX_DIR%
copy %BASIC_DIR%\preview.* %INDEX_DIR%
copy %BASIC_DIR%\avi\intro.mp4 %INDEX_DIR%\avi\intro.mp4
xcopy %BASIC_DIR%\review %INDEX_DIR%\review /y /s /e

copy %BASIC_DIR%\favicon.ico %INDEX_DIR%
copy %BASIC_DIR%\default.* %INDEX_DIR%
copy %BASIC_DIR%\index.* %INDEX_DIR%
copy %BASIC_DIR%\main.* %INDEX_DIR%

copy %BASIC_DIR%\slideme.* %SLIDE_DIR%
copy %BASIC_DIR%\img\*.* %SLIDE_DIR%\img

cd ../../jsenaribeiro.github.io

git add .
git commit -m 'doc....'
git push

cd B:\Repositorios\reactive\doc