# Input parameters

`jk` scripts can have input parameters supplied from the command line or
sourced from a file. This allows the user to run the same script with
different parameters, eg. to maintain two set of parameters for dev or prod
environments or to inject secrets from an environment variable.

Input parameters are typed, have default values and declared using
`@jkcfg/std/param` functions.

Let's define a Kubernetes Service taking two input parameters:

- The name of the service
- The port of the service

> For clarity, `param` is imported as a namespace rather than
> referring to the individual exports, below.

```js
import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

const params = {
  name: param.String('name', 'appname'),
  port: param.Number('port', 80),
};

const service = (params) => ({
  apiVersion: 'v1',
  kind: 'Service',
  metadata: {
    name: params.name,
  },
  spec: {
    selector: {
      app: params.name,
    },
    ports: [{
      protocol: 'TCP',
      port: params.port,
    }],
  },
});

write(service(params), `${params.name}-svc.yaml`);
```

Invoke the script with two input parameters:

```console
$ jk run -v -p name=mysuperservice -p port=8080 service.js
wrote mysuperservice-svc.yaml
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysuperservice
spec:
  ports:
  - port: 8080
    protocol: TCP
  selector:
    app: mysuperservice
```

## Sourcing parameters from a file

It's possible to store parameters in a JSON or YAML file instead of having to list them
all on the command line:

```yaml
name: mysuperservice
port: 8080
```

Then invoke jk with:

```console
$ jk run -v -f params.yaml service.js
wrote mysuperservice-svc.yaml
```

## The parameters object

Internally all parameters are stored in a single object with parameter
names being the object keys. It's possible to nest objects:

```yaml
service:
  name: mysuperservice
  port: 8080
```

To refer to a nested parameter, use the path that leads to it:

```js
  param.String('service.name', 'appname'),
```

`param.all()` will return the parameters object.

## Parameter merging

When giving multiple input parameter files (or on the command line), they are
merged in sequence into the parameters object. This allows splitting
parameters into a base set and specializations on top.

Let's define a `base.yaml` file:

```yaml
service:
  name: mysuperservice
  port: 8080
```

And a `port.yaml` file:

```yaml
service:
  port: 2222
```

Executing the following script:

```js
import { write } from '@jkcfg/std';
import * as param from '@jkcfg/std/param';

write(param.all());
```

With:

```console
$ jk run -f base.yaml -f port.yaml -p service.name=billing print-all-params.js
```

Outputs:

```json
{
  "service": {
    "name": "billing",
    "port": 2222
  }
}
```
