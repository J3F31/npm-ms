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
    echo "${bold}How to use version.sh${normal}"
    echo
    echo "${italic}npm run version [option] {message}${normal}"
    echo
    echo "${bold}Version:${normal}"
    echo    "current    $VERSION"
    echo    "syntax     a.b.c"
    echo
    echo "${bold}Options:${normal}"
    echo    "major      a++             "
    echo    "minor      b++             "
    echo    "patch      c++             "
    echo
}
#Functions
########################################################################
Commit() {
    git init
    bash npm version $NEW_VERSION -m "$COMMIT_MSG"

    Summary
}
Summary() {
    echo "<details>" >> version.md
    echo "<summary style='font-size: 30px; font-weight: bold;'> v$NEW_VERSION </summary>" >> version.md
    echo >> version.md

    for commit_hash in $(git log v$VERSION..HEAD --reverse --format=%H); do
        commit_title=$(git log -n 1 --format=%s $commit_hash)
        commit_description=$(git log -n 1 --format=%b $commit_hash)
        echo "$commit_title <br>" >> version.md
        if [ "$commit_description" != "" ]; then
            echo "> $commit_description" >> version.md
            echo >> version.md
        fi
    done

    echo "</details>" >> version.md

    git add version.md
    git commit -m "Updated version summary"
    git push origin

    echo "Versioning completed!"
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
                Commit;
                break;;
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
#Inputs
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
esac
