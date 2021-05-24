
CREATOR=$(whoami)
OS="$OSTYPE"
DATE=$(date)


CBLUE="\x1b[34;1m"
CRED="\x1b[31;1m"
CGREEN="\x1b[32;1m"
CYELLOW="\x1b[33;1m"
CRESET="\x1b[39;49;00m"
TERR="\e[1;40;97m"
THIDE="\e[8m"

template="tmp"
componentEX="component"
creatorJSEX="creatorJS"
creatorHTMLEX="creatorHTML"

htmlEX="html"


InitLib(){
    cd $1
}

GTemplate(){
    if [ -d ../$2$template ] && [ -f ../$2$template/$1 ]; then
        RESPONSE=$(cat ../$2$template/$1)
        local RESPONSE="$RESPONSE"
    fi
}

GHTML(){
    CCreate "$1" component $htmlEX "html"
}

GComponent(){
    CCreate "$1" component $componentEX "js"
}

CCreate(){
    if [ "$1" == "" ]; then
        echo -e "$MSGERROR Error create $2 file \n$CGREEN\bFormat:$CYELLOW [FILENAME] $CGREEN|$CYELLOW [DIR]{infinity}/[FILENAME]."
        return
    fi
    IFS='/' read -ra CTX <<< "$CONTEXT"
    CONTEXT=$1
    TYPE=$2
    TMPLTURL=$3
    EXT=$4
    DIR=$(pwd)
    TN="$(tr '[:lower:]' '[:upper:]' <<< ${TYPE:0:1})${TYPE:1}"
    TMPLOUT=""
    IDX=1
    CDB=""
    IFS='/' read -ra CTX <<< "$CONTEXT"
    if [ "${CONTEXT:$((${#CONTEXT}-1)):${#CONTEXT}}" == "/" ] || [ "${CONTEXT:0:1}" == "/" ]; then
        echo -e "$MSGERROR Error create $2 file. \n$MSGERROR Invalid format '/' at first or last path. \n$MSGINFO  Format:$CYELLOW [FILENAME] $CGREEN|$CYELLOW [DIR]{infinity}/[FILENAME]"
        return
    elif [ -f $(pwd)/"$CONTEXT"."$TYPE"."$EXT" ]; then
        echo -e "$MSGERROR "$CONTEXT"."$TYPE".$EXT component already exists."
        return
    fi
    for i in "${CTX[@]}"
    do
        if [  ${#CTX[@]} == $IDX ]; then
            # SN="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
            SN=""
            IFS='.' read -ra SNS <<< "${i}"
            for j in "${SNS[@]}"
            do
                SN+="$(tr '[:lower:]' '[:upper:]' <<< ${j:0:1})${j:1}"
            done
            
            MODULE_NAME=$(echo ${i//'.'/' '})
            MODULE_NAME="${MODULE_NAME} ${TYPE}"
            MODULE_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${MODULE_NAME})"
            if [ "$EXT" == "js" ];then
                GTemplate $creatorJSEX "$CDB"
            elif [ "$EXT" == "html" ];then
                GTemplate $creatorHTMLEX "$CDB"
            fi
            TMPLOUT+="$RESPONSE"
            MARKCONTEXT="MODULE_NAME,CREATOR,DATE,OS"
            IFS=',' read -ra MARKCTX <<< "$MARKCONTEXT"
            for j in "${MARKCTX[@]}"
            do
                TMPLOUT=$(echo "$TMPLOUT" | sed -e "s+_${j}_+${!j}+g")
            done
            GTemplate $TMPLTURL "$CDB"
            if [ "$TMPLTURL" == "component" ];then
                TMPLOUT+="\n\nimport { Component } from '../${CDB}shr/module-builder';\n"
            fi
            RESPONSE=$(echo "\n$RESPONSE" | sed -e "s+example+${i}+g")
            TMPLOUT+=$(echo "\n$RESPONSE" | sed -e "s+Example+${SN}+g")
            i="$(tr '[:upper:]' '[:lower:]' <<< ${i})"
            echo -e "$TMPLOUT" >> $(pwd)/"${i}"."${TYPE}"."$EXT"
            chmod 777 $(pwd)/"${i}"."${TYPE}"."$EXT"

        else
            if [ ! -d $(pwd)/$i ]; then
                mkdir $(pwd)/$i
                chmod 777 $(pwd)/$i
            fi
            cd $(pwd)/$i
            CDB+="../"
            IDX=$(($IDX + 1))
        fi
    
    done
    cd $CDB
}

Generate(){
    case "$1" in
        component|c)
            GHTML $2
            GComponent $2
            ;;
        *)
            echo -e 'For more detailed help run "generate --help"'
            ;;
    esac
}

if [ $1 != "" ];then
    # local PROJECTDIR=$(pwd)
    InitLib $1
    case "$2" in
        generate|g)
            Generate $3 $4
            ;;
       
        *)
            echo -e 'For more detailed help run "--help"'
            ;;
    esac
else
    echo -e "$CRED\bAdd argument $CGREEN'project=your_project_directory'$CRED first.$CRESET"
fi
exit 0