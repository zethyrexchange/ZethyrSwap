<template>
  <div id="app">
    <div class="header-main">
      <Header />
    </div>
    <div class="content">
      <router-view ref="app"/>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>
<script>
/*-----------------Module---------------------------------*/
import { mapActions } from 'vuex'
/*-----------------Web3-------------------------------*/
import MyWeb3 from './js/MyWeb3.js'
/*----------------Layout ---------------------------------*/
import Header  from './components/Layout/Header.vue'
import Footer  from './components/Layout/Footer.vue'
/*--------------------- Js -------------------------------*/

/*--------------------- Api -------------------------------*/
MyWeb3.initWeb3();

export default {
  components:{
    Header,
    Footer
  },
	data () {
		return {
			
		};
	},
	created() {   
		this.init();
	},
	mounted () {
		
	},
	destroyed() {
		
	},
	methods: {
		 ...mapActions([
			'setUserAccountAddress',
			'setUserLogin'
     	]),
		/* -----------------------------------------------------------------------------------------
		*  ------------------------------- INIT CONTRACT -------------------------------------------
		*  -----------------------------------------------------------------------------------------
		*/
		init() {
                    // set up user Data
            this.checkAccount();
		},
		//----------------------------------------------------------------------------

		checkAccount() {
			let self = this;
			self.initUserAccountAddress();
			let secondsDifferentBlockOfContractChange = 3 - (new Date()).getSeconds() % 3;
			if (secondsDifferentBlockOfContractChange == 3) {
				self.reloadCheckAccount(); 
			} else {
				setTimeout(function() { 
					self.reloadCheckAccount(); 
				}, secondsDifferentBlockOfContractChange * 1000);
			}
		 },
		reloadCheckAccount() {
			let self = this;
			setInterval(() => {
				self.initUserAccountAddress();
			}, 5000);
		},
		  
		initUserAccountAddress(){
			var accountAddress  = MyWeb3.getCurrentAddress();
			if (accountAddress != false && accountAddress != process.env.ADDRESS_DEFAULT) {
				let startAddress    = accountAddress.slice(0,5);
				let endAddress      = accountAddress.slice(-5);
				this.setUserLogin(true);
				this.setUserAccountAddress(startAddress+ '...' + endAddress);
			} else{
				this.setUserLogin(false);
			}
		}
	}
}
</script>

<style lang="scss">
@import 'assets/css/style.scss';
</style>