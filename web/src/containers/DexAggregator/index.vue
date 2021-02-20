<template>
  <div  style="overflow: hidden;" class="homepage">         
      <DexAggregatorView />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// contract
// components
import DexAggregatorView from './../../view/DexAggregator';
//js
export default {
  	name: 'dexAggregator',
	components: {
		DexAggregatorView,
	},
	data () {
		return {
		}
	},
	created() {
		
	},
	mounted () {
		
	},

	destroyed() {
		
	},

	methods:{
		...mapActions([
		]),
		
	}
}
</script>