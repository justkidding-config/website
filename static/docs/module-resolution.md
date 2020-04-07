# Module resolution

`jk` uses a few different strategies to resolve imports. This gives
you some choices for how you can arrange for dependencies to be
available to a script.

When you are writing a module, you can import files relative to your
module using a path starting with `./` or `../`. You don't need to
include the extension if it's `.js` or `mjs`.

E.g., if `foo.js` and `bar.js` are in the same directory, `foo.js` can
import `bar.js` with

    import * as bar from './bar';

You can refer to `index.js` or `index.mjs` by naming the directory
containing it. For example, if you had a module in `baz/index.js` then
you could import it with

    import * as baz from './baz';

## How to package modules

When you want to distribute your set of modules, you have a few
options (pick one or more):

**You can just stick them in a tarball or zip and distribute that**,
to be expanded alongside a script that uses it. It'll be resolved
according to the path resolution rules (described below).

**You can make a
[package.json](https://docs.npmjs.com/creating-a-package-json-file)
and include all the dependencies in it**. `jk` will resolve modules in
a `node_modules` directory (also see below). If you publish your
package, then people installing it with `npm install` will get its
dependencies too.

**You can copy the files into a container image**. `jk` will download
images mentioned with the flag `--lib`, and look in their filesystems
(under `/jk/modules/`) when resolving imports.

## Resolution algorithm

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
