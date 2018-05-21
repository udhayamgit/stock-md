import * as firebase from 'firebase'
import * as types from './mutation-types'

function convertDataToItems(data) {
  const items = []
  for(let key in data) {
    items.push({
      id: key,
      name: data[key].name,
      quantity: data[key].quantity,
      minimumQuantity: data[key].minimumQuantity
    })
  }
  return items
}

function convertPayloadToItem(payload, userId) {
  let quantity = (!payload.quantity || payload.quantity === '') ? 0 : parseInt(payload.quantity)
  let minimumQuantity = (!payload.minimumQuantity || payload.minimumQuantity === '') ? 0 : parseInt(payload.minimumQuantity)
  const item = {userId: userId, name: payload.name, quantity: quantity, minimumQuantity: minimumQuantity}
  return item
}

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
    [types.CLEAR_ITEMS]({commit}) {
      commit(types.SET_ITEMS, [])
    },
    [types.FETCH_ITEMS]({commit}) {
      commit(types.SET_LOADING_STATE, true)

      const user = firebase.auth().currentUser

      firebase.database().ref('items').orderByChild('userId').equalTo(user.uid).once('value')
        .then((data) => {
          const items = convertDataToItems(data.val())
          commit(types.SET_ITEMS, items)
          commit(types.SET_LOADING_STATE, false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    [types.CREATE_ITEM]({commit}, payload) {
      const userId = firebase.auth().currentUser.uid
      const item = convertPayloadToItem(payload, userId)
      item.id = firebase.database().ref('items').push(item).key
      commit(types.ADD_ITEM, item)
    }
  }
}

