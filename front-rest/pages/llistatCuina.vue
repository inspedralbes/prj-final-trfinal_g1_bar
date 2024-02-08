<template>
    <div class="cont">
        <h1>Llistat de comandes</h1>

    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
export default {
    data() {
        return{
            
        }
    },
    computed: {
        comandes(){
            return this.$store.state.comandes;
        }  
    },
}
</script>



<style scoped>

.cont{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>