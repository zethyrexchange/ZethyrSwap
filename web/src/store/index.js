import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import swap from './modules/swap'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		home,
		swap,
		user
	},
	getters
})

export default store
