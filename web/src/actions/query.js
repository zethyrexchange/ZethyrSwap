/*
* Create by Falcon
* Date: 05/11/2019
*/
import makeRequest from './request'

const URL_BACKEND          = process.env.URL_BACKEND; 
const FULL_NODE            = process.env.FUll_NODE;
const get_dex_info = params => { return makeRequest( 'get', `${URL_BACKEND}/swap/api/dex/info`, params) };
const get_orders_history = params => { return makeRequest( 'get', `${URL_BACKEND}/swap/api/swap/history`, params) };
const get_transaction_info = params => { return makeRequest( 'get', `${FULL_NODE}/wallet/gettransactioninfobyid`, params) };


export default {
	get_dex_info,
	get_orders_history,
	get_transaction_info
}