// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 解决移动端300毫秒点击延迟
import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
