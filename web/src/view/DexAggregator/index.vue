<template>
    <div>
        <DexAction />
    </div>
</template>

<script>
// components
import { isMobile } from 'mobile-device-detect';
import DexAction    from './../../components/DexAggregator/DexAction.vue';

export default { 
    components:{
        DexAction,
    },
    
    data() {
        return {
            isMobile: isMobile
        }
    },
}
</script>