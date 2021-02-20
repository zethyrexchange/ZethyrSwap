<template>
  <div class="footer-app">
    <b-container>
      <div class="footer-one">
          <b-navbar toggleable="md">
            <div class="navbar-mobile">
              <b-navbar-toggle target="nav-collapse-footer"><i class="fa fa-bars"></i></b-navbar-toggle>
              <b-navbar-nav class="social-footer flex-row">
                <b-nav-item target="_blank" href="https://medium.com/@zethyrexchange"><img src="../../assets/images/medium.png"></b-nav-item>
                <b-nav-item target="_blank" href="https://t.me/ZethyrExchange"><img src="../../assets/images/telegram2.png"></b-nav-item>
                <b-nav-item target="_blank" href="https://twitter.com/zethyrexchange"><img src="../../assets/images/twitter.png"></b-nav-item>
              </b-navbar-nav>
            </div>
            <b-collapse id="nav-collapse-footer" is-nav>
              <b-navbar-nav class="mr-auto menu-footer">
                <b-nav-item target="_blank" href="https://blog.zethyr.exchange">{{$t('message.menu.Blog')}}</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
      </div>
      <div class="footer-two">
        {{$t('message.menu.Text')}}
        <div class="ztr-version float-right">Version 2.0.0</div>
      </div>
    </b-container>
  </div>
</template>
<script>
import ConfigCookieKey from '../../../../config/cookie.key.js';
import { isMobile } from 'mobile-device-detect';

export default {
	data () {
		return {
		
		};
	},
	mounted () {

	},
	methods: {
		redirectToBlog() {
			window.open('https://blog.zethyr.exchange', '_blank');
		}
	},

}
</script>

