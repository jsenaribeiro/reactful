deno run -A deploy.js

set "ORIGIN=B:\Repositorios\reactful\document"
set "SOURCE=B:\Repositorios\jsenaribeiro.github.io"

copy %ORIGIN%\overview.* %SOURCE%\readme
copy %ORIGIN%\preview.* %SOURCE%\readme
copy %ORIGIN%\avi\intro.mp4 %SOURCE%\readme\avi\intro.mp4
xcopy %ORIGIN%\review %SOURCE%\readme\review /y /s /e

copy %ORIGIN%\favicon.ico %SOURCE%\readme
copy %ORIGIN%\default.* %SOURCE%\readme
copy %ORIGIN%\index.* %SOURCE%\readme
copy %ORIGIN%\main.* %SOURCE%\readme

copy %ORIGIN%\slideme\*.* %SOURCE%\slideme
copy %ORIGIN%\img\*.* %SOURCE%\img

copy %ORIGIN%\proposal\*.* %SOURCE%\proposal

cd ../../jsenaribeiro.github.io

git add .
git commit -m 'doc....'
git push

cd %ORIGIN%