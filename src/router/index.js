import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/Home';
import About from '../views/About';
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})