<template>

    <div>
        <div class="uk-alert uk-alert-danger" v-if="error">{{ error }}</div>
        <div ref="container"></div>
    </div>

</template>

<script>

import UIkit from 'uikit';
import hljs from 'highlight.js';
import Clipboard from 'clipboard';

import { html, parse } from './util';

const { $, $$, ajax, attr, offset, on, Promise, startsWith } = UIkit.util;

export default {
  name: 'MarkdownPage',

  data: () => ({
    error: null,
    cache: {},
  }),

  mounted() {
    new Clipboard('a.js-copy', { text: trigger => $(attr(trigger, 'rel')).innerText })

      .on('success', () => {
        UIkit.notification({ message: 'Copied!', pos: 'bottom-right' });
      })
      .on('error', () => {
        UIkit.notification({ message: 'Copy failed!', status: 'danger', pos: 'bottom-right' });
      });

    on(this.$refs.container, 'click', '[href="#"]', e => e.preventDefault());

    on(document, 'click', 'a[href^="#"]:not([href="#"])', e => history.pushState({}, '', e.target.href));

    on(window, 'popstate', () => {
      setTimeout(() => {
        if (location.hash && $(location.hash)) {
          scrollTo(0, offset($(location.hash)).top - 100);
        }
      });
    });
  },

  watch: {

    $route: {

      handler() {
        const page = this.$route.params.page;

        this.error = null;

        this.$parent.page = page;

        new Promise((resolve, reject) => {
          if (this.cache[page]) {
            resolve(this.cache[page]);
            return;
          }

          ajax(`static/docs/${page}.md?{{BUILD}}`).then(({ response }) => {
            if (startsWith(response.trim(), '<!DOCTYPE html>')) {
              response = `<div class="uk-text-center">
                                                <h1>404</h1>
                                                <p class="uk-text-large">Page not found!</p>
                                            </div>`;
            }

            this.cache[page] = response;
            resolve(response);
          }, err => reject(err));
        }).then(
          (md) => {
            parse(md, (err, content) => {
              if (err) {
                this.page = null;
                this.error = err;
              } else {
                this.setPage(content);
              }
            });
          },
          () => { this.error = 'Failed loading page'; },
        );
      },

      immediate: true,
    },

  },

  methods: {

    setPage(page) {
      document.title = `${this.$parent.page.split('-').map(UIkit.util.ucfirst).join(' ')}`;

      html(this.$refs.container, page);

      this.$parent.ids = $$('> h2 a[href^="#"]', this.$refs.container).reduce((ids, el) => {
        ids[el.innerText] = attr(el, 'href').substr(1);
        return ids;
      }, {});

      // Scroll to the header specified in the URL:
      const hash = this.$route.params.href;
      if (hash && $(`#${hash}`)) {
        scrollTo(0, offset($(`#${hash}`)).top - 100);
      } else {
        scrollTo(0, 0);
      }

      setTimeout(() => $$('pre code', this.$refs.container).forEach(block => hljs.highlightBlock(block)));
    },

  },

};

</script>
