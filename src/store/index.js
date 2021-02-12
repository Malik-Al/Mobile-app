import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: null
  },
  mutations: {
    save_id (state, id) {
      state.id = id
    }
  },
  actions: {
    save_id ({ commit }, id) {
      commit('save_id', id)
    }
  },
  getters: {
    id (state) {
      return state.id
    }
  },
  modules: {
  }
})
