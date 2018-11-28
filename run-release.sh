#!/bin/bash

echo "==> building site"
npm run build

echo "==> deploying site"
git clone git@github.com:justkidding-config/justkidding-config.github.io.git deploy
cp -r dist/* deploy/
(cd deploy && git add . && git commit -m "publish site" && git push)
rm -rf deploy
