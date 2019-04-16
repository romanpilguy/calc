import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';
import store from './store/index'
import { sync } from 'vuex-router-sync'

import calculator from './components/calc.vue'
import quotes from './components/quotes.vue'

Vue.use(Router);
const router = new Router({
  routes : [
    {
      path : '/calculator',
      component  : calculator
    },
    {
      path : '/quotes',
      component : quotes
    }
  ]
})


if(localStorage.getItem('quotes') == null) localStorage.setItem('quotes',JSON.stringify([{id:0, body : ['USD','EUR']}]))
sync(store, router)
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
