<template>
    <div>
       <Swap />
       <StartBuilding />
    </div>
</template>

<script>
// components
import { isMobile } from 'mobile-device-detect';
import StartBuilding from './../../components/Home/StartBuilding.vue'
import Swap from './../../components/Home/Swap.vue'

export default { 
  components:{
        StartBuilding,
        Swap
  },
data() {
    return {
        isMobile: isMobile
    }
  },
}
</script>