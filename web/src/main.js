import Vue from 'vue'
import 'babel-polyfill'; // using async function
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n'
import Paginate from 'vuejs-paginate'
import VueSession from 'vue-session'
import MarqueeText from 'vue-marquee-text-component'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'
import VueCarousel from 'vue-carousel';
import Notifications from 'vue-notification'

import router from './routes';
import store from './store';

Vue.use(VueClipboard)
Vue.use(VueSession)
Vue.use(VueCookies)
Vue.use(VueI18n)
Vue.use(BootstrapVue)
Vue.use(VueCarousel);
Vue.use(Notifications)

Vue.component('marquee-text', MarqueeText)
Vue.component('paginate', Paginate)


const i18n = new VueI18n({
  locale: localStorage['lang'] || 'en', // 设置语言  default language is english
  messages: {
    'en': require('./common/lang/en'),
    'ru': require('./common/lang/ru'),
  }
})

new Vue({
  render: h => h(App),
  i18n,
  store,
  router
}).$mount('#app')
