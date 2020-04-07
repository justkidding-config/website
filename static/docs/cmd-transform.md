# Transforming files

    jk transform [script] [file...]

This command transforms objects and writes them back to files. The
transforming function is supplied as the default export of a module,
and are expected to accept a single argument and return the
transformed object.

## Providing a transforming function

The transforming function can be supplied in several ways:

**Supplying the function in a file**

    jk transform ./transform.js *.yaml

will use the default export of the module in `./transform.js` to
transform objects.

**Supplying the transforming function in a module**

    jk transform -m @example/transform *.yaml

(using the flag `-m, --module`) will resolve the module and use its
default export as the transforming function.

**Supplying the function on the command line**

    jk transform -c 'v => Object.assign({}, v, { version: 1 })' *.yaml

(with the flag `-c, --exec`) will compile the function given and use
that as the transforming function. The longhand syntax for functions
will also work:

    jk transform -c 'function(v) { return Object.assign({}, v, { version: 1 }); }' *.yaml

## Input and output formats

`jk transform` will guess the format of a file based on its extension,
so you can load files of different formats:

    jk transform ./add-version *.yaml *.json

Files with `.json` or `yaml` (or `.yml`) are assumed to be streams,
that is files with zero or more values, with each value processed
individually.

For example,

```bash
$ cat > values.yaml <<EOF
foo: 23
---
foo: 5
EOF
$ jk transform -c '({ foo }) => ({ foo: foo * 2 })' values.yaml --stdout
foo: 46
---
foo: 10
```

This also works with JSON files; you can use a file with concatenated
JSON values, and each value will be transformed separately.

The output formats are _also_ guessed from the file extensions; so if
you have an input file `a.yaml`, it will be read as a YAML stream, and
written as a YAML stream.

At present, `jk` can't output results with different formats when the
flag `--stdout` (print to stdout) is used.

## Changing the output location

By default, `jk transform` reads the files named, and writes them to
the same paths relative to the output directory. Since the output
directory defaults to the current working directory, and `jk` will not
overwrite files unless you explicitly tell it, this will fail.

You can transplant the transformed files elsewhere with `-o,
--output-directory`, in which case it will write files with paths
relative to _that_ directory. For example,

    jk transform ./add-version.js *.yaml -o ./transformed/

Or, if overwriting files is OK, you can tell `jk` that is what you
want:

    jk transform ./add-version.js *.yaml --overwrite

Lastly, you can just write all the results to stdout. This will only
work if all the files have the same format -- `jk` won't mix formats.

    jk transform ./add-version.js *.yaml --stdout
