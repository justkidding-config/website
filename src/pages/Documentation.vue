<template>
  <div>
    <navbar sticky="true" active="documentation"></navbar>

    <div class="tm-sidebar-left uk-visible@m">
      <ul
        class="uk-nav uk-nav-default tm-nav"
        :class="{ 'uk-margin-top': index }"
        v-for="(pages, category, index) in navigation"
        v-bind:key="index"
      >
        <li class="uk-nav-header">{{category}}</li>
        <router-link tag="li" :to="`/documentation/${p}`" :key="p" v-for="(p, label) in pages">
          <a>{{label}}</a>
        </router-link>
      </ul>
    </div>

    <div class="tm-main uk-section uk-section-default">
      <div class="uk-container uk-container-small uk-position-relative">

        <markdownpage></markdownpage>

        <div class="tm-sidebar-right uk-visible@l">
          <div uk-sticky="offset: 160">
            <ul
              class="uk-nav uk-nav-default tm-nav uk-nav-parent-icon"
              uk-scrollspy-nav="closest: li; scroll: true; offset: 100"
            >
              <!--
              <router-link tag="li" :to="`${id}`" :key="id" v-for="(id, subject) in ids">
                <a>{{subject}}</a>
              </router-link>
              -->
              <li v-for="(id, subject) in ids" :key="id">
                <a :href="'#'+id">{{ subject }}</a>
              </li>
              <li class="uk-nav-divider"></li>
              <li v-if="component">
                <a :href="'../assets/uikit/tests/'+component+'.html'" target="_blank">
                  <span class="uk-margin-small-right" uk-icon="icon: push"></span>
                  <span class="uk-text-middle">Open test</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/jkcfg/jk/issues" target="_blank">
                  <span class="uk-margin-small-right" uk-icon="icon: warning"></span>
                  <span class="uk-text-middle">Report issue</span>
                </a>
              </li>
              <!--
              <li>
                <a
                  :href="'https://github.com/uikit/uikit-site/tree/develop/docs/pages/'+page+'.md'"
                  target="_blank"
                >
                  <span class="uk-margin-small-right" uk-icon="icon: pencil"></span>
                  <span class="uk-text-middle">Edit this page</span>
                </a>
              </li>
              -->
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="offcanvas" uk-offcanvas="mode: push; overlay: true">
      <div class="uk-offcanvas-bar">
        <div class="uk-panel">
          <ul class="uk-nav uk-nav-default tm-nav">
            <li class="uk-nav-header">General</li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>

          <ul
            class="uk-nav uk-nav-default tm-nav uk-margin-top"
            v-for="(pages, category, index) in navigation"
            v-bind:key="index"
          >
            <li class="uk-nav-header">{{category}}</li>
            <li v-for="(p, label, index) in pages" v-bind:key="index" exact>
              <a :href="`#/documentation/${p}`">{{label}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from './navigation.json';

export default {
  name: 'Documentation',
  data: () => ({
    navigation,
    ids: {},
    page: false,
    component: false,
  }),
};
</script>
