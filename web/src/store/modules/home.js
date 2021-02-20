const Home = {
  state: {
    homeTest: ''
  },
  mutations: {
    SET_HOME_TEST: ( state, homeTest ) => state.homeTest     = homeTest
  },
  actions: {
 
    setHomeTest({ commit }, homeTest) {
      commit('SET_HOME_TEST', homeTest);
    }
  }
}

export default Home
