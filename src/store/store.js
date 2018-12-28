import Vue from 'vue'
import Vuex from 'vuex'

import menu from './module/menu'
import users from './module/users'
import status from './module/status'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // modules:{
  //   menu,
  //   users,
  //   status
  // }
  state: {
    menuItems: {},
    currentUser: null,
    isLogin: false
  },
  getters: {
    getMenuItems(state) {
      return state.menuItems
    },
    currentUser(state) {
      return state.currentUser
    },
    isLogin(state) {
      return state.isLogin
    }
  },
  mutations: {
    setMenuItems(state, data) {
      state.menuItems = data
    },
    removeMenuItems(state, data) {
      state.menuItems.forEach((item, index) => {
        if (item == data) {
          state.menuItems.splice(index, 1)
        }
      });
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
        state.isLogin = true
      } else {
        state.currentUser = null
        state.isLogin = false
      }
    },
    pushToMenuItems(state, data) {
      state.menuItems.push(data)
    }
  },
  actions: {
    // 应用mutations
    setUser({
      commit
    }, user) {
      commit("userStatus", user)
    }
  }
})