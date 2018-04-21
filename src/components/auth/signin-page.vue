<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Sign in</v-breadcrumbs-item>
          <v-breadcrumbs-item>Items</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Sign in</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'signin-page'
}
</script>

