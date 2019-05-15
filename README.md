# website

> jk — Configuration as **Code**.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How examples are embeded in the docs

Examples live in https://github.com/jkcfg/jk/tree/master/examples.

We expect a checkout of (or a link to) `jk` in `static/docs/jk` and we use
[`embedmd`](https://github.com/campoy/embedmd) to do the md -> md rewrite:

```console
embedmd -w static/docs/*.md
```
