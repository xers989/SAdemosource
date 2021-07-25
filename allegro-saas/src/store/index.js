import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tenant: sessionStorage.getItem("tenant"),
    email: sessionStorage.getItem("email")
  },
  mutations: {
    signInState(state, data) {
        state.tenant = data.tenant;
        state.email = data.email;

        sessionStorage.setItem("tenant", data.tenant);
        sessionStorage.setItem("email", data.email);
    }
  }
})