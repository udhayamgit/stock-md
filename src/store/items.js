import Vue from 'vue'
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
    item: null,
    isLoading: false,
    isEditMode: false
  },
  getters: {
    items(state) {
      return state.items
    },
    item(state) {
      return state.item
    },
    isLoading(state) {
      return state.isLoading
    },
    isEditMode(state) {
      return state.isEditMode
    }
  },
  mutations: {
    [types.SET_ITEMS](state,payload) {
      state.items = payload
    },
    [types.SET_ITEM](state, payload) {
      state.item = payload
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
    [types.REPLACE_ITEM](state, payload) {      
      var updateIndex = state.items.map(function(item) { return item.id; }).indexOf(payload.id);
      Vue.set(state.items, updateIndex, payload)
    },
    [types.SET_EDIT_MODE](state, payload) {
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
    [types.UPDATE_ITEM]({commit}, payload) {
      firebase.database().ref('items').child(payload.id).update({name: payload.name, quantity: payload.quantity, minimumQuantity: payload.minimumQuantity})
        .then(data => {
          commit(types.REPLACE_ITEM, payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    [types.ENABLE_EDIT_MODE]({commit}, payload) {
      firebase.database().ref('items').child(payload).once('value')
      	.then(data => {
          const item = data.val()
          item.id = payload
          commit(types.SET_ITEM, item)
          commit(types.SET_EDIT_MODE, true)
        })
        .catch(error => {
          console.log(error)
        })
    },
    [types.DISABLE_EDIT_MODE]({commit}) {
      commit(types.SET_EDIT_MODE, false)
    }
  }
}

