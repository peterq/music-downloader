import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import VueRouter from 'vue-router'
import router from './routes'
Vue.use(VueRouter)
Vue.use(require('vue-resource'))
Vue.use(MintUI)
Vue.config.debug = true

/* eslint-disable no-new */
var app = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})

console.log('the app vue instance from main.js',app)
