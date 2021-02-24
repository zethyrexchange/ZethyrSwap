import UserApi from '../../api/user.js';
// import MYTronWeb from "../../js/tron-web";
import SwapConfig from '../../../../config/swap.config';
import swapConfig from '../../../../config/swap.config';
import UtilArray from '../../utils/handleArray.js';
import cZSwapInfo from './../../js/zethyr-swap-info';

let isLoading = {};
let isFirstTimeLoading = {};
let pairOfSwapRunning;

const User = {
	state: {
		isLogined          : false,
		accountAddress     : '',
		userBalanceUsdt    : 0,

		userOpenOrders     : [],

		dexListByPair: {},

		userOrdersHistory    : [],
		userOrdersHistoryPage: 1,
		userOrdersHistoryTotalPage: 1,
		typeOfDexDefault: -1
	},
	mutations: {
		SET_USER_LOGIN_STATUS: ( state, isLogined ) => state.isLogined = isLogined,
		SET_USER_ACCOUNT_ADDRESS: ( state, accountAddress ) => state.accountAddress = accountAddress,
		SET_USER_BALANCE_USDT : ( state, userBalanceUsdt ) => state.userBalanceUsdt     = userBalanceUsdt,
		
		SET_USER_OPEN_ORDERS : (state, data) => state.userOpenOrders = data,
		SET_USER_ORDERS_HISTORY : (state, data) => state.userOrdersHistory = data,
		SET_USER_ORDERS_HISTORY_PAGE : (state, data) => state.userOrdersHistoryPage = data,
   		SET_USER_ORDERS_HISTORY_TOTAL_PAGE : (state, data) => state.userOrdersHistoryTotalPage = data,
   		
   		SET_DEX_LIST_BY_PAIR : (state, data) => state.dexListByPair = data,
   		SET_TYPE_OF_DEX_DEFAULT : (state, data) => state.typeOfDexDefault = data,
	},
	actions: {
		async initOrdersHistory({ commit }, { page, limit, pair }) {
	      	// let params = {
	       //  	page: page,
	       //  	limit: limit,
	       //  	userRequestAddr: MYTronWeb.getAccount()
	      	// };
	      	// if (typeof pair != 'undefined') {
	      	// 	params.pair = pair;
	      	// }
	      	// let transRes = await UserApi.getOrdersHistory(params);
	      	// if (transRes.code == 'SUCCESS') {
	       //  	User.actions.setUserOrdersHistory({ commit }, transRes.data.histories);
	       //  	User.actions.setUserOrdersHistoryPage({ commit }, transRes.data.currentPage);
	       //  	User.actions.setUserOrdersHistoryTotalPage({ commit }, transRes.data.numberPage);
	      	// }
	       
	    },
		async initDexInfo({ commit }, { amountIn,  pairOfSwap, path, inTokenDecimal, outTokenDecimal }) {
			
			amountIn = amountIn ? amountIn : 1;

			if (pairOfSwapRunning != pairOfSwap) {
				isFirstTimeLoading[pairOfSwap] = true;
				pairOfSwapRunning = pairOfSwap;
			}

			isLoading[pairOfSwap] = isLoading[pairOfSwap] ? isLoading[pairOfSwap] : false;
			if (isLoading[pairOfSwap] == true) {
				return true;
			}
			isLoading[pairOfSwap] = true;
			
			try {
				let data = await cZSwapInfo.getAmountsOut(amountIn, path, inTokenDecimal, outTokenDecimal);
				let swapDexListConfig         = SwapConfig.dexListConfig;
				let indexMin                  = 0;

				let dexListByPair = {};
				dexListByPair[pairOfSwap] = [];

				swapDexListConfig.forEach(function(item, index){
					let options               = {};
					let swapDexDetail         = data[index];

					options.sPrice            = swapDexDetail.price;
					options.reversePrice      = 1 / swapDexDetail.price;
					options.dexName           = item.dexName;
					options.dexLogo           = item.dexLogo;
					options.typeOfDex         = index;
					
					dexListByPair[pairOfSwap].push(options);
				});

				dexListByPair[pairOfSwap] = UtilArray.sortArray(dexListByPair[pairOfSwap], 'sPrice', false);
				// set type of dex default
				if (isFirstTimeLoading[pairOfSwap] == true) {
					let typeOfDexDefault = dexListByPair[pairOfSwap][0] ? dexListByPair[pairOfSwap][0].typeOfDex : 0;
					User.actions.setTypeOfDexDefault({ commit }, -1);
					User.actions.setTypeOfDexDefault({ commit }, typeOfDexDefault);
					isFirstTimeLoading[pairOfSwap] = false;
				}
				// set dex List
				User.actions.setDexListByPair({ commit }, dexListByPair);
				isLoading[pairOfSwap] = false;
			} catch(e) {
				isLoading[pairOfSwap] = false;
			}
		},  
		setUserLogin({ commit }, isLogined) {
			commit('SET_USER_LOGIN_STATUS', isLogined);
		},
		setUserAccountAddress({ commit }, accountAddress) {
			commit('SET_USER_ACCOUNT_ADDRESS', accountAddress);
		},
		setUserBalanceUsdt({ commit }, userBalanceUsdt) {
			commit('SET_USER_BALANCE_USDT', userBalanceUsdt);
		},
		setUserOpenOrders({ commit }, data) {
			commit('SET_USER_OPEN_ORDERS', data);
		},
		setDexListByPair({ commit }, data) {
			commit('SET_DEX_LIST_BY_PAIR', data);
		},
		setTypeOfDexDefault({ commit }, data) {
			commit('SET_TYPE_OF_DEX_DEFAULT', data);
		},
		setUserOrdersHistory({ commit }, data) {
	      commit('SET_USER_ORDERS_HISTORY', data);
	    },
	    setUserOrdersHistoryPage({ commit }, data) {
	      commit('SET_USER_ORDERS_HISTORY_PAGE', data);
	    }, 
	    setUserOrdersHistoryTotalPage({ commit }, data) {
	      commit('SET_USER_ORDERS_HISTORY_TOTAL_PAGE', data);
	    },
	}
}

export default User