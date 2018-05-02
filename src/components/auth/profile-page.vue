<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Profile</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    

    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>

        <v-layout row>
          <v-card flat width="100%">
            <v-card-title>
              <div class="title grey--text text--darken-1">User information</div>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6 class="subheader">
                  <v-icon left>email</v-icon> Email:
                </v-flex>
                <v-flex xs6 class="subheader">
                  {{ user.email}}
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="requestPasswordChange">Change Password</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm-6 offset-sm3>
        <v-dialog v-model="passwordDialog" max-width="500px">
          <v-card>
            <v-card-title class="title grey--text text--darken-1">Change Password</v-card-title>
            <v-card-text>
              <v-layout row>
                <v-flex xs12 md8 offset-md2>
                  <v-text-field
                    name="existingPassword"
                    label="Existing password"
                    id="existingPassword"
                    v-model="existingPassword"
                    @blur="$v.existingPassword.$touch()"
                    :error-messages="existingPasswordErrors"
                    type="password"
                    required></v-text-field>
                  <v-text-field
                    name="newPassword"
                    label="New password"
                    id="newPassword"
                    v-model="newPassword"
                    @blur="$v.newPassword.$touch()"
                    :error-messages="newPasswordErrors"
                    type="password"
                    required></v-text-field>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm new password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    @blur="$v.confirmPassword.$touch()"
                    :error-messages="confirmPasswordErrors"
                    type="password"
                    required></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" flat @click.stop="closePasswordDialog">Cancel</v-btn>
              <v-btn color="error" flat @click.stop="changePassword">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'profile-page',
  data() {
    return {
      passwordDialog: false,
      existingPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    existingPasswordErrors() {
      const errors = []
      if(!this.$v.existingPassword.$dirty) return errors
      !this.$v.existingPassword.required && errors.push('Password is required')
      return errors
    },
    newPasswordErrors() {
      const errors = [] 
      if(!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.required && errors.push('Password is required')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAs && errors.push('Password Confirmation must match password.')
      return errors
    },
  },
  validations: {
    existingPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('newPassword')
    },

  },
  methods: {
    requestPasswordChange() {
      this.passwordDialog = true
    },
    closePasswordDialog(){
      this.passwordDialog = false
      this.$v.$reset()
      this.existingPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    changePassword() {
      this.$v.$touch()
      if(!this.$v.$error) {
        console.log("Changing password")
      }
    }
  }
}
</script>

