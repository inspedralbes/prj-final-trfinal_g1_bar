<template>
    <div>
        <h1>Llistat de comandes</h1>
        <div class="cont">
            <div v-for="comanda in comandes" :key="comanda.id" class="comanda">
                <span class="flex-r">
                    <p>Taula {{ comanda.taula }}</p>
                    <p>Quantitat de plats: {{ comanda.productes.length }}</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import useAppStore from '@/stores/index.js';
import socket from '~/socket';
export default {
    data() {
        return {
            store: useAppStore()
        }
    },
    computed: {
        comandes() {
            return this.store.comandes
        }
    },
    methods: {
    },

}
</script>

<style scoped>
.cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* Allow the commands to wrap to the next line */
    justify-content: space-between;
    /* Add some space between the commands */
    align-items: start;
    /* Align the commands at the top */
    background-color: #282c34;
    color: #fff;
    font-family: Arial, sans-serif;
    padding: 20px;
}

h1 {
    color: #61dafb;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
    /* Make the title span the full width */
}

.comanda {
    background-color: #3b4049;
    width: calc(33% - 20px);
    /* Make the commands take up half the width minus some margin */
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.comanda:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.comanda p {
    margin: 10px 0;
    color: #fff;
    line-height: 1.5;
}

.comanda>p:first-child {
    font-weight: bold;
    color: #61dafb;
}

.flex-r {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>