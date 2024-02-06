<template>
    <div>
        <p>Aquest és el contingut de la pàgina Compartir QR</p>
        <input type="text" id="taula" v-model="Ntaula" />
        <PrimeButton @click="generarQR">Generar qr</PrimeButton>
        <img :src="genQR">
    </div>
</template>

<script>
import socket from '~/socket';
import useAppStore from '~/stores/index.js';

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

<style scoped></style>