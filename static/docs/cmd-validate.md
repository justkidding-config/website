# Validating files

    jk validate [script] [file...]

This command runs a function to validate each file given in
arguments. The results from validation are logged to stderr.

## Validation functions

The function provided to `jk validate` is expected to accept one
argument, and return one of the following:

 - `true` (meaning valid) or `false` (invalid)
 - `'ok'` meaning valid, or any other string meaning invalid for the
   given reason
 - an object `{ msg, path?, start?, end? }` indicating an error at a
   particular location (`path`, `start` and `end` are optional)
 - an array of the above objects or strings, indicating several
   errors.

The `start` and `end` fields, when given, are `{ line, column }`
objects.

## Providing the validation function

The validation function can be supplied in several ways:

**Suppying the function in a file**

    jk validate ./valid.js *.yaml

will import the default export of the module in `./valid.js` and use
that as a validation function.

**Supplying the function in a module**

    jk validate -m @example/validation *.yaml

(using the flag `-m, --module`) will resolve the module named, and use
its default export as the validation function.

**Supplying the function on the command line**

    jk validate -c 'v => v.name == "correct"' names.json

(using the flag `-c, --exec`) will compile the function given and use
it as a validation function. The longhand function syntax will also
work:

    jk validate -c 'function(v) { return v.name == "correct"; }' names.json

## Input formats

`jk validate` will guess the format of a file based on its extension,
so you can validate files with different formats and treat them
uniformly:

    jk validate ./valid.js *.{yaml,json}

Files with `.json`, `.yaml` or `.yml` are assumed to contain zero or
more values, which are all validated individually.

## Using with libraries

Some libraries will include a module which has a validation function
as a default export, for convenience. For example,
`@jkcfg/kubernetes/validate` validates Kubernetes objects against
their respective schemas.

```bash
$ cat > dodgy-deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: twelvety
EOF
$ jk validate -m @jkcfg/kubernetes/validate ./dodgy-deployment.yaml
./dodgy-deployment.yaml: selector is required at spec
./dodgy-deployment.yaml: template is required at spec
./dodgy-deployment.yaml: Invalid type. Expected: integer, given: string at spec.replicas
```

(for `@jkcfg/kubernetes/validate` the `kind` and `apiVersion` fields
are needed to identify the schema to validate against).
