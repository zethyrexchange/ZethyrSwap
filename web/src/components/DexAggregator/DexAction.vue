<template>
  <div class="swap-ztr swap-ztr-aggregator padding-home">
      <b-container>
         <b-row>
            <b-col lg="7" md="12" class="mb-30 mb-md-0">
                <div class="dex_aggregator_component mb-4">
                    <ul class="tab-menu-aggregator">
                        <li class="tab-menu-aggregator__item active title-swap">Exchanges</li>
                    </ul>
                    <div class="dex_arregator_list_wrap">
                        <div class="dex_arregator_list">
                            <div class="dex_arregator_detail">
                                <b-row align-v="center">
                                    <b-col cols="1" md="1" class="pr-0"></b-col>
                                    <b-col cols="4" md="3">Name</b-col>
                                    <b-col cols="4" md="3" class="d-none d-md-block">Price</b-col>
                                    <b-col cols="3" md="2">Diff</b-col>
                                    <b-col cols="4" md="2"></b-col>
                                </b-row>
                            </div>
                             <div class="dex_arregator_detail" v-if="getDexMatch()">
                                <b-row align-v="center">
                                    <b-col cols="1" md="1" class="pr-0"><div class="logo-dex"><img :src="require(`../../assets/images/zethyr-swap-logo.png`)" alt="zethyrswap" /></div></b-col>
                                    <b-col cols="4" md="3">
                                        Zethyr Swap
                                        <div class="d-block d-md-none"><span class="green">{{ numberWithCommas(getSwapPrice(getDexMatch().sPrice), 6) }}</span></div>
                                    </b-col>
                                    <b-col cols="4" md="3" class="d-none d-md-block"><span class="green">{{ numberWithCommas(getSwapPrice(getDexMatch().sPrice), 6) }}</span></b-col>
                                    <b-col cols="3" md="2"><span class="best">BEST</span></b-col>
                                </b-row>
                            </div>
                            <div class="dex_arregator_detail" v-if="getDexMatch()">
                                <b-row align-v="center">
                                    <b-col cols="1" md="1" class="pr-0"><div class="logo-dex"><img :src="require(`../../assets/images/icon-swap-${getDexMatch().typeOfDex}.png`)" :alt="getDexMatch().dexName" /></div></b-col>
                                    <b-col cols="4" md="3">
                                        {{ getDexMatch().dexName}}
                                        <div class="d-block d-md-none"><span class="green">{{ numberWithCommas(getSwapPrice(getDexMatch().sPrice), 6) }}</span></div>
                                    </b-col>
                                    <b-col cols="4" md="3" class="d-none d-md-block"><span class="green">{{ numberWithCommas(getSwapPrice(getDexMatch().sPrice), 6) }}</span></b-col>
                                    <b-col cols="3" md="2"><span class="green">Match</span></b-col>
                                    <b-col cols="4" md="2" class="d-flex justify-content-center">
                                        <label class="switch checked"> 
                                            <input type="checkbox" value="getDexMatch().typeOfDex" @change.prevent="ignoreDexMatch">
                                            <span class="slider round"></span>
                                        </label>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="dex_arregator_detail" v-for="(item, idx) in dexList">
                                <b-row align-v="center">
                                    <b-col cols="1" md="1" class="pr-0"><div class="logo-dex"><img :src="require(`../../assets/images/icon-swap-${item.typeOfDex}.png`)" :alt="item.dexName" /></div></b-col>
                                    <b-col cols="4" md="3">
                                        {{item.dexName}}
                                        <div class="d-block d-md-none"><span :class="{ 'ignore-color': isDexIgnore(item.typeOfDex), green: !isDexIgnore(item.typeOfDex) }">{{ numberWithCommas(getSwapPrice(item.sPrice), 6) }}</span></div>
                                    </b-col>
                                    <b-col cols="4" md="3" class="d-none d-md-block"><span :class="{ 'ignore-color': isDexIgnore(item.typeOfDex), green: !isDexIgnore(item.typeOfDex) }">{{ numberWithCommas(getSwapPrice(item.sPrice), 6) }}</span></b-col>
                                    <b-col cols="3" md="2"><span :class="{ 'ignore-color': isDexIgnore(item.typeOfDex), red: getDiff(item) < 0 }">{{ getDiff(item) }} %</span></b-col>
                                    <b-col cols="4" md="2" class="d-flex justify-content-center">
                                        <label class="switch" :class="{ checked: !isDexIgnore(item.typeOfDex)}">
                                            <input type="checkbox" :value="item.typeOfDex" v-model="activeTypeOfDexList">
                                            <span class="slider round"></span>
                                        </label>
                                    </b-col>
                                </b-row>
                            </div>
                    
                        </div>                       
                    </div>
                </div>
            </b-col>
            <b-col lg="5" md="12" class="mb-30">
                <div class="swap-area swap-area__dex">
                    <div class="title">
                        <div class="row align-items-center">
                            <div class="col-5">
                                <h4 class="title-swap">Exchange</h4>
                            </div>
                            <div class="col-7 d-flex justify-content-end">
                                <span class="balance" v-if="isLoadUserBalanceOfFromAsset == false">
                                    Balance : {{ numberWithCommas(userAccountBalance, 6)}} {{ getFromTokenName() }} 
                                </span>
                                <div class="sk-chase" v-else>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                    <div class="sk-chase-dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-swap">
                        <form>
                            <div class="number number-aggregator clearfix">
                                <div class="form-group number-spen clearfix">
                                    <span v-if="isLoadUserBalanceOfFromAsset == true">Loading your balance.</span>
                                    <label for="exampleFormControlSelect1" v-else-if="messageError.AmountFrom.status == false">{{$t('message.swap.youSend')}}</label>
                                    <span class="error" v-else>{{messageError.AmountFrom.text}}</span>
                                    <input type="number" step="0.01" min="0.01" name="fromSwapAmountRounded" class="form-control" id="exampleFormControlInput1" placeholder="0" v-model="fromSwapAmountRounded" :disabled="isLoadingUserBalance() == true">
                                </div>
                                <div class="form-group name-money">
                                    <select class="form-control form-control-aggregator" id="exampleFormControlSelect1" v-model="fromTokenIdx" @change="onChangeFromToken($event)">
                                        <option v-for="(item , index) in swapListFrom" :value="index" v-if="index != toTokenIdx"><div> {{item}}</div></option>
                                    </select>
                                </div>
                            </div>
                            <div>
                            <div class="aggregator-setting pt-2 pb-2">
                                <div class="advanced-setting d-flex align-items-center" @click="handleAdvancedSetting()" v-bind:class="{ active: advanceSetting }">
                                    <span class="f-14">Advanced setting</span>
                                    <i class="fa fa-caret-up"></i>
                                </div>
                                <div class="icon cursor"><img src="../../assets/images/icon-exchange-1.png" @click="reversePairOfSwap"/></div>
                            </div>
                            <div class="slippage-set mb-3" v-if="advanceSetting">
                                <div class="slippage-title mb-2 f-12">Set slippage</div>
                                <div class="slippage-list mb-2">
                                    <button class="slippage-item" :class="{ 'active': slippageTolerance == 0.001}" type="button" @click="setSlippageTolerance(0.1)">0.1%</button>
                                    <button class="slippage-item" :class="{ 'active': slippageTolerance == 0.005}" type="button" @click="setSlippageTolerance(0.5)">0.5%</button>
                                    <button class="slippage-item" :class="{ 'active': slippageTolerance == 0.01}" type="button" @click="setSlippageTolerance(1)">1%</button>
                                    <input class="slippage-item input" ref='customSlippage' placeholder="Custom" @input="setCustomSlippageTolerance()" v-model="customSlippageTolerance">
                                </div>
                                <div class="text-center text-danger">
                                    <span class="error" v-if="this.slippageTolerance < 0">{{$t('message.dexError.errorSlippageNumber')}}</span>
                                    <span class="error" v-if="this.slippageTolerance > 0 && this.slippageTolerance < 0.001">{{$t('message.dexError.errorSlippageLow')}}</span>
                                    <span class="error" v-if="this.slippageTolerance > 0.5">{{$t('message.dexError.errorSlippageJustSwap')}}</span>
                                </div>
                            </div>
                            </div>
                            <div class="number number-aggregator clearfix">
                                <div class="form-group number-spen clearfix">
                                    <label for="exampleFormControlSelect1" v-if="messageError.AmountTo.status == false">{{$t('message.swap.youGet')}}</label>
                                    <span class="error" v-else>{{ messageError.AmountTo.text }}</span>
                                    <input type="text" class="form-control" name="toSwapAmountRounded" id="exampleFormControlInput2" v-model="toSwapAmountRounded">
                                </div>
                                <div class="form-group name-money">
                                    <select class="form-control form-control-aggregator" id="select_to_tokenIdx" v-model="toTokenIdx" @change="onChangeToToken($event)">
                                        <option v-for="item  in tokenListTo" :value="item.toTokenIdx" ><div> {{item.tokenName}}</div></option>
                                    </select>
                                </div>
                            </div>
                            <div class="pt-3 pb-3 color-1 text-slippage">
                                <b-row>
                                    <b-col><div class="swap-process-label">Price</div></b-col>
                                    <b-col class="text-right">
                                        <div>1 {{getFromTokenName()}} = {{numberWithCommas(getUnitPriceTo() , 6)}} {{getToTokenName()}}</div>
                                        <div>1 {{getToTokenName()}} =  {{numberWithCommas(getUnitPriceFrom() , 6)}}{{getFromTokenName()}}</div>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>Slippage:</b-col>
                                    <b-col class="text-right">{{ slippageTolerance * 100 }}%</b-col>
                                </b-row>
                                <b-row>
                                    <b-col>Transaction fee:</b-col>
                                    <b-col class="text-right">0 {{ getToTokenName() }}</b-col>
                                </b-row>
                            </div>
                            
                            <button type="button" class="btn-swap disabled" :disabled="validateCreateSwapOrder()== false" @click="showModalSwap()">{{$t('message.swap.button.swapNow')}}</button>
                        </form>
                        <b-modal ref="swap-modal" id="modal-swap" class="modal-swap" hide-footer hide-header no-close-on-backdrop no-close-on-esc>
                                <div class="header-modal clearfix">
                                    <button type="button" aria-label="Close" class="close" @click="hideModalSwap()" v-if="swapProcessStatus != 2"><img src="../../assets/images/exit.png"></button>
                                    <h3 class="title-modal">{{$t('message.swap.swapConfirm')}}</h3>
                                </div>
                                <div class="modal-info">
                                    <div class="transfer-address clearfix">
                                        <div class="number-address">
                                            <div class="d-flex align-items-center">
                                                <span class="mr-3">{{$t('message.swap.from')}}</span>

                                                <span class="swap-currency"><span class="d-flex align-items-center"><img class="token-logo mr-2" :src="require(`../../assets/images/${getFromTokenName().toLowerCase()}.logo.png`)" :alt="getFromTokenName()" /> {{getFromTokenName()}}</span></span>
                                            </div>
                                            <div class="swap-currency">
                                                <span class="text-break">{{numberWithCommas(fromSwapAmountRounded , 6)}}</span>
                                            </div>
                                        </div>
                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                        <div class="number-address">
                                            <div class="d-flex align-items-center">
                                                <span class="mr-3">{{$t('message.swap.to')}}</span> 
                                                <span class="swap-currency"><span class="d-flex align-items-center"><img class="token-logo mr-2" :src="require(`../../assets/images/${getToTokenName().toLowerCase()}.logo.png`)" :alt="getToTokenName()" /> {{getToTokenName()}}</span></span>
                                            </div>
                                            <div class="swap-currency">
                                                <span class="text-break">{{numberWithCommas(toSwapAmountRounded , 6)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swap-process mb-4" >
                                        <b-row class="mb-1">
                                            <b-col><div class="swap-process-label">Price</div></b-col>
                                            <b-col class="text-right">
                                                <div>1 {{getFromTokenName()}} = {{numberWithCommas(getUnitPriceTo() , 6)}} {{getToTokenName()}}</div>
                                                <div>1 {{getToTokenName()}} =  {{numberWithCommas(getUnitPriceFrom() , 6)}}{{getFromTokenName()}}</div>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col><div class="swap-process-label">Slippage</div></b-col>
                                            <b-col class="text-right">{{this.slippageTolerance * 100}} %</b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col><div class="swap-process-label">Transaction fee</div></b-col>
                                            <b-col class="text-right">0 {{ getToTokenName()}}</b-col>
                                        </b-row>
                                        <b-row class="mb-1">
                                            <b-col><div class="swap-process-label">Exchange</div></b-col>
                                            <b-col class="d-flex justify-content-end">
                                                <div class="swap-process-logo mr-2"><img :src="require(`../../assets/images/icon-swap-${typeOfDex}.png`)" /></div>
                                                <div><strong>{{getDexDetailByPair().dexName}}</strong></div>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col><div class="swap-process-label">Minimum received</div></b-col>
                                            <b-col class="text-right">{{ numberWithCommas(this.toSwapAmount * (1 - this.slippageTolerance), 6) }} {{ getToTokenName()}}</b-col>
                                        </b-row>
                                    </div>
                                    <div class="mb-3 d-flex swap-confirm-description">
                                        <img src="../../assets/images/error_outline.png" class="mr-2" />
                                         <div class="order-confirm-description">
                                            Output is estimated. You will receive at least {{ numberWithCommas(this.toSwapAmount * (1 - this.slippageTolerance), 6)}} {{getToTokenName()}} or the transaction will revert. Please make sure you have enough energy and banwidth, or the transaction may fail.
                                        </div>
                                    </div>
                                    <div>
                                        <div v-if="swapProcessStatus" class="swap-process mb-3">
                                            <div class="mb-4" v-if="swapProcessStatus == 1">
                                                <p class="mb-0">{{$t('message.swap.waitingUserConfirm')}}</p>
                                            </div>
                                            <div class="mb-4" v-if="swapProcessStatus == 2">
                                                <p class="mb-0">Processing... Please wait!</p>
                                            </div>
                                            <div class="create-trans-hash-link d-flex" v-if="approveHash != ''">
                                                <div>
                                                    <div class="d-flex">
                                                        <div class="create-trans-hash-link-icon mr-2" v-if="approvalProcessStatus == 1">
                                                            <div class="sk-chase">
                                                                <div class="sk-chase-dot"></div>
                                                                <div class="sk-chase-dot"></div>
                                                                <div class="sk-chase-dot"></div>
                                                                <div class="sk-chase-dot"></div>
                                                                <div class="sk-chase-dot"></div>
                                                                <div class="sk-chase-dot"></div>
                                                            </div>
                                                        </div>
                                                        <div class="create-trans-hash-link-icon mr-2" v-if="approvalProcessStatus == 2"><img :src="require(`../../assets/images/done_24px.png`)" /></div>
                                                        <div class="create-trans-hash-link-icon mr-2 text-center" v-if="approvalProcessStatus == -1"><i class="fa fa-warning"></i></div>
                                                        <div>
                                                            <div>Process approve {{ getFromTokenName() }}</div>
                                                            <a :href="'https://bscscan.com/tx' + approveHash" target="_blank" style="word-break: break-all;">{{approveHash}}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="create-trans-hash-link d-flex mb-3" v-if="swapTransactionHash != ''">
                                                <div class="create-trans-hash-link-icon mr-2" v-if="swapProcessStatus == 2">
                                                    <div class="sk-chase">
                                                        <div class="sk-chase-dot"></div>
                                                        <div class="sk-chase-dot"></div>
                                                        <div class="sk-chase-dot"></div>
                                                        <div class="sk-chase-dot"></div>
                                                        <div class="sk-chase-dot"></div>
                                                        <div class="sk-chase-dot"></div>
                                                    </div>
                                                </div>
                                                <div class="create-trans-hash-link-icon mr-2" v-if="swapProcessStatus == 3"><img :src="require(`../../assets/images/done_24px.png`)" /></div>
                                                <div class="create-trans-hash-link-icon mr-2 text-center" v-if="swapProcessStatus == -1"><i class="fa fa-warning"></i></div>
                                                <div>
                                                    <div>
                                                        <span v-if="swapProcessStatus == 2"> {{ $t('message.swap.createConfirmCreateOrderSwapOnTron') }}</span>
                                                        <span v-if="swapProcessStatus == 3"> {{ $t('message.swap.successConfirmCreateOrderSwapOnTron') }}</span>
                                                        <span v-if="swapProcessStatus == -1"> Cannot create your swap request</span>
                                                    </div>
                                                    <a :href="'https://bscscan.com/tx/' + swapTransactionHash" target="_blank" style="word-break: break-all;">{{ swapTransactionHash }}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center text-warning mb-3" v-if="swapProcessStatus == 0">
                                        <i class="fa fa-times-circle mr-2"></i>Swap rejected. Please try again
                                    </div>
                                    <div class="button-area">
                                        <b-row align-h="end">
                                            <b-col xs="12" md="4"  v-if="!swapProcessStatus || swapProcessStatus == -1">
                                                <button type="button" class="btn-modal btn-cancel w-100" @click="hideModalSwap()">{{$t('message.swap.button.cancel')}}</button>
                                            </b-col>
                                            <b-col xs="12" md="4" v-if="!swapProcessStatus || swapProcessStatus == 0">
                                                <button type="button" class="btn-modal w-100" @click="handleCreateSwapOrder()">{{$t('message.swap.button.confirm')}}</button>
                                            </b-col>
                                            <b-col xs="12" md="4" v-if="swapProcessStatus == 3">
                                                <button  type="button" class="btn-modal w-100" @click="hideModalSwap()">{{$t('message.swap.button.done')}}</button>
                                            </b-col>
                                        </b-row>
                                    </div>

                                </div>    
                        </b-modal>
                       
                    </div>
                </div>
            </b-col>
        </b-row>

        </b-container>
  </div>
</template>
<script>
import { mapActions , mapGetters } from 'vuex';
import UtilFormatNumber from '../../utils/format';
import UtilFormat from '../../utils/convertTime.js';
import UtilArray from '../../utils/handleArray.js';
import { parseFloatNumber } from "./../../utils/convert.util";
import SwapConfig from './../../../../config/swap.config.js';

import cZSwapInfo from './../../js/zethyr-swap-info';
import cZGetBalance from './../../js/zethyr-get-balance';
import cBaseZethyrSwap from './../../js/base.zethyrswap';
import cBaseTokenBEP20 from './../../js/base.tokenBEP20';

const amountApprovalLimit = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export default {

 	data () {
		return {
            swapProcessStatus   : null, // 0: dont have any action,   ,  1: waiting user confirm, 2 : Processing , 3 : success , -1 : transaction fail;
            approvalProcessStatus: 0,
            swapTransactionHash : '',
            approveHash      : '',
            tabOfOrders      : 'open', // open, history
            swapListFrom     : SwapConfig.tokenList,
            slippageTolerance: 0.001,
            customSlippageTolerance : 0.1,
            activeTypeOfDexList  : [0, 1, 2],
            typeOfDex     : 0,
            typeOfDexSwap     : -1,
            fromTokenIdx     : 0,
            toTokenIdx       : 3,
            fromSwapAmount   : "",
            toSwapAmount     : '',
            fromSwapAmountRounded : "",
            toSwapAmountRounded   : '',
            tokenToTRXPrice  : 0,
            iReloadDataID: null,
            advanceSetting: false,
            userAccountBalance : 0,
            isChangePair : false,
            getAmountFromTo : true,
            getAmountToFrom : false,
            isLoadUserBalanceOfFromAsset: true,
            messageError : {
                AmountFrom :  {
                    status : false,
                    text   : ''
                },
                AmountTo : {
                    status : false,
                    text   : '',
                }
            }
		}
    },
    watch: {
        typeOfDex: function(val) {
            this.messageError = {
                AmountFrom :  {
                    status : false,
                    text   : ''
                },
                AmountTo : {
                    status : false,
                    text   : '',
                }
            };
        },
        fromTokenIdx: function(val) {
            let _toListAllow = this.getTokenListTo(val);
            let _toTokenIdx  = typeof this.toTokenIdx != 'undefined' ? parseInt(this.toTokenIdx) : -1;
            if (!_toListAllow.includes(_toTokenIdx)) {
                this.toTokenIdx = _toListAllow[0];
            } else {
                this.getAmountFromTo = true;
                this.getAmountToFrom = false;
                this.loadData();
            }
        },
        toSwapAmount: function(val) {
            this.initDexList();
        },
        toTokenIdx: function(val) {
            this.getAmountFromTo = true;
            this.getAmountToFrom = false;
            if(val != this.toTokenIdx) {
                this.messageError.AmountFrom.status = false;
                this.messageError.AmountFrom.text   = '';
                this.messageError.AmountTo.status = false;
                this.messageError.AmountTo.text   = '';
            }

            this.loadData();
        },
        fromSwapAmountRounded: function(val) {
            this._reloadAmountEstimate(); 
            this._validateAmountInput();
        },

        toSwapAmountRounded : function(val){
            this._reloadAmountEstimate();
            this._validateAmountInput();
        },
        userAccountBalance: function(val) {
            this._validateAmountInput();
        },
        $route (to, from){
           this.initPairData();
        }
    },
    computed: {
        ...mapGetters([
                'userOpenOrders',
                'userOrdersHistory',
                'userOrdersHistoryPage',
                'userOrdersHistoryTotalPage',
                'typeOfDexDefault',
                'dexListByPair',
            ]),
        tokenListTo : function(){
            let tokenListTo   = this.getTokenListTo(this.fromTokenIdx);
            let tokenList     = [];

            tokenListTo.forEach(function(item){
                let tokenName  = SwapConfig.tokenList[item];
                let toTokenIdx = item;
                let options   = { tokenName , toTokenIdx};
                tokenList.push(options);
            })

            return tokenList;
        },
        dexList: function() {
            let data = this.getDexList();
            return data;
        }
    },
    mounted(){
        this.initPairData();
        this.onAccountChange();
        this.makeJqueryEvent();
        this.loadData();
        this.reloadData();
        this.onTypeOfDexDefaultChange();
        // 
	},
    destroyed() {
      clearInterval(this.iReloadDataID);
    },
    methods: {
        ...mapActions([
			'initDexInfo',
            'initOrdersHistory'
		]),
        redirectToSwapDetail(){
            let fromToken  = this.getFromTokenName();
            let toToken    = this.getToTokenName();
            this.$router.push({ name : 'swapDetail', params: { fromToken : fromToken, toToken : toToken } });
        },
        redirectToTransactionLink(transactionId){
            if(transactionId == '') return false;
            let transactionLink =  `https://bscscan.com/tx/${transactionId}`;
            window.open(transactionLink, '_blank');
        },
        getSwapPrice(sPrice) {
            return sPrice;
        },
        getDiff(dex) {
            let diff = dex ? dex.diff : 0;
            let dexMatch = this.getDexMatch();
            if (!dexMatch || !dex) {
                return 0;
            }
            return parseFloat(this.numberWithCommas((dex.sPrice - dexMatch.sPrice) * 100 / dexMatch.sPrice, 2));
        },
        async getUserBalanceByToken(){
            let fromTokenIdx       = this.fromTokenIdx ? this.fromTokenIdx : 0;
            let swapTokenData      = SwapConfig.swapData[fromTokenIdx];
            let type               = swapTokenData.type   ;
            let tokenDecimals      = swapTokenData.tokenDecimals;    
            let userAccountBalance = 0;

            if (type == 1) {
                userAccountBalance = await cZGetBalance.getBNBBalance();
            } else if (type == 2) {
                userAccountBalance = await cZGetBalance.getBEP20Balance(swapTokenData.tokenBEP20 , tokenDecimals);
            }

            userAccountBalance   = parseFloatNumber(userAccountBalance, tokenDecimals);

            this.userAccountBalance  = userAccountBalance;
            this.isLoadUserBalanceOfFromAsset = false;
        },
        isLoadingUserBalance(){
            return this.isLoadUserBalanceOfFromAsset;
        },
        getDexDetailByPair(){
            let typeOfDex       = this.typeOfDexSwap;
            let dexListConfig   = SwapConfig.dexListConfig;
            let dexDetail       = dexListConfig[typeOfDex];
            if(!dexDetail) {
               return {};
            } else {
                return dexDetail;
            }
        },
        getContractZSwapAddr() {
            let typeOfDex       = this.typeOfDexSwap;
            let dexListConfig   = SwapConfig.dexListConfig;
            let dexDetail       = dexListConfig[typeOfDex];
            if(!dexDetail) {
               return null;
            } else {
                return dexDetail.cZSwapAddr;
            }
        },
        getToTokenName() {
            return SwapConfig.tokenList[this.toTokenIdx];
        },
        getFromTokenName() {
            return SwapConfig.tokenList[this.fromTokenIdx];
        },
        getTotalOpenOrder() {
            let userOpenOrders = this.userOpenOrders ? this.userOpenOrders : [];
            return userOpenOrders.length;
        },
        getOrderTime(orderDetail) {
            let time = orderDetail && orderDetail.time ? orderDetail.time : Date.now();
            return UtilFormat.formatOrderDate(time);
        },
        changeTabOfOrder(tabOfOrders) {
            let isLoadOrderHistory = this.tabOfOrders != tabOfOrders && tabOfOrders == 'history' ? true : false;
            let self = this;
            this.tabOfOrders = tabOfOrders;
            if (isLoadOrderHistory == true) {
                // self.initOrdersHistory({ page: 1, limit: 10 });
            }
        },
        changePage(page){
          // this.initOrdersHistory({ page, limit: 10 });
        },
		onAccountChange() {
            let self = this
            this.$store.watch(
                (state)=>{
                    return this.$store.getters.accountAddress;
                },
                (val)=>{
                    this.isLoadUserBalanceOfFromAsset = true;
                    this.loadData();
                    if(self.tabOfOrders == 'history') {
                       // self.initOrdersHistory({page : 0 , limit : 10})
                    }
                },
                {
                deep:true
                }
            ); 
        },
        onTypeOfDexDefaultChange() {
            this.$store.watch(
                (state)=>{
                    return this.$store.getters.typeOfDexDefault;
                },
                (val)=>{
                    this.typeOfDex = val;
                    if (val != -1) {
                        this.isLoadUserBalanceOfFromAsset = true;
                        this._reloadAmountEstimate();
                    }
                },
                {
                deep:true
                }
            ); 
        },
        _reloadAmountEstimate() {
            if(this.getAmountFromTo == true) {
                this.getAmountOut();               
            } else  if(this.getAmountToFrom == true) {
                this.getAmountIn();    
            }
        },
        numberWithCommas(x, decimal = 3) {
            return UtilFormatNumber.numberWithCommas(x, decimal);
		},
        setSlippageTolerance(value){
            this.customSlippageTolerance     = value;   
            this.slippageTolerance           = value/100;
            this.$refs.customSlippage.focus();
        },
        setCustomSlippageTolerance(){
            this.slippageTolerance      =  this.customSlippageTolerance/100;
        },
        changeSwapPair(){
            this.fromTokenIdx  = this.toTokenIdx;
        },
        handleAdvancedSetting(){
            this.focusCustomSlippage();
            this.advanceSetting = !this.advanceSetting;
        },
        focusCustomSlippage(){
            let self = this;
            setTimeout(() => {
                self.$refs.customSlippage.focus();
            }, 1000);
        },
        showModalSwap() {
            let self      = this;
            this.typeOfDexSwap = this.getTypeOfDexMatch();
            this.swapProcessStatus   = null;
            this.approvalProcessStatus   = 0;
            if (this.validateCreateSwapOrder(true) == false) {
                return false; 
            } 
            self.$refs['swap-modal'].show();
		},
        hideModalSwap() {
            this.swapProcessStatus   = null;
            this.approvalProcessStatus   = 0;
            this.typeOfDexSwap   = -1;
            this.approveHash      = "";
            this.swapTransactionHash = "";
			this.$refs['swap-modal'].hide();
        },
        
        getTokenListTo(tokenIdx){
            let tokenListTo   = SwapConfig.swapData[tokenIdx].to;
            return tokenListTo;
        },
        getTokenDetail(tokenIdx){
            let token   = SwapConfig.swapData[tokenIdx];
            return token;
        },

        makeJqueryEvent() {
            let REGEX_PRICE = /\d{0,99}(\.\d{0,6})?/;
            let self = this;
            $(function() {
                makeEventChangeSwapAmountFrom();
                makeEventChangeSwapAmountTo();
            });
            function makeEventChangeSwapAmountFrom() {
                $('input[type=number][name="fromSwapAmountRounded"]').on('input', function() {
                    self.getAmountFromTo = true;
                    self.getAmountToFrom = false;

                    this.value                 = this.value.match(REGEX_PRICE)[0];
                    self.fromSwapAmountRounded = this.value;

                    if (!self.fromSwapAmountRounded || self.fromSwapAmountRounded == '') {
                        self._resetSwapAmount();
                    }
                });
            }  
            function makeEventChangeSwapAmountTo(){
                $('input[type=text][name="toSwapAmountRounded"]').on('input', function() {
                    self.getAmountFromTo = false;
                    self.getAmountToFrom = true;

                    this.value                        = this.value.match(REGEX_PRICE)[0];
                    self.toSwapAmountRounded          = this.value;
                
                    if (!self.toSwapAmountRounded || self.toSwapAmountRounded == '') {
                        self._resetSwapAmount();
                    }
                });
            } 
        },
        _resetSwapAmount() {
            this.toSwapAmountRounded = '';
            this.fromSwapAmountRounded = '';
            this.toSwapAmount        = '';
            this.fromSwapAmount      = '';
        },
        _validateAmountInput() {
            let self = this;
            let toTokenName            = self.getToTokenName().toLowerCase().trim();
            let fromTokenName          = self.getFromTokenName().toLowerCase().trim();
            let toSwapAmountRounded    = parseFloat(self.toSwapAmountRounded); 
            let fromSwapAmountRounded  = parseFloat(self.fromSwapAmountRounded);
            if(isNaN(fromSwapAmountRounded) == false && fromSwapAmountRounded > self.userAccountBalance){
                self.messageError.AmountFrom.status   = true;
                self.messageError.AmountFrom.text     = self.$t('message.dexError.errUserBalance');
            } else {
                self.messageError.AmountFrom.status        = false;
            }
        },
        
        validateCreateSwapOrder(){
            if(isNaN(parseFloat(this.fromSwapAmount)) == true ) {
                return false;
            }

            if(parseFloat(this.toSwapAmount) <= 0 || parseFloat(this.fromSwapAmount) <= 0) {
                return false;
            }

            if(this.userAccountBalance <= 0) {
                return false;
            }

            if(parseFloat(this.fromSwapAmount) > this.userAccountBalance) {
                return false;
            }

            if(this.slippageTolerance <= 0) {
                return false;
            }

            if(this.slippageTolerance > 0.5) {
                return false;
            }
            return true;
        },
        initPairData(){
            let fromTokenName       = this.$route.params.fromToken; 
            let toTokenName         = this.$route.params.toToken; 
            if(!fromTokenName || !toTokenName ) {
                this.fromTokenIdx  = 0;
                this.toTokenIdx    = 3
            } else {
                let fromTokenIdx        = Object.keys(SwapConfig.tokenList).find(key => SwapConfig.tokenList[key] === fromTokenName);
                let toTokenIdx          = Object.keys(SwapConfig.tokenList).find(key => SwapConfig.tokenList[key]  === toTokenName);

                this.fromTokenIdx  = fromTokenIdx;
                this.toTokenIdx    = toTokenIdx;
            }
        },
        reloadData() {
            let self = this;
		    this.iReloadDataID = setInterval(() => {
                self.loadData();
		    }, 5000);
        },
        loadData() {
            this.initDexList();
            this.getUserBalanceByToken();
            let getAmountFromTo = this.getAmountFromTo;
            let getAmountToFrom = this.getAmountToFrom;
            if (getAmountFromTo == true) {
                this.getAmountOut();    
            } 
            if (getAmountToFrom == true) {
               this.getAmountIn();  
            }      
        },

        initDexList(){
            let amountIn = this.fromSwapAmount && this.fromSwapAmount != '' ? this.fromSwapAmount: 1;
            let pairOfSwap = this.getPairOfSwap();
            let fromTokenDetail = this.getTokenDetail(this.fromTokenIdx);
            let toTokenDetail = this.getTokenDetail(this.toTokenIdx);
            let path = this.getPathOfSwap(fromTokenDetail, toTokenDetail);
            this.initDexInfo({ amountIn, pairOfSwap, path, inTokenDecimal: fromTokenDetail.tokenDecimals, outTokenDecimal: toTokenDetail.tokenDecimals });
        },
        reversePairOfSwap() {
            let self = this;
            this.messageError = {
                AmountFrom :  {
                    status : false,
                    text   : ''
                },
                AmountTo : {
                    status : false,
                    text   : '',
                }
            }
            this.messageError.AmountFrom.status = false;
            this.messageError.AmountTo.status = false;
            this.messageError.AmountFrom.text   = '';
            this.messageError.AmountTo.text = '';

            // isChangePair
            if (this.isChangePair == true) {
                return false;
            }

            this.isChangePair = true;
            let fromTokenIdx  = this.fromTokenIdx;
            let toTokenIdx  = this.toTokenIdx;
            this.toTokenIdx = fromTokenIdx;

            setTimeout(function(){ 
                self.fromTokenIdx = toTokenIdx;
                self.isChangePair = false;
                self.redirectToSwapDetail();
            }, 100);
        },
        onChangeToToken(e){
            this.messageError.AmountFrom.status = false;
            this.messageError.AmountTo.status = false;

            this.messageError.AmountFrom.text   = '';
            this.messageError.AmountTo.text = '';
            this.redirectToSwapDetail();
        },
        onChangeFromToken(e){
            this.messageError.AmountFrom.status = false;
            this.messageError.AmountTo.status = false;

            this.messageError.AmountFrom.text   = '';
            this.messageError.AmountTo.text = '';
            this.redirectToSwapDetail();
        },
        getPercentFilled(orderDetail) {
            if (
                orderDetail.typeOfDex == 0 ||
                orderDetail.payback <= 0
                ) {
                return `100%`;
            }
            let percent = (orderDetail.amountSold - orderDetail.payback) * 100 / orderDetail.amountSold;
            percent = this.numberWithCommas(percent, 2);
            return `${percent}%`;
        },
        getPayback(orderDetail) {
            if (
                orderDetail.typeOfDex == 0 ||
                orderDetail.payback <= 0
                ) {
                return `-`;
            }
            let payback = this.numberWithCommas(orderDetail.payback, 6);
            if (payback == 0) {
                payback = '-';
            }
            return payback;
        },
    
        async getAmountOut() {
            let self = this;
            let tokensSold      = this.fromSwapAmountRounded && this.fromSwapAmountRounded != '' ? this.fromSwapAmountRounded : 0;
            let typeOfDex       = this.getTypeOfDexMatch();
            let fromTokenIdx    = this.fromTokenIdx;
            let toTokenIdx      = this.toTokenIdx;
            let tokenFromDetail = this.getTokenDetail(fromTokenIdx);
            let tokenToDetail   = this.getTokenDetail(toTokenIdx);
            let path = this.getPathOfSwap(tokenFromDetail, tokenToDetail);
            let slippageTolerance = this.slippageTolerance ? this.slippageTolerance : 0.001;

            tokensSold = this.getAmountFromTo == true ?  parseFloat(tokensSold) : 0;

             if (
                tokenFromDetail && 
                tokenToDetail && 
                fromTokenIdx != toTokenIdx && 
                tokensSold > 0
                ) {
                
                let data = await cZSwapInfo.getAmountsOut(tokensSold, path, tokenFromDetail.tokenDecimals, tokenFromDetail.tokenDecimals, slippageTolerance);
                data = data[typeOfDex];
                let amountGet    = data.amountOut;
                self.toSwapAmount          = amountGet;
                self.toSwapAmountRounded   = Math.floor(amountGet * 10 ** 6)/10 ** 6;
                self.fromSwapAmount        = tokensSold;
            } 
        },
         async getAmountIn() {
            let self             = this;
            let tokensBought     = this.toSwapAmountRounded && this.toSwapAmountRounded != '' ? this.toSwapAmountRounded : 0;
            let typeOfDex        = this.getTypeOfDexMatch();
            let fromTokenIdx     = this.fromTokenIdx;
            let toTokenIdx       = this.toTokenIdx;

            let tokenFromDetail  = this.getTokenDetail(fromTokenIdx);
            let tokenToDetail    = this.getTokenDetail(toTokenIdx);
            tokensBought         = this.getAmountToFrom == true ? parseFloat(tokensBought) : 0;

            let path = this.getPathOfSwap(tokenFromDetail, tokenToDetail);
            let slippageTolerance = 0;
            if (
                tokenFromDetail && 
                tokenToDetail && 
                fromTokenIdx != toTokenIdx && 
                tokensBought > 0
                ) {

                let jContractAddr = tokenFromDetail.zJustswapContract;

                let data = await cZSwapInfo.getAmountsIn(tokensBought, path, tokenFromDetail.tokenDecimals, tokenFromDetail.tokenDecimals);
                data = data[typeOfDex];
                let amountSend    = data.amountIn;
                self.toSwapAmount                = tokensBought;
                self.fromSwapAmount              = amountSend;
                self.fromSwapAmountRounded       = Math.floor(amountSend * 10 ** 6)/10 ** 6;
            } 
        },
        handleCreateSwapOrder() {
            this.swapProcessStatus = 1;
            let typeOfDex      = this.typeOfDexSwap;
            if (typeOfDex != -1) {
                this._handleCreateUniswapOrder(typeOfDex);
            } 
        },
        async _handleCreateUniswapOrder(typeOfDex) {
            let fromTokenIdx    = this.fromTokenIdx;
            let toTokenIdx      = this.toTokenIdx;
            let tokensSold      = this.fromSwapAmount && this.fromSwapAmount != '' ? this.fromSwapAmount : 0;
            let tokenFromDetail = this.getTokenDetail(fromTokenIdx);
            let tokenToDetail   = this.getTokenDetail(toTokenIdx);
            let path = this.getPathOfSwap(tokenFromDetail, tokenToDetail);
            tokensSold = parseFloat(tokensSold);

            if (
                !tokenFromDetail || 
                !tokenToDetail || 
                tokensSold <= 0 || 
                toTokenIdx == fromTokenIdx
                ) {
                return false;
            }
            let self = this;

            let cZSwapAddr = this.getContractZSwapAddr();
            if (!cZSwapAddr) {
                return false;
            }
            let typeOfTokenFrom = tokenFromDetail.type;
            let typeOfTokenTo = tokenToDetail.type;
            let typeOfSwap = `${typeOfTokenFrom}${typeOfTokenTo}`;
            typeOfSwap = SwapConfig.typeOfSwap[typeOfSwap];
            if (typeOfSwap == 1) {  // BNB to Token BEP20
                return self._swapExactBNBForTokens(cZSwapAddr, typeOfDex, tokensSold, path, tokenFromDetail.tokenDecimals, tokenToDetail.tokenDecimals);
            } else if (typeOfSwap == 2) { // Token BEP20 to BNB
                return self._swapExactTokensForBNB(cZSwapAddr, typeOfDex, tokensSold, path, tokenFromDetail.tokenBEP20, tokenFromDetail.tokenDecimals, tokenToDetail.tokenDecimals);
            } else if (typeOfSwap == 3) { // Token BEP20 to Token BEP20
                return self._swapExactTokensForTokens(cZSwapAddr, typeOfDex, tokensSold, path, tokenFromDetail.tokenBEP20, tokenFromDetail.tokenDecimals, tokenToDetail.tokenDecimals);
            }
        },
        async _swapExactBNBForTokens(cZSwapAddr, typeOfDex, amountIn, path, inTokenDecimal, outTokenDecimal) {
            let self = this;
            let slippageTolerance = this.slippageTolerance ? this.slippageTolerance : 0.001;
            try {
                let swapData = await cBaseZethyrSwap.getDataOfswapExactBNBForTokens({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance });
                swapData.contract.methods.swapExactBNBForTokens(swapData.amountOutMin, swapData.path, swapData.userAddr).send({ from: swapData.userAddr, value: swapData.amountIn })
                    .on('transactionHash', function(hash) {
                        self.swapTransactionHash = hash;
                        self.swapProcessStatus   = 2;
                    })
                    .on('confirmation', function(confirmationNumber, receipt){
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('receipt', function(receipt){
                        // receipt example
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                        self.swapProcessStatus   = -1;
                    });              
            } catch(e) {
                self.swapProcessStatus  = 0;
                console.log(e);
            }
        },
        async _swapExactTokensForBNB(cZSwapAddr, typeOfDex, amountIn, path, inTokenAddr, inTokenDecimal, outTokenDecimal) {
            let self = this;
            let slippageTolerance = this.slippageTolerance ? this.slippageTolerance : 0.001;
            try {
                let amountAllowed = await cBaseTokenBEP20.getAllowance(inTokenAddr, cZSwapAddr, inTokenDecimal);
                if (amountIn > amountAllowed) {
                    let approveData = await cBaseTokenBEP20.getApproveData(inTokenAddr, cZSwapAddr);
                    await approveData.contract.methods.approve(approveData.spenderAddr, approveData.approveAmount).send({ from: approveData.userAddr })
                        .on('transactionHash', function(hash) {
                            self.approveHash = hash;
                            self.approvalProcessStatus   = 1;
                        })
                        .on('confirmation', function(confirmationNumber, receipt){
                            if (receipt.status) {
                                self.approvalProcessStatus   = 2;
                            } else {
                                self.approvalProcessStatus   = -1;
                            }
                        })
                        .on('receipt', function(receipt){
                            // receipt example
                            if (receipt.status) {
                                self.approvalProcessStatus   = 2;
                            } else {
                                self.approvalProcessStatus   = -1;
                            }
                        })
                        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                            self.approvalProcessStatus   = -1;
                        });       
                }
                let swapData = await cBaseZethyrSwap.getDataOfswapExactTokensForBNB({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance });
                swapData.contract.methods.swapExactTokensForBNB(swapData.amountIn, swapData.amountOutMin, swapData.path, swapData.userAddr).send({ from: swapData.userAddr })
                    .on('transactionHash', function(hash) {
                        self.swapTransactionHash = hash;
                        self.swapProcessStatus   = 2;
                    })
                    .on('confirmation', function(confirmationNumber, receipt){
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('receipt', function(receipt){
                        // receipt example
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                        self.swapProcessStatus   = -1;
                    });                
            } catch(e) {
                self.swapProcessStatus  = 0;
            }
        },
        async _swapExactTokensForTokens(cZSwapAddr, typeOfDex, amountIn, path, inTokenAddr, inTokenDecimal, outTokenDecimal) {
            let self = this;
            let slippageTolerance = this.slippageTolerance ? this.slippageTolerance : 0.001;
            try {
                let amountAllowed = await cBaseTokenBEP20.getAllowance(inTokenAddr, cZSwapAddr, inTokenDecimal);

                if (amountIn > amountAllowed) {
                     let approveData = await cBaseTokenBEP20.getApproveData(inTokenAddr, cZSwapAddr);
                    await approveData.contract.methods.approve(approveData.spenderAddr, approveData.approveAmount).send({ from: approveData.userAddr })
                        .on('transactionHash', function(hash) {
                            self.approveHash = hash;
                            self.approvalProcessStatus   = 1;
                        })
                        .on('confirmation', function(confirmationNumber, receipt){
                            if (receipt.status) {
                                self.approvalProcessStatus   = 2;
                            } else {
                                self.approvalProcessStatus   = -1;
                            }
                        })
                        .on('receipt', function(receipt){
                            // receipt example
                            if (receipt.status) {
                                self.approvalProcessStatus   = 2;
                            } else {
                                self.approvalProcessStatus   = -1;
                            }
                        })
                        .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                            self.approvalProcessStatus   = -1;
                        });       
                } 

                let swapData                 = await cBaseZethyrSwap.getDataOfswapExactTokensForTokens({ cZSwapInfo, typeOfDex, cZSwapAddr, amountIn, path, inTokenDecimal, outTokenDecimal, slippageTolerance });
                swapData.contract.methods.swapExactTokensForTokens(swapData.amountIn, swapData.amountOutMin, swapData.path, swapData.userAddr).send({ from: swapData.userAddr })
                    .on('transactionHash', function(hash) {
                        self.swapTransactionHash = hash;
                        self.swapProcessStatus   = 2;
                    })
                    .on('confirmation', function(confirmationNumber, receipt){
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('receipt', function(receipt){
                        // receipt example
                        if (receipt.status) {
                            self.swapProcessStatus   = 3;
                        } else {
                            self.swapProcessStatus   = -1;
                        }
                    })
                    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                        self.swapProcessStatus   = -1;
                    });
            } catch(e) {
                self.swapProcessStatus  = 0;
                console.log(e);
            }
        },
        ignoreDexMatch() {
            let activeTypeOfDexList = this.activeTypeOfDexList ? this.activeTypeOfDexList : [];
            let dexMatch = this.getDexMatch();
            if (!dexMatch) {
                return false;
            }  
            if (activeTypeOfDexList.length <= 1) {
                return false;
            }
            activeTypeOfDexList = activeTypeOfDexList.filter(item => item != dexMatch.typeOfDex);
            this.activeTypeOfDexList = activeTypeOfDexList;
        },
        getPathOfSwap(fromTokenDetail, toTokenDetail) {
            let data = [];
            if (fromTokenDetail && toTokenDetail) {
                data = [fromTokenDetail.tokenBEP20, toTokenDetail.tokenBEP20];
            }
            return data;
        },
        getUnitPriceTo() {
            let typeOfDex = this.typeOfDexSwap;
            let dexList = this.getDexList();
            let dexDetail = dexList[typeOfDex] ? dexList[typeOfDex] : null;
            let price = dexDetail ? dexDetail.sPrice : 0;
            return price;
        },
        getUnitPriceFrom() {
            let typeOfDex = this.typeOfDexSwap;
            let dexList = this.getDexList();
            let dexDetail = dexList[typeOfDex] ? dexList[typeOfDex] : null;
            let price = dexDetail ? dexDetail.reversePrice : 0;
            return price;
        },
        getPairOfSwap() {
            return `${SwapConfig.tokenList[this.fromTokenIdx]}${SwapConfig.tokenList[this.toTokenIdx]}`;
        },
        getPairOfDex() {
            return SwapConfig.pairs[`${this.fromTokenIdx}${this.toTokenIdx}`];
        },
        getDexList() {
            let typeOfDexMatch = this.getTypeOfDexMatch();
            let data = this.dexListByPair && this.dexListByPair[this.getPairOfSwap()] ? this.dexListByPair[this.getPairOfSwap()] : [];
            let newData = [];
            data.forEach(item => {
                if (item.typeOfDex != typeOfDexMatch) {
                    newData.push(item);
                } 
            });
            newData = UtilArray.sortArray(newData, 'sPrice', false);
            // data = [...activeList, ...ignoreList];
            // return data;
            return newData;
        },
        getTypeOfDexMatch() {
           let dexMatch = this.getDexMatch();
           return dexMatch ? dexMatch.typeOfDex : -1;
        },
        getDexMatch() {
            let activeTypeOfDexList = this.activeTypeOfDexList ? this.activeTypeOfDexList : [];
            let typeOfDexSwap = this.typeOfDexSwap;
            
            let data = this.dexListByPair && this.dexListByPair[this.getPairOfSwap()] ? this.dexListByPair[this.getPairOfSwap()] : [];
            let activeList = [];
            for (let idx = 0; idx < data.length; idx++) {
                if (typeOfDexSwap != -1) {
                    if (data[idx] && data[idx].typeOfDex == typeOfDexSwap) {
                        activeList.push(data[idx]);
                        break;
                    }
                } else if (data[idx] && activeTypeOfDexList.indexOf(data[idx].typeOfDex) >= 0) {
                    activeList.push(data[idx]);
                    break;
                }
            }

            return activeList[0];
        },
        isDexIgnore(typeOfDex) {
            let activeTypeOfDexList = this.activeTypeOfDexList ? this.activeTypeOfDexList : [];
            return activeTypeOfDexList.indexOf(typeOfDex) < 0;
        },
        isShowMessageError(){
            let toSwapAmountRounded     = this.toSwapAmountRounded;
            let fromSwapAmountRounded   = this.fromSwapAmountRounded;
            if(
                !toSwapAmountRounded || 
                toSwapAmountRounded   == '' || 
                !fromSwapAmountRounded || 
                fromSwapAmountRounded == '' )
            {
                return false;
            }
            return true;
        }
    }
}
</script>