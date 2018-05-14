import * as firebase from 'firebase'
import * as types from './mutation-types'

export default {
  state: {
    items: []
  },
  getters: {
    items(state) {
      return state.items
    }
  },
  mutations: {
    [types.SET_ITEMS](state,payload) {
      state.items = payload
    },
    [types.ADD_ITEM](state, payload) {
      state.items.push(payload)
    }
  },
  actions: {
    [types.FETCH_ITEMS]({commit}) {
      // LOAD all items
    },
    [types.CREATE_ITEM]({commit}, payload) {
      let quantity
      let minimumQuantity

      if(!payload.quantity || payload.quantity === '') {
        quantity = 0
      } else {
        quantity = parseInt(payload.quantity)
      }

      if(!payload.minimumQuantity || payload.minimumQuantity === '') {
        minimumQuantity = 0
      } else {
        minimumQuantity = parseInt(payload.minimumQuantity)
      }

      const userId = firebase.auth().currentUser.uid
      const item = {userId: userId,name: payload.name, quantity: quantity, minimumQuantity: minimumQuantity}

      firebase.database().ref('items').push(item)
        .then((data) => {
          console.log('Hurray')
          console.log(data)
        })
        .catch((error) => {
          console.log("Arh")
          console.log(error)
        })

    }
  }
}

