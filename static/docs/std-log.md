# Logging

`std.log()` prints a value to stdout. For objects, it will print out their
JSON representation.

```javascript
import * as std from '@jkcfg/std';

std.log('Hello, World!');

const developer = { name: 'Alice', beverage: 'Club-Mate' };
std.log(developer);
```

```console
Hello, World!
{
  "beverage": "Club-Mate",
  "name": "Alice"
}
```
