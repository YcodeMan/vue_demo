import Vue from 'vue'
import App from './App.vue'
import toastr from 'toastr'
import MuseUI  from 'muse-ui'
import Vodal from 'vodal'
import router from './router'
import 'toastr/build/toastr.min.css'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'



Vue.use(MuseUI)
Vue.prototype.$axios = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name,Vodal)

Vue.config.productionTip = false


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
