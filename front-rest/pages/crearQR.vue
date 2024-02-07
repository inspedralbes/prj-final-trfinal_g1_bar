<template>
    <div class="flex-column cont">
        <div class="flex-column fgap">
            <PrimeInputNumber placeholder="Escriu num taula" id="taula" v-model="Ntaula" />
            <PrimeButton @click="generarQR">Generar QR</PrimeButton>
        </div>
        <div v-if="!genQR" class="imgCont">

        </div>
        <div v-else class="imgCont">
            <img :src="genQR">
        </div>
    </div>
</template>

<script>
import socket from '@/socket';
import useAppStore from '@/stores/index.js';

export default {
    data() {
        return {
            store: useAppStore(),
            Ntaula: null,
            idRest: 1
        }
    },
    methods: {
        generarQR() {
            if (!this.Ntaula) {
                alert('Introdueix un número de taula');
                return;
            }
            console.log(this.Ntaula + "," + this.idRest);
            socket.emit('generateQR', this.idRest, this.Ntaula);
        }
    },
    computed: {
        genQR() {
            console.log(this.store.getQr());
            return this.store.getQr();
        }
    },
}
</script>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
}

.fgap {
    gap: 20px;
}

.cont {
    height: 99vh;
}

.imgCont{
    height: 200px;
    width: 200px;
}

img {
    width: 100%;
    height: 100%;
}
</style>