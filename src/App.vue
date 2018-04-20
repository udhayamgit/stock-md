<template>
  <v-app>
   
    <v-toolbar app dark class="primary">
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">Stock MD</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/items"><v-icon left>list</v-icon>Stock</v-btn>
        <v-btn flat to="/groceries"><v-icon left>playlist_add_check</v-icon>Shopping list</v-btn>
        <v-btn flat to="/signup"><v-icon left>face</v-icon>Sign up</v-btn>
        <v-btn flat to="/signin"><v-icon left>lock_open</v-icon>Sign in</v-btn>
        <v-btn flat><v-icon left>exit_to_app</v-icon>Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
