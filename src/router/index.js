import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Record from '../views/Record.vue'
import User from '../views/User.vue'
import Hguser from '../views/Hguser.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/userList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
  {
    path: '/hguser',
    name: 'Hguser',
    component: Hguser
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
