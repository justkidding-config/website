<template>
  <div>
    <ul uk-tab>
      <li v-for="file in files" :key="file.name">
        <a href="#"><span class="tm-lower">{{file.name}}</span></a>
      </li>
    </ul>
    <ul class="uk-switcher uk-margin">
      <li v-for="file in files" :key="file.name">
        <pre class="maxheight"
             v-highlightjs="file.content"><code v-bind:class="file.lang"></code></pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CodePanel',
  props: [
    'files',
  ],
};
</script>

<style scoped>
.maxheight {
  max-height: 30em;
}
</style>
