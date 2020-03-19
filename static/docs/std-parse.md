# parse and stringify

As well as reading and writing files, you can parse values from
strings, and stringify (unparse) values to strings. This is especially
handy if you need to embed a value in the field of an object, as with
Kubernetes' `ConfigMap` resources.

## parse

To parse a value, use

    parse(str, format)

where `format` is one of the `Format` values. For example,

```javascript
// parse.js
import { print, parse, Format } from '@jkcfg/std';

const obj = parse(`
foo:
- bar: 1
`, Format.YAML);
print(obj);
```

Running this,

```bash
$ jk run ./parse.js
{
  "foo": [
    {
      "bar": 1
    }
  ]
}
```

## stringify

To stringify a value (serialise it), use

    stringify(value, format)

where, again, `format` is a `Format` value. For example,

```javascript
// stringify.js
import { print, stringify, Format } from '@jkcfg/std';

const value = {
  foo: {
    bar: 1,
  },
};

print({ data: stringify(value, Format.YAML) });
```

Running this one,

```bash
$ jk run ./stringify.js
{
  "data": "foo:\n  bar: 1\n"
}
```
