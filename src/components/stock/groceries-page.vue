<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Grocery list</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Grocery list</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'grocery-page'
}
</script>

