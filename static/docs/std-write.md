# Writing files

`std.write()` writes a value to a file. This is the main way of writing
configuration to disk. In the example below, we are writing a Javascript
object as a YAML file.

```javascript
import * as std from '@jkcfg/std';

// Define a developer.
const alice = {
  name: 'Alice',
  beverage: 'Club-Mate',
  monitors: 2,
  languages: [
    'python',
    'haskell',
    'c++',
    '68k assembly', // Alice is cool like that!
  ]
};

// Write the developer description as YAML.
std.write(alice, `developers/alice.yaml`);
```

Once run, this script creates the `developers/alice.yaml` file:

```yaml
beverage: Club-Mate
languages:
- python
- haskell
- c++
- 68k assembly
monitors: 2
name: Alice
```

## Format

`std.write()` will deduce the file format from its extension. However there
are times when we'd like to use a custom file name or even no extension at
all!

The `format` option specifies the desired format and takes precedence over
the file extension.

```javascript
const eslintrc = {
  extends: 'airbnb-base',
  rules: {
    'import/no-unresolved': [ 2, { ignore: [ '^std$' ] } ],
  },
};

std.write(eslintrc, '.eslintrc', { format: std.Format.JSON });
```

```json
{
  "extends": "airbnb-base",
  "rules": {
    "import/no-unresolved": [
      2,
      {
        "ignore": [
          "^std$"
        ]
      }
    ]
  }
}
```

By default, `std.write()` will write Javascript objects as JSON so, in the
case above, the `format` override is actually redundant. Being explicit about
it has its merits, however.

## Indentation

To specify the desired indentation, use the `indent` option. For example, to
use four spaces indentation:

```javascript
const eslintrc = {
  extends: 'airbnb-base',
};

std.write(eslintrc, '.eslintrc', { format: std.Format.JSON, indent: 4 });
```

```json
{
    "extends": "airbnb-base"
}
```

## File overwriting

On occasions, you may not want to write a file if it already exists on disk.
The `overwrite` option controls this behavior. By default, `std.write()` will
write over files, but not when `overwrite: false` is specified:

```javascript
std.write(eslintrc, '.eslintrc', { overwrite: false });
```
