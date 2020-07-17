import Vue from 'vue'
import App from './App.vue'
import { rdfToLabel } from './filters/rdfToLabel';
import Buefy from 'buefy'
import * as markdown from 'markdown';

Vue.config.productionTip = false
Vue.filter('rdfToLabel', rdfToLabel)
Vue.filter('markdown', markdown.parse)
Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
