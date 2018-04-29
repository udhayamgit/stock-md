<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Sign in</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <h2 class="secondary--text">Sign in</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4 v-if="hasSigninError">
        <v-alert type="error" :value="true" outline>
          {{ signinError.message }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <v-text-field name="email" 
                      label="Email" 
                      id="email" 
                      v-model="email" 
                      @blur="$v.email.$touch()" 
                      :error-messages="emailErrors"
                      required></v-text-field>  
        <v-text-field name="password" 
                      label="Password" 
                      id="password" 
                      type="password" 
                      v-model="password" 
                      @blur="$v.password.$touch()" 
                      :error-messages="passwordErrors"
                      required></v-text-field>  
        <v-btn color="primary" @click="onSignin">Sign in</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { SIGNIN } from '@/store/mutation-types'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'signin-page',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    signinError() {
      return this.$store.getters.authError
    },
    hasSigninError() {
      return this.$store.getters.hasAuthError
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors 
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')        
      return errors
    },
  },
  methods: {
    onSignin() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.$store.dispatch(SIGNIN, {email: this.email, password: this.password})
      } else {
        console.log("Error")
      }
    }
  }
}
</script>

