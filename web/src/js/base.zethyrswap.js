import { abi } from "./contracts/abi/zethyrswap.abi.contract";
import MyWeb3 from "./MyWeb3";
import { delay } from "../utils/delay.util";
import { parseFloatNumber } from "../utils/convert.util";

export default {
  
  CONTRACT: {},

  async initContract(contractAddr) {
    let self = this;
    let userAddr = MyWeb3.getCurrentAddress();
    self.CONTRACT[userAddr] = self.CONTRACT[userAddr] ? self.CONTRACT[userAddr] : {}; 
    self.CONTRACT[userAddr][contractAddr] = self.CONTRACT[userAddr][contractAddr] ? self.CONTRACT[userAddr][contractAddr] : null; 

    if (self.CONTRACT[userAddr][contractAddr]) {
      return self.CONTRACT[userAddr][contractAddr];
    }
    if (typeof(web3) === 'undefined') {
      await delay(100);
      return self.initContract(contractAddr);
    }    
    try {
      self.CONTRACT[userAddr][contractAddr] = new web3.eth.Contract(abi, contractAddr, { from: userAddr });
    } catch(e) {
      await delay(3000);
      return self.initContract();
    }
    return self.CONTRACT[userAddr][contractAddr];
  },
  async getDataOfswapExactBNBForTokens({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance }) {
    let self = this;
    let data = await cZSwapInfo.getAmountsOut(amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance);
    data = data[typeOfDex];
    let amountOutMin = data.amountOut;
    amountOutMin = MyWeb3.toBN(amountOutMin, outTokenDecimal);
    amountIn = MyWeb3.toBN(amountIn, inTokenDecimal);
    let _contract = await self.initContract(cZSwapAddr);
    let swapData = {
      contract: _contract,
      path: path,
      amountIn: amountIn,
      amountOutMin: amountOutMin,
      userAddr: MyWeb3.getCurrentAddress(),
    };
    return swapData;
  },
  async getDataOfswapExactTokensForTokens({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance }) {
    let self = this;
    let data = await cZSwapInfo.getAmountsOut(amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance);
    data = data[typeOfDex];
    let amountOutMin = data.amountOut;
    amountOutMin = MyWeb3.toBN(amountOutMin, outTokenDecimal);
    amountIn = MyWeb3.toBN(amountIn, inTokenDecimal);
    let _contract = await self.initContract(cZSwapAddr);
    let swapData = {
      contract: _contract,
      path: path,
      amountIn: amountIn,
      amountOutMin: amountOutMin,
      userAddr: MyWeb3.getCurrentAddress(),
    };
    return swapData;
  },
  async getDataOfswapExactTokensForBNB({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance }) {
    let self = this;
    let data = await cZSwapInfo.getAmountsOut(amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance);
    data = data[typeOfDex];
    let amountOutMin = data.amountOut;
    amountIn = MyWeb3.toBN(amountIn, inTokenDecimal);
    amountOutMin = MyWeb3.toBN(amountOutMin, outTokenDecimal);
    let _contract = await self.initContract(cZSwapAddr);
    let swapData = {
      contract: _contract,
      path: path,
      amountIn: amountIn,
      amountOutMin: amountOutMin,
      userAddr: MyWeb3.getCurrentAddress(),
    };
    return swapData;
  }
}
