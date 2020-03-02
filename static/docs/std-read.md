# Reading files

`std.read()` reads a file. `read` returns a [Promise][promise] which resolves
into a Javascript value. For instance, when reading a YAML file, `read`
returns an object that can be used straight away.

Given the following `developers.yaml` file:

```yaml
- name: Alice
  github:
    admin: true
    handle: alice84
- name: Bob
  github:
    handle: bob93
```

We're going to write a script reading that file and displaying the list of
developers.

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

[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[service]: https://kubernetes.io/docs/concepts/services-networking/service/
