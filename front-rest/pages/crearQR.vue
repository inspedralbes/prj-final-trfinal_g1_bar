<template>
    <div class="flex-column cont">
        <div class="flex-column fgap">
            <PrimeInputNumber placeholder="Escriu num taula" id="taula" v-model="Ntaula" />
            <PrimeButton @click="generarQR">Generar QR</PrimeButton>
        </div>
        <div v-if="!genQR" class="imgCont">
            <div v-if="loading">
                <PrimeProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" animationDuration=".5s"
                    aria-label="Custom ProgressSpinner" />
            </div>
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
            idRest: 1,
            loading: false,
        }
    },
    methods: {
        generarQR() {
            this.loading = true;
            if (!this.Ntaula) {
                alert('Introdueix un número de taula');
                this.loading = false;
                return;
            }
            setTimeout(() => {
                console.log(this.Ntaula + "," + this.idRest);
                socket.emit('generateQR', this.idRest, this.Ntaula);
            }, 400);
        }
    },
    computed: {
        qrCheck() {
            if (this.genQR) {
                this.loading = false;
            }
        },
        genQR() {
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
    height: 100%;
}

.imgCont {
    height: 200px;
    width: 200px;
}

img {
    width: 100%;
    height: 100%;
}
</style>