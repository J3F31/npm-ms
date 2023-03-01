#!/bin/bash -h
########################################################################
#Variables
########################################################################
bold=$(tput bold)
normal=$(tput sgr0)
VERSION=$(node -p -e "require('./package.json').version")
COMMIT_MSG=""
#Help
########################################################################
Help()
{
   # Display Help
    echo "${bold}This is a script to push to git and update the package version.${normal}"
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
EditRepo() {
    git init
}
Version() {
    IFS='.' read -ra arr <<< $VERSION
    a=$(( ${arr[0]} + $1 ))
    b=$(( ${arr[1]} + $2 ))
    c=$(( ${arr[2]} + $3 ))
    NEW_VERSION="$a.$b.$c"
    bash npm version $NEW_VERSION
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
if $2 = "-m"; then
    echo $3
fi


# echo $1  

git init
git add -A
git commit -m 'New Version'
git push -f git@github.com:J3F31/IWP.git master:gh-pages

# VERSION=$(node -p -e "require('./package.json').version")
