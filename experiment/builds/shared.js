
      const GLOBAL_KEY = Symbol.for('settings')
      const process = { env: {
   "NODE_ENV": "development",
   "USER": "root",
   "VSCODE_WSL_EXT_LOCATION": "/mnt/c/Users/Jonathan/.vscode/extensions/ms-vscode-remote.remote-wsl-0.86.0",
   "SHLVL": "0",
   "HOME": "/root",
   "OLDPWD": "/mnt/c/Users/Jonathan/AppData/Local/Programs/Microsoft VS Code",
   "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/0/bus",
   "WSL_DISTRO_NAME": "Debian",
   "WAYLAND_DISPLAY": "wayland-0",
   "LOGNAME": "root",
   "PULSE_SERVER": "unix:/mnt/wslg/PulseServer",
   "WSL_INTEROP": "/run/WSL/510_interop",
   "NAME": "JSR-DESKTOP",
   "_": "/root/.vscode-server/bin/903b1e9d8990623e3d7da1df3d33db3e42d80eda/node",
   "TERM": "xterm-256color",
   "PATH": "/root/.vscode-server/bin/903b1e9d8990623e3d7da1df3d33db3e42d80eda/bin/remote-cli:/root/.nvm/versions/node/v21.5.0/bin:/root/.deno/bin:/root/.bun/bin:/root/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib:/mnt/c/Program Files/Common Files/Oracle/Java/javapath:/mnt/c/Users/Jonathan/AppData/Local/Programs/Python/Python38/Scripts/:/mnt/c/Users/Jonathan/AppData/Local/Programs/Python/Python38/:/mnt/c/Program Files (x86)/VMware/VMware Player/bin/:/mnt/c/Python310/Scripts/:/mnt/c/Python310/:/mnt/c/Users/Jonathan/AppData/Roaming/ActiveState/bin:/mnt/c/Python38/Scripts/:/mnt/c/Python38/:/mnt/c/Windows:/mnt/c/Windows/system32:/mnt/c/Windows/System32/Wbem:/mnt/c/Windows/System32/WindowsPowerShell/v1.0/:/mnt/c/Windows/System32/OpenSSH/:/mnt/c/Program Files (x86)/NVIDIA Corporation/PhysX/Common:/mnt/c/Program Files/NVIDIA Corporation/NVIDIA NvDLISR:/mnt/c/ProgramData/chocolatey/bin:/mnt/c/Users/Jonathan/AppData/Roaming/npm:/mnt/c/Program Files (x86)/Microsoft SQL Server/100/Tools/Binn/VSShell/Common7/IDE/:/mnt/c/Program Files (x86)/Microsoft SQL Server/100/Tools/Binn/:/mnt/c/Program Files/Microsoft SQL Server/100/Tools/Binn/:/mnt/c/Program Files (x86)/Microsoft SQL Server/100/DTS/Binn/:/mnt/c/Program Files/Microsoft SQL Server/100/DTS/Binn/:/mnt/c/Program Files/Git/cmd:/mnt/c/Program Files/Azure Data Studio/bin:/mnt/c/ProgramData/nvm:/mnt/c/Program Files/dotnet/:/mnt/c/WINDOWS/system32:/mnt/c/WINDOWS:/mnt/c/WINDOWS/System32/Wbem:/mnt/c/WINDOWS/System32/WindowsPowerShell/v1.0/:/mnt/c/WINDOWS/System32/OpenSSH/:/mnt/c/Program Files/Microsoft SQL Server/150/Tools/Binn/:/mnt/c/Program Files/Microsoft SQL Server/Client SDK/ODBC/170/Tools/Binn/:/mnt/c/ProgramData/nvm:/mnt/c/Program Files/nodejs:/Docker/host/bin:/mnt/c/Program Files/PowerShell/7/:/mnt/c/Users/Jonathan/.cargo/bin:/mnt/c/Users/Jonathan/AppData/Local/ActiveState/StateTool/release/bin:/mnt/c/Users/Jonathan/AppData/Local/activestate/cache/bin:/mnt/c/Users/Jonathan/AppData/Local/Android/Sdk/platform-tools:/mnt/c/Users/Jonathan/AppData/Local/Android/Sdk/tools:/mnt/c/Program Files/Azure Data Studio/bin:/mnt/c/Users/Jonathan/AppData/Local/Programs/Microsoft VS Code/bin:/mnt/c/ProgramData/nvm:/mnt/c/Program Files/nodejs:/mnt/c/Users/Jonathan/.dotnet/tools:/mnt/a/Profile/OneDrive/Recursos/scripts/git:/mnt/c/Users/Jonathan/AppData/Local/Google/Cloud SDK/google-cloud-sdk/bin:/mnt/c/tools/mysql/current/bin:/mnt/b/Portaveis/sonar/bin:/mnt/b/Portaveis/Tools:/mnt/c/Program Files/dotnet:/mnt/c/WINDOWS/system32:/mnt/c/Users/Jonathan/AppData/Local/Microsoft/WindowsApps:/mnt/b/Portaveis/Scripts:/mnt/c/Program Files/heroku/bin:/mnt/c/ProgramData/chocolatey/lib/deno:/mnt/c/Users/Jonathan/.deno/bin:/mnt/c/Users/Jonathan/.bun/bin",
   "XDG_RUNTIME_DIR": "/run/user/0/",
   "DISPLAY": ":0",
   "LANG": "en_US.UTF-8",
   "SHELL": "/usr/bin/zsh",
   "PWD": "/mnt/c/Users/Jonathan/AppData/Local/Programs/Microsoft VS Code",
   "HOSTTYPE": "x86_64",
   "WSL2_GUI_APPS_ENABLED": "1",
   "WSLENV": "VSCODE_WSL_EXT_LOCATION/up",
   "VSCODE_HANDLES_SIGPIPE": "true",
   "ZSH": "/root/.oh-my-zsh",
   "PAGER": "less",
   "LESS": "-R",
   "LSCOLORS": "Gxfxcxdxbxegedabagacad",
   "LS_COLORS": "rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:",
   "BUN_INSTALL": "/root/.bun",
   "NVM_DIR": "/root/.nvm",
   "NVM_CD_FLAGS": "-q",
   "NVM_BIN": "/root/.nvm/versions/node/v21.5.0/bin",
   "NVM_INC": "/root/.nvm/versions/node/v21.5.0/include/node",
   "VSCODE_AMD_ENTRYPOINT": "vs/workbench/api/node/extensionHostProcess",
   "VSCODE_HANDLES_UNCAUGHT_ERRORS": "true",
   "VSCODE_NLS_CONFIG": "{'locale':'en','osLocale':'en','availableLanguages':{}}",
   "VSCODE_CWD": "/mnt/c/Users/Jonathan/AppData/Local/Programs/Microsoft VS Code",
   "ELECTRON_RUN_AS_NODE": "1",
   "VSCODE_IPC_HOOK_CLI": "/run/user/0/vscode-ipc-a3348fed-51a2-4682-80f6-506bcea3101f.sock",
   "VSCODE_L10N_BUNDLE_LOCATION": "",
   "APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL": "1",
   "BUN_INSPECT": "ws+unix:///tmp/nl4wn3cyrrp.sock?wait=1",
   "BUN_INSPECT_NOTIFY": "unix:///tmp/uia5yjvb70k.sock",
   "FORCE_COLOR": "1",
   "BUN_QUIET_DEBUG_LOGS": "1",
   "BUN_DEBUG_QUIET_LOGS": "1",
   "PORT": "3333",
   "MINIFY": "false"
} }

      globalThis[GLOBAL_KEY] ||= { queryId:'#root' }
      globalThis[GLOBAL_KEY].renders=[{   'path': '/mnt/b/Repositorios/reactful/experiment/routes/clock.tsx',   'name': 'default$',   'time': '',   'mode': 'dynamic',   'href': '/mnt/b/Repositorios/reactful/experiment/routes/clock.tsx'},{   'path': '/mnt/b/Repositorios/reactful/experiment/routes/quotes.tsx',   'name': 'Quotes',   'time': 1800000,   'mode': 'periodic',   'href': '/mnt/b/Repositorios/reactful/experiment/routes/quotes.tsx'}];
      globalThis[GLOBAL_KEY].caching=[];
      globalThis[GLOBAL_KEY].context={
   "ref": "",
   "fails": [],
   "store": {
      "name": "ok"
   },
   "param": {},
   "await": "",
   "logon": ""
};
      globalThis[GLOBAL_KEY].propers=[(props) => props?.shown === !1 ? { ...props, hidden: !0 } : props];
      globalThis[GLOBAL_KEY].stylers={"/mnt/b/Repositorios/reactful/experiment/routes/forms/form.tsx":["/* form {\r\n   gap: 20px;\r\n   display: grid;\r\n   grid-template-columns: repeat(2, 1fr);\r\n} */\r\n\r\ncode {\r\n   padding: 10px;\r\n   display: block;\r\n   background: silver;\r\n}\r\n\r\nprogress {     \r\n   width: 100%;\r\n   height: 30px; \r\n}\r\n\r\nprogress[value]::-webkit-progress-bar { border-radius: 0; }\r\nprogress[value]::-webkit-progress-value { border-radius: 0; }"],"/mnt/b/Repositorios/reactful/experiment/routes/profile/detail.tsx":["h1 {\n   color: dimgrey;\n   font-size: 1.7rem;\n}\n\nbutton {\n   padding: 10px 20px;\n}\n\nbutton.routed {\n   background: wheat;\n   font-weight: bolder;\n}"],"/mnt/b/Repositorios/reactful/experiment/routes/profile/index.tsx":["h1 {\n   color: #ffb300;\n}\n\np {\n   color:red;\n}\n\n"]};
      globalThis[GLOBAL_KEY].folders={"apis":"/apis","assets":"/assets","builds":"/builds","routes":"/routes","shares":"/shares","directives":"/directives","components":"/components"};
      globalThis[GLOBAL_KEY].binding={"index":0,"count":0,"state":{},"react":{},"visit":[],"ready":false,"store":{"state":{"1":{"value":0},"2":{"value":1}},"count":2,"react":{}}};