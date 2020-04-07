# Generating files

    jk generate [flags] [script]

This command runs a script that defines a set of objects, and writes
those objects out, either in files or to stdout.

As with `run`, there is an input directory and an output directory. By
default, `jk generate` will write files to the output directory, so it
is worth being deliberate about where you set the output directory.

You can use the flag `--stdout` to write all the objects to stdout
instead (see below). This will report an error instead if the objects
are not all the same format.

## Protocol

A script run by `jk generate` is expected to have a default export of
_one_ of the following:

 - an array of items of the form

    `{ path, value, format? }`

   (format is optional; the format will be guessed from the path, if
   not given)

 - a promise that resolves to an array as above;
 - a function that returns either of the above, when called with no
   arguments.

`jk generate` serialises the `value` of each item in the array, to the
`path` given, in the format given or guessed from the path.

### Formats

The `format` field of an item explicitly sets the format it will be
serialised in, in case it is not guessable from the extension part of
the path. The supported formats are given by `Format` in the standard
library. Here's an example of a script that generates a JSON file
using a format:

```
import { Format } from '@jkcfg/std';

const config = {
    frobnicate: true,
};

export default [{ path: '.frob', value: config, format: Format.JSON }];
```

You can group a bunch of values together, and write them to a single
file with a stream format:

```javascript
export default [{
    path: 'values.yaml',
    value: [v1, v2, v3], // for some v1, v2, v3
    format: Format.YAMLStream,
}];
```

### Using Promises

If you are (say) reading a bunch of files in, transforming them, and
exporting the lot for use with `jk generate`, you can use
`Promise.all` to make a suitable value. For example,

```javascript
import { read } from '@jkcfg/std';
import { merge } from '@jkcfg/std/merge';

const files = ['deployment.yaml', 'service.yaml', 'ingress.yaml'];

function transform(val) {
    return merge(val, { metadata: { namespace: 'new-ns' } });
}

const values = files.map(async f => ({
    path: f,
    value: transform(await read(f)),
}));

export default Promise.all(values);
```

### Printing to stdout

If you use the flag `--stdout` with `jk generate`, it will print all
the values to stdout rather than to files. This is useful for
sanity-checking the output, as well as for piping to other programs.

    jk generate --stdout ./config.js | kubectl apply -f

One limitation is that all the items must be the same format, either
guessed or given.

### Using with libraries

Some libraries will provide shortcuts for creating exports suitable
for `jk generate`.

In `@jkcfg/kubernetes/generate`, there is a function
`valuesForGenerate` for creating generate-compatible values from
Kubernetes objects:

```javascript
import { core, apps } from '@jkcfg/kubernetes/api';
import { valuesForGenerate } from '@jkcfg/kubernetes/generate';

const d = new apps.v1.Deployment('foo-dep');
const s = new core.v1.Service('foo-srv');

export default valuesForGenerate([d, s]);
```
