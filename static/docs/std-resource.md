# Module resources

Usually, a `jk` script will operate on the files (and filesystem)
supplied by the user of the script. Occaionally, though, a module
needs to read files that come with the module.

For example, if your module validates against a set of schemas, and
those schemas are in files, you will ship the schema files along with
the module, and it will need to be able to read files relative to its
own location.

This is what the module `@jkcfg/std/resource` is for: it gives you a
`read`, `info` and `dir` that operate relative to the importing
module.

## Example of using @jkcfg/std/resource

In this example, there is a simple schema which a module uses to
validate inputs:

```yaml
# check/schema.yaml
properties:
  name: { type: string }
  version: { type: number }
required: [ name ]
```

This schema defines two properties, `name` and `version`, and says
that for a value to be valid it must include the `name` property.

The module will use this to provide a validation function:

```javascript
// check/validate.js
import { validateWithObject } from '@jkcfg/std/schema';
import { read } from '@jkcfg/std/resource';

export default function validate(value) {
  return read('schema.yaml').then(schema => validateWithObject(value, schema));
}
```

Now you can use that module to validate input files:

```bash
$ cat > val1.yaml <<EOF
name: foobar
EOF
$ cat > val2.yaml <<EOF
version: 3
EOF
$ jk validate ./check/validate val*.yaml
val1.yaml: ok
val2.yaml: name is required at (root)
```
