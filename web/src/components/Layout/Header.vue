<template>
  <div class="header-app" style="position: relative;">
      <b-container>
        <b-navbar toggleable="md">
          <b-navbar-brand href="#" class="d-flex align-items-center">
            <div class="logo-content mr-2">
              <img src="../../assets/images/zethyr-swap.png" @click="redirectToHome()">
            </div>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse-header" class="icon-mobile-menu"><i class="fa fa-bars"></i></b-navbar-toggle>

          <b-collapse id="nav-collapse-header" is-nav class="collapse navbar-collapse navbar-main-collapse">
            <b-navbar-nav class="ml-auto align-items-stretch">
                <b-nav-item target="#" href="https://zethyr.exchange">Dex</b-nav-item>
                <b-nav-item target="#" @click="redirectToHome()">Swap</b-nav-item> 
                <b-nav-item target="_blank" href="https://zethyr.finance">{{$t('message.menu.Finance')}}</b-nav-item>
                <b-nav-item target="#" @click="redirectToStable()">Stable</b-nav-item>
                <b-nav-item target="_blank" href="https://twitter.com/zethyrexchange">{{$t('message.menu.News')}}</b-nav-item>
                <b-nav href="#" class="login-or-register">
                  <img src="../../assets/images/account.png" class="mr-2">
                  <span v-if="isLogined == true">{{accountAddress}}</span>
                  <span v-else @click="checkLogin()">Login</span>
                </b-nav>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
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
    </b-container>
  </div>
</template>
<script>
import { isMobile } from 'mobile-device-detect';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
       language:'en',
    };  
  },
  
  mounted () {
  
  },
  computed: {
      ...mapGetters([
        'isLogined',
        'accountAddress'
      ])
  },
  methods: {
    
    hideMobileHeaderMenu() {
      if (isMobile == true) {
        $('.icon-mobile-menu').click();
      }
    },
    redirectToHome(){
      this.$router.push({name:'home'}, () => {});
    },
    redirectToStable() {
      this.$router.push({name:'stable'}, () => {});
    },
    redirectToDexAgrregator(){
      this.$router.push({name:'dexAggregator'}, () => {});
    },
   
     /* -----------------------------------------------------------------------------------------
    *  ----------------------------------  ACTION ----------------------------------------------
    *  -----------------------------------------------------------------------------------------
    */
    change (to) {
      localStorage['lang'] = to
      this.$i18n.locale = to
      this.language = this.$i18n.locale;
      this.$emit('changeLang', to);
      this.hideMobileHeaderMenu(); 
    },
  }
}
</script>
<style>
  .header .btn-secondary{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .header .btn-secondary:hover{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .header .btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle{
    color: #FFF;
    border-color: transparent;
    background-color :transparent;
  }
   .navbar-nav li{
    padding: 4px 0;
  }
  .navbar-nav li:hover .language-list{
    display: block;
  }

  .language-list{
    display: none;
  }
  .login-or-register{
    display: flex;align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
  }
  .login-or-register span{
    color: #6892FF;
    cursor: pointer;
  }
</style>
