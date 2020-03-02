# Filesystem

`@jkcfg/std/fs` contains high level functions for accessing the file system.

## `dir`

`dir` will list files in a directory:

```console
$ ls parameters/
base.yaml  port.yaml
```

```js
import { log } from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

log(fs.dir('parameters'));
```

`dir` returns the list of files and directories in the directory at
the given path:

```console
$ jk run ls.js
{
  "files": [
    {
      "isdir": false,
      "name": "base.yaml",
      "path": "parameters/base.yaml"
    },
    {
      "isdir": false,
      "name": "port.yaml",
      "path": "parameters/port.yaml"
    }
  ],
  "name": "parameters",
  "path": "parameters"
}
```

## `info`

`info` returns information on a file:

```js
import { log } from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

log(fs.info('parameters'));
```

```console
$ jk run stat.js
{
  "isdir": false,
  "name": "base.yaml",
  "path": "parameters/base.yaml"
}
```

## `walk`

`walk` is a generator that descends through directories, starting at
the given path, and yields each file or directory (in pre-order).

```js
import { log } from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

for (const f of fs.walk('parameters')) {
    log(f.name);
}
```

You can supply `pre` (before descending into a directory) or `post`
(after leaving a directory) hooks. If your `pre` hook returns a falsey
value, the walk will not descend into the directory in question.

```js
import { log } from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

const notdotted = d => !d.name.startsWith('.');

for (const f of fs.walk('parameters', { pre: notdotted })) {
    log(f.name);
}
```

The `post` hook's return value is ignored -- the hook is only used for
side-effects.
