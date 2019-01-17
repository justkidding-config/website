<template>
  <div class="uk-navbar-container tm-navbar-container"
       v-bind:uk-sticky="sticky ? 'media: 960' : false">
    <div class="uk-container uk-container-expand">
      <nav class="uk-navbar">

        <div class="uk-navbar-left">

          <router-link class="uk-navbar-item uk-logo" to="/">
            <img src="../assets/jk-64x64.png">
          </router-link>

        </div>

        <div class="uk-navbar-right">

          <ul class="uk-navbar-nav uk-visible@m">
            <router-link to="/documentation/quick-start" tag="li" v-bind:class="{ 'uk-active': active == 'documentation' }"><a>Documentation</a></router-link>
             <li><a href="https://github.com/jkcfg/jk" rel="noopener" target="_blank">Github</a></li>
          </ul>

          <div class="uk-navbar-item uk-visible@m">
            <router-link
             class="uk-button uk-button-default tm-button-default uk-icon"
             to="/download" activeClass="page-active">
              <span class="tm-upper">Download</span>
              <canvas uk-icon="icon: download" width="20" height="20"></canvas>
            </router-link>
          </div>

          <a class="uk-navbar-toggle uk-hidden@m"
             uk-navbar-toggle-icon href="#offcanvas"
             uk-toggle>
          </a>

        </div>

      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: [
    'sticky',
    'active',
  ],
};
</script>
