const Swap = {
	state: {
		swapData :  {},
	},
	mutations: {
		SET_SWAP_DATA : ( state, swapData ) => state.swapData     = swapData,
	},
	actions: {
		setSwapData({ commit }, swapData) {
			commit('SET_SWAP_DATA', swapData);
		}
	}
}

export default Swap