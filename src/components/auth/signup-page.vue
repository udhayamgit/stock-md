<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Sign up</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <h2 class="secondary--text">Sign up</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4 v-if="hasSignupError">
        <v-alert type="error" :value="true" outline>
          {{ signupError.message }}
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
        <v-text-field name="passwordConfirm" 
                      label="Confirm Password" 
                      id="passwordConfirm" 
                      type="password" 
                      v-model="passwordConfirm" 
                      @blur="$v.passwordConfirm.$touch()" 
                      :error-messages="passwordConfirmErrors"
                      required></v-text-field>  
        <v-btn color="primary" @click="onSignin">Sign up</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'signup-page',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Email must be in a valid email format.')        
      !this.$v.email.required && errors.push('Email is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 positions.')
      !this.$v.password.required && errors.push('Password is required.')        
      return errors
    },
    passwordConfirmErrors() {
      const errors = []
      if (!this.$v.passwordConfirm.$dirty) return errors
      !this.$v.passwordConfirm.sameAs && errors.push('Password Confirmation must match password.')
      return errors
    },
    signupError() {
      return this.$store.getters.authError
    },
    hasSignupError() {
      return this.$store.getters.hasAuthError
    }

  },
  methods: {
    onSignin() {
      this.$v.$touch()
      if(!this.$v.$error) {
        console.log("signing in...")
        this.$store.dispatch("SIGNUP", {email: this.email, password: this.password})
      } else {
        console.log("Error")
      }
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6)      
    },
    passwordConfirm: {
      sameAs: sameAs('password')
    }
  },
  created() {
    this.email = ''
    this.password = ''
    this.passwordConfirm = ''
    this.$store.dispatch("RESET_SIGNUP")
  }
}
</script>

