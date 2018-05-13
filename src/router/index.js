import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import home       from '@/components/home/home-page'
import signin     from '@/components/auth/signin-page'
import signup     from '@/components/auth/signup-page'
import authError  from '@/components/auth/auth-error-page'
import profile    from '@/components/auth/profile-page'
import groceries  from '@/components/stock/groceries-page'
import items      from '@/components/stock/items-page'
import about      from '@/components/about-page'
import contact    from '@/components/contact-page'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/',          name: 'home',      component: home },
    { path: '/signin',    name: 'signIn',    component: signin },
    { path: '/signup',    name: 'signUp',    component: signup },
    { path: '/auth-error',name: 'authError', component: authError},
    { path: '/profile',   name: 'profile',   component: profile,   meta: { requiresAuth: true } },
    { path: '/groceries', name: 'groceries', component: groceries, meta: { requiresAuth: true } },
    { path: '/items',     name: 'items',     component: items,     meta: { requiresAuth: true } },  
    { path: '/about',     name: 'about',     component: about },  
    { path: '/contact',   name: 'contact',   component: contact } 
  ]
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isUser) {
      next()
    } else {
      next({path: '/auth-error'})
    }
  } else {
    next()
  }
})

export default router