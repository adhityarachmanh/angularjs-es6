#!/bin/bash
### BEGIN INIT INFO
# Provides: freshfish 
# Required-Start:    $local_fs $remote_fs $network $syslog $named
# Required-Stop:     $local_fs $remote_fs $network $syslog $named
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       freshfish svc ver 1.0 che 20200103
### END INIT INFO

CBLUE="\x1b[34;01m"
CRED="\x1b[31;01m"
CGREEN="\x1b[32;01m"
CRESET="\x1b[39;49;00m"

showHelp(){
  echo -e \
  "Usage:$CBLUE bash $0$CGREEN COMMAND SWITCH
$CGREEN
COMMAND$CRESET:
$CRED start$CRESET:
  Starting service.
$CRED stop$CRESET:
  Stoping service.
$CRED status$CRESET:
  Querying service's status.
$CRED restart$CRESET:
  Restarting service.
$CGREEN
SWITCH$CRESET:
  -w=NUMBER_OF_WORKER set amount of workers
$CRESET
Example:
  $CBLUE bash $0$CRED start
  $CBLUE bash $0$CRED start -w=4
  $CBLUE bash $0$CRED stop
$CRESET"
  exit 1
}

SVCNAME="angularjses6"
USER=arh
GROUP=arh
ROOTDIR=/home/arh/projects/angularjs-es6
DAEMON=$ROOTDIR/server/env/bin/gunicorn
APPDIR=$ROOTDIR/server
SOCKFILE=$APPDIR/run/api/angularjses6.sock
PIDFILE=$APPDIR/run/api/gunicorn.pid
LOGFILE=$APPDIR/run/log/gunicorn.log
# Gunicorn
APP_MAIN=app

# Get CPU count and determine # of worker/thread
NUM_WORKERS=2 #$(grep -c ^processor /proc/cpuinfo)
# NUM_WORKERS=$(($NUM_WORKERS * 2 + 1))

install() {
  echo "Installing $SVCNAME service"
  local fn="/etc/init.d/$SVCNAME"
  cp $0 $fn
  chown root:root $fn
  chmod 755 $fn
  update-rc.d $SVCNAME defaults
  systemctl daemon-reload
}

uninstall() {
  echo "Uninstalling $SVCNAME service"
  local fn="/etc/init.d/$SVCNAME"
  update-rc.d -f $SVCNAME remove
  rm $fn
}

start(){
  if [ -f $PIDFILE ] && kill -0 $(cat $PIDFILE) 2> /dev/null; then
    echo 'Service already running' >&2
    return 1
  fi
  # Starting service
  echo "Starting $SVCNAME as $USER ..."
  cd $APPDIR
  export PYTHONPATH=$APPDIR:$PYTHONPATH
  # Create the run/api directory if it doesn't exist
  RUNDIR=$(dirname $PIDFILE)
  if [ ! -d "$RUNDIR" ]; then
    mkdir -p $RUNDIR
    chown $USER "$RUNDIR"
  fi
  # Create the log/api directory if it doesn't exist
  LOGDIR=$(dirname $LOGFILE)
  if [ ! -d "$LOGDIR" ]; then
    mkdir -p $LOGDIR
    chown $USER "$LOGDIR"
  fi
  local PRE_EXEC="source $ROOTDIR/env/bin/activate;cd $APPDIR;"
  # Start Bottle Gunicorn
  # Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
  local ARG="app.wsgi --daemon --name $SVCNAME --worker-class gthread --workers $NUM_WORKERS --threads $NUM_WORKERS --max-requests-jitter 10000 --bind=unix:$SOCKFILE --backlog 5120 --pid=$PIDFILE --timeout 120 --reload --log-level=error --log-file=$LOGFILE &!"
  local CMD="$PRE_EXEC $DAEMON $ARG;"
  su -s /bin/bash -c "$CMD"
  echo "Starting $SVCNAME completed."
}

stop(){
  if [ ! -f "$PIDFILE" ] || ! kill -0 $(cat "$PIDFILE") 2> /dev/null; then
    echo 'Service not running' >&2
    return 1
  fi
  echo -e "Stoping $SVCNAME..."
  kill -9 `cat $PIDFILE`
  while ps -p $(cat "$PIDFILE") > /dev/null 2>&1; do sleep 1;done;
  # Removing pid file
  rm -f $PIDFILE
  # Don't remove socket file because it is still being used by nginx

  echo -e "Stoping $SVCNAME completed."
}

status(){
  # include declaration
  . /lib/lsb/init-functions
  echo "Querying status of $PIDFILE $DAEMON $SVCNAME..."
  status_of_proc -p $PIDFILE "$DAEMON" "$SVCNAME"
}

restart(){
  stop
  sleep 3
  start
}

for a in "$@"
do
    if [[ $a == -w=* ]]; then
      NUM_WORKERS=${a#*=}
    fi
done

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  status)
    status
    ;;
  restart|reload)
    restart
    ;;
  install)
    install
    ;;
  uninstall)
    uninstall
    ;;
  *)
    showHelp
esac

exit 0