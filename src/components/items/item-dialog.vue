<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title v-if="!isEditMode" class="title grey--text text--darken-1">Add Item</v-card-title>
      <v-card-title v-if="isEditMode" class="title grey--text text--darken-1">Edit Item</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md8 offset-md2>
            <form @keyup.enter="onProcessItem">
              <v-text-field name="name" 
                            label="Name"
                            id="name"
                            required
                            v-model="name"
                            @blur="$v.name.$touch()"
                            :error-messages="nameErrors"></v-text-field>
              <v-text-field name="quantity"
                            label="Quantity"
                            id="quantity"
                            v-model="quantity"
                            mask="#####"></v-text-field>
              <v-text-field name="minimumQuantity"
                            label="Minimum quantity"
                            id="minimumQuantity"
                            v-model="minimumQuantity"
                            mask="#####"></v-text-field>
            </form>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" flat @click.stop="hideForm">Cancel</v-btn>
        <v-btn v-if="!isEditMode" color="primary" flat @click.stop="onProcessItem">Add</v-btn>
        <v-btn v-if="isEditMode"  color="primary" flat @click.stop="onProcessItem">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { CREATE_ITEM, UPDATE_ITEM } from '@/store/mutation-types'

export default {
  name: 'item-dialog',

  props: {
    show: {
      type: Boolean,
      required: true
    },
  },

  data() {
    return {
      showDialog: this.show,
      id: '',
      name: '',
      quantity: null,
      minimumQuantity: null,
    }
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors 
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    isEditMode() {
      return this.$store.getters.isEditMode
    }
  },

  validations: {
    name: {
      required
    }
  },

  methods: {
    onProcessItem() {
      this.$v.$touch()
      if(!this.$v.$error) {
        if(this.isEditMode) {
          this.$store.dispatch(UPDATE_ITEM, {id: this.id, name: this.name, quantity: this.quantity, minimumQuantity: this.minimumQuantity})
        } else { 
          this.$store.dispatch(CREATE_ITEM, {name: this.name, quantity: this.quantity, minimumQuantity: this.minimumQuantity})
        }
        this.hideForm()
      }
    },
    hideForm() {
      this.id = ''
      this.name = ''
      this.quantity = null
      this.minimumQuantity = null
      this.showDialog = false
      this.$v.$reset()
    }
  },

  watch: {
    show(newVal) {
      this.showDialog = newVal
    },
    showDialog(newVal) {
      if(!newVal) {
        this.$emit('onHideForm')
      }
    },
    isEditMode(newVal) {
      if(newVal) {
        let item = this.$store.getters.item
        this.id = item.id
        this.name = item.name
        this.quantity = item.quantity
        this.minimumQuantity = item.minimumQuantity
      }
    }
  }

}
</script>
