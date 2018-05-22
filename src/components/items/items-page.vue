<template>
  <v-container>
    <v-layout class="hidden-xs-only">  
      <v-flex xs12 sm6 offset-sm3>
        <v-breadcrumbs>
          <v-breadcrumbs-item to="/" exact>Home</v-breadcrumbs-item>
          <v-breadcrumbs-item>Items</v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>    
    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 mb-2>
        <h2 class="secondary--text">Items</h2>
      </v-flex>
    </v-layout>

    <v-layout>  
      <v-flex xs12 sm6 offset-sm3 mb-2>    
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-text-field v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details></v-text-field>
        </v-layout>
      </v-flex>
    </v-layout>
     <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mb-2>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          :loading="isLoading"
          :search="search"
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.quantity }}</td>
          <td class="text-xs-right">{{ props.item.minimumQuantity }}</td>
          <td class="text-xs-right">
            <v-btn icon class="mx-0" @click="editItem(props.item.id)">
              <v-icon color="secondary">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
              <v-icon color="error">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

      </v-flex>
    </v-layout>
    
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>   
        <v-layout justify-end align-end>
          <v-btn fab dark color="primary" @click="showForm">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm-6 offset-sm3>
        <item-dialog :show="showDialog" @onHideForm="hideForm" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import itemDialog from '@/components/items/item-dialog'
import { FETCH_ITEMS } from '@/store/mutation-types'

export default {
  name: 'stock-page',
  components: {
    itemDialog
  },
  data() {
    return {
      search: '',
      showDialog: false,
      headers: [
          { text: 'Name', value: 'name' },
          { text: 'Quantity', value: 'quantity', sortable: false },
          { text: 'Minimum Quantity', value: 'minumumQuantity', sortable: false },
          { text: '', value: 'name', sortable: false } 
        ],
    }
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },

  methods: {
    showForm() {
      this.showDialog = true
    },
    hideForm() {
      this.showDialog = false
    },
    editItem(id) {
      console.log("EDIT " + id)
    },
    deleteItem(id) {
      console.log("DELETE " + id)
    }
  },
  created() {
    this.$store.dispatch(FETCH_ITEMS)
  },

}
</script>
