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
    isLoading: false,
    isEditMode: false
  },
  getters: {
    items(state) {
      return state.items
    },
    isLoading(state) {
      return state.isLoading
    },
    isEditMode(state) {
      console.log("Getting editmode: " + state.isEditMode)
      return state.isEditMode
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
    },
    [types.REMOVE_ITEM](state, payload) {
      var removeIndex = state.items.map(function(item) { return item.id; }).indexOf(payload);
      state.items.splice(removeIndex, 1);  
    },
    [types.SET_EDIT_MODE](state, payload) {
      console.log("Setting editmode: " + payload)
      state.isEditMode = payload
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
    },
    [types.DELETE_ITEM]({commit}, payload) {
      firebase.database().ref('items').child(payload).remove()
      commit(types.REMOVE_ITEM, payload)
    },
    [types.ENABLE_EDIT_MODE]({commit}, payload) {
      console.log("Enabling edit for " + payload)
      commit(types.SET_EDIT_MODE, true)
    },
    [types.DISABLE_EDIT_MODE]({commit}) {
      commit(types.SET_EDIT_MODE, false)
    }
  }
}

