import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/app-router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import VueSwal from 'vue-swal'

Vue.use(VueSwal);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
