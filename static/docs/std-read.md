# Reading files

`std.read()` reads a file. `read` returns a [Promise][promise] which
resolves into a Javascript value.

Given the following `developers.yaml` file:

```yaml
# developers.yaml
- name: Alice
  github:
    admin: true
    handle: alice84
- name: Bob
  github:
    handle: bob93
```

... we're going to write a script reading that file and displaying the
list of developers:

```js
import { read, log } from '@jkcfg/std';

read('developers.yaml').then(developers => {
  for (const dev of developers) {
    log(dev.name);
  }
});
```

Running it results in:

```console
Alice
Bob
```

## Formats

Usually the format of the file will be indicated by the extension
(e.g., `.yaml`). When it is not, or if you're reading from `stdin`,
you can use the option `format`:

```javascript
import { read, Format, log } from '@jkcfg/std';

read('.dotfile', { format: Format.JSON }).then(dotfile => {
  log(`version: ${dotfile.version}`);
});
```

## Reading from stdin

To read from `stdin` instead of a file, use the symbol `stdin`. For
example, this will read a YAML value from `stdin` and log the names:

```javascript
import { read, stdin, Format, log } from '@jkcfg/std';

read(stdin, { format: Format.YAML }).then(developers => {
  for (const dev of developers) {
    log(dev.name);
  }
});
```

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
