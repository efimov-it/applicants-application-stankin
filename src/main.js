import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import App from './App.vue';
import data from './Data/';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(VueReCaptcha, {
  siteKey: '6Le2uOkUAAAAAMQ8LVOwFvHsg0xFOjRRE-G9xa0d',
  loaderOptions: {
    useRecaptchaNet: true
  }
});

new Vue({
  render: h => h(App),
  data () {
    return {
      data
    }
  }
}).$mount('#app')
