import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import DashBoard from '@/components/DashBoard.vue'
import AddTrayecto from '@/components/AddTrayecto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
    {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/add',
    name: 'add',
    component: AddTrayecto

 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
