import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import "./assets/styles.scss";

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://terraform.cloudiam.site:3002'
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

Vue.prototype.$axios = axios;
Vue.prototype.$store = store;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
