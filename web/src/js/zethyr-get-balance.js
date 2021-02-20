import { abi } from "./contracts/abi/zethyr-get-balance.abi.contract";
import MyWeb3 from "./MyWeb3";
import { delay } from "../utils/delay.util";
import { parseFloatNumber } from "../utils/convert.util";

export default {
  CONTRACT_ADDRESS: "0x75bCD1Ce79E838B65dF1998B62C5A968d2a02959",
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
  async getBNBBalance() {
    let self = this;
        try {
            let _contract = this.CONTRACT_CALL_DATA;
            if (!_contract) {
              _contract = await this.initContract();
            }
            let _result = await _contract.methods.getBNBBalance(MyWeb3.getCurrentAddress()).call();
            return parseFloatNumber(parseInt(_result) / 10 ** 18, 18);
      } catch(e) {
          await delay(1000);
          return self.getBNBBalance();
      }
   
  },
  async getBEP20Balance(tokenAddr, tokenDecimal) {
    let self = this;
    try {
        let _contract = this.CONTRACT_CALL_DATA;
        if (!_contract) {
          _contract = await this.initContract();
        }
        let _result = await _contract.methods.getBEP20Balance(tokenAddr, MyWeb3.getCurrentAddress()).call();
        return parseFloatNumber(parseInt(_result) / 10 ** tokenDecimal, tokenDecimal);
    } catch(e) {
        await delay(1000);
        return self.getBEP20Balance();
    }
    
  }
}
