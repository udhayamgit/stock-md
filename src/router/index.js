import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main-page'
import signin from '@/components/auth/signin-page'
import signup from '@/components/auth/signup-page'
import groceries from '@/components/stock/groceries-page'
import items from '@/components/stock/items-page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',          name: 'main',      component: main },
    { path: '/signin',    name: 'signIn',    component: signin },
    { path: '/signup',    name: 'signUp',    component: signup },
    { path: '/groceries', name: 'groceries', component: groceries },
    { path: '/items',     name: 'items',     component: items },    
  ]
})
