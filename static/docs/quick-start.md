# Quick start

<p class="uk-text-lead">jk is a data templating tool designed to help writing structured configuration.</p>

The core idea of `jk` is that configuration written as YAML or JSON files
looks just like a Javascript object. It seems a natural fit, then, to write
Javascript code that outputs such configuration files. This allows using a
real programming language to keep things [DRY][dry], abstract complexity away
and explore different ways of building configuration files.

This quick start tutorial should get you up and running in 5 minutes!

[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

---

## Installation

To install `jk`, download the [latest binary][latest] for your operating
system. For example, to install `jk` on MacOS, run:

```shell
curl -Lo jk https://github.com/jkcfg/jk/releases/download/%%latestVersion%%/jk-darwin-amd64
chmod +x jk
sudo mv jk /usr/local/bin/
```

Check `jk` is correctly installed with:

```console
$ jk version
version: %%latestVersion%%
```

We currently provide binary releases for MacOS X and Linux.

[latest]: https://github.com/jkcfg/jk/releases/latest

## A first configuration file

We are going to describe developers. They are simple creatures and don't have
many attributes: a name, a list of language they are comfortable with, a
preferred beverage and the number of monitors they use. With `jk` this looks
like:

```javascript
// Import jk standard library for the file writing function.
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
std.write(alice, `developers/${alice.name.toLowerCase()}.yaml`);
```

`jk` can then run this script to produce a configuration file.

```console
$ jk run -v alice.js
wrote developers/alice.yaml

$ cat developers/alice.yaml
beverage: Club-Mate
languages:
- python
- haskell
- c++
- 68k assembly
monitors: 2
name: Alice
```

A few things to note:

- The produced YAML file has its keys sorted. `jk` ensures deterministic
  output given the same input.
- The `developers` directory did not exist beforehand, `jk` creates
  directories when needed.
- We reused `alice.name` in the name of the file to write to disk using
  [template literals][template] as a way to show how we can keep things
  [DRY][dry]

[template]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

## A more realistic example

To make this tutorial more interesting, let's pretend we would like to
embrace configuration as code to manage membership to our Github organization
in an exciting startup.

One way to achieve this is to use [Terraform](https://www.terraform.io/) and
its [GitHub Provider][github-provider]. We can use `jk` to produce the [JSON
description][json] from the list of developers kept as code. Keep in mind
that other artifacts can be generated from the same description, for instance
Google Apps membership . This allows us to have a single place where we list
our developer accesses and generate all sorts of configuration from it.

[json]: https://www.terraform.io/docs/configuration/syntax.html#json-syntax
[github-provider]: https://www.terraform.io/docs/providers/github/index.html

Let's start with splitting the list of developers in a separate module,
`developer.js`:

```javascript
// Define two developers.
export const developers = [{
    name: 'Alice',
    github: {
        handle: 'alice84',
        admin: true,
    },
},{
    name: 'Bob',
    github: {
        handle: 'bob93',
    },
}];
```

We can can create the Terraform configuration from it:

```javascript
import * as std from '@jkcfg/std';
import { developers } from 'developers.js';

// Github organization
const organization = 'myorg';

const config = {
    provider: {
        github: {
            organization,
        },
    },
    github_membership: {},
};

// Describe membership as defined by the Github terraform provider.
const role = developer => developer.github.admin ? 'admin' : 'member';
const membershipId = developer => `${organization}_${developer.github.handle}`;

for (const dev of developers) {
    config.github_membership[membershipId(dev)] = {
        username: dev.github.handle,
        role: role(dev),
    };
}

std.write(config, 'terraform/github.json');
```

Running `jk` on this script gives:

```json
{
  "github_membership": {
    "myorg_alice84": {
      "role": "admin",
      "username": "alice84"
    },
    "myorg_bob93": {
      "role": "member",
      "username": "bob93"
    }
  },
  "provider": {
    "github": {
      "organization": "myorg"
    }
  }
}
```
