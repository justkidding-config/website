# Filesystem

`jk` has high level function for accessing the file system.

## `dir`

`dir` will list files in directories:

```console
$ ls parameters/
base.yaml  port.yaml
```

```js
import * as std from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

std.log(fs.dir('parameters'));
```

`dir` returns the list of files in the directory given as parameter:

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
import * as std from '@jkcfg/std';
import * as fs from '@jkcfg/std/fs';

std.log(fs.info('parameters'));
```

```console
$ jk run stat.js
{
  "isdir": false,
  "name": "base.yaml",
  "path": "parameters/base.yaml"
}
```
