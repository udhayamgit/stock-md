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
                    name="existing_password"
                    label="Existing password"
                    id="existing_password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    name="new_password"
                    label="New password"
                    id="new_password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    name="confirm_password"
                    label="Confirm new password"
                    id="confirm_password"
                    type="password"
                    required
                  ></v-text-field>
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
      existing_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  validations: {
    existing_password: {
      required,
    },
    new_password: {
      required,
      minLength: minLength(6)
    },
    confirm_password: {
      sameAs: sameAs('new_Password')
    }
  },
  methods: {
    requestPasswordChange() {
      this.passwordDialog = true
    },
    closePasswordDialog(){
      this.passwordDialog = false
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

