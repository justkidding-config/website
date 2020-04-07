# Running a script

    jk run [flags] [script]

To run an arbitrary script, use `jk run`. This is the most general
command, since it does not presuppose any purpose or output of the
script given (unlike, e.g., `jk generate`).

Aside from the location of the script to run, the main options
changing the behaviour of the script are:

 - `-i, --input-directory`: any _reads_ done by the script or
   libraries are done relative to, and limited to, this directory or
   below;
 - `-o,--output-directory`: any _writes_ done by the script or
   libraries are done relative to this directory.

In general, the input directory and output directory default to the
current working directory. See [common
options](#/documentation/cmd-options) for more information.

There are a few different ways to supply the script:

**Running a file**

    jk run ./frob.js

will run the file `frob.js` in the current directory.

**Running a script from stdin**

    jk run -

will read from stdin, and when it's closed, execute what it
read. Using a heredoc makes it a bit more pleasant:

```sh
$ jk run - <<EOF
import { print } from '@jkcfg/std';
print('Hello world');
EOF
```

**Running a module**

    jk run -m @example/frob

(with the flag `-m, --module`) will run the module `@example/frob`,
provided it can find it on the [module search
path](#/documentation/module-resolution).

There is some overlap with running files, since file paths can often
be resolved as modules (e.g., `-m ./frob.js` will run the file
`frob.js` in the current directory). However there are some
differences to how they are treated:

 - files must be named exactly, whereas module resolution will try
   different paths based on the one given (see [module-resolution]);

 - if you refer to a module, the input directory (from where files
   will be read) remains the current working directory; if you run a
   file, the input directory is the directory in which the file
   lives. (This difference is likely to be removed in a future release
   of jk, though.)

**Running a script given in the command line**

    jk run -c 'log("Hello");'

(with the flag `-c, --exec`) runs a statement or statements as given
with the flag `-c`. The statements are run in a module with the
prelude,

```javascript
import { print, log, read, write, Format, Encoding } from '@jkcfg/std';
import { dir, info } from '@jkcfg/std/fs';
import * as param from '@jkcfg/std/param';
```

.. making those functions and values available; so you can for
example, read from stdin and print a result:

```javascript
jk run -c "read('', { format: Format.YAML }).then(print);"
```
