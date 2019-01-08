#!/bin/bash -e

if [ -z "$CI" ]; then

# Not on CI
git_url="git@github.com:justkidding-config/justkidding-config.github.io.git"

else

# CI
git_url="https://${GITHUB_TOKEN}@github.com/jkcfg/jkcfg.github.io.git"

echo "==> setting up git"
git config --global user.email "damien.lespiau+jkbot@gmail.com"
git config --global user.name "jkbot"

fi

echo "==> cloning site"
git clone $git_url deploy

echo "==> deploying site"
cp -r dist/* deploy/
(cd deploy && git add . && git commit -m "automatic site publication" && git push)
rm -rf deploy
