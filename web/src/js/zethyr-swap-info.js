import { abi } from "./contracts/abi/zethyr-swap-info.abi.contract";
import MyWeb3 from "./MyWeb3";
import { delay } from "../utils/delay.util";
import { parseFloatNumber } from "../utils/convert.util";

export default {
  CONTRACT_ADDRESS: "0x9D8769AB40A42ab04EaA1e031A070BdB6d4F8e42",
  CONTRACT_CALL_DATA: null,

  async initContract() {
    let _web3 = MyWeb3.getWeb3();
    let self = this;
    if (self.CONTRACT_CALL_DATA) {
      return self.CONTRACT_CALL_DATA;
    }    
    try {
      // let _contract = _web3.eth.contract(abi);

      self.CONTRACT_CALL_DATA = new _web3.eth.Contract(abi, self.CONTRACT_ADDRESS);
    } catch(e) {
      await delay(3000);
      return self.initContract();
    }
    return self.CONTRACT_CALL_DATA;
  },
  async getAmountsIn(amountOut, path, inTokenDecimal, outTokenDecimal) {
    let _contract = this.CONTRACT_CALL_DATA;
    if (!_contract) {
      _contract = await this.initContract();
    }
    let bigAmountOut = MyWeb3.toBN(amountOut, outTokenDecimal);
    let _result = await _contract.methods.getAmountsIn(bigAmountOut, path).call();
    let pancakeAmountIn = parseFloatNumber(parseInt(_result[0]) / 10 ** inTokenDecimal, inTokenDecimal);
    let bakeryAmountIn = parseFloatNumber(parseInt(_result[2]) / 10 ** inTokenDecimal, inTokenDecimal);

    let pancakePrice    = amountOut / pancakeAmountIn;
    let bakeryPrice    = amountOut / bakeryAmountIn;
    let data = {
      0: {
        amountIn: pancakeAmountIn,
        amountOut,
        price: pancakePrice
      }, // Pancake
      1: {
        amountIn: bakeryAmountIn,
        amountOut,
        price: bakeryPrice
      }  // Bakery
    }; 
    return data;
  },
  async getAmountsOut(amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance = 0.001) {
    let _contract = this.CONTRACT_CALL_DATA;
    if (!_contract) {
      _contract = await this.initContract();
    }
    let bigAmountIn = MyWeb3.toBN(amountIn, inTokenDecimal);
    let _result = await _contract.methods.getAmountsOut(bigAmountIn, path).call();
    let pancakeAmountOut = parseFloatNumber(parseInt(_result[1]) / 10 ** outTokenDecimal, outTokenDecimal);
    let bakeryAmountOut = parseFloatNumber(parseInt(_result[3]) / 10 ** outTokenDecimal, outTokenDecimal);

    pancakeAmountOut = pancakeAmountOut - pancakeAmountOut * slippageTolerance;
    bakeryAmountOut = bakeryAmountOut - bakeryAmountOut * slippageTolerance;

    let pancakePrice    = pancakeAmountOut / amountIn;
    let bakeryPrice     = bakeryAmountOut / amountIn;
    let data = {
      0: {
        amountIn,
        amountOut: pancakeAmountOut,
        price: pancakePrice
      }, // Pancake
      1: {
        amountIn,
        amountOut: bakeryAmountOut,
        price: bakeryPrice
      }  // Bakery
    }; 
    return data;
  }
}
