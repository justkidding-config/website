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
          <div class="uk-width-1-2">
            <h4 class="uk-card-title">Write JavaScript objects</h4>
          </div>
          <div class="uk-width-1-2">
            <h4 class="uk-card-title">Generate YAML</h4>
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
const nginxJS = `
import k from 'kubernetes.js';
import * as std from '@jkcfg/std';

const container = k.Container('nginx', 'nginx:1.15.4');
const deployment = k.Deployment('nginx', 3, [container]);

std.write(deployment, 'nginx.yaml');
`.trim();

const kubernetesJS = `
const Container = function(name, image) {
  return {
    name,
    image,
  }
};

const Deployment = function(name, replicas, containers) {
  return {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name,
      labels: {
  app: name,
      },
    },
    spec: {
      replicas,
      selector: {
  matchLabels: {
    app: name,
  },
      },
      template: {
  metadata: {
    labels: {
      app: name,
    },
  },
  containers,
      },
    },
  };
};

export default {
  Container,
  Deployment,
};
`.trim();

const nginxYAML = `
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    containers:
    - image: nginx:1.15.4
      name: nginx
    metadata:
      labels:
        app: nginx
`.trim();

const kubernetes = {
  input: [{
    name: 'nginx.js',
    lang: 'javascript',
    content: nginxJS,
  }, {
    name: 'kubernetes.js',
    lang: 'javascript',
    content: kubernetesJS,
  }],
  output: [{
    name: 'nginx.yaml',
    lang: 'YAML',
    content: nginxYAML,
  }],
};

export default {
  name: 'Home',
  data: () => ({
    kubernetes,
  }),
};
</script>
