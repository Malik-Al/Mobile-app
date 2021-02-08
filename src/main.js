import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueGeolocation)
Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
