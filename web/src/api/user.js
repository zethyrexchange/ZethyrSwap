import action from '../actions';

const getDexInfo = params => { return action("get_dex_info", params); };
const getOrdersHistory = params => { return action("get_orders_history", params); };

export default {
	getOrdersHistory,
	getDexInfo
}