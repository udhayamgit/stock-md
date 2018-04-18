<template>
  <v-app>
   
    <v-toolbar app dark class="primary">
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">Meetup MD</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/signin"><v-icon left>lock_open</v-icon> Sign in</v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>
