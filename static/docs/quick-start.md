# Introduction

<p class="uk-text-lead">jk is a data templating tool designed to help writing structured configuration.</p>

The core idea of `jk` is that configuration written as YAML or JSON files
looks just like a Javascript object. It seems a natural fit, then, to write
Javascript code that outputs such configuration files. This allows using a
real programming language to keep things [DRY][dry], abstract complexity away
and explore different ways to build configuration objects.

This quick start tutorial should get you up and running in 5 minutes!

[dry]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

---

## Installation

To install `jk`, download the [latest binary][latest] for your operating
system. For example, to install `jk` on MacOS, run:

```console
$ curl -Lo jk https://github.com/jkcfg/jk/releases/download/0.2.0/jk-darwin-amd64
$ chmod +x jk
$ sudo mv jk /usr/local/bin/
$ jk version
version: 0.2.0
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
import std from 'std';

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

We are going to generate the [canonical Kubernetes deployment][k8s-nginx] example: an `nginx` deployment.

```javascript
// Import jk standard library for the file writing function.
import std from "std";

// Define a deployment object.
const deployment = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "nginx-deployment"
  },
  spec: {
    selector: {
      matchLabels: {
        app: "nginx"
      }
    },
    replicas: 2,
    template: {
      metadata: {
        labels: {
          app: "nginx"
        }
      },
      spec: {
        containers: [
          {
            name: "nginx",
            image: "nginx:1.7.9",
            ports: [
              {
                containerPort: 80
              }
            ]
          }
        ]
      }
    }
  }
};

// Write the deployment object as YAML.
std.write(deployment, "manifests/nginx-dep.yaml");
```

[k8s-nginx]: https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/#creating-and-exploring-an-nginx-deployment

In

## Why

If you [setup UIkit from Github source](installation.md#compile-from-github-source), you can also compile the RTL version of UIkit yourself. This will include any [custom UIkit theme](less.md) you have created in the `custom/` directory.

```sh
yarn
yarn compile-rtl
```

The resulting files are now located in the `dist/` folder and end with `*.rtl.css`. The JavaScript files stay the same as with the default LTR version.
