# Module resolution

`jk` uses a few different strategies to resolve imports.

 - imports starting with `@jkcfg/std` are bundled with the
   runtime. (The `@jkcfg/std` package is also pushed to
   https://www.npmjs.com/package/@jkcfg/std, so that TypeScript
   definitions are available)

 - if the import path starts with a `./` or `../`, it is resolved
   _relative to the importing module_, according to the rules under
   "Path resolution rules", below.

 - any other path (i.e., not starting with `./` or `../`) shall be
   resolved according to the path resolution rules below, _relative to
   the directory containing the script_

 - if not yet resolved, a path shall be resolved according to Node.JS
   resolution (described below), _relative to the importing module_.

 - each image supplied with the flag `--lib` is checked according to
   the path resolution rules, _relative to `/jk/modules/` in the image
   filesystem_.

Otherwise, resolution will fail, (usually) printing a diagnostic
message including which paths were tried.

### Path resolution rules

For `<path>`:

 - if a file exists at `<path>`, resolve to the path; otherwise,
 - if a file exists at `<path>.mjs` or `<path>.js`, resolve to that;
   otherwise,
 - if a file exists at `<path>/index.mjs` or `<path>/index.js`,
   resolve to that path.

### Node.JS resolution

Node.JS resolution starts by resolving relative to `node_modules/` in
the importing module's directory. If resolution fails, it checks
`node_modules` in the parent directory, up to the directory containing
the original script.

For each `node_modules` directory:

 - if the file `<path>`, `<path>.mjs` or `<path>.js` exists, resolve
   to that file; otherwise,
 - if `<path>/package.json` exists, consult it for the field `module`
   and try to resolve that using file resolution rules above;
   otherwise,
 - if a file exists at `<path>/index.mjs` or `<path>/index.js`,
   resolve to that.
