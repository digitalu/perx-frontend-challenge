// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ElementUI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$googleApiKey = 'AIzaSyD0_aqpPFqQ7TWmyj9-q0cFZBhGULT8phU';

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
