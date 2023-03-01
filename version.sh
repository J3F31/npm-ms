set e-

--msg=''



git init
git add -A
git commit -m 'New Version'
git push -f git@github.com:J3F31/IWP.git master:gh-pages

# PACKAGE_VERSION=bash npm pkg get version
VERSION=$(node -p -e "require('./package.json').version")
IFS='.' read -ra arr <<< $VERSION

for i in "${arr[@]}"
do
    echo $i
done

major() {
    echo 'test'
}