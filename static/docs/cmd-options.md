# Common options

These options are common to most `jk` commands.

## Input and output directories

The flag `-i, --input-directory` controls whence files are read. In
general, the path argument to `read()` will be resolved relative to
the input directory (and must be a relative path).

Files under the directory given can be read, but files _outside_ the
directory cannot. The same is true of the filesystem functions in
`@jkcfg/std/fs`.

The flag `-o, --output-directory` controls where file are written. The
path argument to `write` shall be resolved relative to the output
directory.

> **N.B.** most of the time, the input and output directories default
> to the current working directory. The exception is when the script
> being run was given as a file path (rather than e.g., a module), in
> which case the input directory is set to the directory containing
> the script. This exception is likely to be removed in a future
> release of `jk`.

## Parameters

The flag `-p, --parameter` is used to set a parameter, which can be accessed by a
script with the module `@jkcfg/std/param`. For example, this script:

```bash
$ jk run -c 'log(`Hello ${param.String("name", "there")}`)'
Hello there
$ jk run -c 'log(`Hello ${param.String("name", "there")}`)' -p name=world
Hello world
```

You can supply nested parameters to create an object (with string
values):

```bash
$ jk run -c 'log(param.Object("config"));' -p config.user=foo
{"user":"foo"}
```

The flag `-f, --parameters` loads parameters from a file:

```bash
$ cat > config.yaml <<EOF
config:
  user: foo
EOF
$ jk run -c 'log(param.Object("config"));' -f config.yaml
{"user":"foo"}
```

## Verbose

The flag `-v` makes `jk` log all reads and writes.

## Reporting dependencies

The flag `--emit-dependencies` makes `jk` log imports and reads in
JSON format, for use by other tooling. When this flag is supplied,
**writes are silently discarded** (but are logged if `-v` is also
used).
