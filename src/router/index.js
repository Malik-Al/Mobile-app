import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const token = true

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/camera',
        name: 'camera',
        meta: { layout: 'main' },
        component: () => import('../views/Camera.vue')
      },
      {
        path: '/calendar',
        name: 'calendar',
        meta: { layout: 'main' },
        component: () => import('../views/Сalendar.vue')
      }
    ],
    beforeEnter (to, from, next) {
      if (token) {
        next()
      } else {
        router.push({ name: 'login' })
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   // console.log(from.name !== 'login')
//   if (token) {
//     next()
//   } else {
//     router.push({ name: 'login' })
//   }
// })

export default router
