#! /bin/bash
# mod : creating python 3 virtual environment
# cre : lwx 20190926
# upd : lwx 20190926
# ver : 1.0

CBLUE="\x1b[34;1m"
CRED="\x1b[31;1m"
CGREEN="\x1b[32;1m"
CYELLOW="\x1b[33;1m"
CRESET="\e[0m"
TMENU="\e[1;101;93m"
TERR="\e[1;40;97m"
THIDE="\e[8m"

ROOTDIR=/home/adhitya/projects/arh-angularjs/api
APPDIR=$ROOTDIR


CreaPyEnv() {
  cd $APPDIR
  virtualenv -p python3 env
  source env/bin/activate
  pip install -r requirements.txt
  pip install websockets
  pip freeze > requirements.txt
  deactivate
}

CreaPyEnv