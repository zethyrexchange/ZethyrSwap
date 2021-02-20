import action from '../actions';

const getTransactionInfo= params => { return action("get_transaction_info", params); };

export default {
	getTransactionInfo
}