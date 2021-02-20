<template>
  <div class="swap-ztr padding-home home-block">
      <b-container>
         <b-row class="row-exchange">
            <b-col lg="7" md="12" class="mb-3 row-col-exchange">
               <div class="swap-introduction" v-html="$t('message.swap.introduction')" ></div>
               <div class="logo">
               <div class="logo-1">
                  <img src="../../assets/images/logo-swap-1.png">
               </div>
               <div class="logo-2">
                  <img src="../../assets/images/logo-swap-2.png">
               </div>
               </div>
            </b-col>
            <b-col lg="5" md="12" class="mb-3 swap-area row-col-exchange">
               <div class="title">
                  <ul class="nav">
                     <li class="nav-item active">
                        <a class="nav-link active" href="#" @click.prevent.self><h4 class="title-swap">Swap</h4></a>
                     </li>
                  </ul>
                  <span class="balance">
                     <a class="nav-link" href="#" @click="fillUserBalanceUsdt(roundDownNumber(userBalanceUsdt) , $event)">Balance : {{ roundDownNumber(userBalanceUsdt)}} USDT</a>
                  </span>
               </div>
               <div class="content-swap">
               <form>
                  <div class="number clearfix">
                     <div class="form-group number-spen clearfix">
                        <label for="exampleFormControlSelect1" v-if="textMessageErrSwapAmount == ''">{{$t('message.swap.youSend')}}</label>
                        <span class="error" v-else>{{textMessageErrSwapAmount}}</span>
                        <input type="number" step="0.01" min="0.01" name="swapAmount" class="form-control" id="exampleFormControlInput1" v-model="quantityTetherTRC20" placeholder="0">
                     </div>
                     <div class="form-group name-money">
                        <label for="exampleFormControlInput1">Tether TRC20</label>
                        <select class="form-control" id="exampleFormControlSelect1" v-model="tokenSwapFrom">
                           <option value="USDT-TRC20" :selected="true" >USDT-TRC20</option>
                        </select>
                     </div>
						</div>
						<p class="fee">{{$t('message.swap.swapFee')}} : {{swapData._feeOfSwap}} USDT
                  <div class="number clearfix">
                     <div class="form-group number-spen clearfix">
                        <label for="exampleFormControlSelect1">{{$t('message.swap.youGet')}}</label>
                        <input type="text" class="form-control" id="exampleFormControlInput2" v-model="quantityTetherERC20" disabled>
                     </div>
                     <div class="form-group name-money">
                        <label for="exampleFormControlInput2">Tether ERC20</label>
                        <select class="form-control" id="exampleFormControlSelect1" v-model="tokenSwapTo">
                           <option value="USDT-ERC20"  :selected="true">USDT-ERC20</option>
                        </select>
                     </div>
                  </div>
                  <div class="number clearfix" style="margin:20px 0;">
                     <div class="form-group number-address clearfix">
                        <label for="exampleFormControlSelect1" v-if="textMessageErrethereumReceiptAdrr ==''">{{$t('message.swap.yourEthereumWallet')}}</label>
                        <span class="error" v-else>{{textMessageErrethereumReceiptAdrr}}</span>
                        <input type="text" class="form-control" id="exampleFormControlInput3" v-model="ethereumReceiptAdrr" placeholder="0x0000000000000000000000000000000000000000" @change="validateEthereumReceiptAddr">
                     </div>
                  </div>
						<div class="err-swap mb-3" v-if="textMessageErrUserBalance != ''"><span class="error">{{textMessageErrUserBalance}}</span></div>
                  <button type="button" class="btn-swap" @click="showModalSwap" v-if="isLoading() == false && isMaintenance() == false">{{$t('message.swap.button.swapNow')}}</button>
                  <button type="button" class="btn-swap" disabled v-if="isLoading() == false && isMaintenance() == true">{{$t('message.swap.button.maintenance')}}</button>
                  <button type="button" class="btn-swap" disabled v-if="isLoading() == true">{{$t('message.swap.button.loading')}}</button>
               </form>
               <b-modal ref="swap-modal" id="modal-swap" hide-footer hide-header no-close-on-backdrop no-close-on-esc>
                  <div class="d-block">
                     <div class="header-modal clearfix">
                     <button type="button" aria-label="Close" class="close" @click="hideModalSwap()" v-if="swapProcessStatus != 2"><img src="../../assets/images/exit.png"></button>
                     <h3 class="title-modal">{{$t('message.swap.swapConfirm')}}</h3>
                  </div>
                  <div class="modal-info">
                     <div class="d-block">
                        <div class="address clearfix">
                           <div class="tron-address">
                           <span>{{$t('message.swap.yourTronWallet')}}</span>
                           <p>{{getReducedTronSwapAddr()}}</p>
                           </div>
                           <div class="eth-address">
                           <span>{{$t('message.swap.yourEthereumWallet')}}</span>
                           <p>{{reducedEthereumReceiptAdrr}}</p>
                           </div>
                        </div>
                        <div class="transfer-address clearfix">
                           <div class="number-address">
                           <span>{{$t('message.swap.from')}}</span>
                           <p>{{quantityTetherTRC20}} USDT-TRC20</p>
                           </div>
                           <i class="fa fa-arrow-right" aria-hidden="true"></i>
                           <div class="number-address">
                           <span>{{$t('message.swap.to')}}</span>
                           <p> {{quantityTetherERC20}} USDT-ERC20</p>
                           </div>
                        </div>
                        <div class="fee">
                           <span>{{$t('message.swap.swapFee')}}</span>
                           <p>{{swapData._feeOfSwap}} USDT</p>
                        </div>
                        <div class="swap-process mb-3" v-if="swapProcessStatus != 0">
                           <div class="waiting-user-confirm" v-if="swapProcessStatus == 1">
                              <p>{{$t('message.swap.waitingUserConfirm')}}</p>
                           </div>
                           <div class="process-create-order-swap-on-tron" v-if="swapProcessStatus == 2">
                              <div class="success-confirm" v-if="orderSwapStatus != 0">
                                 <p>{{$t('message.swap.successConfirmCreateOrderSwapOnTron')}}</p>
                              </div>
                           </div>
                           <div class="process-transfer-usdt-erc20"  v-if="swapProcessStatus == 2">
                              <div class="waiting-confirm" v-if="orderSwapStatus == 1">
                                 <p>{{$t('message.swap.waitingTransferUSDTOnEthereum')}}</p>		
                              </div>
                              <div class="success-confirm" v-if="orderSwapStatus == 2">
                                 <p>{{$t('message.swap.successTransferUSDTOnEthereum')}}</p>		
                              </div>
                              <div class="eth-trans-hash" v-if="ethereumTransferUSDTHash != ''">
                                 <p>{{$t('message.swap.ethereumTransactionHash')}}</p>		
                              </div>
                              <div class="create-trans-hash-link" v-if="ethereumTransferUSDTHash != ''">
                                 <a :href="ETHERSCAN_URL + '/tx/' + ethereumTransferUSDTHash" target="_blank" style="word-break: break-all;">{{ ethereumTransferUSDTHash }}</a>
                              </div>
                           </div>
                        </div>
                        <div class="button-area">
                           <button type="button" class="btn-modal btn-cancel" @click="hideModalSwap()" v-if="swapProcessStatus != 2">{{$t('message.swap.button.cancel')}}
                           </button>
                           <button type="button" class="btn-modal" @click="createOrderSwap" v-if="swapProcessStatus != 2">{{$t('message.swap.button.confirm')}}
                           </button>
                           <button type="button" class="btn-modal" @click="hideModalSwap()" v-if="swapProcessStatus == 2 && orderSwapStatus == 2">{{$t('message.swap.button.done')}}
                           </button>
                        </div>
                     </div>
                  </div>    
                  </div>
        
              </b-modal>
              <b-modal ref="modal-check-login" class="modal-unlock-2"  hide-footer hide-header>
                  <div class="d-block">
                     <div class="header-modal clearfix">
                        <button type="button" aria-label="Close" class="close" @click="hideModalCheckLogin()"><img src="../../assets/images/exit.png"></button>
                        <h2 class="text-center">{{$t('message.network.errorCccurred')}}</h2>
                     </div>
                     <div class="modal-info">
                        <h6 class="text-center">{{$t('message.network.errorTronlinkCannot')}}</h6>
                     </div>
                  </div>
    				</b-modal>
					<b-modal ref="modal-check-switch-node" class="modal-unlock-2"  hide-footer hide-header>
                  <div class="d-block">
                     <div class="header-modal clearfix">
                        <button type="button" aria-label="Close" class="close" @click="hideModalCheckSwitchNode()"><img src="../../assets/images/exit.png"></button>
                        <h2 class="text-center">{{$t('message.network.errorCccurred')}}</h2>
                     </div>
                     <div class="modal-info">
                        <h6 class="text-center">
                           <span>{{$t('message.network.errorTronlink')}}</span>
                           <span style="font-weight: bold">{{$t('message.network.errNodeName')}}</span>
                           <span style="font-weight: bold">{{$t('message.network.errNetwork')}}</span>
                        </h6>
                        <h6 class="text-center">
                           <span>{{$t('message.network.errorCurrently')}}</span>
                           <span style="font-weight: bold">{{$t('message.network.errorCurrentlyNodeName')}}</span>
                           <span>{{$t('message.network.errorNetworkInstead')}}</span>
                        </h6>
                     </div>
                  </div>		
					</b-modal>
            </div>

          </b-col>
      </b-row>

        </b-container>
  </div>
</template>
<script>

export default {

  data () {
    return {
    
    }
  },
  methods: {
   
  }
}
</script>