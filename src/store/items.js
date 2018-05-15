import * as firebase from 'firebase'
import * as types from './mutation-types'

export default {
  state: {
    items: [],
    isLoading: false
  },
  getters: {
    items(state) {
      return state.items
    },
    isLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    [types.SET_ITEMS](state,payload) {
      state.items = payload
    },
    [types.ADD_ITEM](state, payload) {
      state.items.push(payload)
    },
    [types.SET_LOADING_STATE](state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    [types.FETCH_ITEMS]({commit}) {
      commit(types.SET_LOADING_STATE, true)
      firebase.database().ref('items').once('value')
        .then((data) => {
          const items = []
          const obj = data.val()
          for(let key in obj) {
            items.push({
              id: key,
              name: obj[key].name,
              quantity: obj[key].quantity,
              minimumQuantity: obj[key].minimumQuantity
            })
          }
          commit(types.SET_ITEMS, items)
          commit(types.SET_LOADING_STATE, false)
        })
        .catch((error) => {
          console.log(error)
        })
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

