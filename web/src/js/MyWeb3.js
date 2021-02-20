/*
* create by falcon
*/
const BigInt = require("big-integer");
const Web3 = require("web3");
const MyWeb3 = new Web3('https://bsc-dataseed1.binance.org:443');

export default {
    initWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            return true;
        }
        return false;
    },
    getWeb3() {
        return MyWeb3;
    },
    getCurrentAddress() {
        return window.ethereum.selectedAddress;
    },
    toBN(amount, tokenDecimal) {
        amount = amount * 10 ** tokenDecimal;
        amount = Math.round(amount);
        amount = BigInt(amount).toString();
        return amount;
    }
};