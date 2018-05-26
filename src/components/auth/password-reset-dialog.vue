<template>
  <div>
    <v-snackbar :top="true" color="success" v-model="confirmPasswordChange">
      Password has been successfully changed.
      <v-btn dark flat @click.native="hidePasswordChangeConfirmation">Close</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="title grey--text text--darken-1">Change Password</v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 v-if="hasAuthError">
              <v-alert type="error" :value="true" outline>
                {{ authError.message }}
              </v-alert>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md8 offset-md2>
              <form keyup.enter="changePassword">
                <v-text-field name="existingPassword"
                              label="Existing password"
                              id="existingPassword"
                              v-model="existingPassword"
                              @blur="$v.existingPassword.$touch()"
                              :error-messages="existingPasswordErrors"
                              type="password"
                              required></v-text-field>
                <v-text-field name="newPassword"
                              label="New password"
                              id="newPassword"
                              v-model="newPassword"
                              @blur="$v.newPassword.$touch()"
                              :error-messages="newPasswordErrors"
                              type="password"
                              required></v-text-field>
                <v-text-field name="confirmPassword"
                              label="Confirm new password"
                              id="confirmPassword"
                              v-model="confirmPassword"
                              @blur="$v.confirmPassword.$touch()"
                              :error-messages="confirmPasswordErrors"
                              type="password"
                              required></v-text-field>
              </form>
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
  </div>
</template>

<script>
import { CHANGE_PASSWORD, RESET_AUTH_ERROR } from '@/store/mutation-types'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import notEqual from '@/validators/notEqual'

export default {
  name: 'password-reset-dialog',
  
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      passwordDialog: false,
      confirmPasswordChange: false,
      existingPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
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
      !this.$v.newPassword.notEqual && errors.push('New password cannot be the same as the old password.')
      !this.$v.newPassword.minLength && errors.push('Password must be at least 6 positions.')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAs && errors.push('Password Confirmation must match password.')
      return errors
    },
    authError() {
      return this.$store.getters.authError
    },
    hasAuthError() {
      return this.$store.getters.hasAuthError
    }
  },

  methods: {
    closePasswordDialog(){
      this.$emit('hideDialog')
      this.$v.$reset()
      this.existingPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.$store.dispatch(RESET_AUTH_ERROR)
    },
    changePassword() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.$store.dispatch(CHANGE_PASSWORD, {existingPassword: this.existingPassword, newPassword: this.newPassword})
          .then(() => {
            this.confirmPasswordChange = true
            this.closePasswordDialog()
          })
      }
    },
    hidePasswordChangeConfirmation() {
      this.confirmPasswordChange = false
    }
  },

  validations: {
    existingPassword: {
      required
    },
    newPassword: {
      required,
      notEqual: notEqual('existingPassword'),
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('newPassword')
    },
  },

  watch: {
    showDialog(newVal) {
      this.dialog = newVal
    },
    dialog(newVal) {
      if(!newVal) {
        this.$emit('hideDialog')
      }
    }
  }

}
</script>