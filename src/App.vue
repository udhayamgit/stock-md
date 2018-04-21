<template>
  <v-app>

    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-tile router to="/items">
          <v-list-tile-action><v-icon>list</v-icon></v-list-tile-action>
          <v-list-tile-content>Stock</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/groceries">
          <v-list-tile-action><v-icon>playlist_add_check</v-icon></v-list-tile-action>
          <v-list-tile-content>Shopping list</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router @click="signOut">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign out</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/signup">
          <v-list-tile-action><v-icon>face</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign up</v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/signin">
          <v-list-tile-action><v-icon>lock_open</v-icon></v-list-tile-action>
          <v-list-tile-content>Sign in</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
   
    <v-toolbar app dark class="primary" >
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">Stock MD</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/items"><v-icon left>list</v-icon>Stock</v-btn>
        <v-btn flat to="/groceries"><v-icon left>playlist_add_check</v-icon>Shopping list</v-btn>
        <v-btn flat to="/signup"><v-icon left>face</v-icon>Sign up</v-btn>
        <v-btn flat to="/signin"><v-icon left>lock_open</v-icon>Sign in</v-btn>
        <v-btn flat @click="signOut"><v-icon left>exit_to_app</v-icon>Sign out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>       
     </v-content>

    <v-footer height="auto" class="grey darken-3" app>  
      <v-layout row wrap justify-center>
        <v-flex xs12 text-xs-center>
          <v-btn dark flat to="/about">About</v-btn>
          <v-btn dark flat to="/contact">Contact</v-btn>
        </v-flex>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2018 — <strong>Stock MD</strong>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    signOut() {
      console.log("Signing Out")
      this.$router.push("/")
    }
  }
}
</script>
