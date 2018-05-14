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
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Items</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        {{ items }}
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>        
        <v-btn fab dark color="primary" @click="showForm">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm-6 offset-sm3>
        <v-dialog v-model="showDialog" max-width="500px">
          <v-card>
            <v-card-title class="title grey--text text--darken-1">Add Item</v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md8 offset-md2>
                  <v-text-field
                    name="name"
                    label="Name"
                    id="name"
                    required
                    v-model="name"
                    @blur="$v.name.$touch()"
                    :error-messages="nameErrors"
                  ></v-text-field>
                  <v-text-field
                    name="quantity"
                    label="Quantity"
                    id="quantity"
                    v-model="quantity"
                    mask="#####"
                  ></v-text-field>
                  <v-text-field
                    name="minimumQuantity"
                    label="Minimum quantity"
                    id="minimumQuantity"
                    v-model="minimumQuantity"
                    mask="#####"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" flat @click.stop="hideForm">Cancel</v-btn>
              <v-btn color="primary" flat @click.stop="onCreateItem">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { FETCH_ITEMS, CREATE_ITEM  } from '@/store/mutation-types'

export default {
  name: 'stock-page',
  data() {
    return {
      showDialog: false,
      name: '',
      quantity: null,
      minimumQuantity: null
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors 
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    items() {
      return this.$store.getters.items
    }
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
    showForm() {
      this.showDialog = true
    },
    hideForm() {
      this.showDialog = false
      this.name = ''
      this.quantity = null
      this.minimumQuantity = null
      this.$v.$reset()
    },
    onCreateItem() {
      this.$v.$touch()
      if(!this.$v.$error) {
        this.$store.dispatch(CREATE_ITEM, {name: this.name, quantity: this.quantity, minimumQuantity: this.minimumQuantity})
        this.hideForm()
      }
    }
  },
  created() {
    this.$store.dispatch(FETCH_ITEMS)
  }

}
</script>
