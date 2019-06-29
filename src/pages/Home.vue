<template>
  <div>
    <navbar></navbar>

    <div class="uk-section">
      <div class="uk-width-1-1 uk-text-center">
        <div class="uk-container">
          <img src="../assets/jk-200x200.png">
          <h2 class="uk-margin-medium-bottom">Configuration as <b>Code</b>.</h2>
          <div>
            <router-link class="uk-button uk-button-primary uk-margin-right"
               to="/documentation/quick-start">
              Get Started
            </router-link>
            <a href="https://github.com/jkcfg/jk/releases/latest" class="uk-button uk-button-default uk-margin-left uk-margin-right">
              <span class="tm-upper">Download</span>
              <canvas uk-icon="icon: download" width="20" height="20"></canvas>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="uk-section uk-section-muted">
      <div class="uk-align-center">

        <div class="uk-container">
        <!-- <div class="uk-grid uk-grid-match" uk-grid> -->
        <div class="uk-grid uk-grid-match" uk-grid>
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body">
                <h4 class="uk-card-title">Write code</h4>
                <p>Use the expressivity of <a
                href="http://www.ecma-international.org/publications/standards/Ecma-262.htm">
                ECMAScript</a>, the world's largest <a
                href="https://www.npmjs.com/">software ecosystem</a> and the
                speed of <a href="https://v8.dev/">v8</a> to build, organize
                and maintain configuration.</p>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body">
                <h4 class="uk-card-title">Generate configuration</h4>
                <p><code>jk</code> generates all your JSON, YAML and
                arbitrary text configuration files. With a little luck, you
                will not have to touch a YAML file again. Ever.</p>
            </div>
          </div>
        </div>
        </div>

    </div>
  </div>

    <div class="uk-section">

      <div class="uk-container">
      <div class="uk-width-1-1">
        <div class="uk-grid" uk-grid>

          <!-- Hello, World! -->
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body noshadow">
              <h4 class="uk-card-title">Write JavaScript objects</h4>
              </div>
            </div>
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body noshadow">
              <h4 class="uk-card-title">Generate YAML (or JSON, plain text, ...)</h4>
            </div>
          </div>

          <div class="uk-width-1-2">
            <codepane v-bind:files="alice.input" />
          </div>
          <div class="uk-width-1-2">
            <codepane v-bind:files="alice.output"/>
          </div>

          <!-- Kubernetes example -->
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body noshadow">
              <h4 class="uk-card-title">Write high-level microservice definitions</h4>
            </div>
          </div>
          <div class="uk-width-1-2">
            <div class="uk-card uk-card-default uk-card-body noshadow">
              <h4 class="uk-card-title">Generate their Kubernetes configuration</h4>
            </div>
          </div>

          <div class="uk-width-1-2">
            <codepane v-bind:files="kubernetes.input" />
          </div>
          <div class="uk-width-1-2">
            <codepane v-bind:files="kubernetes.output"/>
          </div>

        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const aliceJS = `
// Alice is a developer.
const alice = {
  name: 'Alice',
  beverage: 'Club-Mate',
  monitors: 2,
  languages: [
    'python',
    'haskell',
    'c++',
    '68k assembly', // Alice is cool like that!
  ],
};

// Instruct to write the alice object as a YAML file.
export default [
  { value: alice, file: \`developers/\${alice.name.toLowerCase()}.yaml\` },
];
`.trim();

const aliceYAML = `
beverage: Club-Mate
languages:
- python
- haskell
- c++
- 68k assembly
monitors: 2
name: Alice
`.trim();

const alice = {
  input: [{
    name: 'alice.js',
    lang: 'javascript',
    content: aliceJS,
  }],
  output: [{
    name: 'alice.yaml',
    lang: 'YAML',
    content: aliceYAML,
  }],
};

const billing = `
import { MicroService } from './micro-service';

const billing = {
  name: 'billing',
  description: 'Provides the /api/billing endpoints for frontend.',
  maintainer: 'damien@weave.works',
  namespace: 'billing',
  port: 80,
  image: 'quay.io/acmecorp/billing:master-fd986f62',
  ingress: {
    path: '/api/billing',
  },
  dashboards: [
    'service.RPS.HTTP',
  ],
  alerts: [
    'service.RPS.HTTP.HighErrorRate',
  ],
};

export default MicroService(billing);
`.trim();

const billingNS = `
apiVersion: v1
kind: Namespace
metadata:
  name: billing
`.trim();

const billingDep = `
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: billing
    maintainer: damien@weave.works
  name: billing
  namespace: billing
spec:
  revisionHistoryLimit: 2
  selector:
    matchLabels:
      app: billing
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: billing
        maintainer: damien@weave.works
    spec:
      containers:
      - image: quay.io/acmecorp/billing:master-fd986f62
        name: billing
        ports:
        - containerPort: 80
`.trim();

const billingSvc = `
apiVersion: v1
kind: Service
metadata:
  labels:
    app: billing
    maintainer: damien@weave.works
  name: billing
  namespace: billing
spec:
  ports:
  - port: 80
  selector:
    app: billing
`.trim();

const billingIngress = `
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
  labels:
    app: billing
    maintainer: damien@weave.works
  name: billing
  namespace: billing
spec:
  rules:
  - http:
      paths:
      - backend:
          serviceName: billing
          servicePort: 80
        path: /api/billing
`.trim();

const billingDashboards = `
apiVersion: v1
data:
  dashboard: '[{"annotations":{"list":[]},"editable":false,"gnetId":null,"graphTooltip":0,"hideControls":false,"id":null,"links":[],"panels":[{"aliasColors":{},"bars":false,"dashLength":10,"dashes":false,"dataSource":"$PROMETHEUS_DS","datasource":null,"fill":1,"gridPos":{"h":7,"w":12,"x":0,"y":0},"id":2,"legend":{"alignAsTable":false,"avg":false,"current":false,"max":false,"min":false,"rightSide":false,"show":true,"total":false,"values":false},"lines":true,"linewidth":1,"links":[],"nullPointMode":"null","percentage":false,"pointradius":5,"points":false,"renderer":"flot","repeat":null,"seriesOverrides":[],"spaceLength":10,"stack":false,"steppedLine":false,"targets":[{"expr":"sum
    by (code)(sum(irate(http_requests_total{job=''billing''}[2m])))","format":"time_series","intervalFactor":2,"legendFormat":"{{code}}","refId":"A"}],"thresholds":[],"title":"billing
    RPS","tooltip":{"shared":true,"sort":0,"value_type":"individual"},"type":"graph","xaxis":{"buckets":null,"mode":"time","name":null,"show":true},"yaxis":[{"format":"short","label":null,"logBase":1,"max":null,"min":null,"show":true},{"format":"short","label":null,"logBase":1,"max":null,"min":null,"show":true}]},{"aliasColors":{},"bars":false,"dashLength":10,"dashes":false,"dataSource":"$PROMETHEUS_DS","datasource":null,"fill":1,"gridPos":{"h":7,"w":12,"x":12,"y":0},"id":3,"legend":{"alignAsTable":false,"avg":false,"current":false,"max":false,"min":false,"rightSide":false,"show":true,"total":false,"values":false},"lines":true,"linewidth":1,"links":[],"nullPointMode":"null","percentage":false,"pointradius":5,"points":false,"renderer":"flot","repeat":null,"seriesOverrides":[],"spaceLength":10,"stack":false,"steppedLine":false,"targets":[{"expr":"histogram_quantile(0.99,
    sum(rate(http_request_duration_seconds_bucket{job=''billing''}[2m])) by (route)
    * 1e3","format":"time_series","intervalFactor":2,"legendFormat":"99th percentile","refId":"A"},{"expr":"histogram_quantile(0.50,
    sum(rate(http_request_duration_seconds_bucket{job=''billing''}[2m])) by (route)
    * 1e3","format":"time_series","intervalFactor":2,"legendFormat":"median","refId":"B"},{"expr":"sum(rate(http_request_total{job=''billing''}[2m]))
    / sum(rate(http_request_duration_seconds_count{job=''billing''}[2m])) * 1e3","format":"time_series","intervalFactor":2,"legendFormat":"mean","refId":"C"}],"thresholds":[],"title":"billing
    Latency","tooltip":{"shared":true,"sort":0,"value_type":"individual"},"type":"graph","xaxis":{"buckets":null,"mode":"time","name":null,"show":true},"yAxis":[{"format":"ms","label":null,"logBase":1,"max":null,"min":null,"show":true},{"format":"short","label":null,"logBase":1,"max":null,"min":null,"show":true}],"yaxis":[{"format":"short","label":null,"logBase":1,"max":null,"min":null,"show":true},{"format":"short","label":null,"logBase":1,"max":null,"min":null,"show":true}]}],"refresh":"","schemaVersion":16,"style":"dark","tags":[],"templating":{"list":[]},"time":{"from":"now-6h","to":"now"},"timepicker":{"refresh_intervals":["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"],"time_options":["5m","15m","1h","6h","12h","24h","2d","7d","30d"]},"timezone":"browser","title":"Service
    \u003e billing","uid":"","version":0}]'
kind: ConfigMap
metadata:
  labels:
    app: billing
    maintainer: damien@weave.works
  name: billing-dashboards
  namespace: billing
`.trim();

const billingPromRule = `
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  labels:
    app: billing
    maintainer: damien@weave.works
    prometheus: global
    role: alert-rules
  name: billing
spec:
  groups:
  - name: billing-alerts.rules
    rules:
    - alert: HighErrorRate
      annotations:
        description: More than 10% of requests to the billing service are failing
          with 5xx errors
        details: '{{$value | printf "%.1f"}}% errors for more than 5m'
        service: billing
      expr: |-
        rate(http_request_total{job=billing,code=~"5.."}[2m])
            / rate(http_request_duration_seconds_count{job=billing}[2m]) * 100 > 10
      for: 5m
      labels:
        severity: critical
`.trim();

const kubernetes = {
  input: [{
    name: 'billing.js',
    lang: 'javascript',
    content: billing,
  }],
  output: [{
    name: 'billing-deploy.yaml',
    lang: 'YAML',
    content: billingDep,
  }, {
    name: 'billing-svc.yaml',
    lang: 'YAML',
    content: billingSvc,
  }, {
    name: 'billing-ingress.yaml',
    lang: 'YAML',
    content: billingIngress,
  }, {
    name: 'billing-dashboards-cm.yaml',
    lang: 'YAML',
    content: billingDashboards,
  }, {
    name: 'billing-prometheus-rule.yaml',
    lang: 'YAML',
    content: billingPromRule,
  }, {
    name: 'billing-ns.yaml',
    lang: 'YAML',
    content: billingNS,
  }],
};

export default {
  name: 'Home',
  data: () => ({
    alice,
    kubernetes,
  }),
};
</script>

<style scoped>
.noshadow {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
