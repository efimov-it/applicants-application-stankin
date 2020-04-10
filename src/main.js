import Vue from 'vue';
import App from './App.vue';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/jquery/dist/jquery.min';
// import '../node_modules/popper.js/dist/popper.min';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
// import '../node_modules/bootstrap/dist/js/bootstrap.min';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
