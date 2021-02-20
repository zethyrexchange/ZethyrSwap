<template>
  <div>
    <div class="notification-bar text-center">
    </div>
    <b-row>
      <div class="container header-mainmenu d-flex align-items-center justify-content-between">

        <b-col sm="3">
          <div>
            <div class="nav-left">
              Exchange Logo
            </div>
          </div>
        </b-col>
         <b-col sm="5">
          <div>
            <div class="nav-menu">
              <b-link size="sm"  @click="change('en')"><img src="../../assets/images/en-language.png"></b-link>
              <b-link size="sm"  @click="change('zh')"><img src="../../assets/images/cn-language.png"></b-link>
            </div>
          </div>
        </b-col>
         <b-col sm="4">
          
        </b-col>
      
      </div>
      </b-row>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
    
    };
  },
  mounted () {
    
  },
  methods: {
    change (to) {
      localStorage['lang'] = to
      this.$i18n.locale = to
      this.$emit('changeLang', to)
    }
  }
}
</script>