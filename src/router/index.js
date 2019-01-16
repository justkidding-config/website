import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Documentation from '@/pages/Documentation';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'uk-active',
  routes: [
    { path: '/', component: Home },
    { path: '/documentation/', redirect: '/documentation/quick-start' },
    { path: '/documentation/:page/', component: Documentation },
    { path: '/documentation/:page/:href/', component: Documentation },
  ],
});
