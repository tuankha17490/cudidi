export const state = () => ({
  articleIntroduction: null,
  articleDescription: []
})

export const mutations = {
  setIntroArticle(state, values) {
    state.articleIntroduction = values
  },

  updateIntroArticle(state, values) {
    state.articleIntroduction.Duration = values
  },

  setContentDay(state, values) {
    state.articleDescription = values;
  },

  updateContentDay(state, values) {
    let newContent = true;

    state.articleDescription.forEach((item, index) => {
      if (item.Place == values.Place) {
        state.articleDescription[index].Description = values.Description;
        state.articleDescription[index].imageArticles = values.imageArticles;
        newContent = false
      }
    });
    if (newContent) {
      state.articleDescription.push(values);
    }
  },

  deleteContentDay(state, values) {
    if(!state.articleIntroduction.deletedDay) {
      state.articleIntroduction.deletedDay = []
    }
    state.articleIntroduction.deletedDay.push(values)
  },

  clearDataArticle(state) {
    state.articleIntroduction = null,
    state.articleDescription = []
  }
}

export const actions = {
  setIntroductionArticle({ commit }, values) {
    commit('setIntroArticle', values)
  },
  setContentArticle({commit}, values) {
    commit('setContentDay', values)
  },
  updateIntroArticle({ commit }, values) {
    commit('updateIntroArticle', values)
  },
  updateContentArticle({ commit }, values) {
    commit('updateContentDay', values)
  },
  deleteContentArticle({ commit }, values) {
    commit('deleteContentDay', values)
  },
  clearDataArticle({commit}) {
    commit('clearDataArticle')
  },


}

