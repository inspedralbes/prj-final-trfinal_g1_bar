<template>
    <div class="cont">
        <h1>Llistat de comandes</h1>

    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
import socket from '~/socket';
export default {
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
    },
    mounted() {

        socket.emit('getTiquet', 1);

    }
}
</script>

<style scoped>
.cont {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>