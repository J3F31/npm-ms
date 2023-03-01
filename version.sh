#!/bin/bash
########################################################################
#Variables
########################################################################
italic=$(tput sitm)
bold=$(tput bold)
normal=$(tput sgr0)
VERSION=$(node -p -e "require('./package.json').version")
COMMIT_MSG=$2
NEW_VERSION=""
#Help
########################################################################
Help() {
    echo "${italic}npm run version [option] [message]${normal}"
    echo
    echo "${bold}Version:${normal}"
    echo    "current    $VERSION"
    echo    "syntax     a.b.c-snapshot"
    echo
    echo "${bold}Options:${normal}"
    echo    "major      a++             "
    echo    "minor      b++             "
    echo    "patch      c++             "
    echo    "alpha      snapshot=alpha  (Not a feature yet)"
    echo    "beta       snapshot=beta   (Not a feature yet)"
    echo    "release    snapshot=''     (Not a feature yet)"
    echo
}
#Functions
########################################################################
Commit() {
    git init
    git add -A
    git commit -m "$COMMIT_MSG"
    git push -f git@github.com:J3F31/npm-ms.git master

    bash npm version $NEW_VERSION
}
AskConfirm() {
    if [ "$COMMIT_MSG" == "" ]; then
        read -p "Please enter a commit description: " dsc
        COMMIT_MSG=$dsc
    fi
    while true; do
        read -p "Commit with description [$COMMIT_MSG] and version [$NEW_VERSION]? (y/n)" yn
        case $yn in
            y)
                Commit; break;;
            n)
                exit;;
            *)
                echo "Type y for Yes and n for No.";;
        esac
    done
}
Version() {
    IFS='.' read -ra arr <<< $VERSION
    a=$(( ${arr[0]} + $1 ))
    b=$(( ${arr[1]} + $2 ))
    c=$(( ${arr[2]} + $3 ))
    NEW_VERSION="$a.$b.$c"
    AskConfirm
}
#Main
########################################################################
case $1 in
    help)
        Help;;
    major)
        Version 1 0 0;;
    minor)
        Version 0 1 0;;
    patch)
        Version 0 0 1;;
    alpha)
        echo "Not a feature yet";;
    beta)
        echo "Not a feature yet";;
    release)
        echo "Not a feature yet";;
    *)
        echo "Not an option! Here is some help..."
        echo
        Help
esac
