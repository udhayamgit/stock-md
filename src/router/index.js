import Vue from 'vue'
import Router from 'vue-router'

import home       from '@/components/home-page'
import signin     from '@/components/auth/signin-page'
import signup     from '@/components/auth/signup-page'
import groceries  from '@/components/stock/groceries-page'
import items      from '@/components/stock/items-page'
import about      from '@/components/about-page'
import contact    from '@/components/contact-page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',          name: 'home',      component: home },
    { path: '/signin',    name: 'signIn',    component: signin },
    { path: '/signup',    name: 'signUp',    component: signup },
    { path: '/groceries', name: 'groceries', component: groceries },
    { path: '/items',     name: 'items',     component: items },  
    { path: '/about',     name: 'about',     component: about },  
    { path: '/contact',   name: 'contact',   component: contact } 
      
  ]
})
