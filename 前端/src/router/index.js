import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/components/Login.vue";
import Fface from "@/components/Fface.vue";
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path: "/login",
    name:login,
    component: login
  },

  {
    path: "/iface",
    component: Fface
  },
]

const router = new VueRouter({
  routes
})

export default router
