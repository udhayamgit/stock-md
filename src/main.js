import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

// Firebase
import * as firebase from 'firebase'

Vue.use(Vuetify, {
  theme: {
    secondary: colors.grey.darken2,
  }
})

// Validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */

import { AUTO_SIGNIN } from '@/store/mutation-types'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBiXdGeESLWjaeEy5JBWGOcpwDBfuwZj6o",
      authDomain: "stock-fmd.firebaseapp.com",
      databaseURL: "https://stock-fmd.firebaseio.com",
      projectId: "stock-fmd",
    }),
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        this.$store.dispatch(AUTO_SIGNIN, user)
      }
    })
  }
})
