import Vuex from "vuex";
import user from "./modules/user.js"
import * as article from "./modules/article.js"

const store = () => {
  return new Vuex.Store({
    modules: {
      user,
      article
    }
  });
}

export default store;
