import { abi } from "./contracts/abi/token-bep20.abi.contract";
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
  async getAllowance(tokenAddr, spenderAddr, tokenDecimal) {
    let _contract = await this.initContract(tokenAddr);
    let _result = await _contract.methods.allowance(MyWeb3.getCurrentAddress(), spenderAddr).call();
    return parseInt(_result) / (10 ** tokenDecimal);
  },
  async getApproveData(tokenAddr, spenderAddr) {
    let amountApprovalLimit = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    let _contract = await this.initContract(tokenAddr);
    return {
      contract: _contract,
      userAddr: MyWeb3.getCurrentAddress(),
      spenderAddr: spenderAddr,
      approveAmount: amountApprovalLimit
    };
  },
  async approve(tokenAddr, spenderAddr) {
    let amountApprovalLimit = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
    let _contract = await this.initContract(tokenAddr);
    _contract.methods.approve(spenderAddr, amountApprovalLimit).send({ from: MyWeb3.getCurrentAddress() })
      .on('transactionHash', function(hash) {
          return hash;
      });
  }  
}
