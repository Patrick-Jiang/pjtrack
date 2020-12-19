import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import {tagListModel} from '@/models/tagListModel';

Vue.config.productionTip = false

Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
window.tagList = tagListModel.fetch()
window.createTag= (name: string) =>{
  const msg = tagListModel.create(name);
  if (msg === 'duplicated') {
    window.alert('Can not create duplicated tags');
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
