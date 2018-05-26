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
              <v-btn color="primary" flat @click="showPasswordChangeDialog">Change Password</v-btn>
            </v-card-actions>

          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm-6 offset-sm3>
       <password-reset-dialog :showDialog="passwordDialog" @hideDialog="hidePasswordChangeDialog"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import passwordResetDialog from '@/components/auth/password-reset-dialog'

export default {
  name: 'profile-page',

  components: {
    passwordResetDialog
  },

  data() {
    return {
      passwordDialog: false,
    }
  },

  computed: {
    user() {
      return this.$store.getters.user
    },
  },

  methods: {
    showPasswordChangeDialog() {
      this.passwordDialog = true
    },
    hidePasswordChangeDialog() {
      this.passwordDialog = false
    },
  }
}
</script>

