const state = () => ({
  authUser: null,
  isLoggedIn: null
})

const mutations = {
  SET_USER(state, user) {
    state.authUser = user;
    if (user != null)
      state.isLoggedIn = true
    else
      state.isLoggedIn = null
  },
}

const actions = {
  async nuxtServerInit({ commit }) {
    let token = null
    token = this.$cookies.get('token')
    if(token) {
      const { data } = await this.$axios.get('user/me', {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      if(data.status == 200) {
        commit('SET_USER', data.data)
      }
    }
  },

  async logout({ commit }) {
    try {
      let token = this.$cookies.get('token')
      await this.$axios.get('/user/logout', {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      commit('SET_USER', null)
    } catch (error) {
      console.log(error)
    }
  },

  async update({ commit }) {
    let token = null
    token = this.$cookies.get('token')
    if(token) {
      const { data } = await this.$axios.get('user/me', {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      console.log('Store ---->',data);
      if(data.status == 200) {
        commit('SET_USER', data.data)
      }
    }
  }
}

export default {
  state,
  mutations,
  actions
}
