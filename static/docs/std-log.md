# Printing and logging

## print

`std.print` writes a value to stdout, and can be given options to
control the format. In general, values will be pretty-printed.

```javascript
// print-demo.js
import { print, Format } from '@jkcfg/std';

print('Hello world!');

const developer = { name: 'Alice', beverage: 'Club-Mate' };
print('JSON:');
print(developer, { format: Format.JSON });
print('YAML:');
print(developer, { format: Format.YAML });
```

```console
$ jk run print-demo.js
Hello world!
JSON:
{
  "beverage": "Club-Mate",
  "name": "Alice"
}
YAML:
beverage: Club-Mate
name: Alice
```

## log

`std.log()` prints a value to stderr. For objects, it will print out
their JSON representation, on one line.

```javascript
// log-demo.js
import { log } from '@jkcfg/std';

log('Hello, World!');

const developer = { name: 'Alice', beverage: 'Club-Mate' };
log(developer);
```

```console
$ jk run log-demo.js
Hello, World!
{"name": "Alice","beverage": "Club-Mate"}
```
